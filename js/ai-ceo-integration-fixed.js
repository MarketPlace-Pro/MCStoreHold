// AI CEO INTEGRATION - FIXED VERSION
// This connects the AI CEO with your actual product database

// Wait for the product data to load
function initializeAICEO() {
    console.log('🚀 Initializing AI CEO with real product data...');
    
    // Check if we have the main product database
    if (typeof exportProducts !== 'undefined' && exportProducts.length > 0) {
        console.log('✅ Found', exportProducts.length, 'real products');
        startAICEO();
    } else {
        console.log('⏳ Loading product database...');
        // Try to load the products file
        loadProductDatabase();
    }
}

function loadProductDatabase() {
    // Create a script element to load the products
    const script = document.createElement('script');
    script.src = 'js/export-all-products.js';
    script.onload = function() {
        console.log('✅ Product database loaded');
        if (typeof exportProducts !== 'undefined') {
            startAICEO();
        } else {
            console.error('❌ Product database not loaded properly');
            createSampleProducts();
        }
    };
    script.onerror = function() {
        console.error('❌ Failed to load product database');
        createSampleProducts();
    };
    document.head.appendChild(script);
}

function createSampleProducts() {
    console.log('⚠️ Using sample products (real products not found)');
    window.exportProducts = [
        {
            id: 'sample-1',
            name: 'Sample Wine Product',
            category: 'wine',
            price: 150,
            minOrder: 100,
            supplier: 'Sample Supplier'
        }
    ];
    startAICEO();
}

// Enhanced AI CEO with real product management
class RealAICEO {
    constructor() {
        this.products = window.exportProducts || [];
        this.console = document.getElementById('aiConsole');
        this.init();
    }

    init() {
        this.log('🤖 AI CEO System Initialized with REAL DATA');
        this.log(`📊 Managing ${this.products.length} real products`);
        this.updateDashboardStats();
        this.generateRealSuggestions();
    }

    log(message) {
        const console = document.getElementById('aiConsole');
        if (console) {
            const entry = document.createElement('div');
            entry.textContent = `> ${new Date().toLocaleTimeString()} ${message}`;
            console.appendChild(entry);
            console.scrollTop = console.scrollHeight;
        }
        console.log('AI CEO:', message);
    }

    updateDashboardStats() {
        // Update the stats cards with real data
        const stats = {
            totalProducts: this.products.length,
            categories: new Set(this.products.map(p => p.category)).size,
            suppliers: new Set(this.products.map(p => p.supplier)).size,
            totalValue: this.products.reduce((sum, p) => sum + (p.price * p.minOrder), 0),
            avgPrice: Math.round(this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length)
        };

        // Update DOM if elements exist
        const statElements = {
            'totalProducts': stats.totalProducts,
            'categories': stats.categories,
            'suppliers': stats.suppliers,
            'exportMarkets': 15, // Default value
            'pendingTasks': 0
        };

        Object.keys(statElements).forEach(stat => {
            const element = document.querySelector(`[data-stat="${stat}"]`);
            if (element) {
                element.textContent = statElements[stat];
            }
        });
    }

    // REAL PRODUCT MANAGEMENT
    aiAddProduct() {
        this.log('🚀 Starting REAL Product Addition...');
        
        const newProduct = {
            id: 'exp-' + Date.now(),
            name: prompt('Enter product name:') || 'New Product',
            category: prompt('Enter category (wine/fruits/crafts/textiles/spices):') || 'wine',
            price: parseFloat(prompt('Enter price per unit (R):') || '100'),
            minOrder: parseInt(prompt('Enter minimum order quantity:') || '50'),
            unit: prompt('Enter unit (bottle/kg/piece):') || 'bottle',
            supplier: prompt('Enter supplier name:') || 'New Supplier',
            origin: prompt('Enter origin location:') || 'South Africa',
            description: prompt('Enter product description:') || 'Premium export product',
            certification: ['New Product'],
            exportMarkets: ['EU', 'USA'],
            shipping: 'Container',
            leadTime: '15-30 days',
            image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop'
        };

        if (newProduct.name) {
            this.products.push(newProduct);
            this.log(`✅ REAL PRODUCT ADDED: ${newProduct.name} at R${newProduct.price}/${newProduct.unit}`);
            this.updateRealDatabase();
            this.updateDashboardStats();
        }
    }

    aiEditProducts() {
        this.log('📝 Opening REAL Product Editor...');
        
        let productOptions = 'Select product to edit:\n\n';
        this.products.forEach((product, index) => {
            productOptions += `${index + 1}. ${product.name} (R${product.price}/${product.unit})\n`;
        });
        
        const choice = parseInt(prompt(productOptions)) - 1;
        
        if (choice >= 0 && choice < this.products.length) {
            this.editRealProduct(choice);
        } else {
            this.log('❌ Invalid product selection');
        }
    }

