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
  badge: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M8.5 13.5L6 22l6-3 6 3-2.5-8.5"/></svg>`,
  logout: `<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
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
  list: { label: '作品リスト', title: '作品リストのQRコード', url: 'https://koten-navi.com/p2-6', sub: 'スマホで読み取ると、会場配布用のリストが開きます。<br>画像を保存して会場ポスターやSNSにも掲示できます。' },
  /* url に ?src=venue-qr を付与し、この会場設置QR経由のアクセスを判別できるようにする（インサイトA-2） */
  venue: { label: '会場チェックイン', title: '会場チェックインのQRコード', url: 'https://koten-navi.com/p2?src=venue-qr', sub: 'スマホで読み取ると、この展覧会のページが開きます。<br>来場者はそのままチェックインやレビュー投稿ができます。あわせてウォッチしてもらえると、次回展の案内メールが届くようになります。画像を保存して受付・壁面に掲示できます。' },
  creator: { label: '田中 透', title: '田中 透 を共有', url: 'https://koten-navi.com/p3', sub: 'リンクをコピーしてSNS・DMで送ったり、QRコードを名刺・チラシ等に掲載すると、ウォッチしてくれる人が増えやすくなります。' },
  gallery: { label: 'Gallery SOIL 渋谷', title: 'Gallery SOIL 渋谷 を共有', url: 'https://koten-navi.com/p4', sub: 'リンクをコピーしてSNS・DMで送ったり、QRコードを名刺・チラシ等に掲載すると、ウォッチしてくれる人が増えやすくなります。' }
};
/* 汎用テキストコピー（URLコピー等・textareaを介さない値のコピーに使う） */
function ktnCopyText(text, msg) {
  msg = msg || 'コピーしました';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () { showToast(msg); }).catch(function () { _ktnCopyFallback(text, msg); });
  } else {
    _ktnCopyFallback(text, msg);
  }
}
function _ktnCopyFallback(text, msg) {
  var ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); showToast(msg); } catch (e) {}
  document.body.removeChild(ta);
}
function ktnListQrCopyLink() {
  var urlEl = document.getElementById('ktnListQrUrl');
  if (!urlEl) return;
  ktnCopyText(urlEl.textContent, 'リンクをコピーしました');
}
window.ktnListQrCopyLink = ktnListQrCopyLink;
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
      + '<button class="ktn-auth-btn-primary" onclick="ktnListQrCopyLink()">リンクをコピー</button>'
      + '<button class="ktn-auth-btn-secondary" onclick="KTN.toast(\'QRコード画像の保存機能は準備中です\')">QRコード画像を保存</button>'
      + '<button class="ktn-auth-btn-secondary" onclick="ktnListQrClose()">閉じる</button>'
      + '</div>'
      + '</div>'
      + '</div>';
    document.body.appendChild(el);
  }
  document.getElementById('ktnListQrTtl').textContent = def.title || (label + 'のQRコード');
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
   SNSテキスト生成 モーダル（P2 管理者メニュー）
   ・SNSテキスト／メール添付用URLは旧「新着展覧会表示」ツールの表示内容をそのまま踏襲
   ・掲載完了メールはP90-9（メールテンプレート管理・screenId='p2-sns'＝「展覧会掲載依頼」グループ）のテンプレートを
     もとに、P90-2-1（.p902-flow-panel）と同じ「テンプレート選択→送信元/件名/本文編集→送信」パターンで送信する。
     P90-9側TEMPLATESとはスコープが別（ページ間の実データ連携がないため個別配列として保持＝P90-2/P90-11-1と同じ方針）
   ・.ktn-auth-overlay / .ktn-auth-modal のシェルを再利用（ktnListQrと同型）
══════════════════════════════════ */
const P2_SNS_TEXT_DATA = {
  sns: '【個展なび新着情報】あなたが知らないオノマトペ 2026/02/18(wed)-2026/03/05(thu) @ Gallery SOIL 渋谷(東京都) https://koten-navi.com/p2 #個展 #個展なび #東京都の展覧会',
  mailUrl: '展覧会名：あなたが知らないオノマトペ\nhttps://koten-navi.com/p2'
};
const P2_SNS_MAIL_TEMPLATES = [
  { key: 'listing-notice', name: '展覧会情報掲載のお知らせ', from: 'info@koten-navi.com',
    subject: '【個展なび】展覧会情報掲載のお知らせ',
    body: 'いつもお世話になっております。\n****************************\n展覧会情報掲載のお知らせ\n****************************\n展覧会情報をご連絡頂きありがとうございます。\n個展なびに以下の内容で掲載いたしました。\n\n　展覧会名：あなたが知らないオノマトペ\n　https://koten-navi.com/p2\n\n内容に相違がございましたら、お手数ですが下記までご連絡ください。\n　https://koten-navi.com/contact\n\nお問い合わせ：https://koten-navi.com/contact' }
];
function ktnP2SnsMailLoad(key) {
  var t = null;
  for (var i = 0; i < P2_SNS_MAIL_TEMPLATES.length; i++) { if (P2_SNS_MAIL_TEMPLATES[i].key === key) { t = P2_SNS_MAIL_TEMPLATES[i]; break; } }
  if (!t) t = P2_SNS_MAIL_TEMPLATES[0];
  var fromEl = document.getElementById('ktnP2SnsMailFrom');
  var subjEl = document.getElementById('ktnP2SnsMailSubject');
  var bodyEl = document.getElementById('ktnP2SnsMailBody');
  if (fromEl) fromEl.value = t.from;
  if (subjEl) subjEl.value = t.subject;
  if (bodyEl) bodyEl.value = t.body;
}
function ktnP2SnsMailSend() {
  if (KTN.toast) KTN.toast('掲載完了メールを送信しました（デモ）');
}
function ktnP2SnsText() {
  var el = document.getElementById('ktnP2SnsModal');
  if (!el) {
    el = document.createElement('div');
    el.className = 'ktn-auth-overlay';
    el.id = 'ktnP2SnsModal';
    el.setAttribute('onclick', 'ktnP2SnsTextClose(event)');
    el.innerHTML =
      '<div class="ktn-auth-modal ktn-snstext">'
      + '<div class="ktn-auth-top">'
      + '<button class="ktn-auth-close" onclick="ktnP2SnsTextClose()">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      + '</button>'
      + '<div class="ktn-auth-ttl">SNSテキスト生成</div>'
      + '<div class="ktn-auth-sub">この展覧会のSNS投稿文・メール添付用URLを自動生成しました。コピーしてご利用ください。</div>'
      + '</div>'
      + '<div class="ktn-auth-body">'
      + '<div class="ktn-snstext__field">'
      + '<div class="ktn-snstext__label"><span class="ktn-snstext__label-txt">SNSテキスト</span>'
      + '<button type="button" class="ktn-snstext__copy" onclick="ktnCopyText(document.getElementById(\'ktnP2SnsTa1\').value,\'SNSテキストをコピーしました\')">コピー</button></div>'
      + '<textarea class="ktn-snstext__ta" id="ktnP2SnsTa1" rows="4" readonly></textarea>'
      + '</div>'
      + '<div class="ktn-snstext__field">'
      + '<div class="ktn-snstext__label"><span class="ktn-snstext__label-txt">メール添付用URL</span>'
      + '<button type="button" class="ktn-snstext__copy" onclick="ktnCopyText(document.getElementById(\'ktnP2SnsTa2\').value,\'メール添付用URLをコピーしました\')">コピー</button></div>'
      + '<textarea class="ktn-snstext__ta" id="ktnP2SnsTa2" rows="2" readonly></textarea>'
      + '</div>'
      + '<div class="p902-flow-panel">'
      + '<p class="p902-flow-panel__title">掲載完了メールを送信</p>'
      + '<label class="p902-flow-panel__label">テンプレート</label>'
      + '<select class="p902-flow-panel__input" id="ktnP2SnsMailTpl" onchange="ktnP2SnsMailLoad(this.value)">'
      + P2_SNS_MAIL_TEMPLATES.map(function (t) { return '<option value="' + t.key + '">' + t.name + '</option>'; }).join('')
      + '</select>'
      + '<label class="p902-flow-panel__label">送信元</label>'
      + '<input type="text" class="p902-flow-panel__input" id="ktnP2SnsMailFrom" readonly>'
      + '<label class="p902-flow-panel__label">件名</label>'
      + '<input type="text" class="p902-flow-panel__input" id="ktnP2SnsMailSubject">'
      + '<label class="p902-flow-panel__label">本文</label>'
      + '<textarea class="p902-flow-panel__textarea" id="ktnP2SnsMailBody" rows="10"></textarea>'
      + '<p class="p902-flow-panel__hint">出展者へ掲載完了をお知らせするメールです。内容を確認・編集のうえ送信してください。テンプレートは <a class="ktn-guide-link" href="./kotennavi-p90-9.html">メールテンプレート管理（P90-9）</a> の「展覧会掲載依頼」で管理しています。</p>'
      + '<div class="p902-flow-panel__actions">'
      + '<button class="ktn-op-btn ktn-op-btn--primary" id="ktnP2SnsMailSendBtn" onclick="ktnP2SnsMailSend()">このメールを送信する</button>'
      + '</div>'
      + '</div>'
      + '<div class="ktn-auth-btns">'
      + '<button class="ktn-auth-btn-secondary" onclick="ktnP2SnsTextClose()">閉じる</button>'
      + '</div>'
      + '</div>'
      + '</div>';
    document.body.appendChild(el);
  }
  document.getElementById('ktnP2SnsTa1').value = P2_SNS_TEXT_DATA.sns;
  document.getElementById('ktnP2SnsTa2').value = P2_SNS_TEXT_DATA.mailUrl;
  ktnP2SnsMailLoad(P2_SNS_MAIL_TEMPLATES[0].key);
  requestAnimationFrame(function () { el.classList.add('open'); });
}
function ktnP2SnsTextClose(e) {
  if (e && e.target !== document.getElementById('ktnP2SnsModal')) return;
  var m = document.getElementById('ktnP2SnsModal');
  if (m) m.classList.remove('open');
}
window.ktnP2SnsText = ktnP2SnsText;
window.ktnP2SnsTextClose = ktnP2SnsTextClose;
window.ktnP2SnsMailLoad = ktnP2SnsMailLoad;
window.ktnP2SnsMailSend = ktnP2SnsMailSend;

/* ══════════════════════════════════
   個展なびバッジ（.ktn-pshare-badge・P60-6「よくある質問-クリエイター編」/P60-7「よくある質問-ギャラリー編」の
   1FAQ項目（#badge）内で使用）
   ・旧ktnPageShareモーダル→2026-08-17にP3-13/P4-13へページ化→同日中にP60-6/P60-7の
     チャプター（#badge）へ再移設→2026-08-18にP60-4〜7を「よくある質問」表記へ差し戻す方針変更に伴い、
     章立て（ktn-index/ktn-zone）を廃止し通常のFAQ項目（.p70-faq-item）1つに格納。
     ここには生成ロジック（定数・HTML生成関数）のみを置き、DOM結線は
     KTN.pages['p60-6'] / KTN.pages['p60-7']（kotennavi-pages.js）側で行う。
   ・ktnListQr（共有＝リンクコピー＋QR）とは対象ユーザーが別（本機能は埋め込み/DLを使いこなせる層向け）。
══════════════════════════════════ */
const KTN_PSHARE_KINDS = {
  creator: { label: '田中 透', url: 'https://koten-navi.com/p3', badgeLabel: '田中 透 - 個展なび' },
  gallery: { label: 'Gallery SOIL 渋谷', url: 'https://koten-navi.com/p4', badgeLabel: 'Gallery SOIL 渋谷 - 個展なび' }
};
/* バッジ画像アセット（ロゴ実ファイル準拠）
   logo5-1＝角丸フレーム済みの単体マーク（サイドバー/会場フライヤーで実績あり）
   logo3＝ブランド青の枠マーク単色（bottom-nav実績あり・#005da7の唯一の軸）
   IMG＝外部サイトに貼る埋め込みコード用の絶対URL（本番ドメイン koten-navi.com 前提）。
   IMG_REL＝このページ自身のライブプレビュー表示用の相対パス。絶対URLはローカル環境では解決できず
   画像が表示されないため、プレビューは常にページと同一オリジンの相対パスで描画する。 */
const KTN_PSHARE_IMG = {
  frame: 'https://koten-navi.com/images/kotennavi-logo5-1.svg',
  mark: 'https://koten-navi.com/images/kotennavi-logo3.svg'
};
const KTN_PSHARE_IMG_REL = {
  frame: './images/kotennavi-logo5-1.svg',
  mark: './images/kotennavi-logo3.svg'
};
const KTN_PSHARE_PATTERNS = [
  { id: 'standard', label: 'スタンダード' },
  { id: 'pill', label: 'ミニマル' },
  { id: 'frame', label: 'フレーム' },
  { id: 'outline', label: 'アウトライン' }
];
/* 'icon'（単体アイコン型・ktnPshareBadgeHtml側のcase自体は温存）は
   P60-6/P60-7の「デザインを選ぶ」一覧からは2026-08-18に除外（P60-8「個展なびとは」の
   ロゴ使用ポリシー文脈で別途出す方針にユーザーが決定・詳細はdocs/handoff-decisions.md追36）。 */
/* imgs省略時は埋め込みコード用の絶対URL（KTN_PSHARE_IMG）。ライブプレビューは KTN_PSHARE_IMG_REL を渡す。 */
function ktnPshareBadgeHtml(patternId, def, imgs) {
  imgs = imgs || KTN_PSHARE_IMG;
  switch (patternId) {
    case 'pill':
      return '<a href="' + def.url + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:7px;padding:6px 14px 6px 9px;border-radius:999px;background:#005da7;color:#fff;font-family:sans-serif;font-size:12px;font-weight:600;text-decoration:none;line-height:1;">'
        + '<img src="' + imgs.mark + '" alt="" width="14" height="14" style="display:block;filter:brightness(0) invert(1);">'
        + '<span>' + def.badgeLabel + '</span>'
        + '</a>';
    case 'frame':
      return '<a href="' + def.url + '" target="_blank" rel="noopener" style="display:inline-flex;flex-direction:column;align-items:center;gap:8px;width:150px;padding:20px 14px 16px;background:#fff;border:1px solid #d8d2c8;border-top:3px solid #005da7;border-radius:4px;text-decoration:none;font-family:sans-serif;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.06);">'
        + '<img src="' + imgs.frame + '" alt="" width="34" height="34" style="display:block;">'
        + '<span style="font-size:12.5px;font-weight:700;color:#231815;line-height:1.3;">' + def.label + '</span>'
        + '<span style="font-size:8.5px;letter-spacing:.08em;color:#9a948a;text-transform:uppercase;">個展なび</span>'
        + '</a>';
    case 'outline':
      return '<a href="' + def.url + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:7px;padding:6px 13px;border-radius:999px;background:transparent;border:1.5px solid #005da7;color:#005da7;font-family:sans-serif;font-size:12px;font-weight:600;text-decoration:none;line-height:1;">'
        + '<img src="' + imgs.mark + '" alt="" width="13" height="13" style="display:block;">'
        + '<span>' + def.badgeLabel + '</span>'
        + '</a>';
    case 'icon':
      return '<a href="' + def.url + '" target="_blank" rel="noopener" style="display:inline-block;line-height:0;" title="' + def.badgeLabel + '">'
        + '<img src="' + imgs.mark + '" alt="' + def.badgeLabel + '" width="18" height="18" style="display:inline-block;vertical-align:middle;">'
        + '</a>';
    case 'standard':
    default:
      return '<a href="' + def.url + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;padding:8px 16px 8px 8px;background:#fff;border:1px solid #d8d2c8;border-radius:6px;text-decoration:none;font-family:sans-serif;box-shadow:0 1px 4px rgba(0,0,0,.05);">'
        + '<img src="' + imgs.frame + '" alt="" width="26" height="26" style="display:block;">'
        + '<span style="font-size:12.5px;font-weight:700;color:#231815;line-height:1.2;">' + def.label + '</span>'
        + '</a>';
  }
}

/* ══════════════════════════════════
   会場フライヤー（A4印刷プレビュー・展覧会情報QR＋チェックインQRを1枚に配置）
   ・.ktn-auth-overlay / .ktn-auth-modal のシェル＋QRダミーSVGは ktnListQr と同型を再利用
   ・独自ブロック：.ktn-vflyer__sheet（A4プレビュー・印刷時は @media print で全画面化）
══════════════════════════════════ */
function ktnVenueFlyer() {
  var el = document.getElementById('ktnVenueFlyerModal');
  if (!el) {
    /* デモ用の静的プレースホルダーQR（実URLを持たない）。本番実装では情報QRに ?src=venue-flyer、
       チェックインQRに ?src=venue-flyer&action=checkin を付与し、venue（掲示QR）と区別してインサイトA-2の
       流入元判別に使う想定（kotennavi-p2-14.html の「QR/フライヤー経由」実績表示に対応）。 */
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
      + '<p class="ktn-vflyer__checkin-desc">ご来場の記念に、QRからチェックインをお願いいたします。あわせて作家・ギャラリーをウォッチしていただくと、次回展の情報をメールでいち早くお届けします。感想やレビューもぜひお聞かせください。</p>'
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

/* 校正データの表示(印刷)（P2 管理者メニュー）：サイトchrome（ヘッダー/dbar/タグバー/ボトムナビ/フッター/トースト）を
   隠して現在ページをそのまま印刷する。会場フライヤー印刷（ktnVenueFlyerPrint）と同じbodyクラス切替方式。 */
function ktnP2ProofPrint() {
  document.body.classList.add('ktn-printing-proof');
  window.print();
}
window.addEventListener('afterprint', function () {
  document.body.classList.remove('ktn-printing-proof');
});
window.ktnP2ProofPrint = ktnP2ProofPrint;

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
   インサイト：推移ラインチャート（SVG）
   7日〜全期間（最大365日＝1年開催を想定）まで
   同一コンポーネントで描画。ページ再描画（ロール切替等）で
   絵が変わらないよう Math.random は使わず種付き擬似乱数を使用。
══════════════════════════════════ */
KTN.TREND_TODAY = new Date(2026, 5, 22);
function ktnTrendHash(str) {
  var h = 2166136261;
  for (var i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h >>> 0;
}
function ktnTrendRand(seed) {
  var s = seed >>> 0;
  return function () {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    var t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function ktnTrendValues(n, peakBase, rand) {
  var numBumps = n <= 10 ? 1 : n <= 40 ? 2 : n <= 120 ? 3 : 5;
  var bumps = [];
  for (var b = 0; b < numBumps; b++) {
    bumps.push({
      center: rand() * (n - 1),
      width: (n / numBumps) * (0.35 + rand() * 0.3),
      amp: peakBase * (0.55 + rand() * 0.45) * (b === 0 ? 1 : (0.35 + rand() * 0.4))
    });
  }
  var floor = peakBase * 0.12;
  var vals = [];
  for (var i = 0; i < n; i++) {
    var v = floor;
    for (var j = 0; j < bumps.length; j++) {
      var d = (i - bumps[j].center) / bumps[j].width;
      v += bumps[j].amp * Math.exp(-d * d);
    }
    v *= (0.88 + rand() * 0.24);
    vals.push(Math.max(1, Math.round(v)));
  }
  return vals;
}
function ktnFmtMD(d) { return (d.getMonth() + 1) + '/' + d.getDate(); }
function ktnTrendSvg(dates, vals, markers, segs, unit) {
  unit = unit || '回';
  var W = 700, H = 190, PAD_T = 12, PAD_B = 34, PAD_L = 50, PAD_R = 4;
  var n = vals.length;
  var actualMax = Math.max.apply(null, vals);
  var maxV = actualMax * 1.15;
  var plotH = H - PAD_T - PAD_B;
  function xAt(i) { return n === 1 ? PAD_L + (W - PAD_L - PAD_R) / 2 : PAD_L + (W - PAD_L - PAD_R) * i / (n - 1); }
  function yAt(v) { return PAD_T + plotH * (1 - v / (maxV || 1)); }
  var pts = [];
  for (var i = 0; i < n; i++) pts.push(xAt(i).toFixed(1) + ',' + yAt(vals[i]).toFixed(1));
  var lineD = 'M' + pts.join(' L');
  var areaD = lineD + ' L' + xAt(n - 1).toFixed(1) + ',' + (H - PAD_B) + ' L' + xAt(0).toFixed(1) + ',' + (H - PAD_B) + ' Z';
  var dots = '';
  if (n <= 31) {
    for (var k = 0; k < n; k++) {
      dots += '<circle class="ins-linechart__dot" cx="' + xAt(k).toFixed(1) + '" cy="' + yAt(vals[k]).toFixed(1) + '" r="3.2"><title>' + ktnFmtMD(dates[k]) + '　' + vals[k] + unit + '</title></circle>';
    }
  }
  var labelCount = Math.min(6, n);
  var axis = '';
  for (var m = 0; m < labelCount; m++) {
    var idx = labelCount === 1 ? 0 : Math.round(m * (n - 1) / (labelCount - 1));
    var anchor = idx === 0 ? 'start' : (idx === n - 1 ? 'end' : 'middle');
    axis += '<text class="ins-linechart__axis" x="' + xAt(idx).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="' + anchor + '">' + ktnFmtMD(dates[idx]) + '</text>';
  }
  /* 左に0/中間/最大の3段階y軸を常設（旧・最大値のみの浮きラベルは数字が乱立して見えたため統合） */
  var midVal = Math.round(actualMax / 2);
  var yTicks = [
    { v: actualMax, label: actualMax + unit },
    { v: midVal, label: midVal + unit },
    { v: 0, label: '0' }
  ];
  var grid = '';
  for (var yi = 0; yi < yTicks.length; yi++) {
    var ty = yAt(yTicks[yi].v);
    grid += '<line class="ins-linechart__ygrid" x1="' + PAD_L + '" y1="' + ty.toFixed(1) + '" x2="' + (W - PAD_R) + '" y2="' + ty.toFixed(1) + '"></line>'
      + '<text class="ins-linechart__ylabel" x="' + (PAD_L - 6) + '" y="' + (ty + 3).toFixed(1) + '" text-anchor="end">' + yTicks[yi].label + '</text>';
  }
  var markSvg = '';
  if (markers && markers.length) {
    for (var mi = 0; mi < markers.length; mi++) {
      var mk = markers[mi];
      if (mk.index <= 0 || mk.index >= n) continue;
      var mx = xAt(mk.index).toFixed(1);
      markSvg += '<line class="ins-linechart__marker" x1="' + mx + '" y1="' + PAD_T + '" x2="' + mx + '" y2="' + (H - PAD_B) + '"></line>';
      /* segs（区間合計）を表示する場合は境界線ラベルを出さない。区間ごとの中央ラベルと
         内容が重複し、狭い上部スペースで文字が競合するため */
      if (!segs) {
        markSvg += '<text class="ins-linechart__markerlabel" x="' + mx + '" y="' + (PAD_T + 9) + '" text-anchor="middle">' + mk.label + '</text>';
      }
    }
  }
  var segSvg = '';
  if (segs && segs.length) {
    for (var si = 0; si < segs.length; si++) {
      var sg = segs[si];
      if (!sg.len || sg.len <= 0) continue;
      var segCx = ((xAt(sg.from) + xAt(sg.from + sg.len - 1)) / 2).toFixed(1);
      segSvg += '<text class="ins-linechart__segline" x="' + segCx + '" y="' + (PAD_T + 9) + '" text-anchor="middle">' + sg.label
        + '<tspan class="ins-linechart__segline-val" dx="4">' + sg.sum + unit + '</tspan></text>';
    }
  }
  return '<svg class="ins-linechart__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="閲覧数の推移">'
    + '<path class="ins-linechart__area" d="' + areaD + '"></path>'
    + grid
    + '<path class="ins-linechart__line" d="' + lineD + '"></path>'
    + dots + axis + markSvg + segSvg
    + '</svg>';
}
KTN.renderTrend = function (hostId, period, peakBase) {
  var host = document.getElementById(hostId);
  if (!host) return;
  var n = period === '7' ? 7 : period === '90' ? 90 : period === 'all' ? 365 : 30;
  var rand = ktnTrendRand(ktnTrendHash(hostId + '|' + period));
  var vals = ktnTrendValues(n, peakBase, rand);
  var today = KTN.TREND_TODAY;
  var dates = [];
  for (var i = 0; i < n; i++) dates.push(new Date(today.getTime() - (n - 1 - i) * 86400000));
  host.innerHTML = ktnTrendSvg(dates, vals);
  var peakEl = document.getElementById(hostId + 'Peak');
  if (peakEl) {
    var maxIdx = vals.indexOf(Math.max.apply(null, vals));
    peakEl.textContent = ktnFmtMD(dates[maxIdx]) + ' 閲覧数ピーク';
  }
};

/* ── 週間トレンド：renderTrendと同じ折れ線コンポーネントを流用し、
   日次でなく週次（各点＝週の起算日）で集計した値を表示する。
   ウォッチャー推移など「回数」でなく「人数」を扱う指標のため unit を渡せる ── */
KTN.renderWeeklyTrend = function (hostId, weeks, peakBase, unit) {
  var host = document.getElementById(hostId);
  if (!host) return;
  var rand = ktnTrendRand(ktnTrendHash(hostId + '|weekly'));
  var vals = ktnTrendValues(weeks, peakBase, rand);
  var today = KTN.TREND_TODAY;
  var dates = [];
  for (var i = 0; i < weeks; i++) dates.push(new Date(today.getTime() - (weeks - 1 - i) * 7 * 86400000));
  host.innerHTML = ktnTrendSvg(dates, vals, null, null, unit);
  var peakEl = document.getElementById(hostId + 'Peak');
  if (peakEl) {
    var maxIdx = vals.indexOf(Math.max.apply(null, vals));
    peakEl.textContent = ktnFmtMD(dates[maxIdx]) + '週 ピーク';
  }
};

/* ── 展覧会フェーズ連動トレンド（P2-14専用）：会期前/会期中/終了後の3フェーズを
   実際の会期日程に固定して描画する。期間ローリング窓（renderTrend）と違い
   「今日」からの相対日数ではなく会期の実日付を起点にするため別関数として分離。
   dates/vals を返すのは、呼び出し側（会期中の序盤/中盤/終盤 内訳）が
   同じ乱数系列から集計できるようにするため ── */
function ktnExhTrendDates(phase, exhStart, exhEnd, today) {
  var oneDay = 86400000;
  var dates = [];
  if (phase === 'before') {
    var n = 14;
    var end = new Date(exhStart.getTime() - oneDay);
    for (var i = 0; i < n; i++) dates.push(new Date(end.getTime() - (n - 1 - i) * oneDay));
    return dates;
  }
  if (phase === 'during') {
    var n2 = Math.round((exhEnd.getTime() - exhStart.getTime()) / oneDay) + 1;
    for (var j = 0; j < n2; j++) dates.push(new Date(exhStart.getTime() + j * oneDay));
    return dates;
  }
  if (phase === 'all') {
    var beforeStart = new Date(exhStart.getTime() - 14 * oneDay);
    var n4 = Math.max(1, Math.round((today.getTime() - beforeStart.getTime()) / oneDay) + 1);
    for (var p = 0; p < n4; p++) dates.push(new Date(beforeStart.getTime() + p * oneDay));
    return dates;
  }
  var start = new Date(exhEnd.getTime() + oneDay);
  var n3 = Math.max(1, Math.round((today.getTime() - start.getTime()) / oneDay) + 1);
  for (var k = 0; k < n3; k++) dates.push(new Date(start.getTime() + k * oneDay));
  return dates;
}
KTN.renderExhTrend = function (hostId, phase, exhStart, exhEnd, peakBase) {
  var host = document.getElementById(hostId);
  if (!host) return null;
  var dates = ktnExhTrendDates(phase, exhStart, exhEnd, KTN.TREND_TODAY);
  var rand = ktnTrendRand(ktnTrendHash(hostId + '|exh|' + phase));
  var vals = ktnTrendValues(dates.length, peakBase, rand);
  var markers = [];
  var segs = null;
  /* 内訳（segs）はチャート上のマーカーと下部KPIカードで同じ境界値を共有する単一ソース。
     呼び出し側（pages.js）で境界を再計算すると数値がズレる恐れがあるためここで確定する */
  if (phase === 'all') {
    var beforeLen = 14;
    var duringLen = Math.round((exhEnd.getTime() - exhStart.getTime()) / 86400000) + 1;
    var afterLen = dates.length - beforeLen - duringLen;
    markers.push({ index: beforeLen, label: '会期開始' });
    markers.push({ index: beforeLen + duringLen, label: '会期終了' });
    segs = [
      { label: '会期前', from: 0, len: beforeLen },
      { label: '会期中', from: beforeLen, len: duringLen },
      { label: '終了後', from: beforeLen + duringLen, len: afterLen }
    ];
  } else if (phase === 'during') {
    var n = dates.length;
    var first = Math.ceil(n / 3);
    var rest = n - first;
    var second = Math.ceil(rest / 2);
    var third = rest - second;
    markers.push({ index: first, label: '中盤' });
    markers.push({ index: first + second, label: '終盤' });
    segs = [
      { label: '序盤', from: 0, len: first },
      { label: '中盤', from: first, len: second },
      { label: '終盤', from: first + second, len: third }
    ];
  }
  /* 序盤/中盤/終盤の区間合計はグラフ内にも表示する（下部KPIカードと同じ segs を再利用）。
     「会期前/会期中/終了後」（全期間）は3区間の性質が均等な内訳ではない（会期前=固定14日等）ため
     グラフ内表示は対象外とし、従来どおり境界マーカーのみに留める */
  var chartSegs = null;
  if (phase === 'during' && segs) {
    chartSegs = segs.map(function (s) {
      var slice = vals.slice(s.from, s.from + s.len);
      var sum = slice.reduce(function (a, b) { return a + b; }, 0);
      return { label: s.label, from: s.from, len: s.len, sum: sum };
    });
  }
  var total = vals.reduce(function (a, b) { return a + b; }, 0);
  var totalEl = document.getElementById(hostId + 'Total');
  if (totalEl) totalEl.innerHTML = total + '<span class="unit">回</span>';
  host.innerHTML = ktnTrendSvg(dates, vals, markers, chartSegs);
  var peakEl = document.getElementById(hostId + 'Peak');
  if (peakEl) {
    var maxIdx = vals.indexOf(Math.max.apply(null, vals));
    peakEl.textContent = ktnFmtMD(dates[maxIdx]) + ' 閲覧数ピーク';
  }
  return { dates: dates, vals: vals, segs: segs, total: total };
};

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
      /* myページ（user）の強調バッジはヘッダーのLIAISON+要対応ボタン（getActions内
         txnAlertActionBtn）と同義の通知のため、サイドバーに重複表示しない（2026-08-21）。 */
      const cnt = r === 'user' ? 0 : ktnTxnAlertCount(r);
      const badge = cnt > 0 ? `<span class="ktn-sidebar__badge">${cnt > 99 ? '99+' : cnt}</span>` : '';
      return `
        <a href="${rd.url}" class="ktn-sidebar__item" data-page="${rd.page}" onclick="handleNav(event,'${rd.page}','${rd.url}')">
          <div class="ktn-sidebar__role">
            <div class="ktn-sidebar__role-fallback" style="background:${rd.bg}">${rd.icon}</div>
          </div>
          ${badge}
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
      <div class="ktn-bottom-nav__icon"><img src="./images/kotennavi-logo3.svg" alt="" width="24" height="24"></div>
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
    /* サイドバーと同じ理由でmyページの強調バッジは表示しない（2026-08-21）。 */
    const urBadge = '';
    html += `
      <a href="${ur.url}" class="ktn-bottom-nav__item" data-page="${ur.page}" onclick="handleNav(event,'${ur.page}','${ur.url}')">
        <div class="ktn-bottom-nav__role" style="background:${ur.bg};border-radius:9px">${ur.iconSm}</div>
        ${urBadge}
        <span class="ktn-bottom-nav__label">myページ</span>
      </a>
    `;
    let extraRole = null;
    if (curRole === 'user+creator') extraRole = 'creator';
    else if (curRole === 'user+gallery') extraRole = 'gallery';
    else if (curRole === 'admin') extraRole = 'admin';
    if (extraRole) {
      const er = KTN_ROLES[extraRole];
      const erCnt = ktnTxnAlertCount(extraRole);
      const erBadge = erCnt > 0 ? `<span class="ktn-bottom-nav__badge">${erCnt > 99 ? '99+' : erCnt}</span>` : '';
      html += `
        <a href="${er.url}" class="ktn-bottom-nav__item" data-page="${er.page}" onclick="handleNav(event,'${er.page}','${er.url}')">
          <div class="ktn-bottom-nav__role" style="background:${er.bg};border-radius:9px">${er.iconSm}</div>
          ${erBadge}
          <span class="ktn-bottom-nav__label">${er.label}</span>
        </a>
      `;
    }
  }

  inner.innerHTML = html;
  requestAnimationFrame(() => updateActiveState());
}

