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
  var btn = '<button class="ktn-btn' + wOn + '"' + wId + ' onclick="this.classList.toggle(\'on\');event.preventDefault()">'
    + '<svg width="12" height="12"><use href="#icon-watch" color="#7a8a99" /></svg>'
    + ' watch<span class="tip">ウォッチする</span></button>';
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
  var intBtn = '<button class="ktn-icon-btn" onclick="this.classList.toggle(\'on\');event.preventDefault()">'
    + '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"/></svg>'
    + '<span class="tip">興味ある！に追加する</span></button>';
  return '<a href="kotennavi-p2.html" class="p2-side-ec">'
    + '<div class="p2-side-ec__poster" style="background:' + e.bg + '"></div>'
    + '<div class="p2-side-ec__body">'
    + '<div class="p2-side-ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span>' + liaisonBadge + '</div>'
    + '<div class="p2-side-ec__name">' + e.title + '</div>'
    + '<div class="p2-side-ec__venue">' + pref + e.venue + '</div>'
    + period + '</div>'
    + intBtn
    + '</a>';
}

/* グリッド展覧会カード（.masonry-item .ec） — cards_exhibition.html マソンリー完全準拠 */
function buildGridEcCard(e) {
  /* ポスターメタ（残り日数 | 営業時間 | 距離） */
  var remainCls = e.status === 'soon' ? 'ec__remain--soon' : e.status === 'closed' ? 'ec__remain--closed' : 'ec__remain--live';
  var metaParts = [];
  if (e.remain) metaParts.push('<span class="ec__remain ' + remainCls + '">' + e.remain + '</span>');
  if (e.hours && e.status !== 'closed') metaParts.push('<span class="meta-sep">|</span><span>' + e.hours + '</span>');
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
    var liSub   = e.liaison === 'li-plus' ? 'オンライン作品展示・販売中' : 'オンライン作品展示中';
    var thumbsHtml = (e.thumbs && e.thumbs.length)
      ? '<div class="ec__liaison-thumbs">' + e.thumbs.map(function(t){ return '<div class="ec__liaison-thumb" style="background:' + t + '"></div>'; }).join('') + '</div>'
      : '';
    liaisonHtml = '<div class="ec__liaison-strip' + (e.liaison === 'li-plus' ? ' ec__liaison-strip--plus' : '') + '">'
      + '<div class="ec__liaison-strip-info"><span class="lb-dot ' + liCls + '"><span class="lb-dot-inner"></span>' + liLabel + '</span>'
      + '<span class="ec__liaison-subtext">' + liSub + '</span></div>'
      + thumbsHtml + '</div>';
  }

  var intBtn = '<button class="ktn-icon-btn" onclick="this.classList.toggle(\'on\');event.preventDefault()">'
    + '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"/></svg>'
    + '<span class="tip">興味ある！に追加する</span></button>';

  return '<div class="masonry-item"><a href="kotennavi-p2.html" class="ec">'
    + '<div class="ec__poster" style="background:' + e.bg + '">'
    + '<div class="ec__poster-noimg" style="min-height:' + (e.imgH || 190) + 'px"></div>'
    + '<div class="ec__poster-overlay">'
    + '<div class="ec__poster-dates"><span class="year">2026.</span><strong>' + (e.s || '') + '</strong><span class="sep">—</span><strong>' + (e.e || '') + '</strong></div>'
    + metaHtml
    + '</div></div>'
    + '<div class="ec__body">'
    + '<div class="ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span>' + sbHtml + '</div>'
    + '<div class="ec__title">' + e.title + '</div>'
    + '<div class="ec__venue">' + e.venue + '</div>'
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

  /* ── レビュー（exhibition_v6 投稿者カード形式・カラーアバター） ── */
  (function () {
    var list = document.getElementById('p2ReviewList');
    if (!list) return;
    var RV = [
      {
        ini: 'A', name: 'A.K.', av: 'linear-gradient(135deg,#f0d8c8,#c8987a)', tc: 'rgba(255,255,255,.9)',
        date: '2026.02.20', stars: 5, ci: true, checkinDate: '2026.02.20',
        body: 'ふわふわとドキドキの作品が特に印象的でした。言葉が視覚に変換される感覚が新鮮でした。ポストカードも嬉しかったです。'
      },
      {
        ini: 'M', name: 'mari_t', av: 'linear-gradient(135deg,#d8e8c8,#98b878)', tc: 'rgba(255,255,255,.9)',
        date: '2026.02.19', stars: 5, ci: true, checkinDate: '2026.02.19',
        body: '作家さんのトークも聴けてとても良かったです。色使いがとても独特で、何度でも来たいと思いました。'
      },
      {
        ini: 'S', name: 'sato.hide', av: 'linear-gradient(135deg,#c8d8e8,#7898b8)', tc: 'rgba(255,255,255,.9)',
        date: '2026.02.18', stars: 4, ci: true, checkinDate: '2026.02.18',
        body: '特に「ざわざわ（夜）」は長い時間立ち止まって見入ってしまいました。会期中にまた行きたいと思っています。'
      },
      {
        ini: 'Y', name: 'yuki88', av: 'linear-gradient(135deg,#e8d8f0,#b888c8)', tc: 'rgba(255,255,255,.9)',
        date: '2026.02.17', stars: 5, ci: false, checkinDate: '',
        body: '初めて個展を見に行ったのですが、とても丁寧な展示で感動しました。「言葉の断片」シリーズが特に好みでした。'
      },
    ];
    var CI_ICON = '<svg viewBox="0 0 16 16" width="9" height="9" style="display:inline-block;vertical-align:middle"><circle cx="10" cy="5" r="4" fill="currentColor"/><circle cx="5" cy="11" r="2.4" fill="currentColor"/></svg>';
    var LIMIT = 3;
    function buildRvItem(r) {
      var stars = '';
      for (var i = 0; i < 5; i++)
        stars += '<span class="rv-star"' + (i >= r.stars ? ' style="opacity:.18"' : '') + '>★</span>';
      var ci = r.ci
        ? '\u00a0\u25cf\u00a0<span class="rv-checkin-date">' + CI_ICON + '\u00a0' + r.checkinDate + '</span>'
        : '';
      return '<a class="review-item" href="kotennavi-p8.html">' +
        '<div class="rv-hd">' +
        '<div class="rv-av" style="background:' + r.av + ';color:' + r.tc + '">' + r.ini + '</div>' +
        '<div style="flex:1;min-width:0">' +
        '<div class="rv-name"><span class="cb cb-user">user</span>\u00a0' + r.name + ci + '</div>' +
        '<div class="rv-stars">' + stars + '</div>' +
        '</div>' +
        '<div class="rv-date">' + r.date + '</div>' +
        '</div>' +
        '<div class="rv-body">' + r.body + '</div>' +
        '</a>';
    }
    var html = RV.slice(0, LIMIT).map(buildRvItem).join('');
    var extra = RV.slice(LIMIT);
    if (extra.length) {
      html += '<div class="p2-rv-more" id="p2RvMore">' + extra.map(buildRvItem).join('') + '</div>';
      html += '<button class="p2-rv-toggle" id="p2RvToggle" type="button">残り' + extra.length + '件を見る</button>';
    }
    list.innerHTML = html;
    if (extra.length) {
      document.getElementById('p2RvToggle').addEventListener('click', function () {
        var moreEl = document.getElementById('p2RvMore');
        var open = moreEl.style.display === 'block';
        moreEl.style.display = open ? '' : 'block';
        this.textContent = open ? '残り' + extra.length + '件を見る' : '閉じる';
      });
    }
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
  (function () {
    var grid = document.getElementById('p2RecGrid');
    if (!grid || !window.P2_REC) return;
    grid.innerHTML = window.P2_REC.map(buildGridEcCard).join('');
  })();

  /* ── interest! トグル ── */
  (function () {
    var btn = document.getElementById('p2InterestBtn');
    var num = document.getElementById('p2IntNum');
    if (!btn) return;
    var on = false, base = 41;
    btn.addEventListener('click', function () {
      on = !on; btn.classList.toggle('is-active', on); btn.setAttribute('aria-pressed', on);
      if (num) num.textContent = base + (on ? 1 : 0);
      if (on && btn.animate) btn.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }],
        { duration: 240, easing: 'ease-out' });
      typeof showToast === 'function' && showToast(on ? '「興味ある！」に追加しました' : '「興味ある！」を取り消しました');
    });
  })();

  /* ── check in トグル ── */
  (function () {
    var btn = document.getElementById('p2CheckinBtn');
    var num = document.getElementById('p2CiNum');
    if (!btn) return;
    var on = false, base = 9;
    btn.addEventListener('click', function () {
      on = !on; btn.classList.toggle('is-active', on);
      if (num) num.textContent = base + (on ? 1 : 0);
    });
  })();

  /* ── フォロートグル ── */
  (function () {
    var btn = document.getElementById('p2FollowBtn');
    if (!btn) return;
    var following = false;
    btn.addEventListener('click', function () {
      following = !following; btn.classList.toggle('is-following', following);
      btn.innerHTML = following
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><path d="M20 6L9 17l-5-5"/></svg>フォロー中'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>フォロー';
    });
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

  /* ── サブナビ IntersectionObserver（セクション → アクティブ連動） ── */
  (function () {
    var subnav = document.getElementById('p2Subnav');
    if (!subnav || !('IntersectionObserver' in window)) return;
    var items = subnav.querySelectorAll('[data-target]');
    if (!items.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        items.forEach(function (a) {
          a.classList.toggle('is-active', a.dataset.target === id);
        });
      });
    }, { rootMargin: '-30% 0px -70% 0px' });
    items.forEach(function (a) {
      var sec = document.getElementById(a.dataset.target);
      if (sec) obs.observe(sec);
    });
  })();

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

  var EVENTS = [
    {
      date: '2026-02-21', dow: '土', time: '15:00–16:30', type: 'talk', label: 'ギャラリートーク',
      title: '作家によるギャラリートーク 第1回',
      desc: '展示作品について作家自身が解説。参加無料・要予約（定員15名）。ギャラリーへお電話でご予約ください。'
    },
    {
      date: '2026-02-28', dow: '土', time: '15:00–16:30', type: 'talk', label: 'ギャラリートーク',
      title: '作家によるギャラリートーク 第2回',
      desc: '「オノマトペと絵画の関係性」をテーマに制作プロセスを深掘り。参加無料・要予約（定員15名）。ギャラリーへお電話でご予約ください。'
    },
    {
      date: '2026-03-05', dow: '木', time: '15:00–17:00', type: 'special', label: 'スペシャルイベント',
      title: 'クロージング・トーク & レセプション',
      desc: '最終日特別トーク＋軽食付きレセプション。参加無料・予約不要。'
    }
  ];
  var ATTENDANCE_DATES = ['2026-02-18', '2026-02-21', '2026-02-28', '2026-03-05'];

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
    var attSet = {}; ATTENDANCE_DATES.forEach(function(d) { attSet[d] = true; });
    grid.innerHTML = days.map(function(d) {
      var ds = dateStr(d), dow = d.getDay();
      var isOpen = OPEN_DOW.indexOf(dow) !== -1;
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
      var statusCell = isOpen
        ? '<div class="p2-1-cal-row__status">11:00 – 19:00</div>'
        : '<div class="p2-1-cal-row__status p2-1-cal-row__status--closed">休廀</div>';
      var badges = '';
      if (isOpen) {
        if (attend) badges += '<span class="p2-1-cal-row__badge p2-1-cal-row__badge--attend">作家在廀</span>';
        if (ev) {
          var bc = ev.type === 'special' ? 'p2-1-cal-row__badge--special' : 'p2-1-cal-row__badge--event';
          badges += '<span class="p2-1-cal-row__badge '+bc+'">'+ev.label+' '+ev.time+'</span>';
        }
      }
      var badgeCell = '<div class="p2-1-cal-row__badges">'+badges+'</div>';
      var ctaCell = '';
      if (isOpen && !past) {
        var t2 = encodeURIComponent('【個展】あなたが知らないオノマトペ @ Gallery SOIL 渋谷');
        var dp = ds.replace(/-/g,'');
        var url2 = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text='+t2+'&dates='+dp+'T110000/'+dp+'T190000&details='+encodeURIComponent('https://koten-navi.com/p2');
        ctaCell = '<a href="'+url2+'" target="_blank" rel="noopener" class="p2-1-cal-row__gcal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="11" height="11"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>カレンダーに追加</a>';
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

  /* ── ④ 在廊予定 シンプルリスト ── */
  (function() {
    var list = document.getElementById('p2AttendanceGrid'); if (!list) return;
    list.innerHTML = ATTENDANCE_DATES.map(function(ds) {
      var d = parseDate(ds), past = isPast(d), today = isToday(d);
      return (
        '<li class="p2-1-simple-item'+(past?' p2-1-simple-item--past':'')+'">' +
          '<div class="p2-1-simple-item__date">' +
            '<time datetime="'+ds+'" class="p2-1-simple-item__md">'+ds.slice(5).replace('-','.')+'</time>' +
            '<span class="p2-1-simple-item__dow">'+DOW_JA[d.getDay()]+'</span>' +
          '</div>' +
          '<div class="p2-1-simple-item__body">' +
            '<div class="p2-1-simple-item__title">田中 透 在廀'+(today?' <span style="font-size:.68rem;color:#c0392b">(本日)</span>':'')+' </div>' +
            '<div class="p2-1-simple-item__desc">Gallery SOIL 渋谷にてお声がけいただければ対応いたします。</div>' +
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
   P2-3 詳細 / P2-4 出展者
──────────────────────────────────────────────────── */
KTN.pages['p2-3'] = function () {
  renderP2SubRecGrid();
};
KTN.pages['p2-4'] = function () {
  document.querySelectorAll('.p2-4-creator__watch button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var isOn = this.classList.toggle('ktn-btn--primary');
      this.classList.toggle('ktn-btn--ghost', !isOn);
    });
  });
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
};

/* ────────────────────────────────────────────────────
   P2-4  出展者（既存定義を拡張）
──────────────────────────────────────────────────── */
KTN.pages['p2-4'] = function () {
  /* ++ posted by card ++ */
  (function () {
    var el = document.getElementById('p2PostedByCard');
    if (!el || !window.P2_POSTED_BY) return;
    el.innerHTML = buildPersonCard(window.P2_POSTED_BY);
  })();
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
    var ribbon    = w.status === 'sold' ? '<div class="p25c__sold-ribbon">SOLD</div>' : '';
    var badgeMap  = {
      sale:    '<span class="p25c__badge p25c__badge--sale">\u8ca9\u58f2\u4e2d</span>',
      negot:   '<span class="p25c__badge p25c__badge--negot">\u5546\u8ac7\u4e2d</span>',
      inquiry: '<span class="p25c__badge p25c__badge--inquiry">\u8981\u554f\u5408\u305b</span>',
      sold:    '<span class="p25c__badge p25c__badge--sold">\u58f2\u7d04\u6e08</span>',
      nsale:   '<span class="p25c__badge p25c__badge--nsale">\u975e\u58f2\u54c1</span>',
    };
    var badge = badgeMap[w.status] || '';
    var statusMap = { sale: 'forsale', negot: 'forsale', inquiry: 'forsale', nsale: 'nsale', sold: 'sold' };
    var dataStatus = statusMap[w.status] || 'nsale';
    return '<a class="' + cardClass + '" href="./kotennavi-p6-1.html" data-creator="' + w.creator + '" data-status="' + dataStatus + '">' +
      '<div class="p25c__img">' +
        '<div class="p25c__img-bg" style="background:' + w.bg + '"></div>' +
        '<div class="p25c__img-title" style="color:' + w.tc + '">' + w.title + '</div>' +
        ribbon +
      '</div>' +
      '<div class="p25c__body">' +
        '<div class="p25c__creator">' + w.name + '</div>' +
        '<div class="p25c__title">' + w.title + '</div>' +
        '<div class="p25c__spec">' + w.year + ' / ' + w.spec + '</div>' +
        '<div class="p25c__footer">' + badge + '</div>' +
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
  (function () {
    var g = document.getElementById('p25RecGrid');
    if (!g) return;
    var DATA = [
      { title: '春の景色展', venue: '代官山ヒルサイドF', bg: 'linear-gradient(155deg,#f0e0d0,#c8a888)', tc: 'rgba(0,0,0,.28)', s: '02.20', e: '03.10', liaison: false, int: 21, ci: 4 },
      { title: '現代彫刻の冒険', venue: '神楽坂BOOK・ART', bg: 'linear-gradient(155deg,#e8d0d8,#b88898)', tc: 'rgba(255,255,255,.6)', s: '02.17', e: '03.07', liaison: true, int: 19, ci: 3 },
      { title: 'ポストカード展', venue: '吉祥寺 M&G', bg: 'linear-gradient(155deg,#d0e8e0,#88b8a8)', tc: 'rgba(0,0,0,.28)', s: '02.22', e: '03.12', liaison: false, int: 38, ci: 7 },
      { title: '絵画の余白', venue: '恵比寿 SPACE NONA', bg: 'linear-gradient(155deg,#e0d8f0,#9880c8)', tc: 'rgba(255,255,255,.6)', s: '02.25', e: '03.08', liaison: false, int: 14, ci: 2 },
    ];
    g.innerHTML = DATA.map(buildGridEcCard).join('');
  })();
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

  function renderWork(w) {
    var cardClass = 'p25c' + (w.status === 'sold' ? ' p25c--sold' : '');
    var ribbon    = w.status === 'sold' ? '<div class="p25c__sold-ribbon">SOLD</div>' : '';
    var badgeMap  = {
      sale:    '<span class="p25c__badge p25c__badge--sale">\u8ca9\u58f2\u4e2d</span>',
      negot:   '<span class="p25c__badge p25c__badge--negot">\u5546\u8ac7\u4e2d</span>',
      inquiry: '<span class="p25c__badge p25c__badge--inquiry">\u8981\u554f\u5408\u305b</span>',
      sold:    '<span class="p25c__badge p25c__badge--sold">\u58f2\u7d04\u6e08</span>',
      nsale:   '<span class="p25c__badge p25c__badge--nsale">\u975e\u58f2\u54c1</span>',
    };
    var badge = badgeMap[w.status] || '';
    var statusMap = { sale: 'forsale', negot: 'forsale', inquiry: 'forsale', nsale: 'nsale', sold: 'sold' };
    var dataStatus = statusMap[w.status] || 'nsale';
    var priceHtml = w.price
      ? '<div class="p25c__price"><span class="p25c__price-currency">&yen;</span>' + w.price.toLocaleString() + '<span class="p25c__price-tax">\uff08\u7a0e\u8fbc\uff09</span></div>'
      : '';
    var applicantsHtml = (w.status === 'sale' && w.applicants)
      ? '<span class="p25c__applicants">' + w.applicants + '\u4eba\u304c\u7533\u8fbc\u4e2d</span>'
      : '';
    var consoleHtml = (w.status === 'sale' && w.applicants)
      ? '<div class="p25c__console-wrap">'
        + '<button class="p25c__console-btn ktn-action-btn ktn-action-btn--alert-dark"'
        + ' onclick="event.stopPropagation();event.preventDefault();p251GotoConsole()">'
        + '\u53d6\u5f15\u30c7\u30b9\u30af\u3078 \u2192</button>'
        + '</div>'
      : '';
    return '<a class="' + cardClass + '" href="#" data-creator="' + w.creator + '" data-status="' + dataStatus + '">' +
      '<div class="p25c__img">' +
        '<div class="p25c__img-bg" style="background:' + w.bg + '"></div>' +
        '<div class="p25c__img-title" style="color:' + w.tc + '">' + w.title + '</div>' +
        ribbon +
      '</div>' +
      '<div class="p25c__body">' +
        '<div class="p25c__creator">' + w.name + '</div>' +
        '<div class="p25c__title">' + w.title + '</div>' +
        '<div class="p25c__spec">' + w.year + ' / ' + w.spec + '</div>' +
        '<div class="p25c__footer">' +
          '<div class="p25c__footer-l">' + badge + applicantsHtml + '</div>' +
          priceHtml +
        '</div>' +
        consoleHtml +
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
  (function () {
    var g = document.getElementById('p25RecGrid');
    if (!g) return;
    var DATA = [
      { title: '春の景色展', venue: '代官山ヒルサイドF', bg: 'linear-gradient(155deg,#f0e0d0,#c8a888)', tc: 'rgba(0,0,0,.28)', s: '02.20', e: '03.10', liaison: false, int: 21, ci: 4 },
      { title: '現代彫刻の冒険', venue: '神楽坂BOOK・ART', bg: 'linear-gradient(155deg,#e8d0d8,#b88898)', tc: 'rgba(255,255,255,.6)', s: '02.17', e: '03.07', liaison: true, int: 19, ci: 3 },
      { title: 'ポストカード展', venue: '吉祥寺 M&G', bg: 'linear-gradient(155deg,#d0e8e0,#88b8a8)', tc: 'rgba(0,0,0,.28)', s: '02.22', e: '03.12', liaison: false, int: 38, ci: 7 },
      { title: '絵画の余白', venue: '恵比寿 SPACE NONA', bg: 'linear-gradient(155deg,#e0d8f0,#9880c8)', tc: 'rgba(255,255,255,.6)', s: '02.25', e: '03.08', liaison: false, int: 14, ci: 2 },
    ];
    g.innerHTML = DATA.map(buildGridEcCard).join('');
  })();
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
      { lbl:'配送方法',   val: renderShipping(w.shipping) },
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
      '<span class="tip">' + (on ? '興味ある！— 解除する' : '興味ある！に追加する') + '</span>' +
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
          return '<div class="cmt-card' + cardCls + '">' +
            '<div class="cmt-card-header">' +
            '<div class="cmt-avatar" style="background:' + (c.bg || 'var(--lbg3)') + '">' + c.user.slice(0,1) + '</div>' +
            '<div class="cmt-user"><div class="cmt-user-row">' +
            badge +
            '<span class="cmt-user-name">' + c.user + '</span>' +
            (c.purchased ? '<span class="cmt-verified">✓ 購入者</span>' : '') +
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
    hideSpecRows: ['額装','作品点数/エディション','作品状態','付属品','配送時期','配送方法'],
    renderRelated: function() {
      var MORE_BY = [
        { title: '\u300a\u3075\u308f\u3075\u308f\u300b',     bg: 'linear-gradient(155deg,#f0e8d0,#d4b896)', href: '#' },
        { title: '\u300a\u30c9\u30ad\u30c9\u30ad #3\u300b',  bg: 'linear-gradient(155deg,#f0d0d0,#c88080)', href: '#' },
        { title: '\u300a\u3056\u308f\u3056\u308f\uff08\u591c\uff09\u300b', bg: 'linear-gradient(155deg,#3d3530,#1f1a18)', href: '#' },
        { title: '\u300a\u30b7\u30e5\u30ef\u30b7\u30e5\u30ef\u300b', bg: 'linear-gradient(155deg,#d0e8f0,#7ab4cc)', href: '#' },
      ];
      var grid = document.getElementById('p6MoreByGrid');
      if (grid) {
        grid.innerHTML = MORE_BY.map(function(w) {
          return '<a class="p6-more-by__item" href="' + w.href + '">' +
            '<div class="p6-more-by__thumb" style="background:' + w.bg + '"></div>' +
            '<div class="p6-more-by__title">' + w.title + '</div>' +
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
        { lbl:'\u4f5c\u54c1\u70b9\u6570/\u30a8\u30c7\u30a3\u30b7\u30e7\u30f3', val: w.qty ? w.qty + '\u70b9' : null },
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
        el.innerHTML = articles.map(function(a) {
          return '<a class="p6-article-item" href="' + a.href + '">' +
            '<div class="p6-article__meta-row">' +
            '<span class="cb cb-content cb-article">article</span>' +
            '<span class="p6-article__date">' + a.date + '</span>' +
            '</div>' +
            '<div class="p6-article__title">' + a.title + '</div>' +
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

  /* オーナー（creator本人）: 申込ボタン → 取引デスクボタンに切替 */
  var applyBtn = document.getElementById('p62ApplyBtn');
  var deskBtn  = document.getElementById('p62DeskBtn');

  function applyOwnerP62() {
    var isOwner = (KTN.role === 'user+creator');
    if (applyBtn) applyBtn.style.display = isOwner ? 'none' : '';
    if (deskBtn)  deskBtn.style.display  = isOwner ? '' : 'none';
  }
  applyOwnerP62();

  /* p6 は window.setR を独自定義するため ktnRender 経由では呼ばれない → setR をラップ */
  var _prevSetR = window.setR;
  window.setR = function(role, btn) {
    if (typeof _prevSetR === 'function') _prevSetR(role, btn);
    applyOwnerP62();
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

  /* ── サンプルデータ ── */
  var INITIAL = [
    { id:'w1', title:'《オノマトペの庭》', year:'2026年', medium:'キャンバスに油彩', size:'116.7×91.0cm', bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)', status:'inquiry' },
    { id:'w2', title:'《ふわふわ》',       year:'2025年', medium:'キャンバスに油彩', size:'72.7×60.6cm',  bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', status:'sale' },
    { id:'w3', title:'《ざわざわ（夜）》',  year:'2025年', medium:'アクリル・パネル', size:'53.0×45.5cm',  bg:'linear-gradient(155deg,#3d3530,#1f1a18)', status:'nonsale' },
  ];
  var EXTRA = [
    { id:'w4', title:'《ドキドキ #3》',   year:'2025年', bg:'linear-gradient(155deg,#f0d0d0,#c88080)', status:'inquiry' },
    { id:'w5', title:'《シュワシュワ》',   year:'2024年', bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)', status:'inquiry' },
    { id:'w6', title:'《言葉の断片 I》',  year:'2024年', bg:'linear-gradient(155deg,#d8c8e8,#a888cc)', status:'inquiry' },
    { id:'w7', title:'《言葉の断片 II》', year:'2024年', bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', status:'inquiry' },
    { id:'w8', title:'《ふわふわ No.2》', year:'2024年', bg:'linear-gradient(155deg,#e0d8c8,#b4a88a)', status:'inquiry' },
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

  /* ── 候補グリッド描画 ── */
  function renderCandGrid() {
    candGrid.innerHTML = '';
    ALL.forEach(function(w) {
      var added = displayedIds.indexOf(w.id) !== -1;
      var div = document.createElement('div');
      div.className = 'p2-12-candidate-card'+(added?' is-added':'');
      div.dataset.id = w.id;
      div.innerHTML =
        '<div class="p2-12-candidate-card__thumb" style="background:'+w.bg+'"></div>'+
        '<div class="p2-12-candidate-card__info">'+
          '<div class="p2-12-candidate-card__title">'+w.title+'</div>'+
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
  openPanel();

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
  var periodSave  = document.getElementById('p2121PeriodSave');

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

  if (periodSave) {
    periodSave.addEventListener('click', function() {
      var val = getCheckedValue();
      var label = val === 'same'   ? '展覧会会期と同じ期間で設定しました' :
                  val === 'plus2w' ? '会期終了後2週間まで設定しました' :
                  '販売期間を保存しました';
      if (window.KTN && KTN.toast) KTN.toast(label);
    });
  }

  /* ── 発送・梱包 保存 ── */
  var shipSave = document.getElementById('p2121ShipSave');
  if (shipSave) {
    shipSave.addEventListener('click', function() {
      if (window.KTN && KTN.toast) KTN.toast('発送・梱包情報を保存しました');
    });
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

  var INITIAL = [
    /* locked:true = 販売中・申込者あり → 状態・価格ロック */
    { id:'w1', title:'《オノマトペの庭》', year:'2026年', medium:'キャンバスに油彩', size:'116.7×91.0cm', bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)', status:'sale', price:480000, locked:true, applyCount:2 },
    { id:'w2', title:'《ふわふわ》',       year:'2025年', medium:'キャンバスに油彩', size:'72.7×60.6cm',  bg:'linear-gradient(155deg,#f0e8d0,#d4b896)', status:'sale',    price:220000 },
    { id:'w3', title:'《ざわざわ（夜）》',  year:'2025年', medium:'アクリル・パネル', size:'53.0×45.5cm',  bg:'linear-gradient(155deg,#3d3530,#1f1a18)', status:'nonsale' },
    /* soldOnline:true = オンライン取引完了 → 状態・価格ロック */
    { id:'w9', title:'《言葉の重力 No.3》', year:'2024年', medium:'油彩', size:'72.7×60.6cm', bg:'linear-gradient(135deg,#c8a87a,#8b6040)', status:'sold', price:120000, soldOnline:true },
    /* priceLocked:true = 会場売約済 → 状態選択可・価格ロック */
    { id:'w10', title:'《ざわざわ No.2》', year:'2024年', medium:'アクリル・パネル', size:'45.5×38.0cm', bg:'linear-gradient(155deg,#c8c0d8,#8880a8)', status:'sold', price:85000, priceLocked:true },
  ];
  var EXTRA = [
    { id:'w4', title:'《ドキドキ #3》',   year:'2025年', bg:'linear-gradient(155deg,#f0d0d0,#c88080)', status:'inquiry' },
    { id:'w5', title:'《シュワシュワ》',   year:'2024年', bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)', status:'inquiry' },
    { id:'w6', title:'《言葉の断片 I》',  year:'2024年', bg:'linear-gradient(155deg,#d8c8e8,#a888cc)', status:'inquiry' },
    { id:'w7', title:'《言葉の断片 II》', year:'2024年', bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', status:'inquiry' },
    { id:'w8', title:'《ふわふわ No.2》', year:'2024年', bg:'linear-gradient(155deg,#e0d8c8,#b4a88a)', status:'inquiry' },
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
      var added = displayedIds.indexOf(w.id) !== -1;
      var div = document.createElement('div');
      div.className = 'p2-12-candidate-card'+(added?' is-added':'');
      div.dataset.id = w.id;
      div.innerHTML =
        '<div class="p2-12-candidate-card__thumb" style="background:'+w.bg+'"></div>'+
        '<div class="p2-12-candidate-card__info">'+
          '<div class="p2-12-candidate-card__title">'+w.title+'</div>'+
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

  openPanel();

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
  var watchBtns = document.querySelectorAll('[data-action="watch"], #ktnP3WatchHib');
  watchBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        if (lbl) lbl.textContent = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : '田中 透をウォッチしました');
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
      // パターン1: 通常グリッド表示
      worksGrid.className = 'p3-works-masonry';
      var sorted = d.works.slice().sort(function(a,b){ return (b.isLiaison?1:0)-(a.isLiaison?1:0); });
      worksGrid.innerHTML = sorted.slice(0, 4).map(function(w){
        return '<a class="aw aw--portfolio masonry-item" href="#">'
          +'<div class="aw__img">'
          +'<div class="aw__img-ph t-portrait" style="background:'+w.bg+'"></div>'
          +'</div>'
          +'<div class="aw__body">'
          +'<div class="aw__badge-row"></div>'
          +'<div class="aw__title-row"><div class="aw__title">'+w.title+'</div></div>'
          +'<div class="aw__spec">'+w.year+' / '+w.medium+'</div>'
          +'</div></a>';
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

        var cards = (ex.works || []).slice(0, 4).map(function(w){
          var cardCls = 'aw' + (isPlus ? ' aw--plus' : '');
          if (w.status === 'sold')  cardCls += ' aw--sold';
          if (w.status === 'nsale') cardCls += ' aw--nsale';
          var soldRibbon = (isPlus && w.status === 'sold')
            ? '<div class="aw__sold-ribbon"><div class="aw__sold-ribbon-inner">SOLD OUT</div></div>' : '';
          var statusBadge = (statusBadgeMap[w.status] || '')
            + (w.queue ? '<span class="aw__queue-inline">'+w.queue+'\u4eba\u304c\u7533\u8fbc\u4e2d</span>' : '');
          var footHtml = (isPlus && w.price)
            ? '<div class="aw__foot"><div class="aw__price">'+w.price+'</div></div>' : '';
          return '<a class="'+cardCls+'" href="#">'
            +'<div class="aw__img">'
            +'<div class="aw__lb"><span class="'+dotCls+'"><span class="lb-dot-inner"></span>'+dotLabel+'</span></div>'
            +soldRibbon
            +'<div class="aw__img-ph t-portrait" style="background:'+w.bg+'"></div>'
            +'</div>'
            +'<div class="aw__body">'
            +'<div class="aw__title-row"><div class="aw__title">'+w.title+'</div></div>'
            +(statusBadge ? '<div class="aw__status">'+statusBadge+'</div>' : '')
            +'</div>'
            +footHtml
            +'</a>';
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
  var watchBtns = document.querySelectorAll('[data-action="watch"]');
  watchBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        if (lbl) lbl.textContent = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : '田中 透をウォッチしました');
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
  var watchBtns = document.querySelectorAll('[data-action="watch"]');
  watchBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        if (lbl) lbl.textContent = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : '田中 透をウォッチしました');
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
  var watchBtns = document.querySelectorAll('[data-action="watch"]');
  watchBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        if (lbl) lbl.textContent = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : '田中 透をウォッチしました');
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
      var badge = document.querySelector('.p4-tabnav__new[data-new="' + key + '"]');
      if (badge) badge.classList.add('is-visible');
    });
  }

  // 1. watchボタン トグル
  var watchBtns = document.querySelectorAll('[data-action="watch"]');
  watchBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        if (lbl) lbl.textContent = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : 'Gallery SOIL 渋谷をウォッチしました');
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
      document.querySelectorAll('.p4-tabnav__item').forEach(function(btn){
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
    var tabBtns  = tabnav.querySelectorAll('.p4-tabnav__item');
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
  var watchBtns = document.querySelectorAll('[data-action="watch"]');
  watchBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        if (lbl) lbl.textContent = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : 'Gallery SOIL 渋谷をウォッチしました');
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
  var watchBtns = document.querySelectorAll('[data-action="watch"]');
  watchBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var lbl = b.querySelector('.ktn-btn__lbl');
        if (lbl) lbl.textContent = !isOn ? (b.dataset.on||'watching') : (b.dataset.off||'watch');
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = !isOn ? 'ウォッチ中 — 解除する' : 'ウォッチする';
      });
      KTN.toast(isOn ? 'ウォッチを解除しました' : 'Gallery SOIL 渋谷をウォッチしました');
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
        document.querySelectorAll('.p5-2-remove-btn').forEach(function (el) {
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

    // ── 記録除外ボタン ────────────────────────────────────────────────────────
    document.querySelectorAll('.p5-2-remove-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var card = btn.closest('.ec');
            if (card) card.classList.add('is-hidden');
            var group = btn.closest('.p5-2-year-group');
            if (group) {
                var visible = group.querySelectorAll('.ec:not(.is-hidden)').length;
                var countEl = group.querySelector('.p5-2-year-group__count');
                if (countEl) countEl.textContent = '（' + visible + '件）';
            }
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
        document.querySelectorAll('#p53AcBox .p5-3-ac').forEach(function (item) {
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
            var card = btn.closest('.p5-3-ac');
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
   P5-14 ユーザー – 購入履歴
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
    window.ktnRender = function () { applyRole(); };
    applyRole();
};

/* ════════════════════════════════════════════════════
   P3-15  LIAISON+コンソール
════════════════════════════════════════════════════ */
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

  // 1. タブナビ：クリックで各サブページへ
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

  // 4. インデックスピルのスクロール
  document.querySelectorAll('.p315-index-row').forEach(function (row) {
    row.addEventListener('click', function () {
      var el = document.getElementById(row.dataset.target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 5. 会場売約済モーダル
  var venueModal = document.getElementById('p315VenueModal');
  var venueModalBg = document.getElementById('p315VenueModalBg');
  var venueModalCancel = document.getElementById('p315VenueModalCancel');
  var venueModalOk = document.getElementById('p315VenueModalOk');
  var venueModalBody = document.getElementById('p315VenueModalBody');
  var _venueCard = null;

  document.querySelectorAll('.p315-venue-btn:not(:disabled)').forEach(function (btn) {
    btn.addEventListener('click', function () {
      _venueCard = btn.closest('.p315-work-card');
      var workName = btn.dataset.work || '作品';
      var count = parseInt(btn.dataset.count || '0', 10);
      if (venueModalBody) {
        venueModalBody.innerHTML = '「' + workName + '」を「売約済」に変更します。<br>' +
          (count > 0 ? '申込中の ' + count + '名 全員にキャンセル通知（メール）が送信されます。<br>' : '') +
          'この操作は取り消せません。';
      }
      if (venueModal) venueModal.hidden = false;
    });
  });
  function closeVenueModal() { if (venueModal) venueModal.hidden = true; }
  if (venueModalCancel) venueModalCancel.addEventListener('click', closeVenueModal);
  if (venueModalBg) venueModalBg.addEventListener('click', closeVenueModal);
  if (venueModalOk) {
    venueModalOk.addEventListener('click', function () {
      closeVenueModal();
      if (_venueCard) {
        var statusEl = _venueCard.querySelector('.p315-work-card__status');
        if (statusEl) statusEl.innerHTML = '<span class="aws aws-sold">売約済</span>';
        var actionsEl = _venueCard.querySelector('.p315-work-card__actions');
        if (actionsEl) actionsEl.style.display = 'none';
      }
      KTN.toast('会場売約済に変更しました。申込者にキャンセル通知を送信しました');
    });
  }

  // 6. 掲載取り下げモーダル
  var takedownModal = document.getElementById('p315TakedownModal');
  var takedownModalBg = document.getElementById('p315TakedownModalBg');
  var takedownModalCancel = document.getElementById('p315TakedownModalCancel');
  var takedownModalOk = document.getElementById('p315TakedownModalOk');
  var takedownModalBody = document.getElementById('p315TakedownModalBody');
  var _takedownCard = null;

  document.querySelectorAll('.p315-takedown-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      _takedownCard = btn.closest('.p315-work-card');
      var workName = btn.dataset.work || '作品';
      var count = parseInt(btn.dataset.count || '0', 10);
      if (takedownModalBody) {
        takedownModalBody.innerHTML = '「' + workName + '」の掲載を取り下げます。<br>' +
          (count > 0 ? '申込中の ' + count + '名 全員にキャンセル通知（メール）が送信されます。<br>' : '') +
          'この操作は取り消せません。';
      }
      if (takedownModal) takedownModal.hidden = false;
    });
  });
  function closeTakedownModal() { if (takedownModal) takedownModal.hidden = true; }
  if (takedownModalCancel) takedownModalCancel.addEventListener('click', closeTakedownModal);
  if (takedownModalBg) takedownModalBg.addEventListener('click', closeTakedownModal);
  if (takedownModalOk) {
    takedownModalOk.addEventListener('click', function () {
      closeTakedownModal();
      if (_takedownCard) _takedownCard.style.display = 'none';
      KTN.toast('掲載を取り下げました');
    });
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

  // 1. タブナビ：クリックで各サブページへ
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

  // 4. インデックスピルのスクロール
  document.querySelectorAll('.p315-index-row').forEach(function (row) {
    row.addEventListener('click', function () {
      var el = document.getElementById(row.dataset.target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 5. 会場売約済モーダル
  var venueModal = document.getElementById('p415VenueModal');
  var venueModalBg = document.getElementById('p415VenueModalBg');
  var venueModalCancel = document.getElementById('p415VenueModalCancel');
  var venueModalOk = document.getElementById('p415VenueModalOk');
  var venueModalBody = document.getElementById('p415VenueModalBody');
  var _venueCard = null;

  document.querySelectorAll('.p315-venue-btn:not(:disabled)').forEach(function (btn) {
    btn.addEventListener('click', function () {
      _venueCard = btn.closest('.p315-work-card');
      var workName = btn.dataset.work || '作品';
      var count = parseInt(btn.dataset.count || '0', 10);
      if (venueModalBody) {
        venueModalBody.innerHTML = '「' + workName + '」を「売約済」に変更します。<br>' +
          (count > 0 ? '申込中の ' + count + '名 全員にキャンセル通知（メール）が送信されます。<br>' : '') +
          'この操作は取り消せません。';
      }
      if (venueModal) venueModal.hidden = false;
    });
  });
  function closeVenueModal() { if (venueModal) venueModal.hidden = true; }
  if (venueModalCancel) venueModalCancel.addEventListener('click', closeVenueModal);
  if (venueModalBg) venueModalBg.addEventListener('click', closeVenueModal);
  if (venueModalOk) {
    venueModalOk.addEventListener('click', function () {
      closeVenueModal();
      if (_venueCard) {
        var statusEl = _venueCard.querySelector('.p315-work-card__status');
        if (statusEl) statusEl.innerHTML = '<span class="aws aws-sold">売約済</span>';
        var actionsEl = _venueCard.querySelector('.p315-work-card__actions');
        if (actionsEl) actionsEl.style.display = 'none';
      }
      KTN.toast('会場売約済に変更しました。申込者にキャンセル通知を送信しました');
    });
  }

  // 6. 掲載取り下げモーダル
  var takedownModal = document.getElementById('p415TakedownModal');
  var takedownModalBg = document.getElementById('p415TakedownModalBg');
  var takedownModalCancel = document.getElementById('p415TakedownModalCancel');
  var takedownModalOk = document.getElementById('p415TakedownModalOk');
  var takedownModalBody = document.getElementById('p415TakedownModalBody');
  var _takedownCard = null;

  document.querySelectorAll('.p315-takedown-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      _takedownCard = btn.closest('.p315-work-card');
      var workName = btn.dataset.work || '作品';
      var count = parseInt(btn.dataset.count || '0', 10);
      if (takedownModalBody) {
        takedownModalBody.innerHTML = '「' + workName + '」の掲載を取り下げます。<br>' +
          (count > 0 ? '申込中の ' + count + '名 全員にキャンセル通知（メール）が送信されます。<br>' : '') +
          'この操作は取り消せません。';
      }
      if (takedownModal) takedownModal.hidden = false;
    });
  });
  function closeTakedownModal() { if (takedownModal) takedownModal.hidden = true; }
  if (takedownModalCancel) takedownModalCancel.addEventListener('click', closeTakedownModal);
  if (takedownModalBg) takedownModalBg.addEventListener('click', closeTakedownModal);
  if (takedownModalOk) {
    takedownModalOk.addEventListener('click', function () {
      closeTakedownModal();
      if (_takedownCard) _takedownCard.style.display = 'none';
      KTN.toast('掲載を取り下げました');
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

  window.ktnRender = function () {};
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
  }
  syncMgmtBar();
  window.ktnRender = function () { syncMgmtBar(); };
};

/* ════════════════════════════════════════════════════
   P4-18  ギャラリー 取扱作家管理
════════════════════════════════════════════════════ */
KTN.pages['p4-18'] = function () {
  document.body.classList.add('p4-page');
  document.body.style.setProperty('--page-accent',        '#8b5e3c');
  document.body.style.setProperty('--page-accent-bg',     'rgba(139,94,60,.1)');
  document.body.style.setProperty('--page-accent-border', '#b07a50');

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

  window.ktnRender = function () {};
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
  function syncMgmtBar() {
    const r = window.ktnState && window.ktnState.role || 'gallery';
    document.body.classList.remove('p3-page', 'p4-page', 'p5-page');
    if (r === 'creator')      document.body.classList.add('p3-page');
    else if (r === 'gallery') document.body.classList.add('p4-page');
  }
  syncMgmtBar();
  window.ktnRender = function () { syncMgmtBar(); };
};
