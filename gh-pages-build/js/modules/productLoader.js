class ProductLoader {
    constructor() {
        this.products = [];
        this.categories = new Set();
        this.loading = false;
    }

    async loadProducts() {
        this.loading = true;
        try {
            console.log('🔄 Loading products from backend...');
            this.products = await API_CONFIG.getAllProducts();
            this.extractCategories();
            console.log(`✅ Loaded ${this.products.length} products`);
            return this.products;
        } catch (error) {
            console.error('Failed to load products:', error);
            return [];
        } finally {
            this.loading = false;
        }
    }

    extractCategories() {
        this.categories = new Set(this.products.map(p => p.category));
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(p => p.id === parseInt(id));
    }

    getProductsByCategory(category) {
        return this.products.filter(p => p.category === category);
    }

    getCategories() {
        return Array.from(this.categories);
    }

    searchProducts(query) {
        const lowerQuery = query.toLowerCase();
        return this.products.filter(p => 
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        );
    }
}

// Create global instance
window.productLoader = new ProductLoader();
