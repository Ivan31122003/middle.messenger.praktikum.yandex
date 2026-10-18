import type { BlockOwnProps } from '@/core/block';

export interface Props extends BlockOwnProps {
  type: 'submit' | 'reset' | 'button';
  text: string;
  danger?: boolean;
  variant?: 'primary' | 'text' | 'icon';
  iconSrc?: string;
  id?: string;
}
