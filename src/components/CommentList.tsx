"use client";

import { useState, useOptimistic, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Clock } from "lucide-react";
import { Comment } from "@/lib/types";
import { postComment } from "@/lib/actions";

type Props = {
  isOptimistic: boolean;
  onError?: (message: string) => void;
};

export function CommentList({ isOptimistic, onError }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);

  const [optimisticComments, addOptimistic] = useOptimistic<Comment[], Comment>(
    comments,
    (current, newComment) => [...current, newComment]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    setInputValue("");

    if (isOptimistic) {
      const tempId = `temp-${Date.now()}`;
      const optimisticComment: Comment = {
        id: tempId,
        text,
        pending: true,
        createdAt: new Date(),
      };

      startTransition(async () => {
        addOptimistic(optimisticComment);
        try {
          const saved = await postComment(text);
          setComments((prev) => [...prev, saved]);
        } catch {
          onError?.("コメントの投稿に失敗しました");
        }
      });
    } else {
      setIsSaving(true);
      try {
        const saved = await postComment(text);
        setComments((prev) => [...prev, saved]);
      } catch {
        onError?.("コメントの投稿に失敗しました");
        setInputValue(text);
      } finally {
        setIsSaving(false);
      }
    }
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
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mohican-blue disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSaving || !inputValue.trim()}
          className="px-4 py-2 bg-triton-blue text-white rounded-lg hover:bg-triton-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              送信中
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              送信
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
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-3 rounded-lg ${
                  comment.pending
                    ? "bg-mohican-blue/10 border border-mohican-blue/30"
                    : "bg-white border border-slate-200"
                }`}
              >
                <p className="text-slate-700">{comment.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  {comment.pending ? (
                    <span className="flex items-center gap-1.5 text-xs text-triton-blue">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      送信中
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {comment.createdAt.toLocaleTimeString()}
                    </span>
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
