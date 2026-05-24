# 個展なびリデザイン プロジェクト

## 概要
展覧会情報ポータルサイト「個展なび」のリデザインと新サービス「リエゾン（LIAISON）」導入のためのUI制作プロジェクト。

## ゴール
- 既存サイトのSEO対策・UI/UX向上・回遊性を高める動線設計
- 新サービス「リエゾン（LIAISON）」「リエゾンプラス（LIAISON+）」の導入

## 納品形式
- HTML / CSS / JS ファイル
- フロントエンド：React SSR（納品はHTML/CSS/JS）
- バックエンド：Drupal

---

## 作業環境
- ローカル：D:\user\baku\claude-code\kotennavi-redesign
- Claude Code（VS Codeターミナル）使用
- Git / GitHub（koten-baku/kotennavi-redesign）/ Netlify（手動デプロイ）

---

## ファイル構成
```
kotennavi-common.css      共通CSS（全スタイルの単一ソース・大容量・全ページ完成後リファクタリング予定）
kotennavi-components.css  コンポーネントデモ用CSS（※下記注意事項を参照）
kotennavi-common.js       共通JS
kotennavi-pages.js        ページ別JS
kotennavi-*.html          各ページ
progress.md               進捗状況（★こまめに更新・このファイルのみを正として使う）
docs/                     仕様・設計ドキュメント
```

---

## コーディング規約
- スタイルは kotennavi-common.css に追記
- JSは kotennavi-pages.js に追記（KTN.pages['{id}'] に登録）
- HTML内のクラス名・構造は全ページで統一
- コンポーネントごとにCSSクラスのnamespaceを分ける
  例: `.ktn-header` / `.ktn-btn` / `.cb-` / `.sb-` / `.lb-`
- ページ固有CSSは `.p{ID}-` プレフィックスで common.css に追記
- flexのみで構成・複雑なgridやdisplay:contentsは使わない
- HTML内にCSSコードブロックを含めない

---

## kotennavi-components.css について
- 制作初期（2026年3月）にコンポーネントデモ用HTMLファイル（`kotennavi_cards_*.html`・`kotennavi_buttons.html` 等）から抽出・統合したスタンドアロン用CSS
- **本番ページ（`kotennavi-p*.html`）では使用しない**
- デモファイルの動作確認のみを目的として残している
- `common.css` の後にロードされるため、重複ルールがあると意図せず上書きする危険がある
- **新規CSSルールは必ず `common.css` にのみ追記すること**
- 全ページ完成後のリファクタリング時に `common.css` へ統合または廃止予定

---

## 進捗管理ルール
- **進捗の正ファイルは `progress.md` のみ**
- ページ完了時・作業開始時・状態変化時は必ず `progress.md` を更新する
- この CLAUDE.md 内の進捗セクションは参照しない（古い可能性あり）

---

## 画面最大幅（CSS変数）
| 変数 | 幅 | 用途 |
|---|---|---|
| `--w-article` | 720px | 記事・テキスト・編集フォーム系 |
| `--w-detail` | 760px | コンテンツ下層（1カラム） |
| `--w-entity` | 1080px | コンテンツトップ（2カラム） |
| `--w-index` | 1080px | 一覧・検索（複数コンテンツ） |

---

## ユーザー種別
| 略称 | 説明 |
|---|---|
| guest | 未ログインゲスト |
| login | ログイン済みユーザー |
| user+ | ユーザー（ページオーナー本人） |
| creator | ユーザー＋クリエイター（ページオーナー本人） |
| gallery | ユーザー＋ギャラリー（ページオーナー本人） |
| admin | 管理者 |

---

## リエゾン（LIAISON）サービス概要
実スペースの展覧会と連動したオンライン作品展示・販売サービス。

| | LIAISON | LIAISON+ |
|---|---|---|
| オンライン作品展示 | ✅ | ✅ |
| 作品販売 | ❌ | ✅ |
| 料金 | 無料 | 展示無料・販売手数料あり |

