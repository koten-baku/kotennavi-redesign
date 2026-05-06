# 個展なび ページ制作指示書

> ページ制作時にこのドキュメントをナレッジとして参照し、  
> 別途指示がない限りここに定めたルールに従うこと。
>
> **参照するナレッジファイルはこのドキュメントのみ。**  
> ナレッジHTMLファイル（cards・badges等）は参照不要。スニペットは §8・§9 に記載済み。

---

## 0. リデザインの目的（最優先原則）

すべてのページは以下の3目的を最大化するよう設計・実装すること。  
機能要件と競合する場合も、この原則を優先して判断する。

| 目的 | 意味 | 主な手段 |
|---|---|---|
| **SEO強化** | 検索エンジンから正しく評価され、集客につなげる | 構造化データ・OGP・意味的HTML |
| **UI/UX最適化** | ユーザーが迷わず目的に到達できる | 明確な導線・ページ内ナビ・CTA |
| **回遊性向上** | 1ページ訪問を複数ページ閲覧につなげる | 関連コンテンツ導線・タグ・推薦 |

---

## 1. ファイル構成（確定）

```
kotennavi-common.css   ← 全CSS（共通 + ページ固有スタイル）
kotennavi-common.js    ← 共通ロジック・データ定義（PAGES・TAGBAR_DEFS）
kotennavi-pages.js     ← ページ固有DOM操作（タブ・モーダル・フィルター等）
各ページ HTML          ← HTML構造のみ。<style> / <script> は原則書かない
```

### 各ファイルの責務

| ファイル | 内容 |
|---|---|
| `common.css` | デザイントークン・共通コンポーネント・ページ固有スタイル（`.p{ID}-` prefix） |
| `common.js` | 状態管理・ヘッダー・サイドバー・タグバー・`PAGES`・`TAGBAR_DEFS`・`KTN.init()` |
| `pages.js` | ページ固有のDOM操作を `KTN.pages['p{ID}'] = function(){}` 形式で定義。`KTN.init()` が自動呼び出し |
| HTML | 構造のみ。読み込み順： `common.css` → HTML本体 → `common.js` → `pages.js` |

### ファイル命名規則

```
kotennavi-{page-id}.html
例: kotennavi-p2-3.html
```

---

## 2. HTMLテンプレート構造

すべてのページで以下の構造を維持すること。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{ページタイトル} — 個展なび</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;800&family=Noto+Sans+JP:wght@300;400;500;700&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="kotennavi-common.css">
</head>
<body>

<div class="ktn-toast" id="ktnToast"></div>

<!-- ═══════ SIDEBAR プレースホルダー ═══════ -->
<div class="dev-ph dev-ph--sidebar"></div>

<div class="shell">
<div class="content-wrap" id="contentWrap">

  <!-- ═══════ HEADER ═══════ -->
  <header class="ktn-header" id="ktnHeader">
    <div class="ktn-header__inner">
      <nav class="ktn-bc" id="ktnBc" aria-label="パンくず"></nav>
      <div class="ktn-hdr-actions" id="ktnActs"><!-- 後工程 --></div>
    </div>
  </header>

  <!-- ═══════ TAGBAR ═══════ -->
  <div class="ktn-tagbar" id="ktnTagbar">
    <div class="ktn-tagbar__inner" id="ktnTagbarInner"></div>
  </div>

  <!-- ═══════ MAIN ═══════ -->
  <main class="ktn-main" id="ktnMain">

    <!-- ヒーロー画像あり（p2・p3・p4・p6・p7・p8・p9等）はここに配置 -->
    <!--
    <div class="ktn-hero">
      <img src="..." alt="..." class="ktn-hero__img">
    </div>
    -->

    <!-- ページ固有コンテンツ -->
    <div class="ktn-content">
      <!-- max-width: var(--w-page); margin: 0 auto; が適用される -->
    </div>

  </main>

  <!-- ═══════ 広告バンド ═══════ -->
  <div class="ktn-ad-band" id="ktnAdBand">
    <div class="ktn-ad-band__inner">
      <div class="ktn-ad-band__slot">広告エリア（728×90 / レスポンシブ）</div>
    </div>
  </div>

  <!-- ═══════ FOOTER プレースホルダー ═══════ -->
  <div class="dev-ph dev-ph--footer"></div>

</div><!-- /content-wrap -->
</div><!-- /shell -->

<!-- ═══════ BOTTOM NAV ═══════ -->
<nav class="ktn-bottom-nav" id="ktnBottomNav">
  <div class="ktn-bottom-nav__inner" id="ktnBottomNavInner"></div>
</nav>

<script src="kotennavi-common.js"></script>
<script src="kotennavi-pages.js"></script>
<script>
  KTN.init({ page: '{page-id}', role: 'guest' });
</script>
</body>
</html>
```

---

## 3. サイドバー・フッターの扱い

各ページ制作時は**プレースホルダー**を使用する。

```html
<!-- サイドバープレースホルダー -->
<div class="dev-ph dev-ph--sidebar"></div>

<!-- フッタープレースホルダー -->
<div class="dev-ph dev-ph--footer"></div>
```

> **本番切替時**：プレースホルダーを `kotennavi_sidebar_footer_v5.html` の実装に差替える。

---

## 4. ヘッダー・タグバーの制作方針

### 4-1. ページ制作時に実装するもの（パンくずのみ）

`common.js` の `PAGES` オブジェクトにパンくずを追加する。

```javascript
'p2-3': {
  n:  '展覧会詳細',
  w:  '--w-detail',
  bc: [
    ['Top',   '/'],
    ['展覧会', '/p2'],
    ['展覧会タイトル', null]   // null = 現在ページ（リンクなし）
  ]
}
```

パンくずに LIAISON バッジを付ける場合は第3要素に `'l'` または `'lp'` を指定：

```javascript
['リエゾンコンソール', null, 'lp']
```

### 4-2. 後工程で一括追加するもの（全ページ完成後）

| 対象 | 内容 |
|---|---|
| ヘッダーアクションボタン | ロール・ページ別のボタン定義を `common.js` に追加 |
| タグバー | `TAGBAR_DEFS` にページ別タグ定義を追加 |

---

## 5. ヒーロー画像のルール

ヒーロー画像を持つページ（p2・p3・p4・p6・p7・p8・p9 等）では、  
`ktn-main` 内の**最上部**に `.ktn-hero` を配置する。

```html
<main class="ktn-main" id="ktnMain">
  <div class="ktn-hero">
    <img src="..." alt="..." class="ktn-hero__img">
  </div>
  <div class="ktn-content">
    <!-- 本文コンテンツ -->
  </div>
