import React, { useState } from 'react';
import { Box, Container, Paper, Stepper, Step, StepLabel, Typography, Grid } from '@mui/material';

import CeroButton from '../../components/CeroButton';
import CompanyDetails from './CompanyDetails';
import UserDetails from './UserDetails';
import GoalSelection from './GoalSelection'
import useStyles from "./styles";

const steps = ['User', 'Company', 'Goal'];

const Signup = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <UserDetails />;
            case 1:
                return <CompanyDetails />;
            case 2:
                return <GoalSelection />;
            default:
                throw new Error('Unknown step');
        }
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
                    {activeStep === steps.length ? (
                        <Typography variant="h5" gutterBottom>Thank you !! Registration completed.</Typography>
                    ) : (
                        <>
                            {getStepContent(activeStep)}
                            <Box className={classes.cardFooter}>
                                {activeStep !== 0 && (
                                    <CeroButton
                                        onClick={handleBack}
                                        buttonText='Back'
                                        className={classes.button}
                                    />
                                )}

                                <CeroButton
                                    variant="contained"
                                    onClick={handleNext}
                                    buttonText={activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                    classes={{ root: classes.button }}
                                />
                            </Box>
                        </>
                    )}
                </Paper>
            </Container>
        </Grid >
    );
}

export default Signup;
