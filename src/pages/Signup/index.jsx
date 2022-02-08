import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper, Stepper, Step, StepLabel, Typography, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import CompanyDetails from './CompanyDetails';
import UserDetails from './UserDetails';
import GoalSelection from './GoalSelection';
import { userSignUp } from '../../redux/actions/auth';
import { STATUS } from '../../redux/constants';
import useStyles from "./styles";

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
        if(signupData.status === STATUS.SUCCESS) {
            enqueueSnackbar('Successfully Signedup', { variant: 'success' });
            navigate('/emissions');
        } else if(signupData.status === STATUS.ERROR) {
            enqueueSnackbar('Failed to signup', { variant: 'error' });
        }
    }, [signupData.status]);

    const handleNext = (step, data) => {
        setActiveStep(activeStep + 1);
        if(step === 0) {
            setUserDetails(data);
        } else if(step === 1) {
            setCompanyDetails(data);
        } else {
            const request = {
                userDetails,
                companyDetails,
                goal: data
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
                <Paper variant="outlined" className={classes.signupContainer}>
                    <Typography component="h1" variant="h4" fontWeight={400} align="center">
                        Sign up
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    { activeStep === 0 && <UserDetails userDetails={userDetails} onNext={handleNext} /> }
                    { activeStep === 1 && <CompanyDetails companyDetails={companyDetails} onNext={handleNext} onBack={handleBack} /> }
                    { activeStep === 2 && <GoalSelection onNext={handleNext} onBack={handleBack} /> }
                </Paper>
            </Container>
        </Grid >
    );
}

export default Signup;
