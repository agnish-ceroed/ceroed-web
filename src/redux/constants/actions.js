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

  USER_INVITE_LOGIN: "USER_INVITE_LOGIN",
  USER_INVITE_LOGIN_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  USER_INVITE_LOGIN_FAILURE: "CHANGE_PASSWORD_FAILURE",

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

  LIST_EMISSION_AUDIT_TRAILS: "LIST_EMISSION_AUDIT_TRAILS",
  LIST_EMISSION_AUDIT_TRAILS_SUCCESS: "LIST_EMISSION_AUDIT_TRAILS_SUCCESS",
  LIST_EMISSION_AUDIT_TRAILS_FAILURE: "LIST_EMISSION_AUDIT_TRAILS_FAILURE",
  CLEAR_LIST_EMISSION_AUDIT_TRAILS: "CLEAR_LIST_EMISSION_AUDIT_TRAILS",

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

  LIST_ASSIGNEE: "LIST_ASSIGNEE",
  LIST_ASSIGNEE_SUCCESS: "LIST_ASSIGNEE_SUCCESS",
  LIST_ASSIGNEE_FAILURE: "LIST_ASSIGNEE_FAILURE",

  LIST_FRAMEWORK: "LIST_FRAMEWORK",
  LIST_FRAMEWORK_SUCCESS: "LIST_FRAMEWORK_SUCCESS",
  LIST_FRAMEWORK_FAILURE: "LIST_FRAMEWORK_FAILURE",

  LIST_TOPIC: "LIST_TOPIC",
  LIST_TOPIC_SUCCESS: "LIST_TOPIC_SUCCESS",
  LIST_TOPIC_FAILURE: "LIST_TOPIC_FAILURE",

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

  GET_YEARLY_AUDIT_SUMMARY_OVERVIEW: "GET_YEARLY_AUDIT_SUMMARY_OVERVIEW",
  GET_YEARLY_AUDIT_SUMMARY_OVERVIEW_SUCCESS: "GET_YEARLY_AUDIT_SUMMARY_OVERVIEW_SUCCESS",
  GET_YEARLY_AUDIT_SUMMARY_OVERVIEW_FAILURE: "GET_YEARLY_AUDIT_SUMMARY_OVERVIEW_FAILURE",

  REQUEST_AUDIT: "REQUEST_AUDIT",
  REQUEST_AUDIT_SUCCESS: "REQUEST_AUDIT_SUCCESS",
  REQUEST_AUDIT_FAILURE: "REQUEST_AUDIT_FAILURE",
  RESET_REQUEST_AUDIT_DATA: "RESET_REQUEST_AUDIT_DATA",

  ANSWER_QUALITATIVE_QUESTION: "ANSWER_QUALITATIVE_QUESTION",
  ANSWER_QUALITATIVE_QUESTION_SUCCESS: "ANSWER_QUALITATIVE_QUESTION_SUCCESS",
  ANSWER_QUALITATIVE_QUESTION_FAILURE: "ANSWER_QUALITATIVE_QUESTION_FAILURE",

  RESET_QUESTION_ANSWER_STATUS: "RESET_QUESTION_ANSWER_STATUS",

  GET_ALL_QUESTIONS: "GET_ALL_QUESTIONS",
  GET_ALL_QUESTIONS_SUCCESS: "GET_ALL_QUESTIONS_SUCCESS",
  GET_ALL_QUESTIONS_FAILURE: "GET_ALL_QUESTIONS_FAILURE",

  GET_APPROVAL_MONTHLY_DETAILS: "GET_APPROVAL_MONTHLY_DETAILS",
  GET_APPROVAL_MONTHLY_DETAILS_SUCCESS: "GET_APPROVAL_MONTHLY_DETAILS_SUCCESS",
  GET_APPROVAL_MONTHLY_DETAILS_FAILURE: "GET_APPROVAL_MONTHLY_DETAILS_FAILURE",

  GET_APPROVAL_MONTHLY_SUMMARY: "GET_APPROVAL_MONTHLY_SUMMARY",
  GET_APPROVAL_MONTHLY_SUMMARY_SUCCESS: "GET_APPROVAL_MONTHLY_SUMMARY_SUCCESS",
  GET_APPROVAL_MONTHLY_SUMMARY_FAILURE: "GET_APPROVAL_MONTHLY_SUMMARY_FAILURE",

  GET_COMPANY_AUDIT_DETAILS: "GET_COMPANY_AUDIT_DETAILS",
  GET_COMPANY_AUDIT_DETAILS_SUCCESS: "GET_COMPANY_AUDIT_DETAILS_SUCCESS",
  GET_COMPANY_AUDIT_DETAILS_FAILURE: "GET_COMPANY_AUDIT_DETAILS_FAILURE",

  APPROVE_COMPANY_AUDIT: "APPROVE_COMPANY_AUDIT",
  APPROVE_COMPANY_AUDIT_SUCCESS: "APPROVE_COMPANY_AUDIT_SUCCESS",
  APPROVE_COMPANY_AUDIT_FAILURE: "APPROVE_COMPANY_AUDIT_FAILURE",
  APPROVE_COMPANY_AUDIT_RESET: "APPROVE_COMPANY_AUDIT_RESET",

  GET_DASHBOARD_SUMMARY: "GET_DASHBOARD_SUMMARY",
  GET_DASHBOARD_SUMMARY_SUCCESS: "GET_DASHBOARD_SUMMARY_SUCCESS",
  GET_DASHBOARD_SUMMARY_FAILURE: "GET_DASHBOARD_SUMMARY_FAILURE",

  GET_DASHBOARD_STATISTICS: "GET_DASHBOARD_STATISTICS",
  GET_DASHBOARD_STATISTICS_SUCCESS: "GET_DASHBOARD_STATISTICS_SUCCESS",
  GET_DASHBOARD_STATISTICS_FAILURE: "GET_DASHBOARD_STATISTICS_FAILURE",

  SUBMIT_APPROVAL: "SUBMIT_APPROVAL",
  SUBMIT_APPROVAL_SUCCESS: "SUBMIT_APPROVAL_SUCCESS",
  SUBMIT_APPROVAL_FAILURE: "SUBMIT_APPROVAL_FAILURE",

  REQUEST_APPROVAL: "REQUEST_APPROVAL",
  REQUEST_APPROVAL_SUCCESS: "REQUEST_APPROVAL_SUCCESS",
  REQUEST_APPROVAL_FAILURE: "REQUEST_APPROVAL_FAILURE",

  APPROVE_REQUEST: "APPROVE_REQUEST",
  APPROVE_REQUEST_SUCCESS: "APPROVE_REQUEST_SUCCESS",
  APPROVE_REQUEST_FAILURE: "APPROVE_REQUEST_FAILURE",

  RESET_APPROVAL_DATA: "RESET_APPROVAL_DATA",

  CREATE_TICKET: "CREATE_TICKET",
  CREATE_TICKET_SUCCESS: "CREATE_TICKET_SUCCESS",
  CREATE_TICKET_FAILURE: "CREATE_TICKET_FAILURE",

  CLOSE_TICKET: "CLOSE_TICKET",
  CLOSE_TICKET_SUCCESS: "CLOSE_TICKET_SUCCESS",
  CLOSE_TICKET_FAILURE: "CLOSE_TICKET_FAILURE",

  DELETE_TICKET: "DELETE_TICKET",
  DELETE_TICKET_SUCCESS: "DELETE_TICKET_SUCCESS",
  DELETE_TICKET_FAILURE: "DELETE_TICKET_FAILURE",

  LIST_TICKETS: "LIST_TICKETS",
  LIST_TICKETS_SUCCESS: "LIST_TICKETS_SUCCESS",
  LIST_TICKETS_FAILURE: "LIST_TICKETS_FAILURE",

  LIST_SCOPE_TICKETS: "LIST_SCOPE_TICKETS",
  LIST_SCOPE_TICKETS_SUCCESS: "LIST_SCOPE_TICKETS_SUCCESS",
  LIST_SCOPE_TICKETS_FAILURE: "LIST_SCOPE_TICKETS_FAILURE",
  RESET_LIST_SCOPE_TICKETS: "RESET_LIST_SCOPE_TICKETS",

  GET_TICKET_DETAILS: "GET_TICKET_DETAILS",
  GET_TICKET_DETAILS_SUCCESS: "GET_TICKET_DETAILS_SUCCESS",
  GET_TICKET_DETAILS_FAILURE: "GET_TICKET_DETAILS_FAILURE",

  ADD_RESPONSE: "ADD_RESPONSE",
  ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
  ADD_COMMENT_FAILURE: "ADD_COMMENT_FAILURE",

  RESET_TICKET_STATUS: "RESET_TICKET_STATUS",

  GET_ALL_REPORTS: "GET_ALL_REPORTS",
  GET_ALL_REPORTS_SUCCESS: "GET_ALL_REPORTS_SUCCESS",
  GET_ALL_REPORTS_FAILURE: "GET_ALL_REPORTS_FAILURE",

  GET_REPORT_DETAILS: "GET_REPORT_DETAILS",
  GET_REPORT_DETAILS_SUCCESS: "GET_REPORT_DETAILS_SUCCESS",
  GET_REPORT_DETAILS_FAILURE: "GET_REPORT_DETAILS_FAILURE",

  DELETE_REPORT: "DELETE_REPORT",
  DELETE_REPORT_SUCCESS: "DELETE_REPORT_SUCCESS",
  DELETE_REPORT_FAILURE: "DELETE_REPORT_FAILURE",

  CREATE_REPORT: "CREATE_REPORT",
  CREATE_REPORT_SUCCESS: "CREATE_REPORT_SUCCESS",
  CREATE_REPORT_FAILURE: "CREATE_REPORT_FAILURE",

  UPDATE_REPORT: "UPDATE_REPORT",
  UPDATE_REPORT_SUCCESS: "UPDATE_REPORT_SUCCESS",
  UPDATE_REPORT_FAILURE: "UPDATE_REPORT_FAILURE",

  RESET_REPORT_STATUS: "RESET_REPORT_STATUS",

  LIST_EMISSION_COMMENTS: "LIST_EMISSION_COMMENTS",
  LIST_EMISSION_COMMENTS_SUCCESS: "LIST_EMISSION_COMMENTS_SUCCESS",
  LIST_EMISSION_COMMENTS_FAILURE: "LIST_EMISSION_COMMENTS_FAILURE",
  RESET_LIST_EMISSION_COMMENTS: "RESET_LIST_EMISSION_COMMENTS",

  ADD_EMISSION_COMMENT: "ADD_EMISSION_COMMENT",
  ADD_EMISSION_COMMENT_SUCCESS: "ADD_EMISSION_COMMENT_SUCCESS",
  ADD_EMISSION_COMMENT_FAILURE: "ADD_EMISSION_COMMENT_FAILURE",
  CLEAR_ADD_EMISSION_COMMENT: "CLEAR_ADD_EMISSION_COMMENT",

  LIST_EMISSION_FILES: "LIST_EMISSION_FILES",
  LIST_EMISSION_FILES_SUCCESS: "LIST_EMISSION_FILES_SUCCESS",
  LIST_EMISSION_FILES_FAILURE: "LIST_EMISSION_FILES_FAILURE",
  CLEAR_LIST_EMISSION_FILES: "CLEAR_LIST_EMISSION_FILES",

  UPLOAD_EMISSION_ATTACHEMENT: "UPLOAD_EMISSION_ATTACHEMENT",
  UPLOAD_EMISSION_ATTACHEMENT_SUCCESS: "UPLOAD_EMISSION_ATTACHEMENT_SUCCESS",
  UPLOAD_EMISSION_ATTACHEMENT_FAILURE: "UPLOAD_EMISSION_ATTACHEMENT_FAILURE",
  CLEAR_UPLOAD_EMISSION_ATTACHEMENT: "CLEAR_UPLOAD_EMISSION_ATTACHEMENT",

  DELETE_EMISSION_ATTACHEMENT: "DELETE_EMISSION_ATTACHEMENT",
  DELETE_EMISSION_ATTACHEMENT_SUCCESS: "DELETE_EMISSION_ATTACHEMENT_SUCCESS",
  DELETE_EMISSION_ATTACHEMENT_FAILURE: "DELETE_EMISSION_ATTACHEMENT_FAILURE",
  CLEAR_DELETE_EMISSION_ATTACHEMENT: "CLEAR_DELETE_EMISSION_ATTACHEMENT",

  GET_FACILITY_TOPIC_EMISSION: "GET_FACILITY_TOPIC_EMISSION",
  GET_FACILITY_TOPIC_EMISSION_SUCCESS: "GET_FACILITY_TOPIC_EMISSION_SUCCESS",
  GET_FACILITY_TOPIC_EMISSION_FAILURE: "GET_FACILITY_TOPIC_EMISSION_FAILURE",

  GET_FUEL_SOURCE_EMISSION: "GET_FUEL_SOURCE_EMISSION",
  GET_FUEL_SOURCE_EMISSION_SUCCESS: "GET_FUEL_SOURCE_EMISSION_SUCCESS",
  GET_FUEL_SOURCE_EMISSION_FAILURE: "GET_FUEL_SOURCE_EMISSION_FAILURE",

  LIST_NOTIFICATIONS: "LIST_NOTIFICATIONS",
  LIST_NOTIFICATIONS_SUCCESS: "LIST_NOTIFICATIONS_SUCCESS",
  LIST_NOTIFICATIONS_FAILURE: "LIST_NOTIFICATIONS_FAILURE",

  MARK_ALL_READ: "MARK_ALL_READ",
  MARK_ALL_READ_SUCCESS: "MARK_ALL_READ_SUCCESS",
  MARK_ALL_READ_FAILURE: "MARK_ALL_READ_FAILURE",

  MARK_AS_READ: "MARK_AS_READ",
  MARK_AS_READ_SUCCESS: "MARK_AS_READ_SUCCESS",
  MARK_AS_READ_FAILURE: "MARK_AS_READ_FAILURE",

  SET_EMAIL_CONFIRMED: "SET_EMAIL_CONFIRMED",
  SET_EMAIL_CONFIRMED_SUCCESS: "SET_EMAIL_CONFIRMED_SUCCESS",
  SET_EMAIL_CONFIRMED_FAILURE: "SET_EMAIL_CONFIRMED_FAILURE",
  CLEAR_EMAIL_CONFIRMED_FAILURE: "CLEAR_EMAIL_CONFIRMED_FAILURE",

  GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW: "GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW",
  GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW_SUCCESS: "GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW_SUCCESS",
  GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW_FAILURE: "GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW_FAILURE",

};
