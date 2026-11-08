import PrMessageTemplate from './pr-message.hbs?raw';
import { DEFAULT_PROPS } from './defaults';
import type { Props } from './types';
import './pr-message.scss';
import { Block } from '@/core';

export class PrMessage extends Block<Props> {
  static componentName = 'PrMessage';
  protected template = PrMessageTemplate;

  constructor(props: Props) {
    const propsWithDefaults = { ...DEFAULT_PROPS, ...props };
    super(propsWithDefaults);
  }
}
