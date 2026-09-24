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
| P2-3 | 展覧会-詳細(関連イベント・などその他情報) |  | R | R | R | R | R | R | --w-entity | kotennavi-p2-3.html | Fix済 |
| P2-4 | 展覧会-リエゾン作品一覧 | L | R | R | R | R | R | R | --w-entity | kotennavi-p2-5.html | Fix済 |
| P2-5-1 | 展覧会-リエゾンプラス作品一覧 | L+ | R | R | R | R | R | R | --w-entity | kotennavi-p2-5-1.html | Fix済 |
| P2-6 | 展覧会-作品リスト(会場配布/QRビュー・印刷兼用) | L/L+ | R | R | R | R | R | R | --w-detail | kotennavi-p2-6.html | Fix済 |
| P2-11 | 展覧会-新規/編集/クローン |  |  |  |  | W | W | W | --w-detail | kotennavi-p2-11.html | Fix済 |
| P2-12 | 展覧会-リエゾン作品管理 |  |  |  |  | W | W | W | --w-detail | kotennavi-p2-12.html | Fix済 |
| P2-12-1 | 展覧会-リエゾン+作品管理 |  |  |  |  | W | W | W | --w-detail | kotennavi-p2-12-1.html | Fix済 |
| P2-13 | 展覧会-記事管理 |  |  |  |  | W | W | W | --w-detail | kotennavi-p2-13.html | Fix済 |
| P2-14 | 展覧会-インサイト |  |  |  |  | R | R | R | --w-article | kotennavi-p2-14.html | Fix済 |
| P2-15 | 展覧会-広告作成 |  |  |  |  | W | W | W | --w-detail | # | 次期リリース |
| P2-16 | 展覧会-修正依頼 |  | W | W | W |  |  |  | --w-detail | kotennavi-p2-16.html | 調整中 |
<!-- 「展覧会-報告」は全表示系ページ共通の報告フォーム P60-13「問題を報告する」に統合（2026-07-24）。対象は ?from/?type で受け取るため展覧会固有ページは持たない。 -->

---

## P3 クリエイター

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P3 | クリエイター |  | R | R | R | R | R | R | --w-entity | kotennavi-p3.html | Fix済 |
| P3-1 | クリエイター-展覧会アーカイブ |  | R | R | R | R | R | R | --w-entity | kotennavi-p3-1.html | Fix済 |
| P3-2 | クリエイター-記事一覧 |  | R | R | R | R | R | R | --w-entity | kotennavi-p3-2.html | Fix済 |
| P3-3 | クリエイター-作品一覧 |  | R | R | R | R | R | R | --w-entity| kotennavi-p3-3.html | Fix済 |
| P3-11 | クリエイター-編集 |  |  |  |  | W |  | W | --w-detail | kotennavi-p3-11.html | Fix済 |
| P3-12 | クリエイター-インサイト |  |  |  |  | R |  | R | --w-article | kotennavi-p3-12.html | Fix済 |
| P3-13 | クリエイター-オーディエンス管理 |  |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-13.html | Fix済 |
| P3-14 | クリエイター-ポートフォリオ管理 | L |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-14.html | Fix済 |
| P3-15 | クリエイター-リエゾン+コンソール | L+ |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-15.html | Fix済 |
| P3-16 | クリエイター-取引デスク | L+ |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-16.html | Fix済 |
| P3-17 | クリエイター販売代金管理 | L+ |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-17.html | Fix済 |
| P3-18 | クリエイター-展覧会管理 |  |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-18.html | Fix済 |
| P3-19 | クリエイター-記事管理 |  |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p3-19.html | Fix済 |

---

