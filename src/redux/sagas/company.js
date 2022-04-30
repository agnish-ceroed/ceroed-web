import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

export function* getCompanyList(action) {
  try {
    const response = yield call(request, APIEndpoints.LIST_COMPANIES, {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.GET_COMPANY_LIST_SUCCESS,
      payload: response.companies
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_COMPANY_LIST_FAILURE,
      payload: err.message
    })
  }
}

export function* getCompanyDetails(action) {
  try {
    const { companyId } = action.payload
    const response = yield call(request, APIEndpoints.GET_COMPANY_DETAILS(companyId), {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.GET_COMPANY_DETAILS_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_COMPANY_DETAILS_FAILURE,
      payload: err.message
    })
  }
}

export function* getCompanyAuditHistory(action) {
  try {
    const { companyId } = action.payload
    const response = yield call(request, APIEndpoints.GET_COMPANY_AUDIT_HISTORY(companyId), {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.GET_COMPANY_AUDIT_HISTORY_SUCCESS,
      payload: response.company_audit_history
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_COMPANY_AUDIT_HISTORY_FAILURE,
      payload: err.message
    })
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_COMPANY_LIST, getCompanyList),
    takeLatest(ActionTypes.GET_COMPANY_DETAILS, getCompanyDetails),
    takeLatest(ActionTypes.GET_COMPANY_AUDIT_HISTORY, getCompanyAuditHistory),
  ])
}
