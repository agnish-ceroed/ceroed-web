import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
  userLogin,
  getForgotPasswordOtp,
  verifyForgotPasswordOtp,
  changePassword,
  userSignUp,
  refreshToken,
  userLogout,
  changeUserPassword,
} = createActions({
  [ActionTypes.USER_LOGIN]: (email, password) => ({ email, password }),
  [ActionTypes.GET_FORGOT_PASSWORD_OTP]: (email) => ({ email }),
  [ActionTypes.VERIFY_FORGOT_PASSWORD_OTP]: (otp) => ({ otp }),
  [ActionTypes.CHANGE_PASSWORD]: (password) => ({ password }),
  [ActionTypes.USER_SIGN_UP]: (signupDetails) => ({ signupDetails }),
  [ActionTypes.REFRESH_TOKEN]: () => ({}),
  [ActionTypes.USER_LOGOUT]: () => ({}),
  [ActionTypes.CHANGE_USER_PASSWORD]: (oldPassword, password) => ({ oldPassword, password }),
})
