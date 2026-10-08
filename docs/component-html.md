# コンポーネントHTMLテンプレート

このファイルは `CLAUDE.md` のコンポーネントHTML定義を分離したものです。
コンポーネントを実装する際は Read tool で参照してください。

> **2026-10-08 に全体を今の実装（common.css・各 HTML・pages.js の生成関数）と突き合わせて書き直した。**
> 運用ルールの正本は CLAUDE.md。CSS の値は「最後に効いているもの」を書いている（`.ktn-btn`・`.ktn-icon-btn`・`.ci-badge` の重複した定義は 2026-10-08 に1か所へまとめた＝効いている値は変えていない・handoff 追174-296）。

---

### 共通コンポーネント：サイドカラム展覧会カード（`.p2-side-ec`）

右カラムの展覧会ミニカード。P2「近くの展覧会」・P3「アートの展覧会」・P5「最近の興味あり！」などで共用。JS 生成関数：`buildSideEcCard(e)`（`kotennavi-pages.js`）。

```html
<a class="p2-side-ec" href="kotennavi-p2.html">
  <div class="p2-side-ec__media">
    <!-- 距離（e.dist があるときだけ＝「近くの展覧会」のみ。ピン＋距離・ポスターの真上） -->
    <span class="p2-side-ec__dist">…1.2km</span>
    <div class="p2-side-ec__poster" style="background:#c8d0dc"></div>
  </div>
  <div class="p2-side-ec__body">
    <div class="p2-side-ec__badge-row">
      <span class="cb cb-content cb-exhibition">exhibition</span>
      <!-- LIAISON があるときだけ -->
      <span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>
    </div>
    <div class="p2-side-ec__name">展覧会名</div>
    <div class="p2-side-ec__venue">東京 · Gallery 名</div>
    <div class="p2-side-ec__period">2026. 03.01 — 03.30</div>
  </div>
  <button class="ktn-icon-btn" data-action="interest"
    onclick="handleAction(this,'interest');event.preventDefault()">
    <svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>
    <span class="tip">興味あり！に追加する</span>
  </button>
</a>
```

- バッジ行に開催ステータス（`.sb-*`）は**出さない**（展覧会バッジ＋ LIAISON だけ）
- ポスター 52×52px（角丸 2px）。名前 `--fs` 600 `.92rem`、会場 `.74rem` ink、会期 DM Serif Display italic `.78rem` ink
- 興味あり！のボタンはカードの右上（26px・`position:absolute`）
- 距離を出すのは「近くの展覧会」だけ（P3・P6 は会場の基準点が無いので出さない＝CLAUDE.md「関連・回遊ゾーン」）
- 入れ物：`p2-side-card` ＋ページごとのクラス（例：`p3-side-rel-exh`）。見出しは `.p2-side-nearby__title`、末尾に「もっと見る →」（`.ktn-more-link`）

---

### 共通コンポーネント：作品カード（`.aw`）

縦型の作品カード。3パターンを HTML のクラスの差だけで表す。**新規ページでページ個別の CSS は追加しない。**

| 要素 | LIAISON+ | LIAISON | 通常 |
|---|---|---|---|
| `aw--plus` クラス | ✅ | ❌ | ❌ |
| `aw__lb`（ロゴ） | `li-plus` | `li` | なし |
| `aw__foot`（価格・申込） | ✅ | ❌（CSS で非表示） | ❌ |
| `aw__sold-ribbon` | 売約済のときだけ | 売約済のときだけ | 売約済のときだけ |

#### パターン1：LIAISON+（`aw--plus`）

