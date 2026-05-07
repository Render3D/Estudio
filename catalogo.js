/* ── catalogo.js ── */
 
(function () {
  const grid       = document.getElementById('masonry-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('sort-select');
  const countEl    = document.getElementById('count');
  const emptyState = document.getElementById('empty-state');
 
  if (!grid) return; // solo corre en catalogo.html
 
  // ─── Estado actual ────────────────────────────────────────────
  let currentFilter = 'all';
  let currentSort   = 'recent'; // 'recent' | 'oldest'
 
  // ─── Helpers ──────────────────────────────────────────────────
  function getAllCards() {
    return Array.from(grid.querySelectorAll('.render-card'));
  }
 
  // Parsea "YYYY-MM" → número comparable
  function dateValue(card) {
    const raw = card.dataset.date || '2000-01';
    const [year, month] = raw.split('-').map(Number);
    return year * 100 + month;
  }
 
  // ─── Renderizar: filtrar + ordenar + contar ────────────────────
  function render() {
    const cards = getAllCards();
 
    // 1) Ordenar en el DOM (reinserta según orden)
    const sorted = [...cards].sort((a, b) => {
      const diff = dateValue(b) - dateValue(a); // desc = más reciente primero
      return currentSort === 'recent' ? diff : -diff;
    });
 
    sorted.forEach(card => grid.appendChild(card)); // reinserta en orden
 
    // 2) Mostrar / ocultar según filtro
    let visible = 0;
    sorted.forEach(card => {
      const match = currentFilter === 'all' || card.dataset.category === currentFilter;
      card.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });
 
    // 3) Actualizar contador y estado vacío
    countEl.textContent = visible;
    emptyState.hidden   = visible > 0;
  }
 
  // ─── Eventos: filtros ──────────────────────────────────────────
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
 
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
 
      render();
    });
  });
 
  // ─── Eventos: ordenamiento ─────────────────────────────────────
  sortSelect?.addEventListener('change', () => {
    currentSort = sortSelect.value;
    render();
  });
 
  // ─── Animación de entrada con scroll ──────────────────────────
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
 
  function observeCards() {
    getAllCards().forEach(card => {
      card.style.opacity = '0';
      observer.observe(card);
    });
  }
 
  // ─── Init ──────────────────────────────────────────────────────
  render();
  observeCards();
})();
