import * as yup from 'yup';

export const addTransportationCombutionValidation = yup.object({
    description: yup
        .string('Description is required')
        .required('Description is required'),
    category: yup
        .string('Category is required')
        .required('Category is required'),
    emissionFactorDataset: yup
        .string('Emission Factor Dataset is required')
        .required('Emission Factor Dataset is required'),
    activityType: yup
        .string('Activity Type Type is required')
        .required('Activity Type Type is required'),
    year: yup
        .string('Year type is required')
        .required('Year type is required'),
    modeOfTransport: yup
        .string('Mode of Transport is required')
        .required('Mode of Transport is required'),
    vehicleType: yup
        .string('Vehicle Type unit is required')
        .required('Vehicle Type unit is required'),
    amount: yup
        .string('Amount of fuel is required')
        .required('Amount of fuel is required'),
    unit: yup
        .string('Unit of fuel is required')
        .required('Unit of fuel is required'),
});
