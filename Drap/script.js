const data = [
  {
    era:'1960-1964',
    video:'https://player.vimeo.com/external/434045526.sd.mp4?s=6313f2e20289fbfa2cbf4af136fd9f01b25345f0&profile_id=139&oauth2_token_id=57447761',
    male:{title:'PSNS Dungaree Detail',img:'https://upload.wikimedia.org/wikipedia/commons/2/28/US_Navy_100906-N-3408P-130_Aviation_Structural_Mechanic_Airman_Joseph_Borelli%2C_assigned_to_the_Argonauts_of_Patrol_Squadron_%28VP%29_4%2C_cleans_the_flight_deck_as_part_of_his_daily_duties.jpg',desc:'Bremerton shipfitters and mechanics wore tough cotton dungarees for oily machine spaces.',fact:'Punch clocks and shift whistles ran Bremerton mornings like a metronome.'},
    female:{title:'Hospital Whites',img:'https://upload.wikimedia.org/wikipedia/commons/9/95/U.S._Navy_hospital_corpsmen.jpg',desc:'Nursing whites represented disciplined standards at naval and community care facilities.',fact:'Crisp whites looked sharp; keeping them white in rainy Washington was the real skill.'}
  },
  {
    era:'1965-1969',
    video:'https://player.vimeo.com/external/371433846.sd.mp4?s=2364ef52eb6ce57dc4f66cf4e6f0d95dbf2d5cde&profile_id=139&oauth2_token_id=57447761',
    male:{title:'Gas Attendant Uniform',img:'https://upload.wikimedia.org/wikipedia/commons/2/2a/Gas_station_attendant_1966.jpg',desc:'Service stations expanded with commuting traffic around Bremerton and ferry links.',fact:'Yes, someone really ran out, checked oil, and cleaned glass every single stop.'},
    female:{title:'Professional Service Tailoring',img:'https://upload.wikimedia.org/wikipedia/commons/a/ac/Stewardess_showing_new_uniform_1968.jpg',desc:'Retail and travel-adjacent roles favored fitted uniforms that balanced style and function.',fact:'Matching hats looked glamorous until the Puget Sound wind joined the conversation.'}
  },
  {
    era:'1970-1979',
    video:'https://player.vimeo.com/external/445690438.sd.mp4?s=13ce2f5df5f9ed5dbc6d82af6f5d56be4bb86fd5&profile_id=139&oauth2_token_id=57447761',
    male:{title:'Maritime & Logging Wear',img:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Logger%2C_Washington_state%2C_1972.jpg',desc:'Regional labor used layered wool, waxed shells, and hard-wearing boots in wet conditions.',fact:'If it survived a logging week, it could survive anything except lost lunch pails.'},
    female:{title:'Industrial Coveralls',img:'https://upload.wikimedia.org/wikipedia/commons/1/14/Female_shipyard_worker.jpg',desc:'Women entering industrial trades adopted practical coveralls and steel-toe safety gear.',fact:'Coveralls made everyone equal: same tools, same grease, same stubborn zipper.'}
  }
];

const tpl = document.getElementById('panelTpl');
const reel = document.getElementById('reel');
const rc = document.getElementById('reactiveCursor');

for (const item of data) {
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.querySelector('.bg').src = item.video;
  const tint = node.querySelector('.tint');
  tint.style.background = item.era.startsWith('1960') ? 'rgba(59,95,130,.38)' : item.era.startsWith('1965') ? 'rgba(148,102,47,.38)' : 'rgba(70,76,83,.45)';
  const male = node.querySelector('.male');
  male.innerHTML = `<h2>${item.era} — ${item.male.title}</h2><img src="${item.male.img}" alt="${item.male.title}"><p>${item.male.desc}</p><button class="blip">Dock Fact</button>`;
  const female = node.querySelector('.female');
  female.innerHTML = `<h2>${item.era} — ${item.female.title}</h2><img src="${item.female.img}" alt="${item.female.title}"><p>${item.female.desc}</p><button class="blip">Drape Fact</button>`;
  node.querySelectorAll('.blip')[0].onclick = () => alert(item.male.fact);
  node.querySelectorAll('.blip')[1].onclick = () => alert(item.female.fact);
  const flipbox = node.querySelector('.flipbox');
  flipbox.onclick = (e) => { if (!e.target.classList.contains('blip')) flipbox.classList.toggle('flipped'); };
  flipbox.onmouseenter = () => rc.classList.add('grow');
  flipbox.onmouseleave = () => rc.classList.remove('grow');
  reel.append(node);
}
window.onmousemove = (e)=>{rc.style.left=`${e.clientX}px`;rc.style.top=`${e.clientY}px`;};
