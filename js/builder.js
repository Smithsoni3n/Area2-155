(function () {
  const stage = document.querySelector('[data-builder]');
  if (!stage) return;

  const partIds = {
    jacket: 'part-jacket',
    shirt: 'part-shirt',
    pants: 'part-pants',
    accessory: 'part-accessory'
  };

  let activePart = 'jacket';
  const status = document.getElementById('builder-status');
  const patternLayer = document.getElementById('pattern-layer');

  const palettes = [
    { jacket: '#d95f38', shirt: '#f9dc5c', pants: '#355070', accessory: '#60d394' },
    { jacket: '#6a4c93', shirt: '#ffcad4', pants: '#1982c4', accessory: '#8ac926' },
    { jacket: '#264653', shirt: '#e9c46a', pants: '#2a9d8f', accessory: '#f4a261' },
    { jacket: '#bc4749', shirt: '#f2e8cf', pants: '#386641', accessory: '#a7c957' },
    { jacket: '#f94144', shirt: '#f8961e', pants: '#277da1', accessory: '#90be6d' },
    { jacket: '#5f0f40', shirt: '#9a031e', pants: '#0f4c5c', accessory: '#e36414' },
    { jacket: '#4361ee', shirt: '#4cc9f0', pants: '#3a0ca3', accessory: '#f72585' },
    { jacket: '#1d3557', shirt: '#f1faee', pants: '#457b9d', accessory: '#e63946' },
    { jacket: '#8d99ae', shirt: '#edf2f4', pants: '#2b2d42', accessory: '#ef233c' },
    { jacket: '#ff595e', shirt: '#ffca3a', pants: '#1982c4', accessory: '#6a4c93' }
  ];

  let paletteIndex = 0;

  const setStatus = (msg) => {
    status.textContent = msg;
  };

  const setPartColor = (part, color) => {
    if (part === 'pants') {
      ['part-pants', 'part-pants-right'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.setAttribute('fill', color);
      });
      setStatus(`${part} color changed to ${color}.`);
      return;
    }
    const target = document.getElementById(partIds[part]);
    if (target) {
      target.setAttribute('fill', color);
      setStatus(`${part} color changed to ${color}.`);
    }
  };

  const applyPalette = (palette) => {
    Object.entries(palette).forEach(([part, color]) => setPartColor(part, color));
    setStatus('Applied a new retro look.');
  };

  stage.querySelectorAll('[data-part]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activePart = btn.dataset.part;
      stage.querySelectorAll('[data-part]').forEach((b) => b.classList.toggle('active', b === btn));
      setStatus(`Now editing ${activePart}.`);
    });
  });

  stage.querySelectorAll('[data-hotspot]').forEach((zone) => {
    zone.addEventListener('click', () => {
      activePart = zone.dataset.hotspot;
      setStatus(`Hotspot selected ${activePart}. Pick a swatch.`);
    });
    zone.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activePart = zone.dataset.hotspot;
        setStatus(`Hotspot selected ${activePart}. Pick a swatch.`);
      }
    });
  });

  stage.querySelectorAll('[data-color]').forEach((swatch) => {
    swatch.addEventListener('click', () => {
      setPartColor(activePart, swatch.dataset.color);
    });
  });

  stage.querySelector('[data-try-look]').addEventListener('click', () => {
    paletteIndex = (paletteIndex + 1) % palettes.length;
    applyPalette(palettes[paletteIndex]);
  });

  stage.querySelectorAll('[data-pattern]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pattern = btn.dataset.pattern;
      patternLayer.setAttribute('data-pattern', pattern);
      setStatus(pattern === 'none' ? 'Pattern overlay turned off.' : `Pattern set to ${pattern}.`);
    });
  });

  applyPalette(palettes[0]);
})();
