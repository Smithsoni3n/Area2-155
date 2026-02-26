const slides = [...document.querySelectorAll('.slide')];
const cards = [...document.querySelectorAll('[data-flip-card]')];
const eraLabel = document.getElementById('eraLabel');
const cursor = document.getElementById('cursor');
const factBox = document.getElementById('factBox');
let idx = 0;

function render() {
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));
  eraLabel.textContent = slides[idx].dataset.era;
}

document.getElementById('next').onclick = () => { idx = (idx + 1) % slides.length; render(); };
document.getElementById('prev').onclick = () => { idx = (idx - 1 + slides.length) % slides.length; render(); };

cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('hotspot')) return;
    card.classList.toggle('flipped');
  });
  card.addEventListener('mouseenter', () => cursor.classList.add('active'));
  card.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

document.querySelectorAll('.hotspot').forEach((spot) => {
  spot.addEventListener('click', () => {
    factBox.textContent = spot.dataset.fact;
    factBox.showModal();
  });
});
factBox.addEventListener('click', () => factBox.close());

window.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

render();
