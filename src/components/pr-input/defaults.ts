import type { Props } from './types';

export const DEFAULT_PROPS = {
  variant: 'base',
  placeholder: '',
  type: 'text',
} as const satisfies Partial<Props>;
