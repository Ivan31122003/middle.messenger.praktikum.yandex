import type { Block } from '../block/block';

export function render(selector: string, block: Pick<Block<object>, 'element'>): void {
  const container = document.querySelector(selector);

  if (!container) {
    throw new Error(`Не найден контейнер: ${selector}`);
  }

  container.replaceChildren(block.element());
}
