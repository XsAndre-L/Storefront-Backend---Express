import database from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { QueryResult } from "pg";

dotenv.config();

const {
    BCRYPT_PASSWORD,
    HASH_ROUNDS
} = process.env;

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
};

export class UserStore {
    async getUserDetails(user_id: number): Promise<User> {
        try {
            const result = this.dbConnection(
                "SELECT * FROM users_table WHERE id=$1",
                [user_id]
            )

            return result.rows[0];

        } catch (error) {
            throw new Error(`Could not get the specified users details.`)
        }
    }

    async createAccount(newUser: User): Promise<User> {
        try {
            // First try to authenticate user too see if the account does not exist



            const hash = bcrypt.hashSync(newUser.password + BCRYPT_PASSWORD, HASH_ROUNDS!);

            const result = this.dbConnection(
                "INSERT INTO users_table (firstName, lastName, password) VALUES($1,$2,$3)",
                [newUser.firstName, newUser.lastName, hash]
            )

            return result.rows[0];

        } catch (error) {
            throw new Error(`Could not create the new user`)
        }
    }

    async authenticate(firstName: string, lastName: string, password: string): Promise<User> {
        try {
            const result = this.dbConnection(
                "SELECT * FROM users_table WHERE firstName=$1 AND lastName=$2",
                [firstName, lastName]
            )

            const success = bcrypt.compareSync(password + BCRYPT_PASSWORD, result.password);


        } catch (error) {
            throw new Error(`Error while authenticating new user. | CODE : ${error}`)
        }
    }

    async updateUserDetails(userDetails: User): Promise<User> {
        try {
            const result = this.dbConnection(
                "UPDATE users_table SET firstName",
                []
            )
        } catch (error) {
            throw new Error(`Could not update user details | code: ${error}`)
        }
    }


    async dbConnection(sql: string, sqlInput: any[]): Promise<QueryResult<any>> {
        const conn = await database.connect();
        // const sql = "";
        const result = await conn.query(sql, []);
        conn.release();

        return result;

    }
}
