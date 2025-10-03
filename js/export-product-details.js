// Product Details Page Functionality
let currentProduct = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeProductDetails();
});

function initializeProductDetails() {
    loadProductDetails();
    setupInquiryForm();
}

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'export-products.html';
        return;
    }
    
    // Find product in database
    currentProduct = exportProducts.find(product => product.id === productId);
    
    if (!currentProduct) {
        window.location.href = 'export-products.html';
        return;
    }
    
    // Update page content
    updateProductDetails();
    loadRelatedProducts();
}

function updateProductDetails() {
    if (!currentProduct) return;
    
    // Update basic info
    document.getElementById('productName').textContent = currentProduct.name;
    document.getElementById('productDescription').textContent = currentProduct.description;
    document.getElementById('productImage').src = currentProduct.image;
    document.getElementById('productImage').alt = currentProduct.name;
    
    // Update supplier
    document.getElementById('supplierBadge').textContent = `Supplier: ${currentProduct.supplier}`;
    
    // Update price and MOQ
    document.getElementById('productPrice').textContent = `R${currentProduct.price} / ${currentProduct.unit}`;
    document.getElementById('moqValue').textContent = `${currentProduct.minOrder} ${currentProduct.unit}s`;
    document.getElementById('moqTotal').textContent = `R${(currentProduct.price * currentProduct.minOrder).toLocaleString()}`;
    
    // Update specifications
    document.getElementById('productCategory').textContent = currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1);
    document.getElementById('productOrigin').textContent = currentProduct.origin;
    document.getElementById('productLeadTime').textContent = currentProduct.leadTime;
    document.getElementById('productShipping').textContent = currentProduct.shipping;
    document.getElementById('productUnit').textContent = currentProduct.unit;
    document.getElementById('productMarkets').textContent = currentProduct.exportMarkets.join(', ');
    
    // Update certifications
    const certBadges = document.getElementById('certificationBadges');
    certBadges.innerHTML = currentProduct.certification.map(cert => 
        `<span class="cert-badge">${cert}</span>`
    ).join('');
    
    // Update breadcrumbs
    document.getElementById('categoryBreadcrumb').textContent = currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1);
    document.getElementById('categoryBreadcrumb').href = `export-products.html?category=${currentProduct.category}`;
    document.getElementById('productBreadcrumb').textContent = currentProduct.name;
    
    // Update inquiry form product field
    document.getElementById('inquiryProduct').value = currentProduct.name;
}

function loadRelatedProducts() {
    if (!currentProduct) return;
    
    const relatedGrid = document.getElementById('relatedProductsGrid');
    if (!relatedGrid) return;
    
    // Get related products (same category, excluding current product)
    const relatedProducts = exportProducts
        .filter(product => product.category === currentProduct.category && product.id !== currentProduct.id)
        .slice(0, 4);
    
    if (relatedProducts.length === 0) return;
    
    relatedGrid.innerHTML = relatedProducts.map(product => `
        <div class="product-card export-product-card">
            <div class="moq-badge">MOQ: ${product.minOrder} ${product.unit}s</div>
            <img src="${product.image}" alt="${product.name}" onclick="viewProductDetails('${product.id}')">
            <div class="product-info">
                <h3 onclick="viewProductDetails('${product.id}')" style="cursor: pointer;">${product.name}</h3>
                <p class="supplier">By ${product.supplier}</p>
                
                <div class="product-markets">
                    ${product.exportMarkets.slice(0, 2).map(market => `<span class="market-tag">${market}</span>`).join('')}
                </div>
                
                <div class="product-price">
                    <span class="price">R${product.price}/${product.unit}</span>
                    <button onclick="viewProductDetails('${product.id}')" class="cta-button">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

function showInquiryForm() {
    const form = document.getElementById('inquiryForm');
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth' });
}

function setupInquiryForm() {
    const form = document.getElementById('exportInquiryForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitInquiry();
        });
    }
}

function submitInquiry() {
    if (!currentProduct) return;
    
    const formData = {
        product: document.getElementById('inquiryProduct').value,
        name: document.getElementById('inquiryName').value,
        company: document.getElementById('inquiryCompany').value,
        email: document.getElementById('inquiryEmail').value,
        phone: document.getElementById('inquiryPhone').value,
        country: document.getElementById('inquiryCountry').value,
        quantity: document.getElementById('inquiryQuantity').value,
        destination: document.getElementById('inquiryDestination').value,
        message: document.getElementById('inquiryMessage').value,
        timestamp: new Date().toISOString()
    };
    
    // Save inquiry to localStorage (in real app, this would go to backend)
    let inquiries = JSON.parse(localStorage.getItem('exportInquiries')) || [];
    inquiries.push(formData);
    localStorage.setItem('exportInquiries', JSON.stringify(inquiries));
    
    // Show success message
    alert('✅ Your export inquiry has been submitted! We will contact you within 24 hours.');
    
    // Reset form
    document.getElementById('exportInquiryForm').reset();
    
    // Hide form
    document.getElementById('inquiryForm').style.display = 'none';
}

function viewProductDetails(productId) {
    window.location.href = `export-product-details.html?id=${productId}`;
}
