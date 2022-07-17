import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    listAssessmentCycle,
    getAssessmentDetails,
    createAssessmentCycle,
    updateAssessmentCycle,
    resetAssessmentCycle,
} = createActions({
    [ActionTypes.LIST_ASSESSMENT_CYCLE]: () => {},
    [ActionTypes.GET_ASSESSMENT_DETAILS]: (payload) => (payload),
    [ActionTypes.CREATE_ASSESSMENT_CYCLE]: (payload) => (payload),
    [ActionTypes.UPDATE_ASSESSMENT_CYCLE]: (payload) => (payload),
    [ActionTypes.RESET_ASSESSMENT_CYCLE]: () => {},
})
