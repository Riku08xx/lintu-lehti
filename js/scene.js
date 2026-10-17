/* 奥行きの層と、ページ切り替えの飛行演出 */
(function (LL) {
  'use strict';

  // ページごとに「店内のどの一角か」を、背景の横位置と壁の色で表す
  const PAN = { '/': 0, '/menu': -7, '/birds': 2, '/story': 7, '/access': 5, '/news': -4, '/contact': -6 };
  const WALL = {
    '/': '#efe4d0', '/menu': '#f1e2cc', '/birds': '#e6ecdf', '/story': '#ece6d3',
    '/access': '#e5e9d6', '/news': '#f2e8d6', '/contact': '#efe2d6'
  };
  const FLY_MS = 1250;
  const SWAP_MS = 600;
  let sceneEl;

  function init() {
    sceneEl = document.querySelector('.scene');
    document.getElementById('layer-back').innerHTML = `<div class="layer-inner">${LL.svg.sceneBack()}</div>`;
    document.getElementById('layer-mid').innerHTML = `<div class="layer-inner">${LL.svg.sceneMid()}</div>`;
    document.getElementById('scene-front').innerHTML = `<div class="front-inner">${LL.svg.corners()}</div>`;
    document.getElementById('leaf-cover').innerHTML = LL.svg.leafCover();
  }

  function setRoute(route) {
    sceneEl.style.setProperty('--pan', `${PAN[route] || 0}vw`);
    document.documentElement.style.setProperty('--wall', WALL[route] || WALL['/']);
  }

  // dir: 飛んでいく方向 {x, y}／back: 手前へ戻る向き／swap: 中身を差し替える処理
  // アニメーションの「終わった」合図は待たず、時間で必ず完了させる（止まらないための保険）
  function transition(dir, back, swap) {
    return new Promise((resolve) => {
      const body = document.body;
      const reduced = LL.reduced();
      const swapAt = reduced ? 220 : SWAP_MS;
      const endAt = reduced ? 500 : FLY_MS;

      body.style.setProperty('--dx', dir.x);
      body.style.setProperty('--dy', dir.y);
      body.classList.remove('is-flying', 'is-fading', 'is-back', 'is-leftward');
      void body.offsetWidth;
      if (reduced) {
        body.classList.add('is-fading');
      } else {
        body.classList.add('is-flying');
        if (back) body.classList.add('is-back');
        if ((dir.x < 0) !== back) body.classList.add('is-leftward');
      }

      setTimeout(() => {
        try { swap(); } catch (e) { console.error(e); }
      }, swapAt);
      setTimeout(() => {
        body.classList.remove('is-flying', 'is-fading', 'is-back', 'is-leftward');
        resolve();
      }, endAt);
    });
  }

  LL.scene = { init, setRoute, transition };
})(window.LL = window.LL || {});
