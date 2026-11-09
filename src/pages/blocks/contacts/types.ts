import type { Chat } from '@/types';
import type { BlockOwnProps } from '@/core/block';

export interface Props extends BlockOwnProps {
  contacts: Chat[];
}
