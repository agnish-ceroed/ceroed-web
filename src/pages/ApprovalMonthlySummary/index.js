import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Grid } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import CeroDropdown from "../../components/CeroDropdown";
import SearchBox from "../../components/SearchBox";
import {sampleYear} from "../../constants";
import { listFacilities } from "../../redux/actions";
import Status from './Status'
import MonthlySummaryTable from './MonthlySummaryTable'

import useStyles from "./styles";

const summaryData = [
  {
    date: 'Jan 2021',
    approved_by: 'John Doe',
    requested_by: 'Thomas Doe',
    requested_on: '01/12/2021',
    status: 'Pending'
  },
  {
    date: 'Feb 2021',
    approved_by: 'Marshal Doe',
    requested_by: 'Thomas Doe',
    requested_on: '05/08/2021',
    status: 'Approved'
  },
  {
    date: 'March 2021',
    approved_by: 'James Doe',
    requested_by: 'John Doe',
    requested_on: '02/09/2021',
    status: 'Pending'
  },
  {
    date: 'April 2021',
    approved_by: 'Carol Doe',
    requested_by: 'Susan Doe',
    requested_on: '11/07/2021',
    status: 'Approved'
  },
  {
    date: 'May 2021',
    approved_by: 'Rose Geller',
    requested_by: 'Monica Geller',
    requested_on: '10/10/2021',
    status: 'Approved'
  },
  {
    date: 'June 2021',
    approved_by: 'Chandler Bing',
    requested_by: 'Joy Thomas',
    requested_on: '05/06/2021',
    status: 'Approved'
  },
  {
    date: 'July 2021',
    approved_by: 'Will Smith',
    requested_by: 'Penny Smith',
    requested_on: '06/04/2021',
    status: 'Approved'
  },
  {
    date: 'August 2021',
    approved_by: 'Marshal Thomas',
    requested_by: 'Lilly Mary',
    requested_on: '28/12/2021',
    status: 'Approved'
  },
  {
    date: 'September 2021',
    approved_by: 'Lucifer Morningstar',
    requested_by: 'Chloe Decker',
    requested_on: '01/12/2021',
    status: 'Approved'
  },
  {
    date: 'October 2021',
    approved_by: 'Jon Snow',
    requested_by: 'Caitlin Snow',
    requested_on: '01/12/2021',
    status: 'Approved'
  },
  {
    date: 'November 2021',
    approved_by: 'Barry Allen',
    requested_by: 'West Allen',
    requested_on: '01/12/2021',
    status: 'Approved'
  },
  {
    date: 'December 2021',
    approved_by: 'Wally West',
    requested_by: 'Nora West',
    requested_on: '01/12/2021',
    status: 'Approved'
  },
]


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
            <CeroDropdown
              id="year"
              label="Year"
              fullWidth
              options={sampleYear}
              onChange={({ target }) => setYear(target.value)}
              selectedValue={filterYear}
            />
          </Grid>
            <Grid item xs={1.4}>
              <CeroDropdown
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
        <MonthlySummaryTable summaryData={summaryData}/>
      </Container>
    </DashboardLayout>
  );
};

export default ApprovalMonthlySummary;
