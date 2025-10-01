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
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('MCStoreHold initialized');
    loadProducts();
});

// Load products into the grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const loading = document.getElementById('loading');
    
    if (!productsGrid) {
        console.error('Products grid not found!');
        return;
    }
    
    // Remove loading message
    if (loading) {
        loading.style.display = 'none';
    }
    
    // Create product cards
    const productsHTML = featuredProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <div class="price">${product.price}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
    
    productsGrid.innerHTML = productsHTML;
    console.log('Products loaded successfully');
}

// Simple cart function
function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        alert(`Added ${product.name} to cart!`);
        console.log(`Added to cart: ${product.name}`);
    }
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.log('Image failed to load:', e.target.src);
            e.target.src = 'https://via.placeholder.com/200x200/cccccc/666666?text=Image+Not+Found';
        }
    }, true);
});
