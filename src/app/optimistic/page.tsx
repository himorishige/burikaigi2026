'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TodoList } from '@/components/TodoList';
import { CommentList } from '@/components/CommentList';
import { SortableList } from '@/components/SortableList';
import { setFailMode } from '@/lib/actions';
import { Todo, SortableItem } from '@/lib/types';
import {
  AlertTriangle,
  CheckSquare,
  MessageSquare,
  ArrowUpDown,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { RapidClickDemo } from '@/components/RapidClickDemo';

const initialTodos: Todo[] = [
  { id: '1', text: '楽観的UIを学ぶ', done: false },
  { id: '2', text: 'useOptimisticを試す', done: false },
  { id: '3', text: 'デモアプリを作る', done: true },
  { id: '4', text: 'BuriKaigiで発表する', done: false },
];

const initialItems: SortableItem[] = [
  { id: 'a', text: '最初のアイテム', order: 0 },
  { id: 'b', text: '2番目のアイテム', order: 1 },
  { id: 'c', text: '3番目のアイテム', order: 2 },
  { id: 'd', text: '4番目のアイテム', order: 3 },
];

export default function OptimisticPage() {
  const [shouldFail, setShouldFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'todo' | 'comment' | 'sort' | 'rapid'
  >('todo');

  const handleFailModeChange = async (checked: boolean) => {
    setShouldFail(checked);
    await setFailMode(checked);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setShouldFail(false);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  const tabs = [
    { id: 'todo' as const, label: 'Todo チェック', icon: CheckSquare },
    { id: 'comment' as const, label: 'コメント追加', icon: MessageSquare },
    { id: 'sort' as const, label: '並び替え', icon: ArrowUpDown },
    { id: 'rapid' as const, label: '連打テスト', icon: Zap },
  ];

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          楽観的UI デモ
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          BasicとOptimisticを比較してください
        </p>
      </section>

      {/* エラーメッセージ */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg flex items-center gap-2"
          >
            <AlertTriangle className="w-5 h-5" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 失敗モード切替 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={shouldFail}
            onChange={(e) => handleFailModeChange(e.target.checked)}
            className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500 shrink-0"
          />
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-amber-800">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <strong className="text-sm sm:text-base">
              次の操作を失敗させる
            </strong>
            <span className="text-amber-600 font-normal text-xs sm:text-sm">
              （ロールバック確認用）
            </span>
          </div>
        </label>
      </div>

      {/* タブ切替 */}
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
              className={`flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-3 min-h-[44px] font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-triton-blue border-b-2 border-triton-blue'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* デモエリア */}
      {activeTab === 'rapid' ? (
        /* 連打テスト（単独表示） */
        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-amber-300 overflow-hidden">
          <div className="bg-amber-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-amber-200">
            <h2 className="text-base sm:text-lg font-bold text-amber-800 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              連打テストモード
            </h2>
            <p className="text-xs sm:text-sm text-amber-600">
              高速で連続クリックしても正しく収束することを確認
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <RapidClickDemo onError={showError} />
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Basic（従来） */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Basic（従来）
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                API完了まで待機
              </p>
            </div>
            <div className="p-4 sm:p-6">
              {activeTab === 'todo' && (
                <TodoList
                  initialTodos={initialTodos}
                  isOptimistic={false}
                  onError={showError}
                />
              )}
              {activeTab === 'comment' && (
                <CommentList isOptimistic={false} onError={showError} />
              )}
              {activeTab === 'sort' && (
                <SortableList
                  initialItems={initialItems}
                  isOptimistic={false}
                  onError={showError}
                />
              )}
            </div>
          </div>

          {/* Optimistic（楽観的） */}
          <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-mohican-blue/50 overflow-hidden">
            <div className="bg-mohican-blue/10 px-4 sm:px-6 py-3 sm:py-4 border-b border-mohican-blue/30">
              <h2 className="text-base sm:text-lg font-bold text-triton-blue flex items-center gap-2">
                Optimistic（楽観的）
                <span className="text-mohican-blue">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-triton-blue/70">
                即座にUI更新
              </p>
            </div>
            <div className="p-4 sm:p-6">
              {activeTab === 'todo' && (
                <TodoList
                  initialTodos={initialTodos}
                  isOptimistic={true}
                  onError={showError}
                />
              )}
              {activeTab === 'comment' && (
                <CommentList isOptimistic={true} onError={showError} />
              )}
              {activeTab === 'sort' && (
                <SortableList
                  initialItems={initialItems}
                  isOptimistic={true}
                  onError={showError}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* 確認ポイント（簡潔版） */}
      <section className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Lightbulb className="w-4 h-4 text-triton-blue shrink-0" />
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            確認ポイント
          </h3>
        </div>
        <ul className="text-xs sm:text-sm text-slate-600 space-y-1 sm:space-y-1.5">
          <li>• Basicは約0.8秒待たされ、Optimisticは即座に反応</li>
          <li>• 「失敗させる」をONにすると、Optimistic側は自動ロールバック</li>
          <li>• Optimistic側は連続操作が可能</li>
        </ul>
      </section>
    </div>
  );
}
