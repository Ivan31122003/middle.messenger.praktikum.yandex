import type { BlockOwnProps } from '@/core/block';

export interface Props extends BlockOwnProps {
  error: string;
  text: string;
}
