> **状態（2026-10-11）**：**後工程はまず 13 章（決めること・注意）と 10 章（チェックリスト）から読む**。5〜8 章（sw.js・通知・すすめ方）は 2026-10-11 に今の仕様へ全面的に直した。**プロトタイプで作ったもの＝`manifest.json`（3 章）・全147ページの `<head>` の指定（4 章）・`offline.html`（9 章）・アイコン（12 章）**。**後工程で作るもの＝`sw.js`（5〜8 章。保存するファイルの一覧は React で作った後のファイル構成で、通知の受け取りはサーバーとの約束事で決まるため）とサーバー側（VAPID キー・購読の保存・送る処理）**。どちらも Netlify・実機ではまだ確かめていない（ユーザー判断＝作ったものを後工程へ渡す）。PWA が必須であることは `docs/06_リエゾン_サービス仕様書.md` 第9章。**2026-10-09 に今の仕様へ合わせて直した**：プッシュで送る範囲と許可の求め方（notifications.md 3.5 が正）、iPhone への対応（11 章）、オフラインで取引の操作を止める方針（9 章）、個人の情報を含むページはキャッシュしない（5 章）。利用者向けの使い方の案内は P60-17「スマホで個展なびを使う」。

# 個展なび PWA 設計ガイド

> 個展なびはネイティブアプリを提供しない。  
> PWA（Progressive Web App）でアプリライクな体験を実現する。
>
> **このガイドの対象範囲：フロントエンド納品物（HTML / CSS / JS）のみ。**  
> プッシュ通知の配信トリガー・VAPID キー管理・購読情報の保存は  
> バックエンド（Drupal）担当と別途協議すること。

---

## 1. PWA の必須要件（リエゾン仕様書より）

| 機能 | 用途 | フロント | Drupal |
|---|---|---|---|
| ホーム画面追加 | アプリライクな起動 | ✅ manifest.json | — |
| オフライン対応 | 会場内ネットワーク不安定時 | ✅ Service Worker・offline.html | ✅ 状態を変える API で二重に売れないことを守る（9 章） |
| ホーム画面への追加・プッシュのすすめ | 取引の画面のカード・P5-13・P60-17 | ✅ .ktn-pwa-card（beforeinstallprompt は使わない＝8 章） | — |
| プッシュ通知（受信・表示） | 取引で自分の番が来たときの通知（7-1） | ✅ SW push イベント | — |
| プッシュ通知（配信） | イベント発火・送信 | — | ✅ VAPID・Web Push API |
| 購読情報の保存 | ユーザー別の購読管理 | 購読オブジェクトをPOST | ✅ DB保存・管理 |

---

## 2. 納品ファイル構成

```
/
├── manifest.json          ← PWA マニフェスト（作成済み）
├── sw.js                  ← Service Worker（後工程）
├── offline.html           ← オフラインのときに出すページ（作成済み）
├── icons/                 ← 作成済み
│   ├── icon-192.png       ← ホーム画面（192×192）
│   ├── icon-512.png       ← インストール・起動画面（512×512）
│   ├── icon-maskable.png  ← Android の切り抜き用（512×512）
│   ├── apple-touch-icon.png ← iPhone のホーム画面（180×180）
│   ├── badge-96.png       ← Android の通知バー（アプリのアイコンの文字を白一色・96×96）
│   ├── favicon.svg        ← ファビコン（logo3）
│   └── favicon-32／48／96.png ← ファビコンの PNG
├── favicon.ico            ← ファビコン（32・48px。サイトの一番上に置く）
└── 共通の初期化（React）  ← Service Worker の登録（6 章）
```

---

## 3. manifest.json

