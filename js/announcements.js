// Announcements Management JavaScript

// Global variables
let announcements = [];
let filteredAnnouncements = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadAnnouncementData();
    setupEventListeners();
    updateAnnouncementsList();
});

// Initialize page elements
function initializePage() {
    // Initialize statistics with animation
    animateStatistics();
    
    // Setup real-time updates
    setupRealTimeUpdates();
}

// Load announcement data (simulated API call)
function loadAnnouncementData() {
    // Simulate API delay
    setTimeout(() => {
        announcements = [
            {
                id: 1,
                title: "Assignment 3 Due Tomorrow",
                content: "Reminder: Assignment 3 is due tomorrow at 11:59 PM. Please submit your work on time.",
                course: "CS101",
                courseName: "Introduction to Programming",
                status: "sent",
                date: "2024-01-15",
                time: "10:30 AM",
                priority: "high",
                recipients: 120,
                opened: 108,
                clicked: 45,
                replied: 12
            },
            {
                id: 2,
                title: "Class Cancelled - Wednesday",
                content: "Wednesday's CS201 class has been cancelled due to faculty conference attendance.",
                course: "CS201",
                courseName: "Data Structures & Algorithms",
                status: "sent",
                date: "2024-01-14",
                time: "2:00 PM",
                priority: "urgent",
                recipients: 90,
                opened: 85,
                clicked: 32,
                replied: 8
            },
            {
                id: 3,
                title: "Lecture Notes Posted",
                content: "Week 8 lecture notes and materials have been posted. Please review before the next class.",
                course: "CS301",
                courseName: "Web Development",
                status: "sent",
                date: "2024-01-13",
                time: "4:15 PM",
                priority: "normal",
                recipients: 75,
                opened: 68,
                clicked: 25,
                replied: 3
            },
            {
                id: 4,
                title: "Midterm Exam Schedule",
                content: "Midterm exam will be held on February 15th at 10:00 AM in the main auditorium.",
                course: "CS101",
                courseName: "Introduction to Programming",
                status: "scheduled",
                date: "2024-02-10",
                time: "9:00 AM",
                priority: "high",
                recipients: 120,
                opened: 0,
                clicked: 0,
                replied: 0
            },
            {
                id: 5,
                title: "Research Project Update",
                content: "Update on the AI research project progress and next steps for team members.",
                course: "CS201",
                courseName: "Data Structures & Algorithms",
                status: "draft",
                date: "2024-01-16",
                time: "3:00 PM",
                priority: "normal",
                recipients: 0,
                opened: 0,
                clicked: 0,
                replied: 0
            }
        ];
        
        filteredAnnouncements = [...announcements];
        updateAnnouncementsList();
        updateStatistics();
    }, 1000);
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('announcementSearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filter controls
    const courseFilter = document.getElementById('courseFilter');
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    if (courseFilter) {
        courseFilter.addEventListener('change', handleCourseFilter);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', handleStatusFilter);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', handleDateFilter);
    }
    
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

// Handle search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    filterAnnouncements();
}

// Handle course filter
function handleCourseFilter(event) {
    filterAnnouncements();
}

// Handle status filter
function handleStatusFilter(event) {
    filterAnnouncements();
}

// Handle date filter
function handleDateFilter(event) {
    filterAnnouncements();
}

// Filter announcements based on search and filter criteria
function filterAnnouncements() {
    const searchTerm = document.getElementById('announcementSearch').value.toLowerCase();
    const courseFilter = document.getElementById('courseFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    filteredAnnouncements = announcements.filter(announcement => {
        const matchesSearch = announcement.title.toLowerCase().includes(searchTerm) ||
                            announcement.content.toLowerCase().includes(searchTerm);
        
        const matchesCourse = courseFilter === 'all' || announcement.course === courseFilter;
        const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter;
        
        let matchesDate = true;
        if (dateFilter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            matchesDate = announcement.date === today;
        } else if (dateFilter === 'week') {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            matchesDate = new Date(announcement.date) >= weekAgo;
        } else if (dateFilter === 'month') {
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            matchesDate = new Date(announcement.date) >= monthAgo;
        }
        
        return matchesSearch && matchesCourse && matchesStatus && matchesDate;
    });
    
    updateAnnouncementsList();
}

