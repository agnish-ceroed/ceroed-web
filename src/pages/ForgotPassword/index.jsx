import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, Paper, Typography, Grid } from '@mui/material';

import { changePassword, getForgotPasswordOtp, verifyForgotPasswordOtp } from '../../redux/actions';
import ValidationSchema from './ValidationSchema';
import EmailSection from './EmailSection'
import OtpValidation from './OtpValidation'
import ChangePassword from './ChangePassword'
import CeroButton from '../../components/CeroButton'
import useStyles from "./styles";

const steps = ['User', 'Company', 'Goal'];

function getTitle(step) {
    switch (step) {
        case 0:
            return 'Forgot Password';
        case 1:
            return 'Enter OTP';
        case 2:
            return 'Change Password';
        default:
            throw new Error('Unknown step');
    }
}

const ForgotPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);

    const sentEmailData = useSelector((state) => state.user.forgot);
    const otpVerifyData = useSelector((state) => state.user.otpVerify);
    const changePasswordData = useSelector((state) => state.user.changePassword);
    const currentValidationSchema = ValidationSchema[activeStep]
    let isLastStep = activeStep === steps.length - 1
    let isButtonEnabled = true

    // useEffect(() => {
    //     if (activeStep === 0 && sentEmailData.status === 'success') {
    //         setActiveStep(activeStep + 1);
    //     } else if (activeStep === 1 && otpVerifyData.status === 'success') {
    //         setActiveStep(activeStep + 1);
    //     } else if (activeStep === 2 && changePasswordData.status === 'success') {
    //         setActiveStep(activeStep + 1);
    //     }
    // }, [sentEmailData, activeStep])

    const forgotPasswordForm = useFormik({
        initialValues: {
            email: '',
            otp: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: currentValidationSchema
    });

    const handleNext = () => {
        console.log(forgotPasswordForm)
        if (activeStep === 0) {
            dispatch(getForgotPasswordOtp(forgotPasswordForm.values.email));
        } else if (activeStep === 1) {
            dispatch(verifyForgotPasswordOtp(forgotPasswordForm.values.otp))
        } else if (isLastStep) {
            dispatch(changePassword(forgotPasswordForm.values.password))
        }
        setActiveStep(activeStep + 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <EmailSection
                        email={forgotPasswordForm.values.email}
                        onChangeEmail={forgotPasswordForm.handleChange}
                        onBlur={forgotPasswordForm.handleBlur}
                        onError={forgotPasswordForm.errors.email}
                    />
                );
            case 1:
                return (
                    <OtpValidation
                        otp={forgotPasswordForm.values.otp}
                        onChangeOtp={forgotPasswordForm.handleChange}
                        onBlur={forgotPasswordForm.handleBlur}
                        onError={forgotPasswordForm.errors.otp}
                    />
                );
            case 2:
                return (
                    <ChangePassword
                        password={forgotPasswordForm.values.password}
                        confirmPassword={forgotPasswordForm.values.confirmPassword}
                        onChangePassword={forgotPasswordForm.handleChange}
                        onChangeConfirmPassword={forgotPasswordForm.handleChange}
                        onBlurPassword={forgotPasswordForm.handleBlur}
                        onBlurConfirmPassword={forgotPasswordForm.handleBlur}
                        onPasswordError={forgotPasswordForm.errors.password}
                        onConfirmPasswordError={forgotPasswordForm.errors.confirmPassword}
                    />
                );
            default:
                throw new Error('Unknown step');
        }
    }

    isButtonEnabled =
        (activeStep === 0 &&
            forgotPasswordForm.values.email &&
            !Boolean(forgotPasswordForm.errors.email)) ||
        (activeStep === 1 &&
            forgotPasswordForm.values.otp &&
            !Boolean(forgotPasswordForm.errors.otp)) ||
        (activeStep === 2 &&
            forgotPasswordForm.values.password &&
            forgotPasswordForm.values.confirmPassword &&
            !Boolean(forgotPasswordForm.errors.password) &&
            !Boolean(forgotPasswordForm.errors.confirmPassword));

    return (
        <Grid container justifyContent='center' alignContent='center' className={classes.forgotPassword}>
            <Container component="main" maxWidth="sm">
                <Paper variant="outlined" className={classes.container}>
                    <Typography component="h1" variant="h5" className={classes.cardTitle} align="center">
                        {activeStep > 2 ? 'Password Changed!' : getTitle(activeStep)}
                    </Typography>
                    {activeStep === steps.length ? (
                        <Typography variant='subtitle1' gutterBottom align='center'>
                            Your password has been changed successfully,
                            you can now sign in with new password
                        </Typography>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box className={classes.buttonContainer}>
                                <CeroButton
                                    variant="contained"
                                    onClick={handleNext}
                                    fullWidth
                                    buttonText={isLastStep ? 'Submit' : activeStep === 0 ? 'SENT OTP' : 'VERIFY OTP'}
                                    disabled={!isButtonEnabled}
                                />
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </Grid >
    );
}

export default ForgotPassword;
