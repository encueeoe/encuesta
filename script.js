/* ============================================================
   ENCUESTAS UEOE 2026 — script.js
   ============================================================ */

/* ── Datos de las encuestas ───────────────────────────────── */
/* 
  PERSONALIZA AQUÍ:
  - title:  nombre de la encuesta
  - badge:  etiqueta de categoría
  - color:  "blue" | "amber" | "teal"
  - desc:   descripción completa
  - link:   URL del formulario (Google Forms, etc.)
*/
const surveys = [
  {
    title: "Encuesta 1: Estudiantil",
    badge: "Estudiantes",
    color: "blue",
    desc: "La presente encuesta digital tiene como propósito recopilar información relevante sobre el ámbito estudiantil, con el fin de comprender mejor la realidad de los estudiantes dentro de la institución y contribuir a su mejora continua. A través de esta herramienta, se busca conocer la opinión, experiencias y necesidades del alumno, promoviendo la participación activa y el análisis reflexivo sobre su proceso educativo.",
    link: "#"   // ← Reemplaza con el link real de tu formulario
  },
  {
    title: "Encuesta 2: Docentes",
    badge: "Docentes",
    color: "amber",
    desc: "La presente encuesta digital tiene como propósito recopilar información relevante sobre el ámbito docente desde la perspectiva de los maestros, con el fin de comprender mejor la realidad del cuerpo docente dentro de la institución y contribuir a su mejora continua. Se busca conocer la opinión, experiencias y necesidades de los docentes, promoviendo la participación activa.",
    link: "#"   // ← Reemplaza con el link real de tu formulario
  },
  {
    title: "Encuesta 3: Infraestructura",
    badge: "Infraestructura",
    color: "teal",
    desc: "La presente encuesta digital tiene como propósito recopilar información relevante sobre la infraestructura de la institución, con el fin de identificar áreas de mejora en los espacios físicos y recursos disponibles para la comunidad educativa. A través de esta herramienta, se busca evaluar las instalaciones y promover mejoras que beneficien a todos.",
    link: "#"   // ← Reemplaza con el link real de tu formulario
  }
];

/* ── Badge colors per theme ───────────────────────────────── */
const badgeClasses = {
  blue:  "badge--blue",
  amber: "badge--amber",
  teal:  "badge--teal"
};

const btnColors = {
  blue:  "#1D4ED8",
  amber: "#B45309",
  teal:  "#065F46"
};

/* ── SVGs for modal ───────────────────────────────────────── */
const svgBlue = `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="15" y="10" width="52" height="70" rx="6" fill="#BFDBFE" stroke="#93C5FD" stroke-width="1.5"/>
  <rect x="24" y="24" width="28" height="4" rx="2" fill="#1D4ED8" opacity="0.7"/>
  <rect x="24" y="33" width="36" height="3" rx="1.5" fill="#93C5FD"/>
  <rect x="24" y="41" width="30" height="3" rx="1.5" fill="#93C5FD"/>
  <rect x="24" y="54" width="12" height="12" rx="3" fill="#1D4ED8" opacity="0.85"/>
  <path d="M27 60l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="24" y="70" width="12" height="12" rx="3" fill="white" stroke="#93C5FD" stroke-width="1.5"/>
  <circle cx="75" cy="68" r="20" fill="#FCD34D"/>
  <path d="M68 69l4 4 9-9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const svgAmber = `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="15" y="10" width="52" height="70" rx="6" fill="#FDE68A" stroke="#FCD34D" stroke-width="1.5"/>
  <rect x="24" y="24" width="28" height="4" rx="2" fill="#B45309" opacity="0.7"/>
  <rect x="24" y="33" width="36" height="3" rx="1.5" fill="#FCD34D"/>
  <rect x="24" y="41" width="30" height="3" rx="1.5" fill="#FCD34D"/>
  <rect x="24" y="54" width="12" height="12" rx="3" fill="#B45309" opacity="0.85"/>
  <path d="M27 60l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="24" y="70" width="12" height="12" rx="3" fill="white" stroke="#FCD34D" stroke-width="1.5"/>
  <circle cx="75" cy="68" r="20" fill="#1D4ED8"/>
  <path d="M68 69l4 4 9-9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const svgTeal = `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="15" y="10" width="52" height="70" rx="6" fill="#A7F3D0" stroke="#6EE7B7" stroke-width="1.5"/>
  <rect x="24" y="24" width="28" height="4" rx="2" fill="#065F46" opacity="0.7"/>
  <rect x="24" y="33" width="36" height="3" rx="1.5" fill="#6EE7B7"/>
  <rect x="24" y="41" width="30" height="3" rx="1.5" fill="#6EE7B7"/>
  <rect x="24" y="54" width="12" height="12" rx="3" fill="#065F46" opacity="0.85"/>
  <path d="M27 60l3 3 5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="24" y="70" width="12" height="12" rx="3" fill="white" stroke="#6EE7B7" stroke-width="1.5"/>
  <circle cx="75" cy="68" r="20" fill="#FCD34D"/>
  <path d="M68 69l4 4 9-9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const svgMap = { blue: svgBlue, amber: svgAmber, teal: svgTeal };

/* ── Modal logic ──────────────────────────────────────────── */
function openModal(index) {
  const s = surveys[index];
  const overlay = document.getElementById('modalOverlay');
  const img     = document.getElementById('modalImg');
  const badge   = document.getElementById('modalBadge');
  const title   = document.getElementById('modalTitle');
  const desc    = document.getElementById('modalDesc');
  const btn     = document.getElementById('modalBtn');

  img.className   = `modal__img modal__img--${s.color}`;
  img.innerHTML   = svgMap[s.color];
  badge.className = `modal__badge ${badgeClasses[s.color]}`;
  badge.textContent = s.badge;
  title.textContent = s.title;
  desc.textContent  = s.desc;
  btn.href          = s.link;
  btn.style.background = btnColors[s.color];

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ── Hamburger menu ───────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── Scroll animations ────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), Number(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

/* ── Active nav link on scroll ────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
