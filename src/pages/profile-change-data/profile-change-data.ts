import ProfileChangeDataPageTemplate from './profile-change-data.hbs?raw';
import { Block } from '@/core/block';

export class ProfileChangeDataPage extends Block {
  static componentName = 'ProfileChangeDataPage';
  protected template = ProfileChangeDataPageTemplate;

  constructor() {
    super();
  }
}
