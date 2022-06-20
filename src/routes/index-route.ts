import express from "express";
import cartRoute from "./api/cart-route";
import ordersRoute from "./api/orders-route";
import productsRoute from "./api/products-route";

import usersRoute from "./api/user-route";

const mainRoute = express.Router();

mainRoute.route("/").get((req: express.Request, res: express.Response) => {
    res.send("MAIN INDEX");
});

mainRoute.use("/user", usersRoute);
mainRoute.use("/order", ordersRoute);
mainRoute.use("/cart", cartRoute);
mainRoute.use("/product", productsRoute);

mainRoute.get("*", (req: express.Request, res: express.Response) => {
    res.status(404).send("Missing Endpoint");
});

export default mainRoute;
