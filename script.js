// Mouse reactive lights and button hover effects
(function () {
  const primary = document.querySelector('.light--primary');
  const accent = document.querySelector('.light--accent');
  const lights = [primary, accent].filter(Boolean);
  let width = window.innerWidth;
  let height = window.innerHeight;

  function handlePointer(e) {
    const x = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? width / 2;
    const y = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? height / 2;

    // position lights with slight parallax
    if (primary) {
      primary.style.left = x + 'px';
      primary.style.top = y + 'px';
    }
    if (accent) {
      accent.style.left = x * 0.7 + width * 0.15 + 'px';
      accent.style.top = y * 0.8 + height * 0.1 + 'px';
    }

    // update CSS variables for button shine
    document.querySelectorAll('.btn').forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const mx = ((x - rect.left) / rect.width) * 100;
      const my = ((y - rect.top) / rect.height) * 100;
      btn.style.setProperty('--mx', mx + '%');
      btn.style.setProperty('--my', my + '%');
    });
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  window.addEventListener('pointermove', handlePointer, { passive: true });
  window.addEventListener('touchmove', handlePointer, { passive: true });
  window.addEventListener('resize', resize);

  // initial center
  handlePointer({ clientX: width * 0.6, clientY: height * 0.4 });

  // Accessibility: reduce motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    lights.forEach(el => { if (el) el.style.display = 'none'; });
  }
})();


