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
  CHANGE_PASSWORD: `${API_BASE_URL}/business/change_password`,
    
  FORGOT_PASSWORD: `${API_BASE_URL}/business/forgot_password`,
  RESET_PASSWORD: `${API_BASE_URL}/business/reset_password`,

  GET_EMISSION_LIST: emissionType => `${API_BASE_URL}/business/emissions/${emissionType}`,
  GET_EMISSION_INPUT_FORMAT: emissionType => `${API_BASE_URL}/business/emission-input-format/${emissionType}`,

  LIST_FACILITIES: `${API_BASE_URL}/facilities/`,

  ADD_STATIONARY_COMBUSTION: `${API_BASE_URL}/business/emissions/stationary_combustion`,
  ADD_PURCHASED_ELECTRICITY: `${API_BASE_URL}/business/emissions/purchased_electricity`,
  ADD_MOBILE_COMBUSTION: `${API_BASE_URL}/business/emissions/mobile_combustion`,
  ADD_TRANSPORTATION_COMBUSTION: `${API_BASE_URL}/business/emissions/transportation`,

  GET_INDUSTRY_TYPES: `${API_BASE_URL}/business/listings/industry_types`,
  GET_COUNTRY_LIST: `${API_BASE_URL}/business/listings/countries`,
  
  GET_EMISSION_YEAR: `${API_BASE_URL}/business/graph/emission-year`,
  GET_EMISSION_TYPES: `${API_BASE_URL}/business/graph/emission-type`,
  GET_EMISSION_REGION: `${API_BASE_URL}/business/graph/emission_region`,
}
