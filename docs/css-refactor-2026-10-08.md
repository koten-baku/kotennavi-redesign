# CSS 見直しの反映ガイド（handoff-2026-10-08）

後工程（React CSR）向け。2026-10-08 に `kotennavi-common.css` を大きく見直した（**16,535 行 → 13,664 行・クラス 4,738 → 3,799**）。このファイルは、その変更を React 側の部品へ**すぐ反映するための手順と一覧**。決定の理由・経緯は `docs/handoff-decisions.md` 追174-288〜308（主題別索引から入る）。

- 範囲：`git diff handoff-2026-10-06..handoff-2026-10-08`
- **前提**：見た目は、下の「2. 意図して変えた見た目」以外は変わっていない。変更のたびに、Edge のヘッドレスで全146ページ×2幅（1280／390px）の全要素の計算済みスタイルを前後で比べて確かめた（6. 節）。

---

## 1. 反映の手順（おすすめの順）

1. **`kotennavi-common.css` は丸ごと差し替える**（部分的に写さない）。重複のまとめ・効いていない値の削除・規則の位置の移動が全体に入っているので、部分的に写すとカスケードの勝ち負けが変わる。
2. **HTML の構造が変わったページ**（3. 節）を、React の該当の部品に反映する。
3. **JS の文言の変更**（4. 節）を反映する。
4. **消したクラス**（末尾の一覧）を、React の部品・テンプレートから探して消す（どの HTML・JS にも出てこないことを確かめたうえで消しているので、残っていれば使われていない記述）。
5. **docs・CLAUDE.md の決まりの変更**（5. 節）を、部品の作り方に反映する。

---

## 2. 意図して変えた見た目（これ以外は変わっていない）

| 何が | 変更前 → 変更後 | 対象 | handoff |
|---|---|---|---|
| 2カラムのカラム間隔 | 左が箱：28px（P2・P7・P8）→ **20px**。左が箱なし：24px（P6）→ **28px** | 左が箱＝P2〜P2-5・P3・P4・P5・P7・P8（20px）／箱なし＝P6 系・P10 系（28px） | 追174-299 |
| 1カラムに切り替わる幅 | 900px（P2・P7・P8・P2-5・P6）→ **860px**（全ページ同じ・サイドナビ→下部ナビの幅） | 2カラムの全ページ | 追174-300 |
| 1カラム時の本文と右カラムの間 | 0／20／24px とばらばら → **20px** | 2カラムの全ページ | 追174-300 |
| 下の固定 CTA バー（P2・P3・P4） | 900px 以下で表示 → **860px 以下** | P2・P3・P4 系 | 追174-300 |
| P10 系の右カラムのカード間隔 | 20px → **12px**（P2〜P4 と同じ） | P10〜P10-3 | 追174-299 |
| P4 トップのセクションの箱 | `.p4-box`（見出し 17.6px・600、区切り線は内側だけ）→ **`.p2-ic`（P3 と同じ・見出し 20px・700、線は端から端）** | P4 | 追174-298 |
| P5 のヒーローのアバター（スマホ） | 80px → **56px**（680px 以下） | P5 系 | 追174-297 |
| 石垣状の記事カードのタイトル `.mc__title` | .9rem・字間 .03em → **.93rem・.01em**（カード共通の統一値） | P2-3 ほか `.mc` | 追174-306 |
| ウォッチ・興味あり！の押せる範囲（スマホ） | 見た目どおり（26〜32px）→ **44px**（透明な `::before`・見た目は同じ） | 860px 以下の `.ktn-icon-btn`・`.ktn-btn[data-action="watch"／"interest"]` | 追174-291 |
| 興味あり！・ウォッチのボタンの中身 | 禁止の書き方の名残 → **標準の形**（P4-2 の記事カードは丸いアイコンボタン、P6-1/P6-2 の右カラムは輪郭のハート、P3-1〜3 のおすすめのウォッチは標準のアイコン） | 下の 3. 節 | 追174-296 |
| 販売状態の表記 | 「売却済」「SOLD」（バッジ）→ **「売約済」** | P3-3・P5-3・pages.js | 追174-296 |
| P10 の詳しい条件 | 「新着」が無い → **「こだわり条件」の先頭に「新着」**（棚「新着掲載」のもっと見るもチップに着地） | P10 | 追174-289 |

---

## 3. HTML の構造の変更（React の部品に反映するもの）

### 3-1. 2カラムの共通の骨組み `.ktn-2col`（追174-300）

28 ページの2カラムに、共通クラスを**ページのクラスと併記**した。骨組み（grid・右 300px・カラム間隔・860px で1カラム・そのときの間 20px）は共通クラスが持ち、ページのクラスには上の余白・色帯・並び順などページの事情だけが残っている。

```html
<div class="p3-layout ktn-2col">                 <!-- 左が箱なしのページは ktn-2col--flat も -->
  <div class="p3-layout__main ktn-2col__main">…</div>
  <aside class="p3-layout__side ktn-2col__side">…</aside>
</div>
```

