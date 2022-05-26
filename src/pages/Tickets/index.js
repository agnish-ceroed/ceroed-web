import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Grid, Box } from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import CeroDropdown from "../../components/CeroDropdown";
import { sampleYear } from "../../constants";
import TicketsTable from "./TicketsTable";
import { listTickets } from "../../redux/actions";
import useStyles from "./styles";
import { STATUS } from "../../redux/constants";
import CeroButton from "../../components/CeroButton";
import TicketStatus from "./TicketStatus";

const ticketTypeOption = [
  {
    key: "all",
    value: "All",
  },
  {
    key: "self",
    value: "My tickets",
  },
  {
    key: "assigned",
    value: "Assigned tickets",
  },
];

const ticketStatusOption = [
  {
    key: "all",
    value: "All",
  },
  {
    key: "open",
    value: "Open",
  },
  {
    key: "closed",
    value: "Closed",
  },
];

const Tickets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [year, setYear] = useState(new Date().getFullYear());
  const [ticketType, setTicketType] = useState("all");
  const [ticketStatus, setTicketStatus] = useState("all");

  const userInfo = useSelector((state) => state.auth.userInfo);
  const ticketList = useSelector((state) => state.ticket.listTickets.data);
  const ticketCount = useSelector((state) => state.ticket.listTickets.count);
  const ticketListStatus = useSelector(
    (state) => state.ticket.listTickets.status
  );

  const onSelectTicket = (selectedRow) => {
    navigate(`/tickets/?ticketId=${selectedRow.id}`);
  };

  const onClear = () => {
    setYear(new Date().getFullYear());
    setTicketType("all");
    setTicketStatus("all");
  };

  useEffect(() => {
    dispatch(listTickets({ year, ticketType, ticketStatus }));
  }, [year, ticketType, ticketStatus, dispatch]);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Typography variant="h7" component="span">
          Tickets
        </Typography>
        <Grid
          className={classes.filterContainer}
          container
          columnSpacing={2}
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item xs={1.5}>
            <CeroDropdown
              id="year"
              label="Year"
              fullWidth
              options={sampleYear}
              onChange={({ target }) => setYear(target.value)}
              selectedValue={year}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CeroDropdown
              id="ticketType"
              label="Ticket type"
              fullWidth
              options={ticketTypeOption}
              onChange={({ target }) => setTicketType(target.value)}
              selectedValue={ticketType}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CeroDropdown
              id="ticketStatus"
              label="Ticket status"
              fullWidth
              options={ticketStatusOption}
              onChange={({ target }) => setTicketStatus(target.value)}
              selectedValue={ticketStatus}
            />
          </Grid>
          <Grid item xs={1.5}>
            <CeroButton
              buttonText="Clear"
              className={classes.button}
              onClick={onClear}
            />
          </Grid>
        </Grid>
        {ticketListStatus === STATUS.SUCCESS ? (
          <Fragment>
            <TicketStatus
              ticketList={ticketList}
              ticketCount={ticketCount}
              userId={userInfo?.id}
              setTicketType={setTicketType}
            />
            <TicketsTable
              ticketList={ticketList}
              onSelectTicket={onSelectTicket}
              userInfo={userInfo}
            />
          </Fragment>
        ) : (
          <Box className={classes.loader}>
            <Typography variant="h7" component="span">
              {ticketListStatus === STATUS.RUNNING
                ? "Loading..."
                : ticketListStatus === STATUS.ERROR
                ? "Something went wrong. Please try again later"
                : ""}
            </Typography>
          </Box>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default Tickets;
