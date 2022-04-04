import * as yup from 'yup';

const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export const addFacilityValidation = yup.object({
    name: yup
        .string('Name is required')
        .required('Name is required'),
    country: yup
        .string('Select country')
        .required('Select country'),
    phone: yup
        .string().matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone number is required'),
});