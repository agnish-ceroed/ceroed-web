import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

const uploadFileEmissionUrlMap = {
    employees_turnover: APIEndpoints.ADD_EMPLOYEES_TURNOVER,
    age_based_statistics: APIEndpoints.ADD_AGE_BASED_STATISTICS,
    gender_based_statistics: APIEndpoints.ADD_GENDER_BASED_STATISTICS,
    board_diversity: APIEndpoints.ADD_BOARD_DIVERSITY,
    management_diversity: APIEndpoints.ADD_MANAGEMENT_DIVERSITY,
    tax: APIEndpoints.ADD_TAX
}

const nonEmissionDetailsMap = {
    employees_turnover: 'employees-turnover',
    age_based_statistics: 'age-based-statistics',
    gender_based_statistics: 'gender-based-statistics',
    board_diversity: 'board-diversity',
    management_diversity: 'management-diversity',
    tax: 'tax'
}

export function* getEmissionList(action) {
    try {
        const { emissionType, filter, isAuditor, company } = action.payload
        const payload = filter
        const apiEndpoint = isAuditor ? APIEndpoints.GET_AUDITOR_EMISSION_LIST(emissionType, company) : APIEndpoints.GET_EMISSION_LIST(emissionType)
        if(!payload.month)
            delete(payload.month)
        if(!payload.facility_id)
            delete(payload.facility_id)
        const response = yield call(request, apiEndpoint, {
            method: 'GET',
            payload,
        })
        yield put({
            type: ActionTypes.GET_EMISSION_LIST_SUCCESS,
            payload: response.emissions
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.GET_EMISSION_LIST_FAILURE,
            payload: err
        })
    }
}

export function* getEmission(action) {
    try {
        const { emissionType, emissionId, isAuditor, company } = action.payload
        const apiEndpoint = isAuditor ? APIEndpoints.GET_AUDITOR_EMISSION(emissionType, emissionId, company) : APIEndpoints.GET_EMISSION(emissionType, emissionId)
        const response = yield call(request, apiEndpoint, {
            method: 'GET',
        })
        yield put({
            type: ActionTypes.GET_EMISSION_SUCCESS,
            payload: response.emission || {}
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.GET_EMISSION_FAILURE,
            payload: err
        })
    }
}

export function* getEmissionInputFormat(action) {
    try {
        const { emissionType } = action.payload
        const response = yield call(request, APIEndpoints.GET_EMISSION_INPUT_FORMAT(emissionType), {
            method: 'GET',
        })
        yield put({
            type: ActionTypes.GET_EMISSION_INPUT_FORMAT_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.GET_EMISSION_INPUT_FORMAT_FAILURE,
            payload: err
        })
    }
}

export function* addPurchasedElectricity(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.ADD_PURCHASED_ELECTRICITY, {
            method: 'POST',
            payload: requestData
        })

        yield put({
            type: ActionTypes.ADD_PURCHASED_ELECTRICITY_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
        console.log('requestData2', requestData)
    } catch (err) {
        console.log('error', err)
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_PURCHASED_ELECTRICITY_FAILURE,
            payload: err
        })
    }
}

export function* addRefrigerants(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.ADD_REFRIGERANTS, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_REFRIGERANTS_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_REFRIGERANTS_FAILURE,
            payload: err
        })
    }
}

export function* updateRefrigerants(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.UPDATE_REFRIGERANTS(requestData.id), {
            method: 'PUT',
            payload: requestData
        })
        yield put({
            type: ActionTypes.UPDATE_REFRIGERANTS_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.UPDATE_REFRIGERANTS_FAILURE,
            payload: err
        })
    }
}

