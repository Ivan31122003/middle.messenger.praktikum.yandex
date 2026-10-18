import ProfileChangePasswordFormTemplate from './profile-change-password-form.hbs?raw';
import './profile-change-password-form.scss';
import type { Props } from './types';
import { Block } from '@/core/block';
import { PrInput } from '@/components';
import { validateNotEmpty, validators } from '@/modules/validation/validator';

import { mockUser } from '@/store/user';

export class ProfileChangePasswordForm extends Block<Props> {
  static componentName = 'ProfileChangePasswordForm';
  protected template = ProfileChangePasswordFormTemplate;

  protected events = {
    submit: (e: Event) => {
      e.preventDefault();

      const form = e.currentTarget;

      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const formData = new FormData(form);

      const oldPassword = String(formData.get('old_password') ?? '');
      const newPassword = String(formData.get('new_password') ?? '');
      const repeatPassword = String(formData.get('repeat_password') ?? '');

      const errors: Record<string, string | undefined> = {
        old_password: validateNotEmpty(oldPassword),
        new_password: validators['password'](newPassword),
        repeat_password: validateNotEmpty(repeatPassword),
      };

      for (const [name, errorMessage] of Object.entries(errors)) {
        const input = this.refs[name] as PrInput;

        input.setProps({
          value: String(formData.get(name) ?? ''),
          errorMessage,
        });
      }

      if (Object.values(errors).some((errorMessage) => errorMessage)) {
        return;
      }

      console.log(oldPassword);
      console.log(newPassword);
      console.log(repeatPassword);
    },
  };

  constructor() {
    const props: Props = { user: mockUser };
    super(props);
  }
}
