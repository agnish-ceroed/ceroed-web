import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/actions';

export const {
    getEmissionYear,
    getEmissionTypes,
    getEmissionRegion,
    getEmissionsByMonth,
    getDashboardStatistics,
    getFacilityTopicEmission,
    getFuelSourceEmission,
} = createActions({
    [ActionTypes.GET_EMISSION_YEAR]: (filter) => ({ filter }),
    [ActionTypes.GET_EMISSION_TYPES]: (filter) => ({ filter }),
    [ActionTypes.GET_EMISSION_REGION]: (filter) => ({ filter }),
    [ActionTypes.GET_EMISSIONS_BY_MONTH]: (filter) => ({ filter }),
    [ActionTypes.GET_DASHBOARD_STATISTICS]: (filter) => ({ filter }),
    [ActionTypes.GET_DASHBOARD_STATISTICS]: (filter) => ({ filter }),
    [ActionTypes.GET_FUEL_SOURCE_EMISSION]: (filter) => ({ filter }),
})
