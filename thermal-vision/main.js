document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'home';

  // Active nav markers
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === page) link.classList.add('active');
  });

  // Shared color intelligence bubbles
  const bubbleWrap = document.querySelector('#intelligence-bubbles');
  if (bubbleWrap) {
    const colors = ['#2de2e6', '#4fffb0', '#ffc857', '#ff5f6d', '#ff3cac', '#7f5af0', '#22d3ee', '#f97316'];
    for (let i = 0; i < 8; i++) {
      const b = document.createElement('span');
      b.className = 'intelligence-bubble absolute rounded-full';
      b.style.width = `${18 + Math.random() * 34}px`;
      b.style.height = b.style.width;
      b.style.left = `${Math.random() * 96}%`;
      b.style.top = `${Math.random() * 90}%`;
      b.style.background = colors[i];
      b.style.filter = 'blur(0.3px)';
      b.style.boxShadow = `0 0 20px ${colors[i]}`;
      b.style.animationDelay = `${i * 0.25}s`;
      bubbleWrap.appendChild(b);
    }
  }

  // Homepage motion stack
  if (page === 'home') {
    gsap.from('.hero-title', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out' });
    gsap.from('.hero-copy', { y: 30, opacity: 0, delay: 0.35, duration: 1 });
    gsap.from('.nav-card', { y: 40, opacity: 0, stagger: 0.12, delay: 0.6, duration: 0.85 });

    anime({
      targets: '.scan-cta',
      boxShadow: ['0 0 16px rgba(45,226,230,.4)', '0 0 36px rgba(255,95,109,.8)'],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 2200
    });

    if (window.particlesJS) {
      particlesJS('particles', {
        particles: {
          number: { value: 36 },
          color: { value: ['#2de2e6', '#ff5f6d', '#4fffb0'] },
          shape: { type: 'circle' },
          opacity: { value: 0.65 },
          size: { value: 2.6 },
          move: { enable: true, speed: 1.1 }
        }
      });
    }
  }

  // Interactive page logic
  if (page === 'interactive') {
    const ctx = document.getElementById('arousalChart');
    if (ctx && window.Chart) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['-40', '-20', '0', '20', '40', '60', '80', '100'],
          datasets: [{
            label: 'Emotional Arousal Index',
            data: [14, 18, 28, 40, 61, 78, 88, 92],
            borderColor: '#ff5f6d',
            backgroundColor: 'rgba(255,95,109,.22)',
            tension: 0.35,
            fill: true
          }]
        },
        options: {
          plugins: { legend: { labels: { color: '#cbd5e1' } } },
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,.16)' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,.16)' } }
          }
        }
      });
    }
  }

  // Swiper resources page
  if (page === 'resources' && window.Swiper) {
    new Swiper('.thermal-swiper', {
      loop: true,
      spaceBetween: 22,
      autoplay: { delay: 2400 },
      breakpoints: {
        300: { slidesPerView: 1.1 },
        768: { slidesPerView: 2.2 },
        1100: { slidesPerView: 3 }
      }
    });
  }
});
