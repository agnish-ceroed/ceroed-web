import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    listFacilities,
    getIndustryTypes,
    getCountryList
} = createActions({
    [ActionTypes.LIST_FACILITIES]: () => ({}),
    [ActionTypes.GET_INDUSTRY_TYPES]: () => ({}),
    [ActionTypes.GET_COUNTRY_LIST]: () => ({}),
})
