import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    createTicket,
    resetTicketStatus,
    listTickets,
} = createActions({
    [ActionTypes.CREATE_TICKET]: (payload) => (payload),
    [ActionTypes.RESET_TICKET_STATUS]: () => {},
    [ActionTypes.LIST_TICKETS]: (payload) => (payload),
})
