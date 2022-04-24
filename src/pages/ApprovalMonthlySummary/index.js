import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Grid } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import Dropdown from "../../components/Dropdown";
import SearchBox from "../../components/SearchBox";
import {sampleYear} from "../../constants";
import { listFacilities } from "../../redux/actions";
import Status from './Status'

import useStyles from "./styles";


const ApprovalMonthlySummary = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [filterYear, setYear] = useState('')
  const [facility, setFacility] = useState('');
  const [searchText, setSearchText] = useState('');

  const facilitiesData = useSelector(state => state.listings.listFacilities.data);
  const facilitiesList = facilitiesData.map(item => ({ key: item.id, value: item.name }));

  useEffect(() => {
    dispatch(listFacilities())
  }, []);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Typography variant="h7" component="span">
          Monthly approval status
        </Typography>
        <Grid
          className={classes.filterContainer}
          container
          columnSpacing={2}
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item xs={1.5}>
            <Dropdown
              id="year"
              label="Year"
              fullWidth
              options={sampleYear}
              onChange={({ target }) => setYear(target.value)}
              selectedValue={filterYear}
            />
          </Grid>
            <Grid item xs={1.4}>
              <Dropdown
                id="facility"
                label="Facility"
                fullWidth
                options={facilitiesList}
                onChange={({ target }) => setFacility(target.value)}
                selectedValue={facility}
              />
            </Grid>
          <Grid item xs={3}>
            <SearchBox
              placeholder="Search"
              onChange={({ target }) => setSearchText(target.value)}
              value={searchText}
            />
          </Grid>
        </Grid>
        <Status/>
      </Container>
    </DashboardLayout>
  );
};

export default ApprovalMonthlySummary;
