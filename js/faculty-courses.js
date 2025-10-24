// Faculty Courses JavaScript - Enhanced Functionality

// Global variables
let courses = [];
let filteredCourses = [];
let currentFilter = 'all';
let searchTerm = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadCourseData();
    animateElements();
});

// Initialize page elements
function initializePage() {
    // Add loading animation to course cards
    const courseContainer = document.getElementById('courses-container');
    if (courseContainer) {
        courseContainer.classList.add('loading');
    }
    
    // Initialize statistics with animation
    animateStatistics();
    
    // Setup real-time updates
    setupRealTimeUpdates();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('courseSearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilter);
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

// Load course data (simulated API call)
function loadCourseData() {
    // Simulate API delay
    setTimeout(() => {
        courses = [
            {
                id: 1,
                title: "Introduction to Programming",
                code: "CS101",
                description: "Learn Python basics including variables, loops, functions, and small projects. This course provides a solid foundation in programming concepts.",
                duration: "12 weeks",
                students: 120,
                progress: 45,
                status: "active",
                instructor: "Prof. Williams",
                schedule: "Mon, Wed, Fri 10:00 AM",
                room: "CS-201",
                credits: 3,
                attendance: 92,
                assignments: 5,
                nextClass: "2024-01-15",
                materials: 12,
                announcements: 3,
                lastUpdated: new Date().toISOString(),
                difficulty: "Beginner",
                prerequisites: ["None"],
                objectives: [
                    "Understand basic programming concepts",
                    "Write simple Python programs",
                    "Debug and test code effectively"
                ]
            },
            {
                id: 2,
                title: "Data Structures & Algorithms",
                code: "CS201",
                description: "Covers arrays, linked lists, stacks, queues, trees, and sorting/searching algorithms. Advanced programming concepts and problem-solving techniques.",
                duration: "10 weeks",
                students: 90,
                progress: 70,
                status: "active",
                instructor: "Prof. Williams",
                schedule: "Tue, Thu 2:00 PM",
                room: "CS-301",
                credits: 4,
                attendance: 88,
                assignments: 7,
                nextClass: "2024-01-16",
                materials: 18,
                announcements: 2,
                lastUpdated: new Date().toISOString(),
                difficulty: "Intermediate",
                prerequisites: ["CS101"],
                objectives: [
                    "Master fundamental data structures",
                    "Implement efficient algorithms",
                    "Analyze algorithm complexity"
                ]
            },
            {
                id: 3,
                title: "Web Development",
                code: "CS301",
                description: "Build websites with HTML, CSS, JS, and understand basic backend concepts. Full-stack development fundamentals.",
                duration: "14 weeks",
                students: 75,
                progress: 30,
                status: "active",
                instructor: "Prof. Williams",
                schedule: "Mon, Wed 4:00 PM",
                room: "CS-401",
                credits: 3,
                attendance: 95,
                assignments: 3,
                nextClass: "2024-01-15",
                materials: 8,
                announcements: 1,
                lastUpdated: new Date().toISOString(),
                difficulty: "Intermediate",
                prerequisites: ["CS101", "CS201"],
                objectives: [
                    "Build responsive web applications",
                    "Understand frontend and backend concepts",
                    "Deploy web applications"
                ]
            }
        ];
        
        filteredCourses = [...courses];
        renderCourses();
        
        // Remove loading state
        const courseContainer = document.getElementById('courses-container');
        if (courseContainer) {
            courseContainer.classList.remove('loading');
        }
    }, 1000);
}

// Handle search functionality
function handleSearch(event) {
    searchTerm = event.target.value.toLowerCase();
    filterCourses();
}

// Handle filter functionality
function handleFilter(event) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    currentFilter = event.target.getAttribute('data-filter');
    filterCourses();
}

// Filter courses based on search and filter criteria
function filterCourses() {
    filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                            course.code.toLowerCase().includes(searchTerm) ||
                            course.description.toLowerCase().includes(searchTerm);
        
        const matchesFilter = currentFilter === 'all' || course.status === currentFilter;
        
        return matchesSearch && matchesFilter;
    });
    
    renderCourses();
}

