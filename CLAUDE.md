# 個展なびリデザイン プロジェクト

## 概要
展覧会情報ポータルサイト「個展なび」のリデザインと新サービス「リエゾン（LIAISON）」導入のためのUI制作プロジェクト。

## ゴール
- 既存サイトのSEO対策・UI/UX向上・回遊性を高める動線設計
- 新サービス「リエゾン（LIAISON）」「リエゾンプラス（LIAISON+）」の導入

## 納品形式
- HTML / CSS / JS ファイル
- フロントエンド：React CSR（クライアントサイドレンダリング・納品はHTML/CSS/JS）
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

## 後工程引き継ぎログのルール（`docs/handoff-decisions.md`）
- 後工程（React CSR / Drupal 改修）のための **追記式（append-only）決定ログ**。**捕捉は決定時、構造化は後**の原則で、完成後にまとめて作らない（抜け漏れ防止）。
- `progress.md` を更新するのと同じタイミングで、関連する決定を `docs/handoff-decisions.md` にも追記する。
- 特に **コードに残らない判断**（UI廃止・方針転換・なぜその値か）は同ファイル「7. 決定の理由メモ」に必ず残す。
- 新しい共通コンポーネント確定時は「3. コンポーネント → React」に1行追加する。
- 制作ルールの正本は引き続き本 `CLAUDE.md`。handoff ログは変換用の対応付けと理由の捕捉に限定し、詳細は重複転記せず正本を指す。

---

## 画面最大幅（CSS変数）
| 変数 | 幅 | 用途 |
|---|---|---|
| `--w-article` | 760px | 記事・ガイド・テキスト（1カラム） |
| `--w-detail` | 760px | 編集フォーム・管理系（1カラム） |
| `--w-entity` | 1080px | コンテンツトップ・下位（2カラム） |
| `--w-index` | 1080px | トップ・一覧・検索（複数コンテンツ） |

### ヒーロー幅＝コンテンツ幅（左右padding 20pxで統一・全ページ共通）

**ヒーローバンド（タイトルバンド・head）の幅と、その下のコンテンツ（2カラム含む）の幅は必ず一致させる。** 両者は同じ最大幅（表示系＝1080px / mgmt・detail＝760px）に `margin:0 auto` で置き、**左右paddingを `.ktn-content` と同じ20pxに統一**する。両者とも同じ外枠幅・同じ内側20pxなので左端がぴったり揃う（＝中身1040px／760系は720px）。上下paddingはヒーローの余白感のため各要素で自由（統一するのは左右のみ）。

- **ガターを0にして最大幅までフル使い（edge-to-edge）にしない。** 過去に共通変数 `--pad-x:0` でヒーローを端まで広げたが、ヒーロー内テキストが左壁に密着して不可となり撤回済み。**「幅を揃える」＝「paddingを等しくする（20px）」であって「0にする」ことではない**（20pxでも両者1080幅・内側20pxで左端は既に一致している）。
- 対象ヒーロー `__inner`（`--compact` 含む）：`.p2-title-band__inner`／`.p3-head__inner`／`.p4-head__inner`／`.p5-head__inner`。いずれも左右20pxを base 値として直書きし、`.ktn-content`（左右20px）と揃える。
- **p6系ヒーロー（`.p6-hero`）は白背景＋枠線の「カード」型**で、他ページの全幅カラー帯と違い枠線自体が幅の見切りになる。`.ktn-content` に包まれるため素のままだと1040に収まり、下の帯（p2/p3/p4/p5 のカラー帯＝1080）や本来のページ最大幅と揃わない。そこで**ヒーローを包む `.ktn-content` に `.ktn-content--flush-x`（左右padding 0）を付けて枠線を1080まで広げる**。文字の余白は帯内側の `.p6-hero__stage`（左右40px）・`.p6-hero__meta`（左右24px）が持つため左壁に密着しない。2カラム部分は通常の `.ktn-content`（20px）のまま＝カードは1040に inset。
- **p2-5／p2-5-1** は色付きフルブリード帯（`var(--warm)`／`--paper` 等）を持つ設計で、`.p2-5-*__inner`・`.p25-layout`・`.p25-fullwidth` の左右20pxは**「帯の内部余白」**として同じ20px。`.p2-5-wrap` 自身は `padding:0`（帯はフルブリード）で、ガターは内側セクション `__inner` が担う。
- **ネストする wrap（`.p114-wrap` 等、`.ktn-content` の内側）** も左右20pxを持ち、内容が外側 content と同じ位置に来るよう揃える。
- **パンくず・タブナビ/サブナビの左端も20pxグリッドに揃える（2026-07-05 確定）**：帯の max-width は元から全て1080（パンくず `.ktn-header__inner`＝`--w-page`→display系1080／`.p2-subnav-bar`・`.p3-tabnav`・`.p5-tabnav`＝`--w-entity` 1080）で幅は一致済み。左端テキスト位置だけをヒーロー/コンテンツと同じ20pxへ合わせる。
  - パンくず `.ktn-header__inner` の左右paddingは **20px**（旧24pxから是正・グローバル。mobile 14pxは別グリッドで据え置き）。
  - **名前要素を持つナビ（p3/p4/p5）**：最左の `.p3-tabnav__name`（p4もHTMLで再利用）・`.p5-tabnav__name` の左右padding＝**20px**（`__inner` は padding 0）。タブ項目 `.pN-tabnav__item` の左右padding（20px）はタブ間隔＝据え置き。
  - **名前要素を持たないナビ（p2-subnav）**：行 `.p2-subnav` は `padding:0`（左右0）にし、**最初のタブ項目 `.p2-subnav__item` の左padding(20px)を左端ガターに一致**させる（行に左右paddingを足さない＝二重にずれるため）。
  - **ナビ帯に20px以外の左右paddingをハードコードしない**（過去に行24px＋item20pxで最初のタブ文字が44pxに居てヒーロー20pxと不一致だった）。
- **ヒーロー独自 `__inner` に20px以外の左右px をハードコードしない**（過去に24〜28px 直書きで各ヒーローがコンテンツより8〜16px狭くなっていた）。新規ヒーロー追加時も左右20pxに揃える。
- 特別な視覚・操作・デザイン上の意図で幅を変える場合のみ例外とし、その理由を handoff-decisions.md に残す。

## 高さ変数（`--hh`・`--dh`）
| 変数 | 初期値 | 用途 |
|---|---|---|
| `--hh` | `50px` | ktn-header の高さ。**`_syncHH()` が実測値に上書きする** |
| `--dh` | `34px` | dbar（デモバー）の高さ。本番環境では `0` に変更 |

- **`--hh` は動的**: `KTN.init` 内の `_syncHH()` が `ktnHeader.getBoundingClientRect().height` を計測し `--hh` を上書き
  - タイミング：`requestAnimationFrame` (ヘッダーレンダリング直後) + `resize` イベント
  - モバイル（≤540px）でパンくずが2行になると ktn-header が約79pxになるが、`--hh` は自動追従するため手動調整不要
- **スティッキー要素は `var(--hh)` 経由**: `p3-tabnav` / `p4-tabnav` / `p5-tabnav` / `p3-prof-side` 等はすべて `top: calc(var(--dh) + var(--hh))` で計算しているため、`_syncHH()` の更新が全要素に自動反映される
- **`--hh` をハードコードしない**: CSSに `top: calc(34px + 50px)` のように書かず、必ず `calc(var(--dh,0px) + var(--hh,50px))` を使う

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

## サイトカラー共通定義（ブランド青を1本の軸に）

サイト全体の青系は **ロゴ `images/kotennavi-logo3.svg`（#005da7）を唯一の軸** とする。「ブランド」「実行」「リンク」で似た青を複数持たず、意味の区別は **色ではなく form（塗り/下線/枠）＋役割パレット** で出す。**新規UIで青をハードコードせず、必ず下記変数を参照する。**

### ブランド青系 CSS 変数（`:root`）

| 変数 | 値 | 用途 |
|---|---|---|
| `--accent` | `#005da7` | ブランド青＝ロゴ色。**リンク（`.ktn-guide-link`）・実行ボタン（`.ktn-op-btn--primary` / `.ktn-btn--primary` / `.p211-submit-bar__submit`）・展覧会アクセント**の軸 |
| `--accent-d` | `#004a85` | ブランド青の濃色。リンク/ボタンの hover・押下 |
| `--actor-buyer` | `#1a4a88` | 取引フローの**購入者・ユーザー側アクター色**。ブランド青と用途を分離。tint は `rgba(26,74,136,…)` |

### 運用ルール（3レイヤー）

1. **ブランド青 `#005da7`（`--accent`）に集約** — ロゴ／ナビ・参照リンク／実行ボタン／展覧会アクセント。
   - リンクとボタンは**同じブランド青でも form で区別**：リンク＝下線テキスト、ボタン＝塗り。
   - 旧 `#1a4a88`（確定ボタン専用の別ブルー）は廃止し `--accent` に統一済み。
2. **役割パレット（誰/何か）は独立** — creator `#2a5f7a` / gallery `#8b5e3c` / user `#b8608c` / exhibition `#005da7`。ページアクセント・mgmtバー・バッジが担当。
3. **取引フローのアクター色**：出品者＝各ロール色、購入者＝`--actor-buyer`。flow図/ステップ/バッジ等の2者対比でのみ使用（汎用UIでは使わない）。

### `#1a4a88` の扱い（注意）
- **実行ボタン・購入者アクターでは使用禁止**（前者は `--accent`、後者は `--actor-buyer`）。
- **例外＝開催ステータスの「もうすぐ開始」**（`.sb-soon` / `.p3-1-glbl--soon`）は badge 設計の「濃い青」として `#1a4a88` リテラルのまま（別軸の status パレット）。

---

## エディトリアル・リファインメント v2 共通定義（Gagosian + PEN）

サイト全体のアート系エディトリアル方向を支える共通パターン集。**新規ページ作成時・既存ページ refinement 時はこのセクションを参照する**。canonical 定義は `kotennavi-common.css` 末尾の **`▼▼▼ P2 EDITORIAL REFINEMENT v2 — START ▼▼▼`** 〜 **`▲▲▲ END ▲▲▲`** ブロックに集約（**ロールバック可能**：ブロック全体を削除/コメントアウトで元のデザインに戻る）。

### 設計方針
- **力強いタイポグラフィ**：明朝（Shippori Mincho）の大型・太字を主軸
- **濃い色**：`var(--ink) #231815` を本文・見出しに統一、opacity フェードを排除
- **罫線中心**：黒インクの罫線でセクション境界を明示
- **大胆なサイズ階層**：本文 .92rem〜、見出し 1.25rem〜3.4rem まで
- **Cinzel uppercase**：英ラベル類は Cinzel serif の大文字＋字間 .14〜.18em

### ページごとのアクセントカラー（`--page-accent`）

各ページ系統で異なるアクセントカラーを使うため、`body` クラスで CSS 変数を切替：

