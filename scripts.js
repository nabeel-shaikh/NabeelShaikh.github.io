// ====== JS for Nabeel Shaikh Portfolio ======

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

// Navbar shadow when scrolling
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active section highlighting (optional)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-accent');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('text-accent');
    }
  });
});



particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 800,
      "density": {
        "enable": true,
        "value_area": 2000
      }
    },
    "color": { "value": "#7e22ce" }, // purple
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.3,
      "random": false
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,         // particles connect to each other
      "distance": 70,        // slightly larger web distance
      "color": "#7e22ce",
      "opacity": 0.25,        // faint base connections
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.8,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"     // ✅ prevents radial pull, keeps natural web
      },
      "onclick": {
        "enable": true
      },
      "resize": true
    },
    "modes": {
      "repulse": {
        "distance": 40,       // subtle push, no collapse toward mouse
        "duration": 0.4
      }
    }
  },
  "retina_detect": true
});

