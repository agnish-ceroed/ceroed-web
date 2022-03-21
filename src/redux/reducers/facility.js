import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const facilityState = {
    addFacility: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    facilityDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    editFacility: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    deleteFacility: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    }
}

const facilityActions = {
    facility: handleActions(
        {

            [ActionTypes.ADD_FACILITY]: (state, { payload }) =>
                immutable(state, {
                    addFacility: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.ADD_FACILITY_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    addFacility: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.ADD_FACILITY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addFacility: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),


            [ActionTypes.GET_FACILITY]: (state, { payload }) =>
                immutable(state, {
                    facilityDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_FACILITY_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    facilityDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_FACILITY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    facilityDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.EDIT_FACILITY]: (state, { payload }) =>
                immutable(state, {
                    editFacility: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.EDIT_FACILITY_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    editFacility: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.EDIT_FACILITY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    editFacility: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.DELETE_FACILITY]: (state, { payload }) =>
                immutable(state, {
                    deleteFacility: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.DELETE_FACILITY_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    deleteFacility: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.DELETE_FACILITY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    deleteFacility: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.RESET_ADD_FACILITY_STATUS]: (state, { payload }) =>
                immutable(state, {
                    addFacility: {
                        status: { $set: STATUS.IDLE },
                        message: { $set: '' }
                    },
                    editFacility: {
                        status: { $set: STATUS.IDLE },
                        data: { $set: {} },
                        message: { $set: '' }
                    },
                    deleteFacility: {
                        status: { $set: STATUS.IDLE },
                        message: { $set: '' }
                    },
                    facilityDetails: {
                        status: { $set: STATUS.IDLE },
                        data: { $set: {} },
                        message: { $set: '' }
                    }
                }),
        },
        facilityState
    )
}

export default facilityActions;
