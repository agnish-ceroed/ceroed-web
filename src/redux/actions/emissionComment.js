import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    listEmissionComments,
    resetListEmissionComments,
    addEmissionComment,
    clearAddEmissionComment,
} = createActions({
    [ActionTypes.LIST_EMISSION_COMMENTS]: (payload) => (payload),
    [ActionTypes.RESET_LIST_EMISSION_COMMENTS]: () => ({}),
    [ActionTypes.ADD_EMISSION_COMMENT]: (emissionId, comment) => ({ emissionId, comment }),
    [ActionTypes.CLEAR_ADD_EMISSION_COMMENT]: () => ({  }),
})
