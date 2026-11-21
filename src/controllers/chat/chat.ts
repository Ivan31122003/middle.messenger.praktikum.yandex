import { chatAPI } from '@/api/chats';
import { userAPI } from '@/api/user';
import { messageController } from '@/controllers/message';
import type { User, Chat } from '@/types';
import type { CreateChat } from '@/api/chats';
import type { SearchUser } from '@/api/user';
import { store } from '@/core/store';

class ChatController {
  async searchChats(title: string, isCurrent: () => boolean) {
    const result = await chatAPI.getChats(title ? { title } : undefined);

    if (result.ok && isCurrent()) {
      store.setState('chats', result.data);
    }

    return result;
  }

  getChats(): Chat[] | null {
    return (store.getState().chats as Chat[]) ?? null;
  }

  getActiveChat(): Chat | null {
    return (store.getState().activeChat as Chat | undefined) ?? null;
  }

  async setActiveChat(id?: number) {
    let activeChat: Chat | undefined;

    if (id !== undefined) {
      activeChat = (store.getState().chats as Chat[]).find((chat) => chat.id === id);
    } else {
      activeChat = (store.getState().chats as Chat[]).at(0);
    }

    const currentActiveChatId = (store.getState().activeChat as Chat | undefined)?.id ?? null;

    if (activeChat && activeChat.id !== currentActiveChatId) {
      store.setState('activeChat', activeChat);
      messageController.disconnect();
      const success = await this.getChatToken();

      if (success) {
        const userId = (store.getState().user as User).id;
        const chatId = (store.getState().activeChat as Chat).id;
        const chatToken = store.getState().chatToken;

        messageController.connect(`ws/chats/${userId}/${chatId}/${chatToken}`);
      }
    }
  }

  async getChatToken() {
    const activeChat = store.getState().activeChat as Chat | undefined;

    if (!activeChat) {
      return false;
    }

    const result = await chatAPI.getChatToken({ chatId: activeChat.id });

    if (result.ok) {
      store.setState('chatToken', result.data?.token);
    }

    return result.ok;
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

      store.setState('chats', result.data);
      await this.setActiveChat(activeChatId);
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

  async updateAvatar(formData: FormData) {
    const activeChat = this.getActiveChat();

    if (!activeChat) {
      throw new Error('Чат не выбран');
    }

    formData.set('chatId', String(activeChat.id));

    const result = await chatAPI.updateAvatar(formData);

    if (result.ok) {
      return await this.fetchChats();
    }

    return result;
  }

  async deleteChat() {
    const activeChat = this.getActiveChat();

    if (!activeChat) {
      throw new Error('Чат не выбран');
    }

    const result = await chatAPI.deleteChat({ chatId: activeChat.id });

    if (result.ok) {
      return await this.fetchChats();
    }

    return result;
  }

  async getChatUsers() {
    const activeChat = this.getActiveChat();

    if (!activeChat) {
      throw new Error('Чат не выбран');
    }

    return await chatAPI.getChatUsers({ chatId: activeChat.id });
  }
}

export const chatController = new ChatController();
