import { handleActions } from "redux-actions";
import immutable from "immutability-helper";

import { ActionTypes } from "../constants/actions";
import { STATUS } from "../constants";
import { parseError } from "../../services/client";

export const reportsState = {
  reportsList: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
  reportDetails: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
};

const reportsActions = {
  reports: handleActions(
    {
      [ActionTypes.GET_ALL_REPORTS]: (state, { payload }) =>
        immutable(state, {
          reportsList: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_ALL_REPORTS_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          reportsList: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_ALL_REPORTS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          reportsList: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.GET_REPORT_DETAILS]: (state, { payload }) =>
        immutable(state, {
          reportDetails: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_REPORT_DETAILS_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          reportDetails: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_REPORT_DETAILS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          reportDetails: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),
    },
    reportsState
  ),
};

export default reportsActions;
