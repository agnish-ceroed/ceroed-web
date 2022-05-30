import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    listEmissionComments,
} = createActions({
    [ActionTypes.LIST_EMISSION_COMMENTS]: (emissionId) => ({ emissionId }),
})
