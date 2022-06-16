import express from "express";
import { OrderStore } from "../../models/order-model";

const ordersRoute = express.Router();

const orderStore = new OrderStore();

ordersRoute
    .route("/")
    .get((_req: express.Request, res: express.Response) => {
        //const orders = orderStore.showActiveOrders(_req.params.user_id)
        res.send("show user orders");
        // See all orders
    })
    .post((_req: express.Request, res: express.Response) => {
        // Create new Order
    });

ordersRoute
    .route("/:id")
    .get((_req: express.Request, res: express.Response) => {
        // Show order
    });

export default ordersRoute;
