import * as yup from 'yup';

export const updateMobileCombustionValidation = yup.object({
    facility: yup
        .string('Facility is required')
        .required('Facility is required'),
    month: yup
        .string('Year is required')
        .required('Year is required'),
    year: yup
        .string('Year is required')
        .required('Year is required'),
    activityType: yup
        .string('Activity Type is required')
        .required('Activity Type is required'),
    fuelSource: yup
        .string('Fuel Source is required')
        .required('Fuel Source is required'),
    fuelUnit: yup
        .string('Fuel unit is required')
        .required('Fuel unit is required'),
    amountOfFuel: yup
        .string('Amount of fuel is required')
        .required('Amount of fuel is required'),
});
