# バッジ設計システム 詳細仕様

CLAUDE.md「バッジ設計システム（全ページ共通）」の詳細版。**4原則・カテゴリ一覧表・重複禁止ルールは CLAUDE.md 側が canonical**。本ファイルは形状ボキャブラリー・色パレット・各カテゴリの詳細HTML/バリアント・新規追加手順を保持する。

> **2026-10-08 に今の common.css と突き合わせて書き直した。** 行番号はずれるので書かない。定義の場所は「common.css で探す語」で示す。

---

## 形状ボキャブラリー（新規追加時の選択肢）

新規バッジカテゴリを追加する際は、以下から既存と被らない形を選ぶ：

| 形 | 視覚 | 使っているもの |
|---|---|---|
| ソリッド塗り＋角丸3px | 塗りつぶし＋白文字 | 人物（`.cb-person`） |
| 左罫線＋淡背景 | 左に縦アクセント線 | コンテンツ種別（`.cb-content`） |
| 点＋ラベル（枠なし） | 先頭に色付きの点 | 開催ステータス（`.sb-*`） |
| 外枠チップ | 細い枠線＋淡背景 | 販売ステータス（`.aws-*`） |
| 塗りのピル（角丸 20px） | 丸い端の塗り | LIAISON の印（`.lb-dot`） |
| 円形 | 丸いロゴ | LIAISON のロゴ（`.lb-circle`） |
| ロゴ画像 | SVG のロゴそのまま | LIAISON のロゴ（`.lb-pill`） |
| **空き枠 1** | アイコン＋ラベル | （将来：認証・承認系？） |
| **空き枠 2** | 二重線・装飾枠 | （将来：受賞・特集系？） |
| **空き枠 3** | グラデーション塗り | （将来：プレミアム系？） |

新規バッジは必ず既存カテゴリと **形** が違うこと。色だけ違うのは禁止（混乱の原因）。

---

## 色パレットの枠分け

色の競合を避けるため、カテゴリごとに使用する色相を制限：

| カテゴリ | 使用可能な色相 |
|---|---|
| `.cb-person` | インクブルー `#2a5f7a` / コッパー `#8b5e3c` / ピンク `#b8608c`（バリアント未指定の予備 `#506880`） |
| `.cb-content` | ロゴブルー `#005da7` / フォレストグリーン `#2e7a4e` / パープル `#6b46a8` / アンバー `#b86a10` / ウォームレッド `#c0392b` |
| `.sb-*` | 深緑 `#2a8838` / ニュートラル青 `#4a7090` / 濃い青 `#1a4a88` / 赤橙 `#c8501c` |
| `.aws-*` | 深緑 `#1a7a3d` / アンバー `#a06010` / グレー `#4b5563` / テラコッタ `#9a4f2f` / ライトグレー `#8a8a8a` |
| `.lb-*` | ロゴブルー `#005da7` / ゴールド `#b87c10` |

**緑系・青系・アンバー系は複数カテゴリで使われる**ため、必ず form で区別すること。

---

## 共通仕様（4カテゴリの基本値）

`.cb-*`・`.sb-*`・`.aws-*` の基本値：

- font-family: `'Cinzel', serif`
- font-weight: `600`
- text-transform: `uppercase`
- letter-spacing: `.14em`
- line-height: `1`
- white-space: `nowrap`

LIAISON の印（`.lb-dot`）だけは商標のため Montserrat（下記）。

---

## 各カテゴリの詳細

### `.cb-person`（人物バッジ）　探す語：`.cb-creator,`

- 用途：creator / gallery / user の識別
- 形：ソリッド塗り＋角丸 3px・白文字・`.58rem`・padding `3px 9px`
- HTML：`<span class="cb cb-person cb-creator">creator</span>` または `<span class="cb cb-creator">creator</span>`（**`cb-person` は省略可**）
- バリアント：`.cb-creator` `#2a5f7a`／`.cb-gallery` `#8b5e3c`／`.cb-user` `#b8608c`
- ダーク背景（`.dark` / `.p251-dark` / `.p6-dark`）：明るい色（`#5a8fa8` / `#b8895e` / `#e8a0c8`）
- 置く場所は**そのページ・カード自身のタイトルの前だけ**（見出しの飾りや、他の人との関係を示すのに使わない）

### `.cb-content`（コンテンツバッジ）　探す語：`.cb-exhibition,`

- 用途：exhibition / article / artwork / review / news の種別
- 形：左罫線 2.5px ＋ 右側の角丸 3px ＋ 種別色の 8% の背景・`.58rem`
- HTML：`<span class="cb cb-content cb-exhibition">exhibition</span>` または `<span class="cb cb-exhibition">exhibition</span>`（**`cb-content` は省略可**）
- バリアント：`.cb-exhibition` `#005da7`／`.cb-article` `#2e7a4e`／`.cb-artwork` `#6b46a8`／`.cb-review` `#b86a10`／`.cb-news` `#c0392b`
- 管理画面専用：`.cb-normal`（`.cb-article` の緑）／`.cb-abnormal`（`.cb-review` のアンバー）＝P90-9 のメールの正常系・非正常系の区分。新しい色は増やしていない
- ダーク背景（`.dark`）：明るい色（例 `#4da3f5`）

### `.sb-*`（開催ステータス）　探す語：`^.sb{`