- 販売フロー：会場優先型（会期中は会場優先→販売期間中に申込順で購入プロセス）
- 作品の販売状態（5種類）：販売中 / 商談中 / 売約済 / 要問合せ / 非売品
  ※「申込中」は独立バッジ廃止。「販売中」バッジ＋申込件数表示に統合
- LIAISON+で申込者がいる場合：「販売中」バッジ＋「xx件申込中」（`.aw__applicants`）をバッジ行に表示

---

## バッジカラー（全ページ共通）
| バッジ | 色名 | カラーコード |
|---|---|---|
| CREATOR | インクブルー | `#2a5f7a` |
| GALLERY | コッパーブラウン | `#8b5e3c` |
| USER | ピンク | `#b8608c` |
| 作家確認済み | 青 | — |
| ギャラリー掲載 | 黄 | — |
| 物故者作品 | グレー | — |

---

## ユーザー種別アバター形状・枠色（全ページ共通）
人物カード（`.cc` / `.gc` / `.uc`）のアバターに適用する形状と枠色。アクセントラインは「コンテンツ種別」のサインとして予約済みのため、ユーザー種別の識別には形状＋outline枠線を使う。

| 種別 | クラス | 形状 | `border-radius` | outline色 |
|---|---|---|---|---|
| USER | `.uc__avatar` | 円形 | `50%` | ピンク `rgba(184,96,140,.45)` |
| CREATOR | `.cc__avatar` | 角丸中 | `12px` | インクブルー `rgba(42,95,122,.45)` |
| GALLERY | `.gc__avatar` | 角丸小 | `4px` | コッパーブラウン `rgba(139,94,60,.45)` |

- 実装：`border: 2px solid #fff`（白セパレーター）＋ `outline: 2px solid <color>; outline-offset: 2px`
- `outline` を使う理由：親カードの `overflow:hidden` にクリップされない
- バッジカラーと同色系（透明度45%）で統一

---

## アクセントカラー（ページ別CSS変数）
| ページ | クラス | `--page-accent` |
|---|---|---|
| クリエイター系（P3） | `.p3-page` | `#2a5f7a`（インクブルー） |
| ギャラリー系（P4） | `.p4-page` | `#8b5e3c`（コッパーブラウン） |

---

## 管理ページ視覚識別（`.mgmt-page`）

一般公開ページと管理・編集ページを視覚的に区別するための共通クラス。**全管理ページの `<body>` に必ず付与する。**

### 視覚効果
| 効果 | CSS | 詳細 |
|---|---|---|
| A: 背景色 | `background: #eae6e0` | 通常ページの `--paper: #f0f4f8`（クールブルー）に対してウォームベージュで区別 |
| B: トップバー | `body.mgmt-page::before` `position:fixed; top:34px; height:3px` | dbarの直下に固定3pxライン。ロール別カラー |

### トップバーのロール別カラー（バッジ色・page-accentと統一）
| ロール | bodyクラス | バー色 | カラーコード |
|---|---|---|---|
| creator系 | `.p3-page` | インクブルー | `#2a5f7a` |
| gallery系 | `.p4-page` | コッパーブラウン | `#8b5e3c` |
| user系 | `.p5-page` | ピンク | `#b8608c` |
| 管理者 | （なし） | ダークスレート | `#3a4a5a` |

### 適用ページ一覧
| ページ | bodyクラス構成 | 備考 |
|---|---|---|
| p2-12 | `p3-page mgmt-page` | LIAISON作品管理 |
| p2-12-1 | `p3-page mgmt-page` | LIAISON+作品管理 |
| p2-11 | `mgmt-page p211-page` + JSで `p3-page`/`p4-page` 動的付与 | creator/gallery共有・役割切替でバー色変化 |
| p3-15 | `p3-15-page p3-page mgmt-page` | |
| p3-16 | `p3-page p3-16-page mgmt-page` | |
| p4-15 | `p4-15-page p4-page mgmt-page` | |
| p4-16 | `p4-page p4-16-page mgmt-page` | |
| p4-18 | `p4-18-page p4-page mgmt-page` | |
| p5-14 | `p5-page p5-14-page mgmt-page` | |
| p5-15 | `p5-page p5-15-page mgmt-page` | |
| p5-11〜13 | `p5-page p5-{id}-page mgmt-page` | 新規作成時に適用 |
| p11-4 | `mgmt-page` + JSで `p3-page`/`p4-page` 動的付与 | creator/gallery共有 |

