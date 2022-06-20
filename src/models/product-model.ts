import { dbConnection } from "../database";

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
            const result = await dbConnection(
                "SELECT * FROM products_table",
                []
            );
            return result.rows;
        } catch (error) {
            throw new Error(`Error when while getting all products!`);
        }
    }

    async show(id: string): Promise<Product> {
        // :id get
        try {
            const result = await dbConnection(
                "SELECT * FROM products_table WHERE id=$1",
                id.startsWith(":") ? [id.substring(1)] : [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error when trying to retrieve Item of id : ${id}`);
        }
    }

    async create(newProduct: Product): Promise<Product> {
        // Post
        try {
            const result = await dbConnection(
                "INSERT INTO products_table (name,price,category) VALUES($1,$2,$3)",
                [newProduct.name, newProduct.price, newProduct.category]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Error while Creating product : ${newProduct.name}`
            );
        }
    }

    async update(id: string, updatedProduct: Product): Promise<Product> {
        // put
        try {
            const result = await dbConnection(
                "UPDATE products_table SET name=$1, price=$2, category=$3 WHERE id=$4",
                [
                    updatedProduct.name,
                    updatedProduct.price,
                    updatedProduct.category,
                    id.startsWith(":") ? id.substring(1) : id,
                ]
            );

            return result.rows[0];
        } catch (error) {
            throw new Error(`Error while Updating ${updatedProduct.name}`);
        }
    }

    async delete(id: string): Promise<Product> {
        // delete
        try {
            const result = await dbConnection(
                "DELETE FROM products_table WHERE id=$1",
                [id.startsWith(":") ? id.substring(1) : id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error while Deleting product with id : ${id}`);
        }
    }
}
