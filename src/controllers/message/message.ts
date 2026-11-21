import { store } from '@/core/store';
import { WebSocketClient } from '@/core/ws';

export type ChatMessage = {
  id?: string | number;
  chat_id?: number;
  user_id: string | number;
  is_read: boolean;
  time: string;
  type: 'message';
  content: string;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return (
    'type' in value &&
    value.type === 'message' &&
    'content' in value &&
    typeof value.content === 'string' &&
    'time' in value &&
    typeof value.time === 'string' &&
    'user_id' in value &&
    (typeof value.user_id === 'string' || typeof value.user_id === 'number')
  );
}

class MessageController {
  private historyCursor = '0';
  private loadingHistory = false;
  private hasMoreHistory = true;
  private updateKind: 'reset' | 'history' | 'message' = 'reset';
  private client: WebSocketClient | null = null;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private unsubscribe: (() => void)[] = [];

  getMessages(): ChatMessage[] {
    return (store.getState().messages as ChatMessage[] | undefined) ?? [];
  }

  subscribeMessages(listener: (kind: 'reset' | 'history' | 'message') => void): () => void {
    let previous = this.getMessages();

    return store.subscribe(() => {
      const messages = this.getMessages();
      if (messages !== previous) {
        previous = messages;
        listener(this.updateKind);
      }
    });
  }

  connect(path: string): void {
    this.disconnect();
    const client = new WebSocketClient(path);
    this.client = client;
    this.historyCursor = '0';
    this.hasMoreHistory = true;
    this.updateKind = 'reset';
    store.setState('messages', []);
    store.setState('messagesError', null);

    this.unsubscribe = [
      client.subscribe('open', () => {
        this.pingTimer = setInterval(() => {
          if (client.readyState === WebSocket.OPEN) {
            client.send({ type: 'ping' });
          }
        }, 10000);
        this.fetchMessages();
      }),
      client.subscribe('message', (event) => this.handleMessage(event)),
      client.subscribe('error', () => {
        store.setState('messagesError', 'WebSocket connection error');
      }),
      client.subscribe('close', () => this.disconnect()),
    ];
  }

  sendMessage(content: string): void {
    if (!content.trim()) {
      return;
    }
    this.getConnectedClient().send({ type: 'message', content });
  }

  fetchMessages(): void {
    if (this.loadingHistory || !this.hasMoreHistory) {
      return;
    }
    const client = this.getConnectedClient();
    this.loadingHistory = true;
    client.send({ type: 'get old', content: this.historyCursor });
  }

  loadMoreMessages(): void {
    if (this.client?.readyState !== WebSocket.OPEN) {
      return;
    }
    this.fetchMessages();
  }

  disconnect(): void {
    this.loadingHistory = false;
    if (this.pingTimer !== null) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    this.unsubscribe = [];
    this.client?.close();
    this.client = null;
  }

  private getConnectedClient(): WebSocketClient {
    if (!this.client || this.client.readyState !== WebSocket.OPEN) {
      throw new Error('Chat connection is not open');
    }
    return this.client;
  }

  private handleMessage(event: MessageEvent): void {
    let data: unknown;
    try {
      data = JSON.parse(event.data);
    } catch {
      this.loadingHistory = false;
      store.setState('messagesError', 'Invalid WebSocket response');
      return;
    }

    if (Array.isArray(data)) {
      this.loadingHistory = false;

      const oldest: unknown = data.at(-1);

      const nextCursor =
        typeof oldest === 'object' && oldest !== null && 'id' in oldest
          ? String(oldest.id)
          : this.historyCursor;

      this.hasMoreHistory = data.length > 0 && nextCursor !== this.historyCursor;

      this.historyCursor = nextCursor;

      const history = data.filter(isChatMessage).reverse();

      this.updateKind = 'history';

      store.setState('messages', this.mergeMessages([...history, ...this.getMessages()]));
    } else if (isChatMessage(data)) {
      this.updateKind = 'message';

      store.setState('messages', this.mergeMessages([...this.getMessages(), data]));
    } else if (typeof data === 'object' && data !== null && 'type' in data) {
      if (data.type === 'error' && 'content' in data) {
        this.loadingHistory = false;

        store.setState('messagesError', String(data.content));
      }
    }
  }

  private mergeMessages(messages: ChatMessage[]): ChatMessage[] {
    const byId = new Map<string, ChatMessage>();
    const withoutId: ChatMessage[] = [];

    for (const message of messages) {
      if (message.id === undefined) {
        withoutId.push(message);
      } else {
        byId.set(String(message.id), message);
      }
    }
    return [...byId.values(), ...withoutId].sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
  }
}

export const messageController = new MessageController();