**作成済み＝リポジトリ直下の `manifest.json`（2026-10-09）**。プロトタイプのファイルの並びで動くよう、パスは相対（`start_url: ./kotennavi-p1.html`・`icons/…`・shortcuts は `./kotennavi-p10.html`／`./kotennavi-p5.html`）にし、`id`・`scope` を足した。**本番では URL（`/`・`/p10` 等）に合わせて直す**。下の例は本番の URL での書き方。色（`theme_color` #231815＝インク、`background_color` #f0f4f8＝`--paper`）は下の例のまま。**画面の向きは固定しない**（`orientation` を外した・2026-10-11 確定＝作品を横向きで見るとき・タブレットで不便なため）。

```json
{
  "name": "個展なび",
  "short_name": "個展なび",
  "description": "全国の展覧会・個展情報ポータル",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f0f4f8",
  "theme_color": "#231815",
  "lang": "ja",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "shortcuts": [
    {
      "name": "展覧会を探す",
      "url": "/p10",
      "icons": [{ "src": "/icons/icon-192.png", "sizes": "192x192" }]
    },
    {
      "name": "myページ",
      "url": "/p5",
      "icons": [{ "src": "/icons/icon-192.png", "sizes": "192x192" }]
    }
  ],
  "categories": ["lifestyle", "entertainment"]
}
```

---

## 4. 全ページ共通 `<head>` タグ

全ページの `<head>` に追加する（ほかに入れるもの＝SEO の head は `docs/html-baseline.md`）。**全147ページに入れ済み（2026-10-09）**：`kotennavi-common.css` の `<link>` の直前。プロトタイプでは href を相対（`manifest.json`・`icons/apple-touch-icon.png`）にしてある＝本番の URL に合わせて直す。

```html
<!-- PWA -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#231815">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="個展なび">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/icons/favicon.svg" type="image/svg+xml">
```

- **ファビコン**（2026-10-11）：`images/kotennavi-logo3.svg`（ブランド青の枠マーク）を使う。Google の検索結果にも出る（48px の倍数を求められる）ので `favicon.ico`（32・48px）をサイトの一番上（`/favicon.ico`）に置き、SVG も併記する。全148ファイル（147ページ＋offline.html）に入れ済み。

---

## 5. Service Worker（sw.js）

**後工程で作る**（2026-10-11 に今の仕様へ全面的に直した）。React CSR では、どのページも同じ HTML（アプリの骨組み）を返し、中身は API から読むので、「ページを保存する」は **骨組みと公開の API の応答を保存する** ことになる。

### 保存の方針

| リソース | 方針 | 理由 |
|---|---|---|
| アプリの骨組み（index.html）・CSS・JS（ビルドの成果物） | インストール時に保存。CSS／JS はファイル名にハッシュを付け、新しい版が出たら古いものを消す | オフラインでも画面を出す。古い版を使い続けない |
| `offline.html`・`manifest.json`・アイコン | インストール時に保存 | オフラインのときに出すため |
| ページを開く（navigate） | まずネットワーク。失敗したら保存済みの骨組み、それも無ければ `offline.html` | 常に新しい内容を優先 |
| **公開の情報の API**（展覧会・作品・クリエイター・ギャラリー・記事・レビュー・検索） | まずネットワーク。成功したら保存し、失敗したら保存済みを返す（件数の上限を決める）（2026-10-11 確定） | 「一度見たページはオフラインでも見られることがある」（offline.html の文言）を実現する |
| 画像 | 保存を先に見る（Cache First）。件数か容量の上限を決める | 展覧会・作品の画像は大きく、増え続ける |
| **個人・取引の情報の API**（myページ・取引デスク・取引ワークスペース・コンソール・販売代金管理・お知らせ・やること・通知設定・管理画面） | **保存しない**（ネットワークだけ） | 共有の端末に残さない／古い取引の状態を見て操作させない |
| **状態を変えるリクエスト**（POST・PUT・PATCH・DELETE） | **保存も、後で送る仕組み（Background Sync）も使わない** | 9 章：会場とオンラインで二重に売れるのを防ぐ |

