# ページ別確定仕様

このファイルは `CLAUDE.md` の詳細ページ仕様を分離したものです。
作業対象ページに応じて Read tool で参照してください。

> **2026-10-08 に全体を今の実装（common.css・各 HTML・pages.js）と突き合わせて書き直した。**
> 値が CLAUDE.md と食い違うときは CLAUDE.md が正。CSS の値は「最後に効いているもの」を書いている（common.css には同じクラスの古い定義が前の方に残っているものがあり、後ろの editorial v2・P70 Refinement のブロックが上書きしている）。

---

### ガイド・記事ページ（P70）

モデルページ：`kotennavi-p70-2.html`（LIAISON+ 作品販売ガイド）。見た目は common.css の **「P70 Refinement — Editorial / Museum Publication」** ブロックが最終値（大型章番号・罫線中心・塗り背景なし・行間広め）。その前にある素の定義は上書きされている。

#### body・ページ構造

- body：`data-w="article"` ＋ `p70-page p70-{n}-page`（`mgmt-page` / `p3/p4/p5-page` は**付けない**）
- **タイトルバンド（`.p70-title-band`）**：`<main>` の外側・`ktn-header` 直後。白背景・下線。LIAISON+ 系のガイドは `.p70-title-band--dark`（濃紺のグラデーション帯）
  - `.p70-title-band__inner`：`max-width: var(--w-article)`・padding `84px 20px 64px`（540px 以下 `60px 20px 44px`）
- **本文（`.p70-wrap`）**：`<main>` 内・`max-width: var(--w-article); padding: 28px 20px 60px`

#### タイトルバンド内の構成順とフォント

| 順 | 要素 | クラス | 値 |
|---|---|---|---|
| 1 | バッジ・制定日行 | `.p70-head__sub` | h1 の**上**。下余白 18px |
| 2 | 日本語タイトル | `.p70-head__title` | `--fs` 600・`2.6rem`（540px 以下 `1.8rem`）・行間 1.22・字間 -.005em |
| 3 | 英語ラベル | `.p70-head__en` | Cinzel・`.68rem`・字間 .18em・大文字・muted。h1 の**下** |
| 4 | リード文 | `.p70-head__lead` | `--fn`・`.88rem`・行間 2.0・ink（opacity .78） |

#### 章見出し（h2）

```html
<div class="p70-section__head">
  <span class="p70-section__num">2</span>
  <h2 class="p70-section__title">会場連動販売の仕組み</h2>
  <span class="p70-section__en">Venue-First Design</span>
</div>
```

| 要素 | 値 |
|---|---|
| `.p70-section__head` | 下に 1px の罫線（`--border`） |
| `.p70-section__num` | Bodoni Moda `1.7rem`（540px 以下 `1.3rem`）・ink の opacity .35 |
| `.p70-section__title` | `--fs` 600・`1.4rem`（540px 以下 `1.15rem`） |
| `.p70-section__en` | DM Serif Display italic `.85rem` muted。540px 以下は非表示 |

#### 本文・コンテンツ要素

| 要素 | クラス | 値 |
|---|---|---|
| 段落本文 | `.p70-body` | `--fn` `.86rem` 行間 2.0 |
| callout | `.p70-callout` | 塗りなし・左 2px 線のみ。`--venue`＝`#2a5f7a`／`--fee`＝`#b87c10`／無印＝`--accent` |
| callout 本文 | `.p70-callout__body` | `--fn` `.82rem` 行間 1.95 |
| DL 用語 | `.p70-dl__dt` | Cinzel `.6rem` 大文字 muted（英語の小ラベル用）。和文の項目名は `.p70-dl--ja`（`--fn` `.8rem`） |
| DL 説明 | `.p70-dl__dd` | `--fn` `.84rem` 行間 1.95 |
| FAQ の Q | `summary::before` | Bodoni Moda の「Q」を丸枠（`--accent`）で |
| FAQ 本文 | `.p70-faq-item__body` | `--fn` `.84rem` 行間 1.95 |
| 目次リンク | `.p70-toc__link` | `--fs` `.88rem` ink（hover で `--accent`） |
| 目次の番号 | `.p70-toc__num` | Bodoni Moda `.95rem` muted |