## P4 ギャラリー

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P4 | ギャラリー |  | R | R | R | R | R | R | --w-entity | kotennavi-p4.html | Fix済 |
| P4-1 | ギャラリー-展覧会アーカイブ |  | R | R | R | R | R | R | --w-entity | kotennavi-p4-1.html | Fix済 |
| P4-2 | ギャラリー-記事一覧 |  | R | R | R | R | R | R | --w-entity | kotennavi-p4-2.html | Fix済 |
| P4-11 | ギャラリー-編集 | L,L+ |  |  |  |  | W | W | --w-detail | kotennavi-p4-11.html | Fix済 |
| P4-12 | ギャラリー-インサイト |  |  |  |  |  | R | R | --w-article | kotennavi-p4-12.html | Fix済 |
| P4-13 | ギャラリー-オーディエンス管理 |  |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-13.html | Fix済 |
| P4-14 | ギャラリー-インベントリー管理 | L,L+ |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-14.html | Fix済 |
| P4-15 | ギャラリー-リエゾン+コンソール | L+ |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-15.html | Fix済 |
| P4-16 | ギャラリー-取引デスク | L+ |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-16.html | Fix済 |
| P4-17 | ギャラリー-販売代金管理 | L+ |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-17.html | Fix済 |
| P4-18 | ギャラリー-展覧会管理 |  |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-18.html | Fix済 |
| P4-19 | ギャラリー-記事管理 |  |  |  |  |  | R/W | R/W | --w-detail | kotennavi-p4-19.html | Fix済 |

---

## P5 ユーザー

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P5 | ユーザー-my展覧会カレンダー |  | R | R | R | R | R | R | --w-entity | kotennavi-p5.html | Fix済 |
| P5-1 | ユーザー-myウオッチ |  | R | R | R | R | R | R | --w-entity | kotennavi-p5-1.html | Fix済 |
| P5-2 | ユーザー-myチェックイン |  | R | R | R | R | R | R | --w-entity | kotennavi-p5-2.html | Fix済 |
| P5-3 | ユーザー-my興味あり! |  | R | R | R | R | R | R | --w-entity | kotennavi-p5-3.html | Fix済 |
| P5-4 | ユーザー-myコレクションルーム |  | R | R | R | R | R | R | --w-entity | kotennavi-p5-4.html | Fix済 |
| P5-11 | ユーザー-編集 |  |  |  | W |  |  | W | --w-detail | kotennavi-p5-11.html | 調整中 |
| P5-12 | ユーザー-パスワード管理 |  |  |  | R/W |  |  | R/W | --w-detail | kotennavi-p5-12.html | 調整中 |
| P5-13 | ユーザー-メール通知管理 |  |  |  | R/W |  |  | R/W | --w-detail | kotennavi-p5-13.html | 調整中 |
| P5-14 | ユーザー-購入履歴 | L+ |  |  | R/W |  |  | R/W | --w-detail | kotennavi-p5-14.html | Fix済 |
| P5-15 | ユーザー-取引ワークスペース | L+ |  |  | R/W |  |  | R/W | --w-detail | kotennavi-p5-15.html | Fix済 |
| P5-100 | ユーザー-退会 |  |  |  | R/W |  |  | R/W | --w-detail | kotennavi-p5-100.html | 調整中 |

---

## P6 作品

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P6 | 作品 |  | R | R | R | R | R | R | --w-entity | kotennavi-p6.html | Fix済 |
| P6-1 | 作品-リエゾン出品時 | L | R | R | R | R | R | R | --w-entity | kotennavi-p6-1.html | Fix済 |
| P6-2 | 作品-リエゾンプラス出品時 | L+ | R | R | R | R | R | R | --w-entity | kotennavi-p6-2.html | Fix済 |
| P6-11 | 作品-新規/編集/クローン |  |  |  |  | W | W | W | --w-detail | kotennavi-p6-11.html | Fix済 |
| P6-12 | 作品-インサイト |  |  |  |  | R | R | R | --w-article | kotennavi-p6-12.html | Fix済 |
| P6-13 | 作品-問合せ | L |  | W | W |  | W | R | --w-detail | kotennavi-p6-13.html | 調整中 |
| P6-14 | 作品-問合せへの回答 | L |  |  |  | R/W |  | R/W | --w-detail | kotennavi-p6-14.html | 調整中 |
| P6-15 | 作品-記事管理 |  |  |  |  | W | W | W | --w-detail | kotennavi-p6-15.html | Fix済 |

---

