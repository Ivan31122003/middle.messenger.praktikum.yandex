export interface RouteView {
  show(): void;
  hide(): void;
  element(): Element;
}

export type ViewConstructor = new () => RouteView;

export interface RouteProps {
  rootQuery: string;
}
