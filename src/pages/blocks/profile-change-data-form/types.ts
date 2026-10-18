import type { User } from '@/store/user';
import type { BlockOwnProps } from '@/core/block';

export interface FieldProps {
  name: string;
  caption: string;
  key: string;
}

export interface Props extends BlockOwnProps {
  fields: FieldProps[];
  user: User;
}