/* ══════════════════════════════════
   フッター（全ページ共通・単一ソース）
   #ktnFooter を持つページにのみ描画（持たないページは null ガードで無視）
══════════════════════════════════ */
function renderFooter() {
  const el = document.getElementById('ktnFooter');
  if (!el) return;
  el.innerHTML = `
    <div class="ktn-footer__inner">
      <div class="ktn-footer__upper">

        <div class="ktn-footer__brand">
          <a href="/p1" class="ktn-footer__logo" onclick="handleNav(event,'p1','/p1')">
            <img src="./images/kotennavi-logo1.svg" alt="個展なび">
          </a>
          <p class="ktn-footer__tagline">
            展覧会を探すなら、個展なび。<br>
            展覧会を発信するなら、個展なび。
          </p>
          <div class="ktn-footer__sns">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener" class="ktn-footer__sns-link">Facebook</a>
            <a href="https://x.com/" target="_blank" rel="noopener" class="ktn-footer__sns-link">X (Twitter)</a>
          </div>
        </div>

        <div class="ktn-footer__col">
          <p class="ktn-footer__col-title">展覧会</p>
          <ul class="ktn-footer__links">
            <li><a href="/p10" onclick="handleNav(event,'p10','/p10')">展覧会を探す</a></li>
            <li><a href="/p70" onclick="handleNav(event,'p70','/p70')"><span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>オンライン展示</a></li>
          </ul>
          <p class="ktn-footer__col-title" style="margin-top:20px">特集</p>
          <div class="ktn-footer__feature-tags">
            <a href="/p10-4" class="ktn-footer__feature-tag" onclick="handleNav(event,'p10-4','/p10-4')">九州の展覧会</a>
            <a href="/p10-4" class="ktn-footer__feature-tag" onclick="handleNav(event,'p10-4','/p10-4')">今週末開催</a>
            <a href="/p10-4" class="ktn-footer__feature-tag" onclick="handleNav(event,'p10-4','/p10-4')">東京・写真展</a>
            <a href="/p10-4" class="ktn-footer__feature-tag" onclick="handleNav(event,'p10-4','/p10-4')">特集一覧 →</a>
          </div>
        </div>

        <div class="ktn-footer__col">
          <p class="ktn-footer__col-title">ご利用について</p>
          <ul class="ktn-footer__links">
            <li><a href="/p60" onclick="handleNav(event,'p60','/p60')">ご利用ガイド</a></li>
            <li><a href="/p60-2" onclick="handleNav(event,'p60-2','/p60-2')">展覧会を掲載する</a></li>
            <li><a href="/p61" onclick="handleNav(event,'p61','/p61')">お知らせ</a></li>
          </ul>
          <p class="ktn-footer__col-title" style="margin-top:20px">会員登録</p>
          <ul class="ktn-footer__links">
            <li><a href="/register" onclick="handleNav(event,'register','/register')">新規登録（無料）</a></li>
            <li><a href="/login" onclick="handleNav(event,'login','/login')">ログイン</a></li>
            <li><a href="/p11-2" onclick="handleNav(event,'p11-2','/p11-2')">クリエイター申込</a></li>
            <li><a href="/p11-3" onclick="handleNav(event,'p11-3','/p11-3')">ギャラリー申込</a></li>
          </ul>
        </div>

        <div class="ktn-footer__col">
          <p class="ktn-footer__col-title">企業情報</p>
          <ul class="ktn-footer__links">
            <li><a href="/p60-8" onclick="handleNav(event,'p60-8','/p60-8')">会社概要</a></li>
            <li><a href="/p60-11" onclick="handleNav(event,'p60-11','/p60-11')">お問い合わせ</a></li>
          </ul>
        </div>

      </div><!-- /upper -->

      <div class="ktn-footer__liaison-band">
        <div class="ktn-footer__liaison-logo">
          <svg width="100px" height="53px" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30 180 Q 210 30, 390 180" stroke="rgba(255,255,255,0.5)" stroke-width="4" fill="none" stroke-linecap="round"/>
            <defs><path id="footLiArch" d="M 70 165 Q 210 45, 350 165"/></defs>
            <text font-family="'Cinzel',serif" font-size="40" font-weight="700" letter-spacing="7" fill="rgba(255,255,255,0.7)">
              <textPath href="#footLiArch" startOffset="50%" text-anchor="middle">LIAISON</textPath>
            </text>
            <text x="210" y="206" font-family="'Montserrat',sans-serif" font-size="10" font-weight="600" letter-spacing="4" fill="rgba(192,57,43,0.7)" text-anchor="middle">Now on View</text>
          </svg>
          <svg width="110px" height="58px" viewBox="0 0 480 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20 200 Q 240 33 460 200" stroke="rgba(180,140,20,0.5)" stroke-width="5" fill="none" stroke-linecap="round"/>
            <defs>
              <path id="footLpArch" d="M 80 184 Q 240 56 400 184"/>
              <linearGradient id="footLpGrad" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(180,140,20,0.6)"/>
                <stop offset="50%" stop-color="rgba(220,180,40,0.7)"/>
                <stop offset="100%" stop-color="rgba(180,140,20,0.6)"/>
              </linearGradient>
            </defs>
            <text font-family="'Bodoni Moda','DM Serif Display',serif" font-size="58" font-weight="600" letter-spacing="8" fill="url(#footLpGrad)">
              <textPath href="#footLpArch" startOffset="50%" text-anchor="middle">LIAISON</textPath>
            </text>
            <circle cx="432" cy="183" r="22" fill="rgba(180,140,20,0.5)"/>
            <text x="432" y="183" font-family="serif" font-size="42" font-weight="900" fill="rgba(255,240,200,0.7)" text-anchor="middle" dominant-baseline="central">+</text>
            <text x="240" y="228" font-family="'Montserrat',sans-serif" font-size="10" font-weight="600" letter-spacing="4" fill="rgba(180,140,20,0.6)" text-anchor="middle">Now on View + Shop</text>
          </svg>
        </div>
        <p class="ktn-footer__liaison-desc">
          オンラインで作品が見られる展覧会。会場の展示作品をそのままネットで鑑賞・購入できます。<br>
          LIAISON+では会期後も作品の購入申込が可能です。
        </p>
        <a href="/p70" class="ktn-footer__liaison-link" onclick="handleNav(event,'p70','/p70')">詳しく見る →</a>
      </div>

    </div><!-- /inner -->

    <div class="ktn-footer__bottom">
      <span class="ktn-footer__copy">©2010 kotennavi Co., Ltd. All rights reserved.</span>
      <div class="ktn-footer__policy">
        <a href="/p60-10" onclick="handleNav(event,'p60-10','/p60-10')">プライバシーポリシー</a>
        <a href="/p60-9" onclick="handleNav(event,'p60-9','/p60-9')">利用規約</a>
        <a href="/p60-11" onclick="handleNav(event,'p60-11','/p60-11')">お問い合わせ</a>
      </div>
    </div>
  `;
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
          'article-edit'（記事の登録・編集＝p2-13/p3-19/p4-19/p6-15/p7-11。p60-6/p60-7チャプター）
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

  /* ─── cat:'article-edit'（記事の登録・編集＝p2-13/p3-19/p4-19/p6-15/p7-11）───
     p60-6（クリエイター編）／p60-7（ギャラリー編）FAQの「記事の登録・編集」チャプターで描画。
     展覧会（exhibition-edit）との最大の違い＝管理者確認を経ない即時公開・削除に制限がない点。 */
  { id: 'ART-01', cat: 'article-edit', aud: 'common', grp: 'はじめに・基本', q: '誰が記事を投稿できますか？', a: '登録済みのクリエイター・ギャラリーが、ご自分の記事管理ページから投稿できます。ゲスト・一般ユーザーは投稿できません。' },
  { id: 'ART-02', cat: 'article-edit', aud: 'common', grp: 'はじめに・基本', q: '投稿にどれくらい時間がかかりますか？', a: 'タイトルと本文だけなら約5分で投稿できます。テキスト・画像・動画のブロックを自由に組み合わせて記事を作成できます。' },
  { id: 'ART-03', cat: 'article-edit', aud: 'common', grp: 'はじめに・基本', q: '記事はすぐ公開されますか？', a: 'はい。展覧会の登録と異なり管理者確認はなく、「下書き」を選ばずに保存すると即座に公開されます。' },
  { id: 'ART-04', cat: 'article-edit', aud: 'common', grp: '掲載先について', q: '記事の掲載先はどう決まりますか？', a: '記事を作成したページによって自動的に決まり、あとから変更はできません（例：展覧会の記事管理から作成した記事は、その展覧会に掲載されます）。' },
  { id: 'ART-05', cat: 'article-edit', aud: 'common', grp: '掲載先について', q: '1つの記事を複数の場所に掲載できますか？', a: 'いいえ。1記事につき掲載先は1つです。複数の場所に掲載したい場合は、それぞれのページの記事管理から個別に投稿してください。' },
  { id: 'ART-12', cat: 'article-edit', aud: 'common', grp: '掲載先について', q: '作品の記事管理には、どの記事が表示されますか？', a: 'その作品の記事管理には、その作品から作成した記事のみが表示されます（展覧会やクリエイター/ギャラリーページから作成した記事は含まれません）。すべての掲載先を横断して記事を確認したい場合は、クリエイター/ギャラリーの記事管理をご利用ください。' },
  { id: 'ART-06', cat: 'article-edit', aud: 'creator', grp: '掲載先について', q: 'クリエイターページには、どんな記事を投稿できますか？', a: '制作ノート・出展予定の展覧会の予告・主宰する教室やワークショップの案内・制作にまつわる近況など、あなたの活動をファンに伝える記事を投稿できます。' },
  { id: 'ART-07', cat: 'article-edit', aud: 'gallery', grp: '掲載先について', q: 'ギャラリーページには、どんな記事を投稿できますか？', a: '会場からのお知らせ・展覧会レポート・取扱作家の紹介など、ギャラリーの活動を伝える記事を投稿できます。' },
  { id: 'ART-08', cat: 'article-edit', aud: 'common', grp: '記事種別', q: '記事種別は何を選べばいいですか？', a: 'レポート・インタビュー・お知らせなど、内容に近いものを選んでください。当てはまらない場合は「＋ その他」から自由入力できます。' },
  { id: 'ART-09', cat: 'article-edit', aud: 'creator', grp: '記事種別', q: '「制作日記」「ワークショップ」はクリエイター専用ですか？', a: 'はい。クリエイターのみ選べる種別です（ギャラリーには同じ位置に「ギャラリーノート」が表示されます）。' },
  { id: 'ART-10', cat: 'article-edit', aud: 'common', grp: '下書き・編集・削除', q: '入力を途中でやめても大丈夫ですか？（下書き）', a: '「一時保存（下書き）」で保存できます。下書きは記事管理にのみ表示され、公開ページ・記事一覧・検索には出ません。あとから記事管理で仕上げると公開できます。' },
  { id: 'ART-11', cat: 'article-edit', aud: 'common', grp: '下書き・編集・削除', q: '公開後に内容を修正できますか？', a: 'いつでも編集できます。展覧会と異なり管理者確認は不要で、保存すると即座に反映されます。' },
  { id: 'ART-13', cat: 'article-edit', aud: 'common', grp: '下書き・編集・削除', q: '投稿した記事を削除したい。', a: '記事管理ページからいつでも削除できます（確認画面が表示されます）。展覧会と異なり、削除に制限はありません。' },

  /* ─── cat:'profile-edit'（プロフィール編集＝p3-11／ギャラリー情報編集＝p4-11・p60-6/p60-7 FAQ「プロフィール編集」章）
     hideGroup で描画するため grp は表示に使わないが分類上そろえておく。 */
  { id: 'PRO-01', cat: 'profile-edit', aud: 'common', grp: 'プロフィール編集', q: '公開ページにはどの情報が表示されますか？', a: '表示名・自己紹介・ジャンル・SNS等の公開プロフィール項目のみページに表示されます。住所・電話番号など「配送先」ブロックの項目は非公開です。' },
  { id: 'PRO-02', cat: 'profile-edit', aud: 'common', grp: 'プロフィール編集', q: 'ID・URLはあとから変更できますか？', a: 'いつでも変更できます。変更後は旧URLでは表示されなくなるため、SNSやサイトに貼ったリンクは新しいURLに更新してください。' },
  { id: 'PRO-03', cat: 'profile-edit', aud: 'creator', grp: 'プロフィール編集', q: '本名やフリガナ、住所は誰でも見られますか？', a: 'いいえ、非公開です。本人確認・作品の発送地・LIAISON+の代金精算のために使用する情報で、公開ページには表示されません。' },
  { id: 'PRO-03G', cat: 'profile-edit', aud: 'gallery', grp: 'プロフィール編集', q: 'ご担当者のお名前や電話番号は誰でも見られますか？', a: 'いいえ、非公開です。ギャラリーとの取引・LIAISON+の代金精算のご連絡先として使用します。' },
  { id: 'PRO-04', cat: 'profile-edit', aud: 'creator', grp: 'プロフィール編集', q: '「取扱ギャラリー・店舗」には何を入力しますか？', a: '作品を取り扱っている、または過去に取引のあったギャラリー・店舗があれば入力してください（任意項目です）。' },
  { id: 'PRO-04G', cat: 'profile-edit', aud: 'gallery', grp: 'プロフィール編集', q: 'ご担当者の「ギャラリーとのご関係」は何を選べばよいですか？', a: '代表・スタッフなど、ギャラリーとの関わり方に近い選択肢をお選びください。LIAISON+の代金精算・連絡窓口の確認に使用します。' },
  { id: 'PRO-05', cat: 'profile-edit', aud: 'common', grp: 'プロフィール編集', q: '「作品の発送地」は何に使われますか？', a: 'LIAISON+で作品が売れた際、配送料金の目安計算や発送手続きの基準地として使われます。実際の発送はご自身で手配してください。' },
  { id: 'PRO-06', cat: 'profile-edit', aud: 'common', grp: 'プロフィール編集', q: 'ジャンルは複数選べますか？', a: 'はい、複数選択できます。該当するジャンルをすべて選んでください。' },
  { id: 'PRO-07', cat: 'profile-edit', aud: 'common', grp: 'プロフィール編集', q: '事業者番号・インボイス制度の登録は必須ですか？', a: 'いいえ、任意です。登録されている場合のみご入力ください（LIAISON+の請求書発行等に使用します）。' },

  /* ─── cat:'insight'（インサイト＝p3-12／p4-12・p60-6/p60-7 FAQ「インサイト」章） ─── */
  { id: 'INS-01', cat: 'insight', aud: 'common', grp: 'インサイト', q: '「閲覧数」に含まれるのはどのページですか？', a: 'ご自身のページ本体、および出品している展覧会・作品・記事など、あなたに関連する全ページの閲覧数を合算しています。' },
  { id: 'INS-02', cat: 'insight', aud: 'common', grp: 'インサイト', q: '集計期間や対象の展覧会・作品は変更できますか？', a: '画面上部の「Period」「Target」から集計期間・対象を切り替えられます。' },
  { id: 'INS-03', cat: 'insight', aud: 'common', grp: 'インサイト', q: '「ページを伸ばすヒント」はどんな基準で表示されますか？', a: 'ウォッチャー数やチェックイン数の増加が閲覧数・継続率に与える傾向を、サイト全体の統計から算出して表示しています（個別の保証値ではありません）。' },
  { id: 'INS-04', cat: 'insight', aud: 'common', grp: 'インサイト', q: '「作品販売のうごき」は何を表していますか？', a: '作品ページの閲覧から興味あり登録・購入申込・取引成立までの流れを、段階ごとの人数で表示するファネルです。LIAISON+の出品がある場合のみ表示されます。' },
  { id: 'INS-06', cat: 'insight', aud: 'common', grp: 'インサイト', q: '作品ごとのインサイトと、クリエイター/ギャラリー全体のインサイトの違いは何ですか？', a: '作品のインサイトは、その作品1点の閲覧数・興味あり！・お問い合わせ・購入申込のみを集計します。クリエイター/ギャラリー全体のインサイトは、ご自身のページ本体と、出品しているすべての展覧会・作品・記事を横断して合算した数値です。特定の作品を伸ばしたいときは作品側のインサイトを、活動全体の傾向をつかみたいときは全体のインサイトをご覧ください。' },

  /* ─── cat:'audience-mgmt'（オーディエンス管理＝p3-13／p4-13・p60-6/p60-7 FAQ「オーディエンス管理」章） ─── */
  { id: 'AUD-01', cat: 'audience-mgmt', aud: 'common', grp: 'オーディエンス管理', q: '「ウォッチャー」「チェックイン」の一覧は何を表示していますか？', a: 'あなたをウォッチしているユーザー、あなたの展覧会にチェックインしたユーザーの一覧です。' },
  { id: 'AUD-02', cat: 'audience-mgmt', aud: 'common', grp: 'オーディエンス管理', q: '通知をオフにするとどうなりますか？', a: '新しいウォッチ・チェックインが発生してもメール通知が届かなくなります。一覧はオン/オフに関わらずいつでも確認できます。' },
  { id: 'AUD-03', cat: 'audience-mgmt', aud: 'common', grp: 'オーディエンス管理', q: '一覧の並べ替え・絞り込みは何ができますか？', a: 'ウォッチャーは登録日時順、チェックインは展覧会別・日時順などで並べ替え・絞り込みができます。' },
  { id: 'AUD-04', cat: 'audience-mgmt', aud: 'common', grp: 'オーディエンス管理', q: '特定のユーザーのウォッチ・チェックインをこちらから解除できますか？', a: 'いいえ、ウォッチ・チェックインの解除はユーザー本人のみが行えます。' },

  /* ─── cat:'portfolio-mgmt'（ポートフォリオ管理＝p3-14／作品インベントリー＝p4-14・p60-6/p60-7 FAQ「作品の管理」章） ─── */
  { id: 'POR-01', cat: 'portfolio-mgmt', aud: 'common', grp: '作品の管理', q: '「掲載中」「売約済」タブの違いは何ですか？', a: '「掲載中」は現在サイトに表示されている作品、「売約済」はLIAISON+等で購入が成立し非公開・アーカイブされた作品です。' },
  { id: 'POR-02', cat: 'portfolio-mgmt', aud: 'common', grp: '作品の管理', q: '販売中・商談中の作品は削除できますか？', a: '商談中・申込がある作品は削除できません。取り下げたい場合は、先に販売状態を変更するか、担当窓口へご相談ください。' },
  { id: 'POR-03', cat: 'portfolio-mgmt', aud: 'creator', grp: '作品の管理', q: '新規作品はどこから登録しますか？', a: '「新規作品を作成 →」から登録できます。作者は自動的にご自身になります。' },
  { id: 'POR-04', cat: 'portfolio-mgmt', aud: 'gallery', grp: '作品の管理', q: '新規作品を登録するとき、作者に選べないクリエイターがいるのはなぜですか？', a: '作者に指定できるのは、このギャラリーが作成した展覧会（管理者確認済み）に出展クリエイターとしてリンクされているクリエイターのみです。取り扱う作品の真正性を担保するためのルールで、未登録・出展実績のない作家の作品は登録できません。' },
  { id: 'POR-05', cat: 'portfolio-mgmt', aud: 'common', grp: '作品の管理', q: '展覧会への出品設定やLIAISON設定はここで行いますか？', a: 'いいえ。作品そのものの情報（名称・仕様・画像など）はここで管理し、展覧会への出品やLIAISON設定は各展覧会の出品管理から行います。' },
  { id: 'POR-07', cat: 'portfolio-mgmt', aud: 'common', grp: '作品の管理', q: '作品編集画面で作者欄が固定表示になっていて選べないのはなぜですか？', a: '作品の作者は、新規作品の作成に進んだ入口（ポートフォリオ管理／インベントリー管理、または展覧会のLIAISON・LIAISON+出品管理）に応じて自動的に決まり、作品編集画面内では変更できません。作者を変えたい場合は、正しい作者の入口からあらためて新規作成してください。' },
  { id: 'POR-08', cat: 'portfolio-mgmt', aud: 'common', grp: '作品の管理', q: '「クローンで作成」を使うとどうなりますか？', a: '既存の作品の情報（画像・説明・仕様など）を引き継いだ新しい作品として複製されます。作品タイトルとメイン画像は複製後に必ず更新してください（他の項目は元の作品の内容をそのまま引き継ぎます）。複製後は元の作品とは別の作品として扱われ、独立して展覧会への出品やLIAISON設定ができます。' },

  /* ─── cat:'account-profile'／'account-security'／'account-notify'（マイページ管理＝p5-11/p5-12/p5-13）
     aud:'user'（ユーザー本人向け・p60-5「よくある質問-ユーザー編」の新設章で描画・2026-08-22新設）。
     LIAISON+取引（購入確定・支払・発送・受取確認）に関するFAQはcat:'liaison-txn' side:'buyer'に既に集約済み
     （p70-11「リエゾン+取引ガイド購入者編」）のため、ここでは重複させずアカウント設定固有の内容のみ扱う。
     p5-14/p5-15/p5-16のガイドリンクはp70-11側の該当章へ直接結線する（p60-5には作らない）。 */
  { id: 'ACC-P01', cat: 'account-profile', aud: 'user', grp: 'プロフィール編集', q: '公開マイページにはどの情報が表示されますか？', a: '表示名（姓名）・プロフィール画像・自己紹介文と、非公開にしていない場合は居住地が公開マイページに表示されます。メールアドレスは公開されません。' },
  { id: 'ACC-P02', cat: 'account-profile', aud: 'user', grp: 'プロフィール編集', q: 'ユーザーID（URL）はあとから変更できますか？', a: 'いつでも変更できます。変更後は旧URLでは表示されなくなるため、SNS等に貼ったリンクは新しいURLに更新してください。' },
  { id: 'ACC-P03', cat: 'account-profile', aud: 'user', grp: 'プロフィール編集', q: 'メールアドレスはこのページで変更できますか？', a: '「変更する →」のリンクから別途手続きします。変更後は新しいメールアドレス宛に確認メールが送信され、確認が完了するまでは元のメールアドレスが有効なままです。' },
  { id: 'ACC-P04', cat: 'account-profile', aud: 'user', grp: 'プロフィール編集', q: '居住地を「非公開」にするとどうなりますか？', a: '公開マイページに居住地が表示されなくなります。ウォッチ・チェックイン・興味あり！などの機能はこれまで通りご利用いただけます。' },

  { id: 'ACC-S01', cat: 'account-security', aud: 'user', grp: 'パスワード管理', q: 'パスワードの条件はありますか？', a: '8文字以上でご設定ください。英大文字・小文字・数字・記号を組み合わせると強度が上がります。' },
  { id: 'ACC-S02', cat: 'account-security', aud: 'user', grp: 'パスワード管理', q: 'パスワードを忘れてしまいました。', a: 'ログイン画面の「パスワードをお忘れですか？」から、ご登録のメールアドレス宛にパスワード再設定用のリンクをお送りします。このページからパスワードを変更する場合は、現在のパスワードの入力が必要です。' },
  { id: 'ACC-S03', cat: 'account-security', aud: 'user', grp: 'パスワード管理', q: 'パスワードを変更すると他の端末はログアウトされますか？', a: '安全のため、変更後は他の端末でログイン中のセッションが自動的にログアウトされることがあります。再度ログインしてご利用ください。' },

  { id: 'ACC-N01', cat: 'account-notify', aud: 'user', grp: 'メール通知設定', q: '通知メールをすべて停止できますか？', a: '「重要なお知らせ」（利用規約の変更・セキュリティ情報等）と、LIAISON+取引に関する一部の通知（在庫確認・順番繰り上がり、支払い案内、発送、申込キャンセル・取引中止）は、安全な取引とサービス運営に必要なため停止できません。それ以外の展覧会通知・プロモーション等はオン/オフを自由に選べます。' },
  { id: 'ACC-N02', cat: 'account-notify', aud: 'user', grp: 'メール通知設定', q: '設定はすぐに反映されますか？', a: 'はい。トグルを切り替えると自動的に保存されます。保存ボタンの操作は不要です。' },
  { id: 'ACC-N03', cat: 'account-notify', aud: 'user', grp: 'メール通知設定', q: '取引完了の通知はオフにできますか？', a: 'はい。「取引完了」は在庫確認・支払い案内・発送・キャンセルと異なり必須通知ではないため、オフにできます。取引の状況はいつでも取引ワークスペースでご確認いただけます。' },

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
  renderFooter();
  renderTagbar(window.ktnState.page);
  updateActiveState(window.ktnState.page);
  syncAdminNote();
  syncRoleOwnerOnly();
}

