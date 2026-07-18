# バッジ設計システム 詳細仕様

CLAUDE.md「バッジ設計システム（全ページ共通）」の詳細版。**4原則・カテゴリ一覧表・重複禁止ルールは CLAUDE.md 側が canonical**。本ファイルは形状ボキャブラリー・色パレット・各カテゴリの詳細HTML/バリアント・新規追加手順を保持する。

---

## 形状ボキャブラリー（新規追加時の選択肢）

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

---

## 色パレットの枠分け

色の競合を避けるため、カテゴリごとに使用する色相を制限：

| カテゴリ | 使用可能な色相 |
|---|---|
| `.cb-person` | インクブルー `#2a5f7a` / コッパー `#8b5e3c` / ピンク `#b8608c` |
| `.cb-content` | ロゴブルー `#005da7` / フォレストグリーン `#2e7a4e` / パープル `#6b46a8` / アンバー `#b86a10` / ウォームレッド `#c0392b` |
| `.sb-*` | 深緑 `#2a8838` / ニュートラル青 `#4a7090` / 濃い青 `#1a4a88` / 赤橙 `#c8501c` |
| `.aws-*` | 深緑 `#1a7a3d` / アンバー `#a06010` / グレー `#4b5563` / テラコッタ `#9a4f2f` / ライトグレー `#8a8a8a` |
| `.lb-*` | ロゴブルー `#005da7` / ゴールド `#b87c10` |

**緑系・青系・アンバー系は複数カテゴリで使われる**ため、必ず form で区別すること。

---

## 共通仕様（全カテゴリの基本値）

- font-family: `'Cinzel', serif`（`.lb-dot` のみ Montserrat）
- font-weight: `600`
- text-transform: `uppercase`
- letter-spacing: `.14em`
- line-height: `1`
- white-space: `nowrap`

---

## 各カテゴリの詳細

### `.cb-person`（人物バッジ）
- 用途：creator / gallery / user の識別
- 形：ソリッド塗り + 角丸3px、白文字
- HTML：`<span class="cb cb-person cb-creator">creator</span>` または `<span class="cb cb-creator">creator</span>`（**`cb-person` は省略可**。canonical のセレクタ列挙でバリアント単体でも同じ表示）
- バリアント：
  - `.cb-creator` background `#2a5f7a`
  - `.cb-gallery` background `#8b5e3c`
  - `.cb-user` background `#b8608c`
- ダーク背景：明度UP色（`#5a8fa8` / `#b8895e` / `#e8a0c8`）に切替

### `.cb-content`（コンテンツバッジ）
- 用途：exhibition / article / artwork / review / news の種別表示
- 形：左罫線 2.5px + 右側角丸3px + 種別色8%背景
- HTML：`<span class="cb cb-content cb-exhibition">exhibition</span>` または `<span class="cb cb-exhibition">exhibition</span>`（**`cb-content` は省略可**）
- バリアント：
  - `.cb-exhibition` color `#005da7`（ブルー）
  - `.cb-article` color `#2e7a4e`（フォレストグリーン）
  - `.cb-artwork` color `#6b46a8`（パープル）
  - `.cb-review` color `#b86a10`（アンバー）
  - `.cb-news` color `#c0392b`（ウォームレッド）

### `.sb-*`（開催ステータス）
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

### `.aws-*`（販売ステータス）
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

### `.lb-*`（LIAISON ブランドマーク）
- 用途：LIAISON / LIAISON+ サービスの識別
- ブランド資産のため**他バッジと異なるフォント（Montserrat または Bodoni Moda）**を許容
- バリアント：
  - `.lb-pill` — 横長ロゴバッジ（白背景+影+SVGロゴ）
  - `.lb-pill.plus` — LIAISON+ ゴールド枠線
  - `.lb-circle` — 円形ロゴバッジ（サイズ sz-sm/md/lg）
  - `.lb-dot.li` / `.lb-dot.li-plus` — ピル型インジケーター（先頭に点滅ドット + LIAISON/LIAISON+ テキスト）
- canonical：`.lb-pill` L1372、`.lb-dot` L1489、`.lb-circle` L1395

---

## 新規バッジカテゴリ追加時の手順

1. **既存カテゴリで表現できないか確認**（無駄な分割を避ける）
2. **形状ボキャブラリーから「未使用の形」を選ぶ**（色だけ違う追加は禁止）
3. **色パレットの枠分けに新カラムを追加**（既存カテゴリと色相が被らないように）
4. **canonical を `kotennavi-common.css` の適切な位置に追加**（既存4カテゴリ近辺）
5. **共通仕様（Cinzel uppercase / weight 600 / letter-spacing .14em / line-height 1）を遵守**
6. **CLAUDE.md のバッジセクション（カテゴリ一覧表）に新カテゴリを追記**
7. **デモHTML（`kotennavi_badges_*.html`）に追加**
