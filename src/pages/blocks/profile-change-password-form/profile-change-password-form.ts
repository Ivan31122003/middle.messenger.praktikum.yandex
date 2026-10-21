import ProfileChangePasswordFormTemplate from './profile-change-password-form.hbs?raw';
import './profile-change-password-form.scss';
import type { Props } from './types';
import { Block } from '@/core/block';
import { PrInput } from '@/components';
import { validators } from '@/modules/validation/validator';
import { validateForm, isValidatorName } from '@/modules/validation';

import { mockUser } from '@/store/user';

export class ProfileChangePasswordForm extends Block<Props> {
  static componentName = 'ProfileChangePasswordForm';
  protected template = ProfileChangePasswordFormTemplate;

  protected events = {
    focusout: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      if (!isValidatorName(target.name)) {
        return;
      }

      const input = this.refs[target.name] as PrInput;
      const errorMessage = validators[target.name](target.value);
      const value = String(target.value ?? '');

      input.setProps({
        value,
        errorMessage,
      });
    },
    submit: (e: Event) => {
      e.preventDefault();

      const form = e.currentTarget;

      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const formData = new FormData(form);

      const { values, errors, isValid } = validateForm(formData, {
        old_password: validators.password,
        password: validators.password,
        repeat_password: validators.password,
      });

      for (const [name, errorMessage] of Object.entries(errors)) {
        const input = this.refs[name] as PrInput;

        input.setProps({
          value: values[name],
          errorMessage,
        });
      }

      if (!isValid) {
        return;
      }

      console.log(values);
    },
  };

  constructor() {
    const props: Props = { user: mockUser };
    super(props);
  }
}
