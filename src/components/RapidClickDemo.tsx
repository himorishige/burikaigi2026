'use client';

import { useState, useOptimistic, useTransition, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Zap, RotateCcw } from 'lucide-react';
import { toggleTodo } from '@/lib/actions';

type ClickRecord = {
  id: number;
  targetState: boolean;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
};

type Props = {
  onError?: (message: string) => void;
};

export function RapidClickDemo({ onError }: Props) {
  const [done, setDone] = useState(false);
  const [, startTransition] = useTransition();
  const [clickHistory, setClickHistory] = useState<ClickRecord[]>([]);
  const clickCountRef = useRef(0);

  const [optimisticDone, addOptimistic] = useOptimistic<boolean, boolean>(
    done,
    (_, newValue) => newValue
  );

  const pendingCount = clickHistory.filter(
    (c) => c.status === 'pending'
  ).length;

  const handleClick = () => {
    clickCountRef.current += 1;
    const clickId = clickCountRef.current;
    const newState = !optimisticDone;

    // 履歴に追加
    setClickHistory((prev) => [
      ...prev,
      {
        id: clickId,
        targetState: newState,
        timestamp: Date.now(),
        status: 'pending',
      },
    ]);

    startTransition(async () => {
      addOptimistic(newState);
      try {
        await toggleTodo('rapid-test', newState);
        setDone(newState);
        setClickHistory((prev) =>
          prev.map((c) =>
            c.id === clickId ? { ...c, status: 'success' as const } : c
          )
        );
      } catch {
        setClickHistory((prev) =>
          prev.map((c) =>
            c.id === clickId ? { ...c, status: 'failed' as const } : c
          )
        );
        onError?.('更新に失敗しました（自動で元に戻ります）');
      }
    });
  };

  const resetHistory = () => {
    setClickHistory([]);
    clickCountRef.current = 0;
    setDone(false);
  };

  return (
    <div className="space-y-4">
      {/* メインのチェックボックス */}
      <div className="flex items-center justify-center">
        <motion.button
          onClick={handleClick}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all ${
            optimisticDone
              ? 'bg-emerald-50 border-emerald-300'
              : 'bg-white border-slate-200 hover:border-mohican-blue'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
              optimisticDone
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-slate-300'
            }`}
          >
            {optimisticDone && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <Check className="w-5 h-5" />
              </motion.span>
            )}
          </div>
          <span
            className={`text-lg font-medium ${
              optimisticDone ? 'text-emerald-700' : 'text-slate-700'
            }`}
          >
            連打テスト用チェック
          </span>
        </motion.button>
      </div>

      {/* ステータス表示 */}
      <div className="bg-slate-50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700">
              連打状態モニター
            </span>
          </div>
          <button
            onClick={resetHistory}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            リセット
          </button>
        </div>

        {/* 現在の状態 */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">現在の表示:</span>
            <span
              className={`font-mono font-bold ${optimisticDone ? 'text-emerald-600' : 'text-slate-600'}`}
            >
              {optimisticDone ? '✓ ON' : '✗ OFF'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">確定状態:</span>
            <span
              className={`font-mono font-bold ${done ? 'text-emerald-600' : 'text-slate-600'}`}
            >
              {done ? '✓ ON' : '✗ OFF'}
            </span>
          </div>
          {pendingCount > 0 && (
            <div className="flex items-center gap-1.5 text-amber-600">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span className="font-mono">{pendingCount}件処理中</span>
            </div>
          )}
        </div>

        {/* 操作履歴 */}
        {clickHistory.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-slate-500">操作履歴（最新10件）:</div>
            <div className="flex flex-wrap gap-1">
              <AnimatePresence>
                {clickHistory.slice(-10).map((record, index) => (
                  <motion.span
                    key={record.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono ${
                      record.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : record.status === 'success'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400">
                      #{index + 1}
                    </span>
                    {record.targetState ? '→✓' : '→✗'}
                    {record.status === 'pending' && (
                      <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    )}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
            <div className="text-xs text-slate-500">
              最終状態:{' '}
              <span
                className={`font-bold ${done ? 'text-emerald-600' : 'text-slate-600'}`}
              >
                {done ? '✓ ON' : '✗ OFF'}
              </span>
              {clickHistory.length > 0 && ' （正しく収束）'}
            </div>
          </div>
        )}
      </div>

      {/* 説明 */}
      <p className="text-xs text-slate-500 text-center">
        高速で連続クリックしても、最終的に正しい状態に収束します
      </p>
    </div>
  );
}
