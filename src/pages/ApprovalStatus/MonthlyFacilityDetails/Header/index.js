import { useState } from "react";
import clsx from 'clsx'
import { Container, Grid, Typography, Box } from "@mui/material";
import { sampleYear, months } from "../../../../constants";
import CeroDropdown from "../../../../components/CeroDropdown";
import CeroButton from "../../../../components/CeroButton";

import useStyles from "./styles";

const Header = ({
  onApplyFilter,
  selectedYear,
  selectedMonth,
  facilitiesList,
  selectedFacility,
  actions,
}) => {
  const classes = useStyles();
  const [filterYear, setYear] = useState(selectedYear);
  const [filterMonth, setMonth] = useState(selectedMonth);
  const [facility, setFacility] = useState(selectedFacility);

  return (
    <Container className={classes.headerContainer}>
      <Typography variant="h7" component="span">
        Monthly aggregate
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
            onChange={({ target }) => setYear(target.value)}
            selectedValue={filterYear}
          />
          <CeroDropdown
            classes={{ container: classes.monthsDropdown }}
            id="month"
            label="Month"
            fullWidth
            options={months}
            onChange={({ target }) => setMonth(target.value)}
            selectedValue={filterMonth}
          />
          <CeroDropdown
            classes={{ container: classes.facilityDropdown }}
            id="facility"
            label="Facility"
            fullWidth
            options={facilitiesList}
            onChange={({ target }) => setFacility(target.value)}
            selectedValue={facility}
          />
          <CeroButton
            buttonText="Apply"
            className={classes.buttonPrimary}
            onClick={() =>
              onApplyFilter({
                year: filterYear,
                month: filterMonth,
                facility: facility,
              })
            }
          />
        </Box>
        <Box className={classes.buttonContainer}>
          <CeroButton
            variant="outlined"
            buttonText="Raise a ticket"
            className={classes.buttonSecondary}
            onClick={() => {}}
          />
          {actions && actions.perform_approval && <CeroButton
            buttonText="Approve"
            className={classes.buttonPrimary}
            onClick={() => {}}
          />}
          {actions && actions.perform_request_approval && <CeroButton
            buttonText="Request Approval"
            className={clsx(classes.buttonPrimary, classes.requestApproval)}
            onClick={() => {}}
          />}
          {actions && actions.perform_submission && <CeroButton
            buttonText="Submit"
            className={classes.buttonPrimary}
            onClick={() => {}}
          />}
        </Box>
      </Grid>
    </Container>
  );
};

export default Header;
