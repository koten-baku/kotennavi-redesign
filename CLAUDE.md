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

| 販売価格 | 手数料率 | 実質マージン（国内カード目安） |
|---|---|---|
| 〜 29,999円 | 10% | 約 6.4% |
| 30,000円〜 | 8% | 約 4.4% |

- Stripe手数料：国内発行カード 3.6% / 海外発行カード 3.9%（税抜・手数料に内包）
- 手数料発生タイミング：決済完了時のみ（キュー待ち中キャンセルは発生しない）
- 振込：月次・翌月末払い予定・振込手数料は個展なびが負担
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
- ktn-header は `position: sticky; top: var(--dh)` で dbar の直下に貼り付く
- モバイル（≤540px）で `.ktn-bc { flex: 0 0 100% }` が効き2行になると実際の高さが `--hh`（初期50px）を超える
- `KTN.init` の `_syncHH()` がレンダリング後に実測してCSS変数を更新するため、スティッキー要素の `top` は自動修正される
- ヘッダー高さに依存する CSS は **必ず `var(--hh)` を参照**し、ピクセル値をハードコードしない

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

<!-- ON 状態（初期値がウォッチ済みの場合） -->
<button class="ktn-btn on" data-off="watch" data-on="watching" data-action="watch"
  onclick="handleAction(this,'watch');event.preventDefault()">
  <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
    <circle cx="8" cy="8" r="7" fill="#7a8a99" opacity=".3"/>
    <circle class="wi-inner" cx="8" cy="8" r="2.6"/>
  </svg>
  watching<span class="tip">ウォッチを解除する</span>
</button>
```

**適用コンテキスト：** クリエイターカード（`.cc`）、ギャラリーカード（`.gc`）、p2 出展者カード、p3/p4 サイドCTA ウィジェット  
**OFF/ON 色は CSS が自動管理：** `.ktn-btn` / `.ktn-btn.on` の共通定義が適用される。SVG の `fill="#7a8a99"` は OFF 時の初期値。ON 時は `circle:first-child` ルールが `#3a90e0` に上書き。

---

#### 2. interest ボタン（アイコン型 `.ktn-icon-btn`）— 展覧会・作品・記事用

```html
<!-- OFF 状態 -->
<button class="ktn-icon-btn" data-action="interest"
  onclick="handleAction(this,'interest');event.preventDefault()">
  <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
    <path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"
      fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/>
  </svg>
  <span class="tip">興味ある！に追加する</span>
</button>

<!-- ON 状態（初期値が興味あり済みの場合） -->
<button class="ktn-icon-btn on" data-action="interest"
  onclick="handleAction(this,'interest');event.preventDefault()">
  <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
    <path d="M8 13.2C7.6 12.9 1.5 9 1.5 5.5a3.1 3.1 0 0 1 6.5-.55 3.1 3.1 0 0 1 6.5.55C14.5 9 8.4 12.9 8 13.2z"
      fill="#7a8a99" fill-opacity=".3" stroke="#7a8a99" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/>
  </svg>
  <span class="tip">興味ある！を解除する</span>
</button>
```

**適用コンテキスト：** 展覧会カード（`.ec`）、作品カード（`.aw`・`.p25c`）、記事カード、p2 サイドカード  
**ON 時の SVG 色は CSS が管理：** `[data-action="interest"].on svg path { fill:#3a90e0; stroke:#3a90e0 }` がグローバル定義済み。HTML の SVG 属性は変更不要。  
**ツールチップ：** `.ec` 内では上向き・右端揃えに自動反転（`overflow:hidden` 対応済み）

---

#### 3. interest ボタン（ピル型 `.ktn-btn`）— CTA ウィジェット用

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

#### 4. check-in ボタン（ピル型 `.ktn-btn--lg`）

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

**サイズモディファイア：**

