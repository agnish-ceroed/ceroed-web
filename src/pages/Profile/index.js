import { Container, Typography } from "@mui/material";
import DashboardLayout from '../../layouts/DashboardLayout'

import useStyles from "./styles";

const Profile = () => {
    const classes = useStyles();

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <Typography variant="h4" component="h4" >Profile</Typography>
            </Container>
        </DashboardLayout>
    );
};

export default Profile;