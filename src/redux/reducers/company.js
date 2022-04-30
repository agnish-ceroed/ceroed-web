import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const companyState = {
    companyList: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    companyDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    auditHistory: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    }
}

const companyActions = {
    company: handleActions(
        {
            [ActionTypes.GET_COMPANY_LIST]: (state, { payload }) =>
                immutable(state, {
                    companyList: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_COMPANY_LIST_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    companyList: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_COMPANY_LIST_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    companyList: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.GET_COMPANY_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    companyDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_COMPANY_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    companyDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_COMPANY_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    companyDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.GET_COMPANY_AUDIT_HISTORY]: (state, { payload }) =>
                immutable(state, {
                    auditHistory: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_COMPANY_AUDIT_HISTORY_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    auditHistory: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_COMPANY_AUDIT_HISTORY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    auditHistory: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

        },
        companyState
    )
}

export default companyActions;
