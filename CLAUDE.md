# 個展なびリデザイン プロジェクト

## 概要
展覧会情報ポータルサイト「個展なび」のリデザインと
新サービス「リエゾン」導入のためのUI制作プロジェクト。

## ゴール
- 既存サイトのSEO対策・UI/UX向上
- 回遊性を高める動線設計
- 新サービス「リエゾン」の導入

## 納品形式
- HTML / CSS / JS ファイル
- フロントエンド：React SSR（納品はHTML/CSS/JS）
- バックエンド：Drupal

## ファイル構成
- kotennavi-common.css　　共通CSS
- kotennavi-common.js　　 共通JS
- kotennavi-pages.js　　　ページ別JS
- kotennavi-*.html　　　　各コンポーネント・ページ
- docs/　　　　　　　　　 仕様・設計ドキュメント

## コーディング規約
- CSS・JSは共通ファイルにまとめる
- HTML内のクラス名・構造は全ページで統一
- コンポーネントごとにCSSクラスのnamespaceを分ける
  例: .ktn-header / .ktn-btn / .cb- / .sb- / .lb-

## 進捗状況
- [x] 共通CSS・JS
- [x] ヘッダー・フッター・サイドバー
- [x] バッジ・ボタン
- [x] カード各種
- [x] p2（展覧会詳細ページ）
- [ ] p2-1〜p2-5（制作途中）

## 参照ドキュメント
docs/ フォルダ内を参照