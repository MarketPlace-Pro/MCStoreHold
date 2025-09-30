// Main application logic
class MarketplaceApp {
    constructor() {
        this.init();
    }

    async init() {
        try {
            // Load products and display them
            const products = await productLoader.loadProducts();
            this.displayProducts(products);
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load products. Please refresh the page.');
        }
    }

    displayProducts(products) {
        const productsGrid = document.getElementById('productsGrid');
        
        if (!productsGrid) {
            console.error('Products grid element not found');
            return;
        }

        if (!products || products.length === 0) {
            productsGrid.innerHTML = '<div class="no-products">No products available</div>';
            return;
        }

        // Display first 6 products as featured
        const featuredProducts = products.slice(0, 6);
        
        productsGrid.innerHTML = featuredProducts.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image || 'images/placeholder.jpg'}" alt="${product.name}" 
                         onerror="this.src='images/placeholder.jpg'">
                    ${!product.inStock ? '<span class="out-of-stock">Out of Stock</span>' : ''}
                </div>
                <div class="product-info">
                    <h4 class="product-title">${product.name}</h4>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price}</div>
                    <button class="add-to-cart-btn" 
                            ${!product.inStock ? 'disabled' : ''}
                            onclick="marketplaceApp.addToCart(${product.id})">
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    async addToCart(productId) {
        try {
            const product = await productLoader.getProductById(productId);
            // For now, just show an alert - we'll implement cart functionality later
            alert(`Added ${product.name} to cart!`);
        } catch (error) {
            console.error('Failed to add to cart:', error);
            alert('Failed to add product to cart. Please try again.');
        }
    }

    showError(message) {
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.innerHTML = `<div class="error-message">${message}</div>`;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.marketplaceApp = new MarketplaceApp();
});

// Mobile optimization for product display
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    const productGrid = document.getElementById('productsGrid');
    
    if (isMobile && productGrid) {
        // Add mobile-specific class
        productGrid.classList.add('mobile-view');
        
        // Optimize images for mobile
        const productImages = productGrid.querySelectorAll('img');
        productImages.forEach(img => {
            img.loading = 'lazy';
            img.setAttribute('data-src', img.src);
        });
    }
}

// Run on load and resize
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);

// Add touch improvements for mobile
document.addEventListener('DOMContentLoaded', function() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});
