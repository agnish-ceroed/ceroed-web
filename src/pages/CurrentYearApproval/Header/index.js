import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Box, Chip } from "@mui/material";

import { sampleYear } from "../../../constants";
import CeroDropdown from "../../../components/CeroDropdown";
import CeroButton from "../../../components/CeroButton";

import CreateTicketDrawer from "../../common/CreateTicketDrawer";
import useStyles from "./styles";

const Header = ({
  onApplyFilter,
  selectedYear,
  isRequestAuditVisible,
  onRequestAudit,
  isLoading,
  statusId,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [filterYear, setYear] = useState(parseInt(selectedYear));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onSelectYear = ({ target }) => {
    setYear(target.value);
    onApplyFilter(target.value);
  };

  return (
    <Container className={classes.headerContainer}>
      <Typography variant="h7" component="span">
        Yearly aggregate
      </Typography>
      <Grid
        className={classes.filterContainer}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Box className={classes.yearContainer}>
          <CeroDropdown
            classes={{ container: classes.dropdown }}
            id="year"
            label="Year"
            fullWidth
            options={sampleYear}
            onChange={onSelectYear}
            selectedValue={filterYear}
          />
          <Chip
            label="Qualitative data"
            color="primary"
            variant="outlined"
            onClick={() =>
              navigate(`/audit-status/qualitative-data/${statusId}`)
            }
          />
        </Box>
        <Box className={classes.yearContainer}>
          <CeroButton
            variant="outlined"
            buttonText="Raise a ticket"
            className={classes.buttonSecondary}
            onClick={() => setIsDrawerOpen(true)}
          />
          {isRequestAuditVisible && (
            <CeroButton
              buttonText={isLoading ? "Loading..." : "Request audit"}
              className={classes.buttonPrimary}
              onClick={onRequestAudit}
              disabled={isLoading}
            />
          )}
        </Box>
      </Grid>
      <CreateTicketDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        scope="audit"
        scopeId={statusId}
      />
    </Container>
  );
};

export default Header;
