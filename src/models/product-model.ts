import { dbConnection } from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class ProductStore {
    async getProducts(
        category: string | null,
        sort: string | null
    ): Promise<Product[]> {
        // get
        try {
            let sql: string;
            let params: any;    // needs any to be able to be passed to dbConnection

            //sql = `SELECT *, (SELECT count(*) as count from order_items group by product_id WHERE product_id = p.id) as popularity from products p`;
            sql = "SELECT * FROM products_table";
            if (category) {
                sql += " WHERE category=$1";
                params = [category];
            }
            if (sort == "popularity") {
                sql += ` ORDER BY popularity desc`;
            }

            const result = await dbConnection(sql, params);

            return result.rows;
        } catch (error) {
            throw new Error(
                `Error while getting all products! ${(error as Error).message}`
            );
        }
    }

    async getProductDetails(id: string): Promise<Product> {
        try {
            const result = await dbConnection(
                "SELECT * FROM products_table WHERE id=$1",
                [id]
            );
            if (result.rows[0] == undefined) {
                throw new Error(`No item with that id`);
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Error when retrieving item | ${(error as Error).message}`
            );
        }
    }

    async createProduct(newProduct: Product): Promise<Product> {
        // Post
        try {
            // Error handling
            let errorMessage = "";
            if (newProduct.name.length < 1) {
                // Maybe check for invalid characters used in product name
                errorMessage = "Invalid Product Name";
            } else if (newProduct.price < 0) {
                errorMessage = "Invalid Product Price";
            }

            if (errorMessage.length > 0) {
                throw new Error(errorMessage);
            }

            // If
            const existanceCheck = await dbConnection(
                "SELECT id FROM products_table WHERE name=$1",
                [newProduct.name]
            );
            if (existanceCheck.rows[0] != undefined) {
                throw new Error("Product was already added to the shop");
            }
            // ---

            const result = await dbConnection(
                "INSERT INTO products_table (name,price,category,popularity) VALUES($1,$2,$3,0)",
                [newProduct.name, newProduct.price, newProduct.category]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Error while creating product | ${(error as Error).message}`
            );
        }
    }

    async updateProduct(id: string, updatedProduct: Product): Promise<Product> {
        try {
            const result = await dbConnection(
                "UPDATE products_table SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *",
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

    // DELETE PRODUCT
    async deleteProduct(id: string): Promise<Product> {
        try {
            const result = await dbConnection(
                "DELETE FROM products_table WHERE id=$1 RETURNING *",
                [id.startsWith(":") ? id.substring(1) : id]
            );
            // console.log(result.rows[0])
            if (result.rows[0] == undefined) {
                throw new Error("Item Does Not Exist");
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Error While Removing Item | ${(error as Error).message}`
            );
        }
    }
}
