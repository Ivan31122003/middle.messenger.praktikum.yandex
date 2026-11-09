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

  public override setProps(props: Partial<Props>): void {
    const updatesFieldState = Object.keys(props).every(
      (key) => key === 'value' || key === 'errorMessage',
    );

    if (!updatesFieldState) {
      super.setProps(props);
      return;
    }

    this.props = { ...this.props, ...props };

    const root = this.element();
    const input = root.querySelector('input');
    const error = root.querySelector<HTMLElement>('.pr-input__validation-error-text');

    if (input && 'value' in props) {
      const value = this.props.value ?? '';
      if (input.value !== value) {
        input.value = value;
      }
    }

    if (error) {
      error.textContent = this.props.errorMessage ?? '';
      error.hidden = !this.props.errorMessage;
    }
  }
}
