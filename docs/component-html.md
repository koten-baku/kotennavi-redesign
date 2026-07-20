# コンポーネントHTMLテンプレート

このファイルは `CLAUDE.md` のコンポーネントHTML定義を分離したものです。
コンポーネントを実装する際は Read tool で参照してください。

---

### 共通コンポーネント：サイドカラム展覧会カード（`.p2-side-ec`）

右カラムの展覧会ミニカード。p2「近くの展覧会」・p3「同ジャンルの展覧会」等で共用。JS生成関数：`buildSideEcCard(e)`（`kotennavi-pages.js`）。

**HTML構造：**
```html
<a class="p2-side-ec" href="#">
  <div class="p2-side-ec__poster" style="background:#c8d0dc"></div>
  <div class="p2-side-ec__body">
    <div class="p2-side-ec__badge-row">
      <span class="cb cb-content cb-exhibition">exhibition</span>
      <span class="sb sb-live">開催中</span>
    </div>
    <div class="p2-side-ec__name">展覧会名</div>
    <div class="p2-side-ec__venue">東京 · Gallery 名</div>
    <div class="p2-side-ec__period">2026. 03.01 — 03.30</div>
  </div>
  <button class="ktn-icon-btn" data-action="interest"
    onclick="handleAction(this,'interest');event.preventDefault()">
    <svg viewBox="0 0 16 16" fill="none"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z" fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/></svg>
    <span class="tip">興味ある！に追加する</span>
  </button>
</a>
```

**主要CSS（`common.css`）：** ポスター52×52px（`border-radius:4px`）・`p2-side-ec__name` は `--fs` 0.8rem・venue/period は `--fn` 0.68rem muted

**コンテナ：** `p2-side-card` + ページ固有クラス（例：`p3-side-rel-exh`）で包む。ヘッダーは `.p2-side-nearby__head` + `.p2-side-nearby__title` + `.ktn-more-link`（右端リンク）

---

### 共通コンポーネント：作品カード（`.aw`）完成定義

マソンリーグリッドで使う縦型カード。3パターンをHTMLのクラス差分のみで表現する。**新規ページでページ個別のCSSは一切追加しない。**

#### 構造早見表

| 要素 | LIAISON+ | LIAISON | 通常 |
|---|---|---|---|
| `aw--plus` クラス | ✅ | ❌ | ❌ |
| `aw__lb`（ロゴ） | `li-plus` | `li` | なし |
| `aw__foot`（価格・申込） | ✅ | ❌ | ❌ |
| `aw__sold-ribbon` | sold時のみ | sold時のみ | sold時のみ |

#### パターン1: LIAISON+（`aw--plus`）

```html
<a class="aw aw--plus" href="#"
   data-liaison="liaison-plus" data-status="sale" data-genre="oil" data-year="2026">
  <div class="aw__img">
    <div class="aw__lb"><span class="lb-dot li-plus"><span class="lb-dot-inner"></span>LIAISON+</span></div>
    <div class="aw__img-ph" style="background:linear-gradient(160deg,#e8d0b8,#c8a880);min-height:200px">
      <div class="aw__img-ph-text">作品名</div>
    </div>
    <!-- sold時のみ -->
    <div class="aw__sold-ribbon"><div class="aw__sold-ribbon-inner">SOLD</div></div>
  </div>
  <div class="aw__body">
    <div class="aw__badge-row">
      <span class="cb cb-content cb-artwork">artwork</span>
      <span class="aws aws-sale">販売中</span>
    </div>
    <div class="aw__title-row"><div class="aw__title">《作品名》</div></div>
    <div class="aw__spec">油彩 · 2026</div>
    <div class="aw__action-row">
      <span class="aw__counter"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"/></svg>9</span>
      <button class="ktn-icon-btn" data-action="interest"
        onclick="handleAction(this,'interest');event.preventDefault()">
        <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
          <path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"
            fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/>
        </svg>
        <span class="tip">興味ある！に追加する</span>
      </button>
    </div>
  </div>
  <!-- LIAISON+ のみ: 価格・申込件数・取引デスクボタン
       レイアウト: grid 2列
       ┌────────────────┬────────────┐
       │ aw__queue      │ aw__price  │   row 1: 申込人数（左）／価格（右寄せ）
       ├────────────────┴────────────┤
       │ p33-console-wrap (full)     │   row 2: 取引デスクへ（出品者×申込者あり時のみ）
       └─────────────────────────────┘
       ※「購入申込」「問合せ」ボタンは廃止
  -->
  <div class="aw__foot">
    <!-- 申込がある場合のみ表示（同行・左） -->
    <div class="aw__queue">3人が申込中</div>
    <!-- 価格は常に右寄せ -->
    <div class="aw__price"><span class="currency">¥</span>148,000<span class="tax">税込</span></div>
    <!-- 出品者ログイン時×申込者ありの場合のみ表示（JSで出し分け） -->
    <div class="p33-console-wrap">
      <button class="p33-console-btn ktn-action-btn ktn-action-btn--alert"
        onclick="event.stopPropagation();event.preventDefault();window.location.href='kotennavi-p3-16.html'">
        取引デスクへ →
      </button>
    </div>
  </div>
</a>
```

