import ContactsTemplate from './contacts.hbs?raw';
import './contacts.scss';
import type { Props } from './types';
import { Block } from '@/core';
import { chatController } from '@/controllers/chat';
import { modal } from '@/components/pr-modal';

export class Contacts extends Block<Props> {
  static componentName = 'Contacts';
  protected template = ContactsTemplate;
  private unsubscribe: (() => void) | undefined;
  private searchTimer: ReturnType<typeof setTimeout> | undefined;
  private searchVersion = 0;
  private searchValue = '';

  protected events = {
    input: (e: Event) => {
      const input = e.target;
      if (!(input instanceof HTMLInputElement) || input.id !== 'contacts__search') return;

      const previousTitle = this.searchValue.trim();
      this.searchValue = input.value;
      const title = input.value.trim();
      if (title === previousTitle) return;

      clearTimeout(this.searchTimer);
      const version = ++this.searchVersion;

      this.searchTimer = setTimeout(() => {
        void chatController.searchChats(title, () => {
          return version === this.searchVersion;
        });
      }, 300);
    },
    click: (e: Event) => {
      if (!(e.target instanceof Element)) {
        return;
      }

      if (e.target.closest('#contacts__create-chat')) {
        modal.setContent('{{{CreateChatModal}}}');
        modal.setProps({ title: 'Создание чата', visible: true });
        return;
      }

      const item = e.target.closest('#contacts__chats > li');

      if (!item) {
        return;
      }

      const chatId = Number(item.id);
      chatController.setActiveChat(chatId);
    },
  };

  protected componentDidMount() {
    this.unsubscribe = chatController.subscribeChats(() => {
      const input = this.element().querySelector<HTMLInputElement>('#contacts__search');
      const focused = document.activeElement === input;
      const start = input?.selectionStart ?? null;
      const end = input?.selectionEnd ?? null;
      this.setProps({
        contacts: chatController.getChats() ?? [],
      });
      const updated = this.element().querySelector<HTMLInputElement>('#contacts__search');
      if (updated) {
        updated.value = this.searchValue;
        if (focused) {
          updated.focus();
          updated.setSelectionRange(start, end);
        }
      }
    });
  }

  protected componentWillUnmount() {
    clearTimeout(this.searchTimer);
    this.searchVersion++;
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }
}
