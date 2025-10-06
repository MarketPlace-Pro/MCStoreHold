// Enhanced Buyer Cart System
class EnhancedBuyerCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('simple_cart')) || [];
        this.init();
    }

    init() {
        console.log('🛒 Enhanced Buyer Cart Initialized');
        this.renderCartItems();
        this.updateCartSummary();
        this.setupEventListeners();
    }

    // Render cart items
    renderCartItems() {
        const container = document.getElementById('cartItems');
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #64748b;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Browse our products and add items to get started.</p>
                    <a href="export-products.html" class="btn-primary" style="margin-top: 1rem;">Browse Products</a>
                </div>
            `;
            return;
        }

        container.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div style="display: flex; gap: 1rem; align-items: flex-start;">
                    <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 0.5rem;">
                    <div style="flex: 1;">
                        <h4 style="margin-bottom: 0.5rem; color: #1e293b;">${item.name}</h4>
                        <p style="color: #64748b; margin-bottom: 0.5rem;">Supplier: ${item.supplier}</p>
                        <p style="color: #64748b; margin-bottom: 0.5rem;">Unit: ${item.unit}</p>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div class="quantity-controls">
                                <button onclick="enhancedCart.updateQuantity('${item.id}', ${item.quantity - 1})" 
                                        class="quantity-btn" ${item.quantity <= item.minOrder ? 'disabled' : ''}>
                                    −
                                </button>
                                <span class="quantity-display">${item.quantity} ${item.unit}s</span>
                                <button onclick="enhancedCart.updateQuantity('${item.id}', ${item.quantity + 1})" 
                                        class="quantity-btn">
                                    +
                                </button>
                            </div>
                            <div style="font-weight: 600; color: #1e293b;">
                                R${item.price}/${item.unit}
                            </div>
                        </div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.25rem; font-weight: 700; color: #6366f1; margin-bottom: 0.5rem;">
                        R${(item.price * item.quantity).toLocaleString()}
                    </div>
                    <button onclick="enhancedCart.removeItem('${item.id}')" 
                            class="btn-danger" 
                            style="padding: 0.5rem 1rem;">
                        Remove
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Update quantity
    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        if (newQuantity < item.minOrder) {
            this.showNotification(`Minimum order quantity is ${item.minOrder} ${item.unit}s`, 'warning');
            return;
        }

        item.quantity = newQuantity;
        this.saveCart();
        this.renderCartItems();
        this.updateCartSummary();
        this.showNotification(`Updated ${item.name} quantity to ${newQuantity}`, 'success');
    }

    // Remove item from cart
    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCartItems();
        this.updateCartSummary();
        this.showNotification('Item removed from cart', 'info');
    }

    // Update cart summary
    updateCartSummary() {
        const totalElement = document.getElementById('cartTotal');
        const itemsCountElement = document.getElementById('cartItemsCount');
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemsCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);

        if (totalElement) {
            totalElement.textContent = `R${total.toLocaleString()}`;
        }

        if (itemsCountElement) {
            itemsCountElement.textContent = `${itemsCount} items`;
        }

        // Update header cart count
        const headerCartCount = document.getElementById('cartCount');
        if (headerCartCount) {
            headerCartCount.textContent = this.cart.length;
            headerCartCount.style.display = this.cart.length > 0 ? 'inline-block' : 'none';
        }
    }

    // Clear cart
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.renderCartItems();
        this.updateCartSummary();
        this.showNotification('Cart cleared', 'info');
    }

    // Proceed to checkout
    proceedToCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty', 'warning');
            return;
        }

        this.showCheckoutModal();
    }

    // Show checkout modal
    showCheckoutModal() {
        const modal = document.getElementById('checkoutModal');
        const summary = document.getElementById('checkoutSummary');
        
        if (!modal || !summary) {
            this.createCheckoutModal();
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemsCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);

        summary.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 1rem;">Order Summary</h4>
                ${this.cart.map(item => `
                    <div style="display: flex; justify-content: between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                        <div>
                            <div style="font-weight: 600;">${item.name}</div>
                            <div style="color: #64748b; font-size: 0.875rem;">${item.quantity} ${item.unit}s × R${item.price}</div>
                        </div>
                        <div style="font-weight: 600;">R${(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                `).join('')}
            </div>
            <div style="border-top: 2px solid #e2e8f0; padding-top: 1rem;">
                <div style="display: flex; justify-content: between; font-size: 1.125rem; font-weight: 700;">
                    <span>Total:</span>
                    <span>R${total.toLocaleString()}</span>
                </div>
                <p style="color: #64748b; margin-top: 0.5rem;">${itemsCount} items in total</p>
            </div>
        `;

        modal.style.display = 'block';
    }

    // Create checkout modal if it doesn't exist
    createCheckoutModal() {
        const modalHTML = `
            <div id="checkoutModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; backdrop-filter: blur(5px);">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1.5rem;">
                        <h3 style="margin: 0;">Checkout</h3>
                        <button onclick="enhancedCart.closeCheckout()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #64748b;">×</button>
                    </div>
                    <div id="checkoutSummary"></div>
                    <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                        <button onclick="enhancedCart.placeOrder()" class="btn-primary" style="flex: 1;">Place Order</button>
                        <button onclick="enhancedCart.closeCheckout()" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.showCheckoutModal();
    }

    // Close checkout modal
    closeCheckout() {
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Place order
    placeOrder() {
        const order = {
            id: 'ORD-' + Date.now(),
            items: [...this.cart],
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            date: new Date().toISOString(),
            status: 'pending'
        };

        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('buyer_orders')) || [];
        orders.push(order);
        localStorage.setItem('buyer_orders', JSON.stringify(orders));

        // Clear cart
        this.clearCart();
        this.closeCheckout();
        
        this.showNotification(`Order #${order.id} placed successfully! Total: R${order.total}`, 'success');
        
        // Refresh order history
        this.loadOrderHistory();
    }

    // Load order history
    loadOrderHistory() {
        const container = document.getElementById('orderHistory');
        if (!container) return;

        const orders = JSON.parse(localStorage.getItem('buyer_orders')) || [];
        
        if (orders.length === 0) {
            container.innerHTML = '<p style="color: #64748b; text-align: center; padding: 2rem;">No orders yet.</p>';
            return;
        }

        container.innerHTML = orders.map(order => `
            <div class="order-item" style="background: white; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); margin-bottom: 1rem;">
                <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem;">
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0;">Order #${order.id}</h4>
                        <p style="color: #64748b; margin: 0;">Date: ${new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.25rem; font-weight: 700; color: #6366f1;">R${order.total}</div>
                        <span style="background: #f59e0b; color: white; padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 600;">
                            ${order.status}
                        </span>
                    </div>
                </div>
                <div style="color: #64748b;">
                    ${order.items.length} items • ${order.items.reduce((sum, item) => sum + item.quantity, 0)} total units
                </div>
            </div>
        `).join('');
    }

    // Setup event listeners
    setupEventListeners() {
        // Check if checkout button exists and add listener
        const checkoutBtn = document.querySelector('button[onclick*="openCheckout"], button[onclick*="proceedToCheckout"]');
        if (checkoutBtn) {
            checkoutBtn.onclick = () => this.proceedToCheckout();
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : type === 'error' ? '#ef4444' : '#6366f1';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 1000;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('simple_cart', JSON.stringify(this.cart));
    }
}

// Initialize enhanced cart
document.addEventListener('DOMContentLoaded', function() {
    window.enhancedCart = new EnhancedBuyerCart();
    window.enhancedCart.loadOrderHistory();
});
