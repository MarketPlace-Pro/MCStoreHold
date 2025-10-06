// Buyer Order Management System
class BuyerSystem {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('buyer_cart')) || [];
        this.orders = JSON.parse(localStorage.getItem('buyer_orders')) || [];
        this.currentBuyer = JSON.parse(localStorage.getItem('current_buyer')) || this.createDemoBuyer();
        this.init();
    }

    init() {
        console.log('🚀 Buyer System Initialized');
        this.updateCartDisplay();
        this.loadOrderHistory();
        this.updateBuyerStats();
        this.populateProductSelect();
    }

    createDemoBuyer() {
        const demoBuyer = {
            id: 'buyer-' + Date.now(),
            company: 'International Import Co.',
            email: 'buyer@import.com',
            country: 'Germany',
            joinDate: new Date().toISOString()
        };
        localStorage.setItem('current_buyer', JSON.stringify(demoBuyer));
        return demoBuyer;
    }

    // Cart Management
    addToCart(product, quantity = 1) {
        // Check if product meets MOQ
        if (quantity < product.minOrder) {
            alert(`Minimum order quantity is ${product.minOrder} ${product.unit}s`);
            return false;
        }

        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        return true;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item && newQuantity >= item.minOrder) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartDisplay();
        } else if (newQuantity < item.minOrder) {
            alert(`Minimum order quantity is ${item.minOrder} ${item.unit}s`);
        }
    }

    // Order Management
    createOrder(orderData) {
        const order = {
            id: 'ORD-' + Date.now(),
            ...orderData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            estimatedDelivery: this.calculateDeliveryDate()
        };

        this.orders.push(order);
        this.saveOrders();
        
        // Clear cart after successful order
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        
        return order;
    }

    calculateDeliveryDate() {
        const date = new Date();
        date.setDate(date.getDate() + 21); // 3 weeks for international shipping
        return date.toISOString();
    }

    // UI Updates
    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (cartCount) {
            cartCount.textContent = this.cart.length;
        }

        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = '<p>Your cart is empty</p>';
            } else {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item">
                        <div>
                            <h4>${item.name}</h4>
                            <p>Supplier: ${item.supplier} | R${item.price}/${item.unit}</p>
                        </div>
                        <div class="quantity-controls">
                            <button onclick="buyerSystem.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                            <span>${item.quantity} ${item.unit}s</span>
                            <button onclick="buyerSystem.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                            <button onclick="buyerSystem.removeFromCart('${item.id}')" class="btn-danger">Remove</button>
                        </div>
                        <div>
                            <strong>R${(item.price * item.quantity).toLocaleString()}</strong>
                        </div>
                    </div>
                `).join('');
            }
        }

        if (cartTotal) {
            cartTotal.textContent = 'R' + this.getCartTotal().toLocaleString();
        }
    }

    loadOrderHistory() {
        const orderHistory = document.getElementById('orderHistory');
        if (!orderHistory) return;

        if (this.orders.length === 0) {
            orderHistory.innerHTML = '<p>No orders yet.</p>';
            return;
        }

        orderHistory.innerHTML = this.orders.map(order => `
            <div class="action-card" style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h4>Order #${order.id}</h4>
                        <p>Status: <span style="color: ${order.status === 'completed' ? 'green' : 'orange'}">${order.status}</span></p>
                        <p>Total: R${order.total} | Items: ${order.items.length}</p>
                        <p>Order Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <button onclick="viewOrderDetails('${order.id}')" class="btn-secondary">View Details</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateBuyerStats() {
        document.getElementById('totalOrders').textContent = this.orders.length;
        document.getElementById('pendingOrders').textContent = this.orders.filter(o => o.status === 'pending').length;
        document.getElementById('totalSpent').textContent = 'R' + this.orders.reduce((sum, order) => sum + order.total, 0);
        document.getElementById('savedProducts').textContent = '0'; // Could implement favorites
    }

    populateProductSelect() {
        const select = document.getElementById('quickProductSelect');
        if (!select || !window.exportProducts) return;

        // Clear existing options except the first one
        while (select.options.length > 1) {
            select.remove(1);
        }

        // Add products from your database
        window.exportProducts.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.name} (R${product.price}/${product.unit})`;
            option.dataset.product = JSON.stringify(product);
            select.appendChild(option);
        });

        // Add change listener to update price
        select.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.dataset.product) {
                const product = JSON.parse(selectedOption.dataset.product);
                document.getElementById('quickPrice').textContent = `R${product.price}/${product.unit}`;
            }
        });
    }

    // Calculations
    getCartTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getCartSummary() {
        return {
            items: this.cart.length,
            total: this.getCartTotal(),
            products: this.cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            }))
        };
    }

    // Save/Load data
    saveCart() {
        localStorage.setItem('buyer_cart', JSON.stringify(this.cart));
    }

    saveOrders() {
        localStorage.setItem('buyer_orders', JSON.stringify(this.orders));
    }
}

// Global buyer system instance
window.buyerSystem = new BuyerSystem();

// UI Functions
function addQuickToCart() {
    const select = document.getElementById('quickProductSelect');
    const quantity = parseInt(document.getElementById('quickQuantity').value);
    const selectedOption = select.options[select.selectedIndex];
    
    if (!selectedOption.dataset.product) {
        alert('Please select a product');
        return;
    }

    const product = JSON.parse(selectedOption.dataset.product);
    const success = buyerSystem.addToCart(product, quantity);
    
    if (success) {
        alert(`Added ${quantity} ${product.unit}s of ${product.name} to cart!`);
    }
}

function openCheckout() {
    if (buyerSystem.cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const modal = document.getElementById('checkoutModal');
    const summary = document.getElementById('checkoutSummary');
    const cartSummary = buyerSystem.getCartSummary();

    summary.innerHTML = `
        <h4>Order Summary</h4>
        ${cartSummary.products.map(item => `
            <p>${item.quantity}x ${item.name} - R${item.subtotal}</p>
        `).join('')}
        <hr>
        <h4>Total: R${cartSummary.total}</h4>
        <p>Shipping: To be calculated</p>
        <p>Estimated delivery: 3-4 weeks</p>
    `;

    modal.style.display = 'block';
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function processOrder() {
    const cartSummary = buyerSystem.getCartSummary();
    
    const order = buyerSystem.createOrder({
        items: buyerSystem.cart,
        total: cartSummary.total,
        buyer: buyerSystem.currentBuyer,
        shippingAddress: 'To be provided',
        paymentMethod: 'Bank Transfer'
    });

    closeCheckout();
    alert(`Order #${order.id} placed successfully! Total: R${order.total}`);
    
    // Refresh order history
    buyerSystem.loadOrderHistory();
    buyerSystem.updateBuyerStats();
}

function viewOrderDetails(orderId) {
    const order = buyerSystem.orders.find(o => o.id === orderId);
    if (order) {
        alert(`Order Details:\nID: ${order.id}\nStatus: ${order.status}\nTotal: R${order.total}\nItems: ${order.items.length}`);
    }
}

// Load product data for the buyer system
document.addEventListener('DOMContentLoaded', function() {
    // Ensure product data is available
    if (typeof exportProducts === 'undefined') {
        console.log('Loading product data for buyer system...');
        // You might need to load the product data here
    }
});
