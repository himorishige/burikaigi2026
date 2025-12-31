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

## 技術スタック

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

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

## Vercelへのデプロイ

### 方法1: Vercel CLIを使用

```bash
# Vercel CLIのインストール
pnpm add -g vercel

# デプロイ
vercel
```

### 方法2: GitHubと連携

1. このリポジトリをGitHubにプッシュ
2. [Vercel](https://vercel.com) にアクセス
3. 「New Project」からリポジトリをインポート
4. `demo` ディレクトリをルートに設定
5. デプロイ

## 参考リンク

- [React useOptimistic](https://react.dev/reference/react/useOptimistic)
- [True Lies Of Optimistic User Interfaces - Smashing Magazine](https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/)
- [The UX Secret That Will Ruin Apps For You - Fast Company](https://www.fastcompany.com/3061519/the-ux-secret-that-will-ruin-apps-for-you)
