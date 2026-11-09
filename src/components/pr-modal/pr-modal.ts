import Handlebars from 'handlebars';
import PrModalTemplate from './pr-modal.hbs?raw';
import type { Props } from './types';
import './pr-modal.scss';
import { Block } from '@/core';

Handlebars.registerPartial('modal-layout', PrModalTemplate);

class PrModal extends Block<Props> {
  protected template = '{{#> modal-layout}}{{/modal-layout}}';

  protected events = {
    click: (e: Event) => {
      if (!(e.target instanceof Element)) {
        return;
      }

      const button = e.target.closest('button');

      if (!button) {
        return;
      }

      if (button.id === 'modal__cross') {
        modal.setContent('');
        modal.setProps({ title: '', visible: false });
      }
    },
  };

  constructor() {
    super({ visible: false });
  }

  setContent(contentTemplate: string): void {
    this.template = `
      {{#> modal-layout}}
        ${contentTemplate}
      {{/modal-layout}}
    `;

    this.setProps({});
  }
}

export const modal = new PrModal();
