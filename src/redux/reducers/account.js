import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const accountState = {
    accountDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    updateAccountDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    companyDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    updateCompanyDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    }
}

const accountActions = {
    account: handleActions(
        {
            [ActionTypes.GET_ACCOUNT_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    accountDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_ACCOUNT_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    accountDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload }
                    }
                }),
            [ActionTypes.GET_ACCOUNT_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    accountDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload }
                    }
                }),

            [ActionTypes.UPDATE_ACCOUNT_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    updateAccountDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.UPDATE_ACCOUNT_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    updateAccountDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload }
                    }
                }),
            [ActionTypes.UPDATE_ACCOUNT_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    updateAccountDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload }
                    }
                }),

            [ActionTypes.GET_USER_COMPANY_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    companyDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_USER_COMPANY_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    companyDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload }
                    }
                }),
            [ActionTypes.GET_USER_COMPANY_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    companyDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload }
                    }
                }),

            [ActionTypes.UPDATE_COMPANY_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    updateCompanyDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.UPDATE_COMPANY_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    updateCompanyDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload }
                    }
                }),
            [ActionTypes.UPDATE_COMPANY_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    updateCompanyDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload }
                    }
                }),

            [ActionTypes.RESET_ACCOUNT_STATUS]: (state, { payload }) =>
                immutable(state, {
                    updateAccountDetails: {
                        status: { $set: STATUS.IDLE },
                        data: { $set: '' },
                        message: { $set: '' }
                    },
                    updateCompanyDetails: {
                        status: { $set: STATUS.IDLE },
                        data: { $set: '' },
                        message: { $set: '' }
                    }
                }),
        },
        accountState
    )
}

export default accountActions;
