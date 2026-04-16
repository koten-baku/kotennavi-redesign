/* ══════════════════════════════════════════════════════
   個展なび — ページ固有DOM操作
   kotennavi-pages.js
══════════════════════════════════════════════════════ */

window.KTN = window.KTN || {};
KTN.pages = KTN.pages || {};

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
        date: '2026.02.18', stars: 4, ci: false,
        body: '特に「ざわざわ（夜）」は長い時間立ち止まって見入ってしまいました。会期中にまた行きたいと思っています。'
      },
    ];
    var CI_ICON = '<svg viewBox="0 0 16 16" width="9" height="9" style="display:inline-block;vertical-align:middle"><circle cx="10" cy="5" r="4" fill="currentColor"/><circle cx="5" cy="11" r="2.4" fill="currentColor"/></svg>';
    list.innerHTML = RV.map(function (r) {
      var stars = '';
      for (var i = 0; i < 5; i++)
        stars += '<span class="rv-star"' + (i >= r.stars ? ' style="opacity:.18"' : '') + '>★</span>';
      var ci = r.ci
        ? '\u00a0\u25cf\u00a0<span class="rv-checkin-date">' + CI_ICON + '\u00a0' + r.checkinDate + '</span>'
        : '';
      return '<div class="review-item">' +
        '<div class="rv-hd">' +
        '<div class="rv-av" style="background:' + r.av + ';color:' + r.tc + '">' + r.ini + '</div>' +
        '<div style="flex:1;min-width:0">' +
        '<div class="rv-name"><span class="cb cb-user">user</span>\u00a0' + r.name + ci + '</div>' +
        '<div class="rv-stars">' + stars + '</div>' +
        '</div>' +
        '<div class="rv-date">' + r.date + '</div>' +
        '</div>' +
        '<div class="rv-body">' + r.body + '</div>' +
        '</div>';
    }).join('');
  })();

  /* ── 近くの展覧会（サイド） ── */
  (function () {
    var list = document.getElementById('p2NearbyList');
    if (!list || !window.P2_NEARBY) return;
    list.innerHTML = window.P2_NEARBY.slice(0, 4).map(function (e) {
      return '<a href="kotennavi-p2.html" class="p2-side-ec">' +
        '<div class="p2-side-ec__poster" style="background:' + e.bg + ';color:' + e.tc + '">' +
        (e.liaison ? '<div class="p2-side-ec__ldot"></div>' : '') +
        e.title.slice(0, 4) +
        '</div>' +
        '<div class="p2-side-ec__body">' +
        '<div class="p2-side-ec__name">' + e.title + '</div>' +
        '<div class="p2-side-ec__venue">' + e.venue + '</div>' +
        '<div><span class="p2-side-ec__badge">開催中</span></div>' +
        '</div>' +
        '</a>';
    }).join('');
  })();

  /* ── おすすめの展覧会グリッド ── */
  (function () {
    function buildExCards(data, gridId) {
      var grid = document.getElementById(gridId);
      if (!grid || !data) return;
      grid.innerHTML = data.map(function (e) {
        var li = e.liaison ? '<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>' : '';
        return '<div class="masonry-item"><a href="kotennavi-p2.html" class="ec">' +
          '<div class="ec__poster">' +
          '<div class="ec__poster-inner" style="background:' + e.bg + ';color:' + e.tc + '">' +
          '<div class="ec__poster-overlay">' +
          '<div class="ec__poster-dates"><span class="year">2026.</span><strong>' + (e.s || '') + '</strong><span class="sep">—</span><strong>' + (e.e || '') + '</strong></div>' +
          '<div class="ec__poster-meta"><span class="ec__remain-lt ec__remain-lt--live">開催中</span></div>' +
          '</div></div></div>' +
          '<div class="ec__body">' +
          '<div class="ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span><span class="sb sb-live"><span class="pulse"></span>開催中</span>' + li + '</div>' +
          '<div class="ec__title">' + e.title + '</div>' +
          '<div class="ec__venue">' + e.venue + '</div>' +
          '</div>' +
          '<div class="ec__foot">' +
          '<span class="ec-action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="12" height="12"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' + (e.int || 0) + '</span>' +
          '<span class="ec-action"><svg viewBox="0 0 16 16" fill="none" width="12" height="12"><circle cx="10" cy="5" r="4" fill="#7a8a99" fill-opacity=".5"/><circle cx="5" cy="11" r="2.4" fill="#7a8a99" fill-opacity=".5"/></svg>' + (e.ci || 0) + '</span>' +
          '</div>' +
          '</a></div>';
      }).join('');
    }
    buildExCards(window.P2_REC, 'p2RecGrid');
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

};

/* ────────────────────────────────────────────────────
   P2-1 スケジュール
──────────────────────────────────────────────────── */
KTN.pages['p2-1'] = function () {

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
  (function () {
    var grid = document.getElementById('p2SubRecGrid'); if (!grid) return;
    var DATA = [
      { title: '春の景色展', venue: '代官山ヒルサイドF', bg: 'linear-gradient(155deg,#f0e0d0,#c8a888)', tc: 'rgba(0,0,0,.28)', s: '02.20', e: '03.10', liaison: false, int: 21, ci: 4 },
      { title: '現代彫刻の冒険', venue: '神楽坂BOOK・ART', bg: 'linear-gradient(155deg,#e8d0d8,#b88898)', tc: 'rgba(255,255,255,.6)', s: '02.17', e: '03.07', liaison: true, int: 19, ci: 3 },
      { title: 'ポストカード展', venue: '吉祥寺 M&G', bg: 'linear-gradient(155deg,#d0e8e0,#88b8a8)', tc: 'rgba(0,0,0,.28)', s: '02.22', e: '03.12', liaison: false, int: 38, ci: 7 },
      { title: 'デジタルとアナログのあいだ', venue: '3331 Arts Chiyoda', bg: 'linear-gradient(155deg,#d8e8d0,#88b878)', tc: 'rgba(0,0,0,.28)', s: '02.15', e: '03.20', liaison: true, int: 14, ci: 2 },
    ];
    grid.innerHTML = DATA.map(function (e) {
      var li = e.liaison ? '<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>' : '';
      return (
        '<div class="masonry-item"><a href="kotennavi-p2.html" class="ec">' +
        '<div class="ec__poster">' +
        '<div class="ec__poster-inner" style="background:' + e.bg + ';color:' + e.tc + '">' +
        '<div class="ec__poster-overlay">' +
        '<div class="ec__poster-dates"><span class="year">2026.</span><strong>' + e.s + '</strong><span class="sep">—</span><strong>' + e.e + '</strong></div>' +
        '<div class="ec__poster-meta"><span class="ec__remain-lt ec__remain-lt--live">開催中</span></div>' +
        '</div></div></div>' +
        '<div class="ec__body">' +
        '<div class="ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span><span class="sb sb-live"><span class="pulse"></span>開催中</span>' + li + '</div>' +
        '<div class="ec__title">' + e.title + '</div>' +
        '<div class="ec__venue">' + e.venue + '</div>' +
        '</div>' +
        '<div class="ec__foot">' +
        '<span class="ec-action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="12" height="12"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' + e.int + '</span>' +
        '<span class="ec-action"><svg viewBox="0 0 16 16" fill="none" width="12" height="12"><circle cx="10" cy="5" r="4" fill="#7a8a99" fill-opacity=".5"/><circle cx="5" cy="11" r="2.4" fill="#7a8a99" fill-opacity=".5"/></svg>' + e.ci + '</span>' +
        '</div>' +
        '</a></div>'
      );
    }).join('');
  })();

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
};

/* ────────────────────────────────────────────────────
   P2-3 詳細 / P2-4 出展者
──────────────────────────────────────────────────── */
KTN.pages['p2-3'] = function () { };
KTN.pages['p2-4'] = function () {
  document.querySelectorAll('.p2-4-creator__watch button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var isOn = this.classList.toggle('ktn-btn--primary');
      this.classList.toggle('ktn-btn--ghost', !isOn);
    });
  });
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
};

