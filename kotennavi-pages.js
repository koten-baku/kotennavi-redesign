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

  /* ── ロール切替に追従（デモバー guest/login）＝本人チェックイン&レビューの表示制御 ── */
  var _prevRender = window.ktnRender;
  window.ktnRender = function () {
    if (typeof _prevRender === 'function') _prevRender();
    if (typeof window.syncP2Own === 'function') window.syncP2Own();
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

  /* クリエイター在廊予定（p2-11「クリエイター在廊予定」に対応）。
     期間（from〜to）＋曜日フィルタ（dow）＋メモ。単日は from===to。 */
  var DOW_LABEL = { all: '全日', weekend: '土・日', 'weekend-hol': '土日祝', weekday: '平日', mon: '月', tue: '火', wed: '水', thu: '木', fri: '金', sat: '土', sun: '日' };
  var ATTENDANCE = [
    { name: '田中 透', from: '2026-02-18', to: '2026-02-18', dow: 'all',         memo: '初日・終日在廊予定' },
    { name: '田中 透', from: '2026-02-19', to: '2026-03-04', dow: 'weekend-hol', memo: '午後在廊予定（14:00頃〜）' },
    { name: '田中 透', from: '2026-03-05', to: '2026-03-05', dow: 'all',         memo: '最終日・終日在廊予定' }
  ];
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

  /* ── ④ 在廊予定 シンプルリスト（p2-11 入力＝期間＋曜日フィルタ＋メモ に対応） ── */
  (function() {
    var list = document.getElementById('p2AttendanceGrid'); if (!list) return;
    function md(d) { return (d.getMonth()+1)+'/'+d.getDate(); }
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

  /* ── 作品データ ── */
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
    return '<a class="' + cardClass + '" href="./kotennavi-p6-1.html" data-creator="' + w.creator + '" data-status="' + dataStatus + '">' +
      '<div class="p25c__img">' +
        '<div class="p25c__img-bg" style="background:' + w.bg + '"></div>' +
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
};

/* ────────────────────────────────────────────────────
   P2-5-1  LIAISON+ 作品一覧
──────────────────────────────────────────────────── */
KTN.pages['p2-5-1'] = function () {

  /* ── 作品データ（価格付き・pending2件追加） ── */
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
    return '<a class="' + cardClass + '" href="#" data-creator="' + w.creator + '" data-status="' + dataStatus + '">' +
      '<div class="p25c__img">' +
        '<div class="p25c__img-bg" style="background:' + w.bg + '"></div>' +
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

  function applyOwner251() {
    var r = window.ktnState && window.ktnState.role;
    var isOwner = (r === 'user+creator' || r === 'user+gallery');
    document.querySelectorAll('.p25c__console-wrap').forEach(function (el) {
      el.style.display = isOwner ? 'flex' : 'none';
    });
  }
  applyOwner251();
  window.ktnRender = function () { applyOwner251(); };

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
──────────────────────────────────────────────────── */
var _p6Works = [
  { id:1, title:'オノマトペの庭', titleEn:'Onomatopoeia Garden',
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
      { lbl:'作品のケアについて', body:'油彩作品のため、直射日光・高温多湿の環境を避けて保管ください。額装ガラスは紫外線カットタイプを推奨します。表面の汚れは乾いた柔らかい布で軽く拭き取るのみとし、洗剤・溶剤の使用は避けてください。' },
      { lbl:'展示・設置について', body:'フローティングフレーム仕様のため、壁から数センチ浮いた形で設置されます。取付金具・ワイヤー付属。壁の耐荷重をご確認のうえ設置をお願いします。設置方法についてご不明な点はお気軽にお問い合わせください。' },
    ],
  },
  { id:2, title:'ふわふわ', titleEn:'Fuwafuwa',
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
      { lbl:'作品のケアについて', body:'油彩・キャンバス作品です。直射日光と湿気を避け、温度変化の少ない環境での保管をお願いします。' },
    ],
  },
  { id:3, title:'ドキドキ #3', titleEn:'Dokidoki #3',
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
  { id:4, title:'ざわざわ（夜）', titleEn:'Zawazawa (Night)',
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
  2:[], 3:[], 4:[],
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
    document.title = '《' + w.title + '》' + w.creator + ' | 個展なび';
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
    var blocks = [];
    if (w.note) {
      blocks.push('<div class="wd-note"><div class="wd-note-lbl">制作ノート</div>' +
        '<div class="wd-note-body">' + w.note + '</div>' +
        '<div class="wd-note-sig">— ' + w.creator + ' / ' + w.creatorEn + ', ' + w.year + '</div></div>');
    }
    (w.extras || []).forEach(function(ex) {
      blocks.push('<div class="wd-note"><div class="wd-note-lbl">' + ex.lbl + '</div>' +
        '<div class="wd-note-body" style="font-style:normal;font-size:.74rem">' + ex.body + '</div></div>');
    });
    el = document.getElementById('descRightCol');
    if (el) el.innerHTML = blocks.join('');
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
    if (el) el.textContent = '《' + WORK.title + '》購入申込';
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

  function renderHeaderActs() {
    var el = document.getElementById('ktnActs');
    if (!el) return;
    ddSeq = 0;
    var shareH = '<button class="ktn-hib" onclick="shareWork()" aria-label="シェア">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' +
      '<span class="ktn-hib__lbl">シェア</span></button>';
    var html = shareH;
    if (isOwner()) {
      html += sep() + owbtn('edit', '編集') + dd('オーナーメニュー',
        ddi('edit', '作品を編集する') + ddSep() +
        ddi('chart', 'インサイト') + ddSep() +
        ddi('trash', '削除', true));
    } else if (isAdmin()) {
      html += sep() + owbtn('edit', '編集') + dd('オーナーメニュー',
        ddi('edit', '作品を編集する') + ddSep() +
        ddi('chart', 'インサイト') + ddSep() +
        ddi('trash', '削除', true)) +
        dd('管理者',
          ddi('info', 'コンテンツ詳細情報') + ddSep() +
          ddi('trash', '削除', true));
    }
    el.innerHTML = html;
  }

  function setR(role, btn) {
    KTN.role = role;
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
      if (el) el.textContent = '\u300a' + w.title + '\u300b';
      el = document.getElementById('p6TitleEn');
      if (el) el.textContent = w.titleEn;
      /* 仕様 dl（2カラム用） */
      var edition = w.edition
        ? (w.qty + '\u70b9 / ' + w.edition)
        : '1\u70b9\uff08\u30a8\u30c7\u30a3\u30b7\u30e7\u30f3\u306a\u3057\uff09';
      var specs = [
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
      if (el) el.innerHTML = specs
        .filter(function(r) { return r.always || r.val; })
        .map(function(r) { return '<dt>' + r.lbl + '</dt><dd>' + r.val + '</dd>'; })
        .join('');
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
      if (el) el.textContent = '\u300a' + w.title + '\u300b';
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
      '<div class="p2-12-work-card__handle" title="ドラッグで並び替え">'+HANDLE_SVG+'</div>'+
      '<div class="p2-12-work-card__thumb" style="background:'+w.bg+'"></div>'+
      '<div class="p2-12-work-card__body">'+
        '<div class="p2-12-work-card__title">'+w.title+'</div>'+
        '<div class="p2-12-work-card__author"><span class="p2-12-work-card__author-label">作者</span>'+(w.author||'—')+'</div>'+
        '<div class="p2-12-work-card__meta">'+meta+'</div>'+
      '</div>'+
      '<div class="p2-12-work-card__controls">'+
        '<select class="p2-12-status-sel" aria-label="販売状態">'+statusOpts(w.status)+'</select>'+
        '<button class="p2-12-remove-btn" type="button" data-id="'+w.id+'" aria-label="取り外す">'+
          '<svg class="p2-12-remove-btn__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13" aria-hidden="true"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>'+
          '<span class="p2-12-remove-btn__text">取り外す</span>'+
        '</button>'+
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
    if (cc) cc.classList.remove('is-added');
    updateCount();
  }

  /* ── 候補グリッド描画（出展クリエイター以外の作品は候補に出さない） ── */
  function renderCandGrid() {
    candGrid.innerHTML = '';
    ALL.forEach(function(w) {
      if (!isAllowedAuthor(w)) return;
      var added = displayedIds.indexOf(w.id) !== -1;
      var div = document.createElement('div');
      div.className = 'p2-12-candidate-card'+(added?' is-added':'');
      div.dataset.id = w.id;
      div.innerHTML =
        '<div class="p2-12-candidate-card__thumb" style="background:'+w.bg+'"></div>'+
        '<div class="p2-12-candidate-card__info">'+
          '<div class="p2-12-candidate-card__title">'+w.title+'</div>'+
          '<div class="p2-12-candidate-card__author">'+(w.author||'')+'</div>'+
          '<div class="p2-12-candidate-card__year">'+(w.year||'')+'</div>'+
          '<div class="p2-12-candidate-card__added">追加済み</div>'+
        '</div>';
      div.addEventListener('click', function() {
        if (div.classList.contains('is-added')) return;
        displayedIds.push(w.id);
        listEl.appendChild(makeCard(w));
        div.classList.add('is-added');
        updateCount();
      });
      candGrid.appendChild(div);
    });
  }

  /* ── パネル開閉 ── */
  function openPanel() {
    addPanel.hidden = false;
    addBtn.classList.add('is-open');
    renderAddTexts();
    renderCandGrid();
  }
  function closePanel() {
    addPanel.hidden = true;
    addBtn.classList.remove('is-open');
  }

  /* ── 初期描画 ── */
  INITIAL.forEach(function(w){ listEl.appendChild(makeCard(w)); });
  updateCount();

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
      },
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

  /* ── 販売期間設定 ── */
  var radios      = document.querySelectorAll('input[name="p2121Period"]');
  var customPicker = document.getElementById('p2121CustomPicker');
  var dateStart   = document.getElementById('p2121DateStart');
  var dateEnd     = document.getElementById('p2121DateEnd');
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
    if (s && e && s <= e) {
      customPreview.textContent = fmtRange(s, e);
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

  /* ── 以下：作品リスト（p2-12 と同一ロジック） ── */
  var STATUS = [
    { value:'inquiry',  label:'要問合せ' },
    { value:'sale',     label:'販売中' },
    { value:'negot',    label:'商談中' },
    { value:'sold',     label:'売約済' },
    { value:'nonsale',  label:'非売品' },
  ];

  /* 販売期間開始済みフラグ（デモ：開始済み） */
  var SALE_ACTIVE = true;

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
    { id:'w2', title:'《ふわふわ》',       author:'田中 透', year:'2025年', medium:'キャンバスに油彩', size:'72.7×60.6cm',  bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', status:'sale',    price:220000 },
    { id:'w3', title:'《ざわざわ（夜）》',  author:'田中 透', year:'2025年', medium:'アクリル・パネル', size:'53.0×45.5cm',  bg:'linear-gradient(155deg,#3d3530,#1f1a18)', status:'nonsale' },
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
    li.className = 'p2-12-work-card';
    li.dataset.id = w.id;
    var meta = [w.year, w.medium, w.size].filter(Boolean).join('　');

    var isLocked = w.locked || w.soldOnline;
    var isPriceLocked = isLocked || !!w.priceLocked;

    /* 価格エリア */
    var priceHtml;
    if (isPriceLocked) {
      priceHtml =
        '<div class="p2-121-price-wrap is-locked">'+
          '<span class="p2-121-price-wrap__sign">¥</span>'+
          '<input class="p2-121-price-wrap__input" type="number" value="'+(w.price||'')+'" disabled>'+
          '<span class="p2-121-price-wrap__tax">税込</span>'+
        '</div>';
    } else {
      priceHtml =
        '<div class="p2-121-price-wrap">'+
          '<span class="p2-121-price-wrap__sign">¥</span>'+
          '<input class="p2-121-price-wrap__input" type="number" min="0" step="1000"'+
            ' placeholder="価格" aria-label="価格（税込）" value="'+(w.price||'')+'">'+
          '<span class="p2-121-price-wrap__tax">税込</span>'+
        '</div>';
    }

    /* 販売状態エリア */
    var statusHtml;
    if (w.locked) {
      /* 販売中（申込者あり）：ロック＋コンソールリンク */
      statusHtml =
        '<div class="p2-121-lock-info">'+
          '<span class="p2-121-lock-badge">販売中</span>'+
          '<span class="p2-121-lock-note"><strong class="p2-121-lock-note__num">'+w.applyCount+'</strong>件申込中</span>'+
          '<a class="p2-121-console-link" href="kotennavi-p3-15.html">コンソールで操作 →</a>'+
        '</div>';
    } else if (w.soldOnline) {
      /* 売約済（オンライン取引完了）：ロック */
      statusHtml =
        '<div class="p2-121-lock-info">'+
          '<span class="p2-121-lock-badge p2-121-lock-badge--sold">売約済</span>'+
          '<span class="p2-121-lock-note">取引完了</span>'+
        '</div>';
    } else {
      statusHtml = '<select class="p2-12-status-sel" aria-label="販売状態">'+statusOpts(w.status)+'</select>';
    }

    li.innerHTML =
      '<div class="p2-12-work-card__handle" title="ドラッグで並び替え">'+HANDLE_SVG+'</div>'+
      '<div class="p2-12-work-card__thumb" style="background:'+w.bg+'"></div>'+
      '<div class="p2-12-work-card__body">'+
        '<div class="p2-12-work-card__title">'+w.title+'</div>'+
        '<div class="p2-12-work-card__author"><span class="p2-12-work-card__author-label">作者</span>'+(w.author||'—')+'</div>'+
        '<div class="p2-12-work-card__meta">'+meta+'</div>'+
      '</div>'+
      '<div class="p2-12-work-card__controls">'+
        priceHtml+
        statusHtml+
        (!isLocked ?
          '<button class="p2-12-remove-btn" type="button" data-id="'+w.id+'" aria-label="取り外す">'+
            '<svg class="p2-12-remove-btn__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13" aria-hidden="true"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>'+
            '<span class="p2-12-remove-btn__text">取り外す</span>'+
          '</button>'
        : '') +
      '</div>';

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
    if (cc) cc.classList.remove('is-added');
    updateCount();
  }

  function renderCandGrid() {
    candGrid.innerHTML = '';
    ALL.forEach(function(w) {
      if (!isAllowedAuthor(w)) return;
      var added = displayedIds.indexOf(w.id) !== -1;
      var div = document.createElement('div');
      div.className = 'p2-12-candidate-card'+(added?' is-added':'');
      div.dataset.id = w.id;
      div.innerHTML =
        '<div class="p2-12-candidate-card__thumb" style="background:'+w.bg+'"></div>'+
        '<div class="p2-12-candidate-card__info">'+
          '<div class="p2-12-candidate-card__title">'+w.title+'</div>'+
          '<div class="p2-12-candidate-card__author">'+(w.author||'')+'</div>'+
          '<div class="p2-12-candidate-card__year">'+(w.year||'')+'</div>'+
          '<div class="p2-12-candidate-card__added">追加済み</div>'+
        '</div>';
      div.addEventListener('click', function() {
        if (div.classList.contains('is-added')) return;
        displayedIds.push(w.id);
        listEl.appendChild(makeCard(w));
        div.classList.add('is-added');
        updateCount();
      });
      candGrid.appendChild(div);
    });
  }

  function openPanel() {
    addPanel.hidden = false;
    addBtn.classList.add('is-open');
    renderAddTexts();
    renderCandGrid();
  }
  function closePanel() {
    addPanel.hidden = true;
    addBtn.classList.remove('is-open');
  }

  /* 販売期間開始済みの場合 → p3-15リンクを表示 */
  if (SALE_ACTIVE) {
    var saleNotice = document.getElementById('p2121SaleNotice');
    if (saleNotice) saleNotice.hidden = false;
  }

  INITIAL.forEach(function(w){ listEl.appendChild(makeCard(w)); });
  updateCount();

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

  if (window.Sortable) {
    Sortable.create(listEl, {
      handle: '.p2-12-work-card__handle',
      animation: 150,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      onEnd: function() {
        displayedIds = [];
        listEl.querySelectorAll('.p2-12-work-card').forEach(function(c){ displayedIds.push(c.dataset.id); });
      },
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
    renderCandGrid();
  };

};

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
  var watchBtns = Array.prototype.filter.call(document.querySelectorAll('[data-action="watch"], #ktnP3WatchHib'), function(b){ return !b.closest('.cc,.gc,.uc'); });
  watchBtns.forEach(function(btn){
    if (btn.closest('.ktn-cta-widget, .p2-action-widget')) btn.dataset.ctaInit = '1';
    btn.addEventListener('click', function(){
      if ((window.ktnState||{}).role === 'guest') { KTN.action.handle(btn, 'watch'); return; }
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        var newText = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        if (lbl) { lbl.textContent = newText; }
        else { var tn = Array.from(b.childNodes).find(function(n){ return n.nodeType===3 && n.textContent.trim(); }); if (tn) tn.textContent = ' '+newText; }
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : 'ウォッチしました');
    });
  });

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
  var watchBtns = Array.prototype.filter.call(document.querySelectorAll('[data-action="watch"]'), function(b){ return !b.closest('.cc,.gc,.uc'); });
  watchBtns.forEach(function(btn){
    if (btn.closest('.ktn-cta-widget, .p2-action-widget')) btn.dataset.ctaInit = '1';
    btn.addEventListener('click', function(){
      if ((window.ktnState||{}).role === 'guest') { KTN.action.handle(btn, 'watch'); return; }
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        var newText = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        if (lbl) { lbl.textContent = newText; }
        else { var tn = Array.from(b.childNodes).find(function(n){ return n.nodeType===3 && n.textContent.trim(); }); if (tn) tn.textContent = ' '+newText; }
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : 'ウォッチしました');
    });
  });

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
  var watchBtns = Array.prototype.filter.call(document.querySelectorAll('[data-action="watch"]'), function(b){ return !b.closest('.cc,.gc,.uc'); });
  watchBtns.forEach(function(btn){
    if (btn.closest('.ktn-cta-widget, .p2-action-widget')) btn.dataset.ctaInit = '1';
    btn.addEventListener('click', function(){
      if ((window.ktnState||{}).role === 'guest') { KTN.action.handle(btn, 'watch'); return; }
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        var newText = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        if (lbl) { lbl.textContent = newText; }
        else { var tn = Array.from(b.childNodes).find(function(n){ return n.nodeType===3 && n.textContent.trim(); }); if (tn) tn.textContent = ' '+newText; }
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : 'ウォッチしました');
    });
  });

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
  var watchBtns = Array.prototype.filter.call(document.querySelectorAll('[data-action="watch"]'), function(b){ return !b.closest('.cc,.gc,.uc'); });
  watchBtns.forEach(function(btn){
    if (btn.closest('.ktn-cta-widget, .p2-action-widget')) btn.dataset.ctaInit = '1';
    btn.addEventListener('click', function(){
      if ((window.ktnState||{}).role === 'guest') { KTN.action.handle(btn, 'watch'); return; }
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        var newText = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        if (lbl) { lbl.textContent = newText; }
        else { var tn = Array.from(b.childNodes).find(function(n){ return n.nodeType===3 && n.textContent.trim(); }); if (tn) tn.textContent = ' '+newText; }
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : 'ウォッチしました');
    });
  });

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

  // 5. 作品フィルター絞り込み
  (function(){
    var selects = document.querySelectorAll('.p3-3-filter__select');
    var filterCountEl = document.getElementById('p3FilterCount');
    var emptyEl = document.getElementById('p3FilterEmpty');

    function filterWorks() {
      var liaison = document.getElementById('p3FilterLiaison') ? document.getElementById('p3FilterLiaison').value : '';
      var status  = document.getElementById('p3FilterStatus')  ? document.getElementById('p3FilterStatus').value  : '';
      var genre   = document.getElementById('p3FilterGenre')   ? document.getElementById('p3FilterGenre').value   : '';
      var year    = document.getElementById('p3FilterYear')    ? document.getElementById('p3FilterYear').value    : '';
      var hasFilter = !!(liaison || status || genre || year);
      var totalVisible = 0;

      document.querySelectorAll('.p3-3-grid .aw').forEach(function(card){
        var match = (!liaison || card.dataset.liaison === liaison)
                 && (!status  || card.dataset.status  === status)
                 && (!genre   || card.dataset.genre   === genre)
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

    selects.forEach(function(sel){ sel.addEventListener('change', filterWorks); });
  })();

  // 6. creator本人: 申込中カードにコンソールボタン表示
  function applyOwner() {
    var isOwner = (window.ktnState && window.ktnState.role === 'user+creator');
    document.querySelectorAll('.p33-console-wrap').forEach(function(el) {
      el.style.display = isOwner ? 'flex' : 'none';
    });
  }
  applyOwner();
  window.ktnRender = function () { applyOwner(); };
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
  var watchBtns = Array.prototype.filter.call(document.querySelectorAll('[data-action="watch"]'), function(b){ return !b.closest('.cc,.gc,.uc'); });
  watchBtns.forEach(function(btn){
    if (btn.closest('.ktn-cta-widget, .p2-action-widget')) btn.dataset.ctaInit = '1';
    btn.addEventListener('click', function(){
      if ((window.ktnState||{}).role === 'guest') { KTN.action.handle(btn, 'watch'); return; }
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        var newText = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        if (lbl) { lbl.textContent = newText; }
        else { var tn = Array.from(b.childNodes).find(function(n){ return n.nodeType===3 && n.textContent.trim(); }); if (tn) tn.textContent = ' '+newText; }
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : 'ウォッチしました');
    });
  });

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
  var watchBtns = Array.prototype.filter.call(document.querySelectorAll('[data-action="watch"]'), function(b){ return !b.closest('.cc,.gc,.uc'); });
  watchBtns.forEach(function(btn){
    if (btn.closest('.ktn-cta-widget, .p2-action-widget')) btn.dataset.ctaInit = '1';
    btn.addEventListener('click', function(){
      if ((window.ktnState||{}).role === 'guest') { KTN.action.handle(btn, 'watch'); return; }
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        var newText = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        if (lbl) { lbl.textContent = newText; }
        else { var tn = Array.from(b.childNodes).find(function(n){ return n.nodeType===3 && n.textContent.trim(); }); if (tn) tn.textContent = ' '+newText; }
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : 'ウォッチしました');
    });
  });

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
  var watchBtns = Array.prototype.filter.call(document.querySelectorAll('[data-action="watch"]'), function(b){ return !b.closest('.cc,.gc,.uc'); });
  watchBtns.forEach(function(btn){
    if (btn.closest('.ktn-cta-widget, .p2-action-widget')) btn.dataset.ctaInit = '1';
    btn.addEventListener('click', function(){
      if ((window.ktnState||{}).role === 'guest') { KTN.action.handle(btn, 'watch'); return; }
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        var newText = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        if (lbl) { lbl.textContent = newText; }
        else { var tn = Array.from(b.childNodes).find(function(n){ return n.nodeType===3 && n.textContent.trim(); }); if (tn) tn.textContent = ' '+newText; }
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : 'ウォッチしました');
    });
  });

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

    window.ktnRender = function () { applyRole(); };
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

    window.ktnRender = function () { applyRole(); };
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

    window.ktnRender = function () { applyRole(); };
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

    window.ktnRender = function () { applyRole(); };
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

    window.ktnRender = function () { applyRole(); };
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

    window.ktnRender = function () { applyRole(); };
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

  // 4. コンソール内2タブ切替
  var tabBtns = document.querySelectorAll('.p315-tab-btn');
  var tabPanels = document.querySelectorAll('.p315-tab-panel');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('p315-tab-btn--active'); b.setAttribute('aria-selected', 'false'); });
      tabPanels.forEach(function (p) { p.hidden = true; });
      btn.classList.add('p315-tab-btn--active');
      btn.setAttribute('aria-selected', 'true');
      var panel = document.getElementById(btn.dataset.panel);
      if (panel) panel.hidden = false;
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

  /* ── 販売状態マスタ ── */
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

  /* ── サンプルデータ（このギャラリーが取り扱う作品）──
     author＝登録済みクリエイター（真正性担保のため未登録作家は入らない）。
     exhs＝出品中の展覧会（空なら未出品）。 */
  var WORKS = [
    { id:'g1', title:'《静かな水面》',        author:'高橋 信',     year:'2025年', medium:'キャンバスに油彩', bg:'linear-gradient(155deg,#cfe0e8,#7a9cb0)', status:'negot',
      exhs:[{ n:'色彩の対話 — 現代絵画グループ展', mode:'lp' }] },
    { id:'g2', title:'《余白のコンポジション》', author:'佐藤 みなと', year:'2025年', medium:'キャンバスに油彩', bg:'linear-gradient(155deg,#e8e2d4,#b0a888)', status:'sale',
      exhs:[{ n:'色彩の対話 — 現代絵画グループ展', mode:'lp' }] },
    { id:'g3', title:'《海の記憶》',           author:'佐藤 みなと', year:'2024年', medium:'アクリル・パネル', bg:'linear-gradient(155deg,#cfe0e8,#7a9cb0)', status:'inquiry',
      exhs:[] },
    { id:'g4', title:'《朝の気配》',           author:'高橋 信',     year:'2024年', medium:'キャンバスに油彩', bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', status:'sold',
      exhs:[{ n:'冬のグループ展 2025', mode:'l' }] },
    { id:'g5', title:'《無題（青の連作 I）》',  author:'大野 藍',     year:'2026年', medium:'ミクストメディア', bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', status:'sale',
      exhs:[{ n:'色彩の対話 — 現代絵画グループ展', mode:'lp' }] },
    { id:'g6', title:'《無題（青の連作 II）》', author:'大野 藍',     year:'2026年', medium:'ミクストメディア', bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)', status:'sale',
      exhs:[] },
    { id:'g7', title:'《庭の記憶》',           author:'高橋 信',     year:'2023年', medium:'キャンバスに油彩', bg:'linear-gradient(155deg,#d8c8e8,#a888cc)', status:'nonsale',
      exhs:[] },
    { id:'g8', title:'《光の粒》',             author:'佐藤 みなと', year:'2023年', medium:'和紙・岩絵具',     bg:'linear-gradient(155deg,#f0d0d0,#c88080)', status:'inquiry',
      exhs:[] },
  ];

  /* ── DOM ── */
  var listEl    = document.getElementById('p414List');
  var countEl   = document.getElementById('p414Count');
  var emptyEl   = document.getElementById('p414Empty');
  var authorSel = document.getElementById('p414FilterAuthor');
  var listedSel = document.getElementById('p414FilterListed');
  if (!listEl || !countEl || !authorSel || !listedSel) return;

  /* ── 作者フィルタの選択肢を作品の作者から生成 ── */
  var authors = [];
  WORKS.forEach(function (w) { if (authors.indexOf(w.author) === -1) authors.push(w.author); });
  authors.forEach(function (a) {
    var opt = document.createElement('option');
    opt.value = a; opt.textContent = a;
    authorSel.appendChild(opt);
  });

  /* ── カード生成 ── */
  function makeCard(w) {
    var st = STATUS[w.status] || STATUS.inquiry;
    var listed = w.exhs && w.exhs.length > 0;
    var exhHtml = listed
      ? w.exhs.map(function (e) {
          var badge = e.mode === 'lp'
            ? '<span class="lb-dot li-plus">LIAISON+</span>'
            : '<span class="lb-dot li">LIAISON</span>';
          return '<span class="p414-item__exh">'+badge+'<span class="p414-item__exh-name">'+e.n+'</span></span>';
        }).join('')
      : '<span class="p414-item__unlisted">未出品</span>';

    var li = document.createElement('li');
    li.className = 'p414-item';
    li.dataset.author = w.author;
    li.dataset.listed = listed ? 'listed' : 'unlisted';
    li.innerHTML =
      '<div class="p414-item__thumb" style="background:'+w.bg+'"></div>'+
      '<div class="p414-item__body">'+
        '<div class="p414-item__title-row">'+
          '<span class="cb cb-content cb-artwork">artwork</span>'+
          '<span class="p414-item__title">'+w.title+'</span>'+
        '</div>'+
        '<div class="p414-item__author"><span class="p414-item__author-label">作者</span>'+
          '<span class="cb cb-person cb-creator">creator</span>'+
          '<span class="p414-item__author-name">'+w.author+'</span>'+
        '</div>'+
        '<div class="p414-item__meta">'+[w.year, w.medium].filter(Boolean).join('　')+'</div>'+
        '<div class="p414-item__exhs">'+exhHtml+'</div>'+
      '</div>'+
      '<div class="p414-item__side">'+
        '<span class="aws '+st.cls+'">'+st.label+'</span>'+
        '<a class="p414-item__edit ktn-action-btn" href="kotennavi-p6-11.html?role=gallery&author='+encodeURIComponent(authorKey(w.author))+'">編集 →</a>'+
      '</div>';
    return li;
  }

  /* ── フィルタ描画 ── */
  function render() {
    var fa = authorSel.value;
    var fl = listedSel.value;
    listEl.innerHTML = '';
    var n = 0;
    WORKS.forEach(function (w) {
      if (fa && w.author !== fa) return;
      var listed = w.exhs && w.exhs.length > 0;
      if (fl === 'listed' && !listed) return;
      if (fl === 'unlisted' && listed) return;
      listEl.appendChild(makeCard(w));
      n++;
    });
    countEl.textContent = n;
    if (emptyEl) emptyEl.hidden = n !== 0;
  }

  authorSel.addEventListener('change', render);
  listedSel.addEventListener('change', render);
  render();

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

  // 4. コンソール内2タブ切替
  var tabBtns = document.querySelectorAll('.p315-tab-btn');
  var tabPanels = document.querySelectorAll('.p315-tab-panel');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('p315-tab-btn--active'); b.setAttribute('aria-selected', 'false'); });
      tabPanels.forEach(function (p) { p.hidden = true; });
      btn.classList.add('p315-tab-btn--active');
      btn.setAttribute('aria-selected', 'true');
      var panel = document.getElementById(btn.dataset.panel);
      if (panel) panel.hidden = false;
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

