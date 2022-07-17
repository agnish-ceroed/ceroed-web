import { useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import _ from "lodash";

import CeroDropdown from "../../../components/CeroDropdown";
import CeroButton from "../../../components/CeroButton";
import { months, sampleYear } from "../../../constants";
import useStyles from "./styles";

const facilityAllowedEmissionTypes = [
  "stationary_combustion",
  "mobile_combustion",
  "purchased_electricity",
  "water_discharge",
  "water_consumption",
  "refrigerants",
  "waste",
];

const EmissionTableFilter = (props) => {
  const { onAddData, onApplyFilter, filter, isDisabled } = props;
  const classes = useStyles();

  const facilitiesData = useSelector(
    (state) => state.listings.listFacilities.data
  );
  const facilitiesList = facilitiesData.map((item) => ({
    key: item.id,
    value: item.name,
  }));
  

  const [searchText, setSearchText] = useState("");
  const [filterYear, setYear] = useState(filter?.year || "");
  const [filterMonth, setMonth] = useState(filter?.month || "all");
  const [filterType, setFilterType] = useState("");
  const [facility, setFacility] = useState(filter?.facility_id || "all");

  const monthOptions = [...months];
  monthOptions.splice(0, 0, ({ key: 'all', value: 'All' }));
  facilitiesList.splice(0, 0, ({ key: 'all', value: 'All' }));

  const onClear = () => {
    setSearchText("");
    setYear("");
    setMonth("");
    setFacility("");
  };

  const onApply = () => {
    const filterValue = {};
    if (searchText) {
      filterValue.search = searchText;
    }
    if (filterYear) {
      filterValue.year = filterYear;
    }
    if (filterMonth !== 'all') {
      filterValue.month = filterMonth;
    }
    if (filterType) {
      filterValue.filterType = filterType;
    }
    if (facility !== 'all') {
      filterValue.facility_id = facility;
    }
    onApplyFilter(filterValue);
  };

  return (
    <Grid
      className={classes.filterContainer}
      container
      columnSpacing={2}
      alignItems="center"
      justifyContent="center"
      wrap="nowrap"
    >
      <Grid item xs={1.5}>
        <CeroDropdown
          id="year"
          label="Year"
          fullWidth
          options={sampleYear}
          onChange={({ target }) => setYear(target.value)}
          selectedValue={filterYear}
          disabled={isDisabled}
        />
      </Grid>
      {filterYear && (
        <Grid item xs={1.5}>
          <CeroDropdown
            id="month"
            label="Month"
            fullWidth
            options={monthOptions}
            onChange={({ target }) => setMonth(target.value)}
            selectedValue={filterMonth}
            disabled={isDisabled}
          />
        </Grid>
      )}
      {/* <Grid item xs={1.3}>
                <CeroDropdown
                    id="fuelType"
                    label="Fuel Type"
                    fullWidth
                    options={sampleFilterType}
                    onChange={({target}) => setFilterType(target.value)}
                    selectedValue={filterType}
                />
            </Grid> */}
      {facilityAllowedEmissionTypes.indexOf(props.emissionType) > -1 && (
        <Grid item xs={1.4}>
          <CeroDropdown
            id="facility"
            label="Facility"
            fullWidth
            options={facilitiesList}
            onChange={({ target }) => setFacility(target.value)}
            selectedValue={facility}
            disabled={isDisabled}
          />
        </Grid>
      )}
      {/* <Grid item xs={3}>
        <SearchBox
          placeholder="Search"
          onChange={({ target }) => setSearchText(target.value)}
          value={searchText}
        />
      </Grid> */}
      {!isDisabled && <Grid item xs={1.5}>
        <CeroButton
          buttonText="Clear"
          className={classes.button}
          onClick={onClear}
        />
      </Grid>}
      {!isDisabled && <Grid item xs={1.5}>
        <CeroButton
          buttonText="Apply"
          className={classes.button}
          onClick={onApply}
        />
      </Grid>}
      {!isDisabled && <Grid item xs={2.5}>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item xs={9}>
            <CeroButton
              buttonText="Add Data"
              className={classes.button}
              onClick={onAddData}
            />
          </Grid>
        </Grid>
      </Grid>}
    </Grid>
  );
};

export default EmissionTableFilter;