```html
<a class="aw aw--plus" href="#"
   data-liaison="liaison-plus" data-status="sale" data-year="2026">
  <div class="aw__img">
    <div class="aw__lb"><span class="lb-dot li-plus"><span class="lb-dot-inner"></span>LIAISON+</span></div>
    <div class="aw__img-ph" style="background:linear-gradient(160deg,#e8d0b8,#c8a880);min-height:200px">
      <div class="aw__img-ph-text">作品名</div>
    </div>
    <!-- 売約済のときだけ -->
    <div class="aw__sold-ribbon"><div class="aw__sold-ribbon-inner">SOLD</div></div>
  </div>
  <div class="aw__body">
    <div class="aw__badge-row">
      <!-- 新着のときだけ先頭に NEW（KTN.newBadge(x)・CLAUDE.md「新着と NEW の印」） -->
      <span class="cb cb-content cb-artwork">artwork</span>
      <span class="aws aws-sale">販売中</span>
    </div>
    <div class="aw__title-row"><div class="aw__title">《作品名》</div></div>
    <div class="aw__spec">2026 / 油彩 / 45.5×38.0 cm</div>
    <div class="aw__action-row">
      <span class="aw__counter"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"/></svg>9</span>
      <button class="ktn-icon-btn" data-action="interest"
        onclick="handleAction(this,'interest');event.preventDefault()">
        <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
          <path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"
            fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/>
        </svg>
        <span class="tip">興味あり！に追加する</span>
      </button>
    </div>
  </div>
  <div class="aw__foot">
    <!-- 申込があるときだけ（左） -->
    <div class="aw__queue">3人が申込中</div>
    <!-- 価格（右寄せ・必須） -->
    <div class="aw__price"><span class="currency">¥</span>148,000<span class="tax">税込</span></div>
    <!-- 出品者本人のログイン × 申込ありのときだけ（JS で表示） -->
    <div class="p33-console-wrap">
      <button class="p33-console-btn ktn-action-btn ktn-action-btn--alert"
        onclick="event.stopPropagation();event.preventDefault();window.location.href='kotennavi-p3-16.html'">
        取引デスクへ →
      </button>
    </div>
  </div>
</a>
```

- 仕様（`aw__spec`）は「年 / 技法 / サイズ」を ` / ` で区切る
- パターン2（LIAISON）：`aw__lb` を `li` にし、`aw__foot` を省く
- パターン3（通常）：`aw__lb` ごと省く。ポートフォリオの作品は `aw--portfolio`（`aw__foot` を必ず隠す）

#### 販売状態のバッジ

| data-status | `aw` に足すクラス | バッジ | 表示 | SOLD リボン |
|---|---|---|---|---|
| `sale` | — | `aws aws-sale` | 販売中 | なし |
| `negot` | — | `aws aws-negot` | 商談中 | なし |
| `sold` | `aw--sold` | `aws aws-sold` | **売約済** | `aw__sold-ribbon` |
| `inquiry` | — | `aws aws-inquiry` | 要問合せ | なし |
| `nsale` | `aw--nsale` | `aws aws-nsale` | 非売品 | なし |

表示名は CLAUDE.md の5種類（販売中／商談中／売約済／要問合せ／非売品）が正。旧表記の「売却済」と、販売状態のバッジの「SOLD」は 2026-10-08 にすべて「売約済」に直した（SOLD はリボン `aw__sold-ribbon`／`p25c__sold-ribbon` だけ）。

#### `.aw__foot`（LIAISON+ のフッター）

- grid の2列：`grid-template-columns: 1fr auto`・`gap: 6px 12px`
- `.aw__queue`（申込人数）：1列目・左寄せ。申込があるときだけ
- `.aw__price`（価格）：2列目・右寄せ・必須。売約済は取り消し線＋薄く
- `.p33-console-wrap`（取引デスクへ）：2行目に全幅。出品者本人（creator／gallery）のログイン × 申込ありのときだけ JS で表示。ライト背景は `ktn-action-btn--alert`、ダーク背景（`p251-dark`／`p6-dark`）は `--alert-dark`、対応が要らないときは無印
- 子要素を書く順番は自由（grid の列指定で並ぶ）
- 「購入申込」「問い合わせる」のボタンは**廃止**（`.aw__apply-btn`／`.aw__inquiry-btn` を置かない）。購入申込・問合せは作品ページ（P6-2）から

---

### 共通コンポーネント：展示作品カード（`.p25c`）

LIAISON／LIAISON+ の作品一覧・作品の検索結果などで使う、正方形サムネイルのカード。JS 生成関数：`buildP25cCard(w, liaisonType)`（`kotennavi-pages.js`）。`liaisonType`：`null`（通常）／`'li'`／`'li-plus'`。

