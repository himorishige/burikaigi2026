"use client";

import { AIAnalysisDemo } from "@/components/AIAnalysisDemo";
import { DelaySlider } from "@/components/DelaySlider";
import { Lightbulb } from "lucide-react";
import { useState } from "react";

export default function ArtificialDelayPage() {
  const [delayMs, setDelayMs] = useState(5000);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Artificial Delay デモ
        </h1>
        <p className="text-slate-600">
          処理時間を変えて、信頼感の変化を体験してください
        </p>
      </section>

      {/* スライダー */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6">
        <DelaySlider value={delayMs} onChange={setDelayMs} />
      </section>

      {/* デモエリア */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* 即時結果 */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              即時結果（0秒）
            </h2>
            <p className="text-sm text-slate-500">
              処理が一瞬で終わる場合
            </p>
          </div>
          <div className="p-6">
            <AIAnalysisDemo delayMs={0} />
          </div>
        </div>

        {/* 遅延結果 */}
        <div className="bg-white rounded-2xl border-2 border-mohican-blue/50 overflow-hidden">
          <div className="bg-mohican-blue/10 px-6 py-4 border-b border-mohican-blue/30">
            <h2 className="text-lg font-bold text-triton-blue">
              遅延結果（{(delayMs / 1000).toFixed(1)}秒）
            </h2>
            <p className="text-sm text-triton-blue/70">
              意図的な遅延を追加
            </p>
          </div>
          <div className="p-6">
            <AIAnalysisDemo delayMs={delayMs} />
          </div>
        </div>
      </section>

      {/* 確認ポイント（簡潔版） */}
      <section className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-triton-blue" />
          <h3 className="font-bold text-slate-900">確認ポイント</h3>
        </div>
        <ul className="text-sm text-slate-600 space-y-1.5">
          <li>• 即時結果より遅延結果の方が「しっかり処理している」印象を受ける</li>
          <li>• 進捗表示があると待ち時間への不満が軽減される</li>
          <li>• AI分析やセキュリティ確認など「信頼感」が必要な場面で有効</li>
        </ul>
      </section>
    </div>
  );
}
