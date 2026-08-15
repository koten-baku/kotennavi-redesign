/* kotennavi-common.js
   サイドバー・ボトムナビ・フッター 共通ロジック
   ヘッダーは各ページで window.ktnRender() を定義して使用する
*/

/* ══════════════════════════════════
   共通状態管理
   各ページHTMLの <script> より先に読み込み、
   ページ側で ktnState を上書きして使う:

     window.ktnState = { page: 'p2-3', role: 'guest' };

   Drupal では role をサーバー変数から渡す。
══════════════════════════════════ */
window.ktnState = window.ktnState || { page: 'p1', role: 'guest' };

/* curRole / curPage は ktnState のプロキシ */
Object.defineProperty(window, 'curRole', {
  get() { return window.ktnState.role; },
  set(v) { window.ktnState.role = v; }
});
Object.defineProperty(window, 'curPage', {
  get() { return window.ktnState.page; },
  set(v) { window.ktnState.page = v; }
});


/* ══════════════════════════════════
   SVG ライブラリ
══════════════════════════════════ */
const I = {
  heart: `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  share: `<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  edit: `<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  plus: `<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  trash: `<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  chart: `<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  grid: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  file: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
  warn: `<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>`,
  fix: `<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  info: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor" stroke="none"/></svg>`,
  watch: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/></svg>`,
  qr: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="21"/><line x1="21" y1="14" x2="21" y2="21"/><line x1="17" y1="14" x2="17" y2="17"/></svg>`,
  print: `<svg viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  sales: `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  desk: `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  frame: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="1"/><rect x="6" y="6" width="12" height="12" rx=".5"/><line x1="3" y1="3" x2="6" y2="6"/><line x1="21" y1="3" x2="18" y2="6"/><line x1="3" y1="21" x2="6" y2="18"/><line x1="21" y1="21" x2="18" y2="18"/></svg>`,
  user: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  key: `<svg viewBox="0 0 24 24"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6M15.5 7.5l3 3"/></svg>`,
  bell: `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  send: `<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  clone: `<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v4M14 4v4M2 8h20"/></svg>`,
  star: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  shop: `<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  chev: `<polyline points="6 9 12 15 18 9"/>`,
};


function ic(k) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="13" height="13">${(I[k] || '').replace(/<svg[^>]*>/, '').replace('</svg>', '')}</svg>`;
}
function ic16(k) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16">${(I[k] || '').replace(/<svg[^>]*>/, '').replace('</svg>', '')}</svg>`;
}
/* icon helper — svgにstroke等をラップ */


/* ══════════════════════════════════
   トースト通知
══════════════════════════════════ */
var _toastTimer = null;
var _toastLast = { msg: '', at: 0 };
function showToast(msg) {
  var el = document.getElementById('ktnToast');
  if (!el) return;
  /* 同一メッセージが至近（400ms以内）で連続した場合は無視＝共有handleとページ個別ハンドラの二重発火を畳む */
  var now = Date.now();
  if (msg === _toastLast.msg && now - _toastLast.at < 400) return;
  _toastLast.msg = msg; _toastLast.at = now;
  el.textContent = msg;
  el.classList.add('is-visible');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function () { el.classList.remove('is-visible'); _toastTimer = null; }, 2500);
}
window.KTN = window.KTN || {};
KTN.toast = showToast;

/* ══════════════════════════════════
   QRコード モーダル（list=作品リスト／venue=会場チェックイン／creator・gallery=ウォッチ用）
   ・.ktn-auth-overlay / .ktn-auth-modal のシェルを再利用
══════════════════════════════════ */
const KTN_LISTQR_KINDS = {
  list: { label: '作品リスト', url: 'https://koten-navi.com/p2-6', sub: 'スマホで読み取ると、会場配布用のリストが開きます。<br>画像を保存して会場ポスターやSNSにも掲示できます。' },
  venue: { label: '会場チェックイン', url: 'https://koten-navi.com/p2', sub: 'スマホで読み取ると、この展覧会のページが開きます。<br>来場者はそのままチェックインやレビュー投稿ができます。画像を保存して受付・壁面に掲示できます。' },
  creator: { label: '田中 透', url: 'https://koten-navi.com/p3', sub: 'スマホで読み取ると、あなたのクリエイターページが開きます。<br>SNS・DM・名刺等に掲示すると、ウォッチしてくれる人が増えやすくなります。' },
  gallery: { label: 'Gallery SOIL 渋谷', url: 'https://koten-navi.com/p4', sub: 'スマホで読み取ると、ギャラリーページが開きます。<br>SNS・DM・名刺等に掲示すると、ウォッチしてくれる人が増えやすくなります。' }
};
function ktnListQr(kind) {
  var def = KTN_LISTQR_KINDS[kind] || KTN_LISTQR_KINDS.list;
  var label = def.label;
  var url = def.url;
  var el = document.getElementById('ktnListQrModal');
  if (!el) {
    el = document.createElement('div');
    el.className = 'ktn-auth-overlay';
    el.id = 'ktnListQrModal';
    el.setAttribute('onclick', 'ktnListQrClose(event)');
    el.innerHTML =
      '<div class="ktn-auth-modal ktn-listqr">'
      + '<div class="ktn-auth-top">'
      + '<button class="ktn-auth-close" onclick="ktnListQrClose()">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      + '</button>'
      + '<div class="ktn-auth-ttl" id="ktnListQrTtl"></div>'
      + '<div class="ktn-auth-sub" id="ktnListQrSub"></div>'
      + '</div>'
      + '<div class="ktn-auth-body">'
      + '<div class="ktn-listqr__code" aria-hidden="true">'
      + '<svg viewBox="0 0 44 44" width="180" height="180" shape-rendering="crispEdges">'
      + '<rect width="44" height="44" fill="#fff"/>'
      + '<path fill="#231815" d="M4 4h7v7H4zM6 6v3h3V6zM13 4h2v2h-2zM17 4h2v4h-2zM21 4h2v2h-2zM25 4h2v2h2v2h-2v2h-2v-2h-2V6h2zM33 4h7v7h-7zM35 6v3h3V6zM15 6h2v2h-2zM13 8h2v2h-2zM4 13h7v7H4zM6 15v3h3v-3zM13 13h2v2h-2zM17 13h2v2h2v2h-2v2h-2v-2h-2v-2h2zM23 13h2v4h-2zM27 13h2v2h-2zM31 13h2v2h2v2h-2v2h-2v-2h-2v-2h2zM37 13h2v2h-2zM33 15h2v2h-2zM33 33h7v7h-7zM35 35v3h3v-3zM13 33h2v2h-2zM17 33h2v4h-2zM21 33h2v2h-2zM25 33h2v2h-2zM29 33h2v2h-2zM13 37h2v2h-2zM21 37h2v2h-2zM25 37h2v2h-2zM4 33h7v7H4zM6 35v3h3v-3zM4 22h2v2h-2zM8 22h2v2h-2zM12 22h2v2h-2zM16 22h2v2h-2zM20 22h2v2h-2zM24 22h2v2h-2zM28 22h2v2h-2zM32 22h2v2h-2zM36 22h2v2h-2zM40 22h2v2h-2zM4 26h2v2H4zM10 26h2v2h-2zM14 26h2v2h-2zM18 26h2v2h-2zM22 26h2v2h-2zM26 26h2v2h-2zM30 26h2v2h-2zM34 26h2v2h-2zM38 26h2v2h-2zM4 30h2v2H4zM8 30h2v2H8zM12 30h2v2h-2zM16 30h2v2h-2zM20 30h2v2h-2zM24 30h2v2h-2zM28 30h2v2h-2zM32 30h2v2h-2z"/>'
      + '</svg>'
      + '</div>'
      + '<div class="ktn-listqr__url" id="ktnListQrUrl"></div>'
      + '<div class="ktn-auth-btns">'
      + '<button class="ktn-auth-btn-primary" onclick="KTN.toast(\'QRコード画像の保存機能は準備中です\')">QRコード画像を保存</button>'
      + '<button class="ktn-auth-btn-secondary" onclick="ktnListQrClose()">閉じる</button>'
      + '</div>'
      + '</div>'
      + '</div>';
    document.body.appendChild(el);
  }
  document.getElementById('ktnListQrTtl').textContent = label + 'のQRコード';
  document.getElementById('ktnListQrSub').innerHTML = def.sub;
  document.getElementById('ktnListQrUrl').textContent = url;
  requestAnimationFrame(function () { el.classList.add('open'); });
}
function ktnListQrClose(e) {
  if (e && e.target !== document.getElementById('ktnListQrModal')) return;
  var m = document.getElementById('ktnListQrModal');
  if (m) m.classList.remove('open');
}
window.ktnListQr = ktnListQr;
window.ktnListQrClose = ktnListQrClose;

/* ══════════════════════════════════
   ページ共有モーダル（ktnPageShare・creator/gallery＝QR＋URL＋埋め込みバッジ）
   ・.ktn-auth-overlay / .ktn-auth-modal のシェル＋.ktn-listqr__code/__url を再利用
   ・独自ブロック：.ktn-pshare-badge（バッジプレビュー＋埋め込みコード）
══════════════════════════════════ */
const KTN_PSHARE_KINDS = {
  creator: { label: '田中 透', url: 'https://koten-navi.com/p3', badgeLabel: '田中 透 - 個展なび' },
  gallery: { label: 'Gallery SOIL 渋谷', url: 'https://koten-navi.com/p4', badgeLabel: 'Gallery SOIL 渋谷 - 個展なび' }
};
function ktnPageShare(kind) {
  var def = KTN_PSHARE_KINDS[kind] || KTN_PSHARE_KINDS.creator;
  var code = '<a href="' + def.url + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:#005da7;color:#fff;font-family:sans-serif;font-size:12px;text-decoration:none;">' + def.badgeLabel + '</a>';
  var el = document.getElementById('ktnPageShareModal');
  if (!el) {
    el = document.createElement('div');
    el.className = 'ktn-auth-overlay';
    el.id = 'ktnPageShareModal';
    el.setAttribute('onclick', 'ktnPageShareClose(event)');
    el.innerHTML =
      '<div class="ktn-auth-modal ktn-listqr">'
      + '<div class="ktn-auth-top">'
      + '<button class="ktn-auth-close" onclick="ktnPageShareClose()">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      + '</button>'
      + '<div class="ktn-auth-ttl" id="ktnPageShareTtl"></div>'
      + '<div class="ktn-auth-sub" id="ktnPageShareSub"></div>'
      + '</div>'
      + '<div class="ktn-auth-body">'
      + '<div class="ktn-listqr__code" aria-hidden="true">'
      + '<svg viewBox="0 0 44 44" width="180" height="180" shape-rendering="crispEdges">'
      + '<rect width="44" height="44" fill="#fff"/>'
      + '<path fill="#231815" d="M4 4h7v7H4zM6 6v3h3V6zM13 4h2v2h-2zM17 4h2v4h-2zM21 4h2v2h-2zM25 4h2v2h2v2h-2v2h-2v-2h-2V6h2zM33 4h7v7h-7zM35 6v3h3V6zM15 6h2v2h-2zM13 8h2v2h-2zM4 13h7v7H4zM6 15v3h3v-3zM13 13h2v2h-2zM17 13h2v2h2v2h-2v2h-2v-2h-2v-2h2zM23 13h2v4h-2zM27 13h2v2h-2zM31 13h2v2h2v2h-2v2h-2v-2h-2v-2h2zM37 13h2v2h-2zM33 15h2v2h-2zM33 33h7v7h-7zM35 35v3h3v-3zM13 33h2v2h-2zM17 33h2v4h-2zM21 33h2v2h-2zM25 33h2v2h-2zM29 33h2v2h-2zM13 37h2v2h-2zM21 37h2v2h-2zM25 37h2v2h-2zM4 33h7v7H4zM6 35v3h3v-3zM4 22h2v2h-2zM8 22h2v2h-2zM12 22h2v2h-2zM16 22h2v2h-2zM20 22h2v2h-2zM24 22h2v2h-2zM28 22h2v2h-2zM32 22h2v2h-2zM36 22h2v2h-2zM40 22h2v2h-2zM4 26h2v2H4zM10 26h2v2h-2zM14 26h2v2h-2zM18 26h2v2h-2zM22 26h2v2h-2zM26 26h2v2h-2zM30 26h2v2h-2zM34 26h2v2h-2zM38 26h2v2h-2zM4 30h2v2H4zM8 30h2v2H8zM12 30h2v2h-2zM16 30h2v2h-2zM20 30h2v2h-2zM24 30h2v2h-2zM28 30h2v2h-2zM32 30h2v2h-2z"/>'
      + '</svg>'
      + '</div>'
      + '<div class="ktn-listqr__url" id="ktnPageShareUrl"></div>'
      + '<div class="ktn-pshare-badge">'
      + '<div class="ktn-pshare-badge__label">埋め込みバッジ</div>'
      + '<div class="ktn-pshare-badge__preview" id="ktnPageShareBadgePrev"></div>'
      + '<textarea class="ktn-pshare-badge__code" id="ktnPageShareCode" readonly></textarea>'
      + '<button class="ktn-auth-btn-secondary" onclick="ktnPageShareCopyBadge()">埋め込みコードをコピー</button>'
      + '</div>'
      + '<div class="ktn-auth-btns">'
      + '<button class="ktn-auth-btn-primary" onclick="KTN.toast(\'QRコード画像の保存機能は準備中です\')">QRコード画像を保存</button>'
      + '<button class="ktn-auth-btn-secondary" onclick="ktnPageShareClose()">閉じる</button>'
      + '</div>'
      + '</div>'
      + '</div>';
    document.body.appendChild(el);
  }
  document.getElementById('ktnPageShareTtl').textContent = def.label + 'のページを共有';
  document.getElementById('ktnPageShareSub').innerHTML = 'スマホで読み取ると、' + def.label + 'のページが開きます。<br>埋め込みバッジをブログ・SNSプロフィール等に貼ると、そのままページへのリンクになります。';
  document.getElementById('ktnPageShareUrl').textContent = def.url;
  document.getElementById('ktnPageShareBadgePrev').innerHTML = code;
  document.getElementById('ktnPageShareCode').value = code;
  requestAnimationFrame(function () { el.classList.add('open'); });
}
function ktnPageShareClose(e) {
  if (e && e.target !== document.getElementById('ktnPageShareModal')) return;
  var m = document.getElementById('ktnPageShareModal');
  if (m) m.classList.remove('open');
}
function ktnPageShareCopyBadge() {
  var ta = document.getElementById('ktnPageShareCode');
  if (!ta) return;
  ta.select();
  try {
    document.execCommand('copy');
    showToast('コピーしました');
  } catch (e) {
    navigator.clipboard && navigator.clipboard.writeText(ta.value).then(function () { showToast('コピーしました'); });
  }
}
window.ktnPageShare = ktnPageShare;
window.ktnPageShareClose = ktnPageShareClose;
window.ktnPageShareCopyBadge = ktnPageShareCopyBadge;

/* ══════════════════════════════════
   会場フライヤー（A4印刷プレビュー・展覧会情報QR＋チェックインQRを1枚に配置）
   ・.ktn-auth-overlay / .ktn-auth-modal のシェル＋QRダミーSVGは ktnListQr と同型を再利用
   ・独自ブロック：.ktn-vflyer__sheet（A4プレビュー・印刷時は @media print で全画面化）
══════════════════════════════════ */
function ktnVenueFlyer() {
  var el = document.getElementById('ktnVenueFlyerModal');
  if (!el) {
    var qrSvg = '<svg viewBox="0 0 44 44" width="180" height="180" shape-rendering="crispEdges">'
      + '<rect width="44" height="44" fill="#fff"/>'
      + '<path fill="#231815" d="M4 4h7v7H4zM6 6v3h3V6zM13 4h2v2h-2zM17 4h2v4h-2zM21 4h2v2h-2zM25 4h2v2h2v2h-2v2h-2v-2h-2V6h2zM33 4h7v7h-7zM35 6v3h3V6zM15 6h2v2h-2zM13 8h2v2h-2zM4 13h7v7H4zM6 15v3h3v-3zM13 13h2v2h-2zM17 13h2v2h2v2h-2v2h-2v-2h-2v-2h2zM23 13h2v4h-2zM27 13h2v2h-2zM31 13h2v2h2v2h-2v2h-2v-2h-2v-2h2zM37 13h2v2h-2zM33 15h2v2h-2zM33 33h7v7h-7zM35 35v3h3v-3zM13 33h2v2h-2zM17 33h2v4h-2zM21 33h2v2h-2zM25 33h2v2h-2zM29 33h2v2h-2zM13 37h2v2h-2zM21 37h2v2h-2zM25 37h2v2h-2zM4 33h7v7H4zM6 35v3h3v-3zM4 22h2v2h-2zM8 22h2v2h-2zM12 22h2v2h-2zM16 22h2v2h-2zM20 22h2v2h-2zM24 22h2v2h-2zM28 22h2v2h-2zM32 22h2v2h-2zM36 22h2v2h-2zM40 22h2v2h-2zM4 26h2v2H4zM10 26h2v2h-2zM14 26h2v2h-2zM18 26h2v2h-2zM22 26h2v2h-2zM26 26h2v2h-2zM30 26h2v2h-2zM34 26h2v2h-2zM38 26h2v2h-2zM4 30h2v2H4zM8 30h2v2H8zM12 30h2v2h-2zM16 30h2v2h-2zM20 30h2v2h-2zM24 30h2v2h-2zM28 30h2v2h-2zM32 30h2v2h-2z"/>'
      + '</svg>';
    el = document.createElement('div');
    el.className = 'ktn-auth-overlay';
    el.id = 'ktnVenueFlyerModal';
    el.setAttribute('onclick', 'ktnVenueFlyerClose(event)');
    el.innerHTML =
      '<div class="ktn-auth-modal ktn-vflyer">'
      + '<div class="ktn-auth-top">'
      + '<button class="ktn-auth-close" onclick="ktnVenueFlyerClose()">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      + '</button>'
      + '<div class="ktn-auth-ttl">会場フライヤー（A4）</div>'
      + '<div class="ktn-auth-sub">展覧会情報QR・チェックインQRを1枚に配置したA4フライヤーです。印刷してそのまま会場受付・壁面に掲示できます。</div>'
      + '</div>'
      + '<div class="ktn-auth-body">'
      + '<div class="ktn-vflyer__sheet">'
      + '<div class="ktn-vflyer__logo"><img src="./images/kotennavi-logo5-1.svg" alt=""><span>KOTEN-NAVI</span></div>'
      + '<div class="ktn-vflyer__main">'
      + '<div class="ktn-vflyer__head">'
      + '<div class="ktn-vflyer__headtext">'
      + '<p class="ktn-vflyer__en">EXHIBITION</p>'
      + '<h3 class="ktn-vflyer__title">あなたが知らないオノマトペ</h3>'
      + '<p class="ktn-vflyer__artist">田中 透</p>'
      + '<p class="ktn-vflyer__greet">本日はご来場いただき、誠にありがとうございます。</p>'
      + '</div>'
      + '<div class="ktn-vflyer__infoqr">'
      + '<div class="ktn-vflyer__qr-code" aria-hidden="true">' + qrSvg + '</div>'
      + '<p class="ktn-vflyer__qr-lbl">詳しくはこちら</p>'
      + '</div>'
      + '</div>'
      + '<dl class="ktn-vflyer__facts">'
      + '<dt>会場</dt><dd>Gallery SOIL 渋谷（東京都渋谷区神南1-12-14 2F）</dd>'
      + '<dt>会期</dt><dd>2026年2月18日（水）— 3月5日（木）　11:00–19:00</dd>'
      + '</dl>'
      + '</div>'
      + '<div class="ktn-vflyer__checkin">'
      + '<div class="ktn-vflyer__qr-code" aria-hidden="true">' + qrSvg + '</div>'
      + '<div class="ktn-vflyer__checkin-body">'
      + '<p class="ktn-vflyer__checkin-ttl">チェックインのお願い</p>'
      + '<p class="ktn-vflyer__checkin-desc">ご来場の記念に、QRからチェックインをお願いいたします。感想やレビューもぜひお聞かせください。</p>'
      + '<p class="ktn-vflyer__checkin-note">※チェックインには個展なびのアカウントが必要です（その場で無料登録できます）</p>'
      + '</div>'
      + '</div>'
      + '<p class="ktn-vflyer__foot">koten-navi.com</p>'
      + '</div>'
      + '</div>'
      + '<div class="ktn-auth-btns">'
      + '<button class="ktn-auth-btn-primary" onclick="ktnVenueFlyerPrint()">印刷する（A4）</button>'
      + '<button class="ktn-auth-btn-secondary" onclick="ktnVenueFlyerClose()">閉じる</button>'
      + '</div>'
      + '</div>';
    document.body.appendChild(el);
  }
  requestAnimationFrame(function () { el.classList.add('open'); });
}
function ktnVenueFlyerClose(e) {
  if (e && e.target !== document.getElementById('ktnVenueFlyerModal')) return;
  var m = document.getElementById('ktnVenueFlyerModal');
  if (m) m.classList.remove('open');
}
function ktnVenueFlyerPrint() {
  document.body.classList.add('ktn-printing-flyer');
  window.print();
}
window.addEventListener('afterprint', function () {
  document.body.classList.remove('ktn-printing-flyer');
});
window.ktnVenueFlyer = ktnVenueFlyer;
window.ktnVenueFlyerClose = ktnVenueFlyerClose;
window.ktnVenueFlyerPrint = ktnVenueFlyerPrint;

/* ══════════════════════════════════
   送信完了モーダル（全ページ共通・申込/送信のsubmit後に表示）
   ・.ktn-auth-overlay / .ktn-auth-modal シェルを再利用（新規CSSなし）
   ・opts = { title, message(HTML可), action:{ label, href } }
   ・確認ボタンで action.href へ遷移。href省略時は閉じるのみ
══════════════════════════════════ */
function ktnSubmitDone(opts) {
  opts = opts || {};
  var title = opts.title || '送信が完了しました';
  var message = opts.message || '';
  var action = opts.action || {};
  var label = action.label || '閉じる';
  KTN._submitDoneHref = action.href || '';
  var el = document.getElementById('ktnSubmitDoneModal');
  if (!el) {
    el = document.createElement('div');
    el.className = 'ktn-auth-overlay';
    el.id = 'ktnSubmitDoneModal';
    el.innerHTML =
      '<div class="ktn-auth-modal">'
      + '<div class="ktn-auth-top ktn-auth-top--compact">'
      + '<div class="ktn-auth-icon">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
      + '</div>'
      + '<div class="ktn-auth-ttl" id="ktnSubmitDoneTtl"></div>'
      + '<div class="ktn-auth-sub" id="ktnSubmitDoneSub"></div>'
      + '</div>'
      + '<div class="ktn-auth-body">'
      + '<div class="ktn-auth-btns">'
      + '<button class="ktn-auth-btn-primary" id="ktnSubmitDoneBtn" onclick="ktnSubmitDoneConfirm()"></button>'
      + '</div>'
      + '</div>'
      + '</div>';
    document.body.appendChild(el);
  }
  document.getElementById('ktnSubmitDoneTtl').textContent = title;
  document.getElementById('ktnSubmitDoneSub').innerHTML = message;
  document.getElementById('ktnSubmitDoneBtn').textContent = label;
  requestAnimationFrame(function () { el.classList.add('open'); });
}
function ktnSubmitDoneConfirm() {
  var href = KTN._submitDoneHref;
  if (href) { location.href = href; return; }
  var m = document.getElementById('ktnSubmitDoneModal');
  if (m) m.classList.remove('open');
}
KTN.submitDone = ktnSubmitDone;
window.ktnSubmitDone = ktnSubmitDone;
window.ktnSubmitDoneConfirm = ktnSubmitDoneConfirm;