## P7 記事

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P7 | 記事 |  | R | R | R | R | R | R | --w-entity | kotennavi-p7.html | Fix済 |
| P7-11 | 記事-新規/編集 |  |  |  |  | W | W | W | --w-detail | kotennavi-p7-11.html | Fix済 |

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
| P10 | 検索-展覧会 |  | R | R | R | R | R | R | --w-index | kotennavi-p10.html | Fix |
| P10-1 | 検索-作品 |  |  | R | R | R | R | R | --w-index | kotennavi-p10-1.html | Fix |
| P10-2 | 検索-クリエイター |  |  | R | R | R | R | R | --w-index | kotennavi-p10-2.html | Fix |
| P10-3 | 検索-ギャラリー |  |  | R | R | R | R | R | --w-index | kotennavi-p10-3.html | Fix |
| P10-4 | 特集-展覧会（軸インデックス） |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-4.html | Fix |
| P10-4-1 | 特集-展覧会-軸 |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-4-1.html | Fix |
| P10-4-2 | 特集-展覧会-年間ランキング |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-4-2.html | Fix |
| P10-4-3 | 特集-展覧会-軸アーカイブ |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-4-3.html | Fix |
| P10-4-4 | 特集-展覧会-ジャンル軸 |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-4-4.html | Fix |
| P10-4-5 | 特集-展覧会-アクセシビリティ軸 |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-4-5.html | Fix |
| P10-5 | 特集-作品（作品をジャンル・LIAISONから探す） |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-5.html | Fix |
| P10-5-1 | 特集-作品-年間ランキング |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-5-1.html | Fix |
| P10-6 | 特集-クリエイター（クリエイターをジャンル・開催状況から探す） |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-6.html | Fix |
| P10-6-1 | 特集-クリエイター-年間ランキング |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-6-1.html | Fix |
| P10-7 | 特集-ギャラリー（ギャラリーをエリア・開催状況から探す） |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-7.html | Fix |
| P10-7-1 | 特集-ギャラリー-年間ランキング |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-7-1.html | Fix |
| P10-8 | ランキング（種別横断ハブ） |  | R | R | R | R | R | R/W | --w-index | kotennavi-p10-8.html | Fix |

