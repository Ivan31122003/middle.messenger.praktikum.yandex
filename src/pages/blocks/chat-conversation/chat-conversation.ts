import ChatConversationTemplate from './chat-conversation.hbs?raw';
import type { Props } from './types';
import './chat-conversation.scss';
import { Block } from '@/core/block';
import { messageController } from '@/controllers/message';
import { userController } from '@/controllers/user';

export class ChatConversation extends Block<Props> {
  static componentName = 'ChatConversation';
  protected template = ChatConversationTemplate;

  private unsubscribe: (() => void) | undefined;
  private scrollContainer: HTMLElement | null = null;
  private frame: number | undefined;
  private initialized = false;
  private receivedMessages = false;

  private onScroll = (): void => {
    if (this.scrollContainer && this.scrollContainer.scrollTop < 150) {
      messageController.loadMoreMessages();
    }
  };

  constructor() {
    super({ conversation: ChatConversation.getConversation() });
  }

  protected componentDidMount(): void {
    this.frame = requestAnimationFrame(() => {
      this.scrollContainer = this.element().closest<HTMLElement>('.chat__communication');

      this.scrollContainer?.addEventListener('scroll', this.onScroll, { passive: true });

      if (!this.initialized && this.scrollContainer) {
        this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
        this.initialized = true;
        this.receivedMessages = messageController.getMessages().length > 0;
      }
    });

    this.unsubscribe = messageController.subscribeMessages((kind) => {
      const container =
        this.scrollContainer ?? this.element().closest<HTMLElement>('.chat__communication');

      const oldTop = container?.scrollTop ?? 0;
      const oldHeight = container?.scrollHeight ?? 0;

      const nearBottom = !container || oldHeight - oldTop - container.clientHeight < 100;

      const firstMessages = !this.receivedMessages;

      if (kind === 'reset') {
        this.receivedMessages = false;
      } else if (messageController.getMessages().length > 0) {
        this.receivedMessages = true;
      }
      this.setProps({ conversation: ChatConversation.getConversation() });

      const updated = this.element().closest<HTMLElement>('.chat__communication');

      if (!updated) {
        return;
      }

      if (kind === 'reset' || firstMessages || (kind === 'message' && nearBottom)) {
        updated.scrollTop = updated.scrollHeight;
      } else if (kind === 'history') {
        updated.scrollTop = oldTop + updated.scrollHeight - oldHeight;
      } else {
        updated.scrollTop = oldTop;
      }
    });
  }

  protected componentWillUnmount(): void {
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
    this.scrollContainer?.removeEventListener('scroll', this.onScroll);
    this.scrollContainer = null;
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }

  private static getConversation(): Props['conversation'] {
    const userId = userController.getUser()?.id;
    const days = new Map<string, Props['conversation'][number]>();

    for (const message of messageController.getMessages()) {
      const date = new Date(message.time);
      const dayKey = date.toLocaleDateString('ru-RU');
      let day = days.get(dayKey);

      if (!day) {
        day = { date: dayKey, messages: [] };
        days.set(dayKey, day);
      }

      day.messages.push({
        message: message.content,
        isRead: message.is_read,
        time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isMine: userId !== undefined && String(message.user_id) === String(userId),
      });
    }

    return [...days.values()];
  }
}
