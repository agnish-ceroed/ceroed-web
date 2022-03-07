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
  CHANGE_PASSWORD: `${API_BASE_URL}/forgot-password/change`,

    
  FORGOT_PASSWORD: `${API_BASE_URL}/business/forgot_password`,
  RESET_PASSWORD: `${API_BASE_URL}/business/reset_password`,

  GET_EMISSION_LIST: emissionType => `${API_BASE_URL}/business/emissions/${emissionType}`,

  LIST_FACILITIES: `${API_BASE_URL}/facilities/`,

  ADD_STATIONARY_COMBUSTION: `${API_BASE_URL}/business/emissions/stationary_combustion`,
  ADD_MOBILE_COMBUSTION: `${API_BASE_URL}/business/emissions/mobile_combustion`,

  GET_INDUSTRY_TYPES: `${API_BASE_URL}/business/listings/industry_types`,
  GET_COUNTRY_LIST: `${API_BASE_URL}/business/listings/countries`,
}
