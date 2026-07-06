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
  watch: `<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
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
  'p60-1': 'p60-1',
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
      <a href="/p60" class="ktn-bottom-nav__item" data-page="p60" onclick="handleNav(event,'p60','/p60')">
        <div class="ktn-bottom-nav__icon">${ICONS.notice}</div>
        <span class="ktn-bottom-nav__label">お知らせ</span>
      </a>
      <a href="/p60-1" class="ktn-bottom-nav__item" data-page="p60-1" onclick="handleNav(event,'p60-1','/p60-1')">
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
      <a href="/p60" class="ktn-bottom-nav__item" data-page="p60" onclick="handleNav(event,'p60','/p60')" style="position:relative">
        <span class="ktn-bottom-nav__dot"></span>
        <div class="ktn-bottom-nav__icon">${ICONS.notice}</div>
        <span class="ktn-bottom-nav__label">お知らせ</span>
      </a>
      <a href="/p60-1" class="ktn-bottom-nav__item" data-page="p60-1" onclick="handleNav(event,'p60-1','/p60-1')">
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
   統合レンダリング
   ページ側で window.ktnRender() を定義するとヘッダーも再描画される
══════════════════════════════════ */
function renderAll() {
  if (typeof window.ktnRender === 'function') window.ktnRender();
  renderSidebar();
  renderBottomNav();
  renderTagbar(window.ktnState.page);
  updateActiveState(window.ktnState.page);
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
  'p2': { n: '展覧会', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', null]] },
  'p2-1': { n: '展覧会-スケジュール', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['スケジュール', null]] },
  'p2-2': { n: '展覧会-開催場所', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['開催場所', null]] },
  'p2-3': { n: '展覧会-記事・案内', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['記事・案内', null]] },
  'p2-4': { n: '展覧会-出展者', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['出展者', null]] },
  'p2-5': { n: '展覧会-リエゾン作品一覧', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['LIAISON作品一覧', null]] },
  'p2-5-1': { n: '展覧会-リエゾンプラス作品一覧', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['LIAISON+ 作品一覧', null]] },
  'p2-11': { n: '展覧会-新規/編集/クローン', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['新規/編集/クローン', null]] },
  'p2-12': { n: 'LIAISON 作品管理', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['LIAISON 作品管理', null]] },
  'p2-13': { n: '展覧会-広告作成', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['広告作成', null]] },
  'p2-14': { n: '展覧会-修正依頼', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['修正依頼', null]] },
  'p2-15': { n: '展覧会-報告', bc: [['Top', '/'], ['展覧会', '/p10'], ['あなたが知らないオノマトペ', '/p2'], ['報告', null]] },
  // P3 クリエイター
  'p3': { n: 'クリエイター', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', null]] },
  'p3-1':  { n: '展覧会', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['展覧会一覧', null]] },
  'p3-2':  { n: 'クリエイター-記事',   w: '--w-index',   bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['記事一覧', null]] },
  'p3-3':  { n: 'クリエイター-作品',   w: '--w-index',   bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['作品一覧', null]] },
  'p3-11': { n: 'クリエイター-編集', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['編集', null]] },
  'p3-12': { n: 'クリエイター-インサイト', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['インサイト', null]] },
  'p3-13': { n: 'クリエイター-ウオッチャー管理', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['ウオッチャー管理', null]] },
  'p3-14': { n: 'クリエイター-ポートフォリオ管理', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['ポートフォリオ管理', null, 'l']] },
  'p3-15': { n: 'クリエイター-リエゾンコンソール', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['リエゾン+コンソール', null]] },
  'p3-16': { n: 'クリエイター-取引デスク', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['取引デスク', null, 'lp']] },
  'p3-17': { n: 'クリエイター販売代金管理', bc: [['Top', '/'], ['クリエイター', '/p10-2'], ['田中 透', '/p3'], ['販売代金管理', null, 'lp']] },
  // P4 ギャラリー
  'p4': { n: 'ギャラリー', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', null]] },
  'p4-1': { n: 'ギャラリー-展覧会アーカイブ', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['展覧会アーカイブ', null]] },
  'p4-2': { n: 'ギャラリー-記事一覧', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['記事一覧', null]] },
  'p4-11': { n: 'ギャラリー-編集', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['編集', null]] },
  'p4-12': { n: 'ギャラリー-インサート', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['インサート', null]] },
  'p4-13': { n: 'ギャラリー-ウオッチャー管理', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['ウオッチャー管理', null]] },
  'p4-14': { n: 'ギャラリー-リエゾンコンソール', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['リエゾンコンソール', null, 'lp']] },
  'p4-15': { n: 'ギャラリー-リエゾンコンソール', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['リエゾン+コンソール', null]] },
  'p4-16': { n: 'ギャラリー-取引デスク', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['取引デスク', null, 'lp']] },
  'p4-17': { n: 'ギャラリー-インベントリー管理', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['販売代金管理', null, 'lp']] },
  'p4-18': { n: 'ギャラリー-取扱作家管理', bc: [['Top', '/'], ['ギャラリー', '/p10-3'], ['Gallery SOIL 渋谷', '/p4'], ['取扱作家管理', null, 'lp']] },
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
  // P7 記事
  'p7': { n: '記事', bc: [['Top', '/'], ['記事', '/p7-list'], ['オノマトペと絵画のあいだで', null]] },
  'p7-11': { n: '記事-新規/編集/クローン', bc: [['Top', '/'], ['オノマトペと絵画のあいだで', '/p7'], ['編集', null]] },
  // P8 レビュー
  'p8': { n: 'レビュー', bc: [['Top', '/'], ['レビュー', '/p8-list'], ['あなたが知らないオノマトペ レビュー', null]] },
  'p8-11': { n: 'レビュー-新規/編集/クローン', bc: [['Top', '/'], ['レビュー', '/p8-list'], ['編集', null]] },
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
  'p11-2': { n: 'クリエイター機能申込', bc: [['Top', '/'], ['ユーザー新規登録', null]] },
  'p11-3': { n: 'ギャラリー機能申込', bc: [['Top', '/'], ['クリエイター機能申込', null]] },
  'p11-4': { n: 'リエゾンプラス機能申込', bc: [['Top', '/'], ['リエゾンプラス機能申込', null, 'lp']] },
  'p11-11': { n: 'ログイン-パスワードを忘れた方', bc: [['Top', '/'], ['ログイン-パスワードを忘れた方', null]] },
  'p11-12': { n: 'ログインパスワード再設定', bc: [['Top', '/'], ['ログインパスワード再設定', null]] },
  'p11-21': { n: 'ユーザー新規登録-アカウント仮登録完了', bc: [['Top', '/'], ['ユーザー新規登録-アカウント仮登録完了', null]] },
  'p11-22': { n: 'ユーザー新規登録-メールアドレス確認完了', bc: [['Top', '/'], ['ユーザー新規登録-メールアドレス確認完了', null]] },
  'p11-23': { n: 'ユーザー新規登録-パスワード設定', bc: [['Top', '/'], ['ユーザー新規登録-パスワード設定', null]] },
  'p11-24': { n: 'ユーザー新規登録-ウオッチ対象の選択', bc: [['Top', '/'], ['ユーザー新規登録-ウオッチ対象の選択', null]] },
  // P60 ガイド
  'p60': { n: 'お知らせ一覧', bc: [['Top', '/'], ['お知らせ一覧', null]] },
  'p60-1': { n: 'ご利用ガイド', bc: [['Top', '/'], ['ガイド', '/p60-1']] },
  'p60-2': { n: '展覧会情報を探したい方', bc: [['Top', '/'], ['ガイド', '/p60-1'], ['展覧会情報を探したい方', null]] },
  'p60-3': { n: '展覧会情報を掲載したい方', bc: [['Top', '/'], ['ガイド', '/p60-1'], ['展覧会情報を掲載したい方', null]] },
  'p60-4': { n: '広告を出したい方', bc: [['Top', '/'], ['ガイド', '/p60-1'], ['広告を出したい方', null]] },
  'p60-5': { n: 'よくある質問-一般', bc: [['Top', '/'], ['ガイド', '/p60-1'], ['よくある質問-一般', null]] },
  'p60-6': { n: 'よくある質問-ユーザー編', bc: [['Top', '/'], ['ガイド', '/p60-1'], ['よくある質問-ユーザー編', null]] },
  'p60-7': { n: 'よくある質問-クリエイター編', bc: [['Top', '/'], ['ガイド', '/p60-1'], ['よくある質問-クリエイター編', null]] },
  'p60-8': { n: 'よくある質問-ギャラリー編', bc: [['Top', '/'], ['ガイド', '/p60-1'], ['よくある質問-ギャラリー編', null]] },
  'p60-9': { n: '個展なびとは', bc: [['Top', '/'], ['個展なびとは', null]] },
  'p60-10': { n: '利用規約', bc: [['Top', '/'], ['利用規約', null]] },
  'p60-11': { n: 'プライバシポリシー', bc: [['Top', '/'], ['プライバシポリシー', null]] },
  'p60-12': { n: 'お問合わせ', bc: [['Top', '/'], ['お問合わせ', null]] },
  'p60-13': { n: 'サービス機能改善要望', bc: [['Top', '/'], ['サービス機能改善要望', null]] },
  // P70 LIAISONガイド
  'p70': { n: 'リエゾンとは', bc: [['Top', '/'], ['LIAISONとは', null]] },
  'p70-1': { n: 'リエゾン-作品出品ガイド', bc: [['Top', '/'], ['LIAISON', '/p70'], ['リエゾン-作品出品ガイド', null]] },
  'p70-2': { n: 'リエゾンプラス-作品販売ガイド', bc: [['Top', '/'], ['LIAISON', '/p70'], ['リエゾンプラス-作品販売ガイド', null]] },
  'p70-3': { n: '作品購入までの流れ', bc: [['Top', '/'], ['LIAISON', '/p70'], ['作品購入までの流れ', null]] },
  'p70-4': { n: '送料・配送について', bc: [['Top', '/'], ['LIAISON', '/p70'], ['送料・配送について', null]] },
  'p70-5': { n: '送料一覧', bc: [['Top', '/'], ['LIAISON', '/p70'], ['送料一覧', null]] },
  'p70-6': { n: '特定商取引法に基づく表示', bc: [['Top', '/'], ['LIAISON', '/p70'], ['特定商取引法に基づく表示', null]] },
  'p70-7': { n: 'リエゾンプラスの手数料について', bc: [['Top', '/'], ['LIAISON', '/p70'], ['リエゾンプラスの手数料について', null]] },
  'p70-8': { n: 'ギャラリーへの説明ガイド', bc: [['Top', '/'], ['LIAISON', '/p70'], ['ギャラリーへの説明ガイド', null]] },
  'p70-9': { n: '作品画像撮影ガイド', bc: [['Top', '/'], ['LIAISON', '/p70'], ['作品画像撮影ガイド', null]] },
  'p70-11': { n: 'リエゾンプラス-取引ガイド(購入者編)', bc: [['Top', '/'], ['LIAISON', '/p70'], ['取引ガイド 購入者編', null]] },
  'p70-12': { n: 'リエゾンプラス-取引ガイド(出品者編)', bc: [['Top', '/'], ['LIAISON', '/p70'], ['取引ガイド 出品者編', null]] },
  // P90 管理者
  'p90': { n: '管理者メニュー', bc: [['Top', '/'], ['管理者メニュー', null]] },
  'p90-1': { n: '管理者-ユーザー新規/クローン', bc: [['Top', '/'], ['管理者', '/p90'], ['ユーザー新規/クローン', null]] },
  'p90-2': { n: '管理者-クリエイター/ギャラリー機能申込管理', bc: [['Top', '/'], ['管理者', '/p90'], ['クリエイター/ギャラリー機能申込管理', null]] },
  'p90-3': { n: '管理者-展覧会新規', bc: [['Top', '/'], ['管理者', '/p90'], ['展覧会新規', null]] },
  'p90-4': { n: '管理者-本日開催・公開の展覧会一覧', bc: [['Top', '/'], ['管理者', '/p90'], ['本日開催・公開の展覧会一覧', null]] },
  'p90-5': { n: '管理者-未公開の展覧会一覧', bc: [['Top', '/'], ['管理者', '/p90'], ['未公開の展覧会一覧', null]] },
  'p90-6': { n: '管理者-最新の展覧会一覧', bc: [['Top', '/'], ['管理者', '/p90'], ['最新の展覧会一覧', null]] },
  'p90-7': { n: '管理者-クリエイター新規/クローン', bc: [['Top', '/'], ['管理者', '/p90'], ['クリエイター新規/クローン', null]] },
  'p90-8': { n: '管理者-ギャラリー新規/クローン', bc: [['Top', '/'], ['管理者', '/p90'], ['ギャラリー新規/クローン', null]] },
  'p90-9': { n: '管理者-メールテンプレート管理', bc: [['Top', '/'], ['管理者', '/p90'], ['メールテンプレート管理', null]] },
  'p90-10': { n: '管理者-ダッシュボード', bc: [['Top', '/'], ['管理者', '/p90'], ['ダッシュボード', null]] },
  'p90-11': { n: '管理者-リエゾンプラス機能申込管理', bc: [['Top', '/'], ['管理者', '/p90'], ['リエゾンプラス機能申込管理', null, 'lp']] },
  'p90-12': { n: '管理者-リエゾンプラスコンソール', bc: [['Top', '/'], ['管理者', '/p90'], ['リエゾンプラスコンソール', null, 'lp']] },
  'p90-13': { n: '管理者-取引デスク', bc: [['Top', '/'], ['管理者', '/p90'], ['取引デスク', null, 'lp']] },
  'p90-14': { n: '管理者-販売代金管理', bc: [['Top', '/'], ['管理者', '/p90'], ['販売代金管理', null, 'lp']] },
  'p90-15': { n: '管理者-リエゾンプラス申込者一覧', bc: [['Top', '/'], ['管理者', '/p90'], ['リエゾンプラス申込者一覧', null, 'lp']] },
  'p90-16': { n: '管理者-作品購入ユーザー一覧', bc: [['Top', '/'], ['管理者', '/p90'], ['作品購入ユーザー一覧', null, 'lp']] },
};

/* ══════════════════════════════════
   ヘルパー — HTML生成
══════════════════════════════════ */
function hib(iconK, label, id = '') {
  const idAttr = id ? ' id="' + id + '"' : '';
  return '<button class="ktn-hib"' + idAttr + '>' + ic16(iconK) + '<span class="ktn-hib__lbl">' + label + '</span></button>';
}
function sep() { return `<div class="ktn-hdr-sep"></div>`; }

/* ── シェアボタン生成（モーダルを開くだけ） ── */
function shareBtn() {
  return `<button class="ktn-hib" onclick="doShare()" aria-label="シェア">
      ${ic16('share')}<span class="ktn-hib__lbl">シェア</span>
    </button>
  </div>`;
}
function owbtn(iconK, label) {
  return `<button class="ktn-hdr-owbtn">${ic(iconK)}<span>${label}</span></button>`;
}
let ddSeq = 0;
function dd(label, items) {
  const id = 'dd' + (++ddSeq);
  return `<div class="ktn-ddw"><button class="ktn-ddbtn" onclick="toggleDD('${id}',this)">${label}<svg class="chv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${I.chev}</svg></button><div class="ktn-ddmenu" id="${id}">${items}</div></div>`;
}
function ddi(iconK, label, danger = false) {
  return `<button class="ktn-ddi${danger ? ' danger' : ''}">${ic(iconK)}${label}</button>`;
}
function ddinote(iconK, label, note) {
  return `<button class="ktn-ddi ktn-ddi--note"><span class="note-head">${ic(iconK)}<span>${label}</span></span><span class="note-sub">${note}</span></button>`;
}
function ddSep() { return `<div class="ktn-dd-sep"></div>`; }

