import * as yup from 'yup';

export default yup.object({
    name: yup
        .string('Enter your name')
        .min(5, 'Enter a valid name')
        .required('Name is required'),
    password: yup
        .string('Enter your password')
        // .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords does not match')
        .required('Password is required'),
})
