import { UserStore } from "../user-model";

const userStore = new UserStore();

describe("Testing existance of functions in the User model", () => {
    it("createAccount should exist", () => {
        expect(userStore.createAccount).toBeDefined();
    });

    it("authenticateUser should exist", () => {
        expect(userStore.authenticateUser).toBeDefined();
    });

    it("getUserDetails function should exist", () => {
        expect(userStore.getUserDetails).toBeDefined();
    });

    it("updateUserDetails function should exist", () => {
        expect(userStore.updateUserDetails).toBeDefined();
    });
});

describe("user signup tests", () => {
    it("/user/signup | Add new user too database", async () => {
        const response = await userStore.createAccount({
            email: "jim34@gmail.com",
            firstName: "Jim",
            lastName: "Timothy",
            password: "randomPassword",
        });
        console.log("RESPONSE = " + response);

        expect(response).toEqual(jasmine.any(String));
    });
});

describe("User login tests", () => {
    it("/user/login | Authenticate valid user", async () => {
        const response = await userStore.authenticateUser({
            email: "jim34@gmail.com",
            firstName: "Jim",
            lastName: "Timothy",
            password: "randomPassword",
        });

        expect(response).toEqual(jasmine.any(String));
    });

    it("/user/login | Authenticate invalid user", async () => {
        const response = await userStore.authenticateUser({
            email: "jim34@gmail.com",
            firstName: "Jill",
            lastName: "Timothy",
            password: "randomPassword",
        });

        expect(response).toEqual(null);
    });
});
