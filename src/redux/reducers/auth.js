import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const userState = {
  isAuthenticated: false,
  status: STATUS.IDLE,
  authParams: {},
  userInfo: {},
  role: '',
  message: '',
  refreshStatus: STATUS.RUNNING,
  logoutStatus: STATUS.IDLE,
  forgot: {
    data: {},
    status: STATUS.IDLE,
    message: ''
  },
  resetPassword: {
    data: {},
    status: STATUS.IDLE,
    message: ''
  },
  changeUserPassword: {
    data: {},
    status: STATUS.IDLE,
    message: ''
  },
  signup: {
    data: {},
    status: STATUS.IDLE,
    message: ''
  },
}

const authActions = {
  auth: handleActions(
    {
      [ActionTypes.USER_LOGIN]: (state, { payload }) =>
        immutable(state, {
          userInfo: { $set: payload },
          status: { $set: STATUS.RUNNING }
        }),
      [ActionTypes.USER_LOGIN_SUCCESS]: (state, { payload, role }) =>
        immutable(state, {
          isAuthenticated: { $set: true },
          userInfo: { $set: payload },
          status: { $set: STATUS.SUCCESS },
          role: { $set: role }
        }),
      [ActionTypes.USER_LOGIN_FAILURE]: (state, { payload }) =>
        immutable(state, {
          isAuthenticated: { $set: false },
          message: { $set: parseError(payload) },
          status: { $set: STATUS.ERROR }
        }),

      [ActionTypes.GET_FORGOT_PASSWORD_OTP]: (state, { payload }) =>
        immutable(state, {
          forgot: {
            status: { $set: STATUS.RUNNING }
          }
        }),
      [ActionTypes.GET_FORGOT_PASSWORD_OTP_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          forgot: {
            data: { $set: payload },
            status: { $set: STATUS.SUCCESS }
          }
        }),
      [ActionTypes.GET_FORGOT_PASSWORD_OTP_FAILURE]: (state, { payload }) =>
        immutable(state, {
          forgot: {
            status: { $set: STATUS.ERROR },
            message: { $set: payload }
          }
        }),

      [ActionTypes.RESET_PASSWORD]: (state, { payload }) =>
        immutable(state, {
          resetPassword: {
            status: { $set: STATUS.RUNNING }
          }
        }),
      [ActionTypes.RESET_PASSWORD_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          resetPassword: {
            data: { $set: payload },
            status: { $set: STATUS.SUCCESS }
          }
        }),
      [ActionTypes.RESET_PASSWORD_FAILURE]: (state, { payload }) =>
        immutable(state, {
          resetPassword: {
            status: { $set: STATUS.ERROR },
            message: { $set: payload }
          }
        }),

      [ActionTypes.CHANGE_PASSWORD]: (state, { payload }) =>
        immutable(state, {
          changeUserPassword: {
            status: { $set: STATUS.RUNNING }
          }
        }),
      [ActionTypes.CHANGE_PASSWORD_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          changeUserPassword: {
            data: { $set: payload },
            status: { $set: STATUS.READY }
          }
        }),
      [ActionTypes.CHANGE_PASSWORD_FAILURE]: (state, { payload }) =>
        immutable(state, {
          changePassword: {
            status: { $set: STATUS.ERROR },
            message: { $set: payload }
          }
        }),

      [ActionTypes.USER_SIGN_UP]: (state, { payload }) =>
        immutable(state, {
          signup: {
            status: { $set: STATUS.RUNNING }
          }
        }),
      [ActionTypes.USER_SIGN_UP_SUCCESS]: (state, { payload, role }) =>
        immutable(state, {
          signup: {
            data: { $set: payload },
            status: { $set: STATUS.SUCCESS }
          },
          isAuthenticated: { $set: true },
          userInfo: { $set: payload },
          role: { $set: role }
        }),

      [ActionTypes.USER_SIGN_UP_FAILURE]: (state, { payload }) =>
        immutable(state, {
          signup: {
            status: { $set: STATUS.ERROR },
            message: { $set: payload }
          }
        }),

      [ActionTypes.RESET_FORGOT_STATUS]: (state, { payload }) =>
        immutable(state, {
          forgot: {
            status: { $set: STATUS.IDLE },
            message: {}
          },
          resetPassword: {
            status: { $set: STATUS.IDLE },
            message: {}
          }
        }),

      [ActionTypes.REFRESH_TOKEN]: state =>
        immutable(state, {
          refreshStatus: { $set: STATUS.RUNNING }
        }),
      [ActionTypes.REFRESH_TOKEN_SUCCESS]: (state) =>
        immutable(state, {
          refreshStatus: { $set: STATUS.SUCCESS },
        }),
      [ActionTypes.REFRESH_TOKEN_FAILURE]: state =>
        immutable(state, {
          refreshStatus: { $set: STATUS.ERROR }
        }),

      [ActionTypes.USER_LOGOUT]: state =>
        immutable(state, {
          logoutStatus: { $set: STATUS.RUNNING }
        }),
      [ActionTypes.USER_LOGOUT_SUCCESS]: state =>
        immutable(state, {
          isAuthenticated: { $set: false },
          userInfo: { $set: {} },
          status: { $set: STATUS.IDLE },
          logoutStatus: { $set: STATUS.SUCCESS },
          forgot: {
            status: { $set: STATUS.IDLE },
            data: { $set: {} }
          },
        }),
      [ActionTypes.USER_LOGOUT_FAILURE]: (state, { payload }) =>
        immutable(state, {
          isAuthenticated: { $set: false },
          userInfo: { $set: {} },
          status: { $set: STATUS.IDLE },
          logoutStatus: { $set: STATUS.ERROR }
        }),
    },
    userState
  )
}

export default authActions;
