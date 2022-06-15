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
  resetAuthStatus,
  userInviteLogin,
} = createActions({
  [ActionTypes.USER_LOGIN]: (userType, email, password) => ({ userType, email, password }),
  [ActionTypes.USER_SIGN_UP]: (signupDetails) => ({ signupDetails }),
  [ActionTypes.GET_FORGOT_PASSWORD_OTP]: (userType, email) => ({ userType, email }),
  [ActionTypes.RESET_PASSWORD]: (userType, email, otp, password) => ({ userType, email, otp, password }),
  [ActionTypes.CHANGE_PASSWORD]: (oldPassword, password) => ({ oldPassword, password }),
  [ActionTypes.REFRESH_TOKEN]: () => ({}),
  [ActionTypes.USER_LOGOUT]: () => ({}),
  [ActionTypes.RESET_AUTH_STATUS]: () => ({}),
  [ActionTypes.USER_INVITE_LOGIN]: (userId, code, name, password) => ({ userId, code, name, password }),
})
