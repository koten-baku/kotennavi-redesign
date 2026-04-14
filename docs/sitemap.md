# 個展なび・サイトマップ（リエゾン導入後）

## 凡例
- **R**: 閲覧可能
- **W**: 書き込み・操作可能
- **R/W**: 閲覧・書き込み両方可能
- **L**: リエゾン関連ページ
- **L+**: リエゾンプラス関連ページ

## ユーザー種別略称
- **guest**: 未ログインゲスト
- **login**: ログイン済みユーザー
- **user+**: ユーザー（ページオーナー本人）
- **creator**: ユーザー＋クリエイター（ページオーナー本人）
- **gallery**: ユーザー＋ギャラリー（ページオーナー本人）
- **admin**: 管理者

## 画面最大幅
- `--w-article`: 720px　　記事・テキスト・編集フォーム系
- `--w-detail`: 1080px　　コンテンツ下層（2カラム）
- `--w-entity`: 1080px　　コンテンツトップ（1件のエンティティの表紙ページ。下位ページを持つことがある）
- `--w-index`: 1080px　　一覧・検索（複数コンテンツを並べるページ）

---

## P1 トップ

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width |
|---|---|---|---|---|---|---|---|---|---|
| P1 | 個展なびトップ |  | R | R | R | R | R | R | --w-index |

---

## P2 展覧会

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|---|
| P2 | 展覧会概要 |  | R | R | R | R | R | R | --w-entity | kotennavi-p2.html |
| P2-1 | 展覧会-スケジュール |  | R | R | R | R | R | R | --w-detail | kotennavi-p2-1.html |
| P2-2 | 展覧会-開催場所 |  | R | R | R | R | R | R | --w-detail | kotennavi-p2-2.html |
| P2-3 | 展覧会-詳細(関連イベント・在廊・などその他情報) |  | R | R | R | R | R | R | --w-detail | kotennavi-p2-3.html |
| P2-4 | 展覧会-出展者 |  | R | R | R | R | R | R | --w-detail | kotennavi-p2-4.html |
| P2-5 | 展覧会-リエゾン作品一覧 | L | R | R | R | R | R | R | --w-index | kotennavi-p2-5.html |
| P2-5-1 | 展覧会-リエゾンプラス作品一覧 | L+ | R | R | R | R | R | R | --w-index | kotennavi-p2-5-1.html |
| P2-11 | 展覧会-新規/編集/クローン |  |  |  |  | W | W | W | --w-article | # |
| P2-12 | 展覧会-リエゾン作品管理 |  |  |  |  | W | W | W | --w-article | kotennavi-p2-12.html |
| P2-12-1 | 展覧会-リエゾン+作品管理 |  |  |  |  | W | W | W | --w-article | kotennavi-p2-12-1.html |
| P2-13 | 展覧会-記事管理 |  |  |  |  | W | W | W | --w-article | # |
| P2-14 | 展覧会-インサイト |  |  |  |  | W | W | W | --w-article | # |
| P2-15 | 展覧会-広告作成 |  |  |  |  | W | W | W | --w-article | # |
| P2-16 | 展覧会-修正依頼 |  | W | W | W |  |  |  | --w-article | # |
| P2-17 | 展覧会-報告 |  | W | W | W |  |  |  | --w-article | # |

---

## P3 クリエイター

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|---|
| P3 | クリエイター |  | R | R | R | R | R | R | --w-entity | kotennavi-p3.html |
| P3-1 | クリエイター-展覧会アーカイブ |  | R | R | R | R | R | R | --w-detail | # |
| P3-2 | クリエイター-記事一覧 |  | R | R | R | R | R | R | --w-detail | # |
| P3-3 | クリエイター-作品一覧 |  | R | R | R | R | R | R | --w-detail | # |
| P3-11 | クリエイター-編集 |  |  |  |  | W |  | W | --w-article | # |
| P3-12 | クリエイター-インサイト |  |  |  |  | R |  | R | --w-article | # |
| P3-13 | クリエイター-ウオッチャー管理 |  |  |  |  | R/W |  | R/W | --w-article | # |
| P3-14 | クリエイター-ポートフォリオ管理 | L |  |  |  | R/W |  | R/W | --w-article | # |
| P3-15 | クリエイター-リエゾンコンソール | L+ |  |  |  | R/W |  | R/W | --w-detail | # |
| P3-16 | クリエイター-取引デスク | L+ |  |  |  | R/W |  | R/W | --w-detail | # |
| P3-17 | クリエイター販売代金管理 | L+ |  |  |  | R/W |  | R/W | --w-detail | # |

---

## P4 ギャラリー

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|---|
| P4 | ギャラリー |  | R | R | R | R | R | R | --w-entity | # |
| P4-1 | ギャラリー-展覧会アーカイブ |  | R | R | R | R | R | R | --w-detail | # |
| P4-2 | ギャラリー-記事一覧 |  | R | R | R | R | R | R | --w-detail | # |
| P4-11 | ギャラリー-編集 |  |  |  |  |  | W | W | --w-article | # |
| P4-12 | ギャラリー-インサイト |  |  |  |  |  | R | R | --w-article | # |
| P4-13 | ギャラリー-ウオッチャー管理 |  |  |  |  |  | R/W | R/W | --w-article | # |

