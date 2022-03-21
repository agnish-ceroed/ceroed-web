import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

/**
 * Login
 */
export function* getAccountDetails(action) {
    try {
        const response = yield call(request, APIEndpoints.GET_ACCOUNT_DETAILS, {
            method: 'GET'
        })
        yield put({
            type: ActionTypes.GET_ACCOUNT_DETAILS_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.GET_ACCOUNT_DETAILS_FAILURE,
            payload: err.error
        })
    }
}

export function* updateAccountDetails(action) {
    try {
        const { name, email } = action.payload
        const response = yield call(request, APIEndpoints.UPDATE_ACCOUNT_DETAILS, {
            method: 'PUT',
            payload: { name, email }
        })
        yield put({
            type: ActionTypes.UPDATE_ACCOUNT_DETAILS_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.UPDATE_ACCOUNT_DETAILS_FAILURE,
            payload: err
        })
    }
}

export function* getCompanyDetails(action) {
    try {
        const response = yield call(request, APIEndpoints.GET_COMPANY_DETAILS, {
            method: 'GET'
        })
        yield put({
            type: ActionTypes.GET_COMPANY_DETAILS_SUCCESS,
            payload: response.company
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.GET_COMPANY_DETAILS_FAILURE,
            payload: err.error
        })
    }
}

export function* updateCompanyDetails(action) {
    try {
        const { name, email, phone, website } = action.payload
        const response = yield call(request, APIEndpoints.UPDATE_COMPANY_DETAILS, {
            method: 'PUT',
            payload: { name, email, phone, website }
        })
        yield put({
            type: ActionTypes.UPDATE_COMPANY_DETAILS_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.UPDATE_COMPANY_DETAILS_FAILURE,
            payload: err
        })
    }
}

export default function* root() {
    yield all([
        takeLatest(ActionTypes.GET_ACCOUNT_DETAILS, getAccountDetails),
        takeLatest(ActionTypes.UPDATE_ACCOUNT_DETAILS, updateAccountDetails),
        takeLatest(ActionTypes.GET_COMPANY_DETAILS, getCompanyDetails),
        takeLatest(ActionTypes.UPDATE_COMPANY_DETAILS, updateCompanyDetails),
    ])
}
