/* _common_fix2.js — p2〜p2-5 共通修正 追加4点 */
var fs = require('fs');
var BASE = 'D:/user/baku/claude-code/kotennavi-redesign/';

function readPage(name) {
  var f = BASE + name;
  var html = fs.readFileSync(f, 'utf8');
  var lf = html.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
  return { html: html, lf: lf, file: f };
}
function die(msg) { console.error('ERROR: ' + msg); process.exit(1); }
function replaceSection(html, oldStart, oldEnd, newContent, ctx) {
  var si = html.indexOf(oldStart);
  if (si === -1) die((ctx || '') + ': start not found: ' + JSON.stringify(oldStart.slice(0, 60)));
  var ei = html.indexOf(oldEnd, si + oldStart.length);
  if (ei === -1) die((ctx || '') + ': end not found: ' + JSON.stringify(oldEnd.slice(0, 60)));
  return html.slice(0, si) + newContent + html.slice(ei);
}

/* ─── 修正1: For Sale バッジ削除（p2-1〜p2-4） ─── */
function fix1RemoveForsale(html, lf) {
  var TARGET = lf + '          <span class="p2-title-band__forsale">For Sale</span>';
  if (html.indexOf(TARGET) === -1) die('fix1: forsale marker not found');
  return html.replace(TARGET, '');
}

/* ─── 修正3: ec-list → masonry（HTML） ─── */
function fix3Html(html, id) {
  var OLD = '<div class="ec-list" id="' + id + '"></div>';
  var NEW = '<div class="masonry" id="' + id + '"></div>';
  if (html.indexOf(OLD) === -1) die('fix3Html: ec-list marker not found: ' + id);
  return html.replace(OLD, NEW);
}

/* ─── 修正4-2: サイドリンク HTML 再構築 ─── */
var LIAISON_ICON =
  '<svg viewBox="0 0 480 240" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="12">' +
  '<defs>' +
  '<linearGradient id="g-sidelink-li" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">' +
  '<stop offset="0%" stop-color="#ffffff"/>' +
  '<stop offset="55%" stop-color="#005da7"/>' +
  '<stop offset="100%" stop-color="#003f80"/>' +
  '</linearGradient>' +
  '<path id="sidelink-li-t" d="M 80 184 Q 240 56 400 184"/>' +
  '</defs>' +
  '<path d="M 20 200 Q 240 33 460 200" stroke="url(#g-sidelink-li)" stroke-width="4" fill="none" stroke-linecap="round"/>' +
  '<text font-family="\'Bodoni Moda\',serif" font-size="58" font-weight="600" letter-spacing="8" fill="url(#g-sidelink-li)">' +
  '<textPath href="#sidelink-li-t" startOffset="50%" text-anchor="middle">LIAISON</textPath>' +
  '</text>' +
  '</svg>';

var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>';