### ロール動的切替（creator/gallery共有ページ）
`KTN.pages['p2-11']` / `KTN.pages['p11-4']` に `syncMgmtBar()` 関数を実装。`ktnRender` 内で `KTN.role` を読み取り `p3-page`/`p4-page` を付け外し。

---

## 確定済み設計仕様

### 全ページ共通：共通ヘッダー設計

#### パンくずナビ（`.ktn-bc`）
- 構造：`[リンク][›][リンク][›][現在ページ]`（セパレーターはリンクの**後ろ**に配置）
- 先祖リンク（親・現在の2つより前の項目）には `ktn-bc__link--anc` クラスを付与
- モバイル（≤540px）では先祖リンクとその直後のセパレーターを非表示にし、`…` インジケーターを先頭に表示
  - 例：Top › 田中透 › LIAISONコンソール → `… › 田中透 › LIAISONコンソール`
- CSS：`renderBc()` 内で `i < items.length-2` を先祖判定条件として使用
- 2階層パンくず（Top › 現在）は先祖なし → 省略なし
- モバイル（≤540px）では `.ktn-bc { flex: 0 0 100% }` で1行目を占有し、アクションボタンを2行目に落とす
  - 現在ページ名は `flex: 1` で残りスペースを使い切り（`max-width: none`）、収まらない場合だけ省略
- `.ktn-hdr-actions { margin-left: auto }` により、1行目・2行目いずれでも右揃え

#### ページ管理メニュー（オーナーメニュー/管理者ドロップダウン）
- **正規の設置場所：スティッキーヘッダー内**（`getActions()` で生成するドロップダウン）
- ページヒーロー内の管理ドロワー（`p3-mgmt-drawer` 等）は暫定実装。全ページ完成後にヘッダーの `getActions()` 定義を確定し、ドロワーを廃止する
- 下層ページ（-1, -2, -3 等）も上位ページと同一のメニュー構造にする（上下で操作系が変わるのはUIとして好ましくない）
- 各ページのヘッダーアクション定義は全ページ完成後に個別確定予定。制作中は暫定 `owbtn('info','ガイド')` で構わない

#### タグバー（`.ktn-tagbar`）
- タグ列は横スクロール：`overflow-x: auto; scrollbar-width: none`（スクロールバー非表示）
- 左右に矢印ボタン（`.ktn-tagbar__arr--l` / `--r`）を配置し、クリックで160pxスクロール
  - スクロール位置に応じてJSで `is-hidden` クラスを付け外し（`visibility:hidden` で幅は確保）
  - タッチデバイスでは直接スワイプも可能
- `overflow: hidden` を親に設定しない（子スクロールコンテナを妨害するため）

---

### 全ページ共通：ページ遷移アクションボタン（`.ktn-action-btn`）

ページ遷移を伴う文脈的アクションに使う小型アウトラインボタン。ピル型の `.ktn-btn`（watch/follow 等）・操作系の `.ktn-op-btn` とは別系統。

**基本クラス：`.ktn-action-btn`**（Montserrat 600・0.75rem・`border-radius: 4px`・`padding: 4px 12px`）

| モディファイア | 用途 | 色 |
|---|---|---|
| （なし） | 通常ナビゲーション（取引デスクへ・販売代金管理へ など） | 白背景・グレー枠 `var(--border)`・`var(--ink)` |
| `--alert` | 出品者アクション必要（在庫確認・発送 など） | solid 赤 `#b43c14`・白文字 |
| `--alert-dark` | **ダーク背景上**のアラート（p2-5-1等） | solid オレンジ赤 `#c8501c`・白文字 |
| `--ghost` | **カラー帯の中のみ**（帯の文字色を `currentColor` で継承） | 半透明白背景・`currentColor` 枠 |

