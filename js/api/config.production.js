// Production API Configuration
// Update this with your actual Railway URL after deployment
const API_CONFIG = {
    BASE_URL: 'https://your-app-name.railway.app/api',
    ENDPOINTS: {
        PRODUCTS: '/products',
        PRODUCT_BY_ID: '/products/:id',
        PRODUCTS_BY_CATEGORY: '/products/category/:category'
    },

    async request(endpoint, options = {}) {
        const url = `${this.BASE_URL}${endpoint}`;
        try {
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
            
            if (data.success === false) {
                throw new Error(data.error || 'API request failed');
            }
            
            return data.data || data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    },

    async getAllProducts() {
        const response = await this.request(this.ENDPOINTS.PRODUCTS);
        return response.products || response;
    },

    async getProductById(id) {
        const response = await this.request(this.ENDPOINTS.PRODUCTS + '/' + id);
        return response.product || response;
    },

    async getProductsByCategory(category) {
        const response = await this.request(`${this.ENDPOINTS.PRODUCTS}/category/${category}`);
        return response.products || response;
    }
};

window.API_CONFIG = API_CONFIG;
