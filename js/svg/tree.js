/* 目次の木（PC用の横長／スマホ用の縦長）と、ページ見出しの止まり木 */
(function (LL) {
  'use strict';
  LL.svg = LL.svg || {};
  const S = LL.shape;
  const BARK = '#7a5536';
  const BARK_DARK = '#5e4029';

  function branch(d, w) {
    return `<path d="${d}" stroke="${BARK}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
  }

  function planter(x, y, w, h) {
    let planks = '';
    for (let yy = y + 26; yy < y + h; yy += 22) planks += `<rect x="${x}" y="${yy}" width="${w}" height="3" fill="#a77b4f"/>`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#c39566"/>${planks}` +
      `<rect x="${x - 12}" y="${y - 10}" width="${w + 24}" height="24" rx="8" fill="${BARK}"/>` +
      `<rect x="${x + 16}" y="${y + 30}" width="${w - 32}" height="${h - 44}" rx="6" fill="none" stroke="#a77b4f" stroke-width="3"/>`;
  }

  function birdhouse(x, y) {
    return `<g transform="translate(${x} ${y})">` +
      '<path d="M-26 -2 L0 -30 L26 -2 Z" fill="#c4553f"/>' +
      '<rect x="-20" y="-4" width="40" height="40" rx="3" fill="#f1e2c4"/>' +
      '<circle cx="0" cy="12" r="7" fill="#3a2e24"/>' +
      '<rect x="-2" y="22" width="4" height="9" fill="#8a6440"/></g>';
  }

  LL.svg.treeWide = function () {
    const trunk = `<path d="M460 730 C 468 630 472 530 474 440 C 476 360 484 300 492 230 L 512 230 C 520 300 528 360 530 440 C 532 530 536 630 544 730 Z" fill="${BARK}"/>` +
      `<path d="M488 700 C 492 600 492 500 494 420 M514 660 C 514 580 512 520 512 470" stroke="${BARK_DARK}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/>`;
    const branches =
      branch('M520 470 C 620 450 720 420 830 400', 28) +
      branch('M480 450 C 380 430 280 400 170 380', 28) +
      branch('M502 300 C 506 220 496 150 500 72', 20) +
      branch('M510 330 C 600 290 700 240 780 200', 18) +
      branch('M478 560 C 400 560 320 580 230 590', 20) +
      branch('M528 580 C 610 590 700 600 790 610', 20) +
      branch('M640 445 C 660 420 680 400 700 380', 8) +
      branch('M330 410 C 310 385 300 370 280 350', 8);
    const foliage =
      S.blob(500, 120, 105, 11, 40) + S.blob(390, 190, 78, 12, 28) + S.blob(615, 180, 82, 13, 28) +
      S.blob(500, 70, 58, 14, 20) + S.blob(850, 372, 56, 15, 22) + S.blob(150, 352, 56, 16, 22) +
      S.blob(792, 176, 50, 17, 18) + S.blob(218, 566, 44, 18, 16) + S.blob(808, 586, 44, 19, 16) +
      S.blob(700, 370, 30, 20, 10) + S.blob(278, 340, 30, 21, 10);
    const hanging =
      S.leaf(600, 455, .32, 100, '#7d9a68') + S.leaf(420, 438, .32, 80, '#6f8a5c') +
      S.leaf(350, 590, .3, 95, '#93ab7a') + S.leaf(660, 600, .3, 85, '#7d9a68');
    return `<svg viewBox="0 0 1000 800" aria-hidden="true" focusable="false">` +
      `<ellipse cx="500" cy="792" rx="300" ry="14" fill="rgba(58,46,36,.18)"/>` +
      trunk + branches + foliage + hanging + birdhouse(500, 560) + planter(380, 712, 240, 88) + '</svg>';
  };

  LL.svg.treeTall = function () {
    const trunk = `<path d="M182 830 C 186 650 188 450 192 250 C 194 170 196 120 198 70 L 208 70 C 210 120 212 170 214 250 C 218 450 220 650 224 830 Z" fill="${BARK}"/>`;
    const branches =
      branch('M205 160 Q 260 150 312 126', 12) +
      branch('M195 270 Q 140 262 88 234', 12) +
      branch('M207 390 Q 262 375 312 342', 12) +
      branch('M193 490 Q 140 480 88 450', 12) +
      branch('M209 600 Q 262 590 312 558', 12) +
      branch('M191 700 Q 140 695 88 666', 12);
    const foliage =
      S.blob(203, 80, 76, 31, 32) + S.blob(140, 120, 46, 32, 16) + S.blob(270, 110, 46, 33, 16) +
      S.blob(322, 112, 30, 34, 10) + S.blob(80, 220, 30, 35, 10) + S.blob(322, 328, 30, 36, 10) +
      S.blob(80, 436, 30, 37, 10) + S.blob(322, 544, 30, 38, 10) + S.blob(80, 652, 30, 39, 10);
    return `<svg viewBox="0 0 400 900" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">` +
      trunk + branches + foliage + birdhouse(203, 790) + planter(130, 832, 146, 68) + '</svg>';
  };

  // ページ見出しの上にのせる止まり木。data-perch の位置にインコがとまる
  LL.svg.perchBranch = function () {
    return `<div class="perch-branch" aria-hidden="true">` +
      `<svg viewBox="0 0 210 96" focusable="false">` +
      `<path d="M120 44 q 10 -18 28 -26" stroke="${BARK}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      `<path d="M226 32 Q 120 44 8 66" stroke="${BARK}" stroke-width="10" fill="none" stroke-linecap="round"/>` +
      S.leaf(146, 18, .36, -30, '#7d9a68') + S.leaf(146, 18, .3, -80, '#93ab7a') +
      S.leaf(14, 64, .34, 160, '#6f8a5c') + S.leaf(14, 64, .28, 120, '#93ab7a') +
      S.leaf(100, 47, .26, 100, '#5f7a4f') +
      `</svg>` +
      `<span class="perch" data-perch="taivas" data-face="r" style="--x:37%;--y:49%"></span>` +
      `<span class="perch" data-perch="aurinko" data-face="l" style="--x:73%;--y:37%"></span>` +
      `</div>`;
  };
})(window.LL = window.LL || {});
