import React from 'react'
import { Container, Grid } from "@mui/material";

import DashboardLayout from '../../layouts/DashboardLayout';
import DashboardHeader from "./DashboardHeader";
import TotalEmissionChart from './TotalEmissionChart';
import EmissionChart from './EmissionChart';
import LineChart from './LineChart';
import GeographicalChart from './GeographicalChart';
import useStyles from "./styles";
import EmissionMonthChart from './EmissionMonthChart';

const Dashboard = () => {
    const classes = useStyles();

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <DashboardHeader />
                <Grid container spacing={6} className={classes.gridContainer}>
                    <Grid xs={6} item>
                        <TotalEmissionChart />
                    </Grid>
                    <Grid xs={6} item>
                        <EmissionChart />
                    </Grid>
                    {/* <Grid xs={6} item>
                        <LineChart />
                    </Grid> */}
                    <Grid xs={6} item>
                        <GeographicalChart />
                    </Grid>
                    <Grid xs={6} item>
                        <EmissionMonthChart />
                    </Grid>
                </Grid>
            </Container>
        </DashboardLayout>
    );
};

export default Dashboard;