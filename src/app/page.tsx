import Link from 'next/link';
import {
  Sparkles,
  Timer,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Quote,
  MessageSquare,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8 sm:py-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
          React 19でつくる「気持ちいいUI」
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-2">
          楽観的更新のすすめ
        </p>
        <p className="text-sm sm:text-base text-slate-500">
          BuriKaigi 2026 デモアプリ
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <Link
          href="/optimistic"
          className="block p-5 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-triton-blue/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-triton-blue" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-triton-blue transition-colors">
            楽観的UI デモ
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">
            遅い処理を「速く見せる」テクニック
          </p>
          <ul className="text-xs sm:text-sm text-slate-500 space-y-1.5 sm:space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-mohican-blue rounded-full shrink-0" />
              Todo チェック（トグル操作）
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-mohican-blue rounded-full shrink-0" />
              並び替え（リスト操作）
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-mohican-blue rounded-full shrink-0" />
              コメント追加（追加操作）
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-mohican-blue rounded-full shrink-0" />
              ロールバック確認
            </li>
          </ul>
          <div className="mt-4 sm:mt-6 text-triton-blue font-medium group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 text-sm sm:text-base">
            デモを見る
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          href="/artificial-delay"
          className="block p-5 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mohican-blue/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <Timer className="w-5 h-5 sm:w-6 sm:h-6 text-mohican-blue" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-triton-blue transition-colors">
            Artificial Delay デモ
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">
            速い処理を「適切に見せる」テクニック
          </p>
          <ul className="text-xs sm:text-sm text-slate-500 space-y-1.5 sm:space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-mohican-blue rounded-full shrink-0" />
              AI分析風の演出UI
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-mohican-blue rounded-full shrink-0" />
              処理時間のスライダー調整
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-mohican-blue rounded-full shrink-0" />
              即時結果 vs 遅延結果の比較
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-mohican-blue rounded-full shrink-0" />
              Labor Illusion効果の体験
            </li>
          </ul>
          <div className="mt-4 sm:mt-6 text-triton-blue font-medium group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 text-sm sm:text-base">
            デモを見る
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          href="/streaming"
          className="block p-5 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 group md:col-span-2"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-triton-blue transition-colors">
            ストリーミング デモ
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">
            AIチャット風のストリーミングUIと楽観的UIの組み合わせ
          </p>
          <ul className="text-xs sm:text-sm text-slate-500 space-y-1.5 sm:space-y-2 md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
              チャット形式のUI
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
              文字が流れるストリーミング表示
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
              楽観的UIとの組み合わせ効果
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
              ストリーミング速度の調整
            </li>
          </ul>
          <div className="mt-4 sm:mt-6 text-triton-blue font-medium group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 text-sm sm:text-base">
            デモを見る
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </section>

      <section className="bg-triton-blue/5 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center border border-triton-blue/10">
        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-triton-blue/40 mx-auto mb-3 sm:mb-4" />
        <blockquote className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">
          「気持ちいいUI」は「優しい嘘」から生まれる。
        </blockquote>
        <p className="text-sm sm:text-base text-triton-blue font-medium">
          あなたの手で、UIをもっと気持ちよく！
        </p>
      </section>

      <section className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 shrink-0" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            参考リンク
          </h2>
        </div>
        <ul className="space-y-2 sm:space-y-1.5 text-xs sm:text-sm text-slate-600">
          <li>
            <a
              href="https://react.dev/reference/react/useOptimistic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-triton-blue hover:text-mohican-blue transition-colors py-1"
            >
              <span className="break-all">
                React useOptimistic - 公式ドキュメント
              </span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </li>
          <li>
            <a
              href="https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-triton-blue hover:text-mohican-blue transition-colors py-1"
            >
              <span className="break-all">
                True Lies Of Optimistic User Interfaces - Smashing Magazine
              </span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
