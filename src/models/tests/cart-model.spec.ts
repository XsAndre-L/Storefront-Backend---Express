import { CartItemStore, OrderInfo } from "../cart-model";
import { OrderStore } from "../order-model";
import { UserStore } from "../user-model";

const cartItemStore = new CartItemStore();
const orderStore = new OrderStore();
const userStore = new UserStore();

describe("Testing existance of functions in the Cart model", () => {
    it("Check existance of addCartItem", () => {
        expect(cartItemStore.addCartItem).toBeDefined();
    });

    it("Check existance of deleteCartItem", () => {
        expect(cartItemStore.deleteCartItem).toBeDefined();
    });

    it("Check existance of updateCartItemAmount", () => {
        expect(cartItemStore.updateCartItemAmount).toBeDefined();
    });
});

describe("Cart Model Tests", () => {
    // Add item too cart : Expect Pass
    it("Cart Model | Add item too cart", async (): Promise<void> => {
        const users = await userStore.getUserDetails(1); // Create user if user does not exist
        if (users == undefined) {
            const testUser = {
                email: "jim34@gmail.com",
                firstName: "Jim",
                lastName: "Timothy",
                password: "randomPassword",
            };
            await userStore.createAccount(testUser);
        }

        let order_id = await orderStore.getPendingOrder(1);

        if (order_id == null) {
            // If order does not yet exist we create it.
            const order = await orderStore.createOrder(1);
            order_id = Number(order.id);
        }
        const newOrderInfo = await cartItemStore.addCartItem(order_id, 2, 1);

        expect(newOrderInfo).not.toBeNull();
    });
    // Update cart Item Quantity : Expect Pass
    it("Cart Model | Update cart item quantity", async (): Promise<void> => {
        let cartItems = await orderStore.getOrderProducts(1);

        const orderInfo: OrderInfo = {
            order_id: 1,
            product_id: 2,
            amount: 2,
        };
        await cartItemStore.updateCartItemAmount(orderInfo);
        expect(cartItems[0].amount).toEqual(1);

        cartItems = await orderStore.getOrderProducts(1);
        expect(cartItems[0].amount).toEqual(2);
    });
    // remove item from cart : Expect Pass
    it("Cart Model | Remove item from cart", async (): Promise<void> => {
        let cartItems = await orderStore.getOrderProducts(1);

        await cartItemStore.deleteCartItem(1, 2);
        expect(cartItems.length).toEqual(1);

        cartItems = await orderStore.getOrderProducts(1);
        expect(cartItems.length).toEqual(0);
    });

    // -- invalid
    // Adding invalid Item : Expect Error
    it("Cart Model | Add invalid item", async (): Promise<void> => {
        try {
            await cartItemStore.addCartItem(1, 50, 1);
        } catch (error) {
            expect((error as Error).message).toEqual("Product does not exist");
        }
    });
    // Update invalid Item : Expect Error
    it("Cart Model | Update invalid item", async (): Promise<void> => {
        try {
            const orderInfo: OrderInfo = {
                order_id: 1,
                product_id: 50,
                amount: 2,
            };
            await cartItemStore.updateCartItemAmount(orderInfo);
        } catch (error) {
            expect((error as Error).message).toEqual("Product does not exist");
        }
    });
    // remove invalid Item : Expect Error
    it("Cart Model | Remove invalid item", async (): Promise<void> => {
        try {
            await cartItemStore.deleteCartItem(1, 50);
        } catch (error) {
            expect((error as Error).message).toEqual("Product does not exist");
        }
    });
    //
});