</main>
```

ヒーロー有無は §10「ページ一覧」の「ヒーロー」列を参照。

---

## 6. ページ幅・レイアウト

| 変数 | 値 | 用途 |
|---|---|---|
| `--w-article` | 720px | 記事・テキスト・編集フォーム系 |
| `--w-detail` | 1080px | コンテンツ下層（2カラム） |
| `--w-entity` | 1080px | コンテンツトップ（1件のエンティティの表紙ページ。下位ページを持つ） |
| `--w-index` | 1080px | 一覧・検索（複数コンテンツを並べるページ） |

ページ幅は `KTN.init({ page: '{id}' })` から自動設定される。  
コンテンツ本文は `.ktn-content` で包む（`max-width: var(--w-page)` が適用される）。

---

## 7. CSS・JS の共通化ルール

### CSS（`kotennavi-common.css` に集約）

- ページ固有スタイルも **`.p{ID}-` prefix** で `common.css` の末尾に追記
- 各ページ HTML に `<style>` タグは**書かない**

```css
/* ────────────────────────────────
   P2-3 展覧会詳細
──────────────────────────────── */
.p2-3-gallery { ... }
.p2-3-map     { ... }
```

### JS（`kotennavi-pages.js` に集約）

- ページ固有の DOM 操作は `KTN.pages` に登録
- `KTN.init()` が現在ページの関数を自動呼び出し

```javascript
// kotennavi-pages.js
KTN.pages = {
  'p2-3': function() {
    // タブ切替・ギャラリービューワー等
  },
  'p3': function() {
    // ポートフォリオスライダー等
  }
};
```

---

## 8. バッジ スニペット集

> ナレッジHTMLファイルへの参照は不要。以下のスニペットをそのまま使用すること。

### コンテンツタイプバッジ `.cb-`

```html
<!-- 人・組織型（outline） -->
<span class="cb cb-person cb-creator">creator</span>
<span class="cb cb-person cb-gallery">gallery</span>
<span class="cb cb-person cb-user">user</span>

<!-- コンテンツ型（left-border） -->
<span class="cb cb-content cb-exhibition">exhibition</span>
<span class="cb cb-content cb-article">article</span>
<span class="cb cb-content cb-artwork">artwork</span>
<span class="cb cb-content cb-review">review</span>
<span class="cb cb-content cb-news">news</span>
```

### ステータスバッジ `.sb-`

```html
<span class="sb sb-open">開催中</span>
<span class="sb sb-soon">もうすぐ開催</span>
<span class="sb sb-ending">もうすぐ終了</span>
<span class="sb sb-closed">終了</span>
<span class="sb sb-draft">下書き</span>
```

展覧会カード内ではアニメーション付きバッジも使用可：

```html
<!-- 開催中（パルスドット付き） -->
<span class="sb sb-live"><span class="pulse"></span>開催中</span>

<!-- もうすぐ終了（パルスドット付き） -->
<span class="sb sb-ending"><span class="ending-dot"></span>もうすぐ終了</span>
```

### LIAISON バッジ `.lb-`

```html
<!-- 横長ロゴバッジ（カード右上・全幅帯等） -->
<span class="lb lb-liaison">LIAISON</span>
<span class="lb lb-liaison-plus">LIAISON+</span>

<!-- ドットバッジ（カード画像左上等） -->
<span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>
<span class="lb-dot li-plus"><span class="lb-dot-inner"></span>LIAISON+</span>
```

### 作品販売状態バッジ `.aws-`

```html
<span class="aws aws-sale">販売中</span>
<span class="aws aws-applying">申込中</span>
<span class="aws aws-sold">売却済</span>
<span class="aws aws-inquiry">要問合せ</span>
<span class="aws aws-nonsale">非売品</span>
```

---

## 9. カード スニペット集

> ナレッジHTMLファイルへの参照は不要。以下のスニペットをそのまま使用すること。  
> ダミー画像は `background: linear-gradient(...)` でスタイリングする。

### 展覧会カード `.ec-card` → `.ec`

```html
<!-- 標準（開催中） -->
<a class="ec" href="#">
  <div class="ec__poster" style="background:linear-gradient(160deg,#2a3a4a,#1a2030)">
    <div class="ec__poster-inner">
      <span class="ec__poster-text">タ<br>イ<br>ト<br>ル</span>
    </div>
    <div class="ec__poster-overlay">
      <div class="ec__poster-dates">
        <span class="year">2026.</span><strong>03.01</strong><span class="dow">sun</span>
        <span class="sep">—</span>
        <strong>03.31</strong><span class="dow">tue</span>
      </div>
      <div class="ec__poster-meta">
        <span class="ec__remain ec__remain--live">残り20日</span>
        <span class="meta-sep">|</span>
        <span>11:00-19:00</span>
      </div>
    </div>
  </div>
  <div class="ec__body">
    <div class="ec__badge-row">
      <span class="cb cb-content cb-exhibition">exhibition</span>
      <span class="sb sb-open">開催中</span>
    </div>
    <div class="ec__title">展覧会タイトル</div>
    <div class="ec__venue">東京<span class="ec__venue-sep">|</span>会場名</div>
  </div>
  <div class="ec__foot">
    <span class="ec-action"><!-- 興味あり数 --></span>
    <span class="ec-action"><!-- チェックイン数 --></span>
  </div>
</a>

<!-- 終了展覧会 -->
<a class="ec ec--ended" href="#">...</a>

