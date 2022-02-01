import { Container, Typography } from "@mui/material";
import DasboardLayout from '../../layouts/DasboardLayout'

import useStyles from "./styles";

const Email = () => {
    const classes = useStyles();

    return (
        <DasboardLayout>
            <Container className={classes.container}>
                <Typography variant="h1" component="h2" >Email Page</Typography>
            </Container>
        </DasboardLayout>
    );
};

export default Email;