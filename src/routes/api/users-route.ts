import express from "express";

const usersRoute = express.Router();

usersRoute
    .route("/")
    .get((_req: express.Request, res: express.Response) => {
        // INDEX
        res.send("User Index");
    })
    .post((_req: express.Request, res: express.Response) => {
        // Create new
    });

export default usersRoute;
