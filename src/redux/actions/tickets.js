import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    createTicket,
    resetTicketStatus,
    listTickets,
    getTicketDetails,
    addResponse,
    closeTicket,
    deleteTicket,
} = createActions({
    [ActionTypes.CREATE_TICKET]: (payload) => (payload),
    [ActionTypes.RESET_TICKET_STATUS]: () => {},
    [ActionTypes.LIST_TICKETS]: (payload) => (payload),
    [ActionTypes.GET_TICKET_DETAILS]: (payload) => (payload),
    [ActionTypes.ADD_RESPONSE]: (payload) => (payload),
    [ActionTypes.CLOSE_TICKET]: (payload) => (payload),
    [ActionTypes.DELETE_TICKET]: (payload) => (payload),
})