// Render courses to the DOM
function renderCourses() {
    const container = document.getElementById('courses-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (filteredCourses.length === 0) {
        container.innerHTML = `
            <div class="no-courses">
                <i class="fas fa-search"></i>
                <h3>No courses found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    filteredCourses.forEach((course, index) => {
        const card = createCourseCard(course);
        card.style.animationDelay = `${index * 0.1}s`;
        container.appendChild(card);
    });
}

// Create individual course card
function createCourseCard(course) {
    const card = document.createElement('div');
    card.classList.add('course-card', 'fade-in');
    card.setAttribute('data-status', course.status);
    
    const statusColor = getStatusColor(course.status);
    const progressColor = getProgressColor(course.progress);
    
    card.innerHTML = `
        <div class="course-header">
            <div class="course-title-section">
                <h3>${course.title}</h3>
                <span class="course-code">${course.code}</span>
            </div>
            <div class="course-status" style="background-color: ${statusColor}">
                ${course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </div>
        </div>
        
        <div class="course-description">${course.description}</div>
        
        <div class="course-stats">
            <div class="stat-item">
                <i class="fas fa-users"></i>
                <span>${course.students} Students</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-clock"></i>
                <span>${course.schedule}</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${course.room}</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-credit-card"></i>
                <span>${course.credits} Credits</span>
            </div>
        </div>
        
        <div class="progress-section">
            <div class="progress-header">
                <span>Course Progress</span>
                <span>${course.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-bar-inner" style="width: ${course.progress}%; background: ${progressColor}"></div>
            </div>
        </div>
        
        <div class="course-metrics">
            <div class="metric">
                <div class="metric-value">${course.attendance}%</div>
                <div class="metric-label">Attendance</div>
            </div>
            <div class="metric">
                <div class="metric-value">${course.assignments}</div>
                <div class="metric-label">Assignments</div>
            </div>
            <div class="metric">
                <div class="metric-value">${course.materials}</div>
                <div class="metric-label">Materials</div>
            </div>
        </div>
        
        <div class="course-actions">
            <button class="action-btn primary" onclick="viewCourse(${course.id})">
                <i class="fas fa-eye"></i>
                View Details
            </button>
            <button class="action-btn secondary" onclick="manageCourse(${course.id})">
                <i class="fas fa-cog"></i>
                Manage
            </button>
            <button class="action-btn tertiary" onclick="uploadMaterial(${course.id})">
                <i class="fas fa-upload"></i>
                Upload
            </button>
        </div>
    `;
    
    return card;
}

// Get status color based on course status
function getStatusColor(status) {
    const colors = {
        'active': '#4CAF50',
        'completed': '#2196F3',
        'upcoming': '#FF9800',
        'paused': '#9E9E9E'
    };
    return colors[status] || '#9E9E9E';
}

// Get progress color based on progress percentage
function getProgressColor(progress) {
    if (progress < 30) return 'linear-gradient(90deg, #f44336, #d32f2f)';
    if (progress < 60) return 'linear-gradient(90deg, #ff9800, #f57c00)';
    if (progress < 80) return 'linear-gradient(90deg, #4caf50, #388e3c)';
    return 'linear-gradient(90deg, #2196f3, #1976d2)';
}

// Course action functions
function viewCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    // Create detailed course view modal
    const modal = createCourseDetailModal(course);
    document.body.appendChild(modal);
    showModal(modal.id);
}

function manageCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    // Show course management options
    const options = [
        'View Student Roster',
        'Manage Assignments',
        'Grade Book',
        'Attendance Tracking',
        'Course Settings',
        'Export Data'
    ];
    
    const choice = prompt(`Manage ${course.title}:\n\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\nEnter option number:`);
    
    if (choice && choice >= 1 && choice <= options.length) {
        alert(`Opening: ${options[choice - 1]}`);
    }
}

function uploadMaterial(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    showModal('uploadModal');
    
    // Pre-select the course in the modal
    const courseSelect = document.querySelector('#uploadModal select');
    if (courseSelect) {
        courseSelect.value = course.title;
    }
}

// Create detailed course modal
function createCourseDetailModal(course) {
    const modal = document.createElement('div');
    modal.id = 'courseDetailModal';
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <span class="close" onclick="closeModal('courseDetailModal')">&times;</span>
            <h2>${course.title} - ${course.code}</h2>
            
            <div class="course-detail-content">
                <div class="detail-section">
                    <h3>Course Information</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Instructor:</label>
                            <span>${course.instructor}</span>
                        </div>
                        <div class="detail-item">
                            <label>Credits:</label>
                            <span>${course.credits}</span>
                        </div>
                        <div class="detail-item">
                            <label>Duration:</label>
                            <span>${course.duration}</span>
                        </div>
                        <div class="detail-item">
                            <label>Difficulty:</label>
                            <span>${course.difficulty}</span>
                        </div>
                        <div class="detail-item">
                            <label>Schedule:</label>
                            <span>${course.schedule}</span>
                        </div>
                        <div class="detail-item">
                            <label>Room:</label>
                            <span>${course.room}</span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Prerequisites</h3>
                    <ul>
                        ${course.prerequisites.map(prereq => `<li>${prereq}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h3>Learning Objectives</h3>
                    <ul>
                        ${course.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h3>Course Statistics</h3>
                    <div class="stats-grid">
                        <div class="stat-box">
                            <div class="stat-number">${course.students}</div>
                            <div class="stat-label">Students</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">${course.attendance}%</div>
                            <div class="stat-label">Attendance</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">${course.assignments}</div>
                            <div class="stat-label">Assignments</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">${course.materials}</div>
                            <div class="stat-label">Materials</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return modal;
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
        
        // Remove modal from DOM if it's a dynamically created one
        if (modalId === 'courseDetailModal') {
            modal.remove();
        }
    }
}

// Setup form handlers
function setupFormHandlers() {
    // Upload form
    const uploadForm = document.querySelector('#uploadModal form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUpload);
    }
    
    // Announcement form
    const announcementForm = document.querySelector('#announcementModal form');
    if (announcementForm) {
        announcementForm.addEventListener('submit', handleAnnouncement);
    }
    
    // Grade form
    const gradeForm = document.querySelector('#gradeModal form');
    if (gradeForm) {
        gradeForm.addEventListener('submit', handleGradeUpload);
    }
    
    // Schedule form
    const scheduleForm = document.querySelector('#scheduleModal form');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', handleSchedule);
    }
}

// Form submission handlers
function handleUpload(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Simulate upload process
    showNotification('Uploading materials...', 'info');
    
    setTimeout(() => {
        showNotification('Materials uploaded successfully!', 'success');
        closeModal('uploadModal');
        event.target.reset();
    }, 2000);
}

function handleAnnouncement(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Sending announcement...', 'info');
    
    setTimeout(() => {
        showNotification('Announcement sent to students!', 'success');
        closeModal('announcementModal');
        event.target.reset();
    }, 1500);
}

function handleGradeUpload(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Processing grades...', 'info');
    
    setTimeout(() => {
        showNotification('Grades uploaded successfully!', 'success');
        closeModal('gradeModal');
        event.target.reset();
    }, 2000);
}

function handleSchedule(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Scheduling class...', 'info');
    
    setTimeout(() => {
        showNotification('Class scheduled successfully!', 'success');
        closeModal('scheduleModal');
        event.target.reset();
    }, 1500);
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

// Animation functions
function animateElements() {
    // Animate statistics on load
    const statCards = document.querySelectorAll('.stat-card');
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

function animateStatistics() {
    const statValues = document.querySelectorAll('.stat-content h3');
    statValues.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue);
            }
        }, 30);
    });
}

