import Link from "next/link";
import { Sparkles, Timer, ArrowRight, BookOpen, ExternalLink, Quote } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          React 19でつくる「気持ちいいUI」
        </h1>
        <p className="text-xl text-slate-600 mb-2">
          楽観的更新のすすめ
        </p>
        <p className="text-slate-500">
          BuriKaigi 2026 デモアプリ
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Link 
          href="/optimistic"
          className="block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 group"
        >
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
            楽観的UI デモ
          </h2>
          <p className="text-slate-600 mb-4">
            遅い処理を「速く見せる」テクニック
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Todo チェック（トグル操作）
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              並び替え（リスト操作）
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              コメント追加（追加操作）
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              ロールバック確認
            </li>
          </ul>
          <div className="mt-6 text-indigo-600 font-medium group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
            デモを見る
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link 
          href="/artificial-delay"
          className="block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 group"
        >
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
            <Timer className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
            Artificial Delay デモ
          </h2>
          <p className="text-slate-600 mb-4">
            速い処理を「適切に見せる」テクニック
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              AI分析風の演出UI
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              処理時間のスライダー調整
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              即時結果 vs 遅延結果の比較
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Labor Illusion効果の体験
            </li>
          </ul>
          <div className="mt-6 text-indigo-600 font-medium group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
            デモを見る
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </section>

      <section className="bg-indigo-50 rounded-2xl p-8 text-center">
        <Quote className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
        <blockquote className="text-2xl font-bold text-slate-800 mb-4">
          「気持ちいいUI」は「優しい嘘」から生まれる。
        </blockquote>
        <p className="text-indigo-600 font-medium">
          あなたの手で、UIをもっと気持ちよく！
        </p>
      </section>

      <section className="bg-white rounded-2xl p-8 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-slate-700" />
          <h2 className="text-xl font-bold text-slate-900">参考リンク</h2>
        </div>
        <ul className="space-y-2 text-slate-600">
          <li>
            <a 
              href="https://react.dev/reference/react/useOptimistic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-indigo-600 hover:underline"
            >
              React useOptimistic - 公式ドキュメント
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </li>
          <li>
            <a 
              href="https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-indigo-600 hover:underline"
            >
              True Lies Of Optimistic User Interfaces - Smashing Magazine
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </li>
          <li>
            <a 
              href="https://www.fastcompany.com/3061519/the-ux-secret-that-will-ruin-apps-for-you" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-indigo-600 hover:underline"
            >
              The UX Secret That Will Ruin Apps For You - Fast Company
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
