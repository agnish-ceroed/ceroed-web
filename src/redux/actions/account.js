import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getAccountDetails,
    updateAccountDetails,
    resetAccountStatus,
    getUserCompanyDetails,
    updateCompanyDetails
} = createActions({
    [ActionTypes.GET_ACCOUNT_DETAILS]: () => ({}),
    [ActionTypes.UPDATE_ACCOUNT_DETAILS]: (name, email) => ({ name, email }),
    [ActionTypes.RESET_ACCOUNT_STATUS]: () => ({}),
    [ActionTypes.GET_USER_COMPANY_DETAILS]: () => ({}),
    [ActionTypes.UPDATE_COMPANY_DETAILS]: (name, email, phone, website) => ({ name, email, phone, website }),
})
