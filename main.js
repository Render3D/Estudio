/* ── main.js ── */
 
// ─── Menú hamburguesa ───────────────────────────────────────────
const toggle = document.querySelector('.menu-toggle');
const nav    = document.querySelector('.site-nav');
 
toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
 
// Cerrar menú al hacer click en un link
nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});
 
 
// ─── Filtros del catálogo ───────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.render-card');
 
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
 
    // Estado activo
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
 
    // Mostrar / ocultar cards
    cards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});
 
 
// ─── Animación suave al hacer scroll (Intersection Observer) ────
const revealEls = document.querySelectorAll(
  '.render-card, .statement-text, .about-image, .about-text, .contact-item'
);
 
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both';
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
 
revealEls.forEach(el => {
  el.style.opacity = '0';
  revealObserver.observe(el);
});

 
// ─── Hero Carrusel ──────────────────────────────────────────────
(function () {
  const slides  = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
 
  const INTERVAL = 5000; // ← ms entre slides, cambialo a gusto
 
  let current = 0;
 
  function goTo(index) {
    slides[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
  }
 
  // Arrancar en el primero y lanzar el timer
  goTo(0);
  setInterval(() => goTo(current + 1), INTERVAL);
})();
