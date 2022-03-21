import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

export function* addFacility(action) {
    try {
        const { name, phone, country } = action.payload
        const response = yield call(request, APIEndpoints.ADD_FACILITY, {
            method: 'POST',
            payload: { name, phone, country }
        })
        yield put({
            type: ActionTypes.ADD_FACILITY_SUCCESS,
            payload: response.facilities
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_FACILITY_FAILURE,
            payload: err.message
        })
    }
}

export function* getFacility(action) {
    try {
        const { facilityId } = action.payload
        const response = yield call(request, APIEndpoints.GET_FACILITY(facilityId), {
            method: 'GET',
        })
        yield put({
            type: ActionTypes.GET_FACILITY_SUCCESS,
            payload: response.facility
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.GET_FACILITY_FAILURE,
            payload: err.message
        })
    }
}

export function* editFacility(action) {
    try {
        const { facilityId, name, phone, country } = action.payload
        const response = yield call(request, APIEndpoints.EDIT_FACILITY(facilityId), {
            method: 'PUT',
            payload: { name, phone, country }
        })
        yield put({
            type: ActionTypes.EDIT_FACILITY_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.EDIT_FACILITY_FAILURE,
            payload: err.message
        })
    }
}

export function* deleteFacility(action) {
    try {
        const { facilityId } = action.payload
        const response = yield call(request, APIEndpoints.DELETE_FACILITY(facilityId), {
            method: 'DELETE',
        })
        yield put({
            type: ActionTypes.DELETE_FACILITY_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.DELETE_FACILITY_FAILURE,
            payload: err.message
        })
    }
}

export default function* root() {
    yield all([
        takeLatest(ActionTypes.ADD_FACILITY, addFacility),
        takeLatest(ActionTypes.GET_FACILITY, getFacility),
        takeLatest(ActionTypes.EDIT_FACILITY, editFacility),
        takeLatest(ActionTypes.DELETE_FACILITY, deleteFacility),
    ])
}
