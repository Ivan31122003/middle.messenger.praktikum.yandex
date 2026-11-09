import ProfileChangePasswordFormTemplate from './profile-change-password-form.hbs?raw';
import './profile-change-password-form.scss';
import type { Props } from './types';
import { Block } from '@/core/block';
import { PrInput } from '@/components';
import { validators } from '@/modules/validation/validator';
import { validateForm, isValidatorName } from '@/modules/validation';
import { userController } from '@/controllers/user';
import { message } from '@/components/pr-message';

export class ProfileChangePasswordForm extends Block<Props> {
  static componentName = 'ProfileChangePasswordForm';
  private unsubscribe: (() => void) | undefined;
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
    submit: async (e: Event) => {
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

      const result = await userController.updatePassword({
        oldPassword: values.old_password,
        newPassword: values.password,
      });

      if (result.ok) {
        message.success('Пароль успешно обновлен');
      } else {
        message.error(result.reason);
      }
    },
  };

  constructor() {
    const props: Props = { user: userController.getUser() };
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
