// api/card.js  — single serverless route for Vercel/Netlify
// Serves JSON and an iPhone‑portrait SVG for the "Real Talk" deck.
// Place at repoRoot/api/card.js

const fs = require('fs');
const path = require('path');

function esc(s = '') {
  return String(s || '')
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

    // JSON export (returns deckName + v2)
    if ((req.query.format || '').toLowerCase() === 'json') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).send(JSON.stringify(data, null, 2));
    }

    // pick index (id is 1-based)
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

    // iPhone logical viewport
    const width = 390;
    const height = 844;
    const title = esc(card.front.title || '');
    const copy = esc(card.front.copy || '');
    const tags = (card.front.tags || []).map(esc).join(' • ');
    const fact = esc(card.back.fact || '') || esc(card.back.copy || '');
    const backTitle = esc(card.back.title || '');
    const badge = `${idx+1}/${deck.length}`;

    // oil-foil gradient (keeps foil look for buttons & badge alignment)
    const svg = side === 'back' ? `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${backTitle}">
  <defs>
    <linearGradient id="foil" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#ffd166"/>
      <stop offset="33%" stop-color="#ff9aa2"/>
      <stop offset="52%" stop-color="#d66bff"/>
      <stop offset="68%" stop-color="#7ef6d4"/>
      <stop offset="86%" stop-color="#8fd3ff"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="28" ry="28" fill="#05060c"/>
  <g transform="translate(18,18)">
    <rect width="${width-36}" height="${height-36}" rx="20" ry="20" fill="url(#foil)"/>
    <text x="20" y="62" font-family="system-ui,-apple-system,Roboto,Arial" font-weight="800" font-size="18" fill="#061024">${backTitle}</text>
    <foreignObject x="20" y="94" width="${width-76}" height="${height-220}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:system-ui,-apple-system,Roboto,Arial;color:#061024;font-size:14px;line-height:1.45;font-weight:600;">
        ${fact}
      </div>
    </foreignObject>
    <rect x="${width-140}" y="${height-160}" width="92" height="36" rx="8" fill="url(#foil)"/>
    <text x="${width-94}" y="${height-135}" text-anchor="middle" font-family="system-ui,-apple-system" font-weight="900" font-size="14" fill="#061024">${badge}</text>
  </g>
</svg>` : `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="foil" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#ffd166"/>
      <stop offset="33%" stop-color="#ff9aa2"/>
      <stop offset="52%" stop-color="#d66bff"/>
      <stop offset="68%" stop-color="#7ef6d4"/>
      <stop offset="86%" stop-color="#8fd3ff"/>
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" rx="28" ry="28" fill="#05060c"/>
  <g transform="translate(18,18)">
    <rect width="${width-36}" height="${height-36}" rx="20" ry="20" fill="url(#foil)"/>
    <text x="20" y="56" font-family="system-ui,-apple-system,Roboto,Arial" font-weight="800" font-size="20" fill="#061024">${title}</text>
    <text x="20" y="84" font-family="system-ui,-apple-system,Roboto,Arial" font-weight="700" font-size="12" fill="#09223a">${tags}</text>

    <foreignObject x="20" y="102" width="${width-76}" height="520">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:system-ui,-apple-system,Roboto,Arial;color:#061024;font-size:14px;line-height:1.5;font-weight:700;">
        ${copy}
      </div>
    </foreignObject>

    <text x="20" y="${height-120}" font-family="system-ui,-apple-system" font-weight="800" font-size="12" fill="#09223a">Protocol</text>
    <text x="20" y="${height-98}" font-family="system-ui,-apple-system" font-weight="600" font-size="12" fill="#09223a">${fact}</text>

    <!-- small badge bottom-right -->
    <rect x="${width-140}" y="${height-160}" width="92" height="36" rx="8" fill="url(#foil)"/>
    <text x="${width-94}" y="${height-135}" text-anchor="middle" font-family="system-ui,-apple-system" font-weight="900" font-size="14" fill="#061024">${badge}</text>
  </g>
</svg>` ;

    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(svg);
  } catch (err) {
    console.error('card API error:', err && err.stack ? err.stack : err);
    res.status(500).send('Error generating card');
  }
};