- **ログアウトしたとき**は、個人の情報を保存していないことを前提に、念のため公開の API の保存も消してよい（同じ端末を別の人が使う場合に、前の人が見たものが残らない）。

### sw.js の骨組み（考え方の見本・本番の URL とビルドに合わせて書き直す）

```javascript
const VERSION      = 'v1';                      // デプロイごとに上げる（ビルドのハッシュでもよい）
const SHELL_CACHE  = `ktn-shell-${VERSION}`;
const API_CACHE    = 'ktn-public-api';           // 公開の API の応答（件数の上限つき）
const IMAGE_CACHE  = 'ktn-images';               // 画像（件数・容量の上限つき）
const OFFLINE_URL  = '/offline.html';
const SHELL_ASSETS = ['/', OFFLINE_URL, '/manifest.json', '/icons/icon-192.png', '/icons/badge-96.png' /* ＋ビルドの CSS・JS */];
const PUBLIC_API   = [/^\/api\/(exhibitions|artworks|creators|galleries|articles|reviews|search)\b/]; // 本番の API に合わせる

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL_ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('ktn-shell-') && k !== SHELL_CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;           // 状態を変えるものと外部は触らない
  if (req.mode === 'navigate') {                                                 // ページを開く
    e.respondWith(fetch(req).catch(async () => (await caches.match('/')) || caches.match(OFFLINE_URL)));
    return;
  }
  if (PUBLIC_API.some(r => r.test(url.pathname))) {                              // 公開の API：ネットワーク→失敗したら保存済み
    e.respondWith(fetch(req).then(res => {
      if (res.ok) caches.open(API_CACHE).then(c => c.put(req, res.clone()));     // ＋件数の上限で古いものを消す
      return res;
    }).catch(() => caches.match(req)));
    return;
  }
  if (req.destination === 'image') {                                             // 画像：保存を先に見る
    e.respondWith(caches.open(IMAGE_CACHE).then(c => c.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) c.put(req, res.clone());                                       // ＋件数・容量の上限
      return res;
    }))));
    return;
  }
  if (req.destination === 'style' || req.destination === 'script') {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
  // それ以外（個人・取引の API など）は何もしない＝ネットワークだけ
});

// プッシュ通知（中身の形は 7 章の「送る中身」）
self.addEventListener('push', e => {
  if (!e.data) return;
  const d = e.data.json();
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body, icon: d.icon, badge: d.badge, tag: d.tag, renotify: true, data: { url: d.url }
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL(e.notification.data.url, location.origin).href;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(wins => {
    const w = wins.find(x => x.url === url) || wins[0];                          // 開いている個展なびがあればそこで開く
    return w ? w.focus().then(x => x.navigate(url)) : clients.openWindow(url);
  }));
});
// 購読がブラウザ側で更新されたとき：新しい購読をサーバーへ送り直す（7 章）
self.addEventListener('pushsubscriptionchange', e => { /* 再購読して PUT /api/push/subscriptions */ });
```

---

