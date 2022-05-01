import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Grid, Typography, Paper, Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';

import { userLogin } from "../../redux/actions";
import { STATUS } from '../../redux/constants';
import CeroButton from '../../components/CeroButton';
import CeroInput from '../../components/CeroInput'
import ValidationSchema from './ValidationSchema';
import CeroEdLogo from '../../assets/images/Logo';
import CeroLoader from '../../components/CeroLoader';
import useStyles from "./styles";

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loginData = useSelector((state) => state.auth);
    const { enqueueSnackbar } = useSnackbar();
    let { userType } = useParams()

    useEffect(() => {
        if (loginData.status === STATUS.ERROR && loginData.message) {
            enqueueSnackbar(loginData.message, { variant: 'error' })
        }
    }, [loginData.message, loginData.status, enqueueSnackbar])

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: ValidationSchema
    });

    const handleLogin = () => {
        dispatch(userLogin(userType, loginForm.values.email, loginForm.values.password))
    }

    return (
        <Grid container justifyContent='center' alignItems='center' className={classes.login}>
            {loginData.status === STATUS.RUNNING && <CeroLoader loadingText="Loading" />}
            <Container component="main" maxWidth="xs">
                <Box className={classes.logo}>
                    <CeroEdLogo />
                </Box>
                <Paper className={classes.loginCard}>
                    <Typography component="h1" variant="h5" align='center' marginBottom={6}>
                        Login
                    </Typography>
                    <CeroInput
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        values={loginForm.values.email}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        error={loginForm.errors.email}
                    />
                    <CeroInput
                        type="password"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        autoComplete="current-password"
                        values={loginForm.values.password}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        error={loginForm.errors.password}
                    />
                    <CeroButton
                        fullWidth
                        buttonText='Login'
                        className={classes.button}
                        onClick={handleLogin}
                        disabled={!loginForm.dirty || !loginForm.isValid}
                    />
                    <Link className={classes.forgotLink} to={`/forgot-password/${userType}`} variant="body2">Forgot Password?</Link>
                    <Link to="/signup" variant="body2">Don't have an account? Sign Up</Link>
                </Paper>
            </Container>
        </Grid>
    );
}

export default Login
