"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TodoList } from "@/components/TodoList";
import { CommentList } from "@/components/CommentList";
import { SortableList } from "@/components/SortableList";
import { setFailMode } from "@/lib/actions";
import { Todo, SortableItem } from "@/lib/types";
import { AlertTriangle, CheckSquare, MessageSquare, ArrowUpDown, Lightbulb } from "lucide-react";

const initialTodos: Todo[] = [
  { id: "1", text: "楽観的UIを学ぶ", done: false },
  { id: "2", text: "useOptimisticを試す", done: false },
  { id: "3", text: "デモアプリを作る", done: true },
  { id: "4", text: "BuriKaigiで発表する", done: false },
];

const initialItems: SortableItem[] = [
  { id: "a", text: "最初のアイテム", order: 0 },
  { id: "b", text: "2番目のアイテム", order: 1 },
  { id: "c", text: "3番目のアイテム", order: 2 },
  { id: "d", text: "4番目のアイテム", order: 3 },
];

export default function OptimisticPage() {
  const [shouldFail, setShouldFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"todo" | "comment" | "sort">("todo");

  const handleFailModeChange = async (checked: boolean) => {
    setShouldFail(checked);
    await setFailMode(checked);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setShouldFail(false); // エラー発生後、チェックボックスをOFFに戻す
    setTimeout(() => setErrorMessage(null), 3000);
  };

  const tabs = [
    { id: "todo" as const, label: "Todo チェック", icon: CheckSquare },
    { id: "comment" as const, label: "コメント追加", icon: MessageSquare },
    { id: "sort" as const, label: "並び替え", icon: ArrowUpDown },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          楽観的UI デモ
        </h1>
        <p className="text-slate-600">
          遅い処理を「速く見せる」テクニック。Basic（従来）とOptimistic（楽観的）を比較してください。
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
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={shouldFail}
            onChange={(e) => handleFailModeChange(e.target.checked)}
            className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
          />
          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="w-4 h-4" />
            <strong>次の操作を失敗させる</strong>
            <span className="text-amber-600 font-normal">（ロールバックの確認用）</span>
          </div>
        </label>
        <p className="mt-2 text-sm text-amber-600 ml-8">
          ONにすると、次の操作がサーバーエラーになります。Optimistic側では自動でロールバックされます。
        </p>
      </div>

      {/* タブ切替 */}
      <div className="flex gap-2 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* デモエリア */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic（従来） */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              Basic（従来）
            </h2>
            <p className="text-sm text-slate-500">
              API完了まで待機
            </p>
          </div>
          <div className="p-6">
            {activeTab === "todo" && (
              <TodoList
                initialTodos={initialTodos}
                isOptimistic={false}
                onError={showError}
              />
            )}
            {activeTab === "comment" && (
              <CommentList
                isOptimistic={false}
                onError={showError}
              />
            )}
            {activeTab === "sort" && (
              <SortableList
                initialItems={initialItems}
                isOptimistic={false}
                onError={showError}
              />
            )}
          </div>
        </div>

        {/* Optimistic（楽観的） */}
        <div className="bg-white rounded-2xl border-2 border-indigo-200 overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-200">
            <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
              Optimistic（楽観的）
              <span className="text-indigo-500">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </span>
            </h2>
            <p className="text-sm text-indigo-600">
              即座にUI更新
            </p>
          </div>
          <div className="p-6">
            {activeTab === "todo" && (
              <TodoList
                initialTodos={initialTodos}
                isOptimistic={true}
                onError={showError}
              />
            )}
            {activeTab === "comment" && (
              <CommentList
                isOptimistic={true}
                onError={showError}
              />
            )}
            {activeTab === "sort" && (
              <SortableList
                initialItems={initialItems}
                isOptimistic={true}
                onError={showError}
              />
            )}
          </div>
        </div>
      </div>

      {/* 確認ポイント */}
      <section className="bg-slate-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">確認ポイント</h3>
        </div>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-medium">1.</span>
            <span><strong>反応速度の違い</strong>: Basic は約0.8秒待たされ、Optimistic は即座に反応します</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-medium">2.</span>
            <span><strong>ロールバック</strong>: 「次の操作を失敗させる」をONにして、Optimistic側で操作してみてください</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-medium">3.</span>
            <span><strong>連続操作</strong>: Optimistic側では複数の操作を連続して行えます</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