| ページ | 入れ物（ページのクラス） | `--flat` |
|---|---|---|
| P2・P7・P8 | `.p2-layout`（`__main`／`__side`） | — |
| P2-1〜P2-4 | `.p2-N-layout`（`.p2-N-main`／`.p2-N-side`） | — |
| P2-5・P2-5-1 | `.p25-layout`（`.p25-main-col`／`.p25-side-col`） | — |
| P3・P3-1〜3・P4・P4-1・P4-2 | `.p3-layout`（`__main`／`__side`） | — |
| P5・P5-1〜3（P5-4 は1カラムなので対象外） | `.p5-wrap`（`.p5-main`／`.p5-side`）※flex から grid に | — |
| P6・P6-1・P6-2 | `.p6-layout`（`.p6-col-main`／`.p6-col-side`） | ✓ |
| P10・P10-1〜3 | `.p10-layout`（`__main`／`__side`） | ✓ |

- **React**：`<TwoColumn flat?>` 1つにする（`main`／`side` のスロット）。カラム間隔の変数は `--col-gap`（20px）／`--col-gap-flat`（28px・新設）。
- 新しいページで2カラムにするときも、ページのクラスに grid・幅・間隔・切り替わる幅を書かない（CLAUDE.md の新規ページのチェックリスト7）。

### 3-2. P4 トップのセクション（追174-298）

`#p4-sec-exhibitions`・`#p4-sec-profile` を、P3 と同じ情報カードの形に変えた。`.p4-box` は廃止。

```html
<!-- 変更前 -->
<section id="p4-sec-exhibitions" class="p4-box ktn-csec">
  <div class="ktn-section__head"><span class="ktn-section__title">展覧会…</span> …</div>
  …中身…
</section>
<!-- 変更後（P3 の #p3-sec-* と同じ） -->
<section id="p4-sec-exhibitions" class="p2-ic is-open ktn-csec">
  <div class="p2-ic__head"><span class="p2-ic__head-title">展覧会…</span> …</div>
  <div class="p2-ic__body">…中身…</div>
</section>
```

ギャラリー情報の背景（`--paper`）は `#p4-sec-profile.p2-ic` に付け替えた。

### 3-3. 興味あり！・ウォッチのボタン（追174-296）

`onclick="this.classList.toggle('on')"`（禁止の書き方）の 50 か所を、`handleAction` を通す標準の形に直した（ゲストのログイン案内・tip・トーストが動く）。標準の形は `docs/component-html.md`。

| ページ | 変更 |
|---|---|
| P3・P3-1・P4・P4-1 | カードの興味あり！：`data-action="interest"`＋`handleAction(this,'interest')` を足しただけ（中身はそのまま） |
| P6-1・P6-2 | 右カラムの展覧会カードの興味あり！：塗りの SVG を標準の輪郭のハートに（`buildSideEcCard` と同じ） |
| P3-1・P3-2・P3-3 | おすすめのクリエイターのウォッチ（`.ktn-btn`）：`<use href="#icon-watch" color>` を標準の SVG（`circle`＋`wi-inner`）・`data-action="watch"`・`data-off`／`data-on` に |
| P4-2 | 記事カードの旧 `.itn-btn`（ピル型）を、P3-2 と同じ `.ktn-icon-btn` に |

### 3-4. そのほか

- **アイコン型のウォッチ**（`.ktn-icon-btn[data-action="watch"]`）は使わない（ウォッチはクリエイター・ギャラリーだけ＝ピル型のみ）。CSS も削除。
- `index.html`：旧トップの試作（2,288 行）→ **今のトップ P1 へ移動するだけのページ**（noindex）。
- 削除したファイル：作業用スクリプト（`_common_fix.js`・`_common_fix2.js`・`_p25_big_fix.js`・`_p25_fix2.js`・`_p25_fix3.js`・`append_p6_css.js`）、古い試作（`work_detail.html`・`work_detail_liaison.html`・`work_detail_normal.html`・`pwa_install_guide.html`）。

---

## 4. JS の変更

- `kotennavi-pages.js`：販売状態のバッジの文言「SOLD」（4つの生成関数の `STATUS_BADGE` 等）と「売却済」（1か所）を **「売約済」** に。SOLD は作品画像のリボン（`aw__sold-ribbon`／`p25c__sold-ribbon`）だけ。
- P10：`PRESET_AS_CHIP` に `new-all`→`new:1`（新着順）を追加（棚「新着掲載」のもっと見るをチップに着地）。
- 10-06〜10-07 分（前回の引き渡し後・同じ範囲に入る）：新着と NEW の単一ソース `KTN.NEW_DAYS`・`KTN.isNewItem`・`KTN.newBadge`（common.js）、巻頭 Opening・P90-19（`KTN.TOP`）。追174-285〜287。

---

## 5. 決まりの変更（CLAUDE.md・docs）

