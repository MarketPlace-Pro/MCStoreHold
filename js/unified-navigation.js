// Unified Navigation System
class UnifiedNavigation {
    constructor() {
        this.pages = {
            'home': 'export-index.html',
            'products': 'export-products.html', 
            'suppliers': 'supplier-portal.html',
            'buyers': 'buyer-dashboard.html',
            'ai-ceo': 'ai-ceo-dashboard.html',
            'cart': 'buyer-dashboard.html#cart' // Link to cart section
        };
        this.init();
    }

    init() {
        this.updateAllNavigation();
        this.setupCartIndicator();
    }

    // Update navigation across all pages
    updateAllNavigation() {
        const navs = document.querySelectorAll('.main-nav');
        navs.forEach(nav => {
            if (nav) {
                nav.innerHTML = this.generateNavigation();
            }
        });
    }

    generateNavigation() {
        const currentPage = this.getCurrentPage();
        
        return `
            <a href="${this.pages.home}" class="nav-link ${currentPage === 'home' ? 'active' : ''}">🏠 Home</a>
            <a href="${this.pages.products}" class="nav-link ${currentPage === 'products' ? 'active' : ''}">📦 Products</a>
            <a href="${this.pages.suppliers}" class="nav-link ${currentPage === 'suppliers' ? 'active' : ''}">🏭 For Suppliers</a>
            <a href="${this.pages.buyers}" class="nav-link ${currentPage === 'buyers' ? 'active' : ''}">🛒 For Buyers</a>
            <a href="${this.pages['ai-ceo']}" class="nav-link ${currentPage === 'ai-ceo' ? 'active' : ''}">🤖 AI CEO</a>
        `;
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('export-index')) return 'home';
        if (path.includes('export-products')) return 'products';
        if (path.includes('supplier-portal')) return 'suppliers';
        if (path.includes('buyer-dashboard')) return 'buyers';
        if (path.includes('ai-ceo-dashboard')) return 'ai-ceo';
        return 'home';
    }

    setupCartIndicator() {
        // Update cart count in header
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('buyer_cart')) || [];
            const cartElements = document.querySelectorAll('#cartCount, .cart-count');
            cartElements.forEach(element => {
                element.textContent = cart.length;
                element.style.display = cart.length > 0 ? 'inline' : 'none';
            });
        };

        // Initial update
        updateCartCount();
        
        // Update when cart changes (simple polling)
        setInterval(updateCartCount, 1000);
    }
}

// Initialize unified navigation
document.addEventListener('DOMContentLoaded', function() {
    window.unifiedNav = new UnifiedNavigation();
});
