import { dbConnection } from "../database";
import { OrderStore } from "./order-model";

export type OrderInfo = {
    id?: number;
    order_id: number;
    product_id: number;
    amount: number;
};

export class CartItemStore {
    orderStore = new OrderStore();

    // CREATE
    async addCartItem(
        order_id: number,
        product_id: number,
        productAmount: number
    ): Promise<OrderInfo[] | null> {
        try {
            // Check if cart already contains product with the id of "product_id"
            const existanceCheck = await dbConnection(
                "SELECT id FROM order_info_table WHERE order_id=$1 AND product_id=$2",
                [order_id, product_id]
            );
            if (existanceCheck.rows[0] != undefined) {
                throw new Error("Product was already added to this cart!");
            }

            // Check if the specified product exists
            await this.checkProductExistence(product_id);
            // ---

            const result = await dbConnection(
                "INSERT INTO order_info_table (order_id, product_id, amount) VALUES($1,$2,$3) RETURNING *",
                [order_id, product_id, productAmount]
            );

            await dbConnection(
                "UPDATE products_table SET popularity=popularity+1 WHERE id=$1",
                [product_id]
            );

            return result.rows;
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    // EDIT
    async updateCartItemAmount(orderInfo: OrderInfo): Promise<OrderInfo> {
        try {
            await this.checkProductExistence(orderInfo.product_id);

            const result = await dbConnection(
                "UPDATE order_info_table SET amount=$1 WHERE order_id=$2 AND product_id=$3 RETURNING *",
                [orderInfo.amount, orderInfo.order_id, orderInfo.product_id]
            );

            return result.rows[0];
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    // DELETE Single Product
    async deleteCartItem(
        user_id: number,
        product_id: number
    ): Promise<OrderInfo> {
        try {
            // Check if the specified product exists
            await this.checkProductExistence(product_id);
            // ---

            const order_id = await this.orderStore.getPendingOrder(user_id);

            const result = await dbConnection(
                "DELETE FROM order_info_table WHERE order_id=$1 AND product_id=$2 RETURNING *",
                [order_id, product_id]
            );
            return result.rows[0];
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    async checkProductExistence(product_id: number): Promise<void> {
        const productExistance = await dbConnection(
            "SELECT * FROM products_table WHERE id=$1",
            [product_id]
        );

        if (productExistance.rows[0] == undefined) {
            throw new Error("Product does not exist");
        }
    }
}