/* ────────────────────────────────────────────────────
   P2-4  出展者（既存定義を拡張）
──────────────────────────────────────────────────── */
KTN.pages['p2-4'] = function () {
  /* watch ボタン */
  document.querySelectorAll('.p2-4-creator-card__watch').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var on = this.classList.toggle('is-active');
      this.innerHTML = on
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="13" height="13"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>watching'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="13" height="13"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>watch';
    });
  });
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
    { creator:'sato',   name:'佐藤 一朗', title:'白樺の記憶',   year:'2025', spec:'木彫・彩色 / H24×W18×D12 cm', status:'sale',  plus:true,  bg:'linear-gradient(155deg,#e0e8d0,#a0b888)', tc:'rgba(0,0,0,.28)', interest:11 },
    { creator:'sato',   name:'佐藤 一朗', title:'沈黙する形 #3', year:'2024', spec:'木版画 / 38.0×45.5 cm',                    status:'nsale', plus:false, bg:'linear-gradient(155deg,#d8c8b8,#a89878)', tc:'rgba(0,0,0,.28)', interest:5 },
  ];

  var STATUS_BADGE = {
    sale:    '<span class="aws aws-sale">販売中</span>',
    sold:    '<span class="aws aws-sold">SOLD</span>',
    nsale:   '<span class="aws aws-nsale">非売品</span>',
    inquiry: '<span class="aws aws-inquiry">要問合せ</span>',
  };

  function renderWork(w) {
    var cardClass = 'p25c' + (w.status === 'sold' ? ' p25c--sold' : '');
    var ribbon    = w.status === 'sold' ? '<div class="p25c__sold-ribbon">SOLD</div>' : '';
    var badgeMap  = {
      sale:    '<span class="p25c__badge p25c__badge--sale">\u8ca9\u58f2\u4e2d</span>',
      sold:    '',
      nsale:   '<span class="p25c__badge p25c__badge--nsale">\u975e\u58f2\u54c1</span>',
      inquiry: '<span class="p25c__badge p25c__badge--reserved">\u4e88\u7d04\u6e08</span>',
    };
    var badge = badgeMap[w.status] || '';
    var statusMap = { sale: 'forsale', inquiry: 'forsale', nsale: 'nsale', sold: 'sold' };
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

  /* ── おすすめの展覧会 ── */
  (function () {
    var g = document.getElementById('p25RecGrid');
    if (!g) return;
    var DATA = [
      { title: '春の景色展', venue: '代官山ヒルサイドF', bg: 'linear-gradient(155deg,#f0e0d0,#c8a888)', tc: 'rgba(0,0,0,.28)', s: '02.20', e: '03.10', liaison: false, int: 21, ci: 4 },
      { title: '現代彫刻の冒険', venue: '神楽坂BOOK・ART', bg: 'linear-gradient(155deg,#e8d0d8,#b88898)', tc: 'rgba(255,255,255,.6)', s: '02.17', e: '03.07', liaison: true, int: 19, ci: 3 },
      { title: 'ポストカード展', venue: '吉祥寺 M&G', bg: 'linear-gradient(155deg,#d0e8e0,#88b8a8)', tc: 'rgba(0,0,0,.28)', s: '02.22', e: '03.12', liaison: false, int: 38, ci: 7 },
      { title: '絵画の余白 — 山本純子展', venue: '恵比寿 SPACE NONA', bg: 'linear-gradient(155deg,#e0d8f0,#9880c8)', tc: 'rgba(255,255,255,.6)', s: '02.25', e: '03.08', liaison: false, int: 14, ci: 2 },
    ];
    g.innerHTML = DATA.map(function (e) {
      var li = e.liaison ? '<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>' : '';
      return '<div class="masonry-item"><a href="kotennavi-p2.html" class="ec">' +
        '<div class="ec__poster">' +
        '<div class="ec__poster-inner" style="background:' + e.bg + ';color:' + e.tc + '">' +
        '<div class="ec__poster-overlay">' +
        '<div class="ec__poster-dates"><span class="year">2026.</span><strong>' + e.s + '</strong><span class="sep">—</span><strong>' + e.e + '</strong></div>' +
        '<div class="ec__poster-meta"><span class="ec__remain-lt ec__remain-lt--live">開催中</span></div>' +
        '</div></div></div>' +
        '<div class="ec__body">' +
        '<div class="ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span><span class="sb sb-live"><span class="pulse"></span>開催中</span>' + li + '</div>' +
        '<div class="ec__title">' + e.title + '</div>' +
        '<div class="ec__venue">' + e.venue + '</div>' +
        '</div>' +
        '<div class="ec__foot">' +
        '<span class="ec-action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="12" height="12"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' + e.int + '</span>' +
        '<span class="ec-action"><svg viewBox="0 0 16 16" fill="none" width="12" height="12"><circle cx="10" cy="5" r="4" fill="#7a8a99" fill-opacity=".5"/><circle cx="5" cy="11" r="2.4" fill="#7a8a99" fill-opacity=".5"/></svg>' + e.ci + '</span>' +
        '</div>' +
        '</a></div>';
    }).join('');
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
    { creator:'tanaka', name:'田中 透', title:'言葉の断片 II',       year:'2024', spec:'油彩・麻布 / 45.5×38.0 cm',           status:'pending', price:180000, plus:false, bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', tc:'rgba(255,255,255,.6)',  interest:7,  applicants:2 },
    { creator:'tanaka', name:'田中 透', title:'音の気配',            year:'2026', spec:'油彩・キャンバス / 45.5×38.0 cm',      status:'pending', price:95000,  plus:true,  bg:'linear-gradient(155deg,#e8d8c0,#c4a870)', tc:'rgba(0,0,0,.3)',         interest:15, applicants:3 },
    /* 山田 葵 */
    { creator:'yamada', name:'山田 葵', title:'記憶の断層 #1',       year:'2025', spec:'写真・ジクレープリント / A2',           status:'sale',    price:55000,  plus:true,  bg:'linear-gradient(155deg,#d0c8e0,#8878b4)', tc:'rgba(255,255,255,.6)',  interest:16 },
    { creator:'yamada', name:'山田 葵', title:'記憶の断層 #2',       year:'2025', spec:'写真・ジクレープリント / A2',           status:'sale',    price:55000,  plus:true,  bg:'linear-gradient(155deg,#c8d8e8,#7898b8)', tc:'rgba(255,255,255,.6)',  interest:12 },
    { creator:'yamada', name:'山田 葵', title:'光の解像度',          year:'2026', spec:'写真・ミクストメディア / 60×80 cm',    status:'nsale',   price:null,   plus:false, bg:'linear-gradient(155deg,#e8d8c8,#c8a888)', tc:'rgba(0,0,0,.28)',        interest:8  },
    { creator:'yamada', name:'山田 葵', title:'朝の残響',            year:'2026', spec:'写真・ジクレープリント / A1',           status:'pending', price:68000,  plus:true,  bg:'linear-gradient(155deg,#d8e8d0,#88b880)', tc:'rgba(0,0,0,.28)',        interest:10, applicants:1 },
    /* 佐藤 一朗 */
    { creator:'sato',   name:'佐藤 一朗', title:'白樺の記憶',        year:'2025', spec:'木彫・彩色 / H24×W18×D12 cm',         status:'sale',    price:128000, plus:true,  bg:'linear-gradient(155deg,#e0e8d0,#a0b888)', tc:'rgba(0,0,0,.28)',        interest:11 },
    { creator:'sato',   name:'佐藤 一朗', title:'沈黙する形 #3',     year:'2024', spec:'木版画 / 38.0×45.5 cm',               status:'nsale',   price:null,   plus:false, bg:'linear-gradient(155deg,#d8c8b8,#a89878)', tc:'rgba(0,0,0,.28)',        interest:5  },
  ];

  function renderWork(w) {
    var cardClass = 'p25c' + (w.status === 'sold' ? ' p25c--sold' : '');
    var ribbon    = w.status === 'sold' ? '<div class="p25c__sold-ribbon">SOLD</div>' : '';
    var badgeMap  = {
      sale:    '<span class="p25c__badge p25c__badge--sale">\u8ca9\u58f2\u4e2d</span>',
      sold:    '',
      nsale:   '<span class="p25c__badge p25c__badge--nsale">\u975e\u58f2\u54c1</span>',
      pending: '<span class="p25c__badge p25c__badge--pending">\u7533\u8fbc\u4e2d</span>',
    };
    var badge = badgeMap[w.status] || '';
    var statusMap = { sale: 'forsale', pending: 'pending', nsale: 'nsale', sold: 'sold' };
    var dataStatus = statusMap[w.status] || 'nsale';
    var priceHtml = w.price
      ? '<div class="p25c__price"><span class="p25c__price-currency">&yen;</span>' + w.price.toLocaleString() + '<span class="p25c__price-tax">\uff08\u7a0e\u8fbc\uff09</span></div>'
      : '';
    var applicantsHtml = (w.status === 'pending' && w.applicants)
      ? '<span class="p25c__applicants">' + w.applicants + '\u4eba\u304c\u7533\u8fbc\u4e2d</span>'
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

  /* ── おすすめの展覧会 ── */
  (function () {
    var g = document.getElementById('p25RecGrid');
    if (!g) return;
    var DATA = [
      { title: '春の景色展', venue: '代官山ヒルサイドF', bg: 'linear-gradient(155deg,#f0e0d0,#c8a888)', tc: 'rgba(0,0,0,.28)', s: '02.20', e: '03.10', liaison: false, int: 21, ci: 4 },
      { title: '現代彫刻の冒険', venue: '神楽坂BOOK・ART', bg: 'linear-gradient(155deg,#e8d0d8,#b88898)', tc: 'rgba(255,255,255,.6)', s: '02.17', e: '03.07', liaison: true, int: 19, ci: 3 },
      { title: 'ポストカード展', venue: '吉祥寺 M&G', bg: 'linear-gradient(155deg,#d0e8e0,#88b8a8)', tc: 'rgba(0,0,0,.28)', s: '02.22', e: '03.12', liaison: false, int: 38, ci: 7 },
      { title: '絵画の余白 — 山本純子展', venue: '恵比寿 SPACE NONA', bg: 'linear-gradient(155deg,#e0d8f0,#9880c8)', tc: 'rgba(255,255,255,.6)', s: '02.25', e: '03.08', liaison: false, int: 14, ci: 2 },
    ];
    g.innerHTML = DATA.map(function (e) {
      var li = e.liaison ? '<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>' : '';
      return '<div class="masonry-item"><a href="kotennavi-p2.html" class="ec">' +
        '<div class="ec__poster" style="background:' + e.bg + '">' +
        '<div class="ec__poster-inner" style="min-height:160px">' +
        '<span class="ec__poster-text" style="color:' + e.tc + '">' + e.title.slice(0, 4) + '</span>' +
        '</div>' +
        '<div class="ec__poster-overlay">' +
        '<div class="ec__poster-dates">' +
        '<span class="year">2026.</span><strong>' + e.s + '</strong>' +
        '<span class="sep">\u2014</span>' +
        '<strong>' + e.e + '</strong>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="ec__body">' +
        '<div class="ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span><span class="sb sb-live"><span class="pulse"></span>\u958b\u50ac\u4e2d</span>' + li +
        '<button class="ktn-icon-btn" onclick="this.classList.toggle(\'on\')" data-action="interest">' +
        '<svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".45" stroke="#7a8a99" stroke-opacity=".3" stroke-width=".6" stroke-linejoin="round"/></svg>' +
        '<span class="tip">\u5174\u5473\u3042\u308b\uff01\u306b\u8ffd\u52a0\u3059\u308b</span>' +
        '</button>' +
        '</div>' +
        '<div class="ec__title">' + e.title + '</div>' +
        '<div class="ec__venue">' + e.venue + '</div>' +
        '</div>' +
        '<div class="ec__foot">' +
        '<span class="ec-action"><svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".45" stroke="#7a8a99" stroke-opacity=".3" stroke-width=".6"/></svg>' + e.int + '</span>' +
        '<span class="ec-action"><svg viewBox="0 0 16 16" fill="none"><circle cx="10" cy="5" r="4" fill="#7a8a99" opacity=".45"/><circle cx="5" cy="11" r="2.4" fill="#7a8a99" opacity=".45"/></svg>' + e.ci + '</span>' +
        '</div>' +
        '</a></div>';
    }).join('');
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
    { user:'Y.M', bg:'linear-gradient(135deg,#b8d8cc,#6a9e8a)', date:'2026.03.28',
      anon:false, purchased:true, stars:5,
      body:'展覧会で実物を見て一目惚れし、申込みました。自宅に届いて改めて向き合うと、光の当たり方によって全く違う表情を見せてくれます。大切にしていきます。' },
    { user:'T.K', bg:'linear-gradient(135deg,#d0d8f0,#8899cc)', date:'2026.03.15',
      anon:false, purchased:false, stars:4,
      body:'会場で拝見しました。緑の色が穏やかで、ずっと見ていられる作品です。次回作も楽しみにしています。' },
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
    var all = (_p6DemoComments[WORK.id] || []).concat(_localComments[WORK.id] || []);
    var avg = calcAvg(all);
    var el;
    el = document.getElementById('cmtSummary');
    if (el) {
      el.innerHTML = avg
        ? '<div style="text-align:right"><div class="cmt-avg-stars">' + starsHtml(Math.round(avg), '1rem') + '</div>' +
          '<div style="display:flex;align-items:baseline;gap:6px"><span class="cmt-avg">' + avg +
          '</span><span class="cmt-avg-count">/ 5（' + all.length + '件）</span></div></div>'
        : '<span style="font-size:.66rem;color:var(--lmuted)">まだ評価がありません</span>';
    }
    el = document.getElementById('commentsList');
    if (el) {
      el.innerHTML = all.length ? all.map(function(c) {
        return '<div class="cmt-card"><div class="cmt-card-header">' +
          '<div class="cmt-avatar" style="background:' + (c.bg || 'var(--lbg3)') + '">' +
          (c.anon ? '匿' : c.user.slice(0,1)) + '</div>' +
          '<div class="cmt-user"><div class="cmt-user-row">' +
          '<span class="cmt-user-name">' + (c.anon ? '匿名ユーザー' : c.user) + '</span>' +
          (c.purchased ? '<span class="cmt-verified">✓ 購入者</span>' : '') +
          '<span class="cmt-user-date">' + c.date + '</span></div>' +
          (opts.noRating ? '' : '<div class="cmt-stars">' + starsHtml(c.stars) + '</div>') +
          '</div></div>' +
          '<div class="cmt-body">' + c.body + '</div></div>';
      }).join('')
      : '<div class="cmt-empty"><div class="cmt-empty-icon">💬</div>' +
        '<div class="cmt-empty-txt">まだコメントはありません。<br>ログインして最初のコメントを投稿しましょう。</div></div>';
    }
    el = document.getElementById('commentPostArea');
    if (el) {
      if (!isLoggedIn()) {
        el.innerHTML = '<div class="cmt-login-prompt"><p>コメントを投稿するにはログインが必要です</p>' +
          '<button class="cmt-login-link" onclick="openModal(\'loginModal\')">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>' +
          'ログインしてコメントする</button></div>';
        _selectedStars = 0;
        return;
      }
      if (opts.noRating) {
        el.innerHTML = '<div class="cmt-post-box"><div class="cmt-post-lbl">コメントを投稿する</div>' +
          '<textarea class="cmt-textarea" id="cmtInput" placeholder="この作品への感想をお書きください…"></textarea>' +
          '<div class="cmt-post-footer"><label class="cmt-anon-label"><input type="checkbox" id="cmtAnon"> 匿名で投稿する</label>' +
          '<button class="cmt-submit" onclick="submitComment()">投稿する</button></div></div>';
      } else {
        el.innerHTML = '<div class="cmt-post-box"><div class="cmt-post-lbl">評価・コメントを投稿する</div>' +
          '<div class="cmt-star-input"><span class="cmt-star-input-lbl">評価：</span>' +
          '<div class="cmt-star-row" id="starInputRow">' +
          [1,2,3,4,5].map(function(n) {
            return '<button class="cmt-star-btn" data-star="' + n + '" onclick="selectStar(' + n + ')">★</button>';
          }).join('') +
          '</div><span class="cmt-star-selected-lbl" id="starLabel">' +
          (_selectedStars ? STAR_LABELS[_selectedStars] : '') + '</span></div>' +
          '<textarea class="cmt-textarea" id="cmtInput" placeholder="この作品への感想をお書きください…"></textarea>' +
          '<div class="cmt-post-footer"><label class="cmt-anon-label"><input type="checkbox" id="cmtAnon"> 匿名で投稿する</label>' +
          '<button class="cmt-submit" onclick="submitComment()">投稿する</button></div></div>';
        updateStarUI(_selectedStars);
      }
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
    if (!opts.noRating && !_selectedStars) { alert('星評価を選んでください'); return; }
    if (!txt) { alert('コメントを入力してください'); return; }
    var anon = document.getElementById('cmtAnon') ? document.getElementById('cmtAnon').checked : false;
    var id = WORK.id;
    if (!_localComments[id]) _localComments[id] = [];
    _localComments[id].push({
      user:'あなた', bg:'linear-gradient(135deg,#ddeeff,#88aadd)',
      date: new Date().toLocaleDateString('ja-JP',{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/\//g,'.'),
      anon: anon, purchased: _applyState === 'applied', stars: _selectedStars, body: txt,
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
};

/* ══════════════════════════════════════════════════════
   p2-12  LIAISON 作品管理
══════════════════════════════════════════════════════ */
KTN.pages['p2-12'] = function() {

  /* ── 販売状態マスタ ── */
  var STATUS = [
    { value:'inquiry',  label:'要問合せ' },
    { value:'sale',     label:'販売中' },
    { value:'applying', label:'申込中' },
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
    { value:'applying', label:'申込中' },
    { value:'sold',     label:'売約済' },
    { value:'nonsale',  label:'非売品' },
  ];

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
    li.innerHTML =
      '<div class="p2-12-work-card__handle" title="ドラッグで並び替え">'+HANDLE_SVG+'</div>'+
      '<div class="p2-12-work-card__thumb" style="background:'+w.bg+'"></div>'+
      '<div class="p2-12-work-card__body">'+
        '<div class="p2-12-work-card__title">'+w.title+'</div>'+
        '<div class="p2-12-work-card__meta">'+meta+'</div>'+
      '</div>'+
      '<div class="p2-12-work-card__controls">'+
        '<div class="p2-121-price-wrap">'+
          '<span class="p2-121-price-wrap__sign">¥</span>'+
          '<input class="p2-121-price-wrap__input" type="number" min="0" step="1000"'+
            ' placeholder="価格" aria-label="価格（税込）" value="'+(w.price||'')+'">'+
          '<span class="p2-121-price-wrap__tax">税込</span>'+
        '</div>'+
        '<select class="p2-12-status-sel" aria-label="販売状態">'+statusOpts(w.status)+'</select>'+
        '<button class="p2-12-remove-btn" type="button" data-id="'+w.id+'" aria-label="取り外す">'+
          '<svg class="p2-12-remove-btn__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13" aria-hidden="true"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>'+
          '<span class="p2-12-remove-btn__text">取り外す</span>'+
        '</button>'+
      '</div>';
    li.querySelector('.p2-12-remove-btn').addEventListener('click', handleRemove);

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

  // 0. ヒーロー初期設定
  if (typeof applyHeadImageMode === 'function') applyHeadImageMode(d.hasImage !== false);
  var activeBadge = document.getElementById('p3HeadActiveBadge');
  if (activeBadge && d.hasActiveExhibition) activeBadge.removeAttribute('hidden');

  // 1. watchボタン トグル（ヒーロー + サイド 連動・ktn-btn / on クラス）
  var watchBtns = document.querySelectorAll('[data-action="watch-p3"]');
  watchBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var isOn = btn.classList.contains('on');
      watchBtns.forEach(function(b){
        b.classList.toggle('on', !isOn);
        var tip = b.querySelector('.tip');
        if (tip) tip.textContent = isOn ? 'ウォッチする' : 'ウォッチ解除';
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

  // 2b. 自己紹介「もっと見る」→ プロフィールセクションへスムーススクロール
  var bioMore = document.getElementById('p3HeadBioMore');
  if (bioMore) {
    bioMore.addEventListener('click', function(){
      var target = document.getElementById('p3-sec-profile');
      if (!target) return;
      var hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hh') || '56', 10);
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - hh - 60, behavior: 'smooth' });
      // タブを「プロフィール」に切り替え
      document.querySelectorAll('.p3-tabnav__item').forEach(function(btn){
        btn.classList.toggle('is-active', btn.dataset.target === 'p3-sec-profile');
      });
    });
  }

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

  // 6. 作品グリッド生成（LIAISON優先ソート・.aw カード）
  var worksGrid = document.getElementById('p3WorksGrid');
  if (worksGrid && d.works) {
    var sorted = d.works.slice().sort(function(a,b){ return (b.liaison?1:0)-(a.liaison?1:0); });
    worksGrid.innerHTML = sorted.map(function(w){
      return '<a class="aw" href="#">'
        +'<div class="aw__img">'
        +(w.liaison ? '<div class="aw__lb"><span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span></div>' : '')
        +'<div class="aw__img-ph t-portrait" style="background:'+w.bg+'"></div>'
        +'</div>'
        +'<div class="aw__body">'
        +'<div class="aw__title-row"><div class="aw__title">'+w.title+'</div></div>'
        +'<div class="aw__spec">'+w.year+' / '+w.material+'</div>'
        +'</div></a>';
    }).join('');
  }

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
    var sections = document.querySelectorAll('.p3-layout__main > section[id]');
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
};
