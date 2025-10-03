// Export Products Page Functionality
let currentCategory = 'all';
let currentSort = 'featured';
let displayedProducts = 12;

document.addEventListener('DOMContentLoaded', function() {
    initializeExportProducts();
});

function initializeExportProducts() {
    setupCategoryFilters();
    setupSorting();
    loadProducts();
    setupURLParams();
}

function setupCategoryFilters() {
    const filterCards = document.querySelectorAll('.filter-card');
    
    filterCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            filterCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update current category
            currentCategory = this.dataset.category;
            
            // Update category title
            updateCategoryTitle();
            
            // Reload products
            loadProducts();
            
            // Update URL
            updateURL();
        });
    });
}

function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            loadProducts();
        });
    }
}

function setupURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && ['wine', 'fruits', 'crafts', 'textiles', 'spices'].includes(category)) {
        currentCategory = category;
        
        // Activate the corresponding filter card
        const targetCard = document.querySelector(`.filter-card[data-category="${category}"]`);
        if (targetCard) {
            document.querySelectorAll('.filter-card').forEach(card => card.classList.remove('active'));
            targetCard.classList.add('active');
            updateCategoryTitle();
            loadProducts();
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

function loadProducts() {
    const grid = document.getElementById('exportProductsGrid');
    if (!grid) return;
    
    // Filter products by category
    let filteredProducts = exportProducts;
    if (currentCategory !== 'all') {
        filteredProducts = exportProducts.filter(product => product.category === currentCategory);
    }
    
    // Sort products
    filteredProducts = sortProducts(filteredProducts, currentSort);
    
    // Display products (first 12)
    const productsToShow = filteredProducts.slice(0, displayedProducts);
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card export-product-card">
            <div class="moq-badge">MOQ: ${product.minOrder} ${product.unit}s</div>
            <img src="${product.image}" alt="${product.name}" onclick="viewProductDetails('${product.id}')">
            <div class="product-info">
                <h3 onclick="viewProductDetails('${product.id}')" style="cursor: pointer;">${product.name}</h3>
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
                    <span class="moq-total" style="font-size: 0.9rem; color: #666;">Min: R${(product.price * product.minOrder).toLocaleString()}</span>
                    <button onclick="viewProductDetails('${product.id}')" class="cta-button">Export Inquiry</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (displayedProducts >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
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

// Load more functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayedProducts += 12;
            loadProducts();
        });
    }
});
