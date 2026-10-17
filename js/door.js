/* 入店演出：扉 → インコ飛び出し → 木の目次 */
(function (LL) {
  'use strict';

  const KEY = 'll-door-seen';

  // 「見たかどうか」はタブ内だけの一時保存。保存できない環境でも止まらない
  function seen() {
    try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }
  function markSeen() {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* 毎回扉から始まるだけ */ }
  }

  function setPageInert(on) {
    ['.site-header', '#main', '.site-footer', '#skip-link'].forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) el.inert = on;
    });
  }

  function run() {
    const overlay = document.getElementById('door');
    overlay.className = 'door-overlay';
    overlay.innerHTML = LL.svg.doorScene(seen());
    overlay.hidden = false;
    document.body.classList.add('pre-entry');
    LL.birds.hide();
    setPageInert(true);

    const door = overlay.querySelector('.door');
    const skip = overlay.querySelector('.door-skip');
    let started = false;
    door.focus({ preventScroll: true });

    door.addEventListener('click', () => {
      if (started) return;
      started = true;
      open();
    });
    if (skip) {
      skip.addEventListener('click', () => {
        if (started) return;
        started = true;
        finish(true);
      });
    }

    function open() {
      const reduced = LL.reduced();
      overlay.classList.add('is-opening');
      setTimeout(() => {
        const rect = door.getBoundingClientRect();
        overlay.classList.add('is-leaving');
        setPageInert(false);
        LL.birds.emerge({ x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.6 });
      }, reduced ? 60 : 1000);
      setTimeout(() => finish(false), reduced ? 450 : 1800);
    }

    function finish(skipped) {
      overlay.hidden = true;
      overlay.innerHTML = '';
      overlay.className = 'door-overlay';
      document.body.classList.remove('pre-entry');
      setPageInert(false);
      if (skipped) LL.birds.showNow();
      const tree = document.querySelector('#view .tree');
      if (tree && !LL.reduced()) {
        tree.classList.add('is-dropping');
        setTimeout(() => tree.classList.remove('is-dropping'), 2200);
      }
      markSeen();
      const h = document.querySelector('#view h1');
      if (h) h.focus({ preventScroll: true });
    }
  }

  LL.door = { run };
})(window.LL = window.LL || {});