| body クラス／属性 | `--page-accent` | `--page-accent-bg`（rgba .08） | 用途 |
|---|---|---|---|
| `body[data-w="entity"]`（fallback） | `#005da7`（exhibition blue） | `rgba(0,93,167,.08)` | p2 / p6（作品） |
| `body.p3-page` | `#2a5f7a`（creator ink-blue） | `rgba(42,95,122,.1)` | p3 系 |
| `body.p4-page` | `#8b5e3c`（gallery copper） | `rgba(139,94,60,.1)` | p4 系 |
| `body.p5-page` | `#b8608c`（user pink） | `rgba(184,96,140,.1)` | p5 系 |

サブナビ・ハイライト・active state はこの変数を参照（ハードコード禁止）。

### 共通パターン一覧

| パターン | カバー範囲（grouped selector） | 役割 |
|---|---|---|
| **サブナビ** | `.p2-subnav-bar` / `.p3-tabnav` / `.p4-tabnav` / `.p5-tabnav` | 上下 1px の page-accent 罫線、active は太字＋下罫線 3px |
| **サブナビアイテム** | `.p2-subnav__item` / `.p3-tabnav__item` / `.p4-tabnav__item` / `.p5-tabnav__item` | Shippori Mincho 1.02rem、hover/active で page-accent 化 |
| **サイドカード** | `.p2-side-card` / `.p3-side-card` / `.p4-side-card` / `.p5-side-card` | 白背景＋ヘアライン枠、padding 24px |
| **サイドカード見出し** | `.p2-side-card .p2-ic__head-title` / `.p3-side-card__title` / etc. | Shippori Mincho .95rem + Cinzel .58rem 英サブ |
| **CTA ウィジェット** | `.p2-action-widget`（全ページ再利用） | paper bg、Bodoni Moda 3rem 数値、Cinzel ラベル |
| **関連・回遊ゾーン** | 右カラム末尾：`.p2-side-nearby`（p2＝「近くの展覧会」Nearby・会場基準で距離あり）/ `.p3-side-rel-exh`（p3系＝クリエイターページ。**このクリエイターの作品と同カテゴリー（同ジャンル）の展覧会**を出すディスカバリー枠＝「アートの展覧会 Related」。会場基準ではないので距離は出さない。※p6の「作家自身の展覧会」とは別物なので混同しない＝クリエイター自身の展覧会に置き換えないこと）/ `.p4-side-rel-exh`（p4系 表示ページ＝ギャラリーは固定会場を持つため「近くの展覧会」Nearby・距離あり）/ **`.p6-side-rel-exh`（p6系＝「作家の他の展覧会」・作品ページは会場基準点を持たないため距離を出さない）** / **`.p5-side-rel`（p5〜p5-4＝「最近のウォッチ Recently Watched」＋「最近の興味あり！ Recent Interests」。ウォッチしたクリエイター・ギャラリーをウォッチ日降順で最大3件〔`.p5-side-wl-cards` 縦積み＝**p2/p2-5 の投稿者カードと同型の人物カード `.cc--h.cc--panel`／`.gc--h.gc--panel`**・badge-row に `cb-creator`/`cb-gallery`・watch ボタン（on）付き。**日付（ウォッチ日）は表示しない**（並び順にのみ使用）。旧 `.p5-side-wl` 行リストは2026-07-07廃止〕、興味あり！展覧会を最大3件〔`.p2-side-ec`・`cb-exhibition` バッジ・interest ボタン付き〕。**関連・回遊ゾーンに表示するコンテンツカードは基本CTAボタン付き**（展覧会カード＝interest／人物カード＝watch・2026-07-07 確定）。**ゾーン内のブロック間は 1px solid var(--ink) 罫線＋広め間隔（padding 28px/margin 30px）で区切る**（`.p5-side-rel__head2` border-top／`.p5-side-rel-pickup` border-bottom。ゾーン開始線〔2px solid var(--ink)〕と同色で太さだけ落とした線＝階層を色で揃え太さで下げる。ブロック内タイトル下線〔1px solid var(--border) ヘアライン〕とは色の濃さで区別。solid var(--border)・dotted 案は「タイトル下線と区別できない」ため不採用・2026-07-07）。先頭に「ピックアップ Picks for You」〔`.p5-side-rel-pickup`・カードは「最近の興味あり！」と同型の `.p2-side-ec`（`cb-exhibition`＋interest ボタン=off）〕＝**ゼロ・他ユーザー表示時のみ** CSSで表示（`body.p5-zero`/`body.p5-other`。同時にウィジェット②「もうすぐ終了」を `:has(.p5-side-ending-hd)` で非表示）。ゼロ状態＝アクティビティが無いオーナー：タブナビのカレンダー以外を `p5-tabnav__item--zero-off` で disable・カウンター下リンク〔`.p5-side-act__links`〕非表示。デモバー「休止中」（stale）は2026-07-07廃止。旧「ウォッチからの展覧会」ウィジェット〔`.p5-side-watch-*`〕は2026-07-07廃止）**　＋　ページ下部：`.ktn-related-band` / `.ktn-sub-tags` / `.ktn-sub-rec`。**「近くの展覧会」カード（`.p2-side-ec`）のみ距離を表示**：左カラムを `.p2-side-ec__media`（縦スタック）にし、サムネイル（`.p2-side-ec__poster`）の**真上**に `.p2-side-ec__dist`〔ピン＋距離・`var(--page-accent)`〕を積む（オーバーレイではなく画像の上部）。p2 は `buildSideEcCard`（pages.js）が `e.dist` を出力（`dist` があれば表示）、p4系は静的HTMLに直書き。**p6系は距離を持たない**（作品は場所を特定できない＝「近く」概念が成立しないため、`.p2-side-nearby` ではなく `.p6-side-rel-exh`＝作家の他の展覧会） | **背景は transparent・上部 2px ink アクセントラインで識別**（2026-07-07 一時 #faf7f1 化したが「ゾーン内ブロック区切りがあれば背景色不要」のユーザー判断で復帰）。ゾーン内に複数ブロックがある場合（p5系）はゾーン開始線と同色の 1px solid var(--ink)＋広め間隔で区切る（タイトル下線のヘアラインと色の濃さで区別）。**「もっと見る →」は head 内でなくコンテンツ下のブロック型 `.ktn-more-link` で全ページ統一**（2026-07-08 旧 `.p2-side-nearby__more` から共通名化。旧「すべて →」「すべて見る」は廃止・既存 href は維持。p5ゼロ状態メッセージの「展覧会を探す →」も同クラス＝関連ゾーン系のブロック型遷移リンクは全てこれを使う） |
| **右カラム sticky スクロール** | `.p2-layout__side` / `.p2-1〜4-side` / `.p25-side-col` / `.p3-layout__side` / `.p3-prof-side` / `.p4-prof-side` / `.p5-layout__side` / `.p6-side-inner` | 左コンテンツが長い場合、右カラムは画面内に固定。左コンテンツが下端まで来たら追従。`top: calc(--dh + --hh + 16px)` / `align-self: start` / モバイル時は `position: static` |
| **本文色強化** | `.ec__venue` / `.aw__spec` / `.ac__lead` 等 | `var(--ink)` に統一、opacity フェード排除 |
| **コンテンツ余白** | `.ktn-content` | 32px 20px 48px（呼吸感UP） |

### サブセクションラベル（共通定義・サイト全体）

セクション内の sub-label（見出し下層）は **Cinzel uppercase ink** で統一：

| 対象クラス | 仕様 |
|---|---|
| `.ktn-sec-en` | Cinzel `.64rem` 600 uppercase ink letter-spacing `.16em`（canonical L10091） |
| `.p2-about__label` | Cinzel `.66rem` 600 uppercase ink + 右に細罫線 |
| `.p2-ext-links__label` | 同上 |
| `.p2-article-head__ttl` | 同上 |
| `.p2-contact__sublabel` | 同上 |
| `.ktn-sub-tags__label` | 同上 |

### ヒーロー・タイトル系（v2 で適用）

各ページのヒーロー・タイトルバンドはページ固有実装だが、共通仕様：

| 要素 | フォント | サイズ | weight |
|---|---|---|---|
| メインヒーロータイトル | Shippori Mincho | `clamp(2rem, 5vw, 3.4rem)` | 700 |
| ヒーロー英サブ | Cormorant Garamond italic | `1.15rem` | 500 |
| 章タイトル（メイン） | Shippori Mincho | `1.2-1.4rem` | 700 |
| 章タイトル（サイド） | Shippori Mincho | `.95rem` | 600 |
| 下位ページ見出し | Shippori Mincho | `clamp(1.8rem, 3.5vw, 2.6rem)` | 700 |

すべて **`var(--ink)` 濃色 + letter-spacing -.005〜0 + line-height 1.18〜1.25**。

### 表示系ヒーローの外枠・共通化ルール（p2/p3/p4/p5＝2026-07-05 確定）

表示系ヒーロー（`.p2-title-band`／`.p3-head`／`.p4-head`／`.p5-head`）は**内部DOM構造は役割ごとに異なる（テキストのみ／アバター付き）まま**、外枠・アクセント・区切り・余白の4層を共通化する。**p6（`.p6-hero`＝画像主役の囲みカード＋暗いステージ）はこの統一の対象外**（別物として現行維持）。個別ページでこれらを上書きしない。

| 層 | 共通ルール | 実装 |
|---|---|---|
| **箱** | `background:#fff`・**full border/radius なし**（p2/p3/p4/p5 共通）。p3/p4/p5 は `position:relative;overflow:hidden`（アクセント線の土台）。**p5 の旧「四方border＋radius:4px 囲みカード」は廃止**しp3/p4と同一の箱へ | `.p5-head{background:#fff;…;position:relative;overflow:hidden}` |
| **アクセント線** | **左3px の縦線は人物ページ（creator/gallery/user＝p3/p4/p5）のみ**。展覧会（p2＝コンテンツ）には付けない。色は `body.pN-page` の `--page-accent` が供給（creator青緑／gallery銅／user桃） | グループ `.p3-head::before,.p4-head::before,.p5-head::before{…background:linear-gradient(to bottom,var(--page-accent) 0%,transparent 100%)}`（個別ルールに分けない） |
| **区切り線** | ヒーロー↔ナビ間の線は **p2/p3/p4/p5 共通で「ナビ側」に持たせる**（上 `2px var(--ink)` ＋下 `1px var(--page-accent)`）。**ヒーロー本体に border-bottom を書かない**（p2 の旧 `.p2-title-band` border-bottom は廃止し、区切りを `.p2-subnav-bar` の上罫線へ寄せた） | editorial v2 の grouped `.p2-subnav-bar,.p3-tabnav,.p4-tabnav,.p5-tabnav{border-top:2px var(--ink)}` |
| **文字領域の左右padding** | `--hero-pad-x`（desktop 20px）を単一ソースに。`.p2-title-band__inner`／`.p3-head__inner`／`.p4-head__inner`／`.p5-head__inner`／`.p6-hero__meta` が `var(--hero-pad-x)` を参照（p6 meta は 24→20 に是正）。**横paddingを各所に数値直書きしない**（mobile の 16px 系のみ意図的に据え置き） | `:root{--hero-pad-x:20px}` |

- **なぜclass統合でなくトークン＋grouped selectorか**：4ヒーローは中身の主役（展覧会名／人名＋アバター）が違い、1classへ畳むと条件分岐が増え可読性が落ちる。**「同じ役割の値・見た目」はトークンとグループ化ルールで単一ソース化し、classは役割ごとに分ける**（カード共通ルール・バッジ設計と同じ思想）。本当のコンポーネント統合は React CSR 化時に `<Hero variant>` として行う想定。
- **未使用CSSの排除**：`.p5-head__en`（英サブ）はHTML/JSから未使用の死にCSSだったため削除。p5 の副題は `.p5-head__since`（利用開始月）のみ。

