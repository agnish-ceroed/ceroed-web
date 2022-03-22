import * as yup from 'yup';

export const editPurchasedElectricityValidation = yup.object({
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
    typeOfEmissionFactor: yup
        .string('Types of Emission Factor is required')
        .required('Types of Emission Factor is required'),
    calculationApproach: yup
        .string('Calculation approach is required')
        .required('Calculation approach is required'),
    amountOfFuel: yup
        .string('Amount of fuel is required')
        .required('Amount of fuel is required'),
});
