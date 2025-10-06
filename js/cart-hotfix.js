// Cart Hotfix - Manually add cart buttons if they're missing
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addCartButtonsManually();
    }, 2000);
});

function addCartButtonsManually() {
    const productCards = document.querySelectorAll('.export-product-card');
    
    productCards.forEach(card => {
        // Check if cart button already exists
        if (card.querySelector('.add-to-cart-btn')) {
            return;
        }
        
        // Find product info
        const productName = card.querySelector('h3')?.textContent;
        const priceElement = card.querySelector('.price');
        const moqElement = card.querySelector('.moq-badge');
        
        if (!productName || !priceElement) return;
        
        // Extract product ID from image click or create one
        const img = card.querySelector('img');
        const productId = img?.onclick?.toString().match(/'([^']+)'/)?.[1] || `product-${Math.random().toString(36).substr(2, 9)}`;
        
        // Create cart button section
        const cartSection = document.createElement('div');
        cartSection.className = 'cart-actions';
        cartSection.style.marginTop = '1rem';
        cartSection.innerHTML = `
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
                <label style="font-size: 0.875rem; color: #64748b; font-weight: 600;">Quantity:</label>
                <input type="number" 
                       value="1" 
                       min="1" 
                       style="width: 80px; padding: 0.5rem; border: 2px solid #e2e8f0; border-radius: 0.375rem; font-size: 0.875rem;">
            </div>
            <button class="add-to-cart-btn btn-primary" 
                    style="width: 100%; padding: 0.75rem; font-weight: 600;"
                    onclick="hotfixAddToCart(this, '${productId}')">
                🛒 Add to Cart
            </button>
        `;
        
        // Add to product card
        const priceSection = card.querySelector('.product-price');
        if (priceSection) {
            priceSection.appendChild(cartSection);
        }
    });
}

function hotfixAddToCart(button, productId) {
    const card = button.closest('.export-product-card');
    const productName = card.querySelector('h3')?.textContent;
    const priceText = card.querySelector('.price')?.textContent;
    const quantityInput = button.parentElement.querySelector('input[type="number"]');
    const quantity = parseInt(quantityInput.value) || 1;
    
    const price = parseFloat(priceText?.replace('R', '').split('/')[0]) || 100;
    
    // Add to cart
    const cart = JSON.parse(localStorage.getItem('simple_cart')) || [];
    cart.push({
        id: productId,
        name: productName,
        price: price,
        unit: 'unit',
        quantity: quantity
    });
    
    localStorage.setItem('simple_cart', JSON.stringify(cart));
    
    // Show notification
    alert(`Added ${quantity} units of ${productName} to cart!`);
    
    // Update cart display
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = 'inline-block';
    }
}

// Add the hotfix script to products page
const hotfixScript = document.createElement('script');
hotfixScript.textContent = `
    setTimeout(() => {
        if (typeof addCartButtonsManually === 'function') {
            addCartButtonsManually();
        }
    }, 3000);
`;
document.head.appendChild(hotfixScript);
