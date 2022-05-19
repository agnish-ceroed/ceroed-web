import { handleActions } from 'redux-actions'
import immutable from 'immutability-helper'

import { ActionTypes } from '../constants/actions';
import { STATUS } from '../constants'
// import { parseError } from '../../services/client';

export const approvalState = {
    approvalSummaryList: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    approvalDetails: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    approvalMonthlyDetails: {
        data: [],
        status: STATUS.IDLE,
        message: ''
    },
    approvalMonthlySummary: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    submitApproval: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    requestApproval: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
    approveRequest: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    },
}

const approvalActions = {
    approval: handleActions(
        {
            [ActionTypes.GET_APPROVAL_SUMMARY]: (state, { payload }) =>
                immutable(state, {
                    approvalSummaryList: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_APPROVAL_SUMMARY_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    approvalSummaryList: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload }
                    }
                }),
            [ActionTypes.GET_APPROVAL_SUMMARY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    approvalSummaryList: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload }
                    }
                }),
                
            [ActionTypes.GET_APPROVAL_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    approvalDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_APPROVAL_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    approvalDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload }
                    }
                }),
            [ActionTypes.GET_APPROVAL_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    approvalDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload }
                    }
                }),

            [ActionTypes.GET_APPROVAL_MONTHLY_DETAILS]: (state, { payload }) =>
                immutable(state, {
                    approvalMonthlyDetails: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_APPROVAL_MONTHLY_DETAILS_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    approvalMonthlyDetails: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload }
                    }
                }),
            [ActionTypes.GET_APPROVAL_MONTHLY_DETAILS_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    approvalMonthlyDetails: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload }
                    }
                }),

            [ActionTypes.GET_APPROVAL_MONTHLY_SUMMARY]: (state, { payload }) =>
                immutable(state, {
                    approvalMonthlySummary: {
                        status: { $set: STATUS.RUNNING }
                    }
                }),
            [ActionTypes.GET_APPROVAL_MONTHLY_SUMMARY_SUCCESS]: (state, { payload }) =>
                immutable(state, {
                    approvalMonthlySummary: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload }
                    }
                }),
            [ActionTypes.GET_APPROVAL_MONTHLY_SUMMARY_FAILURE]: (state, { payload }) =>
                immutable(state, {
                    approvalMonthlySummary: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload }
                    }
                }),

                [ActionTypes.SUBMIT_APPROVAL]: (state, { payload }) =>
                    immutable(state, {
                    submitApproval: {
                        status: { $set: STATUS.RUNNING },
                    },
                    }),
                [ActionTypes.SUBMIT_APPROVAL_SUCCESS]: (state, { payload }) =>
                    immutable(state, {
                    submitApproval: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    },
                    approvalMonthlySummary: {
                        data: {
                        $set: {
                            ...state.approvalMonthlySummary.data,
                            status: payload.status
                        },
                        },
                        status: { $set: STATUS.SUCCESS },
                    },
                    approvalMonthlyDetails: {
                        data: {
                        $set: {
                            ...state.approvalMonthlyDetails.data,
                            actions: {
                            $set: {
                                ...state.approvalMonthlySummary.data.actions,
                                perform_submission: false,
                            },
                            },
                        },
                        },
                        status: { $set: STATUS.SUCCESS },
                    },
                    }),
                [ActionTypes.SUBMIT_APPROVAL_FAILURE]: (state, { payload }) =>
                    immutable(state, {
                    submitApproval: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload },
                    },
                    }),

                [ActionTypes.REQUEST_APPROVAL]: (state, { payload }) =>
                    immutable(state, {
                    requestApproval: {
                        status: { $set: STATUS.RUNNING },
                    },
                    }),
                [ActionTypes.REQUEST_APPROVAL_SUCCESS]: (state, { payload }) =>
                    immutable(state, {
                    requestApproval: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    },
                    approvalMonthlySummary: {
                        data: {
                        $set: {
                            ...state.approvalMonthlySummary.data,
                            status: payload.status
                        },
                        },
                        status: { $set: STATUS.SUCCESS },
                    },
                    approvalMonthlyDetails: {
                        data: {
                        $set: {
                            ...state.approvalMonthlyDetails.data,
                            actions: {
                            $set: {
                                ...state.approvalMonthlySummary.data.actions,
                                perform_submission: false,
                            },
                            },
                        },
                        },
                        status: { $set: STATUS.SUCCESS },
                    },
                    }),
                [ActionTypes.REQUEST_APPROVAL_FAILURE]: (state, { payload }) =>
                    immutable(state, {
                    requestApproval: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload },
                    },
                    }),

                [ActionTypes.APPROVE_REQUEST]: (state, { payload }) =>
                    immutable(state, {
                    approveRequest: {
                        status: { $set: STATUS.RUNNING },
                    },
                    }),
                [ActionTypes.APPROVE_REQUEST_SUCCESS]: (state, { payload }) =>
                    immutable(state, {
                    approveRequest: {
                        status: { $set: STATUS.SUCCESS },
                        data: { $set: payload },
                    },
                    approvalMonthlySummary: {
                        data: {
                        $set: {
                            ...state.approvalMonthlySummary.data,
                            status: payload.status
                        },
                        },
                        status: { $set: STATUS.SUCCESS },
                    },
                    approvalMonthlyDetails: {
                        data: {
                        $set: {
                            ...state.approvalMonthlyDetails.data,
                            actions: {
                            $set: {
                                ...state.approvalMonthlySummary.data.actions,
                                perform_submission: false,
                            },
                            },
                        },
                        },
                        status: { $set: STATUS.SUCCESS },
                    },
                    }),
                [ActionTypes.APPROVE_REQUEST_FAILURE]: (state, { payload }) =>
                    immutable(state, {
                    approveRequest: {
                        status: { $set: STATUS.ERROR },
                        message: { $set: payload },
                    },
                    }),

                [ActionTypes.RESET_APPROVAL_DATA]: (state, { payload }) =>
                    immutable(state, {
                    submitApproval: {
                        status: { $set: STATUS.IDLE },
                        message: { $set: "" },
                    },
                    requestApproval: {
                        status: { $set: STATUS.IDLE },
                        message: { $set: "" },
                    },
                    approveRequest: {
                        status: { $set: STATUS.IDLE },
                        message: { $set: "" },
                    },
                    }),
        },
        approvalState
    )
}

export default approvalActions;
