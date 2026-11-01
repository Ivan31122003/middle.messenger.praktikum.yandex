import { Route } from '@/core/navigation/route';
import type { Pathname } from './types';
import type { ViewConstructor } from '@/core/navigation/route';

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

  use(pathname: Pathname, block: ViewConstructor) {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery });

    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname as Pathname);
    };

    this._onRoute(window.location.pathname as Pathname);
  }

  _onRoute(pathname: Pathname) {
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

  go(pathname: Pathname) {
    if (this.history === null) {
      return;
    }
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: Pathname) {
    return this.routes.find((route) => route.match(pathname));
  }
}
