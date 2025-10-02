// Sample product data
const featuredProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: "$79.99",
        image: "images/headphones.jpg",
        category: "electronics"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: "$199.99",
        image: "images/smartwatch.jpg",
        category: "electronics"
    },
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        price: "$29.99",
        image: "images/tshirt.jpg",
        category: "clothing"
    },
    {
        id: 4,
        name: "Stainless Steel Water Bottle",
        price: "$24.99",
        image: "images/waterbottle.jpg",
        category: "lifestyle"
    },
    {
        id: 5,
        name: "Professional Camera",
        price: "$899.99",
        image: "images/camera.jpg",
        category: "electronics"
    },
    {
        id: 6,
        name: "Designer Backpack",
        price: "$59.99",
        image: "images/backpack.jpg",
        category: "accessories"
    }
];

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
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
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=Product+Image'">
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
