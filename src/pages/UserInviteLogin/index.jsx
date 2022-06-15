import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Grid, Typography, Paper, Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';

import { setEmailConfirmed, userInviteLogin } from "../../redux/actions";
import { STATUS } from '../../redux/constants';
import CeroButton from '../../components/CeroButton';
import CeroInput from '../../components/CeroInput'
import validationSchema from './schema';
import CeroEdLogo from '../../assets/images/Logo';
import CeroLoader from '../../components/CeroLoader';
import useStyles from "./styles";

const UserInviteLogin = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    let { userToken, userId } = useParams();

    const emailConfirmationData = useSelector((state) => state.users.setEmailConfirmed);
    const loginData = useSelector((state) => state.auth);

    const loginForm = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema
    });

    useEffect(() => {
        dispatch(setEmailConfirmed(userId, userToken));
    }, [userToken]);

    useEffect(() => {
        if (emailConfirmationData.status === STATUS.ERROR) {
            enqueueSnackbar(emailConfirmationData.message || "Invalid user details", { variant: 'error' })
        } else if(emailConfirmationData.status === STATUS.SUCCESS) {
            loginForm.setValues({
                email: emailConfirmationData.data.email,
            })
        }
    }, [emailConfirmationData.message, emailConfirmationData.status, enqueueSnackbar])

    useEffect(() => {
        if (loginData.status === STATUS.ERROR && loginData.message) {
            enqueueSnackbar(loginData.message, { variant: 'error' })
        } else if (loginData.status === STATUS.SUCCESS) {
            enqueueSnackbar(loginData.message, { variant: 'success' })
        }
    }, [loginData.message, loginData.status, enqueueSnackbar])

    const handleLogin = () => {
        dispatch(userInviteLogin(userId, userToken,  loginForm.values.name, loginForm.values.password))
    }

    return (
        <Grid container justifyContent='center' alignItems='center' className={classes.login}>
            {loginData.status === STATUS.RUNNING && <CeroLoader loadingText="Loading" />}
            {emailConfirmationData.status !== STATUS.ERROR && <Container component="main" maxWidth="xs">
                <Box className={classes.logo}>
                    <CeroEdLogo />
                </Box>
                <Paper className={classes.loginCard}>
                    <Typography component="h1" variant="h5" align='center' marginBottom={6}>
                        Signup
                    </Typography>
                    <CeroInput
                        required
                        fullWidth
                        disabled
                        id="email"
                        label="Email Address"
                        value={loginForm.values.email}
                    />
                    <CeroInput
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        value={loginForm.values.name}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        error={loginForm.touched.name && loginForm.errors.name}
                    />
                    <CeroInput
                        required
                        type="password"
                        id="password"
                        label="Enter Password"
                        value={loginForm.values.password}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        error={loginForm.touched.password && loginForm.errors.password}
                        fullWidth
                    />
                    <CeroInput
                        required
                        type="password"
                        id="confirmPassword"
                        label="Confirm Password"
                        value={loginForm.values.confirmPassword}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        error={loginForm.touched.confirmPassword && loginForm.errors.confirmPassword}
                        fullWidth
                    />
                    <CeroButton
                        fullWidth
                        buttonText='Signup'
                        className={classes.button}
                        onClick={handleLogin}
                        disabled={!loginForm.dirty || !loginForm.isValid}
                    />
                </Paper>
            </Container>}
            {emailConfirmationData.status === STATUS.ERROR && <Container component="main" maxWidth="xs">
                <Typography >Link seems to be invalid or expired.</Typography>
            </Container>}
        </Grid>
    );
}

export default UserInviteLogin;
