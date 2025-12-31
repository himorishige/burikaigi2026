"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Shield, Search, BarChart3, Brain, Check, Loader2 } from "lucide-react";

type Props = {
  delayMs: number;
};

type Phase = {
  label: string;
  icon: React.ReactNode;
  duration: number;
};

const analysisPhases: Phase[] = [
  { label: "データ収集中", icon: <Search className="w-4 h-4" />, duration: 0.2 },
  { label: "パターン分析中", icon: <BarChart3 className="w-4 h-4" />, duration: 0.3 },
  { label: "AIモデル処理中", icon: <Brain className="w-4 h-4" />, duration: 0.35 },
  { label: "最終検証中", icon: <Shield className="w-4 h-4" />, duration: 0.15 },
];

const analysisResults = [
  { category: "ユーザー行動", score: 92, color: "bg-green-500" },
  { category: "パフォーマンス", score: 87, color: "bg-blue-500" },
  { category: "セキュリティ", score: 95, color: "bg-indigo-500" },
  { category: "総合評価", score: 91, color: "bg-amber-500" },
];

export function AIAnalysisDemo({ delayMs }: Props) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const runAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    setShowResult(false);
    setCurrentPhase(-1);
    setProgress(0);
    setElapsed(0);

    const startTime = Date.now();
    let timerInterval: NodeJS.Timeout | null = null;

    if (delayMs > 0) {
      // 遅延版：段階的に処理を進める
      timerInterval = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);

      let accumulated = 0;
      for (let i = 0; i < analysisPhases.length; i++) {
        setCurrentPhase(i);
        const phaseDuration = delayMs * analysisPhases[i].duration;

        // このフェーズ内でプログレスを進める
        const steps = Math.ceil(phaseDuration / 50);
        for (let step = 0; step < steps; step++) {
          await new Promise((r) => setTimeout(r, phaseDuration / steps));
          accumulated += (100 / steps) * analysisPhases[i].duration;
          setProgress(Math.min(accumulated, 100));
        }
      }

      if (timerInterval) clearInterval(timerInterval);
    } else {
      // 即時版：すぐに完了
      setProgress(100);
    }

    setIsAnalyzing(false);
    setShowResult(true);
    setElapsed(Date.now() - startTime);
  }, [delayMs]);

  const reset = () => {
    setIsAnalyzing(false);
    setCurrentPhase(-1);
    setProgress(0);
    setShowResult(false);
    setElapsed(0);
  };

  return (
    <div className="space-y-4">
      {/* コントロール */}
      <div className="flex gap-2">
        <button
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              分析中...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              AI分析を開始
            </>
          )}
        </button>
        <button
          onClick={reset}
          disabled={isAnalyzing}
          className="px-4 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* プログレス表示 */}
      {(isAnalyzing || showResult) && (
        <div className="space-y-4">
          {/* プログレスバー */}
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* フェーズ表示 */}
          {delayMs > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {analysisPhases.map((phase, i) => {
                const isCompleted = i < currentPhase || showResult;
                const isActive = i === currentPhase && !showResult;
                return (
                  <div
                    key={i}
                    className={`text-center p-2 rounded-lg transition-colors ${
                      isCompleted
                        ? "bg-green-50 text-green-700"
                        : isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <div className="flex justify-center mb-1">
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : isActive ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          {phase.icon}
                        </motion.span>
                      ) : (
                        phase.icon
                      )}
                    </div>
                    <span className="text-xs">{phase.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* 経過時間 */}
          <div className="text-center text-sm text-slate-500">
            処理時間: {(elapsed / 1000).toFixed(1)}秒
          </div>
        </div>
      )}

      {/* 結果表示 */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 mt-4"
          >
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <Check className="w-5 h-5" />
              分析完了！
            </div>

            <div className="space-y-3">
              {analysisResults.map((result, i) => (
                <motion.div
                  key={result.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-sm text-slate-600 w-28">
                    {result.category}
                  </span>
                  <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${result.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700 w-12 text-right">
                    {result.score}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