<!-- LIAISON+ 付き（ポスター左上にドットバッジ） -->
<a class="ec" href="#">
  <div class="ec__poster" style="...">
    <div style="position:absolute;top:9px;left:9px;z-index:2">
      <span class="lb-dot li-plus"><span class="lb-dot-inner"></span>LIAISON+</span>
    </div>
    ...
  </div>
  ...
</a>
```

### 作品カード `.aw-card` → `.aw`

```html
<!-- リエゾン（展示のみ） -->
<a class="aw" href="#">
  <div class="aw__img">
    <div class="aw__lb">
      <span class="lb-dot li"><span class="lb-dot-inner"></span>LIAISON</span>
    </div>
    <div class="aw__img-ph"></div><!-- 実装時は <img> に差替え -->
  </div>
  <div class="aw__body">
    <div class="aw__badge-row">
      <span class="cb cb-content cb-artwork">artwork</span>
      <span class="aws aws-nonsale">非売品</span>
    </div>
    <div class="aw__title">作品タイトル</div>
    <div class="aw__creator">作家名</div>
    <div class="aw__spec">2025 / 油彩 / 100×80 cm</div>
  </div>
</a>

<!-- リエゾンプラス（販売あり） -->
<a class="aw aw--plus" href="#">
  ...同上...
  <div class="aw__foot">
    <div class="aw__price"><span class="currency">¥</span>80,000<span class="tax">税込</span></div>
    <button class="aw__apply-btn">
      <svg viewBox="0 0 14 14" fill="none" width="11" height="11">
        <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      購入申込
    </button>
  </div>
</a>

<!-- 売却済（SOLD OUT リボン） -->
<a class="aw aw--plus aw--sold" href="#">
  <div class="aw__img">
    ...
    <div class="aw__sold-ribbon"><div class="aw__sold-ribbon-inner">SOLD OUT</div></div>
  </div>
  ...
</a>
```

### クリエイターカード `.pc-card` → `.cc`

```html
<a class="cc" href="#">
  <div class="cc__top">
    <div class="cc__avatar" style="background:linear-gradient(145deg,#8aaa6a,#4a7a2a)">
      <div class="cc__avatar-ph">名</div>
    </div>
    <div class="cc__badge-row">
      <span class="cb cb-person cb-creator">creator</span>
      <span class="sb">開催中/開催予定</span>
    </div>
    <div class="cc__name">作家名</div>
    <div class="cc__genre">油彩・ドローイング</div>
    <div class="cc__watch">
      <button class="ktn-btn">watch</button>
    </div>
  </div>
  <div class="cc__foot">
    <div class="pc-counts">
      <span class="pc-count pc-count--exh">展覧会数</span>
      <span class="sep"></span>
      <span class="pc-count pc-count--watch">ウォッチ数</span>
    </div>
  </div>
</a>
```

### ギャラリーカード `.gc-card` → `.gc`

```html
<a class="gc" href="#">
  <div class="gc__top">
    <div class="gc__avatar" style="background:linear-gradient(145deg,#c8b89a,#a09070)">
      <div class="gc__avatar-ph">G</div>
    </div>
    <div class="gc__badge-row">
      <span class="cb cb-person cb-gallery">gallery</span>
    </div>
    <div class="gc__name">ギャラリー名</div>
    <div class="gc__area">東京・渋谷</div>
    <div class="gc__watch">
      <button class="ktn-btn">watch</button>
    </div>
  </div>
  <div class="gc__foot">
    <div class="pc-counts">
      <span class="pc-count pc-count--exh">展覧会数</span>
      <span class="sep"></span>
      <span class="pc-count pc-count--watch">ウォッチ数</span>
    </div>
  </div>
</a>
```

### 記事・レビューカード（マソンリー） `.mc`

```html
<!-- 画像あり -->
<a class="mc mc--img-article" href="#">
  <div class="mc__img mc__img-ph"></div><!-- 実装時は <img> に差替え -->
  <div class="mc__body">
    <div class="mc__badge-row">
      <span class="cb cb-content cb-article">article</span>
    </div>
    <div class="mc__title">記事タイトル</div>
    <div class="mc__lead">リード文テキスト</div>
    <div class="mc__byline">
      <span class="byline-author">
        <span class="cb cb-person cb-creator">creator</span>
        <span class="byline-name">作家名</span>
      </span>
      <span class="mc__byline-sep">/</span>
      <span class="mc__date">2026.03.01</span>
    </div>
  </div>
  <div class="mc__foot">
    <!-- 興味あり数・ボタン -->
  </div>
</a>

<!-- 画像なし -->
<a class="mc mc--noimg mc--noimg-article" href="#">
  <div class="mc__body">
    ...同上（mc__imgなし）...
  </div>
</a>
```

### 記事・レビューカード（リスト） `.lc`

```html
<!-- 画像なし（テキスト型） -->
<a class="lc lc--noimg lc--article" href="#">
  <div class="lc__body">
    <div class="lc__badge-row">
      <span class="cb cb-content cb-article">article</span>
    </div>
    <div class="lc__title">記事タイトル</div>
    <div class="lc__lead">リード文テキスト</div>
    <div class="lc__byline">
      <span class="byline-author">
        <span class="cb cb-person cb-creator">creator</span>
        <span class="byline-name">作家名</span>
      </span>
      <span class="mc__byline-sep">/</span>
      <span class="mc__date">2026.03.01</span>
    </div>
  </div>
