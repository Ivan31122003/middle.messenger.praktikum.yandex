import ErrorLayoutTemplate from './error.hbs?raw';
import './error.scss';
import type { Props } from './types';
import { Block } from '@/core';

export class ErrorLayout extends Block<Props> {
  static componentName = 'ErrorLayout';
  protected template = ErrorLayoutTemplate;

  constructor(props: Props) {
    super(props);
  }
}
