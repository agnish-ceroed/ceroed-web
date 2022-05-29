export const STATUS = {
  IDLE: "idle",
  RUNNING: "running",
  READY: "ready",
  SUCCESS: "success",
  ERROR: "error",
};

const API_BASE_URL = "https://ceroed-api-cd-development.azurewebsites.net";

export const APIEndpoints = {
  LOGIN: `${API_BASE_URL}/business/token`,
  SIGN_UP: `${API_BASE_URL}/business/signup`,
  LOGOUT: `${API_BASE_URL}/log_out`,
  CHANGE_PASSWORD: `${API_BASE_URL}/business/change_password`,

  GET_ACCOUNT_DETAILS: (role) => `${API_BASE_URL}/${role}/account/account-details`,
  UPDATE_ACCOUNT_DETAILS: (role) => `${API_BASE_URL}/${role}/account/update`,
  GET_USER_COMPANY_DETAILS: (role) => `${API_BASE_URL}/${role}/company/company-details`,
  UPDATE_COMPANY_DETAILS: `${API_BASE_URL}/business/company/company-details`,

  FORGOT_PASSWORD: `${API_BASE_URL}/business/forgot_password`,
  RESET_PASSWORD: `${API_BASE_URL}/business/reset_password`,

  GET_EMISSION_LIST: (emissionType) =>
    `${API_BASE_URL}/business/emissions/${emissionType}`,
  GET_EMISSION: (emissionType, emissionId) =>
    `${API_BASE_URL}/business/emissions/${emissionType}/${emissionId}`,
  GET_EMISSION_FUEL_LIST: (emissionType) =>
    `${API_BASE_URL}/business/emission-input-format/${emissionType}`,
  GET_EMISSION_INPUT_FORMAT: (emissionType) =>
    `${API_BASE_URL}/business/emission-input-format/${emissionType}`,

  LIST_FACILITIES: `${API_BASE_URL}/facilities/`,
  ADD_FACILITY: `${API_BASE_URL}/facilities/`,
  GET_FACILITY: (facilityId) => `${API_BASE_URL}/facilities/${facilityId}`,
  EDIT_FACILITY: (facilityId) => `${API_BASE_URL}/facilities/${facilityId}`,
  DELETE_FACILITY: (facilityId) => `${API_BASE_URL}/facilities/${facilityId}`,

  ADD_STATIONARY_COMBUSTION: `${API_BASE_URL}/business/emissions/stationary_combustion`,
  ADD_PURCHASED_ELECTRICITY: `${API_BASE_URL}/business/emissions/purchased_electricity`,
  ADD_REFRIGERANTS: `${API_BASE_URL}/business/emissions/refrigerants`,
  UPDATE_REFRIGERANTS: (emissionId) =>
    `${API_BASE_URL}/business/emissions/refrigerants/${emissionId}`,
  ADD_MOBILE_COMBUSTION: `${API_BASE_URL}/business/emissions/mobile_combustion`,
  ADD_TRANSPORTATION_COMBUSTION: `${API_BASE_URL}/business/emissions/transportation`,
  ADD_WATER_DISCHARGE: `${API_BASE_URL}/business/emissions/water_discharge`,
  ADD_WATER_CONSUMPTION: `${API_BASE_URL}/business/emissions/water_consumption`,
  ADD_WASTE_COMBUSTION: `${API_BASE_URL}/business/emissions/waste`,
  EDIT_TRANSPORTATION_COMBUSTION: (emissionId) =>
    `${API_BASE_URL}/business/emissions/transportation/${emissionId}`,
  UPDATE_PURCHASED_ELECTRICITY: (emissionId) =>
    `${API_BASE_URL}/business/emissions/purchased_electricity/${emissionId}`,
  UPDATE_STATIONARY_COMBUSTION: (emissionId) =>
    `${API_BASE_URL}/business/emissions/stationary_combustion/${emissionId}`,
  UPDATE_MOBILE_COMBUSTION: (emissionId) =>
    `${API_BASE_URL}/business/emissions/mobile_combustion/${emissionId}`,
  UPDATE_WATER_DISCHARGE_COMBUSTION: (emissionId) =>
    `${API_BASE_URL}/business/emissions/water_discharge/${emissionId}`,
  UPDATE_WATER_CONSUMPTION_COMBUSTION: (emissionId) =>
    `${API_BASE_URL}/business/emissions/water_consumption/${emissionId}`,
  UPDATE_WASTE_COMBUSTION: (emissionId) =>
    `${API_BASE_URL}/business/emissions/waste/${emissionId}`,
  DELETE_EMISSIONS: (emissionId) =>
    `${API_BASE_URL}/business/emissions/${emissionId}`,
  LIST_EMISSION_COMMENTS: (emissionId) =>
  `${API_BASE_URL}/business/comments/${emissionId}`,

  GET_INDUSTRY_TYPES: `${API_BASE_URL}/business/listings/industry_types`,
  GET_COUNTRY_LIST: `${API_BASE_URL}/business/listings/countries`,
  LIST_GRID_REGIONS: (countryId) =>
    `${API_BASE_URL}/business/listings/countries/${countryId}/grid_regions`,
  GET_MANAGER_LIST: (role, facility_id) =>
    `${API_BASE_URL}/business/users/get-managers/${role}${
      facility_id ? `/${facility_id}` : ""
    }`,
    LIST_ASSIGNEE: `${API_BASE_URL}/business/tickets/assignee-list`,

  GET_EMISSION_YEAR: `${API_BASE_URL}/business/graph/emission-year`,
  GET_EMISSION_TYPES: `${API_BASE_URL}/business/graph/emission-type`,
  GET_EMISSION_REGION: `${API_BASE_URL}/business/graph/emission_region`,
  GET_EMISSIONS_BY_MONTH: `${API_BASE_URL}/business/graph/emission-month`,

  LIST_USERS: `${API_BASE_URL}/business/users/`,
  ADD_USER: `${API_BASE_URL}/business/users/`,
  GET_USER: (userId) => `${API_BASE_URL}/business/users/${userId}`,
  EDIT_USER: (userId) => `${API_BASE_URL}/business/users/${userId}`,
  DELETE_USER: (userId) => `${API_BASE_URL}/business/users/${userId}`,

  AUDITOR_LOGIN: `${API_BASE_URL}/auditor/token`,
  FORGOT_AUDITOR_PASSWORD: `${API_BASE_URL}/auditor/forgot_password`,
  RESET_AUDITOR_PASSWORD: `${API_BASE_URL}/auditor/reset_password`,

  LIST_COMPANIES: `${API_BASE_URL}/auditor/companies`,
  GET_COMPANY_DETAILS: (companyId) =>
    `${API_BASE_URL}/auditor/company/${companyId}/company-details`,
  GET_COMPANY_AUDIT_HISTORY: (companyId) =>
    `${API_BASE_URL}/auditor/company/${companyId}/company-audit-history`,
  GET_COMPANY_AUDIT_DETAILS: (companyId) =>
  `${API_BASE_URL}/auditor/company/${companyId}/company-audit-summary`,
  APPROVE_COMPANY_AUDIT: (companyId, auditId) =>
  `${API_BASE_URL}/auditor/company/${companyId}/approve-audit-status/${auditId}`,

  GET_APPROVAL_SUMMARY: (year, facility) =>
    `${API_BASE_URL}/business/approval-statuses/${year}/${facility}`,
  GET_APPROVAL_DETAILS: (year, facility) =>
  `${API_BASE_URL}/business/approval-statuses-overview/${year}`,
  GET_APPROVAL_MONTHLY_DETAILS:
  `${API_BASE_URL}/business/monthly-approval-status-summary`,
  GET_APPROVAL_MONTHLY_SUMMARY:
  `${API_BASE_URL}/business/monthly-approval-status-summary-overview`,
  GET_DASHBOARD_STATISTICS:
  `${API_BASE_URL}/business/dashboard-statistics`,
  GET_AUDIT_SUMMARY: `${API_BASE_URL}/business/audit-statuses`,
  GET_DASHBOARD_SUMMARY: `${API_BASE_URL}/auditor/dashboard-summary`,

  GET_YEARLY_AUDIT_SUMMARY: (year) =>
  `${API_BASE_URL}/business/yearly-audit-status-summary?year=${year}`,

  REQUEST_AUDIT: (audit_status_id) =>
    `${API_BASE_URL}/business/yearly-audit-summary-assign-to-audit/${audit_status_id}`,

    SUBMIT_APPROVAL: (status_id) =>
    `${API_BASE_URL}/business/monthly-approval_summary-assign-to-submit/${status_id}`,

    REQUEST_APPROVAL: (status_id) =>
    `${API_BASE_URL}/business/monthly-approval_summary-assign-to-approve/${status_id}`,

    APPROVE_REQUEST: (status_id) =>
    `${API_BASE_URL}/business/monthly-approval-summary-approve/${status_id}`,

    CREATE_TICKET: `${API_BASE_URL}/business/tickets/`,
    LIST_TICKETS: (payload) =>
    `${API_BASE_URL}/business/tickets/?ticket_type=${payload.ticketType}&ticket_status=${payload.ticketStatus}&year=${payload.year}`,

    LIST_REPORTS: (year) =>
    `${API_BASE_URL}/business/reports/${year}`,
    GET_REPORT_DETAILS: (id) =>
    `${API_BASE_URL}/business/reports/${id}`,
};
