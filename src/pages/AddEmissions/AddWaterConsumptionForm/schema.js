import * as yup from 'yup';

export const waterConsumptionValidation = yup.object({
    facility: yup
        .string('Facility is required')
        .required('Facility is required'),
    month: yup
        .string('Year is required')
        .required('Year is required'),
    year: yup
        .string('Year is required')
        .required('Year is required'),
    source: yup
        .string('Source is required')
        .required('Source is required'),
    stressType: yup
        .string('Stress type is required')
        .required('Stress type is required'),
    sourceType: yup
        .string('Source type is required')
        .required('Source type is required'),
    fuelUnit: yup
        .string('Fuel unit is required')
        .required('Fuel unit is required'),
    amountOfFuel: yup
        .string('Amount of fuel is required')
        .required('Amount of fuel is required'),
});
