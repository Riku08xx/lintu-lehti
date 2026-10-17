/* URL（#/menu など）とページの対応
   移動のきっかけは「URLが変わったこと」だけ。札・戻るボタン・直接入力のどれでも同じ処理 */
(function (LL) {
  'use strict';

  let view;
  let current = null;
  let busy = false;
  let pending = null;
  const stack = [];

  function parse() {
    const h = location.hash.replace(/^#/, '');
    return h === '' ? '/' : h;
  }

  function updateNav(route) {
    document.querySelectorAll('.quick-nav a').forEach((a) => {
      if (a.dataset.route === route) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function render(route) {
    const page = LL.pages[route];
    view.innerHTML = page.render();
    if (page.mount) page.mount(view);
    document.title = page.title ? `${page.title} | Lintu & Lehti` : 'Lintu & Lehti | 鳥と葉っぱのカフェ';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', page.desc);
    document.body.dataset.route = page.key;
    window.scrollTo(0, 0);
    LL.scene.setRoute(route);
    updateNav(route);
  }

  function focusHeading() {
    const h = view.querySelector('h1');
    if (h) h.focus({ preventScroll: true });
  }

  function go(route) {
    if (route === current) return;
    const from = current;
    let back = false;
    if (stack.length > 1 && stack[stack.length - 2] === route) {
      stack.pop();
      back = true;
    } else {
      stack.push(route);
    }
    if (route === '/') back = true; // 木に戻るときは、いつも「手前へ戻る」向き

    const dir = back ? LL.pages[from].dir : LL.pages[route].dir;
    const birdDir = back ? { x: -dir.x, y: -dir.y } : dir;

    current = route;
    busy = true;
    view.inert = true;
    LL.birds.guide(birdDir);
    LL.scene.transition(dir, back, () => {
      render(route);
      LL.birds.enter(birdDir);
    }).then(() => {
      view.inert = false;
      LL.birds.settle();
      focusHeading();
      busy = false;
      // 演出中に来た移動は、最後の1件だけを覚えておいて今ここで実行
      if (pending) {
        const p = pending;
        pending = null;
        if (p !== current) go(p);
      }
    });
  }

  function onChange() {
    const route = parse();
    if (!LL.pages[route]) { location.replace('#/'); return; } // 存在しないURLはトップへ
    if (busy) { pending = route; return; }
    go(route);
  }

  function start() {
    view = document.getElementById('view');
    let route = parse();
    if (!LL.pages[route]) {
      location.replace('#/');
      route = '/';
    }
    current = route;
    stack.push(route);
    render(route);
    window.addEventListener('hashchange', onChange);
    return route;
  }

  LL.router = { start, focusHeading };
})(window.LL = window.LL || {});