## 6. Service Worker の登録（共通の初期化に入れる）

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}
```

- 登録は全ページ。**登録しても通知の許可は求めない**（許可を求めるのは P5-13 でスイッチをオンにしたときだけ＝7 章）。
- https でしか動かない（開発の localhost は例外）。

---

## 7. プッシュ通知（端末の登録・送る中身・サーバー）

正本の決まりは notifications.md 3.5。ここは作り方。

### 7-1. 送るとき（Drupal）

**LIAISON+ の取引で「自分の番」になったときだけ**（やること TD-01・TD-02）。状態が変わった瞬間に、その番の人へ1回送る。

| 状態（取引） | 受け取る人 | 押した先 |
|---|---|---|
| S1 購入確定待ち（申込の順番が来た） | 出品者（クリエイター・ギャラリー） | その取引の取引デスク P3-16／P4-16 |
| S2 支払待ち | 購入者 | その取引の取引ワークスペース P5-15 |
| S3 発送待ち | 出品者 | 取引デスク |
| S4 受取確認待ち | 購入者 | 取引ワークスペース |
| S5 完了確認待ち | 出品者 | 取引デスク |

- 送らないもの：購入申込（S0 申込済＝会期中は出品者がすることが無い）、取引の結果（完了・キャンセル・自動取消）、お知らせ、取引のメッセージ。メールとサイト内で届く。
- 取引のメール（T-02〜T-06）は、プッシュの有無と関係なく必ず送る。
- **期限が近づいても操作がまだのときは、もう一度送る**（2026-10-11 確定）。時点はメール T-09 と同じ（取引の画面の「期限間近」と同じ基準）。題名は「○○期限が近づいています」（P90-18 の「プッシュ通知だけで使う文」PU-01）、本文の末尾に自分の番の文。同じ取引の tag なので前の通知を置き換えて知らせ直す。
- **夜（22時〜翌8時）は送らない**（2026-10-11 確定）。その間に送る時点が来た通知は朝8時に送る（同じ取引で複数あれば最新の1通）。朝8時の時点で期限を過ぎているものは送らない。取引のメールは時間帯に関係なくこれまでどおり。

### 7-2. 送る中身（サーバーとフロントの約束事）

**やることの一覧と同じデータから作る。文言はプッシュ用に別に持たない**（P90-18 で管理する文言を共通で使う）。プロトタイプの組み立ては common.js `KTN.pushPayload(item)`、試しに出す機能は `KTN.pushPreview(role)`（P5-13 のデモバー）。

```json
{
  "title": "購入を確定してください",
  "body": "《音の輪郭 No.7》山田 花子さん　期限 2026.03.08",
  "icon": "/icons/icon-192.png",
  "badge": "/icons/badge-96.png",
  "tag": "txn-<取引ID>",
  "url": "/<取引デスク／取引ワークスペースのその取引の URL>"
}
```

| 項目 | 中身 |
|---|---|
| title | 自分の番の文（TD-S1〜S5）。期限が近いときの送り直しは PU-01「{{deadlineLabel}}が近づいています」（確定期限／支払期限／発送期限／確認期限＝`KTN.DEADLINE_LABEL`）。**P90-18 で管理者が編集した文**（プロトタイプは common.js `KTN.NOTICE_DEFS`）。Drupal 側に同じ文言の持ち場を作る |
| body | 《作品名》＋相手（出品者から見て購入者名「〇〇さん」／購入者から見て出品者名）＋「期限 YYYY.MM.DD」。送り直しは2行目に自分の番の文。期限の決め方は transaction-states.md |
| icon | アプリのアイコン |
| badge | Android の通知バーに出す白一色のアイコン（`icons/badge-96.png`・12 章） |
| tag | **取引ごとに1つ**（取引 ID）。同じ取引の通知は新しいもので置き換える。`renotify: true` と組で使う＝付けないと2回目以降が画面に出ず中身が黙って入れ替わる（2026-10-09 にプロトタイプで確認） |
| url | 押したときに開くページ。**ログインしていなければログイン後にそのページへ戻す**（`KTN.authUrl` と同じ戻り先の仕組み） |

- **個人の情報は相手の名前まで**（住所・電話・金額は入れない・2026-10-11 確定）。ロック画面に出るため。
- 送信の設定：TTL は期限までの時間を上限に（期限を過ぎた通知は届けない）、urgency は `high`。

### 7-3. 端末の登録（購読）の持ち方

- **「利用者 × 端末（購読）」で持つ**。保存する項目＝利用者 ID・endpoint・鍵（p256dh・auth）・登録日・最後に送れた日・端末の名前（User-Agent から作る。将来「登録している端末」の一覧を出すため）。
- **1アカウントで出品者と購入者の両方の通知を受け取る**（役割ごとに分けない）。P5-13 のスイッチは1つ。
- **P5-13 に「通知を受け取っている端末」の一覧を出す**（2026-10-11 確定・プロトタイプ作成済み）：端末の名前（登録時の User-Agent から作る。例「Android（Chrome）」「iPhone（ホーム画面の個展なび）」）・登録日・最後に届いた日。今開いている端末には「この端末」の印を付け、オン・オフは上のスイッチで行う（一覧には「外す」を置かない）。ほかの端末は「外す」でその購読を消す（その端末でオンにし直せば戻る）。0台なら「通知を受け取っている端末はありません」。
- サーバーが送信に失敗して **404／410 が返ったら、その購読を消す**（端末側で取り消された・期限切れ）。
- **ログアウトしたら、その端末の購読を消す**（2026-10-11 確定）（同じ端末を別の人が使ったとき、前の人の取引の通知が出ないように）。もう一度ログインしてもオフのまま（本人がオンにし直す）。
- **退会（P5-100）・アカウントの停止で、その人の購読をすべて消す**。
- API（例）：`GET /api/push/subscriptions`（この利用者の端末の一覧）・`POST /api/push/subscriptions`（登録）・`DELETE /api/push/subscriptions/{endpoint のハッシュ}`（取り消し）・`GET /api/push/vapid-public-key`。名前は Drupal 側で決める。

### 7-4. P5-13 のスイッチの動き

**表示の出し分け（ページを開いたとき・上から順に判定）**

| 判定 | 表示（P5-13 にデモバー「この端末」で4通りを用意済み） |
|---|---|
| `serviceWorker`・`PushManager`・`Notification` のどれかが無い | ④ 非対応：スイッチを隠し「この端末・ブラウザでは、プッシュ通知を受け取れません。取引の連絡はメールでお届けします」 |
| iPhone・iPad で、ホーム画面から開いていない（`display-mode: standalone` でも `navigator.standalone` でもない） | ② スイッチを隠し、ホーム画面に追加する案内＋P60-17 |
| `Notification.permission === 'denied'` | ③ スイッチをオフのまま押せなくし、端末の設定で許可する手順＋P60-17 |
| それ以外 | ① スイッチ。**この端末に購読があり、サーバーでこの利用者のものになっていればオン** |

**オンにしたとき**：`Notification.requestPermission()` →「許可」なら `pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })` → サーバーに登録 → オン。「許可しない」なら③に切り替え、スイッチはオフのまま。**オフにしたとき**：`subscription.unsubscribe()` → サーバーから消す。どちらも、サーバーへの送信が失敗したらスイッチを元に戻し、トーストで知らせる。

```javascript
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from([...atob(base64)].map(c => c.charCodeAt(0)));
}
```

### 7-5. すすめる案内カード（`.ktn-pwa-card`）を出すかどうか

置く場所＝LIAISON+ コンソール（P3-15・P4-15）と購入管理（P5-14）のヘッドの直後だけ。HTML・CSS は作成済み（デモバー「スマホの案内」）。

| 判定 | 出し方 |
|---|---|
| パソコン（`navigator.userAgentData?.mobile === false`、無ければ User-Agent で判定） | 出さない |
| 7-4 の④（非対応） | 出さない |
| この端末に購読がある（①でオン） | 出さない |
| × で閉じてから30日以内（localStorage `ktnPwaCardClosedAt` に閉じた日時・端末ごと。読めなければ毎回出してよい） | 出さない |
| iPhone・iPad で、ホーム画面から開いていない | `is-ios`（ホーム画面に追加する手順へ） |
| それ以外 | 通常（「通知設定でオンにする →」で P5-13 へ） |

---

## 8. ホーム画面への追加のすすめ方

- **Android の「インストール」ボタン（`beforeinstallprompt`）は使わない**（2026-10-09）。Android はホーム画面に追加しなくてもプッシュ通知を受け取れ、すすめる目的は通知なので、案内は 7-5 のカードに一本化した。ホーム画面への追加は P60-17 で手順を示し、ブラウザ自身が出す案内に任せる。
- **専用のバナー・ポップアップは作らない**（作業の邪魔をしないため。旧「2〜3ページ見た後・チェックイン後に出す」案は不採用）。
- iPhone は 7-5 の `is-ios` と P5-13 の②で、ホーム画面への追加を案内する。

---

## 9. offline.html とオフライン時の操作

**取引の操作はオンラインのときだけ**（2026-10-09）：購入確定・会場売約済・出品取消・発送の登録・支払い・受取確認など、取引の状態を変える操作は、オフラインのときは押せないようにし、「通信できる場所で操作してください」と出す。オフラインのあいだに貯めて後で送る仕組み（Background Sync）は使わない＝**会場で売れた作品をオンラインでも売ってしまう（二重に売れる）危険があるため**。会場で「会場売約済」にする操作は、通信が戻ったらすぐ行うよう、P70 系のガイドでも案内する。

| ページ | オフラインで押せなくするボタン |
|---|---|
| P3-15／P4-15 LIAISON+ コンソール | 会場売約済・出品取消 |
| P3-16／P4-16 取引デスク | 購入の確定・発送の登録・完了の確認・取引のキャンセル |
| P5-15 取引ワークスペース | お支払い・配送先の登録・受取の確認・取引のキャンセル |
| P6-2 作品（LIAISON+） | 購入の申込 |
| P2-12-1 LIAISON+ 作品管理 | 販売状態・価格の変更 |

- 画面でボタンを止めるのは補助。**二重に売れないことはサーバーが守る**（状態を変える API は、受け取った時点の取引の状態を確かめてから変える）。

**作成済み＝リポジトリ直下の `offline.html`（2026-10-09）**。common.css の `.ktn-offline`（アプリのアイコン・「オフラインです」・説明・LIAISON+ の取引の操作はオンラインのときだけという注意・「再読み込み」＝`.ktn-op-btn--primary`）で作った。サイドバー・ヘッダーは置かない（通信できないあいだはリンクを開けない）、common.js も読まない、noindex。sw.js のインストール時に、このページ・common.css・アイコンを保存しておくこと。下の雛形は作る前の古い案（インライン style・絵文字）で、使わない。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>オフライン — 個展なび</title>
  <link rel="stylesheet" href="/kotennavi-common.css">
</head>
<body>
  <div style="display:flex;flex-direction:column;align-items:center;
              justify-content:center;min-height:100svh;padding:24px;text-align:center;">
    <p style="font-size:2.5rem;margin-bottom:16px">📡</p>
    <h1 style="font-family:var(--fs);font-size:1.2rem;margin-bottom:8px">
      オフラインです
    </h1>
    <p style="color:var(--muted);font-size:.85rem;line-height:1.8;margin-bottom:24px">
      ネットワーク接続を確認してください。<br>
      一度ご覧になったページはオフラインでも閲覧できます。
    </p>
    <button onclick="location.reload()" class="ktn-btn ktn-btn--primary">
      再読み込み
    </button>
  </div>
</body>
</html>
```

