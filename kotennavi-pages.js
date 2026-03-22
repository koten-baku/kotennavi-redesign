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
      grid.innerHTML = data.map(function (e, i) {
        return '<a href="kotennavi-p2.html" class="p2-ec" style="animation-delay:' + (i * 60) + 'ms">' +
          (e.liaison ? '<span class="p2-ec__ldot"></span>' : '') +
          '<div class="p2-ec__poster" style="background:' + e.bg + ';color:' + e.tc + '">' +
          '<span class="p2-ec__poster-txt">' + e.title + '</span>' +
          '<div class="p2-ec__poster-bar"><div class="p2-ec__drow">' +
          '<span class="p2-ec__dy">2026.</span><span class="p2-ec__dmd">' + (e.s || '') + '</span>' +
          '<span class="p2-ec__dsep">–</span><span class="p2-ec__dmd">' + (e.e || '') + '</span>' +
          '</div><div class="p2-ec__dmeta"><span class="p2-ec__dbadge ' +
          (e.open ? 'p2-ec__dbadge--open' : 'p2-ec__dbadge--cl') + '">' +
          (e.open ? '開催中' : '終了') + '</span></div></div>' +
          '</div>' +
          '<div class="p2-ec__body">' +
          '<div class="p2-ec__tr"><span class="p2-ec__tag">絵画</span>' +
          '<button class="p2-ec__bm" onclick="event.preventDefault();this.classList.toggle(\'is-active\')" aria-label="ブックマーク">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
          '</button></div>' +
          '<div class="p2-ec__name">' + e.title + '</div>' +
          '<div class="p2-ec__venue">' + e.venue + '</div>' +
          '<div class="p2-ec__foot">' +
          '<span class="p2-ec__cnt">❤ ' + (e.int || 0) + '</span>' +
          '<span class="p2-ec__cnt">📍 ' + (e.ci || 0) + '</span>' +
          '</div>' +
          '</div>' +
          '</a>';
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
        '<span class="p2-sub-near-item__badge">開催中</span>' +
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
    grid.innerHTML = DATA.map(function (e, i) {
      return (
        '<a href="kotennavi-p2.html" class="p2-ec" style="animation-delay:' + (i * 60) + 'ms">' +
        (e.liaison ? '<span class="p2-ec__ldot"></span>' : '') +
        '<div class="p2-ec__poster" style="background:' + e.bg + ';color:' + e.tc + '">' +
        '<span class="p2-ec__poster-txt">' + e.title + '</span>' +
        '<div class="p2-ec__poster-bar"><div class="p2-ec__drow">' +
        '<span class="p2-ec__dy">2026.</span><span class="p2-ec__dmd">' + e.s + '</span>' +
        '<span class="p2-ec__dsep">–</span><span class="p2-ec__dmd">' + e.e + '</span>' +
        '</div><div class="p2-ec__dmeta"><span class="p2-ec__dbadge p2-ec__dbadge--open">開催中</span></div></div>' +
        '</div>' +
        '<div class="p2-ec__body">' +
        '<div class="p2-ec__tr"><span class="p2-ec__tag">絵画</span>' +
        '<button class="p2-ec__bm" onclick="event.preventDefault();this.classList.toggle(\'is-active\')" aria-label="ブックマーク">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
        '</button></div>' +
        '<div class="p2-ec__name">' + e.title + '</div>' +
        '<div class="p2-ec__venue">' + e.venue + '</div>' +
        '<div class="p2-ec__foot">' +
        '<span class="p2-ec__cnt">❤ ' + e.int + '</span>' +
        '<span class="p2-ec__cnt">📍 ' + e.ci + '</span>' +
        '</div>' +
        '</div>' +
        '</a>'
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
