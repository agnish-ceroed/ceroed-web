import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
import { parseError } from '../../services/client';

export const listState = {
    industryTypes: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    countryList: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    }
}

const listActions = {
    listings: handleActions(
        {
            [ActionTypes.GET_INDUSTRY_TYPES]: (state, { payload }) =>
                immutable(state, {
                    industryTypes: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_INDUSTRY_TYPES_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    industryTypes: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_INDUSTRY_TYPES_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    industryTypes: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),

            [ActionTypes.GET_COUNTRY_LIST]: (state, { payload }) =>
                immutable(state, {
                    countryList: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_COUNTRY_LIST_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    countryList: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    }
                }),
            [ActionTypes.GET_COUNTRY_LIST_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    countryList: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: parseError(payload) }
                    }
                }),
        },
        listState
    )
}

export default listActions;
