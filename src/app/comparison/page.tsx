'use client';

import { useState, useTransition, useOptimistic, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, Lightbulb, Check, ArrowRight } from 'lucide-react';

// 大量のアイテムを生成（重い処理をシミュレート）
const generateItems = (count: number) => {
  const categories = [
    'React',
    'Vue',
    'Angular',
    'Svelte',
    'Next.js',
    'Nuxt',
    'Remix',
    'Astro',
  ];
  const adjectives = ['基礎', '応用', '実践', '入門', '上級', 'マスター'];
  const items = [];

  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    const adjective = adjectives[i % adjectives.length];
    items.push({
      id: `item-${i}`,
      title: `${category} ${adjective}ガイド #${i + 1}`,
      category,
      checked: false,
    });
  }
  return items;
};

const allItems = generateItems(500);

// 重いフィルタ処理をシミュレート
const heavyFilter = (items: typeof allItems, query: string) => {
  // 意図的に遅い処理（各アイテムで複雑な計算をシミュレート）
  return items.filter((item) => {
    // 重い計算をシミュレート
    let hash = 0;
    for (let i = 0; i < 1000; i++) {
      hash += Math.sin(i) * Math.cos(i);
    }
    return item.title.toLowerCase().includes(query.toLowerCase());
  });
};

type Item = (typeof allItems)[0];

export default function ComparisonPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          useTransition vs useOptimistic
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          同じ「非同期的なUI更新」でも、目的が異なります
        </p>
      </section>

      {/* 比較表 */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-slate-200">
          <div className="p-4 bg-violet-50">
            <h3 className="font-bold text-violet-800">useTransition</h3>
            <p className="text-xs text-violet-600 mt-1">
              重い更新を「後回し」にする
            </p>
          </div>
          <div className="p-4 bg-emerald-50">
            <h3 className="font-bold text-emerald-800">useOptimistic</h3>
            <p className="text-xs text-emerald-600 mt-1">
              非同期処理の結果を「先取り」する
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200">
          <div className="p-4 text-sm text-slate-600">
            <ul className="space-y-1">
              <li>• 検索・フィルタリング</li>
              <li>• タブ切り替え</li>
              <li>• 大量データの表示更新</li>
            </ul>
          </div>
          <div className="p-4 text-sm text-slate-600">
            <ul className="space-y-1">
              <li>• いいね・チェック</li>
              <li>• コメント送信</li>
              <li>• 並び替え保存</li>
            </ul>
          </div>
        </div>
      </section>

      {/* デモエリア */}
      <div className="grid md:grid-cols-2 gap-6">
        <UseTransitionDemo />
        <UseOptimisticDemo />
      </div>

      {/* 確認ポイント */}
      <section className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-triton-blue" />
          <h3 className="font-bold text-slate-900">確認ポイント</h3>
        </div>
        <ul className="text-sm text-slate-600 space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 mt-0.5 text-violet-500 shrink-0" />
            <span>
              <strong>useTransition:</strong>{' '}
              入力は即座に反映、フィルタ結果は遅れて更新（UIがブロックされない）
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
            <span>
              <strong>useOptimistic:</strong>{' '}
              チェックは即座に反映、サーバー保存は後からバックグラウンドで実行
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}

// useTransition デモ
function UseTransitionDemo() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [filteredItems, setFilteredItems] = useState(allItems.slice(0, 20));

  const handleSearch = (value: string) => {
    setQuery(value);
    startTransition(() => {
      const filtered = heavyFilter(allItems, value);
      setFilteredItems(filtered.slice(0, 20));
    });
  };

  return (
    <div className="bg-white rounded-xl border-2 border-violet-300 overflow-hidden">
      <div className="bg-violet-50 px-4 py-3 border-b border-violet-200">
        <h2 className="font-bold text-violet-800 flex items-center gap-2">
          useTransition
          <span className="text-xs font-normal text-violet-600">
            検索/フィルタ
          </span>
        </h2>
      </div>
      <div className="p-4 space-y-4">
        {/* 検索ボックス */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="検索..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          {isPending && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-500 animate-spin" />
          )}
        </div>

        {/* ステータス */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">isPending:</span>
          <span
            className={`font-mono ${isPending ? 'text-amber-600' : 'text-slate-400'}`}
          >
            {isPending ? 'true' : 'false'}
          </span>
          {isPending && (
            <span className="text-xs text-amber-600">（フィルタ中...）</span>
          )}
        </div>

        {/* 結果リスト */}
        <div
          className={`space-y-1 max-h-48 overflow-y-auto transition-opacity ${isPending ? 'opacity-50' : ''}`}
        >
          {filteredItems.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4">
              該当するアイテムがありません
            </p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="px-3 py-2 bg-slate-50 rounded text-sm text-slate-700"
              >
                {item.title}
              </div>
            ))
          )}
        </div>
        <p className="text-xs text-slate-400 text-right">
          {filteredItems.length}件 / {allItems.length}件
        </p>
      </div>
    </div>
  );
}

// useOptimistic デモ
function UseOptimisticDemo() {
  const [items, setItems] = useState<Item[]>(allItems.slice(0, 10));
  const [, startTransition] = useTransition();
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  const [optimisticItems, addOptimistic] = useOptimistic<
    Item[],
    { id: string; checked: boolean }
  >(items, (current, { id, checked }) =>
    current.map((item) => (item.id === id ? { ...item, checked } : item))
  );

  const handleToggle = (item: Item) => {
    const newChecked = !item.checked;
    setPendingIds((prev) => new Set(prev).add(item.id));

    startTransition(async () => {
      addOptimistic({ id: item.id, checked: newChecked });

      // サーバー処理をシミュレート
      await new Promise((resolve) => setTimeout(resolve, 800));

      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, checked: newChecked } : i))
      );
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    });
  };

  const checkedCount = optimisticItems.filter((i) => i.checked).length;

  return (
    <div className="bg-white rounded-xl border-2 border-emerald-300 overflow-hidden">
      <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-200">
        <h2 className="font-bold text-emerald-800 flex items-center gap-2">
          useOptimistic
          <span className="text-xs font-normal text-emerald-600">
            チェック/いいね
          </span>
        </h2>
      </div>
      <div className="p-4 space-y-4">
        {/* ステータス */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">チェック済み:</span>
            <span className="font-mono text-emerald-600">{checkedCount}</span>
          </div>
          {pendingIds.size > 0 && (
            <div className="flex items-center gap-1 text-amber-600">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span className="text-xs">{pendingIds.size}件保存中</span>
            </div>
          )}
        </div>

        {/* チェックリスト */}
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {optimisticItems.map((item) => {
            const isPending = pendingIds.has(item.id);
            return (
              <motion.div
                key={item.id}
                onClick={() => handleToggle(item)}
                className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors ${
                  item.checked
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-white border border-slate-200 hover:border-emerald-300'
                } ${isPending ? 'opacity-70' : ''}`}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    item.checked
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {item.checked && <Check className="w-3 h-3" />}
                </div>
                <span
                  className={`flex-1 text-sm ${
                    item.checked ? 'text-emerald-700' : 'text-slate-700'
                  }`}
                >
                  {item.title}
                </span>
                {isPending && (
                  <Loader2 className="w-3 h-3 text-emerald-500 animate-spin" />
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="text-xs text-slate-400">
          クリックすると即座にチェックが反映され、
          <br />
          バックグラウンドでサーバーに保存されます
        </p>
      </div>
    </div>
  );
}
