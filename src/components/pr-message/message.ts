import { PrMessage } from './pr-message';
import type { Props } from './types';

function show(text: string, type: Props['type']) {
  let container = document.getElementById('messages');

  if (!container) {
    container = document.createElement('div');
    container.id = 'messages';
    container.className = 'messages';
    container.setAttribute('aria-live', 'polite');
    document.body.append(container);
  }

  const component = new PrMessage({ text, type });
  const element = component.element();

  container.append(element);

  const close = () => {
    window.clearTimeout(timer);
    element.remove();
  };

  const timer = window.setTimeout(close, 5000);

  return { close };
}

export const message = {
  success: (text: string) => show(text, 'success'),
  error: (text: string) => show(text, 'error'),
};
