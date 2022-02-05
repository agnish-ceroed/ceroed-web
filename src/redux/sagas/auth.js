import { all, put, call, takeLatest, select } from 'redux-saga/effects'

import { setCookie, getCookie, deleteCookie } from '../../services/cookie'
import { request } from '../../services/client'
import { APIEndpoints, ActionTypes } from '../constants'

/**
 * Login
 */
export function* login(action) {
  try {
    const { email, password } = action.payload
    const authParams = yield select(state => state.user.authParams)
    const response = yield call(request, APIEndpoints.LOGIN, {
      method: 'POST',
      payload: { email, password, ...authParams }
    })
    yield setCookie('auth_token_admin', response.access_token, { days: 60 })
    yield setCookie('refresh_token_admin', response.refresh_token, { days: 60 })
    yield setCookie('last_refresh_time_admin', new Date().getTime(), { days: 60 })
    yield put({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_LOGIN_FAILURE,
      payload: err.error
    })
  }
}

export function* getForgotPasswordOtp(action) {
  try {
    const { email } = action.payload
    const response = yield call(request, APIEndpoints.FORGOT_PASSWORD, {
      method: 'POST',
      payload: { email }
    })
    yield put({
      type: ActionTypes.GET_FORGOT_PASSWORD_OTP_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_FORGOT_PASSWORD_OTP_FAILURE,
      payload: err.error
    })
  }
}

export function* verifyForgotPasswordOtp(action) {
  try {
    const { otp } = action.payload
    const response = yield call(request, APIEndpoints.VERIFY_OTP, {
      method: 'POST',
      payload: { otp }
    })
    yield put({
      type: ActionTypes.VERIFY_FORGOT_PASSWORD_OTP_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.VERIFY_FORGOT_PASSWORD_OTP_FAILURE,
      payload: err.error
    })
  }
}

export function* changePassword(action) {
  try {
    const { password } = action.payload
    const response = yield call(request, APIEndpoints.CHANGE_PASSWORD, {
      method: 'POST',
      payload: { password }
    })
    yield put({
      type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.CHANGE_PASSWORD_FAILURE,
      payload: err.error
    })
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.USER_LOGIN, login),
    takeLatest(ActionTypes.GET_FORGOT_PASSWORD_OTP, getForgotPasswordOtp),
    takeLatest(ActionTypes.VERIFY_FORGOT_PASSWORD_OTP, verifyForgotPasswordOtp),
    takeLatest(ActionTypes.CHANGE_PASSWORD, changePassword)
  ])
}
