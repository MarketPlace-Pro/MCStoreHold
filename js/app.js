// Enhanced product data for professional e-commerce
const featuredProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: "$79.99",
        originalPrice: "$99.99",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        category: "electronics",
        rating: 4.5,
        reviews: 128,
        description: "High-quality wireless headphones with noise cancellation",
        features: ["Noise Cancellation", "30hr Battery", "Comfort Fit"],
        inStock: true
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: "$199.99",
        originalPrice: "$249.99",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        category: "electronics",
        rating: 4.3,
        reviews: 89,
        description: "Advanced fitness tracking with heart rate monitor",
        features: ["Heart Rate Monitor", "GPS", "Water Resistant"],
        inStock: true
    },
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        category: "clothing",
        rating: 4.7,
        reviews: 256,
        description: "Comfortable organic cotton t-shirt in various colors",
        features: ["100% Organic Cotton", "Machine Wash", "Multiple Colors"],
        inStock: true
    },
    {
        id: 4,
        name: "Stainless Steel Water Bottle",
        price: "$24.99",
        originalPrice: "$34.99",
        image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop",
        category: "lifestyle",
        rating: 4.4,
        reviews: 167,
        description: "Insulated stainless steel water bottle keeps drinks cold for 24hrs",
        features: ["24hr Cold Retention", "BPA Free", "Leak Proof"],
        inStock: true
    },
    {
        id: 5,
        name: "Professional Camera",
        price: "$899.99",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
        category: "electronics",
        rating: 4.8,
        reviews: 42,
        description: "Professional DSLR camera with 4K video capabilities",
        features: ["4K Video", "24MP Sensor", "WiFi Connectivity"],
        inStock: true
    },
    {
        id: 6,
        name: "Designer Backpack",
        price: "$59.99",
        originalPrice: "$79.99",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        category: "accessories",
        rating: 4.6,
        reviews: 93,
        description: "Durable designer backpack with laptop compartment",
        features: ["Laptop Compartment", "Water Resistant", "Multiple Pockets"],
        inStock: true
    },
    {
        id: 7,
        name: "Wireless Gaming Mouse",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        category: "electronics",
        rating: 4.2,
        reviews: 76,
        description: "Precision wireless gaming mouse with RGB lighting",
        features: ["RGB Lighting", "Programmable Buttons", "Long Battery"],
        inStock: true
    },
    {
        id: 8,
        name: "Yoga Mat Premium",
        price: "$34.99",
        originalPrice: "$44.99",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        category: "sports",
        rating: 4.5,
        reviews: 134,
        description: "Non-slip premium yoga mat for all types of exercise",
        features: ["Non-Slip", "Eco-Friendly", "Extra Thick"],
        inStock: true
    }
];

// All products data for categories and search
const allProducts = [
    ...featuredProducts,
    {
        id: 9,
        name: "LED Desk Lamp",
        price: "$39.99",
        category: "home",
        rating: 4.3,
        reviews: 87,
        inStock: true
    },
    {
        id: 10,
        name: "Running Shoes",
        price: "$89.99",
        category: "sports",
        rating: 4.6,
        reviews: 201,
        inStock: true
    }
];

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    setupSearch();
    displayCategories();
});

// Load featured products
function loadFeaturedProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) {
        console.error('Products grid element not found');
        return;
    }

    const productsHTML = featuredProducts.map(product => `
        <div class="product-card" data-category="${product.category}" data-id="${product.id}">
            ${product.originalPrice ? `<div class="sale-badge">Sale</div>` : ''}
            <img src="${product.image}" alt="${product.name}" onclick="viewProduct(${product.id})">
            <div class="product-info">
                <h3 onclick="viewProduct(${product.id})">${product.name}</h3>
                <div class="rating">
                    ${generateStarRating(product.rating)} 
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <div class="price-container">
                    ${product.originalPrice ? `
                        <span class="original-price">${product.originalPrice}</span>
                        <span class="price">${product.price}</span>
                    ` : `
                        <span class="price">${product.price}</span>
                    `}
                </div>
                <button class="add-to-cart-btn" 
                        onclick="addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', '${product.price}', '${product.image}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    productsGrid.innerHTML = productsHTML;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '⭐';
    if (halfStar) stars += '✨';
    for (let i = 0; i < emptyStars; i++) stars += '☆';
    
    return stars;
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterProducts(this.value);
        });
    }
}

function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    const term = searchTerm.toLowerCase();
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Product viewing function
function viewProduct(productId) {
    // Store product ID for product detail page
    localStorage.setItem('currentProductId', productId);
    window.location.href = 'product.html?id=' + productId;
}

// Display categories on homepage
function displayCategories() {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (!categoriesGrid) return;
    
    // Categories are already in HTML, this is for future dynamic loading
}

// Global search function
function globalSearch() {
    const searchTerm = document.getElementById('globalSearch').value;
    if (searchTerm.trim()) {
        localStorage.setItem('searchTerm', searchTerm);
        window.location.href = 'search.html?q=' + encodeURIComponent(searchTerm);
    }
}

// Get products by category
function getProductsByCategory(category) {
    return allProducts.filter(product => product.category === category);
}

// Get product by ID
function getProductById(id) {
    return allProducts.find(product => product.id === id);
}
