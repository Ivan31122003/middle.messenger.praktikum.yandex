export type CreateChat = {
  title: string;
};

export type AddChatUser = {
  users: number[];
  chatId: number;
};

export type DeleteChatUser = {
  users: number[];
  chatId: number;
};
