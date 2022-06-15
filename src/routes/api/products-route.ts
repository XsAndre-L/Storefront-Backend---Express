import express from "express";

const productsRoute = express.Router();

productsRoute
    .route("/")
    .get((_req: express.Request, res: express.Response) => {
        // Get all products
        res.send("show all products");
    })
    .post((_req: express.Request, res: express.Response) => {
        // Create new product listing
    });

productsRoute
    .route("/:id")
    .get((_req: express.Request, res: express.Response) => {
        // Show specific product
        res.send("show product");
    });

export default productsRoute;
