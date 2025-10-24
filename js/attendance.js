// Attendance Management JavaScript

// Global variables
let students = [];
let filteredStudents = [];
let selectedStudents = new Set();
let currentCourse = 'all';
let currentDate = new Date().toISOString().split('T')[0];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadStudentData();
    setupEventListeners();
    updateAttendanceTable();
});

// Initialize page elements
function initializePage() {
    // Set current date
    document.getElementById('dateFilter').value = currentDate;
    
    // Initialize statistics with animation
    animateStatistics();
    
    // Setup real-time updates
    setupRealTimeUpdates();
}

// Load student data (simulated API call)
function loadStudentData() {
    // Simulate API delay
    setTimeout(() => {
        students = [
            {
                id: 'STU001',
                name: 'John Doe',
                course: 'CS101',
                courseName: 'Introduction to Programming',
                status: 'present',
                attendance: 92,
                lastPresent: '2024-01-14',
                email: 'john.doe@student.stellan.edu'
            },
            {
                id: 'STU002',
                name: 'Jane Smith',
                course: 'CS101',
                courseName: 'Introduction to Programming',
                status: 'absent',
                attendance: 88,
                lastPresent: '2024-01-12',
                email: 'jane.smith@student.stellan.edu'
            },
            {
                id: 'STU003',
                name: 'Mike Johnson',
                course: 'CS201',
                courseName: 'Data Structures & Algorithms',
                status: 'present',
                attendance: 95,
                lastPresent: '2024-01-15',
                email: 'mike.johnson@student.stellan.edu'
            },
            {
                id: 'STU004',
                name: 'Sarah Wilson',
                course: 'CS201',
                courseName: 'Data Structures & Algorithms',
                status: 'excused',
                attendance: 78,
                lastPresent: '2024-01-13',
                email: 'sarah.wilson@student.stellan.edu'
            },
            {
                id: 'STU005',
                name: 'David Brown',
                course: 'CS301',
                courseName: 'Web Development',
                status: 'present',
                attendance: 89,
                lastPresent: '2024-01-15',
                email: 'david.brown@student.stellan.edu'
            },
            {
                id: 'STU006',
                name: 'Emily Davis',
                course: 'CS301',
                courseName: 'Web Development',
                status: 'absent',
                attendance: 65,
                lastPresent: '2024-01-10',
                email: 'emily.davis@student.stellan.edu'
            },
            {
                id: 'STU007',
                name: 'Alex Garcia',
                course: 'CS101',
                courseName: 'Introduction to Programming',
                status: 'present',
                attendance: 91,
                lastPresent: '2024-01-15',
                email: 'alex.garcia@student.stellan.edu'
            },
            {
                id: 'STU008',
                name: 'Lisa Martinez',
                course: 'CS201',
                courseName: 'Data Structures & Algorithms',
                status: 'present',
                attendance: 87,
                lastPresent: '2024-01-15',
                email: 'lisa.martinez@student.stellan.edu'
            },
            {
                id: 'STU009',
                name: 'Tom Anderson',
                course: 'CS301',
                courseName: 'Web Development',
                status: 'excused',
                attendance: 82,
                lastPresent: '2024-01-14',
                email: 'tom.anderson@student.stellan.edu'
            },
            {
                id: 'STU010',
                name: 'Rachel Taylor',
                course: 'CS101',
                courseName: 'Introduction to Programming',
                status: 'present',
                attendance: 94,
                lastPresent: '2024-01-15',
                email: 'rachel.taylor@student.stellan.edu'
            }
        ];
        
        filteredStudents = [...students];
        updateAttendanceTable();
    }, 1000);
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('studentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filter controls
    const courseFilter = document.getElementById('courseFilter');
    const attendanceFilter = document.getElementById('attendanceFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    if (courseFilter) {
        courseFilter.addEventListener('change', handleCourseFilter);
    }
    
    if (attendanceFilter) {
        attendanceFilter.addEventListener('change', handleAttendanceFilter);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', handleDateFilter);
    }
    
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', handleSelectAll);
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
    filterStudents();
}

// Handle course filter
function handleCourseFilter(event) {
    currentCourse = event.target.value;
    filterStudents();
}

// Handle attendance filter
function handleAttendanceFilter(event) {
    filterStudents();
}

// Handle date filter
function handleDateFilter(event) {
    currentDate = event.target.value;
    updateAttendanceTable();
}

// Filter students based on search and filter criteria
function filterStudents() {
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
    const courseFilter = document.getElementById('courseFilter').value;
    const attendanceFilter = document.getElementById('attendanceFilter').value;
    
    filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
                            student.id.toLowerCase().includes(searchTerm) ||
                            student.email.toLowerCase().includes(searchTerm);
        
        const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
        
        let matchesAttendance = true;
        if (attendanceFilter === 'present') {
            matchesAttendance = student.status === 'present';
        } else if (attendanceFilter === 'absent') {
            matchesAttendance = student.status === 'absent';
        } else if (attendanceFilter === 'low') {
            matchesAttendance = student.attendance < 75;
        }
        
        return matchesSearch && matchesCourse && matchesAttendance;
    });
    
    updateAttendanceTable();
}

