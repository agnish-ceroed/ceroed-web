import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getCompanyList
} = createActions({
    [ActionTypes.GET_COMPANY_LIST]: () => ({}),
})
