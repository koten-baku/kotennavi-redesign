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

## 後工程引き継ぎログのルール（`docs/handoff-decisions.md`）
- 後工程（React SSR / Drupal 改修）のための **追記式（append-only）決定ログ**。**捕捉は決定時、構造化は後**の原則で、完成後にまとめて作らない（抜け漏れ防止）。
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
| **関連・回遊ゾーン** | 右カラム末尾：`.p2-side-nearby`（p2/p6）/ `.p3-side-rel-exh`（p3 アートの展覧会）/ `.p4-side-rel-exh`（p4 アートの展覧会）　＋　ページ下部：`.ktn-related-band` / `.ktn-sub-tags` / `.ktn-sub-rec` | **背景は通常（transparent）・上部 2px ink アクセントラインのみで識別**。色を多用せず、ラインで他コンテンツと区別 |
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

### 表示系ページ見出しの基準

| 種別 | font-size | font-weight | letter-spacing |
|---|---|---|---|
| ヒーロー大見出し（`.p3-head__name` 等） | `2.1rem` | `600` | `.005em` |
| 下位ページ見出し（`.p2-{n}-page-head__title`） | `1.55rem` | `600` | `.005em` |
| 章見出し（`.ktn-section__title`） | `1.1rem` | `600` | `.02em` |
| カードタイトル（`.ec__title` `.aw__title`） | `.93rem` | `600` | `.01em` |
| ヒーロー英サブ（`.p3-head__en` 等） | `.95rem` | `500` italic | `.04em` |

**`font-weight: 800` は装飾的用途（ポスタープレースホルダー、アバターイニシャル、SOLDリボン等）のみで使用。本文系・見出し系は最大でも 700、通常は 600。**

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
**状態名は出品者側・購入者側で同一の客観名を使う。「誰の番か」は状態名に含めず、ターンラベル（「あなたの操作が必要」「出品者の発送待ち」等）と色で表現する。**

| # | フェーズ | 正式状態名 | アクション側 | 廃止した旧呼称 |
|---|---|---|---|---|
| S1 | 申込受付 → 購入確定 | 購入確定待ち | 出品者 | 在庫確認待ち / 在庫確認回答待ち / 申込中 |
| S2 | 購入確定 → 支払 | 支払待ち | 購入者 | 購入者支払待ち |
| S3 | 支払 → 発送 | 発送待ち | 出品者 | 支払完了（バッジ名として） |
| S4 | 発送 → 受取確認 | 受取確認待ち | 購入者 | — |
| S5 | 受取確認 → 完了確認 | 完了確認待ち | 出品者 | 取引完了確認待ち |
| F1 | 終了（正常） | 取引完了 | — | — |
| F2 | 終了（中断） | キャンセル済 | — | — |

**付随ルール：**
- ステップノードラベル（6段階・両側共通）：申込 / 購入確定 / 支払 / 発送 / 受取確認 / 完了確認（行為名・「待ち」を付けない）
- ログイベント名：購入申込受付 / 購入確定・送料確定 / 支払い完了 / 発送完了 / 受取確認・評価入力 / 取引完了確認 / 申込キャンセル
- 期限の呼称：S1=確定期限 / S2=支払期限 / S3=発送期限 / S4・S5=確認期限（「取引期限」は使わない）
- 確定期限のルール：実会場優先のため **会期終了3日後または申込3日後の遅い方**（「申込から7日以内」は誤り・使用禁止）
- 発送期限のルール：展示作品は会期終了後の引渡しが多いため **会期終了後7日または支払後7日の遅い方**（「支払いから14日以内」は誤り・使用禁止）
- 「在庫確認」は状態名としては使わない。操作説明の動詞句としてのみ使用可（例：「会場在庫を確認して購入を確定してください」）
- キュー待ち中（順番がまだ来ていない購入者）も「購入確定待ち」に統合し、キュー順位（「1番目／全2人」等）を補足表示する

**状態strip（`.p515-status__head`）の書式（取引4ページ共通・p3-16/p4-16/p5-15）：**
- レイアウト＝`[状態バッジ][ターンラベル]` を左寄せ、`一つ前の終了日時（.p515-status__deadline）` を右寄せ（`margin-left:auto`）。DOM順は バッジ→ターンラベル→日時で統一。
- **色は「誰の番か（ターン）」で決まる**：strip背景・状態バッジ・ターンラベルの3要素を同色で付与。`.p515-status--my-turn`＝ページアクセント（p3インクブルー/p4コッパー/p5ピンク）、`.p515-status--waiting`＝グレー。状態の違いはバッジ文言が担い、色では区別しない。
- **ターンラベル（`.p316-turn-label`）は背景なし**（色付きテキスト＋アイコンのみ）。バッジは塗り、ターンラベルは非塗りで役割を区別。
- 状態別バッジ色（`--new/confirmed/paid/shipped/confirming`）は持たせない（ターン色が上書き）。終端のみ `--done`（緑）/`--cancelled`（グレー）が個別色。
- 「一つ前の終了日時」＝S1:申込 / S2:確定 / S3:支払 / S4:発送 / S5:受取確認 / 完了・キャンセル:その確定日。

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