| モディファイア | font-size | padding | SVG | 用途 |
|---|---|---|---|---|
| （なし） | `0.75rem` | `7px 16px` | `15px` | カード内インライン |
| `.p2aw-item` 内自動 | `0.88rem` | `7px 22px` | `17px` | 右カラム CTA（クラス変更不要） |
| `--lg` | `1.1rem` | `14px 28px` | `20px` | 日本語CTA（チェックイン等） |

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
| `--primary` | 主アクション（申込確定・支払い・受取確認など） | solid `#1a4a88`・白文字（固定・ロール非依存） | `opacity:.88` |
| `--danger` | 確定的な破壊操作（取引キャンセルなど） | solid 赤 `#b43c14` | `opacity:.88` |
| `--caution` | 慎重さを要す操作（問い合わせる など。※会場売約済の確定は v3 で `--danger` に変更） | solid `#8b5e3c`（ギャラリーコッパー）・白文字 | `opacity:.88` |
| `--danger-outline` | 破壊操作のソフトトリガー（会場売約済・出品取消・申込キャンセルなど。押すと確認モーダルが開き、確定はモーダル側 `--danger`） | 赤枠 `rgba(180,60,20,.5)`・赤文字 `#b43c14`・白背景（※v3.1でグレー枠から格上げ） | 赤枠濃く・淡赤背景 |

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

### ガイド・記事ページ（P70）タイポグラフィ確定仕様

モデルページ：`kotennavi-p70-2.html`（LIAISON+ 作品販売ガイド）。詳細デモ：`kotennavi_typography.html` セクション 9。

#### body・ページ構造

- body クラス：`p70-page`（`mgmt-page` / `p3/p4/p5-page` は**付けない**）
- **タイトルバンド（`.p70-title-band`）**：`<main>` の外側・`ktn-header` 直後に配置。白背景・下線のみ
  - `.p70-title-band__inner`：`max-width: var(--w-article); padding: 36px 20px 28px`
- **本文（`.p70-wrap`）**：`<main>` 内・`max-width: var(--w-article); padding: 28px 20px 60px`

#### タイトルバンド内の構成順とフォント

**p3-15（`ktn-mgmt-head`）と同パターン：バッジ行 → 日本語 h1 → EN サブ（下）→ リード文**

| 順 | 要素 | クラス | フォント | サイズ | 備考 |
|---|---|---|---|---|---|
| 1 | バッジ・制定日行 | `.p70-head__sub` | badge + `.p70-head__updated`（`--fn` `.7rem` muted） | — | h1 の**上**に配置 |
| 2 | 日本語タイトル | `.p70-head__title` | `--fs`（Shippori Mincho）700 | `2rem / lh1.2 / margin:0 0 3px` | 「作品販売ガイド」のみ。サービス名は下の EN に |
| 3 | EN 機能ラベル | `.p70-head__en` | `--font-en-label`（Cinzel）| `.72rem / letter-spacing:.06em / color:var(--muted)` | h1 の**下**に配置。全ページ共通色（ページ種別で変えない） |
| 4 | リード文 | `.p70-head__lead` | `--fn`（Zen Kaku Gothic New）| `.82rem / muted` | ガイドはUI説明文カテゴリ → `--fn`（`--fs` ではない） |

#### 章見出し（h2）構成

```html
<div class="p70-section__head">
  <span class="p70-section__num">2</span>          <!-- --fm 600 .78rem muted -->
  <h2 class="p70-section__title">会場連動販売の仕組み</h2>   <!-- --fs 700 1.05rem -->
  <span class="p70-section__en">Venue-First Design</span>  <!-- DM Serif Display italic .78rem muted -->
</div>
```

- `.p70-section__en` は `ktn-sec-en` と同体系（DM Serif Display italic）。ただし flex 右端配置のため別クラスを使う
- モバイル（≤540px）では `.p70-section__en` を非表示

#### 本文・コンテンツ要素のフォント

