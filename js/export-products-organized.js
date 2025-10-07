// Organized Export Products System
class ExportProducts {
    constructor() {
        this.products = window.exportProducts || [];
        this.filteredProducts = [];
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        console.log('Export Products System initialized with', this.products.length, 'products');
        this.displayProducts();
        this.setupEventListeners();
        this.updateCategoryCounts();
    }

    displayProducts(productsToShow = null) {
        const container = document.getElementById('productsContainer');
        if (!container) {
            console.error('Products container not found');
            return;
        }

        const products = productsToShow || this.products;
        
        if (products.length === 0) {
            container.innerHTML = this.getNoProductsHTML();
            return;
        }

        container.innerHTML = products.map(product => this.getProductHTML(product)).join('');
    }

    getProductHTML(product) {
        return `
            <div class="product-card" data-category="${product.category}" data-id="${product.id}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Product+Image'">
                    ${product.certification && product.certification.length > 0 ? 
                        `<div class="certification-badge">${product.certification.length} Certifications</div>` : ''}
                </div>
                <div class="product-info">
                    <span class="product-category">${this.getCategoryDisplayName(product.category)}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-supplier">Supplier: ${product.supplier || 'N/A'}</p>
                    <p class="product-origin">Origin: ${product.origin || 'N/A'}</p>
                    <p class="product-description">${product.description}</p>
                    
                    <div class="product-details">
                        <div class="product-price">$${product.price}/${product.unit || 'unit'}</div>
                        <div class="min-order">Min Order: ${product.minOrder || 'N/A'}</div>
                    </div>

                    <div class="product-specs">
                        ${product.exportMarkets ? `<div class="spec-item">🌍 Markets: ${product.exportMarkets.join(', ')}</div>` : ''}
                        ${product.shipping ? `<div class="spec-item">🚚 Shipping: ${product.shipping}</div>` : ''}
                        ${product.leadTime ? `<div class="spec-item">⏱️ Lead Time: ${product.leadTime}</div>` : ''}
                    </div>

                    <div class="product-actions">
                        <button class="btn-primary" onclick="exportProducts.viewProductDetails('${product.id}')">
                            View Export Details
                        </button>
                        <button class="btn-outline" onclick="exportProducts.contactSupplier('${product.id}')">
                            Contact Supplier
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryDisplayName(category) {
        const categoryMap = {
            'wine': '🍷 Wine & Spirits',
            'fruits': '🍓 Fresh Fruits',
            'crafts': '🎨 Handicrafts & Art',
            'textiles': '👕 Textiles & Fashion',
            'spices': '🌶️ Spices & Foods'
        };
        return categoryMap[category] || category;
    }

    getNoProductsHTML() {
        return `
            <div class="no-products">
                <h3>No Products Found</h3>
                <p>Try adjusting your filters or check back later for new export opportunities.</p>
            </div>
        `;
    }

    filterByCategory(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredProducts = this.products;
        } else {
            this.filteredProducts = this.products.filter(product => product.category === category);
        }
        
        this.displayProducts(this.filteredProducts);
        this.updateActiveFilter(category);
    }

    updateActiveFilter(category) {
        // Update UI to show active filter
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
    }

    updateCategoryCounts() {
        const counts = {};
        this.products.forEach(product => {
            counts[product.category] = (counts[product.category] || 0) + 1;
        });

        // Update category buttons with counts
        Object.keys(counts).forEach(category => {
            const btn = document.querySelector(`[data-category="${category}"]`);
            if (btn) {
                const countSpan = btn.querySelector('.count') || document.createElement('span');
                countSpan.className = 'count';
                countSpan.textContent = ` (${counts[category]})`;
                if (!btn.querySelector('.count')) {
                    btn.appendChild(countSpan);
                }
            }
        });

        // Update "All" count
        const allBtn = document.querySelector('[data-category="all"]');
        if (allBtn) {
            const countSpan = allBtn.querySelector('.count') || document.createElement('span');
            countSpan.className = 'count';
            countSpan.textContent = ` (${this.products.length})`;
            if (!allBtn.querySelector('.count')) {
                allBtn.appendChild(countSpan);
            }
        }
    }

    viewProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            alert(`Product Details:\n\nName: ${product.name}\nPrice: $${product.price}\nCategory: ${this.getCategoryDisplayName(product.category)}\nSupplier: ${product.supplier}\nMin Order: ${product.minOrder}`);
            // In real implementation: window.location.href = `export-product-details.html?id=${productId}`;
        }
    }

    contactSupplier(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            alert(`Contact Supplier for: ${product.name}\n\nSupplier: ${product.supplier}\n\nThis would open a contact form in a real implementation.`);
        }
    }

    setupEventListeners() {
        // Category filter buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-filter')) {
                const category = e.target.dataset.category;
                this.filterByCategory(category);
            }
        });

        // Search functionality
        const searchInput = document.getElementById('productSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchProducts(e.target.value);
            });
        }
    }

    searchProducts(query) {
        if (!query.trim()) {
            this.displayProducts(this.currentCategory === 'all' ? this.products : this.filteredProducts);
            return;
        }

        const searchProducts = (this.currentCategory === 'all' ? this.products : this.filteredProducts)
            .filter(product => 
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.supplier.toLowerCase().includes(query.toLowerCase())
            );

        this.displayProducts(searchProducts);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.exportProducts = new ExportProducts();
});

console.log('Export Products Organized system loaded');
