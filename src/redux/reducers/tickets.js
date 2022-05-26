import { handleActions } from "redux-actions";
import immutable from "immutability-helper";

import { ActionTypes } from "../constants/actions";
import { STATUS } from "../constants";

export const ticketState = {
  createTicketDetails: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
};

const ticketActions = {
  ticket: handleActions(
    {
      [ActionTypes.CREATE_TICKET]: (state, { payload }) =>
        immutable(state, {
          createTicketDetails: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.CREATE_TICKET_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          createTicketDetails: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.CREATE_TICKET_FAILURE]: (state, { payload }) =>
        immutable(state, {
          createTicketDetails: {
            status: { $set: STATUS.ERROR },
            message: { $set: payload },
          },
        }),

      [ActionTypes.RESET_TICKET_STATUS]: (state, { payload }) =>
        immutable(state, {
          createTicketDetails: {
            status: { $set: STATUS.IDLE },
            message: { $set: '' },
          },
        }),
    },
    ticketState
  ),
};

export default ticketActions;
