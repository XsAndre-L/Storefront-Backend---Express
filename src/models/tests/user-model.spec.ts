import { UserStore } from "../user-model";

const userStore = new UserStore();

// describe("Testing existance of functions in the User model", () => {
//     it("createAccount should exist", () => {
//         expect(userStore.createAccount).toBeDefined();
//     });

//     it("authenticateUser should exist", () => {
//         expect(userStore.authenticateUser).toBeDefined();
//     });

//     it("getUserDetails function should exist", () => {
//         expect(userStore.getUserDetails).toBeDefined();
//     });

//     it("updateUserDetails function should exist", () => {
//         expect(userStore.updateUserDetails).toBeDefined();
//     });
// });

// describe("user signup tests", () => {
//     it("/user/signup | Add new user too database", async () => {
//         const response = await userStore.createAccount({
//             email: "jim34@gmail.com",
//             firstName: "Jim",
//             lastName: "Timothy",
//             password: "randomPassword",
//         });
//         console.log("RESPONSE = " + response);

//         expect(response).toEqual(jasmine.any(String));
//     });
// });

describe("User Model-Tests", () => {
    console.log("Userr Signup Tests");
    const testUser = {
        email: "jim34@gmail.com",
        firstName: "Jim",
        lastName: "Timothy",
        password: "randomPassword",
    };
    // Create user no email
    it("User Signup | No Email Supplied", async (): Promise<void> => {
        testUser.email = '';

        try {
            await userStore.createAccount(testUser);
        } catch (error: any) {
            expect(error.message).toEqual('Could not create the new user | No Email Specified')
        }
    })
    // Create user password too short
    it("User Signup | No Password Supplied", async (): Promise<void> => {
        testUser.password = '';
        testUser.email = "jim34@gmail.com";

        try {
            await userStore.createAccount(testUser);
        } catch (error: any) {
            expect(error.message).toEqual("Could not create the new user | No Password Specified");
        }
    })
    // Create user with no info
    it("User Signup | No Info Supplied", async (): Promise<void> => {
        testUser.email = '';
        try {
            await userStore.createAccount(testUser);
        } catch (error: any) {
            expect(error.message).toEqual("Could not create the new user | Required fields not specified")
        }
    })
    // Create valid user
    it("User Signup | Valid Signup", async (): Promise<void> => {
        testUser.email = "jim34@gmail.com";
        testUser.password = "randomPassword";
        const response = await userStore.createAccount(testUser);
        expect(response).toEqual(jasmine.any(String));
    })
    // Create Duplicate User
    it("User Signup | Duplicate User", async (): Promise<void> => {
        try {
            await userStore.createAccount(testUser);
        } catch (error: any) {
            expect(error.message).toEqual("Could not create the new user | User Already Exists")
        }
    })

    console.log("User Login Tests");
    it("User Login | Authenticate valid user", async (): Promise<void> => {
        const response = await userStore.authenticateUser({
            email: "jim34@gmail.com",
            firstName: "NA",
            lastName: "NA",
            password: "randomPassword",
        });
        expect(response).toEqual(jasmine.any(String));
    });

    it("User Login | Authenticate invalid user", async (): Promise<void> => { // login is not dependent on firstName and lastName 
        const response = await userStore.authenticateUser({
            email: "jim3@gmail.com",
            firstName: "NA",
            lastName: "NA",
            password: "randomPassword",
        });
        expect(response).toEqual(null);
    });

    // login with wrong password
    it("User Login | Wrong Password", async (): Promise<void> => {
        testUser.password = "wrong password";

        try {
            await userStore.authenticateUser(testUser);
        } catch (error: any) {
            expect(error.message).toEqual("Error while authenticating new user. | Incorrect Password");
        }
    })
});
