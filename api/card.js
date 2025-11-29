// api/card.js  — serverless route for the Supercommunicator deck
// Serves JSON and an SVG optimized for a teal Z Flip mockup.

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
    const deckName = data.deckName || data.deckTitle || 'Supercommunicator Protocols';
    const deck = data.v2 || data.cards || [];

    // JSON export
    if ((req.query.format || '').toLowerCase() === 'json') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'no-store');
      return res.end(JSON.stringify({ deckName, v2: deck }, null, 2));
    }

    // id is 1-based; default to the first card to keep the deck in order
    const idParam = req.query.id || req.query.card;
    let idx = 0;
    if (idParam) {
      idx = Math.max(0, Math.min(deck.length - 1, parseInt(idParam, 10) - 1));
      if (isNaN(idx)) idx = 0;
    }

    const card = deck[idx] || { front: { title: 'No card', copy: '' }, back: { copy: '', links: [] } };
    const side = (req.query.side || 'front').toLowerCase();

    const width = 396;
    const height = 866;
    const title = esc(card.front.title || '');
    const copy = esc(card.front.copy || '');
    const tags = (card.front.tags || []).map(esc).join(' • ');
    const backTitle = esc(card.back.title || '');
    const protocol = esc(card.back.copy || '');
    const links = Array.isArray(card.back.links) ? card.back.links : [];
    const badge = `${idx + 1}/${deck.length}`;

    const linkList = links
      .map((href, i) => `<li style="margin-bottom:6px;"><a href="${esc(href)}" target="_blank" rel="noreferrer">Link ${i + 1}</a></li>`)
      .join('');

    const svg = side === 'back'
      ? `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${backTitle}">
  <defs>
    <linearGradient id="foil" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#c0c6d4"/>
      <stop offset="22%" stop-color="#ffd166"/>
      <stop offset="45%" stop-color="#75ffa2"/>
      <stop offset="65%" stop-color="#ff9ce6"/>
      <stop offset="82%" stop-color="#b589ff"/>
      <stop offset="100%" stop-color="#66b8ff"/>
    </linearGradient>
    <linearGradient id="tealShell" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#0f2f34"/>
      <stop offset="100%" stop-color="#0e9aa7"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="42" ry="42" fill="url(#tealShell)"/>
  <g transform="translate(18,18)">
    <rect width="${width - 36}" height="${height - 36}" rx="32" ry="32" fill="#02060a" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
    <rect x="18" y="18" width="${width - 72}" height="${height - 120}" rx="26" ry="26" fill="url(#foil)"/>
    <text x="46" y="92" font-family="'Inter', system-ui,-apple-system,Roboto,Arial" font-weight="800" font-size="20" fill="#061024">${backTitle}</text>
    <foreignObject x="46" y="120" width="${width - 140}" height="520">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Inter',system-ui,-apple-system,Roboto,Arial;color:#061024;font-size:15px;line-height:1.5;font-weight:700;">
        ${protocol}
      </div>
    </foreignObject>
    <text x="46" y="${height - 236}" font-family="'Inter',system-ui,-apple-system" font-weight="800" font-size="13" fill="#061024">Links</text>
    <foreignObject x="46" y="${height - 220}" width="${width - 140}" height="120">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Inter',system-ui,-apple-system,Roboto,Arial;color:#041422;font-size:13px;line-height:1.45;font-weight:700;">
        <ul style="margin:0;padding-left:18px;list-style:disc;">${linkList}</ul>
      </div>
    </foreignObject>
    <rect x="${width - 164}" y="${height - 170}" width="110" height="40" rx="12" fill="url(#foil)"/>
    <text x="${width - 108}" y="${height - 144}" text-anchor="middle" font-family="'Inter',system-ui,-apple-system" font-weight="900" font-size="15" fill="#061024">${badge}</text>
  </g>
</svg>`
      : `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="foil" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#c0c6d4"/>
      <stop offset="22%" stop-color="#ffd166"/>
      <stop offset="45%" stop-color="#75ffa2"/>
      <stop offset="65%" stop-color="#ff9ce6"/>
      <stop offset="82%" stop-color="#b589ff"/>
      <stop offset="100%" stop-color="#66b8ff"/>
    </linearGradient>
    <linearGradient id="tealShell" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#0f2f34"/>
      <stop offset="100%" stop-color="#0e9aa7"/>
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" rx="42" ry="42" fill="url(#tealShell)"/>
  <g transform="translate(18,18)">
    <rect width="${width - 36}" height="${height - 36}" rx="32" ry="32" fill="#02060a" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
    <rect x="18" y="18" width="${width - 72}" height="${height - 120}" rx="26" ry="26" fill="url(#foil)"/>
    <text x="46" y="88" font-family="'Inter', system-ui,-apple-system,Roboto,Arial" font-weight="900" font-size="22" fill="#061024">${title}</text>
    <text x="46" y="118" font-family="'Inter', system-ui,-apple-system,Roboto,Arial" font-weight="700" font-size="12" fill="#0e3a49">${tags}</text>

    <foreignObject x="46" y="140" width="${width - 140}" height="480">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Inter',system-ui,-apple-system,Roboto,Arial;color:#041422;font-size:15px;line-height:1.55;font-weight:700;">
        ${copy}
      </div>
    </foreignObject>

    <text x="46" y="${height - 210}" font-family="'Inter',system-ui,-apple-system" font-weight="800" font-size="13" fill="#061024">Protocol preview</text>
    <text x="46" y="${height - 184}" font-family="'Inter',system-ui,-apple-system" font-weight="700" font-size="12" fill="#0e3a49">${protocol}</text>

    <rect x="${width - 164}" y="${height - 170}" width="110" height="40" rx="12" fill="url(#foil)"/>
    <text x="${width - 108}" y="${height - 144}" text-anchor="middle" font-family="'Inter',system-ui,-apple-system" font-weight="900" font-size="15" fill="#061024">${badge}</text>
  </g>
</svg>`;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Content-Disposition', 'inline; filename="card.svg"');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(svg);
  } catch (err) {
    console.error('card API error:', err && err.stack ? err.stack : err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    return res.end('Error generating card');
  }
};
