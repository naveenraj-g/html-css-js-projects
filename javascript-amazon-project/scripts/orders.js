import { cart } from "../data/cart.js";
import { products, getProduct } from "../data/products.js";

export function orderProduct() {
    let orderHTML = "";
    cart.forEach((cartItem) => {
        const { productId } = cartItem;
        const matchingProduct = getProduct(productId);
        console.log(matchingProduct);
    });
}