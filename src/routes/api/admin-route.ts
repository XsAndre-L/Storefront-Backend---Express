import express from "express";
import { verifyUser } from "../../database";
import { AdminInterface } from "../../models/admin-model";
import { UserStore } from "../../models/user-model";

const adminRoute = express.Router();

const adminInterface = new AdminInterface();

const userStore = new UserStore();



adminRoute.route("/").get(
    // GET ADMIN INFO
    async (_req: express.Request, res: express.Response): Promise<void> => {
        try {
            await adminInterface.verifyAdmin(String(_req.headers.authorization));

            // 

            //
        } catch (error: any) {
            res.send("Error while getting admin info | " + error.message);
        }
    }
);

adminRoute.route("/users").get(
    // GET LIST OF ALL USERS
    async (_req: express.Request, res: express.Response): Promise<void> => {
        try {
            await adminInterface.verifyAdmin(String(_req.headers.authorization));

            const users = await userStore.getUsers();

            res.json(users);

        } catch (error: any) {
            res.send(error.message);
        }
    }
);

// adminRoute.route("/users/:id").get(
//     // GET USER INFO
//     async (_req: express.Request, res: express.Response): Promise<void> => {
//         try {
//             //
//         } catch (error: any) {
//             throw new Error(error.message);
//         }
//     }
// );

// adminRoute.route("/users/:id/orders").get(
//     // GET USER ORDERS
//     async (_req: express.Request, res: express.Response): Promise<void> => {
//         try {
//             //
//         } catch (error: any) {
//             throw new Error(error.message);
//         }
//     }
// );

export default adminRoute;