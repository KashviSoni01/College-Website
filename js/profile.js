// Profile Management JavaScript

// Global variables
let currentTab = 'personal';
let profileData = {};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadProfileData();
    setupEventListeners();
    updateCurrentTab();
});

// Initialize page elements
function initializePage() {
    // Initialize statistics with animation
    animateStatistics();
}

// Load profile data (simulated API call)
function loadProfileData() {
    // Simulate API delay
    setTimeout(() => {
        profileData = {
            personal: {
                fullName: "Professor John Williams",
                email: "john.williams@stellan.edu",
                phone: "+1 (555) 123-4567",
                dateOfBirth: "1980-03-15",
                officeLocation: "Computer Science Building, Room 301",
                officeHours: "Monday-Friday, 2:00 PM - 4:00 PM",
                officePhone: "+1 (555) 123-4568",
                emergencyContact: "Jane Williams - +1 (555) 987-6543"
            },
            academic: {
                position: "Professor of Computer Science",
                department: "Department of Computer Science",
                education: [
                    {
                        degree: "Ph.D. in Computer Science",
                        school: "Stanford University",
                        year: "2008"
                    },
                    {
                        degree: "M.S. in Computer Science",
                        school: "MIT",
                        year: "2005"
                    },
                    {
                        degree: "B.S. in Computer Science",
                        school: "UC Berkeley",
                        year: "2003"
                    }
                ],
                experience: [
                    {
                        title: "Professor of Computer Science",
                        company: "Stellan University",
                        duration: "2016 - Present"
                    },
                    {
                        title: "Associate Professor",
                        company: "Stellan University",
                        duration: "2012 - 2016"
                    },
                    {
                        title: "Assistant Professor",
                        company: "Stellan University",
                        duration: "2008 - 2012"
                    }
                ],
                researchInterests: [
                    "Machine Learning",
                    "Artificial Intelligence",
                    "Data Science",
                    "Computer Vision",
                    "Natural Language Processing"
                ]
            },
            security: {
                twoFactorEnabled: true,
                lastPasswordChange: "2024-01-15",
                loginActivity: [
                    {
                        device: "Chrome on Windows",
                        location: "New York, NY",
                        time: "2 hours ago"
                    },
                    {
                        device: "Safari on iPhone",
                        location: "New York, NY",
                        time: "1 day ago"
                    },
                    {
                        device: "Firefox on Mac",
                        location: "New York, NY",
                        time: "3 days ago"
                    }
                ]
            },
            preferences: {
                notifications: {
                    email: true,
                    sms: true,
                    push: false,
                    weeklyReports: true
                },
                display: {
                    theme: "light",
                    language: "en",
                    timeZone: "EST"
                },
                privacy: {
                    showOnlineStatus: true,
                    allowProfileViewing: false,
                    showResearchInterests: true
                }
            }
        };
        
        updateCurrentTab();
    }, 1000);
}

// Setup event listeners
function setupEventListeners() {
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
    
    // Form submissions
    setupFormHandlers();
    
    // Keyboard shortcuts
    setupKeyboardShortcuts();
}

// Switch between tabs
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    
    currentTab = tabName;
    updateCurrentTab();
}

// Update current tab content
function updateCurrentTab() {
    switch(currentTab) {
        case 'personal':
            updatePersonalInfo();
            break;
        case 'academic':
            updateAcademicInfo();
            break;
        case 'security':
            updateSecurityInfo();
            break;
        case 'preferences':
            updatePreferencesInfo();
            break;
    }
}

// Update personal information
function updatePersonalInfo() {
    if (!profileData.personal) return;
    
    const personalData = profileData.personal;
    
    // Update profile card
    const profileName = document.querySelector('.profile-info h2');
    if (profileName) profileName.textContent = personalData.fullName;
    
    // Update profile title and department
    const profileTitle = document.querySelector('.profile-title');
    if (profileTitle) profileTitle.textContent = "Professor of Computer Science";
    
    const profileDepartment = document.querySelector('.profile-department');
    if (profileDepartment) profileDepartment.textContent = "Department of Computer Science";
}