export function* addWaterDischarge(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.ADD_WATER_DISCHARGE, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_WATER_DISCHARGE_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_WATER_DISCHARGE_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* addWaterConsumption(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.ADD_WATER_CONSUMPTION, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_WATER_CONSUMPTION_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_WATER_CONSUMPTION_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* addWasteCombustion(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.ADD_WASTE_COMBUSTION, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_WASTE_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_WASTE_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* updatePurchasedElectricity(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.UPDATE_PURCHASED_ELECTRICITY(requestData.id), {
            method: 'PUT',
            payload: requestData
        })
        yield put({
            type: ActionTypes.UPDATE_PURCHASED_ELECTRICITY_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.UPDATE_PURCHASED_ELECTRICITY_FAILURE,
            payload: err
        })
    }
}

export function* updateStationaryCombustion(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.UPDATE_STATIONARY_COMBUSTION(requestData.id), {
            method: 'PUT',
            payload: requestData
        })
        yield put({
            type: ActionTypes.UPDATE_STATIONARY_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.UPDATE_STATIONARY_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* updateMobileCombustion(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.UPDATE_MOBILE_COMBUSTION(requestData.id), {
            method: 'PUT',
            payload: requestData
        })
        yield put({
            type: ActionTypes.UPDATE_MOBILE_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.UPDATE_MOBILE_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* updateWaterDischargeCombustion(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.UPDATE_WATER_DISCHARGE_COMBUSTION(requestData.id), {
            method: 'PUT',
            payload: requestData
        })
        yield put({
            type: ActionTypes.UPDATE_WATER_DISCHARGE_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.UPDATE_WATER_DISCHARGE_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* updateWaterConsumptionCombustion(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.UPDATE_WATER_CONSUMPTION_COMBUSTION(requestData.id), {
            method: 'PUT',
            payload: requestData
        })
        yield put({
            type: ActionTypes.UPDATE_WATER_CONSUMPTION_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_WATER_CONSUMPTION_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* updateWasteCombustion(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.UPDATE_WASTE_COMBUSTION(requestData.id), {
            method: 'PUT',
            payload: requestData
        })
        yield put({
            type: ActionTypes.UPDATE_WASTE_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.UPDATE_WASTE_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* deleteEmissions(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.DELETE_EMISSIONS(requestData.id), {
            method: 'DELETE',
        })
        yield put({
            type: ActionTypes.DELETE_EMISSIONS_SUCCESS,
            payload: response,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.DELETE_EMISSIONS_FAILURE,
            payload: err
        })
    }
}

export function* addStationaryCombustion(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.ADD_STATIONARY_COMBUSTION, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_STATIONARY_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_STATIONARY_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* addMobileCombustion(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.ADD_MOBILE_COMBUSTION, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_MOBILE_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_MOBILE_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* getEmissionFuelList(action) {
    try {
        const { emissionType } = action.payload
        const response = yield call(request, APIEndpoints.GET_EMISSION_FUEL_LIST(emissionType), {
            method: 'GET',
        })
        yield put({
            type: ActionTypes.GET_EMISSION_FUEL_LIST_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.GET_EMISSION_FUEL_LIST_FAILURE,
            payload: err
        })
    }
}

export function* addTransportationCombustion(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.ADD_TRANSPORTATION_COMBUSTION, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_TRANSPORTATION_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_TRANSPORTATION_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* editTransportationCombustion(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.EDIT_TRANSPORTATION_COMBUSTION(requestData.id), {
            method: 'PUT',
            payload: requestData,
        })
        yield put({
            type: ActionTypes.EDIT_TRANSPORTATION_COMBUSTION_SUCCESS,
            payload: response.emission,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.EDIT_TRANSPORTATION_COMBUSTION_FAILURE,
            payload: err
        })
    }
}

export function* getMobileCombustionInputs(action) {
    try {
        const { emissionType } = action.payload
        const response = yield call(request, APIEndpoints.GET_EMISSION_FUEL_LIST(emissionType), {
            method: 'GET',
        })
        yield put({
            type: ActionTypes.GET_MOBILE_COMBUSTION_INPUTS_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.GET_MOBILE_COMBUSTION_INPUTS_FAILURE,
            payload: err
        })
    }
}

export function* listAuditTrails(action) {
    try {
        const { emissionId, isAuditor, company } = action.payload
        const apiEndpoint = isAuditor ? APIEndpoints.LIST_AUDITOR_EMISSION_AUDIT_TRAILS(emissionId, company) : APIEndpoints.LIST_EMISSION_AUDIT_TRAILS(emissionId)
        const response = yield call(request, apiEndpoint, {
            method: 'GET',
        })
        yield put({
            type: ActionTypes.LIST_EMISSION_AUDIT_TRAILS_SUCCESS,
            payload: response.audit_status
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.LIST_EMISSION_AUDIT_TRAILS_FAILURE,
            payload: err.message
        })
    }
}

export function* listEmissionFiles(action) {
    try {
        const { emissionId, isAuditor, company } = action.payload
        const apiEndpoint = isAuditor ? APIEndpoints.LIST_AUDITOR_EMISSION_FILES(emissionId, company) : APIEndpoints.LIST_EMISSION_FILES(emissionId)
        const response = yield call(request, apiEndpoint, {
            method: 'GET',
        })
        yield put({
            type: ActionTypes.LIST_EMISSION_FILES_SUCCESS,
            payload: response.attachments
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.LIST_EMISSION_AUDIT_TRAILS_FAILURE,
            payload: err?.message
        })
    }
}

export function* uploadAttachement(action) {
    try {
        const { emissionId, file } = action.payload;
        const formData = new FormData();
        formData.append('file', file);
        const response = yield call(request, APIEndpoints.UPLOAD_EMISSION_ATTACHEMENT(emissionId), {
            method: 'POST',
            isFormData: true,
            payload: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        yield put({
            type: ActionTypes.UPLOAD_EMISSION_ATTACHEMENT_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.UPLOAD_EMISSION_ATTACHEMENT_FAILURE,
            payload: err
        })
    }
}

export function* deleteAttachemnt(action) {
    try {
        const { emissionId, attachementId } = action.payload
        const response = yield call(request, APIEndpoints.DELETE_EMISSION_ATTACHEMENT(emissionId, attachementId), {
            method: 'DELETE',
        })
        yield put({
            type: ActionTypes.DELETE_EMISSION_ATTACHEMENT_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.DELETE_EMISSION_ATTACHEMENT_FAILURE,
            payload: err.message
        })
    }
}

export function* addDevelopmentTraining(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_DEVELOPMET_TRAINING_DETAILS, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_DEVELOPMENT_TRAINING_DETAILS_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_DEVELOPMENT_TRAINING_DETAILS_FAILURE,
            payload: err
        })
    }
}

export function* addEmployeeHealthDetails(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_EMPLOYEE_HEALTH_DETAILS, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_EMPLOYEE_HEALTH_DETAILS_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_EMPLOYEE_HEALTH_DETAILS_FAILURE,
            payload: err
        })
    }
}

export function* addWorkerSafetyTraining(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_WORKER_SAFETY_TRAINING, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_WORKER_SAFETY_TRAINING_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_WORKER_SAFETY_TRAINING_FAILURE,
            payload: err
        })
    }
}

export function* addDescriminationIncident(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_DESCRIMINATION_INCIDENT_RECORD, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_DESCRIMINATION_INCIDENT_RECORD_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_DESCRIMINATION_INCIDENT_RECORD_FAILURE,
            payload: err
        })
    }
}

