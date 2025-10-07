// Simple test script
console.log("TEST: Products script loaded!");

document.addEventListener('DOMContentLoaded', function() {
    console.log("TEST: DOM loaded!");
    
    const container = document.getElementById('productsContainer');
    if (container) {
        console.log("TEST: Container found!");
        container.innerHTML = '<div style="background: green; color: white; padding: 20px;">TEST: JavaScript is working! Products would load here.</div>';
    } else {
        console.log("TEST: Container NOT found!");
    }
});
