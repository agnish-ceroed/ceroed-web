import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    createTicket,
    resetTicketStatus,
} = createActions({
    [ActionTypes.CREATE_TICKET]: (payload) => (payload),
    [ActionTypes.RESET_TICKET_STATUS]: () => {},
})
