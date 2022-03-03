import * as yup from 'yup';

export default yup.object({
    oldPassword: yup
        .string('Enter your old password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Old password is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
})
