import { dbConnection, verifyUser } from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class ProductStore {
    async getProducts(): Promise<Product[]> {
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

    async getProductDetails(id: string): Promise<Product> {
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

    async createProduct(auth: string, newProduct: Product): Promise<Product> {
        // Post
        try {
            verifyUser(auth);

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

    async updateProduct(
        auth: string,
        id: string,
        updatedProduct: Product
    ): Promise<Product> {
        try {
            verifyUser(auth);

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

    async delete(auth: string, id: string): Promise<Product> {
        // delete
        try {
            verifyUser(auth);

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
