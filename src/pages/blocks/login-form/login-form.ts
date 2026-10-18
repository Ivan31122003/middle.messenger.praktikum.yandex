import LoginFormTemplate from './login-form.hbs?raw';
import './login-form.scss';
import { Block } from '@/core';
import { PrInput } from '@/components';
import { validateNotEmpty } from '@/modules/validation/validator';

export class LoginForm extends Block {
  static componentName = 'LoginForm';
  protected template = LoginFormTemplate;

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      const form = event.currentTarget;

      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const formData = new FormData(form);

      const login = String(formData.get('login') ?? '');
      const password = String(formData.get('password') ?? '');

      const errors = {
        login: validateNotEmpty(login),
        password: validateNotEmpty(password),
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

      window.location.href = '/messenger';
    },
  };

  constructor() {
    super();
  }
}
