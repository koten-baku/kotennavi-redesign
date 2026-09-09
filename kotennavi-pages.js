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
      + (d.location ? '<div class="gc__location">' + d.location + (d.dist ? '<span class="gc__dist"> · ' + d.dist + '</span>' : '') + '</div>' : '')
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
/* 会期文字列は 'MM.DD'（＝当年）と 'YYYY.MM.DD'（終了済みなど別年）の2形を受ける。
   年つきは検索で過去の展覧会も扱えるようにしたときに追加した（追174-45）。年と月日を分けて返す */
function ecYmd(v) {
  var p = String(v || '').split('.');
  return p.length === 3 ? { y: p[0], md: p[1] + '.' + p[2] } : { y: '2026', md: String(v || '') };
}
function ecDow(md) {
  if (!md) return '';
  var p = String(md).split('.');
  if (p.length === 2) p = ['2026', p[0], p[1]];
  var d = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date(+p[0], +p[1] - 1, +p[2]).getDay()];
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
  /* 終了済み（status==='ended'）はステータスバッジを出さない＝sbHtml は空のまま（追174-53）。
     会期の日付そのものが終了を示すので、カード上で「終了」と重ねて言わない */

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

  var dS = ecYmd(e.s), dE = ecYmd(e.e);
  return '<div class="masonry-item"><a href="kotennavi-p2.html" class="ec">'
    + '<div class="ec__poster" style="background:' + e.bg + '">'
    + '<div class="ec__poster-noimg' + (e.light ? ' ec__poster-noimg--light' : '') + '" style="min-height:' + (e.imgH || 190) + 'px"></div>'
    + '<div class="ec__poster-overlay">'
    + '<div class="ec__poster-dates"><span class="year">' + dS.y + '.</span><strong>' + dS.md + '</strong>' + ecDow(e.s) + '<span class="sep">—</span><strong>' + dE.md + '</strong>' + ecDow(e.e) + '</div>'
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
   クラスタ `.ktn-cl` 共通ビルダ（P1 巻頭Opening／P10系 検索結果Featured 共用）

   1クラスタ＝**核となるコンテンツ1件＋その周辺コンテンツ**（作品・記事・レビュー・人）。
   「中心のまわりに話題が集まっている」構図を1ブロックで言い切る誌面装置で、
   ・P1 巻頭＝「このサイトは展覧会を幅広く扱い周辺も厚い」ことを説明せずに示す
   ・P10系 検索結果＝「周辺コンテンツを揃えると上位に出る」という出品側への誘因
   という2つの役割を同じ見た目で担う。CSS canonical は common.css `.ktn-cl`。
   デモの周辺データ（POOL）・リード文（NOTE）もここに集約する（ページIIFEへ複製しない）。
──────────────────────────────────────────────────── */
KTN.cl = (function () {
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var BADGE = {
    exhibition: '<span class="cb cb-content cb-exhibition">exhibition</span>',
    artwork: '<span class="cb cb-content cb-artwork">artwork</span>',
    article: '<span class="cb cb-content cb-article">article</span>',
    review:  '<span class="cb cb-content cb-review">review</span>',
    creator: '<span class="cb cb-person cb-creator">creator</span>',
    gallery: '<span class="cb cb-person cb-gallery">gallery</span>'
  };
  /* 核が何か（展覧会／作品／人）によって、同じデータが「核」にも「周辺」にもなる。
     exhibition を周辺種別に含めるのはそのため（P10-1 作品検索なら展覧会が周辺になる）。 */
  var TYPES = ['exhibition', 'artwork', 'article', 'review', 'creator', 'gallery'];

  /* 抽選はすべてシード付きPRNGで行う（`Math.random()` は使わない）＝同じ日・同じ条件なら
     何度描き直しても同じ紙面になる。巻頭も検索結果も「リロードで中身が変わる」と
     誌面の体裁が崩れ、内部リンクも毎回入れ替わってSEO上も不利なため（handoff 追174-12）。
     mulberry32＝32bit整数シードの軽量PRNG。隣り合うシードは最初の出目が似るので
     seedHash（乗算＋xorshift）で散らしてから渡す。 */
  function seedHash(n) { n = Math.imul(n ^ n >>> 16, 2246822507); n = Math.imul(n ^ n >>> 13, 3266489909); return (n ^ n >>> 16) | 0; }
  function mulberry32(a) {
    return function () {
      a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function rng(seed) { return mulberry32(seedHash(seed | 0)); }
  /* 文字列（検索条件など）を32bit整数シードへ */
  function strSeed(s) { var h = 0; s = String(s); for (var i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0; return h; }
  /* その日の通し番号（JST前提のローカル日付）。日付が変わると紙面が入れ替わる */
  function doy(d) { d = d || new Date(); return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000); }
  function shuffle(a, rnd) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ── デモ用の周辺コンテンツプール（exh＝紐づく展覧会の EX id）──
     P1・P10系の EX は同じ世界観・同じ id 体系なので1本で共用する。 */
  var POOL = {
    exhibition: [
      { ttl: '静寂のかたち — 田中透 油彩展', meta: '東京・白日ギャラリー／2026.06.28—07.13', cap: '日常の光と影を静謐な色面に還元する田中透、3年ぶりの個展。近作の油彩24点が並びます。', href: 'kotennavi-p2.html', bg: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', exh: 1 },
      { ttl: '墨聲 — 現代書道の地平', meta: '東京・東京書芸館／2026.06.20—07.10', cap: '筆と墨のいまを問う気鋭6名によるグループ展。会期はまもなく終了します。', href: 'kotennavi-p2.html', bg: 'linear-gradient(135deg,#2e2a28,#5a5450)', exh: 2 },
      { ttl: '光を編む — 篠原恵 写真展', meta: '東京・ギャラリー日向／2026.07.01—07.17', cap: '光そのものを被写体にした新作を実寸のプリントで。写真が「面」になる瞬間を確かめられます。', href: 'kotennavi-p2.html', bg: 'linear-gradient(135deg,#c0a880,#8a6e4a)', exh: 3 },
      { ttl: 'マチエールの実験', meta: '東京・gallery TRACE／2026.06.30—07.16', cap: '絵肌＝マチエールの物質感を主題に、支持体と画材の実験を重ねる4名の共同展示。', href: 'kotennavi-p2.html', bg: 'linear-gradient(135deg,#a05a4a,#6a3428)', exh: 5 },
      { ttl: '銅版のミクロコスモス — 早瀬涼', meta: '東京・ギャラリー刻／2026.07.04—07.18', cap: '刷るたびに変わる黒を主題にした銅版画の連作。版の疲れまで作品として引き受けています。', href: 'kotennavi-p2.html', bg: 'linear-gradient(135deg,#5a7a6a,#2e4638)', exh: 10 },
      { ttl: 'ガラスのなかの庭 — 三好文乃', meta: '福岡・天神ガラス工房／2026.06.29—07.19', cap: '器そのものより、置いたときにまわりへこぼれる光のほうを主役にしたガラスの新作展。', href: 'kotennavi-p2.html', bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)', exh: 12 }
    ],
    artwork: [
      { ttl: '光の断面', meta: '篠原恵／写真 ed.8・A1', cap: '窓辺に落ちた光の輪郭だけを切り出した一枚。会場では実寸のプリントで、写真が「面」になる瞬間を確かめられます。', href: 'kotennavi-p6.html', bg: 'linear-gradient(135deg,#c0a880,#8a6e4a)', exh: 3 },
      { ttl: 'オノマトペの庭', meta: '田中透／油彩・F30', cap: '音を色に置き換える試み。近づくと絵具の層が擦れ合い、音そのものが厚みを持って見えてきます。', href: 'kotennavi-p6.html', bg: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', exh: 1 },
      { ttl: '夜の稜線 II', meta: '早瀬涼／銅版画 ed.12', cap: '刷るたびにわずかに違う黒。版の疲れまで作品の一部として引き受けた連作の2点目です。', href: 'kotennavi-p6.html', bg: 'linear-gradient(135deg,#5a7a6a,#2e4638)', exh: 10 },
      { ttl: '器のための余白', meta: '三好文乃／ガラス', cap: '中身より、置いたときにまわりへこぼれる光のほうを主役にしたかった、と作家は言います。', href: 'kotennavi-p6.html', bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)', exh: 12 },
      { ttl: '白の連なり', meta: '加瀬千尋／アクリル・S20', cap: '白を重ねるほど、下の層の傷が浮かんでくる。消すための絵具で描いた連作です。', href: 'kotennavi-p6.html', bg: 'linear-gradient(135deg,#a05a4a,#6a3428)', exh: 5 },
      { ttl: '滲みの速度', meta: '高梨隆／墨・紙本', cap: '紙が墨を吸う速さだけを頼りに書いた一枚。読めなくていい、と作家は笑います。', href: 'kotennavi-p6.html', bg: 'linear-gradient(135deg,#4a4440,#2a2624)', exh: 2 }
    ],
    article: [
      { ttl: '展評：色彩の対話 — 現代絵画グループ展 会場レポート', meta: '田中透｜2026.03.06', cap: '6人の絵が会場でどう会話していたかを、展示順に沿って追いました。', href: 'kotennavi-p7.html', bg: 'linear-gradient(155deg,#e0d4bc,#b8a884)', exh: 5 },
      { ttl: '在廊日記：はじめての個展、13日間', meta: '篠原恵｜2026.02.18', cap: '在廊中に交わした会話と、売れた日・売れなかった日の記録です。', href: 'kotennavi-p7.html', bg: 'linear-gradient(155deg,#cfd8e2,#8fa0b4)', exh: 3 },
      { ttl: 'ギャラリーの選書 — 版画を見る前に読む3冊', meta: '白日ギャラリー｜2026.01.29', cap: '版画の見方が変わる3冊を、扱う側の視点で選びました。', href: 'kotennavi-p7.html', bg: 'linear-gradient(155deg,#d8cfc0,#a89880)', exh: 1 },
      { ttl: '搬入前夜 — 「抽象の温度」ができるまで', meta: 'アートスペース青｜2026.06.15', cap: '何もない壁が展示になるまでの一日を、写真で追いました。', href: 'kotennavi-p7.html', bg: 'linear-gradient(155deg,#e6cbb2,#b8794a)', exh: 13 },
      { ttl: '書の「読めなさ」について — 出品作家6人に聞く', meta: '東京書芸館｜2026.06.24', cap: '読めない字は失敗なのか。出品作家それぞれの答えを並べました。', href: 'kotennavi-p7.html', bg: 'linear-gradient(155deg,#cfc8c0,#6a625a)', exh: 2 },
      { ttl: '刷りの記録 — 同じ版から30枚を刷ってみた', meta: '早瀬涼｜2026.07.05', cap: '1枚目と30枚目を並べて、黒がどこまで変わるかを検証しました。', href: 'kotennavi-p7.html', bg: 'linear-gradient(155deg,#cddbd2,#5a7a6a)', exh: 10 },
      { ttl: '窯の温度を1℃変えると、光はどう変わるか', meta: '三好文乃｜2026.06.30', cap: '同じ型で3点、温度だけを変えて吹いた記録です。', href: 'kotennavi-p7.html', bg: 'linear-gradient(155deg,#cfe2de,#5e9a92)', exh: 12 }
    ],
    review: [
      { ttl: '静けさが濃くなる部屋だった', meta: 'M. Kondo｜2026.07.02', cap: '人が増えても音が増えない展示でした。帰り道まで静けさが残ります。', href: 'kotennavi-p8.html', bg: 'linear-gradient(135deg,#8a9aae,#4e5c70)', exh: 1 },
      { ttl: '書はもっと自由でいいらしい', meta: 'yuka｜2026.06.28', cap: '読めない字ばかりなのに、なぜか言いたいことは伝わってきます。', href: 'kotennavi-p8.html', bg: 'linear-gradient(135deg,#4a4440,#2a2624)', exh: 2 },
      { ttl: '写真展でこんなに歩いたのは初めて', meta: 'taku｜2026.07.05', cap: '一枚ずつ距離を変えて見たくなり、気づけば会場を3周していました。', href: 'kotennavi-p8.html', bg: 'linear-gradient(135deg,#8a8a70,#4e4e38)', exh: 14 },
      { ttl: '黒が何種類もあった', meta: 'nori｜2026.07.06', cap: '同じ黒に見えても、隣に並ぶと全部違う。刷りの差を初めて意識しました。', href: 'kotennavi-p8.html', bg: 'linear-gradient(135deg,#5a7a6a,#2e4638)', exh: 10 },
      { ttl: '光だけを見に行く展示だった', meta: 'hana｜2026.07.04', cap: '写っているものより、光の当たり方ばかり見ていました。', href: 'kotennavi-p8.html', bg: 'linear-gradient(135deg,#c0a880,#8a6e4a)', exh: 3 },
      { ttl: '触りたくなるのを我慢した', meta: 'ken｜2026.07.03', cap: '絵具の厚みが近くで見ると地形みたいで、つい顔を寄せてしまいます。', href: 'kotennavi-p8.html', bg: 'linear-gradient(135deg,#a05a4a,#6a3428)', exh: 5 },
      { ttl: '床に落ちる影がいちばん綺麗だった', meta: 'mio｜2026.07.07', cap: '作品そのものより、まわりの床に落ちた色を長く見ていました。', href: 'kotennavi-p8.html', bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)', exh: 12 }
    ],
    creator: [
      { ttl: '田中透', meta: '絵画・現代美術／東京', cap: '日常の光と影を静かな色面に還元する画家。個展は3年ぶりです。', href: 'kotennavi-p3.html', bg: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', ini: '田', exh: 1 },
      { ttl: '篠原恵', meta: '写真／東京', cap: '被写体ではなく光そのものを撮る写真家。実寸のプリントで見せます。', href: 'kotennavi-p3.html', bg: 'linear-gradient(135deg,#c0a880,#8a6e4a)', ini: '篠', exh: 3 },
      { ttl: '早瀬涼', meta: '版画／東京', cap: '刷るたびに変わる黒を主題にした銅版画の連作を続けています。', href: 'kotennavi-p3.html', bg: 'linear-gradient(135deg,#5a7a6a,#2e4638)', ini: '早', exh: 10 },
      { ttl: '三好文乃', meta: 'クラフト・ガラス／福岡', cap: '器そのものより、器がまわりへこぼす光を主役にするガラス作家。', href: 'kotennavi-p3.html', bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)', ini: '三', exh: 12 }
    ],
    /* ギャラリーの meta は所在地まで（営業時間はクラスタでは出さない） */
    gallery: [
      { ttl: '白日ギャラリー', meta: '東京・渋谷区', cap: '渋谷の路地奥。若手の初個展を継続して扱ってきた画廊です。', href: 'kotennavi-p4.html', bg: 'linear-gradient(135deg,#9a8a6a,#5e5238)', ini: '白', exh: 1 },
      { ttl: 'gallery TRACE', meta: '東京・港区', cap: '実験的な平面作品を中心に、年10本の企画展を組んでいます。', href: 'kotennavi-p4.html', bg: 'linear-gradient(135deg,#a05a4a,#6a3428)', ini: 'T', exh: 5 },
      { ttl: 'studio hue', meta: '東京・世田谷区', cap: '元印刷所を改装した会場。夜20時まで開いている珍しい画廊です。', href: 'kotennavi-p4.html', bg: 'linear-gradient(135deg,#b08aa0,#7a4e68)', ini: 'h', exh: 11 },
      { ttl: '天神ガラス工房', meta: '福岡・中央区', cap: '工房併設のギャラリー。制作風景をそのまま見ることができます。', href: 'kotennavi-p4.html', bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)', ini: '天', exh: 12 }
    ]
  };
  /* クラスタ主役のリード文（展覧会 id → 紹介文）。本番はDBの紹介文フィールド */
  var NOTE = {
    1:  '日常の光と影を静謐な色面に還元する田中透、3年ぶりの個展。近作の油彩24点が並びます。',
    2:  '筆と墨のいまを問う気鋭6名によるグループ展。会期はまもなく終了します。',
    3:  '光そのものを被写体にした新作を実寸のプリントで。写真が「面」になる瞬間を確かめられる展示です。',
    5:  '絵肌＝マチエールの物質感を主題に、支持体と画材の実験を重ねる4名の共同展示。',
    10: '刷るたびに変わる黒を主題にした銅版画の連作。版の疲れまで作品として引き受けています。',
    12: '器そのものより、置いたときにまわりへこぼれる光のほうを主役にしたガラスの新作展。'
  };

  /* id＝紐づく展覧会の EX id。o.skip＝周辺から外す種別（核と同じものを周辺に並べないため。
     例：展覧会が核なら 'exhibition' を外す）。o.skipTtl＝核と同名のデータを外す。 */
  function satsFor(id, o) {
    o = o || {};
    var out = [];
    TYPES.forEach(function (t) {
      if (o.skip && o.skip.indexOf(t) !== -1) return;
      POOL[t].forEach(function (d) {
        if (d.exh !== id) return;
        if (o.skipTtl && d.ttl === o.skipTtl) return;
        out.push({ t: t, d: d });
      });
    });
    return out;
  }
  /* 周辺コンテンツの種別内訳（資格判定用）＝{exhibition:n, artwork:n, article:n, …} */
  function satTypes(id, o) {
    var c = {};
    satsFor(id, o).forEach(function (s) { c[s.t] = (c[s.t] || 0) + 1; });
    return c;
  }
  /* 資格＝**種類がそろっていること**（量では順位を付けない）。need＝必要な周辺種別の配列。
     核が何かでその内訳が変わる（展覧会なら作品/記事/レビュー、作品なら展覧会/記事/レビュー…）が、
     「3種そろって初めて資格」というルール自体は全ページ共通。 */
  function hasTypes(id, need, o) {
    var t = satTypes(id, o);
    return need.every(function (k) { return !!t[k]; });
  }
  /* 周辺は種別を散らして選ぶ。単純シャッフルだと「作品3点」で埋まることがあり、
     "展覧会のまわりに話題（作品・記事・レビュー・人）が集まっている" という狙いが出ない。
     種別ごとに束ねてから1件ずつ取り出し、種別が尽きたら同種別の2件目に回る。 */
  function pickVaried(list, n, rnd) {
    var by = {}, order = [], out = [];
    shuffle(list.slice(), rnd).forEach(function (s) {
      if (!by[s.t]) { by[s.t] = []; order.push(s.t); }
      by[s.t].push(s);
    });
    while (out.length < n) {
      var got = 0;
      for (var i = 0; i < order.length && out.length < n; i++) {
        if (by[order[i]].length) { out.push(by[order[i]].shift()); got++; }
      }
      if (!got) break;
    }
    return out;
  }
  /* 周辺の「厚み」は抜粋2〜3件だけでは伝わらないので総量を数字で出す（canonical `.ktn-count`）。
     本番はDBの実数。デモではEXの人気度・チェックイン数から見かけの整合が取れる値を組み立てる。
     0件の種別は出さない（開催前の展覧会にレビュー0件と書くと厚みの訴求が逆に痩せる） */
  function countsHtml(parts) {
    return '<span class="ktn-count ktn-cl__counts">' + parts.join('・') + '</span>';
  }
  function counts(x) {
    var parts = ['作品<strong>' + Math.max(6, Math.round(x.pop / 4)) + '</strong>点',
                 '記事<strong>' + (1 + (x.id % 3)) + '</strong>本'];
    var rv = Math.round(x.ci / 6);
    if (rv > 0) parts.push('レビュー<strong>' + rv + '</strong>件');
    return countsHtml(parts);
  }
  function sb(x) {
    if (x.status === 'live')   return '<span class="sb sb-live"><span class="pulse"></span>開催中</span>';
    if (x.status === 'soon')   return '<span class="sb sb-soon">もうすぐ開催</span>';
    if (x.status === 'ending') return '<span class="sb sb-ending"><span class="ending-dot"></span>もうすぐ終了</span>';
    return '';
  }
  /* lead＝周辺カラムの1件目を大きく扱う（図版＋抜粋）。残り（罫線と文字だけの細い行）との間に
     主従を作る＝周辺カラム内部の階層。size:'lg' のときだけ有効 */
  function sat(t, d, lead) {
    return '<a class="ktn-cl-sat' + (lead ? ' ktn-cl-sat--lead' : '') + '" href="' + d.href + '">'
      + '<span class="ktn-cl-sat__thumb" style="background-image:' + d.bg + '">'
      + (d.ini ? '<span class="ktn-cl-sat__ini">' + esc(d.ini) + '</span>' : '')
      + '</span>'
      + '<span class="ktn-cl-sat__body">'
      + '<span class="ktn-cl__badges">' + BADGE[t] + '</span>'
      + '<span class="ktn-cl-sat__ttl">' + esc(d.ttl) + '</span>'
      + '<span class="ktn-cl-sat__meta">' + esc(d.meta) + '</span>'
      + (lead && d.cap ? '<span class="ktn-cl-sat__cap">' + esc(d.cap) + '</span>' : '')
      + '</span></a>';
  }
  /* o = {href,bg,ini,shape,badges,title,meta,counts,lead,sats,num,size,mod,satLabel}
     num＝誌面のスロット番号（巻頭のみ。検索結果では順位に読まれるので省略する）
     ini/shape＝人物が核のとき（クリエイター・ギャラリー）のイニシャルとアバター角丸 */
  function build(o) {
    var big = o.size === 'lg';
    return '<div class="ktn-cl' + (o.mod ? ' ' + o.mod : '') + '">'
      + (o.num ? '<span class="ktn-cl__num">0' + o.num + '</span>' : '')
      + '<div class="ktn-cl__main">'
      + '<a class="ktn-cl__exh" href="' + o.href + '">'
      + '<span class="ktn-cl__poster' + (o.shape ? ' ktn-cl__poster--' + o.shape : '') + '" style="background-image:' + o.bg + '">'
      + (o.ini ? '<span class="ktn-cl__ini">' + esc(o.ini) + '</span>' : '') + '</span>'
      + '<span class="ktn-cl__exh-body">'
      + '<span class="ktn-cl__badges">' + (o.badges || '') + '</span>'
      + '<span class="ktn-cl__ttl">' + esc(o.title) + '</span>'
      + '<span class="ktn-cl__meta">' + esc(o.meta) + '</span>'
      + (o.counts || '')
      + (o.lead ? '<span class="ktn-cl__lead">' + esc(o.lead) + '</span>' : '')
      + '</span></a>'
      + '<div class="ktn-cl__sat">'
      + '<span class="ktn-cl__satlabel">' + esc(o.satLabel || 'Around this show') + '</span>'
      + (o.sats || []).map(function (s, i) { return sat(s.t, s.d, big && i === 0); }).join('')
      + '</div></div></div>';
  }
  /* ── 核の種類ごとの定義 ──────────────────────────────
     need＝資格に必要な周辺種別（3種そろって初めて資格・量では順位を付けない）。
     核が変わると「まわりに何があるべきか」も変わるので、種別の組み合わせもここで持つ。
     周辺から核自身を外すのは種別ではなく**同名データの除外（skipTtl）**で行う
     ＝同じ展覧会の別の作品は周辺として出したいが、核そのものは重複させないため。 */
  var CORE = {
    exhibition: { need: ['artwork', 'article', 'review'],    label: 'Around this show' },
    artwork:    { need: ['exhibition', 'article', 'review'], label: 'Around this work' },
    creator:    { need: ['artwork', 'article', 'review'],    label: 'Around this creator' },
    gallery:    { need: ['exhibition', 'article', 'review'], label: 'Around this gallery' }
  };
  /* 資格判定の共通口。cx＝そのエンティティが属する展覧会文脈（EX id）、ttl＝核の名前 */
  function qualifies(core, cx, ttl) {
    if (!cx) return false;
    return hasTypes(cx, CORE[core].need, { skipTtl: ttl });
  }
  /* 周辺コンテンツの抽選も共通化（種別を散らして n 件） */
  function pick(core, cx, ttl, n, rnd) {
    return pickVaried(satsFor(cx, { skipTtl: ttl }), n, rnd);
  }

  /* 展覧会を核にしたクラスタ（P1巻頭・P10 Featured 共通の呼び口） */
  function exhCluster(x, o) {
    o = o || {};
    return build({
      href: o.href || 'kotennavi-p2.html',
      bg: x.bg,
      badges: BADGE.exhibition + sb(x),
      title: x.title,
      meta: x.area + '｜' + x.venue + '｜2026.' + x.s + '—' + x.e + '（' + x.remain + '）',
      counts: counts(x),
      lead: o.lead,
      sats: o.sats,
      satLabel: o.satLabel || CORE.exhibition.label,
      num: o.num, size: o.size, mod: o.mod
    });
  }
  /* 作品を核にしたクラスタ（P10-1）。o.badges でページ側の販売状態バッジを足せる */
  function workCluster(x, o) {
    o = o || {};
    return build({
      href: o.href || 'kotennavi-p6.html',
      bg: x.bg,
      badges: BADGE.artwork + (o.badges || ''),
      title: x.title,
      meta: o.meta,
      counts: o.counts,
      lead: o.lead,
      sats: o.sats,
      satLabel: o.satLabel || CORE.artwork.label,
      size: o.size, mod: o.mod
    });
  }
  /* 人（クリエイター／ギャラリー）を核にしたクラスタ（P10-2 / P10-3）。
     アバターの角丸はロール識別ルール準拠（creator 12px / gallery 4px） */
  function personCluster(role, x, o) {
    o = o || {};
    return build({
      href: o.href || (role === 'gallery' ? 'kotennavi-p4.html' : 'kotennavi-p3.html'),
      bg: x.avStyle,
      ini: x.ini,
      shape: role,
      badges: BADGE[role] + (o.badges || ''),
      title: x.name,
      meta: o.meta,
      counts: o.counts,
      lead: o.lead,
      sats: o.sats,
      satLabel: o.satLabel || CORE[role].label,
      size: o.size, mod: o.mod
    });
  }

  return {
    BADGE: BADGE, TYPES: TYPES, POOL: POOL, NOTE: NOTE, CORE: CORE,
    rng: rng, strSeed: strSeed, doy: doy, shuffle: shuffle,
    satsFor: satsFor, satTypes: satTypes, hasTypes: hasTypes,
    qualifies: qualifies, pick: pick, pickVaried: pickVaried,
    counts: counts, countsHtml: countsHtml, sb: sb, sat: sat, build: build,
    exhCluster: exhCluster, workCluster: workCluster, personCluster: personCluster
  };
})();

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
    if (typeof window.p2SyncOwnerNotice === 'function') window.p2SyncOwnerNotice();
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
          <div class="p2-side-ec__badge-row"><span class="cb cb-content cb-exhibition">exhibition</span></div>
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

/* 投稿者（authorHref）はp3(クリエイター)かp4(ギャラリー)のいずれか＝パンくずStep2以降はこの投稿者チェーンに従う（掲載先leadHrefとは別軸） */
function p7BreadcrumbFor(d) {
  var isGallery = d.authorHref === 'kotennavi-p4.html';
  return isGallery
    ? [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['記事一覧', 'kotennavi-p4-2.html'], [d.title, null]]
    : [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['記事一覧', 'kotennavi-p3-2.html'], [d.title, null]];
}

/* 現在選択中の掲載先デモ文脈（common.jsの_renderHeaderがロール切替等の再描画時にも
   このキーを参照してパンくずを再構築する＝window.P7_CURRENT_CONTEXT として公開） */
var P7_CURRENT_CONTEXT = 'artwork';

function switchP7Context(key, btn) {
  var d = P7_CONTEXTS[key];
  if (!d) return;
  P7_CURRENT_CONTEXT = key;
  var group = btn.parentElement.querySelectorAll('button[onclick^="switchP7Context"]');
  for (var i = 0; i < group.length; i++) group[i].classList.remove('on');
  btn.classList.add('on');

  var bcEl = document.getElementById('ktnBc');
  if (bcEl) bcEl.innerHTML = renderBc('p7', p7BreadcrumbFor(d));

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
        if (count) count.textContent = shown + '点';
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
    if (cnt) cnt.textContent = WORKS.length + '点';
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
        var reason = card.getAttribute('data-reason') || '';
        return { iso: iso, review: review, stars: stars, reason: reason };
    }

    function applyCardData(card, data) {
        var row = card.querySelector('.p5-exh-card__reason-row');
        if (!row) return;
        if (data.reason) card.setAttribute('data-reason', data.reason);
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
                title: 'チェックインを編集', date: cur.iso, reason: cur.reason, stars: cur.stars, review: cur.review,
                onSave: function (d) { applyCardData(card, d); }
            });
        } else if (act === 'review') {
            openCheckinEditModal({
                title: hasReview ? 'レビューを編集' : 'レビューを書く',
                date: cur.iso, reason: cur.reason, stars: cur.stars, review: cur.review, focusReview: true,
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

  // 3. 期間セレクター：折れ線チャートを実データ生成で再描画
  var periodBox = document.getElementById('p312Period');
  if (periodBox) {
    KTN.renderTrend('p312Trend', '30', 296);
    periodBox.querySelectorAll('.ins-period__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        periodBox.querySelectorAll('.ins-period__btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        KTN.renderTrend('p312Trend', btn.dataset.period, 296);
      });
    });
  }

  // 3.5 ウォッチャーの推移（週次・直近12週固定＝期間セレクターなし）
  KTN.renderWeeklyTrend('p312WatchTrend', 12, 26, '人');

  // 4. LIAISON+ファネル：未申請アカウントは実績データの代わりに案内文言を表示
  function syncFunnel() {
    var applied = typeof ktnLPApplied === 'function' && ktnLPApplied();
    var funnel = document.getElementById('p312Funnel');
    var note = document.getElementById('p312FunnelNote');
    var notice = document.getElementById('p312FunnelNotice');
    if (funnel) funnel.hidden = !applied;
    if (note) note.hidden = !applied;
    if (notice) notice.hidden = applied;
  }
  syncFunnel();
  var _prevRenderP312 = window.ktnRender;
  window.ktnRender = function () { if (typeof _prevRenderP312 === 'function') _prevRenderP312(); syncFunnel(); };

  // 5. 展覧会・記事・作品への関心：タブ切替＋年別グループ・ページング・列ソート
  var P312_INS = {
    exh: [
      { href: 'kotennavi-p2.html', name: '声と線 — 新作展', year: 2026, period: '2026.3.20–3.31', periodSort: 20260320, stats: ['654', '34<span class="unit">人</span>', '58<span class="unit">件</span>'] },
      { href: 'kotennavi-p2.html', name: 'あなたが知らないオノマトペ — 田中透 個展', year: 2026, period: '2026.2.18–3.5', periodSort: 20260218, stats: ['892', '48<span class="unit">人</span>', '76<span class="unit">件</span>'] },
      { href: 'kotennavi-p2.html', name: '色と音のあいだ 個展', year: 2025, period: '2025.11.10–11.20', periodSort: 20251110, stats: ['512', '28<span class="unit">人</span>', '44<span class="unit">件</span>'] },
      { href: 'kotennavi-p2.html', name: '線と余白', year: 2025, period: '2025.6.1–6.10', periodSort: 20250601, stats: ['276', '14<span class="unit">人</span>', '18<span class="unit">件</span>'] },
      { href: 'kotennavi-p2.html', name: 'ざわざわ — 田中透 新作展', year: 2024, period: '2024.10.12–10.27', periodSort: 20241012, stats: ['398', '22<span class="unit">人</span>', '32<span class="unit">件</span>'] },
      { href: 'kotennavi-p2.html', name: 'ふわふわ — 春の新作', year: 2024, period: '2024.4.13–4.28', periodSort: 20240413, stats: ['198', '10<span class="unit">人</span>', '10<span class="unit">件</span>'] },
    ],
    /* linkTarget＝投稿先。'creator'（自分のクリエイターページへの直接投稿）はノーマーク＝投稿先列を空セルにする */
    article: [
      { href: 'kotennavi-p3-2.html', name: 'オノマトペの庭 制作について', year: 2026, linkTarget: 'artwork', stats: ['720', '11<span class="unit">件</span>'] },
      { href: 'kotennavi-p3-2.html', name: '展示の見どころ — 5つの版表現', year: 2026, linkTarget: 'exhibition', stats: ['260', '2<span class="unit">件</span>'] },
      { href: 'kotennavi-p3-2.html', name: 'オノマトペと絵画のあいだ', year: 2026, linkTarget: 'creator', stats: ['1,240', '18<span class="unit">件</span>'] },
      { href: 'kotennavi-p3-2.html', name: '個展を終えて — 振り返りと感謝', year: 2025, linkTarget: 'exhibition', stats: ['540', '8<span class="unit">件</span>'] },
      { href: 'kotennavi-p3-2.html', name: '音から生まれる色の話', year: 2025, linkTarget: 'creator', stats: ['980', '14<span class="unit">件</span>'] },
      { href: 'kotennavi-p3-2.html', name: '絵の具の混ぜ方と感情の話', year: 2025, linkTarget: 'creator', stats: ['410', '5<span class="unit">件</span>'] },
    ],
    artwork: [
      { href: 'kotennavi-p3-3.html', name: '《ふわふわ》', year: 2026, stats: ['320', '148<span class="unit">件</span>', '3<span class="unit">回</span>'] },
      { href: 'kotennavi-p3-3.html', name: '《しんしん》', year: 2026, stats: ['198', '88<span class="unit">件</span>', '2<span class="unit">回</span>'] },
      { href: 'kotennavi-p3-3.html', name: '《うきうき》', year: 2026, stats: ['164', '74<span class="unit">件</span>', '2<span class="unit">回</span>'] },
      { href: 'kotennavi-p3-3.html', name: '《わくわく》', year: 2026, stats: ['128', '58<span class="unit">件</span>', '1<span class="unit">回</span>'] },
      { href: 'kotennavi-p3-3.html', name: '《ドキドキ #3》', year: 2025, stats: ['245', '112<span class="unit">件</span>', '2<span class="unit">回</span>'] },
      { href: 'kotennavi-p3-3.html', name: '《きらきら》', year: 2025, stats: ['77', '41<span class="unit">件</span>', '1<span class="unit">回</span>'] },
    ],
  };
  var P312_PER_PAGE = 4;
  var p312InsPage = { exh: 1, article: 1, artwork: 1 };
  var p312InsGrouped = { exh: true, article: true, artwork: true };
  var p312InsEls = {
    exh: { list: document.getElementById('p312ExhList'), pager: document.getElementById('p312ExhPager'), head: document.getElementById('p312ExhHead') },
    article: { list: document.getElementById('p312ArticleList'), pager: document.getElementById('p312ArticlePager'), head: document.getElementById('p312ArticleHead') },
    artwork: { list: document.getElementById('p312ArtworkList'), pager: document.getElementById('p312ArtworkPager'), head: document.getElementById('p312ArtworkHead') },
  };
  function p312SortValue(it, key) {
    if (key === 'name') return it.name;
    if (key === 'period') return it.periodSort || 0;
    if (key === 'linkTarget') return KTN.insightList.targetLabel(it.linkTarget); // creator/gallery は '' ＝ノーマーク同士でまとまる
    if (key.indexOf('stat') === 0) return KTN.insightList.numFromHtml(it.stats[parseInt(key.replace('stat', ''), 10)]);
    return 0;
  }
  function renderP312Ins(type) {
    var els = p312InsEls[type];
    if (!els.list) return;
    p312InsPage[type] = KTN.insightList.render(els.list, els.pager, P312_INS[type], p312InsPage[type], P312_PER_PAGE, function (p) {
      p312InsPage[type] = p;
      renderP312Ins(type);
    }, p312InsGrouped[type]);
  }
  ['exh', 'article', 'artwork'].forEach(renderP312Ins);
  ['exh', 'article', 'artwork'].forEach(function (type) {
    KTN.insightList.bindSort(p312InsEls[type].head, function (key, dir) {
      P312_INS[type].sort(function (a, b) {
        var av = p312SortValue(a, key), bv = p312SortValue(b, key);
        if (typeof av === 'string') return av.localeCompare(bv, 'ja') * dir;
        return (av - bv) * dir;
      });
      p312InsGrouped[type] = false;
      p312InsPage[type] = 1;
      renderP312Ins(type);
    });
  });

  var p312InsTabs = document.getElementById('p312InsTabs');
  if (p312InsTabs) {
    p312InsTabs.querySelectorAll('.p5-type-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        p312InsTabs.querySelectorAll('.p5-type-tab').forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        document.querySelectorAll('.p312-ins-panel').forEach(function (panel) {
          panel.hidden = panel.dataset.panel !== tab.dataset.tab;
        });
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
    KTN.renderTrend('p412Trend', '30', 247);
    periodBox.querySelectorAll('.ins-period__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        periodBox.querySelectorAll('.ins-period__btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        KTN.renderTrend('p412Trend', btn.dataset.period, 247);
      });
    });
  }

  // ウォッチャーの推移（週次・直近12週固定＝期間セレクターなし）
  KTN.renderWeeklyTrend('p412WatchTrend', 12, 14, '人');

  // LIAISON+ファネル：未申請アカウントは実績データの代わりに案内文言を表示
  function syncFunnel() {
    var applied = typeof ktnLPApplied === 'function' && ktnLPApplied();
    var funnel = document.getElementById('p412Funnel');
    var note = document.getElementById('p412FunnelNote');
    var notice = document.getElementById('p412FunnelNotice');
    if (funnel) funnel.hidden = !applied;
    if (note) note.hidden = !applied;
    if (notice) notice.hidden = applied;
  }
  syncFunnel();
  var _prevRenderP412 = window.ktnRender;
  window.ktnRender = function () { if (typeof _prevRenderP412 === 'function') _prevRenderP412(); syncFunnel(); };

  // 5. 展覧会・記事・作品への関心：タブ切替＋年別グループ・ページング・列ソート
  var P412_INS = {
    exh: [
      { href: 'kotennavi-p2.html', name: '声と線 — 新作展', year: 2026, period: '2026.3.20–3.31', periodSort: 20260320, stats: ['560', '44<span class="unit">人</span>', '42<span class="unit">件</span>'] },
      { href: 'kotennavi-p2.html', name: 'あなたが知らないオノマトペ — 田中透 個展', year: 2026, period: '2026.2.18–3.5', periodSort: 20260218, stats: ['780', '62<span class="unit">人</span>', '58<span class="unit">件</span>'] },
      { href: 'kotennavi-p2.html', name: '色と音のあいだ 個展', year: 2025, period: '2025.11.10–11.20', periodSort: 20251110, stats: ['420', '36<span class="unit">人</span>', '32<span class="unit">件</span>'] },
      { href: 'kotennavi-p2.html', name: '線と余白', year: 2025, period: '2025.6.1–6.10', periodSort: 20250601, stats: ['220', '20<span class="unit">人</span>', '14<span class="unit">件</span>'] },
      { href: 'kotennavi-p2.html', name: 'ざわざわ — 田中透 新作展', year: 2024, period: '2024.10.12–10.27', periodSort: 20241012, stats: ['310', '28<span class="unit">人</span>', '24<span class="unit">件</span>'] },
      { href: 'kotennavi-p2.html', name: '秋の個展 2023', year: 2023, period: '2023.10.7–10.22', periodSort: 20231007, stats: ['150', '13<span class="unit">人</span>', '6<span class="unit">件</span>'] },
    ],
    /* linkTarget＝投稿先。'gallery'（自分のギャラリーページへの直接投稿）はノーマーク＝投稿先列を空セルにする */
    article: [
      { href: 'kotennavi-p4-2.html', name: '《オノマトペの庭》について — ギャラリーノート', year: 2026, linkTarget: 'artwork', stats: ['410', '9<span class="unit">件</span>'] },
      { href: 'kotennavi-p4-2.html', name: 'アーティストトーク開催のお知らせ', year: 2026, linkTarget: 'exhibition', stats: ['320', '7<span class="unit">件</span>'] },
      { href: 'kotennavi-p4-2.html', name: '展示レポート — 音と色が交差する空間へ', year: 2026, linkTarget: 'exhibition', stats: ['480', '11<span class="unit">件</span>'] },
      { href: 'kotennavi-p4-2.html', name: '田中 透×Gallery SOIL 渋谷 制作インタビュー「音が見えて、絵が聞こえる」', year: 2026, linkTarget: 'artwork', stats: ['590', '13<span class="unit">件</span>'] },
      { href: 'kotennavi-p4-2.html', name: 'ギャラリーが語る「素材と空間」— SOIL NOTES vol.3', year: 2026, linkTarget: 'gallery', stats: ['680', '14<span class="unit">件</span>'] },
      { href: 'kotennavi-p4-2.html', name: '渋谷で巡るアートスポット5選', year: 2026, linkTarget: 'gallery', stats: ['260', '5<span class="unit">件</span>'] },
      { href: 'kotennavi-p4-2.html', name: '2025年 Gallery SOIL 渋谷 年間振り返り', year: 2025, linkTarget: 'gallery', stats: ['190', '3<span class="unit">件</span>'] },
      { href: 'kotennavi-p4-2.html', name: 'Gallery SOIL 渋谷 個展なびへの掲載開始のお知らせ', year: 2025, linkTarget: 'gallery', stats: ['140', '2<span class="unit">件</span>'] },
    ],
    artwork: [
      { href: 'kotennavi-p4-14.html', name: '《静かな水面》', year: 2025, stats: ['245', '98<span class="unit">件</span>', '2<span class="unit">回</span>'] },
      { href: 'kotennavi-p4-14.html', name: '《余白のコンポジション》', year: 2025, stats: ['198', '82<span class="unit">件</span>', '2<span class="unit">回</span>'] },
      { href: 'kotennavi-p4-14.html', name: '《朝の気配》', year: 2024, stats: ['164', '68<span class="unit">件</span>', '1<span class="unit">回</span>'] },
      { href: 'kotennavi-p4-14.html', name: '《海の記憶》', year: 2024, stats: ['49', '21<span class="unit">件</span>', '1<span class="unit">回</span>'] },
      { href: 'kotennavi-p4-14.html', name: '《庭の記憶》', year: 2023, stats: ['128', '54<span class="unit">件</span>', '1<span class="unit">回</span>'] },
      { href: 'kotennavi-p4-14.html', name: '《光の粒》', year: 2023, stats: ['92', '38<span class="unit">件</span>', '1<span class="unit">回</span>'] },
    ],
  };
  var P412_PER_PAGE = 4;
  var p412InsPage = { exh: 1, article: 1, artwork: 1 };
  var p412InsGrouped = { exh: true, article: true, artwork: true };
  var p412InsEls = {
    exh: { list: document.getElementById('p412ExhList'), pager: document.getElementById('p412ExhPager'), head: document.getElementById('p412ExhHead') },
    article: { list: document.getElementById('p412ArticleList'), pager: document.getElementById('p412ArticlePager'), head: document.getElementById('p412ArticleHead') },
    artwork: { list: document.getElementById('p412ArtworkList'), pager: document.getElementById('p412ArtworkPager'), head: document.getElementById('p412ArtworkHead') },
  };
  function p412SortValue(it, key) {
    if (key === 'name') return it.name;
    if (key === 'period') return it.periodSort || 0;
    if (key === 'linkTarget') return KTN.insightList.targetLabel(it.linkTarget); // creator/gallery は '' ＝ノーマーク同士でまとまる
    if (key.indexOf('stat') === 0) return KTN.insightList.numFromHtml(it.stats[parseInt(key.replace('stat', ''), 10)]);
    return 0;
  }
  function renderP412Ins(type) {
    var els = p412InsEls[type];
    if (!els.list) return;
    p412InsPage[type] = KTN.insightList.render(els.list, els.pager, P412_INS[type], p412InsPage[type], P412_PER_PAGE, function (p) {
      p412InsPage[type] = p;
      renderP412Ins(type);
    }, p412InsGrouped[type]);
  }
  ['exh', 'article', 'artwork'].forEach(renderP412Ins);
  ['exh', 'article', 'artwork'].forEach(function (type) {
    KTN.insightList.bindSort(p412InsEls[type].head, function (key, dir) {
      P412_INS[type].sort(function (a, b) {
        var av = p412SortValue(a, key), bv = p412SortValue(b, key);
        if (typeof av === 'string') return av.localeCompare(bv, 'ja') * dir;
        return (av - bv) * dir;
      });
      p412InsGrouped[type] = false;
      p412InsPage[type] = 1;
      renderP412Ins(type);
    });
  });

  var p412InsTabs = document.getElementById('p412InsTabs');
  if (p412InsTabs) {
    p412InsTabs.querySelectorAll('.p5-type-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        p412InsTabs.querySelectorAll('.p5-type-tab').forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        document.querySelectorAll('.p412-ins-panel').forEach(function (panel) {
          panel.hidden = panel.dataset.panel !== tab.dataset.tab;
        });
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
  // window.p211RoleSync() は setConfirmed()/toggleLiaisonMode() を呼び、それらは
  // 内部で ktnRender() を呼ぶ（KTN.exh 変更をヘッダー等へ反映するため）。
  // ktnRender() の呼び先はこの syncMgmtBar を含むため、ガード無しだと
  // syncMgmtBar → p211RoleSync → setConfirmed → ktnRender → syncMgmtBar … の無限再帰になり、
  // スタックオーバーフローで setConfirmed 内のボタン.on切替コードまで到達できず
  // 「確認前」ボタンが選択できなくなる（2026-08-27 発見・修正）。再入中は素通りさせる。
  var _p211Syncing = false;
  function syncMgmtBar() {
    if (_p211Syncing) return;
    _p211Syncing = true;
    try {
      const r = window.ktnState && window.ktnState.role || 'gallery';
      document.body.classList.remove('p3-page', 'p4-page', 'p5-page');
      if (r === 'creator')      document.body.classList.add('p3-page');
      else if (r === 'gallery') document.body.classList.add('p4-page');
      // オーナーは仮にギャラリー（YUGEN Gallery）固定＝HTML直書き。ロール切替では変えない
      // 開催場所のロール別 default・ヘルプはページ内スクリプトが担当（未定義なら no-op）
      if (typeof window.p211RoleSync === 'function') window.p211RoleSync();
    } finally {
      _p211Syncing = false;
    }
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
    const roleWord1 = document.getElementById('p612RoleWord1');
    if (roleWord1) roleWord1.textContent = r === 'gallery' ? 'ギャラリーページ' : 'クリエイターページ';
    // 興味あり！の推移：作品が常時掲載されるクリエイターページのみ対象（ギャラリーは展覧会単位の陳列のため非表示）
    const interestSection = document.getElementById('p612InterestSection');
    if (interestSection) interestSection.hidden = (r === 'gallery');
  }
  syncMgmtBar();

  var periodBox = document.getElementById('p612Period');
  if (periodBox) {
    KTN.renderTrend('p612Trend', '30', 61);
    periodBox.querySelectorAll('.ins-period__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        periodBox.querySelectorAll('.ins-period__btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        KTN.renderTrend('p612Trend', btn.dataset.period, 61);
      });
    });
  }

  KTN.renderWeeklyTrend('p612InterestTrend', 12, 19, '件');

  // 出展したことがない作品（creatorのみ・galleryは展覧会単位でしか掲載されないため常に「出展あり」扱い）
  function isNeverExhibited() {
    var r = window.ktnState && window.ktnState.role || 'creator';
    return r === 'creator' && !!(window.KTN && KTN.exh && KTN.exh.exhibited === false);
  }

  // 4. 展覧会ごとの問い合わせ・購入申込：出展実績がない場合は一覧を空にし案内文言のみ表示
  function syncExhList() {
    var neverExhibited = isNeverExhibited();
    var list = document.getElementById('p612ExhList');
    var zero = document.getElementById('p612ExhZero');
    var note = document.getElementById('p612ExhNote');
    if (list) list.hidden = neverExhibited;
    if (zero) zero.hidden = !neverExhibited;
    if (note) note.hidden = neverExhibited;
  }
  syncExhList();

  // 5. LIAISON+ファネル：出展したことがない作品はセクションごと非表示（販売の動き自体が存在しないため）
  function syncFunnel() {
    var neverExhibited = isNeverExhibited();
    var section = document.getElementById('p612FunnelSection');
    if (section) section.hidden = neverExhibited;
    if (neverExhibited) return;

    var isPlus = !!(window.KTN && KTN.exh && KTN.exh.liaison === 'plus');
    var funnel = document.getElementById('p612Funnel');
    var sold = document.getElementById('p612SoldNotice');
    var note = document.getElementById('p612FunnelNote');
    var notice = document.getElementById('p612FunnelNotice');
    if (funnel) funnel.hidden = !isPlus;
    if (sold) sold.hidden = !isPlus;
    if (note) note.hidden = !isPlus;
    if (notice) notice.hidden = isPlus;
  }
  syncFunnel();

  var _prevRender = window.ktnRender;
  window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); syncMgmtBar(); syncExhList(); syncFunnel(); };
};

/* ════════════════════════════════════════════════════
   P7-11  記事 新規投稿・編集
════════════════════════════════════════════════════ */
KTN.pages['p7-11'] = function () {
  function syncMgmtBar() {
    const r = window.ktnState && window.ktnState.role || 'creator';
    const isGallery = r === 'gallery';
    document.body.classList.remove('p3-page', 'p4-page', 'p5-page');
    if (isGallery)             document.body.classList.add('p4-page');
    else                       document.body.classList.add('p3-page');
    KTN.syncMgmtOwner('p711Owner', isGallery ? 'gallery' : 'creator');
    if (typeof window.p711RoleSync === 'function') window.p711RoleSync();

    /* パンくずStep2/3（オーナー）もロール切替（＝掲載先デモ）に連動させる。
       ktnRenderのラップで_prevRender（common.jsの既定描画）の後に呼ばれるため上書きでよい。 */
    const bcEl = document.getElementById('ktnBc');
    if (bcEl && typeof renderBc === 'function') {
      const bc = isGallery
        ? [['Top', '/'], ['ギャラリー', 'kotennavi-p10-3.html'], ['Gallery SOIL 渋谷', 'kotennavi-p4.html'], ['編集', null]]
        : [['Top', '/'], ['クリエイター', 'kotennavi-p10-2.html'], ['田中 透', 'kotennavi-p3.html'], ['編集', null]];
      bcEl.innerHTML = renderBc('p7-11', bc);
    }
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
    { id:'t7', title:'《かさかさ》ができるまで', type:'c',
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
      '<div class="p319-item__dates">'
        + '<span class="p319-item__dates-text">登録 ' + a.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + a.upd + '</span>'
      + '</div>' +
      '<div class="p319-item__actions">' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' +
        (draft
          ? '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集 →</a>') +
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

  var SCREEN_LABEL = { 'p90-2': 'クリエイター/ギャラリー機能申込管理', 'p90-11': 'リエゾンプラス機能申込管理', 'p2-sns': '展覧会掲載依頼' };
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
    ],
    'p2-sns': [
      { pattern: 'normal',   prefix: null,       label: '正常系（掲載お知らせ）' }
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
  var P2SNS_LISTING_BODY =
    'いつもお世話になっております。\n' +
    '****************************\n展覧会情報掲載のお知らせ\n****************************\n' +
    '展覧会情報をご連絡頂きありがとうございます。\n個展なびに以下の内容で掲載いたしました。\n\n' +
    '　展覧会名：{{pageName}}\n　{{pageUrl}}\n\n' +
    '内容に相違がございましたら、お手数ですが下記までご連絡ください。\n　{{supportUrl}}\n\n{{commonFooter}}';

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
    { id: 'mt-p2sns-1', screenId: 'p2-sns', pattern: 'normal', variantKey: 'listing-notice', from: 'info@koten-navi.com',
      name: '展覧会情報掲載のお知らせ', subject: '【個展なび】展覧会情報掲載のお知らせ', body: P2SNS_LISTING_BODY,
      status: 'active', usageNote: '出展者から展覧会情報の登録連絡を受け、掲載完了を返信する時に送る（P2「SNSテキスト生成」から移設・旧「新着展覧会表示」ツール）。', updatedAt: '2026.8.21' },
  ];

  /* ── 自動送信メール（可視化＋文面編集）── データは docs/email-templates.md の
     発火点インベントリ（M-01/M-03/M-05・T-01〜T-10・A-01＝Drupalが状態変化で自動送出するもの）を構造化。
     M-02/M-04/M-06/M-07 は事務局がP90-2で選択・編集して送る「手動」のためここには含めない（TEMPLATESが正）。
     送信画面のピックリスト（screenId/variantKey）は持たない＝「管理」対象ではないため一覧性が主目的だが、
     件名・本文はDrupal実装フェーズへの入力仕様として起草・編集できる。
     旧「起草進捗」列（起草済/未着手の自動判定バッジ）は2026-08-11に撤去済み：本番運用フェーズでは全件
     文面が確定済み（＝「未着手」が発生しない）状態を前提とするため、管理する意味を持たないとユーザー判断。
     件名列で入力有無（「—」＝未入力）がそのまま代替の目安になるため、別列としての状態表示は不要とした。 */
  var AUTO_CATEGORY_LABEL = { apply: '機能申込系', txn: '取引系（LIAISON+）', activity: 'アクティビティ系（ウォッチ通知）', exhibition: '展覧会系' };
  var AUTO_BODY_M01 =
    '{{userName}} 様\n\nこのたびは個展なびのクリエイター機能にお申し込みいただき、\nありがとうございます。\n以下の内容でお申込みを受け付けました。\n\n' +
    '──────────────────────────────\n お申込み日：{{applyDate}}\n クリエイター名：{{creatorName}}\n──────────────────────────────\n\n' +
    '内容は個展なび事務局にて確認いたします。\n確認・設定が完了しましたら、あらためて\n「設定完了（ご利用開始）」のメールでお知らせします。\n（通常、数営業日以内にご連絡します）\n\n' +
    '※本メールは送信専用です。ご不明な点は下記よりお問い合わせください。\n　{{supportUrl}}\n\n{{commonFooter}}';
  var AUTO_BODY_E01 =
    '{{userName}} 様\n\nご登録いただいた展覧会「{{exhibitionName}}」について、\n個展なび事務局にて内容を確認いたしました。\n\n' +
    '開催場所・出展クリエイターページへのリンクを設定し、\nオーナーメニューに「LIAISON作品管理」が追加されました。\nLIAISON（無料のオンライン作品展示）をご利用いただけます。\n' +
    'より進んだ販売機能「LIAISON+」への切り替えをご希望の場合も、\n同メニューからお申込みいただけます（会期開始後は切り替えできません）。\n\n　{{pageUrl}}\n\n' +
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
    { id: 'E-01', category: 'exhibition', event: '管理者確認済のオーナーへ通知', aud: '展覧会オーナー（クリエイター/ギャラリー）', source: 'p2-11 admin confirm', timing: '確認完了時（自動）',
      subject: '【個展なび】「{{exhibitionName}}」の内容を確認しました', body: AUTO_BODY_E01, note: 'docs/email-templates.md E-01 と同内容。', updatedAt: '2026.8.27' },
  ];
  var AUTO_CATEGORY_ORDER = ['apply', 'txn', 'activity', 'exhibition'];
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
   P90-17  管理者-軸ページ管理

   軸ページ（P10-4-1〜5）は掲載中の展覧会データから自動生成される集合なので、
   「1枚ずつ作って消す」対象ではない。47都道府県×2（エリア／アーカイブ）＋ジャンル5＋
   行きやすさ2＋年鑑2＝100枚以上が常に存在し、増減するのは中身だけ。
   だから軸ページごとの編集画面は作らず、この1枚に横断の一覧として集約した。

   admin がここで触るのは2つだけ。
   ① 各軸ページの導入文（自動生成の一覧が「並べただけ」に見えないための地の文＝追174-46③）
   ② ハブ P10-4 の注目枠（固定枠・しきい値・枠数）
   公開/非公開のトグルを置かないのは、同じURLを出したり消したりすると検索側の評価が落ちるため。
   露出を下げたいときは注目枠から外す＝索引からは常にたどれる状態を保つ（追174-46⑤／追174-47）。

   一覧の名前・件数・導入文はすべて KTN.axis / KTN.arc から引く。管理画面用に別データを持つと、
   実ページと管理画面で件数や記入状況が食い違い、この一覧を見て判断できなくなる。
   タブ・表・フィルタ・モーダルは P90-2 / P3-15 / P3-19 の既存部品をそのまま借りている。
════════════════════════════════════════════════════ */
KTN.pages['p90-17'] = function () {

  var AX = KTN.axis, ARC = KTN.arc;
  var elList = document.getElementById('p9017List');
  if (!elList || !AX) return;

  function $(id) { return document.getElementById(id); }
  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
  /* 導入文は <p>…</p> で持つので、編集欄では「1段落＝1行」の素のテキストに開いて戻す */
  function toText(html) { return String(html || '').replace(/<\/p>\s*<p>/g, '\n').replace(/<\/?p>/g, '').trim(); }
  function toHtml(text) {
    var ls = String(text || '').split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
    return ls.length ? '<p>' + ls.join('</p><p>') + '</p>' : '';
  }

  var AXES = [
    { key: 'area',    ja: 'エリア',     page: 'P10-4-1', unit: '掲載' },
    { key: 'genre',   ja: 'ジャンル',   page: 'P10-4-4', unit: '掲載' },
    { key: 'access',  ja: '行きやすさ', page: 'P10-4-5', unit: '掲載' },
    { key: 'year',    ja: '年鑑',       page: 'P10-4-2', unit: '掲載' },
    { key: 'archive', ja: 'アーカイブ', page: 'P10-4-3', unit: '記録' }
  ];
  var AXBY = {};
  AXES.forEach(function (a) { AXBY[a.key] = a; });

  /* タブごとの注記。「なぜこの軸にこの操作が無いのか」を別ページのガイドに送らずその場に置く */
  var NOTE = {
    area:    'エリア軸は47都道府県と、東京都をさらに分けた6エリア（東京都心部・東京東部…）ぶんが常に存在します。東京のエリアのURLは都道府県と対等で、東京都の下にはぶら下がりません。掲載0件のエリアもURLは残り、ハブの「エリアから探す」「東京をエリアで探す」からたどれます。',
    genre:   'ジャンルは展覧会の登録内容から集計されます。ジャンルそのものの追加・統合はタクソノミ側の変更になるため、この画面では行いません。',
    access:  '行きやすさの軸は、展覧会の登録内容（お子さまの同伴・クリエイターの在廊）から自動で集まります。条件そのものの追加もタクソノミ側の変更です。',
    year:    '年鑑は各年に会期を終えた展覧会の上位' + ((ARC && ARC.LIMIT) || 10) + '件を自動で掲載します。どの展覧会を載せるかを運営が選ぶ枠ではありません。',
    archive: 'アーカイブはエリアごとの「会期を終えた展覧会」の記録です。エリア軸とはURLも導入文も別に持ちます。'
  };

  function rowsOf(key) {
    if (key === 'area') return AX.ALL.map(function (s) {
      return { slug: s, name: AX.fullOf(s) + 'の展覧会', n: AX.count(s), href: AX.href(s) };
    });
    if (key === 'archive') return AX.ALL.map(function (s) {
      return { slug: s, name: AX.fullOf(s) + 'の展覧会アーカイブ', n: AX.byPref(s, true).length, href: AX.archiveHref(s) };
    });
    if (key === 'genre') return AX.AXIS_GENRES.map(function (g) {
      return { slug: g.slug, name: g.name + 'の展覧会', n: g.n, href: AX.genreHref(g.slug) };
    });
    if (key === 'access') return AX.ACCESS.map(function (a) {
      return { slug: a.slug, name: a.ttl, n: a.n, href: AX.accessHref(a.slug) };
    });
    return ((ARC && ARC.YEARS) || []).map(function (y) {
      return { slug: String(y), name: y + '年の展覧会 年間の記録', n: ARC.rows(y).length, href: './kotennavi-p10-4-2.html?y=' + y };
    });
  }

  /* ── 状態（保存はデモなのでこの画面の中だけ） ── */
  var fixed = AX.FIXED.slice();
  var minv  = AX.minCount();
  var slots = 6;
  var tab   = 'area';
  var editing = null;

  var m = location.search.match(/[?&]ax=([a-z-]+)/);
  if (m && AXBY[m[1]]) tab = m[1];

  var FEAT_LABEL = { fixed: '固定枠', rot: 'ローテーション', off: '対象外' };
  function featOf(slug) {
    if (fixed.indexOf(slug) >= 0) return 'fixed';
    return AX.count(slug) >= minv ? 'rot' : 'off';
  }

  /* ── 描画 ── */
  function renderTabs() {
    var el = $('p9017Tabs'); if (!el) return;
    el.innerHTML = AXES.map(function (a) {
      return '<button type="button" class="p902-tab-btn' + (a.key === tab ? ' is-active' : '') + '" role="tab"'
        + ' aria-selected="' + (a.key === tab) + '" data-tab="' + a.key + '">' + esc(a.ja)
        + '<span class="ktn-count ktn-count--pill is-idle">' + rowsOf(a.key).length + '</span></button>';
    }).join('');
  }

  function renderThead() {
    var el = $('p9017Thead'); if (!el) return;
    el.innerHTML = '<tr><th>軸ページ</th><th>' + esc(AXBY[tab].unit) + '</th><th>導入文</th>'
      + (tab === 'area' ? '<th>注目枠</th>' : '') + '<th>操作</th></tr>';
  }

  function renderList() {
    var fLead = $('p9017FilterLead') ? $('p9017FilterLead').value : '';
    var fFeat = (tab === 'area' && $('p9017FilterFeat')) ? $('p9017FilterFeat').value : '';
    var all = rowsOf(tab);
    var rows = all.filter(function (r) {
      var w = !!AX.leadRaw(tab, r.slug);
      if (fLead === 'written' && !w) return false;
      if (fLead === 'auto' && w) return false;
      if (fFeat && featOf(r.slug) !== fFeat) return false;
      return true;
    });
    elList.innerHTML = rows.map(function (r) {
      var w = !!AX.leadRaw(tab, r.slug);
      var f = featOf(r.slug);
      return '<tr>'
        + '<td><a href="' + r.href + '" target="_blank" rel="noopener">' + esc(r.name) + '</a></td>'
        + '<td><span class="p9017-num' + (r.n ? '' : ' p9017-num--zero') + '">' + r.n + '</span></td>'
        + '<td><span class="p9017-mark' + (w ? ' p9017-mark--on' : '') + '">' + (w ? '記入済み' : '自動生成のまま') + '</span></td>'
        + (tab === 'area' ? '<td><span class="p9017-mark' + (f === 'off' ? '' : ' p9017-mark--on') + '">' + FEAT_LABEL[f] + '</span></td>' : '')
        + '<td><button type="button" class="p315-archive-table__detail-btn" data-edit="' + r.slug + '">導入文を編集</button></td>'
        + '</tr>';
    }).join('');
    var cnt = $('p9017Count');
    if (cnt) cnt.textContent = rows.length === all.length ? all.length + '件' : rows.length + ' / ' + all.length + '件';
    var emp = $('p9017Empty'); if (emp) emp.hidden = rows.length > 0;
    var nt  = $('p9017TabNote'); if (nt) nt.textContent = NOTE[tab] || '';
    var fw  = $('p9017FilterFeatWrap'); if (fw) fw.hidden = tab !== 'area';
  }

  function renderFixed() {
    var el = $('p9017Fixed'); if (!el) return;
    el.innerHTML = fixed.length
      ? fixed.map(function (s) {
          return '<span class="p9017-chip p9017-chip--fixed">' + esc(AX.fullOf(s))
            + '<span class="p9017-chip__n">' + AX.count(s) + '</span>'
            + '<button type="button" class="p9017-chip__x" data-unfix="' + s + '" aria-label="' + esc(AX.fullOf(s)) + 'を固定枠から外す">×</button></span>';
        }).join('')
      : '<span class="p9017-mark">固定枠はありません。すべての枠を日替わりのローテーションが使います。</span>';
    var sel = $('p9017FixedAdd');
    if (sel) sel.innerHTML = '<option value="">エリアを選ぶ</option>'
      + AX.ALL.filter(function (s) { return fixed.indexOf(s) < 0; })
        .map(function (s) { return '<option value="' + s + '">' + esc(AX.fullOf(s)) + '（' + AX.count(s) + '）</option>'; }).join('');
  }

  function renderPreview() {
    AX.setFeatured(fixed, minv);
    var el = $('p9017Preview');
    if (el) el.innerHTML = AX.pick(slots).map(function (s) {
      return '<span class="p9017-chip' + (fixed.indexOf(s) >= 0 ? ' p9017-chip--fixed' : '') + '">'
        + esc(AX.fullOf(s)) + '<span class="p9017-chip__n">' + AX.count(s) + '</span></span>';
    }).join('');
    var note = $('p9017PreviewNote');
    if (note) note.textContent = '固定枠' + fixed.length + '件＋ローテーション' + Math.max(0, slots - fixed.length) + '枠。'
      + 'ローテーションの対象は' + AX.rotatable().length + 'エリアで、日付から決まる順に入れ替わります。'
      + (fixed.length >= slots ? '固定枠が枠数に達しているため、いまの設定ではローテーションの席がありません。' : '');
  }

  /* 「軸ページの仕組み」の表。件数は一覧と同じ rowsOf() から数える＝説明と一覧が食い違わない。
     ジャンルが増えても年が変わっても、地の文だけが古びる状態を作らない（追174-70）。 */
  function renderAbout() {
    function put(id, v) { var el = $(id); if (el) el.textContent = v; }
    var sum = 0;
    AXES.forEach(function (a) { sum += rowsOf(a.key).length; });
    put('p9017AxTotal',   sum + '件');
    put('p9017AxArea',    rowsOf('area').length);
    put('p9017AxGenre',   rowsOf('genre').length);
    put('p9017AxAccess',  rowsOf('access').length);
    put('p9017AxYear',    rowsOf('year').length);
    put('p9017AxArchive', rowsOf('archive').length);
    put('p9017AxAreaNote', AX.PREFS.length + '都道府県と、東京都を分けた' + AX.AREAS.length + 'エリア');
    put('p9017AxYearNote', ((ARC && ARC.YEARS) || []).join('・') + '年（年が変わると増えます）');
    put('p9017AxSlots',   slots);
  }

  /* ── 季節の言葉（P10 の Picks 枠③・追174-74／追174-76 で4軸へ）──
     文言も対象も KTN.season が単一ソース（表示する P10 と同じ配列を書き換える）。
     対象はタグ（技法・素材・主題）／ジャンル（6区分）／エリア／行きやすさの4軸で、
     **排他ではなく同時に指定できる**（指定した軸をすべて満たすものへ着地＝AND）。
     件数は KTN.season.resolve() が実際の母集団から数える＝管理画面の「出る／出ない」と
     P10 の枠③ガードが別々の数を数えない。 */
  function renderSeason() {
    var S = KTN.season, el = $('p9017SeasonList');
    if (!S || !el) return;
    var now = S.month();
    /* タグだけは管理された語彙ではない（登録側の自由ワード）ので、一覧から選ぶだけでなく
       直接書ける入力欄にする。候補は実際に使われているタグ＝datalist を1本だけ作って12行で共有する。 */
    var dl = $('p9017TagList');
    if (dl) dl.innerHTML = S.targets('tag').map(function (t) { return '<option value="' + esc(t.name) + '"></option>'; }).join('');
    el.innerHTML = S.all().map(function (e) {
      var r = S.resolve(e), none = !r.parts.length, on = !none && r.n >= S.minCount();
      return '<tr' + (e.m === now ? ' class="is-now"' : '') + '>'
        + '<td>' + (e.m + 1) + '月</td>'
        /* data-label はスマホで見出し行を隠したときに各欄の名前を出すため（CSSの ::before が読む）。 */
        + '<td data-label="言葉"><input type="text" class="p211-input" data-season-label="' + e.m + '" value="' + esc(e.label) + '" maxlength="30"></td>'
        /* 4軸ぶんの欄を常に開いた状態で並べる＝その月がどの軸のどの値に着地しているかを、
           開かずに読める。**4軸は同時に指定できる**（指定した軸をすべて満たすものへ着地）ので、
           入れた軸から順にラベルと枠へアクセント色が付く。狭い幅では行をまたいで折り返してよい。
           タグだけは候補つきの自由入力（datalist）＝語彙が固定されていないので一覧で閉じない。 */
        + '<td data-label="対象"><div class="p9017-axes">'
        + S.KINDS.map(function (k) {
          var v = e.sel[k.key] || '', act = !!v;
          var head = '<label class="p9017-axis' + (act ? ' is-on' : '') + '" title="' + esc(k.note) + '">'
            + '<span class="p9017-axis__lb">' + esc(k.label) + '</span>';
          if (k.key === 'tag') {
            return head + '<input type="text" class="p211-input" list="p9017TagList" data-season-axis="tag" data-season-m="' + e.m + '"'
              + ' value="' + esc(v) + '" placeholder="指定なし" maxlength="20"></label>';
          }
          return head
            + '<select class="p211-select" data-season-axis="' + k.key + '" data-season-m="' + e.m + '">'
            + '<option value="">指定なし</option>'
            + S.targets(k.key).map(function (t) {
              return '<option value="' + esc(t.value) + '"' + (t.value === v ? ' selected' : '') + '>' + esc(t.name) + '</option>';
            }).join('')
            + '</select></label>';
        }).join('')
        + '</div></td>'
        /* 掛けるほど母数は痩せるので、何件に着地するかを行ごとにその場で返す
           （組み合わせの可否はここを見て決める＝UIの側では禁止しない）。 */
        + '<td data-label="状態"><span class="p9017-mark' + (on ? ' p9017-mark--on' : '') + '">'
        + (none ? '出ない（対象なし）' : (on ? '出る（' + r.n + '）' : '出ない（' + r.n + '）')) + '</span></td>'
        + '</tr>';
    }).join('');
    renderSeasonPreview();
  }

  /* 表とは別に呼べるようにしてある＝言葉を打っている最中に表を描き直すと入力欄が作り直されて
     フォーカスが飛ぶため、input 中はプレビューだけ更新する。 */
  function renderSeasonPreview() {
    var S = KTN.season; if (!S) return;
    var now = S.month();
    var e = S.get(now), r = S.resolve(e), nn = r.n;
    var none = !r.parts.length, show = !none && nn >= S.minCount();
    /* 複数の軸を指定した月は「A」「B」…のすべてを満たすものへ着地する（AND）。 */
    var nm = r.names.map(function (n) { return '「' + n + '」'; }).join('');
    var pv = $('p9017SeasonPreview');
    if (pv) pv.innerHTML = show
      ? '<span class="p9017-chip p9017-chip--fixed">' + esc(e.label) + '<span class="p9017-chip__n">' + nn + '</span></span>'
      : '<span class="p9017-mark">この月は枠を出しません</span>';
    var nt = $('p9017SeasonNote');
    if (nt) nt.textContent = none
      ? (now + 1) + '月は対象がひとつも選ばれていないため、枠を出さずに残りの枠が前へ詰まります。'
      : (show
        ? (now + 1) + '月は' + nm + (r.names.length > 1 ? 'のすべてにあてはまる展覧会' : 'の展覧会') + nn + '件へ着地します。PICKS の3番目に出ます。'
        : (now + 1) + '月は' + nm + (r.names.length > 1 ? 'のすべてにあてはまる掲載' : 'の掲載') + 'が' + nn + '件でしきい値に届かないため、枠を出さずに残りの枠が前へ詰まります。');
  }

  function renderAll() { renderTabs(); renderThead(); renderList(); renderFixed(); renderPreview(); renderAbout(); renderSeason(); }

  /* ── 導入文モーダル ── */
  function openLead(slug) {
    var all = rowsOf(tab), r = null;
    for (var i = 0; i < all.length; i++) if (all[i].slug === slug) r = all[i];
    if (!r) return;
    editing = { key: tab, slug: slug };
    $('p9017LeadKind').textContent = AXBY[tab].page;
    $('p9017LeadName').textContent = r.name;
    $('p9017LeadView').href = r.href;
    $('p9017LeadText').value = toText(AX.leadRaw(tab, slug));
    $('p9017LeadAuto').textContent = toText(AX.leadAuto(tab, slug)).replace(/\n/g, ' ');
    var md = $('p9017LeadModal');
    if (md) { md.hidden = false; document.body.style.overflow = 'hidden'; }
    var ta = $('p9017LeadText'); if (ta) ta.focus();
  }
  function closeLead() {
    var md = $('p9017LeadModal');
    if (md) { md.hidden = true; document.body.style.overflow = ''; }
    editing = null;
  }

  /* ── イベント ── */
  var tabs = $('p9017Tabs');
  if (tabs) tabs.addEventListener('click', function (e) {
    var b = e.target.closest('[data-tab]'); if (!b) return;
    tab = b.getAttribute('data-tab');
    renderTabs(); renderThead(); renderList();
  });

  elList.addEventListener('click', function (e) {
    var b = e.target.closest('[data-edit]'); if (!b) return;
    openLead(b.getAttribute('data-edit'));
  });

  ['p9017FilterLead', 'p9017FilterFeat'].forEach(function (id) {
    var el = $(id); if (el) el.addEventListener('change', renderList);
  });

  var fx = $('p9017Fixed');
  if (fx) fx.addEventListener('click', function (e) {
    var b = e.target.closest('[data-unfix]'); if (!b) return;
    var s = b.getAttribute('data-unfix');
    fixed = fixed.filter(function (x) { return x !== s; });
    renderFixed(); renderPreview(); renderList();
  });

  var addBtn = $('p9017FixedAddBtn');
  if (addBtn) addBtn.addEventListener('click', function () {
    var sel = $('p9017FixedAdd'); if (!sel || !sel.value) return;
    if (fixed.indexOf(sel.value) < 0) fixed.push(sel.value);
    renderFixed(); renderPreview(); renderList();
  });

  var elMin = $('p9017Min');
  if (elMin) elMin.addEventListener('input', function () {
    var v = parseInt(elMin.value, 10);
    minv = isNaN(v) || v < 0 ? 0 : v;
    renderPreview(); renderList();
  });

  var elSlots = $('p9017Slots');
  if (elSlots) elSlots.addEventListener('change', function () {
    slots = parseInt(elSlots.value, 10) || 6;
    renderPreview(); renderAbout();
  });

  var hubSave = $('p9017HubSave');
  if (hubSave) hubSave.addEventListener('click', function () {
    if (KTN.toast) KTN.toast('ハブの導入文を保存しました（デモ）');
  });

  var featSave = $('p9017FeatSave');
  if (featSave) featSave.addEventListener('click', function () {
    AX.setFeatured(fixed, minv);
    if (KTN.toast) KTN.toast('注目枠の設定を保存しました（デモ）');
  });

  var leadSave = $('p9017LeadSave');
  if (leadSave) leadSave.addEventListener('click', function () {
    if (!editing) return;
    AX.setLead(editing.key, editing.slug, toHtml($('p9017LeadText').value));
    closeLead();
    renderList();
    if (KTN.toast) KTN.toast('導入文を保存しました（デモ）');
  });

  /* ── 季節の言葉 ── 書き換え先は KTN.season（P10 が読むのと同じ配列）。 */
  var seasonList = $('p9017SeasonList');
  if (seasonList) {
    seasonList.addEventListener('input', function (e) {
      var i = e.target.closest('[data-season-label]'); if (!i || !KTN.season) return;
      KTN.season.set(parseInt(i.getAttribute('data-season-label'), 10), i.value, null, null);
      renderSeasonPreview();
    });
    /* 4軸は排他ではないので、触った軸だけを入れ替える（他の軸はそのまま残る）。
       「指定なし」＝その軸の指定を外す。タグは自由入力なので前後の空白を落としてから拾う
       （空白だけ＝指定なし）。掛け合わせた結果が薄いかどうかは「状態」列がその場で返す。 */
    seasonList.addEventListener('change', function (e) {
      if (!KTN.season) return;
      var s = e.target.closest('[data-season-axis]'); if (!s) return;
      KTN.season.set(parseInt(s.getAttribute('data-season-m'), 10), null,
        s.getAttribute('data-season-axis'), String(s.value).trim());
      renderSeason();
    });
  }

  var seasonMin = $('p9017SeasonMin');
  if (seasonMin) seasonMin.addEventListener('input', function () {
    if (!KTN.season) return;
    var v = parseInt(seasonMin.value, 10);
    KTN.season.setMin(isNaN(v) || v < 0 ? 0 : v);
    renderSeason();
  });

  var seasonSave = $('p9017SeasonSave');
  if (seasonSave) seasonSave.addEventListener('click', function () {
    if (KTN.toast) KTN.toast('季節の言葉を保存しました（デモ）');
  });

  ['p9017LeadCancel', 'p9017LeadModalBg'].forEach(function (id) {
    var el = $(id); if (el) el.addEventListener('click', closeLead);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && editing) closeLead();
  });

  renderAll();

  /* 一覧・注目枠は描画後に高さが決まるので、#p9017-feat 等のアンカーはここで合わせ直す */
  if (location.hash) {
    var t = null;
    try { t = document.querySelector(location.hash); } catch (err) { t = null; }
    if (t) setTimeout(function () { t.scrollIntoView(); }, 60);
  }

  window.ktnRender = function () {};
};

/* ════════════════════════════════════════════════════
   P3-13  クリエイター-オーディエンス管理（p4-13=ギャラリー版と対）
   既定表示は「すべて」＝ウォッチャー・チェックインを横断した全オーディエンス（2026-08-28 追加）。
   「ウォッチャー」（自分をウォッチしているアカウント）「チェックイン」（自分の展覧会＝
   投稿・参加のいずれも対象にチェックインしたアカウント）「ウォッチャー×チェックイン」（両方）は
   その「すべて」を絞り込むフィルタータブという位置づけ。
   ウォッチ元・チェックイン元は一般ユーザー・クリエイター・ギャラリーいずれもありうるが、
   watch/checkinはユーザー機能として定義しているため種別（ロール）の絞り込みUIは持たない
   （ウォッチ対象になれるのはクリエイター・ギャラリーのみだが、ウォッチ/チェックインする側の種別は意識させない）。
   一覧行はどちらのタブも .p2-watcher-item/.p2-watcher-list（p2ウォッチャーモーダルと同一部品）を流用。
   総ウォッチャー数・新規ウォッチャー・チェックイン人数（過去30日）の数値はp3-12インサイトの同項目と揃えている。

   データは PEOPLE 1本（人物の重複を作らない・2026-08-28 統合）。旧実装はWATCHERS/CHECKINSを
   別配列で持ち、同一人物でもタブごとに数値が食い違っていた（例：ウォッチ側「チェックイン3回」
   なのにチェックイン側の来場履歴は1件、等）。統合により「ウォッチしていて、かつ来場歴もある」
   人物が両タブで矛盾なく確認できる（ユーザー要望①）。
   各人物 { watching（このオーナーをウォッチ中か）, since/ts（ウォッチ開始日・watching時のみ意味を持つ）,
     visits[]（来場履歴：exh/exhName/period/date/ts。0件＝チェックインなし）, interest（このオーナーの
     作品への興味あり数） }。すべてタブ＝watching||visits.length>0対象、ウォッチャータブ＝watching対象、
     チェックインタブ＝visits.length>0対象を、このPEOPLEから抽出して表示するのみで、別データソースを持たない。
   「エンゲージメントが多い順」＝ watching(+1) + 来場回数 + 興味あり数 の単純合計（このオーナーへの
   行動のみで算出。旧実装はサイト全体の総ウォッチ数を含めていたが、それは「このオーナーへの関心」で
   はなく「サイト全体でどれだけ活発なユーザーか」を測ってしまうため2026-08-28に除外）。
   「最近アクティブな順」＝ ウォッチ開始日／直近の来場日のうち新しい方（ユーザー要望②）。
   来場2回以上の人物には「リピーター」タグを表示（ユーザー要望③・p3-12のリピーター概念と接続）。
════════════════════════════════════════════════════ */
KTN.pages['p3-13'] = function () {

  var SVG_W   = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="8" cy="8" r="7" fill="#3a90e0"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>';
  var SVG_C   = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="10" cy="5" r="4" fill="#3a90e0"/><circle cx="5" cy="11" r="2.4" fill="#3a90e0"/></svg>';
  var SVG_I   = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#3a90e0" stroke="#3a90e0" stroke-width=".6" stroke-linejoin="round"/></svg>';
  var SVG_COL = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="#4da3f5" stroke-width="1.4"/><rect x="4.5" y="4.5" width="7" height="7" rx=".5" stroke="#4da3f5" stroke-width="1"/></svg>';

  /* ── サンプルデータ（田中透に関わるアカウント）── ウォッチ/チェックイン/興味あり/コレクションはユーザーロール専用の
     サービス機能のため、オーディエンスリストに載るアカウントは常にユーザー種別（バッジ・アバター形状も常にuser）。
     watchCount/checkinCount/interest/collectionCount＝サイト全体の活動量（.uc カード共通カウンターと同じ指標）。
     watching/since/ts/visits＝この作家への関係（ウォッチ中か・この作家の展覧会への来場履歴）で別スコープ。
     exh＝p3-18のEXHIBITIONSと同一id（x4/x5/x7）。 */
  var PEOPLE = [
    { id:'p1',  name:'佐藤 美咲', color:'linear-gradient(145deg,#a8b8c8,#6a8098)', watching:true,  since:'2026.5.20', ts:20260520, watchCount:12, checkinCount:6,  interest:5,
      visits:[ { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.7.22', ts:20260722, reason:'sns' } ] },
    { id:'p2',  name:'高橋 陶子', color:'linear-gradient(145deg,#6a9aaa,#2a6a8a)', watching:true,  since:'2026.4.2',  ts:20260402, watchCount:34, checkinCount:15, interest:2, collectionCount:3,
      memo:'器の色味の系統（青灰色）が好みとのこと。初日と最終日近くに2回来場。次回は在廊日を事前にお伝えすると喜ばれそう。',
      visits:[
        { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.7.25', ts:20260725, reason:'know' },
        { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.8.9',  ts:20260809, reason:'know' },
      ] },
    { id:'p3',  name:'村上 陽子', color:'linear-gradient(145deg,#c8b89a,#a09070)', watching:true,  since:'2026.3.14', ts:20260314, watchCount:5,  checkinCount:2,  interest:0, visits:[] },
    { id:'p4',  name:'中村 拓也', color:'linear-gradient(145deg,#c8a8b8,#986878)', watching:true,  since:'2026.6.1',  ts:20260601, watchCount:8,  checkinCount:4,  interest:1,
      visits:[ { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.7.30', ts:20260730, reason:'kotennavi' } ] },
    { id:'p5',  name:'木村 彩', color:'linear-gradient(145deg,#b8c8a8,#789068)', watching:true,  since:'2026.5.2',  ts:20260502, watchCount:15, checkinCount:7,  interest:3,
      visits:[ { exh:'x5', exhName:'まなざしの重奏', period:'2026.7.25 - 2026.8.5', date:'2026.7.28', ts:20260728, reason:'sns' } ] },
    { id:'p6',  name:'渡辺 硝子', color:'linear-gradient(145deg,#aa7a9a,#7a3a6a)', watching:true,  since:'2026.2.18', ts:20260218, watchCount:28, checkinCount:11, interest:4, collectionCount:2,
      visits:[ { exh:'x5', exhName:'まなざしの重奏', period:'2026.7.25 - 2026.8.5', date:'2026.7.29', ts:20260729, reason:'dm' } ] },
    { id:'p7',  name:'橋本 尚美', color:'linear-gradient(145deg,#9ab8c8,#6a8898)', watching:true,  since:'2026.1.9',  ts:20260109, watchCount:9,  checkinCount:3,  interest:1,
      visits:[ { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.7.27', ts:20260727, reason:'referral' } ] },
    { id:'p8',  name:'小林 志保', color:'linear-gradient(145deg,#8a9aaa,#4a5a7a)', watching:true,  since:'2026.5.28', ts:20260528, watchCount:11, checkinCount:5,  interest:2,
      visits:[ { exh:'x7', exhName:'ことばの余白', period:'2025.12.1 - 2025.12.20', date:'2025.12.10', ts:20251210, reason:'sns' } ] },
    { id:'p9',  name:'加藤 蒼', color:'linear-gradient(145deg,#a8b8c8,#6a8098)', watching:true,  since:'2026.6.10', ts:20260610, watchCount:3,  checkinCount:1,  interest:0, visits:[] },
    { id:'p10', name:'吉田 織部', color:'linear-gradient(145deg,#8aaa6a,#4a7a2a)', watching:true,  since:'2026.3.30', ts:20260330, watchCount:19, checkinCount:8,  interest:1,
      visits:[ { exh:'x7', exhName:'ことばの余白', period:'2025.12.1 - 2025.12.20', date:'2025.12.18', ts:20251218, reason:'walkby' } ] },
    { id:'p11', name:'山本 結', color:'linear-gradient(145deg,#c8a8b8,#986878)', watching:true,  since:'2026.4.25', ts:20260425, watchCount:48, checkinCount:23, interest:6, collectionCount:5,
      visits:[
        { exh:'x7', exhName:'ことばの余白', period:'2025.12.1 - 2025.12.20', date:'2025.12.19', ts:20251219, reason:'know' },
        { exh:'x5', exhName:'まなざしの重奏', period:'2026.7.25 - 2026.8.5', date:'2026.7.31', ts:20260731, reason:'sns' },
      ] },
    { id:'p12', name:'石田 明里', color:'linear-gradient(145deg,#b8a8c8,#8878a8)', watching:true,  since:'2026.2.5',  ts:20260205, watchCount:6,  checkinCount:3,  interest:0,
      visits:[ { exh:'x7', exhName:'ことばの余白', period:'2025.12.1 - 2025.12.20', date:'2025.12.14', ts:20251214, reason:'kotennavi' } ] },
    { id:'p13', name:'鈴木 遥', color:'linear-gradient(145deg,#b8c8a8,#789068)', watching:true,  since:'2026.6.15', ts:20260615, watchCount:10, checkinCount:2,  interest:2, visits:[] },
    { id:'p14', name:'松本 版画', color:'linear-gradient(145deg,#aaaa6a,#7a7a1a)', watching:true,  since:'2026.1.22', ts:20260122, watchCount:22, checkinCount:9,  interest:3, visits:[] },
    { id:'p15', name:'岡田 陸', color:'linear-gradient(145deg,#9ab0c0,#5a7898)', watching:false, watchCount:7,  checkinCount:4,  interest:1,
      visits:[ { exh:'x4', exhName:'水のうつわ、光のかけら', period:'2026.7.20 - 2026.8.10', date:'2026.7.24', ts:20260724, reason:'other' } ] },
    { id:'p16', name:'福田 玲奈', color:'linear-gradient(145deg,#c8b0a0,#987860)', watching:false, watchCount:4,  checkinCount:2,  interest:0,
      visits:[ { exh:'x5', exhName:'まなざしの重奏', period:'2026.7.25 - 2026.8.5', date:'2026.8.1',  ts:20260801, reason:'kotennavi' } ] },
  ];

  /* 注目のオーディエンス：常連のファン＝チェックイン回数上位／最近つながった人＝ウォッチ開始・来場のうち
     最も新しい出来事順。一覧（PEOPLE）と同じデータソースだが、管理・検索でなく発見・称賛が目的の別コンポーネント。 */
  (function renderSpotlight() {
    var regularsEl = document.getElementById('p313SpotlightRegulars');
    var recentEl   = document.getElementById('p313SpotlightRecent');
    if (!regularsEl && !recentEl) return;

    function chip(p, metaText) {
      return '<a href="kotennavi-p5.html" class="p313-spotlight-chip">' +
        '<span class="p313-spotlight-chip__avatar" style="background:' + p.color + '">' + p.name.charAt(0) + '</span>' +
        '<span class="p313-spotlight-chip__body">' +
          '<span class="p313-spotlight-chip__name">' + p.name + '</span>' +
          '<span class="p313-spotlight-chip__meta">' + metaText + '</span>' +
        '</span>' +
      '</a>';
    }

    if (regularsEl) {
      var regulars = PEOPLE.filter(function (p) { return p.visits.length > 0; })
        .sort(function (a, b) { return b.visits.length - a.visits.length; })
        .slice(0, 3);
      regularsEl.innerHTML = regulars.length
        ? regulars.map(function (p) { return chip(p, 'チェックイン ' + p.visits.length + '回'); }).join('')
        : '<p class="p313-spotlight__empty">まだ来場記録がありません</p>';
    }

    if (recentEl) {
      function recentInfo(p) {
        var watchTs = p.watching ? p.ts : 0;
        var latestVisit = p.visits.length ? p.visits.reduce(function (m, v) { return v.ts > m.ts ? v : m; }) : null;
        var visitTs = latestVisit ? latestVisit.ts : 0;
        if (visitTs > watchTs) return { ts: visitTs, label: 'チェックイン ' + latestVisit.date };
        if (watchTs > 0)       return { ts: watchTs, label: 'ウォッチ開始 ' + p.since };
        return { ts: 0, label: '' };
      }
      var recent = PEOPLE.map(function (p) { return { p: p, info: recentInfo(p) }; })
        .filter(function (x) { return x.info.ts > 0; })
        .sort(function (a, b) { return b.info.ts - a.info.ts; })
        .slice(0, 3);
      recentEl.innerHTML = recent.length
        ? recent.map(function (x) { return chip(x.p, x.info.label); }).join('')
        : '<p class="p313-spotlight__empty">まだつながりがありません</p>';
    }
  })();

  function esc(s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }

  function makeItem(p, idSuffix) {
    var visitsSorted = p.visits.slice().sort(function (a, b) { return b.ts - a.ts; });
    var ckId = 'p313ck-' + (idSuffix || p.id);
    var memoId = 'p313memo-' + (idSuffix || p.id);
    var visitsHtml = visitsSorted.length ? '<div class="p313-ck-visits" id="' + ckId + '" hidden>' + visitsSorted.map(function (v) {
      return '<div class="p313-ck-visit">' +
        '<span class="p313-ck-visit__date">' + v.date + '</span>' +
        '<span class="p313-ck-visit__exh"><span class="ins-item-list__link-mark">展覧会</span><a class="p313-ck-visit__exh-link" href="kotennavi-p2.html">' + v.exhName + '</a> · ' + v.period + '</span>' +
        (v.reason ? '<span class="p313-ck-visit__reason">来場のきっかけ：' + ktnCheckinReasonLabel(v.reason) + '</span>' : '') +
      '</div>';
    }).join('') + '</div>' : '';
    /* トリガーは右カラム（.p313-rel）内・リスト本体は左右カラムの下に全幅で展開＝
       position別のためnative<details>でなくJS制御（aria-expanded＋hidden）で連結 */
    var toggleBtnHtml = visitsSorted.length ? '<button type="button" class="p313-ck-trigger" aria-expanded="false" aria-controls="' + ckId + '">来場履歴を見る（' + visitsSorted.length + '件）</button>' : '';
    /* 非公開メモ：ウォッチ/チェックインの記録とは別スコープ（(オーナー,この人物)ペアに紐づく独立データ）＝
       ウォッチ解除・チェックイン取消があっても消えない設計を想定（デモではPEOPLE配列上のp.memoに保持） */
    var memoBtnHtml = '<button type="button" class="p313-memo-trigger" aria-expanded="false" aria-controls="' + memoId + '">' + (p.memo ? 'メモを見る・編集' : 'メモを追加') + '</button>';
    var memoHtml = '<div class="p313-memo" id="' + memoId + '" data-pid="' + p.id + '" hidden>' +
      '<textarea class="p313-memo__input" placeholder="この人についてのメモ（例：話した内容・好みの作風・対応の注意点など）">' + esc(p.memo) + '</textarea>' +
      '<div class="p313-memo__foot">' +
        '<span class="p313-memo__note">オーナーのみ閲覧できます</span>' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--primary ktn-op-btn--sm p313-memo__save">保存</button>' +
      '</div>' +
    '</div>';
    return '<div class="p2-watcher-item">' +
      '<a href="kotennavi-p5.html" class="p2-watcher-item__avatar p2-watcher-item__avatar--user" style="background:' + p.color + '">' + p.name.charAt(0) + '</a>' +
      '<div class="p2-watcher-item__info p313-item-info">' +
        '<div class="p313-item-main">' +
          '<div class="uc__badge-row"><span class="cb cb-person cb-user">user</span></div>' +
          '<a href="kotennavi-p5.html" class="p2-watcher-item__name">' + p.name + '</a>' +
          '<div class="uc__counts">' +
            '<span class="uc__count">' + SVG_W + p.watchCount + '</span>' +
            '<span class="sep"></span>' +
            '<span class="uc__count">' + SVG_C + p.checkinCount + '</span>' +
            '<span class="sep"></span>' +
            '<span class="uc__count">' + SVG_I + p.interest + '</span>' +
            (p.collectionCount ? '<span class="sep"></span><span class="uc__count uc__count--collection">' + SVG_COL + p.collectionCount + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="p313-rel">' +
          (p.watching ? '<p class="p313-rel__line">ウォッチ中<span class="p313-rel__since">・' + p.since + '〜</span></p>' : '') +
          '<p class="p313-rel__line">チェックイン <strong>' + p.visits.length + '</strong>回</p>' +
          toggleBtnHtml +
          memoBtnHtml +
        '</div>' +
        visitsHtml +
        memoHtml +
      '</div>' +
    '</div>';
  }

  /* ── 一覧（PEOPLE全件を単一リストにし、フィルターチップで絞り込み） ── */
  var listEl   = document.getElementById('p313List');
  var emptyEl  = document.getElementById('p313Empty');
  var sortSel  = document.getElementById('p313Sort');
  var countEl  = document.getElementById('p313Count');
  var pagerEl  = document.getElementById('p313Pagination');
  var filterNav = document.getElementById('p313FilterTabs');
  var exhWrap  = document.getElementById('p313ExhFilterWrap');
  var exhSel   = document.getElementById('p313CkFilterExh');
  if (!listEl || !sortSel || !filterNav) return;

  var page = 1;
  var PER_PAGE = 8;
  var viewFilter = 'all';

  function sinceTs(p) { return p.watching ? p.ts : null; }
  function checkinLatestTs(p) { return p.visits.length ? Math.max.apply(null, p.visits.map(function (v) { return v.ts; })) : null; }

  var SORTS = {
    'since-desc': function (a, b) {
      var at = sinceTs(a), bt = sinceTs(b);
      if (at == null && bt == null) return 0;
      if (at == null) return 1;
      if (bt == null) return -1;
      return bt - at;
    },
    'checkin-desc': function (a, b) {
      var at = checkinLatestTs(a), bt = checkinLatestTs(b);
      if (at == null && bt == null) return 0;
      if (at == null) return 1;
      if (bt == null) return -1;
      return bt - at;
    },
    'count-desc': function (a, b) { return b.visits.length - a.visits.length; },
    'name':       function (a, b) { return a.name.localeCompare(b.name, 'ja'); },
  };

  function matchesFilter(p) {
    if (viewFilter === 'all')     return p.watching || p.visits.length > 0; /* ウォッチャー・チェックインを横断したすべて＝既定表示 */
    if (viewFilter === 'watch')   return p.watching;
    if (viewFilter === 'checkin') return p.visits.length > 0;
    return p.watching && p.visits.length > 0; /* both */
  }

  function syncExhVisibility() {
    if (exhWrap) exhWrap.hidden = (viewFilter === 'watch');
  }

  function render() {
    var fe = (exhSel && exhWrap && !exhWrap.hidden) ? exhSel.value : '';
    var rows = PEOPLE.filter(function (p) {
      if (!matchesFilter(p)) return false;
      if (fe && !p.visits.some(function (v) { return v.exh === fe; })) return false;
      return true;
    });
    rows.sort(SORTS[sortSel.value] || SORTS['since-desc']);
    if (countEl) countEl.textContent = rows.length + '件';
    if (emptyEl) emptyEl.hidden = rows.length !== 0;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = pageRows.map(function (p) { return makeItem(p); }).join('');
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }

  filterNav.querySelectorAll('.p313-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      viewFilter = btn.dataset.filter;
      filterNav.querySelectorAll('.p313-tab').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      syncExhVisibility();
      renderReset();
    });
  });
  if (exhSel) exhSel.addEventListener('change', renderReset);
  sortSel.addEventListener('change', renderReset);

  /* 来場履歴トグル・メモ開閉/保存：再描画のたびにDOMが差し替わるため委譲（listEl／exhCkListEl共通で使う） */
  function handleAudienceItemClick(e) {
    var ckBtn = e.target.closest('.p313-ck-trigger');
    if (ckBtn) {
      var target = document.getElementById(ckBtn.getAttribute('aria-controls'));
      if (!target) return;
      var open = ckBtn.getAttribute('aria-expanded') === 'true';
      ckBtn.setAttribute('aria-expanded', String(!open));
      target.hidden = open;
      return;
    }
    var memoBtn = e.target.closest('.p313-memo-trigger');
    if (memoBtn) {
      var memoTarget = document.getElementById(memoBtn.getAttribute('aria-controls'));
      if (!memoTarget) return;
      var memoOpen = memoBtn.getAttribute('aria-expanded') === 'true';
      memoBtn.setAttribute('aria-expanded', String(!memoOpen));
      memoTarget.hidden = memoOpen;
      if (!memoOpen) {
        var ta = memoTarget.querySelector('.p313-memo__input');
        if (ta) ta.focus();
      }
      return;
    }
    var saveBtn = e.target.closest('.p313-memo__save');
    if (saveBtn) {
      var panel = saveBtn.closest('.p313-memo');
      if (!panel) return;
      var pid = panel.dataset.pid;
      var person = PEOPLE.filter(function (x) { return x.id === pid; })[0];
      if (!person) return;
      var input = panel.querySelector('.p313-memo__input');
      person.memo = input ? input.value.trim() : '';
      var trigger = document.querySelector('[aria-controls="' + panel.id + '"]');
      if (trigger) trigger.textContent = person.memo ? 'メモを見る・編集' : 'メモを追加';
      KTN.toast('メモを保存しました（自分のみ閲覧可）');
    }
  }

  listEl.addEventListener('click', handleAudienceItemClick);

  syncExhVisibility();
  render();

  /* ── 展覧会別チェックインリスト：PEOPLEのvisitsを展覧会単位に集約（チェックインが1件もない展覧会は
     マップに現れないため自然に除外される＝「チェックインのある展覧会だけを表示する」を満たす） ── */
  function buildExhCheckins() {
    var map = {};
    PEOPLE.forEach(function (p) {
      p.visits.forEach(function (v) {
        if (!map[v.exh]) map[v.exh] = { exh: v.exh, exhName: v.exhName, period: v.period, people: [], reasonCounts: {} };
        var g = map[v.exh];
        var entry = g.people.filter(function (x) { return x.p.id === p.id; })[0];
        if (!entry) { g.people.push({ p: p, ts: v.ts }); }
        else if (v.ts > entry.ts) { entry.ts = v.ts; }
        if (v.reason) g.reasonCounts[v.reason] = (g.reasonCounts[v.reason] || 0) + 1;
      });
    });
    return Object.keys(map).map(function (k) { return map[k]; }).sort(function (a, b) {
      var at = Math.max.apply(null, a.people.map(function (x) { return x.ts; }));
      var bt = Math.max.apply(null, b.people.map(function (x) { return x.ts; }));
      return bt - at;
    });
  }

  /* 展覧会グループの「来場のきっかけ」内訳：件数降順・チェックイン時に必須化した2026-08-29以降のデータのみ集計対象 */
  function reasonBreakdownHtml(reasonCounts) {
    var ids = Object.keys(reasonCounts);
    if (!ids.length) return '';
    var sorted = ids.sort(function (a, b) { return reasonCounts[b] - reasonCounts[a]; });
    var chips = sorted.map(function (id) {
      return '<span class="p313-exh-ck-item__reason-chip">' + ktnCheckinReasonLabel(id) + ' ' + reasonCounts[id] + '</span>';
    }).join('');
    return '<div class="p313-exh-ck-item__reasons"><span class="p313-exh-ck-item__reasons-label">来場のきっかけ内訳</span>' + chips + '</div>';
  }

  function makeExhCkItem(group, idx) {
    var peopleSorted = group.people.slice().sort(function (a, b) { return b.ts - a.ts; });
    var bodyId = 'p313exhck-' + idx;
    var cardsHtml = peopleSorted.map(function (entry) {
      return makeItem(entry.p, entry.p.id + '-exh' + idx);
    }).join('');
    return '<div class="p313-exh-ck-item">' +
      '<div class="p313-exh-ck-item__head" role="button" tabindex="0" aria-expanded="false" aria-controls="' + bodyId + '">' +
        '<span class="p313-exh-ck-item__main">' +
          '<a class="p313-exh-ck-item__name" href="kotennavi-p2.html" onclick="event.stopPropagation()">' + group.exhName + '</a>' +
          '<span class="p313-exh-ck-item__period">' + group.period + '</span>' +
        '</span>' +
        '<span class="ktn-count">' + group.people.length + '人</span>' +
      '</div>' +
      reasonBreakdownHtml(group.reasonCounts) +
      '<div class="p313-exh-ck-item__visitors" id="' + bodyId + '" hidden><div class="p2-watcher-list">' + cardsHtml + '</div></div>' +
    '</div>';
  }

  var exhCkListEl  = document.getElementById('p313ExhCkList');
  var exhCkEmptyEl = document.getElementById('p313ExhCkEmpty');
  if (exhCkListEl) {
    var exhCkGroups = buildExhCheckins();
    exhCkListEl.innerHTML = exhCkGroups.map(makeExhCkItem).join('');
    if (exhCkEmptyEl) exhCkEmptyEl.hidden = exhCkGroups.length !== 0;
    exhCkListEl.addEventListener('click', function (e) {
      if (e.target.closest('.p313-exh-ck-item__name')) return;
      var headBtn = e.target.closest('.p313-exh-ck-item__head');
      if (headBtn) {
        var target = document.getElementById(headBtn.getAttribute('aria-controls'));
        if (target) {
          var open = headBtn.getAttribute('aria-expanded') === 'true';
          headBtn.setAttribute('aria-expanded', String(!open));
          target.hidden = open;
        }
        return;
      }
      handleAudienceItemClick(e);
    });
  }

  /* ── ビュー切替：人にフォーカスするオーディエンスリスト／展覧会にフォーカスするチェックインリスト ── */
  var viewTabsNav    = document.getElementById('p313ViewTabs');
  var viewAudienceEl = document.getElementById('p313ViewAudience');
  var viewExhEl      = document.getElementById('p313ViewExh');
  if (viewTabsNav) {
    viewTabsNav.querySelectorAll('.p313-view-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = btn.dataset.view;
        viewTabsNav.querySelectorAll('.p313-view-tab').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        if (viewAudienceEl) viewAudienceEl.hidden = view !== 'audience';
        if (viewExhEl) viewExhEl.hidden = view !== 'exhibition';
      });
    });
  }

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
};

/* ════════════════════════════════════════════════════
   P4-13  ギャラリー-オーディエンス管理（p3-13=クリエイター版と対）
   構造・CSSクラスは .p313-* を共有ネームスペースとして再利用（p3-14/p4-14と同じ方式）。
   要素IDのみ p413* に差し替え、KTN.pages['p3-13']とは別関数として実装。
   チェックイン展覧会データはp4-18のEXHIBITIONS（g4/g5/g7＝live-solo/ending-group/closed-solo）と対応。
════════════════════════════════════════════════════ */
KTN.pages['p4-13'] = function () {

  var SVG_W   = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="8" cy="8" r="7" fill="#3a90e0"/><circle cx="8" cy="8" r="2.6" fill="#fff"/></svg>';
  var SVG_C   = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><circle cx="10" cy="5" r="4" fill="#3a90e0"/><circle cx="5" cy="11" r="2.4" fill="#3a90e0"/></svg>';
  var SVG_I   = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#3a90e0" stroke="#3a90e0" stroke-width=".6" stroke-linejoin="round"/></svg>';
  var SVG_COL = '<svg viewBox="0 0 16 16" fill="none" width="11" height="11"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="#4da3f5" stroke-width="1.4"/><rect x="4.5" y="4.5" width="7" height="7" rx=".5" stroke="#4da3f5" stroke-width="1"/></svg>';

  /* ── サンプルデータ（Gallery SOIL 渋谷に関わるアカウント）── ウォッチ/チェックイン/興味あり/コレクションはユーザーロール専用の
     サービス機能のため、オーディエンスリストに載るアカウントは常にユーザー種別（バッジ・アバター形状も常にuser）。
     watchCount/checkinCount/interest/collectionCount＝サイト全体の活動量（.uc カード共通カウンターと同じ指標）。
     watching/since/ts/visits＝このギャラリーへの関係（ウォッチ中か・この会場の展覧会への来場履歴）で別スコープ。
     exh＝p4-18のEXHIBITIONSと同一id（g4/g5/g7）。 */
  var PEOPLE = [
    { id:'p1',  name:'佐藤 美咲', color:'linear-gradient(145deg,#a8b8c8,#6a8098)', watching:true,  since:'2026.5.18', ts:20260518, watchCount:14, checkinCount:6,  interest:3,
      visits:[ { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.7.27', ts:20260727, reason:'sns' } ] },
    { id:'p2',  name:'田中 透', color:'linear-gradient(145deg,#7ab4cc,#4a8099)', watching:true,  since:'2026.4.30', ts:20260430, watchCount:31, checkinCount:14, interest:1, collectionCount:2,
      memo:'大型作品のコレクターとのこと。次回展の案内は在廊日を優先して個別にお知らせしたい。会話の中で新作の額装について質問あり。',
      visits:[
        { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.7.30', ts:20260730, reason:'know' },
        { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.8.9',  ts:20260809, reason:'know' },
      ] },
    { id:'p3',  name:'西村 沙耶', color:'linear-gradient(145deg,#b8a8c8,#8878a8)', watching:true,  since:'2026.3.9',  ts:20260309, watchCount:6,  checkinCount:3,  interest:0,
      visits:[ { exh:'g7', exhName:'路地裏の詩、冬の記録', period:'2025.12.1 - 2025.12.20', date:'2025.12.11', ts:20251211, reason:'walkby' } ] },
    { id:'p4',  name:'中村 拓也', color:'linear-gradient(145deg,#c8a8b8,#986878)', watching:true,  since:'2026.6.3',  ts:20260603, watchCount:9,  checkinCount:4,  interest:2,
      visits:[ { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.8.3',  ts:20260803, reason:'kotennavi' } ] },
    { id:'p5',  name:'木村 彩', color:'linear-gradient(145deg,#b8c8a8,#789068)', watching:true,  since:'2026.5.6',  ts:20260506, watchCount:13, checkinCount:5,  interest:1,
      visits:[ { exh:'g5', exhName:'かたちなきものたちの声', period:'2026.7.10 - 2026.7.24', date:'2026.7.13', ts:20260713, reason:'dm' } ] },
    { id:'p6',  name:'渡辺 硝子', color:'linear-gradient(145deg,#aa7a9a,#7a3a6a)', watching:true,  since:'2026.2.20', ts:20260220, watchCount:25, checkinCount:10, interest:3, collectionCount:3,
      visits:[ { exh:'g5', exhName:'かたちなきものたちの声', period:'2026.7.10 - 2026.7.24', date:'2026.7.15', ts:20260715, reason:'sns' } ] },
    { id:'p7',  name:'村上 陽子', color:'linear-gradient(145deg,#c8b89a,#a09070)', watching:true,  since:'2026.1.12', ts:20260112, watchCount:8,  checkinCount:3,  interest:0,
      visits:[ { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.8.1',  ts:20260801, reason:'referral' } ] },
    { id:'p8',  name:'小林 志保', color:'linear-gradient(145deg,#8a9aaa,#4a5a7a)', watching:true,  since:'2026.5.25', ts:20260525, watchCount:12, checkinCount:5,  interest:2,
      visits:[ { exh:'g7', exhName:'路地裏の詩、冬の記録', period:'2025.12.1 - 2025.12.20', date:'2025.12.6',  ts:20251206, reason:'sns' } ] },
    { id:'p9',  name:'加藤 蒼', color:'linear-gradient(145deg,#a8b8c8,#6a8098)', watching:true,  since:'2026.6.8',  ts:20260608, watchCount:3,  checkinCount:1,  interest:0, visits:[] },
    { id:'p10', name:'吉田 織部', color:'linear-gradient(145deg,#8aaa6a,#4a7a2a)', watching:true,  since:'2026.3.27', ts:20260327, watchCount:18, checkinCount:7,  interest:1,
      visits:[ { exh:'g7', exhName:'路地裏の詩、冬の記録', period:'2025.12.1 - 2025.12.20', date:'2025.12.16', ts:20251216, reason:'kotennavi' } ] },
    { id:'p11', name:'山本 結', color:'linear-gradient(145deg,#c8a8b8,#986878)', watching:true,  since:'2026.4.21', ts:20260421, watchCount:44, checkinCount:20, interest:4, collectionCount:4,
      visits:[
        { exh:'g7', exhName:'路地裏の詩、冬の記録', period:'2025.12.1 - 2025.12.20', date:'2025.12.17', ts:20251217, reason:'know' },
        { exh:'g5', exhName:'かたちなきものたちの声', period:'2026.7.10 - 2026.7.24', date:'2026.7.22', ts:20260722, reason:'sns' },
      ] },
    { id:'p12', name:'岡田 陸', color:'linear-gradient(145deg,#9ab0c0,#5a7898)', watching:true,  since:'2026.2.2',  ts:20260202, watchCount:10, checkinCount:5,  interest:1,
      visits:[ { exh:'g4', exhName:'色彩のかけら、その先へ', period:'2026.7.25 - 2026.8.15', date:'2026.7.29', ts:20260729, reason:'other' } ] },
    { id:'p13', name:'鈴木 遥', color:'linear-gradient(145deg,#b8c8a8,#789068)', watching:true,  since:'2026.6.12', ts:20260612, watchCount:9,  checkinCount:2,  interest:1, visits:[] },
    { id:'p14', name:'松本 版画', color:'linear-gradient(145deg,#aaaa6a,#7a7a1a)', watching:true,  since:'2026.1.19', ts:20260119, watchCount:20, checkinCount:8,  interest:2, visits:[] },
    { id:'p15', name:'福田 玲奈', color:'linear-gradient(145deg,#c8b0a0,#987860)', watching:false, watchCount:5,  checkinCount:3,  interest:0,
      visits:[ { exh:'g5', exhName:'かたちなきものたちの声', period:'2026.7.10 - 2026.7.24', date:'2026.7.20', ts:20260720, reason:'kotennavi' } ] },
  ];

  /* 注目のオーディエンス：常連のファン＝チェックイン回数上位／最近つながった人＝ウォッチ開始・来場のうち
     最も新しい出来事順。一覧（PEOPLE）と同じデータソースだが、管理・検索でなく発見・称賛が目的の別コンポーネント。 */
  (function renderSpotlight() {
    var regularsEl = document.getElementById('p413SpotlightRegulars');
    var recentEl   = document.getElementById('p413SpotlightRecent');
    if (!regularsEl && !recentEl) return;

    function chip(p, metaText) {
      return '<a href="kotennavi-p5.html" class="p313-spotlight-chip">' +
        '<span class="p313-spotlight-chip__avatar" style="background:' + p.color + '">' + p.name.charAt(0) + '</span>' +
        '<span class="p313-spotlight-chip__body">' +
          '<span class="p313-spotlight-chip__name">' + p.name + '</span>' +
          '<span class="p313-spotlight-chip__meta">' + metaText + '</span>' +
        '</span>' +
      '</a>';
    }

    if (regularsEl) {
      var regulars = PEOPLE.filter(function (p) { return p.visits.length > 0; })
        .sort(function (a, b) { return b.visits.length - a.visits.length; })
        .slice(0, 3);
      regularsEl.innerHTML = regulars.length
        ? regulars.map(function (p) { return chip(p, 'チェックイン ' + p.visits.length + '回'); }).join('')
        : '<p class="p313-spotlight__empty">まだ来場記録がありません</p>';
    }

    if (recentEl) {
      function recentInfo(p) {
        var watchTs = p.watching ? p.ts : 0;
        var latestVisit = p.visits.length ? p.visits.reduce(function (m, v) { return v.ts > m.ts ? v : m; }) : null;
        var visitTs = latestVisit ? latestVisit.ts : 0;
        if (visitTs > watchTs) return { ts: visitTs, label: 'チェックイン ' + latestVisit.date };
        if (watchTs > 0)       return { ts: watchTs, label: 'ウォッチ開始 ' + p.since };
        return { ts: 0, label: '' };
      }
      var recent = PEOPLE.map(function (p) { return { p: p, info: recentInfo(p) }; })
        .filter(function (x) { return x.info.ts > 0; })
        .sort(function (a, b) { return b.info.ts - a.info.ts; })
        .slice(0, 3);
      recentEl.innerHTML = recent.length
        ? recent.map(function (x) { return chip(x.p, x.info.label); }).join('')
        : '<p class="p313-spotlight__empty">まだつながりがありません</p>';
    }
  })();

  function esc(s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }

  function makeItem(p, idSuffix) {
    var visitsSorted = p.visits.slice().sort(function (a, b) { return b.ts - a.ts; });
    var ckId = 'p413ck-' + (idSuffix || p.id);
    var memoId = 'p413memo-' + (idSuffix || p.id);
    var visitsHtml = visitsSorted.length ? '<div class="p313-ck-visits" id="' + ckId + '" hidden>' + visitsSorted.map(function (v) {
      return '<div class="p313-ck-visit">' +
        '<span class="p313-ck-visit__date">' + v.date + '</span>' +
        '<span class="p313-ck-visit__exh"><span class="ins-item-list__link-mark">展覧会</span><a class="p313-ck-visit__exh-link" href="kotennavi-p2.html">' + v.exhName + '</a> · ' + v.period + '</span>' +
        (v.reason ? '<span class="p313-ck-visit__reason">来場のきっかけ：' + ktnCheckinReasonLabel(v.reason) + '</span>' : '') +
      '</div>';
    }).join('') + '</div>' : '';
    /* トリガーは右カラム（.p313-rel）内・リスト本体は左右カラムの下に全幅で展開＝
       position別のためnative<details>でなくJS制御（aria-expanded＋hidden）で連結 */
    var toggleBtnHtml = visitsSorted.length ? '<button type="button" class="p313-ck-trigger" aria-expanded="false" aria-controls="' + ckId + '">来場履歴を見る（' + visitsSorted.length + '件）</button>' : '';
    /* 非公開メモ：ウォッチ/チェックインの記録とは別スコープ（(オーナー,この人物)ペアに紐づく独立データ）＝
       ウォッチ解除・チェックイン取消があっても消えない設計を想定（デモではPEOPLE配列上のp.memoに保持） */
    var memoBtnHtml = '<button type="button" class="p313-memo-trigger" aria-expanded="false" aria-controls="' + memoId + '">' + (p.memo ? 'メモを見る・編集' : 'メモを追加') + '</button>';
    var memoHtml = '<div class="p313-memo" id="' + memoId + '" data-pid="' + p.id + '" hidden>' +
      '<textarea class="p313-memo__input" placeholder="この人についてのメモ（例：話した内容・好みの作風・対応の注意点など）">' + esc(p.memo) + '</textarea>' +
      '<div class="p313-memo__foot">' +
        '<span class="p313-memo__note">オーナーのみ閲覧できます</span>' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--primary ktn-op-btn--sm p313-memo__save">保存</button>' +
      '</div>' +
    '</div>';
    return '<div class="p2-watcher-item">' +
      '<a href="kotennavi-p5.html" class="p2-watcher-item__avatar p2-watcher-item__avatar--user" style="background:' + p.color + '">' + p.name.charAt(0) + '</a>' +
      '<div class="p2-watcher-item__info p313-item-info">' +
        '<div class="p313-item-main">' +
          '<div class="uc__badge-row"><span class="cb cb-person cb-user">user</span></div>' +
          '<a href="kotennavi-p5.html" class="p2-watcher-item__name">' + p.name + '</a>' +
          '<div class="uc__counts">' +
            '<span class="uc__count">' + SVG_W + p.watchCount + '</span>' +
            '<span class="sep"></span>' +
            '<span class="uc__count">' + SVG_C + p.checkinCount + '</span>' +
            '<span class="sep"></span>' +
            '<span class="uc__count">' + SVG_I + p.interest + '</span>' +
            (p.collectionCount ? '<span class="sep"></span><span class="uc__count uc__count--collection">' + SVG_COL + p.collectionCount + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="p313-rel">' +
          (p.watching ? '<p class="p313-rel__line">ウォッチ中<span class="p313-rel__since">・' + p.since + '〜</span></p>' : '') +
          '<p class="p313-rel__line">チェックイン <strong>' + p.visits.length + '</strong>回</p>' +
          toggleBtnHtml +
          memoBtnHtml +
        '</div>' +
        visitsHtml +
        memoHtml +
      '</div>' +
    '</div>';
  }

  /* ── 一覧（PEOPLE全件を単一リストにし、フィルターチップで絞り込み） ── */
  var listEl   = document.getElementById('p413List');
  var emptyEl  = document.getElementById('p413Empty');
  var sortSel  = document.getElementById('p413Sort');
  var countEl  = document.getElementById('p413Count');
  var pagerEl  = document.getElementById('p413Pagination');
  var filterNav = document.getElementById('p413FilterTabs');
  var exhWrap  = document.getElementById('p413ExhFilterWrap');
  var exhSel   = document.getElementById('p413CkFilterExh');
  if (!listEl || !sortSel || !filterNav) return;

  var page = 1;
  var PER_PAGE = 8;
  var viewFilter = 'all';

  function sinceTs(p) { return p.watching ? p.ts : null; }
  function checkinLatestTs(p) { return p.visits.length ? Math.max.apply(null, p.visits.map(function (v) { return v.ts; })) : null; }

  var SORTS = {
    'since-desc': function (a, b) {
      var at = sinceTs(a), bt = sinceTs(b);
      if (at == null && bt == null) return 0;
      if (at == null) return 1;
      if (bt == null) return -1;
      return bt - at;
    },
    'checkin-desc': function (a, b) {
      var at = checkinLatestTs(a), bt = checkinLatestTs(b);
      if (at == null && bt == null) return 0;
      if (at == null) return 1;
      if (bt == null) return -1;
      return bt - at;
    },
    'count-desc': function (a, b) { return b.visits.length - a.visits.length; },
    'name':       function (a, b) { return a.name.localeCompare(b.name, 'ja'); },
  };

  function matchesFilter(p) {
    if (viewFilter === 'all')     return p.watching || p.visits.length > 0; /* ウォッチャー・チェックインを横断したすべて＝既定表示 */
    if (viewFilter === 'watch')   return p.watching;
    if (viewFilter === 'checkin') return p.visits.length > 0;
    return p.watching && p.visits.length > 0; /* both */
  }

  function syncExhVisibility() {
    if (exhWrap) exhWrap.hidden = (viewFilter === 'watch');
  }

  function render() {
    var fe = (exhSel && exhWrap && !exhWrap.hidden) ? exhSel.value : '';
    var rows = PEOPLE.filter(function (p) {
      if (!matchesFilter(p)) return false;
      if (fe && !p.visits.some(function (v) { return v.exh === fe; })) return false;
      return true;
    });
    rows.sort(SORTS[sortSel.value] || SORTS['since-desc']);
    if (countEl) countEl.textContent = rows.length + '件';
    if (emptyEl) emptyEl.hidden = rows.length !== 0;

    var totalPages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    listEl.innerHTML = pageRows.map(function (p) { return makeItem(p); }).join('');
    KTN.pagination.render(pagerEl, {
      page: page,
      totalPages: totalPages,
      onGoto: function (p) { page = p; render(); },
    });
  }

  function renderReset() { page = 1; render(); }

  filterNav.querySelectorAll('.p313-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      viewFilter = btn.dataset.filter;
      filterNav.querySelectorAll('.p313-tab').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      syncExhVisibility();
      renderReset();
    });
  });
  if (exhSel) exhSel.addEventListener('change', renderReset);
  sortSel.addEventListener('change', renderReset);

  /* 来場履歴トグル・メモ開閉/保存：再描画のたびにDOMが差し替わるため委譲（listEl／exhCkListEl共通で使う） */
  function handleAudienceItemClick(e) {
    var ckBtn = e.target.closest('.p313-ck-trigger');
    if (ckBtn) {
      var target = document.getElementById(ckBtn.getAttribute('aria-controls'));
      if (!target) return;
      var open = ckBtn.getAttribute('aria-expanded') === 'true';
      ckBtn.setAttribute('aria-expanded', String(!open));
      target.hidden = open;
      return;
    }
    var memoBtn = e.target.closest('.p313-memo-trigger');
    if (memoBtn) {
      var memoTarget = document.getElementById(memoBtn.getAttribute('aria-controls'));
      if (!memoTarget) return;
      var memoOpen = memoBtn.getAttribute('aria-expanded') === 'true';
      memoBtn.setAttribute('aria-expanded', String(!memoOpen));
      memoTarget.hidden = memoOpen;
      if (!memoOpen) {
        var ta = memoTarget.querySelector('.p313-memo__input');
        if (ta) ta.focus();
      }
      return;
    }
    var saveBtn = e.target.closest('.p313-memo__save');
    if (saveBtn) {
      var panel = saveBtn.closest('.p313-memo');
      if (!panel) return;
      var pid = panel.dataset.pid;
      var person = PEOPLE.filter(function (x) { return x.id === pid; })[0];
      if (!person) return;
      var input = panel.querySelector('.p313-memo__input');
      person.memo = input ? input.value.trim() : '';
      var trigger = document.querySelector('[aria-controls="' + panel.id + '"]');
      if (trigger) trigger.textContent = person.memo ? 'メモを見る・編集' : 'メモを追加';
      KTN.toast('メモを保存しました（自分のみ閲覧可）');
    }
  }

  listEl.addEventListener('click', handleAudienceItemClick);

  syncExhVisibility();
  render();

  /* ── 展覧会別チェックインリスト：PEOPLEのvisitsを展覧会単位に集約（チェックインが1件もない展覧会は
     マップに現れないため自然に除外される＝「チェックインのある展覧会だけを表示する」を満たす） ── */
  function buildExhCheckins() {
    var map = {};
    PEOPLE.forEach(function (p) {
      p.visits.forEach(function (v) {
        if (!map[v.exh]) map[v.exh] = { exh: v.exh, exhName: v.exhName, period: v.period, people: [], reasonCounts: {} };
        var g = map[v.exh];
        var entry = g.people.filter(function (x) { return x.p.id === p.id; })[0];
        if (!entry) { g.people.push({ p: p, ts: v.ts }); }
        else if (v.ts > entry.ts) { entry.ts = v.ts; }
        if (v.reason) g.reasonCounts[v.reason] = (g.reasonCounts[v.reason] || 0) + 1;
      });
    });
    return Object.keys(map).map(function (k) { return map[k]; }).sort(function (a, b) {
      var at = Math.max.apply(null, a.people.map(function (x) { return x.ts; }));
      var bt = Math.max.apply(null, b.people.map(function (x) { return x.ts; }));
      return bt - at;
    });
  }

  /* 展覧会グループの「来場のきっかけ」内訳：件数降順・チェックイン時に必須化した2026-08-29以降のデータのみ集計対象 */
  function reasonBreakdownHtml(reasonCounts) {
    var ids = Object.keys(reasonCounts);
    if (!ids.length) return '';
    var sorted = ids.sort(function (a, b) { return reasonCounts[b] - reasonCounts[a]; });
    var chips = sorted.map(function (id) {
      return '<span class="p313-exh-ck-item__reason-chip">' + ktnCheckinReasonLabel(id) + ' ' + reasonCounts[id] + '</span>';
    }).join('');
    return '<div class="p313-exh-ck-item__reasons"><span class="p313-exh-ck-item__reasons-label">来場のきっかけ内訳</span>' + chips + '</div>';
  }

  function makeExhCkItem(group, idx) {
    var peopleSorted = group.people.slice().sort(function (a, b) { return b.ts - a.ts; });
    var bodyId = 'p413exhck-' + idx;
    var cardsHtml = peopleSorted.map(function (entry) {
      return makeItem(entry.p, entry.p.id + '-exh' + idx);
    }).join('');
    return '<div class="p313-exh-ck-item">' +
      '<div class="p313-exh-ck-item__head" role="button" tabindex="0" aria-expanded="false" aria-controls="' + bodyId + '">' +
        '<span class="p313-exh-ck-item__main">' +
          '<a class="p313-exh-ck-item__name" href="kotennavi-p2.html" onclick="event.stopPropagation()">' + group.exhName + '</a>' +
          '<span class="p313-exh-ck-item__period">' + group.period + '</span>' +
        '</span>' +
        '<span class="ktn-count">' + group.people.length + '人</span>' +
      '</div>' +
      reasonBreakdownHtml(group.reasonCounts) +
      '<div class="p313-exh-ck-item__visitors" id="' + bodyId + '" hidden><div class="p2-watcher-list">' + cardsHtml + '</div></div>' +
    '</div>';
  }

  var exhCkListEl  = document.getElementById('p413ExhCkList');
  var exhCkEmptyEl = document.getElementById('p413ExhCkEmpty');
  if (exhCkListEl) {
    var exhCkGroups = buildExhCheckins();
    exhCkListEl.innerHTML = exhCkGroups.map(makeExhCkItem).join('');
    if (exhCkEmptyEl) exhCkEmptyEl.hidden = exhCkGroups.length !== 0;
    exhCkListEl.addEventListener('click', function (e) {
      if (e.target.closest('.p313-exh-ck-item__name')) return;
      var headBtn = e.target.closest('.p313-exh-ck-item__head');
      if (headBtn) {
        var target = document.getElementById(headBtn.getAttribute('aria-controls'));
        if (target) {
          var open = headBtn.getAttribute('aria-expanded') === 'true';
          headBtn.setAttribute('aria-expanded', String(!open));
          target.hidden = open;
        }
        return;
      }
      handleAudienceItemClick(e);
    });
  }

  /* ── ビュー切替：人にフォーカスするオーディエンスリスト／展覧会にフォーカスするチェックインリスト ── */
  var viewTabsNav    = document.getElementById('p413ViewTabs');
  var viewAudienceEl = document.getElementById('p413ViewAudience');
  var viewExhEl      = document.getElementById('p413ViewExh');
  if (viewTabsNav) {
    viewTabsNav.querySelectorAll('.p313-view-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = btn.dataset.view;
        viewTabsNav.querySelectorAll('.p313-view-tab').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        if (viewAudienceEl) viewAudienceEl.hidden = view !== 'audience';
        if (viewExhEl) viewExhEl.hidden = view !== 'exhibition';
      });
    });
  }

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
};

/* ════════════════════════════════════════════════════
   P3-18  クリエイター-展覧会管理（p4-18=ギャラリー版と対）
   投稿者＝田中透 本人の展覧会のみ一覧（出展クリエイターとして参加のみの展覧会は含まない＝p3-1で確認）。
   .p319-* を共有ネームスペースとして再利用（記事管理と同型の identity strip → mgmt-head → 新規CTA →
   注記 → 下書きバナー → ツールバー → 一覧 → 削除モーダル）。展覧会固有の状態（管理者確認待ち／非公開）は
   sb-*（開催ステータス）とは別カテゴリのため、page-local な .p318-status で表現し badge system には加えない。
════════════════════════════════════════════════════ */
KTN.pages['p3-18'] = function () {

  /* ── サンプルデータ（田中透が投稿者の展覧会）──
     confirmed＝管理者確認済み。publishMode／publishDate＝p2-11「公開設定」でオーナーが投稿時に選んだ値
     （'now'＝確認完了後すぐ公開、'scheduled'＝確認完了後に指定日時で自動公開）。オーナーは確認前（投稿時点）に
     既にこれを選択済みのことがあるため、confirmed:false（確認待ち）や published:true（公開済み後も履歴として
     残る）の項目にも publishMode/publishDate が入っている場合がある。statusNoteHtml の「公開日指定」注記は
     publishMode==='scheduled'＋publishDate があれば confirmed/published を問わず常に表示する（x2＝確認待ち・
     x8＝確認済み未公開・x6＝公開済み後の3件すべてに出る＝2026-08-16 是正）。一方ステータスフィルタ「公開日前」
     は別軸の判定＝上記に加え !published（まだ公開日を迎えていない）も条件にするため x2/x8 の2件のみ該当し
     x6（公開済み）は外れる＝注記件数とフィルタ件数が一致しないのは意図的な設計。
     published＝実際に公開済みかどうか（confirmed かつ 'now'、または確認済みで publishDate 到来後に true になる）。
     sstatus＝開催期間の時間軸ステータス（バッジ・フィルタ選択肢には出さない。並べ替え「開催日が早い順」の他、
     'closed'＝会期終了はこの一覧自体から除外する判定に使用。削除可否は sstatus でなく confirmed で判定する＝
     管理者確認後は削除不可、確認待ちの間のみ削除可・2026-08-16）。
     liaison＝confirmed が true になるまで設定不可（出展クリエイターは管理者確認を経て確定するため、確認待ち中は
     LIAISON/LIAISON+ を紐付けられない業務ルール。confirmed:false の項目は liaison を必ず空にする）。
     reg/upd＝登録日・最終更新日。rs＝登録日の並べ替えキー。pd＝会期開始日の並べ替えキー（YYYYMMDD）。
     draft＝下書き（未完成・一覧の最上部固定）。 */
  var EXHIBITIONS = [
    { id:'x1', title:'光と影の間に（仮）', type:'other',
      venue:'', period:'', liaison:'', confirmed:false, published:false, publishMode:'now', publishDate:'', sstatus:'',
      reg:'2026.7.28', upd:'2026.7.28', rs:20260728, pd:0, draft:true, bg:'linear-gradient(155deg,#dcdcdc,#a8a8a8)' },
    { id:'x2', title:'とおくの声、ちかくの気配', type:'solo',
      venue:'スペースYUI', period:'2026.9.5 - 2026.9.20', liaison:'', confirmed:false, published:false, publishMode:'scheduled', publishDate:'2026.8.20', sstatus:'',
      reg:'2026.7.25', upd:'2026.7.26', rs:20260725, pd:20260905, draft:false, bg:'linear-gradient(155deg,#d8c8e8,#a888cc)' },
    /* x3＝非公開（管理者が取り下げ済み）のサンプル。非公開は管理者専用状態のためこの一覧には表示されない
       （render()のpubStatus==='unpublished'除外フィルタで常に非表示になることを示すデータとして残す） */
    { id:'x3', title:'破片のかたち', type:'solo',
      venue:'渋谷アートラボ', period:'2026.9.1 - 2026.9.10', liaison:'', confirmed:true, published:false, publishMode:'now', publishDate:'', sstatus:'',
      reg:'2026.6.10', upd:'2026.6.12', rs:20260610, pd:20260901, draft:false, bg:'linear-gradient(155deg,#f0d0d0,#c88080)' },
    { id:'x8', title:'花と刃、静かな部屋', type:'solo',
      venue:'GALLERY X', period:'2026.9.12 - 2026.9.25', liaison:'li-plus', confirmed:true, published:false, publishMode:'scheduled', publishDate:'2026.9.1', sstatus:'',
      reg:'2026.6.30', upd:'2026.7.20', rs:20260630, pd:20260912, draft:false, bg:'linear-gradient(155deg,#e8d8c0,#c8a468)' },
    { id:'x4', title:'水のうつわ、光のかけら', type:'solo',
      venue:'GALLERY X', period:'2026.7.20 - 2026.8.10', liaison:'li-plus', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'live',
      reg:'2026.5.2', upd:'2026.7.18', rs:20260502, pd:20260720, draft:false, bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)' },
    { id:'x9', title:'透きとおる季節の輪郭', type:'solo',
      venue:'スペースYUI', period:'2026.8.8 - 2026.8.18', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'soon',
      reg:'2026.6.5', upd:'2026.7.30', rs:20260605, pd:20260808, draft:false, bg:'linear-gradient(155deg,#d0d8f0,#8090cc)' },
    { id:'x5', title:'まなざしの重奏', type:'group',
      venue:'3331 Arts Chiyoda', period:'2026.7.25 - 2026.8.5', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'ending',
      reg:'2026.5.20', upd:'2026.7.15', rs:20260520, pd:20260725, draft:false, bg:'linear-gradient(155deg,#f0e8d0,#d4b896)' },
    { id:'x6', title:'遠い記憶の輪郭', type:'solo',
      venue:'東京都現代美術館', period:'2026.10.1 - 2026.10.20', liaison:'li', confirmed:true, published:true, publishMode:'scheduled', publishDate:'2026.9.10', sstatus:'upcoming',
      reg:'2026.6.25', upd:'2026.6.28', rs:20260625, pd:20261001, draft:false, bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)' },
    { id:'x7', title:'ことばの余白', type:'solo',
      venue:'渋谷アートラボ', period:'2025.12.1 - 2025.12.20', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'closed',
      reg:'2025.10.5', upd:'2025.12.21', rs:20251005, pd:20251201, draft:false, bg:'linear-gradient(155deg,#e0d4bc,#b8a884)' },
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

  /* 確認待ち／公開予定／非公開／公開中の実効値（フィルタ・バッジの両方で使用。開催期間は含まない） */
  function pubStatus(e) {
    if (!e.confirmed) return 'pending';
    if (!e.published) return (e.publishMode === 'scheduled' && e.publishDate) ? 'scheduled' : 'unpublished';
    return 'published';
  }

  function p211Link(mode, id) {
    return 'kotennavi-p2-11.html?mode=' + mode + '&author=tanaka&self=1&exh=' + encodeURIComponent(id);
  }

  /* 公開展覧会ページへのリンク先。確認待ち／非公開／下書きは公開ページが存在しないため null */
  function exhLink(e) {
    return (isDraft(e) || !e.confirmed || !e.published) ? null : 'kotennavi-p2.html';
  }

  /* タイトル行バッジ＝公開中／公開前の2値のみ（開催期間ステータスは持たない） */
  function statusHtml(e) {
    if (isDraft(e)) return '';
    var s = pubStatus(e);
    if (s === 'unpublished') return ''; /* 非公開はrenderで一覧から除外されるためここには到達しない防御コード */
    return s === 'published'
      ? '<span class="p318-status p318-status--live">公開中</span>'
      : '<span class="p318-status p318-status--pre">公開前</span>';
  }

  /* 公開日指定の補足テキスト＝公開設定で「公開日を指定する」（publishMode==='scheduled'＋publishDate）を
     選んだ項目には確認待ち／公開済みを問わず常に表示する（2026-08-16 是正）。「公開日指定：日付が設定されて
     いる」という事実そのものを示す注記であり、後述のステータスフィルタ「公開日前」（＝まだ公開日を迎えて
     いない項目に絞る）とは目的が異なる別軸のため、表示件数とフィルタの絞り込み件数は一致しなくてよい
     （公開済み後も設定日は履歴として注記に残るが、フィルタ「公開日前」からは外れる）。
     確認待ちは下書きと同様に右肩リボンで表示するためここには出さない（2026-08-16 リボン化）。 */
  function statusNoteHtml(e) {
    if (isDraft(e)) return '';
    if (e.publishMode === 'scheduled' && e.publishDate) {
      return '<span class="p318-status-note p318-status-note--scheduled">公開日指定:' + e.publishDate + '</span>';
    }
    return '';
  }

  /* ── アイテム生成 ── */
  function makeItem(e) {
    var draft = isDraft(e);
    var pending = !draft && !e.confirmed;
    var el = exhLink(e);
    /* 削除できるのは「確認待ち」の間だけ（管理者確認後は削除不可・2026-08-16）。
       会期終了後の展覧会は render() のフィルタでこの一覧自体に出てこないため、編集リンクは
       ended 判定を持たず常に表示してよい（確認待ちのまま会期を過ぎることは業務上想定しない）。 */
    var deletable = draft || !e.confirmed;
    var noteHtml = statusNoteHtml(e);
    /* confirmed になるまで出展クリエイターが確定しないため、確認待ち中は LIAISON/LIAISON+ を表示しない（業務ルール） */
    var liaisonHtml = (e.confirmed && e.liaison)
      ? '<span class="lb-dot ' + e.liaison + '"><span class="lb-dot-inner"></span>' + (e.liaison === 'li-plus' ? 'LIAISON+' : 'LIAISON') + '</span>'
      : '';

    var li = document.createElement('li');
    li.className = 'p319-item' + (draft ? ' p319-item--draft' : '');
    li.dataset.id = e.id;
    li.innerHTML =
      (draft ? '<span class="p319-item__ribbon">下書き</span>' : (pending ? '<span class="p319-item__ribbon p319-item__ribbon--pending">確認待ち</span>' : '')) +
      '<div class="p319-item__main' + (el ? ' p319-item__main--link" title="クリックで展覧会ページを新しいタブで表示' : '') + '">' +
        '<div class="p319-item__thumb" style="background:' + e.bg + '"></div>' +
        '<div class="p319-item__body">' +
          '<div class="p319-item__title-row">' +
            '<span class="cb cb-content cb-exhibition">exhibition</span>' +
            liaisonHtml +
            statusHtml(e) +
          '</div>' +
          '<div class="p319-item__title">' + e.title + '</div>' +
          '<div class="p319-item__dest">' + (e.venue || '会場未定') + '<span class="p319-item__dates-sep">·</span>' + (e.period || '会期未定') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p319-item__dates">' +
        (noteHtml ? '<span class="p318-status-note-wrap">' + noteHtml + '</span>' : '') +
        '<span class="p319-item__dates-text">登録 ' + e.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + e.upd + '</span>' +
      '</div>' +
      '<div class="p319-item__actions">' +
        (deletable ? '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' : '') +
        (draft
          ? '<a class="ktn-action-btn" href="' + p211Link('edit', e.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p211Link('clone', e.id) + '">クローン →</a>' +
            '<a class="ktn-action-btn" href="' + p211Link('edit', e.id) + '">編集 →</a>') +
      '</div>';
    return li;
  }

  /* ── フィルタ・並べ替え描画 ── */
  var SORTS = {
    'reg-desc':    function (a, b) { return b.rs - a.rs; },
    'reg-asc':     function (a, b) { return a.rs - b.rs; },
    'title':       function (a, b) { return a.title.localeCompare(b.title, 'ja'); },
    /* pd＝会期開始日（YYYYMMDD）の昇順＝開催開始日が早い順（2026-08-16 ラベルを「開催日順」→「開催日が早い順」に是正、ロジックは変更なし） */
    'period-asc':  function (a, b) { return (a.pd || 0) - (b.pd || 0); },
  };

  function render() {
    var ft = typeSel.value;
    var fs = statusSel.value;
    var rows = EXHIBITIONS.filter(function (e) {
      /* 下書き＝別もの。種別・ステータスで絞り込む時は候補から外す（「すべて」表示時のみ最上部に固定） */
      if (isDraft(e)) return ft === '' && fs === '';
      /* 非公開＝管理者専用の状態遷移（オーナー操作の対象外）。この一覧には常に表示しない */
      if (pubStatus(e) === 'unpublished') return false;
      /* 会期終了後の展覧会は編集・削除ができなくなるため、この一覧自体から除外する（2026-08-16） */
      if (!isDraft(e) && e.sstatus === 'closed') return false;
      if (ft && e.type !== ft) return false;
      /* フィルタ「公開日前」＝公開日指定が設定済みだがまだ公開されていない項目のみ（pubStatus とは別軸の
         判定。公開日指定の注記〔statusNoteHtml〕は公開済み後も履歴として残るため常に出るが、このフィルタは
         「まだ公開日を迎えていない」に絞るので e.published を除外条件に持つ・2026-08-16） */
      if (fs === 'scheduled') {
        if (!(e.publishMode === 'scheduled' && e.publishDate && !e.published)) return false;
      } else if (fs && pubStatus(e) !== fs) {
        return false;
      }
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
      var s = pubStatus(e);
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
          '<div class="p319-dup-modal__item-badges">' + statusHtml(e) + statusNoteHtml(e) + '</div>' +
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
};

/* ════════════════════════════════════════════════════
   P4-18  ギャラリー-展覧会管理（P3-18のギャラリー版・2026-08-02 展開）
   ════════════════════════════════════════════════════ */
KTN.pages['p4-18'] = function () {

  /* ── サンプルデータ（Gallery SOIL 渋谷が投稿者の展覧会）──
     ギャラリーは会場が自ギャラリー1つに固定のため、P3-18（クリエイター・会場が展覧会ごとに異なる）と異なり
     venue は全項目で 'Gallery SOIL 渋谷' に統一。同一会場のため確認済み（非終了）項目の会期は互いに重複しない
     ように設計（実在の会場予約として矛盾しないため）。フィールドの意味は P3-18 と同一（confirmed/published/
     publishMode/publishDate/sstatus/liaison/pd/draft の関係はそちらのコメント参照）。 */
  var EXHIBITIONS = [
    { id:'g1', title:'記憶の断片、再構成（仮）', type:'other',
      venue:'Gallery SOIL 渋谷', period:'', liaison:'', confirmed:false, published:false, publishMode:'now', publishDate:'', sstatus:'',
      reg:'2026.7.30', upd:'2026.7.30', rs:20260730, pd:0, draft:true, bg:'linear-gradient(155deg,#dcdcdc,#a8a8a8)' },
    { id:'g2', title:'波のあとさき', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.11.10 - 2026.11.25', liaison:'', confirmed:false, published:false, publishMode:'scheduled', publishDate:'2026.10.25', sstatus:'',
      reg:'2026.7.20', upd:'2026.7.29', rs:20260720, pd:20261110, draft:false, bg:'linear-gradient(155deg,#d8c8e8,#a888cc)' },
    /* g3＝非公開（管理者が取り下げ済み）のサンプル。非公開は管理者専用状態のためこの一覧には表示されない
       （render()のpubStatus==='unpublished'除外フィルタで常に非表示になることを示すデータとして残す） */
    { id:'g3', title:'静物と光の対話', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.10.20 - 2026.11.5', liaison:'', confirmed:true, published:false, publishMode:'now', publishDate:'', sstatus:'',
      reg:'2026.6.15', upd:'2026.6.18', rs:20260615, pd:20261020, draft:false, bg:'linear-gradient(155deg,#f0d0d0,#c88080)' },
    { id:'g8', title:'硝子の向こう側', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.10.1 - 2026.10.15', liaison:'li-plus', confirmed:true, published:false, publishMode:'scheduled', publishDate:'2026.9.20', sstatus:'',
      reg:'2026.6.5', upd:'2026.7.22', rs:20260605, pd:20261001, draft:false, bg:'linear-gradient(155deg,#e8d8c0,#c8a468)' },
    { id:'g6', title:'遠雷、まだ見ぬ景色', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.9.5 - 2026.9.25', liaison:'li', confirmed:true, published:true, publishMode:'scheduled', publishDate:'2026.8.20', sstatus:'upcoming',
      reg:'2026.6.20', upd:'2026.6.25', rs:20260620, pd:20260905, draft:false, bg:'linear-gradient(155deg,#d0e8f0,#7ab4cc)' },
    { id:'g9', title:'影を纏う、朝の記憶', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.8.16 - 2026.8.30', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'soon',
      reg:'2026.6.1', upd:'2026.7.28', rs:20260601, pd:20260816, draft:false, bg:'linear-gradient(155deg,#d0d8f0,#8090cc)' },
    { id:'g4', title:'色彩のかけら、その先へ', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2026.7.25 - 2026.8.15', liaison:'li-plus', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'live',
      reg:'2026.5.10', upd:'2026.7.24', rs:20260510, pd:20260725, draft:false, bg:'linear-gradient(155deg,#b8d8cc,#6a9e8a)' },
    { id:'g5', title:'かたちなきものたちの声', type:'group',
      venue:'Gallery SOIL 渋谷', period:'2026.7.10 - 2026.7.24', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'ending',
      reg:'2026.5.5', upd:'2026.7.9', rs:20260505, pd:20260710, draft:false, bg:'linear-gradient(155deg,#f0e8d0,#d4b896)' },
    { id:'g7', title:'路地裏の詩、冬の記録', type:'solo',
      venue:'Gallery SOIL 渋谷', period:'2025.12.1 - 2025.12.20', liaison:'', confirmed:true, published:true, publishMode:'now', publishDate:'', sstatus:'closed',
      reg:'2025.10.1', upd:'2025.12.21', rs:20251001, pd:20251201, draft:false, bg:'linear-gradient(155deg,#e0d4bc,#b8a884)' },
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

  /* 確認待ち／公開予定／非公開／公開中の実効値（フィルタ・バッジの両方で使用。開催期間は含まない） */
  function pubStatus(e) {
    if (!e.confirmed) return 'pending';
    if (!e.published) return (e.publishMode === 'scheduled' && e.publishDate) ? 'scheduled' : 'unpublished';
    return 'published';
  }

  function p211Link(mode, id) {
    return 'kotennavi-p2-11.html?mode=' + mode + '&role=gallery&self=1&exh=' + encodeURIComponent(id);
  }

  /* 公開展覧会ページへのリンク先。確認待ち／非公開／下書きは公開ページが存在しないため null */
  function exhLink(e) {
    return (isDraft(e) || !e.confirmed || !e.published) ? null : 'kotennavi-p2.html';
  }

  /* タイトル行バッジ＝公開中／公開前の2値のみ（開催期間ステータスは持たない） */
  function statusHtml(e) {
    if (isDraft(e)) return '';
    var s = pubStatus(e);
    if (s === 'unpublished') return ''; /* 非公開はrenderで一覧から除外されるためここには到達しない防御コード */
    return s === 'published'
      ? '<span class="p318-status p318-status--live">公開中</span>'
      : '<span class="p318-status p318-status--pre">公開前</span>';
  }

  /* 公開日指定の補足テキスト＝公開設定で「公開日を指定する」（publishMode==='scheduled'＋publishDate）を
     選んだ項目には確認待ち／公開済みを問わず常に表示する（2026-08-16 是正）。「公開日指定：日付が設定されて
     いる」という事実そのものを示す注記であり、後述のステータスフィルタ「公開日前」（＝まだ公開日を迎えて
     いない項目に絞る）とは目的が異なる別軸のため、表示件数とフィルタの絞り込み件数は一致しなくてよい
     （公開済み後も設定日は履歴として注記に残るが、フィルタ「公開日前」からは外れる）。
     確認待ちは下書きと同様に右肩リボンで表示するためここには出さない（2026-08-16 リボン化）。 */
  function statusNoteHtml(e) {
    if (isDraft(e)) return '';
    if (e.publishMode === 'scheduled' && e.publishDate) {
      return '<span class="p318-status-note p318-status-note--scheduled">公開日指定:' + e.publishDate + '</span>';
    }
    return '';
  }

  /* ── アイテム生成 ── */
  function makeItem(e) {
    var draft = isDraft(e);
    var pending = !draft && !e.confirmed;
    var el = exhLink(e);
    /* 削除できるのは「確認待ち」の間だけ（管理者確認後は削除不可・P3-18と同一・2026-08-16）。
       会期終了後の展覧会は render() のフィルタでこの一覧自体に出てこないため、編集リンクは
       ended 判定を持たず常に表示してよい（確認待ちのまま会期を過ぎることは業務上想定しない）。 */
    var deletable = draft || !e.confirmed;
    var noteHtml = statusNoteHtml(e);
    /* confirmed になるまで出展クリエイターが確定しないため、確認待ち中は LIAISON/LIAISON+ を表示しない（業務ルール） */
    var liaisonHtml = (e.confirmed && e.liaison)
      ? '<span class="lb-dot ' + e.liaison + '"><span class="lb-dot-inner"></span>' + (e.liaison === 'li-plus' ? 'LIAISON+' : 'LIAISON') + '</span>'
      : '';

    var li = document.createElement('li');
    li.className = 'p319-item' + (draft ? ' p319-item--draft' : '');
    li.dataset.id = e.id;
    li.innerHTML =
      (draft ? '<span class="p319-item__ribbon">下書き</span>' : (pending ? '<span class="p319-item__ribbon p319-item__ribbon--pending">確認待ち</span>' : '')) +
      '<div class="p319-item__main' + (el ? ' p319-item__main--link" title="クリックで展覧会ページを新しいタブで表示' : '') + '">' +
        '<div class="p319-item__thumb" style="background:' + e.bg + '"></div>' +
        '<div class="p319-item__body">' +
          '<div class="p319-item__title-row">' +
            '<span class="cb cb-content cb-exhibition">exhibition</span>' +
            liaisonHtml +
            statusHtml(e) +
          '</div>' +
          '<div class="p319-item__title">' + e.title + '</div>' +
          '<div class="p319-item__dest">' + (e.venue || '会場未定') + '<span class="p319-item__dates-sep">·</span>' + (e.period || '会期未定') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="p319-item__dates">' +
        (noteHtml ? '<span class="p318-status-note-wrap">' + noteHtml + '</span>' : '') +
        '<span class="p319-item__dates-text">登録 ' + e.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + e.upd + '</span>' +
      '</div>' +
      '<div class="p319-item__actions">' +
        (deletable ? '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' : '') +
        (draft
          ? '<a class="ktn-action-btn" href="' + p211Link('edit', e.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p211Link('clone', e.id) + '">クローン →</a>' +
            '<a class="ktn-action-btn" href="' + p211Link('edit', e.id) + '">編集 →</a>') +
      '</div>';
    return li;
  }

  /* ── フィルタ・並べ替え描画 ── */
  var SORTS = {
    'reg-desc':    function (a, b) { return b.rs - a.rs; },
    'reg-asc':     function (a, b) { return a.rs - b.rs; },
    'title':       function (a, b) { return a.title.localeCompare(b.title, 'ja'); },
    /* pd＝会期開始日（YYYYMMDD）の昇順＝開催開始日が早い順（2026-08-16 ラベルを「開催日順」→「開催日が早い順」に是正、ロジックは変更なし） */
    'period-asc':  function (a, b) { return (a.pd || 0) - (b.pd || 0); },
  };

  function render() {
    var ft = typeSel.value;
    var fs = statusSel.value;
    var rows = EXHIBITIONS.filter(function (e) {
      /* 下書き＝別もの。種別・ステータスで絞り込む時は候補から外す（「すべて」表示時のみ最上部に固定） */
      if (isDraft(e)) return ft === '' && fs === '';
      /* 非公開＝管理者専用の状態遷移（オーナー操作の対象外）。この一覧には常に表示しない */
      if (pubStatus(e) === 'unpublished') return false;
      /* 会期終了後の展覧会は編集・削除ができなくなるため、この一覧自体から除外する（2026-08-16） */
      if (!isDraft(e) && e.sstatus === 'closed') return false;
      if (ft && e.type !== ft) return false;
      /* フィルタ「公開日前」＝公開日指定が設定済みだがまだ公開されていない項目のみ（pubStatus とは別軸の
         判定。公開日指定の注記〔statusNoteHtml〕は公開済み後も履歴として残るため常に出るが、このフィルタは
         「まだ公開日を迎えていない」に絞るので e.published を除外条件に持つ・2026-08-16） */
      if (fs === 'scheduled') {
        if (!(e.publishMode === 'scheduled' && e.publishDate && !e.published)) return false;
      } else if (fs && pubStatus(e) !== fs) {
        return false;
      }
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
      var s = pubStatus(e);
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
          '<div class="p319-dup-modal__item-badges">' + statusHtml(e) + statusNoteHtml(e) + '</div>' +
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
    { id:'e2', title:'会期終了レポート', type:'f',
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
      '<div class="p319-item__dates">'
        + '<span class="p319-item__dates-text">登録 ' + a.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + a.upd + '</span>'
      + '</div>' +
      '<div class="p319-item__actions">' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' +
        (draft
          ? '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集 →</a>') +
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
    { id:'f3', title:'《オノマトペの庭》その後', type:'c',
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
      '<div class="p319-item__dates">'
        + '<span class="p319-item__dates-text">登録 ' + a.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + a.upd + '</span>'
      + '</div>' +
      '<div class="p319-item__actions">' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' +
        (draft
          ? '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集 →</a>') +
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

  /* ktnRenderを空関数で上書きすると、ヘッダーacts（getActions）がKTN.init初期表示のまま固まり、
     デモバーでロールを切替えても「管理者」メニュー等が反映されないバグになるため、
     既存のヘッダー再描画（KTN.initが設定した_renderHeader）を必ず呼び出す（2026-08-21修正）。 */
  var _prevRender = window.ktnRender;
  window.ktnRender = function () { if (typeof _prevRender === 'function') _prevRender(); };
};

/* ════════════════════════════════════════════════════
   P2-14  展覧会-インサイト
════════════════════════════════════════════════════ */
KTN.pages['p2-14'] = function () {

  var periodBox = document.getElementById('p214Period');
  if (periodBox) {
    var P214_EXH_START = new Date(2026, 1, 18);
    var P214_EXH_END = new Date(2026, 2, 5);
    var breakdownBox = document.getElementById('p214DuringBreakdown');
    var legendEl = document.getElementById('p214TrendLegend');
    var fmtR = function (d) { return (d.getMonth() + 1) + '/' + d.getDate(); };
    var buildKpiSegs = function (segs, res) {
      return segs.filter(function (s) { return s.len > 0; }).map(function (s) {
        var slice = res.vals.slice(s.from, s.from + s.len);
        var sum = slice.reduce(function (a, b) { return a + b; }, 0);
        var d1 = res.dates[s.from], d2 = res.dates[s.from + s.len - 1];
        return '<div class="ins-kpi ins-kpi--sm"><p class="ins-kpi__label">' + s.label + '</p><p class="ins-kpi__val">' + ktnFmtNum(sum) + '<span class="unit">回</span></p><p class="ins-kpi__sub">' + fmtR(d1) + '〜' + fmtR(d2) + '</p></div>';
      }).join('');
    };
    var renderPhase = function (phase) {
      var res = KTN.renderExhTrend('p214Trend', phase, P214_EXH_START, P214_EXH_END, 99);
      if (legendEl && res) {
        if (phase === 'before') {
          legendEl.textContent = '日別ページ閲覧数（会期前・開催14日前〜前日）';
        } else if (phase === 'during') {
          legendEl.textContent = '日別ページ閲覧数（会期中・' + fmtR(P214_EXH_START) + '〜' + fmtR(P214_EXH_END) + '・全' + res.dates.length + '日）';
        } else if (phase === 'all') {
          legendEl.textContent = '日別ページ閲覧数（全期間・' + fmtR(res.dates[0]) + '〜現在・会期前後を含む）';
        } else {
          legendEl.textContent = '日別ページ閲覧数（会期終了後・' + fmtR(res.dates[0]) + '〜現在）';
        }
      }
      if (breakdownBox) {
        if (res && res.segs && phase === 'all') {
          breakdownBox.innerHTML = buildKpiSegs(res.segs, res);
          breakdownBox.hidden = false;
        } else {
          breakdownBox.hidden = true;
        }
      }
    };
    renderPhase((window.KTN && KTN.exh && KTN.exh.phase) || 'during');
    periodBox.querySelectorAll('.ins-period__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        periodBox.querySelectorAll('.ins-period__btn').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        renderPhase(btn.dataset.phase);
      });
    });
  }

  // 作品への関心：LIAISON+＝購入まで含む4段ファネル／LIAISON＝閲覧→興味あり！の2段／作品0件（未利用）＝利用開始プロンプト
  // リエゾンは全展覧会のデフォルト（「利用しない」状態は存在しない・2026-08-26確定）のため、
  // 案内表示の分岐は liaison mode（plus/liaison）ではなく作品登録の有無（KTN.exh.works）で行う。
  function syncFunnel() {
    var mode = (window.KTN && KTN.exh && KTN.exh.liaison) || 'liaison';
    var phase = (window.KTN && KTN.exh && KTN.exh.phase) || 'during';
    var locked = phase === 'after';
    var hasWorks = !(window.KTN && KTN.exh && KTN.exh.works === 'no');
    var funnel = document.getElementById('p214Funnel');
    var note = document.getElementById('p214FunnelNote');
    var lite = document.getElementById('p214FunnelLite');
    var liteNote = document.getElementById('p214FunnelLiteNote');
    var notice = document.getElementById('p214FunnelNotice');
    var noticeLink = document.getElementById('p214FunnelNoticeLink');
    var isPlus = mode === 'plus';
    var isLiaison = mode === 'liaison';
    if (funnel) funnel.hidden = !(isPlus && hasWorks);
    if (note) note.hidden = !(isPlus && hasWorks);
    if (lite) lite.hidden = !(isLiaison && hasWorks);
    if (liteNote) liteNote.hidden = !(isLiaison && hasWorks) || locked;
    // 作品0件（未利用）の案内は会期終了後は促さない（終了後に新規登録を勧めても意味が薄いため）
    if (notice) notice.hidden = hasWorks || locked;
    if (noticeLink) noticeLink.setAttribute('href', isPlus ? 'kotennavi-p2-12-1.html' : 'kotennavi-p2-12.html');
  }
  syncFunnel();

  // 記事・作品への関心 見出しカウンター＋記事未投稿の案内
  function syncArticleResponse() {
    var articles = (window.KTN && KTN.exh && KTN.exh.articles) || 'yes';
    var mode = (window.KTN && KTN.exh && KTN.exh.liaison) || 'liaison';
    var hasWorks = !(window.KTN && KTN.exh && KTN.exh.works === 'no');
    var phase = (window.KTN && KTN.exh && KTN.exh.phase) || 'during';
    var notOver = phase !== 'after';

    var artVal = document.getElementById('p214ArticleViewsVal');
    var artSub = document.getElementById('p214ArticleViewsSub');
    var artNotice = document.getElementById('p214ArticleNotice');
    var artTopList = document.getElementById('p214ArticleTopList');
    if (articles === 'yes') {
      if (artVal) artVal.innerHTML = '1420<span class="unit">回</span>';
      if (artSub) artSub.textContent = 'この展覧会に関する記事3本の全期間の閲覧数合計';
      if (artNotice) artNotice.hidden = true;
      if (artTopList) artTopList.hidden = false;
    } else {
      if (artVal) artVal.innerHTML = '0<span class="unit">回</span>';
      if (artSub) artSub.textContent = 'この展覧会に関する記事はまだありません';
      if (artNotice) artNotice.hidden = !notOver;
      if (artTopList) artTopList.hidden = true;
    }

    var wViewsVal = document.getElementById('p214ArtworkViewsVal');
    var wViewsSub = document.getElementById('p214ArtworkViewsSub');
    var wVal = document.getElementById('p214ArtworkInterestVal');
    var wSub = document.getElementById('p214ArtworkInterestSub');
    if (wVal && wSub) {
      if (!hasWorks) {
        if (wViewsVal) wViewsVal.innerHTML = '0<span class="unit">回</span>';
        if (wViewsSub) wViewsSub.textContent = '作品はまだ登録されていません';
        wVal.innerHTML = '0<span class="unit">件</span>';
        wSub.textContent = '作品はまだ登録されていません';
      } else if (mode === 'plus') {
        if (wViewsVal) wViewsVal.innerHTML = '743<span class="unit">回</span>';
        if (wViewsSub) wViewsSub.textContent = 'LIAISON+出品作品ページ閲覧数（会期＋販売期間の合計）';
        wVal.innerHTML = '71<span class="unit">件</span>';
        wSub.textContent = 'LIAISON+出品作品の「興味あり！」合計（会期＋販売期間）';
      } else {
        if (wViewsVal) wViewsVal.innerHTML = '512<span class="unit">回</span>';
        if (wViewsSub) wViewsSub.textContent = 'LIAISON出品作品ページ閲覧数（会期のみの合計）';
        wVal.innerHTML = '46<span class="unit">件</span>';
        wSub.textContent = 'LIAISON出品作品の「興味あり！」合計（会期のみ）';
      }
    }
    // 作品未登録（0件）時は人気作品ランキングを表示しない
    var artworkTopList = document.getElementById('p214ArtworkTopList');
    if (artworkTopList) artworkTopList.hidden = !hasWorks;
  }
  syncArticleResponse();

  // Section1「さらに活用したい場合は…」のQR/フライヤー作成導線。会期終了後は新規作成の意味が薄いため非表示にする
  function syncGrowLinks() {
    var phase = (window.KTN && KTN.exh && KTN.exh.phase) || 'during';
    var locked = phase === 'after';
    var note = document.getElementById('p214GrowNote');
    var cta = document.getElementById('p214GrowCta');
    if (note) note.hidden = locked;
    if (cta) cta.hidden = locked;
  }
  syncGrowLinks();

  /* 公開日：会期開始2日後（序盤の閲覧数が伸び悩む理由の裏付けとして表示。デモ固定値） */
  var P214_PUBLISH_DATE = '2026-02-20';
  function syncPublishNote() {
    var el = document.getElementById('p214PublishNote');
    if (!el) return;
    var arrived = !!(window.KTN && KTN.exh && KTN.exh.publishArrived);
    el.textContent = arrived
      ? '公開日：' + P214_PUBLISH_DATE + '（公開済み）'
      : '公開日：' + P214_PUBLISH_DATE + '（未到達・現在は非公開）';
  }
  syncPublishNote();

  var _prevRenderP214 = window.ktnRender;
  window.ktnRender = function () { if (typeof _prevRenderP214 === 'function') _prevRenderP214(); syncFunnel(); syncArticleResponse(); syncPublishNote(); syncGrowLinks(); };

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
    { id:'g-t7', title:'佐藤みなと 新作について', type:'c',
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
      '<div class="p319-item__dates">'
        + '<span class="p319-item__dates-text">登録 ' + a.reg + '<span class="p319-item__dates-sep">·</span>更新 ' + a.upd + '</span>'
      + '</div>' +
      '<div class="p319-item__actions">' +
        '<button type="button" class="ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline p319-item__del">' + (draft ? '下書きを破棄' : '削除') + '</button>' +
        (draft
          ? '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集を再開 →</a>'
          : '<a class="ktn-action-btn" href="' + p711Link('edit', a.id) + '">編集 →</a>') +
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
};

/* ════════════════════════════════════════════════════
   年間の記録（Annual Records）— 共有データ＋行ビルダー

   P10-4 は「最新年のダイジェスト（上位3件）」、P10-4-2 は「年ごとの独立ページ」として
   同じ材料を使うが、両者は pageId が違って別モジュールで走るためトップレベルに置く。

   年鑑はサイトで唯一「タイトルに年を入れてよい」ページ。追174-46④で title/h1 に日付・時制語を
   禁じたのは「タイトルが鮮度を主張しているのに中身が入れ替わる」状態を避けるためで、
   年鑑はその年が過ぎれば内容が凍結する＝年は鮮度の主張ではなく識別子になる。
   判定は「その年が過ぎたあと内容が変わるか」（追174-48）。
════════════════════════════════════════════════════ */
KTN.arc = (function () {
  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

  /* デモ基準日は P10 モジュールの TODAY と同じ 2026-07-08。本番（React CSR）は new Date() に差し替える */
  var TODAY = new Date(2026, 6, 8);
  var YEARS = [2026, 2025];
  /* 年初は当年の母数が小さく、数件の反応で順位が入れ替わってしまう。
     そのため4月までは前年を既定で開く（＝切替月）。URLは1月から存在する＝露出だけを遅らせる */
  var SWITCH_MONTH = 4;
  function defaultYear() {
    var y = TODAY.getFullYear();
    return (TODAY.getMonth() + 1) >= SWITCH_MONTH ? y : y - 1;
  }
  function isCurrent(y) { return y === TODAY.getFullYear(); }
  /* 当年を開いているときは「まだ集計中」であることを明示する（12月まで順位が動くため） */
  function note(y) {
    if (!isCurrent(y)) return '';
    return y + '年は集計中です（1月〜' + (TODAY.getMonth() + 1) + '月に会期を終えた展覧会が対象）。';
  }

  /* その年に会期を終えた展覧会。累計（int/ci の実数）で並べる＝P10側の日割り（いまの勢い）と役割を分ける。
     通年でなく年単位に切るのは、累計だと初期の1件が居座り続けて新しい作り手が上がれなくなること、
     年鑑という読み物の文脈が作れること、会期中のチェックイン獲得が出品側の運用動機になることによる。
     本番は Drupal 側で「会期終了日の年」で集計するのでこの配列は消える。 */
  var ROWS = [
    { y: 2026, t: '余白の重力 — 田中透 個展',      v: '白日ギャラリー',       s: '01.14', e: '02.01', int: 486, ci: 173, host: '田中 透',        role: 'creator', now: '開催中の展覧会', bg: 'linear-gradient(135deg,#5a6b80,#2e3a4a)' },
    { y: 2026, t: '刻の版 — 早瀬涼 銅版画展',      v: 'ギャラリー刻',         s: '02.06', e: '02.22', int: 352, ci: 214, host: '早瀬 涼',        role: 'creator', now: '',               bg: 'linear-gradient(135deg,#5a7a6a,#2e4638)' },
    { y: 2026, t: '墨と余韻 — 現代書道 選抜展',    v: '東京書芸館',           s: '03.03', e: '03.20', int: 401, ci: 96,  host: '東京書芸館',      role: 'gallery', now: '開催中の展覧会', bg: 'linear-gradient(135deg,#2e2a28,#5a5450)' },
    { y: 2026, t: '白い部屋の彫刻',                v: 'gallery TRACE',        s: '04.10', e: '04.26', int: 268, ci: 231, host: 'gallery TRACE',   role: 'gallery', now: '',               bg: 'linear-gradient(135deg,#a05a4a,#6a3428)' },
    { y: 2026, t: '海鳴りの写真 — 山根拓',         v: 'フォトスペース博多',   s: '05.08', e: '05.24', int: 315, ci: 88,  host: '山根 拓',        role: 'creator', now: '',               bg: 'linear-gradient(135deg,#3a5a7a,#1e3448)' },
    { y: 2026, t: '陶土のかたち — 春の器展',       v: '京都陶々庵',           s: '06.02', e: '06.21', int: 197, ci: 152, host: '京都陶々庵',      role: 'gallery', now: '',               bg: 'linear-gradient(135deg,#b0aca0,#6e6a5e)' },
    { y: 2026, t: '窓辺のスケッチ — 西尾栞 個展',  v: '鎌倉小町ギャラリー',   s: '01.28', e: '02.15', int: 224, ci: 118, host: '西尾 栞',        role: 'creator', now: '',               bg: 'linear-gradient(135deg,#d0c8a0,#8a8258)' },
    { y: 2026, t: '糸と時間 — テキスタイル3人展',  v: 'gallery TRACE',        s: '02.20', e: '03.08', int: 341, ci: 137, host: 'gallery TRACE',   role: 'gallery', now: '開催中の展覧会', bg: 'linear-gradient(135deg,#a05a4a,#6a3428)' },
    { y: 2026, t: '写真の記憶 — 山根拓×篠原恵',    v: 'ギャラリー日向',       s: '04.24', e: '05.17', int: 289, ci: 196, host: 'ギャラリー日向',  role: 'gallery', now: '',               bg: 'linear-gradient(135deg,#c0a880,#8a6e4a)' },
    { y: 2026, t: '青の遠近 — 早瀬涼 新作展',      v: '白日ギャラリー',       s: '06.10', e: '06.28', int: 178, ci: 205, host: '早瀬 涼',        role: 'creator', now: '開催中の展覧会', bg: 'linear-gradient(135deg,#3a5a7a,#1e3448)' },
    { y: 2025, t: '灰と光 — 篠原恵 写真展',        v: 'ギャラリー日向',       s: '03.12', e: '03.30', int: 512, ci: 205, host: '篠原 恵',        role: 'creator', now: '開催中の展覧会', bg: 'linear-gradient(135deg,#c0a880,#8a6e4a)' },
    { y: 2025, t: '木版の系譜 — 摺師100年',        v: '京都版画舎',           s: '05.20', e: '06.15', int: 448, ci: 301, host: '京都版画舎',      role: 'gallery', now: '開催中の展覧会', bg: 'linear-gradient(135deg,#7a6a8a,#4a3e5a)' },
    { y: 2025, t: '都市を歩く水彩 — 岡島みのり',   v: '横浜アートポート',     s: '07.02', e: '07.21', int: 289, ci: 134, host: '岡島 みのり',    role: 'creator', now: '',               bg: 'linear-gradient(135deg,#6a9ab0,#3a5e74)' },
    { y: 2025, t: '抽象の温度 2025',               v: 'アートスペース青',     s: '09.05', e: '09.28', int: 376, ci: 258, host: 'アートスペース青', role: 'gallery', now: '開催中の展覧会', bg: 'linear-gradient(135deg,#c07040,#7a3e18)' },
    { y: 2025, t: 'ガラスと庭 — 三好文乃',         v: '天神ガラス工房',       s: '10.14', e: '11.03', int: 233, ci: 91,  host: '三好 文乃',      role: 'creator', now: '',               bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)' },
    { y: 2025, t: 'えんぴつの余白 — 西尾栞',       v: '鎌倉小町ギャラリー',   s: '11.20', e: '12.07', int: 168, ci: 187, host: '西尾 栞',        role: 'creator', now: '',               bg: 'linear-gradient(135deg,#d0c8a0,#8a8258)' },
    { y: 2025, t: '土と炎の記録 — 冬の窯出し展',   v: '京都陶々庵',           s: '01.22', e: '02.09', int: 341, ci: 176, host: '京都陶々庵',      role: 'gallery', now: '',               bg: 'linear-gradient(135deg,#b0aca0,#6e6a5e)' },
    { y: 2025, t: '線の呼吸 — 田中透 素描展',      v: '白日ギャラリー',       s: '02.14', e: '03.02', int: 397, ci: 142, host: '田中 透',        role: 'creator', now: '開催中の展覧会', bg: 'linear-gradient(135deg,#5a6b80,#2e3a4a)' },
    { y: 2025, t: '書と余白 — 夏の選抜',           v: '東京書芸館',           s: '06.10', e: '06.29', int: 254, ci: 223, host: '東京書芸館',      role: 'gallery', now: '',               bg: 'linear-gradient(135deg,#2e2a28,#5a5450)' },
    { y: 2025, t: '海辺の工房から',                v: '天神ガラス工房',       s: '08.18', e: '09.01', int: 201, ci: 165, host: '三好 文乃',      role: 'creator', now: '',               bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)' },
  ];

  /* 既定の上限は10件（ランキングは10位まで）。11位以下は順位差が誤差の範囲に入って
     「番付」として読めなくなるうえ、行が長くなると各行の主眼＝作り手への出口が埋もれる。
     P10-4のダイジェストは limit=3 で明示的に上書きする。 */
  var LIMIT = 10;
  function rows(year, mode, limit) {
    var r = ROWS.filter(function (x) { return x.y === year; })
      .sort(function (a, b) { return mode === 'visited' ? b.ci - a.ci : b.int - a.int; });
    return r.slice(0, limit || LIMIT);
  }

  /* 会期が終わった展覧会そのものは訪問者にとって行き止まりなので、各行に必ず
     「作り手のいま」＝いまも活動しているクリエイター/ギャラリーへの出口を持たせる。
     作り手の役割表示は関係の表示なので人物バッジ（.cb-person）ではなく中立のマイクロラベルで示す。 */
  function build(x, i) {
    var hostHref = x.role === 'gallery' ? './kotennavi-p4.html' : './kotennavi-p3.html';
    return '<li class="p104-arc__row">'
      + '<span class="p104-arc__rank">' + (i + 1) + '</span>'
      + '<span class="p104-arc__thumb" style="background:' + x.bg + '"></span>'
      + '<div class="p104-arc__body">'
      + '<a class="p104-arc__title" href="./kotennavi-p2.html">' + esc(x.t) + '</a>'
      + '<div class="p104-arc__meta">' + esc(x.v) + '　' + esc(x.y + '.' + x.s) + '–' + esc(x.e) + '</div>'
      + '<div class="p104-arc__nums"><span>行きたい <strong>' + x.int + '</strong></span><span>行った <strong>' + x.ci + '</strong></span></div>'
      + '<div class="p104-arc__host">'
      + '<span class="p104-arc__host-label">' + (x.role === 'gallery' ? 'Gallery' : 'Artist') + '</span>'
      + '<a class="p104-arc__host-name" href="' + hostHref + '">' + esc(x.host) + '</a>'
      + (x.now ? '<a class="p104-arc__now" href="./kotennavi-p2.html">' + esc(x.now) + ' →</a>' : '')
      + '</div>'
      + '</div>'
      + '</li>';
  }

  return { TODAY: TODAY, YEARS: YEARS, SWITCH_MONTH: SWITCH_MONTH, LIMIT: LIMIT, defaultYear: defaultYear, isCurrent: isCurrent, note: note, ROWS: ROWS, rows: rows, build: build };
}());

/* ════════════════════════════════════════════════════
   KTN.axis  軸ページ共通データ（都道府県タクソノミ・掲載件数・注目枠の選定）

   軸ページ（P10-4-1）は 47都道府県 × ジャンル で自動生成されるので、
   「どの軸が存在するか」「その軸にいま何件あるか」「どの軸を入口として露出するか」は
   ページ側でなくここに1本で持つ。P10-4（軸インデックス）・P10（検索ハブ）・P1（トップ）は
   すべて同じ pick() を呼ぶ＝入口ごとに別々の選び方をしない。

   本番（Drupal）では COUNT は集計クエリに、pick() は同じ式をサーバ側で実行して
   初期HTMLにリンクを焼く。クライアントの Math.random() で描くと内部リンクとして
   クローラに拾われず、軸ページへ評価を流すという目的そのものが消える。
════════════════════════════════════════════════════ */
KTN.axis = (function () {
  /* 都道府県マスタは common.js を借りる（47件をここで再定義しない） */
  var GROUPS = (window.KTN && KTN.P10_PREF_GROUPS) || [];
  var SLUGS  = (window.KTN && KTN.P10_PREF_SLUGS)  || {};
  var SLUG2PREF = {}, PREF2BLOCK = {}, PREFS = [];
  GROUPS.forEach(function (g) {
    g[1].forEach(function (pr) { SLUG2PREF[SLUGS[pr]] = pr; PREF2BLOCK[pr] = g[0]; PREFS.push(SLUGS[pr]); });
  });

  /* ── 東京のエリア区分（東京都心部・東京東部…）＝場所軸のもう一つの粒度（追174-67／追174-68）──
     場所軸のURLだけを無印（/exhibitions/tokyo）にしたのは短さのためではなく、都道府県とエリアを
     同じ名前空間に対等に置くため（追174-46②）。/exhibitions/tokyo-central であって
     /exhibitions/tokyo/central にしない＝場所は階層ではなくフラットな集合として扱う。
     この粒度を足す理由は、東京の128件が県の粒度では大きすぎて入口として機能しないから。
     当初は通称エリア（銀座・清澄白河…）で実装したが、現行データベースが場所として持っているのは
     47都道府県とこの6区分だけで、他の道府県の街エリアには対応できないため6区分へ戻した（追174-68）。
     通称エリアは会場（venue）が持つエリア属性を構造化したあとの将来案として残す＝仕組み（この配列に
     行を足せば軸ページ・索引・管理画面が追随する）はそのままなので、持てる日が来たら足すだけでよい。
     この6区分は P10 検索ドロワーの絞り込みチップ（common.js の P10_TOKYO_AREAS）と同じ区分・同じ表示名。
     チップで絞れるものが軸ページとしても存在する形になり、絞り込みの結果に恒久URLが付く。
     name は P10_TOKYO_AREAS の値と一字一句そろえる（本番は同じマスタから引くので、片方だけ直さない）。
     alias＝通称（銀座・丸の内…）。方角名だけでは土地勘のない人に場所が伝わらないための手がかりで、
     6件すべてが持つ（2026-09-08）。**主表示は name のまま・alias は添えるだけ**＝6区分は東京都を
     余さず分割するが通称は区の一部しか指さないので、通称を主にすると分割の網羅性が読めなくなる。
     添える場所は幅に余裕のあるところに限る（軸カード・索引チップ・レール）＝47県グリッドの中の
     エリアチップのように密な並びには出さない。括弧は表示側で付ける。
     slug は方角＝概念語なので英語（追174-46②）。tokyo- を冠して県と同じ平場でも一意にする。
     pref＝親の都道府県スラッグ。パンくず・補完・索引のグルーピングにだけ使い、URLには出さない。
     n＝掲載件数（デモ用の固定値）。6区分は東京都を余さず分割するので、合計を親県 COUNT（128）に
     ちょうど合わせる＝通称エリア（街を一部だけ拾う）とはここが違い、合計未満だと辻褄が合わない。
     東京23区以外＝4件は MIN 未満のパターン確認用（注目枠のローテーションから外れる）。
     0件のエリアはここには無いが、鳥取県＝0件が同じ状態を持つ（0件でもチップとリンクは残す・追174-47）。 */
  var AREAS = [
    { slug: 'tokyo-central', name: '東京都心部',   alias: '銀座・丸の内',       pref: 'tokyo', en: 'Central Tokyo', n: 44 },
    { slug: 'tokyo-east',    name: '東京東部',     alias: '上野・谷根千',       pref: 'tokyo', en: 'East Tokyo',    n: 26 },
    { slug: 'tokyo-west',    name: '東京西部',     alias: '新宿・渋谷',         pref: 'tokyo', en: 'West Tokyo',    n: 24 },
    { slug: 'tokyo-south',   name: '東京南部',     alias: '自由が丘・二子玉川', pref: 'tokyo', en: 'South Tokyo',   n: 18 },
    { slug: 'tokyo-north',   name: '東京北部',     alias: '池袋・巣鴨',         pref: 'tokyo', en: 'North Tokyo',   n: 12 },
    { slug: 'tokyo-outer',   name: '東京23区以外', alias: '立川・八王子',       pref: 'tokyo', en: 'Outer Tokyo',   n:  4 }
  ];
  var AREA_BY_SLUG = {};
  AREAS.forEach(function (a) { AREA_BY_SLUG[a.slug] = a; });

  /* 場所軸の登録簿＝都道府県とエリアを1本に束ねたもの。注目枠の選定（pick）と管理画面（P90-17）は
     この配列しか見ないので、AREAS に1行足せばそのまま拾われる（追174-66）。索引「東京をエリアで探す」と
     軸ページのエリアチップは親県ごとに並べたいので AREAS を直接引くが、登録簿がここ1本である点は同じ。 */
  var ALL = PREFS.concat(AREAS.map(function (a) { return a.slug; }));

  function isArea(slug)   { return !!AREA_BY_SLUG[slug]; }
  function areaOf(slug)   { return AREA_BY_SLUG[slug] || null; }
  /* 通称。都道府県には無いので空文字が返る＝呼ぶ側は「あれば添える」だけでよく、場所の種類で分岐しない */
  function aliasOf(slug)  { var a = AREA_BY_SLUG[slug]; return (a && a.alias) || ''; }
  function areasOf(pref)  { return AREAS.filter(function (a) { return a.pref === pref; }); }
  function parentOf(slug) { var a = AREA_BY_SLUG[slug]; return a ? a.pref : ''; }
  /* 表示名に親県を括弧で添えるかどうか。「銀座」は名前だけでは場所が伝わらないので「銀座（東京都）」と
     補うが、「東京都心部」はすでに県名を含むので添えると重複する。エリアの種類で分岐させず、名前が
     親県を含むかどうかで判定する＝将来また街の名前を持ったときにこの関数のまま両方に効く（追174-68）。 */
  function prefNote(slug) {
    var p = parentOf(slug); if (!p) return '';
    var full = fullName(SLUG2PREF[p]);
    return fullOf(slug).indexOf(full.replace(/[都道府県]$/, '')) >= 0 ? '' : '（' + full + '）';
  }
  function has(slug)      { return !!SLUG2PREF[slug] || isArea(slug); }
  /* 地方ブロック（関東・近畿…）。エリアは親県のブロックを継承する＝補完で使う母数を県と揃える */
  function blockOf(slug)  { var p = isArea(slug) ? parentOf(slug) : slug; return PREF2BLOCK[SLUG2PREF[p]] || ''; }

  /* 表示名は都道府県サフィックス付き（URLスラッグには付けない＝追174-46②）。
     エリアは行政区分ではないのでサフィックスを付けない（「東京都心部」のまま）。 */
  function fullName(pr) {
    if (pr === '北海道') return pr;
    if (pr === '東京') return '東京都';
    if (pr === '京都' || pr === '大阪') return pr + '府';
    return pr + '県';
  }
  function fullOf(slug) {
    var a = AREA_BY_SLUG[slug];
    if (a) return a.name;
    return SLUG2PREF[slug] ? fullName(SLUG2PREF[slug]) : '';
  }
  /* 英名。エリアは機械変換で綴りを出せない（Central Tokyo）のでマスタが持つ */
  function enName(s) {
    var a = AREA_BY_SLUG[s];
    if (a) return a.en;
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  }
  function href(slug) { return './kotennavi-p10-4-1.html?ax=' + slug; }

  /* ── ジャンル軸（/exhibitions/genre/{slug}＝P10-4-4）の語彙 ──
     **サイトの正式ジャンルは6区分だけ**（2026-07-20 確定）。展覧会・作品・クリエイターの
     登録フォーム（p2-11 / p6-11 / p3-11）が持つ必須の選択肢と同じものを使う。軸ページは
     登録データの集計で建てるので、語彙が登録側と違うと母集団そのものを作れない。
     **絵画・現代美術・版画・書道・陶芸 等の技法名はジャンルではなくタグ（自由ワード）**で、
     `EX.tags` が持つ別軸。管理された語彙ではないので恒久URLには焼かない
     （旧実装はここへ技法名12件を「ジャンル」として置いていた＝誤り・追174-76）。
     スラッグは概念語なので英語にする（固有名詞＝ローマ字との使い分け＝追174-46②）。
     ローマ字にすると「クラフト」が kurafuto、「ファッション」が fasshon になり破綻する。
     `axis:0` の「その他」だけは軸ページを建てない＝分類の受け皿で中身が雑多なため、
     「その他の展覧会」という一覧に共通の主題がなく、恒久URLの意味を持てない。
     n＝掲載件数（デモ用の固定値）。場所軸の COUNT と同じ母集団を別の軸で数えたものなので
     合計は一致させてある（448件）。ファッションを0にしてあるのは P10-4-4 の0件パターン用。 */
  var GENRES = [
    { name: 'アート',       slug: 'art',     en: 'Art',          n: 289 },
    { name: '写真',         slug: 'photo',   en: 'Photography',  n: 74 },
    { name: 'クラフト',     slug: 'craft',   en: 'Craft',        n: 54 },
    { name: '建築',         slug: 'arch',    en: 'Architecture', n: 18 },
    { name: 'ファッション', slug: 'fashion', en: 'Fashion',      n: 0 },
    { name: 'その他',       slug: 'other',   en: 'Other',        n: 13, axis: 0 }
  ];
  /* 軸ページを建てるジャンル（＝その他を除く5件）。ナビ・チップ・日替わりピックはこちらを使い、
     GENRES 自体は「登録データの分類」としてその他を含んだまま残す（集計・絞り込み用）。 */
  var AXIS_GENRES = GENRES.filter(function (g) { return g.axis !== 0; });
  var GENRE_BY_SLUG = {}, GENRE_BY_NAME = {};
  GENRES.forEach(function (g) { GENRE_BY_SLUG[g.slug] = g; GENRE_BY_NAME[g.name] = g; });
  function genre(key) { return GENRE_BY_SLUG[key] || GENRE_BY_NAME[key] || null; }
  function genreHref(slug) { return './kotennavi-p10-4-4.html?gn=' + slug; }
  function genreTotal() { return GENRES.reduce(function (a, g) { return a + g.n; }, 0); }
  /* 場所×アーカイブ（/exhibitions/{slug}/archive＝P10-4-3）。
     アーカイブは親へ寄せず自己参照 canonical を持つ独立URL（追174-46②）。 */
  function archiveHref(slug) { return './kotennavi-p10-4-3.html?ax=' + slug; }

  /* ── アクセシビリティ軸（/exhibitions/access/{slug}＝P10-4-5）の語彙 ──
     場所・ジャンルが「何を見るか」の軸なのに対し、これは「行けるかどうか」を決める条件。
     ジャンルにたどり着く前にここで足切りされる人がいるので、単独軸として無条件発行する（追174-46②）。
     ttl＝見出しに出す完成形の句（「お子さまと行ける展覧会」）。名詞に 'の展覧会' を足して組み立てる
     ジャンル軸と違い、こちらは連体修飾なので句のまま持つ。
     chip＝検索チップと同じ短縮ラベル（P10 の data-f と表記を揃える）。
     field＝展覧会エンティティ側のフラグ名。本番は Drupal のフィールドをそのまま見る。
     許可語（可／不可）を来場者に向けず可能性の形で書く。「子連れ」は入力用の短語なので公開ラベルには使わない（追174-52／追174-55）。 */
  var ACCESS = [
    { slug: 'with-children',  ttl: 'お子さまと行ける展覧会',       chip: 'お子さまと行ける', en: 'Family Friendly', field: 'kids',   n: 142 },
    { slug: 'artist-present', ttl: 'クリエイターが在廊する展覧会', chip: '在廊あり',         en: 'Artist Present',  field: 'attend', n: 216 }
  ];
  var ACCESS_BY_SLUG = {};
  ACCESS.forEach(function (a) { ACCESS_BY_SLUG[a.slug] = a; });
  function access(slug) { return ACCESS_BY_SLUG[slug] || null; }
  function accessHref(slug) { return './kotennavi-p10-4-5.html?ac=' + slug; }

  /* 掲載件数（開催中・開催予定）。デモ用の固定値で、本番は Drupal の集計に置き換わる。
     0件・少件数の県も表から落とさない＝軸ページはURLが恒久で、件数が少なくても存在し続ける（追174-47）。
     鳥取を0にしてあるのは P10-4-1 の0件パターンと突き合わせるため。 */
  var COUNT = {
    hokkaido: 12, aomori: 2, iwate: 2, miyagi: 8, akita: 1, yamagata: 2, fukushima: 2,
    ibaraki: 3, tochigi: 3, gunma: 5, saitama: 10, chiba: 11, tokyo: 128, kanagawa: 27,
    niigata: 6, toyama: 3, ishikawa: 7, fukui: 2, yamanashi: 3, nagano: 7, gifu: 4, shizuoka: 8, aichi: 19,
    mie: 3, shiga: 4, kyoto: 41, osaka: 38, hyogo: 14, nara: 5, wakayama: 2,
    tottori: 0, shimane: 2, okayama: 6, hiroshima: 9, yamaguchi: 2, tokushima: 1, kagawa: 4, ehime: 4, kochi: 1,
    fukuoka: 17, saga: 1, nagasaki: 3, kumamoto: 5, oita: 4, miyazaki: 2, kagoshima: 2, okinawa: 3
  };
  /* エリアの件数はマスタ（AREAS.n）が持つ。ここへ畳んでおくと count() は都道府県かエリアかを
     知らずに済む＝呼び出し側に種別の分岐が漏れない。 */
  AREAS.forEach(function (a) { COUNT[a.slug] = a.n; });
  function count(slug) { return COUNT[slug] || 0; }
  /* 全国の総数は都道府県だけで数える。エリアは親県の内訳なので、足すと同じ展覧会を二重に数える */
  function total() { return PREFS.reduce(function (a, s) { return a + count(s); }, 0); }

  /* ── デモ用の展覧会データセット ──
     場所軸（P10-4-1）・場所×アーカイブ（P10-4-3）・ジャンル軸（P10-4-4）が同じ母集団を見る。
     ページごとに配列を持つと、同じ展覧会が軸ごとに違う姿で出て突き合わせができなくなる。
     書式は P10 の EX と同じ（buildGridEcCard 準拠）。pref＝場所スラッグ／genre＝ジャンル名／
     rd＝会期終了までの残り日数（soon は 97〜99 の仮値・ended は負値）／nd＝掲載からの経過日数。
     東京8件（潤沢）／京都2件（少件数）／鳥取0件 になるよう配分し、京都の隣接ブロック（近畿）と
     鳥取の隣接ブロック（中国・四国）に補完用を置いてある。
     本番は Drupal 側の展覧会エンティティを軸で絞るだけなのでこの配列は消える。 */
  var EX = [
    /* ── 東京都（8件・潤沢） ── */
    { pref: 'tokyo', title: '静寂のかたち — 田中透 油彩展', venue: '白日ギャラリー', area: '東京都心部', varea: 'tokyo-central', attend: 1, s: '06.28', e: '07.13', hours: '11:00–19:00', status: 'live',   remain: '残り5日',  rd: 5,  nd: 24, pop: 88, int: 214, ci: 56, genre: 'アート', tags: ['絵画'], liaison: 'li',      imgH: 200, bg: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', thumbs: ['linear-gradient(135deg,#7a8ba0,#4e5a6a)', 'linear-gradient(135deg,#8a7a60,#5e4a3a)', 'linear-gradient(135deg,#6a8a7a,#3e5a4a)'] },
    { pref: 'tokyo', title: '墨聲 — 現代書道の地平', venue: '東京書芸館', area: '東京北部', varea: 'tokyo-north', s: '06.20', e: '07.10', hours: '10:00–18:00', status: 'ending', remain: '残り2日',  rd: 2,  nd: 32, pop: 92, int: 342, ci: 128, genre: 'アート', tags: ['書道'], liaison: 'li-plus', imgH: 165, bg: 'linear-gradient(135deg,#2e2a28,#5a5450)', thumbs: ['linear-gradient(135deg,#4a4440,#2a2624)', 'linear-gradient(135deg,#6a6058,#3a342e)', 'linear-gradient(135deg,#8a8078,#5a544e)'] },
    { pref: 'tokyo', title: '光を編む — 篠原恵 写真展', venue: 'ギャラリー日向', area: '東京西部', varea: 'tokyo-west', kids: 1, s: '07.01', e: '07.17', hours: '12:00–19:00', status: 'live',   remain: '残り9日',  rd: 9,  nd: 9,  pop: 65, int: 98,  ci: 24, genre: '写真', tags: ['写真'], liaison: '',        imgH: 250, bg: 'linear-gradient(135deg,#c0a880,#8a6e4a)' },
    { pref: 'tokyo', title: 'マチエールの実験', venue: 'gallery TRACE', area: '東京西部', varea: 'tokyo-west', s: '06.30', e: '07.16', hours: '11:00–20:00', status: 'live',   remain: '残り8日',  rd: 8,  nd: 21, pop: 81, int: 188, ci: 61, genre: 'アート', tags: ['現代美術'], liaison: 'li',      imgH: 215, bg: 'linear-gradient(135deg,#a05a4a,#6a3428)', thumbs: ['linear-gradient(135deg,#b07a6a,#7a4838)', 'linear-gradient(135deg,#c09a8a,#8a5e4e)', 'linear-gradient(135deg,#906a5a,#5a3a2e)'] },
    { pref: 'tokyo', title: '銅版のミクロコスモス — 早瀬涼', venue: 'ギャラリー刻', area: '東京東部', varea: 'tokyo-east', kids: 1, attend: 1, s: '07.04', e: '07.18', hours: '12:00–19:00', status: 'live',   remain: '残り10日', rd: 10, nd: 6,  pop: 67, int: 112, ci: 27, genre: 'アート', tags: ['版画'], liaison: 'li',      imgH: 225, bg: 'linear-gradient(135deg,#5a7a6a,#2e4638)', thumbs: ['linear-gradient(135deg,#7a9a8a,#4a6a58)', 'linear-gradient(135deg,#6a8a7a,#3a5a48)', 'linear-gradient(135deg,#8aaa9a,#5a7a68)'] },
    { pref: 'tokyo', title: '路地と光 — 街歩き写真部', venue: 'コートギャラリー谷中', area: '東京東部', varea: 'tokyo-east', kids: 1, s: '07.03', e: '07.15', hours: '11:00–18:00', status: 'live',   remain: '残り7日',  rd: 7,  nd: 5,  pop: 71, int: 104, ci: 38, genre: '写真', tags: ['写真'], liaison: '',        imgH: 220, bg: 'linear-gradient(135deg,#8a8a70,#4e4e38)' },
    { pref: 'tokyo', title: '抽象の温度', venue: 'アートスペース青', area: '東京南部', varea: 'tokyo-south', s: '06.18', e: '07.10', hours: '11:00–19:00', status: 'ending', remain: '残り2日',  rd: 2,  nd: 38, pop: 90, int: 276, ci: 94, genre: 'アート', tags: ['現代美術'], liaison: '',        imgH: 240, bg: 'linear-gradient(135deg,#c07040,#7a3e18)' },
    { pref: 'tokyo', title: 'セルフポートレイトの練習', venue: 'studio hue', area: '東京23区以外', varea: 'tokyo-outer', attend: 1, s: '07.11', e: '07.26', hours: '13:00–20:00', status: 'soon',   remain: '3日後に開催', rd: 98, nd: 3, pop: 79, int: 143, ci: 0, genre: '写真', tags: ['写真'], liaison: 'li-plus', imgH: 170, bg: 'linear-gradient(135deg,#b08aa0,#7a4e68)', thumbs: ['linear-gradient(135deg,#c0a0b0,#8a5e78)', 'linear-gradient(135deg,#a07a90,#6a4258)', 'linear-gradient(135deg,#d0b0c0,#9a6e88)'] },
    /* ── 京都府（2件・少件数） ── */
    { pref: 'kyoto', title: '彫りと摺り — 木版画の現在', venue: '京都版画舎', area: '', kids: 1, s: '06.25', e: '07.20', hours: '10:00–17:00', status: 'live', remain: '残り12日', rd: 12, nd: 27, pop: 74, int: 156, ci: 42, genre: 'アート', tags: ['版画'], liaison: '', imgH: 190, bg: 'linear-gradient(135deg,#7a6a8a,#4a3e5a)' },
    { pref: 'kyoto', title: '白の器展', venue: '京都陶々庵', area: '', s: '07.08', e: '07.28', hours: '10:00–17:00', status: 'live', remain: '残り20日', rd: 20, nd: 20, pop: 47, int: 44, ci: 9, genre: 'クラフト', tags: ['陶芸', 'クラフト'], liaison: '', imgH: 185, light: 1, bg: 'linear-gradient(135deg,#b0aca0,#6e6a5e)' },
    /* ── 近畿（京都の隣接ブロック＝③の補完材料） ── */
    { pref: 'osaka', title: '筆の呼吸 — 二人の書', venue: '大阪墨美堂', area: '', s: '07.08', e: '07.14', hours: '10:00–18:00', status: 'live', remain: '残り6日',  rd: 6,  nd: 16, pop: 55, int: 62, ci: 18, genre: 'アート', tags: ['書道'], liaison: '', imgH: 180, bg: 'linear-gradient(135deg,#4a4a4a,#1e1e1e)' },
    { pref: 'hyogo', title: '手漉き紙とドローイング', venue: '神戸アトリエ長田', area: '', kids: 1, s: '07.05', e: '07.24', hours: '11:00–18:00', status: 'live', remain: '残り16日', rd: 16, nd: 10, pop: 52, int: 57, ci: 14, genre: 'アート', tags: ['絵画'], liaison: '', imgH: 195, bg: 'linear-gradient(135deg,#8a9ab0,#4e5e74)' },
    /* ── 中国・四国（鳥取の隣接ブロック＝③の補完材料） ── */
    { pref: 'okayama',   title: '砂丘のかたち — 現代陶芸三人展', venue: '岡山アートセンター', area: '', s: '07.02', e: '07.21', hours: '10:00–18:00', status: 'live', remain: '残り13日', rd: 13, nd: 12, pop: 59, int: 68, ci: 19, genre: 'クラフト', tags: ['陶芸', 'クラフト'], liaison: '', imgH: 200, bg: 'linear-gradient(135deg,#9a8a6a,#5e5238)' },
    { pref: 'hiroshima', title: '瀬戸内の光 — 風景画の現在', venue: '広島市民ギャラリー', area: '', kids: 1, s: '06.27', e: '07.19', hours: '10:00–17:00', status: 'live', remain: '残り11日', rd: 11, nd: 15, pop: 63, int: 82, ci: 26, genre: 'アート', tags: ['絵画'], liaison: 'li', imgH: 210, bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)', thumbs: ['linear-gradient(135deg,#9ac8c0,#5a8a82)', 'linear-gradient(135deg,#8ab8b0,#4a7a72)', 'linear-gradient(135deg,#aad8d0,#6a9a92)'] },
    /* ── 全国フォールバック（④の補完材料） ── */
    { pref: 'fukuoka', title: '海と孤影 — 山根拓 写真展', venue: 'フォトスペース博多', area: '', s: '07.10', e: '08.02', hours: '11:00–18:00', status: 'soon', remain: '2日後に開催', rd: 99, nd: 6, pop: 62, int: 74, ci: 0, genre: '写真', tags: ['写真'], liaison: '', imgH: 235, bg: 'linear-gradient(135deg,#3a5a7a,#1e3448)' },
    /* ── 終了済み（①アーカイブの補完材料）。棚と同じ .ec カードで status:'ended'＝「終了」バッジが付く ── */
    { pref: 'tokyo', title: '記憶の稜線 — 佐倉ゆき 絵画展', venue: 'アートスペース青', area: '東京南部', varea: 'tokyo-south', kids: 1, attend: 1, s: '2026.04.10', e: '2026.04.26', hours: '11:00–19:00', status: 'ended', rd: -73,  nd: 110, pop: 76, int: 168, ci: 52, genre: 'アート', tags: ['絵画'], liaison: 'li',      imgH: 205, bg: 'linear-gradient(135deg,#8a7a9a,#4e4260)', thumbs: ['linear-gradient(135deg,#a294b0,#6a5e78)', 'linear-gradient(135deg,#9284a0,#5a4e68)', 'linear-gradient(135deg,#b2a4c0,#7a6e88)'] },
    { pref: 'kyoto', title: '古紙と拓 — 拓本の技法展', venue: '京都版画舎', area: '', attend: 1, s: '2026.02.14', e: '2026.03.08', hours: '10:00–17:00', status: 'ended', rd: -122, nd: 150, pop: 61, int: 94,  ci: 33, genre: 'アート', tags: ['版画'], liaison: '',        imgH: 185, bg: 'linear-gradient(135deg,#9a8e7a,#5e5444)' },
    { pref: 'kyoto', title: '冬の白磁 — 三村奏 個展', venue: '京都陶々庵', area: '', kids: 1, s: '2025.12.05', e: '2025.12.21', hours: '10:00–17:00', status: 'ended', rd: -199, nd: 240, pop: 83, int: 205, ci: 71, genre: 'クラフト', tags: ['陶芸', 'クラフト'], liaison: 'li-plus', imgH: 215, light: 1, bg: 'linear-gradient(135deg,#cfd4d8,#8e969e)' },
  ];

  /* ── 場所軸の補完に出せるのはギャラリーだけ（追174-50）──
     ギャラリーは固定会場を持つので都道府県が確定する。いっぽうクリエイターは活動場所を持たず、
     作品も場所を特定できない（関連・回遊ゾーンで作品ページに距離を出さないのと同じ理由）。
     「そのエリアのクリエイター」はデータとして取れないので、場所軸から人の軸へは張らない。 */
  var GALLERY = {
    tokyo:   [{ type: 'gallery', name: 'YUGEN Gallery',       location: '東京都心部', varea: 'tokyo-central', hours: '11:00–19:00 / 月休',   ini: 'Y', avStyle: 'linear-gradient(135deg,#8b5e3c,#5a3a22)', href: './kotennavi-p4.html' }],
    kyoto:   [{ type: 'gallery', name: '京都陶々庵',           location: '京都府',     hours: '10:00–17:00 / 水休',   ini: '陶', iniStyle: '.85rem', avStyle: 'linear-gradient(135deg,#9a8e7a,#5e5444)', href: './kotennavi-p4.html' },
              { type: 'gallery', name: '京都版画舎',           location: '京都府',     hours: '10:00–17:00 / 月休',   ini: '版', iniStyle: '.85rem', avStyle: 'linear-gradient(135deg,#7a6a8a,#4a3e5a)', href: './kotennavi-p4.html' }],
    tottori: [{ type: 'gallery', name: 'ギャラリー砂丘の窓',   location: '鳥取県',     hours: '11:00–17:00 / 火水休', ini: '砂', iniStyle: '.85rem', avStyle: 'linear-gradient(135deg,#c8b48a,#8a7a52)', href: './kotennavi-p4.html' }]
  };
  /* エリアで引かれたら親県のリストをエリア属性で絞る。県のものへフォールバックはしない＝
     「このエリアに会場を持つギャラリー」という補完ブロックのラベルが嘘になるため（追174-67） */
  function galleryOf(slug) {
    if (isArea(slug)) return (GALLERY[parentOf(slug)] || []).filter(function (g) { return g.varea === slug; });
    return GALLERY[slug] || [];
  }

  /* 母集団の切り出し。arc=true で会期を終えたもの（アーカイブ側の母数）。
     エリアは会場が持つエリア属性（デモでは varea）で絞る＝呼び出し側は県と同じ関数で扱える。 */
  function byPref(slug, arc)  {
    var isA = isArea(slug);
    return EX.filter(function (x) {
      return (isA ? x.varea === slug : x.pref === slug) && (arc ? x.status === 'ended' : x.status !== 'ended');
    });
  }
  function byGenre(name, arc) { return EX.filter(function (x) { return x.genre === name && (arc ? x.status === 'ended' : x.status !== 'ended'); }); }
  /* ── タグ軸（技法・素材・主題の自由ワード。絵画／書道／版画 等）──
     ジャンル（6区分の必須タクソノミ）と違い**管理された語彙ではない**ので恒久URLは持たせず、
     候補も固定マスタではなく**実際に使われているタグ**から作る＝存在しない語を選べない。
     季節の言葉（KTN.season）の対象候補と、その件数表示がここを引く。 */
  function tagCounts(arc) {
    var m = {};
    EX.forEach(function (x) {
      if (arc ? x.status !== 'ended' : x.status === 'ended') return;
      (x.tags || []).forEach(function (t) { m[t] = (m[t] || 0) + 1; });
    });
    return m;
  }
  function tags(arc) {
    var m = tagCounts(arc);
    return Object.keys(m).sort(function (a, b) { return m[b] - m[a] || a.localeCompare(b, 'ja'); })
      .map(function (t) { return { name: t, n: m[t] }; });
  }
  function byTag(name, arc) {
    return EX.filter(function (x) {
      return (x.tags || []).indexOf(name) !== -1 && (arc ? x.status === 'ended' : x.status !== 'ended');
    });
  }
  function byAccess(slug, arc) {
    var a = access(slug); if (!a) return [];
    return EX.filter(function (x) { return !!x[a.field] && (arc ? x.status === 'ended' : x.status !== 'ended'); });
  }

  /* 並び順は軸ページ共通。軸が変わっても利用者の期待は変わらないので選択肢を分岐させない */
  var SORTS = {
    rec:  function (a, b) { return b.pop - a.pop; },
    end:  function (a, b) { return a.rd - b.rd; },
    pop:  function (a, b) { return b.int - a.int; },
    new:  function (a, b) { return a.nd - b.nd; },
    last: function (a, b) { return b.rd - a.rd; }
  };

  /* 補完ブロックの器。「順序」と「なぜ出しているか」のラベルは追174-46⑤の規約なので、
     器を共通化して各ページは blocks 配列の中身だけを決める。 */
  function fillHtml(blocks) {
    return blocks.map(function (b) {
      return '<div class="ktn-axis-fill-block">'
        + '<div class="ktn-axis-fill-block__head">'
        + '<span class="ktn-axis-fill-block__ttl">' + b.ttl + '</span>'
        + '<span class="ktn-axis-fill-block__why">' + b.why + '</span>'
        + '</div><div class="ktn-axis-fill-block__body">' + b.body + '</div></div>';
    }).join('');
  }
  function grid(list) { return '<div class="p10-shelf-grid">' + list.map(buildGridEcCard).join('') + '</div>'; }

  /* ── 注目枠の選定＝固定枠＋ローテーション枠 ──
     完全ランダムにしない理由は2つ。①掲載が集中する主要エリアには常に入口を置きたい
     （毎回消えると主要導線が不安定になる）②残りは日付シードの決定的な並べ替えで回すので、
     しきい値を超える軸には必ず順番が回る＝低露出の軸が永久に日の目を見ない状態を作らない。
     しきい値（MIN）を置くのは、トップや検索ハブから跳んだ先がいきなり0件だと入口自体の信頼が落ちるため。
     0件の軸ページも索引（エリアから探す）からは必ずたどれるので、リンクを消したわけではない。 */
  var FIXED = ['tokyo', 'kyoto', 'osaka'];
  var MIN = 5;
  var dayShift = 0;
  /* 「今日」の単一ソース。日替わりで動くものは全部ここを見る＝デモバーの日送り（setDayShift）が
     日付そのものを動かすので、月替わりで替わるもの（P10 Picks の枠③）も同じ操作で確認できる。 */
  function today() {
    var t = (KTN.arc && KTN.arc.TODAY) || new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate() + dayShift);
  }
  function dayNo() {
    var t = today();
    return Math.floor(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 86400000);
  }
  function hash(s, seed) {
    var h = (seed % 9973) + 7;
    for (var i = 0; i < s.length; i++) { h = (h * 33 + s.charCodeAt(i)) % 99991; }
    return h;
  }
  function rotatable() {
    return ALL.filter(function (s) { return FIXED.indexOf(s) < 0 && count(s) >= MIN; });
  }
  function pick(n) {
    var d = dayNo();
    var rest = rotatable().sort(function (a, b) { return hash(a, d) - hash(b, d); });
    return FIXED.concat(rest).slice(0, n || 6);
  }
  /* ── 単一枠のローテーション（P10 の Picks レール＝追174-73）──
     pick() が「固定枠＋ローテ枠」の一覧を返すのに対し、こちらは固定枠を含めず回転列だけを返す。
     レールは1枠しか持たないので、固定枠（東京・京都・大阪）を混ぜると事実上そこで止まってしまい、
     同じページ下部の「エリアから探す」カードとも重複する。skip は読み飛ばす件数＝カード側が
     使っている回転列の先頭とレールが同じ軸を指さないようにするための送り。 */
  function rotate(list, n, skip) {
    if (!list.length) return [];
    var d = dayNo();
    var s = list.slice().sort(function (a, b) { return hash(a, d) - hash(b, d); });
    var out = [], i = (skip || 0) % s.length;
    for (var k = 0; k < (n || 1); k++) out.push(s[(i + k) % s.length]);
    return out;
  }
  function pickArea(n, skip) { return rotate(rotatable(), n, skip); }
  /* ジャンル軸のローテーション。件数のしきい値（MIN）は場所軸と共有＝跳んだ先が薄いという
     体験は軸の種類によらないため。クラフト（0件）はここで自動的に外れる。 */
  function pickGenre(n, skip) {
    return rotate(AXIS_GENRES.filter(function (g) { return g.n >= MIN; }).map(function (g) { return g.slug; }), n, skip);
  }
  function setDayShift(v) { dayShift = v || 0; }

  /* ── 軸ページの導入文（運営の書き下ろし） ──
     自動生成のページが「並べただけ」に見えることへの最大の対策で、admin が編集する唯一の主機能
     （公開/非公開の切替は置かない＝追174-46③）。件数・日付・「最新」等の時制語は書かない
     ＝URLは恒久なので文だけが先に古びる（追174-46④）。
     5軸ぶんをここへ集約してあるのは、各軸ページ（P10-4-1〜5）と管理画面（P90-17）が同じ本文を
     見るため。ページ側の closure に置いたままだと、管理画面の「記入済み／自動生成のまま」が
     実ページの表示と食い違う。本番は Drupal のフィールドから引くのでこの辞書は消える。 */
  var LEADS = {
    area: {
      /* ── 北海道・東北 ── */
      hokkaido: '<p>北海道は、札幌芸術の森や道立近代美術館のような大きな会場と、小樽のガラス工房やアイヌの造形の系譜が、同じ土地のなかで別の流れとして続いているエリアです。会場どうしの距離があるぶん、ひとつの展覧会を目当てに出かける計画が立てやすい土地でもあります。</p>',
      aomori: '<p>青森県は、棟方志功を生んだ土地であり、青森県立美術館や十和田市現代美術館のように建物そのものが語られる会場を持つエリアです。津軽塗やこぎん刺しといった手仕事も暮らしの側から続いていて、現代美術と工芸のどちらの展覧会も開かれます。</p>',
      iwate: '<p>岩手県は、南部鉄器の工房と、宮沢賢治や萬鉄五郎をめぐる文化の層が重なるエリアです。盛岡の街なかには喫茶店と一体になった小さな会場もあり、展示を見た流れでそのままクリエイターと話せる距離感があります。</p>',
      miyagi: '<p>宮城県は、仙台を中心に画廊とギャラリーが集まり、鳴子のこけしをはじめとする木地の仕事が県内各地に残るエリアです。宮城県美術館のような公立の会場と路面の小さなギャラリーが一日で回れる距離にあり、街を歩きながら展覧会を続けて見られます。</p>',
      akita: '<p>秋田県は、藤田嗣治の大壁画を収める秋田県立美術館があり、角館の樺細工や川連漆器といった技が土地ごとに根づくエリアです。冬の長さがそのまま制作の時間になっているような、手の込んだ仕事の展覧会に出会えます。</p>',
      yamagata: '<p>山形県は、酒田の本間美術館や山形美術館のように蒐集の歴史を持つ会場と、天童の将棋駒・山形鋳物といった産地の技が並び立つエリアです。庄内と内陸で気候も文化も違うので、同じ県内でも会場によって開かれる展覧会の性格が変わります。</p>',
      fukushima: '<p>福島県は、会津漆器と会津本郷焼という長い系譜を持ち、福島県立美術館や裏磐梯の諸橋近代美術館のように性格の異なる会場が点在するエリアです。移動しながら見て回るぶん、ひとつの展覧会が旅の目的になります。</p>',
      /* ── 関東 ── */
      ibaraki: '<p>茨城県は、五浦で岡倉天心らが日本美術院を営んだ土地であり、水戸芸術館が現代美術の企画を続けてきたエリアです。笠間焼の窯元とギャラリーが同じ通りに並ぶ一帯もあり、うつわの展覧会を目当てに出かける習慣が根づいています。</p>',
      tochigi: '<p>栃木県は、益子の窯元とギャラリーが集まり、大谷石の蔵を改装した会場が街のなかに残るエリアです。宇都宮美術館のような公立の会場から、自分の工房の一角で開く小さな展示まで、規模の幅が大きいのが特徴です。</p>',
      gunma: '<p>群馬県は、群馬県立近代美術館や高崎の文化施設が建築としても知られ、桐生の織物という産地の技が続くエリアです。都心から日帰りできる距離にありながら会場どうしの間隔はあいているので、見たい展覧会を決めてから出かける形になります。</p>',
      saitama: '<p>埼玉県は、北浦和の県立近代美術館を軸に、川越の蔵造りの町並みや小川の和紙といった仕事の場所が県内に散らばるエリアです。都心の会場に比べて天井や床の余裕がある空間が多く、大きな作品を並べた展覧会に出会えます。</p>',
      chiba: '<p>千葉県は、浮世絵の蒐集で知られる千葉市美術館や、林のなかに建つDIC川村記念美術館のように、性格のはっきりした会場を持つエリアです。房総の側には古い建物を使ったギャラリーも点在し、その建物ごと味わうような展覧会が開かれます。</p>',
      tokyo: '<p>東京都は、ギャラリーの数も展覧会の数も国内でもっとも多いエリアです。大きな美術館の企画展だけでなく、駅から少し歩いた場所にある小さなギャラリーで、その会期にしか見られない展覧会がいくつも開かれています。</p><p>個展なびでは、会期・入場条件・オンライン展示の有無まで含めて、いま足を運べる展覧会をまとめています。</p>',
      kanagawa: '<p>神奈川県は、横浜の関内・馬車道あたりに画廊が集まり、鎌倉や箱根には彫刻を屋外で見せる会場があるエリアです。港町として海外の美術を早くから受け入れてきた土地で、いまも現代美術の展覧会が続けて開かれています。</p>',
      /* ── 中部 ── */
      niigata: '<p>新潟県は、越後妻有の里山を舞台にした芸術祭が重ねられ、燕三条の金属加工という産地の技を持つエリアです。地域に住みながら制作している人が多く、展覧会の会場と制作の場所がそのまま重なることもあります。</p>',
      toyama: '<p>富山県は、高岡の銅器と井波の木彫という鋳物・彫刻の産地を抱え、富山市ガラス美術館を中心にガラスの制作が集まるエリアです。素材から仕上げまで県内で完結する分野が多く、技法そのものを主題にした展覧会が開かれます。</p>',
      ishikawa: '<p>石川県は、金沢21世紀美術館と国立工芸館が同じ街にあり、九谷焼・輪島塗・加賀友禅の系譜が暮らしの側から続いているエリアです。現代美術と工芸が対立せずに並ぶ土地柄で、その両方をまたぐような展覧会にも出会えます。</p>',
      fukui: '<p>福井県は、越前和紙・越前漆器・越前焼という産地がひとつの県に重なるエリアです。紙も器も塗りも工房が近くにあるので、展覧会で見たものがどこでどう作られたのかまで辿れるのが強みになっています。</p>',
      yamanashi: '<p>山梨県は、ミレーの蒐集で知られる山梨県立美術館があり、甲州印伝という革と漆の技が続くエリアです。八ヶ岳や富士山麓には、移り住んだクリエイターが自分のアトリエを会場にして展覧会を開く場所も点在しています。</p>',
      nagano: '<p>長野県は、東山魁夷館や松本市美術館のように特定の作家と結びついた会場を持ち、安曇野から諏訪にかけて美術館が連なるエリアです。木曽の漆器をはじめ山の素材を使う仕事も残り、土地の環境そのものを主題にした展覧会に出会えます。</p>',
      gifu: '<p>岐阜県は、多治見を中心とする美濃焼と、本美濃紙に代表される美濃和紙という二つの産地を持つエリアです。飛騨の木工も含めて素材を扱う技が地域ごとに分かれているので、分野のはっきりした展覧会が開かれます。</p>',
      shizuoka: '<p>静岡県は、クレマチスの丘の彫刻庭園や静岡県立美術館のように、屋外と屋内を行き来しながら見る会場を持つエリアです。駿河竹千筋細工のような細かな仕事も残り、伊豆側では工房を兼ねた小さなギャラリーで展覧会が開かれます。</p>',
      aichi: '<p>愛知県は、名古屋の栄・伏見にギャラリーが集まり、瀬戸焼・常滑焼という古い窯の産地を県内に抱えるエリアです。国際芸術祭が重ねられてきた土地でもあり、現代美術の展覧会を見に来る人の層が厚いのが特徴です。</p>',
      /* ── 近畿 ── */
      mie: '<p>三重県は、伊賀焼と萬古焼という性格の違う焼き物の産地を持ち、伊勢へ向かう街道沿いに古い建物を使った会場が残るエリアです。三重県立美術館のような公立の会場と、窯元の一角で開く展示との距離が近いのも特徴です。</p>',
      shiga: '<p>滋賀県は、山のなかのMIHO MUSEUMや、琵琶湖を望む滋賀県立美術館のように、行くまでの道のりごと体験になる会場を持つエリアです。信楽の窯場には住み込みで制作する場所もあり、その成果を見せる展覧会が開かれます。</p>',
      kyoto: '<p>京都府の展覧会は、現代美術のギャラリーと、陶芸・版画・染織といった手仕事の系譜が近い距離で並んでいるのが特徴です。町家を改装した小さな会場も多く、展示そのものと同じくらい、その場所に足を運ぶ体験が記憶に残ります。</p>',
      osaka: '<p>大阪府は、中之島に美術館が集まる一方で、北浜や本町の古いビルの一室に小さなギャラリーが入っているエリアです。東洋陶磁の蒐集で知られる会場もあり、現代美術の展覧会とうつわの展覧会を同じ日に続けて見られます。</p>',
      hyogo: '<p>兵庫県は、神戸の海側に建つ兵庫県立美術館を軸に、旧居留地や元町の路面ギャラリーが続くエリアです。丹波の窯や播州の織物といった産地も県内にあり、都市のギャラリーと産地の展覧会を一日でつなげて回れます。</p>',
      nara: '<p>奈良県は、寺社の造形が日常の風景としてある土地で、赤膚焼や奈良墨といった仕事がいまも続いているエリアです。古い町家を改装した会場が奈良町に点在し、建物の記憶ごと味わうような展覧会が開かれます。</p>',
      wakayama: '<p>和歌山県は、黒江の紀州漆器という産地を持ち、和歌山県立近代美術館が近代以降の作品を見せてきたエリアです。熊野へ向かう道沿いには、移り住んだクリエイターが古い家を会場にして展覧会を開く例もあります。</p>',
      /* ── 中国・四国 ── */
      tottori: '<p>鳥取県は、吉田璋也が興した新作民藝の流れをくむ土地で、鳥取民藝美術館や牛ノ戸焼の仕事がその系譜を伝えているエリアです。因州和紙の産地も近く、紙や器といった手の仕事を軸にした展覧会が開かれます。</p>',
      shimane: '<p>島根県は、宍道湖に面した島根県立美術館や、庭園で知られる足立美術館のように、外の景色と一体で見せる会場を持つエリアです。石見焼の甕や石州和紙といった暮らしの道具の系譜も続き、その延長にある展覧会が開かれます。</p>',
      okayama: '<p>岡山県は、倉敷の大原美術館が早くから西洋美術を集めてきた土地であり、備前焼の窯がいまも焚かれているエリアです。瀬戸内の島にも会場があるので、街なかの展覧会と島の展示を組み合わせて見て回る計画が立てられます。</p>',
      hiroshima: '<p>広島県は、市内に美術館が集まり、熊野の筆や宮島の細工といった道具づくりの技が県内に残るエリアです。尾道や竹原のように古い建物を使った会場が点在する町もあり、街歩きの途中で展覧会に出会う形になります。</p>',
      yamaguchi: '<p>山口県は、メディアアートの制作と展示を続けてきた山口情報芸術センターがあり、萩焼という長い窯の歴史を持つエリアです。雪舟が晩年を過ごした土地でもあり、新しい表現と古い系譜のどちらの展覧会も開かれます。</p>',
      tokushima: '<p>徳島県は、阿波藍の染めと阿波和紙という素材の産地を持ち、陶板で名画を再現する大塚国際美術館があるエリアです。藍を使う人は県外からも訪れて制作するため、その成果を見せる展覧会が県内で開かれます。</p>',
      kagawa: '<p>香川県は、直島や豊島をはじめとする瀬戸内の島々が現代美術の舞台になり、高松にはイサム・ノグチの仕事場が残るエリアです。讃岐の漆芸という系譜も続いていて、島の展示と街なかの展覧会のどちらにも見に行く先があります。</p>',
      ehime: '<p>愛媛県は、砥部焼の窯場と今治のタオル産地を抱え、松山の街なかに公立の美術館があるエリアです。道後では温泉街全体を会場にした美術の催しも重ねられてきたので、宿泊と展示を組み合わせて出かけやすい土地です。</p>',
      kochi: '<p>高知県は、土佐和紙という紙の産地を持ち、絵金の芝居絵屏風のように土地に根づいた絵の系譜が残るエリアです。高知県立美術館のほか商店街のなかにも小さな会場があり、街の生活と展示の距離が近いのが特徴です。</p>',
      /* ── 九州・沖縄 ── */
      fukuoka: '<p>福岡県は、アジアの近現代美術を集めてきた会場が市内にあり、小石原焼や上野焼といった窯が県内各地に残るエリアです。博多人形や久留米絣の仕事も続いていて、九州各県から人が集まる展示の中心になっています。</p>',
      saga: '<p>佐賀県は、有田・伊万里・唐津という磁器と陶器の産地が同じ県内に並ぶエリアです。窯元がギャラリーを併設していることも多く、仕事場と展示の場所が地続きになった展覧会に出会えます。</p>',
      nagasaki: '<p>長崎県は、出島を通じて海外の造形が早くに入ってきた土地であり、波佐見焼という日常のうつわの産地を持つエリアです。坂の多い街には古い洋館や倉庫を使った会場もあり、建物の来歴ごと展示を見ることになります。</p>',
      kumamoto: '<p>熊本県は、街の中心に現代美術の会場があり、小代焼の窯や山鹿灯籠といった土と紙の仕事が県内に残るエリアです。阿蘇の側には移り住んだクリエイターのアトリエもあり、そこを会場にした展覧会が開かれます。</p>',
      oita: '<p>大分県は、別府の竹工芸という他にない産地を持ち、県立美術館が街なかで現代美術の企画を続けてきたエリアです。温泉地を舞台にした美術の催しも重ねられてきたので、滞在しながら展示を見る形が定着しています。</p>',
      miyazaki: '<p>宮崎県は、綾の工芸の里や都城の弓づくりのように、素材から一貫して作る技が地域ごとに残るエリアです。会場の数が多いエリアではないぶん、ひとつの展覧会に県内外から人が集まる形になります。</p>',
      kagoshima: '<p>鹿児島県は、薩摩焼と大島紬という長い系譜を持ち、霧島の森のなかに彫刻を置く会場があるエリアです。島嶼部を含めて広い県なので、展覧会のために船や飛行機で移動することもめずらしくありません。</p>',
      okinawa: '<p>沖縄県は、壺屋のやちむん、紅型の染め、琉球ガラスといった仕事がいまの暮らしのなかで続いているエリアです。読谷をはじめ工房の集まる地区があり、その仕事場のそばで展覧会が開かれることもあります。</p>',
      /* ── 東京のエリア区分 ── */
      'tokyo-central': '<p>東京都心部（千代田区・中央区・港区）は、老舗の画廊と現代美術のスペースが同じ通りに並んでいるエリアです。路面のギャラリーだけでなく、雑居ビルの上階にも会場が点在していて、歩いて回れる範囲でいくつもの展覧会を続けて見られます。</p><p>会期が1週間ほどで入れ替わる会場も多く、同じ場所でも訪れる週によって見られるものが変わります。</p>',
      'tokyo-east': '<p>東京東部（台東区・墨田区・江東区など）は、上野の美術館と、清澄白河に集まった現代美術のギャラリーが同じ側にあるエリアです。蔵前や向島には江戸から続く工房も残り、現代美術の展覧会と手仕事の展示が近い範囲で並びます。</p>',
      'tokyo-west': '<p>東京西部（新宿区・渋谷区・中野区・杉並区など）は、初台や渋谷の大きな会場と、中野・高円寺あたりの小さなスペースが混ざり合うエリアです。はじめての展覧会がこの一帯で開かれることも多く、会期は短めに設定される傾向があります。</p>',
      'tokyo-south': '<p>東京南部（品川区・目黒区・大田区・世田谷区など）は、庭園美術館や区立の美術館のように、建物と庭ごと見る会場が点在するエリアです。住宅街のなかに構えたギャラリーも多く、静かな環境でゆっくり見られる展覧会に出会えます。</p>',
      'tokyo-north': '<p>東京北部（文京区・豊島区・北区・板橋区など）は、区立美術館が独自の企画を続け、大学や出版に近い文化の層が重なるエリアです。池袋周辺には貸しギャラリーもまとまっていて、はじめての展覧会の会場に選ばれることがあります。</p>',
      'tokyo-outer': '<p>東京23区以外（多摩地域）は、府中や八王子の市立美術館と、美術大学のある環境が重なるエリアです。制作の場所を郊外に構えている人が多く、都心では置ききれない大きさの作品を見せる展覧会が開かれます。</p>'
    },
    /* ── アーカイブ軸の導入文（53件・エリア軸とは別主題で書く）──
       エリア軸（LEADS.area）の題材＝その土地の美術の系譜（美術館・窯場・産地）を
       ここへ流用しない。同じ本文を「開催中」と「記録」の2軸に置くと 53×2 のURLが
       ほぼ同じページになり、自サイト内で同じ検索意図を食い合う（追174-71 でアーカイブ軸を
       対象外にしたのはこの理由。ただし「別主題で短く書く」方針自体は保留していた宿題）。
       主題は〈会期が終わったあとに何が残るか〉＝会期の長さ・入れ替わり・会場の開きかた・
       行けなかった展示・出品者のいまへ辿れること。名所の再説明はしない。
       書式＝「◯◯でこれまでに会期を終えた展覧会の記録です。」＋固有の1〜2文（エリア軸より短い）。
       時制語・件数・日付は書かない（追174-46④）。総称に「個展」「作り手」を使わない。 */
    archive: {
      /* ── 北海道・東北 ── */
      hokkaido: '<p>北海道でこれまでに会期を終えた展覧会の記録です。会場が広い範囲に散らばっているぶん、見に行けなかった展示のほうが多くなりがちです。ここに残るのは、その土地でたしかに開かれていたという記録です。</p>',
      aomori: '<p>青森県でこれまでに会期を終えた展覧会の記録です。雪の季節をはさんで開催の間隔が変わる土地なので、いつどんな展示が開かれてきたかが、そのまま県内の一年の流れとして読めます。</p>',
      iwate: '<p>岩手県でこれまでに会期を終えた展覧会の記録です。小さな会場で短く開かれた展示ほど、終わってしまうと手がかりが残りません。会場ごと、クリエイターごとに辿れるようにしてあります。</p>',
      miyagi: '<p>宮城県でこれまでに会期を終えた展覧会の記録です。仙台の貸画廊は一週ごとに借り手が替わるので、同じ会場の記録を並べると、その場所を通っていった人たちの流れが見えてきます。</p>',
      akita: '<p>秋田県でこれまでに会期を終えた展覧会の記録です。手のかかる仕事ほど次の発表までに時間がかかるので、前にどんな展示をしていたかが、そのクリエイターを知る手がかりになります。</p>',
      yamagata: '<p>山形県でこれまでに会期を終えた展覧会の記録です。庄内と内陸では会場も見に来る人も違うため、県内の記録といっても二つの流れが並んで積まれていくことになります。</p>',
      fukushima: '<p>福島県でこれまでに会期を終えた展覧会の記録です。会場が県内に散らばっているので、記録をさかのぼると、どの町にどんな展示の場所があるのかが見えてきます。</p>',
      /* ── 関東 ── */
      ibaraki: '<p>茨城県でこれまでに会期を終えた展覧会の記録です。窯の集まる一帯では展示の時期が重なるので、そこで発表を続けてきた人の歩みを、会期をたどりながら追えます。</p>',
      tochigi: '<p>栃木県でこれまでに会期を終えた展覧会の記録です。工房の一角で開かれた小さな展示は案内の届く範囲も限られるため、終わったあとに残るこの記録が、その仕事を知る入口になります。</p>',
      gunma: '<p>群馬県でこれまでに会期を終えた展覧会の記録です。会場どうしの間隔があいているぶん、行きそびれた展示は次の機会を待つことになります。出品した人のページから、いまの活動へつながります。</p>',
      saitama: '<p>埼玉県でこれまでに会期を終えた展覧会の記録です。天井の高い会場に合わせて組まれた展示はその場所でしか成立しないものが多く、終われば同じ形では見られません。</p>',
      chiba: '<p>千葉県でこれまでに会期を終えた展覧会の記録です。古い建物を会場にした展示は、その建物が展示に使われていた期間そのものが記録になります。</p>',
      kanagawa: '<p>神奈川県でこれまでに会期を終えた展覧会の記録です。同じ画廊で発表を重ねる人が多い土地なので、会期をさかのぼると、ひとりの仕事がどう変わってきたかを追えます。</p>',
      /* ── 中部 ── */
      niigata: '<p>新潟県でこれまでに会期を終えた展覧会の記録です。里山の会場には会期のあいだだけ開かれるものも多く、閉じてしまえば場所ごと記録の側に移ります。</p>',
      toyama: '<p>富山県でこれまでに会期を終えた展覧会の記録です。素材や技法を主題にした展示は、同じクリエイターでも次は別の切り口になります。前の会期を知っていると、その違いが読めます。</p>',
      ishikawa: '<p>石川県でこれまでに会期を終えた展覧会の記録です。工芸の発表と現代美術の展示が同じ街で並行して開かれてきたので、記録を並べるとその両方がひとつの流れとして見えます。</p>',
      fukui: '<p>福井県でこれまでに会期を終えた展覧会の記録です。産地の仕事は展示のたびに少しずつ形を変えていくので、過去の会期は試みの積み重ねとして読めます。</p>',
      yamanashi: '<p>山梨県でこれまでに会期を終えた展覧会の記録です。アトリエを会場にした展示は会期のあいだだけ扉が開くので、終わったあとにその場所を知る手がかりはここに残ります。</p>',
      nagano: '<p>長野県でこれまでに会期を終えた展覧会の記録です。標高も気候も会場ごとに違い、展示の開かれる季節が偏ります。記録をたどると、県内のどこでいつ動きがあるのかが見えてきます。</p>',
      gifu: '<p>岐阜県でこれまでに会期を終えた展覧会の記録です。分野のはっきりした展示が地域ごとに開かれてきたので、記録はそのまま県内の仕事の地図のようになっています。</p>',
      shizuoka: '<p>静岡県でこれまでに会期を終えた展覧会の記録です。屋外を含む会場では、同じ作品でも見えかたが会期中の天候に左右されます。そこにあった状態は記録の側にしか残りません。</p>',
      aichi: '<p>愛知県でこれまでに会期を終えた展覧会の記録です。名古屋の画廊では発表の機会が続けて用意されるので、同じ人の会期をさかのぼると仕事の変化がはっきり見えます。</p>',
      /* ── 近畿 ── */
      mie: '<p>三重県でこれまでに会期を終えた展覧会の記録です。窯元の一角で開かれる展示は案内の範囲が限られるため、終わったあとに辿れる手がかりを残しておく意味があります。</p>',
      shiga: '<p>滋賀県でこれまでに会期を終えた展覧会の記録です。行くまでの道のりを含めて記憶に残る会場が多く、会期が終わってからその展示を知った人にとっては、次の機会を待つ場所になります。</p>',
      osaka: '<p>大阪府でこれまでに会期を終えた展覧会の記録です。古いビルの一室にある画廊は会期ごとに借り手が替わります。同じ住所の記録を並べると、その部屋を通っていった人たちが見えてきます。</p>',
      hyogo: '<p>兵庫県でこれまでに会期を終えた展覧会の記録です。神戸の路面ギャラリーと県内の産地では展示の間隔が違うので、記録の積まれかたにも差が出ます。</p>',
      nara: '<p>奈良県でこれまでに会期を終えた展覧会の記録です。町家を会場にした展示は建物の都合で会期が短くなることもあり、そこにあった時間は記録の側に残ります。</p>',
      wakayama: '<p>和歌山県でこれまでに会期を終えた展覧会の記録です。移り住んだ人が自分の家や仕事場を会場にすることもあり、そうした展示ほど終わったあとの手がかりが少なくなります。</p>',
      /* ── 中国・四国 ── */
      shimane: '<p>島根県でこれまでに会期を終えた展覧会の記録です。外の景色と合わせて見せる会場では、同じ展示でも季節によって印象が変わります。いつ開かれていたかも含めて記録になります。</p>',
      okayama: '<p>岡山県でこれまでに会期を終えた展覧会の記録です。島の会場は渡る手段が限られるぶん、行けなかった展示も多くなります。会期をさかのぼって、出品した人のいまの活動へつながります。</p>',
      hiroshima: '<p>広島県でこれまでに会期を終えた展覧会の記録です。古い建物を使った会場は街の側の事情で使われなくなることもあり、そこで開かれた展示の記録がその場所の記憶を兼ねます。</p>',
      yamaguchi: '<p>山口県でこれまでに会期を終えた展覧会の記録です。機材や環境に合わせて組まれた展示は再現がむずかしく、会期が終われば、どんなものだったかは記録から辿ることになります。</p>',
      tokushima: '<p>徳島県でこれまでに会期を終えた展覧会の記録です。県外から滞在して制作した成果を見せる展示もあり、その人が次にどこで発表するかは、出品者のページから辿れます。</p>',
      kagawa: '<p>香川県でこれまでに会期を終えた展覧会の記録です。島の会場は船の便に合わせて開く時間が決まるので、会期を逃すと次の機会まで間があきます。</p>',
      ehime: '<p>愛媛県でこれまでに会期を終えた展覧会の記録です。街全体を会場にした催しは会期のあいだだけ姿を見せるものが多く、終われば場所ごと記録の側に移ります。</p>',
      kochi: '<p>高知県でこれまでに会期を終えた展覧会の記録です。商店街のなかの小さな会場は通りがかりで出会う展示が多く、知らないうちに終わっていることもあります。</p>',
      /* ── 九州・沖縄 ── */
      fukuoka: '<p>福岡県でこれまでに会期を終えた展覧会の記録です。九州各県から人が集まって発表する土地なので、記録をさかのぼると、県外のクリエイターの歩みもここに重なっています。</p>',
      saga: '<p>佐賀県でこれまでに会期を終えた展覧会の記録です。窯の仕事は焼き上がりごとに違うため、同じ窯元でも会期が変われば並ぶものが変わります。</p>',
      nagasaki: '<p>長崎県でこれまでに会期を終えた展覧会の記録です。坂の上の建物を会場にした展示は案内の届く範囲も限られるので、終わったあとに辿れる場所を残しておく意味があります。</p>',
      kumamoto: '<p>熊本県でこれまでに会期を終えた展覧会の記録です。街なかの会場と阿蘇側のアトリエでは開かれかたが違い、記録を並べると県内の二つの流れが見えてきます。</p>',
      oita: '<p>大分県でこれまでに会期を終えた展覧会の記録です。滞在しながら見る形の展示は会期が長めに組まれることもあり、そのぶん記録には人の出入りの厚みが残ります。</p>',
      miyazaki: '<p>宮崎県でこれまでに会期を終えた展覧会の記録です。開かれる場所が限られるぶん、同じ会場に別々の分野の展示が続けて入るので、記録を並べると県内の動きがひと続きに見えます。</p>',
      kagoshima: '<p>鹿児島県でこれまでに会期を終えた展覧会の記録です。島を含めて県が広く、船や飛行機で移動する会場もあるため、行けなかった展示をあとから知ることが多くなります。</p>',
      okinawa: '<p>沖縄県でこれまでに会期を終えた展覧会の記録です。工房のそばで開かれる展示は暮らしの延長にあるぶん案内も控えめで、終わったあとに残るのはこうした記録になります。</p>',
      /* ── 東京のエリア区分 ── */
      'tokyo-central': '<p>東京都心部（千代田区・中央区・港区）でこれまでに会期を終えた展覧会の記録です。同じ日に近い範囲でいくつも開かれるため、見落としたまま終わっている展示が多くなります。</p>',
      'tokyo-east': '<p>東京東部（台東区・墨田区・江東区など）でこれまでに会期を終えた展覧会の記録です。長く続く企画と数日で閉じる小さな展示が同じエリアで並ぶので、記録の粒もそろいません。</p>',
      'tokyo-west': '<p>東京西部（新宿区・渋谷区・中野区・杉並区など）でこれまでに会期を終えた展覧会の記録です。はじめての発表がこの一帯で開かれることも多く、そのときの会期が、あとから活動の出発点として読まれます。</p>',
      'tokyo-south': '<p>東京南部（品川区・目黒区・大田区・世田谷区など）でこれまでに会期を終えた展覧会の記録です。住宅街のなかの会場は開いている時間も限られるため、行けないまま会期が過ぎることがあります。</p>',
      'tokyo-north': '<p>東京北部（文京区・豊島区・北区・板橋区など）でこれまでに会期を終えた展覧会の記録です。貸ギャラリーがまとまっている一帯では借り手が次々に替わるので、同じ会場の記録に別々の名前が並びます。</p>',
      'tokyo-outer': '<p>東京23区以外（多摩地域）でこれまでに会期を終えた展覧会の記録です。都心では置ききれない大きさの展示が組まれることもあり、その規模のまま再現されることはめったにありません。</p>',
      /* 既存3本（追174-71 以前に書いたもの）＝文体の見本。書き換えない。 */
      tokyo: '<p>東京都でこれまでに会期を終えた展覧会の記録です。会場の数が多いぶん入れ替わりも早く、ひとつの展覧会が開かれていた期間はたいてい2週間ほどしかありません。ここに残るのは、その短い期間にだけ会場にあった展示の記録です。</p>',
      kyoto: '<p>京都府でこれまでに会期を終えた展覧会の記録です。町家を改装した会場や、工房と一体になった小さなギャラリーでの展示も含まれます。</p>',
      tottori: '<p>鳥取県でこれまでに会期を終えた展覧会の記録です。開催の間隔があくエリアほど、ひとつひとつの会期がその土地の記録として意味を持ちます。</p>'
    },
    genre: {
      /* キーはサイト正式のジャンル6区分のスラッグ（登録フォームと同じ語彙・追174-76）。
         技法名（絵画・版画・陶芸…）はジャンルではなくタグなので、ここには来ない。
         建築・ファッションは未記入のまま＝自動文が出る状態を管理画面で見られるように残してある。 */
      art: '<p>アートの展覧会は、絵画・現代美術・書・版画といった表現がひとつの会場でとなり合うことがあります。同じ「見る」でも、画面の中の絵と、壁に掛かった実物では受ける印象が変わります。</p><p>個展なびでは、全国のギャラリー・美術館で開かれるアートの展覧会をまとめています。</p>',
      photo: '<p>写真の展覧会は、プリントの大きさや紙の選び方まで含めて作品になります。画面で見た同じ写真でも、会場でプリントとして向き合うと受ける印象が変わる——それが写真展に足を運ぶ理由です。</p><p>個展なびでは、全国のギャラリー・写真専門スペースで開かれる写真展をまとめています。</p>',
      craft: '<p>クラフトの展覧会は、陶・木工・金工・ガラス・革といった素材ごとの技法が主役になります。うつわとして手に取れるものから、立体作品として置かれるものまで幅があり、クリエイターが在廊していることも多いジャンルです。</p>'
    },
    access: {
      'with-children': '<p>ギャラリーは静かに見るところ、という印象があって、小さなお子さまがいると足が向きにくい。ここに集めたのは、お子さまとご一緒にご来場いただける展覧会です。</p><p>ベビーカーのまま入れるか、途中で休める場所があるかは会場ごとに違います。気になるときは、それぞれの展覧会ページの会場情報をご覧ください。</p>',
      'artist-present': '<p>つくった本人が会場にいる。これは会場に足を運んだからこそのことです。作品の前でひとこと聞けるだけで、同じ一枚の見え方が変わります。</p><p>在廊の日時は展覧会ごとに決まっています。会いに行きたい日があるときは、それぞれの展覧会ページの会期・スケジュールでご確認ください。</p>'
    },
    year: {}
  };
  /* 未記入のときに出る文。管理画面は「空にすると何が出るか」をプレビューに出すので、
     ここを別実装にすると管理画面の表示が嘘になる。 */
  function leadAuto(kind, key) {
    /* 名前だけでは場所が伝わらないエリアには、自動文にだけ親県を括弧で添える（判定は prefNote）。
       運営が書き下ろした導入文には手を入れない＝書き手が文脈を作れるため。 */
    if (kind === 'area')    return '<p>' + fullOf(key) + prefNote(key)
      + 'で開催中・開催予定の展覧会をまとめています。会期を終えた展覧会も、出品したクリエイターとギャラリーのページから辿ることができます。</p>';
    if (kind === 'archive') return '<p>' + fullOf(key) + prefNote(key)
      + 'でこれまでに会期を終えた展覧会の記録です。展示そのものは終わっていますが、出品したクリエイターとギャラリーのページから当時の内容を辿ることができます。</p>';
    if (kind === 'genre')   { var g = genre(key); return '<p>' + (g ? g.name : '') + 'の展覧会・個展を全国からまとめています。会場で実物と向き合ってはじめて分かることが多いジャンルなので、会期のあるうちに足を運べるものから並べています。</p>'; }
    if (kind === 'access')  { var a = access(key); return '<p>' + (a ? a.ttl : '') + 'を全国からまとめています。</p>'; }
    if (kind === 'year')    return '<p>' + key + '年に会期を終えた展覧会の記録です。会期中に集まった「行きたい」「行った」の反応をもとに、それぞれ上位' + ((KTN.arc && KTN.arc.LIMIT) || 10) + '件を掲載しています。</p>'
      + '<p>会期は終わっていますが、展示をつくったクリエイター・ギャラリーはいまも活動しています。各行から「いまの活動」へたどれるようにしてあります。</p>';
    return '';
  }
  function leadRaw(kind, key) { var d = LEADS[kind]; return (d && d[key]) || ''; }
  function leadOf(kind, key) { return leadRaw(kind, key) || leadAuto(kind, key); }
  function setLead(kind, key, html) {
    if (!LEADS[kind]) LEADS[kind] = {};
    if (html) LEADS[kind][key] = html; else delete LEADS[kind][key];
  }

  /* ── エリア軸 description の中間句 ──
     description の前後（「◯◯県で開催中・開催予定の展覧会・個展の一覧です。」「会期順・ジャンル別に
     探せます。」）は検索語と機能の説明なので53本共通。ここが同じままだと53本の description が
     県名違いの同一文になり、検索結果でどれを開いても同じに見える。そこで真ん中の一句だけを
     土地ごとに差し替える。素材は LEADS.area の導入文から取り、title・h1・本文と語彙を揃える。
     導入文（HTML・2文）をそのまま流用しないのは、description が1行のプレーンテキストで
     長さの上限（70〜120字）が違うため。時制語は書かない（追174-46④）。 */
  var DESCS = {
    /* ── 北海道・東北 ── */
    hokkaido: '札幌芸術の森や道立近代美術館から小樽のガラス工房まで、',
    aomori: '青森県立美術館・十和田市現代美術館から津軽塗・こぎん刺しまで、',
    iwate: '盛岡の街なかのギャラリーから南部鉄器の工房まで、',
    miyagi: '宮城県美術館から仙台の路面ギャラリー、鳴子のこけしまで、',
    akita: '秋田県立美術館から角館の樺細工・川連漆器まで、',
    yamagata: '本間美術館・山形美術館から天童の将棋駒・山形鋳物まで、',
    fukushima: '福島県立美術館・諸橋近代美術館から会津漆器・会津本郷焼まで、',
    /* ── 関東 ── */
    ibaraki: '水戸芸術館の現代美術から笠間焼の窯元とギャラリーまで、',
    tochigi: '宇都宮美術館から益子の窯元、大谷石の蔵を使った会場まで、',
    gunma: '群馬県立近代美術館・高崎の文化施設から桐生の織物まで、',
    saitama: '北浦和の県立近代美術館から川越の蔵造り、小川の和紙まで、',
    chiba: '千葉市美術館・DIC川村記念美術館から房総のギャラリーまで、',
    tokyo: '大きな美術館の企画展から駅から歩く小さなギャラリーまで、',
    kanagawa: '横浜・関内馬車道の画廊から鎌倉・箱根の彫刻の会場まで、',
    /* ── 中部 ── */
    niigata: '越後妻有の里山の芸術祭から燕三条の金属加工まで、',
    toyama: '富山市ガラス美術館から高岡の銅器・井波の木彫まで、',
    ishikawa: '金沢21世紀美術館・国立工芸館から九谷焼・輪島塗の工房まで、',
    fukui: '越前和紙・越前漆器・越前焼の工房から街なかの会場まで、',
    yamanashi: '山梨県立美術館から甲州印伝の技、八ヶ岳のアトリエまで、',
    nagano: '東山魁夷館・松本市美術館から木曽の漆器の工房まで、',
    gifu: '多治見の美濃焼から美濃和紙・飛騨の木工の産地まで、',
    shizuoka: '静岡県立美術館やクレマチスの丘から伊豆の工房ギャラリーまで、',
    aichi: '名古屋・栄伏見のギャラリーから瀬戸焼・常滑焼の窯まで、',
    /* ── 近畿 ── */
    mie: '三重県立美術館から伊賀焼・萬古焼の窯元まで、',
    shiga: 'MIHO MUSEUM・滋賀県立美術館から信楽の窯場まで、',
    kyoto: '現代美術のギャラリーから町家を改装した工芸の会場まで、',
    osaka: '中之島の美術館から北浜・本町のビルの一室のギャラリーまで、',
    hyogo: '兵庫県立美術館・元町の路面ギャラリーから丹波の窯まで、',
    nara: '奈良町の町家を使った会場から赤膚焼・奈良墨の仕事まで、',
    wakayama: '和歌山県立近代美術館から黒江の紀州漆器の産地まで、',
    /* ── 中国・四国 ── */
    tottori: '鳥取民藝美術館から牛ノ戸焼・因州和紙の産地まで、',
    shimane: '島根県立美術館・足立美術館から石見焼・石州和紙まで、',
    okayama: '倉敷の大原美術館から備前焼の窯、瀬戸内の島の会場まで、',
    hiroshima: '市内の美術館から尾道・竹原の古い建物を使った会場まで、',
    yamaguchi: '山口情報芸術センターのメディアアートから萩焼の窯まで、',
    tokushima: '大塚国際美術館から阿波藍の染めと阿波和紙の工房まで、',
    kagawa: '直島・豊島の島の会場から高松のイサム・ノグチ、讃岐漆芸まで、',
    ehime: '松山の公立美術館から砥部焼の窯場、道後の街なかまで、',
    kochi: '高知県立美術館から土佐和紙の産地、商店街の小さな会場まで、',
    /* ── 九州・沖縄 ── */
    fukuoka: 'アジアの近現代美術を集める会場から小石原焼・上野焼の窯まで、',
    saga: '有田・伊万里・唐津の産地から窯元が併設するギャラリーまで、',
    nagasaki: '洋館や倉庫を使った会場から波佐見焼の産地まで、',
    kumamoto: '街の中心の現代美術の会場から小代焼の窯・山鹿灯籠まで、',
    oita: '大分県立美術館から別府の竹工芸、温泉地の会場まで、',
    miyazaki: '綾の工芸の里から都城の弓づくりの仕事まで、',
    kagoshima: '霧島の森の彫刻の会場から薩摩焼・大島紬の産地まで、',
    okinawa: '壺屋のやちむんから紅型の染め、琉球ガラスの工房まで、',
    /* ── 東京のエリア区分 ── */
    'tokyo-central': '老舗の画廊から雑居ビル上階の現代美術のスペースまで、',
    'tokyo-east': '上野の美術館から清澄白河のギャラリー、蔵前の工房まで、',
    'tokyo-west': '初台・渋谷の大きな会場から中野・高円寺の小さなスペースまで、',
    'tokyo-south': '庭園美術館や区立美術館から住宅街のギャラリーまで、',
    'tokyo-north': '独自の企画を続ける区立美術館から池袋周辺の貸しギャラリーまで、',
    'tokyo-outer': '府中・八王子の市立美術館から美術大学に近いアトリエまで、'
  };
  /* 未登録の軸でも文が壊れないように、従来の共通句をフォールバックに残す。 */
  function descMid(key) { return DESCS[key] || 'ギャラリー・美術館の展示情報を、'; }

  /* 固定枠・しきい値の変更口。選定ロジック（pick）を管理画面 P90-17 側へ複製しないために置く。
     FIXED は配列の中身だけ入れ替える（参照を差し替えると pick 側の束縛が切れる）。
     本番は Drupal の設定値を読むのでこのセッターは消える。 */
  function setFeatured(fixedList, min) {
    if (fixedList) { FIXED.length = 0; fixedList.forEach(function (x) { FIXED.push(x); }); }
    if (typeof min === 'number' && min === min) MIN = min;
  }
  function minCount() { return MIN; }

  return {
    GROUPS: GROUPS, SLUGS: SLUGS, SLUG2PREF: SLUG2PREF, PREF2BLOCK: PREF2BLOCK, ALL: ALL, PREFS: PREFS,
    AREAS: AREAS, isArea: isArea, areaOf: areaOf, aliasOf: aliasOf, areasOf: areasOf, parentOf: parentOf, prefNote: prefNote,
    has: has, blockOf: blockOf,
    GENRES: GENRES, AXIS_GENRES: AXIS_GENRES, ACCESS: ACCESS, COUNT: COUNT, FIXED: FIXED, MIN: MIN, EX: EX, SORTS: SORTS,
    fullName: fullName, fullOf: fullOf, enName: enName, href: href,
    genre: genre, genreHref: genreHref, genreTotal: genreTotal, archiveHref: archiveHref,
    access: access, accessHref: accessHref, byAccess: byAccess,
    tags: tags, byTag: byTag,
    galleryOf: galleryOf, byPref: byPref, byGenre: byGenre, fillHtml: fillHtml, grid: grid,
    count: count, total: total, rotatable: rotatable, pick: pick, setDayShift: setDayShift, dayNo: dayNo,
    today: today, pickArea: pickArea, pickGenre: pickGenre,
    LEADS: LEADS, leadOf: leadOf, leadRaw: leadRaw, leadAuto: leadAuto, setLead: setLead,
    DESCS: DESCS, descMid: descMid,
    setFeatured: setFeatured, minCount: minCount
  };
}());

/* ════════════════════════════════════════════════════
   KTN.season  季節の言葉（P10 Picks 枠③の文言・2026-09-07 新設／追174-74）
   ── サイトで唯一「今月」「季節」を名乗ってよい言葉の置き場。
   ここ以外の特集ラベル・軸ページの導入文には時制の語を書かない（静的な条件に時制語を
   付けると、中身が変わらないのに周期を約束することになる）。この枠だけは月が替われば
   必ず言葉も対象も替わるので、時制の語を名乗れる。
   使い先は P10 の Picks 枠③ ひとつだけで、着地は P10 の検索。恒久URLを持つ軸ページには
   しない＝季節の言い回しは古びるので URL には焼かない（追174-46④と同じ理由）。
   年を書かないので毎年そのまま使い回せる（12か月ぶんのカレンダーを1本持つ）。
   編集口は P90-17「軸ページ管理」。表示（P10）と編集（P90-17）が同じ配列を見るために
   ここへ出した＝管理画面に文言を複製しない（KTN.axis の LEADS と同じ方針）。
   本番は Drupal の設定として持ち、この配列は初期値になる。
════════════════════════════════════════════════════ */
KTN.season = (function () {
  /* ── 対象の軸（2026-09-08 追174-76 で4種へ拡張／同日 追記5 で同時指定へ）──
     季節の入口は「何の展覧会か」だけでは作れない。8月の「夏休み」はジャンルではなく
     **誰と行けるか**（行きやすさ）で、避暑の季節は**どこか**（エリア）で表される。
     そこで対象を〈言葉＋4軸ぶんの指定〉にする。
     **4軸は排他ではなく同時に指定できる**（すべて満たすものへ着地＝AND）。掛けるほど母数は
     痩せるが、痩せた結果は管理画面の「状態」列と minCount のガードがその場で示すので、
     組み合わせの可否は運用（管理者の調整）に委ねる＝UIの側で禁止しない。
       tag    ＝技法・素材・主題の自由ワード（絵画／書道／版画…）。**ジャンルではない**。
       genre  ＝サイト正式の6区分（登録時の必須項目）。粗いぶん母数が安定する。
       area   ＝47都道府県＋東京の6エリア。「避暑地」「古都」のような通称はデータに無いので
                県・エリアで指し、季節感は言葉の側（「古都の秋をあるく」）が担う。
       access ＝行きやすさ（お子さまと行ける／クリエイター在廊）。 */
  var KINDS = [
    { key: 'tag',    label: 'タグ',       note: '技法・素材・主題（絵画・書道・版画など）' },
    { key: 'genre',  label: 'ジャンル',   note: 'サイト共通の6区分（登録時の必須項目）' },
    { key: 'area',   label: 'エリア',     note: '都道府県と東京のエリア' },
    { key: 'access', label: '行きやすさ', note: 'お子さまと行ける・クリエイター在廊' }
  ];
  function blank() { var s = {}; KINDS.forEach(function (k) { s[k.key] = ''; }); return s; }
  function sel(o) { var s = blank(); Object.keys(o || {}).forEach(function (k) { if (k in s) s[k] = o[k]; }); return s; }
  /* 12か月ぶんのカレンダー。sel は4軸ぶんの指定（空文字＝その軸は指定なし）。 */
  var LIST = [
    { label: '新年の書と墨',             sel: sel({ tag: '書道' }) },
    { label: '冬にひらく陶と器',         sel: sel({ tag: '陶芸' }) },
    { label: '春のはじめに絵をみる',     sel: sel({ tag: '絵画' }) },
    { label: '新しい季節と写真',         sel: sel({ genre: 'photo' }) },
    { label: '風のとおる現代美術',       sel: sel({ tag: '現代美術' }) },
    { label: '梅雨のあいだの版画',       sel: sel({ tag: '版画' }) },
    { label: '夏の光と写真',             sel: sel({ tag: '写真' }) },
    { label: '夏休み、子どもと出かける', sel: sel({ access: 'with-children' }) },
    { label: '古都の秋をあるく',         sel: sel({ area: 'kyoto' }) },
    { label: '芸術の秋、絵画をめぐる',   sel: sel({ tag: '絵画' }) },
    { label: '秋の器と手仕事',           sel: sel({ genre: 'craft' }) },
    { label: '年の終わりに墨をみる',     sel: sel({ tag: '書道' }) }
  ];
  /* 枠を出すかどうかの下限。該当が少ない月は枠ごと出さず、残りの枠が前に詰まる
     ＝季節の言葉で誘って着地先がスカスカ、という体験を作らない。 */
  var MIN = 3;
  function month() {
    var A = KTN.axis;
    return (A && A.today ? A.today() : new Date()).getMonth();
  }
  function get(m) { return LIST[typeof m === 'number' ? ((m % 12) + 12) % 12 : month()]; }
  function all() {
    return LIST.map(function (e, i) { return { m: i, label: e.label, sel: sel(e.sel) }; });
  }
  /* 対象の解決。**表示名と件数を1か所で出す**＝管理画面の「出る／出ない」と P10 の
     枠③ガードが別々の数を数えないようにする。件数は掲載マスタの固定値ではなく
     実際の母集団（KTN.axis.EX＝会期を終えていないもの）から数える。 */
  function targets(kind) {
    var A = KTN.axis; if (!A) return [];
    if (kind === 'genre')  return A.GENRES.map(function (g) { return { value: g.slug, name: g.name }; });
    if (kind === 'access') return A.ACCESS.map(function (a) { return { value: a.slug, name: a.chip }; });
    if (kind === 'area')   return A.ALL.map(function (s) { return { value: s, name: A.fullOf(s) }; });
    return A.tags(false).map(function (t) { return { value: t.name, name: t.name }; });
  }
  /* 軸ごとの表示名と、母集団1件があてはまるかの判定。表示・件数・着地の3つが同じ規則を見る。 */
  function nameOf(kind, v) {
    var A = KTN.axis; if (!A) return v;
    if (kind === 'genre')  { var g = A.genre(v);  return g ? g.name : v; }
    if (kind === 'area')   return A.fullOf(v) || v;
    if (kind === 'access') { var a = A.access(v); return a ? a.chip : v; }
    return v;
  }
  function hit(x, kind, v) {
    var A = KTN.axis; if (!A) return false;
    if (kind === 'genre')  { var g = A.genre(v);  return x.genre === (g ? g.name : v); }
    if (kind === 'area')   return A.isArea(v) ? x.varea === v : x.pref === v;
    if (kind === 'access') { var a = A.access(v); return !!a && !!x[a.field]; }
    return (x.tags || []).indexOf(v) !== -1;
  }
  /* 指定されている軸だけを取り出す（順番は KINDS＝表の並びと同じ）。 */
  function parts(e) {
    var s = e.sel || {};
    return KINDS.filter(function (k) { return !!s[k.key]; }).map(function (k) {
      return { kind: k.key, label: k.label, target: s[k.key], name: nameOf(k.key, s[k.key]) };
    });
  }
  /* 対象の解決。**表示名と件数を1か所で出す**＝管理画面の「出る／出ない」と P10 の
     枠③ガードが別々の数を数えないようにする。件数は掲載マスタの固定値ではなく
     実際の母集団（KTN.axis.EX＝会期を終えていないもの）から数える。
     指定が複数あるときは**すべてを満たすもの**を数える（AND）。1つも指定が無い月は
     母集団そのものへ着地してしまうので 0件扱い＝枠を出さない。 */
  function resolve(e) {
    var A = KTN.axis, ps = parts(e);
    var r = { parts: ps, names: ps.map(function (p) { return p.name; }), name: '', n: 0 };
    r.name = r.names.join('×');
    if (!A || !ps.length) return r;
    r.n = A.EX.filter(function (x) {
      return x.status !== 'ended' && ps.every(function (p) { return hit(x, p.kind, p.target); });
    }).length;
    return r;
  }
  /* 管理画面（P90-17）からの書き換え口。本番は Drupal の設定を書くのでこのセッターは消える。
     4軸は排他ではないので軸ごとに独立して入れ替える（空文字＝その軸だけ指定を外す）。 */
  function set(m, label, kind, target) {
    var e = LIST[((m % 12) + 12) % 12]; if (!e) return;
    if (typeof label === 'string') e.label = label;
    if (typeof kind === 'string' && kind && (kind in e.sel)) e.sel[kind] = typeof target === 'string' ? target : '';
  }
  function minCount() { return MIN; }
  function setMin(v) { if (typeof v === 'number' && v === v && v >= 0) MIN = v; }
  return {
    LIST: LIST, KINDS: KINDS, get: get, all: all, set: set, month: month,
    targets: targets, parts: parts, resolve: resolve, minCount: minCount, setMin: setMin
  };
}());

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

  /* ── デモデータ ──
     nd=掲載してからの経過日数（新着判定の単一ソース）／elapsed=開催してからの経過日数（soon＝未開幕は0）／
     growth=直近1週間の伸び率（前週比・soonは未計測で0）／status='live'|'ending'|'soon'|'ended'／
     会期 s・e は 'MM.DD'（＝2026年）と 'YYYY.MM.DD'（別年＝終了済み）の2形／
     rd=会期終了までの残り日数（soon は 97〜99 の仮値・ended は負値＝終了からの経過日数） ── */
  var EX = [
    { id: 1,  title: '静寂のかたち — 田中透 油彩展', venue: '白日ギャラリー', area: '東京', tarea: '東京都心部', onsite: 1, attend: 1, bonus: 1, s: '06.28', e: '07.13', hours: '11:00–19:00', status: 'live',   remain: '残り5日',  rd: 5,  tags: ['絵画', '現代美術'], genre: 'アート', type: 'solo',  free: 1, liaison: 'li',      pop: 88, int: 214, ci: 56, dist: '1.2km', wk: 1, nd: 24,   elapsed: 10, growth: .04,  imgH: 200, bg: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', thumbs: ['linear-gradient(135deg,#7a8ba0,#4e5a6a)', 'linear-gradient(135deg,#8a7a60,#5e4a3a)', 'linear-gradient(135deg,#6a8a7a,#3e5a4a)'] },
    { id: 2,  title: '墨聲 — 現代書道の地平', venue: '東京書芸館', area: '東京', tarea: '東京北部', s: '06.20', e: '07.10', hours: '10:00–18:00', status: 'ending', remain: '残り2日',  rd: 2,  tags: ['書道'], genre: 'アート', type: 'group', free: 0, liaison: 'li-plus', pop: 92, int: 342, ci: 128, dist: '2.4km', wk: 1, nd: 32,   elapsed: 18, growth: -.05, imgH: 165, bg: 'linear-gradient(135deg,#2e2a28,#5a5450)', thumbs: ['linear-gradient(135deg,#4a4440,#2a2624)', 'linear-gradient(135deg,#6a6058,#3a342e)', 'linear-gradient(135deg,#8a8078,#5a544e)'] },
    { id: 3,  title: '光を編む — 篠原恵 写真展', venue: 'ギャラリー日向', area: '東京', tarea: '東京西部', kids: 1, s: '07.01', e: '07.17', hours: '12:00–19:00', status: 'live',   remain: '残り9日',  rd: 9,  tags: ['写真'], genre: '写真', type: 'solo',  free: 1, liaison: '',        pop: 65, int: 98,  ci: 24, dist: '3.1km', wk: 0, nd: 9,    elapsed: 7,  growth: .35,  imgH: 250, bg: 'linear-gradient(135deg,#c0a880,#8a6e4a)' },
    { id: 4,  title: '彫りと摺り — 木版画の現在', venue: '京都版画舎', area: '京都', onsite: 1, kids: 1, s: '06.25', e: '07.20', hours: '10:00–17:00', status: 'live',   remain: '残り12日', rd: 12, tags: ['版画'], genre: 'アート', type: 'group', free: 0, liaison: '',        pop: 74, int: 156, ci: 42, dist: null,    wk: 1, nd: 27,   elapsed: 13, growth: .10,  imgH: 190, bg: 'linear-gradient(135deg,#7a6a8a,#4a3e5a)' },
    { id: 5,  title: 'マチエールの実験', venue: 'gallery TRACE', area: '東京', tarea: '東京西部', onsite: 1, bonus: 1, s: '06.30', e: '07.16', hours: '11:00–20:00', status: 'live',   remain: '残り8日',  rd: 8,  tags: ['絵画', '現代美術'], genre: 'アート', type: 'group', free: 0, liaison: 'li',      pop: 81, int: 188, ci: 61, dist: '0.8km', wk: 1, nd: 21,   elapsed: 8,  growth: .08,  imgH: 215, bg: 'linear-gradient(135deg,#a05a4a,#6a3428)', thumbs: ['linear-gradient(135deg,#b07a6a,#7a4838)', 'linear-gradient(135deg,#c09a8a,#8a5e4e)', 'linear-gradient(135deg,#906a5a,#5a3a2e)'] },
    { id: 6,  title: '海と孤影 — 山根拓 写真展', venue: 'フォトスペース博多', area: '福岡', s: '07.10', e: '08.02', hours: '11:00–18:00', status: 'soon',   remain: '2日後に開催',  rd: 99, tags: ['写真'], genre: '写真', type: 'solo',  free: 0, liaison: '',        pop: 62, int: 74,  ci: 0,  dist: null,    wk: 1, nd: 6,    elapsed: 0,  growth: 0,    imgH: 235, bg: 'linear-gradient(135deg,#3a5a7a,#1e3448)' },
    { id: 7,  title: '筆の呼吸 — 二人の書', venue: '大阪墨美堂', area: '大阪', onsite: 1, s: '07.08', e: '07.14', hours: '10:00–18:00', status: 'live',   remain: '残り6日',  rd: 6,  tags: ['書道'], genre: 'アート', type: 'group', free: 1, liaison: '',        pop: 55, int: 62,  ci: 18, dist: null,    wk: 1, nd: 16,   elapsed: 0,  growth: .12,  imgH: 180, bg: 'linear-gradient(135deg,#4a4a4a,#1e1e1e)' },
    { id: 8,  title: '都市の水彩 — 岡島みのり', venue: '横浜アートポート', area: '神奈川', kids: 1, s: '06.22', e: '07.11', hours: '11:00–19:00', status: 'ending', remain: '残り3日',  rd: 3,  tags: ['絵画'], genre: 'アート', type: 'solo',  free: 0, liaison: '',        pop: 58, int: 87,  ci: 31, dist: '5.6km', wk: 1, nd: 30,   elapsed: 16, growth: -.02, imgH: 210, bg: 'linear-gradient(135deg,#6a9ab0,#3a5e74)' },
    { id: 9,  title: '陶と土のリズム', venue: '瀬戸クラフト館', area: '愛知', onsite: 1, kids: 1, s: '07.08', e: '07.23', hours: '10:00–17:00', status: 'live',   remain: '残り15日', rd: 15, tags: ['陶芸', 'クラフト'], genre: 'クラフト', type: 'group', free: 0, liaison: '',        pop: 49, int: 53,  ci: 12, dist: null,    wk: 0, nd: 18,   elapsed: 0,  growth: .05,   imgH: 195, bg: 'linear-gradient(135deg,#9a8a6a,#5e5238)' },
    { id: 10, title: '銅版のミクロコスモス — 早瀬涼', venue: 'ギャラリー刻', area: '東京', tarea: '東京東部', kids: 1, attend: 1, s: '07.04', e: '07.18', hours: '12:00–19:00', status: 'live',   remain: '残り10日', rd: 10, tags: ['版画'], genre: 'アート', type: 'solo',  free: 0, liaison: 'li',      pop: 67, int: 112, ci: 27, dist: '4.2km', wk: 0, nd: 6,    elapsed: 4,  growth: .28,  imgH: 225, bg: 'linear-gradient(135deg,#5a7a6a,#2e4638)', thumbs: ['linear-gradient(135deg,#7a9a8a,#4a6a58)', 'linear-gradient(135deg,#6a8a7a,#3a5a48)', 'linear-gradient(135deg,#8aaa9a,#5a7a68)'] },
    { id: 11, title: 'セルフポートレイトの練習', venue: 'studio hue', area: '東京', tarea: '東京23区以外', attend: 1, s: '07.11', e: '07.26', hours: '13:00–20:00', status: 'soon',   remain: '3日後に開催', rd: 98, tags: ['写真', '現代美術'], genre: '写真', type: 'solo',  free: 0, liaison: 'li-plus', pop: 79, int: 143, ci: 0,  dist: null,    wk: 1, nd: 3,    elapsed: 0,  growth: 0,    imgH: 170, bg: 'linear-gradient(135deg,#b08aa0,#7a4e68)', thumbs: ['linear-gradient(135deg,#c0a0b0,#8a5e78)', 'linear-gradient(135deg,#a07a90,#6a4258)', 'linear-gradient(135deg,#d0b0c0,#9a6e88)'] },
    { id: 12, title: 'ガラスのなかの庭 — 三好文乃', venue: '天神ガラス工房', area: '福岡', onsite: 1, kids: 1, bonus: 1, s: '06.29', e: '07.19', hours: '11:00–18:00', status: 'live',   remain: '残り11日', rd: 11, tags: ['クラフト'], genre: 'クラフト', type: 'solo',  free: 1, liaison: '',        pop: 66, int: 91,  ci: 22, dist: null,    wk: 0, nd: 23,   elapsed: 9,  growth: .06,  imgH: 205, bg: 'linear-gradient(135deg,#7ab0a8,#3e6e66)' },
    { id: 13, title: '抽象の温度', venue: 'アートスペース青', area: '東京', tarea: '東京南部', s: '06.18', e: '07.10', hours: '11:00–19:00', status: 'ending', remain: '残り2日',  rd: 2,  tags: ['現代美術'], genre: 'アート', type: 'group', free: 0, liaison: '',        pop: 90, int: 276, ci: 94, dist: '2.9km', wk: 1, nd: 38,   elapsed: 20, growth: -.08, imgH: 240, bg: 'linear-gradient(135deg,#c07040,#7a3e18)' },
    { id: 14, title: '白の器展', venue: '京都陶々庵', area: '京都', onsite: 1, s: '07.08', e: '07.28', hours: '10:00–17:00', status: 'live',   remain: '残り20日', rd: 20, tags: ['陶芸'], genre: 'クラフト', type: 'group', free: 0, liaison: '',        pop: 47, int: 44,  ci: 9,  dist: null,    wk: 0, nd: 20,   elapsed: 0,  growth: .02,   imgH: 185, light: 1, bg: 'linear-gradient(135deg,#b0aca0,#6e6a5e)' },
    { id: 15, title: '路地と光 — 街歩き写真部', venue: 'コートギャラリー谷中', area: '東京', tarea: '東京東部', kids: 1, bonus: 1, s: '07.03', e: '07.15', hours: '11:00–18:00', status: 'live',   remain: '残り7日',  rd: 7,  tags: ['写真'], genre: '写真', type: 'group', free: 1, liaison: '',        pop: 71, int: 104, ci: 38, dist: '1.8km', wk: 1, nd: 5,    elapsed: 5,  growth: .22,   imgH: 220, bg: 'linear-gradient(135deg,#8a8a70,#4e4e38)' },
    { id: 16, title: 'えんぴつと余白 — 西尾栞', venue: '鎌倉小町ギャラリー', area: '神奈川', onsite: 1, attend: 1, s: '07.20', e: '08.04', hours: '10:00–17:00', status: 'soon',   remain: '12日後に開催', rd: 97, tags: ['絵画'], genre: 'アート', type: 'solo',  free: 1, liaison: '',        pop: 40, int: 31,  ci: 0,  dist: null,    wk: 0, nd: 2,    elapsed: 0,  growth: 0,    imgH: 175, light: 1, bg: 'linear-gradient(135deg,#d0c8a0,#8a8258)' },
    /* ── 終了済み（status:'ended'）＝検索でのみ出る母数。棚・レール・右カラム・特集は DISC（notEnded）を見るので入らない ── */
    { id: 17, title: '記憶の稜線 — 佐倉ゆき 絵画展', venue: 'アートスペース青', area: '東京', tarea: '東京南部', kids: 1, attend: 1, s: '2026.04.10', e: '2026.04.26', hours: '11:00–19:00', status: 'ended', rd: -73,  tags: ['絵画', '現代美術'], genre: 'アート', type: 'solo',  free: 0, liaison: 'li',      pop: 76, int: 168, ci: 52, dist: '2.9km', wk: 0, nd: 110, elapsed: 16, growth: 0, imgH: 205, bg: 'linear-gradient(135deg,#8a7a9a,#4e4260)' },
    { id: 18, title: '古紙と拓 — 拓本の技法展', venue: '京都版画舎', area: '京都', onsite: 1, attend: 1, s: '2026.02.14', e: '2026.03.08', hours: '10:00–17:00', status: 'ended', rd: -122, tags: ['版画'], genre: 'アート', type: 'group', free: 1, liaison: '',        pop: 61, int: 94,  ci: 33, dist: null,    wk: 0, nd: 150, elapsed: 22, growth: 0, imgH: 185, bg: 'linear-gradient(135deg,#9a8e7a,#5e5444)' },
    { id: 19, title: '冬の白磁 — 三村奏 個展', venue: '京都陶々庵', area: '京都', onsite: 1, kids: 1, s: '2025.12.05', e: '2025.12.21', hours: '10:00–17:00', status: 'ended', rd: -199, tags: ['陶芸'], genre: 'クラフト', type: 'solo',  free: 0, liaison: 'li-plus', pop: 83, int: 205, ci: 71, dist: null,    wk: 0, nd: 240, elapsed: 16, growth: 0, imgH: 215, light: 1, bg: 'linear-gradient(135deg,#cfd4d8,#8e969e)' },
    { id: 20, title: '夜間飛行 — 山根拓 写真展', venue: 'フォトスペース博多', area: '福岡', s: '2025.11.01', e: '2025.11.24', hours: '11:00–18:00', status: 'ended', rd: -226, tags: ['写真'], genre: '写真', type: 'solo',  free: 1, liaison: '',        pop: 58, int: 76,  ci: 25, dist: null,    wk: 0, nd: 270, elapsed: 23, growth: 0, imgH: 195, bg: 'linear-gradient(135deg,#2e3e52,#141c26)' },
  ];

  /* ── 会場マスタ ──
     バリアフリー・駐車場・決済手段は展覧会ではなく**会場（建物）が持つ事実**なので展覧会レコードに置かず、
     ここから引く。入力元は p4-11「利用案内」（バリアフリーのチェック／駐車場／クレカ・電子マネー）。
     **載っているのは会場ページが紐付いている会場だけ**で、紐付いていない会場（下の一覧に無い名前）の
     展覧会はこの3条件でヒットしない。未申告を「なし」とも「あり」とも読み替えないための構造＝
     p4-11 で「対応／非対応」の判定をやめ事実のチェックに変えたのと同じ原則（追174-56）。
     鎌倉小町ギャラリーはページはあるが3項目とも未申告＝**ページの有無とヒットの有無は別**。
     `barrierFree` は p4-11 のチェック6項目（入口に段差なし／展示室は1階／エレベーター／多目的トイレ／
     ベビーカー／車いす貸出）の**いずれかに申告がある**という粒度。検索チップを「段差なし」でなく
     「バリアフリー」にしたのは、入力欄が「バリアフリー」という括りで、既存の入力が特定の1項目に
     割れているとは限らないため＝**絞り込みの粒度は入力の粒度に合わせる**。どの事実で当たったかは
     会場ページ側に事実が並んでいるので、そこで確認できる。
     本番（Drupal）は会場名でなく venueId で引く。 */
  var VENUES = {
    '白日ギャラリー':       { barrierFree: 1, card: 1 },
    '東京書芸館':           { barrierFree: 1, parking: 1 },
    '京都版画舎':           { parking: 1 },
    'gallery TRACE':        { barrierFree: 1, card: 1 },
    'フォトスペース博多':   { barrierFree: 1, parking: 1, card: 1 },
    '横浜アートポート':     { barrierFree: 1, parking: 1, card: 1 },
    '瀬戸クラフト館':       { barrierFree: 1, parking: 1 },
    '天神ガラス工房':       { parking: 1, card: 1 },
    'アートスペース青':     { barrierFree: 1, card: 1 },
    '京都陶々庵':           { parking: 1, card: 1 },
    '鎌倉小町ギャラリー':   {}
  };
  /* 会場ページが無ければ undefined、項目が無ければ未申告。どちらも false＝絞り込みから外れる */
  function venueFact(x, f) { var v = VENUES[x.venue]; return !!(v && v[f]); }

  /* 新着＝掲載からの経過日数 nd が NEW_DAYS 以内。手打ちの isNew フラグを廃し1本のしきい値から導出する。
     これでチップ new:1・棚「新着掲載」・並べ替え「新着順」・特集 new-all が同じ定義を見る（SOON_DAYS と同じ考え方・2026-09-03）。
     本番は Drupal の掲載日から nd を算出する。 */
  var NEW_DAYS = 14;
  EX.forEach(function (x) { x.isNew = x.nd <= NEW_DAYS; });

  function isOn(x) { return x.status === 'live' || x.status === 'ending'; }
  /* 終了済みを除外（開催中・開催予定のみ）＝ランキング系棚の共通候補条件。
     追174-45 でデモデータに 'ended' を4件足したので、これは安全弁ではなく実際に効く条件になった。 */
  function notEnded(x) { return x.status !== 'ended'; }

  /* ── 母数の分離（2026-09-03 確定・追174-45）──
     棚・レール・右カラム・特集は「これから行ける展覧会」の面なので DISC（＝終了済みを除いた母数）だけを見る。
     過去の展覧会を扱うのは検索だけ（runFilter の EX.filter）＝会期の記録を辿る用途は検索の役割として切り分ける。
     新しい棚・レールを足すときも必ず DISC を母数にする（EX を直接 filter しない）。 ── */
  var DISC = EX.filter(notEnded);

  /* ── 日付エンジン（開催日クイック指定・日付チップ・期間指定の3つが共有） ──
     デモ基準日＝2026-07-08（各展覧会の remain/rd と会期から逆算した「今日」）。
     本番（React CSR）は TODAY = new Date() に差し替えるだけでよい。
     デモデータの会期は 'MM.DD'（年なし＝2026年）と 'YYYY.MM.DD'（年つき＝終了済みの過去展覧会）の2形。 */
  var TODAY = new Date(2026, 6, 8);
  function md2date(md) {
    var p = String(md).split('.');
    return p.length === 3 ? new Date(+p[0], +p[1] - 1, +p[2]) : new Date(2026, +p[0] - 1, +p[1]);
  }
  function addDays(d, n) { var t = new Date(d.getTime()); t.setDate(t.getDate() + n); return t; }
  /* 会期がこの期間に1日でも重なるか。日付ピンポイント指定も from=to で同じ判定に載せる */
  function spanHits(x, from, to) { return md2date(x.s) <= to && md2date(x.e) >= from; }
  /* 週末＝土日。日曜なら当日のみ（＝すでに週末の最終日） */
  function weekendOf(base) {
    var w = base.getDay();
    if (w === 0) return [base, base];
    var sat = addDays(base, (6 - w + 7) % 7);
    return [sat, addDays(sat, 1)];
  }
  /* ── 開催日クイック指定（when:）＝棚とステータスバッジの定義を共有する ──
     旧「今日／明日／来週末／今週中」は会期の重なり判定で、どの棚とも対応しない条件だった（2026-09-03 廃止）。
     現行は「開幕・終了がいつか」の一軸に揃え、検索から入っても棚から入っても同じ集合に着地させる。
     SOON_DAYS を1箇所変えれば「もうすぐ開催」「もうすぐ終了」の境界がチップ・棚（PRESETS）で同時に動く。 */
  var SOON_DAYS = 3;
  function dday(d) { return Math.round((d - TODAY) / 86400000); }
  function whenHit(x, v) {
    var ds = dday(md2date(x.s)), de = dday(md2date(x.e));
    if (v === 'opentoday') return ds === 0;                   /* 今日から開催＝本日が初日 */
    if (v === 'opensoon')  return ds > 0 && ds <= SOON_DAYS;   /* もうすぐ開催＝開幕まであと3日 */
    if (v === 'endsoon')   return de >= 0 && de <= SOON_DAYS;  /* もうすぐ終了＝終了日を含めてあと3日 */
    return false;
  }

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

  /* ノーマーク（まだ多くの人の目に触れていない）の境目。興味あり！の数がこれ未満を低露出とみなす。
     本番は絶対数ではなく分布（下位N%）で決める＝母数が増えると固定値は意味を失うため。 */
  var QUIET_MAX = 80;
  /* 枠⑤に1回あたり何件出すか。該当する展覧会を全部並べると「反応の少ない展覧会の一覧」＝
     人気順の裏返しになり、結局そこでも同じ顔ぶれが並び続ける。少数を選び直すことで、
     同じ母集団から毎回ちがう展覧会が表に出る（＝母集団は静的・見える面だけが動く）。
     デモは母集団が5件しかないので、開き直すと顔ぶれが替わるのが見えるよう4に置いている。
     本番は母集団が桁違いに大きいので十数件が妥当（Drupal 側の設定値になる）。 */
  var QUIET_SHOW = 4;
  var quietCache = null;
  /* この枠だけは日替わりではなく**ページを開くたびに選び直す**（2026-09-08 ユーザー指示）。
     他の4枠は「今日の誌面」＝1日固定だが、⑤は面そのものが〈たまたま出会う〉ための枠なので、
     開くたびに違う顔ぶれである方が枠の役割に合う。
     ただし**1回のページ内では固定**する＝レールに出した枠と、押した先の検索結果と、
     そのあとの絞り込みが別々の顔ぶれになると「さっき見たものが消えた」になるため、
     読み込み時に1回だけ選び、その結果を保持する（引き直しボタン等の記号は出さない・追174-73）。 */
  function quietPick() {
    var A = KTN.axis, d = A && A.dayNo ? A.dayNo() : 0;
    if (quietCache && quietCache.d === d) return quietCache.set;
    var pool = EX.filter(function (x) { return notEnded(x) && x.int < QUIET_MAX; });
    /* Fisher–Yates（先頭 QUIET_SHOW 件ぶんだけ回す） */
    for (var i = 0; i < Math.min(QUIET_SHOW, pool.length - 1); i++) {
      var j = i + Math.floor(Math.random() * (pool.length - i));
      var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
    var set = {};
    pool.slice(0, QUIET_SHOW).forEach(function (x) { set[x.id] = 1; });
    quietCache = { d: d, set: set };
    return set;
  }

  /* feat＝「今日の特集」として差し出してよい保存済み検索（結果末尾の再回遊カード・ゼロヒットの提案）。
     旧 rail フラグ（Picks レールに定義順で全部出す）から改名した（2026-09-07・追174-73）。
     レールは12個を並べる場所ではなく5枠しか持たなくなったので、「特集の語彙」と「レールに出す枠」を
     別の概念として分けた＝ここに特集を足してもレールは太らない。 */
  var PRESETS = {
    'week-picks':   { feat: 1, axis: 'pop',   label: '反応の多い展覧会',      desc: '興味あり！・チェックインの反応が多い、開催中の展覧会です。', f: function (x) { return x.pop >= 80 && isOn(x); } },
    'liaison':      { feat: 1, label: 'オンラインで楽しめる',  html: '<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>オンラインで楽しめる', desc: '「LIAISON・LIAISON+ オンライン展示あり」条件から自動生成した特集です。', f: function (x) { return !!x.liaison; } },
    'liaison-plus': { feat: 1, label: 'オンラインで購入できる', html: '<span class="lb-dot li-plus"><span class="lb-dot-inner"></span>LIAISON+</span>オンラインで購入できる', desc: '「LIAISON+（オンライン販売あり）」条件から自動生成した特集です。会場に行けなくても作品を購入できます。', f: function (x) { return x.liaison === 'li-plus'; } },
    'fukuoka':      { feat: 1, axis: 'area',  label: '福岡で行くべき展覧会',  desc: '「福岡」エリアの掲載展覧会から自動生成した特集です。', f: function (x) { return x.area === '福岡'; } },
    'shodo':        { feat: 1, axis: 'tag',   label: '話題の書道展',          desc: '「書道」タグ × 人気シグナルの組み合わせで自動生成した特集です。', f: function (x) { return x.tags.indexOf('書道') !== -1; } },
    'weekend':      { feat: 1, axis: 'date',  label: 'この週末に行きたい',    desc: '「今週末に開催」条件から自動生成した特集です。', f: function (x) { return !!x.wk; } },
    'tokyo-gendai': { feat: 1, axis: 'area',  label: '東京・現代美術',        desc: '「東京」エリア × 「現代美術」タグの組み合わせで自動生成した特集です。', f: function (x) { return x.area === '東京' && x.tags.indexOf('現代美術') !== -1; } },
    'hanga':        { feat: 1, axis: 'tag',   label: '版画の世界',            desc: '「版画」タグの掲載展覧会から自動生成した特集です。', f: function (x) { return x.tags.indexOf('版画') !== -1; } },
    'photo':        { feat: 1, axis: 'tag',   label: '写真展セレクション',    desc: '「写真」タグの掲載展覧会から自動生成した特集です。', f: function (x) { return x.tags.indexOf('写真') !== -1; } },
    'near-live':    { feat: 1, axis: 'area',  label: '近くで開催中',          desc: '「現在地から近い順」×「開催中」の条件から自動生成した特集です。', f: function (x) { return !!x.dist && isOn(x); } },
    'free':         { feat: 1, axis: 'price', label: '無料で楽しめる展示',    desc: '「入場無料」条件から自動生成した特集です。', f: function (x) { return !!x.free; } },
    'solo-all':     { feat: 1, axis: 'pop',   label: 'ひとりの作家をじっくり', desc: '出展者がひとりの展覧会です。ひとつの仕事をまとめて見られます。', f: function (x) { return x.type === 'solo' && x.pop >= 60; } },
    /* ── 発見のある展覧会（Picks レール枠⑤・2026-09-07 新設／2026-09-08 日替わりピックアップ化）──
       反応の多い順に並べると、母数の大きい展覧会が上位を占め続けて入れ替わらない。
       反応がしきい値未満（ノーマーク）のものだけを別に拾い、順位とは無関係の入口を1つ確保する
       （P10 の設計思想＝単一指標に依存しない・低露出枠を保証する を、棚だけでなくレールにも効かせる）。
       中身は quietPick() が選ぶ少数＝母集団の全部を並べると「反応の少ない展覧会の一覧」
       という人気順の裏返しになるため。この枠だけは日替わりではなくページを開くたびに選び直す
       （1回のページ内では固定）。**引き直しボタン等のランダムの記号は出さない**（追174-73）。
       ラベルとリード文の書き方（2026-09-08 ユーザー指示）＝**母集団の弱さも内部の動作も書かない**。
       「まだ少ない」「目に触れていない」は、このレールを出品者本人も見るので「人気がない棚」と
       読める。「開くたびに選び直す」「日替わり」は仕組みの説明で、行きたい理由にはならない。
       残すのは〈偶然の出会い〉と〈見に行ける〉の2つだけ。
       **展覧会そのものを定義しない**（「偶然の出会いを楽しむための展覧会です」は、運営が勝手に
       性格を決めた断定になる＝出品者の意図と関係ない）。主語は展覧会ではなく読み手の体験に置き、
       起きるかもしれないこととして書く。 */
    'quiet':        { feat: 0, axis: 'pop',   label: '発見のある展覧会', desc: '思いがけない一つに出会えるかもしれません。気になったら、会期のうちに足を運んでみてください。', f: function (x) { return notEnded(x) && x.int < QUIET_MAX && quietPick()[x.id] === 1; } },
    /* sort＝その特集を開いたときの既定の並び順。説明文で並び順を約束している特集だけに持たせる
       （既定の「おすすめ順」のままだと説明文と実際の並びが食い違うため・2026-09-01） */
    'ending-all':   { feat: 0, axis: 'date',  sort: 'end', label: 'もうすぐ終了の展覧会',  desc: '会期終了が近い順に表示しています。', f: function (x) { return whenHit(x, 'endsoon'); } },
    'new-all':      { feat: 0, axis: 'date',  sort: 'new', label: '新着掲載の展覧会',      desc: '最近個展なびに掲載された展覧会です。', f: function (x) { return !!x.isNew; } },
    'for-you':      { feat: 0, axis: 'pop',   label: 'あなたへのおすすめ',    desc: 'ウォッチ中のクリエイター・興味あり！の傾向からのおすすめです。', f: function (x) { return notEnded(x); } },
    /* ランキング3軸（行きたい／行った／急上昇）＝いずれも「開催中・開催予定」限定。
       軸は「意志（興味あり！）」「行動（チェックイン）」「変化（前週比）」の3種類で、量の変種を並べない。
       want/visited は経過日数で正規化＝単一の絶対数（旧trending）だと会期の長い展覧会が居座り続けるため。
       旧「今週の人気」「実際に行った人が多い」からの改称（2026-09-02）＝意志と行動の対比が名前で読めるようにした。
       ③低露出枠の混在は廃止（buildRanking のコメント参照）。 */
    'want':         { feat: 0, axis: 'pop',   sort: 'pop', label: '行きたい',              desc: '興味あり！の反応を会期の経過日数で正規化した、行きたい人の多さランキングです。', f: function (x) { return notEnded(x); } },
    'visited':      { feat: 0, axis: 'pop',   sort: 'pop', label: '行った',                desc: 'チェックイン数を会期の経過日数で正規化した、実際に行った人の多さランキングです。', f: function (x) { return notEnded(x); } },
    'rising':       { feat: 0, axis: 'pop',   sort: 'pop', label: '急上昇',                desc: '直近1週間の伸び率が高い展覧会です（開催中・開催予定のみ）。', f: function (x) { return notEnded(x); } },
    /* 今日から開催＝チップ（when:opentoday）と同じ whenHit を共有する時間軸の棚。
       旧「注目のクリエイター・ギャラリーの新着」（host-buzz）がここを占めていたが、母集団が新着掲載棚と同じ isNew で
       3枠中2枠が重複し、並びの根拠もクリエイター・ギャラリーの蓄積ウォッチ数＝既に人気のホストを上位に固定する軸だったため、
       裾野を広げる方針と噛み合わず廃止（2026-09-03）。新着は「新着掲載」1棚に集約し、空いた枠を時間軸に充てた。 */
    'opening-today': { feat: 0, axis: 'date',  label: '今日から開催の展覧会', desc: '今日が会期の初日の展覧会です。', f: function (x) { return whenHit(x, 'opentoday'); } },
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
    document.querySelectorAll('.p10-chip.is-on[data-f],.p10-day.is-on[data-f]').forEach(function (c) {
      var i = c.dataset.f.indexOf(':');
      var k = c.dataset.f.slice(0, i), v = c.dataset.f.slice(i + 1);
      if (!m[k]) m[k] = [];
      if (m[k].indexOf(v) === -1) m[k].push(v);
    });
    /* 「期間を指定する」の日付入力はチップではないので個別に拾う。
       **開始日は必須・終了日は任意**（開始日だけ＝その日以降）。過去日は自由に指定できる＝検索なら過去の展覧会も探せる。
       終了日だけの指定を作らせないのは、下限が無いと終了済みの会期が過去へ無限に積み上がり母数が爆発するため
       （追174-44 では下限を今日に固定したが、過去を検索したいという要件と両立しないので開始日必須に変更・追174-45）。 */
    var ds = document.querySelectorAll('#p10Adv .p10-adv__date');
    if (ds.length === 2 && ds[0].value) m.range = [ds[0].value + '_' + ds[1].value];
    return m;
  }

  /* 開始日が空のあいだ終了日欄を無効化し、終了日の下限を開始日に合わせる（＝終了日だけの指定が物理的に作れない）。
     新規CSSは足さず input の disabled のまま使う。条件クリア系からも呼ぶ */
  function syncRangeEnd() {
    var d = document.querySelectorAll('#p10Adv .p10-adv__date');
    if (d.length !== 2) return;
    var has = !!d[0].value;
    d[1].disabled = !has;
    d[1].min = d[0].value || '';
    if (!has) d[1].value = '';
    else if (d[1].value && d[1].value < d[0].value) d[1].value = d[0].value;
  }
  function clearRangeInputs() {
    document.querySelectorAll('#p10Adv .p10-adv__date').forEach(function (n) { n.value = ''; });
    syncRangeEnd();
  }

  function matches(x, filters, kw) {
    /* 特集は棚と同じ「面」なので終了済みを含めない（過去を出すのは期間指定・キーワードの側の役割・追174-45） */
    if (activePreset && (!PRESETS[activePreset].f(x) || !notEnded(x))) return false;
    for (var k in filters) {
      var vals = filters[k], ok = false;
      for (var i = 0; i < vals.length; i++) {
        var v = vals[i], r;
        if (k === 'st' && v === 'live' && isOn(x)) ok = true;
        /* 今週末＝x.wk（事前計算フラグ）でなく実日付で判定＝「開催日」の他の指定と結果がずれないようにする */
        else if (k === 'weekend' && (r = weekendOf(TODAY)) && spanHits(x, r[0], r[1])) ok = true;
        else if (k === 'when' && whenHit(x, v)) ok = true;
        else if (k === 'day' && spanHits(x, md2date(v), md2date(v))) ok = true;
        else if (k === 'range') {
          var rr = v.split('_');
          /* 開始日は必須・終了日は任意（空＝上限なし）。下限は activeChipFilters が開始日必須にすることで担保する（追174-45） */
          var rf = new Date(+rr[0].slice(0, 4), +rr[0].slice(5, 7) - 1, +rr[0].slice(8, 10));
          var rt = rr[1] ? new Date(+rr[1].slice(0, 4), +rr[1].slice(5, 7) - 1, +rr[1].slice(8, 10)) : new Date(2999, 11, 31);
          if (spanHits(x, rf, rt)) ok = true;
        }
        else if (k === 'new' && x.isNew) ok = true;
        else if (k === 'near' && x.dist) ok = true;
        else if (k === 'free' && x.free) ok = true;
        else if (k === 'onsite' && x.onsite) ok = true;
        /* アクセシビリティ属性。軸ページ（P10-4-5）と同じフィールドを見るので、
           チップで絞った結果と /exhibitions/access/{slug} の中身が食い違わない（追174-54） */
        else if (k === 'kids' && x.kids) ok = true;
        else if (k === 'attend' && x.attend) ok = true;
        /* 会場が持つ事実。展覧会ではなく会場を引く（VENUES）ので、会場ページが紐付いていない展覧会は
           どれだけ条件に合っていても出ない＝**確認できた事実だけで絞る**。母数が減るぶんはドロワーの注記で断る */
        else if (k === 'barrierfree' && venueFact(x, 'barrierFree')) ok = true;
        else if (k === 'parking'  && venueFact(x, 'parking'))  ok = true;
        else if (k === 'card'     && venueFact(x, 'card'))     ok = true;
        /* 特典は会場でなく展覧会が持つ（会期ごとに変わるため）。入力は p2-11「会場利用案内」の特典 */
        else if (k === 'bonus' && x.bonus) ok = true;
        else if (k === 'area' && x.area === v) ok = true;
        else if (k === 'tarea' && x.tarea === v) ok = true;
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

  /* ── おすすめ順（既定）と Featured クラスタ ──────────────────────────────
     検索結果の**並び順そのもの**を、出品側への誘因として設計する（2026-09-01 確定）。
     「一番上が一番見られる」ので、そこに出る条件を分かりやすくしておけば
     「作品を登録する・記事を書く・来場者にレビューしてもらう」動機になる。

     ① 資格＝**種類がそろっていること**（作品1点以上・記事1本以上・レビュー1件以上）。
        量では順位を付けない＝記事を量産すれば上がる／露出の多い大手が居座る、を避けるため
        （P10のディスカバリー方針＝単一指標に依存しない・低露出にも枠を残す と同じ考え）。
     ② 資格を満たすものを上に寄せ、その中で会期終了が近い順に並べる（＝連続的な誘因）。
     ③ さらに先頭の2件だけは**巻頭と同じクラスタ表示**にする。どれを大きく出すかは
        「日付＋検索条件」をシードにした抽選＝同じ日・同じ条件なら何度開いても同じ、
        日が変われば入れ替わる（露出のローテーション）。
     ④ 「会期終了が近い順／人気順／新着順」を選んだときはクラスタを出さない
        ＝ユーザーが指定した並び順の約束を壊さない（案A）。 */
  function qualifies(x) { return KTN.cl.qualifies('exhibition', x.id, x.title); }
  function sortResults(list) {
    var mode = elSort ? elSort.value : 'rec';
    var cmp;
    if (mode === 'pop')      cmp = function (a, b) { return b.pop - a.pop; };
    else if (mode === 'new') cmp = function (a, b) { return a.nd - b.nd; };
    else if (mode === 'end') cmp = function (a, b) { return a.rd - b.rd; };
    else                     cmp = function (a, b) { return (qualifies(b) - qualifies(a)) || (a.rd - b.rd); };
    /* 終了済みは並べ替えの軸によらず常に末尾。ended の rd は負値なので「終了が近い順」で先頭に来てしまい、
       人気順でも過去の実績が現役を押しのけるため、軸の手前で一段切る（追174-45） */
    return list.slice().sort(function (a, b) {
      return ((a.status === 'ended') - (b.status === 'ended')) || cmp(a, b);
    });
  }

  var FEAT_N = 2;         /* クラスタで大きく出す件数 */
  var FEAT_MIN_HITS = 6;  /* 結果がこれ未満なら出さない（全部が「注目」では選んだことにならない） */
  var FEAT_MIN_QUAL = 3;  /* 資格者がこれ未満でも同じ理由で出さない */
  /* シード＝その日 × 検索条件。条件が違えば別の紙面、同じ条件なら1日中同じ紙面 */
  function featSeed() {
    var key = (activePreset || '') + '|' + (elKeyword ? elKeyword.value.trim() : '')
      + '|' + JSON.stringify(activeChipFilters()) + '|' + (elSort ? elSort.value : '');
    return (KTN.cl.strSeed(key) ^ Math.imul(KTN.cl.doy(), 0x9E3779B1)) | 0;
  }
  function pickFeatured(list, seed) {
    if (!elSort || elSort.value !== 'rec') return [];
    if (list.length < FEAT_MIN_HITS) return [];
    var q = list.filter(qualifies);
    if (q.length < FEAT_MIN_QUAL) return [];
    return KTN.cl.shuffle(q.slice(), KTN.cl.rng(seed)).slice(0, FEAT_N);
  }
  function renderFeatured(items, seed) {
    var wrap = document.getElementById('p10Feat');
    var row = document.getElementById('p10FeatRow');
    if (!wrap || !row) return;
    if (!items.length) { wrap.hidden = true; row.innerHTML = ''; return; }
    var rnd = KTN.cl.rng(seed + 7);
    row.innerHTML = items.map(function (x) {
      /* num は付けない＝検索結果では「01/02」が順位に読まれるため（巻頭は誌面のスロット番号） */
      return KTN.cl.exhCluster(x, {
        sats: KTN.cl.pick('exhibition', x.id, x.title, 3, rnd),
        lead: KTN.cl.NOTE[x.id] || ''
      });
    }).join('');
    wrap.hidden = false;
  }

  /* ── fchips（適用中フィルタ表示） ── */
  var FLABEL = {
    'st:live': '開催中', 'new:1': '新着掲載', 'weekend:1': '今週末', 'near:1': '近くで開催', 'free:1': '入場無料',
    'onsite:1': '会場での作品販売あり', 'kids:1': 'お子さまと行ける', 'attend:1': '在廊あり',
    'barrierfree:1': 'バリアフリー', 'parking:1': '駐車場あり', 'card:1': 'クレジットカードOK', 'bonus:1': '来場者特典あり',
    'when:opentoday': '今日から開催', 'when:opensoon': 'もうすぐ開催', 'when:endsoon': 'もうすぐ終了',
    'type:solo': '個展', 'type:group': 'グループ展', 'liaison:li': 'LIAISON展示あり', 'liaison:lp': 'LIAISON+購入可',
  };
  function mdLabel(md) { var p = md.split('.'); return (+p[0]) + '/' + (+p[1]); }
  /* 当年は「7/20」、別年は「2025/11/1」＝過去日を指定したことがチップで読めるようにする */
  function isoLabel(s) {
    var y = +s.slice(0, 4);
    return (y === TODAY.getFullYear() ? '' : y + '/') + (+s.slice(5, 7)) + '/' + (+s.slice(8, 10));
  }
  function fchipLabel(k, v) {
    var key = k + ':' + v;
    if (FLABEL[key]) return FLABEL[key];
    if (k === 'tag') return '# ' + v;
    if (k === 'day') return mdLabel(v) + ' 開催';
    if (k === 'range') {
      var r = v.split('_');
      if (r[0] && r[1]) return isoLabel(r[0]) + '〜' + isoLabel(r[1]);
      return isoLabel(r[0]) + '以降';
    }
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
    if (html.length) html.unshift('<span class="p10-fchips__label">指定中の条件</span>');
    box.innerHTML = html.join('');
    box.hidden = !html.length;
    box.querySelectorAll('[data-rm]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var rm = btn.dataset.rm;
        if (rm === 'all') { clearAll(); showView('disc'); return; }
        if (rm === 'preset') { setPreset(null); }
        else if (rm === 'kw') { elKeyword.value = ''; }
        /* 期間指定はチップでなく日付入力なので、外すときは入力欄を空に戻す */
        else if (rm.indexOf('range:') === 0) { clearRangeInputs(); }
        else { document.querySelectorAll('.p10-chip[data-f="' + rm + '"],.p10-day[data-f="' + rm + '"]').forEach(function (c) { c.classList.remove('is-on'); }); }
        runFilter();
      });
    });
  }

  /* ── 結果描画 ──
     Featured に出した2件は下のグリッドから除外して重複させない。ただし**件数（全N件）には含める**
     ＝ヒット件数は検索条件の答えなので、表示方法の都合で減らさない。 */
  function renderResultGrid(list) {
    var seed = featSeed();
    var feat = pickFeatured(list, seed);
    renderFeatured(feat, seed);
    var rest = feat.length ? list.filter(function (x) { return feat.indexOf(x) === -1; }) : list;
    var grid = document.getElementById('p10ResultGrid');
    grid.innerHTML = rest.slice(0, shownCount).map(buildEc).join('');
    var moreBtn = document.getElementById('p10MoreBtn');
    moreBtn.parentElement.style.display = rest.length > shownCount ? '' : 'none';
    renderResultGrid._last = list;
  }

  function runFilter() {
    var filters = activeChipFilters();
    var kw = elKeyword.value.trim();
    var hasAny = activePreset || kw || Object.keys(filters).length;
    if (!hasAny) { renderFchips({}, ''); showView('disc'); syncRail(); return; }

    var list = EX.filter(function (x) { return matches(x, filters, kw); });
    syncRail();

    if (!list.length) {
      document.getElementById('p10ZeroTitle').textContent = kw
        ? '「' + kw + '」に一致する展覧会が見つかりませんでした'
        : '条件に合う展覧会が見つかりませんでした';
      renderFchips(filters, kw);
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
    renderRefeed();
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
    /* 説明文で並び順を約束している特集はその並びで開く（持たない特集は既定の「おすすめ順」） */
    if (elSort) elSort.value = PRESETS[key].sort || 'rec';
    runFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearAll() {
    activePreset = null;
    elKeyword.value = '';
    document.querySelectorAll('.p10-chip.is-on,.p10-day.is-on').forEach(function (c) { c.classList.remove('is-on'); });
    var near = document.querySelector('.p10-adv__near-input');
    if (near) near.value = '';
    clearRangeInputs();
    if (elSort) elSort.value = 'rec';
    syncRail();
  }

  /* 日替わり・月替わりで中身が変わるものの再描画口。デモバーの日送り（setAxisDay）が
     ここに登録された描画関数をまとめて呼ぶ＝日付を動かしたとき Picks レールと
     「エリアから探す」カードが必ず同時に更新される（片方だけ古い日のまま残らない）。 */
  var DAY_HOOKS = [];

  /* ── Picks レール（枠の役割は固定・中身は日替わり／2026-09-07 全面改訂・追174-73）──
     旧実装は rail:1 の特集12個を定義順に並べる完全な静的リストで、次の3つが同時に壊れていた。
       ① クイックボタン行（開催中／今週末／近くで開催／入場無料／LIAISON 2つ）と5個が同じ条件で、
          検索ボックスのすぐ下に同じものが二度出ていた。
       ② 「今週のおすすめ」「今月注目の個展」は静的フィルタなのに時制の語で周期を約束していた。
       ③ 場所・ジャンルの語（福岡／東京・現代美術／書道／版画／写真）は恒久URLを持つ軸ページと
          同じ集合なのに <button>（検索実行）で、内部リンクを1本も渡していなかった。
     作り替えの原則＝**枠の役割は固定し、中身だけ入れ替える**（雑誌の連載枠と同じ）。
     毎日同じ位置に同じ性格のものが載るので、日によって性格が変わるくじ引きにはならない。
     「引き直し」ボタン・ドロー回数のようなランダムの記号は出さない（今日の誌面として置く）。
       枠① 特集（場所）  → 軸ページ  <a>  恒久URL・内部リンク
       枠② 特集（ジャンル）→ 軸ページ  <a>  恒久URL・内部リンク
       枠③ いまの言葉     → P10検索   月替わり（KTN.season＝P90-17 で編集する）
       枠④ 時間で動く棚   → P10検索   日替わり（もうすぐ終了／今日から開催／新着掲載）
       枠⑤ 発見           → P10検索   開くたび（ノーマークの母集団から少数を選ぶ・順位と無関係）
     ①②が「特集へのもう一つの入り口」、③④⑤が discovery の担当。 ── */
  var PICK_MIN = 3;                                              /* 中身がこれ未満の枠は出さない（開いてスカスカだと逆効果） */
  var PICK_TIME = ['ending-all', 'opening-today', 'new-all'];     /* 枠④の候補。空の日があるので実体のあるものだけを回す */

  /* 今月のテーマ（文言は KTN.season＝P90-17 で編集する）を PRESETS へ登録して返す。
     applyPreset は PRESETS を引くので、レールに出す時点で実体を差し込んでおく
     （枠③だけ実体が日付で変わるため）。文言をここに複製しない＝管理画面と同じ配列を見る。 */
  /* 季節の言葉の着地は「軸」で引き先が変わる（2026-09-08 追174-76）。
     8月の「夏休み」はジャンルでは表せず〈お子さまと行ける〉、秋の避暑・行楽は〈エリア〉が近い。
     tag／genre／area／access の4軸は**同時に指定できる**ので、指定された軸ぶんの条件を
     すべて満たすものへ絞る（AND）。1つも指定が無い月は母集団そのものになるので出さない。 */
  function matchArea(x, slug) {
    var A = KTN.axis; if (!A) return false;
    return A.isArea(slug) ? x.tarea === A.fullOf(slug) : A.fullName(x.area) === A.fullOf(slug);
  }
  function seasonFilter(parts) {
    var A = KTN.axis;
    if (!parts.length) return function () { return false; };
    var fs = parts.map(function (p) {
      if (p.kind === 'genre') { var gn = (A && A.genre(p.target) || {}).name || p.target; return function (x) { return x.genre === gn; }; }
      if (p.kind === 'area')  { return function (x) { return matchArea(x, p.target); }; }
      if (p.kind === 'access'){ var f = (A && A.access(p.target) || {}).field; return function (x) { return !!f && !!x[f]; }; }
      return function (x) { return (x.tags || []).indexOf(p.target) !== -1; };
    });
    return function (x) { return notEnded(x) && fs.every(function (f) { return f(x); }); };
  }
  function seasonKey() {
    var S = KTN.season;
    var m = S ? S.month() : TODAY.getMonth();
    var e = (S && S.get(m)) || { label: '', sel: {} };
    var r = (S && S.resolve) ? S.resolve(e) : { parts: [], names: [] };
    var ns = r.names;
    PRESETS['season'] = {
      /* axis はチップのアイコン選択用（場所を含むテーマだけピン・他は札） */
      axis: (e.sel && e.sel.area) ? 'area' : 'tag', label: e.label,
      desc: (ns.length > 1
        ? ns.map(function (n) { return '「' + n + '」'; }).join('') + 'のすべてにあてはまる展覧会から選んだ'
        : '「' + (ns[0] || '') + '」の展覧会から選んだ') + (m + 1) + '月のテーマです。テーマは月ごとに替わります。',
      f: seasonFilter(r.parts)
    };
    return 'season';
  }

  function railSlots() {
    var A = KTN.axis, out = [];
    if (A && A.pickArea) {
      /* skip:1＝ページ下部の「エリアから探す」カード（A.pick(4) の4枚目）と同じ軸を指さないための送り */
      var ar = A.pickArea(1, 1)[0];
      /* alias＝東京のエリアの通称。方角名だけだと初見で場所が浮かばないので添える（県のときは空） */
      if (ar) out.push({ href: A.href(ar), icon: 'area', label: A.fullOf(ar) + 'の展覧会', alias: A.aliasOf(ar) });
      var gs = A.pickGenre(1)[0], g = gs && A.genre(gs);
      if (g) out.push({ href: A.genreHref(gs), icon: 'tag', label: g.name + 'の展覧会' });
    }
    /* 中身が薄い月はテーマを出さない（他の枠と同じ PICK_MIN ガード）＝季節の言葉で誘って
       着地先がスカスカ、という体験を避ける。枠が減るぶんは他の枠がそのまま前に詰まる。 */
    var sk = seasonKey();
    var smin = KTN.season ? KTN.season.minCount() : PICK_MIN;
    if (DISC.filter(PRESETS[sk].f).length >= smin) out.push({ key: sk });
    var live = PICK_TIME.filter(function (k) { return DISC.filter(PRESETS[k].f).length >= PICK_MIN; });
    if (live.length) {
      var d = A && A.dayNo ? A.dayNo() : 0;
      out.push({ key: live[((d % live.length) + live.length) % live.length] });
    }
    if (DISC.filter(PRESETS['quiet'].f).length >= PICK_MIN) out.push({ key: 'quiet' });
    return out;
  }

  (function () {
    var rail = document.getElementById('p10PresetRail');
    function renderRail() {
      rail.innerHTML = railSlots().map(function (s) {
        /* 軸ページ枠だけリンク＝末尾の「 →」はページが変わることの明示（検索実行の枠には付けない） */
        if (s.href) return '<a class="p10-preset" href="' + s.href + '">' + (P10_ICONS[s.icon] || '') + esc(s.label)
          + (s.alias ? '<span class="p10-preset__alias">' + esc(s.alias) + '</span>' : '') + ' →</a>';
        return '<button class="p10-preset" type="button" data-key="' + s.key + '">' + presetInner(s.key) + '</button>';
      }).join('');
      rail.querySelectorAll('.p10-preset[data-key]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (activePreset === b.dataset.key) { clearAll(); showView('disc'); }
          else applyPreset(b.dataset.key);
        });
      });
      syncRail();
      syncArr();
    }
    DAY_HOOKS.push(renderRail);
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
    renderRail();
  })();

  /* ── ディスカバリー棚 ── */
  (function () {
    /* 「近くの展覧会」＝入力ゼロで使える最も摩擦の無いブラウズ起点のため冒頭ヒーロー段へ昇格（2026-08-29）。 */
    var nearby = DISC.filter(PRESETS['near-live'].f).sort(function (a, b) { return parseFloat(a.dist) - parseFloat(b.dist); });
    document.getElementById('p10NearbyGrid').innerHTML = nearby.slice(0, 3).map(toSideEc).map(buildSideEcCard).join('');

    var ending = DISC.filter(PRESETS['ending-all'].f).sort(function (a, b) { return a.rd - b.rd; });
    document.getElementById('p10EndingGrid').innerHTML = ending.slice(0, 3).map(buildEc).join('');

    var liaison = DISC.filter(PRESETS['liaison'].f).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p10LiaisonGrid').innerHTML = liaison.slice(0, 3).map(buildEc).join('');

    function fillFeature(num, key) {
      var p = PRESETS[key];
      document.getElementById('p10Feat' + num + 'Title').innerHTML = esc(p.label) + '<span class="ktn-sec-en">Feature</span>';
      document.getElementById('p10Feat' + num + 'More').dataset.preset = key;
      document.getElementById('p10Feat' + num + 'Grid').innerHTML =
        DISC.filter(p.f).sort(function (a, b) { return b.pop - a.pop; }).slice(0, 3).map(buildEc).join('');
    }
    fillFeature(1, 'tokyo-gendai');
    fillFeature(2, 'weekend');

    /* 「クロスジャンル」＝普段のジャンル（MY_TAGS）と重ならない棚を1本混ぜる。
       選定は「人気」でなく「未接触」＝MY_TAGS外のタグを持つものの中から pop が低い順（デモ：本来はLayer2の
       ウォッチ/興味あり！実データから算出するが、今回はプロトタイプのため固定タグで代替）。
       ランキングと同じ右カラムのセレンディピティ系ツールのため、カードは同じ .p2-side-ec を使う（2026-08-30リファイン）。 */
    var MY_TAGS = ['絵画', '現代美術'];
    function renderCrossGenre() {
      var pool = DISC.filter(function (x) {
        return x.tags.some(function (t) { return MY_TAGS.indexOf(t) === -1; });
      });
      var picks = pool.slice().sort(function (a, b) { return a.pop - b.pop; }).slice(0, 4);
      document.getElementById('p10CrossGrid').innerHTML = picks.map(toSideEc).map(buildSideEcCard).join('');
    }
    renderCrossGenre();

    /* 年間の記録の対象年・データ・行ビルダーは KTN.arc（pages.js トップレベル）に移した。
       P10-4-2（年ごとの独立ページ）と材料を共有するため。ここではランキング下の送りリンクの
       文言・リンク先を既定年に追随させるのに使う。 */

    /* ── ランキング3軸（行きたい／行った／急上昇） ──
       候補は notEnded（開催中・開催予定）のみ。上位3件（右カラムの狭い枠では4件だと縦に伸びて
       下の要素を押し下げるうえ、ランキングとして見せたいのは頂点の顔ぶれなので3件で足りる・2026-09-03）。
       軸は「意志（興味あり！）」「行動（チェックイン）」「変化（前週比）」の3種類で、量の変種を並べない。
       want/visited は経過日数で正規化（＝1日あたりの獲得数）。累計のままだと長く開催しているものが
       常に上位を占めるため。elapsed の下限を7日に置くのは、開幕直後に分母が小さくなって数件の反応で
       値が異常膨張するのを抑えるため。P10は「いまの勢い」＝日割り、P10-4の年間版は「累計」で役割を分ける。
       **低露出枠（pop最小を1件混ぜる）は廃止（2026-09-02）**：ランキングという「測って並べた」体裁の中に
       測定外の1件を混ぜると、明記すれば「1件は下駄を履いている」と読めて全体の信頼を下げ、明記しなければ
       順位の意味が濁る。裾野拡大の役割はクロスジャンル（pop昇順で抽出）・新着掲載の棚・今日の特集（日替わりローテ）が
       すでに担っているため、ランキングから外しても方針は損なわれない。
       右カラムに常設するため、カードはクロスジャンルと同じ .p2-side-ec を使う（2026-08-30リファイン）。 */
    function rankRate(x, field) { return x[field] / Math.max(x.elapsed, 7); }
    function buildRanking(mode) {
      var pool = DISC.slice();
      var sorted;
      if (mode === 'rising') sorted = pool.slice().sort(function (a, b) { return b.growth - a.growth; });
      else if (mode === 'visited') sorted = pool.slice().sort(function (a, b) { return rankRate(b, 'ci') - rankRate(a, 'ci'); });
      else sorted = pool.slice().sort(function (a, b) { return rankRate(b, 'int') - rankRate(a, 'int'); });
      return sorted.slice(0, 3);
    }
    var rankMode = 'want';
    function renderRanking() {
      /* タブのセレクタは [data-rank] で限定する。P10-4の「年間の記録」が同じ .p10-rank-tab を
         [data-arc] で再利用しており、限定しないと両者のタブが互いの状態を潰し合うため。 */
      document.querySelectorAll('.p10-rank-tab[data-rank]').forEach(function (b) {
        b.classList.toggle('is-active', b.dataset.rank === rankMode);
      });
      document.getElementById('p10RankGrid').innerHTML = buildRanking(rankMode).map(toSideEc).map(buildSideEcCard).join('');
      /* 年鑑（P10-4-2）への送りリンク。P10のHTMLにだけ置く（P10-4はハブになったのでこの棚を持たない）。
         「急上昇」は年間側に対応する軸が無い（年間＝累計の意志/行動の2軸）ため、その時だけ隠す。 */
      var more = document.getElementById('p10RankMore');
      if (more) {
        if (rankMode === 'rising') { more.hidden = true; }
        else {
          more.hidden = false;
          /* 年鑑側のタブ（行きたい/行った）まで引き継ぐ＝押した軸のまま着地させる */
          more.href = './kotennavi-p10-4-2.html?y=' + KTN.arc.defaultYear() + '&m=' + rankMode;
          more.textContent = KTN.arc.defaultYear() + '年の' + (rankMode === 'visited' ? '行った' : '行きたい') + 'ランキング →';
        }
      }
    }
    document.querySelectorAll('.p10-rank-tab[data-rank]').forEach(function (b) {
      b.addEventListener('click', function () { rankMode = b.dataset.rank; renderRanking(); });
    });
    renderRanking();

    /* ── 時間軸の棚：今日から開催（会期の初日が今日・並びは pop 降順） ── */
    var openToday = DISC.filter(PRESETS['opening-today'].f).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p10OpenTodayGrid').innerHTML = openToday.slice(0, 3).map(buildEc).join('');

    /* あなたへのおすすめ（ログイン限定・Layer2の協調フィルタ実装までの暫定は pop 降順） */
    var forYou = DISC.filter(PRESETS['for-you'].f).sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p10RecGrid').innerHTML = forYou.slice(0, 3).map(buildEc).join('');

    var news = DISC.filter(function (x) { return x.isNew; }).sort(function (a, b) { return a.nd - b.nd; });
    document.getElementById('p10NewGrid').innerHTML = news.slice(0, 3).map(buildEc).join('');
  })();

  /* ── エリアから探す＝軸ページ（P10-4-1）への入口（追174-49）──
     選定は KTN.axis.pick()。P10-4 索引・P1 と同じ「固定枠＋日付シードのローテーション」を共有し、
     入口ごとに別々の選び方をしない（同じ日にどこから入っても同じ軸が出る＝リンクが安定する）。
     本番（Drupal）では pick() をサーバ側で実行し初期HTMLにリンクを焼く。クライアントの乱数で描くと
     クローラに内部リンクとして拾われず、軸ページで検索資産を積むという目的そのものが消える。 ── */
  (function () {
    var A = KTN.axis, host = document.getElementById('p10AxisCards');
    if (!A || !host) return;
    function renderAxis() {
      host.innerHTML = A.pick(4).map(function (sl) {
        var al = A.aliasOf(sl);
        return '<a class="ktn-axis-card" href="' + A.href(sl) + '">'
          + '<span class="ktn-axis-card__label">' + esc(A.enName(sl)) + '</span>'
          + '<span class="ktn-axis-card__ttl">' + esc(A.fullOf(sl)) + 'の展覧会</span>'
          + (al ? '<span class="ktn-axis-card__alias">' + esc(al) + 'など</span>' : '')
          + '<span class="ktn-axis-card__n"><strong>' + A.count(sl) + '</strong>件が開催中・開催予定</span>'
          + '</a>';
      }).join('');
    }
    DAY_HOOKS.push(renderAxis);
    renderAxis();
  }());

  /* デモバー：日替わり・月替わりの確認（P10-4・P1 と同名・同挙動）。
     Picks レール枠③は月替わりなので、1か月送り（31日）まで用意する。
     setDayShift は日付そのものを動かすため、日替わり枠と月替わり枠が同じ操作で確認できる。 */
  window.setAxisDay = function (shift, btn) {
    if (KTN.axis) KTN.axis.setDayShift(shift);
    DAY_HOOKS.forEach(function (fn) { fn(); });
    /* 結果を開いたまま日を送ったときに、レールだけ新しい日・結果は前の日、という食い違いを作らない */
    if (activePreset) runFilter();
    if (btn && btn.parentNode) {
      btn.parentNode.querySelectorAll('[data-axis-day]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
  };

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
    var trending = DISC.slice().sort(function (a, b) { return b.pop - a.pop; });
    document.getElementById('p10ZeroGrid').innerHTML = trending.slice(0, 4).map(buildEc).join('');
  }

  /* ── 今日の特集（結果末尾の再回遊）──
     検索したが意中のものが無かった人に、人気軸のカードを足しても「同じ土俵の別カード」にしかならない。
     1枚が**別の軸の検索そのもの**になる特集を差し出して、軸の乗り換えを促す（中身が想像できるよう代表サムネ3枚つき）。
     選定は日替わり固定（doyシード）＝「ランダム」「引き直し」は前面に出さず、今日の誌面として置く（2026-09-02）。 */
  var REFEED_N = 3;    /* 出す特集の数 */
  var REFEED_MIN = 3;  /* 中身がこれ未満の特集は出さない（開いてスカスカだと逆効果） */
  function refeedCard(key) {
    var p = PRESETS[key], hits = DISC.filter(p.f);
    var thumbs = hits.slice(0, 3).map(function (x) {
      return '<span class="p10-refeed__thumb" style="background:' + x.bg + '"></span>';
    }).join('');
    return '<button class="p10-refeed__card" type="button" data-refeed="' + key + '">'
      + '<span class="p10-refeed__thumbs">' + thumbs + '</span>'
      + '<span class="p10-refeed__label">' + presetInner(key) + '</span>'
      + '<span class="ktn-count">' + hits.length + '件</span></button>';
  }
  function renderRefeed() {
    var box = document.getElementById('p10RefeedGrid');
    if (!box) return;
    var keys = [];
    for (var k in PRESETS) {
      if (!PRESETS[k].feat || k === activePreset) continue;
      if (DISC.filter(PRESETS[k].f).length < REFEED_MIN) continue;
      keys.push(k);
    }
    keys = KTN.cl.shuffle(keys, KTN.cl.rng(KTN.cl.doy())).slice(0, REFEED_N);
    box.innerHTML = keys.map(function (key) { return refeedCard(key); }).join('');
    box.querySelectorAll('[data-refeed]').forEach(function (b) {
      b.addEventListener('click', function () { applyPreset(b.dataset.refeed); });
    });
  }
  /* ── 検索操作 ── */
  document.getElementById('p10SearchBtn').addEventListener('click', runFilter);
  elKeyword.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') { ev.preventDefault(); runFilter(); }
  });

  /* チップ（data-f あり＝実フィルタ／なし＝視覚デモ） */
  document.querySelectorAll('.p10-chip,.p10-day').forEach(function (c) {
    c.addEventListener('click', function () {
      /* data-toggle は展開パネルを開くボタン（期間を指定する／すべての都道府県）＝フィルタチップではない */
      if (c.dataset.toggle) return;
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
  /* 期間指定は過去日も指定できる（＝終了した展覧会を検索で辿れる）。母数の下限は「開始日必須」で担保する（追174-45） */
  var rangeStart = adv.querySelector('.p10-adv__date');
  if (rangeStart) rangeStart.addEventListener('change', syncRangeEnd);
  syncRangeEnd();
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
    clearRangeInputs();
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
      /* 条件は1つだけ＝既定の「おすすめ順」で Featured クラスタが出るヒット数を確保するため
         （条件を重ねると数件まで絞られ、クラスタが出ない状態しかデモできない・2026-09-01） */
      ['st:live'].forEach(function (f) {
        document.querySelectorAll('.p10-chip[data-f="' + f + '"]').forEach(function (c) { c.classList.add('is-on'); });
      });
      runFilter();
    }
    else if (view === 'zero') { elKeyword.value = '深夜の青騎士'; runFilter(); }
  };

  /* ── ロール反映（guest では「あなたへのおすすめ」棚を非表示） ── */
  function applyRole() {
    var login = (window.curRole || 'guest') !== 'guest';
    var sec = document.getElementById('p10RecSection');
    if (sec) sec.hidden = !login;
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

  /* ── デモデータ（作品） ──
     cx＝その作品が出品されている展覧会の文脈（EX id）。おすすめ順の資格判定と
     クラスタの周辺コンテンツ収集に使う（本番はDBの出品〔listing〕リレーション）。 */
  var WORKS = [
    { id:1,  title:'静寂 I',                  name:'田中透',     creatorUrl:'kotennavi-p3.html', year:'2026', medium:'油彩・キャンバス',   size:'727×606mm',       price:180000, status:'sale',    liaison:'li-plus', tags:['絵画','現代美術'],     area:'東京',   pop:88, interest:48,  queue:2, cx: 1, isNew:0, bg:'linear-gradient(135deg,#5a6b80,#2e3a4a)' },
    { id:2,  title:'墨の余白',                name:'高橋蒼',     creatorUrl:'#',                 year:'2026', medium:'紙本墨画',           size:'半切',            price:96000,  status:'sale',    liaison:'li-plus', tags:['書道'],                area:'東京',   pop:70, interest:71,  queue:0, cx: 2, isNew:0, bg:'linear-gradient(135deg,#2e2a28,#5a5450)' },
    { id:3,  title:'Self / 03',              name:'studio hue', creatorUrl:'#',                 year:'2025', medium:'ジークレー',         size:'A2 ed.5',         price:42000,  status:'sale',    liaison:'li-plus', tags:['写真','現代美術'],     area:'東京',   pop:55, interest:33,  queue:1, cx:11, isNew:1, bg:'linear-gradient(135deg,#b08aa0,#7a4e68)' },
    { id:4,  title:'銅版の庭',                name:'早瀬涼',     creatorUrl:'#',                 year:'2026', medium:'銅版画',             size:'300×400mm ed.10', price:55000,  status:'negot',   liaison:'li-plus', tags:['版画'],                area:'東京',   pop:60, interest:62,  queue:3, cx:10, isNew:0, bg:'linear-gradient(135deg,#5a7a6a,#2e4638)' },
    { id:5,  title:'マチエール断章',          name:'結城玲',     creatorUrl:'#',                 year:'2026', medium:'ミクストメディア',   size:'500×500mm',       price:128000, status:'sale',    liaison:'li-plus', tags:['絵画','現代美術'],     area:'大阪',   pop:77, interest:27,  queue:0, cx: 5, isNew:1, bg:'linear-gradient(135deg,#a05a4a,#6a3428)' },
    { id:6,  title:'筆勢 — 二',               name:'大西澄',     creatorUrl:'#',                 year:'2025', medium:'紙本墨書',           size:'額装',            price:74000,  status:'sold',    liaison:'li-plus', tags:['書道'],                area:'京都',   pop:50, interest:55,  queue:0, cx: 7, isNew:0, bg:'linear-gradient(135deg,#4a4a4a,#1e1e1e)' },
    { id:7,  title:'陶花器 III',              name:'桐生藍',     creatorUrl:'#',                 year:'2026', medium:'陶芸',               size:'H180mm',          price:38000,  status:'sale',    liaison:'li-plus', tags:['陶芸','クラフト'],     area:'愛知',   pop:45, interest:40,  queue:0, cx: 9, isNew:1, bg:'linear-gradient(135deg,#9a8a6a,#5e5238)' },
    { id:8,  title:'光の断面',                name:'篠原恵',     creatorUrl:'#',                 year:'2026', medium:'写真 ed.8',          size:'A1',              price:65000,  status:'sale',    liaison:'li-plus', tags:['写真'],                area:'東京',   pop:82, interest:98,  queue:1, cx: 3, isNew:0, bg:'linear-gradient(135deg,#c0a880,#8a6e4a)' },
    { id:9,  title:'街の輪郭',                name:'岡島みのり', creatorUrl:'#',                 year:'2025', medium:'水彩紙本',           size:'F6',              price:null,   status:'nsale',   liaison:'li',      tags:['絵画'],                area:'神奈川', pop:40, interest:20,  queue:0, cx: 8, isNew:0, bg:'linear-gradient(135deg,#6a9ab0,#3a5e74)' },
    { id:10, title:'硝子の庭',                name:'三好文乃',   creatorUrl:'#',                 year:'2026', medium:'ガラス工芸',         size:'H220mm',          price:88000,  status:'inquiry', liaison:'li-plus', tags:['クラフト'],            area:'福岡',   pop:58, interest:44,  queue:0, cx:12, isNew:1, bg:'linear-gradient(135deg,#7ab0a8,#3e6e66)' },
    { id:11, title:'静物 — 器と光',           name:'高橋蒼',     creatorUrl:'#',                 year:'2026', medium:'油彩・キャンバス',   size:'F20',             price:210000, status:'sale',    liaison:'li-plus', tags:['絵画'],                area:'東京',   pop:72, interest:66,  queue:0, cx: 5, isNew:0, bg:'linear-gradient(135deg,#7a6a8a,#4a3e5a)' },
    { id:12, title:'木版譚',                  name:'早瀬涼',     creatorUrl:'#',                 year:'2025', medium:'木版画 ed.10',       size:'350×450mm',       price:33000,  status:'sale',    liaison:'li-plus', tags:['版画'],                area:'京都',   pop:63, interest:58,  queue:1, cx: 4, isNew:0, bg:'linear-gradient(135deg,#c07040,#7a3e18)' },
    { id:13, title:'セルフポートレイトの練習', name:'studio hue', creatorUrl:'#',                 year:'2025', medium:'ジークレー',         size:'A2 ed.5',         price:null,   status:'nsale',   liaison:'li',      tags:['写真','現代美術'],     area:'東京',   pop:68, interest:90,  queue:0, cx:11, isNew:1, bg:'linear-gradient(135deg,#b08aa0,#7a4e68)' },
    { id:14, title:'陰影の記憶',              name:'田中透',     creatorUrl:'kotennavi-p3.html', year:'2025', medium:'油彩・キャンバス',   size:'F30',             price:152000, status:'sold',    liaison:'li-plus', tags:['絵画'],                area:'東京',   pop:85, interest:120, queue:0, cx: 1, isNew:0, bg:'linear-gradient(135deg,#5a6b80,#2e3a4a)' },
    { id:15, title:'布と刻',                  name:'結城玲',     creatorUrl:'#',                 year:'2026', medium:'染色',               size:'M',               price:47000,  status:'sale',    liaison:'li-plus', tags:['クラフト','現代美術'], area:'大阪',   pop:52, interest:36,  queue:0, cx: 5, isNew:1, bg:'linear-gradient(135deg,#a05a4a,#6a3428)' },
    { id:16, title:'墨韻',                    name:'大西澄',     creatorUrl:'#',                 year:'2026', medium:'書',                 size:'半切',            price:61000,  status:'negot',   liaison:'li-plus', tags:['書道'],                area:'京都',   pop:58, interest:41,  queue:2, cx: 7, isNew:0, bg:'linear-gradient(135deg,#4a4a4a,#1e1e1e)' },
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
  /* sort＝その特集を開いたときの既定の並び順。説明文で並び順を約束している特集だけに持たせる
     （既定の「おすすめ順」のままだと説明文と実際の並びが食い違うため・2026-09-01） */
  var PRESETS = {
    'sale-now':      { rail: 1, axis: 'price', label: '今すぐ購入できる',   desc: '「販売中 × LIAISON+」条件から自動生成した特集です。会場に行けなくても購入できます。', f: function (x) { return x.status === 'sale' && x.liaison === 'li-plus'; } },
    'new-arrival':   { rail: 1, axis: 'date',  label: '新着作品',          desc: '「新着掲載」条件から自動生成した特集です。', sort: 'new', f: function (x) { return !!x.isNew; } },
    'under-50k':     { rail: 1, axis: 'price', label: '5万円以下で探す',   desc: '「価格帯 〜5万円」条件から自動生成した特集です。', sort: 'price-asc', f: function (x) { return priceBand(x.price) === '~5'; } },
    'tokyo-works':   { rail: 1, axis: 'area',  label: '東京の作品',        desc: '「東京」エリアの掲載作品から自動生成した特集です。', f: function (x) { return x.area === '東京'; } },
    'popular':       { rail: 1, axis: 'pop',   label: '人気の作品',        desc: '「興味あり！」シグナル上位から自動生成した特集です。', sort: 'pop', f: function (x) { return x.pop >= 70; } },
    'genre-paint':   { rail: 1, axis: 'tag',   label: '絵画作品を探す',    desc: '「絵画」ジャンルの掲載作品から自動生成した特集です。', f: function (x) { return x.tags.indexOf('絵画') !== -1; } },
    'negot-all':     { rail: 0, axis: 'price', label: '商談受付中の作品',  desc: '出品者と条件を相談できる「商談中」の作品です。', f: function (x) { return x.status === 'negot'; } },
    'new-all':       { rail: 0, axis: 'date',  label: '新着作品',          desc: '最近個展なびに掲載された作品です。', sort: 'new', f: function (x) { return !!x.isNew; } },
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

  /* ── おすすめ順（既定）と Featured クラスタ ──────────────────────────────
     設計はP10（展覧会検索）と同じ＝**並び順そのものを出品側への誘因にする**（2026-09-01）。
     核が作品なので、資格＝**まわりに展覧会・記事・レビューがそろっていること**
     （＝ただ作品を1点上げただけでは上に来ない／量では順位を付けない）。 */
  function qualifies(x) { return KTN.cl.qualifies('artwork', x.cx, x.title); }
  function sortResults(list) {
    var mode = elSort ? elSort.value : 'rec';
    var out = list.slice();
    if (mode === 'price-asc')       out.sort(function (a, b) { return (a.price || 0) - (b.price || 0); });
    else if (mode === 'price-desc') out.sort(function (a, b) { return (b.price || 0) - (a.price || 0); });
    else if (mode === 'new')        out.sort(function (a, b) { return b.isNew - a.isNew; });
    else if (mode === 'pop')        out.sort(function (a, b) { return b.pop - a.pop; });
    else                            out.sort(function (a, b) { return (qualifies(b) - qualifies(a)) || (b.pop - a.pop); });
    return out;
  }

  var FEAT_N = 2;         /* クラスタで大きく出す件数 */
  var FEAT_MIN_HITS = 6;  /* 結果がこれ未満なら出さない（全部が「注目」では選んだことにならない） */
  var FEAT_MIN_QUAL = 3;  /* 資格者がこれ未満でも同じ理由で出さない */
  /* シード＝その日 × 検索条件。条件が違えば別の紙面、同じ条件なら1日中同じ紙面 */
  function featSeed() {
    var key = (activePreset || '') + '|' + (elKeyword ? elKeyword.value.trim() : '')
      + '|' + JSON.stringify(activeChipFilters()) + '|' + (elSort ? elSort.value : '');
    return (KTN.cl.strSeed(key) ^ Math.imul(KTN.cl.doy(), 0x9E3779B1)) | 0;
  }
  function pickFeatured(list, seed) {
    if (!elSort || elSort.value !== 'rec') return [];
    if (list.length < FEAT_MIN_HITS) return [];
    var q = list.filter(qualifies);
    if (q.length < FEAT_MIN_QUAL) return [];
    return KTN.cl.shuffle(q.slice(), KTN.cl.rng(seed)).slice(0, FEAT_N);
  }
  /* 作品カードの本文（作家・素材・寸法）はクラスタの meta に、周辺の総量は counts に出す */
  function featMeta(x) {
    return x.name + '｜' + x.medium + '・' + x.size + '｜' + x.year;
  }
  function featCounts(x) {
    var t = KTN.cl.satTypes(x.cx, { skipTtl: x.title });
    var parts = [];
    if (t.article) parts.push('記事<strong>' + t.article + '</strong>本');
    if (t.review)  parts.push('レビュー<strong>' + t.review + '</strong>件');
    parts.push('興味あり！<strong>' + x.interest + '</strong>');
    return KTN.cl.countsHtml(parts);
  }
  function renderFeatured(items, seed) {
    var wrap = document.getElementById('p10Feat');
    var row = document.getElementById('p10FeatRow');
    if (!wrap || !row) return;
    if (!items.length) { wrap.hidden = true; row.innerHTML = ''; return; }
    var rnd = KTN.cl.rng(seed + 7);
    row.innerHTML = items.map(function (x) {
      /* 販売状態バッジ（.aws-*）はカードと同じ語彙をクラスタでも見せる */
      return KTN.cl.workCluster(x, {
        badges: awsBadge(x),
        meta: featMeta(x),
        counts: featCounts(x),
        sats: KTN.cl.pick('artwork', x.cx, x.title, 3, rnd)
      });
    }).join('');
    wrap.hidden = false;
  }
  var AWS = { sale: ['sale', '販売中'], negot: ['negot', '商談中'], sold: ['sold', '売約済'], inquiry: ['inquiry', '要問合せ'], nsale: ['nsale', '非売品'] };
  function awsBadge(x) {
    var a = AWS[x.status];
    return a ? '<span class="aws aws-' + a[0] + '">' + a[1] + '</span>' : '';
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
    if (html.length) html.unshift('<span class="p10-fchips__label">指定中の条件</span>');
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

  /* Featured に出した2件は下のグリッドから除外して重複させない。ただし**件数（全N件）には含める**
     ＝ヒット件数は検索条件の答えなので、表示方法の都合で減らさない。 */
  function renderResultGrid(list) {
    var seed = featSeed();
    var feat = pickFeatured(list, seed);
    renderFeatured(feat, seed);
    var rest = feat.length ? list.filter(function (x) { return feat.indexOf(x) === -1; }) : list;
    var grid = document.getElementById('p101ResultGrid');
    grid.innerHTML = rest.slice(0, shownCount).map(buildWorkCard).join('');
    var moreBtn = document.getElementById('p101MoreBtn');
    moreBtn.parentElement.style.display = rest.length > shownCount ? '' : 'none';
    renderResultGrid._last = list;
  }

  function runFilter() {
    var filters = activeChipFilters();
    var kw = elKeyword.value.trim();
    var hasAny = activePreset || kw || Object.keys(filters).length;
    if (!hasAny) { renderFchips({}, ''); showView('disc'); syncRail(); return; }

    var list = WORKS.filter(function (x) { return matches(x, filters, kw); });
    syncRail();

    if (!list.length) {
      document.getElementById('p101ZeroTitle').textContent = kw
        ? '「' + kw + '」に一致する作品が見つかりませんでした'
        : '条件に合う作品が見つかりませんでした';
      renderFchips(filters, kw);
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
    renderRefeed();
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
    /* 説明文で並び順を約束している特集はその並びで開く（持たない特集は既定の「おすすめ順」） */
    if (elSort) elSort.value = PRESETS[key].sort || 'rec';
    runFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearAll() {
    activePreset = null;
    elKeyword.value = '';
    document.querySelectorAll('.p10-chip.is-on').forEach(function (c) { c.classList.remove('is-on'); });
    if (elSort) elSort.value = 'rec';
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

  /* ── 今日の特集（結果末尾の再回遊）──
     検索したが意中のものが無かった人に、人気軸のカードを足しても「同じ土俵の別カード」にしかならない。
     1枚が**別の軸の検索そのもの**になる特集を差し出して、軸の乗り換えを促す（中身が想像できるよう代表サムネ3枚つき）。
     選定は日替わり固定（doyシード）＝「ランダム」「引き直し」は前面に出さず、今日の誌面として置く（2026-09-02）。 */
  var REFEED_N = 3;    /* 出す特集の数 */
  var REFEED_MIN = 3;  /* 中身がこれ未満の特集は出さない（開いてスカスカだと逆効果） */
  function refeedCard(key) {
    var p = PRESETS[key], hits = WORKS.filter(p.f);
    var thumbs = hits.slice(0, 3).map(function (x) {
      return '<span class="p10-refeed__thumb" style="background:' + x.bg + '"></span>';
    }).join('');
    return '<button class="p10-refeed__card" type="button" data-refeed="' + key + '">'
      + '<span class="p10-refeed__thumbs">' + thumbs + '</span>'
      + '<span class="p10-refeed__label">' + presetInner(key) + '</span>'
      + '<span class="ktn-count">' + hits.length + '件</span></button>';
  }
  function renderRefeed() {
    var box = document.getElementById('p101RefeedGrid');
    if (!box) return;
    var keys = [];
    for (var k in PRESETS) {
      if (!PRESETS[k].rail || k === activePreset) continue;
      if (WORKS.filter(PRESETS[k].f).length < REFEED_MIN) continue;
      keys.push(k);
    }
    keys = KTN.cl.shuffle(keys, KTN.cl.rng(KTN.cl.doy())).slice(0, REFEED_N);
    box.innerHTML = keys.map(function (key) { return refeedCard(key); }).join('');
    box.querySelectorAll('[data-refeed]').forEach(function (b) {
      b.addEventListener('click', function () { applyPreset(b.dataset.refeed); });
    });
  }
  document.getElementById('p101SearchBtn').addEventListener('click', runFilter);
  elKeyword.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') { ev.preventDefault(); runFilter(); }
  });

  document.querySelectorAll('.p10-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      /* data-toggle は展開パネルを開くボタン（期間を指定する／すべての都道府県）＝フィルタチップではない */
      if (c.dataset.toggle) return;
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

  /* ── デモバー：表示状態切替（ロール切替は認証ウォール確認用に共通 setR を使う） ── */
  window.setP101View = function (view, btn) {
    document.querySelectorAll('[data-p101-view]').forEach(function (b) { b.classList.remove('on'); });
    if (btn && btn.hasAttribute('data-p101-view')) btn.classList.add('on');
    clearAll();
    if (view === 'disc') { showView('disc'); }
    else if (view === 'preset') { applyPreset('tokyo-works'); }
    else if (view === 'result') {
      /* 条件は1つだけ＝既定の「おすすめ順」で Featured クラスタが出るヒット数を確保するため */
      ['st:sale'].forEach(function (f) {
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

  /* ── デモデータ（クリエイター）。avStyle は p10-1/p1 の同名人物と同一グラデーションで統一 ──
     `status` は `cx`（その人が属する展覧会）の開催状況に合わせる。高橋蒼（cx2＝墨聲／会期終了間近）と
     早瀬涼（cx10＝銅版のミクロコスモス＝本人の個展）は展覧会が開催中なのに `''`（開催なし）になっていたため是正。
     残る4人（結城玲・大西澄・森田一葉ほか）は「現在開催なし」の見え方を残すため意図的に据え置き。 */
  var CREATORS = [
    { id: 1,  name: '田中透',       href: 'kotennavi-p3.html', genreTags: ['絵画', '現代美術'],   genre: '絵画・現代美術',   area: '東京',   status: 'live',     exh: 3, watch: 214, pop: 88, cx:  1, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', ini: '田' },
    { id: 2,  name: '高橋蒼',       href: '#',                 genreTags: ['書道'],                genre: '書道',              area: '東京',   status: 'live',     exh: 2, watch: 71,  pop: 70, cx:  2, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#2e2a28,#5a5450)', ini: '高' },
    { id: 3,  name: 'studio hue',  href: '#',                 genreTags: ['写真', '現代美術'],   genre: '写真・現代美術',   area: '東京',   status: 'upcoming', exh: 2, watch: 143, pop: 79, cx: 11, isNew: 1, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#b08aa0,#7a4e68)', ini: 'S' },
    { id: 4,  name: '早瀬涼',       href: '#',                 genreTags: ['版画'],                genre: '版画',              area: '京都',   status: 'live',     exh: 2, watch: 112, pop: 67, cx: 10, isNew: 0, liaison: 'li',      avStyle: 'linear-gradient(135deg,#5a7a6a,#2e4638)', ini: '早' },
    { id: 5,  name: '結城玲',       href: '#',                 genreTags: ['絵画', 'クラフト'],   genre: '絵画・クラフト',   area: '大阪',   status: '',         exh: 1, watch: 36,  pop: 52, cx:  5, isNew: 1, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#a05a4a,#6a3428)', ini: '結' },
    { id: 6,  name: '大西澄',       href: '#',                 genreTags: ['書道'],                genre: '書道',              area: '京都',   status: '',         exh: 1, watch: 41,  pop: 58, cx:  7, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#4a4a4a,#1e1e1e)', ini: '大' },
    { id: 7,  name: '桐生藍',       href: '#',                 genreTags: ['陶芸', 'クラフト'],   genre: '陶芸・クラフト',   area: '愛知',   status: 'live',     exh: 1, watch: 40,  pop: 45, cx:  9, isNew: 1, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#9a8a6a,#5e5238)', ini: '桐' },
    { id: 8,  name: '篠原恵',       href: '#',                 genreTags: ['写真'],                genre: '写真',              area: '東京',   status: 'live',     exh: 1, watch: 98,  pop: 82, cx:  3, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#c0a880,#8a6e4a)', ini: '篠' },
    { id: 9,  name: '岡島みのり',   href: '#',                 genreTags: ['絵画'],                genre: '絵画',              area: '神奈川', status: 'live',     exh: 1, watch: 87,  pop: 58, cx:  8, isNew: 0, liaison: 'li',      avStyle: 'linear-gradient(135deg,#6a9ab0,#3a5e74)', ini: '岡' },
    { id: 10, name: '三好文乃',     href: '#',                 genreTags: ['クラフト'],            genre: 'クラフト',          area: '福岡',   status: 'live',     exh: 1, watch: 91,  pop: 66, cx: 12, isNew: 0, liaison: 'li-plus', avStyle: 'linear-gradient(135deg,#7ab0a8,#3e6e66)', ini: '三' },
    { id: 11, name: '山根拓',       href: '#',                 genreTags: ['写真'],                genre: '写真',              area: '福岡',   status: 'upcoming', exh: 1, watch: 74,  pop: 62, cx:  6, isNew: 1, liaison: '',         avStyle: 'linear-gradient(135deg,#3a5a7a,#1e3448)', ini: '山' },
    { id: 12, name: '森田一葉',     href: '#',                 genreTags: ['陶芸'],                genre: '陶芸',              area: '京都',   status: '',         exh: 1, watch: 28,  pop: 38, cx: 14, isNew: 0, liaison: '',         avStyle: 'linear-gradient(135deg,#8a8a70,#4e4e38)', ini: '森' },
  ];

  /* ── 特集プリセット（アルゴリズム生成の保存済み検索） ── */
  var P10_ICONS = {
    area: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 6.5c0 3.2-5 7.5-5 7.5S3 9.7 3 6.5a5 5 0 0 1 10 0z"/><circle cx="8" cy="6.5" r="1.8"/></svg>',
    date: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="3.5" width="11" height="10" rx="1"/><path d="M2.5 6.8h11M5.5 2v2.5M10.5 2v2.5"/></svg>',
    pop:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M8 2.4l1.7 3.5 3.9.6-2.8 2.7.7 3.9L8 11.2l-3.5 1.9.7-3.9-2.8-2.7 3.9-.6L8 2.4z"/></svg>',
    tag:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M2.5 8V3.5a1 1 0 0 1 1-1H8a1 1 0 0 1 .7.3l4.8 4.8a1 1 0 0 1 0 1.4l-4.5 4.5a1 1 0 0 1-1.4 0L2.8 8.7a1 1 0 0 1-.3-.7z"/><circle cx="5.6" cy="5.6" r="1"/></svg>',
  };
  /* sort＝その特集を開いたときの既定の並び順。説明文で並び順を約束している特集だけに持たせる
     （持たない特集は 'rec'＝おすすめ順のまま＝Featured クラスタが出る） */
  var PRESETS = {
    'exh-live':      { rail: 1, axis: 'date', label: '開催中の展覧会があるクリエイター', desc: '「開催中」条件から自動生成した特集です。いま会場・LIAISONで作品を見られます。', f: function (x) { return x.status === 'live'; } },
    'new-arrival':   { rail: 1, axis: 'date', label: '新着クリエイター',                 desc: '「新着掲載」条件から自動生成した特集です。', sort: 'new', f: function (x) { return !!x.isNew; } },
    'liaison-plus':  { rail: 1, axis: 'tag',  label: 'LIAISON+作品があるクリエイター',   desc: '「LIAISON+」条件から自動生成した特集です。会場に行けなくても作品を購入できます。', f: function (x) { return x.liaison === 'li-plus'; } },
    'tokyo-creators':{ rail: 1, axis: 'area', label: '東京のクリエイター',               desc: '「東京」エリアで活動するクリエイターから自動生成した特集です。', f: function (x) { return x.area === '東京'; } },
    'popular':       { rail: 1, axis: 'pop',  label: '人気のクリエイター',               desc: '「興味あり！」シグナル上位から自動生成した特集です。', sort: 'pop', f: function (x) { return x.pop >= 70; } },
    'genre-paint':   { rail: 1, axis: 'tag',  label: '絵画のクリエイター',               desc: '「絵画」ジャンルのクリエイターから自動生成した特集です。', f: function (x) { return x.genreTags.indexOf('絵画') !== -1; } },
    'upcoming-all':  { rail: 0, axis: 'date', label: '開催予定の展覧会があるクリエイター', desc: 'まもなく展覧会が始まるクリエイターです。', f: function (x) { return x.status === 'upcoming'; } },
    'new-all':       { rail: 0, axis: 'date', label: '新着クリエイター',                 desc: '最近個展なびに掲載されたクリエイターです。', sort: 'new', f: function (x) { return !!x.isNew; } },
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

  /* ── おすすめ順（既定）と Featured クラスタ ──
     設計はP10（展覧会検索）と同じ＝**並び順そのものを出品側への誘因にする**（2026-09-01）。
     核がクリエイターなので、資格＝**まわりに作品・記事・レビューがそろっていること**
     （量では順位を付けない＝記事量産・大手の居座りを避ける）。 */
  function qualifies(x) { return KTN.cl.qualifies('creator', x.cx, x.name); }

  function sortResults(list) {
    var mode = elSort ? elSort.value : 'rec';
    var out = list.slice();
    if (mode === 'new')      out.sort(function (a, b) { return b.isNew - a.isNew; });
    else if (mode === 'exh') out.sort(function (a, b) { return b.exh - a.exh; });
    else if (mode === 'pop') out.sort(function (a, b) { return b.pop - a.pop; });
    else                     out.sort(function (a, b) { return (qualifies(b) - qualifies(a)) || (b.pop - a.pop); });
    return out;
  }

  var FEAT_N = 2, FEAT_MIN_HITS = 6, FEAT_MIN_QUAL = 3;
  /* シード＝日付＋検索条件。同じ日に同じ条件なら同じ2件（リロードで入れ替わらない）、
     日が変わる／条件が変わると別の2件になる＝特定アカウントの居座りを防ぐ */
  function featSeed() {
    var key = (activePreset || '') + '|' + (elKeyword ? elKeyword.value.trim() : '')
      + '|' + JSON.stringify(activeChipFilters()) + '|' + (elSort ? elSort.value : '');
    return (KTN.cl.strSeed(key) ^ Math.imul(KTN.cl.doy(), 0x9E3779B1)) | 0;
  }
  function pickFeatured(list, seed) {
    if (!elSort || elSort.value !== 'rec') return [];   /* 並び順の約束を壊さない */
    if (list.length < FEAT_MIN_HITS) return [];
    var q = list.filter(qualifies);
    if (q.length < FEAT_MIN_QUAL) return [];
    return KTN.cl.shuffle(q.slice(), KTN.cl.rng(seed)).slice(0, FEAT_N);
  }
  function featMeta(x) { return x.genre + '｜' + x.area; }
  function featCounts(x) {
    /* 出す数字は資格そのもの（作品・記事・レビューがそろっているか）＝
       「何をすれば上に出るか」が数字を見れば分かるようにする。
       作品はデモ用の概算（周辺プールは各文脈1点の代表サンプルしか持たないため）。 */
    var t = KTN.cl.satTypes(x.cx, { skipTtl: x.name });
    var parts = ['作品<strong>' + Math.max(4, Math.round(x.pop / 5)) + '</strong>点'];
    if (t.article) parts.push('記事<strong>' + t.article + '</strong>本');
    if (t.review)  parts.push('レビュー<strong>' + t.review + '</strong>件');
    return KTN.cl.countsHtml(parts);
  }
  function featSb(x) {
    if (x.status === 'live')     return '<span class="sb sb-live"><span class="pulse"></span>開催中</span>';
    if (x.status === 'upcoming') return '<span class="sb sb-soon">開催予定</span>';
    return '';
  }
  function renderFeatured(items, seed) {
    var wrap = document.getElementById('p10Feat');
    var row  = document.getElementById('p10FeatRow');
    if (!wrap || !row) return;
    if (!items.length) { wrap.hidden = true; row.innerHTML = ''; return; }
    var rnd = KTN.cl.rng(seed + 7);
    row.innerHTML = items.map(function (x) {
      return KTN.cl.personCluster('creator', x, {
        href: x.href,
        badges: featSb(x),
        meta: featMeta(x),
        counts: featCounts(x),
        sats: KTN.cl.pick('creator', x.cx, x.name, 3, rnd)
      });
    }).join('');
    wrap.hidden = false;
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
    if (html.length) html.unshift('<span class="p10-fchips__label">指定中の条件</span>');
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

  /* Featured に出した2件は下のグリッドから除外して重複させない。ただし**件数（全N件）には含める**
     ＝ヒット件数は検索条件の答えなので、表示方法の都合で減らさない。 */
  function renderResultGrid(list) {
    var seed = featSeed();
    var feat = pickFeatured(list, seed);
    renderFeatured(feat, seed);
    var rest = feat.length ? list.filter(function (x) { return feat.indexOf(x) === -1; }) : list;
    var grid = document.getElementById('p102ResultGrid');
    grid.innerHTML = rest.slice(0, shownCount).map(buildCreatorCard).join('');
    var moreBtn = document.getElementById('p102MoreBtn');
    moreBtn.parentElement.style.display = rest.length > shownCount ? '' : 'none';
    renderResultGrid._last = list;
  }

  function runFilter() {
    var filters = activeChipFilters();
    var kw = elKeyword.value.trim();
    var hasAny = activePreset || kw || Object.keys(filters).length;
    if (!hasAny) { renderFchips({}, ''); showView('disc'); syncRail(); return; }

    var list = CREATORS.filter(function (x) { return matches(x, filters, kw); });
    syncRail();

    if (!list.length) {
      document.getElementById('p102ZeroTitle').textContent = kw
        ? '「' + kw + '」に一致するクリエイターが見つかりませんでした'
        : '条件に合うクリエイターが見つかりませんでした';
      renderFchips(filters, kw);
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
    renderRefeed();
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
    if (elSort) elSort.value = PRESETS[key].sort || 'rec';
    runFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearAll() {
    activePreset = null;
    elKeyword.value = '';
    if (elSort) elSort.value = 'rec';
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

  /* ── 今日の特集（結果末尾の再回遊）──
     検索したが意中のものが無かった人に、人気軸のカードを足しても「同じ土俵の別カード」にしかならない。
     1枚が**別の軸の検索そのもの**になる特集を差し出して、軸の乗り換えを促す（中身が想像できるよう代表サムネ3枚つき）。
     選定は日替わり固定（doyシード）＝「ランダム」「引き直し」は前面に出さず、今日の誌面として置く（2026-09-02）。 */
  var REFEED_N = 3;    /* 出す特集の数 */
  var REFEED_MIN = 3;  /* 中身がこれ未満の特集は出さない（開いてスカスカだと逆効果） */
  function refeedCard(key) {
    var p = PRESETS[key], hits = CREATORS.filter(p.f);
    var thumbs = hits.slice(0, 3).map(function (x) {
      return '<span class="p10-refeed__thumb p10-refeed__thumb--creator" style="background:' + x.avStyle + '">' + esc(x.ini) + '</span>';
    }).join('');
    return '<button class="p10-refeed__card" type="button" data-refeed="' + key + '">'
      + '<span class="p10-refeed__thumbs">' + thumbs + '</span>'
      + '<span class="p10-refeed__label">' + presetInner(key) + '</span>'
      + '<span class="ktn-count">' + hits.length + '件</span></button>';
  }
  function renderRefeed() {
    var box = document.getElementById('p102RefeedGrid');
    if (!box) return;
    var keys = [];
    for (var k in PRESETS) {
      if (!PRESETS[k].rail || k === activePreset) continue;
      if (CREATORS.filter(PRESETS[k].f).length < REFEED_MIN) continue;
      keys.push(k);
    }
    keys = KTN.cl.shuffle(keys, KTN.cl.rng(KTN.cl.doy())).slice(0, REFEED_N);
    box.innerHTML = keys.map(function (key) { return refeedCard(key); }).join('');
    box.querySelectorAll('[data-refeed]').forEach(function (b) {
      b.addEventListener('click', function () { applyPreset(b.dataset.refeed); });
    });
  }
  document.getElementById('p102SearchBtn').addEventListener('click', runFilter);
  elKeyword.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') { ev.preventDefault(); runFilter(); }
  });

  document.querySelectorAll('.p10-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      /* data-toggle は展開パネルを開くボタン（期間を指定する／すべての都道府県）＝フィルタチップではない */
      if (c.dataset.toggle) return;
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

  /* ── デモバー：表示状態切替（ロール切替は認証ウォール確認用に共通 setR を使う） ── */
  window.setP102View = function (view, btn) {
    document.querySelectorAll('[data-p102-view]').forEach(function (b) { b.classList.remove('on'); });
    if (btn && btn.hasAttribute('data-p102-view')) btn.classList.add('on');
    clearAll();
    if (view === 'disc') { showView('disc'); }
    else if (view === 'preset') { applyPreset('tokyo-creators'); }
    else if (view === 'result') {
      /* 条件は1つだけ＝既定の「おすすめ順」で Featured クラスタが出るヒット数を確保するため
         （条件を重ねると数件まで絞られ、クラスタが出ない状態しかデモできない・2026-09-01） */
      ['liaison:li'].forEach(function (f) {
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
    { id: 1,  name: '白日ギャラリー',       href: 'kotennavi-p4.html', genreTags: ['絵画', '現代美術'], area: '東京',   location: '渋谷区',   hours: '11:00–19:00', status: 'live',     exh: 4, watch: 180, pop: 85, cx:  1, isNew: 0, liaison: 'li',      dist: '1.2km', avStyle: 'linear-gradient(135deg,#5a6b80,#2e3a4a)', ini: '白' },
    { id: 2,  name: '東京書芸館',           href: '#',                 genreTags: ['書道'],              area: '東京',   location: '千代田区', hours: '10:00–18:00', status: 'live',     exh: 2, watch: 220, pop: 90, cx:  2, isNew: 0, liaison: 'li-plus', dist: '2.6km', avStyle: 'linear-gradient(135deg,#2e2a28,#5a5450)', ini: '東' },
    { id: 3,  name: 'ギャラリー日向',       href: '#',                 genreTags: ['写真'],              area: '東京',   location: '目黒区',   hours: '12:00–19:00', status: 'live',     exh: 2, watch: 75,  pop: 66, cx:  3, isNew: 1, liaison: '',         dist: '3.4km', avStyle: 'linear-gradient(135deg,#c0a880,#8a6e4a)', ini: '日' },
    { id: 4,  name: '京都版画舎',           href: '#',                 genreTags: ['版画'],              area: '京都',   location: '左京区',   hours: '10:00–17:00', status: 'live',     exh: 3, watch: 98,  pop: 70, cx:  4, isNew: 0, liaison: '',         dist: null,    avStyle: 'linear-gradient(135deg,#7a6a8a,#4a3e5a)', ini: '京' },
    { id: 5,  name: 'gallery TRACE',       href: '#',                 genreTags: ['絵画', '現代美術'], area: '東京',   location: '台東区',   hours: '11:00–20:00', status: 'live',     exh: 2, watch: 130, pop: 78, cx:  5, isNew: 0, liaison: 'li',      dist: '4.8km', avStyle: 'linear-gradient(135deg,#a05a4a,#6a3428)', ini: 'T' },
    { id: 6,  name: 'フォトスペース博多',   href: '#',                 genreTags: ['写真'],              area: '福岡',   location: '博多区',   hours: '11:00–18:00', status: 'upcoming', exh: 1, watch: 40,  pop: 55, cx:  6, isNew: 1, liaison: '',         dist: null,    avStyle: 'linear-gradient(135deg,#3a5a7a,#1e3448)', ini: '博' },
    { id: 7,  name: '大阪墨美堂',           href: '#',                 genreTags: ['書道'],              area: '大阪',   location: '中央区',   hours: '10:00–18:00', status: 'live',     exh: 2, watch: 50,  pop: 52, cx:  7, isNew: 0, liaison: '',         dist: null,    avStyle: 'linear-gradient(135deg,#4a4a4a,#1e1e1e)', ini: '大' },
    { id: 8,  name: '横浜アートポート',     href: '#',                 genreTags: ['絵画'],              area: '神奈川', location: '西区',     hours: '11:00–19:00', status: 'live',     exh: 1, watch: 64,  pop: 56, cx:  8, isNew: 0, liaison: '',         dist: '9.1km', avStyle: 'linear-gradient(135deg,#6a9ab0,#3a5e74)', ini: '横' },
    { id: 9,  name: '瀬戸クラフト館',       href: '#',                 genreTags: ['陶芸', 'クラフト'], area: '愛知',   location: '瀬戸市',   hours: '10:00–17:00', status: 'live',     exh: 1, watch: 35,  pop: 47, cx:  9, isNew: 0, liaison: '',         dist: null,    avStyle: 'linear-gradient(135deg,#9a8a6a,#5e5238)', ini: '瀬' },
    { id: 10, name: 'ギャラリー刻',         href: '#',                 genreTags: ['版画'],              area: '東京',   location: '文京区',   hours: '12:00–19:00', status: 'live',     exh: 2, watch: 88,  pop: 64, cx: 10, isNew: 1, liaison: 'li',      dist: '5.7km', avStyle: 'linear-gradient(135deg,#5a7a6a,#2e4638)', ini: '刻' },
    { id: 11, name: 'YUGEN Gallery',       href: '#',                 genreTags: ['現代美術'],          area: '東京',   location: '中央区',   hours: '11:00–19:00', status: '',         exh: 1, watch: 22,  pop: 33, cx: 11, isNew: 0, liaison: '',         dist: '3.9km', avStyle: 'linear-gradient(135deg,#4a5a6a,#26323e)', ini: 'Y' },
    { id: 12, name: 'Gallery SOIL 渋谷',   href: '#',                 genreTags: ['クラフト', '現代美術'], area: '東京', location: '渋谷区',   hours: '11:00–20:00', status: '',         exh: 2, watch: 45,  pop: 48, cx:  0, isNew: 1, liaison: 'li-plus', dist: '1.8km', avStyle: 'linear-gradient(135deg,#7a9a8a,#3e5a4a)', ini: 'S' },
  ];

  /* ── 特集プリセット（アルゴリズム生成の保存済み検索） ── */
  var P10_ICONS = {
    area: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 6.5c0 3.2-5 7.5-5 7.5S3 9.7 3 6.5a5 5 0 0 1 10 0z"/><circle cx="8" cy="6.5" r="1.8"/></svg>',
    date: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="3.5" width="11" height="10" rx="1"/><path d="M2.5 6.8h11M5.5 2v2.5M10.5 2v2.5"/></svg>',
    pop:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M8 2.4l1.7 3.5 3.9.6-2.8 2.7.7 3.9L8 11.2l-3.5 1.9.7-3.9-2.8-2.7 3.9-.6L8 2.4z"/></svg>',
    tag:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M2.5 8V3.5a1 1 0 0 1 1-1H8a1 1 0 0 1 .7.3l4.8 4.8a1 1 0 0 1 0 1.4l-4.5 4.5a1 1 0 0 1-1.4 0L2.8 8.7a1 1 0 0 1-.3-.7z"/><circle cx="5.6" cy="5.6" r="1"/></svg>',
  };
  /* sort＝その特集を開いたときの既定の並び順。説明文で並び順を約束している特集だけに持たせる
     （持たない特集は 'rec'＝おすすめ順のまま＝Featured クラスタが出る） */
  var PRESETS = {
    'exh-live':        { rail: 1, axis: 'date', label: '開催中の展覧会があるギャラリー', desc: '「開催中」条件から自動生成した特集です。いま会場・LIAISONで作品を見られます。', f: function (x) { return x.status === 'live'; } },
    'near':            { rail: 1, axis: 'area', label: '近くのギャラリー',               desc: '「現在地から近い順」の条件から自動生成した特集です。', f: function (x) { return !!x.dist; } },
    'new-arrival':     { rail: 1, axis: 'date', label: '新着ギャラリー',                 desc: '「新着掲載」条件から自動生成した特集です。', sort: 'new', f: function (x) { return !!x.isNew; } },
    'liaison-plus':    { rail: 1, axis: 'tag',  label: 'LIAISON+作品があるギャラリー',   desc: '「LIAISON+」条件から自動生成した特集です。会場に行けなくても作品を購入できます。', f: function (x) { return x.liaison === 'li-plus'; } },
    'tokyo-galleries': { rail: 1, axis: 'area', label: '東京のギャラリー',               desc: '「東京」エリアで活動するギャラリーから自動生成した特集です。', f: function (x) { return x.area === '東京'; } },
    'popular':         { rail: 1, axis: 'pop',  label: '人気のギャラリー',               desc: '「興味あり！」シグナル上位から自動生成した特集です。', sort: 'pop', f: function (x) { return x.pop >= 70; } },
    'genre-paint':     { rail: 1, axis: 'tag',  label: '絵画を扱うギャラリー',           desc: '「絵画」ジャンルを扱うギャラリーから自動生成した特集です。', f: function (x) { return x.genreTags.indexOf('絵画') !== -1; } },
    'upcoming-all':    { rail: 0, axis: 'date', label: '開催予定の展覧会があるギャラリー', desc: 'まもなく展覧会が始まるギャラリーです。', f: function (x) { return x.status === 'upcoming'; } },
    'new-all':         { rail: 0, axis: 'date', label: '新着ギャラリー',                 desc: '最近個展なびに掲載されたギャラリーです。', sort: 'new', f: function (x) { return !!x.isNew; } },
    'trending':        { rail: 0, axis: 'pop',  label: 'あなたへのおすすめ',             desc: 'ウォッチ中のギャラリー・興味あり！の傾向からのおすすめです。', f: function (x) { return true; } },
  };
  function presetInner(key) {
    var p = PRESETS[key];
    return (P10_ICONS[p.axis] || '') + esc(p.label);
  }

  /* ── カード描画は共通 buildPersonCard（gc--h）を使用 ── */
  function buildGalleryCard(x) {
    return buildPersonCard({ type: 'gallery', avStyle: x.avStyle, ini: x.ini, name: x.name, location: x.location, dist: x.dist, hours: x.hours, exh: x.exh, watch: x.watch, panel: false, href: x.href, status: x.status });
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

  /* ── おすすめ順（既定）と Featured クラスタ ──
     設計はP10（展覧会検索）と同じ＝**並び順そのものを出品側への誘因にする**（2026-09-01）。
     核がギャラリーなので、資格＝**まわりに展覧会・記事・レビューがそろっていること**
     （量では順位を付けない＝箱が大きいギャラリーの居座りを避ける）。 */
  function qualifies(x) { return KTN.cl.qualifies('gallery', x.cx, x.name); }

  function sortResults(list) {
    var mode = elSort ? elSort.value : 'rec';
    var out = list.slice();
    if (mode === 'new')      out.sort(function (a, b) { return b.isNew - a.isNew; });
    else if (mode === 'exh') out.sort(function (a, b) { return b.exh - a.exh; });
    else if (mode === 'pop') out.sort(function (a, b) { return b.pop - a.pop; });
    else                     out.sort(function (a, b) { return (qualifies(b) - qualifies(a)) || (b.pop - a.pop); });
    return out;
  }

  var FEAT_N = 2, FEAT_MIN_HITS = 6, FEAT_MIN_QUAL = 3;
  /* シード＝日付＋検索条件。同じ日に同じ条件なら同じ2件（リロードで入れ替わらない）、
     日が変わる／条件が変わると別の2件になる＝特定アカウントの居座りを防ぐ */
  function featSeed() {
    var key = (activePreset || '') + '|' + (elKeyword ? elKeyword.value.trim() : '')
      + '|' + JSON.stringify(activeChipFilters()) + '|' + (elSort ? elSort.value : '');
    return (KTN.cl.strSeed(key) ^ Math.imul(KTN.cl.doy(), 0x9E3779B1)) | 0;
  }
  function pickFeatured(list, seed) {
    if (!elSort || elSort.value !== 'rec') return [];   /* 並び順の約束を壊さない */
    if (list.length < FEAT_MIN_HITS) return [];
    var q = list.filter(qualifies);
    if (q.length < FEAT_MIN_QUAL) return [];
    return KTN.cl.shuffle(q.slice(), KTN.cl.rng(seed)).slice(0, FEAT_N);
  }
  /* 営業時間はクラスタでは出さない（誌面の紹介枠なので所在地まで・2026-09-01） */
  function featMeta(x) { return x.area + '・' + x.location; }
  function featCounts(x) {
    /* 出す数字は資格そのもの（展覧会・記事・レビューがそろっているか）＝
       「何をすれば上に出るか」が数字を見れば分かるようにする。
       展覧会だけはギャラリー自身の掲載件数（x.exh）を使う（周辺プールの件数より実態に近い） */
    var t = KTN.cl.satTypes(x.cx, { skipTtl: x.name });
    var parts = ['展覧会<strong>' + x.exh + '</strong>件'];
    if (t.article) parts.push('記事<strong>' + t.article + '</strong>本');
    if (t.review)  parts.push('レビュー<strong>' + t.review + '</strong>件');
    return KTN.cl.countsHtml(parts);
  }
  function featSb(x) {
    if (x.status === 'live')     return '<span class="sb sb-live"><span class="pulse"></span>開催中</span>';
    if (x.status === 'upcoming') return '<span class="sb sb-soon">開催予定</span>';
    return '';
  }
  function renderFeatured(items, seed) {
    var wrap = document.getElementById('p10Feat');
    var row  = document.getElementById('p10FeatRow');
    if (!wrap || !row) return;
    if (!items.length) { wrap.hidden = true; row.innerHTML = ''; return; }
    var rnd = KTN.cl.rng(seed + 7);
    row.innerHTML = items.map(function (x) {
      return KTN.cl.personCluster('gallery', x, {
        href: x.href,
        badges: featSb(x),
        meta: featMeta(x),
        counts: featCounts(x),
        sats: KTN.cl.pick('gallery', x.cx, x.name, 3, rnd)
      });
    }).join('');
    wrap.hidden = false;
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
    if (html.length) html.unshift('<span class="p10-fchips__label">指定中の条件</span>');
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

  /* Featured に出した2件は下のグリッドから除外して重複させない。ただし**件数（全N件）には含める**
     ＝ヒット件数は検索条件の答えなので、表示方法の都合で減らさない。 */
  function renderResultGrid(list) {
    var seed = featSeed();
    var feat = pickFeatured(list, seed);
    renderFeatured(feat, seed);
    var rest = feat.length ? list.filter(function (x) { return feat.indexOf(x) === -1; }) : list;
    var grid = document.getElementById('p103ResultGrid');
    grid.innerHTML = rest.slice(0, shownCount).map(buildGalleryCard).join('');
    var moreBtn = document.getElementById('p103MoreBtn');
    moreBtn.parentElement.style.display = rest.length > shownCount ? '' : 'none';
    renderResultGrid._last = list;
  }

  function runFilter() {
    var filters = activeChipFilters();
    var kw = elKeyword.value.trim();
    var hasAny = activePreset || kw || Object.keys(filters).length;
    if (!hasAny) { renderFchips({}, ''); showView('disc'); syncRail(); return; }

    var list = GALLERIES.filter(function (x) { return matches(x, filters, kw); });
    syncRail();

    if (!list.length) {
      document.getElementById('p103ZeroTitle').textContent = kw
        ? '「' + kw + '」に一致するギャラリーが見つかりませんでした'
        : '条件に合うギャラリーが見つかりませんでした';
      renderFchips(filters, kw);
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
    renderRefeed();
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
    if (elSort) elSort.value = PRESETS[key].sort || 'rec';
    runFilter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearAll() {
    activePreset = null;
    elKeyword.value = '';
    if (elSort) elSort.value = 'rec';
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

    var near = GALLERIES.filter(PRESETS['near'].f).sort(function (a, b) { return parseFloat(a.dist) - parseFloat(b.dist); });
    document.getElementById('p103NearGrid').innerHTML = near.slice(0, 4).map(buildGalleryCard).join('');

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

  /* ── 今日の特集（結果末尾の再回遊）──
     検索したが意中のものが無かった人に、人気軸のカードを足しても「同じ土俵の別カード」にしかならない。
     1枚が**別の軸の検索そのもの**になる特集を差し出して、軸の乗り換えを促す（中身が想像できるよう代表サムネ3枚つき）。
     選定は日替わり固定（doyシード）＝「ランダム」「引き直し」は前面に出さず、今日の誌面として置く（2026-09-02）。 */
  var REFEED_N = 3;    /* 出す特集の数 */
  var REFEED_MIN = 3;  /* 中身がこれ未満の特集は出さない（開いてスカスカだと逆効果） */
  function refeedCard(key) {
    var p = PRESETS[key], hits = GALLERIES.filter(p.f);
    var thumbs = hits.slice(0, 3).map(function (x) {
      return '<span class="p10-refeed__thumb" style="background:' + x.avStyle + '">' + esc(x.ini) + '</span>';
    }).join('');
    return '<button class="p10-refeed__card" type="button" data-refeed="' + key + '">'
      + '<span class="p10-refeed__thumbs">' + thumbs + '</span>'
      + '<span class="p10-refeed__label">' + presetInner(key) + '</span>'
      + '<span class="ktn-count">' + hits.length + '件</span></button>';
  }
  function renderRefeed() {
    var box = document.getElementById('p103RefeedGrid');
    if (!box) return;
    var keys = [];
    for (var k in PRESETS) {
      if (!PRESETS[k].rail || k === activePreset) continue;
      if (GALLERIES.filter(PRESETS[k].f).length < REFEED_MIN) continue;
      keys.push(k);
    }
    keys = KTN.cl.shuffle(keys, KTN.cl.rng(KTN.cl.doy())).slice(0, REFEED_N);
    box.innerHTML = keys.map(function (key) { return refeedCard(key); }).join('');
    box.querySelectorAll('[data-refeed]').forEach(function (b) {
      b.addEventListener('click', function () { applyPreset(b.dataset.refeed); });
    });
  }
  document.getElementById('p103SearchBtn').addEventListener('click', runFilter);
  elKeyword.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') { ev.preventDefault(); runFilter(); }
  });

  document.querySelectorAll('.p10-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      /* data-toggle は展開パネルを開くボタン（期間を指定する／すべての都道府県）＝フィルタチップではない */
      if (c.dataset.toggle) return;
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

  /* ── デモバー：表示状態切替（ロール切替は認証ウォール確認用に共通 setR を使う） ── */
  window.setP103View = function (view, btn) {
    document.querySelectorAll('[data-p103-view]').forEach(function (b) { b.classList.remove('on'); });
    if (btn && btn.hasAttribute('data-p103-view')) btn.classList.add('on');
    clearAll();
    if (view === 'disc') { showView('disc'); }
    else if (view === 'preset') { applyPreset('tokyo-galleries'); }
    else if (view === 'result') {
      /* 条件は1つだけ＝既定の「おすすめ順」で Featured クラスタが出るヒット数を確保するため
         （条件を重ねると数件まで絞られ、クラスタが出ない状態しかデモできない・2026-09-01） */
      ['st:live'].forEach(function (f) {
        document.querySelectorAll('.p10-chip[data-f="' + f + '"]').forEach(function (c) { c.classList.add('is-on'); });
      });
      runFilter();
    }
    else if (view === 'zero') { elKeyword.value = '深夜の青騎士'; runFilter(); }
  };

  window.ktnRender = function () {};
};

/* P10-5〜7＝特集ページ（P10-1/P10-2/P10-3のプリセット着地ビューをSEO URLラッパーとして再利用・実体を持たない）。
   P10-4 だけはこの構造から外し、軸ページの索引として実体を持たせた（追174-49・下の KTN.pages['p10-4']）。
   理由：P10 と同じ棚をもう1枚のURLで出しても新しい情報が無く、一方で軸ページ（P10-4-1）へ
   降りる内部リンクがサイトのどこにも無かった＝P10-4-1 のパンくずが宣言している親子関係が実在しなかった。 */
KTN.pages['p10-5'] = KTN.pages['p10-1'];
KTN.pages['p10-6'] = KTN.pages['p10-2'];
KTN.pages['p10-7'] = KTN.pages['p10-3'];

/* ════════════════════════════════════════════════════
   P10-4  特集-展覧会（軸ページのインデックス／追174-49）

   もとは KTN.pages['p10-4'] = KTN.pages['p10'] のエイリアスで、P10 の検索ハブを
   別URLでもう一度描いていた。同じ棚が2つのURLに並ぶだけで新しい情報が無く、
   その一方で軸ページ（P10-4-1）へ降りるリンクはサイトのどこにも無かった。
   ここを索引に作り替えて、47都道府県の軸ページへ張る内部リンク層をこのURLに置く。

   構成：
     A. 注目のエリア＝固定枠＋日替わりローテーション（KTN.axis.pick）
     B. エリアから探す＝47都道府県（掲載0件の県もリンクを外さない）
     C. ジャンルから探す（ジャンル軸ページの実装までは検索へ流す）
     D. 年間の記録ダイジェスト → P10-4-2
     E. 作品/クリエイター/ギャラリーの特集（P10-5/6/7）へ横断
════════════════════════════════════════════════════ */
KTN.pages['p10-4'] = function () {
  var A = KTN.axis;
  var elFeat  = document.getElementById('p104Featured');
  var elPref  = document.getElementById('p104PrefNav');
  var elArea  = document.getElementById('p104AreaNav');
  var elGenre = document.getElementById('p104GenreNav');
  var elAccess = document.getElementById('p104AccessNav');
  var elTotal = document.getElementById('p104Total');
  if (!elPref) return;

  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

  /* ── A. 注目のエリア ──
     件数を添えるのは「入る前に何があるか分かる」ようにするため。カードは軸ページへの入口なので
     .ktn-axis-card（P10-4-1/P10-4-2 の下段カードと同じ部品）を中段で再利用する。 */
  function renderFeatured() {
    if (!elFeat) return;
    elFeat.innerHTML = A.pick(6).map(function (s) {
      var al = A.aliasOf(s);
      return '<a class="ktn-axis-card" href="' + A.href(s) + '">'
        + '<span class="ktn-axis-card__label">' + esc(A.enName(s)) + '</span>'
        + '<span class="ktn-axis-card__ttl">' + esc(A.fullOf(s)) + 'の展覧会</span>'
        /* 東京のエリアだけ通称を添える（都道府県は空文字が返るので分岐が要らない）。カードは幅に余裕がある */
        + (al ? '<span class="ktn-axis-card__alias">' + esc(al) + 'など</span>' : '')
        + '<span class="ktn-axis-card__n"><strong>' + A.count(s) + '</strong>件が開催中・開催予定</span>'
        + '</a>';
    }).join('');
  }

  /* ── B. エリアから探す（47都道府県）──
     地方こそ競合が薄く、その土地の展覧会の記録は他で代替が効かない。掲載が少ない県も
     死にリンクにせず全て軸ページへ張り、0件の県は軸ページ側の補完ブロックに着地させる（追174-47）。 */
  function renderPref() {
    elPref.innerHTML = '<div class="ktn-axis-nav__prefs">' + A.GROUPS.map(function (g) {
      return '<div class="p10-adv__pref-group">'
        + '<div class="p10-adv__pref-label">' + g[0] + '</div>'
        + '<div class="p10-adv__panel-chips">' + g[1].map(function (pr) {
            var s = A.SLUGS[pr];
            return '<a class="p10-preset" href="' + A.href(s) + '">' + esc(A.fullName(pr))
              + '<span class="ktn-axis-prefchip__n">' + A.count(s) + '</span></a>';
          }).join('') + '</div></div>';
    }).join('') + '</div>';
    if (elTotal) elTotal.innerHTML = '<strong>' + A.total() + '</strong>件';
  }

  /* ── B-2. 東京をエリアで探す（東京都の6区分）──
     47県の索引と別セクションにしたのは、粒度が違うものを1つのグリッドに混ぜないため。URLは県と対等の
     フラットな名前空間（/exhibitions/tokyo-central）だが、47県の並びに同じ強さで混ぜると
     どこの何かが読めない。並びを親県でグループ化して文脈を渡す（追174-67）。
     グループ化の構造は、将来ほかの道府県がエリアを持ったときのために残す。いまは中身が東京都だけなので
     県名ラベルは見出しと重複する＝1グループのときは出さない（追174-68）。
     件数が0のエリアもリンクを外さないのは都道府県と同じ＝軸ページのURLは恒久で、0件は軸ページ側の
     補完ブロックが受ける（追174-47）。合計（elTotal）に足さないのは、エリアの件数が親県の内訳で
     二重に数えてしまうため（KTN.axis.total() も PREFS だけで数えている）。 */
  function renderArea() {
    if (!elArea) return;
    var groups = [];
    A.PREFS.forEach(function (s) {
      var list = A.areasOf(s);
      if (list.length) groups.push([s, list]);
    });
    elArea.innerHTML = !groups.length ? '' :
      '<div class="ktn-axis-nav__prefs">' + groups.map(function (g) {
        return '<div class="p10-adv__pref-group">'
          + (groups.length > 1 ? '<div class="p10-adv__pref-label">' + esc(A.fullOf(g[0])) + '</div>' : '')
          /* 通称（銀座・丸の内…）を名前の後ろに一段落として添える。ここは6チップだけの専用セクションで
             幅に余裕があるため出す（47県グリッドの中に混ざるエリアチップには出さない＝並びが密なため）。
             方角名が主・通称は補助という関係は色と濃度で示し、通称をリンクの主語にしない。 */
          + '<div class="p10-adv__panel-chips">' + g[1].map(function (a) {
              return '<a class="p10-preset" href="' + A.href(a.slug) + '">' + esc(a.name)
                + (a.alias ? '<span class="p10-preset__alias">' + esc(a.alias) + '</span>' : '')
                + '<span class="ktn-axis-prefchip__n">' + A.count(a.slug) + '</span></a>';
            }).join('') + '</div></div>';
      }).join('') + '</div>';
  }

  /* ── C. ジャンルから探す ──
     ジャンル軸ページ（/exhibitions/genre/{slug}＝P10-4-4）へ張る。都道府県と同じく掲載0件の
     ジャンルもリンクを外さない（URLが恒久で、件数が少なくても存在し続けるのが軸ページ＝追174-47）。 */
  function renderGenre() {
    if (!elGenre) return;
    elGenre.innerHTML = A.AXIS_GENRES.map(function (g) {
      return '<a class="p10-preset" href="' + A.genreHref(g.slug) + '">' + esc(g.name) + 'の展覧会'
        + '<span class="ktn-axis-prefchip__n">' + g.n + '</span></a>';
    }).join('');
  }

  /* ── C-2. 行きやすさから探す ──
     アクセシビリティ軸ページ（/exhibitions/access/{slug}＝P10-4-5）へ張る。
     ジャンルの前に「そもそも行けるか」で絞る人がいるので、索引にも入口を置く（追174-54）。 */
  function renderAccess() {
    if (!elAccess) return;
    elAccess.innerHTML = A.ACCESS.map(function (a) {
      return '<a class="p10-preset" href="' + A.accessHref(a.slug) + '">' + esc(a.ttl)
        + '<span class="ktn-axis-prefchip__n">' + a.n + '</span></a>';
    }).join('');
  }

  /* ── D. 年間の記録ダイジェスト（本体は P10-4-2）──
     年の切替を select（クライアント状態）で持つと 2026年と2025年が同じURLに同居して
     クローラからは片方しか見えない。年別ナビは必ずリンクにする（追174-48）。 */
  function renderArcDigest() {
    var R = KTN.arc, list = document.getElementById('p10ArchiveList');
    if (!list || !R) return;
    var y = R.defaultYear();
    list.innerHTML = R.rows(y, 'want', 3).map(R.build).join('');
    var years = document.getElementById('p10ArcYears');
    if (years) {
      years.innerHTML = R.YEARS.map(function (v) {
        return '<a class="p10-preset" href="./kotennavi-p10-4-2.html?y=' + v + '">' + v + '年の記録</a>';
      }).join('');
    }
    var more = document.getElementById('p10ArcMore');
    if (more) {
      more.href = './kotennavi-p10-4-2.html?y=' + y;
      more.textContent = y + '年の記録をすべて見る →';
    }
  }

  /* admin だけに出る注記。軸ページと同じく、露出の調整はページの公開/非公開ではなく枠の選定で行う */
  function syncRole() {
    var lead = document.getElementById('p104Lead');
    if (!lead) return;
    var note = lead.querySelector('.ktn-axis-head__lead-note');
    var isAdmin = (window.ktnState && window.ktnState.role) === 'admin';
    if (isAdmin && !note) {
      var s = document.createElement('span');
      s.className = 'ktn-axis-head__lead-note';
      s.textContent = '管理者：注目のエリアは掲載件数のしきい値を超えた軸から自動で選ばれます（固定枠＋日替わり）。個別の軸ページは非公開にせず、この枠への掲載で露出を調整します。';
      lead.appendChild(s);
    } else if (!isAdmin && note) {
      note.remove();
    }
  }
  var _baseRender = window.ktnRender;
  window.ktnRender = function () {
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  };

  /* デモバー：注目枠が日替わりで入れ替わることを確認するための日付送り。
     本番にはこの切替は無い（Drupal 側が当日分を初期HTMLに焼く）。 */
  window.setAxisDay = function (shift, btn) {
    A.setDayShift(shift);
    renderFeatured();
    if (btn && btn.parentNode) {
      btn.parentNode.querySelectorAll('[data-axis-day]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
  };

  renderFeatured();
  renderPref();
  renderArea();
  renderGenre();
  renderAccess();
  renderArcDigest();
  syncRole();
};

/* ════════════════════════════════════════════════════
   P10-4-1  特集-展覧会-軸（軸ページ／場所軸の代表プロトタイプ）

   個展なびの主コンテンツ＝展覧会は会期で寿命が尽きるため、個別ページは時間が経つほど
   価値が落ちる。サイトで唯一SEO資産を積めるのは「URLとタイトルが永続し、中身だけ
   入れ替わる」軸ページ（追174-46）。本番では 47都道府県 × ジャンル × 入場条件 の
   組み合わせで自動生成されるので静的には作れない。ここは場所軸の1枚を代表プロトタイプ
   として置き、?ax=<slug>（デモバー）で軸名だけ差し替えて挙動を確認する。

   確認できること：
     ・潤沢（東京都8件）／少件数（京都府2件）／0件（鳥取県）の3パターン
     ・0件でも404・noindexにせず、①アーカイブ →②同一場所の人 →③同じ地方ブロック →④全国 の順で補完する
     ・h1・title・canonical・パンくず末尾が軸名に追従する（日付・年・件数は入れない）
════════════════════════════════════════════════════ */
KTN.pages['p10-4-1'] = function () {

  /* ── 都道府県マスタ・表示名・軸URLは KTN.axis から借りる（P10-4 索引と共有・追174-49）──
     47件と命名規則をページ側で二重に持たない＝索引が張るリンクと軸ページが認識する軸の集合が必ず一致する。
     KTN.axis 自体は common.js の KTN.P10_PREF_GROUPS / KTN.P10_PREF_SLUGS を借りているので、
     検索ドロワーのチップとも同じ集合のままになる。 */
  var AX = KTN.axis;
  var PREF_GROUPS = AX.GROUPS, PREF_SLUGS = AX.SLUGS;
  var fullName = AX.fullName, enName = AX.enName, fullOf = AX.fullOf;
  var SORTS = AX.SORTS, grid = AX.grid;
  /* 軸スラッグ → 表示名・地方ブロック・親県は AX.fullOf / AX.blockOf / AX.parentOf を通す。
     SLUG2PREF を直に引くと都道府県しか解決できず、東京のエリア区分（東京都心部・東京東部…）が
     素通りする＝場所軸を「県とエリアのフラットな集合」として扱えなくなる（追174-67）。
     未知のスラッグ判定も AX.has（県＋エリア）に寄せる。 */

  /* ── 場所 × 第2軸（ジャンル／行きやすさ）の交差（追174-58）──
     単独軸＝無条件で発行／2軸＝昇格制／3軸以上はURLを作らない（追174-46②）。
     UIは常に交差できるようにし、URLとindexだけを件数で分ける：
       昇格済み → /exhibitions/{pref}/genre/{g}・/exhibitions/{pref}/access/{a} をパスとして発行し index
       未昇格   → クエリのまま noindex,follow ＋ canonical は軸を1つ落とした /exhibitions/{pref} へ
     順序は「場所 → 軸」で固定（追174-46②）。ジャンル側から場所を選んでも同じURLに着地する＝入口は2つでもページは1つ。
     交差ページの持ち主を場所軸にしたのはURLの階層と一致するため（/exhibitions/osaka の子が /genre/photography）。
     CROSS_MIN はデモ用の縮尺値。本番の昇格条件は「現在＋未来が5件以上」かつ「直近1年の累計が10件以上」
     ＝一時的に増えただけでは昇格させない。一度発行したURLは降格させない（追174-46③の一方向公開）。 */
  var CROSS_MIN = 3;

  /* 第2軸（ジャンル／行きやすさ）を1つの形に均す。URL・index・補完の扱いはどちらも同じで、
     違うのは文言だけなので、分岐をこのファクトリの中に閉じ込める。
     第2軸のスロットは1つしか持たない＝もう一方の行から選ぶと入れ替わる。これで3軸目を作れない。 */
  function crossOf(gs, as) {
    var g = gs && AX.genre(gs), a = !g && as && AX.access(as), mod;
    if (g) return {
      slug: g.slug, label: g.name, en: g.en, path: 'genre/' + g.slug, ja: 'ジャンル', kindEn: 'Genre',
      hit:  function (x) { return x.genre === g.name; },
      h1:   function (f) { return f + 'の' + g.name + 'の展覧会'; },
      rest: function (f) { return f + 'の他のジャンルの展覧会'; },
      wide: '全国の' + g.name + 'の展覧会', wideHref: AX.genreHref(g.slug)
    };
    if (a) {
      /* ttl（「お子さまと行ける展覧会」）から連体修飾部を取り出して組み立てる＝語彙を二重に持たない */
      mod = a.ttl.replace(/展覧会$/, '');
      return {
        slug: a.slug, label: a.chip, en: a.en, path: 'access/' + a.slug, ja: '行きやすさ', kindEn: 'Access',
        hit:  function (x) { return !!x[a.field]; },
        h1:   function (f) { return f + 'で' + mod + '展覧会'; },
        /* 補集合は「子連れでは行きにくい展覧会」ではなく単に条件を外した結果なので、否定語で名づけない */
        rest: function (f) { return f + 'のほかの展覧会'; },
        wide: '全国で' + mod + '展覧会', wideHref: AX.accessHref(a.slug)
      };
    }
    return null;
  }

  /* 導入文と未記入時の自動文は KTN.axis が持つ（管理画面 P90-17 と同じ本文を見るため） */
  function leadOf(slug) { return AX.leadOf('area', slug); }

  /* ── DOM ── */
  var elTitle   = document.getElementById('p1041Title');
  var elEn      = document.getElementById('p1041En');
  var elEyebrow = document.getElementById('p1041Eyebrow');
  var elLead    = document.getElementById('p1041Lead');
  var elLinks   = document.getElementById('p1041HeadLinks');
  var elCount   = document.getElementById('p1041Count');
  var elSort    = document.getElementById('p1041Sort');
  var elEmpty   = document.getElementById('p1041Empty');
  var elGrid    = document.getElementById('p1041Grid');
  var elSearch  = document.getElementById('p1041SearchLink');
  var elFill    = document.getElementById('p1041Fill');
  var elFillTtl = document.getElementById('p1041FillTitle');
  var elFillDsc = document.getElementById('p1041FillDesc');
  var elFillBlk = document.getElementById('p1041FillBlocks');
  var elPrefNav = document.getElementById('p1041PrefNav');
  var elFacet   = document.getElementById('p1041Facet');
  var elNow     = document.getElementById('p1041FacetNow');
  var elNowArea = document.getElementById('p1041FacetArea');
  var elNowKind = document.getElementById('p1041FacetKind');
  var elNowVal  = document.getElementById('p1041FacetVal');
  var elNowDrop = document.getElementById('p1041FacetDrop');
  var elGenre   = document.getElementById('p1041GenreNav');
  var elAcc     = document.getElementById('p1041AccessNav');
  var elAccRow  = document.getElementById('p1041AccessRow');
  var elGxHead  = document.getElementById('p1041GenreExitHead');
  var elGxNav   = document.getElementById('p1041GenreExit');
  var elArcCard = document.getElementById('p1041ArcCard');
  var elArcTtl  = document.getElementById('p1041ArcTtl');
  var elArcDesc = document.getElementById('p1041ArcDesc');
  var elToolbar = document.querySelector('.p10-toolbar');
  if (!elGrid) return;

  var axis = 'tokyo';
  var X = null;                /* 交差中の第2軸（crossOf の戻り値）。null＝単独軸 */
  function promoted() { return !!X && curOf(axis).length >= CROSS_MIN; }

  /* att＝追加属性。ログイン必須ページ（P10-7 等）へ張るチップに data-guest="login" を持たせるために使う。
     common.js の委譲リスナーがゲストのクリックを止めてログインモーダルへ振り替える（遷移させない）。 */
  function chip(label, href, on, mod, att) {
    return '<a class="p10-preset' + (mod ? ' ' + mod : '') + (on ? ' is-on' : '') + '"' + (att || '') + ' href="' + href + '">' + label + '</a>';
  }
  /* 交差中は第2軸まで絞る。アーカイブ（endedOf）は場所だけで数える＝過去 × 場所 × 第2軸は3軸になるため */
  function curOf(slug)   {
    var l = AX.byPref(slug, false);
    return X ? l.filter(X.hit) : l;
  }
  function endedOf(slug) { return AX.byPref(slug, true); }

  /* ── B. 一覧 ── */
  function renderList() {
    var list = curOf(axis).slice().sort(SORTS[elSort && elSort.value || 'rec'] || SORTS.rec);
    elGrid.innerHTML = list.map(buildGridEcCard).join('');
    elCount.innerHTML = '<strong>' + list.length + '</strong>件';
    /* 0件のときは並べ替えを出さない（対象が無いのに操作だけ残るのを避ける） */
    if (elToolbar) elToolbar.style.display = list.length ? '' : 'none';
    if (elSearch) elSearch.textContent = list.length ? '条件を足して絞り込む →' : '全国の展覧会を検索する →';
  }

  /* ── C. 補完（0件・少件数）──
     0件は異常ではなく通常状態。ページを消さず、次の行き先だけを示す（追174-46⑤）。
     「ありません」で終わらせないため、各ブロックに理由ラベルを必ず添える。 */
  var FILL_MIN = 4;
  function renderFill() {
    var full = fullOf(axis), block = AX.blockOf(axis), par = AX.parentOf(axis);
    var cur = curOf(axis);
    if (cur.length >= FILL_MIN) { elFill.hidden = true; if (elEmpty) elEmpty.hidden = true; return; }

    var blocks = [];

    /* 交差ページの補完は「軸を1つ落とす」形にする（追174-58）。2軸で薄くなったページの回復は、
       近いエリアを足すことではなく〈どちらの条件を外せば見られるか〉を示すこと。 */
    if (X) {
      var oth = AX.byPref(axis, false).filter(function (x) { return !X.hit(x); });
      if (oth.length) blocks.push({
        ttl: X.rest(full),
        why: X.ja + 'の条件を外すと、同じ' + full + 'でこれだけの展覧会が開かれています。',
        body: grid(oth.slice().sort(SORTS.end))
      });
      var wide = AX.EX.filter(function (x) {
        return x.status !== 'ended' && x.pref !== axis && X.hit(x);
      });
      if (wide.length) blocks.push({
        ttl: X.wide,
        why: 'エリアの条件を外して、全国から集めた結果です。',
        body: grid(wide.slice().sort(SORTS.end))
      });
      /* ここは「条件を外す操作」の案内ではない（操作は上の絞り込みバーが受け持つ・追174-62）。
         役割は〈2軸で薄くなったページを空にしない内容の棚〉なので、タイトルは操作ではなく中身を名指す。
         いま何で絞っているかはバーの「絞り込み中」行が言い、なぜこの棚が出ているかは各ブロックの
         why ラベルが個別に言う。まとめの説明文はその二重になるので置かない。 */
      elFillTtl.textContent = cur.length ? 'あわせて見る' : 'ほかに見られるもの';
      if (elFillDsc) { elFillDsc.textContent = ''; elFillDsc.hidden = true; }
      elFillBlk.innerHTML = AX.fillHtml(blocks);
      elFill.hidden = !blocks.length;
      if (elEmpty) {
        if (cur.length) { elEmpty.hidden = true; }
        else {
          var gtail = (oth.length && wide.length) ? X.rest(full) + 'と、' + X.wide + 'をご覧いただけます。'
            : oth.length  ? X.rest(full) + 'をご覧いただけます。'
            : wide.length ? X.wide + 'をご覧いただけます。'
            : full + 'の展覧会アーカイブから、会期を終えた展覧会を辿れます。';
          elEmpty.textContent = X.h1(full) + 'は、現在は開催中・開催予定のものがありません。' + gtail;
          elEmpty.hidden = false;
        }
      }
      return;
    }

    /* ① 同一場所のアーカイブ */
    var arc = endedOf(axis);
    if (arc.length) blocks.push({
      ttl: full + 'で会期を終えた展覧会',
      why: '会期は終わっていますが、出品したクリエイターとギャラリーはいまも活動しています。',
      body: grid(arc.slice().sort(function (a, b) { return b.rd - a.rd; }))
    });
    /* ② 同一場所のギャラリー。
       クリエイターは場所情報を持たないのでここには出せない（追174-50）。場所で確実に絞れる
       エンティティはギャラリー（固定会場を持つ）と展覧会（会場を持つ）だけ。 */
    var ppl = AX.galleryOf(axis);
    if (ppl.length) blocks.push({
      ttl: full + 'のギャラリー',
      why: 'このエリアに会場を持つギャラリーです。次の展覧会はここから告知されます。',
      body: '<div class="ktn-axis-fill-cards">' + ppl.map(function (p) {
        return buildPersonCard(Object.assign({ panel: 1 }, p));
      }).join('') + '</div>'
    });
    /* ③ 近いところへ寄せる。県とエリアで「近い」の意味が変わるので寄せ先を切り替える：
       　 県（東京都）→ 同じ地方ブロックの他県／エリア（東京都心部）→ 親の都道府県のほかの展覧会。
       東京都心部が0件のときに関東の他県を出しても遠すぎる。同じ東京都なら同じ日に続けて回れる。 */
    var nb;
    if (par) {
      nb = AX.byPref(par, false).filter(function (x) { return x.varea !== axis; });
      if (nb.length) blocks.push({
        ttl: fullOf(par) + 'のほかの展覧会',
        why: full + 'と同じ' + fullOf(par) + 'で開催中の展覧会です。同じ日に続けて回れる距離にあります。',
        body: grid(nb.slice().sort(SORTS.end))
      });
    } else {
      nb = AX.EX.filter(function (x) {
        return x.status !== 'ended' && x.pref !== axis && AX.blockOf(x.pref) === block;
      });
      if (nb.length) blocks.push({
        ttl: block + 'で開催中の展覧会',
        why: full + 'と同じ' + block + 'のエリアから。足をのばせる距離にある展覧会です。',
        body: grid(nb.slice().sort(SORTS.end))
      });
    }
    /* ④ 全国（③まででも足りないとき） */
    if (!nb.length) {
      var nat = AX.EX.filter(function (x) { return x.status !== 'ended' && x.pref !== (par || axis); })
        .sort(SORTS.pop).slice(0, 3);
      if (nat.length) blocks.push({
        ttl: '全国の展覧会',
        why: '近いエリアにも会期中の展覧会がないため、全国から反応の多いものを表示しています。',
        body: grid(nat)
      });
    }

    elFillTtl.textContent = cur.length ? full + 'とあわせて見る' : full + 'から見られるもの';
    elFillDsc.textContent = full + 'に関わるページと、近いエリアで開催中の展覧会です。';
    elFillDsc.hidden = false;
    elFillBlk.innerHTML = AX.fillHtml(blocks);
    elFill.hidden = false;

    /* 0件のときだけ一覧側にメッセージを出す。何が見られるかを主語にして書く（欠落の言い方をしない） */
    if (elEmpty) {
      if (cur.length) { elEmpty.hidden = true; }
      else {
        var tail = (arc.length && ppl.length) ? '直近で終了した展覧会と、' + full + 'のギャラリーをご覧いただけます。'
          : ppl.length ? full + 'に会場を持つギャラリーと、近いエリアで開催中の展覧会をご覧いただけます。'
          : arc.length ? '直近で終了した展覧会と、近いエリアで開催中の展覧会をご覧いただけます。'
          : '近いエリアで開催中の展覧会をご覧いただけます。';
        elEmpty.textContent = full + 'では現在、開催中・開催予定の展覧会がありません。' + tail;
        elEmpty.hidden = false;
      }
    }
  }

  /* ── D. 軸ネットワーク（47都道府県＋ジャンル）──
     地方こそ競合が薄く、その土地の展覧会の記録は他で代替が効かない。44県を死にリンクにせず
     すべて軸ページへ張り、掲載が無い県は0件＋補完の経路に自然に着地させる。 */
  function renderNav() {
    if (elPrefNav) {
      elPrefNav.innerHTML = '<div class="ktn-axis-nav__prefs">' + PREF_GROUPS.map(function (g) {
        return '<div class="p10-adv__pref-group">'
          + '<div class="p10-adv__pref-label">' + g[0] + '</div>'
          + '<div class="p10-adv__panel-chips">' + g[1].map(function (p) {
              var s = PREF_SLUGS[p];
              /* エリアチップは親県チップの直後に続ける。URLでは県と対等（/exhibitions/tokyo-central）
                 だが、47県の並びに同じ強さで混ぜるとどこの区分かが読めない。並びと見た目だけ
                 親県に寄せて、県が場所軸の主グリッドである点は保つ（追174-67）。
                 通称（銀座・丸の内…）はこのグリッドでも添える＝方角名だけでは場所が浮かばないのは
                 走査面でも同じで、他の面（軸カード・P10-4の6チップ・レール・ドロワー）と揃える。
                 チップ自体が warm 背景＋muted＋.72rem で県チップより弱く、通称も括弧＋muted なので、
                 幅が伸びても「県が主・エリアは補助」の関係は保てる（2026-09-08）。 */
              return chip(fullName(p), '?ax=' + s, s === axis)
                + AX.areasOf(s).map(function (a) {
                    return chip(a.name + (a.alias ? '<span class="p10-preset__alias">' + a.alias + '</span>' : ''),
                      '?ax=' + a.slug, a.slug === axis, 'p10-preset--area');
                  }).join('');
            }).join('') + '</div></div>';
      }).join('') + '</div>';
    }
    /* 場所チップは第2軸を引き継がない＝エリアを変えることは「別の軸ページへ移る」こと。
       引き継ぐと 0件の交差URLを大量に作ってしまう（0件ページを作らない・追174-46⑤）。 */

    var gbase = AX.byPref(axis, false), gfull = fullOf(axis);

    /* エリアが0件＝絞る対象が無いのでバーごと出さない。代わりにD（移る層）へ全国ジャンル軸の出口を置く。
       「絞る」と「移る」を上下で分けたので、成立しない方は片方ずつ消える（追174-60）。 */
    if (elFacet) elFacet.hidden = !gbase.length;
    if (elGxHead) elGxHead.hidden = !!gbase.length;
    if (elGxNav) {
      elGxNav.hidden = !!gbase.length;
      if (!gbase.length) elGxNav.innerHTML = AX.AXIS_GENRES.map(function (g) {
        return chip(g.name + 'の展覧会', AX.genreHref(g.slug));
      }).join('');
    }
    if (!gbase.length) return;

    /* 現在の絞り込み。h1 は結果の名前しか言わないので、2つの条件が別々に外せることはここで見せる。
       これが無いと直下のC「条件を1つ外して見る」の「条件」に画面上の指す先が無い。 */
    if (elNow) {
      elNow.hidden = !X;
      if (X) {
        if (elNowArea) elNowArea.textContent = gfull;
        if (elNowKind) elNowKind.textContent = X.ja;
        if (elNowVal)  elNowVal.textContent  = X.label;
        if (elNowDrop) elNowDrop.href = '?ax=' + axis;
      }
    }

    /* 掲載がある値だけをチップにする＝押した先が0件になる経路をUIの段階で塞ぐ。
       「すべて」チップは置かない：第2軸のスロットは1つなので、ジャンル行の「すべて」が
       行きやすさの絞り込みまで解除してしまい、どの行の操作なのかが読めなくなるため。
       解除は __now 行の「解除」1箇所＋適用中チップの再クリックに集約する。 */
    if (elGenre) {
      var gcnt = {};
      gbase.forEach(function (x) { gcnt[x.genre] = (gcnt[x.genre] || 0) + 1; });
      elGenre.innerHTML = AX.GENRES.filter(function (g) { return gcnt[g.name]; }).map(function (g) {
        var on = !!X && X.path === 'genre/' + g.slug;
        return chip(g.name + '<span class="ktn-count">' + gcnt[g.name] + '件</span>',
          on ? '?ax=' + axis : '?ax=' + axis + '&gn=' + g.slug, on);
      }).join('');
    }
    /* 行きやすさの行。ジャンル行と同じ第2軸スロットを奪い合う（片方を選ぶともう片方は外れる）。
       この軸の母数は展覧会側の任意入力なので、まだ申告が無いエリアでは行ごと出さない＝
       「0件かもしれない条件」を提示して空振りさせない。 */
    if (elAcc) {
      var acs = AX.ACCESS.filter(function (a) {
        return gbase.some(function (x) { return !!x[a.field]; });
      });
      if (elAccRow) elAccRow.hidden = !acs.length;
      if (acs.length) elAcc.innerHTML = acs.map(function (a) {
        var n = gbase.filter(function (x) { return !!x[a.field]; }).length,
            on = !!X && X.path === 'access/' + a.slug;
        return chip(a.chip + '<span class="ktn-count">' + n + '件</span>',
          on ? '?ax=' + axis : '?ax=' + axis + '&ac=' + a.slug, on);
      }).join('');
    }
  }

  /* ── ヘッド・メタ・パンくずの軸追従 ──
     title/h1/canonical は軸ごとに固定。日付・年・件数・「最新」等の時制語は入れない（追174-46④）。
     h1 は title の短縮形にして完全一致させない。 */
  function syncBc(full) {
    if (typeof PAGES === 'undefined' || !PAGES['p10-4-1']) return;
    /* 交差時は場所軸を親として1段深くする＝URLの階層（/exhibitions/{pref}/genre/{g}）と一致させる */
    var bc = [['Top', '/'], ['特集', '/feature'], ['展覧会', 'kotennavi-p10-4.html']];
    if (X) { bc.push([full + 'の展覧会', '?ax=' + axis], [X.label, null]); }
    else { bc.push([full + 'の展覧会', null]); }
    PAGES['p10-4-1'].bc = bc;
  }
  function setMeta(id, attr, val) { var el = document.getElementById(id); if (el) el.setAttribute(attr, val); }

  function syncHead() {
    var full = fullOf(axis), en = enName(axis), par = AX.parentOf(axis);
    var url = 'https://koten-navi.com/exhibitions/' + axis;
    var h1 = full + 'の展覧会', title = full + 'で開催中の展覧会・個展｜個展なび';

    if (X) {
      h1 = X.h1(full);
      title = h1 + '・個展｜個展なび';
      /* 昇格していない組み合わせはパスを発行しない＝クエリのまま noindex,follow にし、
         canonical は軸を1つ落とした単独軸へ寄せる（パスかクエリかで index を決める・追174-46②）。 */
      var pro = promoted(), cross = url + '/' + X.path;
      setMeta('p1041Robots', 'content', pro ? 'index,follow' : 'noindex,follow');
      setMeta('p1041Canonical', 'href', pro ? cross : url);
      setMeta('p1041OgUrl', 'content', pro ? cross : url);
      setMeta('p1041Desc', 'content', h1 + 'の一覧です。開催中・開催予定の展覧会を会期順に探せます。');
      if (elEyebrow) elEyebrow.textContent = 'Area × ' + X.kindEn;
      if (elEn) elEn.textContent = X.en + ' Exhibitions in ' + en;
      /* 交差ページの導入文は自動生成にする。組み合わせは県×第2軸で数百になり、
         単独軸のような運営の書き下ろし（追174-46③）を全部には用意できないため、2軸から1文を組むに留める。 */
      if (elLead) elLead.innerHTML = '<p>' + h1 + 'をまとめています。会期を終えたものは' + full + 'の展覧会アーカイブから辿れます。</p>';
    } else {
      setMeta('p1041Robots', 'content', 'index,follow');
      setMeta('p1041Canonical', 'href', url);
      setMeta('p1041OgUrl', 'content', url);
      /* 名前だけでは場所が伝わらないエリアには、description にだけ親県を添える（判定は AX.prefNote）。
         h1・title には入れない＝「東京都心部 展覧会」で検索する人が見る文言を長くしないため。 */
      /* 中間の一句だけ土地ごとに差し替える（AX.descMid）＝53本の description が
         県名違いの同一文になるのを避ける。前半は検索語、後半は機能の説明なので共通。 */
      setMeta('p1041Desc', 'content', full + AX.prefNote(axis)
        + 'で開催中・開催予定の展覧会・個展の一覧です。' + AX.descMid(axis) + '会期順・ジャンル別に探せます。');
      if (elEyebrow) elEyebrow.textContent = 'Area';
      if (elEn) elEn.textContent = 'Exhibitions in ' + en;
      if (elLead) elLead.innerHTML = leadOf(axis);
    }
    document.title = title;
    if (elTitle) elTitle.textContent = h1;
    setMeta('p1041OgTitle', 'content', title);
    /* 〈軸 × エンティティ〉の内部リンク。ここに出せるのは場所で絞れるものだけ＝
       展覧会・ギャラリー・アーカイブ。クリエイターと作品は場所情報を持たないので張らない（追174-50）。
       人・作品へは「ジャンル」という別の軸で接続するが、その入口はヘッドに置かない：
       旧「ジャンルから探す」チップ（→ハブの #genre）は2026-09-09に削除した。押しても同じものが
       すぐ下にある（掲載があれば一覧直上の「ジャンルで絞る」バー、0件なら下段Dのジャンル出口）＝
       スクロールで届く位置の重複だったため。加えて他の3チップが全てエリア文脈なのに1つだけ全国へ
       出るのでスコープを読み違えられる（年鑑カードと同型・追記8）。 */
    if (elLinks) {
      elLinks.innerHTML = X
        /* 交差ページからは「軸を1つ落とした先」を必ず出す。行き止まりにしないための最短の戻り道 */
        ? chip(full + 'のすべての展覧会', '?ax=' + axis)
          + chip(X.wide, X.wideHref)
          + chip(full + 'の展覧会アーカイブ', AX.archiveHref(axis))
        /* エリアの軸ページからは親県への戻り道を先頭に置く。エリアは県の内訳なので、もっと広く見たいときの
           行き先が県で確定する（交差ページで「軸を1つ落とした先」を必ず出すのと同じ発想）。 */
        : (par ? chip(fullOf(par) + 'のすべての展覧会', '?ax=' + par) : '')
          + chip(full + 'のギャラリー', './kotennavi-p10-7.html', 0, 0, ' data-guest="login"')
          + chip(full + 'の展覧会アーカイブ', AX.archiveHref(axis));
    }
    if (elArcTtl) elArcTtl.textContent = full + 'の展覧会アーカイブ';
    if (elArcCard) elArcCard.href = AX.archiveHref(axis);
    if (elArcDesc) elArcDesc.textContent = full + 'で会期を終えた展覧会の記録です。会期は終わっていますが、出品したクリエイターとギャラリーはいまも活動しています。';
    syncBc(full);
  }

  /* admin だけに出る編集の注記。ロール切替のたびに付け外しする */
  function syncRole() {
    if (!elLead) return;
    var note = elLead.querySelector('.ktn-axis-head__lead-note');
    var isAdmin = (window.ktnState && window.ktnState.role) === 'admin';
    if (!isAdmin) { if (note) note.remove(); return; }
    if (!note) {
      note = document.createElement('span');
      note.className = 'ktn-axis-head__lead-note';
      elLead.appendChild(note);
    }
    /* 交差ページは「昇格したか＝固定URLを発行したか」が画面から見えないと運営が判断できないので、
       admin にだけ状態を出す。利用者には昇格・未昇格の区別を見せない（どちらも同じページとして使える）。 */
    note.textContent = !X
      ? '管理者：この導入文は軸ごとに編集できます。軸ページ自体の公開/非公開は切り替えず、ハブへの掲載だけで露出を調整します。'
      : promoted()
        ? '管理者：この組み合わせは昇格済みです。/exhibitions/' + axis + '/' + X.path + ' を固定URLとして発行し、検索エンジンに載せています。一度発行したURLは件数が減っても取り下げません。'
        : '管理者：この組み合わせはまだ昇格していません。ページは表示できますが固定URLは発行せず、検索エンジンには出していません（掲載が続けば自動で昇格します）。';
  }

  /* ヘッダー再描画は common.js の _renderHeader をそのまま使う（no-op で潰さない）。
     ロール切替のたびにパンくず末尾＝軸名と admin 注記を追従させたいので、前後に自前の同期を挟む。 */
  var _baseRender = window.ktnRender;
  window.ktnRender = function () {
    syncBc(fullOf(axis));
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  };

  function apply(slug, g, a) {
    if (!AX.has(slug)) slug = 'tokyo';
    axis = slug;
    X = crossOf(g, a);
    syncHead();
    renderList();
    renderFill();
    renderNav();
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  }

  /* デモバーの軸切替。本番はURL（/exhibitions/{slug}）が軸を決めるのでこの関数は消える。
     エリアを変えたらジャンルの交差は解除する（renderNav の場所チップと同じ扱い） */
  window.setAxis = function (slug, btn) {
    if (btn) {
      document.querySelectorAll('.dbar [data-ax]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
    apply(slug, null, null);
  };

  if (elSort) elSort.addEventListener('change', renderList);

  var qs = new URLSearchParams(location.search), q = qs.get('ax');
  if (q && AX.has(q)) {
    document.querySelectorAll('.dbar [data-ax]').forEach(function (b) {
      b.classList.toggle('on', (b.getAttribute('onclick') || '').indexOf("'" + q + "'") > -1);
    });
  }
  apply(q || 'tokyo', qs.get('gn'), qs.get('ac'));
};

/* ════════════════════════════════════════════════════
   P10-4-2  特集-展覧会-年鑑（年間の記録／年ごとの独立URL）

   もとは P10-4 の下段セクションで、年の切替が select（クライアント状態）だった。
   その形だと 2026年と2025年が同じURLに同居し、クローラからは既定年しか見えない＝
   年を重ねても資産にならない。年鑑は**年ごとに別URL**にして初めて積み上がる。

   軸ページ（P10-4-1）が「URLとタイトルが永続し中身が入れ替わる」ページなのに対し、
   年鑑は「年が終われば中身が凍結する」ページ＝サイトで唯一、時間とともに**ページ数が増える**層。
   だから年鑑だけはタイトルに年を入れてよい（追174-48）。
════════════════════════════════════════════════════ */
KTN.pages['p10-4-2'] = function () {
  var A = KTN.arc;
  var elList = document.getElementById('p1042List');
  if (!elList) return;

  var elTitle = document.getElementById('p1042Title');
  var elEn    = document.getElementById('p1042En');
  var elLead  = document.getElementById('p1042Lead');
  var elYears = document.getElementById('p1042YearNav');
  var elNote  = document.getElementById('p1042Note');
  var elPrev  = document.getElementById('p1042PrevCard');
  var elPrevT = document.getElementById('p1042PrevTtl');

  var year = A.defaultYear();
  var mode = 'want';

  function setMeta(id, attr, val) { var el = document.getElementById(id); if (el) el.setAttribute(attr, val); }

  /* 導入文と未記入時の自動文は KTN.axis が持つ（管理画面 P90-17 と同じ本文を見るため） */
  function leadOf(y) { return KTN.axis.leadOf('year', y); }

  function syncHead() {
    var t = year + '年の展覧会 年間の記録｜個展なび';
    document.title = t;
    if (elTitle) elTitle.textContent = year + '年の展覧会';
    if (elEn)    elEn.textContent = 'Exhibitions of ' + year;
    if (elLead)  elLead.innerHTML = leadOf(year);
    setMeta('p1042Desc', 'content', year + '年に会期を終えた展覧会の記録です。行きたい・行った の反応が多かった展覧会と、いまも活動しているクリエイター・ギャラリーをたどれます。');
    setMeta('p1042Canonical', 'href', 'https://koten-navi.com/exhibitions/year/' + year);
    setMeta('p1042OgTitle', 'content', t);
    setMeta('p1042OgUrl', 'href', 'https://koten-navi.com/exhibitions/year/' + year);
    setMeta('p1042OgUrl', 'content', 'https://koten-navi.com/exhibitions/year/' + year);

    /* 年別ナビはリンク（＝クローラから全年が見える）。現在年は is-on で押下済みにする */
    if (elYears) {
      elYears.innerHTML = A.YEARS.map(function (v) {
        return '<a class="p10-preset' + (v === year ? ' is-on' : '') + '" href="?y=' + v + '">' + v + '年</a>';
      }).join('');
    }

    /* 前年カードは「その年のページが存在するときだけ」出す＝行き止まりのリンクを作らない */
    if (elPrev) {
      var has = A.YEARS.indexOf(year - 1) > -1;
      elPrev.hidden = !has;
      if (has) {
        elPrev.href = '?y=' + (year - 1);
        if (elPrevT) elPrevT.textContent = (year - 1) + '年の展覧会';
      }
    }

    /* パンくず末尾＝年（PAGES は common.js のトップレベルなのでここから書き換えられる） */
    if (typeof PAGES !== 'undefined' && PAGES['p10-4-2']) PAGES['p10-4-2'].bc[3][0] = year + '年の展覧会';
  }

  function renderList() {
    document.querySelectorAll('.p10-rank-tab[data-arc]').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.arc === mode);
    });
    if (elNote) {
      var n = A.note(year);
      elNote.hidden = !n;
      elNote.textContent = n;
    }
    elList.innerHTML = A.rows(year, mode).map(A.build).join('');
  }

  /* admin にだけ出す編集導線の注記。年鑑は年が終われば凍結するので、非公開の反復は行わない */
  function syncRole() {
    if (!elLead) return;
    var isAdmin = (window.ktnState && window.ktnState.role) === 'admin';
    var note = elLead.querySelector('.ktn-axis-head__lead-note');
    if (isAdmin && !note) {
      var s = document.createElement('span');
      s.className = 'ktn-axis-head__lead-note';
      s.textContent = '管理者：この年の導入文は編集できます。年鑑は年が終わると内容が固定されるため、公開後にURLを変更したり非公開にしたりしません。';
      elLead.appendChild(s);
    } else if (!isAdmin && note) {
      note.remove();
    }
  }

  var _baseRender = window.ktnRender;
  window.ktnRender = function () {
    if (typeof PAGES !== 'undefined' && PAGES['p10-4-2']) PAGES['p10-4-2'].bc[3][0] = year + '年の展覧会';
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  };

  function apply(y) {
    if (A.YEARS.indexOf(y) === -1) y = A.defaultYear();
    year = y;
    syncHead();
    renderList();
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  }

  /* デモバーの年切替。本番はURL（/exhibitions/year/{y}）が年を決めるのでこの関数は消える */
  window.setArcYear = function (y, btn) {
    if (btn) {
      document.querySelectorAll('.dbar [data-y]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
    apply(+y);
  };

  document.querySelectorAll('.p10-rank-tab[data-arc]').forEach(function (b) {
    b.addEventListener('click', function () { mode = b.dataset.arc; renderList(); });
  });

  var q = new URLSearchParams(location.search);
  var qy = +q.get('y');
  var qm = q.get('m');
  if (qm === 'visited' || qm === 'want') mode = qm;
  if (A.YEARS.indexOf(qy) > -1) {
    document.querySelectorAll('.dbar [data-y]').forEach(function (b) {
      b.classList.toggle('on', +b.getAttribute('data-y') === qy);
    });
  }
  apply(qy || A.defaultYear());
};

/* ════════════════════════════════════════════════════
   P10-4-3  特集-展覧会-軸アーカイブ（場所 × 過去の開催記録）

   軸ページ（P10-4-1）は「開催中・開催予定」だけを載せる。過去を同居させると、
   その軸で一番よく検索される「いま何をやっているか」が薄まるうえ、件数だけが増えて
   ページの鮮度が読めなくなる（追174-45の母数分離）。
   そこで過去は別URL（/exhibitions/{slug}/archive）に切り出す。

   ここが独立URLである理由はもうひとつある。地方の軸は現在0件になる日が普通にあるが、
   その土地で「かつて何が開かれたか」は他のどのサイトにも無い記録で、時間が経つほど
   価値が上がる唯一の層。親へ寄せず自己参照 canonical を持たせて index させる（追174-46②）。
════════════════════════════════════════════════════ */
KTN.pages['p10-4-3'] = function () {

  var AX = KTN.axis;
  var fullName = AX.fullName, enName = AX.enName, fullOf = AX.fullOf;
  var SORTS = AX.SORTS, grid = AX.grid;
  /* 軸スラッグの解決は P10-4-1 と同じく AX のヘルパ経由（エリアを素通りさせない・追174-67）。
     アーカイブは会期終了で自動的に積み上がる層なので、エリアの粒度でも記録が消えることはない。 */

  /* 導入文と未記入時の自動文は KTN.axis が持つ（管理画面 P90-17 と同じ本文を見るため） */
  function leadOf(slug) { return AX.leadOf('archive', slug); }

  /* ── DOM ── */
  var elTitle   = document.getElementById('p1043Title');
  var elEn      = document.getElementById('p1043En');
  var elLead    = document.getElementById('p1043Lead');
  var elLinks   = document.getElementById('p1043HeadLinks');
  var elCount   = document.getElementById('p1043Count');
  var elSort    = document.getElementById('p1043Sort');
  var elEmpty   = document.getElementById('p1043Empty');
  var elGrid    = document.getElementById('p1043Grid');
  var elFill    = document.getElementById('p1043Fill');
  var elFillTtl = document.getElementById('p1043FillTitle');
  var elFillDsc = document.getElementById('p1043FillDesc');
  var elFillBlk = document.getElementById('p1043FillBlocks');
  var elPrefNav = document.getElementById('p1043PrefNav');
  var elLiveCard = document.getElementById('p1043LiveCard');
  var elLiveTtl  = document.getElementById('p1043LiveTtl');
  var elLiveDesc = document.getElementById('p1043LiveDesc');
  var elToolbar = document.querySelector('.p10-toolbar');
  if (!elGrid) return;

  var axis = 'tokyo';

  /* att＝追加属性（P10-4-1 と同じ。ログイン必須ページへのチップに data-guest="login" を持たせる） */
  function chip(label, href, on, mod, att) {
    return '<a class="p10-preset' + (mod ? ' ' + mod : '') + (on ? ' is-on' : '') + '"' + (att || '') + ' href="' + href + '">' + label + '</a>';
  }

  /* ── B. 一覧（会期を終えたもののみ）──
     既定は「終了が新しい順」。アーカイブで最初に見たいのは直近に見逃した展覧会なので、
     おすすめ順（人気）を既定にしない。 */
  function renderList() {
    var list = AX.byPref(axis, true).slice().sort(SORTS[elSort && elSort.value || 'last'] || SORTS.last);
    elGrid.innerHTML = list.map(buildGridEcCard).join('');
    if (elCount) elCount.innerHTML = '<strong>' + list.length + '</strong>件';
    if (elToolbar) elToolbar.style.display = list.length ? '' : 'none';
  }

  /* ── C. 補完（記録が少ない・無いとき）──
     アーカイブが0件でもページは残す（会期が終わるたびに中身が増える器なので、
     今日0件でも来月には入る＝URLを消すと積み上がらない）。 */
  var FILL_MIN = 3;
  function renderFill() {
    var full = fullOf(axis), block = AX.blockOf(axis), par = AX.parentOf(axis);
    var arc = AX.byPref(axis, true);
    if (arc.length >= FILL_MIN) { elFill.hidden = true; if (elEmpty) elEmpty.hidden = true; return; }

    var blocks = [];
    /* ① 同一場所でいま開催中（アーカイブに来た人が次に行けるのは現在の展覧会） */
    var cur = AX.byPref(axis, false);
    if (cur.length) blocks.push({
      ttl: full + 'で開催中・開催予定の展覧会',
      why: 'いま会場で見られる展覧会です。記録ではなく、これから記録になるもの。',
      body: grid(cur.slice().sort(SORTS.end))
    });
    /* ② 同一場所のギャラリー（場所で絞れるのはギャラリーだけ＝追174-50） */
    var gal = AX.galleryOf(axis);
    if (gal.length) blocks.push({
      ttl: full + 'のギャラリー',
      why: 'このエリアに会場を持つギャラリーです。過去の展示はギャラリーのページにも残っています。',
      body: '<div class="ktn-axis-fill-cards">' + gal.map(function (p) {
        return buildPersonCard(Object.assign({ panel: 1 }, p));
      }).join('') + '</div>'
    });
    /* ③ 街なら親県のアーカイブ、県なら同じ地方ブロックのアーカイブ（P10-4-1 と同じ寄せ方） */
    var nb;
    if (par) {
      nb = AX.byPref(par, true).filter(function (x) { return x.varea !== axis; });
      if (nb.length) blocks.push({
        ttl: fullOf(par) + 'の展覧会アーカイブ',
        why: full + 'と同じ' + fullOf(par) + 'で会期を終えた展覧会です。',
        body: grid(nb.slice().sort(SORTS.last))
      });
    } else {
      nb = AX.EX.filter(function (x) {
        return x.status === 'ended' && x.pref !== axis && AX.blockOf(x.pref) === block;
      });
      if (nb.length) blocks.push({
        ttl: block + 'の展覧会アーカイブ',
        why: full + 'と同じ' + block + 'のエリアで会期を終えた展覧会です。',
        body: grid(nb.slice().sort(SORTS.last))
      });
    }
    /* ④ 全国（③まででも足りないとき） */
    if (!nb.length) {
      var nat = AX.EX.filter(function (x) { return x.status === 'ended' && x.pref !== (par || axis); })
        .sort(SORTS.last).slice(0, 3);
      if (nat.length) blocks.push({
        ttl: '全国の展覧会アーカイブ',
        why: '近いエリアに記録がまだ無いため、全国から直近で会期を終えた展覧会を表示しています。',
        body: grid(nat)
      });
    }

    elFillTtl.textContent = arc.length ? full + 'とあわせて見る' : full + 'から見られるもの';
    elFillDsc.textContent = full + 'に関わるページと、近いエリアの記録です。';
    elFillBlk.innerHTML = AX.fillHtml(blocks);
    elFill.hidden = false;

    if (elEmpty) {
      if (arc.length) { elEmpty.hidden = true; }
      else {
        elEmpty.textContent = full + 'では、個展なびに掲載したあとに会期を終えた展覧会がまだありません。'
          + (cur.length ? 'いま開催中の展覧会が終われば、この記録に加わります。' : '掲載された展覧会が会期を終えると、この記録に加わります。');
        elEmpty.hidden = false;
      }
    }
  }

  /* ── D. 軸ネットワーク ──
     アーカイブ同士を47都道府県で横につなぐ。現在0件の県でも記録は残るので、
     ここは軸ページ本体よりリンクが死ににくい層になる。 */
  function renderNav() {
    if (!elPrefNav) return;
    elPrefNav.innerHTML = '<div class="ktn-axis-nav__prefs">' + AX.GROUPS.map(function (g) {
      return '<div class="p10-adv__pref-group">'
        + '<div class="p10-adv__pref-label">' + g[0] + '</div>'
        + '<div class="p10-adv__panel-chips">' + g[1].map(function (p) {
            var sl = AX.SLUGS[p];
            /* エリアチップは親県の直後・通称も添える（P10-4-1 と同じ・追174-67／2026-09-08） */
            return chip(fullName(p), '?ax=' + sl, sl === axis)
              + AX.areasOf(sl).map(function (a) {
                  return chip(a.name + (a.alias ? '<span class="p10-preset__alias">' + a.alias + '</span>' : ''),
                    '?ax=' + a.slug, a.slug === axis, 'p10-preset--area');
                }).join('');
          }).join('') + '</div></div>';
    }).join('') + '</div>';
  }

  function syncBc(full) {
    if (typeof PAGES !== 'undefined' && PAGES['p10-4-3']) {
      PAGES['p10-4-3'].bc[3][0] = full + 'の展覧会';
      PAGES['p10-4-3'].bc[3][1] = 'kotennavi-p10-4-1.html?ax=' + axis;
    }
  }
  function setMeta(id, attr, val) { var el = document.getElementById(id); if (el) el.setAttribute(attr, val); }

  function syncHead() {
    var full = fullOf(axis), en = enName(axis), par = AX.parentOf(axis);
    var url = 'https://koten-navi.com/exhibitions/' + axis + '/archive';
    var title = full + 'の展覧会アーカイブ 過去の開催記録｜個展なび';
    document.title = title;
    if (elTitle) elTitle.textContent = full + 'の展覧会アーカイブ';
    if (elEn) elEn.textContent = 'Past Exhibitions in ' + en;
    setMeta('p1043Desc', 'content', full + AX.prefNote(axis)
      + 'でこれまでに開催された展覧会・個展の記録です。会期を終えた展示を、会場別・ジャンル別にさかのぼって見られます。');
    /* 自己参照 canonical。親（軸ページ）へ寄せると、この記録の層が検索結果から消える（追174-46②） */
    setMeta('p1043Canonical', 'href', url);
    setMeta('p1043OgTitle', 'content', title);
    setMeta('p1043OgUrl', 'content', url);
    if (elLead) elLead.innerHTML = leadOf(axis);
    if (elLinks) {
      elLinks.innerHTML =
          chip(full + 'で開催中の展覧会', AX.href(axis))
        + (par ? chip(fullOf(par) + 'の展覧会アーカイブ', AX.archiveHref(par)) : '')
        + chip(full + 'のギャラリー', './kotennavi-p10-7.html', 0, 0, ' data-guest="login"')
        /* 年鑑チップだけ「全国」と名乗る＝両隣が「東京都の…」なので、素の『年間の記録』だと
           このエリアの年間記録と読まれる（軸で絞らない全国の記録・2026-09-08） */
        + chip('全国の展覧会 年間の記録', './kotennavi-p10-4-2.html');
    }
    if (elLiveCard) elLiveCard.href = AX.href(axis);
    if (elLiveTtl) elLiveTtl.textContent = full + 'の展覧会';
    if (elLiveDesc) elLiveDesc.textContent = full + 'でいま開催中・開催予定の展覧会。会期が終わったものはこのアーカイブに移ります。';
    syncBc(full);
  }

  function syncRole() {
    if (!elLead) return;
    var note = elLead.querySelector('.ktn-axis-head__lead-note');
    var isAdmin = (window.ktnState && window.ktnState.role) === 'admin';
    if (isAdmin && !note) {
      var el = document.createElement('span');
      el.className = 'ktn-axis-head__lead-note';
      el.textContent = '管理者：この導入文は軸ごとに編集できます。アーカイブは会期終了で自動的に積み上がる層なので、掲載の取り下げは行いません。';
      elLead.appendChild(el);
    } else if (!isAdmin && note) {
      note.remove();
    }
  }

  var _baseRender = window.ktnRender;
  window.ktnRender = function () {
    syncBc(fullOf(axis));
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  };

  function apply(slug) {
    if (!AX.has(slug)) slug = 'tokyo';
    axis = slug;
    syncHead();
    renderList();
    renderFill();
    renderNav();
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  }

  /* デモバーの軸切替。本番はURL（/exhibitions/{slug}/archive）が軸を決めるのでこの関数は消える */
  window.setAxis = function (slug, btn) {
    if (btn) {
      document.querySelectorAll('.dbar [data-ax]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
    apply(slug);
  };

  if (elSort) elSort.addEventListener('change', renderList);

  var q = new URLSearchParams(location.search).get('ax');
  if (q && AX.has(q)) {
    document.querySelectorAll('.dbar [data-ax]').forEach(function (b) {
      b.classList.toggle('on', (b.getAttribute('onclick') || '').indexOf("'" + q + "'") > -1);
    });
  }
  apply(q || 'tokyo');
};

/* ════════════════════════════════════════════════════
   P10-4-4  特集-展覧会-ジャンル軸（ジャンル × 全国）

   場所軸と並ぶもうひとつの単独軸。URLは接頭辞つきの /exhibitions/genre/{slug}
   （場所だけが無印＝いちばん検索される軸を最短URLに置く＝追174-46②）。
   スラッグは概念語なので英語。ローマ字にすると「クラフト」が kurafuto になり破綻する。

   場所軸との役割分担が重要：**クリエイターと作品は場所情報を持たない**（追174-50）ので、
   〈場所 × クリエイター〉〈場所 × 作品〉は作れない。人と作品へ内部リンクを張れるのは
   ジャンル軸のほう。場所軸＝展覧会とギャラリー、ジャンル軸＝クリエイターと作品、と
   接続先を分けることで、どちらの軸も張り先が空にならない。
════════════════════════════════════════════════════ */
KTN.pages['p10-4-4'] = function () {

  var AX = KTN.axis;
  var SORTS = AX.SORTS, grid = AX.grid;

  /* 導入文と未記入時の自動文は KTN.axis が持つ（管理画面 P90-17 と同じ本文を見るため） */
  function leadOf(g) { return AX.leadOf('genre', g.slug); }

  /* ── DOM ── */
  var elTitle   = document.getElementById('p1044Title');
  var elEn      = document.getElementById('p1044En');
  var elLead    = document.getElementById('p1044Lead');
  var elLinks   = document.getElementById('p1044HeadLinks');
  var elCount   = document.getElementById('p1044Count');
  var elSort    = document.getElementById('p1044Sort');
  var elEmpty   = document.getElementById('p1044Empty');
  var elGrid    = document.getElementById('p1044Grid');
  var elSearch  = document.getElementById('p1044SearchLink');
  var elFill    = document.getElementById('p1044Fill');
  var elFillTtl = document.getElementById('p1044FillTitle');
  var elFillDsc = document.getElementById('p1044FillDesc');
  var elFillBlk = document.getElementById('p1044FillBlocks');
  var elGenreNav = document.getElementById('p1044GenreNav');
  var elPrefNav  = document.getElementById('p1044PrefNav');
  var elFacet    = document.getElementById('p1044Facet');
  var elFacetNav = document.getElementById('p1044FacetNav');
  var elToolbar = document.querySelector('.p10-toolbar');
  if (!elGrid) return;

  var gn = AX.genre('art');

  function chip(label, href, on, mod) {
    return '<a class="p10-preset' + (mod ? ' ' + mod : '') + (on ? ' is-on' : '') + '" href="' + href + '">' + label + '</a>';
  }

  function renderList() {
    var list = AX.byGenre(gn.name, false).slice().sort(SORTS[elSort && elSort.value || 'rec'] || SORTS.rec);
    elGrid.innerHTML = list.map(buildGridEcCard).join('');
    if (elCount) elCount.innerHTML = '<strong>' + list.length + '</strong>件';
    if (elToolbar) elToolbar.style.display = list.length ? '' : 'none';
    if (elSearch) elSearch.textContent = list.length ? '条件を足して絞り込む →' : '全国の展覧会を検索する →';
  }

  /* ── 補完（0件・少件数）。場所軸と同じ規約（追174-46⑤）だが、ジャンル軸には
     「同じ地方ブロック」に当たる近さの概念が無いので、②を〈同ジャンルのアーカイブ〉、
     ③を〈近い性格の他ジャンル〉に置き換える。 */
  var FILL_MIN = 4;
  /* 近さは6区分どうしの関係で持つ（「その他」は中身が雑多で近さを名乗れないので入れない）。
     技法（絵画・版画・陶芸…）はジャンルではなくタグなのでここには来ない（追174-76）。 */
  var NEIGHBOR = {
    art:     ['photo', 'craft'],
    photo:   ['art', 'arch'],
    craft:   ['art', 'fashion'],
    arch:    ['photo', 'craft'],
    fashion: ['craft', 'art']
  };
  function renderFill() {
    var cur = AX.byGenre(gn.name, false);
    if (cur.length >= FILL_MIN) { elFill.hidden = true; if (elEmpty) elEmpty.hidden = true; return; }

    var blocks = [];
    /* ① 同ジャンルのアーカイブ */
    var arc = AX.byGenre(gn.name, true);
    if (arc.length) blocks.push({
      ttl: gn.name + 'で会期を終えた展覧会',
      why: '会期は終わっていますが、出品したクリエイターとギャラリーはいまも活動しています。',
      body: grid(arc.slice().sort(SORTS.last))
    });
    /* ② 近い性格の他ジャンル */
    var near = (NEIGHBOR[gn.slug] || []).map(AX.genre).filter(Boolean);
    var nb = AX.EX.filter(function (x) {
      return x.status !== 'ended' && near.some(function (g) { return g.name === x.genre; });
    });
    if (nb.length) blocks.push({
      ttl: near.map(function (g) { return g.name; }).join('・') + 'の展覧会',
      why: gn.name + 'と技法や見え方が近いジャンルです。' + near.map(function (g) { return g.name; }).join('・') + 'から探すこともできます。',
      body: grid(nb.slice().sort(SORTS.end))
    });
    /* ③ 全国（②まででも足りないとき） */
    if (!nb.length) {
      var nat = AX.EX.filter(function (x) { return x.status !== 'ended' && x.genre !== gn.name; })
        .sort(SORTS.pop).slice(0, 3);
      if (nat.length) blocks.push({
        ttl: '全国の展覧会',
        why: '近いジャンルにも会期中の展覧会がないため、全国から反応の多いものを表示しています。',
        body: grid(nat)
      });
    }

    elFillTtl.textContent = cur.length ? gn.name + 'とあわせて見る' : gn.name + 'から見られるもの';
    elFillDsc.textContent = gn.name + 'に関わるページと、近いジャンルで開催中の展覧会です。';
    elFillBlk.innerHTML = AX.fillHtml(blocks);
    elFill.hidden = false;

    if (elEmpty) {
      if (cur.length) { elEmpty.hidden = true; }
      else {
        elEmpty.textContent = gn.name + 'では現在、開催中・開催予定の展覧会がありません。'
          + (arc.length ? '直近で会期を終えた' + gn.name + 'の展覧会と、近いジャンルで開催中の展覧会をご覧いただけます。'
                        : '近いジャンルで開催中の展覧会をご覧いただけます。');
        elEmpty.hidden = false;
      }
    }
  }

  function renderNav() {
    if (elGenreNav) {
      elGenreNav.innerHTML = AX.AXIS_GENRES.map(function (g) {
        return chip(g.name + 'の展覧会', '?gn=' + g.slug, g.slug === gn.slug);
      }).join('');
    }
    /* 〈場所 × ジャンル〉の交差の入口（追174-58）。順序は「場所 → 軸」で固定なので着地は場所軸ページ
       （/exhibitions/{pref}/genre/{slug}＝P10-4-1）＝ジャンル側から入っても同じURLに着く。
       入口は一覧の直上の絞り込みバーへ置く（追174-63）＝操作を対象の隣に置き、下段Dは「別の軸ページへ
       移る」内部リンク層に徹させる（上＝絞る／下＝移る・P10-4-1と同じ形）。
       掲載のあるエリアだけを件数つきで出す＝0件の交差URLを作らない。1件も無ければバーごと出さない。 */
    if (elFacet) {
      var cnt = {};
      AX.byGenre(gn.name, false).forEach(function (x) { cnt[x.pref] = (cnt[x.pref] || 0) + 1; });
      var hit = AX.GROUPS.reduce(function (a, g) { return a.concat(g[1]); }, [])
        .filter(function (p) { return cnt[AX.SLUGS[p]]; });
      elFacet.hidden = !hit.length;
      if (elFacetNav) elFacetNav.innerHTML = hit.map(function (p) {
        var sl = AX.SLUGS[p];
        return chip(AX.fullName(p) + '<span class="ktn-count">' + cnt[sl] + '件</span>',
          './kotennavi-p10-4-1.html?ax=' + sl + '&gn=' + gn.slug);
      }).join('');
    }
    /* 下段Dは47都道府県すべてを無印の場所軸へ張る＝44県を死にリンクにしない（追174-46⑤）。
       上（交差）と下（場所軸）で行き先が1対1になるので、同じ見た目のチップが2つの意味を持たない。 */
    if (elPrefNav) {
      elPrefNav.innerHTML = '<div class="ktn-axis-nav__prefs">' + AX.GROUPS.map(function (g) {
        return '<div class="p10-adv__pref-group">'
          + '<div class="p10-adv__pref-label">' + g[0] + '</div>'
          + '<div class="p10-adv__panel-chips">' + g[1].map(function (p) {
              return chip(AX.fullName(p), AX.href(AX.SLUGS[p]));
            }).join('') + '</div></div>';
      }).join('') + '</div>';
    }
  }

  function syncBc() {
    if (typeof PAGES !== 'undefined' && PAGES['p10-4-4']) PAGES['p10-4-4'].bc[3][0] = gn.name + 'の展覧会';
  }
  function setMeta(id, attr, val) { var el = document.getElementById(id); if (el) el.setAttribute(attr, val); }

  function syncHead() {
    var url = 'https://koten-navi.com/exhibitions/genre/' + gn.slug;
    var title = gn.name + 'の展覧会・個展 開催情報｜個展なび';
    document.title = title;
    if (elTitle) elTitle.textContent = gn.name + 'の展覧会';
    if (elEn) elEn.textContent = gn.en + ' Exhibitions';
    setMeta('p1044Desc', 'content', gn.name + 'の展覧会・個展を全国からまとめた一覧です。ギャラリー・美術館で開催中・開催予定の' + gn.name + '展を、エリア別・会期順に探せます。');
    setMeta('p1044Canonical', 'href', url);
    setMeta('p1044OgTitle', 'content', title);
    setMeta('p1044OgUrl', 'content', url);
    if (elLead) elLead.innerHTML = leadOf(gn);
    /* 〈軸 × エンティティ〉の内部リンク。ジャンルはクリエイター・作品が持つ属性なので、
       場所軸では張れなかった人・作品への接続をここが担う（追174-50）。 */
    if (elLinks) {
      elLinks.innerHTML =
        /* 出すのは〈このジャンル × エンティティ〉だけ。旧「エリアから探す」チップは2026-09-09に削除＝
           一覧直上の「エリアで絞る」バーと下段Dの47県グリッドが同じ行き先をすぐ下に持っており、
           押しても結局スクロールで届く位置の重複だったため（P10-4-1 と同じ判断） */
          chip(gn.name + 'のクリエイター', './kotennavi-p10-6.html')
        + chip(gn.name + 'の作品', './kotennavi-p10-5.html');
    }
    syncBc();
  }

  function syncRole() {
    if (!elLead) return;
    var note = elLead.querySelector('.ktn-axis-head__lead-note');
    var isAdmin = (window.ktnState && window.ktnState.role) === 'admin';
    if (isAdmin && !note) {
      var el = document.createElement('span');
      el.className = 'ktn-axis-head__lead-note';
      el.textContent = '管理者：この導入文はジャンルごとに編集できます。軸ページ自体の公開/非公開は切り替えず、ハブへの掲載だけで露出を調整します。';
      elLead.appendChild(el);
    } else if (!isAdmin && note) {
      note.remove();
    }
  }

  var _baseRender = window.ktnRender;
  window.ktnRender = function () {
    syncBc();
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  };

  function apply(slug) {
    gn = AX.genre(slug) || AX.genre('art');
    syncHead();
    renderList();
    renderFill();
    renderNav();
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  }

  /* デモバーの軸切替。本番はURL（/exhibitions/genre/{slug}）が軸を決めるのでこの関数は消える */
  window.setGenre = function (slug, btn) {
    if (btn) {
      document.querySelectorAll('.dbar [data-gn]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
    apply(slug);
  };

  if (elSort) elSort.addEventListener('change', renderList);

  var q = new URLSearchParams(location.search).get('gn');
  if (q && AX.genre(q)) {
    document.querySelectorAll('.dbar [data-gn]').forEach(function (b) {
      b.classList.toggle('on', (b.getAttribute('onclick') || '').indexOf("'" + q + "'") > -1);
    });
  }
  apply(q || 'photo');
};

/* ════════════════════════════════════════════════════
   P10-4-5  特集-展覧会-アクセシビリティ軸（/exhibitions/access/{slug}）

   場所・ジャンルが「何を見るか」の軸なのに対し、この軸は「行けるかどうか」。
   子どもと一緒に入れるか・作者に会えるかは、ジャンルより手前で行き先を決めてしまう条件なので、
   検索チップの中に畳んでおくだけでは足りず、単独軸として恒久URLを持たせる（追174-46②／追174-54）。

   P10 の「こだわり条件」チップ（kids:1 / attend:1）と同じフィールドを見るので、
   チップで絞った結果とこの軸ページの中身は常に一致する。母数は展覧会側の入力なので、
   未入力を減らす仕掛け（P2-11 の未入力リマインド）とセットで効く。
   来場者に許可語（可／不可）を向けないため、見出しもチップも可能性の形で書く（追174-52）。
════════════════════════════════════════════════════ */
KTN.pages['p10-4-5'] = function () {

  var AX = KTN.axis;
  var SORTS = AX.SORTS, grid = AX.grid;

  var DESC = {
    'with-children': 'お子さまとご一緒にご来場いただける展覧会・個展を全国からまとめた一覧です。開催中・開催予定の展覧会を、エリア別・会期順に探せます。',
    'artist-present': 'クリエイターが在廊する展覧会・個展を全国からまとめた一覧です。会場で作者に会える開催中・開催予定の展覧会を、エリア別・会期順に探せます。'
  };
  /* 導入文と未記入時の自動文は KTN.axis が持つ（管理画面 P90-17 と同じ本文を見るため） */
  function leadOf(a) { return AX.leadOf('access', a.slug); }
  function descOf(a) { return DESC[a.slug] || a.ttl + 'を全国からまとめた一覧です。開催中・開催予定の展覧会を、エリア別・会期順に探せます。'; }

  /* ── DOM ── */
  var elTitle   = document.getElementById('p1045Title');
  var elEn      = document.getElementById('p1045En');
  var elLead    = document.getElementById('p1045Lead');
  var elLinks   = document.getElementById('p1045HeadLinks');
  var elCount   = document.getElementById('p1045Count');
  var elSort    = document.getElementById('p1045Sort');
  var elEmpty   = document.getElementById('p1045Empty');
  var elGrid    = document.getElementById('p1045Grid');
  var elSearch  = document.getElementById('p1045SearchLink');
  var elFill    = document.getElementById('p1045Fill');
  var elFillTtl = document.getElementById('p1045FillTitle');
  var elFillDsc = document.getElementById('p1045FillDesc');
  var elFillBlk = document.getElementById('p1045FillBlocks');
  var elAcNav   = document.getElementById('p1045AccessNav');
  var elPrefNav = document.getElementById('p1045PrefNav');
  var elFacet   = document.getElementById('p1045Facet');
  var elFacetNav= document.getElementById('p1045FacetNav');
  var elToolbar = document.querySelector('.p10-toolbar');
  if (!elGrid) return;

  var ac = AX.access('with-children');

  function chip(label, href, on, mod) {
    return '<a class="p10-preset' + (mod ? ' ' + mod : '') + (on ? ' is-on' : '') + '" href="' + href + '">' + label + '</a>';
  }

  function renderList() {
    var list = AX.byAccess(ac.slug, false).slice().sort(SORTS[elSort && elSort.value || 'rec'] || SORTS.rec);
    elGrid.innerHTML = list.map(buildGridEcCard).join('');
    if (elCount) elCount.innerHTML = '<strong>' + list.length + '</strong>件';
    if (elToolbar) elToolbar.style.display = list.length ? '' : 'none';
    if (elSearch) elSearch.textContent = list.length ? '条件を足して絞り込む →' : '全国の展覧会を検索する →';
  }

  /* ── 補完（0件・少件数）。規約の順序は場所軸・ジャンル軸と同じ（追174-46⑤）。
     この軸には「近いジャンル」に当たる隣接が無いので、②はもう一方の行きやすさ軸を出す。
     どちらも「行けるかどうか」で探している人なので、条件を横に移す提案として成立する。 */
  var FILL_MIN = 4;
  var OTHER = { 'with-children': 'artist-present', 'artist-present': 'with-children' };
  var OTHER_WHY = {
    'with-children': 'お子さまとご一緒にご来場いただける展覧会です。',
    'artist-present': '会期中にクリエイターが在廊する展覧会です。作品の前で直接話を聞けます。'
  };
  function renderFill() {
    var cur = AX.byAccess(ac.slug, false);
    if (cur.length >= FILL_MIN) { elFill.hidden = true; if (elEmpty) elEmpty.hidden = true; return; }

    var blocks = [];
    /* ① 同じ条件で会期を終えたもの */
    var arc = AX.byAccess(ac.slug, true);
    if (arc.length) blocks.push({
      ttl: ac.ttl + 'の記録',
      why: '会期は終わっていますが、出品したクリエイターとギャラリーはいまも活動しています。',
      body: grid(arc.slice().sort(SORTS.last))
    });
    /* ② もう一方の行きやすさ軸 */
    var oth = AX.access(OTHER[ac.slug]);
    var ob = oth ? AX.byAccess(oth.slug, false) : [];
    if (ob.length) blocks.push({
      ttl: oth.ttl,
      why: OTHER_WHY[oth.slug] || '',
      body: grid(ob.slice().sort(SORTS.end))
    });
    /* ③ 全国（②まででも足りないとき） */
    if (!ob.length) {
      var nat = AX.EX.filter(function (x) { return x.status !== 'ended'; }).sort(SORTS.pop).slice(0, 3);
      if (nat.length) blocks.push({
        ttl: '全国の展覧会',
        why: 'いまはこの条件で会期中のものが少ないため、全国から反応の多い展覧会を表示しています。',
        body: grid(nat)
      });
    }

    elFillTtl.textContent = cur.length ? ac.ttl + 'とあわせて見る' : 'ほかに見られるもの';
    elFillDsc.textContent = 'この条件に近い展覧会と、会期を終えた記録です。';
    elFillBlk.innerHTML = AX.fillHtml(blocks);
    elFill.hidden = false;

    if (elEmpty) {
      if (cur.length) { elEmpty.hidden = true; }
      else {
        elEmpty.textContent = '現在、開催中・開催予定の' + ac.ttl + 'はありません。'
          + (arc.length ? '直近で会期を終えたものと、近い条件で開催中の展覧会をご覧いただけます。'
                        : '近い条件で開催中の展覧会をご覧いただけます。');
        elEmpty.hidden = false;
      }
    }
  }

  function renderNav() {
    if (elAcNav) {
      elAcNav.innerHTML = AX.ACCESS.map(function (a) {
        return chip(a.ttl, '?ac=' + a.slug, a.slug === ac.slug);
      }).join('');
    }
    /* 〈場所 × 行きやすさ〉の交差の入口（追174-58）。順序は「場所 → 軸」で固定なので着地は場所軸ページ
       （/exhibitions/{pref}/access/{slug}＝P10-4-1）＝行きやすさ側から入っても同じURLに着く。
       入口は一覧の直上の絞り込みバーへ置く（追174-63）＝操作を対象の隣に置き、下段Dは「別の軸ページへ
       移る」内部リンク層に徹させる（上＝絞る／下＝移る・P10-4-1と同じ形）。
       母数は展覧会側の入力なので、申告がまだ無いエリアは0件ではなく「未入力」であることが多い。
       だから交差チップに出すのは掲載があるエリアだけで、残りは下段Dの無印の場所軸リンクが受ける。 */
    if (elFacet) {
      var cnt = {};
      AX.byAccess(ac.slug, false).forEach(function (x) { cnt[x.pref] = (cnt[x.pref] || 0) + 1; });
      var hit = AX.GROUPS.reduce(function (a, g) { return a.concat(g[1]); }, [])
        .filter(function (p) { return cnt[AX.SLUGS[p]]; });
      elFacet.hidden = !hit.length;
      if (elFacetNav) elFacetNav.innerHTML = hit.map(function (p) {
        var sl = AX.SLUGS[p];
        return chip(AX.fullName(p) + '<span class="ktn-count">' + cnt[sl] + '件</span>',
          './kotennavi-p10-4-1.html?ax=' + sl + '&ac=' + ac.slug);
      }).join('');
    }
    /* 下段Dは47都道府県すべてを無印の場所軸へ張る＝44県を死にリンクにしない（追174-46⑤）。
       上（交差）と下（場所軸）で行き先が1対1になるので、同じ見た目のチップが2つの意味を持たない。 */
    if (elPrefNav) {
      elPrefNav.innerHTML = '<div class="ktn-axis-nav__prefs">' + AX.GROUPS.map(function (g) {
        return '<div class="p10-adv__pref-group">'
          + '<div class="p10-adv__pref-label">' + g[0] + '</div>'
          + '<div class="p10-adv__panel-chips">' + g[1].map(function (p) {
              return chip(AX.fullName(p), AX.href(AX.SLUGS[p]));
            }).join('') + '</div></div>';
      }).join('') + '</div>';
    }
  }

  function syncBc() {
    if (typeof PAGES !== 'undefined' && PAGES['p10-4-5']) PAGES['p10-4-5'].bc[3][0] = ac.ttl;
  }
  function setMeta(id, attr, val) { var el = document.getElementById(id); if (el) el.setAttribute(attr, val); }

  function syncHead() {
    var url = 'https://koten-navi.com/exhibitions/access/' + ac.slug;
    var title = ac.ttl + 'の開催情報｜個展なび';
    document.title = title;
    if (elTitle) elTitle.textContent = ac.ttl;
    if (elEn) elEn.textContent = ac.en + ' Exhibitions';
    setMeta('p1045Desc', 'content', descOf(ac));
    setMeta('p1045Canonical', 'href', url);
    setMeta('p1045OgTitle', 'content', title);
    setMeta('p1045OgUrl', 'content', url);
    if (elLead) elLead.innerHTML = leadOf(ac);
    /* 行きやすさは展覧会にしか無い属性（クリエイター・作品・ギャラリーは持たない）。
       ジャンル軸のように人・作品へは張らず、他の軸の索引へ横に出す。 */
    if (elLinks) {
      var oth = AX.access(OTHER[ac.slug]);
      elLinks.innerHTML =
        /* 「エリアから探す」は2026-09-09に削除＝「エリアで絞る」バーと下段Dの47県グリッドが
           すぐ下にある重複（P10-4-1・P10-4-4 と同じ判断）。「ジャンルから探す」は残す＝
           このページには下にジャンルの層が無く、重複ではないため */
          (oth ? chip(oth.ttl, AX.accessHref(oth.slug)) : '')
        + chip('ジャンルから探す', './kotennavi-p10-4.html#genre');
    }
    syncBc();
  }

  function syncRole() {
    if (!elLead) return;
    var note = elLead.querySelector('.ktn-axis-head__lead-note');
    var isAdmin = (window.ktnState && window.ktnState.role) === 'admin';
    if (isAdmin && !note) {
      var el = document.createElement('span');
      el.className = 'ktn-axis-head__lead-note';
      el.textContent = '管理者：この軸の母数は展覧会側の入力（お子さま連れ・クリエイター在廊）です。件数が伸びないときはページを直すより、主催者向けの未入力リマインドで母数を増やします。';
      elLead.appendChild(el);
    } else if (!isAdmin && note) {
      note.remove();
    }
  }

  var _baseRender = window.ktnRender;
  window.ktnRender = function () {
    syncBc();
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  };

  function apply(slug) {
    ac = AX.access(slug) || AX.access('with-children');
    syncHead();
    renderList();
    renderFill();
    renderNav();
    if (typeof _baseRender === 'function') _baseRender();
    syncRole();
  }

  /* デモバーの軸切替。本番はURL（/exhibitions/access/{slug}）が軸を決めるのでこの関数は消える */
  window.setAccess = function (slug, btn) {
    if (btn) {
      document.querySelectorAll('.dbar [data-ac]').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
    }
    apply(slug);
  };

  if (elSort) elSort.addEventListener('change', renderList);

  var q = new URLSearchParams(location.search).get('ac');
  if (q && AX.access(q)) {
    document.querySelectorAll('.dbar [data-ac]').forEach(function (b) {
      b.classList.toggle('on', (b.getAttribute('onclick') || '').indexOf("'" + q + "'") > -1);
    });
  }
  apply(q || 'with-children');
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
    { id: 6,  title: '海と孤影 — 山根拓 写真展', venue: 'フォトスペース博多', area: '福岡', s: '07.10', e: '08.02', hours: '11:00–18:00', status: 'soon',   remain: '2日後に開催',  rd: 99, tags: ['写真'], liaison: '',        pop: 62, int: 74,  ci: 0,  dist: null,    isNew: 1, watched: 1, imgH: 235, bg: 'linear-gradient(135deg,#3a5a7a,#1e3448)' },
    { id: 7,  title: '筆の呼吸 — 二人の書', venue: '大阪墨美堂', area: '大阪', s: '07.08', e: '07.14', hours: '10:00–18:00', status: 'live',   remain: '残り6日',  rd: 6,  tags: ['書道'], liaison: '',        pop: 55, int: 62,  ci: 18, dist: null,    isNew: 0, imgH: 180, bg: 'linear-gradient(135deg,#4a4a4a,#1e1e1e)' },
    { id: 8,  title: '都市の水彩 — 岡島みのり', venue: '横浜アートポート', area: '神奈川', s: '06.22', e: '07.11', hours: '11:00–19:00', status: 'ending', remain: '残り3日',  rd: 3,  tags: ['絵画'], liaison: '',        pop: 58, int: 87,  ci: 31, dist: '5.6km', isNew: 0, mine: 1, imgH: 210, bg: 'linear-gradient(135deg,#6a9ab0,#3a5e74)' },
    { id: 9,  title: '陶と土のリズム', venue: '瀬戸クラフト館', area: '愛知', s: '07.08', e: '07.23', hours: '10:00–17:00', status: 'live',   remain: '残り15日', rd: 15, tags: ['陶芸', 'クラフト'], liaison: '',        pop: 49, int: 53,  ci: 12, dist: null,    isNew: 0, imgH: 195, bg: 'linear-gradient(135deg,#9a8a6a,#5e5238)' },
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

  /* ── D2. 巻頭（Opening） ── ※DOM上はD（サイト紹介）の直後
     展覧会以外（作品・記事・レビュー・クリエイター・ギャラリー）も混ぜた6スロットのコラージュ。
     いきなり冒頭に置くと唐突なため、サイトの説明を読んだ直後＝「他にどんなものがあるか」を見せる位置に
     配置する（2026-08-30・ユーザー判断）。スロットの種別は固定・中身だけ毎回入れ替わる＝「今号の並び」で
     あり、引き直しボタンや抽選演出は置かない（占い/くじ引きの語彙はサイトのトーンに合わない）。
     セクション内に一覧リンクを置かないのは、作品/クリエイター/ギャラリーの検索・一覧がログイン必須で、
     ゲストが巻頭からゲートに突き当たるのを避けるため（個別ページの閲覧自体は制限なし）。

     【対（ペア）表示・2026-08-30 案1】作品も記事もレビューも人も、すべて何らかの展覧会に紐づく。
     そこで1スロット＝「コンテンツ＋その展覧会」の対で見せ、"展覧会が中心・周辺コンテンツが厚い"を誌面で
     表現する。展覧会そのもののスロットは置かない（6スロット全部が展覧会を連れてくるため冗長）。
     展覧会IDは6スロットで重複させない＝1画面で最大6会場を露出できる（案2〔3クラスタ〕でなく案1を採った
     理由がこの露出数・ユーザー判断）。関係（出品展・訪れた展覧会…）は cb バッジでなくテキストで示す
     （バッジは自分自身のタイトル前のみに使う原則）。 */
  (function () {
    var mosaic = document.getElementById('p1OpMosaic');
    if (!mosaic) return;
    function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

    var now = new Date();

    /* マストヘッド右端の日付＝雑誌の号数の代わり。並びが訪問ごとに変わるので「この日の紙面」と読ませる */
    var issue = document.getElementById('p1OpIssue');
    if (issue) {
      var pad = function (v) { return (v < 10 ? '0' : '') + v; };
      issue.textContent = now.getFullYear() + '.' + pad(now.getMonth() + 1) + '.' + pad(now.getDate());
    }

    /* 柱（見出し＋欧文サブ）は日替わり＝雑誌の号ごとに柱の言い回しが変わるイメージ。
       選択は日付（通算日）で決めるので **同じ日は何度リロードしても同じ文言**（リロードで文言まで
       変わると「引き直し」に見えるため。ランダムに変えてよいのは中身の並びだけ）。
       日本語と欧文サブは対で差し替える（意味がずれないよう1組で管理）。 */
    var TITLES = [
      { ja: '話題は、展覧会のまわりに', en: 'Exhibitions and Everything Around Them' },
      { ja: 'いま、話題のはじまり',     en: 'Where the Conversation Starts' },
      { ja: '話題のありか',             en: 'Places Worth Talking About' },
      { ja: '展覧会と、その話題',       en: 'Exhibitions and Their Stories' },
      { ja: '話題の中心には、展覧会',   en: 'Always an Exhibition at the Center' },
      { ja: '今日の話題を、ひとつ',     en: 'One Thing Worth Seeing Today' }
    ];
    var ttlEl = document.getElementById('p1OpTitle');
    var enEl = document.getElementById('p1OpEn');
    function applyOpTitle(i) {
      var t = TITLES[i] || TITLES[0];
      if (ttlEl) ttlEl.textContent = t.ja;
      if (enEl) enEl.textContent = t.en;
      return t.ja;
    }
    /* ★ 紙面番号 OP_SEED（0〜5）＝**柱の文言と中身の並びを両方決める単一のシード**（2026-08-31）。
       巻頭は1日1回更新なので、同じ日にトップを開けば柱も展覧会クラスタも同じものが見える
       （＝リロードで中身が変わらない。変わると「引き直し」に見えるうえ、内部リンクが訪問ごとに
       入れ替わってSEO上もクロールが安定しない）。通算日で6パターンを回す。
       確認用：デモバー「巻頭の日替わり：本日／01〜06」（`KTN.opDay(n, btn)`）と URL `?op=3` で
       任意の日の紙面に差し替えられる。デザインFix時にこの上書き（デモバー行を含む）は削除する。
       本番（React CSR）はシードを6パターンでなく日付そのもの（YYYYMMDD）にし、柱は %6、
       中身は全展覧会プールから抽選する＝日ごとに違う紙面になる。 */
    var doy = KTN.cl.doy(now);
    function normSeed(i) { i = i | 0; return ((i % TITLES.length) + TITLES.length) % TITLES.length; }
    var q = (location.search.match(/[?&]op=(\d+)/) || [])[1];
    var OP_SEED = normSeed(q ? parseInt(q, 10) - 1 : doy);
    applyOpTitle(OP_SEED);
    KTN.opTitles = TITLES;

    var BADGE = KTN.cl.BADGE;
    /* 対の関係ラベル（開催状態を断定しない中立表現にする＝soon の会場も同じ書式で出せる） */
    var REL = {
      artwork: '出品展',
      article: '取り上げた展覧会',
      review:  '訪れた展覧会',
      creator: '開催中の個展',
      gallery: '会場の展覧会'
    };

    /* 周辺コンテンツのデモプール・リード文は共通ビルダ `KTN.cl` に集約（2026-09-01・P10系と共用）。
       exh＝紐づく展覧会の EX id（対の相手・exById で解決） */
    var POOL = KTN.cl.POOL;

    /* 抽選はすべて `rnd()`＝OP_SEED から作る疑似乱数で行う（`Math.random()` は使わない）。
       同じ日・同じ案なら何度描き直しても同じ紙面になるようにするため（→ OP_SEED のコメント）。
       PRNG本体は共通ビルダ `KTN.cl.rng()`（mulberry32＋シード散らし）。 */
    var rnd = KTN.cl.rng(0);

    /* 同じ展覧会が2スロットに出ないよう、既出の exh を候補から外して選ぶ（候補が尽きたら全体から） */
    var usedEx = {};
    function pick(type) {
      var list = POOL[type];
      var avail = list.filter(function (d) { return !usedEx[d.exh]; });
      var src = avail.length ? avail : list;
      var d = src[Math.floor(rnd() * src.length)];
      usedEx[d.exh] = 1;
      return d;
    }

    /* 対になる展覧会プレート（上端の 2px ink 罫線が「対」の見切り）。
       展覧会が主コンテンツなので添え物に見えないよう、残り日数まで出して「いま行ける」情報量を持たせる */
    function exhPlate(type, x) {
      if (!x) return '';
      return '<a class="p1-op-exh" href="kotennavi-p2.html">'
        + '<span class="p1-op-exh__thumb" style="background-image:' + x.bg + '"></span>'
        + '<span class="p1-op-exh__body">'
        + '<span class="p1-op-exh__label">' + esc(REL[type]) + '</span>'
        + '<span class="p1-op-exh__ttl">' + esc(x.title) + '</span>'
        + '<span class="p1-op-exh__meta">' + esc(x.venue + '｜2026.' + x.s + '—' + x.e) + '</span>'
        + (x.remain ? '<span class="p1-op-exh__status' + (x.status === 'soon' ? ' p1-op-exh__status--soon' : '') + '">' + esc(x.remain) + '</span>' : '')
        + '</span></a>';
    }
    /* withCap＝リード文を出すのは最大の1点のみ。小さい項目に長文を付けるとコラージュのリズムが崩れる */
    /* extra＝スロット寸法を上書きする追加クラス（折衷案の `p1-op-unit--hyN`）。案1では省略する */
    function unit(type, num, withCap, extra) {
      var d = pick(type);
      return '<div class="p1-op-unit p1-op-unit--n' + num + (extra ? ' ' + extra : '') + '">'
        + '<a class="p1-op-item" href="' + d.href + '">'
        + '<span class="p1-op-item__num">0' + num + '</span>'
        + '<span class="p1-op-item__visual" style="background-image:' + d.bg + '">'
        + (d.ini ? '<span class="p1-op-item__ini">' + esc(d.ini) + '</span>' : '')
        + '</span>'
        + '<span class="p1-op-item__body">'
        + '<span class="p1-op-item__badges">' + BADGE[type] + '</span>'
        + '<span class="p1-op-item__ttl">' + esc(d.ttl) + '</span>'
        + '<span class="p1-op-item__meta">' + esc(d.meta) + '</span>'
        + (withCap && d.cap ? '<span class="p1-op-item__cap">' + esc(d.cap) + '</span>' : '')
        + '</span></a>'
        + exhPlate(type, exById(d.exh))
        + '</div>';
    }

    /* ==== 案2＝展覧会を核にしたクラスタ（採用・2026-08-31）====
       1クラスタ＝展覧会1件（主役）＋その展覧会に紐づく周辺コンテンツ。POOL の exh をそのまま逆引き
       して周辺を集めるので、データ構造は案1と共有できる。トレードオフ＝「中心と周辺」の読みは強いが、
       1画面に出せる展覧会は3件（案1は6件）。
       描画本体・抽選・リード文は共通ビルダ KTN.cl（P10系 検索結果 Featured と共用）へ移設済み。 */
    var CL_NOTE = KTN.cl.NOTE;
    function shuffle(a) { return KTN.cl.shuffle(a, rnd); }
    /* 核が展覧会なので、周辺から同じ展覧会自身（POOL.exhibition の同名データ）を外す */
    function satsFor(id) { var x = exById(id); return KTN.cl.satsFor(id, { skipTtl: x ? x.title : '' }); }

    /* size＝lg（主役・周辺3件＋リード文＋周辺カラムに階層）／md（準主役・リード文あり）／sm（小）。
       02と03を同じ sm にせず md/sm に分けるのは、双子の対称を崩して誌面にリズムを作るため。
       --n1/--n2/--n3 は巻頭の組版専用モディファイア（他ページでは素の .ktn-cl を使う）。 */
    function cluster(id, num, size) {
      var x = exById(id);
      if (!x) return '';
      usedEx[id] = 1;
      return KTN.cl.exhCluster(x, {
        num: num, size: size, mod: 'ktn-cl--n' + num,
        sats: KTN.cl.pickVaried(KTN.cl.satsFor(id), size === 'lg' ? 3 : 2, rnd),
        lead: size !== 'sm' ? CL_NOTE[id] : ''
      });
    }
    function renderClusters() {
      /* 主役は周辺を3件持てる展覧会から、残り2枠は2件以上持つ展覧会から（重複なし）。
         **主役だけは乱数で引かず日ごとにローテーションさせる**（`OP_SEED` で候補配列を回す）＝
         純粋な抽選だと同じ展覧会が何日も続けて主役になり得るが、巻頭は掲載そのものが出品側への
         誘因になる枠なので「順番に回す」ほうが趣旨に合う。02・03はシード付き抽選のまま。 */
      var cand = Object.keys(CL_NOTE).map(Number).filter(function (id) { return satsFor(id).length >= 2; });
      var bigCand = cand.filter(function (id) { return satsFor(id).length >= 3; });
      var big = bigCand[OP_SEED % bigCand.length] || cand[0];
      var rest = shuffle(cand.filter(function (id) { return id !== big; })).slice(0, 2);
      return '<div class="p1-op__clusters">'
        + '<div class="p1-op__crow">' + cluster(big, 1, 'lg') + '</div>'
        + '<div class="p1-op__crow">' + cluster(rest[0], 2, 'md') + cluster(rest[1], 3, 'sm') + '</div>'
        + '</div>';
    }
    function renderPairs() {
      return '<div class="p1-op__row p1-op__row--1">'
        + unit('artwork', 1, 1)
        + unit('article', 2, 0)
        + unit('review', 3, 0)
        + '</div>'
        + '<div class="p1-op__row p1-op__row--2">'
        + unit('creator', 4, 0)
        + unit('gallery', 5, 0)
        + unit('artwork', 6, 0)
        + '</div>';
    }
    /* 折衷案＝01だけ案2のクラスタ（展覧会を大きく＋周辺3件）、02〜06は案1のペア。
       巻頭に「主役の1本」を立てつつ、露出する展覧会は 1（クラスタ）＋5（ペア）＝最大6件で案1と同数を保つ。
       クラスタの展覧会は cluster() 内で usedEx に登録済み＝続くペアには出てこない。 */
    function renderHybrid() {
      var cand = Object.keys(CL_NOTE).map(Number).filter(function (id) { return satsFor(id).length >= 3; });
      var big = cand[OP_SEED % cand.length];  /* 主役は案2と同じく日替わりローテーション */
      return '<div class="p1-op__clusters"><div class="p1-op__crow">' + cluster(big, 1, 'lg') + '</div></div>'
        /* 02〜06は案1の3＋2段組みでなく**1段のコラージュ帯**に並べる（2026-08-31）。案1のスロット幅
           （190/162/168/200/156px）のままだと、全幅のクラスタの下で1段目3枠・2段目2枠がデスクトップ幅
           1040pxの半分ほどしか埋めず右側が大きく空くため。幅は `--hyN` が%で持ち、5枠で幅を使い切る。
           最大の02だけリード文（withCap）を出して大小の差をさらに開く。 */
        + '<div class="p1-op__row p1-op__row--hy">'
        + unit('artwork', 2, 1, 'p1-op-unit--hy2')
        + unit('article', 3, 0, 'p1-op-unit--hy3')
        + unit('review', 4, 0, 'p1-op-unit--hy4')
        + unit('creator', 5, 0, 'p1-op-unit--hy5')
        + unit('gallery', 6, 0, 'p1-op-unit--hy6')
        + '</div>';
    }

    /* ★ 採用＝案2（クラスタ・2026-08-31 ユーザー確定）。巻頭の役割は「量」でなく「展覧会を中心に
       まわりへ話題が集まっている」という構図を1画面で言い切ることで、量は下のティッカー／近くの展覧会／
       フィードとP10が担う、という理由。案1（ペア6枠）・折衷（01クラスタ＋02〜06ペア）は**比較デモとして
       当面残す**（ユーザー指示）。
       比較用スイッチ：1＝案1／2＝案2（既定）／3＝折衷。デモバーの「巻頭」ボタン（`KTN.opVariant(n, btn)`）
       で切替。既出展覧会の記録 usedEx は描画のたびにリセットする（再描画で候補が尽きるのを防ぐ）。
       React CSR 化の際は案2のみ移植し、案1・折衷のコード・CSS（`.p1-op-unit*` / `.p1-op-item*` /
       `.p1-op-exh*` / `--hyN`）・デモバー行を削除する。 */
    var OP_VARIANT = 2;
    function renderOp(v) {
      usedEx = {};
      /* 描画のたびにシードをまき直す＝同じ日・同じ案なら何度描き直しても同じ紙面 */
      rnd = KTN.cl.rng(OP_SEED + 1);
      return v === 2 ? renderClusters() : v === 3 ? renderHybrid() : renderPairs();
    }
    mosaic.innerHTML = renderOp(OP_VARIANT);
    KTN.opVariant = function (v, btn) {
      OP_VARIANT = v;
      mosaic.innerHTML = renderOp(v);
      if (btn) {
        [].forEach.call(document.querySelectorAll('#dbar [data-opvar]'), function (b) { b.classList.remove('on'); });
        btn.classList.add('on');
      }
    };
    /* デモバー「巻頭の日替わり」＝その日の紙面ごと差し替える（柱の文言と中身は同じ OP_SEED で動くので
       必ず対で変わる）。n 省略＝本日に戻す。デザインFix時にデモバー行ごと削除する */
    KTN.opDay = function (n, btn) {
      OP_SEED = normSeed(n ? (n | 0) - 1 : doy);
      applyOpTitle(OP_SEED);
      mosaic.innerHTML = renderOp(OP_VARIANT);
      if (btn) {
        [].forEach.call(document.querySelectorAll('#dbar [data-opday]'), function (b) { b.classList.remove('on'); });
        btn.classList.add('on');
      }
      return TITLES[OP_SEED].ja;
    };
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

  /* ── C3. エリアから探す＝軸ページ（P10-4-1）への入口（追174-49）──
     P1 は3枠だけ。トップに47県を並べても選べないので、残りは索引（P10-4）へ送る。
     選定は KTN.axis.pick()＝P10・P10-4 索引と共有＝同じ日はどの入口から入っても同じ軸が出る。
     本番（Drupal）では pick() をサーバ側で実行して初期HTMLにリンクを焼く。クライアントの乱数だと
     クローラに内部リンクとして拾われず、軸ページで検索資産を積むという目的そのものが消える。 ── */
  (function () {
    var A = KTN.axis, host = document.getElementById('p1AxisCards');
    if (!A || !host) return;
    function esc(v) { var d = document.createElement('div'); d.textContent = v == null ? '' : v; return d.innerHTML; }
    function renderAxis() {
      host.innerHTML = A.pick(3).map(function (sl) {
        var al = A.aliasOf(sl);
        return '<a class="ktn-axis-card" href="./kotennavi-p10-4-1.html?ax=' + sl + '">'
          + '<span class="ktn-axis-card__label">' + esc(A.enName(sl)) + '</span>'
          + '<span class="ktn-axis-card__ttl">' + esc(A.fullOf(sl)) + 'の展覧会</span>'
          + (al ? '<span class="ktn-axis-card__alias">' + esc(al) + 'など</span>' : '')
          + '<span class="ktn-axis-card__n"><strong>' + A.count(sl) + '</strong>件が開催中・開催予定</span>'
          + '</a>';
      }).join('');
    }
    window.setAxisDay = function (shift, btn) {   /* デモバー：日替わりの確認（P10・P10-4 と同名・同挙動） */
      A.setDayShift(shift);
      renderAxis();
      if (btn && btn.parentNode) {
        btn.parentNode.querySelectorAll('[data-axis-day]').forEach(function (b) { b.classList.remove('on'); });
        btn.classList.add('on');
      }
    };
    renderAxis();
  }());

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

/* ────────────────────────────────────────────────────
   個展なびバッジ（P60-6/P60-7 よくある質問「個展なびバッジの設置」1項目内で使用）
   ・生成ロジック（定数・HTML生成関数）は kotennavi-common.js の KTN_PSHARE_* / ktnPshareBadgeHtml
   ・全パターンをグリッド表示し一覧比較しながら選べる方式（タブ切替は廃止・2026-08-17）
   ・章立て（ktn-index/ktn-zone）は2026-08-18に廃止し通常のFAQ項目へ格納（関数名は据え置き）
──────────────────────────────────────────────────── */
function ktnEscapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function ktnInitBadgeChapter(prefix, kind) {
  var def = KTN_PSHARE_KINDS[kind];
  var gridEl = document.getElementById(prefix + 'BadgeGrid');
  if (!gridEl) return;

  gridEl.innerHTML = KTN_PSHARE_PATTERNS.map(function (p) {
    var previewCls = 'ktn-pshare-badge__preview' + (p.id === 'icon' ? ' ktn-pshare-badge__preview--compact' : '');
    return '<div class="ktn-pshare-badge__card">'
      + '<div class="ktn-pshare-badge__card-name">' + p.label + '</div>'
      + '<div class="' + previewCls + '">' + ktnPshareBadgeHtml(p.id, def, KTN_PSHARE_IMG_REL) + '</div>'
      + '<textarea class="ktn-pshare-badge__code" readonly rows="2">' + ktnEscapeHtml(ktnPshareBadgeHtml(p.id, def)) + '</textarea>'
      + '<div class="ktn-pshare-badge__card-actions">'
      + '<button type="button" class="ktn-op-btn" data-action="dl" data-pattern="' + p.id + '">画像をダウンロード</button>'
      + '<button type="button" class="ktn-op-btn ktn-op-btn--primary" data-action="copy" data-pattern="' + p.id + '">コードをコピー</button>'
      + '</div>'
      + '</div>';
  }).join('');

  gridEl.querySelectorAll('[data-action="dl"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.closest('.ktn-pshare-badge__card').querySelector('img');
      if (!img) return;
      var a = document.createElement('a');
      a.href = img.src;
      a.download = 'kotennavi-badge-' + kind + '-' + btn.dataset.pattern + '.svg';
      a.click();
    });
  });
  gridEl.querySelectorAll('[data-action="copy"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      ktnCopyText(ktnPshareBadgeHtml(btn.dataset.pattern, def), 'コードをコピーしました');
    });
  });
}

KTN.pages['p60-6'] = function () {
  ktnInitBadgeChapter('p606', 'creator');
};

KTN.pages['p60-7'] = function () {
  ktnInitBadgeChapter('p607', 'gallery');
};