#### パターン2: LIAISON（`aw`のみ）

`aw__lb` のバッジを `li` に変え、`aw__foot` を省略するだけ。

```html
<a class="aw" href="#"
   data-liaison="liaison" data-status="sale" data-genre="oil" data-year="2025">
  <div class="aw__img">
    <div class="aw__lb"><span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span></div>
    <div class="aw__img-ph" style="background:linear-gradient(...)">
      <div class="aw__img-ph-text">作品名</div>
    </div>
  </div>
  <div class="aw__body">
    <!-- aw--plus と同一構造 -->
    ...
  </div>
  <!-- aw__foot なし -->
</a>
```

#### パターン3: 通常（`aw`のみ、LIAISONなし）

`aw__lb` ブロックを丸ごと省略するだけ。

```html
<a class="aw" href="#"
   data-liaison="normal" data-status="sale" data-genre="oil" data-year="2026">
  <div class="aw__img">
    <!-- aw__lb なし -->
    <div class="aw__img-ph" style="background:linear-gradient(...)">
      <div class="aw__img-ph-text">作品名</div>
    </div>
  </div>
  <div class="aw__body">
    ...
  </div>
</a>
```

#### 販売ステータスのバッジ・クラス対応表

| data-status | `aw` 追加クラス | バッジクラス | バッジ表示 | SOLD リボン |
|---|---|---|---|---|
| `sale` | — | `aws aws-sale` | 販売中 | なし |
| `negot` | — | `aws aws-negot` | 商談中 | なし |
| `sold` | `aw--sold` | `aws aws-sold` | 売却済 | `aw__sold-ribbon` を追加 |
| `inquiry` | — | `aws aws-inquiry` | 要問合せ | なし |
| `nsale` | `aw--nsale` | `aws aws-nsale` | 非売品 | なし |

#### 興味あるボタン禁止パターン

```html
<!-- ❌ 禁止: handleAction を経由しない -->
<button class="ktn-icon-btn" onclick="this.classList.toggle('on')">

<!-- ❌ 禁止: <use> 参照（ON/OFFで色が変わらない） -->
<svg><use href="#icon-interest-off"/></svg>

<!-- ❌ 禁止: ON時のSVGにfill="#3a90e0"をハードコード -->
<path fill="#3a90e0" stroke="#3a90e0"/>
```

#### `.aw__foot`（LIAISON+ 専用フッター）のレイアウト規約

- **grid 2列レイアウト**：`grid-template-columns: 1fr auto` + `gap: 6px 12px`
- **`.aw__queue`**（申込人数）：`grid-column: 1` 左寄せ。申込者がいる場合のみ表示
- **`.aw__price`**（価格）：`grid-column: 2; justify-self: end` 右寄せ・必須
- **`.p33-console-wrap`**（取引デスクへボタン）：`grid-column: 1 / -1` 2列目はフル幅で row 2 に配置
- HTML内の子要素の **記述順は問わない**（grid-column / 全幅 span で配置されるため）