/* ══════════════════════════════════
   シェア機能
══════════════════════════════════ */
function doShare() {
  const url = location.href;
  const title = document.title || '個展なび';
  if (navigator.share) {
    navigator.share({ title, url }).catch(() => { });
  } else {
    navigator.clipboard.writeText(url)
      .then(() => showToast('URLをコピーしました'))
      .catch(() => {
        /* clipboard API 非対応フォールバック */
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('URLをコピーしました');
      });
  }
}

/* ══════════════════════════════════
   コピーボタン共通（.ktn-copy-btn data-copy="..."）
══════════════════════════════════ */
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.ktn-copy-btn');
  if (!btn) return;
  e.preventDefault();
  var text = btn.dataset.copy || '';
  if (!text) return;
  function ok() { showToast('コピーしました'); }
  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    ok();
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(ok).catch(fallback);
  } else {
    fallback();
  }
});

function closeAllPanels() {
  document.querySelectorAll('.ktn-ddmenu').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.ktn-ddbtn').forEach(el => el.classList.remove('open'));
}

function toggleDD(id, btn) {
  const m = document.getElementById(id);
  if (!m) return;
  const was = m.classList.contains('open');
  document.querySelectorAll('.ktn-ddmenu').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.ktn-ddbtn').forEach(el => el.classList.remove('open'));
  if (!was) { m.classList.add('open'); btn.classList.add('open'); }
}
document.addEventListener('click', e => {
  if (!e.target.closest('.ktn-ddw')) {
    closeAllPanels();
  }
});



/* ══ SIDEBAR / FOOTER / BOTTOM NAV JS ══ */

/* ─── SVGアイコン定義 ─── */
const ICONS = {
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7.5"/><path d="M21 21l-4.5-4.5" stroke-linecap="round"/></svg>`,
  notice: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  guide: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`,
  /* ホーム: 個展なびロゴの「額縁+縦ライン」をモチーフにしたオリジナルアイコン */
  home: `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.05 102.05" width="28" height="28"><defs><style>.cls-1{fill:currentColor;}</style></defs><path class="cls-1" d="M0,0v102.05h80.09c-1.22-.8-2.57-2.87-3.34-4.33-2.48-5.91-4.85-14.23-13.31-20.15-1.9-1.23-2.03-2-1.94-2.48.11-.83.82-1.52,2.3-1.3,11.09,1.95,15.22,3.96,21.07,7.61,7.85,5.36,9.57,10.76,9.65,14.09.15,2.3-.18,5.11-2.61,6.56h10.14V0H0Z"/></svg>`,
  login: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>`,
  register: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>`,
};

