import * as yup from 'yup';

export const updateWasteCombustionValidation = yup.object({
    facility: yup
        .string('Facility is required')
        .required('Facility is required'),
    month: yup
        .string('Year is required')
        .required('Year is required'),
    year: yup
        .string('Year is required')
        .required('Year is required'),
    wasteType: yup
        .string('Waste type is required')
        .required('Waste type is required'),
    wasteHazardOption: yup
        .string('Waste hazard option is required')
        .required('Waste hazard option is required'),
    wasteDisposalOption: yup
        .string('Waste disposal option is required')
        .required('Waste disposal option is required'),
    wasteDisposalOperation: yup
        .string('Waste disposal operation is required')
        .required('Waste disposal operation is required'),
    wasteDisposalLocation: yup
        .string('Waste disposal location is required')
        .required('Waste disposal location is required'),
    unit: yup
        .string('Fuel unit is required')
        .required('Fuel unit is required'),
    amount: yup
        .string('Amount of fuel is required')
        .required('Amount of fuel is required'),
});