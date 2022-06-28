import { CartItemStore } from "../cart-model";

const cartItemStore = new CartItemStore();

// describe("Testing existance of functions in the Cart model", () => {


//     it("Check existance of addCartItem", () => {
//         expect(orderInfoStore.addCartItem).toBeDefined();
//     });

//     it("Check existance of deleteCartItem", () => {
//         expect(orderInfoStore.deleteCartItem).toBeDefined();
//     });

//     it("Check existance of updateCartItemAmount", () => {
//         expect(orderInfoStore.updateCartItemAmount).toBeDefined();
//     });

// });


describe("Cart Model Tests", () => {
    // Add item too cart
    it("Cart Model | Add item too cart", async (): Promise<void> => {
        await cartItemStore.addCartItem()
    })
    // remove item from cart
    it("Cart Model | Remove item from cart", async (): Promise<void> => {
        //
    })
    // Update cart Item Quantity
    it("Cart Model | Update cart item quantity", async (): Promise<void> => {
        //
    })

    // -- invalid 
    // Adding invalid Item
    it("Cart Model | Add invalid item", async (): Promise<void> => {
        //
    })
    // remove invalid Item
    it("Cart Model | Remove invalid item", async (): Promise<void> => {
        //
    })
    // Update invalid Item
    it("Cart Model | Update invalid item", async (): Promise<void> => {
        //
    })
    // 

})