### 関連・回遊ゾーンの背景色ルール

サイト内の「アクション促進」と「回遊誘導」を背景色で分離：

| ゾーン | 背景色 | 用途 |
|---|---|---|
| メインコンテンツ | `#fff` 白 | この展覧会/作家/作品 の主情報 |
| **CTA セクション** | **`var(--paper)` #f0f4f8（薄ブルー）** | アクション促進（watch/check-in 等） |
| 情報カード（facts/contact/links） | `#fff` 白 | この対象のメタ情報 |
| **関連・回遊ゾーン** | **`#faf7f1`（warm cream）** | 別ページへの誘導（近くの展覧会・関連情報・タグ・おすすめ） |

モバイル時、右カラム末尾の「近くの展覧会」とページ下部の「関連情報」が**シームレスに連続**するように設計。

### 新規ページ追加時のチェックリスト

1. body にロール識別クラスを付与（`.p3-page` / `.p4-page` / `.p5-page` 等）— `--page-accent` が自動設定される
2. サブナビには `.pN-tabnav` 命名規則を踏襲 → 自動的に共通スタイルが適用
3. サイドカードには `.pN-side-card` 命名規則を踏襲
4. 「関連情報」系の右カラム末尾セクションは `.p2-side-nearby` を再利用または同等の class 命名（要追加時相談）
5. CTA は `.p2-action-widget` を流用
6. 章タイトル・サブラベルは `.ktn-section__head` `.ktn-sec-en` を使用（独自定義禁止）

---

## 読み物テキスト変数（エディトリアル基準）

全ページの本文・略歴・展覧会説明・作品キャプション等の「読ませる文章」に共通適用される `:root` 変数。**ハードコードせず必ずこの変数を参照する**。

| 変数 | 値 | 用途 |
|---|---|---|
| `--rt-size` | `.92rem` | 本文・略歴・説明文の文字サイズ |
| `--rt-lh` | `2.0` | 行間（広めの呼吸感） |
| `--rt-ls` | `.02em` | 字間（refined） |
| `--rt-pre-size` | `.84rem` | プレビュー（clamp付き抜粋・カードリード） |

**設計方針：** P70ガイドページのエディトリアル方向（罫線中心・色を絞る・行間広め・余白多め）を基準とし、表示系ページ（p2/p3/p4/p6 系）の本文・見出しもこの方向で統一する。

### 表示系ページ見出しの基準（2ティア・2026-07-09 v2 実標準に整合）

見出しは**役割で2ティアに分ける**。旧版は「ヒーロー大見出し＝600 / .005em」の1本値だったが、**editorial refinement v2 が全表示ヒーロー（`.p2-title-band__title`／`.p3-head__name`／`.p4-head__name`／`.p5-head__name`）を 700・負の字間で上書き**しており、旧表がカスケード後の実描画と食い違っていた（＝この表の古さが weight/letter-spacing 競合の発生源だった）。**実際に描画される v2 の値を正**とし、以下に統一する。

**ティア①：エディトリアル・ヒーロー大見出し**（色帯ヒーローの主役名＝展覧会名・人名）

| 対象 | font-size | font-weight | letter-spacing |
|---|---|---|---|
| `.p2-title-band__title` | `clamp(2rem,5vw,3.4rem)` | **`700`** | **`-.01em`** |
| `.p3-head__name` / `.p4-head__name` | `clamp(1.8rem,3.5vw,2.6rem)` | **`700`** | **`-.005em`** |
| `.p5-head__name` | `clamp(1.6rem,3vw,2.2rem)` | **`700`** | **`-.005em`** |
| `.p1-hero__title`（P1 Pick Up ヒーロー） | `clamp(1.6rem,3.2vw,2.4rem)` | **`700`** | **`-.005em`** |
| 下位ページ見出し（`.p2-{n}-page-head__title`＝p2-1〜4 のサブページ head） | `clamp(1.8rem,3.5vw,2.6rem)` | **`700`** | **`-.005em`** |
| ヒーロー英サブ（`.pN-head__en` 等） | `1.1rem` | `500` italic | `.03em` |

ティア①は「大型・力強い明朝＋わずかに詰めた負の字間」で editorial の主役を張る。色帯ヒーローの主役名（展覧会名・人名）と、その配下の p2 サブページ head が該当。**新規の色帯ヒーロー主役名・editorial サブページ head はこの値に合わせる**（600 / 正字間にしない）。

**ティア②：機能ページ／章／カード見出し**（色帯ヒーローを持たない検索・機能ページ head、章タイトル、カードタイトル）

| 種別 | font-size | font-weight | letter-spacing |
|---|---|---|---|
| 機能ページ head（`.p10-search__title`＝検索ハブ・色帯ヒーロー無し） | `1.55rem` | `600` | `.005em` |
| 章見出し（`.ktn-section__title`） | `1.1rem` | `600` | `.02em` |
| カードタイトル（`.ec__title` `.aw__title`） | `.93rem` | `600` | `.01em` |

ティア②は `600` / 正の字間で「機能・情報の見出し」に留める。**P10（検索ディスカバリーハブ）は色帯ヒーローを持たない機能ページなので `.p10-search__title` はティア②（600）が正**（P1 の editorial ヒーローとは役割が別＝競合ではない）。

**`font-weight: 800` は装飾的用途（ポスタープレースホルダー、アバターイニシャル、SOLDリボン等）のみで使用。見出し系は ティア①＝700／ティア②＝600 の2値に集約する（中間の 650 等は使わない）。本文系は 600 まで。**

### サイドカードラベル

`.p3-side-card__title` などサイドカラムのラベルは `Cinzel` セリフを採用（`.66rem font-weight:600 letter-spacing:.14em uppercase`）。

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
- LIAISON+で申込者がいる場合：「販売中」バッジ（バッジ行）＋ `.aw__queue` で申込人数を `.aw__foot` 内の左側（価格と同行）に表示

### LIAISON+ 販売手数料

スライディングスケール型（2段階）。クリエイター・ギャラリーともに同一料率。  
税込販売価格に対して計算（送料は対象外）。Stripe決済手数料は手数料に**内包**（出品者の別途負担なし）。
Stripe決済手数料-実質マージンは利用者には非公開。

| 販売価格 | 手数料率 | 実質マージン（国内カード目安） |
|---|---|---|
| 〜 29,999円 | 10% | 約 6.4% |
| 30,000円〜 | 8% | 約 4.4% |

- Stripe手数料：国内発行カード 3.6% / 海外発行カード 3.9%（税抜・手数料に内包）
- 手数料発生タイミング：決済完了時のみ（キュー待ち中キャンセルは発生しない）
- 振込：月次・翌月末払い予定・振込手数料は利用者が負担
- フェーズ2（予定）：100,000円〜 帯に 6% を追加予定（変更は「下げる方向」のみ）
- 詳細：`docs/06_リエゾン_サービス仕様書.md` 第16章 / P70-7（手取り額シミュレーター）

### LIAISON+ 取引状態名（確定・全ページ共通）

取引関連ページ（p3-15 / p3-16 / p5-14 / p5-15）の状態名は以下に統一する。
**状態名は出品者側・購入者側で同一の客観名を使う。「誰の番か」は状態名に含めず、ターンラベル（自分の番＝命令形CTA「作品を発送してください」等／相手の番＝「出品者の発送待ち」等）と色で表現する。**

**ページ呼称（UI上の名称）：** 取引対応ページの**UI表示名はロールで分ける**。出品者側（p3-16 / p4-16）＝**「取引デスク」**、購入者側（p5-15）＝**「取引ワークスペース」**（p5-14 からの導線・FAQ・タイトル・H2 すべて「取引ワークスペース」で統一。完了済み取引への導線のみ「取引詳細」）。本 CLAUDE.md ではこれら4ページの総称として便宜上「取引デスク」「取引4ページ」と書く箇所があるが、**購入者側の実UI名は「取引ワークスペース」が正**。

| # | フェーズ | 正式状態名 | アクション側 | 廃止した旧呼称 |
|---|---|---|---|---|
| S0 | 申込 → 受付（会期中の待機） | 申込済 | —（申込ID順に自動処理・待機） | 申込中（不採用） |
| S1 | 申込ID順が到来 → 購入確定 | 購入確定待ち | 出品者 | 在庫確認待ち / 在庫確認回答待ち / 申込中 |
| S2 | 購入確定 → 支払 | 支払待ち | 購入者 | 購入者支払待ち |
| S3 | 支払 → 発送 | 発送待ち | 出品者 | 支払完了（バッジ名として） |
| S4 | 発送 → 受取確認 | 受取確認待ち | 購入者 | — |
| S5 | 受取確認 → 完了確認 | 完了確認待ち | 出品者 | 取引完了確認待ち |
| F1 | 終了（正常） | 取引完了 | — | — |
| F2 | 終了（中断） | キャンセル済 | — | — |

**付随ルール・状態strip書式の詳細は `docs/transaction-states.md` を参照**（ステップノードラベル／ログイベント名／期限呼称・確定期限=会期終了7日後or申込7日後の遅い方・発送期限=会期終了後7日or支払後7日の遅い方／S0申込済の扱い／申込ID#N表記／状態strip `.p515-status__head` の書式・色はターンで決まる 等）。取引4ページ（p3-15/p3-16/p4-15/p4-16/p5-14/p5-15）作業時は必読。

---

## バッジ設計システム（全ページ共通）

サイト全体のバッジ（`.cb` / `.sb` / `.aws` / `.lb-*`）は以下の統一ルールに従って設計される。**新規バッジを追加する場合も必ずこのルールを参照すること**。

### 設計原則（4原則）

1. **single source of truth** — 各バッジは `kotennavi-common.css` の canonical 1箇所のみで定義。`kotennavi-components.css` を含むあらゆる重複は禁止
2. **カテゴリごとに形を分ける** — 色ではなく **形（form）で意味の区別** をするのが第一原則。色相は補助
3. **共通フォントは Cinzel uppercase** — 全バッジで統一（LIAISON 商標 `.lb-dot` を除く）
4. **アニメーションは「ユーザーの行動を待っている」時のみ** — pulse は live/sale など限定。装飾目的の点滅は禁止

### カテゴリ一覧（既存4 + 新規追加時の枠）

| # | カテゴリ | クラス | 用途 | 形 | サイズ | canonical |
|---|---|---|---|---|---|---|
| 1 | **種別 — 人物** | `.cb-person` | who（クリエイター・ギャラリー・ユーザー） | ソリッド塗り | `.58rem` | L1082 |
| 2 | **種別 — コンテンツ** | `.cb-content` | what（展覧会・記事・作品・レビュー・ニュース） | 左罫線+淡背景 | `.58rem` | L1082 |
| 3 | **開催ステータス** | `.sb-*` | 展覧会の時間軸 | dot+ラベル（枠なし） | `.58rem` | L1285 |
| 4 | **販売ステータス** | `.aws-*` | 作品の取引可能状態 | 外枠チップ（取引可なら dot prefix） | `.56rem` | L2196 |
| 5 | **LIAISON ブランド** | `.lb-pill` / `.lb-dot` / `.lb-circle` | サービス識別 | ロゴ画像 or ピル | logo準拠 | L1372, L1489, L1395 |

