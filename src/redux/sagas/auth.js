import { all, put, call, takeLatest } from 'redux-saga/effects'

import { deleteCookie, getCookie, setCookie } from '../../services/cookie'
import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

/**
 * Login
 */
export function* login(action) {
  try {
    const { email, password } = action.payload
    let loginFormData = new URLSearchParams();
    loginFormData.append('username', email)
    loginFormData.append('password', password)
    const response = yield call(request, APIEndpoints.LOGIN, {
      method: 'POST',
      isFormData: true,
      payload: loginFormData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    yield setCookie('auth_token_admin', response.access_token)
    yield setCookie('access_token_expiry', response.access_token_expiry)
    yield setCookie('user_details', JSON.stringify(response))
    localStorage.setItem('password', password)
    yield put({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_LOGIN_FAILURE,
      payload: err.message
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
      payload: err
    })
  }
}

export function* resetPassword(action) {
  try {
    const { email, otp, password } = action.payload
    const response = yield call(request, APIEndpoints.RESET_PASSWORD, {
      method: 'POST',
      payload: { email, otp, new_password: password }
    })
    yield put({
      type: ActionTypes.RESET_PASSWORD_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.RESET_PASSWORD_FAILURE,
      payload: err
    })
  }
}

export function* changePassword(action) {
  try {
    const { oldPassword, password } = action.payload
    const response = yield call(request, APIEndpoints.CHANGE_USER_PASSWORD, {
      method: 'POST',
      payload: { oldPassword, password }
    })
    yield put({
      type: ActionTypes.CHANGE_USER_PASSWORD_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.CHANGE_USER_PASSWORD_FAILURE,
      payload: err.error
    })
  }
}

export function* signup(action) {
  try {
    const { signupDetails } = action.payload
    const response = yield call(request, APIEndpoints.SIGN_UP, {
      method: 'POST',
      payload: { ...signupDetails }
    })
    yield setCookie('auth_token_admin', response.access_token)
    yield setCookie('access_token_expiry', response.access_token_expiry)
    yield setCookie('user_details', JSON.stringify(response))
    localStorage.setItem('password', signupDetails.password)
    yield put({
      type: ActionTypes.USER_SIGN_UP_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    console.log(err)
    yield put({
      type: ActionTypes.USER_SIGN_UP_FAILURE,
      payload: err.message
    })
  }
}

export function* refreshToken() {
  try {
    const accessTokenExpiry = parseInt(getCookie('access_token_expiry'))
    const userDetails = JSON.parse(getCookie('user_details'))
    const password = localStorage.getItem('password')
    const now = new Date().getTime()
    console.log(accessTokenExpiry)
    if (accessTokenExpiry > now) {
      // set user as logged in
      yield put({
        type: ActionTypes.USER_LOGIN_SUCCESS,
        payload: userDetails
      })
      yield put({
        type: ActionTypes.REFRESH_TOKEN_SUCCESS
      })
    } else if (accessTokenExpiry < now && password) {
      let loginFormData = new URLSearchParams();
      loginFormData.append('username', userDetails.email)
      loginFormData.append('password', password)
      const response = yield call(request, APIEndpoints.LOGIN, {
        method: 'POST',
        isFormData: true,
        payload: loginFormData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      yield setCookie('auth_token_admin', response.access_token)
      yield setCookie('access_token_expiry', response.access_token_expiry)
      yield setCookie('user_details', JSON.stringify(response))
      yield put({
        type: ActionTypes.USER_LOGIN_SUCCESS,
        payload: response
      })
      yield put({
        type: ActionTypes.REFRESH_TOKEN_SUCCESS
      })
    } else {
      yield deleteCookie('auth_token_admin')
      yield deleteCookie('access_token_expiry')
      yield deleteCookie('user_details')
      yield put({
        type: ActionTypes.REFRESH_TOKEN_FAILURE
      })
    }
  } catch (err) {
    /* istanbul ignore next */
    yield deleteCookie('auth_token_admin')
    yield deleteCookie('access_token_expiry')
    yield deleteCookie('user_details')
    yield put({
      type: ActionTypes.USER_LOGOUT_SUCCESS
    })
  }
}

export function* logout() {
  try {
    const accessToken = getCookie('auth_token_admin')
    if (accessToken) {
      yield call(request, APIEndpoints.LOGOUT, {
        method: 'POST',
        payload: {}
      })
    }
    yield deleteCookie('auth_token_admin')
    yield deleteCookie('access_token_expiry')
    yield put({
      type: ActionTypes.USER_LOGOUT_SUCCESS
    })
  } catch (err) {
    /* istanbul ignore next */
    yield deleteCookie('auth_token_admin')
    yield deleteCookie('access_token_expiry')
    yield put({
      type: ActionTypes.USER_LOGOUT_FAILURE,
      payload: err
    })
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.USER_LOGIN, login),
    takeLatest(ActionTypes.GET_FORGOT_PASSWORD_OTP, getForgotPasswordOtp),
    takeLatest(ActionTypes.RESET_PASSWORD, resetPassword),
    takeLatest(ActionTypes.USER_SIGN_UP, signup),
    takeLatest(ActionTypes.REFRESH_TOKEN, refreshToken),
    takeLatest(ActionTypes.CHANGE_PASSWORD, changePassword),
  ])
}
