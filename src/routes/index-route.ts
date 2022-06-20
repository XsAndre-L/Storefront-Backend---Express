import express from "express";
import ordersRoute from "./api/orders-route";
import productsRoute from "./api/products-route";

import usersRoute from "./api/user-route";

const mainRoute = express.Router();

mainRoute.route("/").get((req: express.Request, res: express.Response) => {
    res.send("MAIN INDEX");
});

mainRoute.use("/order", ordersRoute);
mainRoute.use("/product", productsRoute);
mainRoute.use("/user", usersRoute);

mainRoute.get("*", (req: express.Request, res: express.Response) => {
    res.status(404).send("Missing Endpoint");
});

export default mainRoute;
