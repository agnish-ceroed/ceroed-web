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

export function* getApprovalMonthlyDetails({payload}) {
  const requestPayload = {
  }
  if(payload.id) {
    requestPayload.monthly_approval_status_id = payload.id
  }
  if(payload.year && payload.year !== 'null') {
    requestPayload.year = payload.year
  }
  if(payload.facility) {
    requestPayload.facility_id = payload.facility
  }
  if(payload.month) {
    requestPayload.month = payload.month
  }
    try {
        const response = yield call(request, APIEndpoints.GET_APPROVAL_MONTHLY_DETAILS, {
            method: 'GET',
            payload: requestPayload
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

export function* getApprovalMonthlySummary({payload}) {
  const requestPayload = {}
    if(payload.id) {
      requestPayload.monthly_approval_status_id = payload.id
    }
    if(payload.year && payload.year !== 'null') {
      requestPayload.year = payload.year
    }
    if(payload.facility) {
      requestPayload.facility_id = payload.facility
    }
    if(payload.month) {
      requestPayload.month = payload.month
    }
    try {
        const response = yield call(request, APIEndpoints.GET_APPROVAL_MONTHLY_SUMMARY, {
            method: 'GET',
            payload: requestPayload
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

export function* submitApproval({payload}) {
    try {
      const response = yield call(
        request,
        APIEndpoints.SUBMIT_APPROVAL(payload.statusId),
        {
          method: "POST",
          payload: { submit_user_id: payload.userId },
        }
      );
  
      yield put({
        type: ActionTypes.SUBMIT_APPROVAL_SUCCESS,
        payload: response,
      });
    } catch (err) {
      /* istanbul ignore next */
      yield put({
        type: ActionTypes.SUBMIT_APPROVAL_FAILURE,
        payload: err.error,
      });
    }
  }

export function* requestApproval({payload}) {
    try {
      const response = yield call(
        request,
        APIEndpoints.REQUEST_APPROVAL(payload.statusId),
        {
          method: "POST",
          payload: { approve_user_id: payload.userId },
        }
      );
  
      yield put({
        type: ActionTypes.REQUEST_APPROVAL_SUCCESS,
        payload: response,
      });
    } catch (err) {
      /* istanbul ignore next */
      yield put({
        type: ActionTypes.REQUEST_APPROVAL_FAILURE,
        payload: err.error,
      });
    }
  }

export function* approveRequest({payload}) {
    try {
      const response = yield call(
        request,
        APIEndpoints.APPROVE_REQUEST(payload.statusId),
        {
          method: "POST",
          payload: { comment: payload.comment },
        }
      );
  
      yield put({
        type: ActionTypes.APPROVE_REQUEST_SUCCESS,
        payload: response,
      });
    } catch (err) {
      /* istanbul ignore next */
      yield put({
        type: ActionTypes.APPROVE_REQUEST_FAILURE,
        payload: err.error,
      });
    }
  }


export default function* root() {
    yield all([
        takeLatest(ActionTypes.GET_APPROVAL_SUMMARY, getApprovalSummaryList),
        takeLatest(ActionTypes.GET_APPROVAL_DETAILS, getApprovalDetails),
        takeLatest(ActionTypes.GET_APPROVAL_MONTHLY_DETAILS, getApprovalMonthlyDetails),
        takeLatest(ActionTypes.GET_APPROVAL_MONTHLY_SUMMARY, getApprovalMonthlySummary),
        takeLatest(ActionTypes.SUBMIT_APPROVAL, submitApproval),
        takeLatest(ActionTypes.REQUEST_APPROVAL, requestApproval),
        takeLatest(ActionTypes.APPROVE_REQUEST, approveRequest),

    ])
}
