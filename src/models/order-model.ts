import database from "../database";
import { OrderInfoStore } from "./order-info-model";

export type Order = {
    id?: number;
    user_id: number;
    status: string;
};



export class OrderStore {
    orderInfoStore = new OrderInfoStore();

    async showActiveOrders(user_id: number): Promise<Order[]> { // Show
        try {
            const conn = await database.connect();
            const sql = "SELECT * FROM orders_table WHERE user_id=$1";

            const result = await conn.query(sql, [user_id]);
            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(`Error while getting Active orders on user: ${user_id}`);
        }
    }

    async showOldOrders(user_id: number): Promise<Order[]> {
        try {
            const conn = await database.connect();
            const sql = "SELECT * FROM orders_table WHERE user_id=$1";

            const result = await conn.query(sql, [user_id]);
            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(`Error while showing old orders`);
        }
    }

    async placeOrder(order: Order): Promise<Order> { // Create
        try {
            const conn = await database.connect();
            const sqlOrder = "INSERT INTO orders_table (user_id, status) VALUES($1,$2)";


            //const sqlOrderInfo = "INSERT INTO orders_info_table"

            const result = await conn.query(sqlOrder, [order.user_id, order.status]);
            conn.release();

            return result.rows[0];

        } catch (error) {
            throw new Error(`Error while placing order for user with id: ${order.user_id}`);
        }
    }

    async updateOrder(order_id: number, status: string): Promise<Order> { // Update
        try {
            const conn = await database.connect();
            const sql = "UPDATE orders_table SET status=$1 WHERE id=$2";

            const result = await conn.query(sql, [order_id, status]);
            conn.release();

            return result.rows[0];

        } catch (error) {
            throw new Error(`Error while updating order with id: ${order_id}`);
        }
    }

    async cancelOrder(order_id: number): Promise<Order> { // Delete
        try {
            const conn = await database.connect();
            const sql = "DELETE FROM orders_table WHERE id=$1";

            const result = await conn.query(sql, [order_id]);
            conn.release();

            this.orderInfoStore.cancelOrder(order_id);

            return result.rows[0];

        } catch (error) {
            throw new Error(`Error while canceling order`);
        }
    }

}