/* ─── ロール定義 ─── */
const KTN_ROLES = {
  user: {
    label: 'myページ', url: '/p5', bg: '#e8a0c8', page: 'p5',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.7" width="22" height="22"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    iconSm: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  },
  creator: {
    label: 'myクリエイター', url: '/p3', bg: '#a8aa9a', page: 'p3',
    /* フレーム（額縁）アイコン */
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.7" width="22" height="22"><rect x="3" y="3" width="18" height="18" rx="1"/><rect x="6" y="6" width="12" height="12" rx="0.5"/><line x1="3" y1="3" x2="6" y2="6"/><line x1="21" y1="3" x2="18" y2="6"/><line x1="3" y1="21" x2="6" y2="18"/><line x1="21" y1="21" x2="18" y2="18"/></svg>`,
    iconSm: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="1"/><rect x="6" y="6" width="12" height="12" rx="0.5"/><line x1="3" y1="3" x2="6" y2="6"/><line x1="21" y1="3" x2="18" y2="6"/><line x1="3" y1="21" x2="6" y2="18"/><line x1="21" y1="21" x2="18" y2="18"/></svg>`,
  },
  gallery: {
    label: 'myギャラリー', url: '/p4', bg: '#c4a882', page: 'p4',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.7" width="22" height="22"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    iconSm: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" width="18" height="18"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  },
  admin: {
    label: '管理者', url: '/p90-1', bg: '#8888aa', page: 'p90-1',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.7" width="22" height="22"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    iconSm: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" width="18" height="18"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  },
};

/* ─── ページ→対応navアイテムのマップ ─── */
const PAGE_NAV_MAP = {
  'p1': 'p1',
  'p10-1': 'p10-1',
  'p60': 'p60',
  'p61': 'p61',
  'p5': 'p5',
  'p3': 'p3',
  'p4': 'p4',
  'p90-1': 'p90-1',
};

/* curRole / curPage は上部で宣言済み */

function updateActiveState() {
  // サイドバー（data-page属性で一致判定）
  document.querySelectorAll('.ktn-sidebar__item[data-page]').forEach(el => {
    el.classList.toggle('is-active', el.dataset.page === curPage);
  });
  // ボトムナビ
  document.querySelectorAll('.ktn-bottom-nav__item[data-page]').forEach(el => {
    el.classList.toggle('is-active', el.dataset.page === curPage);
  });
}

function handleNav(e, page, url) {
  /* コンポーネントデモ（#mainPlaceholder あり）ではページ切替をシミュレート。
     本番プロトタイプページでは curPage を書き換えず（ヘッダー状態が壊れるため）
     ローカルHTMLファイルへ実遷移する（未制作ページは404になる） */
  if (!document.getElementById('mainPlaceholder')) {
    e.preventDefault();
    location.href = 'kotennavi-' + page + '.html';
    return;
  }
  e.preventDefault();
  curPage = page;
  document.querySelectorAll('.dbar [onclick^="setP"]').forEach(b => b.classList.remove('on'));
  renderAll();
}

function renderSidebar() {
  const roleNav = document.getElementById('ktnRoleNav');
  const noticeDot = document.getElementById('ktnNoticeDot');
  if (noticeDot) noticeDot.style.display = 'none';


  if (curRole === 'guest') {
    if (roleNav) roleNav.innerHTML = `
      <a href="/login" class="ktn-sidebar__item" data-page="login" onclick="handleNav(event,'login','/login')">
        <div class="ktn-sidebar__icon">${ICONS.login}</div>
        <span class="ktn-sidebar__label">ログイン</span>
      </a>
      <a href="/register" class="ktn-sidebar__item" data-page="register" onclick="handleNav(event,'register','/register')">
        <div class="ktn-sidebar__icon">${ICONS.register}</div>
        <span class="ktn-sidebar__label">新規登録</span>
      </a>
    `;
    if (noticeDot) noticeDot.style.display = 'none';
  } else {
    if (noticeDot) noticeDot.style.display = 'block';
    const roles = ['user'];
    if (curRole === 'user+creator') roles.push('creator');
    else if (curRole === 'user+gallery') roles.push('gallery');
    else if (curRole === 'admin') roles.push('admin');

    if (roleNav) roleNav.innerHTML = roles.map(r => {
      const rd = KTN_ROLES[r];
      return `
        <a href="${rd.url}" class="ktn-sidebar__item" data-page="${rd.page}" onclick="handleNav(event,'${rd.page}','${rd.url}')">
          <div class="ktn-sidebar__role">
            <div class="ktn-sidebar__role-fallback" style="background:${rd.bg}">${rd.icon}</div>
          </div>
          <span class="ktn-sidebar__role-label">${rd.label}</span>
        </a>
      `;
    }).join('');
  }
  // DOM更新後に確実にアクティブ状態を適用
  requestAnimationFrame(() => updateActiveState());
}

function renderBottomNav() {
  const inner = document.getElementById('ktnBottomNavInner');
  /* ボトムナビを持たないページ（管理・編集系）で throw すると
     _runPage / renderAll が途中で死に、ページモジュール（KTN.pages）や
     ロール切替の再描画が動かなくなるため必ず null ガードする */
  if (!inner) return;
  let html = `
    <a href="/p1" class="ktn-bottom-nav__item ktn-bottom-nav__item--home" data-page="p1" onclick="handleNav(event,'p1','/p1')">
      <div class="ktn-bottom-nav__icon">${ICONS.home}</div>
      <span class="ktn-bottom-nav__label">Top</span>
    </a>
    <a href="/p10-1" class="ktn-bottom-nav__item" data-page="p10-1" onclick="handleNav(event,'p10-1','/p10-1')">
      <div class="ktn-bottom-nav__icon">${ICONS.search}</div>
      <span class="ktn-bottom-nav__label">検索</span>
    </a>
    <div class="ktn-bottom-nav__divider"></div>
  `;

  if (curRole === 'guest') {
    html += `
      <a href="/p61" class="ktn-bottom-nav__item" data-page="p61" onclick="handleNav(event,'p61','/p61')">
        <div class="ktn-bottom-nav__icon">${ICONS.notice}</div>
        <span class="ktn-bottom-nav__label">お知らせ</span>
      </a>
      <a href="/p60" class="ktn-bottom-nav__item" data-page="p60" onclick="handleNav(event,'p60','/p60')">
        <div class="ktn-bottom-nav__icon">${ICONS.guide}</div>
        <span class="ktn-bottom-nav__label">ガイド</span>
      </a>
      <a href="/login" class="ktn-bottom-nav__item" data-page="login" onclick="handleNav(event,'login','/login')">
        <div class="ktn-bottom-nav__login-btn">${ICONS.login}</div>
        <span class="ktn-bottom-nav__label">ログイン</span>
      </a>
    `;
  } else {
    html += `
      <a href="/p61" class="ktn-bottom-nav__item" data-page="p61" onclick="handleNav(event,'p61','/p61')" style="position:relative">
        <span class="ktn-bottom-nav__dot"></span>
        <div class="ktn-bottom-nav__icon">${ICONS.notice}</div>
        <span class="ktn-bottom-nav__label">お知らせ</span>
      </a>
      <a href="/p60" class="ktn-bottom-nav__item" data-page="p60" onclick="handleNav(event,'p60','/p60')">
        <div class="ktn-bottom-nav__icon">${ICONS.guide}</div>
        <span class="ktn-bottom-nav__label">ガイド</span>
      </a>
    `;
    const ur = KTN_ROLES['user'];
    html += `
      <a href="${ur.url}" class="ktn-bottom-nav__item" data-page="${ur.page}" onclick="handleNav(event,'${ur.page}','${ur.url}')">
        <div class="ktn-bottom-nav__role" style="background:${ur.bg};border-radius:9px">${ur.iconSm}</div>
        <span class="ktn-bottom-nav__label">myページ</span>
      </a>
    `;
    let extraRole = null;
    if (curRole === 'user+creator') extraRole = 'creator';
    else if (curRole === 'user+gallery') extraRole = 'gallery';
    else if (curRole === 'admin') extraRole = 'admin';
    if (extraRole) {
      const er = KTN_ROLES[extraRole];
      html += `
        <a href="${er.url}" class="ktn-bottom-nav__item" data-page="${er.page}" onclick="handleNav(event,'${er.page}','${er.url}')">
          <div class="ktn-bottom-nav__role" style="background:${er.bg};border-radius:9px">${er.iconSm}</div>
          <span class="ktn-bottom-nav__label">${er.label}</span>
        </a>
      `;
    }
  }

  inner.innerHTML = html;
  requestAnimationFrame(() => updateActiveState());
}






/* ══════════════════════════════════
   タグバー定義（ページ → タグ一覧）
   mod: 'feature' | 'liaison' | undefined
══════════════════════════════════ */
const TAGBAR_DEFS = {
  'p1': [
    { label: '展覧会を探す', href: '/p2' },
    { label: '今週末開催', href: '/p2?filter=weekend', icon: 'calendar' },
    { label: '近くの展覧会', href: '/p2?filter=near', icon: 'pin' },
    { sep: true },
    { label: '特集一覧', href: '/feature', mod: 'feature' },
    { label: '九州の展覧会', href: '/feature/kyushu', mod: 'feature' },
    { label: '今月注目', href: '/feature/monthly', mod: 'feature' },
    { sep: true },
    { label: 'LIAISON作品を見る', href: '/p2?liaison=1', mod: 'liaison', icon: 'liaison' },
  ],
  'p2': [
    { label: 'すべて', href: '/p2', active: true },
    { label: '今日・明日開催', href: '/p2?filter=today', icon: 'calendar' },
    { label: '今週末', href: '/p2?filter=weekend' },
    { label: '近くで開催', href: '/p2?filter=near', icon: 'pin' },
    { sep: true },
    { label: '写真', href: '/p2?genre=photo' },
    { label: '日本画', href: '/p2?genre=nihonga' },
    { label: '油彩', href: '/p2?genre=oil' },
    { label: '版画', href: '/p2?genre=print' },
    { label: '立体・彫刻', href: '/p2?genre=sculpture' },
    { sep: true },
    { label: 'LIAISON+あり', href: '/p2?liaison=1', mod: 'liaison' },
  ],
  'p2-3': [
    { label: '記事・案内', href: '#', active: true },
    { label: '作品一覧', href: '#artworks' },
    { label: 'クリエイター', href: '#creator' },
    { label: 'ギャラリー情報', href: '#gallery' },
    { sep: true },
    { label: 'LIAISON作品', href: '/p2-5', mod: 'liaison' },
  ],
  'p2-5': [
    { label: '記事・案内', href: '/p2-3' },
    { label: 'LIAISON作品一覧', href: '#', mod: 'liaison', active: true },
  ],
  'p3': [
    { label: 'プロフィール', href: '#', active: true },
    { label: '展覧会', href: '#archive' },
    { label: '作品', href: '#works' },
    { label: '記事', href: '#articles' },
  ],
  'p4': [
    { label: 'プロフィール', href: '#', active: true },
    { label: '開催中の展覧会', href: '#current' },
    { label: '展覧会アーカイブ', href: '#archive' },
    { label: '記事', href: '#articles' },
  ],
  'p6': [
    { label: '作品詳細', href: '#', active: true },
    { label: '同シリーズ', href: '#series' },
    { label: 'このクリエイターの他の作品', href: '#creator-works' },
  ],
  'p10-4': [
    { label: '展覧会特集', href: '/p10-4', mod: 'feature', active: true },
    { label: '作品特集', href: '/p10-5', mod: 'feature' },
    { label: 'クリエイター特集', href: '/p10-6', mod: 'feature' },
    { label: 'ギャラリー特集', href: '/p10-7', mod: 'feature' },
  ],
  'p10-5': [
    { label: '展覧会特集', href: '/p10-4', mod: 'feature' },
    { label: '作品特集', href: '/p10-5', mod: 'feature', active: true },
    { label: 'クリエイター特集', href: '/p10-6', mod: 'feature' },
    { label: 'ギャラリー特集', href: '/p10-7', mod: 'feature' },
  ],
  'p10-6': [
    { label: '展覧会特集', href: '/p10-4', mod: 'feature' },
    { label: '作品特集', href: '/p10-5', mod: 'feature' },
    { label: 'クリエイター特集', href: '/p10-6', mod: 'feature', active: true },
    { label: 'ギャラリー特集', href: '/p10-7', mod: 'feature' },
  ],
  'p10-7': [
    { label: '展覧会特集', href: '/p10-4', mod: 'feature' },
    { label: '作品特集', href: '/p10-5', mod: 'feature' },
    { label: 'クリエイター特集', href: '/p10-6', mod: 'feature' },
    { label: 'ギャラリー特集', href: '/p10-7', mod: 'feature', active: true },
  ],
  'p70': [
    { label: 'LIAISONとは', href: '/p70', mod: 'liaison', active: true },
    { label: '作品出品ガイド', href: '/p70-1', mod: 'liaison' },
    { label: '販売ガイド(+)', href: '/p70-2', mod: 'liaison' },
    { label: '購入の流れ', href: '/p70-3', mod: 'liaison' },
  ],
};

/* タグバー用SVGアイコン */
const TB_ICONS = {
  calendar: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  pin: `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  liaison: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
};

function renderTagbar(page) {
  var el = document.getElementById('ktnTagbarInner');
  if (!el) return;
  var tagbar = document.getElementById('ktnTagbar');
  // 管理・編集ページ（mgmt-page）にタグバーは出さない（親ページからの継承も含め常に非表示）
  if (document.body.classList.contains('mgmt-page')) {
    if (tagbar) tagbar.style.display = 'none';
    return;
  }
  var defs = TAGBAR_DEFS[page];
  // 下位ページ（p2-1・p6-1 等）に専用定義が無ければ、末尾の -N を1段ずつ削って
  // 親ページ（p2-1→p2 / p2-5-1→p2-5 / p6-1→p6）のタグバーを継承する
  if ((!defs || !defs.length) && page) {
    var parent = page;
    while (parent.indexOf('-') !== -1) {
      parent = parent.replace(/-[^-]+$/, '');
      if (TAGBAR_DEFS[parent]) { defs = TAGBAR_DEFS[parent]; break; }
    }
  }
  if (!defs || !defs.length) {
    if (tagbar) tagbar.style.display = 'none';
    return;
  }
  if (tagbar) tagbar.style.display = '';
  el.innerHTML = defs.map(function (t) {
    if (t.sep) return '<span class="ktn-tagbar__sep"></span>';
    var mod = t.mod ? ' ktn-tagbar__tag--' + t.mod : '';
    var actv = t.active ? ' is-active' : '';
    var ico = t.icon && TB_ICONS[t.icon] ? TB_ICONS[t.icon] : '';
    return '<a href="' + t.href + '" class="ktn-tagbar__tag' + mod + actv + '">' + ico + t.label + '</a>';
  }).join('');
}

/* ══════════════════════════════════
   Q&A（FAQ）共通データ ＝ Drupal「Q&A」コンテンツタイプの静的ミラー（単一ソース）
   ─ 本文の実体は1つ。各FAQページ／取引ページは cat×aud×side でフィルタして
     参照表示する＝ページ間で文言がずれる二重管理を避ける。
   ─ cat: 'exhibition-edit'（展覧会の登録・編集）
          'liaison'（リエゾン/リエゾン+ サービス全般＝p70-1/p70-2 ハブ）
          'liaison-txn'（取引フロー＝取引6ページ＋p70-11/p70-12 ハブ）
   ─ aud: 'common'（全ロール可視）/ 'creator' / 'gallery'（exhibition-edit の編別）
     本番（Drupal）は audience が複数term。静的版は common＝全ロール可視で簡略化。
   ─ side（liaison-txn のみ）: 'seller'（出品者＝creator+gallery共通）/ 'buyer'（購入者＝user）
     ＝出品者FAQは creator/gallery で同一なので seller 1本に集約しドリフトを防ぐ。
   ─ phase（liaison-txn のみ・任意）: 取引状態キーの配列（setDemoState と同語彙）。
     'applied'(S0)/'new'(S1)/'payment'(S2)/'paid'(S3)/'receipt'(S4)/'confirming'(S5)。
     省略＝常時表示。デスク（p3-16/p4-16/p5-15）で現phaseに連動して出し分ける。
══════════════════════════════════ */
window.KTN = window.KTN || {};
KTN.QA = [
  // A. はじめに・基本
  { id: 'EXH-01', cat: 'exhibition-edit', aud: 'common', grp: 'はじめに・基本', q: '誰が展覧会を登録できますか？', a: '登録済みのクリエイター・ギャラリーが、ご自分のページから登録できます。ゲスト・一般ユーザーは登録できません。' },
  { id: 'EXH-02', cat: 'exhibition-edit', aud: 'common', grp: 'はじめに・基本', q: '登録にどれくらい時間がかかりますか？', a: '「必須」項目だけなら約5分で公開申請できます。「＋ 追加項目」を入力するほど展覧会ページが充実し、来場のきっかけが増えます。' },
  { id: 'EXH-03', cat: 'exhibition-edit', aud: 'common', grp: 'はじめに・基本', q: '必須項目はどれですか？', a: '「必須」マークの付いた項目（展覧会名・会期・会場・出展クリエイター・お問合せ先 など）です。これだけで公開申請できます。' },
  { id: 'EXH-04', cat: 'exhibition-edit', aud: 'common', grp: 'はじめに・基本', q: '入力を途中でやめても大丈夫ですか？（下書き）', a: '「下書き保存」で途中まで保存できます。次に同じ登録画面を開くと自動で続きが復元されます。下書きはサイトには公開されません。' },
  { id: 'EXH-05', cat: 'exhibition-edit', aud: 'gallery', grp: 'はじめに・基本', q: 'クリエイターとギャラリーで登録方法は違いますか？', a: '基本は同じです。ギャラリーは「誰の作品／誰の展覧会か（出展クリエイター）」を指定する点だけが異なります。' },
  // B. 公開までの流れ（管理者確認）
  { id: 'EXH-06', cat: 'exhibition-edit', aud: 'common', grp: '公開までの流れ（管理者確認）', q: '登録したらすぐ公開されますか？', a: 'いいえ。入力内容は管理者が確認してから反映・公開されます。' },
  { id: 'EXH-07', cat: 'exhibition-edit', aud: 'common', grp: '公開までの流れ（管理者確認）', q: '「登録内容は管理者の確認時に反映されます」とはどういう意味ですか？', a: '入力・変更は即時反映ではなく、管理者の確認を経て公開ページに反映される、という意味です。新規会場や変更点も同じ流れです。' },
  { id: 'EXH-08', cat: 'exhibition-edit', aud: 'common', grp: '公開までの流れ（管理者確認）', q: '公開日を指定できますか？', a: '公開予定日を予約できます。指定しない場合は、確認完了後に公開されます。' },
  { id: 'EXH-09', cat: 'exhibition-edit', aud: 'common', grp: '公開までの流れ（管理者確認）', q: '確認までどれくらいかかりますか？', a: '確認にかかる日数はお約束していません。ご登録の集中状況などにより前後するため、会期が近い場合はお早めのご登録をおすすめします。' },
  { id: 'EXH-10', cat: 'exhibition-edit', aud: 'common', grp: '公開までの流れ（管理者確認）', q: '確認で差し戻されることはありますか？', a: '情報が不足していたり掲載ガイドラインに合わない場合、修正のお願い（差し戻し）をすることがあります。' },
  // C. 会場について
  { id: 'EXH-11', cat: 'exhibition-edit', aud: 'common', grp: '会場について', q: '会場が候補に出てきません。', a: '候補に無い会場は、そのまま新しい会場名を入力できます。新規会場は管理者確認時に会場ページが作成されます。' },
  { id: 'EXH-12', cat: 'exhibition-edit', aud: 'common', grp: '会場について', q: '新しい会場を入力したら、住所やカナも必要ですか？', a: 'はい。新規会場は会場ページを作るため「場所名読み（カナ）」「住所」が必須になります。登録済みの会場を選んだ場合は登録情報が使われるため不要です。' },
  { id: 'EXH-13', cat: 'exhibition-edit', aud: 'common', grp: '会場について', q: '同じ名前の会場が複数あって選べません。', a: '候補の「確認 ↗」から各会場ページを開いて見分けられます。正しい会場を選んでください。' },
  { id: 'EXH-14', cat: 'exhibition-edit', aud: 'common', grp: '会場について', q: '会場のアクセス・地図はどこで入力しますか？', a: '「開催場所の詳細情報」（＋ 追加項目）で入力します。新規会場ではここが会場ページの内容になります。' },
  // D. 出展クリエイター
  { id: 'EXH-15', cat: 'exhibition-edit', aud: 'common', grp: '出展クリエイター', q: '出展クリエイターは必須ですか？', a: 'はい、必須です。' },
  { id: 'EXH-16', cat: 'exhibition-edit', aud: 'common', grp: '出展クリエイター', q: '登録されていない作家を出展者にできますか？', a: 'いいえ。登録済みのクリエイターのみ選択できます（自由入力はできません）。未登録の場合は、先にクリエイター登録が必要です。' },
  { id: 'EXH-17', cat: 'exhibition-edit', aud: 'common', grp: '出展クリエイター', q: '同姓同名・同ジャンルのクリエイターがいて選び分けられません。', a: '候補の「確認 ↗」からクリエイターページを開いて確認し、正しい方を選んでください。' },
  { id: 'EXH-18', cat: 'exhibition-edit', aud: 'gallery', grp: '出展クリエイター', q: 'ギャラリーは誰でも出展クリエイターに指定できますか？', a: '取扱い関係のある登録済みクリエイターのみ指定できます。これは掲載する作品・展覧会の真正性を担保するためのルールです。' },
  { id: 'EXH-19', cat: 'exhibition-edit', aud: 'creator', grp: '出展クリエイター', q: 'グループ展など、自分以外も出展者に追加できますか？', a: 'できます。登録済みのクリエイターから複数選択して追加してください。' },
  // E. スケジュール・会期
  { id: 'EXH-20', cat: 'exhibition-edit', aud: 'common', grp: 'スケジュール・会期', q: '定休日はどう設定しますか？', a: '曜日で定休を設定します（例：月・火・水 休み）。' },
  { id: 'EXH-21', cat: 'exhibition-edit', aud: 'common', grp: 'スケジュール・会期', q: '特定の日だけ開場時間が違います。', a: '「開催時間の変更」で日付ごとに時間を上書きできます（例：初日のみ13:00開場）。曜日の定休設定より優先されます。' },
  { id: 'EXH-22', cat: 'exhibition-edit', aud: 'common', grp: 'スケジュール・会期', q: '臨時休業日を設定したい。', a: '曜日定休に加えて、特定の日付を休みに指定できます。' },
  { id: 'EXH-23', cat: 'exhibition-edit', aud: 'common', grp: 'スケジュール・会期', q: '会期中の在廊予定を知らせたい。', a: '「在廊予定」で期間×曜日×メモを設定できます（例：2/19〜3/4 の土日祝）。展覧会ページや日別カレンダーに表示されます。' },
  { id: 'EXH-24', cat: 'exhibition-edit', aud: 'common', grp: 'スケジュール・会期', q: '会期の時間に曜日を書く必要はありますか？', a: '不要です。曜日情報は「休み」欄が担うため、開場時間に曜日の補足は付けません。' },
  // F. 関連イベント
  { id: 'EXH-25', cat: 'exhibition-edit', aud: 'common', grp: '関連イベント', q: 'トークやワークショップを掲載したい。', a: '「関連イベント」で追加します。タイトル・日時・詳細/申込URLを入力してください。' },
  { id: 'EXH-26', cat: 'exhibition-edit', aud: 'common', grp: '関連イベント', q: '1日に複数回あるイベントはどう入力しますか？', a: '時間欄にまとめて記入してください（例：①11:00〜 ②14:00〜）。内容の異なるイベントは分けて追加します。' },
  { id: 'EXH-27', cat: 'exhibition-edit', aud: 'common', grp: '関連イベント', q: 'イベントに担当作家を紐付けできますか？', a: 'イベント入力に担当クリエイター欄はありません。イベントは展覧会単位の情報として登録します。' },
  // G. 画像・タグ・任意項目
  { id: 'EXH-28', cat: 'exhibition-edit', aud: 'common', grp: '画像・タグ・任意項目', q: '「＋ 追加項目」とは何ですか？', a: '任意で入力できる欄です。開いて入力すると展覧会ページが充実します。未入力でも公開できます。' },
  { id: 'EXH-29', cat: 'exhibition-edit', aud: 'common', grp: '画像・タグ・任意項目', q: '画像は複数枚載せられますか？', a: 'メイン画像に加え、サブ画像（＋ 追加項目）で複数枚を掲載できます。' },
  { id: 'EXH-30', cat: 'exhibition-edit', aud: 'common', grp: '画像・タグ・任意項目', q: 'タグや英語タイトルは入れた方がいいですか？', a: '任意ですが、検索での見つけやすさや海外の方への見え方が向上します。' },
  { id: 'EXH-31', cat: 'exhibition-edit', aud: 'common', grp: '画像・タグ・任意項目', q: '主催者名や公式サイトのリンクは入れられますか？', a: '「主催・ウェブリンク」（＋ 追加項目）で入力できます。' },
  // H. LIAISON / LIAISON+
  { id: 'EXH-32', cat: 'exhibition-edit', aud: 'common', grp: 'LIAISON / LIAISON+', q: 'LIAISON とは何ですか？', a: '会場の展覧会と連動したオンライン作品展示サービス（無料）です。展覧会に設定すると、オンラインでも作品を見てもらえます。' },
  { id: 'EXH-33', cat: 'exhibition-edit', aud: 'common', grp: 'LIAISON / LIAISON+', q: 'LIAISON+ とは何が違いますか？', a: '展示に加えてオンライン販売ができるサービスです（作品が売れたときにサービス利用料あり）。' },
  { id: 'EXH-34', cat: 'exhibition-edit', aud: 'common', grp: 'LIAISON / LIAISON+', q: '展覧会登録時に LIAISON を設定できますか？', a: 'はい。登録画面の LIAISON ブロックで設定します。作品の登録・出品は作品管理から行います。サービス利用料・取引の流れは「LIAISON ガイド」をご参照ください。' },
  { id: 'EXH-35', cat: 'exhibition-edit', aud: 'gallery', grp: 'LIAISON / LIAISON+', q: 'ギャラリーが出品した作品は、ギャラリーページに公開されますか？', a: 'いいえ。ギャラリーの作品在庫は非公開で、展覧会に出品されたときに公開されます。' },
  // I. 編集・修正・クローン
  { id: 'EXH-36', cat: 'exhibition-edit', aud: 'common', grp: '編集・修正・クローン', q: '公開後に内容を修正できますか？', a: '編集できます。変更は管理者の確認を経て反映されます。' },
  { id: 'EXH-37', cat: 'exhibition-edit', aud: 'common', grp: '編集・修正・クローン', q: '一部の項目が編集できなくなっています。', a: '管理者の確認が済んだ項目は、誤って変更されないようロックされます。ご自身での解除はできません。修正が必要な場合は{{contact}}よりご連絡ください。' },
  { id: 'EXH-38', cat: 'exhibition-edit', aud: 'common', grp: '編集・修正・クローン', q: '過去の展覧会をベースに新しく作れますか？', a: '「クローン」で過去の展覧会を複製し、内容を変えて新規登録できます。' },
  { id: 'EXH-39', cat: 'exhibition-edit', aud: 'common', grp: '編集・修正・クローン', q: '登録した展覧会を削除・非公開にしたい。', a: '管理者の確認が完了する前なら、展覧会管理ページから削除できます。確認が完了すると、ウォッチしている方への通知と個展なび公式SNSでの告知が行われるため、それ以降は削除・非公開はできません。' },
  // J. 解決しないとき
  { id: 'EXH-40', cat: 'exhibition-edit', aud: 'common', grp: '解決しないとき', q: 'ここで解決しない場合は？', a: 'ここで解決しない場合は、{{contact}}よりご連絡ください。' },

  /* ─── cat:'creator-apply'（クリエイター機能申込＝p11-2）／cat:'gallery-apply'（ギャラリー機能申込＝p11-3）───
     どちらも申込ページ下部にアコーディオンFAQとして描画（KTN.renderQA '#p112Faq' / '#p113Faq' guide）。
     KTN.renderQA は KTN.QA.filter() でカテゴリ抽出するため配列順＝表示順（定義位置を動かすだけで並びが変わる）。
     2026-07-26 全体を「①申込のプリミティブな条件（対象・無料・基本ルール）→②運用の詳細・エッジケース→③ここで解決しない場合（必ず最後）」の3層に並べ替え。
     creator-apply と gallery-apply で共有するQ&A（CAP-02/08/09/10/11/12/13）はcat配列で共通化＝物理位置は両カテゴリに影響する。
     CAP-06（代理申込）・CAP-05（本名・住所の公開有無）は2026-07-26 gallery-apply から除外（ギャラリーには不要／ご担当者は本人確認を要さないため）。
     GAP-03（法人名の要否）は2026-07-26 廃止しGAP-02へ統合。GAP-02はさらに同日「スペースを持たないギャラリスト」向け質問に差し替え。 */
  { id: 'CAP-11', cat: ['creator-apply', 'gallery-apply'], aud: 'common', grp: 'よくあるご質問', q: '個展以外の展覧会も掲載できますか？', a: 'はい、掲載できます。「個展なび」という名称ですが、個展のほか、グループ展・二人展・企画展、アートフェアなど、さまざまな展覧会を掲載いただけます。' },
  { id: 'CAP-01', cat: 'creator-apply', aud: 'common', grp: 'よくあるご質問', q: 'クリエイター機能の利用は無料ですか？', a: 'はい、無料です。クリエイターページの作成、展覧会・作品・記事の掲載まで、費用は一切かかりません。' },
  { id: 'CAP-03', cat: 'creator-apply', aud: 'common', grp: 'よくあるご質問', q: '企業・団体・グループ・展覧会名で申し込めますか？', a: 'いいえ。クリエイター機能は個人の作り手のための機能です。企業・団体・グループ・展覧会名ではお申込みいただけません。活動されている個人名でお申込みください。' },
  { id: 'CAP-04', cat: 'creator-apply', aud: 'common', grp: 'よくあるご質問', q: 'クリエイター名は本名でないといけませんか？', a: 'いいえ。本名でも活動名でも構いません。ただし個人名でご登録ください（企業・団体・グループ・展覧会名は登録できません）。' },
  { id: 'GAP-00', cat: 'gallery-apply', aud: 'common', grp: 'よくあるご質問', q: 'ギャラリーではなく美術館や展示スペースですが申込めますか？', a: 'はい、お申込みいただけます。個展なびでの「ギャラリー」は、貸し画廊・企画ギャラリーに限らず、美術館・展示スペースなど、展覧会を主催する会場全般を指す総称です。名称にとらわれず、ぜひお申込みください。' },
  { id: 'GAP-01', cat: 'gallery-apply', aud: 'common', grp: 'よくあるご質問', q: 'ギャラリー機能の利用は無料ですか？', a: 'はい、無料です。ギャラリーページの作成、展覧会・記事の掲載まで、費用は一切かかりません。' },
  { id: 'GAP-02', cat: 'gallery-apply', aud: 'common', grp: 'よくあるご質問', q: 'スペースを持たないギャラリストですが、申し込めますか？', a: 'はい、お申込みいただけます。ただし個展なびのギャラリーページには、ギャラリー情報として住所・地図が表示される仕様のため、スペースをお持ちでない場合も、ご登録いただく住所が公開されることをあらかじめご了承ください。なお、展覧会を掲載する際は、展覧会情報の登録画面に会場情報を別途ご入力いただけるため、ギャラリーの登録住所とは異なる会場で開催する展覧会も掲載できます。' },
  { id: 'CAP-05', cat: 'creator-apply', aud: 'common', grp: 'よくあるご質問', q: '本名・住所などの本人確認情報は公開されますか？', a: '公開されません。ご本人の確認・ご連絡、掲載情報の内容確認が必要となった場合、および将来リエゾンプラス（作品販売）お申込み時の本人確認にのみ使用します。' },
  { id: 'CAP-06', cat: 'creator-apply', aud: 'common', grp: 'よくあるご質問', q: '本人に代わって申し込めますか？（代理申込）', a: 'できます。「申込者について」で「代理人」を選び、代理人の氏名・本人との関係をご入力ください。クリエイター情報は、登録されるご本人のものをご入力ください。' },
  { id: 'CAP-07', cat: 'creator-apply', aud: 'common', grp: 'よくあるご質問', q: '作品の展示・販売（リエゾン／リエゾンプラス）はすぐ使えますか？', a: 'リエゾン（無料のオンライン展示）は、クリエイター機能のご利用開始後、申込不要でそのままお使いいただけます。販売もできるリエゾンプラスは、別途お申込みが必要です。' },
  { id: 'GAP-04', cat: 'gallery-apply', aud: 'common', grp: 'よくあるご質問', q: '複数のギャラリースペースを運営しています。それぞれ掲載できますか？', a: 'はい、可能です。ギャラリーページは1スペースにつき1ページとなります。複数のギャラリースペースを運営されている場合は、スペースごとに別のメールアドレスでユーザー登録のうえ、それぞれお申込みください。' },
  { id: 'GAP-05', cat: 'gallery-apply', aud: 'common', grp: 'よくあるご質問', q: '誰を「ご担当者」として登録すればよいですか？', a: 'ギャラリーページの管理・展覧会の掲載を担当し、掲載内容について個展なびからの連絡・確認に対応いただける方をご担当者としてご登録ください。' },
  { id: 'GAP-06', cat: 'gallery-apply', aud: 'common', grp: 'よくあるご質問', q: '作品の展示・販売（リエゾン／リエゾンプラス）はすぐ使えますか？', a: 'リエゾン（無料のオンライン展示）は、ギャラリー機能のご利用開始後、申込不要でそのままお使いいただけます。販売もできるリエゾンプラスは、別途お申込みが必要です。' },
  { id: 'CAP-12', cat: ['creator-apply', 'gallery-apply'], aud: 'common', grp: 'よくあるご質問', q: '自分の展覧会情報をもとに、すでにクリエイター・ギャラリーページができているようです。このページを引き継ぐことはできますか？', a: 'はい、引き継げます。個展なびでは、他の方が投稿された展覧会情報をもとに、事務局があらかじめクリエイター・ギャラリーのページを作成している場合があります（この時点ではまだオーナーは設定されていません）。この機能にお申込みいただく際、心当たりのあるページがあれば「既存の掲載ページ」欄にURLや名称をご記入ください。事務局で確認のうえ、そのページのオーナーをご本人に切り替え、これまでの展覧会情報を引き継ぎます。ご記入がなくても事務局が名寄せして引き継げる場合があり、その結果は設定完了メールでお知らせします。' },
  { id: 'CAP-13', cat: ['creator-apply', 'gallery-apply'], aud: 'common', grp: 'よくあるご質問', q: '以前この機能を申し込んだのですが、ログイン方法が分からなくなりました。', a: 'クリエイター・ギャラリー機能は、お申込み時のユーザーアカウントに紐づいています。もう一度お申込みいただく必要はありません。ログイン方法が分からない場合は、ログイン画面の「パスワードをお忘れの方」から、ご登録のメールアドレスでパスワードを再設定してログインしてください。ログインすると、これまでのクリエイター・ギャラリーページや機能をそのままご利用いただけます。ご登録のメールアドレスもご不明な場合は、お手数ですが{{contact}}より事務局までご連絡ください。' },
  { id: 'CAP-02', cat: ['creator-apply', 'gallery-apply'], aud: 'common', grp: 'よくあるご質問', q: '申し込んでから、いつ使えるようになりますか？', a: 'お申込み後、個展なび事務局が申込内容を確認し、設定作業を行います。少々お時間をいただき、設定が完了しましたら設定完了メールでお知らせします。確認にかかる日数はお約束していないため、お早めのお申込みをおすすめします。' },
  { id: 'CAP-10', cat: ['creator-apply', 'gallery-apply', 'watch'], aud: 'common', grp: 'よくあるご質問', q: '「ウォッチ」とは何ですか？', a: '個展なびのユーザーが、気になるクリエイター・ギャラリーを登録しておけるサイトの機能です（フォローのようなもの）。ウォッチしておくと、そのクリエイター・ギャラリーが新しい展覧会・作品・記事を掲載したときに自動でお知らせが届きます。クリエイター・ギャラリーにとっては、掲載を続けるほど活動が届きやすくなる仕組みです。' },
  { id: 'CAP-08', cat: ['creator-apply', 'gallery-apply'], aud: 'common', grp: 'よくあるご質問', q: 'すでにギャラリーとして登録していますが、クリエイター機能も使えますか？', a: 'クリエイターとギャラリーは、いずれか一方のご利用となります。両方を同時にご利用いただくことはできません。ご不明な場合は{{contact}}よりご連絡ください。' },
  { id: 'CAP-09', cat: ['creator-apply', 'gallery-apply'], aud: 'common', grp: 'よくあるご質問', q: 'ここで解決しない場合は？', a: 'ここで解決しない場合は、{{contact}}よりご連絡ください。' },

  /* ─── cat:'liaison'（リエゾン/リエゾン+ サービス全般＝p70-1/p70-2 ハブ）───
     出典＝p70-1「よくある質問」5問。aud=common（全ロール向けサービス案内）。 */
  { id: 'LIA-01', cat: 'liaison', aud: 'common', grp: 'リエゾン / リエゾン+', q: 'リエゾンは本当に無料ですか', a: 'はい、ご利用に費用は一切かかりません。出展料・月会費・登録料、すべて無料です。' },
  { id: 'LIA-02', cat: 'liaison', aud: 'common', grp: 'リエゾン / リエゾン+', q: '会期の途中から公開することはできますか', a: '可能です。「公開する」を実行したタイミングから展示が始まります。ただしリエゾンは展覧会と連動する性質のため、会期初日からの公開を推奨いたします。' },
  { id: 'LIA-03', cat: 'liaison', aud: 'common', grp: 'リエゾン / リエゾン+', q: '作品画像はどんなサイズが適していますか', a: '長辺2,000px以上、JPEG（品質80以上）またはPNG形式、ファイルサイズ10MB以下を推奨します。アップロード後は自動的に長辺1,200pxにリサイズされ、ウォーターマークが付与されます。' },
  { id: 'LIA-04', cat: 'liaison', aud: 'common', grp: 'リエゾン / リエゾン+', q: '画像の著作権はどうなりますか', a: '著作権はクリエイターに帰属します。個展なびは展示目的での利用のみ行います。アップロード時の自動ウォーターマーク付与と長辺1,200pxへのリサイズにより、二次利用への対策を行っています。' },
  { id: 'LIA-05', cat: 'liaison', aud: 'common', grp: 'リエゾン / リエゾン+', q: 'あとからリエゾン+（販売あり）に切り替えられますか', a: '可能です。リエゾン+の利用申請（P11-4）が承認されると、展覧会編集画面で切り替えができます。すでに公開中の作品は一度非公開にしてから、販売情報（価格・送料設定）をご入力ください。' },

  /* ─── cat:'liaisonplus-apply'（リエゾンプラス機能申込＝p11-4）───
     申込ページ（p11-4）下部にアコーディオンFAQとして描画（KTN.renderQA '#p114Faq' guide）。
     すでにクリエイター／ギャラリー機能を持つ人が「販売あり」の追加機能を申し込む前提。
     「なぜ本人確認・口座が必要か」「リエゾンとの違い」「会場優先・キャンセル・サービス利用料・振込」を本文（About ゾーン）と整合。 */
  { id: 'LAP-09', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: 'リエゾンプラスを使うには、先にクリエイター／ギャラリー機能が必要ですか？', a: 'はい。リエゾンプラスは、すでにクリエイターまたはギャラリー機能をご利用中の方向けの追加機能です。まだ機能をお持ちでない場合は、先にクリエイター機能またはギャラリー機能をお申込みください。' },
  { id: 'LAP-02', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: 'リエゾンとリエゾンプラスは何が違いますか？', a: 'リエゾンは、会期中の展覧会と連動して出品作品を「オンラインで展示」できる機能です。リエゾンプラスは、その展示に加えて「作品の販売」までを行える機能です。販売＝実際に金銭のやり取りが発生するため、リエゾンプラスのご利用にはお申込み（このフォーム）と、本人確認・振込先口座のご登録が必要になります。' },
  { id: 'LAP-01', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: 'リエゾンプラスの利用は有料ですか？', a: 'オンライン展示の掲載は無料です。費用がかかるのは作品が売れたとき（取引成立時）のサービス利用料のみで、初期費用・月額費用はありません。サービス利用料は作品代金・送料・梱包費の合計（税込）に対して計算され、決済にかかる手数料もこの中に含まれます（別途負担はありません）。具体的な料率は上記の料金表をご覧ください。' },
  { id: 'LAP-08', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: 'サービス利用料はどのように計算され、売上はどのように精算されますか？', a: 'サービス利用料の料率は、作品の販売価格帯によって上記表のとおり決まります（決済にかかる手数料もこの中に含まれるため、別途のご負担はありません）。売上は、取引完了後、サービス利用料を差し引いた金額を、あらかじめ定められた振込日にご登録の口座へお振込みします（振込手数料は利用者のご負担）。振込日や下限額などの詳しい精算のしくみは、承認後にご案内する精算設定ページでご確認・設定いただけます。' },
  { id: 'LAP-03', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: 'なぜ本人確認情報や口座情報が必要なのですか？', a: 'リエゾンプラスは作品の売買が発生する販売サービスのためです。（1）なりすましの防止・出品作品の真正性の確認、また特定商取引法に基づき、購入者から請求があった場合に氏名・住所・電話番号をお伝えできるようにしておくため、個展なび独自の本人確認をお願いしています（常時公開されるわけではありません）。これは決済パートナーであるStripe社が行う確認とは別の手続きです。（2）売れた作品の売上をお振込みするため、振込先口座が必要です。口座情報そのものは個展なびではお預かりせず、決済パートナーであるStripe社の画面で直接ご登録いただきます。' },
  { id: 'LAP-12', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: 'Stripeという名前が出てきました。個展なびとは別のサービスですか？', a: 'Stripe（ストライプ）は、世界中の多くのオンラインサービスで使われている決済インフラの会社で、個展なびとは別の会社です。個展なびは売上のお振込み処理をStripe社に委託しており、振込先口座の登録・変更のみStripe社の画面で行っていただきます。それ以外の通常のご利用（お申込み・精算設定・登録口座の確認など）はすべて個展なびの画面内で完結するため、Stripeのダッシュボードへ日常的にログインいただく必要はありません。' },
  { id: 'LAP-13', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: 'Stripeと契約する必要はありますか？直接連絡が来ることはありますか？', a: 'はい。売上金の振込処理を委託するため、個展なびの本人確認審査を通過された後、Stripe社との間で決済代行契約を結んでいただきます。この手続きはStripe社の画面（ホスト型オンボーディング）で行い、振込先口座情報・生年月日や住所などの本人情報・本人確認書類の画像を直接ご入力いただきます（個展なびを経由して送信するのではなく、Stripe社の画面上に直接ご入力いただく方式です）。個展なびが先にお預かりした本人確認情報（お申込みフォーム）とは別に、Stripe社独自の確認としてあらためて入力が必要になりますので、あらかじめご準備ください。入力後は自動的に個展なびの画面へ戻ります。この手続きによりStripe社にアカウントが作成されますが、通常のご利用（売上確認・精算設定など）はすべて個展なびの画面内で完結するため、Stripe側のダッシュボードを日常的に操作いただく必要はありません。口座情報は個展なびでは保持せず、金融機関名・口座名義・口座番号の下数桁など一部情報のみ精算設定ページ（マイページ）でご確認いただけます。変更が必要な場合もその都度Stripe社の画面へ移動してご対応いただきます。なお、Stripe社の審査状況によっては、契約成立後にStripe社から直接メール等でご連絡があり、追加の本人確認書類の提出などご対応をお願いする場合があります。その際は届いたご案内に従ってご対応ください。' },
  { id: 'LAP-04', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: '申し込んでから、いつ使えるようになりますか？', a: 'お申込み後、個展なび事務局にて審査を行います。通常3〜5営業日以内に審査結果をメールでご連絡します。承認されると、展覧会の編集でリエゾンプラスを選べるようになり、展覧会のオーナーメニューの「リエゾンプラス出品管理」から出品設定を行えます。' },
  { id: 'LAP-06', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: '会場で作品が売れた場合はどうなりますか？', a: 'リエゾンプラスは会場での販売を優先する「会場優先型」です。会期中に会場で作品が売れたときは、出品者が「会場売約済」に設定します（システムが自動で判定するのではなく、会場の販売状況に合わせて出品者が操作します）。設定すると、オンラインの申込者へ自動でキャンセル通知が送られます（サービス利用料は発生しません）。なお、オンラインの販売期間は会期に合わせて柔軟に設定でき（最大で会期終了後2週間まで）、この販売期間中に購入申込を受け付けます。申し込まれた作品は、会場での販売状況に合わせて申込順に取引を進めます。' },
  { id: 'LAP-10', cat: 'liaisonplus-apply', aud: 'gallery', grp: 'よくあるご質問', q: 'ギャラリーとして、所属クリエイターの作品を出品できますか？', a: '出品できるのは、個展なびで確認・公開された展覧会の出展クリエイターの作品に限られます。作品の真正性についてはギャラリーが責任を負います。売上はギャラリーの登録口座へお振込みします。' },
  { id: 'LAP-14', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: '購入者への領収書は個展なびが発行するのですか？', a: 'いいえ。作品が売れた際に購入者へ交付される領収書は、個展なびのシステムが、出品者（あなた）がご登録の氏名または屋号・登録番号（インボイス制度の適格請求書発行事業者登録番号）をもとに、出品者ご本人の名義で作成・発行します。個展なび自身の名称や登録番号が記載されることはありません。登録番号は任意項目のため未登録でも構いませんが、その場合の領収書は税務上の適格請求書（インボイス）には該当しない旨が購入者にも案内されます。登録番号をお持ちの場合は、基本情報編集ページからいつでも登録・変更できます。' },
  { id: 'LAP-11', cat: 'liaisonplus-apply', aud: 'common', grp: 'よくあるご質問', q: 'ここで解決しない場合は？', a: 'ここで解決しない場合は、{{contact}}よりご連絡ください。' },

  /* ─── cat:'liaisonplus-listing'（LIAISON+展示・販売設定＝p2-12-1）───
     個別の出品（価格・梱包費・会場優先・購入確定後キャンセル）に関する理解確認。
     従来はp11-4申込フォームの同意チェックボックスだったが、包括的な申込段階より実際に出品操作を行う
     このページの方が理解を得やすいとの判断で移設（2026-07-28）。QA形式＝毎回のチェック必須にはしない。 */
  { id: 'LPL-01', cat: 'liaisonplus-listing', aud: 'common', grp: '出品にあたって', q: '販売価格や梱包費・送料は、あとから変更できますか？', a: '販売価格・梱包費・送料は出品者が設定・負担するもので、購入確定後は変更できません（申込者がいる作品は価格欄自体がロックされます）。出品前に金額をよくご確認のうえ登録してください。' },
  { id: 'LPL-02', cat: 'liaisonplus-listing', aud: 'common', grp: '出品にあたって', q: '会場で作品が売れた場合はどうすればいいですか？', a: 'このサービスは会場での販売を優先する「会場優先型」です。会期中に会場で作品が売れたときは、この画面（申込者がいる場合はLIAISON+コンソール）から「会場売約済」に変更してください。オンラインの申込者へは自動でキャンセル通知が送られます（サービス利用料は発生しません）。' },
  { id: 'LPL-03', cat: 'liaisonplus-listing', aud: 'common', grp: '出品にあたって', q: '購入確定後、出品者からキャンセルできますか？', a: '原則としてキャンセルには応じられません。購入が確定する前であれば「会場売約済」「出品取消」で対応できますが、購入確定後は取引が完了するまでキャンセルできません。やむを得ない事情がある場合はサポートへご連絡ください。' },

  /* ─── cat:'liaison-txn' / side:'seller'（出品者の取引＝creator/gallery 共通）───
     取引デスク（p3-16/p4-16）・LIAISON+コンソール（p3-15/p4-15）・出品者ハブ（p70-12）が共通で描画する統合セット。
     旧 ctx（desk/console）分割は廃止＝取引デスクとコンソールで重複していたQ（申込対応・会場売約済・発送・キャンセル 等）を1問へ統合した（2026-07-13）。
     phase＝取引デスクの現状態連動（new/paid・省略＝常時表示）。コンソール／ハブは phase を無視して全問表示する。 */
  { id: 'TXN-S01', cat: 'liaison-txn', side: 'seller', aud: 'common', phase: ['new'], grp: '出品者の取引', q: '申込が来たら最初に何をすればいいですか？', a: 'コンソールの「取引中」タブに「購入確定待ち」として表示されます。取引デスクへ進み、まず会場でその作品がまだ販売されていないことを確認してください。会場で売れている場合はLIAISON+コンソールで「会場売約済」に変更してください（申込者全員に自動でキャンセル通知が送られます）。会場で売れていなければ申込内容を確認し、送料・梱包費・支払期限を設定して「購入を確定」してください。複数の申込がある場合は申込順に処理されます。' },
  { id: 'TXN-S02', cat: 'liaison-txn', side: 'seller', aud: 'common', phase: ['new'], grp: '出品者の取引', q: '会場で作品が売れてしまった場合は？（「会場売約済」ボタンの使い方）', a: 'まだ申込が入っていない場合は、展覧会の「リエゾン+出品管理」画面で販売状態を「売約済」に変更してください。すでに申込が入っている場合は、LIAISON+コンソールの「会場売約済」ボタンを使います（会期中に会場で作品が実際に売れたときの操作です）。ボタンを押すと作品が「売約済」に変更され、申込者全員に自動でキャンセル通知が送られます。この操作は取り消せません。' },
  { id: 'TXN-S03', cat: 'liaison-txn', side: 'seller', aud: 'common', grp: '出品者の取引', q: '「会場売約済」と「出品取消」の違いは何ですか？', a: '「会場売約済」は会場での販売を理由に作品を売約済にします（作品の状態が「売約済」に変更されます）。「出品取消」はLIAISON+からの出品自体を取り下げます（作品の状態は変更されません）。どちらも申込者へ自動でキャンセル通知が送られ、いずれも取り消しできません。' },
  { id: 'TXN-S04', cat: 'liaison-txn', side: 'seller', aud: 'common', grp: '出品者の取引', q: '取引をキャンセルできますか？', a: '申込が入った後も、特定の申込だけをキャンセルすることはできません。会場で作品が売れた場合は「会場売約済」に、やむを得ない事情で販売を続けられない場合は「出品取消」で対応できますが、いずれも購入を確定する前に限られます（その作品への申込はすべて取り消されます）。いったん購入を確定したあとは、取引が完了するまで、「会場売約済」「出品取消」を含め出品者側から取引をキャンセルすることはできません。' },
  { id: 'TXN-S05', cat: 'liaison-txn', side: 'seller', aud: 'common', phase: ['new'], grp: '出品者の取引', q: '送料の設定の仕方は？', a: '購入者の郵便番号（都道府県）を参考に、実際の発送コストを入力してください。梱包費を購入者に求める場合は梱包費欄に入力します（出品者負担の場合は空欄のままで構いません）。送料・梱包費とも確定後は変更できませんので、慎重に入力してください。' },
  { id: 'TXN-S06', cat: 'liaison-txn', side: 'seller', aud: 'common', phase: ['paid'], grp: '出品者の取引', q: '発送方法はどれを選べばいいですか？', a: '小〜中型の作品はヤマト宅急便・佐川急便・ゆうパックが一般的です。大型の額装作品や割れ物はヤマト「らくらく家財宅急便」が梱包・取扱いの面で適しています。「送料を確認」ボタンで各社の送料目安を確認できます。' },
  { id: 'TXN-S07', cat: 'liaison-txn', side: 'seller', aud: 'common', phase: ['paid'], grp: '出品者の取引', q: '「発送待ち」になりました。作品の発送はいつ、どうすればいいですか？', a: '「発送待ち」は購入者の支払いが完了した状態です。支払い完了通知が届いたら、できるだけ早めに作品を梱包・発送してください。ただし、会期中で展示している作品は、会期が終了してからの発送で問題ありません。発送の際は「配送先情報」に表示された住所へ送り、取引デスクで発送方法と追跡番号を入力して「発送完了を通知する」を押すと、購入者に発送通知が届きます。' },
  { id: 'TXN-S08', cat: 'liaison-txn', side: 'seller', aud: 'common', grp: '出品者の取引', q: '販売期間が終了したのに、まだ「取引中」に表示されています。', a: '未処理の申込がある場合は、販売期間終了後も「取引中」タブに表示されます。すべての申込の処理（取引完了またはキャンセル）が完了すると、自動的に「終了」タブへ移動します。' },
  { id: 'TXN-S09', cat: 'liaison-txn', side: 'seller', aud: 'common', grp: '出品者の取引', q: '作品の価格や状態を変更したいのですが。', a: '展覧会ページ→オーナーメニュー→「リエゾン+出品管理」から変更できます。ただし、申込者がいる作品は価格と状態の変更がロックされています。' },
  { id: 'TXN-S10', cat: 'liaison-txn', side: 'seller', aud: 'common', grp: '出品者の取引', q: '取引完了後、代金はいつ振り込まれますか？', a: '取引完了後、あらかじめ定められた振込日に、サービス利用料を差し引いた金額が登録口座に振り込まれます。振込スケジュールとサービス利用料の詳細は販売代金管理ページでご確認ください。' },
  { id: 'TXN-S11', cat: 'liaison-txn', side: 'seller', aud: 'common', grp: '出品者の取引', q: '売上サマリーの「うち未精算」とは何ですか？', a: '取引が完了しているが、まだ個展なびから振込まれていない金額の合計です。「販売代金管理」ページで精算予定日や振込先口座の確認・登録ができます。' },
  { id: 'TXN-S12', cat: 'liaison-txn', side: 'seller', aud: 'common', grp: '出品者の取引', q: '受け取った作品に問題があると購入者から連絡があった場合は？', a: 'まず取引メッセージで状況を確認し、誠実に対応してください。破損等の問題がある場合は事務局へご連絡ください。取引メッセージのやり取りを保存しておくことをお勧めします。' },
  { id: 'TXN-S13', cat: 'liaison-txn', side: 'seller', aud: 'common', grp: '出品者の取引', q: '購入者の住所・氏名はいつまで確認できますか？', a: '個人情報保護のため、取引完了から1週間後に購入者の氏名・配送先住所（お届け先情報）はこのページから消去されます。発送に必要な情報は期間中に確認してください。取引メッセージは取引完了から2週間後に非公開になります（削除はされず、取引の記録として保存されます）。なお、取引明細・売上情報（個人情報を除く）はアーカイブと販売代金管理ページで引き続き確認できます。' },
  { id: 'TXN-S14', cat: 'liaison-txn', side: 'seller', aud: 'common', grp: '出品者の取引', q: '取引が完了した作品は、その後どうなりますか？', a: '作品はポートフォリオ（作品管理）に残り、クリエイターページへの公開/非公開もこれまで通り設定できます。ただし作品はご購入者の所有となるため、LIAISON / LIAISON+ の出品候補からは自動的に外れ、再出品や作品情報の編集はできません（クローンで複製した作品は新規作品として出品できます）。公開ページでは「売約済」と表示されます。会場売却などで手動設定した「売約済」はこの対象外で、状態の変更や再出品が可能です。' },

  /* ─── cat:'liaison-settlement' / side:'seller'（精算・振込＝creator/gallery共通）───
     販売代金管理（p3-17/p4-17）が KTN.renderQA({category:'liaison-settlement', side:'seller', style:'desk'}) で描画する専用セット。
     liaison-txn（取引フロー本体）とは別カテゴリ＝精算スケジュール・下限額・振込手数料・口座名義など「精算」固有の質問に限定する。 */
  { id: 'SET-01', cat: 'liaison-settlement', side: 'seller', aud: 'common', grp: '精算・振込', q: '精算はいつ行われますか？', a: '精算は月末締め・翌月20日払いです。月末（締め日）時点の残高が、あなたが設定した精算下限額以上の場合、翌月20日（20日が金融機関休業日にあたる場合は翌営業日）に一括で振込が実行されます。出品者が都度リクエストするオンデマンド精算はできません。' },
  { id: 'SET-02', cat: 'liaison-settlement', side: 'seller', aud: 'common', grp: '精算・振込', q: '精算下限額とは何ですか？', a: '1回の精算で振り込む最低金額です。月末（締め日）時点の残高がこの金額に満たない場合は振込を行わず、残高は翌月以降に繰り越されます（繰り越しに期限はありません）。精算下限額は「精算設定」からいつでも変更できます。' },
  { id: 'SET-03', cat: 'liaison-settlement', side: 'seller', aud: 'common', grp: '精算・振込', q: '振込手数料はどちらが負担しますか？', a: '振込手数料は出品者（あなた）のご負担です。精算金額から手数料を差し引いた金額が口座に振り込まれます。' },
  { id: 'SET-04', cat: 'liaison-settlement', side: 'seller', aud: 'common', grp: '精算・振込', q: '振込先口座の名義が本人確認情報の氏名と違う場合はどうなりますか？', a: '振込先口座の名義（カナ）は、本人確認情報にご登録の氏名と一致している必要があります。一致しない場合は保存時にエラーとなり、振込先として登録できません。名義が異なる正当な事情がある場合は個展なび事務局へご連絡ください。' },
  { id: 'SET-05', cat: 'liaison-settlement', side: 'seller', aud: 'common', grp: '精算・振込', q: '振込先口座はいつでも変更できますか？', a: 'はい、いつでも変更できます。変更した口座は次回以降の精算から反映されます（すでに処理が始まっている精算には反映されません）。' },
  { id: 'SET-06', cat: 'liaison-settlement', side: 'seller', aud: 'common', grp: '精算・振込', q: '精算履歴はいつまで確認できますか？', a: '期限なく、このページでいつでもご確認いただけます。取引ごとの内訳（作品名・送料・サービス利用料等）はLIAISON+コンソールの「終了した展覧会」アーカイブでご確認いただけます。' },
  { id: 'SET-07', cat: 'liaison-settlement', side: 'seller', aud: 'common', grp: '精算・振込', q: 'Stripeから直接メールが届きました。対応が必要ですか？', a: '精算・振込の処理には決済パートナーであるStripe社のサービスを利用しており、運用状況によりStripeから直接、本人確認情報の再確認などのご案内メールが届くことがあります。これは正規のご案内です。期限内にご対応いただけないと、精算（振込）が一時停止する場合がありますので、内容をご確認のうえご対応ください。メールの送信元やご不明点がある場合は、個展なび事務局までご連絡いただければ確認いたします。' },
  { id: 'SET-08', cat: 'liaison-settlement', side: 'seller', aud: 'common', grp: '精算・振込', q: 'Stripeのアカウントを自分で管理する必要がありますか？', a: 'いいえ。精算設定や口座情報の変更など、通常のご利用はすべてこのページ（個展なび）で完結し、Stripe側の画面を操作いただく必要はありません。初回のご登録時にのみ、Stripeの利用規約へのご同意など簡単な連携手続きをお願いする場合があります。' },
  { id: 'SET-09', cat: 'liaison-settlement', side: 'seller', aud: 'common', grp: '精算・振込', q: '振込日（20日）が土日祝日などの金融機関休業日にあたる場合はどうなりますか？', a: 'その場合は翌営業日に振り込まれます（決済パートナーであるStripe社の入金スケジュールに準じます）。年末年始などで休業日が続く場合も同様に、直後の営業日にまとめて処理されます。' },

  /* ─── cat:'liaison-txn' / side:'buyer'（購入者の取引＝user）───
     取引ワークスペース（p5-15）・購入管理（p5-14）・購入者ハブ（p70-11）が共通で描画する統合セット。
     旧 ctx（desk/console）分割は廃止＝ワークスペースと購入管理で重複していたQ（流れ・キャンセル・支払・受取確認・領収書 等）を1問へ統合した（2026-07-13）。
     phase＝取引ワークスペースの現状態連動（applied/payment/paid/receipt・省略＝常時表示）。購入管理／ハブは phase を無視して全問表示する。 */
  { id: 'TXN-B01', cat: 'liaison-txn', side: 'buyer', aud: 'common', grp: '購入者の取引', q: '申込してから購入完了まで、どんな流れですか？', a: '申込 → 購入確定（出品者が会場在庫を確認して確定）→ 支払 → 発送（出品者）→ 受取確認 → 完了確認（出品者）→ 取引完了、の順に進みます。各ステップで通知が届きますので、案内に従って操作してください。' },
  { id: 'TXN-B02', cat: 'liaison-txn', side: 'buyer', aud: 'common', phase: ['applied'], grp: '購入者の取引', q: '「申込済」と「購入確定待ち」はどう違いますか？', a: 'この作品は1点もので、会場でのご購入が最優先です。購入申込は申込順に処理されます。「申込済」は、申込を受け付けたあと、申込順であなたの番が来るのを待っている状態です。この段階では確定期限はまだ発生せず、取引ワークスペースには進めません（キャンセルは購入管理ページから行えます）。あなたの番が来ると自動的に「購入確定待ち」へ変わり、出品者が会場在庫の確認（会場未売・発送対応可否）を行って購入を確定すると、支払いへ進めます。会期中でも在庫が確認できれば確定されることがあります。この時点で確定期限が表示され、取引ワークスペースで手続きを進められます。確定期限は会期終了7日後または申込7日後の遅い方で、期限までに出品者がいずれの操作（購入確定／会場売約済／出品取消）も行わなかった場合、その作品は出品取消となり、申込者全員にキャンセル通知が届きます（次の方へは繰り上がりません）。なお前の順番の方が支払期限切れや自己都合でキャンセルした場合は、あなたの順番が繰り上がります。' },
  { id: 'TXN-B03', cat: 'liaison-txn', side: 'buyer', aud: 'common', grp: '購入者の取引', q: '申込・購入をキャンセルできますか？', a: 'お支払い前であればキャンセルできます。「申込済」（順番待ち）の作品は購入管理ページの「申込をキャンセル」から、「購入確定待ち」以降（支払待ちを含む）は取引ワークスペースからキャンセルします。キャンセル後も販売期間中であれば再申込できますが、申込順は最後尾になります。支払いが完了した後は原則キャンセルできません（出品者の発送が期限を過ぎた場合を除く）。' },
  { id: 'TXN-B04', cat: 'liaison-txn', side: 'buyer', aud: 'common', phase: ['applied'], grp: '購入者の取引', q: '郵便番号を変更したい場合は？', a: '郵便番号は申込時に送料を計算するために登録した情報のため、変更はできません。変更が必要な場合は申込をキャンセルし、正しい郵便番号で再申込ください。なお、再申込の場合は申込順の最後になります。' },
  { id: 'TXN-B05', cat: 'liaison-txn', side: 'buyer', aud: 'common', phase: ['payment'], grp: '購入者の取引', q: '支払い方法と支払いタイミングは？', a: '出品者の購入確定が完了すると支払いページへ案内されます。クレジットカードでのお支払いとなります。支払期限が設けられていますので、通知を受け取ったら速やかに対応してください。' },
  { id: 'TXN-B06', cat: 'liaison-txn', side: 'buyer', aud: 'common', phase: ['paid'], grp: '購入者の取引', q: '作品はいつ届きますか？', a: '支払い完了後に出品者が梱包・発送します。発送されると通知が届き、追跡番号も取引ワークスペースで確認できます。到着予定は配送業者・距離により異なります。' },
  { id: 'TXN-B07', cat: 'liaison-txn', side: 'buyer', aud: 'common', phase: ['receipt'], grp: '購入者の取引', q: '「受取確認」とは何をすればいいですか？', a: '作品が届いたら評価を入力し、取引ワークスペースで「受け取りを確認しました」ボタンを押してください。その後、出品者の取引完了確認が行われると代金が確定されます。受け取り後は速やかにご確認ください。' },
  { id: 'TXN-B08', cat: 'liaison-txn', side: 'buyer', aud: 'common', grp: '購入者の取引', q: '受け取った作品に問題があった場合は？', a: 'まず取引ワークスペースのメッセージ機能で出品者に連絡してください。解決しない場合は{{contact}}より事務局へご連絡ください。受取確認後のキャンセルは原則受け付けられません。受け取り時に必ず状態をご確認ください。' },
  { id: 'TXN-B09', cat: 'liaison-txn', side: 'buyer', aud: 'common', grp: '購入者の取引', q: '取引完了後、領収書の発行や購入管理はいつまでできますか？', a: '取引完了後も、購入管理ではいつでも取引をご確認いただけます。領収書は取引ワークスペースの「領収書を発行」ボタンからPDF形式で発行できます。この領収書は出品者がご登録の氏名・登録番号をもとに個展なびのシステムが生成するもので、出品者本人の名義で発行されます（個展なびの名称・登録番号ではありません）。出品者が適格請求書発行事業者として登録番号を登録していない場合、その領収書は税務上の適格請求書（インボイス）には該当しませんのでご注意ください。' },
  { id: 'TXN-B10', cat: 'liaison-txn', side: 'buyer', aud: 'common', grp: '購入者の取引', q: '購入した作品はコレクションルームでどう扱われますか？公開されますか？', a: '取引完了後、作品はあなたのコレクションルーム（マイページ）に収蔵されます。収蔵作品は既定では非公開です。あなたがコレクションルームを公開し、その作品も公開に設定した場合のみ、作品ページに「現在の所蔵」としてあなたのコレクションルームへの案内が表示されます。公開するかどうかはいつでも変更できます。' }
];

/* cat×aud×side でフィルタし、target に描画する。
   opts = {
     category : 'exhibition-edit' | 'liaison' | 'liaison-txn'   … 省略で全件
     audience : 'creator' | 'gallery'                            … common は常に可視。省略で aud フィルタ無し
     side     : 'seller' | 'buyer'                               … liaison-txn 用。side を持つ項目のみ絞る（side無し項目は常に可視）
     style    : 'guide'（既定）| 'desk'
   }
   ─ style:'guide' … group 見出し（.p60-faq-group）＋アコーディオン（.p70-faq-item）。p60/p70 ガイドページ用。
   ─ style:'desk'  … group 見出し無しのフラット（.p315-faq-item）。phase を data-faq-phase へ出力し、
                     取引デスク（p3-16/p4-16/p5-15）の現phase連動JSがそのまま出し分ける。
                     コンソール（p3-15/p4-15/p5-14）も同じフラット描画を流用（phase 無し＝常時表示）。
   ※ 旧 ctx（desk/console）軸は 2026-07-13 に廃止。取引デスクとコンソールで重複していたQを side 単位の統合セットへ集約した。 */
KTN.renderQA = function (target, opts) {
  var el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el || !KTN.QA) return;
  opts = opts || {};
  var cat = opts.category, aud = opts.audience, side = opts.side,
      style = opts.style || 'guide';
  /* cat は item 側・opts 側とも string か配列を許す（配列＝複数カテゴリで共有できる項目／複数カテゴリをまとめて描画）。
     いずれかが交差すれば該当。従来の string×string 呼び出しは挙動不変。 */
  var wantCats = cat == null ? null : (Array.isArray(cat) ? cat : [cat]);
  var inCat = function (xc) {
    if (!wantCats) return true;
    var has = Array.isArray(xc) ? xc : [xc];
    return has.some(function (c) { return wantCats.indexOf(c) >= 0; });
  };
  var items = KTN.QA.filter(function (x) {
    if (!inCat(x.cat)) return false;
    if (aud && !(x.aud === 'common' || x.aud === aud)) return false;
    if (side && x.side && x.side !== side) return false;
    return true;
  });
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
  /* 回答本文（プレーン単一ソース）内の {{contact}} トークンを、現在ページ＋該当QAを文脈として渡す
     お問合わせフォーム（p60-11）へのリンクに変換する。esc は & < > のみ置換するので {{contact}} はそのまま残る。 */
  var ansHtml = function (x) {
    var s = esc(x.a);
    if (s.indexOf('{{contact}}') >= 0) {
      var from = (window.ktnState && window.ktnState.page) || '';
      var href = './kotennavi-p60-11.html?from=' + encodeURIComponent(from) + '&qa=' + encodeURIComponent(x.id);
      s = s.split('{{contact}}').join('<a href="' + href + '" class="ktn-guide-link">お問合わせフォーム</a>');
    }
    return s;
  };
  var html = '';

  if (style === 'desk') {
    /* 取引デスク＝フラット。phase 配列があれば data-faq-phase（半角空白区切り）へ。省略＝常時表示。 */
    html = items.map(function (x) {
      var ph = (x.phase && x.phase.length) ? ' data-faq-phase="' + esc(x.phase.join(' ')) + '"' : '';
      return '<details class="p315-faq-item"' + ph + '>'
           + '<summary class="p315-faq-item__q"><span class="p315-faq-item__q-mark">Q</span> ' + esc(x.q) + '</summary>'
           + '<div class="p315-faq-item__a"><p>' + ansHtml(x) + '</p></div>'
           + '</details>';
    }).join('');
    el.innerHTML = html;
    return;
  }

  /* guide（既定）＝group 見出し＋アコーディオン。hideGroup=true でページ側ゾーンヘッダーに委ね group 見出しを省く */
  var hideGroup = opts.hideGroup;
  var curGrp = null;
  items.forEach(function (x) {
    if (x.grp !== curGrp) {
      if (curGrp !== null) html += '</div>';
      curGrp = x.grp;
      html += (hideGroup ? '' : '<h3 class="p60-faq-group">' + esc(x.grp) + '</h3>') + '<div class="p70-faq">';
    }
    html += '<details class="p70-faq-item"><summary>' + esc(x.q) + '</summary>'
          + '<div class="p70-faq-item__body">' + ansHtml(x) + '</div></details>';
  });
  if (curGrp !== null) html += '</div>';
  el.innerHTML = html;
};

/* ══════════════════════════════════
   統合レンダリング
   ページ側で window.ktnRender() を定義するとヘッダーも再描画される
══════════════════════════════════ */
function renderAll() {
  if (typeof window.ktnRender === 'function') window.ktnRender();
  renderSidebar();
  renderBottomNav();
  renderTagbar(window.ktnState.page);
  updateActiveState(window.ktnState.page);
  syncAdminNote();
}

/* 管理者コメント欄（コンテンツ編集ページ共通）を role で表示切替。
   .ktn-admin-note を持つページなら自動で効くため、ページ側の結線は不要。 */
function syncAdminNote() {
  var isAdmin = window.ktnState.role === 'admin';
  document.querySelectorAll('.ktn-admin-note').forEach(function (el) {
    el.hidden = !isAdmin;
  });
}

/* ── DOMContentLoaded で初期化 ── */
document.addEventListener('DOMContentLoaded', function () {
  renderAll();
});

/* ══ ヘッダー パンくず / アクション定義 ══ */


/* ══════════════════════════════════
   ページ定義
══════════════════════════════════ */
const PAGES = {
  // P1 トップ
  'p1': { n: '個展なびトップ', bc: [['Top', '/'], ['個展なびトップ', null]] },
  // P2 展覧会
  'p2': { n: '展覧会', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', null]] },
  'p2-1': { n: '展覧会-スケジュール', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['スケジュール', null]] },
  'p2-2': { n: '展覧会-開催場所', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['開催場所', null]] },
  'p2-3': { n: '展覧会-記事・案内', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['記事・案内', null]] },
  'p2-4': { n: '展覧会-出展者', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['出展者', null]] },
  'p2-5': { n: '展覧会-リエゾン作品一覧', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['LIAISON作品一覧', null]] },
  'p2-5-1': { n: '展覧会-リエゾンプラス作品一覧', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['LIAISON+ 作品一覧', null]] },
  'p2-6': { n: '展覧会-作品リスト', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['作品リスト', null]] },
  'p2-11': { n: '展覧会-新規/編集/クローン', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['松田啓佑展［仮称］', '/p2'], ['展覧会を編集', null]] },
  'p2-12': { n: 'LIAISON 作品管理', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['LIAISON 作品管理', null]] },
  'p2-121': { n: 'LIAISON+ 作品管理', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['LIAISON+ 作品管理', null]] },
  'p2-13': { n: '展覧会-記事管理', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['記事管理', null]] },
  'p2-14': { n: '展覧会-インサイト', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['インサイト', null]] },
  'p2-15': { n: '展覧会-広告作成', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['広告作成', null]] },
  'p2-16': { n: '展覧会-修正依頼', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', '/p2'], ['修正依頼', null]] },
  // 旧「展覧会-報告」は全表示系共通の報告フォーム 'p60-13'「問題を報告する」に統合（2026-07-24）。
  // P3 クリエイター
  'p3': { n: 'クリエイター', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', null]] },
  'p3-1':  { n: '展覧会', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['展覧会一覧', null]] },
  'p3-2':  { n: 'クリエイター-記事',   w: '--w-index',   bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['記事一覧', null]] },
  'p3-3':  { n: 'クリエイター-作品',   w: '--w-index',   bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['作品一覧', null]] },
  'p3-11': { n: 'クリエイター-編集', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['編集', null]] },
  'p3-12': { n: 'クリエイター-インサイト', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['インサイト', null]] },
  'p3-13': { n: 'クリエイター-オーディエンス管理', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['オーディエンス管理', null]] },
  'p3-14': { n: 'クリエイター-ポートフォリオ管理', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['ポートフォリオ管理', null, 'l']] },
  'p3-15': { n: 'クリエイター-リエゾンコンソール', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['リエゾン+コンソール', null]] },
  'p3-16': { n: 'クリエイター-取引デスク', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['取引デスク', null, 'lp']] },
  'p3-17': { n: 'クリエイター販売代金管理', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['販売代金管理', null, 'lp']] },
  'p3-18': { n: 'クリエイター-展覧会管理', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['展覧会管理', null]] },
  'p3-19': { n: 'クリエイター-記事管理', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['記事管理', null]] },
  // P4 ギャラリー
  'p4': { n: 'ギャラリー', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', null]] },
  'p4-1': { n: 'ギャラリー-展覧会アーカイブ', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['展覧会アーカイブ', null]] },
  'p4-2': { n: 'ギャラリー-記事一覧', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['記事一覧', null]] },
  'p4-11': { n: 'ギャラリー-編集', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['編集', null]] },
  'p4-12': { n: 'ギャラリー-インサイト', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['インサイト', null]] },
  'p4-13': { n: 'ギャラリー-オーディエンス管理', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['オーディエンス管理', null]] },
  'p4-14': { n: 'ギャラリー-インベントリー管理', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['インベントリー管理', null]] },
  'p4-15': { n: 'ギャラリー-リエゾンコンソール', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['リエゾン+コンソール', null]] },
  'p4-16': { n: 'ギャラリー-取引デスク', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['取引デスク', null, 'lp']] },
  'p4-17': { n: 'ギャラリー-販売代金管理', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['販売代金管理', null, 'lp']] },
  'p4-18': { n: 'ギャラリー-展覧会管理', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['展覧会管理', null]] },
  'p4-19': { n: 'ギャラリー-記事管理', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['記事管理', null]] },
  // P5 ユーザー
  'p5': { n: 'ユーザー-展覧会カレンダー', bc: [['Top', '/'], ['山田花子 myページ', null]] },
  'p5-1': { n: 'ユーザー-ウオッチリスト', bc: [['Top', '/'], ['myページ', '/p5'], ['ウオッチリスト', null]] },
  'p5-2': { n: 'ユーザー-チェックイン記録', bc: [['Top', '/'], ['myページ', '/p5'], ['チェックイン記録', null]] },
  'p5-3': { n: 'ユーザー-興味あり!リスト', bc: [['Top', '/'], ['myページ', '/p5'], ['興味あり!リスト', null]] },
  'p5-4': { n: 'ユーザー-保存した検索条件', bc: [['Top', '/'], ['myページ', '/p5'], ['保存した検索条件', null]] },
  'p5-11': { n: 'ユーザー-編集', bc: [['Top', '/'], ['myページ', '/p5'], ['編集', null]] },
  'p5-12': { n: 'ユーザー-パスワード管理', bc: [['Top', '/'], ['myページ', '/p5'], ['パスワード管理', null]] },
  'p5-13': { n: 'ユーザー-メール通知管理', bc: [['Top', '/'], ['myページ', '/p5'], ['メール通知管理', null]] },
  'p5-14': { n: 'ユーザー-購入管理', bc: [['Top', '/'], ['myページ', '/p5'], ['購入管理', null, 'lp']] },
  'p5-15': { n: 'ユーザー-取引ワークスペース', bc: [['Top', '/'], ['myページ', '/p5'], ['取引ワークスペース', null, 'lp']] },
  'p5-16': { n: 'ユーザー-取引ワークスペース-支払', bc: [['Top', '/'], ['myページ', '/p5'], ['取引ワークスペース', '/p5-15'], ['支払', null, 'lp']] },
  'p5-100': { n: 'ユーザー-退会', bc: [['Top', '/'], ['myページ', '/p5'], ['退会', null]] },
  // P6 作品
  'p6':   { n: '作品詳細',
    bc: [['Top', '/'], ['作品', '/p10-1'], ['オノマトペの庭', null]] },
  'p6-1': { n: 'LIAISON作品',
    bc: [['Top', '/'], ['作品', '/p10-1'], ['オノマトペの庭', '/p6'], ['LIAISON', null, 'l']] },
  'p6-2': { n: 'LIAISON+作品',
    bc: [['Top', '/'], ['作品', '/p10-1'], ['オノマトペの庭', '/p6'], ['LIAISON+', null, 'lp']] },
  'p6-11': { n: '作品-新規/編集/クローン', bc: [['Top', '/'], ['作品', '/p10-1'], ['オノマトペの庭', '/p6'], ['新規/編集/クローン', null]] },
  'p6-12': { n: '作品-インサイト', bc: [['Top', '/'], ['作品', '/p10-1'], ['春の記憶 #3', '/p6'], ['インサイト', null]] },
  'p6-13': { n: '作品-問合せ', bc: [['Top', '/'], ['作品', '/p10-1'], ['春の記憶 #3', '/p6'], ['問合せ', null, 'l']] },
  'p6-14': { n: '作品-問合せへの回答', bc: [['Top', '/'], ['作品', '/p10-1'], ['春の記憶 #3', '/p6'], ['問合せへの回答', null, 'l']] },
  'p6-15': { n: '作品-記事管理', bc: [['Top', '/'], ['作品', '/p10-1'], ['オノマトペの庭', '/p6'], ['記事管理', null]] },
  // P7 記事
  'p7': { n: '記事', bc: [['Top', '/'], ['記事', '/p7-list'], ['『オノマトペの庭』制作について', null]] },
  'p7-11': { n: '記事-新規/編集/クローン', bc: [['Top', '/'], ['『オノマトペの庭』制作について', '/p7'], ['編集', null]] },
  // P8 レビュー
  'p8': { n: 'レビュー', bc: [['Top', '/'], ['レビュー', '/p8-list'], ['あなたが知らないオノマトペ レビュー', null]] },
  'p8-11': { n: 'レビュー-編集', bc: [['Top', '/'], ['レビュー', '/p8-list'], ['編集', null]] },
  // P9 ニュース
  'p9': { n: 'ニュース', bc: [['Top', '/'], ['ニュース', '/p9-list'], ['個展なびが新機能を発表', null]] },
  'p9-11': { n: 'ニュース-新規/編集/クローン', bc: [['Top', '/'], ['ニュース', '/p9-list'], ['編集', null]] },
  // P10 検索・特集
  'p10': { n: '検索-展覧会', bc: [['Top', '/'], ['検索', null]] },
  'p10-1': { n: '検索-作品', bc: [['Top', '/'], ['検索', null]] },
  'p10-2': { n: '検索-クリエイター', bc: [['Top', '/'], ['検索', null]] },
  'p10-3': { n: '検索-ギャラリー', bc: [['Top', '/'], ['検索', null]] },
  'p10-4': { n: '特集-展覧会', bc: [['Top', '/'], ['特集', '/feature'], ['展覧会', null]] },
  'p10-5': { n: '特集-作品', bc: [['Top', '/'], ['特集', '/feature'], ['作品', null]] },
  'p10-6': { n: '特集-クリエイター', bc: [['Top', '/'], ['特集', '/feature'], ['クリエイター', null]] },
  'p10-7': { n: '特集-ギャラリー', bc: [['Top', '/'], ['特集', '/feature'], ['ギャラリー', null]] },
  // P11 認証・申込
  'p11': { n: 'ログイン', bc: [['Top', '/'], ['ログイン', null]] },
  'p11-1': { n: 'ユーザー新規登録', bc: [['Top', '/'], ['ログイン', null]] },
  'p11-2': { n: 'クリエイター機能申込', bc: [['Top', '/'], ['クリエイター機能申込', null]] },
  'p11-3': { n: 'ギャラリー機能申込', bc: [['Top', '/'], ['ギャラリー機能申込', null]] },
  'p11-4': { n: 'リエゾンプラス機能申込', bc: [['Top', '/'], ['リエゾンプラス機能申込', null, 'lp']] },
  'p11-11': { n: 'ログイン-パスワードを忘れた方', bc: [['Top', '/'], ['ログイン-パスワードを忘れた方', null]] },
  'p11-12': { n: 'ログインパスワード再設定', bc: [['Top', '/'], ['ログインパスワード再設定', null]] },
  'p11-21': { n: 'ユーザー新規登録-アカウント仮登録完了', bc: [['Top', '/'], ['ユーザー新規登録-アカウント仮登録完了', null]] },
  'p11-22': { n: 'ユーザー新規登録-メールアドレス確認完了', bc: [['Top', '/'], ['ユーザー新規登録-メールアドレス確認完了', null]] },
  'p11-23': { n: 'ユーザー新規登録-パスワード設定', bc: [['Top', '/'], ['ユーザー新規登録-パスワード設定', null]] },
  'p11-24': { n: 'ユーザー新規登録-ウオッチ対象の選択', bc: [['Top', '/'], ['ユーザー新規登録-ウオッチ対象の選択', null]] },
  // P60 ガイド・法的（番号は docs/sitemap.md を正とする）
  'p60': { n: 'ご利用ガイド', bc: [['Top', '/'], ['ガイド', null]] },
  'p60-1': { n: '展覧会情報を探したい方', bc: [['Top', '/'], ['ガイド', '/p60'], ['展覧会情報を探したい方', null]] },
  'p60-2': { n: '展覧会情報を掲載したい方', bc: [['Top', '/'], ['ガイド', '/p60'], ['展覧会情報を掲載したい方', null]] },
  'p60-3': { n: '広告を出したい方', bc: [['Top', '/'], ['ガイド', '/p60'], ['広告を出したい方', null]] },
  'p60-4': { n: 'よくある質問-一般', bc: [['Top', '/'], ['ガイド', '/p60'], ['よくある質問-一般', null]] },
  'p60-5': { n: 'よくある質問-ユーザー編', bc: [['Top', '/'], ['ガイド', '/p60'], ['よくある質問-ユーザー編', null]] },
  'p60-6': { n: 'よくある質問-クリエイター編', bc: [['Top', '/'], ['ガイド', '/p60'], ['よくある質問-クリエイター編', null]] },
  'p60-7': { n: 'よくある質問-ギャラリー編', bc: [['Top', '/'], ['ガイド', '/p60'], ['よくある質問-ギャラリー編', null]] },
  'p60-8': { n: '個展なびとは', bc: [['Top', '/'], ['個展なびとは', null]] },
  'p60-9': { n: '利用規約', bc: [['Top', '/'], ['利用規約', null]] },
  'p60-10': { n: 'プライバシポリシー', bc: [['Top', '/'], ['プライバシポリシー', null]] },
  'p60-11': { n: 'お問合わせ', bc: [['Top', '/'], ['お問合わせ', null]] },
  'p60-12': { n: 'サービス機能改善要望', bc: [['Top', '/'], ['サービス機能改善要望', null]] },
  'p60-13': { n: '問題を報告する', bc: [['Top', '/'], ['問題を報告する', null]] },
  // P61 お知らせ
  'p61': { n: 'お知らせ一覧', bc: [['Top', '/'], ['お知らせ一覧', null]] },
  // P70 LIAISONガイド
  'p70': { n: 'リエゾンとは', bc: [['Top', '/'], ['LIAISONとは', null]] },
  'p70-1': { n: 'リエゾン-作品出品ガイド', bc: [['Top', '/'], ['LIAISON', '/p70'], ['リエゾン-作品出品ガイド', null]] },
  'p70-2': { n: 'リエゾンプラス-作品販売ガイド', bc: [['Top', '/'], ['LIAISON', '/p70'], ['リエゾンプラス-作品販売ガイド', null]] },
  'p70-3': { n: '作品購入までの流れ', bc: [['Top', '/'], ['LIAISON', '/p70'], ['作品購入までの流れ', null]] },
  'p70-4': { n: '送料・配送について', bc: [['Top', '/'], ['LIAISON', '/p70'], ['送料・配送について', null]] },
  'p70-5': { n: '送料一覧', bc: [['Top', '/'], ['LIAISON', '/p70'], ['送料一覧', null]] },
  'p70-6': { n: '特定商取引法に基づく表示', bc: [['Top', '/'], ['LIAISON', '/p70'], ['特定商取引法に基づく表示', null]] },
  'p70-7': { n: 'リエゾンプラスのサービス利用料について', bc: [['Top', '/'], ['LIAISON', '/p70'], ['リエゾンプラスのサービス利用料について', null]] },
  'p70-8': { n: 'ギャラリーへの説明ガイド', bc: [['Top', '/'], ['LIAISON', '/p70'], ['ギャラリーへの説明ガイド', null]] },
  'p70-9': { n: '作品画像撮影ガイド', bc: [['Top', '/'], ['LIAISON', '/p70'], ['作品画像撮影ガイド', null]] },
  'p70-11': { n: 'リエゾンプラス-取引ガイド(購入者編)', bc: [['Top', '/'], ['LIAISON', '/p70'], ['取引ガイド 購入者編', null]] },
  'p70-12': { n: 'リエゾンプラス-取引ガイド(出品者編)', bc: [['Top', '/'], ['LIAISON', '/p70'], ['取引ガイド 出品者編', null]] },
  // P90 管理者
  'p90': { n: '管理者メニュー', bc: [['Top', '/'], ['管理者メニュー', null]] },
  'p90-1': { n: '管理者-ユーザー新規/クローン', bc: [['Top', '/'], ['管理者', '/p90'], ['ユーザー新規/クローン', null]] },
  'p90-2': { n: '管理者-クリエイター/ギャラリー機能申込管理', bc: [['Top', '/'], ['管理者', '/p90'], ['クリエイター/ギャラリー機能申込管理', null]] },
  'p90-2-1': { n: '管理者-クリエイター/ギャラリー機能申込審査', bc: [['Top', '/'], ['管理者', '/p90'], ['クリエイター/ギャラリー機能申込管理', '/p90-2'], ['審査', null]] },
  'p90-3': { n: '管理者-展覧会新規', bc: [['Top', '/'], ['管理者', '/p90'], ['展覧会新規', null]] },
  'p90-4': { n: '管理者-本日開催・公開の展覧会一覧', bc: [['Top', '/'], ['管理者', '/p90'], ['本日開催・公開の展覧会一覧', null]] },
  'p90-5': { n: '管理者-未公開の展覧会一覧', bc: [['Top', '/'], ['管理者', '/p90'], ['未公開の展覧会一覧', null]] },
  'p90-6': { n: '管理者-最新の展覧会一覧', bc: [['Top', '/'], ['管理者', '/p90'], ['最新の展覧会一覧', null]] },
  'p90-7': { n: '管理者-クリエイター新規/クローン', bc: [['Top', '/'], ['管理者', '/p90'], ['クリエイター新規/クローン', null]] },
  'p90-8': { n: '管理者-ギャラリー新規/クローン', bc: [['Top', '/'], ['管理者', '/p90'], ['ギャラリー新規/クローン', null]] },
  'p90-9': { n: '管理者-メールテンプレート管理', bc: [['Top', '/'], ['管理者', '/p90'], ['メールテンプレート管理', null]] },
  'p90-10': { n: '管理者-ダッシュボード', bc: [['Top', '/'], ['管理者', '/p90'], ['ダッシュボード', null]] },
  'p90-11': { n: '管理者-リエゾンプラス機能申込管理', bc: [['Top', '/'], ['管理者', '/p90'], ['リエゾンプラス機能申込管理', null, 'lp']] },
  'p90-11-1': { n: '管理者-リエゾンプラス機能申込審査', bc: [['Top', '/'], ['管理者', '/p90'], ['リエゾンプラス機能申込管理', '/p90-11'], ['審査', null]] },
  'p90-12': { n: '管理者-リエゾンプラスコンソール', bc: [['Top', '/'], ['管理者', '/p90'], ['リエゾンプラスコンソール', null, 'lp']] },
  'p90-13': { n: '管理者-取引デスク', bc: [['Top', '/'], ['管理者', '/p90'], ['取引デスク', null, 'lp']] },
  'p90-14': { n: '管理者-販売代金管理', bc: [['Top', '/'], ['管理者', '/p90'], ['販売代金管理', null, 'lp']] },
  'p90-15': { n: '管理者-リエゾンプラス申込者一覧', bc: [['Top', '/'], ['管理者', '/p90'], ['リエゾンプラス申込者一覧', null, 'lp']] },
  'p90-16': { n: '管理者-作品購入ユーザー一覧', bc: [['Top', '/'], ['管理者', '/p90'], ['作品購入ユーザー一覧', null, 'lp']] },
};