---

## P5 ユーザー

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|---|
| P5 | ユーザー-展覧会カレンダー |  | R | R | R | R | R | R | --w-entity | # |
| P5-1 | ユーザー-ウオッチリスト |  | R | R | R | R | R | R | --w-detail | # |
| P5-2 | ユーザー-チェックイン記録 |  | R | R | R | R | R | R | --w-detail | # |
| P5-3 | ユーザー-興味あり!リスト |  | R | R | R | R | R | R | --w-detail | # |
| P5-4 | ユーザー-保存した検索条件 |  |  |  | R |  |  | R | --w-index | # |
| P5-11 | ユーザー-編集 |  |  |  | W |  |  | W | --w-article | # |
| P5-12 | ユーザー-パスワード管理 |  |  |  | R/W |  |  | R/W | --w-article | # |
| P5-13 | ユーザー-メール通知管理 |  |  |  | R/W |  |  | R/W | --w-article | # |
| P5-14 | ユーザー-購入ダッシュボード | L+ |  |  | R/W |  |  | R/W | --w-article | # |
| P5-15 | ユーザー-取引ワークスペース | L+ |  |  | R/W |  |  | R/W | --w-detail | # |
| P5-16 | ユーザー-取引ワークスペース-支払 | L+ |  |  | R/W |  |  | R/W | --w-detail | # |
| P5-100 | ユーザー-退会 |  |  |  | R/W |  |  | R/W | --w-article | # |

---

## P6 作品

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|--|
| P6 | 作品 |  | R | R | R | R | R | R | --w-entity | kotennavi-p6.html |
| P6-1 | 作品-リエゾン出品時 | L | R | R | R | R | R | R | --w-entity | kotennavi-p6-1.html |
| P6-2 | 作品-リエゾンプラス出品時 | L+ | R | R | R | R | R | R | --w-entity | kotennavi-p6-2.html |
| P6-11 | 作品-新規/編集/クローン |  |  |  |  | W |  | W | --w-article | # |
| P6-12 | 作品-インサイト |  |  |  |  | R |  | R | --w-article | # |
| P6-13 | 作品-問合せ | L |  | W | W |  | W | R | --w-article | # |
| P6-14 | 作品-問合せへの回答 | L |  |  |  | R/W |  | R/W | --w-article | # |

---

## P7 記事

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|--|
| P7 | 記事 |  | R | R | R | R | R | R | --w-entity | # |
| P7-11 | 記事-新規/編集/クローン |  |  |  |  | W | W | W | --w-article | # |

---

## P8 レビュー

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|--|
| P8 | レビュー |  | R | R | R | R | R | R | --w-entity | # |
| P8-11 | レビュー-新規/編集/クローン |  |  |  | W |  |  | W | --w-article | # |

---


## P10 検索・特集

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|--|
| P10 | 検索-展覧会 |  | R | R | R | R | R | R | --w-index | # |
| P10-1 | 検索-作品 |  |  | R | R | R | R | R | --w-index | # |
| P10-2 | 検索-クリエイター |  |  | R | R | R | R | R | --w-index | # |
| P10-3 | 検索-ギャラリー |  |  | R | R | R | R | R | --w-index | # |
| P10-4 | 特集-展覧会 |  | R | R | R | R | R | R/W | --w-detail | # |
| P10-5 | 特集-作品 |  | R | R | R | R | R | R/W | --w-detail | # |
| P10-6 | 特集-クリエイター |  | R | R | R | R | R | R/W | --w-detail | # |
| P10-7 | 特集-ギャラリー |  | R | R | R | R | R | R/W | --w-detail | # |

---

## P11 認証・申込

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|--|
| P11 | ログイン |  | W |  |  |  |  |  | --w-article | # |
| P11-1 | ユーザー新規登録 |  | W |  |  |  |  |  | --w-article | # |
| P11-2 | クリエイター機能申込 |  |  | W |  |  |  |  | --w-article | # |
| P11-3 | ギャラリー機能申込 |  |  | W |  |  |  |  | --w-article | # |
| P11-4 | リエゾンプラス機能申込 |  |  |  |  | W |  |  | --w-article | # |
| P11-11 | ログイン-パスワードを忘れた方 |  | W |  |  |  |  |  | --w-article | # |
| P11-12 | ログインパスワード再設定 |  | W |  |  |  |  |  | --w-article | # |
| P11-21 | ユーザー新規登録-アカウント仮登録完了 |  | R |  |  |  |  |  | --w-article | # |
| P11-22 | ユーザー新規登録-メールアドレス確認完了 |  | R |  |  |  |  |  | --w-article | # |
| P11-23 | ユーザー新規登録-パスワード設定 |  | W |  |  |  |  |  | --w-article | # |
| P11-24 | ユーザー新規登録-ウオッチ対象の選択 |  | W |  |  |  |  |  | --w-article | # |

---

