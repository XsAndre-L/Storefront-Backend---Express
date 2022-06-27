import { CartItemStore } from "../cart-model";

const orderInfoStore = new CartItemStore();

describe("Testing existance of functions in the Cart model", () => {


    it("Check existance of addCartItem", () => {
        expect(orderInfoStore.addCartItem).toBeDefined();
    });

    it("Check existance of deleteCartItem", () => {
        expect(orderInfoStore.deleteCartItem).toBeDefined();
    });

    it("Check existance of updateCartItemAmount", () => {
        expect(orderInfoStore.updateCartItemAmount).toBeDefined();
    });


});
