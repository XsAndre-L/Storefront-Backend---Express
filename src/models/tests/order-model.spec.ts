import { CartItemStore } from "../cart-model";
import { Order, OrderStore } from "../order-model";

const orderStore = new OrderStore();
const cartItemStore = new CartItemStore();

describe("Testing existance of functions in the Order model", () => {
    it("Check existance of showActiveOrders", () => {
        expect(orderStore.showActiveOrders).toBeDefined();
    });

    it("Check existance of getOrder", () => {
        expect(orderStore.getOrderDetails).toBeDefined();
    });

    it("Check existance of createProduct", () => {
        expect(orderStore.createOrder).toBeDefined();
    });

    it("Check existance of activateOrder", () => {
        expect(orderStore.activateOrder).toBeDefined();
    });

    it("Check existance of showActiveOrders", () => {
        expect(orderStore.getOrderProducts).toBeDefined();
    });

    it("Check existance of cancelPendingOrder", () => {
        expect(orderStore.cancelPendingOrder).toBeDefined();
    });
});

describe("Order Model-Tests", () => {
    // Activate Order : Expect Pass
    it("Order Model | Activate order", async () => {
        //
        await cartItemStore.addCartItem(1, 2, 1);
        const addedOrder: Order | null = await orderStore.activateOrder(1);
        expect(addedOrder?.order_status).toEqual("Active");
    });
    // Get User specific orders : Expect Pass
    it("Order Model | Get user orders", async () => {
        const orders = await orderStore.showActiveOrders(1);
        expect(orders[0]?.id).toEqual(1);
    });
    // Get Order Details : Expect Pass
    it("Order Model | Get order details", async () => {
        const userOrders = await orderStore.showActiveOrders(1);
        expect(userOrders[0].user_id).toEqual(1);
        expect(userOrders[0].id).toEqual(1);
    });
    // Cancel Pending Order : Expect Pass
    it("Order Model | Cancel pending order", async () => {
        let order_id = await orderStore.getPendingOrder(1);

        if (order_id == null) {
            // If order does not yet exist we create it.
            const order = await orderStore.createOrder(1);
            order_id = Number(order.id);
        }

        await cartItemStore.addCartItem(order_id, 2, 1);

        let pendingOrder = await orderStore.getPendingOrder(1);
        expect(pendingOrder).toEqual(2);

        await orderStore.cancelPendingOrder(1);
        pendingOrder = await orderStore.getPendingOrder(1);

        expect(pendingOrder).toBeNull();
    });

    // --- Admin Commands
    // Cancel Active order
    it("Order Model | Cancel Active Order", () => {
        //
    });
    //
});
