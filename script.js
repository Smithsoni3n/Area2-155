/**
 * INFRARED JUNGLE — script.js
 * =====================================================
 * All interactivity for the Infrared Jungle site.
 * Designed for GitHub Pages (no build step, vanilla JS).
 *
 * Contents:
 *  1. Thermal Altitude Modal Data
 *  2. Gallery Modal Data
 *  3. Hero Parallax
 *  4. Thermal Vision Flip Toggle
 *  5. Altitude Row → Modal (5 colour buttons)
 *  6. Gallery Card → Modal
 *  7. Modal Helpers (open, close, keyboard, backdrop)
 *  8. Init
 */


/* =====================================================
   1. THERMAL ALTITUDE MODAL DATA
   Each key matches the data-color attribute on .alt-row
   ===================================================== */
const ALTITUDE_DATA = {

  yellow: {
    color:    '#FFD700',
    shadow:   '0 0 18px 5px rgba(255,215,0,0.5)',
    textClass:'text-yellow',
    fillStyle:'background: linear-gradient(90deg, rgba(255,215,0,0.3), #FFD700); box-shadow: 0 0 10px rgba(255,215,0,0.5);',
    title:    'Solar Yellow',
    sub:      'PEAK ALTITUDE — 100%',
    pct:      100,
    photo:    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Bright sunlight breaking through jungle canopy',
    stat:     'Maximum Temperature Value in Scene',
    mental:   'Immediate Action — Highest Priority / Danger',
    badge:    'DANGER / PRIORITY',
    body: [
      'Solar Yellow represents the <strong style="color:#FFD700;">absolute peak</strong> — the single hottest point in the current thermal scene. In any Look-Up Table, this value is always assigned the highest luminance to ensure your visual cortex identifies it first.',
      'Evolution has tuned our brains to process yellow at maximum speed. Warning signs, hazard tape, emergency lights — all exploit this same neural pathway. In the jungle, this is where sunlight breaks through the canopy and heats surfaces to their absolute maximum.'
    ]
  },

  orange: {
    color:    '#FF6B1A',
    shadow:   '0 0 18px 5px rgba(255,107,26,0.5)',
    textClass:'text-orange',
    fillStyle:'background: linear-gradient(90deg, rgba(255,107,26,0.3), #FF6B1A); box-shadow: 0 0 10px rgba(255,107,26,0.5);',
    title:    'Thermal Orange',
    sub:      'HIGH ALTITUDE — 75–90%',
    pct:      82,
    photo:    'https://images.unsplash.com/photo-1504198322253-cfa87a0ff60f?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Warm tropical rainforest canopy glowing with heat',
    stat:     'Active Thermal Energy / Biological Life Signatures',
    mental:   'Vitality — "Moving" or "Alive" Heat Signatures',
    badge:    'LIFE SIGNATURES',
    body: [
      'Thermal Orange marks the <strong style="color:#FF6B1A;">vitality zone</strong> — the signature of active biological life. Warm-blooded animals, actively metabolizing plants, and running machinery all radiate heat in this 75–90% band.',
      'Our brains perceive orange as moving and alive. In thermal imaging, orange says "something is here, something is active." This is the signal hunters, search-and-rescue teams, and military operators look for first.'
    ]
  },

  moss: {
    color:    '#7FBF00',
    shadow:   '0 0 18px 5px rgba(127,191,0,0.5)',
    textClass:'text-moss',
    fillStyle:'background: linear-gradient(90deg, rgba(127,191,0,0.3), #7FBF00); box-shadow: 0 0 10px rgba(127,191,0,0.5);',
    title:    'Electric Moss',
    sub:      'MID ALTITUDE — 40–60%',
    pct:      50,
    photo:    'https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Dense green jungle undergrowth',
    stat:     'Ambient Baseline / Stable Environmental Heat',
    mental:   'Neutrality — Background "Clutter" or Static Nature',
    badge:    'BACKGROUND / STATIC',
    body: [
      'Electric Moss sits at the <strong style="color:#7FBF00;">mid-range baseline</strong> — the ambient temperature of the environment itself. Rocks, soil, large leaves, and stable vegetation radiate in this band during daylight hours.',
      'The brain processes this as "background clutter" — context data that does not demand immediate attention. It is the statistical mean of the scene, the reference point against which all other thermal values are measured and compared.'
    ]
  },

  green: {
    color:    '#2ecc71',
    shadow:   '0 0 18px 5px rgba(46,204,113,0.5)',
    textClass:'text-green',
    fillStyle:'background: linear-gradient(90deg, rgba(46,204,113,0.3), #2ecc71); box-shadow: 0 0 10px rgba(46,204,113,0.5);',
    title:    'Forest Green',
    sub:      'LOW ALTITUDE — 20–30%',
    pct:      25,
    photo:    'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Dark shaded jungle floor with tangled tree roots',
    stat:     'Thermal Absorption / Cooler Dense Materials',
    mental:   'Serenity — Safe, Non-threatening Environment',
    badge:    'SAFE / NON-THREAT',
    body: [
      'Forest Green indicates <strong style="color:#2ecc71;">thermal absorption</strong> — dense materials like standing water, wet soil, and thick shaded vegetation that absorb rather than radiate infrared energy.',
      'Psychologically, green signals safety and stability. In thermal context this is confirmed: low energy, stable, no threat. Shaded jungle floors, north-facing slopes, and deep bodies of water all present this signature.'
    ]
  },

  purple: {
    color:    '#BF5FFF',
    shadow:   '0 0 18px 5px rgba(191,95,255,0.5)',
    textClass:'text-accent',
    fillStyle:'background: linear-gradient(90deg, rgba(191,95,255,0.3), #BF5FFF); box-shadow: 0 0 10px rgba(191,95,255,0.5);',
    title:    'Shadow Purple',
    sub:      'BASE ALTITUDE — 0–10%',
    pct:      5,
    photo:    'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Misty dark jungle river flowing through dense forest',
    stat:     'Thermal Voids / Absolute Minimum Temperature',
    mental:   'Mystery — "Emptiness" or Absence of Data',
    badge:    'VOID / ABSENCE',
    body: [
      'Shadow Purple is the <strong style="color:#BF5FFF;">0% base altitude</strong> — the absolute thermal minimum of the scene. Deep caverns, cold water, night-shaded stone, and sub-ambient surfaces register here.',
      'The brain reads deep purple as absence — "nothing here." In the jungle, deep shadow zones, cold streams, and cave entrances all produce this void signature. It is the statistical floor against which all higher thermal altitudes are defined.'
    ]
  }
};


