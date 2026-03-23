var fs = require('fs');

/* ────────────────────────────────────────
   1. HTML: フィルタークラス変更 + セクション置換
──────────────────────────────────────── */
var hf = 'D:/user/baku/claude-code/kotennavi-redesign/kotennavi-p2-5.html';
var html = fs.readFileSync(hf, 'utf8');

// 1-A: フィルタークラス変更
html = html.replace('class="p2-5-filter"', 'class="p25-filter"');
html = html.replace(/class="p2-5-filter__btn/g, 'class="p25-filter__btn');

// 1-B: 旧セクション④⑤を新2カラムレイアウトに置換
var oldSec = '      <!-- \u2463 \u51fa\u54c1\u8005\u30fb\u51fa\u54c1\u4f5c\u5bb6\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb -->';
var oldEnd = '    </div><!-- /ktn-content -->';
var si = html.indexOf(oldSec);
var ei = html.indexOf(oldEnd);
if (si === -1 || ei === -1) {
  console.log('HTML markers not found si=' + si + ' ei=' + ei);
  process.exit(1);
}

var SVG_EXH  = '<svg width="13" height="13"><use href="#icon-exh"/></svg>';
var SVG_W11  = '<svg width="11" height="11"><use href="#icon-watch" color="#7a8a99"/></svg>';
var SVG_W12  = '<svg width="12" height="12"><use href="#icon-watch" color="#7a8a99"/></svg>';

var newSec = [
'      <!-- \uff12\u30ab\u30e9\u30e0\u30ec\u30a4\u30a2\u30a6\u30c8 -->',
'      <div class="p2-layout">',
'',
'        <!-- \u5de6\u30ab\u30e9\u30e0\uff08\u30e1\u30a4\u30f3\u30b3\u30f3\u30c6\u30f3\u30c4\uff09 -->',
'        <div class="p2-layout__main">',
'',
'          <!-- \u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u30ab\u30fc\u30c9 -->',
'          <section class="p25-creator-profile" id="p25CreatorProfile">',
'            <div class="ktn-section__head">',
'              <span class="ktn-section__label">CREATORS</span>',
'              <h2 class="ktn-section__title">\u51fa\u54c1\u4f5c\u5bb6\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb</h2>',
'            </div>',
'            <div class="cp-card">',
'              <div class="cp-card__header">',
'                <div class="cp-card__avatar av-c1"><div class="cc__avatar-ph">\u900f</div></div>',
'                <div class="cp-card__header-meta">',
'                  <div class="cc__badge-row">',
'                    <span class="cb cb-creator">CREATOR</span>',
'                    <span class="sb">\u958b\u50ac\u4e2d</span>',
'                    <span class="lb lb-sm">LIAISON</span>',
'                  </div>',
'                  <div class="cp-card__name">\u7530\u4e2d \u900f</div>',
'                  <div class="cp-card__name-en">Toru Tanaka</div>',
'                  <div class="cp-card__genre">\u6cb9\u5f69\u30fb\u73fe\u4ee3\u7f8e\u8853\u30fb\u30df\u30af\u30b9\u30c8\u30e1\u30c7\u30a3\u30a2</div>',
'                  <div class="cp-card__counts">',
'                    <span><strong>12</strong> exhibitions</span>',
'                    <span><strong>247</strong> watchers</span>',
'                  </div>',
'                </div>',
'                <button class="ktn-btn ktn-btn--watch cp-card__watch">',
'                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/></svg>',
'                  watch',
'                </button>',
'              </div>',
'              <div class="cp-card__bio">',
'                <p>1985\u5e74\u6771\u4eac\u751f\u307e\u308c\u3002\u6b66\u8535\u91ce\u7f8e\u8853\u5927\u5b66\u6cb9\u7d75\u5b66\u79d1\u5352\u696d\u5f8c\u3001\u30cb\u30e5\u30fc\u30e8\u30fc\u30af\u306e\u30a2\u30fc\u30c8\u30b9\u30bf\u30b8\u30aa\u306b\u5728\u7c4d\u3002\u5e30\u56fd\u5f8c\u3001\u300c\u8a00\u8a9e\u3068\u611f\u899a\u306e\u5883\u754c\u300d\u3092\u30c6\u30fc\u30de\u306b\u3057\u305f\u7d75\u753b\u4f5c\u54c1\u3092\u767a\u8868\u3057\u7d9a\u3051\u308b\u3002</p>',
'                <p>\u65e5\u672c\u8a9e\u7279\u6709\u306e\u97f3\u8c61\u5fb4\u8a9e\uff08\u30aa\u30ce\u30de\u30c8\u30da\uff09\u304c\u6301\u3064\u97f3\u306e\u8cea\u611f\u3092\u3001\u8272\u5f69\u3068\u7b46\u8de1\u306b\u3088\u3063\u3066\u8996\u899a\u5316\u3059\u308b\u72ec\u81ea\u306e\u624b\u6cd5\u3092\u78ba\u7acb\u3002\u56fd\u5185\u5916\u306e\u5c55\u89a7\u4f1a\u306b\u591a\u6570\u53c2\u52a0\u30022024\u5e74\u3088\u308a LIAISON \u8a8d\u5b9a\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u3002</p>',
'              </div>',
'              <div class="cp-card__tags">',
'                <span class="ktn-tag">\u6cb9\u5f69</span>',
'                <span class="ktn-tag">\u73fe\u4ee3\u7f8e\u8853</span>',
'                <span class="ktn-tag">\u30df\u30af\u30b9\u30c8\u30e1\u30c7\u30a3\u30a2</span>',
'                <span class="ktn-tag">\u8a00\u8a9e\u3068\u611f\u899a</span>',
'                <span class="ktn-tag">\u6771\u4eac</span>',
'              </div>',
'              <a href="kotennavi-p3.html" class="ktn-btn ktn-btn--ghost cp-card__page-link">',
'                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
'                \u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u30da\u30fc\u30b8\u3078',
'              </a>',
'            </div>',
'          </section>',
'',
'          <!-- \u30bf\u30b0 -->',
'          <div class="p2-tags-section">',
'            <div class="p2-tags__head"><span class="p2-tags__label">\u30bf\u30b0</span></div>',
'            <div class="p2-tags__list">',
'              <a href="#" class="ktn-tag">\u30aa\u30ce\u30de\u30c8\u30da</a>',
'              <a href="#" class="ktn-tag">\u6cb9\u5f69</a>',
'              <a href="#" class="ktn-tag">\u73fe\u4ee3\u7f8e\u8853</a>',
'              <a href="#" class="ktn-tag">\u30df\u30af\u30b9\u30c8\u30e1\u30c7\u30a3\u30a2</a>',
'              <a href="#" class="ktn-tag">\u30b0\u30eb\u30fc\u30d7\u5c55</a>',
'              <a href="#" class="ktn-tag">\u6771\u4eac</a>',
'              <a href="#" class="ktn-tag">\u6e0b\u8c37</a>',
'              <a href="#" class="ktn-tag">LIAISON</a>',
'            </div>',
'          </div>',
'',
'          <!-- \u304a\u3059\u3059\u3081\u306e\u5c55\u89a7\u4f1a -->',
'          <section class="p2-related">',
'            <div class="ktn-section__head">',
'              <h2 class="ktn-section__title">\u304a\u3059\u3059\u3081\u306e\u5c55\u89a7\u4f1a<span class="p2-related__en">Recommended</span></h2>',
'              <a href="kotennavi-p2.html" class="ktn-section__more">\u3059\u3079\u3066\u898b\u308b \u2192</a>',
'            </div>',
'            <div class="ktn-grid ktn-grid--4col" id="p25RecGrid"></div>',
'          </section>',
'',
'        </div><!-- /p2-layout__main -->',
'',
'        <!-- \u53f3\u30ab\u30e9\u30e0 -->',
'        <aside class="p2-layout__side">',
'',
'          <!-- \u51fa\u54c1\u8005\u30ab\u30fc\u30c9 -->',
'          <div class="p2-side-card p25-side-creator">',
'            <div class="p25-side-creator__head">\u51fa\u54c1\u8005</div>',
'            <a class="cc cc--h" href="kotennavi-p3.html">',
'              <div class="cc__top">',
'                <div class="cc__avatar av-c1"><div class="cc__avatar-ph">\u900f</div></div>',
'              </div>',
'              <div class="cc__main">',
'                <div class="cc__info">',
'                  <div class="cc__badge-row">',
'                    <span class="cb cb-creator">creator</span>',
'                    <span class="sb sb-sm">\u958b\u50ac\u4e2d</span>',
'                  </div>',
'                  <div class="cc__name">\u7530\u4e2d \u900f</div>',
'                  <div class="cc__genre">\u6cb9\u5f69\u30fb\u73fe\u4ee3\u7f8e\u8853</div>',
'                </div>',
'                <div class="cc__hfoot">',
'                  <span class="pc-count pc-count--exh">' + SVG_EXH + '12</span>',
'                  <span class="sep"></span>',
'                  <span class="pc-count pc-count--watch">' + SVG_W11 + '248</span>',
'                  <button class="ktn-btn" onclick="this.classList.toggle(\'on\');event.preventDefault()">',
'                    ' + SVG_W12,
'                    watch<span class="tip">\u30a6\u30a9\u30c3\u30c1\u3059\u308b</span>',
'                  </button>',
'                </div>',
'              </div>',
'            </a>',
'          </div>',
'',
'          <!-- \u30b5\u30d6\u30da\u30fc\u30b8\u30ea\u30f3\u30af -->',
'          <div class="p2-side-card p2-side-subnav">',
'            <div class="p2-side-subnav__title">\u3053\u306e\u5c55\u89a7\u4f1a\u306b\u3064\u3044\u3066</div>',
'            <a href="kotennavi-p2.html" class="p2-side-subnav__item">',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
'              \u6982\u8981',
'              <svg class="p2-side-subnav__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'            <a href="kotennavi-p2-1.html" class="p2-side-subnav__item">',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
'              \u30b9\u30b1\u30b8\u30e5\u30fc\u30eb',
'              <svg class="p2-side-subnav__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'            <a href="kotennavi-p2-2.html" class="p2-side-subnav__item">',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
'              \u958b\u50ac\u5834\u6240',
'              <svg class="p2-side-subnav__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'            <a href="kotennavi-p2-3.html" class="p2-side-subnav__item">',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
'              \u8a73\u7d30',
'              <svg class="p2-side-subnav__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'            <a href="kotennavi-p2-4.html" class="p2-side-subnav__item">',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
'              \u51fa\u5c55\u8005',
'              <svg class="p2-side-subnav__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'            <a href="kotennavi-p2-5.html" class="p2-side-subnav__item is-active">',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
'              <span class="lb lb-sm">LIAISON</span> \u4f5c\u54c1',
'              <svg class="p2-side-subnav__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'          </div>',
'',
'          <!-- \u8fd1\u304f\u306e\u5c55\u89a7\u4f1a -->',
'          <div class="p2-side-card p2-side-nearby">',
'            <div class="p2-side-nearby__head">',
'              <span class="p2-side-nearby__title">\u8fd1\u304f\u306e\u5c55\u89a7\u4f1a</span>',
'              <a href="kotennavi-p2.html?filter=near" class="p2-side-nearby__more">\u3059\u3079\u3066 \u2192</a>',
'            </div>',
'            <div id="p25NearbyList"></div>',
'          </div>',
'',
'        </aside>',
'',
'      </div><!-- /p2-layout -->',
'',
'    </div><!-- /ktn-content -->'
].join('\n');

html = html.slice(0, si) + newSec + html.slice(ei + oldEnd.length);
fs.writeFileSync(hf, html, 'utf8');
console.log('HTML done ' + html.length);

/* ────────────────────────────────────────
   2. JS: renderWork + filter + nearby + rec
──────────────────────────────────────── */
var jf = 'D:/user/baku/claude-code/kotennavi-redesign/kotennavi-pages.js';
var js = fs.readFileSync(jf, 'utf8');

// 2-A: renderWork: data-creator → data-artist, add p25-artwork-card class
js = js.replace(
  'return \'<a class="\' + cardClass + \'" href="#" data-creator="\' + w.creator + \'">\' +',
  'return \'<a class="\' + cardClass + \' p25-artwork-card" href="#" data-creator="\' + w.creator + \'" data-artist="\' + w.creator + \'">\' +'
);

// 2-B: Replace old filter block with new filter + nearby + rec
var filterStart = '  /* \u30d5\u30a3\u30eb\u30bf\u30fc */';
var filterEnd   = '\n  /* \u2500\u2500 \u51fa\u54c1\u8005 (\u51fa\u54c1\u8005\u30ea\u30b9\u30c8 cc--h) \u2500\u2500 */';
var fsi = js.indexOf(filterStart);
var fei = js.indexOf(filterEnd);
if (fsi === -1 || fei === -1) {
  console.log('JS filter markers not found fsi=' + fsi + ' fei=' + fei);
  process.exit(1);
}

var newFilter = [
'  /* \u4f5c\u5bb6\u5225\u30d5\u30a3\u30eb\u30bf\u30fc */',
'  document.querySelectorAll(\'.p25-filter__btn\').forEach(function (btn) {',
'    btn.addEventListener(\'click\', function () {',
'      document.querySelectorAll(\'.p25-filter__btn\').forEach(function (b) { b.classList.remove(\'is-active\'); });',
'      this.classList.add(\'is-active\');',
'      var f = this.dataset.filter;',
'      document.querySelectorAll(\'.p25-artwork-card\').forEach(function (card) {',
"        card.style.display = (f === 'all' || card.dataset.artist === f) ? '' : 'none';",
'      });',
'    });',
'  });',
'',
'  /* p25\u8fd1\u304f\u306e\u5c55\u89a7\u4f1a */',
"  (function () {",
"    var list = document.getElementById('p25NearbyList');",
'    if (!list || !window.P2_NEARBY) return;',
'    list.innerHTML = window.P2_NEARBY.slice(0, 4).map(function (e) {',
"      return '<a href=\"kotennavi-p2.html\" class=\"p2-side-ec\">' +",
"        '<div class=\"p2-side-ec__poster\" style=\"background:' + e.bg + ';color:' + e.tc + '\">' +",
"        (e.liaison ? '<div class=\"p2-side-ec__ldot\"></div>' : '') +",
'        e.title.slice(0, 4) +',
"        '</div>' +",
"        '<div class=\"p2-side-ec__body\">' +",
"        '<div class=\"p2-side-ec__name\">' + e.title + '</div>' +",
"        '<div class=\"p2-side-ec__venue\">' + e.venue + '</div>' +",
"        '<div><span class=\"p2-side-ec__badge\">\u958b\u50ac\u4e2d</span></div>' +",
"        '</div>' +",
"        '</a>';",
'    }).join(\'\');',
'  })();',
'',
'  /* p25\u304a\u3059\u3059\u3081\u306e\u5c55\u89a7\u4f1a */',
'  (function () {',
"    var grid = document.getElementById('p25RecGrid');",
'    if (!grid || !window.P2_REC) return;',
'    grid.innerHTML = window.P2_REC.map(function (e, i) {',
"      return '<a href=\"kotennavi-p2.html\" class=\"p2-ec\" style=\"animation-delay:' + (i * 60) + 'ms\">' +",
"        (e.liaison ? '<span class=\"p2-ec__ldot\"></span>' : '') +",
"        '<div class=\"p2-ec__poster\" style=\"background:' + e.bg + ';color:' + e.tc + '\">' +",
"        '<span class=\"p2-ec__poster-txt\">' + e.title + '</span>' +",
"        '<div class=\"p2-ec__poster-bar\"><div class=\"p2-ec__drow\">' +",
"        '<span class=\"p2-ec__dy\">2026.</span><span class=\"p2-ec__dmd\">' + (e.s || '') + '</span>' +",
"        '<span class=\"p2-ec__dsep\">\u2013</span><span class=\"p2-ec__dmd\">' + (e.e || '') + '</span>' +",
"        '</div><div class=\"p2-ec__dmeta\"><span class=\"p2-ec__dbadge ' +",
"        (e.open ? 'p2-ec__dbadge--open' : 'p2-ec__dbadge--cl') + '\">' +",
"        (e.open ? '\u958b\u50ac\u4e2d' : '\u7d42\u4e86') + '</span></div></div>' +",
"        '</div>' +",
"        '<div class=\"p2-ec__body\">' +",
"        '<div class=\"p2-ec__tr\"><span class=\"p2-ec__tag\">\u7d75\u753b</span>' +",
"        '<button class=\"p2-ec__bm\" onclick=\"event.preventDefault();this.classList.toggle(\'is-active\')\" aria-label=\"\u30d6\u30c3\u30af\u30de\u30fc\u30af\">' +",
'        \'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>\' +',
"        '</button></div>' +",
"        '<div class=\"p2-ec__name\">' + e.title + '</div>' +",
"        '<div class=\"p2-ec__venue\">' + e.venue + '</div>' +",
"        '<div class=\"p2-ec__foot\">' +",
"        '<span class=\"p2-ec__cnt\">\u2764 ' + (e.int || 0) + '</span>' +",
"        '<span class=\"p2-ec__cnt\">\ud83d\udccd ' + (e.ci || 0) + '</span>' +",
"        '</div>' +",
"        '</div>' +",
"        '</a>';",
'    }).join(\'\');',
'  })();',
''
].join('\n');

js = js.slice(0, fsi) + newFilter + js.slice(fei);
fs.writeFileSync(jf, js, 'utf8');
console.log('JS done ' + js.length);

/* ────────────────────────────────────────
   3. CSS: p25-filter + p25-side-creator スタイル追記
──────────────────────────────────────── */
var cf = 'D:/user/baku/claude-code/kotennavi-redesign/kotennavi-common.css';
var css = fs.readFileSync(cf, 'utf8');

var newCss = '\n' + [
'/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550',
'   P2-5 LIAISON\u4f5c\u54c1\u4e00\u89a7\uff08\u30e9\u30a4\u30c8\u7248\uff09\u56fa\u6709\u30b9\u30bf\u30a4\u30eb',
'\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */',
'.p25-filter { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 22px; }',
'.p25-filter__btn {',
'  font-family: var(--fm); font-size: .6rem; letter-spacing: .08em;',
'  padding: 5px 16px; border-radius: 20px;',
'  border: 1px solid var(--border); background: #fff; color: var(--muted);',
'  cursor: pointer; transition: all .15s;',
'}',
'.p25-filter__btn:hover { border-color: var(--accent); color: var(--accent); }',
'.p25-filter__btn.is-active { background: var(--accent); color: #fff; border-color: var(--accent); }',
'/* \u53f3\u30ab\u30e9\u30e0\uff1a\u51fa\u54c1\u8005\u30e9\u30d9\u30eb */',
'.p25-side-creator__head {',
'  font-size: .65rem; font-weight: 700; letter-spacing: .12em;',
'  text-transform: uppercase; color: var(--muted); margin-bottom: 10px;',
'}',
'/* \u53f3\u30ab\u30e9\u30e0\uff1a\u30b5\u30d6\u30da\u30fc\u30b8\u30ca\u30d3 */',
'.p2-side-subnav { display: flex; flex-direction: column; gap: 2px; }',
'.p2-side-subnav__title {',
'  font-size: .65rem; font-weight: 700; letter-spacing: .1em;',
'  color: var(--muted); margin-bottom: 8px;',
'}',
'.p2-side-subnav__item {',
'  display: flex; align-items: center; gap: 8px;',
'  padding: 9px 10px; border-radius: 8px;',
'  font-size: .8rem; color: var(--ink); text-decoration: none;',
'  transition: background .15s;',
'}',
'.p2-side-subnav__item:hover { background: var(--warm); }',
'.p2-side-subnav__item.is-active { background: var(--warm); font-weight: 600; color: var(--accent); }',
'.p2-side-subnav__chev { margin-left: auto; color: var(--muted); flex-shrink: 0; }'
].join('\n');

fs.appendFileSync(cf, newCss, 'utf8');
console.log('CSS done +' + newCss.length);
