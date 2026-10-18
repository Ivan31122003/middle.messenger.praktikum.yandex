import type { ContactItemProps } from '@/pages/blocks';
import type { BlockOwnProps } from '@/core/block';

export interface Props extends BlockOwnProps {
  contacts: ContactItemProps[];
}
