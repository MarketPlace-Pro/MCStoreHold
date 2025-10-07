// Categories Fixer - Ensure categories load properly
document.addEventListener('DOMContentLoaded', function() {
    console.log('Categories Fixer loaded');
    
    // Wait a bit for other scripts to load, then check categories
    setTimeout(function() {
        const categoriesSection = document.getElementById('categoriesSection');
        const productsContainer = document.getElementById('productsContainer');
        
        console.log('Categories section:', categoriesSection);
        console.log('Products container:', productsContainer);
        
        // If categories are still empty after 2 seconds, load them manually
        if (categoriesSection && categoriesSection.innerHTML.trim() === '') {
            console.log('Categories empty - loading manually');
            loadCategoriesManually();
        }
        
        // If products are still loading after 3 seconds, load them manually
        if (productsContainer && productsContainer.innerHTML.includes('Loading')) {
            setTimeout(function() {
                if (productsContainer.innerHTML.includes('Loading')) {
                    console.log('Products still loading - loading manually');
                    loadProductsManually();
                }
            }, 3000);
        }
    }, 2000);
});

function loadCategoriesManually() {
    const categoriesSection = document.getElementById('categoriesSection');
    if (!categoriesSection) return;
    
    // Create basic categories structure
    categoriesSection.innerHTML = `
        <h2 class="section-title">Export Categories</h2>
        <div class="categories-grid">
            <div class="category-card" data-category="all">
                <div class="category-icon">🌍</div>
                <h3>All Export Products</h3>
                <p>25 Products</p>
                <button class="btn-primary" onclick="window.exportSystem?.viewCategory('all')">
                    View All
                </button>
            </div>
            <div class="category-card" data-category="wine">
                <div class="category-icon">🍷</div>
                <h3>Wine & Spirits</h3>
                <p>5 Products</p>
                <button class="btn-primary" onclick="window.exportSystem?.viewCategory('wine')">
                    View Exports
                </button>
            </div>
            <div class="category-card" data-category="fruits">
                <div class="category-icon">🍓</div>
                <h3>Fresh Fruits</h3>
                <p>5 Products</p>
                <button class="btn-primary" onclick="window.exportSystem?.viewCategory('fruits')">
                    View Exports
                </button>
            </div>
            <div class="category-card" data-category="crafts">
                <div class="category-icon">🎨</div>
                <h3>Handicrafts</h3>
                <p>5 Products</p>
                <button class="btn-primary" onclick="window.exportSystem?.viewCategory('crafts')">
                    View Exports
                </button>
            </div>
            <div class="category-card" data-category="textiles">
                <div class="category-icon">👕</div>
                <h3>Textiles</h3>
                <p>5 Products</p>
                <button class="btn-primary" onclick="window.exportSystem?.viewCategory('textiles')">
                    View Exports
                </button>
            </div>
            <div class="category-card" data-category="spices">
                <div class="category-icon">🌶️</div>
                <h3>Spices & Foods</h3>
                <p>5 Products</p>
                <button class="btn-primary" onclick="window.exportSystem?.viewCategory('spices')">
                    View Exports
                </button>
            </div>
        </div>
    `;
}

function loadProductsManually() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer || !window.exportProducts) return;
    
    // Create basic products display
    let productsHTML = '';
    
    window.exportProducts.forEach(product => {
        productsHTML += `
            <div class="export-product-card" data-category="${product.category}">
                <div class="export-product-header">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='https://via.placeholder.com/400x300/1e3c72/FFFFFF?text=Export+Product'">
                    <div class="export-badges">
                        ${product.certification ? `<span class="cert-badge">${product.certification.length} Certifications</span>` : ''}
                        <span class="origin-badge">${product.origin}</span>
                    </div>
                </div>
                
                <div class="export-product-body">
                    <div class="product-category-tag">${getCategoryName(product.category)}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-supplier">By: ${product.supplier}</p>
                    <p class="product-description">${product.description}</p>
                    
                    <div class="export-specs">
                        <div class="spec-item">
                            <span class="spec-label">💰 Price:</span>
                            <span class="spec-value">$${product.price}/${product.unit}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">📦 Min Order:</span>
                            <span class="spec-value">${product.minOrder} ${product.moqUnit || product.unit + 's'}</span>
                        </div>
                    </div>

                    <div class="export-actions">
                        <button class="btn-export-primary" onclick="viewProductDetails('${product.id}')">
                            📋 Export Details
                        </button>
                        <button class="btn-export-secondary" onclick="contactExporter('${product.id}')">
                            📞 Contact Exporter
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    productsContainer.innerHTML = productsHTML;
}

function getCategoryName(category) {
    const names = {
        'wine': '🍷 Wine & Spirits',
        'fruits': '🍓 Fresh Fruits', 
        'crafts': '🎨 Handicrafts',
        'textiles': '👕 Textiles',
        'spices': '🌶️ Spices'
    };
    return names[category] || category;
}

function viewProductDetails(productId) {
    window.location.href = `export-product-details.html?id=${productId}`;
}

function contactExporter(productId) {
    const product = window.exportProducts?.find(p => p.id === productId);
    if (product) {
        alert(`Contact Exporter for: ${product.name}\nSupplier: ${product.supplier}`);
    }
}

console.log('Categories Fixer initialized');
