const API_CONFIG = {
    BASE_URL: 'http://localhost:3001/api',
    ENDPOINTS: {
        PRODUCTS: '/products',
        PRODUCT_BY_ID: '/products/:id',
        PRODUCTS_BY_CATEGORY: '/products/category/:category'
    },

    // Enhanced API methods for JSON backend
    async request(endpoint, options = {}) {
        const url = `${this.BASE_URL}${endpoint}`;
        try {
            console.log(`🔄 API Call: ${url}`);
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Handle our JSON backend response format
            if (data.success === false) {
                throw new Error(data.error || 'API request failed');
            }
            
            return data.data || data;
        } catch (error) {
            console.error('❌ API request failed:', error);
            // Fallback to local data if backend is down
            console.log('🔄 Falling back to local data...');
            throw error;
        }
    },

    // Product methods
    async getAllProducts() {
        try {
            const response = await this.request(this.ENDPOINTS.PRODUCTS);
            return response.products || response;
        } catch (error) {
            // Fallback to local products
            return this.getLocalProducts();
        }
    },

    async getProductById(id) {
        try {
            const response = await this.request(this.ENDPOINTS.PRODUCTS + '/' + id);
            return response.product || response;
        } catch (error) {
            // Fallback to local product
            const localProducts = this.getLocalProducts();
            return localProducts.find(p => p.id === parseInt(id)) || null;
        }
    },

    async getProductsByCategory(category) {
        try {
            const response = await this.request(`${this.ENDPOINTS.PRODUCTS}/category/${category}`);
            return response.products || response;
        } catch (error) {
            // Fallback to local filtering
            const localProducts = this.getLocalProducts();
            return localProducts.filter(p => p.category === category);
        }
    },

    // Local fallback data
    getLocalProducts() {
        return [
            {
                id: 1,
                name: "Wireless Bluetooth Headphones",
                price: 79.99,
                description: "High-quality wireless headphones with noise cancellation",
                category: "Electronics",
                image: "https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=Headphones",
                stock: 15,
                features: ["Noise Cancellation", "30hr Battery", "Fast Charging"]
            },
            {
                id: 2,
                name: "Smart Fitness Watch",
                price: 199.99,
                description: "Advanced fitness tracking with heart rate monitoring",
                category: "Electronics",
                image: "https://via.placeholder.com/300x300/50E3C2/FFFFFF?text=Smart+Watch",
                stock: 8,
                features: ["Heart Rate Monitor", "GPS", "Water Resistant"]
            }
        ];
    }
};

// Make it globally available
window.API_CONFIG = API_CONFIG;

// Initialize when loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ MCStoreHold API Config Loaded');
    console.log('🌐 Backend URL:', API_CONFIG.BASE_URL);
});
