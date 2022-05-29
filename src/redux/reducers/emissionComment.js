import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const emissionCommentState = {
    listEmissionComments: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
}

const emissionActions = {
    emissionComment: handleActions(
        {

            [ActionTypes.LIST_EMISSION_COMMENTS]: (state, { payload }) =>
                immutable(state, {
                    listEmissionComments: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.LIST_EMISSION_COMMENTS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    listEmissionComments: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.LIST_EMISSION_COMMENTS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    listEmissionComments: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),
        },
        emissionCommentState
    )
}

export default emissionActions;
