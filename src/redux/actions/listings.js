import { createActions } from "redux-actions";

import { ActionTypes } from "../constants/actions";

export const {
  listFacilities,
  getIndustryTypes,
  getCountryList,
  listGridRegions,
  getManagerList,
} = createActions({
  [ActionTypes.LIST_FACILITIES]: () => ({}),
  [ActionTypes.GET_INDUSTRY_TYPES]: () => ({}),
  [ActionTypes.GET_COUNTRY_LIST]: () => ({}),
  [ActionTypes.LIST_GRID_REGIONS]: (countryId) => ({ countryId }),
  [ActionTypes.GET_MANAGER_LIST]: (role, facility_id) => ({
    role,
    facility_id,
  }),
});
