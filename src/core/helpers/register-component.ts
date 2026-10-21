import Handlebars from 'handlebars';
import type { HelperOptions } from 'handlebars';
import { Block } from '@/core/block';
import type { BlockOwnProps } from '@/core/block';

type ComponentConstructor<Props extends BlockOwnProps> = {
  readonly componentName: string;
  new (props: Props): Block<Props>;
};

let uniqueId = 0;

export function registerComponent<Props extends BlockOwnProps>(
  Component: ComponentConstructor<Props>,
) {
  Handlebars.registerHelper(
    Component.componentName,
    function (this: unknown, { hash, data }: HelperOptions) {
      const dataAttribute = `data-component-hbs-id="${++uniqueId}"`;
      const component = new Component(hash as Props);

      if ('ref' in hash) {
        (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
      }

      (data.root.__children = data.root.__children || []).push({
        component,
        embed(node: ParentNode) {
          const placeholder = node.querySelector(`[${dataAttribute}]`);
          if (!placeholder) {
            throw new Error(`Can't find data-id for component ${Component.componentName}`);
          }

          const element = component.element();
          placeholder.replaceWith(element);
        },
      });

      return new Handlebars.SafeString(`<div ${dataAttribute}></div>`);
    },
  );
}