| 決まり | 内容 | 場所 |
|---|---|---|
| 2カラム | `.ktn-2col` を併記して使う。左が箱なしなら `--flat`。ページのクラスに骨組みを書かない | CLAUDE.md 新規ページのチェックリスト7・レイアウト共通値の表 |
| サイドカード | `.p2-side-card` を使い回し、ページの事情は `.pN-side-xxx` を併記（`.pN-side-card` を新しく作らない） | CLAUDE.md チェックリスト3・右カラム共通コンポーネント |
| editorial v2・P70 Refinement | **確定済み**。上書きされて効かない前の値は削除したので、まとまりを消しても元に戻らない（戻すときは git）。前の定義とまとまりの両方にある同じセレクタは、前＝骨組み・まとまり＝見た目と別のプロパティを受け持つ | CLAUDE.md エディトリアル・リファインメント v2 |
| 記事・レビューのカード | `.mc`（石垣状）・`.lc`（横長のリスト）。旧 `.ac`／`.rc` は廃止。`.lc__title` は .84rem の例外 | CLAUDE.md カード共通ルール |
| docs | 古い資料は `docs/archive/`（正本ではない）。各ファイルの役割は `docs/README.md`。HTML の基準（SEO の head・構造化データ・スマホの入力）は `docs/html-baseline.md` | docs/README.md |
| progress.md | 先頭の「現在の状態」＋最近2週間の記録。古い記録は `docs/archive/progress-2026-09-23以前.md` | CLAUDE.md 進捗管理ルール |

---

## 6. React 化のときにやるとよいこと（今回は手を付けていない）

- **同じセレクタが2か所にある約100組**：前の定義（骨組み）と editorial v2 のまとまり（見た目）に分かれている。位置を動かしてまとめると、同じ部品の別の変種（`__box` と `__box--venue` 等）との勝ち負けが入れ替わる（実際に P70 の図の線が 2→3px に変わった）ので、今回は見送った。**部品ごとに CSS を組み直すときに、関係する規則をまとめて1か所にする**。
- 検証のしかた（今回使った方法）：Edge のヘッドレス（`msedge --headless=new --dump-dom`）で、各ページの全要素（::before/::after 含む）の `getComputedStyle` を書き出して前後比較。**transition／animation を切る・CSS 変数（`--hh` など）は除く**（入れると毎回ぶれる）。P1・P60-15（開くたびに中身が変わる）、P10 系やフッターの高さ（測るたびに変わる）はぶれなので、同じ CSS で2回測って確かめる。

---

## 付録：削除したクラス（954 個・部品ごと）

どの HTML・JS（デモを含む）にも出てこないことを確かめて削除した。JS が文字列をつないで作るクラス（`'p61-role-chip--' + 種類` など）は残している。「部品ごと」＝その名前自体も消えた／「一部」＝部品は残っていて、書いた要素・変種だけが消えた。

