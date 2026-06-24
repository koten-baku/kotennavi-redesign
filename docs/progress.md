# 進捗状況

最終更新：2026-06-23

## 現在の作業
**インサイト先行ページ p3-12 制作・p3-11/p3-12 単一ボックス化・p3-15/p4-15 進行中マーカー確定**

- p3-12（クリエイター インサイト）先行ページ作成済（`.ins-*` 名前空間・仕様未確定／レビュー待ち）
- p3-11/p3-12 をタイトル＋本文を1ボックス（`.ktn-mgmt-wrap`）に統合
- p3-15/p4-15 申込者リスト「進行中」を三角マーカー化（塗り色=誰の番／塗り=確定後・中抜き=確定前）✓ユーザーOK

次：p3-11 レビュー後にインサイト横展開（p2-14/p4-12/p6-12）・編集ページ展開（p4-11/p5-11/p6-11）
※ p2-14 命名衝突未解決（common.js は「修正依頼」・sitemap は「インサイト」）
※ P5-16（取引ワークスペース-支払）は廃止 — 決済はStripe外部遷移に変更し、p5-15に支払済（発送待ち）状態を追加済

---

## 完了済み ✅

| ファイル | ページ |
|---|---|
| kotennavi-p2.html | P2 展覧会概要 |
| kotennavi-p2-1.html | P2-1 スケジュール |
| kotennavi-p2-2.html | P2-2 開催場所 |
| kotennavi-p2-3.html | P2-3 詳細 |
| kotennavi-p2-4.html | P2-4 出展者 |
| kotennavi-p2-5.html | P2-5 LIAISON作品一覧（ライト版） |
| kotennavi-p2-5-1.html | P2-5-1 LIAISON+作品一覧（ダーク版） |
| kotennavi-p2-12.html | P2-12 LIAISON作品管理 |
| kotennavi-p2-12-1.html | P2-12-1 LIAISON+作品管理 |
| kotennavi-p6.html | P6 作品詳細（通常版） |
| kotennavi-p6-1.html | P6-1 作品詳細（LIAISON版） |
| kotennavi-p6-2.html | P6-2 作品詳細（LIAISON+版） |
| kotennavi-p3.html | P3 クリエイタートップ |
| kotennavi-p3-1.html | P3-1 展覧会アーカイブ |
| kotennavi-p3-2.html | P3-2 記事一覧 |
| kotennavi-p3-3.html | P3-3 作品一覧 |
| kotennavi-p4.html | P4 ギャラリートップ |
| kotennavi-p4-1.html | P4-1 展覧会アーカイブ |
| kotennavi-p4-2.html | P4-2 記事一覧 |
| kotennavi-p5.html | P5 ユーザートップ（展覧会カレンダー） |
| kotennavi-p5-1.html | P5-1 ウォッチリスト |
| kotennavi-p5-2.html | P5-2 チェックイン記録 |
| kotennavi-p5-3.html | P5-3 興味あり！リスト |
| kotennavi-p5-4.html | P5-4 コレクションルーム |
| kotennavi-p3-15.html | P3-15 LIAISONコンソール（creator管理） |
| kotennavi-p4-15.html | P4-15 LIAISONコンソール（gallery管理） |
| kotennavi-p5-14.html | P5-14 購入履歴（user管理） |
| kotennavi-p5-15.html | P5-15 取引ワークスペース（user管理）✓修正済 |
| kotennavi-p3-16.html | P3-16 取引デスク（creator管理） |
| kotennavi-p4-16.html | P4-16 取引デスク（gallery管理） |
| kotennavi-p2-11.html | P2-11 展覧会フォーム（新規/編集/クローン） |
| kotennavi-p4-18.html | P4-18 取扱作家管理（gallery管理） |
| kotennavi-p11-4.html | P11-4 リエゾンプラス機能申込（creator/gallery分岐） |
| kotennavi-p5-11.html | P5-11 プロフィール編集 |
| kotennavi-p5-12.html | P5-12 パスワード管理 |
| kotennavi-p5-13.html | P5-13 メール通知設定 |
| kotennavi-p70.html | P70 LIAISONとは（サービス紹介） |
| kotennavi-p70-1.html | P70-1 LIAISON作品出品ガイド |
| kotennavi-p70-2.html | P70-2 LIAISON+作品販売ガイド |

---

