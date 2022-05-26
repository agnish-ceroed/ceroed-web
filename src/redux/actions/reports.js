import { createActions } from "redux-actions";

import { ActionTypes } from "../constants/actions";

export const {
  getAllReports,
  getReportDetails,
} = createActions({
  [ActionTypes.GET_ALL_REPORTS]: (year='') => ({year}),
  [ActionTypes.GET_REPORT_DETAILS]: (id) => ({id}),
});
