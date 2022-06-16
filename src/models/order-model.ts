import database from "../database";

export type Order = {
    id?: number;
};

export class OrderStore {
    async index(): Promise<Order[] | null> {
        return null;
    }
}