function buildSideLinks2(activePage, lf) {
  var ITEMS = [
    { href: 'kotennavi-p2.html',   label: '概要',             desc: '展覧会情報・作品・アクション', page: 'p2',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
    { href: 'kotennavi-p2-1.html', label: 'スケジュール',     desc: '開館時間・在廊日程', page: 'p2-1',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
    { href: 'kotennavi-p2-2.html', label: '開催場所・アクセス', desc: 'Gallery SOIL 渋谷', page: 'p2-2',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
    { href: 'kotennavi-p2-3.html', label: '詳細',             desc: '記事・イベント・クレジット', page: 'p2-3',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' },
    { href: 'kotennavi-p2-4.html', label: '出展者',           desc: '田中 透 プロフィール', page: 'p2-4',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { href: 'kotennavi-p2-5.html', label: '作品',             desc: '展示8点・販売5点', page: 'p2-5', liaison: true },
  ];
  var lines = [
    '          <div class="p2-ic is-open p2-side-links">',
    '            <div class="p2-ic__head">',
    '              <div class="p2-ic__head-l">',
    '                <div class="p2-ic__head-icon">',
    '                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    '                </div>',
    '                <span class="p2-ic__head-title">この展覧会<span class="p2-ic__head-en">In This Exhibition</span></span>',
    '              </div>',
    '            </div>',
    '            <div class="p2-ic__body p2-side-links__body">',
  ];
  ITEMS.forEach(function(item) {
    var active = item.page === activePage;
    var icon = item.liaison ? LIAISON_ICON : item.icon;
    var cls  = item.liaison
      ? 'p2-side-link p2-side-link--liaison' + (active ? ' is-active' : '')
      : 'p2-side-link' + (active ? ' is-active' : '');
    lines.push(
      '              <a href="' + item.href + '" class="' + cls + '">',
      '                <span class="p2-side-link__icon">' + icon + '</span>',
      '                <span class="p2-side-link__text">',
      '                  <span class="p2-side-link__label">' + item.label + '</span>',
      '                  <span class="p2-side-link__desc">' + item.desc + '</span>',
      '                </span>',
      '                ' + ARROW,
      '              </a>'
    );
  });
  lines.push('            </div>', '          </div>');
  return lines.join(lf);
}

/* ─── 各ページの処理 ─── */
var PAGES = [
  { name: 'kotennavi-p2.html',   page: 'p2',   forsale: false,
    slStart: function(lf) { return lf + lf + '          <div class="p2-ic is-open p2-side-links">'; },
    slEnd:   function(lf) { return lf + lf + '          <!-- 近くの展覧会 -->'; },
    slNew:   function(lf) { return lf + lf + buildSideLinks2('p2', lf); },
    recId: 'p2RecGrid' },
  { name: 'kotennavi-p2-1.html', page: 'p2-1', forsale: true,
    slStart: function(lf) { return lf + '          <!-- ページ内ナビリンク -->' + lf + '          <div class="p2-ic is-open p2-side-links">'; },
    slEnd:   function(lf) { return lf + lf + '          <!-- 近くの展覧会'; },
    slNew:   function(lf) { return lf + '          <!-- ページ内ナビリンク -->' + lf + buildSideLinks2('p2-1', lf); },
    recId: 'p2SubRecGrid' },
  { name: 'kotennavi-p2-2.html', page: 'p2-2', forsale: true,
    slStart: function(lf) { return lf + '          <!-- ページ内ナビリンク -->' + lf + '          <div class="p2-ic is-open p2-side-links">'; },
    slEnd:   function(lf) { return lf + lf + '          <!-- 近くの展覧会'; },
    slNew:   function(lf) { return lf + '          <!-- ページ内ナビリンク -->' + lf + buildSideLinks2('p2-2', lf); },
    recId: 'p2SubRecGrid' },
  { name: 'kotennavi-p2-3.html', page: 'p2-3', forsale: true,
    slStart: function(lf) { return lf + '          <!-- ページ内ナビリンク -->' + lf + '          <div class="p2-ic is-open p2-side-links">'; },
    slEnd:   function(lf) { return lf + lf + '          <!-- 近くの展覧会'; },
    slNew:   function(lf) { return lf + '          <!-- ページ内ナビリンク -->' + lf + buildSideLinks2('p2-3', lf); },
    recId: 'p2SubRecGrid' },
  { name: 'kotennavi-p2-4.html', page: 'p2-4', forsale: true,
    slStart: function(lf) { return lf + '          <!-- ページ内ナビリンク -->' + lf + '          <div class="p2-ic is-open p2-side-links">'; },
    slEnd:   function(lf) { return lf + lf + '          <!-- 近くの展覧会'; },
    slNew:   function(lf) { return lf + '          <!-- ページ内ナビリンク -->' + lf + buildSideLinks2('p2-4', lf); },
    recId: 'p2SubRecGrid' },
  { name: 'kotennavi-p2-5.html', page: 'p2-5', forsale: false,
    slStart: function(lf) { return lf + '          <div class="p2-ic is-open p2-side-links">'; },
    slEnd:   function(lf) { return lf + '        </div><!-- /p25-side-mid -->'; },
    slNew:   function(lf) { return lf + buildSideLinks2('p2-5', lf); },
    recId: 'p25RecGrid' },
];

PAGES.forEach(function(pg) {
  var p = readPage(pg.name);
  var html = p.html, lf = p.lf;

  // 修正1: For Sale 削除（p2-1〜p2-4）
  if (pg.forsale) {
    html = fix1RemoveForsale(html, lf);
  }

  // 修正3: masonry グリッドに変更
  html = fix3Html(html, pg.recId);

  // 修正4-2: サイドリンク再構築
  html = replaceSection(html, pg.slStart(lf), pg.slEnd(lf), pg.slNew(lf), pg.name + ' sidelinks');

  fs.writeFileSync(p.file, html, 'utf8');
  console.log('OK: ' + pg.name + ' (' + html.length + ')');
});

console.log('HTML done.');
