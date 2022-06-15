import { Container, Typography } from "@mui/material";
import DashboardLayout from '../../layouts/DashboardLayout'

import useStyles from "./styles";

const Goals = () => {
    const classes = useStyles();

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <Typography variant="h4" component="h4" >Goals</Typography>
            </Container>
        </DashboardLayout>
    );
};

export default Goals;