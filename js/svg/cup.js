/* カップ・グラス・ラテアート、メニューの小さなアイコン */
(function (LL) {
  'use strict';
  LL.svg = LL.svg || {};
  const S = LL.shape;

  // 上から見た小鳥のラテアート（カップの中心 150,150）
  const BIRD_ART = 'M92 176 C 96 136 126 116 160 122 C 168 100 196 94 210 112 C 214 117 216 121 217 125 L 234 128 L 216 136 C 214 170 186 198 146 198 C 124 198 104 194 88 210 C 88 197 89 186 92 176 Z';
  const WING_ART = 'M116 174 C 130 146 166 142 184 162 C 166 158 146 164 128 184';

  function saucerBirds() {
    let s = '';
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.3;
      const x = 150 + Math.cos(a) * 127;
      const y = 150 + Math.sin(a) * 127;
      s += S.birdMark(x.toFixed(1), y.toFixed(1), 0.8, i % 2 ? '#f7d633' : '#2fa4e7');
    }
    return s;
  }

  LL.svg.mug = function (item) {
    const c = item.colors;
    let art;
    if (item.kind === 'milk') {
      art = `<path class="art-line" pathLength="1" d="${BIRD_ART}" fill="none" stroke="${c.art}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` +
        `<path class="art-line art-line-2" pathLength="1" d="${WING_ART}" fill="none" stroke="${c.art}" stroke-width="6" stroke-linecap="round"/>` +
        `<circle class="art-dot" cx="200" cy="117" r="4.5" fill="${c.art}"/>`;
    } else {
      art = `<path class="art-line" pathLength="1" d="M150 150 m -58 0 a 58 58 0 1 0 116 0 a 58 58 0 1 0 -116 0" fill="none" stroke="${c.art}" stroke-width="9" opacity=".55"/>` +
        `<path class="art-line art-line-2" pathLength="1" d="M150 150 m -30 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0" fill="none" stroke="${c.art}" stroke-width="7" opacity=".45"/>` +
        '<ellipse class="art-dot" cx="128" cy="124" rx="16" ry="7" fill="#fff" opacity=".25" transform="rotate(-30 128 124)"/>';
    }
    return '<svg viewBox="0 0 300 300" aria-hidden="true" focusable="false">' +
      '<circle cx="150" cy="156" r="142" fill="rgba(58,46,36,.12)"/>' +
      '<circle cx="150" cy="150" r="142" fill="#f4ede0" stroke="#e2d5bf" stroke-width="2"/>' +
      (item.kind === 'coffee' ? saucerBirds() : '<circle cx="150" cy="150" r="126" fill="none" stroke="#e2d5bf" stroke-width="2"/>') +
      '<rect x="244" y="130" width="50" height="40" rx="18" fill="#fbf8f2" stroke="#e2d5bf" stroke-width="3"/>' +
      '<circle cx="150" cy="150" r="110" fill="#fbf8f2" stroke="#e2d5bf" stroke-width="3"/>' +
      '<circle cx="150" cy="150" r="95" fill="#ece2d0"/>' +
      `<circle class="liquid" cx="150" cy="150" r="95" fill="${c.liquid}"/>` +
      `<circle class="ripple" cx="150" cy="150" r="26" fill="none" stroke="${c.art}" stroke-width="3"/>` +
      art +
      `<rect class="pour" x="141" y="-60" width="18" height="212" rx="9" fill="${c.stream}"/>` +
      '</svg>';
  };

  LL.svg.glass = function (item) {
    const c = item.colors;
    const r = S.rng(5);
    let bubbles = '';
    for (let i = 0; i < 16; i++) {
      bubbles += `<circle class="bubble" style="--d:${(r() * 1.8).toFixed(2)}s" cx="${(70 + r() * 100).toFixed(0)}" cy="${(250 + r() * 40).toFixed(0)}" r="${(2 + r() * 4).toFixed(1)}" fill="#fff"/>`;
    }
    const mint = '<g class="mint"><g transform="translate(150 56) rotate(28)">' +
      '<path d="M0 0 C 14 -16 16 -46 2 -72 C -12 -46 -14 -16 0 0 Z" fill="#5aa86a"/>' +
      '<path d="M1 -4 L2 -66" stroke="#3f8a50" stroke-width="2"/>' +
      '<path d="M2 -14 l8 -8 M2 -26 l9 -9 M2 -38 l8 -9 M2 -50 l6 -7 M1 -14 l-8 -8 M1 -26 l-9 -9 M1 -38 l-8 -9 M1 -50 l-6 -7" stroke="#3f8a50" stroke-width="1.5"/>' +
      '</g></g>';
    return '<svg viewBox="0 0 240 320" aria-hidden="true" focusable="false">' +
      '<defs><clipPath id="glass-clip"><path d="M46 44 L194 44 L181 296 Q180 304 171 304 L69 304 Q60 304 59 296 Z"/></clipPath></defs>' +
      '<ellipse cx="120" cy="310" rx="74" ry="8" fill="rgba(58,46,36,.15)"/>' +
      `<rect class="pour" x="112" y="-70" width="16" height="250" rx="8" fill="${c.stream}"/>` +
      '<g clip-path="url(#glass-clip)">' +
        '<rect width="240" height="320" fill="#f2f9fb"/>' +
        `<rect class="soda-liquid" x="0" y="84" width="240" height="236" fill="${c.liquid}"/>` +
        '<g class="ice"><rect x="72" y="104" width="44" height="40" rx="8" fill="#fff" opacity=".5" transform="rotate(-12 94 124)"/><rect x="122" y="118" width="40" height="38" rx="8" fill="#fff" opacity=".45" transform="rotate(14 142 137)"/>' +
        '<circle cx="96" cy="282" r="11" fill="#b8243f"/><circle cx="124" cy="288" r="10" fill="#c93a55"/><circle cx="150" cy="280" r="9" fill="#a8203a"/></g>' +
        bubbles +
      '</g>' +
      '<path d="M46 44 L59 296 Q60 304 69 304 L171 304 Q180 304 181 296 L194 44" fill="none" stroke="#9fc3cf" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M62 60 L72 280" stroke="#fff" stroke-width="5" opacity=".7" stroke-linecap="round"/>' +
      '<g transform="rotate(14 150 120)"><rect x="140" y="0" width="12" height="230" rx="6" fill="#fff"/>' +
      '<path d="M140 10 h12 M140 34 h12 M140 58 h12 M140 82 h12" stroke="#2fa4e7" stroke-width="8"/><path d="M140 22 h12 M140 46 h12 M140 70 h12" stroke="#f7d633" stroke-width="8"/></g>' +
      mint +
      '</svg>';
  };

  // メニュー一覧の小さなアイコン（64×64）
  LL.svg.menuIcon = function (item) {
    const wrap = (inner) => `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">${inner}</svg>`;
    if (item.kind === 'soda') {
      return wrap(`<path d="M18 10 h28 l-3 46 h-22 Z" fill="${item.colors.liquid}" stroke="#9fc3cf" stroke-width="2.5"/><path d="M17 10 h30" stroke="#9fc3cf" stroke-width="2.5"/>` +
        '<circle cx="28" cy="40" r="2" fill="#fff"/><circle cx="35" cy="30" r="1.6" fill="#fff"/><circle cx="31" cy="22" r="1.4" fill="#fff"/>' +
        '<path d="M38 12 C 44 6 44 -2 40 -4 C 36 0 34 6 38 12 Z" fill="#5aa86a" transform="translate(0 4)"/>');
    }
    if (item.kind) {
      const art = item.kind === 'milk'
        ? S.birdMark(32, 32, 0.95, item.colors.art)
        : `<circle cx="32" cy="32" r="9" fill="none" stroke="${item.colors.art}" stroke-width="3" opacity=".6"/>`;
      return wrap('<circle cx="32" cy="32" r="30" fill="#efe6d6"/>' +
        '<rect x="50" y="27" width="13" height="10" rx="5" fill="#fbf8f2" stroke="#e2d5bf" stroke-width="1.5"/>' +
        '<circle cx="32" cy="32" r="22" fill="#fbf8f2" stroke="#e2d5bf" stroke-width="1.5"/>' +
        `<circle cx="32" cy="32" r="18" fill="${item.colors.liquid}"/>` + art);
    }
    const icons = {
      tart: '<circle cx="32" cy="34" r="27" fill="#efe6d6"/><circle cx="32" cy="32" r="22" fill="#c98f4f" stroke="#a96f35" stroke-width="4" stroke-dasharray="4 3"/><circle cx="32" cy="32" r="15" fill="#8a5a2c"/>' +
        '<ellipse cx="27" cy="29" rx="5" ry="6.5" fill="#f3e2c0"/><ellipse cx="37" cy="30" rx="5" ry="6.5" fill="#e8cfa2"/><ellipse cx="32" cy="38" rx="5" ry="6.5" fill="#f6ead2"/>',
      financier: '<circle cx="32" cy="34" r="27" fill="#efe6d6"/><path d="M14 48 C 20 30 34 16 52 12 C 50 30 38 44 14 48 Z" fill="#d9a04a"/>' +
        '<path d="M16 46 L48 15 M24 40 l-2 -7 M30 34 l-2 -7 M36 28 l-2 -7 M28 39 l7 1 M34 33 l7 1 M40 27 l7 1" stroke="#b37a2a" stroke-width="2" stroke-linecap="round"/>',
      cinnamon: '<circle cx="32" cy="34" r="27" fill="#efe6d6"/><circle cx="32" cy="32" r="21" fill="#c98a4b"/>' +
        '<path d="M32 32 m0 -3 a3 3 0 1 1 -3 3 a6 6 0 1 1 6 6 a10 10 0 1 1 -10 -10 a14 14 0 1 1 14 14" fill="none" stroke="#7a4a22" stroke-width="2.5"/>' +
        S.birdMark(40, 22, .45, '#7a4a22'),
      cookie: '<circle cx="32" cy="34" r="27" fill="#efe6d6"/>' + S.birdMark(22, 26, 1.2, '#2fa4e7') + S.birdMark(40, 40, 1.2, '#f7d633') +
        '<circle cx="28" cy="20" r="1.4" fill="#3a2e24"/><circle cx="46" cy="34" r="1.4" fill="#3a2e24"/>',
      salmon: '<rect x="8" y="22" width="48" height="26" rx="6" fill="#7a4f2e"/><path d="M10 24 C 20 18 30 30 40 22 C 46 18 52 22 54 26 L54 34 C 44 30 36 38 26 32 C 18 28 12 32 10 34 Z" fill="#f08a6a"/>' +
        '<path d="M16 22 l4 -6 M20 20 l1 -7 M40 20 l3 -6 M44 19 l5 -4" stroke="#5aa86a" stroke-width="2" stroke-linecap="round"/><circle cx="48" cy="40" r="4" fill="#f7e27a"/>',
      soup: '<ellipse cx="32" cy="38" rx="27" ry="20" fill="#fbf8f2" stroke="#e2d5bf" stroke-width="2"/><ellipse cx="32" cy="36" rx="21" ry="14" fill="#e9d6b2"/>' +
        '<path d="M24 34 a5 4 0 0 1 10 0 Z M34 39 a4 3 0 0 1 8 0 Z" fill="#a8774a"/><path d="M5 34 c -6 -4 -2 -12 4 -8" stroke="#2fa4e7" stroke-width="3" fill="none"/>' + S.birdMark(4, 27, .35, '#2fa4e7'),
      egg: '<path d="M8 50 L32 14 L56 50 Z" fill="#f6ecd8" stroke="#e2cfa8" stroke-width="2"/><path d="M14 44 L32 18 L50 44 Z" fill="#f7d65a"/><path d="M8 50 L56 50" stroke="#e2cfa8" stroke-width="4"/>',
      millet: '<path d="M18 58 C 24 40 32 24 46 8" stroke="#a8874a" stroke-width="2.5" fill="none"/>' +
        Array.from({ length: 9 }, (_, i) => `<ellipse cx="${22 + i * 2.8}" cy="${50 - i * 4.8}" rx="5.5" ry="3.2" fill="${i % 2 ? '#f0cf5a' : '#e4bd3e'}" transform="rotate(-55 ${22 + i * 2.8} ${50 - i * 4.8})"/>`).join('')
    };
    return wrap(icons[item.id] || '');
  };
})(window.LL = window.LL || {});
