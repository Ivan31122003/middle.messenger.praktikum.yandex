import PrButtonTemplate from './pr-button.hbs?raw';
import { DEFAULT_PROPS } from './defaults';
import type { Props } from './types';
import './pr-button.scss';
import { Block } from '@/core';

export class PrButton extends Block<Props> {
  static componentName = 'PrButton';
  protected template = PrButtonTemplate;

  constructor(props: Props) {
    const propsWithDefaults = { ...DEFAULT_PROPS, ...props };
    super(propsWithDefaults);
  }
}
