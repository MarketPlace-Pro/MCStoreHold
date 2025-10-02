// Shopping cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateCartSummary();
});

function loadCartItems() {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cartItems.length === 0) {
        cartContainer.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartContainer.style.display = 'block';
    
    const cartHTML = cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            
            <div class="item-details">
                <h3><a href="product.html?id=${item.id}">${item.name}</a></h3>
                <p class="item-price">${item.price}</p>
                <p class="item-stock" style="color: green;">In Stock</p>
            </div>
            
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            
            <div class="item-total">
                $${(item.priceValue * item.quantity).toFixed(2)}
            </div>
            
            <div class="item-actions">
                <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
                    🗑️
                </button>
                <button class="wishlist-btn" onclick="moveToWishlist(${item.id})" title="Move to wishlist">
                    ❤️
                </button>
            </div>
        </div>
    `).join('');
    
    cartContainer.innerHTML = cartHTML;
}

function updateQuantity(productId, newQuantity) {
    updateCartQuantity(productId, newQuantity);
    loadCartItems();
    updateCartSummary();
}

function removeFromCart(productId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        cart = cart.filter(item => !(item.id === productId && item.userId === (getCurrentUser()?.id || 'guest')));
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartSummary();
        updateCartCount();
    }
}

function moveToWishlist(productId) {
    alert('Item moved to wishlist!');
    removeFromCart(productId);
}

function updateCartSummary() {
    const cartItems = getCartItems();
    const subtotal = getCartTotal();
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    // Enable/disable checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = cartItems.length === 0;
}

function proceedToCheckout() {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
        if (confirm('You need to log in to proceed with checkout. Would you like to log in now?')) {
            window.location.href = 'login.html?redirect=checkout';
        }
        return;
    }
    
    window.location.href = 'checkout.html';
}

// Add this function to cart.js to make it available
function getCartTotal() {
    const userCart = getCartItems();
    return userCart.reduce((total, item) => total + (item.priceValue * item.quantity), 0);
}
