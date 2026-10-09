> **状態（2026-10-09）**：まだどのページにも入れていない（manifest・Service Worker なし＝React 化で作る。アイコンは 2026-10-09 に `icons/` へ作成＝12 章）。PWA が必須であることは `docs/06_リエゾン_サービス仕様書.md` 第9章。**2026-10-09 に今の仕様へ合わせて直した**：プッシュで送る範囲と許可の求め方（notifications.md 3.5 が正）、iPhone への対応（11 章）、オフラインで取引の操作を止める方針（9 章）、個人の情報を含むページはキャッシュしない（5 章）。利用者向けの使い方の案内は P60-17「スマホで個展なびを使う」。

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
| オフライン対応 | 会場内ネットワーク不安定時 | ✅ Service Worker | — |
| インストールプロンプト | ホーム画面追加を促す | ✅ beforeinstallprompt | — |
| プッシュ通知（受信・表示） | 購入申込・取引状況の通知 | ✅ SW push イベント | — |
| プッシュ通知（配信） | イベント発火・送信 | — | ✅ VAPID・Web Push API |
| 購読情報の保存 | ユーザー別の購読管理 | 購読オブジェクトをPOST | ✅ DB保存・管理 |

---

## 2. 納品ファイル構成

```
/
├── manifest.json          ← PWA マニフェスト
├── sw.js                  ← Service Worker
├── offline.html           ← オフラインフォールバックページ
├── icons/
│   ├── icon-192.png       ← ホーム画面アイコン（192×192px）
│   ├── icon-512.png       ← スプラッシュ・インストール用（512×512px）
│   ├── icon-maskable.png  ← Android Adaptive Icon 用（512×512px）
│   └── apple-touch-icon.png ← iPhone のホーム画面用（180×180px）
└── kotennavi-common.js    ← SW登録・インストールプロンプト処理を含む
```

---

## 3. manifest.json

```json
{
  "name": "個展なび",
  "short_name": "個展なび",
  "description": "全国の展覧会・個展情報ポータル",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f0f4f8",
  "theme_color": "#231815",
  "orientation": "portrait-primary",
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

全ページの `<head>` に追加する（ほかに入れるもの＝SEO の head は `docs/html-baseline.md`）。

```html
<!-- PWA -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#231815">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="個展なび">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
```

---

## 5. Service Worker（sw.js）

### キャッシュ戦略

| リソース | 戦略 | 理由 |
|---|---|---|
| HTML（ページ） | Network First | 常に最新情報を優先。失敗時にキャッシュ返却 |
| CSS / JS | Cache First | 変更頻度低・高速化優先。バージョニング必須 |
| 画像 | Cache First | 展覧会・作品画像は容量大のためキャッシュ活用 |
| オフライン時 | `/offline.html` を返却 | 会場内ネットワーク切断に対応 |
| **個人・取引の情報を含むページと API の応答** | **キャッシュしない**（Network Only） | myページ・取引デスク・取引ワークスペース・コンソール・販売代金管理・管理画面など。共有の端末に残さないため／古い取引の状態を見て操作させないため（2026-10-09） |

- CSS／JS はビルドでファイル名にハッシュを付け、古いキャッシュが残らないようにする。画像のキャッシュは件数か容量の上限を決める（展覧会・作品の画像は増え続けるため）。

### sw.js 雛形

```javascript
const CACHE_VERSION = 'v1';
const STATIC_CACHE  = `ktn-static-${CACHE_VERSION}`;
const IMAGE_CACHE   = `ktn-images-${CACHE_VERSION}`;
const OFFLINE_URL   = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/kotennavi-common.css',
  '/kotennavi-common.js',
  '/kotennavi-pages.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// インストール
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// アクティベート（古いキャッシュ削除）
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== STATIC_CACHE && k !== IMAGE_CACHE)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// フェッチ
self.addEventListener('fetch', event => {
  const { request } = event;

  // 画像: Cache First
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(res => {
            cache.put(request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }

  // CSS / JS: Cache First
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request))
    );
    return;
  }

  // ページナビゲーション: Network First + オフラインフォールバック
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }
});

