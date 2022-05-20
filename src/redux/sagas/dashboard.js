import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

export function* getEmissionYear(action) {
  try {
    const { filter } = action.payload
    const response = yield call(request, APIEndpoints.GET_EMISSION_YEAR, {
      method: 'GET',
      payload: filter
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

export function* getEmissionTypes(action) {
  try {
    const { filter } = action.payload
    const response = yield call(request, APIEndpoints.GET_EMISSION_TYPES, {
      method: 'GET',
      payload: filter
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

export function* getEmissionRegion(action) {
  try {
    const { filter } = action.payload
    const response = yield call(request, APIEndpoints.GET_EMISSION_REGION, {
      method: 'GET',
      payload: filter
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

export function* getEmissionsByMonth(action) {
  try {
    const { filter } = action.payload
    const response = yield call(request, APIEndpoints.GET_EMISSIONS_BY_MONTH, {
      method: 'GET',
      payload: filter
    })
    yield put({
      type: ActionTypes.GET_EMISSIONS_BY_MONTH_SUCCESS,
      payload: response.response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_EMISSIONS_BY_MONTH_FAILURE,
      payload: err.message
    })
  }
}

export function* getDashboardStatistics(action) {
  try {
    const { filter } = action.payload
    const response = yield call(request, APIEndpoints.GET_DASHBOARD_STATISTICS, {
      method: 'GET',
      payload: filter
    })
    yield put({
      type: ActionTypes.GET_DASHBOARD_STATISTICS_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_DASHBOARD_STATISTICS_FAILURE,
      payload: err.message
    })
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_EMISSION_YEAR, getEmissionYear),
    takeLatest(ActionTypes.GET_EMISSION_TYPES, getEmissionTypes),
    takeLatest(ActionTypes.GET_EMISSION_REGION, getEmissionRegion),
    takeLatest(ActionTypes.GET_EMISSIONS_BY_MONTH, getEmissionsByMonth),
    takeLatest(ActionTypes.GET_DASHBOARD_STATISTICS, getDashboardStatistics),

  ])
}
