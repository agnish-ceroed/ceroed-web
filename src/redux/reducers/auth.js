import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'
import _ from 'lodash';

import { ActionTypes, STATUS } from '../constants'
import { parseError } from '../../services/client';

export const userState = {
  isAuthenticated: false,
  status: STATUS.IDLE,
  authParams: {},
  userInfo: {},
  message: ''
}

export default {
  user: handleActions(
    {
      [ActionTypes.USER_LOGIN]: (state, { payload }) =>
        immutable(state, {
          userInfo: { $set: payload },
          status: { $set: STATUS.RUNNING }
        }),
      [ActionTypes.USER_LOGIN_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          isAuthenticated: { $set: true },
          userInfo: { $set: payload },
          status: { $set: STATUS.READY }
        }),
      [ActionTypes.USER_LOGIN_FAILURE]: (state, { payload }) =>
        immutable(state, {
          isAuthenticated: { $set: false },
          message: { $set: parseError(payload) },
          status: { $set: STATUS.ERROR }
        }),
    },
    userState
  )
}