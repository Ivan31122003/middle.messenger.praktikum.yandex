import RegFormTemplate from './reg-form.hbs?raw';
import './reg-form.scss';
import { FIELDS } from './defaults';
import type { Props } from './types';
import { Block } from '@/core';
import { PrInput } from '@/components';
import { validators } from '@/modules/validation/validator';
import { validateForm, isValidatorName } from '@/modules/validation';
import { router } from '@/core/navigation';
import { authController } from '@/controllers/auth';
import { userController } from '@/controllers/user';
import { message } from '@/components/pr-message';

export class RegForm extends Block<Props> {
  static componentName = 'RegForm';
  protected template = RegFormTemplate;

  protected events = {
    focusout: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      if (!isValidatorName(target.name)) {
        return;
      }

      const errorMessage = validators[target.name](target.value);

      const input = this.refs[target.name] as PrInput;

      input.setProps({
        value: String(target.value ?? ''),
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
        login: validators.login,
        email: validators.email,
        phone: validators.phone,
        password: validators.password,
        repeat_password: validators.password,
        first_name: validators.first_name,
        second_name: validators.second_name,
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

      const resultSignUp = await authController.signUp({
        first_name: values.first_name,
        second_name: values.second_name,
        login: values.login,
        email: values.email,
        password: values.password,
        phone: values.phone,
      });

      if (!resultSignUp.ok) {
        message.error(resultSignUp.reason);
        return;
      }

      await router.go('/messenger');
    },
  };

  constructor() {
    const props: Props = { fields: FIELDS };
    super(props);
  }
}
