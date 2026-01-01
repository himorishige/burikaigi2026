'use server';

import { Todo, Comment, SortableItem, AnalysisResult } from './types';

// シミュレーション用の遅延
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// エラーフラグをシミュレート
let shouldFail = false;

export async function setFailMode(fail: boolean) {
  shouldFail = fail;
}

export async function getFailMode() {
  return shouldFail;
}

// Todo関連のアクション
export async function toggleTodo(id: string, done: boolean): Promise<Todo> {
  await delay(800); // サーバー遅延をシミュレート

  if (shouldFail) {
    shouldFail = false; // 1回だけ失敗
    throw new Error('サーバーエラー: 更新に失敗しました');
  }

  return { id, text: '', done };
}

// コメント関連のアクション
export async function postComment(text: string): Promise<Comment> {
  await delay(1000); // サーバー遅延をシミュレート

  if (shouldFail) {
    shouldFail = false;
    throw new Error('サーバーエラー: コメントの投稿に失敗しました');
  }

  return {
    id: `comment-${Date.now()}`,
    text,
    pending: false,
    createdAt: new Date(),
  };
}

// 並び替え関連のアクション
export async function persistOrder(
  items: SortableItem[]
): Promise<SortableItem[]> {
  await delay(800); // サーバー遅延をシミュレート

  if (shouldFail) {
    shouldFail = false;
    throw new Error('サーバーエラー: 並び替えの保存に失敗しました');
  }

  return items;
}

// AI分析のシミュレーション（Artificial Delay用）
export async function analyzeData(delayMs: number): Promise<AnalysisResult> {
  await delay(delayMs); // 設定された遅延時間

  const scores = [87, 92, 78, 95, 88, 91, 84, 89];
  const score = scores[Math.floor(Math.random() * scores.length)];

  const summaries = [
    'データの傾向は良好です。継続的な改善が見られます。',
    '全体的に安定したパフォーマンスを示しています。',
    'いくつかの改善点がありますが、概ね良好です。',
    '優れた結果が得られました。現在の方針を維持してください。',
  ];

  const allDetails = [
    'ユーザーエンゲージメントが15%向上',
    '平均セッション時間が増加傾向',
    'コンバージョン率は安定',
    '離脱率が5%減少',
    'リピーター率が向上',
    '新規ユーザー獲得が順調',
  ];

  // ランダムに3-4個の詳細を選択
  const shuffled = allDetails.sort(() => Math.random() - 0.5);
  const details = shuffled.slice(0, 3 + Math.floor(Math.random() * 2));

  return {
    score,
    summary: summaries[Math.floor(Math.random() * summaries.length)],
    details,
  };
}
