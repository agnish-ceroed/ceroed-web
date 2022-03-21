import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    listUsers,
    addUser,
    getUserDetails,
    editUser,
    deleteUser,
    resetUserStatus
} = createActions({
    [ActionTypes.LIST_USERS]: () => ({}),
    [ActionTypes.ADD_USER]: (email, role) => ({ email, role }),
    [ActionTypes.GET_USER_DETAILS]: (userId) => ({ userId }),
    [ActionTypes.EDIT_USER]: (userId, email, role) => ({ userId, email, role }),
    [ActionTypes.DELETE_USER]: (userId) => ({ userId }),
    [ActionTypes.RESET_USER_STATUS]: () => ({}),
})
