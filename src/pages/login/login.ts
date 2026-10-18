import LoginPageTemplate from './login.hbs?raw';
import { Block } from '@/core/block';

export class LoginPage extends Block {
  static componentName = 'LoginPage';
  protected template = LoginPageTemplate;

  constructor() {
    super();
  }
}