```html
<a class="p25c" href="#">                       <!-- 売約済は p25c--sold -->
  <div class="p25c__img">
    <div class="p25c__img-bg" style="background:#c8d0dc"></div>
    <div class="p25c__sold-ribbon"><div class="p25c__sold-ribbon-inner">SOLD</div></div>  <!-- 売約済のときだけ -->
  </div>
  <div class="p25c__body">
    <div class="aw__badge-row">
      <!-- 新着なら先頭に NEW --><span class="cb cb-content cb-artwork">artwork</span>
      <!-- 販売状態は liaisonType があるときだけ --><span class="aws aws-sale">販売中</span>
    </div>
    <div class="aw__title-row"><div class="aw__title">作品名</div></div>
    <!-- w.name があるときだけ。<a> の入れ子は不可なので onclick で遷移 -->
    <div class="aw__creator p25c__creator-link" onclick="event.stopPropagation();event.preventDefault();location.href='./kotennavi-p3.html'">田中 透</div>
    <div class="aw__spec">2025 / 油彩 / 45.5×38.0 cm</div>
    <div class="aw__action-row">
      <span class="aw__counter"><svg …/>22</span>
      <button class="ktn-icon-btn" data-action="interest" …>…</button>
    </div>
  </div>
  <!-- w.price があるときだけ（LIAISON+） -->
  <div class="p25c__footer">
    <div class="p25c__footer-l"><span class="p25c__applicants">3人が申込中</span></div>
    <div class="p25c__price"><span class="p25c__price-currency">¥</span>120,000<span class="p25c__price-tax">税込</span></div>
  </div>
</a>
```

- `w` のフィールド：`title`／`status`（sale・negot・inquiry・sold・nsale）／`bg`／`name`・`creatorUrl`（作者・省略可）／`year`・`medium`・`size`（省略可）／`interest`（興味あり！の数）／`price`（LIAISON+ のみ）／`queue`（申込件数）／新着の判定用 `nd` か `published`
- 入れ物：`p2-5-grid`（3列・860px 以下2列・560px 以下1列）。P3 の LIAISON の帯の中は `p3-works-liaison-band__cards`（3列・スマホ2列）

---

### 展覧会カード（`.ec`）の LIAISON 表示

- 縦型：カードの一番下（`ec__foot` の後）に `.ec__liaison-strip`（LIAISON バッジ＋説明＋展示作品のサムネイル3枚・36px）
- 横型（`.ec--h`・正方形ポスター 120px）：`ec__main` の中に `.ec__liaison-strip--h`（バッジ・説明・サムネイルを1行）
- 背景：LIAISON `rgba(0,93,167,.04)`／LIAISON+ `rgba(184,124,16,.04)`（`--plus` / `--h-plus`）。サムネイルの枠は同じ色の .15
- 展示が始まる前は、サムネイル（`ec__liaison-thumbs`）を省き、説明を「展示予定」にする（CSS の追加は不要）

---

## 全ページ共通：watch / interest / check-in ボタン

> **新規ページでページ個別の CSS は追加しない。** HTML をそのまま写せば common.css の共通定義が効く。運用ルールの正本は CLAUDE.md「watch / interest / check-in ボタン」。

**ウォッチの対象はクリエイター・ギャラリーだけ**（展覧会・作品・記事はウォッチしない＝興味あり！の対象）。そのためウォッチは**ピル型だけ**を使う。アイコン型のウォッチ（`.ktn-icon-btn[data-action="watch"]`）は使わない（CSS も 2026-10-08 に削除）。

### 1. ウォッチ（ピル型 `.ktn-btn`）— クリエイター・ギャラリー

```html
<!-- 未ウォッチ -->
<button class="ktn-btn" data-action="watch" data-off="watch" data-on="watching"
  onclick="handleAction(this,'watch');event.preventDefault()">
  <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
    <circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".3"/>
    <circle class="wi-inner" cx="8" cy="8" r="2.6"/>
  </svg>
  watch<span class="tip">ウォッチする</span>
</button>
```

- ウォッチ中：`on` を足し、文字を `watching`・tip を「ウォッチ中 — 解除する」に（tip の文言は common.js が切り替える）。SVG はそのまま（色は CSS）
- 使う場所：人物カード（`.cc`／`.gc`）、P2 の出展者カード、P3・P4 のヒーロー
- 色：未ウォッチ＝グレー（ink の .45）、ウォッチ中＝`--watch-on`（`#3a90e0`）の文字・枠＋淡い背景。`circle:first-child` が `#3a90e0` になる
- P3・P4 のヒーローのウォッチだけは、ヒーロー・ヘッダーとの同期のため pages.js の `addEventListener` で動かす（inline の onclick を付けない）

### 2. 興味あり！（アイコン型 `.ktn-icon-btn`）— 展覧会・作品・記事のカード

```html
<button class="ktn-icon-btn" data-action="interest"
  onclick="handleAction(this,'interest');event.preventDefault()">
  <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
    <path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"
      fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/>
  </svg>
  <span class="tip">興味あり！に追加する</span>
</button>
```

