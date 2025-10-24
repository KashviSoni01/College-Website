// Research Management JavaScript

// Global variables
let publications = [];
let projects = [];
let awards = [];
let collaborations = [];
let currentTab = 'publications';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadResearchData();
    setupEventListeners();
    updateCurrentTab();
});

// Initialize page elements
function initializePage() {
    // Initialize statistics with animation
    animateStatistics();
    
    // Setup real-time updates
    setupRealTimeUpdates();
}

// Load research data (simulated API call)
function loadResearchData() {
    // Simulate API delay
    setTimeout(() => {
        publications = [
            {
                id: 1,
                title: "Machine Learning Applications in Healthcare",
                authors: "Dr. Williams, J. Smith, M. Johnson",
                journal: "Journal of Medical AI",
                date: "2024-01-15",
                type: "Journal Article",
                citations: 45,
                doi: "10.1000/example",
                abstract: "This paper explores the application of machine learning algorithms in healthcare diagnostics...",
                area: "Machine Learning"
            },
            {
                id: 2,
                title: "Deep Learning for Image Recognition",
                authors: "Dr. Williams, A. Garcia, L. Martinez",
                journal: "IEEE Transactions on Pattern Analysis",
                date: "2023-11-20",
                type: "Conference Paper",
                citations: 32,
                doi: "10.1000/example2",
                abstract: "We present a novel deep learning approach for image recognition tasks...",
                area: "Computer Vision"
            },
            {
                id: 3,
                title: "Data Science in Education",
                authors: "Dr. Williams, S. Wilson, T. Anderson",
                journal: "Educational Data Mining",
                date: "2023-09-10",
                type: "Journal Article",
                citations: 28,
                doi: "10.1000/example3",
                abstract: "This study examines the role of data science in improving educational outcomes...",
                area: "Data Science"
            }
        ];

        projects = [
            {
                id: 1,
                title: "AI-Powered Learning Platform",
                description: "Developing an intelligent learning management system using machine learning algorithms.",
                startDate: "2023-01-01",
                endDate: "2024-12-31",
                status: "active",
                funding: "NSF Grant",
                budget: 250000,
                team: "Dr. Williams, 3 PhD students, 2 Research Assistants",
                progress: 65
            },
            {
                id: 2,
                title: "Healthcare Data Analytics",
                description: "Research project focusing on predictive analytics in healthcare systems.",
                startDate: "2022-06-01",
                endDate: "2024-05-31",
                status: "active",
                funding: "NIH Grant",
                budget: 180000,
                team: "Dr. Williams, 2 PhD students, 1 Postdoc",
                progress: 80
            },
            {
                id: 3,
                title: "Computer Vision for Autonomous Systems",
                description: "Developing computer vision algorithms for autonomous vehicle navigation.",
                startDate: "2021-09-01",
                endDate: "2023-08-31",
                status: "completed",
                funding: "Industry Partnership",
                budget: 150000,
                team: "Dr. Williams, 4 PhD students",
                progress: 100
            }
        ];

        awards = [
            {
                id: 1,
                title: "Excellence in Research Award",
                organization: "Stellan University",
                date: "2023-12-15",
                type: "Research Excellence",
                description: "Recognized for outstanding contributions to machine learning research."
            },
            {
                id: 2,
                title: "Best Paper Award",
                organization: "International Conference on AI",
                date: "2023-10-20",
                type: "Research Excellence",
                description: "Awarded for the paper 'Machine Learning Applications in Healthcare'."
            },
            {
                id: 3,
                title: "Innovation in Education Award",
                organization: "Educational Technology Society",
                date: "2023-06-10",
                type: "Teaching Award",
                description: "Recognized for innovative teaching methods in computer science."
            }
        ];

        collaborations = [
            {
                id: 1,
                title: "AI Research Collaboration",
                partner: "MIT Computer Science",
                type: "Research Partnership",
                startDate: "2023-01-01",
                endDate: "2025-12-31",
                description: "Joint research project on artificial intelligence applications."
            },
            {
                id: 2,
                title: "Healthcare Data Analysis",
                partner: "Johns Hopkins Medical School",
                type: "Research Partnership",
                startDate: "2022-09-01",
                endDate: "2024-08-31",
                description: "Collaborative research on healthcare data analytics and machine learning."
            },
            {
                id: 3,
                title: "Industry Partnership",
                partner: "TechCorp AI Division",
                type: "Industry Collaboration",
                startDate: "2023-03-01",
                endDate: "2024-02-28",
                description: "Industry partnership for applied AI research and development."
            }
        ];
        
        updateCurrentTab();
        updateStatistics();
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
        case 'publications':
            updatePublicationsGrid();
            break;
        case 'projects':
            updateProjectsGrid();
            break;
        case 'awards':
            updateAwardsGrid();
            break;
        case 'collaborations':
            updateCollaborationsGrid();
            break;
    }
}

// Update publications grid
function updatePublicationsGrid() {
    const grid = document.getElementById('publicationsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    publications.forEach((publication, index) => {
        const card = createPublicationCard(publication, index);
        grid.appendChild(card);
    });
}

