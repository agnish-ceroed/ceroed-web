import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";

import GoalCard from "../../../components/GoalCard";
import CeroButton from '../../../components/CeroButton';
import useStyles from './styles';

const GoalSelection = (props) => {
    const classes = useStyles();
    const [selectedGoal, setGoal] = useState();

    const goals = [
        {
            id: 1,
            title: "Carbon neutral",
            description: "Completely offset GHG emission",
        },
        {
            id: 2,
            title: "RE 100",
            description: "Rely on 100% renewable energy",
        },
        {
            id: 3,
            title: "Net Zero",
            description:
                "Reduce emissions in line with Science Based Targets & in line with 1.5degC",
        },
        {
            id: 4,
            title: "Absolute Net Zero",
            description:
                "Reduce emissions in line with Science Based Targets & total GHG emissions accounts to 0",
        },
        {
            id: 5,
            title: "Carbon Negative",
            description: "Remove or capture more CO2 than total emission.",
        },
    ];

    const handleNext = () => {
        props.onNext(2, selectedGoal);
    }

    return (
        <>
            <Grid container className={classes.goalContainer}>
                <Typography variant="h6" gutterBottom>What is your goal?</Typography>
                {goals.map((option) => {
                    return (
                        <GoalCard
                            key={option.id}
                            onClick={() => setGoal(option.title)}
                            selected={selectedGoal}
                            title={option.title}
                            description={option.description}
                        />
                    );
                })}
            </Grid>
            <Box className={classes.cardFooter}>
                <CeroButton
                    onClick={props.onBack}
                    buttonText='Back'
                    className={classes.backButton}
                />
                <CeroButton
                    variant="contained"
                    onClick={handleNext}
                    buttonText={'Submit'}
                    disabled={!selectedGoal}
                    classes={{ root: classes.button }}
                />
            </Box>
        </>
    );
}

export default GoalSelection;
