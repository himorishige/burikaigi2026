'use client';

import { useState, useOptimistic, useTransition } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Loader2, Lightbulb, Code, RefreshCw } from 'lucide-react';
import { QueryProvider } from './QueryProvider';

// 型定義
type Post = {
  id: string;
  title: string;
  likes: number;
};

// 模擬API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchPosts = async (): Promise<Post[]> => {
  await delay(500);
  return [
    { id: '1', title: 'React 19の新機能について', likes: 42 },
    { id: '2', title: 'useOptimisticの使い方', likes: 28 },
    { id: '3', title: 'TanStack Queryと楽観的UI', likes: 35 },
    { id: '4', title: 'Server Actionsの実践', likes: 19 },
  ];
};

const likePost = async (postId: string): Promise<Post> => {
  await delay(800);
  // 実際のAPIではここでDBを更新
  return { id: postId, title: '', likes: 0 }; // 返り値は使わない
};

// メインページコンポーネント
export default function TanStackQueryPage() {
  return (
    <QueryProvider>
      <TanStackQueryContent />
    </QueryProvider>
  );
}

function TanStackQueryContent() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          TanStack Query + useOptimistic
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          キャッシュライブラリとuseOptimisticの併用パターン
        </p>
      </section>

      {/* コード例 */}
      <section className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
        <div className="flex items-center gap-2 mb-3 text-slate-400 text-sm">
          <Code className="w-4 h-4" />
          <span>併用パターン</span>
        </div>
        <pre className="text-sm text-slate-300 font-mono">
          {`// TanStack Query でデータ取得
const { data: posts } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

// useOptimistic で即時UI更新
const [optimisticPosts, addOptimistic] = useOptimistic(posts, updateFn);

// useMutation で楽観的更新
const mutation = useMutation({
  mutationFn: likePost,
  onMutate: async (postId) => {
    // 楽観的にUIを更新
    addOptimistic({ id: postId, increment: 1 });
  },
  onSuccess: () => {
    // キャッシュを再取得
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});`}
        </pre>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <TanStackQueryOnlyDemo />
        <TanStackQueryWithOptimisticDemo />
      </div>

      {/* 確認ポイント */}
      <section className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-triton-blue" />
          <h3 className="font-bold text-slate-900">確認ポイント</h3>
        </div>
        <ul className="text-sm text-slate-600 space-y-2">
          <li>
            • <strong>TanStack Query単体</strong>:
            キャッシュ更新後にUIが反映（約0.8秒待ち）
          </li>
          <li>
            • <strong>+ useOptimistic</strong>:
            即座にUI更新、キャッシュは後から同期
          </li>
          <li>• 両者を組み合わせることで、キャッシュの恩恵と即時反応を両立</li>
        </ul>
      </section>
    </div>
  );
}

// TanStack Query単体のデモ
function TanStackQueryOnlyDemo() {
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['posts-only'],
    queryFn: fetchPosts,
  });

  const [likingIds, setLikingIds] = useState<Set<string>>(new Set());

  const mutation = useMutation({
    mutationFn: likePost,
    onMutate: (postId) => {
      setLikingIds((prev) => new Set(prev).add(postId));
    },
    onSuccess: (_, postId) => {
      // キャッシュを直接更新
      queryClient.setQueryData<Post[]>(['posts-only'], (old) =>
        old?.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    },
    onSettled: (_, __, postId) => {
      setLikingIds((prev) => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
    },
  });

  const handleLike = (postId: string) => {
    mutation.mutate(postId);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-800">TanStack Query 単体</h2>
            <p className="text-xs text-slate-500 mt-1">
              キャッシュ更新後にUI反映
            </p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : (
          <div className="space-y-2">
            {posts?.map((post) => {
              const isLiking = likingIds.has(post.id);
              return (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <span className="text-sm text-slate-700">{post.title}</span>
                  <button
                    onClick={() => handleLike(post.id)}
                    disabled={isLiking}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                      isLiking
                        ? 'bg-slate-200 text-slate-400'
                        : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                    }`}
                  >
                    {isLiking ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Heart className="w-4 h-4" />
                    )}
                    <span className="font-mono">{post.likes}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// TanStack Query + useOptimistic のデモ
function TanStackQueryWithOptimisticDemo() {
  const queryClient = useQueryClient();
  const [, startTransition] = useTransition();

  const {
    data: posts,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['posts-optimistic'],
    queryFn: fetchPosts,
  });

  const [optimisticPosts, addOptimistic] = useOptimistic<
    Post[],
    { id: string; increment: number }
  >(posts ?? [], (current, { id, increment }) =>
    current.map((post) =>
      post.id === id ? { ...post, likes: post.likes + increment } : post
    )
  );

  const handleLike = (postId: string) => {
    startTransition(async () => {
      // 即座にUIを更新
      addOptimistic({ id: postId, increment: 1 });

      // サーバーに送信
      await likePost(postId);

      // キャッシュを更新
      queryClient.setQueryData<Post[]>(['posts-optimistic'], (old) =>
        old?.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    });
  };

  return (
    <div className="bg-white rounded-xl border-2 border-emerald-300 overflow-hidden">
      <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-emerald-800">+ useOptimistic</h2>
            <p className="text-xs text-emerald-600 mt-1">即座にUI更新</p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {optimisticPosts?.map((post) => (
                <motion.div
                  key={post.id}
                  className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-lg"
                >
                  <span className="text-sm text-slate-700">{post.title}</span>
                  <motion.button
                    onClick={() => handleLike(post.id)}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                  >
                    <motion.span
                      key={post.likes}
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                    >
                      <Heart className="w-4 h-4" />
                    </motion.span>
                    <span className="font-mono">{post.likes}</span>
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
