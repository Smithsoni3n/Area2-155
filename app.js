/* ═══════════════════════════════════════════
   ELEMENTAL ICONS — app.js
   Store logic, flip cards, cart, checkout
   ═══════════════════════════════════════════ */

// ── Product Data ─────────────────────────────
const PRODUCTS = {
  alkali: [
    { id: 'Na', number: 11, name: 'Sodium',   price: 6,
      desc: 'The spark behind modern industry — sodium powers essential chemistry and lights up our world.' },
    { id: 'K',  number: 19, name: 'Potassium', price: 8,
      desc: 'The heartbeat mineral. Potassium keeps life growing and ecosystems thriving.' },
    { id: 'Cs', number: 55, name: 'Cesium',   price: 12,
      desc: 'The timekeeper of civilization — cesium defines the atomic second that syncs our world.' },
    { id: 'Fr', number: 87, name: 'Francium',  price: 18,
      desc: 'Rare and radiant. Francium pushes the frontier of scientific discovery.' },
  ],
  transition: [
    { id: 'Ti', number: 22, name: 'Titanium',  price: 10,
      desc: 'Strength meets elegance. Titanium builds everything from spacecraft to life-saving implants.' },
    { id: 'Fe', number: 26, name: 'Iron',      price: 6,
      desc: 'The backbone of civilization — iron forges the structures and tools that shape our future.' },
    { id: 'Ta', number: 73, name: 'Tantalum',  price: 14,
      desc: 'The silent hero in every phone and laptop — tantalum powers the devices we depend on.' },
    { id: 'Sg', number: 106, name: 'Seaborgium', price: 19,
      desc: 'Named for a Nobel laureate, Seaborgium represents the pinnacle of human curiosity.' },
  ],
  noble: [
    { id: 'He', number: 2,  name: 'Helium',  price: 7,
      desc: 'Light, boundless, uplifting — helium lifts spirits, MRI machines, and rockets alike.' },
    { id: 'Ar', number: 18, name: 'Argon',   price: 9,
      desc: 'The silent protector. Argon shields welds, preserves documents, and keeps the lights glowing.' },
    { id: 'Kr', number: 36, name: 'Krypton', price: 13,
      desc: 'Brilliant and rare — krypton illuminates high-performance lasers and runway lighting.' },
    { id: 'Rn', number: 86, name: 'Radon',   price: 18,
      desc: 'Mysterious and powerful — radon detection drives environmental safety innovation.' },
  ]
};

// ── State ────────────────────────────────────
let cart = loadCart();
let currentCat = 'alkali';

// ── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderAllGrids();
  updateBadge();
  bindTabs();
  bindNav();
  bindCheckout();
});

// ── Render Product Grids ─────────────────────
function renderAllGrids() {
  Object.keys(PRODUCTS).forEach(cat => {
    const grid = document.getElementById('grid-' + cat);
    grid.innerHTML = '';
    PRODUCTS[cat].forEach((product, i) => {
      grid.appendChild(createCard(product, cat, i));
    });
  });
}

function createCard(product, cat, index) {
  const card = document.createElement('div');
  card.className = `flip-card cat-${cat}`;
  card.style.animationDelay = (index * 0.08) + 's';

  card.innerHTML = `
    <div class="flip-card-inner">
      <!-- FRONT -->
      <div class="flip-front">
        <div class="front-number">${product.number}</div>
        <div class="front-symbol">${product.id}</div>
        <div class="front-name">${product.name}</div>
        <div class="front-divider"></div>
        <div class="flip-hint">tap to view ›</div>
      </div>
      <!-- BACK -->
      <div class="flip-back">
        <div class="back-symbol">${product.id}</div>
        <div class="back-name">${product.name}</div>
        <p class="back-desc">${product.desc}</p>
        <div class="back-price">$${product.price}</div>
        <button class="btn-add" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `;

  // Flip on click (but not if they click the Add button)
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add')) return;
    card.classList.toggle('flipped');
  });

  // Add to Cart button
  const btn = card.querySelector('.btn-add');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product);
    btn.textContent = 'Added ✓';
    btn.classList.add('added');
    // Reset after 1.5s
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('added');
    }, 1500);
  });

  return card;
}

// ── Tab Switching ────────────────────────────
function bindTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;
      if (cat === currentCat) return;
      currentCat = cat;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show correct grid
      document.querySelectorAll('.product-grid').forEach(g => g.classList.remove('visible'));
      document.getElementById('grid-' + cat).classList.add('visible');
    });
  });
}

// ── Nav: Store / Cart toggle ─────────────────
function bindNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const view = link.dataset.view;
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      showView(view);
    });
  });

  // "Browse the Collection" from empty cart
  document.getElementById('btnBackToStore').addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[data-view="store"]').classList.add('active');
    showView('store');
  });
}

function showView(view) {
  const store   = document.getElementById('storeView');
  const cartV   = document.getElementById('cartView');
  const confirm = document.getElementById('confirmView');
  const hero    = document.querySelector('.hero');
  const tabBar  = document.querySelector('.tab-bar');

  store.style.display   = 'none';
  cartV.classList.add('hidden');
  confirm.classList.add('hidden');
  hero.style.display    = 'none';
  tabBar.style.display  = 'none';

  if (view === 'store') {
    store.style.display  = '';
    hero.style.display   = '';
    tabBar.style.display = '';
    // Re-show current grid
    document.getElementById('grid-' + currentCat).classList.add('visible');
  } else if (view === 'cart') {
    cartV.classList.remove('hidden');
    renderCart();
  }
}

// ── Cart Logic (localStorage) ────────────────
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('elemental_cart')) || [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem('elemental_cart', JSON.stringify(cart));
}

function addToCart(product) {
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price
  });
  saveCart();
  updateBadge();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateBadge();
  renderCart();
}

function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

function updateBadge() {
  const badge = document.getElementById('cartBadge');
  badge.textContent = cart.length;
  badge.classList.toggle('zero', cart.length === 0);

  // Pop animation
  badge.classList.add('pop');
  setTimeout(() => badge.classList.remove('pop'), 300);
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer    = document.getElementById('cartFooter');
  const empty     = document.getElementById('cartEmpty');
  const subtotal  = document.getElementById('cartSubtotal');

  container.innerHTML = '';

  if (cart.length === 0) {
    footer.classList.add('hidden');
    empty.classList.remove('hidden');
    return;
  }

  footer.classList.remove('hidden');
  empty.classList.add('hidden');

  cart.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-symbol">${item.id}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price}</div>
      </div>
      <button class="btn-remove" data-index="${i}">Remove</button>
    `;
    row.querySelector('.btn-remove').addEventListener('click', () => removeFromCart(i));
    container.appendChild(row);
  });

  subtotal.textContent = '$' + getSubtotal();
}

// ── Checkout ─────────────────────────────────
function bindCheckout() {
  document.getElementById('btnCheckout').addEventListener('click', () => {
    const total = getSubtotal();
    document.getElementById('confirmTotal').textContent = 'Total charged: $' + total;

    // Clear cart
    cart = [];
    saveCart();
    updateBadge();

    // Show confirmation
    document.getElementById('cartView').classList.add('hidden');
    document.getElementById('confirmView').classList.remove('hidden');
  });

  document.getElementById('btnBackFromConfirm').addEventListener('click', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[data-view="store"]').classList.add('active');
    showView('store');
  });
}
