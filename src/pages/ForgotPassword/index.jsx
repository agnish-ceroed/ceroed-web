import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Grid, Box } from '@mui/material';
import { useSnackbar } from 'notistack';

import { STATUS } from '../../redux/constants';
import { resetPassword, getForgotPasswordOtp, resetForgotStatus } from '../../redux/actions';
import EmailSection from './EmailSection'
import OtpValidation from './OtpValidation'
import ChangePassword from './ChangePassword'
import useStyles from "./styles";
import CeroEdLogo from '../../assets/images/Logo';

const ForgotPassword = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [isProgress, setProgress] = useState(0);
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')

    const sentEmailData = useSelector((state) => state?.auth?.forgot);
    const resetPasswordData = useSelector((state) => state?.auth?.resetPassword);

    useEffect(() => {
        if (isProgress === 0 && sentEmailData?.status === STATUS.SUCCESS) {
            setProgress(isProgress + 1);
        } else if (isProgress === 2 && resetPassword.status === STATUS.SUCCESS) {
            setProgress(isProgress + 1);
            enqueueSnackbar("Password changed successfully", { variant: 'success' });
            navigate('/login')
        } else if (isProgress === 0 && sentEmailData?.status === STATUS.ERROR) {
            enqueueSnackbar(sentEmailData.message.message, { variant: 'error' });
        } else if (isProgress === 2 && resetPasswordData?.status === STATUS.ERROR) {
            enqueueSnackbar(resetPasswordData.message.message, { variant: 'error' });
            setProgress(1);
            dispatch(resetForgotStatus())
        }
    }, [sentEmailData, resetPasswordData, isProgress, dispatch, enqueueSnackbar, navigate])

    const handleNext = (step, data) => {
        if (step === 0) {
            setEmail(data.email)
            dispatch(getForgotPasswordOtp(data.email));
        } else if (step === 1) {
            setOtp(data.otp)
            setProgress(isProgress + 1);
        } else if (step === 2) {
            dispatch(resetPassword(email, otp, data))
        }
    };


    const getTitle = () => {
        switch (isProgress) {
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

    return (
        <Grid container justifyContent='center' alignContent='center' className={classes.forgotPassword}>
            <Container component="main" maxWidth="sm">
                <Box className={classes.logo}>
                    <CeroEdLogo />
                </Box>
                <Paper variant="outlined" className={classes.container}>
                    <Typography component="h1" variant="h5" className={classes.cardTitle} align="center">
                        {getTitle(isProgress)}
                    </Typography>
                    <>
                        {isProgress === 0 && <EmailSection onNext={handleNext} />}
                        {isProgress === 1 && <OtpValidation onNext={handleNext} />}
                        {isProgress === 2 && <ChangePassword onNext={handleNext} />}

                    </>
                </Paper>
            </Container>
        </Grid >
    );
}

export default ForgotPassword;
