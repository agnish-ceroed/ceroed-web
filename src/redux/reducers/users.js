import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const userState = {
    userList: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    addUser: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    userDetails: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    editUser: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    deleteUser: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    setEmailConfirmed: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    }
}

const userActions = {
    users: handleActions(
        {
            [ActionTypes.LIST_USERS]: (state, { payload }) =>
                immutable(state, {
                    userList: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.LIST_USERS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    userList: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.LIST_USERS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    userList: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.ADD_USER]: (state, { payload }) =>
                immutable(state, {
                    addUser: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.ADD_USER_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    addUser: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.ADD_USER_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    addUser: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.GET_USER_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    userDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_USER_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    userDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_USER_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    userDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.EDIT_USER]: (state, { payload }) =>
                immutable(state, {
                    editUser: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.EDIT_USER_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    editUser: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.EDIT_USER_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    editUser: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.DELETE_USER]: (state, { payload }) =>
                immutable(state, {
                    deleteUser: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.DELETE_USER_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    deleteUser: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.DELETE_USER_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    deleteUser: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.RESET_USER_STATUS]: (state, { payload }) =>
                immutable(state, {
                    addUser: {
                        data: { $set: [] },
                        status: { $set: STATUS.IDLE },
                        message: { $set: '' }
                    },
                    userDetails: {
                        data: { $set: [] },
                        status: { $set: STATUS.IDLE },
                        message: { $set: '' }
                    },
                    editUser: {
                        data: { $set: [] },
                        status: { $set: STATUS.IDLE },
                        message: { $set: '' }
                    },
                    deleteUser: {
                        data: { $set: [] },
                        status: { $set: STATUS.IDLE },
                        message: { $set: '' }
                    }
                }),

            [ActionTypes.SET_EMAIL_CONFIRMED]: (state, { payload }) =>
                immutable(state, {
                    setEmailConfirmed: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.SET_EMAIL_CONFIRMED_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    setEmailConfirmed: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.SET_EMAIL_CONFIRMED_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    setEmailConfirmed: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),
            [ActionTypes.CLEAR_EMAIL_CONFIRMED_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    setEmailConfirmed: {
                        status: { $set: STATUS.IDLE }
                    }
                }),


        },
        userState
    )
}

export default userActions;
