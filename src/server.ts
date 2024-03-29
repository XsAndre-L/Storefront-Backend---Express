import cors from "cors";
import express from "express";
import mainRoute from "./routes/index-route";

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
    origin: "http://ecommerse-frontend---angular941266980980.s3-website-us-east-1.amazonaws.com",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json()); // for parsing application/json
//app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use("/", mainRoute);

// console.log("Hello World!");

app.listen(port, () => {
    console.log(`Started server on port: ${port}`);
    console.log(process.env);
});

export default app;
