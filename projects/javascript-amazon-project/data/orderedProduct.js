export let orderProduct = [];

export function placeOrder(cart) {
    orderProduct = cart;
    console.log(orderProduct);
}