import type { User } from '@/types';
import type { BlockOwnProps } from '@/core/block';

export interface Props extends BlockOwnProps {
  user: User | null;
}
