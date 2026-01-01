'use server';

// シミュレーション用の遅延
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type FormState = {
  message: string;
  success: boolean;
  data?: {
    id: string;
    text: string;
    createdAt: string;
  };
};

// メッセージ一覧（サーバー側で管理）
const messages: { id: string; text: string; createdAt: string }[] = [];

export async function submitMessage(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await delay(1000); // サーバー処理をシミュレート

  const text = formData.get('text') as string;

  if (!text || text.trim().length === 0) {
    return {
      message: 'メッセージを入力してください',
      success: false,
    };
  }

  if (text.includes('error')) {
    return {
      message: '「error」を含むメッセージは送信できません',
      success: false,
    };
  }

  const newMessage = {
    id: `msg-${Date.now()}`,
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };

  messages.push(newMessage);

  return {
    message: 'メッセージを送信しました',
    success: true,
    data: newMessage,
  };
}

export async function getMessages() {
  return messages;
}
