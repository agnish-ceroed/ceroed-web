import { all, put, call, takeLatest } from "redux-saga/effects";

import { request } from "../../services/client";
import { ActionTypes } from "../constants/actions";
import { APIEndpoints } from "../constants";

/**
 * Login
 */
export function* getAuditSummaryList() {
  try {
    const response = yield call(request, APIEndpoints.GET_AUDIT_SUMMARY, {
      method: "GET",
    });
    yield put({
      type: ActionTypes.GET_AUDIT_SUMMARY_SUCCESS,
      payload: response.company_audit_history,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_AUDIT_SUMMARY_FAILURE,
      payload: err.error,
    });
  }
}

export function* getYearlyAuditSummary({ payload }) {
  try {
    const { year, statusId } = payload;
    const apiEndpoint = year
      ? APIEndpoints.GET_YEARLY_AUDIT_SUMMARY(year)
      : APIEndpoints.GET_AUDIT_SUMMARY_BY_ID(statusId);
    const response = yield call(request, apiEndpoint, {
      method: "GET",
    });
    yield put({
      type: ActionTypes.GET_YEARLY_AUDIT_SUMMARY_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_YEARLY_AUDIT_SUMMARY_FAILURE,
      payload: err.error,
    });
  }
}

export function* getYearlyAuditSummaryOverview({ payload }) {
  try {
    const response = yield call(
      request,
      APIEndpoints.GET_YEARLY_AUDIT_SUMMARY_OVERVIEW(payload.year),
      {
        method: "GET",
      }
    );
    yield put({
      type: ActionTypes.GET_YEARLY_AUDIT_SUMMARY_OVERVIEW_SUCCESS,
      payload: response.yearly_audit_summary,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_YEARLY_AUDIT_SUMMARY_OVERVIEW_FAILURE,
      payload: err.error,
    });
  }
}

export function* getAllquestions({ payload }) {
  try {
    const apiEndpoint = payload.isAuditor
      ? APIEndpoints.GET_ALL_AUDITOR_QUESTIONS(payload)
      : APIEndpoints.GET_ALL_QUESTIONS(payload);
    const response = yield call(request, apiEndpoint, {
      method: "GET",
    });
    yield put({
      type: ActionTypes.GET_ALL_QUESTIONS_SUCCESS,
      payload: response.response,
    });
  } catch (err) {
    yield put({
      type: ActionTypes.GET_ALL_QUESTIONS_FAILURE,
      payload: err.error,
    });
  }
}

export function* getYearlyAuditStatusSummaryOverview({ payload }) {
  try {
    const response = yield call(
      request,
      APIEndpoints.GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW(payload.companyId),
      {
        method: "GET",
        payload: {
          company_id: payload.companyId,
          audit_status_id: payload.auditId,
        },
      }
    );
    yield put({
      type: ActionTypes.GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW_SUCCESS,
      payload: response.yearly_audit_summary,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW_FAILURE,
      payload: err.error,
    });
  }
}

export function* requestAudit({ payload }) {
  try {
    const response = yield call(
      request,
      APIEndpoints.REQUEST_AUDIT(payload.audit_status_id),
      {
        method: "POST",
        payload: { auditor_id: payload.auditor_id },
      }
    );

    yield put({
      type: ActionTypes.REQUEST_AUDIT_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.REQUEST_AUDIT_FAILURE,
      payload: err.error,
    });
  }
}

export function* answerQualitativeQuestion({ payload }) {
  try {
    const apiEndpoint = APIEndpoints.ANSWER_QUALITATIVE_QUESTION(
      payload.audit_status_id
    );
    delete payload.audit_status_id;
    const response = yield call(request, apiEndpoint, {
      method: "POST",
      payload,
    });

    yield put({
      type: ActionTypes.ANSWER_QUALITATIVE_QUESTION_SUCCESS,
      payload: {...response, ...{answer: payload.answer, answer_flag: true}},
    });

    yield put({
      type: ActionTypes.RESET_QUESTION_ANSWER_STATUS,
      payload: {},
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.ANSWER_QUALITATIVE_QUESTION_FAILURE,
      payload: err.error,
    });
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.RESET_QUESTION_ANSWER_STATUS,
      payload: {},
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_AUDIT_SUMMARY, getAuditSummaryList),
    takeLatest(ActionTypes.GET_YEARLY_AUDIT_SUMMARY, getYearlyAuditSummary),
    takeLatest(ActionTypes.GET_YEARLY_AUDIT_SUMMARY_OVERVIEW, getYearlyAuditSummaryOverview),
    takeLatest(ActionTypes.GET_ALL_QUESTIONS, getAllquestions),
    takeLatest(ActionTypes.GET_YEARLY_AUDIT_SUMMARY_OVERVIEW, getYearlyAuditSummaryOverview),
    takeLatest(ActionTypes.GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW, getYearlyAuditStatusSummaryOverview),
    takeLatest(ActionTypes.REQUEST_AUDIT, requestAudit),
    takeLatest(
      ActionTypes.ANSWER_QUALITATIVE_QUESTION,
      answerQualitativeQuestion
    ),
  ]);
}