#### CTAボタン（`取引デスクへ`）表示ロジック

- `.aw__foot` 内の `.p33-console-wrap` は **「出品者本人ログイン（creator または gallery）× 申込者あり」の場合のみ** JSで表示切替
- `ktn-action-btn--alert`（ライト背景・赤アウトライン＋ドット）／`ktn-action-btn--alert-dark`（ダーク背景：p251-dark / p6-dark）
- アクション不要時は `ktn-action-btn`（通常アウトライン）を使う

#### 廃止された aw__foot 内ボタン

以下のボタンは廃止された。`.aw__foot` 内には配置しない：

- `.aw__apply-btn`（購入申込ボタン）— 廃止
- `.aw__inquiry-btn`（問い合わせるボタン）— 廃止

購入申込・問い合わせは作品ページ（p6-2）から行う動線に統一。

---

### 共通コンポーネント：LIAISON作品カード（`.p25c`）

LIAISON / LIAISON+ の作品一覧・サイドカラムで共用する正方形サムネイル型カード。JS生成関数：`buildP25cCard(w, liaisonType)`（`kotennavi-pages.js`）。`liaisonType`：`null`（通常）/ `'li'`（LIAISON）/ `'li-plus'`（LIAISON+）。

**HTML構造（`buildP25cCard(w, liaisonType)` 生成）：**
```html
<a class="p25c" href="#">
  <!-- 画像エリア：サムネイルのみ。SOLDリボンのみオーバーレイ -->
  <div class="p25c__img">
    <div class="p25c__img-bg" style="background:#c8d0dc"></div>
    <div class="p25c__sold-ribbon">SOLD</div>  <!-- sold 時のみ -->
  </div>
  <!-- ボディ（サムネイル下） -->
  <div class="p25c__body">
    <div class="aw__badge-row">
      <!-- artwork バッジ（常に表示） -->
      <span class="cb cb-content cb-artwork">artwork</span>
      <!-- 販売ステータスバッジ（.aws） -->
      <span class="aws aws-sale">販売中</span>
    </div>
    <div class="aw__title-row"><div class="aw__title">作品名</div></div>
    <!-- w.name がある時: 作者リンク（<a>は不可・nested anchor禁止→onclick使用） -->
    <div class="aw__creator p25c__creator-link" onclick="location.href='./kotennavi-p3.html'">田中 透</div>
    <div class="aw__spec">2025 / 油彩</div>
    <!-- 興味ありカウンター＋ボタン（右寄せ） -->
    <div class="aw__action-row">
      <span class="aw__counter">♥22</span>
      <button class="ktn-icon-btn" data-action="interest" ...>...</button>
    </div>
  </div>
  <!-- 価格フッター: w.price がある時のみ（LIAISON+ 用） -->
  <div class="p25c__footer">
    <div class="p25c__footer-l"><span class="p25c__applicants">3件申込中</span></div>
    <div class="p25c__price"><span class="p25c__price-currency">¥</span>120,000<span class="p25c__price-tax">税込</span></div>
  </div>
</a>
```

**`w` オブジェクトのフィールド：**
- `title` — 作品名
- `status` — `sale` / `negot` / `inquiry` / `sold` / `nsale`
- `bg` — 背景CSS（グラデーション文字列）
- `name` — 作者名（省略可・省略時は非表示）
- `creatorUrl` — 作者ページURL（`name` あり時に使用）
- `year` — 制作年（省略可）
- `medium` — 素材・技法（省略可）
- `interest` — 興味ありカウント数値（省略可）
- `price` — 価格（数値 or 文字列、省略可。LIAISON+のみ設定）
- `queue` — 申込件数（省略可）

**バリアント：** `p25c--sold`（SOLD時、画像に暗オーバーレイ）

**グリッドコンテナ：** `p2-5-grid`（`display:grid; grid-template-columns:repeat(3,1fr); gap:16px`）が標準。LIAISONバンド内は `p3-works-liaison-band__cards`（4列 → SP2列）

