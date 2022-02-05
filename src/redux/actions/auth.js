import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants';

export const {
  userLogin,
  getForgotPasswordOtp,
  verifyForgotPasswordOtp,
  changePassword
} = createActions({
  [ActionTypes.USER_LOGIN]: (email, password) => ({ email, password }),
  [ActionTypes.GET_FORGOT_PASSWORD_OTP]: (email) => ({ email }),
  [ActionTypes.VERIFY_FORGOT_PASSWORD_OTP]: (otp) => ({ otp }),
  [ActionTypes.CHANGE_PASSWORD]: (password) => ({ password })
})