/* ══════════════════════════════════
   アクション定義（ページグループ × ロール）
══════════════════════════════════ */
function getActions(page, role) {
  ddSeq = 0; // IDリセット（レンダリングごと）

  /* ── P2-3 記事・案内 ── */
  if (['p2-3', 'p2-5'].includes(page)) {
    const cmn = hib('heart', '興味あり') + shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + dd('その他',
        ddi('fix', '修正を依頼する') + ddSep() + ddi('warn', '問題を報告する', true));
    if (role === 'creator')
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー',
        ddi('edit', '編集') + ddi('file', '記事の追加') + ddSep() +
        ddinote('grid', 'LIAISON作品管理', 'LIAISON（会場連動オンライン展示/販売）とは →') + ddSep() +
        ddi('chart', 'インサイト') + ddi('info', 'ガイド') + ddSep() +
        ddi('trash', '削除', true));
    if (role === 'gallery')
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー',
        ddi('edit', '編集') + ddi('file', '記事の追加') + ddSep() +
        ddinote('grid', 'LIAISON作品管理', 'LIAISON（会場連動オンライン展示/販売）とは →') + ddSep() +
        ddi('chart', 'インサイト') + ddi('info', 'ガイド') + ddSep() +
        ddi('trash', '削除', true));
    if (role === 'admin')
      return cmn + owbtn('edit', '編集') +
        dd('オーナーメニュー',
          ddi('edit', '編集') + ddi('file', '記事の追加') + ddSep() +
          ddi('grid', 'LIAISON作品管理') + ddi('chart', 'インサイト') + ddSep() +
          ddi('trash', '削除', true)) +
        dd('管理者',
          ddi('edit', '編集') + ddi('send', 'SNS投稿') + ddi('file', '校正データ生成') + ddSep() +
          ddi('clone', 'clone') + ddi('plus', '新規展覧会') + ddi('user', '新規クリエイター') + ddSep() +
          ddi('info', 'コンテンツ詳細情報') + ddSep() + ddi('trash', '削除', true));
  }

  /* ── P2 一覧系 ── */
  if (page === 'p2')
    return role === 'admin'
      ? dd('管理者', ddi('plus', '新規展覧会') + ddi('send', 'SNS投稿') + ddSep() + ddi('chart', 'ダッシュボード'))
      : '';

  /* ── P2-11 展覧会編集 ── */
  if (page === 'p2-11') {
    if (role === 'creator' || role === 'gallery') return owbtn('info', 'ガイド');
    if (role === 'admin') return owbtn('info', 'ガイド') + sep() + dd('管理者', ddi('info', 'コンテンツ詳細情報'));
    return '';
  }

  /* ── P2-12 インサイト / P2-13 広告 ── */
  if (['p2-12', 'p2-13'].includes(page)) {
    if (role === 'creator' || role === 'gallery') return owbtn('info', 'ガイド');
    if (role === 'admin') return owbtn('info', 'ガイド') + sep() + dd('管理者', ddi('info', '詳細情報'));
    return '';
  }

  /* ── P3 クリエイタートップ＋サブ ── */
  if (page === 'p3') {
    const cmn = hib('watch', 'ウォッチ', 'ktnP3WatchHib') + shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + dd('その他', ddi('warn', '問題を報告する', true));
    if (role === 'creator')
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー',
        ddi('edit', 'プロフィール編集') + ddSep() +
        ddi('watch', 'ウォッチャー管理') + ddi('frame', 'ポートフォリオ管理') + ddSep() +
        ddi('grid', 'LIAISONコンソール') + ddi('desk', '取引デスク') + ddi('sales', '販売代金管理'));
    if (role === 'admin')
      return cmn + owbtn('edit', '編集') + dd('管理者',
        ddi('edit', '編集') + ddSep() +
        ddi('watch', 'ウォッチャー管理') + ddi('chart', 'インサイト') + ddSep() + ddi('trash', '削除', true));
    return cmn;
  }

  /* ── P3 管理ページ群（owner/admin限定） ── */
  if (['p3-11', 'p3-12', 'p3-13', 'p3-14', 'p3-15', 'p3-16', 'p3-17'].includes(page)) {
    if (role === 'creator') return owbtn('info', 'ガイド');
    if (role === 'admin') return owbtn('info', 'ガイド') + sep() + dd('管理者', ddi('chart', '統計') + ddi('sales', '精算'));
    return '';
  }

  /* ── P4 ギャラリートップ＋サブ ── */
  if (page === 'p4') {
    const cmn = hib('watch', 'ウォッチ') + shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + dd('その他', ddi('warn', '問題を報告する', true));
    if (role === 'gallery')
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー',
        ddi('edit', 'プロフィール編集') + ddSep() +
        ddi('watch', 'ウォッチャー管理') + ddSep() +
        ddi('grid', 'LIAISONコンソール') + ddi('desk', '取引デスク') + ddi('sales', '販売代金管理') + ddSep() +
        ddi('chart', 'インサイト'));
    if (role === 'admin')
      return cmn + owbtn('edit', '編集') + dd('管理者',
        ddi('edit', '編集') + ddSep() + ddi('watch', 'ウォッチャー管理') + ddSep() + ddi('trash', '削除', true));
    return cmn;
  }

  if (['p4-11', 'p4-12', 'p4-13'].includes(page)) {
    if (role === 'gallery') return owbtn('info', 'ガイド');
    if (role === 'admin') return owbtn('info', 'ガイド') + sep() + dd('管理者', ddi('chart', '統計'));
    return '';
  }

  /* ── P5 myページ＋サブ ── */
  if (page === 'p5') {
    if (role === 'guest') return '';
    const cmn = shareBtn() + sep();
    if (role === 'login' || role === 'creator' || role === 'gallery')
      return cmn + dd('設定',
        ddi('edit', 'プロフィール編集') + ddi('key', 'パスワード') + ddi('bell', 'メール通知設定') + ddSep() + ddi('trash', '退会', true));
    if (role === 'admin')
      return cmn + dd('管理者',
        ddi('edit', '編集') + ddSep() + ddi('user', 'なりすましログイン') + ddSep() + ddi('trash', '強制退会', true));
    return '';
  }

  if (['p5-3', 'p5-4', 'p5-11', 'p5-12', 'p5-13', 'p5-14', 'p5-15', 'p5-16'].includes(page)) {
    if (role === 'admin') return dd('管理者', ddi('user', '代理操作') + ddi('info', '詳細情報'));
    return '';
  }

  /* ── P6 作品 ── */
  if (['p6', 'p6-1', 'p6-2'].includes(page)) {
    const cmn = hib('heart', '興味あり') + shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + dd('その他', ddi('warn', '問題を報告する', true));
    if (role === 'creator')
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー',
        ddi('edit', '作品編集') + ddSep() + ddi('chart', 'インサイト') + ddSep() + ddi('trash', '削除', true));
    if (role === 'admin')
      return cmn + owbtn('edit', '編集') + dd('管理者',
        ddi('edit', '編集') + ddSep() + ddi('chart', 'インサイト') + ddSep() + ddi('trash', '削除', true));
    return cmn;
  }

  if (['p6-11', 'p6-12', 'p6-13', 'p6-14'].includes(page)) {
    if (role === 'creator' || role === 'gallery') return owbtn('info', 'ガイド');
    if (role === 'admin') return owbtn('info', 'ガイド') + sep() + dd('管理者', ddi('chart', '統計'));
    return '';
  }

  /* ── P7 記事 ── */
  if (page === 'p7') {
    const cmn = shareBtn() + sep();
    if (role === 'guest' || role === 'login')
      return cmn + dd('その他', ddi('warn', '問題を報告する', true));
    if (role === 'creator' || role === 'gallery')
      return cmn + owbtn('edit', '編集') + dd('オーナーメニュー',
        ddi('edit', '編集') + ddSep() + ddi('trash', '削除', true));
    if (role === 'admin')
      return cmn + owbtn('edit', '編集') + dd('管理者',
        ddi('edit', '編集') + ddSep() + ddi('trash', '削除', true));
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
      return cmn + dd('その他', ddi('warn', '問題を報告する', true));
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
  if (['p60-1', 'p60-5', 'p60-9', 'p60-10', 'p60-11'].includes(page)) {
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

  if (['p90-4', 'p90-10', 'p90-11', 'p90-13', 'p90-14'].includes(page)) {
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
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _runPage);
  } else {
    _runPage();
  }
};


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
    '写真を添付する' +
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
      lead.innerHTML = _esc(name) + 'をウォッチして<br>最新情報を受取る！';
    } else {
      var q = (type === 'exhibition' || type === 'work')
        ? '「' + _esc(name) + '」' : _esc(name);
      lead.innerHTML = q + '<br>興味あり！マークで<br>my展覧会カレンダーに追加！';
    }
    var btnRow = w.querySelector('.p2-action-widget__btn-row');
    if (btnRow) w.insertBefore(lead, btnRow);
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
