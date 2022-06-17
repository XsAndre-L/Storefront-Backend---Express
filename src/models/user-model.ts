import database from "../database";
import { QueryResult } from "pg";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const {
    BCRYPT_PASSWORD,
    HASH_ROUNDS,

    JWT_SIGN_TOKEN,
} = process.env;

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
};

export class UserStore {
    async getUserDetails(auth: string): Promise<User> {
        try {
            console.log(auth);
            jwt.verify(auth, String(JWT_SIGN_TOKEN));

            const decoded = jwt.decode(auth, { json: true })!;
            // console.log(JSON.parse(String(dec)));
            console.log(decoded);

            const result = await this.dbConnection(
                "SELECT * FROM users_table WHERE id=$1",
                [String(decoded.id)]
            );

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not get the specified users details.`);
        }
    }

    async createAccount(newUser: User): Promise<string> {
        try {
            // First try to authenticate user too see if the account does not exist
            const auth = await this.authenticate(newUser);
            console.log('auth - ' + auth);

            if (auth != null) {
                return "USER ALREADY EXISTS"
            }

            const hash = bcrypt.hashSync(
                newUser.password + BCRYPT_PASSWORD,
                parseInt(String(HASH_ROUNDS))
            );

            const result = await this.dbConnection(
                "INSERT INTO users_table (firstName, lastName, password) VALUES($1,$2,$3) RETURNING id",
                [newUser.firstName, newUser.lastName, hash]
            );

            console.log(`${result}`);
            const jwtUser: User = {
                id: parseInt(result.rows[0].id),
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                password: hash,
            };

            const token = jwt.sign(jwtUser, String(JWT_SIGN_TOKEN));
            console.log(token);

            return token;
        } catch (error: any) {
            throw new Error(
                `Could not create the new user | CODE : ${error.message}`
            );
        }
    }

    async authenticate(userDetails: User): Promise<string | null> {
        try {
            const result = await this.dbConnection(
                "SELECT * FROM users_table WHERE firstName=$1 AND lastName=$2",
                [userDetails.firstName, userDetails.lastName]
            );

            if (result.rows[0] == undefined) {
                return null;
            }

            const authUser: User = result.rows[0];
            console.dir(authUser);

            const success = bcrypt.compareSync(
                userDetails.password + BCRYPT_PASSWORD,
                authUser.password
            );

            if (success) {

                const token = jwt.sign(authUser, String(JWT_SIGN_TOKEN));
                console.log('USER EXISTS');
                console.log(token);
                return token;
            } else {
                return null;
            }


        } catch (error) {
            throw new Error(
                `Error while authenticating new user. | CODE : ${error}`
            );
        }
    }

    async updateUserDetails(userDetails: User): Promise<User | null> {
        try {
            console.log("Updating Details");
            const result = await this.dbConnection(
                "UPDATE users_table SET firstName=$1, lastName=$2 WHERE id=$3",
                [userDetails.firstName, userDetails.lastName, userDetails.id]
            );
            return result.rows[0];
        } catch (error: any) {
            // console.error(`${error.message}`)
            // return null;
            throw new Error(
                `Could not update user details | code: ${error.message}`
            );
        }
    }

    async dbConnection(
        sql: string,
        sqlInput: any[]
    ): Promise<QueryResult<any>> {
        const conn = await database.connect();
        const result = await conn.query(sql, sqlInput);
        conn.release();

        return result;
    }
}
