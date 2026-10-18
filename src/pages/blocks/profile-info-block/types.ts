import type { User } from '@/store/user';
import type { BlockOwnProps } from '@/core/block';

export interface InfoFieldProps {
  caption: string;
  key: string;
}

export interface Props extends BlockOwnProps {
  fields: InfoFieldProps[];
  user: User;
}