- `--ghost` は `.p514-aw__strip` などの有色帯の中でのみ使用する。白背景・`var(--paper)` 背景の上では枠線が ink 色になり意図しない見た目になる。
- `--alert-dark` はダーク背景（`p251-dark` など）のカード内でのみ使用する。ライト背景では `--alert` を使う。

**HTML の書き方：**
- ページ固有クラス（レイアウト専用）と共通クラスを併記する
- 例：`class="p315-apply-row__link ktn-action-btn"` / `class="p514-aw__strip-link ktn-action-btn ktn-action-btn--ghost"`
- ページ固有クラスは `margin-left:auto` などレイアウト専用のみを保持し、視覚スタイルは持たない

**状態の動的切替：**
- 要アクション行は `:has()` で自動的にアラート赤に切り替わる（HTML クラスの変更不要）
  - 例：`.p315-apply-row:has(.p315-apply-status--stock) .ktn-action-btn`

---

### 全ページ共通：操作ボタン（`.ktn-op-btn`）

モーダル確認・大型CTA・管理コンソール操作に使う共通ボタン。ナビ系の `.ktn-action-btn` とは別系統。

**基本クラス：`.ktn-op-btn`**（`font-family:inherit`・0.78rem・`border-radius: 4px`・`padding: 9px 20px`）

| モディファイア | 用途 | 通常 | ホバー |
|---|---|---|---|
| （なし） | キャンセル・閉じる（モーダルのセカンダリ） | 白背景・グレー枠・`var(--ink)` | `background:var(--paper)` |
| `--primary` | 主アクション（申込確定・支払い・受取確認など） | solid `#1a4a88`・白文字（固定・ロール非依存） | `opacity:.88` |
| `--danger` | 確定的な破壊操作（取引キャンセルなど） | solid 赤 `#b43c14` | `opacity:.88` |
| `--caution` | 慎重さを要す操作（会場売約済など） | solid `#8b5e3c`（ギャラリーコッパー）・白文字 | `opacity:.88` |
| `--danger-outline` | ソフトな破壊操作トリガー（出品取消・申込キャンセルなど） | グレー枠・`var(--muted)` | 赤枠・赤文字 |

**サイズモディファイア：**

| モディファイア | padding | font-size | 用途 |
|---|---|---|---|
| （なし） | `9px 20px` | `0.78rem` | モーダルボタン・完了後アクション |
| `--lg` | `13px 24px` | `0.88rem` | 支払い・受取確認などの大型CTA |
| `--sm` | `6px 12px` | `0.75rem` | 管理コンソール・カード内の小型ボタン |

**`--primary` は全ページ固定ブルー `#1a4a88`：**
- ロール・ページ種別（表示系／管理系）を問わず固定。「青＝実行する」を一貫して学習させる
- ロール識別は mgmt-page トップバー・タブナビアクセント・バッジ色が担う
- `--caution`（`#8b5e3c` コッパー）は primary が固定ブルーのため P4 管理ページでも衝突しない

**`--caution` の disabled 状態：**
- HTML に `disabled` 属性を付けるだけで `opacity:.4; cursor:not-allowed` が自動適用される

**HTML の書き方：**
- ページ固有クラスと共通クラスを併記する。JS で querySelectorAll するボタンはページ固有クラスを保持し、視覚スタイルは `ktn-op-btn` で担う
- 例：`class="p315-venue-btn ktn-op-btn ktn-op-btn--caution ktn-op-btn--sm"`

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

### 全ページ共通：フォントシステム

`font-family` はハードコードせず必ず CSS 変数を使う（SVG `<text>` の `font-family=` 属性を除く）。

| 変数 | フォント | 用途 |
|---|---|---|
| `--fn` | Zen Kaku Gothic New | **和文ゴシック（UI）** — UIテキスト・ラベル・バッジ・メタ情報・管理系ページ全般 |
| `--fs` | Shippori Mincho | **和文明朝（コンテンツ）** — 作品名・展覧会名・人名・セクション見出し・**表示系ページの読ませる文章** |
| `--fm` | Montserrat | **欧文サンセリフ（英数）** — 数値・日付・ID・ナビ・タブ・バッジテキスト |
| `--font-en-name` | Cormorant Garamond italic | **欧文固有名詞** — 人名・会場名・展覧会名・作品名の英語表記（`.ktn-en-sub`） |
| `--font-en-label` | Cinzel | **欧文機能ラベル** — LIAISON+ CONSOLE など機能的英語ラベル（`.ktn-en-label`） |
| `--fb` | Bodoni Moda | **欧文セリフ装飾** — サイトタイトル装飾・大見出し |

