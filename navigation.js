// Navigation and authentication UI management

document.addEventListener('DOMContentLoaded', function() {
    updateAuthSection();
    
    // Update auth section based on login status
    function updateAuthSection() {
        const authSection = document.getElementById('authSection');
        if (!authSection) return;
        
        if (isLoggedIn()) {
            const isAdminUser = isAdmin();
            authSection.innerHTML = `
                <div class="auth-section">
                    <button class="auth-btn" id="settingsBtn">
                        ⚙️
                    </button>
                    <button class="auth-btn logout-btn" id="logoutBtn">
                        🚪 Logout
                    </button>
                </div>
            `;
            
            // Add event listeners
            document.getElementById('settingsBtn').addEventListener('click', toggleSettings);
            document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        } else {
            authSection.innerHTML = `
                <a href="login.html" class="auth-btn">Login</a>
            `;
        }
    }
    
    function toggleSettings() {
        // Remove existing dropdown
        const existing = document.querySelector('.settings-dropdown');
        if (existing) {
            existing.remove();
            document.querySelector('.overlay')?.remove();
            return;
        }
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.addEventListener('click', () => {
            document.querySelector('.settings-dropdown')?.remove();
            overlay.remove();
        });
        document.body.appendChild(overlay);
        
        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'settings-dropdown';
        dropdown.innerHTML = `
            <h3>Settings</h3>
            <div class="user-status">
                Logged in as ${isAdmin() ? 'Admin' : 'User'}
            </div>
            <button class="settings-logout" onclick="handleLogout()">
                🚪 Logout
            </button>
        `;
        
        // Position dropdown
        const settingsBtn = document.getElementById('settingsBtn');
        const rect = settingsBtn.getBoundingClientRect();
        dropdown.style.position = 'fixed';
        dropdown.style.top = (rect.bottom + 5) + 'px';
        dropdown.style.right = '20px';
        
        document.body.appendChild(dropdown);
    }
    
    function handleLogout() {
        logout();
        
        // Remove any dropdowns
        document.querySelector('.settings-dropdown')?.remove();
        document.querySelector('.overlay')?.remove();
        
        // Update UI
        updateAuthSection();
        
        // Redirect to home if on a protected page
        const protectedPages = ['order.html', 'menu.html'];
        const currentPage = window.location.pathname.split('/').pop();
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'index.html';
        }
        
        console.log('User logged out');
    }
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Add mobile menu functionality here if needed
            console.log('Mobile menu clicked');
        });
    }
    
    // Make functions globally available
    window.handleLogout = handleLogout;
    window.toggleSettings = toggleSettings;
});