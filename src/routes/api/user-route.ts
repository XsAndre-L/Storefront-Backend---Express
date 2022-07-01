import express from "express";
import { verifyUser } from "../../database";
import { User, UserStore } from "../../models/user-model";

const userStore = new UserStore();

const userRoute = express.Router();

userRoute
    .route("/")
    .get(
        // USER DETAILS
        async (_req: express.Request, res: express.Response): Promise<void> => {
            try {
                const user_id = verifyUser(String(_req.headers.authorization)); // Authentication

                const result = await userStore.getUserDetails(
                    user_id // gets the Id from spicific user
                );
                res.json(result);
            } catch (error) {
                res.status(500).send((error as Error).message);
            }
        }
    )
    .put(
        // UPDATE USER DETAILS
        async (_req: express.Request, res: express.Response): Promise<void> => {

            try {
                const user_id = verifyUser(String(_req.headers.authorization));
                const user: User = {
                    id: user_id,
                    email: "NA",
                    firstName: _req.body.firstName,
                    lastName: _req.body.lastName,
                    password: "NA",
                };

                const result = await userStore.updateUserDetails(user);
                res.send(result);
            } catch (error) {
                res.status(500).send((error as Error).message);
            }
        }
    );

userRoute.route("/signup").post(
    // CREATE NEW USER
    async (_req: express.Request, res: express.Response): Promise<void> => {
        const newUser: User = {
            email: _req.body.email,
            firstName: _req.body.firstName,
            lastName: _req.body.lastName,
            password: _req.body.password,
        };

        try {
            const result = await userStore.createAccount(newUser); // Should only be successfull if user does not exist
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send((error as Error).message);
        }
    }
);

userRoute.route("/login").post(
    // AUTHENTICATE EXISTING USER
    async (_req: express.Request, res: express.Response): Promise<void> => {
        const userDetails: User = {
            email: _req.body.email,
            firstName: "NA",
            lastName: "NA",
            password: _req.body.password,
        };

        try {
            const result = await userStore.authenticateUser(userDetails);
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send((error as Error).message);
        }
    }
);

export default userRoute;
