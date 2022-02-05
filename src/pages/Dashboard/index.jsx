import { Container, Typography } from "@mui/material";
import DashboardLayout from '../../layouts/DashboardLayout';

import useStyles from "./styles";

const Dashboard = () => {
    const classes = useStyles();

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <Typography variant="h1" component="h2" >Dashboard Page</Typography>
            </Container>
        </DashboardLayout>
    );
};

export default Dashboard;