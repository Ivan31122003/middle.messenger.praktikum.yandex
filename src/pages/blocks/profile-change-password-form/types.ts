import type { User } from '@/store/user';
import type { BlockOwnProps } from '@/core/block';

export interface Props extends BlockOwnProps {
  user: User;
}
