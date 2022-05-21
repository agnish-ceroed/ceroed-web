import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getAccountDetails,
    updateAccountDetails,
    resetAccountStatus,
    getUserCompanyDetails,
    updateCompanyDetails
} = createActions({
    [ActionTypes.GET_ACCOUNT_DETAILS]: (role) => ({role}),
    [ActionTypes.UPDATE_ACCOUNT_DETAILS]: (role, name, email) => ({ role, name, email }),
    [ActionTypes.RESET_ACCOUNT_STATUS]: () => ({}),
    [ActionTypes.GET_USER_COMPANY_DETAILS]: (role) => ({role}),
    [ActionTypes.UPDATE_COMPANY_DETAILS]: (name, email, phone, website) => ({ name, email, phone, website }),
})
