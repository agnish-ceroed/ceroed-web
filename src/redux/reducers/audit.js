import { handleActions } from "redux-actions";
import immutable from "immutability-helper";

import { ActionTypes } from "../constants/actions";
import { STATUS } from "../constants";

export const auditState = {
  auditSummaryList: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },

  auditYearlySummary: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },

  requestAudit: {
    status: STATUS.IDLE,
    message: "",
  },
};

const auditActions = {
  audit: handleActions(
    {
      [ActionTypes.GET_AUDIT_SUMMARY]: (state, { payload }) =>
        immutable(state, {
          auditSummaryList: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_AUDIT_SUMMARY_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          auditSummaryList: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_AUDIT_SUMMARY_FAILURE]: (state, { payload }) =>
        immutable(state, {
          auditSummaryList: {
            status: { $set: STATUS.ERROR },
            message: { $set: payload },
          },
        }),

      [ActionTypes.GET_YEARLY_AUDIT_SUMMARY]: (state, { payload }) =>
        immutable(state, {
          auditYearlySummary: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_YEARLY_AUDIT_SUMMARY_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          auditYearlySummary: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_YEARLY_AUDIT_SUMMARY_FAILURE]: (state, { payload }) =>
        immutable(state, {
          auditYearlySummary: {
            status: { $set: STATUS.ERROR },
            message: { $set: payload },
          },
        }),

      [ActionTypes.REQUEST_AUDIT]: (state, { payload }) =>
        immutable(state, {
          requestAudit: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.REQUEST_AUDIT_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          requestAudit: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
          auditYearlySummary: {
            data: {
              $set: {
                ...state.auditYearlySummary.data,
                status: payload.audited_status,
                actions: {
                  $set: {
                    ...state.auditYearlySummary.data.actions,
                    perform_request_audit: true,
                  },
                },
              },
            },
            status: { $set: STATUS.SUCCESS },
          },
        }),
      [ActionTypes.REQUEST_AUDIT_FAILURE]: (state, { payload }) =>
        immutable(state, {
          requestAudit: {
            status: { $set: STATUS.ERROR },
            message: { $set: payload },
          },
        }),

      [ActionTypes.RESET_REQUEST_AUDIT_DATA]: (state, { payload }) =>
        immutable(state, {
          requestAudit: {
            status: { $set: STATUS.IDLE },
            message: { $set: "" },
          },
        }),
    },
    auditState
  ),
};

export default auditActions;
