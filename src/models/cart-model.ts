import { dbConnection, verifyUser } from "../database";

// import { Order, OrderStore } from "./order-model";
// import { Product } from "./product-model";

export type OrderInfo = {
    id?: number;
    order_id: number;
    product_id: number;
    amount: number;
};

export class OrderInfoStore {
    // INDEX
    async getOrderProducts(
        auth: string,
        order_id: number
    ): Promise<OrderInfo[]> {

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

    // CREATE
    async addOrderProduct(
        auth: string,
        // order_id: number,
        product: number,
        productAmount: number
    ): Promise<OrderInfo[]> {
        try {
            //verifyUser(auth);
            const order_id = await this.getPendingOrder(auth);

            const result = await dbConnection(
                "INSERT INTO order_info_table (order_id, product_id, amount) VALUES($1,$2,$3)",
                [order_id, product, productAmount]
            );
            return result.rows;
        } catch (error: any) {
            throw new Error(`Error | CODE : ${error.message}`);
        }
    }

    // DELETE Single Product
    async deleteOrderProduct(
        auth: string,
        product_id: number
    ): Promise<OrderInfo> {
        // delete
        try {
            // verifyUser(auth);
            const order_id = await this.getPendingOrder(auth);

            const result = await dbConnection(
                "DELETE FROM order_info_table WHERE order_id=$1 AND product_id=$2",
                [order_id, product_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    // EDIT
    async updateProductAmount(
        auth: string,
        orderInfo: OrderInfo
    ): Promise<OrderInfo> {
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

    // DELETE All Products In an Order
    async cancelOrder(auth: string, order_id: number): Promise<OrderInfo[]> {
        try {
            verifyUser(auth);

            const result = await dbConnection(
                "DELETE FROM order_info_table WHERE order_id=$1",
                [order_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error`);
        }
    }

    // Get Users Pending Order (Cart Order)
    // -- this function interacts with the order table and not the order info table, reason being
    // -- we need access to the current pending order not only in order model but also in cart model
    // -- OrderModel References instance or orderInfoModel therefore we can't reference instance of orderModel 
    // -- inside orderInfoModel for the purpose of preventing circular dependency.
    async getPendingOrder(auth: string): Promise<number | null> {
        try {
            const jwtDecoded = verifyUser(auth);
            console.log('getting pending order')

            const result = await dbConnection(
                "SELECT * FROM orders_table WHERE user_id=$1 AND order_status=$2",
                [Object.values(jwtDecoded)[0], "Pending"]
            );
            console.log('ID - ' + result.rows[0].id);

            return result.rows[0].id;
        } catch (error: any) {
            return null;
            //throw new Error(`Could not retrieve the pending order on user`);
        }
    }
}
