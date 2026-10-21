import Handlebars from 'handlebars';

type EventListType = Partial<Record<keyof HTMLElementEventMap, (e: Event) => void>>;

export interface BlockOwnProps {
  __children?: Array<{
    component: Block<object>;
    embed(node: ParentNode): void;
  }>;
  __refs?: Record<string, Block<object>>;
}

export abstract class Block<Props extends BlockOwnProps = object> {
  protected abstract template: string;
  protected props = {} as Props;
  protected events: EventListType = {};
  protected refs: Record<string, Block<object>> = {};
  protected children: Block<object>[] = [];
  private domElement: Element | null = null;

  constructor(props: Props = {} as Props) {
    this.props = props;
  }

  public element(): Element {
    if (!this.domElement) {
      this.render();
    }

    if (!this.domElement) {
      throw new Error('Компонент не создал корневой DOM-элемент');
    }

    return this.domElement;
  }

  private compile() {
    const html = Handlebars.compile(this.template)(this.props);

    const templateElement = document.createElement('template');
    templateElement.innerHTML = html;
    const fragment = templateElement.content;

    if (this.props.__children) {
      this.children = this.props.__children.map((child) => child.component);

      this.props.__children.forEach((child) => {
        child.embed(fragment);
      });
    }

    this.refs = this.props.__refs ?? {};

    const element = templateElement.content.firstElementChild;

    if (!element) {
      throw new Error('Шаблон компонента должен содержать корневой HTML-элемент');
    }

    return element;
  }

  protected render() {
    this.unmountComponent();
    const fragment = this.compile();
    if (this.domElement && fragment) {
      this.domElement.replaceWith(fragment);
    }
    this.domElement = fragment;
    this.mountComponent();
  }

  public setProps(props: Partial<Props>) {
    this.props = { ...this.props, ...props, __children: [], __refs: {} };
    this.render();
  }

  protected componentDidMount() {}

  private mountComponent() {
    this.attachListeners();
    this.componentDidMount();
  }

  protected componentWillUnmount() {}

  private unmountComponent() {
    if (this.domElement) {
      /** Вызываем очистку в порядке, обратном созданию */
      this.children.toReversed().forEach((child) => child.unmountComponent());
      this.componentWillUnmount();
      this.removeListeners();
    }
  }

  private attachListeners() {
    for (const [eventName, eventCallback] of Object.entries(this.events)) {
      if (typeof eventCallback === 'function' && this.domElement) {
        this.domElement.addEventListener(eventName, eventCallback);
      }
    }
  }

  private removeListeners() {
    for (const [eventName, eventCallback] of Object.entries(this.events)) {
      if (typeof eventCallback === 'function' && this.domElement) {
        this.domElement.removeEventListener(eventName, eventCallback);
      }
    }
  }
}
