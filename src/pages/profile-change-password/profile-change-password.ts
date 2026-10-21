import ProfileChangePasswordPageTemplate from './profile-change-password.hbs?raw';
import { Block } from '@/core/block';

export class ProfileChangePasswordPage extends Block {
  static componentName = 'ProfileChangePasswordPage';
  protected template = ProfileChangePasswordPageTemplate;

  constructor() {
    super();
  }
}
