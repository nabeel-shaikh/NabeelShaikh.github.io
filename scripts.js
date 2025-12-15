// Fade-in on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: 0.2 });
fadeElements.forEach(el => observer.observe(el));

// Navbar show/hide after scroll
const navbar = document.getElementById('navbar');
const homeSection = document.getElementById('home');
window.addEventListener('scroll', () => {
  const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
  if (window.scrollY > homeBottom - 100) {
    navbar.classList.remove('opacity-0', 'pointer-events-none');
    navbar.classList.add('opacity-100');
  } else {
    navbar.classList.add('opacity-0', 'pointer-events-none');
    navbar.classList.remove('opacity-100');
  }
});

// Particles.js configuration
particlesJS("particles-js", {
  particles: {
    number: { value: 1200, density: { enable: true, value_area: 2000 } },
    color: { value: "#7e22ce" },
    shape: { type: "circle" },
    opacity: { value: 0.3, random: false },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 70, color: "#7e22ce", opacity: 0.25, width: 1 },
    move: { enable: true, speed: 0.8, direction: "none", random: false, out_mode: "out", bounce: false }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, resize: true },
    modes: { repulse: { distance: 75, duration: 0.4 } }
  },
  retina_detect: true
});

// Skills Carousel
function initSkillsCarousel() {
  const categories = document.querySelectorAll('.carousel-category');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dots = document.querySelectorAll('.pagination-dot');
  
  if (categories.length === 0) return; // Exit if carousel doesn't exist
  
  let currentIndex = 0;
  const totalCategories = categories.length;

  function showCategory(index) {
    // Remove active class from all categories
    categories.forEach(cat => cat.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current category
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

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', nextCategory);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevCategory);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showCategory(index));
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const carouselContainer = document.querySelector('.skills-carousel-container');
    if (carouselContainer) {
      const rect = carouselContainer.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (isInViewport && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        if (e.key === 'ArrowLeft') {
          prevCategory();
        } else if (e.key === 'ArrowRight') {
          nextCategory();
        }
      }
    }
  });

  // Initialize first category
  showCategory(0);
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkillsCarousel);
} else {
  initSkillsCarousel();
}

// Re-initialize Lucide icons after carousel is set up
if (typeof lucide !== 'undefined') {
  setTimeout(() => lucide.createIcons(), 100);
}
