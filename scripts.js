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

// Typewriter hero tagline
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Software Engineer',
    'React & TypeScript Developer',
    'Airtable Builder',
    'Full-Stack Problem Solver'
  ];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = phrases[0];
    document.querySelector('.typewriter-cursor')?.remove();
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 70);
    } else {
      charIndex--;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 40);
    }
  }

  tick();
}

initTypewriter();

if (typeof lucide !== 'undefined') {
  setTimeout(() => lucide.createIcons(), 100);
}