---

## 10. 実装チェックリスト（2026-10-11 に今の仕様へ）

### プロトタイプで作成済み（2026-10-09）
- [x] `manifest.json`（パスは相対＝本番の URL に直す）
- [x] 全ページの `<head>` の指定（manifest・theme-color・iPhone 用・apple-touch-icon）
- [x] アイコン：192・512・maskable・apple-touch-icon・通知バー用の白一色 `badge-96`（アプリのアイコンの文字）・ファビコン（12 章）
- [x] 小さいアイコンの見比べ：デモページ `kotennavi_app_icons.html`（タブ・検索結果・通知バーの見本）
- [x] `offline.html`（`.ktn-offline`）
- [x] P5-13 のプッシュの行（端末の状態で4通り）・案内カード `.ktn-pwa-card`（P3-15・P4-15・P5-14）・P60-17・メールの文面（U-02・M-11）
- [x] 通知の中身の組み立て `KTN.pushPayload`（期限が近いときの送り直しを含む）・試しに出す `KTN.pushPreview`
- [x] P5-13 の「通知を受け取っている端末」の一覧（デモデータ）

### フロントエンド（React CSR）
- [ ] manifest・head・アイコン・offline.html のパスを本番の URL に合わせる
- [ ] `sw.js`（5 章）：骨組みと offline.html の保存／公開の API だけ保存／個人・取引の API と状態を変えるリクエストは触らない／push・notificationclick・pushsubscriptionchange
- [ ] Service Worker の登録（6 章）
- [ ] P5-13：表示の出し分けと、オン・オフの処理（7-4）・端末の一覧と「外す」（7-3）
- [ ] 案内カードの出し分け（7-5）
- [ ] **オフラインのとき、取引の状態を変えるボタンを押せなくする**（9 章の一覧）。`navigator.onLine` と `online`／`offline` イベントで切り替え、「通信できる場所で操作してください」と出す。送信が失敗したときも同じ文で知らせる（プロトタイプには未作成）
- [ ] ログアウトでその端末の購読を消す・公開の API の保存を消す（7-3・5 章）

