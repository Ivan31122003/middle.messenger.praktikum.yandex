import ProfileInfoPageTemplate from './profile-info.hbs?raw';
import { Block } from '@/core/block';

export class ProfileInfoPage extends Block {
  static componentName = 'ProfileInfoPage';
  protected template = ProfileInfoPageTemplate;

  constructor() {
    super();
  }
}
