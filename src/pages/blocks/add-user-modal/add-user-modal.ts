import AddUserModalTemplate from './add-user-modal.hbs?raw';
import './add-user-modal.scss';
import { Block } from '@/core/block';
import { chatController } from '@/controllers/chat';
import { modal } from '@/components/pr-modal';
import { message } from '@/components/pr-message';

export class CreateChatModal extends Block {
  static componentName = 'CreateChatModal';
  protected template = CreateChatModalTemplate;

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
      const title = formData.get('title');

      if (typeof title !== 'string' || !title.trim()) {
        message.error('Введите название чата');
        return;
      }

      const result = await chatController.createChat({
        title: title.trim(),
      });

      if (!result.ok) {
        message.error(result.reason);
        return;
      }

      message.success('Чат создан');

      modal.setContent('');
      modal.setProps({ title: '', visible: false });
      await chatController.fetchChats();
    },
  };
}
