// Authentication system for Kanha cakes and Chocolates

// User management functions
function getStoredUsers() {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    const users = getStoredUsers();
    users.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

function findUser(email) {
    const users = getStoredUsers();
    return users.find(user => user.email === email) || null;
}

// Authentication functions
function attemptLogin(email, password) {
    console.log('Login attempt for:', email);
    
    // Check demo admin credentials
    if (email === 'admin@Kanha.com' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('currentUser', email);
        console.log('Admin login successful');
        return true;
    }
    
    // Check demo user credentials
    if (email === 'user@Kanha.com' && password === 'user123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.removeItem('isAdmin');
        localStorage.setItem('currentUser', email);
        console.log('Demo user login successful');
        return true;
    }
    
    // Check registered users
    const user = findUser(email);
    console.log('Found registered user:', user ? 'Yes' : 'No');
    if (user && user.password === password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', email);
        if (user.isAdmin) {
            localStorage.setItem('isAdmin', 'true');
        } else {
            localStorage.removeItem('isAdmin');
        }
        console.log('Registered user login successful');
        return true;
    }
    
    console.log('Login failed for:', email);
    return false;
}

function attemptRegister(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        return false;
    }
    
    // Check if user already exists
    if (findUser(email)) {
        console.log('User already exists with this email');
        return false;
    }
    
    // Create new user
    const newUser = {
        name: name,
        email: email,
        password: password,
        isAdmin: false
    };
    
    saveUser(newUser);
    console.log('User registered successfully:', { name, email });
    return true;
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('currentUser');
    console.log('User logged out');
}

function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}