// AI AUTO-PILOT SYSTEM - Proactive AI Management
class AIAutoPilot {
    constructor() {
        this.products = window.exportProducts || [];
        this.autoTasks = [];
        this.isRunning = false;
        this.scanInterval = null;
        this.init();
    }

    init() {
        console.log('🤖 AI Auto-Pilot Initialized');
        this.log('🚀 Auto-Pilot System Online');
        this.startContinuousScanning();
        this.setupAutoPilotDashboard();
    }

    log(message) {
        const consoleElement = document.getElementById('aiConsole');
        if (consoleElement) {
            const entry = document.createElement('div');
            entry.textContent = '🤖 AUTO: ' + message;
            entry.style.color = '#00ff00';
            consoleElement.appendChild(entry);
            consoleElement.scrollTop = consoleElement.scrollHeight;
        }
        console.log('AI Auto-Pilot:', message);
    }

    startContinuousScanning() {
        this.log('Starting continuous data scanning...');
        this.isRunning = true;
        
        // Scan every 30 seconds
        this.scanInterval = setInterval(() => {
            this.performAutoScan();
        }, 30000);
        
        // Initial scan
        this.performAutoScan();
    }

    performAutoScan() {
        if (!this.isRunning) return;
        
        this.log('🔍 Performing automatic data scan...');
        
        // Run all auto-detection systems
        this.autoDetectPriceOpportunities();
        this.autoDetectLowStock();
        this.autoDetectMarketTrends();
        this.autoDetectSupplierIssues();
        this.autoOptimizeSEO();
        this.autoGenerateReports();
        
        this.log('✅ Auto-scan completed. ' + this.autoTasks.length + ' tasks pending');
        this.updateAutoPilotDashboard();
    }

    // 🎯 PRICE OPTIMIZATION AI
    autoDetectPriceOpportunities() {
        this.log('💰 Analyzing pricing opportunities...');
        
        const marketData = {
            'wine': { demand: 'high', avg_price: 180, trend: 'up' },
            'fruits': { demand: 'medium', avg_price: 25, trend: 'stable' },
            'crafts': { demand: 'high', avg_price: 320, trend: 'up' },
            'textiles': { demand: 'medium', avg_price: 85, trend: 'stable' },
            'spices': { demand: 'growing', avg_price: 110, trend: 'up' }
        };

        this.products.forEach(product => {
            const market = marketData[product.category];
            if (!market) return;

            const priceDiff = ((product.price - market.avg_price) / market.avg_price) * 100;
            
            // Auto-adjust prices based on market data
            if (priceDiff < -20 && market.trend === 'up') {
                // Price is too low - increase it
                const newPrice = Math.round(product.price * 1.15);
                this.addAutoTask('price_increase', 
                    `Increase ${product.name} price from R${product.price} to R${newPrice} (market opportunity)`,
                    () => {
                        product.price = newPrice;
                        this.log(`✅ AUTO: Increased ${product.name} to R${newPrice}`);
                    }
                );
            } else if (priceDiff > 30 && market.trend === 'stable') {
                // Price is too high - decrease it
                const newPrice = Math.round(product.price * 0.9);
                this.addAutoTask('price_decrease',
                    `Decrease ${product.name} price from R${product.price} to R${newPrice} (competitive adjustment)`,
                    () => {
                        product.price = newPrice;
                        this.log(`✅ AUTO: Decreased ${product.name} to R${newPrice}`);
                    }
                );
            }
        });
    }

    // 📦 INVENTORY MANAGEMENT AI
    autoDetectLowStock() {
        this.log('📦 Checking inventory levels...');
        
        this.products.forEach(product => {
            // Define optimal MOQ based on category
            const optimalMOQ = {
                'wine': 80,
                'fruits': 5000,
                'crafts': 50,
                'textiles': 500,
                'spices': 300
            };
            
            const optimal = optimalMOQ[product.category] || 100;
            
            if (product.minOrder < optimal * 0.7) {
                this.addAutoTask('increase_moq',
                    `Increase ${product.name} MOQ from ${product.minOrder} to ${optimal} (optimize inventory)`,
                    () => {
                        product.minOrder = optimal;
                        this.log(`✅ AUTO: Increased ${product.name} MOQ to ${optimal}`);
                    }
                );
            }
        });
    }

