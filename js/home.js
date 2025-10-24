const rankCards = document.querySelectorAll('.rank-card');

window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;

  rankCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 200); // delay for staggered animation
    }
  });
});
// Get modal
const modal = document.getElementById("modal");
const modalName = document.getElementById("modal-name");
const modalRole = document.getElementById("modal-role");
const modalBio = document.getElementById("modal-bio");
const closeBtn = document.querySelector(".close");

// Add click listener to each card
document.querySelectorAll(".spotlight-card").forEach(card => {
  card.addEventListener("click", () => {
    modalName.textContent = card.getAttribute("data-name");
    modalRole.textContent = card.getAttribute("data-role");
    modalBio.textContent = card.getAttribute("data-bio");
    modal.style.display = "flex"; // show modal
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Counter Animation
    const counters = document.querySelectorAll('.count');
    const speed = 200;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const box = entry.target;
          box.classList.add('visible');

          const counter = box.querySelector('.count');
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / speed);

          const updateCount = () => {
            count += increment;
            if (count < target) {
              counter.innerText = count;
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target.toLocaleString();
            }
          };

          updateCount();
          observer.unobserve(box);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.stat-box').forEach(box => {
      observer.observe(box);
    });