    editRealProduct(index) {
        const product = this.products[index];
        this.log(`✏️ Editing: ${product.name}`);
        
        const fields = ['name', 'price', 'minOrder', 'supplier', 'description', 'category'];
        let fieldOptions = 'Select field to edit:\n\n';
        fields.forEach((field, i) => {
            fieldOptions += `${i + 1}. ${field} (current: ${product[field]})\n`;
        });
        
        const fieldChoice = parseInt(prompt(fieldOptions)) - 1;
        
        if (fieldChoice >= 0 && fieldChoice < fields.length) {
            const field = fields[fieldChoice];
            const newValue = prompt(`Enter new value for ${field}:`, product[field]);
            
            if (newValue !== null) {
                // Convert to proper type
                if (field === 'price') product[field] = parseFloat(newValue);
                else if (field === 'minOrder') product[field] = parseInt(newValue);
                else product[field] = newValue;
                
                this.log(`✅ UPDATED: ${product.name} - ${field}: ${newValue}`);
                this.updateRealDatabase();
            }
        }
    }

    aiRemoveProduct() {
        this.log('🗑️ Removing REAL Product...');
        
        let productOptions = 'Select product to REMOVE:\n\n';
        this.products.forEach((product, index) => {
            productOptions += `${index + 1}. ${product.name}\n`;
        });
        
        const choice = parseInt(prompt(productOptions)) - 1;
        
        if (choice >= 0 && choice < this.products.length) {
            const removed = this.products.splice(choice, 1)[0];
            this.log(`❌ REMOVED: ${removed.name}`);
            this.updateRealDatabase();
            this.updateDashboardStats();
        }
    }

    aiUpdatePrices() {
        this.log('💰 Analyzing REAL market data for price updates...');
        
        let changes = 0;
        this.products.forEach(product => {
            // Smart price adjustment based on category
            const adjustments = {
                'wine': 1.08,    // 8% increase for wines
                'fruits': 1.05,  // 5% increase for fruits
                'crafts': 1.12,  // 12% increase for crafts
                'textiles': 1.06, // 6% increase for textiles
                'spices': 1.10   // 10% increase for spices
            };
            
            const adjustment = adjustments[product.category] || 1.05;
            const oldPrice = product.price;
            product.price = Math.round(product.price * adjustment);
            
            if (oldPrice !== product.price) {
                this.log(`📈 ${product.name}: R${oldPrice} → R${product.price} (+${Math.round((adjustment-1)*100)}%)`);
                changes++;
            }
        });
        
        if (changes > 0) {
            this.updateRealDatabase();
            this.log(`✅ ${changes} product prices updated`);
        } else {
            this.log('ℹ️ No price changes needed');
        }
    }

    updateRealDatabase() {
        // This is where we would save to your actual database
        // For now, we'll update the global variable and log it
        window.exportProducts = this.products;
        
        this.log('💾 Database updated with current changes');
        this.log(`📊 Current inventory: ${this.products.length} products`);
        
        // In a real system, you would save to localStorage or make an API call
        try {
            localStorage.setItem('afritrade_products', JSON.stringify(this.products));
            this.log('✅ Changes saved to browser storage');
        } catch (e) {
            this.log('⚠️ Changes not persisted (localStorage unavailable)');
        }
    }

