import { OrderInfoStore } from "../cart-model";

const orderInfoStore = new OrderInfoStore();

describe("Testing existance of functions in the Cart model", () => {
    it("Check existance of showActiveOrders", () => {
        expect(orderInfoStore.getOrderProducts).toBeDefined();
    });

    it("Check existance of addCartItem", () => {
        expect(orderInfoStore.addCartItem).toBeDefined();
    });

    it("Check existance of deleteCartItem", () => {
        expect(orderInfoStore.deleteCartItem).toBeDefined();
    });

    it("Check existance of updateCartItemAmount", () => {
        expect(orderInfoStore.updateCartItemAmount).toBeDefined();
    });

    it("Check existance of cancelPendingOrder", () => {
        expect(orderInfoStore.cancelPendingOrder).toBeDefined();
    });
});
