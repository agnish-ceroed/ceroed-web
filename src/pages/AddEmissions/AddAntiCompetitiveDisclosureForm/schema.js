import * as yup from 'yup';

export const schemeValidation = yup.object({
    facility: yup
        .string('Facility is required')
        .required('Facility is required'),
    recipient: yup
        .string('Affected party is required')
        .required('Affected party is required'),
    correctiveAction: yup
        .string('Corrective action is required')
        .required('Corrective action is required'),
    details: yup
        .string('Details is required')
        .required('Details is required'),
    
});