---

### 展覧会カード（`.ec`）LIAISON対応
- マソンリー版：`.ec__liaison-strip`（カード最下部）にLIAISONバッジ＋サムネイル3枚
- 水平リスト版（`.ec--h`）：テキスト帯なし・正方形画像120px・画像下にサムネイル帯（38px×3）
- LIAISON：`background: rgba(0,93,167,.04)` / `border: rgba(0,93,167,.25)`
- LIAISON+：`background: rgba(184,124,16,.04)` / `border: rgba(184,124,16,.25)`
- **展示前バリアント**（展覧会がまだ開催されていない場合）：`ec__liaison-thumbs` を省略し文言を変更。CSS追加不要
  - LIAISON：「オンライン作品展示予定」
  - LIAISON+：「オンライン作品展示・販売予定」

---

## 全ページ共通：watch / interest / check-in ボタン（完成定義）

> **新規ページでページ個別の CSS は一切追加しない。** 以下の HTML をそのままコピーするだけで common.css の共通定義が自動適用される。canonical 規約は `CLAUDE.md`「watch / interest / check-in ボタン」セクションの要約を参照。

---

### 1. watch ボタン（ピル型 `.ktn-btn`）— クリエイター・ギャラリー用

```html
<!-- OFF 状態（未ウォッチ） -->
<button class="ktn-btn" data-off="watch" data-on="watching" data-action="watch"
  onclick="handleAction(this,'watch');event.preventDefault()">
  <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
    <circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".3"/>
    <circle class="wi-inner" cx="8" cy="8" r="2.6"/>
  </svg>
  watch<span class="tip">ウォッチする</span>
</button>
```
ON状態: `on` クラスを追加、テキストを `watching`・tip を「ウォッチを解除する」に変更。SVG は同一（CSS が色を管理）。

**適用コンテキスト：** クリエイターカード（`.cc`）、ギャラリーカード（`.gc`）、p2 出展者カード、p3/p4 サイドCTA ウィジェット  
**OFF/ON 色は CSS が自動管理：** `.ktn-btn` / `.ktn-btn.on` の共通定義が適用される。SVG の `fill="#7a8a99"` は OFF 時の初期値。ON 時は `circle:first-child` ルールが `#3a90e0` に上書き。

---

### 2. watch ボタン（アイコン型 `.ktn-icon-btn`）— 展覧会・作品・記事用

```html
<!-- OFF 状態 -->
<button class="ktn-icon-btn" data-action="watch"
  onclick="handleAction(this,'watch');event.preventDefault()">
  <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
    <circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".3"/>
    <circle class="wi-inner" cx="8" cy="8" r="2.6"/>
  </svg>
  <span class="tip">ウォッチする</span>
</button>
```
ON状態: `on` クラスを追加、tip を「ウォッチ中 — 解除する」に変更。SVG は変更不要（CSS が色を管理）。

**適用コンテキスト：** 展覧会カード（`.ec`）、作品カード（`.aw`・`.p25c`）、記事カード、p2 サイドカード（ラベルテキストなし・アイコンのみ）  
**ON 時の SVG 色は CSS が管理：** `.ktn-icon-btn[data-action="watch"].on svg circle:first-child { fill:#3a90e0; opacity:1 }` がグローバル定義済み。  
**ツールチップ：** `.ec` 内では `.ktn-icon-btn .tip` が上向き・右端揃えに自動反転（`overflow:hidden` 対応済み）

---

### 3. interest ボタン（アイコン型 `.ktn-icon-btn`）— 展覧会・作品・記事用

```html
<!-- OFF 状態 -->
<button class="ktn-icon-btn" data-action="interest"
  onclick="handleAction(this,'interest');event.preventDefault()">
  <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
    <path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"
      fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/>
  </svg>
  <span class="tip">興味あり！に追加する</span>
</button>
```
ON状態: `on` クラスを追加、tip を「興味あり！を解除する」に変更。SVG は変更不要（CSS が色を管理）。

