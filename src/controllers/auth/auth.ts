import { authAPI } from '@/api/auth';
import type { SignInData, SignUpData } from '@/api/auth/types';
import { userController } from '@/controllers/user';

class AuthController {
  async getAuthStatus() {
    return await userController.fetchUser();
  }

  async signIn(data: SignInData) {
    const result = await authAPI.signIn(data);

    if (!result.ok) {
      return result;
    }

    return userController.fetchUser();
  }

  async signUp(data: SignUpData) {
    const result = await authAPI.signUp(data);

    if (!result.ok) {
      return result;
    }

    return userController.fetchUser();
  }

  async logout() {
    const result = await authAPI.logout();

    if (result.ok) {
      userController.clearState();
    }

    return result;
  }
}

export const authController = new AuthController();
