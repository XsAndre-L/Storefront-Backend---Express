import { OrderInfoStore } from "../cart-model";

const orderInfoStore = new OrderInfoStore();

describe("Testing existance of functions in the Product model", () => {
    it("Check existance of showActiveOrders", () => {
        expect(orderInfoStore.getOrderProducts).toBeDefined();
    });

    it("Check existance of addOrderProduct", () => {
        expect(orderInfoStore.addOrderProduct).toBeDefined();
    });

    it("Check existance of deleteOrderProduct", () => {
        expect(orderInfoStore.deleteOrderProduct).toBeDefined();
    });

    it("Check existance of updateProductAmount", () => {
        expect(orderInfoStore.updateProductAmount).toBeDefined();
    });

    it("Check existance of updateProductAmount", () => {
        expect(orderInfoStore.cancelOrder).toBeDefined();
    });
});
