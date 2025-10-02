// Enhanced cart functionality for professional e-commerce
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function addToCart(productId, productName, productPrice, productImage, quantity = 1) {
    // Remove $ and convert to number for calculations
    const priceValue = parseFloat(productPrice.replace('$', ''));
    
    const existingItem = cart.find(item => item.id === productId && item.userId === (currentUser?.id || 'guest'));
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            priceValue: priceValue,
            image: productImage,
            quantity: quantity,
            userId: currentUser?.id || 'guest',
            addedAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showAddedToCartMessage(productName);
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const userCart = cart.filter(item => item.userId === (currentUser?.id || 'guest'));
    const totalItems = userCart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

function showAddedToCartMessage(productName) {
    // Create professional notification
    let notification = document.getElementById('cartNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cartNotification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2c5aa0;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            transform: translateX(150%);
            transition: transform 0.4s ease;
            font-weight: 500;
            max-width: 300px;
        `;
        document.body.appendChild(notification);
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2em;">✅</span>
            <div>
                <strong>Added to Cart!</strong><br>
                <small>${productName}</small>
            </div>
        </div>
    `;
    notification.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
    }, 3000);
}

function getCartItems() {
    return cart.filter(item => item.userId === (currentUser?.id || 'guest'));
}

function getCartTotal() {
    const userCart = getCartItems();
    return userCart.reduce((total, item) => total + (item.priceValue * item.quantity), 0);
}

function clearCart() {
    cart = cart.filter(item => item.userId !== (currentUser?.id || 'guest'));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function removeFromCart(productId) {
    cart = cart.filter(item => !(item.id === productId && item.userId === (currentUser?.id || 'guest')));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId && item.userId === (currentUser?.id || 'guest'));
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    }
}

// User management functions
function registerUser(email, password, name) {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return { success: false, message: 'Email already registered' };
    }
    
    const newUser = {
        id: Date.now().toString(),
        email: email,
        password: password, // In real app, hash this!
        name: name,
        joined: new Date().toISOString(),
        orders: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, user: newUser };
}

function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user: user };
    }
    return { success: false, message: 'Invalid email or password' };
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
}

function getCurrentUser() {
    return currentUser;
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Update user display if logged in
    const accountBtn = document.querySelector('.account-btn');
    if (accountBtn && currentUser) {
        accountBtn.textContent = `👤 ${currentUser.name}`;
    }
});
