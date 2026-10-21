export type Path =
  | '/'
  | '/5xx'
  | '/login'
  | '/reg'
  | '/messenger'
  | '/profile-info'
  | '/profile-change-data'
  | '/profile-change-password';

interface Page {
  type: 'page';
  component: new () => {
    element(): Element | null;
  };
}

interface Redirect {
  type: 'redirect';
  to: Path;
}

export type Route = Page | Redirect;

export interface ChildComponent {
  embed(node: ParentNode): void;
}
