import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
} = process.env;

let database: Pool;

if (ENV === "dev") {
    database = new Pool({
        host: POSTGRES_HOST,
        port: parseInt(POSTGRES_PORT!),
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
} else {
    database = new Pool({
        host: POSTGRES_HOST,
        port: parseInt(POSTGRES_PORT!),
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

export default database;
