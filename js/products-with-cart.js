// Enhanced products page with simple cart integration
document.addEventListener('DOMContentLoaded', function() {
    // Wait for products to load
    setTimeout(() => {
        if (typeof exportProducts !== 'undefined') {
            enhanceProductCards();
        }
    }, 1000);
});

function enhanceProductCards() {
    const productCards = document.querySelectorAll('.export-product-card');
    
    productCards.forEach(card => {
        // Find the product ID from the link
        const productLink = card.querySelector('a[href*="id="]');
        if (productLink) {
            const productId = new URL(productLink.href).searchParams.get('id');
            
            // Add quick add to cart button
            const priceSection = card.querySelector('.product-price');
            if (priceSection && !priceSection.querySelector('.add-to-cart')) {
                const addButton = document.createElement('button');
                addButton.className = 'add-to-cart btn-primary';
                addButton.dataset.productId = productId;
                addButton.textContent = 'Add to Cart';
                addButton.style.marginTop = '0.5rem';
                addButton.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    quickAddToCart(productId);
                };
                
                priceSection.appendChild(addButton);
            }
        }
    });
}

// Make quickAddToCart available globally
window.quickAddToCart = function(productId) {
    if (window.simpleCart && window.exportProducts) {
        const product = window.exportProducts.find(p => p.id === productId);
        if (product) {
            window.simpleCart.addToCart(product, product.minOrder);
        }
    }
};
