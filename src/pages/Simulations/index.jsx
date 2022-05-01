import { Container, Typography } from "@mui/material";
import DashboardLayout from '../../layouts/DashboardLayout'

import useStyles from "./styles";

const Simulations = () => {
    const classes = useStyles();

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <Typography variant="h4" component="h4" >Simulations Page</Typography>
            </Container>
        </DashboardLayout>
    );
};

export default Simulations;