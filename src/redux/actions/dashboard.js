import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getEmissionYear,
    getEmissionTypes,
    getEmissionRegion,
} = createActions({
    [ActionTypes.GET_EMISSION_YEAR]: () => {},
    [ActionTypes.GET_EMISSION_TYPES]: () => {},
    [ActionTypes.GET_EMISSION_REGION]: () => {},
})
