// Grades Management JavaScript

// Global variables
let students = [];
let assignments = [];
let grades = [];
let filteredGrades = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadGradeData();
    setupEventListeners();
    updateGradesTable();
});

// Initialize page elements
function initializePage() {
    // Initialize statistics with animation
    animateStatistics();
    
    // Setup real-time updates
    setupRealTimeUpdates();
}

// Load grade data (simulated API call)
function loadGradeData() {
    // Simulate API delay
    setTimeout(() => {
        students = [
            { id: 'STU001', name: 'John Doe', course: 'CS101', email: 'john.doe@student.stellan.edu' },
            { id: 'STU002', name: 'Jane Smith', course: 'CS101', email: 'jane.smith@student.stellan.edu' },
            { id: 'STU003', name: 'Mike Johnson', course: 'CS201', email: 'mike.johnson@student.stellan.edu' },
            { id: 'STU004', name: 'Sarah Wilson', course: 'CS201', email: 'sarah.wilson@student.stellan.edu' },
            { id: 'STU005', name: 'David Brown', course: 'CS301', email: 'david.brown@student.stellan.edu' },
            { id: 'STU006', name: 'Emily Davis', course: 'CS301', email: 'emily.davis@student.stellan.edu' },
            { id: 'STU007', name: 'Alex Garcia', course: 'CS101', email: 'alex.garcia@student.stellan.edu' },
            { id: 'STU008', name: 'Lisa Martinez', course: 'CS201', email: 'lisa.martinez@student.stellan.edu' },
            { id: 'STU009', name: 'Tom Anderson', course: 'CS301', email: 'tom.anderson@student.stellan.edu' },
            { id: 'STU010', name: 'Rachel Taylor', course: 'CS101', email: 'rachel.taylor@student.stellan.edu' }
        ];

        assignments = [
            { id: 'assignment1', name: 'Assignment 1', course: 'CS101', maxPoints: 100, weight: 20 },
            { id: 'assignment2', name: 'Assignment 2', course: 'CS101', maxPoints: 100, weight: 20 },
            { id: 'midterm', name: 'Midterm Exam', course: 'CS101', maxPoints: 100, weight: 30 },
            { id: 'final', name: 'Final Exam', course: 'CS101', maxPoints: 100, weight: 30 }
        ];

        grades = [
            { studentId: 'STU001', assignmentId: 'assignment1', grade: 95, comments: 'Excellent work!' },
            { studentId: 'STU001', assignmentId: 'assignment2', grade: 88, comments: 'Good effort' },
            { studentId: 'STU001', assignmentId: 'midterm', grade: 92, comments: 'Well done' },
            { studentId: 'STU001', assignmentId: 'final', grade: 90, comments: 'Great job' },
            { studentId: 'STU002', assignmentId: 'assignment1', grade: 78, comments: 'Needs improvement' },
            { studentId: 'STU002', assignmentId: 'assignment2', grade: 82, comments: 'Better' },
            { studentId: 'STU002', assignmentId: 'midterm', grade: 75, comments: 'Study more' },
            { studentId: 'STU002', assignmentId: 'final', grade: 80, comments: 'Good progress' },
            { studentId: 'STU003', assignmentId: 'assignment1', grade: 90, comments: 'Excellent' },
            { studentId: 'STU003', assignmentId: 'assignment2', grade: 85, comments: 'Very good' },
            { studentId: 'STU003', assignmentId: 'midterm', grade: 88, comments: 'Well prepared' },
            { studentId: 'STU003', assignmentId: 'final', grade: 87, comments: 'Good work' }
        ];
        
        filteredGrades = [...grades];
        updateGradesTable();
        updateStatistics();
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
    const assignmentFilter = document.getElementById('assignmentFilter');
    const gradeFilter = document.getElementById('gradeFilter');
    
    if (courseFilter) {
        courseFilter.addEventListener('change', handleCourseFilter);
    }
    
    if (assignmentFilter) {
        assignmentFilter.addEventListener('change', handleAssignmentFilter);
    }
    
    if (gradeFilter) {
        gradeFilter.addEventListener('change', handleGradeFilter);
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
    filterGrades();
}

// Handle course filter
function handleCourseFilter(event) {
    filterGrades();
}

// Handle assignment filter
function handleAssignmentFilter(event) {
    filterGrades();
}

// Handle grade filter
function handleGradeFilter(event) {
    filterGrades();
}

// Filter grades based on search and filter criteria
function filterGrades() {
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
    const courseFilter = document.getElementById('courseFilter').value;
    const assignmentFilter = document.getElementById('assignmentFilter').value;
    const gradeFilter = document.getElementById('gradeFilter').value;
    
    filteredGrades = grades.filter(grade => {
        const student = students.find(s => s.id === grade.studentId);
        const assignment = assignments.find(a => a.id === grade.assignmentId);
        
        if (!student || !assignment) return false;
        
        const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
                            student.id.toLowerCase().includes(searchTerm) ||
                            student.email.toLowerCase().includes(searchTerm);
        
        const matchesCourse = courseFilter === 'all' || assignment.course === courseFilter;
        const matchesAssignment = assignmentFilter === 'all' || grade.assignmentId === assignmentFilter;
        
        let matchesGrade = true;
        if (gradeFilter === 'excellent') {
            matchesGrade = grade.grade >= 90;
        } else if (gradeFilter === 'good') {
            matchesGrade = grade.grade >= 80 && grade.grade < 90;
        } else if (gradeFilter === 'average') {
            matchesGrade = grade.grade >= 70 && grade.grade < 80;
        } else if (gradeFilter === 'poor') {
            matchesGrade = grade.grade >= 60 && grade.grade < 70;
        } else if (gradeFilter === 'failing') {
            matchesGrade = grade.grade < 60;
        }
        
        return matchesSearch && matchesCourse && matchesAssignment && matchesGrade;
    });
    
    updateGradesTable();
}

// Update grades table
function updateGradesTable() {
    const tbody = document.getElementById('gradesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Group grades by student
    const studentGrades = {};
    students.forEach(student => {
        studentGrades[student.id] = {
            student: student,
            grades: {},
            average: 0,
            letterGrade: 'F'
        };
    });
    
    filteredGrades.forEach(grade => {
        if (studentGrades[grade.studentId]) {
            studentGrades[grade.studentId].grades[grade.assignmentId] = grade;
        }
    });
    
    // Calculate averages and letter grades
    Object.values(studentGrades).forEach(studentData => {
        const studentGradesList = Object.values(studentData.grades);
        if (studentGradesList.length > 0) {
            const total = studentGradesList.reduce((sum, grade) => sum + grade.grade, 0);
            studentData.average = Math.round(total / studentGradesList.length);
            studentData.letterGrade = getLetterGrade(studentData.average);
        }
    });
    
    // Display students in table
    Object.values(studentGrades).forEach((studentData, index) => {
        const row = createStudentGradeRow(studentData, index);
        tbody.appendChild(row);
    });
}

// Create student grade row
function createStudentGradeRow(studentData, index) {
    const row = document.createElement('tr');
    row.classList.add('fade-in');
    row.style.animationDelay = `${index * 0.1}s`;
    
    const student = studentData.student;
    const grades = studentData.grades;
    
    row.innerHTML = `
        <td>
            <div style="display: flex; flex-direction: column;">
                <span style="font-weight: 600; color: #3e2a1e;">${student.name}</span>
                <span style="font-size: 0.8rem; color: #6b5a47;">${student.id}</span>
            </div>
        </td>
        <td>
            <div class="grade-cell ${getGradeClass(grades.assignment1?.grade || 0)}">
                ${grades.assignment1?.grade || '-'}
            </div>
        </td>
        <td>
            <div class="grade-cell ${getGradeClass(grades.assignment2?.grade || 0)}">
                ${grades.assignment2?.grade || '-'}
            </div>
        </td>
        <td>
            <div class="grade-cell ${getGradeClass(grades.midterm?.grade || 0)}">
                ${grades.midterm?.grade || '-'}
            </div>
        </td>
        <td>
            <div class="grade-cell ${getGradeClass(grades.final?.grade || 0)}">
                ${grades.final?.grade || '-'}
            </div>
        </td>
        <td>
            <span style="font-weight: 600; color: #3e2a1e;">${studentData.average}%</span>
        </td>
        <td>
            <span class="grade-cell ${getGradeClass(studentData.average)}">
                ${studentData.letterGrade}
            </span>
        </td>
        <td>
            <div class="grade-actions">
                <button class="btn-small btn-edit" onclick="editGrade('${student.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small btn-view" onclick="viewGradeDetails('${student.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-small btn-delete" onclick="deleteGrade('${student.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Get grade class based on grade value
function getGradeClass(grade) {
    if (grade >= 90) return 'grade-excellent';
    if (grade >= 80) return 'grade-good';
    if (grade >= 70) return 'grade-average';
    if (grade >= 60) return 'grade-poor';
    return 'grade-failing';
}

// Get letter grade based on percentage
function getLetterGrade(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
}

// Edit grade
function editGrade(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        showModal('gradeAssignmentModal');
        
        // Pre-fill form with student data
        const courseSelect = document.getElementById('gradeCourse');
        const studentSelect = document.getElementById('gradeStudent');
        
        if (courseSelect) courseSelect.value = student.course;
        if (studentSelect) studentSelect.value = studentId;
    }
}

// View grade details
function viewGradeDetails(studentId) {
    const student = students.find(s => s.id === studentId);
    const studentGrades = grades.filter(g => g.studentId === studentId);
    
    if (student && studentGrades.length > 0) {
        let details = `Grade Details for ${student.name}\n\n`;
        studentGrades.forEach(grade => {
            const assignment = assignments.find(a => a.id === grade.assignmentId);
            if (assignment) {
                details += `${assignment.name}: ${grade.grade}%\n`;
                if (grade.comments) {
                    details += `Comments: ${grade.comments}\n`;
                }
                details += '\n';
            }
        });
        
        alert(details);
    } else {
        showNotification('No grades found for this student', 'warning');
    }
}

// Delete grade
function deleteGrade(studentId) {
    if (confirm('Are you sure you want to delete all grades for this student?')) {
        grades = grades.filter(g => g.studentId !== studentId);
        updateGradesTable();
        updateStatistics();
        showNotification('Grades deleted successfully', 'success');
    }
}

// Export grades
function exportGrades() {
    showNotification('Exporting grades...', 'info');
    
    setTimeout(() => {
        showNotification('Grades exported successfully!', 'success');
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
    // Grade assignment form
    const gradeAssignmentForm = document.querySelector('#gradeAssignmentModal form');
    if (gradeAssignmentForm) {
        gradeAssignmentForm.addEventListener('submit', handleGradeAssignment);
    }
    
    // Bulk grade form
    const bulkGradeForm = document.querySelector('#bulkGradeModal form');
    if (bulkGradeForm) {
        bulkGradeForm.addEventListener('submit', handleBulkGrade);
    }
    
    // Create assignment form
    const createAssignmentForm = document.querySelector('#createAssignmentModal form');
    if (createAssignmentForm) {
        createAssignmentForm.addEventListener('submit', handleCreateAssignment);
    }
    
    // Grade report form
    const gradeReportForm = document.querySelector('#gradeReportModal form');
    if (gradeReportForm) {
        gradeReportForm.addEventListener('submit', handleGradeReport);
    }
}

// Form submission handlers
function handleGradeAssignment(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const studentId = document.getElementById('gradeStudent').value;
    const assignmentId = document.getElementById('gradeAssignment').value;
    const gradeValue = parseInt(document.getElementById('gradeValue').value);
    const comments = document.getElementById('gradeComments').value;
    
    if (studentId && assignmentId && gradeValue >= 0 && gradeValue <= 100) {
        // Update or add grade
        const existingGradeIndex = grades.findIndex(g => 
            g.studentId === studentId && g.assignmentId === assignmentId
        );
        
        if (existingGradeIndex >= 0) {
            grades[existingGradeIndex] = { studentId, assignmentId, grade: gradeValue, comments };
        } else {
            grades.push({ studentId, assignmentId, grade: gradeValue, comments });
        }
        
        updateGradesTable();
        updateStatistics();
        showNotification('Grade submitted successfully!', 'success');
        closeModal('gradeAssignmentModal');
        event.target.reset();
    } else {
        showNotification('Please fill in all required fields', 'error');
    }
}

function handleBulkGrade(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Processing bulk upload...', 'info');
    
    setTimeout(() => {
        showNotification('Bulk upload completed successfully!', 'success');
        closeModal('bulkGradeModal');
        event.target.reset();
    }, 2000);
}

function handleCreateAssignment(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Creating assignment...', 'info');
    
    setTimeout(() => {
        showNotification('Assignment created successfully!', 'success');
        closeModal('createAssignmentModal');
        event.target.reset();
    }, 1500);
}

function handleGradeReport(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showNotification('Generating report...', 'info');
    
    setTimeout(() => {
        showNotification('Report generated successfully!', 'success');
        closeModal('gradeReportModal');
        event.target.reset();
    }, 2000);
}

// Update statistics
function updateStatistics() {
    const totalStudents = students.length;
    const totalGrades = grades.length;
    const averageGrade = grades.length > 0 ? 
        Math.round(grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length * 10) / 10 : 0;
    const failingStudents = students.filter(student => {
        const studentGrades = grades.filter(g => g.studentId === student.id);
        if (studentGrades.length === 0) return false;
        const average = studentGrades.reduce((sum, grade) => sum + grade.grade, 0) / studentGrades.length;
        return average < 60;
    }).length;
    
    // Update overview cards
    const overviewCards = document.querySelectorAll('.overview-content h3');
    if (overviewCards[0]) overviewCards[0].textContent = totalStudents;
    if (overviewCards[1]) overviewCards[1].textContent = averageGrade + '%';
    if (overviewCards[2]) overviewCards[2].textContent = totalGrades;
    if (overviewCards[3]) overviewCards[3].textContent = failingStudents;
    
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
