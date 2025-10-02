// Account page functionality
document.addEventListener('DOMContentLoaded', function() {
    loadAccountContent();
});

function loadAccountContent() {
    const currentUser = getCurrentUser();
    const accountContainer = document.getElementById('accountContainer');
    
    if (!currentUser) {
        // Show login/register prompt
        accountContainer.innerHTML = `
            <div class="auth-prompt">
                <div style="text-align: center; padding: 3rem;">
                    <h2>Welcome to MCStoreHold</h2>
                    <p>Please log in to access your account</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                        <button onclick="location.href='login.html'" class="cta-button">Log In</button>
                        <button onclick="location.href='register.html'" class="cta-button" style="background: #27ae60;">Register</button>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    // Show user dashboard
    accountContainer.innerHTML = `
        <div class="account-dashboard">
            <div class="welcome-section">
                <h1>Welcome back, ${currentUser.name}!</h1>
                <p>Here's your account overview</p>
            </div>
            
            <div class="account-grid">
                <div class="account-card">
                    <h3>📦 Order History</h3>
                    <p>View your recent orders and track shipments</p>
                    <button onclick="location.href='orders.html'" class="account-btn">View Orders</button>
                </div>
                
                <div class="account-card">
                    <h3>❤️ Wishlist</h3>
                    <p>Your saved items and favorite products</p>
                    <button onclick="location.href='wishlist.html'" class="account-btn">View Wishlist</button>
                </div>
                
                <div class="account-card">
                    <h3>👤 Personal Info</h3>
                    <p>Update your contact information and preferences</p>
                    <button onclick="showEditProfile()" class="account-btn">Edit Profile</button>
                </div>
                
                <div class="account-card">
                    <h3>🔐 Security</h3>
                    <p>Change your password and security settings</p>
                    <button onclick="showSecuritySettings()" class="account-btn">Security Settings</button>
                </div>
            </div>
            
            <div class="recent-activity">
                <h3>Recent Activity</h3>
                <div class="activity-list">
                    <div class="activity-item">
                        <span>🛒</span>
                        <div>
                            <strong>Cart Updated</strong>
                            <p>You have ${getCartItems().length} items in your cart</p>
                        </div>
                    </div>
                    <div class="activity-item">
                        <span>👋</span>
                        <div>
                            <strong>Welcome</strong>
                            <p>You joined MCStoreHold on ${new Date(currentUser.joined).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="account-actions">
                <button onclick="logout()" class="logout-btn">Log Out</button>
            </div>
        </div>
    `;
}

function showEditProfile() {
    const currentUser = getCurrentUser();
    
    document.getElementById('accountContainer').innerHTML = `
        <div class="edit-profile">
            <h2>Edit Profile</h2>
            
            <form onsubmit="updateProfile(event)" class="profile-form">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" value="${currentUser.name}" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" value="${currentUser.email}" required>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" value="${currentUser.phone || ''}" placeholder="Optional">
                </div>
                
                <div class="form-group">
                    <label for="address">Shipping Address</label>
                    <textarea id="address" placeholder="Enter your shipping address">${currentUser.address || ''}</textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="cta-button">Save Changes</button>
                    <button type="button" onclick="loadAccountContent()" class="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function updateProfile(event) {
    event.preventDefault();
    
    const currentUser = getCurrentUser();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const updatedUser = {
        ...currentUser,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };
    
    // Update user in users array
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    
    alert('Profile updated successfully!');
    loadAccountContent();
}

function showSecuritySettings() {
    document.getElementById('accountContainer').innerHTML = `
        <div class="security-settings">
            <h2>Security Settings</h2>
            
            <form onsubmit="changePassword(event)" class="security-form">
                <div class="form-group">
                    <label for="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" required>
                </div>
                
                <div class="form-group">
                    <label for="newPassword">New Password</label>
                    <input type="password" id="newPassword" required minlength="6">
                </div>
                
                <div class="form-group">
                    <label for="confirmPassword">Confirm New Password</label>
                    <input type="password" id="confirmPassword" required>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="cta-button">Change Password</button>
                    <button type="button" onclick="loadAccountContent()" class="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const currentUser = getCurrentUser();
    
    if (currentUser.password !== currentPassword) {
        alert('Current password is incorrect');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Update password
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update current user
        currentUser.password = newPassword;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    alert('Password changed successfully!');
    loadAccountContent();
}

function logout() {
    if (confirm('Are you sure you want to log out?')) {
        logoutUser();
        window.location.href = 'index.html';
    }
}