</a>
```

---

## 10. ページ一覧

### P1 トップ
| ID | ページ名 | 幅 | ヒーロー |
|---|---|---|---|
| P1 | 個展なびトップ | `--w-index` | なし |

### P2 展覧会
| ID | ページ名 | 幅 | ヒーロー | アクセス |
|---|---|---|---|---|
| P2 | 展覧会一覧 | `--w-entity` | あり | 全員 |
| P2-1 | スケジュール | `--w-detail` | なし | 全員 |
| P2-2 | 開催場所 | `--w-detail` | なし | 全員 |
| P2-3 | 詳細 | `--w-detail` | あり | 全員 |
| P2-4 | 出展者 | `--w-detail` | なし | 全員 |
| P2-5 | LIAISON作品一覧 | `--w-index` | なし | 全員 |
| P2-11 | 新規/編集/クローン | `--w-article` | なし | creator / gallery / admin |
| P2-12 | インサイト | `--w-article` | なし | creator / gallery / admin |
| P2-13 | 広告作成 | `--w-article` | なし | creator / gallery / admin |
| P2-14 | 修正依頼 | `--w-article` | なし | guest / login / user+ |
| P2-15 | 報告 | `--w-article` | なし | guest / login / user+ |

### P3 クリエイター
| ID | ページ名 | 幅 | ヒーロー | アクセス |
|---|---|---|---|---|
| P3 | クリエイタートップ | `--w-entity` | あり | 全員 |
| P3-1 | 展覧会アーカイブ | `--w-detail` | なし | 全員 |
| P3-2 | 記事一覧 | `--w-detail` | なし | 全員 |
| P3-3 | 作品一覧 | `--w-detail` | なし | 全員 |
| P3-11 | 編集 | `--w-article` | なし | creator / admin |
| P3-12 | インサイト | `--w-article` | なし | creator / admin |
| P3-13 | ウォッチャー管理 | `--w-article` | なし | creator / admin |
| P3-14 | ポートフォリオ管理 | `--w-article` | なし | creator / admin（LIAISON） |
| P3-15 | LIAISONコンソール | `--w-detail` | なし | creator / admin（LIAISON+） |
| P3-16 | 取引デスク | `--w-detail` | なし | creator / admin（LIAISON+） |
| P3-17 | 販売代金管理 | `--w-article` | なし | creator / admin（LIAISON+） |

### P4 ギャラリー
| ID | ページ名 | 幅 | ヒーロー | アクセス |
|---|---|---|---|---|
| P4 | ギャラリートップ | `--w-entity` | あり | 全員 |
| P4-1 | 展覧会アーカイブ | `--w-detail` | なし | 全員 |
| P4-2 | 記事一覧 | `--w-detail` | なし | 全員 |
| P4-11 | 編集 | `--w-article` | なし | gallery / admin |
| P4-12 | インサイト | `--w-article` | なし | gallery / admin |
| P4-13 | ウォッチャー管理 | `--w-article` | なし | gallery / admin |
| P4-13 | ウォッチャー管理 | `--w-article` | なし | gallery / admin |
| P4-14 | LIAISONコンソール | `--w-detail` | なし | gallery / admin（LIAISON+） |
| P4-15 | 取引デスク | `--w-detail` | なし | gallery / admin（LIAISON+） |
| P4-16 | 販売代金管理 | `--w-article` | なし | gallery / admin（LIAISON+） |
| P4-17 | ギャラリー-インベントリー管理 | `--w-article` | なし | gallery / admin（LIAISON+） |

### P5 ユーザー（myページ）
| ID | ページ名 | 幅 | アクセス |
|---|---|---|---|
| P5 | 展覧会カレンダー | `--w-entity` | 全員 |
| P5-1 | ウォッチリスト | `--w-detail` | 全員 |
| P5-2 | チェックイン記録 | `--w-detail` | 全員 |
| P5-3 | 興味あり！リスト | `--w-detail` | 全員 |
| P5-4 | 保存した検索条件 | `--w-index` | user+ / admin |
| P5-11 | 編集 | `--w-article` | user+ / admin |
| P5-12 | パスワード管理 | `--w-article` | user+ / admin |
| P5-13 | メール通知管理 | `--w-article` | user+ / admin |
| P5-14 | 購入ダッシュボード | `--w-article` | user+ / admin（LIAISON+） |
| P5-15 | 取引ワークスペース | `--w-detail` | user+ / admin（LIAISON+） |
| P5-16 | 取引ワークスペース-支払 | `--w-article` | user+ / admin（LIAISON+） |
| P5-100 | 退会 | `--w-article` | user+ / admin |

### P6 作品
| ID | ページ名 | 幅 | ヒーロー | アクセス |
|---|---|---|---|---|
| P6 | 作品詳細 | `--w-entity` | あり | 全員 |
| P6-1 | LIAISON出品時 | `--w-entity` | あり | 全員 |
| P6-2 | LIAISON+出品時 | `--w-entity` | あり | 全員 |
| P6-11 | 新規/編集/クローン | `--w-article` | なし | creator / admin |
| P6-12 | インサイト | `--w-article` | なし | creator / admin |
| P6-13 | 問合せ | `--w-article` | なし | login / user+ / gallery / admin |
| P6-14 | 問合せへの回答 | `--w-article` | なし | creator / admin |

### P7 記事 / P8 レビュー / P9 ニュース
| ID | ページ名 | 幅 | ヒーロー |
|---|---|---|---|
| P7 | 記事一覧 | `--w-entity` | あり |
| P7-11 | 記事 新規/編集 | `--w-article` | なし |
| P8 | レビュー一覧 | `--w-entity` | あり |
| P8-11 | レビュー 新規/編集 | `--w-article` | なし |
| P9 | ニュース | `--w-article` | あり |
| P9-11 | ニュース 新規/編集 | `--w-article` | なし |

### P10 検索・特集
| ID | ページ名 | 幅 |
|---|---|---|
| P10 | 検索-展覧会 | `--w-index` |
| P10-1 | 検索-作品 | `--w-index` |
| P10-2 | 検索-クリエイター | `--w-index` |
| P10-3 | 検索-ギャラリー | `--w-index` |
| P10-4 | 特集-展覧会 | `--w-detail` |
| P10-5 | 特集-作品 | `--w-detail` |
| P10-6 | 特集-クリエイター | `--w-detail` |
| P10-7 | 特集-ギャラリー | `--w-detail` |

### P11 認証・申込
| ID | ページ名 | 幅 |
|---|---|---|
| P11 | ログイン | `--w-article` |
| P11-1 | ユーザー新規登録 | `--w-article` |
| P11-2 | クリエイター機能申込 | `--w-article` |
| P11-3 | ギャラリー機能申込 | `--w-article` |
| P11-4 | LIAISON+機能申込 | `--w-article` |
| P11-11〜24 | パスワード再設定・登録フロー | `--w-article` |

### P60 ガイド・法的ページ
| ID | ページ名 | 幅 |
|---|---|---|
| P60 | お知らせ一覧 | `--w-article` |
| P60-1〜4 | 各ガイド | `--w-article` |
| P60-5〜8 | よくある質問 | `--w-article` |
| P60-9〜13 | 規約・問合せ | `--w-article` |

### P70 LIAISON ガイド
| ID | ページ名 | 幅 |
|---|---|---|
| P70 | LIAISONとは | `--w-article` |
| P70-1〜9 | 各種ガイド | `--w-article` |

### P90 管理者
| ID | ページ名 | 幅 |
|---|---|---|
| P90〜P90-16 | 管理者各機能 | `--w-article` / `--w-detail` |

---

## 11. アクセス制御の考え方

ページのアクセス制御はサーバーサイド（Drupal）が担当する。  
フロントエンドでは以下の対応のみ行う。

- ロール別の **UI 表示/非表示**（`curRole` で分岐）
- アクションボタン（編集・削除・申込など）の出し分け
- ロール別ナビゲーション（サイドバー・ボトムナビ）は `common.js` が自動処理

### ロール一覧（`curRole`）

| 値 | 説明 |
|---|---|
| `guest` | 未ログイン |
| `login` | ログイン済みユーザー（一般） |
| `user+` | ページオーナー本人（ユーザー） |
| `creator` | クリエイター機能あり |
| `user+creator` | クリエイター本人 |
| `gallery` | ギャラリー機能あり |
| `user+gallery` | ギャラリー本人 |
| `admin` | 管理者 |

---

## 12. CSSクラス命名規則

| prefix | 対象 |
|---|---|
| `.ktn-` | 共通コンポーネント（ヘッダー・フッター・タグバー等） |
| `.cb-` | コンテンツタイプバッジ |
| `.sb-` | ステータスバッジ |
| `.lb-` | LIAISONバッジ |
| `.aws-` | 作品販売状態バッジ |
| `.ktn-btn` | アクションボタン |
| `.ec` | 展覧会カード |
| `.aw` | 作品カード |
| `.cc` / `.gc` / `.uc` | 人物カード |
| `.mc` / `.lc` | コンテンツカード（マソンリー / リスト） |
| `.p{ID}-` | ページ固有スタイル（例: `.p2-3-gallery`） |
| `.dev-ph` | 開発用プレースホルダー（本番削除） |

---

## 13. 制作時チェックリスト

### 制作前
- [ ] §10 ページ一覧でページID・幅・ヒーロー有無・アクセス権限を確認した
- [ ] `PAGES` オブジェクトにページIDが定義されているか確認（未定義なら追記）
- [ ] ロール別の表示切替が必要な箇所を洗い出した
- [ ] LIAISON / LIAISON+ 関連コンテンツの有無を確認した

### 制作後
- [ ] HTML に `<style>` / `<script>` タグがない（原則）
- [ ] ページ固有CSSが `common.css` に `.p{ID}-` prefix で追記されている
- [ ] ページ固有JSが `pages.js` の `KTN.pages['{id}']` に登録されている
- [ ] ヒーロー画像が `--w-page` 幅に収まっており、全画面に広がっていない
- [ ] `KTN.init({ page: '{id}', role: 'guest' })` が正しいIDで呼ばれている
- [ ] SP表示（860px以下）でサイドバーPHが非表示・ボトムナビが表示されている

### 後工程チェック（全ページ完成後）
- [ ] `TAGBAR_DEFS` に全ページのタグバー定義を追加した
- [ ] 各ページのロール別アクションボタンを定義した
- [ ] デモバー（`.dbar`）でロール切替してボタン・タグバーが正しく出ることを確認した
- [ ] プレースホルダー（`.dev-ph`）を本番実装に差替えた
- [ ] `回遊性設計ガイド.md` に沿って関連コンテンツ導線・タグリンクを実装した

---

## 14. SEO・UX・回遊性 実装ルール

> §0 の3目的を実現するための具体的ルール。  
> 各ページ制作時に該当項目を必ず実装すること。

---

### 14-1. SEO：`<head>` 必須要素

すべてのページの `<head>` に以下を記載する。

```html
<head>
  <!-- 基本メタ -->
  <title>{ページ固有キーワードを含むタイトル} — 個展なび</title>
  <meta name="description" content="{120文字以内の説明。ページ固有の情報を含める}">
  <link rel="canonical" href="https://koten-navi.com/{パスなど}">

  <!-- OGP（SNSシェア・検索プレビュー） -->
  <meta property="og:type"        content="{website|article|profile}">
  <meta property="og:title"       content="{ページタイトル}">
  <meta property="og:description" content="{descriptionと同じか短縮版}">
  <meta property="og:image"       content="{OGP画像URL。展覧会・作品・人物はメイン画像}">
  <meta property="og:url"         content="{canonical URLと同じ}">
  <meta property="og:site_name"   content="個展なび">
  <meta name="twitter:card"       content="summary_large_image">
