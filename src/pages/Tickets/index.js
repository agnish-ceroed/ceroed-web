import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Grid, Box ,CircularProgress} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import CeroDropdown from "../../components/CeroDropdown";
import { sampleYear } from "../../constants";
import TicketsTable from "./TicketsTable";
import CeroButton from "../../components/CeroButton";
import TicketStatus from "./TicketStatus";
import { rolesEnum } from "../../layouts/DashboardLayout/pages";

import { listTickets, getCompanyList } from "../../redux/actions";
import { STATUS } from "../../redux/constants";

import useStyles from "./styles";

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
  const [company, setCompany] = useState("");

  const userInfo = useSelector((state) => state.auth.userInfo);
  const ticketList = useSelector((state) => state.ticket.listTickets.data);
  const ticketCount = useSelector((state) => state.ticket.listTickets.count);
  const companyList = useSelector((state) => state.company.companyList.data);
  const ticketListStatus = useSelector(
    (state) => state.ticket.listTickets.status
  );

  const companyListOption = companyList.map((item) => ({
    key: item.company_id,
    value: item.company_name,
  }));

  const isAuditor = userInfo && userInfo.role === rolesEnum.AUDITOR;

  const onSelectTicket = (selectedRow) => {
    isAuditor
      ? navigate(`id?ticketId=${selectedRow.id}&companyId=${company}`)
      : navigate(`id?ticketId=${selectedRow.id}`);
  };

  const onClear = () => {
    setYear(new Date().getFullYear());
    setTicketType("all");
    setTicketStatus("all");
  };

  useEffect(() => {
    if (isAuditor) {
      company &&
        dispatch(listTickets({ year, ticketType, ticketStatus, company }));
    } else {
      dispatch(listTickets({ year, ticketType, ticketStatus }));
    }
  }, [year, ticketType, ticketStatus, dispatch, isAuditor, company, userInfo]);

  useEffect(() => {
    isAuditor &&
      !company &&
      companyListOption &&
      companyListOption.length &&
      setCompany(companyListOption[0].key);
  }, [company, companyListOption, isAuditor]);

  useEffect(() => {
    isAuditor && dispatch(getCompanyList());
  }, [dispatch, isAuditor]);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Typography variant="h6" component="span">
          Tickets
        </Typography>
        <Grid
          className={classes.filterContainer}
          container
          columnSpacing={2}
          alignItems="center"
          wrap="nowrap"
        >
          {isAuditor && (
            <Grid item xs={2.5}>
              <CeroDropdown
                id="company"
                label="Company"
                fullWidth
                options={companyListOption}
                onChange={({ target }) => setCompany(target.value)}
                selectedValue={company}
              />
            </Grid>
          )}
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
              ticketCount={ticketCount}
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
                ? <CircularProgress/>
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
