import { handleActions } from "redux-actions";
import immutable from "immutability-helper";

import { ActionTypes } from "../constants/actions";
import { STATUS } from "../constants";
import { parseError } from '../../services/client';

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

  auditYearlySummaryOverview: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },

  questionsList: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },

  answerQuestion: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },

  auditStatusYearlySummaryOverview: {
    data: {},
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
            message: { $set: parseError(payload) },
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
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.GET_YEARLY_AUDIT_SUMMARY_OVERVIEW]: (state, { payload }) =>
        immutable(state, {
          auditYearlySummaryOverview: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_YEARLY_AUDIT_SUMMARY_OVERVIEW_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          auditYearlySummaryOverview: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_YEARLY_AUDIT_SUMMARY_OVERVIEW_FAILURE]: (state, { payload }) =>
        immutable(state, {
          auditYearlySummaryOverview: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.GET_ALL_QUESTIONS]: (state, { payload }) =>
        immutable(state, {
          questionsList: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_ALL_QUESTIONS_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          questionsList: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_ALL_QUESTIONS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          questionsList: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW]: (state, { payload }) =>
        immutable(state, {
          auditStatusYearlySummaryOverview: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          auditStatusYearlySummaryOverview: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_YEARLY_AUDIT_STATUS_SUMMARY_OVERVIEW_FAILURE]: (state, { payload }) =>
        immutable(state, {
          auditStatusYearlySummaryOverview: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.ANSWER_QUALITATIVE_QUESTION]: (state, { payload }) =>
        immutable(state, {
          answerQuestion: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.ANSWER_QUALITATIVE_QUESTION_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          answerQuestion: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
          questionsList: {
            data: {
              $set: state.questionsList.data.map(item => {
                if(item.id === payload.question_id) {
                  item = {...item, ...payload}
                }
                return item
              }),
            },
            status: { $set: STATUS.SUCCESS },
          },
        }),
      [ActionTypes.ANSWER_QUALITATIVE_QUESTION_FAILURE]: (state, { payload }) =>
        immutable(state, {
          answerQuestion: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.RESET_QUESTION_ANSWER_STATUS]: (state, { payload }) =>
        immutable(state, {
          answerQuestion: {
            status: { $set: STATUS.IDLE },
            message: { $set: '' },
            data: { $set: [] },
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
                  ...state.auditYearlySummary.data.actions,
                    perform_request_audit: false,
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
            message: { $set: parseError(payload) },
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
