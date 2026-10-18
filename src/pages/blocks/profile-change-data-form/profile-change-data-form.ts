import ProfileChangeDataFormTemplate from './profile-change-data-form.hbs?raw';
import './profile-change-data-form.scss';
import { FIELDS } from './defaults';
import type { Props } from './types';
import { Block } from '@/core';
import { PrInput } from '@/components';
import { validators } from '@/modules/validation/validator';

import { mockUser } from '@/store/user';

export class ProfileChangeDataForm extends Block<Props> {
  static componentName = 'ProfileChangeDataForm';
  protected template = ProfileChangeDataFormTemplate;

  constructor() {
    const props: Props = { fields: FIELDS, user: mockUser };
    super(props);
  }

  protected events = {
    focusout: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      if (target.name === 'display_message') {
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

      const login = String(formData.get('login') ?? '');
      const email = String(formData.get('email') ?? '');
      const phone = String(formData.get('phone') ?? '');
      const firstName = String(formData.get('first_name') ?? '');
      const secondName = String(formData.get('second_name') ?? '');
      const displayName = String(formData.get('display_name') ?? '');

      const errors: Record<string, string | undefined> = {
        login: validators['login'](login),
        email: validators['email'](email),
        phone: validators['phone'](phone),
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
      console.log(displayName);
      console.log(firstName);
      console.log(secondName);
    },
  };
}
