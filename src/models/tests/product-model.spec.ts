import { ProductStore } from "../product-model";

const productStore = new ProductStore();

describe("Testing existance of functions in the Product model", () => {
    it("Check existance of getProducts", () => {
        expect(productStore.getProducts).toBeDefined();
    });

    it("Check existance of getProductDetails", () => {
        expect(productStore.getProductDetails).toBeDefined();
    });

    it("Check existance of createProduct", () => {
        expect(productStore.createProduct).toBeDefined();
    });

    it("Check existance of updateProduct", () => {
        expect(productStore.updateProduct).toBeDefined();
    });
});