- **P10-4〜P10-7 は P10〜P10-3 それぞれの「特集」**（2026-09-18 確定・handoff 追174-80）。P10〜P10-3＝検索、P10-4系＝展覧会の特集、P10-5＝作品、P10-6＝クリエイター、P10-7＝ギャラリーの特集。ただし**「特集」はナビ語彙に留め、各ページの title／h1 には入れない**。
- **特集4系はすべて guest=R（ログイン不要）**。**ログインを求めるのは検索ツール（P10-1〜3）だけで、理由は無許可の全件取得の抑止**＝運営が用意した固定の分類索引は列挙手段にならないので制限しない。索引チップは `data-guest="login"` を持ち、ゲストが押すと遷移せずログインモーダルが出る（件数は見せたまま）。2026-09-12 に付けた `ktn-authwall` は P10-5/6/7 の3枚とも撤去した。
- **年間ランキングは分類索引から切り出して独立URL（P10-5-1／P10-6-1／P10-7-1）にする**（2026-09-18 確定・handoff 追174-81）。当初は1ページに同居させたが、**索引とランキングはリンク先の性質が正反対**だったため分けた。
- **SEO（index,follow）は展覧会（P10-4系）とランキング3枚（P10-5-1／P10-6-1／P10-7-1）**。**分類索引3枚（P10-5／P10-6／P10-7）は3系とも `noindex,nofollow`**（**P10-7 も 2026-09-18 に index から変更**）。理由は一本＝**索引のチップはすべてログイン必須の検索（`?f=`）へ飛ぶのでクローラーが辿れない／ランキングは公開個別ページ（P6／P3／P4）へ飛ぶので内部リンクハブとして機能する**。ページを開けること（guest=R）とSEO資産にすることは別の判断。
- 分類ごとの独立URL（`/artworks/genre/{slug}` 等の下位軸ページ）は**作らない**。索引のリンクは P10-1/2/3 の絞り込み状態（`?f=key:value`）へ着地する。年は `?y=`、ランキングの軸は `?m=`（P10-5-1／P10-6-1／P10-7-1 が持つ）。
- P10-4系との対応：〈ハブ＝P10-4／年ごとの記録＝P10-4-2（年間ランキング）〉と同じ形を P10-5〜7 にも適用した結果が〈索引＝P10-5／ランキング＝P10-5-1〉。
- **P10-8＝4種のランキングを束ねる横断ハブ**（2026-09-18 新設・handoff 追174-84）。**作った理由はSEO経路**＝ランキング本体（P10-4-2／P10-5-1／P10-6-1／P10-7-1）は index,follow なのに、被リンク元が noindex,nofollow の索引3枚（P10-5/6/7）と互いのリンクしか無く、P10-4-2 以外はサイト内から follow される入口が無かった。P10-8 を **全ページ共通フッター**（列名を「展覧会」→「さがす」に変え「年間ランキング」を追加）に置くことで、4種×年数ぶんのランキングURLへ follow 経路を供給する。
- **特集4枚の title／h1 は「{種別}を{軸}・{軸}から探す」で統一**（2026-09-18 確定・handoff 追174-85）。P10-4「展覧会をエリア・ジャンルから探す」／P10-5「作品をジャンル・LIAISONから探す」／P10-6「クリエイターをジャンル・開催状況から探す」／P10-7「ギャラリーをエリア・開催状況から探す」。旧「作品の分類」等は廃止。**送りリンク（カード・preset・パンくず以外の本文リンク）の文言は着地先の h1 と同一にする**（追174-83）。
- **P10-5 の軸はジャンル・タグ・LIAISON の3本**（同日）。**エリア・価格帯・販売状態は置かない**＝エリアは作品そのものが持たない属性（展覧会の会場を借りると巡回作品で破綻する）、価格帯・販売状態は LIAISON+ の出品にしか存在せず作品全体の母数に対する軸にならない。
- **クリエイターはエリアを持たない＝P10-2（検索）とP10-6（特集）からエリアを全撤去**（2026-09-19 確定・handoff 追174-86）。クリエイターは固定の活動場所を持たず、展覧会ごとに会場の県が変わるため、会場の県を借りて「その人のエリア」と呼ぶと巡回や他県開催で破綻する（`KTN.axis` が場所軸の補完に人を出さないのと同じ理由＝追174-50）。P10-2 の絞り込みチップ／P10-6 の「エリアから探す」／ピックアップ「東京のクリエイター」／ランキング P10-6-1 の行メタ／デモデータ `CREATORS[].area` をすべて削除。**場所から人へ降りる経路はエリア軸ページ →〈その会場のギャラリー（P10-3/P10-7）／その会期の展覧会（P10/P10-4）〉が正**。
- **P10-7 の代表2軸は「エリア・開催状況」＝P10-6 と対にする**（2026-09-19 確定・handoff 追174-87）。ギャラリーは固定会場を持つので**エリア軸そのものは正当**（クリエイターとの違い＝追174-86）＝削ったのではなく h1 の second axis を「扱うジャンル」から「開催状況」へ差し替えただけで、`INDEX['p10-7'].secs` はエリア・ジャンル・タグ・開催状況・LIAISON の5本のまま。人とギャラリーの索引を〈{種別}を{その種別に固有の第一軸}・開催状況から探す〉で揃え、**「いま行けるか」を全特集に共通の second axis** とした（ジャンルとタグは近い軸なので代表2軸に並べない）。
- **P10-8 はパンくずに出ない**：ランキング4枚のパンくずは従来どおり種別（展覧会／作品／クリエイター／ギャラリー）を親にする＝利用者が実際に降りてくる経路を表すのがパンくずで、P10-8 は後から足した横断入口のため。P10-4〜7 からランキングへの動線も従来どおり据え置き。
- **ランキング4枚の文言は同形に統一**（追174-83／追174-84）：見出し＝「{種別}の年間ランキング」／英サブ＝`Annual Ranking`（旧「Most Responded」は廃止）／送りリンク＝着地先ページ名「{年}年の{種別}ランキング →」（年は JS が入れる）／説明文＝「その年に{指標A}と{指標B}が多かった{種別}を並べています」＋公平性の注記。
- **軸ページ（P10-4-1／P10-4-3／P10-4-4）の〈軸×エンティティ〉チップも同じ着地に統一**（2026-09-12・Fix 済みページだがユーザー許可のうえ変更＝**この3ページはチップのラベルとリンク先のみ再確認が必要**）。エリア軸→ギャラリー検索は `?f=area:{県名}`（エリア軸は親県へ寄せ**ラベルも親県名**）、ジャンル軸→クリエイター/作品検索は `?f=genre:{6区分}`。併せて検索3ページと索引3ページの絞り込みを **ジャンル（正式6区分）とタグ（技法・素材）に分離**した。詳細は `docs/handoff-decisions.md` 追174-78。
- **P10系の語彙規約＝【特集】【ピックアップ】【注目】の3本に分ける**（2026-09-19 確定・handoff 追174-89）。似た3概念が同じ `feat` / `Feature` を共用していたため、**日本語・英ラベル・識別子の3軸とも重ならない語**へ分離した。

  | 概念 | 日本語 | 英ラベル | 識別子 | どこに出るか |
  |---|---|---|---|---|
  | P10-4〜P10-7 という層 | 特集 | `Features` | `feature` | パンくず中間項・タグバー・サイトマップ（title/h1 には入れない） |
  | 検索面の保存済み検索・棚の差し込み枠 | ピックアップ | `Picks` | `pick` / `preset` | P10・P10-1〜3 の棚・再回遊帯・ゼロヒット提案・Picks レール |
  | おすすめ順の巻頭クラスタ・注目のエリア | 注目 | `Highlights` | `hl` | 「注目の展覧会」等の巻頭クラスタ・P10-4の「注目のエリア」 |

  旧 `Featured`（注目）は `Features`（特集）と１文字違いで同一画面に並んでいたため `Highlights` へ改称。`#p10Feat1/2`（差し込み枠）と `#p10Feat`（巻頭クラスタ）の衝突も `#p10Pick1/2` ／ `#p10Hl` へ分離した。**新規のP10系UIは必ずこの表の語を使う**（canonical の語彙表は `kotennavi-pages.js` の `PRESETS` 直前のコメント）。
