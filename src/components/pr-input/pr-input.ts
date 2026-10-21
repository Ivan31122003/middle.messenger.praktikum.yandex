import PrInputTemplate from './pr-input.hbs?raw';
import './pr-input.scss';
import { DEFAULT_PROPS } from './defaults';
import type { Props } from './types';
import { Block } from '@/core';

export class PrInput extends Block<Props> {
  static componentName = 'PrInput';
  protected template = PrInputTemplate;

  constructor(props: Props) {
    const propsWithDefaults = { ...DEFAULT_PROPS, ...props };
    super(propsWithDefaults);
  }
}
