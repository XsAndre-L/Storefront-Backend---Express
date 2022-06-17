import database from "../database";
import { Order } from "./order-model";
import { Product } from "./product-model";

export type OrderInfo = {
    id?: number;
    order_id: number;
    product_id: number;
    amount: number;
};

export class OrderInfoStore {
    async addProduct(
        order: Order,
        product: Product,
        productAmount: number
    ): Promise<OrderInfo[]> {
        try {
            const conn = await database.connect();

            const sql =
                "INSERT INTO order_info_table (order_id, product_id, amount) VALUES($1,$2,$3)";

            const result = await conn.query(sql, [
                order.id,
                product.id,
                productAmount,
            ]);
            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(`Error `);
        }
    }

    async getOrderProducts(order_id: number): Promise<OrderInfo[]> {
        try {
            const conn = await database.connect();
            const sql = "SELECT * FROM order_info_table WHERE order_id=$1";

            const result = await conn.query(sql, [order_id]);
            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(`Error `);
        }
    }

    async deleteOrderProduct(
        order_id: number,
        product_id: number
    ): Promise<OrderInfo> {
        // delete
        try {
            const conn = await database.connect();
            const sql =
                "DELETE FROM order_info_table WHERE order_id=$1 AND product_id=$2";

            const result = await conn.query(sql, [order_id, product_id]);
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Error `);
        }
    }

    async updateProductAmount(orderInfo: OrderInfo): Promise<OrderInfo> {
        // Put
        try {
            const conn = await database.connect();
            const sql =
                "UPDATE order_info_table SET amount=$1 WHERE order_id=$2 AND product_id=$3";

            const result = await conn.query(sql, [
                orderInfo.amount,
                orderInfo.order_id,
                orderInfo.product_id,
            ]);
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Error `);
        }
    }

    async cancelOrder(order_id: number): Promise<OrderInfo[]> {
        // remove all order info's linked to an order
        try {
            const conn = await database.connect();
            const sql = "DELETE FROM order_info_table WHERE order_id=$1";

            const result = await conn.query(sql, [order_id]);
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Error `);
        }
    }
}
