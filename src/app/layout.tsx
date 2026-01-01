import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import {
  Target,
  Sparkles,
  Timer,
  GitCompare,
  Server,
  Database,
} from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '楽観的UI デモ | BuriKaigi 2026',
  description: 'React 19でつくる「気持ちいいUI」— 楽観的更新のすすめ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen`}
      >
        <header className="bg-triton-blue text-white py-3 sm:py-4 px-4 sm:px-6 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg sm:text-xl font-bold hover:text-mohican-blue transition-colors"
            >
              <Target className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">楽観的UI デモ</span>
              <span className="sm:hidden">デモ</span>
            </Link>
            <nav className="flex gap-2 sm:gap-4">
              <Link
                href="/optimistic"
                title="楽観的UI"
                className="flex items-center gap-1.5 hover:text-mohican-blue transition-colors p-2 -m-2 sm:p-0 sm:m-0"
              >
                <Sparkles className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">楽観的UI</span>
              </Link>
              <Link
                href="/comparison"
                title="API比較"
                className="flex items-center gap-1.5 hover:text-mohican-blue transition-colors p-2 -m-2 sm:p-0 sm:m-0"
              >
                <GitCompare className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">API比較</span>
              </Link>
              <Link
                href="/server-actions"
                title="Server Actions"
                className="flex items-center gap-1.5 hover:text-mohican-blue transition-colors p-2 -m-2 sm:p-0 sm:m-0"
              >
                <Server className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">Server Actions</span>
              </Link>
              <Link
                href="/tanstack-query"
                title="TanStack Query"
                className="flex items-center gap-1.5 hover:text-mohican-blue transition-colors p-2 -m-2 sm:p-0 sm:m-0"
              >
                <Database className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">TanStack Query</span>
              </Link>
              <Link
                href="/artificial-delay"
                title="Artificial Delay"
                className="flex items-center gap-1.5 hover:text-mohican-blue transition-colors p-2 -m-2 sm:p-0 sm:m-0"
              >
                <Timer className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">Delay</span>
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
          {children}
        </main>
        <footer className="border-t border-slate-200 py-4 px-6 mt-auto">
          <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
            BuriKaigi 2026
          </div>
        </footer>
      </body>
    </html>
  );
}
