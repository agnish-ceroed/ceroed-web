import { createActions } from "redux-actions";

import { ActionTypes } from "../constants/actions";

export const {
  getAllReports,
  getReportDetails,
  deleteReport,
  resetReportStatus,
} = createActions({
  [ActionTypes.GET_ALL_REPORTS]: (year = "") => ({ year }),
  [ActionTypes.GET_REPORT_DETAILS]: (id) => ({ id }),
  [ActionTypes.DELETE_REPORT]: (id) => ({ id }),
  [ActionTypes.RESET_REPORT_STATUS]: () => {},
});