/* ページID → 表示名（パンくず登録名）。外部（p60-11 の問い合わせ元表示等）から参照するための公開アクセサ。 */
KTN.pageName = function (id) { return (PAGES[id] && PAGES[id].n) || id || ''; };

/* ══════════════════════════════════
   ヘルパー — HTML生成
══════════════════════════════════ */
function hib(iconK, label, id = '', action = '') {
  const idAttr = id ? ' id="' + id + '"' : '';
  let actAttr = '';
  let oc = '';
  if (action === 'interest') {
    actAttr = ' data-action="interest"';
    oc = ` onclick="handleAction(this,'interest');event.preventDefault()"`;
  } else if (action === 'watch') {
    actAttr = ' data-action="watch"';
  }
  return '<button class="ktn-hib"' + idAttr + actAttr + oc + '><span class="ktn-hib__icon">' + ic16(iconK) + '</span><span class="ktn-hib__lbl">' + label + '</span></button>';
}
function sep() { return `<div class="ktn-hdr-sep"></div>`; }

/* ── シェアボタン生成（モーダルを開くだけ） ── */
function shareBtn() {
  return `<button class="ktn-hib" onclick="doShare()" aria-label="シェア">
      ${ic16('share')}<span class="ktn-hib__lbl">シェア</span>
    </button>
  </div>`;
}
function owbtn(iconK, label, onclick = '') {
  const oc = onclick ? ` onclick="${onclick}"` : '';
  return `<button class="ktn-hdr-owbtn"${oc}>${ic(iconK)}<span>${label}</span></button>`;
}
let ddSeq = 0;
function dd(label, items, noChevron = false) {
  const id = 'dd' + (++ddSeq);
  const chv = noChevron ? '' : `<svg class="chv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${I.chev}</svg>`;
  return `<div class="ktn-ddw"><button class="ktn-ddbtn" onclick="toggleDD('${id}',this)">${label}${chv}</button><div class="ktn-ddmenu" id="${id}">${items}</div></div>`;
}
function ddMore(items) { return dd('…', items, true); }
function ddi(iconK, label, danger = false, onclick = '') {
  const oc = onclick ? ` onclick="closeAllPanels();${onclick}"` : '';
  return `<button class="ktn-ddi${danger ? ' danger' : ''}"${oc}>${ic(iconK)}${label}</button>`;
}
function ddSep() { return `<div class="ktn-dd-sep"></div>`; }

