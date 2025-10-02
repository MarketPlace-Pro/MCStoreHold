// Checkout page functionality
let currentStep = 1;
let orderData = {
    shipping: {},
    payment: {},
    items: []
};

document.addEventListener('DOMContentLoaded', function() {
    initializeCheckout();
});

function initializeCheckout() {
    const cartItems = getCartItems();
    
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'cart.html';
        return;
    }
    
    orderData.items = cartItems;
    loadCheckoutStep(1);
    updateOrderSummary();
}

function loadCheckoutStep(step) {
    currentStep = step;
    updateStepIndicator();
    
    const checkoutForm = document.getElementById('checkoutForm');
    
    switch(step) {
        case 1:
            checkoutForm.innerHTML = getShippingStepHTML();
            break;
        case 2:
            checkoutForm.innerHTML = getPaymentStepHTML();
            break;
        case 3:
            checkoutForm.innerHTML = getReviewStepHTML();
            break;
        case 4:
            checkoutForm.innerHTML = getConfirmationStepHTML();
            break;
    }
}

function updateStepIndicator() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function getShippingStepHTML() {
    const currentUser = getCurrentUser();
    
    return `
        <div class="checkout-step">
            <h2>Shipping Information</h2>
            
            <form onsubmit="handleShippingSubmit(event)" class="shipping-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">First Name *</label>
                        <input type="text" id="firstName" value="${currentUser?.name?.split(' ')[0] || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="lastName">Last Name *</label>
                        <input type="text" id="lastName" value="${currentUser?.name?.split(' ')[1] || ''}" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" value="${currentUser?.email || ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" value="${currentUser?.phone || ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="address">Street Address *</label>
                    <input type="text" id="address" value="${currentUser?.address || ''}" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="city">City *</label>
                        <input type="text" id="city" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="state">State *</label>
                        <input type="text" id="state" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="zipCode">ZIP Code *</label>
                        <input type="text" id="zipCode" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="country">Country *</label>
                    <select id="country" required>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                    </select>
                </div>
                
                <div class="shipping-method">
                    <h3>Shipping Method</h3>
                    <div class="method-option">
                        <input type="radio" id="standard" name="shipping" value="standard" checked>
                        <label for="standard">
                            <strong>Standard Shipping</strong>
                            <span>5-7 business days - FREE</span>
                        </label>
                    </div>
                    
                    <div class="method-option">
                        <input type="radio" id="express" name="shipping" value="express">
                        <label for="express">
                            <strong>Express Shipping</strong>
                            <span>2-3 business days - $9.99</span>
                        </label>
                    </div>
                    
                    <div class="method-option">
                        <input type="radio" id="overnight" name="shipping" value="overnight">
                        <label for="overnight">
                            <strong>Overnight Shipping</strong>
                            <span>Next business day - $19.99</span>
                        </label>
                    </div>
                </div>
                
                <div class="checkout-actions">
                    <button type="button" onclick="location.href='cart.html'" class="back-btn">Back to Cart</button>
                    <button type="submit" class="continue-btn">Continue to Payment</button>
                </div>
            </form>
        </div>
    `;
}

function getPaymentStepHTML() {
    return `
        <div class="checkout-step">
            <h2>Payment Information</h2>
            
            <form onsubmit="handlePaymentSubmit(event)" class="payment-form">
                <div class="form-group">
                    <label for="cardNumber">Card Number *</label>
                    <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required maxlength="19">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="expiryDate">Expiry Date *</label>
                        <input type="text" id="expiryDate" placeholder="MM/YY" required maxlength="5">
                    </div>
                    
                    <div class="form-group">
                        <label for="cvv">CVV *</label>
                        <input type="text" id="cvv" placeholder="123" required maxlength="3">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="cardName">Name on Card *</label>
                    <input type="text" id="cardName" required>
                </div>
                
                <div class="billing-address">
                    <h3>Billing Address</h3>
                    <label>
                        <input type="checkbox" id="sameAsShipping" checked onchange="toggleBillingAddress()">
                        Same as shipping address
                    </label>
                    
                    <div id="billingAddressFields" style="display: none; margin-top: 1rem;">
                        <div class="form-group">
                            <label for="billingAddress">Billing Address</label>
                            <input type="text" id="billingAddress">
                        </div>
                    </div>
                </div>
                
                <div class="checkout-actions">
                    <button type="button" onclick="loadCheckoutStep(1)" class="back-btn">Back to Shipping</button>
                    <button type="submit" class="continue-btn">Continue to Review</button>
                </div>
            </form>
        </div>
    `;
}