- 追加済み：`on` を足し、tip を「興味あり！ — 解除する」に（common.js が切り替える）。SVG はそのまま（`[data-action="interest"].on svg path` が `#3a90e0` で塗る）
- 大きさ：丸 32px（右カラムの小さいカード内は 26px）。`.ec` の中では tip が上向き・右端揃えに自動で切り替わる

### 3. 興味あり！（ピル型 `.ktn-btn`）— 右カラムの CTA ウィジェット

```html
<div class="p2-side-card p2-action-widget ktn-cta-widget" …>
  <div class="p2-action-widget__btn-row">
    <div class="p2aw-item">            <!-- この中に入れると大きいサイズになる -->
      <button class="ktn-btn" id="p2InterestBtn"
        data-off="interest!" data-on="interested!" data-action="interest" aria-pressed="false">
        <svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2…z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>
        interest!<span class="tip">興味あり！に追加する</span>
      </button>
      …
```

- 使う場所：P2・P6 の右カラムの CTA ウィジェット（`.p2-action-widget.ktn-cta-widget`）
- id は `p{ページID}InterestBtn`（pages.js がこの id で結び付ける）

### 4. チェックイン（`.ktn-btn--primary.ktn-btn--lg`）

```html
<button class="ktn-btn ktn-btn--primary ktn-btn--lg p2-visitor__checkin-btn" id="p2RvBtn"
  onclick="openCheckinModal()">
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="10" cy="5"  r="4"   fill="currentColor" opacity=".7"/>
    <circle cx="5"  cy="11" r="2.4" fill="currentColor" opacity=".7"/>
  </svg>
  チェックインしてレビューを書く
</button>
```

- 使う場所：P2 の来場者のセクション（ほかに P2 の幅 900px 以下で出る下の固定バー `.p2-sticky-cta__btn--checkin`）
- 青の塗り（`--accent`）・`--fn` `1.1rem`・padding `14px 28px`・SVG 20px
- `openCheckinModal()` がゲストかどうかを見て、ログインの案内かチェックインのフォームを開く

### 共通ルール

- **`handleAction` を通す**：`onclick="this.classList.toggle('on')"` は禁止（ゲストの判定・tip の更新が動かない）。2026-10-08 に、残っていた P3・P3-1〜3・P4・P4-1・P4-2・P6-1・P6-2 の 50 か所を `handleAction` に直した（ウォッチのピルの `<use href="#icon-watch">` と P4-2 の旧 `.itn-btn` も標準の形へ）
- 完了のトーストは共有の `KTN.action.handle` が出す。ページごとに `KTN.toast(...)` を書かない
- **SVG の禁止**：ライトの背景で `opacity=".45"`・`class="wi-dark"` を使わない（ダーク用）。`<use href="#icon-watch" color="#3a90e0">` のように `color` 属性で色を付けない（CSS より強く効いてしまう）。`<use>` で参照すると ON/OFF で色が変わらない。ON の色を `fill="#3a90e0"` と HTML に直書きしない
- **スマホ幅（860px 以下）の押せる範囲**：`.ktn-icon-btn` と `.ktn-btn[data-action="watch"|"interest"]` は、透明な `::before` で 44px に広がる（見た目は変えない・handoff 追174-291）。**ボタンの `::before` を別の用途に使わない**
- **Auth modal**：`common.js` の `_inject()` が自動で入れる（各 HTML に書かない）。ゲストが押した操作はログイン後に元のページで自動実行される（`KTN.action.show`）

**ピル型 `.ktn-btn` の大きさ：**

| 場所 | font-size | padding | SVG |
|---|---|---|---|
| 無印（カードの中・ヒーロー） | `.62rem` | `5px 13px` | 14px |
| CTA ウィジェット `.p2aw-item` の中（自動） | `.88rem` | ウォッチ `7px 30px`／興味あり！ `7px 22px` | 17px |
| `--lg`（チェックインなど） | `1.1rem` | `14px 28px` | 20px |

※無印の値は `.62rem / 5px 13px`（重複していた前の方の定義は 2026-10-08 にまとめた）。

**ダークの背景**：`.p6-dark` / `.p251-dark` / `.panel-dark` の中の `.ktn-btn`・`.ktn-icon-btn` はダーク用の色が定義済み（ON は `#4da3f5`）。新しいダークの区画は、親にこれらの既存クラスを付ける。

---

## ボタン2系統の詳細（`.ktn-action-btn` / `.ktn-op-btn`）

CLAUDE.md「ページ遷移アクションボタン」「操作ボタン」の詳細版。**大原則・記号のルール・横並びのルールは CLAUDE.md が正**。

