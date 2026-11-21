export type GetChats = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type CreateChat = {
  title: string;
};

export type DeleteChat = {
  chatId: number;
};

export type AddChatUser = {
  users: number[];
  chatId: number;
};

export type DeleteChatUser = {
  users: number[];
  chatId: number;
};

export type ChatUsers = {
  chatId: number;
};

export type GetChatToken = {
  chatId: number;
};
