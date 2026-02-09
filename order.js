document.addEventListener('DOMContentLoaded', function() {
    let termsAccepted = false;
    
    // Pre-fill form with selected menu item if available
    const selectedMenuItem = localStorage.getItem('selectedMenuItem');
    if (selectedMenuItem) {
        try {
            const itemData = JSON.parse(selectedMenuItem);
            // You can add logic here to pre-fill the cake type based on the selected item
            console.log('Pre-filling order form with:', itemData);
            // Clear the stored item after using it
            localStorage.removeItem('selectedMenuItem');
        } catch (e) {
            console.error('Error parsing selected menu item:', e);
        }
    }
    
    const orderForm = document.getElementById('orderForm');
    const termsWarning = document.getElementById('termsWarning');
    const submitBtn = document.getElementById('submitOrderBtn');
    const viewTermsBtn = document.getElementById('viewTermsBtn');
    const termsModal = document.getElementById('termsModal');
    const closeTerms = document.getElementById('closeTerms');
    const agreeTerms = document.getElementById('agreeTerms');
    const disagreeTerms = document.getElementById('disagreeTerms');

    // Initial form state
    updateFormState();

    // Event listeners
    viewTermsBtn.addEventListener('click', function() {
        termsModal.style.display = 'flex';
    });

    closeTerms.addEventListener('click', function() {
        termsModal.style.display = 'none';
    });

    agreeTerms.addEventListener('click', function() {
        termsAccepted = true;
        termsModal.style.display = 'none';
        updateFormState();
        console.log('Terms and conditions accepted');
    });

    disagreeTerms.addEventListener('click', function() {
        termsAccepted = false;
        termsModal.style.display = 'none';
        updateFormState();
        console.log('Terms and conditions disagreed');
    });

    // Close modal when clicking outside
    termsModal.addEventListener('click', function(e) {
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
        }
    });

    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!termsAccepted) {
            alert('Please accept the terms and conditions first');
            return;
        }

        // Collect form data
        const orderData = {
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            phone: document.getElementById('customerPhone').value,
            date: document.getElementById('eventDate').value,
            cakeType: document.getElementById('cakeType').value,
            weight: document.getElementById('cakeWeight').value,
            specialRequests: document.getElementById('specialRequests').value
        };

        console.log('Order submitted:', orderData);
        alert('Order submitted successfully!');
        
        // Reset form
        orderForm.reset();
    });

    function updateFormState() {
        if (termsAccepted) {
            orderForm.classList.remove('disabled');
            termsWarning.style.display = 'none';
            submitBtn.disabled = false;
            
            // Enable all form inputs
            const inputs = orderForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.disabled = false;
            });
        } else {
            orderForm.classList.add('disabled');
            termsWarning.style.display = 'block';
            submitBtn.disabled = true;
            
            // Disable all form inputs
            const inputs = orderForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.disabled = true;
            });
        }
    }
});