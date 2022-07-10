import * as yup from 'yup';

export const schemeValidation = yup.object({
    amount: yup
        .number('Amount is required')
        .required('Amount is required'),
        donor: yup
        .string('Donor is required')
        .required('Donor is required'),
    details: yup
        .string('Details is required')
        .required('Details is required'),
    
});