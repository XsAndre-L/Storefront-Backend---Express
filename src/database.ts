import { exec } from "child_process";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Pool, QueryResult } from "pg";

dotenv.config();
let envOBJ: any = {};

exec(
    "/opt/elasticbeanstalk/bin/get-config --output JSON environment",
    (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
        envOBJ = stdout;
    }
);

const {
    POSTGRES_HOST = envOBJ.POSTGRES_HOST,
    POSTGRES_PORT = envOBJ.POSTGRES_PORT,
    POSTGRES_DB = envOBJ.POSTGRES_DB,
    POSTGRES_DB_TEST = envOBJ.POSTGRES_DB_TEST,
    POSTGRES_USER = envOBJ.POSTGRES_USER,
    POSTGRES_PASSWORD = envOBJ.POSTGRES_PASSWORD,

    ENV = envOBJ.ENV,

    JWT_SIGN_TOKEN = envOBJ.JWT_SIGN_TOKEN,
} = process.env;

let database: Pool;

if (ENV === "dev") {
    database = new Pool({
        host: envOBJ.POSTGRES_HOST,
        port: parseInt(String(envOBJ.POSTGRES_PORT)),
        database: envOBJ.POSTGRES_DB,
        user: envOBJ.POSTGRES_USER,
        password: envOBJ.POSTGRES_PASSWORD,
    });
} else {
    database = new Pool({
        host: POSTGRES_HOST,
        port: parseInt(String(POSTGRES_PORT)),
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

// FUNCTION TO CONNECT, QUERY AND DISCONNECT DATABASE
export const dbConnection = async (
    sql: string,
    sqlInput: any // the use of any is required in this case to be able to handle any data type.
): Promise<QueryResult<any>> => {
    // QueryResult<any> is the type returned by the database
    const conn = await database.connect();
    const result = await conn.query(sql, sqlInput);
    conn.release();

    return result;
};

// Input jwtToken
// Returns user_id
export const verifyUser = (auth: string | null): number => {
    try {
        const verification = jwt.verify(String(auth), String(JWT_SIGN_TOKEN));
        return Object.values(verification)[0];
    } catch (error) {
        throw new Error(`Authentication Error`);
    }
};

export default database;
