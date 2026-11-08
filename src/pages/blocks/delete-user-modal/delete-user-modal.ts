import DeleteUserModalTemplate from './delete-user-modal.hbs?raw';
import './delete-user-modal.scss';
import { Block } from '@/core/block';
import { chatController } from '@/controllers/chat';
import { modal } from '@/components/pr-modal';
import { message } from '@/components/pr-message';

export class DeleteUserModal extends Block {
  static componentName = 'DeleteUserModal';
  protected template = DeleteUserModalTemplate;
  private loadStarted = false;

  protected events = {
    submit: async (e: Event) => {
      e.preventDefault();

      if (!(e.target instanceof Element)) {
        return;
      }

      const form = e.currentTarget;

      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const formData = new FormData(form);
      const userLogin = formData.get('user-login');

      if (typeof userLogin !== 'string' || !userLogin.trim()) {
        message.error('Введите логин пользователя');
        return;
      }

      const result = await chatController.deleteChatUser({
        login: userLogin.trim(),
      });

      if (!result.ok) {
        message.error(result.reason);
        return;
      }

      message.success('Пользователь удален из чата');

      modal.setContent('');
      modal.setProps({ title: '', visible: false });
      await chatController.fetchChats();
    },
  };

  protected componentDidMount(): void {
    if (this.loadStarted) {
      return;
    }

    this.loadStarted = true;
    void this.loadUsers();
  }

  private async loadUsers(): Promise<void> {
    try {
      const result = await chatController.getChatUsers();

      if (!result.ok) {
        message.error(result.reason);
        return;
      }

      this.setProps({ users: result.data });
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : 'Не удалось загрузить участников чата',
      );
    }
  }
}
