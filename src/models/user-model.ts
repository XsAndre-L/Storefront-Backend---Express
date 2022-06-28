import { dbConnection } from "../database";

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
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

export class UserStore {
    async getUserDetails(user_id: string): Promise<User> {
        try {
            const result = await dbConnection(
                "SELECT * FROM users_table WHERE id=$1",
                [user_id]
            );

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not get the specified users details.`);
        }
    }

    async createAccount(newUser: User): Promise<string> {
        try {

            // --- Error Handling For Account Creation
            let errorMessage = '';
            if (!newUser.email || String(newUser.email).length == 0) {
                if (!newUser.password) {
                    errorMessage = "Required fields not specified";
                } else {
                    errorMessage = "No Email Specified";
                }
            } else if (!newUser.password || !(newUser.password.length > 0)) {
                errorMessage = "No Password Specified";
            }

            if (errorMessage.length > 0) {
                throw new Error(errorMessage);
            }

            // First try to authenticate user too see if the account does not exist
            const currAuth = await this.authenticateUser(newUser);
            if (currAuth != null) {
                throw new Error("User Already Exists");
            }
            // --- Error Handling For Account Creation



            const hash = bcrypt.hashSync(
                newUser.password + BCRYPT_PASSWORD,
                parseInt(String(HASH_ROUNDS))
            );

            const result = await dbConnection(
                "INSERT INTO users_table (email, firstName, lastName, password) VALUES($1,$2,$3,$4) RETURNING id",
                [newUser.email, newUser.firstName, newUser.lastName, hash]
            );

            const jwtUser: User = {
                id: parseInt(result.rows[0].id),
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                password: hash,
            };

            const token = jwt.sign(jwtUser, String(JWT_SIGN_TOKEN));

            return String(token);
        } catch (error: any) {
            throw new Error(
                `Could not create the new user | ${error.message}`
            );
        }
    }

    async authenticateUser(userDetails: User): Promise<string | null> {
        try {
            const result = await dbConnection(
                "SELECT * FROM users_table WHERE email=$1",
                [userDetails.email]
            );
            if (result.rows[0] == undefined) {
                return null;
            }

            const auth: User = result.rows[0];

            const success = bcrypt.compareSync(
                userDetails.password + BCRYPT_PASSWORD,
                auth.password
            );

            if (success) {
                const token = jwt.sign(auth, String(JWT_SIGN_TOKEN));
                return String(token);
            } else {
                // return null;
                throw new Error("Incorrect Password");
            }
        } catch (error: any) {
            throw new Error(
                `Error while authenticating new user. | ${error.message}`
            );
        }
    }

    async updateUserDetails(userDetails: User): Promise<User | null> {
        try {
            const result = await dbConnection(
                "UPDATE users_table SET firstName=$1, lastName=$2 WHERE id=$3",
                [userDetails.firstName, userDetails.lastName, userDetails.id]
            );
            return result.rows[0];
        } catch (error: any) {
            throw new Error(
                `Could not update user details | ${error.message}`
            );
        }
    }
}
