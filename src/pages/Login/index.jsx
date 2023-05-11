import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Grid, Typography, Paper, Container,Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { useParams,useNavigate } from "react-router-dom";

import { userLogin } from "../../redux/actions";
import { STATUS } from "../../redux/constants";
import { rolesEnum } from "../../layouts/DashboardLayout/pages";
import CeroButton from "../../components/CeroButton";
import CeroInput from "../../components/CeroInput";
import ValidationSchema from "./ValidationSchema";
import logo_final from "../../assets/logo_final.svg";
import arrowWithBg from "../../assets/SideImage1.png";
import CeroLoader from "../../components/CeroLoader";
import useStyles from "./styles";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loginData = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  let { userType } = useParams();

  useEffect(() => {
    if (loginData.status === STATUS.ERROR && loginData.message) {
      enqueueSnackbar(loginData.message, { variant: "error" });
    }
  }, [loginData.message, loginData.status, enqueueSnackbar]);

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema,
  });

  const handleLogin = () => {
    dispatch(
      userLogin(userType, loginForm.values.email, loginForm.values.password)
    );
  };

  return (
    <Box display="flex" className={classes.login}>
      <Box className={classes.leftSide}>
        <img src={arrowWithBg} className={classes.leftSideLogo} alt="Background img" />
      </Box>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={[classes.login,classes.rightSide]}
      >
        {loginData.status === STATUS.RUNNING && (
          <CeroLoader loadingText="Loading" />
        )}

        <Container component="main" maxWidth="xs">
          <Box className={classes.logo}>
            <img src={logo_final} alt="ceroED Logo" />
          </Box>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            marginBottom={2}
            fontWeight={600}
            color="#78350F"
            mt={2}
          >
            {/* {userType === rolesEnum.AUDITOR ? 'Auditor Login' : 'Login'} */}
            Login as
          </Typography>
          <Box className={classes.loginCard}>
          <Stack className={classes.options}>  
                    <CeroButton buttonText="Business" className={userType==='business'?classes.buttonActive:classes.buttonInactive} onClick={() => navigate('/login/business')} />
                    <CeroButton buttonText="Auditor" className={userType==='auditor'?classes.buttonActive:classes.buttonInactive} onClick={() => navigate('/login/auditor')} />
                </Stack>
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
            <Link
              className={classes.forgotLink}
              to={`/forgot-password/${userType}`}
              variant="h3"
            >
              Forgot Password?
            </Link>
            <CeroButton
              fullWidth
              buttonText="Login"
              className={classes.button}
              onClick={handleLogin}
              disabled={!loginForm.dirty || !loginForm.isValid}
            />
            <Link to="/signup" className={classes.newUser}>
            <Box component="span" color="#000" fontWeight={450} fontSize={12}>Don't have an account? </Box>
              <Box component="span" fontSize={14} fontWeight={600}>Sign Up</Box> 
            </Link>
            <Typography align="center" mt={12} sx={{ fontStyle: 'italic',fontWeight:500,fontSize:"12px" }}>&copy;2023 CeroED,Inc.All rights reserved.</Typography>
          </Box>
        </Container>
      </Grid>
    </Box>
  );
};

export default Login;
