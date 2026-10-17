/* ドリンク調合演出（ブラウザ標準のダイアログ部品を使う） */
(function (LL) {
  'use strict';

  let dialog;
  let trigger = null;
  let timers = [];

  const STEPS = {
    milk: ['ミルクを注いでいます…', '小鳥のラテアートを描いています…', 'できあがり！'],
    coffee: ['ていねいにドリップしています…', '香りをとじこめて…', 'できあがり！'],
    soda: ['グラスに注いでいます…', 'シュワシュワ…羽根のミントをのせて', 'できあがり！']
  };

  function clear() { timers.forEach(clearTimeout); timers = []; }

  function init() {
    dialog = document.getElementById('latte');
    // 外側（暗い部分）を押したら閉じる
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      clear();
      if (trigger && document.contains(trigger)) trigger.focus();
      trigger = null;
    });
  }

  function brew(steps) {
    clear();
    const inner = dialog.querySelector('.latte-inner');
    const stage = dialog.querySelector('.latte-stage');
    const step = dialog.querySelector('.latte-step');
    inner.classList.remove('is-done');
    stage.classList.remove('is-brewing');
    void stage.offsetWidth; // アニメーションを最初からやり直す
    stage.classList.add('is-brewing');
    step.textContent = steps[0];
    const t = LL.reduced() ? [0, 0] : [1550, 3200];
    timers.push(setTimeout(() => { step.textContent = steps[1]; }, t[0]));
    timers.push(setTimeout(() => { step.textContent = steps[2]; inner.classList.add('is-done'); }, t[1]));
  }

  function open(item, btn) {
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const { esc, yen } = LL.util;
    trigger = btn;
    const isSoda = item.kind === 'soda';
    const steps = STEPS[item.kind];
    dialog.innerHTML =
      '<div class="latte-inner">' +
        '<button type="button" class="latte-close" aria-label="閉じる">×</button>' +
        '<p class="latte-kicker">Barista Taivas &amp; Aurinko</p>' +
        `<h2 id="latte-title">${esc(item.name)}</h2>` +
        `<div class="latte-stage${isSoda ? ' is-glass' : ''}">${isSoda ? LL.svg.glass(item) : LL.svg.mug(item)}</div>` +
        '<p class="latte-step" role="status"></p>' +
        '<div class="latte-info">' +
          `<p class="latte-desc">${esc(item.desc)}</p>` +
          `<p class="latte-price">${yen(item.price)}<span class="sr-only">（税込）</span></p>` +
          '<button type="button" class="btn btn-ghost latte-again">もう一度つくる</button>' +
        '</div>' +
      '</div>';
    dialog.querySelector('.latte-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('.latte-again').addEventListener('click', () => brew(steps));
    dialog.showModal();
    brew(steps);
  }

  LL.latte = { init, open };
})(window.LL = window.LL || {});
