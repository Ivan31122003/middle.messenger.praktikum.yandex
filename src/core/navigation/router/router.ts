import { Route } from '@/core/navigation/route';
import type { Pathname } from './types';
import type { ViewConstructor } from '@/core/navigation/route';
import { authController } from '@/controllers/auth';

export class Router {
  static instance: Router | null = null;
  private rootQuery: string = '#app';
  private routes: Route<Pathname>[] = [];
  private history: History | null = null;
  private currentRoute: Route<Pathname> | null = null;

  constructor(rootQuery: string = '#app') {
    if (Router.instance) {
      return Router.instance;
    }

    this.rootQuery = rootQuery;
    this.history = window.history;
    Router.instance = this;
  }

  private onLinkClick = (event: MouseEvent): void => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (!(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest<HTMLAnchorElement>('a[href]');

    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) {
      return;
    }

    const url = new URL(link.href);

    if (url.origin !== window.location.origin || url.hash) {
      return;
    }

    const pathname = url.pathname as Pathname;

    if (!this.getRoute(pathname)) {
      return;
    }

    event.preventDefault();
    void this.go(pathname);
  };

  use(pathname: Pathname, block: ViewConstructor) {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery });

    this.routes.push(route);

    return this;
  }

  start(): void {
    document.addEventListener('click', this.onLinkClick);

    window.onpopstate = () => {
      this.onRoute(window.location.pathname as Pathname);
    };

    this.onRoute(window.location.pathname as Pathname);
  }

  private async guard(pathname: Pathname) {
    const isPublic = pathname === '/' || pathname === '/sign-up';

    const result = await authController.getAuthStatus();

    const isAuthenticated = result.ok;

    if (isPublic && isAuthenticated) {
      this.history?.replaceState({}, '', '/messenger');
      await this.onRoute('/messenger');
      return false;
    }

    if (!isPublic && !isAuthenticated) {
      this.history?.replaceState({}, '', '/');
      await this.onRoute('/');
      return false;
    }

    return true;
  }

  private async onRoute(pathname: Pathname) {
    const success = await this.guard(pathname);
    if (!success) {
      return;
    }

    const route = this.getRoute(pathname) ?? this.getRoute('/404');

    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  async go(pathname: Pathname) {
    if (this.history === null) {
      return;
    }
    this.history.pushState({}, '', pathname);
    await this.onRoute(pathname);
  }

  getRoute(pathname: Pathname) {
    return this.routes.find((route) => route.match(pathname));
  }
}