// プッシュ通知受信・表示（配信はDrupal側が担当）
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body:               data.body,
      icon:               '/icons/icon-192.png',
      badge:              '/icons/icon-192.png',
      tag:                data.tag || 'ktn-notification',
      data:               { url: data.url || '/' },
      requireInteraction: data.requireInteraction || false,
    })
  );
});

// 通知クリック → 対象ページを開く
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = event.notification.data.url;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(wins => {
        const existing = wins.find(w => w.url === targetUrl);
        return existing ? existing.focus() : clients.openWindow(targetUrl);
      })
  );
});
```

---

## 6. Service Worker 登録（kotennavi-common.js に追記）

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('[SW] registered:', reg.scope))
      .catch(err => console.warn('[SW] register failed:', err));
  });
}
```

---

## 7. プッシュ通知購読（フロントエンド側の実装）

> **Drupal 側との協議が必要：**  
> VAPID 公開キーの提供方法・購読情報の保存APIエンドポイントを先に確定すること。

呼び出し場所：**P5-13「プッシュ通知（この端末）」のスイッチをオンにしたときだけ**（2026-10-09 確定・notifications.md 3.5）。ページを開いただけで許可を求めない。すすめる案内は、出品者＝LIAISON+ の利用開始後に初めてコンソール（P3-15／P4-15）を開いたとき、購入者＝購入申込の後に出す（押すと P5-13 へ）。※旧記述：P11-4（LIAISON+申込完了）または P3-15（クリエイター-LIAISONコンソール）または P4-14（ギャラリー-LIAISONコンソール）**

```javascript
// vapidPublicKey と apiEndpoint は Drupal 側から取得
async function subscribePush(vapidPublicKey, apiEndpoint) {
  const reg = await navigator.serviceWorker.ready;
  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });
  await fetch(apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}
```

### 通知イベント一覧（Drupal 側でトリガー・参照用・2026-10-09 に今の仕様へ）

**送るのは LIAISON+ の取引で「自分の番」が来たときだけ**（やること TD-01・TD-02）。文言はやることの状態文 TD-S1〜S5（`KTN.NOTICE_DEFS`・P90-18 で編集）をそのまま使う。正本は notifications.md 3.5。

| 状態（取引） | 受け取る人 | 押した先 |
|---|---|---|
| S1 購入確定待ち（申込の順番が来た） | 出品者（クリエイター・ギャラリー） | 取引デスク P3-16／P4-16 |
| S2 支払待ち | 購入者 | 取引ワークスペース P5-15 |
| S3 発送待ち | 出品者 | 取引デスク |
| S4 受取確認待ち | 購入者 | 取引ワークスペース |
| S5 完了確認待ち | 出品者 | 取引デスク |

- 取引の結果（完了・キャンセル・自動取消）・お知らせ・取引メッセージは送らない（メールとサイト内で届く）。※旧表の「キューの順番が来た」「在庫なしキャンセル」は、キューの順位表示の廃止（2026-07-03）・状態名の確定に合わせて上の表に置き換えた。
- 取引のメール（T-xx）は止められない＝プッシュは早く気づくための追加の手段。

---

## 8. インストールプロンプト（kotennavi-common.js に追記）

```javascript
let _deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _deferredPrompt = e;
  document.getElementById('ktnInstallBanner')?.classList.remove('hidden');
});

function KTN_triggerInstall() {
  if (!_deferredPrompt) return;
  _deferredPrompt.prompt();
  _deferredPrompt.userChoice.then(() => {
    _deferredPrompt = null;
    document.getElementById('ktnInstallBanner')?.classList.add('hidden');
  });
}
```

**表示タイミングの推奨**

| タイミング | 理由 |
|---|---|
| 2〜3ページ閲覧後 | 価値を感じてもらってから促す |
| LIAISON+ の利用開始後（M-11 の後）に初めてコンソールを開いたとき | プッシュ通知のために自然な動機がある |
| 購入申込の後 | 購入者として支払い・受取確認の通知を受け取る動機がある |
| チェックイン後 | 会場での利用意欲が高い |

