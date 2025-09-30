class APIClient {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    }

    // Product-specific methods
    async getProducts() {
        return await this.get('/api/products');
    }

    async getProduct(id) {
        return await this.get(`/api/products/${id}`);
    }

    // Cart-specific methods (for future backend integration)
    async syncCart(cartData) {
        return await this.post('/api/cart/sync', cartData);
    }
}

// Create global API client instance
const apiClient = new APIClient();