**適用コンテキスト：** 展覧会カード（`.ec`）、作品カード（`.aw`・`.p25c`）、記事カード、p2 サイドカード  
**ON 時の SVG 色は CSS が管理：** `[data-action="interest"].on svg path { fill:#3a90e0; stroke:#3a90e0 }` がグローバル定義済み。HTML の SVG 属性は変更不要。  
**ツールチップ：** `.ec` 内では上向き・右端揃えに自動反転（`overflow:hidden` 対応済み）

---

### 4. interest ボタン（ピル型 `.ktn-btn`）— CTA ウィジェット用

```html
<!-- p2aw-item で囲むと自動的に大きいサイズに -->
<div class="p2aw-item">
  <button class="ktn-btn" id="p2InterestBtn"
    data-off="interest!" data-on="interested!" data-action="interest" aria-pressed="false">
    <svg viewBox="0 0 16 16" fill="none">
      <path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"
        fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/>
    </svg>
    interest!<span class="tip">興味あり！に追加する</span>
  </button>
</div>
```

**適用コンテキスト：** p2/p3/p4/p6 右カラム CTA ウィジェット（`.ktn-cta-widget`）  
**id 命名：** `p{ページID}InterestBtn`（pages.js のバインド用）

---

### 5. check-in ボタン（ピル型 `.ktn-btn--lg`）

```html
<button class="ktn-btn ktn-btn--lg" data-action="checkin"
  onclick="openCheckinModal();event.preventDefault()">
  <svg viewBox="0 0 16 16" fill="none" width="20" height="20">
    <circle cx="10" cy="5" r="4" fill="#7a8a99" opacity=".3"/>
    <circle cx="5" cy="11" r="2.4" fill="#7a8a99" opacity=".3"/>
  </svg>
  チェックイン＆レビュー
</button>
```

**適用コンテキスト：** p2/p3/p4/p6 右カラム CTA ウィジェット  
**モーダル：** `openCheckinModal()` がゲスト判定→auth modal / ログイン済み→チェックインフォームを自動選択

---

### 共通ルール

**`handleAction` 経由を徹底：**
- `onclick="this.classList.toggle('on')"` は禁止。ゲスト判定・tip テキスト更新が動作しない
- p3/p4 のヒーローウォッチボタン（ヒーロー・サイドCTA・ヘッダーHIBの同期が必要）のみ pages.js の `addEventListener` で管理。inline `onclick` を付けない

**SVG 禁止パターン：**
- `opacity=".45"` → ダーク専用値。ライトパネルは **必ず `.3`**
- `class="wi-dark"` → ライトパネルは **必ず `class="wi-inner"`**
- `<use href="#icon-watch" color="#3a90e0">` → `color` 属性は CSS より優先されるため **禁止**。常に `color="#7a8a99"` か inline SVG を使う

**サイズモディファイア（`.ktn-btn` ピル型）：**

| コンテキスト | font-size | padding（watch） | padding（interest） | SVG | 用途 |
|---|---|---|---|---|---|
| カード内インライン（なし） | `0.75rem` | `7px 16px` | `7px 16px` | `15px` | `.ec` / `.aw` カード内、ヒーロー横 |
| 2カラム CTA `.p2aw-item` 内自動 | `0.88rem` | `7px 30px` | `7px 22px` | `17px` | 右カラム CTA ウィジェット（クラス変更不要） |
| 1カラム・モバイル（インライン指定） | `0.72rem` | `13px 20px` | `13px 20px` | `17px` | モバイル / 1カラムサイドCTA |
| `--lg` | `1.1rem` | `14px 28px` | `14px 28px` | `20px` | 日本語CTA（チェックイン等） |

※ `.p2aw-item` 内の watch は padding が wide（`7px 30px`）、interest は narrow（`7px 22px`）。いずれも CSS が自動適用するため HTML 側の変更不要。  
※ 1カラム・モバイルサイズは `.p2aw-item` を使わずインラインで `style="font-size:.72rem;padding:13px 20px"` を指定する（`p3-action-watch-btn` クラスは使わない）。

