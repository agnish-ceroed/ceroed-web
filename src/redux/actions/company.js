import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getCompanyList,
    getCompanyDetails,
    getCompanyAuditHistory,
    getCompanyAuditDetails,
    approveCompanyAudit,
    approveCompanyAuditReset,
} = createActions({
    [ActionTypes.GET_COMPANY_LIST]: () => ({}),
    [ActionTypes.GET_COMPANY_DETAILS]: (companyId) => ({ companyId }),
    [ActionTypes.GET_COMPANY_AUDIT_HISTORY]: (companyId) => ({ companyId }),
    [ActionTypes.GET_COMPANY_AUDIT_DETAILS]: (companyId, auditId, year) => ({ companyId, auditId, year }),
    [ActionTypes.APPROVE_COMPANY_AUDIT]: (company, auditId) => ({ company, auditId }),
    [ActionTypes.APPROVE_COMPANY_AUDIT_RESET]: () => ({}),
})
