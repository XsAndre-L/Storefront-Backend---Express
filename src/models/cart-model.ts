import { dbConnection, verifyUser } from "../database";

import { Order } from "./order-model";
import { Product } from "./product-model";


export type OrderInfo = {
    id?: number;
    order_id: number;
    product_id: number;
    amount: number;
};

export class OrderInfoStore {

    async getOrderProducts(auth: string, order_id: number): Promise<OrderInfo[]> {
        try {
            verifyUser(auth);

            const result = await dbConnection(
                "SELECT * FROM order_info_table WHERE order_id=$1",
                [order_id]
            );
            return result.rows;
        } catch (error) {
            throw new Error(`Error `);
        }
    }

    async addProduct(
        auth: string,
        order_id: number,
        product: Product,
        productAmount: number
    ): Promise<OrderInfo[]> {
        try {
            verifyUser(auth);

            const result = await dbConnection(
                "INSERT INTO order_info_table (order_id, product_id, amount) VALUES($1,$2,$3)",
                [order_id, product.id, productAmount]
            );
            return result.rows;
        } catch (error) {
            throw new Error(`Error `);
        }
    }


    async deleteOrderProduct(
        auth: string,
        order_id: number,
        product_id: number
    ): Promise<OrderInfo> {
        // delete
        try {
            verifyUser(auth);

            const result = await dbConnection(
                "DELETE FROM order_info_table WHERE order_id=$1 AND product_id=$2",
                [order_id, product_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async updateProductAmount(auth: string, orderInfo: OrderInfo): Promise<OrderInfo> {
        // Put
        try {
            verifyUser(auth);

            const result = await dbConnection(
                "UPDATE order_info_table SET amount=$1 WHERE order_id=$2 AND product_id=$3",
                [orderInfo.amount, orderInfo.order_id, orderInfo.product_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error`);
        }
    }

    async cancelOrder(auth: string, order_id: number): Promise<OrderInfo[]> {
        // remove all order info's linked to an order
        try {
            verifyUser(auth);

            const result = await dbConnection(
                "DELETE FROM order_info_table WHERE order_id=$1",
                [order_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error `);
        }
    }
}
