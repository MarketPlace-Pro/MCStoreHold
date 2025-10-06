// Export Products Page with Working Cart System
let currentCategory = 'all';
let currentSort = 'featured';
let displayedProducts = 12;

document.addEventListener('DOMContentLoaded', function() {
    initializeExportProducts();
    setupCartSystem();
});

function initializeExportProducts() {
    setupCategoryFilters();
    setupSorting();
    loadProductsWithCart();
    setupURLParams();
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayedProducts += 12;
            loadProductsWithCart();
        });
    }
}

function setupCartSystem() {
    updateCartDisplay();
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('simple_cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'inline-block' : 'none';
    }
}

function setupCategoryFilters() {
    const filterCards = document.querySelectorAll('.filter-card');
    
    filterCards.forEach(card => {
        card.addEventListener('click', function() {
            filterCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            displayedProducts = 12;
            updateCategoryTitle();
            loadProductsWithCart();
            updateURL();
            document.getElementById('exportProductsGrid').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    });
}

function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            loadProductsWithCart();
        });
    }
}

function setupURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && ['wine', 'fruits', 'crafts', 'textiles', 'spices'].includes(category)) {
        currentCategory = category;
        const targetCard = document.querySelector(`.filter-card[data-category="${category}"]`);
        if (targetCard) {
            document.querySelectorAll('.filter-card').forEach(card => card.classList.remove('active'));
            targetCard.classList.add('active');
            updateCategoryTitle();
            loadProductsWithCart();
        }
    }
}

function updateURL() {
    const url = new URL(window.location);
    if (currentCategory !== 'all') {
        url.searchParams.set('category', currentCategory);
    } else {
        url.searchParams.delete('category');
    }
    window.history.replaceState({}, '', url);
}

function updateCategoryTitle() {
    const titleElement = document.getElementById('categoryTitle');
    if (!titleElement) return;
    
    const categoryTitles = {
        'all': 'All Export Products',
        'wine': '🍷 Wine & Spirits',
        'fruits': '🍋 Fruits & Agriculture',
        'crafts': '💎 Crafts & Minerals',
        'textiles': '🧥 Textiles & Fashion',
        'spices': '🌶️ Spices & Foods'
    };
    
    titleElement.textContent = categoryTitles[currentCategory] || 'Export Products';
}

// 🛒 MAIN FUNCTION: Load products with cart buttons
function loadProductsWithCart() {
    const grid = document.getElementById('exportProductsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!grid) return;
    
    let filteredProducts = exportProducts;
    if (currentCategory !== 'all') {
        filteredProducts = exportProducts.filter(product => product.category === currentCategory);
    }
    
    filteredProducts = sortProducts(filteredProducts, currentSort);
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
    
    // 🛒 RENDER PRODUCTS WITH CART BUTTONS
    grid.innerHTML = productsToShow.map(product => `
        <div class="export-product-card fade-in-up">
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
                    
                    <!-- 🛒 ADD TO CART SECTION -->
                    <div class="cart-actions" style="margin-top: 1rem;">
                        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
                            <label style="font-size: 0.875rem; color: #64748b; font-weight: 600;">Quantity:</label>
                            <input type="number" 
                                   id="quantity-${product.id}" 
                                   value="${product.minOrder}" 
                                   min="${product.minOrder}" 
                                   style="width: 80px; padding: 0.5rem; border: 2px solid #e2e8f0; border-radius: 0.375rem; font-size: 0.875rem;"
                                   onchange="validateQuantity('${product.id}', ${product.minOrder})">
                            <span style="font-size: 0.875rem; color: #64748b;">${product.unit}s</span>
                        </div>
                        <button onclick="addToCart('${product.id}')" 
                                class="btn-primary" 
                                style="width: 100%; padding: 0.75rem; font-weight: 600;">
                            🛒 Add to Cart
                        </button>
                    </div>
                    
                    <a href="export-product-details.html?id=${product.id}" class="btn-secondary" style="margin-top: 0.5rem; width: 100%; text-align: center; display: block; padding: 0.75rem;">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    
    if (loadMoreBtn) {
        if (displayedProducts >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.textContent = `Load More (${filteredProducts.length - displayedProducts} remaining)`;
        }
    }
}

function sortProducts(products, sortType) {
    switch(sortType) {
        case 'price-low':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-high':
            return [...products].sort((a, b) => b.price - a.price);
        case 'moq-low':
            return [...products].sort((a, b) => a.minOrder - b.minOrder);
        case 'name':
            return [...products].sort((a, b) => a.name.localeCompare(b.name));
        case 'featured':
        default:
            return products;
    }
}

function viewProductDetails(productId) {
    window.location.href = `export-product-details.html?id=${productId}`;
}

function resetFilters() {
    currentCategory = 'all';
    displayedProducts = 12;
    document.querySelectorAll('.filter-card').forEach(card => card.classList.remove('active'));
    document.querySelector('.filter-card[data-category="all"]').classList.add('active');
    updateCategoryTitle();
    loadProductsWithCart();
    updateURL();
}

// 🛒 CART FUNCTIONS
function validateQuantity(productId, minOrder) {
    const input = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(input.value);
    
    if (quantity < minOrder) {
        input.value = minOrder;
        showNotification(`Minimum order is ${minOrder} units`, 'warning');
    }
}

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
    
    // Add to cart
    const cart = JSON.parse(localStorage.getItem('simple_cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
        showNotification(`Added ${quantity} more ${product.unit}s of ${product.name} (Total: ${existingItem.quantity})`, 'success');
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
        showNotification(`Added ${quantity} ${product.unit}s of ${product.name} to cart!`, 'success');
    }
    
    localStorage.setItem('simple_cart', JSON.stringify(cart));
    updateCartDisplay();
    
    // Optional: Redirect to buyer dashboard after adding
    setTimeout(() => {
        if (confirm('Item added to cart! Go to your cart to review your order?')) {
            window.location.href = 'buyer-dashboard.html';
        }
    }, 1000);
}

function showNotification(message, type = 'info') {
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
    
    .market-tag {
        background: #e0e7ff;
        color: #3730a3;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .cert-badge {
        background: #dcfce7;
        color: #166534;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Make functions globally available
window.addToCart = addToCart;
window.validateQuantity = validateQuantity;