/* 「問題を報告する」＝全表示系ページ共通の報告フォーム P60-13 へ from/type 文脈付きで遷移（単一ソース）。
   ページ固有の報告ページ（旧 p2-17 等）は作らず、対象種別を type で受け渡して p60-13 側で理由select を出し分ける。 */
const REPORT_TYPE = {
  p2: 'exhibition', 'p2-1': 'exhibition', 'p2-2': 'exhibition', 'p2-3': 'exhibition', 'p2-4': 'exhibition', 'p2-5': 'exhibition', 'p2-5-1': 'exhibition', 'p2-6': 'exhibition',
  p3: 'creator', 'p3-1': 'creator', 'p3-2': 'creator', 'p3-3': 'creator',
  p4: 'gallery', 'p4-1': 'gallery', 'p4-2': 'gallery',
  p6: 'artwork', 'p6-1': 'artwork', 'p6-2': 'artwork',
  p7: 'article', p8: 'review'
};
function reportItem(page) {
  const type = REPORT_TYPE[page] || 'other';
  const href = './kotennavi-p60-13.html?from=' + encodeURIComponent(page) + '&type=' + type;
  return `<button class="ktn-ddi danger" onclick="location.href='${href}'">${ic('warn')}問題を報告する</button>`;
}

/* P5（マイページ）全サブページ共通「設定」dd（単一ソース） */
function p5SettingsMenuItems() {
  return ddi('edit', 'プロフィール編集', false, "location.href='./kotennavi-p5-11.html'") +
    ddi('key', 'パスワード', false, "location.href='./kotennavi-p5-12.html'") +
    ddi('bell', 'メール通知設定', false, "location.href='./kotennavi-p5-13.html'") + ddSep() +
    ddi('trash', '退会', true);
}

