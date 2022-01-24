import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'

import useStyles from "./styles";
import { userLogin } from "../../redux/actions";

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loginData = useSelector((state) => state.user);

    console.log('login data', loginData);

    useEffect(() => {
        dispatch(userLogin("ajesh", "passowrd"));
    }, []);

    return (
        <Container className={classes.container}>
            <Typography variant="h1" component="h2" >Login Page</Typography>
        </Container>
    );
};

export default Login;