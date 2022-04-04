import * as yup from 'yup';

const phoneRegExp = /^(((\+*)[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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