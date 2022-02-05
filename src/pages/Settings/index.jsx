import { Container, Typography } from "@mui/material";
import DashboardLayout from '../../layouts/DashboardLayout'

import useStyles from "./styles";

const Settings = () => {
    const classes = useStyles();

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <Typography variant="h1" component="h2" >Settings Page</Typography>
            </Container>
        </DashboardLayout>
    );
};

export default Settings;