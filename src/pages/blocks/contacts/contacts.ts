import ContactsTemplate from './contacts.hbs?raw';
import './contacts.scss';
import type { Props } from './types';
import { Block } from '@/core';

import { mockContacts } from '@/store/contacts';

export class Contacts extends Block<Props> {
  static componentName = 'Contacts';
  protected template = ContactsTemplate;

  constructor() {
    const props: Props = { contacts: mockContacts };
    super(props);
  }
}
