import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const approvalState = {
    approvalSummaryList: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    approvalDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    }
}

const approvalActions = {
    approval: handleActions(
        {
            [ActionTypes.GET_APPROVAL_SUMMARY]: (state, { payload }) =>
                immutable(state, {
                    approvalSummaryList: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_APPROVAL_SUMMARY_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    approvalSummaryList: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload }
                    }
                }),
            [ActionTypes.GET_APPROVAL_SUMMARY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    approvalSummaryList: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload }
                    }
                }),
                
            [ActionTypes.GET_APPROVAL_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    approvalDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_APPROVAL_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    approvalDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload }
                    }
                }),
            [ActionTypes.GET_APPROVAL_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    approvalDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload }
                    }
                }),
        },
        approvalState
    )
}

export default approvalActions;
