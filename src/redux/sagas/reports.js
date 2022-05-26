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

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_ALL_REPORTS, getReportList),
    takeLatest(ActionTypes.GET_REPORT_DETAILS, getReportDetails),
  ]);
}
