import express from "express";
import { AdminInterface } from "../../models/admin-model";
import { UserStore } from "../../models/user-model";

const adminRoute = express.Router();

const adminInterface = new AdminInterface();

const userStore = new UserStore();

adminRoute.route("/").get(
    // GET ADMIN INFO
    async (_req: express.Request, res: express.Response): Promise<void> => {
        try {
            await adminInterface.verifyAdmin(
                String(_req.headers.authorization)
            );

            res.json("In Admin Route");
        } catch (error) {
            res.send(
                "Error while getting admin info | " + (error as Error).message
            );
        }
    }
);

adminRoute.route("/users").get(
    // GET LIST OF ALL USERS
    async (_req: express.Request, res: express.Response): Promise<void> => {
        try {
            await adminInterface.verifyAdmin(
                String(_req.headers.authorization)
            );

            const users = await userStore.getUsers();

            res.json(users);
        } catch (error) {
            res.send((error as Error).message);
        }
    }
);

export default adminRoute;
