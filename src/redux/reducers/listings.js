import { handleActions } from "redux-actions";
import immutable from "immutability-helper";

import { ActionTypes } from "../constants/actions";
import { STATUS } from "../constants";
import { parseError } from "../../services/client";

export const listState = {
  listFacilities: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
  industryTypes: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
  countryList: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
  assigneeList: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
  gridRegions: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
  listManager: {
    data: [],
    status: STATUS.IDLE,
    message: "",
  },
};

const listActions = {
  listings: handleActions(
    {
      [ActionTypes.LIST_FACILITIES]: (state, { payload }) =>
        immutable(state, {
          listFacilities: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.LIST_FACILITIES_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          listFacilities: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.LIST_FACILITIES_FAILURE]: (state, { payload }) =>
        immutable(state, {
          listFacilities: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.GET_INDUSTRY_TYPES]: (state, { payload }) =>
        immutable(state, {
          industryTypes: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_INDUSTRY_TYPES_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          industryTypes: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_INDUSTRY_TYPES_FAILURE]: (state, { payload }) =>
        immutable(state, {
          industryTypes: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.GET_COUNTRY_LIST]: (state, { payload }) =>
        immutable(state, {
          countryList: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_COUNTRY_LIST_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          countryList: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_COUNTRY_LIST_FAILURE]: (state, { payload }) =>
        immutable(state, {
          countryList: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.LIST_ASSIGNEE]: (state, { payload }) =>
        immutable(state, {
          assigneeList: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.LIST_ASSIGNEE_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          assigneeList: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.LIST_ASSIGNEE_FAILURE]: (state, { payload }) =>
        immutable(state, {
          assigneeList: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.LIST_GRID_REGIONS]: (state, { payload }) =>
        immutable(state, {
          gridRegions: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.LIST_GRID_REGIONS_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          gridRegions: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.LIST_GRID_REGIONS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          gridRegions: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),

      [ActionTypes.GET_MANAGER_LIST]: (state, { payload }) =>
        immutable(state, {
          listManager: {
            status: { $set: STATUS.RUNNING },
          },
        }),
      [ActionTypes.GET_MANAGER_LIST_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          listManager: {
            status: { $set: STATUS.SUCCESS },
            data: { $set: payload },
          },
        }),
      [ActionTypes.GET_MANAGER_LIST_FAILURE]: (state, { payload }) =>
        immutable(state, {
          listManager: {
            status: { $set: STATUS.ERROR },
            message: { $set: parseError(payload) },
          },
        }),
    },
    listState
  ),
};

export default listActions;
