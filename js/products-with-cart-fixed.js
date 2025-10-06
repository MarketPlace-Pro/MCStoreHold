// Enhanced products page with working cart functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProductsWithCart();
});

function initializeProductsWithCart() {
    // Wait for products to load
    const checkProductsLoaded = setInterval(() => {
        if (typeof exportProducts !== 'undefined' && exportProducts.length > 0) {
            clearInterval(checkProductsLoaded);
            enhanceProductCardsWithCart();
            setupCartListeners();
        }
    }, 500);
}

function enhanceProductCardsWithCart() {
    const grid = document.getElementById('exportProductsGrid');
    if (!grid) return;

    // Re-render products with cart buttons
    loadProducts(); // This will use our enhanced product card template
}

// Override the product card generation to include cart buttons
function loadProducts() {
    const grid = document.getElementById('exportProductsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!grid) return;
    
    // Filter products by category
    let filteredProducts = exportProducts;
    if (currentCategory !== 'all') {
        filteredProducts = exportProducts.filter(product => product.category === currentCategory);
    }
    
    // Sort products
    filteredProducts = sortProducts(filteredProducts, currentSort);
    
    // Display products (first displayedProducts count)
    const productsToShow = filteredProducts.slice(0, displayedProducts);
    
    if (productsToShow.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #f8f9fa; border-radius: 10px;">
                <h3>No products found</h3>
                <p>No products available in this category yet.</p>
                <button onclick="resetFilters()" class="btn-primary">Show All Products</button>
            </div>
        `;
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="export-product-card">
            <div class="moq-badge">MOQ: ${product.minOrder} ${product.unit}s</div>
            <img src="${product.image}" alt="${product.name}" onclick="viewProductDetails('${product.id}')">
            <div class="product-info">
                <h3><a href="export-product-details.html?id=${product.id}">${product.name}</a></h3>
                <p class="supplier">By ${product.supplier}</p>
                <p class="origin">📍 ${product.origin}</p>
                
                <div class="product-markets">
                    ${product.exportMarkets.map(market => `<span class="market-tag">${market}</span>`).join('')}
                </div>
                
                <div class="certification-badges">
                    ${product.certification.slice(0, 2).map(cert => `<span class="cert-badge">${cert}</span>`).join('')}
                    ${product.certification.length > 2 ? `<span class="cert-badge">+${product.certification.length - 2} more</span>` : ''}
                </div>
                
                <div class="export-details">
                    <div class="detail">
                        <strong>Lead Time:</strong> ${product.leadTime}
                    </div>
                    <div class="detail">
                        <strong>Shipping:</strong> ${product.shipping}
                    </div>
                </div>
                
                <div class="product-price">
                    <span class="price">R${product.price}/${product.unit}</span>
                    <span class="moq-total">Min: R${(product.price * product.minOrder).toLocaleString()}</span>
                    
                    <!-- ADD TO CART BUTTON -->
                    <div class="cart-actions" style="margin-top: 1rem;">
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <input type="number" 
                                   id="quantity-${product.id}" 
                                   value="${product.minOrder}" 
                                   min="${product.minOrder}" 
                                   style="width: 80px; padding: 0.5rem; border: 2px solid #e2e8f0; border-radius: 0.375rem;"
                                   onchange="validateQuantity('${product.id}', ${product.minOrder})">
                            <span style="font-size: 0.875rem; color: #64748b;">${product.unit}s</span>
                        </div>
                        <button onclick="addToCart('${product.id}')" 
                                class="btn-primary" 
                                style="margin-top: 0.5rem; width: 100%;">
                            🛒 Add to Cart
                        </button>
                    </div>
                    
                    <a href="export-product-details.html?id=${product.id}" class="btn-secondary" style="margin-top: 0.5rem; width: 100%; text-align: center; display: block;">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update load more button
    if (loadMoreBtn) {
        if (displayedProducts >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.textContent = `Load More (${filteredProducts.length - displayedProducts} remaining)`;
        }
    }
}

// Validate quantity meets MOQ
function validateQuantity(productId, minOrder) {
    const input = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(input.value);
    
    if (quantity < minOrder) {
        input.value = minOrder;
        showNotification(`Minimum order is ${minOrder} units`, 'warning');
    }
}

// Add to cart function
function addToCart(productId) {
    const product = exportProducts.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found', 'error');
        return;
    }
    
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value) || product.minOrder;
    
    // Validate MOQ
    if (quantity < product.minOrder) {
        showNotification(`Minimum order quantity is ${product.minOrder} ${product.unit}s`, 'warning');
        quantityInput.value = product.minOrder;
        return;
    }
    
    // Add to cart using our simple cart system
    if (window.simpleCart) {
        const success = window.simpleCart.addToCart(product, quantity);
        if (success) {
            showNotification(`Added ${quantity} ${product.unit}s of ${product.name} to cart!`, 'success');
        }
    } else {
        // Fallback: save to localStorage directly
        const cart = JSON.parse(localStorage.getItem('simple_cart')) || [];
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                unit: product.unit,
                minOrder: product.minOrder,
                supplier: product.supplier,
                image: product.image,
                quantity: quantity
            });
        }
        
        localStorage.setItem('simple_cart', JSON.stringify(cart));
        showNotification(`Added ${quantity} ${product.unit}s of ${product.name} to cart!`, 'success');
        
        // Update cart display
        updateCartDisplay();
    }
}

// Update cart display
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('simple_cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'inline-block' : 'none';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : type === 'error' ? '#ef4444' : '#6366f1';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 1000;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Setup cart listeners
function setupCartListeners() {
    // Update cart count on page load
    updateCartDisplay();
}

// Make functions globally available
window.addToCart = addToCart;
window.validateQuantity = validateQuantity;
