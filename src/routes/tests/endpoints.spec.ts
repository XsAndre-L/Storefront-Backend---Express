import supertest from "supertest";
import app from "../../server";

const st = supertest(app);

// Endpoint Tests
describe("Root Endpoint Testing", () => {
    it("index route should return 200 status", async (): Promise<void> => {
        // Main EndPoint
        const response = await st.get("/");
        expect(response.status).toBe(200);
    });

    // Unknown Route
    it("Unknown Route /wrongroute", async (): Promise<void> => {
        const response = await st.get("/wrongroute");
        expect(response.status).toBe(404);
    });
});

// USER ENDPOINT
describe("User Endpoint Testing", () => {
    it("/user/login | Authenticate user", async (): Promise<void> => {
        const response = await st.post("/user/login"); // get request not nessasary
        expect(response.status).toBe(200);
    });

    it("/user/signup | Create new user missing required fields error", async (): Promise<void> => {
        const response = await st.post("/user/signup");
        expect(response.text).toEqual(
            "Could not create the new user | Required fields not specified"
        );
    });
    // ---
});

// PRODUCT ENDPOINT
describe("Product endpoints", () => {
    it("/product | Get all products", async (): Promise<void> => {
        const response = await st.get("/product");
        expect(response.status).toBe(200);
    });

    it("/product/ | Add new product", async (): Promise<void> => {
        // Authentication Error Should Occur
        const response = await st.post("/product");
        expect(response.status).toBe(500);
    });

    // Single Product Routes
    it("/product/:id | Get product details", async (): Promise<void> => {
        const response = await st.get("/product/1");
        expect(response.body).toEqual({
            id: 1,
            name: "apple",
            price: 5,
            category: "fruit",
            popularity: 0,
        });
    });

    it("/product/:id | Delete single product", async (): Promise<void> => {
        const response = await st.delete("/product/1");
        expect(response.status).toBe(500);
    });

    it("/product/:id | Update product", async (): Promise<void> => {
        const response = await st.put("/product/1");
        expect(response.status).toBe(500);
    });
});

// ORDER ENDPOINTS
describe("Order Endpoints", () => {
    it("/order | Get user orders", async (): Promise<void> => {
        const response = await st.get("/order");
        expect(response.status).toBe(500);
    });

    it("/order | Create new order as invalid user", async (): Promise<void> => {
        const response = await st.post("/order");
        expect(response.status).toBe(500);
    });

    it("/order/:id | Get order details", async (): Promise<void> => {
        const response = await st.get("/order/1");
        expect(response.status).toBe(500);
    });
});

// CART ENDPOINTS
describe("Cart Endpoints", () => {
    it("/cart | Get cart contents", async (): Promise<void> => {
        const response = await st.get("/cart");
        expect(response.status).toBe(500);
    });

    it("/cart | Add to cart", async (): Promise<void> => {
        const response = await st.post("/cart");
        expect(response.status).toBe(500);
    });

    it("/cart | Remove from cart", async (): Promise<void> => {
        const response = await st.delete("/cart");
        expect(response.status).toBe(500);
    });

    it("/cart | Update cart item quantity", async (): Promise<void> => {
        const response = await st.put("/cart");
        expect(response.status).toBe(500);
    });
});
