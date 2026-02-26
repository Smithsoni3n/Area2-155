const SLIDES = [
  {
    key: "early",
    era: "1960–1964 · cold steel-blue clinical morning",
    dockTitle: "The Dock · Navy Yard-style dungarees",
    drapeTitle: "The Drape · stiff clinical nursing whites",
    video: "assets/era-1960-64-loop.mp4",
    tones: ["#6f8ea7", "#9db8cb", "#30475d"],
    dockImage: "assets/slide1-dock.jpg",
    drapeImage: "assets/slide1-drape.jpg"
  },
  {
    key: "late",
    era: "1965–1969 · darker choppy water + amber glints",
    dockTitle: "The Dock · service station/gas attendant",
    drapeTitle: "The Drape · professional retail/stewardess",
    video: "assets/era-1965-69-loop.mp4",
    tones: ["#2e3f50", "#715f44", "#1d2731"],
    dockImage: "assets/slide2-dock.jpg",
    drapeImage: "assets/slide2-drape.jpg"
  },
  {
    key: "seventies",
    era: "1970–1979 · deep iron-grey oily industrial sheen",
    dockTitle: "The Dock · rugged maritime/logging gear",
    drapeTitle: "The Drape · heavy-duty shipyard coveralls",
    video: "assets/era-1970-79-loop.mp4",
    tones: ["#3a454d", "#222930", "#656f79"],
    dockImage: "assets/slide3-dock.jpg",
    drapeImage: "assets/slide3-drape.jpg"
  }
];

const HOTSPOTS = [
  ["Collar seam", "steel-blue", "cotton twill", "Starch crispness at neck edge.", "In Bremerton yards, clean collars signaled discipline before shifts started."],
  ["Sleeve roll", "indigo", "denim", "Crease memory from repeated rolling.", "Workers rolled sleeves to handle wet, oily tasks near the docks."],
  ["Pocket patch", "off-white", "canvas", "Oil sheen around stitch lines.", "Reinforced pockets held cards, pencils, and small hardware."],
  ["Belt line", "iron-grey", "woven cotton", "Friction fray at loop corners.", "Constant lifting and crouching wore this point quickly."],
  ["Boot edge", "amber highlight", "leather/rubber", "Salt traces and scuff marks.", "Slip resistance mattered on rainy piers. Respectful humor: these boots knew every puddle by name."]
];

const queryEra = new URLSearchParams(window.location.search).get("era");
let current = Math.max(0, SLIDES.findIndex((s) => s.key === queryEra));
if (current < 0) current = 0;

const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
const tpl = document.getElementById("slide-template");

function hotspotMarkup(x, y, info) {
  return `<button class="hotspot" style="left:${x}%;top:${y}%" aria-label="${info[0]}"><span class="callout"><strong>${info[0]}</strong><br>Color: ${info[1]}<br>Material: ${info[2]}<br>Texture/Wear: ${info[3]}<br>Context: ${info[4]}</span></button>`;
}

function visualMarkup(image, label) {
  const map = HOTSPOTS.map((h, i) => hotspotMarkup(12 + i * 16, 18 + (i % 2) * 19, h)).join("");
  return `<div class="visual" data-file="${image}" style="background-image:url('${image}')">${map}<p class="tip-microcopy">Tap points · Touch details</p></div>`;
}

function panelMarkup(title, eraText, withGallery) {
  const gallery = withGallery
    ? `<section class="gallery" data-gallery><p><strong>Featured uniform photo sequence</strong> · Photography credit: Interactive Web Design Graduate Michael Martin.</p><div class="gallery-main" style="background-image:url('assets/feature-1.jpg')" title="Optional texture zoom"></div><div class="gallery-controls"><button class="g-prev">Prev</button><span><button data-g="0">•</button><button data-g="1">•</button><button data-g="2">•</button></span><button class="g-next">Next</button></div></section>`
    : "";
  return `<div class="panel"><button class="shift-toggle" aria-label="Binary Shift">↔ Binary Shift</button><h2>${title}</h2><p><strong>${eraText}</strong></p><p>Fact-based garment notes connect color, wear, and job identity to Bremerton naval and service labor.</p><p>Photography credit: Interactive Web Design Graduate Michael Martin.</p>${gallery}</div>`;
}

function markMissingImage(imgEl, file) {
  const tester = new Image();
  tester.onload = () => {};
  tester.onerror = () => imgEl.classList.add("missing");
  tester.src = file;
}

SLIDES.forEach((slide, i) => {
  const clone = tpl.content.firstElementChild.cloneNode(true);
  clone.style.setProperty("--tone-a", slide.tones[0]);
  clone.style.setProperty("--tone-b", slide.tones[1]);
  clone.style.setProperty("--tone-c", slide.tones[2]);

  const source = clone.querySelector(".bg-source");
  source.src = slide.video;

  const front = clone.querySelector(".front");
  const back = clone.querySelector(".back");
  front.innerHTML = `${visualMarkup(slide.dockImage, "dock")}${panelMarkup(slide.dockTitle, slide.era, i === 1)}`;
  back.innerHTML = `${visualMarkup(slide.drapeImage, "drape")}${panelMarkup(slide.drapeTitle, slide.era, false)}`;

  clone.querySelectorAll(".visual").forEach((v) => markMissingImage(v, v.dataset.file));
  slidesEl.appendChild(clone);

  const dot = document.createElement("button");
  dot.addEventListener("click", () => go(i));
  dotsEl.appendChild(dot);
});

function go(index) {
  current = (index + SLIDES.length) % SLIDES.length;
  slidesEl.style.transform = `translateX(-${current * 100}%)`;
  [...dotsEl.children].forEach((dot, i) => dot.classList.toggle("active", i === current));
  const key = SLIDES[current].key;
  document.querySelectorAll("[data-era-link]").forEach((a) => a.classList.toggle("current", a.dataset.eraLink === key));
  history.replaceState({}, "", `?era=${key}`);
}

go(current);

const featureImages = ["assets/feature-1.jpg", "assets/feature-2.jpg", "assets/feature-3.jpg"];

document.querySelector(".prev").onclick = () => go(current - 1);
document.querySelector(".next").onclick = () => go(current + 1);
addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") go(current - 1);
  if (e.key === "ArrowRight") go(current + 1);
});

let touchStart = 0;
slidesEl.addEventListener("touchstart", (e) => (touchStart = e.changedTouches[0].screenX));
slidesEl.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].screenX - touchStart;
  if (Math.abs(dx) > 48) go(dx > 0 ? current - 1 : current + 1);
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".shift-toggle")) e.target.closest(".artifact-card").classList.toggle("flipped");
  if (e.target.matches(".hotspot")) e.target.classList.toggle("open");

  if (e.target.matches(".g-prev, .g-next, [data-g]")) {
    const gallery = e.target.closest("[data-gallery]");
    if (!gallery) return;
    let i = Number(gallery.dataset.index || 0);
    if (e.target.matches(".g-prev")) i = (i + 2) % 3;
    if (e.target.matches(".g-next")) i = (i + 1) % 3;
    if (e.target.matches("[data-g]")) i = Number(e.target.dataset.g);
    gallery.dataset.index = i;
    const main = gallery.querySelector(".gallery-main");
    main.style.backgroundImage = `url('${featureImages[i]}')`;
    markMissingImage(main, featureImages[i]);
  }

  if (e.target.matches(".gallery-main")) e.target.classList.toggle("zoomed");
});

const cursor = document.getElementById("cursor");
addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
document.addEventListener("mouseover", (e) => {
  cursor.classList.toggle("active", Boolean(e.target.closest(".artifact-card, .hotspot, .shift-toggle")));
});