/* P2＝展覧会の「LIAISON 展示設定・作品管理」ルーティング。p2-11（編集フォーム）の選択中ラジオ→
   p2（トップ）のバッジ状態→どちらも無ければ liaison 扱いの順にフォールバックして振り分ける。 */
function p2GotoWorks() {
  var radio = document.querySelector('input[name="p211liaison"]:checked');
  var badge = document.getElementById('p2LiaisonBadge');
  var state = null;
  if (radio) {
    state = radio.value; // 'none' | 'liaison' | 'plus'
  } else if (badge) {
    state = (badge.style.display === 'none') ? 'none' : (badge.classList.contains('li-plus') ? 'plus' : 'liaison');
  } else {
    state = 'liaison';
  }
  if (state === 'plus') location.href = './kotennavi-p2-12-1.html';
  else if (state === 'liaison') location.href = './kotennavi-p2-12.html';
  else KTN.toast('この展覧会はLIAISON/LIAISON+が設定されていません');
}
window.p2GotoWorks = p2GotoWorks;

/* 展覧会の会期・確認状態（デモ用グローバル状態）。setPeriod()/setLiaison()（p2.html）・
   setConfirmed()/toggleLiaisonMode()（p2-11.html）が直接プロパティを書き換えてから ktnRender() を呼ぶ。 */
KTN.exh = { phase: 'during', confirmed: true, publishArrived: true, liaison: 'plus', salesOver: false };
function ktnExhState() {
  var e = KTN.exh || {};
  var num;
  if (e.phase === 'after') num = 3;
  else if (e.phase === 'before' && !e.confirmed) num = 1;
  else num = 2;
  return { num: num, phase: e.phase, confirmed: e.confirmed, publishArrived: e.publishArrived, liaison: e.liaison, salesOver: e.salesOver };
}
function ktnSetExh(key, val, btn) {
  if (val === 'true') val = true;
  else if (val === 'false') val = false;
  KTN.exh[key] = val;
  if (btn) {
    document.querySelectorAll('[data-exh-key="' + key + '"]').forEach(function (b) {
      b.classList.toggle('on', b === btn);
    });
  }
  if (typeof ktnRender === 'function') ktnRender();
}
window.ktnExhState = ktnExhState;
window.ktnSetExh = ktnSetExh;

/* P2（展覧会）編集可否（ヘッダーのクイック「編集」ボタン・p2OwnerMenuItems()両方で共用）。
   確認済かつ会期終了後のみ編集不可。それ以外（確認前は会期段階問わず／確認済かつ会期終了前）は編集可。 */
function p2CanEdit() {
  var st = ktnExhState();
  return !(st.confirmed && st.phase === 'after');
}

/* P2（展覧会）オーナーメニュー（単一ソース・p2/p2-1〜p2-6/p2-11/p2-12/p2-12-1/p2-13/p2-14 共通）。
   分岐の主軸は confirmed（管理者確認済かどうか）：
   - 確認前：会期状態に関わらず編集・記事管理・削除のみ（リエゾン/インサイト/QR/フライヤーは非表示）
   - 確認済かつ会期終了後：編集ボタンなし。記事管理＋（リエゾン+かつ販売期間内なら）リエゾン+項目＋インサイト
   - 確認済かつ会期終了前（会期前・会期中とも）：編集・記事管理・QR・フライヤーを表示。リエゾン/リエゾン+・インサイトは公開日到達済の場合のみ追加表示 */
function p2OwnerMenuItems() {
  var st = ktnExhState();
  var edit = ddi('edit', '展覧会編集', false, "location.href='./kotennavi-p2-11.html'");
  var articles = ddi('file', '記事管理', false, "location.href='./kotennavi-p2-13.html'");
  var liaisonLabel = st.liaison === 'plus' ? 'リエゾン+ 展示設定・作品管理' : 'リエゾン 展示設定・作品管理';
  var liaisonItem = st.liaison !== 'none' ? ddi('grid', liaisonLabel, false, 'p2GotoWorks()') : '';
  var insight = ddi('chart', 'インサイト', false, "location.href='./kotennavi-p2-14.html'");
  var qr = ddi('qr', '会場チェックイン用QRコードを表示', false, "ktnListQr('venue')");
  var flyer = ddi('print', '会場フライヤーを作成', false, 'ktnVenueFlyer()');
  var del = ddi('trash', '削除', true);

  if (!st.confirmed) {
    return edit + ddSep() + articles + ddSep() + del;
  }

  if (st.phase === 'after') {
    var items3 = articles;
    if (st.liaison === 'plus' && !st.salesOver) items3 += ddSep() + liaisonItem;
    items3 += ddSep() + insight;
    return items3;
  }

  var items = edit + ddSep() + articles + ddSep() + qr + ddSep() + flyer;
  if (st.publishArrived) {
    if (liaisonItem) items += ddSep() + liaisonItem;
    items += ddSep() + insight;
  }
  return items;
}

/* P2 管理者メニュー（オーナーメニューの全項目を含むスーパーセット＋管理者専用項目）。
   オーナーメニューが状態次第で非表示にしている項目（確認前/公開前で消えるインサイト、確認済で消える削除）を
   管理者は常時利用できるよう補完し、さらにクローンを追加する。 */
function p2AdminMenuItems() {
  var st = ktnExhState();
  var items = p2OwnerMenuItems();
  var ended = st.phase === 'after';
  var hasInsight = st.confirmed && (ended || st.publishArrived);
  if (!hasInsight) items += ddSep() + ddi('chart', 'インサイト', false, "location.href='./kotennavi-p2-14.html'");
  items += ddSep() + ddi('clone', 'クローン');
  var hasDel = !st.confirmed;
  if (!hasDel) items += ddSep() + ddi('trash', '削除', true);
  return items;
}

/* P3（クリエイター）オーナーメニュー（単一ソース・トップ〜全管理サブページ共通） */
function p3OwnerMenuItems() {
  return ddi('edit', 'プロフィール編集', false, "location.href='./kotennavi-p3-11.html'") + ddSep() +
    ddi('grid', '展覧会を管理', false, "location.href='./kotennavi-p3-18.html'") +
    ddi('frame', 'ポートフォリオ管理', false, "location.href='./kotennavi-p3-14.html'") +
    ddi('file', '記事管理', false, "location.href='./kotennavi-p3-19.html'") + ddSep() +
    ddi('shop', 'LIAISON+コンソール', false, "location.href='./kotennavi-p3-15.html'") +
    ddi('desk', '取引デスク', false, "location.href='./kotennavi-p3-16.html'") +
    ddi('sales', '販売代金管理', false, "location.href='./kotennavi-p3-17.html'") + ddSep() +
    ddi('watch', 'オーディエンス管理', false, "location.href='./kotennavi-p3-13.html'") +
    ddi('chart', 'インサイト', false, "location.href='./kotennavi-p3-12.html'") + ddSep() +
    ddi('share', 'ページを共有する', false, "ktnPageShare('creator')") +
    ddi('qr', 'ウォッチ用QRコードを表示', false, "ktnListQr('creator')") + ddSep() +
    ddi('user', 'アカウント設定', false, "location.href='./kotennavi-p5.html'");
}

/* P4（ギャラリー）オーナーメニュー（単一ソース・p3と対称・インベントリー管理のみラベル差） */
function p4OwnerMenuItems() {
  return ddi('edit', 'ギャラリー情報編集', false, "location.href='./kotennavi-p4-11.html'") + ddSep() +
    ddi('grid', '展覧会を管理', false, "location.href='./kotennavi-p4-18.html'") +
    ddi('frame', 'インベントリー管理', false, "location.href='./kotennavi-p4-14.html'") +
    ddi('file', '記事管理', false, "location.href='./kotennavi-p4-19.html'") + ddSep() +
    ddi('shop', 'LIAISON+コンソール', false, "location.href='./kotennavi-p4-15.html'") +
    ddi('desk', '取引デスク', false, "location.href='./kotennavi-p4-16.html'") +
    ddi('sales', '販売代金管理', false, "location.href='./kotennavi-p4-17.html'") + ddSep() +
    ddi('watch', 'オーディエンス管理', false, "location.href='./kotennavi-p4-13.html'") +
    ddi('chart', 'インサイト', false, "location.href='./kotennavi-p4-12.html'") + ddSep() +
    ddi('share', 'ページを共有する', false, "ktnPageShare('gallery')") +
    ddi('qr', 'ウォッチ用QRコードを表示', false, "ktnListQr('gallery')") + ddSep() +
    ddi('user', 'アカウント設定', false, "location.href='./kotennavi-p5.html'");
}

/* P3/P4 共通・管理者専用メニュー（アカウントを持つロールページなので統計/精算/なりすまし/強制退会まで持つ） */
function p3p4AdminItems() {
  return ddi('chart', '統計') + ddi('sales', '精算') + ddSep() +
    ddi('user', 'なりすましログイン') + ddi('clone', 'クローン') + ddSep() +
    ddi('trash', '強制退会', true) + ddi('trash', '削除', true);
}

/* P6（作品）オーナーメニュー（単一ソース） */
function p6OwnerItems() {
  return ddi('edit', '作品編集') + ddSep() + ddi('chart', 'インサイト') + ddSep() + ddi('trash', '削除', true);
}

/* P7（記事）オーナーメニュー（単一ソース） */
function p7OwnerItems() {
  return ddi('edit', '編集') + ddSep() + ddi('trash', '削除', true);
}

/* P6/P7 共通・管理者専用メニュー（コンテンツのみのページ＝アカウント操作系は持たない） */
function p6p7AdminItems() {
  return ddi('clone', 'クローン') + ddSep() + ddi('trash', '削除', true);
}

/* ══════════════════════════════════
   アクション定義（ページグループ × ロール）
══════════════════════════════════ */
function getActions(page, role) {
  ddSeq = 0; // IDリセット（レンダリングごと）

  /* デモバーの役割ボタンはページによって 'user+creator'/'user+gallery'（p2/p3/p4トップ等）と
     'creator'/'gallery'（管理サブページ等）が混在するため、以降の分岐は正規化した値で判定する。 */
  if (role === 'user+creator') role = 'creator';
  else if (role === 'user+gallery') role = 'gallery';

  /* ── P2 展覧会トップ＋公開サブページ（p2-1〜p2-6・p2-5-1） ── */
  if (['p2', 'p2-1', 'p2-2', 'p2-3', 'p2-4', 'p2-5', 'p2-5-1', 'p2-6'].includes(page)) {
    const cmn = hib('heart', '興味あり', '', 'interest') + shareBtn() + sep();
    const editBtn = p2CanEdit() ? owbtn('edit', '編集', "location.href='./kotennavi-p2-11.html'") : '';
    if (role === 'guest' || role === 'login')
      return cmn + ddMore(ddi('fix', '修正を依頼する', false, "location.href='./kotennavi-p2-16.html'") + ddSep() + reportItem(page));
    if (role === 'creator' || role === 'gallery')
      return cmn + editBtn + dd('オーナーメニュー', p2OwnerMenuItems());
    if (role === 'admin')
      return cmn + editBtn + dd('オーナーメニュー', p2OwnerMenuItems()) + dd('管理者', p2AdminMenuItems());
    return cmn;
  }

  /* ── P2 管理サブページ群（展覧会編集／LIAISON・LIAISON+作品管理／記事管理／インサイト） ── */
  if (['p2-11', 'p2-12', 'p2-121', 'p2-13', 'p2-14'].includes(page)) {
    if (role === 'creator' || role === 'gallery')
      return owbtn('info', 'ガイド') + dd('オーナーメニュー', p2OwnerMenuItems());
    if (role === 'admin')
      return owbtn('info', 'ガイド') + dd('オーナーメニュー', p2OwnerMenuItems()) + dd('管理者', p2AdminMenuItems());
    return '';
  }

  /* ── P3 クリエイタートップ＋公開サブページ（p3-1〜p3-3） ── */
  if (['p3', 'p3-1', 'p3-2', 'p3-3'].includes(page)) {
    const cmn = hib('watch', 'ウォッチ', page === 'p3' ? 'ktnP3WatchHib' : '', 'watch') + shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + ddMore(reportItem(page));
    if (role === 'creator')
      return cmn + owbtn('edit', '編集', "location.href='./kotennavi-p3-11.html'") + dd('オーナーメニュー', p3OwnerMenuItems());
    if (role === 'admin')
      return cmn + dd('オーナーメニュー', p3OwnerMenuItems()) + dd('管理者', p3p4AdminItems());
    return cmn;
  }

  /* ── P3 管理サブページ群（プロフィール編集／各種管理ページ・共通オーナーメニュー） ── */
  if (['p3-11', 'p3-12', 'p3-13', 'p3-14', 'p3-15', 'p3-16', 'p3-17', 'p3-18', 'p3-19'].includes(page)) {
    if (role === 'creator') return owbtn('info', 'ガイド') + dd('オーナーメニュー', p3OwnerMenuItems());
    if (role === 'admin') return owbtn('info', 'ガイド') + dd('オーナーメニュー', p3OwnerMenuItems()) + dd('管理者', p3p4AdminItems());
    return '';
  }

  /* ── P4 ギャラリートップ＋公開サブページ（p4-1〜p4-2） ── */
  if (['p4', 'p4-1', 'p4-2'].includes(page)) {
    const cmn = hib('watch', 'ウォッチ', '', 'watch') + shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + ddMore(reportItem(page));
    if (role === 'gallery')
      return cmn + owbtn('edit', '編集', "location.href='./kotennavi-p4-11.html'") + dd('オーナーメニュー', p4OwnerMenuItems());
    if (role === 'admin')
      return cmn + dd('オーナーメニュー', p4OwnerMenuItems()) + dd('管理者', p3p4AdminItems());
    return cmn;
  }

  /* ── P4 管理サブページ群（ギャラリー情報編集／各種管理ページ・共通オーナーメニュー） ── */
  if (['p4-11', 'p4-12', 'p4-13', 'p4-14', 'p4-15', 'p4-16', 'p4-17', 'p4-18', 'p4-19'].includes(page)) {
    if (role === 'gallery') return owbtn('info', 'ガイド') + dd('オーナーメニュー', p4OwnerMenuItems());
    if (role === 'admin') return owbtn('info', 'ガイド') + dd('オーナーメニュー', p4OwnerMenuItems()) + dd('管理者', p3p4AdminItems());
    return '';
  }

  /* ── P5 myページ＋サブ（p5-1/p5-2含む全サブページ共通「設定」dd・2026-08-14 統合） ── */
  if (['p5', 'p5-1', 'p5-2', 'p5-3', 'p5-4', 'p5-11', 'p5-12', 'p5-13', 'p5-14', 'p5-15', 'p5-16'].includes(page)) {
    if (role === 'guest') return '';
    const cmn = page === 'p5' ? shareBtn() + sep() : '';
    if (role === 'login' || role === 'creator' || role === 'gallery')
      return cmn + dd('設定', p5SettingsMenuItems());
    if (role === 'admin')
      return cmn + dd('設定', p5SettingsMenuItems()) + dd('管理者',
        ddi('edit', '編集') + ddSep() + ddi('user', 'なりすましログイン') + ddSep() + ddi('trash', '強制退会', true));
    return '';
  }

  /* ── P6 作品 ── */
  if (['p6', 'p6-1', 'p6-2'].includes(page)) {
    const cmn = hib('heart', '興味あり', '', 'interest') + shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + ddMore(reportItem(page));
    if (role === 'creator' || role === 'gallery')
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー', p6OwnerItems());
    if (role === 'admin')
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー', p6OwnerItems()) + dd('管理者', p6p7AdminItems());
    return cmn;
  }

  if (['p6-11', 'p6-12', 'p6-13', 'p6-14'].includes(page)) {
    if (role === 'creator' || role === 'gallery') return owbtn('info', 'ガイド');
    if (role === 'admin') return owbtn('info', 'ガイド') + sep() + dd('管理者', ddi('chart', '統計'));
    return '';
  }

  /* ── P7 記事 ── */
  if (page === 'p7') {
    const cmn = hib('heart', '興味あり', '', 'interest') + shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + ddMore(reportItem(page));
    if (role === 'creator' || role === 'gallery')
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー', p7OwnerItems());
    if (role === 'admin')
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー', p7OwnerItems()) + dd('管理者', p6p7AdminItems());
    return cmn;
  }

  if (page === 'p7-11') {
    if (role === 'creator' || role === 'gallery') return owbtn('info', 'ガイド');
    if (role === 'admin') return owbtn('info', 'ガイド') + sep() + dd('管理者', ddi('info', '詳細'));
    return '';
  }

  /* ── P8 レビュー ── */
  if (page === 'p8') {
    const cmn = shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + ddMore(reportItem(page));
    if (role === 'admin')
      return cmn + dd('管理者', ddi('edit', '編集') + ddSep() + ddi('trash', '削除', true));
    return cmn;
  }

  if (page === 'p8-11') {
    if (role === 'admin') return dd('管理者', ddi('edit', '編集') + ddSep() + ddi('trash', '削除', true));
    return '';
  }

  /* ── P9 ニュース ── */
  if (page === 'p9') {
    const cmn = shareBtn() + sep();
    if (role === 'admin')
      return cmn + dd('管理者', ddi('edit', '編集') + ddSep() + ddi('trash', '削除', true));
    return cmn;
  }

  if (page === 'p9-11') {
    if (role === 'admin') return dd('管理者', ddi('edit', '編集') + ddSep() + ddi('trash', '削除', true));
    return '';
  }

  /* ── P10 特集 ── */
  if (['p10-5', 'p10-6', 'p10-7', 'p10-8'].includes(page)) {
    if (role === 'admin') return dd('管理者', ddi('edit', '編集') + ddi('plus', '新規特集'));
    return '';
  }

  /* ── P60 ガイド・法的ページ ── */
  if (['p60', 'p60-4', 'p60-8', 'p60-9', 'p60-10'].includes(page)) {
    if (role === 'admin') return dd('管理者', ddi('edit', '編集'));
    return '';
  }

  /* ── P70 LIAISONガイド ── */
  if (['p70-1', 'p70-2', 'p70-4', 'p70-11', 'p70-12'].includes(page)) {
    if (role === 'admin') return dd('管理者', ddi('edit', '編集'));
    return '';
  }

  /* ── P90 管理者 ── */
  if (page === 'p90-1') {
    if (role === 'admin') return dd('管理者メニュー',
      ddi('plus', '新規展覧会') + ddi('user', '新規ユーザー') + ddi('edit', '新規クリエイター') + ddSep() +
      ddi('chart', 'ダッシュボード'));
    return '';
  }

  if (['p90-2', 'p90-2-1', 'p90-4', 'p90-9', 'p90-10', 'p90-11', 'p90-11-1', 'p90-13', 'p90-14'].includes(page)) {
    if (role === 'admin') return owbtn('info', 'ガイド');
    return '';
  }

  return '';
}

