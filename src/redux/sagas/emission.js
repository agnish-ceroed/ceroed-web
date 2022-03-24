import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

export function* getEmissionList(action) {
    try {
        const { emissionType } = action.payload
        const response = yield call(request, APIEndpoints.GET_EMISSION_LIST(emissionType), {
            method: 'GET',
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
        const { emissionType, emissionId } = action.payload
        const response = yield call(request, APIEndpoints.GET_EMISSION(emissionType, emissionId), {
            method: 'GET',
        })
        yield put({
            type: ActionTypes.GET_EMISSION_SUCCESS,
            payload: response.emission
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
            payload: response,
            save: requestData.save
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_PURCHASED_ELECTRICITY_FAILURE,
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
            payload: response,
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

export function* updatePurchasedElectricity(action) {
    try {
        const { requestData } = action.payload
        const response = yield call(request, APIEndpoints.UPDATE_PURCHASED_ELECTRICITY(requestData.id), {
            method: 'PUT',
            payload: requestData
        })
        yield put({
            type: ActionTypes.UPDATE_PURCHASED_ELECTRICITY_SUCCESS,
            payload: response,
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
            payload: response,
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
            payload: response,
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
            payload: response,
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
            payload: response,
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
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_TRANSPORTATION_COMBUSTION_FAILURE,
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


export default function* root() {
    yield all([
        takeLatest(ActionTypes.GET_EMISSION_LIST, getEmissionList),
        takeLatest(ActionTypes.GET_EMISSION, getEmission),
        takeLatest(ActionTypes.GET_EMISSION_INPUT_FORMAT, getEmissionInputFormat),
        takeLatest(ActionTypes.ADD_STATIONARY_COMBUSTION, addStationaryCombustion),
        takeLatest(ActionTypes.GET_EMISSION_INPUT_FORMAT, getEmissionInputFormat),
        takeLatest(ActionTypes.ADD_PURCHASED_ELECTRICITY, addPurchasedElectricity),
        takeLatest(ActionTypes.ADD_WATER_DISCHARGE_COMBUSTION, addWaterDischarge),
        takeLatest(ActionTypes.UPDATE_PURCHASED_ELECTRICITY, updatePurchasedElectricity),
        takeLatest(ActionTypes.UPDATE_STATIONARY_COMBUSTION, updateStationaryCombustion),
        takeLatest(ActionTypes.UPDATE_MOBILE_COMBUSTION, updateMobileCombustion),
        takeLatest(ActionTypes.DELETE_EMISSIONS, deleteEmissions),
        takeLatest(ActionTypes.ADD_MOBILE_COMBUSTION, addMobileCombustion),
        takeLatest(ActionTypes.GET_EMISSION_FUEL_LIST, getEmissionFuelList),
        takeLatest(ActionTypes.GET_MOBILE_COMBUSTION_INPUTS, getMobileCombustionInputs),
        takeLatest(ActionTypes.ADD_TRANSPORTATION_COMBUSTION, addTransportationCombustion),
    ])
}