function getReviewStepHTML() {
    const subtotal = getCartTotal();
    const shipping = orderData.shipping.method === 'standard' ? 0 : 
                    orderData.shipping.method === 'express' ? 9.99 : 19.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    return `
        <div class="checkout-step">
            <h2>Review Your Order</h2>
            
            <div class="review-section">
                <h3>Shipping Information</h3>
                <p>${orderData.shipping.firstName} ${orderData.shipping.lastName}</p>
                <p>${orderData.shipping.address}</p>
                <p>${orderData.shipping.city}, ${orderData.shipping.state} ${orderData.shipping.zipCode}</p>
                <p>${orderData.shipping.email} | ${orderData.shipping.phone}</p>
                <button onclick="loadCheckoutStep(1)" class="edit-btn">Edit</button>
            </div>
            
            <div class="review-section">
                <h3>Payment Method</h3>
                <p>Card ending in ${orderData.payment.cardNumber.slice(-4)}</p>
                <p>Expires ${orderData.payment.expiryDate}</p>
                <button onclick="loadCheckoutStep(2)" class="edit-btn">Edit</button>
            </div>
            
            <div class="review-section">
                <h3>Order Items</h3>
                <div class="review-items">
                    ${orderData.items.map(item => `
                        <div class="review-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                            <div class="item-price">$${(item.priceValue * item.quantity).toFixed(2)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="order-total-review">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping:</span>
                    <span>${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div class="total-row">
                    <span>Tax:</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="total-row total">
                    <span><strong>Total:</strong></span>
                    <span><strong>$${total.toFixed(2)}</strong></span>
                </div>
            </div>
            
            <div class="checkout-actions">
                <button type="button" onclick="loadCheckoutStep(2)" class="back-btn">Back to Payment</button>
                <button type="button" onclick="placeOrder()" class="place-order-btn">Place Order</button>
            </div>
        </div>
    `;
}

function getConfirmationStepHTML() {
    const orderNumber = 'ORD-' + Date.now().toString().slice(-8);
    
    return `
        <div class="checkout-step">
            <div class="confirmation-content">
                <div class="success-icon">✅</div>
                <h2>Order Confirmed!</h2>
                <p class="order-number">Order #${orderNumber}</p>
                <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
                
                <div class="confirmation-details">
                    <div class="detail-item">
                        <strong>Estimated Delivery:</strong>
                        <span>${getEstimatedDelivery()}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Shipping Address:</strong>
                        <span>${orderData.shipping.address}, ${orderData.shipping.city}, ${orderData.shipping.state}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Total Paid:</strong>
                        <span>$${getCartTotal().toFixed(2)}</span>
                    </div>
                </div>
                
                <div class="confirmation-actions">
                    <button onclick="location.href='orders.html'" class="cta-button">View Order Details</button>
                    <button onclick="location.href='index.html'" class="continue-shopping-btn">Continue Shopping</button>
                </div>
            </div>
        </div>
    `;
}

function handleShippingSubmit(event) {
    event.preventDefault();
    
    orderData.shipping = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
        country: document.getElementById('country').value,
        method: document.querySelector('input[name="shipping"]:checked').value
    };
    
    loadCheckoutStep(2);
}

function handlePaymentSubmit(event) {
    event.preventDefault();
    
    orderData.payment = {
        cardNumber: document.getElementById('cardNumber').value,
        expiryDate: document.getElementById('expiryDate').value,
        cvv: document.getElementById('cvv').value,
        cardName: document.getElementById('cardName').value
    };
    
    loadCheckoutStep(3);
}

function toggleBillingAddress() {
    const billingFields = document.getElementById('billingAddressFields');
    const sameAsShipping = document.getElementById('sameAsShipping');
    
    billingFields.style.display = sameAsShipping.checked ? 'none' : 'block';
}

function updateOrderSummary() {
    const cartItems = getCartItems();
    const subtotal = getCartTotal();
    const shipping = 0; // Free shipping over $50
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
    
    const checkoutItems = document.getElementById('checkoutItems');
    checkoutItems.innerHTML = cartItems.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity}</p>
            </div>
            <div class="item-price">$${(item.priceValue * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

function placeOrder() {
    // Simulate order processing
    const orderNumber = 'ORD-' + Date.now().toString().slice(-8);
    
    // Save order to user's order history
    const currentUser = getCurrentUser();
    if (currentUser) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        const order = {
            id: orderNumber,
            userId: currentUser.id,
            items: orderData.items,
            shipping: orderData.shipping,
            payment: orderData.payment,
            total: getCartTotal(),
            status: 'confirmed',
            date: new Date().toISOString(),
            estimatedDelivery: getEstimatedDelivery()
        };
        
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
    }
    
    // Clear cart
    clearCart();
    
    // Show confirmation
    loadCheckoutStep(4);
}

function getEstimatedDelivery() {
    const today = new Date();
    const deliveryDate = new Date(today);
    
    switch(orderData.shipping.method) {
        case 'standard':
            deliveryDate.setDate(today.getDate() + 7);
            break;
        case 'express':
            deliveryDate.setDate(today.getDate() + 3);
            break;
        case 'overnight':
            deliveryDate.setDate(today.getDate() + 1);
            break;
    }
    
    return deliveryDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}
