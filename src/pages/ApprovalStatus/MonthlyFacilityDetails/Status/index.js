import { Container } from "@mui/material";

import CeroInfoPair from "../../../../components/CeroInfoPair";
import useStyles from "./styles";

const Status = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <CeroInfoPair title="Status" value={props.status} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Approved by" value={props.approvedBy} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Auditor assigned" value={props.auditorAssigned} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Audit status" value={props.auditStatus} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="No of tickets opened" value={props.noOfTickets} classes={{ container: classes.infoContainer}} />
    </Container>
  );
};

export default Status;
