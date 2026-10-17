/* 入店演出の扉まわり */
(function (LL) {
  'use strict';
  LL.svg = LL.svg || {};
  const S = LL.shape;

  function doorLeaf() {
    let planks = '';
    for (let x = 40; x < 240; x += 40) planks += `<rect x="${x - 1.5}" y="0" width="3" height="460" fill="#8f6038"/>`;
    return '<svg viewBox="0 0 240 460" aria-hidden="true" focusable="false">' +
      '<defs><clipPath id="door-clip"><path d="M0 460 V120 A120 120 0 0 1 240 120 V460 Z"/></clipPath></defs>' +
      '<g clip-path="url(#door-clip)">' +
        '<rect width="240" height="460" fill="#b07d4f"/>' + planks +
        '<rect x="0" y="384" width="240" height="76" fill="#9a6b40"/>' +
      '</g>' +
      '<path d="M4 460 V120 A116 116 0 0 1 236 120 V460" fill="none" stroke="#7a5232" stroke-width="8"/>' +
      '<circle cx="120" cy="122" r="50" fill="#e9dcc0"/><circle cx="120" cy="122" r="41" fill="#cfe6ee"/>' +
      S.leaf(92, 150, .5, -40, '#7d9a68') + S.leaf(92, 150, .42, -80, '#93ab7a') +
      S.birdMark(132, 112, 1.5, '#2fa4e7') +
      '<path d="M120 81 V163 M79 122 H161" stroke="#e9dcc0" stroke-width="6"/>' +
      '<circle cx="120" cy="196" r="4" fill="#d9b25c"/>' +
      '<path d="M120 196 L88 222 M120 196 L152 222" stroke="#5e4029" stroke-width="2.5"/>' +
      '<rect x="70" y="220" width="100" height="46" rx="9" fill="#f6efe2" stroke="#6b4a2f" stroke-width="3"/>' +
      '<text x="120" y="244" text-anchor="middle" font-family="Georgia, serif" font-size="20" font-weight="700" fill="#4f6243">OPEN</text>' +
      '<text x="120" y="259" text-anchor="middle" font-size="10" fill="#6b4a2f">ようこそ</text>' +
      '<rect x="198" y="272" width="14" height="64" rx="7" fill="#d9b25c"/><circle cx="205" cy="286" r="3" fill="#8a6a00"/>' +
      '</svg>';
  }

  function frame() {
    return '<svg class="doorway-frame" viewBox="0 0 300 500" aria-hidden="true" focusable="false">' +
      '<path d="M22 504 V160 A128 128 0 0 1 278 160 V504" fill="none" stroke="#6b4a2f" stroke-width="18"/>' +
      '<path d="M8 504 V160 A142 142 0 0 1 292 160 V504" fill="none" stroke="#8a6440" stroke-width="8"/>' +
      S.leaf(40, 60, .7, -120, '#6f8a5c') + S.leaf(40, 60, .6, -160, '#93ab7a') + S.leaf(40, 60, .55, -70, '#7d9a68') +
      S.leaf(260, 60, .7, -60, '#6f8a5c') + S.leaf(260, 60, .6, -20, '#93ab7a') + S.leaf(260, 60, .55, -110, '#7d9a68') +
      '</svg>';
  }

  function light() {
    let leaves = '';
    const r = S.rng(42);
    for (let i = 0; i < 9; i++) {
      leaves += `<g class="drift" style="animation-delay:${(-r() * 3).toFixed(2)}s">${S.leaf(r() * 200 + 10, r() * 380 + 40, .3 + r() * .2, r() * 360, S.pick(r, S.GREENS))}</g>`;
    }
    return `<svg viewBox="0 0 240 460" preserveAspectRatio="none" aria-hidden="true" focusable="false">${leaves}</svg>`;
  }

  function sidePlant(kind) {
    const pot = '<path d="M20 170 h100 l-12 50 h-76 Z" fill="#c4704f"/><rect x="14" y="162" width="112" height="14" rx="5" fill="#a85c3f"/>';
    const art = kind === 'l'
      ? S.monstera(70, 168, .5, -30, '#5f7a4f') + S.monstera(70, 168, .45, 25, '#6f8a5c') + S.monstera(70, 168, .4, -2, '#55704a')
      : S.fern(70, 168, .7, -30) + S.fern(70, 168, .75, 0, '#7d9a68') + S.fern(70, 168, .7, 30, '#5f7a4f');
    return `<svg viewBox="0 0 140 220" aria-hidden="true" focusable="false">${art}${pot}</svg>`;
  }

  LL.svg.doorScene = function (showSkip) {
    return '<p class="door-sign">Lintu <span>&amp;</span> Lehti</p>' +
      '<div class="door-stage">' +
        `<div class="door-plant" aria-hidden="true">${sidePlant('l')}</div>` +
        '<div class="doorway">' +
          `<div class="door-light" aria-hidden="true">${light()}</div>` +
          `<button type="button" class="door" aria-label="扉を押して入店する">${doorLeaf()}</button>` +
          frame() +
        '</div>' +
        `<div class="door-plant" aria-hidden="true">${sidePlant('r')}</div>` +
      '</div>' +
      '<p class="door-hint" aria-hidden="true">扉を押して入店</p>' +
      '<p class="door-note">このサイトは架空のカフェです</p>' +
      (showSkip ? '<button type="button" class="door-skip">スキップ</button>' : '');
  };
})(window.LL = window.LL || {});
