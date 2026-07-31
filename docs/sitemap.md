# 個展なび・サイトマップ（リエゾン導入後）

## 凡例
- **R**: 閲覧可能
- **W**: 書き込み・操作可能
- **R/W**: 閲覧・書き込み両方可能
- **L**: リエゾン関連ページ
- **L+**: リエゾンプラス関連ページ

## 進捗ステータス凡例（2026-07-09 追加）
- **Fix済**: デザイン方針が確定した表示系・取引管理系ページ（以降は微調整のみ）
- **プロトタイプ**: p1・p10。方向性の検証用。最終デザイン方針は全ページ完成後にまとめてFix
- **調整中**: 作成済みだが未Fix。これから細かいチェック・調整に入る
- **整合性のみ**: ガイド系（P70等）。作成済みで、最後に他ページとの整合性チェックのみ行う（内容Fixは後回し）
- **未作成**: HTMLファイル未作成

## ユーザー種別略称
- **guest**: 未ログインゲスト
- **login**: ログイン済みユーザー
- **user+**: ユーザー（ページオーナー本人）
- **creator**: ユーザー＋クリエイター（ページオーナー本人）
- **gallery**: ユーザー＋ギャラリー（ページオーナー本人）
- **admin**: 管理者

## 画面最大幅
- `--w-article`: 760px　　記事・ガイド・テキスト(2026/6/17編集フォーム系を削除・ガイドを追加)
- `--w-detail`: 760px　　編集フォーム系(2026/6/17下位ページ→編集フォームに変更)
- `--w-entity`: 1080px　　コンテンツトップ・下層（2カラム）（2026/6/17表紙ページと下位ページを統合）
- `--w-index`: 1080px　　トップ・検索（複数コンテンツを並べるページ）

---

## P1 トップ

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|
| P1 | 個展なびトップ |  | R | R | R | R | R | R | --w-index | プロトタイプ |

---

## P2 展覧会

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P2 | 展覧会概要 |  | R | R | R | R | R | R | --w-entity | kotennavi-p2.html | Fix済 |
| P2-1 | 展覧会-スケジュール |  | R | R | R | R | R | R | --w-entity | kotennavi-p2-1.html | Fix済 |
| P2-2 | 展覧会-開催場所 |  | R | R | R | R | R | R | --w-entity | kotennavi-p2-2.html | Fix済 |
| P2-3 | 展覧会-詳細(関連イベント・在廊・などその他情報) |  | R | R | R | R | R | R | --w-entity | kotennavi-p2-3.html | Fix済 |
| P2-4 | 展覧会-リエゾン作品一覧 | L | R | R | R | R | R | R | --w-entity | kotennavi-p2-5.html | Fix済 |
| P2-5-1 | 展覧会-リエゾンプラス作品一覧 | L+ | R | R | R | R | R | R | --w-entity | kotennavi-p2-5-1.html | Fix済 |
| P2-6 | 展覧会-作品リスト(会場配布/QRビュー・印刷兼用) | L/L+ | R | R | R | R | R | R | --w-detail | kotennavi-p2-6.html | Fix済 |
| P2-11 | 展覧会-新規/編集/クローン |  |  |  |  | W | W | W | --w-detail | kotennavi-p2-11.html | Fix済 |
| P2-12 | 展覧会-リエゾン作品管理 |  |  |  |  | W | W | W | --w-detail | kotennavi-p2-12.html | Fix済 |
| P2-12-1 | 展覧会-リエゾン+作品管理 |  |  |  |  | W | W | W | --w-detail | kotennavi-p2-12-1.html | Fix済 |
| P2-13 | 展覧会-記事管理 |  |  |  |  | W | W | W | --w-detail | # | 未作成 |
| P2-14 | 展覧会-インサイト |  |  |  |  | W | W | W | --w-detail | # | 未作成 |
| P2-15 | 展覧会-広告作成 |  |  |  |  | W | W | W | --w-detail | # | 未作成 |
| P2-16 | 展覧会-修正依頼 |  | W | W | W |  |  |  | --w-detail | # | 未作成 |
<!-- 「展覧会-報告」は全表示系ページ共通の報告フォーム P60-13「問題を報告する」に統合（2026-07-24）。対象は ?from/?type で受け取るため展覧会固有ページは持たない。 -->

---