### `.ktn-action-btn`（ページ遷移）

基本：Montserrat 600・`.75rem`・角丸 4px・padding `4px 12px`・白背景・枠 `var(--border)`。

| モディファイア | 用途 | 色 |
|---|---|---|
| （なし） | 通常の遷移（取引デスクへ・販売代金管理へ など） | 白・グレー枠・ink。hover で `--paper` |
| `--alert` | 要対応の遷移 | 白・赤枠 `#b43c14`・赤文字＋先頭に赤い点（`::before`）。hover で赤の塗り＋白文字 |
| `--alert-dark` | **ダークの背景**の要対応の遷移（P2-5-1 等） | オレンジ枠 `#e8804c`・淡いオレンジ背景・文字 `#f09468`＋点。hover で `#c8501c` の塗り |
| `--dark` | **ダークの背景**の通常の遷移 | 半透明の白枠・文字 `#c8d4de` |
| `--ghost` | **色の帯の中だけ**（帯の文字色を継承） | 半透明の白背景・`currentColor` の枠 |

- `--ghost` は色の帯の中（`.p514-aw__strip` 等）だけ。白・`--paper` の背景の上では枠が ink になって意図しない見た目になる
- `--alert-dark`／`--dark` はダークの背景の中だけ。ダークの上で style を手で書かない
- ページ固有のクラス（位置だけ）と併記する：例 `class="p315-apply-row__link ktn-action-btn"`。ページ側のクラスは `margin-left:auto` などの位置だけを持つ
- 要対応の行は `:has()` で自動的に alert になる（例：`.p315-apply-row:has(.p315-apply-status--stock) .ktn-action-btn`）

### `.ktn-op-btn`（その場で実行する操作）

基本：`font-family:inherit`・600・`.75rem`・角丸 4px・padding `9px 20px`・白背景・枠 `var(--border)`。

| モディファイア | 用途 | 通常 | hover |
|---|---|---|---|
| （なし） | キャンセル・閉じる | 白・グレー枠・ink | `--paper` |
| `--primary` | 主な操作（確定・支払い・受取確認など） | `var(--accent)` #005da7 の塗り・白文字（ロールに関係なく固定） | opacity .88 |
| `--danger` | 確定する破壊操作（取引キャンセルなど） | 赤 `#b43c14` の塗り | opacity .88 |
| `--caution` | 慎重な操作 | コッパー `#8b5e3c` の塗り | opacity .88 |
| `--danger-outline` | 破壊操作の入口（会場売約済・出品取消・申込キャンセルなど。押すと確認モーダル、確定はモーダルの `--danger`） | 赤枠 `rgba(180,60,20,.5)`・赤文字・白背景 | 赤枠を濃く・淡い赤背景 |

| サイズ | padding | font-size | 用途 |
|---|---|---|---|
| （なし） | `9px 20px` | `.75rem` | モーダルのボタン・完了後の操作 |
| `--lg` | `13px 24px` | `.9rem` | 支払い・受取確認などの大きい CTA |
| `--sm` | `6px 12px` | `.75rem` | コンソール・カードの中の小さいボタン |

- `disabled` 属性を付けると、どのモディファイアでも `opacity:.4; cursor:not-allowed`
- `[hidden]` は `display:none` で効く（`inline-flex` に負けないようガード済み）
- `--primary` はリンク（`.ktn-guide-link`）と同じブランド青だが、**ボタン＝塗り／リンク＝下線の文字**で区別する。ロールの区別はトップバー・タブナビ・バッジの色が担う
- ページ固有のクラスと併記：例 `class="p315-venue-btn ktn-op-btn ktn-op-btn--danger-outline ktn-op-btn--sm"`。ページ側で hover の色を上書きしない

**モーダルのボタンの並び**（主な操作を右・キャンセルを左）：

```html
<div class="p---modal__foot">
  <button class="ktn-op-btn">キャンセル</button>
  <button class="ktn-op-btn ktn-op-btn--primary">確定する</button>
</div>
<div class="p---modal__foot">
  <button class="ktn-op-btn">戻る</button>
  <button class="ktn-op-btn ktn-op-btn--danger">削除する</button>
</div>
```

### 取引の状態バッジ（取引4ページ共通・`.p515-status__badge`）

