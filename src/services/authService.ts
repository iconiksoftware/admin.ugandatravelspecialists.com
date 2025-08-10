import { SESSION_ID_KEY } from '../lib/constants';
import apiClient from '../lib/apiClient';
import type { ApiResponse, User } from '../lib/types';

interface LoginResponse {
  user: User;
  sessionId: string;
}

export async function loginWithPhoneNumberAndPassword(phoneNumber: string, password: string) {
  const axiosResponse = await apiClient.post<ApiResponse<LoginResponse>>('/auth/staff/login', {
    phoneNumber,
    password,
  });

  if (axiosResponse.status == 200) {
    const responseData = axiosResponse.data;

    if (responseData.success && responseData.payload) {
      const { user, sessionId } = responseData.payload;

      if (!user || !sessionId) {
        return {
          error: 'Login failed',
        };
      }

      localStorage.setItem(SESSION_ID_KEY, sessionId);

      return { user };
    } else {
      return { error: responseData.message || 'Login failed' };
    }
  } else {
    return { error: axiosResponse.data.message || 'Login failed' };
  }
}

export async function logout() {
  const axiosResponse = await apiClient.delete('/auth/logout');
  localStorage.removeItem(SESSION_ID_KEY);

  if (axiosResponse.status == 204) {
    return {};
  } else {
    return { error: axiosResponse.data.message || 'Logout failed' };
  }
}

export default {
  loginWithPhoneNumberAndPassword,
  logout,
};
