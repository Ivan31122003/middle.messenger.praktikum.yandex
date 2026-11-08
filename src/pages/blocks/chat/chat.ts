import ChatTemplate from './chat.hbs?raw';
import type { Props } from './types';
import './chat.scss';
import { Block } from '@/core/block';
import { chatController } from '@/controllers/chat';
import { modal } from '@/components/pr-modal';

export class Chat extends Block<Props> {
  static componentName = 'Chat';
  protected template = ChatTemplate;
  private unsubscribe: (() => void) | undefined;

  protected events = {
    click: (e: Event) => {
      if (!(e.target instanceof Element)) {
        return;
      }

      const button = e.target.closest('button');

      if (!button) {
        return;
      }

      switch (button.id) {
        case 'chat-menu-toggle':
          this.setProps({ menuOpen: !this.props.menuOpen });
          break;

        case 'chat-add-user':
          this.setProps({ menuOpen: false });
          modal.setContent('{{{AddUserModal}}}');
          modal.setProps({ title: 'Добавить пользователя в чат', visible: true });
          break;

        case 'chat-delete':
          this.setProps({ menuOpen: false });
          modal.setContent('{{{DeleteUserModal}}}');
          modal.setProps({ title: 'Удалить пользователя из чата', visible: true });
          break;
      }
    },
  };

  constructor() {
    super({
      activeChat: chatController.getActiveChat(),
      menuOpen: false,
    });
  }

  protected componentDidMount(): void {
    this.unsubscribe = chatController.subscribeActiveChat(() => {
      this.setProps({
        activeChat: chatController.getActiveChat(),
        menuOpen: false,
      });
    });
  }

  protected componentWillUnmount(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }
}
