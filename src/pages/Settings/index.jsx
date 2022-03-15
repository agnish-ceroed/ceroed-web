import { Container, Grid, Typography } from "@mui/material";

import DashboardLayout from '../../layouts/DashboardLayout'
import AccountSettings from "./AccountSettings";
import CompanySettings from './CompanySettings'
import useStyles from "./styles";

const Settings = () => {
    const classes = useStyles();
    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <Typography variant="h5" component="h5">Settings Page</Typography>
                <Grid container spacing={4} className={classes.mainContainer}>
                    <Grid xs={12} md={5} item>
                        <AccountSettings />
                    </Grid>
                    <Grid xs={12} md={7} item>
                        <CompanySettings />
                    </Grid>
                </Grid>
            </Container>
        </DashboardLayout>
    );
};

export default Settings;