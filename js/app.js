// Sample product data with Unsplash images
const featuredProducts = [
    {
        id: 1,
        name: "Epic Texture Pack",
        price: "$4.99",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop&crop=center",
        description: "High-quality HD textures for amazing visuals"
    },
    {
        id: 2,
        name: "Adventure Map",
        price: "$7.99",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center",
        description: "Epic custom adventure with puzzles"
    },
    {
        id: 3,
        name: "Skin Pack",
        price: "$2.99",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop&crop=center",
        description: "20+ unique character skins"
    },
    {
        id: 4,
        name: "Mod Collection",
        price: "$9.99",
        image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&h=300&fit=crop&crop=center",
        description: "Game-enhancing mods and features"
    },
    {
        id: 5,
        name: "Resource Pack", 
        price: "$3.99",
        image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&h=300&fit=crop&crop=center",
        description: "Visual enhancements and textures"
    },
    {
        id: 6,
        name: "Mini-Games Pack",
        price: "$5.99",
        image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=300&fit=crop&crop=center",
        description: "Fun mini-game collection"
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
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <h3>${product.name}</h3>
            <div class="price">${product.price}</div>
            <p class="product-description">${product.description}</p>
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
        // Show visual feedback
        const button = event.target;
        const originalText = button.textContent;
        
        button.textContent = 'Added! ✓';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
        
        console.log(`Added to cart: ${product.name}`);
    }
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.log('Image failed to load:', e.target.src);
            e.target.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center';
        }
    }, true);
});
