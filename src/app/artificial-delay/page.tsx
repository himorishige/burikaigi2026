"use client";

import { AIAnalysisDemo } from "@/components/AIAnalysisDemo";
import { DelaySlider } from "@/components/DelaySlider";
import { ArrowLeftRight, BookOpen, ExternalLink, Lightbulb, Sparkles, Timer } from "lucide-react";
import { useState } from "react";

export default function ArtificialDelayPage() {
  const [delayMs, setDelayMs] = useState(5000);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Artificial Delay デモ
        </h1>
        <p className="text-slate-600">
          速い処理を「適切に見せる」テクニック。処理時間を変えて、信頼感の変化を体験してください。
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
        <div className="bg-white rounded-2xl border-2 border-indigo-200 overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-200">
            <h2 className="text-lg font-bold text-indigo-900">
              遅延結果（{(delayMs / 1000).toFixed(1)}秒）
            </h2>
            <p className="text-sm text-indigo-600">
              意図的な遅延を追加
            </p>
          </div>
          <div className="p-6">
            <AIAnalysisDemo delayMs={delayMs} />
          </div>
        </div>
      </section>

      {/* 解説 */}
      <section className="bg-slate-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">Labor Illusion（労働幻影）効果</h3>
        </div>
        <div className="space-y-4 text-slate-600">
          <p>
            ハーバードビジネススクールの研究によると、ユーザーは即時結果より
            「処理中...」表示付きの遅延結果の方を高く評価する傾向があります。
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>
                実例
              </h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-400 rounded-full" />
                  Facebook セキュリティチェック（5-10秒）
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-400 rounded-full" />
                  Wells Fargo 虹彩認証（意図的遅延）
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-400 rounded-full" />
                  ローン審査アプリ（進捗バー追加）
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                <Timer className="w-4 h-4 text-slate-600" />
                最適な遅延時間
              </h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-400 rounded-full" />
                  旅行サイト: 最大30秒まで満足度上昇
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-400 rounded-full" />
                  婚活サイト: 15秒程度まで満足度上昇
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-400 rounded-full" />
                  限度を超えると不満に転じる
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 使い分け */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeftRight className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900">楽観的UI vs Artificial Delay</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium text-indigo-600 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              楽観的UI を使う場面
            </h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-indigo-400 rounded-full" />
                いいね、チェックボックス
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-indigo-400 rounded-full" />
                チャットメッセージ送信
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-indigo-400 rounded-full" />
                並び替え、削除
              </li>
              <li className="text-slate-400 italic pl-3">
                → 「即座に反応してほしい」操作
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-amber-600 flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Artificial Delay を使う場面
            </h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-400 rounded-full" />
                AI分析・レコメンド
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-400 rounded-full" />
                セキュリティ確認
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-400 rounded-full" />
                決済処理・審査
              </li>
              <li className="text-slate-400 italic pl-3">
                → 「しっかり処理してほしい」操作
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-indigo-600 mt-0.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
              </svg>
            </span>
            <span>
              <strong>共通点:</strong> どちらも「ユーザーの期待する体験時間」に合わせる技術です。
              速く見せるか、適切に見せるか、ユーザーの期待で判断しましょう。
            </span>
          </p>
        </div>
      </section>

      {/* 参照リンク */}
      <section className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-amber-700" />
          <h4 className="font-medium text-amber-800">参考資料</h4>
        </div>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>
            <a 
              href="https://www.fastcompany.com/3061519/the-ux-secret-that-will-ruin-apps-for-you" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-amber-900 underline"
            >
              The UX Secret That Will Ruin Apps For You - Fast Company
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>
            <a 
              href="https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-amber-900 underline"
            >
              True Lies Of Optimistic User Interfaces - Smashing Magazine
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
