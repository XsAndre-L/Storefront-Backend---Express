import express from "express";
import { Product, ProductStore } from "../../models/product-model";

const productStore = new ProductStore();


const productsRoute = express.Router();

productsRoute
    .route("/")
    .get(
        // GET PRODUCT INDEX
        async (_req: express.Request, res: express.Response): Promise<void> => {

            let category: string | null = null;
            let sort: string | null = null;

            if (_req.query.category) { // If category is supplied
                category = String(_req.query.category);
            }
            if (_req.query.sort) {
                sort = String(_req.query.sort);
            }

            try {
                const productList = await productStore.getProducts(category, sort);
                res.status(200).json(productList);

            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    )
    .post(
        // CREATE PRODUCT
        async (_req: express.Request, res: express.Response): Promise<void> => {

            const product: Product = {
                name: _req.body.name,
                price: _req.body.price,
                category: _req.body.category,
            };

            try {
                const newProduct: Product = await productStore.createProduct(
                    String(_req.headers.authorization),
                    product
                );
                res.status(200).json(newProduct);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    );

productsRoute
    .route("/:id")
    .get(
        // SHOW PRODUCT DETAILS
        async (_req: express.Request, res: express.Response): Promise<void> => {

            try {
                const product: Product = await productStore.getProductDetails(
                    _req.params.id  // need to get id from url
                );
                res.status(200).json(product);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    )
    .put(
        // UPDATE PRODUCT
        async (_req: express.Request, res: express.Response): Promise<void> => {

            const pInfo: Product = {
                name: _req.body.name,
                price: _req.body.price,
                category: _req.body.category,
            };

            try {
                const product: Product = await productStore.updateProduct(
                    String(_req.headers.authorization),
                    _req.params.id,
                    pInfo
                );
                res.status(200).json(product);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    )
    .delete(
        // DELETE PRODUCT
        async (_req: express.Request, res: express.Response): Promise<void> => {

            try {
                const product: Product = await productStore.delete(
                    String(_req.headers.authorization),
                    _req.params.id
                );
                res.status(200).json(product);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    );

export default productsRoute;
