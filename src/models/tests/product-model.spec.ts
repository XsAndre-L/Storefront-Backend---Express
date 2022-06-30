import { Product, ProductStore } from "../product-model";

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

describe("Product Model-Tests", () => {
    // Test adding new product to database
    it("Create Product | Add new product", async () => {
        await productStore.createProduct({
            name: "Pear",
            price: 5,
            category: "Fruit",
        });
        const getProduct = await productStore.getProductDetails("5"); // new Product added will be at id 5
        const expectedProduct = {
            id: 5,
            name: "Pear",
            price: 5,
            category: "Fruit",
            popularity: 0,
        };
        expect(getProduct).toEqual(expectedProduct);
    });
    // Test Updating product
    it("Update product | Expect Product Price to Change", async () => {
        const product = {
            name: "Pear",
            price: 10,
            category: "Fruit",
        };
        const newProduct = await productStore.updateProduct("5", product);
        expect(newProduct.price).toEqual(10);
    });
    // Test deleting product from database
    it("Delete Product | Delete product", async () => {
        let product = await productStore.getProductDetails("5");
        expect(product).toBeDefined();
        await productStore.deleteProduct("5");

        try {
            product = await productStore.getProductDetails("5");
        } catch (error: any) {
            expect(error.message).toEqual(
                "Error when retrieving item | No item with that id"
            );
        }
    });

    // Test Filter by categories
    it("Get Products | Filter by category", async () => {
        const filteredProducts = await productStore.getProducts("fruit", null);
        expect(filteredProducts.length).toEqual(2);
    });
    // Test Sort by popularity
    it("Get Products | Sort by popularity", async () => {
        //
    });
    // Test Filter by category with Sorting by popularity
    it("Get Products | Filter by category and sort by popularity", async () => {
        //
    });

    // Get Product Details
    it("Get Product | Details of existing product", async () => {
        const apple = await productStore.getProductDetails("1");
        const shouldEqual = {
            id: 1,
            name: "apple",
            price: 5,
            category: "fruit",
            popularity: 0,
        };
        expect(apple).toEqual(shouldEqual);
    });
    // Get Invalid Product Details
    it("Get Product | Details of invalid product", async () => {
        try {
            await productStore.getProductDetails("50");
        } catch (error: any) {
            expect(error.message).toEqual(
                "Error when retrieving item | No item with that id"
            );
        }
    });

    // Add Invalid Product
    it("Product Model | Add Invalid Product", async () => {
        const product: Product = { name: "pear", price: 6, category: "Fruit" };
        product.name = "";
        try {
            await productStore.createProduct(product);
        } catch (error: any) {
            expect(error.message).toEqual(
                "Error while creating product | Invalid Product Name"
            );
        }
    });
    // Remove Invalid Product
    it("Product Model | Remove Invalid Product", async () => {
        try {
            await productStore.deleteProduct("50");
        } catch (error: any) {
            expect(error.message).toEqual(
                "Error While Removing Item | Item Does Not Exist"
            );
        }
    });
    // Update Invalid Product
    it("Product Model | Update Invalid Product", async () => {
        try {
            const product = { name: "any", price: 5, category: "any" };
            await productStore.updateProduct("50", product);
        } catch (error: any) {
            expect(error.message).toEqual("Error while updating product | ");
        }
    });
    // Add Duplicate Product
    it("Product Model | Add Duplicate Product Blocking", async () => {
        const product = { name: "pineapple", price: 50, category: "fruit" };
        try {
            await productStore.createProduct(product);
            await productStore.createProduct(product);
        } catch (error: any) {
            expect(error.message).toEqual(
                "Error while creating product | Product was already added to the shop"
            );
        }
    });
});
