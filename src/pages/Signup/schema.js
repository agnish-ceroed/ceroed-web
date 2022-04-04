import * as yup from 'yup';

const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const websiteRegex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const userDetailsSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    name: yup.string()
        .min(2, 'Name length should be more than 2')
        .required('Email is required'),
    phone: yup
        .string().matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone number is required'),
    password: yup
        .string().matches(passwordRegex, 'Password should contain minimum eight characters, at least one letter, one number and one special character')
        .required('Password is required'),
});

export const companyDetailsSchema = yup.object({
    company: yup
        .string()
        .required('Company name is required'),
    phone: yup
        .string()
        .required('Phone number is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    website: yup.string()
        .matches(websiteRegex, 'Website is not valid')
        .required('Website is required'),
    country: yup
        .string()
        .required('Country is required'),
    address: yup
        .string()
        .required('Address is required'),
    establishedYear: yup
        .string()
        .required('Established year is required'),
    industryType: yup
        .string()
        .required('Industry type is required'),
});
