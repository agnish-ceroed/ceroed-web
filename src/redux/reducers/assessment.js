import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const assessmentState = {
    assessmentList: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    assessmentDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    createAssessmentCycle: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    updateAssessmentCycle: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
}

const assessmentActions = {
    assessment: handleActions(
        {

            [ActionTypes.LIST_ASSESSMENT_CYCLE]: (state, { payload }) =>
                immutable(state, {
                    assessmentList: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.LIST_ASSESSMENT_CYCLE_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    assessmentList: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.LIST_ASSESSMENT_CYCLE_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    assessmentList: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.GET_ASSESSMENT_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    assessmentDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_ASSESSMENT_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    assessmentDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_ASSESSMENT_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    assessmentDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.CREATE_ASSESSMENT_CYCLE]: (state, { payload }) =>
                immutable(state, {
                    createAssessmentCycle: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.CREATE_ASSESSMENT_CYCLE_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    createAssessmentCycle: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.CREATE_ASSESSMENT_CYCLE_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    createAssessmentCycle: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.UPDATE_ASSESSMENT_CYCLE]: (state, { payload }) =>
                immutable(state, {
                    updateAssessmentCycle: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.UPDATE_ASSESSMENT_CYCLE_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    updateAssessmentCycle: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.UPDATE_ASSESSMENT_CYCLE_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    updateAssessmentCycle: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.RESET_ASSESSMENT_CYCLE]: (state, { payload }) =>
                immutable(state, {
                    createAssessmentCycle: {
                        status: { $set: STATUS.IDLE },
                        message: { $set: '' }
                    },
                    updateAssessmentCycle: {
                        status: { $set: STATUS.IDLE },
                        message: { $set: '' }
                    }
                }),
        },
        assessmentState
    )
}

export default assessmentActions;