/* =====================================================
   2. GALLERY MODAL DATA
   ===================================================== */
const GALLERY_DATA = [
  {
    img:    'https://images.unsplash.com/photo-1504198322253-cfa87a0ff60f?w=900&q=85&auto=format&fit=crop',
    alt:    'Tropical rainforest canopy with warm golden light',
    title:  'Canopy Heat Zone',
    band:   'THERMAL ORANGE — 75–90%',
    color:  '#FF6B1A',
    body:   'The upper jungle canopy absorbs direct solar radiation and re-radiates it at 75–90% intensity. Leaf surfaces warming in direct sun produce the strongest biological thermal signature visible from above — this is where life\'s heat blooms brightest.'
  },
  {
    img:    'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=900&q=85&auto=format&fit=crop',
    alt:    'Misty jungle river winding through dense tropical forest',
    title:  'River Thermal Void',
    band:   'SHADOW PURPLE — 0–10%',
    color:  '#BF5FFF',
    body:   'Flowing water presents one of the coldest signatures in a jungle thermal scan. Rivers and streams absorb heat rather than radiating it, creating deep purple voids that cut through the warm orange of surrounding vegetation like cold veins in the earth.'
  },
  {
    img:    'https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=900&q=85&auto=format&fit=crop',
    alt:    'Dense green jungle undergrowth and tropical foliage',
    title:  'Undergrowth Baseline',
    band:   'ELECTRIC MOSS — 40–60%',
    color:  '#7FBF00',
    body:   'The shaded floor layer of the jungle exists in thermal equilibrium — neither absorbing nor radiating aggressively. This ambient baseline represents the mean temperature of the environment, the statistical reference point against which all other bands are measured.'
  },
  {
    img:    'https://images.unsplash.com/photo-1518378188049-8e11c5bc741b?w=900&q=85&auto=format&fit=crop',
    alt:    'Tropical wildlife in the jungle',
    title:  'Wildlife Heat Signature',
    band:   'SOLAR YELLOW — 100%',
    color:  '#FFD700',
    body:   'Warm-blooded animals radiate at peak thermal altitude — their metabolic heat output places them at the very top of the LUT scale. In a jungle scan, any mammal or bird will always appear in the brightest yellow band, instantly distinguishable from all background vegetation.'
  },
  {
    img:    'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=900&q=85&auto=format&fit=crop',
    alt:    'Dark jungle floor with tangled ancient tree roots',
    title:  'Root System Absorption',
    band:   'FOREST GREEN — 20–30%',
    color:  '#2ecc71',
    body:   'Buried root systems and wet, compacted soil in deep shade create strong thermal absorption zones. These appear as cool green patches on the thermal map — dense organic matter storing rather than releasing energy, the jungle\'s thermal batteries charging quietly underground.'
  },
  {
    img:    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85&auto=format&fit=crop',
    alt:    'Sunlight breaking through dense jungle canopy',
    title:  'Solar Penetration Zones',
    band:   'FULL LUT SPECTRUM',
    color:  '#FFD700',
    body:   'Where sunlight pierces the canopy, all five thermal altitude bands appear simultaneously: the beam itself at peak yellow; illuminated leaves at orange; partially shaded vegetation at moss; deeper shade at green; and the dark floor at shadow purple — the complete statistical hierarchy in a single scene.'
  }
];


