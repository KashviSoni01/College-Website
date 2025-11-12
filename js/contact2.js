// Contact Form Management System for Stellan University

// Initialize the contact system
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeForm();
    initializeMap();
    initializeProgress();
});

// Setup event listeners
function setupEventListeners() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Form reset
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetForm);
    }
    
    // Real-time validation
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Initialize form
function initializeForm() {
    // Set default values or load saved data
    const savedFormData = localStorage.getItem('contactFormData');
    if (savedFormData) {
        const formData = JSON.parse(savedFormData);
        populateForm(formData);
    }
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = getFormData();
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (in real implementation, this would send to server)
    setTimeout(() => {
        // Save form data to localStorage
        localStorage.setItem('contactFormData', JSON.stringify(formData));
        
        // Show success message
        showFormMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
        
        // Reset form
        resetForm();
        
        // Send email notification (simulated)
        sendEmailNotification(formData);
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear saved data
        localStorage.removeItem('contactFormData');
        
    }, 2000);
}

// Get form data
function getFormData() {
    return {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim(),
        timestamp: new Date().toISOString()
    };
}

// Populate form with saved data
function populateForm(formData) {
    Object.keys(formData).forEach(key => {
        const element = document.getElementById(key);
        if (element && key !== 'timestamp') {
            element.value = formData[key];
        }
    });
}

