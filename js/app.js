// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    const productLoader = new ProductLoader();
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.getElementById('cartIcon');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Initialize product loading
    productLoader.loadProducts();

    // Cart modal functionality
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }

    if (closeCart) {
        closeCart.addEventListener('click', closeCartModal);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }

    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
    }

    // Event delegation for dynamic cart items
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const isPlus = e.target.classList.contains('plus');
            const item = cartManager.cart.find(item => item.id === productId);
            
            if (item) {
                const newQuantity = isPlus ? item.quantity + 1 : item.quantity - 1;
                cartManager.updateQuantity(productId, newQuantity);
            }
        }

        if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            const button = e.target.classList.contains('remove-item') ? e.target : e.target.closest('.remove-item');
            const productId = parseInt(button.getAttribute('data-id'));
            cartManager.removeFromCart(productId);
        }
    });

    function openCart() {
        cartManager.renderCartItems();
        cartModal.classList.add('active');
    }

    function closeCartModal() {
        cartModal.classList.remove('active');
    }

    function proceedToCheckout() {
        if (cartManager.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        window.location.href = 'cart/checkout.html';
    }

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartModal.classList.contains('active')) {
            closeCartModal();
        }
    });
});
