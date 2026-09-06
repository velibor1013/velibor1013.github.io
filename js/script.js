// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Theme toggle (persisted) ----------
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
}

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// ---------- Scroll progress bar ----------
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${pct}%`;
}

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('.section');
const navLinkEls = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let currentId = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', () => {
  updateScrollProgress();
  setActiveLink();
});
updateScrollProgress();
setActiveLink();

// ---------- Staggered reveal for grid/list items ----------
document.querySelectorAll('.stagger').forEach(group => {
  Array.from(group.children).forEach((child, i) => {
    child.classList.add('fade-in');
    child.style.transitionDelay = `${i * 0.12}s`;
  });
});

// ---------- Fade-in on scroll (IntersectionObserver) ----------
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// ---------- Back to top button ----------
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Hero blob parallax on mouse move ----------
// Parallax is applied to the .hero-blobs container (not the individual
// .blob elements) so it doesn't fight with each blob's own CSS "float"
// keyframe animation, which also animates `transform`.
const heroBlobsContainer = document.querySelector('.hero-blobs');

if (heroBlobsContainer && window.matchMedia('(pointer: fine)').matches) {
  document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    heroBlobsContainer.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  });
}

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
