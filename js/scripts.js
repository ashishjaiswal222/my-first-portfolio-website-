// Initialize AOS
AOS.init({ duration: 1200, once: true });

// Initialize particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: '#f4b400' },
    shape: { type: 'circle' },
    opacity: { value: 0.6, random: true },
    size: { value: 4, random: true },
    line_linked: { enable: true, distance: 150, color: '#f4b400', opacity: 0.5, width: 1 },
    move: { enable: true, speed: 3, direction: 'none', random: false, straight: false, out_mode: 'out' }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
  },
  retina_detect: true
});

// Initialize Typed.js
const typed = new Typed('.typed-text', {
  strings: ['I am Nandani, a Professional Video Editor', 'Crafting Visual Stories with Passion', 'Graphic Designer & Animator'],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  backDelay: 2000
});

// Initialize Circle Progress
document.querySelectorAll('.skill-circle').forEach(circle => {
  const percent = circle.getAttribute('data-percent');
  new CircleProgress(circle.querySelector('.circle-progress'), {
    value: percent / 100,
    size: 150,
    thickness: 10,
    fill: 'url(#gradient)',
    emptyFill: '#e9ecef'
  });
});

// Initialize Swiper.js
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: { el: '.swiper-pagination', clickable: true },
  autoplay: { delay: 3000 },
  breakpoints: {
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  }
});

// Initialize Rellax.js
const rellax = new Rellax('.parallax', { speed: -2 });

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
  localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
});

// Load Theme from localStorage
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-theme');
  themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Smooth Scroll and Section Transitions
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
      targetElement.classList.add('active');
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Contact Form Submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  showAlert('Contact form is disabled. Please reach out directly via call (+917005268952) or email (nandaniburman76@gmail.com). Sorry for the inconvenience!');
  this.reset();
});

// Newsletter Form Submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  showAlert('Newsletter signup coming soon! Stay tuned for updates.');
  this.reset();
});

// Feedback Form Submission
document.querySelector('.feedback-form').addEventListener('submit', function(e) {
  e.preventDefault();
  showAlert('Feedback form coming soon! Thank you for your interest.');
  this.reset();
});

// File Existence Check for Resume
document.querySelectorAll('.resume-link').forEach(link => {
  link.addEventListener('click', async function(e) {
    e.preventDefault();
    const url = this.getAttribute('href');
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        window.location.href = url;
      } else {
        showAlert('File not found. Please try again later.');
      }
    } catch {
      showAlert('Error accessing file. Please try again later.');
    }
  });
});

// Custom Alert Function
function showAlert(message) {
  const alert = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  alertMessage.textContent = message;
  alert.style.display = 'flex';
}

function closeAlert() {
  const alert = document.getElementById('customAlert');
  alert.style.display = 'none';
}

// CTA Popup
function showCtaPopup() {
  if (localStorage.getItem('hideCtaPopup') !== 'true') {
    const popup = document.getElementById('ctaPopup');
    popup.style.display = 'flex';
  }
}

function closeCtaPopup() {
  const popup = document.getElementById('ctaPopup');
  const dontShowAgain = document.getElementById('dontShowAgain').checked;
  if (dontShowAgain) {
    localStorage.setItem('hideCtaPopup', 'true');
  }
  popup.style.display = 'none';
}

setTimeout(showCtaPopup, 30000);

// Dynamic Banner Positioning
window.addEventListener('scroll', () => {
  const banners = document.querySelectorAll('.hire-banner');
  banners.forEach(banner => {
    const section = banner.getAttribute('data-section');
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        banner.style.opacity = '1';
      } else {
        banner.style.opacity = '0.3';
      }
    }
  });
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('Service Worker registered:', reg);
  }).catch(err => {
    console.error('Service Worker registration failed:', err);
  });
}

// Call loadProjects to load projects on page load
document.addEventListener('DOMContentLoaded', () => {
  if (typeof loadProjects === 'function') {
    loadProjects();
  } else {
    console.error('loadProjects function is not defined');
  }
  // Add active class to #home section to make it visible initially
  const homeSection = document.getElementById('home');
  if (homeSection) {
    homeSection.classList.add('active');
  }

  // Add active class to all sections to ensure visibility
  const allSections = document.querySelectorAll('section');
  allSections.forEach(section => {
    if (!section.classList.contains('active')) {
      section.classList.add('active');
    }
  });

  // Filter buttons functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      projectItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Project modal functionality
  const projectModal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('projectModalLabel');
  const modalContent = document.getElementById('modalContent');
  const modalDetails = document.getElementById('modalDetails');

  projectModal.addEventListener('show.bs.modal', event => {
    const trigger = event.relatedTarget;
    const title = trigger.getAttribute('data-title');
    const video = trigger.getAttribute('data-video');
    const details = trigger.getAttribute('data-details');

    modalTitle.textContent = title;
    modalDetails.textContent = details;

    modalContent.innerHTML = `
      <div class="ratio ratio-16x9">
        <iframe src="${video}" title="${title}" allowfullscreen></iframe>
      </div>
    `;
  });

  // Clear modal content on close to stop video playback
  projectModal.addEventListener('hidden.bs.modal', () => {
    modalContent.innerHTML = '';
  });
});
