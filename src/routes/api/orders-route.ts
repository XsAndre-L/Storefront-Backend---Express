import express from "express";
import { OrderInfo } from "../../models/cart-model";
import { OrderStore } from "../../models/order-model";

const ordersRoute = express.Router();

const orderStore = new OrderStore();

ordersRoute
    .route("/")
    .get(async (_req: express.Request, res: express.Response): Promise<void> => {
        // All User Orders
        try {
            const result = await orderStore.showActiveOrders(
                String(_req.headers.authorization)
            );
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .post(async (_req: express.Request, res: express.Response): Promise<void> => {
        // COMMIT NEW ORDER

        try {
            const result = await orderStore.placeOrder(
                String(_req.headers.authorization)
            );
            res.status(200).send(result);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });

ordersRoute
    .route("/:id")
    .get(async (_req: express.Request, res: express.Response): Promise<void> => {
        // SPICIFIC ORDER INFO
        try {
            //res.send('get order details');
            const order = await orderStore.getOrder(String(_req.headers.authorization), parseInt(_req.params.id));

            res.status(200).json(order);


        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .put(async (_req: express.Request, res: express.Response): Promise<void> => {
        try {
            orderStore.updateOrder(
                String(_req.headers.authorization),
                parseInt(_req.params.id),
                _req.body.status
            );

            res.status(200);

        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .delete(async (_req: express.Request, res: express.Response): Promise<void> => {
        try {
            res.send('cancel order if not yet shipped');


        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });

export default ordersRoute;
