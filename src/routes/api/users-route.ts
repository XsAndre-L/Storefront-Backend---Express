import express from "express";

const signupRoute = express.Router();

signupRoute
    .route("/signup")
    .get((_req: express.Request, res: express.Response) => {
        // INDEX
        res.send("in signup");
    })
    .post((_req: express.Request, res: express.Response) => {
        // Create new
    });

const loginRoute = express.Router();

loginRoute
    .route("/login")
    .get((_req: express.Request, res: express.Response) => {
        res.send("Login Page");
    })
    .post((_req: express.Request, res: express.Response) => {
        res.send("Authenticate User");
    });

export default signupRoute;
