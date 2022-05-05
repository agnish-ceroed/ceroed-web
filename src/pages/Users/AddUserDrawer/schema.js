import * as yup from 'yup';

export const userSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    role: yup
        .string('Role is required')
        .required('Role is required'),
    facility: yup.string().when('role', {
        is: 'facilitator',
        then: yup.string().required('Facility is required'),
    })
});
