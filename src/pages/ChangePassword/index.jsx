import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Box, Container, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { STATUS } from '../../redux/constants';
import { changePassword } from '../../redux/actions';
import CeroButton from '../../components/CeroButton'
import CeroInput from '../../components/CeroInput'
import DashboardLayout from '../../layouts/DashboardLayout'
import ValidationSchema from './ValidationSchema';
import useStyles from "./styles";

const ChangePassword = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const changePasswordData = useSelector((state) => state.auth.changeUserPassword)

    useEffect(() => {
        if (changePasswordData.status === STATUS.SUCCESS) {
            enqueueSnackbar(changePasswordData.data.message, { variant: 'success' });
            navigate("/login");
            //logout api need to call 
        } else if (changePasswordData.status === STATUS.ERROR) {
            enqueueSnackbar(changePasswordData.message.message, { variant: 'error' });
        }
    }, [changePasswordData, enqueueSnackbar, navigate])

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
    };

    return (
        <DashboardLayout>
            <Container component="main" maxWidth="sm">
                <Paper variant="outlined" className={classes.container}>
                    <Typography component="h1" variant="h5" className={classes.cardTitle} align="center">
                        Change Password
                    </Typography>
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
                        <CeroButton
                            variant="contained"
                            onClick={handleSubmit}
                            buttonText="Submit"
                            disabled={!changePasswordForm.dirty || !changePasswordForm.isValid || changePasswordData.status === STATUS.RUNNING}
                            fullWidth
                        />
                    </Box>
                </Paper>
            </Container>
        </DashboardLayout >
    );
}

export default ChangePassword;
