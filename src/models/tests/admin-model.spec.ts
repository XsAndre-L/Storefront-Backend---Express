// import { AdminInterface } from "../admin-model";
import { UserStore } from "../user-model";

const userStore = new UserStore();
// const adminInterface = new AdminInterface();

describe("Admim Model Tests", () => {
    it("Get Users", async (): Promise<void> => {
        const users = userStore.getUsers();
        console.log(users);
    });
});
