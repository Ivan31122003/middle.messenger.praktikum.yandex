import { store } from '@/core/store';
import { authAPI } from '@/api/auth';
import { userAPI } from '@/api/user';
import type { User } from '@/types';
import type { UpdateProfileData, UpdatePassword, SearchUser } from '@/api/user';

class UserController {
  getUser(): User | null {
    return (store.getState().user as User) ?? null;
  }

  subscribe(listener: () => void): () => void {
    return store.subscribe(listener);
  }

  clearState(): void {
    store.clear();
  }

  async fetchUser() {
    const result = await authAPI.getUserInfo();

    if (result.ok) {
      store.setState('user', result.data);
    }

    return result;
  }

  async updateData(data: UpdateProfileData) {
    const result = await userAPI.updateProfile(data);

    if (result.ok) {
      store.setState('user', result.data);
    }

    return result;
  }

  async updatePassword(data: UpdatePassword) {
    return await userAPI.updatePassword(data);
  }

  async searchUser(data: SearchUser) {
    return await userAPI.searchUser(data);
  }
}

export const userController = new UserController();
