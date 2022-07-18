export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error'
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://ceroed-api-cd.azurewebsites.net';

export const APIEndpoints = {
  LOGIN: `${API_BASE_URL}/business/token`,
  SIGN_UP: `${API_BASE_URL}/business/signup`,
  LOGOUT: `${API_BASE_URL}/log_out`,
  CHANGE_PASSWORD: `${API_BASE_URL}/business/change_password`,
  SET_EMAIL_CONFIRMED: (userId, code) =>
    `${API_BASE_URL}/business/confirm-email/${userId}/${code}`,
  USER_INVITE_LOGIN: `${API_BASE_URL}/business/set-password`,

  GET_ACCOUNT_DETAILS: (role) =>
    `${API_BASE_URL}/${role}/account/account-details`,
  UPDATE_ACCOUNT_DETAILS: (role) => `${API_BASE_URL}/${role}/account/update`,
  GET_USER_COMPANY_DETAILS: (role) =>
    `${API_BASE_URL}/${role}/company/company-details`,
  UPDATE_COMPANY_DETAILS: `${API_BASE_URL}/business/company/company-details`,

  FORGOT_PASSWORD: `${API_BASE_URL}/business/forgot_password`,
  RESET_PASSWORD: `${API_BASE_URL}/business/reset_password`,

  GET_EMISSION_LIST: (emissionType) =>
    `${API_BASE_URL}/business/emissions/${emissionType}`,
  GET_AUDITOR_EMISSION_LIST: (emissionType, company) =>
    `${API_BASE_URL}/auditor/company/${company}/emissions/${emissionType}`,
  GET_EMISSION: (emissionType, emissionId) =>
    `${API_BASE_URL}/business/emissions/${emissionType}/${emissionId}`,
  GET_AUDITOR_EMISSION: (emissionType, emissionId, company) =>
    `${API_BASE_URL}/auditor/company/${company}/emissions/${emissionType}/${emissionId}`,
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
  ADD_DEVELOPMET_TRAINING_DETAILS: `${API_BASE_URL}/business/emissions/development-training`,
  ADD_EMPLOYEE_HEALTH_DETAILS: `${API_BASE_URL}/business/emissions/employee_health_safety_incident_record`,
  ADD_WORKER_SAFETY_TRAINING: `${API_BASE_URL}/business/emissions/worker_safety_training_procedures`,
  ADD_DESCRIMINATION_INCIDENT_RECORD: `${API_BASE_URL}/business/emissions/discrimination-incident-record`,
  ADD_SUPPLIER_HUMAN_RIGHTS_TRAINING: `${API_BASE_URL}/business/emissions/operational-human-rights-training`,
  ADD_SOCIAL_HUMAN_RIGHTS_TRAINING: `${API_BASE_URL}/business/emissions/social-engagement-human-rights-training`,
  ADD_SUPPLIER_SCREENING: `${API_BASE_URL}/business/emissions/supplier-screening`,
  ADD_LOCAL_COMMUNITIES: `${API_BASE_URL}/business/emissions/local-communities`,
  ADD_POLITICAL_CONTRIBUTION: `${API_BASE_URL}/business/emissions/political-contributions`,
  ADD_ANTI_CORRUPTION_DISCLOSURE: `${API_BASE_URL}/business/emissions/anti-corruption-disclosure`,
  ADD_ANTI_CORRUPTION_TRAINING: `${API_BASE_URL}/business/emissions/anti-corruption-training`,
  ADD_ANTI_COMPETITIVE_DISCLOSURE: `${API_BASE_URL}/business/emissions/anti-competitive-disclosure`,
  ADD_SUBSIDIES_FINANCIAL_ASSISTANCE: `${API_BASE_URL}/business/emissions/subsidies-financial-assistance`,
  ADD_EMPLOYEES_TURNOVER: `${API_BASE_URL}/business/emissions/employees-turnover`,
  ADD_AGE_BASED_STATISTICS: `${API_BASE_URL}/business/emissions/age-based-statistics`,
  ADD_GENDER_BASED_STATISTICS: `${API_BASE_URL}/business/emissions/gender-based-statistics`,
  ADD_BOARD_DIVERSITY: `${API_BASE_URL}/business/emissions/board-diversity`,
  ADD_MANAGEMENT_DIVERSITY: `${API_BASE_URL}/business/emissions/management-diversity`,
  ADD_TAX: `${API_BASE_URL}/business/emissions/tax`,
  UPDATE_NON_EMISSION_DETAILS: (emissionId, emissionType) => `${API_BASE_URL}/business/emissions/${emissionType}/${emissionId}`,
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
  LIST_AUDITOR_EMISSION_COMMENTS: (emissionId, company) =>
    `${API_BASE_URL}/auditor/company/${company}/emissions/comments/${emissionId}`,
  ADD_EMISSION_COMMENT: (emissionId) =>
    `${API_BASE_URL}/business/comment/${emissionId}`,
  LIST_EMISSION_AUDIT_TRAILS: (emissionId) =>
    `${API_BASE_URL}/business/audit-trails/${emissionId}`,
  LIST_AUDITOR_EMISSION_AUDIT_TRAILS: (emissionId, company) =>
    `${API_BASE_URL}/auditor/company/${company}/audit-trails/${emissionId}`,
  LIST_EMISSION_FILES: (emissionId) =>
    `${API_BASE_URL}/business/attachment/${emissionId}`,
  LIST_AUDITOR_EMISSION_FILES: (emissionId, company) =>
    `${API_BASE_URL}/auditor/company/${company}/emissions/attachments/${emissionId}`,
  UPLOAD_EMISSION_ATTACHEMENT: (emissionId) =>
    `${API_BASE_URL}/business/attachment/${emissionId}`,
  DELETE_EMISSION_ATTACHEMENT: (emissionId, attachementId) =>
    `${API_BASE_URL}/business/attachment/${emissionId}/${attachementId}`,

  GET_INDUSTRY_TYPES: `${API_BASE_URL}/business/listings/industry_types`,
  GET_COUNTRY_LIST: `${API_BASE_URL}/business/listings/countries`,
  LIST_GRID_REGIONS: (countryId) =>
    `${API_BASE_URL}/business/listings/countries/${countryId}/grid_regions`,
  GET_MANAGER_LIST: (role) =>
    `${API_BASE_URL}/business/users/get-managers/${role}`,

  LIST_ASSIGNEE: `${API_BASE_URL}/business/tickets/assignee-list`,
  LIST_FRAMEWORK: `${API_BASE_URL}/business/reports/list-frameworks`,
  LIST_TOPIC: `${API_BASE_URL}/business/reports/list-topics`,

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
    `${API_BASE_URL}/business/approval-status-overview/${year}`,
  GET_APPROVAL_MONTHLY_DETAILS: `${API_BASE_URL}/business/monthly-approval-status-summary`,
  GET_APPROVAL_MONTHLY_SUMMARY: `${API_BASE_URL}/business/monthly-approval-status-summary-overview`,
  GET_DASHBOARD_STATISTICS: `${API_BASE_URL}/business/dashboard-statistics`,
  GET_AUDIT_SUMMARY: `${API_BASE_URL}/business/audit-statuses`,
  GET_FACILITY_TOPIC_EMISSION: `${API_BASE_URL}/business/graph/facilities-drill-down-emission-details`,
  GET_DASHBOARD_SUMMARY: `${API_BASE_URL}/auditor/dashboard-summary`,
  GET_FUEL_SOURCE_EMISSION: `${API_BASE_URL}/business/graph/fuel-sources-target-sankey`,
  MARK_ALL_READ_AUDITOR_NOTIFICATIONS: `${API_BASE_URL}/auditor/notifications/mark-all-read`,
  MARK_ALL_READ: `${API_BASE_URL}/business/notifications/mark-all-read`,
  MARK_AS_READ_AUDITOR_NOTIFICATIONS: (id) =>
    `${API_BASE_URL}/auditor/notifications/mark-read/${id}`,
  MARK_AS_READ: (id) =>
    `${API_BASE_URL}/business/notifications/mark-read/${id}`,
  LIST_NOTIFICATIONS: (unread = true) =>
    `${API_BASE_URL}/business/notifications?unread=${unread}`,
  LIST_AUDITOR_NOTIFICATIONS: (unread = true) =>
    `${API_BASE_URL}/auditor/notifications?unread=${unread}`,

  GET_YEARLY_AUDIT_SUMMARY: (year) =>
    `${API_BASE_URL}/business/yearly-audit-status-summary?year=${year}`,
  GET_YEARLY_AUDIT_SUMMARY_OVERVIEW: (year) =>
    `${API_BASE_URL}/business/yearly-audit-status-summary-overview?year=${year}`,
  GET_ALL_QUESTIONS: (payload) =>
    `${API_BASE_URL}/business/audit-qualitative-questionnaires?audit_status_id=${payload.id}`,
  GET_ALL_AUDITOR_QUESTIONS: (payload) =>
    `${API_BASE_URL}/auditor/company/${payload.company}/audit-qualitative-questionnaires?audit_status_id=${payload.id}`,
  GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW: (companyId) =>
    `${API_BASE_URL}/auditor/company/${companyId}/yearly-audit-status-summary-overview`,
  GET_AUDIT_SUMMARY_BY_ID: (id) =>
    `${API_BASE_URL}/business/yearly-audit-status-summary?audit_status_id=${id}`,

  REQUEST_AUDIT: (audit_status_id) =>
    `${API_BASE_URL}/business/yearly-audit-summary-assign-to-audit/${audit_status_id}`,

  ANSWER_QUALITATIVE_QUESTION: (audit_status_id) =>
    `${API_BASE_URL}/business/audit-qualitative-qa-data/${audit_status_id}`,

  SUBMIT_APPROVAL: (status_id) =>
    `${API_BASE_URL}/business/monthly-approval_summary-assign-to-submit/${status_id}`,

  REQUEST_APPROVAL: (status_id) =>
    `${API_BASE_URL}/business/monthly-approval_summary-assign-to-approve/${status_id}`,

  APPROVE_REQUEST: (status_id) =>
    `${API_BASE_URL}/business/monthly-approval-summary-approve/${status_id}`,

  CREATE_TICKET: `${API_BASE_URL}/business/tickets/`,
  LIST_TICKETS: (payload) =>
    `${API_BASE_URL}/business/tickets/?ticket_type=${payload.ticketType}&ticket_status=${payload.ticketStatus}&year=${payload.year}`,
  LIST_SCOPE_TICKETS: (scope, scopeId) =>
    `${API_BASE_URL}/business/tickets/scope/${scope}/${scopeId}`,
  LIST_AUDITOR_SCOPE_TICKETS: (scope, scopeId, company) =>
    `${API_BASE_URL}/auditor/company/${company}/tickets/scope/${scope}/${scopeId}`,
  COMPANY_LIST_TICKETS: (payload) =>
    `${API_BASE_URL}/auditor/company/${payload.company}/tickets/?ticket_type=${payload.ticketType}&ticket_status=${payload.ticketStatus}&year=${payload.year}`,
  COMPANY_CREATE_TICKET: (payload) =>
    `${API_BASE_URL}/auditor/company/${payload.companyId}/tickets/`,
  GET_TICKET_DETAILS: (payload) =>
    `${API_BASE_URL}/business/tickets/${payload.id}`,
  GET_COMPANY_TICKET_DETAILS: (payload) =>
    `${API_BASE_URL}/auditor/company/${payload.companyId}/tickets/${payload.id}`,
  COMPANY_CLOSE_TICKET: (payload) =>
    `${API_BASE_URL}/auditor/company/${payload.companyId}/tickets/${payload.id}/close`,
  COMPANY_ADD_RESPONSE: (payload) =>
    `${API_BASE_URL}/auditor/company/${payload.companyId}/tickets/response/${payload.id}`,
  ADD_RESPONSE: (payload) =>
    `${API_BASE_URL}/business/tickets/response/${payload.id}`,
  CLOSE_TICKET: (payload) =>
    `${API_BASE_URL}/business/tickets/${payload.id}/close`,

  LIST_REPORTS: `${API_BASE_URL}/business/reports/`,
  GET_REPORT_DETAILS: (id) => `${API_BASE_URL}/business/reports/${id}`,
  CREATE_REPORT: `${API_BASE_URL}/business/reports/create-report`,
  UPDATE_REPORT: (id) => `${API_BASE_URL}/business/reports/update-report/${id}`,
  LIST_ASSESSMENT_CYCLE: `${API_BASE_URL}/business/list-company-assessment-cycle`,
  GET_ASSESSMENT_DETAILS: (year) => `${API_BASE_URL}/business/company_assessment_cycle/${year}`,
  CREATE_ASSESSMENT_CYCLE: `${API_BASE_URL}/business/add-company-assessment-cycle`,
  UPDATE_ASSESSMENT_CYCLE: (id) => `${API_BASE_URL}/business/update-company-calender/${id}`,
};
