import { UserStore } from '../user-model';

const store = new UserStore();

describe("Testing existance of functions in the User model", () => {

    it("Create User should exist", () => {
        expect(store.createAccount).toBeDefined();
    })

    it("Authenticate user should exist", () => {
        expect(store.authenticateUser).toBeDefined();
    })

    it("Get User Details fuction should exist", () => {
        expect(store.getUserDetails).toBeDefined();
    })

    it("Function to update user details should exist", () => {
        expect(store.updateUserDetails).toBeDefined();
    })
})

describe("user signup tests", () => {
    it("/user/signup | Add new user too database", async () => {
        const response = await store.createAccount({ firstName: "Jim", lastName: "Timothy", password: "randomPassword" });
        console.log('RESPONSE = ' + response);
        // expect(store.createAccount()).to
    })
})