| 要素 | クラス | フォント | 理由 |
|---|---|---|---|
| 段落本文 | `.p70-body` | `--fn` `.84rem lh1.9` | ガイド＝操作説明＝UIカテゴリ。`--fs` は不可 |
| callout 本文 | `.p70-callout__body` | `--fn` `.8rem lh1.8` | 同上 |
| DL 用語 | `.p70-dl__dt` | `--fn` 600 `.72rem` | ラベル系 |
| DL 説明 | `.p70-dl__dd` | `--fn` `.78rem lh1.7` | 同上 |
| FAQ Q | `summary::before` | `--fm`（Montserrat）600 | 記号・英字 |
| FAQ 本文 | `.p70-faq-item__body` | `--fn` `.8rem lh1.8` | 操作説明 |
| 目次リンク | `.p70-toc__link` | 継承（`--fn`）| `.8rem var(--accent)` |
| 章番号 | `.p70-toc__num` | `--fm` | `.7rem muted` |

**最重要ルール：ガイド本文（`.p70-body`）に `--fs`（Shippori Mincho）を使わない。**  
`--fs` は「展覧会説明・略歴・作品について・読ませる文章」専用。ガイド・操作手順・FAQ は `--fn`。  
例外：章タイトル（`.p70-section__title`）・ページタイトル（`.p70-head__title`）はコンテンツ見出しとして `--fs` を使う。

#### callout バリアント

| クラス | 左ボーダー色 | 背景 | 用途 |
|---|---|---|---|
| `.p70-callout` | `var(--accent)` #005da7 | `#fff` | 一般的な補足情報 |
| `.p70-callout--venue` | `#2a5f7a` インクブルー | `rgba(42,95,122,.03)` | 会場優先ポリシー |
| `.p70-callout--fee` | `#8b5e3c` コッパーブラウン | `rgba(139,94,60,.03)` | 手数料・金額情報 |

#### パンくずナビ

標準の `ktn-header` 内に JS レンダリング。`KTN.pages['p70-*'].bc` で設定：
```javascript
bc: [
  { t: 'Top', u: '/' },
  { t: 'ガイド', u: '#' },
  { t: 'LIAISON+ 作品販売ガイド' }
]
```

#### `scroll-margin-top`

各セクション（`.p70-section`）に `scroll-margin-top: calc(var(--dh,0px) + var(--hh,50px) + 16px)` を設定済み。アンカーリンク（`#venue-priority` 等）で正確にジャンプする。

---

### P2（展覧会詳細）確定仕様

#### 左カラム：コンテンツセクション（`.p2-ic`）

情報の折りたたみ・常時展開を問わず、主要セクションは `.p2-ic` 構造を使う。

| 要素 | クラス | padding |
|---|---|---|
| ラッパー | `.p2-ic` | なし（内側で管理） |
| ヘッダー | `.p2-ic__head` | `13px 18px` |
| ボディ | `.p2-ic__body` | `16px 18px` |

- 折りたたみ可能：`is-open` クラスでボディ表示切替・ヘッダーに `onclick="p2ToggleIc(id)"` を付与
- 常時展開（非アコーディオン）：`is-open` を静的に付与し `onclick` なし
- ヘッダーアイコン：`.p2-ic__head-icon`（丸背景28px）＋ SVG 13px

#### 右カラム：サイドセクションのパターン

| パターン | クラス | padding | 用途 |
|---|---|---|---|
| ヘッダーありセクション | `.p2-ic is-open` | head 13px 18px / body 16px 18px | 投稿者・お問合せ / この展覧会 |
| フラットカード | `.p2-side-card` | `16px 18px`（全体） | アクションウィジェット / 近くの展覧会 |

- ヘッダーありは左カラム `.p2-ic` と padding を共有（ヘッダータイトルスタイルも同一）
- `p2-side-card` はヘッダーなし・コンテンツがフラットに並ぶカードに限定
- 非アコーディオンのヘッダーには `.p2-ic__head` を使わず `.p2-side-contact__head` など専用クラスで `cursor:default` を確保

#### セクションタイトル 3段階ルール

