import express from "express";
import ordersRoute from "./api/orders-route";
import productsRoute from "./api/products-route";
import signupRoute from "./api/users-route";

const mainRoute = express.Router();

mainRoute.route("/").get((req: express.Request, res: express.Response) => {
    res.send("MAIN INDEX");
});

mainRoute.use("/order", ordersRoute);
mainRoute.use("/product", productsRoute);
mainRoute.use("/users", signupRoute);

mainRoute.get("*", (req: express.Request, res: express.Response) => {
    res.status(404).send("Missing Endpoint");
});

export default mainRoute;
