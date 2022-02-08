export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error'
};

const API_BASE_URL = 'https://api-shop.shopsapp.org/admin';

export const APIEndpoints = {
  LOGIN: `${API_BASE_URL}/login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password`,
  VERIFY_OTP: `${API_BASE_URL}/forgot-password/verify`,
  SIGN_UP: `${API_BASE_URL}/signup`
}