**ダークパネル対応（既存CSS）：**
- `.p6-dark .ktn-btn` / `.p251-dark .ktn-btn` → ダーク用色定義済み（`color:#4da3f5` など）
- 新規ダーク背景セクションに置く場合は親に `.p6-dark` 等の既存クラスを使うか、同パターンで追加する

**Auth modal：** `common.js` の `_inject()` が DOMContentLoaded 時に `<body>` 末尾へ自動注入。各 HTML への記述不要。

---

## ボタン2系統の詳細（`.ktn-action-btn` / `.ktn-op-btn`）

CLAUDE.md「ページ遷移アクションボタン」「操作ボタン」の詳細版。**v3大原則・記号ルール・横並びルールは CLAUDE.md 側が canonical**。本節はモディファイア表・HTML記述例・モーダル配置・取引ステータスバッジの詳細を保持する。

### `.ktn-action-btn`（ページ遷移ナビ）

基本：Montserrat 600・0.75rem・`border-radius: 4px`・`padding: 4px 12px`。

| モディファイア | 用途 | 色 |
|---|---|---|
| （なし） | 通常ナビゲーション（取引デスクへ・販売代金管理へ など） | 白背景・グレー枠 `var(--border)`・`var(--ink)` |
| `--alert` | 要対応ナビ（在庫確認・発送が必要な取引へ など） | 白背景・赤枠 `#b43c14`・赤文字＋赤ドット（`::before`）。hover で solid 赤＋白文字 |
| `--alert-dark` | **ダーク背景上**の要対応ナビ（p2-5-1等） | 明オレンジ枠 `#e8804c`・淡色文字＋ドット。hover で solid `#c8501c` |
| `--dark` | **ダーク背景上**の通常ナビ | 半透明白枠 `rgba(255,255,255,.3)`・文字 `#c8d4de` |
| `--ghost` | **カラー帯の中のみ**（帯の文字色を `currentColor` で継承） | 半透明白背景・`currentColor` 枠 |

- `--ghost` は `.p514-aw__strip` などの有色帯の中でのみ使用する。白背景・`var(--paper)` 背景の上では枠線が ink 色になり意図しない見た目になる。
- `--alert-dark` / `--dark` はダーク背景（`p251-dark` など）のカード内でのみ使用する。ライト背景では `--alert` / 無印を使う。ダーク上で手動 style 指定はしない（`--dark` クラスを使う）。

**HTML の書き方：**
- ページ固有クラス（レイアウト専用）と共通クラスを併記する
- 例：`class="p315-apply-row__link ktn-action-btn"` / `class="p514-aw__strip-link ktn-action-btn ktn-action-btn--ghost"`
- ページ固有クラスは `margin-left:auto` などレイアウト専用のみを保持し、視覚スタイルは持たない

**状態の動的切替：**
- 要アクション行は `:has()` で自動的に alert（赤アウトライン＋ドット）に切り替わる（HTML クラスの変更不要）
  - 例：`.p315-apply-row:has(.p315-apply-status--stock) .ktn-action-btn`

### `.ktn-op-btn`（操作ボタン）

基本：`font-family:inherit`・0.78rem・`border-radius: 4px`・`padding: 9px 20px`。

| モディファイア | 用途 | 通常 | ホバー |
|---|---|---|---|
| （なし） | キャンセル・閉じる（モーダルのセカンダリ） | 白背景・グレー枠・`var(--ink)` | `background:var(--paper)` |
| `--primary` | 主アクション（申込確定・支払い・受取確認など） | solid `var(--accent)` #005da7・白文字（固定・ロール非依存） | `opacity:.88` |
| `--danger` | 確定的な破壊操作（取引キャンセルなど） | solid 赤 `#b43c14` | `opacity:.88` |
| `--caution` | 慎重さを要す操作（問い合わせる など。※会場売約済の確定は v3 で `--danger` に変更） | solid `#8b5e3c`（ギャラリーコッパー）・白文字 | `opacity:.88` |
| `--danger-outline` | 破壊操作のソフトトリガー（会場売約済・出品取消・申込キャンセルなど。押すと確認モーダルが開き、確定はモーダル側 `--danger`） | 赤枠 `rgba(180,60,20,.5)`・赤文字 `#b43c14`・白背景（※v3.1でグレー枠から格上げ） | 赤枠濃く・淡赤背景 |

