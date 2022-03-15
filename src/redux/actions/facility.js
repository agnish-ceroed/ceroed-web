import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    addFacility,
    getFacility,
    editFacility,
    deleteFacility,
    resetAddFacilityStatus
} = createActions({
    [ActionTypes.ADD_FACILITY]: (name, phone, country) => ({ name, phone, country }),
    [ActionTypes.GET_FACILITY]: (facilityId) => ({ facilityId }),
    [ActionTypes.EDIT_FACILITY]: (facilityId, name, phone, country) => ({ facilityId, name, phone, country }),
    [ActionTypes.DELETE_FACILITY]: (facilityId) => ({ facilityId }),
    [ActionTypes.RESET_ADD_FACILITY_STATUS]: () => ({}),
})
