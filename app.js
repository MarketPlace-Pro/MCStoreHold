// Consolidated Marketplace Pro App
console.log("Marketplace Pro E-commerce Loaded");

// Simple cart functionality for GitHub Pages
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, price) {
    cart.push({ id: productId, name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
}

function getCartCount() {
    return cart.length;
}