**ガイドの本文（`.p70-body`・callout・FAQ）に `--fs`（明朝）を使わない。** ガイドは操作の説明なので `--fn`。明朝は章タイトル・ページタイトル・目次リンク（見出しの一覧）だけ。フロー図の手順ラベルも `--fn`（CLAUDE.md「Tier 3」）。

#### パンくず

common.js の `PAGES` に登録（例：`'p70-2': { n:'…', bc:[['Top','/'],['LIAISON','/p70'],['リエゾンプラス-作品販売ガイド',null]] }`）。

#### `scroll-margin-top`

各セクション（`.p70-section`）に `scroll-margin-top: calc(var(--dh,0px) + var(--hh,50px) + 16px)`。アンカー（`#venue-priority` 等）でヘッダーに隠れずジャンプする。

---

### P2（展覧会）

#### 情報カード（`.p2-ic`）

左カラムの主要セクションと、右カラムの見出し付きの枠は `.p2-ic` を使う（P3 のトップの各セクションも `.p2-ic.ktn-csec` を流用。P4 は `.p4-box`）。

| 要素 | クラス | 値 |
|---|---|---|
| ラッパー | `.p2-ic` | 白・1px 枠・角丸 4px |
| ヘッダー | `.p2-ic__head` | padding `20px 28px` |
| ボディ | `.p2-ic__body` | padding `8px 28px 24px` |

- 折りたたみ：`is-open` で本文を表示。ヘッダーに `onclick="p2ToggleIc(id)"`
- 常に開いたまま：`is-open` を静的に付け、`onclick` なし。右カラムの見出し付き枠は `.p2-side-contact__head`（padding `16px 24px`）など専用クラスで `cursor:default`
- 旧 `.p2-ic__head-icon`（丸背景のアイコン）は使っていない

#### 右カラム

| パターン | クラス | 値 | 用途 |
|---|---|---|---|
| 見出し付きの枠 | `.p2-ic.is-open.p2-side-contact` 等 | 上の `.p2-ic` | 投稿者・お問合わせ／リンク |
| 見出しなしのカード | `.p2-side-card` | padding `24px`（p3〜p5 の `-side-card` と共通） | 興味あり！の枠・近くの展覧会など |

#### 見出しの段階

| 段階 | クラス | 値 | 用途 |
|---|---|---|---|
| 1（本文） | `.p2-ic__head-title` | `--fs` 700 `1.25rem`（540px 以下 `1.1rem`） | 左カラムの章見出し |
| 1（サイド） | `.p2-side-card .p2-ic__head-title` / `.p2-side-nearby__title` / `.p3〜p5-side-card__title` | `--fs` 600 `.95rem` | 右カラムの見出し（本文より一段小さく） |
| 2 | `.p2-about__label` / `.p2-article-head__ttl` / `.p2-ext-links__label` / `.p2-contact__sublabel` | Cinzel 600 `.66rem` 大文字 ink 字間 .18em | 見出しの中の小区分。`.p2-about__label` は右に細い罫線 |

- 英語サブは `.ktn-sec-en` を同じ行に（例：`スケジュール<span class="ktn-sec-en">Schedule</span>`）。サイドの見出しの中では Cinzel `.58rem`
- 旧「段階3」（`.54rem` の posted-by ラベル）は廃止

#### P2-1 スケジュール：行の opacity の注意点

過去の日程の行など「沈める」行に `opacity` を当てるとき、**行そのものに `opacity` を付けない**。行の中のボタンまで薄くなって見えにくくなる。