    // BUSINESS INTELLIGENCE WITH REAL DATA
    aiSalesReport() {
        this.log('📊 GENERATING REAL BUSINESS REPORT...');
        this.log('================================');
        this.log(`Total Products: ${this.products.length}`);
        this.log(`Categories: ${new Set(this.products.map(p => p.category)).size}`);
        this.log(`Suppliers: ${new Set(this.products.map(p => p.supplier)).size}`);
        this.log(`Average Price: R${this.getAveragePrice()}`);
        this.log(`Price Range: R${this.getMinPrice()} - R${this.getMaxPrice()}`);
        this.log(`Total Inventory Value: R${this.getTotalValue().toLocaleString()}`);
        this.log('================================');
        
        // Category breakdown
        this.log('\n📈 CATEGORY BREAKDOWN:');
        const categories = this.products.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});
        
        Object.entries(categories).forEach(([category, count]) => {
            this.log(`  ${this.getCategoryEmoji(category)} ${category}: ${count} products`);
        });
    }

    getCategoryEmoji(category) {
        const emojis = {
            'wine': '🍷', 'fruits': '🍋', 'crafts': '💎', 
            'textiles': '🧥', 'spices': '🌶️'
        };
        return emojis[category] || '📦';
    }

    getAveragePrice() {
        return Math.round(this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length);
    }

    getMinPrice() {
        return Math.min(...this.products.map(p => p.price));
    }

    getMaxPrice() {
        return Math.max(...this.products.map(p => p.price));
    }

    getTotalValue() {
        return this.products.reduce((sum, p) => sum + (p.price * p.minOrder), 0);
    }

    aiMarketAnalysis() {
        this.log('🌍 ANALYZING REAL EXPORT MARKETS...');
        
        // Analyze export markets from real data
        const markets = new Set();
        this.products.forEach(product => {
            if (product.exportMarkets) {
                product.exportMarkets.forEach(market => markets.add(market));
            }
        });
        
        this.log(`Active Export Markets: ${Array.from(markets).join(', ')}`);
        
        // Market opportunities
        const allMarkets = ['EU', 'China', 'USA', 'Middle East', 'UK', 'Japan', 'Australia'];
        const missingMarkets = allMarkets.filter(market => !markets.has(market));
        
        if (missingMarkets.length > 0) {
            this.log(`💡 EXPANSION OPPORTUNITIES: ${missingMarkets.join(', ')}`);
        }
    }

    generateRealSuggestions() {
        const suggestions = document.getElementById('aiSuggestions');
        if (!suggestions) return;

        // Generate suggestions based on real data
        const realSuggestions = [
            `🚀 **Growth**: You have ${this.products.length} products across ${new Set(this.products.map(p => p.category)).size} categories`,
            `💰 **Revenue**: Total inventory value: R${this.getTotalValue().toLocaleString()}`,
            `📈 **Pricing**: Average product price: R${this.getAveragePrice()}`,
            `🌍 **Markets**: Consider expanding to untapped export markets`,
            `📦 **Inventory**: ${this.getLowStockProducts().length} products with low MOQ`
        ];

        suggestions.innerHTML = realSuggestions.map(s => `<p>${s}</p>`).join('');
    }

    getLowStockProducts() {
        return this.products.filter(p => p.minOrder < 50);
    }

    // COMMAND EXECUTION
    executeAICommand() {
        const commandInput = document.getElementById('aiCommand');
        if (!commandInput) return;
        
        const command = commandInput.value.toLowerCase();
        this.log(`🎯 EXECUTING: ${command}`);
        
        if (command.includes('add') && command.includes('product')) {
            this.aiAddProduct();
        } else if (command.includes('edit') && command.includes('product')) {
            this.aiEditProducts();
        } else if (command.includes('remove') && command.includes('product')) {
            this.aiRemoveProduct();
        } else if (command.includes('price') || command.includes('update price')) {
            this.aiUpdatePrices();
        } else if (command.includes('report') || command.includes('sales')) {
            this.aiSalesReport();
        } else if (command.includes('analyze') || command.includes('market')) {
            this.aiMarketAnalysis();
        } else if (command.includes('backup')) {
            this.aiBackupSystem();
        } else if (command.includes('help')) {
            this.showHelp();
        } else {
            this.log('❌ Command not recognized. Try: "add product", "edit product", "update prices", "sales report", "market analysis"');
        }
        
        commandInput.value = '';
    }

    showHelp() {
        this.log('🆘 AVAILABLE COMMANDS:');
        this.log('  "add product" - Add new product');
        this.log('  "edit product" - Edit existing product');
        this.log('  "remove product" - Delete product');
        this.log('  "update prices" - Smart price adjustment');
        this.log('  "sales report" - Business intelligence');
        this.log('  "market analysis" - Export market insights');
        this.log('  "backup system" - Save current data');
    }

    aiBackupSystem() {
        this.log('💾 Creating REAL system backup...');
        const backup = {
            timestamp: new Date().toISOString(),
            products: this.products,
            stats: {
                totalProducts: this.products.length,
                categories: new Set(this.products.map(p => p.category)).size,
                suppliers: new Set(this.products.map(p => p.supplier)).size,
                totalValue: this.getTotalValue()
            }
        };
        
        try {
            localStorage.setItem('afritrade_backup', JSON.stringify(backup));
            this.log('✅ REAL backup created and saved');
            this.log(`📦 Backup contains ${this.products.length} products`);
        } catch (e) {
            this.log('❌ Backup failed: ' + e.message);
        }
    }
}

function startAICEO() {
    console.log('🎯 Starting AI CEO with real product data...');
    window.realAICEO = new RealAICEO();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAICEO();
});

// Global functions for button clicks
function aiAddProduct() { 
    if (window.realAICEO) window.realAICEO.aiAddProduct(); 
    else console.log('AI CEO not ready yet');
}
function aiEditProducts() { window.realAICEO?.aiEditProducts(); }
function aiRemoveProduct() { window.realAICEO?.aiRemoveProduct(); }
function aiUpdatePrices() { window.realAICEO?.aiUpdatePrices(); }
function aiSalesReport() { window.realAICEO?.aiSalesReport(); }
function aiMarketAnalysis() { window.realAICEO?.aiMarketAnalysis(); }
function aiBackupSystem() { window.realAICEO?.aiBackupSystem(); }
function executeAICommand() { window.realAICEO?.executeAICommand(); }
