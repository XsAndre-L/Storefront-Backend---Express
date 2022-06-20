import express from "express";
// import { dbConnection } from "../../database";
import { OrderInfoStore } from "../../models/order-info-model";

const cartRoute = express.Router();

const orderInfoStore = new OrderInfoStore();

cartRoute
    .route("/")
    .get(async (_req: express.Request, res: express.Response) => {
        // Get cart contents
        try {
            res.send("in CART");
            const result = await orderInfoStore.getOrder(1);
            return result;
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .post(async (_req: express.Request, res: express.Response) => {
        // Add item too cart
        try {
            res.send("add item too cart");
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .put(async (_req: express.Request, res: express.Response) => {
        // Edit Item Quantity
        try {
            res.send("edit quantity");
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .delete(async (_req: express.Request, res: express.Response) => {
        // Remove Item from cart
        try {
            res.send("remove item from cart");
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });
