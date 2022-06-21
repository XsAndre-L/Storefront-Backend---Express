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

    async createOrder(auth: string): Promise<Order> {
        // Should not be place because order should exist while stil Pending in cart
        // Create
        try {
            const decoded = verifyUser(auth);

            const result = await dbConnection(
                "INSERT INTO orders_table (user_id, order_status) VALUES($1,$2)",
                [Object.values(decoded)[0], "Pending"]
            );
            return result.rows[0];
        } catch (error: any) {
            throw new Error(`Error while placing order for user | CODE : ${error.message}`);
        }
    }

    async getOrder(auth: string, order_id: number): Promise<OrderInfo[]> { // Single Order including all products
        try {
            verifyUser(auth);
            const result = this.orderInfoStore.getOrderProducts(auth, order_id);
            return result;
        } catch (error: any) {
            throw new Error(`Error while trying to retrieve order details`);
        }
    }


    // async updateOrder(auth: string, status: string): Promise<Order> {
    //     // Update
    //     try {
    //         const order_id = this.orderInfoStore.getPendingOrder(auth);

    //         const result = await dbConnection(
    //             "UPDATE orders_table SET order_status=$1 WHERE id=$2",
    //             [order_id, status]
    //         );
    //         return result.rows[0];
    //     } catch (error) {
    //         throw new Error(`Error while updating order`);
    //     }
    // }

    // async cancelOrder(auth: string, order_id: number): Promise<Order> {
    //     // Delete
    //     try {
    //         const result = await dbConnection(
    //             "DELETE FROM orders_table WHERE id=$1",
    //             [order_id]
    //         );
    //         this.orderInfoStore.cancelOrder(auth, order_id);
    //         return result.rows[0];
    //     } catch (error) {
    //         throw new Error(`Error while canceling order`);
    //     }
    // }
}
