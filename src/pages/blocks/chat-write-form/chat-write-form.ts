import ChatWriteFormTemplate from './chat-write-form.hbs?raw';
import './chat-write-form.scss';
import { Block } from '@/core/block';
import { PrInput } from '@/components';
import { validators } from '@/modules/validation/validator';
import { validateForm, isValidatorName } from '@/modules/validation';
import { messageController } from '@/controllers/message';

export class ChatWriteForm extends Block {
  static componentName = 'ChatWriteForm';
  protected template = ChatWriteFormTemplate;

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
        message: validators.message,
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

      const message = values.message;

      if (typeof message === 'string' && message.trim()) {
        messageController.sendMessage(message);
        form.reset();
      }
    },
  };

  constructor() {
    super();
  }
}
