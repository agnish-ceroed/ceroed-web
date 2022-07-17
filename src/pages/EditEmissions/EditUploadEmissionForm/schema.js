import * as yup from 'yup';

export const updateUploadValidation = yup.object({
    content: yup
        .string('Content is required')
        .required('Content is required'),
});
