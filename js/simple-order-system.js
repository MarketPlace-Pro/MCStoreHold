// Simple B2B Order System
class SimpleOrderSystem {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('b2b_cart')) || [];
        this.init();
    }

    init() {
        this.updateCartDisplay();
    }

    addToCart(product, quantity) {
        const existing = this.cart.find(item => item.id === product.id);
        
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.updateCartDisplay();
    }

    calculateOrderTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.cart.length;
        }
    }

    saveCart() {
        localStorage.setItem('b2b_cart', JSON.stringify(this.cart));
    }
}

window.orderSystem = new SimpleOrderSystem();
