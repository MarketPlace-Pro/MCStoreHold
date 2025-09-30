// Products data module - now uses real API
class ProductService {
    constructor() {
        this.products = [];
        this.loading = false;
    }

    async loadProducts() {
        this.loading = true;
        try {
            const response = await API_CONFIG.getAllProducts();
            this.products = response.products || [];
            return this.products;
        } catch (error) {
            console.error('Failed to load products from API:', error);
            // Fallback to local data if API fails
            return this.getLocalProducts();
        } finally {
            this.loading = false;
        }
    }

    async getProductById(id) {
        try {
            const response = await API_CONFIG.getProductById(id);
            return response.product;
        } catch (error) {
            console.error('Failed to fetch product:', error);
            return this.products.find(p => p.id === parseInt(id));
        }
    }

    getLocalProducts() {
        // Fallback data
        return [
            {
                id: 1,
                name: "Wireless Bluetooth Headphones",
                price: 79.99,
                description: "High-quality wireless headphones with noise cancellation",
                category: "Electronics",
                image: "https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=Headphones",
                stock: 15
            }
        ];
    }

    getProductsByCategory(category) {
        return this.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
}

// Create global instance
window.productService = new ProductService();
