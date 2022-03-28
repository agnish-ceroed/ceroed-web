import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getEmissionYear,
    getEmissionTypes,
    getEmissionRegion,
    getEmissionsByMonth
} = createActions({
    [ActionTypes.GET_EMISSION_YEAR]: () => {},
    [ActionTypes.GET_EMISSION_TYPES]: () => {},
    [ActionTypes.GET_EMISSION_REGION]: () => {},
    [ActionTypes.GET_EMISSIONS_BY_MONTH]: () => {},
})
