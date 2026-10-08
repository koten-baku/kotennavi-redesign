# HTML の基準（SEO の head・構造化データ・意味のある HTML・スマホの入力）

> 2026-10-08、旧「ページ制作指示書」（`docs/archive/page-production-guide.md`）から、**今も有効でほかに書かれていない部分だけ**を移した。
> 制作ルールの正本は `CLAUDE.md`（`meta description` の書式・幅・フォント・部品など）。ここは後工程（React CSR／Drupal）でも守る HTML の基準に限る。
> **中身は 5 月時点の基準で、全ページとの突き合わせはまだ**（2026-10-08 時点で JSON-LD は 55 ページ、OGP は 28 ページ、canonical は 29 ページに入っている）。

---

## 1. `<head>` に入れるもの

```html
<title>{ページ固有の語を含むタイトル} | 個展なび</title>
<meta name="description" content="{書式は CLAUDE.md「meta description フォーマット」}">
<link rel="canonical" href="https://koten-navi.com/{パス}">

<!-- OGP（SNS のシェア・検索のプレビュー） -->
<meta property="og:type"        content="{website|article|profile}">
<meta property="og:title"       content="{ページタイトル}">
<meta property="og:description" content="{description と同じか短縮版}">
<meta property="og:image"       content="{展覧会・作品・人物はメイン画像}">
<meta property="og:url"         content="{canonical と同じ}">
<meta property="og:site_name"   content="個展なび">
<meta name="twitter:card"       content="summary_large_image">
```

管理・編集ページ（`mgmt-page`）は noindex で、description・OGP は省いてよい。

### タイトルの形（今のページに合わせた形）

| ページ | 形 | 例 |
|---|---|---|
| 展覧会（P2） | `{展覧会名} — {作家名} 個展 \| {会場名} \| 個展なび` | あなたが知らないオノマトペ — 田中透 個展 \| Gallery SOIL 渋谷 \| 個展なび |
| クリエイター（P3） | `{作家名} — {ジャンル} \| 個展なび` | 田中透 — 絵画・現代美術 \| 個展なび |
| ギャラリー（P4） | `{ギャラリー名} — {ジャンル} \| 個展なび` | Gallery SOIL 渋谷 — 現代美術・絵画 \| 個展なび |
| 作品（P6） | `{作品名} — {作家名} \| 個展なび` | |
| 検索（P10 系） | `{何を}探す \| 個展なび` | 展覧会を探す \| 個展なび |
| トップ（P1） | `個展なび \| 全国の個展・グループ展の展覧会情報ポータル` | |

---

## 2. 構造化データ（JSON-LD）

ページの種類に応じて入れる。本番での出し方（Drupal が公開ページの `<head>` と JSON-LD、本文の先頭の公開コンテンツを出し、React がその上で動く）は `docs/handoff-decisions.md` の SEO の項（「採用＝A+」）を参照。

| ページ | `@type` | 主な項目 |
|---|---|---|
| 展覧会（P2 系） | `Event` | name・startDate・endDate・eventStatus・eventAttendanceMode（Offline）・location（Place＋PostalAddress）・organizer・image・description |
| クリエイター（P3 系） | `Person` | name・jobTitle（ジャンル）・url・image・sameAs（SNS・個人サイト） |
| ギャラリー（P4 系） | `ArtGallery` | name・url・address（PostalAddress）・image |
| 作品（P6 系） | `VisualArtwork` | name・creator（Person）・dateCreated・artMedium・artworkSurface・width／height（Distance）・image |
| 全ページ | `BreadcrumbList` | パンくずと同じ並び（画面のパンくずは common.js が作るが、JSON-LD は別に入れる） |

---

## 3. 意味のある HTML

| 要素 | 決まり |
|---|---|
| `<h1>` | 1ページに1つ。展覧会名・作家名・ページ名を入れる |
| `<h2>` `<h3>` | セクションの見出しに使う。飾りのために使わない |
| `<main>` | `.ktn-main` に付いている。`<div>` に変えない |
| `<nav>` | パンくず・タグバー・サブナビ |
| `<article>` | 記事・レビューの本文 |
| `<time>` | 日付は `<time datetime="2026-03-01">2026.03.01</time>` |
| `<address>` | 会場の住所 |
| `alt` | すべての `<img>` に付ける。展覧会・作品・人物は名前を入れる |
| `loading="lazy"` | 最初の画面より下の画像に付ける |

---

## 4. スマホの操作

- **押せるものの大きさ**：ボタン・リンクは高さ 44px 以上。アイコンだけのボタン（`.ktn-icon-btn`）も当たりは 44×44px を目標にする。**ウォッチ・興味あり！のボタン（`.ktn-icon-btn` と、ピル型 `.ktn-btn[data-action="watch"|"interest"]`）は、860px 以下で透明な `::before` により押せる範囲を 44px に広げた**（2026-10-08・見た目は変えない・追174-291。丸の見た目の大きさは：基本は 32px〔3か所あった定義は 2026-10-08 に1つへまとめた〕、右カラムの小さいカード内は 26px。SEO の評価には影響しない〔Google は押せる範囲の大きさを順位の要素にしていない〕。アクセシビリティの最低基準 WCAG 2.2 AA の 24px は満たす。広げるかは後で判断）。カードはカード全体を `<a>` で囲む。
- **入力欄の文字の大きさ**：860px 以下では `input`・`select`・`textarea` を 16px 以上にする（16px 未満だと iPhone が自動で拡大する）。
- **入力欄の種類と自動入力**：スマホで合ったキーボードが出るよう `type` と `autocomplete` を付ける。

```html
<input type="text"   autocomplete="name">           <!-- 氏名 -->
<input type="email"  autocomplete="email">          <!-- メール -->
<input type="tel"    autocomplete="tel">            <!-- 電話 -->
<input type="url">                                  <!-- URL -->
<input type="number" inputmode="numeric">           <!-- 価格など -->
<input type="text"   autocomplete="postal-code">    <!-- 郵便番号 -->
<input type="text"   autocomplete="address-level1"> <!-- 都道府県 -->
<input type="text"   autocomplete="address-level2"> <!-- 市区町村 -->
<input type="text"   autocomplete="street-address"> <!-- 番地 -->
```

- **下のナビとの重なり**：860px 以下では下部ナビ（`.ktn-bottom-nav`）が固定で出る。トースト・モーダルなど固定で出すものは、それより前面に出す。
- **横スクロール**：意図したもの以外で横スクロールを出さない。

PWA の設定（manifest・Service Worker）は `docs/PWA設計ガイド.md`。
