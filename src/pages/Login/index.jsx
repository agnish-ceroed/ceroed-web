import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Grid, Box, Typography, Paper, Container } from '@mui/material';

import { userLogin } from "../../redux/actions";
import CeroButton from '../../components/CeroButton';
import CeroInput from '../../components/CeroInput'
import useStyles from "./styles";

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loginData = useSelector((state) => state.user);

    console.log('login data', loginData);

    useEffect(() => {
        dispatch(userLogin("ajesh", "passowrd"));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            console.log(values)
        },
    });

    return (
        <Grid container justifyContent='center' alignItems='center' className={classes.login}>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.loginCard}>
                    <Typography component="h1" variant="h5" align='center' marginBottom={6}>
                        Login
                    </Typography>
                    <CeroInput
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        values={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <CeroInput
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        values={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <CeroInput
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                        autoComplete="current-password"
                        values={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <CeroButton
                        fullWidth
                        buttonText='Login'
                        className={classes.button}
                    />
                    <Link to="/signup" variant="body2">Don't have an account? Sign Up</Link>
                </Paper>
            </Container>
        </Grid>
    );
}

export default Login
