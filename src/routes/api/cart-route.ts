import express from "express";
import { OrderInfo, OrderInfoStore } from "../../models/cart-model";
import { OrderStore } from "../../models/order-model";


const cartRoute = express.Router();

const orderInfoStore = new OrderInfoStore();
const orderStore = new OrderStore();

cartRoute
    .route("/")
    .get(
        // GET CART CONTENTS
        async (_req: express.Request, res: express.Response): Promise<void> => {

            try {
                const order_id = await orderInfoStore.getPendingOrder(
                    String(_req.headers.authorization)
                );

                if (order_id != null) {

                    const orderProducts = await orderInfoStore.getOrderProducts(
                        String(_req.headers.authorization),
                        order_id
                    );
                    res.send(orderProducts);
                } else {
                    res.send('No cart order exist');
                }

            } catch (error: any) {
                res.status(500).send(error.message)
            }
        }
    )
    .post(
        // ADD ITEM TOO CART
        async (_req: express.Request, res: express.Response): Promise<void> => {

            try {
                let order_id = await orderInfoStore.getPendingOrder(String(_req.headers.authorization));
                if (order_id == null) {
                    // If order does not yet exist we create it.
                    const order = await orderStore.createOrder(String(_req.headers.authorization));
                    order_id = Number(order.id);
                }

                await orderInfoStore.addCartItem(
                    String(_req.headers.authorization),
                    order_id,
                    _req.body.product_id,
                    _req.body.product_amount
                );

                res.send("Added item too cart");
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    )
    .put(
        // EDIT ITEM QUANTITY
        async (_req: express.Request, res: express.Response): Promise<void> => {

            try {
                const order_id = await orderInfoStore.getPendingOrder(
                    String(_req.headers.authorization)
                );

                if (order_id == null) {
                    res.end();
                    return;
                }

                const cartItem: OrderInfo = {
                    order_id: order_id,
                    product_id: _req.body.product_id,
                    amount: _req.body.productAmount,
                };

                await orderInfoStore.updateCartItemAmount(
                    String(_req.headers.authorization),
                    cartItem
                );
                res.send(`edit quantity of item: ${cartItem.product_id}`);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    )
    .delete(
        // REMOVE ITEM FROM CART
        async (_req: express.Request, res: express.Response): Promise<void> => {

            try {
                await orderInfoStore.deleteCartItem(
                    String(_req.headers.authorization),
                    _req.body.product_id
                );
                res.send("remove item from cart");
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    );

export default cartRoute;
