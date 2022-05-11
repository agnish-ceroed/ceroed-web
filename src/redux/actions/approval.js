import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getApprovalDetails,
    getApprovalSummary,
} = createActions({
    [ActionTypes.GET_APPROVAL_DETAILS]: (year) => ({year}),
    [ActionTypes.GET_APPROVAL_SUMMARY]: (year, facility) => ({year, facility}),
})