export function* addSupplierHumanRightsTraining(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_SUPPLIER_HUMAN_RIGHTS_TRAINING, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_SUPPLIER_HUMAN_RIGHTS_TRAINING_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_SUPPLIER_HUMAN_RIGHTS_TRAINING_FAILURE,
            payload: err
        })
    }
}

export function* addSocialHumanRightsTraining(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_SOCIAL_HUMAN_RIGHTS_TRAINING, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_SOCIAL_HUMAN_RIGHTS_TRAINING_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_SOCIAL_HUMAN_RIGHTS_TRAINING_FAILURE,
            payload: err
        })
    }
}

export function* addSupplierScreening(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_SUPPLIER_SCREENING, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_SUPPLIER_SCREENING_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_SUPPLIER_SCREENING_FAILURE,
            payload: err
        })
    }
}

export function* addLocalCommunities(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_LOCAL_COMMUNITIES, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_LOCAL_COMMUNITIES_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_LOCAL_COMMUNITIES_FAILURE,
            payload: err
        })
    }
}

export function* addPoliticalContribution(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_POLITICAL_CONTRIBUTION, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_POLITICAL_CONTRIBUTION_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_POLITICAL_CONTRIBUTION_FAILURE,
            payload: err
        })
    }
}

export function* addAntiCorruptionDisclosure(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_ANTI_CORRUPTION_DISCLOSURE, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_ANTI_CORRUPTION_DISCLOSURE_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_ANTI_CORRUPTION_DISCLOSURE_FAILURE,
            payload: err
        })
    }
}