```css
/* NG：行全体に opacity → ボタンまで薄くなる */
.p2-1-cal-row--past { opacity: .42; }

/* OK：沈めたい子要素だけ */
.p2-1-cal-row--past .p2-1-cal-row__date,
.p2-1-cal-row--past .p2-1-cal-row__status,
.p2-1-cal-row--past .p2-1-cal-row__badges { opacity: .42; }
/* ボタン（.p2-1-cal-row__checkin）には当てない */
```

カレンダー・申込の一覧・取引の行など、「行を無効にしつつボタンは残す」場面すべてに当てはまる。

---

### P3・P4 共通

#### ヒーローとアバター

- ヒーロー（`.p3-head` / `.p4-head`）：白・**枠線と角丸なし**・左に 3px のロール色の縦線（CLAUDE.md「表示系ヒーローの外枠・共通化ルール」）
- アバター：クリエイター＝**角丸 12px**、ギャラリー＝**角丸 4px**（CLAUDE.md「ユーザー種別アバター形状」と同じ）。大きさ 84px（**スマホでも 84px**＝2026-10-08 にユーザーが確認して確定。効いていなかった 680px 以下の 56px の指定は削除。P5 のアバターはスマホで 56px）
- 下層ページ（-1・-2・-3）のヒーローは `.p3-head--compact`（P4 も同じクラスを流用）：padding `16px var(--hero-pad-x)`・アバター 48px・名前 `1.3rem`・自己紹介文は出さない。アバターと名前は上位ページへのリンク

#### タブナビ

- P3：[クリエイター名] | 展覧会 作品 記事 クリエイター情報（展覧会・作品・記事は P3-1・P3-3・P3-2 へのリンク、クリエイター情報は P3 内の `#p3-sec-profile` へ）
- P4：[ギャラリー名] | 展覧会 記事 ギャラリー情報（P4 のタブも `.p3-tabnav__item` を流用）
- 名前（`.p3-tabnav__name` / `.p4-tabnav__name`）：`max-width:160px` で省略（…）、**680px 以下は非表示**。文字は `__name-text` で包む
- タブの上の NEW の印は、そのタブの中に新着があるときだけ（CLAUDE.md「新着と NEW の印」）

#### レイアウト（トップ・下層とも2カラム）

- `.p3-layout`：`1fr 300px` の2カラム（P4 も同じクラス）。右カラム `.p3-layout__side` は sticky（860px 以下で1カラム・static）
- **下層ページ（-1・-2・-3）も右カラムを持つ**（旧「1カラム」は誤り）
- 右カラムの中身：
  - P3：記事（最新）→「アートの展覧会」（このクリエイターの作品と同じジャンルの展覧会・距離なし）→ 広告
  - P4：記事（最新）→「近くの展覧会」（距離あり）→ 広告
  - ウォッチのボタンはヒーローにある（右カラムには置かない）

### P3（クリエイタートップ）

左カラムに `.p2-ic.ktn-csec` のセクションを縦に並べる（旧 `.p3-box`・`.p3-prof-main`・`.p3-prof-side` の構成は廃止し、CSS も 2026-10-08 に削除）。

- **展覧会（`#p3-sec-exhibitions`）**：開催中→これから開催の順。末尾にアーカイブへのリンク（`.p3-archive-link`）
- **作品（`#p3-sec-works`）**：`.p3-works-masonry`（JS で生成）。LIAISON／LIAISON+ の展覧会があるときは展覧会ごとの帯（`.p3-works-liaison-band`）を出す（並び：LIAISON+ 開催中→LIAISON+ これから→LIAISON 開催中→LIAISON これから）
- **クリエイター情報（`#p3-sec-profile`）**：名前→略歴＋画像→ジャンル→作品ブランド→取扱ギャラリー・店舗→アトリエ→リンク→掲載日・最終更新
  - 略歴＋画像：画像は右に float（幅 38%・4:3）、0枚なら略歴が全幅。メイン画像＋サムネイル（クリックで切替）
  - リンク：アイコンだけの 40×40px ボタン（SimpleIcons の CDN・JS で生成）。対応：HP/Behance/ArtStation/Instagram/X/Facebook/Threads/Bluesky/Pinterest/TikTok/YouTube/note/Substack/BASE/minne/Creema/STORES/Etsy/Shopify/BOOTH/pixiv/iichi/Linktree/lit.link

