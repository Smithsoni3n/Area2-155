const slides = [...document.querySelectorAll('.slide')];
const cards = [...document.querySelectorAll('.flip-card')];
let idx = 0;

const toneMap = {
  steel: 'rgba(95, 127, 173, 0.65)',
  amber: 'rgba(153, 109, 62, 0.62)',
  iron: 'rgba(86, 92, 97, 0.68)'
};

function showSlide(next) {
  slides[idx].classList.remove('active');
  idx = (next + slides.length) % slides.length;
  slides[idx].classList.add('active');
  document.documentElement.style.setProperty('--water-tone', toneMap[slides[idx].dataset.water]);
}

document.getElementById('nextBtn').onclick = () => showSlide(idx + 1);
document.getElementById('prevBtn').onclick = () => showSlide(idx - 1);
document.getElementById('toggleBtn').onclick = () => cards[idx].classList.toggle('shift');

const cursor = document.getElementById('binaryCursor');
const cursorLabel = document.getElementById('cursorLabel');
window.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

cards.forEach(card => {
  card.addEventListener('mouseenter', () => cursor.classList.add('expand'));
  card.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
  card.addEventListener('click', () => {
    const shifted = card.classList.toggle('shift');
    cursorLabel.textContent = shifted ? 'DRAPE' : 'DOCK';
  });
});

const modal = document.getElementById('factModal');
const factText = document.getElementById('factText');
document.querySelectorAll('.hotspot').forEach(btn => btn.onclick = (e) => {
  factText.textContent = e.currentTarget.dataset.fact;
  modal.showModal();
});
document.getElementById('closeFact').onclick = () => modal.close();