// Update academic information
function updateAcademicInfo() {
    if (!profileData.academic) return;
    
    // This would update the academic information display
    // Implementation depends on the specific HTML structure
}

// Update security information
function updateSecurityInfo() {
    if (!profileData.security) return;
    
    // This would update the security information display
    // Implementation depends on the specific HTML structure
}

// Update preferences information
function updatePreferencesInfo() {
    if (!profileData.preferences) return;
    
    // Update notification settings
    const emailCheckbox = document.querySelector('input[type="checkbox"]');
    if (emailCheckbox) emailCheckbox.checked = profileData.preferences.notifications.email;
    
    // Update other preferences
    // Implementation depends on the specific HTML structure
}

// Profile actions
function editPersonalInfo() {
    showModal('editPersonalModal');
    
    // Pre-fill form with current data
    const form = document.querySelector('#editPersonalModal form');
    if (form && profileData.personal) {
        const personalData = profileData.personal;
        form.querySelector('input[type="text"]').value = personalData.fullName;
        form.querySelector('input[type="email"]').value = personalData.email;
        form.querySelector('input[type="tel"]').value = personalData.phone;
        form.querySelector('input[type="date"]').value = personalData.dateOfBirth;
    }
}

function editAcademicInfo() {
    showModal('editAcademicModal');
    
    // Pre-fill form with current data
    const form = document.querySelector('#editAcademicModal form');
    if (form && profileData.academic) {
        const academicData = profileData.academic;
        form.querySelector('input[type="text"]').value = academicData.position;
        form.querySelectorAll('input[type="text"]')[1].value = academicData.department;
    }
}

function savePreferences() {
    showNotification('Saving preferences...', 'info');
    
    setTimeout(() => {
        showNotification('Preferences saved successfully!', 'success');
    }, 1500);
}

function changeProfilePhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profileImage = document.getElementById('profileImage');
                if (profileImage) {
                    profileImage.src = e.target.result;
                }
                showNotification('Profile photo updated successfully!', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.add('slide-up');
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Setup form handlers
function setupFormHandlers() {
    // Edit personal form
    const editPersonalForm = document.querySelector('#editPersonalModal form');
    if (editPersonalForm) {
        editPersonalForm.addEventListener('submit', handleEditPersonal);
    }
    
    // Edit academic form
    const editAcademicForm = document.querySelector('#editAcademicModal form');
    if (editAcademicForm) {
        editAcademicForm.addEventListener('submit', handleEditAcademic);
    }
    
    // Security forms
    const securityForms = document.querySelectorAll('.security-form');
    securityForms.forEach(form => {
        form.addEventListener('submit', handleSecurityForm);
    });
}

// Form submission handlers
function handleEditPersonal(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Updating personal information...', 'info');
    
    setTimeout(() => {
        showNotification('Personal information updated successfully!', 'success');
        closeModal('editPersonalModal');
        event.target.reset();
        updatePersonalInfo();
    }, 1500);
}

function handleEditAcademic(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Updating academic information...', 'info');
    
    setTimeout(() => {
        showNotification('Academic information updated successfully!', 'success');
        closeModal('editAcademicModal');
        event.target.reset();
        updateAcademicInfo();
    }, 1500);
}

function handleSecurityForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Updating security settings...', 'info');
    
    setTimeout(() => {
        showNotification('Security settings updated successfully!', 'success');
        event.target.reset();
    }, 1500);
}

// Animation functions
function animateStatistics() {
    const statCards = document.querySelectorAll('.stat');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#4CAF50',
        'error': '#f44336',
        'warning': '#ff9800',
        'info': '#2196F3'
    };
    return colors[type] || '#2196F3';
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Escape to close modals
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
