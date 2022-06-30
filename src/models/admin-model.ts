import { dbConnection, verifyUser } from "../database";
// import { OrderStore } from "./order-model";

export class AdminInterface {
    async adminCheck(user_id: number): Promise<boolean> {
        try {
            const result = await dbConnection(
                "SELECT role FROM users_table WHERE id=$1",
                [user_id]
            );

            console.log(result.rows[0].role);

            if (result.rows[0].role == "admin") {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(
                `Error while checking admin | ${(error as Error).message}`
            );
        }
    }

    async verifyAdmin(auth: string) {
        const user_id = verifyUser(auth);
        const admin = await this.adminCheck(user_id);
        if (!admin) {
            throw new Error("Not Admin");
        }
    }
}
