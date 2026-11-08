import type { UpdateProfileData, UpdatePassword, SearchUser } from './types';
import type { User, ApiResult, ApiVoidResult } from '@/types';
import { HTTPTransport } from '@/core/http';
import { getErrorReason } from '@/api/helpers';

const userAPIInstance = new HTTPTransport('/api/v2/user');

class UserAPI {
  async updateProfile(data: UpdateProfileData): Promise<ApiResult<User>> {
    try {
      const updatedUser = (await userAPIInstance.put('/profile', { data })) as User;
      return { ok: true, data: updatedUser };
    } catch (e) {
      return { ok: false, reason: getErrorReason(e) };
    }
  }

  async updatePassword(data: UpdatePassword): Promise<ApiVoidResult> {
    try {
      await userAPIInstance.put('/password', { data });
      return { ok: true };
    } catch (e) {
      return { ok: false, reason: getErrorReason(e) };
    }
  }

  async searchUser(data: SearchUser): Promise<ApiResult<User>> {
    try {
      const users = (await userAPIInstance.post('/search', { data })) as User[];
      if (users.length === 0) {
        throw new Error('Пользователь не найден');
      }
      return { ok: true, data: users.at(0) as User };
    } catch (e) {
      return { ok: false, reason: getErrorReason(e) };
    }
  }

  async updateAvatar(formData: FormData): Promise<ApiResult<User>> {
    try {
      const user = (await userAPIInstance.put('/profile/avatar', { data: formData })) as User;
      return { ok: true, data: user };
    } catch (e) {
      return { ok: false, reason: getErrorReason(e) };
    }
  }
}

export const userAPI = new UserAPI();
