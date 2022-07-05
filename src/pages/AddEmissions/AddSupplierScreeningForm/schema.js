import * as yup from 'yup';

export const schemeValidation = yup.object({
    
    supplier: yup
        .number('Supplier is required')
        .required('Supplier is required'),
    details: yup
        .string('Details is required')
        .required('Details is required'),
    
});