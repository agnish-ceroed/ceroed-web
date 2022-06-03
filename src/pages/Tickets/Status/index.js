import { Container, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";

import CeroInfoPair from "../../../components/CeroInfoPair";
import StyledBadge from "../../../components/StyledBadge/input";
import useStyles from "./styles";

const Status = ({ ticketDetails, userInfo }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      {userInfo.name === ticketDetails.response_waiting && (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          color={"error"}
          className={classes.waitingIndicationContainer}
        >
          <Tooltip title={"Waiting for your response"} placement="top" arrow>
            <Box className={classes.waitingIndication} />
          </Tooltip>
        </StyledBadge>
      )}
      <CeroInfoPair
        title="Facility"
        value={ticketDetails.facility_name}
        classes={{ container: classes.infoContainer }}
      />
      <CeroInfoPair
        title="Assignee"
        value={ticketDetails.assignee_name}
        classes={{ container: classes.infoContainer }}
      />
      <CeroInfoPair
        title="Scope"
        value={ticketDetails.ticket_scope}
        classes={{ container: classes.infoContainer }}
      />
      <CeroInfoPair
        title="Created By"
        value={ticketDetails.ticket_owner_name}
        classes={{ container: classes.infoContainer }}
      />
      <CeroInfoPair
        title="Created on"
        value={
          ticketDetails.created_ts &&
          dayjs(ticketDetails.created_ts).format("DD MMM YYYY HH:mm")
        }
        classes={{ container: classes.infoContainer }}
      />
      <CeroInfoPair
        title="Last updated on"
        value={
          ticketDetails.last_updated_ts &&
          dayjs(ticketDetails.last_updated_ts).format("DD MMM YYYY HH:mm")
        }
        classes={{ container: classes.infoContainer }}
      />
    </Container>
  );
};

export default Status;