| Level | 適用クラス例 | font | size | weight | color | 用途 |
|---|---|---|---|---|---|---|
| 1 | `.p2-ic__head-title` / `.p2-side-nearby__title` | `--fs` | `0.9rem` | `600` | `var(--ink)` | アコーディオン・独立セクション見出し |
| 2 | `.p2-about__label` / `.p2-article-head__ttl` / `.p2-ext-links__label` / `.p2-contact__sublabel` | `--fn` | `0.62rem` | `600` | `var(--muted)` | コンテンツ内サブ区分ラベル |
| 3 | （新規使用禁止） | — | `0.54rem` | — | uppercase + muted | 旧 posted-by / inq ラベル。統合済みにつき使用しない |

- Level 1 には `.ktn-sec-en` で英語サブを同行インライン付与（例：`スケジュール<span class="ktn-sec-en">Schedule</span>`）
- Level 2 にも `.ktn-sec-en` を付与してよい（例：`この展覧会について — <span class="ktn-sec-en">About this exhibition</span>`）
- Level 3 は廃止。右カラムに新しいサブ区分が必要な場合は Level 2 を使う

#### P2-1 スケジュール：行レベル opacity の注意点

過去日程行など「沈める」べき行に `opacity` を適用する場合、**行要素に直接 `opacity` を設定してはならない**。行内にボタン等のインタラクティブ要素がある場合、それも一緒に薄くなって視認性が失われる。

```css
/* NG: 行全体に opacity → ボタンまで薄くなる */
.p2-1-cal-row--past { opacity: .42; }

/* OK: 沈めたい子要素（テキスト・メタ）だけに個別適用 */
.p2-1-cal-row--past .p2-1-cal-row__date,
.p2-1-cal-row--past .p2-1-cal-row__status,
.p2-1-cal-row--past .p2-1-cal-row__badges { opacity: .42; }
/* ボタン（.p2-1-cal-row__checkin）は opacity を当てない */
```

この原則はカレンダー・申込リスト・取引行など「行単位で無効化しつつボタンを残す」すべての場面に適用する。

---

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
- レイアウト：1カラム（右サイドカラムなし）・`--w-entity`

### P3（クリエイタートップ）確定仕様
- ヒーロー（`.p3-head`）：白背景・`max-width: --w-entity`・`border: 1px solid var(--border)`・`border-radius: 4px`
- タブナビ（`.p3-tabnav`）：sticky 位置は共通ルール（「タブナビ・サブナビの sticky 位置」参照）
- タブ構成：[クリエイター名] | 展覧会 作品 記事 クリエイター情報
- 各セクション：`.p3-box`（`background: #fff`・`border: 1px solid var(--border)`・`border-radius: 4px`・`padding: 24px`）
- セクション見出し：`.ktn-section__head` + `.ktn-section__title` + `.ktn-sec-en`（旧 `.p3-sec-label` は廃止済み → `ktn-section__head` に統一）
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

### 全表示ページ共通：コンテンツ下部エリア（確定仕様）

ページコンテンツ（`ktn-content`）の下のエリアは **コンテンツから独立** し、ページ固有幅（`--w-page`）を使わず **一律 `--w-entity`（1080px）** を取る。

#### 広告配置パターン（p2基準・3か所）

| 位置 | クラス | 場所 |
|---|---|---|
| ① | `.ktn-ad-band` | `</main>` 直後・コンテンツ下部の最上段 |
| ② | `.ktn-ad-band` | おすすめセクション（`.ktn-sub-rec`）の下 |
| ③ | `.p2-side-ad` | 右カラム下部（`.p2-side-nearby` の後） |

- `.ktn-ad-band`：横幅フル・`background:var(--warm)`・`min-height:90px`（バナー広告枠）
- `.p2-side-ad`：右カラム内・`background:var(--warm)`・`min-height:160px`（レクタングル広告枠）

#### コンテンツ下部の構成順（p2基準）

