import { useEffect, useState } from "react";
import { Container, Box, IconButton, Chip } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router";

import { sampleYear } from "../../../../constants";
import CeroDropdown from "../../../../components/CeroDropdown";
import CeroButton from "../../../../components/CeroButton";
import ListTicketDrawer from "../../../common/ListTicketsDrawer";
import useStyles from "./styles";

const Header = ({
  auditId,
  onApplyFilter,
  selectedYear,
  isApproveAuditVisible,
  onApproveAudit,
  onRaiseAuditTicket,
  isLoading,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [filterYear, setYear] = useState(selectedYear);
  const [showTickets, setShowTickets] = useState(false);

  useEffect(() => {
    setYear(selectedYear);
  }, [selectedYear]);

  const onChangeYear = ({ target }) => {
    setYear(target.value);
    onApplyFilter(target.value);
  };

  const onclickShowTickets = () => {
    setShowTickets(true);
  };

  const onCloseTickets = () => {
    setShowTickets(false);
  };

  return (
    <Container className={classes.headerContainer}>
      <Box className={classes.backbuttonContainer}>
        <IconButton className={classes.editIcon} onClick={(e) => navigate(-1)}>
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Box className={classes.yearContainer}>
        <CeroDropdown
          classes={{ container: classes.dropdown }}
          id="year"
          label="Year"
          fullWidth
          options={sampleYear}
          onChange={onChangeYear}
          selectedValue={parseInt(filterYear)}
        />
      </Box>
      <Chip
        label="Qualitative data"
        color="primary"
        variant="outlined"
        onClick={() => navigate(`qualitative-data`)}
      />
      <Box className={classes.ticketContainer}>
        {isApproveAuditVisible && (
          <CeroButton
            buttonText={isLoading ? "Loading..." : "Approve audit"}
            className={classes.buttonPrimary}
            onClick={onApproveAudit}
            disabled={isLoading}
          />
        )}
        <CeroButton
          buttonText={"Raise a ticket"}
          // buttonText={isLoading ? "Loading..." : "Raise a ticket"}
          className={classes.buttonSecondary}
          onClick={onRaiseAuditTicket}
          // disabled={isLoading}
          variant="outlined"
        />
        <IconButton onClick={onclickShowTickets}>
          <AssignmentIcon />
        </IconButton>
      </Box>
      {showTickets && (
        <ListTicketDrawer
          isOpen={showTickets}
          scope="audit"
          scopeId={auditId}
          onClose={onCloseTickets}
        />
      )}
    </Container>
  );
};

export default Header;
