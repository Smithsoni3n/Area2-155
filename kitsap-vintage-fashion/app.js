const slides = [
  {
    src: 'assets/item1-01.jpg',
    alt: 'Suede fringe vest front view',
    caption: 'View 1: Front detail and fringe texture.'
  },
  {
    src: 'assets/item1-02.jpg',
    alt: 'Suede fringe vest side profile',
    caption: 'View 2: Side profile with layered styling.'
  },
  {
    src: 'assets/item1-03.jpg',
    alt: 'Suede fringe vest back view',
    caption: 'View 3: Back view with stitching accents.'
  }
];

let current = 0;

const imageEl = document.getElementById('slideImage');
const captionEl = document.getElementById('slideCaption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');

function renderSlide(index) {
  const slide = slides[index];
  imageEl.src = slide.src;
  imageEl.alt = slide.alt;
  captionEl.textContent = slide.caption;

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

function moveSlide(step) {
  current = (current + step + slides.length) % slides.length;
  renderSlide(current);
}

prevBtn.addEventListener('click', () => moveSlide(-1));
nextBtn.addEventListener('click', () => moveSlide(1));

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    current = Number(dot.dataset.index);
    renderSlide(current);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') moveSlide(-1);
  if (event.key === 'ArrowRight') moveSlide(1);
});

renderSlide(current);
