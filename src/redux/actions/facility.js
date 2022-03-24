import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    addFacility,
    getFacility,
    editFacility,
    deleteFacility,
    resetAddFacilityStatus
} = createActions({
    [ActionTypes.ADD_FACILITY]: (name, phone, country, gridRegion) => ({ name, phone, country, gridRegion }),
    [ActionTypes.GET_FACILITY]: (facilityId) => ({ facilityId }),
    [ActionTypes.EDIT_FACILITY]: (facilityId, name, phone, country, gridRegion) => ({ facilityId, name, phone, country, gridRegion }),
    [ActionTypes.DELETE_FACILITY]: (facilityId) => ({ facilityId }),
    [ActionTypes.RESET_ADD_FACILITY_STATUS]: () => ({}),
})
