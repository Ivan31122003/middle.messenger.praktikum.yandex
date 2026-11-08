import UploadUserAvatarModalTemplate from './upload-user-avatar-modal.hbs?raw';
import './upload-user-avatar-modal.scss';
import { Block } from '@/core/block';
import { userController } from '@/controllers/user';
import { modal } from '@/components/pr-modal';
import { message } from '@/components/pr-message';

export class UploadUserAvatarModal extends Block {
  static componentName = 'UploadUserAvatarModal';
  protected template = UploadUserAvatarModalTemplate;

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

      const result = await userController.updateAvatar(formData);

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