## P3 クリエイター

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P3 | クリエイター |  | R | R | R | R | R | R | --w-entity | kotennavi-p3.html | Fix済 |
| P3-1 | クリエイター-展覧会アーカイブ |  | R | R | R | R | R | R | --w-entity | kotennavi-p3-1.html | Fix済 |
| P3-2 | クリエイター-記事一覧 |  | R | R | R | R | R | R | --w-entity | kotennavi-p3-2.html | Fix済 |
| P3-3 | クリエイター-作品一覧 |  | R | R | R | R | R | R | --w-entity| kotennavi-p3-3.html | Fix済 |
| P3-11 | クリエイター-編集 |  |  |  |  | W |  | W | --w-detail | kotennavi-p3-11.html | 調整中 |
| P3-12 | クリエイター-インサイト |  |  |  |  | R |  | R | --w-article | kotennavi-p3-12.html | 調整中 |
| P3-13 | クリエイター-ウオッチャー管理 |  |  |  |  | R/W |  | R/W | --w-detail | # | 未作成 |
| P3-14 | クリエイター-ポートフォリオ管理 | L |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-14.html | Fix済 |
| P3-15 | クリエイター-リエゾン+コンソール | L+ |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-15.html | Fix済 |
| P3-16 | クリエイター-取引デスク | L+ |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-16.html | Fix済 |
| P3-17 | クリエイター販売代金管理 | L+ |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-17.html | Fix済 |
| P3-18 | クリエイター-展覧会管理 | L |  |  |  | R/W |  | R/W | --w-detail | # | 未作成 |

---

## P4 ギャラリー

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P4 | ギャラリー |  | R | R | R | R | R | R | --w-entity | kotennavi-p4.html | Fix済 |
| P4-1 | ギャラリー-展覧会アーカイブ |  | R | R | R | R | R | R | --w-entity | kotennavi-p4-1.html | Fix済 |
| P4-2 | ギャラリー-記事一覧 |  | R | R | R | R | R | R | --w-entity | kotennavi-p4-2.html | Fix済 |
| P4-11 | ギャラリー-編集 | L,L+ |  |  |  |  | W | W | --w-detail | kotennavi-p4-11.html | 調整中 |
| P4-12 | ギャラリー-インサイト |  |  |  |  |  | R | R | --w-article | # | 未作成 |
| P4-13 | ギャラリー-ウオッチャー管理 |  |  |  |  |  | R/W | R/W | --w-detail | # | 未作成 |
| P4-14 | ギャラリー-インベントリー管理 | L,L+ |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-14.html | Fix済 |
| P4-15 | ギャラリー-リエゾン+コンソール | L+ |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-15.html | Fix済 |
| P4-16 | ギャラリー-取引デスク | L+ |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-16.html | Fix済 |
| P4-17 | ギャラリー-販売代金管理 | L+ |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-17.html | Fix済 |
| P4-18 | ギャラリー-展覧会管理 | L |  |  |  |  | R/W | R/W | --w-detail | # | 未作成 |

---

## P5 ユーザー

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P5 | ユーザー-my展覧会カレンダー |  | R | R | R | R | R | R | --w-entity | kotennavi-p5.html | Fix済 |
| P5-1 | ユーザー-myウオッチ |  | R | R | R | R | R | R | --w-entity | kotennavi-p5-1.html | Fix済 |
| P5-2 | ユーザー-myチェックイン |  | R | R | R | R | R | R | --w-entity | kotennavi-p5-2.html | Fix済 |
| P5-3 | ユーザー-my興味あり! |  |  | R | R | R | R | R | --w-entity | kotennavi-p5-3.html | Fix済 |
| P5-4 | ユーザー-myコレクションルーム |  |  | R | R | R | R | R | --w-entity | kotennavi-p5-4.html | Fix済 |
| P5-11 | ユーザー-編集 |  |  |  | W |  |  | W | --w-detail | kotennavi-p5-11.html | 調整中 |
| P5-12 | ユーザー-パスワード管理 |  |  |  | R/W |  |  | R/W | --w-detail | kotennavi-p5-12.html | 調整中 |
| P5-13 | ユーザー-メール通知管理 |  |  |  | R/W |  |  | R/W | --w-detail | kotennavi-p5-13.html | 調整中 |
| P5-14 | ユーザー-購入履歴 | L+ |  |  | R/W |  |  | R/W | --w-detail | kotennavi-p5-14.html | Fix済 |
| P5-15 | ユーザー-取引ワークスペース | L+ |  |  | R/W |  |  | R/W | --w-detail | kotennavi-p5-15.html | Fix済 |
| P5-100 | ユーザー-退会 |  |  |  | R/W |  |  | R/W | --w-detail | # | 未作成 |