### P3-1（展覧会アーカイブ）

- フィルター：年・開催地（都道府県）・個展/グループ展（AND）。ID は `p3FilterYear` / `p3FilterPref` / `p3FilterType`
- グループ：開催中→これから開催→過去の展覧会（年ごとの `details` で折りたたみ・`summary::before` を `rotate(90deg)`）
- **過去のカードは通常の `.ec.ec--h` のまま（半透明・グレーにしない）**。過去であることはグループ見出し「過去の展覧会」（`.p3-1-glbl--past`）と年ごとの折りたたみで示す。旧 `.ec--h--past`（opacity .65・grayscale）は 2026-06-27 に廃止（P4-1 も同じ）

### P3-2（記事一覧）

- フィルター：投稿先・カテゴリ・年（AND）。ID は `p3FilterDest` / `p3FilterCategory` / `p3FilterYear`
- カード：`.lc.lc--article`（横長のリスト型）。展覧会に紐づく記事には展覧会名のリンク
- data 属性：`data-dest` / `data-category` / `data-year`

### P3-3（作品一覧）

- フィルター：展示状況（LIAISON+ 出品中／LIAISON 出品中／ポートフォリオ作品）・年（AND）。ID は `p3FilterLiaison` / `p3FilterYear`（旧「販売状態・ジャンル」のフィルターは無い）
- カード：`.aw` を `.p3-3-grid`（flex の3列・600px 以下2列）に並べる（マソンリーではない）
- 並び：LIAISON+ → LIAISON → 通常
- data 属性：`data-liaison` / `data-status` / `data-year`

### P4（ギャラリートップ）

- 左カラムのセクションは **`.p4-box.ktn-csec`**（白・1px 枠・角丸 4px・padding 28px。P3 は `.p2-ic.ktn-csec` に移ったが P4 は旧来の箱のまま＝**P3 と P4 で箱が違う**。そろえるかはデザイン確定時に判断）。右カラムは上の「レイアウト」
- **ギャラリー情報（`#p4-sec-profile`）**：ギャラリー名→略歴＋画像→取扱ジャンル→ギャラリー情報→地図・アクセス→利用案内→リンク→掲載日・最終更新
  - スペースの種類：ギャラリー／美術館／その他
  - 地図：Google マップ・経路を調べるの2ボタン。現在地からの距離は `navigator.geolocation`
  - 利用案内のバッジ：`.p4-prof-facility-badge--on` / `--off`（on はロール色）
  - リンク：P3 と同じ 24 種

### P4-1・P4-2

- P3 の下層ページと同じ HTML の構造
- フィルターの ID は `p4Filter` で始まる（P4-1＝`p4FilterYear` / `p4FilterPref` / `p4FilterType`、P4-2＝`p4FilterYear` ほか）

---

### P3-15／P4-15（LIAISON+ コンソール）

