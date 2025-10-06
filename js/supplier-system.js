// Supplier Management System
class SupplierSystem {
    constructor() {
        this.suppliers = JSON.parse(localStorage.getItem('afritrade_suppliers')) || [];
        this.supplierProducts = JSON.parse(localStorage.getItem('afritrade_supplier_products')) || [];
        this.currentSupplier = JSON.parse(localStorage.getItem('current_supplier')) || null;
        this.init();
    }

    init() {
        console.log('🚀 Supplier System Initialized');
        this.updateSupplierStats();
        this.loadSupplierProducts();
        
        // Check if supplier is logged in
        if (this.currentSupplier) {
            this.showSupplierDashboard();
        }
    }

    // Supplier Registration
    registerSupplier(supplierData) {
        const newSupplier = {
            id: 'supplier-' + Date.now(),
            ...supplierData,
            status: 'pending',
            joinDate: new Date().toISOString(),
            rating: 0,
            totalSales: 0,
            products: []
        };

        this.suppliers.push(newSupplier);
        this.saveSuppliers();
        
        // Auto-login after registration
        this.loginSupplier(newSupplier.id);
        
        return newSupplier;
    }

    loginSupplier(supplierId) {
        this.currentSupplier = this.suppliers.find(s => s.id === supplierId);
        localStorage.setItem('current_supplier', JSON.stringify(this.currentSupplier));
        this.showSupplierDashboard();
    }

    // Product Management
    addSupplierProduct(productData) {
        const newProduct = {
            id: 'supplier-product-' + Date.now(),
            supplierId: this.currentSupplier.id,
            supplierName: this.currentSupplier.companyName,
            status: 'pending_review',
            createdAt: new Date().toISOString(),
            ...productData
        };

        this.supplierProducts.push(newProduct);
        this.saveSupplierProducts();
        this.loadSupplierProducts();
        
        return newProduct;
    }

    getSupplierProducts() {
        if (!this.currentSupplier) return [];
        return this.supplierProducts.filter(product => 
            product.supplierId === this.currentSupplier.id
        );
    }

    // Dashboard Functions
    updateSupplierStats() {
        const supplierProducts = this.getSupplierProducts();
        
        document.getElementById('supplierProductCount').textContent = supplierProducts.length;
        document.getElementById('supplierOrdersCount').textContent = this.getOrderCount();
        document.getElementById('supplierRevenue').textContent = 'R' + this.getTotalRevenue();
        document.getElementById('supplierRating').textContent = this.currentSupplier?.rating || '0.0';
    }

    getOrderCount() {
        // In real system, count orders for this supplier
        return Math.floor(Math.random() * 50);
    }

    getTotalRevenue() {
        // In real system, calculate actual revenue
        return (Math.random() * 100000).toFixed(0);
    }

    loadSupplierProducts() {
        const products = this.getSupplierProducts();
        const container = document.getElementById('myProductsList');
        
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = '<p>No products added yet.</p>';
            return;
        }

        container.innerHTML = products.map(product => `
            <div class="action-card" style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h4>${product.name}</h4>
                        <p>Category: ${product.category} | Price: R${product.price}/${product.unit}</p>
                        <p>MOQ: ${product.minOrder} | Status: <span style="color: ${product.status === 'approved' ? 'green' : 'orange'}">${product.status}</span></p>
                    </div>
                    <div>
                        <button onclick="editProduct('${product.id}')" class="btn-secondary">Edit</button>
                        <button onclick="deleteProduct('${product.id}')" class="btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Save data
    saveSuppliers() {
        localStorage.setItem('afritrade_suppliers', JSON.stringify(this.suppliers));
    }

    saveSupplierProducts() {
        localStorage.setItem('afritrade_supplier_products', JSON.stringify(this.supplierProducts));
    }

    showSupplierDashboard() {
        document.querySelector('.header-actions').innerHTML = `
            <span>Welcome, ${this.currentSupplier.companyName}</span>
            <button class="btn-secondary" onclick="supplierSystem.logout()">Logout</button>
        `;
    }

    logout() {
        this.currentSupplier = null;
        localStorage.removeItem('current_supplier');
        location.reload();
    }
}

// Global supplier system instance
window.supplierSystem = new SupplierSystem();

// UI Functions
function openAddProductForm() {
    document.getElementById('addProductForm').style.display = 'block';
}

function closeAddProductForm() {
    document.getElementById('addProductForm').style.display = 'none';
}

function viewMyProducts() {
    const section = document.getElementById('myProductsSection');
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
    supplierSystem.loadSupplierProducts();
}

function submitNewProduct(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get checkbox values
    const markets = [];
    if (document.getElementById('marketEU').checked) markets.push('EU');
    if (document.getElementById('marketUSA').checked) markets.push('USA');
    if (document.getElementById('marketChina').checked) markets.push('China');
    if (document.getElementById('marketMiddleEast').checked) markets.push('Middle East');
    
    const certifications = [];
    if (document.getElementById('certOrganic').checked) certifications.push('Organic');
    if (document.getElementById('certFairTrade').checked) certifications.push('Fair Trade');
    if (document.getElementById('certGlobalGAP').checked) certifications.push('GlobalGAP');
    
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        minOrder: parseInt(document.getElementById('productMOQ').value),
        unit: document.getElementById('productUnit').value,
        origin: document.getElementById('productOrigin').value,
        description: document.getElementById('productDescription').value,
        exportMarkets: markets,
        certification: certifications
    };
    
    supplierSystem.addSupplierProduct(productData);
    form.reset();
    closeAddProductForm();
    
    alert('Product submitted for review!');
}

function openSupplierLogin() {
    const email = prompt('Enter your supplier email:');
    // In real system, verify credentials
    alert('Login functionality coming soon!');
}

function openRegistration() {
    const companyName = prompt('Enter your company name:');
    const email = prompt('Enter your email:');
    const category = prompt('Enter your main product category:');
    
    if (companyName && email) {
        supplierSystem.registerSupplier({
            companyName: companyName,
            email: email,
            category: category
        });
        alert('Registration successful! Welcome to AfriTrade Global.');
    }
}

// Demo supplier registration on page load
document.addEventListener('DOMContentLoaded', function() {
    // Auto-create demo supplier if none exists
    if (!supplierSystem.currentSupplier && supplierSystem.suppliers.length === 0) {
        const demoSupplier = supplierSystem.registerSupplier({
            companyName: 'Demo Supplier Co.',
            email: 'demo@supplier.com',
            category: 'wine'
        });
        console.log('Demo supplier created:', demoSupplier);
    }
});