---

## P6 作品

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P6 | 作品 |  | R | R | R | R | R | R | --w-entity | kotennavi-p6.html | Fix済 |
| P6-1 | 作品-リエゾン出品時 | L | R | R | R | R | R | R | --w-entity | kotennavi-p6-1.html | Fix済 |
| P6-2 | 作品-リエゾンプラス出品時 | L+ | R | R | R | R | R | R | --w-entity | kotennavi-p6-2.html | Fix済 |
| P6-11 | 作品-新規/編集/クローン |  |  |  |  | W | W | W | --w-detail | kotennavi-p6-11.html | 調整中 |
| P6-12 | 作品-インサイト |  |  |  |  | R |  | R | --w-article | # | 未作成 |
| P6-13 | 作品-問合せ | L |  | W | W |  | W | R | --w-detail | # | 未作成 |
| P6-14 | 作品-問合せへの回答 | L |  |  |  | R/W |  | R/W | --w-detail | # | 未作成 |

---

## P7 記事

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P7 | 記事 |  | R | R | R | R | R | R | --w-entity | # | 未作成 |
| P7-11 | 記事-新規/編集/クローン |  |  |  |  | W | W | W | --w-detail | # | 未作成 |

---

## P8 レビュー

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P8 | レビュー |  | R | R | R | R | R | R | --w-entity | kotennavi-p8.html | Fix済 |
| P8-11 | レビュー-編集 |  |  |  | W |  |  | W | --w-detail | kotennavi-p8-11.html | Fix済 |

---


## P10 検索・特集

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P10 | 検索-展覧会 |  | R | R | R | R | R | R | --w-index | kotennavi-p10.html | プロトタイプ |
| P10-1 | 検索-作品 |  |  | R | R | R | R | R | --w-index | # | 未作成 |
| P10-2 | 検索-クリエイター |  |  | R | R | R | R | R | --w-index | # | 未作成 |
| P10-3 | 検索-ギャラリー |  |  | R | R | R | R | R | --w-index | # | 未作成 |
| P10-4 | 特集-展覧会 |  | R | R | R | R | R | R/W | --w-entity | # | 未作成 |
| P10-5 | 特集-作品 |  | R | R | R | R | R | R/W | --w-entity | # | 未作成 |
| P10-6 | 特集-クリエイター |  | R | R | R | R | R | R/W | --w-entity | # | 未作成 |
| P10-7 | 特集-ギャラリー |  | R | R | R | R | R | R/W | --w-entity | # | 未作成 |

---

## P11 認証・申込

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P11 | ログイン |  | W |  |  |  |  |  | --w-detail | # | 未作成 |
| P11-1 | ユーザー新規登録 |  | W |  |  |  |  |  | --w-detail | # | 未作成 |
| P11-2 | クリエイター機能申込 |  |  | W |  |  |  |  | --w-detail | kotennavi-p11-2.html | 調整中 |
| P11-3 | ギャラリー機能申込 |  |  | W |  |  |  |  | --w-detail | kotennavi-p11-3.html | 調整中 |
| P11-4 | リエゾンプラス機能申込 |  |  |  |  | W | W |  | --w-detail | kotennavi-p11-4.html | Fix済 |
| P11-11 | ログイン-パスワードを忘れた方 |  | W |  |  |  |  |  | --w-detail | # | 未作成 |
| P11-12 | ログインパスワード再設定 |  | W |  |  |  |  |  | --w-detail | # | 未作成 |
| P11-21 | ユーザー新規登録-アカウント仮登録完了 |  | R |  |  |  |  |  | --w-detail | # | 未作成 |
| P11-22 | ユーザー新規登録-メールアドレス確認完了 |  | R |  |  |  |  |  | --w-detail | # | 未作成 |
| P11-23 | ユーザー新規登録-パスワード設定 |  | W |  |  |  |  |  | --w-detail | # | 未作成 |
| P11-24 | ユーザー新規登録-ウオッチ対象の選択 |  | W |  |  |  |  |  | --w-detail | # | 未作成 |

---

