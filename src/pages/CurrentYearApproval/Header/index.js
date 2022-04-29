import { useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { sampleYear } from "../../../constants";
import Dropdown from "../../../components/Dropdown";
import CeroButton from "../../../components/CeroButton";

import useStyles from "./styles";

const Header = ({ onApplyFilter, selectedYear }) => {
  const classes = useStyles();
  const [filterYear, setYear] = useState(selectedYear);

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
          <Dropdown
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