/* メニューのデータ（価格・説明文はここを書き換えるだけで反映されます） */
(function (LL) {
  'use strict';
  LL.data = LL.data || {};

  LL.data.menu = [
    {
      id: 'drink', title: 'ドリンク', en: 'Drinks',
      note: 'ドリンクを選ぶと、目の前で一杯つくります。',
      items: [
        {
          id: 'herb-latte', name: '青いハーブラテ', bird: 'taivas', price: 680, kind: 'milk',
          desc: 'バタフライピーの青いハーブティーに、あたためたミルクを。Taivas の羽の色をした、すっきりやさしい一杯です。',
          colors: { liquid: '#7f9fe2', art: '#fdfaf3', stream: '#fdfaf3' }
        },
        {
          id: 'honey-au-lait', name: 'はちみつカフェオレ', bird: 'aurinko', price: 620, kind: 'milk',
          desc: '森の養蜂家から届くはちみつを溶かした、まろやかなカフェオレ。Aurinko のお気に入りの色です。',
          colors: { liquid: '#c0915f', art: '#fff7e6', stream: '#fff7e6' }
        },
        {
          id: 'blend', name: 'ブレンドコーヒー', price: 520, kind: 'coffee',
          desc: '店オリジナルの深煎り豆を、ていねいにハンドドリップ。カップとソーサーには小鳥の絵柄。',
          colors: { liquid: '#4a2e1c', art: '#b07c4c', stream: '#3a2416' }
        },
        {
          id: 'berry-soda', name: 'ベリーのソーダ', price: 600, kind: 'soda',
          desc: 'いちごとラズベリーの自家製シロップを炭酸で割りました。羽根の形のミントを浮かべて。',
          colors: { liquid: '#e2577a', stream: '#e2577a' }
        }
      ]
    },
    {
      id: 'bake', title: '焼き菓子', en: 'Bakery',
      items: [
        { id: 'tart', name: 'ナッツのタルト', price: 480, desc: '鳥の巣のように丸く焼いたタルトに、卵に見立てたローストナッツをころんと。' },
        { id: 'financier', name: 'フィナンシェ', price: 320, desc: '焦がしバターが香るしっとり生地を、羽根の形に焼きあげました。' },
        { id: 'cinnamon', name: 'シナモンロール', price: 380, desc: '北欧のおやつの定番。カルダモンをきかせた渦巻きに、小鳥の焼き印。' },
        { id: 'cookie', name: '小鳥のアイシングクッキー', price: 450, desc: 'Taivas と Aurinko の形をしたクッキー2枚セット。おみやげにも。' }
      ]
    },
    {
      id: 'food', title: 'フード', en: 'Food',
      items: [
        { id: 'salmon', name: 'サーモンのオープンサンド', price: 980, desc: 'ライ麦パンにスモークサーモンとディル。レモンをきゅっとしぼって。' },
        { id: 'soup', name: 'きのこのクリームスープ', price: 780, desc: '3種のきのこを煮込んだポタージュ。小鳥の取っ手の器で、パン付き。' },
        { id: 'egg', name: 'たまごサンド', price: 820, desc: 'ふわふわの厚焼きたまごをはさんだ、ボリュームたっぷりのサンド。' }
      ]
    },
    {
      id: 'extra', title: 'おまけ', en: 'For the Birds',
      items: [
        { id: 'millet', name: 'インコのおやつ（粟穂）', price: 100, desc: '看板インコにあげられる粟穂です。スタッフと一緒に、1羽1日2本まで。Aurinko がいちばん喜びます。' }
      ]
    }
  ];
})(window.LL = window.LL || {});
