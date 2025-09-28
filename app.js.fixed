// Marketplace Pro - Fixed Version
console.log("🔄 app.js loaded");

let currentProducts = [];
const productsContainer = document.getElementById('productsContainer');

// Show loading message immediately
if (productsContainer) {
    productsContainer.innerHTML = '<div style="padding:20px;text-align:center;">🔄 Loading products...</div>';
}

async function loadProducts() {
    console.log("📦 Loading products...");
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        console.log("✅ Loaded", data.products.length, "products");
        return data.products;
    } catch (error) {
        console.error("❌ Error:", error);
        return [];
    }
}

function renderProducts(products) {
    console.log("🎨 Rendering", products.length, "products");
    
    if (!productsContainer) {
        console.error("❌ productsContainer not found!");
        return;
    }
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p>No products found</p>';
        return;
    }
    
    // Simple product display that WILL work
    productsContainer.innerHTML = products.map(product => `
        <div style="border:2px solid #4CAF50;border-radius:10px;padding:15px;margin:10px;background:white;">
            <h3 style="color:#333;margin:0 0 10px 0;">${product.name}</h3>
            <p style="font-size:20px;color:#4CAF50;margin:0 0 10px 0;"><strong>$${product.price}</strong></p>
            <p style="color:#666;margin:0 0 15px 0;">${product.description}</p>
            <button style="background:#4CAF50;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;">
                Add to Cart
            </button>
        </div>
    `).join('');
    
    console.log("🎉 Products displayed successfully!");
}

async function init() {
    console.log("🚀 Initializing...");
    
    // Load and render products
    const products = await loadProducts();
    renderProducts(products);
    
    console.log("✅ Initialization complete");
}

// Start when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
