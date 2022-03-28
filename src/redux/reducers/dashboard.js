import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const dashboardState = {
    getEmissionYear: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    getEmissionTypes: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    getEmissionRegion: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    getEmissionsByMonth: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    }
}

const dashboardActions = {
    dashboard: handleActions(
        {
            [ActionTypes.GET_EMISSION_YEAR]: (state) =>
                immutable(state, {
                    getEmissionYear: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_EMISSION_YEAR_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    getEmissionYear: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_EMISSION_YEAR_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    getEmissionYear: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.GET_EMISSION_TYPES]: (state) =>
                immutable(state, {
                    getEmissionTypes: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_EMISSION_TYPES_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    getEmissionTypes: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_EMISSION_TYPES_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    getEmissionTypes: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.GET_EMISSION_REGION]: (state) =>
                immutable(state, {
                    getEmissionRegion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_EMISSION_REGION_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    getEmissionRegion: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_EMISSION_REGION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    getEmissionRegion: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.GET_EMISSIONS_BY_MONTH]: (state) =>
                immutable(state, {
                    getEmissionsByMonth: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_EMISSIONS_BY_MONTH_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    getEmissionsByMonth: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_EMISSIONS_BY_MONTH_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    getEmissionsByMonth: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),
        },
        dashboardState
    )
}

export default dashboardActions;
