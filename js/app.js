// Sample product data
const featuredProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: "$79.99",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        category: "electronics"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: "$199.99",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        category: "electronics"
    },
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        category: "clothing"
    },
    {
        id: 4,
        name: "Stainless Steel Water Bottle",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop",
        category: "lifestyle"
    },
    {
        id: 5,
        name: "Professional Camera",
        price: "$899.99",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop",
        category: "electronics"
    },
    {
        id: 6,
        name: "Designer Backpack",
        price: "$59.99",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
        category: "accessories"
    }
];

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    setupSearch();
});

// Load featured products
function loadFeaturedProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) {
        console.error('Products grid element not found');
        return;
    }

    const productsHTML = featuredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', '${product.price}', '${product.image}')">
                Add to Cart
            </button>
        </div>
    `).join('');

    productsGrid.innerHTML = productsHTML;
    console.log('Products loaded successfully');
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}