### サーバー（Drupal）
- [ ] VAPID の鍵の作成と保管（秘密鍵はサーバーだけ）・公開鍵を返す API
- [ ] 購読の保存・取り消しの API（7-3）
- [ ] 取引の状態が S1〜S5 に変わったときに送る（7-1・7-2）。文言は P90-18 で管理するものと同じ
- [ ] 期限が近づいても操作がまだのときに送り直す（メール T-09 と同じ時点・PU-01）
- [ ] 夜（22時〜翌8時）は送らず朝8時にまとめて送る（取引ごとに最新の1通・期限を過ぎたものは送らない）
- [ ] 404／410 の購読を消す・退会で全部消す
- [ ] **二重に売れないことはサーバーで守る**：状態を変える API は、受け取った時点の取引の状態を確かめてから変える（画面でボタンを止めるだけでは足りない）
- [ ] https で配信

### 確かめ方（実機）
- [ ] Chrome の開発者ツール「Application」で、manifest・Service Worker・インストールできるかを確認（※ Lighthouse の「PWA」の項目は 2024 年に廃止されたので使えない）
- [ ] Android（Chrome）：ホーム画面に追加して開く・P5-13 でオン・取引の状態を変えて通知が届く・押して取引のページが開く・通知バーのアイコン（「個展なび」の文字）が出る
- [ ] ファビコン：タブに出る・本番公開後に Google の検索結果に出る
- [ ] iPhone（iOS 16.4 以降）：Safari のままでは P5-13 が②になる・ホーム画面から開くとオンにできる・通知が届く
- [ ] 機内モードで：offline.html が出る・一度見た公開のページが出る・取引のボタンが押せない
- [ ] ログアウト後に通知が届かない