**使い分けの原則：**
- 表示系ページ（展覧会・作品・クリエイター・ギャラリー・記事）の読ませる文章 → `--fs`（Shippori Mincho）
  - 対象クラス：`.p2-about__body` `.wd-body` `.p3-head__bio-text` `.p3-prof-bio` `.p4-prof-bio` `.p6-article__excerpt` `.ac__lead` `.p2-benefit__body` `.p2-1-sched-item__desc`
- コンテンツタイトル・見出し・人名 → `--fs`（Shippori Mincho）
- UI・操作・情報・メタ・管理系全般 → `--fn`（Zen Kaku Gothic New）
- 英数値・識別子・英語ラベル → `--fm`（Montserrat）

**例外：SVG `<text>` 要素**
SVG の `font-family` 属性は CSS 変数に非対応のため `font-family="'Montserrat',sans-serif"` のようにハードコードを許容する（p2系作品カードの SVG プレースホルダー等）。

---

### 全ページ共通：英語サブタイトルのフォント使い分け

英語サブテキストは役割に応じて3種類のクラスを使い分ける。

| 役割 | CSS変数 | クラス | フォント | 用途例 |
|---|---|---|---|---|
| 固有名詞 | `--font-en-name` | `.ktn-en-sub` | Cormorant Garamond italic | クリエイター名・ギャラリー名・展覧会名・作品名の英語表記 |
| ページ・セクションラベル | `--font-en-label` | `.ktn-en-label` | Cinzel 400・小サイズ | LIAISON+ CONSOLE・EXHIBITION ARCHIVE など機能的な英語ラベル |
| セクション見出しインライン | なし | `.ktn-sec-en` | DM Serif Display italic・0.75rem・`color:var(--muted)` | 「この展覧会について — About this exhibition」「近くの展覧会 — Nearby」のようなインライン英語サブ |

**`.ktn-sec-en` の書き方：**
```html
<span class="p2-side-nearby__title">近くの展覧会 — <span class="ktn-sec-en">Nearby</span></span>
```
- em-dash（—）で日本語タイトルと英語を分ける・同一行インライン
- `DM Serif Display` は `common.css` の `@import` で全ページ読込済み

**新パターン確定時の手順：** typography.html でルールを決めたら、同様に CLAUDE.md のこのセクションに追記する。これにより将来のセッションでも一貫して適用される。
- 旧クラス `.p2-ic__head-en` / `.p2-1-section__en` 等は `ktn-sec-en` に統一済み（common.css に `/* → .ktn-sec-en に統一済み */` コメントあり）

- CSS変数は `:root` に定義済み。フォント変更は変数1箇所を変えるだけで全ページに反映される
- `Cormorant Garamond` は common.css 先頭の `@import` で全ページに読込済み
- `Cinzel` は各 HTML の Google Fonts `<link>` で読込済み
- 既存の `.p3-head__en` `.p4-head__en` `.p2-title-band__sub` `.p6-hero__title-en` `.p315-page-head__en` もすべて変数参照に統一済み

### P3・P4 共通：プロフィール画像の形状
- クリエイター：円形（`border-radius: 50%`）
- ギャラリー：正方形・角丸小（`border-radius: 4px`）
- `.gc__avatar`（ギャラリーカード）も `border-radius: 4px` に統一

### P3・P4 共通：タブナビ名前表示
- クラス：`.p3-tabnav__name` / `.p4-tabnav__name`
- `max-width: 160px` でトランケート（…）
- 540px以下は `display: none`
- テキストは `.p3-tabnav__name-text` / `.p4-tabnav__name-text` span でラップ