</head>
```

**タイトルの作り方（ページ種別ごと）**

| ページ種別 | タイトルパターン |
|---|---|
| 展覧会詳細 | `{展覧会名} — {会場名}・{都市} \| 個展なび` |
| クリエイター | `{作家名} — {ジャンル} \| 個展なび` |
| ギャラリー | `{ギャラリー名} — {都市} のギャラリー \| 個展なび` |
| 作品詳細 | `{作品名} — {作家名} \| 個展なび` |
| 一覧・検索 | `{エリア・ジャンル等}の展覧会を探す \| 個展なび` |
| トップ | `個展なび — 全国の展覧会・個展情報` |

---

### 14-2. SEO：構造化データ（JSON-LD）

ページ種別に応じた JSON-LD を `</body>` 直前に挿入する。

#### 展覧会ページ（P2系）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "{展覧会名}",
  "startDate": "2026-03-01",
  "endDate": "2026-03-31",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "{会場名}",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "{市区町村}",
      "addressRegion": "{都道府県}",
      "addressCountry": "JP"
    }
  },
  "organizer": {
    "@type": "Person",
    "name": "{主催者名}"
  },
  "image": "{OGP画像URL}",
  "description": "{展覧会説明}"
}
</script>
```

#### クリエイターページ（P3系）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "{作家名}",
  "jobTitle": "{ジャンル・肩書}",
  "url": "https://koten-navi.com/creator/{id}",
  "image": "{アバター画像URL}",
  "sameAs": ["{SNS URL}", "{個人サイトURL}"]
}
</script>
```

#### ギャラリーページ（P4系）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ArtGallery",
  "name": "{ギャラリー名}",
  "url": "https://koten-navi.com/gallery/{id}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{住所}",
    "addressLocality": "{市区町村}",
    "addressRegion": "{都道府県}",
    "addressCountry": "JP"
  },
  "image": "{画像URL}"
}
</script>
```