// Update attendance table
function updateAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (filteredStudents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #6b5a47;">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 15px; display: block;"></i>
                    <h3>No students found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </td>
            </tr>
        `;
        return;
    }
    
    filteredStudents.forEach((student, index) => {
        const row = createStudentRow(student, index);
        tbody.appendChild(row);
    });
}

// Create student row
function createStudentRow(student, index) {
    const row = document.createElement('tr');
    row.classList.add('fade-in');
    row.style.animationDelay = `${index * 0.1}s`;
    
    const statusClass = `status-${student.status}`;
    const attendanceClass = student.attendance >= 90 ? 'high' : 
                          student.attendance >= 75 ? 'medium' : 'low';
    
    row.innerHTML = `
        <td>
            <input type="checkbox" class="student-checkbox" value="${student.id}" 
                   ${selectedStudents.has(student.id) ? 'checked' : ''}>
        </td>
        <td>${student.id}</td>
        <td>
            <div style="display: flex; flex-direction: column;">
                <span style="font-weight: 600; color: #3e2a1e;">${student.name}</span>
                <span style="font-size: 0.8rem; color: #6b5a47;">${student.email}</span>
            </div>
        </td>
        <td>
            <div style="display: flex; flex-direction: column;">
                <span style="font-weight: 500;">${student.course}</span>
                <span style="font-size: 0.8rem; color: #6b5a47;">${student.courseName}</span>
            </div>
        </td>
        <td>
            <span class="status-badge ${statusClass}">${student.status}</span>
        </td>
        <td>
            <span class="attendance-percentage ${attendanceClass}">${student.attendance}%</span>
        </td>
        <td>${formatDate(student.lastPresent)}</td>
        <td>
            <div class="action-buttons-small">
                <button class="btn-small btn-present" onclick="markStudentPresent('${student.id}')">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-small btn-absent" onclick="markStudentAbsent('${student.id}')">
                    <i class="fas fa-times"></i>
                </button>
                <button class="btn-small btn-excused" onclick="markStudentExcused('${student.id}')">
                    <i class="fas fa-user-clock"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Handle select all checkbox
function handleSelectAll(event) {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll('.student-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        const studentId = checkbox.value;
        
        if (isChecked) {
            selectedStudents.add(studentId);
        } else {
            selectedStudents.delete(studentId);
        }
    });
}

// Mark student as present
function markStudentPresent(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        student.status = 'present';
        student.lastPresent = currentDate;
        student.attendance = Math.min(100, student.attendance + 1);
        
        showNotification(`${student.name} marked as present`, 'success');
        updateAttendanceTable();
        updateStatistics();
    }
}

