/* ═══════════════════════════════════════════════════
   THERMAΛ · thermal-v2 · main.js
   Smithsoni3n/Area2-155 · Typography 260
═══════════════════════════════════════════════════ */

/* ── 1. RETICLE CURSOR ── */
const R   = document.getElementById('reticle');
const RTL = document.getElementById('reticle-tl');
const RTR = document.getElementById('reticle-tr');
const RBL = document.getElementById('reticle-bl');
const RBR = document.getElementById('reticle-br');
const DOT = document.getElementById('reticle-dot');

document.addEventListener('mousemove', e => {
  const x = e.clientX, y = e.clientY;
  if(R)   { R.style.left   = x+'px'; R.style.top   = y+'px'; }
  if(DOT) { DOT.style.left = x+'px'; DOT.style.top = y+'px'; }
  [RTL,RTR,RBL,RBR].forEach(t=>{ if(t){ t.style.left=x+'px'; t.style.top=y+'px'; }});
  updateBadge(y);
});
document.addEventListener('mousedown', () => {
  if(R){ R.style.width='26px'; R.style.height='26px'; R.style.borderColor='rgba(255,230,0,1)'; }
});
document.addEventListener('mouseup', () => {
  if(R){ R.style.width='38px'; R.style.height='38px'; R.style.borderColor='rgba(255,180,0,.82)'; }
});

/* ── 2. NAV TEMP BADGE ── */
function updateBadge(y) {
  const b = document.getElementById('navBadge');
  if(!b) return;
  const t = Math.round(-40 + (y / window.innerHeight) * 140);
  b.textContent = 'CURSOR: ' + (t>0?'+':'') + t + '°C';
  b.style.color = t>60?'#ff2200' : t>37?'#ff9900' : t>15?'#00ffcc' : '#00aaff';
}

/* ── 3. HEAT CANVAS ── */
const HC = document.getElementById('heat-canvas');
if(HC) {
  const HX = HC.getContext('2d');
  let pts = [];
  function resHC(){ HC.width=window.innerWidth; HC.height=window.innerHeight; }
  resHC(); window.addEventListener('resize', resHC);
  document.addEventListener('mousemove', e => {
    pts.push({x:e.clientX, y:e.clientY, age:0});
    if(pts.length>90) pts.shift();
  });
  (function drawH(){
    HX.clearRect(0,0,HC.width,HC.height);
    pts.forEach(p => {
      p.age++;
      const li = 1 - p.age/90, r = 130*(1+p.age*.01);
      const g = HX.createRadialGradient(p.x,p.y,0,p.x,p.y,r);
      g.addColorStop(0,   `rgba(255,200,60,${.22*li})`);
      g.addColorStop(.35, `rgba(255,90,0,${.13*li})`);
      g.addColorStop(.75, `rgba(180,0,80,${.05*li})`);
      g.addColorStop(1,   'rgba(0,0,0,0)');
      HX.fillStyle=g;
      HX.fillRect(p.x-r*2, p.y-r*2, r*4, r*4);
    });
    pts = pts.filter(p=>p.age<90);
    requestAnimationFrame(drawH);
  })();
}

/* ── 4. PARTICLES (hero) ── */
const PC = document.getElementById('particle-canvas');
if(PC) {
  const PX = PC.getContext('2d');
  const COLS = ['#ff1a00','#ff5500','#ff9900','#ffdd00','#aaff44','#00ffcc','#00aaff','#0044ff','#5500cc'];
  let parts=[];
  function resPC(){ PC.width=PC.offsetWidth||window.innerWidth; PC.height=PC.offsetHeight||window.innerHeight; }
  resPC(); window.addEventListener('resize', resPC);
  for(let i=0;i<130;i++) parts.push({
    x:Math.random()*(PC.width||window.innerWidth),
    y:Math.random()*(PC.height||window.innerHeight),
    vx:(Math.random()-.5)*.45, vy:(Math.random()-.5)*.45,
    r:Math.random()*1.8+.5,
    c:COLS[Math.floor(Math.random()*COLS.length)],
    a:Math.random()*.5+.15
  });
  (function drawP(){
    PX.clearRect(0,0,PC.width,PC.height);
    parts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0) p.x=PC.width; if(p.x>PC.width) p.x=0;
      if(p.y<0) p.y=PC.height; if(p.y>PC.height) p.y=0;
      PX.beginPath(); PX.arc(p.x,p.y,p.r,0,Math.PI*2);
      PX.fillStyle=p.c; PX.globalAlpha=p.a; PX.fill(); PX.globalAlpha=1;
    });
    requestAnimationFrame(drawP);
  })();
}

/* ── 5. SCANNER DRAG ── */
function showBeam(id){ const b=document.getElementById('sb-'+id), h=document.getElementById('sh-'+id); if(b) b.style.display='block'; if(h) h.style.opacity='0'; }
function hideBeam(id){ const b=document.getElementById('sb-'+id), h=document.getElementById('sh-'+id), v=document.getElementById('vt-'+id); if(b) b.style.display='none'; if(h) h.style.opacity='1'; if(v) v.style.clipPath='inset(0 100% 0 0)'; }
function moveBeam(e,id){ const c=document.getElementById('sci-'+id); if(!c) return; const rc=c.getBoundingClientRect(), pct=Math.max(0,Math.min(100,((e.clientX-rc.left)/rc.width)*100)); const b=document.getElementById('sb-'+id), v=document.getElementById('vt-'+id); if(b) b.style.left=pct+'%'; if(v) v.style.clipPath=`inset(0 ${100-pct}% 0 0)`; }
function touchBeam(e,id){ e.preventDefault(); if(e.touches[0]) moveBeam(e.touches[0],id); }

