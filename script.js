/**
 * Vidyashree M - Portfolio Website
 * Interactive features: typing effect, scroll reveal, navbar, skills animation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initNavbar();
  initHamburger();
  initScrollReveal();
  initSkillBars();
  initScrollToTop();
  initContactForm();
  initSmoothScroll();
});

/* ===== Typing Effect ===== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const phrases = [
    'Java Full Stack Development',
    'Web Development',
    'HTML & CSS',
    'Problem Solving',
    'Building Modern Apps'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseEnd = 2000;
  const pauseStart = 500;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = pauseStart;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ===== Navbar Scroll & Active Link ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ===== Hamburger Menu ===== */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute(
      'aria-expanded',
      hamburger.classList.contains('active')
    );
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ===== Scroll Reveal Animations ===== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

/* ===== Animated Skill Bars ===== */
function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const percent = card.dataset.skill;
          const progressBar = card.querySelector('.skill-progress');
          const percentText = card.querySelector('.skill-percent');

          if (progressBar && percent) {
            progressBar.style.width = `${percent}%`;
          }
          if (percentText) {
            animateCounter(percentText, 0, parseInt(percent, 10), 1500);
          }
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillCards.forEach((card) => observer.observe(card));
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * easeOut);
    element.textContent = `${current}%`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ===== Scroll to Top Button ===== */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== Contact Form ===== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showFormStatus(statusEl, 'Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormStatus(statusEl, 'Please enter a valid email address.', 'error');
      return;
    }

    showFormStatus(
      statusEl,
      'Thank you! Your message has been received. I will get back to you soon.',
      'success'
    );
    form.reset();

    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }, 5000);
  });
}

function showFormStatus(element, message, type) {
  element.textContent = message;
  element.className = `form-status ${type}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ===== Smooth Scroll for Anchor Links ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
