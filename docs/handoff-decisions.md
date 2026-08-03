# 後工程（React CSR / Drupal）引き継ぎ決定ログ

## このドキュメントの目的
本プロジェクトの最終成果物（HTML/CSS/JS）を入力として、現行システムを **React CSR（フロント・クライアントサイドレンダリング）+ Drupal（バック）** に改修する後工程のための、**追記式（append-only）の決定ログ**。

> ※2026-06-27 訂正：後工程フロントは **CSR**（旧表記「SSR」は誤り）。本ログ内の過去エントリで「React SSR」「サーバ/クライアントで計算」等とある箇所はすべて CSR 前提（期限算出などの計算は API/Drupal が返すデータをもとに**クライアント側**で行う）と読み替える。

- **捕捉は決定時、構造化は後** ── 決めた瞬間に1行追記する。完成後にまとめて作ると文脈が失われ抜け漏れが出るため。
- 制作ルールの正本は引き続き `CLAUDE.md`。本ドキュメントは「変換工程がそのまま読む対応付け」と「コードに残らない判断の理由」を拾う。
- 各エントリ書式：`- YYYY-MM-DD 決定内容（→ 正本へのポインタ）`
- 詳細を重複転記しない。CLAUDE.md / docs の該当箇所を指す。

## 維持ルール
- `docs/progress.md` を更新するのと同じタイミングで、関連する決定を本ファイルにも追記する。
- 新しい共通コンポーネント確定時は「3. コンポーネント → React」に1行追加。
- コードに残らない判断（UI廃止・方針転換・なぜその値か）は「7. 決定の理由メモ」に必ず残す。
- **後工程にファイルを渡すたびに**「リリース履歴（ハンドオフ境界）」へ1セクション追記し、`git tag handoff-YYYY-MM-DD` を打つ。履歴は**1行＝1変更で該当エントリ（追N）と commit hash を指す索引に徹し、全文転記しない**。次回の変更抽出は `git log handoff-前回..HEAD` で行う。

---

## リリース履歴（ハンドオフ境界）
後工程（React CSR / Drupal）に成果物を渡した区切りと、その回に含まれる変更の索引。**新しい回を上に積む。** 各行は該当の決定エントリ（追N）・commit を指すだけ＝詳細は本文を読む。

### 2026-08-03 handoff ｜ 範囲 `handoff-2026-07-22..HEAD`（前回 2026-07-22 分以降）
- **P3-13／P4-13（クリエイター／ギャラリー-オーディエンス管理）新設** → 追補132〜134
- **P3-15「購入者一覧」タブ新設＋ニックネーム化／完了日追記／5列ソート／モバイル2点修正、P4-15へ展開** → 追補135〜138
- **P3-17／P4-17（販売代金管理）・P11-3／P4-11新設・Stripe Connect Express実装確定・LIAISON+精算/取引フロー全面反映** → commit `0a1d133`
- **LIAISON+サービス利用料へ全面改称・本人確認ライフサイクル確定(p11-4)＋p11-2/p60系新設** → commit `90a7113`
- **P7／P7-11（記事詳細/編集）新設・記事管理4画面CRUD(P3-19/P2-13/P4-19/P6-15)実装・管理一覧共通ページング新設** → commit `f14822f`
- **P3-18／P4-18（展覧会管理）新設・リード文簡潔化・種別表示廃止・非公開の一覧除外** → commit `0371aa6`

### 2026-07-22 handoff ｜ 範囲 `7c5e65c..a7bcef8`（前回 2026-07-18 分以降）
- **p6-11 作品編集ページの大幅改修**（作者固定表示・制作年4モード・作品ニュートラル化・下書き復活・充実度UI・「その他」を作品仕様へ統合・額装 clearable・画像キャプション入力）→ 追11〜17 ＋ 2026-07-22 追補群（`a7bcef8`）
- **管理者コメント欄 `.ktn-admin-note` を全 p*-11 編集ページ共通で新設**（p2-11/p3-11/p5-11/p6-11/p8-11・role=admin のみ表示・管理履歴用。p70-11 は公開ガイドで対象外）→ 2026-07-22 追補（`a7bcef8`）
- **表示系の長文フォールバック折り返し**（`overflow-wrap:anywhere` 共通付与＝異常に長いタイトル/名前/キャプション/仕様値対策・入力側は無制限のまま）→ 2026-07-22 追補（`a7bcef8`）
- **p3-14 作品インベントリー管理の新設と p4-14 への横展開**（出品記録/取引完了/作品ID）・p5-4 一カラム化＋公開スイッチ・トグルスイッチ `.ktn-switch` 共通化 → 追6〜7（`7179140`）
- **ジャンル6区分を全ページ統一**・p3-3 作品一覧フィルタ整理・p4-14/p6-11 作者指定文言是正 → 追8〜10（`7179140`）

### 2026-07-18 handoff（前回渡した地点＝基準・`7c5e65c` まで）
- この回以前の変更が前回までの受け渡し分。以降の差分は上記 2026-07-22 セクションを参照。

---

## 1. 状態・ワークフロー契約
変換時に Drupal ワークフロー定義／React state の共通仕様となる。再構築コストが最も高い領域のため最優先で維持する。

- 2026-06-22【seed】LIAISON+ 取引状態を **S1〜S5 / F1〜F2** に確定。状態名は出品者側・購入者側で同一の客観名を使い、「誰の番か」はターンラベル＋色で表現（→ CLAUDE.md「LIAISON+ 取引状態名」表）。
- 2026-06-22【seed】ステップノード6段階＝申込/購入確定/支払/発送/受取確認/完了確認（行為名・「待ち」を付けない）。ログイベント名・期限呼称も同表で確定済み。
- 2026-06-22【seed】期限ルール：確定期限＝**会期終了3日後 or 申込3日後の遅い方**／発送期限＝**会期終了後7日 or 支払後7日の遅い方**（「申込から7日」「支払いから14日」は誤り・使用禁止）。会場優先のための計算式であり、バックエンドのジョブ／通知トリガーに直結。　※2026-06-27 改訂：確定期限は「会期終了7日後 or 申込7日後の遅い方」に変更（本章の最新エントリ参照）。
- 2026-06-22【seed】販売状態5種＝販売中/商談中/売約済/要問合せ/非売品。「申込中」独立バッジは廃止し「販売中＋申込件数表示」に統合（→ CLAUDE.md「リエゾン」節）。
- 2026-06-22【seed】LIAISON+ 手数料：スライディングスケール2段階（〜29,999円=10% / 30,000円〜=8%）。Stripe手数料は内包・利用者非公開。手数料発生は決済完了時のみ（→ CLAUDE.md「LIAISON+ 販売手数料」/ docs/06 第16章）。
- 2026-07-03 **S0「申込済」を新設**（購入確定待ちの手前に分離）。申込時に申込ID＋取引IDを付番し初期状態＝申込済。**確定期限を持たず（表示もしない）・取引ワークスペース（p5-15）に入れない**。申込ID順が到来すると**システムが自動で購入確定待ちへ遷移**（前の申込者のキャンセル/確定で繰り上げ）、そこで初めて確定期限が発生・表示されワークスペースに入れる。Drupal ワークフローに S0→S1 の自動遷移トリガー（前申込者の terminal 化を契機）が必要。確定期限の**算出ルール自体は不変**（会期終了7日後 or 申込7日後の遅い方）、表示のみ S1 到来までゲート（→ CLAUDE.md「LIAISON+ 取引状態名」表 S0 行）。
- 2026-07-03 **キュー順位表示（N番目／全M人）を全面廃止**。申込ID＝順位と誤認されるため。一覧（p5-14）は申込ID#N を軸に表現し、現在の申込総数は申込IDへ括弧併記（`申込ID#N（全M件）`＝"申込"の語の重複回避／表示は申込済・購入確定待ちのみ）・申込日は「申込日」ラベルを付けず日付のみで置き文脈で申込日と読ませる（確定期限は「確定期限」ラベル付きで混同しない）、個別ワークスペース（p5-15）に総数・順位は出さない。申込ID表記は購入者接点・ログで「申込ID#N」に統一（出品者コンソール p3-15/p4-15 は「申込者 M件」ラベルがあるため「#N」継続）。

## 2. データ／フィールド対応（Drupal）
各UI要素がどのエンティティ・フィールドにバインドするか。命名規約のみ先行で決め、HTML側に `data-field` 等の印を付ける方針（実装は後）。

- （未着手・完成と並走して育てる）
- 検討メモ：動的バインド箇所に `data-field="exhibition.title"` 形式、静的文言と区別できるようにする。

## 3. コンポーネント → React 対応
再利用クラス＝Reactコンポーネント候補。variant はそのまま props に落ちる。canonical CSS 行は `kotennavi-common.css`。

| 現行クラス | React名（候補） | variant / props | 主な状態 | canonical |
|---|---|---|---|---|
| `.ktn-more-link` | `<MoreLink>` | text（もっと見る →／展覧会を探す → 等）・href | — | L4369（2026-07-08 旧 .p2-side-nearby__more から共通名化） |
| `.cb-person` / `.cb-content` | `<Badge kind>` | person(creator/gallery/user) / content(exhibition/article/artwork/review/news) | — | L1082 |
| `.sb-*` | `<StatusBadge>` | live/upcoming/soon/ending/closed | pulse(live/ending) | L1285 |
| `.aws-*` | `<SaleBadge>` | sale/negot/sold/inquiry/nsale | pulse(sale) | L2196 |
| `.lb-pill` / `.lb-circle` / `.lb-dot` | `<LiaisonMark>` | pill/circle/dot, plus | — | L1372/1395/1489 |
| `.ktn-btn` | `<PillButton>` | size(なし/lg), on/off, action(watch/interest) | toggle・ゲスト判定 | — |
| `.ktn-icon-btn` | `<IconButton>` | action(watch/interest), on/off | toggle | — |
| `.ktn-action-btn` | `<NavActionButton>` | なし/alert/alert-dark/dark/ghost | 要対応(:has) | — |
| `.ktn-op-btn` | `<OpButton>` | primary/danger/caution/danger-outline, sm/lg | disabled | — |
| `.ec` / `.aw` / `.cc` / `.gc` / `.uc` | `<ExhibitionCard>` 他 | — | hover, dark(.p251-dark/.p6-dark) | カード共通ルール参照 |
| `.ktn-mgmt-head` | `<MgmtHead>` | back/en/meta/desc | — | L9680〜 |
| `.ktn-txn-help` | `<TxnSupportLinks state role>` | 2リンク固定：①ガイド参照（state動的・`.ktn-guide-link`→p70-12 seller/p70-11 buyer の phase アンカーへ deep-link 別タブ）②サポート相談（`openContactModal()` をデスク第1階層から直接呼ぶ）。buyer は支払前(applied/payment)のみ「購入をキャンセルする」direct button（`--danger-outline`→`openCancelModal()`）を追加表示 | 全状態で同位置・①ラベル+href が state対応・②固定・buyer cancel は state でトグル | common.css `.ktn-txn-help*`（シート版を置換） |
| `.ktn-txn-help__line` | `<TxnSupportLinks>` 内 | アイコン＋リンク1行。①は `<a>`／②は `<button class="ktn-guide-link">`（button-reset 必要） | — | common.css `.ktn-txn-help__line` |
| `.p70-flow-diagram__item--mine` | `<TxnGuide role>` 内フロー | 読者ロールが操作する STEP を強調（アクター色塗り・border 1.5px、非mineはグレー） | role（buyer=1/3/5・seller=2/4/6） | common.css `.p70-flow-diagram__item--mine*` |
| `.ktn-req` | `<RequiredMark>` or `<FormLabel required>` | フォームラベル末尾の必須マーカー「必須」。前スペース不要（margin-left持ち） | — | common.css `.ktn-req`（`.ktn-txn-help__field-label` 付近） |
| `.p2-12-cand-filter` | `<CandidateFilter>` | 候補パネルの絞り込みバー。検索（count>閾値で progressive 出現）＋作者チップ（galleryのみ・件数付きファセット）を作者軸で統合。JS注入（`#p212CandidateGrid` 直前） | チップ active／検索フォーカス保持／空状態 `.p2-12-cand-empty` | common.css `.p2-12-cand-filter*`（`.p2-12-add-panel__hint` 直後） |
| `.ktn-mgmt-wrap` / `.ktn-mgmt-stack` | `<MgmtBox stacked>` | 白ボックス＋上端3px `--page-accent`＋760px。stacked=カード縦積み（gap20・子を左右20px inset）／非stacked=フラットフォーム（`.p211-block` を枠なし・border-bottom区切りにフラット化＋sticky `.p211-submit-bar` 内包） | 管理・編集17ページ全適用（2026-07-07）。fixedモーダル・状態バナーはボックス外に置く | common.css `.ktn-mgmt-*` |
| `.ktn-txn-alert` / `.p316-action-deadline__soon` | `<TxnDeadlineAlert step>` | 要対応フェーズの期限アラート。間近=soon（赤ドット注意書き）／超過=alert（赤枠バナー）。`.is-on` で開閉 | 「期限−現在時刻」で段階自動算出（near閾値/overdue判定）。my-turn=出品者 new/paid/confirming・購入者 payment/receipt のみ | common.css `.ktn-txn-alert`（`.ktn-days-chip--urgent` 直後 L10787〜） |
| `.p10-preset-rail` / `.p10-preset` | `<PresetRail>` ＋ `<PresetChip>` | P10のタグバー代替。プリセット＝アルゴリズム生成の保存済み検索（`PRESETS` マップ：rail=1がレール表示10本／rail=0が棚もっと見る着地用3本。各`{label,desc,f(x)}`）。クリックで結果ビューへ・再クリックで解除 | active（1本のみ）・index.html SPECIAL_TABS と同キーで送客受け | common.css `.p10-` ブロック（L12622〜） |
| `.p10-chip[data-f]` | `<FilterChip filterKey value>` | `data-f="key:value"`（st/weekend/near/free/area/tag/liaison/type）。key内OR・key間AND。data-f なしチップは視覚トグルのみ（デモ） | is-on・同一data-fの全チップ同期 | 同上 |
| `.p10-shelf` | `<DiscoveryShelf>` | ディスカバリー状態の棚（もうすぐ終了/近く/特集×2/注目/新着）。カードは `.ec`（グリッド）または `.p2-side-ec`（近く）＋もっと見る＝プリセット着地 | クエリ発生で結果ビューに置換 | 同上 |
| `.ktn-form-error` | `<FormErrorPanel>` | 保存時バリデーションエラーの常設パネル（フォームアクション直上の固定位置・トースト不使用）。items=[{message, details[], hint, jumpTarget}]。`__name`＝固有名詞明朝 | hidden トグル（次の保存試行まで常設）・該当フィールド/カードの赤枠強調は併用 | common.css `.ktn-form-error`（`.ktn-listqr__url` 直後・2026-07-18 新設→同日確定・p2-11/p2-12-1 適用済み。Model A inset＝`.ktn-mgmt-wrap > .ktn-form-error`） |
| `.ktn-switch` | `<ToggleSwitch on label>` | ON/OFF直接切替の設定スイッチ（track+knob+状態ラベル）。ON色＝`--page-accent`（ロール色） | `.is-on`・`role="switch"`/`aria-checked` | common.css `.ktn-switch`（P3-14セクション直前・2026-07-20新設。初出＝p3-14 公開/非公開） |
| `.ktn-admin-note` | `<AdminNote>` | 全 p*-11 編集ページ共通の管理者コメント欄（Admin バッジ＋タイトル＋desc＋textarea）＝管理上の対応履歴を記録。管理者スレート `#3a4a5a` 軸で一般フォーム欄と視覚分離。管理者のみ閲覧 | `hidden` 既定・共通 `syncAdminNote()`（`renderAll()` 内）が `role==='admin'` で表示切替＝ページ側結線不要 | common.css `.ktn-admin-note`（`.ktn-form-error` 直後・2026-07-22 新設。設置＝p2-11/p3-11/p5-11/p6-11/p8-11。p70-11 は公開ガイドで対象外） |
| `.p5-side-rel` | `<PickupList>` ＋ `<RecentWatchList>` ＋ `<InterestExhibitionList>` | p5〜p5-4 右カラム末尾の回遊ゾーン。(0)ピックアップ（`.p5-side-rel-pickup`・**ゼロ/他ユーザー表示時のみ**先頭に表示）(a)最近のウォッチ＝ウォッチしたクリエイター/ギャラリー（ウォッチ日降順・limit=3・cb-creator/cb-gallery バッジ付き）(b)最近の興味あり！＝展覧会 limit=3（cb-exhibition バッジ付き）。各「もっと見る →」（`.p2-side-nearby__more` ブロック型）は検索ページ（P10-2/P10-3・P10）へ | zero/other で (0) 表示切替（body class＋CSS） | related-zone grouped selector＋ `.p5-side-rel__*`／`.p5-side-rel-pickup`（L9447〜） |
| `.ktn-steps` / `.ktn-step` | `<Steps current>` ＋ `<Step index label turn>` | 取引フローの逐次ステッププログレス（4〜6ノード＋接続線）。旧 `.p515-step`（p5-15）と `.p316-step`（p3-16/p4-16）を統合し p11-4（4ノード）にも展開。modifier＝`--done`（完了・緑）／`--seller`・`--buyer`（そのページの「自分の番」＝ソリッド塗り。seller は `var(--page-accent)`、buyer は固定 `var(--actor-buyer)` + リング）／`--seller-soft`・`--buyer-soft`（「相手の番」＝控えめtint）／`--future`（未到達）。コンテナ modifier `--sm`＝ノード28px→20pxの縮小版（p5-15 のみ使用） | JS が `step.className` を丸ごと差し替え（`ktn-step ktn-step--{state}`）。turn の物語＝ページのロール視点で自明に決まる（seller固定/buyer固定ではなく「このページの自分」がsolid） | common.css `.ktn-steps`（旧 `.p515-steps` ブロック跡地・2026-07-28 統合） |
| `.ktn-pagination` | `<Pagination page totalPages onGoto>` | 管理一覧（フィルタ/並べ替え併用）の番号式ページング。前へ/番号(先頭・末尾・現在±1のみ・他は「…」省略)/次へ。`totalPages<=1`で自動非表示 | active＝ロール色ソリッド塗り、disabled | common.css `.ktn-pagination`（2026-08-02新設・初出=p3-14/p4-14/p3-19） |

- 2026-06-22【seed】バッジ4原則：single source of truth／**色でなく形で意味を区別**／共通フォントCinzel uppercase／pulseは行動待ち時のみ（→ CLAUDE.md「バッジ設計システム」）。React化後も「variant=色」ではなく「kind=形」を第一軸にする。

## 4. 権限・ロール別表示
React の条件レンダリングと Drupal のアクセス制御の共通の元。

- 2026-06-22【seed】ユーザー種別＝guest / login / user+ / creator / gallery / admin（→ CLAUDE.md「ユーザー種別」）。
- 2026-06-22【seed】管理ページは `.mgmt-page` で識別し、ロール別トップバー色（creator=#2a5f7a / gallery=#8b5e3c / user=#b8608c / admin=#3a4a5a）。React化時は「公開ページ/管理ページ」のレイアウト分岐＋ロールガードに対応（→ CLAUDE.md「管理ページ視覚識別」「適用ページ一覧」）。
- 2026-06-22【seed】creator/gallery 共有ページ（p2-11 / p11-4）は JS の `syncMgmtBar()` でロール動的切替。React化時はロールpropsでの分岐に置換。

## 5. 振る舞い（JS／イベント → React handler）
`kotennavi-common.js` / `kotennavi-pages.js` の挙動を handler／APIコール想定として残す。

- 2026-06-22【seed】`handleAction(el, action)` 経由を徹底（watch/interest）。ゲスト判定→auth modal、ON/OFFトグル、tipテキスト更新を内包。React化時は `useAuthGuard` + サーバーアクション（watch/interest API）に分解。`onclick="classList.toggle"` 直書きは禁止（理由：ゲスト判定・tip更新が動かない）。
- 2026-06-22【seed】`openCheckinModal()` はゲスト判定で auth modal / フォームを自動選択。
- 2026-06-22【seed】ページ別JSは `KTN.pages['{id}']` に登録。React化時はページコンポーネント単位のロジックに対応。

## 6. レイアウト／レスポンシブの動的挙動
- 2026-06-22【seed】`--hh`（ヘッダー高さ）は `_syncHH()` が実測値で上書き（rAF + resize）。sticky要素は `top: calc(var(--dh)+var(--hh))` 経由でハードコード禁止。React化時は **`useLayoutEffect` でのヘッダー高さ計測フック**に置換（→ CLAUDE.md「高さ変数」）。
- 2026-06-22【seed】`--dh`（デモバー高さ34px）は本番では0。デモ専用UI（dbar・setDemoState等）は変換対象外として切り離す。
- 2026-06-22【seed】画面最大幅は CSS変数 `--w-article/720` `--w-detail/760` `--w-entity/1080` `--w-index/1080` で確定。

## 7. 決定の理由メモ（コードに残らない判断）
ルールではなく「なぜそうしたか」。変換工程が判断を要する場面で効く。仕様変更・UI廃止・方針転換を必ずここに残す。

- 2026-07-24 **p70系 LIAISON+ ガイドのデザインを landing 型 `.p70g-` から標準 `.p70-` エディトリアルガイドへ回帰し、差別化はタイトル帯のダーク化のみに限定（ユーザー方針転換）**。経緯＝p70-2（作品販売ガイド）を一時 p70-7 由来の landing 型 `.p70g-`（ダークヒーロー・横セクションナビ・info-box/point-card/料金表/ダークCTA）で作ったが、ユーザー最終判断「やはり p70-1 のデザインに統一。タイトル帯だけリエゾン+の場合はダーク（p6-2）に」。**転換理由**＝ガイド群（p70-1 リエゾン／p70-2 リエゾン+）で本文デザインが2系統に割れると読み手の学習コスト・保守コストが上がる。LIAISON+ の識別は「本文まるごと別デザイン」ではなく**タイトル帯だけダーク**という最小の視覚差で足りる（p6-2 のダーク作品ページと同じ語彙＝LIAISON+＝濃色）。**実装判断**＝(a) `.p70g-*` ブロックは死にCSSにせず全削除、ただし**ゴールドバッジ `.lb-dot-lp-hero` は残置**（ダーク帯上の LIAISON+ 商標として再利用・他ページ横展開も想定）。(b) ダーク化は `.p70-title-band--dark` モディファイア1枚＝`.p70-title-band` の共通レイアウト（幅・padding・子構造）はそのまま継承し、背景グラデ＋子テキストの淡色オーバーライドだけ足す（"同じ役割の値はトークン＋grouped、classは役割で分ける" 思想／将来 React `<Hero variant="dark">`）。(c) landing 型のダークCTA帯は**採らず** `.ktn-guide-nav-card --lp`（p11-4 申込へ）に置換＝タイトル帯とCTAで二重にダーク帯が出るのを避け、遷移導線は全ガイド共通の nav-card に寄せる。**React化時**＝`<GuideTitleBand variant="default|dark">`＋本文は p70 標準コンポーネント（Section/Lead/Body/Callout/DL/StepList/FlowDiagram/Faq）を共有。LIAISON+ ガイドは variant="dark" を渡すだけ。**残**＝承認後に他 p70系 LIAISON+ ページ（P70-11/12・新 P70-3/4/6 等）へ同モディファイアを横展開するか判断。

- 2026-07-18 **フォーム保存エラーの共通仕様を「固定位置の常設パネル」へ転換（`.ktn-form-error` 新設・確認中）**。旧方式＝p2-11 のみ実装で「フィールド赤枠＋右横トースト（自動で消える）＋エラー箇所へスクロール」。**転換理由（ユーザー指示）**＝トーストは消えてしまい内容を読み返せず、複数エラー・複合条件エラー（単一フィールドに紐づかないエラー）の説明を載せられない。新方式＝**フォームアクション（保存/キャンセル）直上の固定位置に常設パネル**（次の保存試行まで残る）＋リッチな項目構造（本文＋詳細行＋解決ヒント＋「該当箇所へ →」ジャンプ）。フィールド側の赤枠強調は補助として併用（パネル＝正・フィールド強調＝所在サイン）。色は取引アラート `.ktn-txn-alert` と同系（エディトリアル赤）で「要対応の赤」の語彙を統一。**実装例＝p2-12-1「販売期間の延長×他展覧会への出品設定の重複」**：期間とリスト内容の組合せで発生するクロスフィールドエラーで、旧方式（フィールド単位）では表現できない代表例として選定。デモ前提として保存済み販売期間を「会期と同じ」に変更（延長操作を再現可能にするため。旧デモの plus2w checked は既に最大でエラーを再現できない）。**React化時**＝`<FormErrorPanel items>` を保存 mutation の失敗レスポンス（バリデーション結果配列）にバインドし、item に anchor（フィールド/セクション ref）を持たせてスクロール。承認後に p2-11 の必須未入力チェックも本パネルへ移行し、トースト方式は廃止予定。

- 2026-07-28 **Stripe Connectのオンボーディング方式をHosted Onboarding（Account Links・リダイレクト方式）に確定（Embedded Componentsは不採用）**。経緯＝Express採用確定（追補㉞）後、Stripe側の連携UIをHosted Onboarding（Stripeのホスト画面へリダイレクト）にするか、Embedded Components（Connect.js経由で個展なびの画面内にStripe公式コンポーネントを埋め込む）にするかをユーザーと相談。**エラー処理の責任分担はどちらの方式でも同一**と確認（フィールド単位の入力バリデーションはどちらもStripe側が担当し個展なびは無関与／セッション切れ等の接続エラーとrequirements不足時のペイアウト制御〔ゲーティング〕はどちらの方式でも個展なびが担当。差はセッション切れの検知方法のみ＝Account Linksは`refresh_url`へのリダイレクト、Embedded Componentsは`onLoadError`的コールバック）。**採用理由**＝(1) 個展なびは小規模運営体制のため、Stripe側の審査要件変更（国別・事業形態別のフォーム項目変化）に自動追従できるHosted Onboardingの方が保守コストが低い。(2) Embedded Componentsは個展なびの画面内に入力フォーム用の枠を確保し、Stripe公式コンポーネントを`appearance` APIで部分的にテーマ合わせする実装が追加で必要になるが、そのメリット（自ドメイン内で完結するUX）は「頻繁に使う画面」でこそ効くものであり、LIAISON+のオンボーディングという一度きり（稀）のフローに投資するほどの必要性は薄いと判断。(3) 「creator/galleryにStripeとの直接契約・操作を要求しない」という絶対条件（Express採用の根拠）は、Stripeの規約同意フォームが一瞬別画面に出る程度のリダイレクト方式でも損なわれない。**画面設計への影響**＝Hosted Onboardingでは実際の入力フォームはStripe側ホスト画面に存在するため、個展なび側の画面には「連携するボタン」＋「連携ステータス表示」のみを置けばよく、現行の`kotennavi-p11-4.html`（Step2フォーム内`#p114StripeConnectBtn`）・`kotennavi-p3-17.html`／`kotennavi-p4-17.html`（C-2.5 Stripe連携ステータス）のデモ実装（ボタン一発で連携済み状態に遷移）はこの前提と一致しており変更不要。**ユーザー理解形成のための追加対応**＝方式確定後、「フローの説明でstripeのアカウントや接続について理解が得られるようにしてほしい」との指示を受け、ボタンを押すと個展なびの外部（Stripe公式ドメイン）へ一時的に移動し、入力完了後は自動的に個展なびへ戻るという体験を明示する説明文を追加（`kotennavi-p11-4.html`の`.p70-dl__dd`「決済パートナーとの連携」＋Step2フォームのヘルプ文、`kotennavi-p3-17.html`／`kotennavi-p4-17.html`の再連携ヘルプ文）。あわせて`kotennavi-common.js` `KTN.QA`に`liaisonplus-apply`カテゴリのLAP-13を新設し、外部サイトへの移動・自動復帰・入力情報はStripe社が保管し個展なびは保持しない旨を明記。**転換理由の核**＝リダイレクトで個展なびの外に一時的に出るという体験自体は変えられない（Hosted Onboarding確定の帰結）ため、体験を隠すのではなく事前に予告することで不安を解消する方針とした。**React化時**＝Account Links発行はDrupalバックエンドAPI（`stripe.accountLinks.create()`相当）呼び出しに対応。`return_url`/`refresh_url`のハンドリングと、`account.updated` webhookを受けた`requirements`ベースのUIゲーティング（`.p317-gated`相当）はサーバー側実装が必須。

- 2026-07-28 **ステッププログレス `.p515-step`（p5-15）／`.p316-step`（p3-16・p4-16）を `.ktn-steps`/`.ktn-step` へ統合し p11-4 にも横展開（ユーザー確認・承認後の実施）**。経緯＝先に p11-4（LIAISON+機能申込）へ「4段階の逐次フローであることを可視化するステッパー」を追加する際、既存の p316-step CSS をそのまま流用したが、その時点で気づいた事実：**p515-step と p316-step は同じ modifier 名（`--seller`/`--buyer`）を持ちながら意味が正反対だった**——p316-step（出品者が見る自分のページ）では `--seller`=ソリッド塗り（自分の番）・`--buyer`=淡tint（相手の番）、p515-step（購入者が見る自分のページ）では逆に `--buyer`=ソリッド塗り（自分の番）・`--seller`=淡tint（相手の番）。ユーザーに一旦 p11-4 のステッパーを見た目で確認してもらった上で「統合をお願いします」の指示を得て実施。**統合方針**＝modifier を「ページ視点」ではなく「視覚的な強さ」で命名し直す：`--seller`/`--buyer`＝常にソリッド塗り（そのページでの「自分の番」を表すときに使う）、`--seller-soft`/`--buyer-soft`＝常に淡tint（「相手の番」を表すときに使う）。旧コードの呼び出し側（`STEP_CFG` 各ページのJS）で、そのページにとって「相手」にあたる状態文字列を `-soft` 付きに置換するだけで、**画素レベルで旧デザインを完全再現**（新規の見た目変更ゼロ）。サイズ差（p316=28pxノード／p515=20pxノード）は `.ktn-steps--sm` という**コンテナ側の縮小オプトイン**として吸収（既定=p316サイズ、p515のみ `--sm` を追加）。モバイルブレークポイント（p515=540px／p316=600px）は最終CSS値が完全一致していたため、差分は誤差とみなし 600px に一本化（唯一の非100%忠実箇所・視覚上の影響は無視できると判断）。**対象4ページ**：p11-4（HTML+JS）・p3-16（HTML+JS）・p4-16（HTML+JS）・p5-15（HTML+JS、コンテナに `--sm` 付与）。**React化時**＝`<Steps>`/`<Step turn="self"|"other" role="seller"|"buyer">` の2軸props（自分/相手 × ロール）に対応。旧の「ページごとに別コンポーネント」実装は不要になる。

- 2026-07-18 **p2-5／p2-5-1 のアクセス期間仕様＋公開前オーナープレビュー（`.p25-preview-band` 新設）**。アクセス期間の正式仕様（ユーザー提示・Drupal/React のアクセス制御に必須）＝**LIAISON：p2-5 は会期開始日〜会期終了日のみ公開／LIAISON+：p2-5-1 は会期開始日〜「オンライン販売終了日 or 会期終了日のいずれか遅い方」まで公開。販売期間外に p6-2 にアクセスした場合は購入申込ボタンを非active にする**。期間外は一般ユーザーに非公開（公開前ページ or 404 相当）だが、**ページオーナー（出品者）には期間前でもページ本体をそのまま見せ、最上部に常設プレビューバンドを出す**（オーナープレビュー方式）。バンドは「本物の見た目のまま確認できる」ことを優先し、モックや別プレビュー画面は作らない。表示内容は**期間全体表示**（開始・終了の両端＋端の由来ラベル「会期開始」「会期終了」「オンライン販売終了」。LIAISON+ は「遅い方まで公開」の注記行付き）＝ユーザー確定。色はエラー赤・ロール色と衝突しない ink 濃色帯＋LIAISON+ 系ゴールド `#c8a96e` のラベル（「非公開状態のシステム表示」の語彙）。**デモはロール連動のみ**（creator/gallery で表示）で期間判定は省略：**本番条件は「現在日時が公開期間外 かつ 閲覧者がオーナー」の AND**（サーバー側で期間・所有権を判定し、一般ユーザーの期間外アクセスはページ自体を返さない）。React 化＝公開ページコンポーネントの先頭に条件付き `<PreviewBand period={start,end,endLabel}>`。

- 2026-07-18 **公開前プレビューの閲覧者に管理者を追加＋p2 期間外の入口開放（ユーザー指示）**。①プレビュー閲覧条件を「オーナー（出品者）のみ」→**「オーナー or 管理者」**へ拡張（ユーザー「管理者も出品者同様に確認できるようにしてほしい」）。本番条件＝「現在日時が公開期間外 かつ（閲覧者がオーナー or 管理者）」。ただし**操作系導線（p2-5-1 の取引デスクへ `.p25c__console-wrap`）はオーナーのみ**＝管理者は閲覧のみで操作導線を出さない。②**p2 側の入口も同条件で開放**：期間外（会期前/終了後）の作品サブナビ・LIAISONバナーCTAは一般には disabled（pointer-events:none）のままだが、オーナー・管理者には**押せるまま状態タグ（近日/展示終了）だけ表示**する（`p2-subnav__item--preview`／`p2-liaison-banner--preview`）。「入口だけ塞がってプレビューに辿り着けない」を防ぐ＝**プレビュー可否の判定は入口（p2）と本体（p2-5/p2-5-1）で必ず同一条件にする**（React では同じ `canPreview(user, exhibition)` ヘルパーを両所で使う）。デモはロール連動（creator/gallery/admin）で期間判定は省略。

- 2026-07-19 **期間外プレビューのタブ表現＝「プレビュー」タグで入口と遷移先を統一（ユーザー指摘で確定）**。上記の入口開放だけでは①p2 のタブが「近日」タグのままで本人に押せることが伝わらない②遷移先 p2-5/p2-5-1 のタブは通常形態で状態表現が不一致、の2点が残った（ユーザー指摘）。→ **canPreview 状態のタブタグは「近日/展示終了」でなく専用の「プレビュー」タグ**（`data-liaison-tag="preview"`・ink地×ゴールド `#c8a96e` 文字＝`.p25-preview-band` バッジと同語彙）に差し替え、**p2（入口）と p2-5/p2-5-1（本体の作品タブ）の両方に同じタグを出す**。タブ本体は通常見た目のままタグだけで区別＝「無効の理由表示（近日）」と「特別な入口の明示（プレビュー）」を同じタグ枠で切り替える設計。React では subnav コンポーネントの liaison item に `state: 'soon'|'ended'|'preview'|null` を渡し、preview 判定は canPreview ヘルパーと同一ソース。

- 2026-07-19 **p2-5／p2-5-1 デモを本番同等の AND 条件へ（公開期間デモモード追加・ユーザー依頼）**。従来デモは期間判定を省略しロールのみでバンド常時表示だったが、デモバーに「公開期間：公開前/公開中/公開終了後」を追加し、**バンド＋作品タブ「プレビュー」タグの表示条件をデモでも「公開期間外 かつ オーナーor管理者」の AND** にした（`window.p25Period`＝'before'|'during'|'after'）。**バンド文言は期間状態で切替**＝公開前「公開前プレビュー／このページは一般公開前のため…」／公開終了後「**公開終了プレビュー**／このページは公開期間を終了したため…」（バッジ・説明とも。期間表示行・注記は共通）。取引デスク導線 `.p25c__console-wrap` は期間に関わらずオーナーのみ（不変）。**React 化**＝`<PreviewBand>` に `state: 'before'|'after'` を渡して badge/desc を出し分け（during は非レンダリング）。期間判定は canPreview と同じくサーバー由来の展覧会期間データを単一ソースにする。

- 2026-07-18 **`.ktn-form-error` 共通化確定＋p2-11 移行（同日ユーザー承認）**。p2-12-1 デモ承認を受け、①p2-11 の必須未入力チェックを本パネルへ移行（旧トースト `KTN.toast('必須項目に未入力があります')` 廃止）。**パネル内容＝件数サマリ行＋フィールド別項目**（「「ラベル名」が未入力です。＋該当箇所へ →」）。ラベル名は `.p211-label` のテキストから `.ktn-req` マーカーを除いて動的取得＝ラベル文言変更に自動追従（二重管理しない）。**jump はフィールド要素参照の閉包バインド**＝p2-11 のフィールドは大半 id を持たないため、id 付与を強制せず DOM 参照で scrollIntoView（React 化では ref を渡す）。`.is-error` 赤枠・アコーディオン自動オープン（出展クリエイター/新規会場）は従来ロジックを維持し、旧「最初のエラーへスクロール」はパネルへのスクロールに置換（エラーの全体像を先に見せ、個別移動は jump に委ねる）。②Model A（wrap 直接子・sticky 送信バー直上）用の汎用 inset `.ktn-mgmt-wrap > .ktn-form-error{margin:20px 20px 16px}` を canonical に追加（下 16px は送信バーの border-top と密着させないため）。③CLAUDE.md「全ページ共通：フォーム保存エラーパネル」節＋component-html.md テンプレート節を新設し正本化。以後の編集・管理ページの保存バリデーションは必ず本パネルを使う（バリデーションエラーのトースト表示は禁止・トーストは成功通知のみ）。

- 2026-07-15 **p5系 修正3件（レビューリンク文言統一／興味あり-記事カードのp3-2化／もうすぐ終了カードへ興味ありCTA付与）のコードに残らない判断**。①**p5-3「興味あり－記事」タブの記事カードを p3-2 と同じ `.lc lc--article` へ寄せる際、`.lc__lead`（抜粋リード文）を付けなかった**＝p5-3 は「興味あり登録済みの記事」を薄いカードで並べる場所で、元データにリード文が無く、変換用に本文抜粋を捏造するのは避けたため（表示系p3-2は記事一覧＝リード有りが正、p5-3は登録リスト＝メタのみで可、という役割差）。**同時に byline から人物バッジ（`cb-person`）を落とした**＝記事の出典が「個展なび編集部／個展なびコラム／個展なびニュース」等の編集主体で、creator/gallery の人物ではないため。**React化時**＝`<ArticleCard variant="full|compact">`（full＝一覧・リード有り／compact＝登録リスト・メタのみ）で出し分け、出典が編集部系のときは person バッジを出さない。旧 `.p5-3-ac*` 専用CSS（9行）は死にコードとして削除し、`#p53AcBox .p5-cbox__body{gap:8px;padding:16px}` のみ残す（`.lc` を縦積みする器の余白）。JS のフィルタ／興味あり解除セレクタは `.p5-3-ac`→`.lc` に付替え（`data-accat` 属性は維持）。②**p5〜p5-4「もうすぐ終了」の `.ec ec--mini` カード（3枚×5ページ＝15枚）へ興味ありCTAを付与。当初 `.p5-side-ending__meta`（会期メタ行＝アンカー外）に置いたが、同日ユーザー指示「p2と同様にカード内タイトルの横に」で `.ec__mini-title-row`（`<a class="ec ec--mini">` 内・タイトル `.ec__mini-title` の隣）へ移設**。**方針転換の理由**＝当初はカード全体がリンクの `<a>` 内に `<button>` を入れ子にすると nested interactive elements（無効HTML）になるのを避けメタ行に出したが、**p2 の `.p2-side-ec` が既に同じ入れ子（アンカー内に興味あり `<button>`）を採っており**、ユーザーは全興味ありCTAの位置をp2に統一したい意向。入れ子でも `handleAction(this,'interest');event.preventDefault()` がアンカーのナビゲーションを抑止するため動作上は成立する（p2実績どおり）＝**サイト内一貫性を nested-interactive 回避より優先**。CSSは `.p5-side-ending` スコープで `.ec__mini-title-row{align-items:flex-start}`＋タイトル `flex:1;min-width:0`＋ボタン26px（`margin-top:-2px` でキャップ高に合わせ右端配置）を追加（共有 `.ec__mini-title-row`＝矢印variantデモには影響させない）。メタ行の `margin-left:auto` ルールは撤去。**なぜ `.p2-side-ec` は対象外か**＝Pickup／最近の興味あり！の `.p2-side-ec` は canonical（component-html.md）時点で既にアンカー内に興味ありボタンを内包済みで二重付与を避けた。**「興味あり＝展覧会カード」「ウォッチ＝人物カード」の役割分担どおり**、付けたのは展覧会カード（`.ec ec--mini`）のみ。**React化時**＝mini exhibition カードのCTAはタイトル行スロットに置き（p2 `.p2-side-ec` と同一の「カード内タイトル横」契約）、興味ありボタンの位置をサイト全体で統一する。③**p5-2 のレビューリンク文言を「レビューを見る →」→「レビュー詳細を見る →」に統一**（p2 チェックイン&レビューの表記に合わせた・文言統一のみ）。静的5箇所＋pages.js の再描画用 `REVIEW_LINK` 定数を同時に直す（編集後の再レンダリングで旧文言に戻らないように）。

- 2026-07-12 **p2-11（展覧会 新規/編集/クローン フォーム）ユーザーレビュー6点の反映＝コードに残らない判断**。①**新規モードの identity strip はオーナーのみ表示**（`ktn-mgmt-context--new`）：編集/クローンは strip に展覧会名を出せるが、新規は展覧会がまだ存在しない＝名札にする対象がない。**strip を消す案は不採用**（管理ページ標準の identity strip 構造を維持したい／「誰が作っているか」の文脈は必要）。代わりに strip 内を `__edit-only`（展覧会名・meta・オーナー行・view リンク）と `__new-only`（オーナーのギャラリーバッジ＋YUGEN Gallery 名＋「新しい展覧会を作成しています」meta）に分け、**CSS 2行**（`.ktn-mgmt-context:not(--new) .__new-only{display:none}` / `.--new .__edit-only{display:none}`）でモード切替。JS 側は `setDemoMode` で `exhBanner.classList.toggle('ktn-mgmt-context--new', mode==='new')` のみ（DOM 生成でなく宣言的トグル＝保守性優先）。**React化時**＝`<MgmtContext>` に `mode="new|edit|clone"` を渡し、new のとき identity をオーナー（作成主体）に差し替える。②**アコーディオン矢印を「→」からシェブロン（下向き）に変更・開くと180°回転**：オプション入力帯（`.p211-sub-link`）は右矢印だと「別ページへ遷移」に見えるが実体はアコーディオン開閉。開閉であることを形で示すため SVG シェブロン＋`.is-open` で `rotate(180deg)`（旧 90deg 指定を是正）。③スケジュール補足プレースホルダーに「祝日はオープン・祝翌日はクローズ」を追記（例文の追加のみ）。**②-2 追加要望＝折りたたまれた任意項目に名札バッジ**：シェブロン化後、ユーザー指摘「折りたたまれた追加項目が分かりにくい／入力したくなる名前・マークが欲しい」。各サブリンクに統一バッジ `.p211-sub-link__opt`「＋ 追加項目」を付与（オーナー色 `--page-accent` で目を引かせる＝入力促進）。**未入力時のみ表示し、入力済み＝既存の緑「✓ 入力あり」チップ、確認済ロック時＝非表示**、で状態を色と文言で区別（＋青系＝未入力の誘い／✓緑＝入力済み）。ヘッド説明文の項目参照も「折りたたまれた追加項目」→「＋ 追加項目 と付いた欄」に変更しバッジと一致させた（記号を変えたら参照文言も必ず合わせる）。**React化時**＝任意フィールドのアコーディオントグルは `state="empty|filled|locked"` で名札（invite バッジ／done チップ／非表示）を出し分けるコンポーネントにする。④**出展クリエイターをオプション項目→必須項目に格上げ**：`OPT_ITEMS`（追加項目メーター）から `p211AccArtist` を除去し、必須フィールド `#p211ArtistReqField`（`.ktn-req`「必須」マーカー付き）に移設。ただしクリエイターは配列管理（`artistList`）で通常のフォーム入力欄を持たないため、`validateRequired` に特例（`artistList.length>0` を filled 判定・エラー時はアコーディオンを自動展開）を追加。⑤**会場・出展クリエイターの選択候補に「確認 ↗」リンクを追加＝ネイティブ `<datalist>` を自作 `.p211-combo` へ置換**：ユーザー要望は「同姓同名・同ジャンルが実在するので、選ぶ前に相手のギャラリー/クリエイターページを確認したい」（p4-14 の picker と同じUX）。**`<datalist>` はリンクを内包できない**ため機能実現不可＝独自のインライン候補ドロップダウン（`initP211Combo` ファクトリで会場・作家に共用）に置換し、各候補に `確認 ↗`（target=_blank・クリックは選択と分離＝early return）＋`選択` ボタンを持たせた。デモデータに衝突ペア（会場＝スペースYUI 東京/京都、作家＝田中 透 ×2 同ジャンル）を入れ、確認リンクの必要性を体現。⑥**リストにない新会場名を入力した時の会場↔詳細の関係明示**：新会場は詳細（住所等）が別アコーディオンに隠れ入力スキップされやすい。**入力中（`input`）は警告ノート表示＋サブリンクを `--need` 強調に留め、確定時（`change`/候補選択）にのみ詳細アコーディオンを自動展開**（毎キーストロークで開くと煩わしいため発火タイミングを分離）。`checkVenueNew()` が既知会場（`VENUE_POOL` 照合）・ロック状態（`demoConfirmed`）を見て判定し、init・`setConfirmed`・`applyVenueRole` の各所で状態を同期。**React化時**＝venue/creator ピッカーは「候補（確認リンク付き）＋自由入力＝新規」の combobox コンポーネントに一般化し、新規入力時は依存フィールド（詳細）へのフォーカス誘導を state 駆動で行う。canonical＝common.css `.p211-combo*`／`.p211-venue-new-note`／`.p211-sub-link--need`。**⑥-2 追加要望（同日）＝新規会場のカナ・住所を「条件付き必須」に**：⑥で新会場入力時に詳細アコーディオンを誘導したが、ユーザー要望「新しい名前を入力したら詳細を開き、カナ・住所を必須にできるか」を受けて条件付き必須化。**登録済み会場を候補選択した場合は登録情報が使われるため任意のまま**、**新会場を自由入力した時だけ**カナ（`#p211VenueKanaField`）・住所（`#p211VenueAddrField`）を必須にする（会場ページを新規作成するために最低限必要な情報だから）。**実装＝`.ktn-req` マーカーの `hidden` トグルで必須状態を表現**：`checkVenueNew` が新会場判定（`isNew`）に連動して `#p211VenueKanaReq`/`#p211VenueAddrReq` を `hidden` 出し入れ、`validateRequired` は走査冒頭で `if(mark.hidden) return` して非該当マーカーをスキップ（＝「必須マーカーが可視な項目だけ検証する」方式で条件付き必須を汎用実装）。住所は複数入力（郵便番号／都道府県 select／番地欄）を持つため特例判定＝**都道府県＋番地欄（最後の text input）が入れば充足・郵便番号は任意**（住所必須を厳しくしすぎない）。**なぜ `hidden` 属性トグルか**＝`.ktn-req` は display を明示しないので UA の `[hidden]{display:none}` がそのまま効き、`.is-on` クラス方式（display 競合回避が必要な要素向け）は不要。**React化時**＝venue picker の「新規入力モード」state に依存フィールド（カナ・住所）の required を bind する条件付きバリデーション。「候補選択＝登録情報流用で任意／自由入力＝新規作成で必須」の分岐をそのまま props 契約にする。**⑦ 追加要望（同日）＝下書き破棄にモーダル確認を挟む**：破棄ボタンが即 `discardDraft()`（localStorage 削除）を実行していたが、下書きは取り消せない削除なので確認モーダル `#p211DiscardModal`（`.p211-modal`・破棄する＝`--danger` 赤）を挟む。`discardDraft()` を `openDiscardModal`／`closeDiscardModal`／`confirmDiscard`（実削除）に分割し、ボタンは `openDiscardModal()` を呼ぶ。**破壊操作は確認モーダル＋確定側 `--danger` で受ける**（CLAUDE.md ボタン系の原則どおり）。**⑧ 追加要望（同日）＝イベント入力から「担当クリエイター」を削除**：イベント項目に担当クリエイター select を持たせていたが不要（イベントは展覧会単位の情報で、担当作家の紐付けは要件外）。静的2ブロック＋JS生成 `addEventRow` から担当クリエイター select＋flex-row を撤去し「詳細・申込URL」を単独フィールド化、不要になった `artistOptions()` ヘルパーを削除。補足文も担当クリエイター前提の記述を除き「複数回セッションは時間欄にまとめる／内容の異なるイベントは分けて追加」に更新。**React化時**＝イベント入力モデルは {タイトル, 日時(自由文), 詳細URL} のみ（担当クリエイター参照は持たない）。

- 2026-07-09 **管理・編集17ページのヘッダーを共通 identity strip（`.ktn-mgmt-context`）へ統一＝展開方式の判断**。背景＝管理ヘッダーが3パターン（人系＝親ヒーロー継承＋公開tabnav／p2-11＝`.p211-exh-banner`／p2-12・p2-12-1＝`.p2-12-banner` 別クラス・逆順）にドリフトし不統一だった。p3-11 で strip を試作しユーザー承認、全17ページへ横展開。**判断①公開ヒーロー＋tabnav を管理画面から外す**＝管理・編集は「フォーム/操作が主役、文脈は最小」が原則。ヒーローの identity（誰の/何のページか）と親リンク機能は strip が継承し、公開タブナビは編集集中・誤操作離脱防止のため除去。**判断②strip はボックスの外・上**（760px中央）＝strip は「このページが扱うエンティティの名札」でありボックス（操作コンテンツの器）とは階層が別。p2-12/p2-12-1 は旧バナーがボックス内にあったのを strip 化と同時にボックス外へ移設（人系と構造を揃えた）。**判断③media variant を2系統**＝人物（`--creator`/`--gallery`/`--user`＝ロール別角丸＋役割色outline）とコンテンツ（`--content`＝素の矩形サムネ・薄枠のみ）。「線/outline＝人物」の意味づけ（ヒーロー左3px線ルールと同じ）を strip でも保つ。**判断④展開は"strip のみ"に限定し getActions 化はしない**（ユーザー明言）＝各ページのヒーロー内管理ボタンを**同じ id のまま strip の actions へ移設**するだけに留め、既存ドロワー（`.p3-mgmt-drawer` 等）＋inline JS binding を温存。**getActions プルダウンへ寄せるのは p3-11 のみ**で、他16ページの getActions 一括化は p1/p10 のデザインFixと同じ後バッチへ deferred（今大量に触ると差分が膨れ、確定前の getActions 仕様に依存が増えるため）。**判断⑤Fix済取引6ページ（p3-15/16・p4-15/16・p5-14/15）も一括対象**（ユーザー選択「全17ページ一括」）＝「Fix済だから触らない」ではヘッダーだけ旧式が残り不統一が固定化するため、同パスで揃えた。**判断⑥ロール動的ページ（p11-4）は strip を JS 生成**＝`syncMgmtBar()` に `CTX` マップ（creator/gallery の media/bg/badge/name/href/view）を持たせ、既存のロール切替（body p3-page/p4-page トグル）と同時に strip DOM を書き換える。p2-11/p6-11 は既存 syncMgmtBar のロール色連動に相乗り。**付随クリーンアップ**＝旧バナーCSS（`.p211-exh-banner*`・`.p2-12-banner*`）を common.css から廃止（strip へ統合）。p3-15/p4-15 に残っていた死んだデモバー「画像：あり/なし」トグル＋JS（`applyHeadImageMode`/`setImg`＝ヒーロー削除で対象を失っていた）を撤去し `P{3,4}_DATA` から `hasImage` を除去。view-link 文言＝creator「クリエイターページへ →」/ gallery「ギャラリーページへ →」/ user「マイページへ →」（「ページを見る」は曖昧というユーザー指摘で確定）。strip↔パンくず帯の間隔＝16px。**React化時**＝`<MgmtContext media role name parentHref meta actions>` の1コンポーネント（media variant＝person(role)/content）を MgmtBox の外・上に置くシェルにする。管理メニューは当面「ボタン＋ドロワー」を actions スロットに載せ、getActions ドロップダウンへの一本化は全ページ確定後に別コンポーネント（`<OwnerMenu>`）として実施。canonical＝common.css `.ktn-mgmt-context*`／正本＝CLAUDE.md「管理ページの identity strip」節。**同日追記＝strip から管理ボタンを撤去**：上記で「strip の actions に 管理 ボタンを id ごと移設」した直後、ユーザー指示「管理ボタンは不要」により**11ページ（p3-12/15/16・p4-15/16/18・p5-11/12/13/14/15）の `.p3-mgmt-btn` を strip から全削除**。strip actions は view リンクのみに。**ドロワー（`.p3-mgmt-drawer`）＋JS結線（null-safe `if(mgmtBtn)`）は残置**するがトリガーを失い休眠状態。管理メニューはヘッダー `getActions()`（p3-11 が先行採用した `dd('オーナーメニュー')` 方式）へ寄せる想定で、その一括化＝ドロワー廃止/結線確定は p1/p10 デザインFixと同じ後続バッチ。**なぜ休眠ドロワーを今消さないか**＝getActions 一括化時に「何を管理メニューに載せるか」の情報源として使うため（先に消すと再収集コスト）。**非人系ページの扱い（同日・案A確定）**＝p2-11・p6-11・p2-12・p2-12-1・p11-4（コンテンツ編集・管理）も別立てにせず、オーナーメニューは人系と共通のヘッダー getActions 1本に寄せる。理由＝編集対象はコンテンツでも操作主体は creator/gallery 本人で、開くメニュー内容（クリエイター/ギャラリーページ・プロフィール編集・展覧会/作品管理・LIAISON+コンソール・インサイト・アカウント設定）が人系と同一だから。creator/gallery 兼用ページ（p2-11/p6-11/p11-4）は getActions もロール別に出し分ける（p11-4 `CTX` と同発想）。**進め方＝(A)**：今は全17ページを「strip＝identity＋view リンクのみ」で確定状態とし、getActions オーナーメニュー実装は人系・非人系まとめて p1/p10 デザインFixと同じ後続一括バッチで行う（非人系だけ先行実装＝案Bは不採用・手戻り回避）。

- 2026-07-09 **非人系（コンテンツ）identity strip にオーナー表示行を追加**（p2-11・p6-11・p2-12・p2-12-1）。ユーザー指示「非人系の場合はオーナーがだれかを表示してほしい」。人系 strip は identity 自体がオーナー（誰のページか）だが、**コンテンツ strip（展覧会・作品）は名札がコンテンツ名なので操作主体が誰か不明**になる。対策＝`__meta` の下に `.ktn-mgmt-context__owner`＝「`Owner`（Cinzel micro-label）＋人物バッジ（`cb cb-person cb-creator`/`cb-gallery`）＋オーナー名（p3/p4 リンク・`--fs`）」を追加。オーナーは**各ページ固有の所有者データに合わせる**（ページ横断の汎用デモペア〔田中透／Gallery SOIL 渋谷〕を機械的に流用しない）。p2-12・p2-12-1 は creator 田中透→p3（HTML直書き）。**p2-11 は仮にギャラリー所有＝gallery YUGEN Gallery→p4 の固定（HTML直書き・ロール切替で変えない）**〔2026-07-09 追記：初版は role動的で共通ヘルパーの汎用ギャラリー「Gallery SOIL 渋谷」を populate していたが、p2-11 の展覧会（松田啓佑展／会場 YUGEN Gallery）と食い違うためユーザー指摘で是正。この展覧会は gallery 所有と確定し固定化、`syncMgmtOwner` 呼び出しを p2-11 から除去〕。**role別 populate が残るのは p6-11 のみ**（作品《オノマトペの庭》＝作家 田中透 のデモが共通ペアと一致）＝共通ヘルパー `KTN.syncMgmtOwner('p611Owner', role)`＋`KTN.MGMT_OWNER` マップが `#p611Owner{Badge,Name}` の className・textContent・href をロール別に書換（既存 syncMgmtBar から呼ぶ）。p11-4 は人系 strip なので対象外。CSSは common.css の `__meta`↔`__actions` 間。**React化時**＝`<MgmtContext>` のコンテンツ variant に `owner={role, name, href}` prop を持たせ、人系 variant では出さない。オーナー名/リンクは編集対象エンティティの所有者データから取得。
- 2026-07-08 **P10レビュー反映＝プリセットのアイコンルール・地図廃止・LIAISON露出強化**。①**プリセットラベルの絵文字アイコンを廃止**：初版の絵文字（📍🖌📷等）は手選びのアドホックで、「特集＝アルゴリズム自動生成」の前提と矛盾（ジャンル内容に応じたアイコンは決定的に自動付与できない）。ルール＝**プリセットラベルはテキストのみ**。例外＝LIAISON プリセットのみ `html` ラベルで商標マーク `lb-dot` を付与（ファセットでなくサービス識別＝ブランド資産のため）。将来アイコンを入れる場合は「主軸ファセット種別→アイコン」の決定的マッピング（area=ピン/日付=カレンダー/価格=チケット/人気=星）に限る。②**地図ビューは廃止**（disabledプレースホルダーも撤去）：実装コスト大で当面予定なし（ユーザー確定）。「近く」チップ＋距離表示が代替。③**LIAISON/LIAISON+ は検索ページで全面露出**（ユーザー指示「新サービスはもっと全面的に出るべき」）：クイックチップ行に昇格（ドロワー内と data-f 同期）＋ディスカバリー棚「オンラインでも楽しめる」新設＋レールプリセット＋ゼロヒット提案。React化時＝LIAISON フィルタ・棚は検索ハブの一級市民として扱う。④カードは `kotennavi_cards_exhibition.html` がスタンダード（ユーザー確定）＝曜日付き会期・`ec__venue-sep` 区切り・remain「残りN日／N日後に開催」。新規ページのカード生成は必ずこのフォーマットに合わせる。

- 2026-07-08 **P10 検索-展覧会をディスカバリーハブ（2状態ページ）として新規制作＝設計判断のまとめ**。背景＝現行 `/search/event` は「検索フォーム＋結果一覧」のみで提案性・回遊性がなく初心者に使いにくい（ユーザー指摘）。さらに表示系ページの関連・回遊ゾーン（p5右カラム・p2/p4近くの展覧会・p3関連展・ピックアップ）と index.html の特集タブの**受け皿**が必要だった。**判断①2状態設計**＝クエリなし→ディスカバリー（編集棚6本：もうすぐ終了/近くで開催中/特集×2/注目/新着）、クエリ・プリセットあり→結果ビュー（コンテキストヘッダー＋グリッド）、ゼロヒット→提案付き空状態。「検索する人」と「探しに来ただけの人」の両方を1URLで受ける。**判断②特集＝アルゴリズム生成プリセット（編集型特集の不採用）**＝admin管理コスト最小の原則（ユーザー明言）により、特集はファセット組合せ×人気シグナルで自動生成される「保存済み検索」とする。P10-4〜7はこのプリセット着地ビューのSEO URLラッパーに縮退（実体を持たない・後日）。レール10本＝index.html SPECIAL_TABS 対応＋非レール3本（ending-all/new-all/trending＝棚もっと見る着地専用）。**判断③P1/P10の住み分け**＝P1（トップ）＝時間軸・パーソナルフィード＋入口（プレビュー＋P10送客・特集タブはプリセットレールへ発展的解消）、P10＝目的軸のディスカバリー＋検索ハブ。P1改修は別タスク。**判断④LIAISON／LIAISON+フィルタ新設**＝オンライン展示・販売の有無は来訪判断に直結する軸なのに現行に存在しなかった。lp指定→li-plusのみ・li指定→liaison有り全部（plusはliの上位互換）。**判断⑤地図ビュー見送り**＝disabledプレースホルダーのみ（実装コスト大・「近く」チップ＋距離表示で当面代替）。**判断⑥タグバー非表示＝プリセットレールが代替**＝`TAGBAR_DEFS` に p10 を登録しない（renderTagbar が自動非表示）。検索ページで回遊タグバーとプリセットレールが並ぶと二重ナビになるため。**判断⑦カードは既製 `.ec` 再利用**＝ただしグローバル `buildGridEcCard` は `.masonry-item` ラップ前提で p10 のグリッド幅指定と衝突するため、非ラップ版 `buildEc` をページローカルに持つ（既存前例あり）。**判断⑧p5系リンク実体化**＝p5〜p5-4 のゼロ状態「展覧会を探す →」・ピックアップ／最近の興味あり！の「もっと見る →」を kotennavi-p10.html へ差し替え（最近のウォッチは P10-2/3 未制作のため `#` 据え置き）。**React化時**＝`<SearchHub>`＝「状態A `<DiscoveryShelves>`／状態B `<SearchResults>`」の条件レンダリング＋URLクエリパラメータ（preset/kw/filters）が単一の状態ソース。プリセット定義はサーバー側（Drupal）でファセット×人気シグナルから定期生成し、フロントは `{key,label,desc,query}` の配列を受けるだけの契約にする。

- 2026-07-07 **管理ボックス共通パターンを全管理・編集ページ（17ページ）へ展開＝2モデル制を採用**。取引6ページで確立した `.ktn-mgmt-wrap`（白ボックス＋上端3pxオーナーアクセント＋760px）を残り9ページに適用する際、**stack を全ページに強制せず「Model A＝フラットフォーム型（wrap のみ）」「Model B＝カードスタック型（wrap＋stack）」の2モデルに分けた**。理由＝編集フォーム系（p2-11/p6-11/p5-11/p5-12）は `.p211-block` の白カード＋sticky送信バーという既存アナトミーがあり、ボックス内でカードを二重に重ねると「箱の中に箱」の冗長な見た目になる。そこで `.ktn-mgmt-wrap:not(.ktn-mgmt-stack) > .p211-block` でカード装飾を剥がし border-bottom 区切りのフラットフォームへ（p3-11 で先行確立した型）。`:not()` スコープなのは **p11-4（stack）直下の p211-block はカードのまま残す**必要があるため。**fixed モーダルはボックス外へ**＝stack の子 inset（左右20px margin）が `position:fixed;inset:0` のオーバーレイを縮めるという CSS 仕様上の罠（fixed でも margin は効く）。**状態バナー（クローン・審査中等）もボックス外**＝ボックスは「このページの操作コンテンツ」の器であり、モード通知はその外のページレベル情報という整理。**旧 page-head 系 CSS（`.ktn-edit-head` 利用・`.p418/p51N-page-head` 等）は本番から退役**し `.ktn-mgmt-head` に一本化（`.ktn-edit-head` canonical は typography デモ用に残置）。React化時＝`<MgmtBox stacked={bool}>` の1コンポーネント＋`<MgmtHead>` で全管理ページのシェルが賄える。**幅の罠（同日是正）**＝`.ktn-content--article/--detail`（max-width:760）は**左右padding20pxを内包**するため、併記すると中の wrap が720に縮み、パンくず帯・ヒーロー帯（760）とボックス外枠が揃わない。管理ページの `.ktn-content` は素（1080）のまま置き、760への絞りは wrap 自身の max-width に一元化する。wrap 外の状態バナーは自前 `max-width:var(--w-detail);margin:0 auto` で同幅化（`.p211-mode-banner`/`.p211-exh-banner`/`.p114-status-notice`）。React化時も「コンテナは絞らない・ボックスが自制する」を維持。**タグバー（同日）**＝管理・編集ページに回遊タグバーは不要（ユーザー確定）。`renderTagbar` の mgmt-page ガードで一律非表示＋markup も撤去。理由＝管理画面は操作に集中する場で、下位ページ継承（p2-12→p2 等）で親の回遊タグが漏れ出ていたのはノイズ。React化時は TagBar を公開ページレイアウトにのみ組み込み、mgmt レイアウトには置かない。

- 2026-07-06 **表示系ページのセクション内側paddingを28pxに統一（ボックス型＝四方28px／ボックスなし＝カラム左右28px）**。背景＝表示系ページのセクション内側paddingが 22/28/32px とドリフトしており（原因は common.css 末尾「P2 EDITORIAL REFINEMENT v2」ブロックが前方定義を上書きし、複数値が併存していた）、左端がページ間で揃わなかった。**判断①ボックス型は四方28px**：`.p2-about`（44px 28px 36px→28px）・`.p2-ic__head`（20px 22px→20px 28px）・`.p2-ic__body`（8px 22px 24px→8px 28px 24px、アコーディオンの縦リズムは維持し横だけ28）・`.p3-box`/`.p4-box`（36px 32px→28px）。ユーザーが横28px・縦28pxの四方均等を承認（アコーディオンのみ縦リズム維持）。**判断②ボックスなしコンテンツもカラム左右28pxに揃える**：裸の `.ktn-tab-head`＋カード列を持つ一覧系（`.p2-4-main`／`.p3-1-main`・`.p3-2-main`・`.p3-3-main`〔＝p4-1/p4-2 がclass流用〕／`.p5-main`）のメインカラム左右insetを旧18px→28px。旧18pxは「当時のボックス型ラベル位置(~18px)に合わせる」ための値だったが、ボックスが28pxになったので28pxへ更新（見出し左端がボックス型セクションの内側paddingと一致）。**判断③p2-1はプログレススケール(`.p2-1-date-bar`)のみ28px**（18→28）：p2-1のセクションは箱型で内部が18px/4pxのままだが、ユーザー指定でプログレスバーだけを揃えた（セクション項目は今回対象外）。**判断④死にCSS整理**：v2で上書き済みの旧padding定義（`.p2-about`複数・`.p2-ic`箱・`.p3-box`/`.p4-box`の前方定義）を削除しコメント化。ただし `.p2-ic__body{display:none}`（アコーディオン折り畳みの機能定義）は残置。**なぜ28pxが単一ソースか**＝v2ブロックが後勝ちで効くため、新規/変更は必ずv2ブロック側（またはメインカラム定義）を触る。モバイルは各wrapのガター（16/20px）に委ねるため左右0リセットは不変。**React化時**＝セクションは「boxed variant（四方28px padding）／listed variant（カラム28px inset＋full-width区切り線）」の2型に整理すれば、静的で割れた値が1トークン（`--section-pad:28px`相当）に収束できる。

- 2026-07-05 **ヒーロー幅＝コンテンツ幅に統一（左右padding 20pxで統一）／0ガター化 `--pad-x` は試行後に撤回**。制作初期のモックがヒーローに24〜28px・コンテンツに20pxの左右paddingを持ったまま共通化され、各表示系でヒーローがコンテンツより8〜16px狭いズレが残っていた。sitemap.md の最大幅（entity/index=1080・detail/article=760）を基準に「ヒーロー幅＝コンテンツ幅」を目標に揃えた。**当初セッション内で「左右gutterを取り最大幅までフル使用（desktop `--pad-x:0`）」を試したが撤回**：`:root` の `--pad-x:0` ＋ common.css 末尾の統合ルールでヒーロー帯の左右paddingを0にしたところ、**p2/p3/p4/p5 全系統でヒーロー内テキストが左壁に密着**しユーザー却下。`--pad-x` 定義・統合ルール・メディアクエリを全削除して復帰。**なぜ撤回が正しいか**＝「ヒーロー幅＝コンテンツ幅」はヒーローとコンテンツが**どちらも max-width:1080/760・`margin:0 auto`・内側padding 20px**であれば既に成立している（外枠幅一致＋内側padding一致＝左端が揃う）。「幅を揃える」を「gutterを0にする」と取り違えたのが誤りで、正解は**両者のpaddingを等しい非0値（20px）にする**こと。0はフル幅化＝別要件であり、ヒーロー内テキストが端に触れて不可。**確定仕様**＝対象ヒーロー `__inner`（`.p2-title-band__inner`/`.p3-head__inner`/`.p4-head__inner`/`.p5-head__inner`、`--compact` 含む）は左右20pxを base 直書きで維持し `.ktn-content`（左右20px）と一致。p6は元々ヒーローも `.ktn-content` 内で自動一致。p2-5／p2-5-1 の色帯 `__inner`・`.p25-layout`・`.p25-fullwidth` も20px（帯の内部余白）、`.p2-5-wrap` は `padding:0`（フルブリード）。ネスト wrap（`.p418-wrap`/`.p114-wrap`）も左右20pxで外側 content と揃える。**React化時**の教訓＝レイアウトプリミティブは「gutter 変数」ではなく「ヒーローもコンテンツも同じ container（max-width＋左右20px）に通す」形にすれば幅一致が自動で保たれる。詳細ルールは CLAUDE.md「ヒーロー幅＝コンテンツ幅（左右padding 20pxで統一）」。

- 2026-07-05 **p6ヒーロー帯を1080px（ページ最大幅）まで拡張＝共通クラス `.ktn-content--flush-x` を新設**（前項「p6は自動一致」の精緻化）。ユーザーの理想モデルは「パンくず幅＝tabnav幅＝ヒーロー帯幅＝コンテンツ幅＝ページ最大幅（1080）」。このうち**まずヒーロー帯だけ**を対象にした（一つずつ解決）。p2/p3/p4/p5 のヒーローは独立カラー帯で、その背景・アクセント線は帯要素自身（max-width:1080）の幅いっぱいに描かれるため**視覚的な帯幅は既に1080**。一方 p6 のヒーロー（`.p6-hero`）は**白背景＋枠線のカード**で、`.ktn-content`（左右20px）に包まれていたため枠線が1040pxで見切れていた（帯型でなくカード型ゆえ枠線が幅の境界になる）。**なぜ「1080化＝壁密着」ではないか**（当初の私の誤認をユーザーが訂正）＝p6ヒーローはカード内側に独自padding（stage 左右40px・meta 左右24px）を持つので、外枠を1080へ広げても文字の余白は保たれる。`--pad-x:0` 撤回時の壁密着は「帯幅0化」ではなく「__inner の内側paddingまで0化」したのが原因で、別問題。**実装＝個別inlineを避け共通クラス化**（ユーザー要望「共通化できるところは共通class定義で」）：`.ktn-content.ktn-content--flush-x{padding-left:0;padding-right:0}` を追加し、p6系3ファイルのヒーローを包む `.ktn-content` にのみ付与。複合セレクタ (0,2,0) なので素の `.ktn-content`・mobile override を順序非依存で上書き。上下paddingは不変。**React化時**＝ヒーローがカード型（枠線あり）のページは「full-width container（左右0）＋カード内側padding」、コンテンツカードは「20px inset container」に分ければ、帯視覚1080／カード1040 inset が両立する。**残（Step 2）**＝パンくず（`.ktn-header`）・tabnav（`.pN-tabnav`）・コンテンツ（`.ktn-content`）の左端基準を1080に揃える作業は未着手。

- 2026-07-05 **表示系ヒーロー（p2/p3/p4/p5）を"class統合せず・トークン＋grouped selectorで共通化"した理由と確定仕様**。背景＝各ページを個別実装した結果、"見た目は同じ設計"のはずのヒーローがDOM構造・class・値でドリフトし、後のメンテが困難という指摘（UI/UX向上＝視覚と操作の統一が目的なのに実装が割れていた）。**判断＝完全なclass統合は避けた**：4ヒーローは中身の主役が違う（p2＝展覧会名のみ／p3・p4・p5＝人名＋アバター＋各種メタ）ため、1classへ畳むと「アバター有無」等の条件分岐が増え、CLAUDE.md が禁じる無理な抽象化になる。代わりに**「同じ役割の値・見た目」だけをトークン化＋grouped selectorで単一ソース化し、classは役割ごとに分ける**（バッジ/カード設計と同じ層構造）。**本当のコンポーネント統合は React CSR 化時に `<Hero variant="exhibition|creator|gallery|user">` として実施する前提**＝今作ったトークン（`--hero-pad-x` 等）と契約が React コンポーネントの仕様に転用でき、作業は捨てにならない。**確定した4層**：①箱＝p2/p3/p4/p5 とも `bg:#fff`・full border/radius なし（**p5 の旧囲みカード border+radius を廃止**しp3/p4と同一箱）。②アクセント線＝**人物ページ（creator/gallery/user）のみ**の識別記号として左3px縦線（`--page-accent`）、`.p3/.p4/.p5-head::before` の**1グループルール**（gradientは `var(--page-accent)→transparent`）。**展覧会（p2）はコンテンツなので付けない**（「線＝人物」の意味づけを保つ）。③区切り線＝ヒーロー↔ナビ間は**ナビ側**に統一（上`2px var(--ink)`＋下`1px page-accent`）、ヒーロー本体に border-bottom を書かない（**p2 の title-band 下線を廃止**しナビ上罫線へ寄せ、二重線も解消）。④横padding＝`--hero-pad-x`（desktop 20px）を単一ソースに（`__inner`／`p6 __meta` が参照。**p6 meta の 24px ドリフトを20へ是正**）。**死にCSS**＝`.p5-head__en`（未使用）を削除、p5副題は `.p5-head__since`（利用開始月）のみ。**p6 は対象外**（画像主役の囲みカード＝別コンポーネント）。**React化時の指針**＝ヒーローは「共通シェル（幅コンテナ＋文字領域padding＋区切り＝トークン）＋variantスロット（アバター/画像ステージ）」で構成すれば、静的HTMLで割れた実装を1コンポーネントに収束できる。詳細ルールは CLAUDE.md「表示系ヒーローの外枠・共通化ルール」。

- 2026-07-05 **Step 2＝パンくず・tabnav の左端を20pxグリッドへ揃えた理由**（前々項 L84 の「残（Step 2）」を実施。理想モデル「パンくず幅＝tabnav幅＝ヒーロー帯幅＝コンテンツ幅＝ページ最大幅(1080)」の左端合わせ）。**まず幅(max-width)を実測したところ全て既に1080で一致していた**＝パンくず `.ktn-header__inner` は `--w-page`（common.js `getWidthVar()` が `body.dataset.w`→`--w-{entity|index}` を返す・display系は1080／mgmtは760）、`.p2-subnav-bar`・`.p3-tabnav`・`.p5-tabnav`・ヒーロー・`.p3-main` 等コンテンツはいずれも `--w-entity`(1080)。**ずれていたのは左右paddingだけ**だった（幅問題ではなく左端問題）。ヒーロー/コンテンツの左端基準は20px（`--hero-pad-x`＝`.ktn-content` と同値）なので、パンくず・ナビの最左テキストもそこへ合わせた。**実装＝3系統**：①パンくず `.ktn-header__inner` `padding 24→20px`（グローバル・desktop。mobile 14pxは別グリッドで据え置き）。②tabnav名 `.p3-tabnav__name`／`.p5-tabnav__name` `padding 16→20px`（**p4 は HTML が `.p3-tabnav__name` を再利用＝p3/p4同時対応**）。名前要素が各ナビの最左テキストなので20pxへ。③**p2-subnav は名前要素を持たず最左が最初のタブ**のため、行 `.p2-subnav` の `padding 24→0`（base L4196＋editorial L11890）にし、**item の左padding(20px・editorial)を左端グリッドに一致**させた（旧＝行24+item20で最初のタブ文字が44pxに居てヒーロー20pxと大きくずれていた）。**なぜ行paddingを0にしたか**＝p3系は「inner padding 0＋name padding 20」で名前テキストが20pxに来るモデル。p2系も同じ結果（最初のタブ文字が20px）を得るには、item padding(20)を最初のタブの左ガターとして使い、行paddingは0にするしかない（行20+item20=40では二重にずれる）。item padding はタブ間隔として他タブでも機能するので二重定義にならない。**未対応**＝mobile の `.p2-subnav` override（12/8px）は desktop 0 との反転が残るがmobileは別グリッド（ヒーロー mobile 16px）で今回スコープ外。**React化時**＝ヘッダー/タブバー/ヒーロー/コンテンツを同一の幅コンテナ（max-width＋左右20px inset）に通せば左端は自動一致。タブバーは「幅コンテナ内でタブ行を左右0にし、最左要素（名前 or 最初のタブ）の内側paddingを20pxにする」ことでグリッドに乗る。詳細は CLAUDE.md「ヒーロー幅＝コンテンツ幅」§に追記。

- 2026-07-05 **p6系ヒーロー画像をtagbar密着に統一した理由（p2との整合）**。ユーザー指摘＝p2とp6はどちらも「画像がタイトルより上」に置かれ画像が主役なのに、tagbar（`.ktn-tagbar`）との距離が違う。原因＝p2は `.p2-poster-area` を `.ktn-main` 直下に直置き（上余白0）でtagbar密着、p6は `.p6-hero` を `.ktn-content ktn-content--flush-x` で包むため editorial v2 の `.ktn-content{padding:32px 20px 48px}` の**上32px**が乗ってtagbarから離れていた（`--flush-x` は左右のみ0化・上下は残す設計）。**判断＝画像を最大限見せる方向（p2の密着）に統一**（ユーザー選択。「画像がすごく意味を持ち、タイトルより上に配置している＝より画像を見せる工夫がある方がよい」）。p6/p6-1/p6-2 のヒーローラッパ inline を `padding-bottom:0`→`padding:0` に変更し上32pxを撤去。**なぜカードの"呼吸"を捨ててよいか**＝p6ヒーローはカード内側に独自padding（stage 左右40px・meta 左右20px・内部の縦余白）を持つため、外側の32pxが無くても文字が窮屈にならない。密着で得られる「画像がより上＝より大きく見える」利益を優先。**React化時**＝作品/展覧会など"画像主役"ページのヒーローは、tagbar直下に上余白0で置くのを既定にする（画像の面積・視認性を最大化）。逆に情報主役ページ（人物プロフィール等）は上に呼吸を持たせてよい＝ページの主役が画像かテキストかで上余白を出し分ける方針。

- 2026-07-05 **tabnav の現在地フォーカスバーを「名前要素＝現在地バー」で統一した理由**。ユーザー指摘＝p2 のサブナビは最初のタブがアクティブでアクセントの下線バーが出るのに、p3/p4/p5 のタブナビはバーが付かず、ページ間で「今どこにいるか」の表示がバラついていた。原因＝p2 の `.p2-subnav` はタブのみ（最初のタブに `is-active`）だが、p3/p4/p5 の `.pN-tabnav` は**最左に名前要素**（クリエイター名/ギャラリー名/ユーザー名）を持ち、この名前要素にはバーが無く、かつトップページではタブ側に `is-active` が付かない設計だった。**判断（ユーザー選択・案1）＝名前要素そのものを現在地バーにする**（トップページ＝そのエンティティのルートに居るサイン）。**実装のキモ＝span/anchor 慣例を利用**：名前要素はトップページ（p3.html/p4.html）で `<span class="p3-tabnav__name">`（リンクでない＝現在地）、下層ページ（p3-1 等）で `<a class="p3-tabnav__name" href>`（リンク＝戻れる）という既存の書き分けがあるため、CSS `body.p3-page span.p3-tabnav__name, body.p4-page span.p3-tabnav__name{border-bottom:3px solid var(--page-accent);margin-bottom:-1px}` だけでトップページの名前にのみバーが付き、**HTML変更ゼロ**で「トップ＝バー有り／下層＝バー無し」を出し分けられる（p4はHTMLで `.p3-tabnav__name` を再利用しているので p3 の指定で両対応）。**p5 は逆に名前要素を削除**（ユーザー要望「山田花子のtabnaviの表示は不要」）＝マイページは個人ページで人名ラベルの情報価値が低く、削ると最左が最初のタブ「カレンダー」になり **p2 と同じ純タブナビ**（最初のタブ `is-active` に editorial 共通バーが出る）に収束する。10ファイル（p5／p5-1〜4／p5-11〜15）から名前 `<a>` を削除し、p5-tabnav の名前関連CSS（`.p5-tabnav__name`・`-text`・`body.p5-page .p5-tabnav__name`・mobile `display:none`）を死にコードとして削除。**なぜ p3/p4 は残し p5 は消すのか**＝p3/p4 は他者のクリエイター/ギャラリーページで「誰のページを見ているか」の常時表示に価値があり、名前＝現在地バーが自然。p5 は自分のマイページで名前は自明。**React化時**＝Tabnav コンポーネントは「最左スロット（名前 or 無し）＋タブ列」で構成し、現在地表示は `variant="root"` のとき名前スロット（人物ページ）か最初のタブ（p2/p5型）にアクセントバーを付ける、という契約にすれば静的HTMLの span/anchor 慣例をそのまま props（`isRoot`）に移せる。

- 2026-07-05 **下位ページのタグバーを「親フォールバック」で継承させた理由**。ユーザー指摘＝上位ページ（p2/p3/p4/p6）にはタグバー（`.ktn-tagbar`）が出るのに下位ページ（p2-1/p2-2/p2-4/p2-5-1・p3-1〜3・p4-1/p4-2・p6-1/p6-2）に出ず不統一。原因＝タグバーは `TAGBAR_DEFS[page]`（common.js）をページID単位で引くが、下位ページIDの定義が無く `renderTagbar` が空で非表示にしていた（DOM `#ktnTagbar` は全下位ページに存在済み＝定義だけの問題）。**判断＝下位ページごとに定義を複製せず、`renderTagbar` に親フォールバックを1箇所実装**（ユーザーの一貫方針「共通化できるところは共通定義で／個別を増やさない」）。ロジック＝`TAGBAR_DEFS[page]` が無ければ末尾 `-N` を1段ずつ削って親IDを探す（`p2-1→p2` / `p2-5-1→p2-5` / `p6-1→p6`）。**なぜ段階的に削るか**＝`p2-5-1`（LIAISON+）は `p2-5`（LIAISON）の専用タグバーを継承すべきで、いきなり `p2` へ飛ばさないため（1段ずつ削り最初にヒットした定義を採用）。**なぜ専用定義を消さないか**＝`p2-3`/`p2-5` は展覧会セクション用の独自タグバーを持ち、完全一致でヒットするのでフォールバックは発火せず優先される（＝「専用があれば専用・無ければ親」の自然な優先順位）。**残課題（未対応・軽微）**＝継承したタグバーは親の `active:true`（例 p3＝プロフィール）とアンカー href（`#archive` 等）をそのまま持つため、下位ページでは「現在地ハイライトが親のまま」「アンカーが下位ページに存在せず不発」になり得る。ユーザー要望は「上位と同じように表示」なので**まず表示の統一を優先**し、下位ページ単位の active/href 精緻化はフォローアップ（必要なら該当下位IDを `TAGBAR_DEFS` に個別登録して上書き）。**React化時**＝Tagbar は「ページ→タグ定義」の解決を親フォールバック付きのセレクタ（`getTagbarDefs(pageId)`）に寄せ、下位ルートは親定義を継承＋現在セクションで active を差し替える、という契約にすれば静的HTMLの挙動を保ちつつ active 精度も上げられる。

### 取引まわり（p3-15/16・p4-15/16・p5-14/15）back-fill ※2026-06-22 に git履歴＋docから遡及記録
出典：commit ログ／`docs/取引ページ整合性チェック.md`（2026-06-12 確定）。詳細は各正本を指す。

- 2026-05-17 取引ページの**ページ命名を分離**：出品者側「取引デスク」(p3-16/p4-16)／購入者側「取引ワークスペース」(p5-15)。意図的な区別。**留意**：取引コメントで双方が相手の別名ページを参照するため、変換時は相互参照の配慮が要る（→ 整合性チェック B-10）。
- 2026-05-17 `p316-*` CSS を `--page-accent` 変数で色対応させ、**p4-16(gallery) は CSS 追加なしで p3-16(creator) を流用**する設計（creator=インクブルー / gallery=コッパー）。React化時も「ロール＝テーマ変数」の1コンポーネント＋propsに落とす想定。
- 2026-05-18〜19 **「申込確認待ち」→「購入確定待ち」へ改称**。会場優先確認・購入確定の意味を明示するため。
- 2026-05-18 発送業者をテキスト入力→**select化**（宅急便/らくらく家財/佐川/ゆうパック/その他）。送料は業者別モーダルで提示し**「参考値」と明記**（最新情報・独自契約で変動するため）。梱包費は readonly→入力可。
- 2026-05-18 個人情報（住所・電話番号）は**発送待ちステップで初めて表示**（保護の観点で表示タイミングを限定）。申込内容に個人情報保護法に基づく取扱い注記を追加。
- 2026-05-18 支払期限の表示を**強調色→中立色**（`p316-deadline-neutral`）に。支払待ちは購入者のターンであり、出品者側では中立に見せるため。
- 2026-05-18 **売約済への変更タイミング＝購入確定時**（ログに「売約済に変更」を記録）。
- 2026-05-18 **「誰の番か」を視覚化**：`p515-status--my-turn / --waiting` ＋ ターンラベル。状態名は客観名に揃え、ターンは色＋ラベルで表現する原則。
- 2026-05-18 **発送前キャンセル申請（出品者側 p3-16）**＝ボタン＋モーダルで管理者返金処理フロー。※購入者側の「発送遅延キャンセル申請」は当初 p5-15 にも追加検討されたが 2026-06-22 に廃止（下記）。
- 2026-05-24 **「申込拒否（申込を断る）」概念を廃止**。会場優先のため出品者が任意に断るのではなく、「会場売約済」操作で全申込者へ自動キャンセル通知する方式に統一。申込拒否モーダル／フローを除去。
- 2026-06-12 **状態名の統一辞書を確定**（S1〜S5/F1〜F2）。同一状態に4呼称（在庫確認待ち／在庫確認回答待ち／申込中／購入確定待ち）が混在していたのを解消。出品者・購入者で同一の客観名、誰の番かはターンラベル＋色。期限呼称も統一し「取引期限」は使わない（→ 整合性チェック / CLAUDE.md）。
- 2026-06-12 **期限ルールを会場優先式に確定**：確定期限＝会期終了3日後 or 申込3日後の遅い方／発送期限＝会期終了後7日 or 支払後7日の遅い方。「申込から7日以内」「支払いから14日以内」は**誤り・使用禁止**。実会場優先で会期終了後の引渡しが多いため。　※2026-06-27 改訂：確定期限は「会期終了7日後 or 申込7日後の遅い方」に変更（本章の最新エントリ参照）。
- 2026-06-12 手数料の整合：3万円以上＝**8%**（過去のアーカイブ表 5% 表記は誤り）。
- 2026-06-24 **状態strip内の状態バッジから「待ち」を外し、行為名表示に変更**（S1=購入確定 / S2=支払 / S3=発送 / S4=受取確認 / S5=完了確認。終端は 取引完了 / キャンセル済）。理由＝自分のターンのとき状態バッジが「○○待ち」だと「自分が待っている」ように読めて違和感がある、という指摘。`.p515-status__head` は常にターンラベルを伴うため、「待ち」はターンラベル側（相手の番＝「○○の△△待ち」／自分の番＝「あなたの操作が必要」）に寄せれば両側とも自然に読める。ステップノード・ログ語彙とも一致。**正式状態名（〜待ち）は廃止せず**、一覧・ログ・説明文などターンラベルを伴わない単独表示では引き続き canonical 名として使用（→ CLAUDE.md 状態名テーブル＋strip書式）。適用＝p3-16 / p4-16 / p5-15 の strip バッジのみ。一覧行の単独バッジ（出品管理の「○○待ち」表示など）を同様に変えるかは未確定。
- 2026-06-12【未解決】整合性チェック B項目（UI/UX改善 1〜10）は未着手。**p3-16↔p5-15 の非対称**（終了1週間後に個人情報・コメントを消去する `expired` 状態が購入者側 p5-15 のみで、出品者側 p3-16 に同等状態がない／領収書の永続アクセスと個人情報消去の関係）は要検討として残存。

### 全ページ横断の主要方針転換・UI廃止 back-fill ※2026-06-22 に git履歴から遡及記録
制作ルールの詳細は `CLAUDE.md` を正本とする。ここは「方針が変わった／何かを廃止した」事実と理由の捕捉に限定。

- 2026-04-17 ロール識別色を確定：**creator=インクブルー #2a5f7a / gallery=コッパー #8b5e3c**（旧オリーブ/パープルから変更）。以降 `--page-accent`・バッジ・mgmt-barの基礎。
- 2026-04-17 p3 タブナビから「開催中の展覧会」を削除（情報重複の整理）。
- 2026-05-09 **販売状態「申込中」を廃止** → 「販売中＋xx人が申込中」表示に統合（`aw__queue-inline`）。LIAISON+のキュー表現を「販売中バッジ＋件数」に一本化。フィルターの applying/pending も廃止。
- 2026-05-15 **共通ヘッダー設計を確定**：パンくずのセパレーター位置・モバイル先祖省略（`…`）・タグバー左右矢印ボタン・展覧会カードの「展示前」バリアント（→ CLAUDE.md ヘッダー節）。
- 2026-05-17〜24 **共通ボタン2系統を新設**：`ktn-op-btn`（操作系 primary/danger/caution/danger-outline）・`ktn-action-btn`（遷移系・末尾「→」・要対応で赤●）。**solid＝その場実行／アウトライン＋→＝遷移** を形で区別する原則（v3）。
- 2026-05-24 **フォントを全面変数化**（`--fb/--fs/--fn/--fm/--font-en-name/--font-en-label`）＋読み物変数 `--rt-*` ＋ `.ktn-sec-en` 統一。**`mgmt-page` 視覚識別**（warm beige 背景＋ロール色トップバー）を導入し公開/管理ページを区別。
- 2026-06-06 **パンくずURL体系を確定**（展覧会=/p10・クリエイター=/p10-2・ギャラリー=/p10-3・作品=/p10-1）。**meta description フォーマット**を定義。CTAリード文の冗長表現（「〜が気になりますか？」）削除・色を `var(--ink)` に統一。
- 2026-06-09 **`handleAction` 共通化**＋関連情報セクションを `ktn-*` 共通名へ一括変換（`p2-related-band`→`ktn-related-band` 等）。変換時のコンポーネント統合を容易化。
- 2026-06-11 **p3-1〜3・p4-1/2 を2カラム化**（右サイドバー＋スティッキーCTA）。作品spec表記を「年 / 技法 / サイズ」に統一。`--hh` のフィードバックループ／overscroll 誤計測を修正。
- 2026-06-16 **エディトリアルv2バッジ刷新**：`.cb`人物 outline→solid＋Cinzel／`.cb`コンテンツ left-border／`.sb` pill→dot prefix。**色でなく形で意味を区別**の原則を確立。`_syncHH` を ResizeObserver 化（font load 競合解消）。
- 2026-06-17 **p5系のエディトリアル統一＋ `kotennavi-components.css` リンクを全p5ページから削除**（single source of truth 化）。watch/interest を canonical `handleAction`＋inline SVG に統一（`<use href>`／`color` 属性ハードコードは禁止パターン）。
- 2026-06-17 **カードホバーを標準化**（`translateY(-1px)`＋軽い影、editorial v2 のパディングアニメを廃止）。p6 ダークモードの cascade 競合を整理。
- 2026-06-20 **`.ktn-tab-head` 共通クラスを導入**し、旧ページ固有ヘッドクラス・editorial v2 override・mobile override を全削除して **single source of truth を達成**。p3-3 のコレクション切替UI（`aw__collected-btn`・`setP33Coll`）を廃止。
- 2026-06-22 展覧会リンク表示を `.exh-link`（CSS-only `::before` ラベル）で統一。

### 直近の決定
- 2026-06-22 LIAISON バッジの**点滅ドット（`lb-dot-inner` / `@keyframes lb-pulse`）を廃止**。装飾目的の点滅を排除（pulse は「ユーザーの行動を待っている」状態のみに限定するバッジ4原則に沿う）。
- 2026-06-22 p5-15 の **発送遅延キャンセル申請UI（およびFAQ）を廃止**。理由：遅延時はシステムから出品者へリマインダー／催促が自動送出されるため利用者の申請と行き違う懸念があり、かつ返金処理が絡むためリスクを避ける。発送遅延は自己解決UIを設けず、サポート対応に寄せる方針。
- 2026-06-22 取引3ページ（p3-16/p4-16/p5-15）のタイポグラフィを p3-15 方向に統一。**見出し・章タイトル・人名・本文/説明文を明朝（--fs）化**、フォームラベル・極小ステップラベル・ID系（Montserrat）・小さな注記はゴシック維持。理由：エディトリアル方向（明朝主軸）の一貫性。
- 2026-06-23 取引デスク（p3-16/p4-16）購入確定待ち（S1）リファイン：(1) 状態説明文 `.p515-status__desc` を**明朝→ゴシック（--fn）に戻す**。理由：編集・操作系の説明文は明朝だと浮くため。サイズ/行間はページ見出しのリード文 `.ktn-mgmt-head__desc`（.92rem / lh2.0）を超えない（.9rem / lh2.0）。※2026-06-22 の「取引3ページ本文/説明文を明朝化」は、操作説明文（status desc）については本決定で上書き。(2) **支払期限のUI文言・固定日付表示を全廃**（フォームの自動設定注記＋確認モーダルの「支払期限：◯月◯日」行とその算出JS）。理由：支払期限の確定はシステム（確定から3日後＝会期依存ルール）が行うため、UIに固定値/固定文言を持たせるとルール変更時のメンテ漏れになる。期限「切れたら自動キャンセル」という挙動説明（数値なし）は残置。(3) 合計金額に「（税込）」を明記。(4) 購入者カードからは申込番号/申込日を出さず、申込番号は「申込内容」側に集約。
- 2026-06-23 取引3ページ（p3-16/p4-16/p5-15）の**状態strip（`.p515-status__head`）の書式を統一**。レイアウト＝`[状態バッジ][ターンラベル]` を左寄せ・`一つ前の終了日時 .p515-status__deadline` を右寄せ（`margin-left:auto`）。DOM順は バッジ→ターンラベル→日時。ターンラベルから `margin-left:auto` を撤去し `--inline` モディファイアを廃止。**色は「誰の番か（ターン）」で決まる**：strip背景・状態バッジ（塗り）・ターンラベル（背景なし＝色付きテキストのみ）の3要素を `.p515-status--my-turn`（ページアクセント＝p3インクブルー/p4コッパー/p5ピンク）/ `.p515-status--waiting`（グレー）が同色で付与。バッジは塗り・ターンラベルは非塗りで役割を区別。状態名はバッジ文言が担い、色では区別しない（CLAUDE.md「誰の番かは状態名に含めずターンラベルと色で表現」の徹底）。状態別バッジ色 `p316-status__badge--new/confirmed/paid/shipped/confirming` は撤去、終端 `--done`（緑）/`--cancelled`（グレー）のみ個別色を維持（ターンclassなし）。「一つ前の終了日時」は全状態の右端に表示：S1=申込日 / S2=確定日 / S3=支払日 / S4=発送日 / S5=受取確認日 / 完了・キャンセル=その確定日。理由：6状態×2ロールでstrip表記がバラついていた（S1だけ日付なし・日時とラベルの左右位置が不揃い・バッジ色がターン非連動）ため。React化時は `<StatusStrip state turn={mine|waiting|done|cancelled} prevStepDate>` 想定。
- 2026-06-23 取引3ページ（p3-16/p4-16/p5-15）の**申込番号・申込日を「状態に依らず常時表示」へ移設**。出品者側（p3-16/p4-16）は購入者カードに `申込番号 #1 / 申込日`（`.p316-purchase-buyer__date` / `__apply-no`）を表示し、S1限定の「申込内容」側の重複行は削除。表記は `--fm`・weight 400 で統一（旧 weight 600 ＋「申込」二重を解消＝`申込番号 #1  2026.02.21`）。購入者側（p5-15）は永続IDが**取引番号**のため番号は重複させず、**申込日のみ**をヘッドの取引番号メタ隣に常時表示（`.ktn-mgmt-head__meta-date`）。**申込順「N番目」はS1の `p515-queue-info` 内に限定（永続化しない）**。理由：①状態が進むと申込番号/申込日が消える消失問題を解消。②申込番号は出品者にとって「今キューの何番目を操作しているか」を常に意識する識別子だが、購入者にとっては自分の順番が来るまでの一時情報で、確定後は意味が薄れる→購入者側は番号を永続化せず申込日のみ残す。React化時は申込番号/申込日を取引エンティティの永続フィールドとして扱い、表示位置はロールで出し分け。
- 2026-06-23 取引3ページ（p3-16/p4-16/p5-15）の**ヘッド構成を統一**：タイトル → 英サブ → **取引番号メタ（タイトル直下へ移動）** → リード文（`.ktn-mgmt-head__desc`）→ **ガイドリンク（`.ktn-mgmt-head__guides`、リード文の下）**。ガイドは役割対応で出し分け：出品者ページ（p3-16/p4-16）→ p70-2「作品販売ガイド」、購入者ページ（p5-15）→ p70-3「購入までの流れ」（p70-3は未作成だがp6-2から既にプレースホルダーリンク済み）。表示方法は p3-15 の `.p315-ops-guide__more`（赤系アンダーライン＋末尾「 →」）を流用。理由：取引番号は識別の主役なのでスクロール前に最上部で見えるべき／ガイドは説明文の補足として読了後の位置に置く。React化時は `<MgmtHead title en txnId applyDate? guideLinks[] >` 想定。
- 2026-06-24 **サイトカラーをロゴ青 `#005da7` 1本の軸に集約**（`:root` の `--accent`）。青系を「ブランド／実行／リンク」で似た色を複数持たず、意味の区別は色でなく **form（塗り/下線/枠）＋役割パレット** で出す方針を確定。具体：(1) `:root` に `--accent-d:#004a85`（ブランド青の濃色・hover）と `--actor-buyer:#1a4a88`（取引フローの購入者/ユーザー側アクター色）を追加。(2) 確定/実行ボタンの旧 `#1a4a88`（`.ktn-op-btn--primary` / `.p211-submit-bar__submit` / `.p54c__action-btn--publish` hover）を `var(--accent)` #005da7 に統一（`.ktn-btn--primary` は既に `var(--accent)`）。(3) 取引・フロー系の購入者/ユーザーアクター色（p515/p316/p315 のステップ・バッジ・キュー番号・ログドット・venue-note、p70 flow図、mobile-cta）の `#1a4a88` を `var(--actor-buyer)` に置換（tint の `rgba(26,74,136,…)` は値が一致するため据え置き）。(4) 開催ステータス「もうすぐ開始」`.sb-soon` / `.p3-1-glbl--soon` の `#1a4a88` は badge設計の「濃い青」status軸として**リテラル据え置き**（実行/アクターとは別軸）。理由：旧 `#005da7`(ブランド) と `#1a4a88`(確定ボタン) の似た2青が「不統一」に見えていた／ユーザーはサイトカラーにロゴ色・周辺色を使いたい意向。リンクとボタンは同じブランド青でも form で区別する（リンク=下線テキスト/ボタン=塗り）。React化時：`--accent`=brand primary（実行ボタン＋リンク）、`--actor-buyer`=取引2者対比の購入者色、status「soon」は status トークンとして別管理。CLAUDE.md「サイトカラー共通定義」節が正本。
- 2026-06-23 p3-15/p4-15 申込者リストの「進行中」表示を**テキストバッジ→三角マーカー（`.p315-turn-badge`）に変更**。意味のエンコード＝**塗り色で誰の番か**（赤 `#b43c14`=自分/出品者ターン `--yours` ／グレー `var(--muted)`=相手待ち `--wait`）、**形で確定段階**（塗り三角▶=購入確定後／中抜き三角▷=購入確定前 S1。`:has(.p315-apply-status--stock)` で自動判定）。位置は申込番号の左・リスト左枠線の内側の透明マージン（`position:absolute;left:-15px`、行に `margin-left:20px`）で、行背景は番号位置から塗り矢印下は塗らない。マーカーは第一線基準で配置（`top` 固定＋first-line中央）し、モバイルで行が折返しても番号行を指す。アクセシビリティ用「進行中」テキストは `font-size:0` で保持。React化時は `<TurnMarker turn={self|other} stage={confirmed|provisional}>` 想定。理由：テキストより矢印の方が「順番が来た行」を視覚的に直感把握できるため。
- 2026-06-24 一覧ページ（p3-15/p4-15 `.p315-txn-row__status` ・p5-14 `.p514-aw__strip-label`）の状態ラベルは**期限を同ラベルにバンドルする（「○○　期限 yyyy.mm.dd」）ためターンラベルを持たない**点が strip（p3-16/p4-16/p5-15）と異なる。よって一覧では **自分のターンの行を命令形CTAに変更**（S1=購入を確定してください / S2=お支払いください / S3=作品を発送してください / S4=受取を確認してください / S5=取引完了を確認してください）し、**相手のターンの行は「〜待ち」**（支払待ち・受取確認待ち・購入確定待ち＋申込#n 等）のまま残す。理由：ターンラベルが無い一覧では状態名だけで「自分が今何をすべきか」を伝える必要があり、「〜待ち」だと自分の番でも受け身に見える。strip では `2026-06-23`（待ち＝ターンラベルが担う）の方針、一覧では命令形＝同じ「自分のターンの違和感解消」を文脈に合わせて別表現で実現。React化時は一覧セルを `<TxnRowStatus state turn={mine|theirs} deadline>` とし、turn=mine は命令形・theirs は「〜待ち」をレンダリングで出し分け。
- 2026-06-24 取引4ページ strip（p3-16/p4-16/p5-15 `.p316-turn-label--mine`）の**自分のターンのターンラベルを汎用「あなたの操作が必要」→命令形CTAに変更**（S1=購入を確定してください / S3=作品を発送してください / S5=取引完了を確認してください〔出品者 p3-16/p4-16〕、S2=お支払いください / S4=受取を確認してください〔購入者 p5-15〕）。相手のターン（`--waiting`）の「○○の△△待ち」は据え置き。理由：一覧ページ（同日決定）と揃え、ターンラベルでも「次にすべき操作」を明示した方が分かりやすいというユーザー指摘。バッジ（行為名）＋命令形ラベルはやや重複するが、操作の明確さを優先。strip 内のモバイル固定CTA（`#p316MobileCtaLabel`「あなたの操作が必要です」＋「操作へ進む ↓」）は状態非依存のスクロール誘導アフォーダンスのため汎用文言のまま据え置き（JSが状態別に書き換える実装はなし）。React化時は `<TurnLabel turn={mine|waiting} action={imperative}>`、mine は state→命令形マップ・waiting は「相手名＋行為＋待ち」。
- 2026-06-24 取引デスク出品者側（p3-16/p4-16）S1 購入確定フォームに**作品単位の「発送可能日」入力欄（`type=date`、id `p316ShipReadyDate`/`p416ShipReadyDate`）を追加**。ガイド文・フォームタイトルを「送料・梱包費・**発送可能日**の設定」に更新し、確認モーダルの明細に「発送可能日：◯年◯月◯日」行（`p316ModalShipReady`/`p416ModalShipReady`）を追加、モーダル説明文を「支払い・**発送予定**を案内します」に変更。日付はインラインJS `openConfirmModal()` が `YYYY-MM-DD`→`◯年◯月◯日`に整形（未入力時「未設定」）。初期値はLIAISON+出品設定の展覧会全体の発送予定日（p3-16=2026-03-10 / p4-16=2026-03-20）をプリフィル。理由：LIAISON+出品設定の発送予定日は**展覧会出品作品全体**に対する予定で、個別作品では発送可能日が異なりうる。かつ購入者に**配達希望日**を入力してもらうために作品単位の発送可能日（＝配達可能の最短日）が必要。会期中作品は会期終了後が目安。React化時は発送可能日を取引（または購入確定）エンティティの出品者入力フィールドとし、購入者側の配達希望日の下限（`min`）に連動させる。
- 2026-06-24 上記の購入者側連動を実装：購入者デスク p5-15 S2（支払い前）で(1)「出品者が入力した内容」`.p515-ship-info` に**発送可能日行（「2026年3月5日 以降」）を追加**しお届け目安の文言を「支払い後」→「**発送後** 5〜7営業日」に変更（発送可能日を起点にした方が正確）、(2)既存の**受取希望日（任意）入力（`#p515DateInput`）に `min="2026-03-05"`（＝出品者の発送可能日）を付与**して発送可能日より前を選べなくし、(3)欄下に補足 `.p515-delivery__help`「出品者の発送可能日（2026年3月5日）以降から選べます。配送状況により前後する場合があります。」を追加（新CSS `.p515-delivery__help` を common.css に追加）。注：p5-15 はシナリオ別取引のため日付は p3-16/p4-16（3/10・3/20）と一致させず、当ページの支払期限 2026/3/2 に整合する 3/5 を採用。React化時は出品者の発送可能日を購入者フォームの `min` にバインドし、ship-info 表示・help 文言の日付も同値を参照（ハードコードしない）。**「受取希望日」は既存ラベルを流用（＝ユーザーの言う「配達希望日」）。新規欄は追加せず制約のみ付与。**
- 2026-06-25 上記の発送日を**ロール別ラベルに分離**。同一の日付フィールド（S1で出品者が入力）を、**出品者側（p3-16/p4-16）は「発送可能日」**（自分がコミットできる最短日）、**購入者側（p5-15）は「発送予定日」**と呼び分ける。理由：購入者には支払いタイミング等で実際の発送日が前後しうるため、「予定」のニュアンスでコミット感を避ける。出品者と購入者は別ロール・別ページで片方の名称しか見ないため、プロダクト上で2名称が並ぶ混乱はない（日本ECの一般パターン：出品者＝出荷可能日／購入者＝発送予定日）。実装：p5-15 ship-info ラベル「発送可能日」→「発送予定日」、値は単一日付の語感に合わせ「2026年3月5日 以降」→「2026年3月5日」（**表示は「以降」を外す**）。受取希望日の補足は範囲を示すため**「以降」を残す**「発送予定日（2026年3月5日）以降で選べます。お支払い・配送状況により前後する場合があります。」（「出品者の発送可能日」表記は購入者に出さない）。`min` 制約は据え置き。出品者側ページ（発送可能日のまま）は変更なし。**同一フィールドのロール別ラベルである点に注意（サポート/ドキュメントでの混同防止のため明記）。** React化時は1つのデータフィールド `shipReadyDate` を持ち、表示ラベルをロールで出し分け（seller=発送可能日 / buyer=発送予定日）。
- 2026-06-25 **購入者側 S1（購入確定待ち）の管理場所を取引ワークスペース p5-15 から購入管理 p5-14 へ移設（Option A）**。理由：S1 の時点では申込者はまだ「購入者」ではなく単なる申込者で、**取引番号（TXN-…）が未付与**（取引番号は購入確定 S1→S2 で発番）。取引番号をキーにした「取引ワークスペース」p5-15 に申込段階のユーザーを入れるのは概念的に不整合（ヘッダーの取引番号メタが空になる／申込番号→取引番号へ途中で切り替わる違和感）。対して出品者側は S1 が自分の能動ターン（購入確定操作）なので p3-16/p4-16 デスクで扱うのが正しく、**S1 の所在はロールで非対称**（出品者＝デスク／購入者＝一覧）。実装：(1) p5-14 の購入確定待ち2行のアクションを「取引ワークスペースへ →」リンクから「申込をキャンセル」ボタン（`.p514-cancel-apply-btn` ＝ `ktn-op-btn--danger-outline --sm`）へ変更、strip ラベルを `申込 #n` から `n番目／全2人　確定期限 yyyy.mm.dd`（キュー順位＋確定期限）に変更。(2) p5-14 に申込キャンセル確認モーダル（`#p514CancelApplyModal`、確定で strip を `--cancelled`「キャンセル済 - 申込キャンセル」へ書換＋ `KTN.toast`）を追加。料金未発生・順番繰上りを明記。(3) p5-15 から S1 専用 DOM を除去：状態ブロック `#p515StatusApplied`（キュー順位/venue-note）・取引ログ `#p515LogApplied`（購入申込受付イベントは支払待ちログ `#p515LogPayment` に既出のため重複）・dbar「購入確定待ち」ボタン。state machine の `applied` キーは配列インデックス整合のため slot0 に残置（dbar無し・default `payment` で到達不能、`getElementById` ガードで無害）。キャンセルセクション可視条件を `effectiveKey==='payment'` のみへ。(4) p5-15 のキャンセル系を「申込」→「購入」へ文言変更（C-6 ボタン「購入をキャンセルする」・確認モーダル「購入をキャンセルしますか？」、申込順 1番目の文言を購入確定済み前提に差替）。(5) FAQ をロール別に整理：p5-14＝「購入確定前は購入管理／確定後は取引ワークスペース」、p5-15＝「お支払い前はこのページ／購入確定前は購入管理ページ →（`.ktn-guide-link`）」。S2 以降の行（支払待ち・受取確認待ち等）は引き続き p5-14→p5-15 リンクを維持。**データモデル原則：取引番号＝購入確定時に発番。申込中の購入者は取引エンティティ未生成（申込エンティティのみ）→ 申込キャンセルは一覧から、購入キャンセルは取引ワークスペースから。** 検討し棄却：(B) 申込時に取引番号発番＝キュー待ち/キャンセル申込にも番号が大量発生、(C) S1 は申込番号で p5-15 を開く＝「取引ワークスペース」の概念が濁りヘッダーIDが途中で切替わる。React化時はルーティングを `申込中→/purchase-list(p5-14)` / `購入確定以降→/transaction/:txnId(p5-15)` に分離し、p5-15 は `txnId` 必須ガードにする。
- 2026-06-25 **p6-2（LIAISON+作品ページ）の購入申込ボタンを申込状態でトグル**：閲覧者が**申込本人**（その作品に申込済み）の場合、ヒーローの「購入申込をする」（`#p62ApplyBtn`）を隠し「申込をキャンセル」ボタン（`#p62CancelApplyBtn`）を表示。押すと確認モーダル（`#cancelApplyModal`・`am-overlay` 流用）を開き、確定（`confirmCancelApply()`）で申込前状態に戻す（`KTN.toast`）。申込確定（`submitApply()` を p6-2 専用に差し替え）で `_applied=true`→キャンセルボタン表示＋キュー文言「申込済み（3人が申込中）」。creator本人ロールは従来通り申込ボタン無効化＋取引デスクボタン（`#p62DeskBtn`）で、キャンセルボタンは出さない。理由：Option A で申込キャンセルは「取引番号未付与＝取引ワークスペースに入れない」ため作品ページ／購入管理から行う方針。作品ページに居る申込本人がその場でキャンセルできる導線を持たせる（p5-14 一覧と同じ申込キャンセル確認モーダル文言「料金未発生・順番繰上り」を踏襲）。実装：JSは `KTN.pages['p6-2']` が `renderApplyP62()` でロール×申込状態を出し分け、`window.submitApply` を p6-2 用にオーバーライド（元の `_p6Init` 版 alert＋`_applyState` は p6-2 では使わない）。CSS＝`.p6-liaison__btn-cancel-apply`（ダーク背景の danger-outline・オレンジ枠）／`.am-submit--danger`（モーダル確定ボタンの赤）を common.css に追加。React化時は作品エンティティに対する「自分の申込」有無で `<ApplyButton applied onCancel>` を出し分け、申込/キャンセルともに確認モーダル経由。
- 2026-06-25 **p6-2 の購入申込はログイン必須・ゲストは共通ログインモーダルを表示**：購入申込ボタンの onclick を `openModal('applyModal')`→`openApplyModal()`（p6-2 専用）に変更。`openApplyModal()` は `KTN.role==='guest'` のとき **p2 チェックインCTAと同じ共通認証モーダル `#ktnAuthModal`**（common.js `KTN.action.show()`・「ログインが必要です」）を開き、ログイン済みのみ `applyModal`（申込フォーム）を開く。理由：購入申込は My機能と同様にアカウント必須で、サイト全体のゲスト導線（ウォッチ/興味あり/チェックイン）と同じログイン誘導に統一する。p6 が interest トグルで使う `loginModal` ではなく、明示要望どおり p2 チェックイン型 `ktnAuthModal` を使用。**モーダル文言・アイコンは購入申込用に出し分け**：common.js `KTN.action` に `ACTION_ICONS.apply`（ショッピングバッグ）／`ACTION_AUTH.apply`（見出し「購入申込にはログインが必要です」・説明「ログインすると作品の購入申込や出品者とのやり取りができるようになります」）を追加し、`show(action)` が `#ktnAuthTtl`/`#ktnAuthSub`/`#ktnAuthIcon` を action 別に書換（未定義 action は `DEFAULT_AUTH`＝従来の My機能文言にリセット）。watch/interest/checkin は従来文言のまま。React化時は `<ApplyButton>` クリック時に未認証なら共通 `<AuthGate action="apply">` を表示し、認証後に申込フォームへ。**注意（デモ実装の癖）**：p6 系は `KTN.role` を `setR` 押下時のみ設定し初期ロード時は undefined、一方 `KTN.init` は `ktnState.role` のみ設定するため、ゲスト判定は `KTN.role || ktnState.role` のフォールバックで行う（初期ロード時の guest を取りこぼさないため）。React化では role を単一ソース（認証コンテキスト）に統一する。
- 2026-06-25 **ログイン誘導モーダルをサイト共通 `#ktnAuthModal` に一本化・レイアウト確定**：構成は上下2分割。**上半分＝ブランド青背景（`var(--accent)`＝ロゴ `kotennavi-logo3.svg` 色 #005da7・旧グラデーション #3a90e0 廃止）＋ページ/機能を表すアイコン（`#ktnAuthIcon`・action 別）＋見出し（`#ktnAuthTtl`）＋ログイン後にできること（`#ktnAuthSub`）**。**下半分＝「ログイン」「新規ユーザー登録（無料）」ボタンが各遷移先へナビゲート（ログイン→`kotennavi-p11.html`＝P11／新規登録→`kotennavi-p11-1.html`＝P11-1）＋規約注記**。実装：(1) common.js `_inject()` のボタン onclick を `KTN.action.close()`→`location.href='kotennavi-p11(-1).html'` に変更。(2) `openCheckinModal()` のゲスト分岐が独自に複製していた `#ktnCheckinModal`（同レイアウト）を廃止し、ゲスト時は `KTN.action.show('checkin')`（共通モーダル）に委譲。ログイン済み時のチェックインフォームは従来通り `#ktnCheckinModal` を生成。(3) CSS のハードコード青（`.ktn-auth-btn-primary` グラデ／`-secondary:hover`／`-note a` の #3a90e0）を `var(--accent)` に統一（CLAUDE.md ブランド青集約ルール準拠）。**全ページのゲスト導線（watch/interest/checkin/購入申込）が同一モーダルを共有**。React化時は `<AuthGate action>` 1コンポーネントで icon/title/sub を action 別に出し分け、CTA は `<Link href="/login">`/`<Link href="/signup">` でルーティング。
- 2026-06-25 **発送日表記を「確度の階層」で4段に整理**（前項の発送可能日/発送予定日の分離を拡張）。販売前（申込前）の参考情報と、取引成立後の確度高い情報を**語で区別**する：低確度（非コミット）＝「時期＋（目安）」／高確度＝「日」。割り当て：(1) **p2-12-1 入力（LIAISON+作品管理・申込前）**「発送予定日」→**「発送時期の目安」**、補足を「発送が可能になる目安の日付を選択してください。購入希望者への参考情報で、確定の発送日ではありません。」に変更。(2) **p6-2 表示（作品ページ・申込前）**「発送時期」→**「発送時期（目安）」**（値「2026年3月31日以降」、誤記の余分な全角括弧 `）` を除去）。(3) **p3-16/p4-16 入力（購入確定・コミットに近い）＝「発送可能日」**（現状維持）。(4) **p5-15 表示（支払・配達希望日入力の参照・確度高い）＝「発送予定日」**（現状維持）。理由：同じ「発送予定日」が申込前（低確度・p2-12-1）と支払時（高確度・p5-15）で二重使用され、購入希望者・出品者が非コミットの目安をコミットと誤解する恐れがあった。「時期(+目安)＝幅・非コミット」「日＝特定日・確度高」で読み手が確度を判別できるようにする。typography.html の LIAISON+ 価格カードdemoのラベルも「発送時期（目安）」に同期。React化時は同一データでも文脈（出品前管理／作品公開表示／購入確定後）で確度ラベルを出し分け（field 自体は `shipReadyDate`、表示語＝低確度文脈は「発送時期の目安」、高確度文脈は「発送可能日/発送予定日」）。
- 2026-06-25 **出品者側 p3-16/p4-16 の S2（購入者の支払い待ち）取引内容・取引ログに発送可能日を追記**。理由：**出品者が S1（購入確定）で自分がコミットした発送可能日を、S2 以降も継続して意識できるようにする**ため（要望「前の状態でコミットした日付を意識させたい」の主体＝出品者）。S2 の「確定した取引内容」（`.p515-ship-confirm`）は作品代金/送料/梱包費/合計のみで発送可能日が無く、ログの「購入確定・送料確定」イベントも送料・梱包費のみだった。実装：(1) S2 状態ブロック `#p316StatusConfirmed`/`#p416StatusConfirmed` の取引内容に「発送可能日」行を合計の下に追加（p3-16=2026年3月10日 / p4-16=2026年3月20日＝各ページの ship-form プリフィル値）。(2) 取引ログ「購入確定・送料確定」note に「・発送可能日 …」を追記（`Confirmed`/`Paid`/`Shipped`/`Confirming`/`Done` の全状態ブロックで統一。S2 ブロックは末尾の `— 支払期限 …` の前に挿入）。ラベルは確度階層どおり**出品者側＝発送可能日**（購入者側 p5-15 は別シナリオ・別デモデータのため変更せず）。当初購入者側 p5-15 と誤読し p5-15 ログへ追記したが、要望主体が出品者だったため p5-15 は元に戻した。React化時はログイベント「購入確定・送料確定」のペイロードに `shipReadyDate` を含め、ロール別ラベル（seller=発送可能日 / buyer=発送予定日）で表示。
- 2026-06-25 **取引デスク3ページ（p3-16/p4-16/p5-15）の共通修正**（① 申込番号の安定表示／② モバイルCTAラベルの命令形化／③ モバイルCTAのスクロール先補正＋p4-16へCTA新設）。① **取引ログのキュー表示を「申込番号 #N」に統一**：「キューに追加（1番目／全2人）」「申込順 N番目／全X人申込中」等のキュー順位＋総数表記を `申込番号 #N` に置換（p3-16×7／p4-16×7／p5-15×6 note）。理由：申込数（全X人）はリアルタイムに変動しうるため、表示時点で陳腐化する数値より**申込ごとに一意で安定する申込番号**を識別子にする。② **モバイル固定CTAのラベルを汎用文言→命令形CTAに**：従来 `MCTA_LABELS` は状態別でも「○○の操作が必要です／○○の報告が必要です」と説明調だったのを、strip のターンラベル（2026-06-24 決定）と一致する命令形に変更（p3-16: new=購入を確定してください / paid=作品を発送してください / confirming=取引完了を確認してください、p5-15: payment=お支払いください / receipt=受取を確認してください）。表示方式は p3-16 の S1 strip（命令形CTA）に揃える。③ **モバイル固定CTAボタン（「操作へ進む ↓」）のスクロール挙動を補正**：従来は可視状態ブロックの先頭へ `scrollIntoView({block:'start'})` していたため sticky ヘッダー（`--dh`＋`--hh`）に隠れて主アクションが画面外になりがちだった。可視状態ブロック内の**主アクションボタン（`.ktn-op-btn--lg`）**を対象に、`getBoundingClientRect().top + pageYOffset - var(--dh) - var(--hh) - 16` で `window.scrollTo` する方式へ変更（ボタンが無ければブロック自体にフォールバック）。**p4-16 はモバイル固定CTAが未実装だった**ため、対ページ同時修正ルール（feedback memory）に従い p3-16 をミラーして新規追加：HTML `#p416MobileCta`/`#p416MobileCtaLabel`/`#p416MobileCtaBtn`（`</main>` 後・外部script前）、`setDemoState` 内のラベル切替ロジック、`#p416MobileCtaBtn` のスクロールハンドラ（アクションボタン p416ConfirmBtn/p416ShipBtn/p416DoneBtn＝いずれも `--lg`）。p4-16 は出品者ページのためラベル色は seller デフォルト（`--buyer` モディファイア無し）。React化時：①申込番号は申込エンティティの永続フィールドとして表示（総数のリアルタイム表示は別途集計）、②モバイルCTAラベルは strip と同じ state→命令形マップを共有、③スクロールはヘッダー高さ（CSS変数）を引いたオフセットへスクロールする共通ヘルパーに集約。**未対応の関連箇所（フラグ）**：一覧ページ p5-14 の strip ラベルにも「N番目／全X人」（例 `購入確定待ち　1番目／全2人　確定期限…`）が残存。これは今回の「3ページ」（取引デスク trio）の対象外だが同じリアルタイム変動の課題を持つため、別途「申込#N」化を検討する余地あり。
- 2026-06-25 **取引デスク S1（購入確定待ち・出品者 p3-16/p4-16）のCTA文言と「申込者／購入者」の使い分け基準を確定**。(1) S1 メインCTAボタン（`#p316/p416ConfirmBtn`）を「購入を確定して取引を開始する」→**「この申込者の購入を確定する」**に変更（「取引を開始する」は"確定"に含意のため省略・13字で全幅 `--lg` 1行に収まる）。理由：CTA単体「購入を確定する」だと"購入は購入者の行為"のため出品者が「自分が買うわけではない」と一瞬迷う。「この申込者の」を補い、誰の購入を確定するのかを明示。(2) S1 状態説明文（`.p515-status__desc`）の先頭言及「この**購入者**に作品を販売するために…」→「この**申込者**に…」へ。**使い分け基準＝S1（確定前）の一時的・行為主体としての言及は「申込者」、確定後にその人が購入者になる文脈・およびS2以降も同一に表示され続ける購入者情報（ユーザーカード／申込内容ブロックの項目ラベル「購入者 山田花子」・desc後半「確定後…購入者に支払い案内」）は「購入者」のまま**。理由：申込内容/購入者カードは S2 以降の取引ログ・配送先情報でも同じ見た目で再利用されるため、状態ごとに 申込者⇔購入者 を切り替えると一貫性が崩れる。客観的な状態名（バッジ「購入確定」・一覧/ログ・モーダルOK「購入を確定する」・ターンラベル「購入を確定してください」）は従来どおり据え置き（状態名の一貫性アンカー）。React化時は「申込者(applicant)＝確定前の行為主体ラベル」「購入者(buyer)＝確定後＋永続表示される人物情報」の2語をデータ上は同一エンティティの表示ラベルとして文脈で出し分ける。
- 2026-06-25 **購入確定モーダル（p3-16/p4-16 `#p316/p416ConfirmModal`）の文言を「申込者」に統一＋「確定≠販売保証」の注記を追加**。(1) モーダル説明文「以下の内容で**購入者**に支払い・発送予定を案内します。」→「…**申込者**に…」（S1＝確定前文脈のため前項の使い分け基準に準拠）。(2) warn枠（`.p515-modal__warn`）の2行目を旧「（万一、期限までに支払いが確認できない場合は…取り消し操作は不要です）」から**「申込者は送料・梱包費を確認のうえお支払いに進むため、支払い前にキャンセルされる場合があります。」**に差し替え。理由：出品者にとって「購入を確定」は"販売成立を確定する操作"に見えるが、実際は申込者が送料・梱包費・発送可能日を確認してから支払いに進む（支払い前キャンセル可）＝**確定＝販売成立保証ではない**。この非対称を埋め、後でキャンセルされた際の出品者の不信感を予防する。旧「万一…自動キャンセル」の注記はS2（支払待ち）状態ブロック冒頭に既出のため重複削除（ユーザー指摘）。React化時はモーダルのreassurance文を出品者向けに保持し、「申込者」表記は前項の文脈別ラベル出し分けに従う。
- 2026-06-25 **取引ページの保持方針を「メルカリ型」に確定**（相談の結論）。当初検討した「2週間でページごとクローズ／消去後は読み取り専用の伏字ページを永続表示」は**両案とも棄却**。メルカリ実物（購入者提示スクショ）を基準に再整理：取引レコードは**永続参照可**、2週間で非公開になるのは**取引メッセージ（コメント）のみ**、購入者情報欄は最初から**ニックネーム＋本人確認済**で実名は出していない。よって本サービスも：(A) **永続表示**＝取引明細（作品代金・販売手数料・販売利益／購入者側は支払額）＋**双方の評価**（コメント付き＝レビュー扱い）＋購入者情報＝**ニックネーム＋本人確認済**＋取引ID・日時。(B) **時限クローズ**＝取引メッセージ（やり取りコメント）を一定期間後に非公開。(C) **パージ対象は配送先の実名・住所・連絡先のみ**（元々ニックネームと別フィールド）。**鍵＝「ニックネーム（永続・公開）」と「氏名（配送用・一時）」を別フィールドに分けること**で、伏字の空ページ問題そのものが消える（永続表示するのは元から実名ではない）。「評価コメント＝永続／取引メッセージ＝時限非公開」の線引きはメルカリ踏襲。**前項(L132)の「ユーザーカードは『購入者（実名）』のまま」は本決定で上書き**（カード＝ニックネームへ変更）。React化時：User エンティティに `nickname`(公開・永続) と、取引の配送スナップショット `shipping.name/address`(一時・パージ対象) を分離。取引ページは消さず、メッセージのみ可視期限、配送スナップショットのみ TTL。領収書/精算は永続化される取引ページ＋常設一覧（p5-14／LIAISON+コンソール）双方から参照。
- 2026-06-25 **上記の第一歩を実装：出品者デスク p3-16/p4-16 購入者カードのニックネーム/実名分離**。(1) 購入者カード（C-2 `#p316/p416BuyerCard`）の表示名を実名（山田 花子／佐藤 健）→**ニックネーム（hanaco／ken_s）**に変更し、`.p316-purchase-buyer__verified`（緑チェック＋「本人確認済」、common.css L10611付近に新規追加）を併記。アバターも頭文字（H／K）に。(2) S1「申込内容」ブロックの行ラベル「**購入者**」→「**お届け先氏名**」に変更（実名はカード＝口座識別ではなく配送スナップショットであることを明示。値の実名は据え置き）。(3) カード内 expired 注記（`#p316/p416BuyerExpired`・hidden）の文言を「購入者の個人情報は消去されました」→「**お届け先（氏名・住所）の情報は消去されました**」に。**未対応（次工程フラグ）**：①取引ログ内の申込スナップショット行（`.p515-log-apply__row` 「購入者 山田花子/佐藤健」×複数）は実名のまま＝expired時の消去対象だが未連動。②expired/完了後の全体挙動（メッセージ時限非公開・配送スナップショットのパージ表示・最終状態＝双方評価＋売上/支払実績の残置）は未実装。③出品者側 p3-16/p4-16 に購入者側 p5-15 相当の expired 状態連動が無い非対称は未解消。④領収書/精算の常設ページ（p5-14／コンソール）からの参照導線の有無は未確認。React化時はカード＝`user.nickname`+verified、申込内容/配送先＝`shipping.*`(TTL付き) にバインド。
- 2026-06-26 **メルカリ型保持モデルの「取引完了アーカイブ挙動」を3ページ（p3-16/p4-16/p5-15）に実装**（L134 方針の本実装・L135 の未対応②③を解消）。(1) **取引完了ブロックに双方の評価を永続表示**：`done`/`expired` 両状態で出る取引完了ブロック（`.p316-done` / `.p515-done`）の説明文とアクションの間に `.p316-done__reviews`（`__review`/`__review-head`/`__review-stars`/`__review-text`・common.css 新規・モバイル縦積み）を追加。出品者視点（p3-16/p4-16）＝「購入者からの評価」＋「あなたの評価」、購入者視点（p5-15）＝「出品者からの評価」＋「あなたの評価」の2枚を並べる。これが取引の**最終記録（永続）**＝双方評価＋金額（`¥…確定`）。(2) **S5 完了確認の出品者→購入者 評価入力を新設**：p3-16/p4-16 の旧「購入者へのメッセージ（任意）」（`.p316-complete-msg` テキストエリアのみ）を購入者側 S4 受取評価と同じ `.p515-review` ウィジェット（★5 `#p316/p416SellerReviewStars` ＋コメント `#p316/p416CompleteMsg`・`.ktn-io-self-guide` 見出し・注記「お互いが評価を入力すると双方に公開されます」）に置換し星ホバー/選択JSを追加。これで双方の評価が両ロールから入力され成立。(3) **取引メッセージ（コメント）を削除→時限非公開化**：注記「取引終了後1週間で消去」→**「完了後2週間で非公開」**。アーカイブ後（`expired`）はコンテナに `.p515-comments--closed` を付与しリスト・入力を `display:none`、代わりに `.p515-comments__closed`（鍵アイコン＋「取引完了から2週間が経過したため、コメントは非公開になりました。これまでのやり取りはこの取引の記録として保存されています。」・common.css 新規）を表示（**削除でなく非公開＝記録は保存**）。(4) **取引ログはアーカイブ後デスク/ワークスペースから消去**：`expired` 時に `LOG_IDS` 全要素を hidden。詳細（領収書・精算）は購入管理 p5-14／LIAISON+コンソールへ集約する方針（L134(B)）に沿い、デスクの永続記録は「取引完了ブロック＝双方評価＋金額」に絞る。(5) **購入者カードはアーカイブ後も永続表示**：旧 `setDemoState` の `expired` 分岐（カード hidden ＋ expired注記表示）を撤廃。ニックネーム分離（L135）済のためカード（hanaco/ken_s）をそのまま残す。**併せて L135 で追加した「本人確認済」バッジ（`.p316-purchase-buyer__verified`）と expired注記（`#p316/p416BuyerExpired`）はユーザー指摘で削除**（カードはニックネームのみ表示・HTML/JS/CSS とも除去）。配送先実名・住所のパージは「ログ消去＋配送スナップショットTTL」で表現し、カード上の専用注記は出さない。(6) **コメント投稿者を実名→ニックネーム**：コメント欄の購入者名「山田 花子／佐藤 健」を `hanaco／ken_s`、アバターを `H／K` に（出品者＝田中 透／Gallery SOIL 渋谷 は公開表示名のため据え置き）。(7) デモバー `完了(1週間後)`→**`完了(アーカイブ)`**（3ページ）。**設計判断**：購入者側 p5-15 では双方の評価を表示のみ（購入者の評価入力は S4 受取評価で既存・出品者の評価は表示）で出品者評価の入力ウィジェットは置かない（入力は各自のデスクで）。**残る未対応フラグ**：①取引ログ内の申込スナップショット実名（`.p515-log-apply__row`）の expired パージは、ログ自体を消す方式にしたため当面不可視化で足りるが、ログを残す UI に変える場合は実名連動が必要。④領収書/精算の常設導線（p5-14／コンソール）は別途。React化時：取引完了で `review.buyer`/`review.seller` を確定し永続表示、`messages` は可視期限（2週間）後に `visibility:private`、`shipping.*` は TTL パージ、`transaction log` 詳細はデスクから外し履歴/コンソールへ集約。`<TransactionArchive>` は評価2枚＋金額＋ニックネームカードのみ描画。
- 2026-06-26 **取引4ページ（p3-16/p4-16/p5-15）の例外・キャンセル処理を「取引サポート入口」一本化に方針確定＋実装**。**方針＝個別状態ごとにキャンセル/問題ボタンを散在させず、状態パネル末尾に常設の単一入口（`.ktn-txn-help` ＝全状態で同位置）を置き、ラベルと中身（オプション）のみ状態対応で出し分ける**。入口クリックで `data-states` 属性（半角空白区切りの状態リスト or `*`＝全状態）でフィルタした取引サポートシート（`#p{ID}TxnHelpSheet`＝`p515-modal` シェル流用）を開き、各オプションが既存の確認モーダルや遷移にディスパッチ。**優先順位（厳密順）＝①管理者荷重の最小化（少人数運営・振り分け過多は過負荷＋対応ばらつき→信用低下）②サイトの信用・信頼 ③メンテナンス性**。設計原則＝**管理者は「実行者／最終調停者」であって「決定者」ではない**。意思決定は当事者が行い、その意思を申請に明示的に載せて管理者は実行のみ。**棄却した自動化**：(i) 発送タイムアウトの自動キャンセル＝購入者の意向（まだ待ちたい/作品が欲しい）を無視しクレーム化、出品者・購入者双方が避けたい事象を機械が起こす危険。→ **購入者が期限時に選ぶ（督促 or キャンセル申請）**形に。(ii) 発送前キャンセルの自動処理＝次の申込者の有無・作品のサイト内扱いをシステムが自動判断できない。→ 出品者が申請フォームで作品の扱い等の意思を明示。**新サービス導入前に全事象を想定・決定するのは困難なので、入口を一か所に集約すれば注意書き・対応を一元管理でき、導入後に出てくる問題も同じ場所に集約できる**（＝この方針の主要理由）。**実装**：(1) 共通CSS `.ktn-txn-help*`（入口ボタン＋シート内オプション/note/choice/field）を common.css に追加（`.ktn-txn-help__opt[hidden]`/`.ktn-txn-help__note[hidden]` の明示セレクタで `[hidden]` を効かせる＝L137(b)と同じ詳細度対策）。(2) **入口は3ページとも「取引完了/キャンセル系の最終ブロック直後・取引ログの直前」に配置**し、`setDemoState` 内で `setDemoState.curKey = effectiveKey`（現在状態を関数プロパティに保持）＋入口ラベル（`#p{ID}TxnHelpLabel`）を状態別に書換（購入者 p5-15＝applied/payment/paid/receipt で4種、出品者 p3-16/p4-16＝new「会場売約済・困ったとき」/paid「発送のキャンセル・困ったとき」、他は「この取引について困ったとき」）。(3) **既存の散在キャンセルボタンをシート内に格納**：出品者の「発送前キャンセル申請」ボタン（旧 `.p316-cancel-request-wrap`・HTML/CSS とも廃止）はシートの alert オプション `data-act="shipcancel"`→既存 `openCancelReqModal()` 再利用に。購入者 p5-15 の旧 C-6「購入をキャンセルする」も入口経由のオプション `data-act="cancel"`→既存 `openCancelModal()` に集約。(4) **購入者 p5-15 のみ新規モーダル2点**：発送遅延・未着（`#p515ShipDelayModal`＝ラジオ「もう少し待つ（督促）/キャンセルして返金申請」＝**期限時の購入者の選択**を明示化＝棄却(i)の代替）と受取問題報告（`#p515ReceiptIssueModal`＝「受取確認はまだしないで」warn＋必須テキスト＝当事者間解決優先・不調なら管理者）。出品者側は新規モーダル不要（shipcancel は既存申請モーダル流用）。(5) シート内オプション例＝購入者：cancel(applied/payment,alert)/shipdelay(paid,alert)/receiptissue(receipt,alert)/note「出品者の操作待ち」(applied/paid/confirming)/message→コメントへスクロール/receipt-doc(done)/contact(*)。出品者：console「会場売約済→コンソール」(new)＋「販売代金・記録→コンソール」(done)/shipcancel(paid,alert)/note「購入者の操作待ち」(confirmed/shipped)/message/contact(*)。**設計上のキモ＝支払い境界がキャンセルのピボット**：支払い前は購入者の自己完結キャンセル（返金なし）、支払い後はどの当事者のキャンセルも返金を伴う→管理者申請。React化時は `<TxnHelp state role>` 1コンポーネントで、`options[]` を state×role でフィルタし、各オプションの action（既存モーダル/遷移/スクロール）にディスパッチ。「入口＝1つ・中身＝状態対応」を保ち、導入後の新事象はオプション追加で吸収する。
- 2026-06-26 **上記アーカイブ実装のフォローアップ（用語統一・バグ修正・FAQ整合）**（3ページ p3-16/p4-16/p5-15）。(a) **UI用語「取引コメント」→「取引メッセージ」に統一**（メルカリ準拠）：コメント欄セクションタイトル（3ページ）・閉鎖通知文（`.p515-comments__closed`）・p3-16/p5-15 のFAQ本文の「コメント」表記を「取引メッセージ」に変更。クラス名（`.p515-comments*`）は据え置き＝表示文言のみ変更。(b) **閉鎖通知の表示バグ修正**：`.p515-comments__closed{display:flex}`（クラス詳細度 0,1,0）が UA の `[hidden]{display:none}` を上書きするため、`hidden` 属性付きでも全状態で表示されていた。`.p515-comments__closed[hidden]{display:none}`（詳細度 0,2,0）を common.css に追加して `完了(アーカイブ)` ステップのみ表示に修正（共有CSSのため3ページ同時解消）。(c) **FAQの保持方針を実装モデルに整合**：p3-16「購入者の住所・氏名はいつまで？」FAQ・p5-15「領収書」FAQ の旧文（「取引終了から1週間後に…取引メッセージはこのページから消去されます」）を新モデルに書き換え＝**配送先の氏名・住所＝取引完了から1週間後にこのページから消去／取引メッセージ＝取引完了から2週間後に非公開（削除はせず取引の記録として保存）／領収書・取引明細（個人情報を除く売上情報含む）は消去対象外でアーカイブ・購入管理・販売代金管理から継続確認可**。理由：(a)はメルカリのUI語彙に寄せた呼称統一、(c)は L136 で実装した「記録は永続・メッセージは時限非公開（非削除）・配送先実名のみパージ」モデルと FAQ 文言が矛盾していたため。React化時：保持ポリシーは `shipping.*`=完了+1週TTLパージ／`messages`=完了+2週で `visibility:private`／`record`(評価・金額・領収書)=永続、を単一の保持ポリシー定数として持ち、FAQ・通知文はそれを参照（日数ハードコードしない）。
- 2026-06-26 **取引中ユーザー向けの専用ガイドページを2枚に集約（ロール分割）＝p70-11（取引ガイド 購入者編）／p70-12（取引ガイド 出品者編）を新設**。両ページとも `noindex`・取引中（L+）限定アクセス前提。**方針＝各取引フェーズの「困ったとき」「進め方」を取引デスク（p3-16/p4-16/p5-15）内に散在させず、フェーズ別アンカーを持つ専用ガイドに外出しし、デスクのサポートシートから深リンクで該当フェーズへ飛ばす**。(1) **2ページは対称構造**：同一アンカーID（`#about`/`#overview`/`#phase-confirm`(S1)/`#phase-payment`(S2)/`#phase-ship`(S3)/`#phase-receipt`(S4)/`#phase-complete`(S5)/`#terminal`/`#trouble`）を持ち、ロール（購入者/出品者）でターンラベル・本文・参照リンクを反転。出品者編 foot＝←作品販売ガイド(p70-2)／リエゾン+コンソールへ→(p3-15)、購入者編 foot＝←作品購入までの流れ(p70-3)／購入管理へ→(p5-14)。(2) **フローダイアグラムで「読者が操作するステップ」を色強調**：各ガイドの読者ロールが操作するフロー STEP（購入者編＝STEP1/3/5 申込・支払・受取確認／出品者編＝STEP2/4/6 購入確定・発送・完了確認）の `<li>` に `.p70-flow-diagram__item--mine` を付与。CSS はページ非依存（common.css・`--mine`＝アクター色塗り＋border 1.5px、非 mine ステップは border/actor/num をグレーに退かせる）でHTML側クラスのみページ別。共有アクター色セマンティクスは変更しない。(3) **3デスクのサポートシートに状態対応の深リンクを追加**：各シート末尾に `.ktn-txn-help__guide`（`.ktn-guide-link`・`target=_blank`）を置き、`thEntry` クリック時に現在状態キー→アンカーのマップ（`GUIDE_ANCHOR`）で href を `kotennavi-p70-1{1|2}.html#phase-…` に書換。出品者デスク p3-16/p4-16→p70-12、購入者デスク p5-15→p70-11。**モーダルからモーダルを開かない不変則を確立**：サポートシートはデスク第1階層からのみ開き、シート内ガイドリンクは別タブ遷移（ネストモーダルにしない）。操作モーダル内の「困った」はインラインヒント/ガイドリンクで対応し第2のモーダルを開かない。(4) sitemap.md の p70-11/p70-12 href を正しい自ファイルに修正＋アクセス列整合（p70-11 を L+ 化）。理由：取引フェーズ別の説明・例外対処はデスクUIに混ぜると状態ごとに散在・重複し保守困難（L138 の「入口一本化」と同系の集約思想をガイド側にも適用）。ロール分割は購入者/出品者で「自分の操作」と「相手待ち」が逆転するため、1ページに両ロールを混ぜず読者の視点を固定する方が誤読が少ない。React化時：`<TxnGuide role={buyer|seller}>` 1コンポーネントでアンカー構造を共有しロール別にターンラベル/本文/foot リンク/`--mine` ステップを出し分け、デスクの `<TxnHelp>` から `state→anchor` で deep-link。ガイドはルートで `noindex` ＋取引中ロールガード。
- 2026-06-26 **サポートシート末尾「その他の問題を相談する」（contact）の遷移先をモーダルに確定・実装**（3ページ p3-16/p4-16/p5-15）。**方針＝専用の問い合わせページは新設せず、shipdelay/receiptissue と同じパターン（シートを閉じてから開く＝ネストモーダルにしない）で問い合わせモーダル（`#p{ID}ContactModal`）を開く**。モーダルは「取引番号＋現在フェーズを自動添付」＋必須の相談内容テキスト＋送信（`--primary`）/戻る。取引番号は `.ktn-mgmt-head__meta-id` から実行時に取得（ハードコードしない）、フェーズは現在状態キー→正式状態名のマップ `PHASE_LABEL`（出品者 new/confirmed/paid/shipped/confirming/done/cancelled、購入者 applied/payment/paid/receipt/confirming/done/cancelled）で表示。送信は空欄バリデーション後にトースト（デモ）。**設計理由＝contact はガイド全体（p70-11/12 の #trouble・FAQ が一様に「取引デスクの困ったときからサポートへ」と誘導）の終端＝人間/管理者に繋ぐ最終アクション**。専用ページを増やすと取引文脈の受け渡し設計が別途必要になるため、デスク内モーダルで取引番号・フェーズを自動添付し管理者が文脈を即把握できる形にした（L138「入口一本化」の延長＝終端も同じ場所に置く）。**併せて確認＝操作モーダル内に第2モーダルを開く「困った」は現状存在せず（サポートシート→各操作モーダルは `closeThSheet()` で閉じてから開く既存実装）、ネストモーダル回避の追加対応は不要だった**。新CSS＝common.css `.ktn-txn-help__ctx`（自動添付コンテキストの dl・取引番号 dd は `.is-id` で Montserrat）/`.ktn-txn-help__ctx-note`。React化時は `<TxnContactModal txnId phaseLabel>` で、添付フィールドは取引エンティティから自動取得・送信先はサポート問い合わせAPI（管理者キュー）に紐付け。
- 2026-06-27 **取引サポート入口をシート（モーダル）から「2リンク直置き」に作り直し（3ページ p3-16/p4-16/p5-15）＝L140 の入口一本化を踏襲しつつ UI を簡素化**。**方針＝状態×ロールで中身を出し分ける1枚のサポートシート（`#p{ID}TxnHelpSheet`＝モーダル）をやめ、状態パネル末尾に常設の `.ktn-txn-help` 内へ2本のインライン行リンク（`.ktn-txn-help__line`）を直接置く**：①**ガイド参照**（`.ktn-guide-link`・`<a target="_blank">`・テキスト状態動的「{フェーズ名}の進め方・困ったとき →」・現在状態キー→`GUIDE_PHASE`でラベル＋`GUIDE_ANCHOR`でアンカーを生成し p70-12（出品者）/p70-11（購入者）の該当フェーズへ deep-link）／②**サポート相談**（`<button class="ktn-guide-link">`・クリックで `openContactModal()` をデスク第1階層から直接呼ぶ）。**理由＝(1) モーダルからモーダルを開かない不変則（L142(3)）の最も確実な担保＝相談モーダルをシート経由でなくデスク直下のリンクから開けば「モーダル in モーダル」が構造上起きない。(2) シートの状態別オプション分岐（cancel/shipdelay/receiptissue/note/message/console…）は実質「ガイドを読む」か「人に相談する」の2択に集約でき、状態ごとの出し分けは①ガイドの deep-link 先だけで足りる＝UIと保守を大幅簡素化**。**吸収・削除した構造化モーダル**：購入者 p5-15 の発送遅延・未着（`#p515ShipDelayModal`）／受取問題報告（`#p515ReceiptIssueModal`）、出品者 p3-16/p4-16 の発送前キャンセル申請（`#p{ID}CancelReqModal`＋`openCancelReqModal()`）＝いずれも相談モーダルの自由記述に統合して HTML/JS とも削除（シート本体 `#p{ID}TxnHelpSheet`・入口ボタン `.ktn-txn-help__entry`・`closeThSheet`/`thEntry`/`#p{ID}TxnHelpLabel` も全廃）。**購入者の支払前キャンセルだけは direct ボタンとして残置**：p5-15 に `#p515CancelLink`（`.ktn-op-btn--danger-outline --sm`「購入をキャンセルする」・`.ktn-txn-help__cancel` 行・**applied/payment の支払前のみ表示**＝`setDemoState` で `cancelRow.hidden` をトグル）→ 既存 `openCancelModal()`/`#p515CancelModal` を再利用。理由＝支払前キャンセルは購入者の自己完結操作（返金なし・管理者不要）でガイド/相談に回す性質ではなく、その場で実行できる導線を残すのが自然（L140 の「支払い境界＝キャンセルのピボット」を UI に反映）。**出品者の会場売約済（S1）はページ上部の既存 strip をそのまま残し**、サポート2リンク側に別途 会場売約済リンクは設けない（ユーザー指示）。**CSS整理**：シート用 orphan CSS（`.ktn-txn-help__intro/__opts/__opt*/__note*/__choice*/__guide`）を削除し、新規 `.ktn-txn-help__links/__line/__cancel` を追加。`.ktn-txn-help__field*`（相談モーダルのテキストエリア）と `.ktn-txn-help__ctx*`（自動添付コンテキスト）は相談モーダルが継続使用のため保持。相談モーダル説明文の「上記で解決しない」→「ガイドで解決しない」に変更（直前がオプション列でなくガイドリンクになったため）。React化時は `<TxnSupportLinks state role>`＝ガイドリンク（state→anchor で p70-11/12 へ deep-link）＋相談ボタン（`openContactModal()`）の2本固定、購入者かつ支払前のみ `<CancelButton>` を追加。状態別の分岐は「ガイドの deep-link 先」と「buyer cancel の表示可否」の2点のみ。
- 2026-06-27 **取引サポート2リンクを「取引完了（done）・完了アーカイブ（expired）」では非表示に**（3ページ p3-16/p4-16/p5-15）。`setDemoState` で `#p{ID}TxnHelp` の `hidden` を `effectiveKey === 'done'` でトグル（`effectiveKey` は expired を 'done' に畳むため done・アーカイブ両方をカバー）。**理由＝完了・アーカイブは「記録閲覧のみ」のフェーズで、ガイド（`#terminal`＝取引完了後）の実益が薄く、相談導線も浮く（メッセージも非公開化される）。完了後の問い合わせはサイト共通のサポート窓口に委ねる**。**キャンセル済（F2＝cancelled）は2リンクを残す**：途中中断は事後相談ニーズが残りうるため（ユーザー判断＝案A採用、cancelled は残置）。相談メールの連絡手段は「取引メッセージまたはメール」→**「ご登録のメール」に統一**（モーダル説明文・送信トーストとも・取引メッセージ経由の返信を廃止）。CSS は `.ktn-txn-help` 自体に display 指定がないため `hidden` 属性で UA 既定 `display:none` が効く（追加CSS不要）。React化時は `<TxnSupportLinks>` を done/expired で非表示、cancelled では表示、返信チャネルはメール固定。
- 2026-06-27 **取引ログの整合・フラット化**（3ページ p3-16/p4-16/p5-15）。(1) **「取引完了確認（出品者/ギャラリー）」ログに出品者の評価を表示**：L139 で S5 に出品者→購入者の評価入力（★＋コメント）を新設したのに、ログ側は出品者コメントのみ（`.p515-log-apply--msg`）で★が抜けていた。購入者の「受取確認・評価入力」ログと同じ `評価：★★★★★「…」`（`.p515-log-item__note`）形式に統一。値は各ページの完了ブロック「あなたの評価」と一致（p3-16/p5-15＝★5・コメント同文／p4-16＝ギャラリー文）。(2) **個別ログブロックの背景色を廃止しフラット化**：`.p515-log-apply{background:var(--paper);border-radius;padding}` → 背景・角丸・padding を除去（`margin-top`/flex のみ）。申込内容ブロックの淡色ボックスを廃し、ログ全体を罫線区切りのフラット表示に統一（ユーザー指示「特別な意図がなければ背景なしに統一」）。`.p515-log-apply--msg` は全ページで未使用化（msg→note 変換）。expired 時の個人情報非表示・「※個人情報は…消去」注記の `:not(.p515-log-apply--msg)` ルールは残存（全 `.p515-log-apply`＝申込ブロックにマッチし従来どおり機能）。React化時：取引完了確認イベントの payload に seller review（★＋コメント）を含めログ描画、ログ項目は背景なしのタイムライン表示。

- 2026-06-27 **申込者/購入者の用語整理＋支払待ち金額表示の明細化**（取引3ページ）。(1) **S1（申込受付〜購入確定待ち）の人物呼称を「申込者」に統一**：確定前は購入者ではなく申込者であるため（L135 の用語ルールに沿う）。出品者ページ（p3-16/p4-16）の S1「申込内容」ブロックのタグ「購入者が入力した内容」→「申込者が入力した内容」、ラベル「お届け先氏名」→「申込者氏名」、取引ログ「購入申込受付」イベントの actor ラベル「購入者」→「申込者」（各ページ7箇所）。**S2以降（確定後）の「購入者 配送先」「購入者 支払い完了」等は購入者のまま据置**（確定後は購入者）。p5-15 のログラベルは「受取人」のため対象外。(2) **p5-15 支払待ち（S2）の金額表示を明細テーブル化**：旧 `.p515-total`（合計1行＋calc文字列）→ 支払済(paid)状態と同じ `.p515-ship-confirm`「お支払い内訳」（作品代金/送料/梱包費/合計）に統一。見やすさ向上（ユーザー指示）。`.p515-total*` は全ページで未使用化したため common.css のメインブロック＋レスポンシブルール（`.p515-total{flex-direction:column}` 等）を削除。React化時：S1 の人物表示を applicant 名で描画、S2 支払金額は明細行コンポーネント（作品代金/送料/梱包費/合計）で統一。

- 2026-06-27 **取引デスク（p3-16/p4-16/p5-15）のヘッド汎用ガイドリンクを削除**。ページタイトル リード文下の `.ktn-mgmt-head__guides`（p3-16/p4-16＝「作品販売ガイド →」p70-2／p5-15＝「購入までの流れ →」p70-3）をブロックごと撤去。理由：取引デスクは取引進行中の画面で、出品/購入の事前案内寄りの汎用ガイドは文脈がズレる。状態パネル末尾にフェーズ別ガイド（p70-12/p70-11 ディープリンク）＋相談リンクが既にあり、そちらが「いま何をすべきか」に直結。`.ktn-mgmt-head__guides` クラス自体は p3-15/p4-15 で継続使用のため CSS は残置。React化時：取引デスクのヘッドには汎用ガイド枠を出さない。

- 2026-06-27 **取引デスクの「よくある質問」を状態連動フィルタ化**（p3-16/p4-16/p5-15）。各 FAQ 項目に `data-faq-phase`（フェーズ状態キー）を付与し、`setDemoState` で **現在状態より前のフェーズ（すでに過ぎた状態）の質問を `hidden`** にする。属性なしの項目＝フェーズ非依存（全体の流れ・キャンセル方針・完了後の振込/領収書/個人情報消去・受取トラブル等）は常時表示。判定：`STATE_IDX[phase] < STATE_IDX[現在状態]` で非表示、後退時は再表示。フェーズ付与＝出品者(p3-16)：申込最初/会場売約済=new・発送業者/発送いつ=paid。出品者(p4-16)：申込最初/会場売約済/送料設定=new・発送いつ=paid。購入者(p5-15)：購入確定待ちとは/郵便番号変更=applied・支払方法=payment・いつ届く=paid・受取確認とは=receipt。理由：デスクは状態連動UI（状態パネル・ガイドリンクと同方針）。過去フェーズの質問は現状では不要なノイズになるため、現在＋未来フェーズの質問のみ残す。React化時：FAQ を現在フェーズ index 以上＋フェーズ非依存のみ描画。

- 2026-06-27 **p5-15 取引ログ「購入申込受付」の人物ラベルを「受取人」→「申込者」に**。確定前は受取人ではなく申込者であるため（L135 の「確定前＝申込者」原則を購入者側ログにも適用）。replace_all で `.p515-log-apply__label` の「受取人」を「申込者」に統一（購入申込受付ログ内6箇所）。**配送先フォームのラベル「受取人氏名」と支払内訳の「受取人」は据置**（実際に荷物を受け取る人を指す物流上の語のため、申込フェーズの actor 表現とは別軸）。

- 2026-06-27 **相談モーダルのコンテキスト dt を1行化**（取引3ページ共通）。`.ktn-txn-help__ctx dt` の `flex:0 0 88px` が「現在のフェーズ」（7字・.8rem）で折り返していたため `flex:0 0 100px`＋`white-space:nowrap` に拡幅。取引番号 dt との左揃えは維持。

- 2026-06-27 **必須マーカー `.ktn-req` を新設し全ページ共通化**。フォームラベル末尾の必須表示を `<span class="ktn-req">必須</span>` に統一（canonical＝common.css `.ktn-txn-help__field-label` 付近・`margin-left:5px;font-family:var(--fn);font-size:.7rem;font-weight:500;color:#b43c14;letter-spacing:.04em`）。**理由＝サイト内に「（必須）」インライン括弧書き・`*` アスタリスク（p2-11 `.p211-req`）・インライン style 赤文字「必須」（typography デモ）の3表記が混在していたため、色のハードコードを排し1クラスに集約**。適用＝取引3ページ（p3-16/p4-16/p5-15）の問い合わせモーダル「ご相談内容」（旧「（必須）」を置換）／出品者発送フォーム（発送業者・業者名を入力・送料・発送可能日。**梱包費は自動算出寄りのため除外**）／出品者追跡番号フォーム（発送業者・業者名・追跡番号）／購入者配送先（受取人氏名・フリガナ・市区町村番地以降・電話番号）。**除外＝任意項目（「（任意）」表記）・readonly（郵便番号/都道府県＝変更不可）**。typography.html のインライン「必須」2箇所も `.ktn-req` に変換。**未統合＝p2-11 の `.p211-req`（`*`＋JSバリデーション）は自己完結する既存システムのため本パスでは触らず**（将来のフォーム整備時に寄せるか要判断）。**判定の微妙な項目**：受取方法 select（default「指定なし」あり＝任意扱いで除外）・追跡番号（業者により無い場合あるが発送通知の主キーとして必須扱い）はレビューで調整余地あり。**発送業者「その他」選択時の業者名（手入力）は条件付き必須**：業者 select で「その他」を選んだ時のみ入力欄が現れ、その入力欄ラベルに `.ktn-req` を付与（＝非表示時はマーカーも出ない）。React化時：`<FormLabel required>` or `<RequiredMark>` でラベル直後に描画、required はフィールドスキーマ駆動（条件付きは依存フィールド値で required を切替）。

- 2026-06-27 **取引期限アラート（`.ktn-txn-alert` / `.p316-action-deadline__soon`）を新設し取引3ページ共通化**。要対応フェーズで一定期間操作がない場合に画面へアラートを出す設計。**理由＝要対応（自分の番）の状態は期限超過で自動キャンセル/自動確定など不可逆な結果につながるため、残り期限を能動的に知らせる導線が必要だったため**。設計判断：**(1) 2段階表示**＝〈間近 near〉は `.p316-action-deadline__soon`（既存 `.p316-action-deadline` 内・`__note` 直後の赤ドット1行注意書き）、〈超過 overdue〉は `.ktn-txn-alert`（状態パネル最上部・`.p515-status__head` の前に置く赤枠＋警告三角アイコン＋タイトル＋本文バナー）。チップ `.ktn-days-chip` の `--urgent`（赤塗り）と右肩日付 `.p515-status__deadline--alert`（赤文字）も両段階で連動。**(2) `my-turn`（自分の番）フェーズに限定**＝相手の番（waiting）では当人は操作できずアラートは無意味なため出さない。my-turn 定義は出品者デスク（p3-16/p4-16）= new(S1購入確定)/paid(S3発送)/confirming(S5完了確認)、購入者デスク（p5-15）= payment(S2支払)/receipt(S4受取確認)。**(3) 表示制御に `.is-on` クラスを採用し `hidden` 属性は不使用**＝デフォルト `display:none` のクラスに `.is-on{display:flex}` を足す方式。`hidden` 属性だと UA の `[hidden]{display:none}` をクラス側 `display:flex` が同詳細度・後勝ちで上書きしてしまい意図せず表示されるのを避けるため。**(4) デモはデモバー「期限：通常/間近/超過」トグルで段階を手動切替**（静的HTMLに時計がないため）。本番（React CSR）は API/Drupal が返す期限値と現在時刻から段階をクライアント側で自動算出（near閾値・overdue判定をクライアントで計算）し、HTML構造・クラス（`.is-on`）はそのまま流用可。alert文言は状態別（発送/確認/完了確認の各「○○期限を過ぎています」＋帰結説明）。

- 2026-06-27 **【上記アラートの例外】p5-15 `payment`（S2支払）は2段階とも「期限前」扱いにする**。**理由＝支払は期限超過＝申込が自動キャンセルされ、その時点でこの取引ページ自体にアクセスできなくなるため、「支払期限を過ぎています」という超過状態は購入者の画面に存在し得ない**（ページが見えている＝まだキャンセルされていない＝期限前、という論理的整合）。よって payment の第2段階（escalated）は「超過」ではなく**期限直前の最終警告**として再定義：(1) バナー文言を「支払期限を過ぎています／このままでは自動キャンセル」→**「まもなく支払期限です／期限を過ぎると自動キャンセルされお支払いできなくなります」**（HTML側）。(2) チップ文言を `OVERDUE_CHIP = { payment:'本日中' }` で「期限超過」→**「本日中」**に差し替え（JS側）。間近stage（chip「あと1日」＋soon note）も含め両段階とも期限前。**他の my-turn 状態は通常どおり 間近→超過のまま**：receipt（S4受取確認）は超過しても自動受取確認で取引継続・ページは次状態へ遷移し残る、出品者 new/paid/confirming は出品者の管理デスクなので超過してもアクセス継続するため、超過バナー表示に矛盾がない。**本番（React）も payment 状態は超過段階を出さず最終警告まで**（期限到達＝即キャンセル処理でページ遷移）。

- 2026-06-27 **【上記の追補】p5-15 `receipt`（S4受取確認）は期限前1段階（間近）のみ・超過バナーなしにする**。当初は receipt も「間近→超過」標準のままとしたが、**受取確認は期限超過しても自動受取確認となり取引が継続する（＝代金が失われる等の不可逆な不利益がなく影響度が小さい）ため、超過バナー（`.ktn-txn-alert`）は不要**と判断。receipt ブロックから `.ktn-txn-alert` を削除し、soon note（`.p316-action-deadline__soon`「確認期限が迫っています」）の1段階のみ残す。JS は `NO_ESCALATE = { receipt:1 }` を追加し、`applyUrgency` で overdue レベルが来ても near に畳む（`if (NO_ESCALATE[cur] && level==='overdue') level='near'`）。**結果、取引4ページの段階設計は3種**：出品者 new/paid/confirming＝間近→超過（標準）／購入者 payment＝2段階とも期限前（間近→最終警告）／購入者 receipt＝間近のみ。本番（React）も receipt は超過段階を描画しない。

- 2026-06-27 **【さらに追補】出品者 `confirming`（S5完了確認）も購入者 `receipt`（S4受取確認）と同位置付け＝期限前1段階（間近）のみ・超過バナーなしに揃える**。**理由＝完了確認は期限超過しても7日経過で自動確定となり取引が継続する（S4の自動受取確認と同じく不可逆な不利益がなく影響度が小さい）ため**。S4・S5を同列に扱う方針で、p3-16/p4-16 の confirming ブロックから `.ktn-txn-alert` を削除し soon note（「確認期限が迫っています」）1段階のみに。JS は両ページに `NO_ESCALATE = { confirming:1 }` を追加し overdue→near に畳む（p5-15 の receipt と同じ仕組み）。**対ページ同時修正**（p3-16/p4-16）。**最終的な段階設計の判定軸＝「期限超過時に不可逆な不利益があるか」**：あり（new/paid＝キャンセル等）→間近→超過、なし（payment＝ただしキャンセルだがページ消失のため期限前2段階／receipt・confirming＝自動確定で継続）→間近1段階（payment のみ例外的に最終警告まで）。

- 2026-06-27 **【整合性チェックの結論・上記2件を訂正】段階設計の判定軸を「不可逆な不利益があるか」→「期限到達で状態が自動遷移するか（＝超過状態がこの画面に現れ得るか）」に改める**。**理由＝整合性チェックで `new`（S1購入確定）の扱いが論理矛盾していることを発見**：S1は期限到達で取引が自動キャンセルされ出品者デスクのこの取引が消えるため、`payment`（S2）と全く同じく「過ぎています」超過バナーは原理的に表示され得ない。にもかかわらず S1 だけ「間近→超過」のままだった（出品者デスクだから超過継続、という旧理由は誤り＝取引単位で消えるため）。**正しい3分類**：(1) 自動遷移しない（超過がこの画面に実在）＝`paid`（S3発送、管理者通知されるが出品者は state に留まる）→間近→超過。(2) 自動遷移＝キャンセル（影響大）＝`new`（S1）/`payment`（S2）→2段階とも期限前（間近→最終警告、チップ「本日中」）。(3) 自動遷移＝確定（影響小）＝`receipt`（S4）/`confirming`（S5）→間近1段階のみ。**実装＝S1 を payment 型に変更**：p3-16/p4-16 の new バナー文言を「確定期限を過ぎています…」→**「まもなく確定期限です／期限を過ぎるとこの取引は申込者全員ごと自動キャンセルされ…（次の申込者へは繰り上がりません）」**、`OVERDUE_CHIP = { new:'本日中' }` を両ページに追加。**対ページ同時修正**（p3-16/p4-16）。

- 2026-06-27 **【ドメイン方針決定】S1確定期限切れは「申込順を飛ばさない」非繰り上げ全体キャンセルとする（申込者飛ばし防止）**。**背景＝S1に確定期限を設けると、出品者が特定の申込者に対し意図的に無操作で期限切れ→自動キャンセルさせ、キューの次の人を選ぶ「申込者飛ばし（購入者の選定）」が可能になってしまう懸念**。リエゾン+は会場優先＝会場に足を運んだ人の意思を尊重する設計で、出品者による恣意的な購入者選定は思想に反する。**決定＝期限切れ時はキューを次の申込者へ繰り上げず、その作品を自動で出品取消とし、申込者全員（キュー全員ぶん）にキャンセル通知を送る**。キューが前進する正当な経路は「1件目本人の行動／無作為による失効」（S2支払期限切れ・本人都合キャンセル）と、出品者の明示操作（購入確定／会場売約済／出品取消）のみ。出品者の無操作（S1期限切れ）からは前進させない。**付随＝確定期限切れは出品者のマイページに記録**（将来 React/Drupal 側で「確定期限切れ率」等の指標化を検討。本パスでは未実装・概念のみ）。**UI明示＝**(a) ガイド p70-2（複数申込キューのコールアウト＋FAQ「同じ作品に複数の申込」）と p70-12（S1セクションに専用コールアウト＋FAQ「同一作品に複数の申込」「確定期限に間に合わない」）に「申込順での対応・特定申込者を飛ばせない・期限切れ＝非繰り上げ全体キャンセル」を明記。p70-12 の旧FAQ文「期限超過時は申込が自動キャンセルされる場合があります」を上記方針で具体化。(b) 取引デスク p3-16/p4-16 のS1パネル `.p515-status__desc` に「申込順での対応が必要・特定の申込者を飛ばすことはできません・会場で売れた場合のみ会場売約済を」を追記。**React化時：期限切れバッチ処理は『次申込者へ advance しない』分岐を必須とし、advance は本人失効/出品者明示操作のイベントからのみ発火させる**。

- 2026-06-27 **【確定期限ルール改訂】S1確定期限＝「会期終了3日後 or 申込3日後の遅い方」→「会期終了7日後 or 申込7日後の遅い方」に変更**（L23/L92 の seed を上書き）。**理由＝会場優先で会期終了後の引渡し・在庫確認に要する実務時間を考慮し、発送期限（会期終了後7日 or 支払後7日）と同じ7日基準に揃えて猶予を拡大**。あわせて期限超過時の挙動を確定：旧「申込を自動キャンセル／作品を一旦非公開」→**「その作品を自動で出品取消（withdraw）し、申込者全員にキャンセル通知。キューは次の申込者へ繰り上げない」**（上記 申込者飛ばし防止の方針と一体）。**反映＝**ルール文言（会期終了7日後 or 申込7日後）を p3-16/p4-16 のS1パネル（`__until`）・p70-2（フロー図 step-deadline・複数申込コールアウト・FAQ）・p70-11（出品者の確定期限）・p70-12（S1期限コールアウト）・CLAUDE.md「LIAISON+取引状態名」確定期限ルール行へ反映。デモ日付も連動更新：p3-16 確定期限 2026.3.8（日）→**3.12（木）**（chip あと14日→18日）、p4-16 3.18（水）→**3.22（日）**（chip あと10日→14日）＝いずれも会期終了+4日シフト。整合性チェック.md の該当 seed 行も更新。**発送期限ルール（会期終了後7日 or 支払後7日）は据え置き**。**React化時＝期限算出式の確定期限分岐を `max(会期終了+7d, 申込+7d)` に修正**。

- 2026-06-27 **【UI追加】待ち側ナッジ（`.p515-status__waiting-nudge`）を新設＝相手の番のフェーズで「システムが相手に確認を促している」ことを中立的に通知**。**背景＝「要操作の人へ催促していることを、待っている人にも分かるようにすべきか？」という相談**。**方針決定：期限の数字は出さない（支払期限のみ既存表示）**。理由＝(1) 期限はサービス提供前に制定した暫定値で、運用開始後にチューニングする可能性が高く、表示済みの数字と実挙動が食い違うと**かえって混乱・不安を招く**。(2) 期限を見せる/見せないのどちらが管理者への問い合わせを増やすか判断がつかず、**管理者の負荷を最小化したい**。→ **メルカリ式を採用**：期限は見せず、システムが相手を催促し始めたときだけ「相手側の操作を促している」事実だけを待ち側に伝える。**文言は受動・中立**（「システムから{相手}へ{行為}のご確認をお願いしています。」）で、「催促」のような相手を不履行者扱いする表現は使わない（待ち側に余計な緊張を与えないため）。**スコープ（ユーザー指定）＝**出品者デスク p3-16/p4-16 の `confirmed`（S2購入者の支払待ち）/`shipped`（S4購入者の受取確認待ち）、購入者デスク p5-15 の `paid`（S3出品者の発送待ち）。**S1（購入者から見た出品者の確定待ち）は対象だが p5-15 に applied 状態の DOM ブロックが存在しない**（buyer デスクは S2 支払から開始・STATUS_IDS に `p515StatusApplied` はあるが実体なし）ため**未実装＝要判断**：(a) p5-15 に購入確定待ちブロックを新設して載せる／(b) S1 の購入者向け気づきは p5-14（履歴の申込中ストリップ）側で扱う／(c) S1購入者は見送り。S5（出品者の完了確認待ち）はユーザー指定スコープ外。**実装＝**CSS `.p515-status__waiting-nudge`（`var(--paper)`＋ヘアライン枠＋ベルアイコン muted・赤系 `.ktn-txn-alert` と区別）、JS は各ページに `WAITING_NUDGE` マップを追加し `applyUrgency` を「全リセット→level normal は return→`WAITING_NUDGE` 該当なら現在ブロックの nudge に `.is-on` 付与して return→以降 my-turn 処理」に再構成。**near/overdue 同一表示（段階・チップ・日付変化なし）**。**React化時＝相手の期限が催促閾値に達したら表示。期限の数値は待ち側には依然出さない**。

- 2026-06-27 **【前提訂正】後工程フロントは React SSR ではなく React CSR（クライアントサイドレンダリング）**。**理由＝当初ドキュメント（CLAUDE.md・プロジェクト概要・本ログ）が「React SSR」と記載していたが、実際の後工程は CSR とユーザーから訂正**。**影響＝**「期限 − 現在時刻」による取引アラート段階判定など、本ログや CLAUDE.md で「サーバ/クライアントで計算」「SSR」と書いていた箇所は、すべて **API/Drupal が返すデータをもとにクライアント側で計算**する前提に読み替える（初期描画もサーバではなくクライアントで行う＝SEO・初期表示は別途 CSR 前提の設計が必要になりうる点に留意）。**反映＝**CLAUDE.md（概要 L12・handoff運用 L65・取引アラート「本番の扱い」）、本ログ（タイトル・目的・取引アラート過去エントリの SSR 表記）、docs/プロジェクト概要.md を CSR に修正。**既存サイト側の記述（docs/01…既存サイト.md「React（SSR）」）は現行システムの説明のため未変更**（後工程＝CSR への移行という理解）。

- 2026-06-28 **【呼称確定】取引対応ページの UI 表示名はロールで分ける＝出品者側（p3-16/p4-16）＝「取引デスク」／購入者側（p5-15）＝「取引ワークスペース」**。整合性チェック（縦軸 p3-15↔p3-16・p4-15↔p4-16・p5-14↔p5-15）で、出品者デスクは「取引デスク」、購入者ページのみ「取引ワークスペース」と呼称が分かれている点を検出。**ユーザー判断＝統一せず現状維持（購入者側はワークスペースのまま・意図的）**。理由：購入者側は申込〜支払〜受取まで自分が能動的に作業を進める場で「ワークスペース」の語感が適切。出品者・購入者は別ロール・別ページで片方の名称しか見ないため、2名称が並ぶ混乱はない（発送可能日/発送予定日のロール別呼称 L131 と同じ考え方）。**反映＝CLAUDE.md にのみ追記（UI 変更なし）**：(1) ページ呼称ノート（「LIAISON+ 取引状態名」節の後）に「出品者側＝取引デスク／購入者側＝取引ワークスペース。p5-14 からの導線・FAQ・タイトル・H2 すべて『取引ワークスペース』で統一。完了済み取引への導線のみ『取引詳細』。本 CLAUDE.md では4ページ総称として便宜上『取引デスク』『取引4ページ』と書く箇所があるが、購入者側の実UI名は『取引ワークスペース』が正」と明記。(2) `.ktn-guide-link` 節の「取引デスク（p3-16/p4-16/p5-15）」を「取引デスク（p3-16/p4-16）・取引ワークスペース（p5-15）」に訂正。React化時：ルート/コンポーネント名はロール別呼称を踏襲（seller=TransactionDesk / buyer=TransactionWorkspace）、総称が必要な場面のみ内部名を用いる。

- 2026-06-28 **【整合性修正】対ページ（p3-16↔p4-16・p3-15↔p4-15）のドリフト4点を修正**（CLAUDE.md canonical に照合し、確認済みの不整合のみ）。(1) **p3-16 STEP_CFG に `confirmingNr`/`expired` の2行を追加**（p4-16 にはあり）：p3-16 には対応するデモボタン・DBAR_BTN・isNoReview/isExpired ロジックが存在するのに STEP_CFG だけ欠落しており、当該状態でステップノードが `done` にフォールバックし `confirmingNr` 時の最終ノードが本来 `seller` のところ `done` 表示になっていた。p4-16 と同一に揃えて修正。(2) **p3-16 FAQ に「送料の設定の仕方は？」項目を追加**（`data-faq-phase="new"`・p4-16 にはあり）：送料設定はクリエイターにも該当するため対称であるべき。(3) **p4-16:762 のログセクション HTML コメントを canonical 化**：`<!-- C-5. 取引ログ: 申込確認待ち -->`（非 canonical 名）→`購入確定待ち`（p3-16 と一致）。(4) **p4-15:173 のメニュー名の全角＋を半角に**：「リエゾン＋出品管理」→「リエゾン+出品管理」（同ファイル他箇所・p3-15 は半角で統一済み）。**確認したが修正不要と判断した点**：p3-15/p4-15「発送待ち」FAQ 回答末尾のロール差（クリエイター自身が発送 vs ギャラリーが作家と連携）＝妥当なロール差。p5-15:500 S4 受取確認の「（発送から14日以内）」＝S3 発送期限の禁止句「支払いから14日以内」とは別物（S4 確認期限）で誤りでない。**未実施（任意）＝p3-16 は p4-16 より約60行長く逆方向のドリフトの可能性があるが、全文構造 diff は本ラウンドでは行っていない**（確認済み4点のみ対応）。React化時：STEP_CFG・FAQ phase 属性・ステータス名は単一定義をロール別ページで共有し、ペア間の手作業同期に依存しない。

- 2026-06-28 **【整合性確認 p2-12-1↔p3-16／決定2件】出品設定（p2-12-1）と取引デスク（p3-16/p4-16）の送料・梱包費・配送語彙の整合を取る**。p3-16 を最新 canonical として突合し、不整合2点をユーザー判断で確定。**(1) 梱包費＝モデルA（出品者設定）で統一**。p2-12-1 の梱包費＝**p6-2 に表示する申込ユーザー向けの参考値・任意入力・作品ごとではなく展覧会の出品作品共通**。p3-16/p4-16 の梱包費＝購入確定し発送先も確定したあとに入力する確度の高い値で、**出品者負担の場合は空欄でも可**。これに伴い p3-16/p4-16 の FAQ「送料の設定の仕方は？」の旧文「梱包費 ¥500 は固定で自動加算されます」（モデルB＝自動加算を示唆し編集可能な入力欄と矛盾）を「梱包費を購入者に求める場合は梱包費欄に入力します（出品者負担の場合は空欄のままで構いません）。送料・梱包費とも確定後は変更できません」に修正。発送フォームの梱包費ラベルも「梱包費（税込・円）」→「梱包費（税込・円／任意）」に（送料は必須のまま）。**前ラウンドで `.ktn-req` 統合時に梱包費を「自動算出寄りのため除外」とした判断（L162）は、モデルA確定により『任意項目だから除外』に理由を読み替える**（マーカー無しの扱いは変わらず）。**(2) 配送語彙を「発送方法」に統一**。p2-12-1 が「配送方法」（選択肢4＝ヤマト運輸/佐川急便/日本郵便/その他）、p3-16/p4-16 が「発送業者」（選択肢5＝ヤマト宅急便/ヤマト らくらく家財宅急便（大型・額装向け）/佐川急便/日本郵便（ゆうパック）/その他）で語彙・選択肢が割れていた。ユーザー判断＝**ラベルは「発送方法」が正・選択肢は多い方（p3-16 の5択）に合わせる**。反映：p2-12-1 の select を5択へ、p3-16/p4-16 の「発送業者」「業者名を入力」「発送業者名」プレースホルダ・確認モーダル/発送確認行/ガイド/FAQ の表記をすべて「発送方法」「発送方法名」に置換（**JS 参照 ID `p316/p416CarrierSelect`・`CarrierOther`・`TrackingCarrierOther`・`RateBtn` は変更せず**）。料金表モーダルの「配送会社の料金表」「各配送会社の公式サイト」は実在の運送会社を指す別概念のため据置。**対ページ同時修正**（p3-16/p4-16）。React化時：発送方法は選択肢マスタ（carrier enum）を単一定義で全ページ共有、梱包費は nullable な出品者入力フィールド（出品設定＝展覧会共通の参考値／取引確定時＝確度の高い実額、空欄可）。

- 2026-06-28 **【整合性確認 p2-12↔p2-12-1／判断2件】LIAISON 作品管理（p2-12）と LIAISON+ 作品管理（p2-12-1）の整合チェック**。共有ブロック（タイトルヘッド・展覧会バナー・モード切替バー・モーダル作法・末尾4ブロック＝説明文/展示作品/作品追加/フォームアクション・販売状態マスタ・共有DOM id と並べ替え/候補グリッド/文字数カウンタのJS）は整合済みと確認。差分はすべて LIAISON+ のみが持つ販売機能（販売期間・発送/梱包・販売期間中通知のコンソール導線・作品カードの価格入力＆ロック状態・dbar の LIAISON+ 申請トグル有無）で、無料LIAISON＝販売なし／LIAISON+＝販売ありの仕様差ゆえ**揃えない**のが正。**(1) p2-121 のデッドコード削除**：`KTN.pages['p2-121']` に、HTML に存在しないボタン id `p2121PeriodSave`/`p2121ShipSave` を参照する残骸（個別「保存」ボタンを廃し共通「保存する」`#p212SaveAll` へ集約した名残）が残り `if` ガードで不発になっていたため削除。p2-12（単一保存・個別保存JSなし）とJS構成を揃えた。**(2) 無料LIAISON（p2-12）の作品カードが持つ販売状態（販売中/商談中/売約済 等）は現状維持**。**理由＝LIAISON はオンライン販売なしだが、この販売状態は「会場での販売状況」を来場者向けに表示するためのもの**（works-hint「販売状態は会場の状況に合わせて随時更新／不明なら要問合せ推奨」と整合）。LIAISON+ では同じ販売状態がオンライン販売＋価格を駆動する＝同ラベルでもロールにより意味が異なるが、両ページとも同一の販売状態マスタを共有する方針で確定（選択肢は絞らない）。React化時：販売状態 enum は共通、online-sale 連動の有無は LIAISON/LIAISON+ のモードフラグで分岐。

- 2026-06-28 **【発送方法 表記の波及反映】**前項(1)で確定した「発送方法」統一を、出品設定（p2-12-1）・取引デスク（p3-16/p4-16）以外の**下流の表示・ガイドにも波及**。反映：(a) **p6-2**（LIAISON+ 作品ページ・購入者が見る出品者の発送設定）の `.p6-liaison__ship-lbl`「配送方法（予定）」→「発送方法（予定）」。(b) **kotennavi-pages.js** の作品スペック行（`_p6Init` 内 L1380）ラベル「配送方法」→「発送方法」、**および機能的にカップリングする `KTN.pages['p6']` の `hideSpecRows` 配列（通常版作品ページがこの行を隠すための完全一致文字列・唯一の出現箇所）も同時に「配送方法」→「発送方法」へ**（ラベルとフィルタ文字列が一致しないと p6 通常版で行が隠れなくなるため lockstep 必須）。(c) **p70-12**（出品者ガイド）対応手順 L170「発送業者・送料・梱包費…」→「発送方法・送料・梱包費…」。**スコープ外として据え置いたもの**：`配送時期`（発送時期との timing 語彙統一は未承認・別件）、p70-11/p70-12 の散文中の「配送方法」（"配送方法に応じて"・"梱包・配送方法がわからない"・"追跡可能な配送方法" 等＝UIラベルでなく一般名詞用法で妥当）、typography.html のデモ表記、`work_detail.html`/`work_detail_normal.html`（pages.js 抽出前のレガシー単体デモ・ラベルと hideSpecRows が内部で一致しており自己完結）。React化時：作品スペックの発送方法ラベルは carrier enum と同じ単一定義を参照し、表示/非表示の制御キーもラベル文字列でなく安定キーで持つのが望ましい。

- 2026-06-29 **【P6-11 作品 新規/編集/クローン 新規作成】**`kotennavi-p6-11.html` を作成（sitemap の P6-11・作品編集フォーム・creator/gallery/admin が W・`--w-detail`）。**(1) 編集フォーム部品は `.p211-*` を再利用**＝p2-11（展覧会編集）の block/field/label/input/textarea/pill/tag/img-drop/liaison-opt/publish-opt/submit-bar をそのまま使用。`.p211-` はページ固有プレフィックスだが**実体は汎用編集フォーム部品**（canonical＝common.css L10853〜）であり、`.p611-` へ複製すると大量の重複定義になるため**単一ソース維持を優先して再利用**した。**注意＝p2-11 のフォーム見た目を変えると p6-11 にも波及する**（共有部品としての意図的カップリング）。React化時は `<EditForm>` 系の共通コンポーネントへ寄せ、`p211`/`p611` の名前は廃する。**(2) 作品データ vs 出品設定の責務分離**：p6-11 は作品の**内在情報**（タイトル/読み/英語・ジャンル・素材技法・サイズ高さ×幅×奥行・重さ・額装・作品状態・付属品・エディション・説明・画像・紐づく展覧会・公開設定）のみを扱い、**販売価格・発送方法・梱包費などの出品設定は持たせず**、LIAISON設定ブロックから p2-12（LIAISON 作品管理）/ p2-12-1（LIAISON+ 作品管理）へリンクで送る。理由＝出品/販売設定は展覧会単位の作品管理コンソールに集約済み（p2-11 が同様に p2-12/p2-12-1 へ送る構造）で、作品編集と出品設定の二重入力・齟齬を避けるため。**(3) creator/gallery 共有ページのバー色動的切替**：body は `mgmt-page p6-11-page p3-page`(既定 creator)、`KTN.pages['p6-11']`(pages.js) の `syncMgmtBar` が role で p3-page(creator)/p4-page(gallery) を付替（p2-11・p11-4 と同型）。**(4) common.js 整合2点**：`getActions` の p6-11 分岐に gallery を追加（従来 creator/admin のみで gallery が空＝sitemap の W と不一致だった）／`PAGES['p6-11']` のパンくず作品名を p6 と一致（春の記憶#3→オノマトペの庭）。**未確定（要レビュー）**：作品仕様の項目セット（額装/作品状態/付属品/エディションの要否）と、紐づく展覧会の選択UI（現状はサブリンクのプレースホルダ）。

- 2026-06-29 **【P5-4 公開設定UIの整理】**myコレクションルーム（`kotennavi-p5-4.html`）の公開/非公開操作を整理。**(1) 公開/非公開設定を右上「並び替え・公開設定」モーダル（`#p54SortModal`）に一本化**＝従来は各作品カード下部にも公開中/非公開バッジ＋操作ボタン（`.p54c__controls`）があり、モーダル（`.p54-sort-item__vis-btn`）とカード下部の2系統で公開状態を切り替えられた。**ユーザー指定でカード下部の操作・状態表示を全廃し、設定箇所をモーダルに集約**（並び替えと公開設定を1か所で完結させ、カード面は鑑賞に専念させる意図）。`p54SaveSort()` を実装してモーダルの並び順・公開状態を保存時にカードへ反映（タイトル一致でカード特定→`p54c--private` トグル＋並べ替え＋公開件数更新）。**(2) 非公開カードの右上「非公開」バッジは残す＝本人のみ参照可**：`.p54c--private::after`（content:'非公開'）で継続表示。他者には `body.p5-other .p54c--private{display:none}` で非公開カード自体が出ない＝owner-only が成立（バッジ用の owner-only クラスは別途不要）。**(3) 購入日付を `YYYY.MM`→`YYYY.MM.DD` 表示に**（購入日まで明示）。**削除＝**per-card の確認モーダル（`#p54PublishModal`/`#p54UnpublishModal`）と関連JS（`p54ConfirmRemove/Publish`・`_p54OpenModal`/`_p54ApplyVis`/`_p54CloseModal`・`p54Remove`）、common.css の `.p54c__controls/__vis-btn/__remove-btn/__vis-badge/__action-btn` 系＋`body.p5-other .p54c__controls`（いずれも dead化）。React化時：コレクションの公開状態・並び順は1つの「整理（並び替え・公開設定）」ダイアログが単一の編集面。カード上の非公開表示は owner ビューでのみ描画する read-only バッジ。
- 2026-06-29 **【P2-2/P2-3 セクション見出しを p2-1「開催時間」フォーマットに統一】**p2-2（会場情報/アクセス/周辺スポット）・p2-3（展覧会記事/関連イベント/関連情報/クレジット/入場会場情報）の白箱セクション見出しを、p2-1 スケジュールの `.p2-1-section__head`/`.p2-1-section__title` と同じ書式・余白に揃えた。見出しは共有クラス `.ktn-tab-head`>`.ktn-tab-head__title`（canonical L3257-3258・他ページの箱なしトップレベル見出しでも使用）を使うため、**canonical は変更せず `.p2-2-section`/`.p2-3-section` の直下子に限定した scoped ルールで上書き**（`padding:14px 18px; gap:14px; margin-bottom:24px` ＋ title `font-size:1.35rem; font-weight:700; letter-spacing:-.005em`）。理由＝箱内見出しだけ p2-1 と揃え、箱を持たない他ページの `.ktn-tab-head` 用途（1.55rem/600）に波及させないため。箱どうしの間隔も p2-1 に揃え、`.p2-2-section`/`.p2-3-section` の `margin-bottom` を `14px`→`56px`（p2-1 `.p2-1-section` の v2 値）に統一（当初は 14px 据置としたがユーザー指定で 56px へ変更）。React化時：p2-1/p2-2/p2-3 の箱セクション見出しは同一の `<SectionHead>` コンポーネントに寄せ、`ktn-tab-head`（箱なし）と分離する。

- 2026-07-01 **【表示系ページのセクション間マージンを共通クラス `.ktn-csec` に一元化】**メインカラムの「セクション箱どうしの縦間隔」がページごとに別クラス・別値（p2-1/p2-2/p2-3=56px・p2-ic=10px・p4-box=0px・p5-1-section=40px 等）で散らばっていたのを、単一ソース `--section-gap`（`:root` L62＝**40px**）＋共通クラス **`.ktn-csec`**（common.css L12448 `margin-bottom:var(--section-gap)`）に集約。**方針＝ユーザー選択で「マージンのみ共通化」**：各ページ固有のセクションクラス（箱・見出しの見た目）はそのまま残し、その要素に `.ktn-csec` を**併記するだけ**（クラスの強制統合はしない）。`.ktn-csec` を各固有クラスの `margin-bottom`（多くは L12240 台まで）より**後段の L12448** に置くことで、同詳細度・ソース順で `.ktn-csec` が勝ち 40px に統一される。**旧メカニズムの撤去**＝L12440 の `.p2-layout > section + section, .p2-layout__main > section + section, .p3-main > section + section { margin-top:8px }` を削除（`.p3-main` は実在しないセレクタ・`+section` 隣接指定は箱間に非section要素が挟まると破綻するため）。`.p2-layout{gap:0 28px;padding-top:32px}` は保持。**適用（`.ktn-csec` 併記）**：p2（`.p2-about`×1・`.p2-ic`×3）/p2-1（`.p2-1-section`×4）/p2-2（`.p2-2-section`×3）/p2-3（`.p2-3-section`×5）/p3（メイン `.p2-ic`×3、サイド `#p3-sec-articles` は除外）/p4（`.p4-box`×2）/p5-1（`.p5-1-section`×3）/p5-4（`.p54-section`×1）。**除外と理由**：(a) **p2-5/p2-5-1** のメインは全幅カラーバンド（`.p2-5-about`/`.p2-5-works`＝背景色＋border-bottom 区切り）で「箱の積み重ね」ではなく、margin を足すとバンド区切りデザインが崩れる。唯一の箱 `.p2-ic`（出品クリエイター）は `.p25-layout` メイン内で単独＝間隔をとる兄弟がないため対象外。(b) 一覧系（p3-1〜3/p4-1〜2/p5-2〜3 等）は単一コンテンツブロックで縦積みセクションを持たないため対象外。**前項（2026-06-29 P2-2/P2-3）で 56px にした箱間マージンは、本統一により実効 40px に上書きされる**（p2-2-section/p2-3-section の 56px 宣言は `.ktn-csec` 非併記時の fallback として残置）。各固有クラスの `margin-bottom` はいずれも fallback として残す（将来クリーンアップは任意・低優先）。React化時：セクション箱の外側ラッパを単一 `<SectionWrapper>`（`.ktn-csec` 相当・`--section-gap` 参照）に寄せ、各ページ固有の箱/見出しコンポーネントは温存。バンド型（p2-5 系）と一覧型は別レイアウトとして扱う。

- 2026-07-03 **【方針転換：Option A（L132）を撤回】取引に関する全操作（S1 申込キャンセルを含む）を取引ワークスペース（p5-15）に集約し、購入管理（p5-14）は全行を「取引ワークスペースへ →」で送るだけにする**。**背景＝ユーザー指示「購入者が申込した時点で取引IDが振られ、取引に関する操作を取引ワークスペースで行う。申込-購入確定待ち状態から『取引ワークスペースへ』を表示し、以降の状態確認・操作は取引ワークスペースで行う」**。これは 2026-06-25 の Option A（L132＝「S1 は取引番号未付与のため購入者側は取引ワークスペースに入れず、申込キャンセルは購入管理 p5-14／作品ページから」）を**明確に上書き**する。**データモデルの変更＝取引ID（TXN-…）の発番タイミングを「購入確定 S1→S2」から「申込時点」に前倒し**。申込＝取引エンティティ生成とし、S1（購入確定待ち）から購入者も取引ワークスペースにアクセスできる。よって L132 で挙げた棄却案(B)「申込時に取引番号発番」を**採用に転じる**（キュー待ち/申込キャンセルにも番号が発生するが、取引導線の一貫性＝申込→完了まで単一ワークスペースを優先）。**S1 の所在がロール非対称だった点（出品者＝デスク／購入者＝一覧）も解消**し、両ロールとも S1 から自分のデスク/ワークスペースで完結。**実装（購入者側）**：(1) p5-15 に S1 状態ブロック `#p515StatusApplied`（`--waiting` グレー・バッジ「購入確定」＋ターンラベル「出品者の購入確定待ち」＋待ち側ナッジ「システムから出品者へ購入確定のご確認をお願いしています。」＋キュー順位 `.p515-queue-info`＋確定期限 `.p515-confirm-deadline`〔会期終了7日後 or 申込7日後〕＋申込内容 `.p515-ship-confirm`）と取引ログ `#p515LogApplied`（購入申込受付のみ）を新設。(2) デモバー先頭に `#dbarApplied`「購入確定待ち」ボタンを追加、default を `setDemoState('payment')`→`setDemoState('applied')` に。(3) `WAITING_NUDGE = { paid:1 }`→`{ applied:1, paid:1 }`（L178 で「p5-15 に applied ブロックが無いため S1 待ち側ナッジ未実装＝要判断」としていた宿題を、ブロック新設により解消＝案(a)採用）。(4) 申込キャンセルを取引ワークスペースで実行できるよう、キャンセル系の文言を**状態対応（applied＝「申込」／payment 以降＝「購入」）で出し分け**（`setDemoState` 内で `#p515CancelModalTitle`/`#p515CancelModalDesc` を書換、トーストも `curKey==='applied'?'申込':'購入'`）。cancelRow の表示条件は applied/payment（支払前）で維持。(5) FAQ「購入をキャンセルできますか？」を「申込・購入いずれもこの取引ワークスペースから」に書換（購入管理ページへの誘導を削除）。**実装（購入管理 p5-14）**：(6) 購入確定待ち2行の「申込をキャンセル」ボタン（`.p514-cancel-apply-btn` ＝ `ktn-op-btn--danger-outline --sm`）を**「取引ワークスペースへ →」リンク**（`.p514-aw__strip-link ktn-action-btn`）に置換＝これで p5-14 は全状態行が取引ワークスペースへ送るだけの一覧に。(7) 申込キャンセル確認モーダル `#p514CancelApplyModal` と関連JS（`openCancelApplyModal`/`closeCancelApplyModal`/caModal 系リスナ・トースト）を**dead code として削除**（キャンセル操作はワークスペースへ移設したため）。(8) FAQ を「購入確定待ち・支払待ちいずれも取引ワークスペースから」に書換。**新規CSS（common.css）**：`.p515-confirm-deadline`（＋sub 4種）と `.p515-queue-info__note` を追加。いずれも**待ち状態＝落ち着いた `var(--paper)` 背景**を採用し、`.p316-action-deadline` の緊急アンバー（my-turn 用）とは区別（S1 購入者は待ち側でありアラートを出さないため）。**注意＝L132 の後続実装（L133 p6-2 作品ページの申込キャンセル導線・L142/L143 のニックネーム分離やアーカイブ）は撤回対象外**：作品ページからの申込キャンセルは残置してよいが、取引ワークスペースからも申込キャンセルできるのが今回の主眼。**React化時＝ルーティング分離を撤回**：L132 の「申込中→/purchase-list（p5-14）／購入確定以降→/transaction/:txnId（p5-15）」をやめ、**申込時に txnId を発番→申込以降すべて /transaction/:txnId（TransactionWorkspace）で扱う**。p5-14（購入管理）は取引一覧として各行を `/transaction/:txnId` へリンクするのみ。S1 購入者ビュー（待ち側ナッジ・キュー順位・確定期限・申込キャンセル）は本実装で確立済み。キャンセルの文言は取引状態（申込前 S1＝申込キャンセル／支払前 S2＝購入キャンセル・返金なし／支払後＝返金を伴う管理者申請）で出し分け。**未検証＝本環境にブラウザ確認手段がないため、デモバー全状態の目視動作確認は未実施**（HTML/JS/CSS の整合はコード上で確認済み・要ブラウザ検証）。

- 2026-07-04 **【S2 my-turn CTA の文言変更】取引4ページ共通の S2（支払）my-turn CTA を「お支払いください」→「お支払いにお進みください」に変更**。**理由＝支払フェーズは支払だけでなく配送先情報の入力を含むため、単に「支払え」より「支払いに進む」導線として案内する方が実態に合う**（ユーザー指定）。反映：p5-14 状態帯ラベル（`.p514-aw__strip-label`）／p5-15 ターンラベル（`.p316-turn-label--mine`）／p5-15 モバイル固定CTA（`MCTA_LABELS.payment`）＋ CLAUDE.md canonical 2箇所（状態strip書式の命令形CTA列挙・一覧ページ状態ラベルの命令形CTA列挙）。**散文はそのまま据え置き**：p5-15 の期限アラート「至急お支払いください」・説明文「配送先情報を入力してお支払いへお進みください」・自己ガイド「配送先を入力してお支払いください」は文中の一般的な言い回しであり、ボタン/ラベルの命令形CTA変更の対象外。他フェーズのCTA（S1 購入を確定してください / S3 作品を発送してください / S4 受取を確認してください / S5 取引完了を確認してください）は変更なし。React化時：turn-label の CTA 文言はフェーズ→文言マップの単一定義で全ロールページ共有。

- 2026-07-04 **【L201（2026-07-03）の訂正：S0 申込済 は p5-14 に残す＝ワークスペース集約は S1 購入確定待ち以降が対象】**L201 の記述「購入管理（p5-14）は**全行**を『取引ワークスペースへ →』で送るだけ」「申込キャンセル確認モーダル `#p514CancelApplyModal` と関連JS を dead code として削除」は**実装の最終形と食い違っており訂正する**（append-only のため L201 は残置し本項で上書き）。**現行コードの実際のモデル（CLAUDE.md canonical と一致）**：**S0 申込済（申込ID順が到来する前の純粋な順番待ち・取引ID未発番・確定期限なし）はワークスペース（p5-15）に入れず、キャンセルは購入管理（p5-14）で完結する**。**S1 購入確定待ち以降のみワークスペースに入り、S1/S2（支払前）のキャンセルもワークスペースで行う**。**根拠＝コード**：(a) p5-14 は S1 購入確定待ち行〜S2以降行が「取引ワークスペースへ →」リンク（`.p514-aw__strip-link`）だが、**S0 申込済行（`kotennavi-p5-14.html` 付近のコメント「申込済（S0・順番待ち／確定期限・ワークスペース導線なし・キャンセルはこの一覧で完結）」）はキャンセルボタン `.p514-cancel-apply-btn` を保持**し、申込キャンセルモーダル（`.p514-cancel-apply-btn` を拾う `querySelectorAll` ＋モーダル DOM）も**存置**（L201(6)(7)は S1 についてのみ有効で、S0 は対象外）。(b) p5-15 のワークスペース最先端状態 `#p515StatusApplied` は**S1 購入確定待ち**（コメント「S0申込済はこのワークスペースに入れず p5-14 で扱う」）で、S1 のキャンセル導線 `#p515CancelRow`/`#p515CancelLink` は支払前（applied/payment）で文言を「申込／購入」出し分け（applied＝S1＝「申込をキャンセル」）。**根拠＝CLAUDE.md canonical**：「S0『申込済』は…確定期限を持たず（表示もしない）・取引ワークスペース（p5-15）に入れない…この段階のキャンセルは一覧（p5-14）で行う」。**根拠＝ガイド**：p70-11（購入者ガイド）は 状況/FAQ/索引（`kotennavi-p70-11.html:165/188/200/444`）で「申込済＝購入管理 p5-14／購入確定待ち以降＝取引ワークスペース」と既に整合。**結論＝p70-11/p70-12 のガイドは現行コードと一致しており変更不要**。L201 の「txnID を申込時点で発番」は**S1 到来時（購入確定待ち化）に発番**へ読み替える（S0 申込済は取引ID未発番＝ワークスペース非入場の根拠）。React化時：`/transaction/:txnId` は S1 以降のみ。S0 申込済（順番待ち）は購入管理（p5-14）内の行としてキャンセル可能な「取引前エンティティ」として扱い、txnId は S1 遷移時に発番する。

- 2026-07-04 **【出品者コンソール p3-15/p4-15 の S0 ラベル正規化】申込者リストの順番待ち行を「待機中」→「申込済」に統一**。`p315-apply-status--wait` の表示テキストがアドホック名「待機中」だったのを canonical の S0 状態名「申込済」＋申込日に変更（`kotennavi-p3-15.html:321`＝"音の輪郭 No.7" #2 鈴木一郎「待機中」→「申込済　2026.02.26」）。理由＝CLAUDE.md「状態名は出品者側・購入者側で同一の客観名」に従い S0＝申込済で統一（買い手 p5-14 が既に「申込済」）。**コンソール固有の書式**：申込ID#n・総数（申込者 M件）・購入者名が別カラムのため `.p315-txn-row__status` セルは「申込済　申込日」のみ（p5-14 strip の「申込済　申込ID#n（全M件）　日付」を列分割した形）・ターンバッジ/取引デスク導線なし（順番待ち＝出品者の操作対象外）。**p4-15 は HTML 変更なし**（デモ出品作が全て申込者1件で順番待ち行が無い・命名規則のみ適用）。CSS `.p315-apply-status--wait`（`color:var(--muted)` の色フックのみ・content 依存なし）は据え置き。CLAUDE.md 一覧ページ状態ラベル節に追記。React化時：一覧/コンソールの状態ラベルは状態 enum→表示名の単一マップを全ロールで共有し、"待機中" 等のページ固有語を作らない。

- 2026-07-04 **【問い合わせ窓口名の統一】取引4ページ（p3-16/p4-16/p5-15）の問い合わせ窓口名を「個展なびサポート／サポート」→「事務局」に統一（モーダルのみ「個展なび事務局」）**（ユーザー指定）。**表記の使い分け＝主体が単独で立つ箇所は「個展なび事務局」、文脈内で主体が自明な箇所は「事務局」**：問い合わせモーダルのタイトル（`.p515-modal__title`）・説明文（`.p515-modal__desc`）は「個展なび事務局」を残し、`.ktn-txn-help` 内の相談リンク（「取引について**事務局**に相談する →」）・FAQ（p3-16 破損対応／p5-15 受取後キャンセル）・送信完了トーストは「事務局」のみに短縮。**理由**：「サポート」は操作ヘルプ窓口の印象で取引仲介の重みが薄れるため、中立の運営主体を示す「事務局」を採用（メルカリ等の取引仲介窓口に倣う）。取引画面内という文脈があるため、リンク/FAQ/トーストでは「個展なび」を省いても主体は自明。**コード上のセクション名/機能名としての「取引サポート」コメント（`.ktn-txn-help` セクションの内部コメント等・非表示）は据え置き**（UI 可視文字列のみを変更）。React化時：問い合わせ窓口の表示名は共有定数にまとめる（例 `SUPPORT_ENTITY_NAME='個展なび事務局'` フル形＋文脈短縮形 `'事務局'`）。全ロールページで参照しページ個別のハードコードを避ける。**ガイド p70-11（購入者）/ p70-12（出品者）も同日に統一**：散文・FAQ・索引（`.p70-dl__dd`）中の連絡先「サポート」を全て「事務局」に一括置換（`replace_all`・両ファイルの全出現）。いずれも「取引デスク/ワークスペースの『困ったとき』から〜へ連絡」の連絡先エンティティ参照で、取引画面の文脈内散文のため短縮形「事務局」で統一（取引4ページのリンク/FAQ/トーストと同形）。**「困ったとき」セクション名（`.ktn-txn-help` の可視見出し・ガイド内の導線ラベル）は変更なし**（窓口の呼称ではなくヘルプ導線名のため）。React化時：ガイド散文の窓口名も同じ共有短縮形定数を参照する。

- 2026-07-04 **【事務局相談モーダルの送信後UX変更】取引4ページ（p3-16/p4-16/p5-15）の相談モーダルを「送信→トーストで閉じる」から「送信→モーダル内に受付完了メッセージを表示→確認ボタンで閉じる」に変更**（ユーザー指定）。**受付完了メッセージの内容**：ログイン当事者の**ロール別呼称＋登録メール宛に受付確認を送った旨＋回答を送る旨**を明示（p3-16＝クリエイター名「田中 透さん」／p4-16＝ギャラリー名「Gallery SOIL 渋谷さま」／p5-15＝ユーザーニックネーム「hanaco さん」）。文面＝「ご相談を受け付けました。{呼称}のご登録メールアドレス（{{メール}}）宛に受付確認をお送りしました。内容を確認のうえ、個展なび事務局より回答をお送りします。」。デモは名前を各ページの当事者名リテラル、メールを `{{メール}}` プレースホルダーで表示。**実装（3ページ共通）**：モーダル `.p515-modal` 内を `#p{ID}ContactForm`（入力フォーム＝body+foot）と `#p{ID}ContactSent`（受付完了＝body+foot・`hidden`）に二分。送信成功（textarea 非空）で form を hidden・sent を表示・`.p515-modal__title` を「ご相談を受け付けました」に変更。`#p{ID}ContactDone`（`確認`ボタン・`--primary`）で `closeContactModal()`＝モーダルを閉じ、`resetContactView()`（form 表示／sent 隠す／タイトル復元）＋textarea クリア。**close/back/overlay/Escape すべて `closeContactModal()` に集約**（旧 `contactModal.hidden=true` の各所直書きを置換）。`openContactModal()` も表示前に `resetContactView()` を呼び常にフォームから開始。旧 `KTN.toast('事務局に送信しました…')` は廃止。**新規CSSなし**（`.p515-modal__body/__foot/__desc` を再利用・`{{メール}}` は `<strong>` 強調のみ）。**React化時**：受付完了ビューは相談送信 mutation の成功ステートとして表示。呼称＝セッションユーザーの表示名（ロール別＝creator/gallery の表示名・user のニックネーム）、メール＝登録メールを interpolate（`{{メール}}` を置換）。受付確認メールの実送信・事務局からの回答導線は Drupal 側で実装。

- 2026-07-04 **【サイト全体フォント統一スイープ Tier 1＋2＝21セレクタ `--fs`→`--fn`】操作/状態/機能を説明する UI テキストの明朝を一括でゴシックに是正**（ユーザー承認「提案通りに」）。**判断軸＝「操作を説明する文字は明朝にしない」**。直前のモーダル（`.p515-modal__title/__desc`）変更を単発で終わらせず、同種の不統一を site-wide に洗い出して是正した。**Tier 1（操作文・状態文・管理見出し・9セレクタ）**：`.p515-confirming__title`(L9977)/`.p515-confirming__desc`(L9978)/`.p515-done__desc`(L9891)/`.p515-cancelled__msg`(L9924)/`.p316-done__desc`(L10701)/`.p316-done__review-text`(L10708)/`.p316-cancelled__msg`(L10712)/`.p114-service-banner__title`(L11190)/`.p418-page-head__title`(L11132)。**Tier 2（取引フローの機能サブ見出し・手順ラベル・12セレクタ）**：`.p515-steps__label`(L9832)/`.p515-log__title`(L9898)/`.p515-comments__title`(L9989)/`.p515-delivery__title`(L9943)/`.p515-review__title`(L9965)/`.p515-ship-confirm__title`(L10099)/`.p515-done__title`(L9890)/`.p316-apply-info__title`(L10655)/`.p316-ship-form__title`(L10662)/`.p316-ship-addr__title`(L10675)/`.p316-review-display__title`(L10687)/`.p316-done__title`(L10699)。**明朝維持＝コンテンツ固有名詞（作品名/展覧会名/人名等）と表示系ページ（p2/p3/p4/p6系）の読ませる文章・章見出し**。`.ktn-txn-help__field-label`(L10009)/`.ktn-txn-help__ctx dt/dd`(L10016-17) は既に `--fn`（＝モーダルがそこだけ明朝で不統一だった発端）。**`.ktn-section__title`→`--fs` の一律例外は撤回**：管理・取引フロー内の機能見出しは `--fn`、コンテンツ名を表示する見出しのみ `--fs`（CLAUDE.md「管理ページ・取引フローのフォント使い分け」を大原則付きで改訂）。**p4-16 は独自 `.p416-*` を持たず `.p316-*` を共用するため p3-16 と同時反映**（対ページ同時修正の原則も満たす）。common.css 単一ソースの21箇所変更で全ページ反映（HTML 変更なし）。**Tier 3（未確定・要個別判断）＝ナビ/図中ラベル系**：フッターリンク（`.ktn-footer__links a`）・パンくず現在地（`.ktn-bc__current`）・タブナビ名（`.pN-tabnav__name`）・P70 ガイド図ラベル（`.p70-flow-diagram__*`）等は今回スコープ外。明朝維持か否かはユーザー個別判断待ち。**React化時**：フォントは CSS 変数（`--fn`/`--fs`/`--fm`）参照のまま流用可。「機能テキスト＝ゴシック／コンテンツ固有名詞・読ませる文章＝明朝」を型（コンポーネント種別）で持たせ、セレクタ単位のハードコードを避ける。

- 2026-07-04 **【フォント統一スイープ Tier 3＝ナビ／図中ラベル系の確定】機能ナビ・図中ラベルを `--fs`→`--fn` に揃え、コンテンツ固有名詞は明朝維持**（ユーザー承認「Tier 3も提案通りに揃えて」）。Tier 1＋2（前項）の残りとして保留していた「ナビ／図中ラベル」4種を判断・処理した。**`--fn`（ゴシック）に変更（common.css 4セレクタ・HTML変更なし）**：(a) フッターリンク `.ktn-footer__links a`(L723)＝利用規約・お問い合わせ等のサイトナビ（固有名詞ではない機能リンク）。(b) パンくず現在地 `.ktn-bc__current`(L216)＝ナビ chrome。**先祖リンク `.ktn-bc__link` は font-family 未指定で body `--fn` を継承済み**のため、パンくず内で末尾（現在地）だけ明朝という不統一だった。ゴシック化でパンくず帯が均質になる（先祖位置の固有名詞リンクも既にゴシックで表示されている点と整合）。(c)(d) P70 フロー図の手順ラベル `.p70-flow-diagram__action`(L11501) と終端 `.p70-flow-diagram__end`(L11503)＝申込／購入確定／支払／発送／受取確認／完了確認・取引完了＝**取引ステップ名（行為名）**。Tier 2 で `--fn` 化した `.p515-steps__label`（ワークスペースの手順ラベル）と同じ機能ラベルであり、同じ扱いに揃えた。**`--fs`（明朝）を維持＝固有名詞のため据え置き**：タブナビ名 `.p3-tabnav__name`(L8474)・`.p5-tabnav__name`(L9280)＝スティッキータブ左端に置くクリエイター名／ギャラリー名／ユーザー名（田中透・Gallery SOIL 渋谷・山田 花子）。**同じ名前をヒーロー見出し `.p3-head__name`/`.p4-head__name`/`.p5-head__name`（いずれも `--fs`）が表示しており**、タブ名だけゴシック化すると同一ページ内で人名が2フォントに割れて破綻するため。固有名詞＝明朝の大原則どおり維持（当初 Tier 3 リストに `.pN-tabnav__name` を挙げていたが、精査の結果ヒーロー名と同一の固有名詞と判明し明朝据え置きに決定）。**本スイープ対象外**：タブナビ項目 `.pN-tabnav__item`・`.p2-subnav__item`（展覧会／作品／記事／ウォッチ等の機能ナビ）は今回リスト外。エディトリアル v2（common.css L11876〜）で**意図的に Shippori Mincho 1.02rem**（サブナビ設計・「明朝主軸の力強いタイポグラフィ」）としており、ナビ全体の方針見直し時に別途判断（変更するなら CLAUDE.md エディトリアル v2「サブナビアイテム」記述も同時更新が必要）。**React化時**：フッター/パンくず/図ラベルは機能テキストとして `--fn`、タブ名・ヒーロー名は同一の固有名詞コンポーネントとして `--fs` を共有。パンくずは帯全体を単一フォント（`--fn`）で扱い、現在地だけ別フォントにしない。

- 2026-07-04 **【CTAトーストの共有ハンドラ集約＋ウォッチ同期セレクタの是正】watch/興味あり/チェックインの完了トーストを共有 `KTN.action.handle` に一本化し、全ページの標準CTAで自動発火するようにした**（ユーザー選択「A＝共有 handle にトースト追加・ヒーロー個別の重複トーストは統一文言に寄せる」）。**背景＝トーストが「ページ個別ハンドラ（p3/p4 ヒーローウォッチ同期・p2 興味あり IIFE）」だけに付いており、inline `handleAction(this,…)` 経由の一般CTA（関連クリエイター/ギャラリーカード等）は無トースト＝どのボタンが通知を出すか不統一だった**。ユーザーの「CTAのトーストが消えた？」という指摘は、直前のトースト位置レスポンシブ化（CSS）ではなく、この既存の不統一（共有パスが元々無トースト）が顕在化したもの。**変更（common.js）**：(1) `KTN.action` 内に `ACTION_TOAST` マップを新設（watch=`ウォッチしました`/`ウォッチを解除しました`・interest=`「興味あり！」に追加しました`/`「興味あり！」を取り消しました`・checkin=`訪問済みにしました`/`訪問済みを取り消しました`）。(2) `handle()` の tip 更新直後・`btn.blur()` 前に `if (KTN.toast && ACTION_TOAST[action]) KTN.toast(isOn?…on:…off)` を追加＝トグル方向に応じて発火。(3) `showToast()` に**同一メッセージ400ms以内の重複無視**（`_toastLast={msg,at}`）を追加＝共有 handle とページ個別ハンドラが同一クリックで二重発火する場合の安全網。**変更（pages.js）**：(4) p3/p4 ヒーローウォッチ同期の固有名トースト（`田中 透をウォッチしました`／`Gallery SOIL 渋谷をウォッチしました`）を汎用文言 `ウォッチしました` に統一（`replace_all`）＝ロール/対象で文言が割れないように。**固有名を含めない理由**＝共有 handle は誰のカードか判定しないため、全パスで同一の汎用文言に揃える（メルカリ等の「◯◯しました」中立通知に倣う）。**副次是正＝ウォッチ同期セレクタが関連人物カードを巻き込む既存不具合**：`[data-action="watch"]`（ヒーロー/サイド/ヘッダー連動＝7ハンドラの `var watchBtns`）と `.ktn-btn[data-action="watch"]`（ヒーロー sticky 同期＝4箇所）が、**別クリエイター/ギャラリー/ユーザーの関連カード（`.cc`/`.gc`/`.uc`）内のウォッチボタンまで同期対象に含めていた**。handle にトーストを足したことで、関連カードのクリックが「inline handle（トグル＋トースト）＋同期ハンドラ（全ボタン逆トグル＋相反トースト）」の**二重・相反トースト＋ページオーナー誤トグル**として顕在化。同期セレクタを `Array.prototype.filter.call(…, b=>!b.closest(.cc,.gc,.uc))` で絞り、**関連人物カードのウォッチはページオーナーのヒーロー/サイド/ヘッダーと同期しない**ようにした（別エンティティのウォッチが本人ページのウォッチ状態を変えるのは元々バグ）。関連カードは inline `handleAction` による独立トグル＋単一トースト（handle 発火）に。**チェックインの扱い**＝本番の check-in CTA はモーダル投稿フロー（`openCheckinModal`→`ktnSubmitCheckin`＝`投稿しました！`）が正で別系統・据え置き。production の p*.html に `handleAction(this,checkin)` は存在せず（`kotennavi_buttons.html` デモのトグルのみ）、`ACTION_TOAST.checkin` はそのデモ用＝本番では未使用だが将来のトグル型 check-in に備えて定義。**CSS変更なし**（トースト位置は前項のレスポンシブ化で対応済み）。**未対応（別課題として残置）**＝トーストの複数同時スタック表示（現状は単一 `#ktnToast` 上書き＝最新1件）。**React化時**：watch/interest/checkin のトースト文言は action→{on,off} の単一マップを共有アクションフックに持たせ、ページ個別ハンドラで固有名トーストを書かない。ウォッチ同期は「同一エンティティのウォッチUI（ヒーロー/サイド/ヘッダー/固定CTA）」のみをスコープにし、関連カード（別エンティティ）は独立状態として扱う（`.closest(.cc,.gc,.uc)` 除外はそのポリシーのHTML実装）。同一メッセージ dedup はトースト基盤側のユーティリティに。

- 2026-07-05 **【購入済み作品の公開/非公開を p5-4 コレクションルームに集約＝p5-14 はインライン操作を撤去し状態表示＋導線に限定】**（ユーザー相談「購入履歴で公開/非公開できるが、p5-4 に操作をまとめるべきか？非公開作品への導線は？」→提案「公開/非公開は p5-4 に集約、p5-14 は状態表示＋導線に絞る」＋前提「購入済み作品は自動でコレクション（既定=非公開）に入る」をユーザー承認「はい」）。**背景＝キュレーション面（公開/非公開/並び替え）が p5-14（購入履歴）と p5-4（コレクションルーム）の二箇所に分散していた**。従来 p5-14 の取引完了カードは、未公開なら「コレクションルームへ」ボタン（`.p514-collect-btn`→公開モーダル `#p514CollectModal`→p5-4遷移）、公開中なら「コレクション公開中バッジ（`.p514-published-badge`）＋公開キャンセル（`.p514-unpublish-btn`→非公開モーダル `#p514UnpublishModal`）」を並べ、p5-14 上でも公開状態を切替できた。**方針＝キュレーションの単一面は p5-4（`#p54SortModal` に公開/並び替えを集約済み・2026-06-29）。p5-14＝取引の履歴/状態を見る場所に徹する**。**実装（p5-14.html）**：各完了カードの `.p514-aw__collect-row` を「読み取り専用の状態バッジ＋常時表示の遷移リンク」に置換＝`<span class="p514-collect-status p514-collect-status--public">コレクション公開中</span>`（または `--private` で「非公開」）＋`<a class="p514-collect-link ktn-action-btn" href="kotennavi-p5-4.html">コレクションルームで見る →</a>`。**`#p514CollectModal`／`#p514UnpublishModal` の2モーダルと関連JS（openModal/closeModal/collect-btn クリック配線・openUnpubModal/closeUnpubModal/unpubConfirm による collect-row 再構築）を全削除**。申込キャンセルモーダル（`#p514CancelApplyModal`＝S0 順番待ちのキャンセル）は別機能で存置。**実装（common.css）**：`.p514-collect-btn`／`.p514-published-badge`／`.p514-unpublish-btn` の定義を撤去し、`.p514-collect-status`（`--public`＝ピンク系・`--private`＝スレートグレー）＋`.p514-collect-link`（視覚は `ktn-action-btn` に移管・クラスは識別子）を新設。`.p514-aw__collect-row` に `flex-wrap:wrap` を追加（スマホでバッジ＋リンクが折り返せるように）。**非公開作品への導線が成立する根拠**＝p5-4 はオーナーには公開・非公開の全作品を表示する（非公開は `.p54c--private::after` バッジ付き・他者ビューは `body.p5-other .p54c--private{display:none}` で秘匿）。したがって「コレクションルームで見る →」は公開/非公開いずれの作品でも有効な導線になり、非公開作品もオーナーは p5-4 で見つけて公開操作できる。**モデル前提（確定）**＝購入済み作品は決済完了時に自動でコレクション（既定=非公開）へ入る。出品者/購入者いずれの操作でもなく、購入の副作用としてコレクションに追加される。**リンク文言**＝「コレクションルームで見る →」で統一（公開/非公開で文言を変えない＝1本の導線）。ページ遷移する `ktn-action-btn` の規約どおり末尾「 →」を付与。**対ページ同時修正の対象外**＝購入者マイページ（p5系）固有の構造で、売り手側 p3/p4 に対応する完了カードのキュレーション操作は存在しない。**React化時**＝購入済み作品の visibility は Collection エンティティの属性として p5-4（Collection 管理コンポーネント）が唯一の編集面を持ち、p5-14（取引一覧）は visibility を read-only 表示＋Collection への router link のみ。取引状態と作品公開状態を別ドメイン（Transaction／Collection）として分離する。**未検証**＝ブラウザ目視は未実施。

- 2026-07-06 **Step 3＝p2-1〜4 の本体コンテンツを760→1080幅（`--w-entity`）へ拡張し「パンくず＝tabnav＝ヒーロー帯＝コンテンツ＝ページ最大幅」の理想モデルを完成させた理由**（L84/L88 の Step 1〜2 の続き・一つずつ解決の最終段）。ユーザー指摘＝p2-1（スケジュール）/p2-2（開催場所）/p2-3（詳細）/p2-4（出展者）は `body[data-w="entity"]` でパンくず・ヒーロー帯・サブナビが1080幅なのに、本体だけ狭く上位帯と不一致。**原因＝本体ラッパが `.ktn-content--detail`（`max-width:var(--w-detail)` 760・common.css L3231）を付けており760で中央寄せされていた**。**なぜ1080が正しいか**＝4ページとも `.p2-N-layout` が `grid-template-columns:1fr 300px` の**2カラム**で、CLAUDE.md 画面最大幅表の「`--w-entity` 1080＝コンテンツトップ・下位（2カラム）」に該当する。上位 p2（展覧会トップ）が1080の2カラムなのに、その下位（スケジュール等・同じ2カラム）が760では設計意図と矛盾していた（`--w-detail` 760 は本来「編集フォーム・管理系の1カラム」用）。**実装＝本体から `ktn-content--detail` を外すだけ**（`class="ktn-content ktn-content--detail p2-N-wrap"`→`class="ktn-content p2-N-wrap"`・4 HTML）で `.ktn-content` 素の `max-width:var(--w-index)`＝1080に戻る。**左右paddingの発見**＝`.p2-N-wrap{padding:32px 24px 80px}` は宣言上24pxだが、editorial v2 の `.ktn-content{padding:32px 20px 48px}`（L12459・同一単一クラス詳細度で後勝ち）に上書きされ**実効20pxで既にグリッド一致していた**（宣言と実効が食い違う"死に値"）。ソース正直性のため宣言も `32px 20px 80px` に是正（4 CSS・見た目不変）。内側 `.p2-N-layout`（grid）・`.p2-1-date-bar/.p2-1-layout`（`max-width:var(--w-page)`＝entity1080）は独自の760制約を持たず親1080を満たすため追加変更なし。**React化時**＝表示系の下位ページは上位と同じ幅コンテナ（`--w-entity` 1080）に通し、`--w-detail` 760 は編集フォーム/管理系1カラム専用に限定する。カラム数（1か2か）でpage幅を決める規約をコンポーネント（`<PageShell width="entity|detail">`）の型に落とす。**未検証**＝ブラウザ目視は未実施。

- 2026-07-06 **Step 3の続き＝「コンテンツ幅＝ヒーロー帯幅」の真の要件を確定し、コンテンツ本体をデスクトップで左右flush(0)に（モバイルは可読性のため余白維持）**。**背景＝ユーザーの「幅を揃える」の定義が判明した**：単に max-width を1080に合わせることではなく、**「コンテンツの左右端＝ヒーロー帯の外枠の左右端」を一致させる**こと（ユーザー言「以前のp6～p6-2のような状態＝コンテンツがヒーロ帯と同じ幅」）。Step 3 で p2-1〜4 を760→1080化したが、本体 `.ktn-content` は左右20px inset（実効1040）のままで、ヒーロー帯 `.p2-title-band`（max-width1080・色帯の外枠は1080端まで）と**左右端が20pxずれて**いた（帯は端まで塗り、コンテンツカードは20px内側）。ユーザーはこのズレを「今はずれてしまった」と指摘。**判断＝コンテンツの左右paddingをデスクトップで0にし、帯外枠(1080)まで広げて端を揃える。ただしモバイルは「両側の空白が必要（可読性）」との要望で余白を残す**。**実装＝p6ヒーローで使った `.ktn-content--flush-x`（無条件で左右0）を流用せず、レスポンシブ版の共通クラス `.ktn-content--flush-x-desk` を新設**：`.ktn-content.ktn-content--flush-x-desk{padding-left:0;padding-right:0}` ＋ `@media(max-width:540px){…{padding-left:16px;padding-right:16px}}`（mobile 16px＝editorial mobile `.ktn-content{padding:24px 16px 40px}` と同値）。複合セレクタ(0,2,0)で editorial `.ktn-content`(0,1,0) を順序非依存に上書き。p2-1〜4 の本体 `.ktn-content` に付与（4 HTML）。**なぜ `--flush-x` と分けたか**＝`--flush-x` は p6 ヒーロー（画像主役の囲みカード）用で**全ビューポートで0**（モバイルでもカードを画面端まで）。コンテンツ本体は**モバイルで余白が要る**ため挙動が異なる＝別クラスに分離（p6ヒーローのモバイル挙動を変えない）。**p6コンテンツとの関係＝p6は今回対象外**：p6ヒーロー(flush1080)の下のコンテンツは従来通り20px inset(1040)だが、p6ヒーローは**囲みカード（枠線）**なので中のコンテンツが20px inset でも「カード内の意図的な余白」に読め、ユーザーは p6 を"良い例"として挙げている（＝カード型ヒーローは inset 容認／色帯型ヒーロー p2 は端一致を要求、という美的差）。**スコープ＝現状 p2-1〜4 のみ**（一つずつ確認するユーザーのMOに従い、p2本体/p3/p4/p5 等への横展開は目視確認後に判断）。**左端グリッドとの関係**＝Step 2 で揃えたパンくず/サブナビ/ヒーロー"テキスト"は20pxのまま。今回コンテンツは0（帯"外枠"に一致）＝コンテンツカードはナビ文字より20px外側に出る。ユーザー要件は「コンテンツ＝帯（外枠）」なのでこれで正。**React化時**＝表示系コンテンツコンテナは「デスクトップ flush（帯外枠と端一致）＋モバイル inset（可読余白）」を既定にし、色帯ヒーローのページはコンテンツを帯幅まで使う。カード型ヒーロー（p6）はヒーロー内 inset を許容＝ヒーロー種別（帯／カード）で規約を分ける。**未検証**＝ブラウザ目視は未実施。

- 2026-07-06 **【上項の p6 除外を撤回】ユーザー指示で p6/p6-1/p6-2 のコンテンツ本体もヒーロー帯（1080）と同幅に揃えた**（ユーザー「まず今のp6~p6-2のコンテンツ幅をヒーロー帯に揃えて」）。上項では「p6ヒーローは囲みカードなのでコンテンツ20px inset を容認」と推測し p6 を対象外にしたが、ユーザーはカード型ヒーローでも**コンテンツ左右端＝ヒーロー枠線端の一致**を望んだ（＝帯／カードの美的差ではなく、一貫して「コンテンツ＝ヒーロー外枠」を要件とする）。**実装＝p6コンテンツ本体div（`<div class="ktn-content" style="padding-top:0">`・p6/p6-1/p6-2 各1箇所）に `ktn-content--flush-x-desk` を追加**（inline `padding-top:0` は据え置き＝class は左右のみ0化）。p6ヒーロー（`.ktn-content--flush-x`＋inline `padding:0`）は不変で1080。デスクトップ>768pxでコンテンツ左右0＋`.p6-layout`（左右padding無し）＝1080でヒーロー枠線と一致。**モバイル挙動の検算**：`.p6-layout` は `@media(max-width:768px){padding:0 16px}`／`@media(max-width:480px){padding:0 14px}` を持つ。flush-x-desk のモバイル（≤540px）16px と重畳し、≤540px＝16+16=32px（従来 editorial mobile 16＋layout16 と同じ・不変）、≤480px＝16+14=30px（従来と同じ）、中間541-768px＝0（desk rule）+16＝16px（従来 editorial desk20＋layout16=36px から縮小＝帯へ寄る方向で整合）。**React化時**＝ヒーロー種別（帯／カード）で規約を分けず、表示系はコンテンツ左右端をヒーロー外枠に合わせる（desktop flush／mobile inset）を統一既定にする（上項の「種別で分ける」指針は本項で更新）。**未検証**＝ブラウザ目視は未実施。

- 2026-07-07 **【p2 ヒーロー／概要セクションに時間・場所依存の状態表示を実装】展覧会トップ p2 の会期状態バッジ・本日休み・現在地からの距離を、既存 個展なび の挙動に合わせて追加**。**対象＝p2.html のヒーロー（`.p2-title-band`）と、p2 ページ内の スケジュール概要（`#p2IcSch`）・開催場所概要（`#p2IcVen`）セクション**（別ページの p2-1/p2-2 ではない）。**3表示の役割分離**：(1) **状態バッジ**＝会期全体のステータス。`_P2_BADGE` マップで `before`＝`sb-upcoming`「あと3日で開催」／`during`＝`sb-live`「開催中 · 残りN日」（pulse）／`after`＝`sb-closed`「終了」。(2) **本日休み**＝その日の開館状況。`during` かつ `_p2Closed` の時のみ、開館時間（`_p2Hours`）の代わりに「本日休み」を `.p2-title-band__dtime--closed`（`#c8501c`）で表示。会期外・非休館日は通常の開館時間。(3) **距離**＝現在地からの会場距離。`.p2-side-ec__dist`（近くの展覧会カードの距離チップ）と同系の新クラス `.p2-title-band__dist`（ピンSVG＋距離・`var(--page-accent)`）。ヒーロー会場行は inline、開催場所概要セクションは dl 独立行（`--row` 修飾子で `margin-left:0`）。**単一ドライバ `_p2ApplyStatus()`**＝state 変数 `_p2Period`('before'/'during'/'after')・`_p2Closed`(bool) から全表示を一括更新。ヒーローの状態バッジと スケジュール概要の添え書き（`.p2-sch-status__remain`＝開始–終了バー直下に小さく添える）は同じ `_P2_BADGE` テキストを共有し連動。本日休みはヒーロー時間行・スケジュール概要（`.p2-sch-status__closed.is-on`）の両方に反映。**デモ操作＝dbar に「会期」（会期前/会期中/終了後）＋「本日」（開館/休館）トグルを追加**、`setPeriod()`／`setToday()` が state を変えて `_p2ApplyStatus()` を呼ぶ。init（`KTN.init` 後 L1014）で初期反映。**レイアウト選択（ユーザー指定）**＝スケジュール概要の残日数は「開始–終了バーの近くに小さく添える」、距離は「独立した行」。**CSS**＝`.p2-sch-status`（開始–終了バー直下・中央寄せ・`.__remain` muted／`.__closed` は `.is-on` で表示）と `.p2-title-band__dtime--closed`／`.p2-title-band__dist`（＋`--row`）を新設。`.p2-title-band__facts` に `align-items:baseline` を追加（会場/会期 dt/dd のベースライン揃え是正）。**表示/非表示は `.is-on` トグル**（`[hidden]` の詳細度問題を避ける既定 `display:none`→`.is-on` で開く方式）。**React化時**＝会期状態・本日休み・距離はデモの state トグルではなく、API/Drupal が返す会期日付・休館日マスタ＋ブラウザ Geolocation から**クライアント側で算出**（CSR）。状態バッジ/本日休み/距離の3表示は同一の派生ロジック（現在時刻・現在地）を単一の hook にまとめ、ヒーローと概要セクションで共有する。HTML 構造・クラス（`.p2-title-band__dist`／`.p2-sch-status`／`.is-on`）はそのまま流用可。**未検証**＝ブラウザ目視は未実施（HTML/CSS/JS の整合はコード上で確認済み）。

- 2026-07-07 **【p2-3 ページ名「詳細」→「記事・案内」に改称】p2-3（記事／関連イベント／関連情報／クレジット／入場・会場情報）のページ呼称を全面改称**。**背景＝ユーザー相談「p2-3 のページタイトルが『詳細』だが、内容は記事・関連イベント・関連情報・クレジット・会場情報で、p2 で表示した情報の"詳細"とは言いがたい。他に良い表記案は？」**。**却下案＝「もっと知る」**：他タブ名（概要／スケジュール／開催場所／出展者／作品）が体言止め（名詞終わり）で並ぶのに対し「もっと知る」は動詞句で乖離するとユーザー指摘。→ 名詞候補に転換。**採用＝「記事・案内」**（中黒「・」区切り。ユーザー「推しで行ってください」で確定）。**半角スラッシュ「記事/案内」案も出たが中黒を採用**（字数は中黒の方が長いが、和文の並列は中黒が標準的で読みやすい）。**モバイル収まり確認済み**（ユーザー要件「スマホも入りきることを確認してね」）＝サブナビは横スクロール設計（`.p2-subnav-bar{overflow-x:auto;scrollbar-width:none}`＋`.p2-subnav__item{white-space:nowrap;flex-shrink:0}`・モバイル `.85rem`）でラベルは省略されず全表示＋帯がスクロールするため「記事・案内」(5字)も切れずに収まる。**反映箇所＝ページ名の全参照を統一**：(a) common.js の `PAGES['p2-3']`（パンくず末尾＋内部名 `n`='展覧会-記事・案内')／`TAGBAR_DEFS['p2-3']`（タグチップ label）／`TAGBAR_DEFS['p2-5']`（p2-3へのリンク label）／セクションコメント。(b) 全サブナビ・サイドリンクの「詳細」ラベル＝p2-1/p2-2/p2-3/p2-4/p2-5/p2-5-1 の `<span class="p2-subnav__label">` と `<span class="p2-side-link__label">`。(c) p2-3.html の `<title>`・og:title・meta description（「〜の**詳細情報。**〜」→「〜の〜」に短縮）・JSON-LD `name`・HTMLコメント。**タグバー「展覧会詳細」チップとの区別**＝タグバー（`TAGBAR_DEFS`）は別系統だが、ページ名参照として p2-3 チップ label も「記事・案内」に統一（横断的整合）。**React化時**＝ページ名は route/nav 定義の単一ソース（`PAGES` 相当）に持たせ、breadcrumb・subnav・tagbar・`<title>`・OGP・構造化データが同一の表示名を参照する。ページ内容の実体（記事・イベント・関連・クレジット・会場情報）は「詳細」ではなく補足コンテンツ群である点を名称に反映した。

- 2026-07-07 **【p5系 右カラム「ウォッチからの展覧会」ウィジェット廃止 → 関連情報「最近のウォッチ／興味あり！の展覧会」（`.p5-side-rel`）新設】**（ユーザー指示）。p5〜p5-4 の右カラム中段にあった旧ウィジェット②（`.p5-side-widget`＋6状態バリアント `.p5-side-watch-normal/-empty/-stale/-other/-other-zero/-other-stale`・`.p5-side-from` アバター行・`.p5-side-checkin-row`）を5ページから削除し、**右カラム末尾（区切り線・広告の前）**にサイト共通 related-zone 書式（transparent 背景＋上部 2px ink ライン＝grouped selector へ `.p5-side-rel` 追加）の回遊ゾーンを新設。内容は (a)「最近のウォッチ」＝ウォッチしたクリエイター・ギャラリーを**ウォッチ日降順で最大3件**（`.p5-side-wl-item` 行＋`.p5-side-rel__date`）、(b)「興味あり！の展覧会」＝最大3件（`.p2-side-ec` カード）。各ブロック末尾の「もっと見る →」は**検索ページへの導線**（(a)→P10-2/P10-3 クリエイター・ギャラリー検索／(b)→P10 展覧会検索。検索ページ未制作のため現状 href="#"＝制作後に差し替え）。**廃止判断の理由**：旧ウィジェットは「ウォッチ先の開催中展覧会」を出すもので、本人閲覧時のみ有用・6状態の分岐管理が重かった。新デザインはページオーナーのウォッチ／興味あり！活動そのものを関連情報として見せる（回遊の起点はカラム末尾の discovery ゾーンに集約するサイト共通方針と一致）。**owner/other/zero/stale の状態バリアントは持たない**（全閲覧者に同一表示・件数0の状態は本番で件数に応じてブロックごと非表示にする想定）。旧状態トグルCSS（`body.p5-zero/.p5-stale/.p5-other` の watch 系セレクタ・`.p5-side-empty__*`・`.p5-side-stale__msg`）は削除済み（アクティビティ①・もうすぐ終了/ピックアップ②のトグルは残置）。React 化時は (a)(b) を `RecentWatchList` / `InterestExhibitionList`（いずれも limit=3・日付降順・検索ページへの more リンク）として実装。

- 2026-07-07 **【p5系右カラム フィードバック7項目＝関連ゾーン全ページ統一・ゼロ状態再設計・「休止中」廃止】**（前項の実装へのユーザーフィードバック・不明点は4問の確認質問で解消してから実装）。
  - **①「もっと見る →」の全ページ統一**（ユーザー回答「右カラムの関連情報についてはすべてそろえる」）：右カラム関連ゾーンの more リンクを、head 内インライン「すべて →」（p2/p3/p4系）・「すべて見る」（p6系）から**コンテンツ下のブロック型「もっと見る →」**（p5書式）へ22ファイルで統一。canonical＝`.p2-side-nearby__more`（block・`--fn` .75rem・`var(--page-accent)` 色・padding 10px 0 0。旧 Cinzel uppercase の head 内定義は削除）。**既存 href は維持**（p2系＝`kotennavi-p2.html?filter=near`／p6系＝`kotennavi-p3-1.html`／p3・p4系＝`#`）。`.p5-side-widget__more` クラスは廃止。**理由**＝4種の表記・位置ゆれ（すべて→/すべて見る/もっと見る→、head内/下部）を1パターンに集約し、React 化時の `<RelatedZone>` の more スロットを単一 variant にする。
  - **②改称**：「興味あり！の展覧会 Interests」→「**最近の興味あり！ Recent Interests**」（p5系）。(a)「最近のウォッチ」と対になる時間軸の含意を持たせる。
  - **③デモバー「休止中」（stale）状態の完全廃止**（p5系5ファイル＋CSS/JS）：旧ウィジェット廃止で stale 表示の実体が消えたため、デモ状態としても廃止。JS は `classList.toggle('p5-zero', state==='zero')` に簡素化。
  - **④⑤ゼロ状態の意味の是正**（ユーザー訂正「逆の意味です」）：**ゼロ＝サイト内アクティビティが無い"オーナーユーザー"**（データ欠損の他人ページではない）。p5-1〜p5-4 が空で見せる意味がないため、(i) タブナビのカレンダー以外4項目を disable（`p5-tabnav__item--zero-off`＋`body.p5-zero` で pointer-events:none・muted）、(ii) 右カラムのカウンター下サブメニューリンク（`.p5-side-act__links`）非表示＋ゼロメッセージ表示、(iii) ピックアップ（「今週のピックアップ」→「**ピックアップ**」に改称）をウィジェット②から関連情報ゾーン先頭（`.p5-side-rel-pickup`）へ移設し、**ゼロ・他ユーザー表示時のみ**「通常ユーザーに表示される最近のウォッチ・最近の興味あり！の**前**」に表示。ウィジェット②「もうすぐ終了」はゼロ・他ユーザー時 `:has(.p5-side-ending-hd)` で非表示。**解釈note**＝ゼロ状態で watch/interest セクションも表示したまま（ピックアップを前置）と文字通りに読んだ。ブラウザ確認で要検証。
  - **⑥関連ゾーン背景＝A案採用**（ユーザー回答「3.A」）：全ページの右カラム関連・回遊ゾーン grouped selector の背景を transparent → **`#faf7f1`（warm cream）**＋padding 24px 22px。**理由**＝メインコンテンツとの区切りが弱いというフィードバックに対し、ページ下部の関連・回遊ゾーンと同じ「回遊誘導＝クリーム」の色言語で識別（CLAUDE.md 背景色ルールの「関連・回遊ゾーン＝#faf7f1」に右カラムも合流）。ダーク面（`.p251-dark`・`.p6-dark`・panel-dark）は transparent 維持。
  - **⑦右カラムカードにバッジ**：p5系ウォッチ行に `cb-creator`/`cb-gallery`、興味あり！カードに `cb-exhibition` を追加（他ページの `.p2-side-ec` は既にバッジ済み）。人物/コンテンツの種別を related-zone でも常時明示する方針。

- 2026-07-07 **【前項⑤⑥の再修正＝ゾーン内ブロック区切り・バッジ縦積み】**（ブラウザ確認後のユーザーフィードバック。①〜④⑦はOK）。
  - **⑤の取り違え是正**：前項⑥のクリーム背景は「ゾーンと上のコンテンツの区切り」への回答だったが、ユーザーの真意は**ゾーン内の複数ブロック（ピックアップ／最近のウォッチ／最近の興味あり！）同士が繋がって見える**こと（ゾーン外との区切りは太2px inkラインで既に成立とユーザー明言）。**実装＝ゾーン内ブロック間ヘアライン**：`.p5-side-rel__head2` に `border-top:1px solid var(--border)`＋padding/margin、`.p5-side-rel-pickup` に `border-bottom`（display:none 時は現れない＝ゼロ/他ユーザー時のみ区切りが出る）。**クリーム背景はその後のユーザー指示「ゾーン内ブロック区切りがあれば、背景色不要です」で transparent に復帰**（前項⑥A案は取り消し・ダーク上書き3セレクタも不要化のため削除。右カラム関連ゾーンの識別は従来どおり上部2px inkライン＋今回のブロック間ヘアラインが担う）。**React化時**＝`<RelatedZone>` 内の複数セクションは divider 付きで積む（先頭セクションには divider なし・条件表示セクションは自身が divider を持つ）。背景は transparent が正。
  - **⑥バッジ配置規則＝「バッジ改行タイトル」**（ユーザー明言）：バッジはタイトルと同一行に並べず、**タイトルの上の行**に置く（`.p2-side-ec__badge-row` と同じ形）。ウォッチ行は `.p5-side-wl-info`（flex column）＋`.p5-side-wl-badge-row`（バッジ＋`.p5-side-rel__date` 右寄せ）→ `.p5-side-wl-name` の縦積みへ変更（両クラスはCSS既存定義を活用・HTML5ファイル）。**ピックアップの3カード（`.ec--mini`）にも `cb-exhibition` を追加**＝`.p5-side-ending__meta`（タイトル上のメタ行）の先頭。**同じ `.p5-side-ending__item` を使うウィジェット②「もうすぐ終了」には付けない**（ユーザー指示は「ピックアップにも」＝スコープ限定）。**React化時**＝バッジ行はカード/行コンポーネントの共通スロット（badge-row above title）として型に落とす。

- 2026-07-07 **【ゾーン内ブロック区切りの再々修正＝solid ヘアライン → dotted 罫線】**（ブラウザ確認後のユーザー指摘「区切り線がブロック内のタイトル下線と同じなので、ブロック区切りとしては認識されない」）。前項⑤の区切り（`1px solid var(--border)`）は、各ブロックのタイトル下線（`.p2-side-nearby__head` の editorial v2 下罫線＝`border-bottom:1px solid var(--border)`）と完全に同じ見た目で、階層（ブロック間 vs ブロック内）が読み取れなかった。**実装＝`.p5-side-rel__head2` border-top／`.p5-side-rel-pickup` border-bottom を `1px dotted rgba(35,24,21,.4)`（点線＋インク系のやや濃いトーン）へ変更**（CSSのみ・HTML不変・p5系5ページに自動適用）。**罫線3階層の使い分けが確定**：ゾーン上端＝`2px solid var(--ink)`（最強）／ゾーン内ブロック間＝`1px dotted rgba(35,24,21,.4)`（形で区別）／ブロック内タイトル下線＝`1px solid var(--border)`（最弱・ヘアライン）。**React化時**＝`<RelatedZone>` の divider トークンは title-underline とは別トークン（dotted）として定義する。

- 2026-07-07 **【ゾーン内ブロック区切りの最終形＝1px solid ink ＋ 間隔拡大】**（前項 dotted 案へのユーザーフィードバック「点線ではやはり区別できない、ブロックの間隔をあけて、区切り線を関連情報の始まりをあらわす線色で太さを小さくした線に」）。**実装＝`.p5-side-rel__head2` border-top／`.p5-side-rel-pickup` border-bottom を `1px solid var(--ink)`（ゾーン開始線 2px solid var(--ink) と同色・太さのみ 1px）へ変更し、間隔を padding 20px→28px／margin 22px→30px に拡大**（CSSのみ・HTML不変）。**確定した罫線階層＝「同色・太さで階層を示す」方式**：ゾーン上端＝2px solid var(--ink)／ゾーン内ブロック間＝1px solid var(--ink)＋広め間隔／ブロック内タイトル下線＝1px solid var(--border)（淡いヘアライン）。前項の「形（dotted）で区別」は不採用＝細い点線は淡いヘアラインと視認上ほぼ同じに見えるため、**区別は色の濃さ（ink vs border）で付ける**のが正。**React化時**＝`<RelatedZone>` の divider は zone-start line の縮小版（同色1px）＋ブロック間 gap トークンとして定義する。

- 2026-07-07 **【p5系 関連ゾーンのカード形式統一＝「関連情報のコンテンツカードは基本CTAボタン付き」原則の確定】**（ユーザー指示）。(1) **ウィジェット②「もうすぐ終了」の展覧会3項目にも `cb-exhibition` バッジを追加**＝前項の「ピックアップにも＝スコープ限定・もうすぐ終了には付けない」判断をユーザー指示で転換し、右カラムの展覧会アイテムは全て種別バッジを持つ。(2) **ピックアップのカードを「最近の興味あり！」と同型の `.p2-side-ec` へ変更**（旧 `.ec--mini` ミニパネル廃止）。badge-row＝`cb-exhibition`＋開催ステータス／名前・会場・会期／**interest ボタン=off**（レコメンドなので未追加状態・「興味あり！に追加する」）。(3) **「最近のウォッチ」を p2 の投稿者ギャラリーカード・p2-5 の投稿者クリエイターカードと同型の人物カードへ変更**＝`buildPersonCard` の panel 変種（`.cc--h.cc--panel`／`.gc--h.gc--panel`）と同構造の静的HTMLを `.p5-side-wl-cards`（flex縦積み gap10px）に3枚。badge-row に `cb-person` バッジ＋`.p5-side-rel__date`（margin-left:auto で右寄せ・ウォッチ日）、**watch ボタン=on**（watching・ウォッチ済みなので解除CTA）。旧 `.p5-side-wl` 行リスト（CSS14ルール＋860px 2カラムグリッド）は完全削除。**確定原則＝関連・回遊ゾーンに表示するコンテンツカードは基本CTAボタン付き**（展覧会カード＝interest／人物カード＝watch。CLAUDE.md 関連・回遊ゾーン行に明文化）。**React化時**＝`<RelatedZone>` 内のカードは既存の `<SideEcCard>`（interest 内蔵）と `<PersonCard variant=panel>`（watch 内蔵）を再利用し、related-zone 専用のカード型を作らない。人物カードの badge-row 右端に date スロット（ウォッチ日）を追加する。ウォッチ同期は既存規約どおり `.cc`/`.gc` カードを .closest() 除外でページオーナーと非同期。

- 2026-07-07 **【最近のウォッチの日付表示を廃止】**（ユーザー指示「最近のウオッチに日付不要です」）。人物カード badge-row 右端に置いていたウォッチ日（`.p5-side-rel__date`）を p5系5ファイルから削除し、クラスも全廃（CSS定義削除）。**ウォッチ日降順の並び順自体は維持**（ソートキーとしてのみ使用・表示しない）。**React化時**＝前項の「人物カード badge-row 右端に date スロット追加」は不要（撤回）。`<RecentWatchList>` は watch 日時を sort にのみ使う。

- 2026-07-07 **【もうすぐ終了カードのバッジ位置＝ボックス内タイトル上・矢印廃止】**（ユーザー指示）。前項(1)で `.p5-side-ending__meta`（ボックス外の上部メタ行）先頭に置いた `cb-exhibition` を、**`.ec--mini` ボックス内・展覧会タイトルの直上**へ移設（新設 `.ec__mini-badge-row`＝`.ec__mini-body` の最初の子。メタ行は開催ステータス＋日付のみに戻す）。あわせて**タイトル右の矢印 `.ec__mini-arrow`（→）を削除**（p5系5ファイルの実使用のみ・CSS定義とデモ `kotennavi_cards_exhibition.html` は残置）。**理由**＝バッジ改行タイトルの原則（バッジはカード内・タイトルの上の行）を `.ec--mini` にも適用し、`.p2-side-ec` 等と揃える。矢印はバッジ行が入ることで冗長。**React化時**＝`<EcMiniCard>` に badge-row スロット（タイトル上）を持たせ、arrow は削除方向で統一検討。

### 2026-07-08 p5系ゼロ状態メッセージの文言是正＋検索導線
- **決定**：本人ゼロ状態（`body.p5-zero`）のカウンター下メッセージ（`.p5-side-act__zero-msg`）を「まずは気になる展覧会をウォッチしてみましょう。」→「まずは気になる展覧会を探してみましょう。」に変更し、展覧会検索ページ（P10）への `ktn-guide-link`「展覧会を探す →」を追加（p5〜p5-4 の5ファイル）。
- **理由**：展覧会はウォッチ対象外（watch＝クリエイター/ギャラリー。展覧会は興味あり！）のため、旧文言はサイト語彙と矛盾。ゼロ状態の最初のアクションとして検索への導線を明示。
- **React/Drupal**：`<ZeroStateMessage>` に検索ページへの Link を含める。P10 未制作のため現状 href="#"（HTML コメントで差し替え箇所を明示）＝P10 制作後にルーティング確定。

### 2026-07-08 「もっと見る →」リンクの共通名化（.p2-side-nearby__more → .ktn-more-link）
- **決定**：関連・回遊ゾーン共通のブロック型遷移リンク `.p2-side-nearby__more` を **`.ktn-more-link`** に全ファイル一括リネーム（CSS canonical＋dark 上書き＋HTML 24ファイル＋component-html.md）。p5ゼロ状態メッセージの「展覧会を探す →」も `ktn-guide-link` から本クラスへ変更。
- **理由**：全ページで共通使用しているのに p2 プレフィックスのままだったのは命名と実態の不一致（ユーザー指摘）。また同じ右カラム内で P10 検索ページ行きリンクが2書式（guide-link＝下線参照リンク／more＝ブロック型）に割れるのを避け、「一覧・検索ページへの回遊導線＝ブロック型 `.ktn-more-link`」に役割を一本化。`.ktn-guide-link` はガイド・説明への参照リンク専用に戻す。
- **React**：`<MoreLink>` 共通コンポーネント（text 任意＝「もっと見る →」「展覧会を探す →」等・色は var(--page-accent) 継承）。過去エントリの `.p2-side-nearby__more` 表記は旧名として読み替え。

### 2026-07-08 LIAISON+ 作品情報の編集制御＝スナップショットなし・ロック/凍結モデル（仕様書 第17章 新設）
- **決定**：取引ページ・コレクションルーム（P5-4）は作品レコード本体を直接参照し、コピー（スナップショット）は持たない。①申込1件以上〜取引進行中＝同一性フィールド（作品名・画像・仕様・価格）を編集ロック（変更は出品取消→再出品のみ）②取引完了＝作品レコード恒久凍結（編集・削除不可）③売約済作品は削除不可（非公開化は可だが購入者のコレクション表示は維持）。
- **理由**：スナップショット方式は2重管理になりシステム的に真正性を担保しにくい（ユーザー判断）。単一レコードの不変化なら参照先が変わらないことをレコード側で保証できる。価格も最初の申込以降ロック＝契約価格とライブ価格が乖離しない。進行中の部分編集（説明文のみ可等）は同一性の線引きが複雑になるため設けない。
- **React/Drupal**：作品ノードに編集ロック状態（申込有無・取引完了）を持たせ、編集フォーム（P6-11/P2-12-1）はロック時フィールド disable＋notice。取引完了で凍結フラグ＋削除禁止。将来編集ニーズが出たら Drupal ノードリビジョンの固定参照方式へ移行可（互換）。正本＝docs/06_リエゾン_サービス仕様書.md 第17章。

### 2026-07-08 本番ページから kotennavi-components.css を外す方針の再確認（p5-11〜13 で幅崩れが実害化）
- **事象**：p5-11〜13（アカウント管理3ページ）が本番ページ禁止の `kotennavi-components.css` を読み込んでおり、その `:root` が common.css の後から `--w-detail:1080px`／`--w-article:720px`／`--fn:'Noto Sans JP'`（HTML側で未ロード）等を上書き。mgmt 汎用幅ルール（`max-width:var(--w-detail)`）が 1080 に化け、ヒーロー帯=1080／パンくず=720／コンテンツwrap=760 と3層が不一致になっていた（sitemap の 760 定義とも不一致）。
- **決定**：3ページから `<link>` を削除して解消。CLAUDE.md の「components.css はデモ専用・本番ページでは使用しない」ルールが正であることを実害で確認。
- **React/Drupal**：変換時は components.css を成果物に含めない。デザイントークン（`--w-*`・`--fn` 等）は common.css の `:root` のみを正とする。
- **残課題**：表示系14ページ（p2系7・p3系4・p4系3）にも同じ `<link>` が残存（--fn が fallback フォントで表示されている等）。削除は見た目変化を伴うためユーザー確認待ち。

### 2026-07-08 components.css を全本番ページから排除完了（.mc/.lc カードを common.css へ移設）
- **決定**：上記残課題を解消。表示系14ページからも `<link>` を削除し、**本番ページ（kotennavi-p*.html）の components.css 読込を全廃**（ユーザー方針＝CSSは共通化を徹底し冗長性・ゴミを除去）。components.css はデモHTML専用として存置。
- **移設**：components.css にしか定義が無く本番で実使用されていた **`.mc`（マガジンカード＝p2-3）／`.lc`（リストカード＝p3-2・p4-2・pages.js生成）／`.byline-author/-name`／`.ph-1〜6,n1,n2`（画像プレースホルダー）** を common.css セクション16末尾へ移設。移設時にカード共通ルールへ是正（radius 4px・控えめホバー。p2-3 の radius 6px 個別上書きも削除）。
- **変数移設**：`--tag-bg:#e8edf2`・`--col-article:#2e7a4e`・`--col-review:#b86a10`・`--col-news:#c0392b` を common.css `:root` へ（components 非読込ページで透明化していた潜在バグ解消）。未定義変数 `var(--font-ui)` は `var(--fn)` に是正。
- **React/Drupal**：`.mc`/`.lc` は記事系一覧カードコンポーネント（`<ArticleCard variant="magazine|list">` 想定）。`--col-*` は cb-content バッジと同一パレット＝トークン共有可。
- **未定義変数の後始末（2026-07-08 ユーザー判断）**：`--warm-white`（.ktn-ad-band 背景）＝**透明が正**として宣言を削除（広告バンドに背景色は付けない）。`--bg`＝**有効化**：非アクティブタブの件数チップは `var(--tag-bg)`、p5-3 行 hover は `var(--warm)` に置換。チップは「非アクティブ＝グレーピル → アクティブ＝page-accent ピル」の状態遷移が設計どおり完成（is-active 側は元から動作）。React 変換時も `--bg`/`--warm-white` というトークンは存在しない前提でよい。

### 2026-07-08 P10 レビュー第2ラウンド＝.ec カード標準の canonical 是正＋プリセットのファセット軸アイコン採用
- **決定1（カード描画の一本化）**：p10 のページ内カードビルダー（bespoke buildEc）を廃止し、既存共通ビルダー **`buildGridEcCard`（pages.js 冒頭・cards_exhibition.html マソンリー完全準拠・`.masonry-item` ラップ＋`imgH` 可変高さ）** に一本化。共通ビルダー側を標準へ強化：曜日 `dow`（`ecDow()` ヘルパー）・`area`「|」区切り・`light`（明背景 noimg）・開催前 LIAISON「〜予定」文言＋サムネ抑制。`.p10-shelf-grid` は flex 等幅 → `columns` マソンリーへ。**React**＝`<ExhibitionCard>` は buildGridEcCard の出力構造が正（グリッド＝columns マソンリー）。
- **決定2（canonical CSS のバグ是正＝全ページ波及）**：(a) `.ec__poster-overlay` 背景を薄グラデ→標準の solid `rgba(0,0,0,.52)` 帯へ（デモHTMLは components.css の後読み上書きで正しく見えていたが、本番＝common.css のみでは崩れていた＝components 全廃方針の副次発見）(b) editorial v2 の ink 色統一リストから `.ec__poster-dates`/`.ec__poster-meta` を除外＝暗色帯上の白文字を復元（黒文字でほぼ読めない状態の根本原因。ink 統一は「白地上のメタ」だけが対象）(c) `.ec__foot` に `justify-content:flex-end`（標準＝カウンター＋CTA右寄せ）。既存の `.ec` マソンリー使用ページ（p2-2/p3/p4/p5系関連ゾーン）にも同是正が及ぶ。
- **決定3（プリセットアイコンのルール確定・前エントリ「テキストのみ」を改訂）**：プリセット（アルゴリズム生成の保存済み検索）のアイコンは**主ファセット軸 axis からの決定的マッピング**＝ area=ピン / date=カレンダー / price=チケット / pop=星 / tag=タグ（インラインSVG・currentColor）。自動生成でも「生成条件の主軸→アイコン」が一意に決まるためアドホックにならない（ユーザー承認済み提案）。LIAISON プリセットのみ lb-dot ブランドマーク（商標＝ファセット外）。**React/Drupal**＝プリセット生成器は `axis` を必須フィールドとして出力し、フロントは axis→icon の固定辞書（`P10_ICONS`）で描画。

### 2026-07-08 P10 レビュー第3ラウンド＝.ec 定義の components.css 重複全廃＋「本日休み」表示ルール変更

**決定1（.ec の single source 完成）**：`kotennavi_cards_exhibition.html`（.ec の参照元＝標準）が components.css の重複 `.ec` ブロックに後読み上書きされ「デモ＝正・本番＝崩れ」の乖離を生んでいたため、components.css の `.ec`〜`.ec-mini-panel--light` ブロック全体を削除し common.css canonical のみで描画する構成に是正（ポインタコメント残置・再追加禁止）。React 変換時は common.css の `.ec` 系のみを参照すればよい（components.css に .ec 情報は無い）。

**決定2（本日休みの表示ルール・仕様変更）**：展覧会カードの「本日休み」は**残り日数バッジを置き換えない**。バッジは通常の「残りxx日」（`--live`）のまま、**営業時間の位置（距離の前）に時間の代わりに「本日休み」を表示**する。理由＝「本日休み」は会期の残量ではなく当日の開館状態であり、時間スロットの情報と同軸（p2 ヒーローの `_p2ApplyStatus` が時間行を「本日休み」に差し替えるのと同一思想）。旧「グレー枠線バッジ＋時間非表示」方式は廃止＝ `.ec__remain--closed` / `.ec__remain-lt--closed` を CSS から削除。`buildGridEcCard` はデータフィールド `closedToday`（bool）で時間差し替え（`status:'closed'` は状態値として廃止）。Drupal/React 実装時は「会期中 AND 本日が休館日」の判定で `closedToday` を供給する。

### 2026-07-08 P1 個展なびトップ プロトタイプ新規制作（P10 とのデザイン比較用）

**決定1（P1/P10 住み分けの実装確定）**：P1＝時間軸・パーソナルフィード＋入口（プレビュー棚＋P10送客）／P10＝目的軸のディスカバリー＋検索ハブ。**棚の重複禁止**を実装で徹底＝P10 が持つ棚（もうすぐ終了/近く/Liaison棚/特集×2/おすすめ/新着掲載）は P1 に置かず、P1 のログイン棚は「あなたのウォッチから新着（Watch Updates）」「興味あり！のもうすぐ終了（Don't Miss）」＝**本人のアクティビティ起点**の2本のみ。P1 は検索エンジンを持たない＝検索ボックス・クイックチップは全て kotennavi-p10.html への送客リンク（`<a>`）。**React/Drupal**＝トップの検索UIはフォームでなくナビゲーション（P10 へ遷移してから検索実行）。

**決定2（P1 のロール出し分け）**：ゲスト＝サイト紹介帯（`#p1Intro`・paper 背景＝CTA帯ルール・「無料ではじめる」→ `KTN.action.show('signup')` 汎用ログインモーダル）／ログイン＝パーソナルフィード（`#p1Personal`）。同一スロットの排他表示で、`applyRole()` を ktnRender にチェーン（p10 の見出し切替と同パターン）。Drupal ではサーバーサイドでどちらか一方のみ出力すればよい。

**決定3（ヒーロー Pick Up ＋ 新着ティッカー）**：ヒーローは editorial 2カラム（ポスター46%＋テキスト）・5件ローテーション（6秒自動＋ドット手動）。Pick Up の選定は本番では編集部/アルゴリズム（人気シグナル上位×開催中）を想定。ティッカーは時間軸イベント（新着掲載/まもなく終了/LIAISON+販売中）を CSS keyframes（2周コピー→-50% translate 無限ループ・hover pause・gap でなく margin-right で段差なし）。**React**＝`<HeroCarousel>` と `<NewsTicker>`、データは展覧会エンティティの時間軸イベントから自動生成（編集記事ではない）。

**決定4（LIAISON ブランド帯の形）**：P10 の「オンラインでも楽しめる」カード棚と形を分け、P1 ではダークスレート（#2e3a4a）の**ブランド帯**（lb-dot×2＋コピー＋`.ktn-action-btn--dark` ナビ2本＋作品サムネ4点）。同じ LIAISON 訴求でも「P1＝サービス認知（ブランド）／P10＝在庫への導線（カード棚）」と役割を分離。

### 2026-07-09 P1 NEWS帯＝横スクロール廃止・クロスフェード化（決定3のティッカー方式を上書き）

**決定**：決定3（2026-07-08）のティッカーは CSS keyframes 無限横スクロール（マーキー）だったが、ユーザー指摘「常時横に流れると文字が読めない／動くものが目立ち PickUp・個展なびとは等の主要コンテンツから視線が逸れる」により**廃止**。1件ずつ静止表示して 4.5秒ごとにクロスフェード切替（hover 停止・`prefers-reduced-motion` でフェード無効）に変更。**理由**：可読性（静止中に読める）と視覚的静けさ（常時移動が主要コンテンツから注意を奪わない）を優先。**React**＝`<NewsTicker>` は横スクロールでなく「フェード式ローテーター」（一定間隔で1件ずつ差し替え）として実装。

### 2026-07-09 P1/P10 タイポグラフィ是正＝「和文を --fm に載せない」の適用（監査スコープの判断）

**決定**：ユーザー指示「定義された表示系ルールに従って修正」に対し、p1/p10 の CSS ブロックを font システムで監査。**明確な違反＝和文を `--fm`（Montserrat＝和文グリフを持たずフォールバックする）で表示している2件のみを是正**し、weight/letter-spacing は変更しなかった。**理由**：①font 変数の誤用（和文×Montserrat）は客観的違反で CLAUDE.md の font システムに一意な正解がある＝`.p1-hero__meta`（会場・エリア和文）・`.p10-toolbar__count`（「件」）を、p2 タイトルバンドの確立パターン（和文は `--fn` 継承／数字だけ別フォントの span に分離）に合わせて修正。②見出しの weight/letter-spacing は CLAUDE.md「表示系ページ見出しの基準」表（600 基準）と「editorial v2」オーバーライド（hero name 700/-.005em）で**規定が競合**しており、p1 の hero/intro/liaison title（700）は v2 側と既に一致するため、初回は曖昧箇所を触らず据え置いた。**React**＝和文と欧文数字が混在するメタ行は、数字部分を専用要素（`.p1-hero__meta-item--date` 等）に分けて `--fm` を当てる（コンテナに一律 `--fm` を当てない）。

**追記（同日・weight/letter-spacing 競合の恒久解消）**：ユーザー承認により、競合の発生源＝CLAUDE.md「表示系ページ見出しの基準」表が古かった点を修正。**editorial v2 が全表示ヒーロー（`.p2-title-band__title`／`.pN-head__name`／`.p2-{n}-page-head__title`）を 700・負字間でカスケード後上書きしている実描画を正**とし、表を**2ティアに再構成**：**ティア①エディトリアル・ヒーロー/サブページ head＝700・負字間**（clamp 大型。p1-hero・p2-1〜4 サブページ head 含む）／**ティア②機能ページ・章・カード見出し＝600・正字間**（`.p10-search__title`〔検索ハブ・色帯ヒーロー無し〕・`.ktn-section__title` 1.1rem・カードタイトル .93rem）。**判断軸＝「色帯エディトリアル・ヒーローの主役か（①）／機能・情報の見出しか（②）」**。**コード変更なし**（実描画は既に v2＝この2ティアと一致。p1 hero=①700・p10 search head=②600 は競合でなく役割差）。**React**＝見出しトークンを `--heading-hero`（700/neg）と `--heading-func`（600/pos）の2種に集約し、650 等の中間値は作らない。

### 2026-07-09 P1 微修正5件（ポスター固定・日付タイポ・intro本文/番号・掲載導線）

**決定**（ユーザー指摘の p1 UI 微修正。いずれも見た目の統一で、方針変更ではない）：
- **Pick Up ポスターはサイズ固定＋cover** — スライドごとにポスター高が変わり最初のセクションがずれていた原因は `.p1-hero__inner{align-items:stretch}`＋`min-height` の組合せで、行高（＝可変長リードテキスト）がポスターを引き伸ばしていたこと。`.p1-hero__poster` を `height` 固定（desktop 400/mobile 230）＋`background-size:cover` に。**JS は背景を `.style.backgroundImage` で入れる**（`.style.background` ショートハンドだと CSS の `background-size` を消すため）。**React**＝ポスターは固定アスペクト枠＋`object-fit:cover`（img）または `background-size:cover`。行の伸縮に画像高を委ねない。
- **会期日付＝年小・日大（p1/p2 共通パターン）** — 日付は「YYYY.」部分を専用 span（`.p1-hero__dyear`／`.p2-title-band__dyear`＝.7rem muted）で包み、日（MM.DD）を DM Serif Display italic の大きめで見せる。p1 は Montserrat から DM Serif に寄せて p2 ヒーローと統一。**React**＝日付コンポーネントは `year`（弱）と `monthday`（強）を別要素で出力する共通 `<ExhibitionDate>` に。
- **intro 本文＝読み物スタイル・全幅** — `.p1-intro__desc` を `--fs`＋`--rt-*`（p2 `.p2-about__body` と同値）にし max-width:720 を撤去（下の3ボックス行と幅を揃える）。
- **3ボックス番号＝DM Serif 大型／モバイル崩れ修正** — `.p1-intro__point-num` を DM Serif Display italic 1.7rem accent に。≤540px の縦積み時に `flex:1 1 240px` の basis が縦240pxへ化けていたので `.p1-intro__point{flex:none}` を追加。
- **掲載希望ガイド導線** — intro CTA に `.ktn-guide-link`「展覧会の掲載を希望する方へ →」（`kotennavi-p70.html#for-sellers`＝p70「出展される方へ」）を追加。掲載＝出展の入口ガイドは p70 の該当セクションを正とする。

### 2026-07-09 P1/P10 底上げ提案 #2〜#4 実装（回遊・LIAISON主役化・CWV）

**背景**：ユーザーが「トップ（P1）と展覧会検索（P10）はリデザイン成功の鍵」として、目的（SEO/回遊/LIAISON/表示速度）に対する底上げ提案を要望。#2〜#4 を承認・実装。**#1（SEO）はSSR化のセッション管理懸念で実装せず＝助言のみ**（下記）。

- **#2 ゲスト位置情報「近くの展覧会」（P1・`.p1-nearby`）** — なぜゲスト限定か：ログインユーザーは既にパーソナルフィード（ウォッチ新着/興味あり！）で個別化されるが、**ゲストは個別化ゼロ**。位置情報だけはログイン不要で個別化でき、ログイン前から回遊を始められる。実装＝`navigator.geolocation` の**許可ダイアログのみ**使用し距離は静的 `dist` で近似（プロトタイプ）。**許可＝距離順／不許可・非対応＝人気順フォールバック**（理由をステータス文で明示＝許可を強制しない）。**React/本番**＝取得座標と会場座標から実距離を算出しソート。許可拒否時のフォールバックは人気/新着で必ず何か見せる（空にしない）。プライバシー上、位置は都度取得・保存しない方針を推奨。
- **#3 LIAISON を回遊の主役に** — なぜ「作品単位」か：LIAISON+ の価値は「会場に行けなくても**買える**」こと。展覧会カード（既存 LIAISON 棚）だけでは購入体験が伝わらないため、**価格つきの作品カード（p25c）を前に出す**「今オンラインで買える作品 Buy Online」棚を P10 に新設（`AWORKS` デモ＝作品配列。本番は LIAISON+ 出品作品APIから）。P1 ティッカーは LIAISON+ を**時間軸（開始/締切）に接続**＝「もうすぐ販売開始」「申込締切間近」で緊急性フックにする。プリセットレールに `liaison-plus`（購入可）を独立追加。**React/本番**＝Buy Online 棚のカードは各作品の p6-2（LIAISON+作品ページ）へリンク（プロトタイプは `#`）。締切文言は会期終了日・販売期間から算出。
- **#4 Core Web Vitals** — **レイアウトシフトは既に構造的に解決済み**：全メディアボックスが固定寸法予約（hero=height / ec=min-height / side-ec=52px / p25c=aspect-ratio 1/1 / thumb=72px）。現状グラデ背景で画像ロード無し＝CLS発生源が無い。**本番で実ラスター画像に差し替える際の必須指示**（プロトタイプでは実証不可）：①**ヒーローLCP画像**＝`<img fetchpriority="high" loading="eager" decoding="async">`（またはヒーローだけ `<link rel="preload" as="image">`）で最優先読込 ②**カード画像**＝`loading="lazy" decoding="async"` ＋ `width`/`height` 属性明示（or `aspect-ratio`）で予約ボックスを満たす（`object-fit:cover` 充填規則は common.css に用意済み `.p1-hero__poster img,.ec__poster img,.p2-side-ec__poster img,.p25c__img img`）。**オフスクリーン描画**＝`.ktn-cv-auto`（content-visibility:auto＋contain-intrinsic-size 460px）をファーストビュー外の棚に付与済み（P1 LIAISON帯／P10 下部4棚）。React でも同クラスを流用可。intrinsic-size は実測に合わせ調整推奨。
  - **全ページ横展開（2026-07-09）** — オフスクリーン描画最適化を P1/P10 以外へも展開。**HTML無改修・単一ソース**を選択：common.css の CWV ブロックにグループセレクタを追加し、**全表示ページ共通で下端に来る重いゾーン**（`.ktn-sub-rec` 関連レコメンド masonry / `.ktn-sub-tags` タグ帯 / `.ktn-footer`）へ `content-visibility:auto`＋`contain-intrinsic-size` を一括付与。各ページに `.ktn-cv-auto` を手で撒かない理由＝40ページへのクラス散布はゴミ増＋CSS共通化方針に反するため。**対象外＝(a) sticky 右カラム内の関連ゾーン（`.p2-side-nearby`/`.pN-side-rel-exh` 等）＝sticky 高さ計測に CV の遅延レイアウトが干渉し得る (b) fold 上に来やすい本文カードグリッド＝初回リフロー/フラッシュ回避**。これらの深掘り（中段グリッドやサイド関連の CV 化）は per-page で fold 位置を確認し目視検証が要るため保留。React 移行後は各セクションの実高さで intrinsic-size を再測、必要なら `contain:content` 単位で細分化。
- **#1 SEO（実装せず・助言）** — CSRのセッションを部分SSR化する際の**セッション管理が不確実**という懸念に対し、**SSRを避ける3案**を提示：(A)推奨＝Drupal が公開ルートにのみ `<head>`＋JSON-LD（Event/ItemList）＋`<noscript>` を出力し body は CSR のまま（**SEO対象は常に匿名の公開ビュー＝サーバは認証ビューを描かない→セッション混在問題が原理的に起きない**）／(B)ダイナミックレンダリング（bot にのみ prerender）／(C)有限なプリセットURLを Netlify で静的prerender。いずれも**セッションは100%クライアント維持**。採用時は本節に追記のこと。
  - **【採用＝A+】Bing・非JSクローラー対策（2026-07-09・ユーザー承認）** — 課題：案A（head＋JSON-LD 出力）は**JSを実行する Google 向けには有効だが、Bing は生HTMLの H1・本文を重視しJSレンダリングが非優先**のため body が空だと拾えない。SNSシェアスクレイパー（X/Facebook/Slack 等＝JS非実行）も同様。**対策＝案Aを拡張し、Drupal が公開ルートで `<head>`/JSON-LD に加え `<body>` 先頭にも「H1＋主要テキスト＋主要リンクの公開コンテンツshell」を実DOMで出力**する（`<noscript>` でなく実DOM＝Bingへの信号を強く）。React はそのshellの上に hydrate し通常CSRへ置換。**セッション非干渉の根拠＝SEO用に描くのは常に匿名の公開ビュー（展覧会名・説明文など"誰が見ても同じ公開データ"＝既に JSON-LD/meta で出している同一データ）で、サーバは認証ビューを一切描かない → セッションは100%クライアント維持で案Aと同一リスク**。副次効果：Google の JS レンダリング遅延キュー対策にもなり堅牢化。**実装時の注意**：①サーバー出力HTMLと React 初期描画を一致させ hydration mismatch のちらつきを防ぐ ②shell に出すのは公開・匿名データのみ（ユーザー固有・認証後データは絶対に入れない） ③データ源は Drupal が CMS として保持する公開コンテンツ。**無視案は不採用**（Bingシェアは小だが、出すデータが既に揃っており限界費用が低く、Bing＋SNS＋Google堅牢化を一括で取れるため）。

### 2026-07-10 p2-12/p2-12-1 モード切替＝ブロック見出し付与＋「申込あり時は LIAISON+ から切り替え不可」

- **モード切替帯にブロック見出し「モード切替」を付与**（ユーザー指示）：旧帯は「現在のモード：\[バッジ\]＋ボタン」の1行のみで、他ブロック（販売期間・展示作品）と違い**何を操作する場所か名前が無かった**。`.p2-12-mode-bar` を縦2段（`__title`＋`__row`）へ再構成し、見出しは他ブロック（`.p2-12-section-head__title`）と同値（.82rem/700/ゴシック＝機能見出し）。
- **LIAISON+ → LIAISON 切替は、出品作品に購入申込が1件以上ある間は不可**（ユーザー指示・業務ルール）：切替はLIAISON+の申込・キュー データを破棄するため、進行中の申込がある状態で実行させない。**UI＝切替ボタン押下後のモーダルで理由を説明し実行ボタンを disable**（押させない事前ガードでなく、押した後に「なぜできないか＋どうすれば切り替えられるか（コンソールで申込対応完了）」を説明する方式）。ブロック時は赤のデータ消失警告を隠しアンバーの説明ボックス（`.p2-12-modal__blocked`）に差し替え（実行不能なのに「失われます」警告を出す矛盾の回避）。恒常ルールとして notes にも「購入申込のある作品がある場合は切り替えできません」を明記。デモ判定＝レンダー済み作品リストの `.p2-121-lock-note__num`（申込中ロック行）の有無。**React/本番**＝出品作品の申込総数（S0申込済〜S5完了確認の進行中取引を含む）が0かをAPIで判定し、`disabled`＋blocked 表示を切替。逆方向（LIAISON→LIAISON+）は申込データが存在しないためガード不要。「LIAISON作品展示しない」（解除）も同じデータ破棄を伴うが、確定操作は p2-11 編集ページ側で行うためモーダルは従来どおり（解除側のガードは p2-11 実装時に同ルール適用を検討）。
- **デモ両状態切替（同日追記）**：p2-12-1 デモバーに「申込：あり（切替不可）/なし（切替可）」を追加（`p2121DemoApply`）。本番不要のデモ専用UI。
- **「展示しない」モーダルの文言正確化（同日・ユーザー指摘）**：旧文言（「LIAISON を解除しますか？」＋danger「編集ページへ」）は**この場で解除が実行されると誤認させた**が、実際の解除は p2-11 の LIAISON設定チェックを外して保存した時点でしか起きない。→ タイトル「LIAISON(+) の解除は編集ページで行います」＋「この画面では解除されません。…保存した時点で解除されます」に修正。データ消失警告も「解除して保存すると〜失われます」（保存時の帰結）へ。ボタンは遷移なので danger 塗り→通常 ok「編集ページを開く →」（v3 原則＝solid はその場実行専用・遷移は末尾→）。旧 notes の「編集ページで『使用しない』を選択」は p2-11 の実UI（参加チェックボックス・「使用しない」という選択肢は無い）と不一致だったのも是正。**React/本番**＝解除確定UIは p2-11 の保存に一本化（p2-12/p2-12-1 側は案内モーダルのみ）。保存時に申込あり時のガード（上記と同ルール）を適用すること。
- **LIAISONワード＝「利用する」軸で統一（同日・ユーザー確定）**：LIAISON は仕様書どおり「サービス」なので動詞は**利用**（旧「参加する」＝イベント的・「LIAISON作品展示しない」＝効果の記述で操作名として不正確、を両方廃止）。**canonical 文言**＝p2-11 チェックボックス「この展覧会で LIAISON を利用する」「この展覧会で LIAISON+ を利用する」／p2-12 ボタン「LIAISON の利用をやめる」／p2-12-1 ボタン「LIAISON+ の利用をやめる」（ページのモードに合わせる）／案内モーダル「LIAISON(+) の利用停止は編集ページで行います」。**今後 LIAISON の有効/無効に言及する新規UI・ガイド文言はこの「利用する/利用をやめる/利用停止」軸を使う**（参加・展示しない・解除は使わない。検討済み代替案：導入する＝「導入を解除」が硬い／有効・無効＝機能トグルとして明確だが管理画面的で温度が低い、で不採用）。
- **p2-11 LIAISON設定＝3択ラジオトグル化（同日・ユーザー指示）**：旧チェックボックス2個（LIAISON/LIAISON+ が独立 on/off）を廃止し、「**利用しない**／LIAISON を利用する／LIAISON+ を利用する」の**排他ラジオ**（`name=p211liaison`・value=none/liaison/plus）へ。理由＝(a)「利用しない」を明示的な選択肢にすることで未選択と区別でき、利用しないことが能動的にわかる（**新規作成のデフォルト＝利用しない**・`clearForm` のリセット先も none）(b) 展覧会のLIAISONモードは本来排他（p2-12系のモード切替モデルと同じ）で、チェックボックス2個は両方 on という不正状態を許していた。**React/Drupal**＝展覧会エンティティの liaison_mode は enum（none/liaison/plus）1フィールドで持つ。
- **LIAISON 利用の前提条件を選択肢内に注記（同日・ユーザー指示）**：`.p211-liaison-opt__req`（.72rem muted・※印＋`.ktn-guide-link`）。①**LIAISON+ は事前の利用申込・承認が必要**（クリエイター・ギャラリーとも各自の申込）→ LIAISON+ 選択肢に**ロール別文言を2バリアント併置**（`--creator`「クリエイターとして事前の利用申込と承認が必要」／`--gallery`「ギャラリーとして〜」）＋p11-4（LIAISON+利用申込）への参照リンク。表示切替はCSSのみ（`body.p4-page .p211-liaison-opt__req--creator{display:none}` と逆側）＝デモバーのロール切替（`syncMgmtBar` の p3-page/p4-page 付け外し）に自動追従。guest/admin は creator 版フォールバック。**React**＝ログインユーザーのロールで文言を出し分け（申込主体＝閲覧者自身であることを明示するための言い分け）。②**ギャラリーは出展クリエイターの取扱いクリエイター登録（p4-18）が事前に必要**（LIAISON/LIAISON+ 両方）→ 両選択肢に gallery ロール時のみ表示の注記（`.p211-liaison-opt__req--gallery`・`body:not(.p4-page){display:none}` ＝ `syncMgmtBar` のロール切替に自動追従・JS不要）。**React/本番**＝注記表示に加えバリデーションも必要：LIAISON+ 選択時に利用申込未承認なら選択不可（disabled＋申込導線）、gallery が保存時に未登録クリエイターの作品を展示できないガードはp2-12系/出展クリエイター設定側で判定。p6-11 の作品単位チェックボックス（この作品を LIAISON で展示/LIAISON+ で販売）は作品ごとの opt-in で別セマンティクスのため今回対象外（展覧会モードとの整合ガードは p6-11 実装深化時に検討）。
- **【バグ修正】common.js `renderBottomNav` に null ガード追加（同日）**：`#ktnBottomNavInner` を持たない管理ページで `inner.innerHTML` が TypeError を throw し、`_runPage`（ページモジュール実行前）と `setR`→`renderAll`（デモバーのロール切替）が途中で死んでいた。修正＝`if (!inner) return;` 1行。**これにより KTN.init を使う管理10ページ（p2-11/p6-11/p3-11/p3-12/p3-16/p4-16/p5-11〜13/p5-15）で `KTN.pages` モジュールが初めて実行される**ようになった（二重バインド・applyRole 非表示化の副作用なしを監査済み。p11-4/p4-18 は KTN.init 不使用＝影響なし）。**React/本番への示唆**＝共通レンダラーは対象DOMの有無をページ構成に依存させない（optional な領域は null-safe に）。ボトムナビは管理ページに存在しない構成が正（renderBottomNav 側が対応）。
- **LIAISON 前提条件のサービス原則を文言へ反映（同日・ユーザー明確化）**：canonical な原則＝(1) **クリエイターの LIAISON 利用に取扱リスト等の前提はない**（自分の作品のみ展示・作品は常時自分のクリエイターページにも公開可能）(2) **ギャラリーは真正性担保のため取扱作家リスト（p4-18）への登録＋管理者の承認が事前に必要**（LIAISON/LIAISON+ 共通・仕様書「ギャラリーの利用フロー」ステップ2）(3) **LIAISON の作品出品は無料**。LIAISON+ も出品はリエゾンと同原則（無料）で、**販売成立（決済完了）時のみシステム手数料**（料率はクリエイター・ギャラリー同率）(4) **LIAISON+ の利用申込（p11-4）の主体は出展者本人**（クリエイター展＝クリエイター／ギャラリー展＝ギャラリー）。**出展クリエイター各自に LIAISON+ 申込義務はない**（取扱承認済みなら出品はギャラリー単独登録＝仕様書「第2層：出品申告」）。これに伴う是正＝p2-11 注記（登録＋管理者承認を明記・「取扱作家リスト/取扱作家管理」へ表記統一）／p2-11 LIAISON+ desc（「LIAISON+ 申請済みのクリエイターの作品」→「出展クリエイターの作品」・「出品無料・販売成立時に販売手数料」）／p11-4 ギャラリー承諾事項 ga1（作家の申込確認→取扱作家リスト登録・承認の確認）・ga3（振込先クリエイター→**出品者＝ギャラリー**の登録口座・手数料差引後）。**React/ガイド文言の基準**＝今後 LIAISON 前提条件・手数料・振込に言及する UI はこの4原則に従う。※仕様書L766「振込手数料は個展なびが負担」と CLAUDE.md「振込手数料は利用者が負担」の食い違いは**「利用者負担」で確定（同日・ユーザー回答）**＝仕様書を是正し、UI 4箇所（p70 比較リスト／p70-2 Payout／p70-7 Stripe説明・FAQ）も「利用者負担」へ修正済み（p70-12 は元から正）。
- **用語統一＝「取扱いクリエイター」（同日・ユーザー指示・sitemap.md はユーザー修正済み）**：「取扱作家」系の呼称を全 UI で「取扱いクリエイター」へ統一（p4-18 タイトル/見出し/一覧/モーダル/トースト・p2-11 注記・p70/p70-1/p70-2 ガイド本文。リスト名＝「取扱いクリエイターリスト」・ページ名＝「取扱いクリエイター管理」）。仕様書内の「取扱作家リスト」表記と p11-4 は未変更（**p11-4 は仕様変更予定のため保留**＝ユーザー指示 2026-07-10）。管理者ページ P90-17（未作成）の名称は sitemap のまま。
- **LIAISON 作品のクリエイターページ常時公開をガイドに明記（同日・ユーザー指示）**：p70-1（作品出品ガイド）§4 展示期間と公開範囲の dl に「Your page」項を追加＝クリエイターが出品した作品は会期に関わらず自分のクリエイターページで常時公開できる（ポートフォリオ活用）。サービス原則(1)（前掲）の利用者向け訴求。

### 2026-07-10 【仕様変更】ギャラリーの LIAISON 利用フロー＝展覧会公開ベースへ（P4-18・P90-17 廃止）

**決定（ユーザー確定）**：ギャラリーの LIAISON/LIAISON+ 利用前提だった「取扱いクリエイターリスト登録（P4-18）＋管理者承認（P90-17）」を**廃止**し、**クリエイターと同一の展覧会公開ベースの有効化フロー**へ変更する。前エントリ（同日 2026-07-10「LIAISON 前提条件のサービス原則」原則(2)・p2-11 gallery 注記・p11-4 ga1・「取扱いクリエイター」用語統一のうち p4-18 関連）は**本決定で上書き**。

- **新フロー**：ギャラリー機能申込・承認 → 展覧会作成（P2-11 で LIAISON/LIAISON+ を選択）→ **管理者による展覧会確認**（出展クリエイターのページリンク付け。未登録②現役/③物故者/④権利移転はギャラリー入力情報から P90-7 でページ新規作成＝**従来から展覧会確認作業に含まれていた運用に自然吸収**）→ 公開 → P2 オーナーメニューで出品管理（p2-12/p2-12-1）が有効化。LIAISON+ の利用申込（p11-4）は別レイヤーで存続（creator/gallery 共通・出展者本人が申込）。
- **廃止理由（3点）**：①取扱リストは展覧会と独立した事前登録レイヤーで、ギャラリーの利用開始まで承認2回（リスト＋展覧会確認）を要し重かった ②真正性確認の実作業（出展クリエイターの本人性・作品の帰属確認）は**展覧会確認時に管理者が行うリンク付け・ページ作成作業と同一**であり、リスト承認は重複だった ③クリエイターとギャラリーでフローが非対称になり、ガイド・UI の説明コストが高かった。**「管理者承認必須」の根拠だった未登録クリエイターのページ作成は展覧会確認作業に吸収されるため、本変更は審査の緩和にはあたらない**。
- **存続＝出品時の本人通知のみ**：登録済みクリエイターの作品をギャラリーが出品登録した時点で当該クリエイターへ通知（旧「第1層取扱承認＋第2層48時間異議申立て付き出品申告」の2層構造は廃止・**48時間掲載保留なし**＝即掲載）。異議は既存の無断掲載報告フロー（仕様書 第11章）で対応。**React/Drupal**＝出品登録 API がクリエイターページ紐付きの作品を検知したら通知エンティティを生成（承認待ちステータスは持たない）。
- **真正性レベルバッジは初回バージョン非導入**（ユーザー決定）：理由＝初回は該当者（作家確認済み等）が少ない・バッジ有無で生まれる利用者メリットが想像できない。仕様書の「真正性レベルの表示」章に非導入決定として記録済み。将来導入する場合はバッジ設計システム（形状ボキャブラリー空き枠）に従う。
- **削除・変更の対応関係**：`kotennavi-p4-18.html` 削除／`KTN.pages['p4-18']`（pages.js）・PAGES 登録（common.js）・`.p418-*` CSS（common.css）削除／p2-11 注記＝「展覧会の公開後にオーナーメニューから出品・管理」「登録済みクリエイターへ通知」へ書換／p11-4 ga1・ga2＝展覧会確認・公開後の出品＋通知・真正性責任の承諾へ書換（ブロックタイトルも「取扱作家との関係」→「LIAISON+ の利用予定」）／p70・p70-1・p70-2＝gallery パス図の必須ステップ削除・出展フロー図に「個展なび（確認・公開）」ステップ追加・FAQ 書換／仕様書06＝利用フロー章全面改訂・第11章・影響表／sitemap＝P4-18・P90-17 取り消し線。管理ページは 17→16。
- **React/Drupal への示唆**：ギャラリーの出品可否判定は「取扱リスト承認済みか」ではなく「**当該展覧会が確認・公開済みか**」＋「出品作品がその展覧会の出展クリエイターの作品か」で行う。取扱リストのエンティティ・承認ワークフローは実装不要。

### 2026-07-11 p2-11：管理者確認済ゲート・注記整理（React/Drupal への示唆）

- **作品管理ページ（p2-12/p2-12-1）への導線の表示条件＝「管理者が展覧会を確認済」かつ「LIAISON/LIAISON+ を選択」の AND**。旧文言「展覧会の公開後」は誤りで、ゲートは公開ではなく**管理者確認**（2026-07-10 仕様変更の新フローと整合）。React 実装では展覧会エンティティの「管理者確認済」フラグ＋LIAISONプラン選択値の2条件で導線を制御する。
- **「確認済」状態の可視化**：確認済になると (a) ページ上部に緑バナー（管理者確認済—開催場所・出展クリエイターページのリンク設定完了）(b) 開催場所・出展クリエイター各ブロック内に設定済みリンク先への確認ノート、を表示。確認前はいずれも非表示＝「管理者の確認を待っている」ことがフォーム上で分かる。
- **通知文言の表示場所**：「登録済みクリエイターの作品を出品登録すると当該クリエイターへ通知」は**出品操作を行う p2-12/p2-12-1 に置くべき文言**であり p2-11（展覧会編集）からは削除（ユーザー指示。p2-12系への追加は次ラウンド・対ページ同時）。
- **LIAISON+ 利用申込注記のロール別出し分けを廃止**：「クリエイターとして／ギャラリーとして」の2バリアント（body クラス排他表示）は不要と確定。このページに到達できる時点で creator/gallery 登録済のため、ロール非依存の1行「事前の利用申込と承認が必要」に統一。React でもロール分岐は実装しない。
- **[hidden] ガードの教訓**：`display:flex`/`inline-flex` を持つコンポーネントは UA の `[hidden]{display:none}` が author 宣言に負けるため hidden 属性が無効化する。`.p211-mode-banner[hidden]` / `.p211-liaison-opt__link[hidden]` ガードを追加（p6-11 も同構造のため同時に修正された）。新規コンポーネントで display を宣言する場合は必ず `[hidden]` ガードを併設する。
- **デモJSの復元設計**：clearForm は DOM を破壊（remove）せず hide に留め、restoreDefaults が HTML の default 値（defaultValue/defaultChecked/defaultSelected）から復元する方式へ。デモ専用実装のため React には持ち込まない（React は状態がソースなので不要）。

### 2026-07-11 p2-11 ラウンド2：確認済ロック・ロール別会場default・保存前の関係者了承（React/Drupal への示唆）

- **管理者確認済後の開催場所・出展クリエイター変更＝問い合わせ経由（ユーザー確定）**：確認済状態では開催場所入力を disabled・両サブリンク（開催場所詳細/出展クリエイター情報）を `.is-locked`（pointer-events:none）でロックし、確認済ノートに「変更が必要な場合は お問い合わせ からご連絡ください」を明示。理由＝管理者が設定したページリンク（会場・クリエイター）が本人編集で壊れるのを防ぐ。React 実装では確認済フラグでこれらフィールドを read-only 化し問い合わせ導線を出す。開催スケジュール詳細はロック対象外（リンク付けと無関係のため本人編集可）。
- **開催場所の入力モデル**：gallery＝自ギャラリーが default（変更可）／creator＝default なし。入力方法は共通＝「過去の展覧会で入力した会場」候補（デモ＝datalist）から選択 or 新規テキスト入力。ヘルプ文言もロール別。React/Drupal＝会場は自由テキスト＋ユーザー毎の過去入力履歴をサジェスト（会場エンティティの正規化・リンク付けは管理者確認時の作業）。
- **出展クリエイターの入力モデル（仕様確定・UI実装は保留）**：creator＝自分が default（変更可）／gallery＝default なし。グループ展のため複数入力可。入力方法は会場と同じ（過去展の入力履歴から選択 or 新規入力）。UI はサブリンク押下後の機構（別ページ or アコーディオン・ユーザー判断待ち）内に実装する。
- **入場料の説明プレースホルダーは選択値に連動**：有料＝金額詳細の記入例／無料・なし＝自由案内文言（無料選択時に金額例を出すのは不整合というユーザー指摘）。撮影可の詳細プレースホルダーは SNS 拡散＋ハッシュタグ推奨文言（プロモーション効果の訴求）。子連れ選択肢は「可/不可」の2値（旧「歓迎」段階は廃止）。展覧会タイプから「2人展」削除。
- **保存前の確認＋関係者了承（現行システム踏襲・ユーザー「これは必要」）**：送信バー直前に注意書き3項目（保存後もオーナーメニューから編集可／管理者確認後に掲載・日数を要する場合あり／不備・重複・趣旨違反は予告なく修正削除あり）＋チェックボックス「個展なびで展覧会情報を公開することを、展覧会の関係者各位より了解を得ています。」を置き、**チェックするまで保存ボタンを disabled**。React＝consent は保存 API の必須パラメータではなくクライアント側ガード（現行システムと同じ）。文言はスクショ（現行システム）から新デザインの文体に合わせて調整済み。
- **モード別パンくず**：新規＝親展覧会なし（Top › 展覧会 › 新規展覧会を投稿）／編集・クローン＝対象展覧会を親に持つ（… › 展覧会名 › 展覧会を編集 / 展覧会をクローンで作成）。React＝ルーティング（/new・/:id/edit・/:id/clone）から自然に導出される構造。

### 2026-07-11 p2-11 ラウンド3：サブフォーム＝アコーディオン・スケジュール既定＋例外モデル・保存文言（React/Drupal への示唆）

- **サブフォーム（スケジュール詳細/開催場所詳細/出展クリエイター）＝別ページでなくインラインアコーディオン（ユーザー確定・現行システムのスクショ3枚を検討材料に決定）**：現行 Drupal は別画面往復＋「親フォームを保存するまで保存されません」の中間状態警告を持つ。新デザインは同一フォーム内の開閉パネルにし、**保存単位を親フォーム1回に一本化**（中間保存状態が存在しない）。React＝サブフォームは同一フォーム state の一部（別ルート・別エンティティ保存にしない）。
- **開催スケジュール詳細＝「既定＋例外日」モデルへ再設計**：現行の会期全日を並べる日別カレンダー表（約60行・別画面の主因）を廃止。既定の休み・開催時間はメインフォームが持ち、詳細には**既定と異なる日（時間変更/休館）のみ**を行追加で登録する。Drupal データモデル＝「既定スケジュール＋例外日コレクション」への変換が必要（日別レコード全展開は不要）。表示側（p2-1 スケジュールページ・p2 ヒーローの本日休み判定）は既定＋例外から日別を導出する。
- **出展クリエイター複数入力（ラウンド2で仕様確定済みのUI実装）**：掲載順リスト（並べ替え↑↓・削除）＋過去展の入力履歴サジェスト or 新規テキスト追加。掲載順がそのまま公開ページの表示順。メインフォーム側に現在の設定内容のサマリー行を常時表示（アコーディオンを開かなくても状態が見える）。確認済状態では開催場所・出展クリエイターのアコーディオンをロック＋強制クローズ（スケジュールは本人編集可のまま）。
- **送信ボタン文言＝「保存して確認依頼」（全モード共通・ユーザー指摘「公開する は正しくない」）**：保存しても管理者確認まで公開されないフローのため、ボタンは公開でなく「保存＋確認依頼」を表す。公開設定の説明文も「管理者の確認完了後、すぐに/指定日時に公開」へ整合。React＝保存 API の結果は「確認待ち」状態であり、公開 state への直接遷移は管理者のみ。
- **保存確認＝軽量サマリーモーダル（項目10・ユーザー「提案通りに」）**：フル確認画面（現行システム型）は採らず、送信時に主要6項目（展覧会名/会期/開催場所/出展クリエイター/LIAISON/公開設定）だけをモーダル表示→「この内容で保存する」で確定。理由＝1ページフォームで元画面が背後に見えており、全項目の複写画面は冗長。未入力項目は「未入力」表示で保存自体は妨げない（必須バリデーションは別レイヤー）。

### 2026-07-11 p2-11 ラウンド4：例外スケジュール＝期間×曜日モデル・新規会場/クリエイターの詳細項目・必須チェック（React/Drupal への示唆）

- **スケジュール例外＝「期間×曜日×区分」の1行モデル（ユーザー課題「長会期の夏季休業・年末年始・週末だけ延長は単日行だと入力が面倒」への提案）**：例外行を `開始日〜終了日（任意）＋対象曜日（全曜日/土・日/土日祝/平日/単一曜日）＋区分（時間変更/臨時休業）＋時刻レンジ` に拡張。単日＝開始日のみ、連休＝期間×全曜日×休業、週末延長＝会期期間×土日祝×時間変更が各1行で表せる。臨時休業選択時は時刻入力を無効化。**Drupal データモデル＝例外ルールのコレクション（from/to/dayFilter/kind/timeRange）**。表示側（p2-1 カレンダー・p2 の本日休み判定）は「既定（定休・開催時間）→例外ルールを日付順に適用」で日別状態を導出。ルール同士が重なる場合は後勝ち（リスト下が優先）を想定。
- **新規開催場所の詳細項目（現行システム準拠・ユーザー提供リスト）**：場所名（メインフォーム）＋読み（カナ）／住所（郵便番号・都道府県・市区町村以下）／最寄り駅・アクセス／電話番号／メールアドレス／ウェブサイトURL／地図URL／利用案内・その他情報。**候補（登録済み会場）選択時は入力不要**＝会場エンティティの既存データを使用し、新規会場のみこの入力から管理者確認時に開催場所ページを作成。
- **新規出展クリエイターの詳細項目（現行システム準拠）**：候補（個展なび登録済み）に無い名前を追加した時のみ、その行に「新規」バッジ＋詳細フォーム（読みカナ／作品ジャンル・カテゴリー／プロフィール／URL／その他情報）を展開。入力内容は管理者確認時のクリエイターページ新規作成の元データ。React＝artist エントリを `{registeredId | newCreatorDraft}` のユニオンで持つ想定。
- **必須チェックはサマリーモーダル表示前にクライアント側で実施（ユーザー質問「後工程の仕事？」への回答＝両方）**：デモに汎用チェック（必須マーク付きフィールド走査→未入力は赤ハイライト＋スクロール＋トースト・モーダルを開かない）を実装済み。**形式バリデーション（カナ・URL・郵便番号等）とサーバー側再検証は後工程（React/Drupal）**。必須の定義はラベルの必須マークと1対1（＝UIとバリデーションの単一ソース）。
- **お問合せ先＝複数行**（メール・電話・受付時間など複数手段の記載を想定し textarea）。保存前確認の注意文は「保存」表記へ統一・簡潔化（意味は不変・文言は本ページの presave ブロックが正）。

### 2026-07-11 p2-11 ラウンド5：例外行の2種分離・候補への識別情報併記・登録済みエンティティの修正入力

- **スケジュール例外＝「臨時休業」行と「開催時間の変更」行の2種類に分離（ラウンド4の区分select方式を撤回）**：区分selectを行内に持つ統合行は「臨時休業なのに曜日指定・時刻入力がある」矛盾を生む（ユーザー指摘・分離案もユーザー提案）。休業行＝`from〜to（toは任意）` のみ／時間変更行＝`from〜to＋曜日フィルタ＋時刻レンジ`。**Drupal データモデルも2コレクションに分ける**（closedPeriods: {from,to} ／ hoursOverrides: {from,to,dayFilter,timeRange}）。毎週の定休日は既定（メインフォームの「休み」）が持ち、例外には入れない。日別導出は「既定→hoursOverrides→closedPeriods」の順に適用（休業が最優先）。
- **候補選択肢に識別用サブテキストを併記（現行システム準拠・同名誤選択防止）**：開催場所候補＝**住所**を同行表示／出展クリエイター候補＝**作品ジャンル・カテゴリー**を同行表示。デモは datalist `option[label]` で近似（label の表示はブラウザ依存）。**React 実装ではネイティブ datalist でなく自前のオートコンプリート（名前＋サブテキストの2段表示）にすること**。
- **登録済みエンティティ（会場・クリエイター）でも修正・追記を入力可能に**：候補から選択した場合も、住所変更・プロフィール修正などがあれば新規と同じ詳細フォームに記入できる（会場＝アコーディオン常時入力可／クリエイター＝「詳細」ボタンを新規行だけでなく全行に表示・案内文を新規/登録済みで出し分け）。**反映フローは「管理者が確認時に対象ページを作成または編集」**＝新規なら作成、既存（他ユーザーが登録したページを含む）なら編集。ユーザーの入力が直接ページを書き換えるのではなく、管理者確認を経た反映である点は会場・クリエイター共通。

### 2026-07-11 p2-11 ラウンド6：開催スケジュール入力の完全構造化（フリーテキスト廃止・カレンダー導出可能に）

- **背景（ユーザー指摘）**：「休み」「その他の開催時間」がフリーテキストだと、システムが内容を p2/p2-1 のカレンダー表示（p2-1 曜日チップ＋日別カレンダー・p2 ヒーローの「本日休み」判定）に落とし込めない。現行システムも定休日のカレンダー設定がしにくい。
- **確定データモデル（展覧会スケジュール）**：以下4要素＋ラウンド5の例外2コレクションで、日別カレンダーを完全に機械導出できる。
  1. `term`：開催期間 from/to（date）
  2. `closedDays`：休みの配列（**mon〜sun＋hol（祝日）の8値・チェックボックスピルで同列選択**）。※当初「祝日の扱い」を別の方針select（曜日どおり/開催/休み）で持つ案を実装したが、**祝日運用のバリエーションは多数（祝日は開けて翌日休み等）で方針列挙では表現しきれない**とのユーザー指摘で廃止。「毎週の祝日を休みにするか」だけを同列フラグで持ち、変則対応は例外行に委ねる（2026-07-11 確定）
  3. `baseHours`：基本開催時間 open/close（time）
  4. `scheduleNote`：**表示専用**の補足テキスト（例「入場は閉場の30分前まで」）。カレンダー導出には使わない＝構造化データと表示文の役割分離
  - 例外（ラウンド5）：`closedPeriods {from,to}` ／ `hoursOverrides {from,to,dayFilter,timeRange}`
- **日別導出ロジック（表示側・React/Drupal）**：各日について ①`closedDays`（曜日一致 or 祝日∧hol選択）で open/closed の既定を決定 → ②`hoursOverrides` を上から適用（後勝ち・**定休に当たる日に時間変更を登録すればその日は「開催」に上書きできる**＝祝日にあたる定休曜日だけ開ける等の変則はこれで表現）→ ③`closedPeriods` に該当すれば休業（最優先）。p2-1 の曜日チップ行（日〜土＋祝）＝`closedDays` の直接表示、「初日13:00開廊／最終日17:00閉廊」等＝`hoursOverrides` から生成。**「祝日は通常通り開廊」のような祝日方針の注記文言は表示側からも廃止**（p2 スケジュールカード・p2-1 開催時間ノートから削除済み。祝チップの open/closed 表示が担う）。
- **「その他の開催時間」フリーテキスト欄は廃止**：旧デモ内容（平日/土日祝の時間差・最終日早終い）は `hoursOverrides`（期間×曜日×時刻）で表現できるため。自由記述を残すと構造化データと二重管理・矛盾の温床になる。
- **バグ修正**：`.p211-pill-group` のピル active 切替をラベル click から input `change` 同期へ変更（チェックボックス解除で is-active が外れないバグの解消・radio/checkbox 共通化）。

### 2026-07-11 p2-11 ラウンド7：イベント・在廊の入力設計（p2-1 日別カレンダーのバッジ導出）

- **背景（相談→方針合意）**：p2-1 の日別カレンダーは在廊・イベントバッジ付きの詳細表示だが、「PC不慣れな一般ユーザーの入力から現実的に導出できるか」がユーザーの懸念。在廊＝直前まで不確定・複数クリエイターの個別スケジュールあり／イベント＝場所・時間のバリエーション多岐・会期と無関係なイベントもある。**原則「カレンダーにウソをつかせない」＝事前確定できる構造化データのみカレンダー導出に使い、不確定・可変情報は表示専用テキストに逃がす。**
- **イベント＝独立エンティティとして構造化（カレンダー連動は日付のみ）**：`{date?, type(トーク/ワークショップ/レセプション/その他), title, timeText, place?(未入力=展覧会の会場), creator?(担当・単一・出展クリエイターから選択/空=展覧会全体), url?, desc?}`
  - **カレンダーバッジの判定は `date` が会期内かだけ**。会期外・日付未定のイベントはイベント一覧にのみ表示（p2-1 カレンダーには出さない）。
  - **`timeText` はフリーテキスト・表示専用**：ワークショップの複数セッション（例「①11:00〜 ②14:00〜 ③16:00〜（各回60分）」）を構造化しない。カレンダーは日付しか使わないため時間の構造化は不要（ユーザー追加情報 2026-07-11 への対応）。
  - **クリエイター別開催**＝イベントを分けて登録し `creator` を指定（1イベント1担当。複数担当の合同イベントは空＝展覧会全体で表現）。
- **在廊＝ゆるい任意行（構造化はするが「予定」扱い）**：`{creator(フリーテキスト), from, to?, dayFilter?, memo?}` の行型。カレンダーバッジ＝いずれかの行にマッチする日に表示。`memo` は表示専用フリーテキスト（例「午後のみ」）。**入力は完全任意**・表示側は免責「※在廊日程は変更になる場合があります」を維持し、リアルタイムの正確性はSNS等に委ねる（入力UIでは解決しない問題と整理）。
  - **在廊のクリエイター名はフリーテキスト入力（ユーザー指示 2026-07-11）**：名前の選択肢を出せない場合があるため（出展クリエイターとして登録されていない在廊者等）、select ではなくテキスト入力とする。イベントの「担当クリエイター」select は「—（展覧会全体）」フォールバックがあるため select のまま維持。
- **用語統一：「作家在廊」→「クリエイター在廊」（ユーザー指示 2026-07-11）**：p2-1 セクション見出し「クリエイター在廊予定 Creator Attendance」・日別カレンダーのバッジ「クリエイター在廊」（pages.js）・p2-11 サブリンク「クリエイター在廊予定を入力する」。サイト用語＝クリエイターに揃える（あわせて pages.js の文字化け「休廀/在廀」→「廊」を修正）。
- **曜日フィルターの選択肢名「全曜日」→「全日」（ユーザー指示 2026-07-11）**：`EXC_DAY_OPTS`（時間変更行・在廊行で共通の選択肢セット）と静的 select 全箇所をリネーム（value="all" は不変）。同義の選択肢を2つ並べず単一ソースを維持。
- **React 変換メモ**：イベントの追加行の担当クリエイター select は**追加時点の artistList から静的生成**しており後の増減に追従しない。本番は出展クリエイター state と連動した controlled select にする。イベントカードUI＝`.p211-event-item`（common.css）、在廊行＝`.p211-exc-row` 再利用。

### 2026-07-11 p2-11 整合性チェック（p2〜p2-5-1 表示系との突合）の確定事項

- **表示系にあるが p2-11 入力に無い項目の出所（ユーザー確定）**：
  - **Wi-Fi**：現行どこにも入力が無い。**p4-11（ギャラリー編集ページ・未作成）に追加する**。展覧会フォーム（p2-11）には持たせない。
  - **バリアフリー・駐車場・支払方法**（p2-2 施設情報）：**p4-11（＝p4 表示のデータ）からのシステム導出**。展覧会側で入力しない。
  - **クレジット項目**（主催・企画・協力等の個別欄）：p2-11 の「主催・協賛・協力など」自由記述で吸収（個別フィールド化しない）。
  - **クリエイター英語名・個人タグ**（p2-4 表示）：**p3 側（クリエイターページ）のデータ由来**。展覧会フォームで入力しない。
  - **周辺スポット**（p2-2）：**運営データを想定・具体的な仕様は未定**。ユーザー入力ではない。
- **販売期間（LIAISON+）の表示**：p2-5-1 に販売期間の明示表示が無いのは現状のデザイン判断。p2-11 の LIAISON 設定にも販売期間入力は無い（「実際の展示と同じ期間」の説明は**展示公開**についてのみ）。後工程で販売期間の表示/入力を設ける場合は別途設計が必要（誤って「入力済み」と判断しないこと）。
- **p2-5／p2-5-1 のデモの関係**：同一展覧会の**排他モード別デモバリアント**（p2-5＝creator 出品の LIAISON／p2-5-1＝gallery 出品の LIAISON+）。ポスター・投稿者・作品構成の差異は意図的なもので、データ不整合ではない。
- **p2 のレビュー・スライダーの正**：canonical は `kotennavi-pages.js` の `KTN.pages['p2']`（レビュー4件＋LIMIT3＋トグル）。p2.html 末尾のインラインスクリプトは **KTN 非依存のフォールバック**（`children.length>0` ガードで二重生成を防止・レビュー3件と意図的に別データ）。React 変換時は pages.js 側だけを移植すればよい（インラインは捨てる）。スライダーは両者が共有の `window.P2_SLIDES` を参照。
- **デモデータ不整合の扱い（ユーザー方針）**：後工程が誤判断しないものは修正不要（レビュー点数・山田蒿/山田葵等の名前ゆれ・投稿者表記ゆれは残置）。誤判断リスクのあるもの（曜日バグ tue→wed・休廊表記「月曜休廊」→「月〜水曜休廊」）は修正済み。
- **用語ポリシー（ユーザー確定）**：サイト側の文言＝「クリエイター」に統一／**ユーザー入力を模したデモコンテンツ（記事リード・展覧会説明・レビュー本文・イベントタイトル値等）は「作家」残置OK**／meta description は検索を意識し、より一般的な検索ワードとして**「アーティスト」**を使用（p2-4 の description・og:description・JSON-LD jobTitle を「油彩・現代美術アーティスト」へ変更）。
- **タグの統一**：p2 系 7 ページ（p2/p2-1/p2-2/p2-3/p2-4/p2-5/p2-5-1）の `.ktn-sub-tags` を **8 種の和集合（絵画/現代美術/油彩/オノマトペ/言語/東京/渋谷/個展）**に統一。同一展覧会のタグはページ間で一致させる（href＝`tag=X`、地域のみ `area=tokyo`/`area=shibuya`）。React＝タグは展覧会エンティティの単一配列から全下層ページへ供給。

### 2026-07-12 p2-11 入力UX改善（2層構造・効果の見える化・下書き保存）

- **背景（ユーザー課題）**：展覧会入力は項目が多い。詳細入力は閲覧者への事前情報・興味喚起・差別化になる一方、PC不慣れなギャラリー/アーティストが多く展覧会前は多忙のため、途中で諦める人がいる。両立策として ①2層構造 ②効果の見える化 ③下書き保存 を採用（モード切替＝二重UI・ウィザード＝1ページフォーム方針と矛盾のため不採用）。
- **①2層構造＝「必須コアは常時表示・任意は折りたたみ」**：既存のサブリンク＋アコーディオン機構（`.p211-sub-link`＋`.p211-acc-panel`）を再利用し、任意項目を4つの新設アコーディオンへ移動（タグ・英語タイトル／関連イベント・主催・ウェブリンク等／サブ画像／会場利用案内）。既存5アコーディオン（スケジュール詳細・イベント・在廊・開催場所・出展クリエイター）と合わせ計9パネル。
  - **必須項目をアコーディオン内に置かないルール**：お問合せ先*（必須）は畳みに入れず展覧会説明の直後へ移動。必須が隠れると未入力に気づけないため。React でも「required フィールドは collapsed パネルに置かない」を維持すること。
  - **LIAISON ブロックは常時表示のまま**（畳まない）：新サービスの発見性を優先（サービス導入がプロジェクトのゴールのため）。
  - 冒頭案内文（mgmt-head 2文目）＝「* の必須項目だけで公開できます（入力の目安：約5分）」で心理的ハードルを下げる。
- **②効果の見える化**：
  - 各サブリンクに**ベネフィット1行**（`.p211-sub-link__benefit`・flex-basis:100% の2行目）＝入力すると何が起きるかを来場効果ベースで説明。
  - **「✓ 入力あり」チップ**（`.p211-sub-link__state`・緑 #1a7a3d＝aws-sale 系の deep green）＝親要素の `has-input` クラスで表示。アコーディオンは既定で閉じたまま、チップが入力済み状態を代弁（自動で開かない）。
  - **充実度メーター**（`#p211OptProgress`・送信バー内「追加項目の入力 n / 9」）。
  - 判定＝`panelFilled(panel)`：パネル内の入力値・checked・選択済 select・可視タグ・可視アップロード画像を走査（`display:none` の行＝デモ非破壊リセットで隠した静的行は除外）。出展クリエイターのみ `artistList.length > 0` のカスタム判定。**React ではDOM走査でなくフォーム state から各グループの filled を導出する**（同じ判定仕様のセレクタ→stateマッピング）。更新は `.ktn-mgmt-wrap` への delegated listener（input/change/click/keyup）＋rAF スロットル。
- **③下書き保存**：送信バーに「下書き保存」ボタン（プレーン `ktn-op-btn`・サイトには公開されない旨の title）。保存があるとボックス上部に通知バー `.p211-draft-notice`（保存日時＋破棄する）。
  - **開いた時点で自動復元（2026-07-12 改訂・手動「復元する」ボタン廃止）**：初版は通知バーに「復元する」ボタンを置き手動で書き戻す方式だったが、ユーザー指摘「下書きを開いたら当然続きが出るべき／手動復元は不要」を受けて**ページ読込時に下書きがあれば自動で `restoreDraft()`**（`if(readDraft()) restoreDraft(); else showDraftNotice()`）に変更。通知バーは告知＋破棄のみ（文言「下書きから復元しました（{日時}）」）。**判断＝1展覧会＝1下書きで、開くたびに読み込むべき対象が一意に定まるため、手動確認は不要**。手動復元が要るのは「現在の入力を古い下書きで上書きしたくない（複数下書き併存）」ケースだが本フォームでは起きない。真っさらから入れ直したい稀なケースは「破棄する」でカバー。**React化時**＝マウント時にサーバー下書きがあれば自動ロード。競合（別端末で新しい版）検出時のみ選択UIを出す、を本番の上位仕様とする。
  - **デモ実装＝localStorage**（key `ktn-p211-draft`）：静的フィールドをDOM順でシリアライズ＋動的追加行はリスト別の本数を保存し復元時に行を再生成してから値を書き戻す（index ずれ防止）＋可視タグテキスト＋artistList＋モード＋ISO日時。アーティスト詳細フォーム内の input は除外（値は artistList が正）。
  - **本番＝Drupal 側の下書き保存API（サーバーサイド）を推奨**：localStorage は端末・ブラウザ依存で消失リスクがあり、複数端末・複数人運用（ギャラリースタッフ）に耐えない。Drupal の未公開リビジョン/draft state に対応させ、通知バー＋復元/破棄の UI 構造（`.p211-draft-notice`）はそのまま流用可。
  - タグは `addTagSpan()` で `is-added` クラス付きで生成し、clearForm/restoreDefaults が `.p211-tag.is-added` を除去（追加行と同じ非破壊リセット規約に統合）。
- **React コンポーネント対応**：`.p211-sub-link__benefit`／`__state`（has-input 連動チップ）／`.p211-draft-notice`／`.p211-submit-bar__progress` を p2-11 フォームコンポーネントの一部として移植。メーター母数（9）は任意グループ数から動的に。

### 2026-07-12 作者軸の追加（creator/gallery 共通化・真正性担保）

- **背景（相談）**：ギャラリーのリエゾン/リエゾン+ 出品と作品管理。ギャラリーは作品を展覧会に出品できるが、**ギャラリーページには公開表示されない**（在庫管理用）。作品が常時公開されない以外は creator/gallery なるべく共通にしたい。作者は creator＝自分固定／gallery＝誰の作品かを意識する必要がある。対象＝①p2-12/p2-12-1（出品管理・従来クリエイター非意識）②p4-14（インベントリー・未作成）③p6-11（作品新規/編集/クローン・作者欄なし）。
- **ユーザー確定方針（3問への回答）**：
  1. **フリーテキスト入力は不可**＝登録済みクリエイターのみ選択可（未登録作家の作品は登録できない）。
  2. **出展クリエイター外の出品はブロック**＝警告でなく操作不可。
  3. **作者は creator/gallery 両方とも常時表示**・UIをなるべく合わせる。
- **決定の理由（コードに残らない判断＝7章相当）**：ギャラリーがサイト内で作品を扱うこと自体が**取り扱う作品の真正性の担保**という位置づけ。「登録済みクリエイターの作品を、その出展クリエイターとして出品する」という縛りが真正性の根拠。**既にシステム的に完全な保証ではない**（本人性の完全な検証はできない）が、フリーテキストや出展外作者を許すと**真正性が完全に失われる**ため、緩めずに「登録のみ＋出展外ブロック」で厳格運用する。＝この厳格さは実装の都合ではなく**サービスの真正性ポリシー**なので、後工程で緩めない。
- **実装（デモ）**：
  - **p6-11**＝作者ブロック。creator＝本人固定表示（`.p611-author--fixed`）／gallery＝登録クリエイター select（`.p611-author--select`＋真正性ヘルプ文）。`window.p611RoleSync()` を pages.js の p6-11 `syncMgmtBar()` から呼びロールで hidden 切替（p2-11 の `window.p211RoleSync` と同型）。
  - **p2-12/p2-12-1**＝作者常時表示（作品カード `.p2-12-work-card__author`／候補カード `.p2-12-candidate-card__author`）。`EXH_ARTISTS`（この展覧会の確認済み出展クリエイター）＋`isAllowedAuthor()` で判定。**追記（同日フォローアップ・下記参照）：当初の「出展外をグレー表示（`.is-blocked`）」はユーザー指摘で撤回→候補から完全除外＋出展クリエイターを明示表示＋追加パネル文言をロール別化。**
  - **p4-14（新規作成）**＝ギャラリーの作品在庫管理。Model B（`.ktn-mgmt-wrap.ktn-mgmt-stack`）/760px/`mgmt-page p4-page`/gallery identity strip。**作者常時表示＋作者フィルタ**（複数作家を束ねるギャラリー固有の軸＝クリエイター版には無い）＋出品状況フィルタ（出品中/未出品）＋出品中の展覧会チップ（LIAISON/+）＋販売状態（`.aws-*`）＋編集/新規作品→p6-11。**非公開の注記**（インベントリーはギャラリーページに非公開）＋**真正性の注記**（登録済みクリエイターのみ作者指定可）。CSS `.p414-*`・`KTN.pages['p4-14']`・パンくずは common.js に登録済み（p4-14/p4-17 の名称ズレも是正）。
- **作者データモデル → React/Drupal**：
  - **作者＝作品エンティティの必須リレーション（クリエイターへの参照）**。フリーテキスト名は持たない（union だが「登録済みクリエイター参照のみ」に制約）。
  - **入力UI＝登録済みクリエイターの検索付きオートコンプリート select**（デモの単純 select を本番は検索対応に）。creator ロールは自分に固定（select 非表示）、gallery ロールは自分が取り扱い可能なクリエイターから選択。
  - **選択必須＋出展外ブロックはサーバーサイドで強制**（クライアントのブロックは UX 補助）。出品時に「作者が当該展覧会の確認済み出展クリエイターか」を Drupal 側で検証し、外れる場合は 422 等で拒否。真正性ポリシーのため緩めない。
  - **ギャラリーが指定できるクリエイターの範囲**＝ギャラリーの取扱クリエイター関係（招待・承認を経た関係。旧 p4-18 取扱作家管理が担っていた領域＝2026-07-10 に別途仕様変更で廃止済みのため、関係の持ち方は後工程で再設計）。デモの select 選択肢は仮データ。
  - **インベントリー（p4-14）の非公開**＝作品エンティティは「ギャラリー所有・在庫」状態と「展覧会に出品され公開」状態を区別。ギャラリーページ（p4）には作品を列挙しない（creator の p3 とはここが非対称＝creator は自作を公開、gallery は在庫を非公開）。
- **フォローアップ（同 2026-07-12・p2-12/p2-12-1 の候補UI改訂）**：ユーザー指摘2点で上記②の見せ方を改訂。
  1. **出展外は「グレー表示」でなく「候補から完全除外」**：`renderCandGrid` 冒頭で `if(!isAllowedAuthor(w))return`。ブロック（`.is-blocked`）・`__blocked` バッジのCSS/HTML/JSは廃止。理由＝出品できない作品を候補に並べても操作の邪魔になるだけで、除外の方が親切。**サーバーサイドの出展外ブロック（真正性ポリシー）は不変**＝これは候補リストの見せ方のみの変更。
  2. **「この展覧会の出展クリエイター」を追加パネル上部に明示**（`.p2-12-exh-artists`／`#p212ExhArtists`）＝誰の作品を出品できるかを先に示す。creator/gallery **共通表示**。creator ロールのみ本人に「あなた」マーカー（`SELF_CREATOR`）。
  3. **追加パネル文言をロール別化**（`renderAddTexts()`）：gallery＝「出展クリエイターの…」／creator＝「あなたの…」。デモバー creator/gallery 切替に追従させるため `window.ktnRender` を **チェーン**（`_prevRender` を退避して呼び足す）＝ヘッダー再描画に相乗り。本番（React）はロール state から出し分け・チェーン不要。

### 2026-07-12 新規作品の作成動線の統一（作者を p6-11 到達前に確定・相談→承認）

- **背景（相談）**：ギャラリーの作品新規作成動線は2系統ある——①p2-12/p2-12-1（出品時に新規）②p4-14 インベントリー管理から新規。ユーザーから5点の論点提示。
- **芯（コア原則・承認済み）**：**p6-11 はフリーテキストも新規クリエイターも一切受け取らない。作者は p6-11 到達前に、閉じたリストから必ず確定する。** 作者の出所は3通り＝(a) creator 本人＝自分固定、(b) gallery×展覧会（p2-12/p2-12-1）＝その展覧会の出展クリエイターから選択、(c) gallery×在庫（p4-14）＝取扱クリエイタープールから選択。
- **5論点への回答**：
  1. **p4-14 から任意クリエイター作成は不可**＝取扱プール（導出）に限定。
  2. **ギャラリーにクリエイターを新規に生成させない**＝任意作者入力を認めると管理者のクリエイターページ作成・紐付けという追加作業が発生する。作者を既存 identity 参照に閉じることでこれを防ぐ。
  3. **過去作家の作品を先行アップする用途は「あり」だがスコープ限定**＝「先行ストック」（展覧会に出す前の在庫作成）としてのみ。任意作家への拡大はしない。
  4. **creator/gallery の非対称は許容する**＝creator は identity のオーナーなので自作を自由に新規作成できる（p3-14＝未作成）／gallery は既存 identity を参照する custodian（管理者・受託者）で、参照先が既存クリエイターに限られる。この非対称は権限モデルの正しい反映として受け入れる。
  5. **p2-12/p2-12-1 の新規は作者選択を先に行い、p6-11 到達時に作者固定**＝論点2の問題（作者未確定のまま p6-11 に入ると任意入力の余地が残る）を構造的に排除。
- **ギャラリーの「取扱クリエイタープール」は導出（新テーブルを作らない）**：p4-18（取扱作家管理）が2026-07-10に廃止済みのため、専用の関係テーブルは持たない。プール＝**そのギャラリーの各展覧会の出展クリエイターの和集合**として導出する。デモでは在庫（`WORKS`）に登場する作者の distinct を仮の導出プールとして使用。
- **保留（ユーザー明示）**：**本人登録／招待フローは保留**。「ギャラリーが未登録作家を招待して登録済みにする」経路は今回作らない。プールが空（＝出展クリエイターがまだいない）の場合は作成不可にして「まず展覧会を作る」へ誘導するに留める。
- **実装（デモ）**：
  - **p6-11 の作者受け取り＝URLパラメータ契約**：`?author=<key>`（作者を強制固定）／`?self=1`（本人＝creator 用の注記）／`?role=gallery`（ロールを gallery に）／`?mode=new`（新規モード・フォームクリア）。`P611_AUTHORS` マップ（key→表示名）＋`window.p611RoleSync`＋`applyEntryParams` IIFE（`role=gallery` なら `setR`、`mode=new` なら `setDemoMode('new')`、最後に `p611RoleSync()` を明示呼び）。作者 key は tanaka/sato/suzuki/ito/takahashi/ohno（＋p4-14 検索プール拡張分）。
  - **【2026-07-20 是正】p6-11 内の gallery 作者 `<select>` を撤去＝作者ブロックは常に固定表示 `#p611AuthorFixed` 1本**：入口が p4-14/p2-12/p2-12-1 の3つだけで**いずれも作者確定済みで遷移する**ため、「作者未確定で gallery が直接入店」という select 表示状態は実際には起こらない死にUIだった。`p611RoleSync` は `?author` があればその名を、無い直接入店（デモのロール切替のみ）は creator=本人（田中 透）／gallery=デモ既定作者（`P611_GALLERY_DEFAULT_AUTHOR='takahashi'`）を固定表示に populate。**p6-11 内で作者を選ぶ手段が UI から消え、コア原則が UI からも保証される**。作者ラベルの `必須` マーカーも撤去（常にシステム確定＝空になり得ないため）。削除物＝HTML `#p611AuthorSelect`／CSS `.p611-author--select`・`.p611-author__sel`。
  - **p2-12/p2-12-1 の新規ボタン**（`#p212NewBtn`）：`bindNewBtn()`＝出展クリエイターが1人なら `newWorkUrl()` で即遷移、複数なら動的ピッカー（`.p2-12-new-picker`）をトグル。`newWorkUrl(artist)` が `?mode=new&author=<key>` に加え gallery なら `&role=gallery`、creator 本人なら `&self=1` を付す。デモは出展クリエイターが 田中 透 1人のためピッカーは休眠。
  - **p4-14 の新規ボタン**（`#p414NewBtn`＝`<a>`から`<button>`へ）：在庫作者から導出した `POOL`（distinct）でピッカーモーダル `#p414Picker` を開く。選択で `?mode=new&role=gallery&author=<key>` へ遷移。**プールが空なら button を disabled＋「まず展覧会を作成し、出展クリエイターを確定してください」title**（保留した招待フローの代替導線）。編集リンクも `?role=gallery&author=<key>` を付与。モーダルは `.ktn-mgmt-wrap` の**外**（stack 子の inset がオーバーレイを縮めるのを回避）。CSS＝`.p414-picker*`（上端 page-accent ライン・作者選択 opt）。作者名→key は `AUTHOR_KEY` マップ。
- **React/Drupal への含意**：
  - **作者確定は p6-11（作品エディタ）の外＝呼び出し側の責務**。エディタは「確定済み作者」を props/route param で受け取り、内部では作者を**表示のみ**（変更・選択・新規生成しない）。**作者選択UIは入口（p4-14 ピッカー／p2-12 ピッカー）に置き、p6-11 内には置かない**（2026-07-20 是正：以前「呼び出しコンテキストごとに select を置く」としていたが、入口が全て作者確定済みのため p6-11 内の select は不要＝固定表示に一本化した）。
  - **取扱プールはサーバー側で「ギャラリーの全展覧会の出展クリエイターの和集合」をクエリで導出**（専用テーブル不要）。プールが空なら新規作成導線を出さない。
  - **招待／本人登録フローは未設計（保留）**。将来ギャラリーが未登録作家を扱えるようにする場合はこの経路を別途設計する（今回のスコープ外）。

### 2026-07-12 p2-12/p2-12-1 を gallery ロールでグループ展化（複数作家の出品）

- **要望**：p2-12/p2-12-1 で gallery ロールのとき**グループ展**（複数クリエイターの作品を出品できる）にする。
- **デモ実装**：`EXH_ARTISTS`（静的単一）を廃し、ロール別の2リスト＋getter に。`EXH_ARTISTS_SOLO=[田中 透]`（creator＝個展）／`EXH_ARTISTS_GROUP=[田中 透, 佐藤 みなと, 鈴木 洋]`（gallery＝グループ展）。`exhArtists()=isGalleryRole()?GROUP:SOLO`。`isAllowedAuthor`・`renderAddTexts`（出展クリエイター明示・追加パネル文言）・`bindNewBtn`（1名＝即遷移／複数＝作者ピッカー）が全て `exhArtists()` 参照に。候補データ `EXTRA` に鈴木 洋の x3/x4 を追加（佐藤 x1/x2 と合わせグループ展の候補プールに）。ロール切替で候補が変わるよう `window.ktnRender` チェーンに `renderCandGrid()` を追加（従来 `renderAddTexts()` のみ）。**p2-12・p2-12-1 の両方に同一適用**（replace_all）。
- **意味**：gallery ロールでは追加パネル上部に3作家が「この展覧会の出展クリエイター」として並び、候補グリッドに3作家の作品が出て、「新規作品を作成」は作者ピッカー（3択）を開く。creator ロールでは従来どおり本人（田中 透）の個展。
- **本番（React/Drupal）**：出展者リストは**ロール非依存**＝展覧会エンティティの確定出展者を返す（デモのロール別切替はグループ展/個展の2状態を1ページで見せるための便宜）。個展か群展かは展覧会データが決める。`isAllowedAuthor` のサーバー検証（出展外ブロック）は不変。

### 2026-07-12 p4-14 の作者選択を検索付きオートコンプリート化（案A採用）

- **課題**：p4-14「新規作品を作成」の作者選択プール＝取扱クリエイター（過去展の出展者の和集合）が**数百人規模**になり得るギャラリーが多く、フラットリストのピッカーが破綻する。
- **検討3案**：A＝検索＋「最近/よく使う」クイックピック／B＝取扱クリエイターの★キュレーション（プール自体を絞る・招待フロー無しの軽量 p4-18 復活）／C＝展覧会→その出展者の段階絞り込み。C は先行ストック（作品が特定展に未紐付け）に合わず却下。**ユーザーが案A（単独）を選択**。B は今回見送り。
- **実装（デモ）**：ピッカーモーダルにフラットリストの代わりに①検索ボックス（`#p414PickerSearch`・氏名/よみがな部分一致）②未入力時＝fav（最近作成・よく出品する作者）のみ既定表示＋hint「最近・よく出品する作者」③入力時＝母集団全体を `normalize()`（小文字化・空白除去）した氏名／かなで絞り込み＋hint「検索結果 N件」④0件時 `#p414PickerEmpty`。母集団 `POOL` はデモ固定16名の配列 `{key,name,kana,fav}`（在庫のある高橋/佐藤/大野＝fav、鈴木/伊藤も fav、他11名は検索到達）。opt は `data-key`＋よみがな併記、ナビはリストへの委譲クリック。リストは `max-height:44vh` スクロール。選択で `?mode=new&role=gallery&author=<key>`。**p6-11 の `P611_AUTHORS` を16名へ拡張**（拡張プールの作者が固定表示できるように）。プール空なら従来どおり新規ボタン disabled。CSS＝`.p414-picker__search`/`__search-icon`/`__search-input`/`__hint`/`__opt-kana`/`__empty`。
- **本番（React/Drupal）への含意**：母集団は**サーバー側の検索エンドポイント**（取扱プール＝全展覧会の出展者の和集合をクエリ導出、氏名・よみがなのインデックス検索）。クライアントに全件を積まない。クイックピックの「最近・よく出品する作者」は**recency/frequency 順**（直近作成・出品回数）で上位N件を返す。デモの `fav` フラグ＝この recency/frequency 上位のスタンドイン。かな検索はデモは前方/部分一致のみだが本番は読み仮名フィールドでの正規化検索に。**案B（★キュレーションでプール自体を絞る）は将来オプションとして保留**（招待/本人登録フローと合わせて再検討）。

### 2026-07-12 p4-14 の作者候補に「確認」リンク＋識別メタを追加（同姓同名の見分け）

- **課題**：ギャラリーの取扱クリエイターには**同姓同名（同一漢字・同一よみ）**の別人が並び得る。案Aの氏名＋よみがなだけでは本人を特定できず、誤って別作家の作品として登録すると真正性ポリシーが崩れる。
- **要望**：各候補に**クリエイターページへのリンク**を付け、ギャラリーが本人かを**確認してから選択**できるようにする。
- **実装（デモ）**：ピッカーの各候補（`.p414-picker__opt`）を `<button>` 単独から**行構造の `<div>`** に作り替え。構成＝`[アバター][情報: 氏名＋メタ行][確認 ↗][選択 →]`。
  - **アバター**（`.p414-picker__opt-avatar`）＝氏名頭文字。creator 形状（角丸10px＋インクブルー outline `rgba(42,95,122,.45)`）で人物識別。
  - **メタ行**（`.p414-picker__opt-meta`）＝`よみがな · 拠点 · ジャンル` を中黒連結・ellipsis。同名でも拠点・ジャンルで一次識別できる。
  - **確認リンク**（`.p414-picker__opt-verify`）＝`kotennavi-p3.html?c=<key>` を **`target="_blank" rel="noopener"` で別タブ**。ブランド青の下線テキスト（`.ktn-guide-link` と同系＝参照リンク）。「確認 ↗」。
  - **選択ボタン**（`.p414-picker__opt-select`＝`ktn-op-btn ktn-op-btn--sm`）＝「選択 →」。**遷移はこのボタン限定**にし、行クリック委譲は verify（別タブ既定動作に委ねて return）と select を判別。誤って作成に進むのを防ぐ。
  - **同名デモペア**：`POOL` に `mori1`（森 陽介・もりようすけ・東京・油彩）／`mori2`（森 陽介・もりようすけ・京都・日本画）を追加。氏名・よみが完全一致で拠点/ジャンルだけ異なる＝確認リンクで実際に見分ける挙動を示す。`P611_AUTHORS` にも `mori1`/`mori2` を追加（固定表示できるように）。
  - 検索は氏名・よみがなのみ（拠点・ジャンルは識別表示専用で検索対象外＝案Aの母集団ロジックは不変）。
  - モーダル desc に「同姓同名の作者は『確認 ↗』でクリエイターページを開き、本人か確かめてから選択」を追記。
- **本番（React/Drupal）への含意**：検索エンドポイントは候補ごとに**安定した creator id・アバター・拠点・ジャンル**を返し、確認リンクは `creator/<id>` へ。同名衝突は id で一意なので UI は id を data 属性に持ち氏名は表示専用。verify を別タブにするのは選択フロー（モーダル）を保持したまま本人確認するため。

### 2026-07-12 p2-12/p2-12-1 の新規作品ピッカーにも「確認」リンクを追加（p4-14 と統一）

- **要望**：p2-12/p2-12-1 の gallery ロール新規作品作成（グループ展＝出展クリエイター複数）のピッカーにも、p4-14 と同様にクリエイターページへの確認リンクを付ける。
- **実装（デモ）**：`bindNewBtn` の簡易ピッカー（`.p2-12-new-picker`）の各候補を `<button>` 単独から**行構造の `<div>`** へ＝`[アバター（頭文字・creator形状）][氏名][確認 ↗（別タブ）][選択 →（`ktn-op-btn--sm`）]`。遷移は「選択 →」限定（確認は別タブ既定動作に委譲）。ピッカー上部に同姓同名の確認を促す `__note` を追加。p2-12・p2-12-1 の両方に同一適用（replace_all）。作者 key（tanaka/sato/suzuki）は `P611_AUTHORS` 収録済みで固定表示される。
- **p4-14 との差**：p2-12 は出展クリエイター（少人数）が母集団のため**検索ボックスは付けない**（p4-14 は数百人スケール対応で検索必須）。メタ行（拠点・ジャンル）も付けない（`EXH_ARTISTS_GROUP` は key/name のみ・少人数で同名衝突が起きにくいため）。確認リンク＋アバターのみ流用。本番で群展規模が大きい場合は p4-14 同様の検索・メタ拡張を検討。

### 2026-07-12 編集・管理系の必須マーカー／操作ボタンを共通クラスへ統一

- **課題**：p2-11 / p2-12 / p2-12-1 / p6-11 ほか一部の編集・管理ページが、必須マーカー・操作ボタンを**共通定義（p3-15/p3-16 等で確立した `.ktn-req` / `.ktn-op-btn`）と別系統の独自クラス**で実装しており見た目・挙動が不揃いだった。ユーザー指示で**全管理・編集ページを対象**に再チェックし共通化。
- **必須マーカー**：`.p211-req`（`*` グリフ・赤太字）を廃し、全ページ共通の `<span class="ktn-req">必須</span>` に統一（マーカーはラベルテキスト直後・先頭スペース無し＝CSS `margin-left:5px`）。凡例文「`*` は必須項目です。」も削除（マーカー自体が「必須」と明示するため凡例不要）。p2-11 の JS バリデーション走査セレクタを `.p211-req` → `.ktn-req` へ変更（`mark.closest('.p211-field')` ロジックは不変）。適用＝p2-11 / p6-11 / p5-11 / p5-12 / p11-4 / p3-11。
- **操作ボタン**：ページ固有クラス＝**レイアウト専用**、`.ktn-op-btn` ＋修飾子＝**視覚**、の原則へ全ページ寄せた。送信バー（p2-11/p6-11/p5-11/p5-12）＝キャンセル `ktn-op-btn`／送信 `ktn-op-btn ktn-op-btn--primary`。p2-12/p2-12-1 フォームアクション＝同上。モーダル＝キャンセル `ktn-op-btn`／確定 `--primary`（p2-12-1 のデータ喪失を伴う「切り替える」のみ `--danger`）。p11-4 送信＝`ktn-op-btn ktn-op-btn--primary ktn-op-btn--lg`。
- **視覚変更（要ブラウザ確認）**：(1) 送信ボタンが独自の大きめ（.9rem/padding広め）から共通 `--primary`（.78rem）へ＝やや小型化。(2) p2-12 フォーム保存ボタンが**ピル型（border-radius:100px・青影）から角丸4px・共通青**へ（ユーザー承認済）。(3) **p11-4 申込ボタンがゴールド `#7a5008` からブランド青 `--primary` へ**＝ボタンシステムの「`--primary` は文脈を問わず常にブランド青」原則に合わせ、LIAISON+ ゴールドを廃止。(4) p11-4 モバイルの `width:100%` を撤去（ボタンは font-size+padding で押しやすさ確保・幅引き伸ばししない方針）。
- **CSS 掃除**：`.p211-req` / `.p211-submit-bar__cancel|__submit`（視覚）/ `.p2-12-modal__cancel|__ok`（視覚）/ `.p2-12-form-actions__save|__cancel`（視覚・ピル）/ `.p114-submit-btn`（ゴールド視覚＋モバイル width:100%）を canonical から削除（コメントで委譲先を明示）。`.ktn-op-btn:disabled,[disabled]` を汎用化（旧＝`--caution`/`--danger` 限定）し、p2-11/p11-4 等の primary disabled にも効くように。
- **本番（React/Drupal）への含意**：必須マーカー・操作ボタンは全編集フォームで `.ktn-req` / `.ktn-op-btn` の単一ボキャブラリに集約。`<Button variant>` 化時も primary＝固定ブランド青・destructive＝danger の役割対応をそのまま移植。p2-11 の `.p211-req` 依存 JS バリデーションは `.ktn-req` 参照へ移行済み（フォーム整備時は `.ktn-req` を必須判定のフックに使える）。

### 2026-07-12 p2〜p2-5-1 表示修正5点（会場中立ワード・曜日表記・p2-1整合性・p2-11入力対応）

- **①会場中立ワード化**：LIAISON の会場は美術館・ギャラリー・カフェレストラン・ショップ等 多種類あるため、ギャラリー限定語の **休廊→休み／開廊→開場／閉廊→閉場** に統一（既存語彙に合わせ新語を作らない）。全p2系HTML（p2/p2-1/p2-2/p2-3/p2-4/p2-5/p2-5-1）＋ pages.js から旧語を一掃。**「在廊」（作家が会場にいる）は会場種別に依存しない語なので除外＝置換しない**（在廊バッジ・在廊予定はそのまま）。本番でも会場ラベルは中立語で持つ。
- **②曜日表記から「曜」「曜日」を除去**：「毎週土曜」→「毎週土」、「火曜/火曜日」→「火・水」等。中黒区切りの曜日並記に統一。ナビ・カレンダー・本文とも適用。
- **③ヒーロー会期時刻末尾「（木〜日）」削除**：曜日情報は「休み：月・火・水」側が担うため、時刻表記に曜日補足を重ねない。全p2系ヒーローで削除。
- **④p2-1 デモ整合性バグの是正（コードに残らない判断）**：デモデータが「2/18 初日 13:00 開催」なのに、日別カレンダーは 2/18(水) を休み表示していた（初日が休み＝矛盾）。**根因**＝カレンダーの開催判定 `OPEN_DOW=[4,5,6,0]`（木金土日）に水曜が無く、初日でも曜日ルールだけで休みになっていた。**解決**＝pages.js に `HOURS_EXC`（`日付→時間` の上書きマップ）を新設し、該当日は `isOpenDate()` が強制的に開場扱い＋その時間を表示。これは p2-11 の「開催時間の変更（特定日の時間差し替え）」入力をデモ側でモデル化したもの。→ 2/18 は「13:00 – 19:00」＋在廊バッジで表示。**曜日ベースの定休だけでは初日/最終日/特別日を正しく表現できない**ため、本番も日付単位の時間オーバーライドを曜日ルールより優先させる必要がある。
- **⑤イベント・在廊予定を p2-11 入力対応へ**：
  - イベントを **`calTime`（狭い日別カレンダーのバッジ用・短縮表記。例「11:00〜 他」）** と **free-text `time`（本文用・1日複数回に対応。例 ワークショップ「①11:00〜 ②14:00〜 ③16:00〜（各回60分）」）** の2値に分離。カレンダーバッジは nowrap で溢れるため短縮版を使い、本文・一覧は完全版を出す。p2-11 のイベント時間がフリーテキスト（①②③ 複数回可）である入力仕様に対応。
  - 在廊予定を **`ATTENDANCE`（`from`/`to`/`dow`/`memo` の期間エントリ配列）** へ再設計し、「2/19〜3/4 の土日祝」のような可読スケジュール文＋本日該当判定（`dowMatch`＋`isOpenDate`）を描画。p2-11 の在廊予定＝期間×曜日フィルタ×メモ の入力モデルに対応。単日エントリ（初日/最終日）は「2.18（水）」形式。
  - CSS＝`.p2-1-simple-item__meta` に `flex-wrap:wrap`、在廊バッジ配色 `.p2-1-simple-item__badge--attend`（`--accent` 系淡背景）を common.css に追加。
- **副次整合**：p2-3 記事本文でトーク開催日が「毎週土曜日」と書かれつつ日付が 2/22・3/1（＝いずれも日曜）と食い違っていた既存バグを、正しい土曜 **2/21・2/28**（p2-1 のトーク日と一致）へ是正。ワークショップ 2/22（日・複数回）・クロージング 3/5 も本文へ反映。
- **本番（React/Drupal）への含意**：会場種別に依存しない中立ラベル（休み/開場/閉場）で保持。日別カレンダーは「曜日定休ルール」より「日付単位の時間オーバーライド（開催時間の変更・臨時休業）」を優先して開催/休みを導出する。イベント時間は表示幅別に短縮/完全の2表現を用意。在廊予定は期間×曜日×メモを期間エントリとして持ち、表示時に日付展開する。

### 2026-07-12 Q&A（FAQ）を独立コンテンツタイプ化＝一元管理・各ページで参照表示

- **決定（ユーザー方針）**：サイト内の Q&A を **Drupal のコンテンツタイプとして新設**し、Q&A を一覧管理する。個々のQ&Aエンティティを、必要なページ（FAQ ハブ・フォーム脇など）に**参照表示**する。＝Q&A本文の実体は1つ、表示箇所は複数。
- **背景（なぜ）**：展覧会の登録・編集ガイドを作るにあたり、フォームのインライン説明とガイド本文で**二重管理**になるのを避けたい、というのが起点。個別ページにQ&A本文を直書きすると文言がずれるため、**単一の実体を参照する**モデルにして single source of truth を担保する。
- **フロント方針（p60-6/p60-7 実装時）**：p60-6（よくある質問-クリエイター編）／p60-7（ギャラリー編）に「展覧会の登録・編集」セクションを設け、該当カテゴリのQ&Aを一覧表示。**解決しない場合は p60-11（お問合わせ）へ導線**（`.ktn-guide-link` 等）。p2-11 等のフォーム側は**最小マイクロコピー＋該当FAQへの参照リンク**に留め、手順・理由・トラブル対応はFAQ側が持つ（役割分担で重複させない）。
- **静的プロトタイプでの模し方（React/Drupal 前の暫定）**：デモHTMLでもQ&A本文をページに直書きせず、**単一のJSデータ構造（例：`KTN.QA` / `QA_DEFS` 配列。各エントリに `audience: creator|gallery|common` ＋ `category`（例 exhibition-edit）＋ `q` / `a`）から描画**し、p60-6/p60-7 は同一ソースの該当サブセットをレンダリングする（`TAGBAR_DEFS` / `KTN.pages` と同じ「データ＋描画」パターン）。これで本番のコンテンツタイプ＋参照モデルへ写像しやすく、デモ段階でも二重管理を避ける。
- **content type → Drupal（第2章相当のフィールド示唆）**：Q&A エンティティ＝`question`(text) / `answer`(rich text・内部リンク可) / `audience`(term: 一般/ユーザー/クリエイター/ギャラリー、複数可) / `category`(term: 展覧会の登録・編集 等) / `weight`(表示順)。FAQ ページは audience＋category でフィルタした参照フィールド or ビューで一覧表示。**creator/gallery で共通のQ&Aは `audience` に両方を付与して1エンティティを共有**（ギャラリー固有＝作者選択の真正性・在庫非公開・出展外ブロック等のみ gallery 単独エントリ）。
- **「展覧会の登録・編集」カテゴリのQ&A項目案を作成済み（40問・QA-EXH-01〜40。回答内容はレビュー済み）**。共通34／gallery 3（05・18・35）／creator 1（19）。次工程で `KTN.QA`/`QA_DEFS` へ構造化し p60-6/p60-7 に実装。
- **確定した仕様（FAQ回答の根拠・コードに残らない判断／2026-07-12 ユーザー確定）**：
  1. **管理者確認のリードタイムは非公開＝日数を約束しない**（QA-09）。理由＝登録の集中や他の申込・問合せ・相談への対応状況で前後し、実時間を伝えられないため。FAQ・UI とも「早めの登録を推奨」の表現に留め、具体的な日数・SLA を出さない（取引期限アラートで期限の数字を出さない方針と同じ思想＝運用チューニングとの齟齬・問い合わせ増を避ける）。
  2. **確認済みロックに自己解除フローは無い＝修正はお問合せのみ**（QA-37）。管理者確認が済んだ項目はロックされ、ユーザー側に解除手段を設けない。修正は p60-11 お問合せ経由。React/Drupal でも「確認済フィールドはユーザーから unlock 不可・運営操作のみ」で実装。
  3. **展覧会の削除・非公開は「管理者確認完了」を境に不可逆**（QA-39）。**確認完了前**＝展覧会管理ページ（**クリエイター P3-18／ギャラリー P4-18**＝旧 P4-18 取扱作家管理〔2026-07-10 廃止〕の番号を展覧会管理に転用）から削除可。**確認完了と同時に**＝ウォッチ通知の送信＋個展なび公式SNSでの公開告知が走るため、以降は削除・非公開ができない。＝「確認完了」が対外公表のトリガーであり不可逆点。P3-18/P4-18 実装時は、この状態（未確認＝削除可／確認済＝削除不可）を展覧会エンティティの状態で分岐させる。

### 2026-07-13 Q&A基盤の実装（KTN.QA / KTN.renderQA）＋p60-7 新規＋p60番号のsitemap整合

- **実装（静的プロトタイプ）**：上記コンテンツタイプ方針を `kotennavi-common.js` に落とし込み。
  - `KTN.QA`＝Q&Aエンティティの静的ミラー（配列。各要素 `{id,cat,aud,grp,q,a}`）。`aud` は本番の複数term audience を静的では `common`（全ロール可視）/`creator`/`gallery` の単値に簡略化。seed＝カテゴリ `exhibition-edit`（展覧会の登録・編集）40問（QA-EXH-01〜40）。
  - `KTN.renderQA(target,{audience,category})`＝audience×category でフィルタ→`grp` 見出し（`.p60-faq-group`）＋`.p70-faq`/`.p70-faq-item` アコーディオンで描画。**本文はページに直書きしない**（single source→フィルタ参照）。→ React/Drupal では Q&A エンティティ参照ビュー（audience+category filter）へ写像。
  - **なぜ common.js に置くか**：`TAGBAR_DEFS`/`PAGES` と同じく複数ページが参照する共通データのため。p60-6（クリエイター編）も同一 `KTN.QA` を `audience:'creator'` で描画するだけ＝対ページが別タイミング制作でも文言がずれない。
- **p60-7（よくある質問-ギャラリー編）新規作成**：P70記事シェル流用。gallery+common=39問（creator専用 QA-19 除外）を「展覧会の登録・編集」セクションに描画＋「解決しない場合」＝お問合せ P60-11 へ `.ktn-guide-link`。フォーム側（p2-11 等）は最小マイクロコピー＋FAQ参照に留める方針は維持（本パスでは未着手＝p60-6 と合わせて後続）。
- **ページ番号は sitemap.md を正とする（ユーザー確定）**：「私は sitemap.md しか触らないので sitemap.md が常に正」。common.js の PAGES p60ブロックが `'p60':'お知らせ一覧'` 混入で sitemap と off-by-one だったのを sitemap 準拠へ全面リナンバー。**お知らせ一覧＝P61（別セクション）／ご利用ガイド＝P60**。追従先＝PAGES＋`p61` 追加・PAGE_NAV_MAP・ボトムナビ（お知らせ→/p61・ガイド→/p60）・管理者編集グループ・p1.html ハードコードsidebar。
  - **未追従（既知・後回し）**：`kotennavi_header.html`・`kotennavi_sidebar_footer.html` は各々旧番号の PAGES 複製とナビを持つ standalone コンポーネントデモ。本番（common.js駆動）非使用のため今回は触らず。番号方針を横展開する際にまとめて是正する。

- **p60-6（よくある質問-クリエイター編）新規作成（2026-07-13）**：p60-7 と同一シェルの対ページ。同一 `KTN.QA` を `KTN.renderQA({audience:'creator',category:'exhibition-edit'})` で描画＝creator+common=37問（creator専用 QA-19 を含み gallery専用 05/18/35 を除外）。本文は直書きせず単一ソースを参照＝対ページ間の文言ずれなし（Q&A基盤を置いた狙い通り）。「解決しない場合」＝お問合せ P60-11 への `.ktn-guide-link`。これで p60-6/p60-7 の対ページが揃う。

- **standaloneコンポーネントデモの番号をsitemap整合（2026-07-13）**：`kotennavi_header.html`・`kotennavi_sidebar_footer.html`（本番 common.js 非使用のデモ）に残っていた旧p60番号を sitemap 準拠（お知らせ=P61・ガイド=P60）へ追従。これで番号方針（sitemap.md が正）がプロジェクト全体で一貫。React移行では両デモは破棄され common.js のナビ定義のみが写像対象なので、あくまで開発時デモの内部整合の是正。
- **フォーム→FAQ参照の第一歩（p2-11／2026-07-13）**：Q&A基盤の役割分担方針（フォームは最小コピー＋該当FAQ参照リンク・手順/理由/トラブル対応はFAQ側）に沿い、p2-11 のヘッドに **ロール別FAQ参照リンク**（`#p211FaqLink`・creator→/p60-6・gallery→/p60-7、`applyVenueRole()` で href 切替）を新設。**未了＝既存ヘッド説明文（手順・理由を含む長文）のFAQ側への圧縮**は可視テキスト削減のためユーザーレビュー保留。React/Drupal では「フォーム＝入力UI＋Q&A参照ビューへのリンク／Q&A本文＝Q&Aエンティティ」の分担で、この参照リンクは Q&A ハブ（audience別 FAQ）への遷移に写像する。他フォーム（p3-11 等）へ横展開する際は同じ `.ktn-mgmt-head__guides`＋`.ktn-guide-link` パターンを使い、ロール確定ページは固定 href、共有ページはロール別 href とする。

### 2026-07-13 取引FAQの単一ソース化（KTN.QA 拡張）― 手順1：renderQA 拡張（基盤のみ・見た目変化なし）

- **決定**：取引6ページ（p3-15/16・p4-15/16・p5-14/15）＋リエゾンハブ（p70-1/p70-2/p70-11/p70-12）のFAQ本文を、exhibition-edit と同様に `KTN.QA` へ**単一ソース化**する（ユーザー承認：スキーマOK・進め方OK）。動機＝本文が各ページ直書きで二重管理（p3-16=5 phase項目 vs p4-16=4 で既にドリフト）。
- **表示形態と本文ソースの分離**：取引デスク（p3-16/p4-16/p5-15）のFAQは **phase 連動の文脈表示**（現在の取引状態に合う設問だけ出す＝誤操作回避に価値）なので **inline のまま維持**。単一ソース化するのは本文だけ。ガイドハブ（p70系）は従来どおり group 見出し付き全件表示。
- **スキーマ拡張**（`KTN.QA` の要素に追加）：`cat` に `liaison`（サービス全般＝p70-1/p70-2）・`liaison-txn`（取引フロー）を追加。`side`＝`seller`（出品者＝creator/gallery 共通・1本に集約しドリフト防止）/`buyer`（購入者＝user）。`phase`＝取引状態キー配列（`applied/new/payment/paid/receipt/confirming`・`setDemoState` と同語彙・省略＝常時表示）。→ React/Drupal では Q&A エンティティに category（liaison-txn）・side（seller/buyer term）・phase（複数値 or 取引状態タクソノミー参照）フィールドを足し、取引デスクは「現在状態でフィルタした参照ビュー」に写像。
- **確定ハブ対応（sitemap）**：出品者取引ハブ＝**p70-12**（出品者編）／購入者取引ハブ＝**p70-11**（購入者編）／liaison 一般＝p70-1・p70-2。
- **手順1完了＝`KTN.renderQA` 拡張のみ（見た目変化なし）**：`opts.side`（side を持つ項目のみ絞り込み・side無し項目は常時可視）と `opts.style:'desk'`（group無しフラット＝`.p315-faq-item`＋`data-faq-phase` 出力・取引デスクの既存 phase 連動JSがそのまま流用）を追加。既定 `style:'guide'` は従来出力（`.p60-faq-group`＋`.p70-faq`）と完全一致＝p60-6/p60-7 は不変。データに liaison/liaison-txn 項目未投入のため拡張分は未描画。
- **残手順**：②既存文言から `liaison`/`liaison-txn` 項目を起こす（p70-1/p70-2/p70-11/p70-12＋取引6ページのドリフト統合） → ③8ページのハードコードFAQを `<div id>`＋renderQA 呼び出しへ置換（phase連動JS結線は維持） → ④件数/phase検証。

### 2026-07-13 取引FAQ単一ソース化 ― 手順2：liaison/liaison-txn 項目投入（データのみ・描画未結線・見た目変化なし）

- **範囲判断＝今回はデスクに絞る**：ユーザーが挙げたドリフトの核＝取引デスク（p3-16/p4-16/p5-15）の seller/buyer FAQ を `KTN.QA` へ単一ソース化。投入＝`liaison`5問（LIA-01〜05・p70-1由来のサービス全般）／`liaison-txn side:seller`9問（TXN-S01〜09＝p3-16 の superset）／`liaison-txn side:buyer`9問（TXN-B01〜09＝p5-15）。
- **ドリフト実証と統合方針**：出品者デスクは **p3-16=9問／p4-16=5問** で欠落（p4-16 に paid「発送方法」・常時「取引キャンセル可否／受取問題連絡／購入者個人情報の保持期間」が無い）。seller は creator/gallery で同一のため `side:'seller'` 1本（aud common）に集約＝p3-16 の 9問を canonical とし、手順3で p4-16 も同じ9問を描画（5→9に増える＝**意図した是正**）。
- **register 別で今回対象外**（後続で個別判断）：**コンソール系 p3-15/p4-15/p5-14 のFAQ**（一覧管理・売上サマリー・会場売約済/出品取消の違い等＝デスクと別内容。p3-15↔p4-15 は対ページで別途ドリフトし得る seller-console 群）。**p70 ハブ p70-2/p70-11/p70-12 のFAQ**（フェーズ節に状況/対応/期限とセットで埋め込まれた解説プローズ＝文体が別・buyer/seller で相互ドリフトしないため現行維持）。p70-1 一般FAQのみ `liaison` として取り込み済み。→ React/Drupal では「デスク＝Q&A(liaison-txn)を side＋現在状態でフィルタした参照ビュー」「コンソール＝別カテゴリ or 別ビュー」「ハブ＝ガイド本文（Q&A参照は補助）」に写像。
- **プレーンテキスト化の副作用（手順3で顕在化・要確認）**：`KTN.QA` の `a` は renderQA で esc されるため、デスク原文の `<strong>` 強調（領収書の消去対象外／受取確認後キャンセル不可／購入者個人情報の1週間後消去 等）は外れる。文意は保持。手順3でデスクを renderQA へ差し替えると**この強調欠落と、p4-16 の項目増（5→9）が可視変化**＝ユーザー確認を要する。手順2はデータ投入のみで描画未結線のため現状は見た目変化なし。

### 2026-07-13 取引FAQ単一ソース化 ― 手順3：3デスクを renderQA へ結線（ドリフト解消・可視変化あり）

- **結線内容**：3デスクのハードコードFAQブロックを `<div id>` 1個へ置換し、`KTN.init` 直後に renderQA を呼ぶ。phase連動JS（`setDemoState` が `.p315-faq-item` の `data-faq-phase` を見て現状態以降の問だけ表示）は既存のまま流用＝renderQA が生成する desk markup が `data-faq-phase` を含むため無改修で連動。
  - p3-16：`#p316QaTxn`＋`renderQA({category:'liaison-txn',side:'seller',style:'desk'})`（9問・従前同）。
  - p4-16：`#p416QaTxn`＋**同一 seller ソース**（**5→9問＝ドリフト解消・意図した是正**）。
  - p5-15：`#p515QaTxn`＋`renderQA({...,side:'buyer',...})`（9問・従前同）。
- **描画順の担保**：renderQA は初回 `setDemoState` より前（`KTN.init` 直後）に実行し、phase-gating が走る時点で `.p315-faq-item` が DOM に存在するようにした。
- **可視変化（ユーザー目視待ち）**：①p4-16 の FAQ が5→9問に増える。②全デスクで `<strong>` 強調が外れる（手順2で承認済みの副作用）。
- **本番写像**：デスクFAQ＝`Q&A(liaison-txn)` を side＋取引現状態でフィルタした参照ビュー。強調表現を残す場合は Drupal 側で `a` をリッチテキスト化し renderQA の esc を rich 出力へ切替える余地あり（現デモはプレーンで確定）。

### 2026-07-13 コンソール系FAQの帰属方針 ― p70-11/p70-12 ハブがコンソール＋取引フローを包含する（ユーザー明示）

- **設計意図（ユーザー明示・コードに残らない判断）**：**p70-12（出品者ハブ）＝出品者コンソール（p3-15/p4-15）＋出品者取引フロー（p3-16/p4-16）を包含する傘ページ**、**p70-11（購入者ハブ）＝購入者一覧（p5-14）＋購入者取引ワークスペース（p5-15）を包含する傘ページ**。**理由＝コンソール（一覧管理）と取引フロー（個別進行）は相関が強く、別ページに切り離すと操作の行き来が増え混乱を招くため、ハブでは1つに束ねる。**
- **先の「seller-console を別カテゴリ化」案は撤回**：手順2エントリで挙げた「コンソール系を独立 `liaison-console` として切る」候補は、この包含方針に反する（分離を再生産する）ため採らない。**将来コンソールFAQを単一ソース化する場合も、コンソールを分離せず seller/buyer の傘（p70-12/p70-11 と同じ束ね）の下で一体に扱う**。今回デスクのみ先行統合したのはスコープ最小化のためで、コンソールを「別物として恒久分離する」判断ではない。
- **本番写像への含意**：Q&A は side（seller/buyer）でまとめ、コンソール／デスクは同一 side 内の文脈（一覧管理 vs 個別進行）として区別に留める。ハブ（p70-11/p70-12）は side 単位で console+flow を通して読ませるビュー。

### 2026-07-13 取引FAQ単一ソース化 ― コンソール系（p3-15/p4-15/p5-14）結線＋ctx軸新設（可視変化あり）

- **decision＝コンソールを別カテゴリに切らず `ctx` 軸で束ねる**：上記「包含方針」に従い、コンソールFAQを独立カテゴリ化せず `liaison-txn` 内に `ctx:'desk'|'console'` の文脈軸を追加して同居させた。renderQA に `opts.ctx`（厳密一致 `x.ctx !== ctx` で除外）を追加。**ctx を渡さない呼び出しは全件通過**＝将来ハブ（p70-11/p70-12）が renderQA 化する際に side 内 console+flow を一括描画できる余地を残す設計。既存の非txn呼び出し（exhibition-edit・liaison）は category 必須のため無影響。
- **KTN.QA データ**：既存デスク18問へ `ctx:'desk'` 付与。**コンソール16問を新規投入**＝出品者コンソール8問（CON-S01〜S08・`side:'seller',ctx:'console'`）＋購入者コンソール8問（CON-B01〜B08・`side:'buyer',aud:'common',ctx:'console'`）。**出品者コンソールの唯一のロール差＝「発送待ち」Q**（CON-S02 `aud:'creator'`＝自分で梱包・発送／CON-S03 `aud:'gallery'`＝作家と連絡し手配）。exhibition-edit の gallery/creator 分岐（p60-6/p60-7）と同一機構＝残りは `aud:'common'`。配列順検証：creator は S01,S02,S04-S08＝7問／gallery は S01,S03,S04-S08＝7問（発送待ちは2番目に正しく出る）。
- **結線**：p3-15＝`#p315QaConsole`＋`renderQA({category:'liaison-txn',side:'seller',ctx:'console',audience:'creator',style:'desk'})`（7問）／p4-15＝**同一 seller ソース**（`audience:'gallery'`・7問）＝対ページのドリフト解消／p5-14＝`#p514QaConsole`＋`{...,side:'buyer',ctx:'console'}`（8問・従前同）。**コンソールFAQは phase-gating なし＝常時表示**（`data-faq-phase` なし・renderQA に phase 渡さず）。
- **デスク3ページへ `ctx:'desk'` 追記が必須だった理由**：ctx フィルタは厳密一致だが**未指定なら素通り**のため、ctx を持たないデスク呼び出しは `liaison-txn` の desk＋console 両方を拾ってしまう。p3-16/p4-16/p5-15 の呼び出しに `ctx:'desk'` を足してコンソール項目の混入を遮断した。
- **ハブ導線＝repoint でなく add**：p70-11/p70-12 本体は**変更しない**（フェーズ・ナラティブ構造を維持＝renderQA 化しない）。コンソール各ページのヘッドに包含ハブへの `.ktn-guide-link`「取引の進め方・困ったとき →」を**追加**（出品者→p70-12・購入者→p70-11＝デスクと同一ハブ）。既存「LIAISON+の会場優先について →」（→p70-2）は会場優先の一般解説として topical に正しいため残置。repoint すると文言とリンク先が齟齬するため add を選択。
- **可視変化（ユーザー目視待ち）**：①コンソールの `<strong>` 強調が外れる（プレーンテキスト規約）。②ハブ導線リンクが増える（p3-15/p4-15＝2本目・p5-14＝新規1本）。③問数増減なし（p3-15/p4-15＝7・p5-14＝8）。
- **本番写像**：コンソールFAQ＝`Q&A(liaison-txn)` を side＋`ctx=console` でフィルタした参照ビュー（phase フィルタなし＝常時表示）。ハブ（p70-11/p70-12）は ctx 無指定で side 内 console+flow を通し読みするビューに写像。

### 2026-07-13 取引FAQ単一ソース化 ― p70ハブがQAを引き受け＋発送待ちQのロール差廃止（可視変化あり）

- **decision＝p70-11/p70-12 が side 別に console＋取引フローのQAを引き受ける**：`liaison-txn` QAが操作ページ内にしか出ておらず「ガイド面」が欠けていた（`exhibition-edit` の p60-6/p60-7 相当が無い）。ユーザー判断で**ハブに「よくある質問」節を新設**し `renderQA({side,style:'guide'})`（**ctx無指定＝desk+console 全件・phase無し全表示**）で描画。前エントリで残しておいた「ctx無指定＝全件通過」経路がそのまま活きた。→ これで `liaison-txn` は**コンソール／デスク／ガイドハブの3面**が同一 `KTN.QA` を引く。
- **ハブのフェーズ・プローズは残す（renderQA化しない）**：手書きのフェーズ解説（S1〜S5＋終端＋状況別インデックス）は撤去せず、QA節を**追加**。理由＝新サービスゆえ断片QAより全体像を通し読みしてほしい（ユーザー明示）。プローズ＝通し読み／QA＝逆引き、で役割分担。ハブ本体構造は不変＝目次に項10・末尾に `#faq` 節を足しただけ。
- **発送待ちQのロール差を廃止＝主語を置かない共通1問へ統合（前エントリ CON-S02/S03 の上書き）**：前エントリでは creator/gallery のロール差を「妥当」として2バリアント（CON-S02/S03）にしたが、**ギャラリーでも作品を預かり自ら発送する場合があり「誰が発送するか」の特定が難しい**とのユーザー判断で撤回。CON-S03 を削除し CON-S02 を `aud:'common'`＋主語なし文（「作品を梱包・発送し、取引デスクで…発送情報を入力してください」）へ統合。→ **出品者コンソールは全問 common** になり、p3-15/p4-15 の renderQA 呼び出しから `audience` を除去（各7問のまま）。ハブ（audience 無指定）でも重複せず1問で出る。**progress.md 2026-07-11頃の「発送待ちFAQのロール差＝修正不要」判断も本決定で上書き。**
- **実装**：p70-12＝`#p712QaTxn`＋`renderQA({category:'liaison-txn',side:'seller',style:'guide'})`＝2グループ16問（出品者の取引9＋コンソール7）。p70-11＝`#p711QaTxn`＋`{...,side:'buyer',...}`＝2グループ17問（購入者の取引9＋コンソール8）。guide style は `grp` 見出しで自動グルーピング（全 liaison-txn 項目に `grp` 有り）＝desk-flow が先・console が後の順で並ぶ（配列順）。
- **可視変化（ユーザー目視待ち）**：①p70-11/p70-12 に「よくある質問」節（アコーディオン）＋目次項10が新規出現。②出品者コンソールの発送待ち回答が主語なし共通文に変化（gallery版の「作家と連絡を取り…手配」が消える）。問数増減なし。
- **本番写像**：ハブQA＝`Q&A(liaison-txn)` を side でフィルタ（ctx・phase フィルタなし）した通し読みビュー。発送待ちは role term を持たせず単一 audience=common で1問に統合（Drupal の audience term に creator/gallery を付けない）。

### 2026-07-13 取引FAQの統合 ― ctx（desk/console）軸を全廃し side 単位の重複排除セットへ（可視変化あり）

- **decision＝取引デスクとコンソールでQAを分けない**：ユーザー指示「QAに取引とコンソールは分ける必要がない。同様なQAを整理して統合してほしい」（例＝申込が来たら／申込が入ったら、会場で作品が／会場売約済ボタン）。前エントリで新設した `ctx:'desk'|'console'` 軸を**廃止**し、`liaison-txn` を **side（seller/buyer）単位の重複排除済み統合セット**へ再構成した。`grp` も side ごと1つ（旧「〜（コンソール）」grp 廃止）。
- **なぜ ctx 軸をやめたか**：デスクとコンソールは同じ取引の別画面にすぎず、逆引きQAとしては同一の問が二重化していた（seller＝申込対応・会場売約済・発送で3組、buyer＝流れ・キャンセル・支払・受取確認・作品問題でほぼ1:1）。文脈で分けるより**1問に統合して全画面で同じ回答を引く**方が単一ソースの趣旨に合致。
- **マージ内容**：
  - **seller 16→13問**（旧 TXN-S 9＋CON-S 7）：`TXN-S01`（申込対応＝旧TXN-S01＋CON-S01）／`TXN-S02`（会場売約済＝旧TXN-S02＋CON-S04・見出しに「（会場売約済ボタンの使い方）」併記）／`TXN-S07`（発送＝旧TXN-S05＋CON-S02・「発送待ちになりました。作品の発送はいつ、どうすれば」）の3組をマージ。CON-S05（会場売約済と出品取消の違い）・CON-S06（販売期間終了後の取引中）・CON-S07（価格変更）・CON-S08（うち未精算）は単独問として seller セットに合流。ID を TXN-S01〜S13 に振り直し。
  - **buyer 17→9問**（旧 TXN-B 9＋CON-B 8）：CON-B01/03/04/05/06/08 を対応する TXN-B へ吸収。**`TXN-B02` に旧CON-B02（申込済と購入確定待ちの違い）と旧TXN-B02（購入確定待ちの確定期限詳細）を1問へ統合**（申込済＝順番待ち・確定期限なし・ワークスペース不可 → 自番到来で自動遷移 → 確定期限ルール・繰り上がりまで一気通貫）。`TXN-B09` に旧B09（領収書・個人情報消去）＋旧CON-B07（購入管理いつまで）を統合。TXN-B04（郵便番号変更）は単独維持。ID を TXN-B01〜B09 に。
  - マージ時、確定期限（会期終了7日後 or 申込7日後の遅い方・繰り上げなし）・個人情報消去（1週間後住所／2週間後メッセージ）・キャンセル条件 等の**実質情報は全保持**。主語ブレは「出品者」に統一（旧CON-B05 の「作家」→「出品者」）、画面依存の「このページ」表現は具体名（購入管理ページ／取引ワークスペース）へ置換。
- **renderQA / 呼び出し側**：`opts.ctx` とフィルタ行 `if (ctx && x.ctx !== ctx) return false;` を削除（doc コメントも ctx 記述を除去し廃止注記を追加）。**6呼び出しから `ctx` を除去**（旧 desk＝p3-16/p4-16/p5-15・旧 console＝p3-15/p4-15/p5-14）。**ctx を残すと厳密一致で全項目が弾かれる**ため除去は必須（項目側の ctx を消したので `undefined!=='desk'`）。ハブ（p70-11/p70-12）は元々 ctx 無指定＝統合セット全件をそのまま描画（2グループ→1グループ・seller 16→13・buyer 17→9）。
- **各面の phase 挙動**：デスク（p3-16/p4-16/p5-15）は flow 問の phase を保持＝`setDemoState` 連動を維持。コンソール（p3-15/p4-15/p5-14）・ハブは phase-gating JS を持たず全問表示（**p4-15/p5-14 も p3-15 同様 phase 連動なしを grep 確認済み**＝統合で phase 属性が付いても常時表示で無害）。
- **可視変化（ユーザー目視待ち）**：①デスク面に旧コンソール由来の問が増える（seller＝販売期間終了後の取引中・価格変更・うち未精算・会場売約済と出品取消の違い 等）。②コンソール面に旧デスク由来の問が増える（送料設定・発送方法・振込・個人情報保持 等）。③ハブが side ごと1グループ・問数集約。④重複していた申込／会場売約済／発送のQが各1問へ、見出し・文面が一部変化。
- **本番写像**：`Q&A(liaison-txn)` は side（＋デスクのみ現取引状態 phase）でフィルタする1ビューに単純化。ctx（desk/console）という画面軸の分類は Drupal 側に持たせない＝出品者/購入者の取引QAは各1セット。

### 2026-07-13 p2-11 に管理者管理セクションを追加（現行サイトの admin セクション移植・検索は後工程）

- **decision＝現行サイトの「編集の最後にある管理者の管理セクション」を p2-11 に admin 専用ブロックとして移植**（ユーザー指示・スクショ添付）。追加ブロック `#p211AdminBlock`（`.p211-block.p211-admin-block`）を 保存前の確認ブロックと sticky 送信バーの間＝フォーム最後尾に配置。**admin ロール時のみ表示**（`window.p211RoleSync` で `hidden` をトグル／既定 hidden＝creator・gallery には出さない）。
- **フィールド（スクショ準拠13項目）**：情報提供者／情報提供者（リファレンス・サブ行に「〜（gallery）」）／情報提供者検索／招待券プレゼント有無（select）／招待券プレゼント申込URL／招待券プレゼント応募期間（申込開始・終了 date）／管理者コメント（textarea）／UID（value 6616）／UID検索／確認済み（Admin確認済み chk）／ステータス（公開 chk）／オススメ設定（chk）／OGタグ非公開（chk）。
- **情報提供者・UID の設定ロジック（本番示唆）**：展覧会を投稿した creator/gallery の場合は**自動設定**。オフラインで掲載依頼を受けた場合のみ**情報提供者検索・UID検索**で設定する。ブロック冒頭の `.p211-admin-note` にこの運用を明記。
- **検索は後工程（今回はフォームのみ）**：情報提供者検索・UID検索の行（`.p211-search-row`＝テキスト＋creator/gallery select＋「検索する」ボタン）は**UI のみで未結線**。実検索（候補表示・選択で情報提供者/UID を確定）は React CSR / Drupal 側で実装する。既存の会場・出展クリエイター combo（`initP211Combo`）と同型の候補ピッカーに寄せる想定。
- **確認済み/ステータスの重複について**：デモの確認トグル（dbar「確認」）・公開設定ブロックは creator/gallery 向けの投稿フロー表現で、この admin セクションの「Admin確認済み」「公開」チェックは**管理者が実際に承認・公開する操作系**（現行サイトの admin セクションを忠実に再現）。admin 専用表示のため creator/gallery ビューとは併存しない。本番で両者の状態を1本化するかは後続のフォーム整備時に判断。
- **CSS**：common.css の `.p211-presave__consent` 直後に `.p211-admin-block`（admin識別＝上端3px `#3a4a5a`＋薄枠）・`.p211-admin-note`・`.p211-search-row`・`.p211-ref-sub`・`.p211-check` を追加。admin 帯色 `#3a4a5a` は mgmt-page の管理者トップバー色と統一。
- **2026-07-13 追記：フィールドを3グループへ再編（ユーザー指示）**。フラット13項目リストを `.p211-admin-group`（薄枠カード＋グループ見出し `.p211-admin-group__label`）で3群に整理：
  - **グループ1「投稿者・UID」**：UID／UID検索／情報提供者（リファレンス値 ART FACTORY城南島・サブ行 gallery）／情報提供者検索。
  - **グループ2「招待券・おすすめ」**：招待券プレゼント有無／申込URL／応募期間（申込開始・終了 date）／オススメ設定。
  - **グループ3「公開ステータス」**：OGタグ非公開／確認済み（Admin確認済み）／公開（chk）／管理者コメント。
  - **公開項目の公開日表示**：投稿者が公開日を設定している場合、公開チェックの下に `.p211-admin-pubdate`（`#p211AdminPubDate`）で「投稿者が公開日を設定しています：2026-06-10（この日付で自動公開されます）」を表示。デモは静的表示。本番は投稿者が設定した公開日（公開設定ブロック `#p211PublishDatetime`）が有る時のみ出す（無ければ非表示）。
  - **管理者コメント**はユーザー指定の3群に明示が無かったため、公開ステータス群の末尾に配置（管理者運用メモとして公開判断の近くに置く）。
  - CSS 追加：`.p211-admin-group`／`.p211-admin-group__label`（`--fn` gothic 700・admin色 `#3a4a5a`・下罫線）／`.p211-admin-pubdate`（admin色薄背景の注記）。

### 2026-07-13 p2-11 開催スケジュール詳細を「ルール行入力」から「日別カレンダー（ハイブリッド）」へ方針転換

- **decision＝臨時休業・時間変更を「期間＋曜日フィルタの行入力（rule型）」から「全日程を表示し該当日をクリックして直接変更するカレンダー型（現行サイト踏襲）」へ変更**（ユーザー相談→合意）。**理由**：rule型は「この日にどのルールが効くか」を頭で組み立てる抽象化ステップが要り直感的でない／休業と時間を別セクションで操作する。カレンダー型は休業と時間を同じ日マスでまとめて直接操作でき視覚的。**長会期でリストが長くなる欠点は月送りで緩和**。
- **「ハイブリッド」＝rule型の入力（会期・定休曜日・基本時間＝上の欄）を"下地"として残し、全日を自動生成**。カレンダーは基本ルールをそのまま反映し、**基本と異なる日だけをクリックで上書き**（`overrides`）。→ 長会期でも全マス手入力にならず、かつ直接操作の直感性を得る。rule型が苦手だった**「定休日を臨時開館」も1クリックで表現可能**になった（rule型では別途「例外的開催」行が必要だった）。
- **状態モデル**：`SCHED.overrides[YYYY-MM-DD]` ＝ `{open:false}`（臨時休業）｜`{open:true,from,to}`（開催・時間指定）。基本ルールと同じ状態になったら `schedNormalize` が override を削除（差分のみ保持）。有効状態 `schedEff` の分類＝`closed`（臨時休業・base開催時）／`special`（臨時開館・base休業時）／`hours`（時間変更・base開催で時刻差）で色分け（赤／緑／青＝凡例と一致）。
- **UI**：月バー（‹ 月表示 ›・会期の範囲でクランプ）＋凡例（開催/定休/臨時休業/臨時開館/時間変更）＋曜日ヘッダ＋7列グリッド。日マスは日付＋状態（時刻 or 休/休業）。会期外＝淡色 disable。日クリックで下部エディタ（開催/休業セグメント＋時刻＋「基本に戻す」「完了」）。基本ルール（会期・定休・基本時間）変更で自動再描画。
- **本番（React CSR/Drupal）**：`overrides`（差分）をAPI保存し、展覧会ページの**日別カレンダー表示**へ同じ有効状態計算（base＋override）で反映する。祝日はデモ未判定＝本番で祝日カレンダーと突合（`schedBase` の `rest.hol` 用フック位置にコメント）。
- **廃止/整理**：旧 rule 行UI（`#p211ExcClosedList`／`#p211ExcHoursList`・`addExcRow`）と関連HTMLを撤去。`EXC_DAY_OPTS`（曜日select）は在廊予定 `addAttRow` が共用のため存置。`delExcRow` も在廊行が共用のため存置。下書き保存（localStorage デモ）は `DRAFT_ADDED_LISTS` から2リストを外し、代わりに `SCHED.overrides` を保存/復元に追加。`draftEls()` はカレンダーの一時 input（`.p211-sched-cal` 配下）を除外。
- **CSS 追加**（common.css `.p211-exc-row` 直後）：`.p211-sched-cal*` 一式（バー/凡例/曜日/グリッド/セル状態 `is-rest`・`ov--closed/special/hours`・`is-out/is-blank/is-selected`/エディタ）。色は赤 `#b43c14`（臨時休業）・緑 `#1a7a3d`（臨時開館）・青 `#005da7`（時間変更）で凡例と統一。
- **在廊予定（`#p211AttList`）・イベント（`#p211EventList`）はカレンダー化せず現状（行入力）維持で確定（2026-07-13・ユーザー判断）**。開催スケジュールと同じ「日クリックでトグル」に寄せる案を検討したが不採用。**理由＝在廊予定はカレンダー日別トグルだと柔軟性が落ちる**：複数クリエイター出展時に「全員」等の自由記述や、クリエイター名＋期間＋曜日フィルタ＋メモ（午後のみ 等）の柔軟な指定が要り、日別トグル（1日=1状態）では表現できない。**イベントも各件が日付＋種別＋タイトル＋時間＋場所＋URL＋説明を持つ具体レコードでルール抽象でなく、カレンダーセルに載らない**（会期内日付のイベントは展覧会ページ側でカレンダー表示に自動反映＝入力はリスト／表示はカレンダーの役割分担で既に噛み合う）。→ 将来「一貫性のため」在廊日/イベントをカレンダー化しないこと。

### 2026-07-14 p5系並べ替え整理＋p5-2 チェックイン/レビューの編集・削除メニュー実装

- **decision＝チェックイン(親)・レビュー(子) の CRUD ができる面を確定**（ユーザー明示・操作マトリクス）。**チェックイン作成＝P2のみ**。**レビュー記入＝p2チェックイン時／p2 自分チェックイン編集時／p5-2 チェックイン編集時／p5-2 レビュー新規（p2 で日付だけ指定しレビュー未記入だったチェックインへ後付け）**。**チェックイン・レビュー削除＝p2・p5-2 のみ**。**P8-11＝編集専用**（新規・クローンなし／チェックイン日時・レビュー編集は可・**削除は持たない**）。→ P8-11 に削除を持たせない代わりに**空レビュー保存をガードで不可**とし、「レビューを消したい」導線は p5-2・p2 の削除メニューへ集約。ドメインモデル＝**Review は Checkin なしに存在できない（1ユーザー×1展覧会で1:1・任意）**。
- **P8-11 の呼称は後で修正（別途）**：sitemap.md:147 と common.js `PAGES['p8-11']` が「レビュー-新規/編集/クローン」のままなので、今回の「編集のみ」確定に合わせ「レビュー-編集」へ直す作業を残タスク化（p8/p8-11 本体は未作成のため今回は触らない）。
- **p5-1 並べ替え**：「ウォッチ数順」を削除し「ウォッチ日順（古い順）」を追加（`#p51Sort`）。ウォッチ**数**は他ユーザーとの比較軸で自分のウォッチリスト整理には無用、日付の昇降順の方が使う、という整理。
- **p5-3 興味あり-展覧会 並べ替え**：「会期終了順」「興味あり数順」「チェックイン数順」を削除し 追加日（新/古）＋展覧会名の3択に（`#p53Sort`。作品タブ `#p53SortAw`・記事タブ `#p53SortAc` は対象外）。
- **p5-2 レビュー→p8 リンク（item③）**：各レビュー本文 `.rv-body` 直後に `.p5-2-review-link.ktn-guide-link`（p8 へ遷移「レビューを見る →」）。**p5-2 カードは `<a>` なので入れ子アンカー回避で `<button>`＋`event.preventDefault();stopPropagation()`**（既存の interest/remove ボタンと同型）。
- **p5-2 オーナー操作メニュー（item④）**：旧「記録から除外」ボタンを縦3点 `.p5-2-menu-btn` に置換し、クリックで body 直下に浮遊メニュー（`.p5-2-menu`）を出す。**body-append の理由＝`.ec` カードが `overflow:hidden` で内包ドロップダウンをクリップするため**（getBoundingClientRect＋scrollX/Y で配置・resize で閉じる）。メニュー項目＝チェックイン日を編集／レビューを書く(無)・編集(有)／[レビューを削除＝有時のみ]／チェックインを削除。`data-has-review` 属性で有無を判定。
- **共通モーダル部品を common.js に新設（p2・p8-11 でも再利用）**：`openCheckinEditModal(opts)`（`.ktn-auth-overlay` 再利用のチェックイン日＋星＋レビュー編集モーダル・保存で `showToast('保存しました')`）／`ktnConfirmModal(opts)`（`.ktn-confirm-modal`・破壊確認・`--danger`／`--primary` ボタン）／`ktnCloseConfirm()`。**別ページで同種UIを作り直さないための単一ソース化**。CSS は common.css に `.p5-2-menu*`／`.p5-2-review-link`／`.p5-2-checkin-date`／`.ktn-confirm-modal*` を追加。
- **pages.js 結線**：`applyRole()` の対象を `.p5-2-remove-btn`→`.p5-2-menu-btn` に変更。`readCard`/`applyCardData`（`.p5-exh-card__reason-row` を再構築＝レビュー有無で日付のみ／日付+星+本文+p8リンクを切替）／`cardAction`（editDate・review・delReview〔チェックイン保持〕・delCheckin〔レビュー有時は併削警告→カード非表示＋年別件数更新〕）／`updateGroupCount`。
- **本番写像（React CSR/Drupal）**：Checkin＝{exhibition, checkinDate}、Review＝{stars, body, photos} を子リソースに。編集/削除の可否は面（p2/p5-2＝full CRUD・p8-11＝編集のみ）でのゲート。空レビュー保存拒否＝バリデーション、レビュー削除＝子リソース DELETE（親 Checkin は残す）、チェックイン削除＝親＋子カスケード DELETE。並べ替えは各面のソートキー（ウォッチ日昇降・追加日昇降・名前）でクエリ。

### 2026-07-14 p2 自分レビュー結線＋p8（レビュー詳細）・p8-11（レビュー編集）新設

- **p8 の右カラム＝「p2 全継承」ではなく「共通部品の部分継承」を採用（コードに残らない設計判断）**。p8 は sitemap 上 `--w-entity`（2カラム）なので構造的に右カラムを持つが、**p2 の展覧会中心ウィジェット（会期/会場facts・action-widget・近くの展覧会 等）を丸ごと複製するとレビュー文脈に合わない**。→ **レイアウト骨格とカード部品（`.ktn-content`／`.p2-layout`／`.p2-side-card`／`.p2-side-ec`＝`buildSideEcCard`／人物カード／`.ktn-related-band`／`.ktn-sub-rec`／`.ktn-more-link`）だけを再利用し、中身をレビュー用にキュレーション**：右カラム＝親展覧会カード＋投稿者カード（`.p8-author-card`・watch 付き）、下部回遊＝おすすめ展覧会（`buildGridEcCard`＋`P2_SUB_REC_DATA` を流用）。**理由＝CSS 共通化方針（部品は再利用）と「ページごとに主役が違う」原則（コンテンツはキュレーション）の両立**。本番も `<ReviewPage>` は共通サイドカード部品を composition し、展覧会テンプレの widget セットは継承しない。
- **p8 のロール可視（getActions 既登録・common.js L1019）**：guest/login＝共有＋「問題を報告する」、user（投稿者本人）＝共有のみ、admin＝共有＋編集/削除。**投稿者本人の編集導線はヘッダーではなくヒーロー内 `#p8OwnerEdit`「レビューを編集 →」（→ p8-11）** に置き、`KTN.pages['p8']` の `syncOwnerEdit`（chained ktnRender）が guest で hidden。
- **p8-11＝編集専用の具体化**：削除UIを持たず（マトリクス通り＝削除は p2/p5-2 へ集約）、**空レビュー保存を JS ガードで不可**（本文空欄・タイトル空欄・星0 のいずれかで `KTN.toast` 警告＋中断）。identity strip は **content variant**（`--content` 展覧会サムネ＋`cb-review` バッジ＋レビュー名→p8、**owner 行に user バッジ＋投稿者名→p5**）＝「編集対象はレビュー（コンテンツ）、操作主体は投稿者（user）」を strip の content+owner モデルで表現。星入力は共有 `.ktn-modal__stars`＋`ktnSetStar`（モーダルと同一部品）を**フォーム内で再利用**（星コンポーネントを作り直さない）。
- **共有モーダルの二重トースト回避を再確認**：p2 の `p2OwnEdit()` は `openCheckinEditModal`（保存で自前 `showToast('保存しました')` を発火）を呼ぶため、**呼び出し側で追加トーストを出さない**（p8-11 は共有モーダルを使わずインライン保存＝独自 `KTN.toast` で問題なし）。
- **本番（React/Drupal）への含意**：レビュー編集フォームは checkin日／stars／title／body／photos を編集。**削除は面（p8-11）に持たせず**、Review 削除・Checkin 削除は p2/p5-2 の CRUD 面に集約する権限モデル。空 body は保存前バリデーションで拒否（Review は body 必須で存在）。

### 2026-07-14 レビュー写真は1枚に統一（入口＝会場チェックインの性格から判断）

- **レビュー写真の上限を「1枚」に確定（コードに残らない設計判断）**。当初は p8/p8-11/チェックインモーダルとも複数枚（最大4枚）想定だったが、**レビューの入口は p2 のチェックインモーダルであり、チェックインは「会場でユーザーにその場で操作させる」動作が主眼**。会場・モバイル・短時間という文脈では複数枚アップロードは摩擦になり流れを止めるため、**「撮って1枚添付して終わり」=1枚が最適**と判断（複数枚選択は"じっくり回顧レビュー"の性格で、この入口と噛み合わない）。
- **反映（3か所を1枚仕様に統一）**：①チェックインモーダル（common.js `openCheckinModal`／`openCheckinEditModal`）のラベルを「写真を1枚添付」に。②p8 詳細＝`.p8-review__photos` を1点表示に。③p8-11 編集＝単一サムネ＋「差し替え」ラベル（**追加ボタン廃止**・`<input type=file>` から `multiple` を外す・help を「写真は1枚まで」に）。
- **本番（React/Drupal）への含意**：Review の photo は**単一（0..1）**としてモデル化。アップロードUIは複数選択を許可せず（single file・置換=差し替え）、モバイル/カメラ起点のワンショット添付を主動線とする。将来複数枚に広げる場合も入口（会場チェックイン）の即時性を損なわない範囲で判断する。

### 2026-07-14 レビュータイトルを廃止（入口モーダルにタイトルが無いため出所なし）

- **Review から「タイトル」フィールドを廃止（コードに残らない設計判断）**。p8（詳細）・p8-11（編集）にはレビュータイトルがあったが、**レビューの入口＝p2 チェックインモーダルはタイトル欄を持たない**（date/stars/body/photo のみ）。よって実際に生成されるレビューにタイトルは存在せず、p8/p8-11 のタイトルは出所のない孤立項目だった。整合手段は「モーダルにタイトルを足す」か「p8/p8-11 から外す」の二択で、**会場・モバイル・短時間という入口の性格（写真1枚化と同じ判断軸）から、入力を増やさずタイトルを外す方を採用**＝レビューは 日時・評価・本文・写真1枚 で構成。
- **反映**：①p8 ヒーロー H1 は「レビュー独自タイトル」を持てないため**レビュー対象＝親展覧会名**（`.p8-head__title`＝「あなたが知らないオノマトペ」、en＝英題）に置換。レビューであることは cb-review バッジ＋投稿者（`.p8-head__author`）＋★評価で判別（＝書評ページが対象作品名を見出しに置くのと同型）。②p8-11＝`#p811Title` フィールド削除・保存ガードからタイトル必須条件を除去（**本文・星のみ必須**）・identity strip の name を展覧会名へ（meta は「チェックイン日」のみに）・`<title>` 更新。
- **本番（React/Drupal）への含意**：Review エンティティに title を持たせない。一覧・見出しは **親 Exhibition 名＋投稿者＋stars** で構成し、レビュー本体の識別子は body 抜粋で代替する。将来タイトルを付けるなら**入口（チェックインモーダル）側にも必ず入力を用意**し、面ごとの有無の食い違いを作らない。

### 2026-07-14 p8 ヒーローの親展覧会導入と H1 の SEO 設計（案A/B ではなくハイブリッド）

- **背景**：レビュータイトル廃止（上項）で p8 の H1 が宙に浮いた。レビューは Exhibition（親）の子で、p8 のパンくずは「Top › レビュー › あなたが知らないオノマトペ レビュー」＝**展覧会を親チェーンに出していない**（レビューを独立カテゴリ扱い）。ユーザー要望＝「ヒーローに展覧会（親）を持ってくる」。
- **H1 の SEO 判断（コードに残らない設計判断）**：3案を比較。**案A＝H1に展覧会名のみ**＝親 p2 の H1 と重複し**キーワードカニバリゼーション**（同語で p2 と p8 が競合し、本来上げたい p2 が弱る）で不可。**案B＝H1「◯◯さんのレビュー」**＝検索語（展覧会名）不在で価値薄。→ **採用＝ハイブリッド：H1＝「展覧会名 ＋ レビュー」**（`.p8-head__title-suffix`）。p2 とは別のユニーク見出しになり、「展覧会名 レビュー/感想」ロングテールを取れ、カニバリも回避。
- **親展覧会の表現**：ヒーロー上部に `.p8-head__parent`（サムネ＋`cb-exhibition`＋「この展覧会のレビュー」＋展覧会名＋会期/会場、**p2 へのキーワード内部リンク**）を追加＝親子構造を検索エンジンにも人にも明示。内部リンクは breadcrumb・右カラム親カードに続く3本目で p2 の評価を補強。`<title>`＝「『あなたが知らないオノマトペ』レビュー — A.K.」は既に理想形で不変。
- **本番（React/Drupal）への含意**：ReviewPage の H1 は `{Exhibition.title} + " レビュー"` を機械生成（親名＋種別サフィックス）。親 Exhibition への内部リンク（サムネ＋会期/会場）をヒーロー内に必ず持たせ、パンくずが親を含まない設計でも階層と内部リンクを担保する。レビュー系ページの見出しはこの「親名＋種別」パターンを既定とし、子ページ単独で親と同一 H1 を作らない（カニバリ防止のガイドライン）。

### 2026-07-14 p8 右カラム・ヒーローの整流（レビューバッジ／投稿者はウォッチ非対象／投稿日をp2形式へ）

- **ヒーローH1にレビューバッジを追加**：`.p8-head__badges`（`cb cb-content cb-review`）をH1直上に置き、ハイブリッドH1「展覧会名＋レビュー」の種別を視覚的にも明示（title-suffix「レビュー」＋バッジの二重サイン）。
- **右カラム親カード見出し「この展覧会」→「展覧会」**（`.p8-side-exh` の `.p8-side-card__title`。en は Exhibition のまま）。指示語を外し名詞ラベルに統一。
- **投稿者カード見出しの英サブ「Reviewer」→「Posted by」**（`.ktn-sec-en`）。p2 右カラムの「投稿者 / Posted by」と表記を揃える。
- **投稿者（user）はウォッチ対象ではないのでウォッチボタンを撤去（コードに残らない設計判断）**：本サイトの**ウォッチ対象はクリエイター・ギャラリーのみ**（人物のうち user は被ウォッチ対象でない）。`.p8-author-card` からウォッチ `<button>` を削除し、孤立した `.p8-author-card__watch` CSS も除去（ゴミ残しの禁止）。投稿者カードは identity＋実績（レビュー/チェックイン件数）表示に留める。
- **投稿日を投稿者セクションへ・p2 と同形式＋最終更新日**：レビュー本文フッターにあった `.p8-review__posted`（投稿日のみ）を廃止し、投稿者カード見出し直下に **`.p2-side-posted__dates`（共通部品）「投稿：YYYY.MM.DD / 最終更新：YYYY.MM.DD」** を配置（p2 右カラムの投稿日ブロックと同一クラス・同一書式）。フッターは `justify-content:flex-end` にし「参考になった」ボタン単独に。見出し直下配置のため `.p8-side-author .p2-side-posted__dates{padding-top:0;border-top:none}` で上罫線を抑制。
- **本番（React/Drupal）への含意**：ReviewPage 右カラムの投稿者ブロックは Exhibition テンプレの「投稿者 / Posted by」部品（投稿日・最終更新日を含む）を共有 composition する。**user は被ウォッチ対象エンティティでない**ため人物カードに watch アクションを出さない（watch は creator/gallery のみ）。日付は Review の created/updated を投稿者ブロックに表示、本文フッターには置かない。
### 2026-07-14 「→」矢印は明示的ナビゲーションCTAに限定（全ページ共通の運用原則）

- **原則（コードに残らない設計判断・ユーザー確定）**：末尾「→」は**「操作としての遷移を明示的に促すCTA」だけに付ける**。具体的には `.ktn-action-btn`（例「取引デスクへ →」）・`.ktn-more-link`（例「もっと見る →」「展覧会ページへ →」）・`.ktn-guide-link`（例「レビューを編集 →」）等の**テキストリンク型ナビCTA**。**カード全体リンク・エンティティ名リンク（人物カード/展覧会カード等）には→を付けない**＝クリック可否は hover の affordance（名前や枠の色変化）で示す。p2 の右カラム（投稿者・親カード等のカードリンク）が→を持たないのが基準。
- **反映**：p8 右カラム投稿者カード（`.p8-author-card`）の末尾→（`.p8-author-card__arrow`）を撤去し、`:hover .p8-author-card__name{color:var(--accent)}` のみでリンクを示す（HTML span＋arrow用CSS＝transform/color を削除）。
- **統一撤去（2026-07-14 ユーザー「撤去を統一してください」）**：
  - p8 ヒーロー親展覧会アイブロウ `.p8-head__parent` の末尾→（`.p8-head__parent-arrow`）を撤去（span＋CSS削除）。カード型リンクは hover の border/shadow affordance のみで示す。
  - 記事/レポートカード内の**展覧会名エンティティ名リンク** `.exh-link__arrow`「→」を p3-2（×4）・p4-2（×3）から撤去。affordance は `.exh-link:hover .exh-link__title{text-decoration:underline}` を残置。死にCSS `.exh-link__arrow`＋hover変位を削除。未使用の兄弟 `.rc__exh-arr`/`.ac__exh-arr`（HTML/JS未参照）も同時に削除（基底 `.rc__exh-link`/`.ac__exh-link` 自体も未使用の死にコンポーネント＝別途整理）。
- **走査結果の分類（fixページ）**：
  - **撤去＝カード/エンティティ名リンク**：`.exh-link__arrow`（p3-2/p4-2・撤去済）。
  - **維持＝ガイドナビカード（2026-07-14 ユーザー確定「ガイドページの表現として据え置き」）**：`.ktn-guide-nav-card__arrow`（p70 ×3 / p70-1 ×1）。media＋テキストのカードで原則上は撤去候補だが、p70 専用の意図的スタイル（Bodoni light 矢印＋hover 左シフト）を持つ**ガイドページ固有の表現**として据え置く。＝カード原則の明示的な例外。
  - **維持＝明示ナビ/非ナビ**：`.p3/p4-archive-link__arr`（"アーカイブN件を掲載中 →"＝一覧へのテキストCTA＝`.ktn-more-link` 相当）／`.p2-side-link__arrow`（p6/p6-1/p6-2 の chevron「›」サイドナビ行＝別語彙・明示ナビメニュー）／`.p211-sub-link__arr`（mgmtフォームのアクションリンク）／`.p316-ship-route__arrow`（A→B 配送方向・非ナビ）／`.p70-flow-diagram__arrow`（実体は「—」ダッシュ連結・非矢印）／`.p10-presets__arr`（‹›スクロールボタン・UI操作）。
- **本番（React/Drupal）への含意**：ナビ用語彙を2層に分ける——(1)テキストCTAリンク＝末尾→（`ActionLink`/`MoreLink`/`GuideLink` 相当）、(2)カード/エンティティリンク＝矢印なし・hover affordance。コンポーネント設計時にこの区分を型で固定し、カードに矢印を生やさない。chevron「›」サイドナビ行は別語彙として許容。

### 2026-07-15 p2 チェックイン&レビュー（自分の記録）UI 修正

- **自分のチェックイン&レビューは3状態を持つ（コードに残らない仕様判断）**：`own` の記録状態は **未投稿（has:false）／チェックインのみ（has:true・hasReview:false）／レビュー済（has:true・hasReview:true）** の3つ。**チェックイン日は「チェックインのみ」以上で常に存在**（レビューはチェックインに後付けされる子）＝「チェックイン日ありレビュー無し」が正常な中間状態。デモは p2 デモバー「自分の記録」トグル（`setP2Own`）で切替えるが、**本番は API/Drupal が返すユーザーの記録有無から算出**する（トグルは検証用）。「未投稿」時のみ大型CTAが「チェックインしてレビューを書く」（`openCheckinModal`）になり、それ以外は「レビューを編集/書く」。
- **本人レビューの表示名はサイト共通の demo ユーザー identity（山田 花子）を使う**：role=ユーザー時に「あなた」表示は誰の記録か曖昧だったため、**p5 マイページの demo ユーザー（山田 花子）と同一の表示名**に統一（アバターイニシャル「山」）。「あなたの投稿」タグで所有を別途明示。他者レビューは handle 風表記（A.K./mari_t 等）だが、本人だけは identity を明示して混同を避ける方針。本番は当該レビューの著者（＝ログインユーザー）の表示名をそのまま出す。
- **レビュー行から右上の投稿日を全撤去（本人＝2026-07-15 / 他者＝同日追加指示）**：本人レビュー（`.review-item--own`）はオーナー操作用の3点メニュー（`.p2-rv-menu-btn`＝absolute top12/right14）が右上の `.rv-date` と物理的に重なっていた。**本人行の rv-date を撤去**＋保険で `.review-item--own .rv-hd{padding-right:26px}`。**他者カードも同日ユーザー指示で rv-date を撤去**（投稿日は詳細ページ p8／チェックイン日は名前行に併記で足りる・カード上の日付重複を排除）。`.rv-date` の CSS 定義自体は残置（他ページ用の可能性）。

### 2026-07-15 p2 チェックイン&レビュー（他者カード）UI 修正

- **他者レビューカードもレビュー導線を「レビュー詳細を見る →」に統一（2026-07-14 の矢印使い分けをこの箇所では上書き）**：前回（自分の記録・修正）では「本人＝テキストCTAで末尾→／他者＝カード全体リンクなので chevron『›』」と form で分けたが、ユーザーが**他者カードも本人と同じ『レビュー詳細を見る →』文字形式に合わせる**よう明示指示。よって他者レビュー有カードは旧 `.rv-more`（chevron SVG）を撤去し、`.rv-body` 末尾に `.p2-review-link ktn-guide-link`「レビュー詳細を見る →」を置く（本人カードと同一部品）。カード全体は引き続き `<a href=p8>`。**「カードリンクに→を付けない」原則の局所例外**＝レビュー導線は本人/他者で見た目を揃える方をユーザーが優先した、という判断を記録（他カード種別へ横展開しない）。
- **レビューはチェックインの子＝データモデルを `checkinDate`（必須）＋`hasReview` に再設計**：`RV` から `date`／`ci`（真偽）を廃止し、全エントリが `checkinDate` を持ち `hasReview` で分岐。**「チェックインのみ（レビュー未投稿）」は他者にも存在する正常状態**（mari_t をそれに）。件数（`#p2RvCount`）は**チェックイン件数**なのでレビュー無カードも1件に数える（＝セクション名「チェックイン&レビュー」の意味と整合）。
- **レビュー無（チェックインのみ）カードは本文を出さずヘッダーのみ（2026-07-15 追加指示）**：当初は `.rv-noreview`「レビューは未投稿です。」を出したが、ユーザー指示で**他者の未投稿文言は非表示**に。ci-only カード（`.review-item--ci-only`）は `.rv-body` ごと撤去し、アバター＋名前＋チェックイン日のヘッダーのみを描画（＝「この人はチェックインした」という事実だけを示し、無い物〔レビュー〕への言及をしない）。`.rv-noreview` CSS は削除。本番も未投稿ユーザーはヘッダーのみ。
- **p2 レビュー描画は p2.html インライン `renderReviews` を単一ソースにする（pages.js の旧レビュー IIFE は削除）**：p2 のチェックイン&レビューは長らく `kotennavi-pages.js` の IIFE（`#p2ReviewList` に `LIMIT=3` の折りたたみ〔`.p2-rv-more`＋`.p2-rv-toggle`「残りN件を見る」〕付きで描画）で出していたが、own カード＋3状態デモトグルを載せるため p2.html にインライン `renderReviews` を新設。**両者が同じ `#p2ReviewList` に書き込み、`syncP2Own`（＝renderReviews）が毎レンダー後勝ちで上書き**していたため、pages.js 側の折りたたみが実質消えていた（＝「4件以上のもっと見るが無くなった」の原因）。**インライン `renderReviews` に折りたたみを移植**（`OTHER_ITEMS` 配列化→`RV_LIMIT=3` slice→超過を `#p2RvMore`/`#p2RvToggle`）し、pages.js の旧 IIFE（L352-414・yuki88 含む4件・rv-date/「詳細を見る」旧書式）を削除して二重描画を解消。**本番でもレビュー描画ロジックは1箇所に集約**（own カード有無・折りたたみ・チェックインのみ分岐を全て同じ関数で扱う）。React 化時は `<ReviewList limit={3}>` 相当に集約する。
- **チェックインユーザー名にユーザーページ（p5）リンク／カード全体リンクを廃止し `<div>`＋内部リンク構成へ（2026-07-15 追加指示）**：ユーザー指示で各チェックインユーザー名を `kotennavi-p5.html`（ユーザーページ）へリンク（`.rv-name-link`・色継承＋hover下線）。本人カード（山田花子）名も同 p5 へ。**名前リンクを入れると従来のカード全体 `<a href=p8>` と anchor が二重になるため、レビュー有カードのラッパを `<div class="review-item">` に変更**し、`.rv-body` 末尾の `<a href=p8>`「レビュー詳細を見る →」でレビュー詳細へ飛ばす（＝本人カードが元から div＋内部リンクだった構成に他者カードも統一）。**カードは名前=p5／レビュー詳細=p8 の2つの目的地を持つため、単一の全面リンクにできない**という設計判断。p8（レビュー詳細）の投稿者カードが著者を p5 へリンクするのと同じ宛先。本番も名前→ユーザーページ・「レビュー詳細を見る →」→レビュー詳細の2リンク構成。

### 2026-07-15 p2-11 下書き機能：常設「破棄バー」廃止（下書きモデルを②＝一覧＋削除型に整理）

- **廃止したもの**：エディタ内の常設「下書きから復元しました＋破棄する」通知バー（`.p211-draft-notice`）／下書き破棄の確認モーダル（`#p211DiscardModal`）／ページを開いた時点で `localStorage` から**自動復元**する挙動（`if (readDraft()) restoreDraft()`）。関連 JS（`readDraft`／`fmtDraftAt`／`showDraftNotice`／`restoreDraft`／`openDiscardModal`／`closeDiscardModal`／`confirmDiscard`）と CSS（`.p211-draft-notice*` 全5行・common.css）も削除。
- **残したもの**：送信バーの「下書き保存」ボタンと `saveDraft()`。`.p211-modal` CSS は保存確認モーダル（`#p211ConfirmModal`）と共用のため保持。
- **`saveDraft()` は薄いスタブへ減量（2026-07-15 追・localStorage 直列化を撤去）**：当初は localStorage へフォーム値を直列化（`DRAFT_KEY`／`DRAFT_ADDED_LISTS`／`draftEls()`）していたが、自動復元を消した時点で**書くだけで誰も読まない**write-only コードになった。加えて後述のバックエンドモデル（フラグ違いの同一保存）だと下書きは別ペイロードを持たず、直列化を"下書きペイロードの見本"として残す名目も消える。よって `saveDraft()` は**トーストのみ**に減量し、`DRAFT_KEY`／`DRAFT_ADDED_LISTS`／`draftEls()`（いずれも saveDraft 専用になっていた）を削除。
- **バックエンドモデル（React/Drupal 前提・確定）**：**本番の下書きは別ストア（別テーブル/別リビジョン種別）ではなく「確認依頼フラグ OFF での保存」**とする。「下書き保存」＝保存(flag OFF)、「保存して確認依頼」＝保存(flag ON→管理者確認→公開)。**両者は同一の保存処理・同一ペイロードで、渡すフラグ値だけが違う**。Drupal 側は既存の「確認済み」チェック（未確認＝下書き状態）と整合する。React CSR 化時は1本の save 関数に `requestReview: boolean` を渡す形にし、下書き専用の保存パス/直列化は作らない。
- **Why（コードに残らない判断）**：ユーザーからの一連の問い（①この復元通知は必要か？②「下書き保存で保存した内容は開くと常に前回下書きから再開するのでは？」だとすると破棄は何を破棄する？③破棄は復元後の「キャンセル」と同義では？④そもそも下書き保存に『破棄』が伴うサイトをあまり見ない）が示すとおり、**「常に自動復元＋その場で破棄」というハイブリッドは一般的な下書きUXから外れており混乱を招く**。よく見る型は①離脱時ダイアログ（Twitter/メール＝保存/破棄）②下書き一覧＋削除（WordPress/note/フリマ）③自動保存＋履歴（Googleドキュメント）で、**②を採用**＝破棄は「エディタ内の常設操作」ではなく「下書き一覧側の削除」に属する行為とする。よってこのページからは破棄導線を外し、破棄＝一覧の削除へ寄せた（下書き一覧ページは本スコープ外＝未制作）。
- **How to apply（React/Drupal 示唆）**：本番の下書きは Drupal の未公開リビジョンとして持ち、**下書き一覧UI（将来）で「削除」を提供**する。編集画面は「下書き保存」のみを持ち、開いた瞬間に無条件で前回下書きへ差し替える自動復元はしない（明示的に下書きを開いた時のみ内容を読む）。**離脱時に未保存変更があれば確認ダイアログを出す①は"さらに自然"な追加としてユーザーに提案済みだが、dirty-tracking の実装コストがあるため今回は見送り**（将来フォーム整備時に判断）。

### 2026-07-15 p2-5⇄p2-12／p2-5-1⇄p2-12-1 整合性：ページ内カウントのみ揃える（ページ間不一致は容認）

- **チェック結果**：表示ページの作品グリッド（`kotennavi-pages.js` の `#p25Grid`＝p2-5:12点/3作家・p2-5-1:15点/3作家）と、管理ページの初期表示（`#p212WorkList`＝p2-12:3点・p2-12-1:5点／いずれも田中透のみ）は独立したデモ配列で、件数・作家・価格・状態が一致しない（例：ふわふわ 表示¥88,000⇔管理¥220,000、オノマトペの庭 表示sold⇔管理sale・¥480,000、管理側 w9言葉の重力No.3/w10ざわざわNo.2 は表示に無い）。
- **決定（ユーザー判断）**：**デモデータのため表示⇔管理のページ間不一致は容認し、同期させない**。直したのは各ページ**内部**で矛盾するカウント表示とバッジ誤りのみ（A＋B）。
  - A：表示ページのカウント3か所（見出し `#p25WorksCount`／説明文の「全N点」／サイドリンク `.p2-side-link__desc` の「展示N点・販売M点」）を**実グリッド数へ統一**。p2-5＝全12点・販売5点、p2-5-1＝全15点・販売9点。p2-12-1 の静的 `#p212Count` を 3→5（初期表示5点＝JS `updateCount()` の上書き値と一致・静的値のズレ解消）。「販売M点」の定義＝`status:'sale'` の件数。
  - B：p2-12-1 の identity strip の LIAISON+ バッジが `lb-dot li`（LIAISON青）になっていたのを `lb-dot li-plus`（ゴールド）へ是正（他LIAISON+バッジと統一）。
- **Why（コードに残らない判断）**：本番（Drupal）では表示・管理が同一の作品エンティティを参照するため、プロトタイプのデモ配列が食い違っても実害が無い。プロト段階で両配列を突き合わせて揃える作業コストは後工程に価値を生まないので割り切る。一方で**1ページ内で数字が3通りある/バッジ色が別サービスを指す**のは単純な打ち間違い（コピペ残り）なので是正した。
- **How to apply**：React CSR 化時は表示グリッド・管理リストとも同一の works API を参照し、件数・価格・状態はそこから算出（静的な「全N点」ハードコードを持ち込まない）。

- 2026-07-15 **【表示項目⇔入力項目の整合／販売期間を購入者向けに新設・配送梱包は現状維持】p2-12-1（LIAISON+作品管理）の入力項目に対する購入者向け表示の有無を監査**。管理側の主要入力＝「販売期間」「発送・梱包（発送地/発送時期/発送方法/梱包費）」「展示の説明文」。**(1) 配送・梱包＝p6-2（個別作品詳細）にあれば p2-5-1（作品一覧）には出さない**（ユーザー判断）。理由＝発送地/方法/梱包費は**実際に個別作品を購入する段ではじめて気にする項目**で、一覧はまず「どの作品か・買えるか・価格」を見る場。一覧に発送情報を並べると情報過多になり、個別詳細（p6-2）が持つべき購入直前情報との役割が曖昧になる。→ p2-5-1 は変更なし（既に p6-2 の `.p6-liaison__ship` が発送地=東京都/発送方法=ヤマト宅急便/梱包費=¥1,000 を表示済み・p2-12-1 の入力値と一致）。**(2) 販売期間＝重要項目のため p2-5-1・p6-2 両方に購入者向け表示を新設**（ユーザー判断）。理由＝「いつまでオンラインで買えるか」は購入検討の起点情報で、一覧・詳細どちらの段でも必要。管理側にしか無い（p2-12-1 の販売期間 radio）と購入者が締切を知れない。**表示値＝2026.02.18 — 2026.03.19**（p2-12-1 の `plus2w`＝会期終了後2週間 radio が `checked` のデモ値。会期 2026.02.18–03.05 の終了+2週間）。文言はサイト内統一＝ラベル「オンライン販売期間」／注記「期間終了後は購入受付を停止します」。**実装**＝p2-5-1＝`.p251-purchase__inner` 内・ご購入グリッド上に `.p251-sale-period` バナー（ダーク背景＋ゴールド枠 rgba(200,169,110,.1)/.32）。p6-2＝`.p6-liaison__left` の price-note と `.p6-liaison__ship` の間に `.p6-liaison__period`（同系ゴールド枠・`--dk-*` 変数準拠）。CSS は common.css の対応ブロック直後（p251＝`.p251-purchase__card-text` 後／p6＝`.p6-liaison__price-note` 後）に namespace 付きで追加。**How to apply**：React 化時は販売期間を works/exhibition API の sale_period（start/end）から算出し、一覧カード群の上（LIAISON+セクションヘッダ付近）と作品詳細の価格ブロック内の双方に同一値で出す。発送情報は個別作品詳細スコープに限定（一覧には出さない）。デモの固定文字列「2026.02.18 — 2026.03.19」はハードコードしない。

### 2026-07-15 p2-12／p2-12-1 作品カードを2段化（状態・価格・取り外しの1行混在を解消）

- **課題（ユーザー指摘）**：各作品行で「販売状態」「価格」「取り外す」が同一行に等価な重みで並び、視覚的に区別しづらく操作性が悪い。特に破壊操作（取り外す）が編集操作（状態/価格）と同列で誤操作を招きやすい。
- **決定＝カードを2段構造へ**：上段＝**識別ゾーン**（`.p2-12-work-card__main`＝ハンドル/サムネ/タイトル・作者・メタ）、下段＝**販売設定ゾーン**（`.p2-12-work-card__settings`＝`var(--paper)` の薄枠パネル）。設定ゾーン内は `.p2-12-field`＋`.p2-12-field__label`（Cinzel系マイクロラベル「販売状態」「価格」）で各コントロールに見出しを付け、何を操作しているかを明示。**取り外しは識別ゾーン右上のラベル付きボタン「取り外す」（✕アイコン＋テキスト・`.p2-12-remove-btn`・hover赤）**へ分離し、編集操作と物理的に離した（当初アイコンのみ案→ユーザー指示で「明確なボタン」に＝ラベルを常時表示）。
- **役割分担**：p2-12（LIAISON）＝設定ゾーンは「販売状態」1フィールドのみ。p2-12-1（LIAISON+）＝「販売状態」＋「価格」2フィールド。ロック済み（販売中＝申込者あり／売約済＝取引完了）カードは取り外し✕を出さず、販売状態フィールドに従来の `.p2-121-lock-info`（ロックバッジ・申込件数・コンソールリンク）を維持。
- **実装**：CSS＝common.css `.p2-12-work-card` ブロックを書き換え（`__main`／`__settings`／`.p2-12-field`／`.p2-12-field__label` 追加、`.p2-12-remove-btn` をアイコン角ボタン化、`.p2-12-work-card__controls` 廃止、レスポンシブ再定義）。`.p2-121-price-wrap__input` を 80→96px に微増（ラベル下で単独表示になるため）。**flex のみ**（grid不使用）。JS＝pages.js の p2-12／p2-12-1 両 makeCard を新DOMへ更新。`handleRemove`／`syncPrice`／SortableJS（handle=`.p2-12-work-card__handle`）はセレクタ据え置きのため無改修。
- **Why（コードに残らない判断）**：760px 幅の管理ボックス内で input（価格）・select（状態）・button（取り外す）を1行に詰めると、種類の違う3操作がラベルなしで等価に見え、破壊操作が最も右で「ついで感」なく押せてしまう。**ゾーン分割＋ラベル＋破壊操作の物理分離**で、編集（設定パネル）と削除（コーナー✕）を形と位置で見分けられるようにした。ロックカードで✕を出さないのは、申込・取引が進んだ作品を管理画面から一発除去できないようにするガード（LIAISON+ ロック/凍結モデルと整合）。
- **How to apply（React/Drupal 示唆）**：作品カードは `<WorkCard>` の中で識別部と設定部を別ブロックに分け、設定コントロールはラベル付きフィールドで構成。取り外しは identity 部のアイコンアクション。ロック状態（申込者数>0 or 取引完了）は API のフラグで判定し、その場合は remove を出さず状態フィールドをロック表示（コンソール導線）に切り替える。
- **作品名タイトルを2行折り返しに（追・ユーザー承認）**：`.p2-12-work-card__title` の `white-space:nowrap;text-overflow:ellipsis` を撤去し `-webkit-line-clamp:2`（最大2行）へ。**Why**＝取り外しボタン（ラベル付き）が識別ゾーンの横幅を取ると、1行省略では作品名末尾の連番（例「◯◯の造形 I」「II」／「No.3」）が真っ先に切れ、管理リストで works を取り違える。管理画面は正確な識別が最優先なので、省略より全文（2行）表示を採る。作者・メタは従来どおり1行省略。これにより「取り外す」ラベルを全ブレークポイントで維持できる（横幅を奪われてもタイトルは切れず折り返すだけ）。**How to apply（React）**＝管理・編集系リストの作品名は clamp 2行を既定にし、公開側カード（`.aw__title` 等）の1行省略とは別扱い。
- **モバイルの2トラック化（追・ユーザー承認）**：スマホで p2-12-1 の「販売状態＋価格」が縦積みになりカードが高くなる指摘を受け、カード種別で扱いを分けた。**編集可カード＝状態＋価格は横並び維持**（≤400px の縦積みルールを撤去。溢れた場合のみ `flex-wrap` で価格が下へ回る＝グレースフル）。**ロックカード（申込中＝販売中＋申込者／売約済）＝別トラック**＝`.p2-12-work-card__settings--locked`。ラベル付き2フィールド（販売状態/価格）をやめ、**読み取り専用サマリー行**（`.p2-121-locked-summary`＝バッジ＋件数/取引完了＋**読み取り価格 `.p2-121-locked-price`**）＋**コンソール導線**に再構成。モバイルではサマリーを縦積み＋`コンソールで操作 →` を**全幅ボタン**化（一番押してほしい導線を大きく）。
  - **Why**：ロックカードは編集不可（この画面での操作はコンソール遷移のみ）で、かつ「バッジ＋件数＋導線」と情報量が多い。編集フィールドの体裁（入力欄・ラベル）を与えるとロック済みなのに操作可能に見え、かつモバイルで幅が足りず縦に伸びる。**編集する行と「操作済み→コンソールへ誘導する行」を構造ごと分ける**ことで、見た目で役割を区別しつつモバイル高さも抑える。価格はロック時に編集不可の入力欄を出すのをやめ読み取りテキスト（`toLocaleString` でカンマ表示）に。死にCSS `.p2-121-lock-info` は削除。
  - **How to apply（React）**：`<WorkCard locked>` のとき settings を編集フィールドではなくサマリー＋コンソールCTAでレンダー。locked 判定＝申込者数>0 または オンライン取引完了。価格はロック時 read-only 表示。編集可カードはモバイルでも状態/価格を横並びにし、幅不足時のみ wrap。
  - **ロックカードをカード単位でも視覚的に区別（追・ユーザー指摘）**：当初はロックカードも編集可カードと同じ白枠＋青 paper パネルで、設定ゾーンの中身（サマリー vs 編集フィールド）だけ違う構造だったが、パッと見の区別が弱かった。**カード全体に `.p2-12-work-card--locked`（muted 背景 `#ecebe6`＋枠 `#d9d7cf`）を付与**し、白＋青パネルの編集可カードから一段沈める。ロック設定ゾーンも muted グレー `#e3e1da` にし、**先頭にロックアイコン＋「この画面では編集できません（コンソール／取引デスクで管理）」ヘッダー（`.p2-121-locked-head`）を追加**して、なぜ操作できないかを明示。サマリー（バッジ＋件数＋読み取り価格）とコンソール導線は `.p2-121-locked-row` に収め、モバイルは縦積み＋コンソール全幅。**Why**＝ロック済み（申込・取引が進行中）と編集可を色・アイコン・文言で三重に差別化することで、「ここで状態/価格をいじれるカード」と「コンソール/取引デスクへ行くべきカード」の取り違え・誤操作を防ぐ。muted 化はグレーアウト（無効・沈黙）ではなく「この面では触れない＝別の面で管理」の意味で、状態バッジ・件数は通常色のまま残す。**How to apply（React）**＝`locked` バリアントのカードは背景・枠を muted にし、settings に lock アイコン＋管理先の案内テキストを付ける。ロック理由（申込中／取引完了）で導線先（コンソール／取引デスク）を出し分ける。
  - **【前項のグレーアウト案を撤回】ロックカード＝状態色アクセント帯＋CTAパネルへ差し替え（追・ユーザー指摘で確定）**：上記の muted グレー化（カード `#ecebe6`／設定ゾーン `#e3e1da`／ロックヘッダー `.p2-121-locked-head`）は**ユーザーに却下**（「いまいち・グレーアウトではない他の提案は」）。グレーアウトは「無効・沈黙」に見え、**別の場所（コンソール／取引デスク）で進行中の取引を前向きに把握させる**目的と逆行するため。→ **案A（状態色の左アクセント帯）＋案B（設定ゾーンをCTAパネル化）**で確定。案A＝`.p2-12-work-card--locked{border-left-width:3px}`＋`--applied`（申込中＝緑 `#16a34a`）／`--sold`（売約済＝スレート `#64748b`）の左ボーダー色。案B＝`.p2-12-work-card__settings--locked` を**状態色で淡くティント**（applied `rgba(22,163,74,.06)`／sold `rgba(100,116,139,.07)`・枠も状態色薄・グレーアウトしない）。中身は左＝`.p2-121-locked-info`（`.p2-121-locked-summary` バッジ＋件数＋読み取り価格／`.p2-121-locked-hint` ロックアイコン＋読み取り理由文）、右＝`.p2-121-locked-cta`＝遷移ナビCTA。CTA は**ボタン規約どおりアウトライン＋末尾「 →」**（`.ktn-action-btn` 準拠＝ソリッド塗りはその場実行操作専用のため遷移には使わない）で状態色に枠/文字を着色し hover で塗り（申込中→「コンソールで管理 →」p3-15／売約済→「取引デスクで確認 →」p3-16）。モバイルは info→CTA 縦積み＋CTA 全幅。死にCSS `.p2-121-console-link`／旧 `.p2-121-locked-head`／`.p2-121-locked-row` 削除。**Why**＝ロックは「無効」でなく「この面では編集せず別の面で進行中」の意味なので、沈めるグレーでなく**状態色（緑=申込進行／スレート=取引完了）で識別＋管理先へ誘導するCTA**の方が「今どうなっていて次はどこへ行くか」を肯定的に読める（保存済みメモリ『追加済み状態はグレーアウトより肯定的な状態ラベルで示す』と同原則）。CTA を solid でなく outline にしたのは「青＝その場で実行／アウトライン＋→＝遷移」の学習を崩さないため。**How to apply（React）**＝`<WorkCard locked>` の settings は状態色ティントのパネルにし `state`（applied/sold）で左アクセント色・パネル色・CTA の label/href/色を出し分ける。CTA は navigation variant（outline＋arrow）。グレーアウト・disabled 表現はしない。
- **取り外しの位置・形は複数案を経て「⊕作品追加と対称の⊖丸マーク」で決着（追・ユーザー提案で確定）**：取り外しのタイトル横幅圧迫を解消する過程で4案を試した——(1)ラベル付きボタンをタイトル横（横幅圧迫）→(2)左端ハンドル列にアイコン「−」のみ同居 `.p2-12-work-card__controls`（横幅ゼロだが「わかりづらい」＝却下）→(3)ラベル付きボタンを設定行 `.p2-12-work-card__setrow` の右端へ（ラベルは残るが「独立して見えて違和感」＝却下）→**(4)採用＝下部の作品追加ボタン（`.p2-12-add-btn`＝丸囲みプラス ⊕「作品を追加」）と対称の丸囲みマイナス（⊖）マーク**。取り外しは識別ゾーン `__main` 右上の**丸マーク・アイコンのみ**（`.p2-12-remove-btn`＝`border:none;border-radius:50%`・muted→hover赤・`title="取り外す"` tooltip・テキストラベル廃止）。SVG は追加ボタンと同一の `circle cx12 cy12 r10` に、追加＝縦横2線（＋）／取り外し＝横1線（−）。`__setrow`・`__controls` は廃止し `.p2-12-work-card__settings` を `__main` 直下の単独ゾーンへ戻す（`margin-left:30px` インセット復帰）。p2-12-1 ロックカードは取り外し `!isLocked` で非描画。JS＝両 makeCard で remove を `__main` の body 直後へ移動、`handleRemove` バインドはセレクタ据え置きで無改修。
  - **Why（コードに残らない判断）**：破壊操作をタイトル横のラベル付きボタンにすると横幅を奪い、アイコン単独にすると意味が伝わらず（(2)）、設定行右端に逃がすと孤立して見える（(3)）。ユーザーの解＝**「リストに足す(⊕)／外す(⊖)」を1つの記号系（対称の丸囲み+/−マーク）にする**ことで、(a)アイコン単独でも下部の⊕とのペアで意味が通り、(b)横幅を最小化（19px丸）してタイトルを圧迫せず、(c)追加と取り外しが同じUI言語＝一貫して見える。**アイコン化の是非は「対称の記号系を成すか」で判断する**（別記録『操作ボタンはラベル付きを好む』の例外＝⊕⊖のような確立した対マークはラベルなしでも可）。破壊色（赤）は hover のみで、追加＝ブランド青との色の対比は保つ（形は対称・色は役割で分ける）。
  - **How to apply（React）**：`<WorkList>` の「追加」CTA と `<WorkCard>` の「取り外し」を、丸囲み＋/−の対アイコンで1コンポーネント系（例 `<CircleMarkButton variant="add|remove">`）にする。remove は card 識別部の右上、icon-only＋`aria-label`/`title`「取り外す」、locked 時は非描画。タイトルは2行clampのまま（丸マークは小さく幅を奪わない）。
- **記号系を候補グリッドへ拡張＝候補カードに ⊕ マーク／追加済みは ✓ 反転（追・ユーザー承認）**：下部「作品を追加」パネルの候補グリッド（`.p2-12-candidate-card`）にも同じ丸囲み記号系を適用。各候補サムネ右上に**青い ⊕ 丸マーク**（`.p2-12-candidate-card__mark`＝一覧⊖・`.p2-12-add-btn`⊕ と同一の circle+plus SVG）を重ね「押すと足せる」を明示。**追加済み（`is-added`）は ⊕→✓ 反転**（丸をブランド青ベタ塗り＋白チェックの polyline SVG）し、旧グレー「追加済み」テキストチップ（`.p2-12-candidate-card__added` の markup と CSS 2ルール）を廃止・置換。②の判断＝**追加済み作品は候補グリッドから消さず残す**（薄グレー無効化）。実装＝カードは opacity を全体でなく `__thumb`＋`__info` のみ .5 に落とし、✓マークは全不透明で明瞭に読める（`.p2-12-candidate-card` に `position:relative`、mark は直下 span で `__thumb` の外＝dimming の影響を受けない）。CSS＝common.css `.p2-12-candidate-card` ブロック（旧 `__added` 2ルール → mark 3ルール＋is-added dim 2ルール）。JS＝両 renderCandGrid の innerHTML にマーク span 追加・`__added` div 削除。一覧側 ⊖ で外すと `handleRemove` が候補の `is-added` を解除＝✓→⊕ に戻る双方向トグルは従来どおり無改修。**flex/grid 据え置き**（候補は既存 grid）。
  - **Why（コードに残らない判断）**：①下部「作品を追加」ボタン自体が ⊕ なのに、その中の候補カードは「クリックで追加」の視覚サインが無く（枠色 hover のみ）、⊕/⊖ の記号系がボタン止まりで一覧⇔候補まで通っていなかった。候補カードにも ⊕ を出すことで**「⊕＝リストに足す／⊖＝外す」を追加ボタン・候補・一覧の3箇所で一貫**させる。②追加済みをグリッドから消す案は却下＝管理用ピッカーは全候補の一覧性（何が展示中で何が未追加か）が価値なので、消さず**✓で状態を上書き**し「残すが押せない」で安定させる（消すと再追加や取り違えが起きやすい）。追加済みの ✓ は旧グレーのテキストチップより締まり、⊕→✓ の反転がクリック結果を即時フィードバックする。
  - **How to apply（React）**：候補ピッカーの各セルは選択状態（added）を持ち、未選択＝**青枠丸＋青 glyph（アウトライン・前面）** / 選択済み＝**白ベタ丸＋✓＋card全体を dim**（greyed card で added を示す）でレンダー。added セルは残置しつつ `pointer-events:none`。一覧側 remove（⊖）と候補側 add（⊕）は**同一の丸ボタン（青枠・白ベタ・青 glyph・円は容器の border-radius で表現しSVGに円環を描かない）を＋/−で出し分ける1コンポーネント**にし、表示リスト（displayedIds 相当）を単一ソースに双方向同期。remove は hover で拡大（scale）。
  - **マークの塗り・✓廃止・取り外しとの同一化（追・ユーザー指摘で2段階是正）**：(1)初版は未追加⊕＝白ベタ／追加済✓＝ブランド青ベタとしたが**完了状態（✓）が未操作の＋より目立つ視覚逆転**が起き、塗りを入替え＝未追加⊕＝青ベタ塗り＋白＋（前面）。(2)**一覧側の取り外し ⊖（`.p2-12-remove-btn`）も候補 ⊕ と同一の形状**に。(3)**最終形（ユーザー指摘で確定）＝青枠（アウトライン）系**：未追加⊕＝**青枠丸（白ベタ・青ボーダー1.5px）＋青の「＋」**／取り外し⊖＝**青枠丸＋青の「−」**（どちらも22px・少し小さめ・box-sizing:border-box）。**取り外しは hover でサイズアップ**（`transform:scale(1.18)`＋淡青bg）。**追加済み＝白ベタ丸＋✓（`__mark-check`）＋カード全体を opacity:.55 でグレーアウト**（thumb/info個別dimは廃し card 全体を1つの opacity で greyed）。**glyph の円環（`<circle>`）は廃し容器の `border-radius:50%` で丸を表現**（＋/−の周りに白い〇が二重に見えるのを解消）。＋/−/✓は round-cap・stroke 2.6・svg 13px。**Why**＝ピッカーで注意を引くべきは「まだ押せる候補（＋）」で完了済みは背景へ引く（行動＝前面／完了＝後退）。ベタ塗り→青枠に変えたのはユーザー最終判断（ベタは主張が強すぎ・枠線の方が管理リストのトーンに合う）。取り外しは色（赤）でなく**hover の拡大**で操作可を示し、＋と同トーン（青枠）で「足す/外す」を glyph（＋/−）だけで区別。追加済みは白ベタ丸＋✓とカード全体グレーの二重サイン。※✓の要否は add→remove→add→remove→**add（白ベタ丸＋✓）** と往復した末に確定。
  - **未追加は＋のみ・ツールチップ・追加済みは「✓ 出品中」ピル（追・ユーザー多段確定）**：最終形の微調整。(1)未追加⊕の丸の中は**＋のみ**（✓を出さない）。(2)未追加候補カードに**hover ツールチップ「出品する」**を付与＝JS で `div.title='出品する'`（追加時に `''` へクリア／一覧⊖で外すと `handleRemove` が `'出品する'` へ復帰）。ラベルを「一覧に追加」でなく**「出品する」**にしたのは、この操作の本質＝LIAISON 一覧への表示＝出品だから（管理者の語彙に合わせる）。(3)追加済みの表現は **「白ベタ丸＋✓＋カード全体グレーアウト」→「左上『✓ 出品中』ピル・グレーアウトなし」へ変更**（ユーザー指示）。右上⊕（`.__mark`）は `.is-added` で `display:none`、左上に `.p2-12-candidate-card__listed`（青ベタ・白文字・角丸pill・小さい✓付き・`z-index:3`）を出す。前段の `::after` 半透明グレー overlay と画像中央の大✓ `__check`／`__check-badge` は撤去。**Why**＝グレーアウトは「追加済み＝無効・沈める」の見え方だが、ユーザーの意図は**「もう出品されている状態」を前向きに示す**こと。状態を沈めるのでなく「出品中」というラベルで明示する方が、管理者が「何が出品済みか」を肯定的に把握できる（`pointer-events:none` は残し再追加は防ぐが、視覚的にはグレーで殺さない）。追加操作＝右上の小⊕/⊖、状態表示＝左上の「出品中」ピル、と操作と状態でマークの位置・形を分ける方針は維持。**How to apply（React）**＝added セルはグレーの無効化でなく状態ラベル（「出品中」バッジ）で表現し、`pointer-events:none` で再追加のみ抑止。追加ボタン（右上小⊕/⊖）と状態インジケータ（左上「出品中」ピル）はコンポーネントを分ける。未選択セルに title/aria「出品する」を付ける。
- **ブラウザ目視確認待ち**（ユーザー確認）：両ページで①カードが上下2段表示②取り外しが識別ゾーン右上の**青枠丸＋青−**（少し小さめ・hover でサイズアップ・tooltip「取り外す」）で下部の作品追加**青枠丸＋青＋**と**同型**に見える③タイトルが全幅④設定パネルにラベル付きで状態/価格⑤p2-12-1 ロックカードは取り外しマークなし＋**左に状態色帯（申込中=緑／売約済=スレート）**・設定ゾーンが状態色ティントのCTAパネル（左＝バッジ＋件数＋読み取り価格＋ロック理由文／右＝アウトライン遷移ボタン「コンソールで管理 →」「取引デスクで確認 →」）でグレーアウトしない⑥ドラッグ並べ替えが従来通り⑦非売品選択時の価格入力無効化⑧モバイル＝編集可カードは状態/価格が横並び維持・ロックカードは info→CTA 縦積み＋CTA 全幅⑨候補グリッドの**未追加**カードはサムネ右上に**青枠丸＋青＋のみ**（✓なし）・hover で「出品する」tooltip⑩追加すると **右上⊕が消え左上に「✓ 出品中」ピルが出る・カードはグレーアウトしない**⑪一覧側 ⊖ で外すと候補が右上の青枠＋ に戻り tooltip も復帰。

### 2026-07-16 p2-12／p2-12-1 ロックカードCTA文言＋候補パネルの絞り込み追加

- **①ロックカードCTA・ヒント文言を「操作」→「確認（view-only）」へ**：申込中（販売中＋申込者）・取引完了（売約済）カードは販売状態・価格がロックされ、**取引コンソール／取引デスクもこの面からは操作できない**（進行はコンソール／デスク側で行う）ため、旧CTA「コンソールで管理」は「この画面から操作できる」と誤読させ矛盾していた。→ 文言を view-only に統一：申込中＝ヒント「申込対応中のため、詳細はリエゾン+コンソールで確認して下さい。」／CTA「リエゾン+コンソールで確認」（→p3-15）、取引完了＝ヒント「取引が成立した作品のため、詳細は取引デスクで確認して下さい。」／CTA「取引デスクで確認」（→p3-16）。**ヒントは両方とも「〜のため、詳細は〜で確認して下さい。」の同一フォーマット**（ユーザー指示）。コンソール呼称は既存 p2-12-1.html の表記に合わせ「**リエゾン+コンソール**」で統一（旧「コンソール」単独から是正）。**Why**＝ロックカードのこの画面での役割は「進行中の取引を把握し、詳細な操作は別面（コンソール／デスク）で行う」ための入口。動詞を「管理／操作」でなく「確認」にすることで、カードから直接状態変更できると誤認させない。**How to apply（React）**＝`<WorkCard locked>` の CTA/ヒントは view-only 語彙で、`state`（applied/sold）により遷移先（console/desk）と文言を出し分ける。
- **②候補パネル（「作品を追加」の未追加作品グリッド）に絞り込みを追加**：ユーザーの2つの相談——(1)候補が多い時は並べ替え/フィルターが要るか、(2)gallery（グループ展）では作者別に並べるべきか——への解。**検索（候補が多い時のみ progressive に出現）＋作者チップ（galleryのみ）を1つの作者軸で統合**。
  - **実装（JS注入・両ページ共通）**：HTMLは編集せず、pages.js の p2-12／p2-12-1 両クロージャに同一ロジックを注入（`#p212CandidateGrid` の直前に `.p2-12-cand-filter` バーを `insertBefore` 生成）。`syncCandFilter()` が2条件を**独立判定**——`showSearch = allowed.length > CAND_FILTER_MIN(=10)`（候補総数が閾値超で検索欄）／`showChips = isGalleryRole()`（gallery で作者チップ「すべて＋作者別件数」）。両方 false ならバー自体を hidden。`candMatch(w)` が作者チップ（`candCreator`）と検索語（`candSearch`・作品名＋作者の部分一致）で AND フィルタ。`renderCandGrid` は該当0件で `.p2-12-cand-empty`（「該当する作品がありません。」）を表示。
  - **フォーカス保持の設計**：検索 input の `input` ハンドラは `renderCandGrid()` のみ呼ぶ（グリッド再描画）。バー自体を作り直す `syncCandFilter()` は **open時・ロール変更時・チップclick時のみ**呼ぶ（入力のたびにバーを rebuild すると input がフォーカスを失うため）。ロール変更時は ktnRender ラッパで `candCreator=''` リセット→`syncCandFilter()`→`renderCandGrid()`（gallery↔creator で作者候補が変わるため）。
  - **CSS**：common.css に `.p2-12-cand-filter`（チップ列＋検索を縦積み）／`__chip`（pill・active はブランド青ベタ）／`__chip-n`（件数・Montserrat muted）／`__search`（focus-within で青枠）／`__input`／`.p2-12-cand-empty` を追加。モバイル（≤540px）で左右 margin を 16→12px。
  - **Why（コードに残らない判断）**：(1)並べ替え/フィルターは「候補が少ない通常時は不要・多い時だけ邪魔にならず出る」progressive disclosure が管理UIとして最適（常設だと少数候補で過剰）。(2)gallery の作者別グルーピングは、リストを物理的に作者ブロックへ割るより**作者チップの絞り込み**にした方が「特定作者だけ見る」需要に直接応え、検索と同じ作者軸に畳めて実装・認知が一貫する。閾値10は「1画面で見渡せる上限」の目安（本番で調整可）。
  - **How to apply（React/Drupal）**：候補は**サーバー側の候補クエリ**（この展覧会の出展者∩未追加作品）で導出し全件を積まない。件数駆動の progressive disclosure（`count > threshold` で検索フィールドを出す）＋**作者ファセット**（gallery ロールのみ・出展者ごとの件数付き）。検索は作品名・作者名のインデックス検索に。作者チップと検索は同一の作者フィルタ facet として統合。
- **ブラウザ目視確認待ち**（ユーザー確認）：①ロックカードのCTA/ヒントが view-only 文言（「リエゾン+コンソールで確認」「取引デスクで確認」・両ヒント同一フォーマット）②「作品を追加」パネルで gallery ロール時に作者チップ（すべて＋作者別件数）が出る③候補が10件超のとき検索欄が出る・入力で絞り込み＋フォーカス保持④0件時「該当する作品がありません。」⑤ロール切替（gallery↔creator）で作者チップ・candCreator がリセットされる⑥creator 本人ロールでも検索欄が出る（デモの田中透候補を計12件に増やし閾値10を超えるようにした＝下記デモデータ追記）。

- **追記（2026-07-16 デモデータ）creator 本人でも検索欄を確認できるよう田中透作品を計12件に**：当初デモは田中透（個展＝creator 本人ロールの候補）が p2-12＝8件・p2-12-1＝10件で閾値10を超えず、creator では検索欄が出せなかった（機能は正常・データ不足）。個展の「作品を追加」候補プールは本人の全登録作品で10点超は自然なため、田中透のデモ作品を**両ページとも計12件**に増やした（p2-12＝EXTRA に w9〜w12 の4件／p2-12-1＝EXTRA に w11・w12 の2件・w9/w10 は INITIAL 使用済）。これで gallery（田中透12＋佐藤2＋鈴木2＝16件）・creator（田中透12件）の**両ロールで検索欄の挙動を確認できる**。作者チップは引き続き gallery のみ（個展は全作品が本人＝作者で絞る意味がないため）。ロジック変更なし・デモデータのみ。

- **追記（2026-07-16 追補5点）絞込UIの gating 変更・文言短縮・少数候補デモ**（ユーザー指示5点）：
  - **①作者チップの gating を「gallery 無条件」→「gallery ＆ 候補が閾値超」に変更**（②の記述を上書き）：`showChips = many && isGalleryRole()`（`many = allowed.length > CAND_FILTER_MIN`）。**Why**＝少数候補デモ（下記）で「絞込UIが一切出ない」状態をきれいに作るため、検索とチップを**同一の件数ゲート**に畳んだ。以前は gallery なら候補2件でもチップが出て「少ない時は絞込不要」の progressive disclosure 原則に反していた。**How to apply（React）**＝検索・作者ファセットとも `count > threshold` の同一条件下で出す。
  - **②検索プレースホルダをロール別に**：gallery＝「作品名・作者で絞り込み」／creator（個展）＝「作品名で絞り込み」（`searchPh = isGalleryRole() ? … : …`）。個展は全作品が本人＝作者で絞れないため「作者」の語を出さない。aria-label も同値。
  - **③少数候補デモをデモバーに追加**：`candPoolCap`（>0 で候補を先頭 N 件に制限）＋ `window.p212DemoCands(few,btn)`／`p2121DemoCands(few,btn)`（`few` で cap=8＝閾値10未満・絞込UIが消えることを確認）。既存 `p2121DemoApply` と同じ「グローバル関数がstate変更→再描画→`.on`トグル」パターン。**本番には不要な検証専用**（React 移植不要）。
  - **④ロックカードCTA文言を短縮**：「リエゾン+コンソールで確認」→「リエゾン+コンソール」／「取引デスクで確認」→「取引デスク」（末尾「 →」は `.ktn-action-btn` テンプレートが付与）。**ヒント文言（「〜のため、詳細は〜で確認して下さい。」）は据え置き**＝リンク先の説明はヒントが担い、CTAラベルは遷移先名のみに簡潔化（矢印で遷移を示すため「で確認」は冗長）。
  - **⑤p2-12-1 LIAISON切替モーダルから「（購入確定・キャンセル）」削除**：「コンソールで申込への対応が完了すると切り替えできる」に簡素化（具体操作の列挙を省く）。
  - **未実装の明示**：**未追加作品（候補グリッド）の並べ替え／ソートUIは未実装**。候補は `ALL` データ順で描画・ソートコントロールなし。実装要否はユーザー判断待ち。→ **下記で実装済み**。

- **追記（2026-07-16 候補の並び順UI実装＋プレースホルダ文言）**（ユーザー指示2点）：
  - **①候補グリッドに並び順セレクトを追加**：絞込バーの検索欄と同じ行（`.p2-12-cand-filter__tools` フレックス行）に `<select>` を置く。選択肢＝**登録順（デフォルト＝データ順）／作品名順／制作年（新しい順）／制作年（古い順）**、gallery ロールのみ末尾に**クリエイター名順**を追加。`candSort` 状態を `candSortList(list)` が適用（title/author＝`localeCompare(...,'ja')`／year＝`year` 文字列から数字抽出して数値比較／''＝ソートせず登録順）。`renderCandGrid` は `candSortList(candPool().filter(candMatch))` の順で描画。**Why**＝候補が多い時（閾値10超）の把握を助ける管理UI。ソートUIは**検索と同じ件数ゲート**（`showSearch`＝many）配下に出す＝少数候補では出さない progressive disclosure を検索・チップ・ソートで統一。**creator では「クリエイター名順」を出さない**（個展は全作品が本人＝作者で並べ替える意味がない。ロール切替で `candSort==='author'` になっていたら `syncCandFilter` が `''` にリセット）。**How to apply（React）**＝候補クエリの `ORDER BY` をこのセレクト値で切替。author ソートは gallery ファセット同様ロール条件付き。
  - **②検索プレースホルダの gallery 文言を「作品名・作者で絞り込み」→「作品名・クリエイター名で絞り込み」**（aria-label も同値）。サイト用語を「作者」ではなく「クリエイター」に統一（ロール名・バッジ表記と一致）。creator 文言「作品名で絞り込み」は据え置き。

- **追記（2026-07-17）追加済カードの並べ替えモード＋スマホ調整**（p2-12／p2-12-1）：
  - **①並べ替えモード（案A）**：スマホで作品カードが縦に大きく1画面2〜3枚しか入らず並べ替えが困難、という相談への解。セクションヘッドに `並べ替え`⇄`完了` トグル（`.p2-12-reorder-btn`）を置き、ON で **`.p2-12-works-block`** に `.is-reordering` を付与→カードを**ハンドル＋サムネ＋作品名の薄い行に圧縮**（`__settings`／`__author`／`__meta`／取外しボタン＋**間の補足文 `.p2-12-works-hint`** を CSS で非表示）。**Why**＝ドラッグ（SortableJS）自体は元から常時有効で、真の問題は「1枚が大きく移動先が見えない・移動距離が長い」ことだったため、*編集用の情報を一時的に畳んで並べ替えに集中する表示モード*で解決（案B＝▲▼ボタンは却下：ドラッグの直感性を捨てSortableJSと併存させる複雑さがある）。詳細編集と並べ替えの関心を分離。**トグル対象をリスト（`#p212WorkList`）でなく親ブロック（`.p2-12-works-block`）にしたのは、リストの前 sibling である補足文も同じモードで隠すため**（前 sibling は子孫セレクタでは届かない）。ON 時のボタン文言は「並べ替え完了」（旧「完了」）。**追記（2026-07-17）ドラッグハンドル（サムネ前の点点）は並べ替えモード中のみ表示**（通常時 `display:none`／`.is-reordering` で `display:flex`）。通常時は編集に専念しハンドルを出さない＝**ドラッグは実質「並べ替えモード時のみ」に確定**（当初「両モードで常時ドラッグ可」から方針変更）。**How to apply（React）**＝`<WorkList reordering>` 状態で `<WorkCard>` を compact variant に、補足文も同 state で非表示、ドラッグハンドルも reordering 時のみ描画。ロックカードも handle を持ち並べ替え可（compact 化対象）。
  - **②価格フィールドの「税込」をラベル横へ**：スマホで price-wrap 末尾「税込」が見切れるため、末尾 `.p2-121-price-wrap__tax` を廃し**ラベルを「価格（税込）」**（`.p2-12-field__tax`）に。全サイズ共通。
  - **③追加済カードの設定を右寄せ**：`.p2-12-work-card__settings{justify-content:flex-end}`。p2-12-1＝価格(左)＋販売状態(右)、p2-12＝販売状態のみ右寄せ。ロック `--locked` は `space-between` 維持。
  - **④スマホで保存・キャンセルバーを下部固定**：`.p2-12-form-actions` を `position:fixed`（親 `.p2-12-liaison-section` が overflow:hidden で sticky 不可）。**共通ボトムナビ `.ktn-bottom-nav`（z-index:300・inner64px）の真上**に載せるため `bottom:calc(64px + env(safe-area-inset-bottom,8px))`／z-index:290。当初 `bottom:0` でナビ裏に隠れた不具合を是正済み。

- **追記（2026-07-17）カウンター（件数インジケータ）共通化 `.ktn-count`**：件数表示がページごとに微差で散在していた（淡page-accentピル＝系統B／素muテキスト＝系統C／フィルタ結果数の右寄せ＝系統D）ため canonical `.ktn-count`（common.css `.ktn-tab-head__count` 直後）へ集約中。**Why**＝同種の値・見た目を単一ソース化しページ間の不統一を解消（バッジ・カード共通ルールと同じ思想）。**E（大数値統計 `.p315-summary__count`/`.p414-count`/`.p5-side-stat-row__count`）・F（Cinzel大文字ラベル `.p2-5-works__count`）は役割が別なので統合しない**（据え置き）。
  - **①`.p2-12-count` は塗り丸バッジ→「N件」テキストへ**（前掲）。塗り丸は通知バッジの語彙で、管理系の件数表示（p3-15「出品 N件」等・テキスト式）の中で孤立していたため管理系のテキスト式に寄せた。
  - **②総数と結果の表示場所は分離（ユーザー確定）**：一覧ページで「総数」（`.ktn-tab-head__count`「全 N件」）は**展覧会タイトルの横**、「フィルタ結果数」（旧 `.pN-filter__count`「N件を表示中」）は**フィルターバー内で右寄せ**。当初「結果もタイトル横へ」案が出たが、2つを同じ場所に集約せず**別の場所のまま**とする判断（総数=常時の全体量、結果=フィルタ操作の即時フィードバックで、視線の置き場が違う）。→ 結果数は右寄せ変数 `.ktn-count--result`（`margin-left:auto`）で現状の見た目を維持。
  - **③font-family は --fn 継承**：件数テキストは「N件」等の和文を含むため、base `.ktn-count` は font-family を指定せず body の `--fn`（Zen Kaku Gothic）を継承させる（一部旧クラスが --fm を持っていたが和文が Latin フォントにフォールバックするのを避ける）。
  - **④JSフック維持**：フィルタ結果数は id（`p3FilterCount`/`p4FilterCount`）参照なのでクラス差し替えで無改変。ただし系統Cの一部（`.p3-1-group-count`/`.p3-2-year-count`/`.p5-2-year-group__count`）は JS が **class** で querySelector するため、移行時はそのクラスをフックとして残し `ktn-count` を併記（CSSだけ剥がす）方針。
  - **⑤C（素テキスト系）移行完了（2026-07-17）**：`.p3-1-group-count`／`.p3-2-year-count`／`.p5-2-year-group__count` はクラスをフックとして残し `ktn-count` 併記（④方針どおりCSSは剥がし・year-group は `margin-left:4px` のみ残置）。`.p5-exh-section__count` は id `p5ExhCount` フックなのでクラス自体を `ktn-count` へ置換。**副作用（意図的）**：p5-2/p5 は数字フォントが `--fm`→`--fn` 継承へ変化（③の和文統一と整合）。除外＝`.p10-toolbar__count`（strong が大数値＝E系）・`.p315-index__count`/`.p315-archive-summary__count`（死にCSS・別途掃除）。
  - **⑥セクション総数「全N件/点」もC系に統合（2026-07-18）**：`.ktn-tab-head__count`（p3/p4サブページの「全12件」）は既に `.ktn-` 共有だったが canonical 一本化のため `ktn-count` 併記＋`white-space:nowrap` のみ残置（見た目不変）。`.p2-5-works__count`（p2-5/p2-5-1「全15点」）は**当初F（Cinzel大文字ラベル）に誤分類していたが、「全N点」は英ラベルでなく和文件数なのでC系が正**。重複2定義を削除し `ktn-count` へ統合（ダーク版のみ残置）。**Why**：セクションラベル（Shippori Mincho）はp3もp2-5も同一で、その横の総数だけ書式が割れていた（p3＝素テキスト／p2-5＝Cinzel大文字）＝役割が同じなら見た目も揃える。**副作用（意図的・要ブラウザ確認）**：p2-5/p2-5-1「全15点」が Cinzel大文字＋字間.18em → 素の .75rem muted に変化。
  - **⑦総数の配置をタイトル横に統一（2026-07-18）**：p3-1/p3-2/p3-3/p4-1/p4-2 の「全N件」は従来 `.ktn-tab-head` の `space-between` で右端に寄っていたが、p2-5「全15点」（タイトル直後）と揃えるためタイトル横へ。**共有 `.ktn-tab-head` は変えない**（p5-4 は右に `.p54-edit-link` ボタンを持ち space-between に依存）。`.ktn-tab-head:has(.ktn-tab-head__count)` で**総数を持つ head だけ** `flex-start`＋`align-items:baseline` に上書き（HTML無改変）。**Why**：総数はラベルに従属する情報なのでラベル横が自然。右端は「フィルタ結果数（D系）」の定位置と役割が競合するため空ける。
  - **⑧B（淡ピル系）移行完了（2026-07-18）**：`.ktn-count--pill`（page-accent淡ピル＝active見た目）＋`.ktn-count--pill.is-idle`（tag-bg/muted中立）を canonical 化。移行＝`.p5-1-sec-count`（常時active）・`.p5-list-tab__count`（p5-1/p5-3タイプタブ）・`.p514-tab__count`（p5-14タブ）。**idle↔active はJS無改変で親タブ `.is-active` 駆動を維持**：カウンターは静的に `ktn-count--pill is-idle` を持ち、`.p5-type-tab.is-active .ktn-count--pill,.p514-tab.is-active .ktn-count--pill`（specificity 0,3,0 > 0,2,0）が active を上書きする（**この上書きの塗りは後に⑪でソリッド化。base 淡ピルは常時active sec-count 用に据え置き**）。**Why**：JS（`pages.js` L5391〜）は親ボタンの `is-active` のみ付け外しし件数クラスを触らないため、CSS親コンテキストだけで状態表現が完結する（＝カウンターに状態クラスを持たせずReact移行も `<Count variant="pill" active={isActive}>` で自然）。**副作用（意図的）**：タブ淡ピルの左右padding 7px→8px（sec-count に統一・+1px）。旧の重複base＋idle/active 個別ルール（`.p5-list-tab__count` base／`.p5-type-tab (.is-active)`／`.p514-tab (.is-active)`＝6ルール）を削除。
  - **⑨管理系トータル `.ktn-count--strong`（2026-07-18）**：管理ページの総数（p2-12「N件」・p3-15/p4-15「出品N件」）は表示ページ総数（`.ktn-count` .75rem muted）と**別ティア**＝.82rem/600/ink。共有見た目を `.ktn-count--strong` に抽出し `.p2-12-count`（`--fm`数字＋`::after 件` 残置）と `.p315-works-summary__total`（`margin-right:4px` 残置・p4-15 は `.p315-*` 共用で自動）を統合。**Why**：管理画面の総数は「編集対象の件数」で操作の起点になるため表示ページの軽い meta より視認性を上げる（ユーザーが p2-12-count を .82rem/ink に寄せた判断＝管理ティアの確立）。**対象外（役割別）**：`.p315-summary__count`（E系大数値）・`.p315-ws-sales`（売上サマリ＝金額混在）・`.p315-witem__txns-label`（作品別明細ラベル）・`.p315-archive-result__val`（`--done` 等の色状態を持つ結果値）。
  - **⑩p3-15/p4-15 タブを p5-14 に統一＋終了タブ件数新設（2026-07-18）**：LIAISON+コンソール（p3-15/p4-15）の2タブ（期間中展覧会／終了した展覧会）は独自の `.p315-tab-btn`＋`.p315-tab-badge`（accent塗り白抜き丸）で、取引ワークスペース系（p5-14 `.p514-tab`＋`.ktn-count--pill`）と書式が割れていた。`.p315-tab-btn` を p514-tab 値（.82rem／padding 9px 16px／gap 6px／border-bottom 2px／active＝page-accent+600）へ寄せ、`.p315-tab-nav` の paper 背景＋full-bleed 負マージンを撤去して透明ナビに。件数は⑧のB系へ移行：`.p315-tab-badge` CSSを削除しHTMLを `ktn-count ktn-count--pill is-idle` に。**「終了した展覧会」タブに件数を新設**（両ページ=1＝アーカイブ実数）。**active切替の仕組みも p5-14 に統一**：独自クラス `.p315-tab-btn--active` を廃止し p5-14（`.p514-tab.is-active`）と同じ `.is-active` 方式へ（CSS `.p315-tab-btn.is-active`／HTML `is-active`／JS 2ハンドラ `p315-tab-btn--active`→`is-active`／件数active上書き `.p315-tab-btn.is-active .ktn-count--pill`）。パネル表示切替は `hidden` 属性のまま（挙動不変）。**Why**：管理系タブは1つの語彙に揃える方が学習コストが低く、件数の有無がタブ間で割れている（期間中=有／終了=無）と「終了は0件」に誤読されるため実数を明示。active クラス名も揃えることで p315/p514/p5-type-tab の3タブが同一の `.is-active` 親コンテキストで件数pillを制御でき、React `<Tab active>` へ一本化しやすい。**副作用（意図的・要ブラウザ確認）**：タブ帯の paper 背景消失・タブ文字縮小・active 色 ink→page-accent。
  - **⑪タブ件数pillの active 塗りを淡tint→ロール色ソリッドに変更（2026-07-18）**：⑧の active 上書き（`.p5-type-tab/.p514-tab/.p315-tab-btn` の `.is-active .ktn-count--pill`）を **`page-accent-bg`（rgba .1）→ `var(--page-accent)` ソリッド＋`#fff`／600** に変更。**Why**：creator（青緑 rgba(42,95,122,.1)≈#e9eff2）・gallery（銅）の淡tintは idle の `--tag-bg`(#e8edf2) と実質同色で、active に切り替わっても塗りが変化して見えなかった（p5-14 のピンクのみ tag-bg と差が出て偶然視認できていた）。淡tintは「白背景の CTA widget/facility-badge」向けで、中立グレー idle と隣接するタブ件数では contrast 不足。ソリッドにして全ロールで idle との差を明確化。codebase は color-mix 未使用のため per-role rgba を増やさず単一 `--page-accent` 参照のソリッドで解決。3タブ系統共通ルール＝p5-1/p5-3/p5-14/p3-15/p4-15 が揃って solid 化。常時activeの `.p5-1-sec-count`（`is-idle` 無し＝base 淡tint L3343）は白背景セクション見出しなので据え置き。
  - **⑫`--strong` は「見出しの横」には使わない＝p2-12/p2-12-1 を base に戻す（2026-07-18）**：⑨で `.p2-12-count`（p2-12/p2-12-1「展示作品」h3 横の「N件」）を `--strong` に含めたが、この件数は**見出し `.p2-12-section-head__title`（.82rem/700/ink）のすぐ横**にあり、.82rem/600/ink だと見出しと競合し、さらに数字(600/ink)と自前の `::after 件`(400/muted) の重さがちぐはぐだった。HTMLから `ktn-count--strong` を外し **base `.ktn-count`（.75rem/400/muted）** へ（`.p2-12-count` の Montserrat＋`件` は残置）。→ 数字と「件」が両方 400/muted に揃う。**判断軸＝隣に見出しがあるか**：見出し横の件数＝base（見出しがアンカー・件数は従属メタ）／見出しの無いサマリ行の主役数値（p3-15/p4-15「出品N件」＝バッジ列先頭）＝`--strong`。**Why**：⑨の「管理総数は視認性を上げる」は**アンカーが他に無い**サマリ行でのみ成立し、見出し付きセクションでは見出しが既にアンカーなので件数を強調すると二重になる。`--strong` は p3-15/p4-15 に据え置き。CLAUDE.md「カウンター共通ルール」に使い分けを明記。
  - **How to apply（React）**＝`<Count variant="text|strong|pill|result">`。表示総数=text／管理総数=strong／フィルタ結果=result／タブ=pill（親の is-active で idle/active）。総数と結果は別配置（タイトル脇／フィルタ脇）。管理系タブ（p315/p514）は同一の `<Tab>`＋`<Count variant="pill">` に寄せ、各タブに件数を必ず持たせる。

### 2026-07-18 出品作品にカタログ番号（作品リスト由来）を追加＝手動・任意・固定（並べ替え非連動）

- **決定＝作品ごとの「カタログ番号」を並べ替えと非連動の固定属性にする**：展示会場の作品リスト（Price list）のように出品作品へ番号を付けたいというユーザー相談。番号を付けると並べ替えとの関係が複雑になる懸念があったため、**位置連動の連番（1,2,3…を並び順で振り直す）ではなく、作品固有の固定番号（`w.no`）**にした。並べ替えても番号は動かず、番号順ソートも今回は追加しない。表記は `No.5`。**入力は手動・オプション（空欄可）**、重複・欠番のバリデーションもしない。
- **Why（コードに残らない判断）**：印刷されたプライスリストの No. は「その作品に割り当てられた不変の識別子」で、壁の並び順やカタログの掲載順で変わらない。位置連番にすると①並べ替えのたびに全番号が振り直され②会場で配られた紙のリストと番号がずれる③「No.3 の作品」を指す会話が壊れる。固定カタログ番号なら並べ替え（表示順）と番号（識別子）の関心が分離でき、ユーザーが懸念した「番号付け⇔並べ替えの複雑さ」が解消する。手動・任意にしたのは、会場リストが無い/番号を振らない出品もあり得るため（強制すると空番号の扱いが要る）。番号順ソートを今回入れないのは、まず「番号の表示・入力」だけを最小で入れ、ソート需要が出てから追加する段階導入。
- **表示（番号ありのみ描画・空欄は非表示）**：
  - **p2-5／p2-5-1**（LIAISON/LIAISON+ 作品一覧）＝各ページ固有の `renderWork`（p2-5/p2-5-1 は共通 `buildP25cCard` でなく各自の inline builder）に `noHtml = w.no ? '<span class="p25c__no">No.'+w.no+'</span>' : ''` を追加し、`.p25c__img-bg` 直後・`.p25c__img-title` 前に挿入。見た目＝**カード画像左上のペーパータグ**（白ベタ＋淡い影・`--fm`）＝会場ウォールラベルのメタファー。ダーク（`.p6-dark`/`.p251-dark`）では黒ベタ＋白文字。タイトル接頭辞でなくコーナータグにしたのは、本文レイアウトを崩さず「作品に貼られた番号札」の直感に合うため。
  - **p6**（作品ページ）＝スペック表の**先頭行**に「出品番号 No.N」を追加。p6 は2系統のスペック描画があり両方に入れた（`renderSpecs`→#specsTable ／ `initExtra` の inline `specs`→#p6Specs）。`val: w.no ? 'No.'+w.no : null` で番号なしは行ごと非描画。`_p6Works` に `no` 値を付与（p6-1/p6-2 は `KTN.pages['p6']()` 再利用で自動反映）。p6 の `hideSpecRows` には出品番号を入れていない＝常に出す。
- **管理入力（任意）＝p2-12／p2-12-1**：各作品カードの**識別ゾーン `__main`（サムネイル横）**に番号入力（`.p2-12-work-card__no`＝上「No.」マイクロラベル＋下 `.p2-12-no-input` 幅50px・`--fm`・中央寄せ・`placeholder="—"`・`inputmode="numeric"`・`maxlength=4`）を置く。**設定ゾーン（販売状態・価格）には置かない**。
  - **決定＝番号は識別ゾーンに置く＝ロックカード（申込中/売約済）でも編集可（2026-07-18 案A・ユーザー確定）**：当初は設定ゾーンに「番号（任意）」フィールドを置き、ロックカードでは非表示にしていた。ユーザー指摘「**手動なら申込中・取引完了でも番号の入力/変更は可能にすべき**」を受けて再設計。**Why**＝カードのロック（`--locked`）が凍結するのは**販売状態・価格＝取引の進行に連動する項目**であって、カタログ番号は取引と無関係の**識別子**（会場リスト由来）。番号を沈める理由が「取引項目だから」に当てはまらない。→ 番号を設定ゾーン（ロック対象）から**識別ゾーン `__main`（title/thumb と同じ identity 層）へ移設**し、ロック状態と非連動にした。表示側（p2-5/p2-5-1）も番号を画像＝識別部のタグにしており、管理側も identity 層に置くことで「番号＝識別子」の概念が表示・管理で一貫する。**副次効果**＝p2-12-1 は `__main` が locked/editable 共通で1回だけ組まれるため、番号列を `__main` に置くだけで両カードに自動で出る（分岐不要）。**How to apply（React）**＝`catalog_no` は識別子フィールドとして `<WorkCard>` の identity 部（サムネ/タイトル側）で編集可能にし、取引ロック（price/status の readonly 化）とは独立させる。ロック中でも番号は編集可。
  - **並べ替えモード**：`.p2-12-work-card__no` を圧縮時の非表示リスト（`__author`/`__meta` と同じ）に追加＝並べ替え中はハンドル＋サムネ＋作品名の薄い行に畳む。
- **CSS（common.css）**：`.p25c__no`（`.p25c__lb` 直後・`position:absolute;top:8px;left:8px;z-index:3`＋ダーク版2セレクタ）／`.p2-12-work-card__no`・`__no-label`（`.p2-12-work-card__thumb` 直後）／`.p2-12-no-input`（`.p2-12-status-sel` 直後）。z-index は `.p25c__no`(3) が `.p25c__lb`(2)・`.p25c__img-title`(2)・sold-ribbon(4) と非衝突を確認。設定ゾーン用に一時新設した `.p2-12-field__opt`（（任意）ラベル）は移設で不要になり削除。flexのみ・SortableJS等のセレクタ据え置きで無改修。
- **デモデータ**：p2-5/p2-5-1 の WORKS の一部作品を**あえて番号未設定**にして「任意＝空欄なら出ない」を可視化（p2-5＝言葉の断片 I/II、p2-5-1＝言葉の断片 I・沈黙する形 #3）。p2-12/p2-12-1 の INITIAL・_p6Works にも `no` 値を散らして表示確認できるようにした。
- **How to apply（React/Drupal）**：`catalog_no`（または `no`）を作品エンティティの**任意フィールド**（integer/text）に持たせる。表示は番号ありのみ描画（`{w.no && <CatalogTag>No.{w.no}</CatalogTag>}`）。**並び順（sort/drag）とは別フィールド**で、ソートで番号を書き換えない。番号順ソートを将来足す場合は number 昇順（未設定を末尾）に。管理フォームは任意入力（空許容・重複/欠番の検証なし＝会場リストをそのまま反映）。管理カードでは identity 層に置き取引ロックと非連動（ロック中も編集可）。表示位置＝カードは画像コーナータグ、詳細ページはスペック表先頭行。
- **ブラウザ目視確認待ち**（ユーザー確認）：①p2-5/p2-5-1 で番号ありカードの画像左上に「No.N」ペーパータグ・番号なしは何も出ない・ダーク p2-5-1 で黒ベタ視認②p6/p6-1/p6-2 のスペック表先頭に「出品番号 No.N」行③p2-12/p2-12-1 の**全カード（編集可＋申込中/売約済ロックカードも）**のサムネ横に「No.」入力欄（空欄プレースホルダー「—」）④番号を変えても並び順は不変／並べ替えても番号は不変⑤並べ替えモードで番号列が畳まれる。

### 2026-07-18 作品リスト/プライスリスト（会場配布・QR）機能の方針決定＋P2-6 プロトタイプ実装

会場に置く作品リスト（price list）をリエゾンから自動生成→印刷/PDF/QRで出力する補助機能。**方針＋中身仕様を確定し、read-only ビューを P2-6（`kotennavi-p2-6.html`）として実装**（デモ・ブラウザ確認待ち）。露出フック（P2-11/P70）とQR実生成は次段。

- **目的/位置づけ**：リエゾンの**補助機能**。出品者は会場に作品リストを置くことが多いが、リエゾンに作品を登録するだけでリストが自動編集され、あとは出力だけ＝準備コスト減。**狙い＝「全作品をオンラインに載せる」動機付け**（登録した作品だけがリストに載る＝完全な会場リストが欲しければ全作品を登録する、という"にんじん"）。**Why**＝会場の紙リスト作成は出品者の恒常的な手間で、それをオンライン登録の副産物にすることで「オンライン化のメリット」を具体的な労力削減として示せる。
- **サービスモデル前提（ユーザー確認済・2026-07-18）**：**1展覧会＝{①未利用／②LIAISON／③LIAISON+}のいずれか1つ。L と L+ の同時利用なし**（P2-11 で選択・切替/解除は「申込中」「売却済」が無い場合のみ許可。根拠＝docs/06 L48・L687 の選択UI／docs/07 L88）。→ **作品リストは L と L+ を統合する必要がない**（当初「1展覧会に L と L+ 混在」と誤認していたのを訂正）。使っている片方の管理面から生成する。
- **成果物＝単一の読み取り専用「作品リストビュー」**：これが**印刷レイアウトとQR着地（モバイル表示）を兼ねる**（単一ソース・レスポンシブ）。会場の紙も来訪者がQRで開く画面も同じ「いつもの会場リスト」の見た目。**p2-12（LIAISON・非売）＝価格なしの「作品リスト」／p2-12-1（LIAISON+）＝価格・販売状態ありの「プライスリスト」**。展覧会は片方なので列はサービス設定で一意に決まる。
- **入口（出力の実体）＝利用中の管理画面（p2-12 か p2-12-1）に置く**：1展覧会＝管理面1つなので、ここが唯一の自然な置き場。**p2で束ねない**（統合が不要になったため）。
- **p2オーナーメニューには出力ボタンを置かない**：②③のオーナーには管理画面のショートカットがあり重複になる。**①未利用オーナーへの露出（獲得フック）は"常設メニュー"でなく"意思決定の瞬間"に出す**：**P2-11 の LIAISON/LIAISON+ 選択UIに便益として併記**＋**P70（リエゾン案内/ガイド）の便益リストに1項目追加**。**Why**＝オーナーメニューは操作専用に保ち販促で濁らせない／未利用を選んだ人への常設バナーは押し売り感がある／P2-11 は発見と転換（その場で設定ON）が同じ場所で最適。
- **QRリンク先＝作品リストビュー（p2-5/p2-5-1 ではない）**：会場QRの既定着地は**モバイル作品リスト**。来訪者が期待するのは"手元で開くいつもの会場リスト"＝整然・完全・No.付き一覧で、p2-5/p2-5-1 の回遊型ギャラリー（アクション主体）とは体験が別。**各行タップ→p6（作品詳細）→L/L+の購入/詳細**（リスト＝着地、p6＝転換）。**会場QRは基本1種**（ポスター1コード）。「作品ごとの壁ラベルQR→p6直行」は設置コストが高い**上級オプションとして後段**。
- **カタログ番号（先行実装済み）との関係**：手動/任意・固定の No. が**紙⇔オンラインの一致キー**。作品リストの並びは**No.順を既定**にする想定（将来 p2-12/p2-12-1 に「番号順ソート」を入れる動機にもなる）。
- **How to apply（React/Drupal）**：作品リスト＝`works`クエリ（この展覧会 ∩ 公開作品）から派生する **read-only ルート**。1コンポーネントで**印刷CSS（`@media print`）＋モバイル表示**を兼ねる。列はサービス設定（L/L+）で出し分け。QR生成はクライアント軽量ライブラリ or Drupal 側。P2-11 選択UI・P70 に便益コピーを追加。
- **中身の列構成（ユーザー確認済・2026-07-18）**：**両サービスで最初からグループ展を意識**するため、**作家列は p2-12／p2-12-1 とも必須**（個展でも列は持ち、値が全作品同一なら表示側で畳んでよい）。**販売状態は p2-12（LIAISON・非売）にも出す**（会場の紙リストは非売品/要問合せ等の状態を示す慣習があり、オンライン販売の有無とは別軸）。→ 列は次の通り：
  - **p2-12（作品リスト）**：No. ／ 作家 ／ 作品名 ／ 技法・サイズ ／ 制作年 ／ 販売状態（**価格なし**）
  - **p2-12-1（プライスリスト）**：No. ／ 作家 ／ 作品名 ／ 技法・サイズ ／ 制作年 ／ **価格（税込）** ／ 販売状態
- **ソート＝No.昇順を既定**。番号未入力は末尾にまとめる。
- **ヘッダー＝展覧会名／作家名（代表・グループ展は「ほか」）／会場／会期。フッター＝連絡先＋LIAISON案内文＋一覧QR**。
- **状態・装飾はプレーン表記（ユーザー確認済・2026-07-18）**：**要問合せに「ASK」ラベルを使わない**（販売状態＝「要問合せ」の文言のみ）／**売約済に SOLD バッジを使わない**（状態名テキストで示す・取消線等の可否は実装時判断）／**リストにロゴを載せない**。＝紙⇔モバイル共通ビューは装飾を足さず、状態は販売状態カラムの文言で一貫表示する。
- **未確定（実装時に決める）**：印刷レイアウトの余白・改ページ／QR実生成。

**【露出フック実装 2026-07-18】** handoff の「入口＝利用中の管理画面／獲得フック＝意思決定の瞬間」方針を実装：
- **p2-12・p2-12-1**：展示作品ブロック直下に共通CTA `.ktn-mgmt-export`（`__text`＝タイトル＋説明／`.ktn-action-btn` で p2-6 へ遷移）。p2-12＝「作品リスト」、p2-12-1＝「プライスリスト」と語を出し分け。**Why**＝1展覧会＝管理面1つで、作品を編集している文脈の直下が最も自然な出力入口。CSS は両ページ共有（`.ktn-mgmt-export`・common.css の `.ktn-mgmt-stack` 直後）。
- **P70**：「二つのサービス」比較カードの LIAISON 便益リスト（`.p70-compare__feats`）に「会場配布用の作品リストを自動作成（印刷・QR）」を1項目追加。LIAISON+ は「リエゾンの全機能」で継承するため重複追加しない。
- **P2-11**：LIAISON設定の LIAISON／LIAISON+ 各オプション `.p211-liaison-opt__desc` の末尾に「会場配布用の作品リスト／プライスリスト（印刷・QR）も自動作成できます」を併記。**Why**＝未利用オーナーが利用有無を決めるその場に便益を出す（常設バナーの押し売りを避ける方針どおり）。
- **共通の狙い**＝どの入口も「登録作品からリストが自動で充実する」＝全作品オンライン化のにんじんを言語化。React 化時、CTA は `<MgmtExport service="liaison|plus">`、p2-6 への遷移はサービス設定に応じ variant を渡す。
- **CTAを2ボタンに分割（2026-07-18 追記）**：`.ktn-mgmt-export` の単一「表示」ボタンを `.ktn-mgmt-export__actions` コンテナ内の2つに分けた——(a)「〜を印刷 →」＝p2-6（印刷ビュー）へ遷移（`.ktn-action-btn` a・末尾→＝遷移サイン）、(b)「〜のQRコードを表示」＝その場でモーダル（`.ktn-action-btn` button・矢印なし＝モーダル）。**Why**＝リスト全体を開かずQRコードだけ欲しいケース（会場ポスター掲示・SNS/DL用）があるため、遷移と取得を分離。**QRモーダルは共通関数 `ktnListQr('list'|'price')`**（common.js・作品リスト/プライスリストでタイトルのみ出し分け）。重複を避け p2-12/p2-12-1 でDOMを共有＝`.ktn-auth-overlay`/`.ktn-auth-modal` シェルを再利用し create-on-demand で1度だけ注入（auth modal と同パターン・close は `ktnListQrClose`）。QR画像はプレースホルダSVG、保存ボタンは `KTN.toast('…準備中…')`。React 化時は `<MgmtExport>` が print リンクと QR モーダルトリガーの2アクションを持ち、QR は p2-6 の canonical URL から生成（実生成は次段）。
- **名称を「作品リスト」に統一（2026-07-18・「プライスリスト」呼称を廃止）**：L+（p2-12-1）も含め、UI表示名を全て「作品リスト」に統一（英＝Artwork List）。旧 L+＝「プライスリスト／Price List」呼称は撤回。**Why**＝L と L+ でリストの名前が割れると同一機能に見えず分かりにくい。**L/L+ の差は「価格列の有無」だけで、リスト自体は同一物**なので名前を分ける必要がない（価格の有無は列で表現、名前では表現しない）。対象：p2-6 シート見出し（`#p26ServiceJa`/`#p26ServiceEn` の default＋pages.js `render()` は variant 非依存で常に「作品リスト／Artwork List」）・p2-6 デモトグル・p2-12-1 の出力CTA（title/desc/2ボタン＋`ktnListQr('list')`）・p2-11 の LIAISON+ desc・common.js `ktnListQr`（label 常に「作品リスト」、`kind` 引数は将来の出し分け用に受けるが表示名には使わない）。**価格列の出し分け（`body.p2-6-plus`）は据え置き**＝名称統一と価格表示は別軸。

**【改訂 2026-07-18・P2-6 レビュー後】** 上の「列構成」「装飾」の一部をユーザーレビューで変更（この改訂が正）：
- **販売状態列を全面撤去**（p2-12・p2-12-1 とも）。**Why**＝販売状態は会期中に随時変化するが、印刷した紙リストは変化に追従できず古い情報を配ることになる。→ **販売状態は各行リンク先の p6（作品ページ）を単一ソース**にし、リスト（紙・モバイル共通ビュー）は状態非依存で刷れる形にする。上の「販売状態を p2-12 にも出す」決定は**撤回**。
- **価格非公開の作品は L+ の価格欄に「ASK」表示**（`.p26-list__ask`・muted）。非売品／要問合せ／売約済など価格を出さない作品を価格列内で自然に表現（別バッジや状態列を持たない）。※以前「ASK ラベルを使わない」としたのは"状態列内の装飾"としての ASK を指し、ここでの ASK は**価格列の値**（価格の代替）＝別用途。
- **列順を「作品名 → 作家」に変更**（旧「作家 → 作品名」）。作品リストは作品名が主役のため先頭寄せ。
- **No. は数字のみ**（各行の「No.」接頭辞を廃止・ヘッダー行の「No.」だけで足りる）。
- **ヘッダーの作家メタ行を撤去**（作家は列側にあり重複）。ヘッダーは サービス名／展覧会名／会場／会期。
- **作品リスト（LIAISON）には価格列を持たせない＝純粋なカタログ**（価格・ASK とも無し）。価格/ASK 列は L+ のプライスリストのみ。→ 改訂後の列：共通＝No.／作品名／作家／技法・サイズ／制作年、L+ のみ末尾に 価格（税込）。
- **No. の直後にサムネイル列を追加**（小・desktop 40px／mobile 60px）。会場リストは作品同定に図版があると探しやすいため。No.（同定キー）の隣に図版を並べる。デモは `.p26-list__thumb`＝作品名から決定的な淡色グラデを生成するプレースホルダ（`<img>` 未登録の枠を他カードと同じ発想で表現）。**React/Drupal 化時は `w.thumb` の `<img>`（作品サムネ）に置換**。印刷でも出るよう `print-color-adjust:exact`。→ 最終列順：No./サムネ/作品名/作家/技法・サイズ/制作年/(L+)価格。

### 2026-07-19 p2-5-1 レスポンシブのガター視認性＋p2-12/p2-12-1 並べ替え中の作品No.表示

- **p2-5-1（ダーク）＝≤900px 限定でガター背景を `#2c3e50` に暗色化**：ユーザー報告「右カラムが右壁に密着して見える」の原因は**レイアウトではなく色**。プローブ計測で p2-5（ライト）とレスポンシブジオメトリはピクセル一致（375px 幅で左右14pxガター・オーバーフローなし）だったが、ガター `#344a5e` とカード `#3e5670` の明度差がほぼ無く余白が視認できなかった。→ `.p251-dark .p25-layout/.p25-main-col/.p25-side-col` を **1カラムになる ≤900px のみ**作品帯と同色 `#2c3e50` に落とし、カードを浮かせる。**デスクトップ2カラムは意図的に不変**（2カラムではカード列が密に組まれガター視認の問題が起きない＋ダークテーマの基調色を変えない）。ルールは既存の背景 `!important` 群より後置（同 specificity・後勝ち）。**How to apply（React/Drupal）**：ダークテーマのモバイル1カラムでは「カード背景と地の明度差」を確保する（p251 パレットなら地=#2c3e50/カード=#3e5670）。ガター幅だけ確保しても同明度なら密着に見える、が教訓。
- **p2-12/p2-12-1＝並べ替えモードでも作品No.（カタログ番号）を表示**：旧仕様は圧縮行で `.p2-12-work-card__no` を隠していたが、**番号を確認しながら並べ替える**（会場リストの No. 順に手で揃える等）ユースケースがあるためユーザー要望で表示に変更。圧縮行ではラベル＋入力欄を横並び・小型化（input 40px/.72rem）。番号は並び順と非連動（固定）のまま＝ドラッグしても番号は変わらない。CSS のみ・クラス共有で両ページ同時反映。**How to apply（React）**：reorder モードの compact row にも `catalog_no` フィールドを含める（編集可のままでよい・ドラッグはハンドル限定なので干渉しない）。
- **（改訂 2026-07-19・ユーザーレビュー後）並べ替え中の作品No.は入力欄でなく表示のみ**：上の「編集可のままでよい」を撤回。並べ替えモードは並び替え操作に集中する画面のため、No.は読み取り専用のプレーンテキスト表示にする（実装＝CSSで input の枠/背景を外しテキスト化＋pointer-events:none、JSトグルで readOnly/tabIndex 切替。通常モード復帰で編集可に戻る）。**How to apply（React）**：reorder モードの compact row では `catalog_no` を read-only 表示（`<span>`）で描画し、編集は通常モードのみ。
- **（追 2026-07-19・ユーザー確認済み）No.列はサムネイルの前**：p2-12/p2-12-1 作品カードの識別ゾーンの並びを「ハンドル→No.→サムネ→作品名」に変更（通常/並べ替え両モード）。p2-6 作品リストの列順（No./サムネ/作品名）と同じ「同定キーが先頭」で統一。**How to apply（React）**：管理カード・リスト系で catalog_no を出す場合は常にサムネより先頭側に置く。

### 2026-07-19 p3-14 ポートフォリオ管理（クリエイター版）新設

- **役割分担＝「作品マスタの入口はロール別の2ページ、フォームは p6-11 の1本」**：p3-14（creator＝ポートフォリオ）／p4-14（gallery＝インベントリー）はどちらも作品リスト管理で、新規/編集/クローンのフォームは持たず **p6-11 へ `?mode=new|edit|clone&author=<key>(&self=1)(&work=<id>)` で遷移**する。p6-11 の `applyEntryParams` を mode=new のみ→ new/edit/clone 受付に拡張。**React**：`<ArtworkListAdmin role>` ＋単一 `<ArtworkForm mode>`。
- **公開/非公開と出品候補の関係（設計仮定・要ユーザー確認）**：p3-14 の「非公開」＝クリエイターページに出さないだけで、**LIAISON/LIAISON+ の出品候補には使える**（出品すれば展覧会側の作品ページでは閲覧可）。ギャラリーインベントリー（常時非公開だが出品可）と同じ整理＝「公開設定はロールページへの露出制御であって、出品可否の制御ではない」。
- **新規作成ボタンの形がロールで異なる理由**：p3-14＝作者が本人固定なので「新規作品を作成 →」（`.ktn-action-btn`・p6-11 へ直遷移＝遷移系）／p4-14＝先に作者を確定させる必要があり作者ピッカーモーダルを開く（`.ktn-op-btn`・矢印なし＝その場操作）。v3 ボタン原則（遷移＝アウトライン+→／その場＝op-btn）の適用例。
- **作者コメントは p3-14/p4-14 のクイック編集項目**：p6-11 の編集フォームにコメント欄が無いため、リスト詳細アコーディオン内の textarea＋保存が入口（出品時に作品ページへ「作者コメント」として表示）。**React**：コメントは artwork エンティティのフィールドだが、編集UIはリスト側 inline に置く。
- **詳細アコーディオン**：行内「詳細を表示 ▾」（遷移しない＝矢印なしテキストボタン）で 公開切替／出品歴／作者コメント を展開。開閉状態は再描画（フィルタ・並べ替え・公開切替）をまたいで維持（openIds）。出品歴は全履歴（開催中＝accent・p2リンク／終了＝muted）、リスト行には開催中のみ表示。
- **`.p314-*` を共有 canonical に**：p4-14 パリティ化（次ラウンド）で既存 `.p414-*` を `.p314-*` へ統合予定（p315/p316 の対ページ共有 namespace と同方式）。件数は canonical `.ktn-count--strong`（p414 の独自 `.p414-count` も統合時に置換）。

### 2026-07-19 出品作品No.＝自由入力を廃止し「並び順の自動採番」へ仕様変更（p2-12／p2-12-1／p2-6）

- **決定（ユーザー指定・仕様変更）**：出品作品に付ける No. は**手動入力の固定カタログ番号（2026-07-18 決定）を廃止**し、**表示リストの並び順（1..N）で自動採番**する。並べ替え（ドラッグ）・追加・取り外しのたびに番号が振り直される。**本エントリが 2026-07-18「カタログ番号＝手動・任意・固定（並べ替え非連動）」および 2026-07-19 改訂2件（「並べ替え中は表示のみ」「No.列はサムネの前」のうち入力欄前提の記述）を上書きする**。No.列の位置（ハンドル→No.→サムネ→作品名＝同定キー先頭）は存続。
- **実装**：
  - **p2-12／p2-12-1（管理）**：makeCard の `.p2-12-no-input`（input）を表示専用 `<span class="p2-12-no-val">` に置換（title「作品番号（並び順で自動採番）」）。各閉包に `renumber()`（`.p2-12-no-val` を DOM順に 1..N で更新）を追加し、初期描画・候補クリック追加・取り外し・Sortable onEnd で呼ぶ。並べ替えトグルの readOnly/tabIndex 切替 JS は input 廃止に伴い削除。INITIAL の `no:` フィールド削除。reorder-bar の注記を「ドラッグで並び順を変更できます（作品No.は並び順で自動採番）」に更新。
  - **p2-6（作品リストビュー）**：WORKS から `no:` を全削除（**配列順＝管理画面の並び順**が単一ソース）。null→Infinity の `sortWorks()` と「—」フォールバックを削除し、`WORKS.map((w,i)=> i+1)` で No. セルを描画＝**欠番・空欄が構造的に発生しない**。
  - **CSS**：`.p2-12-no-input`（＋:focus・reorder 中の枠外し）を削除し `.p2-12-no-val`（`--fm`/.82rem/600/ink/中央/min-width:22px）を新設。
- **（同日追・ユーザー承認）表示側 p2-5／p2-5-1／p6 も並び順由来へ統一**：p2-5/p2-5-1 の WORKS から手動 `no:` を削除し、配列定義直後に `WORKS.forEach((w,i)=>w.no=i+1)` で自動付与（配列順＝管理画面の並び順が単一ソース。renderWork は `w.no` 参照のまま＝欠番・未設定が構造的に消え、旧「任意＝空欄なら出ない」デモ〔言葉の断片 I/II・沈黙する形 #3〕は廃止）。**p6 のみ `no:` 直書きを維持**：作品詳細ページは単体表示で並びの文脈を持たないため、「出品リストの並び順から導出された表示値のデモ直書き」と意味づけを変更（値 5/1/2/3 は p2-5系の配列順位置と一致）。**How to apply（React）**：一覧系＝リストの index から算出して渡す／詳細ページ＝出品リレーションの並び順から算出した値を props/API で受け取る（どちらも保存しない）。
- **How to apply（React/Drupal）**：作品エンティティに `catalog_no` フィールドは**持たない**。No. は出品リレーション（exhibition_works）の **weight／並び順から導出される表示値**（`index + 1`）。管理UI＝ drag & drop で weight を更新→番号は再計算表示のみ（入力UI・バリデーション不要）。作品リストビュー（p2-6）・作品一覧（p2-5系）・作品ページの出品番号も全て同じ並び順から導出し、番号を保存しない。
- **Why**：手動番号は「会場の紙リストと同じ番号を再現できる」利点の一方、入力の手間・重複/欠番・並びとの不一致という管理コストがある。作品リスト（p2-6）を**リエゾンから自動生成する方針（2026-07-18）を踏まえると、番号の起点は紙ではなく管理画面の並び順に反転**する＝並びを整えれば番号も紙も付いてくる方が一貫し、入力欄が丸ごと不要になる。

### 2026-07-19 p2-6 閲覧者別ツールバー／p2-11 掲載順廃止・管理者編集・ページリンク検索／リエゾンモード＋販売期間の会期開始ロック

- **p2-6 印刷案内ツールバーは出品者（オーナー）にのみ表示**（ユーザー指定）：QRコードからアクセスした来場者には `.p2-6` 上部の「印刷して配布／QR掲示」案内バー＋印刷ボタンを出さない。**React**：`isOwner || isAdmin` 条件でツールバーを描画（デモは dbar「閲覧者」トグル＋`p26SetViewer()` で再現）。印刷CSSでの非表示は従来どおり全員共通。
- **p2-11 出展クリエイターの掲載順は廃止＝表示は常に五十音順（アイウエオ順）の自動ソート**（ユーザー指定・仕様）：行の掲載順番号（`__num`）・↑↓並べ替えボタン・`moveArtist()` を削除。**React/Drupal**：出展クリエイターのリレーションに **weight（並び順）を持たない**。表示側（p2-4 等）はクリエイター名の読み仮名でソートして描画（サーバーorクライアントいずれでも可・保存しない）。ソートキー用に読み仮名フィールドが必要な点に注意。
- **p2-11 管理者は「確認済み」でも開催場所・出展クリエイターを編集可**：`setConfirmed` のロック条件＝`confirmed && !isAdmin`。確認済みnote内の「お問い合わせください」誘導文は管理者では非表示（自分で編集できるため）。ロール切替時に再適用（`p211RoleSync`）。
- **p2-11 管理者用ページリンクパネル**（`.p211-admin-link-panel`＝dashed スレート #3a4a5a 枠・管理者専用UIの視覚言語）：
  - 開催場所＝サイト内**ギャラリーページを検索して1件だけ**リンク設定（選択で置き換え）。「ギャラリーページを新規作成 →」で p4-11 を別タブで開く（**p4-11 は未作成＝前方参照**）。
  - 出展クリエイター＝サイト内**クリエイターページを検索して追加**（複数可・重複はトースト拒否）。「クリエイターページを新規作成 →」で p3-11 を別タブ。
  - コンボは既存 `initP211Combo` を再利用し、**`cfg.newMsg` オプションを新設＝自由入力からの新規作成を禁止**（管理者は実在ページのみリンクできる。無ければ新規作成ボタン経由でページを作ってから）。**React**：展覧会エンティティに venue（gallery参照・単一）／exhibitors（creator参照・複数）のエンティティリファレンスを追加し、管理者ロールのみ編集フォームに露出。テキスト開催場所（自由入力）との併存＝リンク設定時はテキスト欄へ名称を同期（表示はリンク優先）。
- **リエゾンモード（利用しない/LIAISON/LIAISON+）と LIAISON+ 販売期間は会期開始日以降変更不可**（ユーザー指定・仕様）：
  - **p2-11**：`applyLiaisonDateLock()`＝編集モードかつ開催期間開始日≦今日で radio 3種 disabled＋locknote。新規/クローンは対象外（未来の展覧会）。**ロックはラベル全体の pointer-events を殺さず radio disabled＋テキスト opacity のみ**＝LIAISON/LIAISON+ 選択肢内の「展示設定」「出品管理」リンクは会期開始後も使う動線なので生かす。日付比較はローカル日付ISO（`toISOString()` はUTCずれのため不使用）。
  - **p2-12／p2-12-1**：モード切替バーのボタンを disabled＋locknote（ペア同時修正）。p2-12-1 は販売期間ブロックも同時ロック（radio・カスタム日付 disabled＋locknote＋hint文言を「会期開始日以降、変更できなくなります」へ変更）。pages.js の旧 `SALE_ACTIVE`（販売開始由来の notice フラグ）は `termStarted` に統合。
  - **How to apply（React/Drupal）**：ロック判定＝**保存済みエンティティの会期開始日 vs 今日**をクライアント表示とサーバー側バリデーションの両方で強制（デモは p2-11＝フォーム値から動的計算／p2-12系＝dbar トグルで再現）。クローン・新規は新しい会期になるため対象外。
  - **保留（要ユーザー判断）**：p2-12-1 発送・梱包ブロックの hint は「販売期間開始後、変更できなくなります」のまま＝今回の指示範囲外。会期開始日ロックへ揃えるかは未確認。
- **Why**：モード・販売期間は公開後の取引条件そのもので、会期開始（＝来場者・購入申込が発生し得る時点）以降の変更は既存の申込・表示との不整合を生むため凍結する。出展クリエイターの並びは「管理の手間なく常に一貫した表示」を優先し自動ソートに一本化。

### 2026-07-19（追）同日修正ラウンド：p2 期間状態のサイドメニュー反映／p2-12-1 通知マージ／p2-11 管理者パネル配置

- **p2 の公開期間状態はタブナビと右カラムサブメニューの両方に反映**（ユーザー指摘＝入口が2つあるのに片方だけ状態表現があるのは不整合）：`_applyPeriodToTab()` が subnav タブと `#p2SideLinkWorks`（この展覧会＞作品）を同一ロジックで同期（まもなく公開/展示終了/プレビュー タグ・一般ロール disabled）。**React**：`<LiaisonEntryState>` 相当の派生状態（period×role→ tag/disabled/preview）を1箇所で計算し、subnav と side menu の両コンポーネントに渡す（各所で再判定しない）。
- **p2-12-1 の「販売期間中」通知は1本化**：旧＝上部帯（申込対応・会場売約済はコンソールへ）＋展示作品セクション hint（購入申込者1人以上の操作はコンソールへ）の2箇所で同内容が重複→**上部帯へマージ**（購入申込者条件を帯文言に取り込み・hint削除）。帯は会期開始後のみ表示（`hidden` が CSS `display:flex` に負けて常時表示になっていたバグを `[hidden]{display:none}` ガードで修正＝**display を持つ通知系クラスには必ず `[hidden]` ガードを併設**する既存原則の再確認）。
- **p2-11 管理者ページリンクパネルは「追加項目」アコーディオン内へ**（ユーザー指定）：本体直下（常時見える位置）ではなく `#p211AccVenue`／`#p211AccArtist` の先頭に配置＝管理者操作は詳細編集の文脈に属する。`.p211-admin-link-panel` の margin は 0（acc-panel の flex gap が余白）。
- **p2-11 出展クリエイター設定数**：サマリ行＋アコーディオンリストラベルに `.ktn-count`（base ティア＝見出し・ラベルの横の従属メタ）で「N名」を表示、renderArtists で一括更新（クラスフック `.p211-artist-count`）。
- **（同日訂正）p2-12-1 の販売期間中通知は上部帯ではなく展示作品セクション下のテキストへマージ**（ユーザー指定）：`.p2-121-sale-notice` 帯（HTML・CSS）を廃止し、`.p2-12-works-hint`（id=p2121SaleNotice・販売期間開始後のみ表示）として販売状態hintの直下に統合。コンソール導線はhint内の `.ktn-guide-link`。**React**：works セクションのヘルプテキスト群の1項目（条件付き表示）として実装＝独立バナーコンポーネントは作らない。


### 2026-07-19（追2）p5-4 コレクションルームの1カラム化

- **p5-4（myコレクションルーム）は右カラム（.p5-side）を持たない1カラムページ**（ユーザー相談→承認）：作品を展示する「鑑賞空間」であり全ロールR の公開ショーケースのため、p5系マイページの2カラム（アクティビティ／もうすぐ終了／関連情報ウィジェット）を継承せず、コンテンツを1080フル幅で広く使う。**p5ヒーロー＋タブナビは維持**＝マイページ動線の連続性は保つ。回遊はページ下部の共通ゾーン（related-band＋おすすめの展覧会）が担う。
- **幅の扱い**：p5系の `.p5-main` 28pxインセットは「wrap flush＋右カラム右端到達」前提の値のため、p5-4 のみデスクトップで左右20pxに上書き（`@media(min-width:861px){.p5-4-page .p5-main{padding:0 20px}}`）＝ヒーロー・タブナビと同じ20pxグリッドに整列（実幅1040）。≤860pxは p5系共通モバイルルールへ委譲。
- **マソンリー余白**：カード幅拡大（約315→490px）に合わせ `.p54-section` padding／`.p54-grid` column-gap／`.p54c` margin-bottom を14–16→20pxへ。**2カラムマソンリーは維持**（3カラム化しない＝「作品を大きく見せる」が目的のため）。
- **削除**：dbar「右カラム：通常/ゼロ」トグル＋`setSideState()`（`p5-zero` はこのページで対象要素が無くなった。本人/他ユーザー・コレクションゼロのデモは維持）。
- **React**：p5系レイアウトは `<MyPageLayout sidebar>` ＋ p5-4 のみ `sidebar={null}`（1カラムバリアント）。サイドウィジェット群（Activity/EndingSoon/Related）は p5〜p5-3 専用で p5-4 に含めない。


### 2026-07-19（追3）p3-14 販売状態・価格は「出品記録」のフィールド（データモデル決定）

- **販売状態（sale）と価格（price）は作品エンティティではなく各出品記録（作品×展覧会のリレーション）が持つ**（ユーザー指摘「表示しているのは最後に出品したときの販売状態か？なら最後の価格も出したい」から確定）：出品時に設定される値であり、同じ作品でも出品ごとに価格が変わり得る（デモ w2＝¥165,000→¥180,000）・売約済も特定の出品で成立する（デモ w6）。
- **ポートフォリオ一覧の販売状態・価格は最新の出品記録から導出**（`hist[0]`＝新しい順）：出品中なら「現在の出品」・過去のみなら「最終出品時」のマイクロノートを添えて出所を明示。**未出品の作品には販売状態バッジを出さない**（作品自体は販売状態を持たないため）。
- **React/Drupal**：作品ノードに販売状態・価格フィールドを持たせない。出品リレーション（LIAISON/LIAISON+ の出品エンティティ＝p2-12系で管理）に sale_state・price を持たせ、ポートフォリオ一覧は最新出品を JOIN して表示。出品歴リストは記録ごとの sale_state・当時の price をそのまま表示（履歴＝当時値の保存）。
- **登録日・更新日はメタ情報として右下に極小表示**（p5-1 ウォッチ日と同レシピ --fm/.54rem/--accent/opacity .72）＝「さりげなく」のサイト内標準レシピとして再利用。
- **新規作成CTAはツールバー（フィルタ行）から独立**：一覧操作（絞り込み）と新規作成（別動線）を同じ行に混在させない。目立たせ方は font-size+padding（v3 ナビ＝アウトライン維持・width:100% にしない）。


### 2026-07-20 p3-14 フィードバック反映（公開切替2入口・作品ページ導線・コメント2入口・全幅CTA）

- **公開/非公開の切替は一覧チップの直接クリック＋詳細内ボタンの2入口**（ユーザー「詳細の中はちょっとわかりにくかった」）：頻度の高い状態切替は一覧上でワンクリック・意味の説明（公開＝クリエイターページ表示/非公開＝出品候補のみ）は詳細内に残す。**React**：`<PubChip onToggle>`＝表示と操作を兼ねるトグルボタン（両入口は同一 mutation）。
- **ポートフォリオ行から公開作品ページへの導線＝「作品ページ →」**：リンク先は導出（出品中→当該展覧会の作品ページ〔LIAISON=p6-1/LIAISON+=p6-2〕＞公開中→通常作品ページ p6＞非公開×未出品→公開ページ無し＝リンク非表示）。管理一覧の行タイトルはリンク化しない（明示ナビCTAのみ→を付ける原則どおりボタンで提供）。
- **作者コメントはとりあえず2入口**（ユーザー判断・正式配置は後で検討）：p6-11 作品編集フォーム「作品説明」ブロック内に「作者コメント」textarea を追加＋p3-14 詳細のクイック編集を残置。**同一フィールド**（React では単一の author_comment を両フォームから編集）。
- **新規作品CTAは p2 チェックインCTA同等の全幅・大型**（ユーザー指定）：`.p314-new-row` の `.ktn-action-btn` を flex:1 全幅化。**ボタン幅方針の例外**＝ページ唯一の主要CTA（p2チェックイン型）は全幅可。ただし色は v3 どおりナビ＝アウトライン維持（solid は実行操作専用）。


### 2026-07-20（追）p3-14 ラウンド3（全幅solid CTA・カードクリック遷移・オーナーメモ・トグルスイッチ）

- **「新規作品を作成 →」は全幅＋塗り（ブランド青solid）**（ユーザー指定「塗りを付けてほしい」）：**v3「ナビ＝アウトライン」原則の明示例外**＝ページ唯一の主要CTA（p2チェックインCTA型）は全幅・solid可。並列ボタン・繰り返し要素内のナビは引き続きアウトライン。**React**：`<NavActionButton hero>` のような専用バリアントとして扱う。
- **作品ページへの遷移はカード（行main部）クリック**（ユーザー指定）：ラウンド2で追加した「作品ページ →」ボタンは撤回し、行の main 部クリックで遷移（title/サムネの hover affordance・矢印なし＝明示ナビCTAのみ→の原則どおり）。リンク先導出（出品中→p6-1/p6-2＞公開中→p6＞非公開×未出品→遷移なし・cursor通常）は前ラウンドの workLink を維持。内側のボタン・リンクはクリック除外。
- **「作者コメント」→「オーナーメモ」に改称＝非公開の備忘録**（ユーザー「オーナー自身が記録・備忘録を付ける欄（付けた価格・誰が興味を持った等）」）：作品ページに表示する公開コメントではなく**本人のみ閲覧の管理メモ**。置き場は p3-14 のみ（管理文脈）＝ラウンド2で p6-11 に足した「作者コメント」欄は削除（公開作者コメントという概念自体を現時点では持たない。将来必要になれば p6-11 の作品コンテンツとして別フィールドで新設）。**React/Drupal**：owner_memo＝作品のオーナー専用プライベートフィールド（公開APIに出さない）。
- **公開/非公開はトグルスイッチ `.ktn-switch`**（ユーザー指定「toggle switchにできますか？」）：チップのボタン化（ラウンド2）から共通スイッチコンポーネントへ置換（新設・コンポーネント表に追加済み）。詳細アコーディオン内の切替ボタン（意味説明つき）は2入口として残置。


### 2026-07-20（追2）p3-14 ラウンド4（2区分構造・公開操作1か所・一覧はマークのみ・塗りはCTAのみ）

- **ページは「新規作品を作成（CTA）／作成済みの作品（セクション）」の2区分構造**（ユーザー指定）：件数の独立行（`ktn-count--strong`）を廃止し、セクション見出し `.p314-sec-head`「作成済みの作品 N件」を新設。公開/非公開の注記・フィルタはセクション見出しの**下**に置く＝リストの付属操作として位置づける。見出し横の件数は base `.ktn-count`（カウンター規則「見出しの横＝base」どおり）。**React**：`<MgmtSection title count>` 的な区分けで CTA とリスト管理を分離。
- **公開/非公開の操作は1か所＝行右肩のトグルスイッチのみ**（ユーザー「1か所でいい」→スイッチを残す判断）：ラウンド2〜3の「2入口」（詳細内の説明付き切替）を廃止。理由＝①頻度の高い操作は一覧上でワンクリックが速い②スイッチは状態表示を兼ねるため詳細を開かず全作品の公開状態が見渡せる③意味の説明（公開＝クリエイターページ表示/非公開＝出品候補のみ）は上部注記が単一ソースで担う。`.p314-detail-pub` CSS 廃止。**React**：pub toggle は行の `<ToggleSwitch>` 1系統のみ。
- **一覧の出品情報は「出品中/未出品」マークのみ**（ユーザー指定）：行に出していた出品先展覧会名＋LIAISONバッジを廃止し、`.p314-item__listed`（page-accent 枠チップ）/`.p314-item__unlisted`（muted テキスト）の状態マークだけに。**出品先の展覧会名・出品歴は詳細アコーディオン内のみ**＝一覧は「どの状態か」、詳細は「どこに」の役割分担。
- **行内ボタン（編集/クローン）の塗り統一はしない**（ユーザー相談「全部塗りを統一した方がいい？ちょっとしつこいかな？」→しない回答）：新規作成＝ページ唯一の主要CTAだから solid が効く。行ごとに繰り返される編集/クローンを solid にすると青が氾濫し「1行に色付きボタンは1つまで」原則にも反する。**繰り返し要素内のナビはアウトライン**の原則を維持（＝唯一CTA例外の適用範囲を「唯一」に限定する運用確認）。


### 2026-07-20（追3）p3-14 ラウンド5（販売状態は詳細のみ・終了記録の状態表示・フィルタ3値・別タブ）

- **一覧行に販売状態・価格を出さない**（ユーザー「詳細の中で表示すべき内容」）：追3 で導入した hist[0] 導出表示（aws バッジ＋価格＋現在の出品/最終出品時ノート）を廃止し、販売状態・価格は**詳細の出品歴内のみ**。一覧の情報階層＝作品の識別（タイトル/メタ）＋公開状態（スイッチ）＋出品状態マークまで。**React**：一覧クエリで最新出品を JOIN する必要がなくなる（詳細展開時に出品歴を取得）。
- **出品歴の開催ステータスは共通 `.sb` バッジで展覧会タイトル横**（ユーザー指摘＝バッジ共通ルール準拠）：独自テキスト表示を廃止し `sb sb-live`（開催中・pulse）/`sb sb-closed`（終了）を展覧会名直後に配置。開催ステータス＝展覧会に付くバッジ、という全サイト共通の位置文法に統一。
- **終了した展覧会の出品記録では進行中の販売状態を表示しない**（ユーザー「終了した展覧会に『販売中』はおかしい」→実装判断）：販売中/商談中/要問合せ＝会期・販売期間中の一時状態のため終了記録では非表示。**売約済・非売品＝結果として残る事実のみバッジ表示**。価格は「当時の出品価格」としてどの記録でも表示（価格改定履歴の参照価値のため）。**React/Drupal**：sale_state はそのまま保存し（履歴改変しない）、表示層で exhibition.state=ended のとき active 系状態をマスクする。
- **出品状況フィルタは3値**（ユーザー指定）：出品中／出品歴あり（現在未出品）／未出品（出品歴なし）＝相互排他。「過去に出品したが今は出していない」＝再出品候補の抽出ニーズに対応。
- **カードクリックの作品ページ遷移は新しいタブ**（ユーザー指定）：`window.open(_blank)`＝管理一覧（フィルタ・開閉状態）の文脈を保ったまま公開ページを確認する用途。**React**：`<a target="_blank">` 相当で実装。
- **セクション名「作成済みの作品」→「登録済みの作品」**（仮・ユーザー最終判断待ち）：ヘッド説明「作品を登録・管理します」・データの登録日・並べ替え「登録が新しい順」と用語系を「登録」に統一。


### 2026-07-20（追4）売約済の手動/オンライン取引完了の区別＝取引完了後の作品ライフサイクル確定

- **売約済は2種を区別する（ユーザー承認・仕様書 第7章「売約済（取引完了）作品のその後の扱い」新設）**：手動売約済＝出品記録の状態（オーナー設定・会場売却等。システムは所有移転を確証できない→出品候補に残り再出品可）／オンライン売約済（取引完了）＝LIAISON+取引完了というシステム事実（所有が購入者へ移転→**出品候補から自動除外・再出品不可・レコード凍結で編集不可**。クローン複製した作品は別レコードとして出品可）。
- **閲覧者には区別を見せない**：公開ページ（クリエイターページ作品一覧・P6）はどちらも「売約済」バッジ（既存の表示統一どおり）。区別が要るのは管理側のみ＝P3-14/P4-14 で「取引完了」マーク＋編集導線非表示＋説明ノート、出品歴では「売約済＋取引完了」補足ラベル。
- **購入者コレクションルーム導線（オプトイン）**：購入者が①コレクションルーム（P5-4）公開＋②当該作品公開の場合のみ、作品ページ（P6）に「現在の所蔵」導線。既定は非表示。クリエイター→作品→コレクター→コレクションルームの回遊ループ＝LIAISON+の価値訴求。**P6側の実装は p6系調整のタイミングで反映（未実装）**。
- **React/Drupal**：出品リレーションに `online`（取引完了由来か）フラグ相当を持たせる（取引エンティティ完了時にシステムが設定・手動売約済とは別値）。作品の「出品可否」は `売約済(online)取引の存在` から導出＝出品候補クエリで除外。P3-14 の編集導線・P2-12系の候補プール・P6の売約済表示/所蔵導線すべて同じ導出を参照する（単一ソース）。
- **QA/ガイドは KTN.QA 単一ソース＋p70-11/p70-12 本文に反映済み**：TXN-S14（出品者＝取引完了後の作品の扱い）・TXN-B10（購入者＝コレクションルーム収蔵と公開）。QAは cat:'liaison-txn' の side 単位で取引デスク/コンソール/ハブへ自動配信されるため個別ページへの転記不要。

### 2026-07-20（追5）p6系への売約済（取引完了）反映
- **P6 ヒーローの売約済バッジ**：`#p6BadgeRow` を JS（p6 initExtra）で再構築し、`status==='sold'` の作品は共通 `aws aws-sold`「売約済」を artwork バッジ横に併記。**公開ページでは手動売約済／オンライン取引完了を区別しない**（仕様書第7章）。React では `<WorkHero>` の badge-row に販売状態 derive を渡すだけ（区別フラグは公開ビューに出さない）。
- **現在の所蔵導線（`.p6-provenance`）**：ヒーロー meta・作品ID行直下の罫線行（マイクロラベル「現在の所蔵」＋ `ktn-guide-link`「購入者のコレクションルーム →」→ P5-4）。表示条件＝**オンライン取引完了 AND 購入者がコレクションルーム（P5-4）を公開 AND 当該作品を公開**（購入者オプトイン・既定非表示）。デモは `_p6Works` の `soldOnline` / `collection.public` フラグ＋ `[hidden]` トグル。本番は取引レコード（online売約）と購入者のコレクション公開設定から derive。
- **デモ連結**：p3-14 w9《ぱちぱち》に `p6id:5` を持たせ `workLink` が `p6.html?id=5` を返す（管理一覧→公開ページの動線確認用）。本番はエンティティIDで自然に解決されるためこのフィールドは不要。
- `.p6-hero__badge-row` は flex+gap:6px 化（バッジ複数併記の共通レイアウト）。

## 2026-07-20（追6）作品ID表示・トグルスイッチ共通化（`.ktn-switch`）

### 決定
- **作品IDを管理カードへ表示**：p3-14 の作品カードのタイトル行を「artworkバッジ → `ktn-aw-id`（作品ID）→ 作品名」の並びに統一（取引ページ p3-15/p3-16 等と同じ規約）。p6 ヒーローの specs 内 作品ID（`.p6-specs-id__value`）は静的直書きをやめ、`_p6Works[].awid` から JS が作品ごとに populate。
- **作品IDの採番は「登録日順の自動連番」**：作品作成時にシステムが自動採番する（ユーザー入力不可）。デモデータは w1《オノマトペの庭》=AW-C42-1847 をアンカーに登録日順で整合する番号を付与。React/Drupal では作品エンティティのシステム採番IDをフォーマット（`AW-{creator}-{seq}`）して表示するだけ＝表示専用フィールド。
- **p5-4 の公開コレクションカード自体には作品IDを付けない**：作品IDは管理メタ情報であり、公開ショーケース（コレクションルーム）の鑑賞面には不要という切り分け。
- **トグルスイッチを共通コンポーネント化**：`.ktn-switch`（common.css canonical・on色=`var(--page-accent)` ロール連動）。p5-4 並び替えモーダルの公開/非公開チップ（旧 `.p54-sort-item__vis-btn`）をスイッチへ置換し旧チップCSSを廃止。ページ側フッククラス（`.p314-pub-sw`/`.p54-vis-sw`）は位置調整のみ。
- 運用ルールは CLAUDE.md「全ページ共通：トグルスイッチ」、HTMLテンプレートは docs/component-html.md「トグルスイッチ」に記載。

### 3. コンポーネント → React
- `.ktn-switch` → `<Switch checked onChange label={{on,off}}>`（role=switch/aria-checked 内蔵・on色は page-accent 継承）
- `ktn-aw-id` 作品ID表示 → `<ArtworkId id>`（エンティティのシステム採番を表示するだけの純表示コンポーネント）

## 2026-07-20（追7）p4-14 作品インベントリー管理を p3-14 へ横展開（パリティ）

### 決定
- **共有 namespace は `.p314-*`（p3-15/p3-16 の対ページ方式）**：p4-14 の一覧・カード・詳細・出品歴・メモ・日付・アクション構造を p3-14 と同一の `.p314-*` に統合。common.css の重複 `.p414-*`（notice/toolbar/filter/list/item/thumb/body/title/meta/exhs/unlisted/edit/empty 等）を削除。件数も `#p414Count`（テキスト）で p314 と同レシピ。**残すギャラリー固有クラスは3系統のみ**＝`.p414-authenticity`（真正性注記）・`.p414-item__author*`（作者行）・`.p414-picker*`（作者ピッカーモーダル）。レスポンシブは `.p314-*` の `@media` が共通適用（p414 専用メディアクエリは廃止）。
- **公開スイッチを持ち込まない（creator/gallery の設計非対称の反映）**：ギャラリーインベントリーは常時非公開（在庫管理用・p4 ページに列挙しない）ため、p3-14 の公開/非公開トグル・`.p314-item__side` 列・`.p314-pub-sw` を**付けない**。`workLink` も creator 版の「非公開でも p6 通常ページを持つ」分岐を持たず、**出品中の作品のみ公開ページ（lp=p6-2/l=p6-1）・未出品/取引完了は null（カードクリック無効）** に単純化。→ 追加1（526行）「gallery は在庫を非公開＝creator と非対称」の実装反映。
- **ギャラリー固有＝作者次元**：p3-14（作者＝本人固定）に対し p4-14 は作者が複数。カード本文に `.p414-item__author` 行（ラベル＋`cb-person cb-creator` バッジ＋作者名）、ツールバーに作者フィルタ（作品の author から動的 populate）、並べ替えに `author`（作者名順・`localeCompare(..,'ja')`）を追加。新規CTA `#p414NewBtn`（全幅ボタン）→ 既存の作者ピッカー（検索付きオートコンプリート・確認↗・同姓同名 mori1/mori2）を開き、選択で `p6-11?mode=new&role=gallery&author=<key>` へ。編集/クローンは `p6-11?mode=edit|clone&role=gallery&author=<key>&work=<id>`。
- **取引完了（online sold）はロールに関わらず同一挙動**：`isSoldOnline`（`sale==='sold' && online`）の作品は編集導線を出さず（クローンは可）、詳細に凍結ノート。g4《朝の気配》=EXH_PAST3 オンライン・セレクションで取引完了、g7《庭の記憶》=会場手動売約（EXH_PAST）で区別。

### 3. コンポーネント → React
- 管理リスト（p3-14／p4-14）は共通 `<WorkInventoryList variant="creator|gallery">`。gallery variant のみ author 列・author フィルタ・author picker を出す。creator variant のみ公開スイッチ列を出す。`workLink` は variant で分岐（gallery=出品中のみ公開）。
- 作者ピッカー `<AuthorPicker source>`＝本番はサーバー検索API（取扱クリエイター＝過去展出展者の和集合）。同名衝突は確認リンク（クリエイターページ別タブ）＋メタ（拠点・ジャンル）で見分け。

## 2026-07-20（追8）ジャンル分類（6区分）を全ページで統一

### 決定
- **サイトの正式ジャンル分類は6区分に確定**：アート / クラフト / ファッション / 写真 / 建築 / その他（taxonomy key＝art/craft/fashion/photo/arch/other）。展覧会・作品・クリエイター・ギャラリーの「ジャンル」選択はこの6区分に揃える。**タグ・素材・技法（絵画/油彩/現代美術/版画 等）は別軸の自由ワード**（ディスカバリータグ）であり、この分類とは混同しない。
- **p6-11（作品）を修正**：旧 art/craft/fashion/arch の4値ラジオを6区分ラジオへ是正（作品は単一ジャンル＝radio）。p2-11（展覧会・checkbox）が既に正だったのでこれに合わせた。
- **p3-11（クリエイター）を修正**：ジャンルを自由テキスト入力（値「絵画・現代美術」）から6区分チェックボックス・ピル群（`#p311GenreGroup`・name=`p311genre`・複数可）へ変換。田中透＝アート checked。`.p211-row` に同居していた活動拠点は独立フィールドへ分離。ピル同期スクリプト（p2-11 と同じ change リスナー式）をインラインで追加。
- **公開表示も分類語へ**：p3.html「ジャンル」=絵画・現代美術→**アート**、p4.html「取扱ジャンル」=現代美術・絵画・写真・インスタレーション→**アート・写真**（クリエイター/ギャラリーは複数ジャンル可）。具体的な技法・素材はタグ側で表現。
- **p1（プロトタイプ）を暫定対応**：フィード絞り込みボタン（`.p1-genre`）を旧7ワード（絵画/写真/版画/書道/現代美術/陶芸/クラフト）から6区分へ。デモ EX の `tags` は自由ワードのままなので、pages.js に `GENRE_MAP`（タグ→6区分）＋`exGenre(x)` を追加し `exGenre(x)===feedGenre` でフィルタ。ファッション/建築はデモデータに該当が無く空表示（プロトタイプの「とりあえず」対応）。
- **p2 系タグバーは触らない**：ユーザー指示で最終のパンくず調整時にまとめて対応（今回は据え置き）。
- **p3-3 のジャンル絞り込みは保留（相談扱い）**：あれは油彩/アクリル/混合技法…＝素材・技法フィルタで6区分とは別軸。同一作者はジャンル横断作品が少なく、タグ/素材は自由ワードのためフィルタとして機能しにくい旨をユーザーが提起。実装変更はせず要判断のまま。
- **p4-11 は未作成**：作成時に6区分チェックボックス・ピル群（name=`p411genre`）で実装する。

### 7. 決定の理由メモ
- **なぜ「ジャンル」と「タグ」を分けるか**：ジャンル=検索/分類の固定軸（6区分・selector）、タグ/素材/技法=自由ワードのディスカバリー。両者を1つのフィルタに混ぜると分類が破綻するため軸を分離。
- **なぜ p6-11 は radio・p3-11/p2-11 は checkbox か**：作品は1点＝単一ジャンル。展覧会・クリエイター・ギャラリーは複数ジャンルを扱いうるため複数選択可。

## 2026-07-20（追9）p3-3 作品一覧のフィルタ整理

### 決定
- **ジャンル絞り込みを廃止**：p3-3 のフィルタバーから素材・技法 select（油彩/アクリル/混合技法/ドローイング/版画＝`#p3FilterGenre`）を削除。カードの `data-genre` 属性（18件）も除去。pages.js のフィルタ関数から `genre` 変数・突合条件を除去。理由＝同一作者はジャンル横断作品が少なく、素材・技法は自由ワードで値がばらつくためフィルタとして機能しにくい（追8の相談への結論）。
- **販売状態フィルタは撤去（出品状況フィルタも不採用）**：一旦「販売状態→出品状況（出品中/未出品）」に置き換えたが、**「出品」＝LIAISON掲載なので展示状況フィルタ（LIAISON+/LIAISON/通常作品）と完全に相関＝重複**とユーザー確定。**出品状況フィルタは削除し、展示状況フィルタ1本に集約**。試作で足した `#p3FilterListing` select・`data-listing` 属性（18件）は撤去済み。`data-status`（sale/sold/nsale）はカードの `.aws` 売却状態バッジのメタとして残置。
- **並べ替え（sort）を追加**：`#p3SortBy`（`.p3-3-filter__select--sort`・margin-left:auto で右寄せ＝フィルタ群と視覚分離）。オプション＝**標準の並び（LIAISON+→LIAISON→ポートフォリオのティア順）／新着順／制作年が新しい順／制作年が古い順／作品名順／お気に入り数順**。
  - 標準＝`TIER`マップ（liaison-plus:0/liaison:1/normal:2）でティア昇順・安定ソート（同ティア内は初期DOM順＝既存キュレーション保持）。新着順＝`data-added`（各カードに付与した登録新しさの整数・降順）。制作年順＝`data-year`（降順=`year-desc`／昇順=`year-asc`）。作品名順＝`.aw__title` の textContent から《》除去し `localeCompare(_, 'ja')` 昇順。お気に入り数順＝`.aw__counter` の数値降順。
  - init 時に `.aw` 初期DOM順を `defaultOrder` に控え、毎回そのコピーを起点に安定ソート。フィルタ（hidden 付与）と独立＝並べ替えは hidden 含む全カードを再整列。制作年ソートは一旦不採用にしたが、ユーザー要望で呼び戻し（`data-year` を再利用）。
  - **`data-added` はプロトタイプの簡易値**（年ベースで生成）。React/Drupal 本番では作品エンティティの登録日時（created）で新着順を出す。お気に入り数は interest カウントの実値。
- **「通常作品」→「ポートフォリオ作品」に呼称変更**：LIAISON非掲載作品の内部用語。「通常作品」は展示なし＝欠落のニュアンスで不適だったため、作家の作品集という積極的意味の「ポートフォリオ作品」を採用。value（`normal`）・id・onclick は不変、表示ラベルのみ変更（p3-3 フィルタ option／p3 dbar ボタン `#dbarWorksNormal`）。
- 残るフィルタ＝展示状況（LIAISON+/LIAISON/ポートフォリオ）／年、＋並べ替え（標準/新着/制作年↓↑/作品名/お気に入り数）。

## 2026-07-20（追10）p4-14/p6-11 作者指定ルールのUI文言是正

### 決定
- **用語「作者」は維持（クリエイターに寄せない）**：サイトは作品制作者を「クリエイター」と呼ぶが、作品在庫管理では「この作品の**作者**は誰か」が主語。**作者＝作品との関係（役割）／クリエイター＝サイト上のアカウント・存在**と概念が別なので、ラベル・フィルタ・ピッカーは「作者」、制約説明の中でだけ「クリエイター」を使う使い分けを正とする（＝2語が違うのは正しい）。React 変換時もこの語彙分担を踏襲。
- **作者に指定できる母集団の文言を正しい業務ルールに是正**：旧UIコピー「個展なびに**登録済みの**クリエイターのみ」は広すぎた。正＝**「このギャラリーが作成した展覧会（管理者確認済み）に出展クリエイターとしてリンクされているクリエイター」**（＝追の「取扱プール＝そのギャラリーの各展覧会の出展クリエイターの和集合」L542/L550 と同一ルール。今回はコード挙動でなくUI文言をルールに揃えた修正）。是正箇所＝p4-14（ヘッド説明・真正性注記・作者ピッカー説明の3か所）。**p6-11 は当初 gallery 作者 `<select>` の help 文言を是正したが、その後 select 自体を撤去して固定表示に一本化**（下記 追11 参照＝作者は入口で確定済みのため p6-11 内に選択UIを持たない）。creator 本人固定側は不変。
- **含意**：未登録の作家に加え「**出展実績のない（登録済みでも）作家**」も登録不可、と明示。サーバー検証（`isAllowedAuthor`・出展外ブロック）は不変＝文言のみの是正。

## 2026-07-20（追11）p6-11 作者ブロックを固定表示に一本化（gallery select 撤去）

### 決定
- **ユーザー再確認の原則**：**p6-11 の入口は p4-14／p2-12／p2-12-1 の3つだけで、いずれも作者を確定してから遷移する。** よって p6-11 到達時点で作者は必ず確定済み＝p6-11 内で作者を選ぶ状態は存在しない。
- **撤去**：gallery 用の作者 `<select>`（`#p611AuthorSelect`・6作者 option＋真正性 help）を削除。作者ブロックは `#p611AuthorFixed`（固定表示・入力不可）1本に統一。CSS `.p611-author--select`／`.p611-author__sel` も削除。作者ラベルの `<span class="ktn-req">必須</span>` も撤去（システム確定で空になり得ないため）。
- **JS**：`p611RoleSync` から select 分岐を除去。`?author=<key>` があればその作者名を、パラメータ無しの直接入店（デモのロール切替のみ）は creator=田中 透／gallery=`P611_GALLERY_DEFAULT_AUTHOR`（'takahashi'＝高橋 信）を固定表示に populate。ノートは `?self=1` または creator 直接入店＝「あなたの作品として登録されます」／それ以外＝「選択した作者の作品として登録されます」。
- **意味**：コア原則（追・追7＝p6-11 は作者を受け取るだけ）が**コメントだけでなくUIからも保証**される（select が無いので p6-11 内で作者を変更できない）。React 変換時もエディタは確定済み作者を表示のみ・選択UIは入口側に置く。

## 2026-07-20（追12）p6-11 を「作品ニュートラルエディタ」に純化（セクション5関連展覧会・6 LIAISON設定・7公開設定を撤去）

### 決定
- **原則＝作品はニュートラルな存在**：作品（artwork）エンティティが持つのは中立な属性だけ＝作者（入口で確定）・タイトル・仕様・説明・画像。**展覧会紐づけ・LIAISON/LIAISON+種別・価格・販売状態・公開状態は作品に焼き込まず「出品（listing）」層＝文脈が持つ**（どの展覧会の作品管理ページにいるかで決まる）。作品に単一の展覧会/LIAISON/公開を持たせると、オーナーが p6-11・p2-12/p2-12-1・p3-14 など複数ページで同じ関係を二重管理する不整合の温床になる。作品は複数展覧会に時系列で出品され得る（p3-14 の出品記録は配列）ので構造的にも作品側に持たせるのは誤り。
- **撤去したセクション（p6-11 HTML/JS）**：
  - **5. 関連展覧会**（紐づく展覧会の表示＋「変更する」導線）→ 展覧会紐づけは出品側（p2-12/p2-12-1・p4-14 の在庫→出品操作）が持つ。
  - **6. LIAISON設定**（LIAISON/LIAISON+ チェックボックス＋作品管理への導線）→ どの LIAISON 種別で出すか・価格・発送は p2-12（LIAISON）/p2-12-1（LIAISON+）＝展覧会側の作品管理が持つ。
  - **7. 公開設定**（今すぐ/日時指定/下書き）→ **公開状態も出品/文脈の属性**。意味を持つのは creator 文脈（＝p3-3 掲載可否＝p3-14 在庫の公開スイッチ）だけで、そこに**既に公開スイッチがある**＝二重管理。**gallery 文脈には p3-3 も在庫公開概念も無い**ので公開設定は無意味。さらに入口が p2-12/p2-12-1（展示したいから来る）なのに「公開しない」を選べるのは矛盾。→ 撤去。
- **JS撤去**：`toggleLiaison()`/`toggleLiaisonPlus()`/`togglePublishDate()` 関数と呼び出し・`clearForm()` 内のリセット行。`MODE_SUBMIT` を全モード「保存する」に統一（旧「公開する」「保存して公開する」＝publish 概念を撤去）。送信バーのラベルも「保存する」。
- **CSS 非削除**：`.p211-publish-opt`/`.p211-liaison-opt`/`.p211-sub-link` は **p2-11（展覧会エディタ）が正当に使用中**のため common.css に残す（p2-11 の展覧会は公開/LIAISON をコンテンツ自身が持つのが正しい＝作品とは別）。
- **結果**：p6-11 は 1.基本情報 / 2.作品仕様 / 3.作品説明 / 4.画像 の4セクション＝中立フィールドのみ。React 変換時も ArtworkEditor は中立属性のみ、listing（展覧会×LIAISON種別×価格×販売×公開）は Listing コンポーネント＝展覧会側に置く。

## 2026-07-20（追13）p6-11 に「一時保存（下書き）」を送信バーのチェックボックスで復活（gate付き完成保存と2状態）

### 決定（追12 の公開設定撤去を一部改訂）
- **背景**：追12 で「保存する1本・必須gateしない」を一旦検討したが、ユーザー却下。理由＝**意図的な一時保存（写真を撮りに行く／説明の参照を調べる等の中断）と、安易な未完成の新規作成は別物**。gateを外すと両者が混ざり、未完成物が表示ページ・検索ページに漏れて困る。→ **完成保存は必須gateあり／一時保存は明示の別ルート**に分ける2状態モデルへ。
- **状態は2つ**：**下書き（未完成OK・在庫のみ・公開/検索/出品候補に出ない）** と **完成（gate通過・出品/公開の候補になり得る）**。「下書き/完成」は**データ入力完了度**の状態＝公開/出品の属性ではないので**作品ニュートラル原則は維持**（どの展覧会・価格・LIAISON種別は依然持たない）。
- **UI＝送信バーのチェックボックス**（分離ボタンでなく）：`#p611DraftChk`（`.p211-check.p611-draft-check`・ラベル「一時保存（下書き）として保存する」）で**保存前にチェックで下書きか完成保存かを決める**（ユーザー指定の方式＝以前 p6-11 にあった保存前チェックの形）。
  - **レイアウト＝送信バーを2段化（ユーザー指定 2026-07-20）**：上段＝下書きチェック＋説明文を**最初から常時表示**（`.p611-draft-check__label`「一時保存（下書き）として保存する」＋`.p611-draft-check__desc`「未完成でも保存できます。下書きは在庫（作品管理）にのみ残り、公開ページ・検索・出品候補には出ません。あとから在庫で仕上げると出品できます。」）／下段＝`.p611-submit-row`（キャンセル・保存ボタン・ノート）。`.p611-submit-bar{flex-direction:column}` で段組み。説明文は tip でなく常設。
  - `syncDraftMode()`：チェック時＝ボタン名「一時保存する」・**ノートは空**（説明は上段 `__desc` が常時担うため重複させない）／未チェック時＝「保存する」・ノート「必須項目を入力すると保存できます」。
  - `handleSubmit()`：下書き＝gateなしで保存トースト。完成保存＝`collectMissing()`（**単一 `.p211-input` を持つ必須欄＝タイトル/カナ/制作年/素材技法**のみ検査。サイズ〔複数入力〕・ジャンル〔ピル〕・画像はデモ簡略化で対象外）で未入力があればノートを赤〔`#b43c14`〕にして中断。React では全必須を正式検証。
  - `setDemoMode()`・`clearForm()` は draft チェックをリセット/再同期（新規モードで下書き解除）。
- **下書きの隔離ルール（前回の“迷子・導線複雑”への解）**：下書きは **p3-3／LIAISONタブ／検索、そして p2-12/p2-12-1 の候補グリッドにも出さない**（候補＝完成した出品可能作品のみ）。下書きが住むのは在庫（p3-14/p4-14）だけで「下書き」バッジ付き表示・仕上げは在庫から。完成させると候補に現れる＝候補グリッドは常にクリーン、編集ホームは在庫1箇所で導線分岐なし。**実装は本パスでは p6-11 側のみ**（在庫バッジ・候補除外の実装は p3-14/p4-14・p2-12/p2-12-1 側の後続作業）。
- React 変換：ArtworkEditor に `isDraft` フラグ（保存前チェック）。完成保存＝必須バリデーション通過必須／下書き＝バリデーションskip・`status='draft'` で保存。draft は全公開面・出品候補クエリから除外。

## 2026-07-20（追14）送信バー2段レイアウトを共通化し p2-11（展覧会エディタ）へ横展開

### 決定
- **ユーザー確認済みの p6-11 送信バー（下書きチェックを上段・操作ボタンを下段・下書き説明を常時表示）を p2-11 にも適用**（ユーザー指示「これと同じような仕様を p2-11 にも」）。
- **CSS を共通化（commonize）**：追13 で p6-11 用に作った `.p611-submit-bar` / `.p611-submit-row` / `.p611-draft-check*` を、**2ページ共通の `.p211-submit-bar--stacked` / `.p211-submit-bar__row` / `.p211-draft-check*`** に改名（`.p211-submit-bar` は元から p2-11/p6-11/p5-11等で共有の送信バー基底クラスなので、その family に寄せた）。p6-11 の HTML・コメントも新名へ更新（見た目は不変）。canonical は common.css の当該ブロック＋mobile（≤540px）に `.p211-submit-bar__row{flex-wrap:wrap}` を追加。
- **p2-11 の下書き＝独立ボタンからチェックボックスへ**：旧「キャンセル／下書き保存(ボタン)／保存して確認依頼」の3ボタン横並びを、上段＝下書きチェック（`#p211DraftChk`・ラベル「下書きとして保存する（確認依頼しない）」＋常時表示 desc）／下段＝キャンセル・保存ボタン（1本）・充実度メーター・ノート、に再構成。
  - **意味の対応**：チェックON＝下書き保存（確認依頼フラグ OFF・必須/関係者了承 gate なし・サイト非公開＝`saveDraft()`）／チェックOFF＝保存して確認依頼（必須 gate＝`handleSubmit()` の `validateRequired()`＋関係者了承チェック `#p211Consent` で活性）。p6-11 の「下書き/完成」2状態と同型だが、p2-11 は展覧会が管理者確認ライフサイクルを持つため「完成」側が「確認依頼」になる点だけ異なる。
  - `syncDraftMode()`：ボタン名（下書き保存／MODE_SUBMIT[mode]=保存して確認依頼）・活性・ノートを切替。下書き時はノート空（desc が常時説明を担うため重複回避）。
  - `syncConsent()` を改修：**下書きモードは関係者了承 gate 対象外＝常に活性**（`btn.disabled = !isDraft && !consent.checked`）。公開されないので了承不要。
  - 保存ボタン onclick を単一ディスパッチャ `submitPrimary()` に（下書きなら `saveDraft`、そうでなければ `handleSubmit`）。`setDemoMode`/`clearForm` は draft チェックをリセットし `syncDraftMode()` で再同期。init も `syncConsent()`→`syncDraftMode()` に置換。
- React 変換：ExhibitionEditor も同型の `isDraft` フラグ。draft＝review-request flag OFF で保存（別ストアでなくフラグ違い・同一ペイロード）／通常＝必須バリデーション＋関係者了承（consent）必須で確認依頼キューへ。送信バー2段レイアウトは `<SubmitBar stacked draftToggle>` として ArtworkEditor/ExhibitionEditor 共通コンポーネント化。

## 2026-07-21（追15）p6-11 に必須/追加項目の区別＋入力促進UI（アコーディオン・✓入力あり・充実度メーター）を p2-11 パターンで導入

### 決定
- **ユーザー指示「p6-11 を p2-11 のように必須とオプションを区別して、入力を促進するように工夫できますか？」に対応**。p2-11 で既に確立した「必須は常時表示／追加項目はアコーディオンに畳む＋開くと便益コピー＋`✓ 入力あり`チップ＋送信バーに充実度メーター」を p6-11 に横展開。
- **CSS新規ゼロ**：`.p211-sub-links` / `.p211-sub-link`（`__icon/__label/__state/__opt/__arr/__benefit`）/ `.p211-acc-panel` / `.p211-submit-bar__progress` はすべて common 済み（canonical common.css L11340〜11355, L11590〜11592）。HTMLをコピーし id を p611 系に振るだけで適用。
- **ニュートラリティは不変**：畳んだ追加項目（英語タイトル・タグ・重さ・額装・作品状態・付属品・エディション・関連記事リンク・サブ画像）は**すべて作品固有のニュートラル属性**。展覧会紐づけ・LIAISON設定・価格・販売状態（＝listing層）は含めない＝追11/追12 の「作品ニュートラルエディタ」原則と整合。
- **4アコーディオン構成**：
  - `p611AccBasicOpt`（基本情報内）＝英語タイトル・タグ（既存の単独タグ欄を吸収）。
  - `p611AccSpecOpt`（作品仕様内）＝重さ・額装・作品状態・付属品・エディション。**制作年・素材技法・サイズは必須として常時表示**のまま残す。
  - `p611AccDescOpt`（作品説明内）＝関連記事リンク。**作品説明 textarea は価値が高いので常時表示**（畳まない）。
  - `p611AccSubImg`（画像内）＝サブ画像。**メイン画像は必須として常時表示**。
- **充実度メーター**：送信バー `__row` に `#p611OptProgress`（「追加項目の入力 N / 4」）。`.ktn-mgmt-wrap` への rAF 間引き input/change/click/keyup リスナーで再計算。`setDemoMode`/`clearForm` でも同期し、`clearForm` は `closeAllAcc()` で全パネルを畳む。
- **`panelFilled` の適応（p6-11 固有）**：既定チェック済みラジオ（額装＝「額装あり」が `checked`）を「入力した」と誤カウントしないため、ラジオ/チェックは `el.checked && !el.defaultChecked` で判定（p2-11 版には無い分岐）。新規作品で額装パネルが最初から filled 扱いになるのを防ぐ。
- JS（`toggleAcc`/`closeAllAcc`/`OPT_ITEMS`/`panelFilled`/`syncOptUI`＋rAFリスナー）は p2-11 から移植し p6-11 の4パネルへ縮小。inline-script 構文チェック OK（blocks=1）。
- React 変換：ArtworkEditor と ExhibitionEditor で `<OptionalSection accordion benefitCopy stateChip>` ＋ `<CompletenessMeter filled/total>` を共通化。必須/追加の区別はフィールドメタ（required フラグ）駆動、メーターは追加セクション単位で filled 判定（既定値のみのセクションは未入力扱い）。

## 2026-07-21（追16）p6-11↔p6/p6-1/p6-2 整合性チェック結論・作品ジャンルは表示しない（分類専用）

### 監査結論
- **エディタ（p6-11）が収集する全属性に表示先がある**（制作年/素材技法/サイズ/重さ/額装/作品状態/付属品/エディション → hero 仕様欄、英語タイトル → `#p6TitleEn`、タグ → 下部 `ktn-sub-tags`、作品説明 → `#descBody`、関連記事 → `#p6Articles`、メイン/サブ画像 → hero/`#p6Thumbs`、作者 → creator カード）。追15 のアコーディオン化は id/存在を変えていないので回帰なし。
- **仕様欄には2系統ある（コードに残るが混同しやすいので明記）**：①hero `#p6Specs`＝`initExtra`（pages.js L2100-2116）が作品データから再構築・`hideSpecRows` 非適用・エディション/作家は `always`。②詳細 `#specsTable`＝`renderSpecs`（L1486-1520）で `hideSpecRows` 適用（p6 通常は 額装/エディション/作品状態/付属品/配送時期/発送方法 を隠す）。**静的HTMLの `<dt>/<dd>` は①に上書きされる fallback**。

### 決定
- **① fallback markup を揃える（cosmetic）**：p6-2 の静的 hero specs に 額装/作品状態/付属品 を追加し p6-1 と同一フィールド集合に。価格行は販売ページ固有で残置。p6（通常）は取引仕様を意図的に隠すため fallback からも省く＝現状維持。**実描画は JS 駆動なので JS有効時の挙動は不変**、JS無効時の一貫性のみ改善。
- **③ 作品ジャンル（6区分）は作品ページに表示しない＝分類専用フィールドとして確定**。理由：(a) `_p6Works` データモデルに genre フィールドが無く、表示には全作品オブジェクト＋レンダラ＋markup追加が要る。(b) 粗いジャンルは 素材・技法（例「キャンバスに油彩」）とタグ（例「絵画/油彩/現代美術」）の**両方と重複しノイズ**。(c) ジャンルの役割は p3-3 作品一覧フィルタ・p10 ディスカバリーの**絞り込み**で、そちらでは機能済み。→ カナ（タイトル読み＝検索/ソート用インデックス）と同様「収集するが作品ページには出さない」は意図的設計。React 変換時も artwork.genre は分類メタとして扱い作品詳細ビューには出さない（出す判断をした場合のみ本決定を改訂）。

## 2026-07-21（追17）p6-11 の一時保存（下書き）を p3-14/p4-14 在庫一覧に可視化＝「下書き」マーク＋編集再開導線

### 背景
- 追13 で p6-11 に下書き（未完成OK・在庫のみ・公開/検索/出品候補に出ない）を復活させたが、**一覧側（p3-14 ポートフォリオ管理／p4-14 作品インベントリー）に下書きの表示・再開導線が未実装**だった（progress.md で「在庫バッジ・候補除外は p3-14/p4-14 側の後続作業」と保留）。ユーザー質問「p6-11 で一時保存したら p3-14/p4-14 でどう表示され、どう再開するのか？」を受けて実装。

### 決定・実装（p3-14/p4-14 の対ページ同時）
- **判定**：`isDraft(w)＝!!w.draft`。データに `draft:true` の作品を各ページ1件追加（p3-14＝w10《かさかさ》サイズ未入力／p4-14＝g10《岸辺のスケッチ》・作者は登録済みクリエイター）。
- **一覧マーク**：`未出品`（灰・破線）や `出品中`（accent）と別に **`下書き`（アンバー `.p314-item__draft`）** を**最優先**で表示（draft → listed → soldOnline → unlisted）。未完成の「作業中」を灰の未出品と混同させないためアンバー。カード地も薄アンバー（`.p314-item--draft`）。
- **公開不可**：下書きは公開できないので p3-14 の公開トグルスイッチを出さない（p4-14 は元から公開概念なし）。当初は施錠アイコン＋「公開不可」チップ（`.p314-item__nopub`）で代替したが、次項のコーナーリボン導入で右肩が競合するため**チップは廃止**（`.p314-item__nopub` CSS も除去）。公開できない旨は右肩リボン＋詳細ノートが担う。
- **右肩フラグ（2026-07-21 追加・変遷：対角コーナーリボン→スワローテイル・アンバー→下向きペナント・スレートバイオレット）**：カード右肩から下がるフラグ `.p314-item__ribbon`（「下書き」・白文字）。`top:0;right:16px` で上端にピン留めして下垂、影は clip-path に沿う `filter:drop-shadow`。`.p314-item{position:relative}`（対角リボン時の `overflow:hidden` は不要になり除去）。**インラインの `下書き` バッジ（`.p314-item__draft` を exhs 行に出す方式）は廃止**し、下書きの一覧マークはフラグに集約（`exhHtml` の draft 分岐は空文字＝下書きは listing ステータスを持たないので状態行は空）。`.p314-item--draft`（カード地）／`.p314-draft-note` は継続。フラグは draft のみ・`pointer-events:none`。
  - **色（2026-07-21 確定＝くすみブルーグレー）**：初版アンバー `#9a6b00` は **LIAISON+ の金 `#b87c10`（`.lb-dot.li-plus`）とかぶり**「未完成」感も弱いとの指摘で撤回→スレートバイオレット `#6b5f8c`→グラファイト `#595650` を経て、ユーザー選択で **くすみブルーグレー `#5b6470`**（未完成の中立色・ブランド/ロール色と非干渉）に確定。カード地 tint（`.p314-item--draft` rgba(91,100,112,.05)）・詳細ノート（`.p314-draft-note`）も同系に統一。取引完了 ink／未出品グレーとはトーン差＋**縦書きブックマーク形**で分離（グレー近接の懸念は形の違いで解消）。
  - **形（2026-07-21 確定＝ブックマーク）**：対角リボン→スワローテイル→下向きペナントを経て、ユーザー選択で **縦書きブックマーク**に確定。`writing-mode:vertical-rl` の縦長短冊＋下端 V 切込み `clip-path:polygon(0 0,100% 0,100% 100%,50% 90%,0 100%)`（しおりの尾）。「下書き」を縦書きにして横のインラインバッジと形で明確に区別。**短冊幅は可読性優先でユーザー指定により拡幅**（横 padding 7px・`font-size:.63rem`）。
- **再開導線**：下書きは「クローン」を出さず **「編集を再開 →」** 1本（`p611Link('edit', id/w)`＝`p6-11.html?mode=edit&work=…`）。**再開の仕組み自体は既存の編集リンクを流用**（新規部品なし）。完成作品は従来どおり クローン＋編集。
- **詳細ノート→常時表示の完成プロンプト（2026-07-21 改訂）**：当初は展開アコーディオン内に `.p314-draft-note` を置いたが、**下書きは出品歴が空・メモも未確定でアコーディオン自体が無意味**とのユーザー指摘で、下書き行では **「出品歴・メモを表示」トグルと `.p314-item__detail` アコーディオンを一切描画しない**。代わりにノートを**カード内に常時表示**（`.p314-draft-note.p314-item__draft-prompt`）＝「一時保存中／必須がそろえば『保存（完成）』で公開・出品可／下書き中は公開・検索・出品候補に出ない／**『編集を再開 →』から続きを入力して完成させてください**」で**完成を促す**。プロンプトは白背景 callout（`background:#fff`）でカード地 tint から浮かせる。アクション行はトグルが無いので `.p314-item__actions--draft{justify-content:flex-end}` で「編集を再開 →」を右寄せ。
- **カード地の強調（2026-07-21）**：ユーザー要望「カード背景もブックマーク色に合わせたい」で `.p314-item--draft` の tint を rgba(91,100,112,.05)→**.09** に強め、右肩ブックマーク `#5b6470` とトーンを揃えた。
- **下書きは常に最上部固定（2026-07-21・並べ替え非従属）**：ユーザー要望で下書きを一覧の**最上部にピン**し、並べ替え（登録/制作年/作者/作品名）の指示を受けないようにした。`render()` の `rows.sort(SORTS[...])`（主ソート）**直後**に安定ソート `rows.sort((a,b)=>(isDraft(b)?1:0)-(isDraft(a)?1:0))` を重ねる。Array.sort が安定なので**グループ内は選択中の並べ替え順を保持**したまま draft だけが前に出る。React 変換：クエリ結果を `orderBy(draft desc, <selectedSort>)` 相当にする。
- **下書き＝別ものとして「絞り込み」「作品数」から除外（2026-07-21・ユーザー決定）**：下書きを最上部にピンしたことで「別もの」の位置づけが明確になったため、①**出品状況フィルタ**（出品中/現在未出品/未出品〔出品歴なし〕）で絞り込むと下書きは候補から外す（従来 `hist:[]` ゆえ「未出品（出品歴なし）」に混入していたのを是正）。実装＝filter 先頭で `if(isDraft(w)) return <絞り込み条件が空か>`。p3-14 は `fp===''&&fl===''`（公開フィルタでも除外＝下書きは公開できないため）、p4-14 は `fl===''`（**作者フィルタは属性なので下書きも通す**＝作者で辿った時に下書きが消えると不便）。→ 下書きは「すべて」表示時のみ最上部に出る。②**作品数「登録済みの作品 N件」から下書きを除外**（出品・公開できないので候補件数に含めない）＝`countEl=rows.length-draftN`。下書き数は下記バナーで別途「N件」案内。
- **下書き説明を一覧上部バナーに集約（2026-07-21・ユーザー相談→採用）**：下書きが複数になると同じ長文プロンプトがカード毎に重複するため、カード側の常時プロンプト（`.p314-item__draft-prompt`／`.p314-draft-note`）を**廃止**し、公開/非公開の注記と同列（`.p314-notice` 直後）に**単一バナー `.p314-draft-banner`**（`#p314DraftBanner`/`#p414DraftBanner`）を新設。下書きの意味・作品数除外・最上部固定・完成手順を一箇所で説明し、`#p314DraftCount`/`#p414DraftCount` に下書き件数を出力、下書きが無ければ `hidden`。カードは鉛筆マーク不要＝ブックマーク＋青灰tint＋「編集を再開 →」ボタンのみに簡素化。CSS：`.p314-draft-note`/`.p314-item__draft-prompt` を除去し `.p314-draft-banner*` を新設（feedback_css_commonize）。
- **残課題（2026-07-21・ユーザーと確認・未実装）**：(A) **作品削除の導線が全作品カードで未実装**（p6-11 の「削除」は画像アップロード用のみ）。下書きの破棄を含め、作品を消す操作の置き場所（一覧カードの danger-outline→確認モーダル／p6-11 エディタ内 等）は今後設計。取引完了（`soldOnline`）作品は削除不可にする等の制約も併せて要検討。(B) **取引完了作品のフィルタ位置**＝現状は `isListed=false`＋`hist`ありで「現在未出品（出品歴あり）」に含まれる（一覧マークは「取引完了」だが専用のフィルタ選択肢は未設）。専用選択肢を足すかは要判断。
- **作品ニュートラル維持**：下書き/完成は**入力完了度**の状態で、どの展覧会・価格・LIAISON種別は依然 listing 層（追11/追12 と整合）。
- **CSS 新規**：common.css に `.p314-item--draft`（カード地 rgba(91,100,112,.09)）／`.p314-item__ribbon`（右肩ブックマーク・clip-path 形）／`.p314-draft-note`（`.p314-item__done` 直後）／`.p314-item__draft-prompt`（常時表示・白 callout）／`.p314-item__actions--draft`（トグル無し時の右寄せ）。`.p314-item{position:relative}` を追記。※`.p314-item__draft`（旧インラインバッジ）と `.p314-item__nopub`（旧公開不可チップ）はフラグ化で廃止・除去。
- React 変換：下書き行はアコーディオンを持たず、完成プロンプトを常時表示・Resume ボタンのみ。完成作品のみ 出品歴/メモ アコーディオンを描画。
- React 変換：一覧クエリで `status==='draft'` を右肩「下書き」フラグ＋公開UI非表示＋アクションを Resume に。draft は公開面・出品候補クエリから除外（追13 の除外方針をリスト側でも徹底）。

### 2026-07-21 追補（残課題 A/B を解消・気になる点 Q2/Q3）
- **(A→解消) 削除／下書き破棄の導線を実装（Q2）**：一覧アクション行に破壊トリガー `.p314-item__del`（`.ktn-op-btn ktn-op-btn--sm ktn-op-btn--danger-outline`・下書き＝「下書きを破棄」／完成＝「削除」）を追加。**削除可否ポリシー `canDelete = draft || (!listed && !soldOnline)`**：下書き＝破棄可／**出品中（ライブ）＝不可**（取引が動いている）／**取引完了（`soldOnline`＝凍結・購入者所有）＝不可**／その他の完成作品＝削除可。押下で共有 confirm モーダル（`#p314DelModal`/`#p414DelModal`）を開き、`.ktn-op-btn--danger` の確定ボタン（削除する/破棄する）で `WORKS.splice`＋`delete openIds[id]`＋`render()`＋トースト（削除しました/破棄しました・デモ）。**モーダルは `.ktn-mgmt-wrap` の外**（fixed オーバーレイが stack の子 inset で縮まないように＝Model B の鉄則）。CSS＝`.p314-del-modal*`（`.p515-modal` と同レシピ・p3-14/p4-14 共有・namespace は p314 で統一）。下書き行のアクション行は `.p314-item__actions--draft` を **`flex-end`**（「下書きを破棄」と「編集を再開 →」を右に隣接グループ化＝破棄は再開の左横）に据える。※初期案で `space-between`（破棄=左端・再開=右端）にしたが、ユーザー指示「破棄は再開の左横に置く」で `flex-end` へ戻した（両者を離すのではなく右で隣接させる）。**破壊操作＝soft-trigger（danger-outline）→ confirm モーダル→ solid danger 確定**の共通規約どおり。React 変換：`canDelete` を `status==='draft' || (!isLive && !isSettled)` で算出、Delete→confirm dialog→mutation。
- **(B→解消) 取引完了フィルタ選択肢を追加（Q3）**：出品状況セレクトに `<option value="sold">売約済（取引完了）</option>`（「出品中」の直後）を p3-14/p4-14 両方へ追加。※初期案の option ラベルは「取引完了」だったが、ユーザー指示「取引完了→売約済（取引完了）」で改称（hist 詳細のコメント名＝正式状態名に揃える）。同時に一覧カードのインラインマーク `.p314-item__done` も「取引完了」→「売約済（取引完了）」へ改称。**ただし hist 詳細内の `.p314-hist__online` 注記は「取引完了」のまま据え置く**（同行に 売約済 の sale バッジが並ぶため、まとめて「売約済 取引完了」と読める。ここを改称すると 売約済 が重複するため）。フィルタ4バケットを相互排他化＝`listed`（出品中）／`sold`（売約済・取引完了＝`isSoldOnline && !isListed`）／`past`（現在未出品＝出品歴あり・`!isListed && !isSoldOnline && hist>0`／**取引完了を除外**）／`never`（出品歴なし・`hist===0`）。従来は取引完了が「現在未出品」に混在していたのを分離。
- **(追・編集ロックの拡張) 販売中×購入申込あり（取引準備中）＝作品編集を凍結**：従来は取引完了（`soldOnline`）のみ「編集 →」導線を隠していたが、**販売中（`sale==='sale'`）で現在出品中（`state==='now'`）かつ購入申込がある（`queue>0`）作品も編集不可**にした。判定は新ヘルパー `hasLiveApply(w)`（p3-14/p4-14 共通）。makeItem で `var liveApply = hasLiveApply(w);` を算出し、編集リンクの出力条件を `soldOnline || liveApply ? '' : '<a …>編集 →</a>'` に拡張（**クローン・公開/非公開切替は引き続き可**）。詳細アコーディオンに `.p314-done-note`（liveApply 版＝「申込者は現在の作品内容にもとづき申込済みのため編集不可。編集は出品取消後に」）を追加。**データモデル**：hist レコード生成 `rec(exh, sale, price, online, queue)` に第5引数 `queue`（既定0）を追加＝既存呼び出しは無改変。デモ確認用に p3-14《ふわふわ》・p4-14《静かな水面》の現行出品を `queue:2` にし、オーナーメモに「現在2件の購入申込あり（取引準備中）。」を付記。**理由＝申込者は申込時点の作品内容（画像・価格・寸法等）に対して意思決定しているため、取引が形成される間の作品情報改変を防ぐ**（申込中≠取引完了なので削除ポリシーには影響しない＝販売中は元から `listed` で削除不可）。React 変換：`isEditFrozen = isSettled || (isLive && onSale && applicationCount>0)`。
- **(Q3の p2-12/p2-12-1 確認＝デモ対応不要・後工程マター)**：ユーザーの「気になる点3＝前と同じ状態の確認」について、p2-12/p2-12-1（出品候補一覧）の WORKS には `draft:true` データが存在しないため、静的デモでは下書きが候補に漏れることは元から起きない（下書きは p3-14/p4-14 在庫にのみ発生）。本番の「下書きは出品候補・公開面に出さない」保証は **React/Drupal 側のリストクエリ条件（`draft=false`）で担保**する（追13 の除外方針＝バックエンドで徹底）。静的HTMLで追加作業はしない。
- **(申し送り) 削除の置き場所は「一覧集約」で確定・p6-11 には出さない（要・後工程再検討）**：削除／下書き破棄は p3-14・p4-14（在庫一覧）に集約。理由＝**p6-11 の「編集モード」入口が現状この2ページだけ**だから（`p611Link('edit',…)`＝p3-14 line 6638 / p4-14 line 6998。他は全て `mode=new`＝p2-12・p2-12-1・各作者ピッカー、または `mode=clone`）。編集入口＝一覧2ページのみ＝両方に削除がある、で一貫。p6-11 は 新規/編集/クローン 共有フォームのため、削除を足すなら編集モード限定＋`canDelete` 二重管理が要り複雑化するので今は入れない。**将来の再検討トリガー**：①p6 作品ページ本体のオーナーメニュー（ヘッダー `getActions`）に「作品を編集 →」導線が付くとき＝**ここが新たな編集入口になるので、その getActions 一括工程で削除の置き場所（メニュー内 or p6-11 内）を併せて判断**。②p2-12/p2-12-1 に作品編集導線（現状は出品/listing 管理のみで作品編集は持たない）を足す場合。→ どちらも `getActions` 全ページ×全ロール確定の横断工程で扱う。

### 2026-07-21 追補（p2-12-1 販売期間に時刻粒度を導入）
- **販売期間＝日付のみ→日付+時刻へ拡張（既定 開始0:00・終了23:59）**：LIAISON+ の販売受付終了時刻を明示するため、販売期間UIに時刻を追加。固定2択（「会期と同じ」「会期+2W」）の range 表示に `0:00`／`23:59` を直書き。カスタムピッカーに `type="time"`（`#p2121TimeStart`=00:00／`#p2121TimeEnd`=23:59・**変更可**）を日付の右に併置（`.p2-121-custom-picker__dt` flex）。プレビューは `fmtDT=fmtDate+fmtTime`（時の先頭0を落とす＝`0:00`）で日付+時刻に。同日選択時は `s===e && st<=et` を要求。
- **重複検証は日単位のまま（時刻を持ち込まない）＝設計判断**：`selectedPeriod()` は従来どおり `{start,end}`（日付）を返し、他展覧会出品との重複チェック（`otherExh.start<=p.end && p.start<=otherExh.end`）と保存エラーの期間表記も日付レンジのまま。理由＝**重複の本質は「会期の日が重なるか」で日粒度で十分**であり、時刻はあくまで購入受付の締め時刻を表す表示/運用粒度。時刻まで比較に入れると境界（終了23:59と翌開始0:00）で紛らわしく、実益もないため分離した。**React/Drupal 本番**では販売期間を `datetime`（開始=日付T時刻・終了=日付T時刻）で保持し受付自動停止に使うが、重複バリデーションは日付部分での判定を踏襲してよい（時刻は締め時刻の意味に限定）。

### 2026-07-21 追補（p3-14/p4-14 売約済＝取引完了を「フィルタ選択肢」→「タブ」へ昇格）
- **決定＝取引完了作品は登録済み作品とタブで分離（ユーザー判断）**：直前の追補で「(B→解消)」として出品状況フィルタに `sold`（売約済（取引完了））選択肢を足したが、ユーザーが「取引完了は他の作品と意味が違う（所有が購入者へ移り凍結されている）ので、登録済作品とタブで切り替えたい」と判断。**フィルタの1選択肢では在庫（作家/ギャラリーが差配できる作品）と取引済み（差配できない過去記録）が同じ土俵に並んでしまう**ため、上位の情報構造＝2バケットのタブへ格上げした。→ **(B→解消) の `sold` option 追加は撤回**（この追補が上書き）。ただし相互排他バケットの考え方（`sold=isSoldOnline`／`past` から取引完了を除外）はタブ側にそのまま引き継いだ。
- **UI＝2タブ「登録済みの作品／売約済（取引完了）」**：セクション見出し `.p314-sec-head`（旧「登録済みの作品 N件」＝2026-07-20 に件数行を見出し化したもの）を**廃止・CSS除去**し、`.p314-tabs`＞`.p314-tab`×2 に置換。タブ様式は既存 `.p315-tab-btn` に準拠（下2px罫線＋active＝page-accent 下線・weight600）。件数は共通 `ktn-count ktn-count--pill is-idle`、active pill は grouped selector（`.p5-type-tab/.p514-tab/.p315-tab-btn/.p314-tab .is-active .ktn-count--pill`）で page-accent ソリッド＋白文字（カウンター共通規約どおり・ロール色 creator青緑/gallery銅）。長ラベル対策で `.p314-tabs{overflow-x:auto;scrollbar-width:none}`。
- **JS＝バケット優先の render**：`curTab`（'active'|'sold'）を filter 先頭で適用（active＝`!isSoldOnline` のみ／sold＝`isSoldOnline` のみ）。旧 `fl==='sold'` 分岐を削除、active 側 `past` から冗長な `isSoldOnline` 条件を除去（バケットで排他済み）。`switchTab(tab)` が `.is-active`/`aria-selected` をトグルして再描画。**タブ件数はフィルタ非依存の総数** `syncTabCounts()`（active＝下書き除外の完成作品で `!isSoldOnline`／sold＝`isSoldOnline`）を `#p314CountActive`/`#p314CountSold`（p414 同）へ。**削除・破棄確定後にも `syncTabCounts()` を呼ぶ**（在庫が減るとタブ件数も動くため）。旧 `#p314Count`/`#p414Count`（`countEl`）は廃止。
- **売約済タブの操作範囲**：出品状況フィルタ（ラッパ `#p314FilterListedWrap`/`#p414FilterListedWrap`）を `hidden` で隠す（取引完了に「出品状況」は無意味）。**公開状態フィルタ（p3-14）・作者フィルタ（p4-14）＋並べ替えは残す**。理由＝**クリエイターページ上の公開/非公開は取引完了後もオーナー（出品者=クリエイター）が操作できる**（自分のページの表示可否だから）＝ユーザー確認済み。売約済タブ表示中のみ注記 `.p314-sold-notice`（取引完了＝購入者所有・販売状態/価格は編集不可）を出す。下書きは売約済バケットに入らないため下書きバナーは自動非表示（draftN=0）。
- React 変換：一覧を2タブ（`active`/`settled`）へ。`settled` バケット＝`isSoldOnline`（取引完了・凍結）。タブ件数はバケット総数（フィルタ非依存）。settled タブでは出品状況フィルタを出さず、公開トグル（creator）と並べ替えは維持。settled 行は凍結（販売状態/価格編集不可）だがオーナーの公開/非公開操作は可。

### 2026-07-22 追補（p4-14 の真正性注記を新規作成モーダルへ移設／取引完了注記の文言を拡張）
- **p4-14 の真正性注記（`.p414-authenticity`「作者に指定できるのは〜」）を一覧本文から撤去し、新規作品作成モーダルへ移設（ユーザー指示）**：この注記は**新規作品の作成時にのみ関係する規則**（＝どのクリエイターを作者に指定できるか）で、登録済み一覧の閲覧・管理とは無関係。よって一覧上部から外し、内容を新規作品の作者ピッカーモーダル（`#p414Picker` の `.p414-picker__desc`）へ統合（既存 desc に「管理者確認済み」等の precise 文言をマージ）。未使用化した CSS `.p414-authenticity*` は canonical から削除（dead CSS 除去）。
- **作者フィルタ（`#p414FilterAuthor`）は存置＝当初の削除を撤回**：ユーザーの「作者指定は新規作成モーダルに任せればいい」を**最初は作者フィルタ廃止と誤解して削除**したが、真意は上記「真正性注記の移設」であり、**一覧の作者フィルタ（マルチ作者ギャラリー在庫の絞り込み）は残すのが正**。いったん削除した HTML `<label>`＋select・JS（DOM ref／guard／populate ループ／render の `fa` 除外／`change` リスナー）を復元した。**教訓**：「◯◯はモーダルに任せる」＝必ずしも一覧UIの削除を意味しない。指示の対象（フィルタ vs 説明テキスト）を取り違えないこと。
- **並べ替えの「作者名順」（`<option value="author">`）も存置**：ギャラリー在庫はマルチ作者なので並び替え軸として有効。React 変換：作者は一覧の絞り込みフィルタ＋ソートキーとして保持。作者の**指定（割当）**は作成フローの author picker が単一の入口で、その真正性規則はモーダル内に表示。
- **p3-14 は元から作者フィルタ・真正性注記なし**（単一作家=本人のポートフォリオ）＝この変更は p4-14 単独（対ページ同時修正の例外）。
- **取引完了注記の文言を拡張（`.p314-sold-notice`）**：旧「販売状態・価格は編集できません」→「**この作品は編集・削除できません（販売状態・価格に限らず作品情報すべて）**」。理由＝取引完了＝所有が購入者に移り、価格/販売状態だけでなく作品情報全体が凍結されるため（クローン複製・公開/非公開操作は引き続き可）。p4-14 側は末尾を「在庫記録として保持し、クローンでの複製は可能です。」に。

### 2026-07-22 追補（p2-11 / p6-11 の画像アイテムにキャプション入力を追加＝共通コンポーネント拡張）
- **決定＝アップロード済み画像アイテム `.p211-img-uploaded` にキャプション入力欄を内蔵（ユーザー指示）**：p2-11（展覧会編集）・p6-11（作品 新規/編集）の画像ブロックで、メイン画像・サブ画像それぞれにキャプション（任意）を入力できるようにする。表示側（p2 ヒーロースライダー／p6・p6-1 作品ヒーロー）は**既に per-image caption を描画済み**（p2＝`SLIDES[].caption`→`#p2CaptionText`／base p6＝`w.thumbs[].label`→`#p6Caption`／p6-1＝`SLIDES[].caption`→`#p6Caption`）なので、今回の作業は**入力UIの追加＋表示済みであることの確認**であり JS 改変なし。
- **DOM 再構成（common.css canonical「画像エリア」）**：横1行 `[thumb][name][del]` を `[thumb][__body]` に変更し、`__body`（縦stack）内に `__row`（name+del の横並び）と `.p211-img-caption`（`<input type=text maxlength=60>`）を積む。`.p211-img-uploaded{align-items:flex-start}`（サムネ上端揃え）・`__del{flex-shrink:0}`。`.p211-img-caption` は `--fn`（ゴシック＝UI入力）・`.75rem`・focus/placeholder スタイルあり。**p2-11 と p6-11 で同一クラス**＝p6-11 が `.p211-*` を再利用する既存方針どおり単一ソース。
- **サブ画像の demo 化**：従来サブ画像アコーディオンは drop zone のみ（アップロード済みアイテム無し）だったが、キャプション機能を可視化するため demo アップロード済みアイテムを描画（p2-11＝venue_view 2枚・残り 9→7／p6-11＝detail01/detail02/install 3枚・残り 6 据え置き）。**p6-11 のサブキャプション値は p6-1 SLIDES の caption（詳細①/詳細②/展示）と文言一致**させ、エディタ↔表示の対応が読み取れるようにした。
- **静的デモの限界＝入力→表示は本番で結線**：静的HTMLではエディタ入力値が表示データ（SLIDES/thumbs）へ自動反映されない（別ファイル・別JS）。React/Drupal では画像1点が `{url, caption}` を持ち、エディタの caption input → 保存 → 表示の caption を**同一フィールドで結線**する。→ React 変換：`<ImageUploadItem thumb name caption onCaptionChange>`。画像モデルに `caption:string`（任意・60字目安）を持たせ、表示側スライダー/ヒーローはこの caption を描画（現行の label/caption 二系統は本番で caption 単一へ寄せる想定）。
- **(追・サブ画像のドラッグ並べ替え)** ヘルプ文が「ドラッグ＆ドロップで表示順を入れ替えられます」と案内するのに実装が無かったため、共通ヘルパー `KTN.initImgReorder(list)`（p2-11/p6-11 共有）を新設。**ハンドル起点の HTML5 DnD**＝アイテム先頭 `.p211-img-uploaded__handle`（グリップ・`draggable=true`）のみが drag を開始し、キャプション input のテキスト選択・削除ボタン・サムネ操作と競合しない。dragover 中に中点判定で `insertBefore` して並べ替え。サブ画像は `.p211-img-list#p211SubList`/`#p611SubList` でラップし、そのリスト内に限定。メイン画像はハンドル無し（単一・並べ替え不可）。React 変換：`<SortableImageList items onReorder>`（dnd-kit 等）＝ハンドルでソート、順序を配列 index として保存。画像モデルは `{url, caption, order}`。

### 2026-07-22 追補（p6-11 の「関連記事リンク」外部URL欄を撤去＝表示先なし・記事は内部p7）
- **決定＝p6-11 の追加項目「関連記事リンク」（外部URL入力・panel `p611AccDescOpt`）を撤去（ユーザー指摘）**：作品ページ（p6〜p6-2）の「作品の記事（Articles・`#p6Articles`）」は**サイト内 p7 記事**（作品ページのオーナーが作品について作成する内部記事）へのリンクで構成される。p6-11 が持っていた「関連記事リンク」は**外部URL**（インタビュー/レビューの `https://`）を1件受ける欄で、①p6〜p6-2 に外部URLを描画する場所が無く、②記事の実体（内部p7）と食い違う**孤立フィールド**だった。→ 撤去し、作品説明ブロックは説明 textarea のみに。`OPT_ITEMS`（充実度メーター/「✓入力あり」チップの対象）からも当該 panel を削除。
- **追15 の申し送り（handoff 上部「エディタが収集する全属性に表示先がある」内の "関連記事 → #p6Articles"）を訂正**：あの対応付けは誤り。`#p6Articles` は p6-11 の外部URL欄と結線されておらず、pages.js 内でハードコードされた p7 記事リスト（`href:'kotennavi-p7.html'`）を描画しているだけ。p6-11 の外部URL欄には表示先が無かった＝今回撤去で不整合を解消。
- **記事の正しいモデル（React/Drupal）**：作品に紐づく記事＝**内部の記事エンティティ（p7）**で、作者/ギャラリー（作品ページのオーナー）が p7 作成フローで書く。p6 作品ページはその記事群（作品参照を持つ p7）を逆引きして「作品の記事」に並べる。作品エディタ（p6-11）側で記事URLを手入力させない（記事は独立エンティティ・作品⇄記事は参照関係）。外部レビューへのリンクを将来出すなら、p6-11 の作品属性ではなく別枠（記事側 or 専用の外部リンク欄＋表示先）として設計し直す。
- **スコープ＝p6-11 単独**：p2（展覧会）側は表示に「関連記事」枠があり別事情のため今回は触らない（ユーザー指摘も p6〜p6-2 の作品記事に限定）。

### 2026-07-22 追補（p6-11 作品編集：クローン時のstrip抑制／制作年4モード化／取扱・展示メモ欄の新設と表示結線）
- **①クローン時に identity strip を隠す（ユーザー指摘「新規にこのヘッドがあるのはおかしい／クローンはタイトルとメイン画像だけが必ず更新項目」）**：identity strip（`#p611WorkBanner`）は「**既存作品を編集している**」文脈表示なので、`setDemoMode` で**編集時のみ表示**（`workBanner.hidden = (mode!=='edit')`）に変更。クローンは**新規作品を作る操作**（採番前・元作品の文脈はクローンバナー `#p611CloneBanner` が担う）、新規は対象なし、でstripを隠す。作品IDチップ（`#p611WorkId`）も編集時のみ（クローン＝ID未採番）。クローンバナー文言に「**タイトルとメイン画像は必ず更新**」を明記。React：編集モードのみ既存エンティティの identity/ID を出し、clone/new は source-context バナー（あれば）だけにする。
- **②制作年を4モード化（単年／期間／推定〜年頃／不明）**：旧・単一テキスト欄（`value="2026年"`）を pill group `#p611YearMode` ＋ モード別入力（`.p611-year-input[data-year-input]`）へ。JS `p611YearMode()` が radio 変更で入力欄・「頃」suffix を出し分け。**データモデル（React/Drupal）＝`{yearMode:'single'|'range'|'circa'|'unknown', yearFrom, yearTo}`**。表示・並べ替え規則：
  - 並べ替えは**代表となる単一の年（sortable year）**で行う。single/circa＝その年、range＝**終了年**（yearTo）を代表に、unknown＝**末尾にまとめる**（sort-last）。
  - 表示は人間可読表現（single＝「2026年」／range＝「2024–2026年」／circa＝「2026年頃」／unknown＝「制作年不明」）。
  - **フィルタ／並べ替えページ側の必要反映**：制作年は**フィルタのdropdownではなくソート軸**（year-desc/year-asc）。非数値年（「〜年頃」「不明」）が代表年抽出に載っても壊れないよう、生の `SORTS`（pages.js 2箇所）の year 比較に `parseInt(...,10)||0` ガードを追加。p3-3（`dataset.year||0`）・p2-12/p2-12-1（`candYearNum`＝`/\d+/`＋0 fallback）は元から非数値耐性ありで改変不要。React：ソートキー＝代表年（unknown は -Infinity 相当で末尾）。
- **③「取扱・展示について」メモ欄を新設し p6〜p6-2 に表示結線**：作品説明ブロックに任意 textarea（`.p211-textarea`・placeholder に具体例＝直射日光/高温多湿回避・紫外線カットガラス・フローティングフレーム取付等）を追加。**取扱・展示は作品固有のニュートラル属性**（出品=listing層ではなく作品層に置いてよい＝memory「作品はニュートラルな存在にする」に整合）。表示側の結線バグを同時修正：extras の描画先だった `#descRightCol` が **p6/p6-1/p6-2 のHTMLに存在せず**（pages.js とworktreeにのみ残存＝旧右カラムレイアウトの遺物）extras は**ビルド済みだが未表示**だった。→ 各ページの `#descBody` と `#p6Articles` の間に `<div class="p6-artwork-notes" id="descNotes">` を新設、pages.js の描画先を `#descNotes` に付け替え、CSS `.p6-artwork-notes` を canonical に追加（`#descRightCol` セレクタは統合）。demo work（`_p6Works` id:1/2）の2 extras ブロックを「取扱・展示について」1ブロックへ集約し、エディタの単一欄↔表示の単一ブロックを1:1対応に。React：作品モデルに `handlingNote:string`（任意）を持たせ p6〜p6-2 の「取扱・展示について」枠に描画。
- **未解決の申し送り＝制作ノート（`w.note`）は依然未表示**：`_p6Works[].note` は現行レイアウトに表示枠が無く従来から未描画のまま（今回スコープ外）。extras とは別概念（制作の背景メモ）なので、表示するか廃止するかは別途判断。今回の `#descNotes` は extras 専用に結線した。

### 2026-07-22 追補（p6-11 item1/item3 の CSS 上書き不具合を修正）
- **item1（新規/クローンで identity strip が消えない）＝実装漏れでなく CSS 競合**：`setDemoMode` は `#p611WorkBanner.hidden = (mode!=='edit')` を正しく設定していたが、canonical `.ktn-mgmt-context{display:flex}`（common.css L10135）が UA の `[hidden]{display:none}` を上書きしていたため属性が視覚に反映されなかった。→ `.ktn-mgmt-context[hidden]{display:none}` を追加。**教訓の再確認**＝`display` を持つ共通コンポーネントを JS の `hidden` でトグルする設計なら、必ず canonical 側に `[hidden]{display:none}` をセットで持たせる（p314 の filter/notice で既出のパターン）。React 変換では条件レンダリング（`{mode==='edit' && <IdentityStrip/>}`）にするので本問題は消える。
- **item3（取扱・展示が表示で確認しづらい）＝結線は正・ラベル可読性の問題**：#descNotes への extras 描画・データ（`_p6Works` id:1/2 の `extras`）・3ページの container はすべて正しく、p6-1/p6-2 も `KTN.pages['p6']()` 経由で同一 initPage を通る。ただしラベルに `.wd-note-lbl`（英語ラベル用＝Montserrat/.54rem/uppercase/字間.18em）を流用したため、日本語「取扱・展示について」が極小・詰まって視認しづらかった。→ `.p6-artwork-notes .wd-note-lbl` を `--fn`/.72rem/600/非uppercase/ink に scoped 上書き（standalone デモの `.wd-note` は非対象）。React：取扱・展示ノートのラベルは和文セクション見出しとして扱う（英語マイクロラベルの体裁を流用しない）。

### 2026-07-22 追補（「その他」欄を作品説明→作品仕様へ統合＝仕様の補足として一体化）
- **決定＝「その他（取扱・展示メモ）」は独立ノートではなく作品仕様（Specifications）の補足行として扱う（ユーザー指示「これは仕様の一部にしてください」）**：直前まで「その他」は①エディタ p6-11 の作品説明ブロック内の独立欄、②表示 p6〜p6-2 の「この作品について」内の別枠 `#descNotes` に出していた。これを**仕様の一部**に移す。
  - **エディタ（p6-11）**：「その他（任意）」`.p211-field` を 3.作品説明ブロック→**4.作品仕様ブロック末尾**（重さ・額装等の追加項目アコーディオンの後）へ移設。
  - **表示（p6/p6-1/p6-2）**：`w.extras[]` の描画先を about 内 `#descNotes` から**ヒーロー作品仕様 dl `#p6Specs` の末尾**へ。通常仕様行（出品番号・作家・制作年・素材技法・サイズ・重さ・エディション・額装・状態・付属品）の後に、上罫線付きの**全幅行**（`grid-column:1/-1`：ラベル「その他」→本文が縦積み）として追加。仕様 dl は `repeat(2,auto 1fr)` の詰まった2カラムで長文が入らないため全幅化＋本文は `--fn` .78rem。
- **クリーンアップ**：旧 `#descNotes` 描画（renderDesc 内 noteBlocks）と container（p6/p6-1/p6-2）を撤去、`.p6-artwork-notes` CSS を除去（`#descRightCol` との共有 flex から分離）。前回追補の scoped `.wd-note-lbl` 上書きも用済みで削除。`.wd-note*` 本体はデモ `work_detail*.html` が使用中のため残置。
- **React/Drupal モデルへの含意**：作品の `handlingNote`（旧 extras/その他）は**独立セクションではなく Specifications の追加フィールド**として設計する。仕様テーブルは短い key-value 行（制作年・サイズ等）＋末尾に**全幅の長文行（その他）**を許容するレイアウトにする（`<SpecTable rows compactPairs + fullWidthNote>`）。「この作品について」セクションは説明本文（desc）＋タグ＋記事のみに限定し、取扱・展示メモはそこに置かない。

### 2026-07-22 追補（管理者コメント欄＝コンテンツ編集ページ共通コンポーネント `.ktn-admin-note` を新設）
- **決定＝コンテンツ編集ページに、role=管理者のときだけ現れる「管理者コメント」入力欄を共通コンポーネントとして持たせる（ユーザー指示「ロール=管理者の場合、管理者コメントの入力欄を追加してください。これはコンテンツ編集ページ共通です」）。**
- **共通化の実装**：canonical CSS `.ktn-admin-note`（common.css・`.ktn-form-error` 直後）＋共通トグル `syncAdminNote()`（common.js・`renderAll()` 末尾で毎回実行）。`syncAdminNote` は `window.ktnState.role==='admin'` を見て全 `.ktn-admin-note` の `hidden` を切替。**ページ側の JS 結線は不要**＝`.ktn-admin-note` を置いたページは dbar 管理者ボタン（setR→renderAll）で自動的にロール連動する。ページ個別の syncMgmtBar に依存しない（p6-11 の syncMgmtBar は admin を扱っていなかったが、renderAll 直呼びなので影響なし）。
- **スコープ判断＝「全 p*-11 編集ページ」**（ユーザー明示「p*-11 すべてに付く・p5-11 含む」）。当初は what（コンテンツ）編集の p2-11/p6-11 に限定したが、**用途が「管理上の履歴」＝コンテンツ/人物を問わず全編集ページに要る**とのことで拡大。設置＝mgmt-page の p2-11（展覧会）・p3-11（クリエイター）・p5-11（ユーザー）・p6-11（作品）・p8-11（レビュー）の5枚。**p70-11 は公開ガイド（p70-page・取引ガイド購入者編）で編集ページでないため対象外**（p*-11 でも mgmt-page でないものは付けない、が判断軸）。
- **用途＝管理履歴（審査メモに限らない）**：説明文は全ページ共通「管理上の対応履歴・申し送りを記録します。管理者のみが閲覧できます。」。当初の「審査メモ／出品者には表示されません」は人物・レビュー編集に合わないため、対象を問わない「管理上の対応履歴」＋「管理者のみ閲覧」に統一。placeholder のみページ別（日付＋対応の記入例）。
- **見た目＝管理者スレート `#3a4a5a` を左罫線＋Admin バッジに使い、一般フォーム欄（`--page-accent` ロール色）と視覚分離**。mgmt-bar の admin 色（同 `#3a4a5a`）と揃え「管理者ゾーン」を一貫させた。
- **React/Drupal への含意**：`<AdminNote entity>` は編集フォーム内に置くが**表示は現在ユーザーの role が admin のときのみ**。値はエンティティ（コンテンツ/人物/レビュー）横断の管理者専用フィールド（本人・一般ユーザーの read 権限なし）＝管理ログとして設計。追記型の履歴（タイムスタンプ付きエントリ列）にするか単一 textarea かは本番の管理要件で決める（プロトタイプは単一 textarea）。

### 2026-07-22 追補（長文タイトル/名前/キャプション＝入力無制限・表示側フォールバック折り返しで受ける）
- **決定＝稀に異常に長い作品名・展覧会名・人名・画像キャプション・仕様値が入力されても、入力側に文字数制限や注意書きは設けず、表示側でグレースフルに折り返して受ける（ユーザー相談→合意）**。理由：正当に長い正式名称/キャプションが存在し得るため入力ハード上限は正当データを切るリスクがある／頻度が低い（「本当にたまに」）ため入力UXを増やすより表示で吸収する方が素直。
- **実装＝canonical common.css（`.ktn-admin-note` 直後）に共通グループセレクタで `overflow-wrap:anywhere` を一括付与**。`anywhere` はスペースで折れる通常文には無影響＝スペースの無い連続長文字列（英数字URL 風）のときだけ効く。加えて `anywhere` は min-content を縮めるため flex/grid 項目が縮んで折り返せる（`.p6-hero__specs dd` の 1fr 列が崩れないのはこの効果）。
- **点検の判断軸＝「連続長文字列でレイアウトを横に突き破るか」**。安全だった要素は触らない：line-clamp＋overflow:hidden 済み（`.ec/.ac/.rc/.nc/.mc/.lc` タイトル・lead）／nowrap＋ellipsis＋min-width:0（`.aw__title`）。補強したのは折り返し制御が無かった要素：人物名（`.cc/.gc/.uc __name`）・ヒーロー大見出し（p1/p2/p3/p4/p5/p6）・サイド名・各キャプション・`.p6-hero__specs dd`・`.p2-12-work-card__title`。
- **React/Drupal への含意**：表示コンポーネント（`<Card>`/`<Hero>`/`<Caption>`/`<SpecTable>`）は既定で `overflow-wrap:anywhere`（＋カード内は line-clamp）を持たせ、入力フォーム側にはタイトル/キャプションの maxLength を課さない方針。長さ制御が本当に要るのは SEO/表示密度都合の「推奨長」ソフト警告どまりで、ハード制限にしない。

### 2026-07-22 追補（p6-11 作品仕様の入力方式を簡素化＝制作年2モード化・素材ロングテキスト・サイズフリーテキスト）
- **①制作年を4モード→2モードに戻す（ユーザー判断「期間・推定はかえって入力者が分かりづらい」＝上記 2026-07-22 追補②「制作年4モード化」を walk back）**：pill を「年（西暦）／不明」の2択に。期間（range）・推定（circa）モードと開始〜終了入力・「頃」suffix を削除。JS `p611YearMode()` から circa 処理を除去（`data-year-input` 出し分けは 2モードで流用）。**データモデル改訂＝`{yearMode:'single'|'unknown', year}`**（旧 range/circa/yearFrom/yearTo は不使用）。並べ替え：single＝その年／unknown＝末尾（sort-last）。表示：single＝「2026年」／unknown＝「制作年不明」。**pages.js の year 比較 `parseInt(...,10)||0` ガードは残置で問題なし**（2モードでも非数値耐性として有効）。
- **②素材・技法を textarea 化**：`.p211-input`（1行）→`.p211-textarea`。長い技法列挙を折り返せる。データ形状は文字列のまま（`w.medium`）。
- **③サイズをフリーテキスト化**：高さ×幅×奥行の number 3欄→単一 `.p211-input` フリーテキスト（placeholder「H × W × D」）。**単位 cm はラベル横に `.p211-label__unit`（common.css 新設・`--fm`/.7rem/500/muted）で表示**。データ形状は文字列のまま（`w.size`＝表示側は元から単一文字列を読むので無改修）。
- **④「0入力を許すか」問題はフリーテキスト化で解消（ユーザー相談への回答）**：number 3欄だと平面/画像作品の奥行を 0 で埋めるしかなかったが、フリーテキストなら奥行を書かなければよい（「H30 × W40」）。強制 0 を避けられ、立体/平面/映像など作品種別によらず自然に表現できる。ヘルプに省略可の例を明記。React：`size:string`（自由記述）を基本とし、構造化寸法（h/w/d 数値）が要る機能（送料計算等）が出た時だけ別途パース or 追加フィールド化を検討。
- **⑤必須gate 追従**：サイズが単一 `.p211-input` になり gate 対象入り／素材が textarea 化で `.p211-input` から外れたため、p6-11 `collectMissing` の収集セレクタを `.p211-input`→`.p211-input, .p211-textarea` に拡張し素材を gate 維持。

### 2026-07-22 追補（p11-2 クリエイター機能申込ページ新規作成＝KYC情報設計・本人/代理人フロー・`.p114-*` 共有拡張）
- **新ページ p11-2**：login ユーザーが creator になるための申込。5ブロック＝①クリエイター情報（公開）②本人確認のための情報（非公開）③申込者について（本人/代理人）④その他任意⑤同意事項。body=`mgmt-page p3-page`、幅760、dbar は状態のみ（ロール切替なし＝creator専用）。common.js PAGES に登録済み。
- **KYC 情報設計（コードに残らない背骨・メモ `project_role_and_application_rules.md` と対）**：creator 申込時点では本人確認まではしないが、ここで取る**本人の氏名・フリガナ・生年月日・住所・電話（生年月日はユーザー判断で必須追加）**を将来のリエゾン+申込時に紐づけ、それを基に本人確認する。よって②は非公開でも必須。目的＝身元不確かな人の足切り＋重複/不適切掲載時の連絡手段。①（公開の表示名/ジャンル/SNS）と②（非公開の実名/生年月日/住所/電話）を**ブロックで明確に分離**し、`.p114-privacy-note` で②の非公開性と用途を明示。
- **本人/代理人フロー**：③で `.p211-pill-group`（本人/代理人）を選び、代理人時のみ `.p114-agent-block[hidden]` を JS で表示。**代理人は氏名＋フリガナ＋本人との関係のみ取り、住所・電話は取らない**（＝本人確認は本人=クリエイターの情報で行う／代理人連絡はログインアカウント宛＝現行にも代理人電話フィールドは無い）。ITリテラシーの無い親に代わり家族が申込むケースを想定。
- **`.p114-*` を p11-2/p11-3/p11-4 の共有コンポーネントセットへ拡張**（common.css）：新設＝`.p114-applicant`（申込アカウントの静的ストリップ）／`.p114-privacy-note`／`.p114-agent-block`。**identity strip は p11-2 と p11-4 で役割が別＝別コンポーネント**：p11-4 は既に creator/gallery であり実在の p3/p4 ページへリンクする `.ktn-mgmt-context`、p11-2 は"これから creator になる login ユーザー"でエンティティpageが無いため login アカウントを示す `.p114-applicant`。→ 混同して統合しないこと。
- **申込フォーム前の機能説明はガイド形式（p70部品）で構成（2026-07-22 方針転換）**：当初 p11-2 の冒頭説明を色付きバナー `.p114-service-banner--creator`＋付与機能リスト `.p114-grants` で作ったが、ユーザー要望「クリエイター機能をガイドのように書いてほしい」により**p70 エディトリアルガイド部品（`.p70-lead`／`.p70-subhead`／`.p70-dl--ja`／`.p70-step-list`／`.p70-callout--venue`）で書き直し**。p70部品は body.p70-page 非スコープ＝任意ページへ移植可能なため、mgmt ページ内でそのまま流用できる。構成＝リード文＋「できること」定義リスト＋「申込から公開まで」手順リスト＋本人確認情報の callout。ラッパは `.p112-guide`（CSS不要の素グループ・`id="p112ServiceBanner"` は setDemoMode の承認モード非表示のため維持）。`.ktn-mgmt-head__desc` はガイドリードと重複するため削除。**この転換で dead 化した `.p114-service-banner--creator`・`--gallery`（`__badge` variant 含む）と `.p114-grants`/`__item`/`__item::before` を common.css から削除**（base `.p114-service-banner`/`__badge`/`__desc`/`__fee` は p11-4 のゴールドバナーで現用のため残置）。→ **p11-3/p11-4 も同様に、冒頭の機能説明はバナーでなく p70 ガイド部品で書く方針**。
- **ブートストラップ方針の使い分け**：p11-2 は `KTN.init({page,role})`（標準）。ロール切替が無く申込者ストリップも静的なので init に任せる方が簡潔で、パンくず・ヘッダーが自動描画される。p11-4 は role 切替で identity strip を再populate するため `window.ktnState`＋`KTN.pages['p11-4']()`＋`window.ktnRender=syncMgmtBar` の手動方式を維持（役割が違うので揃えない）。SNS リンク repeat の add/del は `KTN.pages['p3-11']` ローカル実装のため、p11-2 は inline に自前 click ハンドラ（`#p112LinkList` scoped・最低1行保持）を持つ。
- **未決（React/Drupal 前に要ユーザー判断）**：リエゾン+申込（p11-4）で本人確認情報を creator 申込データから**紐づけ表示（read-only 確認）するか、再入力させるか**。ルール上 LIAISON+ 申込が実本人確認のタイミングなので p11-4 に本人確認情報の提示が要るが、creator 申込で既に取得済みのため再入力は避け「紐づけ済み情報の確認＋不足分（gallery=事業者確認等）の追加」が自然。p11-4 の 本人/代理人・本人確認ブロックの具体化はこの判断待ちで保留（現状 p11-4 は未変更）。

### 2026-07-23 追補（オーナー未設定ページの引き継ぎ導線＝申請時 任意申告＋事務局実行のハイブリッド）
- **背景（コードに残らないドメイン事実）**：個展なびには**オーナーが admin のクリエイター/ギャラリーページ**が存在する。ギャラリーの展覧会投稿で入力された**出展クリエイター情報**を基に事務局がクリエイターページを先行作成する（→オーナー未設定=admin）。ギャラリーページはその逆で、クリエイターの展覧会情報（会場）から作られる。creator/gallery 機能申請者がこれら既存ページに該当する場合、**オーナーを本人へ差し替え、過去の展覧会情報を引き継ぐ**運用。
- **相談と決定**：「申請時にどのページを引き継ぎたいか本人に聞くか／従来どおり事務局判断で引き継ぎ完了メールで知らせるか」。→ **ハイブリッド採用**：(1) 申請フォームに**任意欄**を足して本人の心当たり（URL/名称）を拾う、(2) 確認・差し替え・通知（機能付与完了メール）の**実行権は事務局が保持**。
- **理由（なぜ必須質問にしないか／なぜ自己選択のみにしないか）**：該当ページを持つのは少数派で、必須質問は大多数（存在を知らない申請者）に無用な摩擦・戸惑いを生む。かつ**申請者の自己選択だけで引き継ぐと同名別人の展覧会履歴の乗っ取り事故**につながる＝差し替えは本人確認（KYC）を伴う慎重操作なので実行権を手放さない。任意申告は名寄せ精度と本人同意の記録を得るための補助入力に留める。
- **実装（プロトタイプ）**：p11-2 ④その他（任意）に `.p211-block`「既存の掲載ページ／Existing Page」＝任意 text 入力（URL or 名称）＋help（新規CSS不要）。FAQ **CAP-12**（`cat:['creator-apply','gallery-apply']` 共通）＝引き継ぎの仕組み説明。**p11-3（ギャラリー申請・未作成）にも同ブロック＋CAP-12 を展開想定**（会場情報から作られたギャラリーページ引き継ぎ＝creator の逆）。
- **本番（React/Drupal）**：任意欄は「引き継ぎ候補の申告」であって自動マージのトリガーではない。サーバー側は申告値＋KYC＋事務局の名寄せで候補を確定し、**オーナー差し替え＝admin→本人**を事務局操作で実行。履歴（展覧会エンティティ）はページに紐づくため所有権移転のみで引き継がれる。同名衝突時は事務局が本人確認情報で判別。

### 2026-07-23 追補②（クリエイター機能申込の生年月日を必須→任意）
- **相談と決定**：p11-2 の本人確認セクションで生年月日を必須にすべきか。→ **任意に変更**（`.ktn-req` を外し「生年月日（任意）」表記＋ヘルプ）。
- **理由（コードに残らない判断）**：本人確認情報の**要求強度をフェーズで段階化**する。クリエイター機能段階の本人確認目的は「連絡・なりすまし抑止・掲載内容の確認」で、**本名・住所・電話**で充足する。生年月日が実務上effになるのは**決済・契約が絡む LIAISON+（作品販売）申込＝実際にKYCする局面**であり、そこ（p11-4）で必須にすればよい。初期申込で生年月日を必須にすると入力離脱（多くの人が入力を嫌う）を招くデメリットの方が、初期段階での抑止力向上より大きいと判断。
- **フェーズ別の必須度（確定）**：生年月日＝**p11-2 クリエイター機能／p11-3 ギャラリー機能＝任意**、**p11-4 LIAISON+＝必須**（本人確認の基点）。他の本人確認項目（本名・住所・電話）は各段階で必須のまま。
- **実装**：p11-2 の生年月日フィールドから `.ktn-req` を除去（必須チェック `p112ValidateRequired` は `.ktn-req` 走査のため自動的に対象外）。help に「利用には必須でなく、将来リエゾンプラス申込時の本人確認で必要になる」旨を明記。チェックリスト・注意事項・利用規約の「氏名・生年月日・住所・電話番号」列挙は情報種別の説明としてそのまま維持（収集はするが任意という位置づけ）。
- **本番（React/Drupal）**：申込フォームのバリデーションは段階（creator/gallery/LIAISON+）で必須項目セットを切り替える。生年月日は creator/gallery では nullable、LIAISON+ 申込到達時に未入力なら必須入力を要求する。

### 2026-07-23 追補③（お問合わせフォーム p60-11 新規作成＋QA内お問合わせリンクの p60-11 結線）
- **背景・相談**：FAQ（`KTN.QA`）回答内の「お問合せください」等が**プレーンテキストのまま**でリンクが無かった。ユーザー指示「QA内のお問合わせリンクを p60-11 に設定」＋相談「p60-11 を先に作る方がいい？」。→ **先に p60-11 を作成してからリンク結線**（`KTN.QA` は単一ソースゆえリンク化するとサイト全体の該当FAQが一斉に p60-11 を指す＝未作成のままだと全ページでデッドリンクになるため）。
- **ページ設計＝p70 エディトリアル系を流用（mgmt-page にしない）**：p60-11 は**ゲストも書ける公開サポートフォーム**（sitemap＝guest/login/user+/creator/gallery が W・admin 除く）なので、ロール所有の編集ページ用 `mgmt-page`（warm beige＋ロール top-bar）ではなく、兄弟の p60-6/p60-7 と同じ `body.p70-page`（paper bg＋`.p70-title-band`＋`.p70-wrap`）にした。フォーム中身は共通部品流用で**新規フォームCSSゼロ**（`.p211-*`／`.ktn-req`／`.p114-applicant`／`.p114-terms-agree`／`.ktn-form-error`／`KTN.submitDone`）。幅は `data-w="article"`＝760（sitemap の `--w-detail` と同値）。
- **ロール非依存の accent＝ブランド青**：`body.p60-page{--page-accent:#005da7;--page-accent-bg:rgba(0,93,167,.08)}` を新設（p6-page 等と同じ sanctioned な body クラス方式）。理由＝p60-11 は creator/gallery/user のどれでもない中立ページなので、`.p114-applicant` 左罫線や `.p6011-ref` が拾う `--page-accent` の未設定フォールバック（creator 青緑 #2a5f7a）だと誤ったロール色に見える。中立＝ブランド青（サポート/リンクの軸）に固定。固有CSSは `.p6011-faqhint`／`.p6011-ref*`（問い合わせ元コンテキスト表示）のみ＝真に p60-11 固有なので common.css に p6011 プレフィックスで追加。
- **問い合わせ元の自動セット（`?from` / `?qa`）**：リンクは `./kotennavi-p60-11.html?from=<pageId>&qa=<qaId>`。p60-11 の `p6011ReadContext()` が **`KTN.pageName(from)`**（common.js 新設の公開アクセサ＝`PAGES[id].n`。PAGES は module-scope `const` で外から読めなかったため公開）でページ名を、**`KTN.QA` から qa 該当項目の質問文**を引いて `.p6011-ref` に表示し、hidden（`from_page`/`from_qa`）へも格納。どのページ・どのQAからの問い合わせかを事務局が把握できる。
- **ユーザー名＝デモ名表示・UIDは送信に含める（ユーザー指示）**：`ktnState` はログインユーザーの実名を持たない（role のみ）。プロトタイプは `P6011_DEMO`（山田 花子／メール／`uid:'U-100482'`）を表示。デモバー「ログイン中／ゲスト」で切替＝ログイン中はアカウントストリップ表示＋氏名/メール/UID自動セット、ゲストは空欄（必須入力）。hidden `#p6011Uid` に UID を格納し、**後工程（Drupal）でセッションの実ユーザー名・メール・UIDに差し替える**前提（コードにコメント明記）。→ React/Drupal：ログイン時は氏名/メール/UID をセッションからプリフィル（氏名/メールは編集可・UID は改変不可の hidden）。ゲスト時は氏名/メール必須。
- **QAリンク化の仕組み＝`{{contact}}` トークン（単一ソース維持）**：`KTN.renderQA` に `ansHtml(x)` ヘルパーを追加し、回答本文の `{{contact}}` を `?from=<現在ページ>&qa=<x.id>` 付き p60-11 リンク（ラベル「お問合わせフォーム」・`.ktn-guide-link`・**インライン参照ゆえ矢印なし**＝メモ「矢印は明示ナビCTAのみ」に準拠）へ変換。desk/guide 両 style に適用。`esc` は `& < >` のみ置換なので `{{contact}}` は素通り→リンク化。**回答はプレーンのまま**なので `KTN.QA` の単一ソース性は不変。埋込んだ6項目＝EXH-37／EXH-40／CAP-08／CAP-09／TXN-B08／CAP-13（文面は「…{{contact}}よりご連絡ください」等に整えた）。`from` は `window.ktnState.page`（描画中のページ）＝どのページのFAQから来たかが自動で載る。
- **React/Drupal への含意**：`<ContactForm from qa>` はルータ state で from/qa を受け、ページ名/QA質問文を解決して読み取り専用表示＋hidden。FAQ 回答の `{{contact}}` は `<FAQ>` レンダラが `<Link to="/contact?from&qa">` へ展開（回答データはプレーン単一ソースのまま）。送信 payload に uid（セッション）・from_page・from_qa を含める。

### 2026-07-23 追補④（ページ3系統の整理＝「申込・送信フォーム系」を確立し p11-2/p11-4 を mgmt-page から中立化）
- **相談・決定**：p60-11 を「編集・管理系か p60 ガイド系か」で相談→ サイトのページは〈読み物（p70ガイド）〉〈ロール所有コンテンツ編集（mgmt-page）〉〈**入力フォーム**〉の3系統で、**申込・お問合わせ・要望フォームは3つ目**という整理に合意。ユーザー判断「**申込などの p11 系も中立的の方が親和性が高い**」→ p11-2/p11-3/p11-4（機能申込）・p60-11〜14（お問合わせ・要望）を**共通の中立フォームテンプレート**に寄せることを確定（→ CLAUDE.md「申込・送信フォーム系」節を新設＝canonical）。
- **なぜ中立（mgmt-page にしない）か**：申込者は**まだそのロール/機能を持っていない**（これから取得するために送る）。ロール所有者向け chrome（ベージュ地・ロール別トップバー・ロール色 accent）を先に出すのは矛盾。→ 背景 paper（`body.p70-page`）・`--page-accent` はブランド青（ロール非依存）。
- **CSS 単一ソース化**：既存 `body.p60-page{...}` を **`body.p60-page,body.p11-page{--page-accent:#005da7;...}`** にグループ化（申込・送信フォーム系の中立 accent を1本に）。新規フォームCSSは追加せず既存共通部品を流用。
- **p11-2/p11-4 の body クラス**：`mgmt-page p3-page` → **`p70-page p11-page`**。これで beige 地・ロール top-bar・creator 青緑 accent が外れ、白ボックス（`.ktn-mgmt-wrap`）のアクセント線・`.ktn-index`/`.ktn-zone` 番号・`.p114-applicant` 左罫線がすべて中立ブランド青になる。幅は `data-w="article"`＝760 を維持（`mgmt-page` の 760 強制に依存しない）。**内部の `.ktn-mgmt-wrap`/`.ktn-mgmt-stack` は汎用ボックスとして残置**（名前は legacy だが mgmt-page 非依存で成立）。
- **p11-4 のロールバー撤去**：creator/gallery 兼用だが**ロール別トップバー・`p3-page`/`p4-page` の body 付与を廃止**。ロール差は `body.p114-role-gallery`（専用セクション表示・CSS 既存 L12070-12073）＋ロール通知ブロック＋申込アカウント名で表現。identity strip は **`.ktn-mgmt-context`（mgmt用）→ `.p114-applicant`（申込アカウント）に統一**（p11-2 と同型）。`KTN.pages['p11-4']` は旧 `syncMgmtBar`（mgmt-context populate＋p3/p4 付与）を廃し、**`#p114ApplicantName` をロール別 populate する `syncApplicant` ＋ `window.ktnRender` チェーン**（KTN.init のヘッダー描画を保持しつつ申込アカウントを再同期）に置換。p11-4 は従来 `KTN.init` 未呼出（ヘッダー未描画の潜在バグ）→ **`KTN.init({page:'p11-4',role:'creator'})` 呼出に是正**（末尾で `KTN.pages['p11-4']` を自動実行）。submit も toast/pending から **`KTN.submitDone()`** に統一（p11-2/p60-11 と同じ完了フロー）。
- **未処理・後続**：p11-3（ギャラリー機能申込）は本テンプレートで新規作成予定。p60-12/13/14（要望等）も同型で量産。p11 系の `KTN.init` role 値（現状 creator）は本来「申込者＝まだ非ロールの login ユーザー」なので getActions 一括確定バッチで role/メニューを見直す（今回は chrome 中立化に限定）。indexability（noindex 継続）は SEO 方針として別途判断。
- **React/Drupal への含意**：`<AppFormPage>`（p70 外枠＋中立ブランド青 accent）＋共通フォーム部品。申込ロール差は「ロール chrome」ではなく form state（`roleGallery` フラグ）で分岐。p11-4 の申込アカウントはセッションの creator/gallery アカウントをプリフィル。

### 2026-07-24 追補⑤（コンテンツの問題報告を単一の中立フォーム p60-13 に集約＝per-content 報告ページを作らない）
- **相談・決定**：sitemap では展覧会のみに報告ページ（P2-17）を想定していたが、表示系コンテンツ（展覧会/クリエイター/ギャラリー/作品/記事/レビュー）はどれも報告先が要る。ユーザー相談「表示系すべてに報告ページを付けるべきか／その場合 p2-17 でなく p60-13 に移すべきか」→ 指示「はいお願いします」で **コンテンツ種別ごとに報告ページを増やさず、単一の中立フォーム `p60-13`「問題を報告する」に `?from=<pageId>&type=<contentType>` で文脈を渡す方式**に確定。p60-11（お問合わせ）の from-context パターンの再利用。
- **なぜ単一ページ集約か**：報告フォームの構造（対象表示＋理由select＋詳細＋送信者＋同意）はコンテンツ種別が変わっても同一で、差分は「理由の選択肢」だけ。per-content ページに割ると同型フォームが6枚に増え保守が割れる。→ 1ページ＋type分岐（`REPORT_REASONS`）で単一ソース化。sitemap の P2-17 は削除し P60-13 へ集約（canonical 更新済み）。
- **p5 を報告対象から除外**：p5（マイページ）は**自分の管理画面＝他者の公開コンテンツではない**。ユーザー本人の公開プロフィールは無く（p3/p4 がその役割）、報告の対象になるのは他者コンテンツのみ。→ REPORT_TYPE に p5 を入れない。
- **type→理由の対応（`REPORT_REASONS`・p60-13 inline / common.js `REPORT_TYPE` と対）**：exhibition＝会期/内容が事実と異なる・無断掲載/権利侵害・不適切な表現/画像・スパム・その他／creator/gallery＝なりすまし/虚偽・無断掲載/権利侵害・不適切・スパム・その他／artwork＝権利侵害(無断転載/盗用)・不適切・情報が事実と異なる・スパム・その他／article＝不適切・権利侵害・情報が事実と異なる・スパム・その他／review＝誹謗中傷/攻撃的・事実と異なる・個人情報の掲載・スパム・その他。理由選択肢は本番でも type ごとに出し分ける。
- **ヘッダー報告メニューの結線（common.js）**：getActions のドロップダウンに惰性で置かれていた「問題を報告する」ボタン6箇所を **`reportItem(page)`** に差替。`REPORT_TYPE[page]`（p2*→exhibition／p3→creator／p4→gallery／p6*→artwork／p7→article／p8→review／既定 other）から type を引き、`./kotennavi-p60-13.html?from=<page>&type=<type>` へ遷移する `.ktn-ddi danger`（⚠）を生成。**getActions のドロップダウン項目自体はまだプロトタイプ惰性（fix/report 以外は inert）＝全ページ×全ロールの確定は breadcrumb/role-menu 一括バッチ**で行う（report/fix だけ先行結線）。
- **refbox の共通化（commonize）**：p60-11 固有だった `.p6011-ref*`/`.p6011-faqhint` を **`.ktn-refbox*`/`.ktn-form-faqhint`** に汎用リネーム（common.css）。「送信フォーム系で対象コンテキストを示すボックス」として p60-11（お問合わせ元）・p60-13（報告対象）で共有。左罫線＝中立ブランド青 `--page-accent`。p60-11 の HTML class 属性も新名へ更新（要素 id は不変ゆえ JS 影響なし）。
- **PAGES 番号ドリフトの是正**：common.js PAGES に残っていた `p2-15:'展覧会-報告'` は sitemap（p2-15=広告作成／報告は旧 p2-17）と食い違う旧登録。sitemap canonical に従い**撤去**し `p60-13:'問題を報告する'` を追加（p2-13/14/15 の広域ドリフトは対象ページ未作成のため本パスではスコープ外）。
- **React/Drupal への含意**：`<ReportForm from type>`（ルータ state で from/type 受領）。理由選択肢は type→list マップ（`REPORT_REASONS`）でレンダ。送信 payload に uid（セッション）・from_page・target_type・reason・body。ヘッダーの `<ReportMenuItem page>` は `REPORT_TYPE[page]` から `/report?from&type` を生成。報告対象は他者コンテンツのみ（自分の p5 には出さない）。

### 2026-07-24 追補⑥（p11-2 申込ステータス別表示のデモ設計＝確認中は「再送信を断つ＋送信内容を見返せる」／本番の入力ロックは要実装）
- **背景（ユーザー確認）**：p11-2 のデモバー3状態（申込フォーム／確認中／利用開始）が何を確認するためのものか、という質問。→ **申込の進行段階ごとの画面差分を1ページで確認するための表示切替**（`setDemoMode`）であることを整理。実ユーザーには1状態しか出ないが、プロトタイプで3段階を手動切替できるようにしている。
- **各状態の見え方（`setDemoMode` の hidden 制御）**：〈申込フォーム〉ガイド＋目次＋フォーム＋送信バー表示（通常の申込画面）／〈確認中〉`p112PendingBanner`（⏳「現在確認中です」）を追加・**送信バー `p112SubmitWrap` を非表示**にするが**フォーム本体は残す**／〈利用開始〉`p112ApprovedBanner`（✅「クリエイター機能が有効です」）のみ表示し、ガイド `p112AboutZone`・目次 `p112Index`・サービスバナー・フォームを丸ごと非表示。
- **確認中状態の意図＝2点**：(1)**再送信防止**＝送信導線（送信バー）を消して二重申込を断つ。(2)**送信内容の確認**＝フォーム本体を残し、申込者が自分の送った内容を見返せる。利用開始状態は「もう用は済んだ」表示なのでフォームごと畳む。
- **本番で要実装（プロトタイプの表現限界）**：現状の確認中フォームは**表示は残るが入力欄のロック（readonly/disabled）はしていない**＝送信ボタンを消して導線を断つところまでの表現。→ **React/Drupal では確認中ステータスのとき入力欄を読み取り専用にする**（サーバ側でも申込ステータス≠form のときは submit を弾く）。状態判定自体も、デモの手動切替でなく**セッションユーザーの申込ステータス**（未申込/確認中/有効）から出し分ける。あわせて「ログイン必須・申込済み or 既にロール保有ならエラー」のアクセス制御も本番実装（プロトタイプ未実装＝memo `project_role_and_application_rules.md`）。
- **横展開**：p11-3（ギャラリー機能申込・未作成）・p11-4（LIAISON+）も同じ申込ステータス別表示モデル（form/確認中/有効）を踏襲する。確認中の入力ロック・サーバ側 submit ガードも共通で必要。

### 2026-07-24 追補⑦（p11-4 のみ mgmt-page 型へ差し戻し＝申込者が既にロール保有者だから／追補④の中立化を p11-4 について上書き）
- **決定（ユーザー指示「p11-4の調整です 1. ページフォーマットはp2-11,ヘッドも同じにしてください」）**：p11-4（リエゾンプラス機能申込）を**中立フォーム系（追補④）から mgmt-page 型（p2-11 と同じ chrome）へ差し戻す**。body クラス `p70-page p11-page` → **`mgmt-page p11-4-page p3-page`**。ヘッドも p2-11 と同型に（`.ktn-mgmt-head` に `__desc`＋`__guides` を追加）。
- **なぜ p11-4 だけ mgmt-page に戻すか（追補④との区別）**：p11-2/p11-3 の申込者は**まだそのロール（creator/gallery）を持っていない login ユーザー**＝ロールを取得するために送る → 中立が正。一方 **p11-4 の申込者は既に creator/gallery ロールを保有しており、その上に LIAISON+ という add-on を申し込む**。つまり「ロール所有者がコンテンツ/機能を管理する」mgmt-page の文脈に合致する。→ **CLAUDE.md「管理ページ視覚識別」表が元から p11-4 を mgmt-page として掲載していた**のとも整合（追補④が例外的に中立へ寄せていた食い違いを、この追補で p11-4 についてだけ解消）。**追補④は p11-2/p11-3/p60系については有効のまま**（p11-4 のみ上書き）。
- **ロールバーの復活**：p11-4 は creator/gallery 兼用のため、`setR(r, btn)` で `body` の `p3-page`/`p4-page`（＋`p114-role-gallery`）をトグルし、mgmt トップバー3px の色を creator 青緑／gallery 銅で切替。ロール通知ブロック（`p114RoleNoticeCreator`/`p114RoleNoticeGallery`）の hidden 切替も同関数で行う。追補④で「ロールバー撤去」としたのを p11-4 について戻す。
- **identity strip は据置**：`.p114-applicant`（申込アカウント strip）はそのまま維持（`.ktn-mgmt-context` には戻さない）。申込は「既存アカウントで add-on を申し込む」ので、汎用の mgmt-context（編集対象エンティティの表示）より申込アカウント表示のほうが意味に合う。`#p114ApplicantName` のロール別 populate も維持。
- **中身のフォーム部品は不変**：`.p114-service-banner`（LIAISON+ 説明）・creator/gallery 専用セクション・口座情報・規約同意・`p114Submit`→`KTN.submitDone()` はそのまま。chrome（body クラス・ヘッド）だけの差し替え。
- **React/Drupal への含意**：追補④の `<AppFormPage>`（中立）に対し、**p11-4 は `<MgmtFormPage>`（ロール chrome ＋ロール別トップバー）**で分岐。判定軸＝「申込者が既にそのベースロールを保有しているか」。保有者への add-on 申込＝mgmt chrome／未保有者のロール取得申込＝中立 chrome。

### 2026-07-24 追補⑧（p11-4 のヘッドを mgmt-context strip 化＋本文を p11-2 型の目次/About/FAQ 構成へ／追補⑦の「strip 据置」「ヘッド __desc/__guides」を上書き）
- **決定（ユーザー指示「p11-4の調整 1. ヘッドの表示はp3-11と同じようなクリエイターを表示 2. p11-2と同じような構成で統一。リエゾン+とは、QA、申込フォーム。…入力前に必要な説明を丁寧に。新サービスなので。」）**：p11-4 の chrome（mgmt-page・ロールバー）は追補⑦のまま維持しつつ、**ヘッドの identity 表示と本文構成**を詰める。
- **①ヘッド identity＝`.ktn-mgmt-context`（追補⑦の `.p114-applicant` 据置を上書き）**：申込アカウント strip から **p3-11 と同型の mgmt-context strip**（編集対象＝ロール保有者本人を media＋バッジ＋名前リンク＋view で示す）へ変更。creator/gallery で内容が変わるため `P114_CTX` マップ＋`p114SyncContext(r)` を新設し `setR` から呼んで populate。**なぜ変えたか**：ユーザーは「p3-11 と同じようなクリエイター表示」を望んだ＝申込アカウントの抽象 strip より、当該ロール本人を p3/p4 リンク付きで見せる mgmt-context のほうが「誰の申込か」が明確。追補⑦時点では申込アカウント表示を優先していたが、p3-11 との視覚統一を採用。
- **②本文＝p11-2 型〈目次／About／FAQ／申込フォーム〉（追補⑦のヘッド `__desc`/`__guides` を上書き）**：`.ktn-mgmt-head` から `__desc`/`__guides` を撤去し title+en のみに。説明は本文の About ゾーンへ移動して厚くする。
  - `.ktn-index`（目次3リンク）＋各章 `.ktn-zone.ktn-index-target`（p11-2 と同部品）。
  - **About ゾーン**：`.p114-guide`（＝`.p112-guide` にグルーピング。新規CSS無し）の冒頭に LIAISON+ サービスロゴ（`.p114-about-logo`＝`kotennavi_liaison_logo.html` の LIAISON+ Light 版 SVG）を置き、p70 ガイド部品で「リエゾンとの違い／料金・手数料／販売の流れ（会場優先型 6ステップ）／本人確認・振込先口座が必要な理由／お申込みの前に」を説明。**新サービスゆえ入力前の説明を厚くする**方針（ユーザー指示）。
  - **旧 `.p114-service-banner`（LIAISON+ ゴールドの説明＋手数料バナー）は廃止（ユーザー指摘「About 直下の帯は必要か」）**：説明文・手数料が直下の About 本文と重複するため。ロゴのみ SVG で残し、`.p114-service-banner*` の CSS 一式（本体・要素・mobile・stack margin リセット・`__title` フォント参照）を common.css から削除（死にCSS回避）。ロゴは装飾のため中央寄せCSS（`.p114-about-logo`）のみ新設。guide の id を `p114ServiceBanner`→`p114AboutGuide` にリネーム（承認済モードで hidden する参照も追随）。**React 含意**：LIAISON+ ロゴは共通 `<LiaisonPlusLogo variant="light|dark">` 化候補（p2/p2-3/p2-5-1/p6-2 でも同 SVG を使用中）。
  - **FAQ ゾーン**：新カテゴリ `liaisonplus-apply`（LAP-01〜11）を `KTN.QA` に新設し `renderQA(style:'guide',hideGroup:true)`。汎用 `liaison` を流用しない理由＝申込特有の関心事（なぜ本人確認・口座が必要か／審査期間／前提ロール）を集約するため。
  - **Form ゾーン**：既存 `.p211-*` フォーム部品＋ロール通知ブロックはそのまま。
- **承認済モードの hidden 対象追加**：`setDemoMode` で承認済時に `#p114AboutZone`・`#p114Index` も hidden（p11-2 と同挙動＝申込完了後は入口説明を畳む）。
- **React/Drupal への含意**：`<MgmtFormPage>`（追補⑦）の中に、識別 strip＝`<MgmtContext role>`（p3-11 と共有）＋本文＝`<PageIndex>`＋`<Zone>`（p11-2 と共有）＋`<FaqList category="liaisonplus-apply">` を組む。ヘッド説明を本文 About へ寄せる構成は p11-2/p11-3/p11-4 で共通テンプレ化できる。

### 2026-07-24 追補⑨（LIAISON+ 販売手数料の課金ベースを「作品価格のみ」→「作品価格＋送料＋梱包費の合計」へ変更＝Option A採用）
- **相談・決定（ユーザー相談→「Aですね」）**：送料・梱包費も個展なびが代金回収を代行（Stripe）するため**決済手数料が発生する**。旧仕様は手数料を「作品の販売価格のみ（送料・梱包費は対象外）」に課していたが、それだと送料・梱包費分の Stripe 決済手数料を個展なびが持ち出しになる。→ **課金ベースを税込「作品の販売価格＋送料＋梱包費」の合計に変更**（Option A＝合計に同一料率を掛ける最もシンプルで一貫した方式を採用）。
- **料率tierの基準は「作品の販売価格」帯のまま（重要な設計判断）**：10%／8% の tier 判定は**作品の販売価格だけ**で決める。理由＝**送料・梱包費は購入確定後に出品者が確定する**ため出品時点では未確定＝tier を合計で判定すると出品時に料率が確定できない。よって「tier は出品時に確定できる作品価格で決め、その料率を確定後の合計（作品価格＋送料＋梱包費）に適用する」。この tier 基準と課金ベースの分離を CLAUDE.md・docs/06 の canonical に明記した。
- **Stripe内包ロジックの一貫性**：手数料に Stripe 決済手数料を内包する（出品者の別途負担なし）方針は不変。ベースを合計にすることで、送料・梱包費にかかる Stripe 手数料も内包計算の対象に入り、持ち出しが解消する。実質マージンは引き続き非公開。
- **反映範囲（コピー横断・単一ソース更新）**：canonical＝CLAUDE.md「LIAISON+ 販売手数料」節／docs/06 第16章（基本方針＋tier基準＋料金表ヘッダを「作品の販売価格（tier判定）」に）。FAQ 単一ソース＝common.js `KTN.QA` の LAP-01／LAP-05。ガイド＝p70-2（手数料節の lead・dl ラベル・注記・計算例・価格設定/送料 FAQ）／p70-7（注記・FAQ・手取りシミュレーター）／p70-12（精算callout）／p11-4（About料金・利用規約 第3条・料金表ラベル）。
- **p70-7 シミュレーターの改修**：`送料・梱包費（任意）` 入力欄（`#simExtra`）を追加。`calcSim()` は price+extra を読み、**tier は price 帯で決定**→`ktnFee = round((price+extra)×rate)`。送料・梱包費は実費素通しとし、表示する「あなたの手取り（作品分）＝price − ktnFee」（手取り率も作品価格基準）。extra>0 のとき結果に送料・梱包費行と「手数料の計算対象に含まれます」注記を出す。
- **本番（React/Drupal）算出仕様**：手数料＝`round((作品価格＋送料＋梱包費)×rate)`、rate は**作品価格帯**（<30,000→0.10／≥30,000→0.08）。tier 確定は出品時（作品価格）、金額確定は購入確定後（送料・梱包費が入った時点）。Stripe 手数料は内包（別出しにしない）。フェーズ2の 100,000円〜6% 追加も同じ tier=作品価格基準で足す。

### 2026-07-24 追補⑩（LIAISON+ の「販売手数料」を「サービス利用料」へ全面改称）
- **相談・決定（ユーザー相談→「ではサービス利用料で先ほどの推奨通りに進めて下さい」）**：呼称を **「販売手数料」→「サービス利用料」** に統一。**理由＝** (1)「販売」を主語にすると、送料・梱包費（作品の販売そのものではない）に課すことが「理不尽」と受け取られる。実際は個展なびが代金回収（Stripe）を代行するため**回収する総額（作品代金＋送料＋梱包費）**に課しており、主語は「作品販売」ではなく「サービス利用」。(2) **料率が2段階（10%/8%）存在する**ことは「決済コストの実費」ではなく**サービスの対価**である証左で、「決済手数料」「代行手数料」だと"なぜ価格で率が変わるのか"という疑問を招く。「サービス利用料」は総額ベース・段階料率の両方に整合する。
- **語の選定**：`利用料`（サービスに自然な連語）＞`使用料`（物・権利の賃借ニュアンス）／`システム利用料`（固定額・IT色が強い）。→ **サービス利用料**を採用。
- **誤読防止のクラリファイア（UI上で近接必須）**：改称に伴い、料率表・利用規約・FAQ で「サービス利用料」を出す箇所には必ず **「作品が売れたとき（取引成立時）にかかる」** と **「作品代金・送料・梱包費の合計に対して計算」** を近接表示する（「掲載無料・売れた時だけ」の価値訴求と矛盾して読まれないように）。
- **改称する語／据え置く語（重要な区別）**：改称対象＝LIAISON+ の手数料＝`販売手数料`／`リエゾンプラス手数料`／`手数料体系`→`サービス利用料体系`／`手数料率`→`利用料率`／`システム手数料`（p3-15/p4-15 アーカイブ列）／シミュレーターの内訳ラベル。**据え置き＝`Stripe手数料`・`決済手数料`（決済コスト実費・サービス利用料に内包される内訳）・`振込手数料`（利用者負担の別費目）**。技術アンカー（`ktnFee` 変数名等）も据え置き。
- **反映範囲（単一ソース横断）**：canonical＝CLAUDE.md「LIAISON+ サービス利用料」節（見出し・料金列・利用料率ヘッダ・呼称理由段落）／docs/06 第16章（見出し・呼称 blockquote・利用料率・発生タイミング・決済フロー・参照ページ）。FAQ＝common.js `KTN.QA`（EXH-33/EXH-34/LAP-01/LAP-05/LAP-06/LAP-07/LAP-08/TXN-S10）＋`PAGES['p70-7'].n`。ガイド/申込＝p70（比較・FAQ・ナビカード）／p70-1（ナビカード）／p70-2（目次・lead・dl・計算例・FAQ・en「Service fee」）／p70-7（title/meta/og・hero・ページ内ナビ・体系見出し・表ヘッダ・ロードマップ・Stripe節・シミュレーター・FAQ・JSコメント/内訳文言）／p70-11（購入者負担FAQ）／p70-12（参照文・取引完了dd・精算callout）／p2-11（LIAISON+オプション説明）／p3-16・p4-16（取引完了メッセージ）／p3-15・p4-15（アーカイブ表ヘッダ）。typography.html・sitemap.md（P70-7名称）も追随。**historical log（追補⑨等の過去エントリ）は書き換えない**。
- **React 変換**：ラベルは `サービス利用料` を定数化（`SERVICE_FEE_LABEL`）し 1 箇所で供給。`Stripe手数料`/`決済手数料`/`振込手数料` は別語彙として保持。

### 2026-07-25 追補⑪（本人確認情報のライフサイクル確定＝入力はp11-2/編集はp3-11/p11-4は読取＋書類添付のみ・振込口座はp11-4から撤去）
- **相談・決定（ユーザー指示）**：LIAISON+ 申込（p11-4）での本人情報の扱いを次のライフサイクルに確定。
  - **入力＝creator/gallery 機能申込（p11-2 / p11-3）**：本名・フリガナ・生年月日・住所・電話をロール取得時に取得（p11-2 の「②本人確認のための情報（非公開）」）。
  - **編集＝p3-11（creator）/ p4-11（gallery・未作成）**：取得後の変更窓口。**p3-11 に「本人確認情報（非公開・本人と事務局のみ閲覧）」ブロックを新設**（ブロック5＝リンクの後・管理者コメント欄の前）。公開プロフィール群とは別扱いで `.p114-privacy-note` 付き。
  - **参照＝p11-4（読み取り専用）**：機能申込時の登録内容を引き継いで表示。`P114_CTX[r].id`（ラベル/値の配列）＋`editHref` を追加し `p114SyncContext(r)` が読取 dl（`.p114-identity-readout`）と編集リンク（`#p114IdEditLink`→creator=p3-11／gallery=p4-11）をロール別 populate。変更は「基本情報の編集」へ誘導（p11-4 では編集させない）。
- **本人確認書類（免許証・マイナンバー等の画像）は p11-4 でのみ添付・p3-11 等に保存しない（ユーザー指示「本人書類の画像添付はp11-4だけでいい」）**：LIAISON+（作品販売）の申込時に照合用として提出させ、**確認完了後に削除・非保存**（UIに明記）。プロフィール（p3-11）には持たせない＝機微情報の保管範囲を最小化。
- **本人確認の運用方法＝初期は手動突合せ（ユーザー質問への回答として合意）**：事務局が添付画像と登録情報（氏名・住所）を目視突合。eKYC SaaS は入れずに開始でき、件数増加時に eKYC（本人確認書類撮影＋容貌照合のホ方式）へ差し替える段取り。トレードオフ＝手動は事務局負荷・レビュー遅延・画像の保管/削除ポリシー必須。
- **振込先口座の入力を p11-4 から撤去（相談→合意）**：口座情報が要るのは初回振込直前なので、申込段階での必須入力を廃止し **p3-17 / p4-17（販売代金管理・未作成）でのみ登録**する方針。p11-4 の「共通：振込先口座」セクション（金融機関/支店/種別/番号/名義）を削除。利用規約 第3条は「振込はあらかじめ定められた振込日に行う」の記述で維持（口座は別ページ登録前提）。承諾事項 ga3「登録口座へ振込」も事実記述として据え置き。FAQ TXN-S11 が既に「販売代金管理ページで振込先口座の確認・登録ができる」と述べており整合。
- **副次修正（前セッションの回帰是正）**：p11-4 のセクション見出しから CREATOR/GALLERY バッジを外した際に削除した `.p114-section-head__badge` の CSS を、**中立の非公開マーカー（PRIVATE 等）用スタイルとして復活**（tag-bg 背景・muted 文字・Montserrat）。p11-2 の「PRIVATE」ラベルが無スタイル化していたため。人物/コンテンツバッジではなく「セクションの取り扱い区分」マーカーなので、バッジ配置ルール（タイトル前のみ）には抵触しない。
- **React/Drupal への含意**：本人情報は creator/gallery エンティティの非公開プロフィール属性として1ソース化し、p3-11/p4-11 が編集・p11-4 が読取参照（`<IdentityReadout role editHref>`）。本人確認書類アップロードは p11-4 専用の一時提出フロー（Drupal 側は確認後に破棄、保存しない）。口座は販売代金管理（p3-17/p4-17）のみ。本人確認は当面 admin 手動レビュー、将来 eKYC Webhook 連携。

### 2026-07-26 追補⑫（p11-3〔ギャラリー機能申込〕新規作成・p4-11〔ギャラリープロフィール編集〕新規作成＝追補⑪のライフサイクルを完結）
- **経緯（ユーザー指示）**：「p11-3の作成をお願いします。p11-2を参照して」＋現行サイトの申込ページのスクリーンショットを提示。「p3-11と同様に、private(非公開)の情報をp4-11にも追加してください」（p4-11 は本セッション時点でファイル自体が未作成）。
- **p11-3 の PUBLIC/PRIVATE 分割方針**：現行サイトのギャラリー申込フォームは「ギャラリー名・住所・連絡先・ジャンル」の後に区切り文言で「以下は公開されることがあります」→「担当者名・関係・役職」と続く**1本のフラットなフォーム**だった。新サイトでは p11-2 の①②区分と同じ設計思想で明示的な2ブロックに変換：**①ギャラリー情報（PUBLIC＝名称・カナ・英語表記・取扱いジャンル・所在地・電話・メール・SNS）／②ご担当者の本人確認のための情報（PRIVATE＝お名前・フリガナ・ギャラリーとのご関係・役職・生年月日・性別・郵便番号・住所・電話）**。現行サイトの「担当者情報」は実質公開種別だったが、新サイトの本人確認情報ライフサイクル（追補⑪）に合わせて非公開の身元確認情報として再定義した（意図的な仕様変更）。
- **なぜギャラリーの所在地・電話・メールは PUBLIC のままか（p3-11の個人住所＝非公開との対比）**：クリエイターの自宅住所は来場者が知る必要のない私的情報だが、**ギャラリーの所在地・電話・メールは来場者が会場を特定し来訪するために必須の公開情報**（p4.html の公開ページに実際に表示されている）。したがって「ご担当者個人」の識別情報（氏名・生年月日・個人連絡先）のみを非公開ブロックへ切り出し、ギャラリーという法人・屋号の所在地情報とは分離した。
- **p11-3 の FAQ カテゴリ新設**：`KTN.QA` に `cat:'gallery-apply'` を新設（GAP-01〜06＝無料か／法人名可否／屋号可否／複数拠点／ご担当者の選び方／リエゾン即時利用可否）。creator-apply と内容が完全に共通する既存Q&A（CAP-02申込後の期間／CAP-05本人確認情報の公開有無／CAP-06代理申込／CAP-08クリエイター兼用不可／CAP-09解決しない場合）は **新規複製せず cat 配列に `'gallery-apply'` を追加して共有**（CAP-10/11/12/13 は追補⑨以前から既に共有設定済みだったものを流用）。判断軸＝文面が本当にロール中立ならQA重複を避け1エントリを両カテゴリに出す（カウンター/バッジ共通化と同じ「single source」原則）。
- **p4-11 新規作成の構成（p3-11をテンプレートに直接踏襲＋新規ブロック追加）**：①基本情報②プロフィール（ジャンルpillは`p411genre`名で6分類）③ギャラリー情報・アクセス（PUBLIC＝p4.html の公開表示と一致させるため実データを転記：住所「東京都渋谷区松濤1-XX-XX」・電話「03-XXXX-XXXX」・メール「info@soilgallery.jp」・営業時間・最寄り駅）④**利用案内（新設）**＝p2-11 の会場利用案内アコーディオン（`.p211-facility-item`/`.p211-facility-row`/`.p211-facility-detail`＋`toggleFacility(key)`）と同一パターンを「展覧会ごと」ではなく「ギャラリー常設」の利用案内として再利用（入場料/駐車場/バリアフリー/クレカ・電子マネー/Wi-Fi/レンタル＝p4.html の公開ページ「利用案内」セクションの実フィールドと対応。Wi-Fiは旧公開ページに無かった項目だが追補⑪以前の progress.md 決定で追加予定とされていたため新設）⑤リンク⑥**本人確認情報（非公開）＝本タスクの主目的**。⑥は p3-11 のブロック5と**同一の項目セット・同一の `.p114-privacy-note` 文言**を「ご担当者」向けに言い換えて再利用（お名前・フリガナ・ギャラリーとのご関係・役職・生年月日・郵便番号・都道府県+市区町村・番地建物名・電話）。p11-3 の PRIVATE ブロックと項目・文言を意図的に揃え、入力（p11-3）→編集（p4-11）で同じ情報モデルになるようにした。
- **facility トグル関数を p4-11 専用に複製した理由**：p2-11 の `toggleFacility(key)` は展覧会エディタのグローバル関数として既存実装があり、同名で再利用すると別ページ間の名前衝突・意図しない挙動の懸念があるため、`p411ToggleFacility(key)` として独立複製（ロジックは同一＝`detail.hidden = (sel.value==='')`）。
- **getActions() の是正**：`common.js` の `getActions()` は p4-11 を以前から `['p4-11','p4-12','p4-13']` の汎用グループ（「ガイド」ボタンのみ）にまとめていた（p4-11 実体が無い段階の暫定フォワード定義）。今回 p4-11 が実際に「プロフィール編集」ページとして確定したため、p3-11 と同型のオーナーメニュー（プロフィール編集/展覧会を管理/LIAISON+コンソール/インサイト/アカウント設定）を持つ専用分岐へ切り出し、p4-12/p4-13（インサイト・ウォッチャー管理＝未作成）のみ汎用グループに残した。
- **sitemap.md の是正（副次）**：P11-2 が実ファイル（`kotennavi-p11-2.html`）作成済みにもかかわらず `未作成`/`#` のまま放置されていたステータス不整合を発見・是正（P11-2/P11-3/P4-11 をまとめて「調整中」＋実ファイル名に更新）。sitemap.md はステータスの正だが更新漏れが起きうる好例として記録。
- **React/Drupal への含意**：p11-3 の PUBLIC/PRIVATE 分割・p4-11 の本人確認ブロックは p3-11/p11-2 と同一の `<IdentityFields>` 相当データモデルを共有できる（fields: name/kana/relation/title/birthdate/gender/zip/pref/city/addr/tel）。ギャラリー利用案内（施設情報）は `<FacilityToggleGroup items>` として p2-11 の展覧会レベル版と同型だが**エンティティ粒度が異なる**（ギャラリー常設 vs 展覧会ごと）ため、コンポーネントは共有しつつスキーマは別テーブル（gallery_facility / exhibition_facility）に分離する想定。

### 2026-07-26 追補⑬（p11-3〔ギャラリー機能申込〕の表現を「ギャラリー限定」に読めないよう中立化）
- **相談・決定（ユーザー指示）**：個展なびの「ギャラリー」機能はギャラリー・美術館・展示スペースの総称（プロジェクト前提）だが、p11-3 のリード文が「貴ギャラリー」と断定的に呼びかけていたため、美術館・その他展示スペースの担当者が「対象外では」と敬遠しかねないとの指摘。あわせて「プロフィール」という語がギャラリー（組織）向けとしては不自然、リエゾン説明の「出展クリエイター」がどの展覧会の出展者か曖昧、の2点も同時に指摘された。
- **①訴求文言の中立化（重要な文言判断）**：総称であることを**マーケティングコピーの冒頭で明示**する方針に転換。旧「ギャラリー機能は、貴ギャラリーで開催する展覧会をギャラリー自ら掲載・管理し…」→新「ギャラリー機能は、ギャラリー・美術館・展示スペースなど、展覧会を主催するすべての方のための機能です。会場で開催する展覧会をご自身で掲載・管理し…」。理由＝「ギャラリー」という語自体は残す（サイト全体の呼称一貫性・後段のフィールドラベル「ギャラリー名」等との整合のため変更しない）が、**読者が自分ごととして受け取れるよう最初の一文で対象範囲を明言**する。以降の本文・フォームラベルでは「貴ギャラリー」という所有格の直接呼びかけを避け「会場」「ページ」等の中立語に置換（例：展覧会ddの「貴ギャラリーで開催する」→「会場で開催する」／既存ページ照会欄の「貴ギャラリーのページ」→所有格を外し「ページ」）。**個々のフィールド名（「ギャラリー名」等）は変更しない**＝総称としての「ギャラリー」表記自体は問題なく、問題は「貴〜」という個別の呼びかけ方だった、という切り分け。
- **FAQ に美術館名指しのQ&Aを新設**：`gallery-apply` カテゴリの先頭に `GAP-00`（「ギャラリーではなく美術館や展示スペースですが申込めますか？」）を追加。マーケティングコピーだけでなく、実際に迷った読者がFAQで直接答えを得られるようにする二段構え。GAP-04 の「複数の店舗・拠点」→「複数の拠点」（「店舗」は小売業の含意が強く美術館に合わないため除去）。
- **②「プロフィール」→「ギャラリー情報」に統一**：組織・施設に対して「プロフィール」は個人向けの語感が強いとの指摘を受け、p11-3 内の3箇所（「利用できる機能」ギャラリーページdd／「ご利用開始まで」ステップリスト／`.p211-block__title` の英ラベル `Gallery Profile`）を「ギャラリー情報」「Gallery Information」に統一。**p4-11 側は本追補時点で未対応**（p11-3 が先行、次ラウンドで同様のチェックが必要）。
- **③リエゾン説明の文脈明確化**：「利用できる機能」リエゾンddの「出展クリエイターの作品をオンラインで展示できます」は、複数展覧会を持つギャラリーページ文脈では"どの展覧会の"出展クリエイターか読み取りにくいとの指摘。直前の「会期中の展覧会と連動し」を受けて「その展覧会の出展クリエイターの作品を」と指示語を補い一意にした。
- **未反映・次ラウンド確認事項**：p4-11（ギャラリープロフィール編集ページ。追補⑫で新規作成）にも同種の「プロフィール」表記・ギャラリー限定と読める文言が残っている可能性があり、本追補のチェック観点（①総称の明示②プロフィール→ギャラリー情報③指示語の明確化）を横展開する必要がある。
- **React/Drupal への含意**：マーケティングコピー・FAQ文言は今回のように「総称であることの明示」を要求される可能性があるため、ギャラリー/美術館向けコピーは翻訳・ローカライズ時も同一の中立フレーミング（cat="gallery-apply" 系FAQ・リード文テンプレート）を維持する。

### 2026-07-26 追補⑭（p4-11〔ギャラリー情報編集〕の「プロフィール」表記を是正＝追補⑬の横展開）
- **経緯（ユーザー指示）**：追補⑬でp11-3の「プロフィール」→「ギャラリー情報」是正を行った際、p4-11（追補⑫でp3-11を直接ミラーして新規作成）にも同じ問題が残っている可能性を確認質問→ユーザーが「はい」と確認・修正を承認。
- **是正箇所（p4-11.html）**：`<title>`「ギャラリープロフィール編集」→「ギャラリー情報編集」。ページ見出し `ktn-mgmt-head__title` 同様。英ラベル `ktn-mgmt-head__en`「GALLERY PROFILE」→「GALLERY INFORMATION」。
- **ブロック2の命名は「ギャラリー情報」ではなく「ギャラリー紹介」（重要な判断）**：p4-11 にはブロック3「ギャラリー情報・アクセス」（所在地・電話・メール・営業時間・最寄り駅＝追補⑫で確定したPUBLIC情報）が既存する。ブロック2（旧「プロフィール」＝取扱いジャンルpill＋紹介文）を単純に「ギャラリー情報」へ改名するとブロック3と名称が重複・混同するため、**中身（ジャンル・紹介文）に即した「ギャラリー紹介」/`INTRODUCTION`** を採用した。ページ見出し全体（title/h2/en）の「プロフィール」→「ギャラリー情報」と、ブロック個別名の「プロフィール」→「ギャラリー紹介」は**別の置き換え語を意図的に使い分けている**（同一語で統一すると衝突するため）。
- **getActions()（common.js）の是正**：gallery ロール向けオーナーメニューが2箇所に存在（`page==='p4'`＝公開トップページのオーナー導線、`page==='p4-11'`＝自ページのオーナーメニュー）。両方の項目テキスト「プロフィール編集」→「ギャラリー情報編集」に統一（`p4-11` 側コメント見出しも同様に更新）。creator/user 向けの同名メニュー（p3・p3-11・p5）は個人向けで語感が適切なため変更していない。
- **確認済み・対象外**：p4-11.html に「貴ギャラリー」「出展クリエイター」の表現は無し（Grep確認済み）。よってp11-3の①③相当の是正は本ページでは不要、②相当（プロフィール表記）のみが対象だった。
- **未対応・要ユーザー判断（次回以降）**：公開ページ `kotennavi-p4.html`（sitemap.md 上「Fix済」）にも「プロフィール詳細 →」というアンカーリンク文言（L104付近）と、日本語見出し「ギャラリー情報」に対応する英サブラベルが依然「Profile」のまま（L240付近）残っている。今回のユーザー承認は p4-11 に限定されており、p4.html は既にFix済ステータスのページを無断で再オープンすることになるため、**今回は着手せず次回ユーザーに要否を確認する**。
- **React/Drupal への含意**：`<ProfileEditPage>` 相当のコンポーネントをcreator/gallery共有で設計する場合、見出し文言（「プロフィール編集」vs「ギャラリー情報編集」）はロールに応じた文言差し替えが必要（データモデル・レイアウトは共通、ラベル文言のみロールごとのpropsで切替）。

### 2026-07-26 追補⑮（公開ページ kotennavi-p4.html＝Fix済ページの残存「プロフィール」表記も是正）
- **経緯（ユーザー指示）**：追補⑭で p4-11 を是正した際、公開ギャラリーページ `kotennavi-p4.html`（sitemap.md 上「Fix済」）にも「プロフィール詳細 →」リンク文言・英サブラベル「Profile」が残っていることを確認質問として提示→ユーザーが「はい」と是正を承認。**Fix済ページを再オープンする判断はユーザー確認を経て行った**（無断でのFix済ページ変更はしない、という運用方針どおり）。
- **是正箇所**：自己紹介欄下のジャンプリンク `#p4HeadBioProfileLink` のテキスト「プロフィール詳細 →」→「ギャラリー情報詳細 →」。セクション見出し（日本語は既に「ギャラリー情報」に是正済みだった）の英サブラベル `.ktn-sec-en`「Profile」→「Information」。HTMLコメント「F. プロフィール」（開始・終了2箇所）→「F. ギャラリー情報」。
- **IDは変更していない**：`id="p4HeadBioProfileLink"` / `id="p4-sec-profile"` はJS（pages.js 3箇所＝ヒーロー自己紹介の「もっと見る」トグル・スムーススクロール処理）から参照されるため維持。テキストコンテンツのみ変更し、pages.js側に修正は不要（Grepで確認・ハードコードされた重複文言なし）。
- **これで p11-3（追補⑬）→ p4-11（追補⑭）→ p4（本追補）の3ページにわたる「プロフィール」表記のギャラリー文脈是正が完了**。creator/user 向けページ（p3・p3-11・p5）の「プロフィール」表記は個人向けとして適切なため対象外のまま。
- **React/Drupal への含意**：追補⑭と同様、gallery ロールのUI文言は「プロフィール」ではなく「ギャラリー情報」系の語を一貫して使う。ページ単位のコンポーネント（`<GalleryProfileSection>` 相当）も命名・表示文言をロールに応じて `Information`/`Profile` を出し分ける設計にする。

### 2026-07-26 追補⑯（p11-3のFAQ9点修正＋ご担当者情報のPRIVATEブロックを「本人確認」から「連絡先のみ」へ縮小＝重要な設計変更）
- **経緯（ユーザー指示・9項目の指摘）**：p11-3のFAQ・PRIVATEブロックについて番号付きで9件の指摘。9番目は本文が空欄だったため対応保留（次回確認）。
- **①アートフェア追加**：CAP-11「個展以外の展覧会も掲載できますか？」の回答例示に「アートフェア」を追加（creator-apply/gallery-apply共有のため両ページに反映）。
- **②CAP-12の対象読者を明確化**：旧文言「すでに私の展覧会情報が個展なびに載っているようです」は、実際には**まだ個展なびにユーザー登録もクリエイター/ギャラリーページ利用もしていない人**向けの質問だったが、文面からは「すでに登録済みの自分の展覧会」の話に読めてしまっていた。Q文を「まだ個展なびにユーザー登録していないのですが、自分（自社）の展覧会情報がすでに掲載されているようです。引き継げますか？」に修正し対象読者を明示。
- **③CAP-05をgallery-applyカテゴリから除外**：「本名・住所などの本人確認情報は公開されますか？」はcreator-apply専用に変更。理由＝下記⑧の設計変更により、gallery側はご担当者に本名・住所レベルの本人確認情報を求めなくなったため、このFAQ自体が該当しなくなった。
- **④CAP-09（ここで解決しない場合は？）を配列末尾（GAP-06直後）へ移動**：`KTN.renderQA` は `KTN.QA.filter()` で配列順を保持するため、定義順＝表示順。移動によりcreator-apply・gallery-applyどちらの一覧でも「ここで解決しない場合は？」が確実に最後に表示されるようにした（従来はGAP系の後に来ておらず途中に埋もれていた）。
- **⑤GAP-02の意図（ユーザーからの質問への回答）**：GAP-02「法人名・屋号で申し込めますか？」は、creator-apply側のCAP-03「企業・団体・グループ・展覧会名で申し込めますか？→いいえ、個人限定」と対になる設計意図で作られたFAQ＝**クリエイター機能は個人名限定だが、ギャラリー機能は法人名・屋号でもOK**、という非対称性を明示するためのもの。しかし従来文は「個人でギャラリー活動をされている場合は個人名でお申込みください」という追加情報だけが目立ち、本来伝えたい「法人名OK」のメッセージが弱く分かりにくかった。
- **⑥GAP-03（ギャラリー名は正式な法人名でないといけませんか？）を廃止しGAP-02へ統合**：GAP-03はGAP-02と実質同じ内容（法人名でなくても屋号で良い）を別の質問として重複させていたため不要と判断。新GAP-02＝「はい、法人名・屋号のいずれでもお申込みいただけます。正式な法人名でなくても、普段お使いの屋号・ギャラリー名でご登録いただけます。個人でギャラリー活動をされている場合は、個人名でのお申込みも可能です。」に一本化。
- **⑦GAP-04の言い回しを明確化**：「複数の拠点がある場合はどうすればよいですか？」は「拠点」という語が分かりにくいとの指摘。実態＝**複数のギャラリースペースを運営している場合、スペースごとに別のメールアドレスでユーザー登録してから、それぞれ申し込む**という意味。Q「複数のギャラリースペースを運営しています。それぞれ掲載できますか？」／A「はい、可能です。ギャラリーページは1スペースにつき1ページとなります。複数のギャラリースペースを運営されている場合は、スペースごとに別のメールアドレスでユーザー登録のうえ、それぞれお申込みください。」に変更。
- **⑧ご担当者＝本人確認不要という設計変更（今回の中心的決定）**：ユーザー指示＝「担当者は個展なびに登録されたギャラリーページを管理し、展覧会を掲載する担当の方、個展なび情報の掲載情報について連絡確認できる方。のちのリエゾン+機能申請とは異なる可能性があるので、特に本人確認をしない」。
  - **含意**：p11-3の申込フォームに記入する「ご担当者」は、あくまでギャラリーページの運用・連絡窓口としての役割であり、**将来リエゾンプラス（作品販売）を実際に申し込む人物と同一である保証がない**。したがって、この段階で氏名・生年月日・住所などのKYCレベルの本人確認情報を集めることは目的に対して過剰であり、かつ実際の申込者と一致する保証もないため意味を持たない。
  - **設計変更内容（p11-3.html）**：
    - セクション見出し「ご担当者の本人確認のための情報（サイトには公開されません）」→「ご担当者情報（サイトには公開されません）」。ブロックタイトル「ご担当者ご本人の情報 / Identity」→「ご担当者情報 / Contact」。
    - **削除フィールド**：生年月日・性別・郵便番号・都道府県・市区町村・番地建物名（＝個人識別・住所照合のための項目一式）。
    - **維持フィールド**：お名前（フルネーム）・フリガナ・ギャラリーとのご関係・役職肩書き・電話番号（＝連絡が取れれば足りる情報のみ）。
    - プライバシー注記の文言を「本人確認のための情報をお預かりします…本人確認にのみ使用」から「ご連絡する際の窓口として…掲載内容の確認やご連絡が必要な場合にのみ使用」に変更し、末尾に「生年月日・ご住所など本人確認のための情報は、ここでは伺いません（将来リエゾンプラスをお申込みの際に、実際にお申込みされる方についてあらためて確認します）」を明記。
    - 連動して変更した箇所：代理人ブロックの案内文（「本人確認のための情報」→「ご担当者情報」）／同意チェックリストのgga2文言／利用規約第4条（見出しも「本人確認情報」→「ご担当者情報」に変更、内容も本人確認目的の記述を削除）／お申込み前確認リストの注記。
    - GAP-05（誰を「ご担当者」として登録すればよいですか？）も同趣旨で書き換え、「ご担当者は本人確認（生年月日・住所などの照合）を必要としません。将来リエゾンプラスをお申込みの際は、実際にお申込みされる方について別途本人確認を行うため、ご担当者と異なる方でも構いません」を明記。
  - **対象外（変更していないもの）**：p4-11・p11-4の「本人確認情報（非公開）」ブロック（追補⑪/⑫で確定した氏名・フリガナ・関係・役職・生年月日・郵便番号・住所・電話のフルセット）はそのまま維持。**実際にKYCレベルの本人確認が必要になるのは、リエゾンプラスへ申し込む本人がp4-11を編集するタイミング**という運用に一本化された（p11-3入力→p4-11で引き継ぎ、という当初想定＝追補⑪⑫の設計思想は、ギャラリーについては撤回）。creator側（p11-2→p3-11）は引き続き元の本人確認情報引き継ぎ設計のまま（個人が自分自身で申し込むため、担当者≠申込者というズレが起きない）。
- **未対応**：ユーザーメッセージの項目9（本文なし）は次回確認が必要。
- **React/Drupal への含意**：gallery エンティティのデータモデルは「ご担当者（連絡先のみ・軽量）」と「本人確認情報（KYCレベル・p4-11/p11-4スコープ）」を**別スキーマ**として扱う（同一人物である前提の1レコードに統合しない）。creator エンティティは申込者本人＝担当者が同一なため、引き続き1レコードのライフサイクル（p11-2入力→p3-11編集→p11-4参照）を維持する。ロールによってこのデータモデルの粒度が異なる点をAPI設計時に反映する。

### 2026-07-26 追補⑰（追補⑯のFAQ内容をユーザーが実際の質問実態に合わせて再修正・4点）
- **経緯**：追補⑯で作成したFAQのうち4件について、ユーザーから「実際によく来る質問はこれとは違う」との指摘があり内容を再修正。
- **①CAP-12を再定義**：追補⑯で作った「まだユーザー登録していないが自分の展覧会情報が掲載されている」という文脈は実態と異なり、**実際に多い質問は「自分で作った覚えがないのに、クリエイター（ギャラリー）ページができているのはなぜ？」という驚き・疑問**だった。Q「自分で作った覚えがないのに、クリエイター（ギャラリー）ページができているようです。なぜですか？」／A冒頭を「他の方が展覧会情報を投稿された際、その出展者・会場の情報をもとに、事務局があらかじめクリエイター・ギャラリーのページを作成している場合があります」という理由説明を主役にした（引き継ぎ手順の案内文は維持）。
- **②CAP-06（代理申込）をcreator-apply限定に変更**：「ギャラリーの場合は代理申込のFAQは不要」との指摘。`cat`を`['creator-apply','gallery-apply']`→`'creator-apply'`単独に変更し、回答文の「（ギャラリーの場合はご担当者）」という並記も削除。**重要な留保**：これはFAQ項目の要否についての指示であり、p11-3.html自体の代理人選択機能（「申込者について」＝ご担当者本人／代理人のラジオボタン＋代理人氏名・フリガナ入力欄）はギャラリー側にも実装として残置した（機能の削除は指示されていない）。FAQでの説明とUI機能が非対称になる点は、後工程での画面ヘルプ文言設計時に留意。
- **③GAP-02を全面差し替え（最重要）**：追補⑯でGAP-02とGAP-03を「法人名・屋号OK」の趣旨に統合したが、ユーザーによれば**実際によくある質問はこれとは全く別物**＝「自分のスペース（貸し画廊等）を持たないギャラリスト・企画者からの申込可否」。個展なびのギャラリーページ仕様は会場情報（住所を含む）を表示する前提のため、スペースを持たない申込者にも**住所が公開されることへの事前了承**を求める必要がある、という運用上重要な注意喚起。Q「自分のスペース（貸し画廊・展示会場）を持っていませんが、申し込めますか？」／A「はい、お申込みいただけます。ただし個展なびのギャラリーページは会場情報として住所を表示する仕様のため、スペースをお持ちでない場合も、ご登録いただく住所が公開されることをあらかじめご了承ください。」に全面差し替え。**含意**：p11-3の申込フォームで登録する住所は、必ずしも来場者向けの物理会場ではなく、スペースなしギャラリストの場合は自宅・事務所等の住所である可能性があり、それがそのままギャラリーページに公開表示される。フォームのヘルプ文言・入力時の同意確認UIを設計する際、この点の明示が必要（現状はFAQでの言及のみ、フォーム本体側の明示的な同意チェックは未実装＝今後の課題として留意）。
- **④GAP-05から本人確認・リエゾン+言及を削除**：追補⑯で「ご担当者は本人確認を必要としません。将来リエゾンプラスをお申込みの際は…」を追記していたが、ユーザーから「この質問の回答としては不要、リエゾン関連も無関係」との指摘。回答を「ギャラリーページの管理・展覧会の掲載を担当し、掲載内容について個展なびからの連絡・確認に対応いただける方をご担当者としてご登録ください。」のみに簡素化。**注**：ご担当者＝本人確認不要という設計自体（追補⑯⑧）は撤回されておらず、p11-3のPRIVATEブロック本体（セクション見出し・プライバシー注記・利用規約第4条等）側で既に説明済みのため、FAQでの重複説明を整理しただけ。
- **React/Drupal への追加含意**：GAP-02（スペースなしギャラリスト）の存在は、gallery エンティティの「会場住所」フィールドが**必ずしも一般公開向けの来訪可能な物理会場ではない**ケースを許容する設計であることを示す。Drupal側のフィールド説明・バリデーション・「住所を公開する」という明示同意フラグの要否を、フォーム実装時に改めて検討する余地がある（本セッションではFAQレベルの注意喚起のみで、フォームの同意UI自体は変更していない）。

### 2026-07-26 追補⑱（追補⑰のFAQ文言をさらに再修正＋gallery-apply/creator-apply全体の表示順を「プリミティブ→詳細→問合せ」の3層へ並べ替え）
- **経緯**：追補⑰で直した内容についてユーザーから3点の再指摘。うち3点目はFAQ表示順という設計原則レベルの指摘だった。
- **①CAP-12を前向きな「引き継ぎ」表現に再修正**：追補⑰の「自分で作った覚えがないのに…なぜですか？」はクレーム・ネガティブな響きがあるとの指摘。Qを「自分の展覧会情報をもとに、すでにクリエイター・ギャラリーページができているようです。このページを引き継ぐことはできますか？」に変更（“なぜ”という疑問形→“引き継げるか”という前向きな行動の問いへ転換）。Aの内容自体（他の方の投稿を起点に事務局が仮ページを作成する仕組み・引き継ぎ手順）は維持し、冒頭の疑問文だけをポジティブなトーンに差し替えた。
- **②GAP-02の仕組みを訂正**：追補⑰で書いた「ギャラリーページに（自分の）住所が公開されることを事前了承してください」という説明は、実際の運用と異なっていた。正しい仕組み＝**展覧会ごとの登録画面にある「会場情報」欄に、その展覧会の実開催会場を入力してもらい、事務局がその情報をもとに展覧会情報へ開催情報のリンクを行う**（ギャラリー自身の住所を固定表示する設計ではない）。A全文を「はい、お申込みいただけます。スペースをお持ちでない場合、ギャラリーページに固定の会場情報は表示されません。展覧会を掲載する際は、展覧会情報の登録画面にある『会場情報』欄に、その展覧会を実際に開催する会場をご入力ください。ご入力いただいた情報をもとに、個展なび事務局が展覧会情報に開催情報のリンクを行います。」に訂正。**訂正の含意**：スペースなしギャラリストの「会場」はギャラリーエンティティではなく**展覧会（exhibition）エンティティ側**の会場フィールドに都度入力される。ギャラリーページ自体は固定会場を持たない運用も許容する設計になる（追補⑰で示唆した「ギャラリー住所の公開同意フラグ」は不要になった＝この論点は撤回）。
- **③FAQ全体の表示順を「①プリミティブな条件（対象・費用の基本ルール）→②運用の詳細・エッジケース→③ここで解決しない場合（必ず最後）」の3層に再設計（最重要・設計原則）**：
  - ユーザー指示：「ギャラリーではなく美術館～のQを2番目に、利用無料は3番目に、機能申込のプリミティブな条件についてを上の方に表示して、細かい内容は下に」。
  - `KTN.QA`配列内の物理位置を並べ替え（`kotennavi-common.js` L654〜のcreator-apply/gallery-apply共有ブロック）。
  - **新しい gallery-apply（p11-3）表示順**：① CAP-11（個展以外もOK）② GAP-00（美術館・展示スペースもOK）③ GAP-01（無料か）④ GAP-02（スペースなしもOK）｜ここまでがプリミティブな条件クラスタ｜⑤ GAP-04（複数スペース）⑥ GAP-05（ご担当者は誰か）⑦ GAP-06（リエゾン/リエゾン+すぐ使えるか）⑧ CAP-12（既存ページ引継ぎ）⑨ CAP-13（ログイン不明）⑩ CAP-02（いつ使えるか）⑪ CAP-10（ウォッチとは）⑫ CAP-08（クリエイターとの排他）｜運用詳細・エッジケースクラスタ｜⑬ CAP-09（ここで解決しない場合）。
  - **副作用として creator-apply（p11-2）の表示順も連動して変化**：CAP-11/12/13/02/10/08/09はcreator-apply/gallery-apply共有エントリで、`KTN.renderQA`が`Array.prototype.filter()`で配列の物理位置＝表示順を決めるため、共有エントリの位置を動かすとp11-2側の順序も変わる。**新しい creator-apply（p11-2）表示順**：① CAP-01（無料か）② CAP-11（個展以外もOK）③ CAP-03（企業名不可）④ CAP-04（本名でなくてよいか）｜プリミティブな条件クラスタ｜⑤ CAP-05（本名住所の公開有無）⑥ CAP-06（代理申込）⑦ CAP-07（リエゾン/リエゾン+すぐ使えるか）⑧ CAP-12（既存ページ引継ぎ）⑨ CAP-13（ログイン不明）⑩ CAP-02（いつ使えるか）⑪ CAP-10（ウォッチとは）⑫ CAP-08（ギャラリーとの排他）｜運用詳細クラスタ｜⑬ CAP-09（最後）。
  - **判断根拠**：ユーザーの指示はgallery-apply（p11-3）限定だったが、「プリミティブな条件を上、詳細を下」という原則自体はcreator-apply（p11-2）にも等しく適用可能な一般設計原則であり、共有エントリを介した物理配列という制約上、creator-apply側だけ旧来の順序に留める術がなかった（片方だけ独立制御するには共有エントリを複製して個別ID化する必要があるが、単一ソース維持のメリットの方が大きいと判断し複製はしなかった）。そのため今回はp11-2側の順序変更も意図的に許容し、同じ設計原則で統一した。
  - **要フォローアップ**：p11-2（クリエイター機能申込）のFAQ順序がユーザー未確認のまま変更されている。次回のブラウザ確認時にp11-3だけでなくp11-2の並びも見てもらう必要がある（feedback_paired_page_edits の考え方どおり、共有コンポーネントを介した連動変更はペア相手にも触れる）。
- **React/Drupal への含意**：FAQ／QA表示順は「配列定義順＝レンダリング順」という現行実装に依存しているため、Drupal移行時にFAQエンティティを持つ場合は明示的な `sort_order`（カテゴリごとの重み）フィールドを持たせ、複数カテゴリに出る共有Q&Aでも各カテゴリごとに独立した順序を指定できるようにするのが望ましい（現行のJS実装の「共有エントリの物理位置が両カテゴリに連動する」という制約は、Drupalではこの`sort_order`アプローチで解消できる）。

### 2026-07-26 追補⑲（p11-2/p11-3の共有QA順序不一致を解消＋GAP-02の説明を最終統合）
- **経緯**：追補⑱で予告した「creator-apply側の順序変更は未確認」というフォローアップ事項どおり、ユーザーがp11-2をIDE上で開いてp11-3と見比べ、「p11-2,p11-3の無料利用と個展以外の展覧会の順が逆ですね」と実際に指摘。想定していた副作用が的中した。
- **①CAP-01/CAP-11の物理位置を入替**：追補⑱時点の配列順は `CAP-01, CAP-11, CAP-03, CAP-04, GAP-00, GAP-01, GAP-02, …` で、creator-apply側は「CAP-01（無料）→CAP-11（個展以外もOK）」、gallery-apply側は「CAP-11（個展以外もOK）→GAP-00→GAP-01（無料）」という表示になり、"個展以外もOK"と"無料か"の相対順序がp11-2とp11-3で逆転していた（gallery-apply側はGAP-00/GAP-01がgallery-apply専用のためCAP-11の後にしか続けられず、creator-apply側だけCAP-01がCAP-11より先に来ていたのが原因）。CAP-11をCAP-01より前に移動し、配列順を `CAP-11, CAP-01, CAP-03, CAP-04, GAP-00, GAP-01, GAP-02, …` に変更。これによりcreator-apply＝CAP-11→CAP-01→CAP-03→CAP-04、gallery-apply＝CAP-11→GAP-00→GAP-01→GAP-02となり、「個展以外もOK」が両ページとも「無料か」より先に来る同じ相対順序に統一された。
- **②GAP-02の説明を最終統合**：追補⑰「住所公開の同意が必要」→追補⑱「いや、展覧会側の会場情報欄で個別リンクする仕組みのみ」と2回にわたり書き換えてきたが、ユーザーから「ギャラリーページにはギャラリー情報として住所・地図が表示されてしまうことを了承して頂く必要がある。展覧会情報には別の会場情報を記入できるという意味」という最終確認があり、**追補⑱で撤回した「住所公開の同意」と追補⑱で採用した「展覧会側の会場リンク」は排他ではなく両方とも実際の仕様として併存する**ことが判明。GAP-02のAを「はい、お申込みいただけます。ただし個展なびのギャラリーページには、ギャラリー情報として住所・地図が表示される仕様のため、スペースをお持ちでない場合も、ご登録いただく住所が公開されることをあらかじめご了承ください。なお、展覧会を掲載する際は、展覧会情報の登録画面に会場情報を別途ご入力いただけるため、ギャラリーの登録住所とは異なる会場で開催する展覧会も掲載できます。」に統合し、両方の仕組みを1つの回答内に明記した。
- **設計データモデルの含意**：ギャラリーエンティティは常に住所・地図を「ギャラリー情報」として保持・表示する（スペースなしギャラリストでも登録住所は公開される＝物理店舗の有無に関わらずギャラリーentityは所在地フィールドを持つ）。一方、展覧会（exhibition）entityは会場情報を独立して持てるため、ギャラリーの登録住所と異なる会場で開催する展覧会も表現できる。両者は独立したフィールドであり、「どちらか一方」ではなく「ギャラリー情報の住所表示」＋「展覧会ごとの会場情報」の2階層で会場データを扱う設計。
- **`node --check`・Grepで配列順を確認済み**。
- **教訓**：追補⑱で自ら明示した「要フォローアップ」（共有エントリを介した連動変更は必ずペア相手のページも確認する）が実際に機能した例。今後も共有`cat`配列を持つQAエントリを並べ替える際は、両カテゴリでの最終表示順を都度Grepで確認してから完了とする。

### 2026-07-26 追補⑳（p11-3申込フォーム6項目修正：PUBLIC/PRIVATEバッジ廃止・ギャラリー名/担当者関係/所属欄の是正・申込者セクション廃止）
- **①`.p114-section-head__badge`（PUBLIC/PRIVATE）を廃止**：セクション見出し自体が「（サイトに公開されます）」「（サイトには公開されません）」を既に明記しており、英字バッジは冗長かつ管理画面的すぎて場違いという指摘。p11-3の2箇所に加え、**同一コンポーネントを使うp11-2（クリエイター情報＝`--creator`修飾子つき／本人確認のための情報）・p11-4（本人確認）からも同時に削除**（共有コンポーネントの一部だけを変えると視覚的な不統一が生まれるため、指摘は1ページでも波及範囲全体に適用）。common.cssの`.p114-section-head__badge`ルール自体も未使用となったため削除（`--creator`系の専用CSSは元々未定義だった＝HTML側の`--creator`修飾子は最初から見た目に影響していなかった）。
- **②ギャラリー名フィールドの誤った可用性表現を削除**：「法人・屋号・個人名でのご登録が可能です。」はギャラリー名（表示名）に対する説明として不正確との指摘（ギャラリー名はギャラリー自体の呼称そのものであり、"誰の名義で登録できるか"という項目ではない）。ヘルプ文を「ギャラリーページや展覧会情報に表示される名称です。」のみに簡素化。同意事項ノート内の重複記載「法人名・屋号でのお申込みも可能です。個人でギャラリー活動をされている場合は個人名でお申込みください。」も同じ理由で削除。
- **③ご担当者とギャラリーの関係selectを是正**：担当者の資格要件（ユーザー原文）＝「ギャラリー/美術館/スペースの運営者・スタッフ、もしくはギャラリー/美術館/スペースから正式に広報活動を依頼された代理の方に限る」を反映し、select直下にこの条件文を新設。選択肢は「オーナー」「経営者」の重複（オーナー＝経営者）を統合して「オーナー・運営者」の1つにまとめ、「スタッフ」「広報委託先（代理店など）」「その他」の4択に整理（旧「経営者」単独オプションは廃止）。
- **④⑤「役職・肩書き」フィールドを廃止し「所属」フィールドへ差替**：役職・肩書きは一般に開示を避けたがられる項目という指摘を受け撤去。代わりに現行本番サイトの仕様に合わせ「ご担当者の所属」（任意・所属会社名/部署名、placeholder例「Gallery SOIL 渋谷 広報部」）を新設。③の「広報委託先（代理店など）」オプションと連動し、ギャラリー本体と別法人の担当者（PR会社スタッフ等）が自社名を書ける項目として機能する。
- **⑥「③申込者について」セクションを全廃**：ご担当者に代わる「代理人（他のスタッフなど）」選択・代理人氏名/フリガナ/関係の入力ブロックを削除。理由＝前ラウンド（追補⑱以前）で確定済みの「代理申込（CAP-06 FAQ）はcreator-apply専用・gallery-applyでは不要」という判断と平仄を合わせるもの——ギャラリーの場合、広報委託先を含む「代理」の概念は既にご担当者関係selectの選択肢（③）で吸収されており、別立ての「申込者区分（本人/代理人）」は不要と判断。**p11-2（クリエイター機能申込）の同セクションは変更していない**：クリエイター個人の場合は家族等が代理で申込む具体的なシナリオが成立し、CAP-06はcreator-apply専用として維持する設計のため、ここは意図的にページごとに構造を分岐させた（p11-2とp11-3で共通コンポーネントの見た目は統一しつつ、フォームの内容構成はロールの実態に応じて分ける）。付随して未使用となったJS関数`p113ToggleAgent()`を削除。必須項目バリデーション（`.ktn-req`マーカーをDOM走査する`p113ValidateRequired()`）はマークアップ側の削除だけで自動的に対象から外れるため、バリデーションロジック自体の修正は不要だった。
- **設計原則の確認**：今回の①③⑥はいずれも「同じ`.p114-*`コンポーネントを共有するページ間で、視覚要素は統一しつつ、ロールごとに意味が異なる内容（バッジの要否、代理申込の要否）はページごとに正しく分岐させる」という運用。共有コンポーネント＝画一化ではなく、「見た目の一貫性」と「内容の妥当性」を分けて判断する。

### 2026-07-26 追補㉑（追補⑳のご担当者情報ブロックを2点再調整：「その他」の足切り＋「タイトル」フィールドの復活）
- **経緯**：追補⑳でご担当者とギャラリーの関係selectに説明文を追加し、役職・肩書きフィールドを所属フィールドへ差し替えたが、ユーザーから2点の追加指摘。
- **①ギャラリーとのご関係selectから「その他」を削除**：ご担当者の資格要件は「運営者・スタッフ、または正式に広報活動を依頼された代理の方」に限定する設計（追補⑳で説明文を明記済み）であり、「その他」という選択肢を残すとこの資格要件に足切りの抜け道が生まれてしまう。selectを「オーナー・運営者」「スタッフ」「広報委託先（代理店など）」の3択に絞り込んだ。
- **②「役職・肩書き」を「タイトル」に改名した入力欄として復活**：追補⑳では「役職・肩書きは一般に開示を避けたがられる言葉」という指摘を受けフィールド自体を削除し「所属」へ差し替えたが、ユーザーから「入力欄自体は必要、ラベルをタイトルに変更してほしい」との訂正。**役職・肩書きという"データ項目"は必要で、問題は"呼び方"だった**（追補⑳は言葉の忌避感とデータ収集の要否を混同し、過剰に反応してフィールドごと削除していた）。「ご担当者のタイトル」（任意・input・placeholder「例：ディレクター」）として、所属フィールドの直後に**所属とは別の項目として**追加。結果、ご担当者情報ブロックは「お名前→フリガナ→ギャラリーとのご関係(select・3択)→所属(input)→タイトル(input)→電話番号」の6項目構成に。所属＝会社名/部署名、タイトル＝役割の呼称、と役割分担して両方を維持する。
- **教訓**：ユーザーが特定の言葉遣いに違和感を示した場合、「その言葉を使わない」ことと「その情報自体を収集しない」ことは別の対応であり、後者に飛びつく前にどちらが求められているか確認・区別する必要がある（今回は前者だった）。
- **React/Drupal への含意**：gallery エンティティのご担当者データモデルは所属（affiliation）とタイトル（title/role label）を別フィールドとして持つ。ギャラリーとのご関係（relationship）は3値の固定選択肢（owner_operator / staff / pr_agent）に限定し、自由入力の"other"を許容しない。

### 2026-07-26 追補㉒（p4-11へ追補㉑の反映＋レンタル料金表記の変更）
- **①p4-11（公開ギャラリーページ本人確認情報ブロック）を追補㉑のp11-3最新仕様に同期**：ブロック6「本人確認情報（PRIVATE）」内の「ギャラリーとのご関係」selectを「オーナー／経営者／スタッフ／その他」の4択から「オーナー・運営者／スタッフ／広報委託先（代理店など）」の3択に刷新し、p11-3と同一の資格要件説明文（運営者・スタッフ・正式に広報委託された代理の方に限る旨）を追加。「ご担当者の役職・肩書き」フィールドは「ご担当者のタイトル」に改名し、新設した「ご担当者の所属」フィールドと並記する構成にした（p11-3と同一の項目構成：所属＝会社名/部署名、タイトル＝役割の呼称）。
  - **対象外を確認**：p4-11はPUBLIC/PRIVATEバッジ（`.p114-section-head__badge`）・ギャラリー名の可用性文言（法人/屋号/個人名の言及）・「申込者について」セクションのいずれも元々持たない別マークアップ（`.p211-block__title`直書き）のため、これらの変更は該当なし。**p4-11の本人確認情報ブロック自体（生年月日・郵便番号・住所等のKYCレベル項目）は追補⑳の判断どおり維持**（p11-3は簡素化済みだが、p4-11はKYC本体を保持する運用のため構造は変えていない）。
- **②レンタル情報の料金表記を「基本料金・金額/日」に変更**：ブロック4（利用案内）レンタル項目の料金欄が「料金（税込）：150,000円（税込）/週」だったのを、ユーザー指示「レンタル情報の料金は基本料金 金額/日 の入力」に基づき「基本料金（税込）：30,000円（税込）/日」に変更。**含意**：レンタル料金フィールドの単位は「週」ではなく「日」を基準とし、ラベルも単なる「料金」ではなく「基本料金」（＝オプション・特別対応等を除いた基準額）であることを明示する。既存の面積フィールドと横並びの構成（`.p211-facility-price`）は変更していない。
- **React/Drupal への含意**：gallery エンティティのレンタル情報フィールドは `base_price_per_day`（基本料金・日額）として定義する（週額前提の実装にしない）。ご担当者データモデルの affiliation/title 分離は追補㉑と同一のため、p11-3（申込時点）とp4-11（プロフィール編集時点）で同一スキーマを共有できる。

### 2026-07-26 追補㉓（p4-11：レンタル入力の単位を外出し＋本人確認情報ブロックを「ご担当者情報」へ全面差替＝p11-3と完全一致化／ギャラリーLIAISON+本人確認の保存場所は検討中）
- **①レンタル料金・面積の入力形式を是正**：追補㉒で導入した「30,000円（税込）/日」「60㎡」という値埋め込み形式に対し、ユーザーから「基本料金の入力は『金額』円/『日』日、面積も単位は入力欄の外に」との指摘。数値のみを入力する欄に変更し、単位（㎡・円・/ 日）は入力欄の外の固定テキストとして表示する構成にした：面積＝`[60]` + `㎡`、基本料金（税込）＝`[30,000]` + `円 / 日`。「/ 日」は常に日額課金である前提のため入力にせず固定テキストとした。
- **②本人確認情報ブロックを「ご担当者情報」へ全面差替（p11-3の追補㉑仕様と完全一致）**：ユーザー指示「ギャラリーページの本人確認情報は担当者に変更してください、内容もp11-3に合わせて下さい」に対応。
  - ブロック見出し「本人確認情報 IDENTITY（PRIVATE）」→「ご担当者情報 CONTACT（PRIVATE）」。
  - プライバシー注記文をp11-3と同一の「ご連絡窓口としての情報預かり」の趣旨に統一（旧文言にあった「本人確認」「リエゾンプラス作品販売お申込み時の本人確認にのみ使用」という表現をすべて削除）。
  - **KYCレベル項目（生年月日・郵便番号・都道府県・市区町村・番地建物名）を全削除**。残る項目はお名前（フルネーム）・フリガナ・ギャラリーとのご関係(select・3択)・所属・タイトル・電話番号の6項目のみとなり、p11-3のご担当者情報ブロックと完全一致する構成になった。
  - 氏名フィールドの補足文「本人確認書類と一致する氏名を入力してください」→「ギャラリーページ・展覧会情報に関するご連絡の際にお伺いする氏名です」（p11-3と同一）。
  - 管理者コメント欄のplaceholder例文「本人確認書類を確認・承認」→「ご担当者へ掲載内容の確認を実施」に変更（本人確認という概念自体がこのページから消えたため、例文も連絡確認ベースへ揃えた）。
  - **この変更は追補⑳の注記「p4-11・p11-4側の本人確認情報（非公開）ブロックは対象外（現状維持）」を明示的に覆すもの**。理由＝ユーザーの新たな指摘（下記③参照）により、担当者情報＝本人確認情報という前提そのものが崩れたため。
- **③（オープン課題・未実装）ギャラリーのリエゾンプラス本人確認情報を「どこに・いつ」保存するかは未決定**：
  - **ユーザーの問題提起**：ギャラリーのリエゾンプラス（作品販売）利用申請では、日常のギャラリーページ運用・展覧会掲載を担う「ご担当者」と、実際にリエゾンプラスへ申し込む「（金銭授受の）責任者」が別人である可能性がある（creatorは個人事業なので申込者=担当者=本人で一致するが、galleryは組織なのでズレうる）。この前提に立つと、p4-11の「ご担当者」欄にKYCレベルの本人確認情報を持たせる設計（旧・追補⑪/⑫/⑳の判断）は「担当者=申込者」という誤った仮定の上に成り立っていたことになる。
  - **ユーザーからの相談内容**：(A) creatorと同様にp4-11には本人情報を持たせず、リエゾンプラス申請（p11-4）時にその都度入力・別保存にする設計にすべきか、(B) 申請にはログインが必須なのだから、p4-11側にも本人情報の項目を保存しておくべきか。
  - **アシスタントの回答（推奨・未実装／ユーザー未承認）**：**(A)の「申請時に都度収集し、gallery本体とは別スキーマで保存」を推奨**。根拠＝「ログインが必要」は"このアカウントの操作権限がある"ことの証明にすぎず、"このアカウントの担当者が金銭授受の法的責任者である"ことの証明にはならない。担当者と責任者が異なりうる以上、本人確認情報をgalleryエンティティ（p4-11）の固定フィールドとして持たせると、実際の申込者ではない人物（前任の担当者等）の古いKYC情報がgalleryに紐付いたまま残る・あるいは申請のたびに実際の申込者と食い違う、という不整合が起きうる。creator（個人事業・申込者=担当者=本人で恒久的に一致）と同じ「p3-11に保存し続ける」設計をgalleryにそのまま横展開するのは前提が異なるため不適切。**申請ごとに本人確認情報を収集し、その申請（トランザクション）に紐づく別レコードとして保存する**（gallery entityのプロフィールに永続化しない）方式が実態に即している。
  - **未確定・要フォローアップ**：この推奨はユーザーの合意を得ておらず、実装もしていない。方針が確定次第、p11-4（リエゾンプラス申込フォーム）のご担当者情報/本人確認情報の扱いと、p4-11側の項目構成（本追補で既にKYC項目は削除済みなので、確定すれば大きな追加変更は不要な見込み）に反映する。
- **React/Drupal への含意**：galleryエンティティは「ご担当者（gallery_contact：氏名・フリガナ・関係・所属・タイトル・電話番号のみ・軽量・恒久保存）」のみを持つ設計に統一する方向（p4-11で確定済み）。LIAISON+申請時の本人確認情報（KYCレベル）は、galleryエンティティに紐付く固定フィールドではなく、**申請（application/transaction）単位のレコード**として設計するのが有力（最終方針は未確定）。

### 2026-07-26 追補㉔（p4-11：レンタル日数入力の可変化／p11-4：本人確認セクションをcreator/gallery分岐＝gallery側「責任者情報」を都度入力化／担当者≠責任者の運用可否について）
- **①p4-11：レンタル基本料金の「日」も入力欄に変更**：追補㉓で「円 / 日」を固定テキストとしていたが、ユーザーから「単位とする日数はギャラリーによって異なる」との指摘。基本料金・日数をそれぞれ独立した数値入力にし、`[30,000]円 /[1]日`（「円 /」「日」は固定テキスト、金額と日数のみ入力可能）という構成にした。
- **②p11-4「本人確認」セクションをcreator/gallery分岐に刷新（追補㉓の③で保留していた方針が確定・反映）**：
  - ユーザーが「都度取得にしますので、p11-4に反映してください」と明示的に承認。追補㉓でアシスタントが推奨した「申請時に都度収集し、gallery本体（p4-11）とは別スキーマで保存」を採用。
  - **creator側**：既存の「登録済みの本人情報」読み取り専用ブロック（p3-11の内容をJS `p114SyncContext()` が反映）をそのまま `.p114-creator-section` でラップ。内容・挙動は変更なし。
  - **gallery側**：新規 `.p114-gallery-section` ブロック「責任者情報（本人確認） Responsible Person」を追加。項目＝責任者お名前・フリガナ・ギャラリーでのお立場（select：代表者・経営者／役員／個人事業主（本人））・生年月日・郵便番号・都道府県・市区町村・番地建物名・電話番号（p3-11のcreator用本人情報と同じ粒度・全項目未入力の空フォームとして提示）。説明文に「ギャラリー基本情報にご登録の『ご担当者』とは別の方でもかまいません」と明記し、担当者≠責任者を前提としたUIであることを明示。
  - **JS変更**：`P114_CTX.gallery` オブジェクトから読み取り専用表示用の `id`（本人情報配列）・`editHref`・`term` プロパティを削除（galleryはp4-11から読み取り継承しないため不要）。`p114SyncContext()` 内の読み取り反映ループ・編集リンク更新・イントロ文更新を `if (c.id) { … }` でガードし、creator選択時のみ実行されるよう変更。gallery選択時は何もしない（新設フォームは空のまま、ユーザーが毎回入力する）。
  - **p4-11側の追加変更は無し**：追補㉓で既にp4-11の「ご担当者情報」ブロックはKYC項目を持たない軽量な連絡先情報のみになっており、今回の「都度取得」方針と整合済みのため、p4-11自体への追加修正は発生していない。
- **③（オープン課題・未実装・要ユーザー最終確認）ログイン担当者と本人確認済み責任者が別人であることの運用可否**：
  - ユーザーからの新たな疑問：「リエゾン+申請承認後、リエゾン+の出品・取引はギャラリーログインする人（たぶん担当者）が行うが、本人認証は別の人の責任者でいいのか？」
  - **アシスタントの回答（推奨・未確定）**：問題ない。Stripe Connect等のプラットフォームで一般的な「代表者(representative)」モデルと同じ構造で、①アカウントへのログイン＝操作権限の証明、②本人確認＝金銭的・法的責任を負う主体の証明、という**別々の役割**として整理できる。担当者が日常の出品・発送対応等の実務操作を行い、責任者（本人確認済み）が振込先口座・法的責任を持つ、という分離運用は成立する。
  - **注意点として提示**：振込先口座の名義は責任者本人（または実際の受取主体＝ギャラリーの法人口座）と一致させる必要があり、担当者個人名義の口座に振り込む設計は避けるべき（実装時に振込先口座フィールドで名義バリデーション・注記が必要になる可能性）。
  - **未確定**：この回答はユーザーの最終承認を得ておらず、実装もしていない（振込先口座フィールドの設計・p3-16/p4-16まわりへの反映は行っていない）。方針が確定次第、対応するページ（振込先登録・取引デスク等）に反映する。
- **React/Drupal への含意**：galleryの本人確認（KYC）データは、galleryエンティティに紐付く永続フィールドではなく、**LIAISON+申請（application）単位のレコード**として保存する設計を採用（追補㉓の推奨どおり）。将来、振込先口座も同様に「責任者に紐づく口座情報」として、担当者アカウントの操作ログとは独立したスキーマで管理する可能性が高い（最終設計は未確定）。

### 2026-07-26 追補㉕（追補㉔③の「代表者(representative)モデル」推奨をユーザー承認）
- 追補㉔で保留していた「ログイン担当者と本人確認済み責任者が別人でよいか」という論点について、ユーザーが「はい、ありがとう、確認しました」とアシスタントの回答（Stripe Connect型の代表者モデル＝ログイン権限と本人確認責任は別役割、で問題ない）を承認。
- **確定事項**：ギャラリーアカウントへのログイン・実務操作（出品・発送対応等）は担当者が行い、金銭的・法的責任（本人確認・振込先口座）は責任者が持つ、という役割分離を正式な設計方針とする。
- **未実装のフォローアップ**：振込先口座の名義は責任者本人（またはギャラリーの法人口座）と一致させる必要がある、という注意点はまだ実装（バリデーション・UI注記）に落とし込んでいない。振込先口座登録まわりのページを制作する際に、名義チェック・注記文言を追加する。

### 2026-07-26 追補㉖（p11-4：責任者情報ブロックから電話番号フィールドを削除）
- ユーザー指示「p11-4担当者の電話番号は不要です」に対応し、追補㉔で新設したgallery用「責任者情報（本人確認）」ブロックの電話番号フィールド（`p114RespTel`）を削除。
- **理由（推定）**：日常のギャラリー運営に関する連絡窓口はp4-11の「ご担当者情報」電話番号がすでに担っており、責任者情報側は本人確認（身元・住所）に特化させる方が役割分担として明快なため。
- 削除後、責任者情報ブロックの最終項目は「番地・建物名」。他フィールド（お名前・フリガナ・お立場・生年月日・郵便番号・都道府県・市区町村）は変更なし。

### 2026-07-26 追補㉗（訂正：担当者電話番号削除の対象はp11-3/p4-11であり、追補㉖のp11-4変更は誤り・復元済み）
- ユーザーから追補㉖の指示「p11-4担当者の電話番号は不要です」を「すみません間違いました、p11-3担当者の電話番号は不要です」と訂正あり。
- **追補㉖で行ったp11-4「責任者情報」ブロックの電話番号（`p114RespTel`）削除は誤りだったため復元した**（フィールド・helpテキストとも元通り）。
- **正しい対応（今回実施）**：
  - p11-3「ご担当者情報」ブロックの電話番号フィールドを削除。「ご担当者のタイトル」が最終項目になった。
  - 併せて、末尾の同意チェックボックス文言「ご担当者情報（氏名・電話番号など）は公開されず…」の例示（電話番号）が実態と齟齬をきたすため「氏名・所属など」に修正。
  - p4-11「ご担当者情報」ブロック（追補㉓でp11-3と完全一致させる方針を確定済み）も同様に電話番号フィールド（`p411RepTel`）を削除し、両ページの内容一致を維持。
- **現在の状態整理**：
  - p11-3・p4-11「ご担当者情報」＝氏名・フリガナ・ギャラリーとのご関係(select)・所属・タイトルの5項目（電話番号なし）。
  - p11-4「責任者情報（本人確認・都度入力）」＝氏名・フリガナ・お立場(select)・生年月日・郵便番号・都道府県・市区町村・番地建物名・電話番号の8項目（変更なし）。
  - 「ご担当者情報」（日常連絡用・軽量）と「責任者情報」（申請時のみ・KYCレベル）は別ブロックとして明確に役割分担された。

### 2026-07-26 追補㉘（p3-11・p4-11の非公開ブロックに「常に最新状態に保つ」注記を追加）
- ユーザー指示：「p3-11,p4-11の非公開の本人情報や担当者情報を常に最新状態にしてくださいという文章を入れてほしい。最初の機能申込から全く情報を更新せずにその後必要時に手数がかかることが多かったからです。」
- **背景**：p11-2/p11-3（機能申込）時点で入力された本人情報・ご担当者情報が、その後p3-11/p4-11で更新されないまま放置されるケースが多く、リエゾンプラス申込や事務局からの連絡が必要になった際に情報の古さが原因で確認・修正の手間が発生していた、という実運用上の課題。
- **対応**：新規コンポーネントは作らず、既存の`.p114-privacy-note`（プライバシー注記ボックス）のテキストに追記する形で対応。
  - p3-11「本人確認情報」ブロック：「ご住所・お電話番号等に変更があった場合は、その都度こちらを最新の内容に更新してください。ご登録から時間が経って内容が古いままだと、リエゾンプラスのお申込みなど必要な際の確認・お手続きにお時間をいただく場合があります。」を追加。
  - p4-11「ご担当者情報」ブロック：「ご担当者の交代や連絡先の変更があった場合は、その都度こちらを最新の内容に更新してください。情報が古いままだと、ご連絡やお手続きが必要になった際にお時間をいただく場合があります。」を追加。
- **対象外の理由**：p11-3（申込フォーム）・p11-4（申込時点で都度収集する責任者情報）は一度きりの入力であり「常に最新に保つ」という継続更新の概念が当てはまらないため対象外とした。「常に最新に保つべき情報」は恒久的に保持されるプロフィール系ページ（p3-11/p4-11）のみに付与する、という判断基準。
- **React/Drupal への含意**：この注記文言はUIコピーの一部として`<PrivacyNote>`相当コンポーネントに含める。継続更新が必要なプロフィール系フォームすべてに横展開する際の文言テンプレートとして扱う（「〜に変更があった場合は、その都度最新の内容に更新してください」＋「古いままだと〜の際にお時間をいただく場合があります」の2文構成）。

### 2026-07-27 追補㉙（p4-11：リエゾンプラス責任者の氏名を非公開の参考表示として新設＝読み取り専用・p11-4の承認結果を引き継ぎ）
- **経緯**：追補㉔でp11-4の責任者情報を「都度入力・gallery本体には保存しない」設計にした後、ユーザーから「p3-11にリエゾンプラスの責任者名だけ非公開で表記した方がいいでしょうか？」と質問。アシスタントは「クリエイターは本人＝責任者で本人確認情報と重複するためp3-11には不要。むしろp4-11側で担当者≠責任者になり得るため、現在承認済みの責任者名だけを読み取り専用の参考表示として置く方が理にかなう」と回答し、対象ページを確認。ユーザーが「p4-11の間違い、精算する際に振込み名義人の確認が必要のと、変更する際の届のため」と目的を明示して承認。
- **対応**：p4-11のブロック6（ご担当者情報）直後にブロック6.5として「リエゾンプラス 責任者（参考表示）」を新設。
  - 表示は`.p114-identity-readout`（p11-4のcreator向け読み取り専用表示と同一コンポーネントを再利用）で「責任者名」「最終承認日」の2行のみ。住所・電話番号等は表示しない（氏名確認と変更履歴の把握が目的のため）。
  - **直接編集不可**：ここを直接編集できるフィールドにすると「更新されず古いまま放置される」問題が再発するため、変更はp11-4への再申請・再承認経由のみとし、`ktn-guide-link`でp11-4への遷移リンクのみ設置。再承認のたびにこの表示が更新される＝ユーザーが求めた「変更の届」を自然に満たす設計。
  - 目的を`.p114-privacy-note`内に明記：①精算時の振込名義人確認、②ご担当者情報とは別に管理している（担当者≠責任者の場合があるため）。
- **保留事項**：この参考表示は「LIAISON+承認済み」の場合のみ意味を持つが、本デモHTMLはLIAISON+未申込状態の分岐を持たないため常時表示の静的コンテンツとした。実装（Drupal）では`gallery.liaisonPlusStatus === 'approved'`等の条件でブロック自体の表示/非表示を制御する想定。
- **React/Drupal への含意**：責任者名はgalleryエンティティに直接保存せず、最新の承認済みp11-4申請（LIAISON+ application レコード）からjoinして参照する読み取り専用フィールドとして設計する（`<ResponsiblePersonReadout>`相当）。氏名変更＝新しい申請の承認イベントとして扱い、変更履歴（誰がいつ責任者だったか）はapplicationレコードの履歴からたどれるようにする。

### 2026-07-27 追補㉚（p4-11：リエゾンプラス責任者ブロックに「未申請」分岐を追加＝後工程のステータス出し分けを明示）
- **経緯**：追補㉙で新設したブロックは常時「承認済」の内容のみを静的表示していたが、ユーザーから「後工程のため未申請の分岐を作ってください」と指示。LIAISON+に一度も申し込んでいないギャラリーではこのブロックの中身が成立しないため、後工程（Drupal側のステータス判定）が参照できる分岐を明示する必要があった。
- **対応**：ブロック6.5の内部を2つの状態に分岐。
  - **未申請（`#p411LpNone`）**：「まだリエゾンプラスにお申込みいただいていないため、責任者情報は登録されていません」という説明＋`.ktn-guide-link`で「リエゾンプラスに申し込む →」（p11-4への遷移リンク）のみ。
  - **承認済（`#p411LpApproved`）**：追補㉙で作った内容（責任者名・最終承認日の`.p114-identity-readout`＋変更方法の案内）をそのまま維持。
  - デモ切替用に dbar へ「リエゾンプラス：未申請／承認済」ボタンを追加し、`setLpMode(mode)`（p4-11ページスクリプト内）で表示を切り替え。**デフォルトは承認済**（既存デモ状態を維持）。
- **実装（Drupal/React）への含意**：本番では`gallery.liaisonPlusStatus`（例：`none`/`pending`/`approved`）の値で本ブロックの表示内容を自動選択する。`pending`（審査中）は本デモでは分岐を作っていない＝p11-4の審査中バナーと同様の状態だが、p4-11側では「未申請」に含めるか別状態にするかは未確定（責任者情報が未確定という点では未申請と同じ扱いでよい可能性が高いが、要確認）。

### 2026-07-27 追補㉛（p3-11：リエゾンプラス本人確認状況ブロックを新設＝p4-11と同様の未申請／承認済分岐）
- **経緯**：追補㉚でp4-11に未申請／承認済の分岐を追加したのを受け、ユーザーから「p3-11にも同様にリエゾンの未申請/承認済状態を追加してください」と指示。ただしp3-11にはp4-11のブロック6.5に相当する「責任者参考表示」ブロック自体が存在しなかった（従前の設計判断＝「クリエイターは本人＝責任者なのでp3-11には不要」）。あるのは常時表示・常時編集可能な「本人確認情報」ブロック（ブロック5）のみで、これは元々LIAISON+専用ではなく通常の連絡先確認も兼ねる。そのためアシスタントがユーザーに「①本人確認情報とは別に新規ブロックを追加する／②本人確認情報ブロック自体に分岐を追加する」の2案を提示し、ユーザーが①を選択。
- **対応**：ブロック5（本人確認情報）の直後にブロック5.5「リエゾンプラス 本人確認状況（参考表示）」を新設。p4-11のブロック6.5と異なり、**責任者名を重複表示しない**（本人確認情報に既に氏名があるため）。
  - **未申請（`#p311LpNone`）**：「まだリエゾンプラスにお申込みいただいていないため、上記『本人確認情報』はリエゾンプラスの本人確認としては未使用です」という説明＋`.ktn-guide-link`で「リエゾンプラスに申し込む →」（p11-4への遷移リンク。p11-4はcreator/gallery共有ページのため同一リンク先）。
  - **承認済（`#p311LpApproved`）**：「本人確認は承認済み。上記『本人確認情報』がそのまま責任者情報として使用される。変更時は直接上記を更新すればよく再申請は不要」という説明＋`.p114-identity-readout`で「最終承認日」のみを表示（氏名は表示しない＝重複回避）。
  - デモ切替用にdbarへ「リエゾンプラス：未申請／承認済」ボタンを追加し、`setLpMode(mode)`（p3-11ページスクリプト内・p4-11と同名だが別ファイル内の別関数）で表示を切り替え。**デフォルトは承認済**。
- **p4-11との設計差の理由**：gallery側は「ご担当者情報」（常時編集可）と「責任者情報」（p11-4経由でのみ更新・再承認が必要）が別人でありうるため、責任者情報は独立した読み取り専用データとして参照表示する必要があった。creator側は本人＝責任者のため、本人確認情報の更新に承認フローを挟む必要がなく（追補既出：「常に最新状態に保ってください」の自己申告方式）、新規ブロックは「氏名などのデータ」ではなく「LIAISON+の本人確認ステータスと最終承認日」のみを参照表示する薄いラッパーとした。
- **実装（Drupal/React）への含意**：本番では`creator.liaisonPlusStatus`の値でブロック5.5の表示を自動選択する。p4-11と同様、`pending`（審査中）の扱いは未確定（追補㉚と同じ保留事項）。

### 2026-07-27 追補㉜（本人確認情報の変更時再提出＝範囲を「振込名義」のみに限定する方針を確定）
- **経緯**：追補㉛の実装後、アシスタントから「本人確認時の情報（氏名等）に変更が生じた場合、再提出は必要か」と質問。ユーザーが「クリエイターもギャラリーも基本的に本人確認時の情報に変更が生じた場合の再提出は必要だと思うが、運用を考えると確かに振込名義だけが問題である。振込のオペレーションで変更を受付けましょう」と回答。
- **決定**：本人確認情報（氏名・住所・生年月日等）自体の変更に対して、全項目一律の再提出・再承認フローは設けない。
  - **creator（p3-11）**：本人確認情報ブロックは既存どおり自由編集のまま（変更なし）。
  - **gallery（p4-11）**：責任者情報はp11-4経由の再申請・再承認が必要という既存設計（追補㉚以前から）も変更なし。
  - **実運用上の唯一の懸念＝振込先口座の名義一致**は、本人確認情報の変更フローとは切り離し、**振込先口座登録（まだ未制作のページ）のオペレーション側で名義バリデーションとして扱う**。すなわち「本人確認情報が変わったら再提出」ではなく「振込先口座を変更・登録する際に、口座名義と現在の本人確認/責任者名が一致するか確認する」形に一本化する。
  - CLAUDE.mdの既存メモ（p3-11・p4-11「振込先口座の名義は責任者本人と一致させる必要がある注意点は残り、振込先口座フィールドの名義バリデーションは未実装」）と整合する結論であり、今回の相談でその設計が正式に確定した。
- **本ラウンドでのページ改修**：なし（対象の振込先口座登録ページが未制作のため、決定のみ記録）。
- **実装（Drupal/React）への含意**：振込先口座登録・変更のAPI/UIを実装する際、送信時に「口座名義」と「現在の本人確認情報（creator）／責任者情報（gallery、liaisonPlusStatus=approvedの最新承認レコード）の氏名」を突き合わせるバリデーションを組み込む（完全一致でなくとも警告表示程度は必須）。本人確認情報側の変更検知・再承認トリガーは実装しない。

### 2026-07-27 追補㉝（p3-17：クリエイター販売代金管理ページ新設＝Stripe Connect精算設計を実ページへ反映）

- **経緯**：Stripe Connect精算方式についての相談で以下3点が確定した。
  1. **精算は毎月固定日の一括精算のみ**（オンデマンド精算は提供しない）。日本のStripe standard入金にはインスタントオプションが無く、都度リクエスト式の精算を用意しても実質的な即時性のメリットがないため。
  2. **振込手数料は出品者（creator/gallery）負担**。standardなStripe控除をそのまま使い、プラットフォーム側が手数料を肩代わりする複雑な処理を持たない。
  3. **精算下限額は出品者が設定可能**（プラットフォーム固定の¥10,000ではない）。ただしフリー入力にはせず、¥1,000〜¥100,000のプリセットからのドロップダウン選択にすることで、事務コストに見合わない極小額精算を暗黙のうちに排除する（フロア機能を「選択肢の設計」で持たせる）。
  - ユーザー指示：「p3-17を先に作成・調整した後にp4-17に反映しましょう」。アシスタントが5セクション構成（①現在の残高・次回精算予定／②精算設定／③振込先口座情報／④精算履歴／⑤FAQ）を提案し、ユーザーが承認。
- **対応**：`kotennavi-p3-17.html`を新規作成（mgmt-page Model B・`.ktn-mgmt-wrap.ktn-mgmt-stack`、p3-15/p3-16/p11-4と同型）。
  - **残高・次回精算予定**：dbarデモで「下限以上」/「繰越中（下限未満）」を切替可能にし、繰り越しに期限が無いことを明示。
  - **精算設定**：精算下限額を`#p317Threshold`のプリセットselectで選択（フリー入力不可）。
  - **振込先口座情報**：**追補㉜で確定した「振込名義の一致確認」を実際に動くJSとして初めて実装**。保存時に口座名義（全角カナ）とデモ用の本人確認情報値（「タナカ トオル」）を空白除去のうえ文字列比較し、不一致なら`.ktn-form-error`パネル＋対象フィールドの赤枠＋「該当箇所へ →」ジャンプボタンを表示、一致すれば`KTN.toast('変更を保存しました（デモ）')`。
  - **精算履歴**：新規テーブルを作らず、p3-15の`.p315-archive-table`をそのまま再利用。状態バッジは既存`.p315-ws-badge`に新規モディファイア`--done`（振込完了）を追加。
  - **FAQ**：`KTN.QA`に新規カテゴリ`liaison-settlement`（`SET-01`〜`SET-06`、side:'seller'）を追加し`KTN.renderQA(..., style:'desk')`で描画。
  - 新規CSSは`.p317-balance`ファミリー（残高・次回予定日の数値表示。金額フォントは`--fm`で統一）のみに限定。他は`.p315-archive-table`/`.p315-ws-badge`/`.p114-privacy-note`/`.ktn-form-error`/`.p211-field`系を再利用し、ページ固有の近似コンポーネントを増やさなかった。
  - `kotennavi-p3-15.html`の`.p3-mgmt-drawer`「販売代金管理」リンク（旧`href="#"`）を`kotennavi-p3-17.html`へ更新。
- **実装（Drupal/React）への含意**：
  - 精算下限額はDB上も**enum的な値（プリセット群からの1つ）として保存**し、任意の数値を受け付けるフィールドにしない。
  - 精算バッチジョブは「月次固定日に、精算対象出品者each残高が設定下限額以上かを判定→以上なら振込手数料控除後の金額を振込、未満ならそのまま繰り越し（繰り越し期限なし）」というロジックで実装する。
  - 振込先口座登録APIは、保存時に口座名義と「本人確認情報（creator）／リエゾンプラス承認済み責任者情報（gallery）」の氏名を突き合わせるサーバーサイドバリデーションを持つ（本デモのクライアントサイド文字列比較と同じロジックを本番でも踏襲）。
  - `docs/06_リエゾン_サービス仕様書.md`側の精算関連記述（下限額・振込手数料負担・精算頻度）がこの確定内容と整合しているか、次回同ドキュメント参照時に確認すること（本ラウンドでは仕様書側は未更新）。
- **保留事項**：`docs/sitemap.md`のP3-17行は更新済み（ファイル名・進捗「調整中」）。ブラウザでの目視確認は未実施。**p4-17（ギャラリー版）への反映は次回作業**（ユーザー指示のシーケンスどおり、p3-17調整完了後）。

### 2026-07-27 追補㉞（Stripe Connectアカウント種別＝Expressを採用確定・Standard/Customは不採用）

- **経緯**：p3-17作成後、精算の裏側にあるStripe Connect実装方式（Standard/Express/Custom）についてユーザーと比較検討した。
  1. **Standardは不採用**：出品者が自分のStripeアカウントを直接保有・operateする方式（OAuth連携、出品者自身のダッシュボードで入金スケジュール管理、Direct Charge＝購入者の支払いが出品者のStripe残高に直接入る）。出品者がStripe生の手数料内訳・ダッシュボードを直接見ることになり、CLAUDE.mdの「Stripe決済手数料-実質マージンは利用者には非公開」方針と両立しない。何よりユーザーの絶対条件「creator/galleryにStripeとの直接契約・操作を要求しない（要求した時点で操作できる人が激減し、利用者がほぼいなくなる）」に反するため即除外。
  2. **Express**：出品者の入金スケジュール・下限額はプラットフォーム（個展なび）がAPI経由で制御。資金の流れはSeparate Charges and Transfers（購入者の支払いは個展なびのStripe残高に一旦入り、精算日にTransferで出品者の接続アカウントへ送金＝CLAUDE.mdの「代金回収代行」表現と一致）。**出品者に必要なStripe接点は、初回登録時にStripeホスト画面へ一度だけ遷移して「Connected Account Agreement」に同意する1回きりの操作のみ**。以降は個展なびの画面（p3-11/p11-4/p3-17等）で完結。例外として、Stripeがリスク判定や規制対応で追加確認を求める場合、個展なびを介さず出品者へ直接メールを送ることがある（頻度は低いが個展なびの制御外）。
  3. **Custom**：Stripeブランドの画面を一切出さない完全自前実装。裏返しに、本人確認書類のアップロード・審査結果（承認/却下/追加書類要求）の受け皿・再確認対応・機微情報のStripe API送信を個展なびが恒常的に運用側で負う。小規模運営体制に対して非対称に重い継続コスト（サポート窓口化、機微情報の取得責任、Stripe要件変化への追従、審査主体としての法的立場のグレーさ）と判断。
  - **結論：初期実装はExpressを採用**。判断根拠＝「Expressの負担は初回同意1回＋稀な直接メールという上限のある摩擦」対「Customの負担は運用フェーズで際限なく積み上がる構造的負担」という非対称性。Stripe公式も自己資金力ならぬコンプライアンス専任リソースを持つ大規模プラットフォーム向けにCustomを推奨しており、個展なびの体制には適合しない。
  - **緩和策**：Express唯一のネック（Stripe同意画面が一度出ること）は、Stripe Connect embedded onboarding（プラットフォームのブランド・配色を反映できる埋め込みUI）を使うことで離脱率を抑えられる想定。同意文言自体はStripe標準のまま残る。
- **既存ページへの含意（未反映・今後の実装で対応）**：
  - p3-11／p11-4の本人確認フォームは現状Stripeブランド画面が存在しない前提で作られているが、Express採用によりオンボーディングの最終ステップに「Stripeの利用規約に同意して連携」ボタン（embedded onboarding起動）を追加する設計変更が今後必要。ただし既存フォームの入力項目自体（本名・フリガナ・生年月日・住所・電話番号）は個展なび側でそのまま収集し、Stripe側の身元確認書類アップロードはStripeの埋め込みUIに委ねる想定のため、既存フォームの再設計は不要（追加ステップの挿入のみ）。
  - 振込先口座（p3-17の`#p317BankName`/`#p317Branch`＝自由入力）も、Expressでは`external_accounts` APIへ個展なびが送信する形を維持できる（Customと同様に個展なび側フォームのままでよい＝この点はExpress/Custom共通）。
  - 法人番号など法人ギャラリー向け追加情報の要否は、Express採用でも解消しない別課題として残る（Stripeの法人アカウント要件次第）。
- **保留事項**：本決定はStripe実装方式の方針確定であり、まだ個展なびの実ページUI（onboardingボタン等）には反映していない。反映は今後Stripe実装に着手するタイミングで別途対応。`docs/06_リエゾン_サービス仕様書.md`側にConnectアカウント種別の明記が無ければ、次回同ドキュメント参照時に追記を検討。
- 比較の全体像は独立資料 `docs/08_Stripe_Connectアカウント比較.md` にまとめた（社内資料）。

### 2026-07-27 追補㉟（Express採用に伴うStripe最小限の意識づけ＋接点対応FAQを実ページへ反映）

- **経緯**：追補㉞でExpressを採用したことにより「creator/galleryにStripeを一切意識させない」という当初の絶対条件は完全には満たせず、（1）初回連携時の同意ステップ、（2）稀にStripeから直接届く再確認メール、の2点は最小限とはいえユーザーに認識してもらう必要がある。ユーザー指示：「expressを取るなら、リエゾン+のcreator/galleryにstripeを意識させる必要がありますね、さらに最低限のstripeからのコンタクトへの対応をQAにした方がいいですね。」
- **対応**：
  - **`kotennavi-p11-4.html`**：About ゾーンの「本人確認・振込先口座が必要な理由」`.p70-dl` に3項目目「決済パートナーとの連携」を新設。Stripe社への振込処理委託・初回のみの簡単な連携手続き・通常操作は個展なび画面内で完結する旨を明記（本人確認・振込先口座の2項目と並列の同一トーンで違和感なく配置）。
  - **`kotennavi-common.js` KTN.QA**：
    - `liaisonplus-apply`（p11-4申込時）に **LAP-12**「Stripeという名前が出てきました。個展なびとは別のサービスですか？」を新設し、既存配列内でLAP-03（本人確認・口座情報が必要な理由）とLAP-04（審査期間）の間に挿入（表示順もこの文脈に合わせた）。IDは既存LAP-04以降を採番し直さず、新規に12番を割当（他ファイルからのLAP-ID直接参照は無いことをGrepで確認済み、既存ID変更による影響なし）。
    - `liaison-settlement`（p3-17/p4-17運用中）に **SET-07**「Stripeから直接メールが届きました。対応が必要ですか？」・**SET-08**「Stripeのアカウントを自分で管理する必要がありますか？」を新設（既存SET-06の後ろに追加）。SET-07は「正規の案内である・期限内対応が必要（対応しないと精算停止の可能性）・不明点は個展なび事務局へ確認できる」の3点を明記し、フィッシング詐欲への不安と実務対応の両方をカバー。SET-08は「通常操作はStripe画面不要」を再度断定的に案内し安心材料とする。
  - いずれもFAQは `KTN.renderQA()` が動的描画するため、p11-4・p3-17側のHTML・JS呼び出しは変更不要（配列追加のみで反映）。
- **設計判断**：初回の意識づけ（Stripeとは何か・なぜ出てくるか）は申込時点の `liaisonplus-apply` に、運用中の接点対応（メールが来たらどうするか）は `liaison-settlement` に分離。理由＝前者は「これから使う人が抱く疑問」、後者は「すでに使っている人が実際に遭遇したときに探す場所」で参照タイミングが異なるため、同じ内容を2箇所に重複させず役割で切り分けた。
- **保留事項**：p4-17（ギャラリー版）は未作成のため、`liaison-settlement`カテゴリの新規QA（SET-07/08）は作成時に自動的に引き継がれる（p3-17と同じ`KTN.renderQA`呼び出しパターンを踏襲すればよい）。p3-11側（本人確認情報の一元管理元）への同様の意識づけ追記は今回対象外（p11-4の申込導線でカバーできるため）。ブラウザでの目視確認は未実施。

### 2026-07-27 追補㊱（p11-4：LIAISON+利用規約〔抜粋〕に決済代行会社条項を新設・条番号を繰り下げ）

- **経緯**：追補㉟でFAQ・説明文にStripe（決済パートナー）への言及を追加したのを受け、ユーザーが「LIAISON+の利用規約にも追加が必要ですね」と指摘。`kotennavi-p11-4.html`には申込フォーム末尾（同意事項セクション）に`.p114-terms-box`として「LIAISON+ 利用規約（抜粋）」（第1条〜第7条＋付則）が埋め込まれており、これが現状唯一実在するLIAISON+利用規約のテキスト（Grep確認：他ページに同一文言なし。サイト全体の`P60-9 利用規約`は`docs/sitemap.md`上まだ未作成）。
- **対応**：新規**第4条（決済代行サービスの利用）**を、第3条（サービス利用料）と旧第4条（特定商取引法に基づく表示）の間に挿入。「決済処理・売上金の管理及び振込はStripe, Inc.及びその関連会社を通じて行う」「出品者は決済代行会社所定の手続き（利用規約への同意・本人確認等）に応じる」「個展なびは連携に必要な範囲で登録情報を決済代行会社に提供する」の3点を明記。**旧第4条以降（特定商取引法／会場優先販売／禁止事項／免責事項）を第5〜8条へ1つずつ繰り下げ**。
- **確認**：他ページ（p11-2／p11-3）にも独立した「第4条」等の条文があるが、いずれも別ページ内で完結する別個の利用規約（クリエイター機能／ギャラリー機能の利用規約）であり、番号体系はページごとに独立＝本改修による相互影響なし（Grepで確認）。
- **保留事項**：サイト全体の利用規約`P60-9`（未作成）を将来作成する際、LIAISON+固有の条項（決済代行会社条項含む）をどう統合するか（別紙として参照するか、本文に組み込むか）は未確定。ブラウザでの目視確認は未実施。

### 2026-07-27 追補㊲（Express採用はp3-17の精算メカニクス〔月次固定日／下限額／振込手数料負担〕を変更しないことを確認・C-3説明文にStripe言及を追加）

- **経緯**：追補㉞でExpress採用を確定したことを受け、ユーザーから「p3-17の決済はどう変わりますか？（月一固定日、最小限の決定）」と質問があった。p3-17は追補㉝で既に「毎月末固定日一括精算・精算下限額プリセット選択・振込手数料は出品者負担」を確定済みだったため、Express採用がこれらの既存設計に影響するかを検証した。
- **検証結果（結論＝メカニクス自体は変更不要）**：Express・Customはどちらも資金の流れが同一の「Separate Charges and Transfers」方式（購入者の支払いは個展なびのStripe残高へ一旦入り、精算日に個展なびがAPI経由でTransferを実行して出品者の接続アカウントへ送金）。精算タイミング（Transfer実行日）の制御主体はアカウント種別に関わらず個展なびであるため、「毎月末固定日」「精算下限額プリセット（¥1,000〜¥100,000・自由入力不可）」の設計はExpressでもそのまま成立する。加えて、Stripeが接続アカウントから出品者の実銀行口座へ払い出すpayoutスケジュール自体もAPI（`settings.payouts.schedule`）で個展なびが月次に制御できるため、精算日の一元管理という体験も維持できる。
- **対応**：精算メカニクス自体は無変更としつつ、追補㉟・㊱で確立した「最小限の意識づけ」方針との整合を取るため、`kotennavi-p3-17.html` C-3「精算設定」の`.p114-privacy-note`末尾に「精算処理は決済パートナーであるStripe社を通じて行われます。」の一文を追加（p11-4・FAQに既に反映済みの開示レベルとp3-17自身の説明文を揃えた）。
- **留意点（今回未対応・将来のバックエンド実装時の論点）**：C-5「精算履歴」の振込手数料列は現状個展なびが計算・提示する想定になっているが、Express採用によりStripeのpayout実処理時に実際の手数料が自動控除される形になるため、将来的には表示値をStripeの実額と突き合わせる必要がある。これはUIの再設計ではなくバックエンド連携時のデータ精度の論点として保留。
- **保留事項**：ブラウザでの目視確認は未実施。

### 2026-07-27 追補㊳（氏名変更を伴う振込口座変更＝本人確認レイヤーとStripe個人情報レイヤーの2段構造を確認・現時点では文書化のみ）

- **経緯**：追補㉜（口座変更時の名義バリデーションは個展なび独自の文字列照合のみで足り、本人確認の一律再提出は不要）を踏まえ、ユーザーから「氏名変更による口座変更の場合は？」と質問。単なる口座切替（金融機関・口座番号のみ変更）と、氏名そのものが変わるケースを区別する必要があることを確認した。
- **整理（結論）**：
  1. **個展なび側の氏名更新が前提として先に必要**：creator＝p3-11で自由編集（既存設計・再承認不要）／gallery＝p11-4経由の再申請・再承認（既存設計）。いずれも氏名更新が完了した状態で初めて、p3-17の口座名義バリデーション（追補㉜）が新姓と正しく照合できる。
  2. **Stripe側にも別途、本人の氏名情報（`individual.first_name`/`last_name`）が登録されており、これは提出済み本人確認書類と紐づいて検証済みになっている**。個展なび側の氏名更新をStripe側の登録情報へ同期するAPI処理が別途必要（未実装・今後の論点）。
  3. **氏名変更はStripe側の本人確認ステータスを「要再確認」に戻す可能性が高い**（旧姓の書類と新姓が一致しなくなるため）。これは「口座を変えたから」ではなく「氏名を変えたから」発生する再確認であり、既存のSET-07 FAQ（Stripeから直接メールが届く稀なケース）が想定している例外シナリオに該当する。新規FAQは不要。
  4. 再確認が完了するまでStripe側でpayoutが一時停止する可能性がある点は運用上の注意点として残る。
- **対応**：本ラウンドではページ改修なし（決定・整理のみを記録。対象となるStripe個人情報同期APIは未実装のため）。
- **実装（Drupal/React）への含意**：本人確認情報（氏名）更新の保存処理に、Stripe接続アカウントの`individual`情報を同期更新するAPI呼び出しを組み込む必要がある。同期後にStripe側で新たな`requirements`（書類再提出等）が発生した場合の検知・通知フロー（SET-07相当）も合わせて設計すること。
- **保留事項**：ブラウザでの目視確認は未実施（対象UIが存在しないため対象外）。

### 2026-07-27 追補㊴（振込口座変更の実装方式＝①個展なび自身のフォームに正式決定）

- **経緯**：追補㊳の前段として、振込口座変更の実装方式について2案を比較した。
  - **方式①（個展なび自身のフォーム＝p3-17 C-4の現行実装）**：creator/galleryが個展なびの画面で口座情報を編集→個展なびのサーバーがStripeの External Accounts APIへ送信。個展なびが口座番号を一時的に扱う。
  - **方式②（Stripeホスト型／embedded onboarding）**：p3-17に外部遷移ボタンのみ置き、Account Links API（`account_update`）またはExpress Dashboardログインリンクで本人がStripe側の画面へ直接入力。個展なびは口座番号を一切扱わない。
  - 比較の結果、方式②は「通常操作は個展なび画面内で完結」方針（追補㉟）と矛盾し、かつ追補㉜の名義一致バリデーション（個展なび独自の文字列照合）が効かなくなるという欠点があることを確認。ユーザーが「では方式①にしましょう」と決定。
- **決定**：振込口座の登録・変更は**方式①（個展なび自身のフォーム＋個展なびがStripe External Accounts APIへ送信）を正式採用**。p3-17 C-4は既にこの方式で実装済みのため、コード変更は不要（決定の正式確認のみ）。
- **実装（Drupal/React）への含意**：振込先口座登録・変更APIは個展なびのバックエンドが仲介する前提で設計する（Stripeホスト画面への遷移は不要）。追補㉜の名義一致バリデーション・追補㉝のExternal Accounts API送信ロジックは、この決定のもとでそのまま本番実装の前提となる。
- **保留事項**：なし（本ラウンドは方式選定の正式化のみ）。

### 2026-07-27 追補㊵（Stripe Connect Express実装の5項目棚卸し＋実ページへの反映方針）

- **経緯**：追補㉞〜㊴でExpress採用・精算メカニクス・口座変更方式（方式①）を確定したのを受け、ユーザーから「stripe connect expressを利用することを前提」に次の5項目の対応ページ・実装状態を確認したいと依頼があった：①creator/galleryのStripeアカウント作成（p11-4の入力情報を連携できるか）／②振込口座情報の収集順序（p11-4に入力が要るか）／③振込口座変更／④氏名変更・口座名義変更／⑤galleryが法人の場合。以下は各ページをGrepで実地調査した棚卸し結果。
- **①Stripeアカウント作成**：p11-4は「個展なび自身の申込フォーム＋事務局による内部審査（3〜5営業日・メールで結果連絡）」のみを実装しており、Stripeアカウント自体を作成・連携するUI（Stripeの利用規約への同意ボタン・Account Links／embedded onboarding起動）は**存在しない**（p11-4全文Grepで確認）。**重要な発見**：p11-4の「本人確認書類の添付」→事務局審査は個展なび独自のビジネス承認プロセスであり、Stripe自身が行う独立したKYC/AML審査（追補㉞で確定したExpress方式の必須要件）とは**別物**。Express採用時、利用者は理論上「①個展なびの内部審査」「②Stripe側のホスト画面での本人確認・規約同意」という**2段階の本人確認導線**を通ることになるが、②は現状どこにも実装されていない。
- **②振込口座情報の収集順序**：p11-4には口座情報の入力フィールドは無く、口座登録は承認後にp3-17（C-4振込先口座情報）で行う設計（既存どおり）。**p11-4への口座欄追加は不要**——Stripeアカウント作成（①）が完了して初めて`external_accounts`APIへ送信できる状態になるため、口座収集はアカウント作成より後工程に置くのが正しい順序であり、現行のページ構成（p11-4＝申込・本人確認／p3-17＝口座登録）は変更不要と確認した。
- **③振込口座変更**：p3-17 C-4が方式①（個展なびフォーム＋名義バリデーション）でフロントエンド実装済み（追補㉝・追補㊴で確定）。**ただし対応するバックエンドAPI（External Accounts APIへの送信処理）は本リポジトリの対象外**（フロントエンドのみのデモ実装であることは元々の前提どおり）。gallery側の同機能（p4-17）は本ラウンド時点で**未着手**（sitemap.md「未作成」）。
- **④氏名変更・口座名義変更**：追補㊳で整理済みのとおり、個展なび側の氏名更新（creator=p3-11自由編集／gallery=p11-4再申請）とStripe側`individual`情報の同期は別レイヤー。**Stripe側への同期API・再確認検知フローは未実装**（追補㊳の「実装への含意」のまま、本ラウンドでも解消せず）。
- **⑤galleryが法人の場合**：p4-11・p11-4を含むサイト全体を法人番号／法人名義でGrepしたが**該当フィールドは一件も存在しない**。p4-11の「ご担当者情報」「リエゾンプラス責任者（参考表示）」はいずれも自然人の個人情報のみを扱う設計で、法人としての基本情報（法人番号・法人名義の口座名義バリデーション等）は**未検討のまま残っている別課題**。
- **対応方針（本ラウンドで着手する実装）**：
  1. p3-17に「決済パートナーとの連携（Stripe接続）」ブロックを新設し、①のギャップ（Stripeアカウント作成・連携導線の欠如）をフロントエンド上で可視化する。未連携時は精算設定・振込先口座セクションを操作不可にし、「Stripeの利用規約に同意して連携する」ボタン（デモでは連携済み状態へのトグル）を設置。
  2. p4-17（ギャラリー版販売代金管理）をp3-17をベースに新規作成し、③のgallery側未着手を解消する。p4-15の「販売代金管理」ドロワーリンク（`href="#"`）をp4-17へ更新。
  3. p4-11／p11-4のgallery責任者情報セクションに、法人ギャラリー向けの最小限の識別フィールド（法人番号）を追加し、⑤の欠落を部分的に解消する（法人としての口座名義バリデーション設計そのものは別途の論点として保留）。
  4. ②・④は現行設計・整理のまま変更不要と判断し、ページ改修は行わない（②は既存の順序が正しいことの確認、④はAPI実装時の論点であり本リポジトリ〔静的HTML/CSS/JS〕の対象外のため）。
- **実装（Drupal/React）への含意**：
  - Stripeアカウント作成（Account Links／embedded onboarding起動）のAPI連携は、p3-17／p4-17の「Stripe連携」ボタン押下をトリガーに実装する（個展なびのサーバーが`accountLinks.create`を呼び、返却URLへリダイレクトまたは埋め込みUIを起動）。
  - 連携完了後のWebhook（`account.updated`等）を個展なびのバックエンドで受け取り、連携ステータス（未連携/連携済み/要再確認）をcreator/galleryごとに保持する必要がある。
  - 法人番号フィールドは、Stripeの法人アカウント（`business_type: company`）作成時に`company.tax_id`等へマッピングする想定。個人事業主（`business_type: individual`）との出し分けロジックが別途必要。
- **保留事項**：Stripe側の独立したKYC本人確認画面（Account Links遷移後の実際の入力・書類アップロード）自体はStripeがホストするため、個展なび側UIとしての追加実装は連携ボタン・ステータス表示までで足りる。法人ギャラリーの口座名義バリデーション（法人名義の表記ゆれ対応等）は今回未着手。ブラウザでの目視確認は未実施。

### 2026-07-27 追補㊶（追補㊵の対応方針①〜③を実装完了）

- **経緯**：追補㊵で立てた対応方針4項目のうち、①〜③（フロントエンド実装が必要な3項目）を本ラウンドで実装した。④は追補㊵時点で「変更不要」と判断済みのため対応なし。
- **実装内容**：
  1. **p3-17に「決済パートナーとの連携」ブロックを新設**（C-2とC-3の間に挿入・C-2.5）。連携済み/未連携の2状態をdbarデモトグル（`setStripeConn()`）で切替。未連携時は精算設定ブロック（`#p317SettingsBlock`）・振込先口座ブロック（`#p317BankBlock`）に `.p317-gated`（`opacity:.4;pointer-events:none;filter:grayscale(.3)`）を付与して操作不可を視覚化し、「Stripeの利用規約に同意して連携する」ボタン押下で連携済み状態へ遷移＋`KTN.toast`。共通CSSは `kotennavi-common.css` に `.p317-stripe-status` 系として新設（p3-17/p4-17共通）。
  2. **`kotennavi-p4-17.html` を新規作成**（p3-17の完全ミラー）。ID接頭辞はページ規約どおり `p417*`（例：`p417BalAbove`／`p417StripeConnected`／`p417BankBlock`）だが、CSSクラスは `.p317-*` をそのまま再利用（common.cssへの重複追加なし）。identity strip はギャラリー「Gallery SOIL 渋谷」、振込先口座の名義人デモ値はp4-11の責任者「鈴木一郎」に合わせ「スズキ イチロウ」、名義一致バリデーションのヘルプ文言も「本人確認情報（プロフィール）」→「リエゾンプラス責任者情報」に文言修正。FAQは既存の `liaison-settlement`（`side:'seller'`）カテゴリをそのまま再利用（JS変更不要）。`kotennavi-p4-15.html` の「販売代金管理」ドロワーリンクを `href="#"` → `href="kotennavi-p4-17.html"` に更新。`docs/sitemap.md` のP4-17行を `未作成` → `調整中`（ファイル名を `kotennavi-p4-17.html` に記載）へ更新。
  3. **法人番号フィールドを追加**：`kotennavi-p11-4.html` のgallery専用「責任者情報（本人確認）」ブロック内、「ギャラリーでのお立場」select直後に `#p114CorpNumber`（`.p211-field`・任意項目・13桁数値・placeholder「例：1234567890123」）を追加。ヘルプ文言で「個人事業主として登録される場合は空欄のままで構いません」と明記し、法人／個人事業主どちらの立場でも同一ブロックで完結するようにした（新規blockに分けず既存の責任者情報ブロックへ統合）。`kotennavi-p4-11.html` の「リエゾンプラス責任者（参考表示）」`.p114-identity-readout` に「法人番号」行（デモ値 `1234567890123`）を追加し、p11-4の入力内容が読み取り専用で反映される既存パターン（責任者名・最終承認日と同列）を踏襲。
- **実装への含意（Drupal/React）**：追補㊵に記載済みの内容から変更なし（Account Links連携・webhook受信・`business_type`出し分けは本ラウンドでは未着手＝フロントエンドのUI状態管理のみ実装）。
- **保留事項**：法人番号の桁数・チェックデジットのフロントエンドバリデーションは未実装（現状は `maxlength="13"` のみ）。ブラウザでの目視確認は未実施。

### 2026-07-27〜28 追補㊷（LIAISON+申込フロー＝サイト審査→Stripe審査の厳格な逐次2段階へ再設計。p11-4を4状態から5状態へ拡張）

- **経緯**：追補㊵〜㊶で「Stripeアカウント作成導線の欠如」というギャップを可視化したが、その後ユーザーから「サイトとStripeを同時申請させると、①ユーザーが混乱する、②サイトで承認できない人がStripeでアカウントを作ったら無駄になる、③同時申請で問題が起きたとき両方からの対応をユーザーが正しく理解できるか懸念、という3つの理由で望ましくない」との指摘があった。議論の中で以下を確認・却下した案を含めて整理：
  1. **管理者がStripeアカウント作成を代理する案は却下**：Connected Account Agreementは本人の同意を要し、KYC/AMLの本人確認は本人が起点である必要があるため、代理作成はExpressを選んだ理由（Custom方式の責任負担を避ける）と矛盾する。
  2. **口座情報入力・Stripe連携をp3-17ではなくp11-4内で完結させる案は技術的に実現可能**と確認：追補㉝の「口座情報はp3-17」という決定は"場所"の決定ではなく"順序"（Stripeアカウント作成後でないと口座紐付けできない）の決定だったため、両方をp11-4内に時系列で並べても矛盾しない。Account Links の`return_url`もただのパラメータなのでp11-4への復帰は自明に可能。
- **確定フロー（ユーザーの最終指定・4ステップ）**：
  1. p11-4で本人確認情報を入力→申込（Step1）
  2. 個展なび事務局が内容を確認→次のステップへ進むURLを記載したメールを送信（Step1承認のゲート）
  3. 申込者がメール内URLからp11-4へ戻り、口座情報を入力＋Stripe申請（Step2）
  4. Stripeの審査がOK→LIAISON+利用承認（最終状態）
  - **厳格に逐次**（並行審査ではない）：Step1（サイト内部審査）が通過するまでStep2（Stripe連携・口座入力）の画面へは進めない。
- **実装内容（`kotennavi-p11-4.html`）**：
  1. **デモ状態を3状態（`form`/`pending`/`approved`）から5状態へ拡張**：`form`（Step1申込フォーム）→`pending`（Step1審査中）→`step2`（Step1承認・メール内URL到達を模した状態＝口座+Stripe入力待ち）→`stripePending`（Step2送信後・Stripe審査中）→`approved`（最終承認）。dbarに5ボタン＋Stripe連携トグル（`dbarStripeOn`/`dbarStripeOff`）を追加。
  2. **ステータスバナーを2種→4種へ拡張**：既存の`#p114PendingBanner`（文言を「続きの手続きの案内をメールで送る」ことを示唆する内容に修正）・`#p114ApprovedBanner`に加え、`#p114Step2Banner`（Step1承認・次の手続きを促す）・`#p114StripePendingBanner`（Stripe審査待ち）を新設。
  3. **Zone3（申込フォーム）を`#p114Step1Form`（既存の全内容＝ロール通知・確認事項・本人確認・書類添付・同意事項・送信ボタン）でラップし、兄弟要素として`#p114Step2Form`（新設・既定hidden）を追加**。Step2Formの中身はp3-17のC-2.5（Stripe連携ステータス）とC-4（振込先口座情報）をp114接頭辞ID（`p114StripeConnectBtn`／`p114BankBlock`／`p114BankName`等）で移植し、末尾に専用の送信ボタン`#p114Step2SubmitBtn`（Stripe未連携時は`disabled`）を設置。CSSは新規追加せず、`.p317-stripe-status`／`.p317-gated`（common.css既存）をそのまま再利用。
  4. **JS**：`setDemoMode()`を5状態対応に拡張（Step1Form/Step2Form/4バナー/About guide・Indexの表示切替を状態ごとに制御。About・Indexは`form`/`pending`のみ表示しStep2以降は非表示）。`setStripeConn(state)`（p3-17と同型・Stripe連携済み/未連携をトグルし`#p114BankBlock`に`.p317-gated`を付け外し、`#p114Step2SubmitBtn`のdisabledも連動）と、Stripe連携ボタンのクリックハンドラを新設。`p114Step2Submit()`（Step2送信時に`setDemoMode('stripePending')`へ遷移＋`KTN.submitDone()`で完了モーダル）を新設。既存`p114Submit()`のメッセージ文言も「続きの手続き（口座登録・Stripe連携）の案内をメールで送る」旨に修正。
- **`kotennavi-p3-17.html`／`kotennavi-p4-17.html`の位置づけ変更（実装＝文言修正のみ）**：新フローではStripe連携・口座登録の初回入力はp11-4 Step2で完結するため、p3-17/p4-17に到達する時点では通常Stripe連携済みのはずである。両ページのStripe未連携時ヘルプ文言を「初回のみの手続き」という初期セットアップ前提の書き方から、「通常は連携済み。これはStripe側で追加確認が必要になった場合などの例外的な状態」という**変更専用（再連携・エッジケース対応）**の書き方に修正した。C-4振込先口座情報ブロック自体（デモ値が最初から入力済み＝既存口座の編集という体裁）は元々「変更」の見た目だったため変更なし。ページのタイトル・見出し（「販売代金管理」）や口座保存ボタン文言（「口座情報を保存する」）も変更前から中立的な表現であり修正不要と判断。
- **実装への含意（Drupal/React）**：
  - Step1（サイト内部審査）とStep2解禁のゲートは、バックエンドで「申込のステータス（`site_review_pending`→`site_approved`→`stripe_review_pending`→`approved`）」を管理し、Step1承認時にメール送信（トークン付きURLでp11-4のStep2状態へ遷移）をトリガーする実装が必要。
  - Step2のStripeアカウント作成（Account Links起動）は、口座情報フォームの送信ではなく「Stripeの利用規約に同意して連携する」ボタン押下時に個展なびサーバーが`accountLinks.create`を呼ぶ想定（p3-17と同じ連携パターンをp11-4向けに転用）。
  - `#p114Step2SubmitBtn`（Stripe審査へ進む）押下後の実際の「Stripe審査」はStripe側の非同期プロセスであり、webhook（`account.updated`）でLIAISON+の最終承認（`approved`）状態への遷移をトリガーする。
  - p3-17/p4-17は「Stripe未連携」を検知した場合の**再連携導線**としての役割に純化する（新規申込者の初回導線としては使われない）。
- **保留事項**：メール送信・トークン付きURL・Step1/Step2ゲートの実際のバックエンド実装は本リポジトリ（静的HTML/CSS/JS）の対象外。ブラウザでの目視確認は未実施。

### 2026-07-28 追補㊸（p11-4に4段階ステップインジケーターを新設＝逐次フローの可視化）

- **経緯**：追補㊷でp11-4の申込フローを5デモ状態（`form`/`pending`/`step2`/`stripePending`/`approved`）へ拡張したが、状態はステータスバナー（テキスト）とdbarのみで表現されており、「複数ステップがあり、順番に進む」という構造自体が一目で伝わらなかった。ユーザーから「p11-4機能申込には数ステップあること、逐次に進むことが理解できるようにデザインしてほしい」との明示指示を受け、常時表示の視覚的ステッパーを追加した。
- **既存パターン調査**：新規CSSを作る前に、単一ソース原則に沿って既存の類似コンポーネントを調査した。
  - `.p515-steps`／`.p515-step`（p5-15・購入者向け）と `.p316-step`（p3-16/p4-16・出品者向け／`--page-accent`連動で現在地をロール色ソリッド表示）が、current/done/future の状態意味論を正しく持つ既存ステッパーの2実装（この2つ自体が構造ほぼ同一の重複実装であり、将来 `.ktn-steps` への統合候補だが、本ラウンドでは対象ページ拡大を避けるため着手せず）。
  - `.p70-flow-diagram`（静的な手順説明図・現在地状態を持たない）、`.ktn-index`/`.ktn-zone`（ページ内目次のアンカージャンプ・進捗意味論を持たない）は不適合と判断し不採用。
- **実装内容（`kotennavi-p11-4.html`）**：
  1. identityストリップ直後・ステータスバナー群の直前に `#p114Steps` を新設。**中身は `.p515-steps`（コンテナ／label／track／conn）＋ `.p316-step`（ノード／ラベル。`--seller`修飾子＝page-accentソリッドを「現在地」表現として転用、`--done`＝グリーン塗り、無印＝未到達）をそのまま流用**（新規コンポーネントCSSは追加していない）。4ノード＝「①申込／②審査／③口座・Stripe／④利用開始」。
  2. wrap外要素のため `#p114Steps{max-width:var(--w-detail);margin:0 auto 20px}` のみ common.css に追加（`.p114-status-notice` と同型・置き場所もその直前）。
  3. JS：`p114UpdateSteps(mode)` を新設し `setDemoMode()` から呼び出し。5デモ状態→4ノード状態のマッピングは「外部アクター（サイト事務局／Stripe）の審査待ち＝その処理を担うノードを『現在地』として表示」の原則で統一：`form`=[現在,未,未,未] → `pending`=[済,現在,未,未]（②審査中）→ `step2`=[済,済,現在,未]（③口座・Stripe入力中）→ `stripePending`=[済,済,済,現在]（④Stripe審査待ち＝③の入力送信は完了扱い、④の承認プロセス中として現在地を進める）→ `approved`=[済,済,済,済]。
- **なぜ `.ktn-steps` へ昇格・共通化しなかったか**：`.p515-steps`/`.p316-step` は既に確定済みの共有ページ（p3-16/p4-16/p5-15）で使われており、統合にはそれらページの再検証を伴う。今回はp11-4単体の追加要求だったため、既存クラスを非破壊的に再利用するに留め、共通化はユーザー確認の上で別途判断する。
- **保留事項**：`.p515-steps`/`.p316-step`→`.ktn-steps` への統合はユーザー未確認・未着手。ブラウザでの目視確認は未実施。

### 2026-07-28 追補㊹（`.p515-steps`/`.p515-step`＋`.p316-step`→共通`.ktn-steps`/`.ktn-step`へ統合）

- **経緯**：追補㊸でp11-4のステッパーを既存クラス（`.p515-steps`＋`.p316-step`）の非破壊流用で実装した際、両者が同じmodifier名（`--seller`/`--buyer`）を持ちながら正反対の見た目（p316側＝ソリッド塗りで「自分の番」を表現／p515側＝淡tintで「相手の番」を表現）を意味していたという意味論の衝突が判明した。p11-4のステッパーをユーザーに確認してもらったところ「ステッパーを確認しました。統合をお願いします」と明示指示を受け、本統合を実施した。
- **実装内容**：
  - `kotennavi-common.css`：`.ktn-steps`/`.ktn-step`を新設（旧`.p515-steps`ブロック跡地に配置。旧`.p316-step`ブロックは実体を削除し説明コメントのみ残置）。modifier再設計＝`--done`（完了）／`--seller`・`--buyer`（そのページの「自分の番」＝常にソリッド塗り。seller=`var(--page-accent)`、buyer=固定`var(--actor-buyer)`+リング）／`--seller-soft`・`--buyer-soft`（「相手の番」＝常に淡tint、旧2実装それぞれの見た目を意味だけ揃えて再現）／`--future`。コンテナmodifier`--sm`＝ノード28px→20pxの縮小版（p5-15専用・旧p515サイズを継承）。モバイルブレークポイントは旧540px（p316）/600px（p515）の差を600pxへ一本化（最終CSS値自体は同一だったため実質無影響と判断）。
  - `kotennavi-p3-16.html`／`kotennavi-p4-16.html`／`kotennavi-p5-15.html`／`kotennavi-p11-4.html`：HTML（クラス名のみ置換・id属性は不変）＋JS（`STEP_CFG`系オブジェクトの状態文字列と`updateSteps()`系関数のクラス生成ロジック）を新クラス体系へ移行。各ページのJSで「相手の番」に該当する状態文字列を`-soft`付きへ置換することで、旧デザインを非破壊的に再現。
  - 全4ページでJS構文チェック（`new Function()`）を実施し異常なし。旧クラス名（`p515-step`/`p316-step`）の残存参照をリポジトリ全体でgrepし0件を確認。
- **なぜ2クラスに分けず1コンポーネントへ統合したか**：p316（出品者視点＝自分は常にseller）とp515（購入者視点＝自分は常にbuyer）は「誰が見るか」が固定されているため、旧実装はそれぞれ「自分の番」だけをハードコードしたmodifier名で表現していた。共通化にあたり、seller/buyerという**役割の名前はそのまま維持しつつ「自分の番＝solid」「相手の番＝soft」という意味を明示的にmodifier名へ分離**（`--seller`/`--buyer` vs `--seller-soft`/`--buyer-soft`）することで、1つのCSSコンポーネントが両ページの用途を矛盾なくカバーできるようにした。
- **React変換への含意**：`<Steps>`/`<Step variant="done|seller|buyer|seller-soft|buyer-soft|future" size="default|sm">`。`docs/handoff-decisions.md`「3. コンポーネント→React」に行を追加済み。

### 2026-07-28 追補㊺（Stripe連携方式＝Hosted Onboarding確定＋「外部サイトへ一時移動する」理解形成のための説明文・QA追加）

- **経緯**：追補㊵〜㊶でExpress実装の反映方針を確定した後、ユーザーからStripe Embedded ComponentsとHosted Onboardingの実装難易度・エラー処理責任分担について相談を受けた。
- **検討内容**：
  - エラー処理の責任分担はどちらの方式でも同一と確認：フィールド単位の入力エラー（未入力・形式不正等）は常にStripe側が処理し個展なびは関与不要。接続・セッションエラー（リンク失効・読込失敗）は常に個展なび側の責任だが検知方法が異なる（Hosted＝`refresh_url`へのリダイレクト、Embedded＝`onLoadError`コールバック）。承認後の`requirements`不足に基づくUI出し分け（`account.updated` webhook経由）はどちらの方式でも個展なび側の責任（p3-17の`.p317-gated`パターンに接続）。
  - Embedded Componentsは同一ドメイン内でシームレスなUXを実現できる利点があるが、Connect.js SDK導入・バックエンドの`AccountSession`発行エンドポイント・`appearance` APIによるテーマ同期など実装コストが増える。個展なびの小規模チーム運営方針（Express採用時と同じ判断軸＝保守負担の最小化）と、オンボーディングが**頻繁に使う画面ではなく初回のみの稀な導線**であることを踏まえ、Hosted Onboarding（Account Linksによるリダイレクト方式）を推奨し、ユーザーが承認した。
- **画面設計への影響**：Hosted Onboardingは「連携するボタン→Stripe側画面へリダイレクト→`return_url`で復帰」のみで完結するため、現在作成済みのp11-4/p3-17/p4-17の画面イメージ（ボタン＋ステータスカード）に変更は不要。
- **理解形成のための追加対応**：ユーザーから「フローの説明(QAでも可)でstripeのアカウントや接続について説明、理解が得られるようにしてほしい」との指示を受け、以下を追加：
  - `kotennavi-p11-4.html`：`.p70-dl__dd`「決済パートナーとの連携」、および`#p114StripeUnconnected`内のヘルプ文に「一時的にStripe社の画面へ移動し、入力後は自動的に個展なびへ戻る」旨を追記。
  - `kotennavi-p3-17.html`／`kotennavi-p4-17.html`（対ページ同時修正）：Stripe未連携時（例外的な再連携ケース）のヘルプ文に同様の移動・復帰の説明を追記。
  - `kotennavi-common.js` `KTN.QA`：`liaisonplus-apply`カテゴリにLAP-13「Stripeとの連携手続きでは、個展なびの外部サイトに移動するのですか？」を新設（LAP-12直後）。外部サイトへの一時移動・自動復帰・入力情報はStripe社が保管し個展なびは保持しない旨を明記。
- **保留事項**：Embedded Components関連のバックエンド実装（`AccountSession`発行等）は今回対象外。実際のAccount Links発行・webhook受信等のバックエンド実装は引き続き未着手（静的デモのみ）。React/Drupal変換時はAccount Links発行API・`return_url`/`refresh_url`ハンドリング・webhook駆動の`requirements`ゲーティングが必要。

### 2026-07-28 追補㊻（p11-4「本人確認・振込先口座が必要な理由」の因果順整理＝振込先口座とStripe連携を1項目へ統合）

- **経緯**：追補㊺でStripe連携の説明文・QAを追加した直後、ユーザーから「振込先口座が必要な理由セクションで、振込先口座と決済パートナー連携を統合した方がわかりやすい？振込口座情報はStripeに渡すための情報、何のためかというと売上金の振込用で、そのためStripeとの契約が必要、ちょっと順序が逆」との指摘を受けた。従来`.p70-dl`は「振込先口座」（用途＝売上振込）と「決済パートナーとの連携」（Stripe利用の説明）を並列の別項目として提示しており、**「口座情報＝実際にはStripeへ渡す情報である」という因果関係**が読み取りにくい構成になっていた。
- **対応**：`kotennavi-p11-4.html`の`.p70-dl`で2項目を「振込先口座（決済パートナーとの連携）」の1項目へ統合し、文章の展開順を「①振込の目的（口座情報の用途）→②振込処理をStripe社に委託している事実→③そのため口座情報はStripe社へ登録する形になる→④連携手続き（一時的な画面移動・自動復帰）→⑤連携後は個展なび内で完結」の順に整理。`kotennavi-common.js` `KTN.QA`のLAP-03（「なぜ本人確認情報や口座情報が必要なのですか？」）にも同じ因果チェーンの要約を追記し、`.p70-dl`とQAで説明の向きを揃えた。
- **p3-17/p4-17は対象外と判断**：これらは連携済み後の精算管理ページで「なぜ必要か」を説明する項目リストを持たず、既存文言（L128「お振込みには…Stripe社のサービスを利用しており」）も既に正しい向き（振込のためにStripeを使う）で書かれているため変更不要と確認した。
- **設計原則としてのメモ**：**「AのためにBが必要」という説明を書くときは、Bの目的（何のためか）を先に置き、その目的を実現する手段としてCが必要になる、という単方向の因果順で書く**（今回＝口座情報の目的〔振込〕→振込を実現する手段〔Stripe〕の順）。逆順（手段の説明を先に出し、後から目的を明かす）はユーザーの不信感につながるため避ける。今後、他ページで同種の「なぜこの情報が必要か」を並列dlで説明する場合もこの順序原則を踏襲する。

### 2026-07-28 追補㊼（p11-4のFAQ〔`KTN.QA` liaisonplus-apply〕整理＝重複排除・過剰詳細の削除・表示順の並べ替え・LAP-13の誤記修正）

- **経緯**：追補㊻の直後、ユーザーがp11-4のFAQ一覧全体を見直し、5点の指摘を行った。①LAP-13「個展なびが口座番号や本人確認書類そのものを保持することはありません」は事実と異なる（p3-17/p4-17の精算代金管理ページは口座番号を個展なび自身のフォームで表示・編集できる設計であり、Stripeにのみ保管される訳ではない）。②LAP-05「サービス利用料はいくらですか？」はページ本文の料金表と内容が重複している。③LAP-07「出品者から取引をキャンセルできますか？」は申込段階のFAQとして詳細すぎる。④LAP-08「売上はいつ振り込まれますか？」は③の精算方法説明とまとめると良い。⑤LAP-09のような申込の前提条件（プリミティブな情報）は表示順の上位に置くべき。
- **①の是正内容**：LAP-13の該当文を削除し、「本人確認書類そのもの（画像等）はStripe社が安全に保管します。口座情報は、登録後は個展なびの精算設定ページ（マイページ）からいつでもご確認・変更いただけます」に修正。**設計上の事実確認**：初回のアカウント登録（本人確認書類の提出等）はStripe Hosted Onboardingの画面で行うためStripe社が保管するが、**振込口座の変更は追補㊴で「個展なび自身のフォームに正式決定」済み**であり、p3-17/p4-17に口座番号入力欄が実在する。したがってQAで「個展なびは口座番号を一切保持しない」と言い切るのは実装と矛盾する誤情報だった。
- **②③④の是正内容**：LAP-05（単純な料率の重複表示）を削除し、その内容をLAP-08へ統合。LAP-08の質問を「サービス利用料はどのように計算され、売上はどのように精算されますか？」に変更し、回答も「計算方法（料率は上記表参照・数値は繰り返さない）＋精算方法概要（振込タイミング・手数料負担）」の1本にまとめた。振込日・下限額等の運用詳細は「承認後にご案内する精算設定ページ」へ委譲する文言とし、実際の精算詳細FAQ（`liaison-settlement`カテゴリ SET-01〜08・p3-17/p4-17で描画）とは重複させない棲み分けにした。LAP-07（出品者キャンセルの操作詳細）は既存の`liaison-txn`カテゴリ（TXN-S04・LIAISON+コンソール利用中の出品者向けFAQ）に同内容が既にあるため削除。**申込段階のFAQ（liaisonplus-apply）は「使うかどうかの判断材料」に絞り、承認後の運用詳細は別カテゴリ（liaison-settlement/liaison-txn）に委ねる**という役割分担が、この整理で明確になった。
- **⑤の是正内容**：`KTN.renderQA`は`KTN.QA`の配列順＝表示順（`category`でフィルタするのみでソートしない）という既存の設計を踏まえ、配列内の定義位置を並べ替えた。新順序＝LAP-09（前提条件：先にクリエイター/ギャラリー機能が必要か）→LAP-02（リエゾンとの違い）→LAP-01（有料か）→LAP-08（計算・精算方法）→LAP-03（本人確認・口座が必要な理由）→LAP-12（Stripeとは）→LAP-13（外部サイト移動）→LAP-04（審査期間）→LAP-06（会場優先）→LAP-10（ギャラリー限定）→LAP-11（その他）。**FAQの並び順は「資格確認（前提条件）→サービス概要→費用→本人確認/決済の仕組み→運用の個別ケース」の順に統一**し、申込者が読み進める順序と情報の抽象度が一致するようにした。
- **設計原則としてのメモ**：**FAQを追加・修正する際は「ページ本文（About等）や他カテゴリのFAQと内容が重複していないか」を必ず確認する**（今回のLAP-05はページ本文の料金表と、LAP-07/LAP-08はliaison-txn/liaison-settlementカテゴリと重複していた）。重複が見つかった場合は片方に統合するか、掲載段階（申込前提のFAQか、承認後の運用FAQか）で棲み分けを明確にする。また、**QAの文言が既存の実装済み画面（他ページのフォーム等）と矛盾していないかは実装済みファイルを確認してから書く**（LAP-13の誤りはp3-17の実装を確認せずに一般論で書いたことが原因）。
- **影響ファイル**：`kotennavi-common.js`（`KTN.QA` liaisonplus-apply：LAP-05削除・LAP-07削除・LAP-08統合・LAP-13修正・表示順並べ替え）。p11-4のHTML自体は変更なし（`renderQA`が配列を描画するのみのため）。

### 2026-07-28 追補㊽（LAP-12/LAP-13＝Stripe関連QAが2連続で並ぶ違和感を解消し1QAへ統合）

- **経緯**：追補㊼の並べ替え後、ユーザーから「stripeのQが2つでてくるのも違和感がある」との指摘。LAP-12「Stripeという名前が出てきました。個展なびとは別のサービスですか？」とLAP-13「Stripeとの連携手続きでは、個展なびの外部サイトに移動するのですか？」は、追補㊺でLAP-12を新設した後に追補㊻でLAP-13を追加した経緯があり、実質的に同一トピック（Stripeとの関わり方）を導入質問と手続き詳細の2問に分割していた。
- **対応**：LAP-12にLAP-13の内容を統合し1QA化（質問文はLAP-12のまま維持）。回答の展開順＝「Stripeとは何か→自分で契約不要・通常利用は個展なび内で完結→初回連携手続きの流れ（一時的にStripe画面へ移動→入力後自動復帰）→本人確認書類はStripe社が保管・口座情報は個展なびの精算設定ページでも確認/変更可」に一本化。LAP-13は削除。
- **設計原則としてのメモ**：**同一トピックのFAQを段階的に追加していくと「導入」と「詳細」に分裂しやすい**（今回は2ラウンドに分けてQAを追加した結果、後から見ると1つの話題が2問に見えた）。**FAQへ新規追加する際は、直近で追加した既存QAと話題が重複・連続していないかを都度確認し、必要なら追加せず既存QAへ統合する**（新設が常に正しいとは限らない）。

### 2026-07-28 追補㊾（p11-4の同意事項＝個別取引に関する3項目をp2-12-1「出品にあたっての確認」へ移動）

- **経緯**：ユーザーより「同意事項のうち、①販売価格・梱包費、②会場優先、③購入確定後のキャンセル、の3項目は『p2-11-1』に移動してほしい。個別取引に関する事柄は取引直前に移動した方が使用上の理解を得られやすい。p11-4に残すのは個人情報に関する同意、Stripeに個人情報を渡すこと・契約することへの同意」との指示。
- **「p2-11-1」の解釈**：`docs/sitemap.md`にP2-11-1というページ番号は存在しない（P2-11＝展覧会編集、P2-12-1＝LIAISON+展示・販売設定）。ユーザーの直前の操作（`kotennavi-p2-12-1.html`を開いていた）と、移動対象の3項目（価格・梱包費・会場優先・キャンセル）が実際にp2-12-1で設定される内容そのものであることから、**「p2-11-1」は「p2-12-1」の言い間違いと判断**して実施した。**番号の言い間違いは、対象ページの実際の機能（何を設定する画面か）と照合すれば見分けられる**（sitemap.mdの番号一覧だけでなく、各ページの実装内容を確認して初めて正しい移動先が判断できた）。
- **対応**：
  - `kotennavi-p11-4.html`の同意事項（creator-agree）からca1（価格・梱包費・送料）／ca2（会場優先）／ca3（購入確定後キャンセル）を削除し、ca4（特定商取引法に基づく個人情報開示同意）のみ残した。gallery-agree（ga1〜ga4）はこの3トピックと元々重複していなかったため変更なし。Stripeへの個人情報提供の同意は、既存のLIAISON+利用規約チェック（第4条に決済代行会社への情報提供を明記）とStep2の「Stripeの利用規約に同意して連携する」ボタンの2段階で既に担保されているため、新規チェックボックスは追加しなかった。
  - `kotennavi-p2-12-1.html`のフォームアクション直上に「出品にあたっての確認」ブロックを新設し、削除した3項目を移設。既存canonicalの`.p211-block`＋`.p114-checklist`（p11-4発祥だが単一定義の汎用コンポーネント）をそのまま再利用し、新規CSSは追加していない。
  - `kotennavi-pages.js`のp2-12-1 IIFEに保存ボタンのゲートを追加（3項目すべてチェックされるまで`#p212SaveAll`を`disabled`）。
- **未解決の設計論点（要ユーザー判断）**：p2-12-1は一度設定した展覧会を何度も開いて再編集する運用画面であり、p11-4のような一度きりの申込フォームとは性質が違う。今回のゲートは「開くたびに毎回3項目を再チェックしないと保存できない」という一律仕様になっており、既存設定の軽微な修正（作品の並べ替え等）でも同じ摩擦が発生する。初回のみ同意を求める設計にすべきかは今後の判断待ち。→ **追補㊿で解消（チェックボックス自体を廃止しQA形式へ変更）**。
- **設計原則としてのメモ**：**「個別取引に関する説明・同意は、包括的な一度きりの申込ではなく実際の操作の直前に置く方が理解を得やすい」**という原則が今回のユーザー指示で明確化された。今後、同種の「申込時に全部説明しようとして冗長になる」パターンを見つけたら、実際にその内容が使われる操作画面へ移設できないか検討する。

### 2026-07-28 追補㊿（p2-12-1の3項目＝チェックボックス同意をやめQA形式〔`liaisonplus-listing`カテゴリ〕へ変更）

- **経緯**：追補㊾でp2-12-1に移設した3項目をチェックボックス＋保存ボタンのゲートとして実装したが、その際「p2-12-1は繰り返し編集する運用画面のため、開くたびに毎回3項目を再チェックしないと保存できない摩擦が生じる」という未解決の設計論点をユーザーへ報告した。ユーザーから「そちらはQAの形式にした方がいいでしょうね」との指示があり、同意の強制（チェックボックス＋ゲート）ではなく参照情報（FAQ）として提示する方針に変更した。
- **対応**：
  - `kotennavi-common.js` `KTN.QA`に新カテゴリ`liaisonplus-listing`（グループ「出品にあたって」）を新設し、削除したチェックボックス3項目の文面をQ&A形式に書き直したLPL-01〜03を追加（liaisonplus-applyブロックの直後に配置）。
  - `kotennavi-p2-12-1.html`：`.p211-block`＋チェックボックスのブロックを、`.p315-faq`（p3-15/p3-17と同じ既存canonicalのフラットアコーディオンFAQコンポーネント。style:'desk'）に置き換え。`KTN.renderQA('#p2121Faq', { category: 'liaisonplus-listing', style: 'desk' })`で描画。
  - `kotennavi-pages.js`：直前ラウンドで追加した保存ボタンの同意ゲート処理（`agreeBoxes`/`updateAgreeGate`）を削除。
- **設計原則としてのメモ**：**「理解してほしい情報」と「同意を強制すべき情報」は別物であり、繰り返し訪れる運用画面では前者をチェックボックスのゲートにすると毎回の摩擦になる**。同意の強制が本当に必要なのは「一度きりの契約行為」（p11-4の申込・利用規約同意・Stripe連携）に限り、日常的な設定変更画面では参照情報（FAQ／ヘルプテキスト）として提示するに留める、という役割分担がここで明確になった。今後、運用画面に何かを追加する際は「これは同意ゲートが必要な契約行為か、単なる理解の手助けか」を先に判断する。
- **影響ファイル**：`kotennavi-common.js`（QA新カテゴリ追加）、`kotennavi-p2-12-1.html`（チェックボックス→FAQブロック置換）、`kotennavi-pages.js`（同意ゲート処理の削除）。

### 2026-07-28 追補(51)（FAQ「Q」マーカーの塗り色＝ロール色〔`--page-accent`〕からロゴ色〔`--accent`〕へ統一）

- **経緯**：追補㊿でp2-12-1にQA形式のFAQブロックを新設した直後、ユーザーから「『Q』の塗り色をロゴ色に変更できますか？」と指示があった。
- **対象**：`kotennavi-common.css` `.p315-faq-item__q-mark`（`style:'desk'`型FAQの「Q」バッジ・canonical定義は1箇所）。従来は`var(--page-accent,#2a5f7a)`でページのロール色（creator青緑／gallery銅／user桃）に連動していたが、`var(--accent)`（ロゴ色＝ブランド青 `#005da7`）の固定塗りへ変更。
- **影響範囲**：canonical定義が1箇所のため、`style:'desk'`を使う全ページに自動反映される：p3-15／p3-16／p3-17／p4-15／p4-16／p4-17／p5-14／p5-15／p2-12-1（計9ページ）。
- **設計原則としてのメモ**：CLAUDE.md「サイトカラー共通定義」の運用ルールにある「ブランド青＝実行ボタン・参照リンク・展覧会アクセントの軸」「役割パレット（誰か）は独立」という区分と整合。FAQの「Q」マーカーは特定のロールを表すものではなく**参照情報であることを示す記号**なので、`.ktn-guide-link`と同じくロゴ色（ブランド青）に寄せるのが妥当。ロール色（`--page-accent`）は今後もページの持ち主識別（トップバー・アバターoutline・バッジ等）に予約し、情報系の装飾には使わない、という区別がここで明確になった。
- **影響ファイル**：`kotennavi-common.css`（`.p315-faq-item__q-mark`の`background`のみ変更）。

### 2026-07-28 追補(52)（p11-4：個人情報取扱い同意の新設／本人確認書類リストの拡充／Stripe関連QAの再分割）

- **経緯**：ユーザーより3点の指示があった。(1)「同意事項にはやはりこのサイトに個人情報を使用させることを同意してもらう必要があるのでは？」。(2)「本人確認書類について、管理者目視なので、提出可能書類はマイナンバーカードや免許書に限らずの一覧を作りたい、本名・顔写真・住所・生年月日が確認できるもので複数提出もありにしたい」。(3)「QAのstripeについてはやはりご提案の2つのQに分けて、一つはStripe社についての説明、一つはstripeとの契約についての説明、その中にstripeから契約後のコンタクトがあることや対応が必要なことも含めたい」。
- **(1) 個人情報取扱い同意の新設**：追補㊾の時点で、p11-4の同意チェックリストは「購入者への開示（特商法）」のみを扱っており、「個展なび自身が本人確認のために収集した個人情報を取扱うこと」への同意が欠落していた。`kotennavi-p11-4.html`の`creator-agree`に`ca5`（本人確認のための氏名・住所・生年月日・本人確認書類の画像等を個展なび事務局が本人確認・審査・ご連絡の目的で取扱うことへの同意）を新設し、既存`ca4`（特商法開示同意）の前に配置。`gallery-agree`にも同内容の`ga5`（責任者の個人情報）をga1の前に配置。既存の`p114UpdateSubmit()`は`querySelectorAll('input[name="' + role + '-agree"]')`で汎用的に収集するためJS変更は不要だった。**役割の整理**：同意は3層になる＝①`ca5`/`ga5`＝個展なびによる個人情報の取扱いへの同意、②`ca4`/`ga4`＝購入者への開示（特商法）同意、③`p114TermsCheck`＝LIAISON+利用規約全体（第4条でStripeへの情報提供に言及）への同意。個人情報の「取扱い主体」を個展なび→（開示先としての）購入者→（連携先としての）Stripe、の順で明示する構成になった。
- **(2) 本人確認書類リストの拡充**：従来は「運転免許証・マイナンバーカード（個人番号カード）のみ、それ以外はお問合わせ」という限定列挙だったが、事務局が目視で確認する運用（自動OCR/eKYCではない）のため、書類名を限定する必要はなく「本名・顔写真・住所・生年月日が確認できること」という**基準**で提出可否を判断できる。`kotennavi-p11-4.html`の本人確認書類ブロックを、(a)1点で4項目すべてを満たす書類の例示（運転免許証／マイナンバーカード／パスポート／在留カード・特別永住者証明書／運転経歴証明書等）、(b)顔写真や住所の記載がない書類（健康保険証等）を使う場合は住所・生年月日を確認できる書類と**組み合わせて複数提出可**、という2パターンの説明に書き換えた。ヘルプテキスト（撮影面の説明）も「運転免許証は表裏、マイナンバーカードは表面」という書類名の決め打ちから「両面の記載を要する書類は表・裏、片面のみの書類は必要な面」という一般化した説明に変更。
- **(3) Stripe関連QAの再分割**：追補㊽で「Stripe社の説明」と「連携手続きの詳細」を1問（LAP-12）に統合していたが、ユーザーから「やはり2つのQに分けたい」との指示（提案時に一度統合したものを再分割する形）。`kotennavi-common.js` `KTN.QA`のLAP-12を会社説明のみ（「Stripeという名前が出てきました。個展なびとは別のサービスですか？」）に整理し、新設LAP-13に連携手続きの詳細を移した。LAP-13には**ユーザー指示で追加**された「Stripe社の審査状況によっては契約成立後にStripe社から直接メール等で連絡があり、追加の本人確認書類の提出などの対応が必要な場合がある」という一文を新規に加えた（Stripe Connect実運用でありうる挙動＝申込者への周知漏れを防ぐ）。
  - **文言修正（同日追記）**：LAP-13の質問文を初稿「Stripeとの契約はどのように行われますか？あとで連絡が来ることはありますか？」から、ユーザー指摘（「どのように」という問いの立て方は唐突／「あとで連絡が来る」という表現も唐突感がある）を受け**「Stripeと契約する必要はありますか？直接連絡が来ることはありますか？」**へ変更。「どのように行われるか（手順）」ではなく「そもそも契約が必要か（要否）」を問う形にし、「あとで」を「直接」に変えて**Stripe社から申込者へ直接連絡が来る**という点を明確化した。回答冒頭も新しい問いに正対させ「はい。売上金の振込処理を委託するため、振込先口座の登録に合わせてStripe社との間で決済代行契約を結んでいただく必要があります。」から書き起こす形に調整。
- **実装上の注意**：`KTN.renderQA`の`ansHtml()`は`esc()`で`a`フィールドの`&`/`<`/`>`をエスケープしてから出力するため、回答文中に`<strong>`等のHTMLタグを書いても太字にならず文字列としてそのまま表示される（`{{contact}}`トークンだけは特別扱いでリンクに変換される）。LAP-13の下書きで一度`<strong>`を使ってしまい、他の全QA項目が平文であることと矛盾するため平文に修正した。**今後QA項目に強調を入れたい場合はこの制約を踏まえること**（`ansHtml`側でHTML許可に拡張するか、平文のまま書くかを判断）。
- **影響ファイル**：`kotennavi-p11-4.html`（同意チェックリスト・本人確認書類ブロック）、`kotennavi-common.js`（LAP-12/LAP-13）。

### 2026-07-28 追補(53)（p11-4：LAP-13の文言明確化＋Step2にStripe提供同意チェックを新設）

- **経緯**：追補(52)で分割したLAP-13に対し、ユーザーから3点の指摘・質問。(1)「stripeのQの回答の中に、『承認後、口座情報のご登録に合わせて、』何の承認かがわからない」。(2)「stripeにアカウントを作られことや簡易なダッシュボードがあることはあえて知らせなくてもいい？それとも説明した方がいい？」（判断を要請）。(3)「step3のstripeの審査に進むの前に同意事項が必要では？本人確認情報や振込口座情報を渡すことについて」。
- **(1) 「承認」の曖昧さ解消**：LAP-13の「承認後、口座情報のご登録に合わせて、」は個展なび自身のStep1本人確認審査の承認を指す意図だったが、文脈から独立して読めるため何の承認か不明瞭だった。「個展なびの本人確認審査を通過された後、振込先口座の登録と合わせて」に書き換え、承認の主体（個展なび／Step1）を明示。あわせて元文の冗長な重複（「振込先口座の登録に合わせて」が2回出る）も整理。
- **(2) Stripeアカウント・ダッシュボードの開示：説明する方針を採用**。理由＝LAP-13の既存回答は既に「契約成立後にStripe社から直接メール等で連絡がある場合がある」と明記しており、Stripeというブランドが利用者の目に触れること自体は既定路線。その状態でアカウント作成やダッシュボードの存在を伏せると、後日Stripeブランドのメールや通知に触れた際に「聞いていない」という不安・問い合わせを招くリスクの方が高い。一方で個展なびの設計原則は「通常のご利用はすべて個展なびの画面内で完結」（LAP-12の既存回答）なので、開示は**事実を一言添えるに留め、ダッシュボード操作を促す書き方にはしない**。LAP-13に「この連携によりStripe社にアカウントが作成されますが、通常のご利用（売上確認・精算設定など）はすべて個展なびの画面内で完結するため、Stripe側のダッシュボードを操作いただく必要はありません」を追加。
- **(3) Step2にStripe提供の明示同意チェックを新設**：`kotennavi-p11-4.html`のStep2フォーム（`#p114Step2Form`）を調査した結果、「Stripeの利用規約に同意して連携する」という連携ボタンのラベル自体が同意を兼ねる設計になっていたが、Step1の`.p114-checklist`のような可視化されたチェック項目としての同意は無く、「本人確認情報・振込口座情報をStripe社に渡すこと」自体への同意文言も存在しなかった。「決済パートナーとの連携」ブロックの連携ボタン直前に、Step1と同型の`.p114-checklist`で同意チェック`#p114StripeConsent`（「本人確認情報・振込先口座情報がStripe社（決済代行会社）に提供され、同社における本人確認・口座確認のために利用されることに同意します」）を新設。`#p114StripeConnectBtn`は初期`disabled`とし、チェックの`onchange`で有効化する構成にした。**ゲート位置の判断**：情報がStripeへ実際に渡るのは「連携ボタンを押してStripe社の画面へ遷移する」瞬間であり、その後の「Stripeの審査へ進む」ボタン（Step3への入口）ではない。そのため同意チェックは連携ボタンの直前に置き、Step3投入ボタンではなく連携ボタン自体をゲートした。デモツールバーの「連携済み／未連携」ボタン（`setStripeConn()`）はこのチェックを経由せず直接デモ状態を切替える既存の開発用機構のため変更していない。
- **影響ファイル**：`kotennavi-common.js`（LAP-13の回答文）、`kotennavi-p11-4.html`（Step2フォームの同意チェックボックス新設・連携ボタンの初期disabled化）。

### 2026-07-28 追補(54)（p11-4：Step2の「連携」と「審査提出」を1操作へ統合・重複口座入力フォームを廃止）

- **経緯**：ユーザーより「step3の連携と審査は一つにすることはできないの？」と指摘。
- **問題の所在**：追補(53)までのStep2は(1)「Stripeの利用規約に同意して連携する」ボタンを押すとStripe社の画面に遷移し、そこで口座情報・本人確認情報を入力→個展なびに戻る（「連携済み」表示のみ）、(2)個展なびのフォームに振込先口座情報（金融機関名・支店名・預金種別・口座番号・口座名義）を**再度**入力、(3)別途「Stripeの審査へ進む」ボタンで送信、という3段階構成だった。しかし(1)の説明文自体が「Stripe社の画面へ移動し、口座情報や本人確認情報をご入力いただきます」と明記しており、口座情報はStripe社の画面で既に入力させている。にもかかわらず(2)で個展なび側にも同じ口座情報を再入力させるのは実質的な二重入力で、(1)と(3)を別ボタン・別操作に分ける理由も無かった。
- **判断**：**Stripe Connect の実運用に即した設計に修正**。Stripeのホスト型オンボーディング画面では口座・本人確認情報の入力自体がStripe側で完結し、そこから個展なびへ戻ってきた時点で連携（＝Stripeへの情報提供）と審査提出はセットで完了している、という理解のもとに単純化した。「連携」＝Stripeへ情報を渡す行為そのものが同時に「審査への提出」でもあるため、ユーザー操作としては1回のボタン押下（同意チェック→連携ボタン）に統合するのが実態に即している。
- **対応**：
  - `kotennavi-p11-4.html` Step2フォーム：「振込先口座情報」ブロック（`#p114BankBlock`・5項目の入力フォーム）を削除。「連携済み／未連携」の中間表示（`#p114StripeConnected`/`#p114StripeUnconnected`の出し分け）も、連携＝即提出のため不要になり削除し、常時「未連携」ステータス表示＋説明文＋同意チェック＋連携ボタンのみのシンプルな1ブロック構成にした。別立てだった送信ブロック（`#p114Step2SubmitWrap`＝「Stripeの審査へ進む」ボタン）を削除し、連携ボタン（`#p114StripeConnectBtn`）のonclickを直接`p114Step2Submit()`に変更（クリック1回＝連携と審査提出の両方を実行）。
  - `kotennavi-p11-4.html` JS：`setStripeConn()`関数と、対応するデモツールバーの「Stripe連携：連携済み／未連携」トグル（`dbarStripeOn`/`dbarStripeOff`）を削除（連携の中間状態を個別デモする意味が無くなったため）。`setDemoMode()`内の削除済み要素（`p114Step2SubmitWrap`）への参照行を削除（残すと`null.hidden`でエラーになる）。`p114Step2Submit()`の完了モーダル文言を「振込先口座の登録を受け付けました」から「Stripeとの連携を受け付けました」＋「振込先口座・本人確認情報をあわせてStripe社の審査に提出しました」に変更し、実際の操作（連携ボタン1回）と整合させた。デモツールバーのラベルも「Step2口座+Stripe」→「Step2 Stripe連携」に変更。
  - `kotennavi-p11-4.html` ステータスバナー3種（`#p114PendingBanner`／`#p114Step2Banner`／`#p114StripePendingBanner`）とセクション見出し（「振込先口座の登録とStripe連携」→「Stripeとの連携」）の文言を、「振込先口座の登録」と「Stripeとの連携」を別工程として書いていた表現から、連携1本にまとめた表現へ統一。
  - `kotennavi-common.js` `KTN.QA` LAP-13：「入力が完了すると自動的に個展なびの画面へ戻り、続きのお手続きに進めます」（＝連携後にまだ手続きが残るという含意）を「入力が完了すると自動的に個展なびの画面へ戻り、そのままStripe社の審査に提出されます（個展なびの画面での再入力は不要です）」に修正し、FAQの説明を実際のUIフローと一致させた。
  - JS構文チェック（`new Function()`）で異常なしを確認。削除した要素ID・関数（`p114BankBlock`/`p114StripeConnected`/`p114StripeUnconnected`/`setStripeConn`/`dbarStripeOn`/`dbarStripeOff`/`p114Step2SubmitWrap`/`p114Step2SubmitBtn`等）への参照がHTML内に残っていないことをgrepで確認。
- **影響ファイル**：`kotennavi-p11-4.html`（Step2フォーム構造の簡素化・JS整理・バナー文言統一）、`kotennavi-common.js`（LAP-13の回答文）。

### 2026-07-28 追補(55)（p11-4：Step2の口座フォームをp3-17精算設定の運用に合わせて復元し、Stripe連携を「画面遷移」から「API連携」へ再定義）

- **経緯**：追補(54)の直後、ユーザーより「p3-17のように振込情報を確認・変更する必要があるので、個展なびにも入力欄が必要です。それよりも、個展なびで入力した情報をAPIで渡すことができないの？」と指摘。
- **問題の所在**：追補(54)は「Stripeのホスト型オンボーディング画面で口座・本人確認情報の入力が完結する」という前提のもと、個展なび側の振込先口座フォーム（`#p114BankBlock`）を削除した。しかしこの前提は、既存の`kotennavi-p3-17.html`（LIAISON+精算設定/取引デスク）の設計と矛盾していた。p3-17を確認すると、「Stripe連携ステータス」は通常“連携済み”のバックグラウンド状態として表示されるのみで、再連携ボタン（`#p317StripeConnectBtn`）はStripe側で追加確認が必要になった場合などの**例外時のみ**表示される。振込先口座情報（`p317BankName`/`p317AcctType`/`p317AcctNum`/`p317AcctHolder`）自体は、個展なび画面内の通常フォームで直接入力・編集し`#p317SaveBank`で保存する設計であり、Stripe社の画面へユーザーを都度遷移させる想定ではなかった。ユーザーはこの点をもって「口座情報の確認・変更は個展なび側にも入力欄が要る」と指摘し、加えてStripeへの連携自体も「画面遷移」ではなく「個展なびが入力データをバックエンドのAPIでStripe社へ送信する」方式にできないかと提案した。
- **判断**：**p3-17の既存設計を正とし、p11-4もこれに合わせる**。振込先口座フォームをp3-17と同じフィールド構成（`p114BankName`/`p114Branch`/`p114AcctType`/`p114AcctNum`/`p114AcctHolder`）で個展なび画面内に復元。Stripe社への情報伝達は「Stripe社の公式画面へ一時的に移動して入力する」方式ではなく「個展なびに入力された情報を、個展なびのバックエンドがAPI経由でStripe社に送信する」方式として説明を統一する。これにより(a)口座情報の事後の確認・変更がp3-17と同じ画面内操作で行える、(b)ユーザー体験としてはStripe社の画面へ遷移させず個展なび内で完結する、(c)追補(54)で求められた「連携と審査提出を1操作にする」という簡素化も、送信ボタン1つが「保存」と「Stripeへの審査提出」を同時に行うことで両立できる。
- **対応**：
  - `kotennavi-p11-4.html` Step2フォーム：`.p211-block`形式で「振込先口座情報」ブロック（`#p114BankBlock`）をp3-17と同一フィールド名で復元（金融機関名・支店名・預金種別・口座番号・口座名義（カナ））。ヘルプ文で「ご登録いただいた情報は、決済パートナーであるStripe社へ個展なびから連携され、Stripe社での本人確認・口座確認に利用されます」とAPI連携の旨を明記。Stripe提供同意チェック（`#p114StripeConsent`、追補53で新設）をこのブロック内（口座欄の直後）に移設し、`onchange="p114UpdateStep2Submit()"`で送信ボタンの活性化条件に組み込んだ。単一の送信ボタン（`#p114Step2SubmitBtn`・ラベル「Stripeの審査へ進む」）を`#p114Step2SubmitWrap`として復元＝口座情報の保存とStripeへの審査提出を1クリックで行う（追補54の「1操作化」の意図は維持）。
  - `kotennavi-p11-4.html` JS：`p114UpdateStep2Submit()`を新設（`#p114StripeConsent`のchecked状態で`#p114Step2SubmitBtn.disabled`を切替。追補53で作った`p114StripeConsent`の同等関数が追補54で失われていたのを是正しつつ新フォーム構成に合わせて再実装）。`setDemoMode()`に`document.getElementById('p114Step2SubmitWrap').hidden = !isStep2;`を再追加（追補54で削除されていた）。`p114Step2Submit()`の完了モーダルを「振込先口座の登録を受け付けました」＋「ご登録いただいた口座情報・本人確認情報を、個展なびからStripe社へ連携し、審査に提出しました」に変更し、API連携（画面遷移なし）である旨を明示。デモツールバーのラベルを「Step2 Stripe連携」→「Step2 口座登録」に変更。
  - `kotennavi-p11-4.html` ステータスバナー3種（`#p114PendingBanner`／`#p114Step2Banner`／`#p114StripePendingBanner`）を「Stripe社との連携」「Stripe社の画面でご入力」という遷移前提の文言から、「振込先口座のご登録」＋「個展なびからStripe社へ連携」というAPI連携前提の文言に修正。
  - `kotennavi-common.js` `KTN.QA` LAP-13：「連携ボタンを押すと一時的にStripe社の公式画面へ移動し、そこで振込先口座情報や本人確認情報をご入力いただくことで契約が成立します」を「振込先口座情報や本人確認情報は、Stripe社の画面へ移動することなく個展なびの画面内でご入力いただき、個展なびからStripe社へAPI経由で連携（送信）することで契約が成立します」に修正。「通常のご利用（売上確認・精算設定など）」の記述に「口座情報の変更」も明記し、p3-17との整合を強めた。
  - JS構文チェック（`new Function()`）で`kotennavi-common.js`・`kotennavi-pages.js`・p11-4のインラインscriptともに異常なしを確認。追補(54)の削除に由来する残置参照（`setStripeConn`/`dbarStripeOn`/`dbarStripeOff`/`p114StripeConnected`/`p114StripeUnconnected`/`p114StripeConnectBtn`）がHTML内に無いことをgrepで確認。
- **設計上の教訓**：Stripe連携のUI設計は「Stripeのホスト型オンボーディング画面に一時遷移させる」モデルと「個展なびの画面内で入力しAPIでバックエンド連携する」モデルの2通りが存在しうるが、**本プロジェクトではp3-17が先に後者のモデルで確定している**ため、以後Stripe関連のUIを新設・変更する際は必ずp3-17の設計（バックグラウンドのステータス表示＋個展なび内フォーム＋例外時のみ再連携導線）を踏襲すること。
- **影響ファイル**：`kotennavi-p11-4.html`（Step2フォーム構造の復元・JS再実装・バナー文言修正）、`kotennavi-common.js`（LAP-13の回答文）。

### 2026-07-28 追補(56)（p11-4：Step1審査中以降は「リエゾンプラスとは」「よくある質問」を折りたたみ表示化、Step1審査中はフォームを表示専用化。`.ktn-zone`の折りたたみパターンを全ページ共通CSSへ一般化）

- **経緯**：ユーザーより「step1審査中以降の画面表示：リエゾンプラスとは、よくある質問はたたまれた状態で、クリックしたら開ける状態にしてください」「step1審査中は入力内容を表示するだけ、入力できないようにしてください」との指示。
- **問題の所在**：従来は`setDemoMode()`が`isStep1Phase`（form/pending以外）を外れると`#p114AboutZone`/`#p114AboutGuide`/`#p114Index`をJSで`hidden`にして完全に非表示にしていた。審査中・Step2以降でも申込内容やFAQを参照したいユーザーのニーズを考えると、非表示より「畳んでおいて必要な時に開ける」方が適切。またStep1審査中（pending）は送信済み内容の状態のはずだが、フォーム欄（`#p114Step1Form`配下のinput/select/textarea、添付ドロップゾーン、チェック項目）が編集可能なまま残っていた。
- **判断（折りたたみの実装方式）**：新規のJS開閉トグル関数を作らず、**ネイティブ`<details>/<summary>`**を採用。理由は`KTN.renderQA`が個別FAQ項目（`.p70-faq-item`）で既に`<details><summary>`アコーディオンを使っており、ゾーン単位の折りたたみもこれと同じ規約に揃えることで一貫性が保てるため。加えて`<details>`はクリック開閉・キーボード操作・`.open`プロパティでのJS制御が標準機能として付いてくるため実装コストも小さい。
- **判断（CSSの汎用化）**：`.ktn-zone`は元々CLAUDE.md「ページ内目次＋ゾーンヘッダー」で全ページ共通コンポーネントとして定義済み（現状p11-4のみ使用、p11-2/p11-3が将来採用予定）。今回の折りたたみ対応をp114スコープのCSSにせず、`details > summary.ktn-zone{...}`という**セレクタスコープで一般化**して`kotennavi-common.css`のcanonical位置（`.ktn-zone__en`直後）に追加した。これにより将来どのページでも`<details><summary class="ktn-zone">`と書くだけで折りたたみ可能なゾーンになり、`<details>`でラップしていない既存の`.ktn-zone`（例：p11-4の`#p114SecForm`）には一切影響しない。山形アイコン（`.ktn-zone__toggle-icon`）はborder角の回転で表現し新規SVGを追加しない。
- **判断（Step1読み取り専用化）**：ネイティブ`disabled`属性による無効化と、`pointer-events:none`によるクリック抑止を併用する2段構え。`<input>`/`<select>`/`<textarea>`は`disabled`で対応できるが、本人確認書類の添付ドロップゾーン（`.p211-img-drop`＝独自の`onclick`ハンドラを持つdiv）やチェック項目行（`.p114-checklist__item`／`.p114-terms-agree`）はネイティブ`disabled`の対象外のクリック可能要素のため、`#p114Step1Form.p114-readonly`スコープで`pointer-events:none;opacity:.6`を当てて操作を抑止した。
- **対応**：
  - `kotennavi-p11-4.html`：「①リエゾンプラスとは」「②よくある質問」を`<details id="p114AboutDetails" open>`/`<details id="p114FaqDetails" open>`でラップし、見出しを`<div class="ktn-zone ...">`から`<summary class="ktn-zone ktn-index-target" id="p114AboutZone/p114FaqZone">`へ変更（`.ktn-zone__toggle-icon`を追加）。目次アンカー（`href="#p114AboutZone"`等）は`summary`のidで維持。目次（`#p114Index`）自体は常時表示に変更（従来のhidden切替を廃止）。
  - `kotennavi-p11-4.html` JS：`setDemoMode()`内の`p114AboutZone`/`p114AboutGuide`/`p114Index`への`hidden`代入3行を削除し、`document.getElementById('p114AboutDetails').open = isForm`／`p114FaqDetails.open = isForm`に置換（'form'モードのみ展開）。
  - `kotennavi-p11-4.html` JS：新規`p114SetStep1Readonly(readonly)`を追加し、`#p114Step1Form`へ`.p114-readonly`クラスを付け外し＋配下の`input/select/textarea`全ての`.disabled`を切替。`setDemoMode()`から`p114SetStep1Readonly(isPending)`を呼び出し（pendingモードのみ読み取り専用化）。
  - `kotennavi-common.css`：①折りたたみゾーン汎用パターン（`details > summary.ktn-zone`＋`.ktn-zone__toggle-icon`）を新設。②`.p211-input:disabled`のみだった既存パターンに`.p211-select:disabled`/`.p211-textarea:disabled`を追加（p11-4限定でなくプロジェクト全体の`.p211-*`フォーム部品共通スタイルとして追加）。③`#p114Step1Form.p114-readonly`スコープの`pointer-events:none`ルールを追加。
  - JS構文チェック（`new Function()`）・CSS中括弧対応数（7128/7128）・`<details>`タグ対応・新規CSS/JSが参照する要素ID/クラスの実在（grep）を確認。
- **影響ファイル**：`kotennavi-p11-4.html`（About/FAQゾーンの`<details>`化・JS新規関数）、`kotennavi-common.css`（`.ktn-zone`折りたたみ汎用パターン新設・`.p211-select`/`.p211-textarea`の`:disabled`追加・`.p114-readonly`スコープCSS新設）。

### 2026-07-28 追補(57)（p11-4に「作品の発送地」入力欄を新設しp3-11/p4-11の編集可能な既定値と連携、p2-12-1に既定値の出所を明記。承認済み状態に申込内容確認＋確認ボタン〔LIAISON+コンソールへ遷移〕を新設）

- **経緯**：ユーザーより「機能申込フォームの入力欄に作品発送地を追加してください。これはp2-12-1のdefaultとして表示されるもので、p3-11,p4-11のリエゾン+セクションで表示・編集できるもの」「承認済の状態のフォームは今まで入力されたものを表示（本人確認情報以外、ただしギャラリーの場合は責任者の名前とよみを表示）、内容を確認して、確認ボタンを表示、ボタン押すと遷移するページはどこにすればいいでしょうか？」と指示・質問。
- **問題の所在／論点**：
  1. **発送地のデータの流れ**：これまでp2-12-1（LIAISON+出品設定）に既存の`#p2121ShipPref`（47都道府県セレクト）があったが、その初期値がどこから来るのか（申込段階で聞いていない）という欠落があった。
  2. **role別セクションの共存**：p11-4のcreator/gallery各セクション（`.p114-creator-section`/`.p114-gallery-section`）はJSでの`hidden`切替ではなく、CSS `display:block/none`（`body.p114-role-gallery`セレクタ）で両方が常にDOM上に存在する実装だったため、新規フィールドをrole別に複製すると同一IDが2つ存在するバグを生む。
  3. **承認済み状態での本人確認情報の扱い**：承認後にユーザーが自分の申込内容を振り返りたいニーズはあるが、本名・生年月日・住所・電話番号・本人確認書類などのセンシティブ情報は再表示すべきでない。ただしギャラリーの場合は「責任者」の氏名・フリガナだけは組織運営上参照性が必要という例外指定があった。
  4. **確認ボタンの遷移先**：ユーザーから明示的に「どこがいいか」を問われた開かれた設計判断だった。
- **判断（発送地を単一の共通フィールドにする）**：p11-4のcreator/gallery両セクションがDOM上に共存する実装のため、発送地フィールドをrole別に複製せず、両セクションの外側（共通部分）に単一の`#p114ShipPref`として配置。これにより`getElementById`の重複衝突を避けつつ、「発送地はcreator/galleryどちらでも共通して必要な情報」という実態にも合致する。
- **判断（発送地の値の伝播先＝p3-11/p4-11を canonical な既定値の置き場所にする）**：p2-12-1の`#p2121ShipPref`を申込時の値で直接ロックするのではなく、**p3-11/p4-11のリエゾンプラスセクションに編集可能な既定値`#p311ShipPref`/`#p411ShipPref`を置き、p2-12-1はその値を初期値として読み込み展示ごとに個別上書きできる**という三層構造にした（p11-4申込時の入力→p3-11/p4-11の恒久的な既定値〔ここで更新可能〕→p2-12-1の展示ごとの一時的な上書き）。理由：発送地は転居・スタジオ移転等で申込後に変わりうる情報であり、p11-4は一度きりの申込フォームなので恒久的な編集場所として不適切。CLAUDE.mdの「p2-12-1の`#p2121ShipPref`の初期値」という要件を満たすには、p3-11/p4-11のような繰り返し編集可能な基本情報ページに正本を置くのが自然。
- **判断（承認済みレビューは新規の独立ブロックとして構成）**：既存の`#p114Step1Form`（本人確認情報を含む全項目の編集フォーム）はapprovedモードで元々`isStep1Phase`判定により全体が`hidden`になる仕様だったため、「本人確認情報だけを個別に隠す」といった追加のフィルタリングロジックを既存フォームに実装する必要はなかった。代わりに`#p114ApprovedReview`という完全に独立した新規表示ブロックを作り、静的デモデータ`P114_REVIEW`（role別・本人確認情報を含まない[ラベル,値]配列）を`p114SyncApprovedReview(r)`が`.p114-identity-readout`（既存の読み取り専用dlパターン）へ描画する設計にした。gallery配列にのみ「責任者お名前」「責任者フリガナ」を追加し、それ以外の責任者情報（立場・法人番号・生年月日・住所・電話番号）は本人確認情報として除外した。
- **判断（確認ボタンの遷移先＝LIAISON+コンソール p3-15/p4-15）**：`docs/sitemap.md`を確認し、p3-15（クリエイター-リエゾン+コンソール）／p4-15（ギャラリー-リエゾン+コンソール）が既に「Fix済」の専用ハブページであることを確認。承認完了→内容確認という文脈の直後の着地点として、LIAISON+の実際の利用（出品・取引管理等）を開始するハブページへ誘導するのが最も自然と判断し、`p114ConfirmApproved()`が`window.ktnState.role`に応じて`kotennavi-p3-15.html`/`kotennavi-p4-15.html`へ遷移する実装にした。
- **対応**：
  - `kotennavi-p11-4.html`：creator/gallery両セクションの外（共通部分）に「作品の発送地」ブロック（`.p211-block`）を新設。`#p114ShipPref`（47都道府県セレクト・p2-12-1の`#p2121ShipPref`と同一構成、必須・初期値は空欄）＋ヘルプ文。
  - `kotennavi-p3-11.html`：ブロック5.5「リエゾンプラス本人確認状況」の`#p311LpApproved`内に`#p311ShipPref`（47都道府県セレクト、東京都選択済み＝申込時デモ値）を追加。ヘルプ文で「リエゾンプラス機能申込でご登録いただいた内容を表示。ここで直接更新できる」旨を明記。
  - `kotennavi-p4-11.html`：ブロック6.5「リエゾンプラス責任者」の`#p411LpApproved`内に同様の`#p411ShipPref`を追加。
  - `kotennavi-p2-12-1.html`：既存の`#p2121ShipPref`直前にHTMLコメントで初期値の出所（p3-11/p4-11のリエゾンプラスセクション）を明記し、直後に「初期値は、クリエイター基本情報／ギャラリー基本情報に登録された発送地です。この展示だけ変更する場合はここで選び直してください」というヘルプ文を追加。既存JS・選択肢リストは変更なし。
  - `kotennavi-p11-4.html`：承認済み専用ブロック`#p114ApprovedReview`を新設（`.p114-identity-readout`再利用＋`P114_REVIEW`データ＋`p114SyncApprovedReview(r)`）。確認ボタン「内容を確認しました」（`p114ConfirmApproved()`）を設置。`setR()`・`setDemoMode()`・初期化スクリプトに`p114SyncApprovedReview`呼び出しを追加。
  - JS構文チェック（`new Function()`）で4ファイルのインラインscriptを確認。p2-12-1で誤検知（既存の`<script type="application/ld+json">`構造化データを正規表現がJSとして誤検査）が出たが、実際のインラインJS（本物の`<script>`）は個別確認で正常。このラウンドのp2-12-1への変更はHTML（コメント＋ヘルプ文）のみでJSは無関係。`<select>`/`<div>`タグ対応数も4ファイルとも一致確認。
- **設計上の教訓**：申込フォーム（一度きりの入力）由来の値を、後から繰り返し編集したくなる恒久的な設定（今回は発送地）として扱う場合、**申込フォーム自体を編集可能にするのではなく、恒久編集は基本情報ページ（p3-11/p4-11）に正本を置き、申込フォームはその「初期入力」の役割に限定する**のが妥当。同様のパターン（申込時に入力した値を後から変更したくなる項目）が今後発生した場合はこの三層構造（申込→基本情報の編集可能な既定値→個別ページでの一時上書き）を踏襲する。
- **影響ファイル**：`kotennavi-p11-4.html`（発送地フィールド新設・承認済みレビューブロック新設・JS新規関数3件）、`kotennavi-p3-11.html`（発送地の編集可能既定値フィールド追加）、`kotennavi-p4-11.html`（同左）、`kotennavi-p2-12-1.html`（既存フィールドへのヘルプ文追加のみ・構造変更なし）。

---

### 2026-07-29 追補(58)（Stripe Connect Express＋Hosted Onboarding前提を確定。p11-4 Step2／p3-17振込先口座ブロックを「個展なびへ入力→API送信」方式から「Stripe社のホスト画面へリダイレクト」方式へ再設計）

- **経緯**：ユーザーからの技術的な質問「Stripe連携の場合、個展なびからどのようなAPIを使って本人情報と振込口座情報を送ればいいですか？決められた項目は？通信条件は？」に回答する過程で、追補(55)以降ずっと前提にしていた「個展なびの画面に口座情報を入力させ、個展なびのバックエンドがAPI経由でStripe社へ送信する」方式が、プロジェクトが一貫して前提としてきた**Stripe Connect Express**の標準的な連携方式と整合していないことが判明した。ユーザーより「ずっとexpress前提ですよ。もう一度p11-4,p3-17を再確認した方がいいですね」「まずstripe connect express で Hosting Onboarding 前提にしましょう」との明確な指摘・指示があった。
- **問題の所在**：Stripe Connect Expressは、口座・本人確認情報の収集を主にStripe社自身の**Hosted Onboarding（Account Links／`POST /v1/account_links`）**、すなわちプラットフォーム側の画面から一時的にStripe社のホスト画面へリダイレクトし、そこで直接入力させて`return_url`へ戻す方式を標準とする。プラットフォーム独自のAPI（Custom account向け）で本人確認・口座情報を一括収集して送信する方式は、Expressの標準的な使い方ではなく、Stripeの事前承認や継続的なコンプライアンス対応（6か月ごとの再確認等）を要する別トラックである。既存実装（p11-4 Step2の「Stripeの審査へ進む」ボタン）はラベルこそStripeへの遷移を示唆していたが、実際のコード（`p114Step2Submit()`）は画面遷移せず`KTN.submitDone()`の完了モーダルを出すだけであり、ボタンの見た目・ユーザーの認識（「一緒に作ってきたのでリダイレクトすると思っていた」）と実装が食い違っていた。
- **判断①（個展なび独自の本人確認とStripeのKYCは別物・p11-4 Step1は現状維持）**：ユーザーより「個展なびはリエゾン＋利用にあたり、利用者の本人確認をとる必要がある。それは作品を出品する人で、作品の真正性や法規に違反していないかなりすましではないかを確認するためです。Stripeとは別にサイトが本人確認する必要がある」と明確な指摘。個展なびの本人確認（なりすまし防止・出品作品の真正性・法令遵守の確認、事務局の目視審査）とStripeのKYC（決済・送金のための本人確認、AML/CFT目的）は**目的が異なり、一方で他方を代替できない**。したがってp11-4 Step1（本名・生年月日・住所・電話番号・本人確認書類の入力＋事務局審査）は変更せず、個展なび独自の手続きとしてそのまま維持する。Stripe側の本人確認とは完全に独立した2つの確認プロセスが並存する。
- **判断②（個展なびは口座情報を保持しない。ただし確認手段としてStripe APIからのマスク表示を用意）**：ユーザーより「振込口座についてはサイトで持つ必要はない、利用者が振込口座名を確認する方法がないことがちょっと困ったことです」との指摘。Hosted Onboardingでは口座情報はStripe社が直接受け取り個展なびは保持しないため、従来p3-17にあった「口座情報を編集して保存する」フォームは前提そのものが崩れる。一方で「利用者が今どの口座が登録されているか確認できない」という新たな課題が生まれるため、**Stripe APIの External Bank Account取得（`GET .../external_accounts`）で得られる`bank_name`・`last4`（マスク済み下4桁）・`account_holder_name`を、個展なび画面内に読み取り専用で表示する**方式を提案し、ユーザーが承認（「はい、この方向で修正してください」）。フルの口座番号はStripe側にのみ存在し、個展なびは取得・保存しない。
- **判断③（Stripeへ接続する前に、入力を求められる情報を事前に案内する）**：ユーザーより「Stripeに接続する前、利用者にはStripeで入力が求められるものを予め伝え用意してもらう必要があると思う」との追加指示。Hosted Onboardingへのリダイレクト後は個展なびの画面外でStripe社が直接入力を求めるため、途中で書類が手元になく離脱するリスクがある。これを避けるため、**リダイレクト前の個展なび画面に「Stripeの画面で入力を求められる情報」の事前案内（準備リスト）を表示**する設計にした。新規の一覧CSSコンポーネントは作らず、既存の`.p211-help`段落＋`<br>`区切りの箇条書き（p11-4 Step1の本人確認書類説明文で既に使われているパターン）を踏襲し、ロール別の出し分け（法人番号等はギャラリーのみ）は既存の`.p114-gallery-section`（`body.p114-role-gallery`で表示切替）をそのまま再利用した。
- **対応**：
  - `kotennavi-p11-4.html` Step2：`#p114BankBlock`の口座入力5項目（金融機関名・支店名・預金種別・口座番号・口座名義）を削除し、「Stripeでのお手続き」ブロック（`p211-block`）に置き換え。①Hosted Onboardingへ移動する旨の説明、②Stripeの画面で求められる情報の事前案内（振込先口座情報／本人情報／本人確認書類の画像／〔ギャラリーのみ〕法人番号等）、③同意チェック（`#p114StripeConsent`、文言を「情報が提供される」から「Stripe社の画面へ移動し、同社のサービスを利用することに同意します」に変更）の3段構成。送信ボタンのラベルを「Stripeの審査へ進む」から実態に合わせて「Stripeで口座情報を登録する」に変更。
  - `kotennavi-p11-4.html` JS：`p114Step2Submit()`を`KTN.submitDone()`（完了モーダル）から`setDemoMode('stripePending')`＋`KTN.toast('Stripeの画面へ移動します（デモ）')`に変更。本番相当のリダイレクト＋復帰の往復を、p3-17の`setStripeConnectBtn`クリックハンドラ（`setStripeConn('connected')`＋トースト）と同じデモ表現規約に揃えた。
  - `kotennavi-p11-4.html`：About/ガイドゾーンの「本人確認・振込先口座が必要な理由」dl（本人確認の項目に「Stripeとは別の個展なび独自の審査」である旨を追記、振込先口座の項目をAPI連携前提からHosted Onboarding前提に書き換え）、Step2バナー2種（Step1審査完了案内／Stripe審査中）の文言をリダイレクト前提に修正。
  - `kotennavi-p3-17.html` `#p317BankBlock`：編集可能だった5項目を`.p114-identity-readout`（p11-4の読み取り専用dlパターンを再利用）による読み取り専用のマスク表示（金融機関名・口座番号下数桁・口座名義）に変更。保存ボタン「口座情報を保存する」（`#p317SaveBank`）を「Stripeの画面で口座情報を変更する」（`#p317ChangeBankBtn`）に置き換え。口座名義（全角カナ）を本人確認情報のフリガナと照合していたバリデーションIIFE（`.ktn-form-error`パネル`#p317BankError`／`#p317BankErrorList`・不一致時のエラー表示とジャンプボタン）は、編集フォーム自体が無くなったため丸ごと削除し、`#p317ChangeBankBtn`クリック時にトースト（デモ）を出すだけの単純なハンドラに置換。
  - `kotennavi-common.js` `KTN.QA`：LAP-03（本人確認・口座情報が必要な理由）・LAP-12（Stripeとは別会社か）・LAP-13（Stripeとの契約手続き）の3問を、Hosted Onboarding前提（口座登録・本人情報入力はStripe社の画面で直接行う、個展なび独自の本人確認とは別の手続き、個展なびは口座情報を保持せず一部情報のみ確認可能）に合わせて全面的に書き直した。
  - JS構文チェック（`new Function()`、`application/ld+json`スクリプトは除外）で`kotennavi-p11-4.html`・`kotennavi-p3-17.html`のインラインscript・`kotennavi-common.js`ともに異常なしを確認。削除したID（`p114BankName`/`p114Branch`/`p114AcctType`/`p114AcctNum`/`p114AcctHolder`／`p317BankName`/`p317Branch`/`p317AcctType`/`p317AcctNum`/`p317AcctHolder`/`p317SaveBank`/`p317BankError`/`p317BankErrorList`）への残置参照が無いことをgrepで確認。
- **設計上の教訓**：Stripe Connect（またはPSPの Connect/Marketplace 系プロダクト全般）を扱う際は、**アカウントタイプ（Standard/Express/Custom）と、実際の情報収集方式（Hosted Onboarding／API onboarding）を最初に確定してから実装する**。この2つを混同すると、口座・本人確認情報の「入力させる場所」「保持する主体」「表示・確認の手段」が実装のたびに揺れ、本ラウンドのように過去複数回（追補54・55）の再設計を招く。また、**同じ性質の情報でも収集主体が異なれば別工程として扱う**（個展なび独自の本人確認とStripeのKYCを1つの「本人確認」に混同しない）ことが、両者の目的の違いを保つ上で重要。
- **影響ファイル**：`kotennavi-p11-4.html`（Step2ブロック全面書き換え・JS1関数変更・バナー文言修正）、`kotennavi-p3-17.html`（`#p317BankBlock`を読み取り専用化・バリデーションIIFE削除）、`kotennavi-common.js`（LAP-03/LAP-12/LAP-13の3問を書き直し）。

### 2026-07-29 追補(59)（p3-17振込先口座のマスク表示を「常時表示」から「確認ボタン押下時のみ表示」に変更）

- **経緯**：追補(58)でp3-17の口座情報表示を編集フォームから読み取り専用のマスク表示（`.p114-identity-readout`）に変更したが、ユーザーより「振込先口座情報はp3-17表示する都度取得するのではなく、口座情報確認・変更をクリックして口座情報を表示してから変更ボタンを表示するようなフローにできますか？」との指摘。追補(58)時点の実装はページを開くたびにマスク済みとはいえ口座情報を無条件に表示する設計になっており、ユーザーはこれを「都度取得」（＝ページ表示のたびにStripeへ問い合わせて出す）と捉え、閲覧のたびに不要にセンシティブ系の情報へアクセスすること自体を避けたいという意図。
- **判断（ユーザーの明示的な操作を起点に取得・表示する）**：口座情報の表示を、ページ読み込み時の自動表示から、利用者が「登録口座情報を確認する」ボタンを押した時点でのみ取得・表示する方式に変更。実運用（Drupal/React化後）ではこのボタン押下をトリガーにStripe APIへ問い合わせる想定とし、個展なび側は表示の要否をユーザー操作に委ねることで、無条件のデータ露出・API呼び出しを避ける。
- **対応**：`kotennavi-p3-17.html` `#p317BankBlock`内を2状態に分割。①未確認状態`#p317BankUnrevealed`＝「登録口座情報を確認する」ボタン（`#p317RevealBankBtn`）のみ表示。②確認済み状態`#p317BankRevealed`＝初期`hidden`属性で非表示、`.p114-identity-readout`のマスク表示と「Stripeの画面で口座情報を変更する」ボタン（`#p317ChangeBankBtn`）を内包。JSは`#p317RevealBankBtn`のクリックで両divの`hidden`をトグルするだけの単純な処理（新規コンポーネントは作らず既存ボタン・dlパターンを流用）。プライバシー注記の文言も「表示されます」から「ボタンを押すとStripe社にご登録済みの内容（一部マスク）を確認できます」に修正し、都度自動表示ではないことを明示。JS構文チェック・div開閉タグ数一致（67/67）を確認。
- **影響ファイル**：`kotennavi-p3-17.html`（`#p317BankBlock`内のHTML構造分割・JS変更のみ。他ファイルへの影響なし）。

### 2026-07-29 追補(60)（p11-4に事業者番号〔インボイス制度・適格請求書発行事業者登録番号〕の任意入力欄を追加）

- **経緯**：ユーザーより「事業者番号（インボイス制度の適格請求書発行事業者登録番号）の入力(必須ではない)を追加してほしい」との指示。LIAISON+で作品が売れた際、個展なびが出品者（creator/gallery）へ売上金を支払う関係上、出品者が適格請求書発行事業者かどうか（インボイス番号の有無）は個展なび側の税務・経理処理（仕入税額控除の可否判定等）に関わる情報のため、申込フォームで収集する。
- **配置の判断**：法人番号（`#p114CorpNumber`）はギャラリーの責任者情報（本人確認）内にのみ存在するが、インボイス登録番号は個人事業主（creator含む）でも登録し得るため、**ロールで出し分けず共通ブロックとして新設**した。本人確認情報（本名・生年月日・住所等）とは性質が異なる（税務上の任意登録情報であり、本人確認の目的では使わない）ため、「本人確認（非公開）」セクションの外＝「本人確認書類の添付」ブロックの直前に独立ブロックとして配置し、本人確認情報と混同しないようにした。
- **必須にしない理由**：インボイス制度への登録は事業者の任意選択（免税事業者のまま活動する個人創作者も多い）であり、未登録であること自体は出品・LIAISON+利用の可否に影響しないため、必須項目にしない。
- **対応**：`kotennavi-p11-4.html` に新規ブロック「事業者番号（インボイス制度）」を追加。`#p114InvoiceNumber`（テキスト入力・「T」+13桁の書式をplaceholder/ヘルプ文で案内）。既存の`.p211-block`/`.p211-field`パターンを流用し新規CSSは追加していない。送信バリデーション（`p114UpdateSubmit`）には組み込んでいない（任意項目のため）。承認後の「お申込み内容のご確認」（`P114_REVIEW`）には今回反映していない（本人確認情報に準ずる項目は同リストから意図的に除外している既存設計に倣った・必要になれば別途追加）。
- **影響ファイル**：`kotennavi-p11-4.html`のみ（新規ブロック追加。他ファイルへの影響なし）。

### 2026-07-29 追補(61)（作品発送地・事業者番号〔インボイス制度〕をp3-11／p4-11のリエゾンプラス参考表示ブロックに反映）

- **経緯**：ユーザーより「作品発送地と事業者番号はp3-11,p4-11に反映してください」との指示。p11-4で収集・編集される情報のうち、本人確認の目的以外の項目（作品発送地・事業者番号）は基本情報側（p3-11／p4-11）からも直接確認・更新できるようにする、という既存方針（発送地について追補57で既に適用済み）を事業者番号にも揃えた。
- **判断（発送地と同じ「直接編集可・再申請不要」の扱いにする）**：法人番号（責任者情報の一部・本人確認に紐づく）は「変更する場合はp11-4から再申請」という扱いで読み取り専用表示だが、事業者番号（インボイス制度）は本人確認情報ではなく、発送地と同様「いつでも直接更新してよい」性質の情報と判断し、p3-11／p4-11で編集可能なテキスト入力として実装した（p11-4での追加時点の判断＝追補60を踏襲）。
- **対応**：`kotennavi-p3-11.html``#p311LpApproved`・`kotennavi-p4-11.html``#p411LpApproved`（いずれもLIAISON+承認済の場合のみ表示される参考表示ブロック）内、発送地フィールドの直後に事業者番号フィールド（`#p311InvoiceNumber`／`#p411InvoiceNumber`）を追加。ヘルプ文言はp11-4新設時と同じ「未登録・免税事業者は空欄でよい」方針。デモ値はp3-11（田中透・個人事業主）は空欄、p4-11（Gallery SOIL 渋谷・法人）は同ブロックの法人番号`1234567890123`と対応する`T1234567890123`とし、法人のインボイス登録番号が「T+法人番号」になるという実際の制度仕様を反映した。
- **影響ファイル**：`kotennavi-p3-11.html`・`kotennavi-p4-11.html`（各1フィールド追加のみ。他ファイルへの影響なし）。

### 2026-07-29 追補(62)（購入者向け領収書＝「①出品者自身の情報で生成する」方式を確定・実装。p5-15に発行モーダル新設、p11-4利用規約に第6条追加＋同意チェック追加、QA更新）

- **経緯**：追補(60)(61)でp11-4にインボイス登録番号入力欄を追加した流れで、ユーザーより「請求書の発行はどのページに実装すべきか」の相談を受けた。調査の結果、請求書・領収書の発行は性質の異なる2系統に分かれることを整理して提案：①**購入者向け**の作品購入の領収書（作品代金・送料・梱包費の受領証明。p5-15の取引完了状態に既存の未実装スタブボタン「領収書を発行」があった）、②**個展なびから出品者へ**のサービス利用料の請求書（プラットフォーム手数料の課税証憑。p3-17/p4-17の精算履歴が該当）。今回のラウンドは①のみを対象とする（②は将来別途）。
- **論点と判断（法的整理・実装方針の確定）**：
  1. ①を個展なびの「代行」で発行する場合、利用規約に明記するだけで足りるか、別途同意が必要かをユーザーから問われた。回答：契約上の委任は利用規約の具体的な明記で足りる場合が多いが、インボイス制度の**媒介者交付特例**（プラットフォームが自己の名義で発行する方式）を使う場合は、出品者が登録事業者である旨をプラットフォームへ通知する手続きが税法上別途必要（ただし包括契約条項で満たせるとする国税庁Q&Aの解釈あり）。
  2. 続けてユーザーから「個展なび自身がインボイス番号を取得していないと代行事業者になれないのか」と問われた。回答：媒介者交付特例を使う場合（個展なび自身の名義・登録番号で発行）は個展なび自身の登録が必須。**しかし、書類を「出品者自身の名義・登録番号」で生成し、個展なびはシステム（ツール）として作成を代行するに留める方式なら、媒介者交付特例に該当せず、個展なび自身の登録は不要**という整理を提示。
  3. ユーザーがこの「②出品者自身の情報で生成する」方式を明示的に選択し、「利用規約や申込時の同意やQAも必要に応じ修正・追加してください」と実装を指示。
- **判断（実装は3点セット＝利用規約＋同意チェック＋QA。UIは最小限のモーダルで足りる）**：法律上の論点（代行 vs 本人名義生成）はUIの見た目には現れないため、実装の中心は「①出品者への周知・同意の確保（利用規約＋チェックボックス）」と「②買い手への透明性の確保（生成される書類の性質＝登録番号未登録なら適格請求書に該当しない旨をFAQ・モーダル本文に明記）」の2点。p5-15側のUIは新規コンポーネントを増やさず、既存の`.p515-modal-overlay`/`.p515-modal`シェルと`.p114-identity-readout`（読み取り専用dl）を再利用するだけで足りると判断した。
- **判断（モーダルIDの衝突回避）**：p5-15には既に`#p515ReceiptModal`というIDが存在するが、これは「受け取りを確認しますか？」（商品受領確認）のモーダルであり、今回追加する領収書（支払い証憑）とは全くの別物。**紛らわしい既存IDを流用せず`#p515InvoiceModal`という新規IDを採番**し、命名衝突・意味の混同を避けた。
- **判断（利用規約の条文挿入位置と繰り下げ）**：既存のLIAISON+利用規約抜粋（`.p114-terms-box`）は第1〜8条＋付則の構成で、第4条（決済代行サービスの利用）が過去に追補されている（`docs/08_Stripe_Connectアカウント比較.md`に記録された前例）。今回は同じ手順を踏襲し、**第5条（特定商取引法に基づく表示）の直後に第6条（証憑書類の作成・発行）を新設**し、以降の会場優先販売・禁止事項・免責事項を7〜9条へ繰り下げた（内容は変更せず条番号のみスライド）。「特商法上の開示」と「証憑書類の発行」はどちらも購入者に対して出品者の身元情報を扱う点で近接する条文のため、この位置が自然と判断。
- **判断（同意チェックの追加場所・文言）**：p11-4の同意チェックリストは`.p114-creator-section`（`name="creator-agree"`）／`.p114-gallery-section`（`name="gallery-agree"`）に分かれ、`p114UpdateSubmit()`が`input[name="{role}-agree"]`を動的に走査してボタン活性化を判定する実装だったため、**新規チェックボックス（`#ca6`／`#ga6`）を追加するだけでJS側の改修が一切不要**だった（既存の特商法開示チェック＝`#ca4`/`#ga4`の直後に配置し、購入者への情報開示に関する同意をまとめた）。
- **判断（QAの追加・改訂範囲）**：買い手側の既存FAQ（`TXN-B09`＝取引完了後の領収書発行）に「出品者本人の名義で生成される」「登録番号未登録の場合は適格請求書に該当しない」旨を追記。出品者側は新規`LAP-14`（liaisonplus-apply）を追加し、代行発行ではなく出品者自身の名義で生成される仕組みと、登録番号が任意項目である旨を説明。出品者側の取引デスク（TXN-S系）やLIAISON+コンソール（LPL系）には今回追加しなかった（申込段階の同意チェックと本人確認情報の管理〔p3-11/p4-11の登録番号欄〕で既に周知済みと判断したため）。
- **対応**：
  - `kotennavi-p5-15.html`：「領収書を発行」ボタン（`#p515StatusDone`内）に`id="p515InvoiceBtn"`を付与。新規モーダル`#p515InvoiceModal`（`.p114-identity-readout`で発行日・宛先・但し書き・内訳・発行者・登録番号・取引番号を表示。デモの出品者＝田中透は`kotennavi-p3-11.html``#p311InvoiceNumber`が空欄＝未登録という前回ラウンドのデモ設定と整合させ、「未登録（適格請求書発行事業者ではありません）」と表示）。フッターは「閉じる」＋「PDFをダウンロード」（デモにつき`KTN.toast`のみ、実ファイル生成なし）。JSは既存の`p515ReceiptModal`等と同じ`hidden`トグルパターンで実装。
  - `kotennavi-p11-4.html`：`.p114-terms-box`に第6条（証憑書類の作成・発行）を新設し第6〜8条を7〜9条に繰り下げ。同意チェックリストに`#ca6`（creator）／`#ga6`（gallery）を追加。
  - `kotennavi-common.js` `KTN.QA`：`TXN-B09`を改訂、`LAP-14`を新規追加。
  - JS構文チェック（`new Function()`）でp5-15（script3件）・p11-4（script3件）とも異常なし、div開閉タグ数一致（p5-15：423/423、p11-4：147/147）を確認。common.jsは`node --check`で構文OKを確認。
- **保留事項**：②（個展なびから出品者へのサービス利用料請求書＝p3-17/p4-17精算履歴）は未着手。p5-14（購入管理）への同等の発行導線追加も範囲外として見送った。
- **影響ファイル**：`kotennavi-p5-15.html`（モーダル1件新設・ボタンにID付与・JS追加）、`kotennavi-p11-4.html`（利用規約条文追加・条番号繰り下げ・同意チェック2件追加）、`kotennavi-common.js`（QA1件改訂・1件新規）。

### 2026-07-30 追補(63)（p5-15領収書モーダル：宛先を購入者の実名に修正、書式付きレイアウトへ再設計、window.print()によるPDF保存を実装）

- **経緯**：追補(62)で実装した領収書モーダルについて、ユーザーより「領収書の宛先は購入者氏名にしてください」「領収書の表示のこのように」（参考スクリーンショット添付）「PDFも作ってもらえますか？」と指摘・追加指示。旧実装は次の3点で不十分だった：①宛先が購入者のアカウント表示名（ハンドル名）「hanaco 様」の固定文字列で、実名ではなかった。②表示が`.p114-identity-readout`（本人確認等で使う汎用の読み取り専用dl）の項目羅列のままで、正式な領収書らしい書式になっていなかった。③「PDFをダウンロード」ボタンがデモの`KTN.toast`表示のみで、実際のファイル生成をしていなかった。
- **判断（宛先＝配送先フォームの受取人氏名を動的参照。ハンドル名と別物として扱う）**：p5-15には既に配送先情報フォーム（`.p515-delivery__field`）に「受取人氏名」入力（デモ値「山田 花子」）が存在しており、これが購入者の実名として最も信頼できる既存データソースだった。アカウントのハンドル名「hanaco」（`#p515ContactModal`等で使われる表示名）とは役割が異なる（表示名＝サイト上の呼称、受取人氏名＝配送・法的書類で使う実名）ため、**領収書の宛先は受取人氏名フィールドから動的に読み取る**方式にした。ハードコードされた第二の文字列を持たせると二重管理でズレるため、`openInvoiceModal()`実行の都度、配送先フォームの現在値を読み取って反映する（購入者が配送先氏名を後から編集しても領収書に自動追従する）。実装のため配送先氏名入力に`id="p515DeliveryName"`を新規付与した（従来はclass指定のみで一意に参照できなかった）。
- **判断（レイアウトは新規`.p515-invoice-sheet`コンポーネントへ再設計。`.p114-identity-readout`は流用しない）**：ユーザー提供の参考スクリーンショットは、タイトル「領収書」／下線付き宛名＋「様」／ご購入日／太字大サイズの金額（税込）／発行日・管理番号・発行者・登録番号のメタ情報／「ご購入明細」の内訳・数量・単価・金額テーブル／合計行という、実物の領収書用紙に近い書式だった。`.p114-identity-readout`は汎用の縦積みdl（本人確認情報の表示等、フラットな情報羅列向け）でこの書式を表現できないため、**専用コンポーネント`.p515-invoice-sheet`を新設**（`kotennavi-common.css`に追加。宛名は明朝＋下線、金額は`--fm`欧文フォントで大きく強調、明細はテーブルで数量・単価・金額を右寄せ表示、合計行は上部太罫線＋太字）。ページ固有CSSプレフィックス規約（`.p{ID}-`）に従い`.p515-`で命名。
- **判断（PDF生成＝新規ライブラリを追加せず`window.print()`+印刷スコープCSSを採用）**：PDF生成方法として(a) `window.print()`＋`@media print`（ブラウザの印刷ダイアログから「PDFに保存」を選ぶ・外部依存なし）と(b) jsPDF/html2pdf.js等のJSライブラリでバイナリを直接生成、の2案を検討。コードベースを`jspdf|html2canvas|html2pdf|window\.print`で検索したところ、**`kotennavi-p2-6.html`（会場配布用の作品リスト）が既に(a)の方式（`window.print()`ボタン＋`@media print`スコープCSS）を採用済み**だった。プロジェクトに新規依存ライブラリを追加する強い理由もなく、既存の前例と一貫性を保つため(a)を採用。実装は、ボタン押下時に`document.body`へ`p515-print-invoice`クラスを付与して`window.print()`を呼び、`@media print`側で`body.p515-print-invoice>*{display:none}`により全要素を隠したうえで`#p515InvoiceModal`とその中の`.p515-invoice-sheet`のみを表示し直す（モーダルのヘッダー・説明文・フッターボタンは印刷時に非表示）。`afterprint`イベントで印刷用クラスを自動的に外す。ボタンラベルは「PDFをダウンロード」から、印刷ダイアログを介する実態に合わせ「PDFで保存する」に変更した。
- **対応**：
  - `kotennavi-p5-15.html`：配送先氏名入力に`id="p515DeliveryName"`を追加。`#p515InvoiceModal`内を`.p515-invoice-sheet`（宛名／ご購入日／金額／発行日・発行者・登録番号／ご購入明細テーブル／合計）へ全面差し替え。`openInvoiceModal()`に宛先の動的反映ロジックを追加。「PDFで保存する」ボタンのクリックハンドラを`window.print()`呼び出しに変更し、`afterprint`で後始末する処理を追加。
  - `kotennavi-common.css`：`.p515-modal--invoice`／`.p515-invoice-sheet`とその子要素一式、および`@media print{body.p515-print-invoice…}`の印刷専用スコープCSSを新規追加。
  - JS構文チェック（p5-15：script3件・異常なし）、div開閉タグ数一致（421/421）、common.css波括弧対応（7160/7160）を確認。
- **保留事項**：ワンクリックで印刷ダイアログを介さずPDFバイナリを直接ダウンロードする体験（jsPDF/html2pdf.js等の導入）は今回見送った。将来的にその要件が出た場合は別途ライブラリ導入を検討する。
- **影響ファイル**：`kotennavi-p5-15.html`（領収書モーダルのHTML構造・JS変更、配送先氏名入力へのID付与）、`kotennavi-common.css`（`.p515-invoice-sheet`系コンポーネント・印刷スコープCSSの新規追加）。

### 2026-07-30 追補(64)（p5-15領収書：説明文修正、宛名・但し書きを「都度入力」方式へ変更〔法的整理込み〕、html2pdf.jsによる実PDF自動ダウンロードを実装）

- **経緯**：追補(63)の実装直後、ユーザーから4点の指摘・相談：①モーダル説明文の文言修正、②発行者名の「（出品者）」削除、③**宛名・但し書きを毎回購入者が入力する方式にできないか。理由＝利便性と、取引完了後の個人情報削除のため。法的に問題ないかの相談**、④「PDFで保存する」ボタンが印刷ダイアログに遷移するだけでなく実際にPDFファイルを自動作成できないか。
- **論点と判断（③＝宛名・但し書きの「都度入力」方式の適法性）**：領収書の法定・慣行上の必須記載事項は「発行日・宛名・金額・但し書き（対価の内容）・発行者名・（登録事業者の場合）登録番号」。このうち**金額・日付・内訳・発行者名・登録番号は取引の客観的事実であり、実際の取引記録に基づいて固定表示する必要がある**（購入者が自由に書き換えられてはならない）一方、**宛名（誰宛に発行するか）と但し書き（何の代金としてか、購入者側の使途に応じた表現）は、本来「受取人（＝購入者）が申告する情報」であり、法令上「システムに保存された個人情報から自動生成しなければならない」という制約はない**。実務でも、多くのECサイト・チケットサービスの領収書機能は宛名を都度入力させる方式を採っており、前例のある一般的な設計と判断。**結論＝適法。宛名・但し書きのみ生成の都度、購入者自身に入力させる方式へ変更してよい**（改ざんされてはならない金額等の項目とは分離して扱う）。
- **副次的な設計上の利点（プライバシー・データ最小化）**：追補(63)時点の実装は配送先フォームの受取人氏名（実名）をJSで領収書へ転記する設計だったため、**取引完了後にその配送先個人情報を削除すると領収書機能が参照先を失う**という将来的な依存関係があった。今回、宛名を都度入力式に変更したことで、**領収書機能が配送先の保存データに一切依存しなくなり**、個人情報の削除ポリシー（取引完了後の削除）と機能要件が両立するようになった。これは③の理由としてユーザーが挙げた「取引完了後に個人情報を削除するため」に直接応える設計変更である。
- **判断（入力欄は毎回リセットする）**：宛名・但し書きの入力値をJS変数やlocalStorage等に保持して次回開封時に復元する設計は取らず、`openInvoiceModal()`が呼ばれるたび（モーダルを開くたび）に宛名を空欄、但し書きを既定値「作品代金として」へ強制的にリセットする実装にした。前回入力を保持しないことで、ブラウザ上にも入力履歴が残留しない（データ最小化の徹底）。
- **判断（PDF生成をhtml2pdf.js導入による実ファイル自動ダウンロードへ変更）**：追補(63)では新規ライブラリを避けて`window.print()`＋`@media print`方式を採用したが、ユーザーから「PDFファイルを自動作成できないか」と明確な追加要望があったため方針を変更。**本コードベースには既にCDN経由の外部JSライブラリ導入の前例がある**（`kotennavi-p2.html`/`p3.html`/`p4.html`/`p6.html`/`p6-1.html`/`p6-2.html`のQRコード生成＝`qrcodejs`、`kotennavi-p2-12.html`/`p2-12-1.html`のドラッグ並べ替え＝`sortablejs`、いずれも`https://cdn.jsdelivr.net`または`cdnjs.cloudflare.com`）。この前例に倣い、**html2pdf.js（`html2canvas`+`jsPDF`のバンドル）をCDNから追加**した。日本語テキストをjsPDFへベクター（選択可能テキスト）で直接描画するには別途日本語フォントの埋め込みが必要で実装コストが高いため、**html2canvasでDOM（`.p515-invoice-sheet`）を画像化してPDFに埋め込む方式**を選択（テキストは非選択・非検索のラスター画像になるが、既存のHTML/CSSレイアウトをそのまま流用でき実装が軽量）。html2pdf未ロード時（オフライン等）は従来の`window.print()`にフォールバックする防御的実装とした。
- **対応**：
  - `kotennavi-p5-15.html`：モーダル上部説明文から「個展なびの名称・登録番号ではなく、」を削除。下部説明文を「適格請求書発行事業者登録番号の記載有無は、出品者によって異なります。」に全面差し替え。発行者`<dd>`の「（出品者）」を削除。
  - 宛名を`<span id="p515InvoiceToName">`から`<input id="p515InvoiceToName">`へ変更し、新規「但し書き」入力行（`<input id="p515InvoiceNote">`）をシートに追加。配送先フォームの氏名から自動転記していたロジック（追補63で追加した`#p515DeliveryName`参照）は撤去し、フォーム側の`id`属性も削除。
  - `openInvoiceModal()`で宛名・但し書きの入力欄を毎回初期化。「PDFをダウンロード」クリック時、宛名未入力ならフォーカス＋トーストで入力を促し中断。html2pdf.jsで`#p515InvoiceSheet`をPDF化し`.save()`で自動ダウンロード（ファイル名に入力された宛名を含める）。
  - `kotennavi-common.css`：`.p515-invoice-sheet__to-name`を`.p515-invoice-sheet__to-input`（input用・下線のみ）に置き換え、`.p515-invoice-sheet__note`系クラスを新規追加。
  - JS構文チェック（`new Function()`・script4件、うちCDN読込1件は空・異常なし）、div開閉タグ数一致（422/422）、common.css波括弧対応（7166/7166）を確認。
- **保留事項**：html2pdf.js方式はラスター画像PDFのため、テキスト選択・検索・スクリーンリーダー対応はできない。本番のReact CSR/Drupal化時には、サーバーサイドでのPDF生成（日本語フォント埋め込み済みのベクターPDF）へ置き換えることを推奨。
- **影響ファイル**：`kotennavi-p5-15.html`（領収書モーダルのHTML/JS変更、CDNスクリプト追加、配送先フォームの`id`属性削除）、`kotennavi-common.css`（`.p515-invoice-sheet__to-input`／`__note`系クラスの追加・置き換え）。


### 2026-07-30 追補(65)（p5-15領収書：モーダル下部に宛名・但し書きの入力案内、および紙の領収書は自己印刷・郵送非対応の案内を追加）

- **経緯**：追補(64)で領収書シート内に宛名・但し書きの入力欄（都度入力方式）を新設したが、モーダルの説明文にはそれが「購入者自身が記入する欄である」ことの案内がなかった。またPDFの自動ダウンロード機能（追補64）を実装済みだが、紙の領収書そのものを個展なびが郵送するかどうかの方針が未記載だった。ユーザーより「モーダル下部のテキストに宛名やただしがきを入力の説明と、紙の領収書が必要の場合、お客様にて印刷のうえ保管という文言を追加してください。つまり紙の領収書の郵送などは対応しないことを意味する。」と指示。
- **判断（紙の領収書は個展なびが郵送しない方針を明文化）**：ユーザーの指示は単なる文言追加ではなく、「紙の領収書が必要な場合はお客様にて印刷のうえ保管」という表現によって**個展なびは物理的な紙の領収書を郵送・発送する対応をしない**という運用方針を確定させるものと解釈した。PDF自動ダウンロード機能（追補64）はブラウザ上でのファイル取得までを担い、印刷・保管は利用者側の行為として明確に切り分ける。この方針は購入者・出品者どちらにも今後の問い合わせ対応（「紙で郵送してほしい」等）の根拠として使える。
- **判断（宛名・但し書き入力案内は登録番号案内より前に配置）**：モーダル下部の説明文3行は、①宛名・但し書きの入力案内（新規）→②登録番号の記載有無は出品者による（追補64で確定済みの既存文言）→③紙の領収書の自己印刷・保管案内（新規）の順に配置。①は領収書シート内の入力欄の直下の操作説明にあたるため最初に置き、②は発行者側の属性説明、③は発行後の取り扱い説明という時系列（入力→内容→発行後）に沿った並びにした。
- **対応**：
  - `kotennavi-p5-15.html` `#p515InvoiceModal`の`.p515-modal__body`末尾、説明文（`.p515-modal__desc`）を1行から3行に拡張：
    1. 「宛名・但し書きは領収書内の入力欄に直接ご記入ください。」（新規）
    2. 「適格請求書発行事業者登録番号の記載有無は、出品者によって異なります。」（既存・追補64のまま変更なし）
    3. 「紙の領収書が必要な場合は、お客様にて印刷のうえ保管してください（紙の領収書の郵送は行っておりません）。」（新規）
  - JS・CSSの構造変更はなし（`<p>`タグの追加のみ）。JS構文チェック（インラインscript・異常なし）、div開閉タグ数一致（422/422、追補64から変化なし）を確認。common.cssは今回変更なし。
- **保留事項**：なし。
- **影響ファイル**：`kotennavi-p5-15.html`（`#p515InvoiceModal`下部説明文のみ・HTML変更のみ）。

### 2026-07-30 追補(66)（p5-15領収書PDF：html2canvasのキャプチャ範囲がA4幅より広くなる不具合を修正）※この修正は不完全だったため追補(67)で訂正・上書き済み

> **【追補(67)による訂正】** 本追補が適用した修正（`sheet.getBoundingClientRect()`基準の`x:0,y:0,width,height`指定）はheadless検証では正常に見えたが、実際のダウンロードでは内容が右にずれ数量・単価・金額列が欠落する別の崩れ方をしていたことがユーザー提供のスクリーンショットから判明した。真因はhtml2pdf.js内部の`toContainer()`がページ印刷可能幅に強制リサイズした別コンテナへ複製してからhtml2canvasへ渡す仕様にあり、本追補の対応はその複製後コンテナの実座標と整合していなかった。詳細な真因・正しい修正は下記追補(67)を参照。以下は経緯記録として残す。

- **経緯**：追補(64)のhtml2pdf.js導入直後、ユーザーより「PDFを確認したら、A4サイズより横が大きい」と報告。
- **原因調査（headless Chromiumによる実機再現）**：静的コード読解だけでは原因を特定できなかったため、Puppeteer（headless Chromium）を一時的にインストールし、実際にp5-15をロード→`setDemoState('done')`→領収書モーダルを開く→PDFダウンロードボタンをクリックする一連の操作を自動実行して原因を切り分けた。
  - jsPDF側のページオブジェクト（`pdf.internal.pageSize`）は常に210mm×297mm（正しいA4）を返しており、**PDFの「物理ページサイズ」自体はA4のまま変わっていなかった**。
  - 一方、html2canvasが生成する`canvas`の実際のサイズをログ・直接取得して調べたところ、対象要素`#p515InvoiceSheet`の実測幅（`getBoundingClientRect().width`＝約440px）に対し、html2canvasは719〜794px幅（モーダル・オーバーレイの外側まで含む広い範囲）を切り出していた。**html2canvasは`.from(element)`で対象要素を指定しても、内部でページ全体を仮想windowとしてクローンしてから対象要素の座標でクロップする実装で、対象が`position:fixed`のモーダルオーバーレイ配下にあると、このクロップ計算が要素本来の幅より広い範囲を返す**ことを、`sheet`をモーダルの外（`document.body`直下）へ複製して切り出しても同じ719px幅になる、明示的に`x:0,y:0,width,height`を指定すると要素実寸どおり440pxになる、という3パターンの比較実験で確認した。
  - 結論：**「PDFページがA4より大きい」という症状の実体は、ページの物理サイズではなく、html2canvasが領収書シート本体より広い範囲（モーダル余白を含む領域）を画像として取り込み、それをA4いっぱいに引き伸ばして配置していたため、内容が横に間延びして見えていた**というもの。
- **判断（html2canvasのオプションで対象要素の実寸を明示指定）**：html2canvas呼び出し時に`x:0, y:0, scrollX:0, scrollY:0, width:<要素の実測幅>, height:<要素の実測高さ>`を明示的に渡すことで、対象要素自身の座標系でクロップが行われ、モーダルの外側の余白を含まない正しい範囲だけがキャプチャされる。要素の実測値は`sheet.getBoundingClientRect()`をPDF生成の都度取得する（固定値をハードコードしない＝画面幅やモーダルの表示状態が変わっても追従する）。
- **対応**：
  - `kotennavi-p5-15.html`：PDFダウンロードのクリックハンドラ内で`sheetRect = sheet.getBoundingClientRect()`を取得し、`html2canvas`オプションに`x:0, y:0, scrollX:0, scrollY:0, width:Math.ceil(sheetRect.width), height:Math.ceil(sheetRect.height)`を追加。他のオプション（`scale:2`・`backgroundColor`・`jsPDF format:a4`等）は追補64のまま変更なし。
- **検証**：Puppeteer（headless Chromium）で修正後の実際のクリック操作からPDFダウンロード完了までを通し、生成された`.pdf`ファイルのバイナリから`/MediaBox`を直接読み取り、210.0mm×297.0mm（A4）・1ページで出力されることを確認した。検証に使用したPuppeteer一式は本番コードに影響しない一時ディレクトリ（`/tmp/pptr`）にインストールし、検証後に削除済み（プロジェクトへの依存追加なし）。
- **保留事項**：なし。
- **影響ファイル**：`kotennavi-p5-15.html`（PDFダウンロードハンドラの`html2canvas`オプションのみ変更）。

### 2026-07-30 追補(67)（p5-15領収書PDF：追補(66)の修正は不完全と判明。html2pdf.js内部コンテナの強制リサイズ＋opacity:0継承が真因と特定し修正）

- **経緯**：追補(66)適用後、ユーザーから実際にダウンロードしたPDFのスクリーンショットが共有された。症状は「A4より横が大きい」ではなく、**内容が右にずれ左側に大きな空白があり、宛名が「上」の一文字だけしか表示されず、数量・単価・金額の3列が丸ごと欠落している**という、追補(66)のheadless検証では再現されていなかった崩れ方だった。追補(66)の修正・検証は不十分だったと判断し再調査した。
- **原因調査（html2pdf.jsのソースを直接読解）**：`https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.2/dist/html2pdf.js`（非圧縮版）を取得し`Worker.prototype.toContainer`を確認した。html2pdf.jsは`.from(element)`で渡された要素をそのままhtml2canvasへ渡すのではなく、**`cloneNode`で複製した上で、`position:fixed; opacity:0`の`overlay`div（フルビューポート）配下に、CSS `width`をPDFページの印刷可能幅（A4・margin10mmなら約190mm≒718〜719px）へ強制指定した新しい`container`divへ格納してから`toCanvas()`でhtml2canvasに渡す**という内部実装だった。加えて`container`は`position:absolute; left:0; right:0; margin:auto`という「幅固定＋auto margin」のCSS中央寄せが適用されており、**実際のx座標はビューポート幅に依存して変動する**（検証環境・1280px幅で`x≈280.9375px`と実測）。
  - **(a) 追補(66)の修正が不十分だった理由**：追補(66)は`sheet.getBoundingClientRect()`（＝モーダル内での元要素の実寸・約440px幅、x座標はモーダル内の位置）を基準に`x,y,width,height`をhtml2canvasへ渡していた。しかし実際にhtml2canvasが描画するのはこの元要素ではなく、html2pdf.jsが複製・強制リサイズした別の`container`（718px幅・x≈281px）である。**元要素の座標系とcontainerの座標系は別物**であり、`x:0`を指定すると「containerの左端から440px分」ではなく「ビューポート原点から440px分」を切り出すことになり、containerの実際の位置（x≈281px〜）とはズレた領域（containerの左端より手前＝空白、右側の内容が欠落）を切り出していた。これがユーザー報告の「内容が右にずれ列が欠落」という症状と一致する（自前のheadless再現でも同一症状を再現し確認済み）。
  - **(b) 「x/y/width/heightを一切指定しない」に戻すとどうなるか**：html2canvasの既定動作（座標省略時）は「ページ全体（＝`document`全体）を複製してから対象要素の位置でクロップする」方式であることも確認した。この複製処理は、containerの祖先である`overlay`の`opacity:0`という祖先スタイルをそのまま複製先にも反映してしまうため、**クロップ結果が完全に真っ白（透明）になる**ことをテストで確認した（`onclone`コールバックで複製後に`opacity`を上書きする対策も試したが改善せず）。
  - **結論**：正しい修正は「元要素（sheet）の座標」でも「省略（既定動作）」でもなく、**html2pdf.jsが実際に生成した`container`要素自身の、実際の座標・実寸**をhtml2canvasへ明示的に渡すことだった。
- **判断（`worker.toContainer()`を先に手動実行し、実測したcontainerの座標を使う）**：html2pdf.jsの`Worker`は`.toContainer()`→`.toCanvas()`→`.toImg()`→`.toPdf()`という内部メソッドチェーンを`.save()`が自動的に順に呼び出す設計だが、各メソッドはpromiseチェーンの途中で個別に呼び出すこともできる。**`.save()`を直接呼ばず、まず`worker.toContainer()`だけを実行してcontainer生成を完了させ、その後`worker.prop.container.getBoundingClientRect()`で実際の座標・実寸を取得し、それを`worker.opt.html2canvas`の`x,y,scrollX:0,scrollY:0,width,height`へ設定してから`worker.save()`を呼ぶ**という手順に変更した。この方式なら、containerの強制幅がビューポート幅やページ側CSSの変更で将来変わったとしても、常に「実際に生成されたcontainerの実測値」を使うため座標系のズレが起こらない。
- **判断（catch時のoverlay残留対策を追加）**：`toContainer()`を手動で先行実行する方式に変更したことで、途中で例外が発生した場合に`overlay`/`container`がDOMに取り残される可能性を考慮し、`catch`ハンドラで`.html2pdf__overlay`要素を明示的に検索・削除するフォールバック処理を追加した（従来の`window.print()`フォールバックへ進む前にDOMを掃除する）。
- **対応**：
  - `kotennavi-p5-15.html`：PDFダウンロードのクリックハンドラを、`html2pdf().set({...}).from(sheet)`でWorkerを生成した後、`worker.toContainer().then(function(){ var rect = worker.prop.container.getBoundingClientRect(); worker.opt.html2canvas = Object.assign({}, worker.opt.html2canvas, { scale:2, backgroundColor:'#ffffff', x:rect.x, y:rect.y, scrollX:0, scrollY:0, width:Math.ceil(rect.width), height:Math.ceil(rect.height) }); return worker.save(); })`という流れに変更（追補(66)の「sheet自身の440px基準」指定は廃止）。catch時に`.html2pdf__overlay`要素が残っていれば削除するフォールバックを追加。
- **検証**：Puppeteer（headless Chromium・一時ディレクトリへインストール、検証後に完全削除・プロジェクトへの依存追加なし）で、実際のボタンクリック→ダウンロード完了までを通しで実行し、①短い宛名「テスト太郎」、②長い宛名「株式会社アートコレクション事業部・購買担当」の両方でPDFをスクリーンショット確認。宛名・但し書き・ご購入日・金額・発行日・発行者・登録番号・ご購入明細テーブル（数量・単価・金額の3列含む）が欠落なく正しい位置・幅で表示されることを確認した。生成PDFの`/MediaBox`を直接読み取り210.0mm×297.0mm（A4・1ページ）であることも確認。長い宛名でもレイアウト崩れ（列の折り返し失敗等）が発生しないことも確認した。
- **保留事項**：なし。html2canvasベースのラスター画像PDFという方式自体（テキスト非選択・非検索）は追補(64)で明記した既知の制約のまま変更なし。
- **影響ファイル**：`kotennavi-p5-15.html`（PDFダウンロードハンドラのみ変更。CSS変更なし）。

### 2026-07-30 追補(68)（p5-15領収書PDF：追補(67)適用後も右端・下端の罫線がわずかに欠ける不具合を修正。html2canvasのx/y端数丸めが原因）

- **経緯**：追補(67)適用後、宛名・明細列の欠落は解消したが、ユーザーから新たなスクリーンショットで「右側が少し入り切れていない感じ、右の枠線が切れている」と報告された。
- **原因調査**：Puppeteerで`worker.toContainer()`後の実際のcontainer座標を再測定したところ、`x≈280.9375px, width≈718.109375px`のようにいずれも小数値であることを確認した。追補(67)のコードは`x: rect.x`（小数のまま）・`width: Math.ceil(rect.width)`（整数化）としてhtml2canvasへ渡していたが、この状態でcanvasを直接画像出力して確認したところ、**領収書ボックスの右端・下端の1px罫線が実際に描画されずに欠けていた**ことを確認した。単純な座標計算では`x+width`は元のcontainerの右端をわずかに超えるはずだが、html2canvas内部でx/yなどの端数（小数）座標を扱う際の丸め処理により、実際のキャプチャ領域が数px不足する形になっていたと判明。width/heightにバッファを加えて再検証したところ、**+4pxでは依然罫線が欠けたままだったが、+8px以上を加えると罫線が完全に描画される**ことを実験的に確認した（html2canvas側の正確な丸めアルゴリズムまでは特定していないが、実測ベースで再現・解消を確認済み）。
- **判断（x/yは変更せず、width/heightにのみ安全マージンを付加）**：x/yをMath.floorする、あるいはcontainer.right/bottomを別途ceilして計算する等の代替案も検討したが、今回問題が発生していたのは右端・下端のみで左端・上端は正しく描画されていたため、**最小限の変更で確実に直る方法として、width/heightにのみ固定の安全マージン（実験で確認した+8pxに余裕を持たせた+12px）を加える**方式を採用した。html2canvasのbackgroundColorオプションは白（`#ffffff`）に設定済みのため、マージン分の余白が数px増えてもPDF出力上で不自然な見た目（グレーの余白や透明部分等）にはならない。
- **対応**：
  - `kotennavi-p5-15.html`：`worker.opt.html2canvas`の`width`/`height`を、`Math.ceil(rect.width)`/`Math.ceil(rect.height)`から`Math.ceil(rect.width) + 12`/`Math.ceil(rect.height) + 12`に変更。`x`/`y`は`rect.x`/`rect.y`のまま変更なし。
- **検証**：Puppeteerで①短い宛名「テスト太郎」、②長い宛名「株式会社アートコレクション事業部・購買担当」の両方について、ボタンクリック→ダウンロード→PDFスクリーンショットの一連を再実行し、領収書ボックスの右端・下端の罫線が完全に表示され、内容の欠落・ズレがないことを確認。`/MediaBox`も210.0mm×297.0mm（A4・1ページ）のまま変化がないことを確認した。検証に使用したPuppeteer一式は今回も一時ディレクトリへインストールし、検証後に完全削除済み（プロジェクトへの依存追加なし）。
- **保留事項**：なし。
- **影響ファイル**：`kotennavi-p5-15.html`（PDFダウンロードハンドラの`width`/`height`のみ変更）。

### 2026-07-30 追補(69)（p5-15領収書PDF：長い宛名・但し書きがPDF上で途中まで切れる不具合を修正。`<input>`は折り返し不可でhtml2canvasが見た目のまま切り取るのが原因）

- **経緯**：追補(68)適用後、罫線欠けの報告は解消したが、ユーザーから改めて「長い宛名は切れてしまうのを修正できますか？」と報告された。
- **原因調査**：宛名欄（`#p515InvoiceToName`）・但し書き欄（`#p515InvoiceNote`）はいずれも`<input>`要素で、CSS上は`flex:1;min-width:0`で幅は伸縮するが、`<input>`は本質的に単一行しか表示できず折り返し（wrap）ができない。値が表示幅を超えると、ブラウザは超過分をスクロールして隠すだけで、画面上には見えない状態になる。html2canvasはDOMを**見えている状態のまま**ラスター画像化するため、この「見えない超過分」はPDF上でも同様に欠落する。CSSの`min-width:0`は「入力欄自体は縮められる」ことを保証するだけで、値のテキストが折り返されるわけではないため、今回の症状には無関係だった。
- **判断（`<input>`をhtml2pdf複製コンテナ内でのみ折り返し可能な`<span>`へ差し替え）**：`<input>`のCSSに`white-space`等を指定しても値のテキストは折り返されない（フォーム部品の仕様上の制約）。一方、`value`と同じ文字列を持つ`<span>`（非フォーム要素）であれば`white-space:normal;overflow-wrap:anywhere;word-break:break-word`で自由に折り返せる。ただし置き換えを**元のモーダル（編集中の入力欄）に対して行うと、入力操作ができなくなってしまう**ため、`worker.toContainer()`が生成する**html2pdf内部の複製コンテナ（画面に表示されない・キャプチャ専用）**に対してのみ置き換えを行う方式を採用した。複製コンテナは`toContainer()`完了後は独立したDOMであり、ここでの変更は編集中のライブなモーダルに一切影響しない。
- **対応**：
  - `kotennavi-p5-15.html`：`worker.toContainer().then(...)`内、`rect`を測定する前に、複製コンテナ（`worker.prop.container`）内の`#p515InvoiceToName`・`#p515InvoiceNote`を`container.querySelector('#' + id)`で取得し、それぞれ同じ`class`を持つ`<span>`（`textContent`に`input.value`を設定、インラインスタイルで`white-space:normal;overflow-wrap:anywhere;word-break:break-word`を付与）で`replaceWith`する処理を追加した。この置き換え後に`getBoundingClientRect()`で座標・実寸を測定するため、折り返して縦に伸びた分の高さも正しくキャプチャ範囲に反映される。
- **検証**：JS構文チェック（該当インラインscriptを`new Function()`で評価・エラーなし）、HTML内div開閉タグ数の一致（422/422）を確認。**今回はPuppeteerによる実ダウンロード・スクリーンショットでの目視検証は実施していない**（直前にユーザーへ確認せず自動検証を進めようとした際にツール呼び出しが拒否されたため、本ラウンドはコード変更のみ行い、ブラウザでの最終確認はユーザー自身に委ねる方針に切り替えた）。
- **保留事項**：なし。ユーザーがブラウザ上で実際の画面操作を行い、長い宛名・但し書きが正しく折り返して全文表示されることを確認済み（2026-07-30）。
- **影響ファイル**：`kotennavi-p5-15.html`（PDFダウンロードハンドラ内、`toContainer()`後の複製コンテナに対する`<input>`→`<span>`差し替え処理を追加）。

### 2026-07-30 追補(70)（p5-15 QA「領収書の発行」の回答から個人情報消去に関する注記文を削除。宛名を購入者が都度入力する方式になったため不要と判断）

- **経緯**：宛名・但し書きを購入者が領収書内の入力欄へ都度入力する方式（追補67以降）に変更済みであることを踏まえ、ユーザーから「p5-15のQA領収書の発行の『なお、取引完了から～』以降の文書を消してください、宛名を入れることにしたので、この文は必要なくなりました」と削除依頼があった。
- **対応**：`kotennavi-common.js`のQAデータ配列内、`id:'TXN-B09'`（`cat:'liaison-txn', side:'buyer'`・設問「取引完了後、領収書の発行や購入管理はいつまでできますか？」）の回答文末尾から、「なお、取引完了から1週間後に配送先住所などの個人情報はワークスペースから消去され、取引メッセージは取引完了から2週間後に非公開になります（削除はされず、取引の記録として保存されます）。領収書・取引明細はこれらの対象外で、消去後も購入管理からいつでも発行・確認できます。」を削除した。
- **影響範囲**：このQAデータは`KTN.renderQA({category:'liaison-txn', side:'buyer', ...})`経由で取引ワークスペース（p5-15）・購入管理（p5-14）・購入者ハブ（p70-11）の3ページが共通描画するため、いずれも同時に反映される（個別ページのHTML修正は不要）。
- **保留事項**：なし。配送先住所・取引メッセージの消去タイミング自体の仕様（取引完了1週間後／2週間後）は変更していない。出品者向け同等のQA（`TXN-S13`）は今回の削除対象外（出品者側の文言に「宛名」の概念は関係しないため）。
- **影響ファイル**：`kotennavi-common.js`（QAデータ`TXN-B09`の回答文のみ変更）。

### 2026-07-30 追補(71)（LIAISON+精算スケジュールを「月次・翌月末払い」から「月末締め・翌月20日払い」へ変更。出品者の支払サイト短縮と、金融機関休業日の翌営業日繰り下げルールをStripe実挙動に合わせて明文化）

- **経緯**：ユーザーより「商品・発送トラブルやクレジットカードの不正利用などを考慮して、支払は締め日を設けて一定期間後に振込というスケジュール管理がいいか」と相談があり、既存仕様（月次・翌月末払い＝締めと振込が同日で約1〜2ヶ月のラグ）を踏まえて回答。続けてユーザーから「月末締めの20日払いに変更したい。出品者は個人が多いのでなるべく支払サイトを短くしたい。月末は年末など金融機関の休業日に当たることがあるため、20日払いでもStripeのpayoutは休業日なら翌営業日になるはずなので、サイト内の説明もそれに準じた内容にしたい」と明確な決定があった。
- **決定内容**：
  - **締め日＝月末／振込日＝翌月20日**（旧＝締めと振込を同日の月末とし実質的な振込ラグが約1〜2ヶ月あった設計から短縮）。
  - **20日が土日祝日など金融機関休業日にあたる場合は翌営業日に繰り下げ**（Stripe Connectのpayoutスケジューリングが休業日を自動で翌営業日へ繰り下げる実際の挙動に準拠した説明とし、UI上の記載を実運用と一致させる）。
  - 精算下限額（¥1,000〜¥100,000・出品者が任意設定）に満たない場合は翌月以降へ繰り越し（期限なし）というメカニクス自体は変更なし。
- **理由メモ（コードに残らない判断）**：出品者の大半が個人であるため、資金拘束期間（支払サイト）を短くする方がユーザー便益が大きいと判断。一方で紛争吸収バッファ（商品未着・発送トラブル・カード不正利用の異議申立て対応猶予）は、締め日を早めるのではなく既存の取引状態フロー（`docs/transaction-states.md`＝取引は「受取確認→完了確認」を経てはじめて精算対象になる）側で確保する設計とし、精算スケジュール短縮とは独立して安全性を担保する。
- **対応（ペアページ両方に反映・`feedback_paired_page_edits.md`の運用どおり）**：
  - `kotennavi-p3-17.html`／`kotennavi-p4-17.html`：ヘッド説明文・精算設定`.p114-privacy-note`・精算下限額ヘルプ文・「次回精算予定日」デモ値（2026年8月20日）を新スケジュールに更新。精算履歴テーブル（`.p315-archive-table`）に「締め日」列を新設し、既存「精算日」列は「振込日」へ改称。デモ行の日付を新スケジュールの実例（締め日＝月末／振込日＝翌月20日）に更新。
  - `kotennavi-common.js`（`KTN.QA`・`liaison-settlement`カテゴリ＝p3-17/p4-17共通描画）：`SET-01`（精算はいつ行われますか）・`SET-02`（精算下限額とは）の回答文を新スケジュールへ書き換え、新規`SET-09`（振込日が金融機関休業日の場合の扱い）を追加。
  - `kotennavi-p70-7.html`：振込タイミングFAQの回答（旧プレースホルダー「詳細はサービス開始時にご案内します」）を具体スケジュールに置換。
  - `kotennavi-p70-2.html`：サービス利用料計算例の末尾（売上振込に関する記述）を新スケジュールに更新。
  - `CLAUDE.md`「LIAISON+ サービス利用料」節の振込行、`docs/06_リエゾン_サービス仕様書.md`第16章（決済フロー図＋新設「精算スケジュール」節）、`docs/08_Stripe_Connectアカウント比較.md`（2箇所）を正本として更新。
- **据え置き（意図的に変更しなかった箇所）**：`kotennavi-p11-4.html`・`kotennavi-p70-12.html`・`kotennavi-p70.html`は「あらかじめ定められた振込日に」という汎用表現のまま据え置き。これらは既存の設計方針（概要ページは詳細を重複させず精算専用ページ（p3-17/p4-17）とそのFAQ〔SET-*〕へ委譲する。詳細は追補群の`LAP-08`関連の判断を参照）に従う。
- **保留事項**：ブラウザでの目視確認は未実施（テキスト・HTML構造の変更のみでJSロジック変更なし）。
- **影響ファイル**：`kotennavi-p3-17.html` / `kotennavi-p4-17.html` / `kotennavi-common.js` / `kotennavi-p70-7.html` / `kotennavi-p70-2.html` / `CLAUDE.md` / `docs/06_リエゾン_サービス仕様書.md` / `docs/08_Stripe_Connectアカウント比較.md`。

### 2026-07-30 追補(72)（p3-17/p4-17：追補(71)反映後にユーザーが実ページをレビューし発見した5件のUX不備を修正＝残高表示の誤解防止・精算設定と振込先口座の統合・売上明細PDF導線の追加）

- **経緯**：追補(71)で精算スケジュールの文言を新方式（月末締め・翌月20日払い）へ更新した直後、ユーザーが`kotennavi-p3-17.html`の実ページを確認し、以下5点の具体的な問題を指摘した。
  1. リード文（`.ktn-mgmt-head__desc`）の「精算下限額・振込手数料についてはこのページで設定します」は誤り＝振込手数料は出品者が設定する項目ではなく固定・自動控除のため。
  2. 「現在の残高」という表現は誤解を生む＝実際に表示している数字は**前月末締めで確定済みの残高**であり、当月進行中の取引の代金は含まれない（次々回以降の振込対象）。この区別がUI上明示されていなかった。
  3. 精算下限額未満（繰越）状態のデモで「―」を表示していた対象が「次回精算予定日」だった＝誤り。振込が発生しないのは**振込金額**であり、予定日自体（次回の締め日から機械的に決まる日）は下限未達でも変わらず存在する。「精算」という語も「振込」に統一した方が分かりやすいとの指摘。
  4. 精算下限額設定（C-3）と振込先口座情報（C-4）が別セクションだったが、いずれも**翌月20日の振込までに設定完了が必要**という共通の締め切り制約を持つため、1セクションにまとめてほしい。
  5. 精算履歴テーブルの「振込完了」行に、その回の売上明細をPDFでダウンロードできる導線がなかった。
- **決定内容・対応**：
  - **①**：ヘッド説明文を「LIAISON+で取引が完了した代金の残高・振込予定・振込先口座を管理します。…精算下限額と振込先口座はこのページで設定できます。」に修正（振込手数料の記述を削除）。
  - **②**：C-2ブロックの見出しを「現在の残高・次回精算予定」→**「未精算残高・次回振込予定」**（英ラベルも`CURRENT BALANCE`→`UNSETTLED BALANCE`）に改称。残高ラベルを「未精算残高（7月末締め・確定分）」とし、直下に「2026年7月31日の月末締めで確定した残高です。8月に完了した取引はこの残高に含まれず、次回（8月末締め）以降の振込対象になります。」という補足文を新設（当月の進行中取引と誤認させないための明示）。
  - **③**：下限未満（繰越）デモ状態で「次回振込予定日」には実日付（2026年8月20日）を表示するよう変更し、代わりに振込金額の説明文を「振込金額：**―**（残高が精算下限額〔¥10,000〕に届いていないため、今回の振込はありません。残高は翌月以降にそのまま繰り越されます。繰り越しに期限はありません。）」という形に書き換え、「―」の対象を予定日から金額へ移動。ラベル文言も「精算」から「振込」primary（見出し・ラベル）へ寄せた（QA文言・課金ロジック上の「精算」という語自体は`docs/06`等の正本文書で維持、UI表示ラベルのみの調整）。
  - **④**：C-3（精算設定）とC-4（振込先口座情報）を1つの`.p211-block`（id=`p317SettingsBlock`/`p417SettingsBlock`）に統合し、ブロック内を新設の共通CSS`.p211-block__subhead`（`kotennavi-common.css`）で「精算下限額」「振込先口座」の2小見出しに区切った。ブロック冒頭の`.p114-privacy-note`末尾に「精算下限額・振込先口座は翌月20日の振込までに設定を完了してください。」という締め切り注記を追加。
    - **p3-17とp4-17でC-4（振込先口座）の実装方式そのものは意図的に不統一のまま維持**：p3-17はStripeホスト画面へのリダイレクト＋マスク表示リビール方式（追補(58)(59)で確定済み）、p4-17は個展なび自前フォーム＋口座名義カナのクライアント側バリデーション（`RESP_KANA`照合）という異なるパターンを最初から持っており、これは意図的な設計差（gallery側の本人確認モデルの違いに由来）。今回の統合はあくまで**外側のセクション構造（見出し・区切り・締め切り注記）の統一**であり、口座情報の入力方式自体はページごとの既存ロジックを変更せずそのまま温存した。
    - JS側：`setStripeConn()`が個別にゲーティングしていた`p317SettingsBlock`/`p317BankBlock`（p3-17）・`p417SettingsBlock`/`p417BankBlock`（p4-17）の2ブロックを、統合後の単一ブロックIDのみを対象とする1行に整理。
  - **⑤**：精算履歴テーブル（`.p315-archive-table`）の「振込完了」バッジの右に、新設の共通CSS`.p315-archive-table__pdf-link`（`kotennavi-common.css`）で「明細PDF」ボタンを追加。`data-payout`属性に対象振込日（例：`2026-07-20`）を持たせ、クリックでトースト表示するデモ実装（実際のPDF生成・実データ連携は後工程）。繰越（下限未達）行にはボタンを付けない（振込が発生していないため明細が存在しない）。
- **理由メモ（コードに残らない判断）**：②③は「締め日と振込日がずれる設計（追補71）」を導入したことで新たに生じた表示上の整合性課題——固定日締めのスケジュールでは「現在」の残高スナップショットが常に「1サイクル前に確定した金額」を指すため、これを明示しないと利用者が「今すぐ売れた分もこの残高に入っている」と誤解しうる。④はUXの都合（設定漏れ防止）だが、根拠は「両方とも同じ締め切り（翌月20日）に間に合わせる必要がある」という運用上の共通性であり、単なる見た目の整理ではない。
- **対応（ペアページ両方に反映・`feedback_paired_page_edits.md`の運用どおり）**：`kotennavi-p3-17.html`・`kotennavi-p4-17.html`ともに5点すべてを同一パターンで反映。p4-17のみ、④で述べたとおりC-4の実装内容（フォームフィールド・バリデーションJS）はそのまま温存。
- **保留事項**：ブラウザでの目視確認は未実施（テキスト・HTML構造変更のみでJSロジックの実質的な変更は最小限）。PDFダウンロードボタンはトースト表示のみのデモで実PDF生成は未実装（後工程で領収書PDF＝追補(64)〜(69)と同様のhtml2pdf.js方式を流用するか、サーバー生成に切り替えるかは未検討）。
- **影響ファイル**：`kotennavi-p3-17.html` / `kotennavi-p4-17.html` / `kotennavi-common.css`（`.p211-block__subhead`・`.p315-archive-table__pdf-link`新設）。
- **React/Drupalへの含意**：`<UnsettledBalanceCard>`は「基準日（締め日）」と「対象外の進行中取引」を常にセットで表示する設計にする。`<SettlementSection>`は「精算下限額」「振込先口座」をサブセクションとして持つが、口座情報の入力UIパターン（Stripeリダイレクト／自前フォーム）はロール・アカウント種別で分岐する余地を残す。精算履歴の各行に紐づくPDF明細は、`payoutId`をキーに後から実データ生成APIへ接続できるようボタンの`data-payout`属性をそのまま識別子として使える設計にしてある。

### 2026-07-30 追補(73)（p3-17：お金に関する重要ページの情報過多を解消するレイアウト整理。5案すべて実施＝p3-17のみ、p4-17は次ラウンド）

- **経緯**：追補(72)の5点修正を報告した直後、ユーザーから「このページのレイアウトもう少し整理しましょう、お金に関する大事なページですので、細かい文字が多すぎて大事なことや本当に操作が必要なところを見落とす懸念がある」との指摘があった。5案を提案し、「p3-17を先にやる、全部やる」の指示で全案を実施。
- **提案・決定内容**：
  1. **Stripe未連携時のみ出す先頭アラートバナー**：既存の`.ktn-txn-alert`（取引期限アラートと同一コンポーネント。p3-16等で使用中）を流用。旧C-2.5（Stripe連携ステータスの独立`.p211-block`カード）を廃止し、未連携時のみ`.ktn-txn-alert`（id=`p317StripeAlert`）を`.p317-wrap`の先頭（`.ktn-mgmt-head`の直後）に表示。警告文＋連携ボタンを内包。
  2. **次回振込予定を主役にしたヒーロー表示＋長文の折りたたみ**：C-2ブロックを「未精算残高・次回振込予定」（2項目並列）から**「次回振込予定」（1項目のヒーロー）**に統合。新設`.p317-hero`（`.p317-hero__amt`＝2.4rem/700の主役数値）で「振込予定額」を主役にし、按分・繰越条件の詳しい説明は`<details class="p317-hero__more">`で折りたたみ（既存の`.p3-1-year-group summary::before{content:'›'}`と同型の軽量回転トグルを踏襲・新規コンポーネントを増やさず既存パターンを再利用）。旧`.p317-balance`（2項目並列レイアウト）は削除せず温存（p4-17がまだ使用中のため）。
  3. **連携済みStripeステータスの格下げ**：連携済み時は`.p317-stripe-status`に新設モディファイア`.p317-stripe-status--mini`（余白圧縮）を付け、カードなしで①のバナーと同じ位置に小表示（id=`p317StripeMini`）。①のバナーと排他表示（`setStripeConn()`が両方をトグル）。
  4. **精算設定・振込先口座のチェックリスト化**：C-3冒頭にあった長文の`.p114-privacy-note`（月末締め・翌月20日払い・振込手数料負担・Stripe経由である旨・締切注記を1段落に詰め込んでいたもの）を廃止し、新設`.p317-setup-checklist`（✓アイコン＋「精算下限額：¥10,000に設定済み」「振込先口座：登録済み（Stripe社で管理）」の2行）＋短い締切注記1文に置換。振込先口座側の`.p114-privacy-note`（Stripe管理・個展なびは保持しない旨）も枠なしの`.p211-help`に格下げ（アクション不要のFYI情報のため）。
  5. **精算履歴・FAQの弱色化**：参照専用（アクション不要）のC-5精算履歴・C-6 FAQに新設モディファイア`.p211-block--quiet`／`.p315-faq--quiet`（枠線を`rgba(0,0,0,.08)`に、見出しを`var(--muted)`/600に弱色化）を付与し、操作系ブロック（C-2ヒーロー・C-3設定）との視覚的な優先度差を明示。
- **理由メモ（コードに残らない判断）**：`.p211-block`は元々「白カード＋ヘアライン枠＋同一の見出しウェイト」で全セクションを均等に扱う設計（管理ページ共通パターン）だが、本ページのように「今すぐ確認すべき数字（次回振込予定）」「今月中に完了すべき設定（精算下限額・振込先口座）」「参照するだけでよい情報（履歴・FAQ）」が同じページに混在する場合、均等な視覚的重みづけ自体が「重要度の見分けがつかない」というUX上の欠陥になる。今回の対応は個別ページのCSSを増やす形ではなく、`.p211-block`の**モディファイア**（`--quiet`）と、既存の別コンポーネント（`.ktn-txn-alert`／年グループ折りたたみパターン）の**転用**で解決しており、新規の一点物コンポーネントは`.p317-hero`・`.p317-setup-checklist`の2つのみ（いずれもp3-17/p4-17専用の`p317-`/`p417-`ネームスペースの延長）。
- **対応（p3-17のみ・p4-17は未反映）**：`kotennavi-p3-17.html`に5案すべてを実装。**p4-17は次ラウンドへ持ち越し**（`feedback_paired_page_edits.md`の通常運用＝両ページ同時反映から意図的に外れる。理由：ユーザーが明示的に「p3-17を先にやる」と順序を指定したため）。p4-17へ移植する際は、④のチェックリスト化・②のヒーロー化は外側のセクション構造のみに適用し、p4-17固有の口座直接入力フォーム＋カナ名義バリデーションJS（追補(72)で温存を確認済み）を崩さないよう注意。
- **保留事項**：p4-17未反映。ブラウザでの目視確認は未実施（HTML/CSS構造変更のみでJSロジックの実質的な変更は`setStripeConn()`のDOM参照先変更のみ）。
- **影響ファイル**：`kotennavi-p3-17.html` / `kotennavi-common.css`（`.p317-hero*`・`.p317-stripe-status--mini`・`.p317-setup-checklist*`・`.p211-block--quiet`・`.p315-faq--quiet`新設）。

### 2026-07-30 追補(74)（p3-17：追補(73)レビュー後の微調整2点＋精算履歴PDF方式の見直し相談〔未決定〕）

- **経緯**：追補(73)の5案実施を報告した直後、ユーザーから「すごく良くなった」との評価とともに3点の調整依頼があった。うち2点は直接指示、1点は「相談ですが…した方がいいのでは？」という明示的な相談形式だった。
- **決定内容・対応（直接指示・実施済み）**：
  1. **ヒーロー金額ラベルに精算対象期間を明示**：「振込予定額」を**「振込金額（2026年7月1日〜7月31日売上精算金額）」**に変更（`#p317BalAbove`・`#p317BalBelow`両状態）。「予定額」という曖昧な表現ではなく、その金額がどの期間の売上に対する精算かを日付で明示する方が、複数月の精算が並ぶ運用で誤解が少ないというユーザー判断。
  2. **C-3チェックリストを折りたたみ式`<details>`へ変更**：追補(73)で新設した`.p317-setup-checklist`（静的な✓行のみ・アクションはブロック全体で共通）を、各項目（✓精算下限額／✓振込先口座）自体が`<details class="p317-setup-checklist__item">`として独立し、`<summary>`（アイコン＋状態テキスト＋`›`回転シェブロン）をクリックすると`.p317-setup-checklist__panel`内の編集UI（下限額セレクト＋保存ボタン／口座情報リビール＋変更ボタン）が展開される構造に変更。デフォルトは折りたたみ。「設定済みの項目を毎回全文表示する必要はなく、変更したい時だけ開けばよい」という考えで、追補(73)より一段階省スペース化が進んだ形。JSのDOM ID構造（`#p317Threshold`・`#p317SaveSettings`・`#p317BankUnrevealed`等）は変更していないため既存ロジックへの影響はない。
- **相談中（未決定・実装保留）**：
  3. C-5精算履歴テーブルの「明細PDF」ダウンロードボタン（`.p315-archive-table__pdf-link`・追補(72)でトースト表示のみのデモとして新設）について、ユーザーから「PDFでなくてもいいような気がする、明細内訳を表示して印刷ができるようにした方がいいのでは」との相談。回答として、PDF生成は後工程での実装コスト（サーバー生成 or html2pdf.js等のクライアント生成）が発生する一方、インライン展開＋ブラウザ印刷（`window.print()`）なら明細データをその場のDOMで表示するだけで済み、実装がシンプルという旨を提示。**ユーザーの最終判断待ちで実装は未着手**。
- **保留事項**：上記3点目が未決定のため、`kotennavi-p3-17.html`のC-5セクション・`.p315-archive-table__pdf-link`関連JSは追補(72)時点のまま変更していない。ブラウザでの目視確認は未実施。**p4-17への反映もまだ**（追補(73)から持ち越し・p3-17で全調整が確定してからまとめて移植する方針）。
- **影響ファイル**：`kotennavi-p3-17.html` / `kotennavi-common.css`（`.p317-setup-checklist*`をdetails構造へ全面改修）。

### 2026-07-30 追補(75)（p3-17：追補(74)の直後、ユーザーより2点の追加指示。C-3を明示ボタン式に再変更＋C-5「明細を見る」モーダル実装）

- **経緯**：追補(74)の報告直後、ユーザーから2点の指示。「2. については設定変更ボタンで開くようにしてください」「3. 進めて下さい」。
- **決定内容・対応**：
  1. **C-3チェックリストを`<details>`の行クリックから「設定変更」ボタンクリック方式へ再変更**：追補(74)で採用した`<details><summary>`（行全体がクリック対象）は、ユーザーからは「どこがクリックできるか分かりにくい」という趣旨で、行右端に明示的な「設定変更」ボタンを置く方式に差し替え。`.p317-setup-checklist__item`は`<details>`をやめ、静的な`.p317-setup-checklist__row`（アイコン＋状態テキスト＋`.p317-setup-checklist__toggle`ボタン）＋`.p317-setup-checklist__panel`（`hidden`属性で開閉）のペアに変更。ボタンはJSで`hidden`トグル・`aria-expanded`更新・ラベルを「設定変更」⇄「閉じる」で切替。既存の`.p317-gated`（Stripe未連携時のグレーアウト）は`pointer-events:none`のため新ボタンにもそのまま効く。
  2. **C-5「明細PDF」を「明細を見る」モーダルへ実装**：追補(74)で提示したインライン展開＋ブラウザ印刷案をそのまま実装。新規モーダル`#p317PayoutModal`は取引3ページ・p5-15領収書で使われている共有モーダルシェル`.p515-modal-overlay`/`.p515-modal.p515-modal--invoice`をそのまま流用し、中身は`.p515-invoice-sheet`（p5-15領収書と同型の書式付きシート＝見出し・メタ情報・金額・内訳テーブル）で「振込明細」を表示。内訳は税込回収総額（作品代金＋送料＋梱包費）からサービス利用料・振込手数料を差し引いて振込金額に至る構成（CLAUDE.mdのサービス利用料ロジックと整合するデモ数値）。印刷は`body.p317-print-payout`クラス＋`window.print()`（p5-15領収書モーダルのhtml2pdf失敗時フォールバックと同一パターンをcanonical化・新規`@media print`ブロックを`kotennavi-common.css`に追加）。ボタンラベルは「明細PDF」→「**明細を見る**」、クラスは`.p315-archive-table__pdf-link`→`.p315-archive-table__detail-btn`に改称（役割が変わったため）。
- **理由メモ（コードに残らない判断）**：`<details>`方式は追補(73)の「振込予定額ヒーローの折りたたみ」（`.p317-hero__more`）や「年グループの折りたたみ」と同型の軽量パターンとして踏襲したが、C-3の用途（設定値の確認・変更）はC-5の「詳しい説明を読む」用途とは性質が異なり、**「読む」ための折りたたみは行クリックで十分だが、「変更する」ための折りたたみは操作であることが明示されたボタンの方が誤操作・迷いが少ない**、というのが今回の使い分けの軸。同じ折りたたみUIでも「参照系はsummary行クリック」「操作・編集系は明示ボタン」と区別する。C-5は当初PDFダウンロードという実装コスト（サーバー生成 or html2pdf.js）のかかる機能だったが、精算履歴は「参照専用」（追補73で`.p211-block--quiet`化済み）の情報であり、購入者向け領収書ほど恒久的な証憑としての厳密さを求められないため、ブラウザ印刷で足りるというユーザー判断。
- **保留事項**：ブラウザでの目視確認は未実施。**p4-17への反映もまだ**（追補(73)から持ち越し。C-3ボタン式・C-5モーダルとも、p3-17での最終形が固まったので次ラウンドで移植予定）。デモの振込明細データ（2件分）は`kotennavi-p3-17.html`のJSに直書きで、実データ連携は後工程。
- **影響ファイル**：`kotennavi-p3-17.html` / `kotennavi-common.css`（`.p317-setup-checklist*`をボタン式へ再改修／`.p315-archive-table__detail-btn`に改称／`#p317PayoutModal`用`@media print`ブロック新設）。
- **React/Drupalへの含意**：`<SettlementChecklistItem status editUrl>`は「行＋ボタン」を素の構造として持つ（`<details>`の折りたたみ自体を隠喩にしない）。`<PayoutDetailModal payoutId>`はp5-15の`<ReceiptModal>`と共通の`<DocumentSheet>`基盤コンポーネントを共有できる（書式付きシート＋印刷ボタンという構造が同一のため）。

### 2026-07-30 追補(76)（p3-17：ユーザー報告「スマホサイズで精算履歴がほとんど切れている」→ `.p315-archive-table` レスポンシブ実装をカード化に修正。共有クラスのため4ページ横断で修正）

- **経緯**：追補(75)の報告直後、ユーザーから「レスポンシブのスマホサイズで見たら精算履歴がほとんど切れています」と報告。
- **原因**：C-5精算履歴テーブル（`.p315-archive-table`・6〜7列）はモバイルで`overflow-x:auto`＋`min-width:520px`による横スクロールのみで対応していたが、スクロール可能であることの視覚的な手がかりが乏しく、ユーザーからは列の大半が画面外に隠れて「切れている」ように見えていた。
- **決定内容・対応**：`@media(max-width:640px)`内で`.p315-archive-table`を**横スクロール表からカード型の縦積みリストへ再構成**（p2-6作品リスト`.p26-list`の既存レスポンシブパターン＝`display:block`化＋`thead`非表示＋各`tr`をボーダー付きカード化＋各`td`に`data-label`属性の値を`::before`でラベル表示、と同型の構成に統一）。ベースの`min-width:520px`・`overflow-x:auto`は非モバイルのみ有効なまま残置（デスクトップ表示は変更なし）。
- **横展開の理由**：`.p315-archive-table`は**p3-15/p4-15（LIAISON+コンソール「終了した展覧会」アーカイブ＝取引明細テーブル）とp3-17/p4-17（精算履歴テーブル）の計4ページで共有**しているクラス（列構成は各ページで異なるが、共通クラス・共通CSSパターンを使用）。CSS側の修正はcanonical1箇所（`kotennavi-common.css`）で4ページ全てに自動適用されるため、対応する`data-label`属性を4ファイル全てのtdに追加した（p3-15/p4-15は今回のバグ報告の対象外だが、同一クラスのため放置すると同じ問題が再発する。CLAUDE.mdのCSS共通化原則に基づき合わせて修正）。p4-17は列HTML自体は追補75時点で未移行（`.p315-archive-table__pdf-link`のまま）だが、`data-label`属性の追加はモーダル移行と無関係な独立修正のため先行して反映した。
- **保留事項**：ブラウザでの目視確認は未実施。p4-17の「明細PDF」→「明細を見る」モーダル移行自体は引き続き未着手（追補75から持ち越し）。
- **影響ファイル**：`kotennavi-common.css`（`.p315-archive-table`のモバイル`@media`ブロックを横スクロールからカード化へ書き換え）／`kotennavi-p3-17.html`・`kotennavi-p4-17.html`・`kotennavi-p3-15.html`・`kotennavi-p4-15.html`（各tdに`data-label`属性を追加。構造・クラス自体は不変）。
- **React/Drupalへの含意**：`<ArchiveTable columns rows>`のようなテーブルコンポーネントは、モバイルでは自動的にラベル付きカード表示へ切り替わるレスポンシブ挙動を内包すべき（列数が多い金額系テーブルは横スクロールでなくカード化が既定パターン、というのが今回確定した方針。`.p26-list`と合わせて2件目の採用例）。
- **React/Drupalへの含意**：`.p211-block--quiet`は「参照専用セクションの弱色化」という汎用パターンとして他の管理ページ（例：p3-15/p4-15のアーカイブ・FAQ）にも今後展開できる候補。`<SettlementSection>`のReact設計では「アクション必須（設定未完了）」「アクション可能（振込予定確認）」「参照のみ（履歴・FAQ）」の3段階の重要度をコンポーネントのpropsやvariantとして明示的に持たせることを推奨（今回のCSSモディファイアによる対応はその先行実装）。

### 2026-07-31 追補(77)（p3-17：C-5「明細を見る」ボタンをデスクトップで独立列化／p4-17：追補(73)〜(76)の5点レイアウト整理を全面反映・振込先口座アーキテクチャをStripe管理リビール方式へ統一）

- **経緯**：ユーザーより2点の指示。①「デスクトップサイズ時に明細を見るボタンが状態の列ではなくその隣に配置してください」、②「その後、p4-17にこれまでの修正を反映してください」（追補(73)〜(76)でp3-17のみに実施していたレイアウト整理・モーダル化・レスポンシブ修正の一括移植）。
- **決定内容・対応①（`kotennavi-p3-17.html`／`kotennavi-common.css`）**：C-5精算履歴テーブルの`<td data-label="状態">`内に同居していたバッジ＋「明細を見る」ボタンを分離。theadに空`<th></th>`を追加し、全3行を`<td data-label="状態">`（バッジのみ）＋新規`<td>`（ボタンのみ／繰越行は空セル`<td></td>`）に分割。`.p315-archive-table__detail-btn`から`margin-left:8px`を削除し`white-space:nowrap`を追加（バッジと非隣接になったため）。モバイルのカード化（追補76）は`data-label`方式のまま影響なし（空の新規`<th>`はモバイルで非表示のためレイアウト崩れなし）。
- **決定内容・対応②（`kotennavi-p4-17.html`）**：追補(73)〜(76)でp3-17に実施した5点＋対応①の列分割をp4-17へ全面移植。
  - Stripeアラート/ミニ表示（`#p417StripeAlert`/`#p417StripeMini`）・`.p317-hero`次回振込予定ヒーロー・`.p317-setup-checklist`（精算下限額＋振込先口座）・`.p211-block--quiet`/`.p315-faq--quiet`によるC-5/C-6弱色化・`#p417PayoutModal`振込明細モーダル（`P417_PAYOUTS`にギャラリー用デモ数値2件）をHTML/JSともに実装。
  - **アーキテクチャ変更（意図的・重要）**：p4-17は元々「振込先口座を個展なびのフォームで直接入力（`#p417BankName`/`#p417Branch`/`#p417AcctType`/`#p417AcctNum`/`#p417AcctHolder`）＋保存時に口座名義（カナ）をp11-4リエゾンプラス責任者情報とJS照合するバリデーション」という、p3-17（Stripe管理・マスク済みリビール専用）とは異なる独自構造を持っていた。これを**廃止し、p3-17と同一のStripe管理リビール方式に統一**（`.p114-identity-readout`でマスク済み口座情報を表示、変更はStripeの画面へ誘導するのみで個展なびは口座情報を保持しない）。
  - **理由**：Stripe Connect Express（クリエイター個人・ギャラリー法人とも）のオンボーディング時点で本人確認・口座名義確認はStripe側で完結する（`docs/08_Stripe_Connectアカウント比較.md`）ため、個展なび側で口座名義とp11-4責任者情報を照合する独自バリデーションを維持する意味がない。creator/gallery間で本人確認の仕組み自体に差を設けない、という既存方針（CLAUDE.md「ロールと機能申込の前提ルール」）とも整合するため、片方だけ独自ロジックを残さず統一した。
  - JS：`setStripeConn`を`p417StripeAlert`（`.is-on`トグル）/`p417StripeMini`（`hidden`トグル）方式に書き換え。チェックリスト開閉ハンドラ（`.p317-setup-checklist__toggle`）・口座リビールハンドラ（`p417RevealBankBtn`/`p417BankUnrevealed`/`p417BankRevealed`/`p417ChangeBankBtn`）を新規追加。旧・口座名義カナ照合IIFE（`RESP_KANA`＝'スズキ イチロウ'照合ロジック一式）と旧PDFリンクforEach（`.p315-archive-table__pdf-link`）は完全削除。
  - CSS：`kotennavi-common.css`に`body.p417-print-payout`の`@media print`ブロックを新設（`body.p317-print-payout`と同一構造・ID/クラスのみp417へ置換）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p3-17.html`・`kotennavi-p4-17.html`・`kotennavi-common.css`。
- **React/Drupalへの含意**：`<BankAccountPanel>`はcreator/gallery問わずStripe管理リビール専用の単一実装でよく、ロール別に独自の直接入力フォーム＋照合ロジックを分岐させる必要はない（Stripe側の本人確認に一元化）。`<ArchiveTable>`のアクション列（詳細ボタン等）はステータス列と分離した専用列として設計し、ステータスバッジとインラインテキストリンクを同一セルに同居させない（デスクトップ時のクリック領域・視認性のため）。

### 2026-07-31 追補(78)（p3-17/p4-17：C-5テーブルの列間隔調整3ラウンド＋状態列をバッジからプレーンテキストへ変更／次回振込予定ヒーローの金額ラベルを「精算期間」基準から「締め日時点の未精算残高」基準へ再定義し繰越テーブルに精算金額列を新設）

- **経緯**：追補(77)報告後、ユーザーから短いラウンドで段階的に4件の指摘・相談があった。①「振込日や締め日の間隔を調整して状態のバッジが折り返さないようにしてください」、②「明細表示が入り切っていない。もう少しかんかん調整をお願いします。」、③「状態の表示はバッジではなく単なるテキストで良い」、④相談「振込金額の横に精算期間表示をしたが、下限に満たない金額を繰り越した場合、この日付が金額の意味とずれることがある、振込金額や精算金額が正しく表示できるようにする提案をお願いします」→提案を承認の上「精算履歴に精算金額の列を増やしませんか、入りきらない場合トレードオフとして対象取引の列をとる」と追加指示。
- **決定内容①②（列間隔調整・`kotennavi-common.css`のみ、`.p315-archive-table`は共有クラスのためp3-15/p4-15にも影響）**：`.p315-ws-badge`に`white-space:nowrap`を追加。1列目（振込日／作品名）`min-width:130px→110px→100px`、`padding-right:12px→10px`の順に段階短縮。2列目（締め日／価格）`min-width:110px→95px→85px`、左右`padding:12px→10px`の順に段階短縮。th/td共通の基本左右paddingを`20px→16px`に短縮。6列目・最終列（ボタン列）にも左右`10px`基調の専用paddingルールを追加。
- **決定内容③（状態列をバッジ→テキスト・`kotennavi-common.css`＋`kotennavi-p3-17.html`／`kotennavi-p4-17.html`）**：C-5テーブルの状態列マークアップを`.p315-ws-badge`（ピル型バッジ）から素のテキストに変更。「振込完了」のみ新設`.p315-archive-table__status--done`（`color:#006030;font-weight:600`・枠なし）で意味を残し、「繰越（下限未達）」は無装飾。**`.p315-ws-badge`クラス自体は変更・削除していない**（p3-15/p4-15の申込件数サマリバー等で別文脈で使用中のため、変更はC-5テーブル側のHTMLマークアップに限定）。バッジ除去でセルが狭くなったことも②の列間隔問題の緩和に寄与。
- **決定内容④（ヒーローラベルの意味論再定義・提案→承認・`kotennavi-p3-17.html`／`kotennavi-p4-17.html`、CSS変更なし）**：
  - **問題の本質**：従来の`.p317-hero__lbl`は「○月分の振込予定額」のような特定期間ベースの表現だったが、精算下限額（¥10,000）未満の残高は翌月以降に無期限で繰り越されるため、「ある特定の期間の金額」というラベルと「複数月の繰越を合算した残高」という実体が食い違う。
  - **採用した解決**：ラベルを「期間」基準から「**締め日時点の未精算残高**」という時点基準の表現へ変更。`.p317-hero__lbl`を「精算金額（2026年7月31日締め時点の未精算残高）」に統一し、残高が下限以上／未満どちらの状態でも同一ラベルを使う（従来は状態ごとに異なるラベル文言だったのを統一）。
  - **精算金額と振込金額の意味を明確に分離（新設の中核概念）**：**精算金額**＝その締め日時点で確定した未精算残高の総額（繰越分を含む・繰越状態でも必ず値がある）。**振込金額**＝実際に銀行へ振り込まれる純額（精算金額－振込手数料）で、繰越状態では振込が発生しないため値を持たない（「—」）。この2語の切り分けにより「金額はいつでも存在するが、振込が起きるかどうかは別軸」という実体を正しく表現できる。
  - **繰越状態の金額表示を「隠す」から「見せる」へ変更**：`.p317-hero--carry`（下限未満状態）でも金額欄に実際の繰越残高（p3-17：¥4,200／p4-17：¥6,300）を表示するよう変更（従来は「—」表示で金額自体を隠していたのを撤回）。振込対象外であることは既存の`.p317-hero--carry .p317-hero__amt{color:var(--muted)}`（変更なし・元から存在）の色トーンで示す。`.p317-hero__date`の文言も「この金額のまま翌月以降に繰り越されます」等、繰越を前提にした説明へ修正。
- **決定内容④付随（C-5精算履歴テーブルへの精算金額列追加・`kotennavi-p3-17.html`／`kotennavi-p4-17.html`、CSS変更なし＝既存nth-child列ルールで7列構成のまま吸収可能）**：`.p315-archive-table`（C-5）に**精算金額**列を新設し、**対象取引**列を削除（ユーザー指定のトレードオフ）。新しい列順：振込日／締め日／精算金額／振込手数料／振込金額／状態／（明細ボタン）。振込が発生した行は「精算金額＝振込金額＋振込手数料」の関係が成立する（例：p3-17 Row1＝¥152,650＝¥152,400+¥250、p4-17 Row1＝¥239,150＝¥238,900+¥250）。繰越行の精算金額（p3-17：¥3,150／p4-17：¥5,400）は、ヒーローの「現在の締め時点」の繰越デモ値（p3-17：¥4,200／p4-17：¥6,300）とは意図的に別の値にしている（過去の締めサイクルの実績値であり、ヒーローが示す「直近の締め」の値と混同しないようにするため）。`#p317PayoutModal`/`#p417PayoutModal`の明細モーダルとJSデータ（`P317_PAYOUTS`/`P417_PAYOUTS`）は振込金額（純額）ベースのままで変更不要（内訳合計は従来通り振込金額に一致）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p3-17.html`・`kotennavi-p4-17.html`・`kotennavi-common.css`。
- **React/Drupalへの含意**：`<PayoutHero>`の金額ラベルは「対象期間」ではなく「締め日（as-of date）」を軸にしたテキスト生成にする（繰越の有無に関わらず同一の文言テンプレートが成立する設計）。金額データモデルは`settlementAmount`（常に存在・締め時点の残高）と`payoutAmount`（振込発生時のみ存在・null許容）を分離して持つ（今回のUIの精算金額/振込金額はこの2フィールドにそのまま対応する）。`<ArchiveTable>`の列定義に`settlementAmount`を追加し、取引件数（`transactionCount`）は列としては持たず必要なら明細モーダル側の情報として保持する。

### 2026-07-31 追補(79)（p3-17/p4-17：C-5「精算金額」列を「当月精算金額」に改称し、繰越を含まない当月分のみの数値へ訂正。振込日列を当月精算金額列の直後へ移動）

- **経緯**：追補(78)で追加した「精算金額」列について、ユーザーから3点の指摘。①「『精算金額』→『当月精算金額』に変更」、②「振込日列を精算金額列のあとに変更」、③「振込日2026.06.20の精算金額は=98850-3150が正しいのでは？」。
- **決定内容（データモデルの追加区分・重要）**：追補(78)時点の「精算金額」列は実際には「その振込サイクルで振込対象になった総額（＝振込金額＋振込手数料）」であり、前サイクルからの繰越分を含んでいた。今回列名を「**当月精算金額**」（繰越を含まない、その締め月に新たに生じた分のみ）に改称したことで、**「当月精算金額」「繰越取込額（今回は列として出さず暗黙）」「振込対象総額（＝旧・精算金額の定義）」の3値を区別する必要が生じた**。当月精算金額 = 振込対象総額 − 直前サイクルからの繰越取込額。繰越が発生していないサイクル（当月精算金額列と旧・精算金額列の値が一致する）では変更なし。
  - p3-17：2026.06.20行（締め05.31）は直前の04.30締め行（繰越¥3,150）を引き継いでいたため、当月精算金額＝¥98,850−¥3,150＝**¥95,700**に訂正。2026.07.20行（締め06.30）は直前サイクルで繰越が発生していない（05.31締めで全額振込済み）ため当月精算金額＝振込対象総額のまま¥152,650で変更なし。繰越行自体（04.30締め・¥3,150）はこの時点で新規発生した分のみのため変更なし。
  - p4-17：同様に2026.06.20行（締め05.31）を¥146,450−¥5,400＝**¥141,050**に訂正。他行は変更なし。
- **決定内容（列順変更）**：`振込日`列を`当月精算金額`列の直後（3列目）へ移動。新しい列順：締め日／当月精算金額／振込日／振込手数料／振込金額／状態／（明細ボタン）。`data-label`属性（モバイルカード表示用）も新しい列名・列順に合わせて更新。
- **CSS変更なし**：`.p315-archive-table`のnth-child幅ルール（`kotennavi-common.css`）は列の中身が日付文字列⇄通貨文字列に入れ替わっても`min-width`指定のみ（`table-layout:fixed`ではない）で実害がないため据え置き。p3-15/p4-15側の列構成・列順（6列）は今回のp3-17/p4-17列順変更の影響を受けない（別セマンティクスの同一共有クラス）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p3-17.html`・`kotennavi-p4-17.html`（CSS変更なし）。
- **React/Drupalへの含意**：`<ArchiveTable>`の金額データモデルは`carryInAmount`（前サイクルからの繰越取込額・null許容）を持ち、`当月精算金額 = totalSettledAmount - carryInAmount`として表示側で計算するか、API側で`monthlySettlementAmount`として事前計算して返すかのいずれかを後工程で選択する。今回のように「合計値」と「当月純増分」を混同しやすいフィールドは、UIラベルとフィールド名を1対1で対応させ（`当月精算金額`↔`monthlySettlementAmount`）、「繰越を含む総額」を表示する場合は別ラベル（例：ヒーローの`精算金額`＝as-of残高）と明確に区別する。

### 2026-07-31 追補(80)（p3-17/p4-17：C-5精算履歴テーブルの列を「精算」（締め日・当月精算金額）と「振込」（振込日・振込手数料・振込金額）の2グループに視覚的に分離。2段ヘッダー＋縦罫線を新設モディファイア`.p315-archive-table--grouped`で実装）

- **経緯**：追補(79)報告後、ユーザーから「締め日・当月精算金額と振込日・振込手数料・振込金額がそれぞれグルーピング表示できますか」と指摘。7列がフラットに並ぶと「締め時点で確定する金額（精算）」と「実際に銀行へ振り込まれる金額（振込）」という異なる時点の情報の境目が分かりにくいための要望。
- **決定内容**：`.p315-archive-table`に新設モディファイア`.p315-archive-table--grouped`を追加し、`<table class="p315-archive-table p315-archive-table--grouped">`としてp3-17/p4-17のC-5テーブルにのみ付与（**p3-15/p4-15の6列テーブルは無印のまま・影響なし**）。thead を2段構成に再設計：
  - 1段目＝グループラベル行：`<th colspan="2">精算</th>`（締め日＋当月精算金額）／`<th colspan="3">振込</th>`（振込日＋振込手数料＋振込金額）／`<th rowspan="2">状態</th>`／`<th rowspan="2"></th>`（明細ボタン用の空セル、両行を貫通）。
  - 2段目＝個別列ラベル行：締め日／当月精算金額／振込日／振込手数料／振込金額（グループに属する5列のみ）。
  - グループ境界（当月精算金額列と振込日列の間）に`border-right:1px solid var(--border)`の縦罫線を1段目「精算」セル・2段目「当月精算金額」セル・tbody各行の2列目セルの3箇所に適用し、ヘッダーから本文まで一直線に通す。
- **CSS実装（`kotennavi-common.css`・`.p315-archive-table__status--done`直後に新設）**：グループヘッダー行は中央寄せ・`.62rem`・`letter-spacing:.1em`の小型ラベルに、2段目は`padding-top:4px`で通常の左寄せ列ラベルに戻す。`rowspan`セル（状態・空セル）は`vertical-align:bottom`で2段目のベースラインに揃え、`padding-left/right:10px`で既存tbody側のpadding（nth-child(6)・last-child）と一致させる。
- **モバイル影響なし**：`.p315-archive-table thead{display:none}`（既存のカード化レスポンシブ・追補76）によりモバイルではtheadごと非表示になるため、2段ヘッダーの構造はモバイル表示に一切影響しない。
- **既存nth-child幅ルールとの整合**：`th:nth-child(1)`（min-width:100px）は1段目の「精算」セル（colspan2で1個目）・2段目の「締め日」セル（1個目）の両方に適用され、`th:nth-child(2)`（min-width:85px）は1段目の「振込」セル（colspan3で2個目）・2段目の「当月精算金額」セル（2個目）の両方に適用される。colspanはnth-child位置のカウントには影響しない（同一`<tr>`内での兄弟順で数える）ため、意図通りに両方の見出し行に反映される。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p3-17.html`・`kotennavi-p4-17.html`・`kotennavi-common.css`。
- **React/Drupalへの含意**：`<ArchiveTable>`はカラム定義に`group`プロパティ（例：`{key:'monthlySettlementAmount',group:'settlement'}`／`{key:'payoutDate',group:'payout'}`）を持たせ、コンポーネント側で自動的に2段ヘッダー（`colSpan`まとめ＋グループ境界の罫線）を描画する設計にするとHTML手動管理より保守しやすい。グループを持たない列（状態・アクション）は`rowSpan`扱いとして同コンポーネント内で吸収する。

### 2026-07-31 追補(81)（p3-17/p4-17：C-5精算履歴のモバイルカード表示にもデスクトップと同じ「精算」「振込」2グループ構成を適用。状態をカード先頭へ移動。CSSのみ・HTML変更なし）

- **経緯**：追補(80)報告後、ユーザーから「レスポンシブのスマホサイズの時締め日に対して当月精算金額の表示と同じように、振込日に対して振込手数料・振込金額を表示してください。状態は行の先頭にしてください」と指摘。デスクトップの2段ヘッダー＋縦罫線グルーピングはモバイル（`thead{display:none}`のカード化表示）には反映されておらず、全7項目が均等に縦積みされたままだったための対応。
- **決定内容（実装手法・重要＝DOM順を変えずflexbox `order`で視覚順序のみ操作）**：モバイルの`tr`を`display:flex;flex-direction:column`に変更し、状態列（`td:nth-child(6)`）へ`order:-1`を指定してカード内の見た目の順序のみを先頭に移動。**tbody/theadのDOM構造・列順は一切変更していない**（デスクトップの2段ヘッダー〔追補80〕がnth-child位置に依存しているため、DOM順を変えるとデスクトップのグルーピングが壊れる。flexboxの`order`プロパティはCSSのみでDOMを保持したまま視覚順序を変えられるため、両立できる）。
- **決定内容（グループ内罫線の除去・行間調整）**：グループ内（締め日→当月精算金額間／振込日→振込手数料→振込金額間）の`border-bottom`を除去し、グループ境界（当月精算金額の後・振込金額の後）のみ罫線を残す。グループ内の`padding`を`6px→3px`ベースに詰めてクラスタ感を強調。
- **スコープ**：`.p315-archive-table--grouped`モディファイア配下のみ（p3-17/p4-17専用）。p3-15/p4-15の6列テーブル（無印`.p315-archive-table`）は影響を受けない。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`のみ（`kotennavi-p3-17.html`・`kotennavi-p4-17.html`はHTML変更不要＝追補80のマークアップのまま）。
- **React/Drupalへの含意**：`<ArchiveTable>`のモバイル版は、デスクトップの列グループ定義（追補80の`group`プロパティ）をそのまま流用し、モバイルでは「グループ内は罫線なしで連続」「グループ間・状態行の前後は罫線あり」「状態は先頭固定」というレンダリングルールに変換する。React実装では`order`ではなく配列の並び替え（`columns.sort` や明示的な `mobileOrder` フィールド）で表現する方が保守しやすい（今回のCSS `order` はHTML手動管理下の次善策）。
  - **※この解釈は追補(82)で訂正済み**。実際に意図されていたのは「状態を先頭固定」ではなく「締め日/振込日を親、当月精算金額・振込手数料・振込金額を子とする字下げ表現」で、状態の並び順変更・グループ内罫線除去は誤りだった。React実装時はこの追補(81)の解釈ではなく追補(82)を正とすること。

### 2026-07-31 追補(82)（p3-17/p4-17：追補(81)の実装を訂正。状態の並び順move-to-frontを取り消し、字下げ〔インデント〕による親子関係表現に置き換え）

- **経緯**：追補(81)報告後、ユーザーより「状態の表示順番を戻してください、前回のコメントは字下げについての話です」と訂正。追補(81)は「締め日に対して当月精算金額の表示と同じように、振込日に対して振込手数料・振込金額を表示してください」という指示を「グループ内の罫線を除去し行間を詰めるクラスタリング」＋「状態を先頭移動」の2点として実装したが、これは誤読だった。正しくは「締め日→当月精算金額」「振込日→振込手数料・振込金額」をそれぞれ**親子関係として字下げ（インデント）表示**する、という単一の指示であり、状態の並び順変更は意図されていなかった。
- **決定内容（追補(81)の取り消し）**：`.p315-archive-table--grouped`のモバイル用ルールから以下を削除し、通常の`.p315-archive-table`基本挙動（`tr{display:block}`＝DOM順どおり、全行に均一な`border-bottom`）に復元：`tr{display:flex;flex-direction:column}`、`td:nth-child(6){order:-1}`（状態を先頭移動）、グループ内`td:nth-child(1)/(3)/(4)`の`border-bottom:none`、`padding-top/bottom:3px`の行間調整。
- **決定内容（正しい実装＝字下げ）**：`当月精算金額`（`td:nth-child(2)`）・`振込手数料`（`td:nth-child(4)`）・`振込金額`（`td:nth-child(5)`）に`padding-left:14px`を追加し、直前の親行（締め日／振込日）に対する字下げでインデントによる親子関係を表現。状態は元のDOM順（締め日・当月精算金額・振込日・振込手数料・振込金額・状態・アクションの6番目＝アクション直前）のまま。罫線は他の項目と同様、全行に均一に表示される。
- **教訓（後工程・今後の解釈の参考）**：ユーザー指示の「Aに対してBの表示と同じように、Cに対してDを表示してください」という言い回しは、既存の何らかの視覚的技法（この場合は字下げ）を指して「同じ技法をCにも適用してほしい」という意味であることが多く、実装側が独自の解釈（罫線除去・順序変更等）を補って実装しないよう注意。指示の技法が不明瞭な場合はまず具体的な視覚効果（インデントか、罫線か、順序か）を確認してから実装するのが望ましい。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`のみ（HTML変更なし）。
- **React/Drupalへの含意**：`<ArchiveTable>`のモバイル版は「親子関係のある列は子列にインデント（`paddingLeft`相当）を付与する」という単純なレンダリングルールで表現できる。列の視覚的な並び順・状態の位置はデスクトップと同一のDOM順のままでよく、モバイル専用の並び替えロジックは不要（追補(81)で示唆した`order`/`mobileOrder`案は本ケースには不要と判明）。

### 2026-07-31 追補(83)（p3-17/p4-17：追補(82)適用後もユーザーより「状態は字下げしないでほしい」と再指摘。状態列に残っていた別要因の左paddingを除去）

- **経緯**：追補(82)で状態（`td:nth-child(6)`）を字下げ対象から明示的に除外した（`padding-left:14px`の対象は`nth-child(2)/(4)/(5)`のみ）が、ユーザーより改めて「状態は字下げしないでほしい」と指摘。調査したところ、追補(82)の指定漏れではなく、**`.p315-archive-table`の共通基底ルール**（`th:nth-child(6),td:nth-child(6){padding-left:10px;padding-right:10px}`＝デスクトップ表示時に状態列の左右に均等なガターを取るための既存ルール）が、モバイルのカード表示（`display:flex`化・`padding:6px 0`）に対してもセレクタ詳細度で上回り、`padding-left:10px`だけが生き残っていたことが原因と判明。締め日・振込日（親列、`padding-left:0`）に対して状態だけ10px分右にずれ、見た目上インデントされているように見えていた。
- **対応**：`.p315-archive-table--grouped`のモバイルルールに`td:nth-child(6){padding-left:0}`を追加し、基底ルールのpadding-leftを明示的に打ち消した。締め日・振込日と同じ左端（インデントなし）に揃う。
- **スコープの安全性**：`--grouped`修飾クラスに限定して上書きしたため、同じ基底ルール・同じ`nth-child(6)`位置を使うp3-15/p4-15の6列テーブル（6列目は「取引完了日」であり状態ではない）には影響しない。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`のみ（HTML変更なし）。
- **React/Drupalへの含意**：`<ArchiveTable>`の列単位CSSを移植する際、デスクトップ用の「列固有ガターpadding」（例：状態列の左右10px）とモバイルカード化用の「親子インデントpadding」が同じ`padding-left`プロパティを競合させる可能性がある。実装時は列ごとに「デスクトップ専用padding」と「モバイルカード専用padding」を別プロパティ（またはCSS-in-JSの別変数）として管理し、cascadeの詳細度に依存させない設計が望ましい。

### 2026-07-31 追補(84)（p3-17/p4-17：C-5精算履歴のモバイルカードで当月精算金額に残っていた縦罫線〔精算/振込グループ区切り〕を非表示化）

- **経緯**：追補80でデスクトップの2グループ構成（精算＝締め日・当月精算金額／振込＝振込日・振込手数料・振込金額）を導入した際、グループの境界を示す縦罫線（`border-right`）を当月精算金額（`tbody td:nth-child(2)`）の右側に付けた。この罫線はデスクトップ専用を意図していたがmedia queryでスコープしておらず、モバイルのカード表示にもそのまま残っていた。ユーザーより「モバイルの時、振込手数料・振込金額と異なる表示が気になるので、枠線を非表示にしてください」と指摘。
- **対応**：モバイルブロック（`@media(max-width:640px)`）内に`.p315-archive-table--grouped tbody td:nth-child(2){border-right:none}`を追加。元の罫線ルール（追補80・L11003-11005）が`tbody`まで含むセレクタで詳細度(0,2,2)のため、同じ詳細度で指定し、ソース順で後に定義することでカスケード上書きした（`tbody`を省略すると詳細度不足で上書きされない点に注意＝実装時に一度specificity不足で無効化する事故があり、修正済み）。
- **設計判断**：モバイルのグループ表現はグループ区切り線ではなく字下げ（追補82）のみで行う方針に統一。デスクトップは「2段ヘッダー＋縦罫線」、モバイルは「字下げのみ」と、画面幅ごとにグループ表現の手法自体を変える非対称設計を明示的に採用（罫線をモバイルにも持ち込まない）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`のみ（HTML変更なし）。p3-15/p4-15の6列テーブルは`--grouped`修飾クラスを持たないため影響なし。
- **React/Drupalへの含意**：`<ArchiveTable>`のグループ表現は「デスクトップ＝罫線＋2段ヘッダー」「モバイル＝インデント」という画面幅依存の非対称レンダリングとして設計する。CSS変数化・詳細度依存を避けるコンポーネント実装（例：`groupBoundary` propをデスクトップのみ適用）にすると、今回のような詳細度競合の事故を避けられる。

### 2026-07-31 追補(85)（p3-17/p4-17：C-5精算履歴モバイルカードの振込グループ列padding統一＋項目名・内容の文字サイズ拡大）

- **経緯**：ユーザーより2点の指摘。①「振込日・振込手数料・振込金額（項目名ではなく内容）の右のpaddingが他の項目と違う」、②「精算履歴の中の項目名や内容の文字サイズを一回り大きくしてください」。
- **①padding修正**：モバイルカードの`nth-child(3)/(4)/(5)`（振込日・振込手数料・振込金額）にはpadding-rightの指定が元々無く、他列（締め日・当月精算金額・状態＝いずれも10px）と異なり値が右端に密着していた。`.p315-archive-table--grouped td:nth-child(3),td:nth-child(4),td:nth-child(5){padding-right:10px}`を追加し他列と統一。
- **②文字サイズ拡大**：`.p315-archive-table--grouped td{font-size:.82rem}`（内容＝値。モバイル既定`.75rem`から拡大。デスクトップの基本テーブルフォントサイズ`.82rem`と同値まで引き上げ）、`.p315-archive-table--grouped td::before{font-size:.64rem}`（項目名＝`data-label`疑似要素ラベル。既定`.58rem`から拡大）を追加。約9〜10%の拡大幅で両者そろえた。
- **解釈の判断**：②の指示文には「モバイルで」という限定が無かったが、直前の文が「モバイルで見るとき」から続く同一トピックであり、かつ「項目名や内容」という言い回しはモバイルカードのみに存在する2要素構成（`data-label`ラベル＋値が縦に並ぶ表示）を指すと判断し、モバイルスコープのみ変更（デスクトップの`th`/`td`フォントサイズは既存のまま）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`のみ（HTML変更なし）。`--grouped`修飾クラスでスコープしているためp3-15/p4-15の6列テーブルには影響しない。
- **React/Drupalへの含意**：モバイルカード化コンポーネントでは、各列の`padding-right`を「値の右揃え位置」として全列で明示的に統一値を持たせる（一部列だけ未指定にしない）。ラベル/値のフォントサイズも列共通のトークン（例：`--card-label-size`/`--card-value-size`）で管理し、列ごとの指定漏れを防ぐ設計が望ましい。

### 2026-08-01 追補(86)（P7-11：記事 新規投稿・編集・クローンページを新規作成。コンテンツブロックエディタ＋記事の紐づけ先データモデルを新設）

- **経緯**：ユーザー指示「p7-11お願いします。p7の展覧会付き記事、作品付き記事、クリエイターページ付き記事、ギャラリーページ付き記事のデモバーでそれぞれが確認できるようにしてください」。(b)のp7.html側デモバー切替（P7_CONTEXTS）は先行対応済みで、本追補は(a)＝`kotennavi-p7-11.html`新規作成分。
- **決定内容（記事の紐づけ先＝データモデル）**：記事の親文脈は「作品／展覧会／クリエイターページ（紐づけなし）／ギャラリーページ（紐づけなし）」の4値**排他選択**とし、ロールで選べる値が異なる（作品・クリエイターページ紐づけなし＝creator限定／ギャラリーページ紐づけなし＝gallery限定／展覧会＝両ロール共通）。UIは`data-role`属性付きピルグループ（`#p711ParentGroup`）で選択肢自体をロール別にhidden切替し、非表示になった選択中ピルがあれば同グループ内の最初の可視ピルへ自動再選択する汎用関数`p711SyncRoleFields(role)`を新設。記事種別（レポート/インタビュー/制作日記〔creator〕・ギャラリーノート〔gallery〕/お知らせ/ワークショップ〔creator限定〕）も同じ関数で出し分け。**React/Drupal実装では`Article.parentType: 'artwork'|'exhibition'|'creator'|'gallery'` ＋ `Article.parentId`（creator/galleryの場合はnull）のフィールドとして持たせ、選択肢のロール別フィルタリングはサーバ側バリデーションでも二重化することを推奨**（フロントの`hidden`切替はUI都合であり、送信値の正当性はAPI側でロール×選択肢の組み合わせを検証する必要がある）。
- **決定内容（投稿者表示の簡素化＝p6-11との設計差）**：p6-11（作品エディタ）は「本人以外を代理登録できる」ため`P611_AUTHORS`レジストリ＋URL`?author=`/`?self=1`パラメータで作者を確定する仕組みを持つが、**記事にはこの概念がない**（記事は常にログイン中のcreator/gallery本人が本人として投稿）。そのためp7-11の`window.p711RoleSync()`はURLパラメータ解決を持たず、`window.ktnState.role`から直接バッジ・氏名・注記を書き換えるだけの実装に簡素化した。後工程でも「記事＝本人投稿のみ・代理投稿なし」という制約はAPI設計に反映すること（作成者IDはセッションから取得し、リクエストボディで指定不可にする）。
- **決定内容（本文＝新規のコンテンツブロックエディタ）**：記事本文を「テキスト／画像／画像2枚／動画」の4種ブロックの配列として編集する`.p711-blocks`エディタを新設（コードベースに前例なし）。各ブロックは⠿ハンドルでドラッグ並べ替え、✕で削除（最後の1ブロックは削除不可＝本文を空にできない）、ツールバー「＋テキスト／＋画像／＋画像2枚／＋動画」で追加。既存の画像アップロード部品（`.p211-img-uploaded`/`.p211-img-drop`/`.p211-img-caption`）・テキストエリア（`.p211-textarea`）をブロック内部品として再利用し、新規CSSは`.p711-*`のラッパー・ツールバー・ドラッグ演出のみに限定。ドラッグ並べ替えは`KTN.initImgReorder`（p6-11のサブ画像用・クラス名がハードコードされ汎用転用不可）を使わず、`#p711Blocks`にスコープした専用IIFEとして別実装。**React/Drupal実装では`Article.body: Block[]`（`Block = {type:'text',content}|{type:'image',url,caption}|{type:'pair',urls:[string,string],caption}|{type:'video',url,caption,duration}`）という順序付き配列として永続化し、`<ContentBlockEditor blocks onChange>`コンポーネント（`<Block>`のtype別レンダラ＋dnd-kit等によるドラッグ並べ替え）に対応させる設計を推奨**。
- **`kotennavi-pages.js`側の対応**：`KTN.pages['p7-11']`を新設（`KTN.pages['p6-11']`と同型の`syncMgmtBar()`／`window.ktnRender`フック）。`KTN.syncMgmtOwner('p711Owner', role)`で identity strip の Owner 行を populate。`kotennavi-common.js`の`getActions()`は`'p7-11'`分岐が既存のプレースホルダー実装のまま合致するため変更不要。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：新規`kotennavi-p7-11.html`、`kotennavi-common.css`（`.p711-*`追記）、`kotennavi-pages.js`（`KTN.pages['p7-11']`追加）。`docs/sitemap.md`のP7/P7-11行を`html-file`/進捗欄とも更新。

### 2026-08-01 追補(87)（P7-11：ユーザーフィードバック6点を反映。紐づけ先を「入口ページ」による固定表示へ変更（追補86のデータモデルを訂正）／タイトルを先頭化／記事種別「その他」自由入力／テキストブロックにサブタイトル／動画をURL方式に変更／編集・クローン時に元記事の作成日・更新日を明記）

- **経緯**：ユーザーより「p7-11のコメント」として6点指摘。うち①は追補(86)で実装した「紐づけ先をピルグループで**ユーザーが選択**する」UIが設計として誤りだったことの訂正指示：「記事新規の入り口は展覧会or作品orクリエイターページorギャラリーページ。入口が展覧会or作品の場合、紐づけは展覧会or作品＋クリエイターページorギャラリーページ。入口がクリエイターページorギャラリーページの場合は紐づけはクリエイターページorギャラリーページ。なのでp7-11の新規・編集・クローンのいずれの場合もすでに紐づけ先が決まっていて変更できない。対象の作品も選択できない」。
- **決定内容（①紐づけ先＝「入口ページ」で決まる固定値・非選択に変更＝追補86のデータモデルを訂正）**：記事の紐づけ先はp7-11内でユーザーが選択するものではなく、**「どのページから新規記事作成を起動したか（入口）」によって100%自動的に決まる**。入口は「作品ページ／展覧会ページ／クリエイターページ／ギャラリーページ」の4種（作品・展覧会からの入口＝紐づけ先はその作品・展覧会＋作者〔creator/gallery〕、クリエイター・ギャラリーページからの入口＝紐づけなしの本人ページ記事）。旧`#p711ParentGroup`ピルグループ（ユーザーが紐づけ先を選ぶUI）・`P711_TARGETS`・`p711SyncParentContext()`は全廃止し、**表示専用の固定バッジ＋対象名**（`#p711Linkage`＝`cb-artwork`/`cb-exhibition`バッジ＋対象名リンク、紐づけなしの場合はバッジ非表示＋「◯◯ページの記事（紐づけなし）」テキストのみ）に置き換えた。実ページには存在しないURLパラメータ相当のデモ機構として、dbarに「入口（デモ用）」切替（`p711SetEntry(key)`／`P711_ENTRY`マップ）を新設し、4入口シナリオを目視確認できるようにした。**React/Drupal実装では`Article.parentType`/`Article.parentId`のフィールド構造自体は追補86のまま有効だが、これを決定するのはp7-11のフォームUIではなく「新規記事作成」ボタンを設置した側のページ（p2/p6=作品・展覧会側／p3/p4=クリエイター・ギャラリー側）が渡すクエリパラメータ（例：`?from=artwork&id=…`）である。p7-11（Article編集フォーム）はこの値を`readonly`で受け取り表示するのみで、フォーム側にparentType選択UIを持たせない**（作品の選択肢も出さない＝対象作品はp6側で確定済み）。
- **決定内容（②記事タイトルを基本情報の先頭に移動）**：`.p211-block`内のフィールド順を「タイトル→紐づけ先（表示専用）→記事種別→…」に変更。実装上の理由はなく単純な項目順変更。
- **決定内容（③記事種別「その他」の自由入力＋検索/絞り込みの設計方針）**：記事種別ピルグループに`f`＝「＋ その他」を追加し、選択時のみ`#p711CustomTypeField`（自由入力・必須）を表示。**検索・絞り込みでは、自由入力させた個別ラベルをそのまま新しいフィルタ選択肢として増殖させない**（絞り込みUIの選択肢が無限に増えて破綻するため）。カノニカルなバッジ`.at-f`（色`#4a5a6a`・ラベル「その他」）を新設し、**自由入力ラベルはあくまで記事ページ上の補足表示（本文冒頭や種別バッジのtitle属性等）に留め、記事一覧・検索フィルタ上の分類は常に「その他」の1カテゴリに集約する**。理由：種別絞り込みの目的は「大まかなジャンルで発見可能にすること」であり、自由入力を絞り込み軸に昇格させると表記ゆれ（「座談会」「対談」等）で同じ内容の記事が別カテゴリに分散し、絞り込みの実用性が下がる。**React/Drupal実装では`Article.type: 'report'|'interview'|'diary'|'notice'|'workshop'|'other'`（enum固定・DBスキーマの絞り込みインデックス対象はこのenumのみ）＋`Article.customTypeLabel: string|null`（`type==='other'`の時のみ使用・表示専用でインデックス対象外）の2フィールドで表現することを推奨**。将来的に特定の自由入力ラベルの出現頻度が高くなった場合は、運営判断で正式なenum値へ追加する運用（自動昇格はさせない）。
- **決定内容（④テキストブロックにオプションのサブタイトル欄）**：`p711MakeBlock('text')`の生成HTML・および静的サンプル4ブロックに`<input type="text" class="p211-input p711-block__subtitle" placeholder="サブタイトル（任意）">`をテキストエリアの直前に追加。**必須ではない**（空でも保存可）。**React/Drupal実装では`Block`型`text`ケースに`subtitle?: string`を追加**（追補86の`Block`型定義を拡張。他ブロック種別＝image/pair/videoにはサブタイトル概念を持たせない＝テキストブロックのみの機能）。
- **決定内容（⑤動画ブロックをアップロード方式から外部URL方式に変更）**：静的サンプルの動画ブロック・`p711MakeBlock('video')`双方から画像アップロード風ウィジェット（`.p211-img-drop`）を撤去し、`<input type="url" class="p211-input">`（必須・YouTube/Vimeo等の動画ページURL）＋キャプション＋「再生時間（表示用）」テキスト入力に置き換え。**理由＝動画ファイル自体をサイトでホスティング・エンコードする想定がなく、外部動画プラットフォームへのリンクを埋め込む設計のため**（画像ブロックは引き続きアップロード方式のまま＝対象外）。**React/Drupal実装では`Block`型`video`ケースを`{type:'video', url:string, caption?:string, duration?:string}`とし、サーバ側でファイルアップロード処理・エンコードパイプラインを実装する必要はない**（URLの形式バリデーションのみでよい）。
- **決定内容（⑥編集・クローン時に元記事の作成日・最終更新日をidentity stripへ明記）**：`.ktn-mgmt-context`内に`__meta`スタイルを再利用した2行目`#p711ContextDates`（「作成日：{created} ／ 最終更新：{updated}」）を追加。`P711_ENTRY`マップの`created`/`updated`フィールドから`p711SetEntry()`が populate。**新規モード（`P711_MODE==='new'`）では非表示のまま**（元記事が存在しないため。`p711SetEntry`内で`P711_MODE !== 'new'`をガード条件にして日付更新をスキップする実装）。**React/Drupal実装では`Article.createdAt`/`Article.updatedAt`は既存フィールドを流用でき、新規フィールド追加は不要**（表示条件＝`mode !== 'new'`のみ後工程に伝達すればよい）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p7-11.html`（紐づけ先UI全面差し替え・入口デモバー新設・タイトル順序変更・記事種別その他欄・テキストブロックsubtitle・動画ブロックURL化・identity strip日付行）、`kotennavi-common.css`（`.at-f`新設・`.p711-linkage*`新設・`.p711-block__subtitle`新設）。

### 2026-08-01 追補(88)（P7-11：画面表示テキストから設計用語「紐づけ」「入口」を排除し、利用者向けの言葉に置換）

- **経緯**：ユーザーより「『紐づけ』や『入口』は仕様を決めるときの用語なので、画面にはそれ以外の適切な言葉に置き換えて下さい」と指摘。追補(87)で導入した画面文言に、仕様検討時にのみ使う内部用語がそのまま露出していたための是正。
- **決定内容**：`kotennavi-p7-11.html`内の**画面表示テキスト**（HTML静的文言・JS `P711_ENTRY` マップが populate する文言）を以下に置換。**コード内の変数名・関数名・IDセレクタ（`p711Linkage`/`p711SetEntry`/`P711_ENTRY`等）・開発者向けコメントは対象外**（画面には出ないため据え置き）。
  - 「この記事の紐づけ先」（フォームラベル）→「この記事の掲載先」
  - 「紐づけ先は、この記事の投稿元ページ（入口）によって自動的に決まります。ここでは変更できません。」（ヘルプテキスト）→「掲載先は、この記事を作成したページによって自動的に決まります。ここでは変更できません。」
  - identity strip・クローンバナー等が表示する「紐づけ：{対象名}」→「掲載先：{対象名}」
  - 「◯◯ページの記事（紐づけなし）」→「◯◯ページの記事（単独掲載）」
  - dbar「入口（デモ用）：」→「作成元ページ（デモ用）：」
- **本追補で確定した用語対応（今後この画面領域を触る際の基準）**：仕様語「紐づけ（先）」＝画面語「掲載先」／仕様語「入口（ページ）」＝画面語「作成元ページ」。**本ドキュメント（handoff-decisions.md）内の記述は仕様検討用の正確性を優先し、引き続き「紐づけ」「入口」を使用してよい**（本追補が対象とするのはあくまでHTML/JSが実際にレンダリングする画面文言のみ）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p7-11.html`（HTML文言・JS文字列リテラルの置換。CSS・構造変更なし）。

**追記（同日・ユーザー指示「p7もp7-11の修正に合わせて修正してください」を受けp7.htmlへ横展開）**：`kotennavi-p7.html`のdbarラベル「親文脈：」→「掲載先：」に修正。対応する開発者コメント（`kotennavi-p7.html`内・`kotennavi-pages.js`の`P7_CONTEXTS`定義直前）も「親文脈」→「掲載先」に統一。**`switchP7Context()`関数名・`P7_CONTEXTS`変数名・`p7HeadParent`等のIDは非表示のコード識別子のため据え置き**（p7-11と同じ方針＝画面文言のみ対象）。画面表示ラベル本体（「この作品の記事」「この展覧会の記事」「このクリエイターの記事」「このギャラリーの記事」＝`p7-head__parent-label`）は元々一般語で書かれており修正不要だった。**影響ファイル追加**：`kotennavi-p7.html`、`kotennavi-pages.js`（コメントのみ）。

### 2026-08-01 追補(89)（P7：ユーザーフィードバック6点を反映。ヒーロー見出しの可読性・投稿者カードの重複解消＋改行・p7-11サブタイトルの反映）

- **経緯**：ユーザーより「p7のコメント」として6点指摘。
- **① タイトルが画面幅いっぱいで読みにくい（p2も同様）**：`.p7-head__inner`／`.p2-title-band__inner`の左右padding（`--hero-pad-x` 20px）は「ヒーロー幅＝コンテンツ幅／パンくず・タブナビと20pxグリッドで揃える」という全ページ共通の位置合わせルール（CLAUDE.md「幅を揃える」節）の単一ソースであり、過去にヒーロー側だけ24〜28pxへ変更して他要素とズレた失敗が明文化されている。**paddingそのものは変更せず**、新設した`--hero-title-max-w`（820px）を`.p7-head__title`・`.p2-title-band__title`に`max-width`として追加し、大型見出しが1行で箱の全幅（1040px）まで伸びきらないよう折り返しの上限だけを設けた。左端は他要素と同じ20pxのまま、右側の余白のみ確保する形で読みやすさを改善（box自体の位置合わせルールには抵触しない）。
- **② クリエイター・ギャラリー付きの場合の「このクリエイター」「このギャラリー」カードは不要・他と同様に投稿者を表示**：`P7_CONTEXTS.creator`/`.gallery`の`sideParentHtml`（watchボタン＋「〇〇ページへ→」付きの重複カード）を空文字にし`switchP7Context()`側で`#p7SideParent`を非表示化（`#p7SideAuthor`と同じ空文字hide方式に統一）。代わりに`sideAuthorHtml`へ、artwork/exhibitionと同一構造（タイトル・日付・`.p7-author-card`のみ、watch/more-linkなし）の投稿者カードを新設。
- **③ クリエイター・ギャラリーカードのバッジとタイトルは改行**：②の統合により4コンテキスト共通となった`.p7-author-card`コンポーネントに`.p7-author-card__badge-row`（バッジ単独の行）を新設し、`.p7-author-card__name`から`display:flex`＋`&nbsp;`によるバッジ・氏名の同一行表示を廃止。バッジが上段・氏名が下段になる。canonical 1箇所の変更で4コンテキスト全てに反映（common.css）。
- **④ 作品・展覧会付きの場合の執筆者→投稿者に統一**：`P7_CONTEXTS.artwork`/`.exhibition`の`sideAuthorHtml`タイトルを「執筆者 / Written by」→「投稿者 / Posted by」に変更（p2.html「投稿者・お問合せ」の呼称に合わせた）。②で新設したcreator/gallery側も同じ「投稿者 / Posted by」で統一（4コンテキスト共通の呼称に）。
- **⑤ p7-11のテキストサブタイトルを表示**：新設`.p7-article__subtitle`（Shippori Mincho 600・1.05rem）を`.p7-article__block--text`内の本文`<p>`直前に追加できるようにし、p7-11のデモ入力（2番目のテキストブロックのサブタイトル「言葉を『感じ』に変える」）に対応する箇所へ実際に反映（`kotennavi-p7.html`の静的HTML＝artwork表示、`P7_CONTEXTS.artwork.articleHtml`の両方）。他コンテキスト（exhibition/creator/gallery）はp7-11側にサブタイトル入力の実データが無いため今回は追加なし（サブタイトルは任意項目のため、無くても不整合ではない）。
- **⑥ 画像の埋め込み仕様（質問への回答・実装変更なし）**：現状は実画像でなくプレースホルダーの`background:linear-gradient(...)`divのため、リテラルな`object-fit:cover`はまだコードに存在しないが、本番で実画像`<img>`に差し替える際の意図はcover。単体画像（`.p7-article__media--single`）は`aspect-ratio:3/2`。連続（2枚組・`.p7-article__media--pair`）は`display:flex;gap:10px`で**横並び**、各`aspect-ratio:1/1`（モバイル≤540pxのみ`flex-direction:column`で縦積みに切替）。キャプション（`figcaption.p7-article__caption`）は同一`<figure>`内で画像の**直下**（`margin-top:8px`）に1つだけ配置され、2枚組の場合も画像2枚に対してキャプション1つ（「左：〇〇。右：〇〇。」の形で書き分ける運用）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`（`--hero-title-max-w`新設・`.p7-head__title`/`.p2-title-band__title`にmax-width追加・`.p7-author-card__badge-row`新設・`.p7-author-card__name`のflex解除・`.p7-article__subtitle`新設）、`kotennavi-p7.html`（投稿者カード改称・改行構造・サブタイトル追加）、`kotennavi-pages.js`（`P7_CONTEXTS`全4件の`sideParentHtml`/`sideAuthorHtml`更新・`switchP7Context()`に`#p7SideParent`の空文字hide追加・artworkの`articleHtml`にサブタイトル追加）。

### 2026-08-01 追補(90)（P6：タイトル可読性＋《》撤去範囲の確定、右カラムCTAのモバイルorder不具合修正）

- **経緯**：ユーザーより6点指摘を受けたが、**実際にp6宛だったのは①のみ**（②〜⑥は本来p7宛のコメントであり、後続のユーザー訂正「先のコメントは1.以外はp7についてのコメントでした」を受けて誤適用と判明・全て取り消し／リバート済み。詳細は追補(91)を参照）。
- **① タイトルの可読性＋《》撤去**：`.p6-hero__title`のcanonical定義（common.css内、p7/p2と同じく後勝ちの位置）に既存`--hero-title-max-w`（820px）を追加。**《》はデータではなくJSが描画時に付与していたシステム装飾**と確認（`_p6Works`の`title`フィールド自体には《》を含まない）。撤去範囲は**この作品の単体自己参照箇所のみ**：ヒーローH1（`#p6Title`）・About見出し（`#p6AboutTitle`）・関連バンドの自己リンク・`document.title`・購入申込モーダルタイトル（いずれも`kotennavi-pages.js`の`_p6Init`/`KTN.pages['p6']`内）。**複数の作品を並べて表示する一覧・グリッド文脈（MORE WORKSグリッド・関連作品グリッド等の`P6_REC`/`MORE_BY`データ由来の表示、および他ページの同種一覧）は対象外**とし、《》を残置した。理由：これはサイト全体で確立された「カード見出し内で作品名を視覚的に区別する」表記慣行であり、今回の指摘は「このページの主役タイトル」の可読性に限定されるため、一覧側まで一括で剥がすと影響範囲が不必要に広がる（p7の記事一覧・p3-3等の作品グリッドにも同じ表記が多数あるが今回はノータッチ）。p6/p6-1/p6-2は`_p6Init`を共有するため3ページとも同時に反映（p6-1/p6-2の静的プレースホルダーHTMLも合わせて手動修正）。
- **右カラムCTAのモバイルorder不具合（独立した既存バグ修正・②〜⑥の誤適用とは無関係に維持）**：モバイル（≤900px）専用のレスポンシブCSSで`.p6-side-inner{display:contents}`により子要素が親flexへ展開され`order`プロパティで並び順を制御する設計だったが、投稿者・お問合せカードを対象とするセレクタが`.p2-side-posted`（p2ページのクラス名）のままで実際のp6マークアップのクラス（`.p2-side-contact`）と不一致だった。このためこのカードには`order`が適用されず既定値`0`となり、CTA（`order:6`）より先に描画されるモバイル限定の不具合が発生していた。セレクタに`.p2-side-contact`を追加し`order:7`を適用して修正。
- **取り消し済み（誤適用・リバート済み）**：旧②〜⑥（投稿者カードのウォッチCTA・サブタイトル変更・作品説明への画像埋め込み新設`.p6-desc-media`・関連する`_p6Works[1].media`フィールド・`titleEn`変更）は全てp7宛の指摘をp6に誤って実装したものであり、コード（`kotennavi-common.css`の`.p6-desc-media`ブロック・`kotennavi-pages.js`の`_p6Works[1].media`と`descBody`描画ロジック・`titleEn`値・`kotennavi-p6*.html`/`p6-11.html`の`titleEn`表示）を全て元の状態へ戻した。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`（`.p6-hero__title`にmax-width追加・`.p6-side-inner`モバイルorder用セレクタに`.p2-side-contact`追加）、`kotennavi-pages.js`（`document.title`/`#p6Title`/`#p6AboutTitle`/購入申込モーダルタイトルの《》除去）、`kotennavi-p6.html`／`kotennavi-p6-1.html`／`kotennavi-p6-2.html`（静的プレースホルダーの《》除去）。

### 2026-08-01 追補(91)（P7：ユーザーフィードバック追加5点を反映。投稿者カードへのwatch追加・サブタイトル明瞭化・記事内2枚組画像のcover実装＋個別キャプション化・右カラムCTAを先頭へ移動）

- **経緯**：追補(90)で一度p6に誤適用していた6点のうち②〜⑥は、ユーザーの訂正により本来p7宛と判明。ここで正しくp7へ実装した。
- **② 投稿者カードにwatch CTAを追加**：`.p7-author-card`（`P7_CONTEXTS`全4コンテキスト共通コンポーネント）は追補(89)時点でwatchボタンを持たない設計だったが、`docs/component-html.md`の canonical テンプレート（ピル型`.ktn-btn` watchボタン）を`.p7-author-card__info`内に新設した`.p7-author-card__foot`へ追加。`.p7-author-card`自体が`<a>`のため、他ページの`.p2-side-ec`内`.ktn-icon-btn`と同様`handleAction(this,'watch');event.preventDefault()`でアンカーの遷移を防止。静的HTML（`kotennavi-p7.html`）と`P7_CONTEXTS`の4コンテキスト全ての`sideAuthorHtml`に反映。
- **③ サブタイトルの明瞭化**：`#p7En`／`P7_CONTEXTS.artwork.en`を`Making of "Onomatopoeia Garden" — In Search of the Shape of Sound`（二重引用符＋emダッシュで読点混雑）から`Making of Onomatopoeia Garden: In Search of the Shape of Sound`（引用符を外しコロン区切りに整理）へ変更。exhibition/creator/gallery の`en`は元々明瞭なため対象外。
- **④ 記事内2枚組画像の実装**：CSS `.p7-article__media-img`に`object-fit:cover;object-position:center;display:block`を追加（実画像`<img>`への将来差し替えに備え、現状のプレースホルダーdiv構造は維持＝`.p211-img-uploaded__thumb`の静的デモ運用に倣い`<img src="">`は使わない）。モバイル（≤540px）専用の`.p7-article__media--pair{flex-direction:column}`を削除し、画面幅に関わらず常に1行2枚を維持するよう変更（同じ`@media`ブロック内の他2ルールは維持）。新設`.p7-article__media-col{flex:1;min-width:0}`で画像＋キャプションを1組にラップし、従来「左：〇〇。右：〇〇。」の共有キャプション1つだったものを画像ごとの個別キャプションへ分割（各画像の直下に配置）。静的HTML1箇所＋`P7_CONTEXTS`の4コンテキスト（artwork/exhibition/creator/gallery）articleHtml内の2枚組figure、計5箇所に適用。
- **⑤ 右カラムCTA（興味あり！ウィジェット）を先頭へ移動**：`kotennavi-p7.html`の`<aside class="p2-layout__side">`内で`#p7CtaWidget`を`#p7SideParent`より前（先頭）に並べ替え。`switchP7Context()`はidベースのinnerHTML書き換えのみでDOM順を変更しないため、4コンテキスト全てで自動的にCTA先頭が維持される。**関連する確認事項**：「興味あり！」でマークした場合の表示範囲を調査したところ、p5.html（p5タブナビ上は「カレンダー」表記＝マイページトップ）は実際には興味あり専用フィルタチップ（`data-filter="interest"`）とメインフィード内の興味ありカード、および右カラム「最近の興味あり！」ウィジェットを持っており、**興味あり項目はp5-3（興味あり！リスト）だけでなくp5（カレンダー/マイページトップ）にも表示される**のが現状の実装（「カレンダーには出ない」という想定とは異なる）。今回はこの点についてコード変更は行っていない（現状の仕様として報告のみ）。
- **⑥ Drupal質問への回答（実装変更なし・再掲）**：テキスト・画像・動画を不規則なブロックとして自由に配置できる記事編集は、Drupalの**Paragraphsモジュール**（コンテンツタイプのフィールドとして複数の段落タイプ＝テキスト/画像/動画パラグラフを任意順・複数回配置できる）、または**Layout Builder**（セクション・ブロックの視覚的配置）で標準的に実現可能。p7-11の「不規則ブロック」UIはこの設計を先取りしたモックアップである旨を回答。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。⑤の「興味ありがカレンダーに出る」現状仕様について、意図通りか改めてユーザー確認が必要。
- **影響ファイル**：`kotennavi-common.css`（`.p7-article__media-img`にobject-fit追加・`.p7-article__media-col`新設・モバイル`flex-direction:column`削除・`.p7-author-card__foot`新設）、`kotennavi-p7.html`（投稿者カードへwatchボタン追加・`#p7En`文言変更・2枚組figureの構造変更＋キャプション分割・右カラム`#p7CtaWidget`を先頭へ移動）、`kotennavi-pages.js`（`P7_CONTEXTS`全4件の`sideAuthorHtml`にwatchボタン追加・`artwork.en`変更・4件の`articleHtml`内2枚組figure構造変更）。

### 2026-08-01 追補(92)（横断9点ラウンド：p2〜p2-4／p2-11↔p2-1／p3-11／p5-15／p3-15↔p4-15／p3-11↔p4-11／p11-4／p11-2↔p11-3）

- **経緯**：ユーザーから9点の指摘・依頼を一括で受け、複数ページ横断で反映。うち以下3点は後工程（React/Drupal）向けに判断根拠を残す。
- **p3-11/p4-11「審査中」状態＝ページレベルバナーでなくローカル参照ブロックの3状態化を選択**：p11-4には既にページ全体の状態通知として`.p114-status-notice`（Pending/Step2/StripePending/Approved の4状態バナー）が確立済みだが、p3-11/p4-11のLIAISON+識別ステータスは、そのページの「本人確認情報」ブロック内に置かれた小型の参照ノート`.p114-privacy-note`（アイコン＋1文＋ガイドリンク）という別コンポーネントで表現されている。今回「審査中」を追加するにあたり、p11-4のページレベルバナーを輸入するのではなく、**この参照ブロックの既存ローカル慣行（2状態→3状態のトグル）をそのまま踏襲**した。理由：この場所は「本人確認情報の状態」を短く参照するだけの脇役表示であり、申込ページ本体（p11-4）とは文脈上の役割が異なる（p3-11/p4-11は本人確認情報の持ち主が自分の状態を確認する場、p11-4は申込そのものを行う場）。React変換時、`.p114-privacy-note`は`<IdentityStatusNote status="none|pending|approved">`のような小型コンポーネントとし、p11-4の`<ApplicationStatusBanner>`とは別コンポーネントに分離してよい。
- **p11-4 事業者番号ヘルプテキスト＝購入者側の実表示を根拠に文言決定**：ヘルプテキスト追加にあたり、実際にこの番号がどこでどう使われるかをp5-15.html（購入者向け領収書モーダル）で確認し、`<dt>登録番号</dt><dd>未登録（適格請求書発行事業者ではありません）</dd>`という実表示があることを確認した上で「ご入力いただいた番号は、作品が売れた際に購入者へ発行される領収書に記載されます」という一文を追加。単なる説明文の書き足しではなく、実データフロー（出品者側の入力→購入者側の領収書表示）を裏取りした上での文言決定である。
- **p11-2/p11-3「確認中／利用開始」時のフォーム挙動＝非表示でなく「プリフィル＋disabled」を採用**：旧実装は該当状態で送信フォーム（`p112SubmitWrap`/`p113SubmitWrap`）自体を`hidden`にし、フォーム項目も空欄のまま編集可能という状態だったが、これは「既に申込済みである」という状態を利用者が確認できず、かつ空欄操作可能なフォームが残るという2重の不備だった。対応として、送信ラッパーの`hidden`切替を廃止して常時表示に変え、`pXXXApplyPriorInput(submitted)`ヘルパー（p112/p113共通パターン）が対象フィールド群・同意チェックボックスへ以前の入力値をセットしたうえで`disabled`化、送信ボタンも`disabled`化し、注記文言のみ「この内容ですでにお申込みを受け付けています。内容の変更が必要な場合は…事務局までご連絡ください。」に切替える設計にした。**「隠す」ではなく「見せた上で凍結する」を選んだ理由**：ユーザーが自分の申込内容を後から確認できることの方が、フォームを隠すことよりも有用（他の管理ページの「ロックは取引連動項目だけ凍結・カード全体は隠さない」という既存方針と同じ思想）。デモ用の入力値はp3-11（クリエイター＝田中透）／p4-11（ギャラリー＝Gallery SOIL 渋谷）と同一ペルソナのデータを流用し、サイト内のデモデータ一貫性を保った。React変換時は`<ApplicationForm mode="edit|readonly-submitted">`とし、`readonly-submitted`時はプリフィル値をpropsで渡してdisabled化、送信ボタンはdisabled固定＋注記テキスト切替という同じ2値状態で実装できる。
- **保留事項**：#7（p11-4「ギャラリーでのお立場」代替表現）はテキストでの提案のみで実装は保留（ユーザーの選択待ちのため、決定確定後に別途追記）。ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p3-11.html`／`kotennavi-p4-11.html`（LIAISON+審査中ブロック追加・`setLpMode()`3状態化）、`kotennavi-p11-4.html`（事業者番号ヘルプテキスト）、`kotennavi-p11-2.html`／`kotennavi-p11-3.html`（フィールドid付与・`pXXXApplyPriorInput`/`setDemoMode`/`pXXXAgreementsOk`/`pXXXUpdateSubmit`書き換え）、`kotennavi-p2.html`〜`kotennavi-p2-4.html`（ヒーロー帯ボーダー統一）、`kotennavi-p2-11.html`／`kotennavi-p2-1.html`（在廊情報連携）、`kotennavi-p5-15.html`（領収書PDF項目修正）、`kotennavi-p3-15.html`／`kotennavi-p4-15.html`（p3-17/p4-17リンク追加）。

### 2026-08-01 追補(93)（追補92の9点ラウンドへの言い直し・修正3点：p2-11↔p2-1の連携方式訂正／p3-15↔p4-15リード文リンク撤去／p11-4ラベル統一）

- **経緯**：追補(92)反映後、ユーザーから9点のうち3点について「それ以外は確認しました」付きの言い直し・修正依頼を受けた。
- **p2-11↔p2-1連携の訂正＝どちらのフィールドが正なのか（構造化 vs 素テキスト）**：追補(92)時点の実装は、p2-11の**アコーディオン「クリエイター在廊予定を入力する」**（`#p211AccAttend`＝日付範囲・曜日フィルタ・メモを持つ構造化データ、JS側`ATTENDANCE`配列）をp2-1の在廊予定表示（旧`#p2AttendanceGrid`）へ流用していたが、これはp2-11に存在するもう一つの別フィールド——**会場利用案内セクション内「クリエイター在廊」**（`#p211FacAttend`のyes/no + `#p211FacAttendDetail`の自由記述textarea）——と混同したものだった。ユーザーの指摘は後者（会場利用案内側）を指しており、かつ「そのままテキストベースで表示」という要求は、構造化リストへ再加工せず**yes/no状態＋自由記述をそのまま文字列として出す**という意味だった。この2フィールドはp2-11内で役割が異なる（アコーディオン＝p2-1の日別カレンダーに日付ごとの在廊バッジを立てるための構造化データ源／会場利用案内＝会場運用に関する簡易な有無＋補足説明）ため、**アコーディオン側（`ATTENDANCE`配列・日別カレンダーの②セクション）は今回の指摘と無関係であり変更していない**。修正後は、新設`FACILITY_ATTEND`（`{has, note}`）が会場利用案内側フィールドに対応するデータとして④セクションの`#p2AttendanceText`（`<p>`要素）に`textContent`でそのまま出力される。p2-11側のデモ値（「松田啓佑：6/20（土）…」）は別デモ展覧会の日付で今回のp2-1（田中透・2/18〜3/5）と噛み合わないため、p2-11のテキストを機械的にコピーはせず、p2-1側で**このページの展覧会に一致する新しいデモ文言**を独自に用意した（静的デモページ間でデータが実連動しない現行方式を踏襲。CLAUDE.mdの進捗運用と同じ「パターンを踏襲した文脈整合デモ値」の考え方）。React/Drupal変換時は、この2フィールドが同一エンティティ（展覧会）内の別プロパティ（`attendanceSchedule[]`＝構造化・`facilityAttendance:{has,note}`＝簡易テキスト）として並存する設計になる。
- **p3-15/p4-15リード文ガイドリンクの撤去理由**：`.ktn-mgmt-head__guides`は「このページの使い方ガイド」を集約する場所（LIAISON+の会場優先について／取引の進め方・困ったとき、の2リンクのみが元々の設計）であり、別ページ（販売代金管理＝p3-17/p4-17）への横移動リンクを混ぜると、ページ内の役割（使い方説明）と役割（他ページへの遷移導線）が同じ場所に混在し唐突に見える。既にサイドバーの`.p3-mgmt-nav-item`にp3-17/p4-17への正規ナビ項目が存在するため、リード文側は重複かつ文脈違反と判断し撤去した。「関連情報へのリンクは今の場所の役割に合わせる（ガイド欄＝使い方、ナビ＝ページ遷移）」という切り分けは今後のガイド欄追記時にも踏襲する。
- **p11-4ラベル統一**：p11-3の既存表現「ギャラリーとのご関係」にp11-4を合わせた（p11-3が先行表現・p11-4が追随）。creator/gallery兼用ページ間の表記揺れ防止のため、今後同種のラベルを追加する際はp11-2/p11-3の既存語彙を先に確認する。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p2-1.html`（`#p2AttendanceGrid`→`#p2AttendanceText`、コメント修正）、`kotennavi-pages.js`（`FACILITY_ATTEND`新設・④セクションIIFE書き換え・未使用`DOW_LABEL`削除）、`kotennavi-common.css`（未使用`.p2-1-attendance-grid`/`.p2-1-attend-chip*`を`.p2-1-attendance-text`に置換）、`kotennavi-p3-15.html`／`kotennavi-p4-15.html`（`.ktn-mgmt-head__guides`からp3-17/p4-17リンク削除）、`kotennavi-p11-4.html`（ラベル文言変更）。

### 2026-08-01 追補(94)（追補93の3点がユーザー意図とズレていたための再修正：p2-1は「置換」でなく「併記」／p3-15↔p4-15は「削除」でなく「別枠で再設置」／p11-4に選択肢追加）

- **経緯**：追補(93)の対応後、ユーザーから2点についてさらに言い直しがあった。「テキストベースで表示」＝構造化リストの**置き換え**ではなく、構造化リストは残したうえで会場利用案内のテキストを**追加で**併記してほしいという意図だった。また「別に設置してほしい」＝リンクの**削除**ではなく、リード文・ガイドとは別の場所への**再設置**を求めるものだった。加えて新規に選択肢追加の依頼（項目7）を受けた。
- **p2-1「クリエイター在廊予定」＝構造化リスト（`ATTENDANCE`配列・#p2AttendanceGrid）とテキスト（`FACILITY_ATTEND`・#p2AttendanceText）の併記が正**：追補(93)では「そのままテキストベースで表示」を「構造化リストをテキストに置き換える」と解釈したが、これは誤りだった。正しくは、p2-11に存在する2つの別フィールド（アコーディオン＝構造化スケジュール／会場利用案内＝簡易な有無＋自由記述）を**両方**p2-1に反映し、構造化リストの下に会場利用案内のテキストを補足として並べる構成。この教訓：「そのまま表示」という指示は情報源の**加工方法**（構造化→素テキスト）を指定しているのであって、既存要素の**置き換え**を指示しているとは限らない。既存表示を削る前に「追加なのか置換なのか」を再確認する必要がある事例として記録。フォントサイズは同一セクション内の`.p2-1-simple-item__desc`（`--rt-pre-size`）に揃え、`.p2-1-attendance-text`も同じ変数を使うよう修正（ページ内での視覚的な文章サイズの統一）。
- **p3-15/p4-15「販売代金管理へ」リンク＝削除でなく別枠で再設置が正**：追補(93)では「違和感がある」＝そのリンク自体が不要と解釈し削除したが、正しくは「置き場所」が問題であり、リンク自体は必要だった。カードヘッド内の2カラム構造（`__left`＝タイトル／`__right`＝リード文＋ガイド）とは独立した新しい行（`.p315-related-link`）をカードヘッドの直後に設け、`.ktn-action-btn`（CLAUDE.mdのページ遷移アクションボタン規約＝末尾「→」のアウトラインボタン）でp3-17/p4-17への遷移を表現。この教訓：ユーザーが「〇〇にあるのは違和感がある」と言った場合、要素の**削除**でなく**置き場所の変更**を求めているケースがある（特に、既存のサイドバーナビだけでは「今見ているコンテンツから直接遷移する」導線として弱いため、コンテンツ内に独立した遷移リンクを求める場合がある）。
- **p11-4「ギャラリーとのご関係」に「従業員」を追加**：既存選択肢（代表者・経営者／役員／個人事業主〔本人〕）に、役員の次・個人事業主の手前として追加。p11-3の同種選択肢（オーナー・運営者／スタッフ／広報委託先）とは項目セットが異なる（p11-4は法人の登記上の立場に寄せた選択肢、p11-3はより緩やかな運営実態ベースの選択肢）ため、今回はp11-3側への横展開は行っていない。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p2-1.html`（`#p2AttendanceGrid`復活＋`#p2AttendanceText`併記）、`kotennavi-pages.js`（④セクションIIFEを構造化リスト生成＋テキスト表示の両対応に書き換え・`DOW_LABEL`復活）、`kotennavi-common.css`（`.p2-1-attendance-text`のfont-sizeを`--rt-pre-size`に変更・`.p315-related-link`新設）、`kotennavi-p3-15.html`／`kotennavi-p4-15.html`（カードヘッド直後に`.p315-related-link`行を追加）、`kotennavi-p11-4.html`（「従業員」選択肢追加）。

### 2026-08-01 追補(95)（追補94の2点への微調整：p2-1は表示順を「テキスト→リスト」に入替／p3-15↔p4-15の別枠リンクに簡単な説明文を追加）

- **経緯**：追補(94)の対応後、ユーザーからさらに2点の微調整依頼（項目7は追補(94)の対応で確認済み・変更なし）。
- **p2-1「クリエイター在廊予定」＝表示順を入替（会場利用案内テキストが先・構造化リストが後）**：追補(94)では`#p2AttendanceText`（会場利用案内の簡易テキスト）を構造化リスト`#p2AttendanceGrid`の**後**に配置していたが、「構造化リストが下にしてください」との指示により順序を反転。HTML上は`#p2AttendanceText`→`#p2AttendanceGrid`の順に変更（JS側の生成ロジックはid参照のためDOM順に依存せず無変更）。この並び替えに伴い、`FACILITY_ATTEND.note`内の参照文言「詳しい日程は**上記**の在廊予定表をご確認ください」を「詳しい日程は**下記**の在廊予定表をご確認ください」に修正（テキストが指す構造化リストの位置が上→下になったため、文言も実際の位置関係に追従させた）。
- **p3-15/p4-15「販売代金管理へ」リンクに説明文を追加**：追補(94)で新設した`.p315-related-link`（カードヘッド直後の独立行）は当初リンクのみだったが、「販売代金管理ページについての簡単な説明をリンクの前に付けて」との依頼を受け、`.p315-related-link__desc`（`<p>`要素）をリンクの前に追加。文面は実際のp3-17.html／p4-17.htmlの`.ktn-mgmt-head__desc`（「LIAISON+で取引が完了した代金の残高・精算予定・振込先口座を管理します。精算は月末締め・翌月20日の一括振込…」）を要約した「取引完了後の代金の残高・精算予定・振込先口座の確認はこちら。」を採用（遷移先ページの実際の説明文から要約する＝機械的な仮文言にしない）。レイアウトは`.p315-related-link{justify-content:flex-end}`から`{justify-content:space-between}`に変更し、説明文（左）とリンク（右）を横並びに配置。p3-15/p4-15はペアページのため両方に同一パターンで反映（宛先URLのみp3-17/p4-17で相違）。
- **教訓**：今回の2点はいずれも「機能追加・削除」ではなく「既存要素の並び順・付随情報の追加」という細かな微調整だった。ラウンドを重ねるほど指示は粗い方向修正から細部の調整へ移行する傾向があるため、直前の実装内容を前提に「具体的に何が変わったか」を正確に読み取ることが重要（大きな意味の取り違えは無かったため、追補(93)→(94)のような設計レベルの訂正は発生していない）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p2-1.html`（`#p2AttendanceText`と`#p2AttendanceGrid`の表示順入替）、`kotennavi-pages.js`（`FACILITY_ATTEND.note`内「上記」→「下記」修正）、`kotennavi-common.css`（`.p315-related-link`を`space-between`に変更・`.p315-related-link__desc`新設）、`kotennavi-p3-15.html`／`kotennavi-p4-15.html`（`.p315-related-link__desc`をリンク前に追加）。

### 2026-08-01 追補(96)（p2-1「クリエイター在廊予定」テキストに会場利用案内の在廊有無ラベルを追加）

- **経緯**：追補(95)対応後、ユーザーから「会場利用案内の在廊有無も表示してください」と指摘。それまでの`#p2AttendanceText`は在廊に関する自由記述（`FACILITY_ATTEND.note`）のみを表示しており、p2-11の会場利用案内内`select#p211FacAttend`（`''`=未設定／`'yes'`=在廊あり／`'no'`=在廊なし）が持つ**有無そのもの**は画面に出ていなかった。
- **データ形の変更（`has`真偽値→`attend`文字列）**：`FACILITY_ATTEND`を`{has:true, note:'…'}`から`{attend:'yes', note:'…'}`に変更し、p2-11の`select`が持つ値（`''`/`'yes'`/`'no'`）とそのまま対応させた。表示判定`hasNote`は`attend==='yes' || attend==='no'`（＝select値が未設定でなければ表示。p2-11側で`''`のとき`.p211-facility-detail`が`hidden`になる挙動と一致させた）。ラベル文言は`FACILITY_ATTEND_LABEL = {yes:'在廊あり', no:'在廊なし'}`でp2-11の`<option>`テキストとそのまま揃えた（新しい言い回しを作らない）。
- **表示＝チップラベル＋自由記述を同一`<p>`内に併記**：`#p2AttendanceText`の`textContent`代入を`innerHTML`に変え、冒頭に`<span class="p2-1-attendance-text__state">在廊あり</span>`を差し込んだ後に自由記述本文を続ける形にした。新設`.p2-1-attendance-text__state`は構造化リスト側の`.p2-1-simple-item__badge--attend`（`background:rgba(0,93,167,.1);color:var(--accent)`の淡tintピル）と同じ見た目に揃え、「在廊」を示す視覚言語をページ内で統一した（新しいバッジ意匠を増やさない＝CLAUDE.mdバッジ設計原則「single source of truth」に沿う）。
- **React/Drupal変換時**：`facilityAttendance:{attend:'yes'|'no'|null, note:string}`という構造で持たせ、`attend`の値に応じたラベル（在廊あり/在廊なし）とnoteを併記するテンプレートにする。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-pages.js`（`FACILITY_ATTEND`のデータ形変更・`FACILITY_ATTEND_LABEL`新設・④セクションIIFEの`box.innerHTML`化）、`kotennavi-common.css`（`.p2-1-attendance-text__state`新設）、`kotennavi-p2-1.html`（コメント更新のみ）。

### 2026-08-01 追補(97)（p7-11「画像2枚」ブロック＝2枚の存在意図の確認とモバイル横並び不具合の修正）

- **経緯**：ユーザーより「p7/p7-11のブロック追加になぜ画像2枚の種別があるのか、1枚を2回では同様のことができないのか」と質問。回答として、`.p7-article__media--pair`は同一文脈の2枚（p7.htmlの実例＝「制作中盤のラフ」/「完成に近づいた状態」のbefore/after）を**横並び1組**として見せるための専用レイアウトであり、単体「画像」ブロック（`.p7-article__media--single`＝`aspect-ratio:3/2`の単独figure）を2回追加しても縦に2つ並ぶだけで横並びは再現できない旨を説明し、ユーザーは「2枚」種別の維持に合意。
- **続けてユーザーから「スマホサイズで縦並びになるのが気になる。横並びが意図なら常に横並びの方がよいのでは」と指摘**。調査の結果、**公開ページ`kotennavi-p7.html`側の`.p7-article__media--pair`は追補(91)で既にモバイル専用`flex-direction:column`を削除済みで、画面幅に関わらず常時横並び**（不具合なし）。一方、**編集UI`kotennavi-p7-11.html`の`.p711-pair-imgs`にだけ`flex-wrap:wrap`＋子要素`flex:1 1 200px;min-width:160px`が残っており**、2枚合計最小幅(160×2+gap10=330px)がモバイル実寸（`.ktn-mgmt-stack`のモバイルinset8px適用後の実効幅）を超えるため折り返し、編集画面上でのみ縦積みに見えていた。公開ページ側は既に「常時横並び」の意図で確定済みだったため、**編集UI側もそれに揃えるのが妥当**と判断し修正。
- **修正内容**：`.p711-pair-imgs`から`flex-wrap:wrap`を削除し、子`.p211-img-uploaded`を`flex:1 1 200px;min-width:160px`→`flex:1 1 0;min-width:0`に変更。サムネイル（`.p211-img-uploaded__thumb`）は固定52×40pxで縮まず、ファイル名（`.p211-img-uploaded__name`）は`min-width:0`＋`text-overflow:ellipsis`で省略表示に対応済みのため、縮小しても表示は破綻しない。
- **教訓**：同じ概念（画像2枚組の横並び）が公開ページ用CSSと編集UI用CSSの2箇所に別々に実装されており、片方だけ仕様変更（追補91のモバイル対応）が反映され、もう片方が古いままになっていた。**同一コンポーネントの「表示用」と「編集用」で見た目のルール（特にレスポンシブ挙動）が分岐していないか、変更時は両方を確認する**必要がある事例として記録。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`（`.p711-pair-imgs`・`.p711-pair-imgs .p211-img-uploaded`のflex設定変更）。

### 2026-08-01 追補(98)（p7右カラムのモバイル右端切れ＝`.p2-side-card`共通`min-width:0`未設定によるCSS Grid overflowを修正）

- **経緯**：ユーザーより「p7で右カラムの全セクションの右側がスマホサイズで切れている。この右カラム幅の決め方はp2/p3/p4/p5/p6/p8で共通化していないのか」と指摘。
- **調査**：p2・p7・p8は`.ktn-content.p2-layout-wrap > .p2-layout > .p2-layout__side`のグリッドを共有しており、幅決定ロジック自体は既に共通（`.p2-layout__side`は`@media(max-width:900px)`で`display:grid;grid-template-columns:1fr 1fr`、`@media(max-width:680px)`で`grid-template-columns:1fr`に切替）。p3/p4は別方式（`.p3-prof-side`/`.p4-prof-side`＝`width:280px`→`860px`以下で`width:100%;position:static`の直接切替）、p6は`.p6-layout`（grid→`860px`以下で`display:flex;flex-direction:column`）、p5はそもそも右カラム構造（`.p2-layout`/`aside`）自体が主要ページに存在しない。**「右カラムの幅決定」はp2系グリッド（p2/p7/p8共有）・p3/p4系（直接width切替）・p6系（grid→flex切替）の3パターンに分かれており、真の意味では統一されていない**が、これは今回の切れ症状の直接原因ではなかった。
- **真因**：`.p2-layout__side`が900px以下で`display:grid`になった際、直接の子（`.p2-side-card`を持つ各サイドカード＝p7では`.p7-side-parent`/`.p7-side-author`/`.p7-side-related`、p2では`.p2-side-posted`/`.p2-side-inq`/`.p2-side-nearby`等）に`min-width:0`が設定されておらず、CSS Gridの既定「automatic minimum size（`min-width:auto`）」により、子要素の中に`white-space:nowrap`な最小内容幅（`.p7-side-related`内`.p2-article-head__item-lead`＝関連記事の1行プレビュー文）があると、そのグリッドアイテム（ひいてはトラック）がビューポート幅を超えて広がり、右カラム全体が右にはみ出して見えていた。**p2自身の同型サイドカードはたまたま長いnowrapコンテンツを持たず症状が顕在化していなかっただけで、`.p2-side-card`系共通の潜在バグ**（p2/p3/p4/p5共通定義 `kotennavi-common.css` L13347〜）だった。
- **修正**：canonical `.p2-side-card,.p3-side-card,.p4-side-card,.p5-side-card{padding:24px;background:#fff;border:1px solid var(--border)}` に `min-width:0` を追加。1箇所の修正でp2/p7/p8のサイドカードすべてが正しくグリッド内で縮小されるようになった。p3/p4/p6は別レイアウト方式（grid項目にならない）のため今回のバグの対象外だが、`min-width:0`追加自体は無害。
- **教訓**：CSS Gridの子要素は明示的に`min-width:0`を置かない限り、内容物（特に`white-space:nowrap`テキストや固定幅要素）の最小幅でトラックを押し広げてオーバーフローする。**グリッド化するコンテナ（`.p2-layout__side`等）を新設・変更する際は、直接の子に`min-width:0`（横方向グリッド/フレックスの場合）を必ず併記する**のが再発防止のルール。今回は子側（`.p2-side-card`）に一括で持たせる形で解決したが、今後新しいグリッド構造を作る場合も同様の観点で確認すること。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。「右カラム幅決定の3パターン分岐」自体の統一（p3/p4/p6をp2系グリッドへ揃えるか等）は今回のバグ修正の範囲外・別途判断。
- **影響ファイル**：`kotennavi-common.css`（`.p2-side-card,.p3-side-card,.p4-side-card,.p5-side-card`に`min-width:0`追加）。

### 2026-08-01 追補(99)（p7モバイル幅でコンテンツ↔右カラムの間隔が無い不具合＝p6を参照して`.p2-layout__main`にmargin-bottom追加）

- **経緯**：ユーザーより「p7のレスポンシブのスマホサイズで、コンテンツと右カラムの間に間隔をあけてほしい。p6参照」と指摘（追補98の右端切れ修正の直後）。
- **調査**：p6は`.p6-layout`（grid→900px以下で`display:flex;flex-direction:column`）の`.p6-col-main{margin-bottom:20px}`により、1カラム積み時にコンテンツ↔右カラムの間隔を確保している。一方p2/p7/p8が共有する`.p2-layout`は900px以下で`grid-template-columns:1fr`にするだけ（`display:grid`のまま）で、`gap:0 var(--col-gap)`のrow-gapが0のまま・`.p2-layout__main`にも間隔用marginが無く、コンテンツ直後に右カラムが密着していた。
- **修正**：`.p2-layout__main`に`@media(max-width:900px){margin-bottom:20px}`を追加（p6と同じ20pxに統一）。p2/p7/p8共有クラスのため1箇所の修正で3ページとも反映される。
- **教訓**：p6は「grid→flexへの明示的な切替＋mainのmargin-bottom」で1カラム時の間隔を確保する設計だったが、p2系（p2/p7/p8共有の`.p2-layout`）は「gridのまま列数だけ1に変更」する設計で、モバイル時の縦間隔をrow-gapにもmarginにも委ねておらず抜け落ちていた。**グリッドを1カラムへ畳む場合、row-gapが0のままだと縦積み時の間隔も0になる**ため、畳んだ後の間隔は明示的なmargin/gap上書きが必要という点を追補98と合わせて記録（同根の「モバイル畳み込み時の抜け漏れ」パターン）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`（`.p2-layout__main`に`@media(max-width:900px)`のmargin-bottom追加）。

### 2026-08-01 追補(100)（p7本文をp8同様のボックス表示へ統一＝`.p7-article`に`.p8-review`と同じ枠・背景・paddingを追加）

- **経緯**：ユーザーより「p7のコンテンツ部をp8のようにボックスに入れてほしい」と指摘。
- **内容**：p8の本文`<article class="p8-review">`は`background:var(--paper);border:1px solid var(--border);border-radius:4px;padding:var(--content-box-pad)`（`--content-box-pad`＝28px・`.p2-about`とも共通の本文ボックス変数）で囲まれた白背景カード状の枠を持つが、p7の本文`.p7-article`（`display:flex;flex-direction:column;gap:28px`のみ）は枠なしのプレーンな流し込みだった。
- **修正**：`.p7-article`に`.p8-review`と同じボックス装飾（`background:var(--paper);border:1px solid var(--border);border-radius:4px;padding:var(--content-box-pad)`）を追加し、`@media(max-width:540px)`に`.p7-article{padding:32px 20px 28px}`（`.p8-review`のモバイルpaddingと同値）を追加。既存の`display:flex;flex-direction:column;gap:28px`（本文ブロックの縦積み）はそのまま維持。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`（`.p7-article`にボックス装飾・モバイルpadding追加）。

### 2026-08-01 追補(101)（p7「掲載先」カードをヒーローから本文冒頭へ移設＝記事が何についてかを読み始めですぐわかるように）

- **経緯**：ユーザーより「p7の記事が何について書いた記事かがわかりやすくなるように、ページの一番上にある関連コンテンツカードをコンテンツに取り入れた方がいい。レイアウトはどうすればいいか」と相談を受けた。ヒーロー内`.p7-head__parent`（掲載先＝作品/展覧会/クリエイター/ギャラリーへのリンクカード）は本文を読み始める前の位置にあり、記事本文と視覚的に分離していたため、「記事の主題を本文の冒頭で明示する」目的には弱かった。提案時にヒーロー側を残したまま本文にも重複表示する案とヒーロー側を廃止する案を検討したが、ユーザーから「ヒーロー側なしの方向で」と指定を受け、完全移設で実装。
- **設計判断**：
  - 新しいカードは`.p7-article`（本文コンテナ）の最初の子とし、既存の`.p7-head__parent`の構造（サムネイル＋ラベル＋名前＋メタ情報、interestボタン等の操作要素なし）をそのまま流用・リネームした。サイドバーの`.p2-side-ec`（興味あり！ボタン付き）とは役割が異なる＝サイドの方はアクション可能な回遊カード、本文冒頭の方は「この記事の主題を示す静的なコンテキスト表示」であるため、意図的に別コンポーネントとして残した（統合すると本文内にinterestボタンが出てしまい文脈上不自然）。
  - `.p7-article`は前段（追補100）でpaper背景＋枠のボックスになっているため、カードの`background`は`var(--paper)`から`#fff`へ変更（背景と同化しないよう白背景で視認性を確保）。
  - `.p7-article`は`display:flex;flex-direction:column`のため、カードを直接子にすると既定で全幅に引き伸ばされてしまう。元のヒーロー内では`display:inline-flex`（ブロック整形コンテキスト内）でコンテンツ幅に収まっていたのと同じ見た目を保つため、`align-self:flex-start`を追加。
  - 旧`margin-bottom:18px`は削除（`.p7-article`のflex `gap:28px`が後続ブロックとの間隔を担うため、二重指定を避けた）。
- **実装**：
  1. `kotennavi-common.css`：`.p7-head__parent*`（`-thumb`/`-body`/`-label`/`-name`/`-meta`）を`.p7-article__lead*`へ全面リネーム＋上記スタイル変更。`@media(max-width:540px)`内の同名クラスも追随。
  2. `kotennavi-p7.html`：`.p7-head__inner`から`#p7HeadParent`のカードを削除。`<article class="p7-article" id="p7Article">`の最初の子として同内容を`.p7-article__lead`/`#p7ArticleLead`で追加。
  3. `kotennavi-pages.js`：デモの掲載先切替機構`P7_CONTEXTS`（`artwork`/`exhibition`/`creator`/`gallery`の4コンテキスト）が持つ`headParentHref`/`headParentHtml`フィールドを`leadHref`/`leadHtml`へリネーム（内包HTML中のクラス名も追随）。`switchP7Context()`は元々`#p7HeadParent`要素を直接書き換えていたが、その対象がHTML側で削除されたため、代わりに`#p7Article`の`innerHTML`をリードカードのマークアップ（`d.leadHref`/`d.leadHtml`から組み立て）＋`d.articleHtml`で一括生成する方式に変更。これによりコンテキスト切替の度にリードカードごと正しく再生成される（`creator`/`gallery`コンテキストではサイドバー側の親カード`sideParentHtml`が空になり非表示になるが、本文内のリードカードは4コンテキストすべてで表示される＝作品/展覧会の記事だけでなくクリエイター/ギャラリー自身のページに掲載された記事でも「どこに掲載された記事か」が本文冒頭で明示される）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`（`.p7-head__parent*`→`.p7-article__lead*`リネーム・再スタイル）、`kotennavi-p7.html`（ヒーローから削除・本文冒頭へ追加）、`kotennavi-pages.js`（`P7_CONTEXTS`フィールドリネーム・`switchP7Context()`のDOM組み立てロジック変更）。
- **【追補102で設計変更・下記参照】**：本追補で実装した「本文ボックスの最初の子として配置」は、ユーザーから「p7,p8はこの紐づけに関しては同義なのでレイアウトを揃えるべき。単に本文直前に置くのは意図として分かりにくい」との再指摘を受け、追補102で「本文ボックスの外に独立した文脈ストリップとして配置」する設計に置き換えられた。本追補のクラス名（`.p7-article__lead*`）・実装方式は追補102時点で廃止済み。経緯の記録として残す。

### 2026-08-01 追補(102)（p7/p8共通「コンテンツ紐づけ帯」`.ktn-content-lead`を新設＝追補101の設計をp7/p8共通コンポーネントへ置き換え）

- **経緯**：追補101でp7の本文ボックス（`.p7-article`）内の最初の子要素として掲載先カードを実装したが、ユーザーから「p7,p8はこの紐づけ（コンテンツが何についてのものかを示す関係）に関しては同義だと思うので、両方はレイアウトを揃えた方がいい。単に上部にあったカードをコンテンツの直前に表示するのはやはり意図としてはわかりにくい」と再指摘を受けた。p8のレビューも`.p8-head__parent`という同種の「このレビューは展覧会Xについて」カードをヒーロー内に持っており、p7の記事同様「コンテンツが何について書かれたものかを示す紐づけ」という同一の役割を持つコンポーネントだったため、両ページ共通の設計に立て直した。
- **設計判断**：
  - 「本文ボックスの最初の子として本文と同じ枠内に置く」＝視覚的に本文の一部（最初の段落やブロック）に見えてしまい、なぜそこにあるのかが伝わりにくい、という指摘を踏まえ、**本文ボックス（`.p7-article`/`.p8-review`）の外側・`.p2-layout__main`内でボックスの直前**に独立した文脈ストリップとして配置する設計に変更。「本文の一部」ではなく「本文に前置される文脈情報（メタデータ）」であることを構造的に分離して示す。
  - ストリップは2段構成：①見出しラベル（`.ktn-content-lead__label`＝「この作品の記事」「この展覧会のレビュー」等、紐づけの種類を表す文言。元は追補101でカード内バッジ横に添えていたテキストを、カードの「上」に独立させて昇格した）→②サムネイル＋バッジ付き名前＋メタのカード（`.ktn-content-lead__card`）。ラベルが先に「これは何の情報か」を宣言し、その下にカードが続く構成にすることで、単体で意味の通る文脈提示になる。
  - p7・p8は同一の役割（コンテンツの紐づけ先を示す）を持つため、ページ固有クラス（`.p7-*`/`.p8-*`）ではなく**共通canonical `.ktn-content-lead`**として`kotennavi-common.css`に1箇所定義し、両ページで同一クラス・同一構造を使い回す（CLAUDE.mdの「CSSは共通化徹底」原則に沿う）。
  - カードの背景は`#fff`を維持（本文ボックスがpaper背景のため対比を保つ）。ボックス外に出したことで`.p7-article`のflexコンテキストに縛られなくなり、追補101で必要だった`align-self:flex-start`のハックは不要になった（`.p2-layout__main`は素のブロック要素のため、`inline-flex`カードは自然にコンテンツ幅で収まる）。
- **実装**：
  1. `kotennavi-common.css`：`.ktn-content-lead`（`__label`/`__card`/`__thumb`/`__body`/`__name`/`__meta`）をcanonicalとして新設。旧`.p8-head__parent*`・追補101の`.p7-article__lead*`は削除。
  2. `kotennavi-p7.html`：本文ボックス内に入れていたカードを撤去し、`.p2-layout__main`内・`<article class="p7-article">`の直前に`.ktn-content-lead`（`#p7ContentLead`/`#p7LeadLabel`/`#p7LeadCard`）を新設。
  3. `kotennavi-p8.html`：ヒーローの`.p8-head__parent`カードを削除し、`.p2-layout__main`内・`<article class="p8-review">`の直前に`.ktn-content-lead`を追加（p8は掲載先切替デモを持たないため静的HTMLのみ）。
  4. `kotennavi-pages.js`：`P7_CONTEXTS`（artwork/exhibition/creator/gallery全4種）に`leadLabel`（見出しラベル文言）フィールドを追加し、`leadHtml`はカード本体（サムネイル＋バッジ付き名前＋メタ）のみに簡素化。`switchP7Context()`は`#p7LeadLabel`のテキストと`#p7LeadCard`のhref/innerHTMLを更新するよう変更し、本文`#p7Article`への注入処理（追補101で追加）は撤回して元通り`d.articleHtml`のみを流し込む単純な形に戻した。
- **教訓**：「関連性の高い情報を本文に近づける」という目的だけでは配置の仕方までは決まらない。**「本文の一部に見える配置」と「本文に前置される独立した文脈情報に見える配置」は似て非なるもの**で、後者を狙う場合は本文ボックスの外に出し、見出しラベルで「これは何の情報か」を明示する方が意図が伝わる。また、同種の役割を持つコンポーネントが複数ページ（p7/p8）に存在する場合、一方だけを修正するのではなく共通化を先に検討するべき（CLAUDE.mdの原則どおり）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`（`.ktn-content-lead`新設・旧`.p8-head__parent*`/`.p7-article__lead*`削除）、`kotennavi-p7.html`（本文ボックス内カード撤去・ボックス直前に文脈ストリップ追加）、`kotennavi-p8.html`（ヒーローからカード削除・ボックス直前に文脈ストリップ追加）、`kotennavi-pages.js`（`P7_CONTEXTS`に`leadLabel`追加・`switchP7Context()`のDOM組み立てロジック変更）。
- **【追補103で比較のため差し替え・下記参照】**：本追補の「代替案」（本文ボックス外の独立ストリップ＋サムネイル付きカード）をユーザーに見せた後、「推奨案も見せてほしい」との依頼を受け、追補103で「ヒーロー内・タイトル直上のテキスト行（キッカー）」案に一旦差し替えた。本追補のクラス名（`.ktn-content-lead*`）は追補103時点でCSS/HTML/JSから撤去済み。どちらを採用するかはユーザー確認待ち（経緯の記録として残す）。

### 2026-08-02 追補(103)（p7/p8共通「ヒーロー・キッカー行」`.ktn-hero-kicker`を新設＝追補102のカード案と比較するため推奨案を実装）

- **経緯**：追補102の「コンテンツ紐づけ帯」`.ktn-content-lead`（代替案＝本文ボックス外の独立ストリップ＋サムネイル付きカード）をユーザーに提示した後、「推奨案も見せてほしい」との依頼を受けた。当初の2案提示時点で推奨案としていたのは「ヒーロー内・タイトル直上に、サムネイルなしの軽量なテキスト行（キッカー）を配置する」案だったため、これを実装して比較材料とした。
- **設計判断**：
  - キッカーは1行のテキストのみで構成：バッジ（対象種別を示す`.cb`）＋リンク化した対象名＋「についての記事/レビュー」という定型サフィックス。サムネイルやカード枠は持たない＝視覚的な重さを最小限にし、タイトルの前にさらりと前置きするだけの軽量な情報として扱う。
  - 配置は`.p7-head__inner`/`.p8-head__inner`の最上部・種別バッジ行（`.p7-head__badges`/`.p8-head__badges`）の直前。「この記事/レビューが何についてのものか」を、記事自体の種別バッジ・タイトルより前に読ませることで、追補102のねらい（本文を読む前に主題を把握できる）と同じ効果をヒーロー内で実現する。
  - 対象名のリンクは**カード全体ではなくテキストリンク**（hoverで下線）。エンティティ名単体へのリンクには末尾「→」を付けないという既存ルール（`feedback_arrow_navigation.md`＝矢印は明示ナビCTAのみ・カード全体/エンティティ名リンクはhover affordanceで示す）に従った。
  - p7・p8共通のcanonicalコンポーネントとして`kotennavi-common.css`に1箇所定義（`.ktn-hero-kicker`/`__link`）。追補102の`.ktn-content-lead*`は本設計に置き換えたため撤去した（両案を同時に常設せず、依頼のたびに実装を差し替える運用とした＝デモ環境上の判断であり、最終的にどちらを採用するかは未確定）。
- **実装**：
  1. `kotennavi-common.css`：`.ktn-content-lead*`一式を削除し、`.ktn-hero-kicker`/`.ktn-hero-kicker__link`をcanonicalとして新設（同じ挿入位置＝p8ヘッド直後）。
  2. `kotennavi-p7.html`：`.p2-layout__main`内の`.ktn-content-lead`ストリップを削除。`.p7-head__badges`の直前に`.ktn-hero-kicker`（`#p7Kicker`/`#p7KickerBadge`/`#p7KickerLink`/`#p7KickerSuffix`）を新設。
  3. `kotennavi-p8.html`：`.p2-layout__main`内の`.ktn-content-lead`ストリップを削除。`.p8-head__badges`の直前に`.ktn-hero-kicker`（静的HTML、掲載先切替デモを持たないため固定値）を新設。
  4. `kotennavi-pages.js`：`P7_CONTEXTS`（artwork/exhibition/creator/gallery全4種）の`leadHref`/`leadLabel`/`leadHtml`フィールドを`kickerBadgeClass`/`kickerBadgeLabel`/`kickerHref`/`kickerName`/`kickerSuffix`に置き換え。`switchP7Context()`は`#p7KickerBadge`のclassName/textContent・`#p7KickerLink`のhref/textContent・`#p7KickerSuffix`のtextContentを更新するよう変更。
- **保留事項**：ブラウザでの目視確認・追補102（カード型）と本追補（テキスト行型）のどちらを採用するかの最終判断は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`（`.ktn-hero-kicker`新設・旧`.ktn-content-lead*`削除）、`kotennavi-p7.html`（本文ボックス外ストリップ撤去・ヒーロー内にキッカー行追加）、`kotennavi-p8.html`（同上）、`kotennavi-pages.js`（`P7_CONTEXTS`フィールド差し替え・`switchP7Context()`のDOM組み立てロジック変更）。
- **【追補104で最終決定・下記参照】**：ユーザーへ本追補（キッカー行）と追補102（カード）を見比べてもらった結果、「さりげなくてデザイン的にいいが、前の直前のカードのほうがやはり直感的でわかりやすい」とのフィードバックで**追補102のカード案が最終採用**となり、本追補の`.ktn-hero-kicker`は撤回された。経緯の記録として残す。

### 2026-08-02 追補(104)（p7/p8「コンテンツ紐づけ帯」最終決定＝`.ktn-content-lead`カード案を採用・`.ktn-hero-kicker`テキスト行案は撤回）

- **経緯**：追補102（カード＝本文ボックス外の独立ストリップ＋サムネイル付きカード）と追補103（キッカー＝ヒーロー内・タイトル直上のテキスト行）の両方を実装し、ユーザーに見比べてもらった。ユーザーからのフィードバックは「さりげなくてデザイン的にいいが、前の直前のカードのほうがやはり直感的でわかりやすい」——キッカー行のデザイン的な軽さ・上品さは評価しつつも、**直感的なわかりやすさではサムネイル付きカードに軍配が上がる**という判断だった。
- **結論**：p7/p8共通「コンテンツ紐づけ帯」は**`.ktn-content-lead`（本文ボックス外・独立ストリップ＋サムネイル付きカード）に確定**。`.ktn-hero-kicker`は撤回し、CSS/HTML/JSから削除した。
- **教訓**：デザインの洗練度（さりげなさ）と情報の伝わりやすさ（直感性）はトレードオフになりうる。今回のようなナビゲーション性を持つ文脈情報（「このコンテンツは何についてのものか」）は、視覚的な軽さよりも**サムネイル画像による具体性**（見ればそれが何かひと目でわかる）が優先される場面があると確認できた。今後同種の「紐づけ表示」を設計する際は、まずサムネイル付きカード案を基本形として検討し、軽量化（テキスト行化）は明確な理由がある場合のみ選択する。
- **実装**：
  1. `kotennavi-common.css`：`.ktn-hero-kicker*`を削除し、`.ktn-content-lead*`（追補102と同一定義）を復元。
  2. `kotennavi-p7.html`：ヒーロー内の`.ktn-hero-kicker`を削除。`.p2-layout__main`内・`<article class="p7-article">`の直前に`.ktn-content-lead`（`#p7ContentLead`/`#p7LeadLabel`/`#p7LeadCard`）を復元。
  3. `kotennavi-p8.html`：ヒーロー内の`.ktn-hero-kicker`を削除。`.p2-layout__main`内・`<article class="p8-review">`の直前に`.ktn-content-lead`を復元。
  4. `kotennavi-pages.js`：`P7_CONTEXTS`（artwork/exhibition/creator/gallery全4種）を`kickerBadgeClass`/`kickerBadgeLabel`/`kickerHref`/`kickerName`/`kickerSuffix`から`leadHref`/`leadLabel`/`leadHtml`フィールドへ復元。`switchP7Context()`も`#p7LeadLabel`のテキストと`#p7LeadCard`のhref/innerHTMLを更新する形に戻した。
- **本件の最終状態（今後参照する場合はこの追補が正）**：p7/p8の「コンテンツ紐づけ帯」＝`.ktn-content-lead`（本文ボックス外・`<article>`直前・見出しラベル＋サムネイル付きカード）。追補101（本文内配置）・追補103（キッカー行）は不採用として履歴に残す。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.css`（`.ktn-hero-kicker*`削除・`.ktn-content-lead*`復元）、`kotennavi-p7.html`（キッカー削除・本文ボックス外ストリップ復元）、`kotennavi-p8.html`（同上）、`kotennavi-pages.js`（`P7_CONTEXTS`フィールド復元・`switchP7Context()`のDOM組み立てロジック復元）。

### 2026-08-02 追補(105)（p7「N人が興味あり！」をp6同様のウォッチャーモーダルに接続）

- **経緯**：ユーザーから「p7の右カラムのCTAボタンの下のxx人確認しましたをp6の同箇所と同じモーダル表示にして下さい」と指摘。調査の結果、対象は`.p2-action-widget`内の「N人が興味あり！」件数表示（`.p2aw-stat`）だった。p6（作品ページ）はここに`p2aw-stat--link`クラス＋`onclick="openWatcherModal()"`が付いており、クリックすると`kotennavi-common.js`の全ページ共通モーダル（`_ensureWatcherOverlay`/`openWatcherModal`/`closeWatcherModal`）が開き、興味あり！/ウォッチしたユーザーの一覧（アバター・氏名・watch/checkin/interest件数）を表示する。p7（記事ページ）は同じ見た目だがこのクラス・onclickが欠けており、クリックしても反応しなかった。
- **結論**：p7の`.p2aw-stat`（`#p7IntNum`を含む）にp6と同一の`p2aw-stat--link`クラス＋`onclick="openWatcherModal()"`＋`role="button" tabindex="0"`を追加し、同じモーダルが開くようにした。
- **なぜJS実装の追加が不要だったか**：`openWatcherModal()`はp2/p2-1〜5/p3/p3-1〜3/p4/p4-1〜2/p6/p6-1〜2など既に多数のページで使われているページ非依存の共通関数で、対象ウィジェットを`.ktn-cta-widget`/`.p2-action-widget`のセレクタで汎用的に探す作りになっている。一覧データも`window.KTN_CTA_WATCHERS`（ページ側で未定義なら共通フォールバック`_W_DATA`）を参照するため、p7側で新たに定義する必要がなかった。p8（レビューページ）は同種の「興味あり！」ウィジェットを持たない（「参考になった」ボタンのみ）ため対象外。
- **実装**：`kotennavi-p7.html`の`#p7CtaWidget`内、`<div class="p2aw-stat">`を`<div class="p2aw-stat p2aw-stat--link" onclick="openWatcherModal()" role="button" tabindex="0">`に変更（1箇所のみ）。CSS・JS（common.js/pages.js）は変更なし。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p7.html`のみ。

### 2026-08-02 追補(106)（記事管理をP3-19/P2-13/P4-19/P6-15の4画面フルCRUDに決定・P3-19を新規作成）

- **経緯**：記事（作品/展覧会/クリエイターページ/ギャラリーページの4か所から作成できる）の管理画面をどう設計するか相談。1画面へ統合する案（例：全記事を横断する単一の記事管理ハブ）も検討したが、ユーザーは「4画面CRUD画面にします。まずp3-19の作成をお願いします。確認出来たらほかに展開します。」と明確に決定。sitemap.md記載のP3-19（クリエイター-記事管理）/P2-13（展覧会-記事管理）/P4-19（ギャラリー-記事管理）/P6-15（作品-記事管理）を、それぞれ「ページオーナー視点で自分の記事を一覧・編集・削除する」独立したフル管理画面として作る方針。まずP3-19を作成し、ユーザー確認後に残り3画面へ展開する（本追補時点ではP3-19のみ完了・他3画面は未着手）。
- **P3-19の構造決定**：`kotennavi-p3-14.html`（クリエイター-ポートフォリオ管理）を構造テンプレートとして採用。理由＝「identity strip→mgmt-head→新規CTA→注記→ツールバー→一覧→削除モーダル」という管理系一覧ページの型が既に確立済みで、記事管理も同じ型に当てはまるため。ただしp3-14と異なり以下は省略：
  - **公開/非公開スイッチ**：記事にはpub/unpubトグルの前例が無い（リポジトリ全体をgrepしても「記事の非公開」概念は存在しない）。記事は下書き（未完成・非公開・検索対象外）→公開（完成・掲載）の一方向のみで、完成後に非公開へ戻す運用は無いと判断。
  - **タブ（登録済み/売約済 相当）・詳細アコーディオン（出品歴/オーナーメモ）**：記事の掲載先（作品/展覧会/クリエイターページ/ギャラリーページ）は作成元で自動確定し事後変更不可（p7-11の設計で確定済み）。作品のような「複数回出品する・出品歴が積み上がる」概念が記事には無いため、タブ分岐も出品歴アコーディオンも不要。掲載先は一覧の各行に1行（`.p319-item__dest`）で表示するのみ。
- **CSS共有ネームスペース**：p3-14/p4-14が`.p314-*`を共有ネームスペースとして使う前例（後続ページが同一クラスをそのまま再利用する設計）に倣い、P3-19のCSSクラスは`.p3-19-*`ではなく`.p319-*`とした。P2-13/P4-19/P6-15を作る際も同じ`.p319-*`をそのまま再利用する想定（`kotennavi-common.css`内のコメントに明記）。
- **デモデータの整合**：`kotennavi-p7-11.html`の記事作成/編集/クローンフォームが持つ`P711_ENTRY`（4エントリーポイントのデモデータ）と記事ID・タイトル・日付を一致させた（`AT-C42-0031`＝作品《オノマトペの庭》制作日記、`AT-A18-0044`＝展覧会レポート、`AT-B05-0012`＝クリエイターページ単独インタビュー）。p3-19の一覧からp7-11への遷移リンクは`kotennavi-p7-11.html?mode=new|edit|clone&author=tanaka&self=1&article={id}`（p3-14の`p611Link`と同型の`p711Link`ヘルパー）。
- **`.ktn-aw-id`の再利用**：クラス名は"aw"（artwork）だが、既にp3-15/p3-16/p4-15/p4-16/p5-14/p5-15/typography.htmlで汎用的なエンティティID表示として再利用されている前例を確認済みのため、記事ID（`AT-xxx`）表示にもそのまま流用（新規クラスを作らない）。
- **実装ファイル**：`kotennavi-p3-19.html`（新規）、`kotennavi-common.css`（`.p319-*`ブロック新設）、`kotennavi-pages.js`（`KTN.pages['p3-19']`新設）、`docs/sitemap.md`（P3-19行を`未作成`→`調整中`、ファイル名を反映）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。ユーザー確認後にP2-13/P4-19/P6-15へ同方式で展開予定（それまでは着手しない）。
- **影響ファイル**：`kotennavi-p3-19.html`、`kotennavi-common.css`、`kotennavi-pages.js`、`docs/sitemap.md`、`docs/progress.md`。

### 2026-08-02 追補(107)（記事の「掲載先」二重表示モデルを明確化＝作品発記事もp3-2/p4-2に掲載されるよう`.exh-link`を汎用化）

- **経緯**：P3-19確認中にユーザーから「一つ認識を合わせる必要があります。展覧会・作品から作成された記事はクリエイター・ギャラリーページにも掲載されます。その場合、記事カードの中に展覧会名・作品名が表示されます」と指摘。P3-19実装時点では「記事の掲載先は作成元1つに確定し変更不可」（追補106）という理解だったが、これは「作成元」の話であり、**表示先（どこに掲載されるか）は別の軸**だった：展覧会/作品から作成された記事は、その展覧会/作品ページに掲載されるのに**加えて**、著者（クリエイター/ギャラリー）自身の記事一覧ページ（p3-2/p4-2）にも常に二重掲載される。
- **既存実装の棚卸し**：`kotennavi-common.css`の`.exh-link`コンポーネント（記事カード共通展覧会リンク）がこの「展覧会発記事の二重掲載」を既に実装済みだったことを確認（p3-2.html/p4-2.htmlの`.lc`カード内に`<span class="exh-link"><span class="exh-link__title">展覧会名</span></span>`＝カード内リンクとして展覧会名を表示）。ただし**作品発の記事には対応する仕組みが無かった**：(1) `.exh-link::before{content:'展覧会'}`が展覧会専用にハードコードされ作品ラベルの選択肢が無い、(2) `#p3FilterDest`/`#p4FilterDest`（掲載先フィルター）に「作品ページ」の選択肢が存在しない、(3) 作品発記事のデモカード自体がp3-2/p4-2のどちらにも存在しない。
- **確認と承認**：p3-2.html/p4-2.htmlはsitemap.mdで「Fix済」のため、既存の確定ページに手を入れる前にユーザーへ確認。ユーザーから「そうです、私も今確認してお願いしようと思っていたところ。進めて下さい」と明示的な承認を得て実施。
- **対応（class名は変更せずモディファイアで汎用化＝影響範囲を最小化）**：
  1. `kotennavi-common.css`：`.exh-link--artwork::before{content:'作品'}`を`.exh-link::before`直後に追加。既存の`.exh-link`/`.exh-link__title`はそのまま維持（p3-2.html/p4-2.html/kotennavi_cards_content.htmlの3ファイルのみが対象で、`.rc__exh-link`/`.ac__exh-link`/`.p6-liaison__exh-link`/`.p515-aw-card__exh-link`など類似名の無関係クラスは対象外と確認済み）。
  2. `kotennavi-p3-2.html`：`#p3FilterDest`に`<option value="artwork">作品ページ</option>`追加。2026年グループに作品発デモ記事「オノマトペの庭 制作について」（`data-dest="artwork" data-category="diary"`・田中透名義・`.exh-link--artwork`で《オノマトペの庭》へリンク）を追加——このIDはP3-19/p7-11で既出のAT-C42-0031と同一記事として整合させた（追補106のクロスページ整合パターンを継続）。件数表示（年グループ5→6件、`#p3TotalCount`全8→9件）を更新。
  3. `kotennavi-p4-2.html`：`#p4FilterDest`に同オプション追加。2026年グループにギャラリー発の作品関連デモ記事「《オノマトペの庭》について — ギャラリーノート」（Gallery SOIL 渋谷名義・同作品にリンク）を追加——venue/作品/展覧会の既存関係（「あなたが知らないオノマトペ」展＠Gallery SOIL渋谷＝《オノマトペの庭》出品）に整合する新規デモデータとして作成。件数表示（年グループ5→6件、`#p4TotalCount`全7→8件）を更新。p3-2.htmlとボタン実装が異なる点（p4-2は`itn-btn`＋`this.classList.toggle`、p3-2は`ktn-icon-btn`＋`data-action="interest"`）はこのページの既存パターンをそのまま踏襲（統一はスコープ外）。
  4. JS変更なし：`kotennavi-pages.js`の`KTN.pages['p3-2']`/`KTN.pages['p4-2']`の掲載先フィルターは`card.dataset.dest`との汎用比較のため、`data-dest="artwork"`の追加のみで自動的にフィルター対象になることを事前に読んで確認済み。
  5. `kotennavi_cards_content.html`（デモ専用の参照ファイル）への`.exh-link--artwork`例追加は優先度が低いため今回は見送り（本番2ファイルの整合を優先）。同ファイルは`.exh-link__arrow`という本番未使用の装飾spanを持つ既存の差異があるが、これも今回のスコープ外として据え置いた。
- **今後の含意**：P2-13（展覧会-記事管理）/P6-15（作品-記事管理）を作る際、そこで作成された記事は同様に著者のp3-2/p4-2へ二重掲載される前提でカードデータ・フィルターを設計する必要がある。
- **影響ファイル**：`kotennavi-common.css`、`kotennavi-p3-2.html`、`kotennavi-p4-2.html`、`docs/progress.md`。

### 2026-08-02 追補(108)（CTAウィジェットのリード文言をtype別に分岐＝作品/記事は「my興味あり！」、展覧会は「my展覧会カレンダー」のまま。p5/p5-3へのリンク化＋ゲストログインモーダル対応）

- **経緯**：ユーザーから「p6,p7の右カラムのCTAセクションの『my展覧会カレンダー』を『my 興味あり！』に変更してください。作品・記事は展覧会カレンダーに表示することはないため」＋「この各ページの右カラムのCTAセクションの『my展覧会カレンダー・my興味あり!』にp5,p5-3へのリンクを付けられるか（ゲストユーザーはCTAボタン押したときと同じようにログインモーダルが出る）」と依頼。
- **調査で判明した実装形態**：p6/p6-1/p6-2/p7それぞれのHTMLに文言はハードコードされておらず、`kotennavi-common.js`の`KTN.cta._injectLead()`が`.p2-action-widget`の`data-cta-type`（`exhibition`/`work`/`article`/`creator`/`gallery`）と`data-cta-action`（`watch`/`interest`）から動的生成する**全ページ共通コンポーネント**（`.p2-action-widget__lead`）である。従来コードは`action==='interest'`の場合、typeに関わらず一律「興味あり！マークでmy展覧会カレンダーに追加！」を出力していた。
- **なぜ誤りか**：`kotennavi-p5.html`（myカレンダー）のフィルターボタン（`data-filter="interest"`）で興味あり！マーク済みアイテムが表示される対象は**展覧会のみ**（カレンダーは日付を持つ展覧会向けの機能で、作品・記事には日付概念が無いため掲載されない）。作品（p6系）・記事（p7）で興味あり！マークした場合の実際の行き先は`kotennavi-p5-3.html`（興味あり！リスト）であり、文言と実際の遷移先が一致していなかった。
- **対応（`kotennavi-common.js`の`_injectLead()`1箇所のみ変更・共通コンポーネントのため対象ページのHTML変更は不要）**：
  - `type==='exhibition'` → ラベル「my展覧会カレンダー」・リンク先`kotennavi-p5.html`（従来どおり、変更なし）
  - それ以外（`work`＝作品／`article`＝記事、将来追加されうる他typeも同様）→ ラベル「my興味あり！」・リンク先`kotennavi-p5-3.html`
  - ラベルを`<a class="p2-action-widget__lead-link">`として生成。クリック時、ゲスト（`window.ktnState.role==='guest'`）は`preventDefault()`＋`KTN.action.show(action)`でCTAボタン押下時と同一のログインモーダル（`#ktnAuthModal`）を表示。ログイン済みユーザーは通常のリンク遷移。
  - `kotennavi-common.css`：`.p2-action-widget__lead-link{color:var(--accent);text-decoration:underline;...}`＋hover（`--accent-d`）を新規追加（`.p2-action-widget__lead`の最終定義＝L13614付近、直後）。
- **なぜwatch分岐は対象外か**：`action==='watch'`（p3/p3-1/p3-3・p4/p4-1/p4-2＝creator/gallery）のリード文は「○○をウォッチして最新情報を受取る！」であり、「myカレンダー/興味あり！」の文言自体を持たないため今回の分岐ロジックと無関係（別のif分岐で処理済み）。
- **横展開の範囲**：p6/p6-1/p6-2（work）・p7（article）が今回のユーザー依頼の直接対象だが、共通関数を直したためp2系（exhibition＝interest action）も自動的に同じコードパスを通る。ただしexhibitionは従来と同じ文言・リンク先のため**p2系の見た目・挙動に変化なし**（既に「my展覧会カレンダー」が正しかったケース）。
- **React化時**：`<ActionWidget type actionLabel actionHref>`のように、typeから文言・リンク先を導出するマッピングをコンポーネント内に持たせる（ページ側で分岐しない）。ゲスト時のモーダル表示はCTAボタンと共通の認証ゲート関数を再利用する。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.js`、`kotennavi-common.css`、`docs/progress.md`。

### 2026-08-02 追補(109)（p6デモバーのロール切替が共通CTAウィジェットに反映されないバグを修正＝ページ固有`setR`がレガシー`KTN.role`しか更新せず`window.ktnState.role`が取り残されていた）

- **経緯**：ユーザー報告「p6のデモバーで『ユーザー』に切り替えてもゲストと同じ動きだった（CTAボタンを押してもログインモーダルが出る）」。
- **原因**：`kotennavi-pages.js`の`_p6Init`（p6/p6-1/p6-2共有）はページ固有の`setR(role,btn)`を持ち、これが共通`kotennavi-common.js`側の`window.setR`（`window.ktnState.role`＝`curRole`を更新する版）をページ内で完全に上書きしていた。p6固有`setR`はレガシー変数`KTN.role`のみを更新し、`renderHeaderActs()`/`renderActionArea()`/`renderComments()`（いずれも`KTN.role`を参照する`isLoggedIn()`/`isOwner()`/`isAdmin()`経由）だけを再描画していた。
- **一方**、CTAウィジェット（`.p2-action-widget`/`.ktn-cta-widget`）のボタンは`kotennavi-common.js`の`initCtaButtons()`が初期表示時にinline onclickを剥がし`KTN.action.handle(btn,action)`へ結線する。この`KTN.action.handle`が実際にゲスト判定するのは`window.ktnState.role`であり、p6固有`setR`はここを一切更新しないため、デモバーで何度ロールを切り替えても共通CTAボタンの判定は初期値（実質`guest`）のまま変化しなかった。p6独自のヒーロー内「興味あり！」ボタン（`favShareRow()`／`toggleInterest()`）は同じ`KTN.role`を見ているため正常に動いており、共通CTAウィジェット側だけがこの二重管理から取り残されていた形。
- **対応**：`kotennavi-pages.js`のp6固有`setR(role,btn)`に`window.ktnState.role = role;`を1行追加し、レガシー`KTN.role`と共通`window.ktnState.role`を同時更新するようにした。`KTN.role`依存の既存ロジック（`isOwner()`等）はそのまま維持しつつ、共通CTA機構とも同期させる最小差分の修正。
- **教訓（横展開時の注意）**：ページ固有コードが`window.setR`/`window.curRole`等のグローバル関数・状態を独自定義で上書きする場合、共通コンポーネント（CTAウィジェット・ヘッダー等）が参照する状態（`window.ktnState.role`）も必ず同期させること。同種の「ページ固有`setR`によるグローバル上書き」パターン（p6-2の`_prevSetR`ラップ等）が他にないか、今後同様の不具合報告があれば同じ観点で調査する。
- **React化時**：ロール状態は単一のグローバルストア（Context/Redux等）に一本化し、ページ固有コードがロール切替関数を独自実装・上書きしない設計にする（本バグはHTML/JS分離ゆえの状態二重管理が原因のため、コンポーネント化で自然に解消される想定）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-pages.js`、`docs/progress.md`。

### 2026-08-02 追補(110)（p3/p4系CTAリード文言の`watch`分岐にも「my展覧会カレンダー」リンクを追加＝追補108のinterest分岐と対の対応）

- **経緯**：追補108（作品/記事のリード文言をmy興味あり！に分岐）の対応後、ユーザーから「p3,p4の表示系も同様に右カラムのCTAセクションにmy展覧会カレンダーと表示してリンクを付けてほしい」と依頼。
- **対応**：`kotennavi-common.js`の`KTN.cta._injectLead()`、`action==='watch'`分岐（p3/p3-1/p3-3・p4/p4-1/p4-2＝creator/gallery対象）に「{name}をウォッチすると<br>my展覧会カレンダーで<br>最新情報を受取れる！」を追加し、ラベルを`<a class="p2-action-widget__lead-link" href="kotennavi-p5.html">`として生成するよう変更（従来は「○○をウォッチして最新情報を受取る！」のみでリンクなし）。
- **ゲスト時の挙動は追補108と共通の仕組みをそのまま再利用**：`_injectLead()`末尾でif/elseブロックの外に出た共通処理が、生成された`.p2-action-widget__lead-link`へ`action`変数（この場合`'watch'`）を使ったclickハンドラを結線するため、`watch`分岐追加にあたり新規のイベント結線コードは不要だった。ゲストは`preventDefault()`＋`KTN.action.show('watch')`でログインモーダル（`DEFAULT_AUTH`の汎用文言＝`watch`専用の`ACTION_AUTH`エントリは無く、フォールバックで問題ない内容と判断）を表示。
- **横展開の範囲**：`_injectLead()`は1関数のため、p3/p3-1/p3-3・p4/p4-1/p4-2の計6ページに個別HTML変更なしで自動反映。
- **React化時**：追補108と同一の`<ActionWidget type action actionLabel actionHref>`設計に含める（`action==='watch'`時も`actionHref`をコンポーネント内マッピングで導出）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-common.js`、`docs/progress.md`。

### 2026-08-02 追補(111)（管理一覧の共通ページング`.ktn-pagination`/`KTN.pagination`を新設＋p3-14/p4-14/p3-19へ適用）

- **経緯**：ユーザーからp3-14/p4-14（作品数が多くなった場合の一覧表示）について「インフィニットスクロールとページングどちらがよいか」と質問。並べ替え機能を併用する管理一覧では、並べ替え後にスクロール位置がリセットされる／件数把握がしにくいインフィニットスクロールより番号ページングの方が適すると回答し了承を得た上で、「後工程のためにp3-14,p4-14,p3-19にそれぞれページングを実装してください」と依頼された。
- **新規共通コンポーネント**：既存コードベースには件数バッジ・回遊リンク（`.ktn-more-link`）はあったが、番号式ページングは今回が初導入。
  - `kotennavi-common.css`：`.ktn-pagination`（前へ/番号/省略記号「…」/次へ。active＝`var(--page-accent,var(--accent))`塗り＋白文字、hover＝枠線とテキストがpage-accent化、disabled＝opacity .35）。
  - `kotennavi-common.js`：`KTN.pagination.render(el,{page,totalPages,onGoto})`。`totalPages<=1`なら`el.hidden=true`で自動的に非表示（1ページしかない一覧ではUIを出さない）。表示ページ番号は「先頭・末尾・現在±1」のみで残りは「…」省略（ページ数が増えても横に伸びすぎない設計）。クリックは`onGoto(pageNumber)`を呼ぶだけで、実際の再描画はページ側`render()`に委譲する薄いプレゼンテーション層。
- **各ページ側の実装パターン（3ページ共通）**：`render()`内で絞り込み・並べ替え後の全件配列から下書き件数・ゼロ状態を算出した**後**、`PER_PAGE=5`件ずつ`Array.slice`で切り出してDOM描画。フィルタ/並べ替え/タブ切替は`renderReset()`（`page=1`にしてから`render()`）に差し替え、削除・メモ保存等の操作起点の再描画は従来どおり`render()`を直接呼ぶ（`totalPages`超過時に`page`を自動クランプするため、削除で現在ページが空になっても前ページへ自然に戻る）。
- **なぜ`.ktn-more-link`と別物か**：`.ktn-more-link`は関連・回遊ゾーンの「もっと見る→」のようなブロック型の一方向遷移リンクで、一覧の総ページ数やページ間移動という概念を持たない。今回はフィルタ・並べ替えと組み合わせて同一ページ内のデータセットをページ切り替えする必要があり、既存コンポーネントの流用ではなく新規コンポーネントが必要だった。
- **横展開**：p3-14/p4-14/p3-19の3ページの`<nav class="ktn-pagination" id="{page}Pagination">`をゼロ状態直後・`.ktn-mgmt-wrap`終了直前に追加。今後PER_PAGE超の一覧を持つ管理ページ（P2-13/P4-19/P6-15等・記事管理の横展開先）でも同じHTML＋JSパターンをコピーする想定。
- **React化時**：`<Pagination page totalPages onGoto>`。ページ側は表示用スライスのみ担当し、コンポーネント自体はページ番号生成ロジック（先頭/末尾/現在±1＋省略記号）を内包する。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。デモデータ件数は現状PER_PAGE(5)を超えないページもあるため、複数ページにまたがる表示の確認は件数を一時的に増やすかページネーション自体のロジックレビューで代替する必要がある。
- **影響ファイル**：`kotennavi-common.css`、`kotennavi-common.js`、`kotennavi-pages.js`、`kotennavi-p3-14.html`、`kotennavi-p4-14.html`、`kotennavi-p3-19.html`、`docs/progress.md`。

### 2026-08-02 追補(112)（記事管理4画面CRUDをP2-13/P4-19/P6-15へ展開＝追補106のP3-19方式を残り3ページへ横展開・PAGES欠落バグも修正）

- **経緯**：追補106でP3-19（クリエイター-記事管理）を確認後、ユーザーから「了解です。ではこれp3-19を残りの記事管理の3ページに展開してください」と依頼。P3-19のCRUD構造・`.p319-*`CSSクラスをそのまま流用し、P2-13（展覧会-記事管理）/P4-19（ギャラリー-記事管理）/P6-15（作品-記事管理）を新規作成。
- **単一エンティティ・スコープ付き一覧（P2-13/P6-15）は掲載先フィルター・掲載先行を省略**：P3-19/P4-19は著者（クリエイター/ギャラリー）が持つ全記事を横断する一覧のため「掲載先＝作品/展覧会/自ページ」を区別するフィルター・カード内表示行が必要だが、P2-13/P6-15は「この展覧会/この作品に掲載された記事だけ」を表示するスコープ付き一覧であり、掲載先は常に一定（展覧会 or 作品自身）。掲載先フィルター（`#p213FilterDest`/`#p615FilterDest`相当）と記事カードの`.p319-item__dest`行を持たせない設計とした（`makeItem()`から`destHtml`生成ロジックごと省略）。ヘッド説明文に「あなたが投稿したすべての記事を一元管理するには 記事管理（すべて）→」でP3-19へのクロスリンクを追加し、全体管理はP3-19側に一本化されていることを明示。
- **P4-19はP3-19と完全ミラー＋ラベル差し替えのみ**：ギャラリーはクリエイターと同じ「複数エンティティ横断」の記事一覧を持つため、掲載先フィルター込みでP3-19の構造をそのまま複製。唯一の差分は記事種別`c`のラベルで、`kotennavi-p7-11.html`の`P711_ENTRY`/`p711SyncRoleFields(role)`がロール別に`c`タイプのラベルを「制作日記」（creator）/「ギャラリーノート」（gallery）で出し分けている前例に合わせ、P4-19の`TYPE.c.label`を「ギャラリーノート」にした。
- **記事の投稿主体はロール本体のみ**：p7-11の`window.p711RoleSync`を確認し、記事の著者は常にページ自身のロール識別（creator=田中透、gallery=Gallery SOIL 渋谷）に固定され、ギャラリー在籍の個別作家（高橋信等）が記事著者になることは無いと確認。これによりP4-19の新規作成リンクに作家別`author=`パラメータは不要と判断（`role=gallery&self=1`のみ）。
- **identity stripの変体使い分け**：P4-19はギャラリー本体がidentityそのものなので人物変体（`--gallery`、オーナー行なし）。P2-13/P6-15はコンテンツ（展覧会/作品）自体がidentityで、操作主体は別に存在するためコンテンツ変体＋オーナー行（オーナー＝creator 田中透、`kotennavi-p2-12.html`の identity strip 構造をそのまま複製）。P6-15は`p6-11.html`のような役割別動的オーナー切替は持たない静的1オーナー表示（作品のオーナーは固定のデモ作品のため）。
- **新規/編集リンクのパラメータ**：`applyEntryParams()`（p7-11）は現状`mode`パラメータのみ読み取りが実装済みで、`author=`/`self=`/`role=`/`entry=`は将来の後方互換用の未結線パラメータと確認済み（P3-19時点で既に同じ設計方針）。この前例に倣い、P2-13/P6-15は`author=tanaka&self=1&entry=exhibition|artwork`、P4-19は`role=gallery&self=1`を付与（現状は装飾的だが後工程のReact/Drupal実装時に文脈を伝える設計意図として残す）。
- **副次的に発見したバグ2件（ユーザー未報告・自己発見で修正）**：
  1. `kotennavi-common.js`の`PAGES`オブジェクトに**P3-19のエントリ自体が丸ごと欠落**していた（追補106でP3-19を新規作成した際、`PAGES`への登録が漏れていた）。`renderBc(page)`は`const p=PAGES[page]; if(!p) return '';`という実装のため、エラーは出ず**パンくずが無音で空表示になる**バグだった。ユーザーからの報告は無く、本追補作業中の調査で自己発見・修正。
  2. 同オブジェクトの`p2-13`/`p2-14`キーが旧番号体系（P2-13=広告作成/P2-14=修正依頼）のまま残っており、`docs/sitemap.md`の現行番号（P2-13=記事管理/P2-14=インサイト/P2-15=広告作成/P2-16=修正依頼）と食い違っていた。プロジェクトルール（sitemap.mdが番号の正）に従い`PAGES`側を是正。ついでに`getActions()`内の旧グループ`['p2-12','p2-121','p2-13']`（コメントが旧p2-13=「広告」を参照）から`p2-13`を除外（記事管理は他の記事管理ページ同様getActionsグルーピングを持たない方針のため）。
- **検証**：`node --check kotennavi-common.js`／`node --check kotennavi-pages.js`とも実行しOK（構文エラーなし）。
- **実装ファイル**：`kotennavi-p2-13.html`（新規）、`kotennavi-p4-19.html`（新規）、`kotennavi-p6-15.html`（新規）、`kotennavi-common.js`（`PAGES`3件追加+2件修正、`getActions()`修正）、`kotennavi-pages.js`（`KTN.pages['p2-13']`/`['p6-15']`/`['p4-19']`新設）、`docs/sitemap.md`（P2-13/P4-19/P6-15行を`未作成`→`調整中`、ファイル名反映）。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。これで記事管理4画面CRUD（P3-19/P2-13/P4-19/P6-15）が全て実装完了。
- **影響ファイル**：`kotennavi-p2-13.html`、`kotennavi-p4-19.html`、`kotennavi-p6-15.html`、`kotennavi-common.js`、`kotennavi-pages.js`、`docs/sitemap.md`、`docs/progress.md`。

### 2026-08-02 追補(113)（P3-18クリエイター-展覧会管理を新設＝p3-19記事管理と同じCRUD一覧構造を展覧会エンティティへ適用。確認後にP4-18へ展開予定）

- **経緯**：ユーザーから「P3-18\P4-18の展覧会管理の作成に進みます。まずはp3-18の作成をお願いします、確認後p4-18に展開します」と依頼。記事管理（P3-19→P2-13/P4-19/P6-15）と同じ「先行1ページ作成→確認→横展開」の二段階ワークフローで、まずP3-18のみ実装。
- **投稿者スコープの確定（コードに残らない判断・重要）**：P3-18の一覧は「田中透が**投稿者**として作成した展覧会」のみを表示し、ギャラリー等が投稿者で田中透が出展クリエイターとして参加しているだけの展覧会は含まない。理由＝サイトの旗艦デモ展覧会「あなたが知らないオノマトペ」自体が`kotennavi-p2.html`の`window.P2_POSTED_BY`で確認した通りGallery SOIL 渋谷を投稿者として持ち、田中透は出展クリエイターの立場に過ぎない。もし「田中透が関わる展覧会」を無条件に一覧化すると、この旗艦展のような他者主催展まで「管理対象」に見えてしまい、投稿者＝操作主体という管理ページの前提が崩れる。よってP3-18のサンプルデータは旗艦展と別に新規6件（下書き／確認待ち／非公開／開催中／もうすぐ終了／開催前／終了の7状態）を用意し、注記文で「参加履歴を含む全展覧会はp3-1（展覧会アーカイブ）で確認」と案内してスコープの違いを明示した。P4-18展開時も同じ判断軸（投稿者＝Gallery SOIL 渋谷のものだけ）を適用する。
- **展覧会固有の状態表現＝badge system外のpage-local実装**：管理者確認待ち（`confirmed:false`）・非公開（`confirmed:true, published:false`）は、既存の開催ステータス`.sb-*`（開催中/開催前/もうすぐ開始/もうすぐ終了/終了＝時間軸）とは別カテゴリの状態（審査・公開可否軸）。badge-system.mdの4原則（single source of truth・カテゴリごとに形を分ける等）に照らし、ここへ新カテゴリを追加するのではなく、既存の「下書きリボン」と同じ**page-local・非ガバナンス**の扱いとして`.p318-status`/`.p318-status--pending`/`.p318-status--hidden`（アウトラインチップ、`.aws-*`と似た形だがCSS上は独立）を新設。`confirmed`と`published`が両方揃って初めて`.sb-*`（live/upcoming/soon/ending/closed）を表示する分岐にした。`sb-upcoming`（開催前）はこれまでコードベース内で未使用だったため、badge-system.md記載のラベル「開催前」をそのまま採用（`sb-soon`の実際の描画例は既存コードで「もうすぐ開催」表記だったが、badge-system.md仕様書のラベル「もうすぐ開始」を正としてP3-18では後者を使用＝ドキュメント優先）。
- **CSS共通化の徹底**：新規CSSは`.p318-status`とその2モディファイアのみに抑え、一覧・カード・ツールバー・モーダル・ページングは全て`kotennavi-p3-19.html`と同じ`.p319-*`クラスをそのまま再利用（`.ktn-mgmt-wrap`直下は`.p318-wrap`のみページ固有）。`.p319-*`ブロックの説明コメントに「P3-18/P4-18もこの共有ネームスペースを再利用」と追記し、今後のP4-18実装時に迷わないようにした。
- **新規/編集/クローンリンク**：`kotennavi-p2-11.html`は現状クエリパラメータを一切解釈しない（完全デモ/dbar駆動、P2-11本文の実装を確認済み）。P3-19→p7-11の前例に倣い、`?mode=new|edit|clone&author=tanaka&self=1&exh=<id>`を将来の後方互換用の飾りパラメータとして付与（現状は装飾のみ）。
- **common.js/common.css**：`PAGES`に`p3-18`のパンくずエントリを追加（`p3-17`と`p3-19`の間）。`getActions()`のP3管理グループ（`['p3-12'...'p3-17']`）には含めない（p3-19等の兄弟ページと同じ、管理系記事/展覧会一覧ページはgetActionsグルーピングを持たない方針）。
- **React化時**：記事管理（P3-19系）と展覧会管理（P3-18/P4-18系）は将来的に`<MgmtListPage entityType>`のような共通コンポーネントへ統合可能（一覧構造は完全に共通、差分はentity種別ごとのカードmeta生成関数と状態バッジロジックのみ）。
- **検証**：`node --check kotennavi-common.js`／`node --check kotennavi-pages.js`実行しOK。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。確認後、同パターンをP4-18（ギャラリー-展覧会管理、投稿者=Gallery SOIL 渋谷）へ横展開する。
- **影響ファイル**：`kotennavi-p3-18.html`（新規）、`kotennavi-pages.js`（`KTN.pages['p3-18']`新設）、`kotennavi-common.css`（`.p318-status`新設＋`.p319-*`コメント更新）、`kotennavi-common.js`（`PAGES`に`p3-18`追加）、`docs/sitemap.md`（P3-18行を`未作成`→`調整中`）、`docs/progress.md`。

### 2026-08-02 追補(114)（P3-18の状態モデルを修正＝確認待ち／確認済の2値から「公開日設定」を反映した3段階へ。リエゾンバッジをタイトル行へ格上げ）

- **経緯**：追補113のP3-18初版をユーザーがレビューし、確認前に「展覧会の場合、公開日設定があり、確認待ち・確認済とともに、公開日の設定により公開前または公開したかの状態がある、またリエゾン・リエゾン＋も大事な要素です。」と指摘。初版は`confirmed`/`published`の単純2値（確認待ち／非公開／sb-*）で設計しており、実際の展覧会投稿フロー（`kotennavi-p2-11.html`）に存在する「公開日を指定して確認完了後に自動公開する」という中間状態をモデルから欠落させていた。
- **`kotennavi-p2-11.html`の実際の公開設定フィールドを再確認（コードに残らない判断の根拠）**：オーナー向けブロック9「公開設定」（`name="p211publish"`）は`now`＝「今すぐ公開する（管理者の確認完了後、すぐに公開されます）」／`scheduled`＝「公開日時を指定する（管理者の確認完了後、指定した日時に自動公開されます）」の2択。管理者専用ブロック「グループ3：公開ステータス」は「確認済み」チェック（審査完了サイン。未チェックなら「公開」を付けても非公開のまま＝下書き状態）と「公開」チェック（Admin確認済みの場合のみ選択可）を持ち、オーナーが公開日を指定していた場合は`#p211AdminPubDate`に「投稿者が公開日を設定しています：2026-06-10（この日付で自動公開されます）」という参考情報が表示される。この3者（確認済みフラグ／公開フラグ／公開日）の組み合わせから、P3-18側で見せるべき状態は「pending（未確認）→ scheduled（確認済み・公開日指定あり・到来待ち）／unpublished（確認済み・非公開・日付指定なし）→ 公開済み後は`sb-*`（時間軸）」の3段階だと判明した。
- **実装**：
  - `EXHIBITIONS`（pages.js）に`publishMode`（'now'|'scheduled'）・`publishDate`（文字列|空）を追加。`effStatus(e)`を`!confirmed→'pending'`／`confirmed && !published`かつ`publishMode==='scheduled' && publishDate`→`'scheduled'`／それ以外の`confirmed && !published`→`'unpublished'`／それ以外→`e.sstatus`の3分岐に変更。
  - `statusHtml(e)`に`.p318-status--scheduled`（「公開予定 2026.9.1」の形で日付をチップ内に表示）を追加。`.p318-status--hidden`は`.p318-status--unpublished`へリネーム（`kotennavi-common.css`も同時修正、旧クラス名は残さず置換）。
  - `kotennavi-p3-18.html`の`#p318FilterStatus`セレクトに`<option value="scheduled">公開予定</option>`を追加。
  - サンプルデータに「confirmed済み・公開日指定あり・未公開」（`x8`＝scheduled例）と「confirmed済み・公開日指定なし・未公開」（`x3`＝unpublished例）をそれぞれ用意。あわせて、フィルタの選択肢に存在するのに実例が無かった`sstatus:'soon'`（もうすぐ開始）の展覧会（`x9`）も追加し、初版の自己バグ（デモデータの網羅漏れ）を同時に解消。計7件→9件。
- **リエゾンバッジの視覚的格上げ**：「リエゾン・リエゾン＋も大事な要素」という指摘を受け、`.lb-dot`（LIAISON/LIAISON+バッジ）を`makeItem()`内で`.p319-item__dest`（ミューテッドな小文字の掲載先メタ行＝会場・会期と並ぶ扱い）から`.p319-item__title-row`（`cb-exhibition`→状態バッジ→ID と並ぶ最上段の行）へ移設。並び順は既存サイト内の前例（`p1HeroBadges`＝`cb`→`sb`→`lb-dot`、`.p2-side-ec__badge-row`＝`cb`→`lb-dot`）に倣い`cb-exhibition`→`.p318-status`/`.sb-*`→`.lb-dot`→`.ktn-aw-id`の順とした。CSSの新規追加は不要（`.lb-dot`はソリッド塗りの自己完結コンポーネントで、badge-rowでの共存が既に他ページで実証済み）。
- **検証**：`node --check kotennavi-common.js`／`node --check kotennavi-pages.js`実行しOK。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。確認が得られ次第、この修正後の状態モデル・バッジ配置をP4-18（ギャラリー-展覧会管理）にもそのまま踏襲する。
- **影響ファイル**：`kotennavi-p3-18.html`、`kotennavi-pages.js`（`KTN.pages['p3-18']`）、`kotennavi-common.css`（`.p318-status--scheduled`追加／`--hidden`→`--unpublished`リネーム）、`docs/progress.md`。

### 2026-08-02 追補(115)（P3-18：LIAISON設定は確認済み後のみ可能という業務ルールを反映／確認待ち×公開予定の併存を表現）

- **経緯**：追補114の修正をユーザーがレビューし、確認前に「管理者が確認済になるまえはリエゾン・リエゾン+の設定ができない、まだ出展クリエイターが確定しないためです。また、確認待ちと公開予定の設定がされている場合がある。」と2点目の指摘。
- **業務ルール①：LIAISON/LIAISON+は`confirmed`後のみ有効**——展覧会の出展クリエイターは管理者確認を経て確定するため、確認待ち（`confirmed:false`）の段階ではLIAISON/LIAISON+の紐付け自体が成立しない（出展者未確定のオンライン展示・販売は概念的に不可能）。追補114時点のサンプルデータ`x2`（確認待ち）が`liaison:'li'`を持っていたのはこの業務ルールに反する誤りだったため、`liaison:''`に修正。あわせて`makeItem()`の`liaisonHtml`生成条件を`e.liaison`単体から`e.confirmed && e.liaison`に変更し、**万一データ側に不整合が残ってもUIとして表示されない**ようにルールをコード側にも明示的に固定した。
- **業務ルール②：「確認待ち」と「公開予定（オーナー設定の公開日）」は独立した軸で併存しうる**——p2-11の「公開設定」（今すぐ公開する／公開日時を指定する）はオーナーが**投稿時点**で選択するフォーム項目であり、管理者の確認作業とは非同期。そのためオーナーが「公開日時を指定する」を選んでいても、管理者がまだ確認していなければ表示上は「確認待ち」が最優先の状態になる（確認が完了するまで一切公開されないため）——が、その裏で公開予定日が既に決まっている、という状態は実務上普通に起こりうる。追補114時点では`effStatus()`/`statusHtml()`とも`!e.confirmed`を最優先で早期returnしており、この「確認待ち＋公開予定日あり」という組み合わせ情報が一覧上から失われていた。
  - `statusHtml(e)`の`!e.confirmed`分岐に、`e.publishMode==='scheduled' && e.publishDate`が真の場合の副次テキストを追加：`確認待ち（公開予定 2026.8.20）`のように単一チップ内に併記（新規チップ・新規CSSは追加せず`.p318-status--pending`のテキストを可変にするだけの最小実装）。
  - `effStatus()`のフィルタ値は変更しない（`pending`のまま）——フィルタの`scheduled`は「確認済み後、公開日到来待ち」を指す既存の意味を維持し、確認前のスケジュール設定はフィルタ軸ではなくチップの補足情報として表現する（フィルタに`pending-scheduled`のような新カテゴリを増やすと、確認待ちが2種類に分裂しフィルタUIが複雑化するため）。
  - サンプルデータ`x2`を`publishMode:'now'→'scheduled'`・`publishDate:''→'2026.8.20'`に変更し、この「確認待ち×公開予定」の組み合わせを実例として表示できるようにした。
- **検証**：`node --check kotennavi-pages.js`実行しOK。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。確認が得られ次第、この業務ルール（LIAISON設定はconfirmed後のみ／確認待ち中も公開予定日を参考表示）をP4-18（ギャラリー-展覧会管理）にもそのまま踏襲する。
- **影響ファイル**：`kotennavi-pages.js`（`KTN.pages['p3-18']`の`statusHtml()`・`makeItem()`・`EXHIBITIONS`の`x2`）、`docs/progress.md`。

### 2026-08-02 追補(116)（P3-18＋記事管理4画面：偽の管理番号チップを削除／確認待ち・公開予定バッジを分離）

- **経緯**：追補115の修正をユーザーがレビューし、「1. 記事管理の4ページと共通ですが、記事と展覧会は作品と違って管理番号の割り振りがありませんので、番号をとってください。2. 確認待ちと公開予定のバッジは別々にしてください」と3点目の指摘（P3-18に加え、共通する記事管理4ページ＝P3-19/P2-13/P4-19/P6-15も対象と明示）。
- **ドメインモデルの誤り①：記事・展覧会に実在しない「管理番号」を表示していた**——作品管理（P3-14/P4-14）は実システム上で管理番号（`w.awid`＝例`AW-C42-1847`）を持つため`.ktn-aw-id`チップで表示する設計が正しい。しかし記事管理4ページ（P3-19/P2-13/P4-19/P6-15）とP3-18（展覧会管理）は、当初P3-14/P4-14のUIパターンをそのまま転用した際に、作品同様の管理番号（`a.atid`＝`AT-XXXX-XXXX`、`e.exid`＝`EX-XXXX-XXXX`）を**実システムに存在しない架空の値として**サンプルデータに割り当ててしまっていた。記事・展覧会には管理番号の割り振り自体が存在しないため、これは設計ミス。
  - 対処：Node正規表現スクリプトでサンプルデータから`atid:'...', `（23件）・`exid:'...', `（9件）フィールドを一括削除。事前にgrepで`.ktn-aw-id`の全7箇所（作品2＝維持／記事・展覧会5＝削除対象）を洗い出し、削除対象の5箇所（P3-19/P3-18/P2-13/P4-19/P6-15の各`makeItem()`）から対応する`<span class="ktn-aw-id">...</span>`表示行を削除（行番号ベースでの安全な一括削除。削除前に各行が`ktn-aw-id`かつ`atid`/`exid`参照であることをスクリプト内で検証）。作品側（P3-14/P4-14・`w.awid`）は変更なし。
  - **設計原則として明文化**：「管理番号チップ（`.ktn-aw-id`）は実システムで管理番号を持つエンティティ（作品）専用。記事・展覧会など管理番号を持たないエンティティに転用しない」——今後、作品管理のUIパターンを他エンティティへ流用する際は、各エンティティが実際に持つ属性か個別に確認すること。
- **UI修正②：確認待ち×公開予定は2つの独立したバッジとして表示**——追補115では「確認待ち（公開予定 2026.8.20）」と1チップ内にテキスト併記していたが、ユーザーの意図は別々のバッジ（サイト全体のバッジ設計原則＝「意味の異なる状態は別バッジ」に整合）。`statusHtml(e)`の`!e.confirmed`分岐を修正し、`.p318-status--pending`（「確認待ち」）と`.p318-status--scheduled`（「公開予定 2026.8.20」）を別々の`<span>`として連結して返すよう変更。CSS新設は不要（両クラスとも既存）。`.p319-item__title-row`は既に`display:flex;gap:7px;flex-wrap:wrap`のため2バッジが自動的に並んで折り返される。
- **検証**：`node --check kotennavi-pages.js`実行しOK。`grep -n "ktn-aw-id"`で作品2箇所のみ残存を確認。`grep -n "atid|exid"`でヒット0件を確認。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。確認が得られ次第、本追補の2点（管理番号チップなし／確認待ち・公開予定バッジ分離）をP4-18（ギャラリー-展覧会管理）にもそのまま踏襲する。
- **影響ファイル**：`kotennavi-pages.js`（`KTN.pages['p3-19']`/`['p3-18']`/`['p2-13']`/`['p4-19']`/`['p6-15']`の`makeItem()`・サンプルデータ、`KTN.pages['p3-18']`の`statusHtml()`）、`docs/progress.md`。

### 2026-08-02 追補(117)（P3-18サンプルデータ：LIAISON+実例を追加／重複展覧会作成の抑止策を検討・決定〔実装は後続のgetActionsバッチへ〕）

- **サンプルデータ修正**：後工程（React/Drupal変換）の参照データとして、`x8`（花と刃、静かな部屋＝confirmed済み・非公開・公開予定日あり）の`liaison`を`'li'`→`'li-plus'`に変更。これにより「confirmed直後・公開前の段階でLIAISON+が既に設定されている」実例が加わった（従来`li-plus`は`sstatus:'live'`＝完全公開状態の`x4`にしか無く、LIAISON設定がpublishedと独立した軸であることを示す実例が不足していた）。結果：`li`＝`x6`のみ、`li-plus`＝`x4`・`x8`の計2件に。
- **議題：確認待ち展覧会の重複作成の抑止**——ユーザーより、現行（旧）個展なびで頻発する事故として「確認待ちの展覧会があることに気づかず、同内容の展覧会を再度作成してしまう」という指摘。原因分析（ユーザー自身の言）：
  1. 現行システムはクリエイター・ギャラリーページ右上に「オーナーメニュー」と並んで「展覧会新規作成」ボタンを独立設置しており、これが**展覧会管理一覧（オーナーメニュー内）を経由せずに新規作成へ直行できるバイパス経路**になっている。
  2. 確認待ち・公開前の展覧会は（他ユーザーへの見え方をオーナーが確認できなくなるため）公開ページ側には意図的に表示できない＝一覧を能動的に見に行かない限りオーナーも気づけない。
  3. これは「利便性（ワンクリックで新規作成に到達できる）」と「操作エラー防止（重複作成を防ぐ）」のトレードオフである。
- **決定した抑止アプローチ**：公開ページに確認待ち展覧会を表示する案（利便性・プライバシーの両方を損なうため却下）ではなく、**「新規作成」入口（バイパス経路の起点）自体に軽い確認ステップを挟む**方式を採用。具体的には、オーナー本人（自分のページを見ている状態）が「新規展覧会を作成」を押した瞬間、そのオーナーの確認待ち／公開予定（未公開）の展覧会が既に存在する場合のみ、`KTN.submitDone()`と同系統の軽量モーダルで「確認待ちの展覧会が○件あります：{タイトル} → 編集する」を提示し、「それでも新規作成」で従来通り進める（ブロックはしない・注意喚起止まり）。確認待ちが無いときは何も挟まらないため通常の利便性は維持される。
- **実装スコープの切り分け**：この抑止策の主眼は「クリエイター・ギャラリートップページ（p3/p4）ヘッダーの新規作成入口」だが、**現時点でこのredesignのgetActions()（`kotennavi-common.js` L1127〜のp3ブロック）にはまだ「展覧会管理」「新規展覧会作成」の項目自体が無い**（P3-18を新設した直後のため未配線）。ヘッダーアクション（`getActions()`）の全ページ・全ロール確定は既存方針で「全ページ完成後にまとめて行う横断工程」と定義済み（`docs/handoff-decisions.md`の既存追補・CLAUDE.md「ページ管理メニュー」節）。そのため本抑止策の実装は、①p3/p4 getActionsに「展覧会管理」「新規展覧会作成」項目を配線する作業と、②その新規作成項目に本モーダルを組み込む作業を**セットで、後続のgetActions横断バッチにて実施**する。P3-18自身が既に持つ「新規展覧会を作成」CTA（`#p318NewBtn`）への同モーダル適用も同バッチで判断（一覧ページ上では確認待ち項目が既に見えているため優先度は低いが、一貫性のため検討）。
- **保留事項**：本追補は設計方針の決定のみで、コード実装はまだ行っていない（意図的にgetActions横断バッチへ先送り）。P3-18のブラウザ確認・P4-18展開が完了した後、getActions確定作業のタイミングで本方針を実装すること。**（2026-08-02 追記）P3-18自身の`#p318NewBtn`への適用は、ユーザー指示により本追補と同日中に先行実装済み→詳細は追補118。p3/p4ヘッダーgetActionsへの配線は引き続き後続バッチへ先送り。**
- **影響ファイル**：`kotennavi-pages.js`（`x8`の`liaison`値）。設計決定のみで他ファイル変更なし（実装時に`kotennavi-common.js`のgetActions・関連ページに影響予定）。

### 2026-08-02 追補(118)（P3-18：新規作成ボタンへの重複展覧会チェックモーダルを先行実装）

- **経緯**：追補117でp3/p4ヘッダーgetActions配線とセットで後続バッチへ先送りと決定した重複作成チェックについて、ユーザーから「p3-18の新規作成ボタンにも同じチェックを入れた方は鬱陶しいかもしれないが、抑止の意味では同義だしUXとしてもいいような気がします」と指示があり、P3-18自身の「新規展覧会を作成」ボタン（`#p318NewBtn`）分のみ本日中に先行実装した。p3/p4トップのヘッダー導線（`getActions()`）への配線は引き続き後続のgetActions横断バッチへ先送り（変更なし）。
- **実装内容**：
  - `kotennavi-pages.js`（`KTN.pages['p3-18']`）：`unpublishedExhibitions()`（`EXHIBITIONS`から下書き以外かつ未公開＝確認待ち／公開予定／非公開の展覧会を抽出）／`openDupModal()`（該当展覧会をタイトル＋`statusHtml()`＋「編集する →」リンクのリストとして`#p318DupList`に描画し`#p318DupModal`を表示）／`closeDupModal()`を追加。`#p318NewBtn`のclickイベントで該当0件なら`preventDefault`せず通常遷移、1件以上あれば遷移を止めてモーダルを開く。モーダル内「それでも新規作成」（`#p318DupProceed`）は元の`newBtn.href`をセットして遷移＝ブロックはしない注意喚起のみ（追補117の設計どおり）。
  - `kotennavi-p3-18.html`：`#p318DelModal`直後に`#p318DupModal`を追加。既存の`.p319-del-modal`シェル（overlay/panel/title/desc/actions）をそのまま流用し、`.p319-dup-modal`修飾クラスを付加。
  - `kotennavi-common.css`：`.p319-del-modal__actions`直後に`.p319-dup-modal .p319-del-modal__panel`（幅460px）／`.p319-dup-modal__list`／`.p319-dup-modal__item`／`.p319-dup-modal__item-body`／`.p319-dup-modal__item-title`を新設。モーダルシェル自体のCSSは追加不要（共用）。
- **検証**：`node --check kotennavi-pages.js`実行しOK。HTML側`#p318Dup*`各IDとJS側`getElementById`呼び出し名の対応を`grep`で相互確認済み。新規追加コードが`KTN.pages['p3-18']`の同一クロージャ内にあり、`EXHIBITIONS`／`isDraft`／`statusHtml`／`p211Link`（いずれも同ページ内で先に定義済み）を問題なく参照できることを確認済み。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。P4-18展開時は本パターン（重複チェックモーダル）も同様に踏襲するかは、P3-18ブラウザ確認時にあわせて判断する。
- **影響ファイル**：`kotennavi-pages.js`（`KTN.pages['p3-18']`）、`kotennavi-p3-18.html`、`kotennavi-common.css`、`docs/progress.md`。

### 2026-08-02 追補(119)（業務ルール確認：展覧会「非公開」は管理者専用の状態遷移／設定後はオーナーも閲覧不可）

- **ユーザー確認事項**：「展覧会の非公開の設定は管理者のみです。非公開設定後はオーナーも見ることができない。」
- **現行実装との照合（今回は新規コード変更なし・既存実装が既に整合していることを確認）**：
  1. `kotennavi-p2-11.html`の「グループ3：公開ステータス」（`確認済み`／`公開`チェックボックス＝非公開状態への切替はここでの「公開」チェック解除で行う）は`#p211AdminBlock`（`hidden`属性・「この欄はサイト管理者のみに表示されます」明記）の内側にあり、**オーナー（creator/gallery本人）はこの区画を一切見ることも操作することもできない**。非公開への遷移は常に管理者操作のみで発生する。
  2. `kotennavi-pages.js`の`KTN.pages['p3-18']`内`exhLink(e)`＝`(isDraft(e) || !e.confirmed || !e.published) ? null : 'kotennavi-p2.html'`により、**非公開（`confirmed:true, published:false`）を含む未公開展覧会は公開ページへのリンクが一切生成されない**。オーナー自身であっても、非公開になった展覧会の公開後の見え方を確認する手段（プレビュー含む）は存在しない。
  3. p2側の「公開前プレビューバンド」（`applyOwner25`・`p2PreviewBand`）は**LIAISON会期の前後（published:trueだが会期外）専用の別機構**であり、`published:false`（非公開含む）には適用されない＝オーナー閲覧不可の原則に抵触しない。
- **設計上の含意（今後のページ制作で踏襲）**：
  - P4-18（ギャラリー版・未着手）でも同じ`exhLink()`／`effStatus()`パターンをそのまま踏襲し、非公開状態のオーナー非表示を維持すること。
  - 記事・作品等、他コンテンツ種別に「非公開」相当の状態を今後実装する場合も、**「公開／非公開の切替は管理者専用区画に隔離し、オーナーには一切見せない・触らせない」＋「非公開中は該当コンテンツの公開ページへの導線をオーナーにも一切出さない」の2点を既定パターンとする**。
  - P3-18の一覧上では非公開展覧会も（管理番号ではなく）ステータスバッジ「非公開」として表示され続け、編集（`編集 →`）は可能＝オーナーは「非公開にされた事実」と「編集して直せること」は分かるが、「公開されたらどう見えるか」は確認できない、という非対称性が意図された設計。
- **影響ファイル**：なし（コード変更なし・既存実装の整合性確認と設計原則の明文化のみ）。

### 2026-08-02 追補(120)（P3-18：重複確認モーダルから「非公開」を除外／バッジ行のCSSバグ修正）

- **ユーザー指摘①**：「p3-18の展覧会新規作成のモーダルの中に、『非公開』があるのがおかしい。」
  - **原因**：追補118の実装では`unpublishedExhibitions()`が`!isDraft(e) && !e.published`で判定しており、確認待ち／公開予定に加え「非公開」（管理者が公開済み展覧会を取り下げた状態＝追補119）まで対象に含んでいた。
  - **修正**：関数を`dupCheckExhibitions()`に改称し、`effStatus(e)`が`'pending'`または`'scheduled'`の場合のみ対象とするよう変更（`'unpublished'`を除外）。**理由**：非公開はオーナーが既に存在を把握している（かつて公開されていた）展覧会であり「重複作成に気づかず再作成してしまう」懸念に当たらない。また非公開は管理者専用の状態遷移（追補119）のため、この注意喚起の対象にも馴染まない。
- **ユーザー指摘②**：「モーダルの中の確認待ちや公開予定のバッジ枠内の右paddingが変に伸びている、左右同じpaddingに修正してほしい、p3-18のカード表示時と同じように。」
  - **原因**：`.p319-dup-modal__item-body{display:flex;flex-direction:column;...}`（列方向flex）の直下に`.p318-status`（`display:inline-flex`）バッジを複数直接配置していたため、既定の`align-items:stretch`によりバッジが横幅いっぱいに引き伸ばされ、テキストは左に寄ったまま背景・枠線だけが右へ伸びて見えていた（P3-18本体の`.p319-item__title-row{display:flex;gap:7px;flex-wrap:wrap}`は行方向flexのため発生しない）。
  - **修正**：バッジをまとめる行方向のラッパー`.p319-dup-modal__item-badges{display:flex;align-items:center;gap:7px;flex-wrap:wrap}`を新設し、`statusHtml(e)`の出力をこの中に格納（`.p319-item__title-row`と同じ挙動に統一）。
- **検証**：`node --check kotennavi-pages.js`実行しOK。
- **影響ファイル**：`kotennavi-pages.js`（`KTN.pages['p3-18']`の`unpublishedExhibitions`→`dupCheckExhibitions`改称・`openDupModal`のHTML生成）、`kotennavi-common.css`（`.p319-dup-modal__item-badges`新設）。

### 2026-08-02 追補(121)（P3-18：重複確認モーダルに会期を追加／ボタンラベル簡略化）

- **ユーザー指摘**：「会期も入れるとわかりやすい。『それでも新規作成』→『新規作成』」
- **修正①（会期追加）**：`openDupModal()`の一覧項目にタイトル直下で`e.period`（無ければ「会期未定」）を表示する`.p319-dup-modal__item-period`（`.72rem`・`var(--muted)`）を追加。同名タイトルでも会期が違えば別展覧会と判断しやすくする。
- **修正②（ボタンラベル）**：`#p318DupProceed`の文言を「それでも新規作成」→「新規作成」に簡略化。
- **検証**：`node --check kotennavi-pages.js`実行しOK。
- **影響ファイル**：`kotennavi-pages.js`（`openDupModal()`）、`kotennavi-p3-18.html`（`#p318DupProceed`）、`kotennavi-common.css`（`.p319-dup-modal__item-period`新設）。

### 2026-08-02 追補(122)（業務ルール新規開示：展覧会は会期終了後オーナーでも編集・削除不可／モーダルに一覧誘導ヒントを追加）

- **ユーザー指摘・業務ルール開示**：「展覧会の場合、会期終了後の展覧会はオーナーでも編集・削除ができなくなる。p3-18で管理できるのは会期が終了していない展覧会です、そのことを説明文に入れてほしい。新規作成のモーダルに確認・公開済の展覧会は一覧で確認して下さいと追加してほしい。」
- **新規業務ルール（追補119の「非公開」ルールとは別軸）**：展覧会は会期（`period`）を終えると、たとえオーナー本人であっても編集・削除ができなくなる。P3-18が一覧上で編集・削除を提供できるのは会期中（`effStatus(e)`が`'closed'`以外）の展覧会のみ。会期終了済みの展覧会も記録として一覧には残り続けるが、可能な操作は「クローン →」（＝新規の別展覧会を作成するだけで、終了済みの展覧会自体には影響しないため終了後も可）のみになる。
- **修正①（説明文）**：`kotennavi-p3-18.html`の`.ktn-mgmt-head__desc`に「**会期を終了した展覧会は編集・削除ができなくなるため、この一覧で編集・削除できるのは会期中の展覧会のみです**（終了後も記録として一覧には残ります）」を追記。
- **修正②（実装をルールに整合・依頼の明示範囲を超える判断）**：説明文だけを追加すると、既存サンプルデータ`x7`（ことばの余白＝`sstatus:'closed'`）が依然として「削除」ボタン・「編集 →」リンクを表示したままになり、新しく明示した業務ルールと実装が矛盾する状態になる。これを避けるため、`kotennavi-pages.js`の`makeItem()`に`ended`（`!draft && effStatus(e)==='closed'`）判定を追加し、`ended`が`true`の場合は「削除」ボタン・「編集 →」リンクの生成自体を省略するよう修正（`draft`の場合の「編集を再開 →」分岐には影響なし＝下書きは会期終了と無関係）。「クローン →」は`ended`でも常に表示を維持。
  - **影響範囲の確認**：一覧の削除確認モーダルは`p319-item__del`ボタンへのクリック委譲（`e.target.closest('.p319-item__del')`）で起動するため、ボタン自体が描画されなければ`closest()`は`null`を返し何も起きない。追加のJS修正は不要と確認済み。
- **修正③（モーダルへの誘導ヒント追加）**：`#p318DupModal`（重複作成確認モーダル）は追補120により`pending`/`scheduled`のみを対象とし`unpublished`（非公開）・`closed`（会期終了）等は元から対象外だが、「確認済み・公開済みの展覧会がモーダルに出てこない理由」が分かりにくいという懸念に対応し、`.p319-dup-modal__hint`（「確認済み・公開済みの展覧会は一覧でご確認ください。」・`.76rem`・`var(--muted)`）をモーダル内リストの下に追加。あわせてHTML内に残っていた「非公開」言及の古いコメントを削除（追補120で対象外化した後も文言更新が漏れていた）。
- **P4-18への展開方針**：本追補の①②（会期終了後の編集・削除ロック）はP3-18固有ではなく展覧会という業務ルールそのものであるため、P4-18（ギャラリー-展覧会管理・未着手）でも`effStatus()`/`makeItem()`の同パターンをそのまま踏襲すること。③（モーダルヒント文言）も同様に踏襲する。
- **検証**：`node --check kotennavi-pages.js`実行しOK。`grep -n "p319-item__del"`で5管理ページ（P3-19/P3-18/P2-13/P4-19/P6-15）の描画箇所・クリック委譲箇所を再確認し、P3-18のみボタン省略条件（`ended`）が付き他4ページは変更なしであることを確認。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。「会期終了後は記事・作品等の他コンテンツ種別にも編集・削除ロックを適用するか」は今回のユーザー発言が「展覧会の場合」に限定されているため、指示なく他ページ（P3-19等の記事管理・作品管理）へ拡張しない。
- **影響ファイル**：`kotennavi-p3-18.html`（`.ktn-mgmt-head__desc`・`#p318DupModal`）、`kotennavi-pages.js`（`KTN.pages['p3-18']`の`makeItem()`）、`kotennavi-common.css`（`.p319-dup-modal__hint`新設）、`docs/progress.md`。

### 2026-08-02 追補(123)（P3-18：説明文の精緻化——非公開は管理者専用／投稿者は公開日のみ設定可、会期未終了＝開催前を含む、終了後は公開ページにも恒常表示）

- **ユーザー指示**：「文章をリファインしてください。非公開設定は管理者のみ、投稿者が設定できるのは公開日です。管理・操作できるのは展覧会会期未終了、つまり開始前含む。終了後はクリエイター・ギャラリーページ展覧会にずっと表示される。」
- **補強①（非公開ルールの明文化）**：追補119で確認済みの「非公開への切替は管理者専用操作」というルールが、旧説明文（「確認前や非公開設定の間は一覧上でのみ状態を確認できます」）では投稿者自身が非公開を設定できるかのように読めていた。投稿者が設定できるのは**公開日**（p2-11の「今すぐ公開する／公開日時を指定する」）のみであることを明記し、非公開への切替主体を管理者に限定する文言へ修正。
- **補強②（「会期中」→「会期が終了していない（開催前を含む）」への言い換え）**：旧文言「会期中の展覧会のみ」は、字面上「開催中（live）」のみを指すように読める曖昧さがあった。実際の判定条件は`effStatus(e) !== 'closed'`であり、開催前（upcoming）・もうすぐ開始（soon）・開催中（live）・もうすぐ終了（ending）はすべて編集・削除可能。「会期が終了していない展覧会のみです（開催前の展覧会を含みます）」と明示し、開催前も対象に含まれることを誤読なく伝える文言に修正。
- **補強③（会期終了後の公開ページ側の恒常表示を追記）**：旧文言は「終了後も記録として一覧には残ります」（＝この管理一覧内の話）のみだったが、ユーザーより「終了後はクリエイター・ギャラリーページ展覧会にずっと表示される」という、**公開ページ（クリエイターページの展覧会一覧・p3-1等）側でも会期終了展覧会が恒常的に表示され続ける**という追加事実の開示があった。説明文に「あなたのクリエイターページの展覧会一覧には終了後もそのまま表示され続けます」を追記。この事実は今回コード変更を伴わない（P3-18自体は公開ページの表示を制御しないため）が、**将来p3-1（展覧会アーカイブ）やp3トップの展覧会リストウィジェットを実装・修正する際に「終了展覧会をフィルタで隠さない・恒常的にリストに残す」という制約として踏襲すべき事実**のため、本追補と`project_exhibition_ended_lock`メモリに記録。
- **検証**：HTML変更のみ（JSロジック変更なし）。文言修正のため`node --check`対象外。
- **P4-18への展開方針**：本追補の3点はすべて展覧会という業務ルールそのものの説明文であるため、P4-18（ギャラリー-展覧会管理）でも同内容（「クリエイターページ」→「ギャラリーページ」に置換）を踏襲すること。
- **影響ファイル**：`kotennavi-p3-18.html`（`.ktn-mgmt-head__desc`）、`docs/progress.md`。

### 2026-08-02 追補(124)（P3-18：説明文から「非公開は管理者専用操作」の前置き句を削除）

- **ユーザー指摘**：「『非公開への切替は管理者のみが行う操作で』これはいらない」
- **修正**：追補123で追加した前置き句を削除し、「<strong>投稿者が設定できるのは公開日（今すぐ公開する／公開日時を指定する）のみ</strong>です。」のみに簡略化。非公開が管理者専用の状態遷移であること自体は追補119で既にコード・ドキュメント両面で確立済みのため、この説明文で改めて主語を立てて説明する必要はないという判断（冗長を避け、投稿者ができることに焦点を絞る）。
- **検証**：HTML文言修正のみ。
- **影響ファイル**：`kotennavi-p3-18.html`（`.ktn-mgmt-head__desc`）、`docs/progress.md`。

### 2026-08-02 追補(125)（P3-18：説明文の文章構造を再調整——対比句の削除により浮いた一文を時系列の流れへ統合）

- **ユーザー指摘**：「『投稿者が設定できるのは公開日（今すぐ公開する／公開日時を指定する）のみです。』前の削除によってこの文章がおかしいのでリファインをお願いします。」
- **原因**：追補124で「非公開への切替は管理者のみが行う操作で、」という対比の前置きを削除した結果、「投稿者が設定できるのは公開日のみです。」という一文が**何と対比しているのか分からないまま言い切りだけが残り**、直前の「作成後は管理者確認を経て掲載されます。」から唐突に話題が飛ぶ不自然な文章になっていた。
- **修正**：対比構文（〜のみです）をやめ、**作成→公開日設定→管理者確認→掲載という時系列の一文**に統合。「作成時に公開日（今すぐ公開する／公開日時を指定する）を設定でき、作成後は管理者確認を経て掲載されます。」とし、公開日設定を「投稿者ができること」として独立に強調するのではなく、作成フローの自然な一部として説明する構成に変更。後続の「確認待ち・公開日未到来・非公開の間は、この一覧上でのみ状態を確認できます。」への接続も違和感なく繋がる。
- **検証**：HTML文言修正のみ。
- **影響ファイル**：`kotennavi-p3-18.html`（`.ktn-mgmt-head__desc`）、`docs/progress.md`。

### 2026-08-02 追補(126)（P4-18新設：P3-18のギャラリー版展開）

- **ユーザー指示**：「ありがとう、確認しました。これをp4-18に展開してください。」（P3-18が11回の修正ラウンドを経て確定した直後の依頼）。
- **構造**：`kotennavi-p3-18.html`を完全複製し、gallery向けに置換（body class`p4-18-page p4-page mgmt-page`、dbarロール`user+gallery`、identity stripを`--gallery`変体・「SOIL」イニシャル・グラデーション`linear-gradient(135deg,#c8a888,#8b5e3c)`・名称「Gallery SOIL 渋谷」・view文言「ギャラリーページへ →」、wrap class`.p418-wrap`、全DOM IDを`p318*`→`p418*`）。新規CSSは無し（`.p319-*`/`.p318-status`は元からP4-18再利用を想定してコメント済み・追補時点で確認済み）。
- **ギャラリー特有のデータ設計判断（会場固定制約）**：クリエイター（P3-18）は展覧会ごとに会場が異なり得るが、ギャラリー（P4-18）は**会場が自ギャラリー1つに固定**という実在制約がある。これをサンプルデータに反映するため、P4-18の9件（`g1`〜`g9`）は全て`venue:'Gallery SOIL 渋谷'`に統一（下書き・確認待ちの段階でも会場は最初から自明なため空欄にしない＝P3-18の`x1`が`venue:''`だったのとは意図的に差別化）。加えて、確認済み（`effStatus`が`'closed'`以外）の項目同士は会期が物理的に重複しないよう期間を再設計（同一会場で二重予約は起こり得ないため）。ステータス・種別・LIAISON付与のカバレッジ（下書き／確認待ち＋公開予定／確認済み非公開／確認済み公開予定＋LIAISON+／開催中＋LIAISON+／もうすぐ開始／もうすぐ終了＋グループ展／開催前＋LIAISON／終了、計9パターン）はP3-18と1対1で一致させたが、タイトル・IDは独立の新規データとした（旗艦デモ展覧会・田中透個人のデータを機械的に転用しない＝P3-18自身の前例に倣う）。
- **クエリパラメータ規則の確定**：P3-18のp2-11リンクは`author=tanaka&self=1`だったが、P4-18は`role=gallery&self=1`を採用（P4-19/P7-11で確立済みの命名規則と整合）。`kotennavi-p2-11.html`自体はクエリパラメータを解釈しない完全デモ実装であることをgrep確認済みのため、機能的な影響はなく命名の一貫性のみの判断。
- **バグ発見・修正**：`kotennavi-common.js`の`PAGES`パンくずレジストリに`p4-18`のエントリが元から存在しなかった漏れを発見し、`p4-17`と`p4-19`の間に追加（`{ n: 'ギャラリー-展覧会管理', bc: [['Top','/'],['ギャラリー','/p10-3'],['Gallery SOIL 渋谷','/p4'],['展覧会管理', null]] }`）。
- **`getActions()`**：P3-18同様、P4管理グループへ含めない（p4-17/p4-19等の兄弟ページと同じ方針・変更なし）。
- **JSロジック**：`KTN.pages['p4-18']`を`KTN.pages['p3-18']`閉じ直後（P2-13ヘッダーコメント手前）に新設。`isDraft`/`effStatus`/`p211Link`（クエリのみ差分）/`exhLink`/`statusHtml`/`makeItem`（`ended`ロック含む）/`dupCheckExhibitions`（非公開除外含む）のロジックは全てP3-18と同一実装（会期終了後ロック＝追補122、非公開は重複チェック対象外＝追補120——いずれも展覧会という業務ルールそのものであり、追補122で既に「P4-18でも同パターンを踏襲する」と明記済みの方針どおり）。
- **検証**：`node --check kotennavi-pages.js`実行しOK。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p4-18.html`（新規）、`kotennavi-pages.js`（`KTN.pages['p4-18']`新設）、`kotennavi-common.js`（`PAGES`に`p4-18`追加）、`docs/progress.md`。

### 2026-08-02 追補(127)（P3-18/P4-18：リード文簡潔化・展覧会タイプ表示廃止・非公開の一覧完全除外）

- **ユーザー指示**：「p3-18,p4-18の修正 1.リード文を簡潔に、管理者確認についてや会期後の編集・削除については、「この一覧には～」と同じようなテキストでまとめて下さい 2.展覧会カードに「個展」「その他」などの展覧会タイプ表示は不要 3.展覧会カードの「非公開」バッジをとってください。非公開の展覧会はこの一覧には表示されません。」（P4-18展開完了直後・対になるページの同時修正ルールに従い両ページへ同一パターン適用）。
- **1. リード文の分割**：`.ktn-mgmt-head__desc`（追補123〜125で文章構造を精緻化してきた長文）を「あなたが投稿者として作成した展覧会を確認・編集・削除します。」の1文へ短縮。追補117〜126で積み上げてきた「公開日設定＋管理者確認」「会期終了後は編集・削除不可（開催前を含む）」の内容自体は削らず、既存のスコープ注記（「この一覧には～投稿者として作成した展覧会のみ～」`.p319-notice`）と同じ構造（アイコン＋太字リード＋説明文）の**2つ目の`.p319-notice`**として独立させた。これにより`.p319-notice`が1ページに2個並ぶ最初の実例になった（既存6ページはいずれも1個のみ・特定の「1ページ1notice」規約があったわけではなく単に対象トピックが1つだった、という位置付けを確認済み）。3.の変更と整合させるため、「確認待ち・公開日未到来・**非公開**の間は～」の「非公開」語も削除（非公開はもうこの一覧に現れる状態ではないため）。
- **2. 展覧会タイプ表示の廃止**：`makeItem()`内`.p319-item__dest`（会場・会期を表示するメタ行）から先頭の`t.label`（個展/グループ展/その他）を削除し、「会場<span>·</span>会期」のみに変更。**フィルタ機能自体（`#p318FilterType`/`#p418FilterType`セレクト）は維持**——ユーザー指示は「カード上の表示」の廃止であり絞り込み機能の廃止ではないため区別。表示専用だった`var TYPE = {solo:...,group:...,other:...}`マスタが各closure内で完全に不要（他に参照箇所なし・grep確認済み）になったため削除。
- **3. 非公開展覧会をこの一覧から完全除外**：ユーザーの言明「非公開の展覧会はこの一覧には表示されません」は**バッジ非表示の指示ではなく、非公開状態そのものがこの一覧の対象外であるという業務ルールの確認**と解釈。`render()`のフィルタチェーンに`if (effStatus(e) === 'unpublished') return false;`を追加（`isDraft`早期リターンの直後・種別/ステータスフィルタより先＝フィルタ選択に関わらず常に除外）。根拠は追補119「非公開状態は管理者専用」——オーナーが操作できない状態を専用管理画面に表示する意味がないという判断で、追補120（重複チェックモーダルからの除外）と同じ理由付けの一覧本体への拡張。
  - ステータスフィルタの`<option value="unpublished">非公開</option>`（`#p318FilterStatus`/`#p418FilterStatus`）は選択しても該当項目が恒久的にゼロになるため削除。
  - `statusHtml()`の非公開バッジ分岐（`return '<span class="p318-status p318-status--unpublished">非公開</span>';`）は`render()`のフィルタにより実行時に到達しなくなったため、空文字を返す防御コードに置き換え、理由をコメントで明記（`dupCheckExhibitions()`は元々`pending`/`scheduled`のみを対象にしており`statusHtml`へ非公開項目を渡すことはない＝影響なしを確認済み）。
  - サンプルデータの非公開項目（P3-18の`x3`「破片のかたち」／P4-18の`g3`「静物と光の対話」）は**削除せず保持**し、「常に非表示になることを示すデータ」である旨をコード直上コメントに明記。理由＝除外フィルタが正しく機能していることをデモデータ自体で示せる（IDの欠番・振り直しも回避できる）ため。
- **CSS整理**：`.p318-status--unpublished{color:#6b7280;background:rgba(107,114,128,.06)}`（`kotennavi-common.css`）が上記3.の結果どこからも参照されなくなった（grep確認：JS側の唯一の参照元も空文字化済み）ため削除。直上のブロックコメントも「確認待ち／公開予定／非公開」→「確認待ち／公開予定」に修正し、非公開が一覧から除外される理由を追記。
- **検証**：`node --check kotennavi-pages.js`実行しOK。
- **保留事項**：ブラウザでの目視確認は未実施（ユーザー確認待ち）。
- **影響ファイル**：`kotennavi-p3-18.html`／`kotennavi-p4-18.html`（リード文簡潔化＋notice追加＋フィルタoption削除）、`kotennavi-pages.js`（`KTN.pages['p3-18']`/`['p4-18']`＝TYPE削除・dest表示簡略化・statusHtml防御化・renderフィルタ追加・サンプルデータコメント追記）、`kotennavi-common.css`（`.p318-status--unpublished`削除）、`docs/progress.md`。

### 2026-08-02 追補(128)（P3-13 ウォッチャー管理 新規制作）

- **ユーザー指示**：「p3-13,p4-13の作成をしましょう。まずはp3-13を作成して確認してからp4-13に展開しましょう」。sitemap.mdでは両ページとも「未作成」で詳細仕様が他ドキュメントにも存在しないため、既存コンポーネントを組み合わせて構成を新規設計した（P4-13は本ページの確認後に展開）。
- **既存コンポーネントの転用範囲の決定**：`.p2-watcher-item`/`.p2-watcher-list`（p2の「ウォッチャー」モーダル内で先に確立していたアバター＋名前＋活動カウントの行コンポーネント）を、**モーダルという文脈を離れて単独の管理ページ本文にそのまま流用**することを決定。アバター形状（円形=user／角丸12=creator／角丸4=gallery）とoutline色によるロール識別がモーダル外でも成立するため、新規カードコンポーネントを起こさなかった。React変換時も同一コンポーネントをモーダル/ページ両方から呼び出す想定でよい。
- **KPI数値の他ページとの整合**：サマリーの「総ウォッチャー数342人」「新規ウォッチャー86人・▲24%」は、p3-12（インサイト）の同項目の数値をそのまま踏襲した（新規に別の数字を作らなかった）。理由＝同一クリエイターの同一指標がページによって食い違うと後工程でのデータ源の統一が壊れるため。詳細な推移グラフはp3-12にある前提で、本ページには`ktn-guide-link`でp3-12への導線のみ置く（重複実装しない）。
- **「R/W」の「W」の解釈＝通知設定トグル**：sitemap.mdのアクセス欄「R/W」のうち書き込み(W)対象が本ページ内に何も無いと仕様として成立しないため、「新しいウォッチャーの通知（メール）」on/offを`.ktn-switch`で実装し、これを「W」の実体と定義した。ウォッチャーのブロック/ミュート等のモデレーション機能は全ドキュメントに前例がないため今回は実装せず、必要になった時点で別途追加する（読み取り専用の一覧＋通知設定のみが現時点のスコープ）。
- **検索窓を設けない判断**：サイト内の他の管理一覧ページ（p3-19等）がいずれも自由文字列検索を持たずセレクト式フィルタのみであるため、本ページも「種別」フィルタ＋「並べ替え」セレクトのみとし、`.p319-toolbar`/`.p319-filter`と同型のツールバー（`.p313-*`名）に揃えた。
- **ウォッチする側の種別を混在させた理由**：project memory「ウォッチ対象はクリエイター・ギャラリーのみ」は**ウォッチされる側**の制約であり、**ウォッチする側**（＝本ページのウォッチャー）は一般ユーザー・クリエイター・ギャラリーいずれもあり得るため、ダミーデータは3種別を混在させた。
- **表記ゆれの修正（副次的発見）**：`kotennavi-common.js`のPAGESオブジェクトで「ウオッチャー管理」（大きい「オ」の誤記）を`p3-13`/`p4-13`双方で発見し「ウォッチャー管理」に修正。同時に`p4-12`の「ギャラリー-インサート」も「ギャラリー-インサイト」に修正（sitemap.md側は元々正しく、common.js側のみの誤記だった）。
- **検証**：`node --check kotennavi-pages.js` / `kotennavi-common.js` 実行しOK。
- **保留事項**：ブラウザでの目視確認はユーザー確認待ち。承認後P4-13へ展開（Gallery SOIL 渋谷データで同型構築、`.p313-*`CSSはP4-13でも共有namespaceとしてそのまま再利用）。
- **影響ファイル**：`kotennavi-p3-13.html`（新規）、`kotennavi-pages.js`（`KTN.pages['p3-13']`新設）、`kotennavi-common.css`（`.p313-*`ブロック新設）、`kotennavi-common.js`（`PAGES['p3-13']`/`['p4-13']`/`['p4-12']`表記修正）、`docs/sitemap.md`（P3-13行の表記・status更新）、`docs/progress.md`。

### 2026-08-02 追補(129)（P3-13：ウォッチ数カウンター追加修正＋「オーディエンス管理」への拡張）

- **修正①（ウォッチ数の欠落）**：ユーザー指摘「ウオッチャーユーザーカードのカウンターにウオッチ数を追加してください」。既存canonical（p2ウォッチャーモーダルの`_W_DATA`/`SVG_W`実装）を確認したところ、正しい表示順は**ウォッチ→チェックイン→興味あり！→コレクション**の4指標だったが、追補128の初版実装はチェックイン・興味あり！のみで「ウォッチ」自体が抜けていた（ウォッチャー一覧なのにそのウォッチャーが何件ウォッチしているかが出ない矛盾）。`SVG_W`アイコン・`WATCHERS`各データへの`watch`フィールド・表示・`engage-desc`ソート式（`watch+checkin+interest`合算）を追加して是正。
- **相談→承認（ページ拡張）**：ユーザーから「このページを拡張して、ウオッチしてくれているユーザーと自分の展覧会(投稿・参加)にチェックインしたユーザー一覧にしたい。ページ名やページレイアウトを提案して」と相談を受けた。以下を提案し「進めて下さい」で承認：
  - ページ名を「ウォッチャー管理」→**「オーディエンス管理」（AUDIENCE）**に改称（ウォッチャー＋チェックイン双方を包含する上位概念のため）。
  - KPIを2枚→4枚（総ウォッチャー数／新規ウォッチャー／会場チェックイン人数／新規チェックイン）。
  - 通知トグルを2行（新規ウォッチャー通知／新規チェックイン通知）。
  - 一覧を内部タブ2枚（ウォッチャー／会場チェックイン）に分割。
- **新規ページ番号を起こさなかった理由**：sitemap.mdでP3-14が既に次番を占有しているため、番号を繰り下げる更新コストと引き換えに1ページ内で完結させる方を選んだ（project memory「ページ番号の正はsitemap.md」を尊重しつつ、機能追加のたびに全体番号をズラす運用コストを避ける判断）。内部タブ方式は既存の`.p315-tab-btn`/`.p514-tab`パターン（タブ自体は静的、親`.is-active`のみJSで切替、件数ピルは共有grouped selectorで着色）をそのまま`.p313-tab`として転用し、新規パターンを増やさなかった。
- **KPI数値の整合**：新設した「新規チェックイン37人・増減なし」はp3-12（インサイト）の既存の同項目の数値をそのまま踏襲（追補128で確立した「同一指標はページを跨いで数値を揃える」方針の継続適用）。
- **チェックイン一覧のスコープ＝「投稿・参加」双方**：ユーザーの言明どおり、P3-18（展覧会管理＝投稿者のみが対象）よりスコープが広い。ダミーデータの展覧会はP3-18の`EXHIBITIONS`（x4/x5/x7）をそのまま再利用し、**x5「まなざしの重奏」はグループ展で田中透は参加者の1人（投稿者ではない）** というデータをあえて含めることで「参加」側の実例を確保した。
- **新規コンポーネント`.p313-ck-exh`**：チェックイン一覧の各行に「どの展覧会でチェックインしたか」を示すタグチップを追加。1人のユーザーが複数展覧会にチェックインしうるため行単位＝チェックインイベント単位で表示する設計とし、既存バッジ体系（`.cb-*`/`.sb-*`/`.aws-*`）のいずれにも該当しない軽量な文脈タグとして新規に`page-accent-bg`背景・`page-accent`文字色の小型ピルを作成（フィルタ用の展覧会選択肢とも連動）。
- **CSS重複の自己修正**：アクティブタブの件数ピル着色を最初`.p313-tab.is-active .ktn-count--pill{…}`という単独ルールで書いたが、同じ役割の既存grouped selector（`kotennavi-common.css` ~L3355・`.p5-type-tab.is-active`/`.p514-tab.is-active`/`.p315-tab-btn.is-active`/`.p314-tab.is-active`）と完全に重複することに気づき、単独ルールを削除して`.p313-tab.is-active .ktn-count--pill`を同selectorへ追加する形に修正（single source of truth の原則を維持）。
- **未使用コードの削除**：実装途中で追加した`EXH_NAMES`ルックアップは、各チェックインデータに`exhName`を直書き済みで参照される箇所が無かったため削除。
- **`p4-13`は今回未変更**：`kotennavi-common.js`の`PAGES['p4-13']`は旧名「ギャラリー-ウォッチャー管理」のまま据え置き。P4-13着手時に「ギャラリー-オーディエンス管理」へ改称し、`docs/sitemap.md`のP4-13行も合わせて更新する。
- **検証**：`node --check kotennavi-pages.js`実行しOK（ウォッチ数修正・拡張の両ラウンドとも）。
- **保留事項**：ブラウザでの目視確認はユーザー確認待ち。承認後、本ページの全構成（4KPI・2通知トグル・2タブ・チェックインチップ含む）をP4-13へ展開する。
- **影響ファイル**：`kotennavi-p3-13.html`（head/KPI/通知/タブ構成を全面改修）、`kotennavi-pages.js`（`KTN.pages['p3-13']`＝`SVG_W`追加・`CHECKINS`データ新設・タブ切替/2つ目の通知トグル/チェックイン一覧レンダリング追加）、`kotennavi-common.css`（`.p313-tabs`/`.p313-tab`/`.p313-ck-exh`/`.p313-notify-list`新設、grouped selectorへ`.p313-tab.is-active .ktn-count--pill`追加）、`kotennavi-common.js`（`PAGES['p3-13']`を「オーディエンス管理」に改称）、`docs/sitemap.md`（P3-13行名称更新）、`docs/progress.md`。

### 2026-08-02 追補(130)（P3-13：通知1本化・チェックインカードにチェックイン数追加・訪問履歴を行分離）

- **ユーザー指摘（3点）**：「1.通知設定は共通の一つだけ 2.チェックインユーザーのカウンターにもチェックイン数を 3.チェックインユーザーのチェックイン日付はカウンターの下の行でチェックイン日付とチェックイン展覧会名・会期を一行に、複数チェックインの場合は複数行に」。追補129で拡張した直後のラウンドでの追加是正。
- **1. 通知を単一トグルへ統合**：追補129で「ウォッチャー通知」「チェックイン通知」を別トグルとして分離実装したが、ユーザーは1本化を希望。オーディエンス（ウォッチャー＋チェックイン）は同じ「自分に関心を持ってくれた人」という単一概念なので、通知設定も1つに集約するのが自然という判断で承服。`#p313CkNotifySw`とその行・JSハンドラを削除し、`#p313NotifySw`のタイトル/本文を「新しいオーディエンスの通知」（ウォッチ・チェックイン両方に言及）に書き換え。CSS`.p313-ck-notify-sw`セレクタも削除。
- **2. チェックインカードのカウンター欠落**：追補129時点のチェックイン一覧は「1行＝1チェックインイベント」構造だったため、カード内カウンターは watch・interest の2つのみで、そのチェックイン自体の「チェックイン数」という概念がカードに出ていなかった（日付はテキストとして別途表示していたが、カウンターアイコンではなかった）。ウォッチャータブのカウンター（ウォッチ→チェックイン→興味あり！の3アイコン、canonical順）と非対称だったのがユーザー指摘の核心。
- **データ構造の変更（1行＝1人へ）**：上記2.と3.を同時に満たすため、`CHECKINS`を「1行＝1チェックインイベント（`exh`/`date`を直接持つ）」から**「1行＝1人（`visits:[{exh,exhName,period,date,ts}, …]`配列を持つ）」に再設計**。この結果チェックイン数＝`c.visits.length`として自然に導出できるようになり、カウンター行を`SVG_W`＋`SVG_C`（`visits.length`）＋`SVG_I`の3アイコン・ウォッチャータブと同一順序に統一した。1人が複数展覧会／同一展に複数回チェックインするケースを表現するため、ダミーデータに**高橋陶子（同一展`x4`に2回来場）**・**山本結（異なる2展`x7`→`x5`に来場）**を追加し、複数行表示が実際に機能する例を用意した。
- **3. 訪問履歴をカウンター下の行へ分離**：カウンター行からは日付・展覧会名を完全に外し、新規`.p313-ck-visits`（`.p313-ck-visit`×N＝`__date`＋`__exh`「展覧会名（会期）」）としてカード下部に**visit 1件＝1行**で表示。表示順は各人物のvisitsを`ts`降順（新しい来場が上）でソート。旧`.p313-ck-exh`（カウンター行内の展覧会名チップ）はこの新レイアウトで役割が重複するため削除。
- **フィルタ/ソートの追随変更**：「展覧会」フィルタは`c.visits.some(v => v.exh === fe)`（いずれかのvisitが一致すれば表示）に変更。「チェックインが新しい/古い順」は各人物の最新/最古visitの`ts`（`ckLatestTs`/`ckEarliestTs`ヘルパー）を基準に、「エンゲージメントが多い順」の合算式にも`visits.length`（チェックイン数相当）を追加。
- **検証**：`node --check kotennavi-pages.js`実行しOK。`.p313-ck-exh`・`#p313CkNotifySw`・`.p313-ck-notify-sw`の残存参照が無いことをgrepで確認済み。
- **保留事項**：ブラウザでの目視確認はユーザー確認待ち。承認後、本ラウンドの最終構成（通知1本化・3アイコンカウンター・visits行表示）でP4-13へ展開する。
- **影響ファイル**：`kotennavi-p3-13.html`（通知セクションを1行構成へ）、`kotennavi-pages.js`（`KTN.pages['p3-13']`＝`CHECKINS`をvisits構造へ再設計・`makeCkItem`/`renderCk`/`CK_SORTS`改修・`ckNotifySw`ハンドラ削除）、`kotennavi-common.css`（`.p313-ck-exh`削除・`.p313-ck-visits`/`.p313-ck-visit`新設・`.p313-ck-notify-sw`セレクタ削除）、`docs/progress.md`。

### 2026-08-02 追補(131)（P3-13：訪問履歴行の視覚強化——グレーチェックインマーク・展覧会バッジ・会期の括弧廃止）

- **ユーザー指摘**：「チェックインの日付の前にグレーのチェックインマーク展覧会タイトルの前に小さな展覧会バッジ、会期はカッコなしにしてください。」追補130で新設した`.p313-ck-visit`（訪問履歴の1行表示）に対する視覚面の追加指摘。
- **グレーのチェックインマーク**：カウンター行の`SVG_C`（チェックイン数アイコン・青`#3a90e0`塗り）とは別に、日付の前だけに使う控えめなグレー版`SVG_C_GRAY`（`#9aa3ac`塗り・10px）を新規定義。カウンター行の色付きアイコンと訪問履歴行の日付マークは役割が違う（前者はエンゲージメント数値、後者は日付のラベル的な補助記号）ため、同一色で強調を揃えると数値との区別がつきにくくなる、という判断で意図的に別トーンにした。
- **展覧会タイトル前の小型バッジ**：新規CSSを作らず、既存canonicalの`.cb.cb-content.cb-exhibition`（サイト全体で確立済みの「展覧会」種別バッジ・`kotennavi-p3-1.html`等で`<span class="cb cb-content cb-exhibition">exhibition</span>`として使用されている単一ソース）をそのまま`.p313-ck-visit__exh`内の展覧会名前に配置。project memory「バッジはタイトル前だけ」の原則どおり、コンテンツ名（展覧会名）の直前という定位置に置いた。
- **会期の括弧廃止**：`v.exhName + '（' + v.period + '）'`だった連結を`v.exhName + ' · ' + v.period`に変更。区切り記号は本ページのidentity strip既存メタ表記（`絵画・現代美術 · 東京`）と同じ「 · 」に揃え、新しい記法を増やさなかった。
- **検証**：`node --check kotennavi-pages.js`実行しOK。
- **保留事項**：ブラウザでの目視確認はユーザー確認待ち。
- **影響ファイル**：`kotennavi-pages.js`（`SVG_C_GRAY`追加・`makeCkItem`の訪問履歴行マークアップ変更）、`kotennavi-common.css`（`.p313-ck-visit__date`/`.p313-ck-visit__exh`をinline-flexに調整しアイコン・バッジの整列を追加）、`docs/progress.md`。

### 2026-08-03 追補(132)（P3-13：種別フィルタ撤去・ウォッチ開始表示位置変更・「チェックイン」呼称統一・訪問行レイアウト再編）

- **ユーザー指摘（4点）**：「1.ウオッチャーも会場チェックインも種別の絞り込は不要です。このサイトでは、ウオッチやチェックインはゆーザー機能と定義しているので、クリエイター・ギャラリーロールを持っているかどうかは意識させたくない 2.ウオッチャーのウオッチ開始はカウンターの後ろで、グレーのウオッチマーク＋日付にしてください 3.「会場チェックイン」→「チェックイン」に変更して下さい 4.レスポンシブのスマホサイズで見たときにチェックインのチェックイン日付が変に字下げして展覧会バッジと展覧会名・会期が改行していたけど、チェックイン日付と展覧会バッジを一行に、展覧会名・会期を次の行にしてください」。
- **1. 種別フィルタの撤去（データは維持）**：ウォッチャー・チェックイン両タブの`種別`絞り込み`<select>`（`#p313FilterType`/`#p313CkFilterType`）とその`<label>`・JS変数・フィルタ処理・イベントリスナーを削除。**`type`フィールド自体（user/creator/gallery）はデータから削除しない**——サイト全体のアバター形状・outline色規約（`.p2-watcher-item__avatar--{type}`）が引き続きこれを参照するため。判断軸：「能動的にロールを意識させるUI（フィルタで絞り込む操作）」は撤去するが、「受動的なロール識別のサイン（アバターの形・枠色）」はサイト全体で確立済みの規約なのでそのまま残す。ユーザーの理由（watch/checkinはロール非依存の汎用ユーザー機能）に照らし、フィルタという能動的な絞り込みUIのみが「ロールを意識させる」対象と判断した。展覧会フィルタ（チェックインタブの`#p313CkFilterExh`）・並べ替え（`sortSel`/`ckSortSel`）は指摘外のため維持。
- **2. ウォッチ開始表示のカウンター行外への移動**：`makeItem()`のカウンター行（`.p2-watcher-item__counts`）を「ウォッチ開始 {date}」を除いた`SVG_W`→`SVG_C`→`SVG_I`の3アイコンのみに統一し、チェックインタブのカウンター行と完全に同型にした。「ウォッチ開始 {date}」はカウンター行の下に新設した`.p313-w-since`（`display:inline-flex;margin-top:5px`）へ移動し、追補131で確立した「グレーの控えめアイコン＋日付」パターン（`SVG_C_GRAY`）を踏襲する`SVG_W_GRAY`（`#9aa3ac`塗り・白抜き中心・10x10、`SVG_W`の配色違い版）を新設して先頭に付与。これによりカウンター行はエンゲージメント数値だけの行として両タブで対称になり、日付という補助情報は別行に分離された。
- **3. 「会場チェックイン」→「チェックイン」呼称統一**：HTML（`kotennavi-p3-13.html`のヘッド説明文・KPIラベル「チェックイン人数」・通知説明文・タブボタンラベル・aria-label）、JS（`kotennavi-pages.js`のセクション見出しコメント・インラインコメント）、CSS（`kotennavi-common.css`のP3-13ブロック冒頭コメント）を一括置換。**スコープはP3-13の自ファイルのみ**（p3-12インサイトページ等、他ページの「会場チェックイン」表記には触れていない）——ユーザーの指摘が本ページの文脈（オーディエンス管理のタブ名・説明文）に対するものであり、他ページへの展開は明示的に依頼されていないため。P4-13展開時に同一の呼称で新規作成する。
- **4. チェックイン訪問行のレスポンシブ崩れ修正（構造再編）**：原因診断＝`.p313-ck-visit{align-items:center}`（ベースルール）が、モバイル`@media(max-width:540px)`の`flex-direction:column`オーバーライドと組み合わさった際にも解除されずに継承され、各行が中央寄せになって「変な字下げ」に見えていた。加えて`.p313-ck-visit__exh`は`display:inline-flex;flex-wrap:wrap`だったため、展覧会バッジ・展覧会名・会期が横幅不足時にバッジ単体で改行される崩れ方をしていた。**修正はモバイル限定のパッチではなく通常表示から構造自体を再編**：新設`.p313-ck-visit__top`（日付＋展覧会バッジのみを横並びでグループ化）と`.p313-ck-visit__exh`（展覧会名・会期のみのプレーンテキスト行に単純化）の2行構成にHTML自体を変更し、`.p313-ck-visit`本体を常時`flex-direction:column;gap:3px`（`align-items`指定なし＝デフォルトの`stretch`／`flex-start`相当で左揃え）にした。ユーザーの指摘に「モバイルのみ」という限定が付いていなかったこと、また2グループ化はモバイル・デスクトップ双方で意味のある情報のまとまり（いつ・何のバッジ／どの展覧会か）であることから、デスクトップ表示も含めて統一するのが妥当と判断。結果、モバイル専用の`.p313-ck-visit{flex-direction:column;gap:1px}`オーバーライドは冗長になったため削除。
- **検証**：`node --check kotennavi-pages.js`実行しOK。`p313FilterType`/`p313CkFilterType`/`typeSel`（P3-13スコープ内）/「会場チェックイン」の残存参照が無いことをgrepで確認済み。
- **保留事項**：ブラウザでの目視確認はユーザー確認待ち。承認後、本ラウンドの最終構成（種別フィルタ無し・ウォッチ開始行分離・チェックイン呼称・訪問行2グループ構造）でP4-13へ展開する（`kotennavi-common.js`の`PAGES['p4-13']`名称更新・`docs/sitemap.md`のP4-13行更新も同時に行う）。
- **影響ファイル**：`kotennavi-p3-13.html`（種別filter`<label>`削除・「チェックイン」表記統一）、`kotennavi-pages.js`（`SVG_W_GRAY`追加・`makeItem`/`render`/`makeCkItem`/`renderCk`改修・コメント表記統一）、`kotennavi-common.css`（`.p313-w-since`新設・`.p313-ck-visit`/`__top`/`__exh`再構成・モバイル専用オーバーライド削除）、`docs/progress.md`。

### 2026-08-03 追補(133)（P3-13：ウォッチ開始のラベルテキスト廃止・チェックイン訪問行を「日付単独／バッジ＋展覧会名＋会期」の2行へ再編）

- **ユーザー指摘（2点）**：「1.「ウオッチ開始」という文字は不要、ウオッチマークと日付だけでよい 2.チェックインの場合、デスクトップの場合、チェックインマーク+日付と展覧会+タイトル+会期は別の行に」。追補132の直後ラウンドでの追加是正。
- **1. 「ウォッチ開始」テキストの削除**：追補132で新設した`.p313-w-since`はグレーのウォッチアイコン＋「ウォッチ開始 {date}」というラベル付きテキストだったが、ユーザーはアイコン自体が「ウォッチした」ことを示すサインとして機能するため、ラベルテキストは冗長と判断。`makeItem()`の該当行を`SVG_W_GRAY + w.since`のみに変更し、アイコン＋日付だけの表示にした。
- **2. チェックイン訪問行の再グルーピング**：追補132では「チェックイン日付と展覧会バッジを一行に、展覧会名・会期を次の行に」という指摘に対し`.p313-ck-visit__top`（日付＋バッジ）／`.p313-ck-visit__exh`（展覧会名＋会期）の2行構成にしたが、今回の指摘で「バッジは展覧会（名前・会期）側に属する」という意図がより明確になった（バッジは「これは展覧会です」という種別サインなので、日付ではなく展覧会名とセットで読ませる方が自然）。`.p313-ck-visit__top`ラッパーを廃止し、`.p313-ck-visit__date`（チェックインマーク＋日付のみ）→`.p313-ck-visit__exh`（`cb cb-content cb-exhibition`バッジ＋展覧会名＋会期をまとめて1行）の2行構成に変更。**`.p313-ck-visit`自体は追補132から変更なく常時`flex-direction:column`のため、この2行分離はデスクトップ・モバイル問わず同一に適用される**（ユーザーは「デスクトップの場合」と述べたが、モバイル限定にする理由がないため両方に適用）。
- **検証**：`node --check kotennavi-pages.js`実行しOK。「ウォッチ開始」の文言・`.p313-ck-visit__top`の残存参照が無いことをgrepで確認済み。
- **保留事項**：ブラウザでの目視確認はユーザー確認待ち。承認後、本ラウンドの最終構成でP4-13へ展開する。
- **影響ファイル**：`kotennavi-pages.js`（`makeItem`の`.p313-w-since`テキスト削除・`makeCkItem`の訪問履歴行マークアップ再編）、`kotennavi-common.css`（`.p313-ck-visit__top`削除・`.p313-ck-visit__exh`をinline-flexへ戻しバッジ整列を追加）、`docs/progress.md`。

### 2026-08-03 追補(134)（P4-13：ギャラリー-オーディエンス管理 新規制作＝P3-13をgalleryへ展開）

- **ユーザー依頼**：「ではp3-13の確認完了で、p4-13に展開して、p3-15に購入者一覧を追加してください。」P3-13（追補133まで反映済みの最終形）をP4-13へ展開する作業。
- **実装方式＝p3-14/p4-14と同一の「CSSクラス共有＋要素ID差し替え」パターン**：`kotennavi-p4-13.html`はP3-13のHTML構造を丸ごと踏襲し、`.p313-*`のCSSクラス名はそのまま再利用（新規CSSは一切追加していない）。要素IDのみ`p313*`→`p413*`に一括差し替え。identity stripはgallery仕様（`.ktn-mgmt-context__media--gallery`／`cb cb-person cb-gallery`／Gallery SOIL 渋谷／「ギャラリーページへ →」）に置換し、`<body>`は`p4-13-page p4-page mgmt-page`、dbarロールボタンは`user+gallery`。P4-12（インサイト）への誘導リンクも合わせて設置（P4-12自体は未作成のためリンク先は将来作成予定のまま）。
- **JS＝独立関数として新規実装**：`kotennavi-pages.js`に`KTN.pages['p4-13']`を`p3-13`とは完全に独立した関数として追加（p3-14/p4-14が別関数である慣例に整合）。アイコン定数（`SVG_W`/`SVG_C`/`SVG_I`/`SVG_C_GRAY`/`SVG_W_GRAY`）は各ページ関数内スコープのため複製。`makeItem`/`render`/通知トグル/`makeCkItem`/`renderCk`のロジックはP3-13と同一（追補133の最終形＝ウォッチ開始はアイコン＋日付のみ、チェックイン訪問行は日付単独／バッジ＋展覧会名＋会期の2行）をそのまま踏襲。
- **ダミーデータはGallery SOIL 渋谷向けに新規作成**：`WATCHERS`（14件）・`CHECKINS`（12件）とも人物名は既存デモデータ（佐藤美咲・田中透・渡辺硝子等、他ページでも使い回されている共通デモ人物）を流用しつつ、数値・日付はギャラリー文脈に合わせて調整。**チェックインタブの展覧会データはP4-18（ギャラリー-展覧会管理）の`EXHIBITIONS`配列から選定**：g4（色彩のかけら、その先へ／2026.7.25-8.15／live／solo）・g5（かたちなきものたちの声／2026.7.10-7.24／ending／group）・g7（路地裏の詩、冬の記録／2025.12.1-12.20／closed／solo）の3件を、P3-13のx4/x5/x7（live-solo／ending-group／closed-solo）と同じ状態構成になるよう対応させて選んだ（無関係な展覧会名を新規に作らず、既存のギャラリー展覧会ロースターと整合させるため）。
- **表記統一（「ウォッチャー管理」→「オーディエンス管理」の残存箇所を解消）**：`kotennavi-common.js`の`PAGES['p4-13']`を「ギャラリー-ウォッチャー管理」→「ギャラリー-オーディエンス管理」に改称（パンくず末尾も同様）。加えて、P3own-page（`page==='p3'`のオーナーメニュー、role=creator/admin計2箇所）とP4own-page（`page==='p4'`のオーナーメニュー、role=gallery/admin計2箇所）内の`ddi('watch','ウォッチャー管理')`を計4箇所すべて「オーディエンス管理」に統一（追補128時点でP3-13/P4-13のページ名自体は修正済みだったが、各ページトップのオーナーメニュー項目名は据え置かれていたため、P4-13着手のこのタイミングで揃えた＝`docs/progress.md`の「P4-13着手時に同時変更」という先送りメモに対応）。
- **付随ドキュメント更新**：`docs/sitemap.md`のP4-13行を名前「ギャラリー-オーディエンス管理」・ファイル`kotennavi-p4-13.html`・状態「調整中」に更新。`docs/page-production-guide.md`のP3-13/P4-13行の名称も「オーディエンス管理」に統一（P4-13は重複行が残っていたため1行に統合）。
- **検証**：`node --check kotennavi-common.js` / `kotennavi-pages.js` 実行しOK。
- **保留事項**：ブラウザでの目視確認はユーザー確認待ち。次はP3-15（クリエイター-LIAISON+コンソール）への「購入者一覧」セクション追加に着手（P3-13/P4-13とは別の相談で、ウォッチ/チェックインという非金銭的エンゲージメントを扱うP3-13/P4-13に対し、購入者一覧は取引・金銭データのためP3-15が適切と判断・ユーザー承認済み）。
- **影響ファイル**：`kotennavi-p4-13.html`（新規作成）、`kotennavi-pages.js`（`KTN.pages['p4-13']`新規追加）、`kotennavi-common.js`（`PAGES['p4-13']`改称・オーナーメニュー4箇所改称）、`docs/sitemap.md`、`docs/page-production-guide.md`、`docs/progress.md`。

### 2026-08-03 追補(135)（P3-15：「購入者一覧」タブ新設＝期間中・終了展覧会を横断した購入者データの集約表示）

- **ユーザー依頼**：「p3-15に購入者一覧を追加してください」（追補134のP4-13展開と同一指示の後半）。事前の相談「リエゾン+の作品購入者一覧を閲覧できるようにするとしたら、p3-13とp3-15のどっちが適している？」に対し、**p3-15が適切と回答しユーザー承認済み**（p3-13はウォッチ/チェックインという非金銭的エンゲージメントに意図的にスコープを限定したページ、購入者一覧は取引・金銭が絡む商流データのためp3-15の既存ドメインに整合）。
- **タブ構成を2→3に拡張**：既存「期間中展覧会」（`p315-panel-active`）・「終了した展覧会」（`p315-panel-archive`）に続けて3番目のタブ「購入者一覧」（`data-panel="p315-panel-buyers"`、件数ピル10）を追加。
- **JS変更なし（意図的）**：`KTN.pages['p3-15']`内のタブ切替ロジック（`.p315-tab-btn`/`.p315-tab-panel`をNodeListで取得しforEachでイベント登録）はタブ数に依存しない汎用実装のため、HTMLに3つ目の`.p315-tab-btn`/`.p315-tab-panel`ペアを追加するだけで自動的に機能した。他にハードコードされた`p315-panel-*`参照が無いことをgrepで確認済み。
- **データ抽出（既存ページ内データの監査による）**：期間中展覧会タブの全`.p315-txn-row`を精査し、確定した購入者（進行中/完了の取引を持つ行）8名を抽出：高橋麻衣（流れる時間／完了確認待ち）・小林誠（夜の静寂／発送待ち）・山田花子（音の輪郭No.7／購入確定待ち）・佐藤美咲（言葉の重力No.3／支払待ち）・田村健（透明な午後／受取確認待ち）・田中次郎（風の記憶／購入確定待ち）・中村彩（線の重なり／購入確定待ち）・木村啓子（声の痕跡／取引完了）。**除外**：鈴木一郎（音の輪郭No.7の#2＝申込済でキュー待ちのみ、まだ購入確定に至っていないため購入者ではない）、および全ての`p315-txn-row--cancelled`行（申込キャンセル済）。
- **アーカイブ分の購入者名は新規デモデータとして付与**：終了した展覧会タブの実績テーブル（堆積する声¥180,000・積層する沈黙¥165,000）は元々購入者名を持たない列構成だったため、一覧に含めるにあたり伊藤沙織・渡辺隼人という新規ダミー名を割り当てた（このページおよび既知の他ページで未使用の名前を選定し、既存デモ人物との重複を避けた）。計10件。
- **表形式は既存`.p315-archive-table`を流用・新規CSSなし**：列＝購入者/作品/展覧会/価格（税込）/ステータス/取引。同テーブルクラスは元々「作品名/価格/送料/手数料/受取金額/完了日」という異なる列セットの実績表用だったが、`nth-child`ルールがpadding調整のみで列の意味に依存しない汎用構造だったため、列見出し・内容を差し替えるだけで新規列構成に転用できた（レスポンシブ対応の`data-label`によるモバイルカード化も自動継承）。
- **ステータスセルは既存の状態バッジクラスを再利用**：`.p315-apply-status--stock/--ship/--pay/--recv/--finish/--done`は期間中展覧会タブの取引行で既に使われている色分けクラスで、これをそのまま表内`<span>`に適用し、タブ間で状態の色使いを統一（新規の状態表現を作らない）。
- **取引列のリンク文言はページ内の既存表記に統一**：「取引デスクへ →」（`.ktn-action-btn`、`kotennavi-p3-16.html`へ）。同ページの期間中展覧会タブでは完了済み取引（木村啓子の行）にも同じ文言・同じリンク先が既に使われており、それに合わせた（p5-15側の「取引詳細」呼称はp5-15固有の購入者向け表記であり、p3-15セラー側では踏襲しない）。
- **リード文は新規クラスを作らず`.p315-related-link__desc`の既存スタイルを再利用**（余白のみインライン`style="margin:0 0 14px"`で調整。CLAUDE.mdの「HTML内にCSSコードブロックを含めない」規約は`<style>`ブロックの話であり、本ファイル内で既に前例のあるインライン`style`属性での軽微な余白調整とは矛盾しない）。
- **検証**：タブボタン数とパネル数の対応をgrepで確認（3ボタン/3パネル、`data-panel`と`id`が一致）。`kotennavi-pages.js`内に`p315-panel-active`/`p315-panel-archive`/`p315-panel-buyers`のハードコード参照が存在しないことを確認（JS変更不要の裏付け）。
- **保留事項**：P4-15（ギャラリー版LIAISON+コンソール）への同機能展開はユーザー未指示。P3-13→P4-13の「creator側で確定→gallery側へ展開」という確立済みパターンに倣い、ユーザーからのP3-15確認・展開指示を待って着手する想定。ブラウザでの目視確認もユーザー確認待ち。
- **影響ファイル**：`kotennavi-p3-15.html`（タブボタン1件・タブパネル1件を追加）、`docs/progress.md`。`kotennavi-pages.js`・`kotennavi-common.css`・`kotennavi-common.js`は変更なし（既存の汎用実装・共通クラスで対応できたため）。

### 2026-08-03 追補(136)（P3-15：「購入者一覧」タブの3点改修＝ニックネーム表示・完了日追加・列ソート）

- **ユーザー依頼**：「p3-15購入者リスト：購入者にはユーザーネックネームを表示p5へのリンク付き、取引完了には日付を追加、購入者・作品・展覧会・価格・ステータスがそれぞれソートできるようにしてください」（追補135の直後の改修指示）。
- **(1) 購入者を実名→ニックネーム＋p5リンクに変更**：`.p315-txn-row`（期間中展覧会タブ）は元々購入者を実名テキストのみで表示しており、購入者一覧タブもそれを踏襲していたが、本改修で全10行を`<a class="p315-buyer-link" href="kotennavi-p5.html">{nickname}</a>`に置換。**根拠＝`kotennavi-p3-16.html`（取引デスク）の`.p316-purchase-buyer__card`が既に購入者を実名でなくニックネーム「hanaco」で表示している既存パターン**（追補135以前から存在）。出品者向け画面では購入者個人情報を実名開示しないという既存方針を、購入者一覧タブにも整合させた。ニックネームは10件新規採番（高橋麻衣→takahashi_mai 等）、**田中次郎→jiro_t**（このページのオーナー「田中透」と姓が重複するため、tanaka_*にすると識別子として紛らわしいことを避けた）。
- **リンククラスは新規`.p315-buyer-link`を作成（既存クラス2案を却下）**：`.ktn-guide-link`（ガイド参照リンク）は末尾「→」矢印必須の規約があり、これはエンティティ名リンクではなく明示ナビCTA専用（プロジェクトメモ`feedback_arrow_navigation.md`）のため不適合。`.p315-exh-head__title`（既存のホバー下線パターン）はShippori Mincho（明朝）だが、ニックネームはハンドル名でありCLAUDE.mdのフォント使い分け原則上「UI・識別子情報→`--fn`ゴシック」に該当するため不採用。**新規`.p315-buyer-link`＝`--fn`ゴシック＋通常色`var(--ink)`＋hoverで`var(--accent)`＋下線**（矢印なし）で新設（common.css、`.p315-archive-table--grouped`ルール群の直後）。
- **(2) 取引完了行に完了日を追加**：新規列は作らず、既存`.p315-apply-status--done`のバッジテキスト内に「 · 」区切り（ページ内`.p315-exh-head__dot`等で既出の慣例）で日付を追記（例：「取引完了 · 2026.03.09」）。**新規列にしなかった理由**＝10行中3行のみ該当するため列にすると7行が空欄になり不経済。木村啓子=2026.03.09、伊藤沙織=2026.01.08、渡辺隼人=2026.01.10（いずれも新規デモ値）。
- **(3) 5列（購入者/作品/展覧会/価格/ステータス）をソート可能に**：**サイト内に既存のソート可能テーブルUIパターンが存在しなかった**ため新規設計。各`<th>`内に`<button class="p315-buyers-sort-btn" data-sort="{buyer|work|exh|price|status}">`＋CSS三角形の`<span class="p315-buyers-sort-btn__arrow">`（`border-bottom`三角形・`.is-desc`で180度回転・`.is-active`で不透明度UP＋`var(--page-accent)`着色＝サイトの「意味のある状態＝page-accent」慣例に整合）。各`<tr>`に`data-buyer`/`data-work`/`data-exh`/`data-price`/`data-status`属性を追加（`data-status`は文字列でなく数値ランク：購入確定待ち=1／支払待ち=2／発送待ち=3／受取確認待ち=4／完了確認待ち=5／取引完了=6＝CLAUDE.md「LIAISON+取引状態名」の進行順に対応させ、アルファベット順でなく状態の進行順でソートされるようにした）。JS（`kotennavi-pages.js`の`KTN.pages['p3-15']`内、末尾`window.ktnRender`直前にセクション「7. 購入者一覧タブ：列ソート」として追加）はクリックで昇順/降順トグル・`localeCompare('ja')`（文字列列）または数値比較（価格・ステータス）で行を並べ替えてDOM上`tbody`に再`appendChild`する汎用IIFE。**テーブル自体（`.p315-archive-table`）は改修なし**＝`nth-child`ベースの汎用CSSのため列内容の変化に影響を受けない。
- **検証**：`node --check kotennavi-pages.js`成功。HTML側の`data-*`属性名とJSの`dataset.{buyer|work|exh|price|status}`参照が一致することをgrepで確認。
- **保留事項**：P4-15への本改修（追補135のタブ本体＋本追補の3点改修）の展開はユーザー未指示。追補135と同様、ユーザーからのP3-15確認・展開指示を待つ。ブラウザでの目視確認（ソート動作含む）もユーザー確認待ち。
- **影響ファイル**：`kotennavi-p3-15.html`（購入者一覧タブの`<table>`を差し替え）、`kotennavi-common.css`（`.p315-buyers-sort-btn`系・`.p315-buyer-link`を新規追加）、`kotennavi-pages.js`（`KTN.pages['p3-15']`にソートハンドラのIIFEを追加）、`docs/progress.md`。

### 2026-08-03 追補(137)（P3-15：購入者一覧タブのモバイル2点修正＝タブはみ出し・ソートのモバイル未対応）

- **ユーザー指摘**：「レスポンシブのスマホサイズの時に購入者一覧のタブがはみ出している、ソートはどう動作するの？」（追補136の直後）。
- **①タブ行はみ出しの原因＝`.p315-tab-nav`の`overflow-x:auto`欠落**：p3-15/p4-15のタブ行は`display:flex`＋各ボタン`white-space:nowrap`で、幅超過時は横スクロールで収める設計（兄弟パターン`.p314-tabs`・`.p3-tabnav__inner`・`.p4-tabnav`は全て`overflow-x:auto;scrollbar-width:none`を持つ）。**`.p315-tab-nav`だけこの1行が元々抜けていた**（2タブ時代は偶然幅に収まっていたため顕在化しなかった潜在バグ・追補135で3タブ目「購入者一覧」を追加したことで露呈）。common.css `.p315-tab-nav`ルールに`overflow-x:auto;scrollbar-width:none`＋`::-webkit-scrollbar{display:none}`を追加。p4-15も同一クラスを共有するため同時に修正される。
- **②列ソートがモバイルで機能しない原因＝カード化でthead自体が消える既存仕様**：`.p315-archive-table`は640px以下で`.p315-archive-table thead{display:none}`（既存・精算履歴テーブル等でも同じ仕様）になり行をカード化する設計のため、追補136でthead内に置いたソートボタン（`.p315-buyers-sort-btn`）がモバイルでは非表示になり操作不能だった。**新規`.p315-buyers-sort-mobile`（640px以下のみ表示、それ以外は`display:none`）＝`<select id="p315BuyersSortSel">`で代替**（購入者順/作品名順/展覧会名順/価格が高い順・低い順/ステータス進行順・逆順の7オプション）。デザインは`.p313-filter`（p3-13の並べ替えセレクト）と同系統だが、既存クラス流用ではなく新規`.p315-buyers-sort-mobile*`として定義（p313側は別ページのトグル群と密結合したレイアウトのため、単独流用は不適合と判断）。
- **JS実装**：`sortRows(key,dir)`の外側に共有関数`applySort(key,dir)`を新設し、ボタンクリック・セレクト変更どちらからも呼び出す構成に統一（状態を`curKey`/`curDir`で共有し、片方を操作すればもう片方の表示にも反映＝ボタンの`is-active`/`is-desc`とセレクトの`value`が常に一致。ウィンドウ幅をまたいだ操作でも状態が食い違わない）。
- **検証**：`node --check kotennavi-pages.js` / `kotennavi-common.js`成功。
- **保留事項**：ブラウザでの目視確認（モバイル幅でのタブ横スクロール・ソートセレクト動作）はユーザー確認待ち。P4-15への展開は引き続き未指示のため保留。
- **影響ファイル**：`kotennavi-p3-15.html`（モバイルソートセレクトを追加）、`kotennavi-common.css`（`.p315-tab-nav`にoverflow追加・`.p315-buyers-sort-mobile*`新規）、`kotennavi-pages.js`（`applySort`共有関数化・セレクトのchangeリスナー追加）、`docs/progress.md`。

### 2026-08-03 追補(138)（P4-15：P3-15「購入者一覧」タブをgallery側へ展開）

- **ユーザー指示**：「確認しました。これをp4-15に展開してください」（追補135〜137のP3-15最終形をP4-15へ展開する指示。P3-13→P4-13と同じ「creator側で確定→gallery側へ展開」パターンの踏襲）。
- **CSS変更なし**：`kotennavi-p4-15.html`は元々P3-15と同じ`.p315-*`プレフィックスのCSSクラスを共有している（タブ・テーブル・ボタン等すべて）ため、追補136/137で追加した`.p315-buyer-link`／`.p315-buyers-sort-btn`系／`.p315-buyers-sort-mobile`系／`.p315-tab-nav`のoverflow修正が、common.css側の変更を経ずにそのまま適用される。**この「CSSクラス共有・ID差し替え」方式は既にp3-14/p4-14、p3-13/p4-13等で確立済みのパターンであることを再確認**。
- **JS変更は最小限**：`KTN.pages['p4-15']`のタブ切替ロジック（既存セクション4）は元からボタン数に依存しない汎用ループのため、3タブ目追加だけで自動対応（変更不要）。新規追加は追補136のセクション7（列ソートIIFE）と同型のコードを、`p315-`→`p415-`のID差し替え（`p415BuyersTable`/`p415BuyersSortSel`）のみで複製。ロジック自体は無変更。
- **買主データの抽出方法**：期間中展覧会タブの2展覧会（「色彩の対話 — 現代絵画グループ展」「モノクロームの詩 — 松本りさ 個展」）の`.p315-txn-row`から確定買主7名を抽出、アーカイブタブの「光の断層 — 現代版画グループ展」（完了済3件・買主名が元データに存在しない）にはデモ用ニックネームを新規採番。計10件でP3-15と同数に揃えた。
- **ニックネーム設計で作家名との衝突を回避**：このページには作家名（田中透・山田花・松本りさ・木村亮・高橋信・鈴木誠・伊藤佐和・中村彩）が同一ページ内に複数登場するため、追補136でP3-15が踏襲した「オーナー姓とだけ衝突回避（tanaka→jiro_t）」より一歩踏み込み、**買主ニックネームの語幹がページ内のどの作家姓とも重ならないよう選定**：買主「伊藤大輔」→`daisuke_t`（作家「伊藤佐和」とito_衝突回避）、買主「木村拓也」→`takuya_n`（作家「木村亮」とkimura_衝突回避）、買主「松本由美」→`yumi_o`（作家「松本りさ」とmatsumoto_衝突回避）。他は`kato_maki`／`sakura_n`／`hayashi_koji`／`yoko_t`／アーカイブ3件は`nanami_s`／`ryota_m`／`kenji_o`。
- **完了日の扱い**：田村洋子（沈黙の輪郭）はソースの`.p315-apply-status--done`表示が「売約済・取引完了」のみで日付表記が無く、代わりに申込期限の参考表示「2026.04.18まで」があったため、そこから逆算した**推定日 2026.04.15**をバッジ内に追記（`取引完了 · 2026.04.15`）。アーカイブ3件（断層No.1／光の記憶III／夜の断片）は「光の断層」精算テーブルの実在する「取引完了日」列をそのまま転記（2026.01.07／01.09／01.12）。
- **取引列リンク先の差し替え**：P3-15は`kotennavi-p3-16.html`（creator側取引デスク）だが、P4-15は`kotennavi-p4-16.html`（gallery側取引デスク）へ変更。「取引デスクへ →」の表記自体はP4-15の既存行と同一のため変更なし。
- **検証**：`node --check kotennavi-pages.js`成功。タブボタン3個／`.p315-tab-panel`3個／`<tr data-buyer=`10行をgrepで確認済み。JSの追加箇所が`KTN.pages['p4-15']`のブロック内（行8058〜）に収まっていることも確認済み。
- **保留事項**：ブラウザでの目視確認（タブ切替・列ソート・モバイル横スクロール・モバイルソートセレクト）はユーザー確認待ち。
- **影響ファイル**：`kotennavi-p4-15.html`（3タブ目＋購入者一覧テーブルを新規追加）、`kotennavi-pages.js`（`KTN.pages['p4-15']`にソートハンドラのIIFEを追加）、`docs/progress.md`。

