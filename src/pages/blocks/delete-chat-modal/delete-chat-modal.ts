import DeleteChatModalTemplate from './delete-chat-modal.hbs?raw';
import './delete-chat-modal.scss';
import { Block } from '@/core/block';
import { chatController } from '@/controllers/chat';
import { modal } from '@/components/pr-modal';
import { message } from '@/components/pr-message';

export class DeleteChatModal extends Block {
  static componentName = 'DeleteChatModal';
  protected template = DeleteChatModalTemplate;

  protected events = {
    submit: async (e: Event) => {
      e.preventDefault();

      if (!(e.target instanceof Element)) {
        return;
      }

      const result = await chatController.deleteChat();

      if (!result.ok) {
        message.error(result.reason);
        return;
      }

      message.success('Чат удален');
      modal.setContent('');
      modal.setProps({ title: '', visible: false });
    },
  };
}
