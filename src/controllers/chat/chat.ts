import { chatAPI } from '@/api/chats';
import { userAPI } from '@/api/user';
import type { Chat } from '@/types';
import type { CreateChat } from '@/api/chats';
import type { SearchUser } from '@/api/user';
import { store } from '@/core/store';

class ChatController {
  getChats(): Chat[] | null {
    return (store.getState().chats as Chat[]) ?? null;
  }

  getActiveChat(): Chat | null {
    return (store.getState().activeChat as Chat | undefined) ?? null;
  }

  setActiveChat(id?: number) {
    let activeChat: Chat | undefined;

    if (id !== undefined) {
      activeChat = (store.getState().chats as Chat[]).find((chat) => chat.id === id);
    } else {
      activeChat = (store.getState().chats as Chat[]).at(0);
    }

    store.setState('activeChat', activeChat);
  }

  subscribeChats(listener: () => void): () => void {
    let previousChats = this.getChats();

    return store.subscribe(() => {
      const chats = this.getChats();

      if (chats !== previousChats) {
        previousChats = chats;
        listener();
      }
    });
  }

  subscribeActiveChat(listener: () => void): () => void {
    let previousChat = this.getActiveChat();

    return store.subscribe(() => {
      const activeChat = this.getActiveChat();

      if (activeChat !== previousChat) {
        previousChat = activeChat;
        listener();
      }
    });
  }
  async fetchChats() {
    const result = await chatAPI.getChats();

    if (result.ok) {
      const activeChatId = this.getActiveChat()?.id;

      const activeChat =
        result.data.find((chat) => chat.id === activeChatId) ?? result.data.at(0) ?? null;

      store.setState('chats', result.data);
      store.setState('activeChat', activeChat);
    }

    return result;
  }

  async createChat(data: CreateChat) {
    return await chatAPI.createChat(data);
  }

  async addChatUser(data: SearchUser) {
    const resultSearchUser = await userAPI.searchUser(data);

    if (!resultSearchUser.ok) {
      return resultSearchUser;
    }

    const userId = resultSearchUser.data.id;
    const activeChatId = (store.getState().activeChat as Chat).id;

    return await chatAPI.addChatUser({
      users: [userId],
      chatId: activeChatId,
    });
  }

  async deleteChatUser(data: SearchUser) {
    const resultSearchUser = await userAPI.searchUser(data);

    if (!resultSearchUser.ok) {
      return resultSearchUser;
    }

    const userId = resultSearchUser.data.id;
    const activeChatId = (store.getState().activeChat as Chat).id;

    return await chatAPI.deleteChatUser({
      users: [userId],
      chatId: activeChatId,
    });
  }
}

export const chatController = new ChatController();
