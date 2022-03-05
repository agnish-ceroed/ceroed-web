import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
  userLogin,
  userSignUp,
  getForgotPasswordOtp,
  resetPassword,
  changePassword,
  refreshToken,
  userLogout,
  resetForgotStatus,
} = createActions({
  [ActionTypes.USER_LOGIN]: (email, password) => ({ email, password }),
  [ActionTypes.USER_SIGN_UP]: (signupDetails) => ({ signupDetails }),
  [ActionTypes.GET_FORGOT_PASSWORD_OTP]: (email) => ({ email }),
  [ActionTypes.RESET_PASSWORD]: (email, otp, password) => ({ email, otp, password }),
  [ActionTypes.CHANGE_PASSWORD]: (oldPassword, password) => ({ oldPassword, password }),
  [ActionTypes.REFRESH_TOKEN]: () => ({}),
  [ActionTypes.USER_LOGOUT]: () => ({}),
  [ActionTypes.RESET_FORGOT_STATUS]: () => ({}),
})
