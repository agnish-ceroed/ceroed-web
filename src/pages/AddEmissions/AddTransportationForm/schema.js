import * as yup from 'yup';

export const addTransportationCombutionValidation = yup.object({
    description: yup
        .string('Description is required')
        .required('Description is required'),
    category: yup
        .string('Category is required')
        .required('Category is required'),
    emissionFactorDataset: yup
        .string('Emission factor dataset is required')
        .required('Emission factor dataset is required'),
    activityType: yup
        .string('Activity type is required')
        .required('Activity type is required'),
    year: yup
        .string('Year is required')
        .required('Year is required'),
    modeOfTransport: yup
        .string('Mode of transport is required')
        .required('Mode of transport is required'),
    vehicleType: yup
        .string('Vehicle type unit is required')
        .required('Vehicle type unit is required'),
    amount: yup
        .string('Amount of activity type is required')
        .required('Amount of activity type is required'),
    unit: yup
        .string('Unit of fuel is required')
        .required('Unit of fuel is required'),
});