### 重複定義の禁止
過去に `.cb` 6箇所、`.sb` 4箇所、`.lb-dot` 3箇所、`.lb-pill` 2箇所の重複定義が存在し、CSS cascade で意図しない上書きを引き起こしていた。**全て canonical 1箇所に統合済み**。新規ルールは canonical へ追加すること。`kotennavi-components.css` への重複も禁止。

### 詳細仕様は `docs/badge-system.md` を参照
形状ボキャブラリー（新規追加時の形の選択肢）／色パレットの枠分け（カテゴリ別使用可能色相）／共通仕様の基本値（Cinzel uppercase / weight 600 / letter-spacing .14em / line-height 1）／各カテゴリの詳細HTML・バリアント色・canonical行番号（`.cb-person` / `.cb-content` / `.sb-*` / `.aws-*` / `.lb-*`）／新規バッジカテゴリ追加時の手順は同ファイルにある。上表のカテゴリ一覧・4原則・重複禁止が canonical、詳細HTMLはそちら。

---

## カウンター共通ルール（件数インジケータ・全ページ共通）

サイト全体の「件数表示（N件／N点／全12件 等）」は canonical `.ktn-count` に集約する。**新規で件数を出すときは必ずこの体系を使い、ページ固有の件数CSSを新設しない**（過去に系統B淡ピル／C素テキスト／Dフィルタ結果数がページごとに微差で散在していた）。canonical は `kotennavi-common.css` の `.ktn-tab-head__count` 直後。

### ベース＋モディファイア（4種）

| クラス | 用途 | 仕様 |
|---|---|---|
| `.ktn-count` | **表示ページの素テキスト件数**（総数・見出し横・年グループ等・系統C） | `.75rem / 400 / var(--muted)`。**font-family は指定せず** body の `--fn`（和文ゴシック）を継承（「件」「点」が Latin フォントにフォールバックするのを防ぐ）。`.ktn-count strong` は `--ink / 700` |
| `.ktn-count--strong` | **見出しの無いサマリ行の主役数値**（p3-15/p4-15「出品N件」＝status バッジと並ぶ行の先頭） | `.82rem / 600 / var(--ink)`。**見出しが無い**行でその数値がアンカーになる場合の管理ティア。**見出しの横に置く件数には使わない**（下記注意） |
| `.ktn-count--pill` | **タブ／セクション強調の淡ピル**（系統B） | 角丸ピル・`page-accent-bg` 淡tint＋`page-accent` 文字。**白背景**のセクション見出し件数（常時active・`.p5-1-sec-count` 等）向け |
| `.ktn-count--pill.is-idle` | **タブ非活性時の中立ピル** | `--tag-bg` 背景＋`--muted` 文字。タブの件数は静的にこれを持つ |
| `.ktn-count--result` | **フィルタ結果数**（系統D） | `margin-left:auto`（右寄せ）・`500`・`page-accent`。総数（タイトル横）と役割・配置が別 |

**`--strong` を使うか base かは「隣に見出しがあるか」で決める（2026-07-18 確定）：**
- **見出しの横**に置く件数（例：p2-12/p2-12-1「展示作品」h3 の横の「N件」）は **base `.ktn-count`**（.75rem/400/muted）。見出し（.82rem/700/ink）が既にアンカーなので、件数を bold/ink にすると見出しと競合し、数字(600)と「件」(400)の重さもちぐはぐになる。件数は従属メタ情報として軽く出す。
- **見出しの無いサマリ行**でその数値が行の主役になる場合（p3-15/p4-15「出品N件」＝status バッジ列の先頭）は **`--strong`**。アンカーが他に無いので数値自身を強くする。

### タブ件数の active/idle 切替（JS無改変・親コンテキスト駆動）

- タブの件数pillは**静的に `ktn-count ktn-count--pill is-idle`** を持つ。JSは**親タブの `.is-active` のみ**を付け外しし、件数クラスは触らない。
- active 表示は親コンテキストの上書きで解決：`.p5-type-tab.is-active .ktn-count--pill` / `.p514-tab.is-active .ktn-count--pill` / `.p315-tab-btn.is-active .ktn-count--pill`（specificity 0,3,0 > `.is-idle` の 0,2,0）。
- **active の塗りはロール色ソリッド＋白文字（`var(--page-accent)` / `#fff` / 600）**。淡tint（`page-accent-bg` rgba .1）にすると creator（青緑）・gallery（銅）が idle の `--tag-bg` とほぼ同色になり active が視認できないため（p5-14 のピンクだけ偶然差が出ていた）。→ 詳細理由は `docs/handoff-decisions.md` ⑪。
- **タブ系（p5-type-tab / p514-tab / p315-tab-btn）は同一の `.is-active` 方式に統一**。新規の管理系タブも `.is-active` クラス＋`ktn-count ktn-count--pill is-idle` の件数を各タブに必ず持たせる。

### 対象外（役割が別なので統合しない）

- `.p315-summary__count`（E系＝大数値統計）／`.p315-ws-sales`（金額サマリ）／`.p315-archive-result__val`（色状態付き結果値）／`.p10-toolbar__count`（strong が大数値）
- 文字数カウンタ（`.p2-12-desc-block__count` 0/200 等）
- Cinzel大文字ラベル（英ラベルは件数ではない）

### JSフックの残し方

移行時、JS が **class** で querySelector している件数（`.p3-1-group-count` / `.p3-2-year-count` / `.p5-2-year-group__count` 等）は、そのクラスをフックとして HTML に残し `ktn-count` を**併記**する（CSSルールだけ剥がす）。id フック（`p5ExhCount` 等）はクラス自体を `ktn-count` へ置換してよい。ページ固有クラスに残す CSS は `margin-left` 等の位置微調整のみ。

### React 変換時（handoff）

`<Count variant="text|strong|pill|result">`。表示総数=text／管理総数=strong／フィルタ結果=result／タブ=pill（親の `is-active` で idle/active）。総数と結果は別配置（タイトル脇／フィルタ脇）。詳細な移行経緯は `docs/handoff-decisions.md`「カウンター共通化」⑤〜⑪。

---

## カード共通ルール（全カードベース）

サイト全体のカード（`.ec` / `.aw` / `.cc` / `.gc` / `.uc` / `.ac` / `.rc` / `.nc` / `.p25c` 等）はエディトリアル方向に統一する。

### 共通ベース仕様

| 項目 | 値 | 理由 |
|---|---|---|
| `background` | `#fff` | コンテンツの明瞭性 |
| `border` | `1px solid var(--border)` | ヘアライン |
| `border-radius` | `4px` | 全カード統一（8px は廃止） |
| `overflow` | `hidden` | 内部画像クリップ |
| `transition` | `transform .2s, box-shadow .2s, border-color .18s` | ホバーアニメ |

### ホバーエフェクト（控えめ・エディトリアル）

```css
.card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 18px rgba(0,0,0,.06);
  border-color: rgba(0,0,0,.18);
}
```

**ポリシー**：
- 従来の `translateY(-3px)` + 重い影 `12-36px blur` は廃止
- 微細な浮き上がり（1px）と柔らかい影（4-18px / 6%透明）
- ボーダーカラーの濃化で「触れる感」を補完
- 装飾的な大袈裟な動きは避ける

### カード内部 padding（呼吸感）

| カード | body padding |
|---|---|
| `.ec__body` | `13px 16px 11px` |
| `.aw__body` | `12px 14px 10px` |
| `.ac__body` | `14px 16px 0` |
| `.rc__body` | `14px 16px 0` |
| `.nc__body` | `14px 16px 13px` |

横方向 14-16px、縦方向 12-14px を基準。狭すぎず、広すぎない。

### カードタイトル統一値

全カードタイトル（`.ec__title` `.aw__title` `.cc__name` `.gc__name` `.ac__title` `.rc__title` `.nc__title`）：

- font-family：`var(--fs)` Shippori Mincho
- font-weight：`600`
- font-size：`.93rem`
- letter-spacing：`.01em`
- line-height：`1.4-1.5`

### アバター影（軽量化）

人物カード（`.cc__avatar` `.gc__avatar` `.uc__avatar`）の影：

```css
box-shadow: 0 1px 4px rgba(0,0,0,.06);  /* 旧: 0 2px 10px rgba(0,0,0,.11) */
```

outline（ロール識別枠線）は CLAUDE.md の「ユーザー種別アバター形状・枠色」を維持。

### 新規カード追加時の手順

1. **既存カードで表現できないか確認**
2. **共通ベース仕様（上記表）を採用** — 独自の background / border / radius は避ける
3. **ホバーエフェクトは上記の標準パターンを使う**
4. **タイトルは `.93rem` 600 weight に統一**
5. **CLAUDE.md の本セクションに追記**
6. **デモHTML（`kotennavi_cards_*.html`）に追加**

### カードのダークモード対応（`.p251-dark` / `.p6-dark` 配下）

p2-5-1（LIAISON+作品一覧）・p2-12-1（LIAISON+作品管理）・p6-dark（作品ページダーク）等のダーク背景ページ用に、`.aw` `.p25c` カードは以下の dark variant を持つ：

| 要素 | 色 |
|---|---|
| カード背景 | `#3e5670`（スレートブルー） |
| ボーダー | `rgba(255,255,255,.07)`、hover時 `rgba(255,255,255,.22)` |
| `.aw__title` | `rgba(255,255,255,.88)` |
| `.aw__creator` | `rgba(255,255,255,.65)` |
| `.aw__spec` | `rgba(255,255,255,.55)` |
| `.aw__price` | `#c8a96e`（金色） |
| `.aw__price .tax` | `rgba(255,255,255,.65)` |
| `.aw__foot` 背景 | `rgba(200,169,110,.06)`（淡ゴールド） |
| `.aw__queue` / `.aw__queue-inline` | `#7fb8ff`（明るい青） |
| `.aw__counter` | `rgba(255,255,255,.45)` |
| `.ktn-icon-btn`（hover時） | `rgba(255,255,255,.45)` border |
| `.ktn-icon-btn.on` | `#5ab0ff` border + `rgba(90,176,255,.15)` bg |

**使い方**：HTMLを `<div class="p251-dark">...</div>` または `<body class="p251-dark">` でラップするだけで、内部の `.aw` / `.p25c` カードが自動でダークモード表示に切替。個別ページで `.p251-dark` クラスを HTML に追加する必要なし。

**`.p6-dark` も同じセレクタで定義**（作品ページ p6 のダークモード）。

デモ：`kotennavi_cards_artwork.html` セクション②-D「リエゾンプラス ダークモード」

---

## 右カラム共通コンポーネント

サイドカラム要素は p2 / p3 / p4 / p6 で `.p2-side-*` `.p3-side-*` `.p4-side-*` ネームスペースを使い分けるが、以下のルールで統一する。

### サイドカード基本
| クラス | background | border | radius | padding |
|---|---|---|---|---|
| `.p2-side-card` / `.p3-side-card` / `.p4-side-card` | `#fff` | `1px solid var(--border)` | `4px` | `18px 20px` |

