// ============================================================
// Theme toggle
// ============================================================
const toggle = document.getElementById('theme-toggle');
const html   = document.documentElement;
updateIcon(html.getAttribute('data-theme'));

toggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
});

function updateIcon(t) {
  toggle.textContent = t === 'dark' ? '☀️' : '🌙';
}

// ============================================================
// Mobile menu
// ============================================================
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Collapsible "show more" lists (e.g. Certifications)
// ============================================================
document.querySelectorAll('.cert-toggle').forEach(btn => {
  const target = document.getElementById(btn.getAttribute('aria-controls'));
  if (!target) return;
  const count = target.querySelectorAll('.cert-item').length;

  btn.textContent = `Show ${count} more`;

  btn.addEventListener('click', () => {
    const willShow = target.hasAttribute('hidden');
    target.toggleAttribute('hidden', !willShow);
    btn.setAttribute('aria-expanded', willShow);
    btn.textContent = willShow ? 'Show less' : `Show ${count} more`;
  });
});

// ============================================================
// Scroll-into-view fade animations
// ============================================================
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ============================================================
// Active nav link highlight on scroll
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');

if (navAs.length) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAs.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
}
