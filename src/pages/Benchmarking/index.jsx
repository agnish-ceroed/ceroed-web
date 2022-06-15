import { Container, Typography } from "@mui/material";
import DashboardLayout from '../../layouts/DashboardLayout'

import useStyles from "./styles";

const Benchmarking = () => {
    const classes = useStyles();

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <Typography variant="h4" component="h4" >Benchmarking</Typography>
            </Container>
        </DashboardLayout>
    );
};

export default Benchmarking;