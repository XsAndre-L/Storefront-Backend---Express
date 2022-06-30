import express from "express";
import { verifyUser } from "../../database";
import { OrderInfo, CartItemStore } from "../../models/cart-model";
import { OrderStore } from "../../models/order-model";

const cartRoute = express.Router();

const orderInfoStore = new CartItemStore();
const orderStore = new OrderStore();

cartRoute
    .route("/")
    .get(
        // GET CART CONTENTS
        async (_req: express.Request, res: express.Response): Promise<void> => {
            try {
                const user_id = verifyUser(String(_req.headers.authorization)); // Authentication
                const order_id = await orderStore.getPendingOrder(user_id);

                if (order_id != null) {
                    const orderProducts = await orderStore.getOrderProducts(
                        order_id
                    );
                    res.send(orderProducts);
                } else {
                    res.send("No cart order exist");
                }
            } catch (error) {
                res.status(500).send((error as Error).message);
            }
        }
    )
    .post(
        // ADD ITEM TOO CART
        async (_req: express.Request, res: express.Response): Promise<void> => {
            try {
                const user_id = verifyUser(String(_req.headers.authorization)); // Authentication
                let order_id = await orderStore.getPendingOrder(user_id);

                if (order_id == null) {
                    // If order does not yet exist we create it.
                    const order = await orderStore.createOrder(user_id);
                    order_id = Number(order.id);
                }

                await orderInfoStore.addCartItem(
                    order_id,
                    _req.body.product_id,
                    _req.body.product_amount
                );

                res.send("Added item too cart");
            } catch (error) {
                res.status(500).send((error as Error).message);
            }
        }
    )
    .put(
        // EDIT ITEM QUANTITY
        async (_req: express.Request, res: express.Response): Promise<void> => {
            try {
                const user_id = verifyUser(String(_req.headers.authorization)); // Authorization
                const order_id = await orderStore.getPendingOrder(user_id);

                if (order_id == null) {
                    res.end();
                    return;
                }

                const cartItem: OrderInfo = {
                    order_id: order_id,
                    product_id: _req.body.product_id,
                    amount: _req.body.productAmount,
                };

                await orderInfoStore.updateCartItemAmount(cartItem);
                res.send(`edit quantity of item: ${cartItem.product_id}`);
            } catch (error) {
                res.status(500).send((error as Error).message);
            }
        }
    )
    .delete(
        // REMOVE ITEM FROM CART
        async (_req: express.Request, res: express.Response): Promise<void> => {
            try {
                const user_id = verifyUser(String(_req.headers.authorization)); // Autherization

                await orderInfoStore.deleteCartItem(
                    user_id,
                    _req.body.product_id
                );
                res.send("remove item from cart");
            } catch (error) {
                res.status(500).send((error as Error).message);
            }
        }
    );

export default cartRoute;