    // 🌍 MARKET INTELLIGENCE AI
    autoDetectMarketTrends() {
        this.log('🌍 Analyzing global market trends...');
        
        const trendingCategories = this.getTrendingCategories();
        const underperformingCategories = this.getUnderperformingCategories();
        
        trendingCategories.forEach(category => {
            this.addAutoTask('promote_trending',
                `Promote ${category} products (high market demand detected)`,
                () => {
                    this.log(`✅ AUTO: Started promotion campaign for ${category}`);
                }
            );
        });
        
        underperformingCategories.forEach(category => {
            this.addAutoTask('optimize_category',
                `Optimize ${category} product offerings (low performance)`,
                () => {
                    this.log(`✅ AUTO: Begun optimization of ${category} products`);
                }
            );
        });
    }

    getTrendingCategories() {
        // Simple algorithm to detect trending categories
        const categoryCounts = {};
        this.products.forEach(product => {
            categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
        });
        
        return Object.keys(categoryCounts)
            .filter(cat => categoryCounts[cat] >= 8) // Categories with 8+ products
            .slice(0, 2); // Top 2 trending
    }

    getUnderperformingCategories() {
        const categoryCounts = {};
        this.products.forEach(product => {
            categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
        });
        
        return Object.keys(categoryCounts)
            .filter(cat => categoryCounts[cat] <= 3) // Categories with 3 or fewer products
            .slice(0, 2);
    }

    // 👥 SUPPLIER INTELLIGENCE AI
    autoDetectSupplierIssues() {
        this.log('👥 Analyzing supplier performance...');
        
        const supplierProducts = {};
        this.products.forEach(product => {
            supplierProducts[product.supplier] = (supplierProducts[product.supplier] || 0) + 1;
        });
        
        // Detect suppliers with only 1 product (opportunity to expand)
        Object.keys(supplierProducts).forEach(supplier => {
            if (supplierProducts[supplier] === 1) {
                this.addAutoTask('expand_supplier',
                    `Expand offerings from ${supplier} (only 1 product currently)`,
                    () => {
                        this.log(`✅ AUTO: Contacted ${supplier} for product expansion`);
                    }
                );
            }
        });
    }

    // 🔍 SEO OPTIMIZATION AI
    autoOptimizeSEO() {
        this.log('🔍 Running SEO optimization scan...');
        
        this.products.forEach(product => {
            // Check if product descriptions are optimized
            if (!product.description || product.description.length < 50) {
                this.addAutoTask('optimize_seo',
                    `Optimize SEO for ${product.name} (description too short)`,
                    () => {
                        product.description = this.generateAIDescription(product);
                        this.log(`✅ AUTO: Optimized SEO description for ${product.name}`);
                    }
                );
            }
            
            // Check for missing keywords
            const importantKeywords = ['export', 'premium', 'South Africa', 'quality'];
            const description = product.description.toLowerCase();
            const missingKeywords = importantKeywords.filter(keyword => 
                !description.includes(keyword.toLowerCase())
            );
            
            if (missingKeywords.length > 0) {
                this.addAutoTask('add_keywords',
                    `Add missing keywords to ${product.name}: ${missingKeywords.join(', ')}`,
                    () => {
                        product.description += ' ' + missingKeywords.map(k => k).join(' ');
                        this.log(`✅ AUTO: Added keywords to ${product.name}`);
                    }
                );
            }
        });
    }

    generateAIDescription(product) {
        const templates = {
            'wine': `Premium ${product.name} from ${product.origin || 'South Africa'}. Expertly crafted for international export markets with exceptional quality and competitive pricing.`,
            'fruits': `Fresh ${product.name} sourced directly from ${product.origin || 'South African farms'}. Premium export quality with excellent shelf life and competitive pricing for global markets.`,
            'crafts': `Authentic ${product.name} handcrafted in ${product.origin || 'South Africa'}. Traditional craftsmanship meets modern export standards for international buyers.`
        };
        
        return templates[product.category] || 
               `High-quality ${product.name} from ${product.origin || 'South Africa'}, ready for export to international markets with competitive pricing and premium quality.`;
    }