- **運営が登録する候補集合の呼称は「ピックアップマスタ」**（旧「特集マスタ」・追174-79 ④）。棚の差し込み枠2枠と Picks レールはこのマスタからしか候補を引かない（全組み合わせの自動生成はしない）。現行は `PRESETS` がプロトタイプ相当で、**`shelf`／掲載期間／掲載順／最小件数 の4項目が未実装**（`fillPick()` はキー直書き）。編集口は P90-17。
- **「特集」を含むナビ語彙のラベルは〈対象＋特集〉＝「の」を入れない**（2026-09-19 確定・handoff 追174-89 追記1）。`展覧会特集`／`作品特集`／`クリエイター特集`／`ギャラリー特集`。タグバー4本が既にこの形だったのでそちらへ寄せ、P1 タグバーに残っていた `展覧会の特集` を是正した。**例外＝セクション見出し「他の特集」**（「他の」は other の一部で「他特集」とは書けない）と、散文の「〜の特集」（「検索ごとの特集ページ」等の説明文）。

---

## P11 認証・申込

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P11 | ログイン |  | W |  |  |  |  |  | --w-detail | kotennavi-p11.html | 調整中 |
| P11-1 | ユーザー新規登録 |  | W |  |  |  |  |  | --w-detail | kotennavi-p11-1.html | 調整中 |
| P11-2 | クリエイター機能申込 |  |  | W |  |  |  |  | --w-detail | kotennavi-p11-2.html | Fix済 |
| P11-3 | ギャラリー機能申込 |  |  | W |  |  |  |  | --w-detail | kotennavi-p11-3.html | Fix済 |
| P11-4 | リエゾンプラス機能申込 |  |  |  |  | W | W |  | --w-detail | kotennavi-p11-4.html | Fix済 |
| P11-11 | ログイン-パスワードを忘れた方 |  | W |  |  |  |  |  | --w-detail | kotennavi-p11-11.html | 調整中 |
| P11-12 | ログインパスワード再設定 |  | W |  |  |  |  |  | --w-detail | kotennavi-p11-12.html | 調整中 |
| P11-21 | ユーザー新規登録-アカウント仮登録完了 |  | R |  |  |  |  |  | --w-detail | kotennavi-p11-21.html | 調整中 |
| P11-22 | ユーザー新規登録-メールアドレス確認完了 |  | R |  |  |  |  |  | --w-detail | kotennavi-p11-22.html | 調整中 |
| P11-23 | ユーザー新規登録-パスワード設定 |  | W |  |  |  |  |  | --w-detail | kotennavi-p11-23.html | 調整中 |
| P11-24 | ユーザー新規登録-ウオッチ対象の選択 |  | W |  |  |  |  |  | --w-detail | kotennavi-p11-24.html | 調整中 |

---

