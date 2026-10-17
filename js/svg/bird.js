/* インコ（1つの設計図から色だけ変えて2羽をつくる。右向き） */
(function (LL) {
  'use strict';
  LL.svg = LL.svg || {};

  const COLORS = {
    taivas:  { body: '#2fa4e7', belly: '#6cc6f2', deep: '#1b6fa6', face: '#f7fbfd', wing: '#eaf4fa', bar: '#2c3a46', cheek: '#5b4fcf', cere: '#3f6fd8', spots: true },
    aurinko: { body: '#f7d633', belly: '#fbe77a', deep: '#d9ae14', face: '#fff7cc', wing: '#fff3b3', bar: '#c99a12', cheek: '#ece6f5', cere: '#e8bd90', spots: false }
  };

  LL.svg.bird = function (name) {
    const c = COLORS[name];
    const spots = c.spots
      ? `<g fill="${c.bar}"><circle cx="74" cy="57" r="1.9"/><circle cx="80" cy="58.5" r="1.9"/><circle cx="85.5" cy="56.5" r="1.7"/></g>`
      : '';
    return `<svg class="bird-svg" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
  <g class="b-tail"><path d="M46 84 L12 116 L21 119 L56 90 Z" fill="${c.deep}"/><path d="M50 87 L22 115 L29 117 L56 93 Z" fill="${c.body}"/></g>
  <g class="b-feet" stroke="#c99191" stroke-width="3" stroke-linecap="round" fill="none"><path d="M58 96 l-3 10 M58 96 l4 9"/><path d="M68 94 l-2 11 M68 94 l5 9"/></g>
  <g class="b-body"><ellipse cx="62" cy="70" rx="22" ry="30" transform="rotate(28 62 70)" fill="${c.body}"/><ellipse cx="70" cy="74" rx="13" ry="22" transform="rotate(28 70 74)" fill="${c.belly}"/></g>
  <g class="b-wing"><path d="M72 50 C 56 50 40 68 33 97 C 50 92 64 80 72 64 Z" fill="${c.wing}"/><path d="M66 55 q-8 2 -12 8 M60 63 q-8 2 -12 9 M55 72 q-7 2 -11 9 M49 81 q-6 2 -9 8" stroke="${c.bar}" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <g class="b-head">
    <circle cx="76" cy="40" r="18" fill="${c.face}"/>
    <path d="M62 33 q4 -5 9 -7 M60 40 q5 -6 11 -8 M61 47 q5 -5 10 -6" stroke="${c.bar}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <ellipse cx="83" cy="51" rx="3.6" ry="4.6" fill="${c.cheek}"/>
    ${spots}
    <path d="M90 42 C 98 42 99 53 91 57 C 90 52 88 48 85 47 Z" fill="#f2c46d"/>
    <ellipse cx="90" cy="40" rx="4.2" ry="2.8" fill="${c.cere}"/>
    <g class="b-eye"><circle cx="81" cy="36" r="3.5" fill="#1f1a16"/><circle cx="82.2" cy="34.8" r="1.1" fill="#fff"/></g>
  </g>
</svg>`;
  };
})(window.LL = window.LL || {});