### 形状ボキャブラリー（新規追加時の選択肢）

新規バッジカテゴリを追加する際は、以下から既存と被らない形を選ぶ：

| 形 | 視覚 | 用途例 |
|---|---|---|
| ソリッド塗り | 塗りつぶし + 白文字 | アイデンティティ（人物・組織） |
| 左罫線+淡背景 | 左に縦アクセント線 | 種別・カテゴリ |
| dot + ラベル | 先頭に色付きドット | 時間軸ステータス |
| 外枠チップ | 細枠線 + 淡背景 | 機能ステータス |
| 円形 | 丸い + 内側ドット | ブランドマーク |
| ロゴ画像 | SVGロゴそのまま | 商標 |
| **空き枠 1** | アイコン+ラベル（icon prefix） | （将来：認証・承認系？） |
| **空き枠 2** | 二重線・装飾枠 | （将来：受賞・特集系？） |
| **空き枠 3** | グラデーション塗り | （将来：プレミアム系？） |

新規バッジは必ず既存カテゴリと **形** が違うこと。色だけ違うのは禁止（混乱の原因）。

### 色パレットの枠分け

色の競合を避けるため、カテゴリごとに使用する色相を制限：

| カテゴリ | 使用可能な色相 |
|---|---|
| `.cb-person` | インクブルー `#2a5f7a` / コッパー `#8b5e3c` / ピンク `#b8608c` |
| `.cb-content` | ロゴブルー `#005da7` / フォレストグリーン `#2e7a4e` / パープル `#6b46a8` / アンバー `#b86a10` / ウォームレッド `#c0392b` |
| `.sb-*` | 深緑 `#2a8838` / ニュートラル青 `#4a7090` / 濃い青 `#1a4a88` / 赤橙 `#c8501c` |
| `.aws-*` | 深緑 `#1a7a3d` / アンバー `#a06010` / グレー `#4b5563` / テラコッタ `#9a4f2f` / ライトグレー `#8a8a8a` |
| `.lb-*` | ロゴブルー `#005da7` / ゴールド `#b87c10` |

**緑系・青系・アンバー系は複数カテゴリで使われる**ため、必ず form で区別すること。

### 共通仕様（全カテゴリの基本値）

- font-family: `'Cinzel', serif`（`.lb-dot` のみ Montserrat）
- font-weight: `600`
- text-transform: `uppercase`
- letter-spacing: `.14em`
- line-height: `1`
- white-space: `nowrap`

### 各カテゴリの詳細

#### `.cb-person`（人物バッジ）
- 用途：creator / gallery / user の識別
- 形：ソリッド塗り + 角丸3px、白文字
- HTML：`<span class="cb cb-person cb-creator">creator</span>` または `<span class="cb cb-creator">creator</span>`（**`cb-person` は省略可**。canonical のセレクタ列挙でバリアント単体でも同じ表示）
- バリアント：
  - `.cb-creator` background `#2a5f7a`
  - `.cb-gallery` background `#8b5e3c`
  - `.cb-user` background `#b8608c`
- ダーク背景：明度UP色（`#5a8fa8` / `#b8895e` / `#e8a0c8`）に切替

#### `.cb-content`（コンテンツバッジ）
- 用途：exhibition / article / artwork / review / news の種別表示
- 形：左罫線 2.5px + 右側角丸3px + 種別色8%背景
- HTML：`<span class="cb cb-content cb-exhibition">exhibition</span>` または `<span class="cb cb-exhibition">exhibition</span>`（**`cb-content` は省略可**）
- バリアント：
  - `.cb-exhibition` color `#005da7`（ブルー）
  - `.cb-article` color `#2e7a4e`（フォレストグリーン）
  - `.cb-artwork` color `#6b46a8`（パープル）
  - `.cb-review` color `#b86a10`（アンバー）
  - `.cb-news` color `#c0392b`（ウォームレッド）

#### `.sb-*`（開催ステータス）
- 用途：展覧会の時間軸（開催中 / 開催前 / もうすぐ開始 / もうすぐ終了 / 終了）
- 形：先頭に色付きドット（::before）+ ラベルのみ、チップ枠なし
- HTML：`<span class="sb sb-live">開催中</span>`（内側ドット要素は不要、自動で ::before が描画）
- バリアント：
  - `.sb-live`（`.sb-open` も同義のレガシーエイリアス） color `#2a8838` — pulse 動作（行動を待つ状態）
  - `.sb-upcoming` color `#4a7090`
  - `.sb-soon` color `#1a4a88`
  - `.sb-ending` color `#c8501c` — pulse 動作
  - `.sb-closed` color `var(--muted)`