/* ── 6. TEMPERATURE LAB ── */
const LD=[
  {min:-40,max:-15,zone:'DEEP ARCTIC ZONE',    mood:'Survival Threshold',   desc:'Beyond human endurance. Polar extremes. Thermal cameras show near-black — minimal infrared emission. Polar animals evolved such perfect insulation they appear nearly invisible against the frozen environment.',bg:'linear-gradient(135deg,#000018,#000030)',col:'#0033ff',chip:'#0033ff'},
  {min:-15,max:2,  zone:'FREEZE BOUNDARY',      mood:'Crystalline Stillness',desc:'At and near the freezing point of water. Ice appears deep blue-violet in thermal imaging. The liquid-solid boundary is visible as a gradient line where molecular energy is barely sufficient to maintain liquid state.',bg:'linear-gradient(135deg,#000a22,#001133)',col:'#0088ff',chip:'#0088ff'},
  {min:2,  max:16, zone:'COOL AMBIENT ZONE',    mood:'Brisk Alertness',      desc:'Cool morning air. The body conserves heat — peripheral vessels constrict. Blue-cyan in thermal cameras. Shown to improve concentration and cognitive precision. The color of productive mornings.',bg:'linear-gradient(135deg,#001122,#002244)',col:'#00aaff',chip:'#00aaff'},
  {min:16, max:26, zone:'COMFORT ZONE',         mood:'Neutral · Balanced',   desc:'Room temperature — the baseline of human thermal comfort. Neither stimulating nor sedating. Cyan-green in thermal imaging. Peak productivity zone — not activating like heat, not bracing like cold.',bg:'linear-gradient(135deg,#001a0e,#002a18)',col:'#00ffcc',chip:'#00ffcc'},
  {min:26, max:34, zone:'WARM AMBIENT ZONE',    mood:'Relaxed & Social',     desc:'Warm rooms and tropical climates. Blood vessels dilate, circulation increases. Yellow-green in thermal cameras. The temperature of holiday destinations and restaurants designed for lingering.',bg:'linear-gradient(135deg,#0d1200,#1a2000)',col:'#aaff44',chip:'#aaff44'},
  {min:34, max:39, zone:'BODY TEMPERATURE ZONE',mood:'Life Force Active',    desc:'The thermal signature of life — 37°C is human body temperature, the orange glow FLIR cameras read as living mammals. Lion, wolf, gorilla, and human glow the same orange frequency when healthy.',bg:'linear-gradient(135deg,#1a0800,#2a1000)',col:'#ff9900',chip:'#ff9900'},
  {min:39, max:65, zone:'HOT ZONE',             mood:'High Energy Output',   desc:'Painful to sustained touch. Engine surfaces, cooking equipment, summer pavement. Bright orange-yellow in FLIR — high infrared emission. Inspectors use thermal cameras to detect overheating before failure.',bg:'linear-gradient(135deg,#1a0400,#300800)',col:'#ff5500',chip:'#ff5500'},
  {min:65, max:100,zone:'EXTREME HEAT ZONE',    mood:'Maximum Thermal Output',desc:'Approaching combustion. Water boils at 100°C — pure white saturation in thermal cameras. Stars, plasma, and active flames operate here and far beyond what any consumer sensor can record.',bg:'linear-gradient(135deg,#1a0000,#330000)',col:'#ff1a00',chip:'#ff1a00'}
];
function getLD(t){ return LD.find(d=>t>=d.min&&t<=d.max)||LD[LD.length-1]; }
function updateLab(v){
  v=parseInt(v); const d=getLD(v); const s=v>0?'+':'';
  const set=(id,txt)=>{ const el=document.getElementById(id); if(el) el.textContent=txt; };
  const setC=(id,c)=>{ const el=document.getElementById(id); if(el) el.style.color=c; };
  set('labBig',s+v+'°C'); setC('labBig',d.col);
  set('labZone',d.zone); set('labMood',d.mood); setC('labMood',d.col);
  set('labDesc',d.desc);
  const chip=document.getElementById('labChip'); if(chip){ chip.style.background=d.chip; chip.style.boxShadow='0 0 14px '+d.chip; }
  const disp=document.getElementById('labDisplay'); if(disp){ disp.style.background=d.bg; disp.style.borderColor=d.col+'33'; disp.style.boxShadow='0 0 60px '+d.col+'18'; }
}
function setLab(v){ const s=document.getElementById('labSlider'); if(s) s.value=v; updateLab(v); }
if(document.getElementById('labSlider')) updateLab(20);

/* ── 7. SCROLL REVEAL ── */
const ro = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }), {threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* ── 8. NAV ACTIVE STATE ── */
(function(){
  const fn = (window.location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const h = a.getAttribute('href')||'';
    const n = h.split('/').pop();
    a.classList.toggle('active', n===fn || (fn===''&&n==='index.html'));
  });
})();

/* ── 9. NAV SCROLL BORDER ── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', ()=>{ if(nav) nav.classList.toggle('scrolled', window.scrollY>60); });

/* ── 10. MOBILE NAV ── */
const tog = document.getElementById('navToggle');
const nls = document.getElementById('navLinks');
if(tog&&nls){
  tog.addEventListener('click', ()=>nls.classList.toggle('open'));
  document.addEventListener('click', e=>{ if(nav&&!nav.contains(e.target)) nls.classList.remove('open'); });
}

/* ── 11. VIDEO AUTOPLAY SAFETY ── */
document.querySelectorAll('video').forEach(v=>{
  v.muted=true;
  const p=v.play();
  if(p) p.catch(()=>{ document.addEventListener('click',()=>v.play(),{once:true}); document.addEventListener('touchstart',()=>v.play(),{once:true}); });
});
