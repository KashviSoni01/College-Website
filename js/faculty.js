// Optional: highlight the current page in sidebar
const links = document.querySelectorAll(".sidebar-menu a");
links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});
