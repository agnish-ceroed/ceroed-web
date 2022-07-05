import * as yup from 'yup';

export const schemeValidation = yup.object({
    facility: yup
        .string('Facility is required')
        .required('Facility is required'),
    affected: yup
        .number('Number of Affected is required')
        .required('Number of Affected is required'),
    department: yup
        .string('Department is required')
        .required('Department is required'),
    correctiveAction: yup
        .string('Corrective action is required')
        .required('Corrective action is required'),
    details: yup
        .string('Details is required')
        .required('Details is required'),
    
});