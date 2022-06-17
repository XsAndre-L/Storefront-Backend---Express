import express from "express";
import { User, UserStore } from "../../models/user-model";

const userStore = new UserStore();

const userRoute = express.Router();

userRoute
    .route("/") // Authenticated user routes
    .get(async (_req: express.Request, res: express.Response) => {
        // User Details

        try {
            const result = await userStore.getUserDetails(
                String(_req.headers.authorization)
            );
            res.json(result);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    })
    .put(async (_req: express.Request, res: express.Response) => {
        // Update User Details

        const user: User = {
            id: _req.body.id,
            firstName: _req.body.firstName,
            lastName: _req.body.lastName,
            password: "NA",
        };

        try {
            const result = await userStore.updateUserDetails(user);
            res.send(result);
        } catch (error: any) {
            res.send(error.message);
        }
    });

userRoute
    .route("/signup")
    .post(async (_req: express.Request, res: express.Response) => {
        const newUser: User = {
            firstName: _req.body.firstName,
            lastName: _req.body.lastName,
            password: _req.body.password,
        };

        try {
            const result = await userStore.createAccount(newUser); // Should only be successfull if user does not exist
            res.json(result);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });

userRoute
    .route("/login")
    .post(async (_req: express.Request, res: express.Response) => {
        const userDetails: User = {
            firstName: _req.body.firstName,
            lastName: _req.body.lastName,
            password: _req.body.password,
        };

        try {
            const result = await userStore.authenticate(userDetails);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    });

export default userRoute;