/* 管理者コメント欄（コンテンツ編集ページ共通）を role で表示切替。
   .ktn-admin-note を持つページなら自動で効くため、ページ側の結線は不要。 */
function syncAdminNote() {
  var isAdmin = window.ktnState.role === 'admin';
  document.querySelectorAll('.ktn-admin-note').forEach(function (el) {
    el.hidden = !isAdmin;
  });
}

/* 「本人・管理者のみ」表示する要素を role で表示切替（P3/P4/P5ヒーローの
   「プロフィールを編集」等）。本人ロールはページ種別で異なる（P3=creator/P4=gallery/P5=user+）ため
   body クラスから判定する。.p5-owner-only（本人/他のユーザー表示トグル）とは直交する
   別軸のゲートで、.ktn-role-owner-only を持つ要素なら自動で効くためページ側の結線は不要。 */
function syncRoleOwnerOnly() {
  /* デモバーの役割ボタンは 'user+creator'/'user+gallery' を渡す（getActions()の正規化と同じ扱いが必要）。 */
  var role = window.ktnState.role;
  if (role === 'user+creator') role = 'creator';
  else if (role === 'user+gallery') role = 'gallery';
  var ownerRole = document.body.classList.contains('p3-page') ? 'creator'
    : document.body.classList.contains('p4-page') ? 'gallery'
    : 'user+';
  var ok = role === ownerRole || role === 'admin';
  document.querySelectorAll('.ktn-role-owner-only').forEach(function (el) {
    el.hidden = !ok;
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
  'p2-1': { n: '展覧会-スケジュール', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['スケジュール', null]] },
  'p2-2': { n: '展覧会-開催場所', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['開催場所', null]] },
  'p2-3': { n: '展覧会-記事・案内', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['記事・案内', null]] },
  'p2-4': { n: '展覧会-出展者', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['出展者', null]] },
  'p2-5': { n: '展覧会-リエゾン作品一覧', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['LIAISON作品一覧', null]] },
  'p2-5-1': { n: '展覧会-リエゾンプラス作品一覧', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['LIAISON+ 作品一覧', null]] },
  'p2-6': { n: '展覧会-作品リスト', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['作品リスト', null]] },
  'p2-11': { n: '展覧会-新規/編集/クローン', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['松田啓佑展［仮称］', 'kotennavi-p2.html'], ['展覧会を編集', null]] },
  'p2-12': { n: 'LIAISON 作品管理', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['LIAISON 作品管理', null]] },
  'p2-121': { n: 'LIAISON+ 作品管理', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['LIAISON+ 作品管理', null]] },
  'p2-13': { n: '展覧会-記事管理', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['記事管理', null]] },
  'p2-14': { n: '展覧会-インサイト', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['インサイト', null]] },
  'p2-15': { n: '展覧会-広告作成', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['広告作成', null]] },
  'p2-16': { n: '展覧会-修正依頼', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['修正依頼', null]] },
  // 旧「展覧会-報告」は全表示系共通の報告フォーム 'p60-13'「問題を報告する」に統合（2026-07-24）。
  // P3 クリエイター
  'p3': { n: 'クリエイター', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', null]] },
  'p3-1':  { n: '展覧会', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['展覧会一覧', null]] },
  'p3-2':  { n: 'クリエイター-記事',   w: '--w-index',   bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['記事一覧', null]] },
  'p3-3':  { n: 'クリエイター-作品',   w: '--w-index',   bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['作品一覧', null]] },
  'p3-11': { n: 'クリエイター-編集', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['編集', null]] },
  'p3-12': { n: 'クリエイター-インサイト', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['インサイト', null]] },
  'p3-13': { n: 'クリエイター-オーディエンス管理', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['オーディエンス管理', null]] },
  'p3-14': { n: 'クリエイター-ポートフォリオ管理', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['ポートフォリオ管理', null]] },
  'p3-15': { n: 'クリエイター-リエゾンコンソール', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['リエゾン+コンソール', null]] },
  'p3-16': { n: 'クリエイター-取引デスク', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['取引デスク', null]] },
  'p3-17': { n: 'クリエイター販売代金管理', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['販売代金管理', null]] },
  'p3-18': { n: 'クリエイター-展覧会管理', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['展覧会管理', null]] },
  'p3-19': { n: 'クリエイター-記事管理', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['記事管理', null]] },
  // P4 ギャラリー
  'p4': { n: 'ギャラリー', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', null]] },
  'p4-1': { n: 'ギャラリー-展覧会アーカイブ', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['展覧会アーカイブ', null]] },
  'p4-2': { n: 'ギャラリー-記事一覧', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['記事一覧', null]] },
  'p4-11': { n: 'ギャラリー-編集', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['編集', null]] },
  'p4-12': { n: 'ギャラリー-インサイト', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['インサイト', null]] },
  'p4-13': { n: 'ギャラリー-オーディエンス管理', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['オーディエンス管理', null]] },
  'p4-14': { n: 'ギャラリー-インベントリー管理', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['インベントリー管理', null]] },
  'p4-15': { n: 'ギャラリー-リエゾンコンソール', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['リエゾン+コンソール', null]] },
  'p4-16': { n: 'ギャラリー-取引デスク', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['取引デスク', null]] },
  'p4-17': { n: 'ギャラリー-販売代金管理', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['販売代金管理', null]] },
  'p4-18': { n: 'ギャラリー-展覧会管理', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['展覧会管理', null]] },
  'p4-19': { n: 'ギャラリー-記事管理', bc: [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['記事管理', null]] },
  // P5 ユーザー
  'p5': { n: 'ユーザー-展覧会カレンダー', bc: [['Top', '/'], ['山田花子 myページ', null]] },
  'p5-1': { n: 'ユーザー-ウオッチリスト', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['ウオッチリスト', null]] },
  'p5-2': { n: 'ユーザー-チェックイン記録', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['チェックイン記録', null]] },
  'p5-3': { n: 'ユーザー-興味あり!リスト', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['興味あり!リスト', null]] },
  'p5-4': { n: 'ユーザー-myコレクションルーム', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['myコレクションルーム', null]] },
  'p5-11': { n: 'ユーザー-編集', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['編集', null]] },
  'p5-12': { n: 'ユーザー-パスワード管理', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['パスワード管理', null]] },
  'p5-13': { n: 'ユーザー-メール通知管理', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['メール通知管理', null]] },
  'p5-14': { n: 'ユーザー-購入管理', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['購入管理', null]] },
  'p5-15': { n: 'ユーザー-取引ワークスペース', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['取引ワークスペース', null]] },
  'p5-16': { n: 'ユーザー-取引ワークスペース-支払', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['取引ワークスペース', '/p5-15'], ['支払', null]] },
  'p5-100': { n: 'ユーザー-退会', bc: [['Top', '/'], ['山田花子 myページ', '/p5'], ['退会', null]] },
  // P6 作品
  'p6':   { n: '作品詳細',
    bc: [['Top', '/'], ['作品', 'kotennavi-p10-1.html'], ['オノマトペの庭', null]] },
  'p6-1': { n: 'LIAISON作品',
    bc: [['Top', '/'], ['作品', 'kotennavi-p10-1.html'], ['オノマトペの庭', null]] },
  'p6-2': { n: 'LIAISON+作品',
    bc: [['Top', '/'], ['作品', 'kotennavi-p10-1.html'], ['オノマトペの庭', null]] },
  'p6-11': { n: '作品-新規/編集/クローン', bc: [['Top', '/'], ['作品', 'kotennavi-p10-1.html'], ['オノマトペの庭', 'kotennavi-p6.html'], ['新規/編集/クローン', null]] },
  'p6-12': { n: '作品-インサイト', bc: [['Top', '/'], ['作品', 'kotennavi-p10-1.html'], ['オノマトペの庭', 'kotennavi-p6.html'], ['インサイト', null]] },
  'p6-13': { n: '作品-問合せ', bc: [['Top', '/'], ['作品', 'kotennavi-p10-1.html'], ['オノマトペの庭', 'kotennavi-p6.html'], ['問合せ', null]] },
  'p6-14': { n: '作品-問合せへの回答', bc: [['Top', '/'], ['作品', 'kotennavi-p10-1.html'], ['オノマトペの庭', 'kotennavi-p6.html'], ['問合せへの回答', null]] },
  'p6-15': { n: '作品-記事管理', bc: [['Top', '/'], ['作品', 'kotennavi-p10-1.html'], ['オノマトペの庭', 'kotennavi-p6.html'], ['記事管理', null]] },
  // P7 記事（投稿者＝クリエイター/ギャラリーの記事一覧を経由。掲載先がgalleryの場合はcreator/田中透→gallery/Gallery SOIL 渋谷へ差し替え）
  'p7': { n: '記事', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['記事一覧', 'kotennavi-p3-2.html'], ['『オノマトペの庭』制作について', null]] },
  'p7-11': { n: '記事-新規/編集', bc: [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['編集', null]] },
  // P8 レビュー（レビュー一覧が存在しないため、レビュー対象の展覧会を経由＝p2-1等のサブページと同型）
  'p8': { n: 'レビュー', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['あなたが知らないオノマトペ レビュー', null]] },
  'p8-11': { n: 'レビュー-編集', bc: [['Top', '/'], ['展覧会', 'kotennavi-p10.html'], ['あなたが知らないオノマトペ', 'kotennavi-p2.html'], ['編集', null]] },
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
  'p11-4': { n: 'リエゾンプラス機能申込', bc: [['Top', '/'], ['リエゾンプラス機能申込', null]] },
  'p11-11': { n: 'ログイン-パスワードを忘れた方', bc: [['Top', '/'], ['ログイン-パスワードを忘れた方', null]] },
  'p11-12': { n: 'ログインパスワード再設定', bc: [['Top', '/'], ['ログインパスワード再設定', null]] },
  'p11-21': { n: 'ユーザー新規登録-アカウント仮登録完了', bc: [['Top', '/'], ['ユーザー新規登録-アカウント仮登録完了', null]] },
  'p11-22': { n: 'ユーザー新規登録-メールアドレス確認完了', bc: [['Top', '/'], ['ユーザー新規登録-メールアドレス確認完了', null]] },
  'p11-23': { n: 'ユーザー新規登録-パスワード設定', bc: [['Top', '/'], ['ユーザー新規登録-パスワード設定', null]] },
  'p11-24': { n: 'ユーザー新規登録-ウオッチ対象の選択', bc: [['Top', '/'], ['ユーザー新規登録-ウオッチ対象の選択', null]] },
  // P60 ガイド・法的（番号は docs/sitemap.md を正とする）
  'p60': { n: 'ご利用ガイド', bc: [['Top', '/'], ['ガイド', null]] },
  'p60-1': { n: '展覧会情報を探したい方', bc: [['Top', '/'], ['ガイド', 'kotennavi-p60.html'], ['展覧会情報を探したい方', null]] },
  'p60-2': { n: '展覧会情報を掲載したい方', bc: [['Top', '/'], ['ガイド', 'kotennavi-p60.html'], ['展覧会情報を掲載したい方', null]] },
  'p60-3': { n: '広告を出したい方', bc: [['Top', '/'], ['ガイド', 'kotennavi-p60.html'], ['広告を出したい方', null]] },
  'p60-4': { n: 'よくある質問-一般', bc: [['Top', '/'], ['ガイド', 'kotennavi-p60.html'], ['よくある質問-一般', null]] },
  'p60-5': { n: 'よくある質問-ユーザー編', bc: [['Top', '/'], ['ガイド', 'kotennavi-p60.html'], ['よくある質問-ユーザー編', null]] },
  'p60-6': { n: 'よくある質問-クリエイター編', bc: [['Top', '/'], ['ガイド', 'kotennavi-p60.html'], ['よくある質問-クリエイター編', null]] },
  'p60-7': { n: 'よくある質問-ギャラリー編', bc: [['Top', '/'], ['ガイド', 'kotennavi-p60.html'], ['よくある質問-ギャラリー編', null]] },
  'p60-8': { n: '個展なびとは', bc: [['Top', '/'], ['個展なびとは', null]] },
  'p60-9': { n: '利用規約', bc: [['Top', '/'], ['利用規約', null]] },
  'p60-10': { n: 'プライバシポリシー', bc: [['Top', '/'], ['プライバシポリシー', null]] },
  'p60-11': { n: 'お問合わせ', bc: [['Top', '/'], ['お問合わせ', null]] },
  'p60-12': { n: 'サービス機能改善要望', bc: [['Top', '/'], ['サービス機能改善要望', null]] },
  'p60-13': { n: '問題を報告する', bc: [['Top', '/'], ['問題を報告する', null]] },
  // P61 お知らせ
  'p61': { n: 'お知らせ一覧', bc: [['Top', '/'], ['お知らせ一覧', null]] },
  'p61-1': { n: 'ニュース', bc: [['Top', '/'], ['お知らせ一覧', 'kotennavi-p61.html'], ['新機能「リエゾンプラス」提供開始のお知らせ', null]] },
  'p61-11': { n: 'ニュース-新規/編集/クローン', bc: [['Top', '/'], ['お知らせ一覧', 'kotennavi-p61.html'], ['新規/編集/クローン', null]] },
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
  'p90-1': { n: '管理者-ユーザー新規/クローン', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['ユーザー新規/クローン', null]] },
  'p90-2': { n: '管理者-クリエイター/ギャラリー機能申込管理', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['クリエイター/ギャラリー機能申込管理', null]] },
  'p90-2-1': { n: '管理者-クリエイター/ギャラリー機能申込審査', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['クリエイター/ギャラリー機能申込管理', 'kotennavi-p90-2.html'], ['審査', null]] },
  'p90-3': { n: '管理者-展覧会新規', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['展覧会新規', null]] },
  'p90-4': { n: '管理者-本日開催・公開の展覧会一覧', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['本日開催・公開の展覧会一覧', null]] },
  'p90-5': { n: '管理者-未公開の展覧会一覧', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['未公開の展覧会一覧', null]] },
  'p90-6': { n: '管理者-最新の展覧会一覧', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['最新の展覧会一覧', null]] },
  'p90-7': { n: '管理者-クリエイター新規/クローン', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['クリエイター新規/クローン', null]] },
  'p90-8': { n: '管理者-ギャラリー新規/クローン', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['ギャラリー新規/クローン', null]] },
  'p90-9': { n: '管理者-メールテンプレート管理', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['メールテンプレート管理', null]] },
  'p90-10': { n: '管理者-ダッシュボード', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['ダッシュボード', null]] },
  'p90-11': { n: '管理者-リエゾンプラス機能申込管理', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['リエゾンプラス機能申込管理', null]] },
  'p90-11-1': { n: '管理者-リエゾンプラス機能申込審査', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['リエゾンプラス機能申込管理', 'kotennavi-p90-11.html'], ['審査', null]] },
  'p90-12': { n: '管理者-リエゾンプラスコンソール', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['リエゾンプラスコンソール', null]] },
  'p90-13': { n: '管理者-取引デスク', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['取引デスク', null]] },
  'p90-14': { n: '管理者-販売代金管理', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['販売代金管理', null]] },
  'p90-15': { n: '管理者-リエゾンプラス申込者一覧', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['リエゾンプラス申込者一覧', null]] },
  'p90-16': { n: '管理者-作品購入ユーザー一覧', bc: [['Top', '/'], ['管理者', 'kotennavi-p90.html'], ['作品購入ユーザー一覧', null]] },
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
function ddi(iconK, label, danger = false, onclick = '', extraCls = '') {
  const oc = onclick ? ` onclick="closeAllPanels();${onclick}"` : '';
  const cls = 'ktn-ddi' + (danger ? ' danger' : '') + (extraCls ? ' ' + extraCls : '');
  return `<button class="${cls}"${oc}>${ic(iconK)}${label}</button>`;
}
function ddSep() { return `<div class="ktn-dd-sep"></div>`; }
/* 管理者専用ブロックの見出しラベル（非クリック・セクション区切り。管理者メニュー＝オーナーメニューの
   スーパーセット内で「ここから下は管理者専用」を明示する。項目自体は ktn-ddi--admin extraCls で識別）。 */
