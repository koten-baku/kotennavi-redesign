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

**コンテナ：** `p2-side-card` + ページ固有クラス（例：`p3-side-rel-exh`）で包む。ヘッダーは `.p2-side-nearby__head` + `.p2-side-nearby__title` + `.p2-side-nearby__more`（右端リンク）

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
