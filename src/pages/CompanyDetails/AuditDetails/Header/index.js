import { useState } from "react";
import { Container, Grid, Box } from "@mui/material";

import { sampleYear } from "../../../../constants";
import CeroDropdown from "../../../../components/CeroDropdown";
import CeroButton from "../../../../components/CeroButton";
import useStyles from "./styles";

const Header = ({
  onApplyFilter,
  selectedYear,
  isApproveAuditVisible,
  onApproveAudit,
  onRaiseAuditTicket,
  isLoading,
}) => {
  const classes = useStyles();
  const [filterYear, setYear] = useState(selectedYear);

  return (
    <Container className={classes.headerContainer}>
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
            onChange={({ target }) => setYear(target.value)}
            selectedValue={filterYear}
          />
          <CeroButton
            buttonText="Apply"
            className={classes.buttonPrimary}
            onClick={() => onApplyFilter(filterYear)}
          />
        </Box>
        <Box className={classes.yearContainer}>
          <CeroButton
            buttonText={"Raise a ticket"}
            // buttonText={isLoading ? "Loading..." : "Raise a ticket"}
            className={classes.buttonSecondary}
            onClick={onRaiseAuditTicket}
            // disabled={isLoading}
            variant="outlined"
          />
          {isApproveAuditVisible && (
            <CeroButton
              buttonText={isLoading ? "Loading..." : "Approve audit"}
              className={classes.buttonPrimary}
              onClick={onApproveAudit}
              disabled={isLoading}
            />
          )}
        </Box>
      </Grid>
    </Container>
  );
};

export default Header;
