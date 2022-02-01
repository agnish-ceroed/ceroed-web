import { Container, Typography } from "@mui/material";
import DasboardLayout from '../../layouts/DasboardLayout'

import useStyles from "./styles";

const Contacts = () => {
    const classes = useStyles();

    return (
        <DasboardLayout>
            <Container className={classes.container}>
                <Typography variant="h1" component="h2" >Contacts Page</Typography>
            </Container>
        </DasboardLayout>
    );
};

export default Contacts;