// Mark student as absent
function markStudentAbsent(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        student.status = 'absent';
        student.attendance = Math.max(0, student.attendance - 1);
        
        showNotification(`${student.name} marked as absent`, 'warning');
        updateAttendanceTable();
        updateStatistics();
    }
}

// Mark student as excused
function markStudentExcused(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        student.status = 'excused';
        
        showNotification(`${student.name} marked as excused`, 'info');
        updateAttendanceTable();
        updateStatistics();
    }
}

// Mark selected students as present
function markSelectedPresent() {
    if (selectedStudents.size === 0) {
        showNotification('Please select students first', 'warning');
        return;
    }
    
    selectedStudents.forEach(studentId => {
        markStudentPresent(studentId);
    });
    
    selectedStudents.clear();
    document.getElementById('selectAllCheckbox').checked = false;
    showNotification(`${selectedStudents.size} students marked as present`, 'success');
}

// Mark selected students as absent
function markSelectedAbsent() {
    if (selectedStudents.size === 0) {
        showNotification('Please select students first', 'warning');
        return;
    }
    
    selectedStudents.forEach(studentId => {
        markStudentAbsent(studentId);
    });
    
    selectedStudents.clear();
    document.getElementById('selectAllCheckbox').checked = false;
    showNotification(`${selectedStudents.size} students marked as absent`, 'success');
}

// Select all students
function selectAll() {
    const checkboxes = document.querySelectorAll('.student-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        selectedStudents.add(checkbox.value);
    });
    document.getElementById('selectAllCheckbox').checked = true;
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
    // Mark attendance form
    const markAttendanceForm = document.querySelector('#markAttendanceModal form');
    if (markAttendanceForm) {
        markAttendanceForm.addEventListener('submit', handleMarkAttendance);
    }
    
    // Bulk update form
    const bulkUpdateForm = document.querySelector('#bulkUpdateModal form');
    if (bulkUpdateForm) {
        bulkUpdateForm.addEventListener('submit', handleBulkUpdate);
    }
    
    // Export form
    const exportForm = document.querySelector('#exportModal form');
    if (exportForm) {
        exportForm.addEventListener('submit', handleExport);
    }
    
    // Settings form
    const settingsForm = document.querySelector('#settingsModal form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettings);
    }
}

// Form submission handlers
function handleMarkAttendance(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Starting attendance marking...', 'info');
    
    setTimeout(() => {
        showNotification('Attendance marking started successfully!', 'success');
        closeModal('markAttendanceModal');
        event.target.reset();
    }, 1500);
}

function handleBulkUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Processing bulk update...', 'info');
    
    setTimeout(() => {
        showNotification('Bulk update completed successfully!', 'success');
        closeModal('bulkUpdateModal');
        event.target.reset();
    }, 2000);
}

function handleExport(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Generating report...', 'info');
    
    setTimeout(() => {
        showNotification('Report exported successfully!', 'success');
        closeModal('exportModal');
        event.target.reset();
    }, 2000);
}

function handleSettings(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Saving settings...', 'info');
    
    setTimeout(() => {
        showNotification('Settings saved successfully!', 'success');
        closeModal('settingsModal');
        event.target.reset();
    }, 1500);
}

// Update statistics
function updateStatistics() {
    const totalStudents = students.length;
    const presentStudents = students.filter(s => s.status === 'present').length;
    const overallAttendance = Math.round((presentStudents / totalStudents) * 100);
    const lowAttendanceStudents = students.filter(s => s.attendance < 75).length;
    
    // Update overview cards
    const overviewCards = document.querySelectorAll('.overview-content h3');
    if (overviewCards[0]) overviewCards[0].textContent = totalStudents;
    if (overviewCards[1]) overviewCards[1].textContent = overallAttendance + '%';
    if (overviewCards[2]) overviewCards[2].textContent = lowAttendanceStudents;
    
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
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + K for search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            const searchInput = document.getElementById('studentSearch');
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
        
        // Ctrl/Cmd + A to select all
        if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
            event.preventDefault();
            selectAll();
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
