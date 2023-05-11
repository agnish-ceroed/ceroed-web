import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useFormik } from 'formik';

import { userDetailsSchema } from '../schema';

import CeroPhoneInput from '../../../components/CeroPhoneInput';
import CeroInput from '../../../components/CeroInput';
import CeroButton from '../../../components/CeroButton';
import useStyles from '../styles';

const UserDetails = (props) => {
    const classes = useStyles();
    const userDetailsForm = useFormik({
        initialValues: {
            name: props.userDetails.name || '',
            email: props.userDetails.email || '',
            phone: props.userDetails.phone || '',
            password: props.userDetails.password || '',
        },
        validationSchema: userDetailsSchema,
        validateOnMount: true,
        onSubmit: (values) => {
        },
    });

    const handleNext = () => {
        props.onNext(0, userDetailsForm.values);
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>User details</Typography>
            <CeroInput
                required
                fullWidth
                label="Name"
                name="name"
                value={userDetailsForm.values.name}
                onChange={userDetailsForm.handleChange}
                onBlur={userDetailsForm.handleBlur}
                error={userDetailsForm.touched.name && userDetailsForm.errors.name}
            />
            <CeroInput
                required
                fullWidth
                label="Email address"
                name="email"
                value={userDetailsForm.values.email}
                onChange={userDetailsForm.handleChange}
                onBlur={userDetailsForm.handleBlur}
                error={userDetailsForm.touched.email && userDetailsForm.errors.email}
            />
            <CeroPhoneInput
                required
                fullWidth
                label="Contact Number"
                name="phone"
                value={userDetailsForm.values.phone}
                onChange={(value) => userDetailsForm.setFieldValue("phone", value)}
                onBlur={userDetailsForm.handleBlur}
                error={userDetailsForm.touched.phone && userDetailsForm.errors.phone}
            />
            <CeroInput
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={userDetailsForm.values.password}
                onChange={userDetailsForm.handleChange}
                onBlur={userDetailsForm.handleBlur}
                error={userDetailsForm.touched.password && userDetailsForm.errors.password}
            />
            <Box className={classes.cardFooter}>
                <CeroButton
                    variant="contained"
                    onClick={handleNext}
                    buttonText={'Next'}
                    disabled={!userDetailsForm.isValid}
                    // classes={{ root: classes.button }}
                    className={classes.button}
                />
            </Box>
        </>
    );
}

export default UserDetails;
