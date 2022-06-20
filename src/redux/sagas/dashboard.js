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

export function* getFacilityTopicEmissionStatistics(action) {
  try {
    const { filter } = action.payload
    const response = yield call(request, APIEndpoints.GET_FACILITY_TOPIC_EMISSION, {
      method: 'GET',
      payload: filter
    })
    yield put({
      type: ActionTypes.GET_FACILITY_TOPIC_EMISSION_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_FACILITY_TOPIC_EMISSION_FAILURE,
      payload: err.message
    })
  }
}

export function* getFuelSourceEmission(action) {
  try {
    const { filter } = action.payload
    const response = yield call(request, APIEndpoints.GET_FUEL_SOURCE_EMISSION, {
      method: 'GET',
      payload: filter
    })
    yield put({
      type: ActionTypes.GET_FUEL_SOURCE_EMISSION_SUCCESS,
      payload: response.response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_FUEL_SOURCE_EMISSION_FAILURE,
      payload: err.message
    })
  }
}

export function* getAllNotifications({payload}) {
  try {
    const { unread, isAuditor } = payload
    const apiEndpoint = isAuditor ? APIEndpoints.LIST_AUDITOR_NOTIFICATIONS(unread) : APIEndpoints.LIST_NOTIFICATIONS(unread)
    const response = yield call(request, apiEndpoint, {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.LIST_NOTIFICATIONS_SUCCESS,
      payload: response.notification_details
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_NOTIFICATIONS_FAILURE,
      payload: err.message
    })
  }
}

export function* markAllRead({payload}) {
  try {
    const { isAuditor, unread } = payload
    const apiEndpoint = isAuditor ? APIEndpoints.MARK_ALL_READ_AUDITOR_NOTIFICATIONS : APIEndpoints.MARK_ALL_READ
    const response = yield call(request, apiEndpoint, {
      method: 'POST',
      payload: {}
    })
    yield put({
      type: ActionTypes.LIST_NOTIFICATIONS,
      payload: {isAuditor, unread}
    })
    yield put({
      type: ActionTypes.MARK_ALL_READ_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.MARK_ALL_READ_FAILURE,
      payload: err.message
    })
  }
}

export function* markAsRead({payload}) {
  try {
    const { isAuditor, unread, id } = payload
    const apiEndpoint = isAuditor ? APIEndpoints.MARK_AS_READ_AUDITOR_NOTIFICATIONS(id) : APIEndpoints.MARK_AS_READ(id)
    const response = yield call(request, apiEndpoint, {
      method: 'POST',
      payload: {}
    })
    yield put({
      type: ActionTypes.LIST_NOTIFICATIONS,
      payload: {isAuditor, unread}
    })
    yield put({
      type: ActionTypes.MARK_AS_READ_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.MARK_AS_READ_FAILURE,
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
    takeLatest(ActionTypes.GET_FACILITY_TOPIC_EMISSION, getFacilityTopicEmissionStatistics),
    takeLatest(ActionTypes.GET_FUEL_SOURCE_EMISSION, getFuelSourceEmission),
    takeLatest(ActionTypes.LIST_NOTIFICATIONS, getAllNotifications),
    takeLatest(ActionTypes.MARK_ALL_READ, markAllRead),
    takeLatest(ActionTypes.MARK_AS_READ, markAsRead),
  ])
}
