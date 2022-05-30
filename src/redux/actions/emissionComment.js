import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    listEmissionComments,
    addEmissionComment,
    clearAddEmissionComment,
} = createActions({
    [ActionTypes.LIST_EMISSION_COMMENTS]: (emissionId) => ({ emissionId }),
    [ActionTypes.ADD_EMISSION_COMMENT]: (emissionId, comment) => ({ emissionId, comment }),
    [ActionTypes.CLEAR_ADD_EMISSION_COMMENT]: () => ({  }),
})