## P60 ガイド・法的ページ

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P60 | ご利用ガイド |  | R | R | R | R | R | R/W | --w-article | kotennavi-p60.html | 調整中 |
| P60-1 | 展覧会情報を探したい方 |  | R | R | R | R | R | R/W | --w-article | kotennavi-p60-1.html | 調整中 |
| P60-2 | 展覧会情報を掲載したい方 |  | R | R | R | R | R | R/W | --w-article | kotennavi-p60-2.html | 調整中 |
| P60-3 | 広告を出したい方 |  | R | R | R | R | R | R/W | --w-article | kotennavi-p60-3.html | 調整中 |
| P60-4 | よくある質問-一般 |  | R | R | R | R | R | R/W | --w-article | kotennavi-p60-4.html | 調整中 |
| P60-5 | よくある質問-ユーザー編 |  |  | R | R | R | R | R/W | --w-article | kotennavi-p60-5.html | Fix済 |
| P60-6 | よくある質問-クリエイター編 |  |  |  |  | R |  | R/W | --w-article | # | 整合性のみ |
| P60-7 | よくある質問-ギャラリー編 |  |  |  |  |  | R | R/W | --w-article | # | 整合性のみ |
| P60-8 | 個展なびとは |  | R | R | R | R | R | R/W | --w-article | kotennavi-p60-8.html | 調整中 |
| P60-9 | 利用規約 |  | R | R | R | R | R | R/W | --w-article | kotennavi-p60-9.html | 調整中 |
| P60-10 | プライバシポリシー |  | R | R | R | R | R | R/W | --w-article | kotennavi-p60-10.html | 調整中 |
| P60-11 | お問合わせ |  | W | W | W | W | W |  | --w-detail | kotennavi-p60-11.html | 未確認 |
| P60-12 | サービス機能改善要望 |  | W | W | W | W | W |  | --w-detail | kotennavi-p60-12.html | 調整中 |
| P60-13 | 問題を報告する |  | W | W | W | W | W |  | --w-detail | kotennavi-p60-13.html | 整合性のみ |
| P60-15 | ページを表示できません |  | R | R | R | R | R | R | --w-article | kotennavi-p60-15.html | 調整中 |

- **P60-15 はアクセス制御の受け皿（noindex・状態は2つ）**：①**要ログイン**＝**未ログインで保護ページに来た場合すべて**（自分専用の固定URL〔マイページ編集・パスワード管理・LIAISON+コンソール・購入履歴 等〕に加え、他人の識別子を含むURLでも未ログインならこちら。判定がセッションだけで決まりIDの存在に依存しないので漏れない＝「編集中にログインが切れた」を404で突き放さない）。②**見つかりません**＝**ログイン済み×非オーナー**で他人の識別子を含むURL（`/exhibition/{id}/edit`・`/txn/{id}` 等の編集・取引系）に来た場合と P90 管理者系。「権限がありません」は**そのIDが存在することを教えてしまう**ため使わない。**②はサイト共通の404そのもの**＝存在しないURL・削除済みコンテンツも同じ画面・同じ HTTP 404 を返す（別画面にすると本物の404と見比べて存在が分かるため。汎用404ページは別途作らない）。なお「ログイン済みだがロールが足りない」（一般ユーザーが LIAISON+コンソールを開く等）はエラーにせず**機能申込（P11-2／P11-3／P11-4）へ誘導**する。ただし誘導してよいのは**識別子を含まない自分専用の機能URL**（`/liaison-plus/console` 等）だけで、`/exhibition/{id}/edit` のように**他人の識別子を含むURL**はロール不足でも②404（誘導するとそのIDの存在が漏れるため）。検索ハブ P10-1〜3 は P60-15 を使わず**ページ内の認証ウォール**で処理（器＝タイトル＋検索対象タブは出す）。**②のときだけ回遊ゾーン**（サイト紹介1〜2行＋開催中/これから開催の展覧会3枚ランダム＋「展覧会を探す →」）を出し、404を行き止まりにしない（①には出さない。カードは**来たURLと無関係な汎用ピック**に限る＝関連付けるとそのIDの存在が漏れるため）。詳細は `docs/handoff-decisions.md` 追174-22／追174-24／追174-25／追174-26。

---

## P61 お知らせ

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P61 | お知らせ一覧 |  | R | R | R | R | R | R | --w-article | kotennavi-p61.html | 調整中 |
| P61-1 | ニュース |  | R | R | R | R | R | R | --w-article | kotennavi-p61-1.html | 調整中 |
| P61-11 | ニュース-新規/編集/クローン |  |  |  |  |  |  | W | --w-detail | kotennavi-p61-11.html | 調整中 |

---

