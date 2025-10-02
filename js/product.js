// Product detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
});

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }
    
    const product = getProductById(productId);
    
    if (!product) {
        document.getElementById('productDetail').innerHTML = `
            <div style="text-align: center; padding: 4rem;">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist.</p>
                <button onclick="location.href='index.html'" class="cta-button">Return to Home</button>
            </div>
        `;
        return;
    }
    
    displayProductDetails(product);
}

function displayProductDetails(product) {
    document.title = `${product.name} - MCStoreHold`;
    document.getElementById('productTitle').textContent = product.name;
    
    const categoryLink = document.getElementById('productCategoryLink');
    categoryLink.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    categoryLink.href = `category.html?cat=${product.category}`;
    
    const productDetail = document.getElementById('productDetail');
    
    productDetail.innerHTML = `
        <div class="product-detail-container">
            <div class="product-images">
                <div class="main-image">
                    <img src="${product.image}" alt="${product.name}" id="mainProductImage">
                </div>
            </div>
            
            <div class="product-info">
                <h1>${product.name}</h1>
                
                <div class="rating-large">
                    ${generateStarRating(product.rating)}
                    <span class="review-count">${product.reviews} reviews</span>
                </div>
                
                <div class="price-section">
                    ${product.originalPrice ? `
                        <div class="original-price-large">${product.originalPrice}</div>
                        <div class="price-large">${product.price}</div>
                        <div class="discount-badge">
                            Save ${calculateDiscount(parseFloat(product.originalPrice.replace('$', '')), parseFloat(product.price.replace('$', '')))}%
                        </div>
                    ` : `
                        <div class="price-large">${product.price}</div>
                    `}
                </div>
                
                <div class="product-description">
                    <p>${product.description}</p>
                </div>
                
                ${product.features ? `
                <div class="product-features">
                    <h3>Key Features:</h3>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                <div class="purchase-options">
                    <div class="quantity-selector">
                        <label for="quantity">Quantity:</label>
                        <select id="quantity">
                            ${Array.from({length: 10}, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="add-to-cart-large" onclick="addToCartWithQuantity(${product.id})">
                            Add to Cart
                        </button>
                        <button class="buy-now" onclick="buyNow(${product.id})">
                            Buy Now
                        </button>
                        <button class="wishlist-btn" onclick="addToWishlist(${product.id})">
                            ❤️ Add to Wishlist
                        </button>
                    </div>
                </div>
                
                <div class="product-meta">
                    <div class="meta-item">
                        <strong>Category:</strong> 
                        <a href="category.html?cat=${product.category}">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</a>
                    </div>
                    <div class="meta-item">
                        <strong>Availability:</strong> 
                        <span style="color: ${product.inStock ? 'green' : 'red'}">
                            ${product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                    <div class="meta-item">
                        <strong>SKU:</strong> PROD-${product.id.toString().padStart(4, '0')}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="product-tabs">
            <div class="tabs">
                <button class="tab-button active" onclick="openTab('description')">Description</button>
                <button class="tab-button" onclick="openTab('specifications')">Specifications</button>
                <button class="tab-button" onclick="openTab('reviews')">Reviews</button>
                <button class="tab-button" onclick="openTab('shipping')">Shipping & Returns</button>
            </div>
            
            <div id="description" class="tab-content active">
                <h3>Product Description</h3>
                <p>${product.description}</p>
                ${product.features ? `
                <h4>Features:</h4>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                ` : ''}
            </div>
            
            <div id="specifications" class="tab-content">
                <h3>Product Specifications</h3>
                <table class="specs-table">
                    <tr><td>Brand</td><td>MCStoreHold</td></tr>
                    <tr><td>Model</td><td>PROD-${product.id.toString().padStart(4, '0')}</td></tr>
                    <tr><td>Category</td><td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td></tr>
                    <tr><td>Warranty</td><td>1 Year Limited</td></tr>
                </table>
            </div>
            
            <div id="reviews" class="tab-content">
                <h3>Customer Reviews</h3>
                <div class="reviews-summary">
                    <div class="overall-rating">
                        <div class="rating-score">${product.rating}/5</div>
                        ${generateStarRating(product.rating)}
                        <div class="total-reviews">Based on ${product.reviews} reviews</div>
                    </div>
                </div>
                <div class="sample-review">
                    <p><strong>John D.</strong> ${generateStarRating(5)}</p>
                    <p>"Great product! Exactly as described. Fast shipping too!"</p>
                </div>
            </div>
            
            <div id="shipping" class="tab-content">
                <h3>Shipping & Returns</h3>
                <h4>Shipping Information</h4>
                <ul>
                    <li>Free shipping on orders over $50</li>
                    <li>Standard delivery: 3-5 business days</li>
                    <li>Express delivery available</li>
                </ul>
                <h4>Return Policy</h4>
                <ul>
                    <li>30-day money-back guarantee</li>
                    <li>Free returns for defective items</li>
                    <li>Items must be in original condition</li>
                </ul>
            </div>
        </div>
    `;
}

function addToCartWithQuantity(productId) {
    const product = getProductById(productId);
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (product) {
        addToCart(productId, product.name, product.price, product.image, quantity);
    }
}

function buyNow(productId) {
    const product = getProductById(productId);
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (product) {
        addToCart(productId, product.name, product.price, product.image, quantity);
        // Redirect to checkout page
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 500);
    }
}

function addToWishlist(productId) {
    alert('Added to wishlist!');
    // Wishlist functionality would be implemented here
}

function openTab(tabName) {
    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Show the specific tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to the button that opened the tab
    event.currentTarget.classList.add('active');
}

// Helper function to calculate discount
function calculateDiscount(originalPrice, salePrice) {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
