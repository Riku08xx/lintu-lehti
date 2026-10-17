/* インコの状態管理
   とまっている(perched) → 押す → 飛び立つ(away) → 約3秒 → 戻ってくる(returning) → とまっている
   ページ移動が来たら、どの状態からでも 案内中(guiding) に切り替える */
(function (LL) {
  'use strict';

  const NAMES = ['taivas', 'aurinko'];
  const LABEL = { taivas: 'Taivas', aurinko: 'Aurinko' };
  const CHIRP = {
    taivas: ['ピィッ！', 'イラッシャイ！', 'キョウモ イイ テンキ！'],
    aurinko: ['…オヤツ？', 'ピ…', 'ねむい…']
  };
  const birds = {};
  let layer;

  function debounce(fn, ms) {
    let t;
    return () => { clearTimeout(t); t = setTimeout(fn, ms); };
  }

  function later(b, fn, ms) { b.timers.push(setTimeout(fn, ms)); }
  function clearTimers(b) { b.timers.forEach(clearTimeout); b.timers = []; }

  function face(b, dir) { b.el.dataset.face = dir; }

  // 止まり木の位置（インコ層の左上を 0,0 とした座標）
  function perchOf(name) {
    const p = document.querySelector(`#view [data-perch="${name}"]`);
    if (!p || !layer) return null;
    const r = p.getBoundingClientRect();
    const m = layer.getBoundingClientRect();
    if (r.width === 0 && r.height === 0 && r.left === 0 && r.top === 0) return null;
    return {
      x: r.left + r.width / 2 - m.left,
      y: r.top + r.height / 2 - m.top,
      face: p.dataset.face || (name === 'taivas' ? 'r' : 'l')
    };
  }

  // 足元が (x, y) に来るように動かす
  function moveTo(b, x, y, dur, ease) {
    const w = b.el.offsetWidth || 70;
    if (dur) {
      if (x < b.x - 4) face(b, 'l');
      else if (x > b.x + 4) face(b, 'r');
    }
    b.el.style.transition = dur ? `transform ${dur}ms ${ease || 'cubic-bezier(.45,0,.25,1)'}` : 'none';
    b.el.style.transform = `translate3d(${(x - w / 2).toFixed(1)}px, ${(y - w * 0.9).toFixed(1)}px, 0)`;
    if (!dur) void b.el.offsetWidth; // 次の動きと混ざらないように、ここで位置を確定
    b.x = x;
    b.y = y;
  }

  function perchNow(b) {
    const p = perchOf(b.name);
    if (!p) return;
    moveTo(b, p.x, p.y, 0);
    face(b, p.face);
  }

  function say(b, text, ms = 1700) {
    clearTimeout(b.sayTimer);
    b.say.textContent = text;
    b.say.classList.add('is-on');
    b.sayTimer = setTimeout(() => b.say.classList.remove('is-on'), ms);
  }

  function viewportTopInLayer() {
    return -layer.getBoundingClientRect().top;
  }

  function flyAway(b) {
    if (b.state !== 'perched') return;
    clearTimers(b);
    b.state = 'away';
    say(b, CHIRP[b.name][b.chirp++ % CHIRP[b.name].length], 1200);

    if (LL.reduced()) {
      b.el.classList.add('is-gone');
      later(b, () => { b.el.classList.remove('is-gone'); b.state = 'perched'; }, 2600);
      return;
    }

    const home = { x: b.x, y: b.y };
    const vw = window.innerWidth;
    const side = home.x < layer.clientWidth / 2 ? -1 : 1;
    later(b, () => {
      b.el.classList.add('is-flapping');
      moveTo(b, home.x + side * vw * 0.45, viewportTopInLayer() - 160, 1000, 'cubic-bezier(.5,0,.9,.6)');
    }, 280);

    // 約3秒後、反対側の空から戻ってくる
    later(b, () => {
      b.state = 'returning';
      const p = perchOf(b.name) || { x: home.x, y: home.y, face: 'r' };
      moveTo(b, p.x - side * vw * 0.45, viewportTopInLayer() - 160, 0);
      moveTo(b, p.x, p.y, 1300, 'cubic-bezier(.2,.7,.3,1)');
      later(b, () => {
        b.el.classList.remove('is-flapping');
        b.state = 'perched';
        face(b, p.face);
        if (b.name === 'taivas') say(b, 'タダイマ！', 1200);
      }, 1350);
    }, 3300);
  }

  /* ---- ページ移動の案内 ---- */

  // 選んだ枝の方向へ飛び立つ
  function guide(dir) {
    NAMES.forEach((n, i) => {
      const b = birds[n];
      clearTimers(b);
      b.el.classList.remove('is-gone', 'is-hidden', 'is-far');
      b.say.classList.remove('is-on');
      b.state = 'guiding';
      if (LL.reduced()) return;
      b.el.classList.add('is-flapping');
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      moveTo(b, b.x + dir.x * vw * 0.55 + (i ? 40 : -40), b.y + dir.y * vh * 0.55 - 50, 600, 'cubic-bezier(.5,0,.8,.5)');
    });
  }

  // 新しい場所へ、後ろから追いついて止まり木へ
  function enter(dir) {
    NAMES.forEach((n, i) => {
      const b = birds[n];
      const p = perchOf(n);
      if (!p) return;
      if (LL.reduced()) { perchNow(b); return; }
      moveTo(b, p.x - dir.x * window.innerWidth * 0.5 + (i ? 30 : -30), p.y - dir.y * window.innerHeight * 0.5 + 80, 0);
      later(b, () => moveTo(b, p.x, p.y, 600, 'cubic-bezier(.2,.6,.3,1)'), 20 + i * 60);
    });
  }

  // 演出の最後：必ず止まり木にとまった状態にそろえる
  function settle() {
    NAMES.forEach((n) => {
      const b = birds[n];
      clearTimers(b);
      b.el.classList.remove('is-flapping', 'is-gone');
      b.state = 'perched';
      const p = perchOf(n);
      if (p) {
        moveTo(b, p.x, p.y, LL.reduced() ? 0 : 200);
        face(b, p.face);
      }
    });
  }

  /* ---- 入店演出 ---- */

  function hide() {
    NAMES.forEach((n) => { birds[n].el.classList.add('is-hidden'); birds[n].state = 'hidden'; });
  }

  // 扉の位置 pt（画面座標）から飛び出して、木の枝へ
  function emerge(pt) {
    const m = layer.getBoundingClientRect();
    NAMES.forEach((n, i) => {
      const b = birds[n];
      clearTimers(b);
      b.el.classList.remove('is-hidden');
      const p = perchOf(n);
      if (!p) return;
      if (LL.reduced()) { perchNow(b); b.state = 'perched'; return; }
      b.state = 'guiding';
      b.el.classList.add('is-flapping', 'is-far');
      moveTo(b, pt.x - m.left + (i ? 16 : -16), pt.y - m.top, 0);
      later(b, () => {
        b.el.classList.remove('is-far');
        moveTo(b, p.x, p.y, 1150, 'cubic-bezier(.25,.7,.3,1)');
      }, 40 + i * 200);
      later(b, () => {
        b.el.classList.remove('is-flapping');
        b.state = 'perched';
        face(b, p.face);
        say(b, n === 'taivas' ? 'イラッシャイ！' : '…いらっしゃい', 1800);
      }, 1250 + i * 200);
    });
  }

  function showNow() {
    NAMES.forEach((n) => {
      const b = birds[n];
      clearTimers(b);
      b.el.classList.remove('is-hidden', 'is-far', 'is-flapping', 'is-gone');
      b.state = 'perched';
      perchNow(b);
    });
  }

  // 画面サイズが変わったら、とまっているインコだけ位置を直す
  function placeAll() {
    NAMES.forEach((n) => { if (birds[n].state === 'perched') perchNow(birds[n]); });
  }

  function sayBoth(texts) {
    NAMES.forEach((n, i) => { if (birds[n].state === 'perched') setTimeout(() => say(birds[n], texts[i], 2600), i * 500); });
  }

  function init(el) {
    layer = el;
    NAMES.forEach((name) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'bird';
      btn.dataset.bird = name;
      btn.dataset.face = name === 'taivas' ? 'r' : 'l';
      btn.setAttribute('aria-label', `${LABEL[name]}（押すと飛び立ちます）`);
      btn.innerHTML = `<span class="bird-say" aria-hidden="true"></span><span class="bird-flip"><span class="bird-bob">${LL.svg.bird(name)}</span></span>`;
      layer.appendChild(btn);
      const b = { name, el: btn, say: btn.querySelector('.bird-say'), state: 'perched', x: 0, y: 0, timers: [], sayTimer: null, chirp: 0 };
      birds[name] = b;
      btn.addEventListener('click', () => flyAway(b));
    });

    const relayout = debounce(placeAll, 120);
    window.addEventListener('resize', relayout);
    window.addEventListener('load', placeAll);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeAll);
    if ('ResizeObserver' in window) new ResizeObserver(relayout).observe(document.getElementById('view'));
  }

  LL.birds = { init, guide, enter, settle, hide, emerge, showNow, placeAll, sayBoth };
})(window.LL = window.LL || {});
