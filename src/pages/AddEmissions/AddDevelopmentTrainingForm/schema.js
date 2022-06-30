import * as yup from 'yup';

export const schemeValidation = yup.object({
   
    numberOfAttendee: yup
        .number('Number of Attendees is required')
        .required('Number of Attendees is required'),
    numberOfHours: yup
        .number('Number of hours is required')
        .required('Number of hours is required'),
    content: yup
        .string('Content Covered is required')
        .required('Content Covered is required'),
    objective: yup
        .string('Objective is required')
        .required('Objective is required'),
    
});