class ProductLoader {
    constructor() {
        this.productsGrid = document.getElementById('productsGrid');
    }

    async loadProducts() {
        try {
            // For now, use local data - will switch to API later
            const products = productsData.products;
            this.displayProducts(products);
        } catch (error) {
            console.error('Error loading products:', error);
            this.displayError();
        }
    }

    displayProducts(products) {
        if (!this.productsGrid) return;

        this.productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-description">${product.description}</p>
                    <button class="btn btn-block add-to-cart" data-id="${product.id}">
                        Add to Cart
                    </button>
                    <a href="products/product${product.id}.html" class="btn btn-outline btn-block">
                        View Details
                    </a>
                </div>
            </div>
        `).join('');

        this.attachEventListeners();
    }

    attachEventListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                cartManager.addToCart(productId);
            });
        });
    }

    displayError() {
        if (this.productsGrid) {
            this.productsGrid.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Unable to load products. Please try again later.</p>
                </div>
            `;
        }
    }
}
