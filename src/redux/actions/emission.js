import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getEmissionList,
    addStationaryCombustion,
    addMobileCombustion,
    resetAddCombustionStatus
} = createActions({
    [ActionTypes.GET_EMISSION_LIST]: (emissionType) => ({ emissionType }),
    [ActionTypes.ADD_STATIONARY_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_MOBILE_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.RESET_ADD_COMBUSTION_STATUS]: () => ({}),
})
