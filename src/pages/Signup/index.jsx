import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper, Stepper, Step, StepLabel, Typography, Grid, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import CompanyDetails from './CompanyDetails';
import UserDetails from './UserDetails';
import GoalSelection from './GoalSelection';
import { userSignUp } from '../../redux/actions/auth';
import { STATUS } from '../../redux/constants';
import useStyles from "./styles";
import CeroEdLogo from '../../assets/images/Logo';

const steps = ['User', 'Company', 'Goal'];

const Signup = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const signupData = useSelector((state) => state.auth.signup);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({});
    const [companyDetails, setCompanyDetails] = useState({});
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (signupData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Successfully Signed up', { variant: 'success' });
            navigate('/emissions');
        } else if (signupData.status === STATUS.ERROR) {
            enqueueSnackbar(signupData.message, { variant: 'error' });
            setActiveStep(0)
        }
    }, [signupData.status, signupData.message, enqueueSnackbar, navigate]);

    const handleNext = (step, data) => {
        setActiveStep(activeStep + 1);
        if (step === 0) {
            setUserDetails(data);
        } else if (step === 1) {
            setCompanyDetails(data);
        } else {
            const request = {
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phone,
                password: userDetails.password,
                company: {
                    company_name: companyDetails.company,
                    company_phone: companyDetails.phone,
                    company_est_year: companyDetails.establishedYear,
                    company_address: companyDetails.address,
                    company_website: companyDetails.website,
                    company_country: companyDetails.country,
                    company_email: companyDetails.email,
                    company_industry_type: companyDetails.industryType,
                    emission_goal: data
                }
            }
            dispatch(userSignUp(request));
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Grid container justifyContent='center' alignContent='center' className={classes.signup}>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                {/* <Box className={classes.logo}>
                    <CeroEdLogo />
                </Box> */}
                <Paper variant="outlined" className={classes.signupContainer}>
                    <Typography component="h1" variant="h4" fontWeight={600} color="#78350F" align="center">
                        Sign up
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper} sx={{'.MuiStepLabel-root .Mui-active': { color: "#78350F" },
                            '& .MuiStepLabel-root .Mui-completed': { color: "#78350F" }}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === 0 && <UserDetails userDetails={userDetails} onNext={handleNext} />}
                    {activeStep === 1 && <CompanyDetails companyDetails={companyDetails} onNext={handleNext} onBack={handleBack} />}
                    {activeStep === 2 && <GoalSelection onNext={handleNext} onBack={handleBack} />}
                </Paper>
            </Container>
        </Grid >
    );
}

export default Signup;
