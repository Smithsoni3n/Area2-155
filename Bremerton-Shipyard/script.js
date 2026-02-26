const eras = [
  {
    era:'1960-1964',
    water:'rgba(54,92,126,.42)',
    video:'https://player.vimeo.com/external/434045526.sd.mp4?s=6313f2e20289fbfa2cbf4af136fd9f01b25345f0&profile_id=139&oauth2_token_id=57447761',
    dock:{title:'Navy Yard Dungarees',img:'https://upload.wikimedia.org/wikipedia/commons/2/28/US_Navy_100906-N-3408P-130_Aviation_Structural_Mechanic_Airman_Joseph_Borelli%2C_assigned_to_the_Argonauts_of_Patrol_Squadron_%28VP%29_4%2C_cleans_the_flight_deck_as_part_of_his_daily_duties.jpg',desc:'PSNS workers wore denim dungarees and service shirts for mechanical and hull work.'},
    drape:{title:'Clinical Nursing Whites',img:'https://upload.wikimedia.org/wikipedia/commons/9/95/U.S._Navy_hospital_corpsmen.jpg',desc:'Hospital corps and nursing teams maintained strict white-uniform protocols.'},
    jokes:['Clock-in lines moved faster than coffee lines.', 'A clean cap in Bremerton drizzle was an elite achievement.']
  },
  {
    era:'1965-1969',
    water:'rgba(150,106,48,.37)',
    video:'https://player.vimeo.com/external/371433846.sd.mp4?s=2364ef52eb6ce57dc4f66cf4e6f0d95dbf2d5cde&profile_id=139&oauth2_token_id=57447761',
    dock:{title:'Service Station Uniform',img:'https://upload.wikimedia.org/wikipedia/commons/2/2a/Gas_station_attendant_1966.jpg',desc:'Gas attendants in logo uniforms supported vehicle growth across Kitsap roads.'},
    drape:{title:'Retail & Stewardess Uniforming',img:'https://upload.wikimedia.org/wikipedia/commons/a/ac/Stewardess_showing_new_uniform_1968.jpg',desc:'Tailored uniforms reflected formal customer-service standards in late 1960s roles.'},
    jokes:['Full-service included oil checks and local gossip updates.', 'Keeping hats straight in Sound winds counted as athletic work.']
  },
  {
    era:'1970-1979',
    water:'rgba(80,84,88,.48)',
    video:'https://player.vimeo.com/external/445690438.sd.mp4?s=13ce2f5df5f9ed5dbc6d82af6f5d56be4bb86fd5&profile_id=139&oauth2_token_id=57447761',
    dock:{title:'Maritime/Logging Gear',img:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Logger%2C_Washington_state%2C_1972.jpg',desc:'Rugged weatherproof layers handled heavy rain, timber yards, and dock activity.'},
    drape:{title:'Shipyard Coveralls',img:'https://upload.wikimedia.org/wikipedia/commons/1/14/Female_shipyard_worker.jpg',desc:'Women in growing industrial roles adopted durable coveralls and safety boots.'},
    jokes:['Waxed jackets blocked rain, not paperwork.', 'Coveralls had eight pockets and zero time for nonsense.']
  }
];

const consoleEl = document.getElementById('console');
const cursor = document.getElementById('shiftCursor');

function buildScene(item, i) {
  const scene = document.createElement('section');
  scene.className = `scene ${i===0?'active':''}`;
  scene.innerHTML = `
    <video autoplay muted loop playsinline src="${item.video}"></video>
    <div class="wash" style="background:${item.water}"></div>
    <div class="deck">
      <article class="shell">
        <section class="panel dock">
          <div class="tag">Dock | ${item.era}</div>
          <h2>${item.dock.title}</h2>
          <img src="${item.dock.img}" alt="${item.dock.title}">
          <p>${item.dock.desc}</p>
          <button class="ping">Fact + humor</button>
        </section>
        <section class="panel drape">
          <div class="tag">Drape | ${item.era}</div>
          <h2>${item.drape.title}</h2>
          <img src="${item.drape.img}" alt="${item.drape.title}">
          <p>${item.drape.desc}</p>
          <button class="ping">Fact + humor</button>
        </section>
      </article>
    </div>`;

  const shell = scene.querySelector('.shell');
  shell.onclick = (e)=>{ if(!e.target.classList.contains('ping')) shell.classList.toggle('flipped'); };
  scene.querySelectorAll('.ping')[0].onclick = ()=> alert(item.jokes[0]);
  scene.querySelectorAll('.ping')[1].onclick = ()=> alert(item.jokes[1]);
  shell.onmouseenter = ()=> cursor.classList.add('live');
  shell.onmouseleave = ()=> cursor.classList.remove('live');
  return scene;
}

const scenes = eras.map(buildScene);
scenes.forEach(s=>consoleEl.append(s));

document.querySelectorAll('[data-go]').forEach(btn=>{
  btn.onclick = ()=>{
    const ix = Number(btn.dataset.go);
    scenes.forEach((s,i)=> s.classList.toggle('active', i===ix));
  };
});
window.onmousemove = (e)=>{cursor.style.left=`${e.clientX}px`;cursor.style.top=`${e.clientY}px`;};
