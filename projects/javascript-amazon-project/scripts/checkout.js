import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart.js";
import { placeOrder } from "../data/orderedProduct.js";

renderOrderSummary();
renderPaymentSummary();

const placeOrderBtn = document.querySelector(".js-place-order");
placeOrderBtn.addEventListener("click", () => {
    placeOrder(cart);
});