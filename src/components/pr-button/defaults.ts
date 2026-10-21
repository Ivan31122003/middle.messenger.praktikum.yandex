import type { Props } from './types';

export const DEFAULT_PROPS = {
  variant: 'primary',
  danger: false,
} as const satisfies Partial<Props>;