export function* addAntiCorruptionTraining(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_ANTI_CORRUPTION_TRAINING, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_ANTI_CORRUPTION_TRAINING_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_ANTI_CORRUPTION_TRAINING_FAILURE,
            payload: err
        })
    }
}

export function* addAntiCompetitiveDisclosure(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_ANTI_COMPETITIVE_DISCLOSURE, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_ANTI_COMPETITIVE_DISCLOSURE_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_ANTI_COMPETITIVE_DISCLOSURE_FAILURE,
            payload: err
        })
    }
}

export function* addFinancialAssistance(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, APIEndpoints.ADD_SUBSIDIES_FINANCIAL_ASSISTANCE, {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_SUBSIDIES_FINANCIAL_ASSISTANCE_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_SUBSIDIES_FINANCIAL_ASSISTANCE_FAILURE,
            payload: err
        })
    }
}

export function* addUploadFileEmissions(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, uploadFileEmissionUrlMap[requestData.emissionType], {
            method: 'POST',
            payload: requestData
        })
        yield put({
            type: ActionTypes.ADD_UPLOAD_FILE_EMISSION_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_UPLOAD_FILE_EMISSION_FAILURE,
            payload: err
        })
    }
}

export function* updateNonEmissionDetails(action) {
    try {
        const { requestData } = action.payload;
        const response = yield call(request, 
            APIEndpoints.UPDATE_NON_EMISSION_DETAILS(requestData.id, nonEmissionDetailsMap[requestData.emissionType]), {
            method: 'PUT',
            payload: requestData
        })
        yield put({
            type: ActionTypes.UPDATE_NON_EMISSION_DETAILS_SUCCESS,
            payload: response,
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.UPDATE_NON_EMISSION_DETAILS_FAILURE,
            payload: err
        })
    }
}


