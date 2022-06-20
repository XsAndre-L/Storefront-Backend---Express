import supertest from "supertest";
import app from "../../server";

const st = supertest(app);

describe("Main Route", () => {
    // Endpoint Tests
    it("index route should return 200 status", async () => { // Main EndPoint
        const response = await st.get("/");
        expect(response.status).toBe(200);
    });

    it("/users/login Endpoint", async () => {
        const response = await st.get("/users/login"); // get request not nessasary
    })

});