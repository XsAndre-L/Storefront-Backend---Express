import express from "express";
import { Product, ProductStore } from "../../models/product-model";

const productsRoute = express.Router();

const productStore = new ProductStore();

productsRoute
    .route("/")
    .get(
        async (_req: express.Request, res: express.Response): Promise<void> => {
            // GET PRODUCT INDEX

            const productList: Product[] = await productStore.getProducts();
            res.status(200).json(productList);
        }
    )
    .post(
        async (_req: express.Request, res: express.Response): Promise<void> => {
            // CREATE PRODUCT

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
    .route("/:id") // Single Product
    .get(
        async (_req: express.Request, res: express.Response): Promise<void> => {
            // SHOW PRODUCT

            try {
                const product: Product = await productStore.getProductDetails(
                    _req.params.id
                ); // need to get id from url
                res.status(200).json(product);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    )
    .put(
        async (_req: express.Request, res: express.Response): Promise<void> => {
            // UPDATE PRODUCT

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
        async (_req: express.Request, res: express.Response): Promise<void> => {
            // DELETE PRODUCT

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
