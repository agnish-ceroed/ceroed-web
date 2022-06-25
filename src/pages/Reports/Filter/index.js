import { Container, Grid } from "@mui/material";
import { useState } from "react";
import CeroAutoComplete from "../../../components/CeroAutoComplete";
import { sampleYear } from "../../../constants";

import useStyles from "./styles";

const Filter = ({ setFilter, frameworkList = [] }) => {
  const classes = useStyles();
  const [year, setYear] = useState(null);
  const [framework_id, setFramework] = useState(null);

  const yearList = sampleYear.map((item) => ({
    id: item.key,
    label: item.value,
  }));

  const frameworkListOption = frameworkList.map((item) => ({
    id: item.id,
    label: item.name,
  }));

  const onChangeFilter = (type, selectedValue) => {
    const value = selectedValue ? selectedValue.id : null;
    const filter = {
      year,
      framework_id,
    };
    if (type === "year") {
      filter.year = value;
      setYear(value);
    } else {
      filter.framework_id = value;
      setFramework(value);
    }
    setFilter(filter);
  };

  return (
    <Container className={classes.container}>
      <Grid
        className={classes.filterContainer}
        container
        columnSpacing={2}
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item xs={2.5}>
          <CeroAutoComplete
            id="year"
            label="Year"
            onChange={(e, value) => onChangeFilter("year", value)}
            options={yearList}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Grid>
        <Grid item xs={3.5}>
          <CeroAutoComplete
            id="framework_id"
            label="Framework"
            onChange={(e, value) => onChangeFilter("framework_id", value)}
            options={frameworkListOption}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Filter;
