# ページ別確定仕様

このファイルは `CLAUDE.md` の詳細ページ仕様を分離したものです。
作業対象ページに応じて Read tool で参照してください。

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
- ポスターメタ行（`ec__poster-meta`）：`ec__remain[--live|--soon]` + `|` + 営業時間 + `|` + 距離（本日休み＝`e.closedToday` の場合は時間の位置に「本日休み」を表示。残り日数バッジは通常どおり。旧 `--closed` グレー枠線バッジは2026-07-08廃止）
- バッジ行（`ec__body ec__badge-row`）：`cb-exhibition` + ステータスバッジ（`sb-live` / `sb-soon` / `sb-ending`）— LIAISONバッジはここに置かず下記ストリップで表示
- LIAISON帯（`ec__liaison-strip` / `ec__liaison-strip--plus`）：`ec__liaison-strip-info`（バッジ＋サブテキスト）+ `ec__liaison-thumbs`（展示作品サムネイル3枚）— `ec__foot` の後に配置
- データフィールド：`title`, `venue`（`ec__venue-sep` で都道府県と会場名を区切る）, `bg`, `s`, `e`, `imgH`, `status`, `remain`, `hours`, `closedToday`, `dist`, `liaison`, `int`, `ci`, `thumbs[]`

### おすすめクリエイター/ギャラリー（Gエリア）
- ktn-content外・全幅・`background: var(--paper)`
- P3・P3-3・P4：`.masonry`（`columns: 4 260px`）・540px以下で2列
- P3-1・P3-2・P4-1・P4-2：`display: grid`・`repeat(3,1fr)`・540px以下で2列
