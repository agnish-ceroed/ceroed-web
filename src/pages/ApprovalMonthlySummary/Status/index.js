import { Container } from "@mui/material";
import { Box } from "@mui/system";

import useStyles from "./styles";

const Status = (props) => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Box>{`Audit Status: ${props && props.status ? props.status : 'Not audited'}`}</Box>
            <Box>{`Auditor: ${props && props.auditor ? props.auditor : 'Not assigned'}`}</Box>
        </Container>
    );
};

export default Status;