**サイズモディファイア：**

| モディファイア | padding | font-size | 用途 |
|---|---|---|---|
| （なし） | `9px 20px` | `0.78rem` | モーダルボタン・完了後アクション |
| `--lg` | `13px 24px` | `0.88rem` | 支払い・受取確認などの大型CTA |
| `--sm` | `6px 12px` | `0.75rem` | 管理コンソール・カード内の小型ボタン |

**`--primary` は全ページ固定ブランド青 `var(--accent)` #005da7（＝ロゴ色）：**
- ロール・ページ種別（表示系／管理系）を問わず固定。「青＝実行する」を一貫して学習させる
- ブランド青に統一済み（旧 `#1a4a88` から変更）。リンク（`.ktn-guide-link`）と同じブランド青だが、**実行ボタン＝塗り／リンク＝下線テキスト**と form で区別する
- ロール識別は mgmt-page トップバー・タブナビアクセント・バッジ色が担う
- `--caution`（`#8b5e3c` コッパー）は primary がブランド青のため P4 管理ページでも衝突しない

**`--caution` の disabled 状態：** HTML に `disabled` 属性を付けるだけで `opacity:.4; cursor:not-allowed` が自動適用される。

**HTML の書き方：**
- ページ固有クラスと共通クラスを併記する。JS で querySelectorAll するボタンはページ固有クラスを保持し、視覚スタイルは `ktn-op-btn` で担う
- 例：`class="p315-venue-btn ktn-op-btn ktn-op-btn--danger-outline ktn-op-btn--sm"`（カード内の会場売約済トリガー。確定はモーダル側の `--danger`。ページ固有のホバー色上書きはしない）

**モーダル内ボタン配置パターン：**
```html
<!-- 通常確認 -->
<div class="p---modal__foot">
  <button class="ktn-op-btn">キャンセル</button>
  <button class="ktn-op-btn ktn-op-btn--primary">確定する</button>
</div>
<!-- 破壊的操作 -->
<div class="p---modal__foot">
  <button class="ktn-op-btn">戻る</button>
  <button class="ktn-op-btn ktn-op-btn--danger">削除する</button>
</div>
```

### 取引ステータスバッジ（取引4ページ共通・`.p515-status__badge`）
- 定義：**先頭ドット（`::before`）＋淡色塗り・枠線なし・矢印なし**。クリック不可・hover変化なし
- ボタンとの見分け：ボタン＝「枠線＋白/透明背景（遷移なら末尾 →）」／バッジ＝「塗り＋ドット・枠なし」
- 破壊トリガー（赤枠・記号なし）と要対応ナビ（赤枠・●＋→）はどちらも赤枠だが記号で区別する
- 状態別カラークラス（`--new`/`--paid`/`--shipped`/`--confirming`/`--done`/`--cancelled` 等）は p316/p515 プレフィックスのまま共用。デモ：`kotennavi_buttons_v2.html` セクション5

---

## フォーム保存エラーパネル（`.ktn-form-error`）

編集・管理ページの保存時バリデーションエラーをフォームアクション直上に常設表示する共通コンポーネント。運用ルール（配置・トースト禁止・色・併用赤枠等）の canonical は CLAUDE.md「全ページ共通：フォーム保存エラーパネル」。CSS canonical は `kotennavi-common.css` `.ktn-listqr__url` 直後。

**枠のHTML（静的に置く・`hidden` で初期非表示）：**
```html
<!-- 保存エラーパネル（共通 .ktn-form-error・保存時バリデーションで表示。フォームアクション直上の固定位置） -->
<div class="ktn-form-error" id="p---SaveError" role="alert" hidden>
  <div class="ktn-form-error__head">
    <svg class="ktn-form-error__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <span class="ktn-form-error__title">保存できませんでした</span>
  </div>
  <ul class="ktn-form-error__list" id="p---SaveErrorList"></ul>
</div>
```

