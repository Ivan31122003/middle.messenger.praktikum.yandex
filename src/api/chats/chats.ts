import type { ApiVoidResult, User, Chat } from '@/types';
import type { CreateChat, DeleteChat, AddChatUser, DeleteChatUser, ChatUsers } from './types';
import { HTTPTransport } from '@/core/http';
import type { ApiResult } from '@/types';
import { getErrorReason } from '@/api/helpers';

const chatAPIInstance = new HTTPTransport('/api/v2/chats');

class ChatAPI {
  async getChats(): Promise<ApiResult<Chat[]>> {
    try {
      const chats = (await chatAPIInstance.get('')) as Chat[];
      return { ok: true, data: chats };
    } catch (e) {
      return {
        ok: false,
        reason: getErrorReason(e),
      };
    }
  }

  async createChat(data: CreateChat): Promise<ApiResult<{ id: number }>> {
    try {
      const newChat = (await chatAPIInstance.post('', { data })) as { id: number };
      return { ok: true, data: newChat };
    } catch (e) {
      return {
        ok: false,
        reason: getErrorReason(e),
      };
    }
  }

  async deleteChat(data: DeleteChat): Promise<ApiVoidResult> {
    try {
      await chatAPIInstance.delete('', { data });
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        reason: getErrorReason(e),
      };
    }
  }

  async addChatUser(data: AddChatUser): Promise<ApiVoidResult> {
    try {
      await chatAPIInstance.put('/users', { data });
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        reason: getErrorReason(e),
      };
    }
  }

  async deleteChatUser(data: DeleteChatUser): Promise<ApiVoidResult> {
    try {
      await chatAPIInstance.delete('/users', { data });
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        reason: getErrorReason(e),
      };
    }
  }

  async updateAvatar(formData: FormData): Promise<ApiResult<Chat>> {
    try {
      const chat = (await chatAPIInstance.put('/avatar', { data: formData })) as Chat;
      return { ok: true, data: chat };
    } catch (e) {
      return { ok: false, reason: getErrorReason(e) };
    }
  }

  async getChatUsers(data: ChatUsers): Promise<ApiResult<User[]>> {
    try {
      const chatUsers = (await chatAPIInstance.get(`/${data.chatId}/users`, {
        data,
      })) as User[];
      return { ok: true, data: chatUsers };
    } catch (e) {
      return { ok: false, reason: getErrorReason(e) };
    }
  }
}

export const chatAPI = new ChatAPI();
