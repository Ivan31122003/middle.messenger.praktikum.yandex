import type { BlockOwnProps } from '@/core/block';
import type { ConversationDay } from '@/store/contact';

export interface Props extends BlockOwnProps {
  conversation: ConversationDay[];
}
