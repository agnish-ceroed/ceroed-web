import { useState } from "react";
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
}) => {
  const classes = useStyles();
  const [filterYear, setYear] = useState(selectedYear);
  const [filterMonth, setMonth] = useState(selectedMonth);
  const [facility, setFacility] = useState(selectedFacility);

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
            onClick={() => onApplyFilter(filterYear)}
          />
          <CeroButton
            buttonText="Request audit"
            className={classes.buttonPrimary}
            onClick={() => onApplyFilter(filterYear)}
          />
        </Box>
      </Grid>
    </Container>
  );
};

export default Header;
