const intelligenceItems = [
  { title: 'Infrared salience', text: 'Hotter hues increase urgency detection in under 300 ms visual scans.', color: 'from-red-500 to-amber-400' },
  { title: 'Arousal threshold', text: 'Red/orange gradients elevate physiological activation and alertness.', color: 'from-orange-500 to-pink-500' },
  { title: 'Cooling bias', text: 'Blue/cyan palettes reduce perceived temporal pressure and stress.', color: 'from-cyan-500 to-blue-700' },
  { title: 'Contrast memory', text: 'High thermal contrast improves retention for key educational points.', color: 'from-fuchsia-500 to-indigo-600' },
  { title: 'Threat coding', text: 'Warm edge highlights support rapid threat mapping in nature scenes.', color: 'from-rose-600 to-red-500' },
  { title: 'Habitat readability', text: 'Green-yellow mids improve scene segmentation in jungle compositions.', color: 'from-lime-500 to-emerald-500' },
  { title: 'Attention cycling', text: 'Alternating warm/cool pulses sustain focus in long-form reading.', color: 'from-sky-500 to-violet-500' },
  { title: 'Typography force', text: 'Wide geometric type with glow framing improves title authority.', color: 'from-yellow-400 to-orange-500' }
];

function renderIntelligence() {
  const mount = document.querySelector('[data-intelligence]');
  if (!mount) return;
  mount.innerHTML = intelligenceItems.map((item, i) => `
    <article class="bubble bg-gradient-to-br ${item.color} text-slate-100" data-bubble="${i}">
      <strong class="block mb-1 text-[0.8rem] uppercase tracking-wider">${item.title}</strong>
      <span>${item.text}</span>
    </article>
  `).join('');

  if (window.anime) {
    anime({
      targets: '[data-bubble]',
      scale: [0.8, 1],
      opacity: [0, 1],
      delay: anime.stagger(95),
      easing: 'easeOutExpo'
    });
  }
}

function animateHeadings() {
  if (!window.gsap) return;
  gsap.from('[data-hero-title]', {
    y: 50,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out'
  });
  gsap.from('[data-card]', {
    y: 20,
    opacity: 0,
    stagger: 0.09,
    duration: 0.8,
    delay: 0.25,
    ease: 'power2.out'
  });
}

renderIntelligence();
animateHeadings();
