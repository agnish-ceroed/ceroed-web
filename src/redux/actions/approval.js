import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getApprovalDetails,
    getApprovalSummary,
    getApprovalMonthlyDetails,
    getApprovalMonthlySummary,
    submitApproval,
    requestApproval,
    approveRequest,
    resetApprovalData,
} = createActions({
    [ActionTypes.GET_APPROVAL_DETAILS]: (year) => ({year}),
    [ActionTypes.GET_APPROVAL_SUMMARY]: (year, facility) => ({year, facility}),
    [ActionTypes.GET_APPROVAL_MONTHLY_DETAILS]: (id, year, month, facility) => ({year, facility, id, month}),
    [ActionTypes.GET_APPROVAL_MONTHLY_SUMMARY]: (id, year, month, facility) => ({year, facility, id, month}),
    [ActionTypes.SUBMIT_APPROVAL]: (statusId, userId) => ({statusId, userId}),
    [ActionTypes.REQUEST_APPROVAL]: (statusId, userId) => ({statusId, userId}),
    [ActionTypes.APPROVE_REQUEST]: (statusId, comment) => ({statusId, comment}),
    [ActionTypes.RESET_APPROVAL_DATA]: () => ({}),
})
