import express from "express";
import { Product, ProductStore } from "../../models/product-model";

const productsRoute = express.Router();

const productStore = new ProductStore();

productsRoute
    .route("/")
    .get(async (_req: express.Request, res: express.Response) => {
        // GET PRODUCT INDEX
        const productList: Product[] = await productStore.index();
        res.status(200).json(productList);
    })
    .post(async (_req: express.Request, res: express.Response) => {
        // CREATE PRODUCT
        const product: Product = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category,
        };
        const newProduct: Product = await productStore.create(product);

        res.status(200).json(newProduct);
    });

productsRoute
    .route("/:id")
    .get(async (_req: express.Request, res: express.Response) => {
        // SHOW PRODUCT

        const product: Product = await productStore.show(_req.params.id); // need to get id from url
        // Show specific product
        // res.send(`show product ${_req.params.id}`);
        res.status(200).json(product);
    })
    .put(async (_req: express.Request, res: express.Response) => {
        // UPDATE PRODUCT
        const pInfo: Product = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category,
        };
        const product: Product = await productStore.update(
            _req.params.id,
            pInfo
        );

        res.status(200).json(product);
    })
    .delete(async (_req: express.Request, res: express.Response) => {
        const product: Product = await productStore.delete(_req.params.id);

        res.status(200).json(product);
    });

export default productsRoute;
