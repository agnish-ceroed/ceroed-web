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

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_COMPANY_LIST, getCompanyList),
  ])
}
