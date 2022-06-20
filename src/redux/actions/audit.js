import { createActions } from "redux-actions";

import { ActionTypes } from "../constants/actions";

export const {
  getAuditSummary,
  getYearlyAuditSummary,
  getYearlyAuditSummaryOverview,
  requestAudit,
  resetRequestAuditData,
} = createActions({
  [ActionTypes.GET_AUDIT_SUMMARY]: () => {},
  [ActionTypes.GET_YEARLY_AUDIT_SUMMARY]: (year) => ({ year }),
  [ActionTypes.GET_YEARLY_AUDIT_SUMMARY_OVERVIEW]: (year) => ({ year }),
  [ActionTypes.REQUEST_AUDIT]: (payload) => (payload),
  [ActionTypes.RESET_REQUEST_AUDIT_DATA]: () => {},
});
