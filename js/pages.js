/* 各ページの中身を組み立てる */
(function (LL) {
  'use strict';

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const yen = (n) => `¥${n.toLocaleString('ja-JP')}`;
  LL.util = { esc, yen };

  function head(kicker, title, lead) {
    return '<header class="page-head">' +
      `<p class="page-kicker">${kicker}</p>` +
      `<h1 tabindex="-1">${title}</h1>` +
      (lead ? `<p class="lead">${lead}</p>` : '') +
      LL.svg.perchBranch() +
      '</header>';
  }

  /* ---------- A. トップ（木の目次） ---------- */
  const SIGNS = [
    { route: '/menu', en: 'Menu', ja: 'メニュー', x: 83, y: 50, mx: 78, my: 14, r: 3, dot: 'sky' },
    { route: '/birds', en: 'Our Birds', ja: 'インコ紹介', x: 50, y: 9, mx: 22, my: 26, r: -2, dot: 'sun' },
    { route: '/news', en: 'News', ja: 'お知らせ', x: 78, y: 25, mx: 78, my: 38, r: -3, dot: 'sky' },
    { route: '/story', en: 'Our Story', ja: '店内・こだわり', x: 17, y: 47, mx: 22, my: 50, r: 2, dot: 'sun' },
    { route: '/contact', en: 'Reserve', ja: '予約・お問い合わせ', x: 79, y: 76, mx: 78, my: 62, r: 2, dot: 'sun' },
    { route: '/access', en: 'Access', ja: 'アクセス・営業時間', x: 23, y: 73, mx: 22, my: 74, r: -3, dot: 'sky' }
  ];

  function renderTree() {
    const signs = SIGNS.map((s, i) =>
      `<li style="--x:${s.x}%;--y:${s.y}%;--mx:${s.mx}%;--my:${s.my}%">` +
      `<a class="sign" href="#${s.route}" style="--r:${s.r}deg;--i:${i}">` +
      `<span class="dot${s.dot === 'sun' ? ' sun' : ''}" aria-hidden="true"></span>` +
      `<span class="sign-en" aria-hidden="true">${s.en}</span><span class="sign-ja">${s.ja}</span></a></li>`
    ).join('');
    return '<section class="page page-tree">' +
      '<h1 class="tree-title" tabindex="-1"><span class="logo-big">Lintu <span class="amp">&amp;</span> Lehti</span><span class="sub">鳥と葉っぱのカフェ</span></h1>' +
      '<p class="tree-lead">看板インコの Taivas と Aurinko がご案内します。枝の札を選んでください。</p>' +
      '<div class="tree">' +
        `<div class="tree-art tree-wide">${LL.svg.treeWide()}</div>` +
        `<div class="tree-art tree-tall">${LL.svg.treeTall()}</div>` +
        '<span class="perch" data-perch="taivas" data-face="r" style="--x:34.4%;--y:50.6%;--mx:35.2%;--my:27.8%"></span>' +
        '<span class="perch" data-perch="aurinko" data-face="l" style="--x:65.5%;--y:53.2%;--mx:65.2%;--my:40.4%"></span>' +
        `<nav aria-label="店内の案内（木の目次）"><ul class="tree-signs">${signs}</ul></nav>` +
      '</div>' +
      '<p class="tree-info"><span>営業 10:00〜18:00（L.O. 17:30）</span><span>水曜定休</span><span>森の小径3番地</span></p>' +
      '</section>';
  }

  /* ---------- B. メニュー ---------- */
  function menuItem(item) {
    const tag = item.bird
      ? `<span class="mi-tag${item.bird === 'aurinko' ? ' sun' : ''}">${item.bird === 'aurinko' ? 'Aurinko' : 'Taivas'}</span>`
      : '';
    const inner =
      `<span class="mi-icon">${LL.svg.menuIcon(item)}</span>` +
      `<span class="mi-body"><span class="mi-head"><span class="mi-name">${esc(item.name)}${tag}</span>` +
      `<span class="mi-price">${yen(item.price)}</span></span>` +
      `<span class="mi-desc">${esc(item.desc)}</span>` +
      (item.kind ? '<span class="mi-cta" aria-hidden="true">▶ 押すと一杯つくります</span>' : '') +
      '</span>';
    return item.kind
      ? `<li><button type="button" class="menu-item" data-drink="${item.id}" aria-haspopup="dialog">${inner}</button></li>`
      : `<li><div class="menu-item">${inner}</div></li>`;
  }

  function renderMenu() {
    const cats = LL.data.menu.map((cat) =>
      `<section class="panel menu-cat" aria-labelledby="cat-${cat.id}">` +
      `<h2 id="cat-${cat.id}">${cat.title}<span class="en">${cat.en}</span></h2>` +
      (cat.note ? `<p class="cat-note">${cat.note}</p>` : '') +
      `<ul class="menu-list">${cat.items.map(menuItem).join('')}</ul></section>`
    ).join('');
    return '<section class="page page-menu">' +
      head('Menu', 'メニュー', 'ドリンクを選ぶと、看板インコの見守るなかで一杯つくります。ミルク系には小鳥のラテアートを。') +
      `<div class="menu-cats">${cats}</div>` +
      '<p class="menu-foot panel">価格はすべて税込です。焼き菓子はテイクアウトもできます。※架空のカフェのため、実際には注文できません。</p>' +
      '</section>';
  }

  function mountMenu(view) {
    const drinks = {};
    LL.data.menu[0].items.forEach((d) => { drinks[d.id] = d; });
    view.querySelectorAll('[data-drink]').forEach((btn) => {
      btn.addEventListener('click', () => LL.latte.open(drinks[btn.dataset.drink], btn));
    });
  }

  /* ---------- C. インコ紹介 ---------- */
  function renderBirds() {
    const cards = LL.data.birds.map((b) =>
      `<article class="panel bird-card${b.tone === 'sun' ? ' is-sun' : ''}" aria-labelledby="bird-${b.id}">` +
      `<div class="bird-card-art">${LL.svg.bird(b.id)}</div>` +
      `<h2 id="bird-${b.id}">${b.name}</h2><p class="reading">${b.reading}</p>` +
      `<dl class="profile">${b.rows.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>` +
      `<p class="quote">「${esc(b.quote)}」</p></article>`
    ).join('');
    return '<section class="page page-birds">' +
      head('Our Birds', 'インコ紹介', 'お店の看板インコ、セキセイインコの Taivas（空）と Aurinko（太陽）です。') +
      `<div class="bird-cards">${cards}</div>` +
      '<section class="panel" aria-labelledby="bird-tips"><h2 id="bird-tips">インコとのお約束<span class="en">Bird Etiquette</span></h2>' +
      '<ul class="tips"><li>大きな声や急な動きは、インコがびっくりしてしまうので控えめに。</li>' +
      '<li>おやつは「インコのおやつ（粟穂）」だけ。人の食べものはあげないでください。</li>' +
      '<li>写真はフラッシュなしでどうぞ。</li></ul>' +
      '<p class="try-note">このページの上の枝にとまっている2羽を押すと、パッと飛び立って、少ししたら戻ってきます。</p></section>' +
      '</section>';
  }

  /* ---------- D. 店内・こだわり ---------- */
  function renderStory() {
    const plants = [
      ['monstera', 'モンステラ', '入口で出迎える、お店の主。切れこみのある大きな葉が自慢です。'],
      ['pothos', 'ポトス', '棚の上から、つるをゆったり垂らしています。'],
      ['umbellata', 'ウンベラータ', 'ハート形のやわらかな葉。窓辺の特等席にいます。'],
      ['fern', 'ボストンファーン', 'ふわふわの葉で、店内の空気をしっとり保ちます。']
    ];
    const interior = [
      ['chair', '白樺の椅子', '北欧の家具工房でつくられた、軽くてあたたかい木の椅子。'],
      ['linen', 'リネンのクッション', 'くすんだ緑のリネンに、小鳥の刺しゅうをひとつ。'],
      ['lamp', '窓辺のランプ', '夕方になると、店内をはちみつ色の光で包みます。']
    ];
    const list = (arr, fn) => `<ul class="card-list">${arr.map(([k, t, d]) => `<li>${fn(k)}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>`;
    return '<section class="page page-story">' +
      head('Our Story', '店内・こだわり', '鳥と葉っぱのそばで、ゆっくりお茶を。') +
      '<section class="panel story-intro" aria-labelledby="story-begin"><div>' +
        '<h2 id="story-begin">お店のはじまり<span class="en">How it began</span></h2>' +
        '<p>店主が旅先のフィンランドで出会ったのは、窓辺に植物があふれ、小鳥のさえずりが聞こえる小さなカフェでした。その心地よさを自分の町にもつくりたくて、森の小径の古い木工所を改装して Lintu &amp; Lehti を開きました。</p>' +
        '<p>店名はフィンランド語で「鳥」と「葉っぱ」。店の真ん中には大きな木を植え、その枝を Taivas と Aurinko の止まり木にしています。</p>' +
      '</div>' +
      '<ol class="timeline">' +
        '<li><time>2019 春</time>森の小径に Lintu &amp; Lehti がオープン</li>' +
        '<li><time>2020 夏</time>Taivas と Aurinko がお店の仲間に</li>' +
        '<li><time>2023 秋</time>店の真ん中の木が、天井に届くほどに</li>' +
        '<li><time>2026 いま</time>植物は80鉢をこえました</li>' +
      '</ol></section>' +
      '<section class="panel" aria-labelledby="story-plants"><h2 id="story-plants">店内の植物たち<span class="en">Plants</span></h2>' +
        list(plants, LL.svg.plant) +
        '<p class="safety">インコの安全のために：モンステラやポトスは鳥が口にすると体に悪い植物です。そのため、インコが過ごす木のまわりには置かず、鳥の届かない高い棚や別の一角で育てています。</p>' +
      '</section>' +
      '<section class="panel" aria-labelledby="story-interior"><h2 id="story-interior">北欧のインテリア<span class="en">Interior</span></h2>' +
        list(interior, LL.svg.interior) +
      '</section>' +
      '</section>';
  }

  /* ---------- E. アクセス・営業時間 ---------- */
  const DAYS = ['日', '月', '火', '水', '木', '金', '土'];
  const CLOSED_DAY = 3; // 水曜

  function renderAccess() {
    const now = new Date();
    const today = now.getDay();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const open = today !== CLOSED_DAY && minutes >= 600 && minutes < 1080;
    const order = [1, 2, 3, 4, 5, 6, 0];
    const rows = order.map((d) => {
      const closed = d === CLOSED_DAY;
      const cls = [closed ? 'is-closed' : '', d === today ? 'is-today' : ''].join(' ').trim();
      return `<tr${cls ? ` class="${cls}"` : ''}><th scope="row">${DAYS[d]}曜${d === today ? '<span class="today-mark">今日</span>' : ''}</th>` +
        `<td>${closed ? '定休日' : '10:00〜18:00（L.O. 17:30）'}</td></tr>`;
    }).join('');
    return '<section class="page page-access">' +
      head('Access &amp; Hours', 'アクセス・営業時間', 'どんぐり駅から、森の小径をのんびり歩いて7分ほど。') +
      '<div class="access-grid">' +
        `<section class="panel map-wrap" aria-labelledby="access-map"><h2 id="access-map">地図<span class="en">Map</span></h2>${LL.svg.map()}` +
        '<p class="map-caption">※ 実在しない、架空の地図です。</p></section>' +
        '<section class="panel" aria-labelledby="access-info"><h2 id="access-info">お店の情報<span class="en">Info</span></h2>' +
          `<p class="open-status ${open ? 'is-open' : 'is-closed'}">${open ? 'ただいま営業中（という設定です）' : 'ただいま準備中（という設定です）'}</p>` +
          '<dl class="info-list">' +
            '<dt>所在地</dt><dd>森の小径3番地（架空）</dd>' +
            '<dt>行き方</dt><dd>どんぐり駅から北へ。葉っぱ橋で小川をわたると右手に見えます。</dd>' +
            '<dt>席数</dt><dd>18席（窓辺のカウンター6席）</dd>' +
            '<dt>インコ</dt><dd>店内中央の木にいます（体調によりお休みする日もあります）</dd>' +
          '</dl>' +
          `<table class="hours"><caption class="sr-only">曜日ごとの営業時間</caption>${rows}</table>` +
        '</section>' +
      '</div>' +
      '</section>';
  }

  /* ---------- F. ニュース ---------- */
  function renderNews() {
    const items = LL.data.news.map((n, i) => {
      const [y, m, d] = n.date.split('-');
      return `<li class="panel news-item"><details${i === 0 ? ' open' : ''}><summary>` +
        `<time class="news-date" datetime="${n.date}">${y}.${m}.${d}</time>` +
        `<span class="news-tag${n.tone ? ` is-${n.tone}` : ''}">${esc(n.tag)}</span>` +
        `<span class="news-title">${esc(n.title)}</span>` +
        '<span class="news-toggle" aria-hidden="true">＋</span></summary>' +
        `<div class="news-body"><p>${esc(n.body)}</p></div></details></li>`;
    }).join('');
    return '<section class="page page-news">' +
      head('News', 'ニュース・お知らせ', '季節のメニューや、インコたちの近況をお届けします。') +
      `<ul class="news-list">${items}</ul>` +
      '</section>';
  }

  /* ---------- G. 予約・お問い合わせ ---------- */
  function renderContact() {
    const times = [];
    for (let h = 10; h <= 16; h++) { times.push(`${h}:00`); times.push(`${h}:30`); }
    times.push('17:00');
    return '<section class="page page-contact">' +
      head('Reservation', '予約・お問い合わせ', 'ご予約やご質問は、こちらのフォームからどうぞ。インコたちがお返事します。') +
      '<div class="contact-grid">' +
        '<section class="panel" aria-labelledby="contact-form-title"><h2 id="contact-form-title">フォーム<span class="en">Form</span></h2>' +
          '<p class="fictional-note"><strong>このサイトは架空のカフェです。</strong>送信しても、入力した内容はどこにも送られません。本当のお名前やメールアドレスは入力しないでください。</p>' +
          '<form class="contact-form" method="dialog" novalidate>' +
            '<fieldset><legend>ご用件</legend><div class="radio-group">' +
              '<label><input type="radio" name="kind" value="reserve" checked> 席の予約</label>' +
              '<label><input type="radio" name="kind" value="question"> お問い合わせ</label>' +
            '</div></fieldset>' +
            '<div class="form-row"><label for="f-name">お名前（ニックネーム可）<span class="req">必須</span></label>' +
              '<input id="f-name" name="name" type="text" required autocomplete="off" placeholder="例：もりの すずめ" aria-describedby="f-name-hint">' +
              '<span class="hint" id="f-name-hint">架空のお名前で大丈夫です。</span></div>' +
            '<div class="form-2col">' +
              '<div class="form-row"><label for="f-date">ご希望日</label><input id="f-date" name="date" type="date"></div>' +
              `<div class="form-row"><label for="f-time">時間</label><select id="f-time" name="time"><option value="">選んでください</option>${times.map((t) => `<option>${t}</option>`).join('')}</select></div>` +
            '</div>' +
            '<div class="form-row"><label for="f-people">人数</label><select id="f-people" name="people">' +
              [1, 2, 3, 4, 5, 6].map((n) => `<option value="${n}"${n === 2 ? ' selected' : ''}>${n}名</option>`).join('') + '</select></div>' +
            '<div class="form-row"><label for="f-msg">メッセージ</label>' +
              '<textarea id="f-msg" name="message" placeholder="例：窓辺の席を希望します。Aurinko に会えますか？"></textarea></div>' +
            '<button type="submit" class="btn">インコに届ける</button>' +
            '<p class="thanks" role="status" aria-live="polite"></p>' +
          '</form>' +
        '</section>' +
        '<section class="panel contact-side" aria-labelledby="contact-side-title"><h2 id="contact-side-title">ご予約について<span class="en">Notes</span></h2>' +
          '<p>ご予約は来店日の前日までにどうぞ。窓辺のカウンター席は人気です。</p>' +
          '<p>インコたちは午後に少しお昼寝をします。会いたい方は午前中がおすすめです。</p>' +
          '<p>定休日：水曜日<br>営業時間：10:00〜18:00（L.O. 17:30）</p>' +
        '</section>' +
      '</div>' +
      '</section>';
  }

  function mountContact(view) {
    const form = view.querySelector('.contact-form');
    const thanks = form.querySelector('.thanks');
    const name = form.querySelector('#f-name');
    const date = form.querySelector('#f-date');
    const d = new Date();
    date.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    // ブラウザ標準の送信を止め、画面にお礼を出すだけ（どこにも送らない）
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!name.value.trim()) {
        name.setAttribute('aria-invalid', 'true');
        thanks.textContent = 'お名前を入力してください（ニックネームで大丈夫です）。';
        name.focus();
        return;
      }
      name.removeAttribute('aria-invalid');
      const who = name.value.trim().slice(0, 20);
      const isReserve = form.elements.kind.value === 'reserve';
      thanks.textContent = `${who} さん、ありがとう！ Taivas と Aurinko が${isReserve ? 'ご来店を' : 'お返事を書きながら'}楽しみに待っています。（架空のカフェのため、実際には送信されていません）`;
      LL.birds.sayBoth(['アリガトウ！', '…まってるね']);
      form.reset();
    });
  }

  LL.pages = {
    '/': { key: 'top', title: '', desc: '看板インコの Taivas と Aurinko がお出迎えする、観葉植物いっぱいの北欧風カフェ（架空）。', dir: { x: 0, y: 1 }, render: renderTree },
    '/menu': { key: 'menu', title: 'メニュー', desc: '青いハーブラテ、はちみつカフェオレ、焼き菓子やフードのメニュー。', dir: { x: 1, y: 0.15 }, render: renderMenu, mount: mountMenu },
    '/birds': { key: 'birds', title: 'インコ紹介', desc: '看板インコ Taivas と Aurinko のプロフィール。', dir: { x: 0, y: -1 }, render: renderBirds },
    '/story': { key: 'story', title: '店内・こだわり', desc: '観葉植物と北欧インテリア、お店の誕生ストーリー。', dir: { x: -1, y: 0.1 }, render: renderStory },
    '/access': { key: 'access', title: 'アクセス・営業時間', desc: '架空マップと営業時間・定休日。', dir: { x: -0.8, y: 0.6 }, render: renderAccess },
    '/news': { key: 'news', title: 'ニュース・お知らせ', desc: '季節限定メニューやインコたちの近況。', dir: { x: 0.8, y: -0.6 }, render: renderNews },
    '/contact': { key: 'contact', title: '予約・お問い合わせ', desc: '予約・お問い合わせフォーム（見た目だけで、送信はされません）。', dir: { x: 0.8, y: 0.6 }, render: renderContact, mount: mountContact }
  };
})(window.LL = window.LL || {});
