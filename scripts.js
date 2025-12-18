// Fade-in on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));

// Reveal on scroll (for Experience section)
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { 
    if (entry.isIntersecting) {
      entry.target.classList.add('active'); 
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

// Navbar Active State & Scroll Visibility
const navbar = document.getElementById('navbar');
const homeSection = document.getElementById('home');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  // Visibility logic: Show navbar after scrolling past Home
  if (homeSection) {
    const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
    if (window.scrollY > homeBottom - 150) {
      navbar.classList.remove('opacity-0', 'pointer-events-none');
      navbar.classList.add('opacity-100');
    } else {
      navbar.classList.add('opacity-0', 'pointer-events-none');
      navbar.classList.remove('opacity-100');
    }
  }

  // Active link logic
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    // Offset for fixed navbar
    if (window.scrollY >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    link.classList.remove('text-accent');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
      link.classList.add('text-accent');
    }
  });
});

// Particles.js configuration
if (document.getElementById("particles-js")) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#7e22ce" },
      shape: { type: "circle" },
      opacity: { value: 0.2, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#7e22ce", opacity: 0.1, width: 1 },
      move: { enable: true, speed: 1, direction: "none", random: false, out_mode: "out", bounce: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, resize: true },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.3 } } }
    },
    retina_detect: true
  });
}

// Skills Carousel
function initSkillsCarousel() {
  const categories = document.querySelectorAll('.carousel-category');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dots = document.querySelectorAll('.pagination-dot');
  
  if (categories.length === 0) return; 
  
  let currentIndex = 0;
  const totalCategories = categories.length;

  function showCategory(index) {
    categories.forEach(cat => cat.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (categories[index]) {
      categories[index].classList.add('active');
    }
    if (dots[index]) {
      dots[index].classList.add('active');
    }
    
    currentIndex = index;
  }

  function nextCategory() {
    const nextIndex = (currentIndex + 1) % totalCategories;
    showCategory(nextIndex);
  }

  function prevCategory() {
    const prevIndex = (currentIndex - 1 + totalCategories) % totalCategories;
    showCategory(prevIndex);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextCategory);
  if (prevBtn) prevBtn.addEventListener('click', prevCategory);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showCategory(index));
  });

  document.addEventListener('keydown', (e) => {
    const carouselContainer = document.querySelector('.skills-carousel-container');
    if (carouselContainer) {
      const rect = carouselContainer.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (isInViewport && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        // e.preventDefault(); // Optional: prevent scroll
        if (e.key === 'ArrowLeft') prevCategory();
        else if (e.key === 'ArrowRight') nextCategory();
      }
    }
  });

  showCategory(0);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkillsCarousel);
} else {
  initSkillsCarousel();
}

if (typeof lucide !== 'undefined') {
  setTimeout(() => lucide.createIcons(), 100);
}