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

- 販売フロー：会場優先型（会期中は会場優先→会期終了後に申込順で購入プロセス）
- 作品の販売状態（5種類）：販売中 / 商談中 / 売約済 / 要問合せ / 非売品
- LIAISON+で申込者がいる場合：「販売中」バッジ＋「xx人が申込中」（`.aw__applicants`）をバッジ行に表示

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

## アクセントカラー（ページ別CSS変数）
| ページ | クラス | `--page-accent` |
|---|---|---|
| クリエイター系（P3） | `.p3-page` | `#2a5f7a`（インクブルー） |
| ギャラリー系（P4） | `.p4-page` | `#8b5e3c`（コッパーブラウン） |

---

## 確定済み設計仕様

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

### おすすめクリエイター/ギャラリー（Gエリア）
- ktn-content外・全幅・`background: var(--paper)`
- P3・P3-3・P4：`.masonry`（`columns: 4 260px`）・540px以下で2列
- P3-1・P3-2・P4-1・P4-2：`display: grid`・`repeat(3,1fr)`・540px以下で2列

---

## 参照ドキュメント
- `docs/` フォルダ内を参照
- リエゾンサービス仕様書（06_リエゾン_サービス仕様書.md）
- サイトマップ（sitemap.md）