- canonical：`kotennavi-common.css` L1285

#### `.aws-*`（販売ステータス）
- 用途：作品の取引可能状態（販売中 / 商談中 / 売約済 / 要問合せ / 非売品）
- 形：細枠線チップ + 5%淡背景。販売中のみ先頭に pulse ドット
- HTML：`<span class="aws aws-sale">販売中</span>`
- バリアント：
  - `.aws-sale` color `#1a7a3d` — pulse ドット付き（取引可）
  - `.aws-negot` color `#a06010`（アンバー）
  - `.aws-sold` color `#4b5563`（グレー）
  - `.aws-inquiry` color `#9a4f2f`（テラコッタ）
  - `.aws-nsale` color `#8a8a8a`（最も静かな状態・背景透明）
- 申込件数併記：`.aw__queue`（`.aw__foot` 内・価格と同行の左側）
- canonical：`kotennavi-common.css` L2196

#### `.lb-*`（LIAISON ブランドマーク）
- 用途：LIAISON / LIAISON+ サービスの識別
- ブランド資産のため**他バッジと異なるフォント（Montserrat または Bodoni Moda）**を許容
- バリアント：
  - `.lb-pill` — 横長ロゴバッジ（白背景+影+SVGロゴ）
  - `.lb-pill.plus` — LIAISON+ ゴールド枠線
  - `.lb-circle` — 円形ロゴバッジ（サイズ sz-sm/md/lg）
  - `.lb-dot.li` / `.lb-dot.li-plus` — ピル型インジケーター（先頭に点滅ドット + LIAISON/LIAISON+ テキスト）
- canonical：`.lb-pill` L1372、`.lb-dot` L1489、`.lb-circle` L1395

### 重複定義の禁止
過去に `.cb` 6箇所、`.sb` 4箇所、`.lb-dot` 3箇所、`.lb-pill` 2箇所の重複定義が存在し、CSS cascade で意図しない上書きを引き起こしていた。**全て canonical 1箇所に統合済み**。新規ルールは canonical へ追加すること。`kotennavi-components.css` への重複も禁止。

### 新規バッジカテゴリ追加時の手順

1. **既存カテゴリで表現できないか確認**（無駄な分割を避ける）
2. **形状ボキャブラリーから「未使用の形」を選ぶ**（色だけ違う追加は禁止）
3. **色パレットの枠分けに新カラムを追加**（既存カテゴリと色相が被らないように）
4. **canonical を `kotennavi-common.css` の適切な位置に追加**（既存4カテゴリ近辺）
5. **共通仕様（Cinzel uppercase / weight 600 / letter-spacing .14em / line-height 1）を遵守**
6. **CLAUDE.md の本セクションに新カテゴリを追記**
7. **デモHTML（`kotennavi_badges_*.html`）に追加**

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

---

### 全ページ共通：watch / interest / check-in ボタン（完成定義）

> **新規ページでページ個別の CSS は一切追加しない。** 以下の HTML をそのままコピーするだけで common.css の共通定義が自動適用される。

---

#### 1. watch ボタン（ピル型 `.ktn-btn`）— クリエイター・ギャラリー用

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

#### 2. watch ボタン（アイコン型 `.ktn-icon-btn`）— 展覧会・作品・記事用

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

#### 3. interest ボタン（アイコン型 `.ktn-icon-btn`）— 展覧会・作品・記事用

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

#### 4. interest ボタン（ピル型 `.ktn-btn`）— CTA ウィジェット用

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

#### 5. check-in ボタン（ピル型 `.ktn-btn--lg`）

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

#### 共通ルール

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

### 全ページ共通：ページ遷移アクションボタン（`.ktn-action-btn`）

ページ遷移を伴う文脈的アクションに使う小型アウトラインボタン。ピル型の `.ktn-btn`（watch/follow 等）・操作系の `.ktn-op-btn` とは別系統。

**v3 大原則：塗りつぶし（solid）＝「その場で実行される操作」専用（`.ktn-op-btn` 系のみ）。ナビゲーション（`.ktn-action-btn` 系）は要対応状態でも常にアウトライン＋赤ドットに留め、hover でのみ塗る。** solid 赤は `ktn-op-btn--danger` に予約し、ナビと操作を形で見分けられるようにする。

