import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
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

    JWT_SIGN_TOKEN
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

// Function to connect, query and disconnect from Database
export const dbConnection = async (
    sql: string,
    sqlInput: any[]
): Promise<QueryResult<any>> => {
    const conn = await database.connect();
    const result = await conn.query(sql, sqlInput);
    conn.release();

    return result;
};

export const verifyUser = (auth: string | null): string | jwt.JwtPayload => {
    try {

        const verification = jwt.verify(auth!, String(JWT_SIGN_TOKEN));
        return verification;

    } catch (error: any) {
        //console.log("User not logged in...");
        throw new Error(`Authentication Error`);
    }
}

export default database;