#### 作品ページ（P6系）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VisualArtwork",
  "name": "{作品名}",
  "creator": {
    "@type": "Person",
    "name": "{作家名}"
  },
  "dateCreated": "{制作年}",
  "artMedium": "{技法・素材}",
  "artworkSurface": "{サポート}",
  "width":  {"@type": "Distance", "name": "{横幅} cm"},
  "height": {"@type": "Distance", "name": "{縦幅} cm"},
  "image": "{作品画像URL}"
}
</script>
```

#### パンくず（全ページ共通）

`common.js` が `<nav class="ktn-bc">` を自動生成するが、JSON-LD は別途挿入する。

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Top",    "item": "https://koten-navi.com/"},
    {"@type": "ListItem", "position": 2, "name": "展覧会", "item": "https://koten-navi.com/p2"},
    {"@type": "ListItem", "position": 3, "name": "{現在ページ名}"}
  ]
}
</script>
```

---

### 14-3. SEO：意味的HTML ルール

| 要素 | ルール |
|---|---|
| `<h1>` | 1ページに必ず1つ。展覧会名・作家名・ページタイトルを入れる |
| `<h2>` `<h3>` | セクション見出しに使用。装飾目的で乱用しない |
| `<main>` | `.ktn-main` に付与済み。`<div>` に変更しない |
| `<nav>` | パンくず・タグバー・サブナビに使用 |
| `<article>` | 記事・レビュー本文を囲む |
| `<time>` | 日付は `<time datetime="2026-03-01">2026.03.01</time>` 形式で記述 |
| `<address>` | 会場住所に使用 |
| `alt` 属性 | すべての `<img>` に必須。展覧会・作品・人物の場合は名称を入れる |
| `<img>` loading | ファーストビュー外の画像に `loading="lazy"` を付ける |

---

### 14-4. UX：ページ内ナビゲーション

P2（展覧会）・P3（クリエイター）・P4（ギャラリー）・P6（作品）等、  
サブページを持つコンテンツでは、**タブナビゲーション**でページ間を繋ぐ。

タグバー（`.ktn-tagbar`）は後工程で `TAGBAR_DEFS` に一括追加するため、  
ページ制作時はサブページ同士のリンク構造（`href`）を正しく設定しておくこと。

**アクティブ状態の出し方（pages.js）**

```javascript
KTN.pages['p2-1'] = function() {
  // タグバーのアクティブタブをJSで切替（後工程で実装）
};
```

---

### 14-5. UX：CTA（Call to Action）配置ルール

各ページで**ユーザーに次に取ってほしいアクション**を1つ決め、  
ファーストビューまたはコンテンツ直後に必ず配置する。

| ページ種別 | 主要CTA |
|---|---|
| 展覧会詳細（P2-3） | 「興味ある！」ボタン・スケジュール追加 |
| クリエイター（P3） | 「ウォッチ」ボタン |
| ギャラリー（P4） | 「ウォッチ」ボタン |
| 作品詳細（P6-2） | 「購入申込」ボタン |
| 検索（P10） | 「絞り込む」・「展覧会を見る」 |
| トップ（P1） | 「展覧会を探す」・「展覧会を掲載する」 |

CTAボタンは `.ktn-btn.ktn-btn--primary` を使用し、視認性の高い位置に単独で置く。

---

### 14-6. 回遊性：Phase 2 で実装（全ページ完成後）

> 回遊性の導線設計はサイト全体の構造が見えてから行うと精度が上がるため、  
> **全ページ完成後に `回遊性設計ガイド.md` を参照してまとめて実装する。**
>
> - 関連コンテンツ導線ブロック（`.ktn-related`）
> - タグ・ジャンル・エリアリンク（P10 への遷移）

---

### 14-7. SEO/UX チェックリスト（ページ制作後に確認）

#### SEO
- [ ] `<title>` にページ固有キーワードが入っている
- [ ] `<meta name="description">` が 120 文字以内で記述されている
- [ ] `<link rel="canonical">` が設定されている
- [ ] OGP メタタグが設定されている（`og:image` に適切な画像URL）
- [ ] ページ種別に応じた JSON-LD が挿入されている
- [ ] パンくず JSON-LD が挿入されている
- [ ] `<h1>` が 1 つあり、ページ固有の名称が入っている
- [ ] 日付が `<time datetime="...">` 形式で記述されている
- [ ] すべての `<img>` に `alt` 属性が設定されている
- [ ] ファーストビュー外の `<img>` に `loading="lazy"` が付いている

#### UX
- [ ] ファーストビュー、またはコンテンツ直後に主要CTAが配置されている
- [ ] サブページを持つ場合、タグバーのリンク構造（`href`）が正しく設定されている

---

## 15. スマホ操作最適化ルール

> 個展なびはネイティブアプリを提供しない。PWA でアプリライクな体験を提供するため、  
> すべてのページをスマホ操作に最適化すること。  
> PWA の設定ファイル（manifest.json / Service Worker）は `PWA設計ガイド.md` を参照。