```
</main>
↓ ① ktn-ad-band（広告）
↓ ktn-related-band（関連情報ヘッド — ページコンテキスト再提示）
↓ ktn-sub-tags（タグ）
↓ ktn-sub-rec（おすすめ）
↓ ② ktn-ad-band（広告）
↓ [Gエリア — おすすめクリエイター/ギャラリー（将来定義）]
```

#### 関連情報セクション（p2/p3/p4/p6/p7 共通）

関連情報セクション（`.ktn-related-band`・`.ktn-sub-tags`・`.ktn-sub-rec`）は全ページ共通クラス。ページ種別によってバッジとリンク先を切り替えるだけで再利用する。

**クラス名（確定）：**
- `p2-related-band` / `p2-sub-tags` / `p2-sub-rec` / `p6-sub-tags` / `p6-rec-section` は旧名。**使用禁止**
- 正しいクラス名：`ktn-related-band` / `ktn-sub-tags` / `ktn-sub-rec`

#### 関連情報ヘッド（`.ktn-related-band`）

タグ・おすすめセクションの直前に置き、「このページが何の関連情報か」をユーザーとSEOに再提示する帯。

```html
<div class="ktn-related-band">
  <div class="ktn-related-band__inner">
    <h2 class="ktn-related-band__heading">関連情報 — <span class="ktn-sec-en">Related</span></h2>
    <div class="ktn-related-band__ctx">
      <span class="cb cb-content cb-exhibition">exhibition</span>
      <a href="#p2Hero" class="ktn-related-band__link">あなたが知らないオノマトペ</a>
    </div>
  </div>
</div>
```

- `<h2>` にコンテンツタイトルを含める（SEO効果）
- `.ktn-related-band__heading`：`0.9rem`（ページ上部の他セクションラベルと同じ視覚レベル）
- `.ktn-related-band__inner { align-items: flex-start }` — バッジの縦伸び防止
- ページ種別に応じてバッジ（`cb-exhibition` / `cb-creator` / `cb-gallery` / `cb-work` 等）を切り替える
- `ktn-related-band__link` はコンテンツページ先頭への `#anchor` リンク

#### タグセクション（`.ktn-sub-tags`）

- タグピル（`.ktn-tag-pill`）を `.ktn-tag-pills` にまとめ `flex-wrap: wrap` で複数行対応
- ラベル（`.ktn-sub-tags__label`）を先頭に置き「タグ · Tags」と表示

#### セクション幅・間隔一覧

| セクション | クラス | 幅 |
|---|---|---|
| おすすめ（全ページ共通） | `.ktn-sub-rec` | `max-width: var(--w-entity)` |
| タグ（全ページ共通） | `.ktn-sub-tags` | `max-width: var(--w-entity)` |
| おすすめクリエイター/ギャラリー（Gエリア） | 今後定義 | `max-width: var(--w-entity)` |

**セクション間スペース標準（p2基準）：**
- ktn-content下端 → 広告①間の空き：`padding: 0`（広告帯は独立）
- 広告① → ktn-related-band間：`padding-top: 20px`
- ktn-related-band → ktn-sub-tags間：`padding-top: 0`（related-bandがヘッドとして機能）
- ktn-sub-tags → ktn-sub-rec間：`padding-top: 28px`（`.ktn-sub-rec { padding: 28px 24px 0 }` 標準値）
- ktn-content下端 → ktn-sub-tagsの空き（related-bandなし時）：`padding-top: 16px`（`.ktn-sub-tags { padding: 16px 24px 0 }` 準拠）

**左寄せの注意点：**
- `ktn-related-band` / `ktn-sub-tags` / `ktn-sub-rec` は `width: 100%` + `max-width: var(--w-entity)` + `margin: 0 auto` で左寄せを確保する
- 親が `display:flex; flex-direction:column` の場合、`width:100%` がないと `margin:0 auto` が shrink-to-content + center になり視覚的に中央揃えになるため注意

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
