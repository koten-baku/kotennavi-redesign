/* _common_fix.js — p2〜p2-5 共通修正 7点 */
var fs = require('fs');
var BASE = 'D:/user/baku/claude-code/kotennavi-redesign/';

function readPage(name) {
  var f = BASE + name;
  var html = fs.readFileSync(f, 'utf8');
  var lf = html.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
  return { html: html, lf: lf, file: f, name: name };
}
function die(msg) { console.error('ERROR: ' + msg); process.exit(1); }
function replaceSection(html, oldStart, oldEnd, newContent, ctx) {
  var si = html.indexOf(oldStart);
  if (si === -1) die((ctx || '') + ': section start not found: ' + JSON.stringify(oldStart.slice(0, 80)));
  var ei = html.indexOf(oldEnd, si + oldStart.length);
  if (ei === -1) die((ctx || '') + ': section end not found: ' + JSON.stringify(oldEnd.slice(0, 80)));
  return html.slice(0, si) + newContent + html.slice(ei);
}

/* ─── 修正1: サブナビ LIAISONロゴ ─── */
function newSubnavMark(gradId, pathId, lf) {
  var l = lf;
  return '<span class="p2-subnav__liaison-mark">' + l +
    '              <svg viewBox="0 0 480 240" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="26">' + l +
    '                <defs>' + l +
    '                  <linearGradient id="' + gradId + '" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">' + l +
    '                    <stop offset="0%" stop-color="#ffffff"/>' + l +
    '                    <stop offset="55%" stop-color="#005da7"/>' + l +
    '                    <stop offset="100%" stop-color="#003f80"/>' + l +
    '                  </linearGradient>' + l +
    '                  <path id="' + pathId + '" d="M 80 184 Q 240 56 400 184"/>' + l +
    '                </defs>' + l +
    '                <path d="M 20 200 Q 240 33 460 200" stroke="url(#' + gradId + ')" stroke-width="4" fill="none" stroke-linecap="round"/>' + l +
    '                <text font-family="\'Bodoni Moda\',serif" font-size="58" font-weight="600" letter-spacing="8" fill="url(#' + gradId + ')">' + l +
    '                  <textPath href="#' + pathId + '" startOffset="50%" text-anchor="middle">LIAISON</textPath>' + l +
    '                </text>' + l +
    '              </svg>' + l +
    '            </span>';
}
function fix1(html, lf, gradId, pathId) {
  var MARK_START = '<span class="p2-subnav__liaison-mark">';
  var si = html.indexOf(MARK_START);
  if (si === -1) die('fix1: mark start not found');
  var ei = html.indexOf('</span>', si + MARK_START.length);
  if (ei === -1) die('fix1: mark end not found');
  return html.slice(0, si) + newSubnavMark(gradId, pathId, lf) + html.slice(ei + 7);
}

/* ─── 修正1補: Bodoni Moda フォント追加（p2〜p2-4） ─── */
var OLD_FONT = '&family=Cinzel:wght@400;600;700&display=swap';
var NEW_FONT = '&family=Cinzel:wght@400;600;700&family=Bodoni+Moda:wght@400;600&display=swap';
function fix1Font(html) {
  if (html.indexOf(NEW_FONT) !== -1) return html; // already added
  if (html.indexOf(OLD_FONT) === -1) die('fix1Font: font import marker not found');
  return html.replace(OLD_FONT, NEW_FONT);
}

/* ─── 修正2: check-in SVG ─── */
var OLD_CI_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
var NEW_CI_SVG = '<svg viewBox="0 0 16 16" fill="none"><circle cx="10" cy="5" r="4" fill="#7a8a99" opacity=".45"/><circle cx="5" cy="11" r="2.4" fill="#7a8a99" opacity=".45"/></svg>';
function fix2(html) {
  var mi = html.indexOf('p2-action-widget__btn--checkin');
  if (mi === -1) return html; // p2-5 has no checkin button
  var oi = html.indexOf(OLD_CI_SVG, mi);
  if (oi === -1) die('fix2: check-in svg not found after marker');
  return html.slice(0, oi) + NEW_CI_SVG + html.slice(oi + OLD_CI_SVG.length);
}

