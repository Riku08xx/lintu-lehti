/* イラストの架空マップ（実在しない場所） */
(function (LL) {
  'use strict';
  LL.svg = LL.svg || {};
  const S = LL.shape;

  function trees(points, seed) {
    const r = S.rng(seed);
    return points.map(([x, y]) => {
      const rad = 10 + r() * 8;
      return `<rect x="${x - 2}" y="${y}" width="4" height="${rad}" fill="#7a5536"/><circle cx="${x}" cy="${y}" r="${rad.toFixed(1)}" fill="${S.pick(r, ['#7d9a68', '#6f8a5c', '#93ab7a'])}"/>`;
    }).join('');
  }

  LL.svg.map = function () {
    const forestA = [[40, 50], [80, 40], [120, 60], [60, 90], [100, 100], [150, 40], [30, 130], [140, 110], [190, 70]];
    const forestB = [[480, 220], [520, 250], [560, 220], [540, 290], [500, 300], [580, 270], [470, 280]];
    const forestC = [[300, 50], [340, 40], [260, 90], [230, 50]];
    const label = (x, y, t, size = 15, extra = '') =>
      `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="700" fill="#4b3a2b" stroke="#f3ead6" stroke-width="4" paint-order="stroke" ${extra}>${t}</text>`;
    return '<svg viewBox="0 0 600 420" role="img" aria-labelledby="map-title map-desc" focusable="false">' +
      '<title id="map-title">Lintu &amp; Lehti までの架空の地図</title>' +
      '<desc id="map-desc">どんぐり駅（架空）から森の小径を北へ歩き、葉っぱ橋で小川をわたると、右手にお店があります。実在しない場所です。</desc>' +
      '<rect width="600" height="420" fill="#f3ead6"/>' +
      '<path d="M-10 250 C 120 220 200 300 320 262 S 520 196 610 226" stroke="#9fcbe0" stroke-width="34" fill="none" stroke-linecap="round"/>' +
      '<path d="M-10 250 C 120 220 200 300 320 262 S 520 196 610 226" stroke="#c4e2ee" stroke-width="10" fill="none" stroke-dasharray="18 22" stroke-linecap="round"/>' +
      trees(forestA, 1) + trees(forestB, 2) + trees(forestC, 3) +
      '<path d="M70 430 C 120 340 200 300 262 284 C 330 266 360 220 380 160 C 392 120 420 96 470 80" stroke="#d9c49e" stroke-width="30" fill="none" stroke-linecap="round"/>' +
      '<path d="M70 430 C 120 340 200 300 262 284 C 330 266 360 220 380 160 C 392 120 420 96 470 80" stroke="#fffaf0" stroke-width="22" fill="none" stroke-linecap="round"/>' +
      '<path d="M70 430 C 120 340 200 300 262 284 C 330 266 360 220 380 160 C 392 120 420 96 470 80" stroke="#c4553f" stroke-width="3.5" fill="none" stroke-dasharray="2 9" stroke-linecap="round"/>' +
      '<g transform="translate(262 282) rotate(-18)"><rect x="-30" y="-24" width="60" height="48" rx="4" fill="#b88a5a"/><path d="M-30 -24 V24 M30 -24 V24" stroke="#7a5536" stroke-width="6"/>' +
      '<path d="M-22 -24 V24 M-12 -24 V24 M-2 -24 V24 M8 -24 V24 M18 -24 V24" stroke="#9a6b40" stroke-width="2"/></g>' +
      '<g transform="translate(96 372)"><rect x="-38" y="-26" width="76" height="40" rx="4" fill="#e9dcc0" stroke="#8a6440" stroke-width="3"/><path d="M-46 -24 L0 -50 L46 -24 Z" fill="#7d8f69"/>' +
      '<rect x="-10" y="-8" width="20" height="22" fill="#8a6440"/><circle cx="0" cy="-34" r="7" fill="#f7d633"/></g>' +
      '<g transform="translate(470 74)"><ellipse cx="0" cy="36" rx="46" ry="8" fill="rgba(58,46,36,.15)"/>' +
      '<rect x="-34" y="-6" width="68" height="42" rx="4" fill="#fbf3e2" stroke="#6b4a2f" stroke-width="3"/>' +
      '<path d="M-44 -4 Q 0 -54 44 -4 Z" fill="#5f7a4f"/>' + S.leaf(-10, -26, .3, -30, '#93ab7a') +
      '<rect x="-8" y="12" width="16" height="24" rx="8" fill="#b07d4f"/><rect x="-28" y="6" width="14" height="12" rx="3" fill="#cfe6ee"/><rect x="14" y="6" width="14" height="12" rx="3" fill="#cfe6ee"/>' +
      S.birdMark(30, -20, 1.2, '#2fa4e7') + S.birdMark(-30, -18, 1.1, '#f7d633') + '</g>' +
      label(470, 140, 'Lintu &amp; Lehti', 18, 'font-family="Georgia, serif"') +
      label(470, 160, '森の小径3番地', 13) +
      label(96, 404, 'どんぐり駅', 15) +
      label(330, 330, '葉っぱ橋', 14) +
      label(400, 214, '森の小径', 13) +
      label(110, 160, 'ささやきの森', 14) +
      label(560, 330, '小川', 13) +
      '<g transform="translate(548 392)"><circle r="18" fill="#fffaf0" stroke="#8a6440" stroke-width="2"/><path d="M0 -14 L6 4 L0 0 L-6 4 Z" fill="#c4553f"/>' +
      '<text y="-22" text-anchor="middle" font-size="12" font-weight="700" fill="#4b3a2b">N</text></g>' +
      '<g transform="translate(150 300)"><rect x="-56" y="-14" width="112" height="28" rx="14" fill="#fffaf0" stroke="#c4553f" stroke-width="2"/>' +
      '<text y="5" text-anchor="middle" font-size="13" font-weight="700" fill="#c4553f">徒歩およそ7分</text></g>' +
      '</svg>';
  };
})(window.LL = window.LL || {});
