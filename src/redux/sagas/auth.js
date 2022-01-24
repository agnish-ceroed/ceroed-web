import { all, put, call, takeLatest, select } from 'redux-saga/effects'

import { setCookie, getCookie, deleteCookie } from '../../services/cookie'
import { request } from '../../services/client'
import { APIEndpoints, ActionTypes } from '../constants'

/**
 * Login
 */
export function * login (action) {
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

export default function * root () {
    yield all([
      takeLatest(ActionTypes.USER_LOGIN, login),
    ])
  }