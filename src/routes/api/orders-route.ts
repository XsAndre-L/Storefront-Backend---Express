import express from "express";
import { OrderStore } from "../../models/order-model";

const ordersRoute = express.Router();

const orderStore = new OrderStore();

ordersRoute
    .route("/")
    .get(async (_req: express.Request, res: express.Response) => {    // All User Orders
        try {
            const result = await orderStore.showActiveOrders(String(_req.headers.authorization));
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .post(async (_req: express.Request, res: express.Response) => {   // COMMIT NEW ORDER

        try {
            const result = await orderStore.placeOrder(String(_req.headers.authorization));
            res.status(200).send(result);

        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });

ordersRoute
    .route("/:id")
    .get(async (_req: express.Request, res: express.Response) => {    // SPICIFIC ORDER INFO
        try {

        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .delete(async (_req: express.Request, res: express.Response) => {
        try {

        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })

export default ordersRoute;
