import { Container } from "@mui/material";
import dayjs from "dayjs";

import CeroInfoPair from "../../../components/CeroInfoPair";
import useStyles from "./styles";

const Status = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <CeroInfoPair title="Status" value={props.status} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Assignee" value={props.assignedTo} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Audited by" value={props.auditedBy} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Audited on" value={props.auditedOn ? dayjs(props.auditedOn).format('DD/MM/YYYY') : '-'} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="No of Tickets" value={props.noOfTickets} classes={{ container: classes.infoContainer}} />
    </Container>
  );
};

export default Status;
