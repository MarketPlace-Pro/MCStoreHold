// Sample product data
const featuredProducts = [
    {
        id: 1,
        name: "Epic Texture Pack",
        price: "$4.99",
        image: "https://via.placeholder.com/200x200/2c5aa0/ffffff?text=Texture+Pack",
        description: "High-quality HD textures"
    },
    {
        id: 2,
        name: "Adventure Map",
        price: "$7.99", 
        image: "https://via.placeholder.com/200x200/27ae60/ffffff?text=Adventure+Map",
        description: "Epic custom adventure"
    },
    {
        id: 3,
        name: "Skin Pack",
        price: "$2.99",
        image: "https://via.placeholder.com/200x200/e74c3c/ffffff?text=Skin+Pack", 
        description: "20+ character skins"
    },
    {
        id: 4,
        name: "Mod Collection",
        price: "$9.99",
        image: "https://via.placeholder.com/200x200/f39c12/ffffff?text=Mod+Pack",
        description: "Game-enhancing mods"
    },
    {
        id: 5,
        name: "Resource Pack", 
        price: "$3.99",
        image: "https://via.placeholder.com/200x200/9b59b6/ffffff?text=Resource+Pack",
        description: "Visual enhancements"
    },
    {
        id: 6,
        name: "Mini-Games",
        price: "$5.99",
        image: "https://via.placeholder.com/200x200/34495e/ffffff?text=Mini+Games",
        description: "Fun mini-game collection"
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('MCStoreHold initialized');
    loadProducts();
    setupMobileOptimization();
});

// Load products into the grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const loading = document.getElementById('loading');
    
    if (!productsGrid) {
        console.error('Products grid not found!');
        return;
    }
    
    // Simulate loading delay
    setTimeout(() => {
        if (loading) loading.classList.add('hidden');
        
        const productsHTML = featuredProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to cart">
                    Add to Cart
                </button>
            </div>
        `).join('');
        
        productsGrid.innerHTML = productsHTML;
        console.log(`Loaded ${featuredProducts.length} products`);
    }, 500);
}

// Simple cart function
function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        // Show simple notification
        const button = event.target;
        const originalText = button.textContent;
        
        button.textContent = 'Added!';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
        
        console.log(`Added to cart: ${product.name}`);
    }
}

// Mobile optimization
function setupMobileOptimization() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile');
        console.log('Mobile optimization active');
    }
    
    // Handle resize events
    window.addEventListener('resize', debounce(() => {
        console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
    }, 250));
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