// Create publication card
function createPublicationCard(publication, index) {
    const card = document.createElement('div');
    card.classList.add('publication-card', 'fade-in');
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="publication-header">
            <div>
                <h3 class="publication-title">${publication.title}</h3>
                <p class="publication-authors">${publication.authors}</p>
            </div>
            <span class="publication-type">${publication.type}</span>
        </div>
        
        <p class="publication-journal">${publication.journal}</p>
        
        <div class="publication-meta">
            <span class="publication-date">${formatDate(publication.date)}</span>
            <span class="publication-citations">${publication.citations} citations</span>
        </div>
        
        <p class="publication-abstract">${publication.abstract}</p>
        
        <div class="publication-actions">
            <button class="btn-small btn-view" onclick="viewPublication(${publication.id})">
                <i class="fas fa-eye"></i> View
            </button>
            <button class="btn-small btn-edit" onclick="editPublication(${publication.id})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn-small btn-delete" onclick="deletePublication(${publication.id})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    return card;
}

// Update projects grid
function updateProjectsGrid() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        grid.appendChild(card);
    });
}

// Create project card
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.classList.add('project-card', 'fade-in');
    card.style.animationDelay = `${index * 0.1}s`;
    
    const statusClass = `status-${project.status}`;
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">${project.title}</h3>
            <span class="project-status ${statusClass}">${project.status}</span>
        </div>
        
        <p class="project-description">${project.description}</p>
        
        <div class="project-meta">
            <div class="project-meta-item">
                <span class="meta-label">Start Date</span>
                <span class="meta-value">${formatDate(project.startDate)}</span>
            </div>
            <div class="project-meta-item">
                <span class="meta-label">End Date</span>
                <span class="meta-value">${formatDate(project.endDate)}</span>
            </div>
            <div class="project-meta-item">
                <span class="meta-label">Funding</span>
                <span class="meta-value">${project.funding}</span>
            </div>
            <div class="project-meta-item">
                <span class="meta-label">Budget</span>
                <span class="meta-value">$${project.budget.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="project-progress">
            <div class="progress-header">
                <span class="progress-label">Progress</span>
                <span class="progress-percentage">${project.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${project.progress}%"></div>
            </div>
        </div>
        
        <div class="publication-actions">
            <button class="btn-small btn-view" onclick="viewProject(${project.id})">
                <i class="fas fa-eye"></i> View
            </button>
            <button class="btn-small btn-edit" onclick="editProject(${project.id})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn-small btn-delete" onclick="deleteProject(${project.id})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    return card;
}

// Update awards grid
function updateAwardsGrid() {
    const grid = document.getElementById('awardsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    awards.forEach((award, index) => {
        const card = createAwardCard(award, index);
        grid.appendChild(card);
    });
}

// Create award card
function createAwardCard(award, index) {
    const card = document.createElement('div');
    card.classList.add('award-card', 'fade-in');
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="award-icon">
            <i class="fas fa-trophy"></i>
        </div>
        
        <h3 class="award-title">${award.title}</h3>
        <p class="award-organization">${award.organization}</p>
        <p class="award-date">${formatDate(award.date)}</p>
        <p class="award-description">${award.description}</p>
    `;
    
    return card;
}

// Update collaborations grid
function updateCollaborationsGrid() {
    const grid = document.getElementById('collaborationsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    collaborations.forEach((collaboration, index) => {
        const card = createCollaborationCard(collaboration, index);
        grid.appendChild(card);
    });
}

// Create collaboration card
function createCollaborationCard(collaboration, index) {
    const card = document.createElement('div');
    card.classList.add('collaboration-card', 'fade-in');
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <h3 class="collaboration-title">${collaboration.title}</h3>
        <p class="collaboration-partner">${collaboration.partner}</p>
        <span class="collaboration-type">${collaboration.type}</span>
        <p class="collaboration-description">${collaboration.description}</p>
        <p class="collaboration-duration">${formatDate(collaboration.startDate)} - ${formatDate(collaboration.endDate)}</p>
    `;
    
    return card;
}

