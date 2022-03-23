import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';


export function* listFacilities(action) {
  try {
    const response = yield call(request, APIEndpoints.LIST_FACILITIES, {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.LIST_FACILITIES_SUCCESS,
      payload: response.facilities
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_FACILITIES_FAILURE,
      payload: err.message
    })
  }
}

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

export function* listGridRegions(action) {
  try {
    const { countryId } = action.payload
    const response = yield call(request, APIEndpoints.LIST_GRID_REGIONS(countryId), {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.LIST_GRID_REGIONS_SUCCESS,
      payload: response.grid_regions
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_GRID_REGIONS_FAILURE,
      payload: err.message
    })
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.LIST_FACILITIES, listFacilities),
    takeLatest(ActionTypes.GET_INDUSTRY_TYPES, getIndustryTypes),
    takeLatest(ActionTypes.GET_COUNTRY_LIST, getCountryList),
    takeLatest(ActionTypes.LIST_GRID_REGIONS, listGridRegions),
  ])
}