---

## 11. iPhone（iOS）への対応（2026-10-09）

| 項目 | iPhone の制約 | 個展なびの対応 |
|---|---|---|
| ホーム画面に追加 | Safari の共有ボタン →「ホーム画面に追加」を利用者が自分で行う（ボタンで促せない） | P60-17 に手順を図で示す。U-02（登録完了）・M-11（LIAISON+ の利用開始）・P11-4 から案内 |
| プッシュ通知 | iOS 16.4 以降で、**ホーム画面に追加した個展なびから開いたときだけ**受け取れる | Safari のまま開いているときは、P5-13 のスイッチの代わりに「ホーム画面に追加すると受け取れます」と P60-17 へ案内。案内カード `.ktn-pwa-card` も同じ文言に替わる（`is-ios`） |
| アイコン | `apple-touch-icon`（180×180px 推奨） | 下の 12 章 |

## 12. アイコン（2026-10-09 作成）

元＝`images/kotennavi-logo5-1.svg`（正方形・ブランド青 #005da7 の地に白の「個展なび」・ユーザー指定）。リポジトリの `icons/` に PNG を書き出した（Edge のヘッドレスで SVG を描画）。

| ファイル | 大きさ | 用途 | 作り方 |
|---|---|---|---|
| `icons/icon-192.png` | 192×192 | ホーム画面（manifest） | ロゴをそのまま |
| `icons/icon-512.png` | 512×512 | インストール・起動画面（manifest） | ロゴをそのまま |
| `icons/icon-maskable.png` | 512×512 | Android の切り抜き用（manifest の `purpose: maskable`） | ロゴを **62%** に縮めて中央に置き、まわりを同じ青で埋めた（文字が中心から半径 40% の円＝切り抜かれても残る範囲に収まる大きさ）。元のロゴの構図のまま縮めたので、文字は少し左上寄り |
| `icons/apple-touch-icon.png` | 180×180 | iPhone のホーム画面（`<link rel="apple-touch-icon">`）。角の丸めは iPhone がする | ロゴをそのまま |

