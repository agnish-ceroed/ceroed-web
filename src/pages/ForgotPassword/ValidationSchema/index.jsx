import * as yup from 'yup';

export default [
    yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
    }),
    yup.object({
        otp: yup
            .number('Enter your otp')
            .min(8, 'OTP should be of minimum 6 length')
            .required('OTP is required'),
    }),
    yup.object({
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    })
]