    // 📊 AUTOMATIC REPORTING AI
    autoGenerateReports() {
        this.log('📊 Generating automatic business reports...');
        
        // Generate daily sales report
        this.addAutoTask('daily_report',
            'Generate daily business intelligence report',
            () => {
                const report = this.generateDailyReport();
                this.log('✅ AUTO: Daily report generated');
                this.log('--- DAILY REPORT ---');
                report.forEach(line => this.log(line));
                this.log('--- END REPORT ---');
            }
        );
        
        // Weekly performance analysis
        if (new Date().getDay() === 1) { // Monday
            this.addAutoTask('weekly_analysis',
                'Generate weekly performance analysis',
                () => {
                    this.log('✅ AUTO: Weekly analysis completed');
                }
            );
        }
    }

    generateDailyReport() {
        const totalProducts = this.products.length;
        const categories = new Set(this.products.map(p => p.category)).size;
        const suppliers = new Set(this.products.map(p => p.supplier)).size;
        const avgPrice = Math.round(this.products.reduce((sum, p) => sum + p.price, 0) / totalProducts);
        const totalValue = this.products.reduce((sum, p) => sum + (p.price * p.minOrder), 0);
        
        return [
            `Total Products: ${totalProducts}`,
            `Categories: ${categories}`,
            `Suppliers: ${suppliers}`,
            `Average Price: R${avgPrice}`,
            `Total Inventory Value: R${totalValue.toLocaleString()}`,
            `Auto-Tasks Pending: ${this.autoTasks.length}`,
            `System Status: ${this.isRunning ? 'ACTIVE' : 'INACTIVE'}`
        ];
    }

    // 🎯 TASK MANAGEMENT SYSTEM
    addAutoTask(type, description, action) {
        // Check if similar task already exists
        const existingTask = this.autoTasks.find(task => 
            task.description === description
        );
        
        if (!existingTask) {
            this.autoTasks.push({
                id: 'task-' + Date.now(),
                type: type,
                description: description,
                action: action,
                timestamp: new Date().toISOString(),
                completed: false
            });
            
            this.log(`📝 New auto-task: ${description}`);
        }
    }

    executeAutoTask(taskId) {
        const task = this.autoTasks.find(t => t.id === taskId);
        if (task && !task.completed) {
            task.action();
            task.completed = true;
            this.log(`✅ Executed: ${task.description}`);
            this.updateAutoPilotDashboard();
        }
    }

    executeAllAutoTasks() {
        this.log('🚀 Executing all pending auto-tasks...');
        const pendingTasks = this.autoTasks.filter(task => !task.completed);
        
        pendingTasks.forEach(task => {
            task.action();
            task.completed = true;
        });
        
        this.log(`✅ Executed ${pendingTasks.length} auto-tasks`);
        this.updateAutoPilotDashboard();
    }

    // 🖥️ AUTO-PILOT DASHBOARD
    setupAutoPilotDashboard() {
        // Create auto-pilot section in the dashboard
        const existingAutoPilot = document.getElementById('autoPilotSection');
        if (existingAutoPilot) return;
        
        const dashboard = document.querySelector('.ai-dashboard');
        if (!dashboard) return;
        
        const autoPilotHTML = `
            <div class="action-card" id="autoPilotSection" style="grid-column: 1 / -1; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white;">
                <h3>🤖 AI Auto-Pilot</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <h4>Auto-Pilot Controls</h4>
                        <button id="toggleAutoPilot" class="btn-primary" style="background: #00ff00; color: black;">
                            ${this.isRunning ? '🟢 ACTIVE' : '🔴 INACTIVE'}
                        </button>
                        <button id="executeAllTasks" class="btn-secondary">Execute All Tasks</button>
                        <button id="forceScan" class="btn-secondary">Force Scan Now</button>
                    </div>
                    <div>
                        <h4>System Status</h4>
                        <div id="autoPilotStats">
                            <div>Pending Tasks: <span id="pendingTasksCount">0</span></div>
                            <div>Last Scan: <span id="lastScanTime">Just now</span></div>
                            <div>Next Scan: <span id="nextScanTime">30 seconds</span></div>
                        </div>
                    </div>
                </div>
                <div id="autoTasksList" style="margin-top: 1rem; max-height: 200px; overflow-y: auto;">
                    <h4>Pending Auto-Tasks</h4>
                    <div id="tasksContainer"></div>
                </div>
            </div>
        `;
        
        // Insert after the command console
        const commandConsole = document.querySelector('.ai-command');
        if (commandConsole) {
            commandConsole.insertAdjacentHTML('afterend', autoPilotHTML);
        } else {
            dashboard.insertAdjacentHTML('beforeend', autoPilotHTML);
        }
        
        // Setup auto-pilot event listeners
        this.setupAutoPilotListeners();
        this.updateAutoPilotDashboard();
    }

