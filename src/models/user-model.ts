import { dbConnection, verifyUser } from "../database";

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
            const decoded = verifyUser(auth);//jwt.verify(auth, String(JWT_SIGN_TOKEN));

            const result = await dbConnection(
                "SELECT * FROM users_table WHERE id=$1",
                [Object.values(decoded)[0]] // gets the id
            );

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not get the specified users details.`);
        }
    }

    async createAccount(newUser: User): Promise<string> {
        try {
            // First try to authenticate user too see if the account does not exist
            const currAuth = await this.authenticate(newUser);
            console.log("auth - " + currAuth);

            if (currAuth != null) {
                return "USER ALREADY EXISTS";
            }

            const hash = bcrypt.hashSync(
                newUser.password + BCRYPT_PASSWORD,
                parseInt(String(HASH_ROUNDS))
            );

            const result = await dbConnection(
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

            const token = jwt.sign(jwtUser, String(JWT_SIGN_TOKEN))//verifyUser(jwtUser);

            return String(token);
        } catch (error: any) {
            throw new Error(
                `Could not create the new user | CODE : ${error.message}`
            );
        }
    }

    async authenticate(userDetails: User): Promise<string | null> {
        try {
            const result = await dbConnection(
                "SELECT * FROM users_table WHERE firstName=$1 AND lastName=$2",
                [userDetails.firstName, userDetails.lastName]
            );

            if (result.rows[0] == undefined) {
                return null;
            }

            const auth: User = result.rows[0];
            console.dir(auth);

            const success = bcrypt.compareSync(
                userDetails.password + BCRYPT_PASSWORD,
                auth.password
            );

            if (success) {
                const token = jwt.sign(auth, String(JWT_SIGN_TOKEN));
                console.log("USER EXISTS");
                console.log(token);
                return String(token);
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
            const result = await dbConnection(
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
}