- `.ac`（一部）：`--h` `__author` `__body` `__byline` `__byline-sep` `__date` `__exh` `__exh-link` `__foot` `__img` `__img-ph` `__title`
- `.aw`（一部）：`__applicants` `__apply-btn` `__mini-year` `__price-row` `__status`
- `.back-ex-arrow`（部品ごと）
- `.back-ex-card`（部品ごと）
- `.back-ex-meta`（部品ごと）
- `.back-ex-poster`（部品ごと）
- `.back-ex-ttl`（部品ごと）
- `.back-section`（部品ごと）
- `.back-ttl`（部品ごと）
- `.badge-l`（部品ごと）：`--liaison`
- `.bni`（部品ごと）
- `.bni-div`（部品ごと）
- `.bni-login`（部品ごと）
- `.btmnav`（部品ごと）
- `.btn-applied`（部品ごと）
- `.btn-applied-num`（部品ごと）
- `.btn-apply`（部品ごと）：`--sub`
- `.btn-apply-count`（部品ごと）
- `.btn-contact`（部品ごと）
- `.btn-dashboard`（部品ごと）
- `.btn-fav`（部品ごと）
- `.cc`（一部）：`__page-link`
- `.ci-badge`（部品ごと）
- `.cmt-anon-label`（部品ごと）
- `.cmt-avg`（部品ごと）
- `.cmt-avg-count`（部品ごと）
- `.cmt-avg-stars`（部品ごと）
- `.cmt-post-lbl`（部品ごと）
- `.cmt-summary`（部品ごと）
- `.cmt-verified`（部品ごと）
- `.code-comment`（部品ごと）
- `.code-prop`（部品ごと）
- `.code-selector`（部品ごと）
- `.code-val`（部品ごと）
- `.creator`（部品ごと）
- `.dev-ph`（部品ごと）：`--footer` `--sidebar`
- `.ec`（一部）：`__poster-img` `__poster-img--empty` `__poster-inner` `__poster-label` `__poster-text` `__remain-lt--ended`
- `.ec-list`（部品ごと）
- `.following`（部品ごと）
- `.gallery`（部品ごと）
- `.ins-grow`（部品ごと）：`__stat`
- `.ins-kpi`（一部）：`__delta--down` `__delta--flat`
- `.ins-next`（一部）：`__body` `__item` `__list` `__msg` `__num`
- `.is-following`（部品ごと）
- `.itn-btn`（部品ごと）
- `.ktn-auth-action-badge`（部品ごと）
- `.ktn-axis-fill-chips`（部品ごと）
- `.ktn-content`（一部）：`--detail`
- `.ktn-ddmenu`（一部）：`--txn`
- `.ktn-edit-head`（一部）：`__badge` `__row`
- `.ktn-grid`（部品ごと）：`--2col` `--3col` `--4col`
- `.ktn-io-tag`（一部）：`--self`
- `.ktn-list`（部品ごと）
- `.ktn-masonry`（部品ごと）
- `.ktn-masonry-item`（部品ごと）
- `.ktn-modal`（一部）：`__icon`
- `.ktn-sub-rec`（一部）：`__grid` `__head` `__more` `__title` `__title-en`
- `.ktn-tag`（部品ごと）
- `.nc`（一部）：`__img` `__img-ph`
- `.p1-more-wrap`（部品ごと）
- `.p10-layout`（部品ごと）
- `.p2-1-attend-chip`（部品ごと）：`--today` `__date` `__dow` `__mark`
- `.p2-1-attendance-grid`（部品ごと）
- `.p2-1-cal-card`（部品ごと）：`__btns` `__desc` `__icon` `__title`
- `.p2-1-cal-grid`（部品ごと）
- `.p2-1-day-card`（部品ごと）：`--closed` `--past` `--special` `--today` `__attend` `__body` `__date` `__dow` `__ev-label` `__ev-time` `__event` `__event--special` `__gcal` `__md` `__status--closed` `__time`
- `.p2-1-event-list`（部品ごと）
- `.p2-1-hours-grid`（部品ごと）
- `.p2-1-hours-row`（部品ごと）：`--closed` `--open`
- `.p2-1-hours-time`（部品ごと）：`--closed` `__note` `__val`
- `.p2-1-main`（部品ごと）
- `.p2-1-nav-link`（部品ごと）：`__body` `__icon` `__sub` `__title`
- `.p2-1-nav-links`（部品ごと）
- `.p2-1-page-head`（部品ごと）：`__exh` `__eyebrow` `__inner` `__remain` `__title`
- `.p2-1-sched-badge`（部品ごと）：`--special`
- `.p2-1-sched-item`（部品ごと）：`--past` `--special` `__add` `__add--ical` `__body` `__date` `__datenum` `__dow` `__meta` `__note` `__time` `__title`
- `.p2-1-section`（一部）：`__en` `__icon`
- `.p2-1-status-card`（部品ごと）：`__item` `__lbl` `__num` `__row` `__sep`
- `.p2-12-liaison-section`（一部）：`__desc` `__head` `__title`
- `.p2-12-lp-promo`（部品ごと）：`__apply` `__body` `__catch` `__logo` `__more`
- `.p2-12-mode-release`（部品ごと）
- `.p2-121-active-badge`（部品ごと）：`__icon`
- `.p2-121-lock-info`（部品ごと）
- `.p2-121-period-footer`（部品ごと）
- `.p2-121-price-wrap`（一部）：`__tax`
- `.p2-121-section-head`（部品ごと）：`__desc` `__row` `__title`
- `.p2-121-ship-field`（一部）：`--wide`
- `.p2-121-ship-footer`（部品ごと）
- `.p2-2-access-item`（部品ごと）：`__body` `__detail` `__icon` `__icon--bus` `__icon--car` `__icon--train` `__line`
- `.p2-2-access-list`（部品ごと）
- `.p2-2-facilities`（部品ごと）
- `.p2-2-facility`（部品ごと）：`--fee` `--ng` `--ok` `__note`
- `.p2-2-facility-item`（部品ごと）
- `.p2-2-layout`（部品ごと）
- `.p2-2-main`（部品ごと）
- `.p2-2-map-card`（部品ごと）：`__addr` `__body` `__head`
- `.p2-2-page-head`（部品ごと）：`__exh` `__title`
- `.p2-2-side-link`（部品ごと）：`__body` `__icon` `__sub` `__title`
- `.p2-2-side-links`（部品ごと）
- `.p2-2-social-icon`（部品ごと）
- `.p2-2-social-row`（部品ごと）
- `.p2-3-entry-grid`（部品ごと）
- `.p2-3-entry-item`（部品ごと）：`--highlight` `__label` `__note` `__val`
- `.p2-3-event-item`（部品ごと）：`__name` `__summary`
- `.p2-3-event-list`（部品ごと）
- `.p2-3-faq-a`（部品ごと）
- `.p2-3-faq-list`（部品ごと）
- `.p2-3-faq-q`（一部）：`__chev` `__mark` `__text`
- `.p2-3-inquiry`（部品ごと）：`__btn` `__contact` `__desc` `__email` `__meta` `__name` `__title`
- `.p2-3-layout`（部品ごと）
- `.p2-3-link-item`（部品ごと）：`__title` `__url`
- `.p2-3-link-list`（部品ごと）
- `.p2-3-main`（部品ごと）
- `.p2-3-page-head`（部品ごと）：`__exh` `__title`
- `.p2-3-rule`（部品ごと）：`--cond` `--ng` `--ok` `__body` `__detail` `__icon` `__title`
- `.p2-3-rules`（部品ごと）
- `.p2-3-section`（一部）：`__body`
- `.p2-3-side-action`（部品ごと）：`__btn` `__btn--checkin` `__btn--interest` `__count` `__count-sep` `__counts` `__divider` `__lbl` `__num` `__sub` `__sub-btn`
- `.p2-3-side-link`（部品ごと）：`__body` `__icon` `__sub` `__title`
- `.p2-3-side-links`（部品ごと）
- `.p2-4-creator-card`（一部）：`__counts`
- `.p2-4-layout`（部品ごと）
- `.p2-4-liaison-cta`（部品ごと）：`__btn` `__logo` `__text`
- `.p2-4-page-head`（部品ごと）：`__exh` `__meta` `__title`
- `.p2-4-side-card`（部品ごと）：`__body` `__head`
- `.p2-5-creator-card`（部品ごと）：`__bio` `__en` `__genre` `__link` `__name` `__thumb` `__thumbs`
- `.p2-5-creator-grid`（部品ごと）
- `.p2-5-creator-profile-grid`（部品ごと）
- `.p2-5-creators`（部品ごと）：`__head` `__inner` `__sub-head`
- `.p2-5-exh-card`（部品ごと）：`__arrow` `__body` `__date` `__meta` `__poster` `__title` `__venue`
- `.p2-5-exh-link`（部品ごと）：`__inner` `__label`
- `.p2-5-filter`（部品ごと）：`__btn`
- `.p2-5-hero`（部品ごと）：`__en` `__inner` `__logo` `__meta` `__meta-item` `__online` `__online-dot` `__sub` `__sub-label` `__title`
- `.p2-about`（一部）：`__divider` `__link-sep` `__tag` `__tags`
- `.p2-abtn`（部品ごと）
- `.p2-action-widget`（一部）：`__btn` `__btn--checkin` `__btn--interest` `__count-sep` `__divider`
- `.p2-article-head`（一部）：`__en` `__more`
- `.p2-cc-avatar`（部品ごと）：`--ph`
- `.p2-cc-body`（部品ごと）
- `.p2-cc-counts`（部品ごと）
- `.p2-cc-genre`（部品ごと）
- `.p2-cc-name`（部品ごと）
- `.p2-creator`（部品ごと）：`__body` `__counts` `__genre` `__name` `__sub` `__watch`
- `.p2-creator-card`（部品ごと）：`--ph`
- `.p2-creator-exs`（部品ごと）：`__av` `__grid` `__head` `__lbl` `__name`
- `.p2-creator-more`（部品ごと）
- `.p2-ec`（一部）：`__dbadge--cl`
- `.p2-grid`（部品ごと）
- `.p2-hero`（部品ごと）：`__caption` `__count` `__img` `__nav` `__nav--next` `__nav--prev` `__thumb` `__thumbs`
- `.p2-ic`（一部）：`__head-en` `__sub`
- `.p2-info`（部品ごと）：`__action` `__btns` `__count-item` `__count-lbl` `__count-num` `__counts` `__dash` `__date` `__dow` `__facts` `__forsale` `__meta` `__posted` `__qr` `__qr-box` `__qr-text` `__sub` `__time` `__title`
- `.p2-inq`（部品ごと）：`__btn` `__email` `__label` `__name` `__row`
- `.p2-layout`（一部）：`__main`
- `.p2-lb-sm`（部品ごと）：`__body` `__btn` `__logo`
- `.p2-ph-bar`（部品ごと）：`--count` `--genre` `--name`
- `.p2-ph-watch`（部品ごと）
- `.p2-posted`（部品ごと）：`__counts` `__dates` `__follow` `__label` `__meta` `__name` `__name-sub` `__row` `__sub`
- `.p2-related`（一部）：`__en`
- `.p2-sec-label`（部品ごと）
- `.p2-share`（部品ごと）：`__btn` `__btns` `__label`
- `.p2-side-ec`（一部）：`__badge` `__ldot`
- `.p2-side-facts`（一部）：`__dash` `__date` `__dl` `__dow` `__time`
- `.p2-side-inq`（部品ごと）：`__btn` `__label`
- `.p2-side-posted`（部品ごと）：`__counts` `__follow` `__label` `__meta` `__name` `__row` `__sub`
- `.p2-sub-near-item`（一部）：`__badge`
- `.p2-sub-nearby`（部品ごと）：`__head` `__more` `__title`
- `.p2-subnav`（一部）：`__inner` `__liaison-logo`
- `.p2-title-band`（一部）：`__forsale` `__posted`
- `.p2-watcher-item`（一部）：`__avatar--creator` `__avatar--gallery`
- `.p211-block`（一部）：`__body--tight` `__subhead`
- `.p211-liaison-locknote`（部品ごと）
- `.p211-liaison-opt`（部品ごと）：`__body` `__check` `__desc` `__link` `__req` `__title`
- `.p211-qr-nudge`（部品ごと）：`__close` `__icon` `__text`
- `.p25-about`（部品ごと）
- `.p25-about-body`（部品ごと）
- `.p25-about-label`（部品ごと）
- `.p25-about-section`（部品ごと）
- `.p25-card`（部品ごと）：`__artist` `__spec` `__title`
- `.p25-feature`（一部）：`__icon` `__text` `__title`
- `.p25-fullwidth`（部品ごと）
- `.p25-side-btm`（部品ごと）
- `.p25-side-mid`（部品ごと）
- `.p25-side-top`（部品ごと）
- `.p25-works`（部品ごと）
- `.p25-works-count`（部品ごと）
- `.p25-works-head`（部品ごと）
- `.p25-works-section`（部品ごと）
- `.p2aw-label`（部品ごと）
- `.p3-1-glbl`（一部）：`--ending`
- `.p3-1-page`（部品ごと）
- `.p3-2-page`（部品ごと）
- `.p3-about`（一部）：`__dl` `__text`
- `.p3-accordion`（一部）：`__body-inner` `__chev` `__title`
- `.p3-action-watch-count`（部品ごと）
- `.p3-articles-list`（部品ごと）
- `.p3-box`（部品ごと）
- `.p3-dealer-card`（部品ごと）：`__city` `__name`
- `.p3-dealer-grid`（部品ごと）
- `.p3-exh-grid`（部品ごと）
- `.p3-exh-group`（部品ごと）：`__hd`
- `.p3-head`（一部）：`__fn` `__fn-badge` `__fn-desc` `__fn-en` `__fn-title`
- `.p3-links`（部品ごと）：`__icon` `__item` `__name` `__url`
- `.p3-links-info-grid`（部品ごと）
- `.p3-mgmt-btn`（部品ごと）
- `.p3-photos`（部品ごと）
- `.p3-prof-gallery`（部品ごと）
- `.p3-prof-gallery-caption`（部品ごと）
- `.p3-prof-gallery-item`（部品ごと）
- `.p3-prof-layout`（部品ごと）
- `.p3-prof-main`（部品ごと）
- `.p3-prof-side`（部品ごと）
- `.p3-recommended`（部品ごと）：`__grid` `__inner`
- `.p3-related`（部品ごと）：`__inner`
- `.p3-sec-more`（部品ごと）
- `.p3-side-card`（部品ごと）：`__sep` `__sub` `__sub-btn` `__title`
- `.p3-side-cta`（一部）：`__count` `__sep` `__sub`
- `.p3-side-dl`（部品ごと）
- `.p3-side-liaison`（部品ごと）：`__badge` `__desc` `__link`
- `.p3-side-links`（部品ごと）
- `.p3-tabnav`（一部）：`__fn` `__fn-dot` `__fn-label`
- `.p3-works-grid`（部品ごと）
- `.p313-tab-panel`（部品ごと）
- `.p315-apply-body`（部品ごと）
- `.p315-apply-detail`（部品ごと）
- `.p315-apply-row`（一部）：`--active` `--cancelled` `__cancelled-date` `__date` `__deadline` `__link` `__num` `__status` `__time`
- `.p315-apply-status`（一部）：`--cancel` `--cancelled`
- `.p315-apply-summary`（部品ごと）
- `.p315-archive-details`（部品ごと）
- `.p315-archive-head`（部品ごと）：`__badges` `__meta` `__term` `__title`
- `.p315-archive-result`（一部）：`__link` `__val--done`
- `.p315-archive-summary`（部品ごと）：`__count`
- `.p315-exh-work-item`（部品ごと）：`--active` `--sold` `__artist` `__ops` `__price` `__title` `__txn`
- `.p315-exh-work-list`（部品ごと）
- `.p315-index`（部品ごと）：`__count` `__head` `__list` `__title`
- `.p315-index-row`（部品ごと）：`--action` `--live` `__alert` `__body` `__chevron` `__counts` `__meta` `__name` `__sep` `__status`
- `.p315-page-head`（部品ごと）：`__desc` `__en` `__title`
- `.p315-schedule`（部品ごと）：`__dates` `__label` `__remain` `__row` `__status-text` `__status-text--ended` `__status-text--live` `__status-text--soon`
- `.p315-summary`（部品ごと）：`__amount` `__amount-row` `__count` `__count-label` `__count-unit` `__counter` `__currency` `__label` `__mgmt-link` `__num` `__sub` `__sub-amount` `__sub-label`
- `.p315-turn-head`（部品ごと）：`--theirs` `__count` `__dot`
- `.p315-turn-section`（部品ごと）
- `.p315-txn-row`（一部）：`__cancelled-date` `__note`
- `.p315-txn-status`（部品ごと）：`__dot` `__item` `__item--action` `__item--user` `__sep`
- `.p315-work-card`（部品ごと）：`--alert` `--nsale` `__actions` `__alert-bar` `__alert-link` `__artist` `__body` `__ops` `__ops-label` `__price` `__price-row` `__queue` `__queue__num` `__spec` `__thumb` `__title`
- `.p315-work-group`（部品ごと）：`__artist` `__exh` `__head` `__ops` `__price` `__title`
- `.p315-work-list`（部品ごと）
- `.p315-ws-badge`（一部）：`--done` `--note`
- `.p316-complete-msg`（部品ごと）：`__input` `__label`
- `.p316-decline-reason`（部品ごと）
- `.p316-decline-reason-label`（部品ごと）
- `.p316-rate-carrier-head`（部品ごと）
- `.p316-rate-table`（部品ごと）：`__price`
- `.p316-ship-form`（一部）：`__input--readonly`
- `.p316-ship-total`（部品ごと）
- `.p317-balance`（部品ごと）：`__item` `__lbl` `__num` `__sub`
- `.p317-stripe-status`（一部）：`--pending`
- `.p4-1-page`（部品ごと）
- `.p4-2-page`（部品ごと）
- `.p4-articles-list`（部品ごと）
- `.p4-box`（部品ごと）
- `.p4-head`（一部）：`--compact` `--no-image`
- `.p4-prof-layout`（部品ごと）
- `.p4-prof-main`（部品ごと）
- `.p4-prof-side`（部品ごと）
- `.p4-prof-web-link`（部品ごと）
- `.p4-recommended`（部品ごと）：`__inner`
- `.p4-sec-more`（部品ごと）
- `.p4-side-card`（部品ごと）：`__sub` `__sub-btn` `__title`
- `.p4-side-cta`（一部）：`__count` `__sep` `__sub`
- `.p4-side-exhibition`（部品ごと）
- `.p4-tabnav`（一部）：`__name`
- `.p5-1-filter-bar`（部品ごと）
- `.p5-1-sort`（部品ごと）
- `.p5-2-checkin-date`（部品ごと）
- `.p5-2-filter-bar`（部品ごと）
- `.p5-2-sort`（部品ごと）
- `.p5-3-filter-bar`（部品ごと）
- `.p5-3-sort`（部品ごと）
- `.p5-exh-card`（一部）：`__sep`
- `.p5-filter-bar`（部品ごと）：`__bottom` `__label`
- `.p5-filter-btns`（部品ごと）
- `.p5-layout`（一部）：`__side`
- `.p5-list-tab`（部品ごと）
- `.p5-list-tabs`（部品ごと）
- `.p5-opt-toggle`（部品ごと）
- `.p5-side-card`（部品ごと）：`__title`
- `.p5-side-link`（部品ごと）：`__arr` `__label`
- `.p5-side-links`（部品ごと）：`__title`
- `.p5-side-near-date`（部品ごと）
- `.p5-side-near-dow`（部品ごと）
- `.p5-side-near-info`（部品ごと）
- `.p5-side-near-item`（部品ごと）
- `.p5-side-near-md`（部品ごと）
- `.p5-side-near-remain`（部品ごと）：`--ending`
- `.p5-side-near-title`（部品ごと）
- `.p5-side-rec-body`（部品ごと）
- `.p5-side-rec-dates`（部品ごと）
- `.p5-side-rec-item`（部品ごと）
- `.p5-side-rec-poster`（部品ごと）
- `.p5-side-rec-title`（部品ごと）
- `.p5-side-rec-venue`（部品ごと）
- `.p5-side-stat-row`（部品ごと）：`__count` `__label`
- `.p5-side-stat-since`（部品ごと）：`__label`
- `.p5-side-stats`（部品ごと）：`__title`
- `.p5-side-trending`（部品ごと）
- `.p5-side-trending-count`（部品ごと）
- `.p5-side-trending-counts`（部品ごと）
- `.p5-side-trending-info`（部品ごと）
- `.p5-side-trending-item`（部品ごと）
- `.p5-side-trending-name`（部品ごと）
- `.p5-side-trending-watch`（部品ごと）
- `.p5-side-widget`（一部）：`__body` `__body--rec` `__sep` `__sub-label` `__sub-label--mt` `__title`
- `.p514-aw`（一部）：`__strip-note` `__strip-queue`
- `.p514-modal`（一部）：`__artwork-name` `__thumb`
- `.p515-aw-card`（部品ごと）：`__badges` `__body` `__creator` `__exh` `__exh-link` `__price` `__seller` `__seller-label` `__seller-link` `__thumb` `__title`
- `.p515-cancel`（部品ごと）：`__note`
- `.p515-comments`（一部）：`__apply` `__apply-label` `__apply-text`
- `.p515-purchase-art`（一部）：`__lb`
- `.p515-purchase-seller`（一部）：`__arr`
- `.p515-seller`（部品ごと）：`__arr` `__badges` `__card` `__label` `__name`
- `.p515-status`（一部）：`__badge--queue`
- `.p515-venue-note`（部品ごと）
- `.p6-hero`（一部）：`__section-label`
- `.p6-liaison`（一部）：`--li` `__banner-cta` `__btn-apply-queue` `__btn-inq` `__btn-inq-light` `__btn-inq2` `__notice` `__status-badge` `__status-badge--forsale` `__status-badge--nonsale` `__status-badge--pending` `__status-badge--sold`
- `.p6-more-by`（部品ごと）：`__banner` `__banner-label` `__banner-more` `__banner-name` `__grid` `__item` `__thumb` `__title`
- `.p6-rec-works`（部品ごと）
- `.p70-concept-diagram`（一部）：`__box-label`
- `.p70-dl`（一部）：`__logo-cell` `__logo-label`
- `.p70-fee-table`（部品ごと）
- `.p70-flow`（一部）：`__endpoint` `__endpoint--end` `__endpoint--start` `__endpoint-label` `__endpoint-sub`
- `.p70-lead`（一部）：`--cap`
- `.p70-path-diagram`（一部）：`__badge` `__step--required`
- `.p9017-chip`（一部）：`__x`
- `.p9017-term`（部品ごと）：`__sep`
- `.p902-return-panel`（一部）：`__free` `__reasons`
- `.p902-review-modal`（部品ごと）
- `.p902-review-panel`（一部）：`__close`
- `.p909-cell`（一部）：`__screen`
- `.pb-avatar`（部品ごと）
- `.pb-cnt`（部品ごと）
- `.pb-counts`（部品ごと）
- `.pb-follow`（部品ごと）
- `.pb-lbl`（部品ごと）
- `.pb-liaison`（部品ごと）
- `.pb-meta`（部品ごと）
- `.pb-name`（部品ごと）
- `.pb-name-sub`（部品ごと）
- `.pb-row`（部品ごと）
- `.pb-type-badge`（部品ごと）
- `.ph-2`（部品ごと）
- `.ph-5`（部品ごと）
- `.preview-label`（部品ごと）
- `.rc`（部品ごと）：`--h` `__author` `__body` `__byline` `__byline-sep` `__date` `__exh-link` `__exhibition` `__exhibition-title` `__foot` `__img` `__img-ph` `__title`
- `.rel-eyebrow`（部品ごと）
- `.rel-grid`（部品ごと）
- `.rel-header`（部品ごと）
- `.rel-inner`（部品ごと）
- `.rel-more`（部品ごと）
- `.rel-ttl`（部品ごと）
- `.related-section`（部品ごと）
- `.rv-date`（部品ごと）
- `.rv-item`（部品ごと）
- `.seller-inner`（部品ごと）
- `.seller-section`（部品ごと）
- `.share-btn`（部品ごと）
- `.share-btns`（部品ごと）
- `.share-inner`（部品ごと）
- `.share-lbl`（部品ごと）
- `.share-section`（部品ごと）
- `.thumb-tr`（部品ごと）
- `.view-bar`（部品ごと）
- `.view-btn`（部品ごと）
- `.wc-inner`（部品ごと）
- `.wcd-comment`（部品ごと）
- `.wcd-comment-body`（部品ごと）
- `.wcd-comment-form`（部品ごと）
- `.wcd-comment-meta`（部品ごと）
- `.wcs-avatar`（部品ごと）
- `.wcs-bio`（部品ごと）
- `.wcs-eyebrow`（部品ごと）
- `.wcs-follow`（部品ごと）
- `.wcs-genre`（部品ごと）
- `.wcs-gtag`（部品ごと）
- `.wcs-info`（部品ごと）
- `.wcs-liaison-badge`（部品ごと）
- `.wcs-name`（部品ごと）
- `.wcs-name-en`（部品ごと）
- `.wcs-row`（部品ごと）
- `.wcs-stat`（部品ごと）
- `.wcs-stats`（部品ごと）
- `.wd-eyebrow`（部品ごと）
- `.wd-inner`（部品ごと）
- `.wd-note`（部品ごと）
- `.wd-note-body`（部品ごと）
- `.wd-note-lbl`（部品ごと）
- `.wd-note-sig`（部品ごと）
- `.wd-ttl`（部品ごと）
- `.wh-actions`（部品ごと）
- `.wh-arc`（部品ごと）
- `.wh-eyebrow`（部品ごと）
- `.wh-guide-btn`（部品ごと）
- `.wh-guide-links`（部品ごと）
- `.wh-img-bg`（部品ごと）
- `.wh-img-corner`（部品ごと）
- `.wh-img-label`（部品ごと）
- `.wh-img-main`（部品ごと）
- `.wh-inner`（部品ごと）
- `.wh-liaison-dot`（部品ごと）
- `.wh-price`（部品ごと）
- `.wh-price-block`（部品ごと）
- `.wh-price-lbl`（部品ごと）
- `.wh-price-sub`（部品ごと）
- `.wh-qty`（部品ごと）
- `.wh-reserved-notice`（部品ごと）
- `.wh-sold-bar`（部品ごと）
- `.wh-specs`（部品ごと）
- `.wh-status-row`（部品ごと）
- `.wh-title`（部品ごと）
- `.wh-title-en`（部品ごと）
- `.wh-venue-arr`（部品ごと）
- `.wh-venue-link`（部品ごと）
- `.wh-venue-link-body`（部品ごと）
- `.wh-venue-link-sub`（部品ごと）
- `.wh-venue-link-ttl`（部品ごと）
- `.wh-venue-notice`（部品ごと）
- `.wh-venue-notice-body`（部品ごと）
- `.wh-venue-notice-icon`（部品ごと）
- `.wh-venue-notice-sub`（部品ごと）
- `.wh-venue-notice-ttl`（部品ごと）
- `.work-creator-section`（部品ごと）
- `.work-hero`（部品ごと）
