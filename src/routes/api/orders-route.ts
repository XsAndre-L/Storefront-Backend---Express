import express from "express";
import { OrderStore } from "../../models/order-model";

const orderStore = new OrderStore();


const ordersRoute = express.Router();

ordersRoute
    .route("/")
    .get(
        // ALL USER ORDERS
        async (_req: express.Request, res: express.Response): Promise<void> => {
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
        // CREATE NEW PENDING ORDER
        async (_req: express.Request, res: express.Response): Promise<void> => {
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
    .put(
        // UPDATE ORDER STATUS
        async (_req: express.Request, res: express.Response): Promise<void> => {
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
        // SPICIFIC ORDER INFO
        async (_req: express.Request, res: express.Response): Promise<void> => {
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
