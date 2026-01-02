# 楽観的UI デモ - BuriKaigi 2026

React 19でつくる「気持ちいいUI」— 楽観的更新のすすめ

## デモ内容

### 1. 楽観的UI デモ (`/optimistic`)

遅い処理を「速く見せる」テクニック

- **Todoチェック**: Basic vs Optimistic の反応速度比較
- **コメント追加**: 「送信中」表示の有無
- **並び替え**: 即座に動くか待たされるか
- **ロールバック確認**: 失敗時の自動復元

### 2. Artificial Delay デモ (`/artificial-delay`)

速い処理を「適切に見せる」テクニック

- **AI分析風UI**: 処理時間のスライダー調整
- **即時結果 vs 遅延結果**: 信頼感の変化を体験
- **Labor Illusion効果**: ハーバード研究の再現

### 3. ストリーミング デモ (`/streaming`)

AIチャット風のストリーミングUIと楽観的UIの組み合わせ

- **チャット形式のUI**: ユーザーとAIの会話形式
- **文字が流れるストリーミング表示**: AIの返答が文字単位で流れる
- **楽観的UIとの組み合わせ効果**: メッセージ即追加 + ストリーミング表示
- **ストリーミング速度の調整**: スライダーで速度を変更可能

### 4. useTransition vs useOptimistic 比較 (`/comparison`)

同じ「非同期的なUI更新」でも目的が異なる2つのHooksを比較

- **useTransition**: 重い更新を「後回し」にする（検索・フィルタリング向け）
- **useOptimistic**: 非同期処理の結果を「先取り」する（いいね・チェック向け）
- **500件のデータ**: 重い処理をシミュレートしたデモ

### 5. Server Actions + useOptimistic (`/server-actions`)

formActionパターンとuseActionStateの組み合わせ

- **useActionState**: Server Actionの状態管理
- **formAction**: form要素との連携
- **isPending**: 送信中の状態表示
- **エラーハンドリング**: 「error」を含むメッセージでエラー確認

### 6. TanStack Query + useOptimistic (`/tanstack-query`)

キャッシュライブラリとuseOptimisticの併用パターン

- **TanStack Query単体**: キャッシュ更新後にUI反映
- **+ useOptimistic**: 即座にUI更新、キャッシュは後から同期
- **いいねボタン**: 両者の違いを体感できるデモ

## 技術スタック

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- TanStack React Query v5
- Lucide React（アイコン）

## ローカル開発

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# 本番モードで起動
pnpm start
```
