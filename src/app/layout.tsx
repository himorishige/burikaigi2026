import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Target, Sparkles, Timer } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "楽観的UI デモ | BuriKaigi 2026",
  description: "React 19でつくる「気持ちいいUI」— 楽観的更新のすすめ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 min-h-screen`}
      >
        <header className="bg-slate-900 text-white py-4 px-6 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:text-indigo-400 transition-colors">
              <Target className="w-6 h-6" />
              <span>楽観的UI デモ</span>
            </Link>
            <nav className="flex gap-6">
              <Link 
                href="/optimistic" 
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>楽観的UI</span>
              </Link>
              <Link 
                href="/artificial-delay" 
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <Timer className="w-4 h-4" />
                <span>Artificial Delay</span>
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto py-8 px-6">
          {children}
        </main>
        <footer className="bg-slate-100 border-t border-slate-200 py-4 px-6 mt-auto">
          <div className="max-w-6xl mx-auto text-center text-slate-600 text-sm">
            BuriKaigi 2026 - React 19でつくる「気持ちいいUI」
          </div>
        </footer>
      </body>
    </html>
  );
}