function ddLabel(text) { return `<div class="ktn-dd-label">${text}</div>`; }
/* 今いるページ自身を指すメニュー項目（クリックしても無意味な自己参照リンク防止・単一ソース）。
   通常のリンク付き ddi() の代わりに、非活性＋「現在のページ」タグ表示にする。 */
function ddiCurrent(iconK, label) {
  return `<button class="ktn-ddi ktn-ddi--current" disabled>${ic(iconK)}<span class="ktn-ddi__lbl">${label}</span><span class="ktn-ddi__tag">現在のページ</span></button>`;
}
/* オーナーメニュー項目生成の共通口：curPage が targetPage と一致する場合のみ ddiCurrent() に差し替える。
   extraCls はサービス識別等の見た目モディファイア（例：ktn-ddi--lp）。自己参照時は ddiCurrent の
   グレーアウト表示を優先し extraCls は付けない。 */
function ddiP(curPage, targetPage, iconK, label, onclick, extraCls = '') {
  return curPage === targetPage ? ddiCurrent(iconK, label) : ddi(iconK, label, false, onclick, extraCls);
}

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
  /* 購入管理（p5-14）は1回以上の購入歴があるユーザーにのみ出す（KTN.hasPurchaseHistory）。
     ヘッダーの「LIAISON+要対応」ボタンは要対応件数=0だと出ないため、それだけがp5-14への
     唯一の導線だと0件時に迷子になる。設定メニューに常設のルートを確保する（2026-08-21）。 */
  var purchaseItem = KTN.hasPurchaseHistory ? ddi('shop', '購入管理', false, "location.href='./kotennavi-p5-14.html'") : '';
  return ddi('edit', 'プロフィール編集', false, "location.href='./kotennavi-p5-11.html'") +
    ddi('key', 'パスワード管理', false, "location.href='./kotennavi-p5-12.html'") +
    ddi('bell', 'メール通知設定', false, "location.href='./kotennavi-p5-13.html'") +
    purchaseItem + ddSep() +
    ddi('trash', '退会', true, "location.href='./kotennavi-p5-100.html'") + ddSep() +
    ddi('logout', 'ログアウト', false, "location.href='./kotennavi-p1.html'");
}

