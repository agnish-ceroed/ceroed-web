import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate  } from "react-router-dom";
import { Box, Container, Paper, Typography, CircularProgress } from '@mui/material';

import { changePassword } from '../../redux/actions';
import DashboardLayout from '../../layouts/DashboardLayout'
import CeroButton from '../../components/CeroButton'
import CeroInput from '../../components/CeroInput'
import ValidationSchema from './ValidationSchema';
import useStyles from "./styles";

const ChangePassword = () => {
    const [isProgress, setProgress] = useState(0);

    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const changePasswordData = useSelector((state) => state?.user?.changeUserPassword)
    let isButtonDisabled = true

    // useEffect(() => {
    //     if (isProgress === 0 && changePasswordData.status === 'success') {
    //         setProgress(isProgress + 1);
    //         navigate("/login");
    //     }
    // }, [sentEmailData, isProgress])

    const changePasswordForm = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: ValidationSchema
    });

    const handleSubmit = () => {
        dispatch(changePassword(changePasswordForm.values.oldPassword, changePasswordForm.values.password))
        setProgress(isProgress + 1);
    };

    isButtonDisabled =
        changePasswordForm.values.oldPassword &&
        !changePasswordForm.errors.oldPassword &&
        changePasswordForm.values.password &&
        !changePasswordForm.errors.password &&
        changePasswordForm.values.confirmPassword &&
        !changePasswordForm.errors.confirmPassword

    return (
        <DashboardLayout>
            <Container component="main" maxWidth="sm">
                <Paper variant="outlined" className={classes.container}>
                    <Typography component="h1" variant="h5" className={classes.cardTitle} align="center">
                        Change Password
                    </Typography>
                    {isProgress === 1 ? (
                        <Typography variant='subtitle1' gutterBottom align='center'>
                            <CircularProgress />
                        </Typography>
                    ) : (
                        <>
                            <CeroInput
                                type='password'
                                id='oldPassword'
                                label='Old password'
                                value={changePasswordForm.values.oldPassword}
                                onChange={changePasswordForm.handleChange}
                                onBlur={changePasswordForm.handleBlur}
                                error={changePasswordForm.errors.oldPassword}
                                fullWidth
                            />
                            <CeroInput
                                type='password'
                                id='password'
                                label='New password'
                                value={changePasswordForm.values.password}
                                onChange={changePasswordForm.handleChange}
                                onBlur={changePasswordForm.handleBlur}
                                error={changePasswordForm.errors.password}
                                fullWidth
                            />
                            <CeroInput
                                type='password'
                                id='confirmPassword'
                                label='Confirm password'
                                value={changePasswordForm.values.confirmPassword}
                                onChange={changePasswordForm.handleChange}
                                onBlur={changePasswordForm.handleBlur}
                                error={changePasswordForm.errors.confirmPassword}
                                fullWidth
                            />
                            <Box className={classes.buttonContainer}>
                                <CeroButton variant="contained" onClick={handleSubmit} fullWidth buttonText="Submit" disabled={!isButtonDisabled} />
                            </Box>
                        </>
                    )}
                </Paper>
            </Container>
        </DashboardLayout>
    );
}

export default ChangePassword;
