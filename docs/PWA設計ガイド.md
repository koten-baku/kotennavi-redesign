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
│   └── icon-maskable.png  ← Android Adaptive Icon 用（512×512px）
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
      "name": "マイページ",
      "url": "/p5",
      "icons": [{ "src": "/icons/icon-192.png", "sizes": "192x192" }]
    }
  ],
  "categories": ["lifestyle", "entertainment"]
}
```

---

## 4. 全ページ共通 `<head>` タグ

`page-production-guide.md` §2 の HTML テンプレートに追加する。

```html
<!-- PWA -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#231815">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="個展なび">
<link rel="apple-touch-icon" href="/icons/icon-192.png">
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

呼び出し場所：**P11-4（LIAISON+申込完了）** または **P3-15（LIAISONコンソール）**

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

### 通知イベント一覧（Drupal 側でトリガー・参照用）

| イベント | 通知タイトル（案） | 受信者 |
|---|---|---|
| 購入申込が入った | 「〇〇 に購入申込が届きました」 | クリエイター |
| キューの順番が来た | 「購入手続きへお進みください」 | 購入申込者 |
| 在庫なしキャンセル | 「申込作品の在庫がありませんでした」 | 購入申込者 |
| 取引メッセージ受信 | 「新しいメッセージが届きました」 | クリエイター / 購入者 |

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
| LIAISON+ 申込完了後 | プッシュ通知のために自然な動機がある |
| チェックイン後 | 会場での利用意欲が高い |

---

## 9. offline.html

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