### P3・P4 共通：下層ページ（-1・-2・-3）共通仕様
- ヒーロー：`.p3-head--compact`（コンパクト版）
  - 非表示：自己紹介文・もっと見る・プロフィール詳細リンク
  - 残す：プロフ画像・バッジ・氏名・英語名・ジャンル・watchボタン
  - `padding-top/bottom: 16px` / アバター `48px` / 名前 `1.3rem`
- アバター（`.p3-head__avatar-wrap → <a>`）と名前に上位ページへのリンクを付与
- タブナビ：P3/P4と同一のHTML構造を流用・対象タブをアクティブ
- レイアウト：1カラム（右サイドカラムなし）・`--w-detail`

### P3（クリエイタートップ）確定仕様
- ヒーロー（`.p3-head`）：白背景・`max-width: --w-entity`・`border: 1px solid var(--border)`・`border-radius: 4px`
- タブナビ（`.p3-tabnav`）：`sticky`・`top: calc(34px + 50px)`・`z-index: 90`
- タブ構成：[クリエイター名] | 展覧会 作品 記事 クリエイター情報
- 各セクション：`.p3-box`（`background: #fff`・`border: 1px solid var(--border)`・`border-radius: 4px`・`padding: 24px`）
- セクションラベル：`.p3-sec-label`（`font-size: .57rem`・`letter-spacing: .22em`・`color: var(--page-accent)`・右横線）
- プロフィールセクションのみ2カラム（左：`.p3-prof-main` / 右：`.p3-prof-side` 幅280px・sticky）

### P3 展覧会セクション（Cエリア）
- 開催中・これから開催を1つのflexコンテナに横並び・最大3列・4件以上は折り返し
- 開催中→これから開催の順
- アーカイブリンク（`.p3-archive-link`）：書籍SVGアイコン＋テキスト＋→

### P3 作品セクション（Dエリア）
- LIAISON/LIAISON+展覧会がある場合：LIAISON帯（`.p3-works-liaison-band`）を展覧会別に表示
- 帯の並び順：LIAISON+開催中→LIAISON+これから→LIAISON開催中→LIAISONこれから
- LIAISON帯がある場合：通常作品は非表示・「全作品XX件を見る →」を表示
- LIAISON帯がない場合：通常作品4件グリッド表示

### P3 クリエイター情報セクション（Fエリア）
- 構成順：クリエイター名→略歴＋画像2カラム→ジャンル→作品ブランド→取扱ギャラリー→アトリエ→リンク→掲載日・更新日
- 略歴＋画像：float使用（左：略歴・右：画像220px）・画像0枚時は全幅
- 画像ギャラリー：メイン表示（220×165px）＋サムネイル（クリックで切替）
- リンク：SimpleIcons CDN使用・アイコンのみ40×40pxボタン
- 対応プラットフォーム：HP/Behance/ArtStation/Instagram/X/Facebook/Threads/Bluesky/Pinterest/TikTok/YouTube/note/Substack/BASE/minne/Creema/STORES/Etsy/Shopify/BOOTH/pixiv/iichi/Linktree/lit.link

### P3 右カラム（`.p3-prof-side`）
- 構成：CTAウィジェット→記事カード（最新3件）→開催中展覧会（1件）
- CTAウィジェット：ウォッチャー数＋watchボタン＋シェア＋問題を報告する
- 記事0件・展覧会0件の場合は非表示

### P3-1（展覧会アーカイブ）
- フィルター：年・開催地（都道府県）・個展/グループ展（AND絞り込み）
- グループ構成：開催中→これから開催→過去の展覧会（年別detailsで折りたたみ）
- 過去カード：`.ec--h--past`（`opacity: .65`・`filter: grayscale(.3)`）
- `.p3-1-year-group[open] summary::before`：`rotate(90deg)`でアニメーション

### P3-2（記事一覧）
- フィルター：投稿先・カテゴリ・年（AND絞り込み）
- カード：`.lc.lc--article`（水平リスト型）
- 展覧会に紐づく記事には exh-link（展覧会名 →）を表示
- data属性：`data-dest` / `data-category` / `data-year`

