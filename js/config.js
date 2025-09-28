// GitHub Pages configuration
const CONFIG = {
    baseUrl: window.location.hostname.includes('github.io') ? '/m' : '',
    apiBaseUrl: ''
};

// Helper function to get correct paths
function getAssetPath(path) {
    return CONFIG.baseUrl + path;
}

// Update all fetch calls to use correct paths
const originalFetch = window.fetch;
window.fetch = function(url, options) {
    if (typeof url === 'string' && !url.startsWith('http') && !url.startsWith('//')) {
        url = CONFIG.baseUrl + url;
    }
    return originalFetch(url, options);
};
