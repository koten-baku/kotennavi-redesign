var fs = require('fs');

var hf = 'D:/user/baku/claude-code/kotennavi-redesign/kotennavi-p2-5.html';
var html = fs.readFileSync(hf, 'utf8');
var lf = html.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

/* ─── 修正1-A: CREATORS セクションタイトルを追加（クリエイタープロフィールカード直前） ─── */
var BEFORE_CARD = '          <!-- \u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u30ab\u30fc\u30c9 -->';
var CREATORS_HEAD = '          <!-- \u30bb\u30af\u30b7\u30e7\u30f3\u30bf\u30a4\u30c8\u30eb: CREATORS -->\n'
  + '          <div class="p2-5-works__head">\n'
  + '            <span class="p2-5-works__title">CREATORS</span>\n'
  + '            <span class="p2-5-works__sep">/</span>\n'
  + '            <span class="p2-5-works__title-ja">\u51fa\u54c1\u4f5c\u5bb6\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb</span>\n'
  + '          </div>\n'
  + '\n'
  + BEFORE_CARD;
if (html.indexOf(BEFORE_CARD) === -1) { console.error('1-A marker not found'); process.exit(1); }
html = html.replace(BEFORE_CARD, CREATORS_HEAD);

/* ─── 修正1-B: EXHIBITORS セクションタイトルを追加（右ペインタイルカード直前） ─── */
var BEFORE_CC = '          <!-- \u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u30bf\u30a4\u30eb\u30ab\u30fc\u30c9 -->';
var EXHIBITORS_HEAD = '          <!-- \u30bb\u30af\u30b7\u30e7\u30f3\u30bf\u30a4\u30c8\u30eb: EXHIBITORS -->\n'
  + '          <div class="p2-5-works__head">\n'
  + '            <span class="p2-5-works__title">EXHIBITORS</span>\n'
  + '            <span class="p2-5-works__sep">/</span>\n'
  + '            <span class="p2-5-works__title-ja">\u51fa\u54c1\u8005</span>\n'
  + '          </div>\n'
  + '\n'
  + BEFORE_CC;
if (html.indexOf(BEFORE_CC) === -1) { console.error('1-B marker not found'); process.exit(1); }
html = html.replace(BEFORE_CC, EXHIBITORS_HEAD);

/* ─── 修正2: タグを削除（p2-4-creator-card__tags ブロック全体） ─── */
var TAG_START = lf + '            <div class="p2-4-creator-card__tags">';
var TAG_END   = lf + '            </div>' + lf + '            <div class="p2-4-creator-card__links">';
var tsi = html.indexOf(TAG_START);
var tei = html.indexOf(TAG_END);
if (tsi === -1 || tei === -1) { console.error('tag markers not found'); process.exit(1); }
html = html.slice(0, tsi) + lf + '            <div class="p2-4-creator-card__links">' + html.slice(tei + TAG_END.length);

/* ─── 修正3: LIAISONバッジを lb-dot に変更 ─── */
html = html.replace(
  '<span class="lb lb-liaison">LIAISON</span>',
  '<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>'
);

/* ─── 修正4: カウンターを pc-counts 構造に変更 ─── */
var OLD_COUNTS = '                <div class="p2-4-creator-card__counts">' + lf
  + '                  <div class="p2-4-creator-count">' + lf
  + '                    <div class="p2-4-creator-count__num">12</div>' + lf
  + '                    <div class="p2-4-creator-count__lbl">exhibitions</div>' + lf
  + '                  </div>' + lf
  + '                  <div class="p2-4-creator-count" style="margin-left:14px">' + lf
  + '                    <div class="p2-4-creator-count__num">247</div>' + lf
  + '                    <div class="p2-4-creator-count__lbl">watchers</div>' + lf
  + '                  </div>' + lf
  + '                </div>';
var NEW_COUNTS = '                <div class="pc-counts">\n'
  + '                  <span class="pc-count pc-count--exh"><span class="exh-icon"><svg width="13" height="13"><use href="#icon-exh"/></svg></span>12</span>\n'
  + '                  <span class="sep"></span>\n'
  + '                  <span class="pc-count pc-count--watch"><svg width="11" height="11"><use href="#icon-watch" color="#7a8a99"/></svg>247</span>\n'
  + '                </div>';
if (html.indexOf(OLD_COUNTS) === -1) { console.error('counts marker not found'); process.exit(1); }
html = html.replace(OLD_COUNTS, NEW_COUNTS);

/* ─── 修正5: タイル型 .cc → 水平型 .cc--h に置換 ─── */
var OLD_CC_START = '          <a class="cc" href="kotennavi-p3.html">';
var OLD_CC_END   = '          </a>' + lf + lf + '          <!-- \u30b5\u30d6\u30e1\u30cb\u30e5\u30fc\u30ea\u30f3\u30af -->';
var csi = html.indexOf(OLD_CC_START);
var cei = html.indexOf(OLD_CC_END);
if (csi === -1 || cei === -1) { console.error('cc markers not found'); process.exit(1); }
var NEW_CCH = '          <a class="cc cc--h" href="kotennavi-p3.html">\n'
  + '            <div class="cc__top">\n'
  + '              <div class="cc__avatar av-c1"><div class="cc__avatar-ph" style="font-size:.9rem">\u900f</div></div>\n'
  + '            </div>\n'
  + '            <div class="cc__main">\n'
  + '              <div class="cc__info">\n'
  + '                <div class="cc__badge-row">\n'
  + '                  <span class="cb cb-creator">creator</span>\n'
  + '                  <span class="sb sb-sm">\u958b\u50ac\u4e2d/\u958b\u50ac\u4e88\u5b9a</span>\n'
  + '                </div>\n'
  + '                <div class="cc__name">\u7530\u4e2d \u900f</div>\n'
  + '                <div class="cc__genre">\u6cb9\u5f69\u30fb\u73fe\u4ee3\u7f8e\u8853</div>\n'
  + '              </div>\n'
  + '              <div class="cc__hfoot">\n'
  + '                <span class="pc-count pc-count--exh"><span class="exh-icon"><svg width="13" height="13"><use href="#icon-exh"/></svg></span>12</span>\n'
  + '                <span class="sep"></span>\n'
  + '                <span class="pc-count pc-count--watch"><svg width="11" height="11"><use href="#icon-watch" color="#7a8a99"/></svg>248</span>\n'
  + '                <button class="ktn-btn" onclick="this.classList.toggle(\'on\');event.preventDefault()">\n'
  + '                  <svg width="12" height="12"><use href="#icon-watch" color="#7a8a99"/></svg>\n'
  + '                  watch<span class="tip">\u30a6\u30a9\u30c3\u30c1\u3059\u308b</span>\n'
  + '                </button>\n'
  + '              </div>\n'
  + '            </div>\n'
  + '          </a>\n'
  + '\n'
  + '          <!-- \u30b5\u30d6\u30e1\u30cb\u30e5\u30fc\u30ea\u30f3\u30af -->';
html = html.slice(0, csi) + NEW_CCH + html.slice(cei + OLD_CC_END.length);

fs.writeFileSync(hf, html, 'utf8');
console.log('HTML done', html.length);

/* ─── CSS: .p25-side .cc--h { width: 100% } を追記 ─── */
var cf  = 'D:/user/baku/claude-code/kotennavi-redesign/kotennavi-common.css';
var css = fs.readFileSync(cf, 'utf8');
var ADD = '\n.p25-side .cc--h { width: 100%; box-sizing: border-box; }\n';
css += ADD;
fs.writeFileSync(cf, css, 'utf8');
console.log('CSS done +' + ADD.length);
