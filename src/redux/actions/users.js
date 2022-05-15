import { createActions } from "redux-actions";

import { ActionTypes } from "../constants/actions";

export const {
  listUsers,
  addUser,
  getUserDetails,
  editUser,
  deleteUser,
  resetUserStatus,
} = createActions({
  [ActionTypes.LIST_USERS]: () => ({}),
  [ActionTypes.ADD_USER]: (email, role, facility, manager) => ({
    email,
    role,
    facility,
    manager,
  }),
  [ActionTypes.GET_USER_DETAILS]: (userId) => ({ userId }),
  [ActionTypes.EDIT_USER]: (userId, email, role, facility, manager) => ({
    userId,
    email,
    role,
    facility,
    manager,
  }),
  [ActionTypes.DELETE_USER]: (userId) => ({ userId }),
  [ActionTypes.RESET_USER_STATUS]: () => ({}),
});
