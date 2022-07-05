import * as yup from 'yup';

export const schemeValidation = yup.object({
    attended: yup
        .number('Number of attendees is required')
        .required('Number of attendees is required'),
    content: yup
        .string('Conetent Covered is required')
        .required('Conetent Covered is required'),
    objective: yup
        .string('Objective is required')
        .required('Objective is required'),
    
});