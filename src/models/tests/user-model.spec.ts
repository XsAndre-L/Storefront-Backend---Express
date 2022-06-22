import { UserStore } from "../user-model";

const userStore = new UserStore();

describe("Testing existance of functions in the User model", () => {
    it("Create User should exist", () => {
        expect(userStore.createAccount).toBeDefined();
    });

    it("Authenticate user should exist", () => {
        expect(userStore.authenticateUser).toBeDefined();
    });

    it("Get User Details fuction should exist", () => {
        expect(userStore.getUserDetails).toBeDefined();
    });

    it("Function to update user details should exist", () => {
        expect(userStore.updateUserDetails).toBeDefined();
    });
});

describe("user signup tests", () => {
    it("/user/signup | Add new user too database", async () => {
        // await userStore.createAccount({
        //     firstName: "Jim",
        //     lastName: "Timothy",
        //     password: "randomPassword",
        // });
        const response = await userStore.createAccount({
            firstName: "Jim",
            lastName: "Timothy",
            password: "randomPassword",
        });
        console.log("RESPONSE = " + response);

        expect(response).toEqual(jasmine.any(String));
        // expect(userStore.createAccount()).to
    });
});

describe("User login tests", () => {
    it("/user/login | Authenticate valid user", async () => {
        const response = await userStore.authenticateUser({
            firstName: "Jim",
            lastName: "Timothy",
            password: "randomPassword",
        })

        expect(response).toEqual(jasmine.any(String));
    })

    it("/user/login | Authenticate invalid user", async () => {
        const response = await userStore.authenticateUser({
            firstName: "Jill",
            lastName: "Timothy",
            password: "randomPassword",
        })

        expect(response).toEqual(null);
    })
})
