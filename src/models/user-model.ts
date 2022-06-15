import database from "../database";

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User | null> {
        return null;
    }

    async create(): Promise<User | null> {
        return null;
    }

    async show(): Promise<User | null> {
        return null;
    }
}