// Validate form
function validateForm() {
    let isValid = true;
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate required fields
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showFieldError(fieldId, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate email format
    const email = document.getElementById('email').value.trim();
    if (email && !isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone format (if provided)
    const phone = document.getElementById('phone').value.trim();
    if (phone && !isValidPhone(phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate message length
    const message = document.getElementById('message').value.trim();
    if (message && message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const fieldId = field.id;
    const value = field.value.trim();
    
    // Clear previous error
    clearFieldError(e);
    
    // Validate based on field type
    switch (fieldId) {
        case 'firstName':
        case 'lastName':
            if (!value) {
                showFieldError(fieldId, 'This field is required');
            } else if (value.length < 2) {
                showFieldError(fieldId, 'Must be at least 2 characters');
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(fieldId, 'Email is required');
            } else if (!isValidEmail(value)) {
                showFieldError(fieldId, 'Please enter a valid email address');
            }
            break;
            
        case 'phone':
            if (value && !isValidPhone(value)) {
                showFieldError(fieldId, 'Please enter a valid phone number');
            }
            break;
            
        case 'subject':
            if (!value) {
                showFieldError(fieldId, 'Please select a subject');
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError(fieldId, 'Message is required');
            } else if (value.length < 10) {
                showFieldError(fieldId, 'Message must be at least 10 characters long');
            }
            break;
    }
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    const fieldId = field.id;
    
    // Remove error styling
    field.style.borderColor = '#D4B998';
    
    // Remove error message
    const errorMsg = document.getElementById(fieldId + 'Error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    
    // Add error styling
    field.style.borderColor = '#f44336';
    
    // Remove existing error message
    const existingError = document.getElementById(fieldId + 'Error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorMsg = document.createElement('div');
    errorMsg.id = fieldId + 'Error';
    errorMsg.className = 'field-error';
    errorMsg.style.cssText = `
        color: #f44336;
        font-size: 0.8rem;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    `;
    errorMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    // Insert after field
    field.parentNode.insertBefore(errorMsg, field.nextSibling);
}

// Clear all errors
function clearAllErrors() {
    // Clear field errors
    document.querySelectorAll('.field-error').forEach(error => error.remove());
    
    // Reset field styles
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '#D4B998';
    });
    
    // Clear form message
    hideFormMessage();
}

// Show form message
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideFormMessage();
    }, 5000);
}

// Hide form message
function hideFormMessage() {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.style.display = 'none';
}
function resetForm() {
    document.getElementById('contactForm').reset();
    clearAllErrors();

    // Clear saved draft (not full submission history)
    localStorage.removeItem('contactFormData');

    showFormMessage('Form has been reset successfully.', 'success');

    // Reset progress bar
    updateProgress();
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function sendEmailNotification(formData) {
    // Ensure timestamp is set
    formData.timestamp = formData.timestamp || Date.now();

    // Store form data in localStorage
    const submissions = JSON.parse(localStorage.getItem('contactFormSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions));

    // Simulate sending email
    console.log('Email notification sent:', {
        to: 'info@stellan.edu',
        subject: `New Contact Form Submission - ${formData.subject}`,
        body: `
New contact form submission received:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Subject: ${formData.subject}
Message: ${formData.message}

Submitted at: ${new Date(formData.timestamp).toLocaleString()}
        `
    });

    // Show notification
    showNotification('Email notification sent to university staff.', 'success');
}


// Open directions
function openDirections() {
    // In a real implementation, this would open Google Maps or similar
    const address = "Stellan University International Campus, London, United Kingdom";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    
    window.open(mapsUrl, '_blank');
    
    showNotification('Opening directions in Google Maps...', 'info');
}

// Open social media
function openSocial(platform) {
    const socialUrls = {
        facebook: 'https://facebook.com/stellanuniversity',
        twitter: 'https://twitter.com/stellanuniversity',
        instagram: 'https://instagram.com/stellanuniversity',
        linkedin: 'https://linkedin.com/school/stellanuniversity',
        youtube: 'https://youtube.com/c/stellanuniversity',
        whatsapp: 'https://wa.me/919876543210'
    };
    
    if (socialUrls[platform]) {
        window.open(socialUrls[platform], '_blank');
        showNotification(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`, 'info');
    } else {
        showNotification('Social media link not available.', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add animation keyframes if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Auto-save form data
function autoSaveForm() {
    const formData = getFormData();
    if (formData.firstName || formData.lastName || formData.email || formData.message) {
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    }
}

// Set up auto-save
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', autoSaveForm);
    });
});

function initializeProgress() {
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('input', updateProgress);
    });

    // Also reset progress when form is reset
    const form = document.getElementById('yourFormId'); // replace with your actual form ID
    if (form) {
        form.addEventListener('reset', () => {
            setTimeout(updateProgress, 50); // slight delay to let DOM update
        });
    }
}
function updateProgress() {
    const form = document.getElementById('contactForm');
    const requiredInputs = Array.from(form.querySelectorAll('input[required], select[required], textarea[required]'))
        .filter(input => input.offsetParent !== null && !input.disabled);

    const filledInputs = requiredInputs.filter(input => {
        if (input.tagName === 'SELECT') {
            return input.value && input.value !== '';
        }
        return input.value.trim() !== '';
    });

    const totalRequired = requiredInputs.length;
    const totalFilled = filledInputs.length;

    const finalProgress = totalFilled === totalRequired ? 100 : Math.round((totalFilled / totalRequired) * 100);

    const progressFill = document.getElementById('formProgress');
    const progressPercent = document.getElementById('progressPercent');

    if (progressFill && progressPercent) {
        progressFill.style.width = finalProgress + '%';
        progressPercent.textContent = finalProgress + '%';
    }

    // Optional: log missing fields for debugging
    if (finalProgress < 100) {
        console.log('Missing fields:', requiredInputs
            .filter(input => {
                if (input.tagName === 'SELECT') return !input.value || input.value === '';
                return input.value.trim() === '';
            })
            .map(input => input.name || input.id || input.placeholder || input.type));
    }
}

// Initialize map functionality
function initializeMap() {
    // Add click events to map markers
    const markers = document.querySelectorAll('.map-marker');
    markers.forEach(marker => {
        marker.addEventListener('click', function() {
            const info = this.getAttribute('data-info');
            showMarkerInfo(info);
        });
    });
}

// Show marker information
function showMarkerInfo(info) {
    // Create a subtle tooltip instead of notification
    const marker = event.target.closest('.map-marker');
    if (marker) {
        // Add a subtle highlight effect
        marker.style.transform = 'scale(1.3)';
        marker.style.boxShadow = '0 15px 35px rgba(127, 81, 18, 0.6)';
        
        // Reset after animation
        setTimeout(() => {
            marker.style.transform = 'scale(1)';
            marker.style.boxShadow = 'none';
        }, 600);
    }
}

// Show map view
function showMapView(view) {
    // Update active button
    document.querySelectorAll('.map-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Simulate map view change
    const viewport = document.querySelector('.map-viewport');
    if (viewport) {
        viewport.style.filter = view === 'satellite' ? 'sepia(0.3)' : 
                               view === 'street' ? 'none' : 'hue-rotate(90deg)';
    }
    
    // Subtle feedback - just change button color
    event.target.style.background = 'rgba(255, 255, 255, 0.4)';
    setTimeout(() => {
        event.target.style.background = '';
    }, 300);
}

// Show info tab
function showInfoTab(tab) {
    // Update active tab
    document.querySelectorAll('.info-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show corresponding panel
    document.querySelectorAll('.info-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(tab + 'Info').classList.add('active');
}

document.getElementById("contact-form").addEventListener("submit", sendEmail);

function sendEmail(e) {
  e.preventDefault();
  const params = {
    email: document.getElementById("Email").value,
  };
  console.log(email);
  const serviceID = "service_n3rninr";
  const templateID = "template_0nxcb2s";

  emailjs.send(serviceID, templateID, params)
  .then(res => {
    alert("✅ Email sent successfully!");
    document.getElementById("contact-form").reset();
  })
  .catch(err => console.error("❌ Error:", err));
}

// Export functions for global access
window.openDirections = openDirections;
window.openSocial = openSocial;
window.showMapView = showMapView;
window.showInfoTab = showInfoTab;
