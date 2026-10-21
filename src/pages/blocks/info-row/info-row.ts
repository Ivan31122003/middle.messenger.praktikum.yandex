import InfoRowTemplate from './info-row.hbs?raw';
import './info-row.scss';
import type { Props } from './types';
import { Block } from '@/core';

export class InfoRow extends Block<Props> {
  static componentName = 'InfoRow';
  protected template = InfoRowTemplate;

  constructor(props: Props) {
    super(props);
  }
}
