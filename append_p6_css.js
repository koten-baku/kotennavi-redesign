const fs = require('fs');
const path = 'D:/user/baku/claude-code/kotennavi-redesign/kotennavi-common.css';

const css = `

/* ════════════════════════════════
   p6 作品詳細ページ
════════════════════════════════ */

/* ─── WORK HERO ─── */
.work-hero{background:var(--warm);border-bottom:2px solid var(--border);position:relative;overflow:hidden}
.wh-arc{display:none}
.wh-inner{max-width:960px;margin:0 auto;padding:44px 24px;display:grid;grid-template-columns:1fr 400px;gap:44px;align-items:start}

/* ─ 左: 作品ビジュアル ─ */
.wh-img-main{width:100%;aspect-ratio:3/4;border-radius:6px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;margin-bottom:10px}
.wh-img-bg{position:absolute;inset:0}
.wh-img-label{position:relative;font-family:'Shippori Mincho',serif;font-size:.75rem;font-weight:700;writing-mode:vertical-rl;letter-spacing:.12em;color:rgba(255,255,255,.55)}
.wh-img-corner{position:absolute;bottom:12px;right:12px;font-family:'Montserrat',sans-serif;font-size:.52rem;letter-spacing:.1em;color:rgba(255,255,255,.35);line-height:1.6;text-align:right}
.wh-thumbs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}
.wh-thumb{width:52px;height:68px;border-radius:3px;flex-shrink:0;cursor:pointer;opacity:.5;border:1.5px solid transparent;transition:opacity .15s,border-color .15s;display:flex;align-items:center;justify-content:center;font-family:'Shippori Mincho',serif;font-size:.44rem;font-weight:700;writing-mode:vertical-rl;letter-spacing:.05em;color:rgba(255,255,255,.5)}
.wh-thumb:hover{opacity:.78}
.wh-thumb.active{opacity:1;border-color:var(--lgold)}

/* ─ 右: 作品情報 ─ */
.wh-eyebrow{font-family:'Montserrat',sans-serif;font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.wh-liaison-dot{width:5px;height:5px;border-radius:50%;background:var(--lr);flex-shrink:0}
.wh-title{font-family:'Shippori Mincho',serif;font-size:1.5rem;font-weight:600;color:var(--ink);line-height:1.35;letter-spacing:.04em;margin-bottom:4px}
.wh-title-kagi{font-size:1.05rem;opacity:.7}
.wh-title-en{font-family:'DM Serif Display',serif;font-style:italic;font-size:.88rem;color:var(--muted);letter-spacing:.06em;margin-bottom:16px}

/* ステータス行 */
.wh-status-row{display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.wh-badge{font-family:'Montserrat',sans-serif;font-size:.56rem;letter-spacing:.1em;padding:3px 10px;border-radius:20px;white-space:nowrap}
.wh-badge.available{border:1px solid rgba(39,174,96,.4);color:#5dbe84;background:rgba(39,174,96,.08)}
.wh-badge.sold{border:1px solid rgba(192,57,43,.4);color:#e07070;background:rgba(192,57,43,.07)}
.wh-badge.nfs{border:1px solid var(--lborder);color:var(--lmuted);background:rgba(255,255,255,.03)}
.wh-badge.exhibiting{border:1px solid rgba(201,169,110,.4);color:var(--lgold);background:rgba(201,169,110,.07)}
.wh-badge.reserved{border:1px solid rgba(201,169,110,.35);color:var(--lgold);background:rgba(201,169,110,.07)}

/* 販売点数 */
.wh-qty{font-size:.68rem;color:var(--muted);display:flex;align-items:center;gap:6px}
.wh-qty strong{color:var(--ink);font-weight:500}
.wh-edition{font-size:.6rem;color:rgba(201,169,110,.7);border:1px solid rgba(201,169,110,.25);padding:1px 7px;border-radius:10px;font-family:'Montserrat',sans-serif;letter-spacing:.05em}

/* 仕様テーブル */
.wh-specs{border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:18px}
.wh-spec{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)}
.wh-spec:last-child{border-bottom:none}
.wh-spec-lbl{font-family:'Montserrat',sans-serif;font-size:.53rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);min-width:76px;padding-top:2px;flex-shrink:0}
.wh-spec-val{font-size:.78rem;color:var(--ink);line-height:1.6;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.wh-anon-badge{display:inline-flex;align-items:center;gap:4px;font-family:'Montserrat',sans-serif;font-size:.5rem;letter-spacing:.08em;padding:1px 7px;border-radius:2px;background:rgba(45,122,94,.15);color:#7abca0;border:1px solid rgba(45,122,94,.3);white-space:nowrap}
.wh-anon-badge svg{width:9px;height:9px}

/* 価格ブロック */
.wh-price-block{margin-bottom:18px;display:none}
.wh-price-lbl{font-family:'Montserrat',sans-serif;font-size:.53rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:5px}
.wh-price{font-family:'Montserrat',sans-serif;font-size:1.55rem;color:var(--accent);letter-spacing:.02em;line-height:1}
.wh-price small{font-size:.6rem;color:var(--lmuted);margin-left:5px;letter-spacing:.06em;font-family:'Noto Sans JP',sans-serif}
.wh-price-sub{font-size:.65rem;color:var(--muted);margin-top:5px;line-height:1.7}
.wh-price-sub em{color:rgba(201,169,110,.7);font-style:normal}

/* ガイドリンクボタン群 */
.wh-guide-links{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.wh-guide-btn{display:inline-flex;align-items:center;gap:5px;padding:6px 11px;border:1px solid var(--border);border-radius:3px;background:transparent;color:var(--muted);font-size:.62rem;letter-spacing:.03em;cursor:pointer;transition:all .15s;font-family:inherit;white-space:nowrap}
.wh-guide-btn:hover{border-color:var(--accent);color:var(--accent)}
.wh-guide-btn svg{width:11px;height:11px;flex-shrink:0}

/* アクションボタン群 */
.wh-actions{display:flex;flex-direction:column;gap:7px;margin-bottom:16px}

/* 購入申込ボタン（メイン） */
.btn-apply{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border-radius:4px;background:var(--lgold);color:var(--ld);font-family:'Shippori Mincho',serif;font-size:.9rem;letter-spacing:.08em;font-weight:600;border:none;cursor:pointer;transition:opacity .15s;position:relative}
.btn-apply:hover{opacity:.88}
.btn-apply:disabled{background:rgba(201,169,110,.25);color:rgba(44,62,80,.5);cursor:not-allowed;opacity:1}
.btn-apply svg{width:16px;height:16px;flex-shrink:0}
.btn-apply-count{position:absolute;right:14px;font-size:.58rem;font-family:'Montserrat',sans-serif;font-weight:400;letter-spacing:.05em;background:rgba(44,62,80,.2);padding:2px 8px;border-radius:10px}

/* 申込済みバッジ */
.btn-applied{display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 14px;border-radius:4px;background:rgba(201,169,110,.07);border:1px solid rgba(201,169,110,.3);color:var(--lgold);font-family:'Shippori Mincho',serif;font-size:.82rem;letter-spacing:.06em;cursor:not-allowed}
.btn-applied svg{width:14px;height:14px;flex-shrink:0}
.btn-applied-num{font-family:'Montserrat',sans-serif;font-size:.72rem;letter-spacing:.04em;opacity:.8}

/* 売約済みバー */
.wh-sold-bar{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border-radius:4px;background:rgba(192,57,43,.1);border:1px solid rgba(192,57,43,.3);color:#e07070;font-family:'Shippori Mincho',serif;font-size:.85rem;letter-spacing:.08em}
.wh-sold-bar svg{width:15px;height:15px;flex-shrink:0}

/* ダッシュボードボタン */
.btn-dashboard{display:flex;align-items:center;justify-content:center;gap:7px;padding:10px;border-radius:4px;background:rgba(0,93,167,.12);border:1px solid rgba(0,93,167,.35);color:#5a9fd4;font-size:.76rem;letter-spacing:.05em;cursor:pointer;transition:all .15s;font-family:inherit}
.btn-dashboard:hover{background:rgba(0,93,167,.2);border-color:rgba(0,93,167,.55)}
.btn-dashboard svg{width:13px;height:13px;flex-shrink:0}

/* 問い合わせボタン（サブ） */
.btn-contact{display:flex;align-items:center;justify-content:center;gap:7px;padding:11px;border-radius:4px;background:transparent;border:1px solid var(--border);color:var(--muted);font-size:.76rem;letter-spacing:.05em;cursor:pointer;transition:all .15s;font-family:inherit}
.btn-contact:hover{border-color:var(--accent);color:var(--ink)}
.btn-contact svg{width:13px;height:13px;flex-shrink:0}

/* 興味あり + シェア */
.wh-fav-row{display:flex;gap:7px}
.btn-fav{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:9px;border-radius:4px;border:1px solid var(--border);background:none;color:var(--lmuted);font-size:.7rem;letter-spacing:.04em;cursor:pointer;transition:all .15s}
.btn-fav:hover{border-color:var(--lr);color:#e07070}
.btn-fav.active{border-color:var(--lr);color:#e07070;background:rgba(192,57,43,.07)}
.btn-fav svg{width:13px;height:13px;flex-shrink:0}
.btn-share-sm{display:flex;align-items:center;justify-content:center;gap:6px;padding:9px 14px;border-radius:4px;border:1px solid var(--border);background:none;color:var(--lmuted);font-size:.7rem;cursor:pointer;transition:all .15s;white-space:nowrap}
.btn-share-sm:hover{border-color:var(--accent);color:var(--accent)}
.btn-share-sm svg{width:13px;height:13px}

/* 展覧会リンク */
.wh-venue-link{display:flex;align-items:center;gap:10px;padding:11px 14px;background:var(--paper);border:1px solid var(--border);border-radius:4px;margin-top:4px;font-size:.7rem;color:var(--lmuted);transition:border-color .15s}
.wh-venue-link:hover{border-color:var(--accent)}
.wh-venue-link svg{width:12px;height:12px;color:var(--accent);flex-shrink:0}
.wh-venue-link-body{flex:1;min-width:0}
.wh-venue-link-ttl{font-size:.72rem;color:var(--ink);margin-bottom:1px}
.wh-venue-link-sub{font-size:.61rem;color:var(--muted)}
.wh-venue-arr{color:var(--accent);flex-shrink:0}

/* 会場案内カード（p6-2 展示のみ） */
.wh-venue-notice{display:flex;gap:14px;align-items:flex-start;padding:16px 18px;background:rgba(201,169,110,.07);border:1px solid rgba(201,169,110,.25);border-radius:6px;margin-bottom:16px}
.wh-venue-notice-icon{width:36px;height:36px;border-radius:50%;background:rgba(201,169,110,.15);border:1px solid rgba(201,169,110,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.wh-venue-notice-icon svg{width:16px;height:16px;stroke:var(--lgold)}
.wh-venue-notice-body{flex:1;min-width:0}
.wh-venue-notice-ttl{font-family:'Shippori Mincho',serif;font-size:.84rem;font-weight:600;color:var(--lgold);margin-bottom:5px}
.wh-venue-notice-sub{font-size:.7rem;color:var(--lmuted);line-height:1.75}

/* ─── DESCRIPTION SECTION ─── */
.work-desc-section{background:var(--paper);border-top:1px solid var(--border);padding:44px 24px}
.wd-inner{max-width:960px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.wd-eyebrow{font-family:'Montserrat',sans-serif;font-size:.56rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:12px}
.wd-ttl{font-family:'Shippori Mincho',serif;font-size:1rem;font-weight:600;color:var(--ink);margin-bottom:14px;line-height:1.5}
.wd-body{font-size:.75rem;color:var(--muted);line-height:1.95}
.wd-body p+p{margin-top:12px}
#descRightCol{display:flex;flex-direction:column;gap:12px}
.wd-note{background:#fff;border:1px solid var(--border);box-shadow:0 1px 4px rgba(0,0,0,.05);border-radius:6px;padding:20px 22px}
.wd-note-lbl{font-family:'Montserrat',sans-serif;font-size:.54rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;display:flex;align-items:center;gap:8px}
.wd-note-lbl::before{content:'';width:20px;height:1px;background:var(--lgold);opacity:.5}
.wd-note-body{font-size:.72rem;color:var(--muted);line-height:1.9;font-style:italic}
.wd-note-sig{font-family:'DM Serif Display',serif;font-style:italic;font-size:.77rem;color:var(--muted);margin-top:14px;text-align:right}
.wd-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:18px}
.wd-tag{font-size:.57rem;padding:2px 9px;border:1px solid var(--border);border-radius:10px;color:var(--muted)}

/* ─── CREATOR SECTION ─── */
.work-creator-section{background:var(--warm);border-top:1px solid var(--border);padding:44px 24px}
.wc-inner{max-width:960px;margin:0 auto}
.wcs-eyebrow{font-family:'Montserrat',sans-serif;font-size:.56rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:20px}
.wcs-row{display:flex;align-items:flex-start;gap:16px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border)}
.wcs-avatar{width:64px;height:64px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Shippori Mincho',serif;font-size:1.3rem;font-weight:600;border:2px solid rgba(201,169,110,.25);background:linear-gradient(135deg,#b8d8cc,#6a9e8a)}
.wcs-info{flex:1;min-width:0}
.wcs-name{font-family:'Shippori Mincho',serif;font-size:1rem;font-weight:600;color:var(--ink);margin-bottom:2px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.wcs-liaison-badge{font-family:'Montserrat',sans-serif;font-size:.5rem;letter-spacing:.08em;color:#c0392b;border:1px solid rgba(192,57,43,.35);padding:1px 6px;border-radius:2px}
.wcs-name-en{font-family:'DM Serif Display',serif;font-style:italic;font-size:.78rem;color:var(--muted);margin-bottom:6px}
.wcs-genre{display:flex;flex-wrap:wrap;gap:5px}
.wcs-gtag{font-size:.56rem;padding:2px 8px;border-radius:10px;border:1px solid var(--border);color:var(--muted)}
.wcs-follow{flex-shrink:0;display:inline-flex;align-items:center;gap:5px;font-size:.66rem;letter-spacing:.06em;padding:7px 14px;border:1px solid var(--border);border-radius:20px;background:none;color:var(--accent);cursor:pointer;transition:all .15s;font-family:inherit}
.wcs-follow:hover{background:rgba(0,93,167,.06)}
.wcs-follow.following{background:rgba(0,93,167,.1);border-color:var(--accent)}
.wcs-bio{font-size:.73rem;color:var(--muted);line-height:1.8;margin-bottom:12px}
.wcs-stats{display:flex;gap:22px;margin-bottom:16px}
.wcs-stat{font-size:.66rem;color:var(--muted)}
.wcs-stat span{font-family:'Montserrat',sans-serif;font-size:.9rem;color:var(--accent);margin-right:3px}
.btn-creator-page{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border:1px solid var(--border);border-radius:3px;background:rgba(0,93,167,.04);color:var(--accent);font-size:.68rem;letter-spacing:.07em;cursor:pointer;transition:background .15s;font-family:inherit}
.btn-creator-page:hover{background:rgba(0,93,167,.1)}
.btn-creator-page svg{width:12px;height:12px}

/* ─── RELATED WORKS ─── */
.related-section{background:var(--paper);border-top:1px solid var(--border);padding:36px 24px}
.rel-inner{max-width:960px;margin:0 auto}
.rel-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:18px}
.rel-eyebrow{font-family:'Montserrat',sans-serif;font-size:.54rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:4px}
.rel-ttl{font-family:'DM Serif Display',serif;font-style:italic;font-size:1.05rem;color:var(--ink)}
.rel-more{font-size:.64rem;color:var(--muted);display:flex;align-items:center;gap:4px;transition:color .15s}
.rel-more:hover{color:var(--accent)}
.rel-more svg{width:11px;height:11px}
.rel-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}
.rel-card{display:block;background:#fff;border:1px solid var(--border);border-radius:3px;overflow:hidden;transition:border-color .2s,transform .15s;cursor:pointer}
.rel-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.rel-card-img{aspect-ratio:3/4;position:relative;overflow:hidden}
.rel-card-bg{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Shippori Mincho',serif;font-size:.42rem;font-weight:700;writing-mode:vertical-rl;letter-spacing:.06em;color:rgba(255,255,255,.4);transition:transform .3s}
.rel-card:hover .rel-card-bg{transform:scale(1.06)}
.rel-card-sold-ribbon{position:absolute;top:6px;right:-12px;background:rgba(192,57,43,.85);color:#fff;font-size:.38rem;letter-spacing:.07em;font-family:'Montserrat',sans-serif;padding:2px 16px;transform:rotate(45deg)}
.rel-card-fav{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:rgba(20,20,20,.55);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s;z-index:2}
.rel-card-fav:hover{background:rgba(192,57,43,.6)}
.rel-card-fav.active{background:#c0392b;border-color:#c0392b}
.rel-card-fav svg{width:9px;height:9px;stroke:rgba(255,255,255,.7);fill:none;pointer-events:none}
.rel-card-fav.active svg{stroke:#fff;fill:#fff}
.rel-card-body{padding:5px 6px 7px}
.rel-card-title{font-family:'Shippori Mincho',serif;font-size:.62rem;font-weight:600;color:var(--ink);margin-bottom:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rel-card-medium{font-size:.48rem;color:var(--lmuted);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rel-card-footer{display:flex;align-items:center;justify-content:space-between;gap:3px}
.rel-card-price{font-family:'Montserrat',sans-serif;font-size:.6rem;color:var(--accent)}
.rel-card-status{font-size:.42rem;letter-spacing:.05em;padding:1px 5px;border-radius:6px;font-family:'Montserrat',sans-serif;white-space:nowrap}
.rel-card-status.available{border:1px solid rgba(39,174,96,.35);color:#5dbe84;background:rgba(39,174,96,.08)}
.rel-card-status.sold{border:1px solid rgba(192,57,43,.35);color:#e07070;background:rgba(192,57,43,.08)}
.rel-card-status.reserved{border:1px solid rgba(201,169,110,.35);color:var(--lgold);background:rgba(201,169,110,.08)}

/* ─── BUYER COMMENTS ─── */
.comments-section{background:var(--warm);border-top:1px solid var(--border);padding:44px 24px}
.cmt-inner{max-width:960px;margin:0 auto}
.cmt-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:10px}
.cmt-eyebrow{font-family:'Montserrat',sans-serif;font-size:.54rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:4px}
.cmt-ttl{font-family:'DM Serif Display',serif;font-style:italic;font-size:1.1rem;color:var(--ink)}
.cmt-summary{display:flex;align-items:center;gap:14px}
.cmt-avg{font-family:'Montserrat',sans-serif;font-size:2rem;font-weight:600;color:var(--accent);line-height:1}
.cmt-avg-stars{display:flex;gap:2px;margin-bottom:3px}
.cmt-avg-count{font-size:.62rem;color:var(--muted)}
.cmt-card{background:#fff;border:1px solid var(--border);border-radius:6px;padding:18px 20px;margin-bottom:10px}
.cmt-card-header{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px}
.cmt-avatar{width:34px;height:34px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Shippori Mincho',serif;font-size:.75rem;font-weight:600;border:1px solid var(--lborder)}
.cmt-user{flex:1;min-width:0}
.cmt-user-row{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:2px}
.cmt-user-name{font-size:.74rem;color:var(--ink);font-weight:500}
.cmt-user-date{font-size:.6rem;color:var(--muted)}
.cmt-verified{font-family:'Montserrat',sans-serif;font-size:.48rem;letter-spacing:.07em;padding:1px 6px;border-radius:8px;background:rgba(39,174,96,.09);border:1px solid rgba(39,174,96,.3);color:#5dbe84;white-space:nowrap}
.cmt-stars{display:flex;gap:2px;margin-bottom:6px}
.cmt-star{font-size:.85rem;line-height:1}
.cmt-body{font-size:.76rem;color:var(--muted);line-height:1.85}
.cmt-empty{text-align:center;padding:36px 0;border:1px dashed var(--border);border-radius:6px}
.cmt-empty-icon{font-size:1.6rem;margin-bottom:8px;opacity:.3}
.cmt-empty-txt{font-size:.72rem;color:var(--muted);line-height:1.8}
.cmt-post-box{background:#fff;border:1px solid var(--border);border-radius:6px;padding:20px 22px;margin-top:20px}
.cmt-post-lbl{font-family:'Montserrat',sans-serif;font-size:.54rem;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
.cmt-star-input{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.cmt-star-input-lbl{font-size:.66rem;color:var(--lmuted);white-space:nowrap}
.cmt-star-row{display:flex;gap:4px}
.cmt-star-btn{font-size:1.5rem;cursor:pointer;background:none;border:none;color:rgba(0,93,167,.2);transition:color .1s,transform .1s;line-height:1;padding:0 2px}
.cmt-star-btn:hover,.cmt-star-btn.lit{color:var(--accent)}
.cmt-star-btn:hover{transform:scale(1.15)}
.cmt-star-selected-lbl{font-size:.62rem;color:var(--accent);min-width:40px}
.cmt-textarea{width:100%;padding:10px 12px;background:var(--warm);border:1px solid var(--border);border-radius:4px;color:var(--ltext);font-size:.76rem;font-family:'Noto Sans JP',sans-serif;outline:none;resize:vertical;min-height:80px;transition:border-color .15s}
.cmt-textarea:focus{border-color:var(--accent)}
.cmt-post-footer{display:flex;align-items:center;justify-content:space-between;margin-top:10px;gap:12px;flex-wrap:wrap}
.cmt-anon-label{display:flex;align-items:center;gap:6px;font-size:.66rem;color:var(--muted);cursor:pointer}
.cmt-anon-label input{accent-color:var(--accent)}
.cmt-submit{padding:8px 20px;border-radius:4px;background:rgba(0,93,167,.08);border:1px solid rgba(0,93,167,.3);color:var(--accent);font-size:.72rem;letter-spacing:.06em;cursor:pointer;transition:background .15s;font-family:inherit}
.cmt-submit:hover{background:rgba(0,93,167,.15)}
.cmt-login-prompt{text-align:center;padding:20px;background:var(--paper);border:1px dashed var(--border);border-radius:6px;margin-top:16px}
.cmt-login-prompt p{font-size:.72rem;color:var(--lmuted);margin-bottom:10px}
.cmt-login-link{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border:1px solid var(--border);border-radius:20px;color:var(--accent);font-size:.7rem;cursor:pointer;transition:background .15s;background:none;font-family:inherit}
.cmt-login-link:hover{background:rgba(0,93,167,.06)}

/* ─── SHARE SECTION ─── */
.share-section{background:var(--warm);border-top:1px solid var(--border);padding:32px 24px}
.share-inner{max-width:960px;margin:0 auto;display:flex;align-items:center;gap:22px;flex-wrap:wrap}
.share-lbl{font-family:'Montserrat',sans-serif;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);white-space:nowrap}
.share-btns{display:flex;gap:7px;flex-wrap:wrap}
.share-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--border);border-radius:4px;background:none;color:var(--lmuted);font-size:.68rem;letter-spacing:.03em;cursor:pointer;transition:all .15s;font-family:inherit}
.share-btn:hover{border-color:var(--accent);color:var(--accent)}
.share-btn svg{width:13px;height:13px;flex-shrink:0}

/* ─── SELLER (posted-by) ─── */
.seller-section{background:var(--lbg2);border-top:1px solid var(--lborder);padding:26px 24px}
.seller-inner{max-width:960px;margin:0 auto}
.pb-lbl{font-family:'Montserrat',sans-serif;font-size:.53rem;letter-spacing:.2em;text-transform:uppercase;color:var(--lmuted);margin-bottom:11px}
.pb-row{display:flex;align-items:center;gap:12px}
.pb-avatar{width:42px;height:42px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Shippori Mincho',serif;font-weight:800;font-size:.88rem;border:1.5px solid rgba(201,169,110,.2)}
.pb-meta{flex:1;min-width:0}
.pb-name{font-family:'Shippori Mincho',serif;font-size:.84rem;font-weight:600;color:var(--ltext);margin-bottom:3px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.pb-name-sub{font-weight:300;font-size:.7rem;color:var(--lmuted)}
.pb-type-badge{font-family:'Montserrat',sans-serif;font-size:.51rem;letter-spacing:.08em;text-transform:lowercase;padding:1px 6px;border-radius:2px}
.pb-type-badge.gallery{background:rgba(45,122,94,.15);color:#7abca0;border:1px solid rgba(45,122,94,.3)}
.pb-type-badge.creator{background:rgba(184,102,42,.15);color:#d4a070;border:1px solid rgba(184,102,42,.3)}
.pb-counts{display:flex;gap:12px;margin-bottom:3px}
.pb-cnt{font-size:.61rem;color:var(--lmuted)}
.pb-cnt span{color:var(--ltext);font-weight:500;margin-right:2px}
.pb-liaison{display:inline-flex;align-items:center;font-size:.53rem;letter-spacing:.06em;color:#c0392b;border:1px solid rgba(192,57,43,.3);padding:1px 6px;border-radius:2px;margin-top:2px}
.pb-follow{flex-shrink:0;display:inline-flex;align-items:center;gap:5px;font-size:.65rem;letter-spacing:.06em;padding:6px 13px;border:1px solid var(--lborder2);border-radius:20px;background:none;color:var(--lgold);cursor:pointer;transition:all .15s;font-family:inherit;white-space:nowrap}
.pb-follow:hover{background:rgba(201,169,110,.1)}
.pb-follow.following{background:rgba(201,169,110,.15);border-color:var(--lgold)}

/* ─── BACK TO WORKS ─── */
.back-section{background:var(--paper);border-top:1px solid var(--border);padding:32px 24px;text-align:center}
.back-ttl{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);font-family:'Montserrat',sans-serif;margin-bottom:12px}
.back-ex-card{display:inline-flex;align-items:center;gap:14px;background:#fff;border:1px solid var(--border);border-radius:6px;padding:12px 20px;transition:border-color .2s}
.back-ex-card:hover{border-color:var(--accent)}
.back-ex-poster{width:28px;height:38px;border-radius:2px;background:linear-gradient(155deg,#b8d8cc,#6a9e8a);flex-shrink:0}
.back-ex-ttl{font-family:'Shippori Mincho',serif;font-size:.86rem;color:var(--ink);margin-bottom:2px;text-align:left}
.back-ex-meta{font-size:.61rem;color:var(--muted);text-align:left}
.back-ex-arrow{color:var(--accent);flex-shrink:0;margin-left:4px}

/* ─── ログインモーダル ─── */
.lm-overlay{display:none;position:fixed;inset:0;z-index:9100;background:rgba(0,0,0,.72);backdrop-filter:blur(4px);align-items:center;justify-content:center;padding:20px}
.lm-overlay.open{display:flex}
.lm-box{background:#1c1c1e;border:1px solid rgba(201,169,110,.2);border-radius:12px;padding:34px 26px 24px;max-width:340px;width:100%;text-align:center;animation:lmIn .2s ease-out}
@keyframes lmIn{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
.lm-icon{width:52px;height:52px;border-radius:50%;background:rgba(192,57,43,.13);border:1px solid rgba(192,57,43,.35);display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.lm-icon svg{width:24px;height:24px;stroke:#c0392b;fill:none}
.lm-ttl{font-family:'Shippori Mincho',serif;font-size:.95rem;font-weight:600;color:#e8e0d4;margin-bottom:8px}
.lm-body{font-size:.71rem;color:#8a9aa8;line-height:1.8;margin-bottom:20px}
.lm-btns{display:flex;flex-direction:column;gap:7px}
.lm-btn-login{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border-radius:4px;background:#005da7;color:#fff;font-family:'Shippori Mincho',serif;font-size:.8rem;letter-spacing:.06em;border:none;cursor:pointer;transition:opacity .15s}
.lm-btn-login:hover{opacity:.85}
.lm-btn-login svg{width:13px;height:13px;stroke:#fff;fill:none}
.lm-btn-reg{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border-radius:4px;background:rgba(255,255,255,.05);border:1px solid rgba(201,169,110,.25);color:#c9a96e;font-family:'Shippori Mincho',serif;font-size:.8rem;letter-spacing:.06em;cursor:pointer;transition:background .15s}
.lm-btn-reg:hover{background:rgba(201,169,110,.1)}
.lm-cancel{margin-top:6px;font-size:.66rem;color:#5a6a78;background:none;border:none;cursor:pointer;letter-spacing:.04em;transition:color .15s}
.lm-cancel:hover{color:#8a9aa8}

/* ─── 申込モーダル ─── */
.am-overlay{display:none;position:fixed;inset:0;z-index:9100;background:rgba(0,0,0,.72);backdrop-filter:blur(4px);align-items:center;justify-content:center;padding:20px}
.am-overlay.open{display:flex}
.am-box{background:#1c1c1e;border:1px solid rgba(201,169,110,.2);border-radius:12px;padding:30px 26px 24px;max-width:400px;width:100%;animation:lmIn .2s ease-out;max-height:90vh;overflow-y:auto}
.am-ttl{font-family:'Shippori Mincho',serif;font-size:1rem;font-weight:600;color:#e8e0d4;margin-bottom:4px}
.am-sub{font-size:.68rem;color:#8a9aa8;margin-bottom:20px;line-height:1.6}
.am-field{margin-bottom:14px}
.am-lbl{display:block;font-size:.62rem;color:rgba(201,169,110,.8);margin-bottom:5px;letter-spacing:.06em}
.am-lbl em{font-style:normal;color:#8a9aa8;font-size:.57rem;margin-left:4px}
.am-input{width:100%;padding:10px 12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:4px;color:#e8e0d4;font-size:.78rem;font-family:'Noto Sans JP',sans-serif;outline:none;transition:border-color .15s}
.am-input:focus{border-color:rgba(201,169,110,.4)}
.am-textarea{width:100%;padding:10px 12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:4px;color:#e8e0d4;font-size:.76rem;font-family:'Noto Sans JP',sans-serif;outline:none;resize:vertical;min-height:72px;transition:border-color .15s}
.am-textarea:focus{border-color:rgba(201,169,110,.4)}
.am-agree{display:flex;gap:8px;align-items:flex-start;padding:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:4px;cursor:pointer;margin-bottom:18px}
.am-agree input{margin-top:2px;flex-shrink:0;accent-color:var(--lgold)}
.am-agree-txt{font-size:.68rem;color:#8a9aa8;line-height:1.65}
.am-agree-txt a{color:rgba(201,169,110,.8);text-decoration:underline}
.am-submit{width:100%;padding:13px;border-radius:4px;background:var(--lgold);color:var(--ld);font-family:'Shippori Mincho',serif;font-size:.88rem;letter-spacing:.08em;font-weight:600;border:none;cursor:pointer;transition:opacity .15s;margin-bottom:8px}
.am-submit:hover{opacity:.88}
.am-cancel{width:100%;padding:9px;border-radius:4px;background:none;border:none;color:#5a6a78;font-size:.67rem;cursor:pointer;transition:color .15s;font-family:inherit}
.am-cancel:hover{color:#8a9aa8}

/* ─── p6-dark: LIAISON ダークテーマ上書き ─── */
body.p6-dark{background:var(--lbg)}
.p6-dark .work-hero{background:var(--lbg);border-bottom-color:var(--lborder)}
.p6-dark .wh-arc{display:block;position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--lgold),transparent)}
.p6-dark .wh-eyebrow{color:var(--lmuted)}
.p6-dark .wh-title{color:var(--ltext)}
.p6-dark .wh-title-en{color:var(--lmuted)}
.p6-dark .wh-specs{border-color:var(--lborder)}
.p6-dark .wh-spec{border-bottom-color:var(--lborder)}
.p6-dark .wh-spec-lbl{color:var(--lmuted)}
.p6-dark .wh-spec-val{color:var(--ltext)}
.p6-dark .wh-price-block{display:block}
.p6-dark .wh-price{color:var(--lgold)}
.p6-dark .wh-price-lbl{color:var(--lmuted)}
.p6-dark .wh-price small{color:var(--lmuted)}
.p6-dark .wh-guide-btn{border-color:var(--lborder);background:rgba(255,255,255,.04);color:var(--lmuted)}
.p6-dark .wh-guide-btn:hover{border-color:var(--lborder2);color:var(--lgold)}
.p6-dark .btn-contact{background:rgba(255,255,255,.04);border-color:var(--lborder);color:var(--lmuted)}
.p6-dark .btn-contact:hover{border-color:var(--lborder2);color:var(--ltext)}
.p6-dark .btn-fav{border-color:var(--lborder);color:var(--lmuted)}
.p6-dark .btn-share-sm{border-color:var(--lborder);color:var(--lmuted)}
.p6-dark .btn-share-sm:hover{border-color:var(--lborder2);color:var(--lgold)}
.p6-dark .wh-venue-link{background:rgba(255,255,255,.04);border-color:var(--lborder);color:var(--lmuted)}
.p6-dark .wh-venue-link:hover{border-color:var(--lborder2)}
.p6-dark .wh-venue-link svg{color:var(--lgold)}
.p6-dark .wh-venue-link-ttl{color:var(--ltext)}
.p6-dark .wh-venue-link-sub{color:var(--lmuted)}
.p6-dark .wh-venue-arr{color:var(--lgold)}
.p6-dark .work-desc-section{background:var(--lbg2);border-top-color:var(--lborder)}
.p6-dark .wd-eyebrow{color:var(--lgold)}
.p6-dark .wd-ttl{color:var(--ltext)}
.p6-dark .wd-body{color:var(--lmuted)}
.p6-dark .wd-note{background:var(--lbg3);border-color:var(--lborder);box-shadow:none}
.p6-dark .wd-note-lbl{color:var(--lgold)}
.p6-dark .wd-note-body{color:var(--lmuted)}
.p6-dark .wd-note-sig{color:rgba(201,169,110,.7)}
.p6-dark .wd-tag{border-color:var(--lborder);color:var(--lmuted)}
.p6-dark .work-creator-section{background:var(--lbg);border-top-color:var(--lborder)}
.p6-dark .wcs-eyebrow{color:var(--lgold)}
.p6-dark .wcs-row{border-bottom-color:var(--lborder)}
.p6-dark .wcs-name{color:var(--ltext)}
.p6-dark .wcs-name-en{color:var(--lmuted)}
.p6-dark .wcs-gtag{border-color:var(--lborder);color:var(--lmuted)}
.p6-dark .wcs-follow{border-color:var(--lborder2);color:var(--lgold)}
.p6-dark .wcs-follow:hover{background:rgba(201,169,110,.1)}
.p6-dark .wcs-follow.following{background:rgba(201,169,110,.15);border-color:var(--lgold)}
.p6-dark .wcs-bio{color:var(--lmuted)}
.p6-dark .wcs-stat{color:var(--lmuted)}
.p6-dark .wcs-stat span{color:var(--lgold)}
.p6-dark .btn-creator-page{border-color:var(--lborder2);background:rgba(201,169,110,.05);color:var(--lgold)}
.p6-dark .btn-creator-page:hover{background:rgba(201,169,110,.12)}
.p6-dark .related-section{background:var(--lbg2);border-top-color:var(--lborder)}
.p6-dark .rel-eyebrow{color:var(--lgold)}
.p6-dark .rel-ttl{color:var(--ltext)}
.p6-dark .rel-more{color:var(--lmuted)}
.p6-dark .rel-more:hover{color:var(--lgold)}
.p6-dark .rel-card{background:var(--lbg3);border-color:var(--lborder)}
.p6-dark .rel-card:hover{border-color:var(--lborder2)}
.p6-dark .rel-card-title{color:var(--ltext)}
.p6-dark .rel-card-price{color:var(--lgold)}
.p6-dark .comments-section{background:var(--lbg);border-top-color:var(--lborder)}
.p6-dark .cmt-eyebrow{color:var(--lgold)}
.p6-dark .cmt-ttl{color:var(--ltext)}
.p6-dark .cmt-avg{color:var(--lgold)}
.p6-dark .cmt-avg-count{color:var(--lmuted)}
.p6-dark .cmt-card{background:var(--lbg2);border-color:var(--lborder)}
.p6-dark .cmt-avatar{border-color:var(--lborder)}
.p6-dark .cmt-user-name{color:var(--ltext)}
.p6-dark .cmt-user-date{color:var(--lmuted)}
.p6-dark .cmt-body{color:var(--lmuted)}
.p6-dark .cmt-empty{border-color:var(--lborder)}
.p6-dark .cmt-empty-txt{color:var(--lmuted)}
.p6-dark .cmt-post-box{background:var(--lbg2);border-color:var(--lborder2)}
.p6-dark .cmt-post-lbl{color:var(--lgold)}
.p6-dark .cmt-star-input-lbl{color:var(--lmuted)}
.p6-dark .cmt-star-btn{color:rgba(201,169,110,.25)}
.p6-dark .cmt-star-btn:hover,.p6-dark .cmt-star-btn.lit{color:var(--lgold)}
.p6-dark .cmt-star-selected-lbl{color:var(--lgold)}
.p6-dark .cmt-textarea{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12);color:var(--ltext)}
.p6-dark .cmt-textarea:focus{border-color:rgba(201,169,110,.4)}
.p6-dark .cmt-anon-label{color:var(--lmuted)}
.p6-dark .cmt-anon-label input{accent-color:var(--lgold)}
.p6-dark .cmt-submit{background:rgba(201,169,110,.15);border-color:var(--lborder2);color:var(--lgold)}
.p6-dark .cmt-submit:hover{background:rgba(201,169,110,.25)}
.p6-dark .cmt-login-prompt{background:rgba(255,255,255,.03);border-color:var(--lborder)}
.p6-dark .cmt-login-prompt p{color:var(--lmuted)}
.p6-dark .cmt-login-link{border-color:var(--lborder2);color:var(--lgold)}
.p6-dark .cmt-login-link:hover{background:rgba(201,169,110,.1)}
.p6-dark .share-section{background:var(--lbg);border-top-color:var(--lborder)}
.p6-dark .share-lbl{color:var(--lmuted)}
.p6-dark .share-btn{border-color:var(--lborder);color:var(--lmuted)}
.p6-dark .share-btn:hover{border-color:var(--lborder2);color:var(--lgold)}
.p6-dark .back-section{background:var(--lbg);border-top-color:var(--lborder)}
.p6-dark .back-ttl{color:var(--lmuted)}
.p6-dark .back-ex-card{background:var(--lbg2);border-color:var(--lborder)}
.p6-dark .back-ex-card:hover{border-color:var(--lborder2)}
.p6-dark .back-ex-ttl{color:var(--ltext)}
.p6-dark .back-ex-meta{color:var(--lmuted)}
.p6-dark .back-ex-arrow{color:var(--lgold)}
.p6-dark .btmnav{background:rgba(44,62,80,.96);border-top-color:var(--lborder)}
.p6-dark .bni{color:var(--lmuted)}
.p6-dark .bni:hover{color:var(--lgold)}
.p6-dark .bni-div{background:var(--lborder)}
.p6-dark .bni-login{background:rgba(255,255,255,.06);border-color:var(--lborder)}

/* ─── RESPONSIVE (p6) ─── */
@media(max-width:860px){
  .wh-inner{grid-template-columns:1fr;gap:28px}
  .wd-inner{grid-template-columns:1fr;gap:28px}
  .rel-grid{grid-template-columns:repeat(4,1fr)}
}
@media(max-width:520px){
  .rel-grid{grid-template-columns:repeat(3,1fr);gap:4px}
  .wh-inner,.work-desc-section,.work-creator-section,.related-section,.share-section,.seller-section,.back-section{padding-left:14px;padding-right:14px}
}
`;

fs.appendFileSync(path, css, 'utf8');
console.log('CSS appended successfully. New file size:', fs.statSync(path).size, 'bytes');
