'use client';

import { useState } from 'react';
import { StreamingChat } from '@/components/StreamingChat';
import { Lightbulb, Zap } from 'lucide-react';

export default function StreamingPage() {
  const [streamingSpeed, setStreamingSpeed] = useState(30);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          ストリーミング デモ
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          AIチャット風のストリーミングUIと楽観的UIの組み合わせ
        </p>
      </section>

      {/* 速度スライダー */}
      <section className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-5 h-5 text-mohican-blue" />
          <h2 className="font-bold text-slate-900">ストリーミング速度</h2>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="10"
            max="100"
            value={streamingSpeed}
            onChange={(e) => setStreamingSpeed(Number(e.target.value))}
            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-mohican-blue"
          />
          <span className="text-sm text-slate-600 w-20 text-right">
            {streamingSpeed}ms/文字
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          値が小さいほど高速、大きいほど低速に表示されます
        </p>
      </section>

      {/* デモエリア */}
      <section className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {/* Basic（従来） */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Basic（従来）
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              全レスポンスを待ってから一括表示
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <StreamingChat
              isOptimistic={false}
              streamingSpeed={streamingSpeed}
            />
          </div>
        </div>

        {/* Optimistic + Streaming */}
        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-mohican-blue/50 overflow-hidden">
          <div className="bg-mohican-blue/10 px-4 sm:px-6 py-3 sm:py-4 border-b border-mohican-blue/30">
            <h2 className="text-base sm:text-lg font-bold text-triton-blue flex items-center gap-2">
              Optimistic + Streaming
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
              メッセージ即追加 + ストリーミング表示
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <StreamingChat
              isOptimistic={true}
              streamingSpeed={streamingSpeed}
            />
          </div>
        </div>
      </section>

      {/* 確認ポイント */}
      <section className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Lightbulb className="w-4 h-4 text-triton-blue shrink-0" />
          <h3 className="font-bold text-sm sm:text-base text-slate-900">
            確認ポイント
          </h3>
        </div>
        <ul className="text-xs sm:text-sm text-slate-600 space-y-1 sm:space-y-1.5">
          <li>• Basicはローディング表示後に全文が一度に表示される</li>
          <li>
            •
            Optimisticはユーザーメッセージが即座に追加され、AIの返答が文字単位で流れる
          </li>
          <li>
            •
            ストリーミング表示は「AIが考えている」感覚を演出し、待ち時間を心理的に軽減
          </li>
          <li>
            • 楽観的UIとストリーミングの組み合わせで、より応答性の高いUXを実現
          </li>
        </ul>
      </section>
    </div>
  );
}