- body：`p3-15-page p3-page mgmt-page`（P4-15 は `p4-15-page p4-page mgmt-page`）。管理ボックス（`.ktn-mgmt-wrap.ktn-mgmt-stack`）＋上に identity strip（CLAUDE.md「管理ページの identity strip」「管理ボックス共通パターン」）
- ヘッド（`.ktn-mgmt-head`）：「リエゾン+コンソール」＋ガイドへのリンク（会場優先について／取引の進め方・困ったとき）。その下に販売代金管理（P3-17／P4-17）への枠 `.p315-related-link`
- **3つのタブ**（`.p315-tab-btn`・件数は `ktn-count--pill`）：
  1. **期間中展覧会**：要対応の取引の絞り込み（`.p315-urgent-filter`）→ 操作の説明（`.p315-ops-guide`）→ 展覧会ごとの枠（`.p315-exh-block`＝見出し `.p315-exh-head`〔名前・会場・会期・状態〕＋出品の集計 `.p315-works-summary`＋作品の行 `.p315-witem`）
  2. **終了した展覧会**：`.p315-archive-block`（結果の集計 `.p315-archive-result`）
  3. **購入者一覧**：表（`.p315-archive-table`）・並べ替え
- 作品ごとの操作「会場売約済」「出品取消」は確認モーダルで実行（どちらも `--danger-outline`・CLAUDE.md「横並び時の関係ルール」）
- **よくある質問**（`.p315-faq`）：タブの外・常に表示。本文は `KTN.QA`（liaison-txn／seller／console）から描画（P4-15 と同じ元）
- 取引の状態名・期限・アラートは CLAUDE.md「LIAISON+ 取引状態名」と `docs/transaction-states.md`

---

### P5-3／P5-4：オーナー側の事情で見られなくなったコンテンツ（2026-09-27 確定）

利用者が「興味あり！」した作品・記事や、コレクションに入れた作品が、オーナー（クリエイター／ギャラリー）の操作や退会で見られなくなった場合の扱い。**P5-3 と P5-4 で扱いが違う**のは、ページの性格が違うため。

| ページ | 対象 | 見られなくなる原因 | 扱い |
|---|---|---|---|
| P5-3 my 興味あり！ | 作品・記事 | オーナーが非公開にした／削除した／オーナーが退会した（退会すると記事・作品は非公開になる） | **一覧に出さない**。タブの件数（作品 N・記事 N）もそれを除いた数。 |
| P5-4 コレクションルーム | 作品 | オーナーが非公開にした／オーナーがギャラリーで非出品になった／オーナーが退会した | **カードは残す**。カードを押しても作品ページへ遷移せず、理由をトーストで出す。 |

- **P5-3 で消す理由**：興味あり！は「これから見に行きたい・気になる」リスト。見られない項目が並んでいても、利用者は何もできない。
- **P5-4 で残す理由**：コレクションは**購入した作品の記録**。利用者は実物を持っており、購入の記録（作品名・作者・展覧会・購入日）は作者側の事情と関係なく残すべき。
- **P5-3 の「興味あり！」の登録は消さない**：表示から外すだけ。オーナーが**非公開を公開に戻せば再び表示**される。削除・退会は戻らない。
- **展覧会は対象外**：退会後も展覧会は掲載され続ける（P5-100 の仕様）ため、P5-3 の展覧会タブには影響しない。
- **P5-4 のトースト文言**（`P54_NA_MSG`）：**理由に関係なく、すべて「この作品は現在出品者が非公開にしたため、作品ページを表示できません。」**。退会を知らせない（入退会を繰り返す人がいるため）ことから退会を非公開と同じ文言にし、それに合わせて非出品もそろえた。主語は「出品者」（作者・ギャラリーのどちらにも当てはまり、退会かどうかは分からない）。`data-work-status` の区別（unpublished／unlisted／withdrawn）は内部の記録・集計用に残す。
- **実装（本番）**：P5-3 はサーバー側で除外して返す。P5-4 は作品の公開状態・出品状態・オーナーの在籍状態からカードに `data-work-status`（`unpublished`／`unlisted`／`withdrawn`）を付け、クリック時に遷移を止めてトースト。プロトタイプでは P5-4 のみデモバー「作品ページ：表示できない作品あり」で再現（P5-3 は静的データのため再現していない）。
- 他のユーザーが P5-4 を見る場合も同じ扱い。

---

### 全表示ページ共通：コンテンツ下部エリア