// Setup real-time updates
function setupRealTimeUpdates() {
    // Update statistics every 30 seconds
    setInterval(() => {
        updateStatistics();
    }, 30000);
    
    // Update course progress every minute
    setInterval(() => {
        updateCourseProgress();
    }, 60000);
}

function updateStatistics() {
    // Simulate real-time updates
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const value = card.querySelector('.stat-content h3');
        if (value) {
            const currentValue = parseInt(value.textContent);
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newValue = Math.max(0, currentValue + change);
            value.textContent = newValue;
        }
    });
}

function updateCourseProgress() {
    // Simulate progress updates
    courses.forEach(course => {
        if (course.status === 'active' && course.progress < 100) {
            course.progress += Math.random() * 2;
            course.progress = Math.min(100, course.progress);
        }
    });
    
    // Re-render courses if needed
    if (currentFilter === 'all' || courses.some(c => c.status === currentFilter)) {
        renderCourses();
    }
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + K for search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            const searchInput = document.getElementById('courseSearch');
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

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
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
    
    .course-detail-content {
        max-height: 60vh;
        overflow-y: auto;
    }
    
    .detail-section {
        margin-bottom: 25px;
        padding: 20px;
        background: #f8f6f3;
        border-radius: 12px;
    }
    
    .detail-section h3 {
        color: #3e2a1e;
        margin-bottom: 15px;
        font-size: 1.2rem;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
    }
    
    .detail-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    .detail-item label {
        font-weight: 600;
        color: #6b5a47;
        font-size: 0.9rem;
    }
    
    .detail-item span {
        color: #3e2a1e;
        font-weight: 500;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 15px;
    }
    
    .stat-box {
        text-align: center;
        padding: 15px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .stat-number {
        font-size: 1.5rem;
        font-weight: 700;
        color: #3e2a1e;
    }
    
    .stat-label {
        font-size: 0.8rem;
        color: #6b5a47;
        text-transform: uppercase;
        font-weight: 500;
    }
    
    .no-courses {
        text-align: center;
        padding: 60px 20px;
        color: #6b5a47;
    }
    
    .no-courses i {
        font-size: 3rem;
        color: #a67c52;
        margin-bottom: 20px;
    }
    
    .no-courses h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: #3e2a1e;
    }
`;
document.head.appendChild(style);