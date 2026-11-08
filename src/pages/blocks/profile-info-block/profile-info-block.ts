import ProfileInfoBlockTemplate from './profile-info-block.hbs?raw';
import './profile-info-block.scss';
import { INFO_FIELDS } from './defaults';
import type { Props } from './types';
import { Block } from '@/core/block';
import { router } from '@/core/navigation';
import { authController } from '@/controllers/auth';
import { userController } from '@/controllers/user';
import { message } from '@/components/pr-message';

export class ProfileInfoBlock extends Block<Props> {
  static componentName = 'ProfileInfoBlock';
  private unsubscribe: (() => void) | undefined;
  protected template = ProfileInfoBlockTemplate;

  protected events = {
    click: async (event: Event) => {
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
          await router.go('/settings-change-data');
          break;
        case 'to-change-password':
          await router.go('/settings-change-password');
          break;
        case 'to-login-form': {
          const result = await authController.logout();

          if (!result.ok) {
            message.error(result.reason);
            return;
          }

          await router.go('/');

          break;
        }
      }
    },
  };

  constructor() {
    const props = { fields: INFO_FIELDS, user: userController.getUser() };
    super(props);
  }

  protected componentDidMount() {
    this.unsubscribe = userController.subscribe(() => {
      this.setProps({ user: userController.getUser() });
    });
  }

  protected componentWillUnmount() {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }
}
