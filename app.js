// Marketplace Pro Main Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Marketplace Pro E-commerce Started');
    
    // Load products
    fetch('products/products.json')
        .then(response => response.json())
        .then(data => displayProducts(data.products))
        .catch(error => console.error('Error loading products:', error));
});

function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                Add to Cart
            </button>
            <a href="products/product${product.id}.html">View Details</a>
        </div>
    `).join('');
}

function addToCart(id, name, price) {
    // Use your existing cart manager
    if (typeof CartManager !== 'undefined') {
        CartManager.addToCart({ id, name, price });
    } else {
        alert(`Added ${name} to cart!`);
    }
}
