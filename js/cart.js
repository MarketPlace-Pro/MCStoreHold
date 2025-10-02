// Simple cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, productPrice, productImage) {
    // Simple cart add function
    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + ' added to cart!');
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'inline' : 'none';
    }
}

// Initialize cart count when page loads
document.addEventListener('DOMContentLoaded', updateCartCount);
