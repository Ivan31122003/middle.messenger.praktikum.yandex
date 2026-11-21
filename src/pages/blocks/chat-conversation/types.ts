import type { BlockOwnProps } from '@/core/block';

export type ConversationMessage = {
  message: string;
  time: string;
  isMine: boolean;
  isRead: boolean;
};

export type Props = BlockOwnProps & {
  conversation: { date: string; messages: ConversationMessage[] }[];
};
