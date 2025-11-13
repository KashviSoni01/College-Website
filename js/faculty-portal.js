// Faculty Portal Script (mirrors student portal structure)

// Demo faculty database
const facultyDB = {
  'FAC2024001': {
    id: 'FAC2024001',
    firstName: 'Priya',
    lastName: 'Sharma',
    password: 'faculty123',
    email: 'priya.sharma@stellan.edu',
    phone: '+91 98765 11111',
    department: 'Computer Science',
    courses: [
      { code: 'CS301', title: 'Data Structures', students: 42 },
      { code: 'CS302', title: 'Algorithms', students: 38 },
      { code: 'CS303', title: 'Database Systems', students: 40 }
    ]
  }
};

let currentFaculty = null;

// Init
document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('currentFaculty');
  if (saved) {
    // Already logged in: go straight to dedicated dashboard
    window.location.href = 'faculty-dashboard.html';
    return;
  }

  const form = document.getElementById('facultyPortalLoginForm');
  if (form) form.addEventListener('submit', handleFacultyLogin);
});

function handleFacultyLogin(e) {
  e.preventDefault();
  const id = document.getElementById('facId').value.trim();
  const pass = document.getElementById('facPassword').value;
  const err = document.getElementById('facLoginError');

  if (facultyDB[id] && facultyDB[id].password === pass) {
    currentFaculty = facultyDB[id];
    localStorage.setItem('currentFaculty', JSON.stringify(currentFaculty));
    if (err) err.textContent = '';
    // Redirect to dedicated dashboard page
    window.location.href = 'faculty-dashboard.html';
  } else {
    if (err) err.textContent = 'Invalid Faculty ID or Password. Please try again.';
  }
}

function showFacultyDashboard() {
  const auth = document.getElementById('authSection');
  const dash = document.getElementById('facultyDashboard');
  if (auth) auth.style.display = 'none';
  if (dash) dash.style.display = 'block';

  // Populate header info
  const name = `${currentFaculty.firstName} ${currentFaculty.lastName}`;
  const nameEl = document.getElementById('facultyName'); if (nameEl) nameEl.textContent = name;
  const idEl = document.getElementById('facultyId'); if (idEl) idEl.textContent = currentFaculty.id;
  const depEl = document.getElementById('facultyDept'); if (depEl) depEl.textContent = currentFaculty.department;

  // Overview
  const ovDept = document.getElementById('ovDept'); if (ovDept) ovDept.textContent = currentFaculty.department;
  const ovCourses = document.getElementById('ovCourses'); if (ovCourses) ovCourses.textContent = currentFaculty.courses.length;
  const ovStudents = document.getElementById('ovStudents'); if (ovStudents) ovStudents.textContent = currentFaculty.courses.reduce((a,c)=>a+c.students,0);

  // Courses
  renderFacultyCourses();
  // Materials placeholder
  renderMaterials();
  // Announcements placeholder
  renderAnnouncements();
  // Attendance/Grades placeholders
  renderAttendance();
  renderGrades();
}

function showFacultySection(section) {
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const btn = Array.from(document.querySelectorAll('.nav-btn')).find(el=>el.getAttribute('onclick')?.includes(`'${section}'`));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.dashboard-section').forEach(s=>s.classList.remove('active'));
  const panel = document.getElementById(section + 'Section');
  if (panel) panel.classList.add('active');
}

function renderFacultyCourses() {
  const host = document.getElementById('facultyCourses');
  if (!host) return;
  host.innerHTML = currentFaculty.courses.map(c=>`
    <div class="subject-card">
      <h5>${c.title} (${c.code})</h5>
      <div class="subject-meta"><span><i class="fas fa-user-graduate"></i> ${c.students} students</span></div>
      <div class="subject-actions">
        <button class="btn" onclick="openAttendance('${c.code}')"><i class="fas fa-user-check"></i> Attendance</button>
        <button class="btn" onclick="openGrades('${c.code}')"><i class="fas fa-clipboard-list"></i> Grades</button>
        <button class="btn" onclick="openUpload('${c.code}')"><i class="fas fa-upload"></i> Upload Material</button>
      </div>
    </div>`).join('');
}

function renderMaterials() {
  const grid = document.getElementById('materialsGrid');
  if (!grid) return;
  grid.innerHTML = [
    { title: 'Week 1 Slides', subject: 'Data Structures' },
    { title: 'Assignment 1 Spec', subject: 'Algorithms' }
  ].map(m=>`
    <div class="material-card">
      <div class="material-title">${m.title}</div>
      <div class="material-meta">${m.subject}</div>
      <div class="material-actions"><button class="btn">View</button></div>
    </div>`).join('');
}

function renderAnnouncements() {
  const list = document.getElementById('announcementsList');
  if (!list) return;
  list.innerHTML = `
    <div class="announcement-item">
      <h4>Project Milestone 1</h4>
      <div class="announcement-meta">${new Date().toLocaleDateString()}</div>
      <div class="announcement-body">Submit proposal by Friday.</div>
    </div>`;
}

function renderAttendance() {
  const root = document.getElementById('attendanceList');
  if (!root) return;
  root.innerHTML = currentFaculty.courses.map(c=>`
    <div class="download-card">
      <h5>${c.code} • ${c.title}</h5>
      <button class="download-material-btn" onclick="openAttendance('${c.code}')"><i class="fas fa-user-check"></i> Take Attendance</button>
    </div>`).join('');
}

function renderGrades() {
  const root = document.getElementById('gradesList');
  if (!root) return;
  root.innerHTML = currentFaculty.courses.map(c=>`
    <div class="download-card">
      <h5>${c.code} • ${c.title}</h5>
      <button class="download-material-btn" onclick="openGrades('${c.code}')"><i class="fas fa-clipboard-list"></i> Enter Grades</button>
    </div>`).join('');
}

// Simple actions (stubs)
function openAttendance(code) { alert('Open attendance sheet for ' + code); }
function openGrades(code) { alert('Open grades sheet for ' + code); }
function openUpload(code) { alert('Upload material for ' + code); }

function messageClass(code) {
  alert('Open message composer for ' + code);
}

function sendAnnouncement() {
  const subject = document.getElementById('msgSubject')?.value || '(No subject)';
  const body = document.getElementById('msgBody')?.value || '';
  const out = document.getElementById('sentMessages');
  if (out) {
    out.insertAdjacentHTML('afterbegin', `<div class="download-card"><h5>${subject}</h5><div>${body}</div></div>`);
  }
  alert('Announcement sent');
}

function facultyLogout() {
  currentFaculty = null;
  localStorage.removeItem('currentFaculty');
  const dash = document.getElementById('facultyDashboard'); if (dash) dash.style.display = 'none';
  const auth = document.getElementById('authSection'); if (auth) auth.style.display = 'block';
  try { sessionStorage.clear(); } catch(e) {}
  // Ensure we land on the Faculty Portal login screen
  window.location.href = 'faculty-portal.html';
}
