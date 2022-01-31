import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";

import GoalCard from "../../../components/GoalCard";
import useStyles from "./styles";

const GoalSelection = () => {
    const classes = useStyles();
    const [selectedGoal, setGoal] = useState();

    const goals = [
        {
            id: 0,
            title: "Carbon neutral",
            description: "Completely offset GHG emission",
        },
        {
            id: 1,
            title: "RE 100",
            description: "Rely on 100% renewable energy",
        },
        {
            id: 2,
            title: "Net Zero",
            description:
                "Reduce emissions in line with Science Based Targets & in line with 1.5degC",
        },
        {
            id: 3,
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

    return (
        <Grid container className={classes.goalContainer}>
            <Typography variant="h6" gutterBottom>What is your goal?</Typography>
            {goals.map((option) => {
                return (
                    <GoalCard
                        onClick={() => setGoal(option.title)}
                        selected={selectedGoal}
                        title={option.title}
                        description={option.description}
                    />
                );
            })}
        </Grid>
    );
}

export default GoalSelection;
