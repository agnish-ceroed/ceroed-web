import * as yup from 'yup';

export const updateStationaryCombustionValidation = yup.object({
    facility: yup
        .string('Facility is required')
        .required('Facility is required'),
    month: yup
        .string('Year is required')
        .required('Year is required'),
    year: yup
        .string('Year is required')
        .required('Year is required'),
    emissionType: yup
        .string('Emission Type is required')
        .required('Emission Type is required'),
    fuel: yup
        .string('Fuel is required')
        .required('Fuel is required'),
    fuelUnit: yup
        .string('Fuel unit is required')
        .required('Fuel unit is required'),
    amountOfFuel: yup
        .string('Amount of fuel is required')
        .required('Amount of fuel is required'),
});