**記号ルール（v3.1 確定）：**
- **末尾「 →」**：ページ遷移する `ktn-action-btn` には**必ず**付ける。テキスト「 →」で統一し、SVG矢印は使わない
- **先頭「●」**：「遷移先に要対応の取引がある」通知サイン。`--alert` / `--alert-dark` / `:has()` 要対応状態で CSS（`::before`）が自動付与。HTML に手で書かない
- 要対応ナビの完全形＝「● ラベル →」／通常ナビ＝「ラベル →」
- 矢印なし＝遷移しない（その場で実行 or モーダルを開く）。カラー帯内の操作トリガー（myコレクションへ等）は `--ghost` を共用するが矢印を付けず機能アイコンを付ける

**基本クラス：`.ktn-action-btn`**（Montserrat 600・0.75rem・`border-radius: 4px`・`padding: 4px 12px`）

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

---

### 全ページ共通：操作ボタン（`.ktn-op-btn`）

モーダル確認・大型CTA・管理コンソール操作に使う共通ボタン。ナビ系の `.ktn-action-btn` とは別系統。

**基本クラス：`.ktn-op-btn`**（`font-family:inherit`・0.78rem・`border-radius: 4px`・`padding: 9px 20px`）

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

**`--caution` の disabled 状態：**
- HTML に `disabled` 属性を付けるだけで `opacity:.4; cursor:not-allowed` が自動適用される

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

**横並び時の関係ルール（v3 確定・全ボタン系共通）：**
- 1行（1ボタン列）に**色付きボタンは1つまで**。主アクション以外はアウトラインに落とす
- モーダル・送信バーでは**主アクションを右端**、キャンセル系を左に置く
- 同じ性質の操作は同じ見た目：実行系＝solid（`--primary`/`--danger`/`--caution`）／遷移系＝アウトライン＋末尾 →（`.ktn-action-btn`）／破壊系ソフトトリガー＝赤枠・記号なし（`--danger-outline`）
- 並列の破壊操作（会場売約済＋出品取消など）は**両方とも `--danger-outline`** にし、確認モーダル側の実行ボタンで solid を使う
- 詳細デモ：`kotennavi_buttons_v2.html`

**取引ステータスバッジ（取引4ページ共通・`.p515-status__badge`）：**
- 定義：**先頭ドット（`::before`）＋淡色塗り・枠線なし・矢印なし**。クリック不可・hover変化なし
- ボタンとの見分け：ボタン＝「枠線＋白/透明背景（遷移なら末尾 →）」／バッジ＝「塗り＋ドット・枠なし」
- 破壊トリガー（赤枠・記号なし）と要対応ナビ（赤枠・●＋→）はどちらも赤枠だが記号で区別する
- 状態別カラークラス（`--new`/`--paid`/`--shipped`/`--confirming`/`--done`/`--cancelled` 等）は p316/p515 プレフィックスのまま共用。デモ：`kotennavi_buttons_v2.html` セクション5

### 全ページ共通：ガイド参照リンク（`.ktn-guide-link`）

ガイド・関連ページへの軽い参照テキストリンク（ボタンではない）。canonical は `kotennavi-common.css`、デモ・規約は `kotennavi_typography.html` セクション10②。

- **文字色はブランド青 `#005da7`**（`--accent` ＝ロゴ `kotennavi-logo3.svg` と同色／hover `#004a85`）。下線＋`text-underline-offset:2px`。確定ボタン（`.ktn-op-btn--primary` `#1a4a88`）とは**別色**＝「実行ボタン」と「参照リンク」を色で区別する。
- **サイズは文脈継承**（font-size を持たない）。本文中は本文サイズ、ヘッド補足の `.ktn-mgmt-head__guides` 内は `.75rem`。
- 末尾に半角空白＋`→` をテキストで付ける（SVG矢印は使わない）。
- 使用例：取引デスク（p3-16/p4-16/p5-15）・LIAISON+コンソール（p3-15/p4-15）のヘッド補足リンク、本文中の他ガイド参照。
- 旧 `.p315-ops-guide__more`（赤）は本クラスに統一済み。新規のガイド参照は必ず `.ktn-guide-link` を使う（色のハードコード禁止）。

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

**管理ページのフォント使い分け（`.mgmt-page`）：**
- UIテキスト・フォームラベル・入力欄・ヘルプテキスト・説明文・ボタンテキスト・ページ見出し（`.ktn-edit-head__title`）→ `--fn`（管理系全般のデフォルト）
- セクション見出し（`.ktn-section__title`）・作品名・展覧会名・クリエイター名・ギャラリー名 → `--fs`（管理画面内に表示されるコンテンツ情報は引き続き `--fs`）
- `font-family: inherit` のボタン（`.ktn-op-btn` 等）は `body` の `--fn` を自動継承
- 参照：`kotennavi_typography.html` セクション 8

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
| `docs/component-html.md` | `.aw` / `.p25c` / `.p2-side-ec` / `.ec` コンポーネントHTML |

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
