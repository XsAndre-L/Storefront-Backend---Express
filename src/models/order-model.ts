import { dbConnection } from "../database";
import { OrderInfo } from "./cart-model";

export type Order = {
    id?: number;
    user_id: number;
    status: string;
};

export class OrderStore {
    // orderInfoStore = new CartItemStore();

    // INDEX
    async showActiveOrders(user_id: string): Promise<Order[]> {
        try {

            const result = await dbConnection(
                "SELECT * FROM orders_table WHERE user_id=$1 AND order_status=$2",
                [user_id, "Active"]
            );
            return result.rows;
        } catch (error: any) {
            throw new Error(
                `Error while getting Active orders on user: CODE : ${error.message}`
            );
        }
    }

    // ITEM INDEX
    async getOrderProducts(
        order_id: number
    ): Promise<OrderInfo[]> {
        try {
            const result = await dbConnection(
                "SELECT * FROM order_info_table WHERE order_id=$1",
                [order_id]
            );
            return result.rows;
        } catch (error: any) {
            throw new Error(`Error CODE | ${error.message}`);
        }
    }

    // Create
    async createOrder(user_id: string): Promise<Order> {
        // Should not be placed because order should exist while stil Pending in cart
        try {
            const order_id = await this.getPendingOrder(user_id);   // Check if there is no existing order

            let result;
            if (order_id != null) {
                // If Pending order already exists return it
                result = await dbConnection(
                    "SELECT * FROM orders_table WHERE id=$1",
                    [order_id]
                );
            } else {
                result = await dbConnection(
                    "INSERT INTO orders_table (user_id, order_status) VALUES($1,$2) RETURNING id",
                    [user_id, "Pending"]
                );
            }

            return result.rows[0];

        } catch (error: any) {
            throw new Error(
                `Error while placing order for user | CODE : ${error.message}`
            );
        }
    }

    // Single Order including all products
    async getOrderDetails(
        order_id: number
    ): Promise<OrderInfo[]> {
        try {
            const result = await this.getOrderProducts(order_id);
            return result;
        } catch (error: any) {
            throw new Error(`Error while trying to retrieve order details`);
        }
    }

    // Update
    async activateOrder(user_id: string): Promise<Order | null> {
        try {
            const order_id = await this.getPendingOrder(user_id);
            if (order_id == null) {
                return null;
            }

            const result = await dbConnection(
                "UPDATE orders_table SET order_status=$1 WHERE id=$2",
                ["Active", order_id]
            );

            return result.rows[0];
        } catch (error: any) {
            throw new Error(
                `Error while updating order | CODE : ${error.message}`
            );
        }
    }

    // Delete
    async cancelPendingOrder(user_id: string): Promise<Order | null> {
        try {
            const order_id = await this.getPendingOrder(user_id);
            if (order_id == null) {
                return null;
            }

            const result = await dbConnection(
                "DELETE FROM orders_table WHERE id=$1",
                [order_id]
            );
            this.removeOrderItems(order_id);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error while canceling order`);
        }
    }

    // DELETE ALL PRODUCTS IN AN ORDER
    async removeOrderItems(order_id: number): Promise<OrderInfo[]> {
        try {
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
    async getPendingOrder(user_id: string): Promise<number | null> {
        try {
            const result = await dbConnection(
                "SELECT * FROM orders_table WHERE user_id=$1 AND order_status=$2",
                [user_id, "Pending"]
            );

            return result.rows[0].id;
        } catch (error: any) {
            // COULD NOT RETRIEVE PENDING ORDER ON USER.
            return null;
        }
    }
}
