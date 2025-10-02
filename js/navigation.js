// Global search function
function globalSearch() {
    const searchTerm = document.getElementById('globalSearch').value;
    if (searchTerm.trim()) {
        // Store search term for use on search results page
        localStorage.setItem('searchTerm', searchTerm);
        window.location.href = 'search.html?q=' + encodeURIComponent(searchTerm);
    }
}

// Initialize navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Make global search work on enter key
    const globalSearchInput = document.getElementById('globalSearch');
    if (globalSearchInput) {
        globalSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                globalSearch();
            }
        });
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = '#ffd700';
            link.style.fontWeight = 'bold';
        }
    });
});

// Utility functions for e-commerce
const EcommerceUtils = {
    formatPrice(price) {
        return typeof price === 'number' ? `$${price.toFixed(2)}` : price;
    },
    
    calculateDiscount(originalPrice, salePrice) {
        const discount = ((originalPrice - salePrice) / originalPrice) * 100;
        return Math.round(discount);
    },
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// Compact header on scroll
function initCompactHeader() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '0.3rem 0';
            header.style.background = 'rgba(44, 90, 160, 0.95)';
        } else {
            header.style.padding = '0.5rem 0';
            header.style.background = '#2c5aa0';
        }
        lastScrollY = window.scrollY;
    });
}

// Initialize compact header
document.addEventListener('DOMContentLoaded', function() {
    initCompactHeader();
});
