import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Pool, QueryResult } from "pg";

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,

    ENV,

    JWT_SIGN_TOKEN,
} = process.env;

let database: Pool;

if (ENV === "dev") {
    database = new Pool({
        host: POSTGRES_HOST,
        port: parseInt(String(POSTGRES_PORT)),
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
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
