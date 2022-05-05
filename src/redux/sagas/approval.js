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

export default function* root() {
    yield all([
        takeLatest(ActionTypes.GET_APPROVAL_SUMMARY, getApprovalSummaryList),
    ])
}