## 未着手



### その他未着手
| ID | ページ | 備考 |
|---|---|---|
| P1 | トップページ | |
| P10 | 検索 | |
| P2-13〜17 | P2系とりこぼし分 | |
| P3-11〜14・P3-17 | P3系管理ページ（P3-15/16は別枠） | |
| P4-11〜13 | P4系管理ページ（P4-15/16は別枠） | |
| P60 | 静的ページ群 | |

---

## 共通コンポーネント 更新履歴

| 日付 | 内容 |
|---|---|
| 2026-06-23 | p3-15/p4-15 申込者リスト「進行中」マーカー化：テキストバッジ→三角マーカー（`.p315-turn-badge`）・塗り色で誰の番か（赤=自分`--yours`/グレー=相手`--wait`）・形で確定段階（塗り三角=購入確定後/中抜き三角=購入確定前 S1・`:has(.p315-apply-status--stock)`自動判定・CSS mask+currentColorで描画）・申込番号左の透明マージンに絶対配置（`left:-15px`＋行`margin-left:20px`で背景は番号位置から）・第一線基準配置でモバイル折返し時も番号行を指す（`top`固定＋height 1.3rem flex中央・行 align-items:flex-start化）・sr用「進行中」テキストは font-size:0 保持 / p3-12 クリエイターインサイト先行ページ新規作成（`.ins-*`名前空間：ins-kpi/ins-bars/ins-chan/ins-rank/ins-funnel・期間セレクタ・KTN.pages['p3-12']・仕様未確定レビュー待ち） / p3-11・p3-12 をタイトル＋本文1ボックス化（`.ktn-mgmt-wrap`直下の.p211-block/.ins-toolbar/.ktn-section を枠線除去しdivider区切りにフラット化） |
| 2026-06-22 | p5-14 購入管理 エディトリアル・リファインメント：alertバナーをタブ下に移動・ステータス＋期限/申込番号を1行に統合・購入確定待ちに申込番号＋日付表示・コレクション操作を strip から `p514-aw__collect-row` に移設・公開キャンセルと公開をモーダル確認に統一（`p514UnpublishModal`/`p514CollectModal`）・展覧会リンクを LIAISON+ バッジ→「展覧会」テキストラベルに変更＋価格行の下に移動・「コレクションルームへ」ボタンのアイコン＋クラスをボタン規約に準拠・コレクションルーム公開中バッジをユーザーピンク色に変更・strip の `--ghost` ボタンを `ktn-action-btn` に統一・キャンセル系ステータスのラベル整備（申込キャンセル/出品取消/会場売約済）・支払済累計→購入済累計 / p5-4 コレクションルーム：公開中/非公開バッジを非インタラクティブな span に変更・公開中カードに「非公開にする」ボタン・非公開カードに「公開する」ボタン（各モーダル確認付き）/ LIAISON バッジ（.lb-dot）点滅アニメーション廃止・ドット要素削除（common.css + 全 p*.html + cards_*.html + liaison_badges.html）/ 記事カード .exh-link に「展覧会」テキストラベル CSS 追加（cards_content.html・p3-2・p4-2 共通） |
| 2026-06-22 | p3-15/p4-15 エディトリアル・リファインメント：申込バリエーション網羅（申込者キャンセル済/会場売約済/出品取消/S2+での相手待ち）・archive タブヘッダーを期間中展覧会と同構造に統一・精算状況削除・販売代金管理リンクをドロワーに移設・p4-15 ヒーロー`p4-head`修正・タブナビ`p3-tabnav`共用・archive テーブルレスポンシブ横スクロール対応（`p315-archive-table-wrap`・`min-width:520px`・`th white-space:nowrap`・列幅 `min-width` 調整）・p4-15 列順を作品名→作家名に変更・「申込者キャンセル済」テキスト統一・ステータスに期限テキスト統合（自分ターン行のみ）・`p315-txn-row--active .p315-txn-row__link` モバイル全幅ルール削除（ボタン幅を相手待ち行と統一） |
| 2026-06-20 | p3-15/p3-16/p4-15/p4-16/p5-14/p5-15 管理ページ エディトリアル・リファインメント（第2弾）：common.css — `ktn-mgmt-head__desc` を `--rt-size`/`--rt-lh` 変数統一・`p514-aw__title-link` `.75rem→.88rem`・`p515-status__desc` lh を `--rt-lh` 統一・自分ターン時（`--my-turn`）に `.96rem` 強調・`p515-status__body` padding 増加（`16px→20px 16px 24px`）・gap `12→14px`・`p515-cancelled__msg` lh 統一・`p515-modal__desc` `.82→.88rem`・モーダル明細 CSS クラス化（`.p515-modal__detail` 等）・`p315-index-row__name` に `var(--fs)` + `.88rem`・`p315-ops-guide__desc/.lead/.note` 全体サイズUP・`p316-apply-info__row`/`p316-ship-addr__row` padding `5px→8px`・`ktn-op-btn--full` 新設 — HTML — p4-16 から `kotennavi-components.css` 削除・p3-16/p4-16 主アクションボタン `style="width:100%"` → `ktn-op-btn--full` クラス化・購入確定/発送完了モーダルの inline `font-size` → `.p515-modal__detail` クラス化 |
| 2026-06-20 | p3-3 作品一覧 調整：コレクション済みアイコン（`.aw__collected-icon`）をバッジ行内spanに変更（ボタン廃止）・dbarコレクション切替UIと`setP33Coll()`削除・p3-3の通常作品では`.aws`販売ステータスバッジ＋`.aw__sold-ribbon`を非表示（CSS）|
| 2026-06-20 | サブページ共通タブヘッド `.ktn-tab-head` 新設・統一：p3-1/p3-2/p3-3/p4-1/p4-2/p5/p5-1/p5-2/p5-3/p5-4/p2-2/p2-3/p2-4 の13ファイルで旧ページ固有ヘッドクラスを `.ktn-tab-head` / `.ktn-tab-head__title`（1.55rem 600 Shippori）/ `.ktn-tab-head__count` に統一・旧定義（p3-1-head/p3-2-head/p3-3-head/p5-cal-head/p5-1-head/p5-2-head/p5-3-head/p54-head/p2-2-section__head 等）と editorial v2 overrides・mobile breakpoint override を common.css から削除・p3〜p5 タブナビ下〜コンテンツ間隔を p2-4 基準の 32px に統一（`.p3-layout` padding-top / `.p5-wrap` padding-top 変更） |
| 2026-06-17 | p5 エディトリアル・リファインメント：p5.html body class 追加（p5-page）・p5.html/p5-1/p5-2/p5-3 から kotennavi-components.css 削除・全ページの interest/watch ボタンを canonical `handleAction` パターンに統一（classList.toggle → handleAction・data-action 属性追加・SVG を canonical fill="none" 半透明ハートに統一）・p5-1 の watch ボタン SVG を `<use href="#icon-watch">` 禁止パターン → inline SVG に変換（34件）・p5-3 記事カード `itn-btn` → `ktn-icon-btn` に変換（4件） |
| 2026-06-17 | p6/p6-1/p6-2 ダーク＆ライト修正（p2-4 クリエイターカードホバー標準化＝translateY(-1px)+shadow+border-color・パディングアニメ廃止 / p6-2 ダーク修正：CTA リード文・QR帯ダーク化（高特異度 0,4,0 で ktn-cta-widget ルール上書き）・右カラムセクションラベル（cascade 競合修正）・出品者クリエイターカード名＋ジャンル・記事カードタイトル を p6-dark 配下で明示的に白系色指定） |
| 2026-06-16 | エディトリアル・リファインメント v2：バッジ体系刷新（`.cb` 人物→solid+Cinzel白文字・コンテンツ→left-border+Cinzel / `.sb` ステータス→dot prefix+Cinzel・pill型廃止）・タイポグラフィ変数微調整（rt-size .9→.92rem / rt-lh 1.9→2.0）・`ktn-sec-en` Cinzel化・p4.html を p3-tabnav/p3-layout 共通クラス構成に移行・sticky CTAバー追加 / p70.html（LIAISONとは）・p70-1.html（LIAISON出品ガイド・ロール切替）新規作成 / common.js _syncHH をResizeObserver対応に改良・コピーボタン共通ハンドラ追加 / cards_artwork.html：申込ボタン廃止→aw__queue（foot左）に統一 / CLAUDE.md エディトリアルv2仕様セクション追加 |
| 2026-06-13 | ボタン体系v3.1（ユーザー指摘3点）：①記号ルール確定＝末尾「 →」はページ遷移ナビ（ktn-action-btn）に必須・テキスト統一でSVG矢印廃止（p5-14の5リンクをテキスト化・p3-16/p5-15の実行ボタン2件から矢印削除）／先頭「●」＝遷移先に要対応ありのサイン（--alert系でCSS自動付与・p5-14要対応ストリップのナビにもドット追加） ②--danger-outline格上げ＝グレー枠→通常時から赤枠・赤文字（danger系として軽すぎたため）・p5-15「申込をキャンセルする」もsolid→outline化 ③取引ステータスバッジ定義＝先頭ドット＋淡色塗り・枠なし・矢印なし（.p515-status__badgeベースにドット追加・ボタン＝枠＋白背景と形で区別）・buttons_v2.htmlにセクション5「取引ステータスバッジ—見分け方サマリー表」新設・CLAUDE.md/整合性チェック.md同期済み |
| 2026-06-12 | 取引ページ UX改善 第3弾（3項目）＋ボタン体系v3：①売約済説明の移設（p3-16 calloutを1文＋リンクに短縮・p3-15に説明ボックス .p315-ops-guide 新設＝会場売約済/出品取消の使い分けをdl 2項目で説明） ②相手入力/自分入力の視覚識別（.ktn-io-peer/.ktn-io-self/.ktn-io-tag を common.css 末尾に追加・peer＝相手色淡背景＋左3px枠/self＝白＋自分色左枠・ドット付きタグチップ「購入者が入力した内容」等・p3-16は peer=#1a4a88/self=#2a5f7a・p5-15は逆・計10ブロックに適用） ③ボタン体系v3再定義（大原則：solid＝その場で実行される操作専用・ナビの --alert/--alert-dark をsolid→アウトライン＋赤ドット化・hoverでのみ塗り・--dark新設・p3-15 :has()要対応行も同様・会場売約済確定は--danger/--cautionの代表用途は問い合わせる等に変更・横並びルール確定＝1行に色付き1つ/主アクション右端/並列破壊トリガーは両方アウトライン・buttons_v2.html/CLAUDE.md同期済み） |
| 2026-06-12 | 取引ページ UX改善 第2弾（8項目）：①p3-15 会場売約済/出品取消ボタンを価格行から分離し例外操作行（.p315-work-card__ops・ラベル「会場で売れた／出品をやめる場合：」・静かなアウトライン＋hover色分け）に再設計・会場売約済モーダルに確認チェックボックス（申込≥1件時必須・OKは--dangerに変更・チェックまでdisabled）・売約後はlock-infoバッジ書換＋ops行非表示 ②残日数チップ（.ktn-days-chip/--urgent）を5期限表示に追加（p3-16:確定あと14日/発送あと13日/確認あと2日urgent・p5-15:支払あと4日/確認あと12日） ③p5-15キャンセルモーダルに申込順喪失警告強化（現在1番目→キュー最後尾） ④p3-15出品者アクション申込行に期限併記（.p315-apply-row__deadline・:has()で赤強調） ⑤モバイル固定CTA（.ktn-mobile-cta・≤540px・my-turn状態のみsetDemoStateで表示・タップで該当ステータスへスクロール・買側ブルー/売側赤ラベル） ⑥取引番号・追跡番号コピーボタン（.ktn-copy-btn・common.jsに委譲ハンドラ＋トースト・4箇所） ⑦≤400pxでステップラベルを現在ステップのみ表示 ⑧ログ個人情報ブロックに消去予告（CSS ::after・expired時は自動非表示） |
| 2026-06-12 | 取引ページ UI/UX改善（B項目1〜10完了）＋確定期限ルール修正：確定期限＝会期終了3日後または申込3日後の遅い方に統一（p3-16 03.08/p4-16 03.18・CLAUDE.md転記）・p5-15ステップにsellerターン色分け追加（p3-16と対称）・p5-14タブ「取引完了」→「過去の取引」・p3-16に「完了確認待ち（評価なし）」「完了(1週間後・個人情報消去)」デモ状態追加・p5-15発送遅延キャンセル申請FAQ・領収書と個人情報消去の関係明記・取引デスク/取引ワークスペース相互参照FAQ両側追加・p3-16 JS合計計算の旧価格65000→85000修正（2箇所） |
| 2026-06-12 | 取引4ページ（p3-15/p3-16/p5-14/p5-15）整合性改修：状態名対応表確定（S1購入確定待ち〜S5完了確認待ち・CLAUDE.md「LIAISON+ 取引状態名」に転記）・4ページの状態名/ステップラベル/ログイベント名/期限呼称を統一・アーカイブ手数料8%修正（¥14,400/¥13,200）・カノニカルデモストーリー適用（音の輪郭 No.7/AW-C42-1847/¥85,000/TXN-20260221-1847/02.21申込〜03.04完了/山田花子1番目・全2人）・p5-14キャンセルFAQをp5-15実装に一致・FAQ 6段階フロー修正・作品バッジsetDemoState追従（確定以降「売約済」）・「取引デスクへ →」統一＋実リンク化・Stripe表記/受取方法/配送先注記統一・p5-14サマリー¥83,000/2件・p3-15未精算¥120,000に整合・チェック結果は docs/取引ページ整合性チェック.md（A項目対応済/B項目1〜10未着手） |
| 2026-05-18 | p4-18 取扱作家管理（gallery）新規制作：取扱作家一覧（LIAISON+/LIAISON/未設定バッジ）・申請中・招待中セクション・承認/却下ボタン・クリエイター招待フォーム・取扱解除モーダル・管理ドロワー・p418-CSS追加・KTN.pages['p4-18']追加 |
| 2026-05-18 | p11-4 LIAISON+機能申込 新規制作：creator/gallery分岐フォーム・デモバー（role×状態切替）・サービス説明バナー・承諾事項チェックリスト・振込先口座フォーム・利用規約同意・申込/審査中/承認済の3状態・p114-CSS追加・KTN.pages['p11-4']追加 |
| 2026-05-20 | P5-11〜13 新規制作：プロフィール編集（アバター・氏名・ユーザーID・自己紹介・居住地）・パスワード管理（強度インジケーター・表示トグル）・メール通知設定（展覧会/LIAISON+/重要/プロモーション 4カテゴリ・自動保存トースト）・p5-14/15ドロワーリンク修正・p511-CSS/p512-CSS/p513-CSS追加・KTN.pages[p5-11/12/13]追加・管理ページ視覚識別（mgmt-page）対応済 |
| 2026-06-11 | P3・P4 表示系ページ共通化修正確認：スティッキーCTAバー（p3-sticky-cta）p4に追加（IntersectionObserver・ウォッチボタン同期）・common.js _syncHH をResizeObserver対応に更新・components.css min-height フィードバックループ修正（var(--hh)→50px）・p4 ktn-main margin-bottom追加（common.css）・p4 </main>位置修正（ktn-mainの外にrelated section移動→tabnav sticky解放）・p4関連情報セクションをp4-1準拠に再構成（p4-recommended→ktn-ad-band+ktn-related-band+ktn-sub-tags+ktn-sub-rec・.cc→.gcカード・handleAction準拠） |
| 2026-06-06 | P2系表示ページ横断修正：meta description追加（p6/p6-1/p6-2）・CTAリード文から「が気になりますか？」削除・リード文/カウンターラベル/シェアアイコン色をvar(--ink)に統一・p2-1チェックインボタンをktn-btn準拠サイズ/色に修正（past行のopacity子要素移動）・パンくずルール再定義（展覧会→/p10・クリエイター→/p10-2・ギャラリー→/p10-3・作品→/p10-1）・p2-5/p2-5-1の4項目修正（aboutセクションpadding/gap縮小・パンくずLIAISONバッジ削除・SOLD OUT ribbonをaw__sold-ribbon構造に統一・右カラムをp2のasideに置換＋p2-5-1ダークモードCTA追加） |
| 2026-05-22 | 読み物テキスト（--rt-*）全ページ統一：残存していたp2/p3/p4/p5系ヒーロー・下層ページの読み物クラスを一括修正（17クラス）：p4-head__bio-text・p5-head__bio-text・p2-5-about__body・p2-5-about__feature-body・p25-exhibit-desc__text・p25-venue-note__text・p2-5-creator-card__bio・p2-1-cal-card__desc・p2-1-simple-item__desc・p2-3-faq-a・p2-3-inquiry__desc・p2-3-rule__detail・p2-2-access-item__detail・rv-body（2箇所）・cmt-body・p3-about__text・p3-accordion__body-inner・p4-prof-atelier-desc・p4-prof-facility-desc に `font-family:var(--fs)` + `var(--rt-*)` 適用・硬直カラー（#3a3a3a/#555/#3d4d5c等）→ var(--ink) 統一 |
| 2026-05-22 | フォントシステム統一（前セッション分）：--fb/--fs/--fn/--fm/--font-en-name/--font-en-label のCSS変数化・全ページfont-family文字列 → 変数参照に置換（Montserrat 94箇所・Shippori 21箇所）・font-weight:300→400・--rt-size/--rt-lh/--rt-ls/--rt-pre-size 読み物テキスト共通変数新設・管理ページのコンテンツ文字（展覧会名・作品名等）にvar(--fs)適用 |
| 2026-05-20 | mgmt-page管理ページ視覚識別システム（warm beige背景＋ロール色3pxトップバー）・p3-3/p2-5-1/p6-2に取引デスクボタン追加（オーナーログイン時）・ktn-action-btn--alert-dark新設（ダーク背景用オレンジ枠） |
| 2026-05-19 | p4-16 p3-16ラウンド1〜5同期：申込拒否モーダル廃止・購入確定待ちへのターンラベル/callout/carrier select/発送地ルート追加・支払待ちターンラベル/deadline修正・発送待ちターンラベル/carrier select/個人情報注意書き/キャンセル申請追加・受取確認待ちターンラベル/追跡ボタン追加・完了確認待ちターンラベル追加・JS全面更新（rate modal/cancel req/動的confirm） |
| 2026-05-19 | p3-16 修正ラウンド5（2項目）：「取引をキャンセルする」ボタン廃止（モーダル・JS一式削除・購入確定CTAを全幅に変更）・発送待ち「業者名を入力」欄削除（p316TrackingCarrierOtherWrap削除・JS簡略化） |
| 2026-05-19 | p3-16 修正ラウンド4（3項目）：個人情報注意書きを配送先情報ブロック内に組み込み・コントラスト最大化（color:var(--ink)・背景濃化）・発送待ち追跡番号入力欄の横リンクボタン削除・受取確認待ちの追跡情報をp5-15スタイル（配送状況を確認 →テキストリンク）に変更・「申込を断る」→「取引をキャンセルする」（ボタン/モーダルタイトル/モーダル本文/モーダルOK/トースト） |
| 2026-05-19 | p3-16 修正ラウンド3（6項目）：callout文言修正（会場売約済はコンソール操作で全員自動キャンセル）・発送地+配送先ルート表示追加（デフォルトあり）・送料テーブルを業者別モーダルに変更（業者選択と連動）・個人情報注意書きを発送待ちステップに移動（住所/電話番号表示時）・注意書き文字色コントラスト改善（p316-privacy-note/tracking-label/cancel-note）・追跡番号横に追跡情報リンクボタン追加（業者別URL生成） |
| 2026-05-18 | common.js: p4-18エントリ追加・p11-4パンくず修正（"ギャラリー機能申込"→"リエゾンプラス機能申込"） |
| 2026-05-18 | p2-11 展覧会フォーム（新規/編集/クローン）新規制作：9ブロック構成（基本情報・説明・画像・スケジュール・開催場所・会場利用案内・出展クリエイター・LIAISON設定・公開設定）・デモバー（role×mode切替）・タグ入力・ファシリティアコーディオン・LIAISON/+トグル・公開日時指定・sticky送信バー・p211-CSS追加・KTN.pages['p2-11']追加 |
| 2026-05-17 | p4-16 取引デスク（gallery）新規制作：p3-16ベース・ギャラリーテーマ（コッパーブラウン）・Gallery SOIL 渋谷出品・p416-CSS新規なし（p316-*クラス再利用）・KTN.pages['p4-16']追加 |
| 2026-05-17 | p3-16 取引デスク（creator）新規制作：6ステッププログレス（seller/buyer色分け）・7状態デモ・購入作品+購入者パネル・申込情報+配送フォーム（new状態）・配送先+追跡番号入力（paid状態）・購入者レビュー表示+メッセージ（confirming状態）・完了画面・4モーダル・p316-CSS追加・KTN.pages['p3-16']追加 |
| 2026-05-17 | p5-15 修正Round5（5項目）：セクションタイトル日本語化（取引ログ/取引の流れ/購入作品/出品者）・出品者パネル枠線廃止+ジャンル/略歴追加・受取方法選択肢変更（指定なし〜宅配ロッカー）+受取希望時間帯修正・支払ボタン文言戻し・支払完了画面大型化（成功バナー+確認欄大型表示）
| 2026-05-17 | p5-15 修正Round4（5項目）：購入作品+出品者を `p515-purchase-box` に統合（アートEC風・130px画像・170px出品者パネル）・配送フォームに受取方法/希望日時追加・支払ボタンをStripe対応に変更・「発送待ち」状態追加（配送先確認・支払内訳表示）・購入申込コメントを通常コメント形式に変更 |
| 2026-05-17 | p5-15 大幅修正（10項目）：作品カードにバッジ/販売状態追加・取引ログに申込入力内容追加・ステップ2「在庫確認」→「順番待ち」・キャンセルボタン移動（ログ前）＋danger色・支払待ちで配送先フォーム追加・支払期限バナー大型表示・梱包費追加（¥500）・取引コメント欄追加・受取評価フォーム追加・完了確認待ちステート追加（seller待ち）・モーダルtext更新・CSS追加 |
| 2026-05-17 | ボタン共通系 `.ktn-op-btn` 新設（primary/danger/caution/danger-outline/lg/sm）・旧ページ固有ボタンCSS統合・p3-15/p4-15/p5-14/p5-15/p5-3/p3-3 HTML更新・CLAUDE.md反映 |
| 2026-05-17 | p5-3 レスポンシブ修正：LIAISON+フッター背景色・ボタンスタイル統一・モバイル展覧会サムネイル縮小（128px→68px） |
| 2026-05-16 | 作品ID表示追加：p6/p6-1/p6-2（dl外に移動して.p6-specs-id表示修正）・p3-15/p4-15/p5-14/p5-15（.ktn-aw-id管理カードに追加）・共通CSS .ktn-aw-id 追加 |
| 2026-05-16 | p5-15 取引ワークスペース新規制作（6ステッププログレス・4状態デモ・受取確認モーダル・キャンセルモーダル・取引ログ）・p515-CSS追加・KTN.pages['p5-15']追加 |
| 2026-05-16 | アバター形状・枠色共通定義をCLAUDE.mdに追記（USER円形/CREATOR12px角丸/GALLERY4px角丸・badge色outlineで統一） |
| 2026-05-15 | p3-15/p4-15/p5-14 サマリーカード再設計（金額主役・取引完了件数を右配置・取引中列廃止）・インデックスヘッド「取引中の展覧会」に変更・件数表示順修正 |
| 2026-05-15 | p3-15/p4-15 申込行レスポンシブ修正：ステータスバッジ white-space:nowrap・flex-shrink:0 追加・モバイルで番号列非表示・flex-wrap対応 |
| 2026-05-15 | --muted カラー #7a8a99→#5c6b79（コントラスト比 3.5→5.2:1）・ページ説明文フォントサイズ .68/.83rem→.9rem 統一 |
| 2026-05-15 | p5-14 Q&Aセクション追加（購入者視点8項目：申込フロー・在庫確認・キャンセル・支払・発送・受取確認・履歴・トラブル） |
| 2026-05-11 | p4-15 LIAISON+コンソール（ギャラリー版）新規制作・p315-work-card__artistクラス追加・body.p4-15-page CSS追加・KTN.pages['p4-15']追加 |
| 2026-05-11 | p3-15 UI大幅改修：スケジュール行レイアウト再構成・申込内訳84pxインデント・バッジp2-121-lock-info統一・展覧会ヘッダー整理（会期明記・リンク整理）・Q&Aセクション（8項目）追加・ボタン横並び・スマホスケジュールバー改善 |
| 2026-05-09 | p3-15 LIAISONコンソール新規作成（p3-mgmt-drawer・p315-*CSS・KTN.pages['p3-15']追加） |
| 2026-05-09 | 「申込中」販売状態廃止→「販売中 xx人が申込中」表示に統一（p2-5-1/p3/p3-3・pages.js・common.css） |
| 2026-05-06 | p5系全ページ制作・カードSVG fill="currentColor"統一・itn-btn/itn-count追加・p5-cbox__opt追加 |
| 2026-04-29 | p3/p4系下層ページ完了・NEWバッジ・sticky subnav実装 |
