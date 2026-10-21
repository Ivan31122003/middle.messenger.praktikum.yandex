import ChatConverstionTemplate from './chat-conversation.hbs?raw';
import './chat-conversation.scss';
import type { Props } from './types';
import { Block } from '@/core/block';

export class ChatConversation extends Block<Props> {
  static componentName = 'ChatConversation';
  protected template = ChatConverstionTemplate;

  constructor(props: Props) {
    super(props);
  }
}
