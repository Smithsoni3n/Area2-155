// Single serverless route that serves both JSON and SVG.
// Place at /api/card.js (Vercel or Netlify).
// Usage:
//   /api/card                 -> random SVG (front)
//   /api/card?id=3            -> SVG for card 3 (front)
//   /api/card?id=3&side=back  -> SVG for back/evidence
//   /api/card?format=json     -> JSON list of all cards
//
// Reads BetterConversationsAPI/cards.json in repo root.

const fs = require('fs');
const path = require('path');

function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = (req, res) => {
  try {
    const cardsPath = path.join(process.cwd(), 'BetterConversationsAPI', 'cards.json');
    const raw = fs.readFileSync(cardsPath, 'utf8');
    const data = JSON.parse(raw || '{}');
    const version = req.query.version || 'v2';
    const deck = (data[version] || data.v2 || []);
    // Return JSON list if requested
    if ((req.query.format || '').toLowerCase() === 'json') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).send(JSON.stringify(data, null, 2));
    }

    // Choose card index
    const idParam = req.query.id || req.query.card;
    let idx;
    if (idParam) {
      idx = Math.max(0, Math.min(deck.length - 1, parseInt(idParam, 10) - 1));
      if (isNaN(idx)) idx = 0;
    } else {
      idx = Math.floor(Math.random() * Math.max(1, deck.length));
    }
    const card = deck[idx] || { front: { title: 'No card', copy: '' }, back: { fact: '' } };
    const side = (req.query.side || 'front').toLowerCase();

    const title = esc(card.front.title || '');
    const copy = esc(card.front.copy || '');
    const tags = (card.front.tags || []).map(esc).join(' • ');
    const fact = esc(card.back.fact || '');
    const backTitle = esc(card.back.title || '');

    const badge = `${idx+1}/${deck.length}`;

    // If client asked side=back, render the back/evidence card (simple layout)
    const svg = side === 'back' ? `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200" role="img" aria-label="${backTitle}">
  <defs>
    <linearGradient id="foil" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#f9fbff"/>
      <stop offset="18%" stop-color="#ffd166"/>
      <stop offset="34%" stop-color="#ff9aa2"/>
      <stop offset="52%" stop-color="#d66bff"/>
      <stop offset="68%" stop-color="#7ef6d4"/>
      <stop offset="86%" stop-color="#8fd3ff"/>
      <stop offset="100%" stop-color="#f9fbff"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="36" ry="36" fill="#05060c"/>
  <g transform="translate(40,40)">
    <rect width="720" height="1120" rx="28" ry="28" fill="url(#foil)"/>
    <text x="48" y="110" font-family="Manrope, system-ui" font-weight="800" font-size="32" fill="#061024">${backTitle}</text>
    <foreignObject x="48" y="150" width="624" height="760">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Manrope,system-ui;color:#061024;font-size:20px;line-height:1.5;font-weight:700;">
        ${fact || copy}
      </div>
    </foreignObject>
    <rect x="520" y="880" width="128" height="56" rx="12" fill="url(#foil)"/>
    <text x="584" y="916" text-anchor="middle" font-family="Manrope,system-ui" font-weight="900" font-size="18" fill="#061024">${badge}</text>
  </g>
</svg>` : `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="foil" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#f9fbff"/>
      <stop offset="18%" stop-color="#ffd166"/>
      <stop offset="34%" stop-color="#ff9aa2"/>
      <stop offset="52%" stop-color="#d66bff"/>
      <stop offset="68%" stop-color="#7ef6d4"/>
      <stop offset="86%" stop-color="#8fd3ff"/>
      <stop offset="100%" stop-color="#f9fbff"/>
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" rx="36" ry="36" fill="#05060c"/>
  <g transform="translate(40,40)">
    <rect width="720" height="1120" rx="28" ry="28" fill="url(#foil)"/>
    <text x="48" y="110" font-family="Manrope, system-ui, -apple-system" font-weight="800" font-size="34" fill="#061024">${title}</text>
    <text x="48" y="150" font-family="Manrope, system-ui" font-weight="700" font-size="18" fill="#09223a">${tags}</text>

    <foreignObject x="48" y="180" width="624" height="600">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Manrope,system-ui;color:#061024;font-size:20px;line-height:1.5;font-weight:700;">
        ${copy}
      </div>
    </foreignObject>

    <g transform="translate(48,880)">
      <text x="0" y="24" font-family="Manrope,system-ui" font-weight="800" font-size="14" fill="#09223a">Evidence</text>
      <text x="0" y="54" font-family="Manrope,system-ui" font-weight="600" font-size="15" fill="#09223a">${fact}</text>
      <rect x="520" y="-12" width="128" height="56" rx="12" fill="url(#foil)"/>
      <text x="584" y="28" text-anchor="middle" font-family="Manrope,system-ui" font-weight="900" font-size="18" fill="#061024">${badge}</text>
    </g>
  </g>
</svg>`;

    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(svg);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating card');
  }
};
