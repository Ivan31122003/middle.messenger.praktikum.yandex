import MessengerPageTemplate from './messenger.hbs?raw';
import './messenger.scss';
import { Block } from '@/core/block';

export class MessengerPage extends Block {
  static componentName = 'MessengerPage';
  protected template = MessengerPageTemplate;

  constructor() {
    super();
  }
}