/* ─── 修正3: p2.html タグセクション挿入 ─── */
function fix3(html, lf) {
  var BEFORE = lf + '      <!-- おすすめの展覧会 -->';
  var mi = html.indexOf(BEFORE);
  if (mi === -1) die('fix3: おすすめマーカーが見つかりません');
  var TAG =
    lf + '      <!-- 展覧会タグ -->' + lf +
    '      <div class="p2-sub-tags">' + lf +
    '        <div class="p2-sub-tags__label">タグ · Tags</div>' + lf +
    '        <ul class="p2-1-tag-pills" aria-label="タグ">' + lf +
    '          <li><a class="p2-1-tag-pill" href="/p10?tag=絵画">絵画</a></li>' + lf +
    '          <li><a class="p2-1-tag-pill" href="/p10?tag=現代美術">現代美術</a></li>' + lf +
    '          <li><a class="p2-1-tag-pill" href="/p10?tag=オノマトペ">オノマトペ</a></li>' + lf +
    '          <li><a class="p2-1-tag-pill" href="/p10?tag=言語">言語</a></li>' + lf +
    '          <li><a class="p2-1-tag-pill" href="/p10?area=shibuya">渋谷</a></li>' + lf +
    '        </ul>' + lf +
    '      </div>' + lf;
  return html.slice(0, mi) + TAG + html.slice(mi);
}

/* ─── 修正4: おすすめ rec grid wrapper ─── */
function fix4(html, id) {
  // p2SubRecGrid と p25RecGrid
  var OLD_A = '<div class="p2-sub-rec__grid" id="' + id + '"><!-- JS生成 --></div>';
  var NEW_G = '<div class="ec-list" id="' + id + '"></div>';
  if (html.indexOf(OLD_A) !== -1) return html.replace(OLD_A, NEW_G);
  // p2RecGrid (ktn-grid)
  var OLD_B = '<div class="ktn-grid ktn-grid--4col" id="' + id + '"></div>';
  if (html.indexOf(OLD_B) !== -1) return html.replace(OLD_B, NEW_G);
  die('fix4: grid marker not found: ' + id);
}

/* ─── 修正5: タイトルバンドバッジ ─── */
function fix5(html, lf, keepForsale) {
  var OLD =
    '<span class="sb sb-open">開催中 · 残り12日</span>' + lf +
    '          <span class="lb lb-liaison">LIAISON</span>' + lf +
    '          <span class="p2-title-band__forsale">For Sale</span>';
  var NEW_BASE =
    '<span class="sb sb-live"><span class="pulse"></span>開催中</span>' + lf +
    '          <span class="p2-title-band__remain">残り12日</span>' + lf +
    '          <span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>';
  var NEW = keepForsale
    ? NEW_BASE + lf + '          <span class="p2-title-band__forsale">For Sale</span>'
    : NEW_BASE;
  if (html.indexOf(OLD) === -1) die('fix5: badges marker not found');
  return html.replace(OLD, NEW);
}

/* ─── 修正6: サブメニューリンク統一 ─── */
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

