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

  protected events = {
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
      this.setProps({
        contacts: chatController.getChats() ?? [],
      });
    });
  }

  protected componentWillUnmount() {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }
}