// Update announcements list
function updateAnnouncementsList() {
    const list = document.getElementById('announcementsList');
    if (!list) return;
    
    list.innerHTML = '';
    
    if (filteredAnnouncements.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #6b5a47;">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 15px; display: block;"></i>
                <h3>No announcements found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    filteredAnnouncements.forEach((announcement, index) => {
        const item = createAnnouncementItem(announcement, index);
        list.appendChild(item);
    });
}

// Create announcement item
function createAnnouncementItem(announcement, index) {
    const item = document.createElement('div');
    item.classList.add('announcement-item', 'fade-in');
    item.style.animationDelay = `${index * 0.1}s`;
    
    const statusClass = `status-${announcement.status}`;
    const priorityClass = announcement.priority === 'urgent' ? 'urgent' : 
                        announcement.priority === 'high' ? 'high' : 'normal';
    
    const openRate = announcement.recipients > 0 ? 
        Math.round((announcement.opened / announcement.recipients) * 100) : 0;
    const clickRate = announcement.opened > 0 ? 
        Math.round((announcement.clicked / announcement.opened) * 100) : 0;
    const replyRate = announcement.opened > 0 ? 
        Math.round((announcement.replied / announcement.opened) * 100) : 0;
    
    item.innerHTML = `
        <div class="announcement-header">
            <div>
                <h3 class="announcement-title">${announcement.title}</h3>
                <div class="announcement-meta">
                    <span class="announcement-course">${announcement.courseName}</span>
                    <span class="announcement-date">${formatDate(announcement.date)} at ${announcement.time}</span>
                </div>
            </div>
            <span class="announcement-status ${statusClass}">${announcement.status}</span>
        </div>
        
        <p class="announcement-content">${announcement.content}</p>
        
        <div class="announcement-stats">
            <div class="stat-item">
                <i class="fas fa-users"></i>
                <span>${announcement.recipients} recipients</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-eye"></i>
                <span>${announcement.opened} opened (${openRate}%)</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-mouse-pointer"></i>
                <span>${announcement.clicked} clicked (${clickRate}%)</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-reply"></i>
                <span>${announcement.replied} replied (${replyRate}%)</span>
            </div>
        </div>
        
        <div class="announcement-actions">
            <button class="btn-small btn-view" onclick="viewAnnouncement(${announcement.id})">
                <i class="fas fa-eye"></i> View
            </button>
            <button class="btn-small btn-edit" onclick="editAnnouncement(${announcement.id})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn-small btn-duplicate" onclick="duplicateAnnouncement(${announcement.id})">
                <i class="fas fa-copy"></i> Duplicate
            </button>
            <button class="btn-small btn-delete" onclick="deleteAnnouncement(${announcement.id})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    return item;
}

// Announcement actions
function viewAnnouncement(id) {
    const announcement = announcements.find(a => a.id === id);
    if (announcement) {
        alert(`Announcement: ${announcement.title}\n\nContent: ${announcement.content}\n\nCourse: ${announcement.courseName}\nStatus: ${announcement.status}\nRecipients: ${announcement.recipients}\nOpened: ${announcement.opened}`);
    }
}

function editAnnouncement(id) {
    showModal('createAnnouncementModal');
    // Pre-fill form with announcement data
}

function duplicateAnnouncement(id) {
    const announcement = announcements.find(a => a.id === id);
    if (announcement) {
        const newAnnouncement = {
            ...announcement,
            id: announcements.length + 1,
            title: announcement.title + ' (Copy)',
            status: 'draft',
            date: new Date().toISOString().split('T')[0],
            recipients: 0,
            opened: 0,
            clicked: 0,
            replied: 0
        };
        
        announcements.unshift(newAnnouncement);
        updateAnnouncementsList();
        updateStatistics();
        showNotification('Announcement duplicated successfully', 'success');
    }
}

function deleteAnnouncement(id) {
    if (confirm('Are you sure you want to delete this announcement?')) {
        announcements = announcements.filter(a => a.id !== id);
        updateAnnouncementsList();
        updateStatistics();
        showNotification('Announcement deleted successfully', 'success');
    }
}

// Export functions
function exportAnnouncements() {
    showNotification('Exporting announcements...', 'info');
    setTimeout(() => {
        showNotification('Announcements exported successfully!', 'success');
    }, 1500);
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
    // Create announcement form
    const createAnnouncementForm = document.querySelector('#createAnnouncementModal form');
    if (createAnnouncementForm) {
        createAnnouncementForm.addEventListener('submit', handleCreateAnnouncement);
    }
    
    // Schedule announcement form
    const scheduleAnnouncementForm = document.querySelector('#scheduleAnnouncementModal form');
    if (scheduleAnnouncementForm) {
        scheduleAnnouncementForm.addEventListener('submit', handleScheduleAnnouncement);
    }
    
    // Bulk announcement form
    const bulkAnnouncementForm = document.querySelector('#bulkAnnouncementModal form');
    if (bulkAnnouncementForm) {
        bulkAnnouncementForm.addEventListener('submit', handleBulkAnnouncement);
    }
}

// Form submission handlers
function handleCreateAnnouncement(event) {
    event.preventDefault();
    showNotification('Creating announcement...', 'info');
    
    setTimeout(() => {
        showNotification('Announcement created successfully!', 'success');
        closeModal('createAnnouncementModal');
        event.target.reset();
        updateAnnouncementsList();
        updateStatistics();
    }, 1500);
}

function handleScheduleAnnouncement(event) {
    event.preventDefault();
    showNotification('Scheduling announcement...', 'info');
    
    setTimeout(() => {
        showNotification('Announcement scheduled successfully!', 'success');
        closeModal('scheduleAnnouncementModal');
        event.target.reset();
        updateAnnouncementsList();
        updateStatistics();
    }, 1500);
}

function handleBulkAnnouncement(event) {
    event.preventDefault();
    showNotification('Sending bulk announcements...', 'info');
    
    setTimeout(() => {
        showNotification('Bulk announcements sent successfully!', 'success');
        closeModal('bulkAnnouncementModal');
        event.target.reset();
        updateAnnouncementsList();
        updateStatistics();
    }, 2000);
}

// Update statistics
function updateStatistics() {
    const totalAnnouncements = announcements.length;
    const sentAnnouncements = announcements.filter(a => a.status === 'sent');
    const totalRecipients = sentAnnouncements.reduce((sum, a) => sum + a.recipients, 0);
    const totalOpened = sentAnnouncements.reduce((sum, a) => sum + a.opened, 0);
    const readRate = totalRecipients > 0 ? Math.round((totalOpened / totalRecipients) * 100) : 0;
    const scheduledAnnouncements = announcements.filter(a => a.status === 'scheduled').length;
    
    // Update overview cards
    const overviewCards = document.querySelectorAll('.overview-content h3');
    if (overviewCards[0]) overviewCards[0].textContent = totalAnnouncements;
    if (overviewCards[1]) overviewCards[1].textContent = readRate + '%';
    if (overviewCards[2]) overviewCards[2].textContent = scheduledAnnouncements;
    if (overviewCards[3]) overviewCards[3].textContent = totalRecipients;
    
    // Animate the changes
    overviewCards.forEach(card => {
        card.style.transform = 'scale(1.1)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
}

// Animation functions
function animateStatistics() {
    const statCards = document.querySelectorAll('.overview-card');
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

// Setup real-time updates
function setupRealTimeUpdates() {
    // Update statistics every 30 seconds
    setInterval(() => {
        updateStatistics();
    }, 30000);
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
        month: 'short',
        day: 'numeric'
    });
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + K for search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            const searchInput = document.getElementById('announcementSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
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
