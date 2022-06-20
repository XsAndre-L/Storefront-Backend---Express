import express from "express";
import { verifyUser } from "../../database";
// import jwt from 'jsonwebtoken';
// import { dbConnection } from "../../database";
import { OrderInfo, OrderInfoStore } from "../../models/cart-model";
import { OrderStore } from "../../models/order-model";

const cartRoute = express.Router();

const orderInfoStore = new OrderInfoStore();
const orderStore = new OrderStore();

cartRoute
    .route("/")
    .get(async (_req: express.Request, res: express.Response): Promise<void> => { // Get cart contents

        try {
            const order_id = await orderStore.getPendingOrder(String(_req.headers.authorization));
            const orderProducts = await orderInfoStore.getOrderProducts(String(_req.headers.authorization), order_id);

            res.send(orderProducts);

        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .post(async (_req: express.Request, res: express.Response): Promise<void> => { // Add item too cart

        try {
            const order_id = await orderStore.getPendingOrder(String(_req.headers.authorization));
            await orderInfoStore.addProduct(String(_req.headers.authorization), order_id, _req.body.product_id, _req.body.productAmount);
            res.send("add item too cart");
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .put(async (_req: express.Request, res: express.Response): Promise<void> => { // Edit Item Quantity

        try {
            const order_id = await orderStore.getPendingOrder(String(_req.headers.authorization));

            const cartItem: OrderInfo = {
                order_id: order_id,
                product_id: _req.body.product_id,
                amount: _req.body.productAmount
            }

            await orderInfoStore.updateProductAmount(String(_req.headers.authorization), cartItem);
            res.send("edit quantity");
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .delete(async (_req: express.Request, res: express.Response): Promise<void> => { // Remove Item from cart

        try {
            const order_id = await orderStore.getPendingOrder(String(_req.headers.authorization));
            await orderInfoStore.deleteOrderProduct(String(_req.headers.authorization), order_id, _req.body.product_id);
            res.send("remove item from cart");
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });


export default cartRoute;