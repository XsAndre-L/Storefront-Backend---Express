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
                    user_id // gets the Id form spicific user
                );
                res.json(result);
            } catch (error: any) {
                res.status(500).send(error.message);
            }
        }
    )
    .put(
        // UPDATE USER DETAILS
        async (_req: express.Request, res: express.Response): Promise<void> => {
            const user: User = {
                id: _req.body.id,
                email: "NA",
                firstName: _req.body.firstName,
                lastName: _req.body.lastName,
                password: "NA",
            };

            try {
                verifyUser(String(_req.headers.authorization));

                const result = await userStore.updateUserDetails(user);
                res.send(result);
            } catch (error: any) {
                res.send(error.message);
            }
        }
    );

userRoute.route("/signup").post(
    // CREATE NEW USER
    async (_req: express.Request, res: express.Response): Promise<void> => {

        try {
            if (!_req.body.email) {
                throw new Error("No Email Specified");
            }
            if (!_req.body.password) {
                throw new Error("Password Not Specified");
            }
            const newUser: User = {
                email: _req.body.email,
                firstName: _req.body.firstName,
                lastName: _req.body.lastName,
                password: _req.body.password,
            };

            const result = await userStore.createAccount(newUser); // Should only be successfull if user does not exist
            res.json(result);
        } catch (error: any) {
            res.status(500).send(error.message);
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
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
);

export default userRoute;
