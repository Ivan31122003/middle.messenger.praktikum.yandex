import ChatConversationTemplate from './chat-conversation.hbs?raw';
import './chat-conversation.scss';
import { Block } from '@/core/block';

export class ChatConversation extends Block {
  static componentName = 'ChatConversation';
  protected template = ChatConversationTemplate;
}
