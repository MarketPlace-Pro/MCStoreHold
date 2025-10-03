// Export Products Page Functionality - Fixed Version
let currentCategory = 'all';
let currentSort = 'featured';
let displayedProducts = 12;

// Sample products data for demonstration
const sampleProducts = [
    {
        id: 'exp-wine-001',
        name: 'Stellenbosch Cabernet Sauvignon 2022',
        category: 'wine',
        supplier: 'Stellenbosch Vineyards',
        origin: 'Western Cape, South Africa',
        price: 150,
        unit: 'bottle',
        minOrder: 120,
        certification: ['EU Organic', 'Wine of Origin'],
        description: 'Premium South African red wine with rich dark berry flavors',
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop',
        exportMarkets: ['EU', 'China', 'USA'],
        shipping: 'Container (1200 cases)',
        leadTime: '15-30 days'
    },
    {
        id: 'exp-wine-002',
        name: 'Chenin Blanc 2023',
        category: 'wine',
        supplier: 'Fairview Wines',
        origin: 'Paarl, South Africa',
        price: 130,
        unit: 'bottle',
        minOrder: 100,
        certification: ['Sustainable', 'Wine of Origin'],
        description: 'Crisp white wine with tropical fruit notes',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop',
        exportMarkets: ['EU', 'China', 'UK'],
        shipping: 'Container',
        leadTime: '15-25 days'
    },
    {
        id: 'exp-fruit-001',
        name: 'Fresh Valencia Oranges',
        category: 'fruits',
        supplier: 'Citrus Farms SA',
        origin: 'Limpopo, South Africa',
        price: 8,
        unit: 'kilogram',
        minOrder: 10000,
        certification: ['GlobalGAP', 'PPECB'],
        description: 'Sweet, juicy oranges perfect for export markets',
        image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop',
        exportMarkets: ['China', 'EU', 'Middle East'],
        shipping: 'Refrigerated Container',
        leadTime: '7-14 days'
    },
    {
        id: 'exp-fruit-002',
        name: 'Hass Avocados',
        category: 'fruits',
        supplier: 'Green Gold Avocados',
        origin: 'Mpumalanga, South Africa',
        price: 25,
        unit: 'kilogram',
        minOrder: 5000,
        certification: ['GlobalGAP', 'Organic'],
        description: 'Premium Hass avocados with perfect oil content',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop',
        exportMarkets: ['EU', 'UK', 'Middle East'],
        shipping: 'Refrigerated Container',
        leadTime: '5-12 days'
    },
    {
        id: 'exp-craft-001',
        name: 'Zulu Beaded Artwork',
        category: 'crafts',
        supplier: 'African Crafts Collective',
        origin: 'KwaZulu-Natal, South Africa',
        price: 250,
        unit: 'piece',
        minOrder: 100,
        certification: ['Fair Trade', 'Authentic African'],
        description: 'Handcrafted traditional Zulu beadwork',
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop',
        exportMarkets: ['EU', 'USA', 'Japan'],
        shipping: 'Air Freight',
        leadTime: '10-20 days'
    },
    {
        id: 'exp-craft-002',
        name: 'Diamond Rough',
        category: 'crafts',
        supplier: 'Diamond Works SA',
        origin: 'Kimberley, South Africa',
        price: 8500,
        unit: 'carat',
        minOrder: 50,
        certification: ['Kimberley Process', 'Conflict Free'],
        description: 'Premium diamond rough from South African mines',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
        exportMarkets: ['Belgium', 'India', 'USA'],
        shipping: 'Secure Air Freight',
        leadTime: '5-10 days'
    },
    {
        id: 'exp-textile-001',
        name: 'Shweshwe Traditional Fabric',
        category: 'textiles',
        supplier: 'Da Gama Textiles',
        origin: 'Eastern Cape, South Africa',
        price: 85,
        unit: 'meter',
        minOrder: 1000,
        certification: ['OEKO-TEX', 'Traditional Design'],
        description: 'Authentic South African printed cotton fabric',
        image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop',
        exportMarkets: ['EU', 'USA', 'Global Fashion'],
        shipping: 'Container',
        leadTime: '20-30 days'
    },
    {
        id: 'exp-spice-001',
        name: 'Premium Rooibos Tea',
        category: 'spices',
        supplier: 'Rooibos Limited',
        origin: 'Cederberg, South Africa',
        price: 120,
        unit: 'kilogram',
        minOrder: 500,
        certification: ['EU Organic', 'FDA Approved'],
        description: '100% pure organic Rooibos tea, caffeine-free',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
        exportMarkets: ['EU', 'China', 'USA'],
        shipping: 'Container',
        leadTime: '15-25 days'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeExportProducts();
});

function initializeExportProducts() {
    setupCategoryFilters();
    setupSorting();
    loadProducts();
    setupURLParams();
    
    // Add click event to load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayedProducts += 8;
            loadProducts();
        });
    }
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
            
            // Reset displayed products count
            displayedProducts = 12;
            
            // Update category title
            updateCategoryTitle();
            
            // Reload products
            loadProducts();
            
            // Update URL
            updateURL();
            
            // Scroll to products section
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
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!grid) return;
    
    // Filter products by category
    let filteredProducts = sampleProducts;
    if (currentCategory !== 'all') {
        filteredProducts = sampleProducts.filter(product => product.category === currentCategory);
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
                <button onclick="resetFilters()" class="cta-button">Show All Products</button>
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
                    <a href="export-product-details.html?id=${product.id}" class="cta-button">Export Inquiry</a>
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
    
    // Reset active filter card
    document.querySelectorAll('.filter-card').forEach(card => card.classList.remove('active'));
    document.querySelector('.filter-card[data-category="all"]').classList.add('active');
    
    updateCategoryTitle();
    loadProducts();
    updateURL();
}
