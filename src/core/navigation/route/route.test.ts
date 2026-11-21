import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Route } from './route';

describe('Route', () => {
  const show = vi.fn();
  const hide = vi.fn();
  const create = vi.fn();
  class View {
    private node = document.createElement('section');
    constructor() {
      create();
    }
    show = show;
    hide = hide;
    element() {
      return this.node;
    }
  }

  beforeEach(() => {
    document.body.innerHTML = '<main id="app"></main>';
  });
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('creates its view lazily and reuses it on subsequent renders', () => {
    const route = new Route('/settings', View, { rootQuery: '#app' });
    expect(create).not.toHaveBeenCalled();
    route.render();
    const node = document.querySelector('#app section');
    route.render();
    expect(create).toHaveBeenCalledOnce();
    expect(document.querySelector('#app section')).toBe(node);
    expect(show).toHaveBeenCalledTimes(2);
    route.leave();
    expect(hide).toHaveBeenCalledOnce();
  });

  it('only navigates when the path matches', () => {
    const route = new Route('/settings', View, { rootQuery: '#app' });
    route.navigate('/messenger');
    expect(create).not.toHaveBeenCalled();
    route.navigate('/settings');
    expect(create).toHaveBeenCalledOnce();
  });

  it('allows leaving a route before it has rendered', () => {
    const route = new Route('/', View, { rootQuery: '#app' });
    expect(() => route.leave()).not.toThrow();
    expect(hide).not.toHaveBeenCalled();
  });
});