### ラベル系（uppercase メタテキスト）
以下のラベルは **Cinzel + uppercase + letter-spacing .14em** で統一：
- `.p2-side-posted__label`
- `.p2-side-inq__label`
- `.p2-contact__sublabel`
- `.p2-side-facts__dl dt`
- `.p2-action-widget__lbl`
- `.p3-side-card__title` / `.p4-side-card__title`

サイズ目安：`.6rem`（メタラベル）〜 `.66rem`（カードタイトル）、color `var(--muted)`

### アバター系
`font-weight: 800` は廃止し **700** に統一（`.p2-side-posted__avatar` 等）。サイズは 38–64px、`outline` でロール色枠線を表現。

### CTA ウィジェット
`.p2-action-widget` は p2 / p3 / p4 / p6 で共通使用。数値表示は `DM Serif Display` 2.4rem を維持。`p6` は `.p2-side-*` ウィジェットを丸ごと再利用するため、p2 側の変更が自動反映される。

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
| p6-11 | `mgmt-page p6-11-page` + JSで `p3-page`(creator)/`p4-page`(gallery) 動的付与 | 作品-新規/編集/クローン・creator/gallery共有・`.p211-*` フォーム部品を再利用 |
| p3-15 | `p3-15-page p3-page mgmt-page` | |
| p3-16 | `p3-page p3-16-page mgmt-page` | |
| p4-15 | `p4-15-page p4-page mgmt-page` | |
| p4-16 | `p4-page p4-16-page mgmt-page` | |
| p5-14 | `p5-page p5-14-page mgmt-page` | |
| p5-15 | `p5-page p5-15-page mgmt-page` | |
| p5-11〜13 | `p5-page p5-{id}-page mgmt-page` | |
| p11-4 | `mgmt-page` + JSで `p3-page`/`p4-page` 動的付与 | creator/gallery共有 |

### ロール動的切替（creator/gallery共有ページ）
`KTN.pages['p2-11']` / `KTN.pages['p11-4']` / `KTN.pages['p6-11']` に `syncMgmtBar()` 関数を実装。`ktnRender` 内で `KTN.role` を読み取り `p3-page`/`p4-page` を付け外し。

### 管理ページの幅（`--w-detail` 760px で全層統一・2026-07-06 確定）

**管理・編集ページは「パンくず＝ヒーロー帯＝tabnav＝コンテンツ＝ページ最大幅」を全て `--w-detail`（760px）に揃える**（sitemap.md の正＝全 mgmt ページ 760px）。表示系（p2/p3/p4/p5 の公開ページ＝`--w-entity` 1080px）と異なり、管理系は1カラム760で確定。

- **パンくず・ヒーロー・tabnav は汎用ルールが自動適用**（common.css L11326〜11332）。`<body>` に `mgmt-page` を付ければ以下が効くため、**ページ個別に `max-width` を書く必要はない**：
  ```css
  body.mgmt-page .ktn-header__inner{max-width:var(--w-detail)}          /* パンくず */
  body.mgmt-page .p3-head,.p4-head,.p5-head{max-width:var(--w-detail)}  /* ヒーロー */
  body.mgmt-page .p3-tabnav,.p4-tabnav,.p5-tabnav{max-width:var(--w-detail)} /* tabnav */
  ```
  - 以前は各ページに個別 `max-width:var(--w-detail)` 指定が残っていたが、汎用ルールと重複するため**削除済み（2026-07-06）**。新規ページで個別指定を追加しない。
- **コンテンツの760化は `.ktn-mgmt-wrap`（白カード・max-width:760・margin:0 auto）が担う**。管理ページの `.ktn-content` は**素のまま**（1080・左右padding20px）置き、その中で wrap が760に自制する（→次項「管理ボックス共通パターン」）。16ページ全部この方式（p4-18 は2026-07-10仕様変更で廃止）：Model A（stackなし）＝p2-11/p6-11/p3-11/p3-12/p5-11/p5-12、Model B（`ktn-mgmt-stack` 併用）＝p2-12/p2-12-1/p3-15/p4-15/p3-16/p4-16/p5-13/p5-14/p5-15/p11-4。
  - **`.ktn-content--article` / `--detail` を管理ページに併記しない（2026-07-07 是正）**：これらは max-width:760 に**左右padding20pxを含む**ため、中の wrap が **720px** に縮み、パンくず帯・ヒーロー帯（760）とボックス外枠が揃わなくなる。「幅を揃える」＝**ボックスの外枠端＝パンくず帯・ヒーロー帯の外枠端（760）**の一致（過去に7ページ＝p2-11/p2-12/p2-12-1/p6-11/p11-4/p3-11/p3-12 で併記が残っており720に縮んでいたのを削除済み）。
  - **wrap 外に置く要素（identity strip・状態バナー・審査notice）は自前で `max-width:var(--w-detail);margin:0 auto`** を持たせて wrap と同幅にする（`.ktn-mgmt-context`／`.p211-mode-banner`／`.p114-status-notice` は付与済み）。
- **`data-w` 属性は不要**：`body.mgmt-page .ktn-header__inner` がパンくず幅を data-w に関わらず760へ固定するため。
- 左右padding は20pxで統一（`.ktn-mgmt-wrap` 系は子要素 `margin:0 20px`、モバイルで縮小）。

### 管理ページの identity strip（`.ktn-mgmt-context`・全16管理ページ標準・2026-07-09 確定／2026-07-10 p4-18廃止で17→16）

**管理・編集ページのヘッダー文脈表示を1コンポーネントへ統一。** 旧3パターン（人物＝親 `.pN-head--compact` ヒーロー＋公開 `.pN-tabnav` 継承／p2-11・p6-11＝`.p211-exh-banner`／p2-12・p2-12-1＝`.p2-12-banner`）を撤去し、`.ktn-mgmt-wrap` ボックスの**外・上**に置く横ストリップ `.ktn-mgmt-context` に集約した（旧2バナークラスの CSS は廃止）。canonical は `kotennavi-common.css` の `.ktn-guide-link` 直後。

- **構造**：`[media][body: badges / name(親リンク) / meta / (非人系のみ)owner行][actions: 「○○ページへ →」view リンク]`。自前で 760px 中央寄せ（wrap外要素）。`.ktn-content` 直下に置くと `:has(> .ktn-mgmt-context){padding-top:16px}` で上余白が詰まる。
- **media バリアント**：人物＝`--creator`/`--gallery`/`--user`（アバター形状ルール準拠の角丸＋ロール色 outline）。コンテンツ＝`--content`（outline無し・薄フレームの矩形サムネ）。badges も人物＝`cb-person`／コンテンツ＝`cb-content` で対応。
- **非人系（コンテンツ）strip はオーナー行 `.ktn-mgmt-context__owner` を持つ（2026-07-09 確定）**：`__meta` の下に「`Owner`（Cinzel micro-label）＋人物バッジ（`cb cb-person cb-creator`/`cb-gallery`）＋オーナー名（p3/p4リンク・`--fs`）」を出し、**このコンテンツの操作主体が誰か**を明示する（人系 strip は identity 自体がオーナーなので不要）。**オーナーはコンテンツ固有の所有者に合わせる**（ページ横断の汎用デモペア〔田中透／Gallery SOIL 渋谷〕を機械的に流用しない＝会場・作家と食い違うため）。p2-12・p2-12-1（creator 田中透→p3）と**p2-11（展覧会 松田啓佑展／会場 YUGEN Gallery＝仮にギャラリー所有・`gallery` YUGEN Gallery→p4）はHTML直書き固定**（p2-11 はロール切替でオーナーを変えない＝この展覧会は gallery 所有と確定）。**role別 populate が要るのは p6-11 のみ**：作品《オノマトペの庭》＝作家 田中透 のデモデータが共通ペアと一致するため、`KTN.syncMgmtOwner('p611Owner', role)`（共通ヘルパー・`KTN.MGMT_OWNER` マップ）が `#p611OwnerBadge`／`#p611OwnerName` をロール別 populate。p11-4 は人系 strip なので対象外。
- **公開タブナビは管理画面に出さない**（編集集中・誤操作離脱防止。identity/親リンク機能は strip が継承）。
- **管理メニュー＝strip には置かない（2026-07-09 確定）**：strip の actions は view リンクのみ。旧「strip のみ」方式で移設した `.p3-mgmt-btn`（`管理`）は**全ページ撤去済み**（ユーザー指示「管理ボタンは不要」）。管理メニューはヘッダー `getActions()` へ寄せる想定で、その正式化は p1/p10 と同じく後続の一括作業へ後回し。**既存の管理ドロワー（`.p3-mgmt-drawer`）＋JS結線（null-safe）は残置**するが、開くトリガー（管理ボタン）が無いため現状は休眠。getActions 一括化のバッチでドロワー廃止 or getActions 結線を確定する。**例外＝p3-11 のみ**は先行して `getActions('p3-11','creator')` の `dd('オーナーメニュー')` に集約済み（ドロワーも撤去・横展開しない）。
- **非人系（コンテンツ編集・管理）ページも同じ扱い（2026-07-09 確定・案A）**：p2-11・p6-11・p2-12・p2-12-1・p11-4 も strip は identity＋view リンクのみ。オーナーメニューは**人系と共通のヘッダー getActions 1本**に寄せる（編集対象はコンテンツでも操作主体は creator/gallery 本人で、開くメニュー内容は人系と同一のため別立てにしない）。**creator/gallery 兼用ページ（p2-11・p6-11・p11-4）は getActions もロール別に出し分ける**（p11-4 の `CTX` と同発想）。実装は p1/p10 デザインFixと同じ後続の一括バッチで人系・非人系まとめて行う（今は未実装＝16ページ全て strip 確定状態）。
- **モード切替を持つページ**：p2-11（`id=p211ExhBanner`）・p6-11（`id=p611WorkBanner`）は編集/クローンモードで strip を hidden 切替する id を strip 根に維持。p11-4 は creator/gallery 兼用のため `syncMgmtBar()` が `CTX` デモデータで media/badge/name/view をロール別に populate。
- 新規管理ページは strip をコピーし、media 形状・badge・エンティティ名・view リンク先を対象に合わせるだけでよい。

### 管理ボックス共通パターン（`.ktn-mgmt-wrap` ＋ `.ktn-mgmt-stack`・2026-07-06 確定／2026-07-07 全管理ページへ展開完了）

**「ヒーロー帯＋タブナビ → その下に操作コンテンツを白ボックスへ格納（ボックス上端にオーナーのアクセントライン）」**という構造は共通コンポーネント化済みで、**管理・編集系16ページすべてに適用済み**。**新規の管理・操作ページはこの3クラスの組み合わせをコピーするだけでよい**（ページ固有CSSは原則不要）。

**2つの適用モデル：**

| モデル | 構成 | 用途 | 適用ページ |
|---|---|---|---|
| **Model A（フラットフォーム型）** | `.ktn-mgmt-wrap` のみ（stack なし） | `.p211-block` 構成の編集フォーム。`.ktn-mgmt-wrap:not(.ktn-mgmt-stack) > .p211-block` がカード装飾を剥がし border-bottom 区切りへフラット化。sticky `.p211-submit-bar` をボックス末尾に内包 | p2-11 / p6-11 / p3-11 / p3-12 / p5-11 / p5-12 |
| **Model B（カードスタック型）** | `.ktn-mgmt-wrap ktn-mgmt-stack` | カード・セクションを縦積みする操作ページ。子はカード枠を保ったまま自動 inset | p2-12 / p2-12-1 / p3-15 / p4-15 / p3-16 / p4-16 / p5-13 / p5-14 / p5-15 / p11-4 |

