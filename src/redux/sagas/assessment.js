import { all, put, call, takeLatest } from 'redux-saga/effects'

import { request } from '../../services/client'
import { ActionTypes } from '../constants/actions';
import { APIEndpoints } from '../constants';

export function* listAssessmentCycle() {
  try {
    const response = yield call(request, APIEndpoints.LIST_ASSESSMENT_CYCLE, {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.LIST_ASSESSMENT_CYCLE_SUCCESS,
      payload: response.company_assessment_cycle_list
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LIST_ASSESSMENT_CYCLE_FAILURE,
      payload: err.message
    })
  }
}

export function* getAssessmentDetails({payload}) {
  try {
    const response = yield call(request, APIEndpoints.GET_ASSESSMENT_DETAILS(payload.year), {
      method: 'GET',
    })
    yield put({
      type: ActionTypes.GET_ASSESSMENT_DETAILS_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_ASSESSMENT_DETAILS_FAILURE,
      payload: err.message
    })
  }
}

export function* createAssessmentCycle({payload}) {
  try {
    const response = yield call(request, APIEndpoints.CREATE_ASSESSMENT_CYCLE, {
      method: 'POST',
      payload
    })
    yield put({
      type: ActionTypes.CREATE_ASSESSMENT_CYCLE_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.CREATE_ASSESSMENT_CYCLE_FAILURE,
      payload: err.message
    })
  }
}

export function* updateAssessmentCycle({payload}) {
  try {
    const response = yield call(request, APIEndpoints.UPDATE_ASSESSMENT_CYCLE(payload.id), {
      method: 'PUT',
      payload
    })
    yield put({
      type: ActionTypes.UPDATE_ASSESSMENT_CYCLE_SUCCESS,
      payload: response
    })
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.UPDATE_ASSESSMENT_CYCLE_FAILURE,
      payload: err.message
    })
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.LIST_ASSESSMENT_CYCLE, listAssessmentCycle),
    takeLatest(ActionTypes.GET_ASSESSMENT_DETAILS, getAssessmentDetails),
    takeLatest(ActionTypes.CREATE_ASSESSMENT_CYCLE, createAssessmentCycle),
    takeLatest(ActionTypes.UPDATE_ASSESSMENT_CYCLE, updateAssessmentCycle),
  ])
}
