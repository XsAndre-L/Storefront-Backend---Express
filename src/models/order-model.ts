import { dbConnection, verifyUser } from "../database";
import { OrderInfo, OrderInfoStore } from "./cart-model";


export type Order = {
    id?: number;
    user_id: number;
    status: string;
};

export class OrderStore {
    orderInfoStore = new OrderInfoStore();

    async showActiveOrders(auth: string): Promise<Order[]> {
        try {
            const decode = verifyUser(auth);

            const result = await dbConnection(
                "SELECT * FROM orders_table WHERE user_id=$1",
                [Object.values(decode)[0]]
            );
            return result.rows;
        } catch (error: any) {
            throw new Error(
                `Error while getting Active orders on user: CODE : ${error.message}`
            );
        }
    }

    async showOldOrders(user_id: number): Promise<Order[]> {
        try {
            const result = await dbConnection(
                "SELECT * FROM orders_table WHERE user_id=$1",
                [user_id]
            );
            return result.rows;
        } catch (error) {
            throw new Error(`Error while showing old orders`);
        }
    }

    async getPendingOrder(auth: string): Promise<number> {
        try {
            const jwtDecoded = verifyUser(auth);//jwt.verify(auth, String(JWT_SIGN_TOKEN));

            const result = await dbConnection(
                "SELECT * FROM orders_table WHERE user_id=$1 AND status=$2",
                [Object.values(jwtDecoded)[0], "pending"]
            )

            return result.rows[0].id;

        } catch (error: any) {
            throw new Error(`Could not retrieve the pending order on user`);
        }
    }

    async getOrder(auth: string, order_id: number): Promise<OrderInfo[]> { // Single Order including all products
        try {
            const result = this.orderInfoStore.getOrderProducts(auth, order_id);
            return result;
        } catch (error: any) {
            throw new Error(`Error while trying to retrieve order details`);
        }
    }

    async placeOrder(auth: string): Promise<Order> {
        // Should not be place because order should exist while stil Pending in cart
        // Create
        try {
            const decoded = verifyUser(auth);

            const result = await dbConnection(
                "INSERT INTO orders_table (user_id, status) VALUES($1,$2)",
                [Object.values(decoded)[0], "Active"]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error while placing order for user with id`);
        }
    }

    async updateOrder(auth: string, order_id: number, status: string): Promise<Order> {
        // Update
        try {
            verifyUser(auth);

            const result = await dbConnection(
                "UPDATE orders_table SET status=$1 WHERE id=$2",
                [order_id, status]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error while updating order with id: ${order_id}`);
        }
    }

    async cancelOrder(auth: string, order_id: number): Promise<Order> {
        // Delete
        try {
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
