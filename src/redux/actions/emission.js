import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getEmissionList,
    clearEmissionList,
    getEmission,
    addStationaryCombustion,
    addMobileCombustion,
    addTransportationCombustion,
    editTransportationCombustion,
    addWaterDischargeCombustion,
    addWaterConsumptionCombustion,
    addWasteCombustion,
    resetAddCombustionStatus,
    getEmissionFuelList,
    getMobileCombustionInputs,
    getEmissionInputFormat,
    addPurchasedElectricity,
    updatePurchasedElectricity,
    updateStationaryCombustion,
    updateMobileCombustion,
    updateWaterDischargeCombustion,
    updateWaterConsumptionCombustion,
    updateWasteCombustion,
    deleteEmissions,
    addRefrigerants,
    updateRefrigerants,
    listEmissionAuditTrails,
    clearListEmissionAuditTrails,
    listEmissionFiles,
    clearListEmissionFiles,
    uploadEmissionAttachement,
    clearUploadEmissionAttachement,
    deleteEmissionAttachement,
    clearDeleteEmissionAttachement,
    addDevelopmentTrainingDetails,
    addEmployeeHealthDetails,
    addWorkerSafetyTraining,
    addDescriminationIncidentRecord,
} = createActions({
    [ActionTypes.GET_EMISSION_LIST]: (emissionType, filter) => ({ emissionType, filter }),
    [ActionTypes.CLEAR_EMISSION_LIST]: () => ({}),
    [ActionTypes.GET_EMISSION]: (params) => (params),
    [ActionTypes.ADD_STATIONARY_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_MOBILE_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_TRANSPORTATION_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.EDIT_TRANSPORTATION_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_WATER_DISCHARGE_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_WATER_CONSUMPTION_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_WASTE_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.RESET_ADD_COMBUSTION_STATUS]: () => ({}),
    [ActionTypes.GET_EMISSION_FUEL_LIST]: (emissionType) => ({ emissionType }),
    [ActionTypes.GET_MOBILE_COMBUSTION_INPUTS]: (emissionType) => ({ emissionType }),
    [ActionTypes.GET_EMISSION_INPUT_FORMAT]: (emissionType) => ({ emissionType }),
    [ActionTypes.ADD_PURCHASED_ELECTRICITY]: (requestData) => ({ requestData }),
    [ActionTypes.UPDATE_PURCHASED_ELECTRICITY]: (requestData) => ({ requestData }),
    [ActionTypes.UPDATE_STATIONARY_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.UPDATE_MOBILE_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.UPDATE_WATER_DISCHARGE_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.UPDATE_WATER_CONSUMPTION_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.UPDATE_WASTE_COMBUSTION]: (requestData) => ({ requestData }),
    [ActionTypes.DELETE_EMISSIONS]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_REFRIGERANTS]: (requestData) => ({ requestData }),
    [ActionTypes.UPDATE_REFRIGERANTS]: (requestData) => ({ requestData }),
    [ActionTypes.LIST_EMISSION_AUDIT_TRAILS]: (emissionId) => ({ emissionId }),
    [ActionTypes.CLEAR_LIST_EMISSION_AUDIT_TRAILS]: () => ({}),
    [ActionTypes.LIST_EMISSION_FILES]: (emissionId) => ({ emissionId }),
    [ActionTypes.CLEAR_LIST_EMISSION_FILES]: () => ({}),
    [ActionTypes.UPLOAD_EMISSION_ATTACHEMENT]: (emissionId, file) => ({emissionId, file}),
    [ActionTypes.CLEAR_UPLOAD_EMISSION_ATTACHEMENT]: () => ({}),
    [ActionTypes.DELETE_EMISSION_ATTACHEMENT]: (emissionId, attachementId) => ({emissionId, attachementId}),
    [ActionTypes.CLEAR_DELETE_EMISSION_ATTACHEMENT]: () => ({}),
    [ActionTypes.ADD_DEVELOPMENT_TRAINING_DETAILS]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_EMPLOYEE_HEALTH_DETAILS]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_WORKER_SAFETY_TRAINING]: (requestData) => ({ requestData }),
    [ActionTypes.ADD_DESCRIMINATION_INCIDENT_RECORD]: (requestData) => ({ requestData }),
})
