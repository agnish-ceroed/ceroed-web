import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

export function* listEmissionComments(action) {
    try {
        const { emissionId } = action.payload
        const response = yield call(request, APIEndpoints.LIST_EMISSION_COMMENTS(emissionId), {
            method: 'GET',
        })
        yield put({
            type: ActionTypes.LIST_EMISSION_COMMENTS_SUCCESS,
            payload: response.comment_list
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.LIST_EMISSION_COMMENTS_FAILURE,
            payload: err.message
        })
    }
}

export function* addComment(action) {
    try {
        const { emissionId, comment } = action.payload
        const response = yield call(request, APIEndpoints.ADD_EMISSION_COMMENT(emissionId), {
            method: 'POST',
            payload: { comment }
        })
        yield put({
            type: ActionTypes.ADD_EMISSION_COMMENT_SUCCESS,
            payload: response
        })
    } catch (err) {
        /* istanbul ignore next */
        yield put({
            type: ActionTypes.ADD_EMISSION_COMMENT_FAILURE,
            payload: err.message
        })
    }
}

export default function* root() {
    yield all([
        takeLatest(ActionTypes.LIST_EMISSION_COMMENTS, listEmissionComments),
        takeLatest(ActionTypes.ADD_EMISSION_COMMENT, addComment),
    ])
}
