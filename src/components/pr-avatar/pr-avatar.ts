import PrAvatarTemplate from './pr-avatar.hbs?raw';
import './pr-avatar.scss';
import type { Props } from './types';
import { Block } from '@/core';
import { modal } from '@/components/pr-modal';

export class PrAvatar extends Block<Props> {
  static componentName = 'PrAvatar';
  protected template = PrAvatarTemplate;

  protected events = {
    click: (event: Event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (!event.target.closest('.pr-avatar__overlay')) {
        return;
      }

      modal.setContent('{{{UploadUserAvatarModal}}}');

      modal.setProps({
        title: 'Загрузите аватар',
        visible: true,
      });
    },
  };
}
