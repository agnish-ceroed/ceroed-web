import * as yup from 'yup';

export const addRefrigerantsValidation = yup.object({
    facility: yup
        .string('Facility is required')
        .required('Facility is required'),
    year: yup
        .string('Year is required')
        .required('Year is required'),
    month: yup
        .string('Month is required')
        .required('Month is required'),
    unit: yup
        .string('Unit is required')
        .required('Unit is required'),
    gasType: yup
        .string('Gas type is required')
        .required('Gas type is required'),
    refrigerant: yup
        .string('Refrigerant is required')
        .required('Refrigerant is required'),
    amountOfFuel: yup
        .string('Amount of fuel is required')
        .required('Amount of fuel is required'),
});
