import { OrderStore } from "../order-model";

const orderStore = new OrderStore();

describe("Testing existance of functions in the Product model", () => {
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
    })
});