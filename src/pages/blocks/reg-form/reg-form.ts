import RegFormTemplate from './reg-form.hbs?raw';
import './reg-form.scss';
import { FIELDS } from './defaults';
import type { Props } from './types';
import { Block } from '@/core';
import { PrInput } from '@/components';
import { validators } from '@/modules/validation/validator';

export class RegForm extends Block<Props> {
  static componentName = 'RegForm';
  protected template = RegFormTemplate;

  protected events = {
    focusout: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      if (target.name === 'repeat_password') {
        return;
      }

      const errorMessage = validators[target.name](target.value);

      const input = this.refs[target.name] as PrInput;

      input.setProps({
        value: String(target.value ?? ''),
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

      const login = String(formData.get('login') ?? '');
      const email = String(formData.get('email') ?? '');
      const phone = String(formData.get('phone') ?? '');
      const password = String(formData.get('password') ?? '');
      const repeatPassword = String(formData.get('repeat_password') ?? '');
      const firstName = String(formData.get('first_name') ?? '');
      const secondName = String(formData.get('second_name') ?? '');

      const errors: Record<string, string | undefined> = {
        login: validators['login'](login),
        email: validators['email'](email),
        phone: validators['phone'](phone),
        password: validators['password'](password),
        first_name: validators['first_name'](firstName),
        second_name: validators['second_name'](secondName),
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

      console.log(login);
      console.log(email);
      console.log(phone);
      console.log(password);
      console.log(repeatPassword);
      console.log(firstName);
      console.log(secondName);
    },
  };

  constructor() {
    const props: Props = { fields: FIELDS };
    super(props);
  }
}
