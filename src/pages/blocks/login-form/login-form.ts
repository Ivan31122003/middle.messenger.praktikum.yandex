import LoginFormTemplate from './login-form.hbs?raw';
import './login-form.scss';
import { Block } from '@/core';
import { PrInput } from '@/components';
import { validators } from '@/modules/validation/validator';
import { validateForm, isValidatorName } from '@/modules/validation';

export class LoginForm extends Block {
  static componentName = 'LoginForm';
  protected template = LoginFormTemplate;

  protected events = {
    focusout: (e: Event) => {
      const target = e.target;

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
        login: validators.login,
        password: validators.password,
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

      window.location.href = '/messenger';
    },
  };

  constructor() {
    super();
  }
}
