'use client';

import { useActionState, useOptimistic, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Loader2,
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Code,
} from 'lucide-react';
import { submitMessage, getMessages, FormState } from './actions';

type Message = {
  id: string;
  text: string;
  createdAt: string;
  pending?: boolean;
};

const initialState: FormState = {
  message: '',
  success: false,
};

export default function ServerActionsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formState, formAction, isPending] = useActionState(
    submitMessage,
    initialState
  );

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    Message
  >(messages, (current, newMessage) => [...current, newMessage]);

  // 成功時にメッセージを追加
  useEffect(() => {
    if (formState.success && formState.data) {
      setMessages((prev) => {
        // 楽観的に追加したメッセージを確定状態に更新
        const filtered = prev.filter((m) => !m.pending);
        return [...filtered, { ...formState.data!, pending: false }];
      });
    }
  }, [formState]);

  const handleSubmit = (formData: FormData) => {
    const text = formData.get('text') as string;
    if (!text?.trim()) return;

    // 楽観的にメッセージを追加
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      pending: true,
    };
    addOptimisticMessage(optimisticMessage);

    // Server Actionを実行
    formAction(formData);
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Server Actions + useOptimistic
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          formActionパターンとuseActionStateの組み合わせ
        </p>
      </section>

      {/* コード例 */}
      <section className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
        <div className="flex items-center gap-2 mb-3 text-slate-400 text-sm">
          <Code className="w-4 h-4" />
          <span>実装パターン</span>
        </div>
        <pre className="text-sm text-slate-300 font-mono">
          {`// Server Action
"use server";
export async function submitMessage(prevState, formData) {
  const text = formData.get("text");
  await saveToDatabase(text);
  return { success: true, data: { text } };
}

// Client Component
const [state, formAction, isPending] = useActionState(submitMessage, initialState);
const [optimistic, addOptimistic] = useOptimistic(messages, ...);

<form action={(formData) => {
  addOptimistic({ text: formData.get("text"), pending: true });
  formAction(formData);
}}>
  <input name="text" />
  <button disabled={isPending}>送信</button>
</form>`}
        </pre>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {/* フォーム */}
        <div className="bg-white rounded-xl border-2 border-blue-300 overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
            <h2 className="font-bold text-blue-800">メッセージ送信</h2>
            <p className="text-xs text-blue-600 mt-1">
              formAction + useActionState
            </p>
          </div>
          <div className="p-4">
            <form action={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  メッセージ
                </label>
                <input
                  type="text"
                  id="text"
                  name="text"
                  placeholder="メッセージを入力..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    送信中...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    送信
                  </>
                )}
              </button>

              {/* フォームの状態表示 */}
              <AnimatePresence>
                {formState.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      formState.success
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {formState.success ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span className="text-sm">{formState.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* isPending状態 */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">isPending:</span>
                <span
                  className={`font-mono ${isPending ? 'text-amber-600' : 'text-slate-400'}`}
                >
                  {isPending ? 'true' : 'false'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* メッセージ一覧 */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
            <h2 className="font-bold text-slate-800">メッセージ一覧</h2>
            <p className="text-xs text-slate-500 mt-1">
              楽観的に追加されたメッセージ
            </p>
          </div>
          <div className="p-4">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <AnimatePresence>
                {optimisticMessages.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center py-8">
                    メッセージはまだありません
                  </p>
                ) : (
                  optimisticMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-3 rounded-lg ${
                        message.pending
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-white border border-slate-200'
                      }`}
                    >
                      <p className="text-sm text-slate-700">{message.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {message.pending ? (
                          <span className="flex items-center gap-1 text-xs text-blue-600">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            送信中...
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 確認ポイント */}
      <section className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-triton-blue" />
          <h3 className="font-bold text-slate-900">確認ポイント</h3>
        </div>
        <ul className="text-sm text-slate-600 space-y-2">
          <li>
            • <strong>useActionState</strong>: Server Actionの状態（success,
            message）を管理
          </li>
          <li>
            • <strong>isPending</strong>: Server
            Action実行中かどうかを示すフラグ
          </li>
          <li>
            • <strong>formAction</strong>: form要素のaction属性に渡す関数
          </li>
          <li>• 「error」を含むメッセージを送信するとエラーを確認できます</li>
        </ul>
      </section>
    </div>
  );
}
