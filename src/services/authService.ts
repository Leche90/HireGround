import api from './api';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

interface PasswordResetResponse {
  // Expected response shape for password reset
  success: boolean;
  message?: string;
}

export default {
  login: (credentials: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', credentials).then((res: { data: AuthResponse }) => res.data),

  signup: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/signup', data).then((res: { data: AuthResponse }) => res.data),

  requestPasswordReset: (email: string) =>
    api.post<PasswordResetResponse>('/auth/request-password-reset', { email }).then((res: { data: PasswordResetResponse }) => res.data),

  resetPassword: (data: { token: string; newPassword: string }) =>
    api.post<PasswordResetResponse>('/auth/reset-password', data).then((res: { data: PasswordResetResponse }) => res.data),
};