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
    emissionDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    emissionInputs: {
        data: {},
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
        message: '',
        isCalculateDone: false,
    },
    addRefrigerants: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    updateRefrigerants: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    addWaterDischarge: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    addWaterConsumption: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    addWasteCombustion: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    updatePurchasedElectricity: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    updateStationaryCombustion: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    updateMobileCombustion: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    updateWaterDischargeCombustion: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    updateWaterConsumptionCombustion: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    updateWasteCombustion: {
        data: {},
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    deleteEmissions: {
        data: {},
        status: STATUS.IDLE,
        message: '',
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
        data: { vhevk: true },
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    editTransportationCombustion: {
        data: { vhevk: true },
        status: STATUS.IDLE,
        message: '',
        isCalculateDone: false,
    },
    listAuditTrails: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    listFiles: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    uploadAttachement: {
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
            [ActionTypes.CLEAR_EMISSION_LIST]: (state, { payload }) =>
                immutable(state, {
                    emissionList: {
                        data: { $set: [] },
                        status: { $set: STATUS.IDLE }
                    }
                }),

            [ActionTypes.GET_EMISSION]: (state, { payload }) =>
                immutable(state, {
                    emissionDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_EMISSION_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    emissionDetails: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    }
                }),
            [ActionTypes.GET_EMISSION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    emissionDetails: {
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
            [ActionTypes.ADD_PURCHASED_ELECTRICITY_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    addPurchasedElectricity: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.ADD_PURCHASED_ELECTRICITY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addPurchasedElectricity: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.ADD_REFRIGERANTS]: (state, { payload }) =>
                immutable(state, {
                    addRefrigerants: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.ADD_REFRIGERANTS_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    addRefrigerants: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.ADD_REFRIGERANTS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addRefrigerants: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.ADD_WASTE_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    addWasteCombustion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.ADD_WASTE_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    addWasteCombustion: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.ADD_WASTE_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addWasteCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.UPDATE_REFRIGERANTS]: (state, { payload }) =>
                immutable(state, {
                    updateRefrigerants: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.UPDATE_REFRIGERANTS_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    updateRefrigerants: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.UPDATE_REFRIGERANTS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    updateRefrigerants: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.ADD_WATER_DISCHARGE_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    addWaterDischarge: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.ADD_WATER_DISCHARGE_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    addWaterDischarge: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.ADD_WATER_DISCHARGE_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addWaterDischarge: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.ADD_WATER_CONSUMPTION_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    addWaterConsumption: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.ADD_WATER_CONSUMPTION_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    addWaterConsumption: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.ADD_WATER_CONSUMPTION_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addWaterConsumption: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.UPDATE_PURCHASED_ELECTRICITY]: (state, { payload }) =>
                immutable(state, {
                    updatePurchasedElectricity: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.UPDATE_PURCHASED_ELECTRICITY_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    updatePurchasedElectricity: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.UPDATE_PURCHASED_ELECTRICITY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    updatePurchasedElectricity: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.UPDATE_STATIONARY_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    updateStationaryCombustion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.UPDATE_STATIONARY_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    updateStationaryCombustion: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.UPDATE_STATIONARY_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    updateStationaryCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.UPDATE_MOBILE_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    updateMobileCombustion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.UPDATE_MOBILE_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    updateMobileCombustion: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.UPDATE_MOBILE_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    updateMobileCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.UPDATE_WATER_DISCHARGE_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    updateWaterDischargeCombustion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.UPDATE_WATER_DISCHARGE_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    updateWaterDischargeCombustion: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.UPDATE_WATER_DISCHARGE_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    updateWaterDischargeCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.UPDATE_WATER_CONSUMPTION_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    updateWaterConsumptionCombustion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.UPDATE_WATER_CONSUMPTION_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    updateWaterConsumptionCombustion: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.UPDATE_WATER_CONSUMPTION_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    updateWaterConsumptionCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.UPDATE_WASTE_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    updateWasteCombustion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.UPDATE_WASTE_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    updateWasteCombustion: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.UPDATE_WASTE_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    updateWasteCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.DELETE_EMISSIONS]: (state, { payload }) =>
                immutable(state, {
                    deleteEmissions: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.DELETE_EMISSIONS_SUCCESS]: (state, { payload }) => {
                return immutable(state, {
                    deleteEmissions: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    }
                })
            },
            [ActionTypes.DELETE_EMISSIONS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    deleteEmissions: {
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
            [ActionTypes.ADD_TRANSPORTATION_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    addTransportationCombustion: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.ADD_TRANSPORTATION_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addTransportationCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.EDIT_TRANSPORTATION_COMBUSTION]: (state, { payload }) =>
                immutable(state, {
                    editTransportationCombustion: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.EDIT_TRANSPORTATION_COMBUSTION_SUCCESS]: (state, { payload, save }) => {
                let status = save ? STATUS.SUCCESS : STATUS.IDLE
                return immutable(state, {
                    editTransportationCombustion: {
                        data: { $set: payload },
                        status: { $set: status },
                        isCalculateDone: { $set: !payload.save }
                    }
                })
            },
            [ActionTypes.EDIT_TRANSPORTATION_COMBUSTION_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    editTransportationCombustion: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    }
                }),

            [ActionTypes.RESET_ADD_COMBUSTION_STATUS]: (state, { payload }) =>
                immutable(state, { $set: emissionState }),

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
                }),

            [ActionTypes.LIST_EMISSION_AUDIT_TRAILS]: (state, { payload }) =>
                immutable(state, {
                    listAuditTrails: {
                        status: { $set: STATUS.RUNNING }
                    },
                }),
            [ActionTypes.LIST_EMISSION_AUDIT_TRAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    listAuditTrails: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    },
                }),
            [ActionTypes.LIST_EMISSION_AUDIT_TRAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    listAuditTrails: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    },
                }),
            [ActionTypes.CLEAR_LIST_EMISSION_AUDIT_TRAILS]: (state, { payload }) =>
                immutable(state, {
                    listAuditTrails: {
                        data: { $set: [] },
                        status: { $set: STATUS.IDLE }
                    },
                }),

            [ActionTypes.LIST_EMISSION_FILES]: (state, { payload }) =>
                immutable(state, {
                    listFiles: {
                        status: { $set: STATUS.RUNNING }
                    },
                }),
            [ActionTypes.LIST_EMISSION_FILES_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    listFiles: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    },
                }),
            [ActionTypes.LIST_EMISSION_FILES_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    listFiles: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    },
                }),
            [ActionTypes.CLEAR_LIST_EMISSION_FILES]: (state, { payload }) =>
                immutable(state, {
                    listFiles: {
                        data: { $set: [] },
                        status: { $set: STATUS.IDLE }
                    },
                }),

            [ActionTypes.UPLOAD_EMISSION_ATTACHEMENT]: (state, { payload }) =>
                immutable(state, {
                    uploadAttachement: {
                        status: { $set: STATUS.RUNNING }
                    },
                }),
            [ActionTypes.UPLOAD_EMISSION_ATTACHEMENT_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    uploadAttachement: {
                        data: { $set: payload },
                        status: { $set: STATUS.SUCCESS }
                    },
                }),
            [ActionTypes.UPLOAD_EMISSION_ATTACHEMENT_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    uploadAttachement: {
                        message: { $set: parseError(payload) },
                        status: { $set: STATUS.ERROR }
                    },
                }),
            [ActionTypes.CLEAR_UPLOAD_EMISSION_ATTACHEMENT]: (state, { payload }) =>
                immutable(state, {
                    uploadAttachement: {
                        data: { $set: {} },
                        status: { $set: STATUS.IDLE }
                    },
                }),
        },
        emissionState
    )
}

export default emissionActions;