## P70 リエゾンガイド

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P70 | リエゾンとは | L,L+ | R | R | R | R | R | R/W | --w-article | kotennavi-p70.html | 整合性のみ |
| P70-1 | リエゾン-作品出品ガイド | L |  |  |  | R | R | R/W | --w-article | kotennavi-p70-1.html | 整合性のみ |
| P70-2 | リエゾンプラス-作品販売ガイド | L+ |  |  |  | R | R | R/W | --w-article | kotennavi-p70-2.html | 整合性のみ |
| P70-3 | 作品購入までの流れ | L+ | R | R | R | R | R | R/W | --w-article | kotennavi-p70-3.html | 調整中 |
| P70-4 | 送料・配送について | L+ | R | R | R | R | R | R/W | --w-article | kotennavi-p70-4.html | 調整中 |
| P70-6 | 特定商取引法に基づく表示 | L+ | R | R | R | R | R | R/W | --w-article | kotennavi-p70-6.html | 調整中 |
| P70-7 | リエゾンプラスのサービス利用料について | L+ |  |  | R | R | R | R/W | --w-article | kotennavi-p70-7.html | 整合性のみ、リリース対象外 |
| P70-8 | ギャラリーへの説明ガイド | L,L+ |  |  | R | R |  | R/W | --w-article | kotennavi-p70-8.html | 調整中 |
| P70-9 | 作品画像撮影ガイド | L,L+ |  |  | R | R | R | R/W | --w-article | kotennavi-p70-9.html | 調整中 |
| P70-11 | リエゾンプラス-取引ガイド(購入者編) | L+ |  | R | R | R | R | R/W | --w-article | kotennavi-p70-11.html | 整合性のみ |
| P70-12 | リエゾンプラス-取引ガイド(出品者編) | L+ |  |  |  | R | R | R/W | --w-article | kotennavi-p70-12.html | 整合性のみ |
---

## P90 管理者

| ID | ページ名 | L/L+ | guest | login | user+ | creator | gallery | admin | max-width | html-file | 進捗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P90 | 管理者メニュー |  |  |  |  |  |  | R/W | --w-detail| kotennavi-p90.html | 調整中 |
| P90-1 | 管理者-ユーザー新規/クローン/編集 |  |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-1.html | 調整中 |
| P90-2 | 管理者-クリエイター/ギャラリー機能申込管理 |  |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-2.html | Fix済 |
| P90-2-1 | 管理者-クリエイター/ギャラリー機能申込審査 |  |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-2-1.html | Fix済 |
| P90-3 | 管理者-展覧会新規 |  |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-3.html | 調整中 |
| P90-4 | 管理者-本日開催・公開の展覧会一覧 |  |  |  |  |  |  | R/W | --w-article | kotennavi-p90-4.html | 調整中 |
| P90-5 | 管理者-未公開の展覧会一覧 |  |  |  |  |  |  | R/W | --w-article | kotennavi-p90-5.html | 調整中 |
| P90-6 | 管理者-最新の展覧会一覧 |  |  |  |  |  |  | R/W | --w-article | kotennavi-p90-6.html | 調整中 |
| P90-7 | 管理者-クリエイター新規/クローン |  |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-7.html | 調整中 |
| P90-8 | 管理者-ギャラリー新規/クローン |  |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-8.html | 調整中 |
| P90-9 | 管理者-メールテンプレート管理 |  |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-9.html | 調整中 |
| P90-10 | 管理者-リエゾンプラスダッシュボード | L+ |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-10.html | 調整中 |
| P90-11 | 管理者-リエゾンプラス機能申込管理 | L+ |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-11.html | Fix済 |
| P90-11-1 | 管理者-リエゾンプラス機能申込審査 | L+ |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-11-1.html | Fix済 |
| P90-12 | 管理者-リエゾンプラスコンソール | L+ |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-12.html | 調整中 |
| P90-13 | 管理者-取引デスク | L+ |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-13.html | 調整中 |
| P90-14 | 管理者-販売代金管理 | L+ |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-14.html | 調整中 |
| P90-15 | 管理者-リエゾンプラス申込者一覧 | L+ |  |  |  |  |  | R/W | --w-article | kotennavi-p90-15.html | 調整中 |
| P90-16 | 管理者-作品購入ユーザー一覧 | L+ |  |  |  |  |  | R/W | --w-article | kotennavi-p90-16.html | 調整中 |
| P90-17 | 管理者-検索・特集管理 |  |  |  |  |  |  | R/W | --w-detail | kotennavi-p90-17.html | 調整中 |