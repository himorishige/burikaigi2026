"use client";

import { useState, useOptimistic, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Todo, OptimisticToggleAction } from "@/lib/types";
import { toggleTodo } from "@/lib/actions";

type Props = {
  initialTodos: Todo[];
  isOptimistic: boolean;
  onError?: (message: string) => void;
};

export function TodoList({ initialTodos, isOptimistic, onError }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [, startTransition] = useTransition();
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());

  const [optimisticTodos, addOptimistic] = useOptimistic<Todo[], OptimisticToggleAction>(
    todos,
    (current, action) =>
      current.map((t) => (t.id === action.id ? { ...t, done: action.done } : t))
  );

  const handleToggle = async (todo: Todo) => {
    if (isOptimistic) {
      // 楽観的UI
      startTransition(async () => {
        addOptimistic({ id: todo.id, done: !todo.done });
        try {
          await toggleTodo(todo.id, !todo.done);
          setTodos((prev) =>
            prev.map((t) => (t.id === todo.id ? { ...t, done: !todo.done } : t))
          );
        } catch {
          onError?.("更新に失敗しました（自動で元に戻ります）");
        }
      });
    } else {
      // 従来のUI
      setSavingIds((prev) => new Set(prev).add(todo.id));
      try {
        await toggleTodo(todo.id, !todo.done);
        setTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? { ...t, done: !todo.done } : t))
        );
      } catch {
        onError?.("更新に失敗しました");
      } finally {
        setSavingIds((prev) => {
          const next = new Set(prev);
          next.delete(todo.id);
          return next;
        });
      }
    }
  };

  const displayTodos = isOptimistic ? optimisticTodos : todos;

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {displayTodos.map((todo) => {
          const isSaving = savingIds.has(todo.id);
          return (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => !isSaving && handleToggle(todo)}
              className={`flex items-center gap-3 p-3 bg-white rounded-lg border transition-all cursor-pointer ${
                todo.done ? "border-green-200 bg-green-50" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
              } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.done
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-slate-300"
                }`}
              >
                {todo.done && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </motion.span>
                )}
              </div>
              <span
                className={`flex-1 ${
                  todo.done ? "text-slate-400 line-through" : "text-slate-700"
                }`}
              >
                {todo.text}
              </span>
              {isSaving && (
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  保存中
                </span>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
