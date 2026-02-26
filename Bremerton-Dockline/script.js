const slides=[...document.querySelectorAll('.slide')], cards=[...document.querySelectorAll('[data-card]')], era=document.getElementById('era');
const cur=document.getElementById('shiftCursor'), fact=document.getElementById('fact'); let i=0;
const draw=()=>{slides.forEach((s,n)=>s.classList.toggle('active',n===i)); era.textContent=slides[i].dataset.era;};
document.getElementById('next').onclick=()=>{i=(i+1)%slides.length;draw();}; document.getElementById('prev').onclick=()=>{i=(i-1+slides.length)%slides.length;draw();};
cards.forEach(c=>{c.onclick=(e)=>{if(!e.target.classList.contains('pulse')) c.classList.toggle('flip');}; c.onmouseenter=()=>cur.classList.add('hot'); c.onmouseleave=()=>cur.classList.remove('hot');});
document.querySelectorAll('.pulse').forEach(b=>b.onclick=()=>{fact.textContent=b.dataset.fact;fact.showModal();}); fact.onclick=()=>fact.close();
window.onmousemove=e=>{cur.style.left=`${e.clientX}px`; cur.style.top=`${e.clientY}px`;}; draw();
