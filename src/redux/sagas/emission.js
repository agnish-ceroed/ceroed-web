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
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_PURCHASED_ELECTRICITY_FAILURE,
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
            payload: response
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
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_MOBILE_COMBUSTION_FAILURE,
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



export default function* root() {
    yield all([
        takeLatest(ActionTypes.GET_EMISSION_LIST, getEmissionList),
        takeLatest(ActionTypes.GET_EMISSION_INPUT_FORMAT, getEmissionInputFormat),
        takeLatest(ActionTypes.ADD_STATIONARY_COMBUSTION, addStationaryCombustion),
        takeLatest(ActionTypes.ADD_PURCHASED_ELECTRICITY, addPurchasedElectricity),
        takeLatest(ActionTypes.ADD_MOBILE_COMBUSTION, addMobileCombustion),
        takeLatest(ActionTypes.ADD_TRANSPORTATION_COMBUSTION, addTransportationCombustion),
    ])
}