**ボックスの外に置くもの（stack の子 inset・box 幅の影響を受けないように）：**
- **fixed モーダル**（`position:fixed;inset:0`）＝stack の子マージンがオーバーレイを縮めるため、必ず `.ktn-mgmt-wrap` の閉じタグ後（`.ktn-content` 内でよい）に置く
- **状態バナー・審査notice**（p2-11/p6-11 のクローン・展覧会バナー、p11-4 の審査中/承認済notice）＝ページレベルのモード通知はボックスの上に置く

**3層アナトミー：**
1. **ヒーロー帯＋タブナビ**（`.pN-head` ＋ `.pN-tabnav`）＝760px。`body.mgmt-page` の汎用ルールで自動760化（前項）。
2. **操作ボックス**（`.ktn-mgmt-wrap`）＝白カード＋ヘアライン枠＋**上端3pxのオーナーアクセントライン**（`border-top:3px solid var(--page-accent)`）＋760px。`--page-accent` は `body.pN-page` が供給（creator青緑／gallery銅／user桃）。
3. **ボックス内本文スタック**（`.ktn-mgmt-stack`）＝ヘッド＋操作ブロックを縦積み。

**クラスの役割分担（canonical：common.css `.ktn-mgmt-*` ブロック）：**

| クラス | 役割 | 既定値 |
|---|---|---|
| `.ktn-mgmt-wrap` | 白ボックス・アクセントライン・760px | `max-width:760;border;border-top:3px accent;radius:4px;shadow` |
| `.ktn-mgmt-stack` | 本文スタック（**再利用の主役**） | `flex column;gap:20px;padding:0 0 60px` ＋ ヘッド以外の子を左右20px inset（モバイル8px） |
| `.ktn-mgmt-head` | ボックス上部のタイトル帯（全幅・下罫線・自前24px padding） | `__title`／`__en`／`__desc`／`__meta`／`__guides` の子要素あり |

**HTMLテンプレート（これをコピー）：**
```html
<div class="ktn-content">
  <div class="ktn-mgmt-wrap ktn-mgmt-stack">      <!-- ページ固有クラス .pNNN-wrap は任意で併記 -->
    <div class="ktn-mgmt-head">
      <h2 class="ktn-mgmt-head__title">ページ名</h2>
      <p class="ktn-mgmt-head__en">PAGE NAME</p>
      <p class="ktn-mgmt-head__desc">説明文…</p>
    </div>
    <!-- 以下、操作ブロックを直接子として並べる（自動で左右20px inset・縦gap） -->
    <div class="…">…</div>
    <div class="…">…</div>
  </div>
</div>
```

**運用ルール：**
- `.ktn-mgmt-head` は**必ずボックスの最初の子**に置く（全幅・inset対象外）。それ以外の直接子は自動で20px inset＋縦積みされる。
- **gap・下paddingが既定（20px／60px）でよければページ固有CSSは書かない**。変えたい時だけ `.pNNN-wrap` を併記して `gap` / `padding-bottom` のみ上書き（例：p5-15＝`.p515-wrap{gap:16px;padding-bottom:80px}`／p3-16=p4-16＝`.p316-wrap{padding-bottom:48px}`）。**`display:flex` や child-inset をページ側に再定義しない**（`.ktn-mgmt-stack` が単一ソース）。
- **p3-15/p4-15（`.p315-wrap`）は `.ktn-mgmt-stack` を併用するが半移行**：主要セクション（ops-guide/exh-block/works-summary/archive）は `.p315-tab-panel` 内にネストするため、stack の child-inset（左右20px）は直下の子＝`.p315-faq` にしか効かない。**タブ内セクションの横insetは `.p315-tab-panel{padding:16px 20px 0}`／`.p315-tab-nav{padding-left:20px}`（モバイル540pxで8px）が別途供給**し、値を stack と揃えて全6ページのセクション横幅を一致させた（2026-07-06、旧24px→20pxへ commonize）。`.p315-wrap` は `gap:0`＋独自 `margin-top` 間隔・`!important` を残す bespoke のままなので、**stack の gap/inset をこのページの他要素向けに前提にしない**。
- `body` には `mgmt-page` ＋ `pN-page`（アクセント色供給）を付ける（→「管理ページ視覚識別」）。

---

## 確定済み設計仕様

### 全ページ共通：HTML head・SEO

#### `<meta name="description">` フォーマット

全ページに必ず設定する。文字数目安：**70〜120文字**（スマホSERPで切れにくい範囲）。  
管理・編集ページ（`mgmt-page`）はnoindex前提のため省略可。

| ページ | フォーマット |
|---|---|
| P2（展覧会トップ） | `{作家名}による個展「{展覧会名}」。{会場}にて{会期}開催。{ジャンル}。{LIAISON情報}` |
| P2-1（スケジュール） | `{作家名} 個展「{展覧会名}」の開催スケジュール。{会期}、{会場}。{詳細内容}` |
| P2-2（開催場所） | `{会場名}のアクセス情報。{住所}。{最寄り駅}。{施設概要}` |
| P2-3（詳細） | `{作家名} 個展「{展覧会名}」の詳細情報。{コンテンツ列挙}。{会場}にて{会期}開催` |
| P2-4（出展者） | `{作家名} 個展「{展覧会名}」出展者プロフィール。{作家概要}。{アクション}` |
| P2-5（LIAISON作品） | `{作家名} 個展「{展覧会名}」LIAISON作品一覧。{概要}。{会場}にて{会期}開催` |
| P2-5-1（LIAISON+作品） | `{作家名} 個展「{展覧会名}」LIAISON+作品一覧。{概要}。{会場}にて{会期}開催` |
| P3（クリエイタートップ） | `{作家名}（{読み仮名}）のクリエイターページ。{ジャンル・活動概要}。{コンテンツ列挙}を掲載中` |
| P3-1（展覧会一覧） | `{作家名}の展覧会一覧。{状況説明}` |
| P3-2（記事一覧） | `{作家名}の記事一覧。{コンテンツ種類}` |
| P3-3（作品一覧） | `{作家名}の作品一覧。{販売状況}` |
| P4（ギャラリートップ） | `{ギャラリー名}のギャラリーページ。{ジャンル・活動概要}。{コンテンツ列挙}を掲載中` |
| P4-1（展覧会アーカイブ） | `{ギャラリー名}の展覧会アーカイブ。{説明}` |
| P4-2（記事一覧） | `{ギャラリー名}の記事一覧。{コンテンツ種類}` |
| P5（マイページ） | `{ユーザー名}のマイページ。{機能一覧}` |
| P5-1（ウォッチリスト） | `{ユーザー名}のウォッチリスト。{説明}` |
| P5-2（チェックイン） | `{ユーザー名}のチェックイン記録。{説明}` |
| P5-3（興味あり！） | `{ユーザー名}の興味あり！リスト。{説明}` |
| P6（作品通常） | `{作家名}の作品「{作品名}」。個展「{展覧会名}」（{会場}・{会期}）出品作品。{ジャンル}` |
| P6-1（LIAISON） | `{作家名}の作品「{作品名}」。個展「{展覧会名}」に連動したLIAISONオンライン展示。{会場}にて{会期}開催` |
| P6-2（LIAISON+） | `{作家名}の作品「{作品名}」。個展「{展覧会名}」に連動したLIAISON+オンライン展示・販売。{会場}にて{会期}開催` |

---

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

#### パンくずナビのURL体系（確定）

各ページの `bc` 配列における親リンク先は以下で統一する（`kotennavi-common.js` の `PAGES` オブジェクトに登録済み）。

| ページ系統 | Step 1 | Step 2（カテゴリリンク） | Step 3以降 |
|---|---|---|---|
| P2 / P2下層 | Top → `/` | 展覧会 → `/p10` | 展覧会名（`/p2`）→ 下位ページ名 |
| P3 / P3下層 | Top → `/` | クリエイター → `/p10-2` | クリエイター名（`/p3`）→ 下位ページ名 |
| P4 / P4下層 | Top → `/` | ギャラリー → `/p10-3` | ギャラリー名（`/p4`）→ 下位ページ名 |
| P6 / P6下層 | Top → `/` | 作品 → `/p10-1` | 作品名（`/p6`）→ LIAISON / LIAISON+ |

- P2-5 / P2-5-1 のパンくず末尾テキストには LIAISON/LIAISON+ バッジ（`'l'` / `'lp'`）を**付けない**（テキストのみ）
- 新ページ追加時は必ず上表のリンク先に合わせて `PAGES` に登録すること

#### ページ管理メニュー（オーナーメニュー/管理者ドロップダウン）
- **正規の設置場所：スティッキーヘッダー内**（`getActions()` で生成するドロップダウン）
- ページヒーロー内の管理ドロワー（`p3-mgmt-drawer` 等）は暫定実装。全ページ完成後にヘッダーの `getActions()` 定義を確定し、ドロワーを廃止する
- 下層ページ（-1, -2, -3 等）も上位ページと同一のメニュー構造にする（上下で操作系が変わるのはUIとして好ましくない）
- 各ページのヘッダーアクション定義は全ページ完成後に個別確定予定。制作中は暫定 `owbtn('info','ガイド')` で構わない

#### ヘッダー高さと `--hh` の扱い
`--hh` は `_syncHH()` が動的更新（→「高さ変数（`--hh`・`--dh`）」参照）。sticky 要素の `top` は必ず `var(--hh)` 経由にし、ピクセル値をハードコードしない。

#### タブナビ・サブナビの sticky 位置（P2〜P5 共通）

ヘッダー直下に貼り付く横ナビは、ページを問わず以下の共通ルールで配置する。

| ページ | クラス | 備考 |
|---|---|---|
| P2系 | `.p2-subnav-wrap` | スケジュール・詳細等のサブナビ |
| P3 / P3下層 | `.p3-tabnav` | 展覧会・作品・記事・クリエイター情報 |
| P4 / P4下層 | `.p4-tabnav` | 展覧会・記事・ギャラリー情報 |
| P5 / P5下層 | `.p5-tabnav` | ウォッチリスト・チェックイン等 |

**共通 CSS ルール（クラスが違っても値は同一）：**
```css
position: sticky;
top: calc(var(--dh, 0px) + var(--hh, 50px));
z-index: 90;
```

- `top` に px をハードコードしない。`--dh`・`--hh` の変数のみ使用
- `_syncHH()` が `--hh` を実測更新するため、モバイル2行ヘッダーでも自動的にヘッダー下端に揃う
- P3下層（`-1`,`-2`,`-3`）・P4下層も同一クラス（`.p3-tabnav` / `.p4-tabnav`）を流用するためこのルールが自動適用される

