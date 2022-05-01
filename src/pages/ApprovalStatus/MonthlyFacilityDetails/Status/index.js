import { Container } from "@mui/material";
import { Box } from "@mui/system";

import useStyles from "./styles";

const Status = (props) => {
  const classes = useStyles();
  const {
    status,
    approvedBy,
    auditStatus,
    noOfTickets,
    approvedDate,
    auditorStatus,
  } = props;

  return (
    <Container className={classes.container}>
      <Box>{`Status: ${status}`}</Box>
      <Box>{`Approved by: ${approvedBy} (Approver)`}</Box>
      <Box>{`Approved date: ${approvedDate}`}</Box>
      <Box>{`Audit status: ${auditStatus}`}</Box>
      <Box>{`Auditor assigned: ${auditorStatus}`}</Box>
      <Box
        className={classes.ticket}
      >{`No of tickets opened: ${noOfTickets}`}</Box>
    </Container>
  );
};

export default Status;
