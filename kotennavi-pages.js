/* ══════════════════════════════════════════════════════
   個展なび — ページ固有DOM操作
   kotennavi-pages.js
══════════════════════════════════════════════════════ */

window.KTN = window.KTN || {};
KTN.pages = KTN.pages || {};

/* ────────────────────────────────────────────────────
   共通カードビルダー
──────────────────────────────────────────────────── */

/* 人物水平カード（.cc.cc--h / .gc.gc--h） */
function buildPersonCard(d) {
  var ns = d.type === 'creator' ? 'cc' : 'gc';
  var label = d.type === 'creator' ? 'creator' : 'gallery';
  var cbCls = 'cb cb-person cb-' + label;
  var statusBadge = (!d.panel && (d.status === 'live' || d.status === 'upcoming'))
    ? '<span class="sb">開催中/開催予定</span>' : '';
  var av = d.avClass
    ? '<div class="' + ns + '__avatar ' + d.avClass + '"><div class="' + ns + '__avatar-ph" style="font-size:' + (d.iniStyle || '1rem') + '">' + d.ini + '</div></div>'
    : '<div class="' + ns + '__avatar" style="background:' + d.avStyle + ';color:rgba(255,255,255,.85)"><div class="' + ns + '__avatar-ph" style="font-size:' + (d.iniStyle || '1rem') + '">' + d.ini + '</div></div>';
  var info = d.type === 'creator'
    ? '<div class="cc__name">' + d.name + '</div>' + (d.genre ? '<div class="cc__genre">' + d.genre + '</div>' : '')
    : '<div class="gc__name">' + d.name + '</div>'
      + (d.location ? '<div class="gc__location">' + d.location + '</div>' : '')
      + (d.hours ? '<div class="gc__hours"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M8 5v3.5l2.5 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' + d.hours + '</div>' : '');
  var wId = d.watchId ? ' id="' + d.watchId + '"' : '';
  var wOn = d.watchOn ? ' on' : '';
  var wLbl = d.watchOn ? 'watching' : 'watch';
  var wTip = d.watchOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
  var btn = '<button class="ktn-btn' + wOn + '"' + wId
    + ' data-off="watch" data-on="watching" data-action="watch"'
    + ' onclick="handleAction(this,\'watch\');event.preventDefault()">'
    + '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".3"/><circle class="wi-inner" cx="8" cy="8" r="2.6"/></svg>'
    + ' ' + wLbl + '<span class="tip">' + wTip + '</span></button>';
  var panelCls = d.panel ? ' ' + ns + '--panel' : '';
  return '<a class="' + ns + ' ' + ns + '--h' + panelCls + '" href="' + d.href + '">'
    + '<div class="' + ns + '__top">' + av + '</div>'
    + '<div class="' + ns + '__main"><div class="' + ns + '__info">'
    + '<div class="' + ns + '__badge-row"><span class="' + cbCls + '">' + label + '</span>' + statusBadge + '</div>'
    + info + '</div>'
    + '<div class="' + ns + '__hfoot">'
    + (d.panel ? '' :
        '<span class="pc-count pc-count--exh"><span class="exh-icon"><svg width="13" height="13"><use href="#icon-exh"/></svg></span>' + (d.exh || 0) + '</span>'
      + '<span class="sep"></span>'
      + '<span class="pc-count pc-count--watch"><svg width="11" height="11"><use href="#icon-watch" color="#7a8a99"/></svg>' + (d.watch || 0) + '</span>')
    + btn + '</div></div></a>';
}

/* サイド展覧会カード（.p2-side-ec） */
function buildSideEcCard(e) {
  var pref = e.pref ? e.pref + ' · ' : '';
  var period = e.s && e.e ? '<div class="p2-side-ec__period">2026. ' + e.s + ' — ' + e.e + '</div>' : '';
  var liCls = e.liaison === 'li-plus' ? 'li-plus' : 'li';
  var liLabel = e.liaison === 'li-plus' ? 'LIAISON+' : 'LIAISON';
  var liaisonBadge = e.liaison ? '<span class="lb-dot ' + liCls + '"><span class="lb-dot-inner"></span>' + liLabel + '</span>' : '';
  var intBtn = '<button class="ktn-icon-btn" data-action="interest" onclick="handleAction(this,\'interest\');event.preventDefault()">'
    + '<svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>'
    + '<span class="tip">興味あり！に追加する</span></button>';
  var dist = e.dist
    ? '<span class="p2-side-ec__dist"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M8 1.6c-2.4 0-4.3 1.9-4.3 4.3 0 3 4.3 7.5 4.3 7.5s4.3-4.5 4.3-7.5c0-2.4-1.9-4.3-4.3-4.3z"/><circle cx="8" cy="5.9" r="1.5"/></svg>' + e.dist + '</span>'
    : '';
  return '<a href="kotennavi-p2.html" class="p2-side-ec">'
    + '<div class="p2-side-ec__media">' + dist
    + '<div class="p2-side-ec__poster" style="background:' + e.bg + '"></div></div>'
    + '<div class="p2-side-ec__body">'
    + '<div class="p2-side-ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span>' + liaisonBadge + '</div>'
    + '<div class="p2-side-ec__name">' + e.title + '</div>'
    + '<div class="p2-side-ec__venue">' + pref + e.venue + '</div>'
    + period + '</div>'
    + intBtn
    + '</a>';
}

/* 展示作品カード（.p25c） — p2-5/p2-5-1/p3 共通 */
function buildP25cCard(w, liaisonType) {
  var STATUS_BADGE = {
    sale:    '<span class="aws aws-sale">販売中</span>',
    negot:   '<span class="aws aws-negot">商談中</span>',
    inquiry: '<span class="aws aws-inquiry">要問合せ</span>',
    sold:    '<span class="aws aws-sold">SOLD</span>',
    nsale:   '<span class="aws aws-nsale">非売品</span>',
  };
  var soldRibbon  = w.status === 'sold' ? '<div class="p25c__sold-ribbon"><div class="p25c__sold-ribbon-inner">SOLD</div></div>' : '';
  var artworkBadge = '<span class="cb cb-content cb-artwork">artwork</span>';
  var badgeRow   = '<div class="aw__badge-row">'+artworkBadge+(liaisonType ? (STATUS_BADGE[w.status]||'') : '')+'</div>';
  var titleHtml  = '<div class="aw__title-row"><div class="aw__title">'+(w.title||'')+'</div></div>';
  var creatorUrl  = w.creatorUrl || '#';
  var creatorHtml = w.name
    ? '<div class="aw__creator p25c__creator-link" onclick="event.stopPropagation();event.preventDefault();location.href=\''+creatorUrl+'\'">'+w.name+'</div>'
    : '';
  var specParts = [];
  if (w.year)   specParts.push(w.year);
  if (w.medium) specParts.push(w.medium);
  if (w.size)   specParts.push(w.size);
  var specHtml  = specParts.length ? '<div class="aw__spec">'+specParts.join(' / ')+'</div>' : '';
  var svgHeart  = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"/></svg>';
  var svgBtnOff = '<svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>';
  var counterHtml = (w.interest != null)
    ? '<span class="aw__counter">'+svgHeart+w.interest+'</span>' : '';
  var actionHtml  = '<div class="aw__action-row">'+counterHtml
    +'<button class="ktn-icon-btn" data-action="interest" onclick="handleAction(this,\'interest\');event.stopPropagation();event.preventDefault()">'+svgBtnOff+'<span class="tip">興味あり！に追加する</span></button>'
    +'</div>';
  var priceHtml = '';
  if (w.price) {
    var priceNum   = typeof w.price === 'number' ? w.price.toLocaleString() : w.price;
    var applicants = w.queue ? '<span class="p25c__applicants">'+w.queue+'人が申込中</span>' : '';
    priceHtml = '<div class="p25c__footer"><div class="p25c__footer-l">'+applicants+'</div>'
      +'<div class="p25c__price"><span class="p25c__price-currency">¥</span>'+priceNum+'<span class="p25c__price-tax">税込</span></div>'
      +'</div>';
  }
  var cls = 'p25c' + (w.status === 'sold' ? ' p25c--sold' : '');
  return '<a class="'+cls+'" href="#">'
    +'<div class="p25c__img"><div class="p25c__img-bg" style="background:'+w.bg+'"></div>'
    +soldRibbon+'</div>'
    +'<div class="p25c__body">'+badgeRow+titleHtml+creatorHtml+specHtml+actionHtml+'</div>'
    +priceHtml+'</a>';
}

/* グリッド展覧会カード（.masonry-item .ec） — cards_exhibition.html マソンリー完全準拠 */
function ecDow(md) {
  if (!md) return '';
  var p = String(md).split('.');
  var d = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date(2026, +p[0] - 1, +p[1]).getDay()];
  return '<span class="dow">' + d + '</span>';
}
function buildGridEcCard(e) {
  /* ポスターメタ（残り日数 | 営業時間 | 距離）。本日休み（e.closedToday）は時間の位置に「本日休み」を表示（残り日数バッジは通常どおり） */
  var remainCls = e.status === 'soon' ? 'ec__remain--soon' : 'ec__remain--live';
  var metaParts = [];
  if (e.remain) metaParts.push('<span class="ec__remain ' + remainCls + '">' + e.remain + '</span>');
  var hoursTxt = e.closedToday ? '本日休み' : e.hours;
  if (hoursTxt) metaParts.push('<span class="meta-sep">|</span><span>' + hoursTxt + '</span>');
  if (e.dist)  metaParts.push('<span class="meta-sep">|</span><span>' + e.dist + '</span>');
  var metaHtml = metaParts.length ? '<div class="ec__poster-meta">' + metaParts.join('') + '</div>' : '';

  /* ステータスバッジ（ec__body） */
  var sbHtml = '';
  if (e.status === 'live')         sbHtml = '<span class="sb sb-live"><span class="pulse"></span>開催中</span>';
  else if (e.status === 'soon')    sbHtml = '<span class="sb sb-soon">もうすぐ開催</span>';
  else if (e.status === 'ending')  sbHtml = '<span class="sb sb-ending"><span class="ending-dot"></span>もうすぐ終了</span>';

  /* LIAISONストリップ＋展示作品サムネイル */
  var liaisonHtml = '';
  if (e.liaison) {
    var liCls   = e.liaison === 'li-plus' ? 'li-plus' : 'li';
    var liLabel = e.liaison === 'li-plus' ? 'LIAISON+' : 'LIAISON';
    var liSub   = e.status === 'soon'
      ? (e.liaison === 'li-plus' ? 'オンライン展示・販売予定' : 'オンライン展示予定')
      : (e.liaison === 'li-plus' ? 'オンライン作品展示・販売中' : 'オンライン作品展示中');
    var thumbsHtml = (e.thumbs && e.thumbs.length && e.status !== 'soon')
      ? '<div class="ec__liaison-thumbs">' + e.thumbs.map(function(t){ return '<div class="ec__liaison-thumb" style="background:' + t + '"></div>'; }).join('') + '</div>'
      : '';
    liaisonHtml = '<div class="ec__liaison-strip' + (e.liaison === 'li-plus' ? ' ec__liaison-strip--plus' : '') + '">'
      + '<div class="ec__liaison-strip-info"><span class="lb-dot ' + liCls + '"><span class="lb-dot-inner"></span>' + liLabel + '</span>'
      + '<span class="ec__liaison-subtext">' + liSub + '</span></div>'
      + thumbsHtml + '</div>';
  }

  var intBtn = '<button class="ktn-icon-btn" data-action="interest" onclick="handleAction(this,\'interest\');event.preventDefault()">'
    + '<svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>'
    + '<span class="tip">興味あり！に追加する</span></button>';

  return '<div class="masonry-item"><a href="kotennavi-p2.html" class="ec">'
    + '<div class="ec__poster" style="background:' + e.bg + '">'
    + '<div class="ec__poster-noimg' + (e.light ? ' ec__poster-noimg--light' : '') + '" style="min-height:' + (e.imgH || 190) + 'px"></div>'
    + '<div class="ec__poster-overlay">'
    + '<div class="ec__poster-dates"><span class="year">2026.</span><strong>' + (e.s || '') + '</strong>' + ecDow(e.s) + '<span class="sep">—</span><strong>' + (e.e || '') + '</strong>' + ecDow(e.e) + '</div>'
    + metaHtml
    + '</div></div>'
    + '<div class="ec__body">'
    + '<div class="ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span>' + sbHtml + '</div>'
    + '<div class="ec__title">' + e.title + '</div>'
    + '<div class="ec__venue">' + (e.area ? e.area + '<span class="ec__venue-sep">|</span>' : '') + e.venue + '</div>'
    + '</div>'
    + '<div class="ec__foot">'
    + '<span class="ec-action"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"/></svg>' + (e.int || 0) + '</span>'
    + '<span class="ec-action"><svg viewBox="0 0 16 16" fill="currentColor"><circle cx="10" cy="5" r="4"/><circle cx="5" cy="11" r="2.4"/></svg>' + (e.ci || 0) + '</span>'
    + intBtn
    + '</div>'
    + liaisonHtml
    + '</a></div>';
}

/* ────────────────────────────────────────────────────
   P2 展覧会概要
──────────────────────────────────────────────────── */
KTN.pages['p2'] = function () {

  /* ── tagbar ── */
  (function () {
    var inner = document.getElementById('ktnTagbarInner');
    if (!inner) return;
    [{ label: 'この周辺の展覧会' }, { label: '東京都の展覧会' }, { label: '東京都で人気' }, { sep: true },
    { label: '絵画' }, { label: '現代美術' }, { sep: true }, { label: 'LIAISON Now on View', liaison: true }
    ].forEach(function (t) {
      var el;
      if (t.sep) { el = document.createElement('span'); el.className = 'p2-tsep'; el.textContent = '|'; }
      else {
        el = document.createElement('button');
        el.className = 'p2-tpill' + (t.liaison ? ' p2-tpill--liaison' : '');
        el.textContent = t.label;
        el.addEventListener('click', function () {
          inner.querySelectorAll('.p2-tpill').forEach(function (b) { b.classList.remove('is-active'); });
          this.classList.add('is-active');
        });
      }
      inner.appendChild(el);
    });
  })();

  /* ── ヒーロースライダー（0〜10枚・背景色スライドと同期） ── */
  (function () {
    var SLIDES = window.P2_SLIDES;
    var hero = document.getElementById('p2Hero');

    /* 0枚: ヒーロー非表示 */
    if (!SLIDES || !SLIDES.length) {
      if (hero) hero.style.display = 'none';
      return;
    }

    var img = document.getElementById('p2MainImg');
    var capEl = document.getElementById('p2CaptionText');
    var capWrap = document.getElementById('p2PosterCaption');
    var thumbRow = document.getElementById('p2Thumbs');
    var prevBtn = document.getElementById('p2Prev');
    var nextBtn = document.getElementById('p2Next');
    var cur = 0, timer;

    /* ── サムネイル生成（2枚以上のみ） ── */
    if (thumbRow && SLIDES.length >= 2) {
      thumbRow.innerHTML = '';
      SLIDES.forEach(function (s, i) {
        var th = document.createElement('div');
        th.className = 'p2-poster-thumb' + (i === 0 ? ' is-active' : '');
        th.dataset.idx = i;
        th.style.background = s.bg;
        th.style.color = s.tc;
        th.textContent = s.label.slice(0, 3);
        th.addEventListener('click', function () { goTo(parseInt(th.dataset.idx, 10)); });
        thumbRow.appendChild(th);
      });
      /* カウンターをサムネイル行の右端に追加 */
      var cnt = document.createElement('div');
      cnt.className = 'p2-poster-count';
      cnt.id = 'p2Count';
      cnt.textContent = '1 / ' + SLIDES.length;
      thumbRow.appendChild(cnt);
    } else if (thumbRow) {
      thumbRow.style.display = 'none';
    }

    /* 1枚: ナビ非表示・HTMLのカウンターも非表示 */
    if (SLIDES.length < 2) {
      [prevBtn, nextBtn].forEach(function (el) { if (el) el.style.display = 'none'; });
      /* HTMLのp2Countが残っていれば非表示 */
      var oldCnt = document.getElementById('p2Count');
      if (oldCnt && !oldCnt.closest('#p2Thumbs')) oldCnt.style.display = 'none';
    }

    function update() {
      var s = SLIDES[cur];

      /* ポスター画像 */
      if (img) {
        img.style.background = s.bg;
        img.style.color = s.tc;
        img.textContent = s.label;
      }

      /* エリア背景色をスライドに合わせる（CSS変数で滑らかに）
         グラデーションの最初の色を薄くしてエリア背景に使う */
      if (hero) {
        hero.style.background = s.bg;
      }

      /* キャプション */
      var cap = (s.caption || '').trim();
      if (capEl) capEl.textContent = cap;
      if (capWrap) {
        capWrap.style.display = cap ? '' : 'none';
      }

      /* カウンター更新 */
      var cntEl = document.getElementById('p2Count');
      if (cntEl) cntEl.textContent = (cur + 1) + ' / ' + SLIDES.length;

      /* サムネイル active */
      if (thumbRow) {
        thumbRow.querySelectorAll('.p2-poster-thumb').forEach(function (t, i) {
          t.classList.toggle('is-active', i === cur);
        });
      }
    }

    function goTo(idx) {
      cur = (idx + SLIDES.length) % SLIDES.length;
      update();
      clearInterval(timer);
      if (SLIDES.length >= 2) timer = setInterval(function () { goTo(cur + 1); }, 5000);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(cur - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(cur + 1); });

    /* スワイプ */
    if (hero && SLIDES.length >= 2) {
      var sx = 0;
      hero.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      hero.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 40) goTo(cur + (dx < 0 ? 1 : -1));
      }, { passive: true });
      hero.addEventListener('dragstart', function (e) { e.preventDefault(); });
    }
    document.addEventListener('contextmenu', function (e) {
      if (e.target.closest && e.target.closest('#p2Hero')) e.preventDefault();
    });

    /* 初期描画 */
    update();
    if (SLIDES.length >= 2) timer = setInterval(function () { goTo(cur + 1); }, 5000);
  })();

  /* ── LIAISON 作品タイルグリッド（画像のみ） ── */
  (function () {
    var grid = document.getElementById('p2LiaisonGrid');
    if (!grid) return;

    var WORKS = [
      { label: 'オノマトペの庭', bg: 'linear-gradient(155deg,#b8d8cc,#6a9e8a)', tc: 'rgba(255,255,255,.6)' },
      { label: 'ふわふわ', bg: 'linear-gradient(155deg,#f0e8d0,#d4b896)', tc: 'rgba(0,0,0,.3)' },
      { label: 'ドキドキ #3', bg: 'linear-gradient(155deg,#f0d0d0,#c88080)', tc: 'rgba(255,255,255,.6)' },
      { label: 'ざわざわ（夜）', bg: 'linear-gradient(155deg,#3d3530,#1f1a18)', tc: 'rgba(255,255,255,.55)' },
      { label: 'シュワシュワ', bg: 'linear-gradient(155deg,#d0e8f0,#7ab4cc)', tc: 'rgba(0,0,0,.28)' },
      { label: '言葉の断片 I', bg: 'linear-gradient(155deg,#d8c8e8,#a888cc)', tc: 'rgba(255,255,255,.6)' },
      { label: '言葉の断片 II', bg: 'linear-gradient(155deg,#c8d8e8,#7898b8)', tc: 'rgba(255,255,255,.6)' },
      { label: 'ふわふわ No.2', bg: 'linear-gradient(155deg,#e0d8c8,#b4a88a)', tc: 'rgba(0,0,0,.28)' },
    ];

    grid.innerHTML = WORKS.map(function (w) {
      return '<a href="kotennavi-p2-5.html" class="p2-ltile">'
        + '<div class="p2-ltile__img" style="background:' + w.bg + ';color:' + w.tc + '">'
        + w.label
        + '</div>'
        + '</a>';
    }).join('');
  })();

  /* ++ posted by card ++ */
  (function () {
    var el = document.getElementById('p2PostedByCard');
    if (!el || !window.P2_POSTED_BY) return;
    el.innerHTML = buildPersonCard(window.P2_POSTED_BY);
  })();

  /* ── 近くの展覧会（サイド） ── */
  (function () {
    var list = document.getElementById('p2NearbyList');
    if (!list || !window.P2_NEARBY) return;
    list.innerHTML = window.P2_NEARBY.slice(0, 4).map(buildSideEcCard).join('');
  })();

  /* ++ recommended exhibitions ++ */
  renderP2SubRecGrid();

  /* ── interest! トグル（スティッキーボタンと状態共有） ── */
  (function () {
    var btn    = document.getElementById('p2InterestBtn');
    var stickyBtn = document.getElementById('p2StickyInterestBtn');
    var num    = document.getElementById('p2IntNum');
    if (!btn) return;
    var on = false, base = 41;

    function applyState(source) {
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', on);
      var tn = Array.from(btn.childNodes).find(function(n){ return n.nodeType===3 && n.textContent.trim(); });
      if (tn) tn.textContent = ' ' + (on ? btn.dataset.on : btn.dataset.off);
      var tip = btn.querySelector('.tip');
      if (tip) tip.textContent = on ? '興味あり！を解除する' : '興味あり！に追加する';
      if (num) num.textContent = base + (on ? 1 : 0);
      if (stickyBtn) stickyBtn.classList.toggle('on', on);
      if (on) {
        var animTarget = source || btn;
        if (animTarget.animate) animTarget.animate(
          [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }],
          { duration: 240, easing: 'ease-out' });
      }
      typeof showToast === 'function' && showToast(on ? '「興味あり！」に追加しました' : '「興味あり！」を取り消しました');
    }

    btn.addEventListener('click', function () {
      if (window.ktnState.role === 'guest') { KTN.action.show('interest'); return; }
      on = !on; applyState(btn);
    });
    if (stickyBtn) stickyBtn.addEventListener('click', function () {
      if (window.ktnState.role === 'guest') { KTN.action.show('interest'); return; }
      on = !on; applyState(stickyBtn);
    });
    btn.dataset.ctaInit = '1'; /* KTN.cta.initCtaButtons をスキップ（p2専用処理を保護） */
  })();

  /* ── check in ── */
  (function () {
    var btn = document.getElementById('p2CheckinBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      openCheckinModal();
    });
  })();

  /* ── スティッキーCTAバー：ヒーロー非表示で出現 ── */
  (function () {
    var hero = document.getElementById('p2Hero');
    var cta  = document.getElementById('p2StickyCta');
    if (!hero || !cta) return;
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      var visible = entries[0].isIntersecting;
      cta.classList.toggle('is-visible', !visible);
      cta.setAttribute('aria-hidden', visible ? 'true' : 'false');
    }, { threshold: 0 });
    obs.observe(hero);
  })();

  /* ── アコーディオン ── */
  window.p2ToggleIc = function (id) {
    var el = document.getElementById(id);
    if (el) el.classList.toggle('is-open');
  };

  /* ── ヒーロースクロールアウト → ヘッダー is-scrolled ── */
  (function () {
    var hero = document.getElementById('p2Hero');
    var header = document.getElementById('ktnHeader');
    if (hero && header && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
      }, { threshold: 0 }).observe(hero);
    }
  })();


  /* QRシェアモーダルは KTN.cta.openQrModal に統一 */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeQrModal();
  });

  /* ── ロール切替に追従（デモバー guest/login）＝本人チェックイン&レビューの表示制御＋期間外プレビュー可否 ── */
  var _prevRender = window.ktnRender;
  window.ktnRender = function () {
    if (typeof _prevRender === 'function') _prevRender();
    if (typeof window.syncP2Own === 'function') window.syncP2Own();
    if (typeof window.p2ApplyPeriodToTab === 'function') window.p2ApplyPeriodToTab();
  };

};

/* p2-1〜4 共通おすすめグリッドデータ */
var P2_SUB_REC_DATA = [
  {
    title: '春の景色展',
    venue: '東京<span class="ec__venue-sep">|</span>代官山ヒルサイドF',
    bg: 'linear-gradient(155deg,#f0e0d0,#c8a888)',
    s: '02.20', e: '03.10', imgH: 180,
    status: 'live', remain: '開催中', hours: '11:00-19:00', dist: '2.3km',
    liaison: false, int: 21, ci: 4,
  },
  {
    title: '現代彫刻の冒険',
    venue: '東京<span class="ec__venue-sep">|</span>神楽坂BOOK・ART',
    bg: 'linear-gradient(155deg,#e8d0d8,#b88898)',
    s: '02.17', e: '03.07', imgH: 200,
    status: 'live', remain: '残り5日', hours: '12:00-19:00', dist: '4.1km',
    liaison: true, int: 19, ci: 3,
    thumbs: ['linear-gradient(135deg,#d4c0cc,#9a7a88)', 'linear-gradient(135deg,#c8b8d4,#8878a8)', 'linear-gradient(135deg,#d4c8b8,#9a8870)'],
  },
  {
    title: 'ポストカード展',
    venue: '東京<span class="ec__venue-sep">|</span>吉祥寺 M&G',
    bg: 'linear-gradient(155deg,#d0e8e0,#88b8a8)',
    s: '02.22', e: '03.12', imgH: 165,
    status: 'live', remain: '開催中', hours: '12:00-20:00', dist: '8.7km',
    liaison: false, int: 38, ci: 7,
  },
  {
    title: 'デジタルとアナログのあいだ',
    venue: '東京<span class="ec__venue-sep">|</span>3331 Arts Chiyoda',
    bg: 'linear-gradient(155deg,#d8e8d0,#88b878)',
    s: '02.15', e: '03.20', imgH: 190,
    status: 'live', remain: '開催中', hours: '11:00-19:00', dist: '5.4km',
    liaison: 'li-plus', int: 14, ci: 2,
    thumbs: ['linear-gradient(135deg,#c8d8b8,#78a858)', 'linear-gradient(135deg,#d8e8c8,#98b878)', 'linear-gradient(135deg,#c0d0b8,#808878)'],
  },
];
function renderP2SubRecGrid() {
  var grid = document.getElementById('p2SubRecGrid'); if (!grid) return;
  grid.innerHTML = P2_SUB_REC_DATA.map(buildGridEcCard).join('');
}

/* ────────────────────────────────────────────────────
   P8 レビュー詳細（親展覧会・投稿者・おすすめ）
──────────────────────────────────────────────────── */
KTN.pages['p8'] = function () {
  /* おすすめ展覧会グリッド（p2 と同データ・部品を再利用） */
  var grid = document.getElementById('p8SubRecGrid');
  if (grid) grid.innerHTML = P2_SUB_REC_DATA.map(buildGridEcCard).join('');

  /* 親展覧会サイドカード（buildSideEcCard 再利用・href は p2 固定） */
  var exh = document.getElementById('p8ExhCard');
  if (exh) exh.innerHTML = buildSideEcCard({
    title: 'あなたが知らないオノマトペ', pref: '東京', venue: 'Gallery SOIL 渋谷',
    s: '02.18', e: '03.05', liaison: 'li-plus',
    bg: 'linear-gradient(155deg,#b8d8cc,#6a9e8a)'
  });

  /* 投稿者本人（ログイン）のみ「レビューを編集 →」を表示 */
  function syncOwnerEdit() {
    var oe = document.getElementById('p8OwnerEdit');
    if (oe) oe.hidden = (window.ktnState.role === 'guest');
  }
  syncOwnerEdit();
  var _prevRender = window.ktnRender;
  window.ktnRender = function () {
    if (typeof _prevRender === 'function') _prevRender();
    syncOwnerEdit();
  };
};

/* ────────────────────────────────────────────────────
   P7 記事詳細（親作品・投稿者・おすすめ）
──────────────────────────────────────────────────── */
KTN.pages['p7'] = function () {
  /* おすすめ展覧会グリッド（p2 と同データ・部品を再利用） */
  var grid = document.getElementById('p7SubRecGrid');
  if (grid) grid.innerHTML = P2_SUB_REC_DATA.map(buildGridEcCard).join('');
};

/* 記事の掲載先（作品／展覧会／クリエイターページ／ギャラリーページ）デモ切替
   掲載先＝コンテンツ（作品・展覧会）は interest、人物（クリエイター・ギャラリー）は watch を使う */
var P7_CONTEXTS = {
  artwork: {
    leadHref: 'kotennavi-p6.html',
    leadLabel: 'この作品の記事',
    leadHtml: `
      <span class="ktn-content-lead__thumb" style="background:linear-gradient(155deg,#b8d8cc,#6a9e8a)"></span>
      <span class="ktn-content-lead__body">
        <span class="ktn-content-lead__name"><span class="cb cb-content cb-artwork">artwork</span>オノマトペの庭</span>
        <span class="ktn-content-lead__meta">田中 透 ・ 2026年 ・ ミクストメディア</span>
      </span>`,
    badgesHtml: `<span class="cb cb-content cb-article">article</span><span class="at at-c">制作日記</span>`,
    title: '『オノマトペの庭』制作について —— 音のかたちを探して',
    en: 'Making of Onomatopoeia Garden: In Search of the Shape of Sound',
    authorHref: 'kotennavi-p3.html',
    authorHtml: `
      <span class="p7-head__avatar" style="background:linear-gradient(135deg,#7ab4cc,#4a8099);color:rgba(255,255,255,.9)">T</span>
      <span class="p7-head__author-info">
        <span class="p7-head__author-name"><span class="cb cb-person cb-creator">creator</span>&nbsp;田中 透</span>
        <span class="p7-head__date">2026.03.05 公開</span>
      </span>`,
    articleHtml: `
      <div class="p7-article__block p7-article__block--text">
        <p>「ふわふわ」「ざわざわ」「きらきら」――日本語のオノマトペは、音でも、手触りでも、光の揺らぎでもある不思議な言葉たちだ。今回の新作《オノマトペの庭》は、そうした感覚の断片を一枚の画面に集め、ひとつの「庭」として編み直す試みだった。制作期間はおよそ4ヶ月。ここでは、そのプロセスの一部を振り返ってみたい。</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--single">
        <div class="p7-article__media-img" style="background:linear-gradient(155deg,#e8e0c8,#c4b888)"></div>
        <figcaption class="p7-article__caption">制作初期のドローイング。「ふわふわ」という言葉から浮かんだ最初の形。</figcaption>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p class="p7-article__subtitle">言葉を「感じ」に変える</p>
        <p>最初に手を動かしたのは、言葉そのものを絵にしようとするのではなく、言葉を口にしたときの「感じ」を線にすることだった。「ふわふわ」なら弾むような曲線、「ざわざわ」なら細かく震える短い線。ドローイングを何十枚も重ねるうちに、画面全体を「庭」として構成するアイデアが生まれた。</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--video">
        <div class="p7-article__media-video" style="background:linear-gradient(155deg,#3d3530,#1f1a18)">
          <button class="p7-article__video-play" type="button" aria-label="動画を再生">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><polygon points="9,6 19,12 9,18" fill="#fff"/></svg>
          </button>
          <span class="p7-article__video-time">2:14</span>
        </div>
        <figcaption class="p7-article__caption">アトリエでの制作風景。緑がかった色面を少しずつ重ねていく。</figcaption>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>画面中央の緑がかった空間は、複数の「やわらかい音」が重なり合う場所として描いた。色を置いては拭き取り、また置く――その反復のなかで、ようやく「静かな庭」の気配が画面に宿り始めた。F30号という大きさは、鑑賞者が作品の前に立ったとき、その場の空気ごと体験できるようにという意図から選んでいる。</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--pair">
        <div class="p7-article__media-col">
          <div class="p7-article__media-img" style="background:linear-gradient(135deg,#9cc4b8,#5a8e7a)"></div>
          <figcaption class="p7-article__caption">制作中盤のラフ。</figcaption>
        </div>
        <div class="p7-article__media-col">
          <div class="p7-article__media-img" style="background:linear-gradient(165deg,#c4d8d0,#7aaa98)"></div>
          <figcaption class="p7-article__caption">完成に近づいた状態。</figcaption>
        </div>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>「庭」という言葉を頭に浮かべたとき、まず耳に届いたのは「しんと静まり返った空気感」と「葉が揺れる微かな音」だった。その二つの感覚が混ざり合う瞬間を、画面の上に留めておきたい――そう思いながら筆を置いた。完成した《オノマトペの庭》は、会場でじっくり向き合っていただけたら嬉しい。</p>
      </div>`,
    sideParentTitle: 'この記事の作品',
    sideParentTitleEn: 'Artwork',
    sideParentHtml: `
      <div class="p7-side-card__title">この記事の作品<span class="ktn-sec-en">Artwork</span></div>
      <a href="kotennavi-p6.html" class="p2-side-ec">
        <div class="p2-side-ec__media"><div class="p2-side-ec__poster" style="background:linear-gradient(155deg,#b8d8cc,#6a9e8a)"></div></div>
        <div class="p2-side-ec__body">
          <div class="p2-side-ec__badge-row"><span class="cb cb-content cb-artwork">artwork</span><span class="lb-dot li-plus"><span class="lb-dot-inner"></span>LIAISON+</span></div>
          <div class="p2-side-ec__name">オノマトペの庭</div>
          <div class="p2-side-ec__venue">田中 透 ・ 2026年</div>
        </div>
        <button class="ktn-icon-btn" data-action="interest" onclick="handleAction(this,'interest');event.preventDefault()">
          <svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>
          <span class="tip">興味あり！に追加する</span>
        </button>
      </a>
      <a href="kotennavi-p6.html" class="ktn-more-link">作品ページへ →</a>`,
    sideAuthorHtml: `
      <div class="p7-side-card__title">投稿者<span class="ktn-sec-en">Posted by</span></div>
      <div class="p2-side-posted__dates">公開：2026.03.05 / 最終更新：2026.03.05</div>
      <a class="p7-author-card" href="kotennavi-p3.html">
        <div class="p7-author-card__avatar" style="background:linear-gradient(135deg,#7ab4cc,#4a8099);color:rgba(255,255,255,.9)">T</div>
        <div class="p7-author-card__info">
          <div class="p7-author-card__badge-row"><span class="cb cb-person cb-creator">creator</span></div>
          <div class="p7-author-card__name">田中 透</div>
          <div class="p2-watcher-item__counts">
            <span class="p2-watcher-item__count"><svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="8" cy="8" r="7" fill="#3a90e0"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>34</span>
            <span class="p2-watcher-item__count"><svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#3a90e0" stroke="#3a90e0" stroke-width=".6" stroke-linejoin="round"/></svg>52</span>
          </div>
          <div class="p7-author-card__foot">
            <button class="ktn-btn" data-off="watch" data-on="watching" data-action="watch"
              onclick="handleAction(this,'watch');event.preventDefault()">
              <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                <circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".3"/>
                <circle class="wi-inner" cx="8" cy="8" r="2.6"/>
              </svg>
              watch<span class="tip">ウォッチする</span>
            </button>
          </div>
        </div>
      </a>`,
    ctaName: '『オノマトペの庭』制作について',
    relatedCtxHtml: `<span class="cb cb-content cb-artwork">artwork</span><a href="kotennavi-p6.html" class="ktn-related-band__link">オノマトペの庭</a>`,
    tagsHtml: `
      <li><a class="ktn-tag-pill" href="/p10?tag=絵画">絵画</a></li>
      <li><a class="ktn-tag-pill" href="/p10?tag=現代美術">現代美術</a></li>
      <li><a class="ktn-tag-pill" href="/p10?tag=オノマトペ">オノマトペ</a></li>
      <li><a class="ktn-tag-pill" href="/p10?tag=制作日記">制作日記</a></li>
      <li><a class="ktn-tag-pill" href="/p10?area=tokyo">東京</a></li>`
  },
  exhibition: {
    leadHref: 'kotennavi-p2.html',
    leadLabel: 'この展覧会の記事',
    leadHtml: `
      <span class="ktn-content-lead__thumb" style="background:linear-gradient(155deg,#bcd4ea,#5a8fbe)"></span>
      <span class="ktn-content-lead__body">
        <span class="ktn-content-lead__name"><span class="cb cb-content cb-exhibition">exhibition</span>あなたが知らないオノマトペ</span>
        <span class="ktn-content-lead__meta">Gallery SOIL 渋谷 ・ 2026.02.18 — 03.05</span>
      </span>`,
    badgesHtml: `<span class="cb cb-content cb-article">article</span><span class="at at-a">レポート</span>`,
    title: '展評：オノマトペの庭「田中透」',
    en: 'Exhibition Review: Tanaka Toru "Onomatopoeia Garden"',
    authorHref: 'kotennavi-p3.html',
    authorHtml: `
      <span class="p7-head__avatar" style="background:linear-gradient(135deg,#7ab4cc,#4a8099);color:rgba(255,255,255,.9)">T</span>
      <span class="p7-head__author-info">
        <span class="p7-head__author-name"><span class="cb cb-person cb-creator">creator</span>&nbsp;田中 透</span>
        <span class="p7-head__date">2026.03.10 公開</span>
      </span>`,
    articleHtml: `
      <div class="p7-article__block p7-article__block--text">
        <p>会場に足を踏み入れると、まず目に入るのは天井まで届く大きな窓から差し込む自然光だった。Gallery SOIL 渋谷の白い壁に、田中透の新作群が静かに並ぶ。「あなたが知らないオノマトペ」と題された今回の個展は、会期を通して多くの来場者を集めた。</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--single">
        <div class="p7-article__media-img" style="background:linear-gradient(155deg,#bcd4ea,#5a8fbe)"></div>
        <figcaption class="p7-article__caption">会場入口から見た展示風景。自然光が作品の色面を柔らかく照らす。</figcaption>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>中央に据えられた《オノマトペの庭》は、本展の核となる大作だ。緑がかった色面が生む静けさは、会場の白い壁と呼応し、来場者を自然と作品の前に留まらせる。</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--video">
        <div class="p7-article__media-video" style="background:linear-gradient(155deg,#3d3530,#1f1a18)">
          <button class="p7-article__video-play" type="button" aria-label="動画を再生">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><polygon points="9,6 19,12 9,18" fill="#fff"/></svg>
          </button>
          <span class="p7-article__video-time">1:42</span>
        </div>
        <figcaption class="p7-article__caption">会場でのアーティストトーク（抜粋）。田中透が制作の背景を語る。</figcaption>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>会期中に行われたギャラリートークには、立ち見が出るほどの来場者が集まった。田中の言葉を借りれば、「音を色に置き換える作業は、いつも半分は失敗する。でもその失敗の跡こそが、絵になる」。</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--pair">
        <div class="p7-article__media-col">
          <div class="p7-article__media-img" style="background:linear-gradient(135deg,#d8e0e8,#9cb4c8)"></div>
          <figcaption class="p7-article__caption">会場全景。</figcaption>
        </div>
        <div class="p7-article__media-col">
          <div class="p7-article__media-img" style="background:linear-gradient(165deg,#e8dcc4,#c8a878)"></div>
          <figcaption class="p7-article__caption">来場者の様子。</figcaption>
        </div>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>会期は2026年3月5日まで。オノマトペという身近でありながら捉えどころのない言葉たちが、絵画という形でどのように立ち上がるか――ぜひ会場で確かめてほしい。</p>
      </div>`,
    sideParentTitle: 'この記事の展覧会',
    sideParentTitleEn: 'Exhibition',
    sideParentHtml: `
      <div class="p7-side-card__title">この記事の展覧会<span class="ktn-sec-en">Exhibition</span></div>
      <a href="kotennavi-p2.html" class="p2-side-ec">
        <div class="p2-side-ec__media"><div class="p2-side-ec__poster" style="background:linear-gradient(155deg,#bcd4ea,#5a8fbe)"></div></div>
        <div class="p2-side-ec__body">
          <div class="p2-side-ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span><span class="sb sb-closed">会期終了</span></div>
          <div class="p2-side-ec__name">あなたが知らないオノマトペ</div>
          <div class="p2-side-ec__venue">Gallery SOIL 渋谷 ・ 2026.02.18–03.05</div>
        </div>
        <button class="ktn-icon-btn" data-action="interest" onclick="handleAction(this,'interest');event.preventDefault()">
          <svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>
          <span class="tip">興味あり！に追加する</span>
        </button>
      </a>
      <a href="kotennavi-p2.html" class="ktn-more-link">展覧会ページへ →</a>`,
    sideAuthorHtml: `
      <div class="p7-side-card__title">投稿者<span class="ktn-sec-en">Posted by</span></div>
      <div class="p2-side-posted__dates">公開：2026.03.10 / 最終更新：2026.03.10</div>
      <a class="p7-author-card" href="kotennavi-p3.html">
        <div class="p7-author-card__avatar" style="background:linear-gradient(135deg,#7ab4cc,#4a8099);color:rgba(255,255,255,.9)">T</div>
        <div class="p7-author-card__info">
          <div class="p7-author-card__badge-row"><span class="cb cb-person cb-creator">creator</span></div>
          <div class="p7-author-card__name">田中 透</div>
          <div class="p2-watcher-item__counts">
            <span class="p2-watcher-item__count"><svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="8" cy="8" r="7" fill="#3a90e0"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>34</span>
            <span class="p2-watcher-item__count"><svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#3a90e0" stroke="#3a90e0" stroke-width=".6" stroke-linejoin="round"/></svg>52</span>
          </div>
          <div class="p7-author-card__foot">
            <button class="ktn-btn" data-off="watch" data-on="watching" data-action="watch"
              onclick="handleAction(this,'watch');event.preventDefault()">
              <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                <circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".3"/>
                <circle class="wi-inner" cx="8" cy="8" r="2.6"/>
              </svg>
              watch<span class="tip">ウォッチする</span>
            </button>
          </div>
        </div>
      </a>`,
    ctaName: '展評：オノマトペの庭「田中透」',
    relatedCtxHtml: `<span class="cb cb-content cb-exhibition">exhibition</span><a href="kotennavi-p2.html" class="ktn-related-band__link">あなたが知らないオノマトペ</a>`,
    tagsHtml: `
      <li><a class="ktn-tag-pill" href="/p10?tag=絵画">絵画</a></li>
      <li><a class="ktn-tag-pill" href="/p10?tag=現代美術">現代美術</a></li>
      <li><a class="ktn-tag-pill" href="/p10?tag=展評">展評</a></li>
      <li><a class="ktn-tag-pill" href="/p10?area=tokyo">東京</a></li>
      <li><a class="ktn-tag-pill" href="/p10?area=shibuya">渋谷</a></li>`
  },
  creator: {
    leadHref: 'kotennavi-p3.html',
    leadLabel: 'このクリエイターの記事',
    leadHtml: `
      <span class="ktn-content-lead__thumb" style="background:linear-gradient(155deg,#8fb0c2,#2a5f7a)"></span>
      <span class="ktn-content-lead__body">
        <span class="ktn-content-lead__name"><span class="cb cb-person cb-creator">creator</span>田中 透</span>
        <span class="ktn-content-lead__meta">画家 ・ 絵画・ミクストメディア</span>
      </span>`,
    badgesHtml: `<span class="cb cb-content cb-article">article</span><span class="at at-b">インタビュー</span>`,
    title: '田中透インタビュー：言語と絵画のあいだで',
    en: 'Interview with Tanaka Toru: Between Language and Painting',
    authorHref: 'kotennavi-p3.html',
    authorHtml: `
      <span class="p7-head__avatar" style="background:linear-gradient(135deg,#7ab4cc,#4a8099);color:rgba(255,255,255,.9)">T</span>
      <span class="p7-head__author-info">
        <span class="p7-head__author-name"><span class="cb cb-person cb-creator">creator</span>&nbsp;田中 透</span>
        <span class="p7-head__date">2025.11.20 公開</span>
      </span>`,
    articleHtml: `
      <div class="p7-article__block p7-article__block--text">
        <p>「言葉は音であり、色であり、触感でもある」――そう語るのは、独自の表現を追い続けるアーティスト・田中透だ。オノマトペという身近な言葉をモチーフに、絵画という形でどのように立ち上げているのか。制作の背景から今後の展望まで、じっくりと話を聞いた。</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--single">
        <div class="p7-article__media-img" style="background:linear-gradient(155deg,#7ab4cc,#4a8099)"></div>
        <figcaption class="p7-article__caption">アトリエにて。壁には制作中のドローイングが並ぶ。</figcaption>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>――オノマトペをモチーフにされたきっかけは？「小さい頃から、言葉の『音』に強く反応するタイプでした。『ふわふわ』と聞くと実際に何かが軽く弾むのが見える気がして。その感覚をずっと絵にしたいと思っていました」</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--video">
        <div class="p7-article__media-video" style="background:linear-gradient(155deg,#3d3530,#1f1a18)">
          <button class="p7-article__video-play" type="button" aria-label="動画を再生">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><polygon points="9,6 19,12 9,18" fill="#fff"/></svg>
          </button>
          <span class="p7-article__video-time">3:08</span>
        </div>
        <figcaption class="p7-article__caption">インタビュー映像（抜粋）。制作風景とあわせて収録。</figcaption>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>――制作で大切にしていることは？「言葉を『説明』しないこと。オノマトペそのものを絵解きするのではなく、その言葉を発したときの体の感覚――喉の震え、口の形――をそのまま画面に落とし込むようにしています」</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--pair">
        <div class="p7-article__media-col">
          <div class="p7-article__media-img" style="background:linear-gradient(135deg,#e8e0c8,#c4b888)"></div>
          <figcaption class="p7-article__caption">初期のドローイング。</figcaption>
        </div>
        <div class="p7-article__media-col">
          <div class="p7-article__media-img" style="background:linear-gradient(165deg,#9cc4b8,#5a8e7a)"></div>
          <figcaption class="p7-article__caption">完成に近い状態のキャンバス。</figcaption>
        </div>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>――今後の展望は？「言葉と絵画の境界をもっと曖昧にしていきたい。次回作では音そのものを展示空間に持ち込むことも考えています」。次回作にも期待が高まる。</p>
      </div>`,
    sideParentTitle: '',
    sideParentTitleEn: '',
    sideParentHtml: '',
    sideAuthorHtml: `
      <div class="p7-side-card__title">投稿者<span class="ktn-sec-en">Posted by</span></div>
      <div class="p2-side-posted__dates">公開：2025.11.20 / 最終更新：2025.11.20</div>
      <a class="p7-author-card" href="kotennavi-p3.html">
        <div class="p7-author-card__avatar" style="background:linear-gradient(135deg,#7ab4cc,#4a8099);color:rgba(255,255,255,.9)">T</div>
        <div class="p7-author-card__info">
          <div class="p7-author-card__badge-row"><span class="cb cb-person cb-creator">creator</span></div>
          <div class="p7-author-card__name">田中 透</div>
          <div class="p2-watcher-item__counts">
            <span class="p2-watcher-item__count"><svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="8" cy="8" r="7" fill="#3a90e0"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>34</span>
            <span class="p2-watcher-item__count"><svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#3a90e0" stroke="#3a90e0" stroke-width=".6" stroke-linejoin="round"/></svg>52</span>
          </div>
          <div class="p7-author-card__foot">
            <button class="ktn-btn" data-off="watch" data-on="watching" data-action="watch"
              onclick="handleAction(this,'watch');event.preventDefault()">
              <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                <circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".3"/>
                <circle class="wi-inner" cx="8" cy="8" r="2.6"/>
              </svg>
              watch<span class="tip">ウォッチする</span>
            </button>
          </div>
        </div>
      </a>`,
    ctaName: '田中透インタビュー：言語と絵画のあいだで',
    relatedCtxHtml: `<span class="cb cb-person cb-creator">creator</span><a href="kotennavi-p3.html" class="ktn-related-band__link">田中 透</a>`,
    tagsHtml: `
      <li><a class="ktn-tag-pill" href="/p10?tag=絵画">絵画</a></li>
      <li><a class="ktn-tag-pill" href="/p10?tag=現代美術">現代美術</a></li>
      <li><a class="ktn-tag-pill" href="/p10?tag=インタビュー">インタビュー</a></li>
      <li><a class="ktn-tag-pill" href="/p10?area=tokyo">東京</a></li>`
  },
  gallery: {
    leadHref: 'kotennavi-p4.html',
    leadLabel: 'このギャラリーの記事',
    leadHtml: `
      <span class="ktn-content-lead__thumb" style="background:linear-gradient(155deg,#c9ac86,#8b5e3c)"></span>
      <span class="ktn-content-lead__body">
        <span class="ktn-content-lead__name"><span class="cb cb-person cb-gallery">gallery</span>Gallery SOIL 渋谷</span>
        <span class="ktn-content-lead__meta">渋谷区松濤 ・ 現代美術・絵画</span>
      </span>`,
    badgesHtml: `<span class="cb cb-content cb-article">article</span><span class="at at-c">ギャラリーノート</span>`,
    title: 'Gallery SOIL 渋谷 ノート：展示替えの舞台裏',
    en: 'Gallery Notes: Behind the Scenes of the Rehang',
    authorHref: 'kotennavi-p4.html',
    authorHtml: `
      <span class="p7-head__avatar" style="background:linear-gradient(135deg,#c9ac86,#8b5e3c);color:rgba(255,255,255,.9);border-radius:4px;outline-color:rgba(139,94,60,.45)">G</span>
      <span class="p7-head__author-info">
        <span class="p7-head__author-name"><span class="cb cb-person cb-gallery">gallery</span>&nbsp;Gallery SOIL 渋谷</span>
        <span class="p7-head__date">2026.03.12 公開</span>
      </span>`,
    articleHtml: `
      <div class="p7-article__block p7-article__block--text">
        <p>「あなたが知らないオノマトペ」展の会期が終わり、次の展示に向けて会場の展示替えが始まった。今回は、その舞台裏を少しだけご紹介したい。</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--single">
        <div class="p7-article__media-img" style="background:linear-gradient(155deg,#ded6c8,#a89478)"></div>
        <figcaption class="p7-article__caption">撤収作業中のギャラリー。壁の跡がまだ残る。</figcaption>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>作品の搬出は早朝から始まる。大型作品は2人がかりで慎重に梱包し、専用の輸送車へ。壁に空いた釘穴を補修し、白く塗り直す――この繰り返しが、次の展示のための「まっさらな壁」を作る。</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--video">
        <div class="p7-article__media-video" style="background:linear-gradient(155deg,#3d3530,#1f1a18)">
          <button class="p7-article__video-play" type="button" aria-label="動画を再生">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><polygon points="9,6 19,12 9,18" fill="#fff"/></svg>
          </button>
          <span class="p7-article__video-time">1:05</span>
        </div>
        <figcaption class="p7-article__caption">展示替えの様子（タイムラプス）。</figcaption>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>照明の位置決めも重要な作業のひとつ。次回展示の作家と相談しながら、作品ごとに最適な角度・明るさを探る。「同じ壁でも、照明ひとつで作品の見え方はまったく変わります」とスタッフは語る。</p>
      </div>
      <figure class="p7-article__block p7-article__block--media p7-article__media--pair">
        <div class="p7-article__media-col">
          <div class="p7-article__media-img" style="background:linear-gradient(135deg,#c9ac86,#8b5e3c)"></div>
          <figcaption class="p7-article__caption">壁の補修作業。</figcaption>
        </div>
        <div class="p7-article__media-col">
          <div class="p7-article__media-img" style="background:linear-gradient(165deg,#e8dcc4,#c8a878)"></div>
          <figcaption class="p7-article__caption">新しい照明プランのテスト。</figcaption>
        </div>
      </figure>
      <div class="p7-article__block p7-article__block--text">
        <p>次回の展示は4月上旬オープン予定。会場が生まれ変わる様子を、また別の機会にご紹介できればと思う。</p>
      </div>`,
    sideParentTitle: '',
    sideParentTitleEn: '',
    sideParentHtml: '',
    sideAuthorHtml: `
      <div class="p7-side-card__title">投稿者<span class="ktn-sec-en">Posted by</span></div>
      <div class="p2-side-posted__dates">公開：2026.03.12 / 最終更新：2026.03.12</div>
      <a class="p7-author-card" href="kotennavi-p4.html">
        <div class="p7-author-card__avatar" style="background:linear-gradient(135deg,#c9ac86,#8b5e3c);color:rgba(255,255,255,.9);border-radius:4px;outline-color:rgba(139,94,60,.45)">G</div>
        <div class="p7-author-card__info">
          <div class="p7-author-card__badge-row"><span class="cb cb-person cb-gallery">gallery</span></div>
          <div class="p7-author-card__name">Gallery SOIL 渋谷</div>
          <div class="p2-watcher-item__counts">
            <span class="p2-watcher-item__count"><svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="8" cy="8" r="7" fill="#3a90e0"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>61</span>
            <span class="p2-watcher-item__count"><svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#3a90e0" stroke="#3a90e0" stroke-width=".6" stroke-linejoin="round"/></svg>28</span>
          </div>
          <div class="p7-author-card__foot">
            <button class="ktn-btn" data-off="watch" data-on="watching" data-action="watch"
              onclick="handleAction(this,'watch');event.preventDefault()">
              <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                <circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".3"/>
                <circle class="wi-inner" cx="8" cy="8" r="2.6"/>
              </svg>
              watch<span class="tip">ウォッチする</span>
            </button>
          </div>
        </div>
      </a>`,
    ctaName: 'Gallery SOIL 渋谷 ノート：展示替えの舞台裏',
    relatedCtxHtml: `<span class="cb cb-person cb-gallery">gallery</span><a href="kotennavi-p4.html" class="ktn-related-band__link">Gallery SOIL 渋谷</a>`,
    tagsHtml: `
      <li><a class="ktn-tag-pill" href="/p10?tag=ギャラリー">ギャラリー</a></li>
      <li><a class="ktn-tag-pill" href="/p10?tag=現代美術">現代美術</a></li>
      <li><a class="ktn-tag-pill" href="/p10?tag=展示替え">展示替え</a></li>
      <li><a class="ktn-tag-pill" href="/p10?area=tokyo">東京</a></li>
      <li><a class="ktn-tag-pill" href="/p10?area=shibuya">渋谷</a></li>`
  }
};

function switchP7Context(key, btn) {
  var d = P7_CONTEXTS[key];
  if (!d) return;
  var group = btn.parentElement.querySelectorAll('button[onclick^="switchP7Context"]');
  for (var i = 0; i < group.length; i++) group[i].classList.remove('on');
  btn.classList.add('on');

  var leadLabel = document.getElementById('p7LeadLabel');
  if (leadLabel) leadLabel.textContent = d.leadLabel;
  var leadCard = document.getElementById('p7LeadCard');
  if (leadCard) { leadCard.href = d.leadHref; leadCard.innerHTML = d.leadHtml; }
  var badges = document.getElementById('p7Badges');
  if (badges) badges.innerHTML = d.badgesHtml;
  var title = document.getElementById('p7Title');
  if (title) title.textContent = d.title;
  var en = document.getElementById('p7En');
  if (en) en.textContent = d.en;
  var al = document.getElementById('p7AuthorLink');
  if (al) { al.href = d.authorHref; al.innerHTML = d.authorHtml; }
  var article = document.getElementById('p7Article');
  if (article) article.innerHTML = d.articleHtml;
  var sideParent = document.getElementById('p7SideParent');
  if (sideParent) {
    sideParent.innerHTML = d.sideParentHtml;
    sideParent.style.display = d.sideParentHtml ? '' : 'none';
  }
  var sideAuthor = document.getElementById('p7SideAuthor');
  if (sideAuthor) {
    sideAuthor.innerHTML = d.sideAuthorHtml;
    sideAuthor.style.display = d.sideAuthorHtml ? '' : 'none';
  }
  var cta = document.getElementById('p7CtaWidget');
  if (cta) cta.setAttribute('data-cta-name', d.ctaName);
  var relCtx = document.getElementById('p7RelatedCtx');
  if (relCtx) relCtx.innerHTML = d.relatedCtxHtml;
  var tags = document.getElementById('p7Tags');
  if (tags) tags.innerHTML = d.tagsHtml;
}
window.switchP7Context = switchP7Context;

/* ────────────────────────────────────────────────────
   P2-1 スケジュール
──────────────────────────────────────────────────── */
KTN.pages['p2-1'] = function () {

  /* ++ posted by card ++ */
  (function () {
    var el = document.getElementById('p2PostedByCard');
    if (!el || !window.P2_POSTED_BY) return;
    el.innerHTML = buildPersonCard(window.P2_POSTED_BY);
  })();

  /* ── データ定義 ── */
  /* デモ用固定日付。本番は new Date() に差替え */
  var TODAY = new Date('2026-02-21'); TODAY.setHours(0,0,0,0);
  var START = new Date('2026-02-18');
  var END = new Date('2026-03-05');
  var OPEN_DOW = [4, 5, 6, 0]; /* 木金土日 */
  var DOW_JA = ['日', '月', '火', '水', '木', '金', '土'];
  var DEFAULT_HOURS = '11:00 – 19:00';
  /* 開催時間の変更（p2-11「開催時間の変更」に対応）。定休曜でも登録があれば開場扱いにする。
     これにより初日2/18（水・定休曜）が13:00開場でカレンダーと整合する。 */
  var HOURS_EXC = {
    '2026-02-18': '13:00 – 19:00', /* 初日 */
    '2026-03-05': '11:00 – 17:00'  /* 最終日 */
  };

  /* イベント（p2-11「イベント」に対応）。time はフリーテキストで1日複数回セッションも表現。
     calTime はカレンダー行のコンパクト表示用（省略時は time を使用）。 */
  var EVENTS = [
    {
      date: '2026-02-21', dow: '土', time: '15:00–16:30', calTime: '15:00〜', type: 'talk', label: 'ギャラリートーク',
      title: '作家によるギャラリートーク 第1回',
      desc: '展示作品について作家自身が解説。参加無料・要予約（定員15名）。ギャラリーへお電話でご予約ください。'
    },
    {
      date: '2026-02-22', dow: '日', time: '①11:00〜 ②14:00〜 ③16:00〜（各回60分）', calTime: '11:00〜 他', type: 'workshop', label: 'ワークショップ',
      title: 'ドローイング・ワークショップ',
      desc: '1日3回開催。各回定員8名・参加費500円・当日受付。オノマトペをテーマに手を動かします。'
    },
    {
      date: '2026-02-28', dow: '土', time: '15:00–16:30', calTime: '15:00〜', type: 'talk', label: 'ギャラリートーク',
      title: '作家によるギャラリートーク 第2回',
      desc: '「オノマトペと絵画の関係性」をテーマに制作プロセスを深掘り。参加無料・要予約（定員15名）。ギャラリーへお電話でご予約ください。'
    },
    {
      date: '2026-03-05', dow: '木', time: '15:00–17:00', calTime: '15:00〜', type: 'special', label: 'スペシャルイベント',
      title: 'クロージング・トーク & レセプション',
      desc: '最終日特別トーク＋軽食付きレセプション。参加無料・予約不要。'
    }
  ];

  /* クリエイター在廊予定（p2-11「クリエイター在廊予定を入力する」アコーディオンに対応）。
     期間（from〜to）＋曜日フィルタ（dow）＋メモ。単日は from===to。 */
  var DOW_LABEL = { all: '全日', weekend: '土・日', 'weekend-hol': '土日祝', weekday: '平日', mon: '月', tue: '火', wed: '水', thu: '木', fri: '金', sat: '土', sun: '日' };
  var ATTENDANCE = [
    { name: '田中 透', from: '2026-02-18', to: '2026-02-18', dow: 'all',         memo: '初日・終日在廊予定' },
    { name: '田中 透', from: '2026-02-19', to: '2026-03-04', dow: 'weekend-hol', memo: '午後在廊予定（14:00頃〜）' },
    { name: '田中 透', from: '2026-03-05', to: '2026-03-05', dow: 'all',         memo: '最終日・終日在廊予定' }
  ];
  /* p2-11「会場利用案内」内クリエイター在廊（select#p211FacAttend：''=未設定/'yes'=在廊あり/'no'=在廊なし＋自由記述）に対応。
     この項目はそのままテキストで表示する（構造化リストへの再加工はしない）。在廊有無自体もラベルとして表示する。 */
  var FACILITY_ATTEND = {
    attend: 'yes',
    note: '田中透：初日・最終日は終日、会期中の土日祝は午後（14:00頃〜）在廊予定です。詳しい日程は下記の在廊予定表をご確認ください。'
  };
  var FACILITY_ATTEND_LABEL = { yes: '在廊あり', no: '在廊なし' };
  function isOpenDate(ds, dow) { return OPEN_DOW.indexOf(dow) !== -1 || !!HOURS_EXC[ds]; }
  function dowMatch(filter, dow) {
    switch (filter) {
      case 'all':         return true;
      case 'weekend':     return dow === 0 || dow === 6;
      case 'weekend-hol': return dow === 0 || dow === 6; /* 祝日はデモでは簡略 */
      case 'weekday':     return dow >= 1 && dow <= 5;
      default: return { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 }[filter] === dow;
    }
  }

  /* ── ユーティリティ ── */
  function dateStr(d) {
    var m = ('0' + (d.getMonth() + 1)).slice(-2), dd = ('0' + d.getDate()).slice(-2);
    return d.getFullYear() + '-' + m + '-' + dd;
  }
  function parseDate(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function isPast(d) { return d < TODAY; }
  function isToday(d) { return dateStr(d) === dateStr(TODAY); }

  /* ── 会期プログレスバー ── */
  (function () {
    var todayStr    = dateStr(TODAY);
    var startStr    = dateStr(START);
    var endStr      = dateStr(END);
    var beforeStart = todayStr < startStr;
    var afterEnd    = todayStr > endStr;
    var isFirstDay  = todayStr === startStr;
    var isLastDay   = todayStr === endStr;
    var total = (END - START) / 86400000;
    var elapsed = Math.min(Math.max((TODAY - START) / 86400000, 0), total);
    var pct = beforeStart ? 0 : afterEnd ? 100 : Math.round(elapsed / total * 100);
    var remain = Math.max(Math.round((END - TODAY) / 86400000), 0);

    var fill = document.getElementById('p2DateBarFill');
    var dot = document.getElementById('p2DateBarDot');
    var rl = document.getElementById('p2RemainLabel');
    var el = document.getElementById('p2Elapsed');
    var rd = document.getElementById('p2RemainDays');

    if (fill) fill.style.width = pct + '%';
    if (dot) dot.style.left = pct + '%';

    var progress = document.querySelector('.p2-1-date-bar__progress');
    if (progress) {
      progress.classList.toggle('p2-1-date-bar--before', beforeStart);
      progress.classList.toggle('p2-1-date-bar--ended',  afterEnd);
    }

    if (rl) {
      if (beforeStart) {
        rl.textContent = '開催まで' + Math.round((START - TODAY) / 86400000) + '日';
      } else if (afterEnd) {
        rl.textContent = '終了';
      } else if (isFirstDay) {
        rl.innerHTML = '今日から開催&emsp;残り' + remain + '日';
      } else if (isLastDay) {
        rl.innerHTML = '本日最終日&emsp;残り0日';
      } else {
        rl.textContent = '残り' + remain + '日';
      }
    }

    if (el) el.textContent = Math.max(Math.round(elapsed), 0);
    if (rd) rd.textContent = remain;
  })();

  /* ── ② 日別カレンダー（横1行） ── */
  (function() {
    var grid = document.getElementById('p2DailyGrid'); if (!grid) return;
    var days = [], cur = new Date(START);
    while (cur <= END) { days.push(new Date(cur)); cur.setDate(cur.getDate()+1); }
    var evMap  = {}; EVENTS.forEach(function(e) { evMap[e.date] = e; });
    var attSet = {};
    ATTENDANCE.forEach(function(a) {
      var c = parseDate(a.from), t = parseDate(a.to);
      for (; c <= t; c.setDate(c.getDate() + 1)) {
        var ds = dateStr(c), dow = c.getDay();
        if (isOpenDate(ds, dow) && dowMatch(a.dow, dow)) attSet[ds] = true;
      }
    });
    grid.innerHTML = days.map(function(d) {
      var ds = dateStr(d), dow = d.getDay();
      var isOpen = isOpenDate(ds, dow);
      var past = isPast(d), today = isToday(d);
      var attend = !!attSet[ds], ev = evMap[ds] || null;
      var cls = 'p2-1-cal-row';
      if (!isOpen) cls += ' p2-1-cal-row--closed';
      if (past)    cls += ' p2-1-cal-row--past';
      if (today)   cls += ' p2-1-cal-row--today';
      if (ev && ev.type === 'special') cls += ' p2-1-cal-row--special';
      var dateCell =
        '<div class="p2-1-cal-row__date">' +
          '<time datetime="'+ds+'" class="p2-1-cal-row__md">'+(d.getMonth()+1)+'.'+('0'+d.getDate()).slice(-2)+'</time>' +
          '<span class="p2-1-cal-row__dow">'+DOW_JA[dow]+'</span>' +
        '</div>';
      var dayHours = HOURS_EXC[ds] || DEFAULT_HOURS;
      var statusCell = isOpen
        ? '<div class="p2-1-cal-row__status">'+dayHours+'</div>'
        : '<div class="p2-1-cal-row__status p2-1-cal-row__status--closed">休み</div>';
      var badges = '';
      if (isOpen) {
        if (attend) badges += '<span class="p2-1-cal-row__badge p2-1-cal-row__badge--attend">クリエイター在廊</span>';
        if (ev) {
          var bc = ev.type === 'special' ? 'p2-1-cal-row__badge--special' : 'p2-1-cal-row__badge--event';
          badges += '<span class="p2-1-cal-row__badge '+bc+'">'+ev.label+' '+(ev.calTime||ev.time)+'</span>';
        }
      }
      var badgeCell = '<div class="p2-1-cal-row__badges">'+badges+'</div>';
      var ctaCell = '';
      if (isOpen && !past) {
        var t2 = encodeURIComponent('【個展】あなたが知らないオノマトペ @ Gallery SOIL 渋谷');
        var dp = ds.replace(/-/g,'');
        var hm = dayHours.split('–').map(function(s){ return s.trim().replace(':','')+'00'; });
        var url2 = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text='+t2+'&dates='+dp+'T'+hm[0]+'/'+dp+'T'+hm[1]+'&details='+encodeURIComponent('https://koten-navi.com/p2');
        ctaCell = '<a href="'+url2+'" target="_blank" rel="noopener" class="p2-1-cal-row__gcal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="11" height="11"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>カレンダーに追加</a>';
      } else if (isOpen && past) {
        var isCheckedIn = (ds === '2026-02-19');
        var ciCls = 'p2-1-cal-row__checkin' + (isCheckedIn ? ' is-active' : '');
        var ciLabel = isCheckedIn ? 'checked in' : 'check in';
        var ciSvg = isCheckedIn
          ? '<svg viewBox="0 0 16 16" fill="none"><circle cx="10" cy="5" r="4" fill="#3a90e0"/><circle cx="5" cy="11" r="2.4" fill="#3a90e0"/></svg>'
          : '<svg viewBox="0 0 16 16" fill="none"><circle cx="10" cy="5" r="4" fill="#7a8a99" opacity=".3"/><circle cx="5" cy="11" r="2.4" fill="#7a8a99" opacity=".3"/></svg>';
        ctaCell = '<button type="button" class="'+ciCls+'" onclick="openCheckinModal()">'+ciSvg+ciLabel+'</button>';
      }
      return '<div class="'+cls+'">'+dateCell+statusCell+badgeCell+ctaCell+'</div>';
    }).join('');
  })();

  /* ── ③ イベント シンプルリスト ── */
  (function() {
    var list = document.getElementById('p2EventList'); if (!list) return;
    list.innerHTML = EVENTS.map(function(e) {
      var past = isPast(parseDate(e.date));
      var bCls = e.type === 'special' ? 'p2-1-simple-item__badge p2-1-simple-item__badge--special' : 'p2-1-simple-item__badge';
      return (
        '<li class="p2-1-simple-item'+(past?' p2-1-simple-item--past':'')+'">' +
          '<div class="p2-1-simple-item__date">' +
            '<time datetime="'+e.date+'" class="p2-1-simple-item__md">'+e.date.slice(5).replace('-','.')+'</time>' +
            '<span class="p2-1-simple-item__dow">'+e.dow+'</span>' +
          '</div>' +
          '<div class="p2-1-simple-item__body">' +
            '<div class="p2-1-simple-item__meta"><span class="'+bCls+'">'+e.label+'</span><span class="p2-1-simple-item__time">'+e.time+'</span></div>' +
            '<div class="p2-1-simple-item__title">'+e.title+'</div>' +
            '<div class="p2-1-simple-item__desc">'+e.desc+'</div>' +
          '</div>' +
        '</li>'
      );
    }).join('');
  })();

  /* ── ④ 在廊予定（構造化スケジュール＝ATTENDANCE配列＋p2-11会場利用案内「クリエイター在廊」有無・自由記述をそのままテキスト表示） ── */
  (function() {
    var list   = document.getElementById('p2AttendanceGrid');
    var box    = document.getElementById('p2AttendanceText');
    var notice = document.getElementById('p2AttendanceNotice');
    var empty  = document.getElementById('p2AttendanceEmpty');
    if (!list && !box) return;
    var hasSchedule = ATTENDANCE.length > 0;
    var hasNote     = FACILITY_ATTEND.attend === 'yes' || FACILITY_ATTEND.attend === 'no';
    if (!hasSchedule && !hasNote) {
      if (notice) notice.hidden = true;
      if (list)   list.hidden = true;
      if (box)    box.hidden = true;
      if (empty)  empty.hidden = false;
      return;
    }
    function md(d) { return (d.getMonth()+1)+'/'+d.getDate(); }
    if (hasSchedule && list) {
      list.innerHTML = ATTENDANCE.map(function(a) {
        var f = parseDate(a.from), t = parseDate(a.to);
        var single = a.from === a.to;
        var sched = single
          ? (f.getMonth()+1)+'.'+('0'+f.getDate()).slice(-2)+'（'+DOW_JA[f.getDay()]+'）'
          : md(f)+'〜'+md(t)+' の'+DOW_LABEL[a.dow];
        var past = t < TODAY;
        var todayIn = TODAY >= f && TODAY <= t && dowMatch(a.dow, TODAY.getDay()) && isOpenDate(dateStr(TODAY), TODAY.getDay());
        return (
          '<li class="p2-1-simple-item'+(past?' p2-1-simple-item--past':'')+'">' +
            '<div class="p2-1-simple-item__body">' +
              '<div class="p2-1-simple-item__meta">' +
                '<span class="p2-1-simple-item__badge p2-1-simple-item__badge--attend">在廊</span>' +
                '<span class="p2-1-simple-item__time">'+sched+'</span>' +
              '</div>' +
              '<div class="p2-1-simple-item__title">'+a.name+(todayIn?' <span style="font-size:.68rem;color:#c0392b">(本日)</span>':'')+'</div>' +
              '<div class="p2-1-simple-item__desc">'+a.memo+'</div>' +
            '</div>' +
          '</li>'
        );
      }).join('');
    } else if (list) {
      list.hidden = true;
    }
    if (hasNote && box) {
      box.innerHTML = '<span class="p2-1-attendance-text__state">'+FACILITY_ATTEND_LABEL[FACILITY_ATTEND.attend]+'</span>'+FACILITY_ATTEND.note;
    } else if (box) {
      box.hidden = true;
    }
  })();

  /* ── 近くの展覧会ミニリスト ── */
  (function () {
    var el = document.getElementById('p2SubNearby'); if (!el) return;
    var NEARBY = [
      { title: '線と余白の詩学', venue: '渋谷アートラボ', bg: 'linear-gradient(155deg,#e0d8c8,#b4a88a)', tc: 'rgba(0,0,0,.28)', liaison: false },
      { title: '光の破片', venue: 'GALLERY X', bg: 'linear-gradient(155deg,#c8d0e0,#8898b8)', tc: 'rgba(255,255,255,.6)', liaison: true },
      { title: 'うつろい', venue: '東京都現代美術館', bg: 'linear-gradient(155deg,#d0c8e0,#8878b4)', tc: 'rgba(255,255,255,.6)', liaison: false },
      { title: '春の景色展', venue: '代官山ヒルサイドF', bg: 'linear-gradient(155deg,#f0e0d0,#c8a888)', tc: 'rgba(0,0,0,.28)', liaison: false },
    ];
    el.innerHTML += NEARBY.map(function (e) {
      return (
        '<a href="kotennavi-p2.html" class="p2-sub-near-item">' +
        '<div class="p2-sub-near-item__poster" style="background:' + e.bg + ';color:' + e.tc + '">' +
        (e.liaison ? '<div class="p2-sub-near-item__ldot"></div>' : '') +
        e.title.slice(0, 4) +
        '</div>' +
        '<div class="p2-sub-near-item__body">' +
        '<div class="p2-sub-near-item__name">' + e.title + '</div>' +
        '<div class="p2-sub-near-item__venue">' + e.venue + '</div>' +
        '</div>' +
        '<span class="sb sb-live"><span class="pulse"></span>開催中</span>' +
        '</a>'
      );
    }).join('');
  })();

  /* ── 末尾おすすめグリッド ── */
  renderP2SubRecGrid();

};

/* ────────────────────────────────────────────────────
   P2-2 開催場所
──────────────────────────────────────────────────── */
KTN.pages['p2-2'] = function () {
  var mapEl = document.querySelector('.p2-2-map');
  if (!mapEl) return;
  new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var iframe = mapEl.querySelector('iframe[data-src]');
      if (iframe) { iframe.src = iframe.dataset.src; }
      obs.disconnect();
    });
  }, { threshold: 0.1 }).observe(mapEl);
  /* ++ posted by card ++ */
  (function () {
    var el = document.getElementById('p2PostedByCard');
    if (!el || !window.P2_POSTED_BY) return;
    el.innerHTML = buildPersonCard(window.P2_POSTED_BY);
  })();
  renderP2SubRecGrid();
};

/* ────────────────────────────────────────────────────
   P2-3  詳細
──────────────────────────────────────────────────── */
KTN.pages['p2-3'] = function () {
  /* FAQ アコーディオン */
  document.querySelectorAll('.p2-3-faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = this.closest('.p2-3-faq-item');
      if (item) item.classList.toggle('is-open');
    });
  });

  /* interest! トグル */
  var iBtn = document.getElementById('p2-3-interest-btn');
  var iNum = document.getElementById('p2-3-interest-num');
  if (iBtn) {
    var on = false, base = 41;
    iBtn.addEventListener('click', function () {
      on = !on;
      iBtn.classList.toggle('is-active', on);
      iBtn.setAttribute('aria-pressed', on);
      if (iNum) iNum.textContent = base + (on ? 1 : 0);
      if (on && iBtn.animate) iBtn.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }],
        { duration: 220, easing: 'ease-out' });
    });
  }

  /* check in トグル */
  var cBtn = document.getElementById('p2-3-checkin-btn');
  var cNum = document.getElementById('p2-3-checkin-num');
  if (cBtn) {
    var cinOn = false, cBase = 9;
    cBtn.addEventListener('click', function () {
      cinOn = !cinOn;
      cBtn.classList.toggle('is-active', cinOn);
      if (cNum) cNum.textContent = cBase + (cinOn ? 1 : 0);
    });
  }
  /* ++ posted by card ++ */
  (function () {
    var el = document.getElementById('p2PostedByCard');
    if (!el || !window.P2_POSTED_BY) return;
    el.innerHTML = buildPersonCard(window.P2_POSTED_BY);
  })();
  renderP2SubRecGrid();
};

/* ────────────────────────────────────────────────────
   P2-4  出展者
──────────────────────────────────────────────────── */
KTN.pages['p2-4'] = function () {
  /* ++ posted by card ++ */
  (function () {
    var el = document.getElementById('p2PostedByCard');
    if (!el || !window.P2_POSTED_BY) return;
    el.innerHTML = buildPersonCard(window.P2_POSTED_BY);
  })();
  renderP2SubRecGrid();
};


/* ────────────────────────────────────────────────────
   P2-5  LIAISON作品一覧
──────────────────────────────────────────────────── */
KTN.pages['p2-5'] = function () {

  /* ── 作品データ（配列順＝管理画面 p2-12 の並び順） ── */
  var WORKS = [
    /* 田中 透 */
    { creator:'tanaka', name:'田中 透', title:'ふわふわ',           year:'2026', spec:'油彩・キャンバス / 45.5×38.0 cm', status:'sale',    plus:true,  bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', tc:'rgba(0,0,0,.28)',       interest:22 },
    { creator:'tanaka', name:'田中 透', title:'ドキドキ #3',         year:'2026', spec:'油彩・キャンバス / 53.0×45.5 cm', status:'sale',    plus:true,  bg:'linear-gradient(155deg,#f0d0d0,#c88080)', tc:'rgba(255,255,255,.6)', interest:18 },
    { creator:'tanaka', name:'田中 透', title:'ざわざわ（夜）', year:'2025', spec:'油彩・キャンバス / 72.7×60.6 cm', status:'nsale',   plus:false, bg:'linear-gradient(155deg,#3d3530,#1f1a18)', tc:'rgba(255,255,255,.55)', interest:31 },
    { creator:'tanaka', name:'田中 透', title:'シュワシュワ',       year:'2025', spec:'油彩・キャンバス / 38.0×45.5 cm', status:'sale',    plus:true,  bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)', tc:'rgba(0,0,0,.28)',       interest:14 },
    { creator:'tanaka', name:'田中 透', title:'オノマトペの庭', year:'2026', spec:'ミクストメディア / 60.6×50.0 cm',  status:'sold',    plus:true,  bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)', tc:'rgba(255,255,255,.6)', interest:41 },
    { creator:'tanaka', name:'田中 透', title:'言葉の断片 I',    year:'2024', spec:'油彩・麻布 / 53.0×45.5 cm',                status:'nsale',   plus:false, bg:'linear-gradient(155deg,#d8c8e8,#a888cc)', tc:'rgba(255,255,255,.6)', interest:9  },
    { creator:'tanaka', name:'田中 透', title:'言葉の断片 II',   year:'2024', spec:'油彩・麻布 / 45.5×38.0 cm',                status:'inquiry', plus:false, bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', tc:'rgba(255,255,255,.6)', interest:7  },
    /* 山田 葵 */
    { creator:'yamada', name:'山田 葵', title:'記憶の断層 #1',  year:'2025', spec:'写真・ジクレープリント / A2', status:'sale',  plus:true,  bg:'linear-gradient(155deg,#d0c8e0,#8878b4)', tc:'rgba(255,255,255,.6)', interest:16 },
    { creator:'yamada', name:'山田 葵', title:'記憶の断層 #2',  year:'2025', spec:'写真・ジクレープリント / A2', status:'sale',  plus:true,  bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', tc:'rgba(255,255,255,.6)', interest:12 },
    { creator:'yamada', name:'山田 葵', title:'光の解像度',     year:'2026', spec:'写真・ミクストメディア / 60×80 cm', status:'nsale', plus:false, bg:'linear-gradient(155deg,#e8d8c8,#c8a888)', tc:'rgba(0,0,0,.28)', interest:8 },
    /* 佐藤 一朗 */
    { creator:'sato',   name:'佐藤 一朗', title:'白樺の記憶',   year:'2025', spec:'木彫・彩色 / H24×W18×D12 cm', status:'negot', plus:true,  bg:'linear-gradient(155deg,#e0e8d0,#a0b888)', tc:'rgba(0,0,0,.28)', interest:11 },
    { creator:'sato',   name:'佐藤 一朗', title:'沈黙する形 #3', year:'2024', spec:'木版画 / 38.0×45.5 cm',                    status:'nsale', plus:false, bg:'linear-gradient(155deg,#d8c8b8,#a89878)', tc:'rgba(0,0,0,.28)', interest:5 },
  ];
  /* No.＝並び順の自動採番（1..N・管理画面の並び順由来・2026-07-19。手動 no は廃止） */
  WORKS.forEach(function (w, i) { w.no = i + 1; });

  var STATUS_BADGE = {
    sale:    '<span class="aws aws-sale">販売中</span>',
    negot:   '<span class="aws aws-negot">商談中</span>',
    inquiry: '<span class="aws aws-inquiry">要問合せ</span>',
    sold:    '<span class="aws aws-sold">SOLD</span>',
    nsale:   '<span class="aws aws-nsale">非売品</span>',
  };

  function renderWork(w) {
    var cardClass = 'p25c' + (w.status === 'sold' ? ' p25c--sold' : '');
    var ribbon    = w.status === 'sold' ? '<div class="aw__sold-ribbon"><div class="aw__sold-ribbon-inner">SOLD OUT</div></div>' : '';
    var statusMap = { sale: 'forsale', negot: 'forsale', inquiry: 'forsale', nsale: 'nsale', sold: 'sold' };
    var dataStatus = statusMap[w.status] || 'nsale';
    var svgHeart = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"/></svg>';
    var svgBtnOff = '<svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>';
    var noHtml = w.no ? '<span class="p25c__no">No.' + w.no + '</span>' : '';
    return '<a class="' + cardClass + '" href="./kotennavi-p6-1.html" data-creator="' + w.creator + '" data-status="' + dataStatus + '">' +
      '<div class="p25c__img">' +
        '<div class="p25c__img-bg" style="background:' + w.bg + '"></div>' +
        noHtml +
        '<div class="p25c__img-title" style="color:' + w.tc + '">' + w.title + '</div>' +
        ribbon +
      '</div>' +
      '<div class="p25c__body">' +
        '<div class="aw__badge-row"><span class="cb cb-content cb-artwork">artwork</span>' + (STATUS_BADGE[w.status] || '') + '</div>' +
        '<div class="aw__title-row"><div class="aw__title">' + w.title + '</div></div>' +
        '<div class="aw__creator p25c__creator-link" onclick="event.stopPropagation();event.preventDefault();location.href=\'./kotennavi-p4.html\'">' + w.name + '</div>' +
        '<div class="aw__spec">' + w.year + ' / ' + w.spec + '</div>' +
        '<div class="aw__action-row">' +
          '<span class="aw__counter">' + svgHeart + w.interest + '</span>' +
          '<button class="ktn-icon-btn" onclick="this.classList.toggle(\'on\');event.stopPropagation();event.preventDefault()">' +
            svgBtnOff +
            '<span class="tip">\u8208\u5473\u3042\u308b\uff01\u306b\u8ffd\u52a0\u3059\u308b</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</a>';
  }

  /* 作品グリッド描画 */
  var grid = document.getElementById('p25Grid');
  if (grid) {
    grid.innerHTML = WORKS.map(renderWork).join('');
  }

  /* watch ボタン テキスト切り替え */
  document.querySelectorAll('[data-action="watch"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = this.classList.contains('on');
      var txt = on ? this.dataset.on : this.dataset.off;
      var tip = on ? '\u30a6\u30a9\u30c3\u30c1\u4e2d \u2014 \u89e3\u9664\u3059\u308b' : '\u30a6\u30a9\u30c3\u30c1\u3059\u308b';
      // SVG は先頭子要素のまま保持して text ノードのみ更新
      var nodes = Array.from(this.childNodes);
      nodes.forEach(function (n) {
        if (n.nodeType === 3) { n.textContent = ' ' + txt + ' '; }
        if (n.nodeName === 'SPAN' && n.classList.contains('tip')) { n.textContent = tip; }
      });
    });
  });

  /* フィルター（販売状態別） */
  (function () {
    document.querySelectorAll('.p25-filter__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.p25-filter__btn').forEach(function (b) { b.classList.remove('is-active'); });
        this.classList.add('is-active');
        var f = this.dataset.filter;
        var cards = grid ? grid.querySelectorAll('.p25c') : [];
        var shown = 0;
        cards.forEach(function (c) {
          var show = (f === 'all' || c.dataset.status === f);
          c.hidden = !show;
          if (show) shown++;
        });
        var count = document.getElementById('p25WorksCount');
        if (count) count.textContent = '全' + shown + '点';
      });
    });
  })();

  /* ── 近くの展覧会 ── */
  (function () {
    var list = document.getElementById('p25NearbyList');
    if (!list) return;
    var NEARBY = [
      { title: '線と余白の詩学', venue: '渋谷アートラボ', bg: 'linear-gradient(155deg,#e0d8c8,#b4a88a)', tc: 'rgba(0,0,0,.28)', liaison: false },
      { title: '光の破片', venue: 'GALLERY X', bg: 'linear-gradient(155deg,#c8d0e0,#8898b8)', tc: 'rgba(255,255,255,.6)', liaison: true },
      { title: 'うつろい', venue: '東京都現代美術館', bg: 'linear-gradient(155deg,#d0c8e0,#8878b4)', tc: 'rgba(255,255,255,.6)', liaison: false },
    ];
    list.innerHTML = NEARBY.map(function (e) {
      return '<a href="kotennavi-p2.html" class="p2-sub-near-item">' +
        '<div class="p2-sub-near-item__poster" style="background:' + e.bg + ';color:' + e.tc + '">' +
        (e.liaison ? '<div class="p2-sub-near-item__ldot"></div>' : '') +
        e.title.slice(0, 4) +
        '</div>' +
        '<div class="p2-sub-near-item__body">' +
        '<div class="p2-sub-near-item__name">' + e.title + '</div>' +
        '<div class="p2-sub-near-item__venue">' + e.venue + '</div>' +
        '</div>' +
        '<span class="sb sb-live"><span class="pulse"></span>開催中</span>' +
        '</a>';
    }).join('');
  })();
  /* ++ posted by card ++ */
  (function () {
    var el = document.getElementById('p2PostedByCard');
    if (!el || !window.P2_POSTED_BY) return;
    el.innerHTML = buildPersonCard(window.P2_POSTED_BY);
  })();

  /* ++ recommended exhibitions ++ */
  renderP2SubRecGrid();

  /* ── 公開前プレビューバンド（本番＝「公開期間外 かつ オーナーor管理者」で表示。デモ＝ロール×公開期間ボタンで同条件を再現） ── */
  window.p25Period = window.p25Period || 'during';
  function applyOwner25() {
    var r = window.ktnState && window.ktnState.role;
    var canPreview = (r === 'user+creator' || r === 'user+gallery' || r === 'admin');
    var period = window.p25Period;
    var isOut = (period === 'before' || period === 'after');
    var show = canPreview && isOut;
    var band = document.getElementById('p25PreviewBand');
    if (band) band.hidden = !show;
    /* バンド文言を期間状態に合わせる（公開前／公開終了後） */
    var badgeLabel = document.getElementById('p25PreviewBadgeLabel');
    var desc = document.getElementById('p25PreviewDesc');
    if (badgeLabel) badgeLabel.textContent = (period === 'after') ? '公開終了プレビュー' : '公開前プレビュー';
    if (desc) desc.textContent = (period === 'after')
      ? 'このページは公開期間を終了したため、出品者と管理者のみ閲覧できます。'
      : 'このページは一般公開前のため、出品者と管理者のみ閲覧できます。';
    /* サブナビ作品タブにも「プレビュー」タグを同期（p2 側の入口タブと状態表現を揃える） */
    var tab = document.getElementById('p25SubnavLiaison');
    if (tab) {
      var tag = tab.querySelector('.p2-subnav__item-tag');
      tab.classList.toggle('p2-subnav__item--preview', show);
      if (show) { tab.dataset.liaisonTag = 'preview'; if (tag) tag.textContent = 'プレビュー'; }
      else { delete tab.dataset.liaisonTag; if (tag) tag.textContent = ''; }
    }
  }
  window.setP25Period = function (p, btn) {
    window.p25Period = p;
    document.querySelectorAll('.dbar .dbtn-p25period').forEach(function (b) { b.classList.remove('on'); });
    if (btn) btn.classList.add('on');
    applyOwner25();
  };
  applyOwner25();
  var _prevRenderP25 = window.ktnRender;
  window.ktnRender = function () { if (_prevRenderP25) _prevRenderP25(); applyOwner25(); };
};

/* ────────────────────────────────────────────────────
   P2-5-1  LIAISON+ 作品一覧
──────────────────────────────────────────────────── */
KTN.pages['p2-5-1'] = function () {

  /* ── 作品データ（価格付き・pending2件追加。配列順＝管理画面 p2-12-1 の並び順） ── */
  var WORKS = [
    /* 田中 透 */
    { creator:'tanaka', name:'田中 透', title:'ふわふわ',           year:'2026', spec:'油彩・キャンバス / 45.5×38.0 cm',      status:'sale',    price:88000,  plus:true,  bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', tc:'rgba(0,0,0,.28)',        interest:22 },
    { creator:'tanaka', name:'田中 透', title:'ドキドキ #3',         year:'2026', spec:'油彩・キャンバス / 53.0×45.5 cm',      status:'sale',    price:110000, plus:true,  bg:'linear-gradient(155deg,#f0d0d0,#c88080)', tc:'rgba(255,255,255,.6)',  interest:18 },
    { creator:'tanaka', name:'田中 透', title:'ざわざわ（夜）',      year:'2025', spec:'油彩・キャンバス / 72.7×60.6 cm',      status:'nsale',   price:null,   plus:false, bg:'linear-gradient(155deg,#3d3530,#1f1a18)', tc:'rgba(255,255,255,.55)', interest:31 },
    { creator:'tanaka', name:'田中 透', title:'シュワシュワ',        year:'2025', spec:'油彩・キャンバス / 38.0×45.5 cm',      status:'sale',    price:75000,  plus:true,  bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)', tc:'rgba(0,0,0,.28)',        interest:14 },
    { creator:'tanaka', name:'田中 透', title:'オノマトペの庭',      year:'2026', spec:'ミクストメディア / 60.6×50.0 cm',      status:'sold',    price:null,   plus:true,  bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)', tc:'rgba(255,255,255,.6)',  interest:41 },
    { creator:'tanaka', name:'田中 透', title:'言葉の断片 I',        year:'2024', spec:'油彩・麻布 / 53.0×45.5 cm',           status:'nsale',   price:null,   plus:false, bg:'linear-gradient(155deg,#d8c8e8,#a888cc)', tc:'rgba(255,255,255,.6)',  interest:9  },
    { creator:'tanaka', name:'田中 透', title:'言葉の断片 II',       year:'2024', spec:'油彩・麻布 / 45.5×38.0 cm',           status:'sale',    price:180000, plus:false, bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', tc:'rgba(255,255,255,.6)',  interest:7,  applicants:2 },
    { creator:'tanaka', name:'田中 透', title:'音の気配',            year:'2026', spec:'油彩・キャンバス / 45.5×38.0 cm',      status:'sale',    price:95000,  plus:true,  bg:'linear-gradient(155deg,#e8d8c0,#c4a870)', tc:'rgba(0,0,0,.3)',         interest:15, applicants:3 },
    /* 山田 葵 */
    { creator:'yamada', name:'山田 葵', title:'記憶の断層 #1',       year:'2025', spec:'写真・ジクレープリント / A2',           status:'sale',    price:55000,  plus:true,  bg:'linear-gradient(155deg,#d0c8e0,#8878b4)', tc:'rgba(255,255,255,.6)',  interest:16 },
    { creator:'yamada', name:'山田 葵', title:'記憶の断層 #2',       year:'2025', spec:'写真・ジクレープリント / A2',           status:'sale',    price:55000,  plus:true,  bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', tc:'rgba(255,255,255,.6)',  interest:12 },
    { creator:'yamada', name:'山田 葵', title:'光の解像度',          year:'2026', spec:'写真・ミクストメディア / 60×80 cm',    status:'nsale',   price:null,   plus:false, bg:'linear-gradient(155deg,#e8d8c8,#c8a888)', tc:'rgba(0,0,0,.28)',        interest:8  },
    { creator:'yamada', name:'山田 葵', title:'朝の残響',            year:'2026', spec:'写真・ジクレープリント / A1',           status:'sale',    price:68000,  plus:true,  bg:'linear-gradient(155deg,#d8e8d0,#88b880)', tc:'rgba(0,0,0,.28)',        interest:10, applicants:1 },
    /* 佐藤 一朗 */
    { creator:'sato',   name:'佐藤 一朗', title:'白樺の記憶',        year:'2025', spec:'木彫・彩色 / H24×W18×D12 cm',         status:'sale',    price:128000, plus:true,  bg:'linear-gradient(155deg,#e0e8d0,#a0b888)', tc:'rgba(0,0,0,.28)',        interest:11 },
    { creator:'sato',   name:'佐藤 一朗', title:'沈黙する形 #3',     year:'2024', spec:'木版画 / 38.0×45.5 cm',               status:'nsale',   price:null,   plus:false, bg:'linear-gradient(155deg,#d8c8b8,#a89878)', tc:'rgba(0,0,0,.28)',        interest:5  },
    { creator:'sato',   name:'佐藤 一朗', title:'刻まれた光 #2',     year:'2025', spec:'木彫・彩色 / H18×W15×D10 cm',         status:'negot',   price:98000,  plus:true,  bg:'linear-gradient(155deg,#e8dcc8,#c0a878)', tc:'rgba(0,0,0,.28)',        interest:9  },
    { creator:'sato',   name:'佐藤 一朗', title:'問いの形',          year:'2024', spec:'ブロンズ / H30×W12×D12 cm',           status:'inquiry', price:null,   plus:false, bg:'linear-gradient(155deg,#d8e0e8,#98a8b8)', tc:'rgba(0,0,0,.28)',        interest:4  },
  ];
  /* No.＝並び順の自動採番（1..N・管理画面の並び順由来・2026-07-19。手動 no は廃止） */
  WORKS.forEach(function (w, i) { w.no = i + 1; });

  var STATUS_BADGE = {
    sale:    '<span class="aws aws-sale">\u8ca9\u58f2\u4e2d</span>',
    negot:   '<span class="aws aws-negot">\u5546\u8ac7\u4e2d</span>',
    inquiry: '<span class="aws aws-inquiry">\u8981\u554f\u5408\u305b</span>',
    sold:    '<span class="aws aws-sold">SOLD</span>',
    nsale:   '<span class="aws aws-nsale">\u975e\u58f2\u54c1</span>',
  };

  function renderWork(w) {
    var cardClass = 'p25c' + (w.status === 'sold' ? ' p25c--sold' : '');
    var ribbon    = w.status === 'sold' ? '<div class="aw__sold-ribbon"><div class="aw__sold-ribbon-inner">SOLD OUT</div></div>' : '';
    var statusMap = { sale: 'forsale', negot: 'forsale', inquiry: 'forsale', nsale: 'nsale', sold: 'sold' };
    var dataStatus = statusMap[w.status] || 'nsale';
    var applicantsHtml = (w.status === 'sale' && w.applicants)
      ? '<span class="p25c__applicants">' + w.applicants + '\u4eba\u304c\u7533\u8fbc\u4e2d</span>'
      : '';
    var priceHtml = w.price
      ? '<div class="p25c__footer"><div class="p25c__footer-l">' + applicantsHtml + '</div><div class="p25c__price"><span class="p25c__price-currency">&yen;</span>' + w.price.toLocaleString() + '<span class="p25c__price-tax">\uff08\u7a0e\u8fbc\uff09</span></div></div>'
      : '';
    var consoleHtml = (w.status === 'sale' && w.applicants)
      ? '<div class="p25c__console-wrap">'
        + '<button class="p25c__console-btn ktn-action-btn ktn-action-btn--alert-dark"'
        + ' onclick="event.stopPropagation();event.preventDefault();p251GotoConsole()">'
        + '\u53d6\u5f15\u30c7\u30b9\u30af\u3078 \u2192</button>'
        + '</div>'
      : '';
    var svgHeart = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"/></svg>';
    var svgBtnOff = '<svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>';
    var noHtml = w.no ? '<span class="p25c__no">No.' + w.no + '</span>' : '';
    return '<a class="' + cardClass + '" href="#" data-creator="' + w.creator + '" data-status="' + dataStatus + '">' +
      '<div class="p25c__img">' +
        '<div class="p25c__img-bg" style="background:' + w.bg + '"></div>' +
        noHtml +
        '<div class="p25c__img-title" style="color:' + w.tc + '">' + w.title + '</div>' +
        ribbon +
      '</div>' +
      '<div class="p25c__body">' +
        '<div class="aw__badge-row"><span class="cb cb-content cb-artwork">artwork</span>' + (STATUS_BADGE[w.status] || '') + '</div>' +
        '<div class="aw__title-row"><div class="aw__title">' + w.title + '</div></div>' +
        '<div class="aw__creator p25c__creator-link" onclick="event.stopPropagation();event.preventDefault();location.href=\'./kotennavi-p4.html\'">' + w.name + '</div>' +
        '<div class="aw__spec">' + w.year + ' / ' + w.spec + '</div>' +
        '<div class="aw__action-row">' +
          '<span class="aw__counter">' + svgHeart + w.interest + '</span>' +
          '<button class="ktn-icon-btn" onclick="this.classList.toggle(\'on\');event.stopPropagation();event.preventDefault()">' +
            svgBtnOff +
            '<span class="tip">\u8208\u5473\u3042\u308b\uff01\u306b\u8ffd\u52a0\u3059\u308b</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      priceHtml +
      consoleHtml +
    '</a>';
  }

  /* 作品グリッド描画 */
  var grid = document.getElementById('p25Grid');
  if (grid) {
    grid.innerHTML = WORKS.map(renderWork).join('');
  }

  /* watch ボタン テキスト切り替え */
  document.querySelectorAll('[data-action="watch"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = this.classList.contains('on');
      var txt = on ? this.dataset.on : this.dataset.off;
      var tip = on ? '\u30a6\u30a9\u30c3\u30c1\u4e2d \u2014 \u89e3\u9664\u3059\u308b' : '\u30a6\u30a9\u30c3\u30c1\u3059\u308b';
      var nodes = Array.from(this.childNodes);
      nodes.forEach(function (n) {
        if (n.nodeType === 3) { n.textContent = ' ' + txt + ' '; }
        if (n.nodeName === 'SPAN' && n.classList.contains('tip')) { n.textContent = tip; }
      });
    });
  });

  /* フィルター（販売状態別） */
  (function () {
    document.querySelectorAll('.p25-filter__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.p25-filter__btn').forEach(function (b) { b.classList.remove('is-active'); });
        this.classList.add('is-active');
        var f = this.dataset.filter;
        var cards = grid ? grid.querySelectorAll('.p25c') : [];
        var shown = 0;
        cards.forEach(function (c) {
          var show = (f === 'all' || c.dataset.status === f);
          c.hidden = !show;
          if (show) shown++;
        });
        var count = document.getElementById('p25WorksCount');
        if (count) count.textContent = '\u5168' + shown + '\u70b9';
      });
    });
  })();
  /* ── creator/gallery本人: コンソールボタン表示制御 ── */
  window.p251GotoConsole = function () {
    var r = window.ktnState && window.ktnState.role;
    if (r === 'user+creator') window.location.href = 'kotennavi-p3-16.html';
    else if (r === 'user+gallery') window.location.href = 'kotennavi-p4-16.html';
  };

  window.p25Period = window.p25Period || 'during';
  function applyOwner251() {
    var r = window.ktnState && window.ktnState.role;
    var isOwner = (r === 'user+creator' || r === 'user+gallery');
    document.querySelectorAll('.p25c__console-wrap').forEach(function (el) {
      el.style.display = isOwner ? 'flex' : 'none';
    });
    /* 公開前プレビューバンド（本番＝「公開期間外 かつ オーナーor管理者」で表示。取引デスク導線〔console-wrap〕は期間に関わらず owner のみ） */
    var canPreview = (isOwner || r === 'admin');
    var period = window.p25Period;
    var isOut = (period === 'before' || period === 'after');
    var show = canPreview && isOut;
    var band = document.getElementById('p25PreviewBand');
    if (band) band.hidden = !show;
    /* バンド文言を期間状態に合わせる（公開前／公開終了後） */
    var badgeLabel = document.getElementById('p25PreviewBadgeLabel');
    var desc = document.getElementById('p25PreviewDesc');
    if (badgeLabel) badgeLabel.textContent = (period === 'after') ? '公開終了プレビュー' : '公開前プレビュー';
    if (desc) desc.textContent = (period === 'after')
      ? 'このページは公開期間を終了したため、出品者と管理者のみ閲覧できます。'
      : 'このページは一般公開前のため、出品者と管理者のみ閲覧できます。';
    /* サブナビ作品タブにも「プレビュー」タグを同期（p2 側の入口タブと状態表現を揃える） */
    var tab = document.getElementById('p25SubnavLiaison');
    if (tab) {
      var tag = tab.querySelector('.p2-subnav__item-tag');
      tab.classList.toggle('p2-subnav__item--preview', show);
      if (show) { tab.dataset.liaisonTag = 'preview'; if (tag) tag.textContent = 'プレビュー'; }
      else { delete tab.dataset.liaisonTag; if (tag) tag.textContent = ''; }
    }
  }
  window.setP25Period = function (p, btn) {
    window.p25Period = p;
    document.querySelectorAll('.dbar .dbtn-p25period').forEach(function (b) { b.classList.remove('on'); });
    if (btn) btn.classList.add('on');
    applyOwner251();
  };
  applyOwner251();
  var _prevRenderP251 = window.ktnRender;
  window.ktnRender = function () { if (_prevRenderP251) _prevRenderP251(); applyOwner251(); };

  /* ── 近くの展覧会 ── */
  (function () {
    var list = document.getElementById('p25NearbyList');
    if (!list) return;
    var NEARBY = [
      { title: '線と余白の詩学', venue: '渋谷アートラボ', bg: 'linear-gradient(155deg,#e0d8c8,#b4a88a)', tc: 'rgba(0,0,0,.28)', liaison: false },
      { title: '光の破片', venue: 'GALLERY X', bg: 'linear-gradient(155deg,#c8d0e0,#8898b8)', tc: 'rgba(255,255,255,.6)', liaison: true },
      { title: 'うつろい', venue: '東京都現代美術館', bg: 'linear-gradient(155deg,#d0c8e0,#8878b4)', tc: 'rgba(255,255,255,.6)', liaison: false },
    ];
    list.innerHTML = NEARBY.map(function (e) {
      return '<a href="kotennavi-p2.html" class="p2-sub-near-item">' +
        '<div class="p2-sub-near-item__poster" style="background:' + e.bg + ';color:' + e.tc + '">' +
        (e.liaison ? '<div class="p2-sub-near-item__ldot"></div>' : '') +
        e.title.slice(0, 4) +
        '</div>' +
        '<div class="p2-sub-near-item__body">' +
        '<div class="p2-sub-near-item__title">' + e.title + '</div>' +
        '<div class="p2-sub-near-item__venue">' + e.venue + '</div>' +
        '</div>' +
        '<span class="sb sb-live"><span class="pulse"></span>\u958b\u50ac\u4e2d</span>' +
        '</a>';
    }).join('');
  })();

  /* ++ posted by card ++ */
  (function () {
    var el = document.getElementById('p2PostedByCard');
    if (!el || !window.P2_POSTED_BY) return;
    el.innerHTML = buildPersonCard(window.P2_POSTED_BY);
  })();

  /* ++ recommended exhibitions ++ */
  renderP2SubRecGrid();
};

/* ────────────────────────────────────────────────────
   P6 共通データ（全3バリアント共用）
   no＝出品リスト（p2-5系）の並び順から導出される自動採番の表示値。
   デモでは直書き（p2-5/p2-5-1 の配列順位置と一致させる）。React では保存せず並び順から算出
──────────────────────────────────────────────────── */
var _p6Works = [
  { id:1, no:5, awid:'AW-C42-1847', title:'オノマトペの庭', titleEn:'Onomatopoeia Garden',
    creator:'田中 透', creatorEn:'Toru Tanaka',
    year:2026, medium:'キャンバスに油彩', size:'116.7×91.0cm',
    weight:'約3.2kg（額装込み）', framing:'木製フローティングフレーム（白木）',
    price:580000, qty:1, edition:null, condition:'新品・未展示', accessories:'真作証明書・作家サイン入り', status:'available',
    shipping:{ timing:'展覧会終了後（2026年3月下旬以降）', method:'ヤマト宅急便', anonymous:false },
    bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)',
    thumbs:[
      {bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)', label:'全体'},
      {bg:'linear-gradient(135deg,#9cc4b8,#5a8e7a)', label:'詳細①'},
      {bg:'linear-gradient(155deg,#d0e8e0,#8abba8)', label:'詳細②'},
      {bg:'linear-gradient(165deg,#c4d8d0,#7aaa98)', label:'展示'},
    ],
    desc:[
      '「ふわふわ」「ざわざわ」「きらきら」——日本語に豊富なオノマトペは、感覚の輪郭をことばで捉える独特の試みだ。田中透はその音響的なイメージを視覚的な形に変換することをライフワークとしており、本作はその集大成的な位置づけとなる大型作品である。',
      '画面中央に広がる緑がかった空間は、複数の「やわらかい音」が重なり合う「庭」を表している。F30号というスケールは、鑑賞者が作品の前に立ったとき、その場の空気ごと体験できるよう意図されている。',
    ],
    note:'「庭」という言葉を頭に浮かべたとき、まず耳に届いたのは「しんと静まり返った空気感」と「葉が揺れる微かな音」だった。その二つの感覚が混ざり合う瞬間を、画面の上で再現しようと試みた。',
    tags:['絵画','油彩','現代美術','抽象','オノマトペ','F30号','2026年制作'],
    extras:[
      { lbl:'その他', body:'油彩作品のため、直射日光・高温多湿の環境を避けて保管してください。額装ガラスは紫外線カットタイプを推奨します。フローティングフレーム仕様のため壁から数センチ浮かせて設置され、取付金具・ワイヤーが付属します。壁の耐荷重をご確認のうえ設置してください。' },
    ],
  },
  { id:2, no:1, awid:'AW-C42-1731', title:'ふわふわ', titleEn:'Fuwafuwa',
    creator:'田中 透', creatorEn:'Toru Tanaka',
    year:2026, medium:'キャンバスに油彩', size:'72.7×60.6cm',
    weight:null, framing:null,
    price:320000, qty:1, edition:null, status:'reserved',
    shipping:{ timing:'展覧会終了後（2026年3月下旬以降）', method:'ヤマト宅急便', anonymous:true },
    bg:'linear-gradient(155deg,#f0e8d0,#d4b896)',
    thumbs:[
      {bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', label:'全体'},
      {bg:'linear-gradient(145deg,#e0d4b8,#c4a47a)', label:'詳細①'},
      {bg:'linear-gradient(165deg,#f5eedd,#ddc49a)', label:'詳細②'},
    ],
    desc:['「ふわふわ」という音が持つ浮遊感・軽さ・曖昧さを、半透明の絵の具層を幾重にも重ねることで表現した作品。'],
    note:'「ふわふわ」と口に出したとき、舌の動きが生み出す柔らかさを、そのまま絵の具に置き換えたかった。',
    tags:['絵画','油彩','現代美術','抽象','F20号','2026年制作'],
    extras:[
      { lbl:'その他', body:'油彩・キャンバス作品です。直射日光と湿気を避け、温度変化の少ない環境での保管をお願いします。' },
    ],
  },
  { id:3, no:2, awid:'AW-C42-1808', title:'ドキドキ #3', titleEn:'Dokidoki #3',
    creator:'田中 透', creatorEn:'Toru Tanaka',
    year:2025, medium:'和紙に混合技法', size:'91.0×72.7cm',
    weight:'約2.8kg', framing:null,
    price:420000, qty:3, edition:'Ed. 3/10', status:'available',
    shipping:{ timing:'展覧会終了後（2026年3月下旬以降）', method:'ヤマト宅急便', anonymous:false },
    bg:'linear-gradient(155deg,#f0d0d0,#c88080)',
    thumbs:[
      {bg:'linear-gradient(155deg,#f0d0d0,#c88080)', label:'全体'},
      {bg:'linear-gradient(145deg,#e0b8b8,#b86868)', label:'詳細①'},
    ],
    desc:['「ドキドキ」シリーズ第3作。鼓動の不規則なリズムを、和紙の繊維の絡まり方と複数の画材の干渉として表現している。'],
    note:'和紙は、音を吸収する。アクリルを垂らすと弾き、墨は滲み、水彩は和紙の繊維に沿って走る。',
    tags:['絵画','混合技法','和紙','エディション','F25号','2025年制作'],
    extras:[],
  },
  { id:4, no:3, awid:'AW-C42-1839', title:'ざわざわ（夜）', titleEn:'Zawazawa (Night)',
    creator:'田中 透', creatorEn:'Toru Tanaka',
    year:2026, medium:'キャンバスにアクリル', size:'130.3×89.4cm',
    weight:'約5.1kg（額装込み）', framing:'黒塗りスチールフレーム',
    price:680000, qty:1, edition:null, status:'sold',
    shipping:{ timing:null, method:null, anonymous:false },
    bg:'linear-gradient(155deg,#3d3530,#1f1a18)',
    thumbs:[
      {bg:'linear-gradient(155deg,#3d3530,#1f1a18)', label:'全体'},
      {bg:'linear-gradient(145deg,#2a2420,#120e0c)', label:'詳細①'},
    ],
    desc:['展覧会最大の作品。「ざわざわ」という音が夜の文脈で持つ意味——不安、期待、複数の気配——を暗褐色から黒へと沈んでいくトーンで描いた。'],
    note:'深夜、窓の外から聞こえる「ざわざわ」は、葉の音か、人の気配か、自分の内側の音か——判別できない感覚がある。',
    tags:['絵画','アクリル','現代美術','F50号相当','2026年制作','SOLD'],
    extras:[],
  },
  /* LIAISON+オンライン取引完了デモ：p3-14 w9《ぱちぱち》と同一作品。
     soldOnline＝取引完了（システム事実）／collection.public＝購入者がコレクションルーム（p5-4）と
     当該作品を公開している場合のみ true（オプトイン・既定非表示） */
  { id:5, no:null, awid:'AW-C42-1798', title:'ぱちぱち', titleEn:'Pachipachi',
    creator:'田中 透', creatorEn:'Toru Tanaka',
    year:2025, medium:'キャンバスに油彩', size:'53.0×45.5cm',
    weight:null, framing:null,
    price:120000, qty:1, edition:null, status:'sold',
    soldOnline:true, collection:{ public:true, href:'kotennavi-p5-4.html' },
    shipping:{ timing:null, method:null, anonymous:false },
    bg:'linear-gradient(155deg,#e8d8b8,#c89858)',
    thumbs:[
      {bg:'linear-gradient(155deg,#e8d8b8,#c89858)', label:'全体'},
      {bg:'linear-gradient(145deg,#d8c4a0,#b88848)', label:'詳細①'},
    ],
    desc:['「ぱちぱち」——爆ぜる音、弾ける光。焚き火の火の粉や拍手のような、短く明滅する音の粒を、暖色の油彩ストロークで画面に散らした作品。個展「音のかたち、かたちの音」（2025年11月）に出品され、LIAISON+でのオンライン取引を経て現在は購入者の所蔵となっている。'],
    note:'手のひらで一瞬だけ鳴って消える音を、キャンバスの上に留めたかった。',
    tags:['絵画','油彩','現代美術','抽象','F10号','2025年制作','SOLD'],
    extras:[],
  },
];

var _p6DemoComments = {
  1:[
    { user:'R.S', type:'inquiry', bg:'linear-gradient(135deg,#f0d8e0,#c89aac)', date:'2026.02.20',
      body:'会場に実物を見に行きたいのですが、在廊予定はありますか？' },
    { user:'田中 透', type:'reply', isCreator:true, bg:'linear-gradient(135deg,#2a5f7a,#1a3f5a)', date:'2026.02.21',
      body:'2月25日（土）は終日在廊予定です。ぜひお越しいただければ嬉しいです。' },
    { user:'A.T', type:'inquiry', bg:'linear-gradient(135deg,#f0e0c0,#c8a070)', date:'2026.02.25',
      body:'この作品は額装なしでご提供いただくことはできますか？' },
    { user:'田中 透', type:'reply', isCreator:true, bg:'linear-gradient(135deg,#2a5f7a,#1a3f5a)', date:'2026.02.26',
      body:'申し訳ありませんが、今回は木製フローティングフレーム込みでのご提供となっております。' },
    { user:'T.K', type:'comment', bg:'linear-gradient(135deg,#d0d8f0,#8899cc)', date:'2026.03.15',
      purchased:false, stars:4,
      body:'会場で拝見しました。緑の色が穏やかで、ずっと見ていられる作品です。次回作も楽しみにしています。' },
    { user:'Y.M', type:'comment', bg:'linear-gradient(135deg,#b8d8cc,#6a9e8a)', date:'2026.03.28',
      purchased:true, stars:5,
      body:'展覧会で実物を見て一目惚れし、申込みました。自宅に届いて改めて向き合うと、光の当たり方によって全く違う表情を見せてくれます。大切にしていきます。' },
  ],
  2:[], 3:[], 4:[], 5:[],
};

/* おすすめ展覧会サンプルデータ */
var _p6RecWorks = [
  { id:'r1', title:'静けさの輪郭', titleEn:'Contours of Silence',
    creator:'佐藤 葵', venue:'Gallery amu 表参道',
    dates:'2026.04.05 — 04.19', status:'open',
    bg:'linear-gradient(155deg,#d0c8e8,#8878b0)' },
  { id:'r2', title:'余白と重力', titleEn:'Margins and Gravity',
    creator:'中村 海', venue:'VACANT 原宿',
    dates:'2026.03.28 — 04.06', status:'open',
    bg:'linear-gradient(155deg,#c8d8e8,#7898b0)' },
  { id:'r3', title:'音のかたち IV', titleEn:'Shape of Sound IV',
    creator:'田中 透', venue:'LVDB gallery 代官山',
    dates:'2026.04.12 — 04.26', status:'upcoming',
    bg:'linear-gradient(155deg,#e8d8c8,#b09878)' },
];

/* ── P6 共通ロジック（renderActionArea は opts で差し替え） ── */
function _p6Init(opts) {
  var ALL_WORKS = _p6Works;
  var SL = {available:'販売中', sold:'売約済み', reserved:'予約済', nfs:'販売なし', not_for_sale:'販売なし', inquiry:'要問合せ'};
  var SC = {available:'available', sold:'sold', reserved:'reserved', nfs:'nfs', not_for_sale:'nfs', inquiry:'inquiry'};
  function fmt(p) { return p ? '¥' + p.toLocaleString() : '—'; }

  var urlId = parseInt(new URLSearchParams(location.search).get('id')) || 1;
  var WORK = Object.assign({}, ALL_WORKS.find(function(w){ return w.id === urlId; }) || ALL_WORKS[0]);
  var RELATED = ALL_WORKS.filter(function(w){ return w.id !== WORK.id; });

  var _workPhase  = 'open';
  var _applyState = 'none';
  var _applyCount = 3;
  var mainFaved   = false;
  var relFavSet   = new Set();
  var _localComments = {};
  var _selectedStars = 0;
  var _postType = 'comment';
  var _deletedCids = {};
  var _cidCounter = 0;

  function isLoggedIn() { return KTN.role !== 'guest'; }
  function isOwner()    { return KTN.role === 'user+creator'; }
  function isAdmin()    { return KTN.role === 'admin'; }

  function dbtnGroup(fn) {
    document.querySelectorAll('.dbar .dbtn').forEach(function(b) {
      var oc = b.getAttribute('onclick') || '';
      if (oc.indexOf(fn + '(') === 0) b.classList.remove('on');
    });
  }

  function initPage() {
    var w = WORK;
    document.title = w.title + ' — ' + w.creator + ' | 個展なび';
    var el;
    el = document.getElementById('workTitle');
    if (el) el.innerHTML = '<span class="wh-title-kagi">《</span>' + w.title + '<span class="wh-title-kagi">》</span>';
    el = document.getElementById('workTitleEn');
    if (el) el.textContent = w.titleEn;
    el = document.getElementById('mainImgBg');
    if (el) el.style.background = w.thumbs[0].bg;
    el = document.getElementById('mainImgLabel');
    if (el) el.textContent = w.thumbs[0].label;
    el = document.getElementById('mainImgCorner');
    if (el) el.textContent = w.medium + '\n' + w.size;
    el = document.getElementById('thumbRow');
    if (el) el.innerHTML = w.thumbs.map(function(t, i) {
      return '<div class="wh-thumb' + (i === 0 ? ' active' : '') + '"' +
        ' style="background:' + t.bg + '"' +
        ' onclick="switchImg(this,\'' + t.bg.replace(/'/g, "\\'") + '\',\'' + t.label + '\')">' + t.label + '</div>';
    }).join('');
    renderSpecs(w);
    el = document.getElementById('workPrice');
    if (el) el.innerHTML = w.price
      ? fmt(w.price) + '<small>税込</small>'
      : '<span style="font-size:1rem;color:var(--lmuted)">販売なし</span>';
    el = document.getElementById('priceSub');
    if (el) el.innerHTML = w.price ? '<em>＋ 送料・梱包費は会期終了後に別途ご案内します</em>' : '';
    el = document.getElementById('descTitle');
    if (el) el.textContent = '《' + w.title + '》について';
    el = document.getElementById('descBody');
    if (el) el.innerHTML = w.desc.map(function(p) { return '<p>' + p + '</p>'; }).join('');
    el = document.getElementById('descTags');
    if (el) el.innerHTML = w.tags.map(function(t) { return '<span class="wd-tag">' + t + '</span>'; }).join('');
    /* 「その他」（extras）は作品仕様（#p6Specs）に全幅行として描画する（initExtra 内）。
       ※ 制作ノート（w.note）は現行レイアウトに表示枠が無く従来から未描画のためここでは扱わない（別途整備）。 */
    if (opts.initExtra) opts.initExtra(WORK);
  }

  function renderSpecs(w) {
    var isSold = _workPhase === 'sold' || w.status === 'sold';
    var badge = document.getElementById('workStatus');
    if (badge) {
      badge.className = 'wh-badge ' + (isSold ? 'sold' : (SC[w.status] || 'available'));
      badge.textContent = isSold ? '売約済み' : (SL[w.status] || SL.available);
    }
    var qtyVal = null;
    if (!isSold) {
      qtyVal = w.qty + '点 ' + (w.edition ? '<span class="wh-edition">' + w.edition + '</span>' : '');
    }
    var rows = [
      { lbl:'出品番号',   val: w.no ? 'No.' + w.no : null },
      { lbl:'作家',       val: w.creator + '（' + w.creatorEn + '）', always:true },
      { lbl:'制作年',     val: w.year ? w.year + '年' : null },
      { lbl:'素材・技法', val: w.medium },
      { lbl:'サイズ',     val: w.size },
      { lbl:'重さ',       val: w.weight },
      { lbl:'額装',       val: w.framing },
      { lbl:'作品点数/エディション', val: qtyVal },
      { lbl:'作品状態',   val: '新品・未展示' },
      { lbl:'付属品',     val: '真作証明書・作家サイン入り' },
      { lbl:'配送時期',   val: w.shipping ? w.shipping.timing : null },
      { lbl:'発送方法',   val: renderShipping(w.shipping) },
    ];
    if (opts.hideSpecRows) {
      rows = rows.filter(function(r) { return opts.hideSpecRows.indexOf(r.lbl) === -1; });
    }
    var el = document.getElementById('specsTable');
    if (el) el.innerHTML = rows
      .filter(function(r) { return r.always || (r.val && String(r.val).trim() !== ''); })
      .map(function(r) {
        return '<div class="wh-spec"><div class="wh-spec-lbl">' + r.lbl +
          '</div><div class="wh-spec-val">' + r.val + '</div></div>';
      }).join('');
  }

  function renderShipping(s) {
    if (!s || !s.method) return null;
    var anon = s.anonymous
      ? '<span class="wh-anon-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="1" y1="1" x2="23" y2="23"/></svg>匿名配送</span>'
      : '';
    return s.method + anon;
  }

  function favShareRow() {
    var on = mainFaved;
    return '<div class="wh-fav-row">' +
      '<button class="ktn-btn' + (on ? ' on' : '') + '" onclick="toggleInterest(this)" data-action="interest">' +
      '<svg viewBox="0 0 16 16" fill="none">' +
      '<path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"' +
      (on
        ? ' fill="#4da3f5" stroke="#4da3f5" stroke-width=".6" stroke-linejoin="round"'
        : ' fill="#7a8a99" fill-opacity=".45" stroke="#7a8a99" stroke-opacity=".3" stroke-width=".6" stroke-linejoin="round"') +
      '/></svg>' +
      (on ? '興味あり！済' : '興味あり！') +
      '<span class="tip">' + (on ? '興味ある！— 解除する' : '興味あり！に追加する') + '</span>' +
      '</button>' +
      '<button class="btn-share-sm" onclick="shareWork()">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' +
      'シェア</button></div>';
  }

  function toggleInterest() {
    if (KTN.role === 'guest') { openModal('loginModal'); return; }
    mainFaved = !mainFaved;
    renderActionArea();
  }

  function renderActionArea() {
    opts.renderActionArea(WORK, _workPhase, _applyState, _applyCount, isLoggedIn, favShareRow);
  }

  function switchImg(thumb, bg, label) {
    document.querySelectorAll('.wh-thumb').forEach(function(t) { t.classList.remove('active'); });
    thumb.classList.add('active');
    var el = document.getElementById('mainImgBg');
    if (el) el.style.background = bg;
    el = document.getElementById('mainImgLabel');
    if (el) el.textContent = label;
  }

  function toggleMainFav() {
    if (!isLoggedIn()) { openModal('loginModal'); return; }
    mainFaved = !mainFaved;
    renderActionArea();
  }

  function renderRelated() {
    if (opts.renderRelated) { opts.renderRelated(RELATED); return; }
    var el = document.getElementById('relGrid');
    if (!el) return;
    el.innerHTML = RELATED.map(function(w) {
      return '<div class="masonry-item"><a href="' + opts.relLink + '?id=' + w.id + '" class="rel-card">' +
        '<div class="rel-card-img">' +
        '<div class="rel-card-bg" style="background:' + w.bg + '">' + w.title + '</div>' +
        (w.status === 'sold' ? '<div class="rel-card-sold-ribbon">SOLD</div>' : '') +
        '<button class="rel-card-fav' + (relFavSet.has(w.id) ? ' active' : '') + '" onclick="toggleRelFav(event,' + w.id + ')" title="興味あり！">' +
        '<svg viewBox="0 0 24 24" stroke-width="2" fill="' + (relFavSet.has(w.id) ? 'currentColor' : 'none') + '"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor"/></svg>' +
        '</button></div>' +
        '<div class="rel-card-body">' +
        '<div class="rel-card-title">《' + w.title + '》</div>' +
        '<div class="rel-card-medium">' + w.year + '年 / ' + w.medium + '</div>' +
        '<div class="rel-card-footer">' +
        '<div class="rel-card-price">' + fmt(w.price) + '</div>' +
        '<div class="rel-card-status ' + (SC[w.status] || 'available') + '">' + (SL[w.status] || '') + '</div>' +
        '</div></div></a></div>';
    }).join('');
  }

  function toggleRelFav(e, id) {
    e.preventDefault(); e.stopPropagation();
    if (!isLoggedIn()) { openModal('loginModal'); return; }
    var btn = e.currentTarget;
    var svg = btn.querySelector('svg');
    if (relFavSet.has(id)) {
      relFavSet.delete(id); btn.classList.remove('active'); svg.setAttribute('fill', 'none');
    } else {
      relFavSet.add(id); btn.classList.add('active'); svg.setAttribute('fill', 'currentColor');
      btn.animate([{transform:'scale(1)'},{transform:'scale(1.35)'},{transform:'scale(.88)'},{transform:'scale(1)'}], {duration:280,easing:'ease-out'});
    }
  }

  function toggleFollow(btn) {
    btn.classList.toggle('following');
    btn.innerHTML = btn.classList.contains('following')
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><polyline points="20 6 9 17 4 12"/></svg>フォロー中'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>フォロー';
  }

  function openApplyModal() {
    var el = document.getElementById('amTitle');
    if (el) el.textContent = WORK.title + ' 購入申込';
    openModal('applyModal');
  }

  function submitApply() {
    if (!document.getElementById('amAgreeCheck').checked) { alert('注意事項への同意が必要です'); return; }
    closeModal('applyModal');
    _applyState = 'applied';
    _applyCount = _applyCount + 1;
    renderActionArea();
    alert('申込を受け付けました。\n申込番号：#0042\n購入可否は会期終了後にご連絡します。');
  }

  function openModal(id) { var el = document.getElementById(id); if (el) el.classList.add('open'); }
  function closeModal(id) { var el = document.getElementById(id); if (el) el.classList.remove('open'); }
  document.addEventListener('click', function(e) {
    ['loginModal','applyModal'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el && e.target === el) closeModal(id);
    });
  });

  function shareWork() {
    if (navigator.share) navigator.share({title: document.title, url: location.href});
    else copyLink();
  }
  function copyLink() {
    navigator.clipboard.writeText(location.href).then(function() { alert('URLをコピーしました'); });
  }

  var STAR_LABELS = ['','よくない','まあまあ','ふつう','よい','とてもよい'];
  function starsHtml(n, size) {
    return Array.from({length:5}, function(_, i) {
      return '<span class="cmt-star"' + (size ? ' style="font-size:' + size + '"' : '') + '>' +
        (i < n ? '★' : '☆') + '</span>';
    }).join('');
  }
  function calcAvg(list) {
    var rated = list.filter(function(c) { return c.stars > 0; });
    return rated.length ? (rated.reduce(function(s,c) { return s + c.stars; }, 0) / rated.length).toFixed(1) : null;
  }

  function renderComments() {
    var SHOW = 3;
    var raw = (_p6DemoComments[WORK.id] || []).concat(_localComments[WORK.id] || []);
    raw.forEach(function(c) { if (c._cid === undefined) c._cid = _cidCounter++; });
    var all = raw.filter(function(c) { return !_deletedCids[c._cid]; });
    var sorted = all.slice().reverse();
    var el;

    el = document.getElementById('commentsList');
    if (el) {
      if (!all.length) {
        el.innerHTML = '<div class="cmt-empty"><div class="cmt-empty-icon">💬</div>' +
          '<div class="cmt-empty-txt">まだコメント・お問い合わせはありません。<br>ログインして最初のコメントを投稿しましょう。</div></div>';
      } else {
        var cardHtml = function(c) {
          var isInq   = c.type === 'inquiry';
          var isReply = !!(c.isCreator || c.type === 'reply');
          var cardCls = isInq ? ' cmt-card--inquiry' : isReply ? ' cmt-card--reply' : '';
          var badge   = isInq
            ? '<span class="cmt-type-badge cmt-type-badge--inquiry">お問い合わせ</span>'
            : isReply
              ? '<span class="cmt-type-badge cmt-type-badge--reply">出品者の回答</span>'
              : '';
          var roleBadge = c.isCreator
            ? '<span class="cb cb-creator">creator</span>'
            : '<span class="cb cb-user">user</span>';
          return '<div class="cmt-card' + cardCls + '">' +
            '<div class="cmt-card-header">' +
            '<div class="cmt-avatar" style="background:' + (c.bg || 'var(--lbg3)') + '">' + c.user.slice(0,1) + '</div>' +
            '<div class="cmt-user"><div class="cmt-user-row">' +
            badge +
            roleBadge +
            '<span class="cmt-user-name">' + c.user + '</span>' +
            '<span class="cmt-user-date">' + c.date + '</span>' +
            ((isOwner() || isAdmin()) ? '<button class="cmt-delete-btn" onclick="deleteCmt(' + c._cid + ')" title="削除">✕</button>' : '') +
            '</div>' +
            (opts.noRating || isInq || isReply ? '' : '<div class="cmt-stars">' + starsHtml(c.stars) + '</div>') +
            '</div></div>' +
            '<div class="cmt-body">' + c.body + '</div></div>';
        };
        var visible = sorted.slice(0, SHOW);
        var older   = sorted.slice(SHOW);
        var html = visible.map(cardHtml).join('');
        if (older.length) {
          html += '<button class="cmt-more-btn" id="cmtMoreBtn" onclick="toggleCmtOlder()">' +
            '過去のコメントを見る（' + older.length + '件）</button>' +
            '<div class="cmt-older" id="cmtOlder" hidden>' + older.map(cardHtml).join('') + '</div>';
        }
        el.innerHTML = html;
      }
    }

    el = document.getElementById('commentPostArea');
    if (el) {
      if (!isLoggedIn()) {
        el.innerHTML = '<div class="cmt-login-prompt"><p>コメント・お問い合わせの投稿にはログインが必要です</p>' +
          '<button class="cmt-login-link" onclick="openModal(\'loginModal\')">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>' +
          'ログインする</button></div>';
        _selectedStars = 0;
        return;
      }
      var isInqTab = _postType === 'inquiry';
      var tabsHtml = '<div class="cmt-post-tabs">' +
        '<button class="cmt-post-tab' + (!isInqTab ? ' is-active' : '') + '" onclick="selectCmtType(\'comment\',this)">コメント</button>' +
        '<button class="cmt-post-tab' + (isInqTab ? ' is-active' : '') + '" onclick="selectCmtType(\'inquiry\',this)">お問い合わせ</button>' +
        '</div>';
      var starHtml = '';
      if (!opts.noRating && !isInqTab) {
        starHtml = '<div class="cmt-star-input"><span class="cmt-star-input-lbl">評価：</span>' +
          '<div class="cmt-star-row" id="starInputRow">' +
          [1,2,3,4,5].map(function(n) {
            return '<button class="cmt-star-btn" data-star="' + n + '" onclick="selectStar(' + n + ')">★</button>';
          }).join('') +
          '</div><span class="cmt-star-selected-lbl" id="starLabel">' +
          (_selectedStars ? STAR_LABELS[_selectedStars] : '') + '</span></div>';
      }
      var placeholder = isInqTab
        ? '作品についての質問や問い合わせ内容を入力してください。出品者に通知されます。'
        : 'この作品への感想をお書きください…';
      el.innerHTML = '<div class="cmt-post-box">' + tabsHtml + starHtml +
        '<textarea class="cmt-textarea" id="cmtInput" placeholder="' + placeholder + '"></textarea>' +
        '<div class="cmt-post-footer">' +
        '<button class="cmt-submit" onclick="submitComment()">' + (isInqTab ? '送る' : '投稿する') + '</button>' +
        '</div></div>';
      if (!opts.noRating && !isInqTab) updateStarUI(_selectedStars);
    }
  }

  function selectStar(n) { _selectedStars = n; updateStarUI(n); }
  function updateStarUI(n) {
    var row = document.getElementById('starInputRow');
    var lbl = document.getElementById('starLabel');
    if (!row) return;
    row.querySelectorAll('.cmt-star-btn').forEach(function(btn) {
      btn.classList.toggle('lit', parseInt(btn.dataset.star) <= n);
    });
    if (lbl) lbl.textContent = n ? STAR_LABELS[n] : '';
  }
  function submitComment() {
    var inp = document.getElementById('cmtInput');
    var txt = inp ? inp.value.trim() : '';
    var isInq = _postType === 'inquiry';
    if (!opts.noRating && !isInq && !_selectedStars) { alert('星評価を選んでください'); return; }
    if (!txt) { alert(isInq ? '内容を入力してください' : 'コメントを入力してください'); return; }
    var id = WORK.id;
    if (!_localComments[id]) _localComments[id] = [];
    _localComments[id].push({
      user:'あなた', bg:'linear-gradient(135deg,#ddeeff,#88aadd)',
      date: new Date().toLocaleDateString('ja-JP',{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g,'.'),
      type: isInq ? 'inquiry' : 'comment',
      purchased: _applyState === 'applied', stars: _selectedStars, body: txt,
    });
    _selectedStars = 0;
    renderComments();
  }

  function switchWork(id, btn) {
    var w = ALL_WORKS.find(function(x) { return x.id === id; });
    if (!w) return;
    Object.assign(WORK, w);
    RELATED.length = 0;
    ALL_WORKS.filter(function(x) { return x.id !== id; }).forEach(function(x) { RELATED.push(x); });
    dbtnGroup('switchWork');
    btn.classList.add('on');
    initPage();
    renderSpecs(w);
    renderActionArea();
    renderRelated();
    renderComments();
  }

  /* 旧実装は独自markupでヘッダーを描画し、共有 getActions() の出力（興味ありCTA・報告メニュー等）を
     上書きしていた。単一ソースの getActions() へ委譲し、p6/p6-1/p6-2 とも共通ヘッダー構成に揃える。 */
  function renderHeaderActs() {
    var el = document.getElementById('ktnActs');
    if (!el) return;
    el.innerHTML = getActions(window.ktnState.page, KTN.role);
  }

  function setR(role, btn) {
    KTN.role = role;
    window.ktnState.role = role;
    dbtnGroup('setR');
    btn.classList.add('on');
    renderHeaderActs();
    renderActionArea();
    renderComments();
  }

  function setPhase(phase, btn) {
    _workPhase = phase;
    dbtnGroup('setPhase');
    btn.classList.add('on');
    renderSpecs(WORK);
    renderActionArea();
  }

  function setApply(state, btn) {
    _applyState = state;
    dbtnGroup('setApply');
    btn.classList.add('on');
    renderActionArea();
  }

  /* グローバル公開 */
  window.renderHeaderActs   = renderHeaderActs;
  window.setR               = setR;
  window.setPhase           = setPhase;
  window.setApply           = setApply;
  window.switchWork         = switchWork;
  window.switchImg          = switchImg;
  window.toggleMainFav      = toggleMainFav;
  window.toggleInterest     = toggleInterest;
  window.toggleFollow       = toggleFollow;
  window.toggleSellerFollow = toggleFollow;
  window.openApplyModal     = openApplyModal;
  window.submitApply        = submitApply;
  window.openModal          = openModal;
  window.closeModal         = closeModal;
  window.shareWork          = shareWork;
  window.copyLink           = copyLink;
  window.selectStar         = selectStar;
  window.submitComment      = submitComment;
  window.toggleCmtOlder     = function() {
    var btn = document.getElementById('cmtMoreBtn');
    var older = document.getElementById('cmtOlder');
    if (!btn || !older) return;
    var opening = older.hidden;
    older.hidden = !opening;
    btn.textContent = opening
      ? '折りたたむ ▲'
      : '過去のコメントを見る（' + older.querySelectorAll('.cmt-card').length + '件）';
  };
  window.selectCmtType      = function(type) {
    _postType = type;
    renderComments();
  };
  window.deleteCmt          = function(cid) {
    if (!confirm('このコメントを削除しますか？')) return;
    _deletedCids[cid] = true;
    renderComments();
  };
  window.toggleRelFav       = toggleRelFav;

  function renderRecGrid() {
    var P6_REC = [
      { title: '\u300a\u9759\u3051\u3055\u306e\u8f2a\u90ed\u300b', creator: '\u4f50\u85e4 \u8475',
        bg: 'linear-gradient(160deg,#c8c0e0,#9080b8)', spec: '2025 / \u30a2\u30af\u30ea\u30eb\u30fb\u30ad\u30e3\u30f3\u30d0\u30b9' },
      { title: '\u300a\u4f59\u767d\u3068\u91cd\u529b\u300b', creator: '\u4e2d\u6751 \u6d77',
        bg: 'linear-gradient(160deg,#b0c8d8,#7898b0)', spec: '2026 / \u6cb9\u5f69\u30fb\u9ebb\u5e03' },
      { title: '\u300a\u97f3\u306e\u304b\u305f\u3061 IV\u300b', creator: '\u7530\u4e2d \u900f',
        bg: 'linear-gradient(160deg,#d8c8a8,#b0a080)', spec: '2025 / \u6df7\u5408\u6280\u6cd5\u30fb\u548c\u7d19' },
      { title: '\u300a\u5149\u306e\u65ad\u7247 #2\u300b', creator: '\u5c71\u7530 \u8475',
        bg: 'linear-gradient(160deg,#c8d8c0,#90b080)', spec: '2026 / \u5199\u771f\u30fb\u30b8\u30af\u30ec\u30fc\u30d7\u30ea\u30f3\u30c8' },
    ];
    var el = document.getElementById('p6RecGrid');
    if (!el) return;
    el.innerHTML = P6_REC.map(function(w) {
      return '<div class="masonry-item">' +
        '<a class="aw aw--portfolio" href="#">' +
        '<div class="aw__img"><div class="aw__img-ph" style="background:' + w.bg + ';min-height:180px"></div></div>' +
        '<div class="aw__body">' +
        '<div class="aw__badge-row"><span class="cb cb-content cb-artwork">artwork</span></div>' +
        '<div class="aw__title-row"><div class="aw__title">' + w.title + '</div></div>' +
        '<div class="aw__creator">' + w.creator + '</div>' +
        '<div class="aw__spec">' + w.spec + '</div>' +
        '</div></a></div>';
    }).join('');
  }

  /* 初期描画 */
  initPage();
  renderHeaderActs();
  renderActionArea();
  renderRelated();
  renderRecGrid();
  renderComments();
}

/* ────────────────────────────────────────────────────
   P2-6 作品リスト／プライスリスト（会場配布・QR・印刷兼用）
   read-only ビュー。1展覧会＝{LIAISON／LIAISON+}のいずれか。
   body.p2-6-plus = LIAISON+（プライスリスト・価格列あり）
   それ以外       = LIAISON（作品リスト・価格列なし）
──────────────────────────────────────────────────── */
KTN.pages['p2-6'] = function () {

  /* 出品作品（p2-5-1 と同一デモデータ。React 化時は works クエリから供給）
     配列の並び＝管理画面（p2-12-1）の並び順。No.は並び順で自動採番（1..N）のためデータには持たない */
  var WORKS = [
    { name:'田中 透',   title:'ふわふわ',        year:'2026', spec:'油彩・キャンバス / 45.5×38.0 cm', status:'sale',    price:88000  },
    { name:'田中 透',   title:'ドキドキ #3',     year:'2026', spec:'油彩・キャンバス / 53.0×45.5 cm', status:'sale',    price:110000 },
    { name:'田中 透',   title:'ざわざわ（夜）',  year:'2025', spec:'油彩・キャンバス / 72.7×60.6 cm', status:'nsale',   price:null   },
    { name:'田中 透',   title:'シュワシュワ',    year:'2025', spec:'油彩・キャンバス / 38.0×45.5 cm', status:'sale',    price:75000  },
    { name:'田中 透',   title:'オノマトペの庭',  year:'2026', spec:'ミクストメディア / 60.6×50.0 cm', status:'sold',    price:null   },
    { name:'田中 透',   title:'言葉の断片 I',    year:'2024', spec:'油彩・麻布 / 53.0×45.5 cm',      status:'nsale',   price:null   },
    { name:'田中 透',   title:'言葉の断片 II',   year:'2024', spec:'油彩・麻布 / 45.5×38.0 cm',      status:'sale',    price:180000 },
    { name:'田中 透',   title:'音の気配',        year:'2026', spec:'油彩・キャンバス / 45.5×38.0 cm', status:'sale',    price:95000  },
    { name:'山田 葵',   title:'記憶の断層 #1',   year:'2025', spec:'写真・ジクレープリント / A2',    status:'sale',    price:55000  },
    { name:'山田 葵',   title:'記憶の断層 #2',   year:'2025', spec:'写真・ジクレープリント / A2',    status:'sale',    price:55000  },
    { name:'山田 葵',   title:'光の解像度',      year:'2026', spec:'写真・ミクストメディア / 60×80 cm', status:'nsale', price:null   },
    { name:'山田 葵',   title:'朝の残響',        year:'2026', spec:'写真・ジクレープリント / A1',    status:'sale',    price:68000  },
    { name:'佐藤 一朗', title:'白樺の記憶',      year:'2025', spec:'木彫・彩色 / H24×W18×D12 cm',    status:'sale',    price:128000 },
    { name:'佐藤 一朗', title:'沈黙する形 #3',   year:'2024', spec:'木版画 / 38.0×45.5 cm',          status:'nsale',   price:null   },
    { name:'佐藤 一朗', title:'刻まれた光 #2',   year:'2025', spec:'木彫・彩色 / H18×W15×D10 cm',    status:'negot',   price:98000  },
    { name:'佐藤 一朗', title:'問いの形',        year:'2024', spec:'ブロンズ / H30×W12×D12 cm',      status:'inquiry', price:null   }
  ];

  /* 価格列（LIAISON+のみ）。販売状態は随時変化するため印刷リストに載せず、
     価格が公開されない作品（非売品・要問合せ・売約済等）は ASK と表示。
     現在の販売状態は各行リンク先の作品ページ(p6)を単一ソースにする。 */
  function priceCell(w) {
    if (w.price) return '<span class="p26-list__yen">￥' + w.price.toLocaleString() + '</span>';
    return '<span class="p26-list__ask">ASK</span>';
  }

  /* サムネイル（デモはプレースホルダ。React 化時は w.thumb の <img> に置換）。
     作品名から決定的な淡色を生成し、他カードと同じ「画像未登録の枠」を表現。 */
  function thumbCell(w) {
    var t = w.title || '', h = 0, i;
    for (i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) % 360;
    return '<span class="p26-list__thumb" aria-hidden="true" style="background:' +
      'linear-gradient(135deg,hsl(' + h + ',30%,86%),hsl(' + ((h + 38) % 360) + ',26%,74%))"></span>';
  }

  function render() {
    var plus = document.body.classList.contains('p2-6-plus');

    /* サービス見出し／販売期間の出し分け */
    var svcJa = document.getElementById('p26ServiceJa');
    var svcEn = document.getElementById('p26ServiceEn');
    if (svcJa) svcJa.textContent = '作品リスト';
    if (svcEn) svcEn.textContent = 'Artwork List';
    var badge = document.getElementById('p26ServiceBadge');
    if (badge) badge.innerHTML = plus
      ? '<span class="lb-dot li-plus">LIAISON+</span>'
      : '<span class="lb-dot">LIAISON</span>';
    var salebox = document.getElementById('p26SaleNote');
    if (salebox) salebox.style.display = plus ? '' : 'none';

    var mount = document.getElementById('p26ListMount');
    if (!mount) return;

    var priceHead  = plus ? '<th class="p26-list__th p26-list__th--price">価格（税込）</th>' : '';
    var thead =
      '<thead><tr>' +
        '<th class="p26-list__th p26-list__th--no">No.</th>' +
        '<th class="p26-list__th p26-list__th--thumb" aria-label="図版"></th>' +
        '<th class="p26-list__th p26-list__th--title">作品名</th>' +
        '<th class="p26-list__th p26-list__th--artist">作家</th>' +
        '<th class="p26-list__th p26-list__th--spec">技法・サイズ</th>' +
        '<th class="p26-list__th p26-list__th--year">制作年</th>' +
        priceHead +
      '</tr></thead>';

    /* No.＝並び順の自動採番（1..N）。データの no は廃止・2026-07-19 */
    var body = WORKS.map(function (w, i) {
      var noCell = i + 1;
      var priceCol = plus
        ? '<td class="p26-list__td p26-list__td--price" data-label="価格（税込）">' + priceCell(w) + '</td>'
        : '';
      return '<tr class="p26-list__row" tabindex="0" role="link" onclick="location.href=\'./kotennavi-p6.html\'">' +
          '<td class="p26-list__td p26-list__td--no" data-label="No.">' + noCell + '</td>' +
          '<td class="p26-list__td p26-list__td--thumb">' + thumbCell(w) + '</td>' +
          '<td class="p26-list__td p26-list__td--title" data-label="作品名">' + w.title + '</td>' +
          '<td class="p26-list__td p26-list__td--artist" data-label="作家">' + w.name + '</td>' +
          '<td class="p26-list__td p26-list__td--spec" data-label="技法・サイズ">' + w.spec + '</td>' +
          '<td class="p26-list__td p26-list__td--year" data-label="制作年">' + w.year + '</td>' +
          priceCol +
        '</tr>';
    }).join('');

    mount.innerHTML = '<table class="p26-list">' + thead + '<tbody>' + body + '</tbody></table>';

    var cnt = document.getElementById('p26Count');
    if (cnt) cnt.textContent = '全' + WORKS.length + '点';
  }

  /* デモ：サービス種別トグル（本番は展覧会設定で一意） */
  window.p26SetVariant = function (v, btn) {
    document.body.classList.toggle('p2-6-plus', v === 'plus');
    if (btn) {
      var bar = btn.parentNode;
      if (bar) bar.querySelectorAll('.dbtn').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
    render();
  };

  render();
};

/* ────────────────────────────────────────────────────
   P6 作品詳細（通常版）
──────────────────────────────────────────────────── */
KTN.pages['p6'] = function() {
  _p6Init({
    relLink: 'kotennavi-p6.html',
    noRating: true,
    hideSpecRows: ['額装','作品点数/エディション','作品状態','付属品','配送時期','発送方法'],
    renderRelated: function() {
      var MORE_BY = [
        { title: '\u3075\u308f\u3075\u308f',    bg: 'linear-gradient(155deg,#f0e8d0,#d4b896)', spec: '2025 / \u6cb9\u5f69\u30fb\u30ad\u30e3\u30f3\u30d0\u30b9 / 72.7\xd760.6cm', count: 12, href: '#' },
        { title: '\u30c9\u30ad\u30c9\u30ad #3', bg: 'linear-gradient(155deg,#f0d0d0,#c88080)', spec: '2025 / \u6cb9\u5f69\u30fb\u30ad\u30e3\u30f3\u30d0\u30b9 / 53.0\xd745.5cm', count:  5, href: '#' },
        { title: '\u3056\u308f\u3056\u308f\uff08\u591c\uff09', bg: 'linear-gradient(155deg,#3d3530,#1f1a18)', spec: '2024 / \u6cb9\u5f69\u30fb\u30d1\u30cd\u30eb / 91.0\xd772.7cm', count: 18, href: '#' },
      ];
      var grid = document.getElementById('p6MoreByGrid');
      if (grid) {
        grid.innerHTML = MORE_BY.map(function(w) {
          return '<a class="aw" href="' + w.href + '" data-liaison="normal" data-status="nsale">' +
            '<div class="aw__img">' +
              '<div class="aw__img-ph" style="background:' + w.bg + ';aspect-ratio:1/1">' +
                '<div class="aw__img-ph-text">\u300a' + w.title + '\u300b</div>' +
              '</div>' +
            '</div>' +
            '<div class="aw__body">' +
              '<div class="aw__badge-row"><span class="cb cb-content cb-artwork">artwork</span></div>' +
              '<div class="aw__title-row"><div class="aw__title">\u300a' + w.title + '\u300b</div></div>' +
              '<div class="aw__spec">' + w.spec + '</div>' +
              '<div class="aw__action-row">' +
                '<span class="aw__counter">' +
                  '<svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"/></svg>' +
                  w.count +
                '</span>' +
                '<button class="ktn-icon-btn" data-action="interest" onclick="handleAction(this,\'interest\');event.preventDefault()">' +
                  '<svg viewBox="0 0 16 16" fill="none" width="15" height="15"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>' +
                  '<span class="tip">\u8208\u5473\u3042\u308b\uff01\u306b\u8ffd\u52a0\u3059\u308b</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</a>';
        }).join('');
      }
    },
    initExtra: function(w) {
      var el;
      /* メイン画像 */
      el = document.getElementById('p6MainImg');
      if (el && w.thumbs && w.thumbs[0]) el.style.background = w.thumbs[0].bg;
      /* キャプション */
      el = document.getElementById('p6Caption');
      if (el && w.thumbs && w.thumbs[0]) el.textContent = w.thumbs[0].label;
      /* タイトル */
      el = document.getElementById('p6Title');
      if (el) el.textContent = w.title;
      el = document.getElementById('p6TitleEn');
      if (el) el.textContent = w.titleEn;
      /* \u30d0\u30c3\u30b8\u884c\uff1a\u58f2\u7d04\u6e08\u4f5c\u54c1\u306f aws \u30d0\u30c3\u30b8\u3092\u4f75\u8a18\uff08\u624b\u52d5\u58f2\u7d04\u6e08\uff0f\u30aa\u30f3\u30e9\u30a4\u30f3\u53d6\u5f15\u5b8c\u4e86\u3068\u3082
         \u516c\u958b\u30da\u30fc\u30b8\u3067\u306f\u540c\u3058\u300c\u58f2\u7d04\u6e08\u300d\u8868\u793a\uff1d\u6765\u5834\u8005\u306b\u306f\u533a\u5225\u3057\u306a\u3044\uff09 */
      el = document.getElementById('p6BadgeRow');
      if (el) el.innerHTML = '<span class="cb cb-content cb-artwork">artwork</span>'
        + (w.status === 'sold' ? '<span class="aws aws-sold">\u58f2\u7d04\u6e08</span>' : '');
      /* \u73fe\u5728\u306e\u6240\u8535\uff1a\u30aa\u30f3\u30e9\u30a4\u30f3\u53d6\u5f15\u5b8c\u4e86\uff0b\u8cfc\u5165\u8005\u304c\u30b3\u30ec\u30af\u30b7\u30e7\u30f3\u30eb\u30fc\u30e0\uff08p5-4\uff09\u3068
         \u5f53\u8a72\u4f5c\u54c1\u3092\u516c\u958b\u3057\u3066\u3044\u308b\u5834\u5408\u306e\u307f\u8868\u793a\uff08\u30aa\u30d7\u30c8\u30a4\u30f3\u30fb\u65e2\u5b9a\u975e\u8868\u793a\uff09 */
      el = document.getElementById('p6Provenance');
      if (el) el.hidden = !(w.soldOnline && w.collection && w.collection.public);
      /* 作品ID（自動採番）＝作品ごとに切替 */
      el = document.querySelector('.p6-specs-id__value');
      if (el && w.awid) el.textContent = w.awid;
      /* 仕様 dl（2カラム用） */
      var edition = w.edition
        ? (w.qty + '\u70b9 / ' + w.edition)
        : '1\u70b9\uff08\u30a8\u30c7\u30a3\u30b7\u30e7\u30f3\u306a\u3057\uff09';
      var specs = [
        { lbl:'\u51fa\u54c1\u756a\u53f7', val: w.no ? 'No.' + w.no : null },
        { lbl:'\u4f5c\u5bb6',         val: w.creator + '\uff08' + w.creatorEn + '\uff09', always: true },
        { lbl:'\u5236\u4f5c\u5e74',   val: w.year ? w.year + '\u5e74' : null },
        { lbl:'\u7d20\u6750\u30fb\u6280\u6cd5', val: w.medium },
        { lbl:'\u30b5\u30a4\u30ba',   val: w.size },
        { lbl:'\u91cd\u3055',         val: w.weight },
        { lbl:'\u30a8\u30c7\u30a3\u30b7\u30e7\u30f3', val: edition, always: true },
        { lbl:'\u984d\u88c5',         val: w.framing },
        { lbl:'\u4f5c\u54c1\u72b6\u614b', val: w.condition },
        { lbl:'\u4ed8\u5c5e\u54c1',   val: w.accessories },
      ];
      el = document.getElementById('p6Specs');
      if (el) {
        var specHtml = specs
          .filter(function(r) { return r.always || r.val; })
          .map(function(r) { return '<dt>' + r.lbl + '</dt><dd>' + r.val + '</dd>'; })
          .join('');
        /* 「その他」（extras）は仕様の補足として末尾に全幅行で追加（長文のため 2カラム grid をまたぐ） */
        specHtml += (w.extras || []).map(function(ex) {
          return '<dt class="p6-hero__specs-full p6-hero__specs-full--lbl">' + ex.lbl + '</dt>' +
            '<dd class="p6-hero__specs-full">' + ex.body + '</dd>';
        }).join('');
        el.innerHTML = specHtml;
      }
      /* サムネイル */
      el = document.getElementById('p6Thumbs');
      if (el && w.thumbs) {
        el.innerHTML = w.thumbs.map(function(t, i) {
          return '<div class="p6-hero__thumb' + (i === 0 ? ' is-active' : '') + '"' +
            ' style="background:' + t.bg + '"' +
            ' onclick="switchImg(this,\'' + t.bg.replace(/'/g, "\\'") + '\',\'' + t.label + '\')"></div>';
        }).join('');
      }
      /* 作品タイトル（ABOUT THIS WORK セクション） */
      el = document.getElementById('p6AboutTitle');
      if (el) el.textContent = w.title;
      /* 関連記事 */
      el = document.getElementById('p6Articles');
      if (el) {
        var articles = [
          {
            date: '2026.03.05',
            title: '\u300e' + w.title + '\u300f\u5236\u4f5c\u306b\u3064\u3044\u3066 \u2014\u2014 \u97f3\u306e\u304b\u305f\u3061\u3092\u63a2\u3057\u3066',
            excerpt: w.creator + '\u304c\u8a9e\u308b\u3001\u97f3\u3092\u7d75\u753b\u306b\u5909\u63db\u3059\u308b\u30d7\u30ed\u30bb\u30b9\u3068\u306f\u3002\u5236\u4f5c\u73fe\u5834\u306b\u5bc6\u7740\u3057\u3001\u305d\u306e\u601d\u60f3\u3068\u6280\u6cd5\u306b\u8feb\u3063\u305f\u3002',
            href: 'kotennavi-p7.html',
          },
          {
            date: '2025.11.20',
            title: w.creator + '\u30a4\u30f3\u30bf\u30d3\u30e5\u30fc\uff1a\u8a00\u8a9e\u3068\u7d75\u753b\u306e\u3042\u3044\u3060\u3067',
            excerpt: '\u300c\u8a00\u8449\u306f\u97f3\u3067\u3042\u308a\u3001\u8272\u3067\u3042\u308a\u3001\u89e6\u611f\u3067\u3082\u3042\u308b\u300d\u2014\u2014\u72ec\u81ea\u306e\u8868\u73fe\u3092\u8ffd\u3044\u7d9a\u3051\u308b\u30a2\u30fc\u30c6\u30a3\u30b9\u30c8\u306e\u54f2\u5b66\u306b\u8feb\u308b\u3002',
            href: 'kotennavi-p7.html',
          },
          {
            date: '2026.03.10',
            title: '\u5c55\u8a55\uff1a' + w.title + '\u300c' + w.creator + '\u300d',
            excerpt: '\u8a00\u8a9e\u3068\u611f\u899a\u306e\u5883\u754c\u3092\u554f\u3044\u7d9a\u3051\u308b' + w.creator + '\u306e\u65b0\u4f5c\u7fa4\u3002Gallery\u3067\u306e\u500b\u5c55\u3092\u632f\u308a\u8fd4\u308b\u3002',
            href: 'kotennavi-p7.html',
          },
        ];
        el.innerHTML =
          '<div class="p6-article__head-ttl">作品の記事<span class="ktn-sec-en">Articles</span></div>' +
          articles.map(function(a) {
            return '<a class="p6-article-item" href="' + a.href + '">' +
              '<div class="p6-article__badge-row">' +
              '<span class="cb cb-content cb-article">article</span>' +
              '</div>' +
              '<div class="p6-article__title">' + a.title + '</div>' +
              '<div class="p6-article__meta-row">' +
              '<span class="p6-article__date">' + a.date + '</span>' +
              '</div>' +
              '<div class="p6-article__excerpt">' + a.excerpt + '</div>' +
              '</a>';
          }).join('');
      }
    },
    renderActionArea: function() {},
  });
  window.toggleInterest = function(btn) {
    if (KTN.role === 'guest') { openModal('loginModal'); return; }
    btn.classList.toggle('is-active');
  };
  window.doShare = function() { shareWork(); };
  window.switchImg = function(thumb, bg, label) {
    document.querySelectorAll('.p6-hero__thumb').forEach(function(t) { t.classList.remove('is-active'); });
    thumb.classList.add('is-active');
    var el = document.getElementById('p6MainImg');
    if (el) el.style.background = bg;
    el = document.getElementById('p6Caption');
    if (el) el.textContent = label;
  };

  // 作品IDコピーボタン
  document.querySelectorAll('.p6-specs-id__copy').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var row = btn.closest('.p6-specs-id');
      var val = row ? row.querySelector('.p6-specs-id__value') : null;
      if (!val) return;
      var text = val.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = '✓';
          setTimeout(function() { btn.textContent = '⎘'; }, 1500);
        });
      }
    });
  });

  /* ++ posted by card ++ */
  (function () {
    var el = document.getElementById('p6PostedByCard');
    if (!el || !window.P2_POSTED_BY) return;
    el.innerHTML = buildPersonCard(window.P2_POSTED_BY);
  })();

  /* QRシェアモーダルは KTN.cta.openQrModal に統一 */
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.closeQrModal(); });
};

/* ────────────────────────────────────────────────────
   P6-1 作品詳細（LIAISON 非売品版）
──────────────────────────────────────────────────── */
KTN.pages['p6-1'] = function() {
  /* p6 共通描画処理を呼び出す（ABOUT・コメント・More by・各種ウィジェット） */
  if (typeof KTN.pages['p6'] === 'function') KTN.pages['p6']();

  /* p6-1 固有：スライドデータ上書き */
  var SLIDES = [
    { bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)', label:'全体',
      caption:'全体 — キャンバスに油彩 116.7×91.0cm' },
    { bg:'linear-gradient(135deg,#9cc4b8,#5a8e7a)', label:'詳細①',
      caption:'詳細① — 中央部分のテクスチャー' },
    { bg:'linear-gradient(155deg,#d0e8e0,#8abba8)', label:'詳細②',
      caption:'詳細② — 左上の筆致' },
    { bg:'linear-gradient(165deg,#c4d8d0,#7aaa98)', label:'展示',
      caption:'展示 — Gallery SOIL 渋谷 展示風景' },
  ];

  /* メイン画像初期化 */
  var mainImg = document.getElementById('p6MainImg');
  var captionEl = document.getElementById('p6Caption');
  if (mainImg && SLIDES.length) {
    mainImg.style.background = SLIDES[0].bg;
    if (captionEl) captionEl.textContent = SLIDES[0].caption;
  }

  /* サムネイル生成 */
  var thumbsEl = document.getElementById('p6Thumbs');
  if (thumbsEl) {
    thumbsEl.innerHTML = SLIDES.map(function(s, i) {
      return '<div class="p6-hero__thumb' + (i===0?' is-active':'') + '"'
        + ' style="background:' + s.bg + '"'
        + ' onclick="p6SwitchImg(this,\'' + s.bg + '\',\'' + s.caption + '\')">'
        + '</div>';
    }).join('');
  }

  /* 画像切り替え関数 */
  window.p6SwitchImg = function(thumb, bg, caption) {
    document.querySelectorAll('.p6-hero__thumb').forEach(function(t) {
      t.classList.remove('is-active');
    });
    thumb.classList.add('is-active');
    var mainImg = document.getElementById('p6MainImg');
    if (mainImg) mainImg.style.background = bg;
    var captionEl = document.getElementById('p6Caption');
    if (captionEl) captionEl.textContent = caption;
  };

};

/* ────────────────────────────────────────────────────
   P6-2 作品詳細（LIAISON+ 販売版）
──────────────────────────────────────────────────── */
KTN.pages['p6-2'] = function() {
  /* p6 共通描画処理を呼び出す（ABOUT・コメント・More by・各種ウィジェット・モーダル関数） */
  if (typeof KTN.pages['p6'] === 'function') KTN.pages['p6']();

  var applyBtn  = document.getElementById('p62ApplyBtn');
  var cancelBtn = document.getElementById('p62CancelApplyBtn');
  var deskBtn   = document.getElementById('p62DeskBtn');
  var queueEl   = document.getElementById('p62ApplyQueue');
  var _applied  = false;  /* 申込本人かどうか（デモ：申込確定で true） */

  /* 申込状態・ロールに応じてボタンを出し分け
     - creator本人: 申込ボタンを無効化＋取引デスクボタン表示（従来通り）
     - 申込前（非オーナー）: 「購入申込をする」
     - 申込本人（非オーナー）: 「申込をキャンセル」 */
  function renderApplyP62() {
    var isOwner = (KTN.role === 'user+creator');
    var showCancel = (!isOwner && _applied);
    if (deskBtn)  deskBtn.style.display = isOwner ? '' : 'none';
    if (applyBtn) {
      applyBtn.disabled = isOwner;
      applyBtn.style.display = showCancel ? 'none' : '';
    }
    if (cancelBtn) cancelBtn.style.display = showCancel ? '' : 'none';
    if (queueEl && !isOwner) queueEl.textContent = _applied ? '申込済み（3人が申込中）' : '3人が申込中';
  }
  renderApplyP62();

  /* 購入申込はログイン必須：ゲストは p2 チェックインCTAと同じ共通ログインモーダルを表示
     初期表示時は KTN.role 未設定（setR 押下まで undefined）のため ktnState.role にフォールバック */
  window.openApplyModal = function() {
    var role = KTN.role || (window.ktnState && window.ktnState.role) || 'guest';
    if (role === 'guest') {
      if (KTN.action && KTN.action.show) { KTN.action.show('apply'); return; }
    }
    openModal('applyModal');
  };

  /* 申込確定 → 申込本人状態へ（p6-2 専用に submitApply を差し替え） */
  window.submitApply = function() {
    var chk = document.getElementById('amAgreeCheck');
    if (chk && !chk.checked) { alert('注意事項への同意が必要です'); return; }
    closeModal('applyModal');
    _applied = true;
    renderApplyP62();
    if (KTN.toast) KTN.toast('購入申込を受け付けました');
  };

  /* 申込キャンセル：確認モーダル → 確定で申込前に戻す */
  window.openCancelApplyModal = function() { openModal('cancelApplyModal'); };
  window.confirmCancelApply = function() {
    closeModal('cancelApplyModal');
    _applied = false;
    renderApplyP62();
    if (KTN.toast) KTN.toast('申込をキャンセルしました');
  };

  /* p6 は window.setR を独自定義するため ktnRender 経由では呼ばれない → setR をラップ */
  var _prevSetR = window.setR;
  window.setR = function(role, btn) {
    if (typeof _prevSetR === 'function') _prevSetR(role, btn);
    renderApplyP62();
  };
};

/* ══════════════════════════════════════════════════════
   p2-12  LIAISON 作品管理
══════════════════════════════════════════════════════ */
KTN.pages['p2-12'] = function() {

  /* ── 販売状態マスタ ── */
  var STATUS = [
    { value:'inquiry',  label:'要問合せ' },
    { value:'sale',     label:'販売中' },
    { value:'negot',    label:'商談中' },
    { value:'sold',     label:'売約済' },
    { value:'nonsale',  label:'非売品' },
  ];

  /* ── 出展クリエイター（この展覧会の確認済み出展者＝出品を許可する作者。key＝作者レジストリのキー）
     デモ：creator ロール＝個展（本人1名）／gallery ロール＝グループ展（複数作家）を表現するため
     出展者リストをロールで切替える。本番は展覧会エンティティの確定出展者を返す（ロール非依存）。 ── */
  var EXH_ARTISTS_SOLO  = [{ key:'tanaka', name:'田中 透' }];
  var EXH_ARTISTS_GROUP = [
    { key:'tanaka', name:'田中 透' },
    { key:'sato',   name:'佐藤 みなと' },
    { key:'suzuki', name:'鈴木 洋' },
  ];
  var SELF_CREATOR = '田中 透'; // creator ロール時の本人（デモ）
  function isGalleryRole() {
    var r = window.ktnState && window.ktnState.role;
    return r === 'user+gallery' || r === 'gallery';
  }
  /* グループ展＝gallery ロールは複数作家、個展＝creator ロールは本人のみ */
  function exhArtists() { return isGalleryRole() ? EXH_ARTISTS_GROUP : EXH_ARTISTS_SOLO; }
  function isAllowedAuthor(w) {
    return exhArtists().some(function (a) { return a.name === w.author; });
  }
  /* ロールに応じて追加パネルの文言・出展クリエイター表示を切替 */
  function renderAddTexts() {
    var isGallery = isGalleryRole();
    var box = document.getElementById('p212ExhArtists');
    if (box) {
      var items = exhArtists().map(function (a) {
        return '<span class="p2-12-exh-artists__item">'
          + '<span class="cb cb-person cb-creator">creator</span>'
          + '<span class="p2-12-exh-artists__name">' + a.name + '</span></span>';
      }).join('');
      box.innerHTML =
        '<span class="p2-12-exh-artists__label">この展覧会の出展クリエイター</span>'
        + '<div class="p2-12-exh-artists__list">' + items + '</div>';
    }
    var orEl = document.getElementById('p212AddOr');
    if (orEl) orEl.textContent = isGallery
      ? 'または出展クリエイターの既存の作品から選ぶ'
      : 'またはあなたの既存の作品から選ぶ';
    var hintEl = document.getElementById('p212AddHint');
    if (hintEl) hintEl.textContent = isGallery
      ? '出展クリエイターの登録作品のみ追加できます。取扱いのある他の作家の作品は、この展覧会の出展クリエイターではないため表示されません。'
      : 'あなたがこれまでに登録した作品から選んで追加できます。';
  }

  /* 「新規作品を作成」＝作者を先に確定させてから p6-11 へ遷移（作者固定で開く）。
     出展1名＝自動確定。複数＝作者ピッカーを開いて選択させる。 */
  function newWorkUrl(artist) {
    var isGallery = isGalleryRole();
    var self = (!isGallery && artist.name === SELF_CREATOR);
    return 'kotennavi-p6-11.html?mode=new&author=' + encodeURIComponent(artist.key)
      + (isGallery ? '&role=gallery' : (self ? '&self=1' : ''));
  }
  function bindNewBtn() {
    var btn = document.getElementById('p212NewBtn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var artists = exhArtists();
      if (artists.length === 1) { location.href = newWorkUrl(artists[0]); return; }
      /* 複数＝簡易ピッカーをトグル表示 */
      var pick = document.getElementById('p212NewPicker');
      if (!pick) {
        pick = document.createElement('div');
        pick.id = 'p212NewPicker';
        pick.className = 'p2-12-new-picker';
        pick.innerHTML = '<span class="p2-12-new-picker__label">どの出展クリエイターの作品を作成しますか？</span>'
          + '<span class="p2-12-new-picker__note">同姓同名の作者は「確認 ↗」でクリエイターページを開き、本人か確かめてから選択してください。</span>'
          + artists.map(function (a) {
              return '<div class="p2-12-new-picker__opt" data-key="' + a.key + '">'
                + '<span class="p2-12-new-picker__avatar">' + a.name.charAt(0) + '</span>'
                + '<span class="p2-12-new-picker__name">' + a.name + '</span>'
                + '<a class="p2-12-new-picker__verify" href="kotennavi-p3.html?c=' + encodeURIComponent(a.key) + '" target="_blank" rel="noopener">確認 ↗</a>'
                + '<button type="button" class="p2-12-new-picker__select ktn-op-btn ktn-op-btn--sm">選択 →</button>'
                + '</div>';
            }).join('');
        btn.parentNode.insertBefore(pick, btn.nextSibling);
        pick.querySelectorAll('.p2-12-new-picker__opt').forEach(function (opt) {
          /* 「確認 ↗」は別タブでクリエイターページを開くだけ（既定動作に任せる）。「選択 →」でのみ p6-11 へ遷移 */
          var sel = opt.querySelector('.p2-12-new-picker__select');
          if (sel) sel.addEventListener('click', function () {
            var a = exhArtists().filter(function (x) { return x.key === opt.dataset.key; })[0];
            if (a) location.href = newWorkUrl(a);
          });
        });
      } else {
        pick.hidden = !pick.hidden;
      }
    });
  }

  /* ── サンプルデータ（author＝作者。creator/gallery 共通で常時表示） ── */
  var INITIAL = [
    { id:'w1', title:'《オノマトペの庭》', author:'田中 透', year:'2026年', medium:'キャンバスに油彩', size:'116.7×91.0cm', bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)', status:'inquiry' },
    { id:'w2', title:'《ふわふわ》',       author:'田中 透', year:'2025年', medium:'キャンバスに油彩', size:'72.7×60.6cm',  bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', status:'sale' },
    { id:'w3', title:'《ざわざわ（夜）》',  author:'田中 透', year:'2025年', medium:'アクリル・パネル', size:'53.0×45.5cm',  bg:'linear-gradient(155deg,#3d3530,#1f1a18)', status:'nonsale' },
  ];
  var EXTRA = [
    { id:'w4', title:'《ドキドキ #3》',   author:'田中 透', year:'2025年', bg:'linear-gradient(155deg,#f0d0d0,#c88080)', status:'inquiry' },
    { id:'w5', title:'《シュワシュワ》',   author:'田中 透', year:'2024年', bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)', status:'inquiry' },
    { id:'w6', title:'《言葉の断片 I》',  author:'田中 透', year:'2024年', bg:'linear-gradient(155deg,#d8c8e8,#a888cc)', status:'inquiry' },
    { id:'w7', title:'《言葉の断片 II》', author:'田中 透', year:'2024年', bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', status:'inquiry' },
    { id:'w8', title:'《ふわふわ No.2》', author:'田中 透', year:'2024年', bg:'linear-gradient(155deg,#e0d8c8,#b4a88a)', status:'inquiry' },
    /* creator 個展ロールで候補が閾値（10件）を超え検索欄が出ることを確認するためのデモ作品 */
    { id:'w9',  title:'《きらきら》',      author:'田中 透', year:'2024年', bg:'linear-gradient(155deg,#f0ead0,#c8b878)', status:'inquiry' },
    { id:'w10', title:'《ざわざわ（朝）》', author:'田中 透', year:'2023年', bg:'linear-gradient(155deg,#dce8e0,#8ca898)', status:'inquiry' },
    { id:'w11', title:'《ぐるぐる #2》',   author:'田中 透', year:'2023年', bg:'linear-gradient(155deg,#e8dcd0,#b89878)', status:'inquiry' },
    { id:'w12', title:'《ぽつぽつ》',      author:'田中 透', year:'2023年', bg:'linear-gradient(155deg,#d0d8e8,#8090b8)', status:'inquiry' },
    /* 別作家の作品：gallery グループ展ロールでは出展クリエイター（佐藤・鈴木）として候補に出る。
       creator 個展ロールでは出展外のため候補に出ない（isAllowedAuthor がロールで判定）。 */
    { id:'x1', title:'《余白のコンポジション》', author:'佐藤 みなと', year:'2025年', bg:'linear-gradient(155deg,#e8e2d4,#b0a888)', status:'inquiry' },
    { id:'x2', title:'《海の記憶》',            author:'佐藤 みなと', year:'2024年', bg:'linear-gradient(155deg,#cfe0e8,#7a9cb0)', status:'inquiry' },
    { id:'x3', title:'《かたちの記譜》',         author:'鈴木 洋', year:'2025年', bg:'linear-gradient(155deg,#e2d8e8,#9a86b4)', status:'inquiry' },
    { id:'x4', title:'《遠い水平線》',           author:'鈴木 洋', year:'2023年', bg:'linear-gradient(155deg,#d4e2dc,#84a89a)', status:'inquiry' },
  ];
  var ALL = INITIAL.concat(EXTRA);

  /* ── 状態 ── */
  var displayedIds = INITIAL.map(function(w){ return w.id; });

  /* ── DOM ── */
  var listEl   = document.getElementById('p212WorkList');
  var countEl  = document.getElementById('p212Count');
  var addBtn   = document.getElementById('p212AddBtn');
  var addPanel = document.getElementById('p212AddPanel');
  var closeBtn = document.getElementById('p212CloseBtn');
  var candGrid = document.getElementById('p212CandidateGrid');
  if (!listEl || !countEl || !addBtn || !addPanel || !closeBtn || !candGrid) return;

  /* ── ユーティリティ ── */
  function updateCount() { countEl.textContent = displayedIds.length; }

  function statusOpts(cur) {
    return STATUS.map(function(s){
      return '<option value="'+s.value+'"'+(s.value===cur?' selected':'')+'>'+s.label+'</option>';
    }).join('');
  }

  var HANDLE_SVG = '<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">'
    + '<circle cx="7" cy="5" r="1.5"/><circle cx="13" cy="5" r="1.5"/>'
    + '<circle cx="7" cy="10" r="1.5"/><circle cx="13" cy="10" r="1.5"/>'
    + '<circle cx="7" cy="15" r="1.5"/><circle cx="13" cy="15" r="1.5"/>'
    + '</svg>';

  /* ── 作品カード生成 ── */
  function makeCard(w) {
    var li = document.createElement('li');
    li.className = 'p2-12-work-card';
    li.dataset.id = w.id;
    var meta = [w.year, w.medium, w.size].filter(Boolean).join('　');
    li.innerHTML =
      '<div class="p2-12-work-card__main">'+
        '<div class="p2-12-work-card__handle" title="ドラッグで並び替え">'+HANDLE_SVG+'</div>'+
        '<div class="p2-12-work-card__no" title="作品番号（並び順で自動採番）">'+
          '<span class="p2-12-work-card__no-label">No.</span>'+
          '<span class="p2-12-no-val">—</span>'+
        '</div>'+
        '<div class="p2-12-work-card__thumb" style="background:'+w.bg+'"></div>'+
        '<div class="p2-12-work-card__body">'+
          '<div class="p2-12-work-card__title">'+w.title+'</div>'+
          '<div class="p2-12-work-card__author"><span class="p2-12-work-card__author-label">作者</span>'+(w.author||'—')+'</div>'+
          '<div class="p2-12-work-card__meta">'+meta+'</div>'+
        '</div>'+
        '<button class="p2-12-remove-btn" type="button" data-id="'+w.id+'" title="取り外す" aria-label="取り外す">'+
          '<svg class="p2-12-remove-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" width="13" height="13" aria-hidden="true"><line x1="6" y1="12" x2="18" y2="12"/></svg>'+
        '</button>'+
      '</div>'+
      '<div class="p2-12-work-card__settings">'+
        '<div class="p2-12-field">'+
          '<span class="p2-12-field__label">販売状態</span>'+
          '<select class="p2-12-status-sel" aria-label="販売状態">'+statusOpts(w.status)+'</select>'+
        '</div>'+
      '</div>';
    li.querySelector('.p2-12-remove-btn').addEventListener('click', handleRemove);
    return li;
  }

  /* ── 取り外し ── */
  function handleRemove(e) {
    var id = e.currentTarget.dataset.id;
    var idx = displayedIds.indexOf(id);
    if (idx !== -1) displayedIds.splice(idx, 1);
    var card = e.currentTarget.closest('.p2-12-work-card');
    if (card) card.remove();
    var cc = candGrid.querySelector('[data-id="'+id+'"]');
    if (cc) { cc.classList.remove('is-added'); cc.title = '出品する'; }
    updateCount();
    renumber();
  }

  /* ── 自動採番：No.＝並び順（1..N）。追加・取り外し・ドラッグのたびに振り直す（手入力は廃止・2026-07-19） ── */
  function renumber() {
    listEl.querySelectorAll('.p2-12-no-val').forEach(function (el, i) { el.textContent = i + 1; });
  }

  /* ── 候補フィルター（検索＝候補が多い時のみ／作者チップ＝galleryのみ）── */
  var candSearch = '', candCreator = '', candSort = '';
  var CAND_FILTER_MIN = 10; /* 候補がこれを超えたら絞込UI（検索／作者チップ／並び順）を出す */
  var candPoolCap = 0; /* デモ用：>0 なら候補をこの件数に制限（少数作品＝絞込UIが出ないことの確認用・デモバー「候補：少ない」） */
  var candFilterEl = null, candEmptyEl = null;

  /* 候補プール（isAllowedAuthor 通過作品／デモの少数モードでは candPoolCap 件に制限） */
  function candPool() {
    var pool = ALL.filter(isAllowedAuthor);
    return candPoolCap > 0 ? pool.slice(0, candPoolCap) : pool;
  }

  function candMatch(w) {
    if (candCreator && w.author !== candCreator) return false;
    var q = candSearch.trim();
    if (q && (w.title + ' ' + (w.author || '')).indexOf(q) === -1) return false;
    return true;
  }

  /* 候補の並び替え（candSort=''＝登録順=データ順） */
  function candYearNum(w) { var m = (w.year || '').match(/\d+/); return m ? parseInt(m[0], 10) : 0; }
  function candSortList(list) {
    var a = list.slice();
    if (candSort === 'title')      a.sort(function(x,y){ return (x.title  || '').localeCompare(y.title  || '', 'ja'); });
    else if (candSort === 'year-desc') a.sort(function(x,y){ return candYearNum(y) - candYearNum(x); });
    else if (candSort === 'year-asc')  a.sort(function(x,y){ return candYearNum(x) - candYearNum(y); });
    else if (candSort === 'author')    a.sort(function(x,y){ return (x.author || '').localeCompare(y.author || '', 'ja'); });
    return a;
  }

  function syncCandFilter() {
    var allowed = candPool();
    var many = allowed.length > CAND_FILTER_MIN;
    var showSearch = many;
    var showChips  = many && isGalleryRole();
    if (!candFilterEl) {
      candFilterEl = document.createElement('div');
      candFilterEl.className = 'p2-12-cand-filter';
      candGrid.parentNode.insertBefore(candFilterEl, candGrid);
    }
    if (!showSearch && !showChips) { candFilterEl.hidden = true; candFilterEl.innerHTML = ''; return; }
    candFilterEl.hidden = false;

    var chipsHtml = '';
    if (showChips) {
      var chips = [{ name:'', label:'すべて', n:allowed.length }].concat(
        exhArtists().map(function(a){
          return { name:a.name, label:a.name, n:allowed.filter(function(w){ return w.author===a.name; }).length };
        }));
      chipsHtml = '<div class="p2-12-cand-filter__chips" role="group" aria-label="作者で絞り込み">'
        + chips.map(function(c){
            return '<button type="button" class="p2-12-cand-filter__chip'+(candCreator===c.name?' is-active':'')+'" data-creator="'+c.name+'">'
              + c.label + '<span class="p2-12-cand-filter__chip-n">'+c.n+'</span></button>';
          }).join('')
        + '</div>';
    }
    var toolsHtml = '';
    if (showSearch) {
      if (candSort === 'author' && !isGalleryRole()) candSort = ''; /* creator では作者順は無効 */
      var searchPh = isGalleryRole() ? '作品名・クリエイター名で絞り込み' : '作品名で絞り込み';
      var sortOpts = [
        { v:'',          label:'登録順' },
        { v:'title',     label:'作品名順' },
        { v:'year-desc', label:'制作年（新しい順）' },
        { v:'year-asc',  label:'制作年（古い順）' }
      ];
      if (isGalleryRole()) sortOpts.push({ v:'author', label:'クリエイター名順' });
      toolsHtml = '<div class="p2-12-cand-filter__tools">'
        + '<div class="p2-12-cand-filter__search">'
        +   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="15" height="15" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
        +   '<input type="search" class="p2-12-cand-filter__input" placeholder="'+searchPh+'" aria-label="'+searchPh+'" value="'+candSearch.replace(/"/g,'&quot;')+'">'
        + '</div>'
        + '<label class="p2-12-cand-filter__sort">'
        +   '<span class="p2-12-cand-filter__sort-lbl">並び順</span>'
        +   '<select class="p2-12-cand-filter__sort-sel" aria-label="並び順">'
        +     sortOpts.map(function(o){ return '<option value="'+o.v+'"'+(candSort===o.v?' selected':'')+'>'+o.label+'</option>'; }).join('')
        +   '</select>'
        + '</label>'
        + '</div>';
    }
    candFilterEl.innerHTML = chipsHtml + toolsHtml;

    Array.prototype.forEach.call(candFilterEl.querySelectorAll('.p2-12-cand-filter__chip'), function(btn){
      btn.addEventListener('click', function(){ candCreator = btn.dataset.creator; syncCandFilter(); renderCandGrid(); });
    });
    var input = candFilterEl.querySelector('.p2-12-cand-filter__input');
    if (input) input.addEventListener('input', function(){ candSearch = input.value; renderCandGrid(); });
    var sortSel = candFilterEl.querySelector('.p2-12-cand-filter__sort-sel');
    if (sortSel) sortSel.addEventListener('change', function(){ candSort = sortSel.value; renderCandGrid(); });
  }

  /* ── 候補グリッド描画（出展クリエイター以外の作品は候補に出さない） ── */
  function renderCandGrid() {
    candGrid.innerHTML = '';
    var shown = 0;
    candSortList(candPool().filter(candMatch)).forEach(function(w) {
      var added = displayedIds.indexOf(w.id) !== -1;
      var div = document.createElement('div');
      div.className = 'p2-12-candidate-card'+(added?' is-added':'');
      div.dataset.id = w.id;
      div.title = added ? '' : '出品する';
      div.innerHTML =
        '<span class="p2-12-candidate-card__mark" aria-hidden="true">'+
          '<svg class="p2-12-candidate-card__mark-add" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" width="13" height="13"><line x1="12" y1="6" x2="12" y2="18"/><line x1="6" y1="12" x2="18" y2="12"/></svg>'+
        '</span>'+
        '<span class="p2-12-candidate-card__listed"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="11" height="11" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>出品中</span>'+
        '<div class="p2-12-candidate-card__thumb" style="background:'+w.bg+'"></div>'+
        '<div class="p2-12-candidate-card__info">'+
          '<div class="p2-12-candidate-card__title">'+w.title+'</div>'+
          '<div class="p2-12-candidate-card__author">'+(w.author||'')+'</div>'+
          '<div class="p2-12-candidate-card__meta">'+[w.year,w.medium,w.size].filter(Boolean).join('　')+'</div>'+
        '</div>';
      div.addEventListener('click', function() {
        if (div.classList.contains('is-added')) return;
        displayedIds.push(w.id);
        listEl.appendChild(makeCard(w));
        div.classList.add('is-added');
        div.title = '';
        updateCount();
        renumber();
      });
      candGrid.appendChild(div);
      shown++;
    });
    if (!candEmptyEl) {
      candEmptyEl = document.createElement('p');
      candEmptyEl.className = 'p2-12-cand-empty';
      candEmptyEl.textContent = '該当する作品がありません。';
      candGrid.parentNode.insertBefore(candEmptyEl, candGrid.nextSibling);
    }
    candEmptyEl.hidden = shown !== 0;
  }

  /* ── パネル開閉 ── */
  function openPanel() {
    addPanel.hidden = false;
    addBtn.classList.add('is-open');
    renderAddTexts();
    syncCandFilter();
    renderCandGrid();
  }
  function closePanel() {
    addPanel.hidden = true;
    addBtn.classList.remove('is-open');
  }

  /* ── 初期描画 ── */
  INITIAL.forEach(function(w){ listEl.appendChild(makeCard(w)); });
  updateCount();
  renumber();

  /* デモバー「候補：多い/少ない」＝候補プールを制限し、少数時に絞込UI（検索/作者チップ）が出ないことを確認 */
  window.p212DemoCands = function (few, btn) {
    candPoolCap = few ? 8 : 0;
    if (!addPanel.hidden) { syncCandFilter(); renderCandGrid(); }
    if (btn) {
      document.querySelectorAll('.dbar [onclick^="p212DemoCands"]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
  };

  /* ── SortableJS ── */
  if (window.Sortable) {
    Sortable.create(listEl, {
      handle: '.p2-12-work-card__handle',
      animation: 150,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      onEnd: function() {
        displayedIds = [];
        listEl.querySelectorAll('.p2-12-work-card').forEach(function(c){ displayedIds.push(c.dataset.id); });
        renumber();
      },
    });
  }

  /* ── 並べ替えモード：カードをハンドル＋サムネ＋No.＋作品名の薄い行に圧縮し、スマホでも一覧しながら並べ替えやすくする ── */
  var reorderBtn = document.getElementById('p212ReorderBtn');
  if (reorderBtn) {
    var reorderScope = listEl.closest('.p2-12-works-block') || listEl;
    reorderBtn.addEventListener('click', function () {
      var on = reorderScope.classList.toggle('is-reordering');
      reorderBtn.classList.toggle('is-active', on);
      reorderBtn.textContent = on ? '並べ替え完了' : '並べ替え';
    });
  }

  /* ── イベント ── */
  addBtn.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);

  /* ── 説明文 文字数カウンター ── */
  var descTA = document.getElementById('p212ExhibitDesc');
  var descCount = document.getElementById('p212DescCount');
  if (descTA && descCount) {
    var MAX = 200;
    function updateDescCount() {
      var len = descTA.value.length;
      descCount.textContent = len + ' / ' + MAX;
      descCount.style.color = len > MAX ? '#c0392b' : '';
    }
    descTA.addEventListener('input', updateDescCount);
  }

  /* ── 初期状態：パネルを開いた状態で表示 ── */
  bindNewBtn();
  openPanel();

  /* ── ロール切替に追従（デモバー creator/gallery）── */
  var _prevRender = window.ktnRender;
  window.ktnRender = function () {
    if (typeof _prevRender === 'function') _prevRender();
    renderAddTexts();
    candCreator = ''; /* ロール変更で作者候補が変わるためリセット */
    syncCandFilter();
    renderCandGrid();
  };

};

/* =====================================================
   p2-12-1: LIAISON+ 展示・販売設定
   ===================================================== */
KTN.pages['p2-121'] = function() {

  /* ── 展覧会会期定数 ── */
  var EXH_START = '2026-02-18';
  var EXH_END   = '2026-03-05';
  var EXH_MAX   = '2026-03-19'; // 会期終了 + 2週間

  function fmtDate(iso) {
    // '2026-03-19' → '2026.03.19'
    return iso.replace(/-/g, '.');
  }
  function fmtRange(s, e) { return fmtDate(s) + ' — ' + fmtDate(e); }
  function fmtTime(t) {
    // '00:00' → '0:00' / '23:59' → '23:59'（時の先頭0を落とす）
    if (!t) return '';
    var p = t.split(':');
    return parseInt(p[0], 10) + ':' + p[1];
  }
  function fmtDT(d, t) { return fmtDate(d) + ' ' + fmtTime(t); }

  /* ── 販売期間設定 ── */
  var radios      = document.querySelectorAll('input[name="p2121Period"]');
  var customPicker = document.getElementById('p2121CustomPicker');
  var dateStart   = document.getElementById('p2121DateStart');
  var dateEnd     = document.getElementById('p2121DateEnd');
  var timeStart   = document.getElementById('p2121TimeStart');
  var timeEnd     = document.getElementById('p2121TimeEnd');
  var customPreview = document.getElementById('p2121CustomPreview');

  function getCheckedValue() {
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) return radios[i].value;
    }
    return null;
  }

  function updateCustomPreview() {
    if (!dateStart || !dateEnd || !customPreview) return;
    var s = dateStart.value, e = dateEnd.value;
    var st = timeStart ? timeStart.value : '00:00';
    var et = timeEnd ? timeEnd.value : '23:59';
    // 同日は開始時刻 <= 終了時刻を要求
    if (s && e && (s < e || (s === e && st <= et))) {
      customPreview.textContent = fmtDT(s, st) + ' — ' + fmtDT(e, et);
    } else {
      customPreview.textContent = '日程を選択';
    }
  }

  function onRadioChange() {
    var val = getCheckedValue();
    if (customPicker) customPicker.hidden = (val !== 'custom');
    if (val === 'custom') updateCustomPreview();
  }

  if (radios.length) {
    for (var i = 0; i < radios.length; i++) {
      radios[i].addEventListener('change', onRadioChange);
    }
    onRadioChange();
  }

  if (dateStart) {
    dateStart.addEventListener('change', function() {
      // 終了日の min を開始日以降に制限
      if (dateEnd) {
        dateEnd.min = dateStart.value;
        if (dateEnd.value < dateStart.value) dateEnd.value = dateStart.value;
      }
      updateCustomPreview();
    });
  }
  if (dateEnd) {
    dateEnd.addEventListener('change', updateCustomPreview);
  }
  if (timeStart) timeStart.addEventListener('change', updateCustomPreview);
  if (timeEnd)   timeEnd.addEventListener('change', updateCustomPreview);

  /* ── 以下：作品リスト（p2-12 と同一ロジック） ── */
  var STATUS = [
    { value:'inquiry',  label:'要問合せ' },
    { value:'sale',     label:'販売中' },
    { value:'negot',    label:'商談中' },
    { value:'sold',     label:'売約済' },
    { value:'nonsale',  label:'非売品' },
  ];

  /* 会期開始済みフラグ（デモ：開始済み）。2026-07-19 仕様＝展覧会会期開始日以降は
     モード切替（利用しない/LIAISON/LIAISON+）と販売期間が変更不可。dbar「会期」で切替 */
  var termStarted = true;

  /* ── 出展クリエイター（この展覧会の確認済み出展者＝出品を許可する作者。key＝作者レジストリのキー）
     デモ：creator ロール＝個展（本人1名）／gallery ロール＝グループ展（複数作家）を表現するため
     出展者リストをロールで切替える。本番は展覧会エンティティの確定出展者を返す（ロール非依存）。 ── */
  var EXH_ARTISTS_SOLO  = [{ key:'tanaka', name:'田中 透' }];
  var EXH_ARTISTS_GROUP = [
    { key:'tanaka', name:'田中 透' },
    { key:'sato',   name:'佐藤 みなと' },
    { key:'suzuki', name:'鈴木 洋' },
  ];
  var SELF_CREATOR = '田中 透'; // creator ロール時の本人（デモ）
  function isGalleryRole() {
    var r = window.ktnState && window.ktnState.role;
    return r === 'user+gallery' || r === 'gallery';
  }
  /* グループ展＝gallery ロールは複数作家、個展＝creator ロールは本人のみ */
  function exhArtists() { return isGalleryRole() ? EXH_ARTISTS_GROUP : EXH_ARTISTS_SOLO; }
  function isAllowedAuthor(w) {
    return exhArtists().some(function (a) { return a.name === w.author; });
  }
  /* ロールに応じて追加パネルの文言・出展クリエイター表示を切替 */
  function renderAddTexts() {
    var isGallery = isGalleryRole();
    var box = document.getElementById('p212ExhArtists');
    if (box) {
      var items = exhArtists().map(function (a) {
        return '<span class="p2-12-exh-artists__item">'
          + '<span class="cb cb-person cb-creator">creator</span>'
          + '<span class="p2-12-exh-artists__name">' + a.name + '</span></span>';
      }).join('');
      box.innerHTML =
        '<span class="p2-12-exh-artists__label">この展覧会の出展クリエイター</span>'
        + '<div class="p2-12-exh-artists__list">' + items + '</div>';
    }
    var orEl = document.getElementById('p212AddOr');
    if (orEl) orEl.textContent = isGallery
      ? 'または出展クリエイターの既存の作品から選ぶ'
      : 'またはあなたの既存の作品から選ぶ';
    var hintEl = document.getElementById('p212AddHint');
    if (hintEl) hintEl.textContent = isGallery
      ? '出展クリエイターの登録作品のみ追加できます。取扱いのある他の作家の作品は、この展覧会の出展クリエイターではないため表示されません。'
      : 'あなたがこれまでに登録した作品から選んで追加できます。';
  }

  /* 「新規作品を作成」＝作者を先に確定させてから p6-11 へ遷移（作者固定で開く）。
     出展1名＝自動確定。複数＝作者ピッカーを開いて選択させる。 */
  function newWorkUrl(artist) {
    var isGallery = isGalleryRole();
    var self = (!isGallery && artist.name === SELF_CREATOR);
    return 'kotennavi-p6-11.html?mode=new&author=' + encodeURIComponent(artist.key)
      + (isGallery ? '&role=gallery' : (self ? '&self=1' : ''));
  }
  function bindNewBtn() {
    var btn = document.getElementById('p212NewBtn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var artists = exhArtists();
      if (artists.length === 1) { location.href = newWorkUrl(artists[0]); return; }
      var pick = document.getElementById('p212NewPicker');
      if (!pick) {
        pick = document.createElement('div');
        pick.id = 'p212NewPicker';
        pick.className = 'p2-12-new-picker';
        pick.innerHTML = '<span class="p2-12-new-picker__label">どの出展クリエイターの作品を作成しますか？</span>'
          + '<span class="p2-12-new-picker__note">同姓同名の作者は「確認 ↗」でクリエイターページを開き、本人か確かめてから選択してください。</span>'
          + artists.map(function (a) {
              return '<div class="p2-12-new-picker__opt" data-key="' + a.key + '">'
                + '<span class="p2-12-new-picker__avatar">' + a.name.charAt(0) + '</span>'
                + '<span class="p2-12-new-picker__name">' + a.name + '</span>'
                + '<a class="p2-12-new-picker__verify" href="kotennavi-p3.html?c=' + encodeURIComponent(a.key) + '" target="_blank" rel="noopener">確認 ↗</a>'
                + '<button type="button" class="p2-12-new-picker__select ktn-op-btn ktn-op-btn--sm">選択 →</button>'
                + '</div>';
            }).join('');
        btn.parentNode.insertBefore(pick, btn.nextSibling);
        pick.querySelectorAll('.p2-12-new-picker__opt').forEach(function (opt) {
          /* 「確認 ↗」は別タブでクリエイターページを開くだけ（既定動作に任せる）。「選択 →」でのみ p6-11 へ遷移 */
          var sel = opt.querySelector('.p2-12-new-picker__select');
          if (sel) sel.addEventListener('click', function () {
            var a = exhArtists().filter(function (x) { return x.key === opt.dataset.key; })[0];
            if (a) location.href = newWorkUrl(a);
          });
        });
      } else {
        pick.hidden = !pick.hidden;
      }
    });
  }

  var INITIAL = [
    /* locked:true = 販売中・申込者あり → 状態・価格ロック */
    { id:'w1', title:'《オノマトペの庭》', author:'田中 透', year:'2026年', medium:'キャンバスに油彩', size:'116.7×91.0cm', bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)', status:'sale', price:480000, locked:true, applyCount:2 },
    /* otherExh = 他の展覧会への出品設定（保存バリデーションのデモ用）。販売期間をこの期間と重なる形に延長すると保存エラー */
    { id:'w2', title:'《ふわふわ》',       author:'田中 透', year:'2025年', medium:'キャンバスに油彩', size:'72.7×60.6cm',  bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', status:'sale',    price:220000,
      otherExh:{ title:'グループ展「余白のかたち」', start:'2026-03-10', end:'2026-03-24' } },
    { id:'w3', title:'《ざわざわ（夜）》',  author:'田中 透', year:'2025年', medium:'アクリル・パネル', size:'53.0×45.5cm',  bg:'linear-gradient(155deg,#3d3530,#1f1a18)', status:'nonsale',
      otherExh:{ title:'グループ展「余白のかたち」', start:'2026-03-10', end:'2026-03-24' } },
    /* soldOnline:true = オンライン取引完了 → 状態・価格ロック */
    { id:'w9', title:'《言葉の重力 No.3》', author:'田中 透', year:'2024年', medium:'油彩', size:'72.7×60.6cm', bg:'linear-gradient(135deg,#c8a87a,#8b6040)', status:'sold', price:120000, soldOnline:true },
    /* priceLocked:true = 会場売約済 → 状態選択可・価格ロック */
    { id:'w10', title:'《ざわざわ No.2》', author:'田中 透', year:'2024年', medium:'アクリル・パネル', size:'45.5×38.0cm', bg:'linear-gradient(155deg,#c8c0d8,#8880a8)', status:'sold', price:85000, priceLocked:true },
  ];
  var EXTRA = [
    { id:'w4', title:'《ドキドキ #3》',   author:'田中 透', year:'2025年', bg:'linear-gradient(155deg,#f0d0d0,#c88080)', status:'inquiry' },
    { id:'w5', title:'《シュワシュワ》',   author:'田中 透', year:'2024年', bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)', status:'inquiry' },
    { id:'w6', title:'《言葉の断片 I》',  author:'田中 透', year:'2024年', bg:'linear-gradient(155deg,#d8c8e8,#a888cc)', status:'inquiry' },
    { id:'w7', title:'《言葉の断片 II》', author:'田中 透', year:'2024年', bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', status:'inquiry' },
    { id:'w8', title:'《ふわふわ No.2》', author:'田中 透', year:'2024年', bg:'linear-gradient(155deg,#e0d8c8,#b4a88a)', status:'inquiry' },
    /* creator 個展ロールで候補が閾値（10件）を超え検索欄が出ることを確認するためのデモ作品（w9/w10 は INITIAL 使用済のため w11 から） */
    { id:'w11', title:'《きらきら》',    author:'田中 透', year:'2024年', bg:'linear-gradient(155deg,#f0ead0,#c8b878)', status:'inquiry' },
    { id:'w12', title:'《ぐるぐる #2》', author:'田中 透', year:'2023年', bg:'linear-gradient(155deg,#e8dcd0,#b89878)', status:'inquiry' },
    /* 別作家の作品：gallery グループ展ロールでは出展クリエイター（佐藤・鈴木）として候補に出る。
       creator 個展ロールでは出展外のため候補に出ない（isAllowedAuthor がロールで判定）。 */
    { id:'x1', title:'《余白のコンポジション》', author:'佐藤 みなと', year:'2025年', bg:'linear-gradient(155deg,#e8e2d4,#b0a888)', status:'inquiry' },
    { id:'x2', title:'《海の記憶》',            author:'佐藤 みなと', year:'2024年', bg:'linear-gradient(155deg,#cfe0e8,#7a9cb0)', status:'inquiry' },
    { id:'x3', title:'《かたちの記譜》',         author:'鈴木 洋', year:'2025年', bg:'linear-gradient(155deg,#e2d8e8,#9a86b4)', status:'inquiry' },
    { id:'x4', title:'《遠い水平線》',           author:'鈴木 洋', year:'2023年', bg:'linear-gradient(155deg,#d4e2dc,#84a89a)', status:'inquiry' },
  ];
  var ALL = INITIAL.concat(EXTRA);
  var displayedIds = INITIAL.map(function(w){ return w.id; });

  var listEl   = document.getElementById('p212WorkList');
  var countEl  = document.getElementById('p212Count');
  var addBtn   = document.getElementById('p212AddBtn');
  var addPanel = document.getElementById('p212AddPanel');
  var closeBtn = document.getElementById('p212CloseBtn');
  var candGrid = document.getElementById('p212CandidateGrid');
  if (!listEl || !countEl || !addBtn || !addPanel || !closeBtn || !candGrid) return;

  function updateCount() { countEl.textContent = displayedIds.length; }

  function statusOpts(cur) {
    return STATUS.map(function(s){
      return '<option value="'+s.value+'"'+(s.value===cur?' selected':'')+'>'+s.label+'</option>';
    }).join('');
  }

  var HANDLE_SVG = '<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">'
    + '<circle cx="7" cy="5" r="1.5"/><circle cx="13" cy="5" r="1.5"/>'
    + '<circle cx="7" cy="10" r="1.5"/><circle cx="13" cy="10" r="1.5"/>'
    + '<circle cx="7" cy="15" r="1.5"/><circle cx="13" cy="15" r="1.5"/>'
    + '</svg>';

  function makeCard(w) {
    var li = document.createElement('li');
    li.dataset.id = w.id;
    var meta = [w.year, w.medium, w.size].filter(Boolean).join('　');

    var isLocked = w.locked || w.soldOnline;
    var isPriceLocked = isLocked || !!w.priceLocked;
    li.className = 'p2-12-work-card' + (isLocked ? ' p2-12-work-card--locked ' + (w.locked ? 'p2-12-work-card--applied' : 'p2-12-work-card--sold') : '');

    /* 販売設定エリア：ロック済み（読み取り専用）と編集可で構造を分ける */
    var priceText = w.price ? '¥'+Number(w.price).toLocaleString('ja-JP') : '';
    var settingsHtml;
    if (isLocked) {
      /* ロック済み（申込中／売約済）＝状態パネル＋管理先への遷移CTA（編集フィールドにしない） */
      var lockBadge, lockNote, hintText, ctaLabel, ctaHref;
      if (w.locked) {
        lockBadge = '<span class="p2-121-lock-badge">販売中</span>';
        lockNote  = '<span class="p2-121-lock-note"><strong class="p2-121-lock-note__num">'+w.applyCount+'</strong>件申込中</span>';
        hintText  = '申込対応中のため、詳細はリエゾン+コンソールで確認して下さい。';
        ctaLabel  = 'リエゾン+コンソール';
        ctaHref   = 'kotennavi-p3-15.html';
      } else {
        lockBadge = '<span class="p2-121-lock-badge p2-121-lock-badge--sold">売約済</span>';
        lockNote  = '<span class="p2-121-lock-note">取引完了</span>';
        hintText  = '取引が成立した作品のため、詳細はリエゾン+コンソールで確認して下さい。';
        ctaLabel  = 'リエゾン+コンソール';
        ctaHref   = 'kotennavi-p3-15.html';
      }
      settingsHtml =
        '<div class="p2-12-work-card__settings p2-12-work-card__settings--locked">'+
          '<div class="p2-121-locked-info">'+
            '<div class="p2-121-locked-summary">'+
              lockBadge + lockNote +
              (priceText ? '<span class="p2-121-locked-price">'+priceText+'</span>' : '')+
            '</div>'+
            '<div class="p2-121-locked-hint">'+
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'+
              '<span>'+hintText+'</span>'+
            '</div>'+
          '</div>'+
          '<a class="ktn-action-btn p2-121-locked-cta" href="'+ctaHref+'">'+ctaLabel+' →</a>'+
        '</div>';
    } else {
      /* 編集可＝販売状態(select)＋価格(input) の2フィールド */
      var priceHtml;
      if (isPriceLocked) {
        priceHtml =
          '<div class="p2-121-price-wrap is-locked">'+
            '<span class="p2-121-price-wrap__sign">¥</span>'+
            '<input class="p2-121-price-wrap__input" type="number" value="'+(w.price||'')+'" disabled>'+
          '</div>';
      } else {
        priceHtml =
          '<div class="p2-121-price-wrap">'+
            '<span class="p2-121-price-wrap__sign">¥</span>'+
            '<input class="p2-121-price-wrap__input" type="number" min="0" step="1000"'+
              ' placeholder="価格" aria-label="価格（税込）" value="'+(w.price||'')+'">'+
          '</div>';
      }
      settingsHtml =
        '<div class="p2-12-work-card__settings">'+
          '<div class="p2-12-field">'+
            '<span class="p2-12-field__label">価格<span class="p2-12-field__tax">（税込）</span></span>'+
            priceHtml+
          '</div>'+
          '<div class="p2-12-field">'+
            '<span class="p2-12-field__label">販売状態</span>'+
            '<select class="p2-12-status-sel" aria-label="販売状態">'+statusOpts(w.status)+'</select>'+
          '</div>'+
        '</div>';
    }

    var removeHtml = isLocked ? '' :
      '<button class="p2-12-remove-btn" type="button" data-id="'+w.id+'" title="取り外す" aria-label="取り外す">'+
        '<svg class="p2-12-remove-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" width="13" height="13" aria-hidden="true"><line x1="6" y1="12" x2="18" y2="12"/></svg>'+
      '</button>';

    li.innerHTML =
      '<div class="p2-12-work-card__main">'+
        '<div class="p2-12-work-card__handle" title="ドラッグで並び替え">'+HANDLE_SVG+'</div>'+
        '<div class="p2-12-work-card__no" title="作品番号（並び順で自動採番）">'+
          '<span class="p2-12-work-card__no-label">No.</span>'+
          '<span class="p2-12-no-val">—</span>'+
        '</div>'+
        '<div class="p2-12-work-card__thumb" style="background:'+w.bg+'"></div>'+
        '<div class="p2-12-work-card__body">'+
          '<div class="p2-12-work-card__title">'+w.title+'</div>'+
          '<div class="p2-12-work-card__author"><span class="p2-12-work-card__author-label">作者</span>'+(w.author||'—')+'</div>'+
          '<div class="p2-12-work-card__meta">'+meta+'</div>'+
        '</div>'+
        removeHtml +
      '</div>'+
      settingsHtml;

    if (!isLocked) {
      li.querySelector('.p2-12-remove-btn').addEventListener('click', handleRemove);

      if (!w.priceLocked) {
        /* 非売品のとき価格入力を無効化 */
        var priceInput = li.querySelector('.p2-121-price-wrap__input');
        var statusSel  = li.querySelector('.p2-12-status-sel');
        function syncPrice() {
          var isNonsale = statusSel.value === 'nonsale';
          priceInput.disabled = isNonsale;
          priceInput.closest('.p2-121-price-wrap').classList.toggle('is-disabled', isNonsale);
          if (isNonsale) priceInput.value = '';
        }
        statusSel.addEventListener('change', syncPrice);
        syncPrice();
      }
    }

    return li;
  }

  function handleRemove(e) {
    var id = e.currentTarget.dataset.id;
    var idx = displayedIds.indexOf(id);
    if (idx !== -1) displayedIds.splice(idx, 1);
    var card = e.currentTarget.closest('.p2-12-work-card');
    if (card) card.remove();
    var cc = candGrid.querySelector('[data-id="'+id+'"]');
    if (cc) { cc.classList.remove('is-added'); cc.title = '出品する'; }
    updateCount();
    renumber();
  }

  /* ── 自動採番：No.＝並び順（1..N）。追加・取り外し・ドラッグのたびに振り直す（手入力は廃止・2026-07-19） ── */
  function renumber() {
    listEl.querySelectorAll('.p2-12-no-val').forEach(function (el, i) { el.textContent = i + 1; });
  }

  /* ── 候補フィルター（検索＝候補が多い時のみ／作者チップ＝galleryのみ）── */
  var candSearch = '', candCreator = '', candSort = '';
  var CAND_FILTER_MIN = 10; /* 候補がこれを超えたら絞込UI（検索／作者チップ／並び順）を出す */
  var candPoolCap = 0; /* デモ用：>0 なら候補をこの件数に制限（少数作品＝絞込UIが出ないことの確認用・デモバー「候補：少ない」） */
  var candFilterEl = null, candEmptyEl = null;

  /* 候補プール（isAllowedAuthor 通過作品／デモの少数モードでは candPoolCap 件に制限） */
  function candPool() {
    var pool = ALL.filter(isAllowedAuthor);
    return candPoolCap > 0 ? pool.slice(0, candPoolCap) : pool;
  }

  function candMatch(w) {
    if (candCreator && w.author !== candCreator) return false;
    var q = candSearch.trim();
    if (q && (w.title + ' ' + (w.author || '')).indexOf(q) === -1) return false;
    return true;
  }

  /* 候補の並び替え（candSort=''＝登録順=データ順） */
  function candYearNum(w) { var m = (w.year || '').match(/\d+/); return m ? parseInt(m[0], 10) : 0; }
  function candSortList(list) {
    var a = list.slice();
    if (candSort === 'title')      a.sort(function(x,y){ return (x.title  || '').localeCompare(y.title  || '', 'ja'); });
    else if (candSort === 'year-desc') a.sort(function(x,y){ return candYearNum(y) - candYearNum(x); });
    else if (candSort === 'year-asc')  a.sort(function(x,y){ return candYearNum(x) - candYearNum(y); });
    else if (candSort === 'author')    a.sort(function(x,y){ return (x.author || '').localeCompare(y.author || '', 'ja'); });
    return a;
  }

  function syncCandFilter() {
    var allowed = candPool();
    var many = allowed.length > CAND_FILTER_MIN;
    var showSearch = many;
    var showChips  = many && isGalleryRole();
    if (!candFilterEl) {
      candFilterEl = document.createElement('div');
      candFilterEl.className = 'p2-12-cand-filter';
      candGrid.parentNode.insertBefore(candFilterEl, candGrid);
    }
    if (!showSearch && !showChips) { candFilterEl.hidden = true; candFilterEl.innerHTML = ''; return; }
    candFilterEl.hidden = false;

    var chipsHtml = '';
    if (showChips) {
      var chips = [{ name:'', label:'すべて', n:allowed.length }].concat(
        exhArtists().map(function(a){
          return { name:a.name, label:a.name, n:allowed.filter(function(w){ return w.author===a.name; }).length };
        }));
      chipsHtml = '<div class="p2-12-cand-filter__chips" role="group" aria-label="作者で絞り込み">'
        + chips.map(function(c){
            return '<button type="button" class="p2-12-cand-filter__chip'+(candCreator===c.name?' is-active':'')+'" data-creator="'+c.name+'">'
              + c.label + '<span class="p2-12-cand-filter__chip-n">'+c.n+'</span></button>';
          }).join('')
        + '</div>';
    }
    var toolsHtml = '';
    if (showSearch) {
      if (candSort === 'author' && !isGalleryRole()) candSort = ''; /* creator では作者順は無効 */
      var searchPh = isGalleryRole() ? '作品名・クリエイター名で絞り込み' : '作品名で絞り込み';
      var sortOpts = [
        { v:'',          label:'登録順' },
        { v:'title',     label:'作品名順' },
        { v:'year-desc', label:'制作年（新しい順）' },
        { v:'year-asc',  label:'制作年（古い順）' }
      ];
      if (isGalleryRole()) sortOpts.push({ v:'author', label:'クリエイター名順' });
      toolsHtml = '<div class="p2-12-cand-filter__tools">'
        + '<div class="p2-12-cand-filter__search">'
        +   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="15" height="15" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
        +   '<input type="search" class="p2-12-cand-filter__input" placeholder="'+searchPh+'" aria-label="'+searchPh+'" value="'+candSearch.replace(/"/g,'&quot;')+'">'
        + '</div>'
        + '<label class="p2-12-cand-filter__sort">'
        +   '<span class="p2-12-cand-filter__sort-lbl">並び順</span>'
        +   '<select class="p2-12-cand-filter__sort-sel" aria-label="並び順">'
        +     sortOpts.map(function(o){ return '<option value="'+o.v+'"'+(candSort===o.v?' selected':'')+'>'+o.label+'</option>'; }).join('')
        +   '</select>'
        + '</label>'
        + '</div>';
    }
    candFilterEl.innerHTML = chipsHtml + toolsHtml;

    Array.prototype.forEach.call(candFilterEl.querySelectorAll('.p2-12-cand-filter__chip'), function(btn){
      btn.addEventListener('click', function(){ candCreator = btn.dataset.creator; syncCandFilter(); renderCandGrid(); });
    });
    var input = candFilterEl.querySelector('.p2-12-cand-filter__input');
    if (input) input.addEventListener('input', function(){ candSearch = input.value; renderCandGrid(); });
    var sortSel = candFilterEl.querySelector('.p2-12-cand-filter__sort-sel');
    if (sortSel) sortSel.addEventListener('change', function(){ candSort = sortSel.value; renderCandGrid(); });
  }

  function renderCandGrid() {
    candGrid.innerHTML = '';
    var shown = 0;
    candSortList(candPool().filter(candMatch)).forEach(function(w) {
      var added = displayedIds.indexOf(w.id) !== -1;
      var div = document.createElement('div');
      div.className = 'p2-12-candidate-card'+(added?' is-added':'');
      div.dataset.id = w.id;
      div.title = added ? '' : '出品する';
      div.innerHTML =
        '<span class="p2-12-candidate-card__mark" aria-hidden="true">'+
          '<svg class="p2-12-candidate-card__mark-add" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" width="13" height="13"><line x1="12" y1="6" x2="12" y2="18"/><line x1="6" y1="12" x2="18" y2="12"/></svg>'+
        '</span>'+
        '<span class="p2-12-candidate-card__listed"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="11" height="11" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>出品中</span>'+
        '<div class="p2-12-candidate-card__thumb" style="background:'+w.bg+'"></div>'+
        '<div class="p2-12-candidate-card__info">'+
          '<div class="p2-12-candidate-card__title">'+w.title+'</div>'+
          '<div class="p2-12-candidate-card__author">'+(w.author||'')+'</div>'+
          '<div class="p2-12-candidate-card__meta">'+[w.year,w.medium,w.size].filter(Boolean).join('　')+'</div>'+
        '</div>';
      div.addEventListener('click', function() {
        if (div.classList.contains('is-added')) return;
        displayedIds.push(w.id);
        listEl.appendChild(makeCard(w));
        div.classList.add('is-added');
        div.title = '';
        updateCount();
        renumber();
      });
      candGrid.appendChild(div);
      shown++;
    });
    if (!candEmptyEl) {
      candEmptyEl = document.createElement('p');
      candEmptyEl.className = 'p2-12-cand-empty';
      candEmptyEl.textContent = '該当する作品がありません。';
      candGrid.parentNode.insertBefore(candEmptyEl, candGrid.nextSibling);
    }
    candEmptyEl.hidden = shown !== 0;
  }

  function openPanel() {
    addPanel.hidden = false;
    addBtn.classList.add('is-open');
    renderAddTexts();
    syncCandFilter();
    renderCandGrid();
  }
  function closePanel() {
    addPanel.hidden = true;
    addBtn.classList.remove('is-open');
  }

  /* ── 会期開始ロック（2026-07-19 仕様）──
     会期開始日以降＝モード切替ボタン・販売期間（ラジオ＋カスタム日付）を disabled にし、ロック文言を表示。
     販売期間中通知（p3-15リンク）も開始後のみ表示。本番（React CSR）は展覧会エンティティの会期開始日で判定（サーバー側でも拒否） */
  function applyTermLock() {
    var sw = document.querySelector('.p2-12-mode-switch');
    var nn = document.querySelector('.p2-12-mode-none');
    if (sw) sw.disabled = termStarted;
    if (nn) nn.disabled = termStarted;
    var modeNote = document.getElementById('p2121ModeLockNote');
    if (modeNote) modeNote.hidden = !termStarted;
    for (var i = 0; i < radios.length; i++) radios[i].disabled = termStarted;
    if (dateStart) dateStart.disabled = termStarted;
    if (dateEnd) dateEnd.disabled = termStarted;
    var pb = document.getElementById('p2121PeriodBlock');
    if (pb) pb.classList.toggle('is-locked', termStarted);
    var periodNote = document.getElementById('p2121PeriodLockNote');
    if (periodNote) periodNote.hidden = !termStarted;
    var saleNotice = document.getElementById('p2121SaleNotice');
    if (saleNotice) saleNotice.hidden = !termStarted;
  }
  applyTermLock();

  /* デモバー「会期：開始前/開始後」 */
  window.p2121DemoTerm = function (started, btn) {
    termStarted = !!started;
    applyTermLock();
    if (btn) {
      document.querySelectorAll('.dbar [onclick^="p2121DemoTerm"]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
  };

  INITIAL.forEach(function(w){ listEl.appendChild(makeCard(w)); });
  updateCount();
  renumber();

  /* デモバー「申込：あり/なし」＝w1 の申込ロックを切替（LIAISON切替ブロックの両状態確認用） */
  window.p2121DemoApply = function (on, btn) {
    var w1 = INITIAL[0];
    w1.locked = !!on;
    w1.applyCount = on ? 2 : 0;
    listEl.innerHTML = '';
    displayedIds.forEach(function (id) {
      var w = ALL.filter(function (x) { return x.id === id; })[0];
      if (w) listEl.appendChild(makeCard(w));
    });
    if (btn) {
      document.querySelectorAll('.dbar [onclick^="p2121DemoApply"]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
  };

  /* デモバー「候補：多い/少ない」＝候補プールを制限し、少数時に絞込UI（検索/作者チップ）が出ないことを確認 */
  window.p2121DemoCands = function (few, btn) {
    candPoolCap = few ? 8 : 0;
    if (!addPanel.hidden) { syncCandFilter(); renderCandGrid(); }
    if (btn) {
      document.querySelectorAll('.dbar [onclick^="p2121DemoCands"]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
  };

  /* ── 保存バリデーション（共通 .ktn-form-error パネル・デモ）──
     保存済みの販売期間＝会期と同じ（EXH_START〜EXH_END）。期間を延長し、他の展覧会に出品設定済み
     （w.otherExh）の作品と期間が重なる場合、保存ボタン直上の固定パネルにエラーを常設表示する。
     パネルは次の保存試行まで消えない（トースト不使用）。該当作品カードは赤枠で強調 */
  var errBox  = document.getElementById('p2121SaveError');
  var errList = document.getElementById('p2121SaveErrorList');
  var saveAllBtn = document.getElementById('p212SaveAll');

  function selectedPeriod() {
    var v = getCheckedValue();
    if (v === 'same')   return { start: EXH_START, end: EXH_END };
    if (v === 'plus2w') return { start: EXH_START, end: EXH_MAX };
    var s = dateStart && dateStart.value, e = dateEnd && dateEnd.value;
    return (s && e && s <= e) ? { start: s, end: e } : null;
  }
  function dayBefore(iso) {
    var d = new Date(iso + 'T00:00:00');
    d.setDate(d.getDate() - 1);
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function clearConflictMarks() {
    listEl.querySelectorAll('.p2-12-work-card--conflict').forEach(function (c) { c.classList.remove('p2-12-work-card--conflict'); });
  }

  if (saveAllBtn && errBox && errList) saveAllBtn.addEventListener('click', function () {
    clearConflictMarks();
    var items = [];
    var p = selectedPeriod();
    if (!p) {
      items.push('<li class="ktn-form-error__item">販売期間（カスタム）の開始日・終了日を選択してください。'
        + '<button type="button" class="ktn-form-error__jump" data-jump="p2121PeriodBlock">販売期間の設定へ →</button></li>');
    } else {
      var conflicts = displayedIds.map(function (id) {
        return ALL.filter(function (x) { return x.id === id; })[0];
      }).filter(function (w) {
        return w && w.otherExh && w.otherExh.start <= p.end && p.start <= w.otherExh.end;
      });
      if (conflicts.length) {
        conflicts.forEach(function (w) {
          var card = listEl.querySelector('[data-id="' + w.id + '"]');
          if (card) card.classList.add('p2-12-work-card--conflict');
        });
        var minStart = conflicts.map(function (w) { return w.otherExh.start; }).sort()[0];
        items.push('<li class="ktn-form-error__item">'
          + '設定した販売期間（' + fmtRange(p.start, p.end) + '）に、他の展覧会で出品設定済みの作品が'
          + conflicts.length + '点含まれるため、この販売期間は設定できません。'
          + '<div class="ktn-form-error__detail">'
          + conflicts.map(function (w) {
              return '<span><span class="ktn-form-error__name">' + w.title + '</span>（' + w.author + '）— '
                + '<span class="ktn-form-error__name">' + w.otherExh.title + '</span>（'
                + fmtRange(w.otherExh.start, w.otherExh.end) + '）に出品設定済み</span>';
            }).join('')
          + '</div>'
          + '<span class="ktn-form-error__hint">販売期間の終了日を ' + fmtDate(dayBefore(minStart))
          + ' 以前に変更するか、該当作品を展示作品リストから外して保存してください。</span>'
          + '<button type="button" class="ktn-form-error__jump" data-jump="p2121PeriodBlock">販売期間の設定へ →</button></li>');
      }
    }
    if (items.length) {
      errList.innerHTML = items.join('');
      errBox.hidden = false;
      errList.querySelectorAll('.ktn-form-error__jump').forEach(function (b) {
        b.addEventListener('click', function () {
          var t = document.getElementById(b.dataset.jump);
          if (t) t.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      });
      errBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      errBox.hidden = true;
      if (typeof KTN !== 'undefined' && KTN.toast) KTN.toast('変更を保存しました（デモ）');
    }
  });

  if (window.Sortable) {
    Sortable.create(listEl, {
      handle: '.p2-12-work-card__handle',
      animation: 150,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      onEnd: function() {
        displayedIds = [];
        listEl.querySelectorAll('.p2-12-work-card').forEach(function(c){ displayedIds.push(c.dataset.id); });
        renumber();
      },
    });
  }

  /* ── 並べ替えモード：カードをハンドル＋サムネ＋No.＋作品名の薄い行に圧縮し、スマホでも一覧しながら並べ替えやすくする ── */
  var reorderBtn = document.getElementById('p212ReorderBtn');
  if (reorderBtn) {
    var reorderScope = listEl.closest('.p2-12-works-block') || listEl;
    reorderBtn.addEventListener('click', function () {
      var on = reorderScope.classList.toggle('is-reordering');
      reorderBtn.classList.toggle('is-active', on);
      reorderBtn.textContent = on ? '並べ替え完了' : '並べ替え';
    });
  }

  addBtn.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);

  var descTA = document.getElementById('p212ExhibitDesc');
  var descCount = document.getElementById('p212DescCount');
  if (descTA && descCount) {
    var MAX = 200;
    function updateDescCount() {
      var len = descTA.value.length;
      descCount.textContent = len + ' / ' + MAX;
      descCount.style.color = len > MAX ? '#c0392b' : '';
    }
    descTA.addEventListener('input', updateDescCount);
  }

  bindNewBtn();
  openPanel();

  /* ── ロール切替に追従（デモバー creator/gallery）── */
  var _prevRender = window.ktnRender;
  window.ktnRender = function () {
    if (typeof _prevRender === 'function') _prevRender();
    renderAddTexts();
    candCreator = ''; /* ロール変更で作者候補が変わるためリセット */
    syncCandFilter();
    renderCandGrid();
  };

};

/* P3/P4系ページ本人（オーナー）ページの複数watchボタン（ヒーロー/サイド/ヘッダーHIB）を束ねて同期トグルする。
   直接 querySelectorAll → forEach → addEventListener で個々の要素にバインドすると、ロール切替のたびに
   getActions() が #ktnActs を丸ごと再描画してヘッダーHIBのDOM要素ごと差し替わり、リスナーが失われて
   動作しなくなる（P3/P4トップ・下位ページ共通の不具合）。document への delegated listener にすることで
   要素の生成・破棄に依存せず動作する。ページ初期化時に一度だけ呼ぶ。 */
function ktnBindWatchSync() {
  document.querySelectorAll('[data-action="watch"]').forEach(function (b) {
    if (!b.closest('.cc,.gc,.uc') && b.closest('.ktn-cta-widget, .p2-action-widget')) b.dataset.ctaInit = '1';
  });
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action="watch"]');
    if (!btn || btn.closest('.cc,.gc,.uc')) return;
    if ((window.ktnState || {}).role === 'guest') { KTN.action.handle(btn, 'watch'); return; }
    var isOn = btn.classList.contains('on');
    var watchBtns = Array.prototype.filter.call(document.querySelectorAll('[data-action="watch"]'), function (b) { return !b.closest('.cc,.gc,.uc'); });
    watchBtns.forEach(function (b) {
      b.classList.toggle('on', !isOn);
      var lbl = b.querySelector('.ktn-btn__lbl');
      var newText = !isOn ? (b.dataset.on || 'watching') : (b.dataset.off || 'watch');
      if (lbl) { lbl.textContent = newText; }
      else { var tn = Array.from(b.childNodes).find(function (n) { return n.nodeType === 3 && n.textContent.trim(); }); if (tn) tn.textContent = ' ' + newText; }
      var tip = b.querySelector('.tip');
      if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
    });
    KTN.toast(isOn ? 'ウォッチを解除しました' : 'ウォッチしました');
  });
}

/* ────────────────────────────────────────────────────
   P3 クリエイタートップ
──────────────────────────────────────────────────── */
KTN.pages['p3'] = function () {
  var d = window.P3_DATA || {};

  // 0. ページスコープ（クラス + アクセントカラー変数）
  document.body.classList.add('p3-page');
  document.body.style.setProperty('--page-accent',        '#2a5f7a');
  document.body.style.setProperty('--page-accent-bg',     'rgba(42,95,122,.1)');
  document.body.style.setProperty('--page-accent-border', '#5a8fa8');

  // 0b. ヒーロー初期設定
  if (typeof applyHeadImageMode === 'function') applyHeadImageMode(d.hasImage !== false);
  var activeBadge = document.getElementById('p3HeadActiveBadge');
  if (activeBadge && d.hasActiveExhibition) activeBadge.removeAttribute('hidden');

  // 0b. tagbar（ジャンル・地域タグ）
  (function(){
    var inner = document.getElementById('ktnTagbarInner');
    if (!inner) return;
    [{label:'絵画'},{label:'現代美術'},{sep:true},{label:'東京'},{sep:true},{label:'個展なびを知る'}
    ].forEach(function(t){
      var el;
      if (t.sep){ el=document.createElement('span'); el.className='p2-tsep'; el.textContent='|'; }
      else{
        el=document.createElement('button'); el.className='p2-tpill'; el.textContent=t.label;
        el.addEventListener('click',function(){
          inner.querySelectorAll('.p2-tpill').forEach(function(b){b.classList.remove('is-active');});
          this.classList.add('is-active');
        });
      }
      inner.appendChild(el);
    });
  })();

  // 0c. タブナビ NEW バッジ表示制御
  if (d.newBadges) {
    Object.keys(d.newBadges).forEach(function(key){
      if (!d.newBadges[key]) return;
      var badge = document.querySelector('.p3-tabnav__new[data-new="' + key + '"]');
      if (badge) badge.classList.add('is-visible');
    });
  }

  // 1. watchボタン トグル（ヒーロー + サイド + ヘッダーHIB 連動）
  ktnBindWatchSync();

  // 2. ウォッチャーモーダル
  var modal = document.getElementById('p3WatcherModal');
  var watcherList = document.getElementById('p3WatcherList');
  if (modal && watcherList && d.watchers) {
    watcherList.innerHTML = d.watchers.map(function(w){
      return '<div class="p3-watcher-item">'
        +'<div class="p3-watcher-item__avatar" style="background:'+w.avatar+'">'+w.name.charAt(0)+'</div>'
        +'<div class="p3-watcher-item__name">'+w.name+'</div></div>';
    }).join('');
    document.querySelectorAll('[data-action="open-watchers"]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeWatcherModal(){
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    var closeBtn = document.getElementById('p3WatcherModalClose');
    closeBtn && closeBtn.addEventListener('click', closeWatcherModal);
    modal.querySelector('.p3-watcher-modal__overlay').addEventListener('click', closeWatcherModal);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ closeWatcherModal(); closeGallery(); } });
  }

  // 2b. 自己紹介 条件分岐 + 2段階展開
  // フォント読み込み完了後に scrollHeight を計測（未ロード時の誤判定を防ぐ）
  var bioToggle = document.getElementById('p3HeadBioToggle');
  var bioText   = document.getElementById('p3HeadBioText');
  var bioLink   = document.getElementById('p3HeadBioProfileLink');
  if (bioLink) {
    bioLink.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.getElementById('p3-sec-profile');
      if (!target) return;
      var hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hh') || '56', 10);
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - hh - 60, behavior: 'smooth' });
      document.querySelectorAll('.p3-tabnav__item').forEach(function(btn){
        btn.classList.toggle('is-active', btn.dataset.target === 'p3-sec-profile');
      });
    });
  }
  document.fonts.ready.then(function(){
    if (!bioText || !bioToggle || !bioLink) return;
    if (bioText.scrollHeight <= bioText.clientHeight) {
      // clampが効いていない（短いテキスト）→ toggle不要・リンクを直接表示
      bioToggle.style.display = 'none';
      bioLink.classList.add('is-visible');
    } else {
      // clamp効いている → toggleクリックで展開
      bioToggle.addEventListener('click', function(){
        bioText.classList.add('is-expanded');
        bioToggle.style.display = 'none';
        bioLink.classList.add('is-visible');
      });
    }
  });

  // 3. 写真ライトボックス
  var galleryModal = document.getElementById('p3GalleryModal');
  var galleryModalBg = document.getElementById('p3GalleryModalBg');
  var galleryModalCaption = document.getElementById('p3GalleryModalCaption');
  function openGallery(bg, label){
    if (!galleryModal) return;
    if (galleryModalBg) galleryModalBg.style.cssText = 'position:absolute;inset:0;background:'+bg+';border-radius:4px';
    if (galleryModalCaption) galleryModalCaption.textContent = label;
    galleryModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeGallery(){
    if (!galleryModal) return;
    galleryModal.setAttribute('hidden','');
    document.body.style.overflow = '';
  }
  if (galleryModal) {
    document.getElementById('p3GalleryModalClose').addEventListener('click', closeGallery);
    galleryModalBg && galleryModalBg.addEventListener('click', closeGallery);
  }

  // 3b. プロフィール画像ギャラリー
  (function(){
    var layout    = document.getElementById('p3ProfBioLayout');
    var mainEl    = document.getElementById('p3ProfMediaMain');
    var captionEl = document.getElementById('p3ProfMediaCaption');
    var thumbsEl  = document.getElementById('p3ProfMediaThumbs');
    var imgs      = (d.profile && d.profile.images) ? d.profile.images : [];
    var count     = imgs.length;

    if (layout) layout.dataset.imgCount = count;
    if (!mainEl || count === 0) return;

    function showImage(img) {
      mainEl.style.background = img.bg;
      mainEl.dataset.caption  = img.caption;
      if (captionEl) captionEl.textContent = img.caption;
    }

    // 初期表示
    showImage(imgs[0]);
    mainEl.addEventListener('click', function(){
      openGallery(mainEl.style.background, mainEl.dataset.caption || '');
    });

    // サムネイル生成（2枚以上）
    if (thumbsEl && count >= 2) {
      imgs.forEach(function(img, i){
        var t = document.createElement('div');
        t.className = 'p3-prof-media-thumb' + (i === 0 ? ' is-active' : '');
        t.style.background = img.bg;
        t.addEventListener('click', function(){
          showImage(img);
          thumbsEl.querySelectorAll('.p3-prof-media-thumb').forEach(function(el){
            el.classList.remove('is-active');
          });
          t.classList.add('is-active');
        });
        thumbsEl.appendChild(t);
      });
    }
  })();

  // 3c. 略歴の折りたたみ（画像エリア高さを超える場合）
  (function(){
    var bioEl    = document.getElementById('p3ProfBio');
    var mediaEl  = document.getElementById('p3ProfMedia');
    var layout   = document.getElementById('p3ProfBioLayout');
    var toggleEl = document.getElementById('p3ProfBioToggle');
    if (!bioEl || !mediaEl || !toggleEl) return;

    var expanded = false;

    function applyClamp() {
      var isCol = window.getComputedStyle(layout).flexDirection === 'column';
      if (isCol || mediaEl.offsetHeight === 0) {
        bioEl.style.maxHeight = '';
        toggleEl.classList.remove('is-visible');
        return;
      }
      var mediaH = mediaEl.offsetHeight;
      if (!expanded && bioEl.scrollHeight > mediaH + 2) {
        bioEl.style.maxHeight = mediaH + 'px';
        toggleEl.classList.add('is-visible');
        toggleEl.textContent = 'もっと見る';
      } else if (!expanded) {
        bioEl.style.maxHeight = '';
        toggleEl.classList.remove('is-visible');
      }
    }

    toggleEl.addEventListener('click', function() {
      expanded = !expanded;
      if (expanded) {
        bioEl.style.maxHeight = bioEl.scrollHeight + 'px';
        toggleEl.textContent = '閉じる';
      } else {
        bioEl.style.maxHeight = mediaEl.offsetHeight + 'px';
        toggleEl.textContent = 'もっと見る';
      }
    });

    applyClamp();
    window.addEventListener('resize', function() {
      expanded = false;
      applyClamp();
    });
  })();

  // 4. アコーディオン（height アニメーション）
  document.querySelectorAll('.p3-accordion__head').forEach(function(btn){
    var accordion = btn.closest('.p3-accordion');
    var body = accordion && accordion.querySelector('.p3-accordion__body');
    if (!body) return;
    btn.addEventListener('click', function(){
      var isOpen = accordion.classList.contains('is-open');
      if (isOpen) {
        body.style.height = body.scrollHeight + 'px';
        requestAnimationFrame(function(){
          requestAnimationFrame(function(){ body.style.height = '0'; });
        });
        accordion.classList.remove('is-open');
      } else {
        accordion.classList.add('is-open');
        body.style.height = body.scrollHeight + 'px';
        body.addEventListener('transitionend', function onEnd(){
          body.style.height = 'auto';
          body.removeEventListener('transitionend', onEnd);
        });
      }
    });
  });

  // 5. LIAISONカード表示制御（creator / admin ロールのみ）
  var liaisonCard = document.getElementById('p3SideLiaison');
  if (liaisonCard) {
    function updateLiaison(){
      var cls = document.body.className || '';
      liaisonCard.classList.toggle('is-visible', cls.indexOf('creator') !== -1 || cls.indexOf('admin') !== -1);
    }
    updateLiaison();
    document.querySelectorAll('.dbtn').forEach(function(btn){
      btn.addEventListener('click', function(){ setTimeout(updateLiaison, 50); });
    });
  }

  // 5b. サイドバー 記事ウィジェット
  var sideArticlesCard = document.getElementById('p3-sec-articles');
  var sideArticlesList = document.getElementById('p3SideArticlesList');
  if (sideArticlesCard && sideArticlesList) {
    if (d.articles && d.articles.length) {
      sideArticlesList.innerHTML = d.articles.slice(0, 3).map(function(a){
        var thumb = a.hasImg
          ? '<div class="lc__thumb lc__thumb--article"><span class="lc__thumb-label">article</span></div>'
          : '';
        return '<a class="lc lc--article' + (a.hasImg ? '' : ' lc--noimg') + '" href="#">'
          + thumb
          + '<div class="lc__body">'
          + '<div class="lc__badge-row">'
          + (a.isNew ? '<span class="nb">new</span>' : '')
          + '<span class="cb cb-content cb-article">article</span>'
          + '</div>'
          + '<div class="lc__title">' + a.title + '</div>'
          + '<div class="lc__byline"><span class="lc__date">' + a.date + '</span></div>'
          + '</div></a>';
      }).join('');
      sideArticlesCard.classList.add('is-visible');
    }
  }

  // 5c. サイドバー 開催中展覧会ウィジェット（マソンリーカード型）
  var sideExhibitionCard = document.getElementById('p3SideExhibitionCard');
  var sideExhibitionEl   = document.getElementById('p3SideExhibition');
  if (sideExhibitionCard && sideExhibitionEl && d.hasActiveExhibition && d.activeExhibition) {
    var ex = d.activeExhibition;
    var liaStripHtml = ex.isLiaison
      ? '<div class="ec__liaison-strip">'
        + '<div class="ec__liaison-strip-info">'
        + '<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>'
        + '<span class="ec__liaison-subtext">オンライン作品展示中</span>'
        + '</div></div>'
      : '';
    sideExhibitionEl.innerHTML = '<a class="ec" href="#">'
      + '<div class="ec__poster" style="background:linear-gradient(135deg,#8ab8c0,#5a8890)">'
      + '<div class="ec__poster-noimg"></div>'
      + '<div class="ec__poster-overlay">'
      + '<div class="ec__poster-dates"><strong>' + ex.dateRange + '</strong></div>'
      + '</div></div>'
      + '<div class="ec__body">'
      + '<div class="ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span></div>'
      + '<div class="ec__title">' + ex.title + '</div>'
      + '<div class="ec__venue">' + ex.venue + '</div>'
      + '</div>'
      + liaStripHtml
      + '</a>';
    sideExhibitionCard.classList.add('is-visible');
  }

  // 5d. リンクボタン生成（p3-prof-links）
  var profLinks = document.getElementById('p3ProfLinks');
  if (profLinks && d.profile && d.profile.links && d.profile.links.length) {
    var globeSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg>';
    var bagSvg   = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';
    var pkgSvg   = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>';
    var linkSvg  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
    // SimpleIcons slugs（存在するもの）
    var siSlug = {
      behance:'behance', artstation:'artstation',
      instagram:'instagram', x:'x', twitter:'x', facebook:'facebook',
      threads:'threads', bluesky:'bluesky', pinterest:'pinterest',
      tiktok:'tiktok', youtube:'youtube',
      note:'note', substack:'substack',
      etsy:'etsy', shopify:'shopify',
      pixiv:'pixiv', linktree:'linktree', litlink:'litlink'
    };
    // lucide SVGで代替するもの
    var svgFallback = { hp:globeSvg, base:bagSvg, minne:bagSvg, creema:bagSvg, stores:bagSvg, iichi:bagSvg, booth:pkgSvg };
    function getLinkIcon(type) {
      if (svgFallback[type]) return svgFallback[type];
      if (!siSlug[type])     return linkSvg;
      return '<img src="https://cdn.simpleicons.org/' + siSlug[type] + '" width="16" height="16" alt="' + type + '">';
    }
    profLinks.innerHTML = d.profile.links.map(function(lk){
      return '<a href="' + lk.url + '" class="p3-prof-link-btn" target="_blank" rel="noopener noreferrer" title="' + lk.label + '">'
        + getLinkIcon(lk.type) + '</a>';
    }).join('');
  }

  // 6. アーカイブ件数
  var archiveCount = document.getElementById('p3ArchiveCount');
  if (archiveCount && d.archiveCount) archiveCount.textContent = d.archiveCount;

  // 6b. 作品グリッド生成
  var statusBadgeMap = {
    sale:    '<span class="aws aws-sale">販売中</span>',
    nsale:   '<span class="aws aws-nsale">非売品</span>',
    inquiry: '<span class="aws aws-inquiry">要問合せ</span>',
    sold:    '<span class="aws aws-sold">売却済</span>'
  };
  var worksTotalImgSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">'
    +'<rect x="3" y="3" width="18" height="18" rx="2"/>'
    +'<circle cx="8.5" cy="8.5" r="1.5"/>'
    +'<polyline points="21 15 16 10 5 21"/>'
    +'</svg>';

  function renderP3Works(d) {
    var worksGrid = document.getElementById('p3WorksGrid');
    var worksSection = document.getElementById('p3-sec-works');
    if (!worksGrid) return;

    // 前回挿入した全作品リンクを削除
    var prevLink = document.getElementById('p3WorksTotalLink');
    if (prevLink) prevLink.remove();

    // セクション・タブの状態リセット
    if (worksSection) worksSection.style.display = '';
    var worksTab = document.querySelector('.p3-tabnav__item[data-target="p3-sec-works"]');
    if (worksTab) worksTab.classList.remove('disabled');

    var liaisons = (d.exhibitions || []).filter(function(ex){ return ex.isLiaison || ex.isLiaisonPlus; });
    liaisons.sort(function(a, b){
      var aScore = (a.isLiaisonPlus ? 0 : 2) + (a.status === 'live' ? 0 : 1);
      var bScore = (b.isLiaisonPlus ? 0 : 2) + (b.status === 'live' ? 0 : 1);
      return aScore - bScore;
    });

    var hasWorks = d.works && d.works.length;
    var hasLiaison = liaisons.length > 0;

    if (!hasWorks && !hasLiaison) {
      if (worksSection) worksSection.style.display = 'none';
      if (worksTab) worksTab.classList.add('disabled');

    } else if (!hasLiaison) {
      // パターン1: 通常グリッド表示（p25c）
      worksGrid.className = 'p2-5-grid';
      var sorted = d.works.slice().sort(function(a,b){ return (b.isLiaison?1:0)-(a.isLiaison?1:0); });
      worksGrid.innerHTML = sorted.slice(0, 4).map(function(w){
        return buildP25cCard(w, null);
      }).join('');

    } else {
      // パターン2・3: LIAISONバンド表示
      worksGrid.className = '';
      worksGrid.innerHTML = liaisons.map(function(ex){
        var isPlus   = ex.isLiaisonPlus;
        var bandCls  = 'p3-works-liaison-band' + (isPlus ? ' p3-works-liaison-band--plus' : '');
        var dotCls   = isPlus ? 'lb-dot li-plus' : 'lb-dot li';
        var dotLabel = isPlus ? 'LIAISON+' : 'LIAISON';
        var venueHtml = ex.venue ? '<span class="p3-works-liaison-band__venue">'+ex.venue+'</span>' : '';
        var metaText  = ex.remain || '';
        var titleHtml = ex.url
          ? '<a class="p3-works-liaison-band__title" href="'+ex.url+'">'+ex.title+'</a>'
          : '<span class="p3-works-liaison-band__title">'+ex.title+'</span>';

        var liaisonType = isPlus ? 'li-plus' : 'li';
        var cards = (ex.works || []).slice(0, 3).map(function(w){
          return buildP25cCard(w, liaisonType);
        }).join('');

        return '<div class="'+bandCls+'">'
          +'<div class="p3-works-liaison-band__head">'
          +'<span class="'+dotCls+'"><span class="lb-dot-inner"></span>'+dotLabel+'</span>'
          +titleHtml
          +venueHtml
          +'<span class="p3-works-liaison-band__meta">'+metaText+'</span>'
          +'</div>'
          +'<div class="p3-works-liaison-band__cards">'+cards+'</div>'
          +'</div>';
      }).join('');

      // 全作品リンク
      if (d.worksTotal) {
        worksGrid.insertAdjacentHTML('afterend',
          '<a id="p3WorksTotalLink" href="kotennavi-p3-3.html" class="p3-archive-link" style="margin-top:8px">'
          +worksTotalImgSvg
          +'<span>全作品 <strong>'+d.worksTotal+'</strong> 件を見る</span>'
          +'<span class="p3-archive-link__arr">→</span>'
          +'</a>'
        );
      }
    }
  }

  renderP3Works(d);
  window.renderP3Works = renderP3Works;

  // 6c. 記事リスト生成（※メイン記事セクションは削除済み・サイドバーのみ）

  // 7. 写真グリッド生成（.p3-photos__item）
  var photosGrid = document.getElementById('p3PhotosGrid');
  if (photosGrid && d.photos) {
    photosGrid.innerHTML = d.photos.map(function(p){
      return '<div class="p3-photos__item" style="background:'+p.bg+'" data-bg="'+p.bg+'" data-label="'+p.label+'">'
        +'<span class="p3-photos__label">'+p.label+'</span></div>';
    }).join('');
    photosGrid.querySelectorAll('.p3-photos__item').forEach(function(item){
      item.addEventListener('click', function(){
        openGallery(item.dataset.bg, item.dataset.label);
      });
    });
  }

  // 8. タブナビ IntersectionObserver
  var tabnav = document.getElementById('p3Tabnav');
  if (tabnav && 'IntersectionObserver' in window) {
    var tabBtns = tabnav.querySelectorAll('.p3-tabnav__item');
    var sections = document.querySelectorAll('.p3-main > section[id]');
    var hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hh') || '56', 10);
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        tabBtns.forEach(function(btn){
          btn.classList.toggle('is-active', btn.dataset.target === id);
        });
      });
    }, { rootMargin: '-' + (hh + 60) + 'px 0px -60% 0px', threshold: 0 });
    sections.forEach(function(sec){ obs.observe(sec); });

    tabBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        var target = document.getElementById(btn.dataset.target);
        if (!target) return;
        var top = target.getBoundingClientRect().top + scrollY - hh - 60;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  // 9. ヒーロースクロールアウト → ヘッダー is-scrolled
  var p3Head = document.querySelector('.p3-head');
  var ktnHeader = document.getElementById('ktnHeader');
  if (p3Head && ktnHeader && 'IntersectionObserver' in window) {
    new IntersectionObserver(function(entries){
      ktnHeader.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(p3Head);
  }

  /* ── スティッキーCTAバー：ヒーロースクロールアウト後に出現 ── */
  (function () {
    var hero      = document.getElementById('p3Hero');
    var cta       = document.getElementById('p3StickyCta');
    var stickyBtn = document.getElementById('p3StickyWatchBtn');
    if (!cta || !hero) return;

    function showCta(visible) {
      cta.classList.toggle('is-visible', visible);
      cta.setAttribute('aria-hidden', visible ? 'false' : 'true');
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        showCta(!entries[0].isIntersecting);
      }, { threshold: 0 }).observe(hero);
    } else {
      function onScroll() {
        showCta(hero.getBoundingClientRect().bottom <= 0);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (!stickyBtn) return;

    function applyWatch(on) {
      stickyBtn.classList.toggle('on', on);
      Array.prototype.filter.call(document.querySelectorAll('.ktn-btn[data-action="watch"]'), function(b){return !b.closest('.cc,.gc,.uc');}).forEach(function (btn) {
        btn.classList.toggle('on', on);
        var lbl = btn.querySelector('.ktn-btn__lbl');
        if (lbl) lbl.textContent = on ? 'watching' : 'watch';
        var tip = btn.querySelector('.tip');
        if (tip) tip.textContent = on ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
    }

    stickyBtn.addEventListener('click', function () {
      applyWatch(!stickyBtn.classList.contains('on'));
    });

    Array.prototype.filter.call(document.querySelectorAll('.ktn-btn[data-action="watch"]'), function(b){return !b.closest('.cc,.gc,.uc');}).forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTimeout(function () {
          stickyBtn.classList.toggle('on', btn.classList.contains('on'));
        }, 0);
      });
    });
  })();

  /* QRシェアモーダルは KTN.cta.openQrModal に統一 */
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.closeQrModal(); });
};

/* ────────────────────────────────────────────────────
   P3-1 展覧会一覧
──────────────────────────────────────────────────── */
KTN.pages['p3-1'] = function () {
  var d = window.P3_DATA || {};

  // 0. ページスコープ・アクセントカラー
  document.body.classList.add('p3-page', 'p3-1-page');
  document.body.style.setProperty('--page-accent',        '#2a5f7a');
  document.body.style.setProperty('--page-accent-bg',     'rgba(42,95,122,.1)');
  document.body.style.setProperty('--page-accent-border', '#5a8fa8');

  // 0b. ヒーロー初期設定
  if (typeof applyHeadImageMode === 'function') applyHeadImageMode(d.hasImage !== false);
  var activeBadge = document.getElementById('p3HeadActiveBadge');
  if (activeBadge && d.hasActiveExhibition) activeBadge.removeAttribute('hidden');

  // 0c. tagbar
  (function(){
    var inner = document.getElementById('ktnTagbarInner');
    if (!inner) return;
    [{label:'絵画'},{label:'現代美術'},{sep:true},{label:'東京'},{sep:true},{label:'個展なびを知る'}
    ].forEach(function(t){
      var el;
      if (t.sep){ el=document.createElement('span'); el.className='p2-tsep'; el.textContent='|'; }
      else{
        el=document.createElement('button'); el.className='p2-tpill'; el.textContent=t.label;
        el.addEventListener('click',function(){
          inner.querySelectorAll('.p2-tpill').forEach(function(b){b.classList.remove('is-active');});
          this.classList.add('is-active');
        });
      }
      inner.appendChild(el);
    });
  })();

  // 1. タブナビ: 展覧会をアクティブ・他タブは各サブページへ
  document.querySelectorAll('.p3-tabnav__item').forEach(function(btn){
    if (btn.dataset.tab === 'exhibitions') {
      btn.classList.add('is-active');
    } else {
      btn.addEventListener('click', function(){
        if (btn.dataset.tab === 'articles') {
          window.location.href = 'kotennavi-p3-2.html';
        } else if (btn.dataset.tab === 'works') {
          window.location.href = 'kotennavi-p3-3.html';
        } else if (btn.dataset.target) {
          window.location.href = 'kotennavi-p3.html#' + btn.dataset.target;
        }
      });
    }
  });

  // 2. watchボタン トグル
  ktnBindWatchSync();

  // 3. ウォッチャーモーダル
  var modal = document.getElementById('p3WatcherModal');
  var watcherList = document.getElementById('p3WatcherList');
  if (modal && watcherList && d.watchers) {
    watcherList.innerHTML = d.watchers.map(function(w){
      return '<div class="p3-watcher-item">'
        +'<div class="p3-watcher-item__avatar" style="background:'+w.avatar+'">'+w.name.charAt(0)+'</div>'
        +'<div class="p3-watcher-item__name">'+w.name+'</div></div>';
    }).join('');
    document.querySelectorAll('[data-action="open-watchers"]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeWatcherModal(){
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    var closeBtn = document.getElementById('p3WatcherModalClose');
    closeBtn && closeBtn.addEventListener('click', closeWatcherModal);
    modal.querySelector('.p3-watcher-modal__overlay').addEventListener('click', closeWatcherModal);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeWatcherModal(); });
  }

  // 3b. 自己紹介 2段階展開
  document.fonts.ready.then(function(){
    var bioToggle = document.getElementById('p3HeadBioToggle');
    var bioText   = document.getElementById('p3HeadBioText');
    var bioLink   = document.getElementById('p3HeadBioProfileLink');
    if (!bioText || !bioToggle || !bioLink) return;
    if (bioText.scrollHeight <= bioText.clientHeight) {
      bioToggle.style.display = 'none';
      bioLink.classList.add('is-visible');
    } else {
      bioToggle.addEventListener('click', function(){
        bioText.classList.add('is-expanded');
        bioToggle.style.display = 'none';
        bioLink.classList.add('is-visible');
      });
    }
  });

  // 4. フィルター絞り込み
  (function(){
    var selects = document.querySelectorAll('.p3-1-filter__select');
    var filterCountEl = document.getElementById('p3FilterCount');
    var emptyEl = document.getElementById('p3FilterEmpty');

    function filterExhibitions() {
      var year = document.getElementById('p3FilterYear') ? document.getElementById('p3FilterYear').value : '';
      var pref = document.getElementById('p3FilterPref') ? document.getElementById('p3FilterPref').value : '';
      var type = document.getElementById('p3FilterType') ? document.getElementById('p3FilterType').value : '';
      var hasFilter = !!(year || pref || type);
      var totalVisible = 0;

      document.querySelectorAll('.p3-1-group').forEach(function(group) {
        var groupVisible = 0;

        // 各カードを評価
        group.querySelectorAll('.ec--h').forEach(function(card) {
          var match = (!year || card.dataset.year === year)
                   && (!pref  || card.dataset.pref  === pref)
                   && (!type  || card.dataset.type  === type);
          if (match) {
            card.removeAttribute('hidden');
            groupVisible++;
          } else {
            card.setAttribute('hidden', '');
          }
        });

        // 年グループ（過去）：表示カードが0なら非表示
        group.querySelectorAll('.p3-1-year-group').forEach(function(yg) {
          var ygVisible = 0;
          yg.querySelectorAll('.ec--h').forEach(function(c) {
            if (!c.hasAttribute('hidden')) ygVisible++;
          });
          if (ygVisible === 0) {
            yg.setAttribute('hidden', '');
          } else {
            yg.removeAttribute('hidden');
          }
        });

        // グループ件数を更新
        var countEl = group.querySelector('.p3-1-group-count');
        if (countEl) countEl.textContent = groupVisible + '件';

        // グループ全体を表示/非表示
        if (groupVisible === 0) {
          group.setAttribute('hidden', '');
        } else {
          group.removeAttribute('hidden');
          totalVisible += groupVisible;
        }
      });

      // フィルター件数表示
      if (filterCountEl) {
        if (hasFilter) {
          filterCountEl.textContent = totalVisible + '件を表示中';
          filterCountEl.removeAttribute('hidden');
        } else {
          filterCountEl.setAttribute('hidden', '');
        }
      }

      // 空の状態
      if (emptyEl) {
        if (totalVisible === 0) {
          emptyEl.classList.add('is-visible');
        } else {
          emptyEl.classList.remove('is-visible');
        }
      }
    }

    selects.forEach(function(sel) {
      sel.addEventListener('change', filterExhibitions);
    });
  })();
};

/* ════════════════════════════════════════
   p3-2  記事一覧ページ
════════════════════════════════════════ */
KTN.pages['p3-2'] = function () {
  var d = window.P3_DATA || {};

  // 0. ページスコープ・アクセントカラー
  document.body.classList.add('p3-page', 'p3-2-page');
  document.body.style.setProperty('--page-accent',        '#2a5f7a');
  document.body.style.setProperty('--page-accent-bg',     'rgba(42,95,122,.1)');
  document.body.style.setProperty('--page-accent-border', '#5a8fa8');

  // 0b. ヒーロー初期設定（アクティブバッジ）
  var activeBadge = document.getElementById('p3HeadActiveBadge');
  if (activeBadge && d.hasActiveExhibition) activeBadge.removeAttribute('hidden');

  // 0c. tagbar
  (function(){
    var inner = document.getElementById('ktnTagbarInner');
    if (!inner) return;
    [{label:'絵画'},{label:'現代美術'},{sep:true},{label:'東京'},{sep:true},{label:'個展なびを知る'}
    ].forEach(function(t){
      var el;
      if (t.sep){ el=document.createElement('span'); el.className='p2-tsep'; el.textContent='|'; }
      else{
        el=document.createElement('button'); el.className='p2-tpill'; el.textContent=t.label;
        el.addEventListener('click',function(){
          inner.querySelectorAll('.p2-tpill').forEach(function(b){b.classList.remove('is-active');});
          this.classList.add('is-active');
        });
      }
      inner.appendChild(el);
    });
  })();

  // 1. タブナビ: 記事をアクティブ・他タブは各サブページへ
  document.querySelectorAll('.p3-tabnav__item').forEach(function(btn){
    if (btn.dataset.tab === 'articles') {
      btn.classList.add('is-active');
    } else {
      btn.addEventListener('click', function(){
        if (btn.dataset.tab === 'exhibitions') {
          window.location.href = 'kotennavi-p3-1.html';
        } else if (btn.dataset.tab === 'works') {
          window.location.href = 'kotennavi-p3-3.html';
        } else if (btn.dataset.target) {
          window.location.href = 'kotennavi-p3.html#' + btn.dataset.target;
        }
      });
    }
  });

  // 2. watchボタン トグル
  ktnBindWatchSync();

  // 3. ウォッチャーモーダル
  var modal = document.getElementById('p3WatcherModal');
  var watcherList = document.getElementById('p3WatcherList');
  if (modal && watcherList && d.watchers) {
    watcherList.innerHTML = d.watchers.map(function(w){
      return '<div class="p3-watcher-item">'
        +'<div class="p3-watcher-item__avatar" style="background:'+w.avatar+'">'+w.name.charAt(0)+'</div>'
        +'<div class="p3-watcher-item__name">'+w.name+'</div></div>';
    }).join('');
    document.querySelectorAll('[data-action="open-watchers"]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeWatcherModal(){
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    var closeBtn = document.getElementById('p3WatcherModalClose');
    closeBtn && closeBtn.addEventListener('click', closeWatcherModal);
    modal.querySelector('.p3-watcher-modal__overlay').addEventListener('click', closeWatcherModal);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeWatcherModal(); });
  }

  // 3b. 自己紹介 2段階展開
  document.fonts.ready.then(function(){
    var bioToggle = document.getElementById('p3HeadBioToggle');
    var bioText   = document.getElementById('p3HeadBioText');
    var bioLink   = document.getElementById('p3HeadBioProfileLink');
    if (!bioText || !bioToggle || !bioLink) return;
    if (bioText.scrollHeight <= bioText.clientHeight) {
      bioToggle.style.display = 'none';
      bioLink.classList.add('is-visible');
    } else {
      bioToggle.addEventListener('click', function(){
        bioText.classList.add('is-expanded');
        bioToggle.style.display = 'none';
        bioLink.classList.add('is-visible');
      });
    }
  });

  // 4. 記事フィルター絞り込み
  (function(){
    var selects = document.querySelectorAll('.p3-2-filter__select');
    var filterCountEl = document.getElementById('p3FilterCount');
    var emptyEl = document.getElementById('p3FilterEmpty');

    function filterArticles() {
      var dest     = document.getElementById('p3FilterDest')     ? document.getElementById('p3FilterDest').value     : '';
      var category = document.getElementById('p3FilterCategory') ? document.getElementById('p3FilterCategory').value : '';
      var year     = document.getElementById('p3FilterYear')     ? document.getElementById('p3FilterYear').value     : '';
      var hasFilter = !!(dest || category || year);
      var totalVisible = 0;

      document.querySelectorAll('.p3-2-year-group').forEach(function(yg){
        var ygVisible = 0;
        yg.querySelectorAll('.lc').forEach(function(card){
          var match = (!dest     || card.dataset.dest     === dest)
                   && (!category || card.dataset.category === category)
                   && (!year     || card.dataset.year     === year);
          if (match) {
            card.removeAttribute('hidden');
            ygVisible++;
          } else {
            card.setAttribute('hidden', '');
          }
        });
        var countEl = yg.querySelector('.p3-2-year-count');
        if (countEl) countEl.textContent = ygVisible + '件';
        if (ygVisible === 0) yg.setAttribute('hidden', '');
        else { yg.removeAttribute('hidden'); totalVisible += ygVisible; }
      });

      if (filterCountEl) {
        if (hasFilter) {
          filterCountEl.textContent = totalVisible + '件を表示中';
          filterCountEl.removeAttribute('hidden');
        } else {
          filterCountEl.setAttribute('hidden', '');
        }
      }
      if (emptyEl) emptyEl.classList.toggle('is-visible', totalVisible === 0);
    }

    selects.forEach(function(sel){ sel.addEventListener('change', filterArticles); });
  })();
};

/* ════════════════════════════════════════
   p3-3  作品一覧ページ
════════════════════════════════════════ */
KTN.pages['p3-3'] = function () {
  var d = window.P3_DATA || {};

  // 0. ページスコープ・アクセントカラー
  document.body.classList.add('p3-page');
  document.body.style.setProperty('--page-accent',        '#2a5f7a');
  document.body.style.setProperty('--page-accent-bg',     'rgba(42,95,122,.1)');
  document.body.style.setProperty('--page-accent-border', '#5a8fa8');

  // 0b. ヒーローアクティブバッジ
  var activeBadge = document.getElementById('p3HeadActiveBadge');
  if (activeBadge && d.hasActiveExhibition) activeBadge.removeAttribute('hidden');

  // 0c. tagbar
  (function(){
    var inner = document.getElementById('ktnTagbarInner');
    if (!inner) return;
    [{label:'絵画'},{label:'現代美術'},{sep:true},{label:'東京'},{sep:true},{label:'個展なびを知る'}
    ].forEach(function(t){
      var el;
      if (t.sep){ el=document.createElement('span'); el.className='p2-tsep'; el.textContent='|'; }
      else{
        el=document.createElement('button'); el.className='p2-tpill'; el.textContent=t.label;
        el.addEventListener('click',function(){
          inner.querySelectorAll('.p2-tpill').forEach(function(b){b.classList.remove('is-active');});
          this.classList.add('is-active');
        });
      }
      inner.appendChild(el);
    });
  })();

  // 1. タブナビ: 作品をアクティブ・他タブは各サブページへ
  document.querySelectorAll('.p3-tabnav__item').forEach(function(btn){
    if (btn.dataset.tab === 'works') {
      btn.classList.add('is-active');
    } else {
      btn.addEventListener('click', function(){
        if (btn.dataset.tab === 'exhibitions') {
          window.location.href = 'kotennavi-p3-1.html';
        } else if (btn.dataset.tab === 'articles') {
          window.location.href = 'kotennavi-p3-2.html';
        } else if (btn.dataset.target) {
          window.location.href = 'kotennavi-p3.html#' + btn.dataset.target;
        }
      });
    }
  });

  // 2. watchボタン トグル
  ktnBindWatchSync();

  // 3. ウォッチャーモーダル
  var modal = document.getElementById('p3WatcherModal');
  var watcherList = document.getElementById('p3WatcherList');
  if (modal && watcherList && d.watchers) {
    watcherList.innerHTML = d.watchers.map(function(w){
      return '<div class="p3-watcher-item">'
        +'<div class="p3-watcher-item__avatar" style="background:'+w.avatar+'">'+w.name.charAt(0)+'</div>'
        +'<div class="p3-watcher-item__name">'+w.name+'</div></div>';
    }).join('');
    document.querySelectorAll('[data-action="open-watchers"]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeWatcherModal(){
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    var closeBtn = document.getElementById('p3WatcherModalClose');
    closeBtn && closeBtn.addEventListener('click', closeWatcherModal);
    modal.querySelector('.p3-watcher-modal__overlay').addEventListener('click', closeWatcherModal);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeWatcherModal(); });
  }

  // 4. 自己紹介 2段階展開
  document.fonts.ready.then(function(){
    var bioToggle = document.getElementById('p3HeadBioToggle');
    var bioText   = document.getElementById('p3HeadBioText');
    var bioLink   = document.getElementById('p3HeadBioProfileLink');
    if (!bioText || !bioToggle || !bioLink) return;
    if (bioText.scrollHeight <= bioText.clientHeight) {
      bioToggle.style.display = 'none';
      bioLink.classList.add('is-visible');
    } else {
      bioToggle.addEventListener('click', function(){
        bioText.classList.add('is-expanded');
        bioToggle.style.display = 'none';
        bioLink.classList.add('is-visible');
      });
    }
  });

  // 5. 作品フィルター絞り込み・並べ替え
  (function(){
    var selects = document.querySelectorAll('.p3-3-filter__select');
    var filterCountEl = document.getElementById('p3FilterCount');
    var emptyEl = document.getElementById('p3FilterEmpty');
    var grid = document.getElementById('p3WorksGrid');
    var sortSel = document.getElementById('p3SortBy');
    var defaultOrder = grid ? Array.prototype.slice.call(grid.querySelectorAll('.aw')) : [];

    function filterWorks() {
      var liaison = document.getElementById('p3FilterLiaison') ? document.getElementById('p3FilterLiaison').value : '';
      var year    = document.getElementById('p3FilterYear')    ? document.getElementById('p3FilterYear').value    : '';
      var hasFilter = !!(liaison || year);
      var totalVisible = 0;

      document.querySelectorAll('.p3-3-grid .aw').forEach(function(card){
        var match = (!liaison || card.dataset.liaison === liaison)
                 && (!year    || card.dataset.year    === year);
        if (match) {
          card.removeAttribute('hidden');
          totalVisible++;
        } else {
          card.setAttribute('hidden', '');
        }
      });

      if (filterCountEl) {
        if (hasFilter) {
          filterCountEl.textContent = totalVisible + '件を表示中';
          filterCountEl.removeAttribute('hidden');
        } else {
          filterCountEl.setAttribute('hidden', '');
        }
      }
      if (emptyEl) emptyEl.classList.toggle('is-visible', totalVisible === 0);
    }

    var TIER = { 'liaison-plus': 0, 'liaison': 1, 'normal': 2 };
    function tierRank(c){ var r = TIER[c.dataset.liaison]; return r === undefined ? 3 : r; }
    function titleOf(c){ var el = c.querySelector('.aw__title'); return el ? el.textContent.replace(/[《》]/g, '').trim() : ''; }
    function favOf(c){ var el = c.querySelector('.aw__counter'); return el ? (parseInt(el.textContent.replace(/[^\d]/g, ''), 10) || 0) : 0; }

    function sortWorks() {
      if (!grid) return;
      var v = sortSel ? sortSel.value : '';
      var arr = defaultOrder.slice();
      if (v === 'added') {
        arr.sort(function(a, b){ return (parseInt(b.dataset.added, 10) || 0) - (parseInt(a.dataset.added, 10) || 0); });
      } else if (v === 'year-desc') {
        arr.sort(function(a, b){ return (parseInt(b.dataset.year, 10) || 0) - (parseInt(a.dataset.year, 10) || 0); });
      } else if (v === 'year-asc') {
        arr.sort(function(a, b){ return (parseInt(a.dataset.year, 10) || 0) - (parseInt(b.dataset.year, 10) || 0); });
      } else if (v === 'title') {
        arr.sort(function(a, b){ return titleOf(a).localeCompare(titleOf(b), 'ja'); });
      } else if (v === 'fav') {
        arr.sort(function(a, b){ return favOf(b) - favOf(a); });
      } else {
        arr.sort(function(a, b){ return tierRank(a) - tierRank(b); });
      }
      arr.forEach(function(c){ grid.appendChild(c); });
    }

    selects.forEach(function(sel){ sel.addEventListener('change', filterWorks); });
    if (sortSel) sortSel.addEventListener('change', sortWorks);
  })();

  // 6. creator本人: 申込中カードにコンソールボタン表示
  function applyOwner() {
    var isOwner = (window.ktnState && window.ktnState.role === 'user+creator');
    document.querySelectorAll('.p33-console-wrap').forEach(function(el) {
      el.style.display = isOwner ? 'flex' : 'none';
    });
  }
  applyOwner();
  var _prevRender = window.ktnRender;
  window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); applyOwner(); };
};

/* ────────────────────────────────────────────────────
   P4 ギャラリートップ
──────────────────────────────────────────────────── */
KTN.pages['p4'] = function () {
  var d = window.P4_DATA || {};

  // 0. ページスコープ（クラス + アクセントカラー変数）
  document.body.classList.add('p4-page');
  document.body.style.setProperty('--page-accent',        '#8b5e3c');
  document.body.style.setProperty('--page-accent-bg',     'rgba(139,94,60,.1)');
  document.body.style.setProperty('--page-accent-border', '#b07840');

  // 0b. ヒーロー初期設定
  var activeBadge = document.getElementById('p4HeadActiveBadge');
  if (activeBadge && d.hasActiveExhibition) activeBadge.removeAttribute('hidden');

  // 0c. tagbar
  (function(){
    var inner = document.getElementById('ktnTagbarInner');
    if (!inner) return;
    [{label:'現代美術'},{label:'絵画'},{sep:true},{label:'渋谷'},{label:'東京'},{sep:true},{label:'個展なびを知る'}
    ].forEach(function(t){
      var el;
      if (t.sep){ el=document.createElement('span'); el.className='p2-tsep'; el.textContent='|'; }
      else{
        el=document.createElement('button'); el.className='p2-tpill'; el.textContent=t.label;
        el.addEventListener('click',function(){
          inner.querySelectorAll('.p2-tpill').forEach(function(b){b.classList.remove('is-active');});
          this.classList.add('is-active');
        });
      }
      inner.appendChild(el);
    });
  })();

  // 0d. タブナビ NEW バッジ表示制御
  if (d.newBadges) {
    Object.keys(d.newBadges).forEach(function(key){
      if (!d.newBadges[key]) return;
      var badge = document.querySelector('.p3-tabnav__new[data-new="' + key + '"]');
      if (badge) badge.classList.add('is-visible');
    });
  }

  // 1. watchボタン トグル
  ktnBindWatchSync();

  // 2. ウォッチャーモーダル
  var modal = document.getElementById('p4WatcherModal');
  var watcherList = document.getElementById('p4WatcherList');
  if (modal && watcherList && d.watchers) {
    watcherList.innerHTML = d.watchers.map(function(w){
      return '<div class="p4-watcher-item">'
        +'<div class="p4-watcher-item__avatar" style="background:'+w.avatar+'">'+w.name.charAt(0)+'</div>'
        +'<div class="p4-watcher-item__name">'+w.name+'</div></div>';
    }).join('');
    document.querySelectorAll('[data-action="open-watchers"]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeWatcherModal(){
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    var closeBtn = document.getElementById('p4WatcherModalClose');
    closeBtn && closeBtn.addEventListener('click', closeWatcherModal);
    modal.querySelector('.p4-watcher-modal__overlay').addEventListener('click', closeWatcherModal);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ closeWatcherModal(); closeGallery(); } });
  }

  // 2b. 自己紹介 条件分岐 + 展開
  var bioToggle = document.getElementById('p4HeadBioToggle');
  var bioText   = document.getElementById('p4HeadBioText');
  var bioLink   = document.getElementById('p4HeadBioProfileLink');
  if (bioLink) {
    bioLink.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.getElementById('p4-sec-profile');
      if (!target) return;
      var hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hh') || '56', 10);
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - hh - 60, behavior: 'smooth' });
      document.querySelectorAll('.p3-tabnav__item').forEach(function(btn){
        btn.classList.toggle('is-active', btn.dataset.target === 'p4-sec-profile');
      });
    });
  }
  document.fonts.ready.then(function(){
    if (!bioText || !bioToggle || !bioLink) return;
    if (bioText.scrollHeight <= bioText.clientHeight) {
      bioToggle.style.display = 'none';
      bioLink.classList.add('is-visible');
    } else {
      bioToggle.addEventListener('click', function(){
        bioText.classList.add('is-expanded');
        bioToggle.style.display = 'none';
        bioLink.classList.add('is-visible');
      });
    }
  });

  // 3. 写真ライトボックス
  var galleryModal       = document.getElementById('p4GalleryModal');
  var galleryModalBg     = document.getElementById('p4GalleryModalBg');
  var galleryModalCaption = document.getElementById('p4GalleryModalCaption');
  function openGallery(bg, label){
    if (!galleryModal) return;
    if (galleryModalBg) galleryModalBg.style.cssText = 'position:absolute;inset:0;background:'+bg+';border-radius:4px';
    if (galleryModalCaption) galleryModalCaption.textContent = label;
    galleryModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeGallery(){
    if (!galleryModal) return;
    galleryModal.setAttribute('hidden','');
    document.body.style.overflow = '';
  }
  if (galleryModal) {
    document.getElementById('p4GalleryModalClose').addEventListener('click', closeGallery);
    galleryModalBg && galleryModalBg.addEventListener('click', closeGallery);
  }

  // 3b. プロフィール画像ギャラリー
  (function(){
    var layout    = document.getElementById('p4ProfBioLayout');
    var mainEl    = document.getElementById('p4ProfMediaMain');
    var captionEl = document.getElementById('p4ProfMediaCaption');
    var thumbsEl  = document.getElementById('p4ProfMediaThumbs');
    var imgs      = (d.profile && d.profile.images) ? d.profile.images : [];
    var count     = imgs.length;
    if (layout) layout.dataset.imgCount = count;
    if (!mainEl || count === 0) return;
    function showImage(img) {
      mainEl.style.background = img.bg;
      mainEl.dataset.caption  = img.caption;
      if (captionEl) captionEl.textContent = img.caption;
    }
    showImage(imgs[0]);
    mainEl.addEventListener('click', function(){
      openGallery(mainEl.style.background, mainEl.dataset.caption || '');
    });
    if (thumbsEl && count >= 2) {
      imgs.forEach(function(img, i){
        var t = document.createElement('div');
        t.className = 'p4-prof-media-thumb' + (i === 0 ? ' is-active' : '');
        t.style.background = img.bg;
        t.addEventListener('click', function(){
          showImage(img);
          thumbsEl.querySelectorAll('.p4-prof-media-thumb').forEach(function(el){
            el.classList.remove('is-active');
          });
          t.classList.add('is-active');
        });
        thumbsEl.appendChild(t);
      });
    }
  })();

  // 3c. 略歴の折りたたみ
  (function(){
    var bioEl    = document.getElementById('p4ProfBio');
    var mediaEl  = document.getElementById('p4ProfMedia');
    var layout   = document.getElementById('p4ProfBioLayout');
    var toggleEl = document.getElementById('p4ProfBioToggle');
    if (!bioEl || !mediaEl || !toggleEl) return;
    var expanded = false;
    function applyClamp() {
      var isCol = window.getComputedStyle(layout).flexDirection === 'column';
      if (isCol || mediaEl.offsetHeight === 0) {
        bioEl.style.maxHeight = '';
        toggleEl.classList.remove('is-visible');
        return;
      }
      var mediaH = mediaEl.offsetHeight;
      if (!expanded && bioEl.scrollHeight > mediaH + 2) {
        bioEl.style.maxHeight = mediaH + 'px';
        toggleEl.classList.add('is-visible');
        toggleEl.textContent = 'もっと見る';
      } else if (!expanded) {
        bioEl.style.maxHeight = '';
        toggleEl.classList.remove('is-visible');
      }
    }
    toggleEl.addEventListener('click', function() {
      expanded = !expanded;
      if (expanded) {
        bioEl.style.maxHeight = bioEl.scrollHeight + 'px';
        toggleEl.textContent = '閉じる';
      } else {
        bioEl.style.maxHeight = mediaEl.offsetHeight + 'px';
        toggleEl.textContent = 'もっと見る';
      }
    });
    applyClamp();
    window.addEventListener('resize', function() { expanded = false; applyClamp(); });
  })();

  // 4. サイドバー 開催中展覧会ウィジェット
  var sideExhibitionCard = document.getElementById('p4SideExhibitionCard');
  var sideExhibitionEl   = document.getElementById('p4SideExhibition');
  if (sideExhibitionCard && sideExhibitionEl && d.hasActiveExhibition && d.activeExhibition) {
    var ex = d.activeExhibition;
    var liaStripHtml = ex.isLiaison
      ? '<div class="ec__liaison-strip">'
        + '<div class="ec__liaison-strip-info">'
        + '<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>'
        + '<span class="ec__liaison-subtext">オンライン作品展示中</span>'
        + '</div></div>'
      : '';
    sideExhibitionEl.innerHTML = '<a class="ec" href="#">'
      + '<div class="ec__poster" style="background:linear-gradient(135deg,#c8a880,#8b5e3c)">'
      + '<div class="ec__poster-noimg"></div>'
      + '<div class="ec__poster-overlay">'
      + '<div class="ec__poster-dates"><strong>' + ex.dateRange + '</strong></div>'
      + '</div></div>'
      + '<div class="ec__body">'
      + '<div class="ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span></div>'
      + '<div class="ec__title">' + ex.title + '</div>'
      + '<div class="ec__venue">' + ex.venue + '</div>'
      + '</div>'
      + liaStripHtml
      + '</a>';
    sideExhibitionCard.classList.add('is-visible');
  }

  // 4c. サイドバー 記事ウィジェット
  var sideArticlesCard = document.getElementById('p4SideArticlesCard');
  var sideArticlesList = document.getElementById('p4SideArticlesList');
  if (sideArticlesCard && sideArticlesList && d.articles && d.articles.length) {
    sideArticlesList.innerHTML = d.articles.slice(0, 3).map(function(a) {
      var thumb = a.hasImg
        ? '<div class="lc__thumb lc__thumb--article"><span class="lc__thumb-label">article</span></div>'
        : '';
      return '<a class="lc lc--article' + (a.hasImg ? '' : ' lc--noimg') + '" href="#">'
        + thumb + '<div class="lc__body">'
        + '<div class="lc__badge-row">'
        + (a.isNew ? '<span class="nb">new</span>' : '')
        + '<span class="cb cb-content cb-article">article</span>'
        + '</div>'
        + '<div class="lc__title">' + a.title + '</div>'
        + '<div class="lc__byline"><span class="lc__date">' + a.date + '</span></div>'
        + '</div></a>';
    }).join('');
    sideArticlesCard.classList.add('is-visible');
  }

  // 5. リンクボタン生成（p4-prof-links）
  var profLinks = document.getElementById('p4ProfLinks');
  if (profLinks && d.profile && d.profile.links && d.profile.links.length) {
    var globeSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg>';
    var bagSvg   = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';
    var pkgSvg   = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>';
    var linkSvg  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
    var siSlug = {
      behance:'behance', artstation:'artstation',
      instagram:'instagram', x:'x', twitter:'x', facebook:'facebook',
      threads:'threads', bluesky:'bluesky', pinterest:'pinterest',
      tiktok:'tiktok', youtube:'youtube',
      note:'note', substack:'substack',
      etsy:'etsy', shopify:'shopify',
      pixiv:'pixiv', linktree:'linktree', litlink:'litlink'
    };
    var svgFallback = { hp:globeSvg, base:bagSvg, minne:bagSvg, creema:bagSvg, stores:bagSvg, iichi:bagSvg, booth:pkgSvg };
    function getLinkIcon(type) {
      if (svgFallback[type]) return svgFallback[type];
      if (!siSlug[type])     return linkSvg;
      return '<img src="https://cdn.simpleicons.org/' + siSlug[type] + '" width="16" height="16" alt="' + type + '">';
    }
    profLinks.innerHTML = d.profile.links.map(function(lk){
      return '<a href="' + lk.url + '" class="p4-prof-link-btn" target="_blank" rel="noopener noreferrer" title="' + lk.label + '">'
        + getLinkIcon(lk.type) + '</a>';
    }).join('');
  }

  // 5b. 現在地からの距離
  var distVal = document.getElementById('p4MapDistanceVal');
  var distWrap = document.getElementById('p4MapDistance');
  if (distVal && navigator.geolocation) {
    // Gallery SOIL 渋谷の仮座標（実装時は実座標に差し替え）
    var galleryLat = 35.6627, galleryLng = 139.6999;
    navigator.geolocation.getCurrentPosition(function(pos) {
      var lat = pos.coords.latitude, lng = pos.coords.longitude;
      var R = 6371, dLat = (galleryLat - lat) * Math.PI / 180, dLng = (galleryLng - lng) * Math.PI / 180;
      var a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat*Math.PI/180)*Math.cos(galleryLat*Math.PI/180)*Math.sin(dLng/2)*Math.sin(dLng/2);
      var dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      distVal.textContent = dist < 1 ? Math.round(dist * 1000) + 'm' : dist.toFixed(1) + 'km';
    }, function() {
      if (distWrap) distWrap.style.display = 'none';
    });
  } else if (distWrap) {
    distWrap.style.display = 'none';
  }

  // 6. アーカイブ件数
  var archiveCount = document.getElementById('p4ArchiveCount');
  if (archiveCount && d.archiveCount) archiveCount.textContent = d.archiveCount;

  // 7. タブナビ IntersectionObserver
  var tabnav = document.getElementById('p4Tabnav');
  if (tabnav && 'IntersectionObserver' in window) {
    var tabBtns  = tabnav.querySelectorAll('.p3-tabnav__item');
    var sections = document.querySelectorAll('.p4-main > section[id]');
    var hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hh') || '56', 10);
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        tabBtns.forEach(function(btn){
          btn.classList.toggle('is-active', btn.dataset.target === id);
        });
      });
    }, { rootMargin: '-' + (hh + 60) + 'px 0px -60% 0px', threshold: 0 });
    sections.forEach(function(sec){ obs.observe(sec); });
    tabBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        var target = document.getElementById(btn.dataset.target);
        if (!target) return;
        var top = target.getBoundingClientRect().top + scrollY - hh - 60;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  // 8. ヒーロースクロールアウト → ヘッダー is-scrolled
  var p4Head = document.querySelector('.p4-head');
  var ktnHeader = document.getElementById('ktnHeader');
  if (p4Head && ktnHeader && 'IntersectionObserver' in window) {
    new IntersectionObserver(function(entries){
      ktnHeader.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(p4Head);
  }

  /* ── スティッキーCTAバー：ヒーロースクロールアウト後に出現 ── */
  (function () {
    var hero      = document.querySelector('.p4-head');
    var cta       = document.getElementById('p4StickyCta');
    var stickyBtn = document.getElementById('p4StickyWatchBtn');
    if (!cta || !hero) return;

    function showCta(visible) {
      cta.classList.toggle('is-visible', visible);
      cta.setAttribute('aria-hidden', visible ? 'false' : 'true');
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        showCta(!entries[0].isIntersecting);
      }, { threshold: 0 }).observe(hero);
    } else {
      function onScroll() { showCta(hero.getBoundingClientRect().bottom <= 0); }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (!stickyBtn) return;

    function applyWatch(on) {
      stickyBtn.classList.toggle('on', on);
      Array.prototype.filter.call(document.querySelectorAll('.ktn-btn[data-action="watch"]'), function(b){return !b.closest('.cc,.gc,.uc');}).forEach(function (btn) {
        btn.classList.toggle('on', on);
        var lbl = btn.querySelector('.ktn-btn__lbl');
        if (lbl) lbl.textContent = on ? 'watching' : 'watch';
        var tip = btn.querySelector('.tip');
        if (tip) tip.textContent = on ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
    }

    stickyBtn.addEventListener('click', function () {
      if ((window.ktnState||{}).role === 'guest') { KTN.action.handle(stickyBtn, 'watch'); return; }
      applyWatch(!stickyBtn.classList.contains('on'));
      KTN.toast(stickyBtn.classList.contains('on') ? 'ウォッチしました' : 'ウォッチを解除しました');
    });

    Array.prototype.filter.call(document.querySelectorAll('.ktn-btn[data-action="watch"]'), function(b){return !b.closest('.cc,.gc,.uc');}).forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTimeout(function () { stickyBtn.classList.toggle('on', btn.classList.contains('on')); }, 0);
      });
    });
  })();

  /* QRシェアモーダルは KTN.cta.openQrModal に統一 */
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.closeQrModal(); });
};

/* ════════════════════════════════════════
   P4-1 ギャラリー 展覧会アーカイブ
════════════════════════════════════════ */
KTN.pages['p4-1'] = function () {
  var d = window.P4_DATA || {};

  // 0. ページスコープ・アクセントカラー
  document.body.classList.add('p4-page', 'p4-1-page');
  document.body.style.setProperty('--page-accent',        '#8b5e3c');
  document.body.style.setProperty('--page-accent-bg',     'rgba(139,94,60,.1)');
  document.body.style.setProperty('--page-accent-border', '#b07840');

  // 0b. ヒーロー初期設定
  if (typeof applyHeadImageMode === 'function') applyHeadImageMode(d.hasImage !== false);
  var activeBadge = document.getElementById('p4HeadActiveBadge');
  if (activeBadge && d.hasActiveExhibition) activeBadge.removeAttribute('hidden');

  // 0c. tagbar
  (function(){
    var inner = document.getElementById('ktnTagbarInner');
    if (!inner) return;
    [{label:'現代美術'},{label:'絵画'},{sep:true},{label:'渋谷'},{label:'東京'},{sep:true},{label:'個展なびを知る'}
    ].forEach(function(t){
      var el;
      if (t.sep){ el=document.createElement('span'); el.className='p2-tsep'; el.textContent='|'; }
      else{
        el=document.createElement('button'); el.className='p2-tpill'; el.textContent=t.label;
        el.addEventListener('click',function(){
          inner.querySelectorAll('.p2-tpill').forEach(function(b){b.classList.remove('is-active');});
          this.classList.add('is-active');
        });
      }
      inner.appendChild(el);
    });
  })();

  // 1. タブナビ: 展覧会をアクティブ・他タブは各サブページへ
  document.querySelectorAll('.p3-tabnav__item').forEach(function(btn){
    if (btn.dataset.tab === 'exhibitions') {
      btn.classList.add('is-active');
    } else {
      btn.addEventListener('click', function(){
        if (btn.dataset.tab === 'articles') {
          window.location.href = 'kotennavi-p4-2.html';
        } else if (btn.dataset.target) {
          window.location.href = 'kotennavi-p4.html#' + btn.dataset.target;
        }
      });
    }
  });

  // 2. watchボタン トグル
  ktnBindWatchSync();

  // 3. ウォッチャーモーダル
  var modal = document.getElementById('p4WatcherModal');
  var watcherList = document.getElementById('p4WatcherList');
  if (modal && watcherList && d.watchers) {
    watcherList.innerHTML = d.watchers.map(function(w){
      return '<div class="p3-watcher-item">'
        +'<div class="p3-watcher-item__avatar" style="background:'+w.avatar+'">'+w.name.charAt(0)+'</div>'
        +'<div class="p3-watcher-item__name">'+w.name+'</div></div>';
    }).join('');
    document.querySelectorAll('[data-action="open-watchers"]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeWatcherModal(){
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    var closeBtn = document.getElementById('p4WatcherModalClose');
    closeBtn && closeBtn.addEventListener('click', closeWatcherModal);
    modal.querySelector('.p3-watcher-modal__overlay').addEventListener('click', closeWatcherModal);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeWatcherModal(); });
  }

  // 3b. 自己紹介 2段階展開
  document.fonts.ready.then(function(){
    var bioToggle = document.getElementById('p4HeadBioToggle');
    var bioText   = document.getElementById('p4HeadBioText');
    var bioLink   = document.getElementById('p4HeadBioProfileLink');
    if (!bioText || !bioToggle || !bioLink) return;
    if (bioText.scrollHeight <= bioText.clientHeight) {
      bioToggle.style.display = 'none';
      bioLink.classList.add('is-visible');
    } else {
      bioToggle.addEventListener('click', function(){
        bioText.classList.add('is-expanded');
        bioToggle.style.display = 'none';
        bioLink.classList.add('is-visible');
      });
    }
  });

  // 4. フィルター絞り込み
  (function(){
    var selects = document.querySelectorAll('.p3-1-filter__select');
    var filterCountEl = document.getElementById('p4FilterCount');
    var emptyEl = document.getElementById('p4FilterEmpty');

    function filterExhibitions() {
      var year = document.getElementById('p4FilterYear') ? document.getElementById('p4FilterYear').value : '';
      var pref = document.getElementById('p4FilterPref') ? document.getElementById('p4FilterPref').value : '';
      var type = document.getElementById('p4FilterType') ? document.getElementById('p4FilterType').value : '';
      var hasFilter = !!(year || pref || type);
      var totalVisible = 0;

      document.querySelectorAll('.p3-1-group').forEach(function(group) {
        var groupVisible = 0;

        group.querySelectorAll('.ec--h').forEach(function(card) {
          var match = (!year || card.dataset.year === year)
                   && (!pref  || card.dataset.pref  === pref)
                   && (!type  || card.dataset.type  === type);
          if (match) {
            card.removeAttribute('hidden');
            groupVisible++;
          } else {
            card.setAttribute('hidden', '');
          }
        });

        group.querySelectorAll('.p3-1-year-group').forEach(function(yg) {
          var ygVisible = 0;
          yg.querySelectorAll('.ec--h').forEach(function(c) {
            if (!c.hasAttribute('hidden')) ygVisible++;
          });
          if (ygVisible === 0) {
            yg.setAttribute('hidden', '');
          } else {
            yg.removeAttribute('hidden');
          }
        });

        var countEl = group.querySelector('.p3-1-group-count');
        if (countEl) countEl.textContent = groupVisible + '件';

        if (groupVisible === 0) {
          group.setAttribute('hidden', '');
        } else {
          group.removeAttribute('hidden');
          totalVisible += groupVisible;
        }
      });

      if (filterCountEl) {
        if (hasFilter) {
          filterCountEl.textContent = totalVisible + '件を表示中';
          filterCountEl.removeAttribute('hidden');
        } else {
          filterCountEl.setAttribute('hidden', '');
        }
      }

      if (emptyEl) {
        if (totalVisible === 0) {
          emptyEl.classList.add('is-visible');
        } else {
          emptyEl.classList.remove('is-visible');
        }
      }
    }

    selects.forEach(function(sel) {
      sel.addEventListener('change', filterExhibitions);
    });
  })();
};

/* ════════════════════════════════════════
   P4-2 ギャラリー 記事一覧
════════════════════════════════════════ */
KTN.pages['p4-2'] = function () {
  var d = window.P4_DATA || {};

  // 0. ページスコープ・アクセントカラー
  document.body.classList.add('p4-page', 'p4-2-page');
  document.body.style.setProperty('--page-accent',        '#8b5e3c');
  document.body.style.setProperty('--page-accent-bg',     'rgba(139,94,60,.1)');
  document.body.style.setProperty('--page-accent-border', '#b07840');

  // 0b. ヒーロー初期設定（アクティブバッジ）
  var activeBadge = document.getElementById('p4HeadActiveBadge');
  if (activeBadge && d.hasActiveExhibition) activeBadge.removeAttribute('hidden');

  // 0c. tagbar
  (function(){
    var inner = document.getElementById('ktnTagbarInner');
    if (!inner) return;
    [{label:'現代美術'},{label:'絵画'},{sep:true},{label:'渋谷'},{label:'東京'},{sep:true},{label:'個展なびを知る'}
    ].forEach(function(t){
      var el;
      if (t.sep){ el=document.createElement('span'); el.className='p2-tsep'; el.textContent='|'; }
      else{
        el=document.createElement('button'); el.className='p2-tpill'; el.textContent=t.label;
        el.addEventListener('click',function(){
          inner.querySelectorAll('.p2-tpill').forEach(function(b){b.classList.remove('is-active');});
          this.classList.add('is-active');
        });
      }
      inner.appendChild(el);
    });
  })();

  // 1. タブナビ: 記事をアクティブ・他タブは各サブページへ
  document.querySelectorAll('.p3-tabnav__item').forEach(function(btn){
    if (btn.dataset.tab === 'articles') {
      btn.classList.add('is-active');
    } else {
      btn.addEventListener('click', function(){
        if (btn.dataset.tab === 'exhibitions') {
          window.location.href = 'kotennavi-p4-1.html';
        } else if (btn.dataset.target) {
          window.location.href = 'kotennavi-p4.html#' + btn.dataset.target;
        }
      });
    }
  });

  // 2. watchボタン トグル
  ktnBindWatchSync();

  // 3. ウォッチャーモーダル
  var modal = document.getElementById('p4WatcherModal');
  var watcherList = document.getElementById('p4WatcherList');
  if (modal && watcherList && d.watchers) {
    watcherList.innerHTML = d.watchers.map(function(w){
      return '<div class="p3-watcher-item">'
        +'<div class="p3-watcher-item__avatar" style="background:'+w.avatar+'">'+w.name.charAt(0)+'</div>'
        +'<div class="p3-watcher-item__name">'+w.name+'</div></div>';
    }).join('');
    document.querySelectorAll('[data-action="open-watchers"]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeWatcherModal(){
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    var closeBtn = document.getElementById('p4WatcherModalClose');
    closeBtn && closeBtn.addEventListener('click', closeWatcherModal);
    modal.querySelector('.p3-watcher-modal__overlay').addEventListener('click', closeWatcherModal);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeWatcherModal(); });
  }

  // 3b. 自己紹介 2段階展開
  document.fonts.ready.then(function(){
    var bioToggle = document.getElementById('p4HeadBioToggle');
    var bioText   = document.getElementById('p4HeadBioText');
    var bioLink   = document.getElementById('p4HeadBioProfileLink');
    if (!bioText || !bioToggle || !bioLink) return;
    if (bioText.scrollHeight <= bioText.clientHeight) {
      bioToggle.style.display = 'none';
      bioLink.classList.add('is-visible');
    } else {
      bioToggle.addEventListener('click', function(){
        bioText.classList.add('is-expanded');
        bioToggle.style.display = 'none';
        bioLink.classList.add('is-visible');
      });
    }
  });

  // 4. 記事フィルター絞り込み
  (function(){
    var selects = document.querySelectorAll('.p3-2-filter__select');
    var filterCountEl = document.getElementById('p4FilterCount');
    var emptyEl = document.getElementById('p4FilterEmpty');

    function filterArticles() {
      var dest     = document.getElementById('p4FilterDest')     ? document.getElementById('p4FilterDest').value     : '';
      var category = document.getElementById('p4FilterCategory') ? document.getElementById('p4FilterCategory').value : '';
      var year     = document.getElementById('p4FilterYear')     ? document.getElementById('p4FilterYear').value     : '';
      var hasFilter = !!(dest || category || year);
      var totalVisible = 0;

      document.querySelectorAll('.p3-2-year-group').forEach(function(yg){
        var ygVisible = 0;
        yg.querySelectorAll('.lc').forEach(function(card){
          var match = (!dest     || card.dataset.dest     === dest)
                   && (!category || card.dataset.category === category)
                   && (!year     || card.dataset.year     === year);
          if (match) {
            card.removeAttribute('hidden');
            ygVisible++;
          } else {
            card.setAttribute('hidden', '');
          }
        });
        var countEl = yg.querySelector('.p3-2-year-count');
        if (countEl) countEl.textContent = ygVisible + '件';
        if (ygVisible === 0) yg.setAttribute('hidden', '');
        else { yg.removeAttribute('hidden'); totalVisible += ygVisible; }
      });

      if (filterCountEl) {
        if (hasFilter) {
          filterCountEl.textContent = totalVisible + '件を表示中';
          filterCountEl.removeAttribute('hidden');
        } else {
          filterCountEl.setAttribute('hidden', '');
        }
      }
      if (emptyEl) emptyEl.classList.toggle('is-visible', totalVisible === 0);
    }

    selects.forEach(function(sel){ sel.addEventListener('change', filterArticles); });
  })();
};

/* =========================================================
   P5 ユーザー – 展覧会カレンダー
   ========================================================= */
KTN.pages['p5'] = function () {
    document.body.classList.add('p5-page');
    document.body.style.setProperty('--page-accent', '#b8608c');
    document.body.style.setProperty('--page-accent-bg', 'rgba(184,96,140,.1)');
    document.body.style.setProperty('--page-accent-border', '#c97aaa');

    // ── 定数・状態 ────────────────────────────────────────────────────────────
    var TODAY         = new Date(2026, 3, 29);
    var curRole       = 'user+';
    var rangeStart    = null;   // 日付選択開始（Date）
    var rangeEnd      = null;   // 日付選択終了（Date）
    var activeFilters = new Set(['all']);
    var excludeCheckin = false;
    var viewYear      = TODAY.getFullYear();
    var viewMonth     = TODAY.getMonth();  // 0-indexed
    var monthFilter   = { active: false, start: null, end: null };

    // 展覧会データ（カレンダードット計算用）
    var EXH_DATA = [
      { type: 'interest', start: new Date(2026,3,5),  end: new Date(2026,3,20) },
      { type: 'creator',  start: new Date(2026,3,12), end: new Date(2026,3,27) },
      { type: 'gallery',  start: new Date(2026,3,1),  end: new Date(2026,3,30) },
      { type: 'interest', start: new Date(2026,3,20), end: new Date(2026,4,10) },
      { type: 'checkin',  start: new Date(2026,3,8),  end: new Date(2026,3,14) }
    ];
    var DOT_PRIORITY = ['interest','creator','gallery','checkin'];
    var CAL_MONTHS   = ['January','February','March','April','May','June',
                        'July','August','September','October','November','December'];

    // ── ヘルパー ──────────────────────────────────────────────────────────────
    function sameDay(a, b) {
      return a.getFullYear() === b.getFullYear() &&
             a.getMonth()    === b.getMonth()    &&
             a.getDate()     === b.getDate();
    }
    function parseDate(str) {
      var p = str.split('-');
      return new Date(+p[0], +p[1] - 1, +p[2]);
    }
    function fmt(d) { return (d.getMonth() + 1) + '月' + d.getDate() + '日'; }
    function fmtMonth(y, m) { return y + '年' + (m + 1) + '月'; }

    function isCurrentMonth() {
      return viewYear === TODAY.getFullYear() && viewMonth === TODAY.getMonth();
    }
    function getDotsForDate(d) {
      var types = {};
      EXH_DATA.forEach(function (e) {
        if (d >= e.start && d <= e.end) types[e.type] = true;
      });
      return DOT_PRIORITY.filter(function (t) { return types[t]; });
    }

    // ── 月フィルター更新 ──────────────────────────────────────────────────────
    function updateMonthFilter() {
      if (isCurrentMonth()) {
        monthFilter.active = false;
        monthFilter.start  = null;
        monthFilter.end    = null;
      } else {
        monthFilter.active = true;
        monthFilter.start  = new Date(viewYear, viewMonth, 1);
        monthFilter.end    = new Date(viewYear, viewMonth + 1, 0);
      }
    }

    // ── カレンダー描画 ────────────────────────────────────────────────────────
    function renderCalendar() {
      var grid    = document.getElementById('p5CalGrid');
      var monthEl = document.getElementById('p5CalMonth');
      if (!grid || !monthEl) return;

      monthEl.textContent = CAL_MONTHS[viewMonth] + ' ' + viewYear;

      var firstDow    = new Date(viewYear, viewMonth, 1).getDay();
      var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      var totalCells  = Math.ceil((firstDow + daysInMonth) / 7) * 7;

      var html = '';
      for (var i = 0; i < totalCells; i++) {
        var cellDate = new Date(viewYear, viewMonth, 1 + (i - firstDow));
        var isOther  = cellDate.getMonth() !== viewMonth;
        var isToday  = sameDay(cellDate, TODAY);
        var mm  = cellDate.getMonth() + 1;
        var dd  = cellDate.getDate();
        var dateStr = cellDate.getFullYear() + '-' +
                      (mm < 10 ? '0' + mm : mm) + '-' +
                      (dd < 10 ? '0' + dd : dd);

        var cls = 'p5-cal-day';
        if (isOther) cls += ' is-other';
        if (isToday) cls += ' is-today';

        var countHtml = '';
        if (!isOther) {
          var count = getDotsForDate(cellDate).length;
          if (count > 0) {
            cls += ' has-event';
            countHtml = '<span class="p5-cal-day__count">' + count + '</span>';
          }
        }

        html += '<button class="' + cls + '" data-date="' + dateStr + '">' +
                '<span class="p5-cal-day__num">' + dd + '</span>' +
                countHtml +
                '</button>';
      }
      grid.innerHTML = html;
      updateCalendarSelection();
    }

    // ── updateCalendarSelection ───────────────────────────────────────────────
    function updateCalendarSelection() {
      document.querySelectorAll('.p5-cal-day').forEach(function (cell) {
        cell.classList.remove('is-selected', 'in-range', 'is-range-start', 'is-range-end');
      });
      if (!rangeStart) return;
      var effEnd = rangeEnd || rangeStart;
      document.querySelectorAll('.p5-cal-day').forEach(function (cell) {
        if (!cell.dataset.date) return;
        var cd = parseDate(cell.dataset.date);
        if (sameDay(cd, rangeStart) && sameDay(cd, effEnd)) {
          cell.classList.add('is-selected', 'is-range-start', 'is-range-end');
        } else if (sameDay(cd, rangeStart)) {
          cell.classList.add('is-range-start');
        } else if (sameDay(cd, effEnd)) {
          cell.classList.add('is-range-end');
        } else if (cd > rangeStart && cd < effEnd) {
          cell.classList.add('in-range');
        }
      });
    }

    // ── updateExhTitle ────────────────────────────────────────────────────────
    function updateExhTitle() {
      var titleEl = document.getElementById('p5ExhTitle');
      var countEl = document.getElementById('p5ExhCount');
      var list    = document.getElementById('p5ExhList');
      if (!list) return;

      var n = 0;
      list.querySelectorAll('.p5-exh-card').forEach(function (c) {
        if (!c.classList.contains('is-hidden')) n++;
      });
      if (countEl) countEl.textContent = n + '件';

      if (titleEl) {
        var label;
        if (rangeStart) {
          if (!rangeEnd) {
            label = fmt(rangeStart) + 'の展覧会';
          } else {
            var sameM = rangeStart.getMonth()    === rangeEnd.getMonth() &&
                        rangeStart.getFullYear() === rangeEnd.getFullYear();
            label = sameM
              ? fmt(rangeStart) + '〜' + rangeEnd.getDate() + '日の展覧会'
              : fmt(rangeStart) + '〜' + fmt(rangeEnd) + 'の展覧会';
          }
        } else if (monthFilter.active) {
          label = fmtMonth(viewYear, viewMonth) + 'の展覧会';
        } else {
          label = fmtMonth(TODAY.getFullYear(), TODAY.getMonth()) + 'の展覧会';
        }
        titleEl.textContent = label;
      }
    }

    // ── updateDateFilterBar（カレンダー内選択インジケーター） ─────────────────
    function updateDateFilterBar() {
      var bar    = document.getElementById('p5CalSelectionBar');
      var textEl = document.getElementById('p5CalSelectionText');
      if (!bar) return;

      if (!rangeStart) {
        bar.style.display = 'none';
        return;
      }

      var label;
      if (!rangeEnd) {
        label = fmt(rangeStart);
      } else {
        var sameM = rangeStart.getMonth()    === rangeEnd.getMonth() &&
                    rangeStart.getFullYear() === rangeEnd.getFullYear();
        label = sameM
          ? fmt(rangeStart) + '〜' + rangeEnd.getDate() + '日'
          : fmt(rangeStart) + '〜' + fmt(rangeEnd);
      }

      bar.style.display = 'flex';
      if (textEl) textEl.textContent = label;
    }

    // ── applyAllFilters ───────────────────────────────────────────────────────
    function applyAllFilters() {
      var list = document.getElementById('p5ExhList');
      if (!list) return;

      // 有効な日付範囲（明示的日付選択 > 月フィルター）
      var effStart = rangeStart || (monthFilter.active ? monthFilter.start : null);
      var effEnd   = (rangeStart ? (rangeEnd || rangeStart) : null) ||
                     (monthFilter.active ? monthFilter.end : null);

      list.querySelectorAll('.p5-exh-card').forEach(function (card) {
        var type   = card.dataset.type || '';
        var typeOk = activeFilters.has('all') ? true : activeFilters.has(type);
        if (excludeCheckin && type === 'checkin') typeOk = false;

        var dateOk = true;
        if (effStart && card.dataset.start && card.dataset.end) {
          var cs = parseDate(card.dataset.start);
          var ce = parseDate(card.dataset.end);
          dateOk = (cs <= effEnd && ce >= effStart);
        }

        if (typeOk && dateOk) card.classList.remove('is-hidden');
        else                   card.classList.add('is-hidden');
      });
      updateExhTitle();
      updateDateFilterBar();
    }

    // ── 1. ロール制御 ─────────────────────────────────────────────────────────
    (function () {
      var isPriv = (curRole === 'user+' || curRole === 'admin');
      if (!isPriv) {
        var fb = document.getElementById('p5FilterBar');
        if (fb) fb.style.display = 'none';
        var sl = document.getElementById('p5SideLinks');
        if (sl) sl.style.display = 'none';
        var eb = document.querySelector('.p5-head__edit-btn');
        if (eb) eb.style.display = 'none';
        document.querySelectorAll('.p5-exh-card__btn-interest, .p5-exh-card__btn-checkin').forEach(function (b) {
          b.style.display = 'none';
        });
      }
    }());

    // ── 2. 残日数の動的生成 ──────────────────────────────────────────────────
    (function () {
      document.querySelectorAll('.p5-exh-card').forEach(function (card) {
        var endStr   = card.dataset.end   || '';
        var startStr = card.dataset.start || '';
        if (!endStr) return;
        var endDate   = parseDate(endStr);
        var startDate = parseDate(startStr);
        var row2 = card.querySelector('.p5-exh-card__row2');
        if (!row2) return;
        var span = document.createElement('span');
        if (startDate > TODAY) {
          var diffStart = Math.ceil((startDate - TODAY) / 86400000);
          span.className   = 'p5-exh-card__remain p5-exh-card__remain--soon';
          span.textContent = diffStart + '日後開始';
        } else {
          var diff = Math.ceil((endDate - TODAY) / 86400000);
          if (diff < 0) return;
          if (diff === 0) {
            span.className   = 'p5-exh-card__remain p5-exh-card__remain--urgent';
            span.textContent = '本日最終日';
          } else if (diff <= 7) {
            span.className   = 'p5-exh-card__remain p5-exh-card__remain--urgent';
            span.textContent = '残' + diff + '日';
          } else {
            span.className   = 'p5-exh-card__remain';
            span.textContent = '残' + diff + '日';
          }
        }
        row2.appendChild(span);
      });
    }());

    // ── 3. フィルターボタン ───────────────────────────────────────────────────
    (function () {
      var btns = document.querySelectorAll('.p5-filter-btn');
      function resetToAll() {
        activeFilters = new Set(['all']);
        btns.forEach(function (b) { b.classList.toggle('is-active', b.dataset.filter === 'all'); });
      }
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var f = btn.dataset.filter;
          if (f === 'all') {
            resetToAll();
          } else {
            activeFilters.delete('all');
            document.querySelector('.p5-filter-btn[data-filter="all"]').classList.remove('is-active');
            if (activeFilters.has(f)) { activeFilters.delete(f); btn.classList.remove('is-active'); }
            else                      { activeFilters.add(f);    btn.classList.add('is-active'); }
            if (activeFilters.size === 0) resetToAll();
          }
          applyAllFilters();
        });
      });
      var cbCI = document.getElementById('p5FilterCheckin');
      if (cbCI) cbCI.addEventListener('change', function () {
        excludeCheckin = this.checked;
        applyAllFilters();
      });
    }());

    // ── 4. 日付選択（月跨り対応） ─────────────────────────────────────────────
    (function () {
      var grid = document.getElementById('p5CalGrid');
      if (!grid) return;
      grid.addEventListener('click', function (e) {
        var cell = e.target.closest('.p5-cal-day');
        if (!cell || cell.classList.contains('is-other') || !cell.dataset.date) return;
        var clicked = parseDate(cell.dataset.date);
        if (!rangeStart) {
          rangeStart = clicked; rangeEnd = null;
        } else if (!rangeEnd) {
          if (sameDay(clicked, rangeStart)) { rangeStart = null; rangeEnd = null; }
          else if (clicked > rangeStart)    { rangeEnd = clicked; }
          else                              { rangeStart = clicked; }
        } else {
          rangeStart = clicked; rangeEnd = null;
        }
        updateCalendarSelection();
        applyAllFilters();
      });
    }());

    // ── 5. クリアボタン ───────────────────────────────────────────────────────
    (function () {
      var clearBtn = document.getElementById('p5DateFilterClear');
      if (!clearBtn) return;
      clearBtn.addEventListener('click', function () {
        rangeStart = null; rangeEnd = null;
        viewYear  = TODAY.getFullYear();
        viewMonth = TODAY.getMonth();
        monthFilter.active = false; monthFilter.start = null; monthFilter.end = null;
        renderCalendar();
        applyAllFilters();
      });
    }());

    // ── 6. 解除ボタン ─────────────────────────────────────────────────────────
    (function () {
      document.addEventListener('click', function (e) {
        var btn = e.target.closest('.p5-exh-card__btn-interest, .p5-exh-card__btn-checkin');
        if (!btn) return;
        var card = btn.closest('.p5-exh-card');
        if (card) { card.classList.add('is-hidden'); updateExhTitle(); }
      });
    }());

    // ── 8. 月ナビ ─────────────────────────────────────────────────────────────
    (function () {
      var prev = document.getElementById('p5CalPrev');
      var next = document.getElementById('p5CalNext');
      if (prev) prev.addEventListener('click', function () {
        viewMonth--;
        if (viewMonth < 0) { viewMonth = 11; viewYear--; }
        updateMonthFilter();
        renderCalendar();
        applyAllFilters();
      });
      if (next) next.addEventListener('click', function () {
        viewMonth++;
        if (viewMonth > 11) { viewMonth = 0; viewYear++; }
        updateMonthFilter();
        renderCalendar();
        applyAllFilters();
      });
    }());

    // ── タブナビ ──────────────────────────────────────────────────────────────
    (function () {
      var items = document.querySelectorAll('.p5-tabnav__item[href^="#"]');
      items.forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          items.forEach(function (i) { i.classList.remove('is-active'); });
          item.classList.add('is-active');
        });
      });
    }());

    // ── 自己紹介折り畳み ──────────────────────────────────────────────────────
    (function () {
      var bioText   = document.getElementById('p5HeadBioText');
      var bioToggle = document.getElementById('p5HeadBioToggle');
      if (!bioText || !bioToggle) return;
      bioToggle.addEventListener('click', function () {
        var expanded = bioText.classList.toggle('is-expanded');
        bioToggle.classList.toggle('is-expanded', expanded);
        bioToggle.querySelector('span') && (bioToggle.querySelector('span').textContent = expanded ? '閉じる' : 'もっと見る');
      });
    }());

    // 初期描画
    renderCalendar();
    updateExhTitle();
};

/* =========================================================
   P5-1 ユーザー – ウォッチリスト
   ========================================================= */
KTN.pages['p5-1'] = function () {
    document.body.classList.add('p5-page', 'p5-1-page');
    document.body.style.setProperty('--page-accent', '#b8608c');
    document.body.style.setProperty('--page-accent-bg', 'rgba(184,96,140,.1)');
    document.body.style.setProperty('--page-accent-border', '#c97aaa');

    // ── 初期順序を保持 ────────────────────────────────────────────────────────
    var allContainer = document.querySelector('.p5-1-section[data-section="all"] .list-col');
    var crContainer  = document.querySelector('.p5-1-section[data-section="creator"] .list-col');
    var glContainer  = document.querySelector('.p5-1-section[data-section="gallery"] .list-col');
    var allOriginal = allContainer ? Array.from(allContainer.children) : [];
    var crOriginal  = crContainer  ? Array.from(crContainer.children)  : [];
    var glOriginal  = glContainer  ? Array.from(glContainer.children)  : [];

    // ── ソート ────────────────────────────────────────────────────────────────
    function getName(el) {
        var n = el.querySelector('.cc__name, .gc__name');
        return n ? n.textContent.trim() : '';
    }
    function getExh(el) {
        var n = el.querySelector('.pc-count--exh');
        return n ? parseInt(n.textContent) || 0 : 0;
    }
    function getWatch(el) {
        var n = el.querySelector('.pc-count--watch');
        return n ? parseInt(n.textContent) || 0 : 0;
    }
    function applySort(val) {
        [[allContainer, allOriginal], [crContainer, crOriginal], [glContainer, glOriginal]].forEach(function (pair) {
            var container = pair[0], original = pair[1];
            if (!container) return;
            var cards = (val === 'date') ? original.slice() : Array.from(container.children).sort(function (a, b) {
                if (val === 'name')  return getName(a).localeCompare(getName(b), 'ja');
                if (val === 'exh')   return getExh(b) - getExh(a);
                if (val === 'watch') return getWatch(b) - getWatch(a);
                return 0;
            });
            cards.forEach(function (c) { container.appendChild(c); });
        });
    }

    // ── ロール別制御 ──────────────────────────────────────────────────────────
    function applyRole() {
        var role = window.curRole || 'guest';
        var canWatch = (role === 'login' || role === 'user+');
        document.querySelectorAll('.cc__hfoot .ktn-btn, .gc__hfoot .ktn-btn').forEach(function (el) {
            el.style.display = canWatch ? '' : 'none';
        });
    }

    // ── 軸①: タイプタブ ──────────────────────────────────────────────────────
    (function () {
        var tabs   = document.querySelectorAll('#p51TypeTabs .p5-type-tab');
        var secAll = document.querySelector('.p5-1-section[data-section="all"]');
        var secCr  = document.querySelector('.p5-1-section[data-section="creator"]');
        var secGl  = document.querySelector('.p5-1-section[data-section="gallery"]');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('is-active'); });
                tab.classList.add('is-active');
                var t = tab.dataset.type;
                if (secAll) secAll.style.display = (t === 'all')     ? '' : 'none';
                if (secCr)  secCr.style.display  = (t === 'creator') ? '' : 'none';
                if (secGl)  secGl.style.display  = (t === 'gallery') ? '' : 'none';
            });
        });
    }());

    // ── 軸②: 開催中・開催予定フィルター（チェックボックス） ─────────────────
    (function () {
        var chk = document.getElementById('p51ActiveCheck');
        if (!chk) return;
        chk.addEventListener('change', function () {
            var activeOnly = this.checked;
            document.querySelectorAll('.cc.cc--h, .gc.gc--h').forEach(function (card) {
                card.style.display = (!activeOnly || card.querySelector('.sb-sm')) ? '' : 'none';
            });
        });
    }());

    // ── ソートセレクト ────────────────────────────────────────────────────────
    var sortEl = document.getElementById('p51Sort');
    if (sortEl) sortEl.addEventListener('change', function () { applySort(this.value); });

    var _prevRender = window.ktnRender;
    window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); applyRole(); };
    applyRole();
};

/* =========================================================
   P5-2 ユーザー – チェックイン記録
   ========================================================= */
KTN.pages['p5-2'] = function () {
    document.body.classList.add('p5-page', 'p5-2-page');
    document.body.style.setProperty('--page-accent', '#b8608c');
    document.body.style.setProperty('--page-accent-bg', 'rgba(184,96,140,.1)');
    document.body.style.setProperty('--page-accent-border', '#c97aaa');

    // ── ロール別制御 ──────────────────────────────────────────────────────────
    function applyRole() {
        var role = window.curRole || 'guest';
        var isGuest  = (role === 'guest');
        var isOwner  = (role === 'user+');
        var canFilter = (role === 'user+' || role === 'admin');

        document.querySelectorAll('.p5-owner-only').forEach(function (el) {
            el.style.display = isGuest ? 'none' : '';
        });
        var fb = document.getElementById('p52FilterBar');
        if (fb) fb.style.display = canFilter ? '' : 'none';
        document.querySelectorAll('.ktn-owner-menu-btn').forEach(function (el) {
            el.style.display = isOwner ? '' : 'none';
        });
    }

    // ── 年フィルターボタン ────────────────────────────────────────────────────
    (function () {
        var btns   = document.querySelectorAll('#p52FilterBar .p5-filter-btn');
        var groups = document.querySelectorAll('.p5-2-year-group');
        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                btns.forEach(function (b) { b.classList.remove('is-active'); });
                btn.classList.add('is-active');
                var f = btn.dataset.filter;
                groups.forEach(function (g) {
                    g.style.display = (f === 'all' || g.dataset.year === f) ? '' : 'none';
                });
            });
        });
    }());

    // ── ソート ────────────────────────────────────────────────────────────────
    var sortEl = document.getElementById('p52Sort');
    if (sortEl) {
        var yearGroups = Array.from(document.querySelectorAll('.p5-2-year-group'));
        var origOrders = yearGroups.map(function (g) {
            var c = g.querySelector('.p5-2-year-group__cards');
            return c ? Array.from(c.children) : [];
        });
        function getText(card, sel) {
            var el = card.querySelector(sel);
            return el ? el.textContent.trim() : '';
        }
        sortEl.addEventListener('change', function () {
            var val = this.value;
            yearGroups.forEach(function (group, i) {
                var container = group.querySelector('.p5-2-year-group__cards');
                if (!container) return;
                var cards;
                if (val === 'new') {
                    cards = origOrders[i].slice();
                } else if (val === 'old') {
                    cards = origOrders[i].slice().reverse();
                } else if (val === 'title') {
                    cards = Array.from(container.children).sort(function (a, b) {
                        return getText(a, '.ec__title').localeCompare(getText(b, '.ec__title'), 'ja');
                    });
                } else if (val === 'venue') {
                    cards = Array.from(container.children).sort(function (a, b) {
                        return getText(a, '.ec__venue').localeCompare(getText(b, '.ec__venue'), 'ja');
                    });
                }
                cards.forEach(function (c) { container.appendChild(c); });
            });
        });
    }

    // ── オーナー操作メニュー（…）: チェックイン日/レビュー編集・削除 ─────────────
    var CI_SVG = '<svg viewBox="0 0 16 16" width="9" height="9" style="display:inline-block;vertical-align:middle"><circle cx="10" cy="5" r="4" fill="currentColor"/><circle cx="5" cy="11" r="2.4" fill="currentColor"/></svg>';
    var REVIEW_LINK = '<button class="p5-2-review-link ktn-guide-link" type="button" onclick="location.href=\'kotennavi-p8.html\';event.preventDefault();event.stopPropagation()">レビュー詳細を見る →</button>';

    function esc(s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }

    function readCard(card) {
        var dateEl = card.querySelector('.rv-checkin-date');
        var iso = dateEl ? dateEl.textContent.replace(/[^0-9.]/g, '').replace(/\./g, '-') : '';
        var bodyEl = card.querySelector('.rv-body');
        var review = bodyEl ? bodyEl.textContent.trim() : '';
        var stars = 0;
        card.querySelectorAll('.rv-star').forEach(function (s) {
            if (!/opacity/.test(s.getAttribute('style') || '')) stars++;
        });
        return { iso: iso, review: review, stars: stars };
    }

    function applyCardData(card, data) {
        var row = card.querySelector('.p5-exh-card__reason-row');
        if (!row) return;
        var display = (data.date || '').replace(/-/g, '.');
        var hasReview = !!(data.review && data.review.length);
        if (hasReview) {
            var starsHtml = '';
            for (var i = 1; i <= 5; i++)
                starsHtml += '<span class="rv-star"' + (i <= data.stars ? '' : ' style="opacity:.18"') + '>★</span>';
            row.innerHTML =
                '<div class="p5-2-checkin-row">' +
                '<span class="rv-checkin-date">' + CI_SVG + ' ' + display + '</span>' +
                '<div class="rv-stars">' + starsHtml + '</div>' +
                '</div>' +
                '<div class="rv-body">' + esc(data.review) + '</div>' +
                REVIEW_LINK;
            card.setAttribute('data-has-review', '1');
        } else {
            row.innerHTML = '<span class="rv-checkin-date">' + CI_SVG + ' ' + display + '</span>';
            card.removeAttribute('data-has-review');
        }
    }

    function updateGroupCount(card) {
        var group = card.closest('.p5-2-year-group');
        if (!group) return;
        var visible = group.querySelectorAll('.ec:not(.is-hidden)').length;
        var countEl = group.querySelector('.p5-2-year-group__count');
        if (countEl) countEl.textContent = '（' + visible + '件）';
    }

    function closeCardMenu() { ktnCloseOwnerMenu(); }

    function cardAction(act, card) {
        var cur = readCard(card);
        var hasReview = card.getAttribute('data-has-review') === '1';
        if (act === 'editDate') {
            openCheckinEditModal({
                title: 'チェックインを編集', date: cur.iso, stars: cur.stars, review: cur.review,
                onSave: function (d) { applyCardData(card, d); }
            });
        } else if (act === 'review') {
            openCheckinEditModal({
                title: hasReview ? 'レビューを編集' : 'レビューを書く',
                date: cur.iso, stars: cur.stars, review: cur.review, focusReview: true,
                onSave: function (d) { applyCardData(card, d); }
            });
        } else if (act === 'delReview') {
            ktnConfirmModal({
                title: 'レビューを削除しますか？',
                message: 'このレビューを削除します。<strong>展覧会ページからも表示されなくなります。</strong>チェックインの記録は残ります。',
                confirmLabel: 'レビューを削除',
                onConfirm: function () { applyCardData(card, { date: cur.iso, stars: 0, review: '' }); }
            });
        } else if (act === 'delCheckin') {
            ktnConfirmModal({
                title: 'チェックインを削除しますか？',
                message: hasReview
                    ? 'このチェックインの記録を削除します。<strong>投稿したレビューも一緒に削除され、展覧会ページからも表示されなくなります。</strong>この操作は取り消せません。'
                    : 'このチェックインの記録を削除します。この操作は取り消せません。',
                confirmLabel: 'チェックインを削除',
                onConfirm: function () { card.classList.add('is-hidden'); updateGroupCount(card); }
            });
        }
    }

    function openCardMenu(btn, card) {
        var hasReview = card.getAttribute('data-has-review') === '1';
        var items = [
            { label: 'チェックイン日を編集', onClick: function () { cardAction('editDate', card); } },
            { label: hasReview ? 'レビューを編集' : 'レビューを書く', onClick: function () { cardAction('review', card); } }
        ];
        if (hasReview) items.push({ label: 'レビューを削除', danger: true, sep: true, onClick: function () { cardAction('delReview', card); } });
        else items[items.length - 1].sep = true;
        items.push({ label: 'チェックインを削除', danger: true, onClick: function () { cardAction('delCheckin', card); } });
        ktnOpenOwnerMenu(btn, items);
    }

    document.querySelectorAll('.ktn-owner-menu-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var card = btn.closest('.ec');
            if (!card) return;
            openCardMenu(btn, card);
        });
    });

    var _prevRender = window.ktnRender;
    window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); applyRole(); };
    applyRole();
};

/* =========================================================
   P5-3 ユーザー – 興味あり！リスト
   ========================================================= */
KTN.pages['p5-3'] = function () {
    document.body.classList.add('p5-page', 'p5-3-page');
    document.body.style.setProperty('--page-accent', '#b8608c');
    document.body.style.setProperty('--page-accent-bg', 'rgba(184,96,140,.1)');
    document.body.style.setProperty('--page-accent-border', '#c97aaa');

    // ── ロール別制御 ──────────────────────────────────────────────────────────
    function applyRole() {
        var role = window.curRole || 'guest';
        var isGuest   = (role === 'guest');
        var isOwner   = (role === 'user+');
        var canFilter = (role === 'user+' || role === 'admin');

        document.querySelectorAll('.p5-owner-only').forEach(function (el) {
            el.style.display = isGuest ? 'none' : '';
        });
        var typeTabs = document.getElementById('p53TypeTabs');
        if (typeTabs) typeTabs.style.display = canFilter ? '' : 'none';
        var exhBox = document.getElementById('p53ExhBox');
        if (exhBox && !canFilter) exhBox.style.display = 'none';
        document.querySelectorAll('#p53ExhBox .ktn-icon-btn, #p53AwBox .ktn-icon-btn').forEach(function (el) {
            el.style.display = isOwner ? '' : 'none';
        });
    }

    // ── 展覧会パネル表示制御 ──────────────────────────────────────────────────
    var exhPanes = document.querySelectorAll('.p5-3-pane[data-pane="live"],.p5-3-pane[data-pane="upcoming"],.p5-3-pane[data-pane="ended"]');
    var exhBox   = document.getElementById('p53ExhBox');
    var awBox    = document.getElementById('p53AwBox');
    var acBox    = document.getElementById('p53AcBox');

    function applyStatusFilter() {
        var active = document.querySelector('#p53Row2Exh .p5-filter-btn.is-active');
        var status = active ? active.dataset.status : 'all';
        exhPanes.forEach(function (p) {
            p.style.display = (status === 'all' || p.dataset.pane === status) ? 'flex' : 'none';
        });
    }

    function applyArticleCatFilter() {
        var active = document.querySelector('#p53AcBox .p5-filter-btn.is-active');
        var val = active ? active.dataset.accat : 'all';
        document.querySelectorAll('#p53AcBox .lc').forEach(function (item) {
            item.style.display = (val === 'all' || item.dataset.accat === val) ? '' : 'none';
        });
    }

    function applyLiaisonFilter() {
        var active = document.querySelector('#p53Row2Aw .p5-filter-btn.is-active');
        var val = active ? active.dataset.liaison : 'all';
        document.querySelectorAll('#p53AwBox .masonry-item').forEach(function (item) {
            var isPortfolio = !!item.querySelector('.aw--portfolio');
            var show = val === 'all'
                || (val === 'portfolio' && isPortfolio)
                || (!isPortfolio && item.querySelector('.lb-dot.' + val));
            item.style.display = show ? '' : 'none';
        });
    }

    // ── 軸①: タイプタブ ──────────────────────────────────────────────────────
    (function () {
        var tabs = document.querySelectorAll('#p53TypeTabs .p5-type-tab');
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('is-active'); });
                tab.classList.add('is-active');
                if (tab.dataset.type === 'exh') {
                    if (exhBox) exhBox.style.display = '';
                    if (awBox)  awBox.style.display  = 'none';
                    if (acBox)  acBox.style.display  = 'none';
                    applyStatusFilter();
                } else if (tab.dataset.type === 'artwork') {
                    if (exhBox) exhBox.style.display = 'none';
                    if (awBox)  awBox.style.display  = '';
                    if (acBox)  acBox.style.display  = 'none';
                    applyLiaisonFilter();
                } else if (tab.dataset.type === 'article') {
                    if (exhBox) exhBox.style.display = 'none';
                    if (awBox)  awBox.style.display  = 'none';
                    if (acBox)  acBox.style.display  = '';
                    applyArticleCatFilter();
                }
            });
        });
    }());

    // ── 軸②: 開催状況フィルター（展覧会ボックスヘッド） ──────────────────────
    (function () {
        var btns = document.querySelectorAll('#p53Row2Exh .p5-filter-btn');
        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                btns.forEach(function (b) { b.classList.remove('is-active'); });
                btn.classList.add('is-active');
                applyStatusFilter();
            });
        });
    }());

    // ── 軸②: リエゾン種別フィルター（作品ボックスヘッド） ────────────────────
    (function () {
        var btns = document.querySelectorAll('#p53Row2Aw .p5-filter-btn');
        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                btns.forEach(function (b) { b.classList.remove('is-active'); });
                btn.classList.add('is-active');
                applyLiaisonFilter();
            });
        });
    }());

    // ── ソート ────────────────────────────────────────────────────────────────
    var sortEl = document.getElementById('p53Sort');
    if (sortEl) sortEl.addEventListener('change', function () { console.log('p5-3 exh sort:', this.value); });
    var sortAwEl = document.getElementById('p53SortAw');
    if (sortAwEl) sortAwEl.addEventListener('change', function () { console.log('p5-3 aw sort:', this.value); });
    var sortAcEl = document.getElementById('p53SortAc');
    if (sortAcEl) sortAcEl.addEventListener('change', function () { console.log('p5-3 ac sort:', this.value); });

    // ── 軸②: カテゴリフィルター（記事ボックスヘッド） ─────────────────────────
    (function () {
        var btns = document.querySelectorAll('#p53AcBox .p5-filter-btn');
        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                btns.forEach(function (b) { b.classList.remove('is-active'); });
                btn.classList.add('is-active');
                applyArticleCatFilter();
            });
        });
    }());

    // ── 興味あり解除ボタン（記事） ────────────────────────────────────────────
    document.querySelectorAll('#p53AcBox .ktn-icon-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var card = btn.closest('.lc');
            if (card) card.style.display = 'none';
        });
    });

    // ── 興味あり解除ボタン（展覧会） ──────────────────────────────────────────
    document.querySelectorAll('#p53ExhBox .ktn-icon-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var card = btn.closest('.ec');
            if (card) card.classList.add('is-hidden');
        });
    });

    // ── 興味あり解除ボタン（作品） ────────────────────────────────────────────
    document.querySelectorAll('#p53AwBox .ktn-icon-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var item = btn.closest('.masonry-item');
            if (item) item.style.display = 'none';
        });
    });

    // 初期状態: 展覧会パネルをすべて表示
    applyStatusFilter();

    var _prevRender = window.ktnRender;
    window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); applyRole(); };
    applyRole();
};

/* =========================================================
   P5-4 ユーザー – コレクションルーム
   ========================================================= */
KTN.pages['p5-4'] = function () {
    document.body.classList.add('p5-page', 'p5-4-page');
    document.body.style.setProperty('--page-accent', '#b8608c');
    document.body.style.setProperty('--page-accent-bg', 'rgba(184,96,140,.1)');
    document.body.style.setProperty('--page-accent-border', '#c97aaa');

    function applyRole() {
        var role = window.curRole || 'guest';
        var isOwner = (role === 'user+');
        document.querySelectorAll('.p5-owner-only').forEach(function (el) {
            el.style.display = isOwner ? '' : 'none';
        });
        document.body.classList.toggle('p5-other', !isOwner && role !== 'admin');
    }

    var _prevRender = window.ktnRender;
    window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); applyRole(); };
    applyRole();
};

/* =========================================================
   P5-14 ユーザー – 購入管理
   ========================================================= */
KTN.pages['p5-14'] = function () {
    document.body.classList.add('p5-page', 'p5-14-page');
    document.body.style.setProperty('--page-accent', '#b8608c');
    document.body.style.setProperty('--page-accent-bg', 'rgba(184,96,140,.1)');
    document.body.style.setProperty('--page-accent-border', '#c97aaa');

    // ── ロール別制御 ──────────────────────────────────────────────────────────
    function applyRole() {
        var role = window.curRole || 'guest';
        var canView = (role === 'user+' || role === 'admin');
        var wrap = document.querySelector('.p514-wrap');
        if (wrap) wrap.style.display = canView ? '' : 'none';
    }

    var _prevRender = window.ktnRender;
    window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); applyRole(); };
    applyRole();
};

/* 取引コメントの画像添付（1枚）プレビュー — p3-16/p4-16/p5-15 共通 */
function _initTxnCommentAttach() {
  document.querySelectorAll('.p515-comments__form').forEach(function (form) {
    var file    = form.querySelector('.p515-comments__file');
    var preview = form.querySelector('.p515-comments__preview');
    var img     = form.querySelector('.p515-comments__preview-img');
    var del     = form.querySelector('.p515-comments__preview-del');
    if (!file || !preview || !img) return;
    file.addEventListener('change', function () {
      var f = file.files && file.files[0];
      if (!f) return;
      img.src = URL.createObjectURL(f);
      preview.hidden = false;
    });
    if (del) del.addEventListener('click', function () {
      file.value = '';
      img.removeAttribute('src');
      preview.hidden = true;
    });
  });
}

/* =========================================================
   P5-15 ユーザー – 取引ワークスペース
   ========================================================= */
KTN.pages['p5-15'] = function () {
    document.body.classList.add('p5-page', 'p5-15-page');
    document.body.style.setProperty('--page-accent', '#b8608c');
    document.body.style.setProperty('--page-accent-bg', 'rgba(184,96,140,.1)');
    document.body.style.setProperty('--page-accent-border', '#c97aaa');

    function applyRole() {
        var role = window.curRole || 'guest';
        var canView = (role === 'user+' || role === 'admin');
        var wrap = document.querySelector('.p515-wrap');
        if (wrap) wrap.style.display = canView ? '' : 'none';
    }
    _initTxnCommentAttach();

    var _prevRender = window.ktnRender;
    window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); applyRole(); };
    applyRole();
};

/* ════════════════════════════════════════════════════
   P3-15  LIAISON+コンソール
════════════════════════════════════════════════════ */
KTN.pages['p3-11'] = function () {

  // 0. ページスコープ・アクセントカラー（creator＝インクブルー）
  document.body.classList.add('p3-page');
  document.body.style.setProperty('--page-accent',        '#2a5f7a');
  document.body.style.setProperty('--page-accent-bg',     'rgba(42,95,122,.1)');
  document.body.style.setProperty('--page-accent-border', '#5a8fa8');

  // 1. 管理メニューはヘッダー getActions のオーナーメニューへ集約（identity strip 試作・ドロワー廃止）

  // 2. スクロール連動ヘッダー
  var header = document.getElementById('ktnHeader');
  var hero = document.querySelector('.p3-head');
  if (header && hero) {
    var observer = new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: '-50px 0px 0px 0px' });
    observer.observe(hero);
  }

  // 3. クリエイターID ライブプレビュー
  var idInput = document.getElementById('p311CreatorId');
  var idPreview = document.getElementById('p311IdPreview');
  if (idInput && idPreview) {
    idInput.addEventListener('input', function () {
      var v = idInput.value.replace(/[^a-zA-Z0-9_-]/g, '');
      idInput.value = v;
      idPreview.textContent = v || '（未設定）';
    });
  }

  // 4. アバター画像プレビュー
  var avatarInput = document.getElementById('p311AvatarInput');
  var avatarPreview = document.querySelector('.p211-avatar-preview');
  if (avatarInput && avatarPreview) {
    avatarInput.addEventListener('change', function () {
      var f = avatarInput.files && avatarInput.files[0];
      if (!f) return;
      var url = URL.createObjectURL(f);
      avatarPreview.textContent = '';
      avatarPreview.style.background = 'none';
      var img = document.createElement('img');
      img.src = url;
      avatarPreview.appendChild(img);
    });
  }

  // 5. 繰り返し行の追加・削除
  function bindDel(row) {
    var del = row.querySelector('.p211-repeat__del');
    if (del) del.addEventListener('click', function () { row.remove(); });
  }
  document.querySelectorAll('.p211-repeat__row').forEach(bindDel);
  document.querySelectorAll('.p211-repeat__add').forEach(function (addBtn) {
    addBtn.addEventListener('click', function () {
      var list = document.getElementById(addBtn.dataset.target);
      if (!list) return;
      var row = document.createElement('div');
      if (addBtn.dataset.link) {
        row.className = 'p211-repeat__row p211-repeat__row--link';
        row.innerHTML =
          '<select class="p211-select">' +
          '<option value="instagram">Instagram</option>' +
          '<option value="x">X（Twitter）</option>' +
          '<option value="facebook">Facebook</option>' +
          '<option value="youtube">YouTube</option>' +
          '<option value="website">公式サイト</option>' +
          '<option value="other">その他</option></select>' +
          '<input class="p211-input" type="url" placeholder="https://">' +
          '<button class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p211-repeat__del" type="button" aria-label="削除">✕</button>';
      } else {
        row.className = 'p211-repeat__row';
        row.innerHTML =
          '<input class="p211-input" type="text" placeholder="' + (addBtn.dataset.placeholder || '') + '">' +
          '<button class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p211-repeat__del" type="button" aria-label="削除">✕</button>';
      }
      list.appendChild(row);
      bindDel(row);
    });
  });

  // 6. 保存
  var saveBtn = document.getElementById('p311SaveBtn');
  if (saveBtn) saveBtn.addEventListener('click', function () {
    if (typeof showToast === 'function') showToast('変更を保存しました');
  });

};

KTN.pages['p4-11'] = function () {

  // 0. ページスコープ・アクセントカラー（gallery＝コッパーブラウン）
  document.body.classList.add('p4-page');
  document.body.style.setProperty('--page-accent',        '#8b5e3c');
  document.body.style.setProperty('--page-accent-bg',     'rgba(139,94,60,.1)');
  document.body.style.setProperty('--page-accent-border', '#b07840');

  // 1. 管理メニューはヘッダー getActions のオーナーメニューへ集約

  // 2. スクロール連動ヘッダー
  var header = document.getElementById('ktnHeader');
  var hero = document.querySelector('.p4-head');
  if (header && hero) {
    var observer = new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: '-50px 0px 0px 0px' });
    observer.observe(hero);
  }

  // 3. ギャラリーID ライブプレビュー
  var idInput = document.getElementById('p411GalleryId');
  var idPreview = document.getElementById('p411IdPreview');
  if (idInput && idPreview) {
    idInput.addEventListener('input', function () {
      var v = idInput.value.replace(/[^a-zA-Z0-9_-]/g, '');
      idInput.value = v;
      idPreview.textContent = v || '（未設定）';
    });
  }

  // 4. ロゴ画像プレビュー
  var logoInput = document.getElementById('p411LogoInput');
  var logoPreview = document.querySelector('.p211-avatar-preview');
  if (logoInput && logoPreview) {
    logoInput.addEventListener('change', function () {
      var f = logoInput.files && logoInput.files[0];
      if (!f) return;
      var url = URL.createObjectURL(f);
      logoPreview.textContent = '';
      logoPreview.style.background = 'none';
      var img = document.createElement('img');
      img.src = url;
      logoPreview.appendChild(img);
    });
  }

  // 5. 繰り返し行の追加・削除
  function bindDel(row) {
    var del = row.querySelector('.p211-repeat__del');
    if (del) del.addEventListener('click', function () { row.remove(); });
  }
  document.querySelectorAll('.p211-repeat__row').forEach(bindDel);
  document.querySelectorAll('.p211-repeat__add').forEach(function (addBtn) {
    addBtn.addEventListener('click', function () {
      var list = document.getElementById(addBtn.dataset.target);
      if (!list) return;
      var row = document.createElement('div');
      if (addBtn.dataset.link) {
        row.className = 'p211-repeat__row p211-repeat__row--link';
        row.innerHTML =
          '<select class="p211-select">' +
          '<option value="instagram">Instagram</option>' +
          '<option value="x">X（Twitter）</option>' +
          '<option value="facebook">Facebook</option>' +
          '<option value="youtube">YouTube</option>' +
          '<option value="website">公式サイト</option>' +
          '<option value="other">その他</option></select>' +
          '<input class="p211-input" type="url" placeholder="https://">' +
          '<button class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p211-repeat__del" type="button" aria-label="削除">✕</button>';
      } else {
        row.className = 'p211-repeat__row';
        row.innerHTML =
          '<input class="p211-input" type="text" placeholder="' + (addBtn.dataset.placeholder || '') + '">' +
          '<button class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p211-repeat__del" type="button" aria-label="削除">✕</button>';
      }
      list.appendChild(row);
      bindDel(row);
    });
  });

  // 6. 保存
  var saveBtn = document.getElementById('p411SaveBtn');
  if (saveBtn) saveBtn.addEventListener('click', function () {
    if (typeof showToast === 'function') showToast('変更を保存しました');
  });

};

KTN.pages['p3-12'] = function () {

  // 0. ページスコープ・アクセントカラー（creator＝インクブルー）
  document.body.classList.add('p3-page');
  document.body.style.setProperty('--page-accent',        '#2a5f7a');
  document.body.style.setProperty('--page-accent-bg',     'rgba(42,95,122,.1)');
  document.body.style.setProperty('--page-accent-border', '#5a8fa8');

  // 1. 管理ドロワー
  var drawer = document.getElementById('p312Drawer');
  var mgmtBtn = document.getElementById('p312MgmtBtn');
  var drawerClose = document.getElementById('p312DrawerClose');
  var drawerOverlay = document.getElementById('p312DrawerOverlay');
  function openDrawer() { if (drawer) drawer.classList.add('is-open'); }
  function closeDrawer() { if (drawer) drawer.classList.remove('is-open'); }
  if (mgmtBtn) mgmtBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

  // 2. スクロール連動ヘッダー
  var header = document.getElementById('ktnHeader');
  var hero = document.querySelector('.p3-head');
  if (header && hero) {
    var observer = new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: '-50px 0px 0px 0px' });
    observer.observe(hero);
  }

  // 3. 期間セレクター（デモ：active切替のみ・データは静的）
  var periodBox = document.getElementById('p312Period');
  if (periodBox) {
    periodBox.querySelectorAll('.ins-period__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        periodBox.querySelectorAll('.ins-period__btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        if (typeof showToast === 'function') showToast('期間を変更しました（デモ）');
      });
    });
  }

};

/* ════════════════════════════════════════════════════
   P4-12  ギャラリー-インサイト
════════════════════════════════════════════════════ */
KTN.pages['p4-12'] = function () {

  var periodBox = document.getElementById('p412Period');
  if (periodBox) {
    periodBox.querySelectorAll('.ins-period__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        periodBox.querySelectorAll('.ins-period__btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        if (typeof showToast === 'function') showToast('期間を変更しました（デモ）');
      });
    });
  }

};

KTN.pages['p3-15'] = function () {

  // 0. ページスコープ・アクセントカラー
  document.body.classList.add('p3-page');
  document.body.style.setProperty('--page-accent',        '#2a5f7a');
  document.body.style.setProperty('--page-accent-bg',     'rgba(42,95,122,.1)');
  document.body.style.setProperty('--page-accent-border', '#5a8fa8');

  var d = window.P3_DATA || {};
  if (typeof applyHeadImageMode === 'function') applyHeadImageMode(d.hasImage !== false);
  var activeBadge = document.getElementById('p3HeadActiveBadge');
  if (activeBadge && d.hasActiveExhibition) activeBadge.removeAttribute('hidden');

  // 1. タブナビ（p3-tabnav）：クリックで各サブページへ
  document.querySelectorAll('.p3-tabnav__item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.dataset.tab === 'exhibitions') {
        window.location.href = 'kotennavi-p3-1.html';
      } else if (btn.dataset.tab === 'works') {
        window.location.href = 'kotennavi-p3-3.html';
      } else if (btn.dataset.tab === 'articles') {
        window.location.href = 'kotennavi-p3-2.html';
      } else if (btn.dataset.target) {
        window.location.href = 'kotennavi-p3.html#' + btn.dataset.target;
      }
    });
  });

  // 2. 管理ドロワー
  var drawer = document.getElementById('p315Drawer');
  var mgmtBtn = document.getElementById('p315MgmtBtn');
  var drawerClose = document.getElementById('p315DrawerClose');
  var drawerOverlay = document.getElementById('p315DrawerOverlay');
  function openDrawer() { if (drawer) drawer.classList.add('is-open'); }
  function closeDrawer() { if (drawer) drawer.classList.remove('is-open'); }
  if (mgmtBtn) mgmtBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

  // 3. スクロール連動スタイル
  var header = document.getElementById('ktnHeader');
  var hero = document.querySelector('.p3-head');
  if (header && hero) {
    var observer = new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: '-50px 0px 0px 0px' });
    observer.observe(hero);
  }

  // 4. コンソール内2タブ切替（FAQ＝「期間中展覧会」タブのみ表示。終了した展覧会/購入者一覧では不要）
  var tabBtns = document.querySelectorAll('.p315-tab-btn');
  var tabPanels = document.querySelectorAll('.p315-tab-panel');
  var faqSection = document.querySelector('.p315-faq');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      tabPanels.forEach(function (p) { p.hidden = true; });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      var panel = document.getElementById(btn.dataset.panel);
      if (panel) panel.hidden = false;
      if (faqSection) faqSection.hidden = btn.dataset.panel !== 'p315-panel-active';
    });
  });

  // 5. 会場売約済モーダル
  var venueModal = document.getElementById('p315VenueModal');
  var venueModalBg = document.getElementById('p315VenueModalBg');
  var venueModalCancel = document.getElementById('p315VenueModalCancel');
  var venueModalOk = document.getElementById('p315VenueModalOk');
  var venueModalBody = document.getElementById('p315VenueModalBody');
  var venueModalCheckWrap = document.getElementById('p315VenueModalCheckWrap');
  var venueModalCheckbox = document.getElementById('p315VenueModalCheckbox');
  var _venueItem = null;

  document.querySelectorAll('.p315-venue-btn:not(:disabled)').forEach(function (btn) {
    btn.addEventListener('click', function () {
      _venueItem = btn.closest('.p315-witem');
      var workName = btn.dataset.work || '作品';
      var count = parseInt(btn.dataset.count || '0', 10);
      if (venueModalBody) {
        venueModalBody.innerHTML = '「' + workName + '」を「売約済」に変更します。<br>' +
          (count > 0 ? '申込中の <strong>' + count + '名</strong> 全員にキャンセル通知（メール）が送信されます。<br>' : '') +
          'この操作は取り消せません。';
      }
      var needCheck = count > 0;
      if (venueModalCheckWrap) venueModalCheckWrap.hidden = !needCheck;
      if (venueModalCheckbox) venueModalCheckbox.checked = false;
      if (venueModalOk) venueModalOk.disabled = needCheck;
      if (venueModal) venueModal.hidden = false;
    });
  });
  if (venueModalCheckbox) {
    venueModalCheckbox.addEventListener('change', function () {
      if (venueModalOk) venueModalOk.disabled = !venueModalCheckbox.checked;
    });
  }
  function closeVenueModal() { if (venueModal) venueModal.hidden = true; }
  if (venueModalCancel) venueModalCancel.addEventListener('click', closeVenueModal);
  if (venueModalBg) venueModalBg.addEventListener('click', closeVenueModal);
  if (venueModalOk) {
    venueModalOk.addEventListener('click', function () {
      closeVenueModal();
      if (_venueItem) {
        var opsEl = _venueItem.querySelector('.p315-witem__ops');
        if (opsEl) opsEl.style.display = 'none';
      }
      KTN.toast('会場売約済に変更しました。申込者にキャンセル通知を送信しました');
    });
  }

  // 6. 出品取消モーダル
  var takedownModal = document.getElementById('p315TakedownModal');
  var takedownModalBg = document.getElementById('p315TakedownModalBg');
  var takedownModalCancel = document.getElementById('p315TakedownModalCancel');
  var takedownModalOk = document.getElementById('p315TakedownModalOk');
  var takedownModalBody = document.getElementById('p315TakedownModalBody');
  var takedownModalCheckWrap = document.getElementById('p315TakedownModalCheckWrap');
  var takedownModalCheckbox = document.getElementById('p315TakedownModalCheckbox');
  var takedownModalCheckbox2 = document.getElementById('p315TakedownModalCheckbox2');
  var _takedownItem = null;

  function _updateTakedownOk() {
    if (!takedownModalOk) return;
    var c1 = takedownModalCheckWrap && !takedownModalCheckWrap.hidden ? (takedownModalCheckbox && takedownModalCheckbox.checked) : true;
    var c2 = takedownModalCheckbox2 ? takedownModalCheckbox2.checked : true;
    takedownModalOk.disabled = !(c1 && c2);
  }

  document.querySelectorAll('.p315-takedown-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      _takedownItem = btn.closest('.p315-witem');
      var workName = btn.dataset.work || '作品';
      var count = parseInt(btn.dataset.count || '0', 10);
      if (takedownModalBody) {
        takedownModalBody.innerHTML = '「' + workName + '」の LIAISON+ 出品を取り消します。<br>' +
          (count > 0 ? '申込中の <strong>' + count + '名</strong> 全員にキャンセル通知（メール）が送信されます。<br>' : '') +
          'この操作は取り消せません。';
      }
      if (takedownModalCheckWrap) takedownModalCheckWrap.hidden = count === 0;
      if (takedownModalCheckbox) takedownModalCheckbox.checked = false;
      if (takedownModalCheckbox2) takedownModalCheckbox2.checked = false;
      _updateTakedownOk();
      if (takedownModal) takedownModal.hidden = false;
    });
  });
  if (takedownModalCheckbox) takedownModalCheckbox.addEventListener('change', _updateTakedownOk);
  if (takedownModalCheckbox2) takedownModalCheckbox2.addEventListener('change', _updateTakedownOk);
  function closeTakedownModal() { if (takedownModal) takedownModal.hidden = true; }
  if (takedownModalCancel) takedownModalCancel.addEventListener('click', closeTakedownModal);
  if (takedownModalBg) takedownModalBg.addEventListener('click', closeTakedownModal);
  if (takedownModalOk) {
    takedownModalOk.addEventListener('click', function () {
      closeTakedownModal();
      if (_takedownItem) _takedownItem.style.display = 'none';
      KTN.toast('出品取消を実行しました。申込者へキャンセル通知を送信しました');
    });
  }

  // 7. 購入者一覧タブ：列ソート（デスクトップ＝列見出しボタン／モバイル＝カード化でthead非表示のため代替セレクトで操作）
  (function () {
    var table = document.getElementById('p315BuyersTable');
    if (!table) return;
    var tbody = table.querySelector('tbody');
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
    var btns = table.querySelectorAll('.p315-buyers-sort-btn');
    var sel = document.getElementById('p315BuyersSortSel');
    var curKey = null, curDir = 1;

    function sortRows(key, dir) {
      var isNum = (key === 'price' || key === 'status');
      rows.sort(function (a, b) {
        var av = a.dataset[key], bv = b.dataset[key];
        if (isNum) { return (parseFloat(av) - parseFloat(bv)) * dir; }
        return av.localeCompare(bv, 'ja') * dir;
      });
      rows.forEach(function (r) { tbody.appendChild(r); });
    }

    function applySort(key, dir) {
      curKey = key; curDir = dir;
      btns.forEach(function (b) { b.classList.remove('is-active', 'is-desc'); });
      var matchBtn = table.querySelector('.p315-buyers-sort-btn[data-sort="' + key + '"]');
      if (matchBtn) {
        matchBtn.classList.add('is-active');
        if (dir === -1) matchBtn.classList.add('is-desc');
      }
      if (sel) sel.value = key + ':' + (dir === -1 ? 'desc' : 'asc');
      sortRows(key, dir);
    }

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.sort;
        var dir = (curKey === key) ? curDir * -1 : 1;
        applySort(key, dir);
      });
    });

    if (sel) {
      sel.addEventListener('change', function () {
        var parts = sel.value.split(':');
        applySort(parts[0], parts[1] === 'desc' ? -1 : 1);
      });
    }
  })();

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P3-14  ポートフォリオ管理（クリエイター版）
   ── クリエイター本人の作品リスト。公開＝クリエイターページの
   　　「作品」に表示／非公開＝サイト非表示だが出品候補には使える。
   　　詳細アコーディオンで公開切替・出品歴・作者コメントを扱う。
   　　新規/編集/クローンは p6-11 へ遷移（作者＝本人固定）。
════════════════════════════════════════════════════ */
KTN.pages['p3-14'] = function () {

  /* ── 販売状態マスタ ── */
  var STATUS = {
    sale:    { label:'販売中',   cls:'aws-sale' },
    negot:   { label:'商談中',   cls:'aws-negot' },
    sold:    { label:'売約済',   cls:'aws-sold' },
    inquiry: { label:'要問合せ', cls:'aws-inquiry' },
    nonsale: { label:'非売品',   cls:'aws-nsale' },
  };

  /* ── サンプルデータ（田中透の作品。p2-12 系のデモプールと同一世界）──
     pub＝クリエイターページに公開するか。reg/upd＝登録日・最終更新日。rs＝登録日の並べ替えキー。
     hist＝出品記録（複数あり得る・新しい順。state:'now'なら出品中）。
     販売状態（sale）・価格（price）は作品そのものではなく各出品記録が持つ（＝出品時に設定される値）。
     販売状態・価格は詳細の出品歴内でのみ表示（一覧は出品中/未出品マークのみ・2026-07-20）。
     終了した展覧会の記録では進行中の状態（販売中/商談中/要問合せ）を出さず、結果として残る
     売約済・非売品のみバッジ表示（価格は当時の出品価格としてどの記録でも表示）。
     memo＝オーナーメモ（本人だけが見られる非公開の備忘録＝価格の経緯・興味を持った人の記録など。
     作品ページには表示しない。公開の「作者コメント」とは別概念＝現時点では持たない）。 */
  /* href＝展覧会ページへのリンク。終了した展覧会もページは残るためリンクを持つ（デモでは代表として p2 を指す） */
  var EXH_NOW   = { mode:'lp', n:'あなたが知らないオノマトペ', term:'2026.2.18 — 3.5',  state:'now', href:'kotennavi-p2.html' };
  var EXH_PAST  = { mode:'l',  n:'オノマトペ、その手前 vol.2', term:'2025.6.14 — 6.29', state:'ended', href:'kotennavi-p2.html' };
  var EXH_PAST2 = { mode:'l',  n:'ことばの輪郭 三人展',        term:'2024.10.5 — 10.20', state:'ended', href:'kotennavi-p2.html' };
  var EXH_PAST3 = { mode:'lp', n:'音のかたち、かたちの音',     term:'2025.11.15 — 11.30', state:'ended', href:'kotennavi-p2.html' };
  /* online:true＝LIAISON+のオンライン取引で成立した売約済（取引完了）。
     手動売約済（会場売却等・オーナー設定）と区別し、取引完了の作品は出品候補から外れる（仕様書 第7章/第17章） */
  function rec(exh, sale, price, online, queue) {
    return { mode:exh.mode, n:exh.n, term:exh.term, state:exh.state, href:exh.href, sale:sale, price:price || '', online:!!online, queue:queue || 0 };
  }
  /* awid＝作品ID（作品作成時にシステムが自動採番＝登録日順に増加。AW-C42-1847=《オノマトペの庭》は
     p3-15/p3-16/p5-14/p5-15/p6 の既存デモIDと同一） */
  var WORKS = [
    /* 下書き（p6-11 の一時保存で作成・未完成＝サイズ未入力）。pub:false 固定・hist なし＝公開/出品候補に出ない */
    { id:'w10', title:'《かさかさ》',       awid:'AW-C42-1852', year:'2026年', medium:'キャンバスに油彩', size:'', bg:'linear-gradient(155deg,#e0d4bc,#b8a884)', pub:false, reg:'2026.2.22', upd:'2026.2.22', rs:20260222, draft:true,
      hist:[], memo:'サイズ未確定。写真を撮り直してから仕上げる。' },
    { id:'w11', title:'《まだらの朝（仮）》', awid:'AW-C42-1849', year:'2026年', medium:'', size:'', bg:'linear-gradient(155deg,#d8c8b0,#a89878)', pub:false, reg:'2026.2.10', upd:'2026.2.14', rs:20260210, draft:true,
      hist:[], memo:'技法・サイズ未定。タイトルも仮。会期に間に合えば出品検討。' },
    { id:'w1', title:'《オノマトペの庭》',  awid:'AW-C42-1847', year:'2026年', medium:'キャンバスに油彩', size:'116.7×91.0cm', bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)', pub:true,  reg:'2026.1.12', upd:'2026.2.20', rs:20260112,
      hist:[rec(EXH_NOW,'inquiry')], memo:'DM掲載作品。会期初日に価格の問い合わせ1件（未提示・要問合せのまま様子見）。' },
    { id:'w2', title:'《ふわふわ》',        awid:'AW-C42-1731', year:'2025年', medium:'キャンバスに油彩', size:'72.7×60.6cm',  bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', pub:true,  reg:'2025.4.3',  upd:'2026.2.18', rs:20250403,
      hist:[rec(EXH_NOW,'sale','¥180,000',false,2), rec(EXH_PAST,'sale','¥165,000')], memo:'前回出品 ¥165,000 → 今回 ¥180,000 に改定。初日から興味あり！が多め。現在2件の購入申込あり（取引準備中）。' },
    { id:'w3', title:'《ざわざわ（夜）》',   awid:'AW-C42-1790', year:'2025年', medium:'アクリル・パネル', size:'53.0×45.5cm',  bg:'linear-gradient(155deg,#3d3530,#1f1a18)', pub:true,  reg:'2025.9.20', upd:'2026.1.30', rs:20250920,
      hist:[rec(EXH_NOW,'nonsale')], memo:'' },
    { id:'w4', title:'《ドキドキ #3》',     awid:'AW-C42-1815', year:'2025年', medium:'キャンバスに油彩', size:'45.5×38.0cm',  bg:'linear-gradient(155deg,#f0d0d0,#c88080)', pub:false, reg:'2025.11.8', upd:'2025.11.8', rs:20251108,
      hist:[], memo:'' },
    { id:'w9', title:'《ぱちぱち》',        awid:'AW-C42-1798', year:'2025年', medium:'キャンバスに油彩', size:'53.0×45.5cm',  bg:'linear-gradient(155deg,#e8d8b8,#c89858)', pub:true,  reg:'2025.10.2', upd:'2025.12.8', rs:20251002, p6id:5,
      hist:[rec(EXH_PAST3,'sold','¥120,000',true)], memo:'LIAISON+で販売・取引完了。ご購入者がコレクションルームで公開中。' },
    { id:'w5', title:'《シュワシュワ》',     awid:'AW-C42-1655', year:'2024年', medium:'アクリル・パネル', size:'41.0×31.8cm',  bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)', pub:true,  reg:'2024.8.15', upd:'2025.6.10', rs:20240815,
      hist:[rec(EXH_PAST,'inquiry')], memo:'小品。次に出すときは額装を変えて再出品したい。' },
    { id:'w6', title:'《言葉の断片 I》',    awid:'AW-C42-1620', year:'2024年', medium:'紙にインク',       size:'36.4×25.7cm',  bg:'linear-gradient(155deg,#d8c8e8,#a888cc)', pub:true,  reg:'2024.5.2',  upd:'2025.7.2',  rs:20240502,
      hist:[rec(EXH_PAST,'sold','¥95,000'), rec(EXH_PAST2,'sale','¥95,000')], memo:'' },
    { id:'w7', title:'《言葉の断片 II》',   awid:'AW-C42-1621', year:'2024年', medium:'紙にインク',       size:'36.4×25.7cm',  bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', pub:false, reg:'2024.5.2',  upd:'2024.5.2',  rs:20240502,
      hist:[], memo:'' },
    { id:'w8', title:'《ふわふわ No.2》',   awid:'AW-C42-1698', year:'2024年', medium:'キャンバスに油彩', size:'53.0×45.5cm',  bg:'linear-gradient(155deg,#e0d8c8,#b4a88a)', pub:true,  reg:'2024.12.1', upd:'2024.12.1', rs:20241201,
      hist:[], memo:'' },
  ];

  /* ── DOM ── */
  var listEl      = document.getElementById('p314List');
  var emptyEl     = document.getElementById('p314Empty');
  var pubSel      = document.getElementById('p314FilterPub');
  var listedSel   = document.getElementById('p314FilterListed');
  var sortSel     = document.getElementById('p314Sort');
  var draftBanner = document.getElementById('p314DraftBanner');
  var draftCntEl  = document.getElementById('p314DraftCount');
  var tabActive   = document.getElementById('p314TabActive');
  var tabSold     = document.getElementById('p314TabSold');
  var cntActive   = document.getElementById('p314CountActive');
  var cntSold     = document.getElementById('p314CountSold');
  var soldNotice  = document.getElementById('p314SoldNotice');
  var listedWrap  = document.getElementById('p314FilterListedWrap');
  var pagerEl     = document.getElementById('p314Pagination');
  if (!listEl || !pubSel || !listedSel || !sortSel) return;

  var curTab = 'active'; /* 'active' | 'sold' */
  var page = 1;
  var PER_PAGE = 5;

  /* 詳細アコーディオンの開閉状態（再描画をまたいで維持） */
  var openIds = {};

  function isListed(w) {
    return w.hist.some(function (h) { return h.state === 'now'; });
  }

  /* LIAISON+のオンライン取引が完了した作品（所有が購入者へ移転＝出品候補から外れ・レコード凍結で編集不可） */
  function isSoldOnline(w) {
    return w.hist.some(function (h) { return h.sale === 'sold' && h.online; });
  }

  /* 販売中かつ購入申込あり（取引準備中）＝作品の編集を凍結する。申込者は現在の作品内容に対して申し込んでいるため */
  function hasLiveApply(w) {
    return w.hist.some(function (h) { return h.state === 'now' && h.sale === 'sale' && h.queue > 0; });
  }

  /* 下書き＝p6-11 の一時保存で作られた未完成作品（在庫のみ・公開/検索/出品候補に出ない） */
  function isDraft(w) { return !!w.draft; }

  function p611Link(mode, id) {
    return 'kotennavi-p6-11.html?mode=' + mode + '&author=tanaka&self=1&work=' + encodeURIComponent(id);
  }

  /* 公開作品ページへのリンク先。出品中＝展覧会の作品ページ（LIAISON/LIAISON+）を優先、
     出品なしでも公開中なら通常の作品ページ。非公開×未出品＝公開ページが存在しないので null */
  function workLink(w) {
    for (var i = 0; i < w.hist.length; i++) {
      if (w.hist[i].state === 'now') return w.hist[i].mode === 'lp' ? 'kotennavi-p6-2.html' : 'kotennavi-p6-1.html';
    }
    /* p6id＝p6デモデータ（_p6Works）側の対応ID（w9《ぱちぱち》→ id=5 売約済表示） */
    return w.pub ? 'kotennavi-p6.html' + (w.p6id ? '?id=' + w.p6id : '') : null;
  }

  /* ── アイテム生成 ── */
  function makeItem(w) {
    var listed = isListed(w);
    var soldOnline = isSoldOnline(w);
    var liveApply = hasLiveApply(w);
    var draft = isDraft(w);
    /* 削除可否：下書きは破棄可。完成作品は「出品中（ライブ）」「取引完了（凍結・購入者所有）」以外は削除可 */
    var canDelete = draft || (!listed && !soldOnline);
    /* 一覧には下書き/出品中/取引完了/未出品のマークのみ（出品先の展覧会名・出品歴は詳細内） */
    var exhHtml = draft
      ? ''
      : listed
        ? '<span class="p314-item__listed">出品中</span>'
        : soldOnline
          ? '<span class="p314-item__done">売約済（取引完了）</span>'
          : '<span class="p314-item__unlisted">未出品</span>';

    var histHtml = w.hist.length
      ? '<ul class="p314-hist">' + w.hist.map(function (h) {
          var badge = h.mode === 'lp'
            ? '<span class="lb-dot li-plus">LIAISON+</span>'
            : '<span class="lb-dot li">LIAISON</span>';
          var name = h.href
            ? '<a class="p314-hist__name" href="' + h.href + '" target="_blank" rel="noopener">' + h.n + '</a>'
            : '<span class="p314-hist__name">' + h.n + '</span>';
          /* 開催ステータスは共通 .sb バッジで展覧会タイトルの横に付ける */
          var state = h.state === 'now'
            ? '<span class="sb sb-live"><span class="pulse"></span>開催中</span>'
            : '<span class="sb sb-closed">終了</span>';
          var hs = STATUS[h.sale];
          /* 終了した記録では進行中の販売状態を出さない（売約済・非売品のみ結果として表示） */
          var showSale = hs && (h.state === 'now' || h.sale === 'sold' || h.sale === 'nonsale');
          /* オンライン取引による売約済＝「売約済（取引完了）」表記（仕様書＝管理画面では手動と区別） */
          var saleHtml = '<span class="p314-hist__sale">' +
            (showSale ? '<span class="aws ' + hs.cls + '">' + hs.label + '</span>' : '') +
            (h.online ? '<span class="p314-hist__online">取引完了</span>' : '') +
            (h.price ? '<span class="p314-hist__price">' + h.price + '</span>' : '') +
            '</span>';
          return '<li class="p314-hist__row">' + badge + name + state +
            '<span class="p314-hist__term">' + h.term + '</span>' + saleHtml + '</li>';
        }).join('') + '</ul>'
      : '<p class="p314-hist-empty">出品歴はありません。</p>';

    var open = !!openIds[w.id];
    var wl = workLink(w);
    var li = document.createElement('li');
    li.className = 'p314-item' + (draft ? ' p314-item--draft' : '');
    li.dataset.id = w.id;
    li.innerHTML =
      (draft ? '<span class="p314-item__ribbon">下書き</span>' : '') +
      '<div class="p314-item__main' + (wl ? ' p314-item__main--link" title="クリックで作品ページを新しいタブで表示' : '') + '">' +
        '<div class="p314-item__thumb" style="background:' + w.bg + '"></div>' +
        '<div class="p314-item__body">' +
          '<div class="p314-item__title-row">' +
            '<span class="cb cb-content cb-artwork">artwork</span>' +
            '<span class="ktn-aw-id">' + w.awid + '</span>' +
          '</div>' +
          '<div class="p314-item__title">' + w.title + '</div>' +
          '<div class="p314-item__meta">' + [w.year, w.medium, w.size].filter(Boolean).join('　') + '</div>' +
          '<div class="p314-item__exhs">' + exhHtml + '</div>' +
        '</div>' +
        '<div class="p314-item__side">' +
          /* 下書きは公開できない＝スイッチ自体を出さない（右肩の「下書き」リボン＋詳細ノートで代替） */
          (draft
            ? ''
            : '<button type="button" class="ktn-switch p314-pub-sw' + (w.pub ? ' is-on' : '') +
                '" role="switch" aria-checked="' + w.pub + '" title="クリックで公開/非公開を切り替え">' +
                '<span class="ktn-switch__track"><span class="ktn-switch__knob"></span></span>' +
                '<span class="ktn-switch__label">' + (w.pub ? '公開中' : '非公開') + '</span>' +
              '</button>') +
        '</div>' +
      '</div>' +
      '<div class="p314-item__dates">登録 ' + w.reg + '<span class="p314-item__dates-sep">·</span>更新 ' + w.upd + '</div>' +
      /* 下書きの説明は一覧上部のバナー（#p314DraftBanner）に集約。カードは編集再開のみ */
      '<div class="p314-item__actions' + (draft ? ' p314-item__actions--draft' : '') + '">' +
        /* 下書きは出品歴/メモの展開トグルを出さない（完成が先） */
        (draft ? '' : '<button type="button" class="p314-item__toggle" aria-expanded="' + open + '">' + (open ? '出品歴・メモを閉じる ▴' : '出品歴・メモを表示 ▾') + '</button>') +
        /* 削除／下書き破棄（確認モーダルで確定）。出品中＝ライブ・取引完了＝凍結のため出さない */
        (canDelete ? '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p314-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' : '') +
        /* 下書き＝編集の再開のみ（クローンは完成作品向けなので出さない） */
        (draft
          ? '<a class="ktn-action-btn" href="' + p611Link('edit', w.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p611Link('clone', w.id) + '">クローン →</a>' +
            /* 編集導線を出さない条件：取引完了＝レコード凍結／販売中×申込あり＝申込者が現内容に申込済みのため作品編集を凍結。いずれもクローン・公開切替は可 */
            (soldOnline || liveApply ? '' : '<a class="ktn-action-btn" href="' + p611Link('edit', w.id) + '">編集 →</a>')) +
      '</div>' +
      /* 下書きは詳細アコーディオン自体を出さない（ノートは上に常時表示済み） */
      (draft
        ? ''
        : '<div class="p314-item__detail"' + (open ? '' : ' hidden') + '>' +
            (soldOnline
              ? '<div class="p314-done-note">LIAISON+のオンライン取引が完了した作品です。クリエイターページへの公開/非公開はこれまで通り設定できますが、作品はご購入者の所有となるため、LIAISON / LIAISON+ の出品候補からは外れ、作品情報の編集はできません（クローンで複製した作品は新規作品として出品できます）。</div>'
              : '') +
            (liveApply
              ? '<div class="p314-done-note">販売中で購入申込を受け付けている作品です。申込者は現在の作品内容にもとづいて申し込んでいるため、取引が進行する間は作品情報を編集できません（公開/非公開の切替・クローンは可）。編集が必要な場合は出品を取り消してから行ってください。</div>'
              : '') +
            '<div class="p314-detail-sec">' +
              '<div class="p314-detail-sec__title">出品歴</div>' +
              histHtml +
            '</div>' +
            '<div class="p314-detail-sec">' +
              '<div class="p314-detail-sec__title">オーナーメモ</div>' +
              '<p class="p314-detail-sec__help">あなただけが見られる非公開のメモです（付けた価格の経緯・興味を持った方の記録など）。作品ページには表示されません。</p>' +
              '<textarea class="p314-memo__input" placeholder="この作品についてのメモ（任意）">' + w.memo + '</textarea>' +
              '<div class="p314-memo__foot"><button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--primary p314-memo-save">メモを保存</button></div>' +
            '</div>' +
          '</div>');
    return li;
  }

  /* ── フィルタ・並べ替え描画 ── */
  var SORTS = {
    'reg-desc':  function (a, b) { return b.rs - a.rs; },
    'reg-asc':   function (a, b) { return a.rs - b.rs; },
    'year-desc': function (a, b) { return (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0); },
    'year-asc':  function (a, b) { return (parseInt(a.year, 10) || 0) - (parseInt(b.year, 10) || 0); },
    'title':     function (a, b) { return a.title.localeCompare(b.title, 'ja'); },
  };

  function render() {
    var fp = pubSel.value;
    var fl = listedSel.value;
    var sold = curTab === 'sold';
    var rows = WORKS.filter(function (w) {
      /* タブでバケット分割：売約済（取引完了）タブはオンライン取引完了作品のみ、登録済みタブはそれ以外 */
      if (isSoldOnline(w)) { if (!sold) return false; } else { if (sold) return false; }
      /* 下書き＝別もの。公開・出品状況で絞り込む時は候補から外す（「すべて」表示時のみ最上部に固定） */
      if (isDraft(w)) return fp === '' && fl === '';
      if (fp === 'pub'      && !w.pub) return false;
      if (fp === 'unpub'    &&  w.pub) return false;
      if (fl === 'listed' && !isListed(w)) return false;
      if (fl === 'past'   && (isListed(w) || !w.hist.length)) return false;
      if (fl === 'never'  &&  w.hist.length) return false;
      return true;
    });
    rows.sort(SORTS[sortSel.value] || SORTS['reg-desc']);
    rows.sort(function (a, b) { return (isDraft(b) ? 1 : 0) - (isDraft(a) ? 1 : 0); });
    /* 下書き数・ゼロ状態は絞り込み後の全件から算出（ページングで切り出す前） */
    var draftN = rows.filter(isDraft).length;
    if (draftBanner) draftBanner.hidden = draftN === 0;
    if (draftCntEl) draftCntEl.textContent = draftN;
    if (emptyEl) emptyEl.hidden = rows.length !== 0;
    if (listedWrap) listedWrap.hidden = sold; /* 出品状況フィルタは登録済みタブのみ */
    if (soldNotice) soldNotice.hidden = !sold;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = '';
    pageRows.forEach(function (w) { listEl.appendChild(makeItem(w)); });
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }

  /* タブ別のバケット件数（フィルタ非依存の総数） */
  function syncTabCounts() {
    var a = 0, s = 0;
    WORKS.forEach(function (w) {
      if (isSoldOnline(w)) { s++; return; }
      if (isDraft(w)) return; /* 下書きは作品数に含めない */
      a++;
    });
    if (cntActive) cntActive.textContent = a;
    if (cntSold) cntSold.textContent = s;
  }

  function switchTab(tab) {
    if (curTab === tab) return;
    curTab = tab;
    if (tabActive) { tabActive.classList.toggle('is-active', tab === 'active'); tabActive.setAttribute('aria-selected', tab === 'active'); }
    if (tabSold)   { tabSold.classList.toggle('is-active', tab === 'sold');   tabSold.setAttribute('aria-selected', tab === 'sold'); }
    renderReset();
  }

  if (tabActive) tabActive.addEventListener('click', function () { switchTab('active'); });
  if (tabSold)   tabSold.addEventListener('click', function () { switchTab('sold'); });
  pubSel.addEventListener('change', renderReset);
  listedSel.addEventListener('change', renderReset);
  sortSel.addEventListener('change', renderReset);
  syncTabCounts();
  render();

  /* ── 操作（イベント委譲）── */
  function findWork(id) {
    for (var i = 0; i < WORKS.length; i++) if (WORKS[i].id === id) return WORKS[i];
    return null;
  }

  listEl.addEventListener('click', function (e) {
    var item = e.target.closest('.p314-item');
    if (!item) return;
    var w = findWork(item.dataset.id);
    if (!w) return;

    if (e.target.closest('.p314-item__toggle')) {
      openIds[w.id] = !openIds[w.id];
      render();
      return;
    }
    /* 公開切替＝行右肩のトグルスイッチ1か所（詳細内の切替は2026-07-20 廃止） */
    if (e.target.closest('.p314-pub-sw')) {
      w.pub = !w.pub;
      render();
      if (KTN.toast) KTN.toast(w.pub ? '作品を公開しました（デモ）' : '作品を非公開にしました（デモ）');
      return;
    }
    if (e.target.closest('.p314-memo-save')) {
      var ta = item.querySelector('.p314-memo__input');
      if (ta) w.memo = ta.value;
      if (KTN.toast) KTN.toast('オーナーメモを保存しました（デモ）');
      return;
    }
    /* 削除／下書き破棄＝確認モーダルを開いてから確定 */
    if (e.target.closest('.p314-item__del')) {
      openDelModal(w);
      return;
    }
    /* カード（main部）クリック＝作品ページを新しいタブで開く（内側のリンク・ボタンは除外） */
    if (e.target.closest('.p314-item__main--link') && !e.target.closest('a') && !e.target.closest('button')) {
      var wl = workLink(w);
      if (wl) window.open(wl, '_blank');
      return;
    }
  });

  /* ── 削除／下書き破棄モーダル（破壊操作＝confirm を経て実行） ── */
  var delModal   = document.getElementById('p314DelModal');
  var delTitle   = document.getElementById('p314DelTitle');
  var delDesc    = document.getElementById('p314DelDesc');
  var delCancel  = document.getElementById('p314DelCancel');
  var delConfirm = document.getElementById('p314DelConfirm');
  var delBg      = document.getElementById('p314DelBg');
  var pendingDel = null;

  function openDelModal(w) {
    if (!delModal) return;
    pendingDel = w.id;
    var draft = isDraft(w);
    if (delTitle) delTitle.textContent = draft ? '下書きを破棄しますか？' : '作品を削除しますか？';
    if (delDesc) delDesc.innerHTML = '<span class="p314-del-modal__name">' + w.title + '</span>' +
      (draft
        ? 'この下書きを完全に破棄します。入力済みの内容は復元できません。'
        : 'この作品をポートフォリオから完全に削除します。過去の出品記録・オーナーメモも失われ、復元できません。');
    if (delConfirm) delConfirm.textContent = draft ? '破棄する' : '削除する';
    delModal.hidden = false;
  }
  function closeDelModal() {
    if (!delModal) return;
    delModal.hidden = true;
    pendingDel = null;
  }
  if (delCancel) delCancel.addEventListener('click', closeDelModal);
  if (delBg)     delBg.addEventListener('click', closeDelModal);
  if (delConfirm) delConfirm.addEventListener('click', function () {
    if (!pendingDel) return;
    var wasDraft = false;
    for (var i = 0; i < WORKS.length; i++) {
      if (WORKS[i].id === pendingDel) { wasDraft = isDraft(WORKS[i]); WORKS.splice(i, 1); break; }
    }
    delete openIds[pendingDel];
    closeDelModal();
    syncTabCounts();
    render();
    if (KTN.toast) KTN.toast(wasDraft ? '下書きを破棄しました（デモ）' : '作品を削除しました（デモ）');
  });

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P4-14  作品インベントリー管理（ギャラリー版）
   ── ギャラリーが取り扱う作品の在庫を管理。作者は登録済み
   　　クリエイターのみ（真正性担保）。作者を常時表示し、作者で
   　　フィルタできる（クリエイター版 p3 相当には無い、複数作家を
   　　束ねるギャラリー固有の軸）。
════════════════════════════════════════════════════ */
KTN.pages['p4-14'] = function () {

  // 0. ページスコープ・アクセントカラー（gallery）
  document.body.classList.add('p4-page');
  document.body.style.setProperty('--page-accent',        '#8b5e3c');
  document.body.style.setProperty('--page-accent-bg',     'rgba(139,94,60,.1)');
  document.body.style.setProperty('--page-accent-border', '#b07840');

  /* ── 販売状態マスタ（p3-14 と同一） ── */
  var STATUS = {
    sale:    { label:'販売中',   cls:'aws-sale' },
    negot:   { label:'商談中',   cls:'aws-negot' },
    sold:    { label:'売約済',   cls:'aws-sold' },
    inquiry: { label:'要問合せ', cls:'aws-inquiry' },
    nonsale: { label:'非売品',   cls:'aws-nsale' },
  };

  /* ── 作者名 → レジストリキー（p6-11 の作者固定に使う） ── */
  var AUTHOR_KEY = { '高橋 信':'takahashi', '佐藤 みなと':'sato', '大野 藍':'ohno' };
  function authorKey(name) { return AUTHOR_KEY[name] || ''; }

  /* ── 出品先の展覧会（ギャラリーのグループ展）──
     href＝展覧会ページ。終了後もページは残るためリンクを持つ（デモでは代表として p2 を指す） */
  var EXH_NOW   = { mode:'lp', n:'色彩の対話 — 現代絵画グループ展', term:'2026.2.18 — 3.5',   state:'now',   href:'kotennavi-p2.html' };
  var EXH_PAST  = { mode:'l',  n:'冬のグループ展 2025',            term:'2025.12.6 — 12.21', state:'ended', href:'kotennavi-p2.html' };
  var EXH_PAST2 = { mode:'l',  n:'三人の視点展',                  term:'2025.5.10 — 5.25',  state:'ended', href:'kotennavi-p2.html' };
  var EXH_PAST3 = { mode:'lp', n:'オンライン・セレクション 2025',   term:'2025.9.1 — 9.30',   state:'ended', href:'kotennavi-p2.html' };
  /* online:true＝LIAISON+のオンライン取引で成立した売約済（取引完了）。
     手動売約済（会場売却等）と区別し、取引完了の作品は出品候補から外れる（仕様書 第7章/第17章） */
  function rec(exh, sale, price, online, queue) {
    return { mode:exh.mode, n:exh.n, term:exh.term, state:exh.state, href:exh.href, sale:sale, price:price || '', online:!!online, queue:queue || 0 };
  }

  /* ── サンプルデータ（このギャラリーが取り扱う作品。p3-14 と同じデータモデル）──
     author＝登録済みクリエイター（真正性担保のため未登録作家は入らない）。
     hist＝出品記録（複数あり得る・新しい順）。販売状態・価格は各出品記録が持つ。
     awid＝作品ID（作品作成時のシステム自動採番）。reg/upd＝登録日・最終更新日。rs＝並べ替えキー。
     memo＝オーナーメモ（ギャラリー担当者だけが見られる非公開の備忘録）。
     ※ギャラリーインベントリーはギャラリーページに公開表示されないため公開/非公開の概念は持たない。 */
  var WORKS = [
    /* 下書き（p6-11 の一時保存で作成・未完成）。hist なし＝出品候補に出ない。作者は登録済みクリエイター */
    { id:'g10', title:'《岸辺のスケッチ》',    author:'高橋 信',     awid:'AW-T18-2260', year:'2026年', medium:'キャンバスに油彩', bg:'linear-gradient(155deg,#e0d4bc,#b8a884)', reg:'2026.2.21', upd:'2026.2.21', rs:20260221, draft:true,
      hist:[], memo:'素材・技法は仮。作家に額装の有無を確認してから仕上げる。' },
    { id:'g11', title:'《無題（習作）》',       author:'佐藤 みなと', awid:'AW-S24-1533', year:'2026年', medium:'', bg:'linear-gradient(155deg,#d8c8b0,#a89878)', reg:'2026.2.9', upd:'2026.2.13', rs:20260209, draft:true,
      hist:[], memo:'技法未定・タイトル仮。作家と展示可否を相談中。' },
    { id:'g1', title:'《静かな水面》',        author:'高橋 信',     awid:'AW-T18-2203', year:'2025年', medium:'キャンバスに油彩', bg:'linear-gradient(155deg,#cfe0e8,#7a9cb0)', reg:'2025.11.4', upd:'2026.2.18', rs:20251104,
      hist:[rec(EXH_NOW,'sale','¥240,000',false,2)], memo:'グループ展の目玉作品。初日から複数の問い合わせあり。現在2件の購入申込あり（取引準備中）。' },
    { id:'g2', title:'《余白のコンポジション》', author:'佐藤 みなと', awid:'AW-S24-1510', year:'2025年', medium:'キャンバスに油彩', bg:'linear-gradient(155deg,#e8e2d4,#b0a888)', reg:'2025.10.20', upd:'2026.2.18', rs:20251020,
      hist:[rec(EXH_NOW,'sale','¥180,000')], memo:'' },
    { id:'g3', title:'《海の記憶》',           author:'佐藤 みなと', awid:'AW-S24-1489', year:'2024年', medium:'アクリル・パネル', bg:'linear-gradient(155deg,#cfe0e8,#7a9cb0)', reg:'2025.6.2', upd:'2025.10.1', rs:20250602,
      hist:[rec(EXH_PAST2,'sale','¥120,000')], memo:'三人の視点展に出品。会期後に一件商談があったが不成立。次回展で再出品予定。' },
    { id:'g4', title:'《朝の気配》',           author:'高橋 信',     awid:'AW-T18-2150', year:'2024年', medium:'キャンバスに油彩', bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', reg:'2025.8.15', upd:'2025.10.5', rs:20250815,
      hist:[rec(EXH_PAST3,'sold','¥150,000',true)], memo:'オンライン・セレクションで販売・取引完了。ご購入者がコレクションルームで公開中。' },
    { id:'g5', title:'《無題（青の連作 I）》',  author:'大野 藍',     awid:'AW-O31-0442', year:'2026年', medium:'ミクストメディア', bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', reg:'2026.1.10', upd:'2026.2.18', rs:20260110,
      hist:[rec(EXH_NOW,'sale','¥200,000')], memo:'' },
    { id:'g6', title:'《無題（青の連作 II）》', author:'大野 藍',     awid:'AW-O31-0443', year:'2026年', medium:'ミクストメディア', bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)', reg:'2026.1.10', upd:'2026.1.10', rs:20260110,
      hist:[], memo:'連作の対。次回展で I とセット展示を検討。' },
    { id:'g7', title:'《庭の記憶》',           author:'高橋 信',     awid:'AW-T18-2098', year:'2023年', medium:'キャンバスに油彩', bg:'linear-gradient(155deg,#d8c8e8,#a888cc)', reg:'2024.9.3', upd:'2025.6.1', rs:20240903,
      hist:[rec(EXH_PAST,'sold','¥160,000')], memo:'冬のグループ展の会場で売約（会場手続き）。' },
    { id:'g8', title:'《光の粒》',             author:'佐藤 みなと', awid:'AW-S24-1402', year:'2023年', medium:'和紙・岩絵具',     bg:'linear-gradient(155deg,#f0d0d0,#c88080)', reg:'2024.7.20', upd:'2024.7.20', rs:20240720,
      hist:[], memo:'' },
  ];

  /* ── DOM ── */
  var listEl      = document.getElementById('p414List');
  var emptyEl     = document.getElementById('p414Empty');
  var authorSel   = document.getElementById('p414FilterAuthor');
  var listedSel   = document.getElementById('p414FilterListed');
  var sortSel     = document.getElementById('p414Sort');
  var draftBanner = document.getElementById('p414DraftBanner');
  var draftCntEl  = document.getElementById('p414DraftCount');
  var tabActive   = document.getElementById('p414TabActive');
  var tabSold     = document.getElementById('p414TabSold');
  var cntActive   = document.getElementById('p414CountActive');
  var cntSold     = document.getElementById('p414CountSold');
  var soldNotice  = document.getElementById('p414SoldNotice');
  var listedWrap  = document.getElementById('p414FilterListedWrap');
  var pagerEl     = document.getElementById('p414Pagination');
  if (!listEl || !authorSel || !listedSel || !sortSel) return;

  var curTab = 'active'; /* 'active' | 'sold' */
  var page = 1;
  var PER_PAGE = 5;

  /* 詳細アコーディオンの開閉状態（再描画をまたいで維持） */
  var openIds = {};

  /* ── 作者フィルタの選択肢を作品の作者から生成 ── */
  var authors = [];
  WORKS.forEach(function (w) { if (authors.indexOf(w.author) === -1) authors.push(w.author); });
  authors.forEach(function (a) {
    var opt = document.createElement('option');
    opt.value = a; opt.textContent = a;
    authorSel.appendChild(opt);
  });

  function isListed(w) {
    return w.hist.some(function (h) { return h.state === 'now'; });
  }

  /* LIAISON+のオンライン取引が完了した作品（所有が購入者へ移転＝出品候補から外れ・レコード凍結で編集不可） */
  function isSoldOnline(w) {
    return w.hist.some(function (h) { return h.sale === 'sold' && h.online; });
  }

  /* 販売中かつ購入申込あり（取引準備中）＝作品の編集を凍結する。申込者は現在の作品内容に対して申し込んでいるため */
  function hasLiveApply(w) {
    return w.hist.some(function (h) { return h.state === 'now' && h.sale === 'sale' && h.queue > 0; });
  }

  /* 下書き＝p6-11 の一時保存で作られた未完成作品（在庫のみ・公開/検索/出品候補に出ない） */
  function isDraft(w) { return !!w.draft; }

  function p611Link(mode, w) {
    return 'kotennavi-p6-11.html?mode=' + mode + '&role=gallery&author=' + encodeURIComponent(authorKey(w.author)) +
      '&work=' + encodeURIComponent(w.id);
  }

  /* 公開作品ページへのリンク先。ギャラリーインベントリーは非公開なので、公開ページを持つのは
     出品中（展覧会の作品ページ LIAISON/LIAISON+）の作品のみ。未出品・取引完了は null（カードクリック無効） */
  function workLink(w) {
    for (var i = 0; i < w.hist.length; i++) {
      if (w.hist[i].state === 'now') return w.hist[i].mode === 'lp' ? 'kotennavi-p6-2.html' : 'kotennavi-p6-1.html';
    }
    return null;
  }

  /* ── アイテム生成（p3-14 と共通の .p314-* 構造＋ギャラリー固有の作者行。公開スイッチは無し）── */
  function makeItem(w) {
    var listed = isListed(w);
    var soldOnline = isSoldOnline(w);
    var liveApply = hasLiveApply(w);
    var draft = isDraft(w);
    /* 削除可否：下書きは破棄可。完成作品は「出品中（ライブ）」「取引完了（凍結・購入者所有）」以外は削除可 */
    var canDelete = draft || (!listed && !soldOnline);
    /* 一覧には下書き/出品中/取引完了/未出品のマークのみ（出品先の展覧会名・出品歴は詳細内） */
    var exhHtml = draft
      ? ''
      : listed
        ? '<span class="p314-item__listed">出品中</span>'
        : soldOnline
          ? '<span class="p314-item__done">売約済（取引完了）</span>'
          : '<span class="p314-item__unlisted">未出品</span>';

    var histHtml = w.hist.length
      ? '<ul class="p314-hist">' + w.hist.map(function (h) {
          var badge = h.mode === 'lp'
            ? '<span class="lb-dot li-plus">LIAISON+</span>'
            : '<span class="lb-dot li">LIAISON</span>';
          var name = h.href
            ? '<a class="p314-hist__name" href="' + h.href + '" target="_blank" rel="noopener">' + h.n + '</a>'
            : '<span class="p314-hist__name">' + h.n + '</span>';
          var state = h.state === 'now'
            ? '<span class="sb sb-live"><span class="pulse"></span>開催中</span>'
            : '<span class="sb sb-closed">終了</span>';
          var hs = STATUS[h.sale];
          /* 終了した記録では進行中の販売状態を出さない（売約済・非売品のみ結果として表示） */
          var showSale = hs && (h.state === 'now' || h.sale === 'sold' || h.sale === 'nonsale');
          var saleHtml = '<span class="p314-hist__sale">' +
            (showSale ? '<span class="aws ' + hs.cls + '">' + hs.label + '</span>' : '') +
            (h.online ? '<span class="p314-hist__online">取引完了</span>' : '') +
            (h.price ? '<span class="p314-hist__price">' + h.price + '</span>' : '') +
            '</span>';
          return '<li class="p314-hist__row">' + badge + name + state +
            '<span class="p314-hist__term">' + h.term + '</span>' + saleHtml + '</li>';
        }).join('') + '</ul>'
      : '<p class="p314-hist-empty">出品歴はありません。</p>';

    var open = !!openIds[w.id];
    var wl = workLink(w);
    var li = document.createElement('li');
    li.className = 'p314-item' + (draft ? ' p314-item--draft' : '');
    li.dataset.id = w.id;
    li.innerHTML =
      (draft ? '<span class="p314-item__ribbon">下書き</span>' : '') +
      '<div class="p314-item__main' + (wl ? ' p314-item__main--link" title="クリックで作品ページを新しいタブで表示' : '') + '">' +
        '<div class="p314-item__thumb" style="background:' + w.bg + '"></div>' +
        '<div class="p314-item__body">' +
          '<div class="p314-item__title-row">' +
            '<span class="cb cb-content cb-artwork">artwork</span>' +
            '<span class="ktn-aw-id">' + w.awid + '</span>' +
          '</div>' +
          '<div class="p314-item__title">' + w.title + '</div>' +
          '<div class="p414-item__author"><span class="p414-item__author-label">作者</span>' +
            '<span class="cb cb-person cb-creator">creator</span>' +
            '<span class="p414-item__author-name">' + w.author + '</span>' +
          '</div>' +
          '<div class="p314-item__meta">' + [w.year, w.medium].filter(Boolean).join('　') + '</div>' +
          '<div class="p314-item__exhs">' + exhHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p314-item__dates">登録 ' + w.reg + '<span class="p314-item__dates-sep">·</span>更新 ' + w.upd + '</div>' +
      /* 下書きの説明は一覧上部のバナー（#p414DraftBanner）に集約。カードは編集再開のみ */
      '<div class="p314-item__actions' + (draft ? ' p314-item__actions--draft' : '') + '">' +
        /* 下書きは出品歴/メモの展開トグルを出さない（完成が先） */
        (draft ? '' : '<button type="button" class="p314-item__toggle" aria-expanded="' + open + '">' + (open ? '出品歴・メモを閉じる ▴' : '出品歴・メモを表示 ▾') + '</button>') +
        /* 削除／下書き破棄（確認モーダルで確定）。出品中＝ライブ・取引完了＝凍結のため出さない */
        (canDelete ? '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p314-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' : '') +
        /* 下書き＝編集の再開のみ（クローンは完成作品向けなので出さない） */
        (draft
          ? '<a class="ktn-action-btn" href="' + p611Link('edit', w) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p611Link('clone', w) + '">クローン →</a>' +
            /* 編集導線を出さない条件：取引完了＝レコード凍結／販売中×申込あり＝申込者が現内容に申込済みのため作品編集を凍結。いずれもクローン・出品は可 */
            (soldOnline || liveApply ? '' : '<a class="ktn-action-btn" href="' + p611Link('edit', w) + '">編集 →</a>')) +
      '</div>' +
      /* 下書きは詳細アコーディオン自体を出さない（ノートは上に常時表示済み） */
      (draft
        ? ''
        : '<div class="p314-item__detail"' + (open ? '' : ' hidden') + '>' +
            (soldOnline
              ? '<div class="p314-done-note">LIAISON+のオンライン取引が完了した作品です。作品はご購入者の所有となるため、LIAISON / LIAISON+ の出品候補からは外れ、作品情報の編集はできません（クローンで複製した作品は新規作品として出品できます）。</div>'
              : '') +
            (liveApply
              ? '<div class="p314-done-note">販売中で購入申込を受け付けている作品です。申込者は現在の作品内容にもとづいて申し込んでいるため、取引が進行する間は作品情報を編集できません（クローンは可）。編集が必要な場合は出品を取り消してから行ってください。</div>'
              : '') +
            '<div class="p314-detail-sec">' +
              '<div class="p314-detail-sec__title">出品歴</div>' +
              histHtml +
            '</div>' +
            '<div class="p314-detail-sec">' +
              '<div class="p314-detail-sec__title">オーナーメモ</div>' +
              '<p class="p314-detail-sec__help">ギャラリーの担当者だけが見られる非公開のメモです（付けた価格の経緯・興味を持った方の記録など）。作品ページには表示されません。</p>' +
              '<textarea class="p314-memo__input" placeholder="この作品についてのメモ（任意）">' + w.memo + '</textarea>' +
              '<div class="p314-memo__foot"><button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--primary p314-memo-save">メモを保存</button></div>' +
            '</div>' +
          '</div>');
    return li;
  }

  /* ── フィルタ・並べ替え描画 ── */
  var SORTS = {
    'reg-desc':  function (a, b) { return b.rs - a.rs; },
    'reg-asc':   function (a, b) { return a.rs - b.rs; },
    'year-desc': function (a, b) { return (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0); },
    'year-asc':  function (a, b) { return (parseInt(a.year, 10) || 0) - (parseInt(b.year, 10) || 0); },
    'author':    function (a, b) { return a.author.localeCompare(b.author, 'ja'); },
    'title':     function (a, b) { return a.title.localeCompare(b.title, 'ja'); },
  };

  function render() {
    var fa = authorSel.value;
    var fl = listedSel.value;
    var sold = curTab === 'sold';
    var rows = WORKS.filter(function (w) {
      /* タブでバケット分割：売約済（取引完了）タブはオンライン取引完了作品のみ、登録済みタブはそれ以外 */
      if (isSoldOnline(w)) { if (!sold) return false; } else { if (sold) return false; }
      if (fa && w.author !== fa) return false;            /* 作者は下書きにも適用（属性であり状況ではない） */
      /* 下書き＝別もの。出品状況で絞り込む時は候補から外す（作者/すべて表示時のみ最上部に固定） */
      if (isDraft(w)) return fl === '';
      if (fl === 'listed' && !isListed(w)) return false;
      if (fl === 'past'   && (isListed(w) || !w.hist.length)) return false;
      if (fl === 'never'  &&  w.hist.length) return false;
      return true;
    });
    rows.sort(SORTS[sortSel.value] || SORTS['reg-desc']);
    rows.sort(function (a, b) { return (isDraft(b) ? 1 : 0) - (isDraft(a) ? 1 : 0); });
    /* 下書き数・ゼロ状態は絞り込み後の全件から算出（ページングで切り出す前） */
    var draftN = rows.filter(isDraft).length;
    if (draftBanner) draftBanner.hidden = draftN === 0;
    if (draftCntEl) draftCntEl.textContent = draftN;
    if (emptyEl) emptyEl.hidden = rows.length !== 0;
    if (listedWrap) listedWrap.hidden = sold; /* 出品状況フィルタは登録済みタブのみ */
    if (soldNotice) soldNotice.hidden = !sold;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = '';
    pageRows.forEach(function (w) { listEl.appendChild(makeItem(w)); });
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }

  /* タブ別のバケット件数（フィルタ非依存の総数） */
  function syncTabCounts() {
    var a = 0, s = 0;
    WORKS.forEach(function (w) {
      if (isSoldOnline(w)) { s++; return; }
      if (isDraft(w)) return; /* 下書きは作品数に含めない */
      a++;
    });
    if (cntActive) cntActive.textContent = a;
    if (cntSold) cntSold.textContent = s;
  }

  function switchTab(tab) {
    if (curTab === tab) return;
    curTab = tab;
    if (tabActive) { tabActive.classList.toggle('is-active', tab === 'active'); tabActive.setAttribute('aria-selected', tab === 'active'); }
    if (tabSold)   { tabSold.classList.toggle('is-active', tab === 'sold');   tabSold.setAttribute('aria-selected', tab === 'sold'); }
    renderReset();
  }

  if (tabActive) tabActive.addEventListener('click', function () { switchTab('active'); });
  if (tabSold)   tabSold.addEventListener('click', function () { switchTab('sold'); });
  authorSel.addEventListener('change', renderReset);
  listedSel.addEventListener('change', renderReset);
  sortSel.addEventListener('change', renderReset);
  syncTabCounts();
  render();

  /* ── 操作（イベント委譲）── */
  function findWork(id) {
    for (var i = 0; i < WORKS.length; i++) if (WORKS[i].id === id) return WORKS[i];
    return null;
  }

  listEl.addEventListener('click', function (e) {
    var item = e.target.closest('.p314-item');
    if (!item) return;
    var w = findWork(item.dataset.id);
    if (!w) return;

    if (e.target.closest('.p314-item__toggle')) {
      openIds[w.id] = !openIds[w.id];
      render();
      return;
    }
    if (e.target.closest('.p314-memo-save')) {
      var ta = item.querySelector('.p314-memo__input');
      if (ta) w.memo = ta.value;
      if (KTN.toast) KTN.toast('オーナーメモを保存しました（デモ）');
      return;
    }
    /* 削除／下書き破棄＝確認モーダルを開いてから確定 */
    if (e.target.closest('.p314-item__del')) {
      openDelModal(w);
      return;
    }
    /* カード（main部）クリック＝作品ページを新しいタブで開く（内側のリンク・ボタンは除外） */
    if (e.target.closest('.p314-item__main--link') && !e.target.closest('a') && !e.target.closest('button')) {
      var wl = workLink(w);
      if (wl) window.open(wl, '_blank');
      return;
    }
  });

  /* ── 削除／下書き破棄モーダル（破壊操作＝confirm を経て実行） ── */
  var delModal   = document.getElementById('p414DelModal');
  var delTitle   = document.getElementById('p414DelTitle');
  var delDesc    = document.getElementById('p414DelDesc');
  var delCancel  = document.getElementById('p414DelCancel');
  var delConfirm = document.getElementById('p414DelConfirm');
  var delBg      = document.getElementById('p414DelBg');
  var pendingDel = null;

  function openDelModal(w) {
    if (!delModal) return;
    pendingDel = w.id;
    var draft = isDraft(w);
    if (delTitle) delTitle.textContent = draft ? '下書きを破棄しますか？' : '作品を削除しますか？';
    if (delDesc) delDesc.innerHTML = '<span class="p314-del-modal__name">' + w.title + '</span>' +
      (draft
        ? 'この下書きを完全に破棄します。入力済みの内容は復元できません。'
        : 'この作品をインベントリーから完全に削除します。過去の出品記録・オーナーメモも失われ、復元できません。');
    if (delConfirm) delConfirm.textContent = draft ? '破棄する' : '削除する';
    delModal.hidden = false;
  }
  function closeDelModal() {
    if (!delModal) return;
    delModal.hidden = true;
    pendingDel = null;
  }
  if (delCancel) delCancel.addEventListener('click', closeDelModal);
  if (delBg)     delBg.addEventListener('click', closeDelModal);
  if (delConfirm) delConfirm.addEventListener('click', function () {
    if (!pendingDel) return;
    var wasDraft = false;
    for (var i = 0; i < WORKS.length; i++) {
      if (WORKS[i].id === pendingDel) { wasDraft = isDraft(WORKS[i]); WORKS.splice(i, 1); break; }
    }
    delete openIds[pendingDel];
    closeDelModal();
    syncTabCounts();
    render();
    if (KTN.toast) KTN.toast(wasDraft ? '下書きを破棄しました（デモ）' : '作品を削除しました（デモ）');
  });

  /* ── 新規作品：作者ピッカー（検索付きオートコンプリート）──
     取扱クリエイター＝このギャラリーが展覧会に出展させた登録済みクリエイターの和集合。
     出展歴が数百人規模になり得るため、フラットリストでなく「検索＋最近/よく使う」方式にする：
     ・未入力時＝最近作成・よく出品する作者（fav）だけを既定表示
     ・入力時＝母集団全体を氏名/よみがなでインクリメンタル絞り込み
     選択で p6-11 へ作者固定・gallery ロールで遷移。母集団はデモ固定（本番はサーバー検索API）。
     インベントリー作者（高橋/佐藤/大野）は現在在庫があるため fav（最近）扱い。 */
  /* 同姓同名（同一漢字・同一よみ）が起こり得るため、名前・よみがなだけでは特定できない。
     各候補に拠点・ジャンルのメタ＋クリエイターページへの「確認」リンク（別タブ）を付け、
     ギャラリーが本人かを確かめてから選択できるようにする（mori1/mori2＝同名デモ）。 */
  var POOL = [
    { key:'takahashi', name:'高橋 信',   kana:'たかはししん',   hub:'東京',   genre:'油彩',           fav:true },
    { key:'sato',      name:'佐藤 みなと', kana:'さとうみなと',   hub:'神奈川', genre:'油彩',           fav:true },
    { key:'ohno',      name:'大野 藍',   kana:'おおのあい',     hub:'東京',   genre:'ミクストメディア', fav:true },
    { key:'suzuki',    name:'鈴木 洋',   kana:'すずきひろし',   hub:'千葉',   genre:'現代美術',       fav:true },
    { key:'ito',       name:'伊藤 かえで', kana:'いとうかえで',   hub:'東京',   genre:'日本画',         fav:true },
    { key:'tanaka',    name:'田中 透',   kana:'たなかとおる',   hub:'東京',   genre:'油彩' },
    { key:'yamamoto',  name:'山本 詩織', kana:'やまもとしおり', hub:'大阪',   genre:'版画' },
    { key:'nakamura',  name:'中村 圭',   kana:'なかむらけい',   hub:'愛知',   genre:'彫刻' },
    { key:'kobayashi', name:'小林 千夏', kana:'こばやしちなつ', hub:'東京',   genre:'写真' },
    { key:'watanabe',  name:'渡辺 陽',   kana:'わたなべよう',   hub:'福岡',   genre:'現代美術' },
    { key:'matsumoto', name:'松本 玲',   kana:'まつもとれい',   hub:'京都',   genre:'日本画' },
    { key:'hayashi',   name:'林 青磁',   kana:'はやしせいじ',   hub:'東京',   genre:'陶芸' },
    { key:'kimura',    name:'木村 悠',   kana:'きむらゆう',     hub:'神奈川', genre:'油彩' },
    { key:'shimizu',   name:'清水 奈々', kana:'しみずなな',     hub:'兵庫',   genre:'イラスト' },
    { key:'morita',    name:'森田 岳',   kana:'もりたがく',     hub:'東京',   genre:'油彩' },
    /* 同姓同名デモ：氏名・よみが完全一致。拠点・ジャンル＋確認リンクで見分ける */
    { key:'mori1',     name:'森 陽介',   kana:'もりようすけ',   hub:'東京',   genre:'油彩' },
    { key:'mori2',     name:'森 陽介',   kana:'もりようすけ',   hub:'京都',   genre:'日本画' },
    { key:'fujita',    name:'藤田 美咲', kana:'ふじたみさき',   hub:'東京',   genre:'現代美術' },
  ];

  var newBtn      = document.getElementById('p414NewBtn');
  var picker      = document.getElementById('p414Picker');
  var pickerBg    = document.getElementById('p414PickerBg');
  var pickerClose = document.getElementById('p414PickerClose');
  var pickerList  = document.getElementById('p414PickerList');
  var pickerSearch= document.getElementById('p414PickerSearch');
  var pickerHint  = document.getElementById('p414PickerHint');
  var pickerEmpty = document.getElementById('p414PickerEmpty');

  if (newBtn && picker && pickerList) {
    if (POOL.length === 0) {
      /* 取扱クリエイターが居ない＝まず展覧会を作り出展クリエイターを確定する必要がある */
      newBtn.disabled = true;
      newBtn.title = '取扱クリエイターがいません。先に展覧会を作成し、出展クリエイターを確定してください。';
    } else {
      var normalize = function (s) { return (s || '').toLowerCase().replace(/[\s　]+/g, ''); };
      var optHtml = function (a) {
        var meta = [a.kana, a.hub, a.genre].filter(Boolean).join(' · ');
        return '<div class="p414-picker__opt" data-key="'+a.key+'">'+
          '<span class="p414-picker__opt-avatar">'+a.name.charAt(0)+'</span>'+
          '<span class="p414-picker__opt-info">'+
            '<span class="p414-picker__opt-name">'+a.name+'</span>'+
            '<span class="p414-picker__opt-meta">'+meta+'</span>'+
          '</span>'+
          '<a class="p414-picker__opt-verify" href="kotennavi-p3.html?c='+encodeURIComponent(a.key)+'" target="_blank" rel="noopener">確認 ↗</a>'+
          '<button type="button" class="p414-picker__opt-select ktn-op-btn ktn-op-btn--sm">選択 →</button>'+
          '</div>';
      };
      var renderPickerList = function (q) {
        var query = normalize(q);
        var rows, hint;
        if (!query) {
          rows = POOL.filter(function (a) { return a.fav; });
          hint = '最近・よく出品する作者';
        } else {
          rows = POOL.filter(function (a) {
            return normalize(a.name).indexOf(query) !== -1 || (a.kana || '').indexOf(query) !== -1;
          });
          hint = '検索結果 ' + rows.length + '件';
        }
        if (pickerHint) pickerHint.textContent = hint;
        pickerList.innerHTML = rows.map(optHtml).join('');
        if (pickerEmpty) pickerEmpty.hidden = rows.length !== 0;
      };

      var openPicker = function () {
        picker.hidden = false;
        if (pickerSearch) pickerSearch.value = '';
        renderPickerList('');
        if (pickerSearch) pickerSearch.focus();
      };
      var closePicker = function () { picker.hidden = true; };

      newBtn.addEventListener('click', openPicker);
      if (pickerBg)     pickerBg.addEventListener('click', closePicker);
      if (pickerClose)  pickerClose.addEventListener('click', closePicker);
      if (pickerSearch) pickerSearch.addEventListener('input', function () { renderPickerList(pickerSearch.value); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !picker.hidden) closePicker(); });
      pickerList.addEventListener('click', function (e) {
        /* 「確認 ↗」は別タブでクリエイターページを開くだけ（既定動作に任せる） */
        if (e.target.closest('.p414-picker__opt-verify')) return;
        /* 「選択 →」でのみ p6-11 へ遷移（誤操作で作成に進まないようボタン限定） */
        if (!e.target.closest('.p414-picker__opt-select')) return;
        var opt = e.target.closest('.p414-picker__opt');
        if (!opt) return;
        location.href = 'kotennavi-p6-11.html?mode=new&role=gallery&author=' + encodeURIComponent(opt.dataset.key);
      });
      renderPickerList('');
    }
  }

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P4-15  LIAISON+コンソール（ギャラリー版）
════════════════════════════════════════════════════ */
KTN.pages['p4-15'] = function () {

  // 0. ページスコープ・アクセントカラー
  document.body.classList.add('p4-page');
  document.body.style.setProperty('--page-accent',        '#8b5e3c');
  document.body.style.setProperty('--page-accent-bg',     'rgba(139,94,60,.1)');
  document.body.style.setProperty('--page-accent-border', '#b07840');

  var d = window.P4_DATA || {};
  if (typeof applyHeadImageMode === 'function') applyHeadImageMode(d.hasImage !== false);

  // 1. タブナビ（p4-tabnav）：クリックで各サブページへ
  document.querySelectorAll('.p4-tabnav__item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.dataset.tab === 'exhibitions') {
        window.location.href = 'kotennavi-p4-1.html';
      } else if (btn.dataset.tab === 'articles') {
        window.location.href = 'kotennavi-p4-2.html';
      } else if (btn.dataset.target) {
        window.location.href = 'kotennavi-p4.html#' + btn.dataset.target;
      }
    });
  });

  // 2. 管理ドロワー
  var drawer = document.getElementById('p415Drawer');
  var mgmtBtn = document.getElementById('p415MgmtBtn');
  var drawerClose = document.getElementById('p415DrawerClose');
  var drawerOverlay = document.getElementById('p415DrawerOverlay');
  function openDrawer() { if (drawer) drawer.classList.add('is-open'); }
  function closeDrawer() { if (drawer) drawer.classList.remove('is-open'); }
  if (mgmtBtn) mgmtBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

  // 3. スクロール連動スタイル
  var header = document.getElementById('ktnHeader');
  var hero = document.querySelector('.p3-head');
  if (header && hero) {
    var observer = new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: '-50px 0px 0px 0px' });
    observer.observe(hero);
  }

  // 4. コンソール内2タブ切替（FAQ＝「期間中展覧会」タブのみ表示。終了した展覧会/購入者一覧では不要）
  var tabBtns = document.querySelectorAll('.p315-tab-btn');
  var tabPanels = document.querySelectorAll('.p315-tab-panel');
  var faqSection = document.querySelector('.p315-faq');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      tabPanels.forEach(function (p) { p.hidden = true; });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      var panel = document.getElementById(btn.dataset.panel);
      if (panel) panel.hidden = false;
      if (faqSection) faqSection.hidden = btn.dataset.panel !== 'p315-panel-active';
    });
  });

  // 5. 会場売約済モーダル
  var venueModal = document.getElementById('p415VenueModal');
  var venueModalBg = document.getElementById('p415VenueModalBg');
  var venueModalCancel = document.getElementById('p415VenueModalCancel');
  var venueModalOk = document.getElementById('p415VenueModalOk');
  var venueModalBody = document.getElementById('p415VenueModalBody');
  var venueModalCheckWrap = document.getElementById('p415VenueModalCheckWrap');
  var venueModalCheckbox = document.getElementById('p415VenueModalCheckbox');
  var _venueItem = null;

  document.querySelectorAll('.p315-venue-btn:not(:disabled)').forEach(function (btn) {
    btn.addEventListener('click', function () {
      _venueItem = btn.closest('.p315-witem');
      var workName = btn.dataset.work || '作品';
      var count = parseInt(btn.dataset.count || '0', 10);
      if (venueModalBody) {
        venueModalBody.innerHTML = '「' + workName + '」を「売約済」に変更します。<br>' +
          (count > 0 ? '申込中の <strong>' + count + '名</strong> 全員にキャンセル通知（メール）が送信されます。<br>' : '') +
          'この操作は取り消せません。';
      }
      var needCheck = count > 0;
      if (venueModalCheckWrap) venueModalCheckWrap.hidden = !needCheck;
      if (venueModalCheckbox) venueModalCheckbox.checked = false;
      if (venueModalOk) venueModalOk.disabled = needCheck;
      if (venueModal) venueModal.hidden = false;
    });
  });
  if (venueModalCheckbox) {
    venueModalCheckbox.addEventListener('change', function () {
      if (venueModalOk) venueModalOk.disabled = !venueModalCheckbox.checked;
    });
  }
  function closeVenueModal() { if (venueModal) venueModal.hidden = true; }
  if (venueModalCancel) venueModalCancel.addEventListener('click', closeVenueModal);
  if (venueModalBg) venueModalBg.addEventListener('click', closeVenueModal);
  if (venueModalOk) {
    venueModalOk.addEventListener('click', function () {
      closeVenueModal();
      if (_venueItem) {
        var opsEl = _venueItem.querySelector('.p315-witem__ops');
        if (opsEl) opsEl.style.display = 'none';
      }
      KTN.toast('会場売約済に変更しました。申込者にキャンセル通知を送信しました');
    });
  }

  // 6. 出品取消モーダル
  var takedownModal = document.getElementById('p415TakedownModal');
  var takedownModalBg = document.getElementById('p415TakedownModalBg');
  var takedownModalCancel = document.getElementById('p415TakedownModalCancel');
  var takedownModalOk = document.getElementById('p415TakedownModalOk');
  var takedownModalBody = document.getElementById('p415TakedownModalBody');
  var takedownModalCheckWrap = document.getElementById('p415TakedownModalCheckWrap');
  var takedownModalCheckbox = document.getElementById('p415TakedownModalCheckbox');
  var takedownModalCheckbox2 = document.getElementById('p415TakedownModalCheckbox2');
  var _takedownItem = null;

  function _updateTakedownOk() {
    if (!takedownModalOk) return;
    var c1 = takedownModalCheckWrap && !takedownModalCheckWrap.hidden ? (takedownModalCheckbox && takedownModalCheckbox.checked) : true;
    var c2 = takedownModalCheckbox2 ? takedownModalCheckbox2.checked : true;
    takedownModalOk.disabled = !(c1 && c2);
  }

  document.querySelectorAll('.p315-takedown-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      _takedownItem = btn.closest('.p315-witem');
      var workName = btn.dataset.work || '作品';
      var count = parseInt(btn.dataset.count || '0', 10);
      if (takedownModalBody) {
        takedownModalBody.innerHTML = '「' + workName + '」の LIAISON+ 出品を取り消します。<br>' +
          (count > 0 ? '申込中の <strong>' + count + '名</strong> 全員にキャンセル通知（メール）が送信されます。<br>' : '') +
          'この操作は取り消せません。';
      }
      if (takedownModalCheckWrap) takedownModalCheckWrap.hidden = count === 0;
      if (takedownModalCheckbox) takedownModalCheckbox.checked = false;
      if (takedownModalCheckbox2) takedownModalCheckbox2.checked = false;
      _updateTakedownOk();
      if (takedownModal) takedownModal.hidden = false;
    });
  });
  if (takedownModalCheckbox) takedownModalCheckbox.addEventListener('change', _updateTakedownOk);
  if (takedownModalCheckbox2) takedownModalCheckbox2.addEventListener('change', _updateTakedownOk);
  function closeTakedownModal() { if (takedownModal) takedownModal.hidden = true; }
  if (takedownModalCancel) takedownModalCancel.addEventListener('click', closeTakedownModal);
  if (takedownModalBg) takedownModalBg.addEventListener('click', closeTakedownModal);
  if (takedownModalOk) {
    takedownModalOk.addEventListener('click', function () {
      closeTakedownModal();
      if (_takedownItem) _takedownItem.style.display = 'none';
      KTN.toast('出品取消を実行しました。申込者へキャンセル通知を送信しました');
    });
  }

  // 7. 購入者一覧タブ：列ソート（デスクトップ＝列見出しボタン／モバイル＝カード化でthead非表示のため代替セレクトで操作）
  (function () {
    var table = document.getElementById('p415BuyersTable');
    if (!table) return;
    var tbody = table.querySelector('tbody');
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
    var btns = table.querySelectorAll('.p315-buyers-sort-btn');
    var sel = document.getElementById('p415BuyersSortSel');
    var curKey = null, curDir = 1;

    function sortRows(key, dir) {
      var isNum = (key === 'price' || key === 'status');
      rows.sort(function (a, b) {
        var av = a.dataset[key], bv = b.dataset[key];
        if (isNum) { return (parseFloat(av) - parseFloat(bv)) * dir; }
        return av.localeCompare(bv, 'ja') * dir;
      });
      rows.forEach(function (r) { tbody.appendChild(r); });
    }

    function applySort(key, dir) {
      curKey = key; curDir = dir;
      btns.forEach(function (b) { b.classList.remove('is-active', 'is-desc'); });
      var matchBtn = table.querySelector('.p315-buyers-sort-btn[data-sort="' + key + '"]');
      if (matchBtn) {
        matchBtn.classList.add('is-active');
        if (dir === -1) matchBtn.classList.add('is-desc');
      }
      if (sel) sel.value = key + ':' + (dir === -1 ? 'desc' : 'asc');
      sortRows(key, dir);
    }

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.sort;
        var dir = (curKey === key) ? curDir * -1 : 1;
        applySort(key, dir);
      });
    });

    if (sel) {
      sel.addEventListener('change', function () {
        var parts = sel.value.split(':');
        applySort(parts[0], parts[1] === 'desc' ? -1 : 1);
      });
    }
  })();

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P3-16  取引デスク（creator）
════════════════════════════════════════════════════ */
KTN.pages['p3-16'] = function () {

  document.body.classList.add('p3-page');
  document.body.style.setProperty('--page-accent',        '#2a5f7a');
  document.body.style.setProperty('--page-accent-bg',     'rgba(42,95,122,.1)');
  document.body.style.setProperty('--page-accent-border', '#5a8fa8');

  var d = window.P3_DATA || {};
  if (typeof applyHeadImageMode === 'function') applyHeadImageMode(d.hasImage !== false);
  var activeBadge = document.getElementById('p3HeadActiveBadge');
  if (activeBadge && d.hasActiveExhibition) activeBadge.removeAttribute('hidden');

  document.querySelectorAll('.p3-tabnav__item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.dataset.tab === 'exhibitions') {
        window.location.href = 'kotennavi-p3-1.html';
      } else if (btn.dataset.tab === 'works') {
        window.location.href = 'kotennavi-p3-3.html';
      } else if (btn.dataset.tab === 'articles') {
        window.location.href = 'kotennavi-p3-2.html';
      } else if (btn.dataset.target) {
        window.location.href = 'kotennavi-p3.html#' + btn.dataset.target;
      }
    });
  });

  _initTxnCommentAttach();

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P4-16  取引デスク（gallery）
════════════════════════════════════════════════════ */
KTN.pages['p4-16'] = function () {

  document.body.classList.add('p4-page');
  document.body.style.setProperty('--page-accent',        '#8b5e3c');
  document.body.style.setProperty('--page-accent-bg',     'rgba(139,94,60,.1)');
  document.body.style.setProperty('--page-accent-border', '#b07a50');

  var d = window.P4_DATA || {};
  if (typeof applyHeadImageMode === 'function') applyHeadImageMode(d.hasImage !== false);

  document.querySelectorAll('.p3-tabnav__item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.dataset.tab === 'exhibitions') {
        window.location.href = 'kotennavi-p4-1.html';
      } else if (btn.dataset.tab === 'articles') {
        window.location.href = 'kotennavi-p4-2.html';
      } else if (btn.dataset.target) {
        window.location.href = 'kotennavi-p4.html#' + btn.dataset.target;
      }
    });
  });

  _initTxnCommentAttach();

  window.ktnRender = function () {};
};

/* 非人系（コンテンツ）strip のオーナー表示をロール別に populate する共通ヘルパー。
   idBase='p211Owner'→#p211OwnerBadge/#p211OwnerName を対象。role で creator/gallery を切替 */
KTN.MGMT_OWNER = {
  creator: { cls: 'cb-creator', label: 'creator', name: '田中 透',          href: 'kotennavi-p3.html' },
  gallery: { cls: 'cb-gallery', label: 'gallery', name: 'Gallery SOIL 渋谷', href: 'kotennavi-p4.html' }
};
KTN.syncMgmtOwner = function (idBase, role) {
  const o = KTN.MGMT_OWNER[role] || KTN.MGMT_OWNER.creator;
  const badge = document.getElementById(idBase + 'Badge');
  if (badge) { badge.className = 'cb cb-person ' + o.cls; badge.textContent = o.label; }
  const name = document.getElementById(idBase + 'Name');
  if (name) { name.textContent = o.name; name.href = o.href; }
};

/* 手動送信メールの送信元アドレス（P90-9で選択・設定 → P90-2-1/P90-11-1の送信パネルに反映される単一ソース） */
KTN.MAIL_FROM_ADDRESSES = [
  'info@koten-navi.com', 'register@koten-navi.com', 'inquiry@koten-navi.com',
  'add-event@koten-navi.com', 'comment@koten-navi.com', 'contact@koten-navi.com',
  'improper@koten-navi.com', 'monitor@koten-navi.com', 'liaison@koten-navi.com'
];
KTN.mailFromOptionsHtml = function (selected) {
  return KTN.MAIL_FROM_ADDRESSES.map(function (addr) {
    return '<option value="' + addr + '"' + (addr === selected ? ' selected' : '') + '>' + addr + '</option>';
  }).join('');
};

/* ════════════════════════════════════════════════════
   P2-11  展覧会 新規投稿・編集・クローン
════════════════════════════════════════════════════ */
/* サブ画像リストのドラッグ並べ替え（p2-11 / p6-11 共通・ハンドル起点） */
KTN.initImgReorder = function (list) {
  if (!list || list.dataset.reorderBound) return;
  list.dataset.reorderBound = '1';
  var dragEl = null;

  list.addEventListener('dragstart', function (e) {
    var handle = e.target.closest('.p211-img-uploaded__handle');
    if (!handle || !list.contains(handle)) { e.preventDefault(); return; }
    dragEl = handle.closest('.p211-img-uploaded');
    if (!dragEl) return;
    dragEl.classList.add('is-dragging');
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      try { e.dataTransfer.setData('text/plain', ''); } catch (err) {}
      if (e.dataTransfer.setDragImage) e.dataTransfer.setDragImage(dragEl, 16, 16);
    }
  });

  list.addEventListener('dragover', function (e) {
    if (!dragEl) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    var over = e.target.closest('.p211-img-uploaded');
    if (!over || over === dragEl || !list.contains(over)) return;
    var rect = over.getBoundingClientRect();
    var after = (e.clientY - rect.top) > rect.height / 2;
    list.insertBefore(dragEl, after ? over.nextSibling : over);
  });

  list.addEventListener('drop', function (e) { e.preventDefault(); });

  list.addEventListener('dragend', function () {
    if (dragEl) dragEl.classList.remove('is-dragging');
    dragEl = null;
  });
};

KTN.pages['p2-11'] = function () {
  function syncMgmtBar() {
    const r = window.ktnState && window.ktnState.role || 'gallery';
    document.body.classList.remove('p3-page', 'p4-page', 'p5-page');
    if (r === 'creator')      document.body.classList.add('p3-page');
    else if (r === 'gallery') document.body.classList.add('p4-page');
    // オーナーは仮にギャラリー（YUGEN Gallery）固定＝HTML直書き。ロール切替では変えない
    // 開催場所のロール別 default・ヘルプはページ内スクリプトが担当（未定義なら no-op）
    if (typeof window.p211RoleSync === 'function') window.p211RoleSync();
  }
  syncMgmtBar();
  KTN.initImgReorder(document.getElementById('p211SubList'));
  var _prevRender = window.ktnRender;
  window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); syncMgmtBar(); };
};

/* ════════════════════════════════════════════════════
   P5-11/12/13  アカウント管理
════════════════════════════════════════════════════ */
(function () {
  function p5AcctPage(pageId) {
    return function () {
      document.body.classList.add('p5-page', pageId + '-page');
      document.body.style.setProperty('--page-accent',        '#b8608c');
      document.body.style.setProperty('--page-accent-bg',     'rgba(184,96,140,.1)');
      document.body.style.setProperty('--page-accent-border', '#c97aaa');
      function applyRole() {
        var role = window.curRole || 'guest';
        var canView = (role === 'user+' || role === 'admin');
        var wrap = document.querySelector('.' + pageId.replace('-','') + '-wrap');
        if (wrap) wrap.style.display = canView ? '' : 'none';
      }
      var _prevRender = window.ktnRender;
      window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); applyRole(); };
      applyRole();
    };
  }
  KTN.pages['p5-11'] = p5AcctPage('p5-11');
  KTN.pages['p5-12'] = p5AcctPage('p5-12');
  KTN.pages['p5-13'] = p5AcctPage('p5-13');
}());

/* ════════════════════════════════════════════════════
   P11-4  リエゾンプラス機能申込
════════════════════════════════════════════════════ */
KTN.pages['p11-4'] = function () {
  // 申込アカウント（申込者）のロール別デモ表示名。中立化のためロールバー/ロール色は付けず、
  // creator/gallery の違いは申込アカウント名＋フォーム内容（ロール通知・専用セクション）で表現。
  const ACC = {
    creator: '田中 透 <small>1997sakura2022@gmail.com</small>',
    gallery: 'Gallery SOIL 渋谷 <small>1997sakura2022@gmail.com</small>'
  };
  function syncApplicant() {
    const r = (window.ktnState && window.ktnState.role) || 'creator';
    const el = document.getElementById('p114ApplicantName');
    if (el) el.innerHTML = ACC[r] || ACC.creator;
  }
  syncApplicant();
  // KTN.init が設定したヘッダー描画フックを保持し、ロール変更時にヘッダー＋申込アカウントを再同期
  const prevRender = window.ktnRender;
  window.ktnRender = function () {
    if (typeof prevRender === 'function') prevRender();
    syncApplicant();
  };
};

/* ════════════════════════════════════════════════════
   P6-11  作品 新規投稿・編集・クローン
════════════════════════════════════════════════════ */
KTN.pages['p6-11'] = function () {
  function syncMgmtBar() {
    const r = window.ktnState && window.ktnState.role || 'creator';
    document.body.classList.remove('p3-page', 'p4-page', 'p5-page');
    if (r === 'gallery')      document.body.classList.add('p4-page');
    else                      document.body.classList.add('p3-page');
    KTN.syncMgmtOwner('p611Owner', r === 'gallery' ? 'gallery' : 'creator');
    if (typeof window.p611RoleSync === 'function') window.p611RoleSync();
  }
  syncMgmtBar();
  KTN.initImgReorder(document.getElementById('p611SubList'));
  var _prevRender = window.ktnRender;
  window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); syncMgmtBar(); };
};

/* ════════════════════════════════════════════════════
   P6-12  作品-インサイト
════════════════════════════════════════════════════ */
KTN.pages['p6-12'] = function () {
  function syncMgmtBar() {
    const r = window.ktnState && window.ktnState.role || 'creator';
    document.body.classList.remove('p3-page', 'p4-page', 'p5-page');
    if (r === 'gallery')      document.body.classList.add('p4-page');
    else                      document.body.classList.add('p3-page');
    KTN.syncMgmtOwner('p612Owner', r === 'gallery' ? 'gallery' : 'creator');
  }
  syncMgmtBar();

  var periodBox = document.getElementById('p612Period');
  if (periodBox) {
    periodBox.querySelectorAll('.ins-period__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        periodBox.querySelectorAll('.ins-period__btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        if (typeof showToast === 'function') showToast('期間を変更しました（デモ）');
      });
    });
  }

  var _prevRender = window.ktnRender;
  window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); syncMgmtBar(); };
};

/* ════════════════════════════════════════════════════
   P7-11  記事 新規投稿・編集・クローン
════════════════════════════════════════════════════ */
KTN.pages['p7-11'] = function () {
  function syncMgmtBar() {
    const r = window.ktnState && window.ktnState.role || 'creator';
    document.body.classList.remove('p3-page', 'p4-page', 'p5-page');
    if (r === 'gallery')      document.body.classList.add('p4-page');
    else                      document.body.classList.add('p3-page');
    KTN.syncMgmtOwner('p711Owner', r === 'gallery' ? 'gallery' : 'creator');
    if (typeof window.p711RoleSync === 'function') window.p711RoleSync();
  }
  syncMgmtBar();
  var _prevRender = window.ktnRender;
  window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); syncMgmtBar(); };
};

/* ════════════════════════════════════════════════════
   P3-19  記事管理（クリエイター版）
   ── p2-13(展覧会)/p4-19(ギャラリー)/p6-15(作品) と対になる記事一覧管理。
   　　作品・展覧会・クリエイターページ・ギャラリーページの4か所いずれかで
   　　作成した記事を1画面に集約。掲載先は作成元で自動確定・変更不可のため
   　　p3-14と違い出品歴タブ・公開/非公開スイッチ・詳細アコーディオンは無い。
   　　デモデータの一部は p7-11 の P711_ENTRY と同一記事（同一ID/日付）。
════════════════════════════════════════════════════ */
KTN.pages['p3-19'] = function () {

  /* ── 記事種別マスタ（.at-a〜.at-f） ── */
  var TYPE = {
    a: { label:'レポート',     cls:'at-a' },
    b: { label:'インタビュー', cls:'at-b' },
    c: { label:'制作日記',     cls:'at-c' },
    d: { label:'お知らせ',     cls:'at-d' },
    e: { label:'ワークショップ', cls:'at-e' },
    f: { label:'その他',       cls:'at-f' },
  };

  /* ── サンプルデータ（田中透の記事。P711_ENTRY と同一記事を含む）──
     dest＝掲載先種別（artwork/exhibition/standalone）。作成元で自動確定・以後変更不可。
     destName/destHref＝掲載先の作品/展覧会名とリンク（standaloneはクリエイターページ自身のため無し）。
     reg/upd＝登録日・最終更新日。rs＝登録日の並べ替えキー。draft＝下書き（未完成・非公開・一覧の最上部固定）。 */
  var ARTICLES = [
    { id:'t3', title:'田中透インタビュー：言語と絵画のあいだで', type:'b',
      dest:'standalone', destLabel:'クリエイターページ', destName:'', destHref:'',
      reg:'2025.11.15', upd:'2025.11.20', rs:20251115, draft:false, bg:'linear-gradient(155deg,#d8c8e8,#a888cc)' },
    { id:'t1', title:'オノマトペの庭 制作について', type:'c',
      dest:'artwork', destLabel:'作品', destName:'《オノマトペの庭》', destHref:'kotennavi-p6.html',
      reg:'2026.3.2', upd:'2026.3.5', rs:20260302, draft:false, bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)' },
    { id:'t2', title:'展評：あなたが知らないオノマトペ 会場レポート', type:'a',
      dest:'exhibition', destLabel:'展覧会', destName:'あなたが知らないオノマトペ', destHref:'kotennavi-p2.html',
      reg:'2026.3.7', upd:'2026.3.10', rs:20260307, draft:false, bg:'linear-gradient(155deg,#e0d4bc,#b8a884)' },
    { id:'t4', title:'個展「あなたが知らないオノマトペ」開催のお知らせ', type:'d',
      dest:'exhibition', destLabel:'展覧会', destName:'あなたが知らないオノマトペ', destHref:'kotennavi-p2.html',
      reg:'2026.1.20', upd:'2026.1.20', rs:20260120, draft:false, bg:'linear-gradient(155deg,#f0e8d0,#d4b896)' },
    { id:'t5', title:'会場ワークショップ「ことばと絵の即興対話」参加者募集', type:'e',
      dest:'exhibition', destLabel:'展覧会', destName:'あなたが知らないオノマトペ', destHref:'kotennavi-p2.html',
      reg:'2026.1.25', upd:'2026.2.1', rs:20260125, draft:false, bg:'linear-gradient(155deg,#f0d0d0,#c88080)' },
    { id:'t6', title:'よくいただく質問と、その周辺のこと', type:'f',
      dest:'standalone', destLabel:'クリエイターページ', destName:'', destHref:'',
      reg:'2024.9.10', upd:'2024.9.10', rs:20240910, draft:false, bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)' },
    { id:'t7', title:'《かさかさ》ができるまで（仮）', type:'c',
      dest:'artwork', destLabel:'作品', destName:'《かさかさ》', destHref:'kotennavi-p6.html',
      reg:'2026.3.12', upd:'2026.3.12', rs:20260312, draft:true, bg:'linear-gradient(155deg,#e0d4bc,#b8a884)' },
  ];

  /* ── DOM ── */
  var listEl      = document.getElementById('p319List');
  var emptyEl     = document.getElementById('p319Empty');
  var typeSel     = document.getElementById('p319FilterType');
  var destSel     = document.getElementById('p319FilterDest');
  var sortSel     = document.getElementById('p319Sort');
  var draftBanner = document.getElementById('p319DraftBanner');
  var draftCntEl  = document.getElementById('p319DraftCount');
  var pagerEl     = document.getElementById('p319Pagination');
  if (!listEl || !typeSel || !destSel || !sortSel) return;

  var page = 1;
  var PER_PAGE = 5;

  function isDraft(a) { return !!a.draft; }

  function p711Link(mode, id) {
    return 'kotennavi-p7-11.html?mode=' + mode + '&author=tanaka&self=1&article=' + encodeURIComponent(id);
  }

  /* 公開記事ページへのリンク先。下書きは公開ページが存在しないため null */
  function articleLink(a) {
    return isDraft(a) ? null : 'kotennavi-p7.html';
  }

  /* ── アイテム生成 ── */
  function makeItem(a) {
    var draft = isDraft(a);
    var t = TYPE[a.type] || TYPE.f;
    var al = articleLink(a);
    var destHtml = a.dest === 'standalone'
      ? '<span class="p319-item__dest-name">' + a.destLabel + '</span>'
      : '<span class="cb cb-content cb-' + a.dest + '">' + a.destLabel + '</span>' +
        (a.destHref
          ? '<a class="p319-item__dest-name" href="' + a.destHref + '" target="_blank" rel="noopener">' + a.destName + '</a>'
          : '<span class="p319-item__dest-name">' + a.destName + '</span>');

    var li = document.createElement('li');
    li.className = 'p319-item' + (draft ? ' p319-item--draft' : '');
    li.dataset.id = a.id;
    li.innerHTML =
      (draft ? '<span class="p319-item__ribbon">下書き</span>' : '') +
      '<div class="p319-item__main' + (al ? ' p319-item__main--link" title="クリックで記事ページを新しいタブで表示' : '') + '">' +
        '<div class="p319-item__thumb" style="background:' + a.bg + '"></div>' +
        '<div class="p319-item__body">' +
          '<div class="p319-item__title-row">' +
            '<span class="cb cb-content cb-article">article</span>' +
            '<span class="at ' + t.cls + '">' + t.label + '</span>' +
          '</div>' +
          '<div class="p319-item__title">' + a.title + '</div>' +
          '<div class="p319-item__dest">掲載先：' + destHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p319-item__dates">登録 ' + a.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + a.upd + '</div>' +
      '<div class="p319-item__actions">' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' +
        (draft
          ? '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p711Link('clone', a.id) + '">クローン →</a>' +
            '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集 →</a>') +
      '</div>';
    return li;
  }

  /* ── フィルタ・並べ替え描画 ── */
  var SORTS = {
    'reg-desc': function (a, b) { return b.rs - a.rs; },
    'reg-asc':  function (a, b) { return a.rs - b.rs; },
    'title':    function (a, b) { return a.title.localeCompare(b.title, 'ja'); },
  };

  function render() {
    var ft = typeSel.value;
    var fd = destSel.value;
    var rows = ARTICLES.filter(function (a) {
      /* 下書き＝別もの。種別・掲載先で絞り込む時は候補から外す（「すべて」表示時のみ最上部に固定） */
      if (isDraft(a)) return ft === '' && fd === '';
      if (ft && a.type !== ft) return false;
      if (fd && a.dest !== fd) return false;
      return true;
    });
    rows.sort(SORTS[sortSel.value] || SORTS['reg-desc']);
    rows.sort(function (a, b) { return (isDraft(b) ? 1 : 0) - (isDraft(a) ? 1 : 0); });
    /* 下書き数・ゼロ状態は絞り込み後の全件から算出（ページングで切り出す前） */
    var draftN = rows.filter(isDraft).length;
    if (draftBanner) draftBanner.hidden = draftN === 0;
    if (draftCntEl) draftCntEl.textContent = draftN;
    if (emptyEl) emptyEl.hidden = rows.length !== 0;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = '';
    pageRows.forEach(function (a) { listEl.appendChild(makeItem(a)); });
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }

  typeSel.addEventListener('change', renderReset);
  destSel.addEventListener('change', renderReset);
  sortSel.addEventListener('change', renderReset);
  render();

  /* ── 操作（イベント委譲）── */
  function findArticle(id) {
    for (var i = 0; i < ARTICLES.length; i++) if (ARTICLES[i].id === id) return ARTICLES[i];
    return null;
  }

  listEl.addEventListener('click', function (e) {
    var item = e.target.closest('.p319-item');
    if (!item) return;
    var a = findArticle(item.dataset.id);
    if (!a) return;

    if (e.target.closest('.p319-item__del')) {
      openDelModal(a);
      return;
    }
    /* カード（main部）クリック＝記事ページを新しいタブで開く（内側のリンク・ボタンは除外） */
    if (e.target.closest('.p319-item__main--link') && !e.target.closest('a') && !e.target.closest('button')) {
      var al = articleLink(a);
      if (al) window.open(al, '_blank');
      return;
    }
  });

  /* ── 削除／下書き破棄モーダル（破壊操作＝confirm を経て実行） ── */
  var delModal   = document.getElementById('p319DelModal');
  var delTitle   = document.getElementById('p319DelTitle');
  var delDesc    = document.getElementById('p319DelDesc');
  var delCancel  = document.getElementById('p319DelCancel');
  var delConfirm = document.getElementById('p319DelConfirm');
  var delBg      = document.getElementById('p319DelBg');
  var pendingDel = null;

  function openDelModal(a) {
    if (!delModal) return;
    pendingDel = a.id;
    var draft = isDraft(a);
    if (delTitle) delTitle.textContent = draft ? '下書きを破棄しますか？' : '記事を削除しますか？';
    if (delDesc) delDesc.innerHTML = '<span class="p319-del-modal__name">' + a.title + '</span>' +
      (draft
        ? 'この下書きを完全に破棄します。入力済みの内容は復元できません。'
        : 'この記事を完全に削除します。掲載先ページからも削除され、復元できません。');
    if (delConfirm) delConfirm.textContent = draft ? '破棄する' : '削除する';
    delModal.hidden = false;
  }
  function closeDelModal() {
    if (!delModal) return;
    delModal.hidden = true;
    pendingDel = null;
  }
  if (delCancel) delCancel.addEventListener('click', closeDelModal);
  if (delBg)     delBg.addEventListener('click', closeDelModal);
  if (delConfirm) delConfirm.addEventListener('click', function () {
    if (!pendingDel) return;
    var wasDraft = false;
    for (var i = 0; i < ARTICLES.length; i++) {
      if (ARTICLES[i].id === pendingDel) { wasDraft = isDraft(ARTICLES[i]); ARTICLES.splice(i, 1); break; }
    }
    closeDelModal();
    render();
    if (KTN.toast) KTN.toast(wasDraft ? '下書きを破棄しました（デモ）' : '記事を削除しました（デモ）');
  });

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P90-2  管理者-クリエイター/ギャラリー機能申込管理
   P11-2（クリエイター機能申込）／P11-3（ギャラリー機能申込）から届いた申込を一覧・審査する。
   一覧骨格は .p319-* を共有ネームスペースとして再利用（P3-18/P4-18 と同じ流用方針）。
   審査ステータスは3値（pending=確認中〔入力内容の確認・重複確認など〕／granted=利用開始／cancelled=取消）。
   本フローに差し戻し（却下）は無い＝確認事項はpending内のprocStatus（未処理/確認中）で扱う。
   granted・cancelledはどちらも終端状態として「処理完了」タブに入る（processType='new'/'link'/'cancel'で区別）。
   P90-11（LIAISON+申込管理）は独自に3値（pending/granted/returned）の差し戻しフローを持つため、
   本ページのステータス設計とは別（.p902-review-*／.ktn-review-status／.p902-return-panelのCSSはP90-11用に共有のまま残す）。

   2026-08-03 改修（後工程からの詳細仕様に合わせて実装）：
   ・P11-2/P11-3送信時、フォームのNIDと入力内容が管理者へ通知される想定 → 一覧に加え
     NIDクイックオープン（.p902-nidjump）で直接申込を開ける。
   ・申込を開くと入力内容のCSVを自動生成（.p902-csv／列構成は2026-08-06確定・buildCsv()参照）。
   ・旧「承認する」単一ボタンを2系統に分割：
     - 新規クリエイター・ギャラリー作成：Alias入力→重複確認（重複時は連番を提案）→
       作成確定でP3/P4ページを生成し、申込者UIDをオーナーに設定・NID/URLを返す（すべてデモ内シミュレーション）。
     - 既存クリエイター・ギャラリーのリンク付け：既存ページのNIDを入力→内容確認→確定で
       既存ページのオーナーを申込者UIDに設定する（デモ内シミュレーション）。
     いずれも確定後は grantedとして扱う（申込者からの既存ページ申告 a.existingClaim は
     どちらの操作を選ぶかの参考情報として表示するのみ＝紐付け先の自動決定はしない）。
   ・上記により旧「事務局作成の未割当ページを名前で検索」コンボ（KTN.linkCombo）は
     NID直接入力に置き換えたため使用しなくなった（KTN.linkCombo自体は本ページの新設のために
     作られた専用モジュールで他に利用箇所が無いため、common.js側も削除済み）。

   2026-08-03 追加改修（ユーザーからの業務フロー訂正）：
   ・本フローに「差し戻し」は存在しない → returnedステータス・差し戻しボタン／パネルを廃止。
     RETURN_REASONS・a.returnReasonも削除。
   ・入力内容の確認や重複確認など「確認すること」自体はある → これは元々pending内の
     procStatus（new=未処理／reviewing=確認中）が担っており、そのまま維持。
   ・「既存ページの申告（a.existingClaim）が無くても既存ページをリンクする場合がある」ことを明記
     → 元々existingClaimは参考表示のみで両操作ボタンの表示可否には影響していなかった（変更不要）。
     リード文もexistingClaimの有無に関わらずリンク操作を行う旨に修正。

   2026-08-03 追加改修②（取消ステータスの追加）：
   ・「取消」（申込者による取り下げ等・差し戻しとは別の終端状態）を追加し、pending／granted／
     cancelledの3値に変更。cancelledはgrantedと同じく「処理完了」タブに入る（自分の番を待たない
     終端状態という点で同格のため）。
   ・処理完了タブに列を2つ追加：処理種別（processType＝new/link/cancelを表示。
     PROCESS_TYPE_LABELで日本語化）・完了日時（grantedDate＝granted/cancelled共通で使う処理完了日時。
     フィールド名はgrantedDateのまま維持し「処理完了日時」の意味へ用途拡張）。
   ・タブ①（未処理・処理中）用の makeItem() はそのまま維持し、タブ②専用に makeDoneItem()
     を新設（列構成が分岐したため関数を分離）。
   ・cancelledの発生契機（取消にする操作ボタン等）は本ラウンドでは未実装。デモデータ（a8）で
     表示のみ再現。

   2026-08-09 廃止（既存ページ申告フィールドの撤去）：
   ・a.existingClaim（構造化フィールド）とその表示UI（.p902-link-claim）を廃止。
     ユーザー判断：「既存ページ申告」は申込フォーム自体の入力項目ではなく、確認メールへの
     返信内容（メールでのやり取り）であるため、構造化データとして自動表示するのではなく
     管理者コメント（adminNote）で手動管理する方針に統一。
   ・reviewReason:'existing-claim'（「確認中」の内訳ラベル）自体はカテゴリとして引き続き有効
     （既存ページ申告の確認中であること自体は変わらない・変更対象はテキストの保持方法のみ）。
════════════════════════════════════════════════════ */
/* ── P90-2 共有データ・ヘルパー（一覧ページ p90-2 と審査ページ p90-2-1 で共有・sessionStorageで状態同期） ──
   別ページへのフルページ遷移をまたいで審査結果（ステータス変更・管理メモ等）を一覧側へ反映するため、
   審査ページ側での変更は saveOverride() で sessionStorage に保存し、次回 P902Data() 生成時に APPS へマージする。 */
function p902LoadOverrides() {
  try {
    var raw = sessionStorage.getItem('ktnP902Overrides');
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function p902SaveOverride(id, patch) {
  try {
    var all = p902LoadOverrides();
    all[id] = Object.assign({}, all[id] || {}, patch);
    sessionStorage.setItem('ktnP902Overrides', JSON.stringify(all));
  } catch (e) {}
}

function P902Data() {

  var STATUS = {
    pending:   { label: '確認中',   cls: 'pending' },
    granted:   { label: '利用開始', cls: 'granted' },
    cancelled: { label: '取消',     cls: 'cancelled' },
  };
  var ROLE_LABEL = { creator: 'クリエイター', gallery: 'ギャラリー' };
  /* 処理完了タブの「処理種別」列・フィルター用ラベル（processTypeの表示名） */
  var PROCESS_TYPE_LABEL = { new: '新規作成', link: '既存リンク', cancel: '取消' };

  /* ── 取消理由（確認メールの理由／取消確定時の理由は同じ枠を共有） ──
     取消は「①確認メール送信→②申込者からの返信→③返信内容 or 申込者の希望をもとに管理者が取消を確定」の
     流れが基本（2026-08-08 確定）。role-switchのみ、申込者からの連絡が起点のため確認メールを経由しないこともある。 */
  var CANCEL_REASON_LABEL = {
    'input-error': '入力不足・入力誤り',
    'duplicate':   '以前に別アカウントで申込済み',
    'role-switch': '希望ロールの変更（申込者からの連絡による）',
    'other':       'その他',
  };

  /* ── 「確認中」の内訳（一覧のステータス表示に"何を確認しているか"を出すための短い名詞ラベル）──
     確認メール送信済み（inquiry）の申込はinquiry.reasonをキーに使う（duplicate等はCANCEL_REASON_LABELの
     キーと共有）。まだ確認メールを送っていないreviewing（書類突合・既存ページ申告の確認等）は
     申込データのreviewReasonを使う。procLabel()がどちらのキーかを判定して参照する。 */
  var REVIEW_REASON_LABEL = {
    'existing-claim': '既存ページ申告',
    'documents':      '実在確認資料',
    'identity':       '本人確認書類',
    'duplicate':      '重複申込',
    'input-error':    '入力内容',
    'role-switch':    '希望ロールの変更',
    'other':          '確認事項',
  };

  /* ── メールテンプレート（P90-9管理者-メールテンプレート管理 で一元管理する想定のデータ・docs/mail-template-system.md準拠）──
     本ページはP90-9とデータを共有しない独立したデモ配列を持つ（React CSR化前提・詳細は同ドキュメント参照）。
     pattern：'normal'＝正常系（利用開始のご案内）／'abnormal'＝非正常系（確認・取消。主目的が今回は成立しなかった/保留された通知）。
     variantKey命名：正常系={role}-{processType}／確認=confirm-{reason}／取消=cancel-{reason}。 */
  var MAIL_GRANT_BODY_NEW =
    '{{userName}} 様\n\nお待たせしました。個展なび事務局での確認が完了し、\n{{roleName}}機能をご利用いただけるようになりました。\n\n' +
    'あなたの{{roleName}}ページはこちらです。\n　{{pageName}}\n　{{pageUrl}}\n\n' +
    'これから、展覧会・作品・記事の掲載や、\nウォッチしてくださっている方への発信ができます。\n\n' +
    'まずはページの内容をご確認のうえ、\nプロフィールや掲載情報の追加をお試しください。\n\n{{commonFooter}}';
  var MAIL_GRANT_BODY_LINK =
    '{{userName}} 様\n\nお待たせしました。個展なび事務局での確認が完了し、\n{{roleName}}機能をご利用いただけるようになりました。\n\n' +
    'あなたの{{roleName}}ページはこちらです。\n　{{pageName}}\n　{{pageUrl}}\n\n' +
    'これから、展覧会・作品・記事の掲載や、\nウォッチしてくださっている方への発信ができます。\n\n' +
    '──────────────────────────────\n これまでの掲載情報を引き継ぎました\n──────────────────────────────\n' +
    '他の方が投稿された情報をもとに事務局が先行して作成していた\nあなたのページを確認し、オーナーをあなたに切り替えました。\n' +
    'これまでの展覧会情報もそのまま引き継がれています。\n内容に相違がある場合は、下記よりお知らせください。\n　{{supportUrl}}\n' +
    '──────────────────────────────\n\nまずはページの内容をご確認のうえ、\nプロフィールや掲載情報の追加をお試しください。\n\n{{commonFooter}}';
  var MAIL_CANCEL_BODY_STD =
    '{{userName}} 様\n\nご連絡いただきありがとうございました。\n' +
    'いただいたご返信内容を確認し、今回の{{roleName}}機能のお申込み（申込NID：{{applyId}}）は取消とさせていただきました。\n\n' +
    '改めてお申込みをご希望の場合は、お手数ですが再度お申込みフォームよりお手続きください。\n\n{{commonFooter}}';

  var MAIL_TEMPLATES = [
    { id: 'mt-1', screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理', pattern: 'normal', variantKey: 'creator-new', from: 'register@koten-navi.com',
      name: 'クリエイター機能 – 新規ページ作成', subject: '【個展なび】{{roleName}}機能のご利用を開始いただけます', body: MAIL_GRANT_BODY_NEW,
      status: 'active', usageNote: '新規にクリエイターページを作成して機能を付与した時に送る（M-02）。', updatedAt: '2026.8.8' },
    { id: 'mt-2', screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理', pattern: 'normal', variantKey: 'creator-link', from: 'register@koten-navi.com',
      name: 'クリエイター機能 – 既存ページのリンク付け', subject: '【個展なび】{{roleName}}機能のご利用を開始いただけます', body: MAIL_GRANT_BODY_LINK,
      status: 'active', usageNote: '事務局が先行作成済みの未割当ページにオーナーとしてリンクした時に送る（M-02・引き継ぎ結果ブロック付き）。', updatedAt: '2026.8.8' },
    { id: 'mt-3', screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理', pattern: 'normal', variantKey: 'gallery-new', from: 'register@koten-navi.com',
      name: 'ギャラリー機能 – 新規ページ作成', subject: '【個展なび】{{roleName}}機能のご利用を開始いただけます', body: MAIL_GRANT_BODY_NEW,
      status: 'active', usageNote: '新規にギャラリーページを作成して機能を付与した時に送る（M-04）。', updatedAt: '2026.8.8' },
    { id: 'mt-4', screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理', pattern: 'normal', variantKey: 'gallery-link', from: 'register@koten-navi.com',
      name: 'ギャラリー機能 – 既存ページのリンク付け', subject: '【個展なび】{{roleName}}機能のご利用を開始いただけます', body: MAIL_GRANT_BODY_LINK,
      status: 'active', usageNote: '事務局が先行作成済みの未割当ページにオーナーとしてリンクした時に送る（M-04・引き継ぎ結果ブロック付き）。', updatedAt: '2026.8.8' },
    { id: 'mt-5', screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理', pattern: 'abnormal', variantKey: 'confirm-input-error', from: 'inquiry@koten-navi.com',
      name: '入力不足・入力誤り', subject: '【個展なび】{{roleName}}機能のお申込み内容について確認のお願い',
      body: '{{userName}} 様\n\nこのたびは個展なびの{{roleName}}機能にお申し込みいただき、ありがとうございます。\n' +
        'いただいた内容を確認したところ、下記の点についてご確認をお願いしたく、ご連絡いたしました。\n\n' +
        '──────────────────────────────\n 申込NID：{{applyId}}\n 確認事項：（ここに具体的な不足・誤りの内容を記載してください）\n──────────────────────────────\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、上記についてご回答いただけますと幸いです。\nご回答をもって、あらためて内容を確認のうえ対応いたします。\n\n' +
        '※本メールへの返信がない場合、恐れ入りますが今回のお申込みは取消とさせていただく場合がございます。\n\n{{commonFooter}}',
      status: 'active', usageNote: '入力内容に不足・誤りの疑いがある時、取消を確定する前に事情を確認する1通（M-06パターン①）。', updatedAt: '2026.8.8' },
    { id: 'mt-6', screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理', pattern: 'abnormal', variantKey: 'confirm-duplicate', from: 'inquiry@koten-navi.com',
      name: '重複申込の可能性', subject: '【個展なび】{{roleName}}機能のお申込みについて確認のお願い（重複申込の可能性）',
      body: '{{userName}} 様\n\nこのたびは個展なびの{{roleName}}機能にお申し込みいただき、ありがとうございます。\n' +
        '確認したところ、以前に別のアカウントで同様のお申込みをいただいている可能性がございます。\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、以前にお申込みいただいたアカウント（メールアドレス等）についてご確認いただけますと幸いです。\n\n' +
        '※ご返信内容を確認のうえ、重複が確認できた場合は、今回のお申込みを取消とさせていただきます。\n\n{{commonFooter}}',
      status: 'active', usageNote: '以前に別アカウントで同様の申込がある疑いがある時に事情を確認する1通（M-06パターン②）。', updatedAt: '2026.8.8' },
    { id: 'mt-7', screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理', pattern: 'abnormal', variantKey: 'cancel-input-error', from: 'register@koten-navi.com',
      name: '入力不足・入力誤り', subject: '【個展なび】{{roleName}}機能のお申込みの取消について', body: MAIL_CANCEL_BODY_STD,
      status: 'active', usageNote: '確認メールへの返信・入力不足を理由に取消を確定した時に送る（M-07パターン①・送信は任意）。', updatedAt: '2026.8.8' },
    { id: 'mt-8', screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理', pattern: 'abnormal', variantKey: 'cancel-duplicate', from: 'register@koten-navi.com',
      name: '以前に別アカウントで申込済み', subject: '【個展なび】{{roleName}}機能のお申込みの取消について', body: MAIL_CANCEL_BODY_STD,
      status: 'active', usageNote: '重複申込が確認できたことを理由に取消を確定した時に送る（M-07パターン①・送信は任意）。', updatedAt: '2026.8.8' },
    { id: 'mt-9', screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理', pattern: 'abnormal', variantKey: 'cancel-role-switch', from: 'register@koten-navi.com',
      name: '希望ロールの変更', subject: '【個展なび】{{roleName}}機能のお申込みの取消について',
      body: '{{userName}} 様\n\nご連絡いただきありがとうございました。\n' +
        'ご希望のとおり、今回の{{roleName}}機能のお申込み（申込NID：{{applyId}}）は取消とさせていただきました。\n\n' +
        'あらためて別の機能でお申込みをご希望の場合は、お手数ですが再度お申込みフォームよりお手続きください。\n\n{{commonFooter}}',
      status: 'active', usageNote: '申込者本人からの希望ロール変更の連絡をもとに取消を確定した時に送る（M-07パターン②・送信は任意）。', updatedAt: '2026.8.8' },
    { id: 'mt-10', screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理', pattern: 'abnormal', variantKey: 'cancel-other', from: 'register@koten-navi.com',
      name: 'その他', subject: '【個展なび】{{roleName}}機能のお申込みの取消について', body: MAIL_CANCEL_BODY_STD,
      status: 'active', usageNote: '上記に当てはまらない理由で取消を確定した時に送る（M-07パターン①・送信は任意）。', updatedAt: '2026.8.8' },
  ];

  /* ── トークン展開・テンプレート検索ヘルパー（P90-9共通仕様・docs/mail-template-system.md 7章）── */
  function tplTokens(a) {
    return {
      userName: a.name,
      roleName: ROLE_LABEL[a.role],
      applyId: a.nid,
      pageUrl: a.linkedPage ? a.linkedPage.url : '',
      pageName: a.linkedPage ? a.linkedPage.name : a.name,
      supportUrl: 'https://koten-navi.com/contact',
      commonFooter: 'お問い合わせ：https://koten-navi.com/contact',
    };
  }
  function applyTokens(text, tokens) {
    return (text || '').replace(/\{\{(\w+)\}\}/g, function (m, key) {
      return Object.prototype.hasOwnProperty.call(tokens, key) ? tokens[key] : m;
    });
  }
  function findTemplate(variantKey) {
    for (var i = 0; i < MAIL_TEMPLATES.length; i++) {
      if (MAIL_TEMPLATES[i].variantKey === variantKey && MAIL_TEMPLATES[i].status === 'active') return MAIL_TEMPLATES[i];
    }
    return null;
  }
  function templatesByPattern(pattern) {
    return MAIL_TEMPLATES.filter(function (t) { return t.status === 'active' && t.pattern === pattern; });
  }
  function templatesByPrefix(prefix) {
    return MAIL_TEMPLATES.filter(function (t) { return t.status === 'active' && t.variantKey.indexOf(prefix) === 0; });
  }
  /* 確認理由・取消理由は同じ枠（CANCEL_REASON_LABEL）を共有するため、variantKeyのprefixを外した裸のキーで登録・参照する */
  function bareReasonKey(variantKey) {
    return (variantKey || '').replace(/^(confirm|cancel)-/, '');
  }
  /* 選択肢の末尾に「＋ 新しいテンプレートとして追加」を付けてプルダウンを再構成する（確認・取消の両パネルで共有） */
  function populateReasonSelect(sel, prefix) {
    if (!sel) return;
    var items = templatesByPrefix(prefix);
    sel.innerHTML = items.map(function (t) {
      return '<option value="' + t.variantKey + '">' + t.name + '</option>';
    }).join('') + '<option value="__new__">＋ 新しいテンプレートとして追加</option>';
  }
  /* 送信パネルでその場に追加するカスタムテンプレート（P90-9とは非同期のローカル配列に追加するのみ・デモ） */
  function addCustomTemplate(pattern, prefix, name, subject, body) {
    var t = {
      id: 'mt-custom-' + Date.now(), screenId: 'p90-2', screenLabel: 'クリエイター/ギャラリー機能申込管理',
      pattern: pattern, variantKey: prefix + '-' + Date.now(), name: name, subject: subject, body: body,
      status: 'active', usageNote: '管理者がP90-2の送信パネルからその場で追加', updatedAt: todayLabel(),
    };
    MAIL_TEMPLATES.push(t);
    CANCEL_REASON_LABEL[bareReasonKey(t.variantKey)] = name;
    return t;
  }

  /* ── 事務局が先行作成済みの未割当ページ（オーナー未設定ページ引き継ぎ用レジストリ・NIDキー）──
     「既存クリエイター・ギャラリーのリンク付け」で管理者が入力したNIDをここから照合する。 */
  var EXISTING_PAGES = {
    'N-30210': { name: '木内 遥',        kind: 'creator', meta: '陶芸／事務局作成・未割当（松田啓佑展 出展者情報より）', url: 'kotennavi-p3.html?c=kiuchi-admin' },
    'N-41080': { name: 'KUMO Art Space', kind: 'gallery', meta: '現代美術／事務局作成・未割当（会場情報より）',           url: 'kotennavi-p4.html?g=kumo-admin' },
  };

  /* ── alias重複確認用レジストリ（デモ内の「既に使われているalias」一覧）──
     'hayakawa-ren'は申込a2（早川蓮／Hayakawa Ren）のローマ字表記からそのまま導かれるaliasと意図的に一致させてあり、
     新規作成パネルを開くと自動入力される候補alias（suggestAlias参照）で「確認する」を押すと重複エラーを再現できる。 */
  var ALIAS_TAKEN = ['kiuchi-admin', 'kumo-admin', 'tanaka', 'tanaka-1', 'tanaka-2', 'yugen', 'soil', 'yui-tokyo', 'yui-kyoto', 'matsuda', 'hayakawa-ren'];

  /* ── 新規作成時に払い出すNIDの採番（デモ内カウンタ） ── */
  var nextNidSeq = 60000;
  function genNid() { nextNidSeq += 1; return 'N-' + nextNidSeq; }

  /* ── 既存ページのリンク付け「確認OKパターン」デモ＝申込者からの既存ページ申告（管理者コメントで手動記録）が
     EXISTING_PAGESのどのNIDを指しているかをあらかじめ紐付け、パネルを開いた時点でNIDを自動入力する（確認するボタン1つでOK例を再現） */
  var DEMO_LINK_NID = { a1: 'N-30210', a3: 'N-41080' };

  /* ── サンプル申込データ（nid＝このフォーム送信自体のNID／uid＝申込者のUID／email＝申込者アカウントのメールアドレス）──
     procStatus（pendingのみ）＝「未処理」「確認中」タブ内ステータス絞り込み用サブ状態（入力内容の確認・重複確認等はここに含む）
     processType／procSS（grantedのみ）＝「処理完了」タブの処理種別絞り込み・処理完了日降順ソート用
     ※本フローに差し戻し（returned）は無い。確認事項が残る申込はpending＋procStatus:'reviewing'のまま扱う
     inquiry（任意）＝{reason, date}＝申込者への確認メール送信済みの記録（procStatus:'reviewing'のまま・一覧/モーダルに「返信待ち」の小さな注記を出す）
     cancelReason／cancelEmailSent（processType:'cancel'のみ）＝取消理由・取消のご連絡メールを送信したか
     grantMailSent／grantMailDate（processType:'new'/'link'のみ）＝利用開始のご案内メールを送信したか・送信日時（送信は処理結果エリアのボタンから任意タイミング） */
  var APPS = [
    { id: 'a1', role: 'creator', status: 'pending', procStatus: 'reviewing', nid: 'N-58021', uid: 'U-10432',
      email: 'kiuchi.haruka@example.com',
      name: '木内 遥', kana: 'キウチ ハルカ', romaji: 'Kiuchi Haruka', genre: 'クラフト',
      links: ['https://instagram.com/kiuchi_haruka_ceramics'],
      applicantType: 'self', agent: null,
      kyc: { realName: '木内 遥', realKana: 'キウチ ハルカ', birth: '1994.6.2', gender: '女性',
             zip: '150-0001', pref: '東京都', addr: '渋谷区神宮前X-XX-X', tel: '090-XXXX-XXXX' },
      notes: '', submitted: '2026.7.28 9:14', ss: 20260728,
      adminNote: '申告のあった「松田啓佑展」出展時のページ作成経緯について申込者へメールで確認中。既存NIDの特定ができ次第、リンク付けで対応予定。',
      reviewReason: 'existing-claim',
      linkedPage: null, grantedDate: null, processType: null, procSS: null },
    { id: 'a2', role: 'creator', status: 'pending', procStatus: 'new', nid: 'N-58034', uid: 'U-10488',
      email: 'hayakawa.ren@example.com',
      name: '早川 蓮', kana: 'ハヤカワ レン', romaji: 'Hayakawa Ren', genre: '写真',
      links: ['https://hayakawa-ren.example'],
      applicantType: 'agent', agent: { name: '早川マネジメント', kana: 'ハヤカワマネジメント', relation: 'マネージャー' },
      kyc: { realName: '早川 蓮', realKana: 'ハヤカワ レン', birth: '1988.11.30', gender: '男性',
             zip: '160-0022', pref: '東京都', addr: '新宿区新宿X-X-X', tel: '080-XXXX-XXXX' },
      notes: '代理申込のため、確認のご連絡は早川マネジメント宛にお願いします。',
      submitted: '2026.7.30 16:40', ss: 20260730,
      adminNote: '', linkedPage: null, grantedDate: null, processType: null, procSS: null },
    { id: 'a3', role: 'gallery', status: 'pending', procStatus: 'reviewing', nid: 'N-58012', uid: 'U-10401',
      email: 'sasaki.hina@example.com',
      name: 'KUMO Art Space', kana: 'クモ アートスペース', nameEn: 'KUMO Art Space', genre: 'アート',
      venue: { zip: '530-0001', pref: '大阪府', addr: '大阪市北区梅田X-X-X KUMOビル 3F', tel: '06-XXXX-XXXX', email: 'info@kumo-art.example' },
      links: ['https://kumo-art.example'],
      contact: { name: '佐々木 陽菜', kana: 'ササキ ヒナ', relation: 'オーナー・運営者', dept: '', title: '代表' },
      notes: '', submitted: '2026.7.20 11:02', ss: 20260720,
      adminNote: '申込者より「2025年に『松田啓佑展』の会場として掲載いただいたことがある」との申告あり。既存NIDの特定のため確認中。', reviewReason: 'existing-claim',
      linkedPage: null, grantedDate: null, processType: null, procSS: null },
    { id: 'a4', role: 'creator', status: 'granted', procStatus: null, nid: 'N-51002', uid: 'U-10022',
      email: 'tanaka.toru@example.com',
      name: '田中 透', kana: 'タナカ トオル', romaji: 'Tanaka Toru', genre: 'アート',
      links: ['https://tanaka-toru.example', 'https://instagram.com/tanaka_toru_art', 'https://x.com/tanaka_toru_art'],
      applicantType: 'self', agent: null,
      kyc: { realName: '田中 透', realKana: 'タナカ トオル', birth: '1985.2.14', gender: '男性',
             zip: '150-0002', pref: '東京都', addr: '渋谷区渋谷X-X-X', tel: '090-XXXX-XXXX' },
      notes: '',
      submitted: '2025.10.2 13:20', ss: 20251002,
      adminNote: '本人確認書類確認済み。既存クリエイターページ（NID：N-30044）とのリンク付けで対応。',
      linkedPage: { name: '田中 透', url: 'kotennavi-p3.html', nid: 'N-30044', kind: 'creator' },
      grantedDate: '2025.10.5 11:20', processType: 'link', procSS: 20251005,
      grantMailSent: true, grantMailDate: '2025.10.5 11:22' },
    { id: 'a5', role: 'gallery', status: 'pending', procStatus: 'reviewing', nid: 'N-57810', uid: 'U-10390',
      email: 'nakamura.yu@example.com',
      name: 'ART BASE', kana: 'アートベース', nameEn: 'ART BASE', genre: 'クラフト',
      venue: { zip: '231-0012', pref: '神奈川県', addr: '横浜市中区相生町X-X', tel: '045-XXXX-XXXX', email: 'contact@artbase.example' },
      links: [], contact: { name: '中村 悠', kana: 'ナカムラ ユウ', relation: 'スタッフ', dept: '企画', title: '' },
      notes: '',
      submitted: '2026.7.10 8:55', ss: 20260710,
      adminNote: 'ギャラリーの実在確認ができる資料（登記簿・賃貸契約書等）の追加提出を依頼し確認中。',
      reviewReason: 'documents',
      linkedPage: null, grantedDate: null, processType: null, procSS: null },
    { id: 'a6', role: 'creator', status: 'pending', procStatus: 'reviewing', nid: 'N-56390', uid: 'U-10355',
      email: 'fujii.aoi@example.com',
      name: '藤井 碧', kana: 'フジイ アオイ', romaji: 'Fujii Aoi', genre: 'アート',
      links: [], applicantType: 'self', agent: null,
      kyc: { realName: '藤井 碧', realKana: 'フジイ アオイ', birth: '1999.5.9', gender: '女性',
             zip: '170-0013', pref: '東京都', addr: '豊島区東池袋X-X-X', tel: '080-XXXX-XXXX' },
      notes: '',
      submitted: '2026.6.15 19:30', ss: 20260615,
      adminNote: '同一申込者からの重複申込の可能性があり、既存申込との突合を確認中。',
      reviewReason: 'duplicate',
      inquiry: { reason: 'duplicate', date: '2026.6.18 14:05' },
      linkedPage: null, grantedDate: null, processType: null, procSS: null },
    { id: 'a7', role: 'gallery', status: 'granted', procStatus: null, nid: 'N-59102', uid: 'U-10502',
      email: 'yanagi.miwa@example.com',
      name: 'アトリエ凪', kana: 'アトリエ ナギ', nameEn: 'Atelier Nagi', genre: 'クラフト',
      venue: { zip: '602-0000', pref: '京都府', addr: '京都市上京区X-X-X', tel: '075-XXXX-XXXX', email: 'info@atelier-nagi.example' },
      links: ['https://atelier-nagi.example'],
      contact: { name: '柳 美和', kana: 'ヤナギ ミワ', relation: 'オーナー・運営者', dept: '', title: '代表' },
      notes: '',
      submitted: '2026.6.1 10:15', ss: 20260601,
      adminNote: '新規ページとして作成し、申込者をオーナーに設定。',
      linkedPage: { name: 'アトリエ凪', url: 'kotennavi-p4.html?g=atelier-nagi', nid: 'N-60001', kind: 'gallery' },
      grantedDate: '2026.6.4 10:05', processType: 'new', procSS: 20260604,
      grantMailSent: false },
    { id: 'a8', role: 'creator', status: 'cancelled', procStatus: null, nid: 'N-57210', uid: 'U-10366',
      email: 'oshima.rui@example.com',
      name: '大島 塁', kana: 'オオシマ ルイ', romaji: 'Oshima Rui', genre: 'アート',
      links: [], applicantType: 'self', agent: null,
      kyc: { realName: '大島 塁', realKana: 'オオシマ ルイ', birth: '1992.9.19', gender: '男性',
             zip: '862-0950', pref: '熊本県', addr: '熊本市中央区X-X-X', tel: '090-XXXX-XXXX' },
      notes: '',
      submitted: '2026.7.12 10:00', ss: 20260712,
      adminNote: '申込者本人より、都合により申込を取り下げたいとのご連絡があったため対応を終了。',
      cancelReason: 'other', cancelEmailSent: false,
      linkedPage: null, grantedDate: '2026.7.14 15:40', processType: 'cancel', procSS: 20260714 },
  ];

  /* ── 別ページ遷移をまたいだ状態同期（審査ページで保存したオーバーライドをここでマージ） ── */
  var _overrides = p902LoadOverrides();
  APPS.forEach(function (a) {
    if (_overrides[a.id]) Object.assign(a, _overrides[a.id]);
  });
  function saveOverride(a) {
    p902SaveOverride(a.id, {
      status: a.status, procStatus: a.procStatus, grantedDate: a.grantedDate,
      processType: a.processType, procSS: a.procSS, linkedPage: a.linkedPage,
      cancelReason: a.cancelReason, cancelEmailSent: a.cancelEmailSent,
      inquiry: a.inquiry, adminNote: a.adminNote,
      grantMailSent: a.grantMailSent, grantMailDate: a.grantMailDate,
    });
  }

  /* ── procStatus（未処理・処理中タブのサブ状態）／processType（処理完了タブの絞り込み用ラベル） ── */
  var PROC_STATUS = {
    new:       { label: '未処理', cls: 'new' },
    reviewing: { label: '確認中', cls: 'pending' },
  };
  /* 「確認中」バッジ自体は固定文言のまま、事務局が何を確認しているかは reason として別行に分けて返す
     （procStatus自体はreviewingのまま・新しい状態値は追加しない）。確認メール送信済み（inquiry）は
     返信待ちであることも reason に併記する。 */
  function procLabel(a) {
    if (a.procStatus !== 'reviewing') return { label: (PROC_STATUS[a.procStatus] || PROC_STATUS.new).label, cls: (PROC_STATUS[a.procStatus] || PROC_STATUS.new).cls, reason: null };
    var reason = a.inquiry
      ? (REVIEW_REASON_LABEL[a.inquiry.reason] || REVIEW_REASON_LABEL.other) + '・返信待ち'
      : REVIEW_REASON_LABEL[a.reviewReason] || null;
    return { label: PROC_STATUS.reviewing.label, cls: 'pending', reason: reason };
  }

  function findApp(id) {
    for (var i = 0; i < APPS.length; i++) if (APPS[i].id === id) return APPS[i];
    return null;
  }
  function findAppByNid(nid) {
    nid = (nid || '').trim();
    if (!nid) return null;
    for (var i = 0; i < APPS.length; i++) if (APPS[i].nid === nid) return APPS[i];
    return null;
  }

  function fieldsHtml(fields) {
    return '<dl class="p902-review-grid">' + fields.map(function (f) {
      return '<dt>' + f[0] + '</dt><dd>' + (f[1] || '—') + '</dd>';
    }).join('') + '</dl>';
  }

  function linksHtml(links) {
    if (!links || !links.length) return '—';
    return '<div class="p902-review-links">' + links.map(function (u) {
      return '<a href="' + u + '" target="_blank" rel="noopener">' + u + '</a>';
    }).join('') + '</div>';
  }

  /* ── 入力内容CSV（列構成＝ユーザー指定・2026-08-06確定） ── */
  function csvEscape(v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; }
  function buildCsv(a) {
    var cols, vals;
    if (a.role === 'creator') {
      cols = ['クリエイター名', 'フリガナ', 'ローマ字表記', 'ジャンル', 'HP/SNS(複数)', '郵便番号', '住所(都道府県+住所)', '電話番号',
        '性別', '本名', '本名フリガナ', '生年月日', '本人/代理人', '本人との関係', '代理人氏名', '代理人フリガナ', '連絡事項'];
      vals = [a.name, a.kana, a.romaji, a.genre, (a.links || []).join(';'), a.kyc.zip, a.kyc.pref + a.kyc.addr, a.kyc.tel,
        a.kyc.gender, a.kyc.realName, a.kyc.realKana, a.kyc.birth,
        a.applicantType === 'self' ? '本人' : '代理人',
        a.agent ? a.agent.relation : '', a.agent ? a.agent.name : '', a.agent ? a.agent.kana : '',
        a.notes || ''];
    } else {
      cols = ['ギャラリー名', 'フリガナ', 'ローマ字表記', 'ジャンル', 'HP/SNS(複数)', '郵便番号', '住所(都道府県+住所)', '電話番号',
        'メールアドレス', '担当者名', '担当者フリガナ', 'ギャラリーとの関係', '所属', 'タイトル', '', '', '連絡事項'];
      vals = [a.name, a.kana, a.nameEn, a.genre, (a.links || []).join(';'), a.venue.zip, a.venue.pref + a.venue.addr, a.venue.tel,
        a.venue.email, a.contact.name, a.contact.kana, a.contact.relation, a.contact.dept, a.contact.title, '', '',
        a.notes || ''];
    }
    cols.unshift('申込タイプC/G', '申込NID');
    vals.unshift(a.role === 'creator' ? 'C' : 'G', a.nid);
    return cols.map(csvEscape).join(',') + '\n' + vals.map(csvEscape).join(',');
  }

  function buildBody(a) {
    var html = '';
    if (a.role === 'creator') {
      html += '<div class="p902-review-section"><h4 class="p902-review-section__title">公開予定のクリエイター情報</h4>' +
        fieldsHtml([
          ['クリエイター名（表示名・活動名）', a.name], ['クリエイター名（全角カナ）', a.kana], ['クリエイター名（英語表記）', a.romaji], ['作品ジャンル', a.genre],
          ['ホームページ・SNS', linksHtml(a.links)],
        ]) + '</div>';
      html += '<div class="p902-review-section"><h4 class="p902-review-section__title">非公開・本人確認のための情報</h4>' +
        fieldsHtml([
          ['本名（フルネーム）', a.kyc.realName], ['フリガナ（全角カナ）', a.kyc.realKana], ['生年月日', a.kyc.birth], ['性別', a.kyc.gender],
          ['郵便番号', a.kyc.zip], ['都道府県', a.kyc.pref], ['市区町村・番地以降', a.kyc.addr], ['電話番号', a.kyc.tel],
        ]) + '</div>';
      html += '<div class="p902-review-section"><h4 class="p902-review-section__title">申込者について</h4>' +
        (a.applicantType === 'self'
          ? fieldsHtml([['申込者の区分', 'クリエイター本人']])
          : fieldsHtml([
              ['申込者の区分', '代理人（ご家族など）'], ['代理人氏名（フルネーム）', a.agent.name],
              ['代理人フリガナ（全角カナ）', a.agent.kana], ['クリエイター本人との関係', a.agent.relation],
            ])
        ) + '</div>';
    } else {
      html += '<div class="p902-review-section"><h4 class="p902-review-section__title">公開予定のギャラリー情報</h4>' +
        fieldsHtml([
          ['ギャラリー名（表示名）', a.name], ['ギャラリー名（全角カナ）', a.kana], ['ギャラリー名（英語表記）', a.nameEn], ['主な取扱いジャンル', a.genre],
          ['郵便番号', a.venue.zip], ['都道府県', a.venue.pref], ['市区町村・番地以降', a.venue.addr],
          ['電話番号', a.venue.tel], ['メールアドレス', a.venue.email], ['ホームページ・SNS', linksHtml(a.links)],
        ]) + '</div>';
      html += '<div class="p902-review-section"><h4 class="p902-review-section__title">非公開・ご担当者情報</h4>' +
        '<p class="p902-review-section__note">ギャラリーのご担当者様は本人確認の対象外です（施設としての本人確認は所在地情報で行います）。</p>' +
        fieldsHtml([
          ['ご担当者お名前（フルネーム）', a.contact.name], ['ご担当者フリガナ（全角カナ）', a.contact.kana], ['ギャラリーとのご関係', a.contact.relation],
          ['ご担当者の所属', a.contact.dept], ['ご担当者のタイトル', a.contact.title],
        ]) + '</div>';
    }
    html += '<div class="p902-review-section"><h4 class="p902-review-section__title">連絡事項</h4>' +
      '<p class="p902-review-section__note" style="font-size:.8rem;color:var(--ink)">' + (a.notes || '—') + '</p></div>';
    return html;
  }

  /* linkedPage.urlの?c=/?g=クエリ値がalias。新規作成時は必ず付与されるが、事務局作成の既存ページ等は
     aliasが未設定（トップNIDのみ）のケースもあるためnullを返す（2026-08-10） */
  function extractAlias(url) {
    var m = /[?&][cg]=([^&]+)/.exec(url || '');
    return m ? m[1] : null;
  }
  /* ── 処理結果（granted/cancelledの申込＝レビューページ末尾に表示。完了メッセージ＋処理種別・完了日時） ── */
  function buildResult(a) {
    var html = '<h4 class="p902-review-section__title">処理結果</h4>';
    if (a.processType === 'new' && a.linkedPage) {
      html += '<p class="p902-flow-panel__result">新規ページを作成し、オーナーを申込者（' + a.uid + '）に設定しました。<br>' +
        'NID：<strong>' + a.linkedPage.nid + '</strong>　Alias：' + (extractAlias(a.linkedPage.url)
          ? '<a href="' + a.linkedPage.url + '" target="_blank" rel="noopener">' + extractAlias(a.linkedPage.url) + '</a>' : '—') + '</p>';
    } else if (a.processType === 'link' && a.linkedPage) {
      html += '<p class="p902-flow-panel__result">既存ページのオーナーを申込者（' + a.uid + '）に設定しました。<br>' +
        'NID：<strong>' + a.linkedPage.nid + '</strong>　Alias：' + (extractAlias(a.linkedPage.url)
          ? '<a href="' + a.linkedPage.url + '" target="_blank" rel="noopener">' + extractAlias(a.linkedPage.url) + '</a>' : '—') + '</p>';
    }
    var fields = [
      ['処理種別', PROCESS_TYPE_LABEL[a.processType] || '—'],
      ['完了日時', a.grantedDate || '—'],
    ];
    if (a.processType === 'cancel') {
      fields.push(['取消理由', CANCEL_REASON_LABEL[a.cancelReason] || '—']);
      fields.push(['取消のご連絡メール', a.cancelEmailSent ? '送信済み' : '送信なし']);
    } else if (a.processType === 'new' || a.processType === 'link') {
      fields.push(['利用開始のご案内メール', a.grantMailSent ? ('送信済み（' + a.grantMailDate + '）') : '未送信']);
    }
    html += fieldsHtml(fields);
    /* 成功パターン（新規作成／既存リンク付け）＝未送信の間だけ送信ボタンを出す。resultElはbuildResultの都度innerHTMLで
       再生成されるため、クリックはresultEl側のイベント委譲で拾う（ボタン自体にリスナーは付けない） */
    if ((a.processType === 'new' || a.processType === 'link') && !a.grantMailSent) {
      html += '<div class="p902-flow-panel__actions"><button type="button" class="ktn-op-btn ktn-op-btn--sm" id="p902GrantMailBtn">ご利用開始のご案内メールを送信する</button></div>';
    }
    return html;
  }

  /* 申込者名（ローマ字表記／ギャラリーは英語名）からalias候補を機械的に導く（デモの初期値・確定値ではない） */
  function suggestAlias(a) {
    var src = a.romaji || a.nameEn || '';
    return src.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function todaySS() {
    var d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }
  /* 完了日時の表示＝「日時」ラベルどおり時刻まで含める。submitted（'2026.7.28 9:14'等）と同じ
     「YYYY.M.D H:MM」表記の実日時にする（'今日'のような相対文言・日付のみは使わない） */
  function todayLabel() {
    var d = new Date();
    var mm = d.getMinutes();
    return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + ' ' + d.getHours() + ':' + (mm < 10 ? '0' : '') + mm;
  }
  return {
    STATUS: STATUS, ROLE_LABEL: ROLE_LABEL, PROCESS_TYPE_LABEL: PROCESS_TYPE_LABEL,
    CANCEL_REASON_LABEL: CANCEL_REASON_LABEL, REVIEW_REASON_LABEL: REVIEW_REASON_LABEL,
    MAIL_TEMPLATES: MAIL_TEMPLATES, tplTokens: tplTokens, applyTokens: applyTokens,
    findTemplate: findTemplate, templatesByPattern: templatesByPattern, templatesByPrefix: templatesByPrefix,
    bareReasonKey: bareReasonKey, populateReasonSelect: populateReasonSelect, addCustomTemplate: addCustomTemplate,
    EXISTING_PAGES: EXISTING_PAGES, ALIAS_TAKEN: ALIAS_TAKEN, genNid: genNid, DEMO_LINK_NID: DEMO_LINK_NID,
    APPS: APPS, PROC_STATUS: PROC_STATUS, procLabel: procLabel,
    findApp: findApp, findAppByNid: findAppByNid, saveOverride: saveOverride,
    fieldsHtml: fieldsHtml, linksHtml: linksHtml, csvEscape: csvEscape, buildCsv: buildCsv,
    buildBody: buildBody, buildResult: buildResult, suggestAlias: suggestAlias,
    todaySS: todaySS, todayLabel: todayLabel,
  };
}


KTN.pages['p90-2'] = function () {
  var D = P902Data();

  /* ── タブ切替（未処理・処理中／処理完了） ── */
  var tabBtns   = document.querySelectorAll('.p902-tab-btn');
  var tabPanels = document.querySelectorAll('.p902-tab-panel');
  function activateTabPanel(panelId) {
    tabBtns.forEach(function (b) {
      var isTarget = b.dataset.panel === panelId;
      b.classList.toggle('is-active', isTarget);
      b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });
    tabPanels.forEach(function (p) { p.hidden = (p.id !== panelId); });
  }
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { activateTabPanel(btn.dataset.panel); });
  });

  /* ── DOM（未処理・処理中タブ） ── */
  var listOpenEl     = document.getElementById('p902ListOpen');
  var emptyOpenEl    = document.getElementById('p902EmptyOpen');
  var roleOpenSel    = document.getElementById('p902FilterRoleOpen');
  var statOpenSel    = document.getElementById('p902FilterStatusOpen');
  var countOpenEl    = document.getElementById('p902CountOpen');
  var pagerOpenEl    = document.getElementById('p902PaginationOpen');
  var tabCountOpenEl = document.getElementById('p902TabCountOpen');

  /* ── DOM（処理完了タブ） ── */
  var listDoneEl     = document.getElementById('p902ListDone');
  var emptyDoneEl    = document.getElementById('p902EmptyDone');
  var roleDoneSel    = document.getElementById('p902FilterRoleDone');
  var typeDoneSel    = document.getElementById('p902FilterProcTypeDone');
  var countDoneEl    = document.getElementById('p902CountDone');
  var pagerDoneEl    = document.getElementById('p902PaginationDone');
  var tabCountDoneEl = document.getElementById('p902TabCountDone');

  if (!listOpenEl || !listDoneEl) return;

  var pageOpen = 1, pageDone = 1;
  var PER_PAGE = 5;

  /* ── 一覧行（表形式：申込日／申込NID／申込種別／UID／ログインメールアドレス／ステータス）※タブ①未処理・処理中用 ── */
  function makeItem(a, statusInfo) {
    var tr = document.createElement('tr');
    tr.className = 'p902-row';
    tr.dataset.id = a.id;
    tr.title = 'クリックして詳細を確認';
    tr.innerHTML =
      '<td data-label="申込日時" class="p902-cell--muted">' + a.submitted + '</td>' +
      '<td data-label="申込NID" class="p902-cell--muted">' + a.nid + '</td>' +
      '<td data-label="申込種別">' + (D.ROLE_LABEL[a.role] || a.role) + '</td>' +
      '<td data-label="UID" class="p902-cell--name p902-col-uid">' + a.uid + '</td>' +
      '<td data-label="ログインメールアドレス" class="p902-cell--muted">' + a.email + '</td>' +
      '<td data-label="ステータス"><span class="ktn-review-status ktn-review-status--' + statusInfo.cls + '">' + statusInfo.label + '</span>' +
      (statusInfo.reason ? '<div class="p902-proc-reason">' + statusInfo.reason + '</div>' : '') + '</td>';
    return tr;
  }

  /* ── 一覧行（表形式：申込日／申込NID／申込種別／UID／ログインメールアドレス／処理内容(処理種別+完了日時を上下2段表示)／ステータス）※タブ②処理完了専用（granted/cancelledの終端2状態） ── */
  function makeDoneItem(a) {
    var tr = document.createElement('tr');
    tr.className = 'p902-row';
    tr.dataset.id = a.id;
    tr.title = 'クリックして詳細を確認';
    var statusInfo = D.STATUS[a.status];
    tr.innerHTML =
      '<td data-label="申込日時" class="p902-cell--muted">' + a.submitted + '</td>' +
      '<td data-label="申込NID" class="p902-cell--muted">' + a.nid + '</td>' +
      '<td data-label="申込種別">' + (D.ROLE_LABEL[a.role] || a.role) + '</td>' +
      '<td data-label="UID" class="p902-cell--name p902-col-uid">' + a.uid + '</td>' +
      '<td data-label="ログインメールアドレス" class="p902-cell--muted">' + a.email + '</td>' +
      '<td data-label="処理内容">' + (D.PROCESS_TYPE_LABEL[a.processType] || '—') +
      '<div class="p902-proc-reason">' + (a.grantedDate || '—') + '</div></td>' +
      '<td data-label="ステータス"><span class="ktn-review-status ktn-review-status--' + statusInfo.cls + '">' + statusInfo.label + '</span></td>';
    return tr;
  }

  /* ── 行クリック／NIDクイックオープンはいずれも審査ページ（p90-2-1）へ同一タブで遷移する ── */
  function bindItemClicks(el) {
    el.addEventListener('click', function (e) {
      var row = e.target.closest('.p902-row');
      if (!row) return;
      var a = D.findApp(row.dataset.id);
      if (a) location.href = 'kotennavi-p90-2-1.html?id=' + encodeURIComponent(a.id);
    });
  }
  bindItemClicks(listOpenEl);
  bindItemClicks(listDoneEl);

  /* ── タブ①：未処理・処理中（並べ替えなし・申込日降順固定） ── */
  function renderOpen() {
    var fr = roleOpenSel ? roleOpenSel.value : '', fp = statOpenSel ? statOpenSel.value : '';
    var rows = D.APPS.filter(function (a) {
      if (a.status !== 'pending') return false;
      if (fr && a.role !== fr) return false;
      if (fp && a.procStatus !== fp) return false;
      return true;
    });
    rows.sort(function (a, b) { return b.ss - a.ss; });
    if (tabCountOpenEl) tabCountOpenEl.textContent = D.APPS.filter(function (a) { return a.status === 'pending'; }).length;
    if (emptyOpenEl) emptyOpenEl.hidden = rows.length !== 0;
    if (countOpenEl) countOpenEl.innerHTML = '<strong>' + rows.length + '</strong>件該当';

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (pageOpen > totalPages) pageOpen = totalPages;
    var pageRows = rows.slice((pageOpen - 1) * PER_PAGE, pageOpen * PER_PAGE);
    listOpenEl.innerHTML = '';
    pageRows.forEach(function (a) { listOpenEl.appendChild(makeItem(a, D.procLabel(a))); });
    KTN.pagination.render(pagerOpenEl, {
      page: pageOpen,
      totalPages: totalPages,
      onGoto: function (p) { pageOpen = p; renderOpen(); },
    });
  }

  /* ── タブ②：処理完了（並べ替えなし・処理完了日降順固定） ── */
  function renderDone() {
    var fr = roleDoneSel ? roleDoneSel.value : '', ft = typeDoneSel ? typeDoneSel.value : '';
    var rows = D.APPS.filter(function (a) {
      if (a.status !== 'granted' && a.status !== 'cancelled') return false;
      if (fr && a.role !== fr) return false;
      if (ft && a.processType !== ft) return false;
      return true;
    });
    rows.sort(function (a, b) { return (b.procSS || 0) - (a.procSS || 0); });
    if (tabCountDoneEl) tabCountDoneEl.textContent = D.APPS.filter(function (a) { return a.status === 'granted' || a.status === 'cancelled'; }).length;
    if (emptyDoneEl) emptyDoneEl.hidden = rows.length !== 0;
    if (countDoneEl) countDoneEl.innerHTML = '<strong>' + rows.length + '</strong>件該当';

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (pageDone > totalPages) pageDone = totalPages;
    var pageRows = rows.slice((pageDone - 1) * PER_PAGE, pageDone * PER_PAGE);
    listDoneEl.innerHTML = '';
    pageRows.forEach(function (a) { listDoneEl.appendChild(makeDoneItem(a)); });
    KTN.pagination.render(pagerDoneEl, {
      page: pageDone,
      totalPages: totalPages,
      onGoto: function (p) { pageDone = p; renderDone(); },
    });
  }

  function renderAll() { renderOpen(); renderDone(); }

  function renderResetOpen() { pageOpen = 1; renderOpen(); }
  function renderResetDone() { pageDone = 1; renderDone(); }
  if (roleOpenSel) roleOpenSel.addEventListener('change', renderResetOpen);
  if (statOpenSel) statOpenSel.addEventListener('change', renderResetOpen);
  if (roleDoneSel) roleDoneSel.addEventListener('change', renderResetDone);
  if (typeDoneSel) typeDoneSel.addEventListener('change', renderResetDone);
  renderAll();

  /* ── NIDクイックオープン（審査ページへ遷移） ── */
  var nidJumpInput = document.getElementById('p902NidJumpInput');
  var nidJumpBtn   = document.getElementById('p902NidJumpBtn');
  function jumpToNid() {
    var a = D.findAppByNid(nidJumpInput ? nidJumpInput.value : '');
    if (a) location.href = 'kotennavi-p90-2-1.html?id=' + encodeURIComponent(a.id);
    else if (KTN.toast) KTN.toast('該当するNIDの申込が見つかりません');
  }
  if (nidJumpBtn) nidJumpBtn.addEventListener('click', jumpToNid);
  if (nidJumpInput) nidJumpInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); jumpToNid(); } });

  window.ktnRender = function () {};
};


KTN.pages['p90-2-1'] = function () {
  var D = P902Data();

  var params = new URLSearchParams(location.search);
  var current = D.findApp(params.get('id')) || (params.get('nid') ? D.findAppByNid(params.get('nid')) : null);

  /* ── DOM（審査ページ本体） ── */
  var statusChip = document.getElementById('p902ReviewStatus');
  var titleEl    = document.getElementById('p902ReviewTitle');
  var metaEl     = document.getElementById('p902ReviewMeta');
  var bodyEl     = document.getElementById('p902ReviewBody');
  var csvBox     = document.getElementById('p902CsvBox');
  var csvCopyBtn = document.getElementById('p902CsvCopyBtn');
  var adminNoteEl   = document.getElementById('p902AdminNote');
  var resultEl       = document.getElementById('p902ReviewResult');
  var reviewActionsEl = document.getElementById('p902ReviewActions');

  if (!current) {
    if (titleEl) titleEl.textContent = '申込が見つかりません';
    if (metaEl) metaEl.textContent = '';
    if (bodyEl) bodyEl.innerHTML = '<p>指定された申込データが見つかりませんでした。一覧から選び直してください。</p>';
    if (reviewActionsEl) reviewActionsEl.hidden = true;
    window.ktnRender = function () {};
    return;
  }

  /* 新規クリエイター・ギャラリー作成パネル */
  var createBtn       = document.getElementById('p902CreateNewBtn');
  var createPanel      = document.getElementById('p902CreatePanel');
  var createPanelTitle = document.getElementById('p902CreatePanelTitle');
  var aliasInput       = document.getElementById('p902AliasInput');
  var aliasCheckBtn    = document.getElementById('p902AliasCheckBtn');
  var aliasDupEl       = document.getElementById('p902AliasDup');
  var aliasOkEl        = document.getElementById('p902AliasOk');
  var aliasConfirmWrap = document.getElementById('p902AliasConfirmWrap');
  var aliasConfirmBtn  = document.getElementById('p902AliasConfirmBtn');
  var aliasCancelBtn   = document.getElementById('p902AliasCancelBtn');

  /* 既存クリエイター・ギャラリーのリンク付けパネル */
  var linkBtn        = document.getElementById('p902LinkExistingBtn');
  var linkPanel       = document.getElementById('p902LinkPanel');
  var nidLinkInput    = document.getElementById('p902NidLinkInput');
  var nidCheckBtn     = document.getElementById('p902NidCheckBtn');
  var nidErrorEl      = document.getElementById('p902NidError');
  var nidPreviewEl    = document.getElementById('p902NidPreview');
  var nidConfirmWrap  = document.getElementById('p902NidConfirmWrap');
  var nidConfirmBtn   = document.getElementById('p902NidConfirmBtn');
  var nidCancelBtn    = document.getElementById('p902NidCancelBtn');
  var pendingLinkNid  = null;

  /* 確認メール送信済みの小さな注記（返信待ち・procStatus:'reviewing'のまま） */
  var inquiryNoteEl = document.getElementById('p902InquiryNote');

  /* 申込者への確認メール（取消の決定前に事情を尋ねる1通） */
  var inquiryBtn       = document.getElementById('p902InquiryBtn');
  var inquiryPanel      = document.getElementById('p902InquiryPanel');
  var inquiryReasonSel  = document.getElementById('p902InquiryReasonSel');
  var inquiryFromEl     = document.getElementById('p902InquiryFrom');
  var inquirySubjectEl  = document.getElementById('p902InquirySubject');
  var inquiryBodyEl     = document.getElementById('p902InquiryBody');
  var inquiryNewRow     = document.getElementById('p902InquiryNewNameRow');
  var inquiryNewName    = document.getElementById('p902InquiryNewName');
  var inquiryNewSaveBtn = document.getElementById('p902InquiryNewSaveBtn');
  var inquirySendBtn    = document.getElementById('p902InquirySendBtn');
  var inquiryCancelBtn  = document.getElementById('p902InquiryCancelBtn');

  /* お申込みの取消（確認メールへの返信内容、または申込者からの取消希望をもとに確定） */
  var cancelFlowBtn      = document.getElementById('p902CancelFlowBtn');
  var cancelPanel         = document.getElementById('p902CancelPanel');
  var cancelReasonSel     = document.getElementById('p902CancelReasonSel');
  var cancelSendMailChk   = document.getElementById('p902CancelSendMail');
  var cancelMailFieldsEl  = document.getElementById('p902CancelMailFields');
  var cancelFromEl        = document.getElementById('p902CancelFrom');
  var cancelSubjectEl     = document.getElementById('p902CancelSubject');
  var cancelBodyEl        = document.getElementById('p902CancelBody');
  var cancelNewRow        = document.getElementById('p902CancelNewNameRow');
  var cancelNewName       = document.getElementById('p902CancelNewName');
  var cancelNewSaveBtn    = document.getElementById('p902CancelNewSaveBtn');
  var cancelBackBtn       = document.getElementById('p902CancelBackBtn');
  var cancelConfirmBtn    = document.getElementById('p902CancelConfirmBtn');

  /* ご利用開始のご案内メール（成功パターン＝処理完了後、処理結果エリアのボタンから任意タイミングで送信） */
  var grantMailPanel     = document.getElementById('p902GrantMailPanel');
  var grantTemplateSel   = document.getElementById('p902GrantTemplateSel');
  var grantFromEl        = document.getElementById('p902GrantFrom');
  var grantMailSubject   = document.getElementById('p902GrantMailSubject');
  var grantMailBody      = document.getElementById('p902GrantMailBody');
  var grantMailCancelBtn = document.getElementById('p902GrantMailCancelBtn');
  var grantMailSendBtn   = document.getElementById('p902GrantMailSendBtn');

  [inquiryFromEl, cancelFromEl, grantFromEl].forEach(function (sel) {
    if (sel) sel.innerHTML = KTN.mailFromOptionsHtml();
  });

  /* ── 操作パネルの相互排他（新規作成／既存リンクは同時に1つだけ開く） ── */
  function resetFlowPanels() {
    if (createPanel) createPanel.hidden = true;
    if (aliasInput) aliasInput.value = '';
    if (aliasDupEl) aliasDupEl.hidden = true;
    if (aliasOkEl) aliasOkEl.hidden = true;
    if (aliasConfirmWrap) aliasConfirmWrap.hidden = true;
    if (aliasInput) aliasInput.disabled = false;
    if (aliasCheckBtn) aliasCheckBtn.disabled = false;
    if (aliasCancelBtn) aliasCancelBtn.disabled = false;

    if (linkPanel) linkPanel.hidden = true;
    if (nidLinkInput) nidLinkInput.value = '';
    if (nidErrorEl) nidErrorEl.hidden = true;
    if (nidPreviewEl) nidPreviewEl.hidden = true;
    if (nidConfirmWrap) nidConfirmWrap.hidden = true;
    if (nidLinkInput) nidLinkInput.disabled = false;
    if (nidCheckBtn) nidCheckBtn.disabled = false;
    if (nidCancelBtn) nidCancelBtn.disabled = false;
    pendingLinkNid = null;

    if (inquiryPanel) inquiryPanel.hidden = true;
    if (inquiryReasonSel) inquiryReasonSel.value = 'input-error';
    if (inquiryBodyEl) inquiryBodyEl.value = '';

    if (cancelPanel) cancelPanel.hidden = true;
    if (cancelReasonSel) cancelReasonSel.value = 'input-error';
    if (cancelSendMailChk) cancelSendMailChk.checked = false;
    if (cancelBodyEl) cancelBodyEl.value = '';

    if (grantMailPanel) grantMailPanel.hidden = true;
    if (grantMailBody) grantMailBody.value = '';

    if (reviewActionsEl) reviewActionsEl.hidden = false;
  }
  function closeActionPanels() {
    if (createPanel) createPanel.hidden = true;
    if (linkPanel) linkPanel.hidden = true;
    if (inquiryPanel) inquiryPanel.hidden = true;
    if (cancelPanel) cancelPanel.hidden = true;
    if (grantMailPanel) grantMailPanel.hidden = true;
  }

  /* ── 審査ページ本体の描画（旧openReviewModal相当・モーダル開閉なし） ── */
  function renderReview() {
    var a = current;
    var st = D.STATUS[a.status];
    if (statusChip) { statusChip.className = 'ktn-review-status ktn-review-status--' + st.cls; statusChip.textContent = st.label; }
    if (titleEl) titleEl.textContent = D.ROLE_LABEL[a.role] + '機能申込';
    if (metaEl) metaEl.innerHTML = '申込日時：' + a.submitted + ' ・ 申込NID：' + a.nid + ' ・ 申込種別：' + D.ROLE_LABEL[a.role] +
      '<br>UID：' + a.uid + ' ・ ログインメールアドレス：' + a.email;
    if (bodyEl) bodyEl.innerHTML = D.buildBody(a);

    /* 入力内容CSV */
    var csv = D.buildCsv(a);
    if (csvBox) csvBox.value = csv;
    if (csvCopyBtn) csvCopyBtn.dataset.copy = csv;

    /* 確認メール送信済みの小さな注記（返信待ち） */
    if (inquiryNoteEl) {
      if (a.inquiry) {
        inquiryNoteEl.hidden = false;
        inquiryNoteEl.innerHTML = '<strong>確認メール送信済み</strong>'
          + '<span class="p902-inquiry-note__meta">'
          + '<span class="p902-inquiry-note__meta-item"><span class="p902-inquiry-note__meta-label">送信日時</span><span class="p902-inquiry-note__meta-value">' + a.inquiry.date + '</span></span>'
          + '<span class="p902-inquiry-note__meta-item"><span class="p902-inquiry-note__meta-label">種別</span><span class="p902-inquiry-note__meta-value">' + (D.CANCEL_REASON_LABEL[a.inquiry.reason] || '') + '</span></span>'
          + '</span>';
      } else {
        inquiryNoteEl.hidden = true;
        inquiryNoteEl.innerHTML = '';
      }
    }

    if (adminNoteEl) adminNoteEl.value = a.adminNote || '';

    /* 処理結果（処理完了の申込のみ・末尾に表示） */
    if (resultEl) {
      if (a.status === 'pending') { resultEl.hidden = true; resultEl.innerHTML = ''; }
      else { resultEl.hidden = false; resultEl.innerHTML = D.buildResult(a); }
    }

    resetFlowPanels();

    /* 処理済みの申込は結果を表示するのみ（操作ボタンは出さない） */
    if (createBtn) { createBtn.hidden = a.status !== 'pending'; createBtn.textContent = '新規' + D.ROLE_LABEL[a.role] + '作成'; }
    if (linkBtn) { linkBtn.hidden = a.status !== 'pending'; linkBtn.textContent = '既存' + D.ROLE_LABEL[a.role] + 'のリンク付け'; }
    if (inquiryBtn) inquiryBtn.hidden = a.status !== 'pending';
    if (cancelFlowBtn) cancelFlowBtn.hidden = a.status !== 'pending';
  }
  renderReview();

  if (adminNoteEl) adminNoteEl.addEventListener('input', function () {
    if (!current) return;
    current.adminNote = adminNoteEl.value;
    D.saveOverride(current);
  });

  /* ── 利用開始の確定（新規作成／既存リンク共通の終着処理） ── */
  function finishGranted(linkedPage, processType) {
    if (!current) return;
    current.status = 'granted';
    current.procStatus = null;
    current.grantedDate = D.todayLabel();
    current.processType = processType || null;
    current.procSS = D.todaySS();
    current.linkedPage = linkedPage || null;
    D.saveOverride(current);
    var st = D.STATUS['granted'];
    if (statusChip) { statusChip.className = 'ktn-review-status ktn-review-status--' + st.cls; statusChip.textContent = st.label; }
    if (bodyEl) bodyEl.innerHTML = D.buildBody(current);
    if (resultEl) { resultEl.hidden = false; resultEl.innerHTML = D.buildResult(current); }
    /* 処理結果に完了メッセージ・NID・ページリンクを表示するため、入力パネル（alias/NID欄）はもう不要 */
    if (createPanel) createPanel.hidden = true;
    if (linkPanel) linkPanel.hidden = true;
    if (createBtn) createBtn.hidden = true;
    if (linkBtn) linkBtn.hidden = true;
    if (inquiryBtn) inquiryBtn.hidden = true;
    if (cancelFlowBtn) cancelFlowBtn.hidden = true;
    if (reviewActionsEl) reviewActionsEl.hidden = false;
  }

  /* ── お申込みの取消（確認メールへの返信内容、または申込者からの取消希望をもとに確定） ── */
  function finishCancelled(reason, emailSent) {
    if (!current) return;
    current.status = 'cancelled';
    current.procStatus = null;
    current.grantedDate = D.todayLabel();
    current.processType = 'cancel';
    current.procSS = D.todaySS();
    current.cancelReason = reason || 'other';
    current.cancelEmailSent = !!emailSent;
    current.inquiry = null;
    D.saveOverride(current);
    var st = D.STATUS['cancelled'];
    if (statusChip) { statusChip.className = 'ktn-review-status ktn-review-status--' + st.cls; statusChip.textContent = st.label; }
    if (inquiryNoteEl) { inquiryNoteEl.hidden = true; inquiryNoteEl.innerHTML = ''; }
    if (bodyEl) bodyEl.innerHTML = D.buildBody(current);
    if (resultEl) { resultEl.hidden = false; resultEl.innerHTML = D.buildResult(current); }
    if (createPanel) createPanel.hidden = true;
    if (linkPanel) linkPanel.hidden = true;
    if (inquiryPanel) inquiryPanel.hidden = true;
    if (cancelPanel) cancelPanel.hidden = true;
    if (createBtn) createBtn.hidden = true;
    if (linkBtn) linkBtn.hidden = true;
    if (inquiryBtn) inquiryBtn.hidden = true;
    if (cancelFlowBtn) cancelFlowBtn.hidden = true;
    if (reviewActionsEl) reviewActionsEl.hidden = false;
  }

  /* ── 新規クリエイター・ギャラリー作成 ── */
  if (createBtn) createBtn.addEventListener('click', function () {
    if (!current) return;
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = true;
    if (createPanelTitle) createPanelTitle.textContent = '新規' + D.ROLE_LABEL[current.role] + 'ページの作成';
    if (createPanel) createPanel.hidden = false;
    /* alias候補を自動入力（a2＝早川蓮は候補'hayakawa-ren'がALIAS_TAKENと一致するため、そのまま確認するとエラーになる） */
    if (aliasInput) aliasInput.value = D.suggestAlias(current);
    if (aliasInput) aliasInput.focus();
  });
  if (aliasCancelBtn) aliasCancelBtn.addEventListener('click', function () {
    closeActionPanels();
    if (aliasInput) aliasInput.value = '';
    if (aliasDupEl) aliasDupEl.hidden = true;
    if (aliasOkEl) aliasOkEl.hidden = true;
    if (aliasConfirmWrap) aliasConfirmWrap.hidden = true;
    if (reviewActionsEl) reviewActionsEl.hidden = false;
  });
  if (aliasCheckBtn) aliasCheckBtn.addEventListener('click', function () {
    var v = aliasInput ? aliasInput.value.trim() : '';
    if (aliasDupEl) aliasDupEl.hidden = true;
    if (aliasOkEl) aliasOkEl.hidden = true;
    if (aliasConfirmWrap) aliasConfirmWrap.hidden = true;
    if (!v) { if (KTN.toast) KTN.toast('aliasを入力してください'); return; }
    if (!/^[a-z0-9-]+$/.test(v)) {
      if (aliasDupEl) { aliasDupEl.hidden = false; aliasDupEl.textContent = 'aliasは半角英数字・ハイフンのみで入力してください。'; }
      return;
    }
    if (D.ALIAS_TAKEN.indexOf(v) !== -1) {
      var suggestion = v + '-2';
      while (D.ALIAS_TAKEN.indexOf(suggestion) !== -1) suggestion = suggestion + '-2';
      if (aliasDupEl) {
        aliasDupEl.hidden = false;
        aliasDupEl.innerHTML = 'そのaliasは既に使われています。例：<strong>' + suggestion + '</strong>';
      }
    } else {
      if (aliasOkEl) { aliasOkEl.hidden = false; aliasOkEl.textContent = '「' + v + '」は使用できます。'; }
      if (aliasConfirmWrap) aliasConfirmWrap.hidden = false;
    }
  });
  if (aliasConfirmBtn) aliasConfirmBtn.addEventListener('click', function () {
    if (!current) return;
    var v = aliasInput ? aliasInput.value.trim() : '';
    if (!v) return;
    D.ALIAS_TAKEN.push(v);
    var nid = D.genNid();
    var kind = current.role;
    var url = (kind === 'creator' ? 'kotennavi-p3.html?c=' : 'kotennavi-p4.html?g=') + v;
    var linkedPage = { name: current.name, url: url, nid: nid, kind: kind };
    finishGranted(linkedPage, 'new');
    if (KTN.toast) KTN.toast('新規ページを作成し、利用を開始しました（デモ）');
  });

  /* ── 既存クリエイター・ギャラリーのリンク付け ── */
  if (linkBtn) linkBtn.addEventListener('click', function () {
    if (!current) return;
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = true;
    if (linkPanel) linkPanel.hidden = false;
    /* OKパターンのデモ：既存ページ申告に対応するNIDが分かっている申込は自動入力し、確認するボタン1つで成功例を再現できるようにする */
    if (nidLinkInput) nidLinkInput.value = D.DEMO_LINK_NID[current.id] || '';
    if (nidLinkInput) nidLinkInput.focus();
  });
  if (nidCancelBtn) nidCancelBtn.addEventListener('click', function () {
    closeActionPanels();
    if (nidLinkInput) nidLinkInput.value = '';
    if (nidErrorEl) nidErrorEl.hidden = true;
    if (nidPreviewEl) nidPreviewEl.hidden = true;
    if (nidConfirmWrap) nidConfirmWrap.hidden = true;
    pendingLinkNid = null;
    if (reviewActionsEl) reviewActionsEl.hidden = false;
  });
  if (nidCheckBtn) nidCheckBtn.addEventListener('click', function () {
    if (!current) return;
    var v = nidLinkInput ? nidLinkInput.value.trim() : '';
    if (nidErrorEl) nidErrorEl.hidden = true;
    if (nidPreviewEl) nidPreviewEl.hidden = true;
    if (nidConfirmWrap) nidConfirmWrap.hidden = true;
    pendingLinkNid = null;
    if (!v) { if (KTN.toast) KTN.toast('NIDを入力してください'); return; }
    var page = D.EXISTING_PAGES[v];
    if (!page) {
      if (nidErrorEl) { nidErrorEl.hidden = false; nidErrorEl.textContent = '該当するページが見つかりません。NIDをご確認ください。'; }
      return;
    }
    if (page.kind !== current.role) {
      if (nidErrorEl) { nidErrorEl.hidden = false; nidErrorEl.textContent = 'このページは' + D.ROLE_LABEL[page.kind] + 'ページのため、' + D.ROLE_LABEL[current.role] + 'の申込とはリンクできません。'; }
      return;
    }
    pendingLinkNid = v;
    if (nidPreviewEl) {
      nidPreviewEl.hidden = false;
      nidPreviewEl.innerHTML = '<strong>' + page.name + '</strong>（' + v + '）・' + page.meta;
    }
    if (nidConfirmWrap) nidConfirmWrap.hidden = false;
  });
  if (nidConfirmBtn) nidConfirmBtn.addEventListener('click', function () {
    if (!current || !pendingLinkNid) return;
    var page = D.EXISTING_PAGES[pendingLinkNid];
    if (!page) return;
    var linkedPage = { name: page.name, url: page.url, nid: pendingLinkNid, kind: page.kind };
    finishGranted(linkedPage, 'link');
    if (KTN.toast) KTN.toast('既存ページにリンクし、利用を開始しました（デモ）');
  });

  /* ── 申込者への確認メール（取消の決定前に事情を尋ねる1通・テンプレート選択＋その場での新規追加に対応） ── */
  function loadInquiryTemplate(variantKey) {
    if (!current) return;
    if (variantKey === '__new__') {
      if (inquiryNewRow) inquiryNewRow.hidden = false;
      return;
    }
    if (inquiryNewRow) inquiryNewRow.hidden = true;
    var t = D.findTemplate(variantKey);
    if (!t) return;
    if (inquiryFromEl) inquiryFromEl.value = t.from;
    var tokens = D.tplTokens(current);
    if (inquirySubjectEl) inquirySubjectEl.value = D.applyTokens(t.subject, tokens);
    if (inquiryBodyEl) inquiryBodyEl.value = D.applyTokens(t.body, tokens);
  }
  if (inquiryBtn) inquiryBtn.addEventListener('click', function () {
    if (!current) return;
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = true;
    D.populateReasonSelect(inquiryReasonSel, 'confirm-');
    if (inquiryReasonSel) inquiryReasonSel.value = 'confirm-input-error';
    loadInquiryTemplate('confirm-input-error');
    if (inquiryPanel) inquiryPanel.hidden = false;
  });
  if (inquiryReasonSel) inquiryReasonSel.addEventListener('change', function () {
    loadInquiryTemplate(inquiryReasonSel.value);
  });
  if (inquiryNewSaveBtn) inquiryNewSaveBtn.addEventListener('click', function () {
    if (!current || !inquiryNewName) return;
    var name = inquiryNewName.value.trim();
    if (!name) { if (KTN.toast) KTN.toast('テンプレート名を入力してください'); return; }
    var t = D.addCustomTemplate('abnormal', 'confirm', name, inquirySubjectEl ? inquirySubjectEl.value : '', inquiryBodyEl ? inquiryBodyEl.value : '');
    D.populateReasonSelect(inquiryReasonSel, 'confirm-');
    if (inquiryReasonSel) inquiryReasonSel.value = t.variantKey;
    if (inquiryNewRow) inquiryNewRow.hidden = true;
    inquiryNewName.value = '';
    if (KTN.toast) KTN.toast('新しいテンプレートを追加しました（デモ）');
  });
  if (inquiryCancelBtn) inquiryCancelBtn.addEventListener('click', function () {
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = false;
  });
  if (inquirySendBtn) inquirySendBtn.addEventListener('click', function () {
    if (!current) return;
    var reasonKey = inquiryReasonSel ? D.bareReasonKey(inquiryReasonSel.value) || 'input-error' : 'input-error';
    current.inquiry = { reason: reasonKey, date: D.todayLabel() };
    D.saveOverride(current);
    if (inquiryNoteEl) {
      inquiryNoteEl.hidden = false;
      inquiryNoteEl.innerHTML = '<strong>確認メール送信済み</strong>'
        + '<span class="p902-inquiry-note__meta">'
        + '<span class="p902-inquiry-note__meta-item"><span class="p902-inquiry-note__meta-label">送信日時</span><span class="p902-inquiry-note__meta-value">' + current.inquiry.date + '</span></span>'
        + '<span class="p902-inquiry-note__meta-item"><span class="p902-inquiry-note__meta-label">種別</span><span class="p902-inquiry-note__meta-value">' + (D.CANCEL_REASON_LABEL[current.inquiry.reason] || '') + '</span></span>'
        + '</span>';
    }
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = false;
    if (KTN.toast) KTN.toast('確認メールを送信しました（デモ）');
  });

  /* ── お申込みの取消（テンプレート選択＋その場での新規追加に対応） ── */
  function loadCancelTemplate(variantKey) {
    if (!current) return;
    if (variantKey === '__new__') {
      if (cancelNewRow) cancelNewRow.hidden = false;
      return;
    }
    if (cancelNewRow) cancelNewRow.hidden = true;
    var t = D.findTemplate(variantKey);
    if (!t) return;
    if (cancelFromEl) cancelFromEl.value = t.from;
    var tokens = D.tplTokens(current);
    if (cancelSubjectEl) cancelSubjectEl.value = D.applyTokens(t.subject, tokens);
    if (cancelBodyEl) cancelBodyEl.value = D.applyTokens(t.body, tokens);
  }
  if (cancelFlowBtn) cancelFlowBtn.addEventListener('click', function () {
    if (!current) return;
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = true;
    D.populateReasonSelect(cancelReasonSel, 'cancel-');
    var defaultReason = current.inquiry ? current.inquiry.reason : 'input-error';
    if (cancelReasonSel) cancelReasonSel.value = 'cancel-' + defaultReason;
    if (cancelSendMailChk) cancelSendMailChk.checked = false;
    if (cancelMailFieldsEl) cancelMailFieldsEl.hidden = false;
    if (cancelNewRow) cancelNewRow.hidden = true;
    loadCancelTemplate(cancelReasonSel ? cancelReasonSel.value : 'cancel-input-error');
    if (cancelPanel) cancelPanel.hidden = false;
  });
  if (cancelReasonSel) cancelReasonSel.addEventListener('change', function () {
    loadCancelTemplate(cancelReasonSel.value);
  });
  if (cancelNewSaveBtn) cancelNewSaveBtn.addEventListener('click', function () {
    if (!current || !cancelNewName) return;
    var name = cancelNewName.value.trim();
    if (!name) { if (KTN.toast) KTN.toast('テンプレート名を入力してください'); return; }
    var t = D.addCustomTemplate('abnormal', 'cancel', name, cancelSubjectEl ? cancelSubjectEl.value : '', cancelBodyEl ? cancelBodyEl.value : '');
    D.populateReasonSelect(cancelReasonSel, 'cancel-');
    if (cancelReasonSel) cancelReasonSel.value = t.variantKey;
    if (cancelNewRow) cancelNewRow.hidden = true;
    cancelNewName.value = '';
    if (KTN.toast) KTN.toast('新しいテンプレートを追加しました（デモ）');
  });
  if (cancelBackBtn) cancelBackBtn.addEventListener('click', function () {
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = false;
  });
  if (cancelConfirmBtn) cancelConfirmBtn.addEventListener('click', function () {
    if (!current) return;
    var reason = cancelReasonSel ? (D.bareReasonKey(cancelReasonSel.value) || 'other') : 'other';
    var emailSent = cancelSendMailChk ? cancelSendMailChk.checked : false;
    finishCancelled(reason, emailSent);
    if (KTN.toast) KTN.toast('お申込みを取消しました（デモ）');
  });

  /* ── ご利用開始のご案内メール（成功パターン・処理結果エリアのボタンから起動。テンプレート選択に対応） ──
     ボタンはbuildResult()の都度innerHTMLで再生成されるためresultEl側でイベント委譲する */
  function defaultGrantVariantKey(a) {
    return a.role + '-' + (a.processType === 'link' ? 'link' : 'new');
  }
  function loadGrantTemplate(variantKey) {
    if (!current) return;
    var t = D.findTemplate(variantKey);
    if (!t) return;
    if (grantFromEl) grantFromEl.value = t.from;
    var tokens = D.tplTokens(current);
    if (grantMailSubject) grantMailSubject.value = D.applyTokens(t.subject, tokens);
    if (grantMailBody) grantMailBody.value = D.applyTokens(t.body, tokens);
  }
  if (resultEl) resultEl.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('#p902GrantMailBtn') : null;
    if (!btn || !current) return;
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = true;
    if (grantTemplateSel) {
      grantTemplateSel.innerHTML = D.templatesByPattern('normal').map(function (t) {
        return '<option value="' + t.variantKey + '">' + t.name + '</option>';
      }).join('');
      grantTemplateSel.value = defaultGrantVariantKey(current);
      loadGrantTemplate(grantTemplateSel.value);
    } else {
      loadGrantTemplate(defaultGrantVariantKey(current));
    }
    if (grantMailPanel) grantMailPanel.hidden = false;
  });
  if (grantTemplateSel) grantTemplateSel.addEventListener('change', function () {
    loadGrantTemplate(grantTemplateSel.value);
  });
  if (grantMailCancelBtn) grantMailCancelBtn.addEventListener('click', function () {
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = false;
  });
  if (grantMailSendBtn) grantMailSendBtn.addEventListener('click', function () {
    if (!current) return;
    current.grantMailSent = true;
    current.grantMailDate = D.todayLabel();
    D.saveOverride(current);
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = false;
    if (resultEl) resultEl.innerHTML = D.buildResult(current);
    if (KTN.toast) KTN.toast('ご利用開始のご案内メールを送信しました（デモ）');
  });

  window.ktnRender = function () {};
};


/* ════════════════════════════════════════════════════
   P90-11 共有データ  管理者-リエゾンプラス機能申込管理
   P11-4（LIAISON+機能申込）から届いた申込を一覧（P90-11）・審査サブページ（P90-11-1）で
   共有するデータ・ヘルパー。P90-2/P90-2-1のP902Data()と同じ分割パターン（モーダル→サブページ化・2026-08-09）。
   ここで扱うのは事務局側の本人確認（Step1）のみ。Step2（Stripeオンボーディング）は
   Stripe側の自動審査のため個別の管理者レビュー対象外＝この画面での操作はない
   （granted＝「本人確認OK・Stripe手続きへ進める」の意味で、即「利用開始」ではない）。
   一覧骨格・審査ページは P90-2 の .p319-* / .p902-review-* / .ktn-review-status をそのまま再利用。
   申込者はP11-2/P11-3と異なりすでにcreator/galleryページを保有しているため、
   P90-2の「オーナー未設定ページ紐付け」（KTN.linkCombo）は対象外＝既存ページへの直接リンクのみ表示する。
════════════════════════════════════════════════════ */
function P9011Data() {

  var STATUS = {
    pending:   { label: '確認中',     cls: 'pending' },
    granted:   { label: '本人確認OK', cls: 'granted' },
    cancelled: { label: '取消',       cls: 'cancelled' },
  };
  var ROLE_LABEL = { creator: 'クリエイター', gallery: 'ギャラリー' };
  var STRIPE_LABEL = { not_started: '未着手', in_progress: '手続き中', completed: '完了・利用中' };
  var STRIPE_CLS   = { not_started: 'pending', in_progress: 'pending', completed: 'granted' };

  /* ── 「確認中」の内訳（一覧のステータス表示に"何を確認しているか"を出すための短い名詞ラベル）──
     本フローに差し戻し（returned）は無い。確認事項が残る申込はpendingのまま扱い、確認メール送信済みなら
     inquiry.reasonを、未送信ならreviewReasonを参照する（P902Dataと同パターン）。
     取消（cancelled）の理由も同じ枠を共有する（confirm-*で尋ねた内容がそのままcancel-*の理由になるため、
     P902Dataと異なりCANCEL_REASON_LABELを別オブジェクトにせずエイリアスする・2026-08-11）。 */
  var REVIEW_REASON_LABEL = {
    'document-unclear': '本人確認書類が不鮮明',
    'info-mismatch':    '登録情報との不一致',
    'resp-info':        '責任者情報の不備',
    'missing-fields':   '必須項目の不足',
    'other':            'その他',
  };
  var CANCEL_REASON_LABEL = REVIEW_REASON_LABEL;

  /* 本人確認書類のダミー画像（確認中のみ表示。実ファイルは持たず.ec__poster等と同じグラデーションdivで代替） */
  var KYC_DOC_DEMO = [
    { label: '本人確認書類（表面）', g: '#d8d0c0,#a89878' },
    { label: '本人確認書類（裏面）', g: '#c8d0d8,#8898a8' },
  ];

  /* ── メールテンプレート（案内・確認・取消／P90-9〔メールテンプレート管理〕でP902Dataと同様にvariantKey単位で
     一元管理する。P90-9とはページ間のデータ連携がないため、同内容を本関数のローカル配列としても保持する
     〔docs/mail-template-system.md 1章〕。本フローに差し戻しは無いため、非正常系は「申込者に確認する」メール
     （confirm-*）と「取消のご連絡」メール（cancel-*・P902Dataのcancel-*と同じ役割）を持つ（2026-08-11 取消追加）。 */
  var MAIL_INVITE_SUBJECT = '【個展なび】LIAISON+のご利用にあたり、本人確認の続きをお願いします';
  var MAIL_INVITE_BODY =
    '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
    'ご提出いただいた本人確認書類の内容を確認いたしました。\n\n' +
    '引き続き、Stripeでの本人確認手続き（Step2）にお進みください。\n　{{pageUrl}}\n\n' +
    'Step2の手続きが完了すると、LIAISON+のご利用（作品販売）が開始されます。\n\n{{commonFooter}}';
  var MAIL_CANCEL_BODY_STD =
    '{{userName}} 様\n\n個展なび事務局です。\nご連絡いただきありがとうございました。\n' +
    'いただいた内容を確認し、今回の{{roleName}}機能のお申込み（申込NID：{{applyId}}）は取消とさせていただきました。\n\n' +
    '改めてお申込みをご希望の場合は、お手数ですが再度お申込みフォームよりお手続きください。\n\n{{commonFooter}}';

  /* screenId='p90-11'のP90-9デモ配列と同内容（idはページ間で不一致でよい＝variantKeyのみが送信画面との対応キー） */
  var MAIL_TEMPLATES = [
    { id: 'mt-p9011-1', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'normal', variantKey: 'invite', from: 'liaison@koten-navi.com',
      name: '本人確認OKのご案内（Step2へ）', subject: MAIL_INVITE_SUBJECT, body: MAIL_INVITE_BODY,
      status: 'active', usageNote: '本人確認OKにした後、処理結果エリアのボタンから任意タイミングで送る。', updatedAt: '2026.8.10' },
    { id: 'mt-p9011-2', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'abnormal', variantKey: 'confirm-document-unclear', from: 'inquiry@koten-navi.com',
      name: '本人確認書類が不鮮明', subject: '【個展なび】本人確認書類について確認のお願い（LIAISON+機能お申込み）',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        'ご提出いただいた本人確認書類の内容を確認したところ、画像が不鮮明なため氏名・住所・生年月日を確認できませんでした。\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、鮮明な画像を再度ご提出いただけますと幸いです。\nご提出いただき次第、あらためて内容を確認いたします。\n\n{{commonFooter}}',
      status: 'active', usageNote: '本人確認書類の画像が不鮮明で内容を確認できない時に送る。', updatedAt: '2026.8.10' },
    { id: 'mt-p9011-3', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'abnormal', variantKey: 'confirm-info-mismatch', from: 'inquiry@koten-navi.com',
      name: '登録情報と書類の不一致', subject: '【個展なび】ご登録情報と本人確認書類について確認のお願い（LIAISON+機能お申込み）',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        'ご登録いただいた情報と、ご提出いただいた本人確認書類に記載の内容が一致しない箇所がございました。\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、現在の情報が確認できる書類とあわせてご回答いただけますと幸いです。\n\n{{commonFooter}}',
      status: 'active', usageNote: '登録情報と本人確認書類の記載内容が一致しない時に送る。', updatedAt: '2026.8.10' },
    { id: 'mt-p9011-4', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'abnormal', variantKey: 'confirm-resp-info', from: 'inquiry@koten-navi.com',
      name: '責任者情報の不備（ギャラリーのみ）', subject: '【個展なび】責任者情報について確認のお願い（LIAISON+機能お申込み）',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        'ご登録いただいた責任者情報の内容に不備があり、本人確認を進められない状態です。\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、責任者情報の不足箇所についてご回答いただけますと幸いです。\n\n{{commonFooter}}',
      status: 'active', usageNote: 'ギャラリーの責任者情報に不備がある時に送る。', updatedAt: '2026.8.10' },
    { id: 'mt-p9011-5', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'abnormal', variantKey: 'confirm-missing-fields', from: 'inquiry@koten-navi.com',
      name: '必須項目の未入力・記載不足', subject: '【個展なび】お申込み内容について確認のお願い（LIAISON+機能お申込み）',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        '必須項目に未入力・記載不足の箇所があり、本人確認を進められない状態です。\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、不足箇所についてご回答いただけますと幸いです。\n\n{{commonFooter}}',
      status: 'active', usageNote: '必須項目の未入力・記載不足がある時に送る。', updatedAt: '2026.8.10' },
    { id: 'mt-p9011-6', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'abnormal', variantKey: 'confirm-other', from: 'inquiry@koten-navi.com',
      name: 'その他', subject: '【個展なび】お申込み内容について確認のお願い（LIAISON+機能お申込み）',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        '下記の点についてご確認をお願いしたく、ご連絡いたしました。\n\n' +
        '──────────────────────────────\n 確認事項：（ここに具体的な内容を記載してください）\n──────────────────────────────\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にてご回答いただけますと幸いです。\n\n{{commonFooter}}',
      status: 'active', usageNote: '上記に当てはまらない理由で確認する時に送る。', updatedAt: '2026.8.10' },
    { id: 'mt-p9011-7', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'abnormal', variantKey: 'cancel-document-unclear', from: 'liaison@koten-navi.com',
      name: '本人確認書類が不鮮明', subject: '【個展なび】LIAISON+機能のお申込みの取消について', body: MAIL_CANCEL_BODY_STD,
      status: 'active', usageNote: '本人確認書類の再提出依頼への返信・未返信を理由に取消を確定した時に送る（送信は任意）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-8', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'abnormal', variantKey: 'cancel-info-mismatch', from: 'liaison@koten-navi.com',
      name: '登録情報と書類の不一致', subject: '【個展なび】LIAISON+機能のお申込みの取消について', body: MAIL_CANCEL_BODY_STD,
      status: 'active', usageNote: '登録情報と本人確認書類の不一致を理由に取消を確定した時に送る（送信は任意）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-9', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'abnormal', variantKey: 'cancel-resp-info', from: 'liaison@koten-navi.com',
      name: '責任者情報の不備（ギャラリーのみ）', subject: '【個展なび】LIAISON+機能のお申込みの取消について', body: MAIL_CANCEL_BODY_STD,
      status: 'active', usageNote: 'ギャラリーの責任者情報の不備を理由に取消を確定した時に送る（送信は任意）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-10', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'abnormal', variantKey: 'cancel-missing-fields', from: 'liaison@koten-navi.com',
      name: '必須項目の未入力・記載不足', subject: '【個展なび】LIAISON+機能のお申込みの取消について', body: MAIL_CANCEL_BODY_STD,
      status: 'active', usageNote: '必須項目の未入力・記載不足を理由に取消を確定した時に送る（送信は任意）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-11', screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理', pattern: 'abnormal', variantKey: 'cancel-other', from: 'liaison@koten-navi.com',
      name: 'その他', subject: '【個展なび】LIAISON+機能のお申込みの取消について', body: MAIL_CANCEL_BODY_STD,
      status: 'active', usageNote: '上記に当てはまらない理由で取消を確定した時に送る（送信は任意）。', updatedAt: '2026.8.11' },
  ];

  function tplTokens(a) {
    return {
      userName: a.name,
      roleName: ROLE_LABEL[a.role],
      applyId: a.nid,
      pageUrl: 'kotennavi-p11-4.html',
      commonFooter: 'お問い合わせ：https://koten-navi.com/contact',
    };
  }
  function applyTokens(text, tokens) {
    return (text || '').replace(/\{\{(\w+)\}\}/g, function (m, key) {
      return Object.prototype.hasOwnProperty.call(tokens, key) ? tokens[key] : m;
    });
  }
  function findTemplate(variantKey) {
    for (var i = 0; i < MAIL_TEMPLATES.length; i++) {
      if (MAIL_TEMPLATES[i].variantKey === variantKey && MAIL_TEMPLATES[i].status === 'active') return MAIL_TEMPLATES[i];
    }
    return null;
  }
  function templatesByPattern(pattern) {
    return MAIL_TEMPLATES.filter(function (t) { return t.status === 'active' && t.pattern === pattern; });
  }
  function templatesByPrefix(prefix) {
    return MAIL_TEMPLATES.filter(function (t) { return t.status === 'active' && t.variantKey.indexOf(prefix) === 0; });
  }
  /* 確認理由・取消理由はREVIEW_REASON_LABEL（=CANCEL_REASON_LABEL）と同じ枠を共有するため、
     variantKeyのprefixを外した裸のキーで登録・参照する（P902Dataのbareキー方式と同パターン） */
  function bareReasonKey(variantKey) {
    return (variantKey || '').replace(/^(confirm|cancel)-/, '');
  }
  /* 選択肢の末尾に「＋ 新しいテンプレートとして追加」を付けてプルダウンを再構成する */
  function populateReasonSelect(sel, prefix) {
    if (!sel) return;
    var items = templatesByPrefix(prefix);
    sel.innerHTML = items.map(function (t) {
      return '<option value="' + t.variantKey + '">' + t.name + '</option>';
    }).join('') + '<option value="__new__">＋ 新しいテンプレートとして追加</option>';
  }
  /* 送信パネルでその場に追加するカスタムテンプレート（P90-9とは非同期のローカル配列に追加するのみ・デモ） */
  function addCustomTemplate(pattern, prefix, name, subject, body) {
    var t = {
      id: 'mt-p9011-custom-' + Date.now(), screenId: 'p90-11', screenLabel: 'リエゾンプラス機能申込管理',
      pattern: pattern, variantKey: prefix + '-' + Date.now(), name: name, subject: subject, body: body,
      status: 'active', usageNote: '管理者がP90-11-1の送信パネルからその場で追加', updatedAt: todayLabel(),
    };
    MAIL_TEMPLATES.push(t);
    return t;
  }

  /* ── サンプル申込データ ──
     creator の kyc は P3-11（クリエイター基本情報）からの読み込み＝申込時点では編集不可。
     gallery の resp（責任者情報）はギャラリー基本情報のご担当者と別人の場合があるため申込ごとに収集。 */
  var APPS = [
    { id: 'a1', role: 'creator', status: 'granted', nid: 'N-61200', uid: 'U-10022', email: 'tanaka.toru@example.com',
      name: '田中 透', kana: 'たなか とおる', genre: '絵画・現代美術', existingUrl: 'kotennavi-p3.html', existingNid: 'N-30044',
      priceRange: '¥100,000 〜 ¥300,000', exhibitionScale: '3〜5回', purpose: 'オンラインで購入希望者を把握したい。',
      shipPref: '東京都', invoiceNumber: 'T1234567890123',
      kyc: { realName: '田中 透', realNameKana: 'たなか とおる', birth: '1985.2.14', zip: '150-0002', pref: '東京都', addr: '渋谷区渋谷X-X-X', tel: '090-XXXX-XXXX' },
      submitted: '2025.9.10 10:32', ss: 20250910,
      adminNote: '本人確認書類確認済み。', grantedDate: '2025.9.14 10:05', stripeStatus: 'completed',
      inviteMailSent: true, inviteMailDate: '2025.9.14 10:10' },
    { id: 'a2', role: 'gallery', status: 'granted', nid: 'N-61180', uid: 'U-10025', email: 'info@gallery-soil.example',
      name: 'Gallery SOIL 渋谷', kana: 'ギャラリーソイル しぶや', nameEn: 'Gallery SOIL Shibuya', genre: '現代美術', existingUrl: 'kotennavi-p4.html', existingNid: 'N-30061',
      priceRange: '¥100,000 〜 ¥300,000', exhibitionScale: '6〜10回', purpose: '来場できない遠方のコレクターに対応したい。',
      shipPref: '東京都', invoiceNumber: 'T9876543210123',
      resp: { name: '佐藤 健一', kana: 'サトウ ケンイチ', relation: '代表者・経営者', corpNumber: '', birth: '1978.4.2', zip: '150-0021', pref: '東京都', addr: '渋谷区恵比寿X-X-X SOILビル', tel: '03-XXXX-XXXX' },
      submitted: '2025.9.5 14:08', ss: 20250905,
      adminNote: '責任者本人確認書類確認済み。', grantedDate: '2025.9.9 15:30', stripeStatus: 'completed',
      inviteMailSent: true, inviteMailDate: '2025.9.9 15:35' },
    { id: 'a3', role: 'creator', status: 'pending', nid: 'N-62240', uid: 'U-10510', email: 'morimoto.yoshino@example.com',
      name: '森本 佳乃', kana: 'もりもと よしの', genre: '染色', existingUrl: 'kotennavi-p3.html?c=morimoto-demo', existingNid: 'N-31102',
      priceRange: '¥50,000 〜 ¥100,000', exhibitionScale: '1〜2回', purpose: '',
      shipPref: '京都府', invoiceNumber: '',
      kyc: { realName: '森本 佳乃', realNameKana: 'もりもと よしの', birth: '1991.8.20', zip: '604-0022', pref: '京都府', addr: '京都市中京区X-X', tel: '080-XXXX-XXXX' },
      submitted: '2026.7.29 16:45', ss: 20260729,
      adminNote: '', grantedDate: null, stripeStatus: null },
    { id: 'a4', role: 'gallery', status: 'pending', nid: 'N-62265', uid: 'U-10515', email: 'info@bunkyo-gallery.example',
      name: '文京画廊', kana: 'ぶんきょうがろう', nameEn: 'Bunkyo Gallery', genre: '版画・工芸', existingUrl: 'kotennavi-p4.html?g=bunkyo-demo', existingNid: 'N-31145',
      priceRange: '¥50,000 〜 ¥100,000', exhibitionScale: '3〜5回', purpose: '',
      shipPref: '東京都', invoiceNumber: 'T5010001012345',
      resp: { name: '小野寺 真', kana: 'オノデラ マコト', relation: '役員', corpNumber: '5010001012345', birth: '1982.12.1', zip: '113-0033', pref: '東京都', addr: '文京区本郷X-X-X', tel: '03-XXXX-XXXX' },
      submitted: '2026.8.1 9:20', ss: 20260801,
      adminNote: '', grantedDate: null, stripeStatus: null },
    { id: 'a5', role: 'creator', status: 'pending', nid: 'N-62190', uid: 'U-10520', email: 'sakurai.sota@example.com',
      name: '桜井 蒼太', kana: 'さくらい そうた', genre: '写真', existingUrl: 'kotennavi-p3.html?c=sakurai-demo', existingNid: 'N-30890',
      priceRange: '〜 ¥10,000', exhibitionScale: '1〜2回', purpose: 'SNSのフォロワーからの購入希望に応えたい。',
      shipPref: '福岡県', invoiceNumber: '',
      kyc: { realName: '桜井 蒼太', realNameKana: 'さくらい そうた', birth: '1996.3.3', zip: '810-0001', pref: '福岡県', addr: '福岡市中央区X-X', tel: '090-XXXX-XXXX' },
      submitted: '2026.7.18 13:07', ss: 20260718,
      adminNote: 'ご提出いただいた運転免許証の画像がぼやけており、生年月日欄が確認できませんでした。鮮明な画像の再提出をお願いしています。', grantedDate: null, stripeStatus: null,
      inquiry: { reason: 'document-unclear', date: '2026.7.21 11:20' } },
    { id: 'a6', role: 'gallery', status: 'pending', nid: 'N-62110', uid: 'U-10525', email: 'contact@ren-gallery.example',
      name: 'REN GALLERY', kana: 'レンギャラリー', nameEn: 'REN GALLERY', genre: '現代美術', existingUrl: 'kotennavi-p4.html?g=ren-demo', existingNid: 'N-30755',
      priceRange: '¥50,000 〜 ¥100,000', exhibitionScale: '1〜2回', purpose: '',
      shipPref: '愛知県', invoiceNumber: '',
      resp: { name: '西田 玲', kana: 'ニシダ レイ', relation: '従業員', corpNumber: '', birth: '1990.6.6', zip: '460-0008', pref: '愛知県', addr: '名古屋市中区X-X-X', tel: '052-XXXX-XXXX' },
      submitted: '2026.7.5 11:52', ss: 20260705,
      adminNote: '責任者情報にご入力の住所と、本人確認書類（運転免許証）記載の住所が異なっていました。現住所が確認できる書類（住民票の写し等）とあわせてご提出をお願いする予定。', grantedDate: null, stripeStatus: null,
      reviewReason: 'info-mismatch' },
    { id: 'a7', role: 'creator', status: 'granted', nid: 'N-62225', uid: 'U-10530', email: 'hayasaka.mio@example.com',
      name: '早坂 澪', kana: 'はやさか みお', genre: '彫刻', existingUrl: 'kotennavi-p3.html?c=hayasaka-demo', existingNid: 'N-31200',
      priceRange: '¥300,000 〜 ¥500,000', exhibitionScale: '3〜5回', purpose: '',
      shipPref: '北海道', invoiceNumber: '',
      kyc: { realName: '早坂 澪', realNameKana: 'はやさか みお', birth: '1983.10.10', zip: '060-0001', pref: '北海道', addr: '札幌市中央区X-X-X', tel: '090-XXXX-XXXX' },
      submitted: '2026.7.26 15:38', ss: 20260726,
      adminNote: '本人確認書類確認済み。Stripe側の手続き案内を送付済み。', grantedDate: '2026.7.27 9:40', stripeStatus: 'in_progress',
      inviteMailSent: true, inviteMailDate: '2026.7.27 9:45' },
    { id: 'a8', role: 'creator', status: 'cancelled', nid: 'N-62055', uid: 'U-10508', email: 'kondo.rui@example.com',
      name: '近藤 塁', kana: 'こんどう るい', genre: '陶芸', existingUrl: 'kotennavi-p3.html?c=kondo-demo', existingNid: 'N-31088',
      priceRange: '¥50,000 〜 ¥100,000', exhibitionScale: '1〜2回', purpose: '',
      shipPref: '愛知県', invoiceNumber: '',
      kyc: { realName: '近藤 塁', realNameKana: 'こんどう るい', birth: '1993.5.19', zip: '460-0002', pref: '愛知県', addr: '名古屋市中区X-X', tel: '090-XXXX-XXXX' },
      submitted: '2026.7.10 9:15', ss: 20260710,
      adminNote: '確認メールへの返信で、本人確認書類の再提出が難しいとのご連絡があり取消としました。', grantedDate: '2026.7.16 10:20', stripeStatus: null,
      cancelReason: 'document-unclear', cancelEmailSent: true,
      inquiry: null },
  ];

  function findApp(id) {
    for (var i = 0; i < APPS.length; i++) if (APPS[i].id === id) return APPS[i];
    return null;
  }
  function dateSS(s) {
    if (!s) return 0;
    var p = s.split('.');
    return parseInt(p[0], 10) * 10000 + parseInt(p[1], 10) * 100 + parseInt(p[2], 10);
  }
  function procDate(a) {
    if (a.status === 'granted' || a.status === 'cancelled') return a.grantedDate;
    return null;
  }

  /* ── 審査サブページ（P90-11-1）での変更をsessionStorageに保存し、一覧側に反映する（P902Dataと同パターン） ── */
  var OKEY = 'ktnP9011Overrides';
  function loadOverrides() {
    try { return JSON.parse(sessionStorage.getItem(OKEY) || '{}'); } catch (e) { return {}; }
  }
  function saveOverride(app) {
    var all = loadOverrides();
    all[app.id] = { status: app.status, adminNote: app.adminNote, grantedDate: app.grantedDate, stripeStatus: app.stripeStatus, reviewReason: app.reviewReason, inquiry: app.inquiry, inviteMailSent: app.inviteMailSent, inviteMailDate: app.inviteMailDate, cancelReason: app.cancelReason, cancelEmailSent: app.cancelEmailSent };
    try { sessionStorage.setItem(OKEY, JSON.stringify(all)); } catch (e) {}
  }
  var overrides = loadOverrides();
  APPS.forEach(function (a) {
    if (overrides[a.id]) { for (var k in overrides[a.id]) a[k] = overrides[a.id][k]; }
  });

  function fieldsHtml(fields) {
    return '<dl class="p902-review-grid">' + fields.map(function (f) {
      return '<dt>' + f[0] + '</dt><dd>' + (f[1] || '—') + '</dd>';
    }).join('') + '</dl>';
  }

  /* linkedPage.urlの?c=/?g=クエリ値がalias。既存の実ページ（自分のURLをそのまま持つ・クエリなし）は
     aliasが未設定のケースもあるためnullを返す（P902Dataのextractalias同様のロジック） */
  function extractAlias(url) {
    var m = /[?&][cg]=([^&]+)/.exec(url || '');
    return m ? m[1] : null;
  }

  /* ── 入力内容CSV（列構成＝ユーザー指定・2026-08-11確定／2026-08-11 追補：C/Galiasの後にC/G名を追加、
     クリエイターの本名フリガナを追加）
     UID/メアド/申込日時/申込NID/申込種別/C/GNID/C/Galias/C/G名 の共通8列＋入力内容。
     価格帯（目安）・展覧会規模（年間）はp11-4フォームでクリエイター・ギャラリー双方が入力するため
     両ロールとも実値を出力（ブランク対象外化）。それ以外の入力内容はクリエイター・ギャラリーで
     項目が異なるため、位置を揃えたうえで対応の無い列はブランク（列名・値とも空）で埋め、
     両ロールとも同じ列数にする（本人確認書類の画像は対象外）。 */
  function csvEscape(v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; }
  function buildCsv(a) {
    var cols = ['UID', 'メアド', '申込日時', '申込NID', '申込種別', 'C/GNID', 'C/Galias', 'C/G名'];
    var vals = [a.uid, a.email, a.submitted, a.nid, a.role === 'creator' ? 'C' : 'G', a.existingNid || '', extractAlias(a.existingUrl) || '', a.name];
    if (a.role === 'creator') {
      cols = cols.concat(['価格帯（目安）', '展覧会規模（年間）', '理由・目的', '作品の発送地', '適格請求書発行事業者登録番号', '本名', '本名フリガナ', '', '', '生年月日', '郵便番号', '住所(都道府県+住所)', '電話番号']);
      vals = vals.concat([a.priceRange, a.exhibitionScale, a.purpose, a.shipPref, a.invoiceNumber, a.kyc.realName, a.kyc.realNameKana, '', '', a.kyc.birth, a.kyc.zip, a.kyc.pref + a.kyc.addr, a.kyc.tel]);
    } else {
      cols = cols.concat(['価格帯（目安）', '展覧会規模（年間）', '理由・目的', '作品の発送地', '適格請求書発行事業者登録番号', '責任者お名前', '責任者フリガナ', 'ギャラリーとの関係', '法人番号', '生年月日', '郵便番号', '住所(都道府県+住所)', '電話番号']);
      vals = vals.concat([a.priceRange, a.exhibitionScale, a.purpose, a.shipPref, a.invoiceNumber, a.resp.name, a.resp.kana, a.resp.relation, a.resp.corpNumber, a.resp.birth, a.resp.zip, a.resp.pref + a.resp.addr, a.resp.tel]);
    }
    return cols.map(csvEscape).join(',') + '\n' + vals.map(csvEscape).join(',');
  }

  function buildBody(a) {
    var html = '';
    if (a.role === 'creator') {
      html += '<div class="p902-review-section"><h4 class="p902-review-section__title">クリエイターとしての申込内容</h4>' +
        fieldsHtml([
          ['価格帯（目安）', a.priceRange], ['展覧会規模（年間）', a.exhibitionScale], ['理由・目的', a.purpose], ['作品の発送地', a.shipPref],
        ]) + '</div>';
      html += '<div class="p902-review-section"><h4 class="p902-review-section__title">非公開・本人確認のための情報</h4>' +
        '<p class="p902-review-section__note">クリエイター基本情報（P3-11）から読み込んだ内容です。申込時点では申込者側で変更できません。</p>' +
        fieldsHtml([
          ['本名', a.kyc.realName], ['本名フリガナ', a.kyc.realNameKana], ['生年月日', a.kyc.birth],
          ['住所', '〒' + a.kyc.zip + ' ' + a.kyc.pref + a.kyc.addr], ['電話番号', a.kyc.tel],
        ]) + '</div>';
    } else {
      html += '<div class="p902-review-section"><h4 class="p902-review-section__title">ギャラリーとしての申込内容</h4>' +
        fieldsHtml([
          ['価格帯（目安）', a.priceRange], ['展覧会規模（年間）', a.exhibitionScale], ['理由・目的', a.purpose], ['作品の発送地', a.shipPref],
        ]) + '</div>';
      html += '<div class="p902-review-section"><h4 class="p902-review-section__title">非公開・責任者情報（本人確認）</h4>' +
        '<p class="p902-review-section__note">ギャラリー基本情報のご担当者とは別の方の場合があります。この申込にあたり入力された内容です。</p>' +
        fieldsHtml([
          ['責任者お名前', a.resp.name], ['ふりがな', a.resp.kana], ['ギャラリーとの関係', a.resp.relation],
          ['法人番号', a.resp.corpNumber], ['生年月日', a.resp.birth],
          ['住所', '〒' + a.resp.zip + ' ' + a.resp.pref + a.resp.addr], ['電話番号', a.resp.tel],
        ]) + '</div>';
    }
    html += '<div class="p902-review-section"><h4 class="p902-review-section__title">事業者番号（インボイス制度）</h4>' +
      fieldsHtml([['適格請求書発行事業者登録番号', a.invoiceNumber || '未登録（任意）']]) + '</div>';

    html += '<div class="p902-review-section"><h4 class="p902-review-section__title">本人確認書類</h4>' +
      (a.status === 'pending'
        ? '<p class="p902-review-section__note">氏名・住所・生年月日が確認できる画像が添付されています。上記の登録情報と突合して確認してください（画像はデモのためダミー表示）。</p>' +
          '<div class="p902-kyc-docs">' +
            KYC_DOC_DEMO.map(function (d) {
              return '<div class="p902-kyc-doc"><div class="p902-kyc-doc__img" style="background:linear-gradient(160deg,' + d.g + ')"></div>' +
                '<p class="p902-kyc-doc__cap">' + d.label + '</p></div>';
            }).join('')
          + '</div>'
        : '<p class="p902-review-section__note">本人確認書類の画像は確認完了後に削除しており、現在は保存されていません。</p>'
      ) + '</div>';
    return html;
  }

  /* 処理結果（granted/cancelledの申込＝レビューページ末尾寄り・管理者コメント直下に表示。P902Dataのbuild
     Result()と同じ単一「処理結果」見出し＋fieldsHtml構成に統一（2026-08-09、位置・見出しをP90-2に合わせて再構成／
     2026-08-11 取消の分岐を追加）） */
  function buildStatusBody(a) {
    var html = '<h4 class="p902-review-section__title">処理結果</h4>';
    if (a.status === 'granted' && a.stripeStatus) {
      html += '<p class="p902-review-section__note">本人確認OK後、申込者側の操作でStripeの本人確認手続き（Step2）に進みます。Stripe側の自動審査のため、この画面での操作はありません。</p>' +
        '<span class="ktn-review-status ktn-review-status--' + STRIPE_CLS[a.stripeStatus] + '">' + STRIPE_LABEL[a.stripeStatus] + '</span>' +
        fieldsHtml([
          ['完了日時', a.grantedDate || '—'],
          ['本人確認手続きのご案内メール', a.inviteMailSent ? ('送信済み（' + a.inviteMailDate + '）') : '未送信'],
        ]);
      /* 案内メールは本人確認OKの操作と切り離した任意タイミングの送信（P902Dataの利用開始案内メールと同パターン）。
         resultElはbuildStatusBodyの都度innerHTMLで再生成されるため、クリックはresultEl側のイベント委譲で拾う */
      if (!a.inviteMailSent) {
        html += '<div class="p902-flow-panel__actions"><button type="button" class="ktn-op-btn ktn-op-btn--sm" id="p9011InviteMailBtn">ご案内メールを送信する</button></div>';
      }
    } else if (a.status === 'cancelled') {
      html += fieldsHtml([
        ['完了日時', a.grantedDate || '—'],
        ['取消理由', CANCEL_REASON_LABEL[a.cancelReason] || '—'],
        ['取消のご連絡メール', a.cancelEmailSent ? '送信済み' : '送信なし'],
      ]);
    }
    return html;
  }

  function todayLabel() {
    var d = new Date();
    var mm = d.getMinutes();
    return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + ' ' + d.getHours() + ':' + (mm < 10 ? '0' : '') + mm;
  }

  return {
    STATUS: STATUS, ROLE_LABEL: ROLE_LABEL, STRIPE_LABEL: STRIPE_LABEL, STRIPE_CLS: STRIPE_CLS, REVIEW_REASON_LABEL: REVIEW_REASON_LABEL,
    CANCEL_REASON_LABEL: CANCEL_REASON_LABEL,
    MAIL_TEMPLATES: MAIL_TEMPLATES,
    tplTokens: tplTokens, applyTokens: applyTokens,
    findTemplate: findTemplate, templatesByPattern: templatesByPattern, templatesByPrefix: templatesByPrefix,
    bareReasonKey: bareReasonKey, populateReasonSelect: populateReasonSelect, addCustomTemplate: addCustomTemplate,
    APPS: APPS, findApp: findApp, dateSS: dateSS, procDate: procDate,
    fieldsHtml: fieldsHtml, extractAlias: extractAlias, buildCsv: buildCsv, buildBody: buildBody, buildStatusBody: buildStatusBody,
    saveOverride: saveOverride, todayLabel: todayLabel,
  };
}

/* ════════════════════════════════════════════════════
   P90-11  管理者-リエゾンプラス機能申込管理（一覧のみ・審査はP90-11-1へ分離／2026-08-09）
════════════════════════════════════════════════════ */
KTN.pages['p90-11'] = function () {
  var D = P9011Data();
  var STATUS = D.STATUS, ROLE_LABEL = D.ROLE_LABEL, STRIPE_LABEL = D.STRIPE_LABEL, REVIEW_REASON_LABEL = D.REVIEW_REASON_LABEL;
  var CANCEL_REASON_LABEL = D.CANCEL_REASON_LABEL;
  var APPS = D.APPS, findApp = D.findApp, dateSS = D.dateSS, procDate = D.procDate;

  /* 本人確認OK後もStripe本人確認（Step2）が完了しLIAISON+が利用開始できるまでは「未処理・処理中」に留める。
     本フローに差し戻し（returned）は無く、確認事項が残る申込もpendingのまま「未処理・処理中」に分類される
     （2026-08-11）。処理完了は「本人確認OK＋Stripe完了」または「取消」（2026-08-11 取消追加）。 */
  function isOpenApp(a) { return a.status === 'pending' || (a.status === 'granted' && a.stripeStatus !== 'completed'); }
  function isDoneApp(a) { return (a.status === 'granted' && a.stripeStatus === 'completed') || a.status === 'cancelled'; }

  /* ── タブ切替（未処理・処理中／処理完了） ── */
  var tabBtns   = document.querySelectorAll('.p902-tab-btn');
  var tabPanels = document.querySelectorAll('.p902-tab-panel');
  function activateTabPanel(panelId) {
    tabBtns.forEach(function (b) {
      var isTarget = b.dataset.panel === panelId;
      b.classList.toggle('is-active', isTarget);
      b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });
    tabPanels.forEach(function (p) { p.hidden = (p.id !== panelId); });
  }
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { activateTabPanel(btn.dataset.panel); });
  });

  /* ── DOM（未処理・処理中タブ） ── */
  var listOpenEl     = document.getElementById('p9011ListOpen');
  var emptyOpenEl    = document.getElementById('p9011EmptyOpen');
  var roleOpenSel    = document.getElementById('p9011FilterRoleOpen');
  var countOpenEl    = document.getElementById('p9011CountOpen');
  var pagerOpenEl    = document.getElementById('p9011PaginationOpen');
  var tabCountOpenEl = document.getElementById('p9011TabCountOpen');

  /* ── DOM（処理完了タブ） ── */
  var listDoneEl     = document.getElementById('p9011ListDone');
  var emptyDoneEl    = document.getElementById('p9011EmptyDone');
  var roleDoneSel    = document.getElementById('p9011FilterRoleDone');
  var countDoneEl    = document.getElementById('p9011CountDone');
  var pagerDoneEl    = document.getElementById('p9011PaginationDone');
  var tabCountDoneEl = document.getElementById('p9011TabCountDone');

  if (!listOpenEl || !listDoneEl) return;

  var pageOpen = 1, pageDone = 1;
  var PER_PAGE = 5;

  /* ── 一覧行（表形式：申込日時／申込NID／ロール／UID／ログインメールアドレス／ステータス）※タブ①未処理・処理中用
     （確認中＝pending、本人確認OKだがStripe未完了＝granted&stripeStatus!=='completed'の2パターン。
     本フローに差し戻し（returned）は無い。確認事項が残るpendingは、確認メール送信済みならinquiry.reasonを、
     未送信ならreviewReasonを内訳ラベルとして小さく添える・P902Dataのprocラベルと同パターン） ── */
  function makeOpenRow(a) {
    var tr = document.createElement('tr');
    tr.className = 'p902-row';
    tr.dataset.id = a.id;
    tr.title = 'クリックして詳細を確認';
    var statusCell;
    if (a.status === 'granted') {
      statusCell = '<span class="ktn-review-status ktn-review-status--' + STATUS.granted.cls + '">' + STATUS.granted.label + '</span>' +
        (a.stripeStatus ? '<div class="p902-proc-reason">Stripe ' + STRIPE_LABEL[a.stripeStatus] + '</div>' : '');
    } else {
      var reasonKey = a.inquiry ? a.inquiry.reason : a.reviewReason;
      statusCell = '<span class="ktn-review-status ktn-review-status--' + STATUS.pending.cls + '">' + STATUS.pending.label + '</span>' +
        (reasonKey ? '<div class="p902-proc-reason">' + (REVIEW_REASON_LABEL[reasonKey] || reasonKey) + (a.inquiry ? '（返信待ち）' : '') + '</div>' : '');
    }
    tr.innerHTML =
      '<td data-label="申込日時" class="p902-cell--muted">' + a.submitted + '</td>' +
      '<td data-label="申込NID" class="p902-cell--muted">' + a.nid + '</td>' +
      '<td data-label="ロール">' + (ROLE_LABEL[a.role] || a.role) + '</td>' +
      '<td data-label="UID" class="p902-cell--name p902-col-uid">' + a.uid + '</td>' +
      '<td data-label="ログインメールアドレス" class="p902-cell--muted">' + a.email + '</td>' +
      '<td data-label="ステータス">' + statusCell + '</td>';
    return tr;
  }

  /* ── 一覧行（表形式：申込日時／申込NID／ロール／UID／ログインメールアドレス／処理内容(内容+完了日時を上下2段表示)／ステータス）
     ※タブ②処理完了専用。isDoneAppにより「本人確認OK＋Stripe完了」または「取消」が対象（差し戻しは未処理・処理中タブへ分類・
     2026-08-10／2026-08-11 取消を追加）。P90-2のmakeDoneItem（処理種別+完了日時を1列・ステータスは別列）と同じ列構成 ── */
  function makeDoneRow(a) {
    var st = STATUS[a.status];
    var tr = document.createElement('tr');
    tr.className = 'p902-row';
    tr.dataset.id = a.id;
    tr.title = 'クリックして詳細を確認';
    var content = a.status === 'cancelled' ? ('取消：' + (CANCEL_REASON_LABEL[a.cancelReason] || '—'))
      : a.stripeStatus ? ('Stripe ' + STRIPE_LABEL[a.stripeStatus]) : '—';
    tr.innerHTML =
      '<td data-label="申込日時" class="p902-cell--muted">' + a.submitted + '</td>' +
      '<td data-label="申込NID" class="p902-cell--muted">' + a.nid + '</td>' +
      '<td data-label="ロール">' + (ROLE_LABEL[a.role] || a.role) + '</td>' +
      '<td data-label="UID" class="p902-cell--name p902-col-uid">' + a.uid + '</td>' +
      '<td data-label="ログインメールアドレス" class="p902-cell--muted">' + a.email + '</td>' +
      '<td data-label="処理内容">' + content +
        '<div class="p902-proc-reason">' + (procDate(a) || '—') + '</div></td>' +
      '<td data-label="ステータス"><span class="ktn-review-status ktn-review-status--' + st.cls + '">' + st.label + '</span></td>';
    return tr;
  }

  /* ── 行クリックで審査サブページ（P90-11-1）へ遷移 ── */
  function bindRowClicks(el) {
    el.addEventListener('click', function (e) {
      var row = e.target.closest('.p902-row');
      if (!row) return;
      var a = findApp(row.dataset.id);
      if (a) location.href = 'kotennavi-p90-11-1.html?id=' + encodeURIComponent(a.id);
    });
  }
  bindRowClicks(listOpenEl);
  bindRowClicks(listDoneEl);

  /* ── タブ①：未処理・処理中（並べ替えなし・申込日降順固定） ── */
  function renderOpen() {
    var fr = roleOpenSel ? roleOpenSel.value : '';
    var rows = APPS.filter(function (a) {
      if (!isOpenApp(a)) return false;
      if (fr && a.role !== fr) return false;
      return true;
    });
    rows.sort(function (a, b) { return b.ss - a.ss; });
    if (tabCountOpenEl) tabCountOpenEl.textContent = APPS.filter(isOpenApp).length;
    if (emptyOpenEl) emptyOpenEl.hidden = rows.length !== 0;
    if (countOpenEl) countOpenEl.innerHTML = '<strong>' + rows.length + '</strong>件該当';

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (pageOpen > totalPages) pageOpen = totalPages;
    var pageRows = rows.slice((pageOpen - 1) * PER_PAGE, pageOpen * PER_PAGE);
    listOpenEl.innerHTML = '';
    pageRows.forEach(function (a) { listOpenEl.appendChild(makeOpenRow(a)); });
    KTN.pagination.render(pagerOpenEl, {
      page: pageOpen,
      totalPages: totalPages,
      onGoto: function (p) { pageOpen = p; renderOpen(); },
    });
  }

  /* ── タブ②：処理完了（並べ替えなし・処理完了日降順固定） ── */
  function renderDone() {
    var fr = roleDoneSel ? roleDoneSel.value : '';
    var rows = APPS.filter(function (a) {
      if (!isDoneApp(a)) return false;
      if (fr && a.role !== fr) return false;
      return true;
    });
    rows.sort(function (a, b) { return dateSS(procDate(b)) - dateSS(procDate(a)); });
    if (tabCountDoneEl) tabCountDoneEl.textContent = APPS.filter(isDoneApp).length;
    if (emptyDoneEl) emptyDoneEl.hidden = rows.length !== 0;
    if (countDoneEl) countDoneEl.innerHTML = '<strong>' + rows.length + '</strong>件該当';

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (pageDone > totalPages) pageDone = totalPages;
    var pageRows = rows.slice((pageDone - 1) * PER_PAGE, pageDone * PER_PAGE);
    listDoneEl.innerHTML = '';
    pageRows.forEach(function (a) { listDoneEl.appendChild(makeDoneRow(a)); });
    KTN.pagination.render(pagerDoneEl, {
      page: pageDone,
      totalPages: totalPages,
      onGoto: function (p) { pageDone = p; renderDone(); },
    });
  }

  function renderAll() { renderOpen(); renderDone(); }

  function renderResetOpen() { pageOpen = 1; renderOpen(); }
  function renderResetDone() { pageDone = 1; renderDone(); }
  if (roleOpenSel) roleOpenSel.addEventListener('change', renderResetOpen);
  if (roleDoneSel) roleDoneSel.addEventListener('change', renderResetDone);
  renderAll();

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P90-11-1  管理者-リエゾンプラス機能申込審査（サブページ・旧審査モーダルから分離／2026-08-09）
   P90-2-1と同じ分割パターン：URLの?idで対象を特定し、結果はその場で再描画する
   （画面遷移せず一覧へは「一覧へ戻る →」で戻る）。本フローに差し戻しは無く、確認事項が残る申込は
   「確認中」のまま「申込者に確認する」でテンプレートメール送信のみ行う（2026-08-11、P902Dataと同パターン）。
   終端アクションは本人確認OK・取消の2つ（2026-08-11 取消追加）。ボタン行（reviewActionsEl）は
   P902-1と同様、いずれかの操作パネルが開いている間は隠す（隠さないと開いたパネルの下に
   トリガーボタン自体が残ってしまう＝2026-08-11 バグ修正）。
════════════════════════════════════════════════════ */
KTN.pages['p90-11-1'] = function () {
  var D = P9011Data();

  var params = new URLSearchParams(location.search);
  var current = D.findApp(params.get('id'));

  var statusChip = document.getElementById('p9011ReviewStatus');
  var titleEl    = document.getElementById('p9011ReviewTitle');
  var metaEl     = document.getElementById('p9011ReviewMeta');
  var bodyEl     = document.getElementById('p9011ReviewBody');
  var csvBox     = document.getElementById('p9011CsvBox');
  var csvCopyBtn = document.getElementById('p9011CsvCopyBtn');
  var resultEl   = document.getElementById('p9011ReviewResult');
  var adminNoteEl   = document.getElementById('p9011AdminNote');
  var reviewActionsEl = document.getElementById('p9011ReviewActions');

  /* 確認メール送信済みの小さな注記（返信待ち・statusはpendingのまま） */
  var inquiryNoteEl = document.getElementById('p9011InquiryNote');

  /* 申込者に確認する（本フローに差し戻しは無く、確認事項が残る申込は「確認中」のまま扱う。P902DataのInquiryパネルと同パターン） */
  var inquiryBtn        = document.getElementById('p9011InquiryBtn');
  var inquiryPanel       = document.getElementById('p9011InquiryPanel');
  var inquiryReasonSel   = document.getElementById('p9011InquiryReasonSel');
  var inquiryFromEl      = document.getElementById('p9011InquiryFrom');
  var inquirySubjectEl   = document.getElementById('p9011InquirySubject');
  var inquiryBodyEl      = document.getElementById('p9011InquiryBody');
  var inquiryNewRow      = document.getElementById('p9011InquiryNewNameRow');
  var inquiryNewName     = document.getElementById('p9011InquiryNewName');
  var inquiryNewSaveBtn  = document.getElementById('p9011InquiryNewSaveBtn');
  var inquirySendBtn     = document.getElementById('p9011InquirySendBtn');
  var inquiryCancelBtn   = document.getElementById('p9011InquiryCancelBtn');

  /* お申込みの取消（確認メールへの返信内容、または申込者からの取消希望をもとに確定。P902DataのCancelパネルと同パターン） */
  var cancelFlowBtn      = document.getElementById('p9011CancelFlowBtn');
  var cancelPanel         = document.getElementById('p9011CancelPanel');
  var cancelReasonSel     = document.getElementById('p9011CancelReasonSel');
  var cancelSendMailChk   = document.getElementById('p9011CancelSendMail');
  var cancelMailFieldsEl  = document.getElementById('p9011CancelMailFields');
  var cancelFromEl        = document.getElementById('p9011CancelFrom');
  var cancelSubjectEl     = document.getElementById('p9011CancelSubject');
  var cancelBodyEl        = document.getElementById('p9011CancelBody');
  var cancelNewRow        = document.getElementById('p9011CancelNewNameRow');
  var cancelNewName       = document.getElementById('p9011CancelNewName');
  var cancelNewSaveBtn    = document.getElementById('p9011CancelNewSaveBtn');
  var cancelBackBtn       = document.getElementById('p9011CancelBackBtn');
  var cancelConfirmBtn    = document.getElementById('p9011CancelConfirmBtn');

  var approveBtn    = document.getElementById('p9011ApproveBtn');
  var inviteMailPanel   = document.getElementById('p9011InviteMailPanel');
  var inviteTemplateSel = document.getElementById('p9011InviteTemplateSel');
  var inviteFromEl      = document.getElementById('p9011InviteFrom');
  var inviteMailSubject = document.getElementById('p9011InviteMailSubject');
  var inviteMailBody    = document.getElementById('p9011InviteMailBody');
  var inviteMailCancelBtn = document.getElementById('p9011InviteMailCancelBtn');
  var inviteMailSendBtn   = document.getElementById('p9011InviteMailSendBtn');

  [inquiryFromEl, cancelFromEl, inviteFromEl].forEach(function (sel) {
    if (sel) sel.innerHTML = KTN.mailFromOptionsHtml();
  });

  if (!current) {
    if (titleEl) titleEl.textContent = '申込が見つかりません';
    if (metaEl) metaEl.textContent = '';
    if (bodyEl) bodyEl.innerHTML = '<p>指定された申込データが見つかりませんでした。一覧から選び直してください。</p>';
    if (statusChip) statusChip.hidden = true;
    if (reviewActionsEl) reviewActionsEl.hidden = true;
    window.ktnRender = function () {};
    return;
  }

  /* ── 操作パネルを一括で閉じる（P902DataのcloseActionPanelsと同パターン） ── */
  function closeActionPanels() {
    if (inquiryPanel) inquiryPanel.hidden = true;
    if (cancelPanel) cancelPanel.hidden = true;
    if (inviteMailPanel) inviteMailPanel.hidden = true;
  }

  /* ── 申込者への確認メール（本フローに差し戻しは無く、確認事項が残る申込は「確認中」のまま扱う。
     テンプレートはP90-9で一元管理し、プルダウンから選択・その場での新規追加にも対応。
     P902DataのInquiryパネルと同パターン：送信してもステータスは変わらない） ── */
  function loadInquiryTemplate(variantKey) {
    if (!current) return;
    if (variantKey === '__new__') {
      if (inquiryNewRow) inquiryNewRow.hidden = false;
      return;
    }
    if (inquiryNewRow) inquiryNewRow.hidden = true;
    var t = D.findTemplate(variantKey);
    if (!t) return;
    if (inquiryFromEl) inquiryFromEl.value = t.from;
    var tokens = D.tplTokens(current);
    if (inquirySubjectEl) inquirySubjectEl.value = D.applyTokens(t.subject, tokens);
    if (inquiryBodyEl) inquiryBodyEl.value = D.applyTokens(t.body, tokens);
  }

  /* ── お申込みの取消（テンプレート選択＋その場での新規追加に対応。P902DataのCancelパネルと同パターン） ── */
  function loadCancelTemplate(variantKey) {
    if (!current) return;
    if (variantKey === '__new__') {
      if (cancelNewRow) cancelNewRow.hidden = false;
      return;
    }
    if (cancelNewRow) cancelNewRow.hidden = true;
    var t = D.findTemplate(variantKey);
    if (!t) return;
    if (cancelFromEl) cancelFromEl.value = t.from;
    var tokens = D.tplTokens(current);
    if (cancelSubjectEl) cancelSubjectEl.value = D.applyTokens(t.subject, tokens);
    if (cancelBodyEl) cancelBodyEl.value = D.applyTokens(t.body, tokens);
  }

  /* ── 案内メールパネル（本人確認OK後・処理結果エリアのボタンから任意タイミングで送信。P902Grantパネルと同パターン） ── */
  function loadInviteTemplate(variantKey) {
    if (!current) return;
    var t = D.findTemplate(variantKey);
    if (!t) return;
    var tokens = D.tplTokens(current);
    if (inviteFromEl) inviteFromEl.value = t.from;
    if (inviteMailSubject) inviteMailSubject.value = D.applyTokens(t.subject, tokens);
    if (inviteMailBody) inviteMailBody.value = D.applyTokens(t.body, tokens);
  }

  /* ── 審査ページ本体の描画（旧openReviewModal相当・モーダル開閉なし） ── */
  function renderReview() {
    var a = current;
    var st = D.STATUS[a.status];
    if (statusChip) { statusChip.className = 'ktn-review-status ktn-review-status--' + st.cls; statusChip.textContent = st.label; }
    if (titleEl) titleEl.textContent = a.name;
    if (metaEl) metaEl.innerHTML = '申込日時：' + a.submitted + ' ・ 申込NID：' + a.nid + ' ・ 申込種別：' + D.ROLE_LABEL[a.role] +
      '<br>UID：' + a.uid + ' ・ ログインメールアドレス：' + a.email +
      ' ・ <a class="ktn-guide-link" href="' + a.existingUrl + '" target="_blank" rel="noopener">' + (a.role === 'creator' ? 'クリエイターページ' : 'ギャラリーページ') + ' →</a>';
    if (bodyEl) bodyEl.innerHTML = D.buildBody(a);

    /* 入力内容CSV */
    var csv = D.buildCsv(a);
    if (csvBox) csvBox.value = csv;
    if (csvCopyBtn) csvCopyBtn.dataset.copy = csv;

    /* 確認メール送信済みの小さな注記（返信待ち・P902Dataと同パターン） */
    if (inquiryNoteEl) {
      if (a.inquiry) {
        inquiryNoteEl.hidden = false;
        inquiryNoteEl.innerHTML = '<strong>確認メール送信済み</strong>'
          + '<span class="p902-inquiry-note__meta">'
          + '<span class="p902-inquiry-note__meta-item"><span class="p902-inquiry-note__meta-label">送信日時</span><span class="p902-inquiry-note__meta-value">' + a.inquiry.date + '</span></span>'
          + '<span class="p902-inquiry-note__meta-item"><span class="p902-inquiry-note__meta-label">種別</span><span class="p902-inquiry-note__meta-value">' + (D.REVIEW_REASON_LABEL[a.inquiry.reason] || '') + '</span></span>'
          + '</span>';
      } else {
        inquiryNoteEl.hidden = true;
        inquiryNoteEl.innerHTML = '';
      }
    }

    if (adminNoteEl) adminNoteEl.value = a.adminNote || '';

    /* 処理結果（未処理・処理中＝pendingの間は非表示。P902Dataのresult表示と同パターン） */
    if (resultEl) {
      if (a.status === 'pending') { resultEl.hidden = true; resultEl.innerHTML = ''; }
      else { resultEl.hidden = false; resultEl.innerHTML = D.buildStatusBody(a); }
    }

    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = false;

    /* 処理済みの申込は結果を表示するのみ（本人確認OKボタン・確認する/取消ボタンは出さない） */
    if (approveBtn) approveBtn.hidden = a.status !== 'pending';
    if (inquiryBtn) inquiryBtn.hidden = a.status !== 'pending';
    if (cancelFlowBtn) cancelFlowBtn.hidden = a.status !== 'pending';
  }
  renderReview();

  if (adminNoteEl) adminNoteEl.addEventListener('input', function () {
    current.adminNote = adminNoteEl.value;
    D.saveOverride(current);
  });

  if (inquiryBtn) inquiryBtn.addEventListener('click', function () {
    if (!current) return;
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = true;
    D.populateReasonSelect(inquiryReasonSel, 'confirm-');
    if (inquiryReasonSel) inquiryReasonSel.value = 'confirm-document-unclear';
    loadInquiryTemplate('confirm-document-unclear');
    if (inquiryPanel) inquiryPanel.hidden = false;
  });
  if (inquiryReasonSel) inquiryReasonSel.addEventListener('change', function () {
    loadInquiryTemplate(inquiryReasonSel.value);
  });
  if (inquiryNewSaveBtn) inquiryNewSaveBtn.addEventListener('click', function () {
    if (!current || !inquiryNewName) return;
    var name = inquiryNewName.value.trim();
    if (!name) { if (KTN.toast) KTN.toast('テンプレート名を入力してください'); return; }
    var t = D.addCustomTemplate('abnormal', 'confirm', name, inquirySubjectEl ? inquirySubjectEl.value : '', inquiryBodyEl ? inquiryBodyEl.value : '');
    D.populateReasonSelect(inquiryReasonSel, 'confirm-');
    if (inquiryReasonSel) inquiryReasonSel.value = t.variantKey;
    if (inquiryNewRow) inquiryNewRow.hidden = true;
    inquiryNewName.value = '';
    if (KTN.toast) KTN.toast('新しいテンプレートを追加しました（デモ）');
  });
  if (inquiryCancelBtn) inquiryCancelBtn.addEventListener('click', function () {
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = false;
  });
  if (inquirySendBtn) inquirySendBtn.addEventListener('click', function () {
    if (!current) return;
    var reasonKey = inquiryReasonSel ? D.bareReasonKey(inquiryReasonSel.value) || 'other' : 'other';
    current.inquiry = { reason: reasonKey, date: D.todayLabel() };
    D.saveOverride(current);
    renderReview();
    if (KTN.toast) KTN.toast('確認メールを送信しました（デモ）');
  });

  if (cancelFlowBtn) cancelFlowBtn.addEventListener('click', function () {
    if (!current) return;
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = true;
    D.populateReasonSelect(cancelReasonSel, 'cancel-');
    var defaultReason = current.inquiry ? current.inquiry.reason : 'document-unclear';
    if (cancelReasonSel) cancelReasonSel.value = 'cancel-' + defaultReason;
    if (cancelSendMailChk) cancelSendMailChk.checked = false;
    if (cancelMailFieldsEl) cancelMailFieldsEl.hidden = false;
    if (cancelNewRow) cancelNewRow.hidden = true;
    loadCancelTemplate(cancelReasonSel ? cancelReasonSel.value : 'cancel-document-unclear');
    if (cancelPanel) cancelPanel.hidden = false;
  });
  if (cancelReasonSel) cancelReasonSel.addEventListener('change', function () {
    loadCancelTemplate(cancelReasonSel.value);
  });
  if (cancelNewSaveBtn) cancelNewSaveBtn.addEventListener('click', function () {
    if (!current || !cancelNewName) return;
    var name = cancelNewName.value.trim();
    if (!name) { if (KTN.toast) KTN.toast('テンプレート名を入力してください'); return; }
    var t = D.addCustomTemplate('abnormal', 'cancel', name, cancelSubjectEl ? cancelSubjectEl.value : '', cancelBodyEl ? cancelBodyEl.value : '');
    D.populateReasonSelect(cancelReasonSel, 'cancel-');
    if (cancelReasonSel) cancelReasonSel.value = t.variantKey;
    if (cancelNewRow) cancelNewRow.hidden = true;
    cancelNewName.value = '';
    if (KTN.toast) KTN.toast('新しいテンプレートを追加しました（デモ）');
  });
  if (cancelBackBtn) cancelBackBtn.addEventListener('click', function () {
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = false;
  });
  if (cancelConfirmBtn) cancelConfirmBtn.addEventListener('click', function () {
    if (!current) return;
    var reason = cancelReasonSel ? (D.bareReasonKey(cancelReasonSel.value) || 'other') : 'other';
    var emailSent = cancelSendMailChk ? cancelSendMailChk.checked : false;
    current.status = 'cancelled';
    current.cancelReason = reason;
    current.cancelEmailSent = emailSent;
    current.grantedDate = D.todayLabel();
    current.inquiry = null;
    D.saveOverride(current);
    renderReview();
    if (KTN.toast) KTN.toast('お申込みを取消しました（デモ）');
  });

  if (approveBtn) approveBtn.addEventListener('click', function () {
    current.status = 'granted';
    current.grantedDate = D.todayLabel();
    current.stripeStatus = 'not_started';
    D.saveOverride(current);
    renderReview();
    if (KTN.toast) KTN.toast('本人確認OKにしました。ご案内メールは処理結果エリアから送信してください（デモ）');
  });

  /* 案内メールボタンはbuildStatusBodyの都度resultEl.innerHTMLで再生成されるため、
     クリックはresultEl側のイベント委譲で拾う（P902Dataの利用開始案内メールボタンと同パターン） */
  if (resultEl) resultEl.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('#p9011InviteMailBtn') : null;
    if (!btn || !current) return;
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = true;
    if (inviteTemplateSel) {
      inviteTemplateSel.innerHTML = D.templatesByPattern('normal').map(function (t) {
        return '<option value="' + t.variantKey + '">' + t.name + '</option>';
      }).join('');
      inviteTemplateSel.value = 'invite';
      loadInviteTemplate(inviteTemplateSel.value);
    } else {
      loadInviteTemplate('invite');
    }
    if (inviteMailPanel) inviteMailPanel.hidden = false;
  });
  if (inviteTemplateSel) inviteTemplateSel.addEventListener('change', function () {
    loadInviteTemplate(inviteTemplateSel.value);
  });
  if (inviteMailCancelBtn) inviteMailCancelBtn.addEventListener('click', function () {
    closeActionPanels();
    if (reviewActionsEl) reviewActionsEl.hidden = false;
  });
  if (inviteMailSendBtn) inviteMailSendBtn.addEventListener('click', function () {
    current.inviteMailSent = true;
    current.inviteMailDate = D.todayLabel();
    D.saveOverride(current);
    renderReview();
    if (KTN.toast) KTN.toast('ご案内メールを送信しました（デモ）');
  });

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P90-9  管理者-メールテンプレート管理（docs/mail-template-system.md 準拠）
   使用画面（screenId）×パターン（normal/abnormal）でテンプレートを一元管理する汎用CRUD。
   variantKeyは画面側だけが解釈する不透明な文字列としてそのまま保存する（意味の解釈はしない）。
   本ページはP90-2とデータを共有しない独立したデモ配列を持つ（React CSR化前提・同ドキュメント1章参照）。
════════════════════════════════════════════════════ */
KTN.pages['p90-9'] = function () {

  var SCREEN_LABEL = { 'p90-2': 'クリエイター/ギャラリー機能申込管理', 'p90-11': 'リエゾンプラス機能申込管理' };
  var PATTERN_LABEL = { normal: '正常系', abnormal: '非正常系' };
  var PATTERN_CLS   = { normal: 'cb-normal', abnormal: 'cb-abnormal' };

  /* 画面が実装された時点で確定する「必須区分」（送信パネルの数・構成そのものと対応）。
     テンプレートの残数に関わらず、この区分定義自体は画面のコード構造から決まる固定情報。
     削除ガード（openDelModal）はこの定義を使い、区分内の最後の1件を誤って廃止できないようにする。 */
  var SCREEN_REQUIRED_CATEGORIES = {
    'p90-2': [
      { pattern: 'normal',   prefix: null,       label: '正常系（利用開始のご案内）' },
      { pattern: 'abnormal', prefix: 'confirm-', label: '非正常系・確認メール' },
      { pattern: 'abnormal', prefix: 'cancel-',  label: '非正常系・取消のご連絡' }
    ],
    'p90-11': [
      { pattern: 'normal',   prefix: null,       label: '正常系（本人確認OKのご案内）' },
      { pattern: 'abnormal', prefix: 'confirm-', label: '非正常系・確認メール' },
      { pattern: 'abnormal', prefix: 'cancel-',  label: '非正常系・取消のご連絡' }
    ]
  };
  function findCategory(t) {
    var cats = SCREEN_REQUIRED_CATEGORIES[t.screenId];
    if (!cats) return null;
    for (var i = 0; i < cats.length; i++) {
      var c = cats[i];
      if (c.pattern !== t.pattern) continue;
      if (c.prefix && t.variantKey.indexOf(c.prefix) !== 0) continue;
      return c;
    }
    return null;
  }
  function isLastActiveInCategory(t, cat) {
    var count = TEMPLATES.filter(function (o) {
      if (o.status !== 'active') return false;
      if (o.screenId !== t.screenId || o.pattern !== cat.pattern) return false;
      if (cat.prefix && o.variantKey.indexOf(cat.prefix) !== 0) return false;
      return true;
    }).length;
    return count <= 1;
  }

  var GRANT_BODY_NEW =
    '{{userName}} 様\n\nお待たせしました。個展なび事務局での確認が完了し、\n{{roleName}}機能をご利用いただけるようになりました。\n\n' +
    'あなたの{{roleName}}ページはこちらです。\n　{{pageName}}\n　{{pageUrl}}\n\n' +
    'これから、展覧会・作品・記事の掲載や、\nウォッチしてくださっている方への発信ができます。\n\n' +
    'まずはページの内容をご確認のうえ、\nプロフィールや掲載情報の追加をお試しください。\n\n{{commonFooter}}';
  var GRANT_BODY_LINK =
    '{{userName}} 様\n\nお待たせしました。個展なび事務局での確認が完了し、\n{{roleName}}機能をご利用いただけるようになりました。\n\n' +
    'あなたの{{roleName}}ページはこちらです。\n　{{pageName}}\n　{{pageUrl}}\n\n' +
    'これから、展覧会・作品・記事の掲載や、\nウォッチしてくださっている方への発信ができます。\n\n' +
    '──────────────────────────────\n これまでの掲載情報を引き継ぎました\n──────────────────────────────\n' +
    '他の方が投稿された情報をもとに事務局が先行して作成していた\nあなたのページを確認し、オーナーをあなたに切り替えました。\n' +
    'これまでの展覧会情報もそのまま引き継がれています。\n内容に相違がある場合は、下記よりお知らせください。\n　{{supportUrl}}\n' +
    '──────────────────────────────\n\nまずはページの内容をご確認のうえ、\nプロフィールや掲載情報の追加をお試しください。\n\n{{commonFooter}}';
  var CANCEL_BODY_STD =
    '{{userName}} 様\n\nご連絡いただきありがとうございました。\n' +
    'いただいたご返信内容を確認し、今回の{{roleName}}機能のお申込み（申込NID：{{applyId}}）は取消とさせていただきました。\n\n' +
    '改めてお申込みをご希望の場合は、お手数ですが再度お申込みフォームよりお手続きください。\n\n{{commonFooter}}';

  /* ── デモデータ（P90-2側のMAIL_TEMPLATESと同内容だが、ページ間の実データ連携がないため個別配列として保持） ── */
  var TEMPLATES = [
    { id: 'mt-1', screenId: 'p90-2', pattern: 'normal', variantKey: 'creator-new', from: 'register@koten-navi.com',
      name: 'クリエイター機能 – 新規ページ作成', subject: '【個展なび】{{roleName}}機能のご利用を開始いただけます', body: GRANT_BODY_NEW,
      status: 'active', usageNote: '新規にクリエイターページを作成して機能を付与した時に送る（M-02）。', updatedAt: '2026.8.8' },
    { id: 'mt-2', screenId: 'p90-2', pattern: 'normal', variantKey: 'creator-link', from: 'register@koten-navi.com',
      name: 'クリエイター機能 – 既存ページのリンク付け', subject: '【個展なび】{{roleName}}機能のご利用を開始いただけます', body: GRANT_BODY_LINK,
      status: 'active', usageNote: '事務局が先行作成済みの未割当ページにオーナーとしてリンクした時に送る（M-02・引き継ぎ結果ブロック付き）。', updatedAt: '2026.8.8' },
    { id: 'mt-3', screenId: 'p90-2', pattern: 'normal', variantKey: 'gallery-new', from: 'register@koten-navi.com',
      name: 'ギャラリー機能 – 新規ページ作成', subject: '【個展なび】{{roleName}}機能のご利用を開始いただけます', body: GRANT_BODY_NEW,
      status: 'active', usageNote: '新規にギャラリーページを作成して機能を付与した時に送る（M-04）。', updatedAt: '2026.8.8' },
    { id: 'mt-4', screenId: 'p90-2', pattern: 'normal', variantKey: 'gallery-link', from: 'register@koten-navi.com',
      name: 'ギャラリー機能 – 既存ページのリンク付け', subject: '【個展なび】{{roleName}}機能のご利用を開始いただけます', body: GRANT_BODY_LINK,
      status: 'active', usageNote: '事務局が先行作成済みの未割当ページにオーナーとしてリンクした時に送る（M-04・引き継ぎ結果ブロック付き）。', updatedAt: '2026.8.8' },
    { id: 'mt-5', screenId: 'p90-2', pattern: 'abnormal', variantKey: 'confirm-input-error', from: 'inquiry@koten-navi.com',
      name: '入力不足・入力誤り', subject: '【個展なび】{{roleName}}機能のお申込み内容について確認のお願い',
      body: '{{userName}} 様\n\nこのたびは個展なびの{{roleName}}機能にお申し込みいただき、ありがとうございます。\n' +
        'いただいた内容を確認したところ、下記の点についてご確認をお願いしたく、ご連絡いたしました。\n\n' +
        '──────────────────────────────\n 申込NID：{{applyId}}\n 確認事項：（ここに具体的な不足・誤りの内容を記載してください）\n──────────────────────────────\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、上記についてご回答いただけますと幸いです。\nご回答をもって、あらためて内容を確認のうえ対応いたします。\n\n' +
        '※本メールへの返信がない場合、恐れ入りますが今回のお申込みは取消とさせていただく場合がございます。\n\n{{commonFooter}}',
      status: 'active', usageNote: '入力内容に不足・誤りの疑いがある時、取消を確定する前に事情を確認する1通（M-06パターン①）。', updatedAt: '2026.8.8' },
    { id: 'mt-6', screenId: 'p90-2', pattern: 'abnormal', variantKey: 'confirm-duplicate', from: 'inquiry@koten-navi.com',
      name: '重複申込の可能性', subject: '【個展なび】{{roleName}}機能のお申込みについて確認のお願い（重複申込の可能性）',
      body: '{{userName}} 様\n\nこのたびは個展なびの{{roleName}}機能にお申し込みいただき、ありがとうございます。\n' +
        '確認したところ、以前に別のアカウントで同様のお申込みをいただいている可能性がございます。\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、以前にお申込みいただいたアカウント（メールアドレス等）についてご確認いただけますと幸いです。\n\n' +
        '※ご返信内容を確認のうえ、重複が確認できた場合は、今回のお申込みを取消とさせていただきます。\n\n{{commonFooter}}',
      status: 'active', usageNote: '以前に別アカウントで同様の申込がある疑いがある時に事情を確認する1通（M-06パターン②）。', updatedAt: '2026.8.8' },
    { id: 'mt-7', screenId: 'p90-2', pattern: 'abnormal', variantKey: 'cancel-input-error', from: 'register@koten-navi.com',
      name: '入力不足・入力誤り', subject: '【個展なび】{{roleName}}機能のお申込みの取消について', body: CANCEL_BODY_STD,
      status: 'active', usageNote: '確認メールへの返信・入力不足を理由に取消を確定した時に送る（M-07パターン①・送信は任意）。', updatedAt: '2026.8.8' },
    { id: 'mt-8', screenId: 'p90-2', pattern: 'abnormal', variantKey: 'cancel-duplicate', from: 'register@koten-navi.com',
      name: '以前に別アカウントで申込済み', subject: '【個展なび】{{roleName}}機能のお申込みの取消について', body: CANCEL_BODY_STD,
      status: 'active', usageNote: '重複申込が確認できたことを理由に取消を確定した時に送る（M-07パターン①・送信は任意）。', updatedAt: '2026.8.8' },
    { id: 'mt-9', screenId: 'p90-2', pattern: 'abnormal', variantKey: 'cancel-role-switch', from: 'register@koten-navi.com',
      name: '希望ロールの変更', subject: '【個展なび】{{roleName}}機能のお申込みの取消について',
      body: '{{userName}} 様\n\nご連絡いただきありがとうございました。\n' +
        'ご希望のとおり、今回の{{roleName}}機能のお申込み（申込NID：{{applyId}}）は取消とさせていただきました。\n\n' +
        'あらためて別の機能でお申込みをご希望の場合は、お手数ですが再度お申込みフォームよりお手続きください。\n\n{{commonFooter}}',
      status: 'active', usageNote: '申込者本人からの希望ロール変更の連絡をもとに取消を確定した時に送る（M-07パターン②・送信は任意）。', updatedAt: '2026.8.8' },
    { id: 'mt-10', screenId: 'p90-2', pattern: 'abnormal', variantKey: 'cancel-other', from: 'register@koten-navi.com',
      name: 'その他', subject: '【個展なび】{{roleName}}機能のお申込みの取消について', body: CANCEL_BODY_STD,
      status: 'active', usageNote: '上記に当てはまらない理由で取消を確定した時に送る（M-07パターン①・送信は任意）。', updatedAt: '2026.8.8' },
    { id: 'mt-p9011-1', screenId: 'p90-11', pattern: 'normal', variantKey: 'invite', from: 'liaison@koten-navi.com',
      name: '本人確認OKのご案内（Step2へ）', subject: '【個展なび】LIAISON+のご利用にあたり、本人確認の続きをお願いします',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        'ご提出いただいた本人確認書類の内容を確認いたしました。\n\n' +
        '引き続き、Stripeでの本人確認手続き（Step2）にお進みください。\n　{{pageUrl}}\n\n' +
        'Step2の手続きが完了すると、LIAISON+のご利用（作品販売）が開始されます。\n\n{{commonFooter}}',
      status: 'active', usageNote: '本人確認OKにした後、処理結果エリアのボタンから任意タイミングで送る（P90-11-1）。', updatedAt: '2026.8.10' },
    { id: 'mt-p9011-2', screenId: 'p90-11', pattern: 'abnormal', variantKey: 'confirm-document-unclear', from: 'inquiry@koten-navi.com',
      name: '本人確認書類が不鮮明', subject: '【個展なび】本人確認書類について確認のお願い（LIAISON+機能お申込み）',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        'ご提出いただいた本人確認書類の内容を確認したところ、画像が不鮮明なため氏名・住所・生年月日を確認できませんでした。\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、鮮明な画像を再度ご提出いただけますと幸いです。\nご提出いただき次第、あらためて内容を確認いたします。\n\n{{commonFooter}}',
      status: 'active', usageNote: '本人確認書類の画像が不鮮明で内容を確認できない時に送る（P90-11-1）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-3', screenId: 'p90-11', pattern: 'abnormal', variantKey: 'confirm-info-mismatch', from: 'inquiry@koten-navi.com',
      name: '登録情報と書類の不一致', subject: '【個展なび】ご登録情報と本人確認書類について確認のお願い（LIAISON+機能お申込み）',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        'ご登録いただいた情報と、ご提出いただいた本人確認書類に記載の内容が一致しない箇所がございました。\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、現在の情報が確認できる書類とあわせてご回答いただけますと幸いです。\n\n{{commonFooter}}',
      status: 'active', usageNote: '登録情報と本人確認書類の記載内容が一致しない時に送る（P90-11-1）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-4', screenId: 'p90-11', pattern: 'abnormal', variantKey: 'confirm-resp-info', from: 'inquiry@koten-navi.com',
      name: '責任者情報の不備（ギャラリーのみ）', subject: '【個展なび】責任者情報について確認のお願い（LIAISON+機能お申込み）',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        'ご登録いただいた責任者情報の内容に不備があり、本人確認を進められない状態です。\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、責任者情報の不足箇所についてご回答いただけますと幸いです。\n\n{{commonFooter}}',
      status: 'active', usageNote: 'ギャラリーの責任者情報に不備がある時に送る（P90-11-1）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-5', screenId: 'p90-11', pattern: 'abnormal', variantKey: 'confirm-missing-fields', from: 'inquiry@koten-navi.com',
      name: '必須項目の未入力・記載不足', subject: '【個展なび】お申込み内容について確認のお願い（LIAISON+機能お申込み）',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        '必須項目に未入力・記載不足の箇所があり、本人確認を進められない状態です。\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にて、不足箇所についてご回答いただけますと幸いです。\n\n{{commonFooter}}',
      status: 'active', usageNote: '必須項目の未入力・記載不足がある時に送る（P90-11-1）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-6', screenId: 'p90-11', pattern: 'abnormal', variantKey: 'confirm-other', from: 'inquiry@koten-navi.com',
      name: 'その他', subject: '【個展なび】お申込み内容について確認のお願い（LIAISON+機能お申込み）',
      body: '{{userName}} 様\n\n個展なび事務局です。\n{{roleName}}機能のお申込み（申込NID：{{applyId}}）について、\n' +
        '下記の点についてご確認をお願いしたく、ご連絡いたしました。\n\n' +
        '──────────────────────────────\n 確認事項：（ここに具体的な内容を記載してください）\n──────────────────────────────\n\n' +
        'お手数をおかけいたしますが、本メールへの返信にてご回答いただけますと幸いです。\n\n{{commonFooter}}',
      status: 'active', usageNote: '上記に当てはまらない理由で確認する時に送る（P90-11-1）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-7', screenId: 'p90-11', pattern: 'abnormal', variantKey: 'cancel-document-unclear', from: 'liaison@koten-navi.com',
      name: '本人確認書類が不鮮明', subject: '【個展なび】LIAISON+機能のお申込みの取消について', body: CANCEL_BODY_STD,
      status: 'active', usageNote: '確認メールへの返信が無い、または書類を再提出できない旨の連絡をもとに取消を確定した時に送る（P90-11-1・送信は任意）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-8', screenId: 'p90-11', pattern: 'abnormal', variantKey: 'cancel-info-mismatch', from: 'liaison@koten-navi.com',
      name: '登録情報との不一致', subject: '【個展なび】LIAISON+機能のお申込みの取消について', body: CANCEL_BODY_STD,
      status: 'active', usageNote: '登録情報と本人確認書類の不一致が解消しなかった時に取消を確定した時に送る（P90-11-1・送信は任意）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-9', screenId: 'p90-11', pattern: 'abnormal', variantKey: 'cancel-resp-info', from: 'liaison@koten-navi.com',
      name: '責任者情報の不備', subject: '【個展なび】LIAISON+機能のお申込みの取消について', body: CANCEL_BODY_STD,
      status: 'active', usageNote: 'ギャラリーの責任者情報の不備が解消しなかった時に取消を確定した時に送る（P90-11-1・送信は任意）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-10', screenId: 'p90-11', pattern: 'abnormal', variantKey: 'cancel-missing-fields', from: 'liaison@koten-navi.com',
      name: '必須項目の不足', subject: '【個展なび】LIAISON+機能のお申込みの取消について', body: CANCEL_BODY_STD,
      status: 'active', usageNote: '必須項目の不足が解消しなかった時に取消を確定した時に送る（P90-11-1・送信は任意）。', updatedAt: '2026.8.11' },
    { id: 'mt-p9011-11', screenId: 'p90-11', pattern: 'abnormal', variantKey: 'cancel-other', from: 'liaison@koten-navi.com',
      name: 'その他', subject: '【個展なび】LIAISON+機能のお申込みの取消について', body: CANCEL_BODY_STD,
      status: 'active', usageNote: '上記に当てはまらない理由で取消を確定した時に送る（P90-11-1・送信は任意）。', updatedAt: '2026.8.11' },
  ];

  /* ── 自動送信メール（可視化＋文面編集）── データは docs/email-templates.md の
     発火点インベントリ（M-01/M-03/M-05・T-01〜T-10・A-01＝Drupalが状態変化で自動送出するもの）を構造化。
     M-02/M-04/M-06/M-07 は事務局がP90-2で選択・編集して送る「手動」のためここには含めない（TEMPLATESが正）。
     送信画面のピックリスト（screenId/variantKey）は持たない＝「管理」対象ではないため一覧性が主目的だが、
     件名・本文はDrupal実装フェーズへの入力仕様として起草・編集できる。
     旧「起草進捗」列（起草済/未着手の自動判定バッジ）は2026-08-11に撤去済み：本番運用フェーズでは全件
     文面が確定済み（＝「未着手」が発生しない）状態を前提とするため、管理する意味を持たないとユーザー判断。
     件名列で入力有無（「—」＝未入力）がそのまま代替の目安になるため、別列としての状態表示は不要とした。 */
  var AUTO_CATEGORY_LABEL = { apply: '機能申込系', txn: '取引系（LIAISON+）', activity: 'アクティビティ系（ウォッチ通知）' };
  var AUTO_BODY_M01 =
    '{{userName}} 様\n\nこのたびは個展なびのクリエイター機能にお申し込みいただき、\nありがとうございます。\n以下の内容でお申込みを受け付けました。\n\n' +
    '──────────────────────────────\n お申込み日：{{applyDate}}\n クリエイター名：{{creatorName}}\n──────────────────────────────\n\n' +
    '内容は個展なび事務局にて確認いたします。\n確認・設定が完了しましたら、あらためて\n「設定完了（ご利用開始）」のメールでお知らせします。\n（通常、数営業日以内にご連絡します）\n\n' +
    '※本メールは送信専用です。ご不明な点は下記よりお問い合わせください。\n　{{supportUrl}}\n\n{{commonFooter}}';
  var AUTO_TRIGGERS = [
    { id: 'M-01', category: 'apply', event: 'クリエイター機能 申込受付', aud: '申込者', source: 'p11-2 submit', timing: '送信直後（自動）',
      subject: '【個展なび】クリエイター機能のお申込みを受け付けました', body: AUTO_BODY_M01, note: 'docs/email-templates.md M-01 と同内容。', updatedAt: '2026.8.9' },
    { id: 'M-03', category: 'apply', event: 'ギャラリー機能 申込受付', aud: '申込者', source: 'p11-3 submit', timing: '送信直後（自動）',
      subject: '', body: '', note: 'M-01と同文面を{{roleName}}差替で共有予定。', updatedAt: '2026.8.9' },
    { id: 'M-05', category: 'apply', event: 'LIAISON+ 申込受付／利用開始', aud: '申込者', source: 'p11-4 submit / admin', timing: '送信直後 / 承認後', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'T-01', category: 'txn', event: '購入申込を受け付けた', aud: '購入者', source: 'S0 申込済', timing: '申込直後', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'T-02', category: 'txn', event: '申込ID順が到来・購入確定をお願い', aud: '出品者', source: 'S1 購入確定待ち', timing: '繰り上げ時', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'T-03', category: 'txn', event: '購入が確定・お支払いのお願い', aud: '購入者', source: 'S2 支払待ち', timing: '出品者の確定後', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'T-04', category: 'txn', event: '支払完了・発送のお願い', aud: '出品者', source: 'S3 発送待ち', timing: '購入者の支払後', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'T-05', category: 'txn', event: '発送完了・受取確認のお願い', aud: '購入者', source: 'S4 受取確認待ち', timing: '出品者の発送後', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'T-06', category: 'txn', event: '受取確認・完了確認のお願い', aud: '出品者', source: 'S5 完了確認待ち', timing: '購入者の受取後', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'T-07', category: 'txn', event: '取引完了', aud: '双方', source: 'F1 取引完了', timing: '完了確定時', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'T-08', category: 'txn', event: '取引キャンセル', aud: '双方', source: 'F2 キャンセル済', timing: '中断時', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'T-09', category: 'txn', event: '期限間近リマインド', aud: 'my-turn側', source: 'S1〜S5', timing: '期限接近時', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'T-10', category: 'txn', event: '確定期限超過・出品自動取消', aud: '申込者全員', source: 'S1 超過', timing: '確定期限超過時', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
    { id: 'A-01', category: 'activity', event: 'ウォッチ中のクリエイター/ギャラリーが新規掲載', aud: 'ウォッチ元ユーザー', source: '展覧会/作品/記事の公開', timing: '公開時（バッチ可）', subject: '', body: '', note: '', updatedAt: '2026.8.9' },
  ];
  var AUTO_CATEGORY_ORDER = ['apply', 'txn', 'activity'];
  function findAuto(id) {
    for (var i = 0; i < AUTO_TRIGGERS.length; i++) if (AUTO_TRIGGERS[i].id === id) return AUTO_TRIGGERS[i];
    return null;
  }

  /* ── DOM ── */
  var listEl    = document.getElementById('p909List');
  var emptyEl   = document.getElementById('p909Empty');
  var screenSel = document.getElementById('p909FilterScreen');
  var patSel    = document.getElementById('p909FilterPattern');
  var statSel   = document.getElementById('p909FilterStatus');
  var countEl   = document.getElementById('p909Count');
  var pagerEl   = document.getElementById('p909Pagination');
  var newBtn    = document.getElementById('p909NewBtn');
  if (!listEl || !screenSel || !patSel || !statSel) return;

  var page = 1;
  var PER_PAGE = 20;

  /* ── タブ切替（手動送信／自動送信） ── */
  var tabsEl        = document.getElementById('p909Tabs');
  var tabCountManual = document.getElementById('p909TabCountManual');
  var tabCountAuto   = document.getElementById('p909TabCountAuto');
  if (tabsEl) {
    tabsEl.querySelectorAll('.p909-tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabsEl.querySelectorAll('.p909-tab-btn').forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        document.querySelectorAll('.p909-tab-panel').forEach(function (panel) {
          panel.hidden = panel.id !== btn.dataset.panel;
        });
      });
    });
  }
  /* ── 自動送信タブの描画（カテゴリごとにグルーピング・カテゴリフィルター対応）＋文面編集・新規追加 ── */
  var autoListEl      = document.getElementById('p909AutoList');
  var autoEmptyEl     = document.getElementById('p909AutoEmpty');
  var autoCountEl     = document.getElementById('p909AutoCount');
  var autoFilterCatSel = document.getElementById('p909AutoFilterCategory');

  function renderAuto() {
    if (tabCountAuto) tabCountAuto.textContent = AUTO_TRIGGERS.length + '件';
    if (!autoListEl) return;
    var fcat = autoFilterCatSel ? autoFilterCatSel.value : '';
    var filtered = AUTO_TRIGGERS.filter(function (a) { return !fcat || a.category === fcat; });
    if (autoCountEl) autoCountEl.innerHTML = '<strong>' + filtered.length + '</strong>件該当';
    if (autoEmptyEl) autoEmptyEl.hidden = filtered.length !== 0;
    var html = '';
    AUTO_CATEGORY_ORDER.forEach(function (cat) {
      if (fcat && cat !== fcat) return;
      var rows = filtered.filter(function (a) { return a.category === cat; });
      if (!rows.length) return;
      html += '<div class="p909-auto-group">' +
        '<h4 class="p909-auto-group__title">' + AUTO_CATEGORY_LABEL[cat] + '<span class="ktn-count ktn-count--pill is-idle">' + rows.length + '件</span></h4>' +
        '<div class="p315-archive-table-wrap">' +
        '<table class="p315-archive-table p909-table p909-auto-table" aria-label="' + AUTO_CATEGORY_LABEL[cat] + 'の自動送信一覧">' +
          '<thead><tr>' +
            '<th>ID</th><th>発火イベント</th><th>対象 / トリガー元 / タイミング</th><th>件名</th><th>更新日</th><th>操作</th>' +
          '</tr></thead>' +
          '<tbody>' +
          rows.map(function (a) {
            return '<tr class="p909-auto-row" data-id="' + a.id + '">' +
              '<td data-label="ID" class="p909-cell--muted">' + a.id + '</td>' +
              '<td data-label="発火イベント" class="p909-cell--title">' + a.event + '</td>' +
              '<td data-label="対象 / トリガー元 / タイミング" class="p909-cell--meta">' +
                '<div class="p909-auto-meta__line">対象：' + a.aud + '</div>' +
                '<div class="p909-auto-meta__line">トリガー元：' + a.source + '</div>' +
                '<div class="p909-auto-meta__line">タイミング：' + a.timing + '</div>' +
              '</td>' +
              '<td data-label="件名" class="p909-cell--meta">' + ((a.subject || '').trim() ? a.subject : '<span class="p909-cell--muted">—</span>') + '</td>' +
              '<td data-label="更新日" class="p909-cell--muted">' + (a.updatedAt || '—') + '</td>' +
              '<td data-label="操作" class="p909-cell--actions">' +
                '<div class="p909-actions-stack">' +
                  '<button type="button" class="ktn-op-btn ktn-op-btn--sm p909-auto-row__editbtn">編集</button>' +
                  '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p909-auto-row__delbtn">削除</button>' +
                '</div>' +
              '</td>' +
            '</tr>';
          }).join('') +
          '</tbody>' +
        '</table>' +
        '</div>' +
      '</div>';
    });
    autoListEl.innerHTML = html;
  }
  renderAuto();
  if (autoFilterCatSel) autoFilterCatSel.addEventListener('change', renderAuto);

  if (autoListEl) autoListEl.addEventListener('click', function (e) {
    var editBtn = e.target.closest('.p909-auto-row__editbtn');
    var delBtn  = e.target.closest('.p909-auto-row__delbtn');
    if (!editBtn && !delBtn) return;
    var row = e.target.closest('.p909-auto-row');
    var a = row && findAuto(row.dataset.id);
    if (!a) return;
    if (editBtn) openAutoEditModal(a);
    if (delBtn)  openDelModal(a, 'auto');
  });

  /* ── 自動送信・文面編集モーダル ── */
  var autoEditModal   = document.getElementById('p909AutoEditModal');
  var autoEditBg      = document.getElementById('p909AutoEditBg');
  var autoEditCtx     = document.getElementById('p909AutoEditCtx');
  var autoEditCancel  = document.getElementById('p909AutoEditCancel');
  var autoEditSave    = document.getElementById('p909AutoEditSave');
  var autoFormSubject = document.getElementById('p909AutoFormSubject');
  var autoFormBody    = document.getElementById('p909AutoFormBody');
  var autoFormNote    = document.getElementById('p909AutoFormNote');
  var autoEditingId   = null;

  function openAutoEditModal(a) {
    if (!autoEditModal) return;
    autoEditingId = a.id;
    if (autoEditCtx) autoEditCtx.innerHTML =
      '<strong>' + a.id + '</strong>' + a.event + '<br>対象：' + a.aud + '　トリガー元：' + a.source + '　タイミング：' + a.timing;
    if (autoFormSubject) autoFormSubject.value = a.subject || '';
    if (autoFormBody)    autoFormBody.value    = a.body || '';
    if (autoFormNote)    autoFormNote.value    = a.note || '';
    autoEditModal.hidden = false;
  }
  function closeAutoEditModal() {
    if (!autoEditModal) return;
    autoEditModal.hidden = true;
    autoEditingId = null;
  }
  if (autoEditCancel) autoEditCancel.addEventListener('click', closeAutoEditModal);
  if (autoEditBg)     autoEditBg.addEventListener('click', closeAutoEditModal);
  if (autoEditSave) autoEditSave.addEventListener('click', function () {
    if (!autoEditingId) return;
    var a = findAuto(autoEditingId);
    if (!a) return;
    if (!(autoFormSubject.value || '').trim() || !(autoFormBody.value || '').trim()) {
      if (KTN.toast) KTN.toast('件名・本文を入力してください');
      return;
    }
    a.subject = autoFormSubject.value.trim();
    a.body    = autoFormBody.value;
    a.note    = (autoFormNote.value || '').trim();
    a.updatedAt = todayLabel();
    closeAutoEditModal();
    renderAuto();
    if (KTN.toast) KTN.toast('文面を保存しました（デモ）');
  });

  /* ── 自動送信・発火点を追加モーダル（docs/email-templates.md の発火点インベントリに新規行を登録する想定） ── */
  var autoNewBtn      = document.getElementById('p909AutoNewBtn');
  var autoNewModal    = document.getElementById('p909AutoNewModal');
  var autoNewBg       = document.getElementById('p909AutoNewBg');
  var autoNewCancel   = document.getElementById('p909AutoNewCancel');
  var autoNewSave     = document.getElementById('p909AutoNewSave');
  var autoNewId       = document.getElementById('p909AutoNewId');
  var autoNewCategory = document.getElementById('p909AutoNewCategory');
  var autoNewEvent    = document.getElementById('p909AutoNewEvent');
  var autoNewAud      = document.getElementById('p909AutoNewAud');
  var autoNewSource   = document.getElementById('p909AutoNewSource');
  var autoNewTiming   = document.getElementById('p909AutoNewTiming');
  var autoNewSubject  = document.getElementById('p909AutoNewSubject');
  var autoNewBody     = document.getElementById('p909AutoNewBody');
  var autoNewNote     = document.getElementById('p909AutoNewNote');

  function openAutoNewModal() {
    if (!autoNewModal) return;
    if (autoNewId)       autoNewId.value = '';
    if (autoNewCategory) autoNewCategory.value = (autoFilterCatSel && autoFilterCatSel.value) || 'apply';
    if (autoNewEvent)    autoNewEvent.value = '';
    if (autoNewAud)      autoNewAud.value = '';
    if (autoNewSource)   autoNewSource.value = '';
    if (autoNewTiming)   autoNewTiming.value = '';
    if (autoNewSubject)  autoNewSubject.value = '';
    if (autoNewBody)     autoNewBody.value = '';
    if (autoNewNote)     autoNewNote.value = '';
    autoNewModal.hidden = false;
  }
  function closeAutoNewModal() {
    if (!autoNewModal) return;
    autoNewModal.hidden = true;
  }
  if (autoNewBtn)    autoNewBtn.addEventListener('click', openAutoNewModal);
  if (autoNewCancel) autoNewCancel.addEventListener('click', closeAutoNewModal);
  if (autoNewBg)     autoNewBg.addEventListener('click', closeAutoNewModal);
  if (autoNewSave) autoNewSave.addEventListener('click', function () {
    var id = (autoNewId.value || '').trim();
    var event = (autoNewEvent.value || '').trim();
    if (!id || !event) {
      if (KTN.toast) KTN.toast('必須項目を入力してください');
      return;
    }
    if (findAuto(id)) {
      if (KTN.toast) KTN.toast('このIDは既に使用されています');
      return;
    }
    AUTO_TRIGGERS.push({
      id: id, category: autoNewCategory.value, event: event,
      aud: (autoNewAud.value || '').trim(), source: (autoNewSource.value || '').trim(), timing: (autoNewTiming.value || '').trim(),
      subject: (autoNewSubject.value || '').trim(), body: autoNewBody.value || '', note: (autoNewNote.value || '').trim(),
      updatedAt: todayLabel(),
    });
    closeAutoNewModal();
    renderAuto();
    if (KTN.toast) KTN.toast('発火点を追加しました（デモ）');
  });

  function todayLabel() {
    var d = new Date();
    var mm = d.getMinutes();
    return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + ' ' + d.getHours() + ':' + (mm < 10 ? '0' : '') + mm;
  }

  /* 使用画面フィルタの選択肢はデータから動的に構築（新規追加のscreenIdが増えても手動更新不要） */
  (function buildScreenOptions() {
    var seen = {}, ids = [];
    TEMPLATES.forEach(function (t) { if (!seen[t.screenId]) { seen[t.screenId] = 1; ids.push(t.screenId); } });
    ids.forEach(function (id) {
      var opt = document.createElement('option');
      opt.value = id;
      opt.textContent = (SCREEN_LABEL[id] || id) + '（' + id.toUpperCase() + '）';
      screenSel.appendChild(opt);
    });
  })();

  function findTpl(id) {
    for (var i = 0; i < TEMPLATES.length; i++) if (TEMPLATES[i].id === id) return TEMPLATES[i];
    return null;
  }

  function makeItem(t) {
    var tr = document.createElement('tr');
    tr.className = 'p909-row';
    tr.dataset.id = t.id;
    tr.innerHTML =
      '<td data-label="パターン"><span class="cb cb-content ' + PATTERN_CLS[t.pattern] + '">' + PATTERN_LABEL[t.pattern] + '</span></td>' +
      '<td data-label="使用画面 / 識別キー" class="p909-cell--meta">' +
        '<div class="p909-cell__screen">' + (SCREEN_LABEL[t.screenId] || t.screenId) + '</div>' +
        '<div class="p909-cell__key">' + t.variantKey + '</div>' +
      '</td>' +
      '<td data-label="テンプレート名" class="p909-cell--title">' + t.name + '</td>' +
      '<td data-label="更新日" class="p909-cell--muted">' + t.updatedAt + '</td>' +
      '<td data-label="状態">' + (t.status === 'archived' ? '<span class="ktn-review-status ktn-review-status--returned">廃止</span>' : '<span class="ktn-review-status ktn-review-status--granted">有効</span>') + '</td>' +
      '<td data-label="操作" class="p909-cell--actions"><div class="p909-actions-stack">' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--sm p909-row__edit">編集</button>' +
        (t.status === 'active' ? '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p909-row__del">削除</button>' : '') +
      '</div></td>';
    return tr;
  }

  function render() {
    var fscr = screenSel.value, fpat = patSel.value, fstat = statSel.value;
    var rows = TEMPLATES.filter(function (t) {
      if (fscr && t.screenId !== fscr) return false;
      if (fpat && t.pattern !== fpat) return false;
      if (fstat && t.status !== fstat) return false;
      return true;
    });
    if (emptyEl) emptyEl.hidden = rows.length !== 0;
    if (countEl) countEl.innerHTML = '<strong>' + rows.length + '</strong>件該当';
    if (tabCountManual) tabCountManual.textContent = TEMPLATES.filter(function (t) { return t.status === 'active'; }).length + '件';

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = '';
    pageRows.forEach(function (t) { listEl.appendChild(makeItem(t)); });
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }
  screenSel.addEventListener('change', renderReset);
  patSel.addEventListener('change', renderReset);
  statSel.addEventListener('change', renderReset);
  render();

  /* ── 新規／編集モーダル ── */
  var editModal    = document.getElementById('p909EditModal');
  var editBg       = document.getElementById('p909EditBg');
  var editTitle    = document.getElementById('p909EditTitle');
  var editCancel   = document.getElementById('p909EditCancel');
  var editSave     = document.getElementById('p909EditSave');
  var formScreen   = document.getElementById('p909FormScreen');
  var formPattern  = document.getElementById('p909FormPattern');
  var formKey      = document.getElementById('p909FormKey');
  var formName     = document.getElementById('p909FormName');
  var formFrom     = document.getElementById('p909FormFrom');
  var formSubject  = document.getElementById('p909FormSubject');
  var formBody     = document.getElementById('p909FormBody');
  var formNote     = document.getElementById('p909FormNote');
  var editingId    = null;

  if (formFrom) formFrom.innerHTML = KTN.mailFromOptionsHtml();

  function openEditModal(t) {
    if (!editModal) return;
    editingId = t ? t.id : null;
    if (editTitle) editTitle.textContent = t ? 'テンプレートを編集' : '新規テンプレート';
    if (formScreen)  formScreen.value  = t ? t.screenId : (screenSel.value || 'p90-2');
    if (formPattern) formPattern.value = t ? t.pattern  : (patSel.value || 'normal');
    if (formKey)     formKey.value     = t ? t.variantKey : '';
    if (formName)    formName.value    = t ? t.name : '';
    if (formFrom)    formFrom.value    = t ? t.from : KTN.MAIL_FROM_ADDRESSES[0];
    if (formSubject) formSubject.value = t ? t.subject : '';
    if (formBody)    formBody.value    = t ? t.body : '';
    if (formNote)    formNote.value    = t ? (t.usageNote || '') : '';
    editModal.hidden = false;
  }
  function closeEditModal() {
    if (!editModal) return;
    editModal.hidden = true;
    editingId = null;
  }
  if (newBtn)     newBtn.addEventListener('click', function () { openEditModal(null); });
  if (editCancel) editCancel.addEventListener('click', closeEditModal);
  if (editBg)     editBg.addEventListener('click', closeEditModal);

  if (editSave) editSave.addEventListener('click', function () {
    var key = (formKey.value || '').trim();
    var name = (formName.value || '').trim();
    var subject = (formSubject.value || '').trim();
    var body = formBody.value || '';
    if (!key || !name || !subject || !body.trim()) {
      if (KTN.toast) KTN.toast('必須項目を入力してください');
      return;
    }
    var dup = TEMPLATES.some(function (t) { return t.variantKey === key && t.id !== editingId; });
    if (dup) {
      if (KTN.toast) KTN.toast('この識別キーは既に使用されています');
      return;
    }
    if (editingId) {
      var t = findTpl(editingId);
      if (t) {
        t.screenId = formScreen.value; t.pattern = formPattern.value; t.variantKey = key;
        t.name = name; t.from = formFrom ? formFrom.value : t.from; t.subject = subject; t.body = body; t.usageNote = formNote.value || '';
        t.updatedAt = todayLabel();
      }
    } else {
      TEMPLATES.push({
        id: 'mt-' + Date.now(), screenId: formScreen.value, pattern: formPattern.value, variantKey: key,
        name: name, from: formFrom ? formFrom.value : KTN.MAIL_FROM_ADDRESSES[0], subject: subject, body: body, status: 'active', usageNote: formNote.value || '', updatedAt: todayLabel(),
      });
    }
    closeEditModal();
    render();
    if (KTN.toast) KTN.toast('テンプレートを保存しました（デモ）');
  });

  /* ── 一覧の操作（イベント委譲） ── */
  listEl.addEventListener('click', function (e) {
    var item = e.target.closest('.p909-row');
    if (!item) return;
    var t = findTpl(item.dataset.id);
    if (!t) return;
    if (e.target.closest('.p909-row__edit')) { openEditModal(t); return; }
    if (e.target.closest('.p909-row__del'))  { openDelModal(t); return; }
  });

  /* ── 削除（archived化のみ・個々の使用実績＝ログは判定しない。
        ただし画面の必須区分〔SCREEN_REQUIRED_CATEGORIES〕内の最後の1件は
        送信パネルが空になるため削除をブロックする） ── */
  var delModal   = document.getElementById('p909DelModal');
  var delTitle   = document.getElementById('p909DelTitle');
  var delDesc    = document.getElementById('p909DelDesc');
  var delCancel  = document.getElementById('p909DelCancel');
  var delConfirm = document.getElementById('p909DelConfirm');
  var delBg      = document.getElementById('p909DelBg');
  var pendingDel     = null;
  var pendingDelType = 'manual'; /* 'manual' | 'auto'（自動送信タブの発火点削除も同一モーダルを共用） */

  function removeAuto(id) {
    for (var i = 0; i < AUTO_TRIGGERS.length; i++) {
      if (AUTO_TRIGGERS[i].id === id) { AUTO_TRIGGERS.splice(i, 1); return; }
    }
  }

  /* type='auto' の場合、区分ガード（SCREEN_REQUIRED_CATEGORIES）は手動送信テンプレート固有のため適用しない */
  function openDelModal(t, type) {
    if (!delModal) return;
    pendingDel = t.id;
    pendingDelType = type || 'manual';
    if (pendingDelType === 'auto') {
      if (delTitle) delTitle.textContent = '発火点を削除しますか？';
      if (delDesc) delDesc.innerHTML = '<span class="p319-del-modal__name">' + t.event + '</span>（ID：' + t.id + '）を一覧から削除します。docs/email-templates.md の発火点インベントリとの対応が失われるため、Drupal側でこの発火点自体が不要になった場合のみ削除してください。';
      if (delConfirm) delConfirm.hidden = false;
      if (delCancel) delCancel.textContent = 'キャンセル';
      delModal.hidden = false;
      return;
    }
    var cat = findCategory(t);
    var blocked = cat && isLastActiveInCategory(t, cat);
    if (blocked) {
      if (delTitle) delTitle.textContent = 'この操作は行えません';
      if (delDesc) delDesc.innerHTML = '<span class="p319-del-modal__name">' + t.name + '</span>' +
        (SCREEN_LABEL[t.screenId] || t.screenId) + 'の「' + cat.label + '」に該当する有効なテンプレートが、これ1件のみです。削除すると送信画面のパネルが空になるため、先に同じ区分の別テンプレートを追加するか、このテンプレートを編集してご利用ください。';
      if (delConfirm) delConfirm.hidden = true;
      if (delCancel) delCancel.textContent = '閉じる';
    } else {
      if (delTitle) delTitle.textContent = 'テンプレートを削除しますか？';
      if (delDesc) delDesc.innerHTML = '<span class="p319-del-modal__name">' + t.name + '</span>' +
        'このテンプレートを一覧から削除します（廃止扱いとなり、送信画面の選択肢からも表示されなくなります）。';
      if (delConfirm) delConfirm.hidden = false;
      if (delCancel) delCancel.textContent = 'キャンセル';
    }
    delModal.hidden = false;
  }
  function closeDelModal() {
    if (!delModal) return;
    delModal.hidden = true;
    pendingDel = null;
    pendingDelType = 'manual';
  }
  if (delCancel) delCancel.addEventListener('click', closeDelModal);
  if (delBg)     delBg.addEventListener('click', closeDelModal);
  if (delConfirm) delConfirm.addEventListener('click', function () {
    if (!pendingDel) return;
    if (pendingDelType === 'auto') {
      removeAuto(pendingDel);
      closeDelModal();
      renderAuto();
      if (KTN.toast) KTN.toast('発火点を削除しました（デモ）');
      return;
    }
    var t = findTpl(pendingDel);
    if (t) { t.status = 'archived'; t.updatedAt = todayLabel(); }
    closeDelModal();
    render();
    if (KTN.toast) KTN.toast('テンプレートを削除しました（デモ）');
  });

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P3-13  クリエイター-オーディエンス管理（p4-13=ギャラリー版と対）
   「ウォッチャー」（自分をウォッチしているアカウント）と「チェックイン」（自分の展覧会＝
   投稿・参加のいずれも対象にチェックインしたアカウント）をタブで切替表示する。
   ウォッチ元・チェックイン元は一般ユーザー・クリエイター・ギャラリーいずれもありうるが、
   watch/checkinはユーザー機能として定義しているため種別（ロール）の絞り込みUIは持たない
   （ウォッチ対象になれるのはクリエイター・ギャラリーのみだが、ウォッチ/チェックインする側の種別は意識させない）。
   一覧行はどちらのタブも .p2-watcher-item/.p2-watcher-list（p2ウォッチャーモーダルと同一部品）を流用。
   カウンターはp2モーダルと同じ並び（ウォッチ数→チェックイン数→興味あり数）で揃え、
   ウォッチ数＝このアカウントがサイト全体でウォッチしている先（クリエイター・ギャラリー）の総数。
   総ウォッチャー数・新規ウォッチャー・チェックイン人数（過去30日）の数値はp3-12インサイトの同項目と揃えている。
════════════════════════════════════════════════════ */
KTN.pages['p3-13'] = function () {

  /* ── タブ切替（ウォッチャー／チェックイン） ── */
  var tabsEl = document.getElementById('p313Tabs');
  if (tabsEl) {
    var panels = { watch: document.getElementById('p313PanelWatch'), checkin: document.getElementById('p313PanelCheckin') };
    tabsEl.querySelectorAll('.p313-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.tab;
        tabsEl.querySelectorAll('.p313-tab').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        Object.keys(panels).forEach(function (k) { if (panels[k]) panels[k].hidden = (k !== key); });
      });
    });
  }

  var SVG_W = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="8" cy="8" r="7" fill="#3a90e0"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>';
  var SVG_C = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="10" cy="5" r="4" fill="#3a90e0"/><circle cx="5" cy="11" r="2.4" fill="#3a90e0"/></svg>';
  var SVG_I = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#3a90e0" stroke="#3a90e0" stroke-width=".6" stroke-linejoin="round"/></svg>';
  var SVG_C_GRAY = '<svg viewBox="0 0 16 16" fill="none" width="10" height="10"><circle cx="10" cy="5" r="4" fill="#9aa3ac"/><circle cx="5" cy="11" r="2.4" fill="#9aa3ac"/></svg>';
  var SVG_W_GRAY = '<svg viewBox="0 0 16 16" fill="none" width="10" height="10"><circle cx="8" cy="8" r="7" fill="#9aa3ac"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>';

  /* ── サンプルデータ（田中透をウォッチしているアカウント）──
     type＝user/creator/gallery（アカウント種別の参考情報。ウォッチ/チェックインはuserとしての機能のため、アバター形状は種別によらず常に .p2-watcher-item__avatar--user＝円形で統一）。
     watch＝このアカウントがサイト全体でウォッチしている先（クリエイター・ギャラリー）の総数＝p2ウォッチャーモーダルと同じSVG_W。
     checkin＝田中透の展覧会へのチェックイン回数、interest＝田中透の作品への興味あり！件数。
     since＝ウォッチ開始日（表示用）、ts＝並べ替え用の数値キー。 */
  var WATCHERS = [
    { id:'w1',  name:'佐藤 美咲',        type:'user',    color:'linear-gradient(145deg,#a8b8c8,#6a8098)', watch:12, checkin:3, interest:5, since:'2026.5.20', ts:20260520 },
    { id:'w2',  name:'高橋 陶子',        type:'creator', color:'linear-gradient(145deg,#6a9aaa,#2a6a8a)', watch:8,  checkin:1, interest:2, since:'2026.4.2',  ts:20260402 },
    { id:'w3',  name:'Gallery MUKU',    type:'gallery', color:'linear-gradient(145deg,#c8b89a,#a09070)', watch:6,  checkin:2, interest:0, since:'2026.3.14', ts:20260314 },
    { id:'w4',  name:'中村 拓也',        type:'user',    color:'linear-gradient(145deg,#c8a8b8,#986878)', watch:4,  checkin:0, interest:1, since:'2026.6.1',  ts:20260601 },
    { id:'w5',  name:'木村 彩',          type:'user',    color:'linear-gradient(145deg,#b8c8a8,#789068)', watch:9,  checkin:1, interest:3, since:'2026.5.2',  ts:20260502 },
    { id:'w6',  name:'渡辺 硝子',        type:'creator', color:'linear-gradient(145deg,#aa7a9a,#7a3a6a)', watch:15, checkin:0, interest:4, since:'2026.2.18', ts:20260218 },
    { id:'w7',  name:'Gallery SOIL 渋谷', type:'gallery', color:'linear-gradient(145deg,#9ab8c8,#6a8898)', watch:11, checkin:4, interest:1, since:'2026.1.9',  ts:20260109 },
    { id:'w8',  name:'小林 志保',        type:'user',    color:'linear-gradient(145deg,#8a9aaa,#4a5a7a)', watch:7,  checkin:2, interest:2, since:'2026.5.28', ts:20260528 },
    { id:'w9',  name:'加藤 蒼',          type:'user',    color:'linear-gradient(145deg,#a8b8c8,#6a8098)', watch:2,  checkin:0, interest:0, since:'2026.6.10', ts:20260610 },
    { id:'w10', name:'吉田 織部',        type:'creator', color:'linear-gradient(145deg,#8aaa6a,#4a7a2a)', watch:10, checkin:1, interest:1, since:'2026.3.30', ts:20260330 },
    { id:'w11', name:'山本 結',          type:'user',    color:'linear-gradient(145deg,#c8a8b8,#986878)', watch:18, checkin:3, interest:6, since:'2026.4.25', ts:20260425 },
    { id:'w12', name:'Gallery 灯',       type:'gallery', color:'linear-gradient(145deg,#b8a8c8,#8878a8)', watch:5,  checkin:1, interest:0, since:'2026.2.5',  ts:20260205 },
    { id:'w13', name:'鈴木 遥',          type:'user',    color:'linear-gradient(145deg,#b8c8a8,#789068)', watch:3,  checkin:0, interest:2, since:'2026.6.15', ts:20260615 },
    { id:'w14', name:'松本 版画',        type:'creator', color:'linear-gradient(145deg,#aaaa6a,#7a7a1a)', watch:13, checkin:2, interest:3, since:'2026.1.22', ts:20260122 },
  ];

  var listEl  = document.getElementById('p313List');
  var emptyEl = document.getElementById('p313Empty');
  var sortSel = document.getElementById('p313Sort');
  var countEl = document.getElementById('p313Count');
  var pagerEl = document.getElementById('p313Pagination');
  if (!listEl || !sortSel) return;

  var page = 1;
  var PER_PAGE = 8;

  var SORTS = {
    'since-desc':  function (a, b) { return b.ts - a.ts; },
    'since-asc':   function (a, b) { return a.ts - b.ts; },
    'name':        function (a, b) { return a.name.localeCompare(b.name, 'ja'); },
    'engage-desc': function (a, b) { return (b.watch + b.checkin + b.interest) - (a.watch + a.checkin + a.interest); },
  };

  function makeItem(w) {
    return '<div class="p2-watcher-item">' +
      '<a href="#" class="p2-watcher-item__avatar p2-watcher-item__avatar--user" style="background:' + w.color + '">' + w.name.charAt(0) + '</a>' +
      '<div class="p2-watcher-item__info">' +
        '<a href="#" class="p2-watcher-item__name">' + w.name + '</a>' +
        '<div class="p2-watcher-item__counts">' +
          '<span class="p2-watcher-item__count">' + SVG_W + w.watch + '</span>' +
          '<span class="p2-watcher-item__count">' + SVG_C + w.checkin + '</span>' +
          '<span class="p2-watcher-item__count">' + SVG_I + w.interest + '</span>' +
        '</div>' +
        '<div class="p313-w-since">' + SVG_W_GRAY + w.since + '</div>' +
      '</div>' +
    '</div>';
  }

  function render() {
    var rows = WATCHERS.slice();
    rows.sort(SORTS[sortSel.value] || SORTS['since-desc']);
    if (countEl) countEl.textContent = rows.length + '件';
    if (emptyEl) emptyEl.hidden = rows.length !== 0;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = pageRows.map(makeItem).join('');
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }
  sortSel.addEventListener('change', renderReset);
  render();

  /* ── 通知トグル（ウォッチャー・チェックイン共通の単一設定） ── */
  var notifySw = document.getElementById('p313NotifySw');
  if (notifySw) {
    notifySw.addEventListener('click', function () {
      var on = !notifySw.classList.contains('is-on');
      notifySw.classList.toggle('is-on', on);
      notifySw.setAttribute('aria-checked', on);
      notifySw.querySelector('.ktn-switch__label').textContent = on ? '受け取る' : '受け取らない';
      if (KTN.toast) KTN.toast(on ? '新しいオーディエンスの通知をオンにしました' : '新しいオーディエンスの通知をオフにしました');
    });
  }

  /* ── チェックイン一覧 ──
     1行＝1人（人物の重複を作らない）。visits＝この人物がチェックインした履歴の配列
     （exh＝p3-18のEXHIBITIONSと同一id・x4/x5/x7、exhName＝表示名、period＝会期、date/ts＝チェックイン日）。
     同一人物が複数展覧会／複数回チェックインしていればvisitsが複数件になり、カード内に複数行で表示する
     （カウンター行の下＝チェックイン日＋展覧会名・会期を1行、というユーザー指示に対応）。
     watch/interest＝そのアカウントのサイト全体でのウォッチ数・興味あり数、checkin数はvisits.lengthから算出
     （ウォッチャー一覧と同じ3アイコン・同じ順序＝ウォッチ→チェックイン→興味あり！）。 */
  var CHECKINS = [
    { id:'c1',  name:'佐藤 美咲',        type:'user',    color:'linear-gradient(145deg,#a8b8c8,#6a8098)', watch:12, interest:5,
      visits:[ { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.7.22', ts:20260722 } ] },
    { id:'c2',  name:'岡田 陸',          type:'user',    color:'linear-gradient(145deg,#9ab0c0,#5a7898)', watch:3,  interest:1,
      visits:[ { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.7.24', ts:20260724 } ] },
    { id:'c3',  name:'高橋 陶子',        type:'creator', color:'linear-gradient(145deg,#6a9aaa,#2a6a8a)', watch:8,  interest:2,
      visits:[
        { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.7.25', ts:20260725 },
        { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.8.9',  ts:20260809 },
      ] },
    { id:'c4',  name:'Gallery SOIL 渋谷', type:'gallery', color:'linear-gradient(145deg,#9ab8c8,#6a8898)', watch:11, interest:1,
      visits:[ { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.7.27', ts:20260727 } ] },
    { id:'c5',  name:'中村 拓也',        type:'user',    color:'linear-gradient(145deg,#c8a8b8,#986878)', watch:4,  interest:1,
      visits:[ { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.7.30', ts:20260730 } ] },
    { id:'c6',  name:'木村 彩',          type:'user',    color:'linear-gradient(145deg,#b8c8a8,#789068)', watch:9,  interest:3,
      visits:[ { exh:'x5', exhName:'まなざしの重奏', period:'2026.7.25 - 2026.8.5', date:'2026.7.28', ts:20260728 } ] },
    { id:'c7',  name:'渡辺 硝子',        type:'creator', color:'linear-gradient(145deg,#aa7a9a,#7a3a6a)', watch:15, interest:4,
      visits:[ { exh:'x5', exhName:'まなざしの重奏', period:'2026.7.25 - 2026.8.5', date:'2026.7.29', ts:20260729 } ] },
    { id:'c8',  name:'福田 玲奈',        type:'user',    color:'linear-gradient(145deg,#c8b0a0,#987860)', watch:1,  interest:0,
      visits:[ { exh:'x5', exhName:'まなざしの重奏', period:'2026.7.25 - 2026.8.5', date:'2026.8.1',  ts:20260801 } ] },
    { id:'c9',  name:'小林 志保',        type:'user',    color:'linear-gradient(145deg,#8a9aaa,#4a5a7a)', watch:7,  interest:2,
      visits:[ { exh:'x7', exhName:'ことばの余白', period:'2025.12.1 - 2025.12.20', date:'2025.12.10', ts:20251210 } ] },
    { id:'c10', name:'Gallery 灯',       type:'gallery', color:'linear-gradient(145deg,#b8a8c8,#8878a8)', watch:5,  interest:0,
      visits:[ { exh:'x7', exhName:'ことばの余白', period:'2025.12.1 - 2025.12.20', date:'2025.12.14', ts:20251214 } ] },
    { id:'c11', name:'吉田 織部',        type:'creator', color:'linear-gradient(145deg,#8aaa6a,#4a7a2a)', watch:10, interest:1,
      visits:[ { exh:'x7', exhName:'ことばの余白', period:'2025.12.1 - 2025.12.20', date:'2025.12.18', ts:20251218 } ] },
    { id:'c12', name:'山本 結',          type:'user',    color:'linear-gradient(145deg,#c8a8b8,#986878)', watch:18, interest:6,
      visits:[
        { exh:'x7', exhName:'ことばの余白', period:'2025.12.1 - 2025.12.20', date:'2025.12.19', ts:20251219 },
        { exh:'x5', exhName:'まなざしの重奏', period:'2026.7.25 - 2026.8.5', date:'2026.7.31', ts:20260731 },
      ] },
  ];

  var ckListEl  = document.getElementById('p313CkList');
  var ckEmptyEl = document.getElementById('p313CkEmpty');
  var ckExhSel  = document.getElementById('p313CkFilterExh');
  var ckSortSel = document.getElementById('p313CkSort');
  var ckCountEl = document.getElementById('p313CkCount');
  var ckPagerEl = document.getElementById('p313CkPagination');

  if (ckListEl && ckExhSel && ckSortSel) {
    var ckPage = 1;
    var CK_PER_PAGE = 8;

    function ckLatestTs(c) { return Math.max.apply(null, c.visits.map(function (v) { return v.ts; })); }
    function ckEarliestTs(c) { return Math.min.apply(null, c.visits.map(function (v) { return v.ts; })); }

    var CK_SORTS = {
      'date-desc':   function (a, b) { return ckLatestTs(b) - ckLatestTs(a); },
      'date-asc':    function (a, b) { return ckEarliestTs(a) - ckEarliestTs(b); },
      'name':        function (a, b) { return a.name.localeCompare(b.name, 'ja'); },
      'engage-desc': function (a, b) { return (b.watch + b.visits.length + b.interest) - (a.watch + a.visits.length + a.interest); },
    };

    var makeCkItem = function (c) {
      var visitsSorted = c.visits.slice().sort(function (a, b) { return b.ts - a.ts; });
      var visitsHtml = visitsSorted.map(function (v) {
        return '<div class="p313-ck-visit">' +
          '<span class="p313-ck-visit__date">' + SVG_C_GRAY + v.date + '</span>' +
          '<span class="p313-ck-visit__exh"><span class="cb cb-content cb-exhibition">exhibition</span>' + v.exhName + ' · ' + v.period + '</span>' +
        '</div>';
      }).join('');
      return '<div class="p2-watcher-item">' +
        '<a href="#" class="p2-watcher-item__avatar p2-watcher-item__avatar--user" style="background:' + c.color + '">' + c.name.charAt(0) + '</a>' +
        '<div class="p2-watcher-item__info">' +
          '<a href="#" class="p2-watcher-item__name">' + c.name + '</a>' +
          '<div class="p2-watcher-item__counts">' +
            '<span class="p2-watcher-item__count">' + SVG_W + c.watch + '</span>' +
            '<span class="p2-watcher-item__count">' + SVG_C + c.visits.length + '</span>' +
            '<span class="p2-watcher-item__count">' + SVG_I + c.interest + '</span>' +
          '</div>' +
          '<div class="p313-ck-visits">' + visitsHtml + '</div>' +
        '</div>' +
      '</div>';
    };

    var renderCk = function () {
      var fe = ckExhSel.value;
      var rows = CHECKINS.filter(function (c) {
        return !fe || c.visits.some(function (v) { return v.exh === fe; });
      });
      rows.sort(CK_SORTS[ckSortSel.value] || CK_SORTS['date-desc']);
      if (ckCountEl) ckCountEl.textContent = rows.length + '件';
      if (ckEmptyEl) ckEmptyEl.hidden = rows.length !== 0;

      var totalPages = Math.max(1, Math.ceil(rows.length / CK_PER_PAGE));
      if (ckPage > totalPages) ckPage = totalPages;
      var pageRows = rows.slice((ckPage - 1) * CK_PER_PAGE, ckPage * CK_PER_PAGE);
      ckListEl.innerHTML = pageRows.map(makeCkItem).join('');
      KTN.pagination.render(ckPagerEl, {
        page: ckPage,
        totalPages: totalPages,
        onGoto: function (p) { ckPage = p; renderCk(); },
      });
    };

    var renderCkReset = function () { ckPage = 1; renderCk(); };
    ckExhSel.addEventListener('change', renderCkReset);
    ckSortSel.addEventListener('change', renderCkReset);
    renderCk();
  }

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P4-13  ギャラリー-オーディエンス管理（p3-13=クリエイター版と対）
   構造・CSSクラスは .p313-* を共有ネームスペースとして再利用（p3-14/p4-14と同じ方式）。
   要素IDのみ p413* に差し替え、KTN.pages['p3-13']とは別関数として実装。
   チェックイン展覧会データはp4-18のEXHIBITIONS（g4/g5/g7＝live-solo/ending-group/closed-solo）と対応。
════════════════════════════════════════════════════ */
KTN.pages['p4-13'] = function () {

  /* ── タブ切替（ウォッチャー／チェックイン） ── */
  var tabsEl = document.getElementById('p413Tabs');
  if (tabsEl) {
    var panels = { watch: document.getElementById('p413PanelWatch'), checkin: document.getElementById('p413PanelCheckin') };
    tabsEl.querySelectorAll('.p313-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.tab;
        tabsEl.querySelectorAll('.p313-tab').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        Object.keys(panels).forEach(function (k) { if (panels[k]) panels[k].hidden = (k !== key); });
      });
    });
  }

  var SVG_W = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="8" cy="8" r="7" fill="#3a90e0"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>';
  var SVG_C = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="10" cy="5" r="4" fill="#3a90e0"/><circle cx="5" cy="11" r="2.4" fill="#3a90e0"/></svg>';
  var SVG_I = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#3a90e0" stroke="#3a90e0" stroke-width=".6" stroke-linejoin="round"/></svg>';
  var SVG_C_GRAY = '<svg viewBox="0 0 16 16" fill="none" width="10" height="10"><circle cx="10" cy="5" r="4" fill="#9aa3ac"/><circle cx="5" cy="11" r="2.4" fill="#9aa3ac"/></svg>';
  var SVG_W_GRAY = '<svg viewBox="0 0 16 16" fill="none" width="10" height="10"><circle cx="8" cy="8" r="7" fill="#9aa3ac"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>';

  /* ── サンプルデータ（Gallery SOIL 渋谷をウォッチしているアカウント）── p3-13と同じフィールド構成 */
  var WATCHERS = [
    { id:'w1',  name:'佐藤 美咲',        type:'user',    color:'linear-gradient(145deg,#a8b8c8,#6a8098)', watch:9,  checkin:2, interest:3, since:'2026.5.18', ts:20260518 },
    { id:'w2',  name:'田中 透',          type:'creator', color:'linear-gradient(145deg,#7ab4cc,#4a8099)', watch:6,  checkin:1, interest:1, since:'2026.4.30', ts:20260430 },
    { id:'w3',  name:'Gallery 灯',       type:'gallery', color:'linear-gradient(145deg,#b8a8c8,#8878a8)', watch:4,  checkin:0, interest:0, since:'2026.3.9',  ts:20260309 },
    { id:'w4',  name:'中村 拓也',        type:'user',    color:'linear-gradient(145deg,#c8a8b8,#986878)', watch:3,  checkin:1, interest:2, since:'2026.6.3',  ts:20260603 },
    { id:'w5',  name:'木村 彩',          type:'user',    color:'linear-gradient(145deg,#b8c8a8,#789068)', watch:7,  checkin:0, interest:1, since:'2026.5.6',  ts:20260506 },
    { id:'w6',  name:'渡辺 硝子',        type:'creator', color:'linear-gradient(145deg,#aa7a9a,#7a3a6a)', watch:11, checkin:2, interest:3, since:'2026.2.20', ts:20260220 },
    { id:'w7',  name:'Gallery MUKU',    type:'gallery', color:'linear-gradient(145deg,#c8b89a,#a09070)', watch:5,  checkin:1, interest:0, since:'2026.1.12', ts:20260112 },
    { id:'w8',  name:'小林 志保',        type:'user',    color:'linear-gradient(145deg,#8a9aaa,#4a5a7a)', watch:6,  checkin:1, interest:2, since:'2026.5.25', ts:20260525 },
    { id:'w9',  name:'加藤 蒼',          type:'user',    color:'linear-gradient(145deg,#a8b8c8,#6a8098)', watch:1,  checkin:0, interest:0, since:'2026.6.8',  ts:20260608 },
    { id:'w10', name:'吉田 織部',        type:'creator', color:'linear-gradient(145deg,#8aaa6a,#4a7a2a)', watch:8,  checkin:1, interest:1, since:'2026.3.27', ts:20260327 },
    { id:'w11', name:'山本 結',          type:'user',    color:'linear-gradient(145deg,#c8a8b8,#986878)', watch:13, checkin:2, interest:4, since:'2026.4.21', ts:20260421 },
    { id:'w12', name:'岡田 陸',          type:'user',    color:'linear-gradient(145deg,#9ab0c0,#5a7898)', watch:2,  checkin:0, interest:1, since:'2026.2.2',  ts:20260202 },
    { id:'w13', name:'鈴木 遥',          type:'user',    color:'linear-gradient(145deg,#b8c8a8,#789068)', watch:2,  checkin:0, interest:1, since:'2026.6.12', ts:20260612 },
    { id:'w14', name:'松本 版画',        type:'creator', color:'linear-gradient(145deg,#aaaa6a,#7a7a1a)', watch:9,  checkin:1, interest:2, since:'2026.1.19', ts:20260119 },
  ];

  var listEl  = document.getElementById('p413List');
  var emptyEl = document.getElementById('p413Empty');
  var sortSel = document.getElementById('p413Sort');
  var countEl = document.getElementById('p413Count');
  var pagerEl = document.getElementById('p413Pagination');
  if (!listEl || !sortSel) return;

  var page = 1;
  var PER_PAGE = 8;

  var SORTS = {
    'since-desc':  function (a, b) { return b.ts - a.ts; },
    'since-asc':   function (a, b) { return a.ts - b.ts; },
    'name':        function (a, b) { return a.name.localeCompare(b.name, 'ja'); },
    'engage-desc': function (a, b) { return (b.watch + b.checkin + b.interest) - (a.watch + a.checkin + a.interest); },
  };

  function makeItem(w) {
    return '<div class="p2-watcher-item">' +
      '<a href="#" class="p2-watcher-item__avatar p2-watcher-item__avatar--user" style="background:' + w.color + '">' + w.name.charAt(0) + '</a>' +
      '<div class="p2-watcher-item__info">' +
        '<a href="#" class="p2-watcher-item__name">' + w.name + '</a>' +
        '<div class="p2-watcher-item__counts">' +
          '<span class="p2-watcher-item__count">' + SVG_W + w.watch + '</span>' +
          '<span class="p2-watcher-item__count">' + SVG_C + w.checkin + '</span>' +
          '<span class="p2-watcher-item__count">' + SVG_I + w.interest + '</span>' +
        '</div>' +
        '<div class="p313-w-since">' + SVG_W_GRAY + w.since + '</div>' +
      '</div>' +
    '</div>';
  }

  function render() {
    var rows = WATCHERS.slice();
    rows.sort(SORTS[sortSel.value] || SORTS['since-desc']);
    if (countEl) countEl.textContent = rows.length + '件';
    if (emptyEl) emptyEl.hidden = rows.length !== 0;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = pageRows.map(makeItem).join('');
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }
  sortSel.addEventListener('change', renderReset);
  render();

  /* ── 通知トグル（ウォッチャー・チェックイン共通の単一設定） ── */
  var notifySw = document.getElementById('p413NotifySw');
  if (notifySw) {
    notifySw.addEventListener('click', function () {
      var on = !notifySw.classList.contains('is-on');
      notifySw.classList.toggle('is-on', on);
      notifySw.setAttribute('aria-checked', on);
      notifySw.querySelector('.ktn-switch__label').textContent = on ? '受け取る' : '受け取らない';
      if (KTN.toast) KTN.toast(on ? '新しいオーディエンスの通知をオンにしました' : '新しいオーディエンスの通知をオフにしました');
    });
  }

  /* ── チェックイン一覧 ── exh＝p4-18のEXHIBITIONSと同一id（g4/g5/g7） */
  var CHECKINS = [
    { id:'c1',  name:'佐藤 美咲',        type:'user',    color:'linear-gradient(145deg,#a8b8c8,#6a8098)', watch:9,  interest:3,
      visits:[ { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.7.27', ts:20260727 } ] },
    { id:'c2',  name:'岡田 陸',          type:'user',    color:'linear-gradient(145deg,#9ab0c0,#5a7898)', watch:2,  interest:1,
      visits:[ { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.7.29', ts:20260729 } ] },
    { id:'c3',  name:'田中 透',          type:'creator', color:'linear-gradient(145deg,#7ab4cc,#4a8099)', watch:6,  interest:1,
      visits:[
        { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.7.30', ts:20260730 },
        { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.8.9',  ts:20260809 },
      ] },
    { id:'c4',  name:'Gallery MUKU',    type:'gallery', color:'linear-gradient(145deg,#c8b89a,#a09070)', watch:5,  interest:0,
      visits:[ { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.8.1',  ts:20260801 } ] },
    { id:'c5',  name:'中村 拓也',        type:'user',    color:'linear-gradient(145deg,#c8a8b8,#986878)', watch:3,  interest:2,
      visits:[ { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.8.3',  ts:20260803 } ] },
    { id:'c6',  name:'木村 彩',          type:'user',    color:'linear-gradient(145deg,#b8c8a8,#789068)', watch:7,  interest:1,
      visits:[ { exh:'g5', exhName:'かたちなきものたちの声', period:'2026.7.10 - 2026.7.24', date:'2026.7.13', ts:20260713 } ] },
    { id:'c7',  name:'渡辺 硝子',        type:'creator', color:'linear-gradient(145deg,#aa7a9a,#7a3a6a)', watch:11, interest:3,
      visits:[ { exh:'g5', exhName:'かたちなきものたちの声', period:'2026.7.10 - 2026.7.24', date:'2026.7.15', ts:20260715 } ] },
    { id:'c8',  name:'福田 玲奈',        type:'user',    color:'linear-gradient(145deg,#c8b0a0,#987860)', watch:1,  interest:0,
      visits:[ { exh:'g5', exhName:'かたちなきものたちの声', period:'2026.7.10 - 2026.7.24', date:'2026.7.20', ts:20260720 } ] },
    { id:'c9',  name:'小林 志保',        type:'user',    color:'linear-gradient(145deg,#8a9aaa,#4a5a7a)', watch:6,  interest:2,
      visits:[ { exh:'g7', exhName:'路地裏の詩、冬の記録', period:'2025.12.1 - 2025.12.20', date:'2025.12.6',  ts:20251206 } ] },
    { id:'c10', name:'Gallery 灯',       type:'gallery', color:'linear-gradient(145deg,#b8a8c8,#8878a8)', watch:4,  interest:0,
      visits:[ { exh:'g7', exhName:'路地裏の詩、冬の記録', period:'2025.12.1 - 2025.12.20', date:'2025.12.11', ts:20251211 } ] },
    { id:'c11', name:'吉田 織部',        type:'creator', color:'linear-gradient(145deg,#8aaa6a,#4a7a2a)', watch:8,  interest:1,
      visits:[ { exh:'g7', exhName:'路地裏の詩、冬の記録', period:'2025.12.1 - 2025.12.20', date:'2025.12.16', ts:20251216 } ] },
    { id:'c12', name:'山本 結',          type:'user',    color:'linear-gradient(145deg,#c8a8b8,#986878)', watch:13, interest:4,
      visits:[
        { exh:'g7', exhName:'路地裏の詩、冬の記録', period:'2025.12.1 - 2025.12.20', date:'2025.12.17', ts:20251217 },
        { exh:'g5', exhName:'かたちなきものたちの声', period:'2026.7.10 - 2026.7.24', date:'2026.7.22', ts:20260722 },
      ] },
  ];

  var ckListEl  = document.getElementById('p413CkList');
  var ckEmptyEl = document.getElementById('p413CkEmpty');
  var ckExhSel  = document.getElementById('p413CkFilterExh');
  var ckSortSel = document.getElementById('p413CkSort');
  var ckCountEl = document.getElementById('p413CkCount');
  var ckPagerEl = document.getElementById('p413CkPagination');

  if (ckListEl && ckExhSel && ckSortSel) {
    var ckPage = 1;
    var CK_PER_PAGE = 8;

    function ckLatestTs(c) { return Math.max.apply(null, c.visits.map(function (v) { return v.ts; })); }
    function ckEarliestTs(c) { return Math.min.apply(null, c.visits.map(function (v) { return v.ts; })); }

    var CK_SORTS = {
      'date-desc':   function (a, b) { return ckLatestTs(b) - ckLatestTs(a); },
      'date-asc':    function (a, b) { return ckEarliestTs(a) - ckEarliestTs(b); },
      'name':        function (a, b) { return a.name.localeCompare(b.name, 'ja'); },
      'engage-desc': function (a, b) { return (b.watch + b.visits.length + b.interest) - (a.watch + a.visits.length + a.interest); },
    };

    var makeCkItem = function (c) {
      var visitsSorted = c.visits.slice().sort(function (a, b) { return b.ts - a.ts; });
      var visitsHtml = visitsSorted.map(function (v) {
        return '<div class="p313-ck-visit">' +
          '<span class="p313-ck-visit__date">' + SVG_C_GRAY + v.date + '</span>' +
          '<span class="p313-ck-visit__exh"><span class="cb cb-content cb-exhibition">exhibition</span>' + v.exhName + ' · ' + v.period + '</span>' +
        '</div>';
      }).join('');
      return '<div class="p2-watcher-item">' +
        '<a href="#" class="p2-watcher-item__avatar p2-watcher-item__avatar--user" style="background:' + c.color + '">' + c.name.charAt(0) + '</a>' +
        '<div class="p2-watcher-item__info">' +
          '<a href="#" class="p2-watcher-item__name">' + c.name + '</a>' +
          '<div class="p2-watcher-item__counts">' +
            '<span class="p2-watcher-item__count">' + SVG_W + c.watch + '</span>' +
            '<span class="p2-watcher-item__count">' + SVG_C + c.visits.length + '</span>' +
            '<span class="p2-watcher-item__count">' + SVG_I + c.interest + '</span>' +
          '</div>' +
          '<div class="p313-ck-visits">' + visitsHtml + '</div>' +
        '</div>' +
      '</div>';
    };

    var renderCk = function () {
      var fe = ckExhSel.value;
      var rows = CHECKINS.filter(function (c) {
        return !fe || c.visits.some(function (v) { return v.exh === fe; });
      });
      rows.sort(CK_SORTS[ckSortSel.value] || CK_SORTS['date-desc']);
      if (ckCountEl) ckCountEl.textContent = rows.length + '件';
      if (ckEmptyEl) ckEmptyEl.hidden = rows.length !== 0;

      var totalPages = Math.max(1, Math.ceil(rows.length / CK_PER_PAGE));
      if (ckPage > totalPages) ckPage = totalPages;
      var pageRows = rows.slice((ckPage - 1) * CK_PER_PAGE, ckPage * CK_PER_PAGE);
      ckListEl.innerHTML = pageRows.map(makeCkItem).join('');
      KTN.pagination.render(ckPagerEl, {
        page: ckPage,
        totalPages: totalPages,
        onGoto: function (p) { ckPage = p; renderCk(); },
      });
    };

    var renderCkReset = function () { ckPage = 1; renderCk(); };
    ckExhSel.addEventListener('change', renderCkReset);
    ckSortSel.addEventListener('change', renderCkReset);
    renderCk();
  }

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P3-18  クリエイター-展覧会管理（p4-18=ギャラリー版と対）
   投稿者＝田中透 本人の展覧会のみ一覧（出展クリエイターとして参加のみの展覧会は含まない＝p3-1で確認）。
   .p319-* を共有ネームスペースとして再利用（記事管理と同型の identity strip → mgmt-head → 新規CTA →
   注記 → 下書きバナー → ツールバー → 一覧 → 削除モーダル）。展覧会固有の状態（管理者確認待ち／非公開）は
   sb-*（開催ステータス）とは別カテゴリのため、page-local な .p318-status で表現し badge system には加えない。
════════════════════════════════════════════════════ */
KTN.pages['p3-18'] = function () {

  /* ── 開催ステータス（sb-*・確認済＋公開の展覧会のみ算出済みの状態として持つ）── */
  var STATUS = {
    live:     { cls:'sb-live',     label:'開催中',       pre:'<span class="pulse"></span>' },
    upcoming: { cls:'sb-upcoming', label:'開催前' },
    soon:     { cls:'sb-soon',     label:'もうすぐ開始' },
    ending:   { cls:'sb-ending',   label:'もうすぐ終了', pre:'<span class="ending-dot"></span>' },
    closed:   { cls:'sb-closed',   label:'終了' },
  };

  /* ── サンプルデータ（田中透が投稿者の展覧会）──
     confirmed＝管理者確認済み。publishMode／publishDate＝p2-11「公開設定」でオーナーが投稿時に選んだ値
     （'now'＝確認完了後すぐ公開、'scheduled'＝確認完了後に指定日時で自動公開）。オーナーは確認前（投稿時点）に
     既にこれを選択済みのことがあるため、confirmed:false（確認待ち）の項目でも publishMode/publishDate が
     入っている場合がある＝「確認待ちだが公開予定日は設定済み」（statusHtml がこの場合を分けて表示する）。
     published＝実際に公開済みかどうか（confirmed かつ 'now'、または確認済みで publishDate 到来後に true になる）。
     sstatus は confirmed && published のときのみ時間軸ステータスとして算出される。
     liaison＝confirmed が true になるまで設定不可（出展クリエイターは管理者確認を経て確定するため、確認待ち中は
     LIAISON/LIAISON+ を紐付けられない業務ルール。confirmed:false の項目は liaison を必ず空にする）。
     reg/upd＝登録日・最終更新日。rs＝登録日の並べ替えキー。draft＝下書き（未完成・一覧の最上部固定）。 */
  var EXHIBITIONS = [
    { id:'x1', title:'光と影の間に（仮）', type:'other',
      venue:'', period:'', liaison:'', confirmed:false, published:false, publishMode:'now', publishDate:'', sstatus:'',
      reg:'2026.7.28', upd:'2026.7.28', rs:20260728, draft:true, bg:'linear-gradient(155deg,#dcdcdc,#a8a8a8)' },
    { id:'x2', title:'とおくの声、ちかくの気配', type:'solo',
      venue:'スペースYUI', period:'2026.9.5 - 2026.9.20', liaison:'', confirmed:false, published:false, publishMode:'scheduled', publishDate:'2026.8.20', sstatus:'',
      reg:'2026.7.25', upd:'2026.7.26', rs:20260725, draft:false, bg:'linear-gradient(155deg,#d8c8e8,#a888cc)' },
    /* x3＝非公開（管理者が取り下げ済み）のサンプル。非公開は管理者専用状態のためこの一覧には表示されない
       （render()のeffStatus==='unpublished'除外フィルタで常に非表示になることを示すデータとして残す） */
    { id:'x3', title:'破片のかたち', type:'solo',
      venue:'渋谷アートラボ', period:'2026.9.1 - 2026.9.10', liaison:'', confirmed:true, published:false, publishMode:'now', publishDate:'', sstatus:'',
      reg:'2026.6.10', upd:'2026.6.12', rs:20260610, draft:false, bg:'linear-gradient(155deg,#f0d0d0,#c88080)' },
    { id:'x8', title:'花と刃、静かな部屋', type:'solo',
      venue:'GALLERY X', period:'2026.9.12 - 2026.9.25', liaison:'li-plus', confirmed:true, published:false, publishMode:'scheduled', publishDate:'2026.9.1', sstatus:'',
      reg:'2026.6.30', upd:'2026.7.20', rs:20260630, draft:false, bg:'linear-gradient(155deg,#e8d8c0,#c8a468)' },
    { id:'x4', title:'水のうつわ、光のかけら', type:'solo',
      venue:'GALLERY X', period:'2026.7.20 - 2026.8.10', liaison:'li-plus', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'live',
      reg:'2026.5.2', upd:'2026.7.18', rs:20260502, draft:false, bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)' },
    { id:'x9', title:'透きとおる季節の輪郭', type:'solo',
      venue:'スペースYUI', period:'2026.8.8 - 2026.8.18', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'soon',
      reg:'2026.6.5', upd:'2026.7.30', rs:20260605, draft:false, bg:'linear-gradient(155deg,#d0d8f0,#8090cc)' },
    { id:'x5', title:'まなざしの重奏', type:'group',
      venue:'3331 Arts Chiyoda', period:'2026.7.25 - 2026.8.5', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'ending',
      reg:'2026.5.20', upd:'2026.7.15', rs:20260520, draft:false, bg:'linear-gradient(155deg,#f0e8d0,#d4b896)' },
    { id:'x6', title:'遠い記憶の輪郭', type:'solo',
      venue:'東京都現代美術館', period:'2026.10.1 - 2026.10.20', liaison:'li', confirmed:true, published:true, publishMode:'scheduled', publishDate:'2026.9.10', sstatus:'upcoming',
      reg:'2026.6.25', upd:'2026.6.28', rs:20260625, draft:false, bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)' },
    { id:'x7', title:'ことばの余白', type:'solo',
      venue:'渋谷アートラボ', period:'2025.12.1 - 2025.12.20', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'closed',
      reg:'2025.10.5', upd:'2025.12.21', rs:20251005, draft:false, bg:'linear-gradient(155deg,#e0d4bc,#b8a884)' },
  ];

  /* ── DOM ── */
  var listEl      = document.getElementById('p318List');
  var emptyEl     = document.getElementById('p318Empty');
  var typeSel     = document.getElementById('p318FilterType');
  var statusSel   = document.getElementById('p318FilterStatus');
  var sortSel     = document.getElementById('p318Sort');
  var draftBanner = document.getElementById('p318DraftBanner');
  var draftCntEl  = document.getElementById('p318DraftCount');
  var pagerEl     = document.getElementById('p318Pagination');
  if (!listEl || !typeSel || !statusSel || !sortSel) return;

  var page = 1;
  var PER_PAGE = 5;

  function isDraft(e) { return !!e.draft; }

  /* 確認待ち／公開予定／非公開／時間軸ステータスの実効値（フィルタ・表示の両方で使用） */
  function effStatus(e) {
    if (!e.confirmed) return 'pending';
    if (!e.published) return (e.publishMode === 'scheduled' && e.publishDate) ? 'scheduled' : 'unpublished';
    return e.sstatus;
  }

  function p211Link(mode, id) {
    return 'kotennavi-p2-11.html?mode=' + mode + '&author=tanaka&self=1&exh=' + encodeURIComponent(id);
  }

  /* 公開展覧会ページへのリンク先。確認待ち／非公開／下書きは公開ページが存在しないため null */
  function exhLink(e) {
    return (isDraft(e) || !e.confirmed || !e.published) ? null : 'kotennavi-p2.html';
  }

  function statusHtml(e) {
    if (isDraft(e)) return '';
    if (!e.confirmed) {
      /* オーナーが投稿時に「公開日時を指定する」を選んでいる場合、確認待ち中でも別バッジとして公開予定日を併記する */
      var sub = (e.publishMode === 'scheduled' && e.publishDate)
        ? '<span class="p318-status p318-status--scheduled">公開予定 ' + e.publishDate + '</span>'
        : '';
      return '<span class="p318-status p318-status--pending">確認待ち</span>' + sub;
    }
    if (!e.published) {
      if (e.publishMode === 'scheduled' && e.publishDate) {
        return '<span class="p318-status p318-status--scheduled">公開予定 ' + e.publishDate + '</span>';
      }
      return ''; /* 非公開はrenderで一覧から除外されるためここには到達しない防御コード */
    }
    var s = STATUS[e.sstatus];
    if (!s) return '';
    return '<span class="sb ' + s.cls + '">' + (s.pre || '') + s.label + '</span>';
  }

  /* ── アイテム生成 ── */
  function makeItem(e) {
    var draft = isDraft(e);
    /* 会期終了後はオーナーでも編集・削除ができなくなる業務ルール（2026-08-02）。
       一覧には記録として残すが、操作は「クローン →」のみ（新規の別展覧会を作るだけなので終了後も可） */
    var ended = !draft && effStatus(e) === 'closed';
    var el = exhLink(e);
    /* confirmed になるまで出展クリエイターが確定しないため、確認待ち中は LIAISON/LIAISON+ を表示しない（業務ルール） */
    var liaisonHtml = (e.confirmed && e.liaison)
      ? '<span class="lb-dot ' + e.liaison + '"><span class="lb-dot-inner"></span>' + (e.liaison === 'li-plus' ? 'LIAISON+' : 'LIAISON') + '</span>'
      : '';

    var li = document.createElement('li');
    li.className = 'p319-item' + (draft ? ' p319-item--draft' : '');
    li.dataset.id = e.id;
    li.innerHTML =
      (draft ? '<span class="p319-item__ribbon">下書き</span>' : '') +
      '<div class="p319-item__main' + (el ? ' p319-item__main--link" title="クリックで展覧会ページを新しいタブで表示' : '') + '">' +
        '<div class="p319-item__thumb" style="background:' + e.bg + '"></div>' +
        '<div class="p319-item__body">' +
          '<div class="p319-item__title-row">' +
            '<span class="cb cb-content cb-exhibition">exhibition</span>' +
            statusHtml(e) +
            liaisonHtml +
          '</div>' +
          '<div class="p319-item__title">' + e.title + '</div>' +
          '<div class="p319-item__dest">' + (e.venue || '会場未定') + '<span class="p319-item__dates-sep">·</span>' + (e.period || '会期未定') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p319-item__dates">登録 ' + e.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + e.upd + '</div>' +
      '<div class="p319-item__actions">' +
        (ended ? '' : '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>') +
        (draft
          ? '<a class="ktn-action-btn" href="' + p211Link('edit', e.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p211Link('clone', e.id) + '">クローン →</a>' +
            (ended ? '' : '<a class="ktn-action-btn" href="' + p211Link('edit', e.id) + '">編集 →</a>')) +
      '</div>';
    return li;
  }

  /* ── フィルタ・並べ替え描画 ── */
  var SORTS = {
    'reg-desc': function (a, b) { return b.rs - a.rs; },
    'reg-asc':  function (a, b) { return a.rs - b.rs; },
    'title':    function (a, b) { return a.title.localeCompare(b.title, 'ja'); },
  };

  function render() {
    var ft = typeSel.value;
    var fs = statusSel.value;
    var rows = EXHIBITIONS.filter(function (e) {
      /* 下書き＝別もの。種別・ステータスで絞り込む時は候補から外す（「すべて」表示時のみ最上部に固定） */
      if (isDraft(e)) return ft === '' && fs === '';
      /* 非公開＝管理者専用の状態遷移（オーナー操作の対象外）。この一覧には常に表示しない */
      if (effStatus(e) === 'unpublished') return false;
      if (ft && e.type !== ft) return false;
      if (fs && effStatus(e) !== fs) return false;
      return true;
    });
    rows.sort(SORTS[sortSel.value] || SORTS['reg-desc']);
    rows.sort(function (a, b) { return (isDraft(b) ? 1 : 0) - (isDraft(a) ? 1 : 0); });
    /* 下書き数・ゼロ状態は絞り込み後の全件から算出（ページングで切り出す前） */
    var draftN = rows.filter(isDraft).length;
    if (draftBanner) draftBanner.hidden = draftN === 0;
    if (draftCntEl) draftCntEl.textContent = draftN;
    if (emptyEl) emptyEl.hidden = rows.length !== 0;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = '';
    pageRows.forEach(function (e) { listEl.appendChild(makeItem(e)); });
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }

  typeSel.addEventListener('change', renderReset);
  statusSel.addEventListener('change', renderReset);
  sortSel.addEventListener('change', renderReset);
  render();

  /* ── 操作（イベント委譲）── */
  function findExhibition(id) {
    for (var i = 0; i < EXHIBITIONS.length; i++) if (EXHIBITIONS[i].id === id) return EXHIBITIONS[i];
    return null;
  }

  listEl.addEventListener('click', function (e) {
    var item = e.target.closest('.p319-item');
    if (!item) return;
    var x = findExhibition(item.dataset.id);
    if (!x) return;

    if (e.target.closest('.p319-item__del')) {
      openDelModal(x);
      return;
    }
    /* カード（main部）クリック＝展覧会ページを新しいタブで開く（内側のリンク・ボタンは除外） */
    if (e.target.closest('.p319-item__main--link') && !e.target.closest('a') && !e.target.closest('button')) {
      var el = exhLink(x);
      if (el) window.open(el, '_blank');
      return;
    }
  });

  /* ── 削除／下書き破棄モーダル（破壊操作＝confirm を経て実行） ── */
  var delModal   = document.getElementById('p318DelModal');
  var delTitle   = document.getElementById('p318DelTitle');
  var delDesc    = document.getElementById('p318DelDesc');
  var delCancel  = document.getElementById('p318DelCancel');
  var delConfirm = document.getElementById('p318DelConfirm');
  var delBg      = document.getElementById('p318DelBg');
  var pendingDel = null;

  function openDelModal(x) {
    if (!delModal) return;
    pendingDel = x.id;
    var draft = isDraft(x);
    if (delTitle) delTitle.textContent = draft ? '下書きを破棄しますか？' : '展覧会を削除しますか？';
    if (delDesc) delDesc.innerHTML = '<span class="p319-del-modal__name">' + x.title + '</span>' +
      (draft
        ? 'この下書きを完全に破棄します。入力済みの内容は復元できません。'
        : 'この展覧会を完全に削除します。出展作品・関連記事の紐付けも解除され、復元できません。');
    if (delConfirm) delConfirm.textContent = draft ? '破棄する' : '削除する';
    delModal.hidden = false;
  }
  function closeDelModal() {
    if (!delModal) return;
    delModal.hidden = true;
    pendingDel = null;
  }
  if (delCancel) delCancel.addEventListener('click', closeDelModal);
  if (delBg)     delBg.addEventListener('click', closeDelModal);
  if (delConfirm) delConfirm.addEventListener('click', function () {
    if (!pendingDel) return;
    var wasDraft = false;
    for (var i = 0; i < EXHIBITIONS.length; i++) {
      if (EXHIBITIONS[i].id === pendingDel) { wasDraft = isDraft(EXHIBITIONS[i]); EXHIBITIONS.splice(i, 1); break; }
    }
    closeDelModal();
    render();
    if (KTN.toast) KTN.toast(wasDraft ? '下書きを破棄しました（デモ）' : '展覧会を削除しました（デモ）');
  });

  /* ── 新規作成の重複チェック（確認待ち／公開予定＝一度も公開されていない展覧会が既にある場合に注意喚起）
     現行(旧)個展なびで頻発する「確認待ちに気づかず同内容を再作成してしまう」事故の抑止策。
     一覧ページ自身のCTAにも掛けることでヘッダー導線（後日実装）と同じ安全策を先取りする（2026-08-02 決定）。
     「非公開」（＝管理者が一度公開済みの展覧会を取り下げた状態）はここに含めない：
     オーナーは既にその展覧会の存在を把握済み（かつて公開されていた）ため重複作成の懸念に当たらず、
     非公開は管理者専用の状態遷移（→ project memory「非公開状態は管理者専用」）なのでこの注意喚起の対象外とする（2026-08-02 決定）。 */
  var newBtn     = document.getElementById('p318NewBtn');
  var dupModal   = document.getElementById('p318DupModal');
  var dupBg      = document.getElementById('p318DupBg');
  var dupList    = document.getElementById('p318DupList');
  var dupCancel  = document.getElementById('p318DupCancel');
  var dupProceed = document.getElementById('p318DupProceed');

  function dupCheckExhibitions() {
    return EXHIBITIONS.filter(function (e) {
      if (isDraft(e)) return false;
      var s = effStatus(e);
      return s === 'pending' || s === 'scheduled';
    });
  }
  function openDupModal() {
    if (!dupModal || !dupList) return;
    dupList.innerHTML = dupCheckExhibitions().map(function (e) {
      return '<li class="p319-dup-modal__item">' +
        '<div class="p319-dup-modal__item-body">' +
          '<span class="p319-dup-modal__item-title">' + e.title + '</span>' +
          '<span class="p319-dup-modal__item-period">' + (e.period || '会期未定') + '</span>' +
          '<div class="p319-dup-modal__item-badges">' + statusHtml(e) + '</div>' +
        '</div>' +
        '<a class="ktn-action-btn" href="' + p211Link('edit', e.id) + '">編集する →</a>' +
      '</li>';
    }).join('');
    dupModal.hidden = false;
  }
  function closeDupModal() { if (dupModal) dupModal.hidden = true; }

  if (newBtn) {
    newBtn.addEventListener('click', function (evt) {
      if (dupCheckExhibitions().length === 0) return; /* 該当なし＝通常どおり遷移 */
      evt.preventDefault();
      if (dupProceed) dupProceed.href = newBtn.href;
      openDupModal();
    });
  }
  if (dupCancel) dupCancel.addEventListener('click', closeDupModal);
  if (dupBg)     dupBg.addEventListener('click', closeDupModal);

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P4-18  ギャラリー-展覧会管理（P3-18のギャラリー版・2026-08-02 展開）
   ════════════════════════════════════════════════════ */
KTN.pages['p4-18'] = function () {

  /* ── 開催ステータス（sb-*・確認済＋公開の展覧会のみ算出済みの状態として持つ）── */
  var STATUS = {
    live:     { cls:'sb-live',     label:'開催中',       pre:'<span class="pulse"></span>' },
    upcoming: { cls:'sb-upcoming', label:'開催前' },
    soon:     { cls:'sb-soon',     label:'もうすぐ開始' },
    ending:   { cls:'sb-ending',   label:'もうすぐ終了', pre:'<span class="ending-dot"></span>' },
    closed:   { cls:'sb-closed',   label:'終了' },
  };

  /* ── サンプルデータ（Gallery SOIL 渋谷が投稿者の展覧会）──
     ギャラリーは会場が自ギャラリー1つに固定のため、P3-18（クリエイター・会場が展覧会ごとに異なる）と異なり
     venue は全項目で 'Gallery SOIL 渋谷' に統一。同一会場のため確認済み（非終了）項目の会期は互いに重複しない
     ように設計（実在の会場予約として矛盾しないため）。フィールドの意味は P3-18 と同一（confirmed/published/
     publishMode/publishDate/sstatus/liaison/draft の関係はそちらのコメント参照）。 */
  var EXHIBITIONS = [
    { id:'g1', title:'記憶の断片、再構成（仮）', type:'other',
      venue:'Gallery SOIL 渋谷', period:'', liaison:'', confirmed:false, published:false, publishMode:'now', publishDate:'', sstatus:'',
      reg:'2026.7.30', upd:'2026.7.30', rs:20260730, draft:true, bg:'linear-gradient(155deg,#dcdcdc,#a8a8a8)' },
    { id:'g2', title:'波のあとさき', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.11.10 - 2026.11.25', liaison:'', confirmed:false, published:false, publishMode:'scheduled', publishDate:'2026.10.25', sstatus:'',
      reg:'2026.7.20', upd:'2026.7.29', rs:20260720, draft:false, bg:'linear-gradient(155deg,#d8c8e8,#a888cc)' },
    /* g3＝非公開（管理者が取り下げ済み）のサンプル。非公開は管理者専用状態のためこの一覧には表示されない
       （render()のeffStatus==='unpublished'除外フィルタで常に非表示になることを示すデータとして残す） */
    { id:'g3', title:'静物と光の対話', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.10.20 - 2026.11.5', liaison:'', confirmed:true, published:false, publishMode:'now', publishDate:'', sstatus:'',
      reg:'2026.6.15', upd:'2026.6.18', rs:20260615, draft:false, bg:'linear-gradient(155deg,#f0d0d0,#c88080)' },
    { id:'g8', title:'硝子の向こう側', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.10.1 - 2026.10.15', liaison:'li-plus', confirmed:true, published:false, publishMode:'scheduled', publishDate:'2026.9.20', sstatus:'',
      reg:'2026.6.5', upd:'2026.7.22', rs:20260605, draft:false, bg:'linear-gradient(155deg,#e8d8c0,#c8a468)' },
    { id:'g6', title:'遠雷、まだ見ぬ景色', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.9.5 - 2026.9.25', liaison:'li', confirmed:true, published:true, publishMode:'scheduled', publishDate:'2026.8.20', sstatus:'upcoming',
      reg:'2026.6.20', upd:'2026.6.25', rs:20260620, draft:false, bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)' },
    { id:'g9', title:'影を纏う、朝の記憶', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.8.16 - 2026.8.30', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'soon',
      reg:'2026.6.1', upd:'2026.7.28', rs:20260601, draft:false, bg:'linear-gradient(155deg,#d0d8f0,#8090cc)' },
    { id:'g4', title:'色彩のかけら、その先へ', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.7.25 - 2026.8.15', liaison:'li-plus', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'live',
      reg:'2026.5.10', upd:'2026.7.24', rs:20260510, draft:false, bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)' },
    { id:'g5', title:'かたちなきものたちの声', type:'group',
      venue:'Gallery SOIL 渋谷', period:'2026.7.10 - 2026.7.24', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'ending',
      reg:'2026.5.5', upd:'2026.7.9', rs:20260505, draft:false, bg:'linear-gradient(155deg,#f0e8d0,#d4b896)' },
    { id:'g7', title:'路地裏の詩、冬の記録', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2025.12.1 - 2025.12.20', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'closed',
      reg:'2025.10.1', upd:'2025.12.21', rs:20251001, draft:false, bg:'linear-gradient(155deg,#e0d4bc,#b8a884)' },
  ];

  /* ── DOM ── */
  var listEl      = document.getElementById('p418List');
  var emptyEl     = document.getElementById('p418Empty');
  var typeSel     = document.getElementById('p418FilterType');
  var statusSel   = document.getElementById('p418FilterStatus');
  var sortSel     = document.getElementById('p418Sort');
  var draftBanner = document.getElementById('p418DraftBanner');
  var draftCntEl  = document.getElementById('p418DraftCount');
  var pagerEl     = document.getElementById('p418Pagination');
  if (!listEl || !typeSel || !statusSel || !sortSel) return;

  var page = 1;
  var PER_PAGE = 5;

  function isDraft(e) { return !!e.draft; }

  /* 確認待ち／公開予定／非公開／時間軸ステータスの実効値（フィルタ・表示の両方で使用） */
  function effStatus(e) {
    if (!e.confirmed) return 'pending';
    if (!e.published) return (e.publishMode === 'scheduled' && e.publishDate) ? 'scheduled' : 'unpublished';
    return e.sstatus;
  }

  function p211Link(mode, id) {
    return 'kotennavi-p2-11.html?mode=' + mode + '&role=gallery&self=1&exh=' + encodeURIComponent(id);
  }

  /* 公開展覧会ページへのリンク先。確認待ち／非公開／下書きは公開ページが存在しないため null */
  function exhLink(e) {
    return (isDraft(e) || !e.confirmed || !e.published) ? null : 'kotennavi-p2.html';
  }

  function statusHtml(e) {
    if (isDraft(e)) return '';
    if (!e.confirmed) {
      /* オーナーが投稿時に「公開日時を指定する」を選んでいる場合、確認待ち中でも別バッジとして公開予定日を併記する */
      var sub = (e.publishMode === 'scheduled' && e.publishDate)
        ? '<span class="p318-status p318-status--scheduled">公開予定 ' + e.publishDate + '</span>'
        : '';
      return '<span class="p318-status p318-status--pending">確認待ち</span>' + sub;
    }
    if (!e.published) {
      if (e.publishMode === 'scheduled' && e.publishDate) {
        return '<span class="p318-status p318-status--scheduled">公開予定 ' + e.publishDate + '</span>';
      }
      return ''; /* 非公開はrenderで一覧から除外されるためここには到達しない防御コード */
    }
    var s = STATUS[e.sstatus];
    if (!s) return '';
    return '<span class="sb ' + s.cls + '">' + (s.pre || '') + s.label + '</span>';
  }

  /* ── アイテム生成 ── */
  function makeItem(e) {
    var draft = isDraft(e);
    /* 会期終了後はオーナーでも編集・削除ができなくなる業務ルール（P3-18と同一・2026-08-02）。
       一覧には記録として残すが、操作は「クローン →」のみ（新規の別展覧会を作るだけなので終了後も可） */
    var ended = !draft && effStatus(e) === 'closed';
    var el = exhLink(e);
    /* confirmed になるまで出展クリエイターが確定しないため、確認待ち中は LIAISON/LIAISON+ を表示しない（業務ルール） */
    var liaisonHtml = (e.confirmed && e.liaison)
      ? '<span class="lb-dot ' + e.liaison + '"><span class="lb-dot-inner"></span>' + (e.liaison === 'li-plus' ? 'LIAISON+' : 'LIAISON') + '</span>'
      : '';

    var li = document.createElement('li');
    li.className = 'p319-item' + (draft ? ' p319-item--draft' : '');
    li.dataset.id = e.id;
    li.innerHTML =
      (draft ? '<span class="p319-item__ribbon">下書き</span>' : '') +
      '<div class="p319-item__main' + (el ? ' p319-item__main--link" title="クリックで展覧会ページを新しいタブで表示' : '') + '">' +
        '<div class="p319-item__thumb" style="background:' + e.bg + '"></div>' +
        '<div class="p319-item__body">' +
          '<div class="p319-item__title-row">' +
            '<span class="cb cb-content cb-exhibition">exhibition</span>' +
            statusHtml(e) +
            liaisonHtml +
          '</div>' +
          '<div class="p319-item__title">' + e.title + '</div>' +
          '<div class="p319-item__dest">' + (e.venue || '会場未定') + '<span class="p319-item__dates-sep">·</span>' + (e.period || '会期未定') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p319-item__dates">登録 ' + e.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + e.upd + '</div>' +
      '<div class="p319-item__actions">' +
        (ended ? '' : '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>') +
        (draft
          ? '<a class="ktn-action-btn" href="' + p211Link('edit', e.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p211Link('clone', e.id) + '">クローン →</a>' +
            (ended ? '' : '<a class="ktn-action-btn" href="' + p211Link('edit', e.id) + '">編集 →</a>')) +
      '</div>';
    return li;
  }

  /* ── フィルタ・並べ替え描画 ── */
  var SORTS = {
    'reg-desc': function (a, b) { return b.rs - a.rs; },
    'reg-asc':  function (a, b) { return a.rs - b.rs; },
    'title':    function (a, b) { return a.title.localeCompare(b.title, 'ja'); },
  };

  function render() {
    var ft = typeSel.value;
    var fs = statusSel.value;
    var rows = EXHIBITIONS.filter(function (e) {
      /* 下書き＝別もの。種別・ステータスで絞り込む時は候補から外す（「すべて」表示時のみ最上部に固定） */
      if (isDraft(e)) return ft === '' && fs === '';
      /* 非公開＝管理者専用の状態遷移（オーナー操作の対象外）。この一覧には常に表示しない */
      if (effStatus(e) === 'unpublished') return false;
      if (ft && e.type !== ft) return false;
      if (fs && effStatus(e) !== fs) return false;
      return true;
    });
    rows.sort(SORTS[sortSel.value] || SORTS['reg-desc']);
    rows.sort(function (a, b) { return (isDraft(b) ? 1 : 0) - (isDraft(a) ? 1 : 0); });
    /* 下書き数・ゼロ状態は絞り込み後の全件から算出（ページングで切り出す前） */
    var draftN = rows.filter(isDraft).length;
    if (draftBanner) draftBanner.hidden = draftN === 0;
    if (draftCntEl) draftCntEl.textContent = draftN;
    if (emptyEl) emptyEl.hidden = rows.length !== 0;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = '';
    pageRows.forEach(function (e) { listEl.appendChild(makeItem(e)); });
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }

  typeSel.addEventListener('change', renderReset);
  statusSel.addEventListener('change', renderReset);
  sortSel.addEventListener('change', renderReset);
  render();

  /* ── 操作（イベント委譲）── */
  function findExhibition(id) {
    for (var i = 0; i < EXHIBITIONS.length; i++) if (EXHIBITIONS[i].id === id) return EXHIBITIONS[i];
    return null;
  }

  listEl.addEventListener('click', function (e) {
    var item = e.target.closest('.p319-item');
    if (!item) return;
    var x = findExhibition(item.dataset.id);
    if (!x) return;

    if (e.target.closest('.p319-item__del')) {
      openDelModal(x);
      return;
    }
    /* カード（main部）クリック＝展覧会ページを新しいタブで開く（内側のリンク・ボタンは除外） */
    if (e.target.closest('.p319-item__main--link') && !e.target.closest('a') && !e.target.closest('button')) {
      var el = exhLink(x);
      if (el) window.open(el, '_blank');
      return;
    }
  });

  /* ── 削除／下書き破棄モーダル（破壊操作＝confirm を経て実行） ── */
  var delModal   = document.getElementById('p418DelModal');
  var delTitle   = document.getElementById('p418DelTitle');
  var delDesc    = document.getElementById('p418DelDesc');
  var delCancel  = document.getElementById('p418DelCancel');
  var delConfirm = document.getElementById('p418DelConfirm');
  var delBg      = document.getElementById('p418DelBg');
  var pendingDel = null;

  function openDelModal(x) {
    if (!delModal) return;
    pendingDel = x.id;
    var draft = isDraft(x);
    if (delTitle) delTitle.textContent = draft ? '下書きを破棄しますか？' : '展覧会を削除しますか？';
    if (delDesc) delDesc.innerHTML = '<span class="p319-del-modal__name">' + x.title + '</span>' +
      (draft
        ? 'この下書きを完全に破棄します。入力済みの内容は復元できません。'
        : 'この展覧会を完全に削除します。出展作品・関連記事の紐付けも解除され、復元できません。');
    if (delConfirm) delConfirm.textContent = draft ? '破棄する' : '削除する';
    delModal.hidden = false;
  }
  function closeDelModal() {
    if (!delModal) return;
    delModal.hidden = true;
    pendingDel = null;
  }
  if (delCancel) delCancel.addEventListener('click', closeDelModal);
  if (delBg)     delBg.addEventListener('click', closeDelModal);
  if (delConfirm) delConfirm.addEventListener('click', function () {
    if (!pendingDel) return;
    var wasDraft = false;
    for (var i = 0; i < EXHIBITIONS.length; i++) {
      if (EXHIBITIONS[i].id === pendingDel) { wasDraft = isDraft(EXHIBITIONS[i]); EXHIBITIONS.splice(i, 1); break; }
    }
    closeDelModal();
    render();
    if (KTN.toast) KTN.toast(wasDraft ? '下書きを破棄しました（デモ）' : '展覧会を削除しました（デモ）');
  });

  /* ── 新規作成の重複チェック（確認待ち／公開予定＝一度も公開されていない展覧会が既にある場合に注意喚起）
     「非公開」（＝管理者が一度公開済みの展覧会を取り下げた状態）はここに含めない（P3-18と同一の理由・
     → project memory「非公開状態は管理者専用」）。 */
  var newBtn     = document.getElementById('p418NewBtn');
  var dupModal   = document.getElementById('p418DupModal');
  var dupBg      = document.getElementById('p418DupBg');
  var dupList    = document.getElementById('p418DupList');
  var dupCancel  = document.getElementById('p418DupCancel');
  var dupProceed = document.getElementById('p418DupProceed');

  function dupCheckExhibitions() {
    return EXHIBITIONS.filter(function (e) {
      if (isDraft(e)) return false;
      var s = effStatus(e);
      return s === 'pending' || s === 'scheduled';
    });
  }
  function openDupModal() {
    if (!dupModal || !dupList) return;
    dupList.innerHTML = dupCheckExhibitions().map(function (e) {
      return '<li class="p319-dup-modal__item">' +
        '<div class="p319-dup-modal__item-body">' +
          '<span class="p319-dup-modal__item-title">' + e.title + '</span>' +
          '<span class="p319-dup-modal__item-period">' + (e.period || '会期未定') + '</span>' +
          '<div class="p319-dup-modal__item-badges">' + statusHtml(e) + '</div>' +
        '</div>' +
        '<a class="ktn-action-btn" href="' + p211Link('edit', e.id) + '">編集する →</a>' +
      '</li>';
    }).join('');
    dupModal.hidden = false;
  }
  function closeDupModal() { if (dupModal) dupModal.hidden = true; }

  if (newBtn) {
    newBtn.addEventListener('click', function (evt) {
      if (dupCheckExhibitions().length === 0) return; /* 該当なし＝通常どおり遷移 */
      evt.preventDefault();
      if (dupProceed) dupProceed.href = newBtn.href;
      openDupModal();
    });
  }
  if (dupCancel) dupCancel.addEventListener('click', closeDupModal);
  if (dupBg)     dupBg.addEventListener('click', closeDupModal);

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P2-13  展覧会-記事管理（この展覧会に掲載された記事のみ。全記事の一元管理は p3-19）
════════════════════════════════════════════════════ */
KTN.pages['p2-13'] = function () {

  var TYPE = {
    a: { label:'レポート',     cls:'at-a' },
    b: { label:'インタビュー', cls:'at-b' },
    c: { label:'制作日記',     cls:'at-c' },
    d: { label:'お知らせ',     cls:'at-d' },
    e: { label:'ワークショップ', cls:'at-e' },
    f: { label:'その他',       cls:'at-f' },
  };

  /* ── サンプルデータ（この展覧会「あなたが知らないオノマトペ」に掲載された記事のみ。t2/t4/t5 は p3-19 と同一記事）── */
  var ARTICLES = [
    { id:'t2', title:'展評：あなたが知らないオノマトペ 会場レポート', type:'a',
      reg:'2026.3.7', upd:'2026.3.10', rs:20260307, draft:false, bg:'linear-gradient(155deg,#e0d4bc,#b8a884)' },
    { id:'t4', title:'個展「あなたが知らないオノマトペ」開催のお知らせ', type:'d',
      reg:'2026.1.20', upd:'2026.1.20', rs:20260120, draft:false, bg:'linear-gradient(155deg,#f0e8d0,#d4b896)' },
    { id:'t5', title:'会場ワークショップ「ことばと絵の即興対話」参加者募集', type:'e',
      reg:'2026.1.25', upd:'2026.2.1', rs:20260125, draft:false, bg:'linear-gradient(155deg,#f0d0d0,#c88080)' },
    { id:'e1', title:'会場インタビュー：来場者に聞く「オノマトペ」の読み方', type:'b',
      reg:'2026.2.20', upd:'2026.2.22', rs:20260220, draft:false, bg:'linear-gradient(155deg,#d8c8e8,#a888cc)' },
    { id:'e2', title:'会期終了レポート（執筆中）', type:'f',
      reg:'2026.3.4', upd:'2026.3.4', rs:20260304, draft:true, bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)' },
  ];

  /* ── DOM ── */
  var listEl      = document.getElementById('p213List');
  var emptyEl     = document.getElementById('p213Empty');
  var typeSel     = document.getElementById('p213FilterType');
  var sortSel     = document.getElementById('p213Sort');
  var draftBanner = document.getElementById('p213DraftBanner');
  var draftCntEl  = document.getElementById('p213DraftCount');
  var pagerEl     = document.getElementById('p213Pagination');

  /* ── 「一元管理するには」の遷移先：展覧会オーナー（creator/gallery）に応じてクリエイター/ギャラリーページを切替 ── */
  var destEl   = document.getElementById('p213DestType');
  var destLink = document.getElementById('p213DestLink');
  if (destEl && destLink) {
    var ownerBadge = document.querySelector('.ktn-mgmt-context__owner .cb-person');
    var isGallery  = !!(ownerBadge && ownerBadge.classList.contains('cb-gallery'));
    destEl.textContent = isGallery ? 'ギャラリー' : 'クリエイター';
    destLink.href = isGallery ? './kotennavi-p4-19.html' : './kotennavi-p3-19.html';
  }

  if (!listEl || !typeSel || !sortSel) return;

  var page = 1;
  var PER_PAGE = 5;

  function isDraft(a) { return !!a.draft; }

  function p711Link(mode, id) {
    return 'kotennavi-p7-11.html?mode=' + mode + '&author=tanaka&self=1&article=' + encodeURIComponent(id);
  }

  /* 公開記事ページへのリンク先（掲載先＝この展覧会）。下書きは公開ページが存在しないため null */
  function articleLink(a) {
    return isDraft(a) ? null : 'kotennavi-p2.html';
  }

  /* ── アイテム生成（掲載先は固定＝この展覧会のため掲載先行は表示しない） ── */
  function makeItem(a) {
    var draft = isDraft(a);
    var t = TYPE[a.type] || TYPE.f;
    var al = articleLink(a);

    var li = document.createElement('li');
    li.className = 'p319-item' + (draft ? ' p319-item--draft' : '');
    li.dataset.id = a.id;
    li.innerHTML =
      (draft ? '<span class="p319-item__ribbon">下書き</span>' : '') +
      '<div class="p319-item__main' + (al ? ' p319-item__main--link" title="クリックで記事ページを新しいタブで表示' : '') + '">' +
        '<div class="p319-item__thumb" style="background:' + a.bg + '"></div>' +
        '<div class="p319-item__body">' +
          '<div class="p319-item__title-row">' +
            '<span class="cb cb-content cb-article">article</span>' +
            '<span class="at ' + t.cls + '">' + t.label + '</span>' +
          '</div>' +
          '<div class="p319-item__title">' + a.title + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p319-item__dates">登録 ' + a.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + a.upd + '</div>' +
      '<div class="p319-item__actions">' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' +
        (draft
          ? '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p711Link('clone', a.id) + '">クローン →</a>' +
            '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集 →</a>') +
      '</div>';
    return li;
  }

  /* ── フィルタ・並べ替え描画 ── */
  var SORTS = {
    'reg-desc': function (a, b) { return b.rs - a.rs; },
    'reg-asc':  function (a, b) { return a.rs - b.rs; },
    'title':    function (a, b) { return a.title.localeCompare(b.title, 'ja'); },
  };

  function render() {
    var ft = typeSel.value;
    var rows = ARTICLES.filter(function (a) {
      if (isDraft(a)) return ft === '';
      if (ft && a.type !== ft) return false;
      return true;
    });
    rows.sort(SORTS[sortSel.value] || SORTS['reg-desc']);
    rows.sort(function (a, b) { return (isDraft(b) ? 1 : 0) - (isDraft(a) ? 1 : 0); });
    var draftN = rows.filter(isDraft).length;
    if (draftBanner) draftBanner.hidden = draftN === 0;
    if (draftCntEl) draftCntEl.textContent = draftN;
    if (emptyEl) emptyEl.hidden = rows.length !== 0;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = '';
    pageRows.forEach(function (a) { listEl.appendChild(makeItem(a)); });
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }

  typeSel.addEventListener('change', renderReset);
  sortSel.addEventListener('change', renderReset);
  render();

  /* ── 操作（イベント委譲）── */
  function findArticle(id) {
    for (var i = 0; i < ARTICLES.length; i++) if (ARTICLES[i].id === id) return ARTICLES[i];
    return null;
  }

  listEl.addEventListener('click', function (e) {
    var item = e.target.closest('.p319-item');
    if (!item) return;
    var a = findArticle(item.dataset.id);
    if (!a) return;

    if (e.target.closest('.p319-item__del')) {
      openDelModal(a);
      return;
    }
    if (e.target.closest('.p319-item__main--link') && !e.target.closest('a') && !e.target.closest('button')) {
      var al = articleLink(a);
      if (al) window.open(al, '_blank');
      return;
    }
  });

  /* ── 削除／下書き破棄モーダル ── */
  var delModal   = document.getElementById('p213DelModal');
  var delTitle   = document.getElementById('p213DelTitle');
  var delDesc    = document.getElementById('p213DelDesc');
  var delCancel  = document.getElementById('p213DelCancel');
  var delConfirm = document.getElementById('p213DelConfirm');
  var delBg      = document.getElementById('p213DelBg');
  var pendingDel = null;

  function openDelModal(a) {
    if (!delModal) return;
    pendingDel = a.id;
    var draft = isDraft(a);
    if (delTitle) delTitle.textContent = draft ? '下書きを破棄しますか？' : '記事を削除しますか？';
    if (delDesc) delDesc.innerHTML = '<span class="p319-del-modal__name">' + a.title + '</span>' +
      (draft
        ? 'この下書きを完全に破棄します。入力済みの内容は復元できません。'
        : 'この記事を完全に削除します。掲載先ページからも削除され、復元できません。');
    if (delConfirm) delConfirm.textContent = draft ? '破棄する' : '削除する';
    delModal.hidden = false;
  }
  function closeDelModal() {
    if (!delModal) return;
    delModal.hidden = true;
    pendingDel = null;
  }
  if (delCancel) delCancel.addEventListener('click', closeDelModal);
  if (delBg)     delBg.addEventListener('click', closeDelModal);
  if (delConfirm) delConfirm.addEventListener('click', function () {
    if (!pendingDel) return;
    var wasDraft = false;
    for (var i = 0; i < ARTICLES.length; i++) {
      if (ARTICLES[i].id === pendingDel) { wasDraft = isDraft(ARTICLES[i]); ARTICLES.splice(i, 1); break; }
    }
    closeDelModal();
    render();
    if (KTN.toast) KTN.toast(wasDraft ? '下書きを破棄しました（デモ）' : '記事を削除しました（デモ）');
  });

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P6-15  作品-記事管理（この作品に掲載された記事のみ。全記事の一元管理は p3-19）
════════════════════════════════════════════════════ */
KTN.pages['p6-15'] = function () {

  var TYPE = {
    a: { label:'レポート',     cls:'at-a' },
    b: { label:'インタビュー', cls:'at-b' },
    c: { label:'制作日記',     cls:'at-c' },
    d: { label:'お知らせ',     cls:'at-d' },
    e: { label:'ワークショップ', cls:'at-e' },
    f: { label:'その他',       cls:'at-f' },
  };

  /* ── サンプルデータ（この作品《オノマトペの庭》に掲載された記事のみ。t1 は p3-19 と同一記事）── */
  var ARTICLES = [
    { id:'t1', title:'オノマトペの庭 制作について', type:'c',
      reg:'2026.3.2', upd:'2026.3.5', rs:20260302, draft:false, bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)' },
    { id:'f1', title:'《オノマトペの庭》をめぐる小さな考察', type:'a',
      reg:'2026.3.15', upd:'2026.3.15', rs:20260315, draft:false, bg:'linear-gradient(155deg,#e0d4bc,#b8a884)' },
    { id:'f2', title:'《オノマトペの庭》原画展示に関するお知らせ', type:'d',
      reg:'2026.3.20', upd:'2026.3.20', rs:20260320, draft:false, bg:'linear-gradient(155deg,#f0e8d0,#d4b896)' },
    { id:'f3', title:'《オノマトペの庭》その後（執筆中）', type:'c',
      reg:'2026.3.25', upd:'2026.3.25', rs:20260325, draft:true, bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)' },
  ];

  /* ── DOM ── */
  var listEl      = document.getElementById('p615List');
  var emptyEl     = document.getElementById('p615Empty');
  var typeSel     = document.getElementById('p615FilterType');
  var sortSel     = document.getElementById('p615Sort');
  var draftBanner = document.getElementById('p615DraftBanner');
  var draftCntEl  = document.getElementById('p615DraftCount');
  var pagerEl     = document.getElementById('p615Pagination');

  /* ── 「一元管理するには」の遷移先：作品オーナー（creator/gallery）に応じてクリエイター/ギャラリーページを切替 ── */
  var destEl   = document.getElementById('p615DestType');
  var destLink = document.getElementById('p615DestLink');
  if (destEl && destLink) {
    var ownerBadge = document.querySelector('.ktn-mgmt-context__owner .cb-person');
    var isGallery  = !!(ownerBadge && ownerBadge.classList.contains('cb-gallery'));
    destEl.textContent = isGallery ? 'ギャラリー' : 'クリエイター';
    destLink.href = isGallery ? './kotennavi-p4-19.html' : './kotennavi-p3-19.html';
  }

  if (!listEl || !typeSel || !sortSel) return;

  var page = 1;
  var PER_PAGE = 5;

  function isDraft(a) { return !!a.draft; }

  function p711Link(mode, id) {
    return 'kotennavi-p7-11.html?mode=' + mode + '&author=tanaka&self=1&article=' + encodeURIComponent(id);
  }

  /* 公開記事ページへのリンク先（掲載先＝この作品）。下書きは公開ページが存在しないため null */
  function articleLink(a) {
    return isDraft(a) ? null : 'kotennavi-p6.html';
  }

  /* ── アイテム生成（掲載先は固定＝この作品のため掲載先行は表示しない） ── */
  function makeItem(a) {
    var draft = isDraft(a);
    var t = TYPE[a.type] || TYPE.f;
    var al = articleLink(a);

    var li = document.createElement('li');
    li.className = 'p319-item' + (draft ? ' p319-item--draft' : '');
    li.dataset.id = a.id;
    li.innerHTML =
      (draft ? '<span class="p319-item__ribbon">下書き</span>' : '') +
      '<div class="p319-item__main' + (al ? ' p319-item__main--link" title="クリックで記事ページを新しいタブで表示' : '') + '">' +
        '<div class="p319-item__thumb" style="background:' + a.bg + '"></div>' +
        '<div class="p319-item__body">' +
          '<div class="p319-item__title-row">' +
            '<span class="cb cb-content cb-article">article</span>' +
            '<span class="at ' + t.cls + '">' + t.label + '</span>' +
          '</div>' +
          '<div class="p319-item__title">' + a.title + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p319-item__dates">登録 ' + a.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + a.upd + '</div>' +
      '<div class="p319-item__actions">' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' +
        (draft
          ? '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p711Link('clone', a.id) + '">クローン →</a>' +
            '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集 →</a>') +
      '</div>';
    return li;
  }

  /* ── フィルタ・並べ替え描画 ── */
  var SORTS = {
    'reg-desc': function (a, b) { return b.rs - a.rs; },
    'reg-asc':  function (a, b) { return a.rs - b.rs; },
    'title':    function (a, b) { return a.title.localeCompare(b.title, 'ja'); },
  };

  function render() {
    var ft = typeSel.value;
    var rows = ARTICLES.filter(function (a) {
      if (isDraft(a)) return ft === '';
      if (ft && a.type !== ft) return false;
      return true;
    });
    rows.sort(SORTS[sortSel.value] || SORTS['reg-desc']);
    rows.sort(function (a, b) { return (isDraft(b) ? 1 : 0) - (isDraft(a) ? 1 : 0); });
    var draftN = rows.filter(isDraft).length;
    if (draftBanner) draftBanner.hidden = draftN === 0;
    if (draftCntEl) draftCntEl.textContent = draftN;
    if (emptyEl) emptyEl.hidden = rows.length !== 0;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = '';
    pageRows.forEach(function (a) { listEl.appendChild(makeItem(a)); });
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }

  typeSel.addEventListener('change', renderReset);
  sortSel.addEventListener('change', renderReset);
  render();

  /* ── 操作（イベント委譲）── */
  function findArticle(id) {
    for (var i = 0; i < ARTICLES.length; i++) if (ARTICLES[i].id === id) return ARTICLES[i];
    return null;
  }

  listEl.addEventListener('click', function (e) {
    var item = e.target.closest('.p319-item');
    if (!item) return;
    var a = findArticle(item.dataset.id);
    if (!a) return;

    if (e.target.closest('.p319-item__del')) {
      openDelModal(a);
      return;
    }
    if (e.target.closest('.p319-item__main--link') && !e.target.closest('a') && !e.target.closest('button')) {
      var al = articleLink(a);
      if (al) window.open(al, '_blank');
      return;
    }
  });

  /* ── 削除／下書き破棄モーダル ── */
  var delModal   = document.getElementById('p615DelModal');
  var delTitle   = document.getElementById('p615DelTitle');
  var delDesc    = document.getElementById('p615DelDesc');
  var delCancel  = document.getElementById('p615DelCancel');
  var delConfirm = document.getElementById('p615DelConfirm');
  var delBg      = document.getElementById('p615DelBg');
  var pendingDel = null;

  function openDelModal(a) {
    if (!delModal) return;
    pendingDel = a.id;
    var draft = isDraft(a);
    if (delTitle) delTitle.textContent = draft ? '下書きを破棄しますか？' : '記事を削除しますか？';
    if (delDesc) delDesc.innerHTML = '<span class="p319-del-modal__name">' + a.title + '</span>' +
      (draft
        ? 'この下書きを完全に破棄します。入力済みの内容は復元できません。'
        : 'この記事を完全に削除します。掲載先ページからも削除され、復元できません。');
    if (delConfirm) delConfirm.textContent = draft ? '破棄する' : '削除する';
    delModal.hidden = false;
  }
  function closeDelModal() {
    if (!delModal) return;
    delModal.hidden = true;
    pendingDel = null;
  }
  if (delCancel) delCancel.addEventListener('click', closeDelModal);
  if (delBg)     delBg.addEventListener('click', closeDelModal);
  if (delConfirm) delConfirm.addEventListener('click', function () {
    if (!pendingDel) return;
    var wasDraft = false;
    for (var i = 0; i < ARTICLES.length; i++) {
      if (ARTICLES[i].id === pendingDel) { wasDraft = isDraft(ARTICLES[i]); ARTICLES.splice(i, 1); break; }
    }
    closeDelModal();
    render();
    if (KTN.toast) KTN.toast(wasDraft ? '下書きを破棄しました（デモ）' : '記事を削除しました（デモ）');
  });

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P2-14  展覧会-インサイト
════════════════════════════════════════════════════ */
KTN.pages['p2-14'] = function () {

  var periodBox = document.getElementById('p214Period');
  if (periodBox) {
    periodBox.querySelectorAll('.ins-period__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        periodBox.querySelectorAll('.ins-period__btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        if (typeof showToast === 'function') showToast('期間を変更しました（デモ）');
      });
    });
  }

};

/* ════════════════════════════════════════════════════
   P4-19  ギャラリー-記事管理（p3-19 と同型・Gallery SOIL 渋谷の全記事を一元管理）
════════════════════════════════════════════════════ */
KTN.pages['p4-19'] = function () {

  /* ── 記事種別マスタ（.at-a〜.at-f）。type=c はギャラリーの場合ラベルが異なる（p7-11 の役割別出し分けと同一） ── */
  var TYPE = {
    a: { label:'レポート',       cls:'at-a' },
    b: { label:'インタビュー',   cls:'at-b' },
    c: { label:'ギャラリーノート', cls:'at-c' },
    d: { label:'お知らせ',       cls:'at-d' },
    e: { label:'ワークショップ', cls:'at-e' },
    f: { label:'その他',         cls:'at-f' },
  };

  /* ── サンプルデータ（Gallery SOIL 渋谷の記事。g-t1 は p7-11 の P711_ENTRY.gallery と同一記事）──
     dest＝掲載先種別（artwork/exhibition/standalone）。作成元で自動確定・以後変更不可。 */
  var ARTICLES = [
    { id:'g-t1', title:'Gallery SOIL 渋谷 ノート：展示替えの舞台裏', type:'c',
      dest:'standalone', destLabel:'ギャラリーページ', destName:'', destHref:'',
      reg:'2026.3.9', upd:'2026.3.12', rs:20260309, draft:false, bg:'linear-gradient(155deg,#d8c8e8,#a888cc)' },
    { id:'g-t2', title:'展評：色彩の対話 — 現代絵画グループ展 会場レポート', type:'a',
      dest:'exhibition', destLabel:'展覧会', destName:'色彩の対話 — 現代絵画グループ展', destHref:'kotennavi-p2.html',
      reg:'2026.3.6', upd:'2026.3.9', rs:20260306, draft:false, bg:'linear-gradient(155deg,#e0d4bc,#b8a884)' },
    { id:'g-t3', title:'「色彩の対話」開催のお知らせ', type:'d',
      dest:'exhibition', destLabel:'展覧会', destName:'色彩の対話 — 現代絵画グループ展', destHref:'kotennavi-p2.html',
      reg:'2026.1.15', upd:'2026.1.15', rs:20260115, draft:false, bg:'linear-gradient(155deg,#f0e8d0,#d4b896)' },
    { id:'g-t4', title:'《静かな水面》ができるまで', type:'c',
      dest:'artwork', destLabel:'作品', destName:'《静かな水面》', destHref:'kotennavi-p6.html',
      reg:'2026.2.10', upd:'2026.2.14', rs:20260210, draft:false, bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)' },
    { id:'g-t5', title:'高橋信の制作環境について', type:'f',
      dest:'artwork', destLabel:'作品', destName:'《静かな水面》', destHref:'kotennavi-p6.html',
      reg:'2025.12.1', upd:'2025.12.1', rs:20251201, draft:false, bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)' },
    { id:'g-t6', title:'Gallery SOIL 渋谷 オーナーインタビュー：これまでとこれから', type:'b',
      dest:'standalone', destLabel:'ギャラリーページ', destName:'', destHref:'',
      reg:'2025.10.5', upd:'2025.10.10', rs:20251005, draft:false, bg:'linear-gradient(155deg,#d8c8e8,#a888cc)' },
    { id:'g-t7', title:'佐藤みなと 新作について（執筆中）', type:'c',
      dest:'artwork', destLabel:'作品', destName:'佐藤みなと 新作', destHref:'kotennavi-p6.html',
      reg:'2026.3.18', upd:'2026.3.18', rs:20260318, draft:true, bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)' },
  ];

  /* ── DOM ── */
  var listEl      = document.getElementById('p419List');
  var emptyEl     = document.getElementById('p419Empty');
  var typeSel     = document.getElementById('p419FilterType');
  var destSel     = document.getElementById('p419FilterDest');
  var sortSel     = document.getElementById('p419Sort');
  var draftBanner = document.getElementById('p419DraftBanner');
  var draftCntEl  = document.getElementById('p419DraftCount');
  var pagerEl     = document.getElementById('p419Pagination');
  if (!listEl || !typeSel || !destSel || !sortSel) return;

  var page = 1;
  var PER_PAGE = 5;

  function isDraft(a) { return !!a.draft; }

  function p711Link(mode, id) {
    return 'kotennavi-p7-11.html?mode=' + mode + '&role=gallery&self=1&article=' + encodeURIComponent(id);
  }

  /* 公開記事ページへのリンク先。下書きは公開ページが存在しないため null */
  function articleLink(a) {
    return isDraft(a) ? null : 'kotennavi-p7.html';
  }

  /* ── アイテム生成 ── */
  function makeItem(a) {
    var draft = isDraft(a);
    var t = TYPE[a.type] || TYPE.f;
    var al = articleLink(a);
    var destHtml = a.dest === 'standalone'
      ? '<span class="p319-item__dest-name">' + a.destLabel + '</span>'
      : '<span class="cb cb-content cb-' + a.dest + '">' + a.destLabel + '</span>' +
        (a.destHref
          ? '<a class="p319-item__dest-name" href="' + a.destHref + '" target="_blank" rel="noopener">' + a.destName + '</a>'
          : '<span class="p319-item__dest-name">' + a.destName + '</span>');

    var li = document.createElement('li');
    li.className = 'p319-item' + (draft ? ' p319-item--draft' : '');
    li.dataset.id = a.id;
    li.innerHTML =
      (draft ? '<span class="p319-item__ribbon">下書き</span>' : '') +
      '<div class="p319-item__main' + (al ? ' p319-item__main--link" title="クリックで記事ページを新しいタブで表示' : '') + '">' +
        '<div class="p319-item__thumb" style="background:' + a.bg + '"></div>' +
        '<div class="p319-item__body">' +
          '<div class="p319-item__title-row">' +
            '<span class="cb cb-content cb-article">article</span>' +
            '<span class="at ' + t.cls + '">' + t.label + '</span>' +
          '</div>' +
          '<div class="p319-item__title">' + a.title + '</div>' +
          '<div class="p319-item__dest">掲載先：' + destHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p319-item__dates">登録 ' + a.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + a.upd + '</div>' +
      '<div class="p319-item__actions">' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' +
        (draft
          ? '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p711Link('clone', a.id) + '">クローン →</a>' +
            '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集 →</a>') +
      '</div>';
    return li;
  }

  /* ── フィルタ・並べ替え描画 ── */
  var SORTS = {
    'reg-desc': function (a, b) { return b.rs - a.rs; },
    'reg-asc':  function (a, b) { return a.rs - b.rs; },
    'title':    function (a, b) { return a.title.localeCompare(b.title, 'ja'); },
  };

  function render() {
    var ft = typeSel.value;
    var fd = destSel.value;
    var rows = ARTICLES.filter(function (a) {
      if (isDraft(a)) return ft === '' && fd === '';
      if (ft && a.type !== ft) return false;
      if (fd && a.dest !== fd) return false;
      return true;
    });
    rows.sort(SORTS[sortSel.value] || SORTS['reg-desc']);
    rows.sort(function (a, b) { return (isDraft(b) ? 1 : 0) - (isDraft(a) ? 1 : 0); });
    var draftN = rows.filter(isDraft).length;
    if (draftBanner) draftBanner.hidden = draftN === 0;
    if (draftCntEl) draftCntEl.textContent = draftN;
    if (emptyEl) emptyEl.hidden = rows.length !== 0;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = '';
    pageRows.forEach(function (a) { listEl.appendChild(makeItem(a)); });
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }

  typeSel.addEventListener('change', renderReset);
  destSel.addEventListener('change', renderReset);
  sortSel.addEventListener('change', renderReset);
  render();

  /* ── 操作（イベント委譲）── */
  function findArticle(id) {
    for (var i = 0; i < ARTICLES.length; i++) if (ARTICLES[i].id === id) return ARTICLES[i];
    return null;
  }

  listEl.addEventListener('click', function (e) {
    var item = e.target.closest('.p319-item');
    if (!item) return;
    var a = findArticle(item.dataset.id);
    if (!a) return;

    if (e.target.closest('.p319-item__del')) {
      openDelModal(a);
      return;
    }
    /* カード（main部）クリック＝記事ページを新しいタブで開く（内側のリンク・ボタンは除外） */
    if (e.target.closest('.p319-item__main--link') && !e.target.closest('a') && !e.target.closest('button')) {
      var al = articleLink(a);
      if (al) window.open(al, '_blank');
      return;
    }
  });

  /* ── 削除／下書き破棄モーダル（破壊操作＝confirm を経て実行） ── */
  var delModal   = document.getElementById('p419DelModal');
  var delTitle   = document.getElementById('p419DelTitle');
  var delDesc    = document.getElementById('p419DelDesc');
  var delCancel  = document.getElementById('p419DelCancel');
  var delConfirm = document.getElementById('p419DelConfirm');
  var delBg      = document.getElementById('p419DelBg');
  var pendingDel = null;

  function openDelModal(a) {
    if (!delModal) return;
    pendingDel = a.id;
    var draft = isDraft(a);
    if (delTitle) delTitle.textContent = draft ? '下書きを破棄しますか？' : '記事を削除しますか？';
    if (delDesc) delDesc.innerHTML = '<span class="p319-del-modal__name">' + a.title + '</span>' +
      (draft
        ? 'この下書きを完全に破棄します。入力済みの内容は復元できません。'
        : 'この記事を完全に削除します。掲載先ページからも削除され、復元できません。');
    if (delConfirm) delConfirm.textContent = draft ? '破棄する' : '削除する';
    delModal.hidden = false;
  }
  function closeDelModal() {
    if (!delModal) return;
    delModal.hidden = true;
    pendingDel = null;
  }
  if (delCancel) delCancel.addEventListener('click', closeDelModal);
  if (delBg)     delBg.addEventListener('click', closeDelModal);
  if (delConfirm) delConfirm.addEventListener('click', function () {
    if (!pendingDel) return;
    var wasDraft = false;
    for (var i = 0; i < ARTICLES.length; i++) {
      if (ARTICLES[i].id === pendingDel) { wasDraft = isDraft(ARTICLES[i]); ARTICLES.splice(i, 1); break; }
    }
    closeDelModal();
    render();
    if (KTN.toast) KTN.toast(wasDraft ? '下書きを破棄しました（デモ）' : '記事を削除しました（デモ）');
  });

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P10  検索-展覧会（ディスカバリーハブ）
════════════════════════════════════════════════════ */
KTN.pages['p10'] = function () {
  document.body.classList.add('p10-page');
  document.body.style.setProperty('--page-accent', '#005da7');
  document.body.style.setProperty('--page-accent-bg', 'rgba(0,93,167,.08)');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── デモデータ ── */
  var EX = [
    { id: 1,  title: '静寂のかたち — 田中透 油彩展', venue: '白日ギャラリー', area: '東京', s: '06.28', e: '07.13', hours: '11:00–19:00', status: 'live',   remain: '残り5日',  rd: 5,  tags: ['絵画', '現代美術'], type: 'solo',  free: 1, liaison: 'li',      pop: 88, int: 214, ci: 56, dist: '1.2km', wk: 1, isNew: 0, imgH: 200, bg: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', thumbs: ['linear-gradient(135deg,#7a8ba0,#4e5a6a)', 'linear-gradient(135deg,#8a7a60,#5e4a3a)', 'linear-gradient(135deg,#6a8a7a,#3e5a4a)'] },
    { id: 2,  title: '墨聲 — 現代書道の地平', venue: '東京書芸館', area: '東京', s: '06.20', e: '07.10', hours: '10:00–18:00', status: 'ending', remain: '残り2日',  rd: 2,  tags: ['書道'], type: 'group', free: 0, liaison: 'li-plus', pop: 92, int: 342, ci: 128, dist: '2.4km', wk: 1, isNew: 0, imgH: 165, bg: 'linear-gradient(135deg,#2e2a28,#5a5450)', thumbs: ['linear-gradient(135deg,#4a4440,#2a2624)', 'linear-gradient(135deg,#6a6058,#3a342e)', 'linear-gradient(135deg,#8a8078,#5a544e)'] },
    { id: 3,  title: '光を編む — 篠原恵 写真展', venue: 'ギャラリー日向', area: '東京', s: '07.01', e: '07.17', hours: '12:00–19:00', status: 'live',   remain: '残り9日',  rd: 9,  tags: ['写真'], type: 'solo',  free: 1, liaison: '',        pop: 65, int: 98,  ci: 24, dist: '3.1km', wk: 0, isNew: 1, imgH: 250, bg: 'linear-gradient(135deg,#c0a880,#8a6e4a)' },
    { id: 4,  title: '彫りと摺り — 木版画の現在', venue: '京都版画舎', area: '京都', s: '06.25', e: '07.20', hours: '10:00–17:00', status: 'live',   remain: '残り12日', rd: 12, tags: ['版画'], type: 'group', free: 0, liaison: '',        pop: 74, int: 156, ci: 42, dist: null,    wk: 1, isNew: 0, imgH: 190, bg: 'linear-gradient(135deg,#7a6a8a,#4a3e5a)' },
    { id: 5,  title: 'マチエールの実験', venue: 'gallery TRACE', area: '東京', s: '06.30', e: '07.16', hours: '11:00–20:00', status: 'live',   remain: '残り8日',  rd: 8,  tags: ['絵画', '現代美術'], type: 'group', free: 0, liaison: 'li',      pop: 81, int: 188, ci: 61, dist: '0.8km', wk: 1, isNew: 0, imgH: 215, bg: 'linear-gradient(135deg,#a05a4a,#6a3428)', thumbs: ['linear-gradient(135deg,#b07a6a,#7a4838)', 'linear-gradient(135deg,#c09a8a,#8a5e4e)', 'linear-gradient(135deg,#906a5a,#5a3a2e)'] },
    { id: 6,  title: '海と孤影 — 山根拓 写真展', venue: 'フォトスペース博多', area: '福岡', s: '07.18', e: '08.02', hours: '11:00–18:00', status: 'soon',   remain: '10日後に開催', rd: 99, tags: ['写真'], type: 'solo',  free: 0, liaison: '',        pop: 62, int: 74,  ci: 0,  dist: null,    wk: 0, isNew: 1, imgH: 235, bg: 'linear-gradient(135deg,#3a5a7a,#1e3448)' },
    { id: 7,  title: '筆の呼吸 — 二人の書', venue: '大阪墨美堂', area: '大阪', s: '07.02', e: '07.14', hours: '10:00–18:00', status: 'live',   remain: '残り6日',  rd: 6,  tags: ['書道'], type: 'group', free: 1, liaison: '',        pop: 55, int: 62,  ci: 18, dist: null,    wk: 1, isNew: 0, imgH: 180, bg: 'linear-gradient(135deg,#4a4a4a,#1e1e1e)' },
    { id: 8,  title: '都市の水彩 — 岡島みのり', venue: '横浜アートポート', area: '神奈川', s: '06.22', e: '07.11', hours: '11:00–19:00', status: 'ending', remain: '残り3日',  rd: 3,  tags: ['絵画'], type: 'solo',  free: 0, liaison: '',        pop: 58, int: 87,  ci: 31, dist: '5.6km', wk: 1, isNew: 0, imgH: 210, bg: 'linear-gradient(135deg,#6a9ab0,#3a5e74)' },
    { id: 9,  title: '陶と土のリズム', venue: '瀬戸クラフト館', area: '愛知', s: '06.27', e: '07.23', hours: '10:00–17:00', status: 'live',   remain: '残り15日', rd: 15, tags: ['陶芸', 'クラフト'], type: 'group', free: 0, liaison: '',        pop: 49, int: 53,  ci: 12, dist: null,    wk: 0, isNew: 0, imgH: 195, bg: 'linear-gradient(135deg,#9a8a6a,#5e5238)' },
    { id: 10, title: '銅版のミクロコスモス — 早瀬涼', venue: 'ギャラリー刻', area: '東京', s: '07.04', e: '07.18', hours: '12:00–19:00', status: 'live',   remain: '残り10日', rd: 10, tags: ['版画'], type: 'solo',  free: 0, liaison: 'li',      pop: 67, int: 112, ci: 27, dist: '4.2km', wk: 0, isNew: 1, imgH: 225, bg: 'linear-gradient(135deg,#5a7a6a,#2e4638)', thumbs: ['linear-gradient(135deg,#7a9a8a,#4a6a58)', 'linear-gradient(135deg,#6a8a7a,#3a5a48)', 'linear-gradient(135deg,#8aaa9a,#5a7a68)'] },
    { id: 11, title: 'セルフポートレイトの練習', venue: 'studio hue', area: '東京', s: '07.11', e: '07.26', hours: '13:00–20:00', status: 'soon',   remain: '3日後に開催', rd: 98, tags: ['写真', '現代美術'], type: 'solo',  free: 0, liaison: 'li-plus', pop: 79, int: 143, ci: 0,  dist: null,    wk: 1, isNew: 1, imgH: 170, bg: 'linear-gradient(135deg,#b08aa0,#7a4e68)', thumbs: ['linear-gradient(135deg,#c0a0b0,#8a5e78)', 'linear-gradient(135deg,#a07a90,#6a4258)', 'linear-gradient(135deg,#d0b0c0,#9a6e88)'] },
    { id: 12, title: 'ガラスのなかの庭 — 三好文乃', venue: '天神ガラス工房', area: '福岡', s: '06.29', e: '07.19', hours: '11:00–18:00', status: 'live',   remain: '残り11日', rd: 11, tags: ['クラフト'], type: 'solo',  free: 1, liaison: '',        pop: 66, int: 91,  ci: 22, dist: null,    wk: 0, isNew: 0, imgH: 205, bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)' },
    { id: 13, title: '抽象の温度', venue: 'アートスペース青', area: '東京', s: '06.18', e: '07.10', hours: '11:00–19:00', status: 'ending', remain: '残り2日',  rd: 2,  tags: ['現代美術'], type: 'group', free: 0, liaison: '',        pop: 90, int: 276, ci: 94, dist: '2.9km', wk: 1, isNew: 0, imgH: 240, bg: 'linear-gradient(135deg,#c07040,#7a3e18)' },
    { id: 14, title: '白の器展', venue: '京都陶々庵', area: '京都', s: '07.01', e: '07.28', hours: '10:00–17:00', status: 'live',   remain: '残り20日', rd: 20, tags: ['陶芸'], type: 'group', free: 0, liaison: '',        pop: 47, int: 44,  ci: 9,  dist: null,    wk: 0, isNew: 0, imgH: 185, light: 1, bg: 'linear-gradient(135deg,#b0aca0,#6e6a5e)' },
    { id: 15, title: '路地と光 — 街歩き写真部', venue: 'コートギャラリー谷中', area: '東京', s: '07.03', e: '07.15', hours: '11:00–18:00', status: 'live',   remain: '残り7日',  rd: 7,  tags: ['写真'], type: 'group', free: 1, liaison: '',        pop: 71, int: 104, ci: 38, dist: '1.8km', wk: 1, isNew: 1, imgH: 220, bg: 'linear-gradient(135deg,#8a8a70,#4e4e38)' },
    { id: 16, title: 'えんぴつと余白 — 西尾栞', venue: '鎌倉小町ギャラリー', area: '神奈川', s: '07.20', e: '08.04', hours: '10:00–17:00', status: 'soon',   remain: '12日後に開催', rd: 97, tags: ['絵画'], type: 'solo',  free: 1, liaison: '',        pop: 40, int: 31,  ci: 0,  dist: null,    wk: 0, isNew: 1, imgH: 175, light: 1, bg: 'linear-gradient(135deg,#d0c8a0,#8a8258)' },
  ];

  function isOn(x) { return x.status === 'live' || x.status === 'ending'; }

  /* ── 特集プリセット（アルゴリズム生成の保存済み検索）
     アイコンはプリセットの主ファセット軸（axis）から決定的にマッピング（2026-07-08 確定）：
       area=ピン / date=カレンダー / price=チケット / pop=星 / tag=タグ
     自動生成でも「生成条件の主軸 → アイコン」が一意に決まる（恣意的な絵文字は使わない）。
     LIAISON のみ html でブランドマーク（lb-dot）を付与（商標＝ファセットでなくサービス識別のため） ── */
  var P10_ICONS = {
    area:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 6.5c0 3.2-5 7.5-5 7.5S3 9.7 3 6.5a5 5 0 0 1 10 0z"/><circle cx="8" cy="6.5" r="1.8"/></svg>',
    date:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="3.5" width="11" height="10" rx="1"/><path d="M2.5 6.8h11M5.5 2v2.5M10.5 2v2.5"/></svg>',
    price: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6V4.8a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1V6a2 2 0 0 0 0 4v1.2a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V10a2 2 0 0 0 0-4z"/><path d="M9.8 5.5v1.2M9.8 7.4v1.2M9.8 9.3v1.2"/></svg>',
    pop:   '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M8 2.4l1.7 3.5 3.9.6-2.8 2.7.7 3.9L8 11.2l-3.5 1.9.7-3.9-2.8-2.7 3.9-.6L8 2.4z"/></svg>',
    tag:   '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M2.5 8V3.5a1 1 0 0 1 1-1H8a1 1 0 0 1 .7.3l4.8 4.8a1 1 0 0 1 0 1.4l-4.5 4.5a1 1 0 0 1-1.4 0L2.8 8.7a1 1 0 0 1-.3-.7z"/><circle cx="5.6" cy="5.6" r="1"/></svg>',
  };
  var PRESETS = {
    'week-picks':   { rail: 1, axis: 'pop',   label: '今週のおすすめ',        desc: '今週の「人気シグナル上位 × 開催中」から自動生成した特集です。', f: function (x) { return x.pop >= 80 && isOn(x); } },
    'liaison':      { rail: 1, label: 'オンラインで楽しめる',  html: '<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>オンラインで楽しめる', desc: '「LIAISON・LIAISON+ オンライン展示あり」条件から自動生成した特集です。', f: function (x) { return !!x.liaison; } },
    'liaison-plus': { rail: 1, label: 'オンラインで購入できる', html: '<span class="lb-dot li-plus"><span class="lb-dot-inner"></span>LIAISON+</span>オンラインで購入できる', desc: '「LIAISON+（オンライン販売あり）」条件から自動生成した特集です。会場に行けなくても作品を購入できます。', f: function (x) { return x.liaison === 'li-plus'; } },
    'fukuoka':      { rail: 1, axis: 'area',  label: '福岡で行くべき展覧会',  desc: '「福岡」エリアの掲載展覧会から自動生成した特集です。', f: function (x) { return x.area === '福岡'; } },
    'shodo':        { rail: 1, axis: 'tag',   label: '話題の書道展',          desc: '「書道」タグ × 人気シグナルの組み合わせで自動生成した特集です。', f: function (x) { return x.tags.indexOf('書道') !== -1; } },
    'weekend':      { rail: 1, axis: 'date',  label: 'この週末に行きたい',    desc: '「今週末に開催」条件から自動生成した特集です。', f: function (x) { return !!x.wk; } },
    'tokyo-gendai': { rail: 1, axis: 'area',  label: '東京・現代美術',        desc: '「東京」エリア × 「現代美術」タグの組み合わせで自動生成した特集です。', f: function (x) { return x.area === '東京' && x.tags.indexOf('現代美術') !== -1; } },
    'hanga':        { rail: 1, axis: 'tag',   label: '版画の世界',            desc: '「版画」タグの掲載展覧会から自動生成した特集です。', f: function (x) { return x.tags.indexOf('版画') !== -1; } },
    'photo':        { rail: 1, axis: 'tag',   label: '写真展セレクション',    desc: '「写真」タグの掲載展覧会から自動生成した特集です。', f: function (x) { return x.tags.indexOf('写真') !== -1; } },
    'near-live':    { rail: 1, axis: 'area',  label: '近くで開催中',          desc: '現在地から10km以内 × 開催中の条件から自動生成した特集です。', f: function (x) { return !!x.dist && isOn(x); } },
    'free':         { rail: 1, axis: 'price', label: '無料で楽しめる展示',    desc: '「入場無料」条件から自動生成した特集です。', f: function (x) { return !!x.free; } },
    'solo-month':   { rail: 1, axis: 'pop',   label: '今月注目の個展',        desc: '「個展」タイプ × 今月の人気シグナルから自動生成した特集です。', f: function (x) { return x.type === 'solo' && x.pop >= 60; } },
    'ending-all':   { rail: 0, axis: 'date',  label: 'もうすぐ終了の展覧会',  desc: '会期終了が近い順に表示しています。', f: function (x) { return x.status === 'ending'; } },
    'new-all':      { rail: 0, axis: 'date',  label: '新着掲載の展覧会',      desc: '最近個展なびに掲載された展覧会です。', f: function (x) { return !!x.isNew; } },
    'trending':     { rail: 0, axis: 'pop',   label: 'いま注目の展覧会',      desc: '興味あり！とチェックインが集まっている展覧会です。', f: function (x) { return true; } },
  };
  function presetInner(key) {
    var p = PRESETS[key];
    return p.html || ((P10_ICONS[p.axis] || '') + esc(p.label));
  }

  /* ── カード描画は共通 buildGridEcCard（cards_exhibition.html 標準）を使用 ── */
  var buildEc = buildGridEcCard;

  function toSideEc(x) {
    return { pref: x.area, title: x.title, venue: x.venue, s: x.s, e: x.e, bg: x.bg, dist: x.dist, liaison: x.liaison };
  }

  /* ── 今オンラインで買える作品（LIAISON+・作品単位のデモデータ） ──
     展覧会（EX）とは別に、価格つきで販売中の作品を並べるディスカバリー用。
     status: sale=販売中 / negot=商談中 / sold=売約済。queue=申込中の人数。 */
  var AWORKS = [
    { title: '静寂 I',        name: '田中透',   year: '2026', medium: '油彩・キャンバス', size: '727×606mm', price: 180000, status: 'sale',  queue: 2, interest: 48, bg: 'linear-gradient(135deg,#5a6b80,#2e3a4a)' },
    { title: '墨の余白',      name: '高橋蒼',   year: '2026', medium: '紙本墨画',        size: '半切',       price: 96000,  status: 'sale',  queue: 0, interest: 71, bg: 'linear-gradient(135deg,#2e2a28,#5a5450)' },
    { title: 'Self / 03',     name: 'studio hue', year: '2025', medium: 'ジークレー',    size: 'A2 ed.5',    price: 42000,  status: 'sale',  queue: 1, interest: 33, bg: 'linear-gradient(135deg,#b08aa0,#7a4e68)' },
    { title: '銅版の庭',      name: '早瀬涼',   year: '2026', medium: '銅版画',          size: '300×400mm ed.10', price: 55000, status: 'negot', queue: 3, interest: 62, bg: 'linear-gradient(135deg,#5a7a6a,#2e4638)' },
    { title: 'マチエール断章', name: '結城玲',   year: '2026', medium: 'ミクストメディア', size: '500×500mm', price: 128000, status: 'sale',  queue: 0, interest: 27, bg: 'linear-gradient(135deg,#a05a4a,#6a3428)' },
    { title: '筆勢 — 二',     name: '大西澄',   year: '2025', medium: '紙本墨書',        size: '額装',       price: 74000,  status: 'sold',  queue: 0, interest: 55, bg: 'linear-gradient(135deg,#4a4a4a,#1e1e1e)' },
  ];

  /* ── 状態 ── */
  var activePreset = null;
  var shownCount = 8;
  var PAGE_SIZE = 8;

  var elDisc    = document.getElementById('p10Discovery');
  var elResults = document.getElementById('p10Results');
  var elZero    = document.getElementById('p10Zero');
  var elKeyword = document.getElementById('p10Keyword');
  var elSort    = document.getElementById('p10Sort');

  function showView(v) {
    elDisc.hidden    = v !== 'disc';
    elResults.hidden = v !== 'results';
    elZero.hidden    = v !== 'zero';
  }

  /* ── フィルタエンジン ── */
  function activeChipFilters() {
    var m = {};
    document.querySelectorAll('.p10-chip.is-on[data-f]').forEach(function (c) {
      var i = c.dataset.f.indexOf(':');
      var k = c.dataset.f.slice(0, i), v = c.dataset.f.slice(i + 1);
      if (!m[k]) m[k] = [];
      if (m[k].indexOf(v) === -1) m[k].push(v);
    });
    return m;
  }

  function matches(x, filters, kw) {
    if (activePreset && !PRESETS[activePreset].f(x)) return false;
    for (var k in filters) {
      var vals = filters[k], ok = false;
      for (var i = 0; i < vals.length; i++) {
        var v = vals[i];
        if (k === 'st' && v === 'live' && isOn(x)) ok = true;
        else if (k === 'weekend' && x.wk) ok = true;
        else if (k === 'near' && x.dist) ok = true;
        else if (k === 'free' && x.free) ok = true;
        else if (k === 'area' && x.area === v) ok = true;
        else if (k === 'tag' && x.tags.indexOf(v) !== -1) ok = true;
        else if (k === 'type' && x.type === v) ok = true;
        else if (k === 'liaison' && (v === 'lp' ? x.liaison === 'li-plus' : !!x.liaison)) ok = true;
      }
      if (!ok) return false;
    }
    if (kw) {
      var hay = (x.title + ' ' + x.venue + ' ' + x.tags.join(' ')).toLowerCase();
      if (hay.indexOf(kw.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function sortResults(list) {
    var mode = elSort ? elSort.value : 'end';
    var out = list.slice();
    if (mode === 'pop')      out.sort(function (a, b) { return b.pop - a.pop; });
    else if (mode === 'new') out.sort(function (a, b) { return (b.isNew - a.isNew) || (a.rd - b.rd); });
    else                     out.sort(function (a, b) { return a.rd - b.rd; });
    return out;
  }

  /* ── fchips（適用中フィルタ表示） ── */
  var FLABEL = {
    'st:live': '開催中', 'weekend:1': '今週末', 'near:1': '近くで開催', 'free:1': '入場無料',
    'type:solo': '個展', 'type:group': 'グループ展', 'liaison:li': 'LIAISON展示あり', 'liaison:lp': 'LIAISON+購入可',
  };
  function fchipLabel(k, v) {
    var key = k + ':' + v;
    if (FLABEL[key]) return FLABEL[key];
    if (k === 'tag') return '# ' + v;
    return v;
  }

  function renderFchips(filters, kw) {
    var box = document.getElementById('p10Fchips');
    var html = [];
    if (activePreset) {
      html.push('<span class="p10-fchip">' + esc(PRESETS[activePreset].label)
        + '<button class="p10-fchip__x" type="button" data-rm="preset" aria-label="この特集を外す">×</button></span>');
    }
    for (var k in filters) {
      filters[k].forEach(function (v) {
        html.push('<span class="p10-fchip">' + esc(fchipLabel(k, v))
          + '<button class="p10-fchip__x" type="button" data-rm="' + esc(k + ':' + v) + '" aria-label="この条件を外す">×</button></span>');
      });
    }
    if (kw) {
      html.push('<span class="p10-fchip">「' + esc(kw) + '」'
        + '<button class="p10-fchip__x" type="button" data-rm="kw" aria-label="キーワードを外す">×</button></span>');
    }
    if (html.length >= 2) html.push('<button class="p10-fclear" type="button" data-rm="all">すべてクリア</button>');
    box.innerHTML = html.join('');
    box.hidden = !html.length;
    box.querySelectorAll('[data-rm]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var rm = btn.dataset.rm;
        if (rm === 'all') { clearAll(); showView('disc'); return; }
        if (rm === 'preset') { setPreset(null); }
        else if (rm === 'kw') { elKeyword.value = ''; }
        else { document.querySelectorAll('.p10-chip[data-f="' + rm + '"]').forEach(function (c) { c.classList.remove('is-on'); }); }
        runFilter();
      });
    });
  }

  /* ── 結果描画 ── */
  function renderResultGrid(list) {
    var grid = document.getElementById('p10ResultGrid');
    grid.innerHTML = list.slice(0, shownCount).map(buildEc).join('');
    var moreBtn = document.getElementById('p10MoreBtn');
    moreBtn.parentElement.style.display = list.length > shownCount ? '' : 'none';
    renderResultGrid._last = list;
  }

  function runFilter() {
    var filters = activeChipFilters();
    var kw = elKeyword.value.trim();
    var hasAny = activePreset || kw || Object.keys(filters).length;
    if (!hasAny) { showView('disc'); syncRail(); return; }

    var list = EX.filter(function (x) { return matches(x, filters, kw); });
    syncRail();

    if (!list.length) {
      document.getElementById('p10ZeroTitle').textContent = kw
        ? '「' + kw + '」に一致する展覧会が見つかりませんでした'
        : '条件に合う展覧会が見つかりませんでした';
      renderZeroSugg();
      showView('zero');
      return;
    }

    var p = activePreset ? PRESETS[activePreset] : null;
    document.getElementById('p10CtxEyebrow').textContent = p ? 'Feature' : 'Search Results';
    document.getElementById('p10CtxTitle').textContent = p ? p.label : (kw ? '「' + kw + '」の検索結果' : '検索結果');
    var descEl = document.getElementById('p10CtxDesc');
    descEl.textContent = p ? p.desc : '';
    descEl.hidden = !p;
    renderFchips(filters, kw);
    document.getElementById('p10Count').innerHTML = '<strong>' + list.length + '</strong>件';
    shownCount = PAGE_SIZE;
    renderResultGrid(sortResults(list));
    showView('results');
  }

  /* ── プリセット ── */
  function setPreset(key) {
    activePreset = key;
    syncRail();
  }
  function syncRail() {
    document.querySelectorAll('.p10-preset[data-key]').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.key === activePreset);
    });
  }
  function applyPreset(key) {
    clearAll();
    activePreset = key;
    runFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearAll() {
    activePreset = null;
    elKeyword.value = '';
    document.querySelectorAll('.p10-chip.is-on,.p10-day.is-on').forEach(function (c) { c.classList.remove('is-on'); });
    var near = document.querySelector('.p10-adv__near-input');
    if (near) near.value = '';
    syncRail();
  }

  /* ── プリセットレール ── */
  (function () {
    var rail = document.getElementById('p10PresetRail');
    var html = '';
    for (var key in PRESETS) {
      if (!PRESETS[key].rail) continue;
      html += '<button class="p10-preset" type="button" data-key="' + key + '">' + presetInner(key) + '</button>';
    }
    rail.innerHTML = html;
    rail.querySelectorAll('.p10-preset').forEach(function (b) {
      b.addEventListener('click', function () {
        if (activePreset === b.dataset.key) { clearAll(); showView('disc'); }
        else applyPreset(b.dataset.key);
      });
    });
    /* 横スクロール矢印（tagbar と同パターン） */
    var arrL = document.getElementById('p10PresetArrL');
    var arrR = document.getElementById('p10PresetArrR');
    function syncArr() {
      var max = rail.scrollWidth - rail.clientWidth;
      arrL.classList.toggle('is-hidden', rail.scrollLeft <= 4);
      arrR.classList.toggle('is-hidden', rail.scrollLeft >= max - 4);
    }
    arrL.addEventListener('click', function () { rail.scrollBy({ left: -220, behavior: 'smooth' }); });
    arrR.addEventListener('click', function () { rail.scrollBy({ left: 220, behavior: 'smooth' }); });
    rail.addEventListener('scroll', syncArr);
    window.addEventListener('resize', syncArr);
    syncArr();
  })();

  /* ── ディスカバリー棚 ── */
  (function () {
    var ending = EX.filter(PRESETS['ending-all'].f).sort(function (a, b) { return a.rd - b.rd; });
    document.getElementById('p10EndingGrid').innerHTML = ending.slice(0, 4).map(buildEc).join('');

    var nearby = EX.filter(PRESETS['near-live'].f).sort(function (a, b) { return parseFloat(a.dist) - parseFloat(b.dist); });
    document.getElementById('p10NearbyGrid').innerHTML = nearby.slice(0, 3).map(toSideEc).map(buildSideEcCard).join('');

    var liaison = EX.filter(PRESETS['liaison'].f).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p10LiaisonGrid').innerHTML = liaison.slice(0, 4).map(buildEc).join('');

    /* 今オンラインで買える作品（LIAISON+）＝作品単位のディスカバリー。
       LIAISONを回遊の主役にするため、展覧会だけでなく「買える作品」を価格つきで前に出す。
       カードは共通 buildP25cCard（p25c）を li-plus で描画。 */
    document.getElementById('p10BuyGrid').innerHTML = AWORKS.map(function (w) {
      return buildP25cCard(w, 'li-plus');
    }).join('');

    function fillFeature(num, key) {
      var p = PRESETS[key];
      document.getElementById('p10Feat' + num + 'Title').innerHTML = esc(p.label) + '<span class="ktn-sec-en">Feature</span>';
      document.getElementById('p10Feat' + num + 'More').dataset.preset = key;
      document.getElementById('p10Feat' + num + 'Grid').innerHTML =
        EX.filter(p.f).sort(function (a, b) { return b.pop - a.pop; }).slice(0, 4).map(buildEc).join('');
    }
    fillFeature(1, 'tokyo-gendai');
    fillFeature(2, 'weekend');

    var trending = EX.slice().sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p10RecGrid').innerHTML = trending.slice(0, 4).map(buildEc).join('');

    var news = EX.filter(function (x) { return x.isNew; }).sort(function (a, b) { return a.rd - b.rd; });
    document.getElementById('p10NewGrid').innerHTML = news.slice(0, 4).map(buildEc).join('');
  })();

  /* 棚の「もっと見る」→ プリセット着地 */
  document.querySelectorAll('[data-preset]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      applyPreset(a.dataset.preset);
    });
  });

  /* ── ゼロヒット ── */
  function renderZeroSugg() {
    var sugg = document.getElementById('p10ZeroSugg');
    sugg.innerHTML = ['near-live', 'liaison', 'free', 'weekend', 'week-picks'].map(function (key) {
      return '<button class="p10-preset" type="button" data-zero-preset="' + key + '">' + presetInner(key) + '</button>';
    }).join('');
    sugg.querySelectorAll('[data-zero-preset]').forEach(function (b) {
      b.addEventListener('click', function () { applyPreset(b.dataset.zeroPreset); });
    });
    var trending = EX.slice().sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p10ZeroGrid').innerHTML = trending.slice(0, 4).map(buildEc).join('');
  }

  /* ── 検索操作 ── */
  document.getElementById('p10SearchBtn').addEventListener('click', runFilter);
  elKeyword.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') { ev.preventDefault(); runFilter(); }
  });

  /* チップ（data-f あり＝実フィルタ／なし＝視覚デモ） */
  document.querySelectorAll('.p10-chip,.p10-day').forEach(function (c) {
    c.addEventListener('click', function () {
      var on = !c.classList.contains('is-on');
      if (c.dataset.f) {
        document.querySelectorAll('[data-f="' + c.dataset.f + '"]').forEach(function (s) { s.classList.toggle('is-on', on); });
        if (!c.closest('#p10Adv')) runFilter();
      } else {
        c.classList.toggle('is-on', on);
      }
    });
  });

  /* 詳細条件ドロワー */
  var advToggle = document.getElementById('p10AdvToggle');
  var adv = document.getElementById('p10Adv');
  advToggle.addEventListener('click', function () {
    var open = !adv.classList.contains('is-open');
    adv.classList.toggle('is-open', open);
    advToggle.classList.toggle('is-open', open);
    advToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('p10AdvClear').addEventListener('click', function () {
    document.querySelectorAll('.p10-chip.is-on,.p10-day.is-on').forEach(function (c) { c.classList.remove('is-on'); });
    var near = document.querySelector('.p10-adv__near-input');
    if (near) near.value = '';
  });
  document.getElementById('p10AdvSearch').addEventListener('click', function () {
    adv.classList.remove('is-open');
    advToggle.classList.remove('is-open');
    advToggle.setAttribute('aria-expanded', 'false');
    runFilter();
  });

  /* 並び替え・さらに読み込む */
  if (elSort) elSort.addEventListener('change', function () {
    if (!elResults.hidden && renderResultGrid._last) {
      shownCount = PAGE_SIZE;
      renderResultGrid(sortResults(renderResultGrid._last));
    }
  });
  document.getElementById('p10MoreBtn').addEventListener('click', function () {
    if (!renderResultGrid._last) return;
    shownCount = renderResultGrid._last.length;
    renderResultGrid(renderResultGrid._last);
  });

  /* ── デモバー：表示状態切替 ── */
  window.setP10View = function (view, btn) {
    document.querySelectorAll('[data-p10-view]').forEach(function (b) { b.classList.remove('on'); });
    if (btn && btn.hasAttribute('data-p10-view')) btn.classList.add('on');
    clearAll();
    if (view === 'disc') { showView('disc'); }
    else if (view === 'preset') { applyPreset('tokyo-gendai'); }
    else if (view === 'result') {
      ['st:live', 'area:東京', 'free:1'].forEach(function (f) {
        document.querySelectorAll('.p10-chip[data-f="' + f + '"]').forEach(function (c) { c.classList.add('is-on'); });
      });
      runFilter();
    }
    else if (view === 'zero') { elKeyword.value = '深夜の青騎士'; runFilter(); }
  };

  /* ── ロール反映（guest/login でおすすめ棚の見出し切替） ── */
  function applyRole() {
    var login = (window.curRole || 'guest') !== 'guest';
    document.getElementById('p10RecTitleLogin').hidden = !login;
    document.getElementById('p10RecDescLogin').hidden = !login;
    document.getElementById('p10RecTitleGuest').hidden = login;
    document.getElementById('p10RecDescGuest').hidden = login;
  }
  applyRole();
  var prevRender = window.ktnRender;
  window.ktnRender = function () {
    if (typeof prevRender === 'function') prevRender();
    applyRole();
  };
};

/* ════════════════════════════════════════════════════
   P10-1  検索-作品（ログイン限定・ゲスト非公開）
════════════════════════════════════════════════════ */
KTN.pages['p10-1'] = function () {
  document.body.classList.add('p10-page');
  document.body.style.setProperty('--page-accent', '#005da7');
  document.body.style.setProperty('--page-accent-bg', 'rgba(0,93,167,.08)');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── デモデータ（作品） ── */
  var WORKS = [
    { id:1,  title:'静寂 I',                  name:'田中透',     creatorUrl:'kotennavi-p3.html', year:'2026', medium:'油彩・キャンバス',   size:'727×606mm',       price:180000, status:'sale',    liaison:'li-plus', tags:['絵画','現代美術'],     area:'東京',   pop:88, interest:48,  queue:2, isNew:0, bg:'linear-gradient(135deg,#5a6b80,#2e3a4a)' },
    { id:2,  title:'墨の余白',                name:'高橋蒼',     creatorUrl:'#',                 year:'2026', medium:'紙本墨画',           size:'半切',            price:96000,  status:'sale',    liaison:'li-plus', tags:['書道'],                area:'東京',   pop:70, interest:71,  queue:0, isNew:0, bg:'linear-gradient(135deg,#2e2a28,#5a5450)' },
    { id:3,  title:'Self / 03',              name:'studio hue', creatorUrl:'#',                 year:'2025', medium:'ジークレー',         size:'A2 ed.5',         price:42000,  status:'sale',    liaison:'li-plus', tags:['写真','現代美術'],     area:'東京',   pop:55, interest:33,  queue:1, isNew:1, bg:'linear-gradient(135deg,#b08aa0,#7a4e68)' },
    { id:4,  title:'銅版の庭',                name:'早瀬涼',     creatorUrl:'#',                 year:'2026', medium:'銅版画',             size:'300×400mm ed.10', price:55000,  status:'negot',   liaison:'li-plus', tags:['版画'],                area:'東京',   pop:60, interest:62,  queue:3, isNew:0, bg:'linear-gradient(135deg,#5a7a6a,#2e4638)' },
    { id:5,  title:'マチエール断章',          name:'結城玲',     creatorUrl:'#',                 year:'2026', medium:'ミクストメディア',   size:'500×500mm',       price:128000, status:'sale',    liaison:'li-plus', tags:['絵画','現代美術'],     area:'大阪',   pop:77, interest:27,  queue:0, isNew:1, bg:'linear-gradient(135deg,#a05a4a,#6a3428)' },
    { id:6,  title:'筆勢 — 二',               name:'大西澄',     creatorUrl:'#',                 year:'2025', medium:'紙本墨書',           size:'額装',            price:74000,  status:'sold',    liaison:'li-plus', tags:['書道'],                area:'京都',   pop:50, interest:55,  queue:0, isNew:0, bg:'linear-gradient(135deg,#4a4a4a,#1e1e1e)' },
    { id:7,  title:'陶花器 III',              name:'桐生藍',     creatorUrl:'#',                 year:'2026', medium:'陶芸',               size:'H180mm',          price:38000,  status:'sale',    liaison:'li-plus', tags:['陶芸','クラフト'],     area:'愛知',   pop:45, interest:40,  queue:0, isNew:1, bg:'linear-gradient(135deg,#9a8a6a,#5e5238)' },
    { id:8,  title:'光の断面',                name:'篠原恵',     creatorUrl:'#',                 year:'2026', medium:'写真 ed.8',          size:'A1',              price:65000,  status:'sale',    liaison:'li-plus', tags:['写真'],                area:'東京',   pop:82, interest:98,  queue:1, isNew:0, bg:'linear-gradient(135deg,#c0a880,#8a6e4a)' },
    { id:9,  title:'街の輪郭',                name:'岡島みのり', creatorUrl:'#',                 year:'2025', medium:'水彩紙本',           size:'F6',              price:null,   status:'nsale',   liaison:'li',      tags:['絵画'],                area:'神奈川', pop:40, interest:20,  queue:0, isNew:0, bg:'linear-gradient(135deg,#6a9ab0,#3a5e74)' },
    { id:10, title:'硝子の庭',                name:'三好文乃',   creatorUrl:'#',                 year:'2026', medium:'ガラス工芸',         size:'H220mm',          price:88000,  status:'inquiry', liaison:'li-plus', tags:['クラフト'],            area:'福岡',   pop:58, interest:44,  queue:0, isNew:1, bg:'linear-gradient(135deg,#7ab0a8,#3e6e66)' },
    { id:11, title:'静物 — 器と光',           name:'高橋蒼',     creatorUrl:'#',                 year:'2026', medium:'油彩・キャンバス',   size:'F20',             price:210000, status:'sale',    liaison:'li-plus', tags:['絵画'],                area:'東京',   pop:72, interest:66,  queue:0, isNew:0, bg:'linear-gradient(135deg,#7a6a8a,#4a3e5a)' },
    { id:12, title:'木版譚',                  name:'早瀬涼',     creatorUrl:'#',                 year:'2025', medium:'木版画 ed.10',       size:'350×450mm',       price:33000,  status:'sale',    liaison:'li-plus', tags:['版画'],                area:'京都',   pop:63, interest:58,  queue:1, isNew:0, bg:'linear-gradient(135deg,#c07040,#7a3e18)' },
    { id:13, title:'セルフポートレイトの練習', name:'studio hue', creatorUrl:'#',                 year:'2025', medium:'ジークレー',         size:'A2 ed.5',         price:null,   status:'nsale',   liaison:'li',      tags:['写真','現代美術'],     area:'東京',   pop:68, interest:90,  queue:0, isNew:1, bg:'linear-gradient(135deg,#b08aa0,#7a4e68)' },
    { id:14, title:'陰影の記憶',              name:'田中透',     creatorUrl:'kotennavi-p3.html', year:'2025', medium:'油彩・キャンバス',   size:'F30',             price:152000, status:'sold',    liaison:'li-plus', tags:['絵画'],                area:'東京',   pop:85, interest:120, queue:0, isNew:0, bg:'linear-gradient(135deg,#5a6b80,#2e3a4a)' },
    { id:15, title:'布と刻',                  name:'結城玲',     creatorUrl:'#',                 year:'2026', medium:'染色',               size:'M',               price:47000,  status:'sale',    liaison:'li-plus', tags:['クラフト','現代美術'], area:'大阪',   pop:52, interest:36,  queue:0, isNew:1, bg:'linear-gradient(135deg,#a05a4a,#6a3428)' },
    { id:16, title:'墨韻',                    name:'大西澄',     creatorUrl:'#',                 year:'2026', medium:'書',                 size:'半切',            price:61000,  status:'negot',   liaison:'li-plus', tags:['書道'],                area:'京都',   pop:58, interest:41,  queue:2, isNew:0, bg:'linear-gradient(135deg,#4a4a4a,#1e1e1e)' },
  ];

  function priceBand(p) {
    if (p == null) return null;
    if (p <= 50000) return '~5';
    if (p <= 100000) return '5-10';
    if (p <= 300000) return '10-30';
    return '30-';
  }

  /* ── 特集プリセット（アルゴリズム生成の保存済み検索） ── */
  var P10_ICONS = {
    area:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 6.5c0 3.2-5 7.5-5 7.5S3 9.7 3 6.5a5 5 0 0 1 10 0z"/><circle cx="8" cy="6.5" r="1.8"/></svg>',
    date:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="3.5" width="11" height="10" rx="1"/><path d="M2.5 6.8h11M5.5 2v2.5M10.5 2v2.5"/></svg>',
    price: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6V4.8a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1V6a2 2 0 0 0 0 4v1.2a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V10a2 2 0 0 0 0-4z"/><path d="M9.8 5.5v1.2M9.8 7.4v1.2M9.8 9.3v1.2"/></svg>',
    pop:   '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M8 2.4l1.7 3.5 3.9.6-2.8 2.7.7 3.9L8 11.2l-3.5 1.9.7-3.9-2.8-2.7 3.9-.6L8 2.4z"/></svg>',
    tag:   '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M2.5 8V3.5a1 1 0 0 1 1-1H8a1 1 0 0 1 .7.3l4.8 4.8a1 1 0 0 1 0 1.4l-4.5 4.5a1 1 0 0 1-1.4 0L2.8 8.7a1 1 0 0 1-.3-.7z"/><circle cx="5.6" cy="5.6" r="1"/></svg>',
  };
  var PRESETS = {
    'sale-now':      { rail: 1, axis: 'price', label: '今すぐ購入できる',   desc: '「販売中 × LIAISON+」条件から自動生成した特集です。会場に行けなくても購入できます。', f: function (x) { return x.status === 'sale' && x.liaison === 'li-plus'; } },
    'new-arrival':   { rail: 1, axis: 'date',  label: '新着作品',          desc: '「新着掲載」条件から自動生成した特集です。', f: function (x) { return !!x.isNew; } },
    'under-50k':     { rail: 1, axis: 'price', label: '5万円以下で探す',   desc: '「価格帯 〜5万円」条件から自動生成した特集です。', f: function (x) { return priceBand(x.price) === '~5'; } },
    'tokyo-works':   { rail: 1, axis: 'area',  label: '東京の作品',        desc: '「東京」エリアの掲載作品から自動生成した特集です。', f: function (x) { return x.area === '東京'; } },
    'popular':       { rail: 1, axis: 'pop',   label: '人気の作品',        desc: '「興味あり！」シグナル上位から自動生成した特集です。', f: function (x) { return x.pop >= 70; } },
    'genre-paint':   { rail: 1, axis: 'tag',   label: '絵画作品を探す',    desc: '「絵画」ジャンルの掲載作品から自動生成した特集です。', f: function (x) { return x.tags.indexOf('絵画') !== -1; } },
    'negot-all':     { rail: 0, axis: 'price', label: '商談受付中の作品',  desc: '出品者と条件を相談できる「商談中」の作品です。', f: function (x) { return x.status === 'negot'; } },
    'new-all':       { rail: 0, axis: 'date',  label: '新着作品',          desc: '最近個展なびに掲載された作品です。', f: function (x) { return !!x.isNew; } },
    'trending':      { rail: 0, axis: 'pop',   label: 'あなたへのおすすめ', desc: 'ウォッチ中のクリエイター・興味あり！の傾向からのおすすめです。', f: function (x) { return true; } },
  };
  function presetInner(key) {
    var p = PRESETS[key];
    return (P10_ICONS[p.axis] || '') + esc(p.label);
  }

  /* ── カード描画は共通 buildP25cCard（p25c）を使用。liaison:'li' の作品は非売品扱い（価格・在庫バッジ非表示） ── */
  function buildWorkCard(w) {
    return buildP25cCard(w, w.liaison === 'li-plus' ? 'li-plus' : null);
  }

  /* ── 状態 ── */
  var activePreset = null;
  var shownCount = 8;
  var PAGE_SIZE = 8;

  var elDisc    = document.getElementById('p101Discovery');
  var elResults = document.getElementById('p101Results');
  var elZero    = document.getElementById('p101Zero');
  var elKeyword = document.getElementById('p101Keyword');
  var elSort    = document.getElementById('p101Sort');

  function showView(v) {
    elDisc.hidden    = v !== 'disc';
    elResults.hidden = v !== 'results';
    elZero.hidden    = v !== 'zero';
  }

  function activeChipFilters() {
    var m = {};
    document.querySelectorAll('.p10-chip.is-on[data-f]').forEach(function (c) {
      var i = c.dataset.f.indexOf(':');
      var k = c.dataset.f.slice(0, i), v = c.dataset.f.slice(i + 1);
      if (!m[k]) m[k] = [];
      if (m[k].indexOf(v) === -1) m[k].push(v);
    });
    return m;
  }

  function matches(x, filters, kw) {
    if (activePreset && !PRESETS[activePreset].f(x)) return false;
    for (var k in filters) {
      var vals = filters[k], ok = false;
      for (var i = 0; i < vals.length; i++) {
        var v = vals[i];
        if (k === 'st' && x.status === v) ok = true;
        else if (k === 'tag' && x.tags.indexOf(v) !== -1) ok = true;
        else if (k === 'area' && x.area === v) ok = true;
        else if (k === 'new' && x.isNew) ok = true;
        else if (k === 'price' && priceBand(x.price) === v) ok = true;
        else if (k === 'liaison' && (v === 'lp' ? x.liaison === 'li-plus' : !!x.liaison)) ok = true;
      }
      if (!ok) return false;
    }
    if (kw) {
      var hay = (x.title + ' ' + x.name + ' ' + x.tags.join(' ')).toLowerCase();
      if (hay.indexOf(kw.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function sortResults(list) {
    var mode = elSort ? elSort.value : 'pop';
    var out = list.slice();
    if (mode === 'price-asc')       out.sort(function (a, b) { return (a.price || 0) - (b.price || 0); });
    else if (mode === 'price-desc') out.sort(function (a, b) { return (b.price || 0) - (a.price || 0); });
    else if (mode === 'new')        out.sort(function (a, b) { return b.isNew - a.isNew; });
    else                            out.sort(function (a, b) { return b.pop - a.pop; });
    return out;
  }

  var FLABEL = {
    'st:sale': '販売中', 'st:negot': '商談中', 'st:inquiry': '要問合せ', 'st:sold': 'SOLD', 'st:nsale': '非売品',
    'new:1': '新着', 'liaison:li': 'LIAISON', 'liaison:lp': 'LIAISON+',
    'price:~5': '〜5万円', 'price:5-10': '5〜10万円', 'price:10-30': '10〜30万円', 'price:30-': '30万円〜',
  };
  function fchipLabel(k, v) {
    var key = k + ':' + v;
    if (FLABEL[key]) return FLABEL[key];
    if (k === 'tag') return '# ' + v;
    return v;
  }

  function renderFchips(filters, kw) {
    var box = document.getElementById('p101Fchips');
    var html = [];
    if (activePreset) {
      html.push('<span class="p10-fchip">' + esc(PRESETS[activePreset].label)
        + '<button class="p10-fchip__x" type="button" data-rm="preset" aria-label="この特集を外す">×</button></span>');
    }
    for (var k in filters) {
      filters[k].forEach(function (v) {
        html.push('<span class="p10-fchip">' + esc(fchipLabel(k, v))
          + '<button class="p10-fchip__x" type="button" data-rm="' + esc(k + ':' + v) + '" aria-label="この条件を外す">×</button></span>');
      });
    }
    if (kw) {
      html.push('<span class="p10-fchip">「' + esc(kw) + '」'
        + '<button class="p10-fchip__x" type="button" data-rm="kw" aria-label="キーワードを外す">×</button></span>');
    }
    if (html.length >= 2) html.push('<button class="p10-fclear" type="button" data-rm="all">すべてクリア</button>');
    box.innerHTML = html.join('');
    box.hidden = !html.length;
    box.querySelectorAll('[data-rm]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var rm = btn.dataset.rm;
        if (rm === 'all') { clearAll(); showView('disc'); return; }
        if (rm === 'preset') { setPreset(null); }
        else if (rm === 'kw') { elKeyword.value = ''; }
        else { document.querySelectorAll('.p10-chip[data-f="' + rm + '"]').forEach(function (c) { c.classList.remove('is-on'); }); }
        runFilter();
      });
    });
  }

  function renderResultGrid(list) {
    var grid = document.getElementById('p101ResultGrid');
    grid.innerHTML = list.slice(0, shownCount).map(buildWorkCard).join('');
    var moreBtn = document.getElementById('p101MoreBtn');
    moreBtn.parentElement.style.display = list.length > shownCount ? '' : 'none';
    renderResultGrid._last = list;
  }

  function runFilter() {
    var filters = activeChipFilters();
    var kw = elKeyword.value.trim();
    var hasAny = activePreset || kw || Object.keys(filters).length;
    if (!hasAny) { showView('disc'); syncRail(); return; }

    var list = WORKS.filter(function (x) { return matches(x, filters, kw); });
    syncRail();

    if (!list.length) {
      document.getElementById('p101ZeroTitle').textContent = kw
        ? '「' + kw + '」に一致する作品が見つかりませんでした'
        : '条件に合う作品が見つかりませんでした';
      renderZeroSugg();
      showView('zero');
      return;
    }

    var p = activePreset ? PRESETS[activePreset] : null;
    document.getElementById('p101CtxEyebrow').textContent = p ? 'Feature' : 'Search Results';
    document.getElementById('p101CtxTitle').textContent = p ? p.label : (kw ? '「' + kw + '」の検索結果' : '検索結果');
    var descEl = document.getElementById('p101CtxDesc');
    descEl.textContent = p ? p.desc : '';
    descEl.hidden = !p;
    renderFchips(filters, kw);
    document.getElementById('p101Count').innerHTML = '<strong>' + list.length + '</strong>件';
    shownCount = PAGE_SIZE;
    renderResultGrid(sortResults(list));
    showView('results');
  }

  function setPreset(key) {
    activePreset = key;
    syncRail();
  }
  function syncRail() {
    document.querySelectorAll('.p10-preset[data-key]').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.key === activePreset);
    });
  }
  function applyPreset(key) {
    clearAll();
    activePreset = key;
    runFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearAll() {
    activePreset = null;
    elKeyword.value = '';
    document.querySelectorAll('.p10-chip.is-on').forEach(function (c) { c.classList.remove('is-on'); });
    syncRail();
  }

  (function () {
    var rail = document.getElementById('p101PresetRail');
    var html = '';
    for (var key in PRESETS) {
      if (!PRESETS[key].rail) continue;
      html += '<button class="p10-preset" type="button" data-key="' + key + '">' + presetInner(key) + '</button>';
    }
    rail.innerHTML = html;
    rail.querySelectorAll('.p10-preset').forEach(function (b) {
      b.addEventListener('click', function () {
        if (activePreset === b.dataset.key) { clearAll(); showView('disc'); }
        else applyPreset(b.dataset.key);
      });
    });
    var arrL = document.getElementById('p101PresetArrL');
    var arrR = document.getElementById('p101PresetArrR');
    function syncArr() {
      var max = rail.scrollWidth - rail.clientWidth;
      arrL.classList.toggle('is-hidden', rail.scrollLeft <= 4);
      arrR.classList.toggle('is-hidden', rail.scrollLeft >= max - 4);
    }
    arrL.addEventListener('click', function () { rail.scrollBy({ left: -220, behavior: 'smooth' }); });
    arrR.addEventListener('click', function () { rail.scrollBy({ left: 220, behavior: 'smooth' }); });
    rail.addEventListener('scroll', syncArr);
    window.addEventListener('resize', syncArr);
    syncArr();
  })();

  (function () {
    var saleNow = WORKS.filter(PRESETS['sale-now'].f).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p101SaleGrid').innerHTML = saleNow.slice(0, 4).map(buildWorkCard).join('');

    var negot = WORKS.filter(PRESETS['negot-all'].f).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p101NegotGrid').innerHTML = negot.slice(0, 4).map(buildWorkCard).join('');

    var news = WORKS.filter(function (x) { return x.isNew; }).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p101NewGrid').innerHTML = news.slice(0, 4).map(buildWorkCard).join('');

    var popular = WORKS.slice().sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p101PopularGrid').innerHTML = popular.slice(0, 4).map(buildWorkCard).join('');

    var picks = WORKS.slice().sort(function (a, b) { return b.interest - a.interest; });
    document.getElementById('p101PicksGrid').innerHTML = picks.slice(0, 4).map(buildWorkCard).join('');
  })();

  document.querySelectorAll('[data-preset]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      applyPreset(a.dataset.preset);
    });
  });

  function renderZeroSugg() {
    var sugg = document.getElementById('p101ZeroSugg');
    sugg.innerHTML = ['sale-now', 'under-50k', 'new-arrival', 'popular', 'tokyo-works'].map(function (key) {
      return '<button class="p10-preset" type="button" data-zero-preset="' + key + '">' + presetInner(key) + '</button>';
    }).join('');
    sugg.querySelectorAll('[data-zero-preset]').forEach(function (b) {
      b.addEventListener('click', function () { applyPreset(b.dataset.zeroPreset); });
    });
    var popular = WORKS.slice().sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p101ZeroGrid').innerHTML = popular.slice(0, 4).map(buildWorkCard).join('');
  }

  document.getElementById('p101SearchBtn').addEventListener('click', runFilter);
  elKeyword.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') { ev.preventDefault(); runFilter(); }
  });

  document.querySelectorAll('.p10-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      var on = !c.classList.contains('is-on');
      if (c.dataset.f) {
        document.querySelectorAll('[data-f="' + c.dataset.f + '"]').forEach(function (s) { s.classList.toggle('is-on', on); });
        if (!c.closest('#p101Adv')) runFilter();
      } else {
        c.classList.toggle('is-on', on);
      }
    });
  });

  var advToggle = document.getElementById('p101AdvToggle');
  var adv = document.getElementById('p101Adv');
  advToggle.addEventListener('click', function () {
    var open = !adv.classList.contains('is-open');
    adv.classList.toggle('is-open', open);
    advToggle.classList.toggle('is-open', open);
    advToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('p101AdvClear').addEventListener('click', function () {
    document.querySelectorAll('.p10-chip.is-on').forEach(function (c) { c.classList.remove('is-on'); });
  });
  document.getElementById('p101AdvSearch').addEventListener('click', function () {
    adv.classList.remove('is-open');
    advToggle.classList.remove('is-open');
    advToggle.setAttribute('aria-expanded', 'false');
    runFilter();
  });

  if (elSort) elSort.addEventListener('change', function () {
    if (!elResults.hidden && renderResultGrid._last) {
      shownCount = PAGE_SIZE;
      renderResultGrid(sortResults(renderResultGrid._last));
    }
  });
  document.getElementById('p101MoreBtn').addEventListener('click', function () {
    if (!renderResultGrid._last) return;
    shownCount = renderResultGrid._last.length;
    renderResultGrid(renderResultGrid._last);
  });

  /* ── デモバー：表示状態切替（ログイン限定ページのためロール切替なし） ── */
  window.setP101View = function (view, btn) {
    document.querySelectorAll('[data-p101-view]').forEach(function (b) { b.classList.remove('on'); });
    if (btn && btn.hasAttribute('data-p101-view')) btn.classList.add('on');
    clearAll();
    if (view === 'disc') { showView('disc'); }
    else if (view === 'preset') { applyPreset('tokyo-works'); }
    else if (view === 'result') {
      ['st:sale', 'area:東京'].forEach(function (f) {
        document.querySelectorAll('.p10-chip[data-f="' + f + '"]').forEach(function (c) { c.classList.add('is-on'); });
      });
      runFilter();
    }
    else if (view === 'zero') { elKeyword.value = '深夜の青騎士'; runFilter(); }
  };

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P10-2  検索-クリエイター（ログイン限定・ゲスト非公開）
════════════════════════════════════════════════════ */
KTN.pages['p10-2'] = function () {
  document.body.classList.add('p10-page');
  document.body.style.setProperty('--page-accent', '#005da7');
  document.body.style.setProperty('--page-accent-bg', 'rgba(0,93,167,.08)');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── デモデータ（クリエイター）。avStyle は p10-1/p1 の同名人物と同一グラデーションで統一 ── */
  var CREATORS = [
    { id: 1,  name: '田中透',       href: 'kotennavi-p3.html', genreTags: ['絵画', '現代美術'],   genre: '絵画・現代美術',   area: '東京',   status: 'live',     exh: 3, watch: 214, pop: 88, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', ini: '田' },
    { id: 2,  name: '高橋蒼',       href: '#',                 genreTags: ['書道'],                genre: '書道',              area: '東京',   status: '',         exh: 2, watch: 71,  pop: 70, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#2e2a28,#5a5450)', ini: '高' },
    { id: 3,  name: 'studio hue',  href: '#',                 genreTags: ['写真', '現代美術'],   genre: '写真・現代美術',   area: '東京',   status: 'upcoming', exh: 2, watch: 143, pop: 79, isNew: 1, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#b08aa0,#7a4e68)', ini: 'S' },
    { id: 4,  name: '早瀬涼',       href: '#',                 genreTags: ['版画'],                genre: '版画',              area: '京都',   status: '',         exh: 2, watch: 112, pop: 67, isNew: 0, liaison: 'li',      avStyle: 'linear-gradient(135deg,#5a7a6a,#2e4638)', ini: '早' },
    { id: 5,  name: '結城玲',       href: '#',                 genreTags: ['絵画', 'クラフト'],   genre: '絵画・クラフト',   area: '大阪',   status: '',         exh: 1, watch: 36,  pop: 52, isNew: 1, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#a05a4a,#6a3428)', ini: '結' },
    { id: 6,  name: '大西澄',       href: '#',                 genreTags: ['書道'],                genre: '書道',              area: '京都',   status: '',         exh: 1, watch: 41,  pop: 58, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#4a4a4a,#1e1e1e)', ini: '大' },
    { id: 7,  name: '桐生藍',       href: '#',                 genreTags: ['陶芸', 'クラフト'],   genre: '陶芸・クラフト',   area: '愛知',   status: 'live',     exh: 1, watch: 40,  pop: 45, isNew: 1, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#9a8a6a,#5e5238)', ini: '桐' },
    { id: 8,  name: '篠原恵',       href: '#',                 genreTags: ['写真'],                genre: '写真',              area: '東京',   status: 'live',     exh: 1, watch: 98,  pop: 82, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#c0a880,#8a6e4a)', ini: '篠' },
    { id: 9,  name: '岡島みのり',   href: '#',                 genreTags: ['絵画'],                genre: '絵画',              area: '神奈川', status: 'live',     exh: 1, watch: 87,  pop: 58, isNew: 0, liaison: 'li',      avStyle: 'linear-gradient(135deg,#6a9ab0,#3a5e74)', ini: '岡' },
    { id: 10, name: '三好文乃',     href: '#',                 genreTags: ['クラフト'],            genre: 'クラフト',          area: '福岡',   status: 'live',     exh: 1, watch: 91,  pop: 66, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#7ab0a8,#3e6e66)', ini: '三' },
    { id: 11, name: '山根拓',       href: '#',                 genreTags: ['写真'],                genre: '写真',              area: '福岡',   status: 'upcoming', exh: 1, watch: 74,  pop: 62, isNew: 1, liaison: '',         avStyle: 'linear-gradient(135deg,#3a5a7a,#1e3448)', ini: '山' },
    { id: 12, name: '森田一葉',     href: '#',                 genreTags: ['陶芸'],                genre: '陶芸',              area: '京都',   status: '',         exh: 1, watch: 28,  pop: 38, isNew: 0, liaison: '',         avStyle: 'linear-gradient(135deg,#8a8a70,#4e4e38)', ini: '森' },
  ];

  /* ── 特集プリセット（アルゴリズム生成の保存済み検索） ── */
  var P10_ICONS = {
    area: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 6.5c0 3.2-5 7.5-5 7.5S3 9.7 3 6.5a5 5 0 0 1 10 0z"/><circle cx="8" cy="6.5" r="1.8"/></svg>',
    date: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="3.5" width="11" height="10" rx="1"/><path d="M2.5 6.8h11M5.5 2v2.5M10.5 2v2.5"/></svg>',
    pop:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M8 2.4l1.7 3.5 3.9.6-2.8 2.7.7 3.9L8 11.2l-3.5 1.9.7-3.9-2.8-2.7 3.9-.6L8 2.4z"/></svg>',
    tag:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M2.5 8V3.5a1 1 0 0 1 1-1H8a1 1 0 0 1 .7.3l4.8 4.8a1 1 0 0 1 0 1.4l-4.5 4.5a1 1 0 0 1-1.4 0L2.8 8.7a1 1 0 0 1-.3-.7z"/><circle cx="5.6" cy="5.6" r="1"/></svg>',
  };
  var PRESETS = {
    'exh-live':      { rail: 1, axis: 'date', label: '開催中の展覧会があるクリエイター', desc: '「開催中」条件から自動生成した特集です。いま会場・LIAISONで作品を見られます。', f: function (x) { return x.status === 'live'; } },
    'new-arrival':   { rail: 1, axis: 'date', label: '新着クリエイター',                 desc: '「新着掲載」条件から自動生成した特集です。', f: function (x) { return !!x.isNew; } },
    'liaison-plus':  { rail: 1, axis: 'tag',  label: 'LIAISON+作品があるクリエイター',   desc: '「LIAISON+」条件から自動生成した特集です。会場に行けなくても作品を購入できます。', f: function (x) { return x.liaison === 'li-plus'; } },
    'tokyo-creators':{ rail: 1, axis: 'area', label: '東京のクリエイター',               desc: '「東京」エリアで活動するクリエイターから自動生成した特集です。', f: function (x) { return x.area === '東京'; } },
    'popular':       { rail: 1, axis: 'pop',  label: '人気のクリエイター',               desc: '「興味あり！」シグナル上位から自動生成した特集です。', f: function (x) { return x.pop >= 70; } },
    'genre-paint':   { rail: 1, axis: 'tag',  label: '絵画のクリエイター',               desc: '「絵画」ジャンルのクリエイターから自動生成した特集です。', f: function (x) { return x.genreTags.indexOf('絵画') !== -1; } },
    'upcoming-all':  { rail: 0, axis: 'date', label: '開催予定の展覧会があるクリエイター', desc: 'まもなく展覧会が始まるクリエイターです。', f: function (x) { return x.status === 'upcoming'; } },
    'new-all':       { rail: 0, axis: 'date', label: '新着クリエイター',                 desc: '最近個展なびに掲載されたクリエイターです。', f: function (x) { return !!x.isNew; } },
    'trending':      { rail: 0, axis: 'pop',  label: 'あなたへのおすすめ',               desc: 'ウォッチ中のクリエイター・興味あり！の傾向からのおすすめです。', f: function (x) { return true; } },
  };
  function presetInner(key) {
    var p = PRESETS[key];
    return (P10_ICONS[p.axis] || '') + esc(p.label);
  }

  /* ── カード描画は共通 buildPersonCard（cc--h）を使用 ── */
  function buildCreatorCard(x) {
    return buildPersonCard({ type: 'creator', avStyle: x.avStyle, ini: x.ini, name: x.name, genre: x.genre, exh: x.exh, watch: x.watch, panel: false, href: x.href, status: x.status });
  }

  /* ── 状態 ── */
  var activePreset = null;
  var shownCount = 8;
  var PAGE_SIZE = 8;

  var elDisc    = document.getElementById('p102Discovery');
  var elResults = document.getElementById('p102Results');
  var elZero    = document.getElementById('p102Zero');
  var elKeyword = document.getElementById('p102Keyword');
  var elSort    = document.getElementById('p102Sort');

  function showView(v) {
    elDisc.hidden    = v !== 'disc';
    elResults.hidden = v !== 'results';
    elZero.hidden    = v !== 'zero';
  }

  function activeChipFilters() {
    var m = {};
    document.querySelectorAll('.p10-chip.is-on[data-f]').forEach(function (c) {
      var i = c.dataset.f.indexOf(':');
      var k = c.dataset.f.slice(0, i), v = c.dataset.f.slice(i + 1);
      if (!m[k]) m[k] = [];
      if (m[k].indexOf(v) === -1) m[k].push(v);
    });
    return m;
  }

  function matches(x, filters, kw) {
    if (activePreset && !PRESETS[activePreset].f(x)) return false;
    for (var k in filters) {
      var vals = filters[k], ok = false;
      for (var i = 0; i < vals.length; i++) {
        var v = vals[i];
        if (k === 'st' && (v === 'none' ? !x.status : x.status === v)) ok = true;
        else if (k === 'tag' && x.genreTags.indexOf(v) !== -1) ok = true;
        else if (k === 'area' && x.area === v) ok = true;
        else if (k === 'new' && x.isNew) ok = true;
        else if (k === 'liaison' && (v === 'lp' ? x.liaison === 'li-plus' : !!x.liaison)) ok = true;
      }
      if (!ok) return false;
    }
    if (kw) {
      var hay = (x.name + ' ' + x.genreTags.join(' ') + ' ' + x.area).toLowerCase();
      if (hay.indexOf(kw.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function sortResults(list) {
    var mode = elSort ? elSort.value : 'pop';
    var out = list.slice();
    if (mode === 'new')      out.sort(function (a, b) { return b.isNew - a.isNew; });
    else if (mode === 'exh') out.sort(function (a, b) { return b.exh - a.exh; });
    else                     out.sort(function (a, b) { return b.pop - a.pop; });
    return out;
  }

  var FLABEL = {
    'st:live': '開催中', 'st:upcoming': '開催予定', 'st:none': '現在開催なし',
    'new:1': '新着', 'liaison:li': 'LIAISON', 'liaison:lp': 'LIAISON+',
  };
  function fchipLabel(k, v) {
    var key = k + ':' + v;
    if (FLABEL[key]) return FLABEL[key];
    if (k === 'tag') return '# ' + v;
    return v;
  }

  function renderFchips(filters, kw) {
    var box = document.getElementById('p102Fchips');
    var html = [];
    if (activePreset) {
      html.push('<span class="p10-fchip">' + esc(PRESETS[activePreset].label)
        + '<button class="p10-fchip__x" type="button" data-rm="preset" aria-label="この特集を外す">×</button></span>');
    }
    for (var k in filters) {
      filters[k].forEach(function (v) {
        html.push('<span class="p10-fchip">' + esc(fchipLabel(k, v))
          + '<button class="p10-fchip__x" type="button" data-rm="' + esc(k + ':' + v) + '" aria-label="この条件を外す">×</button></span>');
      });
    }
    if (kw) {
      html.push('<span class="p10-fchip">「' + esc(kw) + '」'
        + '<button class="p10-fchip__x" type="button" data-rm="kw" aria-label="キーワードを外す">×</button></span>');
    }
    if (html.length >= 2) html.push('<button class="p10-fclear" type="button" data-rm="all">すべてクリア</button>');
    box.innerHTML = html.join('');
    box.hidden = !html.length;
    box.querySelectorAll('[data-rm]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var rm = btn.dataset.rm;
        if (rm === 'all') { clearAll(); showView('disc'); return; }
        if (rm === 'preset') { setPreset(null); }
        else if (rm === 'kw') { elKeyword.value = ''; }
        else { document.querySelectorAll('.p10-chip[data-f="' + rm + '"]').forEach(function (c) { c.classList.remove('is-on'); }); }
        runFilter();
      });
    });
  }

  function renderResultGrid(list) {
    var grid = document.getElementById('p102ResultGrid');
    grid.innerHTML = list.slice(0, shownCount).map(buildCreatorCard).join('');
    var moreBtn = document.getElementById('p102MoreBtn');
    moreBtn.parentElement.style.display = list.length > shownCount ? '' : 'none';
    renderResultGrid._last = list;
  }

  function runFilter() {
    var filters = activeChipFilters();
    var kw = elKeyword.value.trim();
    var hasAny = activePreset || kw || Object.keys(filters).length;
    if (!hasAny) { showView('disc'); syncRail(); return; }

    var list = CREATORS.filter(function (x) { return matches(x, filters, kw); });
    syncRail();

    if (!list.length) {
      document.getElementById('p102ZeroTitle').textContent = kw
        ? '「' + kw + '」に一致するクリエイターが見つかりませんでした'
        : '条件に合うクリエイターが見つかりませんでした';
      renderZeroSugg();
      showView('zero');
      return;
    }

    var p = activePreset ? PRESETS[activePreset] : null;
    document.getElementById('p102CtxEyebrow').textContent = p ? 'Feature' : 'Search Results';
    document.getElementById('p102CtxTitle').textContent = p ? p.label : (kw ? '「' + kw + '」の検索結果' : '検索結果');
    var descEl = document.getElementById('p102CtxDesc');
    descEl.textContent = p ? p.desc : '';
    descEl.hidden = !p;
    renderFchips(filters, kw);
    document.getElementById('p102Count').innerHTML = '<strong>' + list.length + '</strong>件';
    shownCount = PAGE_SIZE;
    renderResultGrid(sortResults(list));
    showView('results');
  }

  function setPreset(key) {
    activePreset = key;
    syncRail();
  }
  function syncRail() {
    document.querySelectorAll('.p10-preset[data-key]').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.key === activePreset);
    });
  }
  function applyPreset(key) {
    clearAll();
    activePreset = key;
    runFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearAll() {
    activePreset = null;
    elKeyword.value = '';
    document.querySelectorAll('.p10-chip.is-on').forEach(function (c) { c.classList.remove('is-on'); });
    syncRail();
  }

  (function () {
    var rail = document.getElementById('p102PresetRail');
    var html = '';
    for (var key in PRESETS) {
      if (!PRESETS[key].rail) continue;
      html += '<button class="p10-preset" type="button" data-key="' + key + '">' + presetInner(key) + '</button>';
    }
    rail.innerHTML = html;
    rail.querySelectorAll('.p10-preset').forEach(function (b) {
      b.addEventListener('click', function () {
        if (activePreset === b.dataset.key) { clearAll(); showView('disc'); }
        else applyPreset(b.dataset.key);
      });
    });
    var arrL = document.getElementById('p102PresetArrL');
    var arrR = document.getElementById('p102PresetArrR');
    function syncArr() {
      var max = rail.scrollWidth - rail.clientWidth;
      arrL.classList.toggle('is-hidden', rail.scrollLeft <= 4);
      arrR.classList.toggle('is-hidden', rail.scrollLeft >= max - 4);
    }
    arrL.addEventListener('click', function () { rail.scrollBy({ left: -220, behavior: 'smooth' }); });
    arrR.addEventListener('click', function () { rail.scrollBy({ left: 220, behavior: 'smooth' }); });
    rail.addEventListener('scroll', syncArr);
    window.addEventListener('resize', syncArr);
    syncArr();
  })();

  (function () {
    var live = CREATORS.filter(PRESETS['exh-live'].f).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p102LiveGrid').innerHTML = live.slice(0, 4).map(buildCreatorCard).join('');

    var upcoming = CREATORS.filter(PRESETS['upcoming-all'].f).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p102UpcomingGrid').innerHTML = upcoming.slice(0, 4).map(buildCreatorCard).join('');

    var news = CREATORS.filter(function (x) { return x.isNew; }).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p102NewGrid').innerHTML = news.slice(0, 4).map(buildCreatorCard).join('');

    var popular = CREATORS.slice().sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p102PopularGrid').innerHTML = popular.slice(0, 4).map(buildCreatorCard).join('');

    var picks = CREATORS.slice().sort(function (a, b) { return b.watch - a.watch; });
    document.getElementById('p102PicksGrid').innerHTML = picks.slice(0, 4).map(buildCreatorCard).join('');
  })();

  document.querySelectorAll('[data-preset]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      applyPreset(a.dataset.preset);
    });
  });

  function renderZeroSugg() {
    var sugg = document.getElementById('p102ZeroSugg');
    sugg.innerHTML = ['exh-live', 'liaison-plus', 'new-arrival', 'popular', 'tokyo-creators'].map(function (key) {
      return '<button class="p10-preset" type="button" data-zero-preset="' + key + '">' + presetInner(key) + '</button>';
    }).join('');
    sugg.querySelectorAll('[data-zero-preset]').forEach(function (b) {
      b.addEventListener('click', function () { applyPreset(b.dataset.zeroPreset); });
    });
    var popular = CREATORS.slice().sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p102ZeroGrid').innerHTML = popular.slice(0, 4).map(buildCreatorCard).join('');
  }

  document.getElementById('p102SearchBtn').addEventListener('click', runFilter);
  elKeyword.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') { ev.preventDefault(); runFilter(); }
  });

  document.querySelectorAll('.p10-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      var on = !c.classList.contains('is-on');
      if (c.dataset.f) {
        document.querySelectorAll('[data-f="' + c.dataset.f + '"]').forEach(function (s) { s.classList.toggle('is-on', on); });
        if (!c.closest('#p102Adv')) runFilter();
      } else {
        c.classList.toggle('is-on', on);
      }
    });
  });

  var advToggle = document.getElementById('p102AdvToggle');
  var adv = document.getElementById('p102Adv');
  advToggle.addEventListener('click', function () {
    var open = !adv.classList.contains('is-open');
    adv.classList.toggle('is-open', open);
    advToggle.classList.toggle('is-open', open);
    advToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('p102AdvClear').addEventListener('click', function () {
    document.querySelectorAll('.p10-chip.is-on').forEach(function (c) { c.classList.remove('is-on'); });
  });
  document.getElementById('p102AdvSearch').addEventListener('click', function () {
    adv.classList.remove('is-open');
    advToggle.classList.remove('is-open');
    advToggle.setAttribute('aria-expanded', 'false');
    runFilter();
  });

  if (elSort) elSort.addEventListener('change', function () {
    if (!elResults.hidden && renderResultGrid._last) {
      shownCount = PAGE_SIZE;
      renderResultGrid(sortResults(renderResultGrid._last));
    }
  });
  document.getElementById('p102MoreBtn').addEventListener('click', function () {
    if (!renderResultGrid._last) return;
    shownCount = renderResultGrid._last.length;
    renderResultGrid(renderResultGrid._last);
  });

  /* ── デモバー：表示状態切替（ログイン限定ページのためロール切替なし） ── */
  window.setP102View = function (view, btn) {
    document.querySelectorAll('[data-p102-view]').forEach(function (b) { b.classList.remove('on'); });
    if (btn && btn.hasAttribute('data-p102-view')) btn.classList.add('on');
    clearAll();
    if (view === 'disc') { showView('disc'); }
    else if (view === 'preset') { applyPreset('tokyo-creators'); }
    else if (view === 'result') {
      ['st:live', 'area:東京'].forEach(function (f) {
        document.querySelectorAll('.p10-chip[data-f="' + f + '"]').forEach(function (c) { c.classList.add('is-on'); });
      });
      runFilter();
    }
    else if (view === 'zero') { elKeyword.value = '深夜の青騎士'; runFilter(); }
  };

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P10-3  検索-ギャラリー（ログイン限定・ゲスト非公開）
════════════════════════════════════════════════════ */
KTN.pages['p10-3'] = function () {
  document.body.classList.add('p10-page');
  document.body.style.setProperty('--page-accent', '#005da7');
  document.body.style.setProperty('--page-accent-bg', 'rgba(0,93,167,.08)');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── デモデータ（ギャラリー）。avStyle は p1（EX）の同名会場と同一グラデーションで統一 ── */
  var GALLERIES = [
    { id: 1,  name: '白日ギャラリー',       href: 'kotennavi-p4.html', genreTags: ['絵画', '現代美術'], area: '東京',   location: '渋谷区',   hours: '11:00–19:00', status: 'live',     exh: 4, watch: 180, pop: 85, isNew: 0, liaison: 'li',      avStyle: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', ini: '白' },
    { id: 2,  name: '東京書芸館',           href: '#',                 genreTags: ['書道'],              area: '東京',   location: '千代田区', hours: '10:00–18:00', status: 'live',     exh: 2, watch: 220, pop: 90, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#2e2a28,#5a5450)', ini: '東' },
    { id: 3,  name: 'ギャラリー日向',       href: '#',                 genreTags: ['写真'],              area: '東京',   location: '目黒区',   hours: '12:00–19:00', status: 'live',     exh: 2, watch: 75,  pop: 66, isNew: 1, liaison: '',         avStyle: 'linear-gradient(135deg,#c0a880,#8a6e4a)', ini: '日' },
    { id: 4,  name: '京都版画舎',           href: '#',                 genreTags: ['版画'],              area: '京都',   location: '左京区',   hours: '10:00–17:00', status: 'live',     exh: 3, watch: 98,  pop: 70, isNew: 0, liaison: '',         avStyle: 'linear-gradient(135deg,#7a6a8a,#4a3e5a)', ini: '京' },
    { id: 5,  name: 'gallery TRACE',       href: '#',                 genreTags: ['絵画', '現代美術'], area: '東京',   location: '台東区',   hours: '11:00–20:00', status: 'live',     exh: 2, watch: 130, pop: 78, isNew: 0, liaison: 'li',      avStyle: 'linear-gradient(135deg,#a05a4a,#6a3428)', ini: 'T' },
    { id: 6,  name: 'フォトスペース博多',   href: '#',                 genreTags: ['写真'],              area: '福岡',   location: '博多区',   hours: '11:00–18:00', status: 'upcoming', exh: 1, watch: 40,  pop: 55, isNew: 1, liaison: '',         avStyle: 'linear-gradient(135deg,#3a5a7a,#1e3448)', ini: '博' },
    { id: 7,  name: '大阪墨美堂',           href: '#',                 genreTags: ['書道'],              area: '大阪',   location: '中央区',   hours: '10:00–18:00', status: 'live',     exh: 2, watch: 50,  pop: 52, isNew: 0, liaison: '',         avStyle: 'linear-gradient(135deg,#4a4a4a,#1e1e1e)', ini: '大' },
    { id: 8,  name: '横浜アートポート',     href: '#',                 genreTags: ['絵画'],              area: '神奈川', location: '西区',     hours: '11:00–19:00', status: 'live',     exh: 1, watch: 64,  pop: 56, isNew: 0, liaison: '',         avStyle: 'linear-gradient(135deg,#6a9ab0,#3a5e74)', ini: '横' },
    { id: 9,  name: '瀬戸クラフト館',       href: '#',                 genreTags: ['陶芸', 'クラフト'], area: '愛知',   location: '瀬戸市',   hours: '10:00–17:00', status: 'live',     exh: 1, watch: 35,  pop: 47, isNew: 0, liaison: '',         avStyle: 'linear-gradient(135deg,#9a8a6a,#5e5238)', ini: '瀬' },
    { id: 10, name: 'ギャラリー刻',         href: '#',                 genreTags: ['版画'],              area: '東京',   location: '文京区',   hours: '12:00–19:00', status: 'live',     exh: 2, watch: 88,  pop: 64, isNew: 1, liaison: 'li',      avStyle: 'linear-gradient(135deg,#5a7a6a,#2e4638)', ini: '刻' },
    { id: 11, name: 'YUGEN Gallery',       href: '#',                 genreTags: ['現代美術'],          area: '東京',   location: '中央区',   hours: '11:00–19:00', status: '',         exh: 1, watch: 22,  pop: 33, isNew: 0, liaison: '',         avStyle: 'linear-gradient(135deg,#4a5a6a,#26323e)', ini: 'Y' },
    { id: 12, name: 'Gallery SOIL 渋谷',   href: '#',                 genreTags: ['クラフト', '現代美術'], area: '東京', location: '渋谷区',   hours: '11:00–20:00', status: '',         exh: 2, watch: 45,  pop: 48, isNew: 1, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#7a9a8a,#3e5a4a)', ini: 'S' },
  ];

  /* ── 特集プリセット（アルゴリズム生成の保存済み検索） ── */
  var P10_ICONS = {
    area: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 6.5c0 3.2-5 7.5-5 7.5S3 9.7 3 6.5a5 5 0 0 1 10 0z"/><circle cx="8" cy="6.5" r="1.8"/></svg>',
    date: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="3.5" width="11" height="10" rx="1"/><path d="M2.5 6.8h11M5.5 2v2.5M10.5 2v2.5"/></svg>',
    pop:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M8 2.4l1.7 3.5 3.9.6-2.8 2.7.7 3.9L8 11.2l-3.5 1.9.7-3.9-2.8-2.7 3.9-.6L8 2.4z"/></svg>',
    tag:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M2.5 8V3.5a1 1 0 0 1 1-1H8a1 1 0 0 1 .7.3l4.8 4.8a1 1 0 0 1 0 1.4l-4.5 4.5a1 1 0 0 1-1.4 0L2.8 8.7a1 1 0 0 1-.3-.7z"/><circle cx="5.6" cy="5.6" r="1"/></svg>',
  };
  var PRESETS = {
    'exh-live':        { rail: 1, axis: 'date', label: '開催中の展覧会があるギャラリー', desc: '「開催中」条件から自動生成した特集です。いま会場・LIAISONで作品を見られます。', f: function (x) { return x.status === 'live'; } },
    'new-arrival':     { rail: 1, axis: 'date', label: '新着ギャラリー',                 desc: '「新着掲載」条件から自動生成した特集です。', f: function (x) { return !!x.isNew; } },
    'liaison-plus':    { rail: 1, axis: 'tag',  label: 'LIAISON+作品があるギャラリー',   desc: '「LIAISON+」条件から自動生成した特集です。会場に行けなくても作品を購入できます。', f: function (x) { return x.liaison === 'li-plus'; } },
    'tokyo-galleries': { rail: 1, axis: 'area', label: '東京のギャラリー',               desc: '「東京」エリアで活動するギャラリーから自動生成した特集です。', f: function (x) { return x.area === '東京'; } },
    'popular':         { rail: 1, axis: 'pop',  label: '人気のギャラリー',               desc: '「興味あり！」シグナル上位から自動生成した特集です。', f: function (x) { return x.pop >= 70; } },
    'genre-paint':     { rail: 1, axis: 'tag',  label: '絵画を扱うギャラリー',           desc: '「絵画」ジャンルを扱うギャラリーから自動生成した特集です。', f: function (x) { return x.genreTags.indexOf('絵画') !== -1; } },
    'upcoming-all':    { rail: 0, axis: 'date', label: '開催予定の展覧会があるギャラリー', desc: 'まもなく展覧会が始まるギャラリーです。', f: function (x) { return x.status === 'upcoming'; } },
    'new-all':         { rail: 0, axis: 'date', label: '新着ギャラリー',                 desc: '最近個展なびに掲載されたギャラリーです。', f: function (x) { return !!x.isNew; } },
    'trending':        { rail: 0, axis: 'pop',  label: 'あなたへのおすすめ',             desc: 'ウォッチ中のギャラリー・興味あり！の傾向からのおすすめです。', f: function (x) { return true; } },
  };
  function presetInner(key) {
    var p = PRESETS[key];
    return (P10_ICONS[p.axis] || '') + esc(p.label);
  }

  /* ── カード描画は共通 buildPersonCard（gc--h）を使用 ── */
  function buildGalleryCard(x) {
    return buildPersonCard({ type: 'gallery', avStyle: x.avStyle, ini: x.ini, name: x.name, location: x.location, hours: x.hours, exh: x.exh, watch: x.watch, panel: false, href: x.href, status: x.status });
  }

  /* ── 状態 ── */
  var activePreset = null;
  var shownCount = 8;
  var PAGE_SIZE = 8;

  var elDisc    = document.getElementById('p103Discovery');
  var elResults = document.getElementById('p103Results');
  var elZero    = document.getElementById('p103Zero');
  var elKeyword = document.getElementById('p103Keyword');
  var elSort    = document.getElementById('p103Sort');

  function showView(v) {
    elDisc.hidden    = v !== 'disc';
    elResults.hidden = v !== 'results';
    elZero.hidden    = v !== 'zero';
  }

  function activeChipFilters() {
    var m = {};
    document.querySelectorAll('.p10-chip.is-on[data-f]').forEach(function (c) {
      var i = c.dataset.f.indexOf(':');
      var k = c.dataset.f.slice(0, i), v = c.dataset.f.slice(i + 1);
      if (!m[k]) m[k] = [];
      if (m[k].indexOf(v) === -1) m[k].push(v);
    });
    return m;
  }

  function matches(x, filters, kw) {
    if (activePreset && !PRESETS[activePreset].f(x)) return false;
    for (var k in filters) {
      var vals = filters[k], ok = false;
      for (var i = 0; i < vals.length; i++) {
        var v = vals[i];
        if (k === 'st' && (v === 'none' ? !x.status : x.status === v)) ok = true;
        else if (k === 'tag' && x.genreTags.indexOf(v) !== -1) ok = true;
        else if (k === 'area' && x.area === v) ok = true;
        else if (k === 'new' && x.isNew) ok = true;
        else if (k === 'liaison' && (v === 'lp' ? x.liaison === 'li-plus' : !!x.liaison)) ok = true;
      }
      if (!ok) return false;
    }
    if (kw) {
      var hay = (x.name + ' ' + x.genreTags.join(' ') + ' ' + x.area + ' ' + x.location).toLowerCase();
      if (hay.indexOf(kw.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function sortResults(list) {
    var mode = elSort ? elSort.value : 'pop';
    var out = list.slice();
    if (mode === 'new')      out.sort(function (a, b) { return b.isNew - a.isNew; });
    else if (mode === 'exh') out.sort(function (a, b) { return b.exh - a.exh; });
    else                     out.sort(function (a, b) { return b.pop - a.pop; });
    return out;
  }

  var FLABEL = {
    'st:live': '開催中', 'st:upcoming': '開催予定', 'st:none': '現在開催なし',
    'new:1': '新着', 'liaison:li': 'LIAISON', 'liaison:lp': 'LIAISON+',
  };
  function fchipLabel(k, v) {
    var key = k + ':' + v;
    if (FLABEL[key]) return FLABEL[key];
    if (k === 'tag') return '# ' + v;
    return v;
  }

  function renderFchips(filters, kw) {
    var box = document.getElementById('p103Fchips');
    var html = [];
    if (activePreset) {
      html.push('<span class="p10-fchip">' + esc(PRESETS[activePreset].label)
        + '<button class="p10-fchip__x" type="button" data-rm="preset" aria-label="この特集を外す">×</button></span>');
    }
    for (var k in filters) {
      filters[k].forEach(function (v) {
        html.push('<span class="p10-fchip">' + esc(fchipLabel(k, v))
          + '<button class="p10-fchip__x" type="button" data-rm="' + esc(k + ':' + v) + '" aria-label="この条件を外す">×</button></span>');
      });
    }
    if (kw) {
      html.push('<span class="p10-fchip">「' + esc(kw) + '」'
        + '<button class="p10-fchip__x" type="button" data-rm="kw" aria-label="キーワードを外す">×</button></span>');
    }
    if (html.length >= 2) html.push('<button class="p10-fclear" type="button" data-rm="all">すべてクリア</button>');
    box.innerHTML = html.join('');
    box.hidden = !html.length;
    box.querySelectorAll('[data-rm]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var rm = btn.dataset.rm;
        if (rm === 'all') { clearAll(); showView('disc'); return; }
        if (rm === 'preset') { setPreset(null); }
        else if (rm === 'kw') { elKeyword.value = ''; }
        else { document.querySelectorAll('.p10-chip[data-f="' + rm + '"]').forEach(function (c) { c.classList.remove('is-on'); }); }
        runFilter();
      });
    });
  }

  function renderResultGrid(list) {
    var grid = document.getElementById('p103ResultGrid');
    grid.innerHTML = list.slice(0, shownCount).map(buildGalleryCard).join('');
    var moreBtn = document.getElementById('p103MoreBtn');
    moreBtn.parentElement.style.display = list.length > shownCount ? '' : 'none';
    renderResultGrid._last = list;
  }

  function runFilter() {
    var filters = activeChipFilters();
    var kw = elKeyword.value.trim();
    var hasAny = activePreset || kw || Object.keys(filters).length;
    if (!hasAny) { showView('disc'); syncRail(); return; }

    var list = GALLERIES.filter(function (x) { return matches(x, filters, kw); });
    syncRail();

    if (!list.length) {
      document.getElementById('p103ZeroTitle').textContent = kw
        ? '「' + kw + '」に一致するギャラリーが見つかりませんでした'
        : '条件に合うギャラリーが見つかりませんでした';
      renderZeroSugg();
      showView('zero');
      return;
    }

    var p = activePreset ? PRESETS[activePreset] : null;
    document.getElementById('p103CtxEyebrow').textContent = p ? 'Feature' : 'Search Results';
    document.getElementById('p103CtxTitle').textContent = p ? p.label : (kw ? '「' + kw + '」の検索結果' : '検索結果');
    var descEl = document.getElementById('p103CtxDesc');
    descEl.textContent = p ? p.desc : '';
    descEl.hidden = !p;
    renderFchips(filters, kw);
    document.getElementById('p103Count').innerHTML = '<strong>' + list.length + '</strong>件';
    shownCount = PAGE_SIZE;
    renderResultGrid(sortResults(list));
    showView('results');
  }

  function setPreset(key) {
    activePreset = key;
    syncRail();
  }
  function syncRail() {
    document.querySelectorAll('.p10-preset[data-key]').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.key === activePreset);
    });
  }
  function applyPreset(key) {
    clearAll();
    activePreset = key;
    runFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearAll() {
    activePreset = null;
    elKeyword.value = '';
    document.querySelectorAll('.p10-chip.is-on').forEach(function (c) { c.classList.remove('is-on'); });
    syncRail();
  }

  (function () {
    var rail = document.getElementById('p103PresetRail');
    var html = '';
    for (var key in PRESETS) {
      if (!PRESETS[key].rail) continue;
      html += '<button class="p10-preset" type="button" data-key="' + key + '">' + presetInner(key) + '</button>';
    }
    rail.innerHTML = html;
    rail.querySelectorAll('.p10-preset').forEach(function (b) {
      b.addEventListener('click', function () {
        if (activePreset === b.dataset.key) { clearAll(); showView('disc'); }
        else applyPreset(b.dataset.key);
      });
    });
    var arrL = document.getElementById('p103PresetArrL');
    var arrR = document.getElementById('p103PresetArrR');
    function syncArr() {
      var max = rail.scrollWidth - rail.clientWidth;
      arrL.classList.toggle('is-hidden', rail.scrollLeft <= 4);
      arrR.classList.toggle('is-hidden', rail.scrollLeft >= max - 4);
    }
    arrL.addEventListener('click', function () { rail.scrollBy({ left: -220, behavior: 'smooth' }); });
    arrR.addEventListener('click', function () { rail.scrollBy({ left: 220, behavior: 'smooth' }); });
    rail.addEventListener('scroll', syncArr);
    window.addEventListener('resize', syncArr);
    syncArr();
  })();

  (function () {
    var live = GALLERIES.filter(PRESETS['exh-live'].f).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p103LiveGrid').innerHTML = live.slice(0, 4).map(buildGalleryCard).join('');

    var upcoming = GALLERIES.filter(PRESETS['upcoming-all'].f).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p103UpcomingGrid').innerHTML = upcoming.slice(0, 4).map(buildGalleryCard).join('');

    var news = GALLERIES.filter(function (x) { return x.isNew; }).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p103NewGrid').innerHTML = news.slice(0, 4).map(buildGalleryCard).join('');

    var popular = GALLERIES.slice().sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p103PopularGrid').innerHTML = popular.slice(0, 4).map(buildGalleryCard).join('');

    var picks = GALLERIES.slice().sort(function (a, b) { return b.watch - a.watch; });
    document.getElementById('p103PicksGrid').innerHTML = picks.slice(0, 4).map(buildGalleryCard).join('');
  })();

  document.querySelectorAll('[data-preset]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      applyPreset(a.dataset.preset);
    });
  });

  function renderZeroSugg() {
    var sugg = document.getElementById('p103ZeroSugg');
    sugg.innerHTML = ['exh-live', 'liaison-plus', 'new-arrival', 'popular', 'tokyo-galleries'].map(function (key) {
      return '<button class="p10-preset" type="button" data-zero-preset="' + key + '">' + presetInner(key) + '</button>';
    }).join('');
    sugg.querySelectorAll('[data-zero-preset]').forEach(function (b) {
      b.addEventListener('click', function () { applyPreset(b.dataset.zeroPreset); });
    });
    var popular = GALLERIES.slice().sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p103ZeroGrid').innerHTML = popular.slice(0, 4).map(buildGalleryCard).join('');
  }

  document.getElementById('p103SearchBtn').addEventListener('click', runFilter);
  elKeyword.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') { ev.preventDefault(); runFilter(); }
  });

  document.querySelectorAll('.p10-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      var on = !c.classList.contains('is-on');
      if (c.dataset.f) {
        document.querySelectorAll('[data-f="' + c.dataset.f + '"]').forEach(function (s) { s.classList.toggle('is-on', on); });
        if (!c.closest('#p103Adv')) runFilter();
      } else {
        c.classList.toggle('is-on', on);
      }
    });
  });

  var advToggle = document.getElementById('p103AdvToggle');
  var adv = document.getElementById('p103Adv');
  advToggle.addEventListener('click', function () {
    var open = !adv.classList.contains('is-open');
    adv.classList.toggle('is-open', open);
    advToggle.classList.toggle('is-open', open);
    advToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('p103AdvClear').addEventListener('click', function () {
    document.querySelectorAll('.p10-chip.is-on').forEach(function (c) { c.classList.remove('is-on'); });
  });
  document.getElementById('p103AdvSearch').addEventListener('click', function () {
    adv.classList.remove('is-open');
    advToggle.classList.remove('is-open');
    advToggle.setAttribute('aria-expanded', 'false');
    runFilter();
  });

  if (elSort) elSort.addEventListener('change', function () {
    if (!elResults.hidden && renderResultGrid._last) {
      shownCount = PAGE_SIZE;
      renderResultGrid(sortResults(renderResultGrid._last));
    }
  });
  document.getElementById('p103MoreBtn').addEventListener('click', function () {
    if (!renderResultGrid._last) return;
    shownCount = renderResultGrid._last.length;
    renderResultGrid(renderResultGrid._last);
  });

  /* ── デモバー：表示状態切替（ログイン限定ページのためロール切替なし） ── */
  window.setP103View = function (view, btn) {
    document.querySelectorAll('[data-p103-view]').forEach(function (b) { b.classList.remove('on'); });
    if (btn && btn.hasAttribute('data-p103-view')) btn.classList.add('on');
    clearAll();
    if (view === 'disc') { showView('disc'); }
    else if (view === 'preset') { applyPreset('tokyo-galleries'); }
    else if (view === 'result') {
      ['st:live', 'area:東京'].forEach(function (f) {
        document.querySelectorAll('.p10-chip[data-f="' + f + '"]').forEach(function (c) { c.classList.add('is-on'); });
      });
      runFilter();
    }
    else if (view === 'zero') { elKeyword.value = '深夜の青騎士'; runFilter(); }
  };

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P1  個展なびトップ
   P1＝時間軸・パーソナルフィード＋入口（プレビュー棚＋P10送客）。
   棚はP10（もうすぐ終了/近く/Liaison/特集/おすすめ/新着掲載）と重複させない。
════════════════════════════════════════════════════ */
KTN.pages['p1'] = function () {
  document.body.classList.add('p1-page');
  document.body.style.setProperty('--page-accent', '#005da7');
  document.body.style.setProperty('--page-accent-bg', 'rgba(0,93,167,.08)');

  /* ── デモデータ（p10 と同一の世界観。watched=ウォッチ中の投稿者 / mine=興味あり！済） ── */
  var EX = [
    { id: 1,  title: '静寂のかたち — 田中透 油彩展', venue: '白日ギャラリー', area: '東京', s: '06.28', e: '07.13', hours: '11:00–19:00', status: 'live',   remain: '残り5日',  rd: 5,  tags: ['絵画', '現代美術'], liaison: 'li',      pop: 88, int: 214, ci: 56, dist: '1.2km', isNew: 0, watched: 1, mine: 1, imgH: 200, bg: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', thumbs: ['linear-gradient(135deg,#7a8ba0,#4e5a6a)', 'linear-gradient(135deg,#8a7a60,#5e4a3a)', 'linear-gradient(135deg,#6a8a7a,#3e5a4a)'] },
    { id: 2,  title: '墨聲 — 現代書道の地平', venue: '東京書芸館', area: '東京', s: '06.20', e: '07.10', hours: '10:00–18:00', status: 'ending', remain: '残り2日',  rd: 2,  tags: ['書道'], liaison: 'li-plus', pop: 92, int: 342, ci: 128, dist: '2.4km', isNew: 0, mine: 1, imgH: 165, bg: 'linear-gradient(135deg,#2e2a28,#5a5450)', thumbs: ['linear-gradient(135deg,#4a4440,#2a2624)', 'linear-gradient(135deg,#6a6058,#3a342e)', 'linear-gradient(135deg,#8a8078,#5a544e)'] },
    { id: 3,  title: '光を編む — 篠原恵 写真展', venue: 'ギャラリー日向', area: '東京', s: '07.01', e: '07.17', hours: '12:00–19:00', status: 'live',   remain: '残り9日',  rd: 9,  tags: ['写真'], liaison: '',        pop: 65, int: 98,  ci: 24, dist: '3.1km', isNew: 1, watched: 1, imgH: 250, bg: 'linear-gradient(135deg,#c0a880,#8a6e4a)' },
    { id: 4,  title: '彫りと摺り — 木版画の現在', venue: '京都版画舎', area: '京都', s: '06.25', e: '07.20', hours: '10:00–17:00', status: 'live',   remain: '残り12日', rd: 12, tags: ['版画'], liaison: '',        pop: 74, int: 156, ci: 42, dist: null,    isNew: 0, closedToday: 1, imgH: 190, bg: 'linear-gradient(135deg,#7a6a8a,#4a3e5a)' },
    { id: 5,  title: 'マチエールの実験', venue: 'gallery TRACE', area: '東京', s: '06.30', e: '07.16', hours: '11:00–20:00', status: 'live',   remain: '残り8日',  rd: 8,  tags: ['絵画', '現代美術'], liaison: 'li',      pop: 81, int: 188, ci: 61, dist: '0.8km', isNew: 0, imgH: 215, bg: 'linear-gradient(135deg,#a05a4a,#6a3428)', thumbs: ['linear-gradient(135deg,#b07a6a,#7a4838)', 'linear-gradient(135deg,#c09a8a,#8a5e4e)', 'linear-gradient(135deg,#906a5a,#5a3a2e)'] },
    { id: 6,  title: '海と孤影 — 山根拓 写真展', venue: 'フォトスペース博多', area: '福岡', s: '07.18', e: '08.02', hours: '11:00–18:00', status: 'soon',   remain: '10日後に開催', rd: 99, tags: ['写真'], liaison: '',        pop: 62, int: 74,  ci: 0,  dist: null,    isNew: 1, watched: 1, imgH: 235, bg: 'linear-gradient(135deg,#3a5a7a,#1e3448)' },
    { id: 7,  title: '筆の呼吸 — 二人の書', venue: '大阪墨美堂', area: '大阪', s: '07.02', e: '07.14', hours: '10:00–18:00', status: 'live',   remain: '残り6日',  rd: 6,  tags: ['書道'], liaison: '',        pop: 55, int: 62,  ci: 18, dist: null,    isNew: 0, imgH: 180, bg: 'linear-gradient(135deg,#4a4a4a,#1e1e1e)' },
    { id: 8,  title: '都市の水彩 — 岡島みのり', venue: '横浜アートポート', area: '神奈川', s: '06.22', e: '07.11', hours: '11:00–19:00', status: 'ending', remain: '残り3日',  rd: 3,  tags: ['絵画'], liaison: '',        pop: 58, int: 87,  ci: 31, dist: '5.6km', isNew: 0, mine: 1, imgH: 210, bg: 'linear-gradient(135deg,#6a9ab0,#3a5e74)' },
    { id: 9,  title: '陶と土のリズム', venue: '瀬戸クラフト館', area: '愛知', s: '06.27', e: '07.23', hours: '10:00–17:00', status: 'live',   remain: '残り15日', rd: 15, tags: ['陶芸', 'クラフト'], liaison: '',        pop: 49, int: 53,  ci: 12, dist: null,    isNew: 0, imgH: 195, bg: 'linear-gradient(135deg,#9a8a6a,#5e5238)' },
    { id: 10, title: '銅版のミクロコスモス — 早瀬涼', venue: 'ギャラリー刻', area: '東京', s: '07.04', e: '07.18', hours: '12:00–19:00', status: 'live',   remain: '残り10日', rd: 10, tags: ['版画'], liaison: 'li',      pop: 67, int: 112, ci: 27, dist: '4.2km', isNew: 1, imgH: 225, bg: 'linear-gradient(135deg,#5a7a6a,#2e4638)', thumbs: ['linear-gradient(135deg,#7a9a8a,#4a6a58)', 'linear-gradient(135deg,#6a8a7a,#3a5a48)', 'linear-gradient(135deg,#8aaa9a,#5a7a68)'] },
    { id: 11, title: 'セルフポートレイトの練習', venue: 'studio hue', area: '東京', s: '07.11', e: '07.26', hours: '13:00–20:00', status: 'soon',   remain: '3日後に開催', rd: 98, tags: ['写真', '現代美術'], liaison: 'li-plus', pop: 79, int: 143, ci: 0,  dist: null,    isNew: 1, watched: 1, imgH: 170, bg: 'linear-gradient(135deg,#b08aa0,#7a4e68)', thumbs: ['linear-gradient(135deg,#c0a0b0,#8a5e78)', 'linear-gradient(135deg,#a07a90,#6a4258)', 'linear-gradient(135deg,#d0b0c0,#9a6e88)'] },
    { id: 12, title: 'ガラスのなかの庭 — 三好文乃', venue: '天神ガラス工房', area: '福岡', s: '06.29', e: '07.19', hours: '11:00–18:00', status: 'live',   remain: '残り11日', rd: 11, tags: ['クラフト'], liaison: '',        pop: 66, int: 91,  ci: 22, dist: null,    isNew: 0, imgH: 205, bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)' },
    { id: 13, title: '抽象の温度', venue: 'アートスペース青', area: '東京', s: '06.18', e: '07.10', hours: '11:00–19:00', status: 'ending', remain: '残り2日',  rd: 2,  tags: ['現代美術'], liaison: '',        pop: 90, int: 276, ci: 94, dist: '2.9km', isNew: 0, mine: 1, imgH: 240, bg: 'linear-gradient(135deg,#c07040,#7a3e18)' },
    { id: 14, title: '路地と光 — 街歩き写真部', venue: 'コートギャラリー谷中', area: '東京', s: '07.03', e: '07.15', hours: '11:00–18:00', status: 'live',   remain: '残り7日',  rd: 7,  tags: ['写真'], liaison: '',        pop: 71, int: 104, ci: 38, dist: '1.8km', isNew: 1, imgH: 220, bg: 'linear-gradient(135deg,#8a8a70,#4e4e38)' },
  ];
  function exById(id) { for (var i = 0; i < EX.length; i++) if (EX[i].id === id) return EX[i]; return null; }

  /* ── A. ヒーロー（ピックアップ・自動ローテーション） ── */
  var HERO = [
    { id: 1,  artist: '田中透',   en: 'Shapes of Silence — Toru Tanaka',  lead: '日常の光と影を静謐な色面に還元する田中透、3年ぶりの個展。近作の油彩24点を、LIAISONオンライン展示とあわせて公開しています。' },
    { id: 2,  artist: 'グループ展', en: 'Voices of Ink — Contemporary Sho', lead: '筆と墨のいまを問う気鋭6名によるグループ展。会期はまもなく終了、LIAISON+でのオンライン購入は販売期間中も受け付けます。' },
    { id: 5,  artist: 'グループ展', en: 'Experiments in Matiere',           lead: '絵肌＝マチエールの物質感を主題に、支持体と画材の実験を重ねる4名の共同展示。ギャラリーの壁一面を使ったインスタレーションも。' },
    { id: 13, artist: 'グループ展', en: 'Temperature of Abstraction',       lead: '抽象絵画の「温度」をテーマにした注目のグループ展。興味あり！とチェックインがいま最も集まっています。会期は残りわずか。' },
    { id: 11, artist: 'studio hue', en: 'Practicing Self-Portraits',        lead: 'セルフポートレイトという営みを見つめ直す写真と映像の個展。開催前からLIAISON+のオンライン展示・販売が話題です。' },
  ];
  var heroIdx = 0, heroTimer = null;

  function renderHero(i) {
    heroIdx = i;
    var h = HERO[i], x = exById(h.id);
    document.getElementById('p1HeroPoster').style.backgroundImage = x.bg;
    var sbHtml = '';
    if (x.status === 'live')        sbHtml = '<span class="sb sb-live"><span class="pulse"></span>開催中</span>';
    else if (x.status === 'soon')   sbHtml = '<span class="sb sb-soon">もうすぐ開催</span>';
    else if (x.status === 'ending') sbHtml = '<span class="sb sb-ending"><span class="ending-dot"></span>もうすぐ終了</span>';
    var liHtml = x.liaison
      ? '<span class="lb-dot ' + (x.liaison === 'li-plus' ? 'li-plus' : 'li') + '"><span class="lb-dot-inner"></span>' + (x.liaison === 'li-plus' ? 'LIAISON+' : 'LIAISON') + '</span>'
      : '';
    document.getElementById('p1HeroBadges').innerHTML = '<span class="cb cb-content cb-exhibition">exhibition</span>' + sbHtml + liHtml;
    document.getElementById('p1HeroTitle').textContent = x.title;
    document.getElementById('p1HeroEn').textContent = h.en;
    var pinSvg = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 6.5c0 3.2-5 7.5-5 7.5S3 9.7 3 6.5a5 5 0 0 1 10 0z"/><circle cx="8" cy="6.5" r="1.8"/></svg>';
    var calSvg = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="3.5" width="11" height="10" rx="1"/><path d="M2.5 6.8h11M5.5 2v2.5M10.5 2v2.5"/></svg>';
    document.getElementById('p1HeroMeta').innerHTML =
      '<span class="p1-hero__meta-item p1-hero__meta-item--date">' + calSvg + '<span class="p1-hero__dyear">2026.</span>' + x.s + '<span class="p1-hero__ddash">—</span><span class="p1-hero__dyear">2026.</span>' + x.e + '</span>'
      + '<span class="p1-hero__meta-item p1-hero__meta-item--venue">' + pinSvg + x.area + '｜' + x.venue + '</span>';
    document.getElementById('p1HeroLead').textContent = h.lead;
    var dots = document.getElementById('p1HeroDots');
    dots.querySelectorAll('.p1-hero__dot').forEach(function (d, j) { d.classList.toggle('is-on', j === i); });
  }
  function startHeroTimer() {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(function () { renderHero((heroIdx + 1) % HERO.length); }, 6000);
  }
  (function () {
    var dots = document.getElementById('p1HeroDots');
    dots.innerHTML = HERO.map(function (_, j) {
      return '<button class="p1-hero__dot" type="button" role="tab" aria-label="ピックアップ ' + (j + 1) + '"></button>';
    }).join('');
    dots.querySelectorAll('.p1-hero__dot').forEach(function (d, j) {
      d.addEventListener('click', function () { renderHero(j); startHeroTimer(); });
    });
    renderHero(0);
    startHeroTimer();
  })();

  /* ── B. 新着ティッカー（時間軸：新着掲載・まもなく終了・LIAISON） ── */
  (function () {
    var items = [];
    EX.forEach(function (x) {
      if (x.isNew) items.push({ tag: 'New', cls: '', text: '「' + x.title + '」を掲載しました（' + x.area + '・' + x.venue + '）' });
    });
    EX.forEach(function (x) {
      if (x.status === 'ending') items.push({ tag: 'Ending', cls: ' p1-ticker__tag--ending', text: '「' + x.title + '」は' + x.remain + 'で会期終了' });
    });
    /* LIAISON+ を時間軸フックに接続（もうすぐ開始／申込締切間近／受付中）＝オンライン販売の緊急性で回遊を促す */
    EX.forEach(function (x) {
      if (x.liaison !== 'li-plus') return;
      if (x.status === 'soon')        items.push({ tag: 'Liaison+', cls: ' p1-ticker__tag--liaison', text: '「' + x.title + '」まもなくオンライン展示・販売開始（2026.' + x.s + '〜）' });
      else if (x.status === 'ending') items.push({ tag: 'Liaison+', cls: ' p1-ticker__tag--ending', text: '「' + x.title + '」オンライン販売の申込締切間近・' + x.remain });
      else                            items.push({ tag: 'Liaison+', cls: ' p1-ticker__tag--liaison', text: '「' + x.title + '」オンライン販売受付中' });
    });
    var track = document.getElementById('p1TickerTrack');
    track.innerHTML = items.map(function (t) {
      return '<a class="p1-ticker__item" href="kotennavi-p2.html"><span class="p1-ticker__tag' + t.cls + '">' + t.tag + '</span><span class="p1-ticker__text">' + t.text + '</span></a>';
    }).join('');
    /* 1件ずつ静止表示 → クロスフェードで切替（横スクロール廃止）。
       hover で自動送りを止めて読了・クリックできる */
    var els = track.querySelectorAll('.p1-ticker__item');
    if (els.length) {
      var idx = 0;
      els[0].classList.add('is-on');
      if (els.length > 1) {
        var timer = null;
        function advance() {
          els[idx].classList.remove('is-on');
          idx = (idx + 1) % els.length;
          els[idx].classList.add('is-on');
        }
        function start() { if (!timer) timer = setInterval(advance, 4500); }
        function stop() { clearInterval(timer); timer = null; }
        start();
        var vp = track.parentNode;
        vp.addEventListener('mouseenter', stop);
        vp.addEventListener('mouseleave', start);
      }
    }
  })();

  /* ── C2. 近くの展覧会（ゲスト・位置情報フック） ──
     ログイン前でも現在地から回遊を始められる導線。許可＝距離順、不許可/不可＝人気順にフォールバック。
     プロトタイプでは実 geolocation の許可ダイアログのみ使い、距離は EX の静的 dist で近似する
     （本番は取得座標と会場座標から距離を算出）。 */
  (function () {
    var btn = document.getElementById('p1NearbyBtn');
    if (!btn) return;
    var promptEl = document.getElementById('p1NearbyPrompt');
    var resultEl = document.getElementById('p1NearbyResult');
    var statusEl = document.getElementById('p1NearbyStatus');
    var grid = document.getElementById('p1NearbyGrid');
    var pinSvg = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 6.5c0 3.2-5 7.5-5 7.5S3 9.7 3 6.5a5 5 0 0 1 10 0z"/><circle cx="8" cy="6.5" r="1.8"/></svg>';
    function toSide(x) { return { pref: x.area, title: x.title, venue: x.venue, s: x.s, e: x.e, bg: x.bg, dist: x.dist, liaison: x.liaison }; }
    function render(list, statusHtml) {
      grid.innerHTML = list.slice(0, 3).map(toSide).map(buildSideEcCard).join('');
      statusEl.innerHTML = statusHtml;
      promptEl.hidden = true;
      resultEl.hidden = false;
    }
    function showNearby() {
      var list = EX.filter(function (x) { return x.dist && x.status !== 'soon'; })
        .sort(function (a, b) { return parseFloat(a.dist) - parseFloat(b.dist); });
      render(list, pinSvg + '現在地の近くで開催中の展覧会');
    }
    function showFallback(msg) {
      var list = EX.filter(function (x) { return x.status !== 'soon'; })
        .sort(function (a, b) { return b.pop - a.pop; });
      render(list, msg);
    }
    btn.addEventListener('click', function () {
      btn.disabled = true;
      btn.textContent = '現在地を取得中…';
      if (!navigator.geolocation) { showFallback('位置情報が使えないため、人気の展覧会を表示しています。'); return; }
      navigator.geolocation.getCurrentPosition(
        function () { showNearby(); },
        function () { showFallback('位置情報が取得できなかったため、人気の展覧会を表示しています。'); },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
      );
    });
  })();

  /* ── E. パーソナルフィード（ログインのみ） ── */
  (function () {
    var watch = EX.filter(function (x) { return x.watched; }).sort(function (a, b) { return (b.isNew - a.isNew) || (a.rd - b.rd); });
    document.getElementById('p1WatchGrid').innerHTML = watch.slice(0, 4).map(buildGridEcCard).join('');

    var remind = EX.filter(function (x) { return x.mine && x.rd <= 5; }).sort(function (a, b) { return a.rd - b.rd; });
    document.getElementById('p1RemindGrid').innerHTML = remind.slice(0, 3).map(function (x) {
      return buildSideEcCard({ pref: x.area, title: x.title, venue: x.venue, s: x.s, e: x.e, bg: x.bg, dist: x.dist, liaison: x.liaison });
    }).join('');
  })();

  /* ── F. 最新の展覧会（メインフィード・ジャンル絞り込み） ── */
  var feedGenre = '';
  var feedShown = 8;
  var FEED_PAGE = 8;
  var GENRE_MAP = { '絵画': 'アート', '油彩': 'アート', 'アクリル': 'アート', '現代美術': 'アート', '版画': 'アート', '書道': 'アート', '写真': '写真', '陶芸': 'クラフト', 'クラフト': 'クラフト', 'ガラス': 'クラフト' };
  function exGenre(x) {
    for (var i = 0; i < x.tags.length; i++) { if (GENRE_MAP[x.tags[i]]) return GENRE_MAP[x.tags[i]]; }
    return 'その他';
  }
  function feedList() {
    var list = EX.filter(function (x) { return !feedGenre || exGenre(x) === feedGenre; });
    return list.sort(function (a, b) { return (b.isNew - a.isNew) || (a.rd - b.rd); });
  }
  function renderFeed() {
    var list = feedList();
    document.getElementById('p1FeedGrid').innerHTML = list.slice(0, feedShown).map(buildGridEcCard).join('');
    document.getElementById('p1MoreWrap').style.display = list.length > feedShown ? '' : 'none';
  }
  document.querySelectorAll('.p1-genre').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.p1-genre').forEach(function (o) { o.classList.remove('is-on'); });
      b.classList.add('is-on');
      feedGenre = b.dataset.genre || '';
      feedShown = FEED_PAGE;
      renderFeed();
    });
  });
  document.getElementById('p1MoreBtn').addEventListener('click', function () {
    feedShown = feedList().length;
    renderFeed();
  });
  renderFeed();

  /* ── G. LIAISON帯サムネイル ── */
  (function () {
    var thumbs = [];
    EX.forEach(function (x) { if (x.thumbs) thumbs = thumbs.concat(x.thumbs); });
    document.getElementById('p1LiaisonThumbs').innerHTML = thumbs.slice(0, 4).map(function (t) {
      return '<div class="p1-liaison__thumb" style="background:' + t + '"></div>';
    }).join('');
  })();

  /* ── ロール反映（ゲスト＝サイト紹介／ログイン＝パーソナルフィード） ── */
  function applyRole() {
    var login = (window.curRole || 'guest') !== 'guest';
    document.getElementById('p1Nearby').hidden = login;
    document.getElementById('p1Intro').hidden = login;
    document.getElementById('p1Personal').hidden = !login;
  }
  applyRole();
  var prevRender = window.ktnRender;
  window.ktnRender = function () {
    if (typeof prevRender === 'function') prevRender();
    applyRole();
  };
};
