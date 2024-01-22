export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
    cart = [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
        }
    ];
}

function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, selectIndex) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += +selectIndex.value;
    } else {
        cart.push({
            productId: productId,
            quantity: +selectIndex.value,
            deliveryOptionId: "1",
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}

export function updateCheckoutQuantity() {
    const itemQuantity = cart.reduce((acc, item) => {
        return acc + item.quantity
    }, 0);
    document.querySelector(".js-checkout-quantity").textContent = `${itemQuantity} items`;
}

export function updateOrderItemsQuantity() {
    const itemQuantity = cart.reduce((acc, item) => {
        return acc + item.quantity
    }, 0);
    document.querySelector(".js-order-item-quantity").textContent = `Items (${itemQuantity})`;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}