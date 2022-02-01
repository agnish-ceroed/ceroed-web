import { Container, Typography } from "@mui/material";
import DasboardLayout from '../../layouts/DasboardLayout'

import useStyles from "./styles";

const Tasks = () => {
    const classes = useStyles();

    return (
        <DasboardLayout>
            <Container className={classes.container}>
                <Typography variant="h1" component="h2" >Tasks Page</Typography>
            </Container>
        </DasboardLayout>
    );
};

export default Tasks;