// Simple cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, productPrice, productImage) {
    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(productName + ' added to cart!');
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'inline' : 'none';
    }
}

function showCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('You have ' + cart.length + ' item(s) in your cart!');
    }
}

// Initialize cart count when page loads
document.addEventListener('DOMContentLoaded', updateCartCount);
