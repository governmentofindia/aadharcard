// Aadhaar Scanner JavaScript

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    setupPhotoUpload();
});

// Photo Upload Functionality
function setupPhotoUpload() {
    const fileInput = document.getElementById('photo-upload');
    const photoDisplay = document.getElementById('photo-display');
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                photoDisplay.innerHTML = `<img src="${event.target.result}" alt="Profile Photo">`;
                // Save to localStorage
                localStorage.setItem('aadhaarPhoto', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

// Load saved data from localStorage
function loadSavedData() {
    // Load photo
    const savedPhoto = localStorage.getItem('aadhaarPhoto');
    if (savedPhoto) {
        document.getElementById('photo-display').innerHTML = `<img src="${savedPhoto}" alt="Profile Photo">`;
    }
    
    // Load other details
    const fields = ['name', 'dob', 'gender', 'address', 'aadhaar', 'mobile', 'email'];
    fields.forEach(field => {
        const savedValue = localStorage.getItem(`aadhaar_${field}`);
        if (savedValue) {
            const element = document.getElementById(`${field}-value`);
            if (element) {
                element.textContent = savedValue;
            }
        }
    });
}

// Toggle Edit Modal
function toggleEditMode() {
    const modal = document.getElementById('editModal');
    modal.classList.add('active');
    
    // Populate modal with current values
    document.getElementById('edit-name').value = document.getElementById('name-value').textContent;
    document.getElementById('edit-dob').value = document.getElementById('dob-value').textContent;
    document.getElementById('edit-gender').value = document.getElementById('gender-value').textContent;
    document.getElementById('edit-address').value = document.getElementById('address-value').textContent.replace(/<br>/g, '\n');
    document.getElementById('edit-aadhaar').value = document.getElementById('aadhaar-value').textContent;
    document.getElementById('edit-mobile').value = document.getElementById('mobile-value').textContent;
    document.getElementById('edit-email').value = document.getElementById('email-value').textContent;
}

// Close Modal
function closeModal() {
    document.getElementById('editModal').classList.remove('active');
}

// Save Details
function saveDetails() {
    const name = document.getElementById('edit-name').value;
    const dob = document.getElementById('edit-dob').value;
    const gender = document.getElementById('edit-gender').value;
    const address = document.getElementById('edit-address').value;
    const aadhaar = document.getElementById('edit-aadhaar').value;
    const mobile = document.getElementById('edit-mobile').value;
    const email = document.getElementById('edit-email').value;
    
    // Update display
    document.getElementById('name-value').textContent = name;
    document.getElementById('dob-value').textContent = dob;
    document.getElementById('gender-value').textContent = gender;
    document.getElementById('address-value').innerHTML = address.replace(/\n/g, '<br>');
    document.getElementById('aadhaar-value').textContent = aadhaar;
    document.getElementById('mobile-value').textContent = mobile;
    document.getElementById('email-value').textContent = email;
    
    // Save to localStorage
    localStorage.setItem('aadhaar_name', name);
    localStorage.setItem('aadhaar_dob', dob);
    localStorage.setItem('aadhaar_gender', gender);
    localStorage.setItem('aadhaar_address', address);
    localStorage.setItem('aadhaar_aadhaar', aadhaar);
    localStorage.setItem('aadhaar_mobile', mobile);
    localStorage.setItem('aadhaar_email', email);
    
    closeModal();
    
    // Show success message
    showNotification('Details saved successfully!');
}

// Share Details
function shareDetails() {
    const name = document.getElementById('name-value').textContent;
    const address = document.getElementById('address-value').textContent;
    const aadhaar = document.getElementById('aadhaar-value').textContent;
    
    const shareText = `Aadhaar Details:\n\nName: ${name}\nAddress: ${address}\nAadhaar No: ${aadhaar}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Aadhaar Details',
            text: shareText
        }).catch(err => {
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Details copied to clipboard!');
    }).catch(err => {
        showNotification('Failed to copy details');
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Close modal when clicking outside
document.getElementById('editModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