#### タグバー（`.ktn-tagbar`）
- タグ列は横スクロール：`overflow-x: auto; scrollbar-width: none`（スクロールバー非表示）
- 左右に矢印ボタン（`.ktn-tagbar__arr--l` / `--r`）を配置し、クリックで160pxスクロール
  - スクロール位置に応じてJSで `is-hidden` クラスを付け外し（`visibility:hidden` で幅は確保）
  - タッチデバイスでは直接スワイプも可能
- `overflow: hidden` を親に設定しない（子スクロールコンテナを妨害するため）
- **管理・編集ページ（`body.mgmt-page`）にはタグバーを出さない（2026-07-07 確定）**：`renderTagbar` 冒頭の mgmt-page ガードが親ページからの継承を含め常に非表示化する（単一ソース）。管理ページのHTMLに `.ktn-tagbar` markup 自体も置かない（当時17ページから削除済み・現16＝p4-18は2026-07-10廃止）。
- **定義は `TAGBAR_DEFS`（common.js）にページID単位で登録**。`renderTagbar(page)` が `TAGBAR_DEFS[page]` を描画し、無ければ非表示。
- **下位ページは親のタグバーを継承**（2026-07-05 確定）：`TAGBAR_DEFS[page]` に専用定義が無い場合、`renderTagbar` が末尾の `-N` を1段ずつ削って親ページの定義を探す（`p2-1→p2` / `p2-5-1→p2-5` / `p6-1→p6` / `p3-1→p3` / `p4-1→p4`）。**下位ページ用に個別定義を増やさず**、上位ページと同じタグバーを自動表示する。専用のタグバーを出したい下位ページ（例：`p2-3`・`p2-5`）は `TAGBAR_DEFS` に明示登録すれば継承より優先される。

---

### 全ページ共通：watch / interest / check-in ボタン

**新規ページでページ個別の CSS は一切追加しない。** HTML をそのままコピーするだけで common.css の共通定義（OFF/ON 色・tip・サイズ）が自動適用される。

- **HTMLテンプレート（5種：watchピル/watchアイコン/interestアイコン/interestピル/check-in）・サイズモディファイア表・SVG禁止パターン・ダーク対応の詳細：`docs/component-html.md`「watch / interest / check-in ボタン（完成定義）」を Read で参照。**
- 必須ルール（要点）：
  - **`handleAction(this,'watch'|'interest')` 経由を徹底**。`onclick="this.classList.toggle('on')"` は禁止（ゲスト判定・tip 更新が動かない）。p3/p4 ヒーローウォッチのみ pages.js の `addEventListener` で管理し inline onclick を付けない
  - ライトパネルの SVG は **必ず `opacity=".3"` + `class="wi-inner"`**（`.45` / `wi-dark` はダーク専用）。`<use href=… color=…>` は CSS を上書きするため禁止
  - check-in は `openCheckinModal()`、CTAピルの interest は id `p{ページID}InterestBtn`
  - Auth modal は `common.js` の `_inject()` が自動注入（各HTMLへの記述不要）
  - **完了トーストは共有 `KTN.action.handle` が `ACTION_TOAST`（action→{on,off} 汎用文言）で自動発火する。ページ個別に `KTN.toast(...)` を書かない**（固有名入りトーストも禁止＝共有 handle は対象を判定しないため全パス汎用文言に統一）。ヒーロー等 inline onclick を付けない同期ハンドラは自前で `KTN.toast` を呼ぶが、文言は `ACTION_TOAST` と同一にする。`showToast` は同一メッセージ400ms以内の重複を無視する。ウォッチ同期セレクタ（`[data-action="watch"]`）は関連人物カード（`.cc`/`.gc`/`.uc`）を `.closest()` で除外し、別エンティティのウォッチをページオーナーと同期させない

---

### 全ページ共通：ページ遷移アクションボタン（`.ktn-action-btn`）

ページ遷移を伴う文脈的アクションに使う小型アウトラインボタン。ピル型の `.ktn-btn`（watch/follow 等）・操作系の `.ktn-op-btn` とは別系統。

**v3 大原則：塗りつぶし（solid）＝「その場で実行される操作」専用（`.ktn-op-btn` 系のみ）。ナビゲーション（`.ktn-action-btn` 系）は要対応状態でも常にアウトライン＋赤ドットに留め、hover でのみ塗る。** solid 赤は `ktn-op-btn--danger` に予約し、ナビと操作を形で見分けられるようにする。

**記号ルール（v3.1 確定）：**
- **末尾「 →」**：ページ遷移する `ktn-action-btn` には**必ず**付ける。テキスト「 →」で統一し、SVG矢印は使わない
- **先頭「●」**：「遷移先に要対応の取引がある」通知サイン。`--alert` / `--alert-dark` / `:has()` 要対応状態で CSS（`::before`）が自動付与。HTML に手で書かない
- 要対応ナビの完全形＝「● ラベル →」／通常ナビ＝「ラベル →」
- 矢印なし＝遷移しない（その場で実行 or モーダルを開く）。カラー帯内の操作トリガー（myコレクションへ等）は `--ghost` を共用するが矢印を付けず機能アイコンを付ける

**基本クラス：`.ktn-action-btn`**（Montserrat 600・0.75rem・`padding: 4px 12px`）。モディファイア＝無印（通常ナビ）/`--alert`（要対応・赤枠＋●）/`--alert-dark`・`--dark`（ダーク背景上）/`--ghost`（有色帯の中のみ）。要アクション行は `:has()` で自動 alert 化（例 `.p315-apply-row:has(.p315-apply-status--stock) .ktn-action-btn`）。

**各モディファイアの色値・HTML記述例は `docs/component-html.md`「ボタン2系統の詳細」を参照。**

---

### 全ページ共通：操作ボタン（`.ktn-op-btn`）

モーダル確認・大型CTA・管理コンソール操作に使う共通ボタン。ナビ系の `.ktn-action-btn` とは別系統。

**基本クラス：`.ktn-op-btn`**（`font-family:inherit`・0.78rem・`padding: 9px 20px`）。モディファイア＝無印（キャンセル/閉じる）/`--primary`（主アクション・**全ページ固定ブランド青 `var(--accent)` #005da7**＝ロール非依存で「青＝実行」を学習させる）/`--danger`（破壊操作・solid赤）/`--caution`（慎重操作・コッパー`#8b5e3c`・`disabled` 属性で自動グレーアウト）/`--danger-outline`（破壊のソフトトリガー・赤枠→確認モーダルで確定）。サイズ＝無印/`--lg`（大型CTA）/`--sm`（コンソール）。

**色値の全表・サイズ表・`--primary` 固定青の理由・モーダル配置HTMLサンプル・取引ステータスバッジ（`.p515-status__badge`）の詳細は `docs/component-html.md`「ボタン2系統の詳細」を参照。**

**横並び時の関係ルール（v3 確定・全ボタン系共通・canonical）：**
- 1行（1ボタン列）に**色付きボタンは1つまで**。主アクション以外はアウトラインに落とす
- モーダル・送信バーでは**主アクションを右端**、キャンセル系を左に置く
- 同じ性質の操作は同じ見た目：実行系＝solid（`--primary`/`--danger`/`--caution`）／遷移系＝アウトライン＋末尾 →（`.ktn-action-btn`）／破壊系ソフトトリガー＝赤枠・記号なし（`--danger-outline`）
- 並列の破壊操作（会場売約済＋出品取消など）は**両方とも `--danger-outline`** にし、確認モーダル側の実行ボタンで solid を使う
- 詳細デモ：`kotennavi_buttons_v2.html`

### 全ページ共通：ガイド参照リンク（`.ktn-guide-link`）

ガイド・関連ページへの軽い参照テキストリンク（ボタンではない）。canonical は `kotennavi-common.css`、デモ・規約は `kotennavi_typography.html` セクション10②。

- **文字色はブランド青 `#005da7`**（`--accent` ＝ロゴ `kotennavi-logo3.svg` と同色／hover `#004a85`）。下線＋`text-underline-offset:2px`。確定ボタン（`.ktn-op-btn--primary` `#1a4a88`）とは**別色**＝「実行ボタン」と「参照リンク」を色で区別する。
- **サイズは文脈継承**（font-size を持たない）。本文中は本文サイズ、ヘッド補足の `.ktn-mgmt-head__guides` 内は `.75rem`。
- 末尾に半角空白＋`→` をテキストで付ける（SVG矢印は使わない）。
- 使用例：取引デスク（p3-16/p4-16）・取引ワークスペース（p5-15）・LIAISON+コンソール（p3-15/p4-15）のヘッド補足リンク、本文中の他ガイド参照。
- 旧 `.p315-ops-guide__more`（赤）は本クラスに統一済み。新規のガイド参照は必ず `.ktn-guide-link` を使う（色のハードコード禁止）。

### 全ページ共通：必須マーカー（`.ktn-req`）

フォームの必須入力項目を示すラベル末尾マーカー。canonical は `kotennavi-common.css`（`.ktn-txn-help__field-label` 付近）、デモは `kotennavi_typography.html`「フォームラベル」行。

- **書き方：** ラベルテキスト直後に `<span class="ktn-req">必須</span>` を置く（前に半角スペースは入れない／`margin-left:5px` が間隔を持つ）。
- **仕様：** `margin-left:5px; font-family:var(--fn); font-size:.7rem; font-weight:500; color:#b43c14; letter-spacing:.04em`（エディトリアル赤）。
- **適用済み：** 取引4ページの問い合わせモーダル（ご相談内容）／取引デスク（p3-16・p4-16）の発送フォーム・追跡番号フォーム／配送先フォーム（p5-15）の受取人氏名・フリガナ・住所・電話番号。
- **「（必須）」「`*`」など旧表記は使わない**（色のハードコードも禁止）。任意項目は従来どおりラベル内に「（任意）」と書く。
- **注意：** p2-11 の `.p211-req`（`*` アスタリスク＋JSバリデーション）は自己完結した既存システムのため本パスでは未統合。将来のフォーム整備時に `.ktn-req` へ寄せるか検討。

### 全ページ共通：トグルスイッチ（`.ktn-switch`）

on/off の2状態を切り替える汎用トグルスイッチ。canonical は `kotennavi-common.css`（`.ktn-switch` ブロック・2026-07-20 新設）。HTMLテンプレートは `docs/component-html.md`「トグルスイッチ」を参照。

- **構造：** `button.ktn-switch[.is-on] > span.ktn-switch__track > span.ktn-switch__knob` ＋ `span.ktn-switch__label`。`role="switch"` と `aria-checked` を必ず併記し、JS でクラス・aria・ラベルテキストを同時にトグルする。
- **on 色は `var(--page-accent)`**（ロール連動：p3系=creator青緑／p5系=user桃…）。色のハードコード禁止。off はトラック `#c9c4bc`・ラベル `var(--muted)`。
- **ラベルは状態テキスト**（「公開中」「非公開」等）を on/off で書き換える。ラベル無し運用はしない（状態が色だけになるため）。
- **適用済み：** p3-14（作品の公開/非公開 `.p314-pub-sw`）／p5-4（コレクションルームの公開/非公開 `.p54-vis-sw`）。ページ側フッククラスは位置調整（`flex-shrink` 等）のみに使い、**見た目のCSSをページ側に再定義しない**。
- 新規ページはHTMLをコピーするだけでよい（ページ個別CSS不要）。「その場で実行される操作」だが押しボタンではなく**状態の切替**である場合にこれを使う（実行系は `.ktn-op-btn`）。
- React 変換：`<Switch checked onChange label={{on,off}}>`。

