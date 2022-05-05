import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getApprovalSummary,
} = createActions({
    [ActionTypes.GET_APPROVAL_SUMMARY]: (year, facility) => ({year, facility}),
})