/* P5 管理者メニュー（設定メニューの全項目を含むスーパーセット＋管理者専用項目・p2/p3/p4と同一設計）。
   設定メニューは「利用者に今見えているメニュー」を管理者が把握するための表示、実際の操作は
   管理者専用ブロック（ktn-ddi--admin＝左アクセント＋「管理者専用」ラベル）から行う動線を維持する。
   「強制退会」はP2/P3/P4/P6の「削除」と違い、設定メニュー（本人操作）側に対応する「退会」とは別物の
   管理者専用アクション（本人の退会操作をバイパスする強制執行）のため、オーナー/設定メニュー項目の直後には
   出さず、他の管理者専用項目と同じ ktn-ddi--admin ブロック内に留める（2026-08-21・ユーザー指摘
   「p5の強制退会は管理者専用」により、削除の位置統一〔追74〕から本項目のみ除外・元の配置へ戻した）。 */
function p5AdminMenuItems() {
  /* 「編集」の遷移先はP90-1（管理者-ユーザー新規/クローン/編集・未作成）。P90一括制作まではonclick未結線のプレースホルダーとする（2026-08-21） */
  var admin = ddi('edit', '編集', false, '', 'ktn-ddi--admin') +
    ddi('user', 'なりすましログイン', false, '', 'ktn-ddi--admin') + ddSep() +
    ddi('trash', '強制退会', true, '', 'ktn-ddi--admin');
  return p5SettingsMenuItems() + ddSep() + ddLabel('管理者専用') + admin;
}

/* P2＝展覧会の「LIAISON 展示設定・作品管理」ルーティング。p2-11（編集フォーム）の選択中ラジオ→
   p2（トップ）のバッジ状態→どちらも無ければ liaison 扱いの順にフォールバックして振り分ける。
   リエゾンは全展覧会のデフォルト（「利用しない」状態は存在しない・2026-08-26確定）。 */
function p2GotoWorks() {
  var radio = document.querySelector('input[name="p211liaison"]:checked');
  var badge = document.getElementById('p2LiaisonBadge');
  var state = 'liaison';
  if (radio) {
    state = radio.value; // 'liaison' | 'plus'
  } else if (badge) {
    state = badge.classList.contains('li-plus') ? 'plus' : 'liaison';
  }
  location.href = state === 'plus' ? './kotennavi-p2-12-1.html' : './kotennavi-p2-12.html';
}
window.p2GotoWorks = p2GotoWorks;

/* 展覧会の会期・確認状態（デモ用グローバル状態）。setPeriod()/setLiaison()（p2.html）・
   setConfirmed()/toggleLiaisonMode()（p2-11.html）が直接プロパティを書き換えてから ktnRender() を呼ぶ。 */
