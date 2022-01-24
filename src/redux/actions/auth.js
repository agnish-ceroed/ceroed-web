import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants';

export const {
  userLogin,
} = createActions({
  [ActionTypes.USER_LOGIN]: (email, password) => ({ email, password }),
})