/* ══════════════════════════════════
   パンくず生成
══════════════════════════════════ */
function renderBc(page) {
  const p = PAGES[page];
  if (!p) return '';
  return p.bc.map((c, i) => {
    const isLast = i === p.bc.length - 1;
    const badge = c[2] === 'l'
      ? `<span class="ktn-bc__badge ktn-bc__badge--l">LIAISON</span>`
      : c[2] === 'lp'
        ? `<span class="ktn-bc__badge ktn-bc__badge--lp">LIAISON+</span>`
        : '';
    const sep = i > 0 ? `<span class="ktn-bc__sep">›</span>` : '';
    if (isLast || !c[1])
      return `${sep}<span class="ktn-bc__current">${c[0]}${badge}</span>`;
    return `${sep}<a href="${c[1]}" class="ktn-bc__link">${c[0]}</a>`;
  }).join('');
}

/* ══════════════════════════════════
   状態・レンダリング
══════════════════════════════════ */

function getWidthVar() {
  const w = document.body.dataset.w;
  if (w) return 'var(--w-' + w + ')';
  return 'var(--w-detail)';
}


/* ロール / ページ切替 */
function setR(v, btn) {
  curRole = v;
  document.querySelectorAll('.dbar [onclick^="setR"]').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  renderAll();
}
function setP(v, btn) {
  curPage = v;
  document.querySelectorAll('.dbar [onclick^="setP"]').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  renderAll();
}

/* ══════════════════════════════════
   公開API
   各ページHTMLで呼び出す:

     KTN.init({ page: 'p2-3', role: 'guest' });

   Drupal では:
     KTN.init({ page: '{{ page_id }}', role: '{{ user_role }}' });
══════════════════════════════════ */
window.KTN = window.KTN || {};

KTN.init = function (opts) {
  opts = opts || {};
  if (opts.page) window.ktnState.page = opts.page;
  if (opts.role) window.ktnState.role = opts.role;

  function _syncHH() {
    var hdr = document.getElementById('ktnHeader');
    if (!hdr) return;
    var h = hdr.offsetHeight;
    if (h > 10) document.documentElement.style.setProperty('--hh', h + 'px');
  }

  function _renderHeader() {
    var page = window.ktnState.page;
    var role = window.ktnState.role;
    document.documentElement.style.setProperty('--w-page', getWidthVar());
    var bcEl = document.getElementById('ktnBc');
    var acEl = document.getElementById('ktnActs');
    if (bcEl) bcEl.innerHTML = renderBc(page);
    if (acEl) acEl.innerHTML = getActions(page, role);
  }

  // common.jsのrenderAllから呼ばれるフック
  window.ktnRender = _renderHeader;

  /* innerWidth が変わった時だけ再計測する。
     iOS オーバースクロール・URLバー表示切替は innerHeight しか変わらないため無視できる。 */
  var _prevInnerW = 0;
  function _onResize() {
    var w = window.innerWidth;
    if (w === _prevInnerW) return;
    _prevInnerW = w;
    requestAnimationFrame(_syncHH);
  }

  /* p2系サブナビ（横スクロール・スクロールバー非表示）：狭い画面でアクティブタブが
     右端にはみ出して見えなくなるため、読み込み時にアクティブタブを可視位置へ寄せる */
  function _scrollActiveSubnav() {
    var bar = document.querySelector('.p2-subnav-bar');
    if (!bar || bar.scrollWidth <= bar.clientWidth) return;
    var act = bar.querySelector('.p2-subnav__item.is-active');
    if (!act) return;
    var barRect = bar.getBoundingClientRect();
    var actRect = act.getBoundingClientRect();
    if (actRect.right > barRect.right) bar.scrollLeft += actRect.right - barRect.right + 12;
    else if (actRect.left < barRect.left) bar.scrollLeft -= barRect.left - actRect.left + 12;
  }

  function _runPage() {
    _renderHeader();
    requestAnimationFrame(_syncHH); /* ヘッダーレンダリング直後に --hh を実測更新 */
    /* フォントロード・折り返し変化など任意のタイミングでヘッダー高さが変わったら --hh を更新 */
    if (window.ResizeObserver) {
      var _hdrEl = document.getElementById('ktnHeader');
      if (_hdrEl) new ResizeObserver(_syncHH).observe(_hdrEl);
    } else {
      document.fonts.ready.then(function(){ requestAnimationFrame(_syncHH); });
    }
    renderSidebar();
    renderBottomNav();
    renderTagbar(window.ktnState.page);
    updateActiveState(window.ktnState.page);
    requestAnimationFrame(_scrollActiveSubnav);
    /* フォント読込で幅が変わった後にも再調整（未スクロール時のみ実質作用） */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { requestAnimationFrame(_scrollActiveSubnav); });
    }
    _prevInnerW = window.innerWidth;
    window.addEventListener('resize', _onResize, { passive: true });
    /* ページ固有関数を実行（kotennavi-pages.js で定義） */
    var pageId = window.ktnState.page;
    if (window.KTN.pages && typeof window.KTN.pages[pageId] === 'function') {
      window.KTN.pages[pageId]();
    }
    /* CTAウィジェット共通初期化（ページ固有処理の後に実行） */
    if (window.KTN.cta && typeof window.KTN.cta.init === 'function') {
      window.KTN.cta.init();
    }
    /* 会場フライヤー・会場チェックインQR経由（?checkin=1）の自動チェックインモーダル起動（P2限定） */
    if (pageId === 'p2' && location.search.indexOf('checkin=1') !== -1 && typeof openCheckinModal === 'function') {
      requestAnimationFrame(function () { openCheckinModal(); });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _runPage);
  } else {
    _runPage();
  }
};


/* ══════════════════════════════════
   KTN.pagination — 管理一覧の共通ページング
   （p3-14/p4-14/p3-19 等・件数が多い一覧の並べ替え・絞り込みと組合せて使う）
══════════════════════════════════ */
KTN.pagination = (function () {
  /* 現在ページを中心に前後1ページ＋先頭/末尾を表示し、間は … で省略 */
  function _pageList(cur, total) {
    var list = [];
    for (var i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= cur - 1 && i <= cur + 1)) list.push(i);
    }
    var out = [], prev = 0;
    list.forEach(function (i) {
      if (prev && i - prev > 1) out.push('…');
      out.push(i);
      prev = i;
    });
    return out;
  }

  function render(el, opts) {
    if (!el) return;
    var page = opts.page || 1;
    var totalPages = Math.max(1, opts.totalPages || 1);
    var onGoto = opts.onGoto || function () {};
    if (totalPages <= 1) { el.innerHTML = ''; el.hidden = true; return; }
    el.hidden = false;
    var html = '<button type="button" class="ktn-pagination__btn ktn-pagination__btn--prev"' +
      (page <= 1 ? ' disabled' : '') + ' aria-label="前のページ">‹</button>';
    _pageList(page, totalPages).forEach(function (p) {
      html += (p === '…')
        ? '<span class="ktn-pagination__ellipsis">…</span>'
        : '<button type="button" class="ktn-pagination__btn' + (p === page ? ' is-active' : '') +
          '" data-page="' + p + '"' + (p === page ? ' aria-current="page"' : '') + '>' + p + '</button>';
    });
    html += '<button type="button" class="ktn-pagination__btn ktn-pagination__btn--next"' +
      (page >= totalPages ? ' disabled' : '') + ' aria-label="次のページ">›</button>';
    el.innerHTML = html;
    el.querySelectorAll('.ktn-pagination__btn[data-page]').forEach(function (btn) {
      btn.addEventListener('click', function () { onGoto(parseInt(btn.dataset.page, 10)); });
    });
    var prevBtn = el.querySelector('.ktn-pagination__btn--prev');
    var nextBtn = el.querySelector('.ktn-pagination__btn--next');
    if (prevBtn) prevBtn.addEventListener('click', function () { if (page > 1) onGoto(page - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { if (page < totalPages) onGoto(page + 1); });
  }

  return { render: render };
}());

/* ══════════════════════════════════
   チェックイン・レビュー モーダル
══════════════════════════════════ */
function openCheckinModal() {
  var role = (window.ktnState && window.ktnState.role) || 'guest';
  var isLoggedIn = (role !== 'guest');
  var _CI_ICON = '<svg viewBox="0 0 16 16" fill="none"><circle cx="10" cy="5" r="4" fill="#fff" opacity=".9"/><circle cx="5" cy="11" r="2.4" fill="#fff" opacity=".75"/></svg>';
  var _CLOSE_BTN = '<button class="ktn-auth-close" onclick="closeCheckinModal()" aria-label="閉じる"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';

  var existing = document.getElementById('ktnCheckinModal');
  if (existing) existing.remove();

  var html;
  if (!isLoggedIn) {
    /* ── 未ログイン：ログイン促進 ── */
    html =
      '<div class="ktn-auth-overlay" id="ktnCheckinModal" onclick="if(event.target===this)closeCheckinModal()">' +
      '<div class="ktn-auth-modal">' +
      '<div class="ktn-auth-top">' +
          '<button class="ktn-modal__close" onclick="closeCheckinModal()" aria-label="閉じる">\u00d7</button>' +
      '<div class="ktn-auth-icon">' + _CI_ICON + '</div>' +
      '<div class="ktn-auth-ttl">ログインが必要です</div>' +
            '<div class="ktn-auth-sub">ウォッチ・興味あり！・チェックインなどの<br>My機能が使えるようになります</div>' +
            '<div class="ktn-modal__btn-col">' +
              '<a href="/login" class="ktn-btn ktn-btn--primary">ログイン</a>' +
              '<a href="/register" class="ktn-btn">新規ユーザー登録（無料）</a>' +
            '</div>' +
            '<div class="ktn-modal__note">登録は無料です。<a href="/terms">利用規約</a>・<a href="/privacy">プライバシーポリシー</a>に<br>同意のうえご利用ください。</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  } else {
    /* ── ログイン済み：チェックイン＋レビューフォーム ── */
    var now = new Date();
    var defaultDate = now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0');
    html =
      '<div class="ktn-modal-overlay" id="ktnCheckinModal" onclick="if(event.target===this)closeCheckinModal()">' +
        '<div class="ktn-modal">' +
          '<button class="ktn-modal__close" onclick="closeCheckinModal()" aria-label="閉じる">\u00d7</button>' +
          '<div class="ktn-modal__inner">' +
            '<div class="ktn-modal__title">チェックイン＆レビューを書く</div>' +
            '<div class="ktn-modal__form-row">' +
              '<div class="ktn-modal__label">チェックイン日時</div>' +
              '<input type="date" class="ktn-modal__input" id="ktnCiDate" value="' + defaultDate + '">' +
            '</div>' +
            '<div class="ktn-modal__form-row">' +
              '<div class="ktn-modal__label">評価</div>' +
              '<div class="ktn-modal__stars" id="ktnStars">' +
                '<span class="ktn-modal__star" data-v="1" onclick="ktnSetStar(1)">\u2605</span>' +
                '<span class="ktn-modal__star" data-v="2" onclick="ktnSetStar(2)">\u2605</span>' +
                '<span class="ktn-modal__star" data-v="3" onclick="ktnSetStar(3)">\u2605</span>' +
                '<span class="ktn-modal__star" data-v="4" onclick="ktnSetStar(4)">\u2605</span>' +
                '<span class="ktn-modal__star" data-v="5" onclick="ktnSetStar(5)">\u2605</span>' +
              '</div>' +
            '</div>' +
            '<div class="ktn-modal__form-row">' +
              '<div class="ktn-modal__label">レビュー</div>' +
              '<textarea class="ktn-modal__textarea" id="ktnReviewText" placeholder="\u611f\u60f3\u3092\u304a\u66f8\u304d\u304f\u3060\u3055\u3044\u2026"></textarea>' +
            '</div>' +
            '<div class="ktn-modal__form-row">' +
              '<button class="ktn-modal__photo-btn" type="button">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
                '\u5199\u771f\u3092\u6dfb\u4ed8\u3059\u308b' +
              '</button>' +
            '</div>' +
            '<button class="ktn-btn ktn-btn--primary ktn-modal__submit" onclick="ktnSubmitCheckin()">' +
              '\u6295\u7a3f\u3059\u308b' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  document.body.insertAdjacentHTML('beforeend', html);
}

function closeCheckinModal() {
  var m = document.getElementById('ktnCheckinModal');
  if (m) m.remove();
}

/* ── openCheckinModal（旧実装を上書き） ── */
function openCheckinModal() {
  var role = (window.ktnState && window.ktnState.role) || 'guest';
  var isLoggedIn = (role !== 'guest');

  /* ゲストは共通ログインモーダル（#ktnAuthModal）に一本化 */
  if (!isLoggedIn) {
    if (window.KTN && KTN.action && KTN.action.show) KTN.action.show('checkin');
    return;
  }

  var existing = document.getElementById('ktnCheckinModal');
  if (existing) existing.remove();

  var CLOSE_BTN = '<button class="ktn-auth-close" onclick="closeCheckinModal()" aria-label="閉じる"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
  var CI_ICON = '<svg viewBox="0 0 16 16" fill="none"><circle cx="10" cy="5" r="4" fill="#fff" opacity=".9"/><circle cx="5" cy="11" r="2.4" fill="#fff" opacity=".75"/></svg>';
  var html;

  {
    var now = new Date();
    var defaultDate = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    html =
      '<div class="ktn-auth-overlay" id="ktnCheckinModal" onclick="if(event.target===this)closeCheckinModal()">' +
      '<div class="ktn-auth-modal">' +
      '<div class="ktn-auth-top ktn-auth-top--compact">' +
      CLOSE_BTN +
      '<div class="ktn-auth-icon">' + CI_ICON + '</div>' +
      '<div class="ktn-auth-ttl">チェックイン＆レビューを書く</div>' +
      '</div>' +
      '<div class="ktn-auth-body">' +
      '<div class="ktn-modal__form-row">' +
      '<div class="ktn-modal__label">チェックイン日時</div>' +
      '<input type="date" class="ktn-modal__input" id="ktnCiDate" value="' + defaultDate + '">' +
    '</div>' +
    '<div class="ktn-modal__form-row">' +
    '<div class="ktn-modal__label">評価</div>' +
    '<div class="ktn-modal__stars" id="ktnStars">' +
    '<span class="ktn-modal__star" data-v="1" onclick="ktnSetStar(1)">★</span>' +
    '<span class="ktn-modal__star" data-v="2" onclick="ktnSetStar(2)">★</span>' +
    '<span class="ktn-modal__star" data-v="3" onclick="ktnSetStar(3)">★</span>' +
    '<span class="ktn-modal__star" data-v="4" onclick="ktnSetStar(4)">★</span>' +
    '<span class="ktn-modal__star" data-v="5" onclick="ktnSetStar(5)">★</span>' +
    '</div>' +
    '</div>' +
    '<div class="ktn-modal__form-row">' +
    '<div class="ktn-modal__label">レビュー</div>' +
    '<textarea class="ktn-modal__textarea" id="ktnReviewText" placeholder="感想をお書きください…"></textarea>' +
    '</div>' +
    '<div class="ktn-modal__form-row">' +
    '<button class="ktn-modal__photo-btn" type="button">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
    '写真を1枚添付' +
    '</button>' +
    '</div>' +
      '<button class="ktn-auth-btn-primary ktn-modal__submit" onclick="ktnSubmitCheckin()">投稿する</button>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  document.body.insertAdjacentHTML('beforeend', html);
  var m = document.getElementById('ktnCheckinModal');
  if (m) requestAnimationFrame(function () { m.classList.add('open'); });
}

function ktnSetStar(v) {
  document.querySelectorAll('.ktn-modal__star').forEach(function(s) {
    s.classList.toggle('on', parseInt(s.dataset.v) <= v);
  });
}

function ktnSubmitCheckin() {
  showToast('\u6295\u7a3f\u3057\u307e\u3057\u305f\uff01');
  closeCheckinModal();
}

/* \u2500\u2500 \u30c1\u30a7\u30c3\u30af\u30a4\u30f3\uff06\u30ec\u30d3\u30e5\u30fc \u7de8\u96c6\u30e2\u30fc\u30c0\u30eb\uff08\u5171\u6709\uff1ap5-2\uff0f\u5c06\u6765 p2\u30fbp8-11 \u304c\u518d\u5229\u7528\uff09 \u2500\u2500
   opts: { title, date(yyyy-mm-dd), stars(0-5), review, focusReview, onSave({date,stars,review}) } */
function openCheckinEditModal(opts) {
  opts = opts || {};
  var existing = document.getElementById('ktnCheckinModal');
  if (existing) existing.remove();

  var CLOSE_BTN = '<button class="ktn-auth-close" onclick="closeCheckinModal()" aria-label="\u9589\u3058\u308b"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
  var CI_ICON = '<svg viewBox="0 0 16 16" fill="none"><circle cx="10" cy="5" r="4" fill="#fff" opacity=".9"/><circle cx="5" cy="11" r="2.4" fill="#fff" opacity=".75"/></svg>';
  var stars = opts.stars || 0;
  var starHtml = '';
  for (var i = 1; i <= 5; i++)
    starHtml += '<span class="ktn-modal__star' + (i <= stars ? ' on' : '') + '" data-v="' + i + '" onclick="ktnSetStar(' + i + ')">\u2605</span>';

  var html =
    '<div class="ktn-auth-overlay" id="ktnCheckinModal" onclick="if(event.target===this)closeCheckinModal()">' +
    '<div class="ktn-auth-modal">' +
    '<div class="ktn-auth-top ktn-auth-top--compact">' + CLOSE_BTN +
    '<div class="ktn-auth-icon">' + CI_ICON + '</div>' +
    '<div class="ktn-auth-ttl">' + (opts.title || '\u30c1\u30a7\u30c3\u30af\u30a4\u30f3\uff06\u30ec\u30d3\u30e5\u30fc\u3092\u7de8\u96c6') + '</div>' +
    '</div>' +
    '<div class="ktn-auth-body">' +
    '<div class="ktn-modal__form-row">' +
    '<div class="ktn-modal__label">\u30c1\u30a7\u30c3\u30af\u30a4\u30f3\u65e5</div>' +
    '<input type="date" class="ktn-modal__input" id="ktnCiDate" value="' + (opts.date || '') + '">' +
    '</div>' +
    '<div class="ktn-modal__form-row">' +
    '<div class="ktn-modal__label">\u8a55\u4fa1</div>' +
    '<div class="ktn-modal__stars" id="ktnStars">' + starHtml + '</div>' +
    '</div>' +
    '<div class="ktn-modal__form-row">' +
    '<div class="ktn-modal__label">\u30ec\u30d3\u30e5\u30fc</div>' +
    '<textarea class="ktn-modal__textarea" id="ktnReviewText" placeholder="\u611f\u60f3\u3092\u304a\u66f8\u304d\u304f\u3060\u3055\u3044\u2026"></textarea>' +
    '</div>' +
    '<div class="ktn-modal__form-row">' +
    '<button class="ktn-modal__photo-btn" type="button">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
    '\u5199\u771f\u30921\u679a\u6dfb\u4ed8' +
    '</button>' +
    '</div>' +
    '<button class="ktn-auth-btn-primary ktn-modal__submit" id="ktnCiSaveBtn">\u4fdd\u5b58\u3059\u308b</button>' +
    '</div></div></div>';

  document.body.insertAdjacentHTML('beforeend', html);
  var t = document.getElementById('ktnReviewText');
  if (t) t.value = opts.review || '';
  var saveBtn = document.getElementById('ktnCiSaveBtn');
  if (saveBtn) saveBtn.addEventListener('click', function () {
    var d = (document.getElementById('ktnCiDate') || {}).value || '';
    var s = document.querySelectorAll('.ktn-modal__star.on').length;
    var r = ((document.getElementById('ktnReviewText') || {}).value || '').trim();
    if (typeof opts.onSave === 'function') opts.onSave({ date: d, stars: s, review: r });
    closeCheckinModal();
    showToast('\u4fdd\u5b58\u3057\u307e\u3057\u305f');
  });
  var m = document.getElementById('ktnCheckinModal');
  if (m) requestAnimationFrame(function () { m.classList.add('open'); });
  if (opts.focusReview && t) t.focus();
}

/* \u2500\u2500 \u5171\u6709 \u78ba\u8a8d\u30e2\u30fc\u30c0\u30eb\uff08\u524a\u9664\u78ba\u8a8d\u30fbp5-2\uff0f\u5c06\u6765 p2\u30fbp8-11 \u304c\u518d\u5229\u7528\uff09 \u2500\u2500
   opts: { title, message(HTML\u53ef), confirmLabel, cancelLabel, danger(=true), onConfirm } */
function ktnConfirmModal(opts) {
  opts = opts || {};
  var existing = document.getElementById('ktnConfirmModal');
  if (existing) existing.remove();
  var danger = opts.danger !== false;
  var confirmCls = 'ktn-op-btn ' + (danger ? 'ktn-op-btn--danger' : 'ktn-op-btn--primary');
  var html =
    '<div class="ktn-auth-overlay" id="ktnConfirmModal" onclick="if(event.target===this)ktnCloseConfirm()">' +
    '<div class="ktn-auth-modal ktn-confirm-modal">' +
    '<div class="ktn-auth-body">' +
    '<div class="ktn-confirm-modal__title">' + (opts.title || '\u78ba\u8a8d') + '</div>' +
    '<div class="ktn-confirm-modal__msg">' + (opts.message || '') + '</div>' +
    '<div class="ktn-confirm-modal__foot">' +
    '<button class="ktn-op-btn" onclick="ktnCloseConfirm()">' + (opts.cancelLabel || '\u30ad\u30e3\u30f3\u30bb\u30eb') + '</button>' +
    '<button class="' + confirmCls + '" id="ktnConfirmOk">' + (opts.confirmLabel || '\u524a\u9664\u3059\u308b') + '</button>' +
    '</div></div></div></div>';
  document.body.insertAdjacentHTML('beforeend', html);
  var ok = document.getElementById('ktnConfirmOk');
  if (ok) ok.addEventListener('click', function () {
    if (typeof opts.onConfirm === 'function') opts.onConfirm();
    ktnCloseConfirm();
  });
  var m = document.getElementById('ktnConfirmModal');
  if (m) requestAnimationFrame(function () { m.classList.add('open'); });
}
function ktnCloseConfirm() {
  var m = document.getElementById('ktnConfirmModal');
  if (m) { m.classList.remove('open'); setTimeout(function () { m.remove(); }, 200); }
}

/* ── 共有オーナー操作メニュー（body追従・共有：p2／p5-2） ──
   btn: トリガー要素 / items: [{ label, danger, sep, onClick }] */
function ktnCloseOwnerMenu() {
  var m = document.getElementById('ktnOwnerMenu');
  if (m) m.remove();
}
function ktnOpenOwnerMenu(btn, items) {
  if (document.getElementById('ktnOwnerMenu')) { ktnCloseOwnerMenu(); return; }
  var menu = document.createElement('div');
  menu.className = 'ktn-owner-menu';
  menu.id = 'ktnOwnerMenu';
  (items || []).forEach(function (it) {
    if (it.sep) { var sp = document.createElement('div'); sp.className = 'ktn-owner-menu__sep'; menu.appendChild(sp); }
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ktn-owner-menu__item' + (it.danger ? ' ktn-owner-menu__item--danger' : '');
    b.textContent = it.label;
    b.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      ktnCloseOwnerMenu();
      if (typeof it.onClick === 'function') it.onClick();
    });
    menu.appendChild(b);
  });
  document.body.appendChild(menu);
  var r = btn.getBoundingClientRect();
  menu.style.top = (window.scrollY + r.bottom + 4) + 'px';
  menu.style.left = (window.scrollX + Math.min(r.right - menu.offsetWidth, window.innerWidth - menu.offsetWidth - 8)) + 'px';
  setTimeout(function () { document.addEventListener('click', ktnCloseOwnerMenu, { once: true }); }, 0);
}
window.addEventListener('resize', ktnCloseOwnerMenu);

