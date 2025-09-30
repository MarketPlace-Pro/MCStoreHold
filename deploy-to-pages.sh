#!/bin/bash
echo "🚀 Deploying to GitHub Pages..."

# Copy current changes to pages-deploy
cp index.html pages-deploy/
cp css/styles.css pages-deploy/
cp products/products.json pages-deploy/

# Update with simplified JavaScript for static hosting
cat > pages-deploy/app.js << 'JSEOF'
// Simplified Marketplace Pro for GitHub Pages
const cart = JSON.parse(localStorage.getItem('marketplace-cart')) || [];

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('marketplace-cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.length;
    const badge = document.querySelector('.cart-badge');
    if (badge) badge.textContent = count;
}

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    fetch('./products.json')
        .then(r => r.json())
        .then(data => {
            if (typeof displayProducts === 'function') {
                displayProducts(data.products);
            }
        });
    
    updateCartCount();
});
JSEOF

echo "✅ Ready for deployment! Run:"
echo "cd pages-deploy && git add . && git commit -m 'deploy: update' && git push pages main"