### P3-3（作品一覧）
- フィルター：展示状況（LIAISON+/LIAISON/通常）・販売状態・ジャンル・年（AND絞り込み）
- カード：`.aw` マソンリーグリッド・4列（860px以下3列・600px以下2列）
- 並び順：LIAISON+→LIAISON→通常
- `.aw__creator` は非表示
- data属性：`data-liaison` / `data-status` / `data-genre` / `data-year`

### P4（ギャラリートップ）確定仕様
- タブ構成：[ギャラリー名] | 展覧会 記事 ギャラリー情報
- 右カラム（`.p4-prof-side`）：CTAウィジェット→開催中展覧会→記事（最新3件）

### P4 ギャラリー情報セクション（Fエリア）
- 構成順：ギャラリー名→略歴＋画像→取扱ジャンル→ギャラリー情報→地図・アクセス→利用案内→リンク→掲載日・更新日
- スペースタイプ：ギャラリー / 美術館 / その他
- 地図：Google マップ・経路を調べるの2ボタン。現在地からの距離は `navigator.geolocation` で取得
- 利用案内バッジ：`.p4-prof-facility-badge--on` / `.p4-prof-facility-badge--off`
- リンク：P3と同一の24種アイコン対応

### P4-1・P4-2 共通
- P3系下層ページと同一のHTML構造を流用
- フィルターIDはp4Filterで始まる（p4FilterYear / p4FilterPref / p4FilterType 等）

### 展覧会カード（`.ec`）LIAISON対応
- マソンリー版：`.ec__liaison-strip`（カード最下部）にLIAISONバッジ＋サムネイル3枚
- 水平リスト版（`.ec--h`）：テキスト帯なし・正方形画像120px・画像下にサムネイル帯（38px×3）
- LIAISON：`background: rgba(0,93,167,.04)` / `border: rgba(0,93,167,.25)`
- LIAISON+：`background: rgba(184,124,16,.04)` / `border: rgba(184,124,16,.25)`
- **展示前バリアント**（展覧会がまだ開催されていない場合）：`ec__liaison-thumbs` を省略し文言を変更。CSS追加不要
  - LIAISON：「オンライン作品展示予定」
  - LIAISON+：「オンライン作品展示・販売予定」

### P3-15（LIAISON+コンソール）確定仕様
- ボディクラス：`body.p3-15-page` / 幅：`--w-detail`（ヒーロー・タブナビとも760px）
- **展覧会インデックス**（`.p315-index`）：販売期間中 + 販売終了後も未処理申込がある展覧会を表示。タイトル「対応中の展覧会」
- **展覧会ヘッダー**（`.p315-exh-head`）：タイトル＋会期日付（`.p315-exh-head__period`）のみ。「販売期間中」ステータス・「取引デスク」リンクは非表示
- **取引状況概況バー**（`.p315-txn-status`）：`p315-exh-head` 内の最終要素として配置。展覧会単位で全作品の取引状態を集計表示。1展覧会につき1本。取引デスクへの個別リンクは含まない（取引デスクは作品×購入者の1対1ページのため）
  - 出品者アクション待ち（在庫確認・発送など）: `--action`（アラート赤 `#b43c14`）
  - 購入者アクション待ち（支払・受取確認など）: `--user`（ブルー `#1a4a88`）
  - 表示例: `要対応 2件（在庫確認 1 · 発送 1）· 購入者待ち 1件（支払待ち 1）`
- **スケジュール行**レイアウト：`[ラベル 72px][日付 Montserrat][状態テキスト][バー flex:1][残日数]`
  - 状態テキスト：`--live`（緑）/ `--ended`（muted）
  - スマホ：バーのみ全幅（label+日付+状態は一行目、バー二行目）
