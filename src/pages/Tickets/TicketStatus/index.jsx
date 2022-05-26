import { Grid } from "@mui/material";
import clsx from "clsx";

import StatisticsCard from "../../Dashboard/Statistics/StatisticsCard";
import useStyles from "./styles";

const TicketStatus = ({
  setTicketType,
  ticketCount,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={5} className={classes.container}>
      <Grid
        item
        className={clsx(classes.cardItem, classes.firstItem)}
        xs={4}
        onClick={() => setTicketType("self")}
      >
        <StatisticsCard
          index={0}
          title={"My tickets"}
          subtitle={""}
          attributes={[
            {
              value:
                ticketCount &&
                ticketCount.owned_tickets &&
                ticketCount.owned_tickets.open
                  ? ticketCount.owned_tickets.open
                  : 0,
              name: "Open",
            },
            {
              value:
                ticketCount &&
                ticketCount.owned_tickets &&
                ticketCount.owned_tickets.closed
                  ? ticketCount.owned_tickets.closed
                  : 0,
              name: "Closed",
            },
          ]}
        />
      </Grid>
      <Grid
        item
        className={classes.cardItem}
        xs={4}
        onClick={() => setTicketType("assigned")}
      >
        <StatisticsCard
          index={1}
          title={"Tickets assigned to me"}
          subtitle={""}
          attributes={[
            {
              value:
                ticketCount &&
                ticketCount.assigned_tickets &&
                ticketCount.assigned_tickets.open
                  ? ticketCount.assigned_tickets.open
                  : 0,
              name: "Open",
            },
            {
              value:
                ticketCount &&
                ticketCount.assigned_tickets &&
                ticketCount.assigned_tickets.closed
                  ? ticketCount.assigned_tickets.closed
                  : 0,
              name: "Closed",
            },
          ]}
        />
      </Grid>
      <Grid
        item
        className={classes.cardItem}
        xs={4}
        onClick={() => setTicketType("all")}
      >
        <StatisticsCard
          index={2}
          title={"All tickets"}
          subtitle={""}
          attributes={[
            {
              value:
                ticketCount &&
                ticketCount.all_tickets &&
                ticketCount.all_tickets.open
                  ? ticketCount.all_tickets.open
                  : 0,
              name: "Open",
            },
            {
              value:
                ticketCount &&
                ticketCount.all_tickets &&
                ticketCount.all_tickets.closed
                  ? ticketCount.all_tickets.closed
                  : 0,
              name: "Closed",
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default TicketStatus;
