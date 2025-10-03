// AfriTrade Global Export Platform
document.addEventListener('DOMContentLoaded', function() {
    initializeExportPlatform();
});

function initializeExportPlatform() {
    loadFeaturedExportProducts();
    setupLanguageSelector();
    updateCurrencyRates();
    initializeExportCalculator();
}

function loadFeaturedExportProducts() {
    const container = document.getElementById('featuredExportProducts');
    if (!container) return;
    
    const featured = exportProducts.slice(0, 6);
    
    container.innerHTML = featured.map(product => `
        <div class="product-card export-product">
            <div class="product-badge">🌍 Export Ready</div>
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="supplier">By ${product.supplier}</p>
                <p class="origin">📍 ${product.origin}</p>
                <div class="certification-badges">
                    ${product.certification.map(cert => `<span class="cert-badge">${cert}</span>`).join('')}
                </div>
                <div class="export-details">
                    <div class="detail">
                        <strong>Min Order:</strong> ${product.minOrder} ${product.unit}s
                    </div>
                    <div class="detail">
                        <strong>Markets:</strong> ${product.exportMarkets.join(', ')}
                    </div>
                    <div class="detail">
                        <strong>Lead Time:</strong> ${product.leadTime}
                    </div>
                </div>
                <div class="product-price">
                    <span class="price">R${product.price}/${product.unit}</span>
                    <button onclick="viewExportProduct('${product.id}')" class="cta-button">Export Inquiry</button>
                </div>
            </div>
        </div>
    `).join('');
}

function setupLanguageSelector() {
    const selector = document.getElementById('languageSelect');
    if (selector) {
        selector.addEventListener('change', function(e) {
            const lang = e.target.value;
            switchLanguage(lang);
        });
    }
}

function switchLanguage(lang) {
    // Simple language switching - in production would use i18n
    const translations = {
        en: {
            welcome: "Export African Excellence to the World",
            supplierBtn: "🏭 Become a Supplier",
            buyerBtn: "🌍 Source from Africa"
        },
        zh: {
            welcome: "将非洲精品出口到世界",
            supplierBtn: "🏭 成为供应商",
            buyerBtn: "🌍 从非洲采购"
        },
        fr: {
            welcome: "Exportez l'excellence africaine vers le monde",
            supplierBtn: "🏭 Devenir fournisseur",
            buyerBtn: "🌍 S'approvisionner en Afrique"
        },
        pt: {
            welcome: "Exporte a excelência africana para o mundo",
            supplierBtn: "🏭 Tornar-se fornecedor",
            buyerBtn: "🌍 Comprar da África"
        }
    };
    
    const t = translations[lang] || translations.en;
    
    // Update key elements
    const welcome = document.querySelector('.export-hero h1');
    if (welcome) welcome.textContent = t.welcome;
    
    // Update buttons (simplified example)
    console.log('Language switched to:', lang, t);
}

function updateCurrencyRates() {
    // Simulate live currency rates
    const rates = document.getElementById('currencyRates');
    if (rates) {
        const zarEur = (0.049 + Math.random() * 0.002).toFixed(3);
        const zarCny = (0.39 + Math.random() * 0.01).toFixed(3);
        const zarUsd = (0.053 + Math.random() * 0.002).toFixed(3);
        
        rates.textContent = `ZAR/EUR: ${zarEur} | ZAR/CNY: ${zarCny} | ZAR/USD: ${zarUsd}`;
    }
}

function initializeExportCalculator() {
    // Export cost calculator would go here
    console.log('Export calculator initialized');
}

function viewExportProduct(productId) {
    const product = exportProducts.find(p => p.id === productId);
    if (product) {
        // In production, would show detailed modal or redirect to product page
        alert(`Export Inquiry: ${product.name}\n\nMinimum Order: ${product.minOrder} ${product.unit}s\nPrice: R${product.price}/${product.unit}\n\nContact us for bulk pricing and shipping quotes.`);
    }
}

// Export calculation functions
function calculateExportCost(product, quantity, destination) {
    const baseCost = product.price * quantity;
    const shippingCost = calculateShippingCost(quantity, destination);
    const duties = calculateImportDuties(baseCost, destination);
    const certificationCost = calculateCertificationCost(product);
    
    return {
        productCost: baseCost,
        shipping: shippingCost,
        duties: duties,
        certification: certificationCost,
        total: baseCost + shippingCost + duties + certificationCost
    };
}

function calculateShippingCost(quantity, destination) {
    // Simplified shipping calculation
    const rates = {
        'EU': 15000, // ZAR per container
        'China': 18000,
        'USA': 20000,
        'Middle East': 12000
    };
    
    const baseRate = rates[destination] || 15000;
    return baseRate * Math.ceil(quantity / 1000); // Scale with quantity
}

function calculateImportDuties(productValue, destination) {
    const dutyRates = {
        'EU': 0.10, // 10%
        'China': 0.15,
        'USA': 0.05,
        'Middle East': 0.08
    };
    
    return productValue * (dutyRates[destination] || 0.10);
}

function calculateCertificationCost(product) {
    // Average certification costs
    return product.certification.length * 500; // R500 per certification
}
