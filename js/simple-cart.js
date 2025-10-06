// Simple Cart System - Works across all pages
class SimpleCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('simple_cart')) || [];
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.setupGlobalListeners();
    }

    // Add product to cart (simplified version)
    addToCart(product, quantity = 1) {
        // Check MOQ
        if (quantity < product.minOrder) {
            alert(`Minimum order quantity is ${product.minOrder} ${product.unit}s`);
            return false;
        }

        const existing = this.cart.find(item => item.id === product.id);
        
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                unit: product.unit,
                minOrder: product.minOrder,
                supplier: product.supplier,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showCartNotification(`Added ${quantity} ${product.unit}s of ${product.name}`);
        return true;
    }

    // Quick add from product pages
    quickAddToCart(productId) {
        if (!window.exportProducts) {
            alert('Product data not loaded');
            return;
        }

        const product = window.exportProducts.find(p => p.id === productId);
        if (product) {
            this.addToCart(product, product.minOrder); // Add minimum quantity
        }
    }

    // Update cart display everywhere
    updateCartDisplay() {
        const cartCounters = document.querySelectorAll('.cart-count, #cartCount');
        cartCounters.forEach(counter => {
            counter.textContent = this.cart.length;
            counter.style.display = this.cart.length > 0 ? 'inline-block' : 'none';
        });

        // Update cart total if element exists
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            cartTotal.textContent = 'R' + this.getTotal().toLocaleString();
        }
    }

    // Get cart total
    getTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Show notification
    showCartNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    // Setup global event listeners
    setupGlobalListeners() {
        // Listen for add-to-cart events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                const productId = e.target.dataset.productId || e.target.closest('[data-product-id]')?.dataset.productId;
                if (productId) {
                    this.quickAddToCart(productId);
                }
            }
        });
    }

    // Save to localStorage
    saveCart() {
        localStorage.setItem('simple_cart', JSON.stringify(this.cart));
    }

    // Get cart summary for checkout
    getCartSummary() {
        return {
            items: this.cart.length,
            total: this.getTotal(),
            products: this.cart
        };
    }

    // Clear cart (after order)
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
    }
}

// Initialize simple cart
document.addEventListener('DOMContentLoaded', function() {
    window.simpleCart = new SimpleCart();
});

// Global function for quick add buttons
function quickAddToCart(productId) {
    if (window.simpleCart) {
        window.simpleCart.quickAddToCart(productId);
    }
}
