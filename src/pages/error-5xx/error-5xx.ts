import Error5xxTemplate from './error-5xx.hbs?raw';
import { Block } from '@/core/block';

export class Error5xxPage extends Block {
  static componentName = 'Error5xxPage';
  protected template = Error5xxTemplate;

  constructor() {
    super();
  }
}
