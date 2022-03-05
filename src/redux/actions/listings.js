import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getIndustryTypes,
    getCountryList
} = createActions({
    [ActionTypes.GET_INDUSTRY_TYPES]: () => ({ }),
    [ActionTypes.GET_COUNTRY_LIST]: () => ({ }),
})
