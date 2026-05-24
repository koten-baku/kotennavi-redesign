var fs = require('fs');

/* ─── 1. HTML ─── */
var hf = 'D:/user/baku/claude-code/kotennavi-redesign/kotennavi-p2-5.html';
var html = fs.readFileSync(hf, 'utf8');
var lf = html.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

// 1-A: フィルター div クラス変更
html = html.replace('class="p2-5-filter"', 'class="p25-filter"');
html = html.replace(/class="p2-5-filter__btn/g, 'class="p25-filter__btn');

// 1-B: フィルターボタンを販売状態別に置換（id="p25Filter"> と </div> の間）
var fStart = html.indexOf('id="p25Filter">') + 'id="p25Filter">'.length;
var fEnd   = html.indexOf('</div>', fStart);
var newBtns = lf
  + '            <button class="p25-filter__btn is-active" data-filter="all">\u3059\u3079\u3066</button>' + lf
  + '            <button class="p25-filter__btn" data-filter="forsale">\u8ca9\u58f2\u4e2d</button>' + lf
  + '            <button class="p25-filter__btn" data-filter="sold">SOLD</button>' + lf
  + '          ';
html = html.slice(0, fStart) + newBtns + html.slice(fEnd);

// 1-C: セクション④⑤ → 2カラムレイアウト
var OLD_SEC = '      <!-- \u2463 \u51fa\u54c1\u8005\u30fb\u51fa\u54c1\u4f5c\u5bb6\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb -->';
var OLD_END = '    </div><!-- /ktn-content -->';
var si = html.indexOf(OLD_SEC);
var ei = html.indexOf(OLD_END);
if (si === -1 || ei === -1) { console.error('HTML markers not found si='+si+' ei='+ei); process.exit(1); }

var N = lf; // shorthand
var NEW_SEC = [
'      <!-- 2\u30ab\u30e9\u30e0\u30ec\u30a4\u30a2\u30a6\u30c8 -->',
'      <div class="p25-layout">',
'',
'        <!-- \u5de6\uff1a\u30e1\u30a4\u30f3\u30b3\u30f3\u30c6\u30f3\u30c4 -->',
'        <div class="p25-main">',
'',
'          <!-- \u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u30ab\u30fc\u30c9 -->',
'          <article class="p2-4-creator-card">',
'            <div class="p2-4-creator-card__head">',
'              <div class="p2-4-creator-card__avatar" style="background:linear-gradient(145deg,#8aaa6a,#4a7a2a);color:rgba(255,255,255,.85)">\u900f</div>',
'              <div class="p2-4-creator-card__info">',
'                <div class="p2-4-creator-card__badges">',
'                  <span class="cb cb-person cb-creator">creator</span>',
'                  <span class="sb sb-open">\u958b\u50ac\u4e2d</span>',
'                  <span class="lb lb-liaison">LIAISON</span>',
'                </div>',
'                <div class="p2-4-creator-card__name">\u7530\u4e2d \u900f</div>',
'                <div class="p2-4-creator-card__name-en">Toru Tanaka</div>',
'                <div class="p2-4-creator-card__genre">\u6cb9\u5f69\u30fb\u73fe\u4ee3\u7f8e\u8853\u30fb\u30df\u30af\u30b9\u30c8\u30e1\u30c7\u30a3\u30a2</div>',
'                <div class="p2-4-creator-card__counts">',
'                  <div class="p2-4-creator-count">',
'                    <div class="p2-4-creator-count__num">12</div>',
'                    <div class="p2-4-creator-count__lbl">exhibitions</div>',
'                  </div>',
'                  <div class="p2-4-creator-count" style="margin-left:14px">',
'                    <div class="p2-4-creator-count__num">247</div>',
'                    <div class="p2-4-creator-count__lbl">watchers</div>',
'                  </div>',
'                </div>',
'              </div>',
'              <div class="p2-4-creator-card__action">',
'                <button class="p2-4-creator-card__watch" id="watchBtn0">',
'                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="13" height="13"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
'                  watch',
'                </button>',
'              </div>',
'            </div>',
'            <div class="p2-4-creator-card__bio">',
'              <p>1985\u5e74\u6771\u4eac\u751f\u307e\u308c\u3002\u6b66\u8535\u91ce\u7f8e\u8853\u5927\u5b66\u6cb9\u7d75\u5b66\u79d1\u5352\u696d\u5f8c\u3001\u30cb\u30e5\u30fc\u30e8\u30fc\u30af\u306e\u30a2\u30fc\u30c8\u30b9\u30bf\u30b8\u30aa\u306b\u5728\u7c4d\u3002\u5e30\u56fd\u5f8c\u3001\u300c\u8a00\u8a9e\u3068\u611f\u899a\u306e\u5883\u754c\u300d\u3092\u30c6\u30fc\u30de\u306b\u3057\u305f\u7d75\u753b\u4f5c\u54c1\u3092\u767a\u8868\u3057\u7d9a\u3051\u308b\u3002</p>',
'              <p style="margin-top:8px">\u65e5\u672c\u8a9e\u7279\u6709\u306e\u97f3\u8c61\u5fb4\u8a9e\uff08\u30aa\u30ce\u30de\u30c8\u30da\uff09\u304c\u6301\u3064\u97f3\u306e\u8cea\u611f\u3092\u3001\u8272\u5f69\u3068\u7b46\u8de1\u306b\u3088\u3063\u3066\u8996\u899a\u5316\u3059\u308b\u72ec\u81ea\u306e\u624b\u6cd5\u3092\u78ba\u7acb\u3002\u56fd\u5185\u5916\u306e\u5c55\u89a7\u4f1a\u306b\u591a\u6570\u53c2\u52a0\u30022024\u5e74\u3088\u308a LIAISON \u8a8d\u5b9a\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u3002</p>',
'            </div>',
'            <div class="p2-4-creator-card__tags">',
'              <a href="/p10?tag=\u6cb9\u5f69" class="p2-4-creator-card__tag">\u6cb9\u5f69</a>',
'              <a href="/p10?tag=\u73fe\u4ee3\u7f8e\u8853" class="p2-4-creator-card__tag">\u73fe\u4ee3\u7f8e\u8853</a>',
'              <a href="/p10?tag=\u30df\u30af\u30b9\u30c8\u30e1\u30c7\u30a3\u30a2" class="p2-4-creator-card__tag">\u30df\u30af\u30b9\u30c8\u30e1\u30c7\u30a3\u30a2</a>',
'              <a href="/p10?tag=\u8a00\u8a9e\u3068\u611f\u899a" class="p2-4-creator-card__tag">\u8a00\u8a9e\u3068\u611f\u899a</a>',
'              <a href="/p10?area=tokyo" class="p2-4-creator-card__tag">\u6771\u4eac</a>',
'            </div>',
'            <div class="p2-4-creator-card__links">',
'              <a href="kotennavi-p3.html" class="p2-4-creator-card__profile-link">',
'                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
'                \u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u30da\u30fc\u30b8\u3078',
'              </a>',
'            </div>',
'          </article>',
'',
'          <!-- \u5c55\u89a7\u4f1a\u30bf\u30b0 -->',
'          <div class="p2-sub-tags">',
'            <div class="p2-sub-tags__label">\u30bf\u30b0 \u00b7 Tags</div>',
'            <ul class="p2-1-tag-pills" aria-label="\u30bf\u30b0">',
'              <li><a class="p2-1-tag-pill" href="/p10?tag=\u7d75\u753b">\u7d75\u753b</a></li>',
'              <li><a class="p2-1-tag-pill" href="/p10?tag=\u73fe\u4ee3\u7f8e\u8853">\u73fe\u4ee3\u7f8e\u8853</a></li>',
'              <li><a class="p2-1-tag-pill" href="/p10?tag=\u30aa\u30ce\u30de\u30c8\u30da">\u30aa\u30ce\u30de\u30c8\u30da</a></li>',
'              <li><a class="p2-1-tag-pill" href="/p10?tag=\u8a00\u8a9e">\u8a00\u8a9e</a></li>',
'              <li><a class="p2-1-tag-pill" href="/p10?area=shibuya">\u6e0b\u8c37</a></li>',
'            </ul>',
'          </div>',
'',
'          <!-- \u304a\u3059\u3059\u3081\u306e\u5c55\u89a7\u4f1a -->',
'          <section class="p2-sub-rec" aria-label="\u304a\u3059\u3059\u3081\u306e\u5c55\u89a7\u4f1a">',
'            <div class="p2-sub-rec__head">',
'              <h2 class="p2-sub-rec__title">\u304a\u3059\u3059\u3081\u306e\u5c55\u89a7\u4f1a<span class="ktn-sec-en">Recommended</span></h2>',
'              <a href="kotennavi-p2.html" class="p2-sub-rec__more">\u3059\u3079\u3066\u898b\u308b \u2192</a>',
'            </div>',
'            <div class="p2-sub-rec__grid" id="p25RecGrid"><!-- JS\u751f\u6210 --></div>',
'          </section>',
'',
'        </div><!-- /p25-main -->',
'',
'        <!-- \u53f3\uff1a\u30b5\u30a4\u30c9\u30da\u30a4\u30f3 -->',
'        <aside class="p25-side">',
'',
'          <!-- \u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u30bf\u30a4\u30eb\u30ab\u30fc\u30c9 -->',
'          <a class="cc" href="kotennavi-p3.html">',
'            <div class="cc__top">',
'              <div class="cc__avatar av-c1"><div class="cc__avatar-ph">\u900f</div></div>',
'              <div class="cc__badge-row">',
'                <span class="cb cb-creator">creator</span>',
'                <span class="sb">\u958b\u50ac\u4e2d/\u958b\u50ac\u4e88\u5b9a</span>',
'              </div>',
'              <div class="cc__name">\u7530\u4e2d \u900f</div>',
'              <div class="cc__genre">\u6cb9\u5f69\u30fb\u73fe\u4ee3\u7f8e\u8853</div>',
'              <div class="cc__watch">',
'                <button class="ktn-btn" onclick="this.classList.toggle(\'on\');event.preventDefault()">',
'                  <svg width="14" height="14"><use href="#icon-watch" color="#7a8a99"/></svg>',
'                  watch<span class="tip">\u30a6\u30a9\u30c3\u30c1\u3059\u308b</span>',
'                </button>',
'              </div>',
'            </div>',
'            <div class="cc__foot">',
'              <div class="pc-counts">',
'                <span class="pc-count pc-count--exh"><span class="exh-icon"><svg width="13" height="13"><use href="#icon-exh"/></svg></span>12</span>',
'                <span class="sep"></span>',
'                <span class="pc-count pc-count--watch"><svg width="12" height="12"><use href="#icon-watch" color="#7a8a99"/></svg>248</span>',
'              </div>',
'              <div class="cc__page-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="11" height="11"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u30da\u30fc\u30b8\u3078</div>',
'            </div>',
'          </a>',
'',
'          <!-- \u30b5\u30d6\u30e1\u30cb\u30e5\u30fc\u30ea\u30f3\u30af -->',
'          <div class="p2-2-side-links">',
'            <a href="kotennavi-p2.html" class="p2-2-side-link">',
'              <div class="p2-2-side-link__icon">',
'                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y1="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
'              </div>',
'              <div class="p2-2-side-link__body"><div class="p2-2-side-link__title">\u6982\u8981</div></div>',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'            <a href="kotennavi-p2-1.html" class="p2-2-side-link">',
'              <div class="p2-2-side-link__icon">',
'                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
'              </div>',
'              <div class="p2-2-side-link__body"><div class="p2-2-side-link__title">\u30b9\u30b1\u30b8\u30e5\u30fc\u30eb</div></div>',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'            <a href="kotennavi-p2-2.html" class="p2-2-side-link">',
'              <div class="p2-2-side-link__icon">',
'                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
'              </div>',
'              <div class="p2-2-side-link__body"><div class="p2-2-side-link__title">\u958b\u50ac\u5834\u6240\u30fb\u30a2\u30af\u30bb\u30b9</div></div>',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'            <a href="kotennavi-p2-3.html" class="p2-2-side-link">',
'              <div class="p2-2-side-link__icon">',
'                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
'              </div>',
'              <div class="p2-2-side-link__body"><div class="p2-2-side-link__title">\u8a73\u7d30</div></div>',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'            <a href="kotennavi-p2-4.html" class="p2-2-side-link">',
'              <div class="p2-2-side-link__icon">',
'                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
'              </div>',
'              <div class="p2-2-side-link__body"><div class="p2-2-side-link__title">\u51fa\u5c55\u8005</div></div>',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'            <a href="kotennavi-p2-5.html" class="p2-2-side-link is-active">',
'              <div class="p2-2-side-link__icon" style="color:var(--lr)">',
'                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
'              </div>',
'              <div class="p2-2-side-link__body"><div class="p2-2-side-link__title">LIAISON \u4f5c\u54c1\u4e00\u89a7</div></div>',
'              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="9 18 15 12 9 6"/></svg>',
'            </a>',
'          </div>',
'',
'          <!-- \u8fd1\u304f\u306e\u5c55\u89a7\u4f1a -->',
'          <div class="p2-sub-nearby">',
'            <div class="p2-sub-nearby__head">',
'              <span class="p2-sub-nearby__title">\u8fd1\u304f\u306e\u5c55\u89a7\u4f1a</span>',
'              <a href="kotennavi-p2.html?filter=near" class="p2-sub-nearby__more">\u3059\u3079\u3066 \u2192</a>',
'            </div>',
'            <div id="p25NearbyList"><!-- JS\u751f\u6210 --></div>',
'          </div>',
'',
'        </aside><!-- /p25-side -->',
'',
'      </div><!-- /p25-layout -->',
'',
'    </div><!-- /ktn-content -->'
].join(lf);

html = html.slice(0, si) + NEW_SEC + html.slice(ei + OLD_END.length);
fs.writeFileSync(hf, html, 'utf8');
console.log('HTML done', html.length);


/* ─── 2. kotennavi-pages.js ─── */
var jf = 'D:/user/baku/claude-code/kotennavi-redesign/kotennavi-pages.js';
var js  = fs.readFileSync(jf, 'utf8');

// 2-A: renderWork に data-status 追加
var OLD_RETURN = "    return '<a class=\"' + cardClass + '\" href=\"#\" data-creator=\"' + w.creator + '\">' +";
var NEW_RETURN = [
"    var statusMap = { sale: 'forsale', inquiry: 'forsale', nsale: 'nsale', sold: 'sold' };",
"    var dataStatus = statusMap[w.status] || 'nsale';",
"    return '<a class=\"' + cardClass + '\" href=\"#\" data-creator=\"' + w.creator + '\" data-status=\"' + dataStatus + '\">' +"
].join('\n');
if (js.indexOf(OLD_RETURN) === -1) { console.error('renderWork return not found'); process.exit(1); }
js = js.replace(OLD_RETURN, NEW_RETURN);

// 2-B: フィルター〜プロフィールコードを一括置換
// 開始マーカー: "  /* フィルター */"  終了マーカー: KTN.pages['p2-5'] の閉じブレース "};"
var JS_OLD_START = '  /* \u30d5\u30a3\u30eb\u30bf\u30fc */';
// "  /* フィルター */\n  var filterBtns" から "  }\n};" (p2-5の終わり) まで
var jsStart = js.indexOf(JS_OLD_START);
if (jsStart === -1) { console.error('JS filter marker not found'); process.exit(1); }
// p2-5関数の終了 "};" を見つける (フィルター以降の最初の "\n};")
var jsEnd = js.indexOf('\n};', jsStart);
if (jsEnd === -1) { console.error('JS end marker not found'); process.exit(1); }
jsEnd += '\n};'.length; // include the marker

var NEW_JS = [
'',
'  /* \u30d5\u30a3\u30eb\u30bf\u30fc\uff08\u8ca9\u58f2\u72b6\u614b\u5225\uff09 */',
'  (function () {',
'    document.querySelectorAll(\'.p25-filter__btn\').forEach(function (btn) {',
'      btn.addEventListener(\'click\', function () {',
'        document.querySelectorAll(\'.p25-filter__btn\').forEach(function (b) { b.classList.remove(\'is-active\'); });',
'        this.classList.add(\'is-active\');',
'        var f = this.dataset.filter;',
'        var cards = grid ? grid.querySelectorAll(\'.p25c\') : [];',
'        var shown = 0;',
'        cards.forEach(function (c) {',
'          var show = (f === \'all\' || c.dataset.status === f);',
'          c.hidden = !show;',
'          if (show) shown++;',
'        });',
'        var count = document.getElementById(\'p25WorksCount\');',
'        if (count) count.textContent = \'\u5168\' + shown + \'\u70b9\';',
'      });',
'    });',
'  })();',
'',
'  /* \u2500\u2500 \u8fd1\u304f\u306e\u5c55\u89a7\u4f1a \u2500\u2500 */',
'  (function () {',
'    var list = document.getElementById(\'p25NearbyList\');',
'    if (!list) return;',
'    var NEARBY = [',
'      { title: \'\u7dda\u3068\u4f59\u767d\u306e\u8a69\u5b66\', venue: \'\u6e0b\u8c37\u30a2\u30fc\u30c8\u30e9\u30dc\', bg: \'linear-gradient(155deg,#e0d8c8,#b4a88a)\', tc: \'rgba(0,0,0,.28)\', liaison: false },',
'      { title: \'\u5149\u306e\u7834\u7247\', venue: \'GALLERY X\', bg: \'linear-gradient(155deg,#c8d0e0,#8898b8)\', tc: \'rgba(255,255,255,.6)\', liaison: true },',
'      { title: \'\u3046\u3064\u308d\u3044\', venue: \'\u6771\u4eac\u90fd\u73fe\u4ee3\u7f8e\u8853\u9928\', bg: \'linear-gradient(155deg,#d0c8e0,#8878b4)\', tc: \'rgba(255,255,255,.6)\', liaison: false },',
'    ];',
'    list.innerHTML = NEARBY.map(function (e) {',
'      return \'<a href="kotennavi-p2.html" class="p2-sub-near-item">\' +',
'        \'<div class="p2-sub-near-item__poster" style="background:\' + e.bg + \';color:\' + e.tc + \'">\' +',
'        (e.liaison ? \'<div class="p2-sub-near-item__ldot"></div>\' : \'\') +',
'        e.title.slice(0, 4) +',
'        \'</div>\' +',
'        \'<div class="p2-sub-near-item__body">\' +',
'        \'<div class="p2-sub-near-item__name">\' + e.title + \'</div>\' +',
'        \'<div class="p2-sub-near-item__venue">\' + e.venue + \'</div>\' +',
'        \'</div>\' +',
'        \'<span class="p2-sub-near-item__badge">\u958b\u50ac\u4e2d</span>\' +',
'        \'</a>\';',
'    }).join(\'\');',
'  })();',
'',
'  /* \u2500\u2500 \u304a\u3059\u3059\u3081\u306e\u5c55\u89a7\u4f1a \u2500\u2500 */',
'  (function () {',
'    var g = document.getElementById(\'p25RecGrid\');',
'    if (!g) return;',
'    var DATA = [',
'      { title: \'\u6625\u306e\u666f\u8272\u5c55\', venue: \'\u4ee3\u5b98\u5c71\u30d2\u30eb\u30b5\u30a4\u30c9F\', bg: \'linear-gradient(155deg,#f0e0d0,#c8a888)\', tc: \'rgba(0,0,0,.28)\', s: \'02.20\', e: \'03.10\', liaison: false, int: 21, ci: 4 },',
'      { title: \'\u73fe\u4ee3\u5f6b\u523b\u306e\u5192\u967a\', venue: \'\u795e\u697d\u5742BOOK\u30fbART\', bg: \'linear-gradient(155deg,#e8d0d8,#b88898)\', tc: \'rgba(255,255,255,.6)\', s: \'02.17\', e: \'03.07\', liaison: true, int: 19, ci: 3 },',
'      { title: \'\u30dd\u30b9\u30c8\u30ab\u30fc\u30c9\u5c55\', venue: \'\u5409\u7965\u5bfa M&G\', bg: \'linear-gradient(155deg,#d0e8e0,#88b8a8)\', tc: \'rgba(0,0,0,.28)\', s: \'02.22\', e: \'03.12\', liaison: false, int: 38, ci: 7 },',
'    ];',
'    g.innerHTML = DATA.map(function (e, i) {',
'      return \'<a href="kotennavi-p2.html" class="p2-ec" style="animation-delay:\' + (i * 60) + \'ms">\' +',
'        (e.liaison ? \'<span class="p2-ec__ldot"></span>\' : \'\') +',
'        \'<div class="p2-ec__poster" style="background:\' + e.bg + \';color:\' + e.tc + \'">\' +',
'        \'<span class="p2-ec__poster-txt">\' + e.title + \'</span>\' +',
'        \'<div class="p2-ec__poster-bar"><div class="p2-ec__drow">\' +',
'        \'<span class="p2-ec__dy">2026.</span><span class="p2-ec__dmd">\' + e.s + \'</span>\' +',
'        \'<span class="p2-ec__dsep">\u2013</span><span class="p2-ec__dmd">\' + e.e + \'</span>\' +',
'        \'</div><div class="p2-ec__dmeta"><span class="p2-ec__dbadge p2-ec__dbadge--open">\u958b\u50ac\u4e2d</span></div></div>\' +',
'        \'</div>\' +',
'        \'<div class="p2-ec__body">\' +',
'        \'<div class="p2-ec__tr"><span class="p2-ec__tag">\u7d75\u753b</span>\' +',
'        \'<button class="p2-ec__bm" onclick="event.preventDefault();this.classList.toggle(\\\'is-active\\\')" aria-label="\u30d6\u30c3\u30af\u30de\u30fc\u30af">\' +',
'        \'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>\' +',
'        \'</button></div>\' +',
'        \'<div class="p2-ec__name">\' + e.title + \'</div>\' +',
'        \'<div class="p2-ec__venue">\' + e.venue + \'</div>\' +',
'        \'<div class="p2-ec__foot">\' +',
'        \'<span class="p2-ec__cnt">\u2764 \' + e.int + \'</span>\' +',
'        \'<span class="p2-ec__cnt">\uD83D\uDCCD \' + e.ci + \'</span>\' +',
'        \'</div>\' +',
'        \'</div>\' +',
'        \'</a>\';',
'    }).join(\'\');',
'  })();',
'};'
].join('\n');

js = js.slice(0, jsStart) + NEW_JS + js.slice(jsEnd);
fs.writeFileSync(jf, js, 'utf8');
console.log('JS done', js.length);


/* ─── 3. CSS ─── */
var cf = 'D:/user/baku/claude-code/kotennavi-redesign/kotennavi-common.css';
var css = fs.readFileSync(cf, 'utf8');

var ADD_CSS = '\n\n/* ── p2-5 LIAISON 2カラムレイアウト + フィルター ── */\n'
  + '.p25-layout { display: grid; grid-template-columns: 1fr 280px; gap: 0 24px; align-items: start; margin-top: 20px; }\n'
  + '.p25-main { min-width: 0; }\n'
  + '.p25-side { display: flex; flex-direction: column; gap: 12px; margin-top: 0; }\n'
  + '.p25-side .cc { width: 100%; box-sizing: border-box; }\n'
  + '.p25-filter { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 22px; }\n'
  + '.p25-filter__btn {\n'
  + '  padding: 5px 14px; font-size: .72rem; font-family: var(--fs); font-weight: 500;\n'
  + '  border: 1px solid var(--border); border-radius: 14px;\n'
  + '  background: #fff; color: var(--muted); cursor: pointer; transition: all .15s;\n'
  + '}\n'
  + '.p25-filter__btn:hover { border-color: #c8a96e; color: #c8a96e; }\n'
  + '.p25-filter__btn.is-active { background: #c8a96e; color: #fff; border-color: #c8a96e; }\n'
  + '.p2-2-side-link.is-active { background: var(--warm); font-weight: 600; color: var(--accent); z-index: 1; position: relative; }\n'
  + '.p2-2-side-link.is-active .p2-2-side-link__icon { background: rgba(var(--accent-rgb, 26,93,130),.08); }\n'
  + '@media (max-width: 720px) {\n'
  + '  .p25-layout { grid-template-columns: 1fr; }\n'
  + '  .p25-side { order: -1; }\n'
  + '}\n';

css += ADD_CSS;
fs.writeFileSync(cf, css, 'utf8');
console.log('CSS done +' + ADD_CSS.length);
