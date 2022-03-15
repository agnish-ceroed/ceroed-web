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
    emissionInputs: {
        data: {
            calculation_approach: [],
            types_of_emission_factors: [],
            units: [],
        },
        status: STATUS.IDLE,
        message: ''
    },
    addStationaryCombustion: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    addPurchasedElectricity: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    addMobileCombustion: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    fuelList: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    fuelUnits: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    mobileCombustionInputs: {
        data: {
            activity_types: [],
            fuel_sources: [],
            vehicle_types: [],
            units: []
        },
        status: STATUS.IDLE,
        message: ''
    },
    addTransportationCombustion: {
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

            [ActionTypes.GET_EMISSION_INPUT_FORMAT]: (state, { payload }) =>
                immutable(state, {
                    emissionInputs: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_EMISSION_INPUT_FORMAT_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    emissionInputs: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    }
                }),
            [ActionTypes.GET_EMISSION_INPUT_FORMAT_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    emissionInputs: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.ADD_PURCHASED_ELECTRICITY]: (state, { payload }) =>
                immutable(state, {
                    addPurchasedElectricity: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.ADD_PURCHASED_ELECTRICITY_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    addPurchasedElectricity: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    }
                }),
            [ActionTypes.ADD_PURCHASED_ELECTRICITY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addPurchasedElectricity: {
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
            [ActionTypes.ADD_STATIONARY_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    addStationaryCombustion: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
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
            [ActionTypes.ADD_MOBILE_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    addMobileCombustion: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.ADD_MOBILE_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addMobileCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.ADD_TRANSPORTATION_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    addTransportationCombustion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.ADD_TRANSPORTATION_COMBUSTION_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    addTransportationCombustion: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    }
                }),
            [ActionTypes.ADD_TRANSPORTATION_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addTransportationCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.RESET_ADD_COMBUSTION_STATUS]: (state, { payload }) =>
                immutable(state, {
                    addStationaryCombustion: {
                        status: { $set: STATUS.IDLE },
                        isCalculateDone: { $set: false }
                    },
                    addMobileCombustion: {
                        status: { $set: STATUS.IDLE },
                        isCalculateDone: { $set: false }
                    },
                }),

            [ActionTypes.GET_EMISSION_FUEL_LIST]: (state, { payload }) =>
                immutable(state, {
                    fuelList: {
                        status: { $set: STATUS.RUNNING }
                    },
                    fuelUnits: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_EMISSION_FUEL_LIST_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    fuelList: {
                        data: { $set: payload.fuels },
                        status: { $set: STATUS.SUCCESS }
                    },
                    fuelUnits: {
                        data: { $set: payload.units },
                        status: { $set: STATUS.SUCCESS }
                    }
                }),
            [ActionTypes.GET_EMISSION_FUEL_LIST_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    fuelList: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    },
                    fuelUnits: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.GET_MOBILE_COMBUSTION_INPUTS]: (state, { payload }) =>
                immutable(state, {
                    mobileCombustionInputs: {
                        status: { $set: STATUS.RUNNING }
                    },
                }),
            [ActionTypes.GET_MOBILE_COMBUSTION_INPUTS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    mobileCombustionInputs: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    },
                }),
            [ActionTypes.GET_MOBILE_COMBUSTION_INPUTS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    mobileCombustionInputs: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    },
                    addPurchasedElectricity: {
                        status: { $set: STATUS.IDLE },
                    },
                }),
        },
        emissionState
    )
}

export default emissionActions;
