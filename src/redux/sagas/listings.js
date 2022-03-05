import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

/**
 * Login
 */
export function* getIndustryTypes(action) {
  try {
    const response = yield call(request, APIEndpoints.GET_INDUSTRY_TYPES, {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.GET_INDUSTRY_TYPES_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_INDUSTRY_TYPES_FAILURE,
      payload: err.message
    })
  }
}

export function* getCountryList(action) {
    try {
      const response = yield call(request, APIEndpoints.GET_COUNTRY_LIST, {
        method: 'GET',
      })
      yield put({
        type: ActionTypes.GET_COUNTRY_LIST_SUCCESS,
        payload: response.countries
      })
    } catch (err) {
      /* istanbul ignore next */
      yield put({
        type: ActionTypes.GET_COUNTRY_LIST_FAILURE,
        payload: err.message
      })
    }
  }

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_INDUSTRY_TYPES, getIndustryTypes),
    takeLatest(ActionTypes.GET_COUNTRY_LIST, getCountryList),
  ])
}