## P60 ガイド・法的ページ

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|--|
| P60 | ご利用ガイド |  | R | R | R | R | R | R/W | --w-index | # |
| P60-1 | 展覧会情報を探したい方 |  | R | R | R | R | R | R/W | --w-article | # |
| P60-2 | 展覧会情報を掲載したい方 |  | R | R | R | R | R | R/W | --w-article | # |
| P60-3 | 広告を出したい方 |  | R | R | R | R | R | R/W | --w-article | # |
| P60-4 | よくある質問-一般 |  | R | R | R | R | R | R/W | --w-article | # |
| P60-5 | よくある質問-ユーザー編 |  |  | R | R | R | R | R/W | --w-article | # |
| P60-6 | よくある質問-クリエイター編 |  |  |  |  | R |  | R/W | --w-article | # |
| P60-7 | よくある質問-ギャラリー編 |  |  |  |  |  | R | R/W | --w-article | # |
| P60-8 | 個展なびとは |  | R | R | R | R | R | R/W | --w-article | # |
| P60-9 | 利用規約 |  | R | R | R | R | R | R/W | --w-article | # |
| P60-10 | プライバシポリシー |  | R | R | R | R | R | R/W | --w-article | # |
| P60-11 | お問合わせ |  | W | W | W | W | W |  | --w-article | # |
| P60-12 | サービス機能改善要望 |  | W | W | W | W | W |  | --w-article | # |

---

## P61 お知らせ

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|--|
| P61 | お知らせ一覧 |  | R | R | R | R | R | R | --w-index | # |
| P61-1 | ニュース |  | R | R | R | R | R | R | --w-article | # |
| P61-11 | ニュース-新規/編集/クローン |  |  |  |  |  |  | W | --w-article | # |

---

## P70 リエゾンガイド

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|--|
| P70 | リエゾンとは | L,L+ | R | R | R | R | R | R/W | --w-article | # |
| P70-1 | リエゾン-作品出品ガイド | L |  |  |  | R |  | R/W | --w-article | # |
| P70-2 | リエゾンプラス-作品販売ガイド | L+ |  |  |  | R |  | R/W | --w-article | # |
| P70-3 | 作品購入までの流れ | L+ | R | R | R | R | R | R/W | --w-article | # |
| P70-4 | 送料・配送について | L+ | R | R | R | R | R | R/W | --w-article | # |
| P70-5 | 送料一覧 | L+ | R | R | R | R | R | R/W | --w-article | # |
| P70-6 | 特定商取引法に基づく表示 | L+ | R | R | R | R | R | R/W | --w-article | # |
| P70-7 | リエゾンプラスの手数料について | L+ |  |  | R | R |  | R/W | --w-article | # |
| P70-8 | ギャラリーへの説明ガイド | L,L+ |  |  | R | R |  | R/W | --w-article | # |
| P70-9 | 作品画像撮影ガイド | L,L+ |  |  | R | R |  | R/W | --w-article | # |

---

## P90 管理者

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file |
|---|---|---|---|---|---|---|---|---|---|--|
| P90 | 管理者メニュー |  |  |  |  |  |  | R/W | --w-index | # |
| P90-1 | 管理者-ユーザー新規/クローン |  |  |  |  |  |  | R/W | --w-article | # |
| P90-2 | 管理者-クリエイター/ギャラリー機能申込管理 |  |  |  |  |  |  | R/W | --w-article | # |
| P90-3 | 管理者-展覧会新規 |  |  |  |  |  |  | R/W | --w-article | # |
| P90-4 | 管理者-本日開催・公開の展覧会一覧 |  |  |  |  |  |  | R/W | --w-article | # |
| P90-5 | 管理者-未公開の展覧会一覧 |  |  |  |  |  |  | R/W | --w-article | # |
| P90-6 | 管理者-最新の展覧会一覧 |  |  |  |  |  |  | R/W | --w-article | # |
| P90-7 | 管理者-クリエイター新規/クローン |  |  |  |  |  |  | R/W | --w-article | # |
| P90-8 | 管理者-ギャラリー新規/クローン |  |  |  |  |  |  | R/W | --w-article | # |
| P90-9 | 管理者-メールテンプレート管理 |  |  |  |  |  |  | R/W | --w-article | # |
| P90-10 | 管理者-リエゾンプラスダッシュボード | L+ |  |  |  |  |  | R/W | --w-index | # |
| P90-11 | 管理者-リエゾンプラス機能申込管理 | L+ |  |  |  |  |  | R/W | --w-detail | # |
| P90-12 | 管理者-リエゾンプラスコンソール | L+ |  |  |  |  |  | R/W | --w-detail | # |
| P90-13 | 管理者-取引デスク | L+ |  |  |  |  |  | R/W | --w-detail | # |
| P90-14 | 管理者-販売代金管理 | L+ |  |  |  |  |  | R/W | --w-detail | # |
| P90-15 | 管理者-リエゾンプラス申込者一覧 | L+ |  |  |  |  |  | R/W | --w-article | # |
| P90-16 | 管理者-作品購入ユーザー一覧 | L+ |  |  |  |  |  | R/W | --w-article | # |
