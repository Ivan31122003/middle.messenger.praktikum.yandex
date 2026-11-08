import UploadChatAvatarModalTemplate from './upload-chat-avatar-modal.hbs?raw';
import './upload-chat-avatar-modal.scss';
import { Block } from '@/core/block';
import { chatController } from '@/controllers/chat';
import { modal } from '@/components/pr-modal';
import { message } from '@/components/pr-message';

export class UploadChatAvatarModal extends Block {
  static componentName = 'UploadChatAvatarModal';
  protected template = UploadChatAvatarModalTemplate;

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
      const avatar = formData.get('avatar');

      if (!(avatar instanceof File) || avatar.size === 0) {
        message.error('Нужно выбрать файл');
        return;
      }

      const result = await chatController.updateAvatar(formData);

      if (!result.ok) {
        message.error(result.reason);
        return;
      }

      message.success('Аватар обновлён');
      modal.setContent('');
      modal.setProps({ title: '', visible: false });
    },
  };
}
