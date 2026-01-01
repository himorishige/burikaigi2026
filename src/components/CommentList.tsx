'use client';

import { useState, useOptimistic, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Clock, RefreshCw, X, AlertCircle } from 'lucide-react';
import { Comment } from '@/lib/types';
import { postComment } from '@/lib/actions';

type Props = {
  isOptimistic: boolean;
  onError?: (message: string) => void;
};

export function CommentList({ isOptimistic, onError }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);

  const [optimisticComments, addOptimistic] = useOptimistic<Comment[], Comment>(
    comments,
    (current, newComment) => {
      // 既存のコメントを更新（リトライ時）または新規追加
      const existingIndex = current.findIndex((c) => c.id === newComment.id);
      if (existingIndex >= 0) {
        return current.map((c, i) => (i === existingIndex ? newComment : c));
      }
      return [...current, newComment];
    }
  );

  const submitComment = async (text: string, existingId?: string) => {
    const id = existingId || `temp-${Date.now()}`;

    if (isOptimistic) {
      const optimisticComment: Comment = {
        id,
        text,
        pending: true,
        failed: false,
        createdAt: new Date(),
      };

      startTransition(async () => {
        addOptimistic(optimisticComment);
        try {
          const saved = await postComment(text);
          // 成功時は新しいIDでコメントを追加し、一時的なコメントを削除
          setComments((prev) => {
            const filtered = prev.filter((c) => c.id !== id);
            return [...filtered, saved];
          });
        } catch {
          // 失敗時はfailedフラグを立てる
          setComments((prev) => {
            const existingIndex = prev.findIndex((c) => c.id === id);
            if (existingIndex >= 0) {
              return prev.map((c, i) =>
                i === existingIndex ? { ...c, pending: false, failed: true } : c
              );
            }
            return [
              ...prev,
              { id, text, pending: false, failed: true, createdAt: new Date() },
            ];
          });
          onError?.('コメントの投稿に失敗しました');
        }
      });
    } else {
      setIsSaving(true);
      try {
        const saved = await postComment(text);
        setComments((prev) => [...prev, saved]);
      } catch {
        onError?.('コメントの投稿に失敗しました');
        setInputValue(text);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    setInputValue('');
    await submitComment(text);
  };

  const handleRetry = (comment: Comment) => {
    // 失敗したコメントを再送信
    submitComment(comment.text, comment.id);
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const displayComments = isOptimistic ? optimisticComments : comments;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="コメントを入力..."
          disabled={isSaving}
          className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mohican-blue disabled:opacity-50 min-w-0"
        />
        <button
          type="submit"
          disabled={isSaving || !inputValue.trim()}
          title={isSaving ? '送信中' : '送信'}
          className="px-3 sm:px-4 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 bg-triton-blue text-white rounded-lg hover:bg-triton-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="hidden sm:inline">送信中</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">送信</span>
            </>
          )}
        </button>
      </form>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {displayComments.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4">
              コメントはまだありません
            </p>
          ) : (
            displayComments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  ...(comment.failed && {
                    x: [0, -10, 10, -10, 10, 0], // シェイクアニメーション
                  }),
                }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: comment.failed ? 0.5 : 0.3,
                }}
                className={`p-3 rounded-lg ${
                  comment.failed
                    ? 'bg-red-50 border border-red-200'
                    : comment.pending
                      ? 'bg-mohican-blue/10 border border-mohican-blue/30'
                      : 'bg-white border border-slate-200'
                }`}
              >
                {comment.failed && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 mb-2">
                    <AlertCircle className="w-3 h-3" />
                    送信に失敗しました
                  </div>
                )}
                <p
                  className={`text-sm sm:text-base break-words ${
                    comment.failed ? 'text-red-700' : 'text-slate-700'
                  }`}
                >
                  {comment.text}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    {comment.pending ? (
                      <span className="flex items-center gap-1.5 text-xs text-triton-blue">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        送信中
                      </span>
                    ) : comment.failed ? null : (
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {comment.createdAt.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  {comment.failed && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRetry(comment)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        再送
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
                      >
                        <X className="w-3 h-3" />
                        削除
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
