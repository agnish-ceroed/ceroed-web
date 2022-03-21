import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getEmissionList,
    getEmission,
    addStationaryCombustion,
    addMobileCombustion,
    addTransportationCombustion,
    resetAddCombustionStatus,
    getEmissionFuelList,
    getMobileCombustionInputs,
    getEmissionInputFormat,
    addPurchasedElectricity,
    updatePurchasedElectricity
} = createActions({
    [ActionTypes.GET_EMISSION_LIST]: (emissionType) => ({ emissionType }),
    [ActionTypes.GET_EMISSION]: (params) => (params),
    [ActionTypes.ADD_STATIONARY_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_MOBILE_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_TRANSPORTATION_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.RESET_ADD_COMBUSTION_STATUS]: () => ({}),
    [ActionTypes.GET_EMISSION_FUEL_LIST]: (emissionType) => ({ emissionType }),
    [ActionTypes.GET_MOBILE_COMBUSTION_INPUTS]: (emissionType) => ({ emissionType }),
    [ActionTypes.GET_EMISSION_INPUT_FORMAT]: (emissionType) => ({emissionType}),
    [ActionTypes.ADD_PURCHASED_ELECTRICITY]: (requestData) => ({requestData}),
    [ActionTypes.UPDATE_PURCHASED_ELECTRICITY]: (requestData) => ({requestData}),
})
