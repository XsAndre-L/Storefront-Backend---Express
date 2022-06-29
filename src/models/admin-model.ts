import { dbConnection } from "../database";
import { OrderStore } from "./order-model";

export class AdminInterface {
    async adminCheck(user_id: number): Promise<boolean> {
        const result = await dbConnection(
            "SELECT role FROM users_table WHERE id=$1",
            [user_id]
        );

        console.log(result.rows[0].role);

        if (result.rows[0].role == 'admin') {
            return true;
        } else {
            return false;
        }
    }
}
