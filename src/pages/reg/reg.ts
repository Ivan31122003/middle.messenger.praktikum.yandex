import RegPageTemplate from './reg.hbs?raw';
import { Block } from '@/core/block';

export class RegPage extends Block {
  static componentName = 'RegPage';
  protected template = RegPageTemplate;

  constructor() {
    super();
  }
}
