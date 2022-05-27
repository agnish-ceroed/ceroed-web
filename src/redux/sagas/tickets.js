import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

export function* createTicket({payload}) {
    try {
        const { title, description, assigned_to_id, ticket_scope, ticket_scope_id } = payload
        const response = yield call(request, APIEndpoints.CREATE_TICKET, {
            method: 'POST',
            payload: { title, description, assigned_to_id, ticket_scope, ticket_scope_id }
        })
        yield put({
            type: ActionTypes.CREATE_TICKET_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.CREATE_TICKET_FAILURE,
            payload: err
        })
    }
}

export function* listTickets({payload}) {
    try {
        const response = yield call(request, APIEndpoints.LIST_TICKETS(payload), {
            method: 'GET',
        })
        yield put({
            type: ActionTypes.LIST_TICKETS_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.LIST_TICKETS_FAILURE,
            payload: err
        })
    }
}

export default function* root() {
    yield all([
        takeLatest(ActionTypes.CREATE_TICKET, createTicket),
        takeLatest(ActionTypes.LIST_TICKETS, listTickets),
    ])
}