- **出品サマリー**（`.p315-works-summary`）に「展示設定・出品管理 →」リンク（`.p315-ws-mgmt-link`）を末尾配置
- **作品カード**の販売中バッジ：`.p2-121-lock-info` 構造を再利用（p2-12-1と統一）
- **申込内訳アコーディオン**（`.p315-apply-detail`）：`padding-left:84px`（作品本文テキストに揃え）・背景 `rgba(0,0,0,.025)`・上枠線なし・下端に `2px solid` でユニット閉じ
- **ボタン**：「会場売約済」「出品取消」横並び（`flex-direction:row`、デスクトップ基準）
- **Q&Aセクション**（`.p315-faq`）：ページ下部・8項目・details/summary アコーディオン

### 全表示ページ共通：コンテンツ下部 おすすめセクション（確定仕様）

ページコンテンツ（`ktn-content`）の下に置くタグセクション・おすすめ展覧会・おすすめクリエイター/ギャラリーは **コンテンツから独立** し、ページ固有幅（`--w-page`）を使わず **一律 `--w-entity`（1080px）** を取る。

| セクション | クラス | 幅 |
|---|---|---|
| おすすめ展覧会（p2系） | `.p2-sub-rec` | `max-width: var(--w-entity)` |
| タグ（p6系） | `.p6-sub-tags` | `max-width: var(--w-entity)` |
| おすすめ作品（p6系） | `.p6-rec-section` | `max-width: var(--w-entity)` |
| おすすめクリエイター/ギャラリー（Gエリア） | 今後定義 | `max-width: var(--w-entity)` |

**p6系 独立セクション構造：**
```html
<!-- タグ -->
<section class="p6-sub-tags">
  <div class="wd-tags" id="descTags"></div>
</section>
<!-- おすすめの作品 -->
<section class="p6-rec-section">
  <div class="ktn-section__head">
    <h2 class="ktn-section__title">おすすめの作品 — <span class="ktn-sec-en">Recommended</span></h2>
    <a href="#" class="ktn-section__more">すべて見る →</a>
  </div>
  <div class="masonry" id="p6RecGrid"></div>
</section>
```
- `ktn-content` ラッパーは使わない（`p6-rec-section` が直接 `max-width` を持つ）

**セクション間スペース標準（p2基準）：**
- タグセクション → おすすめセクション間の空き：`padding-top: 28px`（p2の `.p2-sub-rec { padding: 28px 24px 0 }` を全ページの標準値とする）
- ktn-content下端 → タグセクション間の空き：`padding-top: 16px`（`.p6-sub-tags { padding: 16px 24px 0 }` 準拠）

**おすすめ展覧会カード（`buildGridEcCard(e)` — `kotennavi-pages.js`）：**
- `cards_exhibition.html` のマソンリーグリッド完全準拠・表示件数：4件
- ポスター：`ec__poster-noimg`（`min-height: e.imgH px`）＋ `ec__poster-overlay`
- ポスターメタ行（`ec__poster-meta`）：`ec__remain[--live|--soon|--closed]` + `|` + 営業時間 + `|` + 距離（`本日休み` の場合は営業時間を省略）
- バッジ行（`ec__body ec__badge-row`）：`cb-exhibition` + ステータスバッジ（`sb-live` / `sb-soon` / `sb-ending`）— LIAISONバッジはここに置かず下記ストリップで表示
- LIAISON帯（`ec__liaison-strip` / `ec__liaison-strip--plus`）：`ec__liaison-strip-info`（バッジ＋サブテキスト）+ `ec__liaison-thumbs`（展示作品サムネイル3枚）— `ec__foot` の後に配置
- データフィールド：`title`, `venue`（`ec__venue-sep` で都道府県と会場名を区切る）, `bg`, `s`, `e`, `imgH`, `status`, `remain`, `hours`, `dist`, `liaison`, `int`, `ci`, `thumbs[]`

### おすすめクリエイター/ギャラリー（Gエリア）
- ktn-content外・全幅・`background: var(--paper)`
- P3・P3-3・P4：`.masonry`（`columns: 4 260px`）・540px以下で2列
- P3-1・P3-2・P4-1・P4-2：`display: grid`・`repeat(3,1fr)`・540px以下で2列

---

## 参照ドキュメント
- `docs/` フォルダ内を参照
- リエゾンサービス仕様書（06_リエゾン_サービス仕様書.md）
- サイトマップ（sitemap.md）
