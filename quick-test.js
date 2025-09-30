const https = require('https');

async function testIntegration() {
    console.log('🧪 Testing Frontend-Backend Integration...\n');
    
    // Test 1: Backend health
    console.log('1. Testing Backend Health...');
    try {
        const health = await fetch('http://localhost:3000/api/health');
        const healthData = await health.json();
        console.log('   ✅ Backend:', healthData.data.message);
        console.log('   📊 Products in DB:', healthData.data.totalProducts);
    } catch (error) {
        console.log('   ❌ Backend offline:', error.message);
        return;
    }
    
    // Test 2: Products API
    console.log('\n2. Testing Products API...');
    try {
        const products = await fetch('http://localhost:3000/api/products');
        const productsData = await products.json();
        console.log('   ✅ Products loaded:', productsData.data.count);
        
        // Show categories
        const categories = [...new Set(productsData.data.products.map(p => p.category))];
        console.log('   🏷️  Categories:', categories.join(', '));
    } catch (error) {
        console.log('   ❌ Products API failed:', error.message);
    }
    
    // Test 3: Single product
    console.log('\n3. Testing Single Product...');
    try {
        const product = await fetch('http://localhost:3000/api/products/1');
        const productData = await product.json();
        console.log('   ✅ Product found:', productData.data.product.name);
    } catch (error) {
        console.log('   ❌ Single product failed:', error.message);
    }
    
    console.log('\n🎉 Integration Test Complete!');
    console.log('💡 Visit: http://localhost:8080/integration-test.html');
}

testIntegration();
