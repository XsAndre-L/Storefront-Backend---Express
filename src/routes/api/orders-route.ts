import express from "express";
import { OrderStore } from "../../models/order-model";

const ordersRoute = express.Router();

const orderStore = new OrderStore();

ordersRoute
    .route("/")
    .get(
        async (_req: express.Request, res: express.Response): Promise<void> => {
            // All User Orders
            try {
                const result = await orderStore.showActiveOrders(
                    String(_req.headers.authorization)
                );
                res.status(200).json(result);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    )
    .post(
        async (_req: express.Request, res: express.Response): Promise<void> => {
            // Create New Pending Order

            try {
                const result = await orderStore.createOrder(
                    String(_req.headers.authorization)
                );
                res.status(200).send(result);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    )
    .put(async (_req: express.Request, res: express.Response): Promise<void> => {
        try {
            const result = await orderStore.activateOrder(String(_req.headers.authorization));
            res.status(200).send(result);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })

ordersRoute
    .route("/:id")
    .get(
        async (_req: express.Request, res: express.Response): Promise<void> => {
            // SPICIFIC ORDER INFO
            try {
                const order = await orderStore.getOrderDetails(
                    String(_req.headers.authorization),
                    parseInt(_req.params.id)
                );
                res.status(200).json(order);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    );

export default ordersRoute;
