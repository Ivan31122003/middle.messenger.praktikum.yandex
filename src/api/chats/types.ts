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
