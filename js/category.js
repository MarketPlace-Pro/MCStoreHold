// Category page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCategoryProducts();
});

function loadCategoryProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if (!category) {
        window.location.href = 'categories.html';
        return;
    }
    
    // Update page title and header
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryName = document.getElementById('categoryName');
    const categoryDescription = document.getElementById('categoryDescription');
    
    const categoryData = getCategoryData(category);
    
    document.title = `${categoryData.name} - MCStoreHold`;
    categoryTitle.textContent = categoryData.name;
    categoryName.textContent = categoryData.name;
    categoryDescription.textContent = categoryData.description;
    
    // Load products for this category
    const products = getProductsByCategory(category);
    displayCategoryProducts(products);
}

function getCategoryData(category) {
    const categories = {
        electronics: {
            name: "Electronics",
            description: "Latest gadgets, smartphones, laptops, and tech accessories"
        },
        clothing: {
            name: "Fashion & Clothing",
            description: "Stylish clothing for men, women, and kids"
        },
        home: {
            name: "Home & Garden",
            description: "Furniture, home decor, kitchenware, and garden supplies"
        },
        sports: {
            name: "Sports & Outdoors",
            description: "Fitness equipment, outdoor gear, and sports accessories"
        },
        books: {
            name: "Books & Media",
            description: "Books, movies, music, and games for all ages"
        },
        beauty: {
            name: "Beauty & Health",
            description: "Skincare, makeup, and health products"
        },
        toys: {
            name: "Toys & Games",
            description: "Toys, board games, and video games"
        },
        automotive: {
            name: "Automotive",
            description: "Car accessories, tools, and parts"
        }
    };
    
    return categories[category] || { name: category, description: "Browse our products" };
}

function displayCategoryProducts(products) {
    const container = document.getElementById('categoryProducts');
    
    if (products.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>No products found in this category</h3>
                <p>Check back later for new arrivals!</p>
                <button onclick="location.href='categories.html'" class="cta-button">Browse All Categories</button>
            </div>
        `;
        return;
    }
    
    const productsHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}" data-id="${product.id}" data-price="${product.priceValue || parseFloat(product.price.replace('$', ''))}" data-rating="${product.rating}" data-instock="${product.inStock}">
            ${product.originalPrice ? `<div class="sale-badge">Sale</div>` : ''}
            ${!product.inStock ? `<div class="sale-badge" style="background: #666;">Out of Stock</div>` : ''}
            <img src="${product.image}" alt="${product.name}" onclick="viewProduct(${product.id})">
            <div class="product-info">
                <h3 onclick="viewProduct(${product.id})">${product.name}</h3>
                <div class="rating">
                    ${generateStarRating(product.rating)} 
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <div class="price-container">
                    ${product.originalPrice ? `
                        <span class="original-price">${product.originalPrice}</span>
                        <span class="price">${product.price}</span>
                    ` : `
                        <span class="price">${product.price}</span>
                    `}
                </div>
                <button class="add-to-cart-btn" 
                        onclick="addToCart(${product.id}, '${product.name.replace(/'/g, "\\'")}', '${product.price}', '${product.image}')"
                        ${!product.inStock ? 'disabled style="background: #ccc;"' : ''}>
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = productsHTML;
}

function sortProducts() {
    const sortValue = document.getElementById('sortFilter').value;
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        const aPrice = parseFloat(a.dataset.price);
        const bPrice = parseFloat(b.dataset.price);
        const aRating = parseFloat(a.dataset.rating);
        const bRating = parseFloat(b.dataset.rating);
        
        switch (sortValue) {
            case 'price-low':
                return aPrice - bPrice;
            case 'price-high':
                return bPrice - aPrice;
            case 'rating':
                return bRating - aRating;
            case 'newest':
                return b.dataset.id - a.dataset.id;
            default:
                return 0;
        }
    });
    
    const container = document.getElementById('categoryProducts');
    container.innerHTML = '';
    products.forEach(product => container.appendChild(product));
}

function filterByPrice() {
    const priceValue = document.getElementById('priceFilter').value;
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const price = parseFloat(product.dataset.price);
        let show = true;
        
        switch (priceValue) {
            case '0-50':
                show = price <= 50;
                break;
            case '50-100':
                show = price > 50 && price <= 100;
                break;
            case '100-200':
                show = price > 100 && price <= 200;
                break;
            case '200+':
                show = price > 200;
                break;
        }
        
        product.style.display = show ? 'block' : 'none';
    });
}

function filterInStock() {
    const inStockOnly = document.getElementById('inStockOnly').checked;
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (inStockOnly && product.dataset.instock === 'false') {
            product.style.display = 'none';
        } else {
            product.style.display = 'block';
        }
    });
}
