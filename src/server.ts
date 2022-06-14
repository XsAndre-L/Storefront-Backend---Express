import express from "express";

const app = express();
const port = 3000;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("in main route");
});

console.log("Hello World!");

app.listen(port, () => {
    console.log(`Started server on port: ${port}`);
});