- 用途：展覧会の時間軸（開催中／開催前／もうすぐ開始／もうすぐ終了／終了）
- 形：先頭に 7px の点（`::before`）＋ラベル・枠なし・`.58rem`
- HTML：`<span class="sb sb-live">開催中</span>`（点は `::before` が描く。中に点の要素は不要。古い `.pulse`／`.ending-dot` は隠す）
- バリアント：
  - `.sb-live`（`.sb-open` は旧名の別名）`#2a8838` — 点が脈打つ（行動を待つ状態）
  - `.sb-upcoming` `#4a7090`
  - `.sb-soon` `#1a4a88`（CLAUDE.md で例外として許されている濃い青）
  - `.sb-ending` `#c8501c` — 点が脈打つ
  - `.sb-closed` `var(--muted)`
  - `.sb-notice` — クリエイター・ギャラリーのカード（`buildPersonCard`）の「開催中/予定」専用。色は付けず、点が脈打つだけ（2026-09-22）
- ダーク背景：明るい色に切り替え

### `.aws-*`（販売ステータス）　探す語：`^.aws{`

- 用途：作品の取引できる状態（販売中／商談中／売約済／要問合せ／非売品）
- 形：細い枠線（`currentColor`）＋5% の背景・角丸 3px・`.56rem`。販売中だけ先頭に 5px の脈打つ点
- HTML：`<span class="aws aws-sale">販売中</span>`
- バリアント：
  - `.aws-sale` `#1a7a3d` — 点が脈打つ（取引できる）
  - `.aws-negot` `#a06010`
  - `.aws-sold` `#4b5563`（表示は「**売約済**」）
  - `.aws-inquiry` `#9a4f2f`
  - `.aws-nsale` `#8a8a8a`（一番静かな状態・背景なし・枠は薄いグレー）
- 申込の件数は、バッジではなく `.aw__queue`（`.aw__foot` の中・価格と同じ行の左）で出す

### `.lb-*`（LIAISON の印）

- 用途：LIAISON / LIAISON+ のサービスの識別。商標のため、他のバッジと違うフォントを許す
- `.lb-dot`（探す語：`^.lb-dot {`）— 塗りのピル：Montserrat 700 `.5rem`・字間 .1em・角丸 20px・白文字
  - `.lb-dot.li`＝背景 `#005da7`／`.lb-dot.li-plus`＝背景 `#b87c10`
  - HTML：`<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>`。**`.lb-dot-inner` は今は CSS が無く何も描かない**（昔の点滅する点の名残。付けても付けなくても同じ見た目＝今は点も点滅も無い）
- `.lb-pill`（探す語：`^.lb-pill {`）— 横長のロゴ（白背景＋影＋SVG のロゴ）。`.plus`＝ゴールドの枠、`.sm`＝小さい外枠。`.lb-pill-wide` は横に広い版
- `.lb-circle`（探す語：`^.lb-circle {`）— 円形のロゴ。`.plus`、大きさ `sz-sm`（26px）／`sz-md`（34px）／`sz-lg`（44px）

---

## 4カテゴリの外にある「印」（バッジ行に並ぶが、別の規則で動くもの）

| クラス | 何か | 形 | 決まり |
|---|---|---|---|
| `.nb` | NEW（新着） | Montserrat 700 `.44rem`・白文字・赤 `#e8462a` の塗り・角丸 2px | 作品・記事・レビューのカードだけ。バッジ行の先頭。点滅も点も無い（2026-10-07）。基準は CLAUDE.md「新着と NEW の印」。お知らせ一覧の NEW（未読の印）も同じ見た目 |
| `.at` `.at-a`〜`.at-f` | 記事のカテゴリ（P3-2・P4-2・P7） | Montserrat 600 `.44rem`・淡い背景 | a＝レポート／b＝インタビュー／c＝制作日記・ギャラリーノート／d＝お知らせ／e＝ワークショップ・その他 |
| `.ci-badge` | チェックイン済み（レビューの横） | Montserrat `.54rem`・青（`--accent`・opacity .72） | 3つあった定義を 2026-10-08 に1つへまとめた（効いている値は同じ） |
| `.ktn-review-status--*` | 審査・処理の状態（`--new`／`--pending`＝確認中・未処理／`--granted`＝確認済み・処理済・有効／`--returned`＝差し戻し／`--cancelled`） | Montserrat 600 `.6rem`・淡い背景 | 管理画面（P90 系）と myページ の申込の状況。文言はページごと、色の意味は共通 |
| `.p61-role-chip--*` ほか | お知らせ一覧の立場・出どころ・公開予定のチップ | `--fn` `.62rem` | P61 だけで使う |

これらはカテゴリ一覧（CLAUDE.md）の5つとは別。**新しく「印」を足すときは、まず上の5カテゴリかこの表で表せないかを確かめる。**

---

## 新規バッジカテゴリ追加時の手順

1. **既存カテゴリで表現できないか確認**（無駄な分割を避ける）
2. **形状ボキャブラリーから「未使用の形」を選ぶ**（色だけ違う追加は禁止）
3. **色パレットの枠分けに新カラムを追加**（既存カテゴリと色相が被らないように）
4. **canonical を `kotennavi-common.css` の適切な位置に1か所だけ追加**（既存カテゴリの近く）
5. **共通仕様（Cinzel uppercase / weight 600 / letter-spacing .14em / line-height 1）を守る**
6. **CLAUDE.md のバッジセクション（カテゴリ一覧表）に新カテゴリを追記**
7. **デモHTML（`kotennavi_badges_*.html`）に追加**
