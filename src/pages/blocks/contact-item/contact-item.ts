import ContactItemTemplate from './contact-item.hbs?raw';
import './contact-item.scss';
import type { Props } from './types';
import { Block } from '@/core';

export class ContactItem extends Block<Props> {
  static componentName = 'ContactItem';
  protected template = ContactItemTemplate;

  constructor(props: Props) {
    super(props);
  }
}
