import { handleActions } from "redux-actions";
import immutable from "immutability-helper";

import { ActionTypes } from "../constants/actions";
import { STATUS } from "../constants";

export const ticketState = {
  listTickets: {
    data: [],
    count: {},
    status: STATUS.IDLE,
    message: "",
  },
  createTicketDetails: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
};

const ticketActions = {
  ticket: handleActions(
    {
      [ActionTypes.LIST_TICKETS]: (state, { payload }) =>
        immutable(state, {
          listTickets: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.LIST_TICKETS_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          listTickets: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload.tickets },
            count: { $set: payload.count },
          },
        }),
      [ActionTypes.LIST_TICKETS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          listTickets: {
            status: { $set: STATUS.ERROR },
            message: { $set: payload },
          },
        }),
        
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
