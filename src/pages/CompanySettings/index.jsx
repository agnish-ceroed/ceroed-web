import { Container, Grid, Typography } from "@mui/material";

import DashboardLayout from '../../layouts/DashboardLayout'
import CompanySettingsForm from './CompanySettingsForm'
import useStyles from "./styles";

const CompanySettings = () => {
    const classes = useStyles();
    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <Typography variant="h5" component="h5">Company Settings Page</Typography>
                <Grid container spacing={4} className={classes.mainContainer}>
                    <Grid xs={12} md={7} item>
                        <CompanySettingsForm />
                    </Grid>
                </Grid>
            </Container>
        </DashboardLayout>
    );
};

export default CompanySettings;