import PrAvatarTemplate from './pr-avatar.hbs?raw';
import './pr-avatar.scss';
import type { Props } from './types';
import { Block } from '@/core';

export class PrAvatar extends Block<Props> {
  static componentName = 'PrAvatar';
  protected template = PrAvatarTemplate;

  constructor(props: Props) {
    super(props);
  }
}
