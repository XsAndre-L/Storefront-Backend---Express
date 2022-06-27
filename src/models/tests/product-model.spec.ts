import { ProductStore } from "../product-model";

const productStore = new ProductStore();

describe("Testing existance of functions in the Product model", () => {
    it("getProducts should exist", () => {
        expect(productStore.getProducts).toBeDefined();
    });

    it("getProductDetails should exist", () => {
        expect(productStore.getProductDetails).toBeDefined();
    });

    it("createProduct should exist", () => {
        expect(productStore.createProduct).toBeDefined();
    });

    it("updateProduct should exist", () => {
        expect(productStore.updateProduct).toBeDefined();
    });
});
