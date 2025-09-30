#!/bin/bash
echo "🎨 Deploying MCStoreHold Frontend to GitHub Pages"

# Create production build
rm -rf gh-pages-build
mkdir -p gh-pages-build

# Copy all frontend files
echo "📁 Copying files..."
cp -r *.html css/ js/ images/ products/ account/ cart/ api/ gh-pages-build/

# Create a simple production API config that will be updated later
cat > gh-pages-build/js/api/config.js << 'CONFIGEOF'
// Production API Configuration - UPDATE WITH YOUR RAILWAY URL
const API_CONFIG = {
    BASE_URL: 'https://mcstorehold-backend.railway.app/api',
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
            // Fallback to local data
            return this.getLocalProducts();
        }
    },

    async getAllProducts() {
        try {
            const response = await this.request(this.ENDPOINTS.PRODUCTS);
            return response.products || response;
        } catch (error) {
            return this.getLocalProducts();
        }
    },

    async getProductById(id) {
        try {
            const response = await this.request(this.ENDPOINTS.PRODUCTS + '/' + id);
            return response.product || response;
        } catch (error) {
            const localProducts = this.getLocalProducts();
            return localProducts.find(p => p.id === parseInt(id)) || null;
        }
    },

    async getProductsByCategory(category) {
        try {
            const response = await this.request(`${this.ENDPOINTS.PRODUCTS}/category/${category}`);
            return response.products || response;
        } catch (error) {
            const localProducts = this.getLocalProducts();
            return localProducts.filter(p => p.category === category);
        }
    },

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

window.API_CONFIG = API_CONFIG;
CONFIGEOF

# Create README for GitHub Pages
cat > gh-pages-build/README.md << 'READMEEOF'
# MCStoreHold E-commerce Website

Live Demo: https://your-username.github.io/MCStoreHold

## Features
- 🛍️ Product Catalog
- 🛒 Shopping Cart
- 👤 User Authentication
- 📦 Order Management
- 📱 Responsive Design

## Backend API
- API URL: https://mcstorehold-backend.railway.app
- Documentation: https://mcstorehold-backend.railway.app

## Technology Stack
- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express, JSON Database
- Deployment: GitHub Pages + Railway
READMEEOF

echo "✅ Production build created in gh-pages-build/"
echo ""
echo "📋 GitHub Pages Deployment Steps:"
echo "1. Create GitHub repository: MCStoreHold"
echo "2. Copy gh-pages-build contents to repository"
echo "3. Go to Settings → Pages"
echo "4. Set source to 'Deploy from branch'"
echo "5. Select main branch / (root) folder"
echo "6. Your site will be at: https://your-username.github.io/MCStoreHold"
echo ""
echo "💡 Don't forget to update the API_BASE_URL in config.js with your actual Railway URL!"
