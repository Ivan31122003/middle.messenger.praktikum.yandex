import type { RouteView, ViewConstructor, RouteProps } from './types';
import { render } from '@/core/utils';

export class Route<T> {
  private pathname: T;
  private blockClass: ViewConstructor;
  private block: RouteView | null = null;
  private props: RouteProps;

  constructor(pathname: T, view: ViewConstructor, props: RouteProps) {
    this.pathname = pathname;
    this.blockClass = view;
    this.props = props;
  }

  navigate(pathname: T) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: T) {
    return this.pathname === pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass();
      render(this.props.rootQuery, this.block);
      return;
    }

    this.block.show();
  }
}