- **iPhone には `beforeinstallprompt` が無い**＝ボタンで追加させられない。同じタイミングで「ホーム画面に追加する方法」の案内（P60-17 へのリンク）を出す（11 章）。
- 出す見た目（バナー等）の部品はまだ無い（デザイン未作成・後工程で作るときは common.css の部品で）。

---

## 9. offline.html とオフライン時の操作

**取引の操作はオンラインのときだけ**（2026-10-09）：購入確定・会場売約済・出品取消・発送の登録・支払い・受取確認など、取引の状態を変える操作は、オフラインのときは押せないようにし、「通信できる場所で操作してください」と出す。オフラインのあいだに貯めて後で送る仕組み（Background Sync）は使わない＝**会場で売れた作品をオンラインでも売ってしまう（二重に売れる）危険があるため**。会場で「会場売約済」にする操作は、通信が戻ったらすぐ行うよう、P70 系のガイドでも案内する。

下の雛形はインライン style と絵文字を使っているが、**実装するときは common.css の部品で作る**（CLAUDE.md の決まり）。

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

## 10. 実装チェックリスト

### フロントエンド（納品時に確認）
- [ ] `manifest.json` が配置され、全ページ `<head>` にリンクされている
- [ ] アイコン3種（192px・512px・maskable）が `/icons/` に配置されている
- [ ] `theme-color`・`background_color` がデザイントークンと一致している
- [ ] `apple-touch-icon` が設定されている
- [ ] `sw.js` が配置され `common.js` から登録されている
- [ ] 静的アセットがインストール時にキャッシュされている
- [ ] オフライン時に `offline.html` が表示される
- [ ] `push` イベントで通知が表示される（Drupalからのテスト送信で確認）
- [ ] インストールプロンプトが表示される（Android Chrome で確認）
- [ ] Lighthouse PWA 監査が全項目グリーン

### Drupal 側との協議事項（バックエンド担当へ）
- [ ] VAPID キーペアの生成・管理方法
- [ ] 購読情報の保存APIエンドポイントの仕様
- [ ] 各通知イベントのトリガー実装
- [ ] https 配信の確認（Service Worker は https のみ動作）

---

## 11. iPhone（iOS）への対応（2026-10-09）

| 項目 | iPhone の制約 | 個展なびの対応 |
|---|---|---|
| ホーム画面に追加 | Safari の共有ボタン →「ホーム画面に追加」を利用者が自分で行う（ボタンで促せない） | P60-17 に手順を図で示す。U-02（登録完了）・M-11（LIAISON+ の利用開始）・P11-4 から案内 |
| プッシュ通知 | iOS 16.4 以降で、**ホーム画面に追加した個展なびから開いたときだけ**受け取れる | Safari のまま開いているときは、P5-13 のスイッチの代わりに「ホーム画面に追加すると受け取れます」と P60-17 へ案内 |
| アイコン | `apple-touch-icon`（180×180px 推奨） | 下の 12 章 |

## 12. アイコン（2026-10-09 作成）

元＝`images/kotennavi-logo5-1.svg`（正方形・ブランド青 #005da7 の地に白の「個展なび」・ユーザー指定）。リポジトリの `icons/` に PNG を書き出した（Edge のヘッドレスで SVG を描画）。

| ファイル | 大きさ | 用途 | 作り方 |
|---|---|---|---|
| `icons/icon-192.png` | 192×192 | ホーム画面（manifest） | ロゴをそのまま |
| `icons/icon-512.png` | 512×512 | インストール・起動画面（manifest） | ロゴをそのまま |
| `icons/icon-maskable.png` | 512×512 | Android の切り抜き用（manifest の `purpose: maskable`） | ロゴを **62%** に縮めて中央に置き、まわりを同じ青で埋めた（文字が中心から半径 40% の円＝切り抜かれても残る範囲に収まる大きさ）。元のロゴの構図のまま縮めたので、文字は少し左上寄り |
| `icons/apple-touch-icon.png` | 180×180 | iPhone のホーム画面（`<link rel="apple-touch-icon">`）。角の丸めは iPhone がする | ロゴをそのまま |

- 本番の配置場所・URL は後工程で決める（manifest の `icons` と `<head>` の指定をそれに合わせる）。ロゴを差し替えたら、同じ大きさで書き出し直す。
