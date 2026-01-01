'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, User, Bot, RotateCcw } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  pending?: boolean;
  streaming?: boolean;
};

type Props = {
  isOptimistic: boolean;
  streamingSpeed?: number; // ms per character
};

// モックのAIレスポンス
const mockResponses = [
  '楽観的UIは、ユーザー体験を大幅に向上させる素晴らしいテクニックです。操作の結果を即座に反映することで、アプリケーションがより応答性の高いものに感じられます。',
  'ストリーミングUIは、AIチャットアプリケーションで広く使われています。文字が徐々に表示されることで、AIが「考えている」感覚を演出し、ユーザーの待ち時間を心理的に軽減します。',
  'React 19のuseOptimisticフックは、楽観的更新を簡単に実装できるようにしてくれます。サーバーの応答を待たずにUIを更新し、エラー時には自動的にロールバックできます。',
  'BuriKaigi 2026へようこそ！今日は「気持ちいいUI」について学んでいきましょう。楽観的UIとArtificial Delayを組み合わせることで、より良いUXを実現できます。',
];

export function StreamingChat({ isOptimistic, streamingSpeed = 50 }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseIndexRef = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const simulateStreaming = async (
    fullText: string,
    messageId: string
  ): Promise<void> => {
    return new Promise((resolve) => {
      let currentIndex = 0;
      setStreamingContent('');

      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setStreamingContent(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setStreamingContent('');
          setMessages((prev) =>
            prev.map((m) =>
              m.id === messageId
                ? { ...m, content: fullText, streaming: false }
                : m
            )
          );
          resolve();
        }
      }, streamingSpeed);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const messageText =
      (formData.get('message') as string)?.trim() || inputValue.trim();

    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      pending: false,
    };

    const assistantId = `assistant-${Date.now()}`;
    const responseText =
      mockResponses[responseIndexRef.current % mockResponses.length];
    responseIndexRef.current++;

    setInputValue('');

    if (isOptimistic) {
      // 楽観的更新: ユーザーメッセージを即座に追加
      setMessages((prev) => [...prev, userMessage]);

      // AIメッセージのプレースホルダーを追加（ストリーミング中）
      const assistantMessage: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        streaming: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // ストリーミングシミュレーション
      simulateStreaming(responseText, assistantId);
    } else {
      // Basic: ローディング表示 → 全文一括表示
      setIsLoading(true);

      // ユーザーメッセージを追加
      setMessages((prev) => [...prev, userMessage]);

      // 「考え中」の遅延をシミュレート（ストリーミングと同等の時間）
      await new Promise((resolve) =>
        setTimeout(resolve, responseText.length * streamingSpeed)
      );

      // AIメッセージを一括で追加
      const assistantMessage: Message = {
        id: assistantId,
        role: 'assistant',
        content: responseText,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setStreamingContent('');
    setIsLoading(false);
    responseIndexRef.current = 0;
  };

  const displayMessages = messages;

  // ストリーミング中のアシスタントメッセージを見つける
  const streamingMessage = displayMessages.find((m) => m.streaming);

  return (
    <div className="flex flex-col h-80 sm:h-96">
      {/* チャットエリア */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2 sm:p-3 bg-slate-50 rounded-lg mb-3">
        <AnimatePresence mode="popLayout">
          {displayMessages.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-400 text-sm text-center py-8"
            >
              メッセージを送信してください
            </motion.p>
          ) : (
            displayMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex gap-2 sm:gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-triton-blue flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 sm:px-4 py-2 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-mohican-blue text-white rounded-br-md'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-md'
                  }`}
                >
                  {message.streaming ? (
                    <span className="text-sm sm:text-base">
                      {streamingContent}
                      <span className="inline-block w-0.5 h-4 bg-triton-blue ml-0.5 animate-pulse" />
                    </span>
                  ) : (
                    <span className="text-sm sm:text-base">
                      {message.content}
                    </span>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {/* Basic モードのローディング表示 */}
        {!isOptimistic && isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 sm:gap-3 justify-start"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-triton-blue flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="px-3 sm:px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-bl-md">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 入力エリア */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          name="message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="メッセージを入力..."
          disabled={isLoading || !!streamingMessage}
          className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mohican-blue disabled:opacity-50 min-w-0"
        />
        <button
          type="submit"
          disabled={isLoading || !!streamingMessage}
          title="送信"
          className="px-3 sm:px-4 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 bg-triton-blue text-white rounded-lg hover:bg-triton-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          {isLoading || streamingMessage ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading || !!streamingMessage}
          title="リセット"
          className="px-3 sm:px-4 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
