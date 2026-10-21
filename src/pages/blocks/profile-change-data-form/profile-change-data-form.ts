import ProfileChangeDataFormTemplate from './profile-change-data-form.hbs?raw';
import './profile-change-data-form.scss';
import { FIELDS } from './defaults';
import type { Props } from './types';
import { Block } from '@/core';
import { PrInput } from '@/components';
import { validators } from '@/modules/validation/validator';
import { validateForm, isValidatorName } from '@/modules/validation';

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
        email: validators.email,
        phone: validators.phone,
        first_name: validators.first_name,
        second_name: validators.second_name,
        display_name: validators.display_name,
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
}