---

### 15-1. レスポンシブ ブレークポイント

| 変数名 | 値 | 対象 |
|---|---|---|
| SP | `≤ 860px` | スマホ・小型タブレット（サイドバー非表示・ボトムナビ表示） |
| PC | `> 860px` | タブレット横・デスクトップ（サイドバー表示・ボトムナビ非表示） |

`common.css` の既存定義に合わせ、ページ固有のSP対応も `@media (max-width: 860px)` で記述する。

```css
/* ページ固有SP対応の書き方 */
@media (max-width: 860px) {
  .p2-3-gallery { grid-template-columns: 1fr; }
}
```

---

### 15-2. タッチターゲットサイズ

タップ・クリックを受け付けるすべての要素に最小サイズを確保する。

| 要素 | 最小サイズ | 備考 |
|---|---|---|
| ボタン・リンク | `min-height: 44px` | Apple HIG 推奨値 |
| アイコンボタン `.ktn-icon-btn` | `44px × 44px` | `padding` で当たり判定を拡張 |
| カード全体 `.ec` `.aw` `.cc` | タップ領域 = カード全体 | `<a>` でカード全体を囲む |
| フォーム `<input>` `<select>` | `min-height: 44px` | `font-size: 16px` 以上（iOS ズーム防止） |

```css
/* アイコンボタンのタッチ拡張（common.css 定義済み） */
.ktn-icon-btn {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* フォーム要素（SP時ズーム防止） */
@media (max-width: 860px) {
  input, select, textarea {
    font-size: 16px;  /* 16px未満だとiOSが自動ズームする */
  }
}
```

---

### 15-3. ボトムナビ（`.ktn-bottom-nav`）

SP 時はボトムナビが画面下部に固定表示される（`common.js` が自動処理）。  
ボトムナビの高さ分だけ `main` のパディングが必要になるため以下を守ること。

```css
/* common.css 定義済み。ページ固有で上書きしないこと */
@media (max-width: 860px) {
  .ktn-main {
    padding-bottom: calc(var(--bnh) + 16px); /* --bnh: ボトムナビ高さ */
  }
}
```

また、**固定フッター系の要素**（トースト・モーダル等）は `z-index` がボトムナビ（`z-index: 300`）より高いことを確認する。

---

### 15-4. スワイプ・ジェスチャー対応

スワイプが有効なコンポーネントは `pages.js` 側で実装する。  
ネイティブスクロールを妨げないよう `touch-action` を適切に設定すること。

| コンポーネント | ジェスチャー | 実装方針 |
|---|---|---|
| 画像ギャラリー（P2-3・P6） | 左右スワイプで画像切替 | `touch-action: pan-y` |
| 作品カード一覧（横スクロール） | 横スクロール | `overflow-x: auto; scroll-snap-type: x mandatory` |
| モーダル・ドロワー | 下スワイプで閉じる | `touch-action: pan-x` |

```css
/* 横スクロールカードリスト（SP用） */
@media (max-width: 860px) {
  .ktn-scroll-row {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 8px;          /* スクロールバー分の余白 */
    scrollbar-width: none;        /* Firefox */
  }
  .ktn-scroll-row::-webkit-scrollbar { display: none; } /* Chrome/Safari */
  .ktn-scroll-row > * {
    flex-shrink: 0;
    scroll-snap-align: start;
  }
}
```

---

### 15-5. フォーム入力の最適化

フォーム系ページ（P2-11・P5-11・P6-11 等）では以下を必ず実装する。

```html
<!-- input type を正しく指定（SP でキーボードが最適化される） -->
<input type="text"     autocomplete="name"         placeholder="氏名">
<input type="email"    autocomplete="email"        placeholder="メールアドレス">
<input type="tel"      autocomplete="tel"          placeholder="電話番号">
<input type="url"                                  placeholder="URL">
<input type="number"   inputmode="numeric"         placeholder="価格">
<input type="date"                                 placeholder="日付">
<textarea             autocomplete="off"></textarea>

<!-- 住所（P2-11 会場住所等） -->
<input type="text" autocomplete="postal-code"      placeholder="郵便番号">
<input type="text" autocomplete="address-level1"   placeholder="都道府県">
<input type="text" autocomplete="address-level2"   placeholder="市区町村">
<input type="text" autocomplete="street-address"   placeholder="番地">
```

---

### 15-6. SP 表示チェックリスト（ページ制作後に確認）

- [ ] 860px 以下でサイドバーが非表示・ボトムナビが表示されている
- [ ] ボトムナビに隠れるコンテンツがない（`padding-bottom` を確認）
- [ ] すべてのタップ要素が 44px 以上の当たり判定を持っている
- [ ] `<input>` `<select>` の `font-size` が 16px 以上（iOS ズーム防止）
- [ ] 横スクロールが発生していない（意図したもの以外）
- [ ] フォーム項目に適切な `type` と `autocomplete` が設定されている
- [ ] 画像ギャラリーが左右スワイプで操作できる（該当ページのみ）

---

## 16. レイアウト・共通クラス早見表

> **このセクションの目的：ページ制作時に `kotennavi-common.css` を開かなくても実装できるようにする。**
>
> 制作時に参照するファイルはこのドキュメント（`page-production-guide.md`）のみ。
> `common.css` は読み込み不要。

---

### 16-1. ページ骨格

