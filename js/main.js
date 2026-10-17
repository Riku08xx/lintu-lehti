/* 起動処理 */
(function (LL) {
  'use strict';

  // 端末の「視差効果を減らす」設定（JS側でも確認して演出を控えめにする）
  LL.reduced = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function boot() {
    LL.scene.init();
    LL.birds.init(document.getElementById('birds'));
    LL.latte.init();
    const route = LL.router.start();

    // 「本文へスキップ」は # を使わず、ボタンで見出しへ移動する
    document.getElementById('skip-link').addEventListener('click', () => LL.router.focusHeading());

    // 扉演出はトップを最初に開いたときだけ
    if (route === '/') LL.door.run();
    else LL.birds.showNow();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window.LL = window.LL || {});
