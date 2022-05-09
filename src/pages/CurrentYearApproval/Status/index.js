import { Container } from "@mui/material";
import { Box } from "@mui/system";

import useStyles from "./styles";

const Status = (props) => {
  const classes = useStyles();
  const { status, assignedTo, auditStatus, noOfTickets } = props;

  return (
    <Container className={classes.container}>
      {status && <Box>{`Status: ${status}`}</Box>}
      <Box>{`Audit assigned to: ${assignedTo} (Auditor)`}</Box>
      <Box>{`Audit status: ${auditStatus}`}</Box>
      {noOfTickets && (
        <Box
          className={classes.ticket}
        >{`No of tickets opened: ${noOfTickets}`}</Box>
      )}
    </Container>
  );
};

export default Status;
