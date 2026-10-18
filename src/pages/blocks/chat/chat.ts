import ChatTemplate from './chat.hbs?raw';
import './chat.scss';
import { Block } from '@/core/block';

import { mockContact } from '@/store/contact';

export class Chat extends Block {
  static componentName = 'Chat';
  protected template = ChatTemplate;

  constructor() {
    const props = mockContact;
    super(props);
  }
}
