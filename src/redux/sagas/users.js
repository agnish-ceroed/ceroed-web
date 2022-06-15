import { all, put, call, takeLatest } from "redux-saga/effects";

import { request } from "../../services/client";
import { ActionTypes } from "../constants/actions";
import { APIEndpoints } from "../constants";

export function* listUsers(action) {
  try {
    const response = yield call(request, APIEndpoints.LIST_USERS, {
      method: "GET",
    });
    yield put({
      type: ActionTypes.LIST_USERS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_USERS_FAILURE,
      payload: err.message,
    });
  }
}

export function* addUser(action) {
  try {
    const { email, role, facility, manager } = action.payload;
    const response = yield call(request, APIEndpoints.ADD_USER, {
      method: "POST",
      payload: { email, role, facility_id: facility, manager_id: manager },
    });
    yield put({
      type: ActionTypes.ADD_USER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.ADD_USER_FAILURE,
      payload: err,
    });
  }
}

export function* getUserDetails(action) {
  try {
    const { userId } = action.payload;
    const response = yield call(request, APIEndpoints.GET_USER(userId), {
      method: "GET",
    });
    yield put({
      type: ActionTypes.GET_USER_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_USER_DETAILS_FAILURE,
      payload: err,
    });
  }
}

export function* editUser(action) {
  try {
    const { userId, email, role, facility, manager } = action.payload;
    const response = yield call(request, APIEndpoints.EDIT_USER(userId), {
      method: "PUT",
      payload: { email, role, facility_id: facility, manager_id: manager },
    });
    yield put({
      type: ActionTypes.EDIT_USER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.EDIT_USER_FAILURE,
      payload: err,
    });
  }
}

export function* deleteUser(action) {
  try {
    const { userId } = action.payload;
    const response = yield call(request, APIEndpoints.DELETE_USER(userId), {
      method: "DELETE",
    });
    yield put({
      type: ActionTypes.DELETE_USER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.DELETE_USER_FAILURE,
      payload: err,
    });
  }
}

export function* confirmEmail(action) {
  try {
    const { userId, code } = action.payload;
    const response = yield call(request, APIEndpoints.SET_EMAIL_CONFIRMED(userId, code), {
      method: "GET",
    });
    yield put({
      type: ActionTypes.SET_EMAIL_CONFIRMED_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.SET_EMAIL_CONFIRMED_FAILURE,
      payload: err?.detail,
    });
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.LIST_USERS, listUsers),
    takeLatest(ActionTypes.ADD_USER, addUser),
    takeLatest(ActionTypes.GET_USER_DETAILS, getUserDetails),
    takeLatest(ActionTypes.EDIT_USER, editUser),
    takeLatest(ActionTypes.DELETE_USER, deleteUser),
    takeLatest(ActionTypes.SET_EMAIL_CONFIRMED, confirmEmail),
  ]);
}
