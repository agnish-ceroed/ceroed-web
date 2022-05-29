import { Container } from "@mui/material";
import dayjs from "dayjs";

import CeroInfoPair from "../../../components/CeroInfoPair";
import useStyles from "./styles";

const Status = ({ticketDetails}) => {
  const classes = useStyles();


  return (
    <Container className={classes.container}>
      <CeroInfoPair title="Facility" value={ticketDetails.facility_name} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Assignee" value={ticketDetails.assignee_name} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Scope" value={ticketDetails.ticket_scope} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Created By" value={ticketDetails.ticket_owner_name} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Created on" value={ticketDetails.created_ts && dayjs(ticketDetails.created_ts).format('DD MMM YYYY HH:mm')} classes={{ container: classes.infoContainer}} />
      <CeroInfoPair title="Last updated on" value={ticketDetails.last_updated_ts && dayjs(ticketDetails.last_updated_ts).format('DD MMM YYYY HH:mm')} classes={{ container: classes.infoContainer}} />
    </Container>
  );
};

export default Status;
