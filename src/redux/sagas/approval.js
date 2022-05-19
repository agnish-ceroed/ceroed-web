import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

/**
 * Login
 */
export function* getApprovalSummaryList(action) {
    try {
        const response = yield call(request, APIEndpoints.GET_APPROVAL_SUMMARY(action.payload.year, action.payload.facility), {
            method: 'GET'
        })
        yield put({
            type: ActionTypes.GET_APPROVAL_SUMMARY_SUCCESS,
            payload: response.monthly_approval_status
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.GET_APPROVAL_SUMMARY_FAILURE,
            payload: err.error
        })
    }
}

export function* getApprovalDetails(action) {
    try {
        const response = yield call(request, APIEndpoints.GET_APPROVAL_DETAILS(action.payload.year), {
            method: 'GET'
        })
        yield put({
            type: ActionTypes.GET_APPROVAL_DETAILS_SUCCESS,
            payload: response.audit_status_detail
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.GET_APPROVAL_DETAILS_FAILURE,
            payload: err.error
        })
    }
}

export function* getApprovalMonthlyDetails(action) {
    try {
        const response = yield call(request, APIEndpoints.GET_APPROVAL_MONTHLY_DETAILS, {
            method: 'GET',
            payload: {
                monthly_approval_status_id: action.payload.id,
                year: action.payload.year,
                facility_id: action.payload.facility,
                month: action.payload.month,
            }
        })
        yield put({
            type: ActionTypes.GET_APPROVAL_MONTHLY_DETAILS_SUCCESS,
            payload: response
        })
    } catch (err) {
        yield put({
            type: ActionTypes.GET_APPROVAL_MONTHLY_DETAILS_FAILURE,
            payload: err.error
        })
    }
}

export function* getApprovalMonthlySummary(action) {
    try {
        const response = yield call(request, APIEndpoints.GET_APPROVAL_MONTHLY_SUMMARY, {
            method: 'GET',
            payload: {
                monthly_approval_status_id: action.payload.id,
                year: action.payload.year,
                facility_id: action.payload.facility,
                month: action.payload.month,
            }
        })
        yield put({
            type: ActionTypes.GET_APPROVAL_MONTHLY_SUMMARY_SUCCESS,
            payload: response.monthly_approval_summary
        })
    } catch (err) {
        yield put({
            type: ActionTypes.GET_APPROVAL_MONTHLY_SUMMARY_FAILURE,
            payload: err.error
        })
    }
}


export default function* root() {
    yield all([
        takeLatest(ActionTypes.GET_APPROVAL_SUMMARY, getApprovalSummaryList),
        takeLatest(ActionTypes.GET_APPROVAL_DETAILS, getApprovalDetails),
        takeLatest(ActionTypes.GET_APPROVAL_MONTHLY_DETAILS, getApprovalMonthlyDetails),
        takeLatest(ActionTypes.GET_APPROVAL_MONTHLY_SUMMARY, getApprovalMonthlySummary),

    ])
}
