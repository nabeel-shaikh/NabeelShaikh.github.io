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