// Publication actions
function viewPublication(id) {
    const publication = publications.find(p => p.id === id);
    if (publication) {
        alert(`Publication: ${publication.title}\n\nAuthors: ${publication.authors}\nJournal: ${publication.journal}\nDate: ${formatDate(publication.date)}\nCitations: ${publication.citations}\nDOI: ${publication.doi}`);
    }
}

function editPublication(id) {
    showModal('addPublicationModal');
    // Pre-fill form with publication data
}

function deletePublication(id) {
    if (confirm('Are you sure you want to delete this publication?')) {
        publications = publications.filter(p => p.id !== id);
        updatePublicationsGrid();
        updateStatistics();
        showNotification('Publication deleted successfully', 'success');
    }
}

// Project actions
function viewProject(id) {
    const project = projects.find(p => p.id === id);
    if (project) {
        alert(`Project: ${project.title}\n\nDescription: ${project.description}\nStatus: ${project.status}\nProgress: ${project.progress}%\nTeam: ${project.team}`);
    }
}

function editProject(id) {
    showModal('createProjectModal');
    // Pre-fill form with project data
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(p => p.id !== id);
        updateProjectsGrid();
        updateStatistics();
        showNotification('Project deleted successfully', 'success');
    }
}

// Export functions
function exportPublications() {
    showNotification('Exporting publications...', 'info');
    setTimeout(() => {
        showNotification('Publications exported successfully!', 'success');
    }, 1500);
}

function exportProjects() {
    showNotification('Exporting projects...', 'info');
    setTimeout(() => {
        showNotification('Projects exported successfully!', 'success');
    }, 1500);
}

function exportAwards() {
    showNotification('Exporting awards...', 'info');
    setTimeout(() => {
        showNotification('Awards exported successfully!', 'success');
    }, 1500);
}

function exportCollaborations() {
    showNotification('Exporting collaborations...', 'info');
    setTimeout(() => {
        showNotification('Collaborations exported successfully!', 'success');
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
    // Add publication form
    const addPublicationForm = document.querySelector('#addPublicationModal form');
    if (addPublicationForm) {
        addPublicationForm.addEventListener('submit', handleAddPublication);
    }
    
    // Create project form
    const createProjectForm = document.querySelector('#createProjectModal form');
    if (createProjectForm) {
        createProjectForm.addEventListener('submit', handleCreateProject);
    }
    
    // Add award form
    const addAwardForm = document.querySelector('#addAwardModal form');
    if (addAwardForm) {
        addAwardForm.addEventListener('submit', handleAddAward);
    }
    
    // Research report form
    const researchReportForm = document.querySelector('#researchReportModal form');
    if (researchReportForm) {
        researchReportForm.addEventListener('submit', handleResearchReport);
    }
}

// Form submission handlers
function handleAddPublication(event) {
    event.preventDefault();
    showNotification('Adding publication...', 'info');
    
    setTimeout(() => {
        showNotification('Publication added successfully!', 'success');
        closeModal('addPublicationModal');
        event.target.reset();
        updatePublicationsGrid();
        updateStatistics();
    }, 1500);
}

function handleCreateProject(event) {
    event.preventDefault();
    showNotification('Creating project...', 'info');
    
    setTimeout(() => {
        showNotification('Project created successfully!', 'success');
        closeModal('createProjectModal');
        event.target.reset();
        updateProjectsGrid();
        updateStatistics();
    }, 1500);
}

function handleAddAward(event) {
    event.preventDefault();
    showNotification('Adding award...', 'info');
    
    setTimeout(() => {
        showNotification('Award added successfully!', 'success');
        closeModal('addAwardModal');
        event.target.reset();
        updateAwardsGrid();
        updateStatistics();
    }, 1500);
}

function handleResearchReport(event) {
    event.preventDefault();
    showNotification('Generating research report...', 'info');
    
    setTimeout(() => {
        showNotification('Research report generated successfully!', 'success');
        closeModal('researchReportModal');
        event.target.reset();
    }, 2000);
}

// Update statistics
function updateStatistics() {
    const totalPublications = publications.length;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const totalCitations = publications.reduce((sum, pub) => sum + pub.citations, 0);
    const totalAwards = awards.length;
    
    // Update overview cards
    const overviewCards = document.querySelectorAll('.overview-content h3');
    if (overviewCards[0]) overviewCards[0].textContent = totalPublications;
    if (overviewCards[1]) overviewCards[1].textContent = activeProjects;
    if (overviewCards[2]) overviewCards[2].textContent = totalCitations;
    if (overviewCards[3]) overviewCards[3].textContent = totalAwards;
    
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
