// Export-Only Products System - Pure Export Focus
class ExportOnlySystem {
    constructor() {
        this.products = window.exportProducts || [];
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        console.log('Export-Only System: Loaded', this.products.length, 'export products');
        this.displayCategories();
        this.displayProducts();
        this.setupEventListeners();
    }

    displayCategories() {
        const categories = this.getCategories();
        const container = document.getElementById('categoriesSection');
        if (!container) return;

        container.innerHTML = `
            <div class="categories-grid">
                ${categories.map(cat => `
                    <div class="category-card" data-category="${cat.id}">
                        <div class="category-icon">${cat.icon}</div>
                        <h3>${cat.name}</h3>
                        <p>${cat.count} Products</p>
                        <button class="btn-primary" onclick="exportSystem.viewCategory('${cat.id}')">
                            View Exports
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getCategories() {
        const counts = {};
        this.products.forEach(product => {
            counts[product.category] = (counts[product.category] || 0) + 1;
        });

        const categoryMap = {
            'wine': { name: 'Wine & Spirits', icon: '🍷' },
            'fruits': { name: 'Fresh Fruits', icon: '🍓' },
            'crafts': { name: 'Handicrafts', icon: '🎨' },
            'textiles': { name: 'Textiles & Fashion', icon: '👕' },
            'spices': { name: 'Spices & Foods', icon: '🌶️' }
        };

        return [
            { id: 'all', name: 'All Export Products', icon: '🌍', count: this.products.length },
            ...Object.keys(categoryMap).map(catId => ({
                id: catId,
                name: categoryMap[catId].name,
                icon: categoryMap[catId].icon,
                count: counts[catId] || 0
            }))
        ];
    }

    displayProducts() {
        const container = document.getElementById('productsContainer');
        if (!container) return;

        let productsToShow = this.products;
        if (this.currentCategory !== 'all') {
            productsToShow = this.products.filter(p => p.category === this.currentCategory);
        }

        if (productsToShow.length === 0) {
            container.innerHTML = this.getNoProductsHTML();
            return;
        }

        container.innerHTML = productsToShow.map(product => this.getProductHTML(product)).join('');
    }

    getProductHTML(product) {
        return `
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
                    <div class="product-category-tag">${this.getCategoryName(product.category)}</div>
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
                            <span class="spec-value">${product.minOrder} ${product.unit}s</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">🌍 Markets:</span>
                            <span class="spec-value">${product.exportMarkets?.join(', ') || 'Global'}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">🚢 Shipping:</span>
                            <span class="spec-value">${product.shipping}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">⏱️ Lead Time:</span>
                            <span class="spec-value">${product.leadTime}</span>
                        </div>
                    </div>

                    <div class="export-actions">
                        <button class="btn-export-primary" onclick="exportSystem.viewExportDetails('${product.id}')">
                            📋 Export Details
                        </button>
                        <button class="btn-export-secondary" onclick="exportSystem.contactExporter('${product.id}')">
                            📞 Contact Exporter
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryName(category) {
        const names = {
            'wine': '🍷 Wine & Spirits',
            'fruits': '🍓 Fresh Fruits',
            'crafts': '🎨 Handicrafts',
            'textiles': '👕 Textiles',
            'spices': '🌶️ Spices'
        };
        return names[category] || category;
    }

    getNoProductsHTML() {
        return `
            <div class="no-exports">
                <div class="no-exports-icon">📭</div>
                <h3>No Export Products Found</h3>
                <p>No export products available in this category. Try another category or check back later.</p>
            </div>
        `;
    }

    viewCategory(category) {
        this.currentCategory = category;
        this.displayProducts();
        
        // Update UI
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
        
        // Scroll to products
        document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
    }

    viewExportDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            // Redirect to product detail page
            window.location.href = `export-product-details.html?id=${productId}`;
        }
    }

    contactExporter(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            alert(`📞 Contact Exporter\n\nProduct: ${product.name}\nSupplier: ${product.supplier}\nOrigin: ${product.origin}\n\nThis would open a contact form for export inquiries.`);
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('exportSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchExports(e.target.value);
            });
        }
    }

    searchExports(query) {
        if (!query.trim()) {
            this.displayProducts();
            return;
        }

        const filtered = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.supplier.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.origin.toLowerCase().includes(query.toLowerCase())
        );

        const container = document.getElementById('productsContainer');
        if (!container) return;

        if (filtered.length === 0) {
            container.innerHTML = this.getNoProductsHTML();
        } else {
            container.innerHTML = filtered.map(product => this.getProductHTML(product)).join('');
        }
    }
}

// Initialize export system
document.addEventListener('DOMContentLoaded', function() {
    window.exportSystem = new ExportOnlySystem();
});

console.log('Export-Only System loaded successfully');