/* =====================================================
   3. HERO PARALLAX
   ===================================================== */
function initParallax() {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;

  // Use requestAnimationFrame for smooth, non-blocking scroll
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const offset = window.scrollY;
        // Move the background at 18% of scroll speed
        heroBg.style.transform = `scale(1.12) translateY(${offset * 0.18}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}


/* =====================================================
   4. THERMAL VISION FLIP TOGGLE
   ===================================================== */
function initFlip() {
  const flipCard = document.getElementById('flipCard');
  const flipBtn  = document.getElementById('flipBtn');
  if (!flipCard || !flipBtn) return;

  let isFlipped = false;

  function toggleFlip() {
    isFlipped = !isFlipped;
    flipCard.classList.toggle('is-flipped', isFlipped);
    flipBtn.setAttribute('aria-pressed', String(isFlipped));
    flipBtn.textContent = isFlipped
      ? '◀ NORMAL VISION'
      : '▶ ACTIVATE THERMAL VISION';
  }

  // Button click
  flipBtn.addEventListener('click', toggleFlip);

  // Also allow clicking directly on the card
  flipCard.addEventListener('click', toggleFlip);

  // Keyboard: Enter or Space on the card
  flipCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  });
}


/* =====================================================
   5. ALTITUDE ROWS → MODAL
   ===================================================== */
function initAltitudeRows() {
  const rows = document.querySelectorAll('.alt-row[data-color]');

  rows.forEach((row) => {
    // Click
    row.addEventListener('click', () => {
      openAltModal(row.dataset.color);
    });

    // Keyboard: Enter or Space
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAltModal(row.dataset.color);
      }
    });
  });
}

function openAltModal(key) {
  const d = ALTITUDE_DATA[key];
  if (!d) return;

  const content = document.getElementById('altModalContent');
  if (!content) return;

  // Build modal HTML
  content.innerHTML = `
    <img
      src="${d.photo}"
      alt="${d.photoAlt}"
      class="modal-hero-photo"
    />
    <div class="modal-body">
      <div class="modal-header">
        <div
          class="modal-orb"
          style="background:${d.color}; box-shadow:${d.shadow};"
          aria-hidden="true"
        ></div>
        <div>
          <h3 id="altModalTitle" class="modal-name" style="color:${d.color};">${d.title}</h3>
          <p class="modal-sub">${d.sub}</p>
        </div>
      </div>

      <!-- Altitude progress bar -->
      <div class="modal-altitude-label-row">
        <span style="color: var(--col-muted); font-family: var(--font-mono); font-size: var(--fs-mono);">THERMAL ALTITUDE</span>
        <span style="color:${d.color}; font-family: var(--font-mono); font-size: var(--fs-mono);">${d.pct}%</span>
      </div>
      <div class="modal-altitude-track">
        <div
          id="altModalFill"
          class="modal-altitude-fill"
          style="${d.fillStyle}"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="${d.pct}"
          role="progressbar"
        ></div>
      </div>

      <!-- Stat boxes -->
      <div class="modal-stats-grid">
        <div class="modal-stat-box">
          <p class="modal-stat-label">STAT. REPRESENTATION</p>
          <p class="modal-stat-value" style="color:${d.color};">${d.stat}</p>
        </div>
        <div class="modal-stat-box">
          <p class="modal-stat-label">MENTAL PROCESSING</p>
          <p class="modal-stat-value" style="color:${d.color};">${d.mental}</p>
        </div>
      </div>

      <!-- Body paragraphs -->
      ${d.body.map(p => `<p class="modal-text">${p}</p>`).join('')}

      <!-- Badge -->
      <span class="modal-badge" style="color:${d.color}; border-color:${d.color};">
        ◈ ${d.badge}
      </span>
    </div>
  `;

  openModal('altModal');

  // Animate the progress bar after the modal is visible
  setTimeout(() => {
    const fill = document.getElementById('altModalFill');
    if (fill) fill.style.width = d.pct + '%';
  }, 120);
}


/* =====================================================
   6. GALLERY CARDS → MODAL
   ===================================================== */
function initGallery() {
  const cards = document.querySelectorAll('.gallery-card[data-gallery]');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      openGalModal(parseInt(card.dataset.gallery, 10));
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGalModal(parseInt(card.dataset.gallery, 10));
      }
    });
  });
}

function openGalModal(index) {
  const d = GALLERY_DATA[index];
  if (!d) return;

  const content = document.getElementById('galModalContent');
  if (!content) return;

  content.innerHTML = `
    <div class="gal-modal-photo-wrap">
      <img
        src="${d.img}"
        alt="${d.alt}"
        class="gal-modal-photo"
      />
      <div class="gal-modal-photo-overlay"></div>
      <div class="gal-modal-photo-info">
        <h3 id="galModalTitle" class="gal-modal-title">${d.title}</h3>
        <p class="gal-modal-band" style="color:${d.color};">${d.band}</p>
      </div>
    </div>
    <div class="modal-body">
      <p class="modal-text">${d.body}</p>
      <div class="modal-divider"></div>
      <div class="gal-band-row">
        <span
          class="gal-band-dot"
          style="background:${d.color}; box-shadow: 0 0 10px ${d.color};"
          aria-hidden="true"
        ></span>
        <span
          class="gal-modal-band"
          style="color:${d.color}; font-family: var(--font-mono); font-size: var(--fs-mono);"
        >
          ${d.band}
        </span>
      </div>
    </div>
  `;

  openModal('galModal');
}


/* =====================================================
   7. MODAL HELPERS
   ===================================================== */

// Track which element was focused before the modal opened
// so we can return focus when it closes
const focusReturn = {
  altModal: null,
  galModal: null
};

/**
 * Open a modal by its element ID.
 * @param {string} id - 'altModal' or 'galModal'
 */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  // Save the currently focused element
  focusReturn[id] = document.activeElement;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // prevent background scroll

  // Move focus into the modal (the close button)
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 50);
  }
}

/**
 * Close a modal by its element ID.
 * @param {string} id - 'altModal' or 'galModal'
 */
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Return focus to the element that opened the modal
  if (focusReturn[id]) {
    focusReturn[id].focus();
    focusReturn[id] = null;
  }
}

/**
 * Close modal when clicking the dark backdrop (outside the modal box).
 */
function initModalBackdropClose() {
  ['altModal', 'galModal'].forEach((id) => {
    const overlay = document.getElementById(id);
    if (!overlay) return;

    overlay.addEventListener('click', (e) => {
      // Only close if the click target is the overlay itself, not its children
      if (e.target === overlay) {
        closeModal(id);
      }
    });
  });
}

/**
 * Wire up the close buttons inside each modal.
 */
function initModalCloseButtons() {
  const altClose = document.getElementById('altModalClose');
  const galClose = document.getElementById('galModalClose');

  if (altClose) altClose.addEventListener('click', () => closeModal('altModal'));
  if (galClose) galClose.addEventListener('click', () => closeModal('galModal'));
}

/**
 * Close any open modal on Escape key.
 */
function initModalKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close whichever modal is open
      if (document.getElementById('altModal')?.classList.contains('is-open')) {
        closeModal('altModal');
      }
      if (document.getElementById('galModal')?.classList.contains('is-open')) {
        closeModal('galModal');
      }
    }
  });
}


/* =====================================================
   8. INIT — runs after DOM is ready
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {

  // Hero parallax scroll effect
  initParallax();

  // 3D thermal flip card
  initFlip();

  // Altitude rows (5 colour buttons) → modals
  initAltitudeRows();

  // Gallery cards → modals
  initGallery();

  // Modal close mechanics
  initModalCloseButtons();
  initModalBackdropClose();
  initModalKeyboard();

  console.log('[Infrared Jungle] Initialised ✓');
});