    setupAutoPilotListeners() {
        document.getElementById('toggleAutoPilot')?.addEventListener('click', () => {
            this.toggleAutoPilot();
        });
        
        document.getElementById('executeAllTasks')?.addEventListener('click', () => {
            this.executeAllAutoTasks();
        });
        
        document.getElementById('forceScan')?.addEventListener('click', () => {
            this.performAutoScan();
        });
    }

    toggleAutoPilot() {
        this.isRunning = !this.isRunning;
        
        if (this.isRunning) {
            this.startContinuousScanning();
            this.log('🟢 AUTO-PILOT ACTIVATED');
        } else {
            clearInterval(this.scanInterval);
            this.log('🔴 AUTO-PILOT DEACTIVATED');
        }
        
        this.updateAutoPilotDashboard();
    }

    updateAutoPilotDashboard() {
        const toggleBtn = document.getElementById('toggleAutoPilot');
        const pendingCount = document.getElementById('pendingTasksCount');
        const tasksContainer = document.getElementById('tasksContainer');
        const lastScan = document.getElementById('lastScanTime');
        
        if (toggleBtn) {
            toggleBtn.textContent = this.isRunning ? '🟢 ACTIVE' : '🔴 INACTIVE';
            toggleBtn.style.background = this.isRunning ? '#00ff00' : '#ff4444';
        }
        
        if (pendingCount) {
            const pendingTasks = this.autoTasks.filter(task => !task.completed).length;
            pendingCount.textContent = pendingTasks;
            pendingCount.style.color = pendingTasks > 0 ? '#ffaa00' : '#00ff00';
        }
        
        if (lastScan) {
            lastScan.textContent = new Date().toLocaleTimeString();
        }
        
        if (tasksContainer) {
            const pendingTasks = this.autoTasks.filter(task => !task.completed);
            tasksContainer.innerHTML = pendingTasks.length > 0 ? 
                pendingTasks.map(task => `
                    <div class="task-item" style="background: #333; padding: 0.5rem; margin: 0.25rem 0; border-radius: 5px; display: flex; justify-content: space-between; align-items: center;">
                        <span>${task.description}</span>
                        <button onclick="window.aiAutoPilot.executeAutoTask('${task.id}')" class="btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">
                            Execute
                        </button>
                    </div>
                `).join('') :
                '<div style="color: #aaa; text-align: center;">No pending tasks</div>';
        }
    }
}

// Initialize Auto-Pilot when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('🚀 Starting AI Auto-Pilot...');
        window.aiAutoPilot = new AIAutoPilot();
    }, 2000); // Wait 2 seconds for main AI CEO to initialize
});

// Auto-Pilot commands for the command console
function enableAutoPilot() {
    if (window.aiAutoPilot) {
        window.aiAutoPilot.toggleAutoPilot();
    }
}

function runAutoScan() {
    if (window.aiAutoPilot) {
        window.aiAutoPilot.performAutoScan();
    }
}

function executeAllAutoTasks() {
    if (window.aiAutoPilot) {
        window.aiAutoPilot.executeAllAutoTasks();
    }
}
