import { all, put, call, takeLatest } from "redux-saga/effects";

import { request } from "../../services/client";
import { ActionTypes } from "../constants/actions";
import { APIEndpoints } from "../constants";

export function* listFacilities(action) {
  try {
    const response = yield call(request, APIEndpoints.LIST_FACILITIES, {
      method: "GET",
    });
    yield put({
      type: ActionTypes.LIST_FACILITIES_SUCCESS,
      payload: response.facilities,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_FACILITIES_FAILURE,
      payload: err.message,
    });
  }
}

export function* getIndustryTypes(action) {
  try {
    const response = yield call(request, APIEndpoints.GET_INDUSTRY_TYPES, {
      method: "GET",
    });
    yield put({
      type: ActionTypes.GET_INDUSTRY_TYPES_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_INDUSTRY_TYPES_FAILURE,
      payload: err.message,
    });
  }
}

export function* getCountryList(action) {
  try {
    const response = yield call(request, APIEndpoints.GET_COUNTRY_LIST, {
      method: "GET",
    });
    yield put({
      type: ActionTypes.GET_COUNTRY_LIST_SUCCESS,
      payload: response.countries,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_COUNTRY_LIST_FAILURE,
      payload: err.message,
    });
  }
}

export function* getAssigneeList() {
  try {
    const response = yield call(request, APIEndpoints.LIST_ASSIGNEE, {
      method: "GET",
    });
    yield put({
      type: ActionTypes.LIST_ASSIGNEE_SUCCESS,
      payload: response.assignees,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_ASSIGNEE_FAILURE,
      payload: err.message,
    });
  }
}

export function* getFrameworkList() {
  try {
    const response = yield call(request, APIEndpoints.LIST_FRAMEWORK, {
      method: "GET",
    });
    yield put({
      type: ActionTypes.LIST_FRAMEWORK_SUCCESS,
      payload: response.frameworks,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_FRAMEWORK_FAILURE,
      payload: err.message,
    });
  }
}

export function* getTopicList() {
  try {
    const response = yield call(request, APIEndpoints.LIST_TOPIC, {
      method: "GET",
    });
    yield put({
      type: ActionTypes.LIST_TOPIC_SUCCESS,
      payload: response.topics,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_TOPIC_FAILURE,
      payload: err.message,
    });
  }
}

export function* listGridRegions(action) {
  try {
    const { countryId } = action.payload;
    const response = yield call(
      request,
      APIEndpoints.LIST_GRID_REGIONS(countryId),
      {
        method: "GET",
      }
    );
    yield put({
      type: ActionTypes.LIST_GRID_REGIONS_SUCCESS,
      payload: response.grid_regions,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_GRID_REGIONS_FAILURE,
      payload: err.message,
    });
  }
}

export function* getManagerList(action) {
  try {
    const { role, facility_id } = action.payload;
    const response = yield call(
      request,
      APIEndpoints.GET_MANAGER_LIST(role),
      {
        method: "GET",
        payload: { facility_id }
      }
    );
    yield put({
      type: ActionTypes.GET_MANAGER_LIST_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_MANAGER_LIST_FAILURE,
      payload: err.message,
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.LIST_FACILITIES, listFacilities),
    takeLatest(ActionTypes.GET_INDUSTRY_TYPES, getIndustryTypes),
    takeLatest(ActionTypes.GET_COUNTRY_LIST, getCountryList),
    takeLatest(ActionTypes.LIST_ASSIGNEE, getAssigneeList),
    takeLatest(ActionTypes.LIST_FRAMEWORK, getTopicList),
    takeLatest(ActionTypes.LIST_TOPIC, getFrameworkList),
    takeLatest(ActionTypes.LIST_GRID_REGIONS, listGridRegions),
    takeLatest(ActionTypes.GET_MANAGER_LIST, getManagerList),
  ]);
}