**項目のHTML（JSが保存試行ごとに `__list` へ再構築）：**
```html
<!-- シンプル項目（必須未入力・p2-11型）＝メッセージ＋ジャンプ -->
<li class="ktn-form-error__item">「展覧会タイトル」が未入力です。
  <button type="button" class="ktn-form-error__jump">該当箇所へ →</button>
</li>

<!-- リッチ項目（クロスフィールド検証・p2-12-1型）＝メッセージ＋詳細行＋ヒント＋ジャンプ -->
<li class="ktn-form-error__item">
  販売期間（2026.02.18 — 2026.03.19）に他の展覧会で出品設定されている作品が2点あるため、この期間では保存できません。
  <span class="ktn-form-error__detail">
    <span><span class="ktn-form-error__name">《ふわふわ》</span> — <span class="ktn-form-error__name">グループ展「余白のかたち」</span>（2026.03.10 — 2026.03.24）に出品設定中</span>
  </span>
  <span class="ktn-form-error__hint">販売期間の終了日を 2026.03.09 以前にするか、該当作品の他展覧会の出品設定を解除してください。</span>
  <button type="button" class="ktn-form-error__jump">該当箇所へ →</button>
</li>
```

**ルール（要点）：**
- パネル表示＝`hidden=false`＋`errBox.scrollIntoView({behavior:'smooth',block:'center'})`。成功時は `hidden=true`（トーストは成功通知のみ可）
- `__jump` は対象要素への参照を閉包で持ち `scrollIntoView({behavior:'smooth',block:'center'})`（対象に id が無くてもよい）
- 固有名詞（作品名・展覧会名）のみ `__name`（明朝）。ラベル・説明文はゴシックのまま
- フィールド側の赤枠強調（`.p211-field.is-error` / `.p2-12-work-card--conflict` 等）は保存試行ごとにクリア→再付与
- 実装例：p2-11（`validateRequired()`）／p2-12-1（`kotennavi-pages.js` p2-121 の保存バリデーション）

---

## トグルスイッチ（`.ktn-switch`）

on/off 状態切替の汎用スイッチ。運用ルール（aria必須・on色=page-accent・状態ラベル必須等）の canonical は CLAUDE.md「全ページ共通：トグルスイッチ」。CSS canonical は `kotennavi-common.css` `.ktn-switch` ブロック（2026-07-20 新設・初出 p3-14）。

**HTML（on状態）：**
```html
<button type="button" class="ktn-switch is-on" role="switch" aria-checked="true"
        title="クリックで公開/非公開を切り替え">
  <span class="ktn-switch__track"><span class="ktn-switch__knob"></span></span>
  <span class="ktn-switch__label">公開中</span>
</button>
```

**HTML（off状態）：**
```html
<button type="button" class="ktn-switch" role="switch" aria-checked="false"
        title="クリックで公開/非公開を切り替え">
  <span class="ktn-switch__track"><span class="ktn-switch__knob"></span></span>
  <span class="ktn-switch__label">非公開</span>
</button>
```

**JSトグルパターン（クラス・aria・ラベルを同時更新）：**
```js
function toggleSwitch(btn) {
  var on = !btn.classList.contains('is-on');
  btn.classList.toggle('is-on', on);
  btn.setAttribute('aria-checked', on);
  btn.querySelector('.ktn-switch__label').textContent = on ? '公開中' : '非公開';
}
```

**ルール（要点）：**
- on 色は `var(--page-accent)`（body の `.pN-page` が供給・ロール連動）。ページ側で色を上書きしない
- ページ側フッククラス（`.p314-pub-sw` / `.p54-vis-sw`）は位置調整のみ（例：`.p54-vis-sw{flex-shrink:0}`）
- ラベルは状態テキスト（公開中/非公開 等）。ラベル無しで使わない
- 適用済み：p3-14 作品公開スイッチ（pages.js makeItem 内で動的生成）／p5-4 並び替えモーダルの公開/非公開（静的HTML＋`p54ToggleModalVis`）