## P60 ガイド・法的ページ

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P60 | ご利用ガイド |  | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P60-1 | 展覧会情報を探したい方 |  | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P60-2 | 展覧会情報を掲載したい方 |  | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P60-3 | 広告を出したい方 |  | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P60-4 | よくある質問-一般 |  | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P60-5 | よくある質問-ユーザー編 |  |  | R | R | R | R | R/W | --w-article | # | 未作成 |
| P60-6 | よくある質問-クリエイター編 |  |  |  |  | R |  | R/W | --w-article | # | 整合性のみ |
| P60-7 | よくある質問-ギャラリー編 |  |  |  |  |  | R | R/W | --w-article | # | 整合性のみ |
| P60-8 | 個展なびとは |  | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P60-9 | 利用規約 |  | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P60-10 | プライバシポリシー |  | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P60-11 | お問合わせ |  | W | W | W | W | W |  | --w-detail | kotennavi-p60-11.html | 未確認 |
| P60-12 | サービス機能改善要望 |  | W | W | W | W | W |  | --w-detail | # | 未作成 |
| P60-13 | 問題を報告する |  | W | W | W | W | W |  | --w-detail | # | 未作成 |

---

## P61 お知らせ

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P61 | お知らせ一覧 |  | R | R | R | R | R | R | --w-article | # | 未作成 |
| P61-1 | ニュース |  | R | R | R | R | R | R | --w-article | # | 未作成 |
| P61-11 | ニュース-新規/編集/クローン |  |  |  |  |  |  | W | --w-detail | # | 未作成 |

---

## P70 リエゾンガイド

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P70 | リエゾンとは | L,L+ | R | R | R | R | R | R/W | --w-article | kotennavi-p70.html | 整合性のみ |
| P70-1 | リエゾン-作品出品ガイド | L |  |  |  | R | R | R/W | --w-article | kotennavi-p70-1.html | 整合性のみ |
| P70-2 | リエゾンプラス-作品販売ガイド | L+ |  |  |  | R | R | R/W | --w-article | kotennavi-p70-2.html | 整合性のみ |
| P70-3 | 作品購入までの流れ | L+ | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P70-4 | 送料・配送について | L+ | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P70-6 | 特定商取引法に基づく表示 | L+ | R | R | R | R | R | R/W | --w-article | # | 未作成 |
| P70-7 | リエゾンプラスのサービス利用料について | L+ |  |  | R | R | R | R/W | --w-article | kotennavi-p70-7.html | 整合性のみ |
| P70-8 | ギャラリーへの説明ガイド | L,L+ |  |  | R | R |  | R/W | --w-article | # | 未作成 |
| P70-9 | 作品画像撮影ガイド | L,L+ |  |  | R | R | R | R/W | --w-article | # | 未作成 |
| P70-11 | リエゾンプラス-取引ガイド(購入者編) | L+ |  | R | R | R | R | R/W | --w-article | kotennavi-p70-11.html | 整合性のみ |
| P70-12 | リエゾンプラス-取引ガイド(出品者編) | L+ |  |  |  | R | R | R/W | --w-article | kotennavi-p70-12.html | 整合性のみ |
---

## P90 管理者

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P90 | 管理者メニュー |  |  |  |  |  |  | R/W | --w-detail| # | 未作成 |
| P90-1 | 管理者-ユーザー新規/クローン |  |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-2 | 管理者-クリエイター/ギャラリー機能申込管理 |  |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-3 | 管理者-展覧会新規 |  |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-4 | 管理者-本日開催・公開の展覧会一覧 |  |  |  |  |  |  | R/W | --w-article | # | 未作成 |
| P90-5 | 管理者-未公開の展覧会一覧 |  |  |  |  |  |  | R/W | --w-article | # | 未作成 |
| P90-6 | 管理者-最新の展覧会一覧 |  |  |  |  |  |  | R/W | --w-article | # | 未作成 |
| P90-7 | 管理者-クリエイター新規/クローン |  |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-8 | 管理者-ギャラリー新規/クローン |  |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-9 | 管理者-メールテンプレート管理 |  |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-10 | 管理者-リエゾンプラスダッシュボード | L+ |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-11 | 管理者-リエゾンプラス機能申込管理 | L+ |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-12 | 管理者-リエゾンプラスコンソール | L+ |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-13 | 管理者-取引デスク | L+ |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-14 | 管理者-販売代金管理 | L+ |  |  |  |  |  | R/W | --w-detail | # | 未作成 |
| P90-15 | 管理者-リエゾンプラス申込者一覧 | L+ |  |  |  |  |  | R/W | --w-article | # | 未作成 |
| P90-16 | 管理者-作品購入ユーザー一覧 | L+ |  |  |  |  |  | R/W | --w-article | # | 未作成 |