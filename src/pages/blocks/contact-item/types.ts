import type { BlockOwnProps } from '@/core/block';

export interface Props extends BlockOwnProps {
  name: string;
  lastMessageIsYour: boolean;
  lastMessage: string;
  time: string;
  unreadMessagesNumber?: number;
}