| `icons/badge-96.png` | 96×96 | Android の通知バーに出す小さいアイコン（通知の `badge`）。**白一色＋透明**でなければならない（色は端末が付ける） | **アプリのアイコン（`images/kotennavi-logo5-1.svg`）の青い地を消し、白い文字「個展なび」だけを書き出した**（2026-10-11 ユーザー判断で確定。logo3 の形も試したが、通知の見出しでは丸の中に入るため四角い形は相性が悪く不採用） |
| `icons/favicon.svg`・`favicon-32/48/96.png`・`/favicon.ico` | 32〜96 | ファビコン（タブ・ブックマーク・検索結果） | `images/kotennavi-logo3.svg` をそのまま（ICO は 32・48px の PNG を入れたもの） |

- 本番の配置場所・URL は後工程で決める（manifest の `icons` と `<head>` の指定をそれに合わせる）。ロゴを差し替えたら、同じ大きさで書き出し直す。

---

## 13. 後工程で決めること・引き継ぎの注意（2026-10-11）

### 2026-10-11 に決めたこと（ユーザー確認済み）
- ログアウトでその端末の購読を消す（7-3）。
- 通知の本文に入れる個人の情報は相手の名前まで（7-2）。
- TTL を期限までにする・404／410 の購読を消す（7-2・7-3）。
- 公開の API の応答だけを保存して、一度見たページをオフラインで出す（5 章）。
- **期限が近づいても操作がまだのときに、もう一度送る**（7-1・PU-01）。
- **夜（22時〜翌8時）は送らず、朝8時に送る**（7-1）。
- **P5-13 に「通知を受け取っている端末」の一覧を出す**（7-3・プロトタイプ作成済み）。
- **画面の向きを固定しない**（manifest の `orientation` を外した・3 章）。

### 残っていること
| 項目 | 内容 | 今の扱い |
|---|---|---|

| インストール時の画面の見本 | manifest の `screenshots`（Android のインストール画面を豊かにする） | 入れていない（任意） |

### 引き継ぎで特に気をつけること
1. **通知の文言は P90-18 と同じものを使う**。プッシュ用の文言を別に作らない（notifications.md 3.5）。
2. **二重に売れるのを防ぐのはサーバー**。オフラインでボタンを止めるのは補助（9 章・10 章）。
3. **個人・取引の情報を Service Worker に保存しない**（5 章）。
4. 許可を求めるのは P5-13 でオンにしたときだけ。ページを開いたときに許可のダイアログを出さない。
5. 関係するところ：notifications.md 3.5（決まりの正本）／サービス仕様書 第9章（要約）／P5-13・P3-15・P4-15・P5-14・P60-17（画面）／email-templates.md の U-02・M-11（`{{mobileGuideUrl}}`）／common.js `KTN.pushPayload`・`KTN.pushPreview`・`ktnPwaCard`／handoff 追174-310〜314。
