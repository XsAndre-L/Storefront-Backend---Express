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
            let params: any;

            //sql = `SELECT *, (SELECT count(*) as count from order_items group by product_id WHERE product_id = p.id) as popularity from products p`;
            sql = "SELECT * FROM products_table";
            if (category) {
                sql += ' WHERE category=$1'
                params = [category];
            }
            if (sort == 'popularity') {
                sql += ` ORDER BY popularity desc`;
            }

            const result = await dbConnection(sql, params);

            return result.rows;
        } catch (error: any) {
            throw new Error(
                `Error while getting all products! ${error.message}`
            );
        }
    }

    async getProductDetails(id: string): Promise<Product> {
        try {
            const result = await dbConnection(
                "SELECT * FROM products_table WHERE id=$1",
                id.startsWith(":") ? [id.substring(1)] : [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error when retrieving Item of id : ${id}`);
        }
    }

    async createProduct(newProduct: Product): Promise<Product> {
        // Post
        try {
            const result = await dbConnection(
                "INSERT INTO products_table (name,price,category,popularity) VALUES($1,$2,$3,0)",
                [newProduct.name, newProduct.price, newProduct.category]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Error while Creating product : ${newProduct.name}`
            );
        }
    }

    async updateProduct(id: string, updatedProduct: Product): Promise<Product> {
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

    // DELETE PRODUCT
    async delete(id: string): Promise<Product> {
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
