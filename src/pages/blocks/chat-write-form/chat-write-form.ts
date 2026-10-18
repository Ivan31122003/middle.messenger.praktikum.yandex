import ChatWriteFormTemplate from './chat-write-form.hbs?raw';
import './chat-write-form.scss';
import { Block } from '@/core/block';
import { PrInput } from '@/components';
import { validators } from '@/modules/validation/validator';

export class ChatWriteForm extends Block {
  static componentName = 'ChatWriteForm';
  protected template = ChatWriteFormTemplate;

  protected events = {
    submit: (e: Event) => {
      e.preventDefault();

      const form = e.currentTarget;

      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      const formData = new FormData(form);

      const message = String(formData.get('message') ?? '');

      const errorMessage = validators['message'](message);

      const input = this.refs['message'] as PrInput;

      input.setProps({
        value: message,
        errorMessage,
      });

      if (errorMessage) {
        return;
      }

      console.log(message);
    },
  };

  constructor() {
    super();
  }
}
