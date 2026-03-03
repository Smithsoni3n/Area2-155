(function () {
  const textBtn = document.querySelector('[data-toggle="text-size"]');
  const contrastBtn = document.querySelector('[data-toggle="contrast"]');

  const applyPrefs = () => {
    const largeText = localStorage.getItem('prefLargeText') === 'true';
    const highContrast = localStorage.getItem('prefHighContrast') === 'true';
    document.body.classList.toggle('large-text', largeText);
    document.body.classList.toggle('high-contrast', highContrast);
    if (textBtn) {
      textBtn.setAttribute('aria-pressed', String(largeText));
      textBtn.textContent = largeText ? 'Text size: Large' : 'Text size: Normal';
    }
    if (contrastBtn) {
      contrastBtn.setAttribute('aria-pressed', String(highContrast));
      contrastBtn.textContent = highContrast ? 'High contrast: On' : 'High contrast: Off';
    }
  };

  if (textBtn) {
    textBtn.addEventListener('click', () => {
      const current = localStorage.getItem('prefLargeText') === 'true';
      localStorage.setItem('prefLargeText', String(!current));
      applyPrefs();
    });
  }

  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => {
      const current = localStorage.getItem('prefHighContrast') === 'true';
      localStorage.setItem('prefHighContrast', String(!current));
      applyPrefs();
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.card[data-type]');
  if (filterButtons.length && cards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selected = btn.dataset.filter;
        filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
        cards.forEach((card) => {
          const show = selected === 'all' || card.dataset.type === selected;
          card.hidden = !show;
        });
      });
    });
  }

  applyPrefs();
})();
