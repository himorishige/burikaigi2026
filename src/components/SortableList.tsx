"use client";

import { useState, useOptimistic, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { SortableItem, OptimisticReorderAction } from "@/lib/types";
import { persistOrder } from "@/lib/actions";

type Props = {
  initialItems: SortableItem[];
  isOptimistic: boolean;
  onError?: (message: string) => void;
};

function reorder(items: SortableItem[], fromIndex: number, toIndex: number): SortableItem[] {
  const result = [...items];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result.map((item, index) => ({ ...item, order: index }));
}

export function SortableList({ initialItems, isOptimistic, onError }: Props) {
  const [items, setItems] = useState<SortableItem[]>(initialItems);
  const [, startTransition] = useTransition();
  const [savingIndex, setSavingIndex] = useState<number | null>(null);

  const [optimisticItems, addOptimistic] = useOptimistic<SortableItem[], OptimisticReorderAction>(
    items,
    (current, action) => reorder(current, action.fromIndex, action.toIndex)
  );

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const action = { fromIndex: index, toIndex: index - 1 };

    if (isOptimistic) {
      startTransition(async () => {
        addOptimistic(action);
        try {
          const next = reorder(items, action.fromIndex, action.toIndex);
          const saved = await persistOrder(next);
          setItems(saved);
        } catch {
          onError?.("並び替えに失敗しました（自動で元に戻ります）");
        }
      });
    } else {
      setSavingIndex(index);
      try {
        const next = reorder(items, action.fromIndex, action.toIndex);
        const saved = await persistOrder(next);
        setItems(saved);
      } catch {
        onError?.("並び替えに失敗しました");
      } finally {
        setSavingIndex(null);
      }
    }
  };

  const moveDown = async (index: number) => {
    if (index === items.length - 1) return;
    const action = { fromIndex: index, toIndex: index + 1 };

    if (isOptimistic) {
      startTransition(async () => {
        addOptimistic(action);
        try {
          const next = reorder(items, action.fromIndex, action.toIndex);
          const saved = await persistOrder(next);
          setItems(saved);
        } catch {
          onError?.("並び替えに失敗しました（自動で元に戻ります）");
        }
      });
    } else {
      setSavingIndex(index);
      try {
        const next = reorder(items, action.fromIndex, action.toIndex);
        const saved = await persistOrder(next);
        setItems(saved);
      } catch {
        onError?.("並び替えに失敗しました");
      } finally {
        setSavingIndex(null);
      }
    }
  };

  const displayItems = isOptimistic ? optimisticItems : items;

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {displayItems.map((item, index) => {
          const isSaving = savingIndex === index;
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 ${
                isSaving ? "opacity-50" : ""
              }`}
            >
              <span className="w-6 h-6 bg-triton-blue/10 rounded-full flex items-center justify-center text-sm text-triton-blue font-medium">
                {index + 1}
              </span>
              <span className="flex-1 text-slate-700">{item.text}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0 || isSaving}
                  className="p-1.5 text-slate-400 hover:text-triton-blue hover:bg-triton-blue/10 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="上に移動"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === displayItems.length - 1 || isSaving}
                  className="p-1.5 text-slate-400 hover:text-triton-blue hover:bg-triton-blue/10 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="下に移動"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
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
