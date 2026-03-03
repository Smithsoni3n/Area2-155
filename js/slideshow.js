(function () {
  const root = document.querySelector('[data-slideshow]');
  if (!root) return;

  const slides = [
    {
      src: '../assets/images/featured-wool-check-coat.jpg',
      alt: 'Checker wool coat from early 1970s on a display mannequin',
      caption: 'Wool check coat (1971): warm colors and bold geometric checks.'
    },
    {
      src: '../assets/images/featured-suede-fringe-jacket.jpg',
      alt: 'Suede jacket with fringe details inspired by Pacific Northwest craft styles',
      caption: 'Suede fringe jacket (late 1960s): movement and texture for dance halls.'
    },
    {
      src: '../assets/images/featured-floral-maxi-dress.jpg',
      alt: 'Long floral maxi dress with flowing skirt and high neck',
      caption: 'Floral maxi dress (1972): soft drape and saturated flower motifs.'
    }
  ];

  let index = 0;
  const image = root.querySelector('[data-slide-image]');
  const caption = root.querySelector('[data-slide-caption]');

  const render = () => {
    const slide = slides[index];
    image.src = slide.src;
    image.alt = slide.alt;
    caption.textContent = slide.caption;
  };

  root.querySelector('[data-slide="prev"]').addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  root.querySelector('[data-slide="next"]').addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      index = (index - 1 + slides.length) % slides.length;
      render();
    } else if (event.key === 'ArrowRight') {
      index = (index + 1) % slides.length;
      render();
    }
  });

  render();
})();
