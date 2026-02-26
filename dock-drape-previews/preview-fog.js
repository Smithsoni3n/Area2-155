const panes = [...document.querySelectorAll('.pane')];
const flips = [...document.querySelectorAll('.flip')];
let active = 0;
const veil = { steel:'rgba(88,116,150,.56)', amber:'rgba(148,108,67,.52)', iron:'rgba(95,102,111,.58)' };

function setPane(i){
  panes[active].classList.remove('visible');
  active = (i + panes.length) % panes.length;
  panes[active].classList.add('visible');
  document.documentElement.style.setProperty('--veil', veil[panes[active].dataset.tint]);
}

document.getElementById('forward').onclick=()=>setPane(active+1);
document.getElementById('back').onclick=()=>setPane(active-1);
document.getElementById('shift').onclick=()=>flips[active].classList.toggle('swapped');

const toast = document.getElementById('toast');
document.querySelectorAll('.ping').forEach(p=>p.onclick=(e)=>{
  toast.textContent=e.target.dataset.msg;
  toast.style.display='block';
  setTimeout(()=>toast.style.display='none',3200);
});

const cursor = document.getElementById('cursor');
window.addEventListener('mousemove',(e)=>{cursor.style.left=`${e.clientX}px`;cursor.style.top=`${e.clientY}px`;});
flips.forEach(f=>{
  f.addEventListener('mouseenter',()=>cursor.classList.add('grow'));
  f.addEventListener('mouseleave',()=>cursor.classList.remove('grow'));
  f.addEventListener('click',()=>{
    const isFemale = f.classList.toggle('swapped');
    cursor.textContent = isFemale ? 'DRAPE' : 'DOCK';
  });
});
