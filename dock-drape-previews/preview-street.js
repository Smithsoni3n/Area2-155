const frames = [...document.querySelectorAll('.frame')];
let current = 0;

const wash = { aqua: 'rgba(81, 146, 181, .5)', amber: 'rgba(166, 120, 73, .48)', iron: 'rgba(97, 102, 108, .55)' };
const show = (i) => {
  frames[current].classList.remove('on');
  current = (i + frames.length) % frames.length;
  frames[current].classList.add('on');
  document.documentElement.style.setProperty('--wash', wash[frames[current].dataset.hue]);
};

document.querySelectorAll('[data-jump]').forEach(b => b.onclick = () => show(Number(b.dataset.jump)));
document.getElementById('binary').onclick = () => frames[current].querySelector('.panel').classList.toggle('show-f');

document.querySelectorAll('.dot').forEach(dot => dot.onclick = (e) => {
  const note = document.getElementById('note');
  note.textContent = e.target.dataset.note;
  note.style.display = 'block';
  setTimeout(() => note.style.display = 'none', 3600);
});

const pointer = document.getElementById('pointer');
window.addEventListener('mousemove', e => {
  pointer.style.left = `${e.clientX}px`;
  pointer.style.top = `${e.clientY}px`;
});

document.querySelectorAll('.sheet').forEach(s => {
  s.addEventListener('mouseenter', ()=> pointer.classList.add('big'));
  s.addEventListener('mouseleave', ()=> pointer.classList.remove('big'));
  s.addEventListener('click', ()=> {
    const showingFemale = s.closest('.panel').classList.toggle('show-f');
    pointer.textContent = showingFemale ? 'F' : 'M';
  });
});