- **先頭に点（`::before`・6px）＋淡い塗り・枠なし・矢印なし**。押せない・hover で変わらない
- `--fn` 700 `.75rem`・padding `3px 9px`・角丸 2px。色は状態とターン（自分の番＝`.p515-status--my-turn`）で決まる（`docs/transaction-states.md`）
- ボタンとの見分け：ボタン＝枠＋白／透明の背景（遷移なら末尾 →）、バッジ＝塗り＋点・枠なし
- 破壊操作の入口（赤枠・記号なし）と要対応の遷移（赤枠・●＋→）はどちらも赤枠だが、記号で区別する

---

## フォーム保存エラーパネル（`.ktn-form-error`）

保存時のバリデーションエラーを、送信ボタンの直上に出す共通の部品。運用ルール（配置・トースト禁止・色・赤枠の併用など）の正本は CLAUDE.md「フォーム保存エラーパネル」。

**使っているページ（2026-10-08）**：P2-11・P2-12-1・P5-11・P5-12・P5-100・P6-13・P11・P11-1・P11-2・P11-3・P11-11・P11-12・P11-23・P60-11〜14・P61-11・P90-19。

**枠（静的に置き、`hidden` で隠しておく）：**
```html
<div class="ktn-form-error" id="p---SaveError" role="alert" hidden>
  <div class="ktn-form-error__head">
    <svg class="ktn-form-error__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <span class="ktn-form-error__title">保存できませんでした</span>
  </div>
  <ul class="ktn-form-error__list" id="p---SaveErrorList"></ul>
</div>
```

**項目（JS が保存を試すたびに `__list` を作り直す）：**
```html
<!-- シンプル（必須の未入力・P2-11 型）＝メッセージ＋ジャンプ -->
<li class="ktn-form-error__item">「展覧会タイトル」が未入力です。
  <button type="button" class="ktn-form-error__jump">該当箇所へ →</button>
</li>

<!-- 詳しい（項目どうしの検証・P2-12-1 型）＝メッセージ＋詳細＋ヒント＋ジャンプ -->
<li class="ktn-form-error__item">
  販売期間（2026.02.18 — 2026.03.19）に他の展覧会で出品設定されている作品が2点あるため、この期間では保存できません。
  <span class="ktn-form-error__detail">
    <span><span class="ktn-form-error__name">《ふわふわ》</span> — <span class="ktn-form-error__name">グループ展「余白のかたち」</span>（2026.03.10 — 2026.03.24）に出品設定中</span>
  </span>
  <span class="ktn-form-error__hint">販売期間の終了日を 2026.03.09 以前にするか、該当作品の他展覧会の出品設定を解除してください。</span>
  <button type="button" class="ktn-form-error__jump">該当箇所へ →</button>
</li>
```

- 出すとき＝`hidden=false`＋`scrollIntoView({behavior:'smooth',block:'center'})`。成功したら `hidden=true`（トーストは成功の知らせだけ）
- `__jump` は対象の要素を覚えておき `scrollIntoView`（対象に id が無くてよい）
- 固有名詞（作品名・展覧会名）だけ `__name`（明朝）。ラベル・説明はゴシック
- 項目の赤枠（`.p211-field.is-error` 等）は保存を試すたびに消して付け直す
- 実装例：P2-11（`validateRequired()`）／P2-12-1（pages.js の保存のバリデーション）

---

## トグルスイッチ（`.ktn-switch`）

on/off を切り替える汎用スイッチ。運用ルールの正本は CLAUDE.md「トグルスイッチ」。

```html
<!-- on -->
<button type="button" class="ktn-switch is-on" role="switch" aria-checked="true"
        title="クリックで公開/非公開を切り替え">
  <span class="ktn-switch__track"><span class="ktn-switch__knob"></span></span>
  <span class="ktn-switch__label">公開中</span>
</button>
<!-- off＝is-on を外し aria-checked="false"・ラベル「非公開」 -->
```

```js
function toggleSwitch(btn) {
  var on = !btn.classList.contains('is-on');
  btn.classList.toggle('is-on', on);
  btn.setAttribute('aria-checked', on);
  btn.querySelector('.ktn-switch__label').textContent = on ? '公開中' : '非公開';
}
```

- on の色は `var(--page-accent)`（ロール連動）。ページ側で色を上書きしない
- ページ側のクラス（`.p314-pub-sw` / `.p54-vis-sw`）は位置の調整だけ
- ラベルは状態の文字（公開中／非公開 など）。ラベル無しで使わない
- 使っている場所：P3-14 の作品の公開（pages.js で生成）／P5-4 の並び替えモーダルの公開・非公開（`p54ToggleModalVis`）／P5-13 のメール通知の設定
