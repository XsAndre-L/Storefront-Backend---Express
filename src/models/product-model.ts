import { QueryResult } from "pg";
import database from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        // get
        try {
            const conn = await database.connect();
            const sql = "SELECT * FROM products_table";
            const result = await conn.query(sql);
            conn.release();

            return result.rows;

        } catch (error) {

            throw new Error(`Error when while getting all products!`);

        }
    }

    async show(id: string): Promise<Product> {
        // :id get
        try {
            const conn = await database.connect();
            const sql = "SELECT * FROM products_table WHERE id=$1";

            let result: QueryResult<any>;
            if (id.startsWith(':')) {
                result = await conn.query(sql, [id.substring(1)]);
            } else {
                result = await conn.query(sql, [id]);
            }

            conn.release();

            return result.rows[0];

        } catch (error) {
            throw new Error(`Error when trying to retrieve Item of id : ${id}`)
        }
    }

    async create(newProduct: Product): Promise<Product> {
        // Post
        try {
            const conn = await database.connect();
            const sql = "INSERT INTO products_table (name,price,category) VALUES($1,$2,$3)";
            const result = await conn.query(sql, [newProduct.name, newProduct.price, newProduct.category]);
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Error while Creating product : ${newProduct.name}`);
        }
    }

    async update(id: string, updatedProduct: Product): Promise<Product> {
        // put
        try {
            const conn = await database.connect();
            const sql = "UPDATE products_table SET name=$1, price=$2, category=$3 WHERE id=$4";

            let result: QueryResult<any>;
            if (id.startsWith(':')) {
                result = await conn.query(sql, [updatedProduct.name, updatedProduct.price, updatedProduct.category, id.substring(1)]);
            } else {
                result = await conn.query(sql, [updatedProduct.name, updatedProduct.price, updatedProduct.category, id]);
            }
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(`Error while Updating ${updatedProduct.name}`);
        }
    }

    async delete(id: string): Promise<Product> {
        // delete
        try {
            const conn = await database.connect();
            const sql = "DELETE FROM products_table WHERE id=$1";

            let result: QueryResult<any>;
            if (id.startsWith(':')) {
                result = await conn.query(sql, [id.substring(1)]);
            } else {
                result = await conn.query(sql, [id]);
            }

            conn.release();

            return result.rows[0];

        } catch (error) {
            throw new Error(`Error while Deleting product with id : ${id}`);
        }
    }
}