export default function* root() {
    yield all([
        takeLatest(ActionTypes.GET_EMISSION_LIST, getEmissionList),
        takeLatest(ActionTypes.GET_EMISSION, getEmission),
        takeLatest(ActionTypes.GET_EMISSION_INPUT_FORMAT, getEmissionInputFormat),
        takeLatest(ActionTypes.ADD_STATIONARY_COMBUSTION, addStationaryCombustion),
        takeLatest(ActionTypes.GET_EMISSION_INPUT_FORMAT, getEmissionInputFormat),
        takeLatest(ActionTypes.ADD_PURCHASED_ELECTRICITY, addPurchasedElectricity),
        takeLatest(ActionTypes.ADD_REFRIGERANTS, addRefrigerants),
        takeLatest(ActionTypes.ADD_WASTE_COMBUSTION, addWasteCombustion),
        takeLatest(ActionTypes.UPDATE_REFRIGERANTS, updateRefrigerants),
        takeLatest(ActionTypes.ADD_WATER_DISCHARGE_COMBUSTION, addWaterDischarge),
        takeLatest(ActionTypes.ADD_WATER_CONSUMPTION_COMBUSTION, addWaterConsumption),
        takeLatest(ActionTypes.UPDATE_PURCHASED_ELECTRICITY, updatePurchasedElectricity),
        takeLatest(ActionTypes.UPDATE_STATIONARY_COMBUSTION, updateStationaryCombustion),
        takeLatest(ActionTypes.UPDATE_MOBILE_COMBUSTION, updateMobileCombustion),
        takeLatest(ActionTypes.UPDATE_WATER_DISCHARGE_COMBUSTION, updateWaterDischargeCombustion),
        takeLatest(ActionTypes.UPDATE_WATER_CONSUMPTION_COMBUSTION, updateWaterConsumptionCombustion),
        takeLatest(ActionTypes.UPDATE_WASTE_COMBUSTION, updateWasteCombustion),
        takeLatest(ActionTypes.DELETE_EMISSIONS, deleteEmissions),
        takeLatest(ActionTypes.ADD_MOBILE_COMBUSTION, addMobileCombustion),
        takeLatest(ActionTypes.GET_EMISSION_FUEL_LIST, getEmissionFuelList),
        takeLatest(ActionTypes.GET_MOBILE_COMBUSTION_INPUTS, getMobileCombustionInputs),
        takeLatest(ActionTypes.ADD_TRANSPORTATION_COMBUSTION, addTransportationCombustion),
        takeLatest(ActionTypes.EDIT_TRANSPORTATION_COMBUSTION, editTransportationCombustion),
        takeLatest(ActionTypes.LIST_EMISSION_AUDIT_TRAILS, listAuditTrails),
        takeLatest(ActionTypes.LIST_EMISSION_FILES, listEmissionFiles),
        takeLatest(ActionTypes.UPLOAD_EMISSION_ATTACHEMENT, uploadAttachement),
        takeLatest(ActionTypes.DELETE_EMISSION_ATTACHEMENT, deleteAttachemnt),
        takeLatest(ActionTypes.ADD_DEVELOPMENT_TRAINING_DETAILS, addDevelopmentTraining),
        takeLatest(ActionTypes.ADD_EMPLOYEE_HEALTH_DETAILS, addDevelopmentTraining),
        takeLatest(ActionTypes.ADD_WORKER_SAFETY_TRAINING, addWorkerSafetyTraining),
        takeLatest(ActionTypes.ADD_DESCRIMINATION_INCIDENT_RECORD, addDescriminationIncident),
        takeLatest(ActionTypes.ADD_SUPPLIER_HUMAN_RIGHTS_TRAINING, addSupplierHumanRightsTraining),
        takeLatest(ActionTypes.ADD_SOCIAL_HUMAN_RIGHTS_TRAINING, addSocialHumanRightsTraining),
        takeLatest(ActionTypes.ADD_SUPPLIER_SCREENING, addSupplierScreening),
        takeLatest(ActionTypes.ADD_LOCAL_COMMUNITIES, addLocalCommunities),
        takeLatest(ActionTypes.ADD_POLITICAL_CONTRIBUTION, addPoliticalContribution),
        takeLatest(ActionTypes.ADD_ANTI_CORRUPTION_DISCLOSURE, addAntiCorruptionDisclosure),
        takeLatest(ActionTypes.ADD_ANTI_CORRUPTION_TRAINING, addAntiCorruptionTraining),
        takeLatest(ActionTypes.ADD_ANTI_COMPETITIVE_DISCLOSURE, addAntiCompetitiveDisclosure),
        takeLatest(ActionTypes.ADD_SUBSIDIES_FINANCIAL_ASSISTANCE, addFinancialAssistance),
        takeLatest(ActionTypes.ADD_UPLOAD_FILE_EMISSION, addUploadFileEmissions),
        takeLatest(ActionTypes.UPDATE_NON_EMISSION_DETAILS, updateNonEmissionDetails),
    ])
}
