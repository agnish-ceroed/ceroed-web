export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error'
};

const API_BASE_URL = 'http://staging-ceroed-api.inventlabs.org';

export const APIEndpoints = {
  LOGIN: `${API_BASE_URL}/business/token`,
  SIGN_UP: `${API_BASE_URL}/business/signup`,
  LOGOUT: `${API_BASE_URL}/log_out`,
  CHANGE_USER_PASSWORD: `${API_BASE_URL}/change_password`,

  CHANGE_PASSWORD: `${API_BASE_URL}/forgot-password/change`,
  FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password`,
  VERIFY_OTP: `${API_BASE_URL}/forgot-password/verify`,

  GET_INDUSTRY_TYPES: `${API_BASE_URL}/business/listings/industry_types`,
  GET_COUNTRY_LIST: `${API_BASE_URL}/business/listings/countries`,
}
