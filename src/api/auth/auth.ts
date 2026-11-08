import type { SignInData, SignUpData } from './types';
import type { User, ApiResult, ApiVoidResult } from '@/types';
import { HTTPTransport } from '@/core/http';
import { getErrorReason } from '@/api/helpers';

const authAPIInstance = new HTTPTransport('/api/v2/auth');

class AuthAPI {
  async getUserInfo(): Promise<ApiResult<User>> {
    try {
      const user = (await authAPIInstance.get('/user')) as User;
      return { ok: true, data: user };
    } catch (e) {
      return { ok: false, reason: getErrorReason(e) };
    }
  }

  async signIn(data: SignInData): Promise<ApiVoidResult> {
    try {
      await authAPIInstance.post('/signin', {
        data,
      });
      return { ok: true };
    } catch (e) {
      return { ok: false, reason: getErrorReason(e) };
    }
  }

  async signUp(data: SignUpData): Promise<ApiResult<{ id: number }>> {
    try {
      const newUser = (await authAPIInstance.post('/signup', {
        data,
      })) as { id: number };
      return { ok: true, data: newUser };
    } catch (e) {
      return { ok: false, reason: getErrorReason(e) };
    }
  }

  async logout(): Promise<ApiVoidResult> {
    try {
      await authAPIInstance.post('/logout');
      return { ok: true };
    } catch (e) {
      return { ok: false, reason: getErrorReason(e) };
    }
  }
}

export const authAPI = new AuthAPI();
