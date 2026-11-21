import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Handlebars from 'handlebars';
import { PrInput } from './pr-input';

describe('PrInput', () => {
  beforeEach(() => {
    Handlebars.registerHelper('eq', (a, b) => a === b);
  });

  afterEach(() => {
    document.body.replaceChildren();
    Handlebars.unregisterHelper('eq');
  });

  const create = () => {
    const component = new PrInput({
      id: 'login',
      name: 'login',
      variant: 'field',
      value: 'Alice',
      placeholder: 'Login',
    });
    document.body.append(component.element());
    return component;
  };

  it('renders an accessible label and input attributes', () => {
    const root = create().element();
    const input = root.querySelector('input')!;
    expect(input.id).toBe('login');
    expect(input.name).toBe('login');
    expect(input.value).toBe('Alice');
    expect(root.querySelector('label')?.htmlFor).toBe(input.id);
  });

  it('updates value without replacing the focused input', () => {
    const component = create();
    const input = component.element().querySelector('input')!;
    input.focus();
    component.setProps({ value: 'Bob' });
    expect(component.element().querySelector('input')).toBe(input);
    expect(document.activeElement).toBe(input);
    expect(input.value).toBe('Bob');
  });

  it('shows and clears validation errors', () => {
    const component = create();
    const error = component
      .element()
      .querySelector<HTMLElement>('.pr-input__validation-error-text')!;
    expect(error.hidden).toBe(true);
    component.setProps({ errorMessage: 'Required' });
    expect(error.textContent).toBe('Required');
    expect(error.hidden).toBe(false);
    component.setProps({ errorMessage: '' });
    expect(error.hidden).toBe(true);
  });
});
