import { dbConnection } from "../database";
import { Order } from "./order-model";
import { Product } from "./product-model";

export type OrderInfo = {
    id?: number;
    order_id: number;
    product_id: number;
    amount: number;
};

export class OrderInfoStore {
    async getOrder(order_id: number): Promise<OrderInfo[]> {    // Returns Cart containing Items
        try {
            const result = await dbConnection("SELECT * FROM order_info_table WHERE order_id=$1", [order_id]);
            return result.rows;

        } catch (error: any) {
            throw new Error(`Could not retrieve order`)
        }
    }

    async addProduct(
        order: Order,
        product: Product,
        productAmount: number
    ): Promise<OrderInfo[]> {
        try {
            const result = await dbConnection("INSERT INTO order_info_table (order_id, product_id, amount) VALUES($1,$2,$3)", [order.id, product.id, productAmount]);
            return result.rows;

        } catch (error) {
            throw new Error(`Error `);
        }
    }

    async getOrderProducts(order_id: number): Promise<OrderInfo[]> {
        try {
            const result = await dbConnection("SELECT * FROM order_info_table WHERE order_id=$1", [order_id]);
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
            const result = await dbConnection("DELETE FROM order_info_table WHERE order_id=$1 AND product_id=$2", [order_id, product_id]);
            return result.rows[0];

        } catch (error) {
            throw new Error(`Error `);
        }
    }

    async updateProductAmount(orderInfo: OrderInfo): Promise<OrderInfo> {
        // Put
        try {
            const result = await dbConnection("UPDATE order_info_table SET amount=$1 WHERE order_id=$2 AND product_id=$3", [orderInfo.amount, orderInfo.order_id, orderInfo.product_id]);
            return result.rows[0];

        } catch (error) {
            throw new Error(`Error `);
        }
    }

    async cancelOrder(order_id: number): Promise<OrderInfo[]> {
        // remove all order info's linked to an order
        try {
            const result = await dbConnection("DELETE FROM order_info_table WHERE order_id=$1", [order_id]);
            return result.rows[0];

        } catch (error) {
            throw new Error(`Error `);
        }
    }


}
