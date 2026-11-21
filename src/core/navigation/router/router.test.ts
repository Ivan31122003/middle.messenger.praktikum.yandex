import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Router } from './router';
import { authController } from '@/controllers/auth';
import type { Pathname } from './types';

vi.mock('@/controllers/auth', () => ({ authController: { getAuthStatus: vi.fn() } }));

class View {
  private node = document.createElement('section');
  show() {
    this.node.removeAttribute('hidden');
  }
  hide() {
    this.node.setAttribute('hidden', '');
  }
  element() {
    return this.node;
  }
}

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    Router.instance = null;
    window.history.replaceState({}, '', '/');
    document.body.innerHTML = '<main id="app"></main>';
    vi.mocked(authController.getAuthStatus).mockResolvedValue({
      ok: true,
      data: {
        id: 1,
        first_name: 'Alice',
        second_name: 'Smith',
        display_name: 'Alice',
        phone: '1234567890',
        login: 'alice',
        avatar: null,
        email: 'alice@example.com',
      },
    });
    router = new Router();
    for (const path of ['/', '/sign-up', '/messenger', '/settings', '/404'] as const) {
      router.use(path, View);
    }
  });

  afterEach(() => {
    window.onpopstate = null;
    Router.instance = null;
    document.body.replaceChildren();
  });

  it('reuses its singleton and matches registered routes', () => {
    expect(new Router()).toBe(router);
    expect(router.getRoute('/settings')?.match('/settings')).toBe(true);
    expect(router.getRoute('/500')).toBeUndefined();
  });

  it('navigates and hides the previous view', async () => {
    await router.go('/messenger');
    const previous = document.querySelector('#app section')!;
    await router.go('/settings');
    expect(window.location.pathname).toBe('/settings');
    expect(previous.hasAttribute('hidden')).toBe(true);
    expect(document.querySelector('#app section')).not.toBe(previous);
  });

  it('redirects anonymous users from a private route to sign in', async () => {
    vi.mocked(authController.getAuthStatus).mockResolvedValue({
      ok: false,
      reason: 'Unauthorized',
    });
    const render = vi.spyOn(router.getRoute('/')!, 'render');
    await router.go('/settings');
    expect(window.location.pathname).toBe('/');
    expect(render).toHaveBeenCalledOnce();
  });

  it.each(['/', '/sign-up'] as const)('redirects authenticated users from %s', async (path) => {
    await router.go(path);
    expect(window.location.pathname).toBe('/messenger');
  });

  it('renders the fallback for an unknown path', async () => {
    const render = vi.spyOn(router.getRoute('/404')!, 'render');
    await router.go('/unknown' as Pathname);
    expect(render).toHaveBeenCalledOnce();
  });

  it('handles internal links and browser history, ignoring modified and external clicks', async () => {
    // Capture the listener so the test can remove it without accessing router internals.
    const addListener = vi.spyOn(document, 'addEventListener');
    router.start();
    const listener = addListener.mock.calls.find(([name]) => name === 'click')![1];
    // Runs after the router; prevent jsdom from attempting real document navigation.
    const preventNavigation = (event: Event) => event.preventDefault();
    document.addEventListener('click', preventNavigation);
    try {
      await vi.waitFor(() => expect(window.location.pathname).toBe('/messenger'));
      const go = vi.spyOn(router, 'go');
      const link = document.createElement('a');
      link.href = '/settings';
      document.body.append(link);
      const click = new MouseEvent('click', { bubbles: true, cancelable: true });
      link.dispatchEvent(click);
      expect(click.defaultPrevented).toBe(true);
      await vi.waitFor(() => expect(go).toHaveBeenCalledWith('/settings'));
      await vi.waitFor(() => expect(document.querySelector('#app section')).not.toBeNull());

      go.mockClear();
      link.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true }),
      );
      link.href = 'https://example.com/settings';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      expect(go).not.toHaveBeenCalled();

      const render = vi.spyOn(router.getRoute('/messenger')!, 'render');
      window.history.replaceState({}, '', '/messenger');
      window.dispatchEvent(new PopStateEvent('popstate'));
      await vi.waitFor(() => expect(render).toHaveBeenCalled());
    } finally {
      document.removeEventListener('click', listener);
      document.removeEventListener('click', preventNavigation);
    }
  });
});
