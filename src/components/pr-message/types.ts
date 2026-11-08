import type { BlockOwnProps } from '@/core/block';

export interface Props extends BlockOwnProps {
  text: string;
  type?: 'success' | 'error';
}
