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

export function* getCompanyAuditDetails(action) {
  try {
    const { companyId, auditId, year } = action.payload;
    const payload = {};
    if(year) {
      payload.year = year;
    } else {
      payload.audit_status_id = auditId;
    }
    const response = yield call(request, APIEndpoints.GET_COMPANY_AUDIT_DETAILS(companyId), {
      method: 'GET',
      payload
    })
    yield put({
      type: ActionTypes.GET_COMPANY_AUDIT_DETAILS_SUCCESS,
        payload: response
      })
    } catch (err) {
      /* istanbul ignore next */
      yield put({
        type: ActionTypes.GET_COMPANY_AUDIT_DETAILS_FAILURE,
        payload: err.message
      })
    }
  }

export function* getDashboardSummary(action) {
  try {
    console.log('action.payload.filter', action.payload.filter);
    const response = yield call(request, APIEndpoints.GET_DASHBOARD_SUMMARY, {
      method: 'GET',
      payload: action.payload.filter,
    })
    yield put({
      type: ActionTypes.GET_DASHBOARD_SUMMARY_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_DASHBOARD_SUMMARY_FAILURE,
      payload: err.message
    })
  }
}

export function* approveCompanyAudit(action) {
  try {
      const { auditId, company } = action.payload
      const response = yield call(request, APIEndpoints.APPROVE_COMPANY_AUDIT(company, auditId), {
          method: 'POST',
          payload: { audit_status_id: auditId, company_id: company}
      })
      yield put({
          type: ActionTypes.APPROVE_COMPANY_AUDIT_SUCCESS,
          payload: response,
      })
  } catch (err) {
      /* istanbul ignore next */
      yield put({
          type: ActionTypes.APPROVE_COMPANY_AUDIT_FAILURE,
          payload: err
      })
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_COMPANY_LIST, getCompanyList),
    takeLatest(ActionTypes.GET_COMPANY_DETAILS, getCompanyDetails),
    takeLatest(ActionTypes.GET_COMPANY_AUDIT_HISTORY, getCompanyAuditHistory),
    takeLatest(ActionTypes.GET_COMPANY_AUDIT_DETAILS, getCompanyAuditDetails),
    takeLatest(ActionTypes.APPROVE_COMPANY_AUDIT, approveCompanyAudit),
    takeLatest(ActionTypes.GET_DASHBOARD_SUMMARY, getDashboardSummary),
  ])
}
