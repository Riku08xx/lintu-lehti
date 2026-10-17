/* 葉っぱなど、何度も使う小さな図形の部品 */
(function (LL) {
  'use strict';

  const GREENS = ['#6f8a5c', '#7d9a68', '#5f7a4f', '#93ab7a', '#4f6a45', '#a3b98a'];

  // 毎回同じ並びになる乱数（読み込むたびに絵が変わらないように）
  function rng(seed) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return () => { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; };
  }

  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

  // 細長い葉（付け根が原点、+x 方向に伸びる。長さ84）
  function leaf(x, y, s, rot, color, vein = true) {
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)}) scale(${s.toFixed(2)})">` +
      `<path d="M0 0 C 18 -26 62 -26 84 0 C 62 26 18 26 0 0 Z" fill="${color}"/>` +
      (vein ? '<path d="M6 0 L76 0" stroke="rgba(255,255,255,.28)" stroke-width="2.5"/>' : '') +
      '</g>';
  }

  // ハート形の葉（付け根が原点、上向き）
  function heart(x, y, s, rot, color) {
    return `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)}) scale(${s.toFixed(2)})" ` +
      `d="M0 0 C -16 -8 -22 -28 -8 -34 C -3 -36 0 -32 0 -29 C 0 -32 3 -36 8 -34 C 22 -28 16 -8 0 0 Z" fill="${color}"/>`;
  }

  // 切れこみのあるモンステラの葉（付け根が原点、上向き）
  function monstera(x, y, s, rot, color = '#5f7a4f', rib = '#46603b') {
    const n = 7;
    let lobes = '';
    for (let i = 0; i < n; i++) {
      const y0 = -16 - i * 19;
      const w = 76 * Math.sin(Math.PI * (i + 0.7) / (n + 0.6));
      [-1, 1].forEach((d) => {
        lobes += `<path d="M0 ${y0} Q ${(d * w * 0.55).toFixed(1)} ${y0 + 8} ${(d * w).toFixed(1)} ${y0 - 10} Q ${(d * w * 0.6).toFixed(1)} ${y0 - 21} 0 ${y0 - 16} Z" fill="${color}"/>`;
      });
    }
    const top = -16 - n * 19;
    lobes += `<path d="M0 ${top + 6} Q 15 ${top - 8} 0 ${top - 26} Q -15 ${top - 8} 0 ${top + 6} Z" fill="${color}"/>`;
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${lobes}` +
      `<path d="M0 0 L0 ${top - 18}" stroke="${rib}" stroke-width="3.5" stroke-linecap="round"/></g>`;
  }

  // シダの葉（付け根が原点、上向き）
  function fern(x, y, s, rot, color = '#6f8a5c') {
    const L = 160;
    let p = `<path d="M0 0 Q 8 ${-L / 2} 0 ${-L}" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    for (let i = 1; i < 14; i++) {
      const t = i / 14;
      const yy = (-t * L).toFixed(1);
      const len = 34 * (1 - t) + 8;
      [-1, 1].forEach((d) => {
        p += `<path d="M${(4 * Math.sin(t * 3)).toFixed(1)} ${yy} q ${(d * len * 0.5).toFixed(1)} ${(-len * 0.15 - 4).toFixed(1)} ${(d * len).toFixed(1)} ${(-len * 0.4).toFixed(1)}" stroke="${color}" stroke-width="${(6 * (1 - t) + 3).toFixed(1)}" stroke-linecap="round" fill="none"/>`;
      });
    }
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${p}</g>`;
  }

  // 葉っぱをばらまく（bias: 'left' なら右側ほど密、'right' なら左側ほど密）
  function field(w, h, count, seed, minS, maxS, bias) {
    const r = rng(seed);
    let out = '';
    for (let i = 0; i < count; i++) {
      let fx = r();
      if (bias === 'left') fx = Math.sqrt(fx);
      if (bias === 'right') fx = 1 - Math.sqrt(fx);
      out += leaf(fx * w - 40, r() * h, minS + r() * (maxS - minS), r() * 360, pick(r, GREENS));
    }
    return out;
  }

  // 葉っぱのかたまり（木のこずえ）
  function blob(cx, cy, rad, seed, n = 26) {
    const r = rng(seed);
    let s = `<circle cx="${cx}" cy="${cy}" r="${(rad * 0.78).toFixed(0)}" fill="#6a855a"/>`;
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * rad;
      s += leaf(cx + Math.cos(a) * d - 18, cy + Math.sin(a) * d, 0.4 + r() * 0.35, r() * 360, pick(r, GREENS));
    }
    return s;
  }

  // 小さな鳥のシルエット（中心が原点、幅およそ24）
  function birdMark(x, y, s, color) {
    return `<path transform="translate(${x} ${y}) scale(${s})" d="M-11 3 C -10 -4 -3 -7 3 -6 C 4 -10 9 -10 10 -6 L 14 -5 L 10 -3 C 10 4 4 8 -3 8 C -6 8 -9 7 -12 9 Z" fill="${color}"/>`;
  }

  LL.shape = { GREENS, rng, pick, leaf, heart, monstera, fern, field, blob, birdMark };
})(window.LL = window.LL || {});
