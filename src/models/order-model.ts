import { dbConnection, verifyUser } from "../database";
import { OrderInfo, OrderInfoStore } from "./cart-model";

export type Order = {
    id?: number;
    user_id: number;
    status: string;
};

export class OrderStore {
    orderInfoStore = new OrderInfoStore();

    // INDEX
    async showActiveOrders(auth: string): Promise<Order[]> {
        try {
            const decode = verifyUser(auth);

            const result = await dbConnection(
                "SELECT * FROM orders_table WHERE user_id=$1 AND order_status=$2",
                [Object.values(decode)[0], "Active"]
            );
            return result.rows;
        } catch (error: any) {
            throw new Error(
                `Error while getting Active orders on user: CODE : ${error.message}`
            );
        }
    }

    // Create
    async createOrder(auth: string): Promise<Order> {
        // Should not be placed because order should exist while stil Pending in cart
        try {
            const decoded = verifyUser(auth);
            const order_id = await this.orderInfoStore.getPendingOrder(auth);
            console.log('the order ID - ' + order_id);

            if (order_id != null) {
                console.log("Return already existing pending order")
                const result = await dbConnection(
                    "SELECT * FROM orders_table WHERE id=$1",
                    [order_id]
                )
                return result.rows[0];

            } else {
                console.log(decoded);
                const result = await dbConnection(
                    "INSERT INTO orders_table (user_id, order_status) VALUES($1,$2)",
                    [Object.values(decoded)[0], "Pending"]
                );
                return result.rows[0];
            }

        } catch (error: any) {
            throw new Error(
                `Error while placing order for user | CODE : ${error.message}`
            )
        }
    }

    // Single Order including all products
    async getOrderDetails(
        auth: string,
        order_id: number
    ): Promise<OrderInfo[]> {
        try {
            verifyUser(auth);
            const result = await this.orderInfoStore.getOrderProducts(auth, order_id);
            return result;
        } catch (error: any) {
            throw new Error(`Error while trying to retrieve order details`);
        }
    }

    // Update
    async activateOrder(auth: string): Promise<Order | null> {
        try {
            verifyUser(auth);
            const order_id = await this.orderInfoStore.getPendingOrder(auth);
            console.log(order_id);
            if (order_id == null) {
                return null;
            }

            const result = await dbConnection(
                "UPDATE orders_table SET order_status=$1 WHERE id=$2",
                ["Active", order_id]
            );

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Error while updating order | CODE : ${error.message}`);
        }
    }

    // Delete
    async cancelPendingOrder(auth: string): Promise<Order | null> {
        try {
            const order_id = await this.orderInfoStore.getPendingOrder(auth);

            if (order_id == null) {
                return null;
            }

            const result = await dbConnection(
                "DELETE FROM orders_table WHERE id=$1",
                [order_id]
            );
            this.orderInfoStore.cancelOrder(auth, order_id);
            return result.rows[0];

        } catch (error) {
            throw new Error(`Error while canceling order`);
        }
    }
}
