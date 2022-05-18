export const ActionTypes = {
  USER_SIGN_UP: "USER_SIGN_UP",
  USER_SIGN_UP_SUCCESS: "USER_SIGN_UP_SUCCESS",
  USER_SIGN_UP_FAILURE: "USER_SIGN_UP_FAILURE",

  USER_LOGIN: "USER_LOGIN",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAILURE: "USER_LOGIN_FAILURE",

  GET_FORGOT_PASSWORD_OTP: "GET_FORGOT_PASSWORD_OTP",
  GET_FORGOT_PASSWORD_OTP_SUCCESS: "GET_FORGOT_PASSWORD_OTP_SUCCESS",
  GET_FORGOT_PASSWORD_OTP_FAILURE: "GET_FORGOT_PASSWORD_OTP_FAILURE",

  VERIFY_FORGOT_PASSWORD_OTP: "VERIFY_FORGOT_PASSWORD_OTP",
  VERIFY_FORGOT_PASSWORD_OTP_SUCCESS: "VERIFY_FORGOT_PASSWORD_OTP_SUCCESS",
  VERIFY_FORGOT_PASSWORD_OTP_FAILURE: "VERIFY_FORGOT_PASSWORD_OTP_FAILURE",

  RESET_PASSWORD: "RESET_PASSWORD",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE",

  RESET_AUTH_STATUS: "RESET_AUTH_STATUS",

  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAILURE: "CHANGE_PASSWORD_FAILURE",

  GET_ACCOUNT_DETAILS: "GET_ACCOUNT_DETAILS",
  GET_ACCOUNT_DETAILS_SUCCESS: "GET_ACCOUNT_DETAILS_SUCCESS",
  GET_ACCOUNT_DETAILS_FAILURE: "GET_ACCOUNT_DETAILS_FAILURE",

  UPDATE_ACCOUNT_DETAILS: "UPDATE_ACCOUNT_DETAILS",
  UPDATE_ACCOUNT_DETAILS_SUCCESS: "UPDATE_ACCOUNT_DETAILS_SUCCESS",
  UPDATE_ACCOUNT_DETAILS_FAILURE: "UPDATE_ACCOUNT_DETAILS_FAILURE",

  GET_USER_COMPANY_DETAILS: "GET_USER_COMPANY_DETAILS",
  GET_USER_COMPANY_DETAILS_SUCCESS: "GET_USER_COMPANY_DETAILS_SUCCESS",
  GET_USER_COMPANY_DETAILS_FAILURE: "GET_USER_COMPANY_DETAILS_FAILURE",

  UPDATE_COMPANY_DETAILS: "UPDATE_COMPANY_DETAILS",
  UPDATE_COMPANY_DETAILS_SUCCESS: "UPDATE_COMPANY_DETAILS_SUCCESS",
  UPDATE_COMPANY_DETAILS_FAILURE: "UPDATE_COMPANY_DETAILS_FAILURE",

  RESET_ACCOUNT_STATUS: "RESET_ACCOUNT_STATUS",

  GET_EMISSION_LIST: "GET_EMISSION_LIST",
  GET_EMISSION_LIST_SUCCESS: "GET_EMISSION_LIST_SUCCESS",
  GET_EMISSION_LIST_FAILURE: "GET_EMISSION_LIST_FAILURE",
  CLEAR_EMISSION_LIST: "CLEAR_EMISSION_LIST",

  GET_EMISSION: "GET_EMISSION",
  GET_EMISSION_SUCCESS: "GET_EMISSION_SUCCESS",
  GET_EMISSION_FAILURE: "GET_EMISSION_FAILURE",

  GET_EMISSION_INPUT_FORMAT: "GET_EMISSION_INPUT_FORMAT",
  GET_EMISSION_INPUT_FORMAT_SUCCESS: "GET_EMISSION_INPUT_FORMAT_SUCCESS",
  GET_EMISSION_INPUT_FORMAT_FAILURE: "GET_EMISSION_INPUT_FORMAT_FAILURE",

  LIST_FACILITIES: "LIST_FACILITIES",
  LIST_FACILITIES_SUCCESS: "LIST_FACILITIES_SUCCESS",
  LIST_FACILITIES_FAILURE: "LIST_FACILITIES_FAILURE",

  GET_FACILITY: "GET_FACILITY",
  GET_FACILITY_SUCCESS: "GET_FACILITY_SUCCESS",
  GET_FACILITY_FAILURE: "GET_FACILITY_FAILURE",

  ADD_FACILITY: "ADD_FACILITY",
  ADD_FACILITY_SUCCESS: "ADD_FACILITY_SUCCESS",
  ADD_FACILITY_FAILURE: "ADD_FACILITY_FAILURE",

  EDIT_FACILITY: "EDIT_FACILITY",
  EDIT_FACILITY_SUCCESS: "EDIT_FACILITY_SUCCESS",
  EDIT_FACILITY_FAILURE: "EDIT_FACILITY_FAILURE",

  DELETE_FACILITY: "DELETE_FACILITY",
  DELETE_FACILITY_SUCCESS: "DELETE_FACILITY_SUCCESS",
  DELETE_FACILITY_FAILURE: "DELETE_FACILITY_FAILURE",

  RESET_ADD_FACILITY_STATUS: "RESET_ADD_FACILITY_STATUS",

  ADD_STATIONARY_COMBUSTION: "ADD_STATIONARY_COMBUSTION",
  ADD_STATIONARY_COMBUSTION_SUCCESS: "ADD_STATIONARY_COMBUSTION_SUCCESS",
  ADD_STATIONARY_COMBUSTION_FAILURE: "ADD_STATIONARY_COMBUSTION_FAILURE",

  ADD_PURCHASED_ELECTRICITY: "ADD_PURCHASED_ELECTRICITY",
  ADD_PURCHASED_ELECTRICITY_SUCCESS: "ADD_PURCHASED_ELECTRICITY_SUCCESS",
  ADD_PURCHASED_ELECTRICITY_FAILURE: "ADD_PURCHASED_ELECTRICITY_FAILURE",

  ADD_REFRIGERANTS: "ADD_REFRIGERANTS",
  ADD_REFRIGERANTS_SUCCESS: "ADD_REFRIGERANTS_SUCCESS",
  ADD_REFRIGERANTS_FAILURE: "ADD_REFRIGERANTS_FAILURE",

  UPDATE_REFRIGERANTS: "UPDATE_REFRIGERANTS",
  UPDATE_REFRIGERANTS_SUCCESS: "UPDATE_REFRIGERANTS_SUCCESS",
  UPDATE_REFRIGERANTS_FAILURE: "UPDATE_REFRIGERANTS_FAILURE",

  UPDATE_PURCHASED_ELECTRICITY: "UPDATE_PURCHASED_ELECTRICITY",
  UPDATE_PURCHASED_ELECTRICITY_SUCCESS: "UPDATE_PURCHASED_ELECTRICITY_SUCCESS",
  UPDATE_PURCHASED_ELECTRICITY_FAILURE: "UPDATE_PURCHASED_ELECTRICITY_FAILURE",

  UPDATE_STATIONARY_COMBUSTION: "UPDATE_STATIONARY_COMBUSTION",
  UPDATE_STATIONARY_COMBUSTION_SUCCESS: "UPDATE_STATIONARY_COMBUSTION_SUCCESS",
  UPDATE_STATIONARY_COMBUSTION_FAILURE: "UPDATE_STATIONARY_COMBUSTION_FAILURE",

  UPDATE_MOBILE_COMBUSTION: "UPDATE_MOBILE_COMBUSTION",
  UPDATE_MOBILE_COMBUSTION_SUCCESS: "UPDATE_MOBILE_COMBUSTION_SUCCESS",
  UPDATE_MOBILE_COMBUSTION_FAILURE: "UPDATE_MOBILE_COMBUSTION_FAILURE",

  UPDATE_WATER_DISCHARGE_COMBUSTION: "UPDATE_WATER_DISCHARGE_COMBUSTION",
  UPDATE_WATER_DISCHARGE_COMBUSTION_SUCCESS:
    "UPDATE_WATER_DISCHARGE_COMBUSTION_SUCCESS",
  UPDATE_WATER_DISCHARGE_COMBUSTION_FAILURE:
    "UPDATE_WATER_DISCHARGE_COMBUSTION_FAILURE",

  UPDATE_WATER_CONSUMPTION_COMBUSTION: "UPDATE_WATER_CONSUMPTION_COMBUSTION",
  UPDATE_WATER_CONSUMPTION_COMBUSTION_SUCCESS:
    "UPDATE_WATER_CONSUMPTION_COMBUSTION_SUCCESS",
  UPDATE_WATER_CONSUMPTION_COMBUSTION_FAILURE:
    "UPDATE_WATER_CONSUMPTION_COMBUSTION_FAILURE",

  UPDATE_WASTE_COMBUSTION: "UPDATE_WASTE_COMBUSTION",
  UPDATE_WASTE_COMBUSTION_SUCCESS: "UPDATE_WASTE_COMBUSTION_SUCCESS",
  UPDATE_WASTE_COMBUSTION_FAILURE: "UPDATE_WASTE_COMBUSTION_FAILURE",

  DELETE_EMISSIONS: "DELETE_EMISSIONS",
  DELETE_EMISSIONS_SUCCESS: "DELETE_EMISSIONS_SUCCESS",
  DELETE_EMISSIONS_FAILURE: "DELETE_EMISSIONS_FAILURE",

  ADD_MOBILE_COMBUSTION: "ADD_MOBILE_COMBUSTION",
  ADD_MOBILE_COMBUSTION_SUCCESS: "ADD_MOBILE_COMBUSTION_SUCCESS",
  ADD_MOBILE_COMBUSTION_FAILURE: "ADD_MOBILE_COMBUSTION_FAILURE",

  ADD_TRANSPORTATION_COMBUSTION: "ADD_TRANSPORTATION_COMBUSTION",
  ADD_TRANSPORTATION_COMBUSTION_SUCCESS:
    "ADD_TRANSPORTATION_COMBUSTION_SUCCESS",
  ADD_TRANSPORTATION_COMBUSTION_FAILURE:
    "ADD_TRANSPORTATION_COMBUSTION_FAILURE",

  EDIT_TRANSPORTATION_COMBUSTION: "EDIT_TRANSPORTATION_COMBUSTION",
  EDIT_TRANSPORTATION_COMBUSTION_SUCCESS:
    "EDIT_TRANSPORTATION_COMBUSTION_SUCCESS",
  EDIT_TRANSPORTATION_COMBUSTION_FAILURE:
    "EDIT_TRANSPORTATION_COMBUSTION_FAILURE",

  ADD_WATER_DISCHARGE_COMBUSTION: "ADD_WATER_DISCHARGE_COMBUSTION",
  ADD_WATER_DISCHARGE_COMBUSTION_SUCCESS:
    "ADD_WATER_DISCHARGE_COMBUSTION_SUCCESS",
  ADD_WATER_DISCHARGE_COMBUSTION_FAILURE:
    "ADD_WATER_DISCHARGE_COMBUSTION_FAILURE",

  ADD_WATER_CONSUMPTION_COMBUSTION: "ADD_WATER_CONSUMPTION_COMBUSTION",
  ADD_WATER_CONSUMPTION_COMBUSTION_SUCCESS:
    "ADD_WATER_CONSUMPTION_COMBUSTION_SUCCESS",
  ADD_WATER_CONSUMPTION_COMBUSTION_FAILURE:
    "ADD_WATER_CONSUMPTION_COMBUSTION_FAILURE",

  ADD_WASTE_COMBUSTION: "ADD_WASTE_COMBUSTION",
  ADD_WASTE_COMBUSTION_SUCCESS: "ADD_WASTE_COMBUSTION_SUCCESS",
  ADD_WASTE_COMBUSTION_FAILURE: "ADD_WASTE_COMBUSTION_FAILURE",

  RESET_ADD_COMBUSTION_STATUS: "RESET_ADD_COMBUSTION_STATUS",

  GET_EMISSION_FUEL_LIST: "GET_EMISSION_FUEL_LIST",
  GET_EMISSION_FUEL_LIST_SUCCESS: "GET_EMISSION_FUEL_LIST_SUCCESS",
  GET_EMISSION_FUEL_LIST_FAILURE: "GET_EMISSION_FUEL_LIST_FAILURE",

  GET_MOBILE_COMBUSTION_INPUTS: "GET_MOBILE_COMBUSTION_INPUTS",
  GET_MOBILE_COMBUSTION_INPUTS_SUCCESS: "GET_MOBILE_COMBUSTION_INPUTS_SUCCESS",
  GET_MOBILE_COMBUSTION_INPUTS_FAILURE: "GET_MOBILE_COMBUSTION_INPUTS_FAILURE",

  REFRESH_TOKEN: "REFRESH_TOKEN",
  REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS",
  REFRESH_TOKEN_FAILURE: "REFRESH_TOKEN_FAILURE",

  USER_LOGOUT: "USER_LOGOUT",
  USER_LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS",
  USER_LOGOUT_FAILURE: "USER_LOGOUT_FAILURE",

  GET_INDUSTRY_TYPES: "GET_INDUSTRY_TYPES",
  GET_INDUSTRY_TYPES_SUCCESS: "GET_INDUSTRY_TYPES_SUCCESS",
  GET_INDUSTRY_TYPES_FAILURE: "GET_INDUSTRY_TYPES_FAILURE",

  GET_COUNTRY_LIST: "GET_COUNTRY_LIST",
  GET_COUNTRY_LIST_SUCCESS: "GET_COUNTRY_LIST_SUCCESS",
  GET_COUNTRY_LIST_FAILURE: "GET_COUNTRY_LIST_FAILURE",

  LIST_GRID_REGIONS: "LIST_GRID_REGIONS",
  LIST_GRID_REGIONS_SUCCESS: "LIST_GRID_REGIONS_SUCCESS",
  LIST_GRID_REGIONS_FAILURE: "LIST_GRID_REGIONS_FAILURE",

  GET_EMISSION_YEAR: "GET_EMISSION_YEAR",
  GET_EMISSION_YEAR_SUCCESS: "GET_EMISSION_YEAR_SUCCESS",
  GET_EMISSION_YEAR_FAILURE: "GET_EMISSION_YEAR_FAILURE",

  GET_EMISSION_TYPES: "GET_EMISSION_TYPES",
  GET_EMISSION_TYPES_SUCCESS: "GET_EMISSION_TYPES_SUCCESS",
  GET_EMISSION_TYPES_FAILURE: "GET_EMISSION_TYPES_FAILURE",

  GET_EMISSION_REGION: "GET_EMISSION_REGION",
  GET_EMISSION_REGION_SUCCESS: "GET_EMISSION_REGION_SUCCESS",
  GET_EMISSION_REGION_FAILURE: "GET_EMISSION_REGION_FAILURE",

  GET_EMISSIONS_BY_MONTH: "GET_EMISSIONS_BY_MONTH",
  GET_EMISSIONS_BY_MONTH_SUCCESS: "GET_EMISSIONS_BY_MONTH_SUCCESS",
  GET_EMISSIONS_BY_MONTH_FAILURE: "GET_EMISSIONS_BY_MONTH_FAILURE",

  LIST_USERS: "LIST_USERS",
  LIST_USERS_SUCCESS: "LIST_USERS_SUCCESS",
  LIST_USERS_FAILURE: "LIST_USERS_FAILURE",

  GET_USER_DETAILS: "GET_USER_DETAILS",
  GET_USER_DETAILS_SUCCESS: "GET_USER_DETAILS_SUCCESS",
  GET_USER_DETAILS_FAILURE: "GET_USER_DETAILS_FAILURE",

  GET_MANAGER_LIST: "GET_MANAGER_LIST",
  GET_MANAGER_LIST_SUCCESS: "GET_MANAGER_LIST_SUCCESS",
  GET_MANAGER_LIST_FAILURE: "GET_MANAGER_LIST_FAILURE",

  ADD_USER: "ADD_USER",
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  ADD_USER_FAILURE: "ADD_USER_FAILURE",

  EDIT_USER: "EDIT_USER",
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILURE: "EDIT_USER_FAILURE",

  DELETE_USER: "DELETE_USER",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE: "DELETE_USER_FAILURE",

  RESET_USER_STATUS: "RESET_USER_STATUS",

  GET_COMPANY_LIST: "GET_COMPANY_LIST",
  GET_COMPANY_LIST_SUCCESS: "GET_COMPANY_LIST_SUCCESS",
  GET_COMPANY_LIST_FAILURE: "GET_COMPANY_LIST_FAILURE",

  GET_COMPANY_DETAILS: "GET_COMPANY_DETAILS",
  GET_COMPANY_DETAILS_SUCCESS: "GET_COMPANY_DETAILS_SUCCESS",
  GET_COMPANY_DETAILS_FAILURE: "GET_COMPANY_DETAILS_FAILURE",

  GET_COMPANY_AUDIT_HISTORY: "GET_COMPANY_AUDIT_HISTORY",
  GET_COMPANY_AUDIT_HISTORY_SUCCESS: "GET_COMPANY_AUDIT_HISTORY_SUCCESS",
  GET_COMPANY_AUDIT_HISTORY_FAILURE: "GET_COMPANY_AUDIT_HISTORY_FAILURE",

  GET_APPROVAL_SUMMARY: "GET_APPROVAL_SUMMARY",
  GET_APPROVAL_SUMMARY_SUCCESS: "GET_APPROVAL_SUMMARY_SUCCESS",
  GET_APPROVAL_SUMMARY_FAILURE: "GET_APPROVAL_SUMMARY_FAILURE",

  GET_APPROVAL_DETAILS: "GET_APPROVAL_DETAILS",
  GET_APPROVAL_DETAILS_SUCCESS: "GET_APPROVAL_DETAILS_SUCCESS",
  GET_APPROVAL_DETAILS_FAILURE: "GET_APPROVAL_DETAILS_FAILURE",

  GET_AUDIT_SUMMARY: "GET_AUDIT_SUMMARY",
  GET_AUDIT_SUMMARY_SUCCESS: "GET_AUDIT_SUMMARY_SUCCESS",
  GET_AUDIT_SUMMARY_FAILURE: "GET_AUDIT_SUMMARY_FAILURE",

  GET_YEARLY_AUDIT_SUMMARY: "GET_YEARLY_AUDIT_SUMMARY",
  GET_YEARLY_AUDIT_SUMMARY_SUCCESS: "GET_YEARLY_AUDIT_SUMMARY_SUCCESS",
  GET_YEARLY_AUDIT_SUMMARY_FAILURE: "GET_YEARLY_AUDIT_SUMMARY_FAILURE",

  REQUEST_AUDIT: "REQUEST_AUDIT",
  REQUEST_AUDIT_SUCCESS: "REQUEST_AUDIT_SUCCESS",
  REQUEST_AUDIT_FAILURE: "REQUEST_AUDIT_FAILURE",
  RESET_REQUEST_AUDIT_DATA: "RESET_REQUEST_AUDIT_DATA",

  GET_APPROVAL_MONTHLY_DETAILS: "GET_APPROVAL_MONTHLY_DETAILS",
  GET_APPROVAL_MONTHLY_DETAILS_SUCCESS: "GET_APPROVAL_MONTHLY_DETAILS_SUCCESS",
  GET_APPROVAL_MONTHLY_DETAILS_FAILURE: "GET_APPROVAL_MONTHLY_DETAILS_FAILURE",

  GET_APPROVAL_MONTHLY_SUMMARY: "GET_APPROVAL_MONTHLY_SUMMARY",
  GET_APPROVAL_MONTHLY_SUMMARY_SUCCESS: "GET_APPROVAL_MONTHLY_SUMMARY_SUCCESS",
  GET_APPROVAL_MONTHLY_SUMMARY_FAILURE: "GET_APPROVAL_MONTHLY_SUMMARY_FAILURE",

};
