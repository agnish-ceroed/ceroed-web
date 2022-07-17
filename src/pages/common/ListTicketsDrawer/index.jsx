import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import CeroSideSheetDrawer from "../../../components/CeroSideSheetDrawer";
import { listScopeTickets, resetListScopeTickets } from "../../../redux/actions";
import { STATUS } from "../../../redux/constants";

import useStyles from "./styles";

const ListTicketDrawer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const ticketList = useSelector((state) => state.ticket.listScopeTickets);

  useEffect(() => {
    if (ticketList.status === STATUS.ERROR) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }, [ticketList.status, enqueueSnackbar]);

  useEffect(() => {
    const {isAuditor, company} = props
    dispatch(listScopeTickets({ scope: props.scope, scopeId: props.scopeId, isAuditor, company }));
    return () => {
        dispatch(resetListScopeTickets());
    }
  }, [dispatch]);

  const renderTicket = ticket => (
    <Card className={classes.ticketCard}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Assignee: {ticket.assigned_to_name}
            </Typography>
            <Typography variant="p" component="div">
                {ticket.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Ticket Owner: {ticket.ticket_owner_name}
            </Typography>
            <Typography variant="body2">
                Status: {ticket.status}
            </Typography>
      </CardContent>
    </Card>
  );
   
  const getPrimaryPaymentDrawer = () => {
    return (
      <Box className={classes.mainContainer}>
        {!!ticketList.data.length && ticketList.data.map((ticket) => renderTicket(ticket))}
        {ticketList.status === STATUS.SUCCESS && !ticketList.data.length && <Typography>No Tickets Found</Typography>}
      </Box>
    );
  };

  return (
    <CeroSideSheetDrawer
      primaryDrawer={{
        drawerOpen: props.isOpen,
        onClose: props.onClose,
        content: getPrimaryPaymentDrawer(),
        header: { title: "Tickets" },
        hideFooter: true,
        classes: {
          drawerContainer: classes.drawerContainer,
          contentArea: classes.drawerContentArea,
        },
      }}
    />
  );
};

export default ListTicketDrawer;
