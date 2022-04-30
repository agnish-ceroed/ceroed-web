import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getCompanyList,
    getCompanyDetails,
    getCompanyAuditHistory
} = createActions({
    [ActionTypes.GET_COMPANY_LIST]: () => ({}),
    [ActionTypes.GET_COMPANY_DETAILS]: (companyId) => ({ companyId }),
    [ActionTypes.GET_COMPANY_AUDIT_HISTORY]: (companyId) => ({ companyId }),
})
