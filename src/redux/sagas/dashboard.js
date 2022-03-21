import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';


export function* getEmissionYear() {
  try {
      
    const response = yield call(request, APIEndpoints.GET_EMISSION_YEAR, {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.GET_EMISSION_YEAR_SUCCESS,
      payload: response.response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_EMISSION_YEAR_FAILURE,
      payload: err.message
    })
  }
}

export function* getEmissionTypes() {
  try {
      
    const response = yield call(request, APIEndpoints.GET_EMISSION_TYPES, {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.GET_EMISSION_TYPES_SUCCESS,
      payload: response.response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_EMISSION_TYPES_FAILURE,
      payload: err.message
    })
  }
}

export function* getEmissionRegion() {
  try {
      
    const response = yield call(request, APIEndpoints.GET_EMISSION_REGION, {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.GET_EMISSION_REGION_SUCCESS,
      payload: response.response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_EMISSION_REGION_FAILURE,
      payload: err.message
    })
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_EMISSION_YEAR, getEmissionYear),
    takeLatest(ActionTypes.GET_EMISSION_TYPES, getEmissionTypes),
    takeLatest(ActionTypes.GET_EMISSION_REGION, getEmissionRegion),
  ])
}