```html
<!-- デモバー（開発時のみ） -->
<div class="dbar" id="dbar">...</div>

<!-- サイドバーPH（本番時に差替え） -->
<div class="dev-ph dev-ph--sidebar"></div>

<!-- 全体ラッパー -->
<div class="shell">
<div class="content-wrap" id="contentWrap">

  <!-- ヘッダー（パンくず自動生成） -->
  <header class="ktn-header" id="ktnHeader">
    <div class="ktn-header__inner">
      <nav class="ktn-bc" id="ktnBc" aria-label="パンくず"></nav>
      <div class="ktn-hdr-actions" id="ktnActs"></div>
    </div>
  </header>

  <!-- タグバー（JS自動生成） -->
  <div class="ktn-tagbar" id="ktnTagbar">
    <div class="ktn-tagbar__inner" id="ktnTagbarInner"></div>
  </div>

  <!-- メインコンテンツ -->
  <main class="ktn-main" id="ktnMain">
    <div class="ktn-content ktn-content--{幅クラス}">
      <!-- ページ固有コンテンツ -->
    </div>
  </main>

  <!-- 広告バンド -->
  <div class="ktn-ad-band" id="ktnAdBand">
    <div class="ktn-ad-band__inner">
      <div class="ktn-ad-band__slot">広告エリア（728×90 / レスポンシブ）</div>
    </div>
  </div>

  <!-- フッターPH（本番時に差替え） -->
  <div class="dev-ph dev-ph--footer"></div>

</div>
</div>

<!-- ボトムナビ（JS自動生成） -->
<nav class="ktn-bottom-nav" id="ktnBottomNav">
  <div class="ktn-bottom-nav__inner" id="ktnBottomNavInner"></div>
</nav>

<!-- トースト -->
<div class="ktn-toast" id="ktnToast"></div>
```

---

### 16-2. コンテンツ幅クラス

| クラス | 最大幅 | 用途 |
|---|---|---|
| `ktn-content--entity` | 1080px | コンテンツトップ（P2・P3・P4・P5・P6・P7・P8） |
| `ktn-content--detail` | 1080px | コンテンツ下層タブ（P2-1〜P2-4 等） |
| `ktn-content--article` | 720px | 記事・フォーム系 |
| （指定なし） | 1080px | 一覧・検索（P10系） |

```html
<!-- 例：展覧会概要（entity） -->
<div class="ktn-content ktn-content--entity">

<!-- 例：展覧会スケジュール（detail） -->
<div class="ktn-content ktn-content--detail">

<!-- 例：記事編集フォーム（article） -->
<div class="ktn-content ktn-content--article">
```

---

### 16-3. グリッド・リスト

```html
<!-- 自動カラム（220px ミニマム）-->
<div class="ktn-grid">...</div>

<!-- 2カラム固定 -->
<div class="ktn-grid ktn-grid--2col">...</div>

<!-- 3カラム固定 -->
<div class="ktn-grid ktn-grid--3col">...</div>

<!-- 縦リスト（カード間 8px） -->
<div class="ktn-list">...</div>

<!-- マソンリー（4カラム 220px） -->
<div class="ktn-masonry">
  <div class="ktn-masonry-item">...</div>
</div>

<!-- 2カラム（メイン + スティッキーサイド 320px） -->
<div class="ktn-2col">
  <div class="ktn-2col__main">...</div>
  <div class="ktn-2col__side">...</div>  <!-- sticky -->
</div>
```

**SP挙動（自動）**
- 768px以下：`ktn-grid--3col` / `ktn-grid--4col` → 2カラム
- 480px以下：全グリッド → 1カラム
- 768px以下：`ktn-2col` → 1カラム（サイドは通常フロー）

---

### 16-4. セクション見出し

```html
<div class="ktn-section">
  <div class="ktn-section__head">
    <h2 class="ktn-section__title">セクションタイトル</h2>
    <a href="#" class="ktn-section__more">MORE →</a>  <!-- 任意 -->
  </div>
  <!-- セクション本文 -->
</div>
```

---

### 16-5. ボタン

```html
<!-- 標準（ゴーストpill） -->
<button class="ktn-btn">watch</button>

<!-- Primary（アクセントカラー塗り） -->
<button class="ktn-btn ktn-btn--primary">展覧会を探す</button>

<!-- Ghost（ボーダーのみ） -->
<button class="ktn-btn ktn-btn--ghost">+ watch</button>

<!-- アイコン付き -->
<button class="ktn-btn ktn-btn--primary">
  <svg>...</svg>
  興味ある！
</button>

<!-- アイコンのみ（丸ボタン） -->
<button class="ktn-icon-btn" aria-label="シェア">
  <svg>...</svg>
</button>
```

**ON状態（JS で `.on` クラスをトグル）**
```javascript
btn.classList.toggle('on');
```

---

### 16-6. タグ

```html
<!-- タグリスト（P10検索に遷移） -->
<ul class="ktn-tags" aria-label="タグ">
  <li><a class="ktn-tag" href="/p10?tag=水彩">水彩</a></li>
  <li><a class="ktn-tag" href="/p10?area=tokyo">東京</a></li>
  <li><a class="ktn-tag" href="/p10?genre=oil">油彩</a></li>
</ul>
```

---

### 16-7. dev-ph・toast（開発用）

```html
<!-- サイドバーPH：fixed 左端 120px幅 -->
<div class="dev-ph dev-ph--sidebar"></div>

<!-- フッターPH：全幅 120px高さ -->
<div class="dev-ph dev-ph--footer"></div>

<!-- トースト：JS から KTN.toast('メッセージ') で呼び出す -->
<div class="ktn-toast" id="ktnToast"></div>
```

```javascript
// pages.js 内での使い方
KTN.toast('「興味ある！」に追加しました');
```

---

### 16-8. デザイントークン（よく使う変数）

| 変数 | 値 | 用途 |
|---|---|---|
| `--ink` | `#231815` | 本文テキスト |
| `--paper` | `#f0f4f8` | 背景・薄グレー |
| `--warm` | `#f7f9fb` | body背景 |
| `--accent` | `#005da7` | リンク・ボタン |
| `--muted` | `#7a8a99` | 補助テキスト |
| `--border` | `#d0dae4` | ボーダー |
| `--lr` | `#c0392b` | LIAISON赤 |
| `--lp` | `#8a6a00` | LIAISON+ゴールド |
| `--hh` | `50px` | ヘッダー高さ |
| `--sw` | `120px` | サイドバー幅 |
| `--fs` | Shippori Mincho | 和文明朝 |
| `--fn` | Noto Sans JP | 和文ゴシック |
| `--fm` | Montserrat | 欧文・数字 |