/* ════════════════════════════════════════════════════
   P2-11  展覧会 新規投稿・編集・クローン
════════════════════════════════════════════════════ */
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
  window.ktnRender = function () { syncMgmtBar(); };
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
      window.ktnRender = function () { applyRole(); };
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
  // identity strip（申込者）のロール別デモデータ
  const CTX = {
    creator: { media: '--creator', bg: 'linear-gradient(135deg,#7ab4cc,#4a8099)', init: 'T',
               badge: '<span class="cb cb-person cb-creator">creator</span>', name: '田中 透',
               href: 'kotennavi-p3.html', view: 'クリエイターページへ →' },
    gallery: { media: '--gallery', bg: 'linear-gradient(135deg,#c8a888,#8b5e3c)', init: 'SOIL',
               badge: '<span class="cb cb-person cb-gallery">gallery</span>', name: 'Gallery SOIL 渋谷',
               href: 'kotennavi-p4.html', view: 'ギャラリーページへ →' }
  };
  function syncMgmtBar() {
    const r = window.ktnState && window.ktnState.role || 'gallery';
    document.body.classList.remove('p3-page', 'p4-page', 'p5-page');
    if (r === 'creator')      document.body.classList.add('p3-page');
    else if (r === 'gallery') document.body.classList.add('p4-page');
    const c = CTX[r] || CTX.gallery;
    const media = document.getElementById('p114CtxMedia');
    if (media) {
      media.className = 'ktn-mgmt-context__media ktn-mgmt-context__media' + c.media;
      media.style.background = c.bg;
      media.textContent = c.init;
      media.href = c.href;
    }
    const badges = document.getElementById('p114CtxBadges');
    if (badges) badges.innerHTML = c.badge;
    const name = document.getElementById('p114CtxName');
    if (name) { name.textContent = c.name; name.href = c.href; }
    const view = document.getElementById('p114CtxView');
    if (view) { view.textContent = c.view; view.href = c.href; }
  }
  syncMgmtBar();
  window.ktnRender = function () { syncMgmtBar(); };
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
  window.ktnRender = function () { syncMgmtBar(); };
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
  function feedList() {
    var list = EX.filter(function (x) { return !feedGenre || x.tags.indexOf(feedGenre) !== -1; });
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