/* ── 出展者リスト切替（3件以下：プロフィール形式 / 4件以上：.cc--h グリッド） ── */
function initP2CreatorList(creators) {
  var container = document.getElementById('p2CreatorList');
  if (!container) return;
  if (creators.length <= 3) return; /* 3件以下：プロフィール形式を維持 */
  /* 4件以上：cc--h グリッドに切替 */
  container.innerHTML =
    '<div class="p2-creator-grid">' +
    creators.map(function(c) {
      return '<a class="cc cc--h" href="' + (c.url || '#') + '">' +
        '<div class="cc__top">' +
          '<div class="cc__avatar ' + c.av + '"><div class="cc__avatar-ph">' + c.ini + '</div></div>' +
        '</div>' +
        '<div class="cc__main">' +
          '<div class="cc__info">' +
            '<div class="cc__badge-row"><span class="cb cb-person cb-creator">creator</span><span class="sb">開催中/開催予定</span></div>' +
            '<div class="cc__name">' + c.name + '</div>' +
            '<div class="cc__genre">' + c.genre + '</div>' +
          '</div>' +
          '<div class="cc__hfoot">' +
            '<span class="pc-count pc-count--exh"><span class="exh-icon"><svg width="13" height="13"><use href="#icon-exh"/></svg></span>' + c.exh + '</span>' +
            '<span class="sep"></span>' +
            '<span class="pc-count pc-count--watch"><svg width="11" height="11"><use href="#icon-watch" color="#7a8a99"/></svg>' + c.watch + '</span>' +
            '<button class="ktn-btn" onclick="this.classList.toggle(\'on\');event.preventDefault()" data-off="watch" data-on="watching" data-action="watch">' +
              '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".45"/><circle class="wi-inner" cx="8" cy="8" r="2.6"/></svg>' +
              'watch<span class="tip">\u30a6\u30a9\u30c3\u30c1\u3059\u308b</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</a>';
    }).join('') +
    '</div>';
}

/* ── 出展者表示切替（デモバー用） ── */
function setCreatorView(n, btn) {
  document.querySelectorAll('.dbtn-creator').forEach(function(b) { b.classList.remove('on'); });
  if (btn) btn.classList.add('on');
  var container = document.getElementById('p2CreatorList');
  if (!container) return;
  if (n === 1) {
    container.innerHTML = window.P2_CREATOR_PROFILE_HTML || '';
  } else {
    initP2CreatorList(window.P2_CREATORS_ALL || []);
  }
}


/* ══════════════════════════════════
   KTN.cta — CTAウィジェット共通モジュール
   .ktn-cta-widget[data-cta-name/type/url/action] からメタを読取
   ・QR / ウォッチャーモーダル（全ページ統一）
   ・リードテキスト動的生成
   ・data-action="interest" ボタントグル初期化
══════════════════════════════════ */
KTN.cta = (function () {
  var _qrInit  = false;
  var _QR_OVL  = 'ktnQrOverlay';
  var _W_OVL   = 'ktnWatcherOverlay';

  /* デモ用ウォッチャーデータ（全ページ共通） */
  var _W_DATA = [
    { name: '山本花子',   color: '#b8608c', watch: 12, checkin: 3,  interest: 28, collection: 5 },
    { name: 'あおい',     color: '#4a7a9a', watch: 8,  checkin: 1,  interest: 35 },
    { name: '中村めぐみ', color: '#c87aa0', watch: 5,  checkin: 2,  interest: 44, collection: 2 },
    { name: '高橋りな',   color: '#a07090', watch: 9,  checkin: 4,  interest: 31 },
    { name: 'saki',       color: '#7a90b8', watch: 3,  checkin: 0,  interest: 18 },
    { name: '西村ゆい',   color: '#b88a7a', watch: 14, checkin: 6,  interest: 52 },
    { name: 'hana',       color: '#8a7ab8', watch: 7,  checkin: 1,  interest: 29 },
    { name: '伊藤ともこ', color: '#7aa87a', watch: 11, checkin: 2,  interest: 37 },
    { name: 'mitsuki',    color: '#9a7a5a', watch: 6,  checkin: 0,  interest: 21 },
    { name: '加藤なな',   color: '#c87a90', watch: 18, checkin: 5,  interest: 40 },
    { name: 'yui',        color: '#5a8a9a', watch: 4,  checkin: 2,  interest: 16 },
    { name: '小林さくら', color: '#8a6a9a', watch: 22, checkin: 8,  interest: 33, collection: 12 },
    { name: 'RIKO',       color: '#6a9a7a', watch: 2,  checkin: 0,  interest: 11 },
    { name: '松本えり',   color: '#b8907a', watch: 9,  checkin: 3,  interest: 26 },
    { name: 'tomoko',     color: '#7a6ab8', watch: 15, checkin: 1,  interest: 48 },
  ];

  var SVG_W    = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="8" cy="8" r="7" fill="#3a90e0"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>';
  var SVG_C    = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="10" cy="5" r="4" fill="#3a90e0"/><circle cx="5" cy="11" r="2.4" fill="#3a90e0"/></svg>';
  var SVG_I    = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#3a90e0" stroke="#3a90e0" stroke-width=".6" stroke-linejoin="round"/></svg>';
  var SVG_COLL = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="#4da3f5" stroke-width="1.4"/><rect x="4.5" y="4.5" width="7" height="7" rx=".5" stroke="#4da3f5" stroke-width="1"/></svg>';

  function _getWidget() {
    return document.querySelector('.ktn-cta-widget');
  }

  function _getCanonicalUrl() {
    var w = _getWidget();
    var u = w && w.dataset.ctaUrl;
    if (u) { var a = document.createElement('a'); a.href = u; return a.href; }
    return location.href;
  }

  function _esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── QRモーダル ── */
  function _ensureQrOverlay() {
    if (document.getElementById(_QR_OVL)) return;
    var w = _getWidget();
    var name = w && w.dataset.ctaName || '';
    var type = w && w.dataset.ctaType || '';
    var badge = type === 'creator' ? '<span class="cb cb-person cb-creator">CREATOR</span><br>' :
                type === 'gallery' ? '<span class="cb cb-person cb-gallery">GALLERY</span><br>' : '';
    var title = name
      ? ((type === 'exhibition' || type === 'work')
          ? '「' + _esc(name) + '」<br>をシェア'
          : badge + _esc(name) + '<br>をシェア')
      : 'このページをシェア';
    var d = document.createElement('div');
    d.id = _QR_OVL;
    d.className = 'p2-qr-overlay';
    d.setAttribute('onclick', 'if(event.target===this)KTN.cta.closeQrModal()');
    d.innerHTML =
      '<div class="p2-qr-modal">' +
        '<button class="ktn-modal__close" onclick="KTN.cta.closeQrModal()">✕</button>' +
        '<div class="p2-qr-modal__inner">' +
          '<div class="p2-qr-modal__title">' + title + '</div>' +
          '<div class="p2-qr-modal__code" id="ktnQrCode"></div>' +
          '<div class="p2-qr-modal__url" id="ktnQrUrl"></div>' +
          '<button class="ktn-op-btn ktn-op-btn--primary p2-qr-modal__copy"' +
            ' onclick="KTN.cta.copyQrUrl()">URLをコピー</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(d);
  }

  function openQrModal() {
    _ensureQrOverlay();
    var overlay = document.getElementById(_QR_OVL);
    if (!overlay) return;
    overlay.classList.add('open');
    var canonUrl = _getCanonicalUrl();
    var a = document.createElement('a'); a.href = canonUrl;
    var urlEl = document.getElementById('ktnQrUrl');
    if (urlEl) urlEl.textContent = a.host + a.pathname;
    if (!_qrInit && window.QRCode) {
      var el = document.getElementById('ktnQrCode');
      if (el) {
        new QRCode(el, { text: canonUrl, width: 200, height: 200,
          colorDark: '#231815', colorLight: '#ffffff' });
        _qrInit = true;
      }
    }
  }

  function closeQrModal() {
    var el = document.getElementById(_QR_OVL);
    if (el) el.classList.remove('open');
  }

  function copyQrUrl() {
    var btn = document.querySelector('#' + _QR_OVL + ' .p2-qr-modal__copy');
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(_getCanonicalUrl()).then(function () {
      if (btn) {
        btn.textContent = 'コピーしました！';
        setTimeout(function () { btn.textContent = 'URLをコピー'; }, 2000);
      }
    });
  }

  /* ── ウォッチャーモーダル（全ページ統一） ── */
  function _ensureWatcherOverlay() {
    if (document.getElementById(_W_OVL)) return;
    var d = document.createElement('div');
    d.id = _W_OVL;
    d.className = 'p2-watcher-overlay';
    d.setAttribute('onclick', 'if(event.target===this)KTN.cta.closeWatcherModal()');
    d.innerHTML =
      '<div class="ktn-modal p2-watcher-modal">' +
        '<button class="ktn-modal__close" onclick="KTN.cta.closeWatcherModal()">✕</button>' +
        '<div class="ktn-modal__inner">' +
          '<div class="p2-watcher-modal__head">' +
            '<svg viewBox="0 0 16 16" fill="none" width="14" height="14" id="ktnWatcherIcon"></svg>' +
            '<span class="p2-watcher-modal__title" id="ktnWatcherTitle"></span>' +
          '</div>' +
          '<div class="p2-watcher-list" id="ktnWatcherList"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(d);
  }

  function openWatcherModal() {
    _ensureWatcherOverlay();
    var overlay = document.getElementById(_W_OVL);
    if (!overlay) return;
    var w = _getWidget();
    var isWatch = w && w.dataset.ctaAction === 'watch';
    var iconEl = document.getElementById('ktnWatcherIcon');
    if (iconEl) {
      iconEl.innerHTML = isWatch
        ? '<circle cx="8" cy="8" r="7" fill="#3a90e0"/><circle cx="8" cy="8" r="2.6" fill="#fff"/>'
        : '<path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#3a90e0" stroke="#3a90e0" stroke-width=".6" stroke-linejoin="round"/>';
    }
    var numEl = document.querySelector('.ktn-cta-widget .p2aw-num, .p2-action-widget .p2aw-num');
    var count = numEl ? numEl.textContent : '';
    var ttlEl = document.getElementById('ktnWatcherTitle');
    if (ttlEl) {
      ttlEl.innerHTML =
        (isWatch ? 'ウォッチャー ' : '興味あり！ ') +
        '<span class="p2-watcher-modal__count">' + _esc(count) + '人</span> — ' +
        '<span class="ktn-sec-en">' + (isWatch ? 'Watchers' : 'Interest') + '</span>';
    }
    var data = window.KTN_CTA_WATCHERS || _W_DATA;
    var listEl = document.getElementById('ktnWatcherList');
    if (listEl) {
      listEl.innerHTML = data.map(function (u) {
        return '<div class="p2-watcher-item">' +
          '<a href="#" class="p2-watcher-item__avatar p2-watcher-item__avatar--user" style="background:' + u.color + '">' + _esc(u.name.charAt(0)) + '</a>' +
          '<div class="p2-watcher-item__info">' +
            '<a href="#" class="p2-watcher-item__name">' + _esc(u.name) + '</a>' +
            '<div class="p2-watcher-item__counts">' +
              '<span class="p2-watcher-item__count">' + SVG_W + u.watch    + '</span>' +
              '<span class="p2-watcher-item__count">' + SVG_C + u.checkin  + '</span>' +
              '<span class="p2-watcher-item__count">' + SVG_I + u.interest + '</span>' +
              (u.collection ? '<span class="p2-watcher-item__count">' + SVG_COLL + u.collection + '</span>' : '') +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');
    }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeWatcherModal() {
    var el = document.getElementById(_W_OVL);
    if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
  }

  /* ── CTAボタントグル初期化 ── */
  function initCtaButtons() {
    document.querySelectorAll('.ktn-cta-widget .ktn-btn[data-action], .p2-action-widget .ktn-btn[data-action]').forEach(function (btn) {
      if (btn.dataset.ctaInit) return;
      btn.removeAttribute('onclick');
      btn.dataset.ctaInit = '1';
      var action = btn.dataset.action || 'interest';
      btn.addEventListener('click', function () {
        KTN.action.handle(btn, action);
        btn.setAttribute('aria-pressed', btn.classList.contains('on').toString());
      });
    });
  }

  /* ── リードテキスト生成 ── */
  function _injectLead() {
    var w = _getWidget();
    if (!w) return;
    if (w.querySelector('.p2-action-widget__lead')) return;
    var name   = w.dataset.ctaName   || '';
    var type   = w.dataset.ctaType   || '';
    var action = w.dataset.ctaAction || 'interest';
    if (!name) return;
    var lead = document.createElement('div');
    lead.className = 'p2-action-widget__lead';
    if (action === 'watch') {
      lead.innerHTML = _esc(name) + 'をウォッチすると<br>'
        + '<a class="p2-action-widget__lead-link" href="kotennavi-p5.html">my展覧会カレンダー</a>で<br>最新情報を受取れる！';
    } else {
      var q = (type === 'exhibition' || type === 'work')
        ? '「' + _esc(name) + '」' : _esc(name);
      var isExh     = (type === 'exhibition');
      var linkLabel = isExh ? 'my展覧会カレンダー' : 'my興味あり！';
      var linkHref  = isExh ? 'kotennavi-p5.html' : 'kotennavi-p5-3.html';
      lead.innerHTML = q + '<br>興味あり！マークで<br>'
        + '<a class="p2-action-widget__lead-link" href="' + linkHref + '">' + linkLabel + '</a>に追加！';
    }
    var btnRow = w.querySelector('.p2-action-widget__btn-row');
    if (btnRow) w.insertBefore(lead, btnRow);
    var leadLink = lead.querySelector('.p2-action-widget__lead-link');
    if (leadLink) {
      leadLink.addEventListener('click', function (e) {
        if (window.ktnState.role === 'guest') {
          e.preventDefault();
          KTN.action.show(action);
        }
      });
    }
  }

  function init() {
    _injectLead();
    initCtaButtons();
  }

  return {
    openQrModal: openQrModal, closeQrModal: closeQrModal,
    copyQrUrl: copyQrUrl,
    openWatcherModal: openWatcherModal, closeWatcherModal: closeWatcherModal,
    init: init,
  };
}());

/* グローバルエイリアス（ページ固有コードから上書きしないこと） */
window.openQrModal       = KTN.cta.openQrModal;
window.closeQrModal      = KTN.cta.closeQrModal;
window.copyQrUrl         = KTN.cta.copyQrUrl;
window.openWatcherModal  = KTN.cta.openWatcherModal;
window.closeWatcherModal = KTN.cta.closeWatcherModal;

/* ══════════════════════════════════════════════════════
   KTN.action — Watch / Interest / Check-in 共通アクション
══════════════════════════════════════════════════════ */
KTN.action = (function () {

  var ACTION_LABELS = {
    watch:    { off: 'ウォッチする',        on: 'ウォッチ中 — 解除する', iconOff: 'ウォッチする',        iconOn: 'ウォッチ中 — 解除する', guest: 'ウォッチにはログインが必要です'  },
    interest: { off: '興味あり！に追加する', on: '興味あり！ — 解除する', iconOff: '興味あり！に追加する', iconOn: '興味あり！ — 解除する', guest: 'この機能にはログインが必要です' },
    checkin:  { off: '訪問済みにする',       on: '訪問済み — 解除する',   iconOff: '訪問済みにする',       iconOn: '訪問済み — 解除する',   guest: 'この機能にはログインが必要です' },
  };

  var ACTION_ICONS = {
    watch:    '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#fff" opacity=".9"/><circle cx="8" cy="8" r="2.6" fill="#3a90e0"/></svg>',
    interest: '<svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#fff" stroke="#fff" stroke-width=".6"/></svg>',
    checkin:  '<svg viewBox="0 0 16 16" fill="none"><circle cx="10" cy="5" r="4" fill="#fff" opacity=".9"/><circle cx="5" cy="11" r="2.4" fill="#fff" opacity=".75"/></svg>',
    apply:    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  };

  /* モーダル見出し・説明文（action 別）。未定義の action は DEFAULT_AUTH を使う */
  var DEFAULT_AUTH = {
    ttl: 'ログインが必要です',
    sub: 'ウォッチ・興味あり！・チェックインなどの<br>My機能がすべて使えるようになります',
  };
  var ACTION_AUTH = {
    apply: {
      ttl: '購入申込にはログインが必要です',
      sub: 'ログインすると作品の購入申込や<br>出品者とのやり取りができるようになります',
    },
  };

  var ACTION_NAMES = { watch: 'watch', interest: 'interest!', checkin: 'check in' };

  /* CTA トグル時のトースト文言（action 別・全ページ共通）。固有名を含めない汎用文言で統一 */
  var ACTION_TOAST = {
    watch:    { on: 'ウォッチしました',            off: 'ウォッチを解除しました' },
    interest: { on: '「興味あり！」に追加しました', off: '「興味あり！」を取り消しました' },
    checkin:  { on: '訪問済みにしました',          off: '訪問済みを取り消しました' },
  };

  function handle(btn, action) {
    if (window.ktnState.role === 'guest') { show(action); return; }
    var isOn = btn.classList.toggle('on');
    var tn = Array.from(btn.childNodes).find(function (n) {
      return n.nodeType === 3 && n.textContent.trim();
    });
    if (tn && btn.dataset.off && btn.dataset.on) {
      tn.textContent = ' ' + (isOn ? btn.dataset.on : btn.dataset.off);
    }
    var tip = btn.querySelector('.tip');
    if (tip && ACTION_LABELS[action]) {
      var lbl = ACTION_LABELS[action];
      var isIcon = btn.classList.contains('ktn-icon-btn');
      tip.textContent = isOn ? (isIcon ? lbl.iconOn : lbl.on) : (isIcon ? lbl.iconOff : lbl.off);
    }
    if (KTN.toast && ACTION_TOAST[action]) {
      KTN.toast(isOn ? ACTION_TOAST[action].on : ACTION_TOAST[action].off);
    }
    btn.blur();
    btn.classList.add('is-just-clicked');
    btn.addEventListener('pointerleave', function handler() {
      btn.classList.remove('is-just-clicked');
      btn.removeEventListener('pointerleave', handler);
    });
  }

  function show(action) {
    var modal = document.getElementById('ktnAuthModal');
    if (!modal) return;
    var icon = document.getElementById('ktnAuthIcon');
    if (icon) icon.innerHTML = ACTION_ICONS[action] || '';
    var cfg = ACTION_AUTH[action] || DEFAULT_AUTH;
    var ttlEl = document.getElementById('ktnAuthTtl');
    var subEl = document.getElementById('ktnAuthSub');
    if (ttlEl) ttlEl.innerHTML = cfg.ttl;
    if (subEl) subEl.innerHTML = cfg.sub;
    modal.classList.add('open');
  }

  function close(e) {
    if (e && e.target !== document.getElementById('ktnAuthModal')) return;
    var modal = document.getElementById('ktnAuthModal');
    if (modal) modal.classList.remove('open');
  }

  function _inject() {
    var el = document.createElement('div');
    el.className = 'ktn-auth-overlay';
    el.id = 'ktnAuthModal';
    el.setAttribute('onclick', 'KTN.action.close(event)');
    el.innerHTML =
      '<div class="ktn-auth-modal">'
      + '<div class="ktn-auth-top">'
      + '<button class="ktn-auth-close" onclick="KTN.action.close()">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      + '</button>'
      + '<div class="ktn-auth-icon" id="ktnAuthIcon"></div>'
      + '<div class="ktn-auth-ttl" id="ktnAuthTtl">ログインが必要です</div>'
      + '<div class="ktn-auth-sub" id="ktnAuthSub">ウォッチ・興味あり！・チェックインなどの<br>My機能がすべて使えるようになります</div>'
      + '</div>'
      + '<div class="ktn-auth-body">'
      + '<div class="ktn-auth-btns">'
      + '<button class="ktn-auth-btn-primary" onclick="location.href=\'kotennavi-p11.html\'">ログイン</button>'
      + '<div class="ktn-auth-divider">または</div>'
      + '<button class="ktn-auth-btn-secondary" onclick="location.href=\'kotennavi-p11-1.html\'">新規ユーザー登録（無料）</button>'
      + '</div>'
      + '<div class="ktn-auth-note">登録は無料です。<a href="#">利用規約</a>・<a href="#">プライバシーポリシー</a>に同意のうえご利用ください。</div>'
      + '</div>'
      + '</div>';
    document.body.appendChild(el);
  }

  document.addEventListener('DOMContentLoaded', function () {
    _inject();
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  });

  return { handle: handle, show: show, close: close };
}());

window.handleAction   = function (btn, action) { KTN.action.handle(btn, action); };
window.closeAuthModal = function (e)            { KTN.action.close(e); };

/* ── デモバー高さ同期：モバイルで折り返すと高さが変わるため --dh を実測更新 ── */
(function () {
  function syncDH() {
    var dbar = document.querySelector('.dbar');
    if (!dbar) return;
    var h = dbar.offsetHeight;
    if (h > 0) document.documentElement.style.setProperty('--dh', h + 'px');
  }
  function init() {
    syncDH();
    if (window.ResizeObserver) {
      var dbar = document.querySelector('.dbar');
      if (dbar) new ResizeObserver(syncDH).observe(dbar);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('resize', syncDH);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncDH);
  }
}());
