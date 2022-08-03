// import { exec } from "child_process";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { Pool, QueryResult } from "pg";

// export class Database {
//     envOBJ: any = {};
//     database: Pool | undefined;

//     constructor() {
//         database = this.setDatabaseVals();
//         dotenv.config();
//     }

//     getEnv() {
//         new Promise((resolve) => {
//             setTimeout(() => {
//                 exec(
//                     "/opt/elasticbeanstalk/bin/get-config --output JSON environment",
//                     (error, stdout, stderr) => {
//                         console.log("--- CORRECT DATA ---");
//                         console.log(error, stdout, stderr);
//                         this.envOBJ = stdout;
//                     }
//                 );
//             }, 3000);
//         }).then(
//             (_) =>
//                 new Promise((resolve) => {
//                     console.log("then");
//                 })
//         );
//     }

//     // const {
//     //     POSTGRES_HOST,
//     //     POSTGRES_PORT,
//     //     POSTGRES_DB,
//     //     POSTGRES_DB_TEST,
//     //     POSTGRES_USER,
//     //     POSTGRES_PASSWORD,

//     //     ENV,

//     //     JWT_SIGN_TOKEN,
//     // } = process.env;
//     setDatabaseVals(): Pool {
//         console.log(this.envOBJ.POSTGRES_HOST);
//         if (this.envOBJ.ENV === "dev") {
//             return new Pool({
//                 host: this.envOBJ.POSTGRES_HOST,
//                 port: parseInt(String(this.envOBJ.POSTGRES_PORT)),
//                 database: this.envOBJ.POSTGRES_DB,
//                 user: this.envOBJ.POSTGRES_USER,
//                 password: this.envOBJ.POSTGRES_PASSWORD,
//             });
//         } else {
//             return new Pool({
//                 host: this.envOBJ.POSTGRES_HOST,
//                 port: parseInt(String(this.envOBJ.POSTGRES_PORT)),
//                 database: this.envOBJ.POSTGRES_DB_TEST,
//                 user: this.envOBJ.POSTGRES_USER,
//                 password: this.envOBJ.POSTGRES_PASSWORD,
//             });
//         }
//     }

//     // FUNCTION TO CONNECT, QUERY AND DISCONNECT DATABASE
//     dbConnection = async (
//         sql: string,
//         sqlInput: any // the use of any is required in this case to be able to handle any data type.
//     ): Promise<QueryResult<any>> => {
//         // QueryResult<any> is the type returned by the database
//         const conn = await database.connect();
//         const result = await conn.query(sql, sqlInput);
//         conn.release();

//         return result;
//     };

//     // Input jwtToken
//     // Returns user_id
//     verifyUser = (auth: string | null): number => {
//         try {
//             const verification = jwt.verify(
//                 String(auth),
//                 String(this.envOBJ.JWT_SIGN_TOKEN)
//             );
//             return Object.values(verification)[0];
//         } catch (error) {
//             throw new Error(`Authentication Error`);
//         }
//     };
// }

dotenv.config();
// let envOBJ: any = {};
let database: Pool;

// exec(
//     "/opt/elasticbeanstalk/bin/get-config --output JSON environment",
//     (error, stdout, stderr) => {
//         console.log("--- CORRECT DATA ---");
//         console.log(error, stdout, stderr);
//         envOBJ = stdout;
//     }
// );
console.log(process.env);
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

console.log(POSTGRES_HOST);
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
