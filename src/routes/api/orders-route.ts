import express from "express";

const ordersRoute = express.Router();

ordersRoute
    .route("/")
    .get((_req: express.Request, res: express.Response) => {
        res.send("Show all orders");
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
