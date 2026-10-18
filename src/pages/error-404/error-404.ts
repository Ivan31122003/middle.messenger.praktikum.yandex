import Error404Template from './error-404.hbs?raw';
import { Block } from '@/core/block';

export class Error404Page extends Block {
  static componentName = 'Error404Page';
  protected template = Error404Template;

  constructor() {
    super();
  }
}
