import * as yup from 'yup';

const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
const websiteRegex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const companySchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    phone: yup
        .string().matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone number is required'),
    website: yup.string()
        .matches(websiteRegex, 'Website is not valid')
        .required('Website is required')
});

export const accountSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    name: yup
        .string('Enter your name')
        .required('Name is required'),
});