### 全ページ共通：フォーム保存エラーパネル（`.ktn-form-error`）

編集・管理ページの**保存ボタン押下時バリデーションエラー**の共通表示。canonical は `kotennavi-common.css`（`.ktn-listqr__url` 直後・`.ktn-guide-link` の前）。HTMLテンプレートは `docs/component-html.md`「フォーム保存エラーパネル」を参照。

- **配置＝フォームアクション（保存/キャンセル）直上の固定位置に常設**。トースト（消えるメッセージ）でバリデーションエラーを出すのは禁止（旧p2-11方式は廃止済み）。パネルは次の保存試行まで残り、成功時に `hidden` で消す。
- **構造**：`__head`（⚠SVG＋タイトル「保存できませんでした」）＋ `__list`＞`__item`（●付き）。項目内は任意で `__detail`（詳細行）／`__hint`（解決ヒント・濃赤）／`__jump`（「該当箇所へ →」ボタン＝`scrollIntoView`）。
- **色は `.ktn-txn-alert` と同じエディトリアル赤系**（bg `#fbeae5` / border `#b43c14` / タイトル `#7a1800`）。canonical を使い、ページ側で色を再定義しない。
- **固有名詞（作品名・展覧会名等）は `__name`（明朝 `--fs`・600）**。フィールドラベル等の機能テキストはゴシックのまま。
- **フィールド側の赤枠強調は併用**（p2-11＝`.p211-field.is-error`／p2-12-1＝`.p2-12-work-card--conflict`）。パネル＝内容の説明、赤枠＝場所の副次サイン、`__jump`＝両者をつなぐ動線。
- **表示は `hidden` 属性トグル**（`.ktn-form-error[hidden]{display:none}` が canonical にあるため class 側の `display:flex` と衝突しない）。パネル根に `role="alert"` を付ける。
- **ページ側CSSは inset の margin のみ**：Model A（`.ktn-mgmt-wrap` 直接子・sticky送信バー直上）＝汎用 `.ktn-mgmt-wrap > .ktn-form-error{margin:20px 20px 16px}` が common 済みで個別CSS不要／セクション枠内に置く場合のみページ側で margin を持つ（例 `.p2-12-liaison-section > .ktn-form-error{margin:20px 16px 0}`）。
- **適用済み**：p2-11（必須未入力＝件数サマリ行＋項目別「該当箇所へ →」）／p2-12-1（販売期間×他展覧会出品の重複＝クロスフィールド検証の実装例）。
- React 変換：`<FormErrorPanel items>`（items=[{message, details[], hint, jumpTarget}]）。

### 全ページ共通：取引期限アラート（`.ktn-txn-alert` / `.p316-action-deadline__soon`）

取引4ページ（p3-16 / p4-16 / p5-15）の**要対応（自分の番＝my-turn）フェーズ**で操作がない場合に出す期限アラート。canonical は `kotennavi-common.css`（`.ktn-days-chip--urgent` 直後 L10787〜）。表示要素は2段階（間近＝`.p316-action-deadline__soon` 赤文字1行／超過・最終警告＝`.ktn-txn-alert` バナー）で、いずれも `.is-on` クラスでトグル（`hidden` 属性は使わない）。

**my-turn フェーズ（このフェーズでのみ出る。相手の番＝waiting では出ない）：** 出品者デスク（p3-16/p4-16）＝`new`（S1）/`paid`（S3）/`confirming`（S5）、購入者デスク（p5-15）＝`payment`（S2）/`receipt`（S4）。

**段階設計の要点（判断軸＝期限到達で状態が自動遷移するか）：** `paid`（S3）＝自動遷移しないので間近→超過（標準2段階）／`new`（S1）・`payment`（S2）＝自動キャンセルで超過状態が画面に出ないため2段階とも期限前（間近→最終警告・チップ「本日中」）／`receipt`（S4）・`confirming`（S5）＝自動確定で影響小のため間近1段階のみ（超過バナーなし）。**相手の番には中立的な「待ち側ナッジ」**（`.p515-status__waiting-nudge`・期限の数字/催促表現を出さない受動形）を出す。

**詳細（段階設計の全表・理由／JS実装 `MY_TURN`・`NO_ESCALATE`・`OVERDUE_CHIP`・`WAITING_NUDGE`・`applyUrgency`／本番 React CSR での期限算出）は `docs/transaction-states.md`「取引期限アラート」を参照。**

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

**管理ページ・取引フローのフォント使い分け（`.mgmt-page` / 取引4ページ）：**

**大原則（2026-07-04 確定）：明朝（`--fs`）は「コンテンツ固有名詞」と「表示系ページの読ませる文章・見出し」に限定する。操作・状態・機能を説明する UI テキストはすべてゴシック（`--fn`）。** 「操作を説明する文字は明朝にしない」を判断軸とする。取引フロー（p3-16 / p4-16 / p5-15）の状態文・手順ラベル・機能サブ見出し・モーダル文言・管理系の見出しは、コンテンツ名ではなく機能テキストなので `--fn`。

- **`--fn`（ゴシック）に寄せる：**
  - UIテキスト・フォームラベル・入力欄・ヘルプテキスト・説明文・ボタンテキスト・ページ見出し（`.ktn-mgmt-head__title`。旧 `.ktn-edit-head__title` / `.p114-service-banner__title` は mgmt-head へ統合済み）
  - 取引フローの**状態文・完了/中断メッセージ・レビュー本文**（`.p515-confirming__title/__desc` / `.p515-done__desc` / `.p515-cancelled__msg` / `.p316-done__desc/__review-text` / `.p316-cancelled__msg`）
  - 取引フローの**機能サブ見出し・手順ラベル**（`.p515-steps__label` / `.p515-log__title` / `.p515-comments__title` / `.p515-delivery__title` / `.p515-review__title` / `.p515-ship-confirm__title` / `.p515-done__title` / `.p316-apply-info__title` / `.p316-ship-form__title` / `.p316-ship-addr__title` / `.p316-review-display__title` / `.p316-done__title`）
  - **操作モーダル文言**（`.p515-modal__title` / `.p515-modal__desc`）＝取引3ページ共有モーダル
- **`--fs`（明朝）を維持：** 作品名・展覧会名・クリエイター名・ギャラリー名・人名（管理画面内に表示される**コンテンツ固有名詞**）。表示系ページの読ませる文章・章見出し。**機能サブ見出しには使わない**（旧 `.ktn-section__title`→`--fs` の一律例外は撤回。管理・取引フロー内の機能見出しは `--fn`。コンテンツ名を表示する見出しのみ `--fs`）。
- `font-family: inherit` のボタン（`.ktn-op-btn` 等）は `body` の `--fn` を自動継承
- 参照：`kotennavi_typography.html` セクション 8

**Tier 3（2026-07-04 確定・ナビ／図中ラベル系）：** 機能ナビ・図中ラベルは `--fn`（ゴシック）に揃える。ただし**コンテンツ固有名詞を表示する要素は明朝を維持**（大原則どおり）。
- **`--fn` に変更済み：** フッターリンク（`.ktn-footer__links a`＝利用規約・お問い合わせ等のサイトナビ）／パンくず現在地（`.ktn-bc__current`＝ナビchrome。先祖リンク `.ktn-bc__link` は既に body 継承で `--fn` のため、末尾だけ明朝の不統一を解消）／P70 フロー図の手順・終端ラベル（`.p70-flow-diagram__action` / `.p70-flow-diagram__end`＝申込・購入確定・支払…／取引完了＝取引ステップ名。Tier 2 の `.p515-steps__label` と同じ機能ラベル扱い）。
- **`--fs`（明朝）を維持：** タブナビ名（`.p3-tabnav__name` / `.p5-tabnav__name`＝クリエイター名・ギャラリー名・ユーザー名の**固有名詞**）。ヒーロー見出し `.p3-head__name` / `.p4-head__name` / `.p5-head__name`（すべて `--fs`）と**同一の名前**を表示するため、ゴシック化すると同ページ内で人名が2フォントに割れる。固有名詞＝明朝の原則どおり据え置く。
- **タブナビ項目（`.pN-tabnav__item` / `.p2-subnav__item`）は本スイープ対象外**：エディトリアル v2 で意図的に Shippori Mincho（サブナビ設計）としており、今回は変更しない（将来ナビ全体の方針を見直す際に別途判断）。

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
<span class="p2-side-nearby__title">近くの展覧会<span class="ktn-sec-en">Nearby</span></span>
```
- セパレーターなし・同一行インライン（ダッシュは使わない）
- `DM Serif Display` は `common.css` の `@import` で全ページ読込済み

**新パターン確定時の手順：** typography.html でルールを決めたら、同様に CLAUDE.md のこのセクションに追記する。これにより将来のセッションでも一貫して適用される。
- 旧クラス `.p2-ic__head-en` / `.p2-1-section__en` 等は `ktn-sec-en` に統一済み（common.css に `/* → .ktn-sec-en に統一済み */` コメントあり）

- CSS変数は `:root` に定義済み。フォント変更は変数1箇所を変えるだけで全ページに反映される
- `Cormorant Garamond` は common.css 先頭の `@import` で全ページに読込済み
- `Cinzel` は各 HTML の Google Fonts `<link>` で読込済み
- 既存の `.p3-head__en` `.p4-head__en` `.p2-title-band__sub` `.p6-hero__title-en` `.p315-page-head__en` もすべて変数参照に統一済み

---

### ページ別確定仕様・コンポーネントHTMLテンプレート

作業対象に応じて Read tool で参照：

| 参照先 | 内容 |
|---|---|
| `docs/page-specs.md` | P2/P3/P4/P70/P3-15/コンテンツ下部エリア の確定仕様 |
| `docs/component-html.md` | `.aw` / `.p25c` / `.p2-side-ec` / `.ec` コンポーネントHTML、watch / interest / check-in ボタン完成定義 |
| `docs/badge-system.md` | バッジ形状ボキャブラリー・色パレット枠分け・各カテゴリ詳細HTML/バリアント・新規追加手順（4原則とカテゴリ一覧は CLAUDE.md 側が canonical） |
| `docs/transaction-states.md` | 取引状態の付随ルール・状態strip書式・取引期限アラートの段階設計/JS実装（状態名テーブルとページ呼称は CLAUDE.md 側が canonical） |

---

## レイアウト共通値（リファクタリング参照）

CSS 変数として `:root` に定義済み。他ページ整備時は `var()` で参照し、意図的に値を変える場合のみローカルで上書きする。

| 変数 | 値 | 意味 | 適用済みページ |
|---|---|---|---|
| `--col-gap` | `20px` | 2カラムレイアウトのカラム間隔 | p2・p2-1〜4 |
| `--hero-gap` | `20px` | ヒーロー下端→コンテンツエリア上端の間隔 | p2 |

**未変数化（全ページ完成後に検討）**
- `.ktn-content` の `padding: 24px 20px`（左右20px＝カードと画面端の隙間）

---

## 参照ドキュメント
- `docs/` フォルダ内を参照
- リエゾンサービス仕様書（06_リエゾン_サービス仕様書.md）
- サイトマップ（sitemap.md）