KTN.exh = { phase: 'during', confirmed: true, publishArrived: true, liaison: 'plus', salesOver: false, articles: 'yes', works: 'yes', draft: false, exhibited: true };
function ktnExhState() {
  var e = KTN.exh || {};
  var num;
  if (e.phase === 'after') num = 3;
  else if (e.phase === 'before' && !e.confirmed) num = 1;
  else num = 2;
  return { num: num, phase: e.phase, confirmed: e.confirmed, publishArrived: e.publishArrived, liaison: e.liaison, salesOver: e.salesOver, articles: e.articles, works: e.works, draft: e.draft };
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

/* creator/gallery本人のLIAISON+申込状態（デモ用グローバル状態・P3/P4共通）。
   本人確認・口座登録を伴うアカウント単位の申込（p11-4）で、展覧会単位のリエゾン設定（KTN.exh.liaison）とは別軸。
   デモバーの「リエゾン+：申請済／未申請」ボタンが ktnSetLP() を呼ぶ。 */
KTN.lp = { applied: true };
function ktnLPApplied() {
  return !!(KTN.lp && KTN.lp.applied);
}
function ktnSetLP(val, btn) {
  KTN.lp.applied = (val === 'true');
  if (btn) {
    document.querySelectorAll('.dbtn-lp').forEach(function (b) {
      b.classList.toggle('on', b === btn);
    });
  }
  if (typeof ktnRender === 'function') ktnRender();
}
window.ktnLPApplied = ktnLPApplied;
window.ktnSetLP = ktnSetLP;

/* 取引の要アクション件数（デモ用グローバル状態）。ロール（creator/gallery/user＝出品者2種＋購入者）×
   サービスID（現状は 'lp'＝LIAISON+ のみ）で保持する。1アカウントがcreator/gallery（出品者）と
   user（購入者）を同時に持ちうるため、出品者側のmy-turn件数と購入者側のmy-turn件数は別枠で数える。
   サービスIDをキーにしているのは、将来LIAISON+以外の類似サービスが増えた場合に内訳を追加できるようにするため
   （ロールアイコンのバッジは合算件数のみを表示し、サービス別の内訳は各サービスのコンソールへの
   メニュー項目側で出す想定＝アイコン側の見た目ルールを変えずに拡張できる）。 */
KTN.txnAlerts = { creator: { lp: 0 }, gallery: { lp: 0 }, user: { lp: 0 } };
/* 購入管理（p5-14）への導線用デモ状態（要対応件数=0でも過去に1回以上購入していればメニューに出す）。
   txnAlertsは「今すぐ対応が必要な件数」で0になり得るため、これとは独立に「購入歴の有無」を持つ
   （0件でも導線自体は消えないようにする＝p5-14へのルートが失われるバグの再発防止）。 */
KTN.hasPurchaseHistory = true;
function ktnSetPurchaseHistory(val, btn) {
  KTN.hasPurchaseHistory = val;
  if (btn) {
    document.querySelectorAll('[data-purchase-history-btn]').forEach(function (b) {
      b.classList.toggle('on', b === btn);
    });
  }
  if (typeof renderAll === 'function') renderAll();
}
window.ktnSetPurchaseHistory = ktnSetPurchaseHistory;
/* 要対応の取引プルダウンに出す実データ相当のサンプル一覧（デモ用固定データ）。
   件数バッジ（KTN.txnAlerts）は数値のみでテストボタンから自由に変更できるが、
   一覧の中身は各コンソール（p3-15/p4-15/p5-14）に実在するデモ取引と一致させ、
   ボタン→プルダウン→コンソールで内容が食い違わないようにしている。 */
KTN.txnAlertItems = {
  creator: {
    lp: [
      { work: '音の輪郭 No.7', counterpart: '山田 花子さん', status: '購入を確定してください', deadline: '2026.03.08', href: './kotennavi-p3-16.html' },
      { work: '夜の静寂', counterpart: '小林 誠さん', status: '作品を発送してください', deadline: '2026.03.07', href: './kotennavi-p3-16.html' },
      { work: '流れる時間', counterpart: '高橋 麻衣さん', status: '取引完了を確認してください', deadline: '2026.03.06', href: './kotennavi-p3-16.html' },
      { work: '風の記憶', counterpart: '田中 次郎さん', status: '購入を確定してください', deadline: '2026.03.10', href: './kotennavi-p3-16.html' },
      { work: '線の重なり', counterpart: '中村 彩さん', status: '購入を確定してください', deadline: '2026.03.31', href: './kotennavi-p3-16.html' }
    ]
  },
  gallery: {
    lp: [
      { work: '静かな水面', counterpart: '加藤 真紀さん', status: '取引完了を確認してください', deadline: '2026.03.10', href: './kotennavi-p4-16.html' },
      { work: '光の堆積 No.2', counterpart: '伊藤 大輔さん', status: '購入を確定してください', deadline: '2026.03.18', href: './kotennavi-p4-16.html' },
      { work: '燃える地平', counterpart: '渡辺 さくらさん', status: '作品を発送してください', deadline: '2026.03.22', href: './kotennavi-p4-16.html' },
      { work: '影と光 No.5', counterpart: '林 浩二さん', status: '購入を確定してください', deadline: '2026.04.26', href: './kotennavi-p4-16.html' }
    ]
  },
  user: {
    lp: [
      { work: '音の輪郭 No.7', counterpart: '田中 透（出品者）', status: 'お支払いにお進みください', deadline: '2026.03.02', href: './kotennavi-p5-15.html' },
      { work: '声なき波紋', counterpart: '鈴木 一郎（出品者）', status: '受取を確認してください', deadline: '2026.03.20', href: './kotennavi-p5-15.html' }
    ]
  }
};
function ktnTxnAlertCount(role) {
  var m = KTN.txnAlerts && KTN.txnAlerts[role];
  if (!m) return 0;
  var sum = 0;
  for (var k in m) if (Object.prototype.hasOwnProperty.call(m, k)) sum += (m[k] || 0);
  return sum;
}
function ktnSetTxnAlert(role, service, val, btn) {
  if (!KTN.txnAlerts[role]) KTN.txnAlerts[role] = {};
  KTN.txnAlerts[role][service] = val;
  if (btn) {
    document.querySelectorAll('[data-txn-alert-role="' + role + '"]').forEach(function (b) {
      b.classList.toggle('on', b === btn);
    });
  }
  /* サイドバー/ボトムナビのバッジだけでなく、ヘッダーの要対応ボタン（txnAlertActionBtn＝getActions()経由）
     も同じ件数を参照するため、ヘッダーを含む renderAll() で一括更新する。 */
  if (typeof renderAll === 'function') renderAll();
}
window.ktnTxnAlertCount = ktnTxnAlertCount;
window.ktnSetTxnAlert = ktnSetTxnAlert;

/* LIAISON+コンソール／取引ワークスペースへの要対応ナビ（getActions() のオーナーメニュー隣に設置）。
   ロールアイコンのバッジ（気づく・全サービス合算）→ 自分のページ →本ボタン（見つける）→ コンソールで
   個別取引へ（辿り着く）の導線。リンク先は特定サービスの一覧ページ（例：LIAISON+コンソール
   p3-15/p4-15＝全展覧会横断の取引一覧。各行から個別展覧会の取引デスク p3-16/p4-16 へ進む）なので、
   件数もアイコンの合算ではなくサービス単体の件数を出す
   （将来サービスが増えた場合に備え、内訳はここで出す＝アイコン側は変えずに済む）。 */
/* モバイル縮退時（.ktn-hdr-alert-btn__icon）に出す各サービスのロゴマーク。
   kotennavi_liaison_logo.html の「+」ロゴバッジ（ゴールド円＋Bodoni Modaの+）をそのまま縮小流用。
   ロゴが未定義のサービスは汎用ドット（CSS ::before）にフォールバックする。 */
var TXN_ALERT_SERVICE_ICON = {
  lp: '<svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#b87c10"/><text x="16" y="17" font-family="\'Bodoni Moda\',serif" font-size="22" font-weight="900" fill="#fff8e8" text-anchor="middle" dominant-baseline="central">+</text></svg>'
};
/* curPage/targetPage は任意（省略時は自己参照チェックをしない）。指定時は自分自身が
   リンク先ページ（＝集約コンソール p3-15/p4-15/p5-14）に既にいる場合ボタンごと非表示にする
   （ddiP/ddiCurrent と同じ「今いるページへの無意味なリンク防止」思想。ただしオーナーメニューの
   ddiCurrent と違い横に並ぶ独立ボタンなので、非活性表示ではなく非表示にする）。
   moreLabel はプルダウン下部の集約コンソールへのリンク文言（省略時「全て見る」）。
   クリックで直接コンソールへ飛ぶのではなく dd() と同じ仕組みのプルダウンにし、
   「要対応の取引」の中身（作品名・相手・状態・期限）をその場で見せた上で、
   個別取引デスクへの直リンクと、集約コンソールへの導線（moreLabel）を両方残す
   （p3-15等へ移動後に要対応対象を探す手間をなくすユーザー提案・2026-08-17）。 */
function txnAlertActionBtn(role, service, label, deskUrl, curPage, targetPage, moreLabel) {
  /* creator/gallery（出品者）はLIAISON+未申請なら取引自体が存在し得ないため、
     デモの件数（KTN.txnAlerts）がたまたま0でなくても要対応ボタンごと出さない
     （申込状態と件数は別々のデモボタンで独立操作できるため、表示側で矛盾を防ぐ）。
     購入者側（role==='user'）はLIAISON+申込の対象外なのでこの判定を適用しない。 */
  if (service === 'lp' && (role === 'creator' || role === 'gallery') && !ktnLPApplied()) return '';
  var m = KTN.txnAlerts && KTN.txnAlerts[role];
  var cnt = (m && m[service]) || 0;
  if (!cnt) return '';
  if (curPage && targetPage && curPage === targetPage) return '';
  var badgeTxt = cnt > 99 ? '99+' : cnt;
  var icon = TXN_ALERT_SERVICE_ICON[service] || '';
  var iconCls = icon ? 'ktn-hdr-alert-btn__icon' : 'ktn-hdr-alert-btn__icon ktn-hdr-alert-btn__icon--dot';
  var id = 'ddTxn' + (++ddSeq);
  var items = (KTN.txnAlertItems && KTN.txnAlertItems[role] && KTN.txnAlertItems[role][service]) || [];
  var shown = items.slice(0, Math.min(cnt, 5));
  var rest = cnt - shown.length;
  var itemsHtml = shown.map(function (it) {
    return `<a class="ktn-txn-ddi" href="${it.href}" onclick="closeAllPanels()">` +
      `<span class="ktn-txn-ddi__work">${it.work}</span>` +
      `<span class="ktn-txn-ddi__cp">${it.counterpart}</span>` +
      `<span class="ktn-txn-ddi__status">${it.status}　${it.deadline}</span>` +
      `</a>`;
  }).join('');
  if (!itemsHtml) itemsHtml = `<p class="ktn-txn-ddi__empty">対応が必要な取引が${cnt}件あります。</p>`;
  var restHtml = rest > 0 ? `<p class="ktn-txn-ddi__rest">ほか${rest}件</p>` : '';
  var moreTxt = moreLabel || '全て見る';
  return `<div class="ktn-ddw ktn-hdr-alert-ddw">` +
    `<button type="button" class="ktn-action-btn ktn-action-btn--alert ktn-hdr-alert-btn" onclick="toggleDD('${id}',this)">` +
    `<span class="ktn-hdr-alert-btn__label">${label} ${cnt}件 →</span>` +
    `<span class="${iconCls}">${icon}</span>` +
    `<span class="ktn-hdr-alert-btn__badge">${badgeTxt}</span>` +
    `</button>` +
    `<div class="ktn-ddmenu ktn-ddmenu--txn" id="${id}">` +
    `<p class="ktn-ddmenu--txn__head">要対応の取引</p>` +
    itemsHtml + restHtml +
    `<a class="ktn-ddmenu--txn__more" href="${deskUrl}">${moreTxt} →</a>` +
    `</div>` +
    `</div>`;
}

/* LIAISON+コンソール（p3-15/p4-15）Tab1「期間中展覧会」の要対応フィルタ。
   p3-15/p4-15 は取引セクションのクラス名が共通（.p315-*）なので、ページ固有JSを持たず
   el.closest('.p315-tab-panel') でスコープする1関数を両ページで共有する
   （出品者本人の要対応取引＝.p315-witem--yours のみ表示し、対応不要のwaiting行・
   展覧会ブロックを畳む。取引プルダウン→p3-15遷移後に要対応対象を探す手間を減らす導線の一部）。
   2026-08-17：操作子を .ktn-switch トグルから素のチェックボックス（p5-1/p5-2 の
   .p5-filter-checkin-label と同じネイティブ input）へ変更したため、change イベントの
   checkbox 要素（el）を受け取り el.checked を見るだけの実装に簡略化 */
function p315ToggleUrgentFilter(el) {
  var on = el.checked;
  var panel = el.closest('.p315-tab-panel');
  if (!panel) return;
  panel.classList.toggle('p315-filter-urgent', on);
  var empty = panel.querySelector('.p315-urgent-filter__empty');
  if (empty) empty.hidden = !(on && !panel.querySelector('.p315-witem--yours'));
}
window.p315ToggleUrgentFilter = p315ToggleUrgentFilter;

/* 要対応バーの動的件数表示（p3-15/p4-15共通。.p315-ws-badge--alert の合計と一致する
   .p315-txn-row--active の件数を数えて .p315-urgent-filter__count に反映。
   0件のページ/タブでは案内自体が無意味なためバーごと hidden にする） */
function p315SyncUrgentCount() {
  document.querySelectorAll('.p315-urgent-filter').forEach(function (bar) {
    var panel = bar.closest('.p315-tab-panel');
    var cnt = panel ? panel.querySelectorAll('.p315-txn-row--active').length : 0;
    var countEl = bar.querySelector('.p315-urgent-filter__count');
    if (countEl) countEl.textContent = String(cnt);
    bar.hidden = cnt === 0;
  });
}
window.p315SyncUrgentCount = p315SyncUrgentCount;

/* P2（展覧会）編集可否（ヘッダーのクイック「編集」ボタン・p2OwnerMenuItems()両方で共用）。
   確認済かつ会期終了後のみ編集不可。それ以外（確認前は会期段階問わず／確認済かつ会期終了前）は編集可。 */
function p2CanEdit() {
  var st = ktnExhState();
  return !(st.confirmed && st.phase === 'after');
}

/* P2（展覧会）オーナーメニュー（単一ソース・p2/p2-1〜p2-6/p2-11/p2-12/p2-12-1/p2-13/p2-14 共通）。
   分岐の主軸は confirmed（管理者確認済かどうか）のみ。publishArrived（公開日到達済かどうか）は
   表示条件に使わない（2026-08-26確定・旧仕様は「確認済かつ公開日到達済の場合のみ」リエゾン/インサイトを
   追加表示していたが、公開日条件は誤りとして撤回。管理者確認が下りた時点で自動的に項目が出る）：
   - 確認前：会期状態に関わらず編集・記事管理・削除のみ（リエゾン/インサイト/QR/フライヤーは非表示）
   - 確認済かつ会期終了後：編集ボタンなし。記事管理＋インサイトのみ（リエゾン/リエゾン+作品管理・QR・フライヤーは
     販売期間内かどうかに関わらず非表示＝展覧会単位の運用行為は会期終了で締め切る）
   - 確認済かつ会期終了前（会期前・会期中とも）：編集・リエゾン/リエゾン+・記事管理・QR・フライヤー・インサイトを
     すべて表示 */
function p2OwnerMenuItems(curPage) {
  /* 並び順（確定）：展覧会編集・リエゾン/リエゾン+・記事・会場チェックインQR・フライヤー・インサイト・削除。
     各項目の表示条件は confirmed（管理者確認済）と phase（会期状態）のみで決まる（publishArrived は不使用）。
     リエゾン+作品管理のみ、会期終了前でも salesOver（LIAISON+販売期間終了済）なら追加で非表示にする
     （販売期間終了後は出品作品を増やしても販売できないため・2026-08-27確定）。
     curPage＝現在開いている管理サブページID（p2-11等）。省略時（トップ/公開サブページからの呼び出し）は
     どの項目とも一致しないため通常のリンクのまま（自己参照判定は無効）。 */
  var st = ktnExhState();
  var edit = ddiP(curPage, 'p2-11', 'edit', '展覧会編集', "location.href='./kotennavi-p2-11.html'");
  /* リエゾンは全展覧会のデフォルト（「利用しない」状態は存在しない・2026-08-26確定）のため無条件に生成 */
  var liaisonLabel = st.liaison === 'plus' ? 'リエゾン+ 展示設定・作品管理' : 'リエゾン 展示設定・作品管理';
  var liaisonTarget = st.liaison === 'plus' ? 'p2-121' : 'p2-12';
  var liaisonItem = ddiP(curPage, liaisonTarget, 'grid', liaisonLabel, 'p2GotoWorks()');
  var articles = ddiP(curPage, 'p2-13', 'file', '記事管理', "location.href='./kotennavi-p2-13.html'");
  var qr = ddi('qr', '会場チェックイン用QRコードを表示', false, "ktnListQr('venue')");
  var flyer = ddi('print', '会場フライヤーを作成', false, 'ktnVenueFlyer()');
  var insight = ddiP(curPage, 'p2-14', 'chart', 'インサイト', "location.href='./kotennavi-p2-14.html'");
  var del = ddi('trash', '削除', true);

  if (!st.confirmed) {
    return [edit, articles, del].join(ddSep());
  }

  if (st.phase === 'after') {
    /* 会期終了後はリエゾン/リエゾン+作品管理・QR・フライヤーを一律非表示（販売期間内かどうかは問わない）。
       販売継続中の取引対応はP3-15/P3-16等の作家側コンソールが担うため、展覧会単位のP2-12(1)は締め切ってよい。 */
    return [articles, insight].join(ddSep());
  }

  /* 会期終了前でも、リエゾン+の販売期間が終了済みなら作品管理項目のみ非表示（LIAISON無料枠は影響なし） */
  var showLiaisonItem = !(st.liaison === 'plus' && st.salesOver);
  var mid = [edit];
  if (showLiaisonItem) mid.push(liaisonItem);
  mid.push(articles, qr, flyer, insight);
  return mid.join(ddSep());
}

/* P2 管理者メニュー（オーナーメニューの全項目を含むスーパーセット＋管理者専用項目）。
   オーナーメニューが状態次第で非表示にしている項目（確認前/公開前で消えるインサイト、確認済で消える削除）を
   管理者は常時利用できるよう補完し、さらにクローンを追加する。補完項目は ktn-ddi--admin
   （管理者色の左アクセント）＋「管理者専用」ラベルでオーナーメニュー由来の項目と区別する（2026-08-19）。
   「削除」は ktn-ddi--admin を付けない＝オーナーメニュー由来の項目と同じ見た目（p6の削除と同様）のため、
   「管理者専用」ラベルより前＝オーナーメニュー項目の直後に置く（未確認時に items 自体が末尾に削除を
   含む場合と同じ位置になるよう統一。確認済で items に削除が無い場合のみ、ここで補って同じ位置に出す。
   2026-08-21・ユーザー指摘「p2/p3/p4/p5系では削除が最下行にある、オーナーメニューの位置に合わせて」対応）。 */
function p2AdminMenuItems(curPage) {
  var st = ktnExhState();
  var items = p2OwnerMenuItems(curPage);
  /* p2OwnerMenuItems() は confirmed のみでインサイトを出す（publishArrived は不使用・2026-08-26） */
  var hasInsight = st.confirmed;
  var admin = [];
  if (!hasInsight) admin.push(ddiP(curPage, 'p2-14', 'chart', 'インサイト', "location.href='./kotennavi-p2-14.html'", 'ktn-ddi--admin'));
  admin.push(ddi('clone', 'クローン', false, '', 'ktn-ddi--admin'));
  admin.push(ddi('send', 'SNSテキスト生成', false, 'ktnP2SnsText()', 'ktn-ddi--admin'));
  admin.push(ddi('print', '校正データの表示(印刷)', false, 'ktnP2ProofPrint()', 'ktn-ddi--admin'));
  var hasDel = !st.confirmed;
  var delPrefix = !hasDel ? ddSep() + ddi('trash', '削除', true) : '';
  return items + delPrefix + ddSep() + ddLabel('管理者専用') + admin.join('');
}

/* P3（クリエイター）オーナーメニュー（単一ソース・トップ〜全管理サブページ共通）。
   curPage＝現在開いている管理サブページID。省略時（トップ/公開サブページ）は自己参照判定が無効。
   LIAISON+未申請時（ktnLPApplied()===false）はコンソール/取引デスク/販売代金管理をまとめて隠し、
   「LIAISON+に申し込む」（p11-4）1項目に差し替える（未申請なら取引・入金も存在し得ないため）。 */
function p3OwnerMenuItems(curPage) {
  /* リエゾン+関連の3項目（申請済）／申込1項目（未申請）は他の項目と同じ ddi/ddiP だが、
     extraCls 'ktn-ddi--lp' でLIAISONブランドのゴールド識別（アイコン色・左アクセント）を付与し、
     申請済/未申請どちらの状態でも同じ見た目でひと目でLIAISON+関連とわかるようにする（2026-08-17）。 */
  var lpBlock = ktnLPApplied()
    ? ddiP(curPage, 'p3-15', 'shop', 'LIAISON+コンソール', "location.href='./kotennavi-p3-15.html'", 'ktn-ddi--lp') +
      ddiP(curPage, 'p3-16', 'desk', '取引デスク', "location.href='./kotennavi-p3-16.html'", 'ktn-ddi--lp') +
      ddiP(curPage, 'p3-17', 'sales', '販売代金管理', "location.href='./kotennavi-p3-17.html'", 'ktn-ddi--lp')
    : ddi('shop', 'LIAISON+に申し込む', false, "location.href='./kotennavi-p11-4.html'", 'ktn-ddi--lp');
  return ddiP(curPage, 'p3-11', 'edit', 'プロフィール編集', "location.href='./kotennavi-p3-11.html'") + ddSep() +
    ddiP(curPage, 'p3-18', 'grid', '展覧会を管理', "location.href='./kotennavi-p3-18.html'") +
    ddiP(curPage, 'p3-14', 'frame', 'ポートフォリオ管理', "location.href='./kotennavi-p3-14.html'") +
    ddiP(curPage, 'p3-19', 'file', '記事管理', "location.href='./kotennavi-p3-19.html'") + ddSep() +
    lpBlock + ddSep() +
    ddiP(curPage, 'p3-13', 'watch', 'オーディエンス管理', "location.href='./kotennavi-p3-13.html'") +
    ddiP(curPage, 'p3-12', 'chart', 'インサイト', "location.href='./kotennavi-p3-12.html'") + ddSep() +
    ddi('share', '共有する（SNS・名刺に）', false, "ktnListQr('creator')") +
    ddi('badge', '個展なびバッジを設置する', false, "window.open('./kotennavi-p60-6.html#badge','_blank')") + ddSep() +
    ddi('user', 'myページへ', false, "location.href='./kotennavi-p5.html'");
}

/* P4（ギャラリー）オーナーメニュー（単一ソース・p3と対称・インベントリー管理のみラベル差） */
function p4OwnerMenuItems(curPage) {
  /* p3と同一の見た目ルール（extraCls 'ktn-ddi--lp'）。詳細は p3OwnerMenuItems 側のコメント参照。 */
  var lpBlock = ktnLPApplied()
    ? ddiP(curPage, 'p4-15', 'shop', 'LIAISON+コンソール', "location.href='./kotennavi-p4-15.html'", 'ktn-ddi--lp') +
      ddiP(curPage, 'p4-16', 'desk', '取引デスク', "location.href='./kotennavi-p4-16.html'", 'ktn-ddi--lp') +
      ddiP(curPage, 'p4-17', 'sales', '販売代金管理', "location.href='./kotennavi-p4-17.html'", 'ktn-ddi--lp')
    : ddi('shop', 'LIAISON+に申し込む', false, "location.href='./kotennavi-p11-4.html'", 'ktn-ddi--lp');
  return ddiP(curPage, 'p4-11', 'edit', 'ギャラリー情報編集', "location.href='./kotennavi-p4-11.html'") + ddSep() +
    ddiP(curPage, 'p4-18', 'grid', '展覧会を管理', "location.href='./kotennavi-p4-18.html'") +
    ddiP(curPage, 'p4-14', 'frame', 'インベントリー管理', "location.href='./kotennavi-p4-14.html'") +
    ddiP(curPage, 'p4-19', 'file', '記事管理', "location.href='./kotennavi-p4-19.html'") + ddSep() +
    lpBlock + ddSep() +
    ddiP(curPage, 'p4-13', 'watch', 'オーディエンス管理', "location.href='./kotennavi-p4-13.html'") +
    ddiP(curPage, 'p4-12', 'chart', 'インサイト', "location.href='./kotennavi-p4-12.html'") + ddSep() +
    ddi('share', '共有する（SNS・名刺に）', false, "ktnListQr('gallery')") +
    ddi('badge', '個展なびバッジを設置する', false, "window.open('./kotennavi-p60-7.html#badge','_blank')") + ddSep() +
    ddi('user', 'myページへ', false, "location.href='./kotennavi-p5.html'");
}

/* P3 管理者メニュー（オーナーメニューの全項目を含むスーパーセット＋管理者専用項目・P2と同一設計・2026-08-19）。
   オーナーメニューは「利用者に今見えているメニュー」を管理者が把握するための表示、実際の操作は
   管理者専用ブロック（ktn-ddi--admin＝左アクセント＋「管理者専用」ラベル）から行う動線を維持する。
   統計はインサイト（オーナーメニュー内に既存）と重複するため置かない。強制退会はクリエイター/ギャラリーが
   必ず持つユーザーロール側（P5）でのみ行うためここには置かない。
   「削除」は ktn-ddi--admin を付けず、p6の削除と同じ見た目（オーナーメニュー由来の項目扱い）で
   オーナーメニュー項目の直後＝「管理者専用」ラベルより前に置く（2026-08-21・ユーザー指摘対応。
   詳細は p2AdminMenuItems 側のコメント参照）。 */
function p3AdminMenuItems(curPage) {
  var admin = ddi('sales', '精算', false, "location.href='./kotennavi-p90-14.html'", 'ktn-ddi--admin') +
    ddi('user', 'なりすましログイン', false, '', 'ktn-ddi--admin') +
    ddi('clone', 'クローン', false, '', 'ktn-ddi--admin');
  return p3OwnerMenuItems(curPage) + ddSep() + ddi('trash', '削除', true) + ddSep() + ddLabel('管理者専用') + admin;
}

/* P4 管理者メニュー（p3と対称・設計理由は p3AdminMenuItems 側のコメント参照） */
function p4AdminMenuItems(curPage) {
  var admin = ddi('sales', '精算', false, "location.href='./kotennavi-p90-14.html'", 'ktn-ddi--admin') +
    ddi('user', 'なりすましログイン', false, '', 'ktn-ddi--admin') +
    ddi('clone', 'クローン', false, '', 'ktn-ddi--admin');
  return p4OwnerMenuItems(curPage) + ddSep() + ddi('trash', '削除', true) + ddSep() + ddLabel('管理者専用') + admin;
}

/* P6（作品）オーナーメニュー（単一ソース）。curPage＝現在開いている管理サブページID（p6-11等）。
   p6-11/p6-12/p6-15はcreator/gallery共有ページ（JSでバー色のみ切替）のため、本関数もロール分岐を持たない
   ＝p6-1/p6-2のオーナーがgalleryでも同じ項目・同じ遷移先で成立する（2026-08-21）。
   LIAISON+作品（p6-2）のみ「削除」を置かない：取引中の作品削除はハレーションが大きいため、
   LIAISON+作品の削除はp3-15/p4-15（リエゾン+コンソール/取引デスク）側の操作に限定する。 */
function p6OwnerItems(curPage, role) {
  var edit = ddiP(curPage, 'p6-11', 'edit', '作品編集', "location.href='./kotennavi-p6-11.html'");
  var insight = ddiP(curPage, 'p6-12', 'chart', 'インサイト', "location.href='./kotennavi-p6-12.html'");
  var articles = ddiP(curPage, 'p6-15', 'file', '記事管理', "location.href='./kotennavi-p6-15.html'");
  /* 問合せへの回答（p6-14）は作家本人のみ（sitemap: creator=R/W, gallery=blank）。
     管理者はp6AdminItems経由でrole='admin'を渡し常に表示する（2026-08-24）。 */
  var inquiries = (role === 'creator' || role === 'admin') ? ddSep() + ddiP(curPage, 'p6-14', 'send', '問合せへの回答', "location.href='./kotennavi-p6-14.html'") : '';
  if (curPage === 'p6-2') return edit + ddSep() + insight + ddSep() + articles + inquiries;
  return edit + ddSep() + insight + ddSep() + articles + inquiries + ddSep() + ddi('trash', '削除', true);
}

/* P7（記事）オーナーメニュー（単一ソース） */
function p7OwnerItems() {
  return ddi('edit', '編集') + ddSep() + ddi('trash', '削除', true);
}

/* P6 管理者メニュー（オーナーメニューの全項目を含むスーパーセット＋管理者専用項目・P2/P3/P4と同一設計）。
   p6-2はオーナーメニューの時点で「削除」を含まない（取引ハレーション防止のため通常のオーナー操作からは
   隠す）が、管理者は例外的に「強制削除」を持つ（2026-08-21・ユーザー指示「p6-2で管理者は強制削除あり
   です」）。通常の「削除」と区別するため専用ラベル＋ktn-ddi--adminアクセントで管理者専用ブロックに置く。 */
function p6AdminItems(curPage) {
  var admin = ddi('clone', 'クローン', false, '', 'ktn-ddi--admin');
  if (curPage === 'p6-2') admin += ddSep() + ddi('trash', '強制削除', true, '', 'ktn-ddi--admin');
  return p6OwnerItems(curPage, 'admin') + ddSep() + ddLabel('管理者専用') + admin;
}

/* P7 記事・管理者専用メニュー（記事はクローン不可のためP6と分離） */
function p7AdminItems() {
  return ddi('trash', '削除', true);
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
    /* ガイドボタンのリンク先：p60-6（クリエイター編）/ p60-7（ギャラリー編）FAQの該当チャプターへ。
       p2-11=展覧会の登録・編集チャプター、p2-13=記事の登録・編集チャプター、p2-14=インサイトチャプター
       （p3-12/p4-12のガイドリンクと同じ#insightを参照）。p2-12/p2-121（LIAISON作品管理）は
       まだ該当チャプターが無いため装飾のまま。 */
    const guideFile = role === 'gallery' ? './kotennavi-p60-7.html' : './kotennavi-p60-6.html';
    const guideAnchor = page === 'p2-11' ? '#exhibition-edit' : page === 'p2-13' ? '#article-edit' : page === 'p2-14' ? '#insight' : '';
    const guideBtn = owbtn('info', 'ガイド', guideAnchor ? `window.open('${guideFile}${guideAnchor}','_blank')` : '');
    if (role === 'creator' || role === 'gallery')
      return guideBtn + dd('オーナーメニュー', p2OwnerMenuItems(page));
    if (role === 'admin')
      return guideBtn + dd('オーナーメニュー', p2OwnerMenuItems(page)) + dd('管理者', p2AdminMenuItems(page));
    return '';
  }

  /* ── P3 クリエイタートップ＋公開サブページ（p3-1〜p3-3） ── */
  if (['p3', 'p3-1', 'p3-2', 'p3-3'].includes(page)) {
    const cmn = hib('watch', 'ウォッチ', page === 'p3' ? 'ktnP3WatchHib' : '', 'watch') + shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + ddMore(reportItem(page));
    if (role === 'creator')
      return cmn + txnAlertActionBtn('creator', 'lp', 'LIAISON+要対応', './kotennavi-p3-15.html', page, 'p3-15', 'リエゾン+コンソールで全て見る') + dd('オーナーメニュー', p3OwnerMenuItems());
    if (role === 'admin')
      return cmn + dd('オーナーメニュー', p3OwnerMenuItems()) + dd('管理者', p3AdminMenuItems());
    return cmn;
  }

  /* ── P3 管理サブページ群（プロフィール編集／各種管理ページ・共通オーナーメニュー） ── */
  if (['p3-11', 'p3-12', 'p3-13', 'p3-14', 'p3-15', 'p3-16', 'p3-17', 'p3-18', 'p3-19'].includes(page)) {
    /* ガイドリンク：各ページの操作対象に対応するFAQ/ガイド章へ直接結線（2026-08-19 全ページ結線完了）。
       p3-11〜14はp60-6（よくある質問-クリエイター編）の新設章、p3-15〜17はp70-12（LIAISON+取引ガイド出品者編）の
       新設章、p3-18〜19は既存のp60-6章へリンク。 */
    const P3_GUIDE = {
      'p3-11': './kotennavi-p60-6.html#profile-edit',
      'p3-12': './kotennavi-p60-6.html#insight',
      'p3-13': './kotennavi-p60-6.html#audience-mgmt',
      'p3-14': './kotennavi-p60-6.html#portfolio-mgmt',
      'p3-15': './kotennavi-p70-12.html#console',
      'p3-16': './kotennavi-p70-12.html#trouble',
      'p3-17': './kotennavi-p70-12.html#settlement',
      'p3-18': './kotennavi-p60-6.html#exhibition-edit',
      'p3-19': './kotennavi-p60-6.html#article-edit',
    };
    const guideUrl = P3_GUIDE[page] || '';
    const guideBtn = owbtn('info', 'ガイド', guideUrl ? `window.open('${guideUrl}','_blank')` : '');
    const alertBtn = txnAlertActionBtn('creator', 'lp', 'LIAISON+要対応', './kotennavi-p3-15.html', page, 'p3-15', 'リエゾン+コンソールで全て見る');
    if (role === 'creator') return guideBtn + alertBtn + dd('オーナーメニュー', p3OwnerMenuItems(page));
    if (role === 'admin') return guideBtn + alertBtn + dd('オーナーメニュー', p3OwnerMenuItems(page)) + dd('管理者', p3AdminMenuItems(page));
    return '';
  }

  /* ── P4 ギャラリートップ＋公開サブページ（p4-1〜p4-2） ── */
  if (['p4', 'p4-1', 'p4-2'].includes(page)) {
    const cmn = hib('watch', 'ウォッチ', '', 'watch') + shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + ddMore(reportItem(page));
    if (role === 'gallery')
      return cmn + txnAlertActionBtn('gallery', 'lp', 'LIAISON+要対応', './kotennavi-p4-15.html', page, 'p4-15', 'リエゾン+コンソールで全て見る') + dd('オーナーメニュー', p4OwnerMenuItems());
    if (role === 'admin')
      return cmn + dd('オーナーメニュー', p4OwnerMenuItems()) + dd('管理者', p4AdminMenuItems());
    return cmn;
  }

  /* ── P4 管理サブページ群（ギャラリー情報編集／各種管理ページ・共通オーナーメニュー） ── */
  if (['p4-11', 'p4-12', 'p4-13', 'p4-14', 'p4-15', 'p4-16', 'p4-17', 'p4-18', 'p4-19'].includes(page)) {
    /* ガイドリンク：各ページの操作対象に対応するFAQ/ガイド章へ直接結線（2026-08-19 全ページ結線完了）。
       p4-11〜14はp60-7（よくある質問-ギャラリー編）の新設章、p4-15〜17はp70-12（LIAISON+取引ガイド出品者編）の
       新設章、p4-18〜19は既存のp60-7章へリンク。 */
    const P4_GUIDE = {
      'p4-11': './kotennavi-p60-7.html#profile-edit',
      'p4-12': './kotennavi-p60-7.html#insight',
      'p4-13': './kotennavi-p60-7.html#audience-mgmt',
      'p4-14': './kotennavi-p60-7.html#inventory-mgmt',
      'p4-15': './kotennavi-p70-12.html#console',
      'p4-16': './kotennavi-p70-12.html#trouble',
      'p4-17': './kotennavi-p70-12.html#settlement',
      'p4-18': './kotennavi-p60-7.html#exhibition-edit',
      'p4-19': './kotennavi-p60-7.html#article-edit',
    };
    const guideUrl = P4_GUIDE[page] || '';
    const guideBtn = owbtn('info', 'ガイド', guideUrl ? `window.open('${guideUrl}','_blank')` : '');
    const alertBtn = txnAlertActionBtn('gallery', 'lp', 'LIAISON+要対応', './kotennavi-p4-15.html', page, 'p4-15', 'リエゾン+コンソールで全て見る');
    if (role === 'gallery') return guideBtn + alertBtn + dd('オーナーメニュー', p4OwnerMenuItems(page));
    if (role === 'admin') return guideBtn + alertBtn + dd('オーナーメニュー', p4OwnerMenuItems(page)) + dd('管理者', p4AdminMenuItems(page));
    return '';
  }

  /* ── P5 myページ＋サブ（p5-1/p5-2含む全サブページ共通「設定」dd・2026-08-14 統合） ── */
  if (['p5', 'p5-1', 'p5-2', 'p5-3', 'p5-4', 'p5-11', 'p5-12', 'p5-13', 'p5-14', 'p5-15', 'p5-16'].includes(page)) {
    if (role === 'guest') return '';
    const cmn = page === 'p5' ? shareBtn() + sep() : '';
    /* ガイドリンク：p5-11〜p5-16（マイページ管理サブページ）のみ、対応するFAQ/ガイド章へ直接結線
       （P3_GUIDE/P4_GUIDE と同一パターン・2026-08-22）。p5/p5-1〜p5-4（マイページ本体・公開サブページ）は
       p3/p4のトップページ同様ガイドボタンを出さない。p5-11〜13はp60-5（よくある質問-ユーザー編）の新設章、
       p5-14〜16は既存p70-11（リエゾン+取引ガイド購入者編）の該当章へリンクする（購入・取引フローは
       既にそちらで一元的に説明済みのため、p60-5側に重複作成しない）。 */
    const P5_GUIDE = {
      'p5-11': './kotennavi-p60-5.html#profile-edit',
      'p5-12': './kotennavi-p60-5.html#password',
      'p5-13': './kotennavi-p60-5.html#notification',
      'p5-14': './kotennavi-p70-11.html#overview',
      'p5-15': './kotennavi-p70-11.html#trouble',
      'p5-16': './kotennavi-p70-11.html#phase-payment',
    };
    const guideUrl = P5_GUIDE[page] || '';
    const guideBtn = guideUrl ? owbtn('info', 'ガイド', `window.open('${guideUrl}','_blank')`) : '';
    /* 購入者側（KTN.txnAlerts.user）の要対応導線。creator/gallery本人もp5では「購入者としての自分」
       なのでロールに関わらずuserキーを参照する（出品者側=creator/galleryキーとは別軸）。
       p3/p4の管理サブページ群と同じく、トップページに限らず全サブページ共通で設置。 */
    const alertBtn = txnAlertActionBtn('user', 'lp', 'LIAISON+要対応', './kotennavi-p5-14.html', page, 'p5-14', '購入管理で全て見る');
    /* 'login'＝p5系デモバーでは「本人ではない、別の一般ログインユーザー」を表す
       （CLAUDE.mdユーザー種別表：'user+'のみが「ページオーナー本人」）。
       他人のmyページを見ている状態なので「設定」（本人の会員設定）ddは出さない。
       自分自身の未対応取引に関する導線（alertBtn）はページ所有と無関係のため維持する。
       ガイドは本人の管理サブページに紐づく導線のため、非オーナー閲覧時は出さない（p3/p4と同様）。 */
    if (role === 'login') return cmn + alertBtn;
    /* 'user+'＝p5系デモバーのページオーナー本人ロール（CLAUDE.mdユーザー種別表）。
       'user+creator'/'user+gallery'と違い正規化ブロックの対象外だったため、
       このブランチ内で直接一致条件に含める（p5専用の既存バグ・過去の横展開で発見・修正）。 */
    if (role === 'user+' || role === 'creator' || role === 'gallery')
      return cmn + guideBtn + alertBtn + dd('設定', p5SettingsMenuItems());
    if (role === 'admin')
      return cmn + guideBtn + alertBtn + dd('設定', p5SettingsMenuItems()) + dd('管理者', p5AdminMenuItems());
    return '';
  }

  /* ── P6 作品 ── */
  if (['p6', 'p6-1', 'p6-2'].includes(page)) {
    const cmn = hib('heart', '興味あり', '', 'interest') + shareBtn() + sep();
    const editBtn = owbtn('edit', '編集', "location.href='./kotennavi-p6-11.html'");
    /* 問合せする（p6-13）はguestは不可・loginのみ（sitemap: guest=blank, login=W）。 */
    if (role === 'guest')
      return cmn + ddMore(reportItem(page));
    if (role === 'login')
      return cmn + ddMore(ddi('send', '問合せする', false, "location.href='./kotennavi-p6-13.html'") + ddSep() + reportItem(page));
    if (role === 'creator' || role === 'gallery')
      return cmn + editBtn + dd('オーナーメニュー', p6OwnerItems(page, role));
    if (role === 'admin')
      return cmn + editBtn + dd('オーナーメニュー', p6OwnerItems(page, 'admin')) + dd('管理者', p6AdminItems(page));
    return cmn;
  }

  /* p6-11〜p6-15＝作品-管理サブページ群。オーナーメニュー/管理者メニューはp6/p6-1/p6-2トップと
     同一内容（p6OwnerItems/p6AdminItems・単一ソース）を表示し、サブページを開いていても他の
     管理ページ（編集・インサイト等）へすぐ移動できるようにする（2026-08-21）。
     ガイドボタンのリンク先：creator/gallery共有ページのためロールでp60-6（クリエイター編）/
     p60-7（ギャラリー編）を出し分ける。p6-11=作品の管理章（p60-6は#portfolio-mgmt、p60-7は
     #inventory-mgmt＝章idがファイルで異なる）、p6-12=インサイト章、p6-15=記事の登録・編集章。
     p6-13/p6-14（問合せ・回答）は該当章が無いため装飾のまま（2026-08-21）。 */
  if (['p6-11', 'p6-12', 'p6-13', 'p6-14', 'p6-15'].includes(page)) {
    const guideFile = role === 'gallery' ? './kotennavi-p60-7.html' : './kotennavi-p60-6.html';
    const P6_GUIDE_ANCHOR = {
      'p6-11': role === 'gallery' ? '#inventory-mgmt' : '#portfolio-mgmt',
      'p6-12': '#insight',
      'p6-15': '#article-edit',
    };
    const guideAnchor = P6_GUIDE_ANCHOR[page] || '';
    const guideBtn = owbtn('info', 'ガイド', guideAnchor ? `window.open('${guideFile}${guideAnchor}','_blank')` : '');
    if (role === 'creator' || role === 'gallery') return guideBtn + dd('オーナーメニュー', p6OwnerItems(page, role));
    if (role === 'admin') return guideBtn + dd('オーナーメニュー', p6OwnerItems(page, 'admin')) + dd('管理者', p6AdminItems(page));
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
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー', p7OwnerItems()) + dd('管理者', p7AdminItems());
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

  /* ── P61 お知らせ ── */
  if (page === 'p61') {
    if (role === 'admin')
      return dd('管理者', ddi('plus', '新規作成', false, "location.href='./kotennavi-p61-11.html'"));
    return '';
  }

  if (page === 'p61-1') {
    const cmn = shareBtn() + sep();
    if (role === 'admin')
      return cmn + dd('管理者', ddi('edit', '編集', false, "location.href='./kotennavi-p61-11.html'") + ddSep() + ddi('trash', '削除', true));
    return cmn;
  }

  if (page === 'p61-11') {
    if (role === 'admin') return dd('管理者', ddi('trash', '削除', true));
    return '';
  }

  /* ── P10 特集 ── */
  if (['p10-4', 'p10-5', 'p10-6', 'p10-7'].includes(page)) {
    if (role === 'admin') return dd('管理者', ddi('edit', '編集') + ddi('plus', '新規特集'));
    return '';
  }

  /* ── P60 ガイド・法的ページ ── */
  if (['p60', 'p60-4', 'p60-8', 'p60-9', 'p60-10'].includes(page)) {
    if (role === 'admin') return dd('管理者', ddi('edit', '編集'));
    return '';
  }

  /* ── P70 LIAISONガイド ── */
  if (['p70-1', 'p70-2', 'p70-3', 'p70-4', 'p70-6', 'p70-8', 'p70-9', 'p70-11', 'p70-12'].includes(page)) {
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
function renderBc(page, bcOverride) {
  const p = PAGES[page];
  const bc = bcOverride || (p && p.bc);
  if (!bc) return '';
  return bc.map((c, i) => {
    const isLast = i === bc.length - 1;
    const isAnc = i === 0 && bc.length > 2; /* モバイルで省略するのはTopのみ。カテゴリ・エンティティ名は残す */
    const badge = c[2] === 'l'
      ? `<span class="ktn-bc__badge ktn-bc__badge--l">LIAISON</span>`
      : c[2] === 'lp'
        ? `<span class="ktn-bc__badge ktn-bc__badge--lp">LIAISON+</span>`
        : '';
    const sep = i > 0 ? `<span class="ktn-bc__sep">›</span>` : '';
    if (isLast || !c[1])
      return `${sep}<span class="ktn-bc__current">${c[0]}${badge}</span>`;
    return `${sep}<a href="${c[1]}" class="ktn-bc__link${isAnc ? ' ktn-bc__link--anc' : ''}">${c[0]}</a>`;
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
    /* p7＝掲載先デモ切替（switchP7Context）中の文脈を、ロール切替等の再描画（renderAll）でも
       保持する。デモバーのロールボタンはp7BreadcrumbForの判定材料ではないため、
       常にP7_CURRENT_CONTEXT（掲載先の選択）側を優先する。 */
    var bcOverride;
    if (page === 'p7' && typeof window.p7BreadcrumbFor === 'function' && window.P7_CONTEXTS) {
      bcOverride = window.p7BreadcrumbFor(window.P7_CONTEXTS[window.P7_CURRENT_CONTEXT || 'artwork']);
    }
    if (bcEl) bcEl.innerHTML = renderBc(page, bcOverride);
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
    renderFooter();
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
    /* 要対応バーの件数表示（p3-15/p4-15限定。該当要素が無いページは no-op） */
    p315SyncUrgentCount();
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
   KTN.insightList — インサイト（p3-12/p4-12等）の
   年別グループ表示＋ページング＋列ソート共通描画
   items は呼び出し側で日付降順ソート・年グループ済みの配列
   （各要素 { href, name, year, stats:['値<span class="unit">単位</span>', …],
     period（任意・展覧会の会期テキスト）,
     linkTarget（任意・記事の投稿元'exhibition'|'artwork'。文字マーク表示用でcb系バッジは使わない。
       クリエイター/ギャラリーページへの直接投稿は値なし＝マーク非表示） }）
   groupByYear=false のとき（ソート適用時）は年見出しを出さずフラットに表示する
══════════════════════════════════ */
KTN.insightList = (function () {
  function render(listEl, pagerEl, items, page, perPage, onGoto, groupByYear) {
    if (!listEl) return page;
    if (groupByYear == null) groupByYear = true;
    var totalPages = Math.max(1, Math.ceil(items.length / perPage));
    if (page > totalPages) page = totalPages;
    listEl.querySelectorAll('.ins-item-list__row,.ins-item-list__year').forEach(function (el) { el.remove(); });
    var pageRows = items.slice((page - 1) * perPage, page * perPage);
    var lastYear = null;
    pageRows.forEach(function (it) {
      if (groupByYear && it.year !== lastYear) {
        var yh = document.createElement('div');
        yh.className = 'ins-item-list__year';
        yh.textContent = it.year + '年';
        listEl.appendChild(yh);
        lastYear = it.year;
      }
      var row = document.createElement('div');
      row.className = 'ins-item-list__row';
      var nameHtml = '<a class="ins-item-list__name" href="' + it.href + '">' + it.name + '</a>';
      var main;
      if (it.linkTarget) {
        var mark = '<span class="ins-item-list__link-mark">' + (it.linkTarget === 'exhibition' ? '展覧会' : '作品') + '</span>';
        main = '<div class="ins-item-list__name-row">' + mark + nameHtml + '</div>';
      } else {
        main = nameHtml;
      }
      if (it.period) {
        main += '<span class="ins-item-list__period">' + it.period + '</span>';
      }
      var html = '<div class="ins-item-list__main">' + main + '</div>';
      it.stats.forEach(function (s) { html += '<span class="ins-item-list__stat">' + s + '</span>'; });
      row.innerHTML = html;
      listEl.appendChild(row);
    });
    if (pagerEl) {
      KTN.pagination.render(pagerEl, {
        page: page,
        totalPages: totalPages,
        onGoto: onGoto,
      });
    }
    return page;
  }
  // stats等のHTML断片（'654'／'34<span class="unit">人</span>'／'1,240'）から数値だけを取り出す（ソート用）
  function numFromHtml(html) {
    var n = parseInt(String(html).replace(/<[^>]+>/g, '').replace(/[^\d]/g, ''), 10);
    return isNaN(n) ? 0 : n;
  }
  // 列見出しの並べ替えボタン（.p315-buyers-sort-btn・data-sort）を一括結線
  function bindSort(headEl, applyFn) {
    if (!headEl) return null;
    var btns = headEl.querySelectorAll('.p315-buyers-sort-btn');
    var curKey = null, curDir = 1;
    function apply(key, dir) {
      curKey = key; curDir = dir;
      btns.forEach(function (b) { b.classList.remove('is-active', 'is-desc'); });
      var m = headEl.querySelector('.p315-buyers-sort-btn[data-sort="' + key + '"]');
      if (m) {
        m.classList.add('is-active');
        if (dir === -1) m.classList.add('is-desc');
      }
      applyFn(key, dir);
    }
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.sort;
        var dir = (curKey === key) ? curDir * -1 : (key === 'name' ? 1 : -1);
        apply(key, dir);
      });
    });
    return { apply: apply };
  }
  return { render: render, numFromHtml: numFromHtml, bindSort: bindSort };
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

/* 来場のきっかけ（チェックイン時必須・共通語彙）。id はオーディエンス側の集計キーとしても使う */
const CHECKIN_REASONS = [
  { id: 'sns',      label: 'SNS（Instagram・Xなど）' },
  { id: 'kotennavi', label: '個展なびで見つけた' },
  { id: 'dm',        label: 'DM・フライヤー' },
  { id: 'referral',  label: '知人の紹介' },
  { id: 'know',      label: '作家・ギャラリーを以前から知っている' },
  { id: 'walkby',    label: '通りがかり' },
  { id: 'other',     label: 'その他' },
];
function ktnCheckinReasonLabel(id) {
  var r = CHECKIN_REASONS.filter(function (r) { return r.id === id; })[0];
  return r ? r.label : '';
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
    '<div class="ktn-modal__form-row" id="ktnCiReasonRow">' +
    '<div class="ktn-modal__label">来場のきっかけ<span class="ktn-req">必須</span></div>' +
    '<select class="ktn-modal__input" id="ktnCiReason" onchange="this.closest(\'.ktn-modal__form-row\').classList.remove(\'is-error\');document.getElementById(\'ktnCiReasonErr\').hidden=true;">' +
    '<option value="">選択してください</option>' +
    CHECKIN_REASONS.map(function (r) { return '<option value="' + r.id + '">' + r.label + '</option>'; }).join('') +
    '</select>' +
    '<div class="ktn-modal__err-msg" id="ktnCiReasonErr" hidden>来場のきっかけを選択してください</div>' +
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
  var reasonSel = document.getElementById('ktnCiReason');
  var reasonRow = document.getElementById('ktnCiReasonRow');
  var reasonErr = document.getElementById('ktnCiReasonErr');
  if (reasonSel && !reasonSel.value) {
    if (reasonRow) reasonRow.classList.add('is-error');
    if (reasonErr) reasonErr.hidden = false;
    reasonSel.focus();
    return;
  }
  if (reasonRow) reasonRow.classList.remove('is-error');
  if (reasonErr) reasonErr.hidden = true;
  showToast('\u6295\u7a3f\u3057\u307e\u3057\u305f\uff01');
  ktnCheckinShowWatchStep();
}

/* \u30c1\u30a7\u30c3\u30af\u30a4\u30f3\u5b8c\u4e86\u5f8c\uff1a\u3053\u306e\u5c55\u89a7\u4f1a\u306e\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\uff0b\u30ae\u30e3\u30e9\u30ea\u30fc\u306e\u30a6\u30a9\u30c3\u30c1\u63d0\u6848\u30b9\u30c6\u30c3\u30d7\u3002
   \u6295\u7a3f\u8005\uff08\u63b2\u8f09\u4e3b\uff09\u3067\u306f\u306a\u304f\u6765\u5834\u8005\u304c\u5b9f\u969b\u306b\u4f53\u9a13\u3057\u305f\u5bfe\u8c61\uff1d\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u3092\u4e3b\u5f79\u306b\u3059\u308b\uff082026-08-24\uff09\u3002
   \u30af\u30ea\u30a8\u30a4\u30bf\u30fc\uff0f\u30ae\u30e3\u30e9\u30ea\u30fc\u306f\u30b0\u30eb\u30fc\u30d7\u5206\u3051\u3057\u3066\u8868\u793a\uff08\u30ae\u30e3\u30e9\u30ea\u30fc\u540d\u304c\u9577\u3044\u5834\u5408\u306e\u6298\u308a\u8fd4\u3057\u30fb\u5207\u308c\u5bfe\u7b56\u30012026-08-24\uff09\u3002 */
function ktnCheckinShowWatchStep() {
  var modal = document.querySelector('#ktnCheckinModal .ktn-auth-modal');
  if (!modal) { closeCheckinModal(); return; }
  var CHECK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var CLOSE_BTN = '<button class="ktn-auth-close" onclick="closeCheckinModal()" aria-label="\u9589\u3058\u308b"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
  var WATCH_SVG = '<svg viewBox="0 0 16 16" fill="none" width="15" height="15"><circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".3"/><circle class="wi-inner" cx="8" cy="8" r="2.6"/></svg>';
  /* \u30c7\u30e2\u7528\uff1a\u51fa\u5c55\u8005\u6570\u306e\u4e0a\u9650\u8868\u793a\uff08100\u4eba\u898f\u6a21\u306e\u5c55\u89a7\u4f1a\u3067\u3082\u7834\u7dbb\u3057\u306a\u3044\u3053\u3068\uff09\u3092\u30d6\u30e9\u30a6\u30b6\u4e0a\u3067\u78ba\u8a8d\u3067\u304d\u308b\u3088\u3046\u3001
     \u5b9f\u30c7\u30fc\u30bf\uff08p2.html\u306e\u7530\u4e2d\u900f\u30fb\u5c71\u7530\u8475\u306e2\u540d\uff09\u3088\u308a\u591a\u30445\u540d\u3067\u691c\u8a3c\u7528\u306b\u6c34\u5897\u3057\u3057\u3066\u3044\u308b\u3002\u540d\u524d\u306e\u307f\u306e\u8efd\u91cf\u884c\u306e\u305f\u3081\u3001
     \u30ab\u30fc\u30c9\u5f62\u5f0f\uff08.cc--h.cc--panel\uff09\u306f\u4f7f\u308f\u306a\u3044\uff1d\u591a\u4eba\u6570\u3067\u3082\u30b9\u30af\u30ed\u30fc\u30eb\u304c\u7834\u7dbb\u3057\u306a\u3044\u69cb\u6210\u3002 */
  var creators = [
    { href: 'kotennavi-p3.html', name: '\u7530\u4e2d \u900f' },
    { href: 'kotennavi-p2-4.html', name: '\u5c71\u7530 \u8475' },
    { href: 'kotennavi-p3.html', name: '\u6751\u4e0a \u73b2\u5b50' },
    { href: 'kotennavi-p3.html', name: '\u4f0a\u85e4 \u6176\u5b50' },
    { href: 'kotennavi-p3.html', name: '\u6a4b\u672c \u660e' }
  ];
  var venues = [
    { href: 'kotennavi-p4.html', name: 'Gallery SOIL \u6e0b\u8c37' }
  ];
  var MAX_CI_WATCH_ITEMS = 3;
  /* \u30ae\u30e3\u30e9\u30ea\u30fc\u540d\u3092\u6587\u306b\u57cb\u3081\u8fbc\u3080\u3068\uff08\u65e7\u300c\u3053\u306e\u4f1a\u5834\uff08...\uff09\u3082\u30a6\u30a9\u30c3\u30c1\u3059\u308b\u300d\u65b9\u5f0f\uff09\u3001
     \u9577\u3044\u540d\u524d\u3067\u672b\u5c3e\u306e\u300c\u3092\u30a6\u30a9\u30c3\u30c1\u3059\u308b\u300d\u304c\u6298\u308a\u8fd4\u3055\u308c\u3066\u5207\u308c\u3066\u898b\u3048\u308b\u5371\u967a\u304c\u3042\u308b\u305f\u3081\u3001
     \u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u3068\u540c\u3058\u300c\u540d\u524d\uff0bwatch\u30dc\u30bf\u30f3\u300d\u306e\u884c\u5f62\u5f0f\u306b\u7d71\u4e00\u3057\u3001\u30b0\u30eb\u30fc\u30d7\u30e9\u30d9\u30eb\uff08\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\uff0f\u30ae\u30e3\u30e9\u30ea\u30fc\uff09\u3067\u5206\u3051\u308b\uff082026-08-24\uff09\u3002 */
  function buildCiWatchGroup(label, items) {
    if (!items.length) return '';
    var visible = items.slice(0, MAX_CI_WATCH_ITEMS);
    var restCount = items.length - visible.length;
    var rows = visible.map(function (c) {
      return '<div class="ktn-ci-watch__row">' +
        '<a class="ktn-ci-watch__name" href="' + c.href + '">' + c.name + '</a>' +
        '<button class="ktn-btn ktn-ci-watch__wbtn" data-off="watch" data-on="watching" data-action="watch" onclick="handleAction(this,\'watch\');event.preventDefault()">' + WATCH_SVG + ' watch<span class="tip">\u30a6\u30a9\u30c3\u30c1\u3059\u308b</span></button>' +
        '</div>';
    }).join('');
    if (restCount > 0) {
      rows += '<a class="ktn-ci-watch__more ktn-guide-link" href="kotennavi-p2-4.html">\u307b\u304b' + restCount + '\u540d \u2192 \u51fa\u5c55\u8005\u4e00\u89a7</a>';
    }
    return '<div class="ktn-ci-watch__group">' +
      '<p class="ktn-ci-watch__group-label">' + label + '</p>' +
      '<div class="ktn-ci-watch__list">' + rows + '</div>' +
      '</div>';
  }

  modal.innerHTML =
    '<div class="ktn-auth-top ktn-auth-top--compact">' +
    CLOSE_BTN +
    '<div class="ktn-auth-icon">' + CHECK_ICON + '</div>' +
    '<div class="ktn-auth-ttl">\u30c1\u30a7\u30c3\u30af\u30a4\u30f3\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f</div>' +
    '</div>' +
    '<div class="ktn-auth-body">' +
    '<p class="ktn-ci-watch__lead">\u3053\u306e\u5c55\u89a7\u4f1a\u306e\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u3084\u30ae\u30e3\u30e9\u30ea\u30fc\u3092\u30a6\u30a9\u30c3\u30c1\u3059\u308b\u3068\u3001\u65b0\u4f5c\u3084\u6b21\u56de\u5c55\u306e\u60c5\u5831\u304c\u5c4a\u304d\u307e\u3059\u3002</p>' +
    buildCiWatchGroup('\u30af\u30ea\u30a8\u30a4\u30bf\u30fc', creators) +
    buildCiWatchGroup('\u30ae\u30e3\u30e9\u30ea\u30fc', venues) +
    '<button class="ktn-auth-btn-primary" onclick="closeCheckinModal()">\u9589\u3058\u308b</button>' +
    '</div>';
}

/* \u2500\u2500 \u30c1\u30a7\u30c3\u30af\u30a4\u30f3\uff06\u30ec\u30d3\u30e5\u30fc \u7de8\u96c6\u30e2\u30fc\u30c0\u30eb\uff08\u5171\u6709\uff1ap5-2\uff0f\u5c06\u6765 p2\u30fbp8-11 \u304c\u518d\u5229\u7528\uff09 \u2500\u2500
   opts: { title, date(yyyy-mm-dd), reason(id), stars(0-5), review, focusReview, onSave({date,reason,stars,review}) } */
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
    '<div class="ktn-modal__form-row" id="ktnCiReasonRow">' +
    '<div class="ktn-modal__label">\u6765\u5834\u306e\u304d\u3063\u304b\u3051<span class="ktn-req">\u5fc5\u9808</span></div>' +
    '<select class="ktn-modal__input" id="ktnCiReason" onchange="this.closest(\'.ktn-modal__form-row\').classList.remove(\'is-error\');document.getElementById(\'ktnCiReasonErr\').hidden=true;">' +
    '<option value="">\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044</option>' +
    CHECKIN_REASONS.map(function (r) { return '<option value="' + r.id + '"' + (r.id === opts.reason ? ' selected' : '') + '>' + r.label + '</option>'; }).join('') +
    '</select>' +
    '<div class="ktn-modal__err-msg" id="ktnCiReasonErr" hidden>\u6765\u5834\u306e\u304d\u3063\u304b\u3051\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044</div>' +
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
    var reasonSel = document.getElementById('ktnCiReason');
    var reasonRow = document.getElementById('ktnCiReasonRow');
    var reasonErr = document.getElementById('ktnCiReasonErr');
    if (reasonSel && !reasonSel.value) {
      if (reasonRow) reasonRow.classList.add('is-error');
      if (reasonErr) reasonErr.hidden = false;
      reasonSel.focus();
      return;
    }
    var d = (document.getElementById('ktnCiDate') || {}).value || '';
    var rs = reasonSel ? reasonSel.value : (opts.reason || '');
    var s = document.querySelectorAll('.ktn-modal__star.on').length;
    var r = ((document.getElementById('ktnReviewText') || {}).value || '').trim();
    if (typeof opts.onSave === 'function') opts.onSave({ date: d, reason: rs, stars: s, review: r });
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
