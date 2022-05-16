import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Grid } from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import CeroDropdown from "../../components/CeroDropdown";
import SearchBox from "../../components/SearchBox";
import { sampleYear } from "../../constants";
import Status from "./Status";
import MonthlySummaryTable from "./MonthlySummaryTable";
import { getApprovalSummary } from "../../redux/actions/approval";
import useStyles from "./styles";

const ApprovalStatus = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filterYear, setYear] = useState(new Date().getFullYear() );
  const [facility, setFacility] = useState("");
  const [searchText, setSearchText] = useState("");

  const facilitiesData = useSelector( (state) => state.listings.listFacilities.data );
  const approvalSummary = useSelector( (state) => state.approval.approvalSummaryList.data );

  const facilitiesList = facilitiesData.map((item) => ({
    key: item.id,
    value: item.name,
  }));

  const onSelectApprovalSummaryData = (selectedRow) => {
    const currentFilter = encodeURI(
      `?${selectedRow.id ?  `&id=${selectedRow.id}` : ''}${selectedRow.month ? `&month=${selectedRow.month}` : ''}${facility ?  `&facility=${facility}` : ''}`
    );
    navigate(`/approval-status/${selectedRow.year}${currentFilter}`);
  };

  useEffect(() => {
    dispatch(getApprovalSummary(filterYear, facility));
  }, [filterYear, facility]);

  useEffect(() => {
    if(!facility) {
      setFacility(facilitiesList?.[0]?.key)
    }
  }, [facilitiesList]);

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
        <Status year={filterYear} />
        <MonthlySummaryTable
          summaryData={approvalSummary}
          onSelectApprovalSummaryData={onSelectApprovalSummaryData}
        />
      </Container>
    </DashboardLayout>
  );
};

export default ApprovalStatus;
