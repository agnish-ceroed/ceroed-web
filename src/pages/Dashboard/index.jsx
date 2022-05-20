import React, { useState } from 'react'
import { Container, Grid } from "@mui/material";

import DashboardLayout from '../../layouts/DashboardLayout';
import DashboardHeader from "./DashboardHeader";
import TotalEmissionChart from './TotalEmissionChart';
import EmissionChart from './EmissionChart';
import LineChart from './LineChart';
import GeographicalChart from './GeographicalChart';
import useStyles from "./styles";
import EmissionMonthChart from './EmissionMonthChart';
import Statistics from './Statistics';

const Dashboard = () => {
    const classes = useStyles();
    const [filter, setFilter] = useState();

    const onApplyFilter = (filter) => {
        setFilter(filter);
    }

    return (
    <DashboardLayout>
        <Container className={classes.container}>
            <DashboardHeader onApplyFilter={onApplyFilter} />
            <Statistics />
            <Grid container spacing={6} className={classes.gridContainer}>
                <Grid xs={6} item>
                    <TotalEmissionChart filter={filter} />
                </Grid>
                <Grid xs={6} item>
                    <EmissionChart filter={filter} />
                </Grid>
                {/* <Grid xs={6} item>
                        <LineChart />
                    </Grid> */}
                <Grid xs={6} item>
                    <GeographicalChart filter={filter} />
                </Grid>
                <Grid xs={6} item>
                    <EmissionMonthChart filter={filter} />
                </Grid>
            </Grid>
        </Container>
    </DashboardLayout>
);
};

export default Dashboard;