// Initialize EmailJS
emailjs.init('AU3FXL97WJ0d3gl-Y'); // Your Public Key

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  emailjs.sendForm('service_4jaa5ec', 'template_ufuyocl', this)
    .then(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      this.reset();
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 3000);
    })
    .catch(err => {
      submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
      console.error('Email failed to send:', err);
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 3000);
    });
});

// Load Projects Horizontally
function loadProjects() {
  fetch('projects.json')
    .then(response => response.json())
    .then(projects => {
      const container = document.getElementById('projects-container');
      container.innerHTML = ''; // Clear existing projects

      projects.forEach(project => {
        const card = document.createElement('div');
        card.className = `project-card ${project.category}`;
        card.innerHTML = `
          <img src="${project.image}" alt="${project.title}">
          <div class="project-info">
            <h3>${project.title}</h3>
            <p class="tools">${project.tools}</p>
            <p class="description">${project.description}</p>
            <a href="${project.link}" target="_blank" class="project-link">
              View Project <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        `;
        container.appendChild(card);
      });

      setupFiltering();
    })
    .catch(error => console.error('Error loading projects:', error));
}

// Setup Filter Buttons (optional)
function setupFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;
      const cards = document.querySelectorAll('.project-card');

      cards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize Particles.js
function initParticles() {
  particlesJS.load('particles-js', 'particles.json', () => {
    console.log('Particles.js loaded');
  });
}

function setupArrowScroll() {
 const container = document.getElementById('projects-container');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

function getScrollAmount() {
  const card = container.querySelector('.project-card');
  const gap = 20; // Same as the CSS gap between cards
  return card.offsetWidth + gap;
}

leftArrow.addEventListener('click', () => {
  container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
});

rightArrow.addEventListener('click', () => {
  container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
});


}


// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  initParticles();
  setupArrowScroll();
});
