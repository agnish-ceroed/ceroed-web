import { Container, Chip, Avatar, Tooltip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CeroTable from "../../../components/CeroTable";
import StyledBadge from "../../../components/StyledBadge/input";
import dayjs from "dayjs";

import useStyles from "./styles";

export const approvalMonthlySummaryColumns = [
  {
    columnKey: "ticketStatus",
    columnId: "ticketStatus",
    columnHeader: "",
  },
  {
    columnKey: "title",
    columnId: "title",
    columnHeader: "Title",
  },
  {
    columnKey: "assigned_to_name",
    columnId: "assigned_to_name",
    columnHeader: "Assignee",
  },
  {
    columnKey: "assigned_on",
    columnId: "assigned_on",
    columnHeader: "Assigned on",
  },
  {
    columnKey: "ticket_owner_name",
    columnId: "ticket_owner_name",
    columnHeader: "Ticket Raised by",
  },
  {
    columnKey: "status",
    columnId: "status",
    columnHeader: "Status",
  },
];

const TicketsTable = (props) => {
  const classes = useStyles();
  const { onSelectTicket, ticketList, userInfo } = props;

  const getStatus = (status) => {
    if (status === "open") {
      return <Chip label={"Open"} color="warning" variant="outlined" />;
    } else if (status === "closed") {
      return (
        <Chip
          label={"Closed"}
          color="success"
          variant="outlined"
          deleteIcon={<DoneIcon />}
          onDelete={() => {}}
        />
      );
    } else {
      return <Chip label={status} color="info" variant="outlined" />;
    }
  };

  const getTicketStatus = (data) => {
    let dotColor = "";
    let avatarColor = "";
    let title = "";
    if (userInfo.id === data.assigned_to_id) {
      dotColor = "info";
      avatarColor = "#6565d2";
      title = "Ticket assigned to me";
    } else if (userInfo.id === data.ticket_owner_id) {
      dotColor = "error";
      avatarColor = "#cb6b6b";
      title = "My tickets";
    } else {
      dotColor = "success";
      avatarColor = "#44cf44";
      title = "Ticket assigned to others";
    }
    return (
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        color={dotColor}
      >
        <Tooltip title={title} placement="top" arrow>
          <Avatar sx={{ bgcolor: avatarColor }}>
            {data.assigned_to_name.charAt(0).toUpperCase()}
          </Avatar>
        </Tooltip>
      </StyledBadge>
    );
  };

  const getTicketData = () =>
    ticketList.map((item) => ({
      ...item,
      requested_on: item.assigned_on
        ? dayjs(item.assigned_on).format("DD MMM YYYY HH:mm")
        : "-",
      assigned_on: item.assigned_on
        ? dayjs(item.assigned_on).format("DD MMM YYYY HH:mm")
        : "-",
      status: getStatus(item.status),
      ticketStatus: getTicketStatus(item),
    }));

  return (
    <Container className={classes.container}>
      <CeroTable
        columns={approvalMonthlySummaryColumns}
        data={getTicketData()}
        hasMore={false}
        loading={false}
        onSelectRow={onSelectTicket}
        classes={{ tableContainer: classes.tableContainer }}
      />
    </Container>
  );
};

export default TicketsTable;
