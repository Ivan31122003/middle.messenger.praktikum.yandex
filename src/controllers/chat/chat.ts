import { chatsAPI } from '@/api/chats';
import type { Chat } from '@/types';
import type { CreateChat } from '@/api/chats';
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
    const result = await chatsAPI.getChats();

    if (result.ok) {
      store.setState('chats', result.data);
      store.setState('activeChat', result.data.at(0));
    }

    return result;
  }

  async createChat(data: CreateChat) {
    return await chatsAPI.createChat(data);
  }
}

export const chatController = new ChatController();
