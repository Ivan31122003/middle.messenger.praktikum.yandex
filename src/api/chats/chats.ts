import type { Chat } from '@/types';
import type { CreateChat } from './types';
import { HTTPTransport } from '@/core/http';
import type { ApiResult } from '@/types';
import { getErrorReason } from '@/api/helpers';

const chatsAPIInstance = new HTTPTransport('/api/v2/chats');

class ChatsAPI {
  async getChats(): Promise<ApiResult<Chat[]>> {
    try {
      const chats = (await chatsAPIInstance.get('')) as Chat[];
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
      const newChat = (await chatsAPIInstance.post('', { data })) as { id: number };
      return { ok: true, data: newChat };
    } catch (e) {
      return {
        ok: false,
        reason: getErrorReason(e),
      };
    }
  }
}

export const chatsAPI = new ChatsAPI();
