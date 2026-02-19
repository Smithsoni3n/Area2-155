document.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    gsap.from('.fade-up', { y: 35, opacity: 0, duration: 1.1, stagger: 0.1, ease: 'power2.out' });
  }

  if (window.anime) {
    anime({
      targets: '.pulse-cta',
      boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 35px rgba(0,255,245,.45)', '0 0 0 rgba(0,0,0,0)'],
      duration: 2200,
      easing: 'easeInOutSine',
      loop: true
    });
  }

  const particleRoot = document.getElementById('particles');
  if (particleRoot) {
    for (let i = 0; i < 35; i += 1) {
      const p = document.createElement('span');
      const size = Math.random() * 3 + 1;
      p.style.cssText = `position:absolute; width:${size}px; height:${size}px; border-radius:999px; background:rgba(122,243,255,.8); left:${Math.random()*100}%; top:${Math.random()*100}%; opacity:${Math.random()};`;
      particleRoot.appendChild(p);
    }
  }

  const ctx = document.getElementById('arousalChart');
  if (ctx && window.Chart) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['-40°C', '-10°C', '10°C', '25°C', '40°C', '70°C', '100°C'],
        datasets: [{
          label: 'Predicted psychological arousal',
          data: [18, 30, 42, 56, 70, 88, 93],
          borderColor: '#00d9ff',
          backgroundColor: 'rgba(255,61,156,.12)',
          tension: 0.45,
          fill: true
        }]
      },
      options: {
        plugins: { legend: { labels: { color: '#d6f8ff' } } },
        scales: {
          x: { ticks: { color: '#b7def4' }, grid: { color: 'rgba(96,129,183,.24)' } },
          y: { ticks: { color: '#b7def4' }, grid: { color: 'rgba(96,129,183,.24)' }, min: 0, max: 100 }
        }
      }
    });
  }

  if (window.Swiper && document.querySelector('.resource-swiper')) {
    new Swiper('.resource-swiper', {
      slidesPerView: 1.1,
      spaceBetween: 18,
      loop: true,
      breakpoints: { 768: { slidesPerView: 2.2 }, 1200: { slidesPerView: 3.1 } },
      autoplay: { delay: 2800 }
    });
  }
});
