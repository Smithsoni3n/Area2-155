document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'home';

  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add('active');
    }
  });

  const bubbleArea = document.getElementById('intelligence-bubbles');
  if (bubbleArea) {
    const colors = ['#2de2e6', '#4fffb0', '#ffc857', '#ff5f6d', '#ff3cac', '#7f5af0', '#22d3ee', '#f97316'];
    for (let i = 0; i < 8; i += 1) {
      const bubble = document.createElement('span');
      bubble.className = 'intelligence-bubble absolute rounded-full';
      const size = 18 + Math.random() * 30;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 95}%`;
      bubble.style.top = `${Math.random() * 88}%`;
      bubble.style.background = colors[i];
      bubble.style.boxShadow = `0 0 20px ${colors[i]}`;
      bubble.style.animationDelay = `${i * 0.22}s`;
      bubbleArea.appendChild(bubble);
    }
  }

  if (page === 'home') {
    if (window.gsap) {
      gsap.from('.hero-title', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out' });
      gsap.from('.hero-copy', { y: 30, opacity: 0, delay: 0.35, duration: 1 });
      gsap.from('.nav-card', { y: 40, opacity: 0, stagger: 0.12, delay: 0.55, duration: 0.85 });
    }

    if (window.anime) {
      anime({
        targets: '.scan-cta',
        boxShadow: ['0 0 14px rgba(45,226,230,.45)', '0 0 34px rgba(255,95,109,.78)'],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 1900
      });
    }

    if (window.particlesJS) {
      particlesJS('particles', {
        particles: {
          number: { value: 42 },
          color: { value: ['#2de2e6', '#4fffb0', '#ff5f6d'] },
          shape: { type: 'circle' },
          opacity: { value: 0.6 },
          size: { value: 2.3 },
          move: { enable: true, speed: 1.15 }
        }
      });
    }
  }

  if (page === 'interactive') {
    const chartCanvas = document.getElementById('arousalChart');
    if (chartCanvas && window.Chart) {
      // eslint-disable-next-line no-new
      new Chart(chartCanvas, {
        type: 'line',
        data: {
          labels: ['-40', '-20', '0', '20', '40', '60', '80', '100'],
          datasets: [
            {
              label: 'Emotional Arousal Index',
              data: [14, 18, 29, 43, 61, 77, 87, 93],
              borderColor: '#ff5f6d',
              backgroundColor: 'rgba(255,95,109,0.23)',
              fill: true,
              tension: 0.35
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              labels: { color: '#cbd5e1' }
            }
          },
          scales: {
            x: {
              ticks: { color: '#94a3b8' },
              grid: { color: 'rgba(148,163,184,0.15)' }
            },
            y: {
              ticks: { color: '#94a3b8' },
              grid: { color: 'rgba(148,163,184,0.15)' }
            }
          }
        }
      });
    }
  }

  if (page === 'resources' && window.Swiper) {
    // eslint-disable-next-line no-new
    new Swiper('.thermal-swiper', {
      loop: true,
      spaceBetween: 20,
      autoplay: { delay: 2400 },
      breakpoints: {
        300: { slidesPerView: 1.1 },
        768: { slidesPerView: 2.2 },
        1100: { slidesPerView: 3 }
      }
    });
  }
});
