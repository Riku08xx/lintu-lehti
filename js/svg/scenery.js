/* 店内の背景（奥：壁と窓／中：棚と鉢植え／手前：四隅の葉）と、場面転換の葉っぱ */
(function (LL) {
  'use strict';
  LL.svg = LL.svg || {};
  const S = LL.shape;

  function windowArt(x, y) {
    return `<g transform="translate(${x} ${y})">` +
      '<path d="M-10 330 V110 A120 120 0 0 1 230 110 V330 Z" fill="#f6ead3"/>' +
      '<path d="M8 312 V112 A102 102 0 0 1 212 112 V312 Z" fill="#cfe6ee"/>' +
      '<ellipse cx="70" cy="90" rx="34" ry="14" fill="#fff" opacity=".9"/><ellipse cx="96" cy="82" rx="24" ry="12" fill="#fff" opacity=".9"/>' +
      '<path d="M8 250 Q 60 205 116 236 T 212 222 V312 H8 Z" fill="#a9c49a"/>' +
      '<path d="M8 280 Q 90 250 212 276 V312 H8 Z" fill="#8fb07f"/>' +
      '<g fill="#6f8f60"><circle cx="40" cy="232" r="14"/><circle cx="58" cy="226" r="18"/><circle cx="170" cy="222" r="15"/><circle cx="188" cy="230" r="12"/></g>' +
      '<path d="M110 10 V312 M8 190 H212" stroke="#f6ead3" stroke-width="10"/>' +
      '<rect x="-24" y="312" width="268" height="20" rx="4" fill="#b8956a"/>' +
      '<path d="M150 312 L156 284 L184 284 L190 312 Z" fill="#c4704f"/>' +
      S.leaf(170, 284, .4, -120, '#6f8a5c') + S.leaf(170, 284, .35, -60, '#7d9a68') + S.leaf(170, 284, .3, -90, '#93ab7a') +
      '</g>';
  }

  function lamp(x, len) {
    return `<g transform="translate(${x} 0)">` +
      `<line x1="0" y1="0" x2="0" y2="${len}" stroke="#5e4029" stroke-width="3"/>` +
      `<path d="M-46 ${len + 40} Q 0 ${len - 14} 46 ${len + 40} Z" fill="#e8d3a6"/>` +
      `<ellipse cx="0" cy="${len + 42}" rx="22" ry="8" fill="#fff4c9"/>` +
      `<circle cx="0" cy="${len + 60}" r="70" fill="#fff4c9" opacity=".22"/></g>`;
  }

  LL.svg.sceneBack = function () {
    let planks = '';
    for (let x = 32; x < 1600; x += 64) planks += `<rect x="${x}" y="606" width="3" height="294" fill="#c9ab80"/>`;
    let motif = '';
    for (let y = 60; y < 580; y += 120) {
      for (let x = (y / 120) % 2 ? 60 : 0; x < 1600; x += 120) motif += S.leaf(x, y, .18, -40, 'rgba(125,143,105,.13)', false);
    }
    return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
      '<rect class="wall-fill" width="1600" height="900"/>' + motif +
      '<rect y="600" width="1600" height="300" fill="#dcc29b"/>' + planks +
      '<rect y="592" width="1600" height="16" fill="#b8956a"/>' +
      windowArt(220, 170) + windowArt(1160, 170) +
      '<g transform="translate(800 300)"><circle r="62" fill="#b8956a"/><circle r="52" fill="#f6ead3"/>' +
      S.birdMark(0, 4, 2.6, '#2fa4e7') + S.leaf(-30, 30, .35, -30, '#7d9a68') + '</g>' +
      lamp(580, 90) + lamp(1020, 120) +
      '</svg>';
  };

  function shelf() {
    const jar = (x, y, h, c) => `<rect x="${x}" y="${y - h}" width="30" height="${h}" rx="6" fill="#f3ead8" opacity=".9"/><rect x="${x + 3}" y="${y - h * 0.6}" width="24" height="${h * 0.6 - 3}" rx="4" fill="${c}"/><rect x="${x - 2}" y="${y - h - 6}" width="34" height="8" rx="3" fill="#8a6440"/>`;
    const book = (x, y, h, c) => `<rect x="${x}" y="${y - h}" width="16" height="${h}" fill="${c}"/>`;
    const cup = (x, y, c) => `<path d="M${x} ${y - 26} h30 v18 a10 10 0 0 1 -10 8 h-10 a10 10 0 0 1 -10 -8 Z" fill="${c}"/><path d="M${x + 30} ${y - 22} a7 7 0 0 1 0 12" stroke="${c}" stroke-width="4" fill="none"/>`;
    const pot = (x, y) => `<path d="M${x} ${y - 30} h40 l-5 30 h-30 Z" fill="#c4704f"/>` +
      S.leaf(x + 20, y - 30, .45, -150, '#6f8a5c') + S.leaf(x + 20, y - 30, .45, -30, '#7d9a68') + S.leaf(x + 20, y - 30, .4, -90, '#93ab7a');
    return '<g>' +
      '<rect x="40" y="380" width="14" height="420" fill="#8a6440"/><rect x="306" y="380" width="14" height="420" fill="#8a6440"/>' +
      '<rect x="30" y="420" width="300" height="12" rx="3" fill="#a87d52"/><rect x="30" y="540" width="300" height="12" rx="3" fill="#a87d52"/><rect x="30" y="660" width="300" height="12" rx="3" fill="#a87d52"/>' +
      jar(70, 420, 54, '#8a5a35') + jar(110, 420, 44, '#d9b25c') + jar(150, 420, 60, '#6b3f25') + pot(220, 420) +
      book(70, 540, 70, '#7d8f69') + book(88, 540, 64, '#c4553f') + book(106, 540, 74, '#2f7fb8') + book(124, 540, 58, '#e3c86a') +
      cup(190, 540, '#fbf8f1') + cup(240, 540, '#9fc6de') +
      pot(80, 660) + jar(160, 660, 50, '#c0915f') + jar(206, 660, 40, '#e2577a') + jar(252, 660, 56, '#7f9fe2') +
      '</g>';
  }

  function counter() {
    let planks = '';
    for (let x = 1260; x < 1600; x += 40) planks += `<rect x="${x}" y="660" width="3" height="140" fill="#9a6b40"/>`;
    return '<g>' +
      '<rect x="1230" y="660" width="380" height="140" fill="#b88a5a"/>' + planks +
      '<rect x="1215" y="640" width="400" height="24" rx="5" fill="#7a5536"/>' +
      '<rect x="1290" y="618" width="80" height="22" rx="4" fill="#efe3cc"/>' +
      '<path d="M1290 618 a40 40 0 0 1 80 0" fill="#e9f3f6" opacity=".7" stroke="#cfe0e6" stroke-width="3"/>' +
      '<path d="M1302 618 h56 v-14 h-56 Z" fill="#d9a36a"/><path d="M1302 604 h56" stroke="#fff7e6" stroke-width="4"/>' +
      '<rect x="1420" y="560" width="70" height="80" rx="8" fill="#5e6b74"/><rect x="1432" y="574" width="46" height="26" rx="4" fill="#cfd8dc"/>' +
      '<rect x="1446" y="610" width="18" height="14" fill="#3a2e24"/>' +
      '<rect x="1520" y="590" width="26" height="50" rx="5" fill="#f3ead8"/><rect x="1523" y="608" width="20" height="29" fill="#6b3f25"/>' +
      '<g transform="translate(1250 700)"><rect width="74" height="44" rx="6" fill="#4f6243"/><text x="37" y="29" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#f6efe2">FIKA</text></g>' +
      '</g>';
  }

  function floorPlant(x, kind) {
    const pot = `<path d="M${x - 50} 720 h100 l-12 80 h-76 Z" fill="#c4704f"/><rect x="${x - 56}" y="712" width="112" height="16" rx="5" fill="#a85c3f"/>`;
    if (kind === 'monstera') {
      return '<g>' +
        `<path d="M${x} 716 C ${x - 10} 640 ${x - 60} 600 ${x - 80} 560 M${x} 716 C ${x + 10} 630 ${x + 40} 590 ${x + 70} 540 M${x} 716 C ${x} 640 ${x - 6} 560 ${x + 4} 500" stroke="#5f7a4f" stroke-width="6" fill="none"/>` +
        S.monstera(x - 80, 560, .62, -50, '#5f7a4f') + S.monstera(x + 70, 540, .6, 45, '#6f8a5c') + S.monstera(x + 4, 500, .66, -5, '#55704a') +
        pot + '</g>';
    }
    let leaves = '';
    for (let i = 0; i < 14; i++) {
      const yy = 470 + i * 17;
      leaves += `<ellipse cx="${x + (i % 2 ? 26 : -26)}" cy="${yy}" rx="30" ry="20" transform="rotate(${i % 2 ? 25 : -25} ${x + (i % 2 ? 26 : -26)} ${yy})" fill="${i % 3 ? '#5f7a4f' : '#6f8a5c'}"/>`;
    }
    return `<g><path d="M${x} 716 L${x} 460" stroke="#7a5536" stroke-width="8"/>${leaves}${pot}</g>`;
  }

  LL.svg.sceneMid = function () {
    let floor = '';
    for (let y = 820; y < 900; y += 26) floor += `<rect x="0" y="${y}" width="1600" height="2" fill="#8f6a46"/>`;
    return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">' +
      '<rect y="800" width="1600" height="100" fill="#a57e55"/>' + floor +
      shelf() + floorPlant(430, 'monstera') + floorPlant(1130, 'fiddle') + counter() +
      '</svg>';
  };

  LL.svg.corners = function () {
    let pothos = '';
    const vines = [[230, 0, 260, 340], [270, 0, 280, 230], [190, 0, 215, 180]];
    vines.forEach(([x1, y1, x2, y2], v) => {
      pothos += `<path d="M${x1} ${y1} C ${x1 - 30} ${y2 * 0.4} ${x2 + 20} ${y2 * 0.7} ${x2} ${y2}" stroke="#5f7a4f" stroke-width="3" fill="none"/>`;
      for (let t = 0.12; t <= 1; t += 0.14) {
        const x = x1 + (x2 - x1) * t + Math.sin(t * 9 + v) * 12;
        const y = y1 + (y2 - y1) * t;
        pothos += S.heart(x, y, .8, (t * 300 + v * 40) % 2 ? 160 : 200, t * 10 % 2 > 1 ? '#7d9a68' : '#93ab7a');
      }
    });
    return '<div class="corner corner-tl"><svg viewBox="0 0 300 260" focusable="false">' +
        S.monstera(20, -20, 1.05, 140, '#5f7a4f') + S.monstera(-20, 90, .7, 115, '#6f8a5c') + '</svg></div>' +
      '<div class="corner corner-tr"><svg viewBox="0 0 300 360" focusable="false">' +
        '<rect x="160" y="0" width="140" height="14" fill="#8a6440"/>' + pothos + '</svg></div>' +
      '<div class="corner corner-bl"><svg viewBox="0 0 300 260" focusable="false">' +
        S.fern(10, 270, 1.3, 30, '#6f8a5c') + S.fern(40, 270, 1.1, 60, '#7d9a68') + S.fern(-10, 270, 1.0, 8, '#5f7a4f') + '</svg></div>' +
      '<div class="corner corner-br"><svg viewBox="0 0 300 260" focusable="false">' +
        S.monstera(300, 280, .95, -40, '#55704a') + S.leaf(300, 260, 1.8, -150, '#7d9a68') + S.leaf(300, 260, 1.4, -120, '#93ab7a') + '</svg></div>';
  };

  // 場面転換で画面を一瞬覆う葉っぱ（左：まばら → 中央：びっしり → 右：まばら）
  LL.svg.leafCover = function () {
    const side = (bias, seed) => `<svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${S.field(1000, 1000, 110, seed, 1.0, 2.6, bias)}</svg>`;
    return side('left', 3) +
      `<svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><rect width="1000" height="1000" fill="#5f7a4f"/>${S.field(1000, 1000, 170, 7, 1.4, 3.0)}</svg>` +
      side('right', 9);
  };

  // こだわりページ用の植物アイコン
  LL.svg.plant = function (kind) {
    const pot = '<path d="M30 74 h40 l-5 24 h-30 Z" fill="#c4704f"/><rect x="27" y="70" width="46" height="8" rx="3" fill="#a85c3f"/>';
    let art = '';
    if (kind === 'monstera') art = S.monstera(50, 72, .44, -28, '#5f7a4f') + S.monstera(50, 72, .4, 32, '#6f8a5c');
    if (kind === 'pothos') {
      art = '<path d="M38 74 C 20 80 14 92 18 100 M62 74 C 82 80 86 92 80 100" stroke="#5f7a4f" stroke-width="2" fill="none"/>' +
        S.heart(18, 96, .5, 180, '#93ab7a') + S.heart(80, 98, .5, 170, '#7d9a68') + S.heart(50, 70, .7, -20, '#7d9a68') +
        S.heart(50, 70, .7, 25, '#93ab7a') + S.heart(50, 70, .6, 0, '#6f8a5c');
    }
    if (kind === 'umbellata') {
      art = '<path d="M50 72 L50 26" stroke="#7a5536" stroke-width="3"/>' +
        S.heart(50, 50, .8, -50, '#7d9a68') + S.heart(50, 40, .8, 45, '#93ab7a') + S.heart(50, 30, .75, 0, '#6f8a5c');
    }
    if (kind === 'fern') art = S.fern(50, 72, .38, -40) + S.fern(50, 72, .4, 0, '#7d9a68') + S.fern(50, 72, .38, 40, '#5f7a4f');
    return `<svg viewBox="0 0 100 104" aria-hidden="true" focusable="false">${art}${pot}</svg>`;
  };

  // インテリアのアイコン
  LL.svg.interior = function (kind) {
    if (kind === 'chair') {
      return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M32 14 h36 v40 h-36 Z" fill="#f1e2c4" stroke="#c9a77c" stroke-width="3"/><path d="M38 22 h24 M38 32 h24 M38 42 h24" stroke="#d9c49e" stroke-width="3"/>' +
        '<rect x="26" y="54" width="48" height="10" rx="3" fill="#e3cda8"/><path d="M30 64 L26 94 M70 64 L74 94 M36 64 L38 86 M64 64 L62 86" stroke="#c9a77c" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M30 64 L26 94 M70 64 L74 94" stroke="#3a2e24" stroke-width="5" stroke-dasharray="3 7" stroke-linecap="round" opacity=".5"/></svg>';
    }
    if (kind === 'linen') {
      return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M18 30 Q 50 20 82 30 Q 90 50 82 74 Q 50 84 18 74 Q 10 50 18 30 Z" fill="#c7d3b8"/>' +
        '<path d="M18 30 Q 50 20 82 30 Q 90 50 82 74 Q 50 84 18 74 Q 10 50 18 30 Z" fill="none" stroke="#7d8f69" stroke-width="2" stroke-dasharray="4 4"/>' +
        S.birdMark(50, 52, 1.4, '#f7d633') + '</svg>';
    }
    return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle cx="50" cy="44" r="34" fill="#fff4c9" opacity=".6"/>' +
      '<path d="M30 50 Q 50 14 70 50 Z" fill="#e8d3a6"/><rect x="47" y="50" width="6" height="34" fill="#8a6440"/><rect x="32" y="84" width="36" height="8" rx="3" fill="#8a6440"/></svg>';
  };
})(window.LL = window.LL || {});
