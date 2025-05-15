// Initialize EmailJS
emailjs.init('AU3FXL97WJ0d3gl-Y'); // ✅ Your Public Key

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  // Change button text to loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  // ✅ Replace with your actual service ID and template ID
  emailjs.sendForm('service_4jaa5ec', 'template_ufuyocl', this)
    .then(() => {
      // Success message
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      this.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 3000);
    }, (err) => {
      // Error message
      submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
      console.error('Email failed to send:', err);
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 3000);
    });
});

// Load Projects from JSON
function loadProjects() {
  fetch('projects.json')
    .then(response => response.json())
    .then(projects => {
      const container = document.getElementById('projects-container');
      
      projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card ${project.category}`;
        projectCard.innerHTML = `
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
        container.appendChild(projectCard);
      });

      // Filter Buttons
      const filterBtns = document.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');

          const filter = this.dataset.filter;
          const projectCards = document.querySelectorAll('.project-card');

          projectCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    })
    .catch(error => console.error('Error loading projects:', error));
}

// Initialize Particles.js
function initParticles() {
  particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Particles.js loaded');
  });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Init functions on load
document.addEventListener('DOMContentLoaded', function() {
  loadProjects();
  initParticles();
});
