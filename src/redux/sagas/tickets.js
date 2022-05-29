import { all, put, call, takeLatest } from "redux-saga/effects";

import { request } from "../../services/client";
import { ActionTypes } from "../constants/actions";
import { APIEndpoints } from "../constants";

export function* createTicket({ payload }) {
  try {
    const {
      title,
      description,
      assigned_to_id,
      ticket_scope,
      ticket_scope_id,
    } = payload;
    const response = yield call(request, APIEndpoints.CREATE_TICKET, {
      method: "POST",
      payload: {
        title,
        description,
        assigned_to_id,
        ticket_scope,
        ticket_scope_id,
      },
    });
    yield put({
      type: ActionTypes.CREATE_TICKET_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.CREATE_TICKET_FAILURE,
      payload: err,
    });
  }
}

export function* closeTicket({ payload }) {
  try {
    const response = yield call(request, APIEndpoints.CLOSE_TICKET(payload), {
      method: "POST",
      payload,
    });
    yield put({
      type: ActionTypes.CLOSE_TICKET_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.CLOSE_TICKET_FAILURE,
      payload: err,
    });
  }
}

export function* deleteTicket({ payload }) {
  try {
    const response = yield call(
      request,
      APIEndpoints.GET_TICKET_DETAILS(payload),
      {
        method: "DELETE",
        payload,
      }
    );
    yield put({
      type: ActionTypes.DELETE_TICKET_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.DELETE_TICKET_FAILURE,
      payload: err,
    });
  }
}

export function* listTickets({ payload }) {
  try {
    const response = yield call(request, APIEndpoints.LIST_TICKETS(payload), {
      method: "GET",
    });
    yield put({
      type: ActionTypes.LIST_TICKETS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_TICKETS_FAILURE,
      payload: err,
    });
  }
}

export function* getTicketDetails({ payload }) {
  try {
    const response = yield call(
      request,
      APIEndpoints.GET_TICKET_DETAILS(payload),
      {
        method: "GET",
      }
    );
    yield put({
      type: ActionTypes.GET_TICKET_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_TICKET_DETAILS_FAILURE,
      payload: err,
    });
  }
}

export function* addResponse({ payload }) {
  try {
    const response = yield call(request, APIEndpoints.ADD_RESPONSE(payload), {
      method: "POST",
      payload: {
        response: payload.response,
      },
    });
    yield put({
      type: ActionTypes.ADD_COMMENT_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.ADD_COMMENT_FAILURE,
      payload: err,
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.CREATE_TICKET, createTicket),
    takeLatest(ActionTypes.CLOSE_TICKET, closeTicket),
    takeLatest(ActionTypes.DELETE_TICKET, deleteTicket),
    takeLatest(ActionTypes.LIST_TICKETS, listTickets),
    takeLatest(ActionTypes.GET_TICKET_DETAILS, getTicketDetails),
    takeLatest(ActionTypes.ADD_RESPONSE, addResponse),
  ]);
}
