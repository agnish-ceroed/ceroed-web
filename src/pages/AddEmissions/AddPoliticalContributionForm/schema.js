import * as yup from 'yup';

export const schemeValidation = yup.object({
    amount: yup
        .number('Amount is required')
        .required('Amount is required'),
    recipient: yup
        .string('Recipient is required')
        .required('Recipient is required'),
    details: yup
        .string('Details is required')
        .required('Details is required'),
    
});