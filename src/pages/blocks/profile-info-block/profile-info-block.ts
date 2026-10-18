import ProfileInfoBlockTemplate from './profile-info-block.hbs?raw';
import './profile-info-block.scss';
import { INFO_FIELDS } from './defaults';
import type { Props } from './types';
import { Block } from '@/core/block';

import { mockUser } from '@/store/user';

export class ProfileInfoBlock extends Block<Props> {
  static componentName = 'ProfileInfoBlock';
  protected template = ProfileInfoBlockTemplate;

  protected events = {
    click: (event: Event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const button = event.target;

      if (!button) {
        return;
      }

      const id = button.id;

      switch (id) {
        case 'to-change-data':
          window.location.href = '/profile-change-data';
          break;
        case 'to-change-password':
          window.location.href = '/profile-change-password';
          break;
        case 'to-login-form':
          window.location.href = '/login';
          break;
      }
    },
  };

  constructor() {
    const props = { fields: INFO_FIELDS, user: mockUser };
    super(props);
  }
}
