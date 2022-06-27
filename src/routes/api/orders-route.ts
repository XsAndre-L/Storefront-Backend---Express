import express from "express";
import { verifyUser } from "../../database";
import { OrderStore } from "../../models/order-model";

const orderStore = new OrderStore();

const ordersRoute = express.Router();

ordersRoute
    .route("/")
    .get(
        // ALL USER ORDERS
        async (_req: express.Request, res: express.Response): Promise<void> => {
            try {
                const user_id = verifyUser(String(_req.headers.authorization)); // Authentication

                const result = await orderStore.showActiveOrders(
                    user_id // gets user id
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
                const user_id = verifyUser(String(_req.headers.authorization)); // Authentication

                const result = await orderStore.createOrder(user_id);
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
                const user_id = verifyUser(String(_req.headers.authorization)); // Autherization

                const result = await orderStore.activateOrder(user_id);
                res.status(200).send(result);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    );

ordersRoute.route("/:id").get(
    // SPICIFIC ORDER INFO
    async (_req: express.Request, res: express.Response): Promise<void> => {
        try {
            verifyUser(String(_req.headers.authorization)); // Autherization

            const order = await orderStore.getOrderDetails(
                parseInt(_req.params.id)
            );
            res.status(200).json(order);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
);

export default ordersRoute;
