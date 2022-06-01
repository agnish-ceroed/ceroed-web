import { all, put, call, takeLatest } from "redux-saga/effects";

import { request } from "../../services/client";
import { ActionTypes } from "../constants/actions";
import { APIEndpoints } from "../constants";

export function* getReportList({ payload }) {
  try {
    const response = yield call(
      request,
      APIEndpoints.LIST_REPORTS(payload.year),
      {
        method: "GET",
      }
    );
    yield put({
      type: ActionTypes.GET_ALL_REPORTS_SUCCESS,
      payload: response.reports,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_ALL_REPORTS_FAILURE,
      payload: err.message,
    });
  }
}

export function* getReportDetails({ payload }) {
  try {
    const response = yield call(
      request,
      APIEndpoints.GET_REPORT_DETAILS(payload.id),
      {
        method: "GET",
      }
    );
    yield put({
      type: ActionTypes.GET_REPORT_DETAILS_SUCCESS,
      payload: response.report,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_REPORT_DETAILS_FAILURE,
      payload: err.message,
    });
  }
}

export function* deleteReport({ payload }) {
  try {
    const response = yield call(
      request,
      APIEndpoints.GET_REPORT_DETAILS(payload.id),
      {
        method: "DELETE",
      }
    );
    yield put({
      type: ActionTypes.DELETE_REPORT_SUCCESS,
      payload: response.report,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.DELETE_REPORT_FAILURE,
      payload: err.message,
    });
  }
}

export function* createReport({ payload }) {
  try {
    const response = yield call(request, APIEndpoints.CREATE_REPORT, {
      method: "POST",
      payload,
    });
    yield put({
      type: ActionTypes.GET_ALL_REPORTS,
      payload: { year: "" },
    });
    yield put({
      type: ActionTypes.CREATE_REPORT_SUCCESS,
      payload: response.report,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.CREATE_REPORT_FAILURE,
      payload: err.message,
    });
  }
}

export function* updateReport({ payload }) {
  try {
    const { framework_id, name, year, topic_id } = payload;
    const response = yield call(
      request,
      APIEndpoints.UPDATE_REPORT(payload.id),
      {
        method: "PUT",
        payload: {
          framework_id,
          name,
          year,
          topic_id,
        },
      }
    );
    yield put({
      type: ActionTypes.GET_REPORT_DETAILS,
      payload: { id: payload.id },
    });
    yield put({
      type: ActionTypes.UPDATE_REPORT_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.UPDATE_REPORT_FAILURE,
      payload: err.message,
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_ALL_REPORTS, getReportList),
    takeLatest(ActionTypes.GET_REPORT_DETAILS, getReportDetails),
    takeLatest(ActionTypes.DELETE_REPORT, deleteReport),
    takeLatest(ActionTypes.CREATE_REPORT, createReport),
    takeLatest(ActionTypes.UPDATE_REPORT, updateReport),
  ]);
}