function buildSideLinks(activePage, lf) {
  var ITEMS = [
    { href: 'kotennavi-p2.html',   label: '概要',         page: 'p2',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
    { href: 'kotennavi-p2-1.html', label: 'スケジュール', page: 'p2-1',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
    { href: 'kotennavi-p2-2.html', label: '開催場所',     page: 'p2-2',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
    { href: 'kotennavi-p2-3.html', label: '詳細',         page: 'p2-3',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' },
    { href: 'kotennavi-p2-4.html', label: '出展者',       page: 'p2-4',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { href: 'kotennavi-p2-5.html', label: '作品',         page: 'p2-5', liaison: true },
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
    if (item.liaison) {
      var cls = 'p2-side-link p2-side-link--liaison' + (active ? ' is-active' : '');
      lines.push(
        '              <a href="' + item.href + '" class="' + cls + '">',
        '                <span class="p2-side-link__icon">' + LIAISON_ICON + '</span>',
        '                <span class="p2-side-link__label">' + item.label + '</span>',
        '              </a>'
      );
    } else {
      var cls2 = 'p2-side-link' + (active ? ' is-active' : '');
      lines.push(
        '              <a href="' + item.href + '" class="' + cls2 + '">',
        '                <span class="p2-side-link__icon">' + item.icon + '</span>',
        '                <span class="p2-side-link__label">' + item.label + '</span>',
        '              </a>'
      );
    }
  });
  lines.push('            </div>', '          </div>');
  return lines.join(lf);
}

/* ════════════════════════════════════════════════
   p2.html
════════════════════════════════════════════════ */
(function () {
  var p = readPage('kotennavi-p2.html');
  var html = p.html, lf = p.lf;
  html = fix1Font(html);
  html = fix1(html, lf, 'g-li-n-p2', 'li-t-p2');
  html = fix2(html);
  html = fix3(html, lf);
  html = fix4(html, 'p2RecGrid');
  // 修正6: 新規挿入（近くの展覧会の直前）
  var NEARBY = lf + lf + '          <!-- 近くの展覧会 -->';
  var ni = html.indexOf(NEARBY);
  if (ni === -1) die('p2: nearby marker not found');
  html = html.slice(0, ni) + lf + lf + buildSideLinks('p2', lf) + NEARBY + html.slice(ni + NEARBY.length);
  fs.writeFileSync(p.file, html, 'utf8');
  console.log('OK: kotennavi-p2.html (' + html.length + ')');
})();

/* ════════════════════════════════════════════════
   p2-1.html
════════════════════════════════════════════════ */
(function () {
  var p = readPage('kotennavi-p2-1.html');
  var html = p.html, lf = p.lf;
  html = fix1Font(html);
  html = fix1(html, lf, 'g-li-n-p21', 'li-t-p21');
  html = fix2(html);
  html = fix4(html, 'p2SubRecGrid');
  html = fix5(html, lf, true);
  // 修正6: .p2-1-nav-links を置換
  var OLD_START = lf + '          <!-- 関連ページ導線 -->' + lf + '          <div class="p2-1-nav-links">';
  var OLD_END   = lf + lf + '          <!-- 近くの展覧会';
  var NEW_BLOCK = lf + '          <!-- ページ内ナビリンク -->' + lf + buildSideLinks('p2-1', lf);
  html = replaceSection(html, OLD_START, OLD_END, NEW_BLOCK, 'p2-1 fix6');
  fs.writeFileSync(p.file, html, 'utf8');
  console.log('OK: kotennavi-p2-1.html (' + html.length + ')');
})();

/* ════════════════════════════════════════════════
   p2-2.html
════════════════════════════════════════════════ */
(function () {
  var p = readPage('kotennavi-p2-2.html');
  var html = p.html, lf = p.lf;
  html = fix1Font(html);
  html = fix1(html, lf, 'g-li-n-p22', 'li-t-p22');
  html = fix2(html);
  html = fix4(html, 'p2SubRecGrid');
  html = fix5(html, lf, true);
  // 修正6: .p2-2-side-links を置換
  var OLD_START = lf + '          <!-- 関連ページ導線 -->' + lf + '          <div class="p2-2-side-links">';
  var OLD_END   = lf + lf + '          <!-- 近くの展覧会';
  var NEW_BLOCK = lf + '          <!-- ページ内ナビリンク -->' + lf + buildSideLinks('p2-2', lf);
  html = replaceSection(html, OLD_START, OLD_END, NEW_BLOCK, 'p2-2 fix6');
  fs.writeFileSync(p.file, html, 'utf8');
  console.log('OK: kotennavi-p2-2.html (' + html.length + ')');
})();

/* ════════════════════════════════════════════════
   p2-3.html
════════════════════════════════════════════════ */
(function () {
  var p = readPage('kotennavi-p2-3.html');
  var html = p.html, lf = p.lf;
  html = fix1Font(html);
  html = fix1(html, lf, 'g-li-n-p23', 'li-t-p23');
  html = fix2(html);
  html = fix4(html, 'p2SubRecGrid');
  html = fix5(html, lf, true);
  // 修正6: .p2-2-side-links を置換
  var OLD_START = lf + '          <!-- 関連ページ導線 -->' + lf + '          <div class="p2-2-side-links">';
  var OLD_END   = lf + lf + '          <!-- 近くの展覧会';
  var NEW_BLOCK = lf + '          <!-- ページ内ナビリンク -->' + lf + buildSideLinks('p2-3', lf);
  html = replaceSection(html, OLD_START, OLD_END, NEW_BLOCK, 'p2-3 fix6');
  fs.writeFileSync(p.file, html, 'utf8');
  console.log('OK: kotennavi-p2-3.html (' + html.length + ')');
})();

/* ════════════════════════════════════════════════
   p2-4.html
════════════════════════════════════════════════ */
(function () {
  var p = readPage('kotennavi-p2-4.html');
  var html = p.html, lf = p.lf;
  html = fix1Font(html);
  html = fix1(html, lf, 'g-li-n-p24', 'li-t-p24');
  html = fix2(html);
  html = fix4(html, 'p2SubRecGrid');
  html = fix5(html, lf, true);
  // 修正6: .p2-2-side-links を置換
  var OLD_START = lf + '          <!-- 関連ページ導線 -->' + lf + '          <div class="p2-2-side-links">';
  var OLD_END   = lf + lf + '          <!-- 近くの展覧会';
  var NEW_BLOCK = lf + '          <!-- ページ内ナビリンク -->' + lf + buildSideLinks('p2-4', lf);
  html = replaceSection(html, OLD_START, OLD_END, NEW_BLOCK, 'p2-4 fix6');
  fs.writeFileSync(p.file, html, 'utf8');
  console.log('OK: kotennavi-p2-4.html (' + html.length + ')');
})();

/* ════════════════════════════════════════════════
   p2-5.html
════════════════════════════════════════════════ */
(function () {
  var p = readPage('kotennavi-p2-5.html');
  var html = p.html, lf = p.lf;
  // p2-5 は Bodoni Moda 既に読み込み済み
  html = fix1(html, lf, 'g-li-n-p25', 'li-t-p25');
  // 修正2: p2-5 にはチェックインボタンなし（fix2はスキップされる）
  html = fix2(html);
  html = fix4(html, 'p25RecGrid');
  html = fix5(html, lf, false); // p2-5 は For Sale なし
  // 修正6: p25-side-mid 内の .p2-2-side-links を置換
  var OLD_START = lf + '          <div class="p2-2-side-links">';
  var OLD_END   = lf + '        </div><!-- /p25-side-mid -->';
  var NEW_BLOCK = lf + buildSideLinks('p2-5', lf);
  html = replaceSection(html, OLD_START, OLD_END, NEW_BLOCK, 'p2-5 fix6');
  fs.writeFileSync(p.file, html, 'utf8');
  console.log('OK: kotennavi-p2-5.html (' + html.length + ')');
})();

/* ════════════════════════════════════════════════
   kotennavi-common.css — CSS追記
════════════════════════════════════════════════ */
(function () {
  var cf = BASE + 'kotennavi-common.css';
  var css = fs.readFileSync(cf, 'utf8');

  var ADD = '\n' +
    '/* ─── 修正4: ec-list ─── */\n' +
    '.ec-list { display: flex; flex-direction: column; gap: 8px; }\n' +
    '\n' +
    '/* ─── 修正5: タイトルバンド残り日数 ─── */\n' +
    '.p2-title-band__remain { font-size: .72rem; color: var(--muted); }\n' +
    '\n' +
    '/* ─── 修正6: p2-side-links ─── */\n' +
    '.p2-side-links .p2-ic__body { padding: 0; }\n' +
    '.p2-side-links__body { display: flex; flex-direction: column; }\n' +
    '.p2-side-link {\n' +
    '  display: flex;\n' +
    '  align-items: center;\n' +
    '  gap: 8px;\n' +
    '  padding: 8px 10px;\n' +
    '  border-bottom: 1px solid var(--bdr);\n' +
    '  color: var(--fg);\n' +
    '  text-decoration: none;\n' +
    '  font-size: .82rem;\n' +
    '  transition: background .15s;\n' +
    '}\n' +
    '.p2-side-link:last-child { border-bottom: none; }\n' +
    '.p2-side-link:hover { background: var(--bg2); }\n' +
    '.p2-side-link.is-active { font-weight: 600; background: var(--bg2); }\n' +
    '.p2-side-link__icon {\n' +
    '  display: flex;\n' +
    '  align-items: center;\n' +
    '  justify-content: center;\n' +
    '  width: 18px;\n' +
    '  height: 18px;\n' +
    '  color: var(--muted);\n' +
    '  flex-shrink: 0;\n' +
    '}\n' +
    '.p2-side-link.is-active .p2-side-link__icon { color: var(--fg); }\n' +
    '.p2-side-link__label { flex: 1; }\n' +
    '.p2-side-link--liaison .p2-side-link__label { color: var(--lr); font-weight: 500; }\n' +
    '.p2-side-link--liaison.is-active .p2-side-link__label { color: var(--lr); }\n';

  fs.writeFileSync(cf, css + ADD, 'utf8');
  console.log('OK: kotennavi-common.css +' + ADD.length);
})();

console.log('All done.');