ページコンテンツ（`ktn-content`）の下のエリアは**コンテンツから独立**し、ページ固有の幅（`--w-page`）を使わず**一律 `--w-entity`（1080px）**（広告帯の中身だけ `--w-index`＝同じ 1080px）。P2・P3・P4・P6・P7 で同じ並び。

#### 並び順

```
</main>
↓ ① ktn-ad-band（広告・728×90）
↓ ktn-related-band（関連情報の見出し＝このページが何の関連情報かを示す）
↓ ktn-sub-tags（タグ）
↓ ktn-sub-rec（おすすめ：P2・P7＝展覧会／P3＝クリエイター／P4＝ギャラリー／P6＝作品）
↓ ② ktn-ad-band（広告）
```

右カラムがあるページ（P2・P3・P4）は、右カラムの末尾にも広告 `.p2-side-ad`（300×250・`min-height:160px`）。

#### 関連情報の見出し（`.ktn-related-band`）

```html
<div class="ktn-related-band">
  <div class="ktn-related-band__inner">
    <h2 class="ktn-related-band__heading">関連情報<span class="ktn-sec-en">Related</span></h2>
    <div class="ktn-related-band__ctx">
      <span class="cb cb-content cb-exhibition">exhibition</span>
      <a href="#p2Hero" class="ktn-related-band__link">あなたが知らないオノマトペ</a>
    </div>
  </div>
</div>
```

- 上に 2px の ink の線（関連・回遊ゾーンの印・CLAUDE.md「関連・回遊ゾーン」）・背景なし・padding `30px 24px 16px`
- 見出し：`--fs` 600 `.95rem`。英語サブは Cinzel `.58rem`（ダッシュは入れない）
- ページの種類に合わせてバッジ（`cb-exhibition` / `cb-creator` / `cb-gallery` / `cb-work` 等）を替える。リンクはページ先頭への `#アンカー`
- 旧名 `p2-related-band` / `p2-sub-tags` / `p2-sub-rec` / `p6-sub-tags` / `p6-rec-section` は使わない

#### タグ（`.ktn-sub-tags`）・おすすめ（`.ktn-sub-rec`）

- タグ：ラベル「タグ · Tags」（`.ktn-sub-tags__label`）＋ `.ktn-tag-pills`（折り返し）。padding `14px 24px 20px`
- おすすめ：`.ktn-section__head`（見出し＋「もっと見る →」）＋カード。padding `8px 24px 36px`
- おすすめのクリエイター／ギャラリー（P3・P4）：`.ktn-sub-rec` の中の `.masonry`（`columns: 4 200px`・540px 以下2列）
- 860px 以下は左右 padding 16px
- `ktn-related-band` / `ktn-sub-tags` / `ktn-sub-rec` は `width:100%` ＋ `max-width:var(--w-entity)` ＋ `margin:0 auto`。親が縦の flex のとき `width:100%` が無いと中央寄せに見える

#### おすすめの展覧会カード（`buildGridEcCard(e)`・pages.js）

- 4件・マソンリーのグリッド
- ポスター：`ec__poster-noimg`（`min-height: e.imgH px`）＋ `ec__poster-overlay`
- ポスターのメタ行（`ec__poster-meta`）：`ec__remain[--live|--soon]` ＋ 営業時間 ＋ 距離。本日休み（`e.closedToday`）のときは時間の位置に「本日休み」
- バッジ行：`cb-exhibition` ＋ 開催ステータス（`sb-live` / `sb-soon` / `sb-ending`）。LIAISON のバッジはここに置かず下の帯で出す
- LIAISON の帯（`ec__liaison-strip` / `--plus`）：バッジ＋説明＋展示作品のサムネイル3枚。`ec__foot` の後
- データ：`title`, `venue`, `bg`, `s`, `e`, `imgH`, `status`, `remain`, `hours`, `closedToday`, `dist`, `liaison`, `int`, `ci`, `thumbs[]`
