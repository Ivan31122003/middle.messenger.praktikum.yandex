import type { BlockOwnProps } from '@/core/block';

export interface Props extends BlockOwnProps {
  id: string;
  name: string;
  variant: 'base' | 'field';
  value: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'tel';
  errorMessage?: string;
}
