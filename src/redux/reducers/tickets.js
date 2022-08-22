import { handleActions } from "redux-actions";
import immutable from "immutability-helper";

import { ActionTypes } from "../constants/actions";
import { STATUS } from "../constants";
import { parseError } from '../../services/client';

export const ticketState = {
  listTickets: {
    data: [],
    count: {},
    status: STATUS.IDLE,
    message: "",
  },
  listScopeTickets: {
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
  closeTicketDetails: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
  deleteTicketDetails: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
  ticketDetails: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
  addResponse: {
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
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.LIST_SCOPE_TICKETS]: (state, { payload }) =>
        immutable(state, {
          listScopeTickets: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.LIST_SCOPE_TICKETS_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          listScopeTickets: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
            count: { $set: payload.count },
          },
        }),
      [ActionTypes.LIST_SCOPE_TICKETS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          listScopeTickets: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),
      [ActionTypes.RESET_LIST_SCOPE_TICKETS]: (state, { payload }) =>
        immutable(state, {
          listScopeTickets: {
            status: { $set: STATUS.IDLE },
            data: { $set: [] },
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
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.CLOSE_TICKET]: (state, { payload }) =>
        immutable(state, {
          closeTicketDetails: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.CLOSE_TICKET_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          closeTicketDetails: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.CLOSE_TICKET_FAILURE]: (state, { payload }) =>
        immutable(state, {
          closeTicketDetails: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.DELETE_TICKET]: (state, { payload }) =>
        immutable(state, {
          deleteTicketDetails: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.DELETE_TICKET_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          deleteTicketDetails: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.DELETE_TICKET_FAILURE]: (state, { payload }) =>
        immutable(state, {
          deleteTicketDetails: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.GET_TICKET_DETAILS]: (state, { payload }) =>
        immutable(state, {
          ticketDetails: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_TICKET_DETAILS_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          ticketDetails: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_TICKET_DETAILS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          ticketDetails: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.ADD_RESPONSE]: (state, { payload }) =>
        immutable(state, {
          addResponse: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.ADD_COMMENT_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          addResponse: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.ADD_COMMENT_FAILURE]: (state, { payload }) =>
        immutable(state, {
          addResponse: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.RESET_TICKET_STATUS]: (state, { payload }) =>
        immutable(state, {
          createTicketDetails: {
            status: { $set: STATUS.IDLE },
            message: { $set: "" },
          },
          addResponse: {
            status: { $set: STATUS.IDLE },
            message: { $set: "" },
          },
          closeTicketDetails: {
            status: { $set: STATUS.IDLE },
            message: { $set: "" },
          },
          deleteTicketDetails: {
            status: { $set: STATUS.IDLE },
            message: { $set: "" },
          },
        }),
    },
    ticketState
  ),
};

export default ticketActions;
