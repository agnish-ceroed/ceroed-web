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
    },
    auditDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    approveAudit: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    dashboardSummary: {
        data: {},
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

            [ActionTypes.GET_COMPANY_AUDIT_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    auditDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_COMPANY_AUDIT_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    auditDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_COMPANY_AUDIT_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    auditDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.GET_DASHBOARD_SUMMARY]: (state, { payload }) =>
                immutable(state, {
                    dashboardSummary: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_DASHBOARD_SUMMARY_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    dashboardSummary: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),

            [ActionTypes.GET_DASHBOARD_SUMMARY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    dashboardSummary: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),
                

            [ActionTypes.APPROVE_COMPANY_AUDIT_RESET]: (state, { payload }) =>
                immutable(state, {
                    approveAudit: {
                        status: { $set: STATUS.IDLE },
                    }
                }),
            [ActionTypes.APPROVE_COMPANY_AUDIT]: (state, { payload }) =>
                immutable(state, {
                    approveAudit: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.APPROVE_COMPANY_AUDIT_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    approveAudit: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.APPROVE_COMPANY_AUDIT_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    approveAudit: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

        },
        companyState
    )
}

export default companyActions;
