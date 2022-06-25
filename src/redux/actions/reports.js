import { createActions } from "redux-actions";

import { ActionTypes } from "../constants/actions";

export const {
  getAllReports,
  getReportDetails,
  deleteReport,
  resetReportStatus,
  createReport,
  updateReport,
} = createActions({
  [ActionTypes.GET_ALL_REPORTS]: (payload) => (payload),
  [ActionTypes.GET_REPORT_DETAILS]: (id) => ({ id }),
  [ActionTypes.DELETE_REPORT]: (id) => ({ id }),
  [ActionTypes.RESET_REPORT_STATUS]: () => {},
  [ActionTypes.CREATE_REPORT]: (payload) => (payload),
  [ActionTypes.UPDATE_REPORT]: (payload) => (payload),
});
