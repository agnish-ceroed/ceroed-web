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

  GET_ACCOUNT_DETAILS: `${API_BASE_URL}/business/account/account-details`,
  UPDATE_ACCOUNT_DETAILS: `${API_BASE_URL}/business/account/update`,
  GET_COMPANY_DETAILS: `${API_BASE_URL}/business/company/company-details`,
  UPDATE_COMPANY_DETAILS: `${API_BASE_URL}/business/company/company-details`,

  FORGOT_PASSWORD: `${API_BASE_URL}/business/forgot_password`,
  RESET_PASSWORD: `${API_BASE_URL}/business/reset_password`,

  GET_EMISSION_LIST: emissionType => `${API_BASE_URL}/business/emissions/${emissionType}`,
  GET_EMISSION: (emissionType, emissionId) => `${API_BASE_URL}/business/emissions/${emissionType}/${emissionId}`,
  GET_EMISSION_FUEL_LIST: emissionType => `${API_BASE_URL}/business/emission-input-format/${emissionType}`,
  GET_EMISSION_INPUT_FORMAT: emissionType => `${API_BASE_URL}/business/emission-input-format/${emissionType}`,

  LIST_FACILITIES: `${API_BASE_URL}/facilities/`,
  ADD_FACILITY: `${API_BASE_URL}/facilities/`,
  GET_FACILITY: facilityId => `${API_BASE_URL}/facilities/${facilityId}`,
  EDIT_FACILITY: facilityId => `${API_BASE_URL}/facilities/${facilityId}`,
  DELETE_FACILITY: facilityId => `${API_BASE_URL}/facilities/${facilityId}`,

  ADD_STATIONARY_COMBUSTION: `${API_BASE_URL}/business/emissions/stationary_combustion`,
  ADD_PURCHASED_ELECTRICITY: `${API_BASE_URL}/business/emissions/purchased_electricity`,
  ADD_REFRIGERANTS: `${API_BASE_URL}/business/emissions/refrigerants`,
  ADD_MOBILE_COMBUSTION: `${API_BASE_URL}/business/emissions/mobile_combustion`,
  ADD_TRANSPORTATION_COMBUSTION: `${API_BASE_URL}/business/emissions/transportation`,
  ADD_WATER_DISCHARGE: `${API_BASE_URL}/business/emissions/water_discharge`,
  UPDATE_PURCHASED_ELECTRICITY: emissionId => `${API_BASE_URL}/business/emissions/purchased_electricity/${emissionId}`,
  UPDATE_STATIONARY_COMBUSTION: emissionId => `${API_BASE_URL}/business/emissions/stationary_combustion/${emissionId}`,
  UPDATE_MOBILE_COMBUSTION: emissionId => `${API_BASE_URL}/business/emissions/mobile_combustion/${emissionId}`,
  UPDATE_WATER_DISCHARGE_COMBUSTION: emissionId => `${API_BASE_URL}/business/emissions/water_discharge/${emissionId}`,
  DELETE_EMISSIONS: emissionId => `${API_BASE_URL}/business/emissions/${emissionId}`,

  GET_INDUSTRY_TYPES: `${API_BASE_URL}/business/listings/industry_types`,
  GET_COUNTRY_LIST: `${API_BASE_URL}/business/listings/countries`,

  GET_EMISSION_YEAR: `${API_BASE_URL}/business/graph/emission-year`,
  GET_EMISSION_TYPES: `${API_BASE_URL}/business/graph/emission-type`,
  GET_EMISSION_REGION: `${API_BASE_URL}/business/graph/emission_region`,

  LIST_USERS: `${API_BASE_URL}/business/users/`,
  ADD_USER: `${API_BASE_URL}/business/users/`,
  GET_USER: userId => `${API_BASE_URL}/business/users/${userId}`,
  EDIT_USER: userId => `${API_BASE_URL}/business/users/${userId}`,
  DELETE_USER: userId => `${API_BASE_URL}/business/users/${userId}`,
}
