import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const emissionState = {
    emissionList: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    addStationaryCombustion: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    addMobileCombustion: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
}

const emissionActions = {
    emission: handleActions(
        {
            [ActionTypes.GET_EMISSION_LIST]: (state, { payload }) =>
                immutable(state, {
                    emissionList: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_EMISSION_LIST_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    emissionList: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    }
                }),
            [ActionTypes.GET_EMISSION_LIST_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    emissionList: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.ADD_STATIONARY_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    addStationaryCombustion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.ADD_STATIONARY_COMBUSTION_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    addStationaryCombustion: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    }
                }),
            [ActionTypes.ADD_STATIONARY_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addStationaryCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.ADD_MOBILE_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    addMobileCombustion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.ADD_MOBILE_COMBUSTION_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    addMobileCombustion: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    }
                }),
            [ActionTypes.ADD_MOBILE_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addMobileCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.RESET_ADD_COMBUSTION_STATUS]: (state, { payload }) =>
                immutable(state, {
                    addStationaryCombustion: {
                        status: { $set: STATUS.IDLE },
                    },
                    addMobileCombustion: {
                        status: { $set: STATUS.IDLE },
                    },
                }),
        },
        emissionState
    )
}

export default emissionActions;
